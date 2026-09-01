import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as PT from './procTextures.js';

/**
 * The kart, built procedurally.
 *
 * The previous pass lathed a flat pan and hung tubes off it, which read as a
 * skeleton sled: no volume, no shoulder line, nothing to catch light. This one
 * is built the way a Mario Kart chassis is drawn — a deep tub with real walls,
 * an open cockpit well cut into it, fenders arching over every wheel and a
 * heavy tail over the rear axle.
 *
 * The tub is one continuous loft. Every cross-section is a closed ring made of
 * an outer half-superellipse (the hull) plus a return path across the top. That
 * return path is blended between a flat deck lid and a scooped footwell by a
 * single `open` curve, so the cockpit opens and closes smoothly without the
 * topology ever changing. The three spans of the ring go to three different
 * materials — hull to paint, the two rim segments to trim, the return path to
 * dark plastic — which is what gives the rim its painted lip.
 *
 * Everything static is merged per material, and all four wheels are one pair of
 * InstancedMeshes, because eight of these have to fit in the draw-call budget.
 *
 * Local space: +Z forward, +Y up, +X to the driver's left, origin on the
 * ground between the wheels.
 */

const LIVERIES = [
  { name: 'rasta',   body: 0x108b3d, trim: 0xf2bd18, accent: 0xc21c22, rim: 0xf2bd18 },
  { name: 'sunset',  body: 0xd8511f, trim: 0xf6c56a, accent: 0x7a2559, rim: 0xf6c56a },
  { name: 'ocean',   body: 0x13649f, trim: 0x8fd8f2, accent: 0x0a3363, rim: 0xcfd6dc },
  { name: 'lime',    body: 0x6fae1f, trim: 0xe4f5bd, accent: 0x28590d, rim: 0xe4f5bd },
  { name: 'magenta', body: 0xa8206c, trim: 0xf1b6d8, accent: 0x4a0b2d, rim: 0xf1b6d8 },
  { name: 'violet',  body: 0x5c3aa8, trim: 0xb9a6ea, accent: 0x241548, rim: 0xb9a6ea },
  { name: 'coal',    body: 0x22262c, trim: 0xd94c1e, accent: 0x0d1014, rim: 0xd94c1e },
  { name: 'cream',   body: 0xd8c8a2, trim: 0x2f5d3d, accent: 0xb81f24, rim: 0x2f5d3d },
];

/* ------------------------------------------------------------------ maths */

/** Piecewise-smoothstep through a table of [t, value] control points. */
function curve(table, t) {
  if (t <= table[0][0]) return table[0][1];
  const last = table[table.length - 1];
  if (t >= last[0]) return last[1];
  for (let i = 1; i < table.length; i++) {
    if (t > table[i][0]) continue;
    const [t0, v0] = table[i - 1];
    const [t1, v1] = table[i];
    const s = (t - t0) / (t1 - t0);
    return v0 + (v1 - v0) * (s * s * (3 - 2 * s));
  }
  return last[1];
}

const sgnPow = (v, e) => (v < 0 ? -Math.pow(-v, e) : Math.pow(v, e));

function geom(pos, nrm, uv, idx) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  if (nrm && nrm.length === pos.length) {
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
  }
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  if (!g.attributes.normal) g.computeVertexNormals();
  return g;
}

/** Revolve a profile of [x, radius] pairs about the X axis. */
function lathe(profile, segs = 18) {
  const pos = [], uv = [], idx = [];
  for (let i = 0; i < profile.length; i++) {
    const [x, r] = profile[i];
    for (let j = 0; j <= segs; j++) {
      const a = (j / segs) * Math.PI * 2;
      pos.push(x, Math.cos(a) * r, Math.sin(a) * r);
      uv.push(j / segs, i / (profile.length - 1));
    }
  }
  for (let i = 0; i < profile.length - 1; i++) {
    for (let j = 0; j < segs; j++) {
      const a = i * (segs + 1) + j, b = a + 1;
      const c = (i + 1) * (segs + 1) + j, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  return geom(pos, null, uv, idx);
}

/** Superellipsoid — a box with the corners rounded off by `e`. */
function roundBox(w, h, d, e = 0.34, nu = 12, nv = 7) {
  const pos = [], uv = [], idx = [];
  for (let i = 0; i <= nv; i++) {
    const v = (i / nv) * Math.PI - Math.PI / 2;
    const cv = sgnPow(Math.cos(v), e), sv = sgnPow(Math.sin(v), e);
    for (let j = 0; j <= nu; j++) {
      const u = (j / nu) * Math.PI * 2;
      pos.push(cv * sgnPow(Math.cos(u), e) * w * 0.5, sv * h * 0.5, cv * sgnPow(Math.sin(u), e) * d * 0.5);
      uv.push(j / nu, i / nv);
    }
  }
  for (let i = 0; i < nv; i++) {
    for (let j = 0; j < nu; j++) {
      const a = i * (nu + 1) + j, b = a + 1;
      const c = (i + 1) * (nu + 1) + j, dd = c + 1;
      idx.push(a, c, b, b, c, dd);
    }
  }
  const g = geom(pos, null, uv, idx);
  g.computeVertexNormals();
  return g;
}

/**
 * A fender: a curved plate of finite thickness and width swept over an arc in
 * the YZ plane, centred on the wheel it covers.
 */
function archGeometry(radius, thickness, width, a0, a1, segs = 12) {
  const pos = [], uv = [], idx = [];
  const hw = width * 0.5;
  const ro = radius + thickness;
  // section corners, in (across, radial) — a squat rectangle with clipped tips
  const sect = [[-hw, radius], [-hw * 0.86, ro], [hw * 0.86, ro], [hw, radius]];
  for (let i = 0; i <= segs; i++) {
    const a = a0 + (a1 - a0) * (i / segs);
    const ca = Math.cos(a), sa = Math.sin(a);
    for (let k = 0; k < sect.length; k++) {
      const [across, r] = sect[k];
      pos.push(across, sa * r, ca * r);
      uv.push(i / segs, k / (sect.length - 1));
    }
  }
  const N = sect.length;
  for (let i = 0; i < segs; i++) {
    for (let k = 0; k < N - 1; k++) {
      const a = i * N + k, b = a + 1, c = (i + 1) * N + k, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  // close the two ends so the plate is a solid, not a shell
  for (const [i, flip] of [[0, false], [segs, true]]) {
    const base = i * N;
    const tri = flip ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
    for (const o of tri) idx.push(base + o);
  }
  const g = geom(pos, null, uv, idx);
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------- chassis loft profiles */

const LEN = 1.03;                         // half length, metres
const WALL = 0.075;                       // tub wall thickness
const WELL_Y = 0.215;                     // cockpit floor

// t: -1 at the tail, +1 at the nose
const HALF_W = [[-1.00, 0.16], [-0.93, 0.36], [-0.80, 0.455], [-0.58, 0.490],
  [-0.20, 0.500], [0.15, 0.490], [0.45, 0.462], [0.72, 0.400], [0.90, 0.290], [1.00, 0.140]];
const RIM_Y = [[-1.00, 0.470], [-0.90, 0.610], [-0.74, 0.672], [-0.56, 0.668],
  [-0.42, 0.618], [-0.10, 0.590], [0.25, 0.578], [0.55, 0.528], [0.80, 0.448], [1.00, 0.372]];
const FLOOR_Y = [[-1.00, 0.240], [-0.86, 0.152], [-0.55, 0.112], [0.20, 0.108],
  [0.55, 0.126], [0.82, 0.190], [1.00, 0.280]];
const OPEN = [[-1.00, 0], [-0.60, 0], [-0.49, 1], [0.24, 1], [0.40, 0], [1.00, 0]];

const SEG_Z = 26;      // slices along the kart
const N_OUT = 20;      // points on the outer hull path
const N_IN = 12;       // points on the deck / footwell return path

/**
 * Build the tub. Returns four geometries (hull, rim lip, cockpit lining, caps)
 * plus the sampled hull grid, which the decal patches reuse so the stickers sit
 * exactly on the surface instead of z-fighting a flat plane against it.
 */
function buildTub() {
  const RING = N_OUT + N_IN;
  const pos = [], uv = [];
  for (let i = 0; i <= SEG_Z; i++) {
    const t = (i / SEG_Z) * 2 - 1;
    const z = t * LEN;
    const hw = curve(HALF_W, t);
    const rim = curve(RIM_Y, t);
    const floor = curve(FLOOR_Y, t);
    const open = curve(OPEN, t);
    const ihw = Math.max(0.03, hw - WALL);
    const ry = rim - floor;

    // outer hull: left rim -> around the belly -> right rim
    for (let j = 0; j < N_OUT; j++) {
      const s = j / (N_OUT - 1);
      const a = Math.PI * (1 + s);
      const p = 3.1;
      const sx = sgnPow(Math.cos(a), 2 / p);
      const sy = sgnPow(Math.sin(a), 2 / p);
      pos.push(sx * hw, rim + sy * ry, z);
      uv.push(s, (i / SEG_Z) * 2.4);
    }
    // return path: right inner rim -> left inner rim, lid or footwell
    const depth = (rim - WELL_Y) * open;
    for (let j = 0; j < N_IN; j++) {
      const s = j / (N_IN - 1);
      const a = Math.PI * (1 + s);
      const p = 2.4;
      const sx = -sgnPow(Math.cos(a), 2 / p);        // mirrored: right -> left
      const sy = sgnPow(Math.sin(a), 2 / p);
      const lidY = rim - 0.018 * (1 - sx * sx);
      pos.push(sx * ihw, lidY + sy * depth, z);
      uv.push(s, (i / SEG_Z) * 2.4);
    }
  }

  const hull = [], lip = [], well = [];
  for (let i = 0; i < SEG_Z; i++) {
    for (let e = 0; e < RING; e++) {
      const j2 = (e + 1) % RING;
      const a = i * RING + e, b = i * RING + j2;
      const c = (i + 1) * RING + e, d = (i + 1) * RING + j2;
      const quad = [a, c, b, b, c, d];
      const bucket = e < N_OUT - 1 ? hull : (e === N_OUT - 1 || e === RING - 1) ? lip : well;
      bucket.push(...quad);
    }
  }

  // flat caps at nose and tail: fan around the (closed, convex-ish) ring
  const caps = [];
  const capPos = [...pos], capUv = [...uv];
  for (const [ring, flip] of [[0, true], [SEG_Z, false]]) {
    let cx = 0, cy = 0, cz = 0;
    for (let e = 0; e < RING; e++) {
      cx += pos[(ring * RING + e) * 3]; cy += pos[(ring * RING + e) * 3 + 1]; cz += pos[(ring * RING + e) * 3 + 2];
    }
    const ci = capPos.length / 3;
    capPos.push(cx / RING, cy / RING, cz / RING);
    capUv.push(0.5, 0.5);
    for (let e = 0; e < RING; e++) {
      const a = ring * RING + e, b = ring * RING + ((e + 1) % RING);
      caps.push(...(flip ? [ci, b, a] : [ci, a, b]));
    }
  }

  const mk = (idx, p = pos, u = uv) => {
    const g = geom(p, null, u, idx);
    g.computeVertexNormals();
    return g;
  };
  return {
    hull: mergeGeometries([mk(hull), mk(caps, capPos, capUv)], false),
    lip: mk(lip),
    well: mk(well),
    grid: { pos, RING },
  };
}

/**
 * Carve a decal patch out of the hull grid: rows i0..i1 along the kart, ring
 * columns j0..j1 across it, pushed a hair off the surface along the normal.
 */
function decalPatch(grid, i0, i1, j0, j1, lift = 0.009, flipU = false, outward = 'x') {
  const { pos, RING } = grid;
  const pts = [], uv = [], idx = [];
  const nx = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const rows = i1 - i0, cols = j1 - j0;
  const at = (i, j, v) => v.fromArray(pos, (i * RING + j) * 3);
  for (let i = i0; i <= i1; i++) {
    for (let j = j0; j <= j1; j++) {
      at(i, j, a);
      at(Math.min(i + 1, SEG_Z), j, b);
      at(i, Math.min(j + 1, RING - 1), c);
      nx.copy(b).sub(a).cross(c.clone().sub(a)).normalize();
      if (nx.lengthSq() < 0.5) nx.set(0, 1, 0);
      // the winding of the source grid flips between spans, so force the lift
      // to point off the body rather than into it
      if (outward === 'x' ? nx.x * a.x < 0 : nx.y < 0) nx.negate();
      pts.push(a.x + nx.x * lift, a.y + nx.y * lift, a.z + nx.z * lift);
      const u = (i - i0) / rows;
      uv.push(flipU ? 1 - u : u, 1 - (j - j0) / cols);
    }
  }
  const W = cols + 1;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const p = i * W + j;
      idx.push(p, p + W, p + 1, p + 1, p + W, p + W + 1);
    }
  }
  const g = geom(pts, null, uv, idx);
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------------ shared resources */

let SHARED = null;
function shared() {
  if (SHARED) return SHARED;
  const tyre = PT.tyreTextures(256);
  const seat = PT.seatTextures(256);
  const paintN = PT.paintNormal(256);
  const metalN = PT.metalNormal(256);
  const plasticN = PT.plasticNormal(256);
  const livery = PT.liveryTexture(512, 256);
  const hood = PT.hoodTexture(256);
  const blob = PT.contactShadowTexture(128);
  for (const t of [tyre.map, tyre.normalMap, seat.map, seat.normalMap, paintN, metalN, plasticN]) {
    if (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  }
  tyre.map.repeat.set(6, 1);
  tyre.normalMap.repeat.set(6, 1);

  // Material families are shared by every kart: rubber, chrome, plastic and
  // upholstery never change with the livery, and reusing them keeps the
  // shader-program count flat across the grid.
  const chrome = new THREE.MeshStandardMaterial({
    color: 0xc6ced6, metalness: 1.0, roughness: 0.15,
    normalMap: metalN, normalScale: new THREE.Vector2(0.22, 0.22),
    envMapIntensity: 1.5,
  });
  const rubber = new THREE.MeshStandardMaterial({
    color: 0x121316, metalness: 0.0, roughness: 0.96,
    map: tyre.map, normalMap: tyre.normalMap,
    normalScale: new THREE.Vector2(1.35, 1.35), envMapIntensity: 0.22,
  });
  const darkPlastic = new THREE.MeshStandardMaterial({
    color: 0x191d23, metalness: 0.10, roughness: 0.62,
    normalMap: plasticN, normalScale: new THREE.Vector2(0.5, 0.5),
    envMapIntensity: 0.55,
  });
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x24272d, roughness: 0.80, metalness: 0.02,
    map: seat.map, normalMap: seat.normalMap, envMapIntensity: 0.45,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffeec0, emissive: 0xffcf72, emissiveIntensity: 0.9,
    roughness: 0.08, metalness: 0.0, clearcoat: 1.0,
  });
  const blobMat = new THREE.MeshBasicMaterial({
    map: blob, transparent: true, depthWrite: false, opacity: 0.62,
    color: 0x000000, toneMapped: false,
  });

  SHARED = {
    tyre, seat, paintN, metalN, plasticN, livery, hood, blob,
    chrome, rubber, darkPlastic, seatMat, glass, blobMat,
    tub: buildTub(),
    liveryMats: new Map(),
  };
  return SHARED;
}

/** One paint/trim/accent/decal set per colourway, built lazily and reused. */
function liveryMaterials(index) {
  const S = shared();
  if (S.liveryMats.has(index)) return S.liveryMats.get(index);
  const liv = LIVERIES[index % LIVERIES.length];
  const set = {
    liv,
    // Automotive paint: a tight clearcoat lobe so the highlight stays a
    // highlight instead of flooding the panel with sky.
    paint: new THREE.MeshPhysicalMaterial({
      color: liv.body, metalness: 0.0, roughness: 0.36,
      clearcoat: 0.95, clearcoatRoughness: 0.075,
      normalMap: S.paintN, normalScale: new THREE.Vector2(0.16, 0.16),
      envMapIntensity: 0.70,
    }),
    trim: new THREE.MeshPhysicalMaterial({
      color: liv.trim, metalness: 0.18, roughness: 0.30,
      clearcoat: 0.85, clearcoatRoughness: 0.10, envMapIntensity: 0.85,
    }),
    accent: new THREE.MeshPhysicalMaterial({
      color: liv.accent, metalness: 0.05, roughness: 0.34,
      clearcoat: 0.85, clearcoatRoughness: 0.10, envMapIntensity: 0.70,
    }),
    rim: new THREE.MeshStandardMaterial({
      color: liv.rim, metalness: 0.75, roughness: 0.28,
      normalMap: S.metalN, normalScale: new THREE.Vector2(0.2, 0.2),
      envMapIntensity: 1.1,
    }),
    decal: new THREE.MeshStandardMaterial({
      map: S.livery, transparent: true, roughness: 0.30, metalness: 0.0,
      envMapIntensity: 0.5, polygonOffset: true, polygonOffsetFactor: -2,
      polygonOffsetUnits: -2, side: THREE.DoubleSide, alphaTest: 0.02,
    }),
    hood: new THREE.MeshStandardMaterial({
      map: S.hood, transparent: true, roughness: 0.30, metalness: 0.0,
      envMapIntensity: 0.5, polygonOffset: true, polygonOffsetFactor: -2,
      polygonOffsetUnits: -2, side: THREE.DoubleSide, alphaTest: 0.02,
    }),
  };
  S.liveryMats.set(index, set);
  return set;
}

/* --------------------------------------------------------------- wheels */

/** Unit tyre: radius 1 in YZ, width 1 along X, so instances scale to size. */
function tyreGeometry() {
  return lathe([
    [-0.5, 0.60], [-0.5, 0.855], [-0.455, 0.965], [-0.33, 1.0],
    [0.33, 1.0], [0.455, 0.965], [0.5, 0.855], [0.5, 0.60],
  ], 20);
}
function rimGeometry() {
  return lathe([
    [-0.40, 0.0], [-0.40, 0.20], [-0.44, 0.40], [-0.40, 0.585], [-0.36, 0.635],
    [0.36, 0.635], [0.40, 0.585], [0.44, 0.40], [0.40, 0.20], [0.40, 0.0],
  ], 14);
}

/* =========================================================== KartModel === */

const WHEELS = [
  { name: 'FL', x: 0.545, z: 0.655, r: 0.255, w: 0.205, front: true },
  { name: 'FR', x: -0.545, z: 0.655, r: 0.255, w: 0.205, front: true },
  { name: 'RL', x: 0.555, z: -0.655, r: 0.335, w: 0.325, front: false },
  { name: 'RR', x: -0.555, z: -0.655, r: 0.335, w: 0.325, front: false },
];
// PhysicsSystem publishes contacts in FL, FR, RL, RR order; +X is the driver's
// left, so FL sits at +X. Keep the two arrays index-aligned.

export class KartModel {
  /**
   * @param {number} liveryIndex which colourway
   * @param {'high'|'medium'|'low'|'ultra'} quality
   */
  constructor(liveryIndex = 0, quality = 'high') {
    const S = shared();
    const M = liveryMaterials(liveryIndex);
    this.livery = M.liv;
    this.quality = quality;
    this.materials = M;
    this.owned = [];

    const root = new THREE.Group();
    root.name = `kart:${M.liv.name}`;
    this.root = root;

    const paintG = [], trimG = [], chromeG = [], darkG = [], accentG = [], seatG = [], glassG = [];
    const push = (bucket, g, m) => { if (m) g.applyMatrix4(m); bucket.push(g); };
    const at = (x, y, z, rx = 0, ry = 0, rz = 0) => new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );

    // ------------------------------------------------------------ the tub
    paintG.push(S.tub.hull.clone());
    trimG.push(S.tub.lip.clone());
    darkG.push(S.tub.well.clone());

    // ---------------------------------------------------------- fenders
    for (const w of WHEELS) {
      const flare = w.front ? 0.055 : 0.075;
      // archGeometry already sweeps in YZ with its width along X, which is
      // the wheel's own axle: it only needs dropping over the hub.
      const a = archGeometry(w.r + 0.045, w.front ? 0.055 : 0.072,
        w.w + flare * 2, Math.PI * 0.06, Math.PI * 0.94, w.front ? 9 : 12);
      push(paintG, a, at(w.x, w.r, w.z));
    }

    // ------------------------------------------------------- side pods
    for (const sx of [-1, 1]) {
      const pod = roundBox(0.16, 0.20, 1.02, 0.32, 10, 6);
      push(trimG, pod, at(sx * 0.485, 0.285, -0.02));
      const stripe = roundBox(0.055, 0.055, 0.94, 0.30, 8, 5);
      push(accentG, stripe, at(sx * 0.545, 0.325, -0.02));
    }

    // --------------------------------------------------- nose + bumper
    const snout = roundBox(0.50, 0.24, 0.34, 0.30, 12, 7);
    push(trimG, snout, at(0, 0.40, 0.90));
    const bumper = new THREE.TorusGeometry(0.30, 0.045, 7, 16, Math.PI * 1.05);
    push(chromeG, bumper, at(0, 0.315, 1.00, Math.PI / 2, 0, -Math.PI * 0.025));
    const rearBar = new THREE.TorusGeometry(0.34, 0.05, 7, 16, Math.PI * 1.05);
    push(chromeG, rearBar, at(0, 0.34, -1.02, Math.PI / 2, Math.PI, -Math.PI * 0.025));
    // grille under the nose
    for (let i = 0; i < 4; i++) {
      const bar = roundBox(0.40, 0.028, 0.05, 0.28, 6, 4);
      push(darkG, bar, at(0, 0.22 + i * 0.045, 0.965));
    }
    // headlights
    for (const sx of [-1, 1]) {
      const lamp = lathe([[-0.03, 0], [-0.03, 0.055], [0.02, 0.07], [0.03, 0.055], [0.03, 0]], 10);
      lamp.rotateY(Math.PI / 2);
      push(glassG, lamp, at(sx * 0.19, 0.455, 1.005));
    }

    // --------------------------------------------------------- cockpit
    // seat: pan + high back with side bolsters, sitting on the well floor
    const pan = roundBox(0.44, 0.09, 0.42, 0.28, 10, 5);
    push(seatG, pan, at(0, WELL_Y + 0.075, -0.235));
    const back = roundBox(0.46, 0.50, 0.14, 0.26, 10, 6);
    push(seatG, back, at(0, WELL_Y + 0.30, -0.455, -0.20));
    for (const sx of [-1, 1]) {
      const bolster = roundBox(0.09, 0.42, 0.17, 0.30, 8, 5);
      push(seatG, bolster, at(sx * 0.20, WELL_Y + 0.27, -0.410, -0.20));
    }
    // headrest hoop
    const hoop = new THREE.TorusGeometry(0.15, 0.032, 6, 14, Math.PI);
    push(chromeG, hoop, at(0, WELL_Y + 0.545, -0.500, -0.20, 0, 0));

    // dashboard: a raked panel with three gauge bezels
    const dash = roundBox(0.62, 0.10, 0.24, 0.30, 10, 5);
    push(darkG, dash, at(0, 0.500, 0.375, -0.42));
    for (let i = -1; i <= 1; i++) {
      const g = lathe([[-0.012, 0], [-0.012, 0.05], [0.012, 0.05], [0.012, 0]], 10);
      g.rotateX(Math.PI / 2 - 0.42);
      push(accentG, g, at(i * 0.16, 0.547, 0.390));
    }

    // steering column
    const column = lathe([[-0.20, 0.030], [0.20, 0.030]], 8);
    column.rotateY(Math.PI / 2);
    push(chromeG, column, at(0, 0.545, 0.055, 0.60));

    // ---------------------------------------------------- engine + pipes
    const block = roundBox(0.44, 0.30, 0.34, 0.22, 10, 6);
    push(darkG, block, at(0, 0.60, -0.82));
    for (let i = 0; i < 4; i++) {
      const fin = roundBox(0.48, 0.035, 0.30, 0.22, 8, 4);
      push(chromeG, fin, at(0, 0.60 + (i - 1.5) * 0.075, -0.82));
    }
    for (const sx of [-1, 1]) {
      const pipe = lathe([[-0.34, 0.055], [0.20, 0.062], [0.34, 0.070]], 10);
      pipe.rotateY(Math.PI / 2);
      push(chromeG, pipe, at(sx * 0.30, 0.545, -1.02, -0.22, 0, sx * 0.10));
      const tip = lathe([[-0.05, 0], [-0.05, 0.070], [0.03, 0.086], [0.05, 0.078],
        [0.055, 0.050], [0.020, 0.045], [0.020, 0]], 10);
      tip.rotateY(Math.PI / 2);
      push(accentG, tip.clone(), at(sx * 0.325, 0.612, -1.30, -0.22, 0, sx * 0.10));
      this[`exhaust${sx < 0 ? 'R' : 'L'}`] = { x: sx * 0.325, y: 0.612, z: -1.30 };
    }

    // --------------------------------------------------------- spoiler
    const wing = roundBox(0.98, 0.05, 0.26, 0.20, 10, 4);
    push(accentG, wing, at(0, 0.905, -0.99, 0.13));
    const lip2 = roundBox(0.98, 0.04, 0.07, 0.20, 8, 4);
    push(trimG, lip2, at(0, 0.928, -1.11, 0.13));
    for (const sx of [-1, 1]) {
      const stay = roundBox(0.045, 0.26, 0.11, 0.22, 6, 4);
      push(chromeG, stay, at(sx * 0.36, 0.775, -0.97, 0.13));
    }

    // --------------------------------------------------- coil-over springs
    for (const w of WHEELS) {
      const coil = lathe([[-0.09, 0.038], [0.09, 0.038]], 8);
      coil.rotateZ(Math.PI / 2);
      push(chromeG, coil, at(w.x * 0.68, w.r + 0.13, w.z));
    }

    // ------------------------------------------------------------ decals
    // Flanks: the hull grid columns 0..3 are the left wall, N_OUT-4..N_OUT-1
    // the right, so the sticker follows the real curvature of the tub.
    const decalG = [
      decalPatch(S.tub.grid, 7, 20, 0, 3, 0.010, false),
      decalPatch(S.tub.grid, 7, 20, N_OUT - 4, N_OUT - 1, 0.010, true),
    ];
    const hoodG = [decalPatch(S.tub.grid, 20, 25, N_OUT + 1, N_OUT + N_IN - 2, 0.012, false, 'y')];

    // ------------------------------------------------- merge and mount
    const mk = (list, mat, name, shadow = false) => {
      if (!list.length) return null;
      const g = mergeGeometries(list, false);
      for (const x of list) x.dispose();
      if (!g) return null;
      this.owned.push(g);
      const m = new THREE.Mesh(g, mat);
      m.name = name;
      m.castShadow = shadow;
      m.receiveShadow = true;
      root.add(m);
      return m;
    };
    this.paintMesh = mk(paintG, M.paint, 'body', true);
    mk(trimG, M.trim, 'trim', false);
    mk(chromeG, S.chrome, 'chrome', false);
    mk(darkG, S.darkPlastic, 'dark', false);
    this.accentMesh = mk(accentG, M.accent, 'accent', false);
    mk(seatG, S.seatMat, 'seat', true);
    mk(decalG, M.decal, 'decal', false);
    mk(hoodG, M.hood, 'hood', false);
    mk(glassG, S.glass, 'lamps', false);

    // ---------------------------------------------------- steering wheel
    const swG = [];
    const rim = new THREE.TorusGeometry(0.158, 0.026, 7, 18);
    swG.push(rim);
    for (let i = 0; i < 3; i++) {
      const a = i * (Math.PI * 2 / 3) + Math.PI / 2;
      const spoke = roundBox(0.135, 0.028, 0.022, 0.25, 6, 4);
      spoke.applyMatrix4(new THREE.Matrix4().compose(
        new THREE.Vector3(Math.cos(a) * 0.075, Math.sin(a) * 0.075, 0),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, a)),
        new THREE.Vector3(1, 1, 1),
      ));
      swG.push(spoke);
    }
    const hubGeo = lathe([[-0.018, 0], [-0.018, 0.050], [0.018, 0.050], [0.018, 0]], 12);
    hubGeo.rotateY(Math.PI / 2);
    swG.push(hubGeo);
    const swGeo = mergeGeometries(swG, false);
    for (const x of swG) x.dispose();
    this.owned.push(swGeo);
    const steer = new THREE.Group();
    steer.position.set(0, 0.632, 0.175);
    steer.rotation.x = 0.62;
    const swMesh = new THREE.Mesh(swGeo, S.darkPlastic);
    swMesh.name = 'wheelrim';
    steer.add(swMesh);
    root.add(steer);
    this.steeringWheel = steer;
    // 10-and-2 grips, in the wheel's own space so they turn with it
    const R = 0.168;
    this.gripL = new THREE.Vector3(Math.cos(0.42) * R, Math.sin(0.42) * R, 0.045);
    this.gripR = new THREE.Vector3(-Math.cos(0.42) * R, Math.sin(0.42) * R, 0.045);

    // ------------------------------------------------------------ wheels
    const tyreGeo = tyreGeometry();
    const rimGeo = rimGeometry();
    this.owned.push(tyreGeo, rimGeo);
    this.tyres = new THREE.InstancedMesh(tyreGeo, S.rubber, 4);
    this.rims = new THREE.InstancedMesh(rimGeo, M.rim, 4);
    this.tyres.castShadow = true;
    this.tyres.receiveShadow = true;
    this.rims.receiveShadow = true;
    for (const m of [this.tyres, this.rims]) {
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.frustumCulled = false;
      root.add(m);
    }
    this.spin = [0, 0, 0, 0];
    this.#dummy = new THREE.Object3D();
    this.#writeWheels([0.24, 0.24, 0.24, 0.24]);

    // ----------------------------------------------------- contact shadow
    const blobGeo = new THREE.PlaneGeometry(1.75, 2.45);
    blobGeo.rotateX(-Math.PI / 2);
    this.owned.push(blobGeo);
    this.blob = new THREE.Mesh(blobGeo, S.blobMat.clone());
    this.blob.position.y = 0.02;
    this.blob.renderOrder = -1;
    this.blob.frustumCulled = false;
    root.add(this.blob);

    // ---------------------------------------------------------- anchors
    this.driverAnchor = new THREE.Object3D();
    // hip pivot: on the seat pan, far enough back that the arms reach the wheel
    this.driverAnchor.position.set(0, WELL_Y + 0.205, -0.200);
    this.footAnchor = new THREE.Vector3(0, WELL_Y + 0.03, 0.22);
    this.seatY = WELL_Y + 0.205;
  }

  #dummy;

  #writeWheels(compressions, steer = 0) {
    const d = this.#dummy;
    for (let i = 0; i < 4; i++) {
      const w = WHEELS[i];
      const c = compressions[i] ?? 0.24;
      const lift = Math.max(-0.085, Math.min(0.085, (c - 0.24) * 0.42));
      d.position.set(w.x, w.r + lift, w.z);
      d.quaternion.setFromEuler(new THREE.Euler(this.spin[i], w.front ? steer : 0, 0, 'YXZ'));
      d.scale.set(w.w, w.r, w.r);
      d.updateMatrix();
      this.tyres.setMatrixAt(i, d.matrix);
      d.scale.set(w.w * 1.02, w.r, w.r);
      d.updateMatrix();
      this.rims.setMatrixAt(i, d.matrix);
    }
    this.tyres.instanceMatrix.needsUpdate = true;
    this.rims.instanceMatrix.needsUpdate = true;
  }

  /**
   * @param {object} k KartEntity
   * @param {number} dt
   */
  update(k, dt) {
    const steer = k.steerAngle ?? 0;
    const speed = k.forwardSpeed ?? k.speed ?? 0;
    const comp = [0, 1, 2, 3].map((i) => k.wheelContacts?.[i]?.compression ?? 0.24);
    for (let i = 0; i < 4; i++) this.spin[i] += (speed / WHEELS[i].r) * dt;
    this.#writeWheels(comp, steer * 0.55);

    if (this.steeringWheel) this.steeringWheel.rotation.z = -steer * 1.6;

    // tail-pipe glow while boosting
    const boosting = (k.boost?.timer ?? 0) > 0;
    const m = this.accentMesh?.material;
    if (m) {
      const want = boosting ? 1.6 : 0;
      m.emissive.setRGB(1.0, 0.45, 0.12);
      m.emissiveIntensity += (want - m.emissiveIntensity) * Math.min(1, dt * 12);
    }

    // contact shadow fades out in the air; it is the only cue at this scale
    // that tells the eye the kart is standing on the road.
    if (this.blob) {
      const want = k.onGround ? 0.62 : 0.12;
      const bm = this.blob.material;
      bm.opacity += (want - bm.opacity) * Math.min(1, dt * 8);
    }
  }

  dispose() {
    for (const g of this.owned) g.dispose?.();
    this.owned.length = 0;
    this.blob?.material?.dispose?.();
  }
}

export { LIVERIES, WHEELS };
