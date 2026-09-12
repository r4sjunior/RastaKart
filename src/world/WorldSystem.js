import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { Ribbon } from './Ribbon.js';
import * as L from './layout.js';
import * as TEX from './textures.js';

/**
 * Kingston Coast — world build and the WorldAPI other systems query.
 *
 * Everything geometric derives from one `Ribbon` built out of `layout.js`, so
 * the road mesh, the terrain that meets it, the barriers and the collision
 * queries can never disagree about where the track is.
 *
 * WorldAPI (see docs/ARCHITECTURE.md):
 *   sampleGround(x, z)       -> { y, normal, surface, onTrack, banking }
 *   sampleSpline(u)          -> { pos, tangent, normal, right, width, banking }
 *   project(pos)             -> { u, lateral, distAlong, forward }
 *   collideWall(pos, radius) -> null | { normal, depth }
 *   respawn(u)               -> { position, quaternion }
 *   startGrid(i)             -> { position, quaternion }
 *   trackLength, checkpoints, checkpointCount, itemBoxSpots, minY, maxLateral
 */

const UP = new THREE.Vector3(0, 1, 0);
const ORIGIN = new THREE.Vector3();
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a || 1), 0, 1); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

// Cross-section lanes, as fractions/offsets from the centreline outwards.
const KERB_W = 1.15;        // painted kerb strip, sits just outside the tarmac
const KERB_RISE = 0.075;    // how far the kerb stands proud of the road
const SHOULDER_DROP = 0.22; // the shoulder falls away from the kerb
const BLEND = 22;           // metres over which terrain blends up to the road
const ROAD_TILE = 10;       // metres of road per asphalt texture tile

/* -------------------------------------------------------------------------
 * Cheap deterministic world-space noise, shared by the terrain height field
 * and the scenery scatter. Must stay branch-light: `sampleGround` reaches it
 * a few thousand times a second.
 * ---------------------------------------------------------------------- */
function hash2i(x, y, s) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2i(xi, yi, s), b = hash2i(xi + 1, yi, s);
  const c = hash2i(xi, yi + 1, s), d = hash2i(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
/** ridged multifractal — gives mountains crests instead of domes */
function ridged(x, y, oct, f0, s) {
  let f = f0, amp = 1, sum = 0, norm = 0, prev = 1;
  for (let i = 0; i < oct; i++) {
    let n = 1 - Math.abs(vnoise(x * f, y * f, s + i * 613) * 2 - 1);
    n *= n;
    sum += n * amp * prev;
    prev = 0.35 + n * 0.65;
    norm += amp;
    amp *= 0.52; f *= 2.07;
  }
  return sum / norm;
}

/**
 * Mountain massifs, authored explicitly so the range sits *behind* the circuit
 * and its silhouette can be composed rather than emerging from a blob of fbm.
 */
const MASSIFS = [
  { x: 340, z: 470, r: 380, h: 232, sharp: 1.55 },
  { x: -60, z: 560, r: 330, h: 196, sharp: 1.7 },
  { x: 640, z: 170, r: 300, h: 178, sharp: 1.5 },
  { x: -430, z: 430, r: 280, h: 148, sharp: 1.8 },
  { x: 190, z: 318, r: 190, h: 86, sharp: 2.1 },
  { x: 900, z: 620, r: 520, h: 300, sharp: 1.35 },
  { x: -820, z: 700, r: 460, h: 240, sharp: 1.4 },
];

export class WorldSystem {
  name = 'world'; order = 10;

  /**
   * `init` below is a dozen synchronous, individually expensive build steps
   * (the height field alone samples tens of thousands of noise points). With
   * no `await` between them the whole thing runs as one uninterruptible task,
   * which is what makes the loading screen read as frozen rather than
   * progressing — the progress bar text/width changes are all queued but
   * never get a chance to paint. Yielding one animation frame between steps
   * costs at most a few frames' worth of wall time in total and turns that
   * one freeze into a bar that visibly advances.
   */
  #yield() { return new Promise((r) => requestAnimationFrame(r)); }

  async init(ctx) {
    this.ctx = ctx;
    const q = ctx.quality ?? 'high';
    this.q = q;
    const rng = ctx.rng.fork(0x7a5741);
    this.rng = rng;
    const aniso = Math.min(16, ctx.renderer?.capabilities?.getMaxAnisotropy?.() ?? 8);

    ctx.onProgress?.(0.12, 'traçando o circuito');
    await this.#yield();

    // ---- the ribbon ------------------------------------------------------
    this.ribbon = new Ribbon({
      points: L.TRACK_POINTS,
      closed: true,
      sampleStep: 1.5,
      width: L.WIDTH_KEYS,
      wallL: L.WALL_L_KEYS,
      wallR: L.WALL_R_KEYS,
      wall: L.WALL_L_KEYS,
      shoulder: L.SHOULDER_KEYS,
      bankGain: L.BANK_GAIN,
      maxBank: L.MAX_BANK,
      bumps: L.BUMPS,
    });
    this.trackLength = this.ribbon.length;

    this.root = new THREE.Group();
    this.root.name = 'world';
    ctx.scene.add(this.root);

    // gorge segments, precomputed for the height field
    this.gorgeSeg = [];
    const gp = L.WORLD.gorge.path;
    for (let i = 0; i < gp.length - 1; i++) {
      const ax = gp[i][0], az = gp[i][2], bx = gp[i + 1][0], bz = gp[i + 1][2];
      const ex = bx - ax, ez = bz - az;
      this.gorgeSeg.push({ ax, az, ex, ez, inv: 1 / (ex * ex + ez * ez || 1) });
    }

    ctx.onProgress?.(0.2, 'pintando o asfalto');
    await this.#yield();
    const texSize = q === 'low' ? 256 : q === 'medium' ? 384 : 512;
    this.tex = {
      asphalt: TEX.asphaltSet(rng, aniso, texSize),
      ground: TEX.groundSet(rng, aniso, q === 'low' ? 128 : 256),
      dirt: TEX.dirtSet(rng, aniso, q === 'low' ? 128 : 256),
      macro: TEX.macroTexture(256, 4211, aniso),
      roadMacro: TEX.roadMacroTexture(256, 8821, aniso),
      boost: TEX.boostTexture(256),
      checker: TEX.checkerTexture(10, 256),
      waterN: TEX.waterNormalTexture(q === 'low' ? 128 : 256, aniso),
      foam: TEX.foamTexture(256, aniso),
      corrugated: TEX.corrugatedTexture(128),
      banner: TEX.bannerTexture(512, rng),
      crowd: TEX.crowdTexture(rng, 256),
      falls: TEX.waterfallTexture(256),
      bark: TEX.barkTexture(rng, 128),
      plank: TEX.barkTexture(rng, 128, [138, 108, 74], 0.15),
      stucco: TEX.stuccoTexture(128),
      arrow: TEX.arrowTexture('arrow', 256),
      chevron: TEX.arrowTexture('chevron', 256),
    };

    ctx.onProgress?.(0.26, 'medindo o litoral');
    await this.#yield();
    this.#bakeHeightField();
    this.#bakeShortcut();

    this.#buildRoad();
    ctx.onProgress?.(0.34, 'levantando o terreno');
    await this.#yield();
    this.#buildTerrain();
    ctx.onProgress?.(0.44, 'enchendo o mar');
    await this.#yield();
    this.#buildWater();
    ctx.onProgress?.(0.50, 'montando as barreiras');
    await this.#yield();
    this.#buildBarriers();
    this.#buildBoostPanels();
    this.#buildRoadDecals();
    this.#buildStartLine();
    ctx.onProgress?.(0.56, 'erguendo as arquibancadas');
    await this.#yield();
    this.#buildArches();
    this.#buildStands(rng);
    ctx.onProgress?.(0.60, 'construindo a vila');
    await this.#yield();
    this.#buildVillage(rng);
    ctx.onProgress?.(0.64, 'abrindo o desfiladeiro');
    await this.#yield();
    this.#buildGorge(rng);
    this.#buildShortcutMesh();
    ctx.onProgress?.(0.67, 'plantando o cenário');
    await this.#yield();
    this.#buildScenery(rng);

    // ---- derived race data ----------------------------------------------
    this.checkpoints = Array.from({ length: L.CHECKPOINT_COUNT }, (_, i) => i / L.CHECKPOINT_COUNT);
    this.itemBoxSpots = [];
    for (const row of L.ITEM_ROWS) {
      const u = this.ribbon.uAt(row.cp);
      const s = this.ribbon.sample(u);
      const span = Math.min(s.width * 0.72, (row.n - 1) * 3.0);
      for (let i = 0; i < row.n; i++) {
        const t = row.n === 1 ? 0 : (i / (row.n - 1) - 0.5) * span;
        this.itemBoxSpots.push(
          s.pos.clone().addScaledVector(s.right, t).addScaledVector(s.normal, 1.05));
      }
    }

    this.boostRanges = L.BOOST_PANELS.map((p) => {
      const u = this.ribbon.uAt(p.cp);
      return { u, half: 7 / this.trackLength, lanes: p.lanes };
    });

    ctx.world = this.#api();
    ctx.onProgress?.(0.7, 'circuito pronto');
  }

  /* ------------------------------------------------------- material helper */

  /**
   * Kill the visible period of a tiled material.
   *
   * A detail map that tiles every few metres always shows its grid once the
   * eye has something to lock onto. Multiplying it by a second, much larger
   * and rotated grey field (mean 0.5, so it neither darkens nor brightens on
   * average) breaks the repeat without introducing shapes of its own.
   *
   * @param {THREE.Material} mat
   * @param {number} tileMetres  world size of one detail tile
   * @param {number} macroMetres world size of one macro tile
   */
  #breakTiling(mat, tileMetres, macroMetres, strength = 0.42) {
    const macro = this.tex.macro;
    const ratio = tileMetres / macroMetres;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMacroMap = { value: macro };
      shader.uniforms.uMacroRatio = { value: ratio };
      shader.uniforms.uMacroK = { value: strength };
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
          uniform sampler2D uMacroMap;
          uniform float uMacroRatio;
          uniform float uMacroK;`)
        .replace('#include <map_fragment>', `
          #ifdef USE_MAP
            vec4 sampledDiffuseColor = texture2D( map, vMapUv );
            vec2 mUv = mat2( 0.8, -0.6, 0.6, 0.8 ) * vMapUv * uMacroRatio + vec2( 0.37, 0.11 );
            float macroL = texture2D( uMacroMap, mUv ).r;
            vec2 mUv2 = vMapUv * uMacroRatio * 0.31 - vec2( 0.19, 0.63 );
            macroL = macroL * 0.65 + texture2D( uMacroMap, mUv2 ).r * 0.35;
            sampledDiffuseColor.rgb *= 1.0 + ( macroL - 0.5 ) * uMacroK * 2.0;
            diffuseColor *= sampledDiffuseColor;
          #endif
        `);
    };
    mat.customProgramCacheKey = () => `rk-tilebreak-${ratio.toFixed(4)}-${strength}`;
    return mat;
  }

  /* ------------------------------------------------------------------ road */

  #buildRoad() {
    const rb = this.ribbon;
    const N = rb.N;
    // lanes: shoulderL, kerbL, road..., kerbR, shoulderR
    const LANES = 9;
    const pos = new Float32Array((N + 1) * LANES * 3);
    const nrm = new Float32Array((N + 1) * LANES * 3);
    const uv = new Float32Array((N + 1) * LANES * 2);
    const col = new Float32Array((N + 1) * LANES * 3);
    // x: lateral normalised so +-1 is the tarmac edge. y: surface id
    // (0 tarmac, 1 kerb, 2 shoulder). Lets one material paint three surfaces.
    const road = new Float32Array((N + 1) * LANES * 2);

    const s = { pos: new THREE.Vector3(), tangent: new THREE.Vector3(), right: new THREE.Vector3(),
      normal: new THREE.Vector3(), width: 0, banking: 0, wallL: 0, wallR: 0, shoulder: 0,
      curvature: 0, distAlong: 0 };
    const p = new THREE.Vector3();

    const kerbCol = new THREE.Color();
    const roadCol = new THREE.Color(0xffffff);
    // Sandy shoulder: bright, so the track edge reads as a hard value step
    // against the dark tarmac instead of dissolving into it.
    const shoulderCol = new THREE.Color(0xd9c9a4);

    // 1 sample = 1.5 m blocks. The old 3 m blocks read as long smears at speed
    // and never registered as a kerb.
    const stripeEvery = 1;

    // Kerb red has to survive AgX plus the warm key; a "correct" 0xd8232a
    // lands as brick. Pushed to full chroma so it reads as Nintendo red.
    const KERB_RED = 0xff2419;
    const KERB_WHITE = 0xfbf7f0;

    for (let i = 0; i <= N; i++) {
      rb.sample((i % N) / N, s);
      const hw = s.width * 0.5;
      const sh = Math.max(0.6, s.shoulder);
      const invHw = 1 / Math.max(0.001, hw);
      // lateral offset, vertical offset, colour tint, surface id
      const lanes = [
        [-hw - KERB_W - sh, -SHOULDER_DROP, shoulderCol, 2],
        [-hw - KERB_W, 0, shoulderCol, 2],
        [-hw - KERB_W, KERB_RISE, null, 1],   // kerb outer (striped)
        [-hw, KERB_RISE, null, 1],            // kerb inner
        [-hw, 0, roadCol, 0],
        [hw, 0, roadCol, 0],
        [hw, KERB_RISE, null, 1],
        [hw + KERB_W, KERB_RISE, null, 1],
        [hw + KERB_W + sh, -SHOULDER_DROP, shoulderCol, 2],
      ];
      const stripe = (Math.floor((i % N) / stripeEvery) % 2) === 0;
      kerbCol.setHex(stripe ? KERB_RED : KERB_WHITE);

      for (let l = 0; l < LANES; l++) {
        const [lat, dy, tint, id] = lanes[l];
        p.copy(s.pos).addScaledVector(s.right, lat).addScaledVector(s.normal, dy);
        const o3 = (i * LANES + l) * 3;
        const o2 = (i * LANES + l) * 2;
        pos[o3] = p.x; pos[o3 + 1] = p.y; pos[o3 + 2] = p.z;
        nrm[o3] = s.normal.x; nrm[o3 + 1] = s.normal.y; nrm[o3 + 2] = s.normal.z;
        // V follows real distance so the texture never stretches through a corner
        uv[o2] = lat / ROAD_TILE;
        uv[o2 + 1] = s.distAlong / ROAD_TILE;
        road[o2] = lat * invHw;
        road[o2 + 1] = id;
        const c = tint ?? kerbCol;
        col[o3] = c.r; col[o3 + 1] = c.g; col[o3 + 2] = c.b;
      }
    }

    const idx = [];
    for (let i = 0; i < N; i++) {
      for (let l = 0; l < LANES - 1; l++) {
        const a = i * LANES + l, b = a + 1, c = (i + 1) * LANES + l, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aRoad', new THREE.BufferAttribute(road, 2));
    g.setIndex(idx);
    g.computeBoundingSphere();

    const at = this.tex.asphalt;
    for (const t of [at.map, at.normalMap, at.roughnessMap]) {
      if (!t) continue;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(1, 1);
      t.generateMipmaps = true;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.needsUpdate = true;
    }
    const mat = new THREE.MeshStandardMaterial({
      map: at.map ?? null,
      normalMap: at.normalMap ?? null,
      roughnessMap: at.roughnessMap ?? null,
      vertexColors: true,
      color: 0xffffff,
      roughness: 1.0,
      metalness: 0.0,
      // 0.75 combed at grazing angles and was half the perceived "gravel".
      normalScale: new THREE.Vector2(0.34, 0.34),
      envMapIntensity: 0.30,
    });
    this.#roadShader(mat);

    this.road = new THREE.Mesh(g, mat);
    this.road.receiveShadow = true;
    this.road.name = 'road';
    this.root.add(this.road);
  }

  /**
   * The road surface shader.
   *
   * The tile only carries the aggregate; everything that makes tarmac look
   * like tarmac at gameplay distance is added here, in world/track space, so
   * none of it repeats with the 10 m tile:
   *
   *   - a world-space low-frequency field (repairs, discolouration);
   *   - rubbered-in wheel paths either side of the racing line, which also
   *     polish the surface (lower roughness) the way real ones do;
   *   - a crisp painted edge line and a dashed centre line;
   *   - kerb and shoulder lifted off the dark bitumen albedo so their vertex
   *     colour reads at full chroma from one draw call.
   */
  #roadShader(mat) {
    const macro = this.tex.roadMacro;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uRoadMacro = { value: macro };
      shader.uniforms.uMacroScale = { value: 1 / 92 };   // metres per macro tile
      shader.uniforms.uTile = { value: ROAD_TILE };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
          attribute vec2 aRoad;
          varying vec2 vRoad;
          varying vec3 vRoadW;`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          vRoad = aRoad;
          vRoadW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
          uniform sampler2D uRoadMacro;
          uniform float uMacroScale;
          uniform float uTile;
          varying vec2 vRoad;
          varying vec3 vRoadW;
          float rkWear;   // 0 = untouched tarmac, 1 = polished wheel path
          float rkPaint;  // 1 where paint covers the surface`)
        .replace('#include <map_fragment>', `
          vec4 rkTex = texture2D( map, vMapUv );
          float rkLat = vRoad.x;
          float rkA   = abs( rkLat );
          float rkTar = 1.0 - step( 0.5, vRoad.y );        // 1 on the tarmac

          // ---- low frequency, world space: never repeats with the tile ----
          vec2 mUv  = mat2( 0.83, -0.56, 0.56, 0.83 ) * vRoadW.xz * uMacroScale;
          vec2 mUv2 = vRoadW.xz * uMacroScale * 0.33 + vec2( 0.21, 0.68 );
          float rkMacro = texture2D( uRoadMacro, mUv ).r * 0.64
                        + texture2D( uRoadMacro, mUv2 ).r * 0.36;

          vec3 rkC = rkTex.rgb;
          // broad value drift + resurfacing patches (mean preserving)
          rkC *= mix( 0.72, 1.30, rkMacro );

          // ---- rubbered-in wheel paths -----------------------------------
          float band = exp( -pow( ( rkA - 0.40 ) / 0.20, 2.0 ) );
          rkWear = band * ( 0.55 + 0.45 * rkMacro );
          rkC *= 1.0 - 0.26 * rkWear;
          // the very centre is scrubbed clean and slightly paler
          rkC *= 1.0 + 0.10 * exp( -pow( rkA / 0.10, 2.0 ) );

          // ---- paint ------------------------------------------------------
          float sMet = vMapUv.y * uTile;
          float edge = smoothstep( 0.880, 0.898, rkA ) * ( 1.0 - smoothstep( 0.952, 0.968, rkA ) );
          float dash = step( 0.5, fract( sMet / 7.0 ) )
                     * ( 1.0 - smoothstep( 0.030, 0.052, rkA ) );
          rkPaint = clamp( ( edge + dash ) * rkTar, 0.0, 1.0 );
          // paint is worn where the tyres cross it
          rkPaint *= 1.0 - 0.35 * rkWear;
          rkC = mix( rkC, vec3( 0.80, 0.80, 0.77 ) * ( 0.86 + rkTex.g * 0.9 ), rkPaint );

          // ---- kerb + shoulder --------------------------------------------
          // Lift them off the bitumen albedo, keeping only its grain, so the
          // vertex colour lands at full chroma. One material, three surfaces.
          vec3 rkPainted = vec3( 0.62 ) + ( rkTex.ggg - vec3( 0.145 ) ) * 1.15;
          rkC = mix( rkPainted, rkC, rkTar );

          diffuseColor *= vec4( rkC, 1.0 );
        `)
        .replace('#include <roughnessmap_fragment>', `
          float roughnessFactor = roughness;
          #ifdef USE_ROUGHNESSMAP
            roughnessFactor *= texture2D( roughnessMap, vMapUv ).g;
          #endif
          // polished wheel paths and wet-look paint catch the low sun
          roughnessFactor *= 1.0 - 0.22 * rkWear - 0.30 * rkPaint;
        `)
        .replace('#include <normal_fragment_maps>', `
          #ifdef USE_NORMALMAP
            vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
            // flatten the chippings under the tyre paths and under paint
            mapN.xy *= normalScale * ( 1.0 - 0.5 * rkWear - 0.8 * rkPaint );
            normal = normalize( tbn * mapN );
          #endif
        `);
    };
    mat.customProgramCacheKey = () => 'rk-road-v2';
    return mat;
  }

  /* --------------------------------------------------------------- terrain */

  /** Signed carve depth of the river gorge at (x, z), in metres. */
  #gorgeCarve(x, z) {
    const G = L.WORLD.gorge;
    let best = Infinity;
    for (let i = 0; i < this.gorgeSeg.length; i++) {
      const s = this.gorgeSeg[i];
      const t = clamp(((x - s.ax) * s.ex + (z - s.az) * s.ez) * s.inv, 0, 1);
      const dx = x - (s.ax + s.ex * t), dz = z - (s.az + s.ez * t);
      const d = dx * dx + dz * dz;
      if (d < best) best = d;
    }
    const d = Math.sqrt(best);
    const half = G.width * 0.5;
    // steep-walled V with a flat bed
    return G.depth * (1 - smoothstep(half * 0.55, half * 2.35, d));
  }

  /**
   * Height of the natural ground at (x, z), ignoring the road ribbon.
   * The coastline is L-shaped: open sea south (low z) and west (low x).
   */
  #terrainBase(x, z) {
    const W = L.WORLD;
    const dz = z - W.coastZ;
    const dx = x - W.coastX;
    // wobble the coastline so it is not two straight lines
    const wob = (vnoise(x * 0.0037, z * 0.0037, 5501) - 0.5) * 46
      + (vnoise(x * 0.0121, z * 0.0121, 911) - 0.5) * 15;
    const inland = Math.min(dz, dx) + wob;

    // beach shelf, then rolling ground
    const beach = smoothstep(-3, 26, inland) * 3.1;
    const roll = (vnoise(x * 0.0091, z * 0.0091, 17) - 0.5) * 8.0
      + (vnoise(x * 0.0261, z * 0.0261, 71) - 0.5) * 2.6;

    // mountains: explicit massifs shaped by ridged noise
    let mtn = 0;
    for (let i = 0; i < MASSIFS.length; i++) {
      const m = MASSIFS[i];
      const ddx = x - m.x, ddz = z - m.z;
      const d = Math.sqrt(ddx * ddx + ddz * ddz) / m.r;
      if (d >= 1) continue;
      const k = 1 - d;
      mtn += m.h * Math.pow(k, m.sharp);
    }
    if (mtn > 0.5) {
      const rg = ridged(x * 0.0043, z * 0.0043, 4, 1, 2251);
      mtn *= 0.44 + rg * 0.86;
      mtn += ridged(x * 0.019, z * 0.019, 2, 1, 4423) * Math.min(14, mtn * 0.16);
    }

    // sea bed drops away from the shore
    const seabed = inland < 0 ? inland * 0.30 - smoothstep(0, -220, inland) * 16 : 0;

    let y = beach + roll * smoothstep(-4, 40, inland) + mtn + seabed - 1.4;
    const carve = this.#gorgeCarve(x, z);
    if (carve > 0.01) y -= carve;
    return y;
  }

  /** Terrain height including the apron that blends up to the road. */
  #groundHeight(x, z, proj, fr) {
    let y = this.#terrainBase(x, z);
    const half = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
    const d = Math.abs(proj.lateral) - half;
    if (d < BLEND) {
      const latEdge = clamp(proj.lateral, -half, half);
      const roadY = fr.pos.y + fr.right.y * latEdge - SHOULDER_DROP;
      const k = 1 - smoothstep(0, BLEND, Math.max(0, d));
      y = y * (1 - k) + roadY * k;
    }
    return y;
  }

  /**
   * Bake the natural ground height into a small texture so the water shader can
   * ask "how deep am I here?" without any CPU work, and so the scenery scatter
   * can reject positions in one lookup.
   */
  #bakeHeightField() {
    const box = new THREE.Box3().setFromPoints(this.ribbon.cpVecs);
    const cx = (box.min.x + box.max.x) * 0.5;
    const cz = (box.min.z + box.max.z) * 0.5;
    const ext = L.WORLD.extent + 700;
    const N = this.q === 'low' ? 192 : this.q === 'medium' ? 320 : 448;
    const H_MIN = -50, H_MAX = 270;
    const data = new Uint8Array(N * N);
    const raw = new Float32Array(N * N);
    for (let j = 0; j < N; j++) {
      const z = cz - ext * 0.5 + (j + 0.5) * (ext / N);
      for (let i = 0; i < N; i++) {
        const x = cx - ext * 0.5 + (i + 0.5) * (ext / N);
        const h = this.#terrainBase(x, z);
        raw[j * N + i] = h;
        data[j * N + i] = clamp(Math.round((h - H_MIN) / (H_MAX - H_MIN) * 255), 0, 255);
      }
    }
    const tex = new THREE.DataTexture(data, N, N, THREE.RedFormat, THREE.UnsignedByteType);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    this.heightField = { tex, raw, N, cx, cz, ext, H_MIN, H_MAX };
    this.terrainCenter = { x: cx, z: cz, ext: L.WORLD.extent };
  }

  #buildTerrain() {
    const q = this.q;
    const SEG = q === 'low' ? 160 : q === 'medium' ? 224 : 288;
    const EXT = L.WORLD.extent;
    const g = new THREE.PlaneGeometry(EXT, EXT, SEG, SEG);
    g.rotateX(-Math.PI / 2);

    const pos = g.attributes.position;
    const count = pos.count;
    const col = new Float32Array(count * 3);
    const splat = new Float32Array(count * 3);

    const cx = this.terrainCenter.x;
    const cz = this.terrainCenter.z;

    const tmp = new THREE.Color();
    const v = new THREE.Vector3();
    const proj = { u: 0, lateral: 0, distAlong: 0, forward: new THREE.Vector3(), index: 0 };

    const cell = EXT / SEG;

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i) + cx;
      const z = pos.getZ(i) + cz;

      v.set(x, 0, z);
      this.ribbon.project(v, proj);
      const fr = this.ribbon.sample(proj.u);
      const y = this.#groundHeight(x, z, proj, fr);

      pos.setX(i, x); pos.setZ(i, z); pos.setY(i, y);

      // slope from central differences of the *natural* field (cheap, stable)
      const hx = this.#terrainBase(x + cell, z) - this.#terrainBase(x - cell, z);
      const hz = this.#terrainBase(x, z + cell) - this.#terrainBase(x, z - cell);
      const slope = Math.hypot(hx, hz) / (2 * cell);

      // ---- splat weights -------------------------------------------------
      const n = vnoise(x * 0.031, z * 0.031, 33);
      const nLow = vnoise(x * 0.0072, z * 0.0072, 88);
      const sandW = (1 - smoothstep(1.4 + n * 1.6, 5.6 + n * 2.4, y)) * (1 - smoothstep(0.55, 1.1, slope));
      const rockW = clamp(smoothstep(0.42 + n * 0.22, 0.95, slope)
        + smoothstep(52 + nLow * 34, 118 + nLow * 30, y), 0, 1);
      const grassW = clamp(1 - sandW - rockW, 0, 1);
      const sum = sandW + rockW + grassW || 1;
      splat[i * 3] = sandW / sum;
      splat[i * 3 + 1] = grassW / sum;
      splat[i * 3 + 2] = rockW / sum;

      // ---- tint: keep it near neutral, the detail maps carry the colour ---
      const shade = 0.86 + nLow * 0.22 + (n - 0.5) * 0.10;
      tmp.setRGB(shade, shade, shade);
      // jungle green pushes into the mid slopes; dry gold on the exposed crests
      const jungleK = smoothstep(9, 26, y) * (1 - rockK(slope, y, nLow)) * (0.55 + nLow * 0.5);
      tmp.lerp(new THREE.Color(0x2a6a34), jungleK * 0.55);
      if (y > 96) tmp.lerp(new THREE.Color(0xb9b1a0), smoothstep(96, 190, y) * 0.5);
      if (y < 0.4) tmp.multiplyScalar(0.74);      // wet sand at the water line
      col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aSplat', new THREE.BufferAttribute(splat, 3));
    g.computeVertexNormals();
    g.computeBoundingSphere();

    const gt = this.tex.ground;
    for (const t of [gt.sand, gt.grass, gt.rock, gt.normalMap, gt.roughnessMap]) {
      if (!t) continue;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(1, 1);
    }

    const mat = new THREE.MeshStandardMaterial({
      map: gt.sand,
      normalMap: gt.normalMap ?? null,
      roughnessMap: gt.roughnessMap ?? null,
      vertexColors: true,
      roughness: 1.0,
      metalness: 0,
      normalScale: new THREE.Vector2(0.85, 0.85),
      envMapIntensity: 0.45,
    });

    const DETAIL = 7.5;       // metres per detail tile
    const MACRO = 96;         // metres per macro tile
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uGrassMap = { value: gt.grass };
      shader.uniforms.uRockMap = { value: gt.rock };
      shader.uniforms.uMacroMap = { value: this.tex.macro };
      shader.uniforms.uDetail = { value: 1 / DETAIL };
      shader.uniforms.uMacro = { value: 1 / MACRO };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
          attribute vec3 aSplat;
          varying vec3 vSplat;
          varying vec3 vWPos;`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          vSplat = aSplat;
          vWPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
          uniform sampler2D uGrassMap;
          uniform sampler2D uRockMap;
          uniform sampler2D uMacroMap;
          uniform float uDetail;
          uniform float uMacro;
          varying vec3 vSplat;
          varying vec3 vWPos;`)
        .replace('#include <map_fragment>', `
          vec2 dUv = vWPos.xz * uDetail;
          vec3 w = vSplat / max( vSplat.x + vSplat.y + vSplat.z, 1e-4 );
          vec3 detail =
              texture2D( map,       dUv ).rgb * w.x
            + texture2D( uGrassMap, dUv ).rgb * w.y
            + texture2D( uRockMap,  dUv ).rgb * w.z;
          // a second, far coarser pass of the same maps breaks the tiling grid
          vec2 cUv = vWPos.xz * uDetail * 0.161 + vec2( 0.23, 0.71 );
          vec3 coarse =
              texture2D( map,       cUv ).rgb * w.x
            + texture2D( uGrassMap, cUv ).rgb * w.y
            + texture2D( uRockMap,  cUv ).rgb * w.z;
          detail = mix( detail, detail * coarse * 3.1, 0.34 );
          float macroL = texture2D( uMacroMap, vWPos.xz * uMacro ).r;
          detail *= 0.80 + macroL * 0.42;
          diffuseColor.rgb *= detail;
        `)
        .replace('#include <normal_fragment_maps>', `
          #ifdef USE_NORMALMAP
            vec3 mapN = texture2D( normalMap, vWPos.xz * uDetail ).xyz * 2.0 - 1.0;
            mapN.xy *= normalScale;
            normal = normalize( tbn * mapN );
          #endif
        `)
        .replace('#include <roughnessmap_fragment>', `
          float roughnessFactor = roughness;
          #ifdef USE_ROUGHNESSMAP
            roughnessFactor *= texture2D( roughnessMap, vWPos.xz * uDetail ).g;
          #endif
        `);
    };
    mat.customProgramCacheKey = () => 'rk-terrain-splat';

    this.terrain = new THREE.Mesh(g, mat);
    this.terrain.receiveShadow = true;
    this.terrain.name = 'terrain';
    this.root.add(this.terrain);
  }

  /* ----------------------------------------------------------------- water */

  #buildWater() {
    const hf = this.heightField;
    const EXT = L.WORLD.extent * 2.6;
    const SEG = this.q === 'low' ? 48 : this.q === 'medium' ? 96 : 144;
    const g = new THREE.PlaneGeometry(EXT, EXT, SEG, SEG);
    g.rotateX(-Math.PI / 2);

    const nmap = this.tex.waterN;
    nmap.wrapS = nmap.wrapT = THREE.RepeatWrapping;
    const foam = this.tex.foam;
    foam.wrapS = foam.wrapT = THREE.RepeatWrapping;

    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.02,
      envMapIntensity: 1.5,
      transparent: true,
      depthWrite: false,
    });

    const uniforms = {
      uTime: { value: 0 },
      uWaterN: { value: nmap },
      uFoamMap: { value: foam },
      uHeight: { value: hf.tex },
      uHfOrigin: { value: new THREE.Vector2(hf.cx - hf.ext * 0.5, hf.cz - hf.ext * 0.5) },
      uHfInv: { value: 1 / hf.ext },
      uHMin: { value: hf.H_MIN },
      uHRange: { value: hf.H_MAX - hf.H_MIN },
      uSeaLevel: { value: L.WORLD.seaLevel },
      uShallow: { value: new THREE.Color(L.PALETTE.seaShallow) },
      uDeep: { value: new THREE.Color(L.PALETTE.seaDeep) },
      uFoamCol: { value: new THREE.Color(L.PALETTE.foam) },
    };
    this.waterUniforms = uniforms;

    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
          uniform float uTime;
          varying vec3 vWPos;`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          vec3 wp = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
          // two long swells so the horizon line is never dead straight
          float s1 = sin( dot( wp.xz, vec2( 0.0090, 0.0043 ) ) + uTime * 0.55 );
          float s2 = sin( dot( wp.xz, vec2( -0.0051, 0.0116 ) ) + uTime * 0.41 );
          transformed.y += s1 * 0.42 + s2 * 0.28;
          vWPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`);

      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
          uniform float uTime;
          uniform sampler2D uWaterN;
          uniform sampler2D uFoamMap;
          uniform sampler2D uHeight;
          uniform vec2 uHfOrigin;
          uniform float uHfInv;
          uniform float uHMin;
          uniform float uHRange;
          uniform float uSeaLevel;
          uniform vec3 uShallow;
          uniform vec3 uDeep;
          uniform vec3 uFoamCol;
          varying vec3 vWPos;

          float rkGround( vec2 p ) {
            vec2 uv = ( p - uHfOrigin ) * uHfInv;
            if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 ) return -40.0;
            return texture2D( uHeight, uv ).r * uHRange + uHMin;
          }`)
        .replace('#include <map_fragment>', `
          float gh = rkGround( vWPos.xz );
          float depth = uSeaLevel - gh;

          // water colour: turquoise over the shelf, deep teal offshore
          vec3 wcol = mix( uShallow, uDeep, smoothstep( 0.15, 11.0, depth ) );
          wcol = mix( wcol * 1.18, wcol, smoothstep( 0.0, 3.0, depth ) );

          // surf: a broken band that breathes with the swell
          float swell = sin( dot( vWPos.xz, vec2( 0.052, 0.031 ) ) - uTime * 0.9 ) * 0.5 + 0.5;
          float band = 1.0 - smoothstep( 0.0, 1.5 + swell * 1.9, depth );
          float wash = smoothstep( -0.55, 0.25, depth );
          vec2 fUv = vWPos.xz * 0.055 + vec2( uTime * 0.010, uTime * 0.007 );
          float fn = texture2D( uFoamMap, fUv ).r;
          float fn2 = texture2D( uFoamMap, vWPos.xz * 0.017 - vec2( uTime * 0.004, 0.0 ) ).r;
          float foam = clamp( band * wash * ( fn * 0.72 + fn2 * 0.55 + 0.18 ), 0.0, 1.0 );
          foam = smoothstep( 0.18, 0.62, foam );
          // a hard lip right at the water line
          foam = max( foam, ( 1.0 - smoothstep( 0.0, 0.32, depth ) ) * wash * 0.85 );

          wcol = mix( wcol, uFoamCol, foam );
          diffuseColor.rgb *= wcol;
          diffuseColor.a *= mix( 0.66, 1.0, smoothstep( 0.0, 2.2, depth ) );
          diffuseColor.a = max( diffuseColor.a, foam );
        `)
        .replace('#include <roughnessmap_fragment>', `
          float gh2 = rkGround( vWPos.xz );
          float depth2 = uSeaLevel - gh2;
          float foamR = 1.0 - smoothstep( 0.0, 2.4, depth2 );
          float roughnessFactor = mix( roughness, 0.72, foamR );
        `)
        .replace('#include <normal_fragment_maps>', `
          // The sheet is horizontal, so the map can be applied directly in world
          // space: no tangent frame, no seam where the plane's UVs wrap.
          vec2 p1 = vWPos.xz * 0.075 + vec2( uTime * 0.021, uTime * 0.013 );
          vec2 p2 = vWPos.xz * 0.026 - vec2( uTime * 0.011, uTime * 0.008 );
          vec2 p3 = vWPos.xz * 0.235 + vec2( -uTime * 0.055, uTime * 0.034 );
          vec3 n1 = texture2D( uWaterN, p1 ).xyz * 2.0 - 1.0;
          vec3 n2 = texture2D( uWaterN, p2 ).xyz * 2.0 - 1.0;
          vec3 n3 = texture2D( uWaterN, p3 ).xyz * 2.0 - 1.0;
          vec2 nxz = n1.xy * 0.55 + n2.xy * 0.75 + n3.xy * 0.30;
          vec3 wN = normalize( vec3( nxz.x, 1.35, nxz.y ) );
          normal = normalize( ( viewMatrix * vec4( wN, 0.0 ) ).xyz );
        `);
    };
    mat.customProgramCacheKey = () => 'rk-water';

    this.waterMat = mat;
    this.water = new THREE.Mesh(g, mat);
    this.water.position.set(this.terrainCenter.x, L.WORLD.seaLevel, this.terrainCenter.z);
    this.water.renderOrder = 1;
    this.water.name = 'sea';
    this.root.add(this.water);
  }

  /* -------------------------------------------------------------- barriers */

  #styleAt(cp) {
    for (const b of L.BARRIER_STYLE) if (cp >= b.cp0 && cp < b.cp1) return b.style;
    return 'stone';
  }

  #buildBarriers() {
    const rb = this.ribbon;
    const N = rb.N;
    const step = this.q === 'low' ? 4 : 2;
    const runs = [];   // contiguous runs of wall on one side

    for (const side of [-1, 1]) {
      let run = null;
      for (let i = 0; i <= N; i += step) {
        const u = (i % N) / N;
        const fr = rb.sample(u);
        const w = side < 0 ? fr.wallL : fr.wallR;
        const has = w > 0.01;
        if (has) {
          const hw = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
          const at = fr.pos.clone()
            .addScaledVector(fr.right, side * (hw + 0.55))
            .addScaledVector(fr.normal, -SHOULDER_DROP);
          if (!run) { run = []; runs.push(run); }
          run.push({ at, normal: fr.normal.clone(), right: fr.right.clone(), tangent: fr.tangent.clone(), side, u });
        } else run = null;
      }
    }

    const posts = [];
    const rails = [];
    for (const run of runs) {
      for (let i = 0; i < run.length; i++) {
        posts.push(run[i]);
        if (i + 1 < run.length) {
          const a = run[i], b = run[i + 1];
          const dir = b.at.clone().sub(a.at);
          const len = dir.length();
          if (len > 0.05 && len < 16) rails.push({ a, b, dir, len });
        }
      }
    }
    this.barrierPosts = posts;
    if (!posts.length) return;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const one = new THREE.Vector3(1, 1, 1);

    // --- posts -------------------------------------------------------------
    const postGeo = new THREE.CylinderGeometry(0.13, 0.17, 1.15, 6);
    postGeo.translate(0, 0.58, 0);
    const postMat = new THREE.MeshStandardMaterial({
      map: this.tex.bark, color: 0xa8814f, roughness: 0.9, metalness: 0.02,
    });
    const im = new THREE.InstancedMesh(postGeo, postMat, posts.length);
    im.castShadow = true; im.receiveShadow = true;
    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      q.setFromUnitVectors(UP, p.normal);
      m.compose(p.at, q, one);
      im.setMatrixAt(i, m);
    }
    im.instanceMatrix.needsUpdate = true;

    // --- rails: two horizontal bars per span, painted rasta ---------------
    const railGeo = new THREE.BoxGeometry(1, 0.22, 0.13);
    const railMat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.62, metalness: 0.05,
    });
    const ri = new THREE.InstancedMesh(railGeo, railMat, rails.length * 2);
    ri.castShadow = true; ri.receiveShadow = true;
    const railCols = [0x1eae4b, 0xffd21e, 0xd8232a];
    const cvec = new THREE.Color();
    const align = new THREE.Quaternion();
    const dirN = new THREE.Vector3();
    const scl = new THREE.Vector3();
    let ridx = 0;
    for (let i = 0; i < rails.length; i++) {
      const { a, b, dir, len } = rails[i];
      dirN.copy(dir).normalize();
      align.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dirN);
      const mid = a.at.clone().addScaledVector(dir, 0.5);
      cvec.setHex(railCols[Math.floor(i / 3) % 3]);
      for (const hgt of [0.50, 0.95]) {
        scl.set(len * 1.02, 1, 1);
        m.compose(mid.clone().addScaledVector(a.normal, hgt), align, scl);
        ri.setMatrixAt(ridx, m);
        ri.setColorAt(ridx, cvec);
        ridx++;
      }
    }
    ri.count = ridx;
    ri.instanceMatrix.needsUpdate = true;
    if (ri.instanceColor) ri.instanceColor.needsUpdate = true;
    this.root.add(im, ri);
  }

  #buildBoostPanels() {
    const rb = this.ribbon;
    const mat = new THREE.MeshStandardMaterial({
      map: this.tex.boost,
      emissive: 0x2ad4ff,
      emissiveMap: this.tex.boost,
      emissiveIntensity: 1.6,
      roughness: 0.5,
      metalness: 0.1,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    this.boostMat = mat;
    const geo = new THREE.PlaneGeometry(2.6, 6.2, 1, 1).rotateX(-Math.PI / 2);
    let n = 0;
    for (const p of L.BOOST_PANELS) n += p.lanes.length;
    n += 1;   // shortcut pad
    const im = new THREE.InstancedMesh(geo, mat, n);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const scl = new THREE.Vector3(1, 1, 1);
    let i = 0;
    for (const p of L.BOOST_PANELS) {
      const u = rb.uAt(p.cp);
      const fr = rb.sample(u);
      for (const lane of p.lanes) {
        const at = fr.pos.clone().addScaledVector(fr.right, lane).addScaledVector(fr.normal, 0.02);
        const mtx = new THREE.Matrix4().lookAt(ORIGIN, fr.normal, fr.tangent);
        q.setFromRotationMatrix(mtx);
        m.compose(at, q, scl);
        im.setMatrixAt(i++, m);
      }
    }
    // one on the dirt shortcut
    if (this.shortcut) {
      const sc = this.shortcut;
      const t = L.SHORTCUT_BOOST;
      const p = sc.curve.getPointAt(t);
      const tan = sc.curve.getTangentAt(t).normalize();
      const nrm = new THREE.Vector3(0, 1, 0);
      const at = p.clone().addScaledVector(nrm, 0.05);
      q.setFromRotationMatrix(new THREE.Matrix4().lookAt(ORIGIN, nrm, tan));
      m.compose(at, q, scl);
      im.setMatrixAt(i++, m);
      this.shortcutBoost = at.clone();
    }
    im.count = i;
    im.instanceMatrix.needsUpdate = true;
    im.renderOrder = 2;
    this.root.add(im);
  }

  /* ---------------------------------------------------------- road decals */

  #buildRoadDecals() {
    const rb = this.ribbon;
    const byKind = { arrow: [], chevron: [] };
    for (const d of L.ROAD_DECALS) (byKind[d.kind] ?? byKind.arrow).push(d);

    for (const kind of Object.keys(byKind)) {
      const list = byKind[kind];
      if (!list.length) continue;
      const tex = kind === 'arrow' ? this.tex.arrow : this.tex.chevron;
      const mat = new THREE.MeshStandardMaterial({
        map: tex, alphaMap: tex, transparent: true, opacity: 0.72,
        roughness: 0.95, metalness: 0, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
        color: 0xffffff,
      });
      const size = kind === 'arrow' ? [4.0, 6.0] : [5.2, 7.0];
      const geo = new THREE.PlaneGeometry(size[0], size[1]).rotateX(-Math.PI / 2);
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      const m = new THREE.Matrix4(); const q = new THREE.Quaternion();
      const one = new THREE.Vector3(1, 1, 1);
      list.forEach((d, i) => {
        const fr = rb.sample(rb.uAt(d.cp));
        const lane = d.side * Math.min(fr.width * 0.26, 4.2);
        const at = fr.pos.clone().addScaledVector(fr.right, lane).addScaledVector(fr.normal, 0.03);
        q.setFromRotationMatrix(new THREE.Matrix4().lookAt(ORIGIN, fr.normal, fr.tangent));
        m.compose(at, q, one);
        im.setMatrixAt(i, m);
      });
      im.instanceMatrix.needsUpdate = true;
      im.renderOrder = 2;
      this.root.add(im);
    }
  }

  #buildStartLine() {
    const rb = this.ribbon;
    const fr = rb.sample(0);
    const t = this.tex.checker;
    if (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 1); }
    const g = new THREE.PlaneGeometry(fr.width, 3.0).rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      map: t, roughness: 0.85, metalness: 0,
      polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
    }));
    m.position.copy(fr.pos).addScaledVector(fr.normal, 0.03);
    m.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(ORIGIN, fr.normal, fr.tangent));
    m.renderOrder = 1;
    this.root.add(m);
  }

  /* --------------------------------------------------------------- arches */

  #buildArches() {
    const rb = this.ribbon;
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.5, metalness: 0.55 });
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x1eae4b, roughness: 0.45, metalness: 0.25 });
    const bannerMat = new THREE.MeshStandardMaterial({
      map: this.tex.banner, roughness: 0.75, metalness: 0, side: THREE.DoubleSide,
    });

    const legGeo = new THREE.CylinderGeometry(0.30, 0.42, 1, 10);
    legGeo.translate(0, 0.5, 0);
    const beamGeo = new THREE.BoxGeometry(1, 1.35, 0.85);
    const bannerGeo = new THREE.PlaneGeometry(1, 1);

    const n = L.ARCHES.length;
    const legs = new THREE.InstancedMesh(legGeo, legMat, n * 2);
    const beams = new THREE.InstancedMesh(beamGeo, beamMat, n * 3);
    const banners = new THREE.InstancedMesh(bannerGeo, bannerMat, n);
    legs.castShadow = true; beams.castShadow = true;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const scl = new THREE.Vector3();
    const bandCols = [0xffd21e, 0xd8232a, 0x111417];
    const cvec = new THREE.Color();
    let li = 0, bi = 0, ni = 0;

    for (const a of L.ARCHES) {
      const u = rb.uAt(a.cp);
      const fr = rb.sample(u);
      const halfW = fr.width * 0.5 + (a.kind === 'start' ? 2.6 : 2.0);
      const H = a.kind === 'start' ? 8.2 : 7.4;
      // frame: +Z along the tangent, +Y along the surface normal
      q.setFromRotationMatrix(new THREE.Matrix4().lookAt(fr.tangent, ORIGIN, fr.normal));
      const base = fr.pos.clone().addScaledVector(fr.normal, -SHOULDER_DROP);

      for (const side of [-1, 1]) {
        const p = base.clone().addScaledVector(fr.right, side * halfW);
        scl.set(1, H, 1);
        m.compose(p, q, scl);
        legs.setMatrixAt(li++, m);
      }
      // main beam
      scl.set(halfW * 2 + 1.0, 1, 1);
      m.compose(base.clone().addScaledVector(fr.normal, H + 0.6), q, scl);
      beams.setMatrixAt(bi++, m);
      // two thin rasta bands above it
      for (let k = 0; k < 2; k++) {
        scl.set(halfW * 2 + 1.2, 0.24, 0.95);
        m.compose(base.clone().addScaledVector(fr.normal, H + 1.5 + k * 0.42), q, scl);
        beams.setMatrixAt(bi++, m);
      }
      // banner hanging under the beam
      const bw = halfW * 2 - 0.6;
      scl.set(bw, bw * 0.25, 1);
      m.compose(base.clone().addScaledVector(fr.normal, H - 0.45), q, scl);
      banners.setMatrixAt(ni++, m);
    }
    beams.count = bi; legs.count = li; banners.count = ni;
    legs.instanceMatrix.needsUpdate = true;
    beams.instanceMatrix.needsUpdate = true;
    banners.instanceMatrix.needsUpdate = true;
    this.root.add(legs, beams, banners);
    void bandCols; void cvec;
  }

  /* ----------------------------------------------------------- grandstands */

  #buildStands(rng) {
    const rb = this.ribbon;
    const structGeos = [];
    const crowdGeos = [];
    const roofGeos = [];

    const box = (w, h, d, mtx) => {
      const g = new THREE.BoxGeometry(w, h, d);
      g.applyMatrix4(mtx);
      return g;
    };

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const one = new THREE.Vector3(1, 1, 1);

    for (const st of L.STANDS) {
      const u = rb.uAt(st.cp);
      const fr = rb.sample(u);
      const halfW = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
      // local frame: X = right*side (away from track), Y = up, Z = tangent
      q.setFromRotationMatrix(new THREE.Matrix4().lookAt(fr.tangent, ORIGIN, UP));
      const base = fr.pos.clone()
        .addScaledVector(fr.right, st.side * (halfW + 2.4))
        .addScaledVector(UP, -SHOULDER_DROP);
      const root = new THREE.Matrix4().compose(base, q, one);
      const flip = st.side; // step away from the track

      const tierH = 0.92, tierD = 1.35;
      for (let t = 0; t < st.tiers; t++) {
        const y = 0.55 + t * tierH;
        const x = flip * (0.9 + t * tierD);
        // the step itself
        m.identity().makeTranslation(x, y * 0.5, 0);
        structGeos.push(box(tierD, y, st.len, root.clone().multiply(m)));
        // crowd strip standing on it
        const cg = new THREE.PlaneGeometry(st.len, 1.75);
        cg.rotateY(Math.PI / 2);
        if (flip > 0) cg.rotateY(Math.PI);
        const uvs = cg.attributes.uv;
        const rep = Math.max(2, Math.round(st.len / 3.2));
        for (let i = 0; i < uvs.count; i++) uvs.setX(i, uvs.getX(i) * rep);
        uvs.needsUpdate = true;
        const cm = new THREE.Matrix4().makeTranslation(x, y + 0.85, 0);
        cg.applyMatrix4(root.clone().multiply(cm));
        crowdGeos.push(cg);
      }
      // back wall + roof
      const backX = flip * (0.9 + st.tiers * tierD + 0.5);
      const topY = 0.55 + st.tiers * tierH;
      m.identity().makeTranslation(backX, topY * 0.5, 0);
      structGeos.push(box(0.6, topY + 0.4, st.len + 0.6, root.clone().multiply(m)));

      const roofY = topY + 3.1;
      m.identity();
      m.makeRotationZ(flip * 0.10);
      m.setPosition(flip * (0.4 + st.tiers * tierD * 0.5), roofY, 0);
      roofGeos.push(box(st.tiers * tierD + 2.6, 0.28, st.len + 1.2, root.clone().multiply(m)));
      // roof posts
      for (const zz of [-st.len * 0.42, 0, st.len * 0.42]) {
        const pm = new THREE.Matrix4().makeTranslation(backX, (roofY + topY * 0.5) * 0.5 + 0.4, zz);
        structGeos.push(box(0.3, roofY - topY * 0.4, 0.3, root.clone().multiply(pm)));
      }
      void rng;
    }

    if (structGeos.length) {
      const g = mergeGeometries(structGeos, false);
      const mat = new THREE.MeshStandardMaterial({
        map: this.tex.stucco, color: 0xcfc7b6, roughness: 0.92, metalness: 0,
      });
      const mesh = new THREE.Mesh(g, mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.name = 'stands';
      this.root.add(mesh);
      structGeos.forEach((x) => x.dispose());
    }
    if (roofGeos.length) {
      const g = mergeGeometries(roofGeos, false);
      const mat = new THREE.MeshStandardMaterial({
        map: this.tex.corrugated, color: 0xe4b83c, roughness: 0.65, metalness: 0.25,
      });
      const mesh = new THREE.Mesh(g, mat);
      mesh.castShadow = true;
      this.root.add(mesh);
      roofGeos.forEach((x) => x.dispose());
    }
    if (crowdGeos.length) {
      const g = mergeGeometries(crowdGeos, false);
      const mat = new THREE.MeshStandardMaterial({
        map: this.tex.crowd, alphaMap: this.tex.crowd,
        transparent: true, alphaTest: 0.35, side: THREE.DoubleSide,
        roughness: 0.85, metalness: 0,
      });
      const mesh = new THREE.Mesh(g, mat);
      mesh.name = 'crowd';
      this.root.add(mesh);
      crowdGeos.forEach((x) => x.dispose());
    }
  }

  /* --------------------------------------------------------------- village */

  #buildVillage(rng) {
    const rb = this.ribbon;
    const u0 = rb.uAt(L.VILLAGE.cp0);
    let u1 = rb.uAt(L.VILLAGE.cp1);
    if (u1 < u0) u1 += 1;

    const bodies = [];
    const roofs = [];
    const posts = [];

    const houses = L.PALETTE.houses;
    const at = new THREE.Vector3();
    const proj = { u: 0, lateral: 0, distAlong: 0, forward: new THREE.Vector3(), index: 0 };
    const probe = new THREE.Vector3();

    const MAX = this.q === 'low' ? 34 : 64;
    let guard = 0;
    while (bodies.length < MAX && guard++ < MAX * 12) {
      const u = (u0 + (u1 - u0) * rng.next()) % 1;
      const fr = rb.sample(u);
      const side = rng.sign();
      const half = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
      const row = rng.int(0, L.VILLAGE.rows - 1);
      const off = half + 5.5 + row * 10 + rng.range(-2.4, 2.4);
      at.copy(fr.pos).addScaledVector(fr.right, side * off);
      probe.set(at.x, 0, at.z);
      rb.project(probe, proj);
      const frp = rb.sample(proj.u);
      if (Math.abs(proj.lateral) < frp.width * 0.5 + 4.5) continue;
      const gy = this.#groundHeight(at.x, at.z, proj, frp);
      if (gy < 0.8) continue;
      at.y = gy;

      const w = rng.range(4.4, 7.2);
      const d = rng.range(4.0, 6.4);
      const h = rng.range(3.0, 4.4);
      // face the road
      const yaw = Math.atan2(-fr.right.x * side, -fr.right.z * side) + rng.range(-0.28, 0.28);
      bodies.push({ at: at.clone(), w, d, h, yaw, col: rng.pick(houses) });
      roofs.push({ at: at.clone(), w, d, h, yaw, col: rng.pick([0xb8483a, 0x4a6f7c, 0x8a8f74, 0xcf9a3a]) });
      if (rng.next() < 0.55) posts.push({ at: at.clone(), w, d, h, yaw });
    }
    if (!bodies.length) return;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const scl = new THREE.Vector3();
    const c = new THREE.Color();

    // --- bodies ----------------------------------------------------------
    const bodyGeo = new THREE.BoxGeometry(1, 1, 1);
    bodyGeo.translate(0, 0.5, 0);
    const bodyMat = new THREE.MeshStandardMaterial({
      map: this.tex.stucco, roughness: 0.9, metalness: 0, vertexColors: true,
    });
    const bIM = new THREE.InstancedMesh(bodyGeo, bodyMat, bodies.length);
    bIM.castShadow = true; bIM.receiveShadow = true;
    bodies.forEach((b, i) => {
      e.set(0, b.yaw, 0); q.setFromEuler(e);
      scl.set(b.w, b.h, b.d);
      m.compose(b.at, q, scl);
      bIM.setMatrixAt(i, m);
      bIM.setColorAt(i, c.setHex(b.col));
    });
    bIM.instanceMatrix.needsUpdate = true;
    if (bIM.instanceColor) bIM.instanceColor.needsUpdate = true;

    // --- roofs: a gable prism -------------------------------------------
    const roofGeo = new THREE.CylinderGeometry(0.72, 0.72, 1, 3, 1);
    roofGeo.rotateZ(Math.PI / 2);
    roofGeo.rotateX(Math.PI / 2);
    roofGeo.rotateY(Math.PI / 2);
    const rIM = new THREE.InstancedMesh(roofGeo,
      new THREE.MeshStandardMaterial({
        map: this.tex.corrugated, roughness: 0.68, metalness: 0.2, vertexColors: true,
      }), roofs.length);
    rIM.castShadow = true;
    roofs.forEach((b, i) => {
      e.set(0, b.yaw, 0); q.setFromEuler(e);
      scl.set(b.w * 1.16, b.d * 1.0, b.d * 1.16);
      m.compose(b.at.clone().setY(b.at.y + b.h + b.d * 0.16), q, scl);
      rIM.setMatrixAt(i, m);
      rIM.setColorAt(i, c.setHex(b.col));
    });
    rIM.instanceMatrix.needsUpdate = true;
    if (rIM.instanceColor) rIM.instanceColor.needsUpdate = true;

    // --- veranda posts ---------------------------------------------------
    const postGeo = new THREE.CylinderGeometry(0.11, 0.13, 1, 5);
    postGeo.translate(0, 0.5, 0);
    const pIM = new THREE.InstancedMesh(postGeo,
      new THREE.MeshStandardMaterial({ map: this.tex.plank, color: 0xa8845a, roughness: 0.92 }),
      posts.length * 2);
    let pi = 0;
    posts.forEach((b) => {
      e.set(0, b.yaw, 0); q.setFromEuler(e);
      const fx = Math.sin(b.yaw), fz = Math.cos(b.yaw);
      for (const s of [-1, 1]) {
        const p = b.at.clone();
        p.x += fx * (b.d * 0.62) + Math.cos(b.yaw) * s * b.w * 0.42;
        p.z += fz * (b.d * 0.62) - Math.sin(b.yaw) * s * b.w * 0.42;
        scl.set(1, b.h * 0.82, 1);
        m.compose(p, q, scl);
        pIM.setMatrixAt(pi++, m);
      }
    });
    pIM.count = pi;
    pIM.instanceMatrix.needsUpdate = true;
    pIM.castShadow = true;

    this.root.add(bIM, rIM, pIM);
  }

  /* ----------------------------------------------------- gorge and bridge */

  #buildGorge(rng) {
    const G = L.WORLD.gorge;
    const rb = this.ribbon;

    // ---- the bridge deck, under the road between cp 19 and 21 ------------
    const u0 = rb.uAt(18.75), u1raw = rb.uAt(21.35);
    let u1 = u1raw; if (u1 < u0) u1 += 1;
    const STEPS = 26;
    const deckGeos = [];
    const trussGeos = [];

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const one = new THREE.Vector3(1, 1, 1);

    let prev = null;
    for (let i = 0; i <= STEPS; i++) {
      const u = (u0 + (u1 - u0) * (i / STEPS)) % 1;
      const fr = rb.sample(u);
      const hw = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
      q.setFromRotationMatrix(new THREE.Matrix4().lookAt(fr.tangent, ORIGIN, fr.normal));
      const base = fr.pos.clone().addScaledVector(fr.normal, -SHOULDER_DROP - 0.5);
      if (prev) {
        const seg = base.clone().sub(prev).length() * 1.08;
        const mid = base.clone().lerp(prev, 0.5);
        const g = new THREE.BoxGeometry(hw * 2 + 0.6, 0.9, seg);
        g.applyMatrix4(m.compose(mid, q, one));
        deckGeos.push(g);
        // side trusses
        for (const s of [-1, 1]) {
          const t = new THREE.BoxGeometry(0.3, 1.5, seg);
          t.applyMatrix4(m.compose(
            mid.clone().addScaledVector(fr.right, s * (hw + 0.2)).addScaledVector(fr.normal, -0.35),
            q, one));
          trussGeos.push(t);
        }
      }
      // piers every few steps, dropping into the gorge
      if (i % 6 === 3) {
        const floor = this.#terrainBase(fr.pos.x, fr.pos.z);
        const h = Math.max(2, fr.pos.y - floor);
        for (const s of [-1, 1]) {
          const p = new THREE.CylinderGeometry(0.85, 1.25, h, 8);
          p.translate(0, -h * 0.5 - 1.0, 0);
          p.applyMatrix4(m.compose(
            fr.pos.clone().addScaledVector(fr.right, s * (hw * 0.62)), q, one));
          trussGeos.push(p);
        }
      }
      prev = base;
    }

    if (deckGeos.length) {
      const g = mergeGeometries(deckGeos, false);
      const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
        map: this.tex.stucco, color: 0x9a917f, roughness: 0.94, metalness: 0,
      }));
      mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.name = 'bridge-deck';
      this.root.add(mesh);
      deckGeos.forEach((x) => x.dispose());
    }
    if (trussGeos.length) {
      const g = mergeGeometries(trussGeos, false);
      const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
        color: 0x6f6a5e, roughness: 0.75, metalness: 0.25,
      }));
      mesh.castShadow = true;
      mesh.name = 'bridge-truss';
      this.root.add(mesh);
      trussGeos.forEach((x) => x.dispose());
    }

    // ---- the waterfall ---------------------------------------------------
    const fp = G.path[G.fallAt];
    const fx = fp[0], fz = fp[2];
    const lip = this.#terrainBase(fx, fz) + G.depth * 0.72;
    const bed = this.#terrainBase(fx, fz);
    const fallH = Math.max(6, lip - bed);
    const fallW = G.width * 0.42;

    const fallGroup = new THREE.Group();
    const fallMat = new THREE.MeshStandardMaterial({
      map: this.tex.falls, alphaMap: this.tex.falls,
      transparent: true, opacity: 0.9, side: THREE.DoubleSide,
      roughness: 0.28, metalness: 0, depthWrite: false,
      emissive: 0x9fd9ff, emissiveIntensity: 0.18,
    });
    this.fallMat = fallMat;
    // face the direction the gorge runs
    const gdir = new THREE.Vector3(
      G.path[G.fallAt + 1][0] - fx, 0, G.path[G.fallAt + 1][2] - fz).normalize();
    for (let i = 0; i < 3; i++) {
      const w = fallW * (1 - i * 0.22);
      const geo = new THREE.PlaneGeometry(w, fallH);
      const mesh = new THREE.Mesh(geo, fallMat);
      mesh.position.set(fx + gdir.x * i * 0.9, bed + fallH * 0.5, fz + gdir.z * i * 0.9);
      mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(gdir, ORIGIN, UP));
      fallGroup.add(mesh);
    }
    // plunge pool foam
    const pool = new THREE.Mesh(
      new THREE.CircleGeometry(fallW * 0.95, 20).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: 0xdff4ff, roughness: 0.35, metalness: 0, transparent: true, opacity: 0.85,
      }));
    pool.position.set(fx + gdir.x * 2.4, bed + 0.35, fz + gdir.z * 2.4);
    fallGroup.add(pool);

    // river at the bottom of the gorge
    const riverPts = G.path.map((p) => new THREE.Vector3(p[0], this.#terrainBase(p[0], p[2]) + 0.25, p[2]));
    const riverCurve = new THREE.CatmullRomCurve3(riverPts, false, 'centripetal', 0.5);
    const rN = 60;
    const rp = new Float32Array((rN + 1) * 2 * 3);
    const ruv = new Float32Array((rN + 1) * 2 * 2);
    const ridx = [];
    const tmpV = new THREE.Vector3(); const tanV = new THREE.Vector3(); const rightV = new THREE.Vector3();
    for (let i = 0; i <= rN; i++) {
      const t = i / rN;
      riverCurve.getPointAt(t, tmpV);
      riverCurve.getTangentAt(t, tanV).normalize();
      rightV.crossVectors(UP, tanV).normalize();
      const w = G.width * 0.30;
      for (let s = 0; s < 2; s++) {
        const o = (i * 2 + s) * 3;
        const sgn = s === 0 ? -1 : 1;
        rp[o] = tmpV.x + rightV.x * w * sgn;
        rp[o + 1] = tmpV.y;
        rp[o + 2] = tmpV.z + rightV.z * w * sgn;
        ruv[(i * 2 + s) * 2] = s;
        ruv[(i * 2 + s) * 2 + 1] = t * 24;
      }
      if (i < rN) {
        const a = i * 2, b = a + 1, cc = a + 2, d = a + 3;
        ridx.push(a, cc, b, b, cc, d);
      }
    }
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.BufferAttribute(rp, 3));
    rg.setAttribute('uv', new THREE.BufferAttribute(ruv, 2));
    rg.setIndex(ridx);
    rg.computeVertexNormals();
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x59c9d8, roughness: 0.18, metalness: 0.0,
      normalMap: this.tex.waterN, normalScale: new THREE.Vector2(0.8, 0.8),
      transparent: true, opacity: 0.88, envMapIntensity: 1.2,
    });
    this.riverMat = riverMat;
    if (riverMat.normalMap) { riverMat.normalMap.wrapS = riverMat.normalMap.wrapT = THREE.RepeatWrapping; }
    const river = new THREE.Mesh(rg, riverMat);
    river.name = 'gorge-river';
    fallGroup.add(river);

    fallGroup.name = 'waterfall';
    this.root.add(fallGroup);
    void rng;
  }

  /* -------------------------------------------------------------- shortcut */

  /**
   * The dirt shortcut is baked into a small height + mask grid rather than a
   * second Ribbon: `sampleGround` then costs one array lookup instead of a
   * second spline projection.
   */
  #bakeShortcut() {
    const pts = L.SHORTCUT_POINTS.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
    const rb = this.ribbon;

    // snap the two ends onto the road so the branch actually joins it
    const a = rb.sample(rb.uAt(L.SHORTCUT_JOIN.enter));
    const b = rb.sample(rb.uAt(L.SHORTCUT_JOIN.exit));
    pts[0].copy(a.pos).addScaledVector(a.right, -a.width * 0.42);
    pts[pts.length - 1].copy(b.pos).addScaledVector(b.right, -b.width * 0.42);
    curve.updateArcLengths?.();

    const M = 220;
    const samples = [];
    const wKeys = L.SHORTCUT_WIDTH_KEYS;
    const pt = new THREE.Vector3(); const tan = new THREE.Vector3(); const rgt = new THREE.Vector3();
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (let i = 0; i <= M; i++) {
      const t = i / M;
      curve.getPointAt(t, pt);
      curve.getTangentAt(t, tan).normalize();
      rgt.crossVectors(UP, tan).normalize();
      // width profile across the keys
      const f = t * (wKeys.length - 1);
      const k0 = Math.min(wKeys.length - 1, Math.floor(f));
      const k1 = Math.min(wKeys.length - 1, k0 + 1);
      const kt = f - k0;
      const w = lerp(wKeys[k0][1], wKeys[k1][1], kt * kt * (3 - 2 * kt));
      samples.push({ p: pt.clone(), t: tan.clone(), r: rgt.clone(), w });
      minX = Math.min(minX, pt.x - w); maxX = Math.max(maxX, pt.x + w);
      minZ = Math.min(minZ, pt.z - w); maxZ = Math.max(maxZ, pt.z + w);
    }
    const pad = 14;
    minX -= pad; maxX += pad; minZ -= pad; maxZ += pad;

    const GN = 160;
    const gw = (maxX - minX) / GN, gh = (maxZ - minZ) / GN;
    const hgt = new Float32Array(GN * GN);
    const mask = new Float32Array(GN * GN);
    for (let j = 0; j < GN; j++) {
      const z = minZ + (j + 0.5) * gh;
      for (let i = 0; i < GN; i++) {
        const x = minX + (i + 0.5) * gw;
        let best = Infinity, bs = null;
        for (let k = 0; k < samples.length; k++) {
          const s = samples[k];
          const dx = x - s.p.x, dz = z - s.p.z;
          const d = dx * dx + dz * dz;
          if (d < best) { best = d; bs = s; }
        }
        const d = Math.sqrt(best);
        const half = bs.w * 0.5;
        const k = 1 - smoothstep(half, half + 6.0, d);
        mask[j * GN + i] = k;
        hgt[j * GN + i] = bs.p.y;
      }
    }
    this.shortcut = { curve, samples, minX, minZ, gw, gh, GN, hgt, mask };
  }

  #buildShortcutMesh() {
    const sc = this.shortcut;
    if (!sc) return;
    const S = sc.samples;
    const N = S.length - 1;
    const LANES = 4;
    const pos = new Float32Array((N + 1) * LANES * 3);
    const uv = new Float32Array((N + 1) * LANES * 2);
    const idx = [];
    let dist = 0;
    for (let i = 0; i <= N; i++) {
      const s = S[i];
      if (i > 0) dist += s.p.distanceTo(S[i - 1].p);
      const hw = s.w * 0.5;
      const lanes = [-hw - 1.6, -hw, hw, hw + 1.6];
      for (let l = 0; l < LANES; l++) {
        const lat = lanes[l];
        const o3 = (i * LANES + l) * 3;
        pos[o3] = s.p.x + s.r.x * lat;
        pos[o3 + 1] = s.p.y + (l === 0 || l === LANES - 1 ? -0.22 : 0.02);
        pos[o3 + 2] = s.p.z + s.r.z * lat;
        uv[(i * LANES + l) * 2] = lat / 6;
        uv[(i * LANES + l) * 2 + 1] = dist / 6;
      }
      if (i < N) {
        for (let l = 0; l < LANES - 1; l++) {
          const a = i * LANES + l, b = a + 1, c = (i + 1) * LANES + l, d = c + 1;
          idx.push(a, c, b, b, c, d);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    const dt = this.tex.dirt;
    for (const t of [dt.map, dt.normalMap]) { if (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; } }
    const mat = new THREE.MeshStandardMaterial({
      map: dt.map, normalMap: dt.normalMap, roughness: 1.0, metalness: 0,
      normalScale: new THREE.Vector2(0.9, 0.9),
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
    this.#breakTiling(mat, 6, 58, 0.40);
    const mesh = new THREE.Mesh(g, mat);
    mesh.receiveShadow = true;
    mesh.name = 'shortcut';
    this.root.add(mesh);

    // plank bridge over the creek, at the low point of the branch
    const mid = sc.samples[Math.floor(sc.samples.length * 0.42)];
    const plankGeos = [];
    const q = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(mid.t, ORIGIN, UP));
    const mm = new THREE.Matrix4();
    for (let i = -6; i <= 6; i++) {
      const bg = new THREE.BoxGeometry(mid.w + 1.0, 0.16, 0.75);
      bg.applyMatrix4(mm.compose(
        mid.p.clone().addScaledVector(mid.t, i * 0.95).setY(mid.p.y + 0.10),
        q, new THREE.Vector3(1, 1, 1)));
      plankGeos.push(bg);
    }
    for (const s of [-1, 1]) {
      for (let i = -6; i <= 6; i += 3) {
        const rail = new THREE.BoxGeometry(0.14, 1.0, 0.14);
        rail.applyMatrix4(mm.compose(
          mid.p.clone().addScaledVector(mid.t, i * 0.95)
            .addScaledVector(mid.r, s * (mid.w * 0.5 + 0.4)).setY(mid.p.y + 0.6),
          q, new THREE.Vector3(1, 1, 1)));
        plankGeos.push(rail);
      }
      const bar = new THREE.BoxGeometry(0.12, 0.12, 12.0);
      bar.applyMatrix4(mm.compose(
        mid.p.clone().addScaledVector(mid.r, s * (mid.w * 0.5 + 0.4)).setY(mid.p.y + 1.05),
        q, new THREE.Vector3(1, 1, 1)));
      plankGeos.push(bar);
    }
    const pg = mergeGeometries(plankGeos, false);
    const pm = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({
      map: this.tex.plank, color: 0xb08b5c, roughness: 0.95, metalness: 0,
    }));
    pm.castShadow = true; pm.receiveShadow = true;
    this.root.add(pm);
    plankGeos.forEach((x) => x.dispose());
  }

  /** O(1): dirt-path height + weight at (x, z), or null. */
  #shortcutAt(x, z) {
    const sc = this.shortcut;
    if (!sc) return null;
    const i = Math.floor((x - sc.minX) / sc.gw);
    const j = Math.floor((z - sc.minZ) / sc.gh);
    if (i < 0 || j < 0 || i >= sc.GN || j >= sc.GN) return null;
    const k = sc.mask[j * sc.GN + i];
    if (k < 0.02) return null;
    return { k, y: sc.hgt[j * sc.GN + i] };
  }

  /* -------------------------------------------------------------- scenery */

  /** One palm frond: a drooping, serrated blade pointing along +X. */
  #frondGeometry(len = 4.6, wid = 0.62) {
    const SEG = 7;
    const pos = [];
    const col = [];
    const idx = [];
    const dark = new THREE.Color(0x1f5e2a);
    const light = new THREE.Color(0x74c04a);
    const c = new THREE.Color();
    for (let i = 0; i <= SEG; i++) {
      const t = i / SEG;
      const x = len * t;
      const y = -1.9 * t * t * t - 0.15 * t;              // droop
      // wide in the middle, pointed at the tip, with a saw edge
      const saw = 1 + (i % 2 === 0 ? 0.16 : -0.16);
      const hw = wid * Math.sin(Math.PI * Math.pow(t, 0.62)) * saw + 0.03;
      c.copy(dark).lerp(light, 0.25 + t * 0.75);
      pos.push(x, y + 0.05, 0); col.push(c.r, c.g, c.b);   // mid-rib, slightly raised
      pos.push(x, y, -hw); col.push(c.r * 0.8, c.g * 0.8, c.b * 0.8);
      pos.push(x, y, hw); col.push(c.r * 0.8, c.g * 0.8, c.b * 0.8);
      if (i < SEG) {
        const a = i * 3;
        idx.push(a, a + 3, a + 1, a + 1, a + 3, a + 4);      // left half
        idx.push(a, a + 2, a + 3, a + 2, a + 5, a + 3);      // right half
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  #buildScenery(rng) {
    const q = this.q;
    const rb = this.ribbon;
    const PALMS = q === 'low' ? 150 : q === 'medium' ? 300 : 460;
    const FRONDS = q === 'low' ? 7 : 9;
    const TREES = q === 'low' ? 260 : q === 'medium' ? 620 : 1100;
    const BUSHES = q === 'low' ? 300 : q === 'medium' ? 800 : 1500;
    const ROCKS = q === 'low' ? 120 : 340;

    const m = new THREE.Matrix4();
    const qq = new THREE.Quaternion();
    const e = new THREE.Euler();
    const one = new THREE.Vector3(1, 1, 1);
    const scl = new THREE.Vector3();
    const at = new THREE.Vector3();
    const probe = new THREE.Vector3();
    const proj = { u: 0, lateral: 0, distAlong: 0, forward: new THREE.Vector3(), index: 0 };
    const cvec = new THREE.Color();

    /** Pick a scatter position near the ribbon; returns null when rejected. */
    const scatter = (minOff, maxOff, minY, maxY, minClear) => {
      const u = rng.next();
      const fr = rb.sample(u);
      const side = rng.sign();
      const half = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
      const off = half + minOff + rng.range(0, maxOff);
      at.copy(fr.pos).addScaledVector(fr.right, side * off);
      probe.set(at.x, 0, at.z);
      rb.project(probe, proj);
      const frp = rb.sample(proj.u);
      if (Math.abs(proj.lateral) < frp.width * 0.5 + minClear) return null;
      if (this.#shortcutAt(at.x, at.z)) return null;
      const gy = this.#terrainBase(at.x, at.z);
      if (gy < minY || gy > maxY) return null;
      at.y = gy;
      return { fr, frp, gy };
    };

    /** Unit vector pointing out to sea (palms lean that way). */
    const seaDir = new THREE.Vector3();
    const leanToSea = (x, z) => {
      const dz = z - L.WORLD.coastZ;
      const dx = x - L.WORLD.coastX;
      if (dz < dx) seaDir.set(0, 0, -1); else seaDir.set(-1, 0, 0);
      return seaDir;
    };

    // ---------------------------------------------------------------- palms
    // Trunk: a curved, tapered sweep. The crown is placed at the *analytic*
    // top of that sweep, not at a guessed offset, so the fronds can never end
    // up floating beside a bare pole.
    const TRUNK_H = 7.4;
    const TRUNK_BEND = 1.45;          // metres of lateral sweep at the top
    const trunkTopLocal = new THREE.Vector3(TRUNK_BEND, TRUNK_H, 0);

    const trunkGeo = new THREE.CylinderGeometry(0.16, 0.32, TRUNK_H, 7, 5);
    trunkGeo.translate(0, TRUNK_H * 0.5, 0);
    {
      const tp = trunkGeo.attributes.position;
      for (let i = 0; i < tp.count; i++) {
        const y = tp.getY(i);
        const t = y / TRUNK_H;
        tp.setX(i, tp.getX(i) + TRUNK_BEND * t * t);
        // ring scars
        const ring = 1 + Math.sin(t * 42) * 0.035;
        tp.setX(i, tp.getX(i) * 1);
        tp.setZ(i, tp.getZ(i) * ring);
      }
      trunkGeo.computeVertexNormals();
    }
    // crown boss so the fronds have something to grow out of
    const bossGeo = new THREE.ConeGeometry(0.34, 0.9, 7);
    bossGeo.translate(TRUNK_BEND, TRUNK_H + 0.2, 0);
    const palmTrunkGeo = mergeGeometries([trunkGeo, bossGeo], false);
    trunkGeo.dispose(); bossGeo.dispose();

    const trunkMat = new THREE.MeshStandardMaterial({
      map: this.tex.bark, color: 0xa07c50, roughness: 0.95, metalness: 0,
    });
    const frondGeo = this.#frondGeometry(4.7, 0.66);
    const frondMat = new THREE.MeshStandardMaterial({
      vertexColors: true, side: THREE.DoubleSide, roughness: 0.72, metalness: 0,
      color: 0xffffff,
    });

    const trunks = new THREE.InstancedMesh(palmTrunkGeo, trunkMat, PALMS);
    const fronds = new THREE.InstancedMesh(frondGeo, frondMat, PALMS * FRONDS);
    trunks.castShadow = true;
    fronds.castShadow = q === 'ultra';
    fronds.receiveShadow = false;

    const topWorld = new THREE.Vector3();
    const leanQ = new THREE.Quaternion();
    const yawQ = new THREE.Quaternion();
    let ti = 0, fi = 0, guard = 0;
    while (ti < PALMS && guard++ < PALMS * 14) {
      const hit = scatter(4, 44, 0.7, 26, 4.5);
      if (!hit) continue;
      // cluster palms: reject a lot of the inland ones so they hug the beach
      if (at.y > 8 && rng.next() < 0.72) continue;

      const scale = rng.range(0.78, 1.24);
      // lean toward the sea, gently, with a little scatter
      const sd = leanToSea(at.x, at.z);
      const baseYaw = Math.atan2(sd.x, sd.z) + rng.range(-0.55, 0.55);
      const tilt = rng.range(0.05, 0.19);
      yawQ.setFromAxisAngle(UP, baseYaw);
      // tilt about the axis perpendicular to the lean direction
      leanQ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
      e.set(0, baseYaw, 0);
      qq.setFromEuler(e);
      // trunk sweeps along its local +X; tilt around local +Z leans it further
      const tiltQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, -1), tilt);
      qq.multiply(tiltQ);

      m.compose(at, qq, one.clone().multiplyScalar(scale));
      trunks.setMatrixAt(ti, m);

      // exact world position of the trunk tip
      topWorld.copy(trunkTopLocal).multiplyScalar(scale).applyQuaternion(qq).add(at);
      topWorld.y += 0.15 * scale;

      for (let k = 0; k < FRONDS; k++) {
        const a = (k / FRONDS) * Math.PI * 2 + rng.range(-0.14, 0.14) + baseYaw;
        const pitch = rng.range(0.16, 0.62);
        e.set(0, a, pitch);
        const fq = new THREE.Quaternion().setFromEuler(e);
        // inherit the trunk's lean so the crown sits square on the tip
        fq.premultiply(tiltQ);
        const fs = scale * rng.range(0.82, 1.16);
        m.compose(topWorld, fq, scl.set(fs, fs, fs));
        fronds.setMatrixAt(fi++, m);
      }
      ti++;
    }
    trunks.count = ti;
    fronds.count = fi;
    trunks.instanceMatrix.needsUpdate = true;
    fronds.instanceMatrix.needsUpdate = true;
    this.root.add(trunks, fronds);
    this.palmCount = ti;
    void leanQ; void yawQ;

    // --------------------------------------------------- jungle broadleaves
    // A trunk + two crossed canopy shells; enough silhouette at distance and
    // only two instanced draw calls for the whole hillside.
    const jTrunkGeo = new THREE.CylinderGeometry(0.16, 0.34, 4.6, 5);
    jTrunkGeo.translate(0, 2.3, 0);
    const jTrunk = new THREE.InstancedMesh(jTrunkGeo,
      new THREE.MeshStandardMaterial({ map: this.tex.bark, color: 0x8d6a45, roughness: 0.95 }),
      TREES);
    const canopyGeo = new THREE.IcosahedronGeometry(1, 0);
    {
      const cp = canopyGeo.attributes.position;
      for (let i = 0; i < cp.count; i++) {
        cp.setY(i, cp.getY(i) * 0.72);
        cp.setX(i, cp.getX(i) * (0.9 + hash2i(i, 3, 71) * 0.35));
        cp.setZ(i, cp.getZ(i) * (0.9 + hash2i(i, 7, 91) * 0.35));
      }
      canopyGeo.computeVertexNormals();
    }
    const canopy = new THREE.InstancedMesh(canopyGeo,
      new THREE.MeshStandardMaterial({ roughness: 0.86, metalness: 0, flatShading: true, vertexColors: false }),
      TREES);
    canopy.castShadow = q !== 'low';
    jTrunk.castShadow = q !== 'low';

    let tj = 0; guard = 0;
    const greens = [0x2f7a38, 0x246a30, 0x3d8f3f, 0x1f5f2c, 0x4f9a42, 0x2a6d4a];
    while (tj < TREES && guard++ < TREES * 10) {
      const hit = scatter(6, 240, 4.5, 130, 6);
      if (!hit) continue;
      const s = rng.range(0.8, 2.1);
      e.set(0, rng.range(0, Math.PI * 2), 0);
      qq.setFromEuler(e);
      m.compose(at, qq, scl.set(s, s * rng.range(0.85, 1.25), s));
      jTrunk.setMatrixAt(tj, m);
      const cs = s * rng.range(1.9, 3.1);
      m.compose(at.clone().setY(at.y + 4.4 * s), qq, scl.set(cs, cs * 0.86, cs));
      canopy.setMatrixAt(tj, m);
      canopy.setColorAt(tj, cvec.setHex(rng.pick(greens)));
      tj++;
    }
    jTrunk.count = tj; canopy.count = tj;
    jTrunk.instanceMatrix.needsUpdate = true;
    canopy.instanceMatrix.needsUpdate = true;
    if (canopy.instanceColor) canopy.instanceColor.needsUpdate = true;
    this.root.add(jTrunk, canopy);

    // ---------------------------------------------------------------- bushes
    const bushGeo = new THREE.IcosahedronGeometry(1, 0);
    {
      const bp = bushGeo.attributes.position;
      for (let i = 0; i < bp.count; i++) {
        bp.setY(i, bp.getY(i) * 0.62 + 0.3);
        bp.setX(i, bp.getX(i) * (0.85 + hash2i(i, 11, 31) * 0.5));
      }
      bushGeo.computeVertexNormals();
    }
    const bushes = new THREE.InstancedMesh(bushGeo,
      new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0, flatShading: true }),
      BUSHES);
    let bi2 = 0; guard = 0;
    const bushCols = [0x3e8b3c, 0x2c6f33, 0x59a044, 0x6f9a3a, 0x8aa53c, 0x2f7a55];
    while (bi2 < BUSHES && guard++ < BUSHES * 8) {
      const hit = scatter(3.2, 170, 1.4, 140, 3.4);
      if (!hit) continue;
      const s = rng.range(0.5, 1.5);
      e.set(rng.range(-0.1, 0.1), rng.range(0, Math.PI * 2), rng.range(-0.1, 0.1));
      qq.setFromEuler(e);
      m.compose(at, qq, scl.set(s * rng.range(0.8, 1.4), s * rng.range(0.6, 1.1), s * rng.range(0.8, 1.4)));
      bushes.setMatrixAt(bi2, m);
      bushes.setColorAt(bi2, cvec.setHex(rng.pick(bushCols)));
      bi2++;
    }
    bushes.count = bi2;
    bushes.instanceMatrix.needsUpdate = true;
    if (bushes.instanceColor) bushes.instanceColor.needsUpdate = true;
    this.root.add(bushes);

    // ----------------------------------------------------------------- rocks
    const rockGeo = new THREE.DodecahedronGeometry(1, 0);
    const rocks = new THREE.InstancedMesh(rockGeo,
      new THREE.MeshStandardMaterial({
        map: this.tex.ground.rock, color: 0xb9b0a0, roughness: 0.98, metalness: 0, flatShading: true,
      }), ROCKS);
    rocks.castShadow = q !== 'low'; rocks.receiveShadow = true;
    let ri2 = 0; guard = 0;
    while (ri2 < ROCKS && guard++ < ROCKS * 8) {
      const hit = scatter(2.6, 200, -1.0, 150, 3.0);
      if (!hit) continue;
      const s = rng.range(0.5, 2.6);
      e.set(rng.range(0, 1), rng.range(0, Math.PI * 2), rng.range(0, 1));
      qq.setFromEuler(e);
      m.compose(at.clone().setY(at.y - s * 0.35), qq,
        scl.set(s * rng.range(0.8, 1.5), s * rng.range(0.5, 1.0), s * rng.range(0.8, 1.5)));
      rocks.setMatrixAt(ri2++, m);
    }
    rocks.count = ri2;
    rocks.instanceMatrix.needsUpdate = true;
    this.root.add(rocks);

    // ------------------------------------------------------ beach parasols
    const PARASOLS = q === 'low' ? 0 : 26;
    if (PARASOLS) {
      const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.3, 5);
      poleGeo.translate(0, 1.15, 0);
      const topGeo = new THREE.ConeGeometry(1.5, 0.75, 9);
      topGeo.translate(0, 2.35, 0);
      const poles = new THREE.InstancedMesh(poleGeo,
        new THREE.MeshStandardMaterial({ color: 0xd8cdb4, roughness: 0.8 }), PARASOLS);
      const tops = new THREE.InstancedMesh(topGeo,
        new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0, side: THREE.DoubleSide }), PARASOLS);
      tops.castShadow = true;
      const sunCols = [0xd8232a, 0xffd21e, 0x1eae4b, 0xf2f6f8, 0x2fb3a6];
      let pi2 = 0; guard = 0;
      while (pi2 < PARASOLS && guard++ < PARASOLS * 24) {
        const hit = scatter(6, 40, 0.6, 3.4, 6);
        if (!hit) continue;
        e.set(rng.range(-0.06, 0.06), rng.range(0, Math.PI * 2), rng.range(-0.06, 0.06));
        qq.setFromEuler(e);
        const s = rng.range(0.85, 1.15);
        m.compose(at, qq, scl.set(s, s, s));
        poles.setMatrixAt(pi2, m);
        tops.setMatrixAt(pi2, m);
        tops.setColorAt(pi2, cvec.setHex(rng.pick(sunCols)));
        pi2++;
      }
      poles.count = pi2; tops.count = pi2;
      poles.instanceMatrix.needsUpdate = true;
      tops.instanceMatrix.needsUpdate = true;
      if (tops.instanceColor) tops.instanceColor.needsUpdate = true;
      this.root.add(poles, tops);
    }
  }

  /* ------------------------------------------------------------- WorldAPI */

  #api() {
    const self = this;
    const rb = this.ribbon;
    const v = new THREE.Vector3();
    const proj = { u: 0, lateral: 0, distAlong: 0, forward: new THREE.Vector3(), index: 0 };
    const out = { y: 0, normal: new THREE.Vector3(0, 1, 0), surface: 'grass', onTrack: false, banking: 0 };

    const isBoost = (u, lateral) => {
      for (const b of self.boostRanges) {
        let d = Math.abs(u - b.u); if (d > 0.5) d = 1 - d;
        if (d > b.half) continue;
        for (const lane of b.lanes) if (Math.abs(lateral - lane) < 1.4) return true;
      }
      return false;
    };

    return {
      trackLength: self.trackLength,
      checkpoints: self.checkpoints,
      checkpointCount: self.checkpoints.length,
      itemBoxSpots: self.itemBoxSpots,
      minY: -60,
      maxLateral: 110,
      ribbon: rb,

      sampleGround(x, z) {
        v.set(x, 0, z);
        rb.project(v, proj);
        const fr = rb.sample(proj.u);
        const lat = proj.lateral;
        const half = fr.width * 0.5;
        const shoulder = Math.max(0.6, fr.shoulder);
        const a = Math.abs(lat);

        out.banking = fr.banking;
        if (a <= half) {
          out.y = fr.pos.y + fr.right.y * lat;
          out.normal.copy(fr.normal);
          out.surface = isBoost(proj.u, lat) ? 'boost' : 'road';
          out.onTrack = true;
        } else if (a <= half + KERB_W) {
          out.y = fr.pos.y + fr.right.y * lat + KERB_RISE;
          out.normal.copy(fr.normal);
          out.surface = 'road';
          out.onTrack = true;
        } else if (a <= half + KERB_W + shoulder) {
          out.y = fr.pos.y + fr.right.y * lat - SHOULDER_DROP;
          out.normal.copy(fr.normal);
          out.surface = 'dirt';
          out.onTrack = false;
        } else {
          const gy = self.#groundHeight(x, z, proj, fr);
          out.normal.set(0, 1, 0);
          out.onTrack = false;
          const sc = self.#shortcutAt(x, z);
          if (sc && sc.k > 0.35) {
            out.y = gy * (1 - sc.k) + sc.y * sc.k;
            out.surface = 'dirt';
          } else {
            out.y = gy;
            out.surface = gy <= L.WORLD.seaLevel + 0.15 ? 'water'
              : gy < 2.6 ? 'sand' : 'grass';
          }
        }
        return out;
      },

      sampleSpline(u) { return rb.sample(u); },
      project(pos) { return rb.project(pos); },

      collideWall(pos, radius = 1.0) {
        v.set(pos.x, 0, pos.z);
        rb.project(v, proj);
        const fr = rb.sample(proj.u);
        const half = fr.width * 0.5 + KERB_W + Math.max(0.6, fr.shoulder);
        const side = Math.sign(proj.lateral) || 1;
        const w = side < 0 ? fr.wallL : fr.wallR;
        if (!w || w <= 0.01) return null;
        const limit = half + 0.55;
        const depth = Math.abs(proj.lateral) + radius - limit;
        if (depth <= 0) return null;
        return { normal: fr.right.clone().multiplyScalar(-side), depth };
      },

      respawn(u) {
        const fr = rb.sample(((u % 1) + 1) % 1);
        const position = fr.pos.clone().addScaledVector(fr.normal, 1.4);
        const quaternion = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(fr.tangent, ORIGIN, fr.normal));
        return { position, quaternion };
      },

      startGrid(i) {
        // two-abreast, staggered back from the line
        const row = Math.floor(i / 2);
        const backM = 6 + row * 5.5;
        const u = ((-backM / self.trackLength) % 1 + 1) % 1;
        const fr = rb.sample(u);
        const lane = (i % 2 === 0 ? -1 : 1) * Math.min(3.4, fr.width * 0.22);
        const position = fr.pos.clone()
          .addScaledVector(fr.right, lane)
          .addScaledVector(fr.normal, 0.6);
        const quaternion = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().lookAt(fr.tangent, ORIGIN, fr.normal));
        return { position, quaternion };
      },
    };
  }

  lateUpdate(dt, ctx) {
    const t = ctx.time.t;
    if (this.waterUniforms) this.waterUniforms.uTime.value = t;
    if (this.riverMat?.normalMap) this.riverMat.normalMap.offset.set(t * 0.02, -t * 0.55);
    if (this.fallMat?.map) this.fallMat.map.offset.y = (-t * 1.35) % 1;
    if (this.boostMat) {
      this.boostMat.emissiveIntensity = 1.3 + Math.sin(t * 6.0) * 0.5;
      if (this.tex.boost) this.tex.boost.offset.y = (-t * 1.6) % 1;
    }
  }

  dispose() {
    this.root?.traverse((o) => {
      o.geometry?.dispose?.();
      const m = o.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose?.()); else m?.dispose?.();
    });
    this.root?.parent?.remove(this.root);
  }
}

/** slope+height -> rock dominance, shared by tint and splat. */
function rockK(slope, y, n) {
  return clamp(smoothstep(0.42 + n * 0.22, 0.95, slope) + smoothstep(52 + n * 34, 118 + n * 30, y), 0, 1);
}
