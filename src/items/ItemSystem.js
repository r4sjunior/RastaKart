import * as THREE from 'three';
import { ITEM, rollItem } from './itemDefs.js';

/**
 * =============================================================================
 *  ItemSystem — boxes, the roulette, and everything they fire.
 * =============================================================================
 *
 *  Six draw calls for the whole item layer:
 *
 *      1. item box shells   InstancedMesh, one per spot, iridescent
 *      2. item box cores    InstancedMesh, additive glow inside the shell
 *      3. shells            InstancedMesh, per-instance green/red
 *      4. bananas           InstancedMesh
 *      5. bombs             InstancedMesh
 *      6. orbiting triples  InstancedMesh
 *
 *  Every mesh is allocated at boot at its maximum count and hidden by writing a
 *  zero-scale matrix, so firing a shell costs one instance matrix and nothing
 *  else. There is no per-frame allocation in this file.
 *
 *  The roulette is weighted by race position (`itemDefs.js`): the leader gets
 *  coins and bananas, the tail of the field gets stars and lightning. That
 *  weighting is the whole reason the item layer exists — it is a rubber band
 *  with a face.
 *
 *  Visuals go through `ctx.vfx` when it is there. VfxSystem initialises *after*
 *  this one (order 50 vs 40), so the reference is always resolved lazily at the
 *  call site and every call is optional.
 */

const UP = new THREE.Vector3(0, 1, 0);
const AXIS_X = new THREE.Vector3(1, 0, 0);
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

const MAX_SHELLS = 10;
const MAX_BANANAS = 12;
const MAX_BOMBS = 4;
const BOX_RADIUS = 2.3;
const BOX_RESPAWN = 4.5;
const AI_USE_MIN = 0.7;
const AI_USE_MAX = 2.8;

/* ------------------------------------------------------------------ texture */

/** The "?" that makes a floating cube read as an item box at 40 m. */
function makeQuestion() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 128, 128);
  g.font = 'bold 104px ui-sans-serif, system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineWidth = 14;
  g.lineJoin = 'round';
  g.strokeStyle = 'rgba(255,255,255,0.30)';
  g.strokeText('?', 64, 70);
  g.fillStyle = '#ffffff';
  g.fillText('?', 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}

/* -------------------------------------------------------------- box shader */

const BOX_VERT = /* glsl */`
precision highp float;
attribute float aPhase;
varying vec3 vN;
varying vec3 vView;
varying vec2 vUv;
varying float vPhase;
void main() {
  vUv = uv;
  vPhase = aPhase;
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vN = normalize(mat3(instanceMatrix) * normal);
  vView = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const BOX_FRAG = /* glsl */`
precision highp float;
uniform float uTime;
uniform sampler2D uMark;
varying vec3 vN;
varying vec3 vView;
varying vec2 vUv;
varying float vPhase;

// cheap cosine palette: a full hue sweep with no texture lookup
vec3 iris(float t) {
  return 0.55 + 0.45 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main() {
  float f = 1.0 - abs(dot(normalize(vN), normalize(vView)));
  float fres = pow(clamp(f, 0.0, 1.0), 2.0);

  // hue runs around the cube and drifts with time, so the box shimmers even
  // when both it and the camera are still
  float h = vPhase + uTime * 0.28 + vN.y * 0.18 + vUv.x * 0.22;
  vec3 tint = iris(h);

  float mark = texture2D(uMark, vUv).a;

  // crystalline frame: the cube needs a hard silhouette or it reads as a
  // soap bubble the moment motion blur touches it
  float e = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float edge = 1.0 - smoothstep(0.015, 0.075, e);

  vec3 col = tint * (0.85 + 1.5 * fres)
           + vec3(1.0, 0.96, 0.74) * mark * 2.3
           + vec3(1.0) * edge * 0.55;
  float alpha = clamp(0.52 + fres * 0.42 + mark * 0.45 + edge * 0.45, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

/* ==========================================================================*/

export class ItemSystem {
  name = 'items'; order = 40;

  #m = new THREE.Matrix4();
  #q = new THREE.Quaternion();
  #qt = new THREE.Quaternion();
  #v = new THREE.Vector3();
  #v2 = new THREE.Vector3();
  #v3 = new THREE.Vector3();
  #s = new THREE.Vector3(1, 1, 1);
  #col = new THREE.Color();
  #offs = [];

  async init(ctx) {
    this.ctx = ctx;
    this.rng = ctx.rng.fork(0x17e3);
    this.root = new THREE.Group();
    this.root.name = 'items';
    ctx.scene.add(this.root);

    this.#buildBoxes(ctx);
    this.#buildProjectiles(ctx);

    for (const k of ctx.karts) this.#initKart(k);
    this.#offs.push(ctx.events.on('kart:spawn', (k) => this.#initKart(k)));

    this.pool = {
      shells: Array.from({ length: MAX_SHELLS }, () => this.#blankProjectile()),
      bananas: Array.from({ length: MAX_BANANAS }, () => this.#blankProjectile()),
      bombs: Array.from({ length: MAX_BOMBS }, () => this.#blankProjectile()),
    };

    ctx.items = {
      give: (kart, id) => this.#give(kart, id),
      use: (kart) => this.#use(kart, ctx),
      hazards: () => this.pool,
      boxes: () => this.spots,
    };

    ctx.onProgress?.(0.88, 'enchendo as caixas');
  }

  /** Item state lives on the entity so the HUD and the AI can read it. */
  #initKart(k) {
    if (k.item !== undefined) return;
    k.item = null;
    k.itemCount = 0;
    k.coins = 0;
    k.starTimer = 0;
    k.ghostTimer = 0;
    k.invuln = 0;
    k._aiItemDelay = 0;
  }

  /* ------------------------------------------------------------ item boxes */

  #buildBoxes(ctx) {
    const spots = ctx.world?.itemBoxSpots ?? [];
    this.spots = spots.map((p, i) => ({
      pos: p.clone(),
      alive: true,
      timer: 0,
      phase: (i * 0.137) % 1,
      spin: (i % 2 === 0 ? 1 : -1) * 1.15,
    }));
    const n = this.spots.length;
    if (!n) { this.boxMesh = null; return; }

    this.markTex = makeQuestion();

    const geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const phase = new Float32Array(n);
    for (let i = 0; i < n; i++) phase[i] = this.spots[i].phase;
    geo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));

    this.boxMat = new THREE.ShaderMaterial({
      vertexShader: BOX_VERT,
      fragmentShader: BOX_FRAG,
      uniforms: { uTime: { value: 0 }, uMark: { value: this.markTex } },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
      fog: false,
    });

    this.boxMesh = new THREE.InstancedMesh(geo, this.boxMat, n);
    this.boxMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.boxMesh.frustumCulled = false;
    this.boxMesh.renderOrder = 6;
    this.boxMesh.name = 'items:boxes';
    this.root.add(this.boxMesh);

    // Inner core: a small additive octahedron so the box glows from within and
    // still reads against a bright sky.
    const coreGeo = new THREE.OctahedronGeometry(0.40, 0);
    this.coreMat = new THREE.MeshBasicMaterial({
      color: 0xffeaa8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false,
    });
    this.coreMesh = new THREE.InstancedMesh(coreGeo, this.coreMat, n);
    this.coreMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.coreMesh.frustumCulled = false;
    this.coreMesh.renderOrder = 7;
    this.coreMesh.name = 'items:box-cores';
    this.root.add(this.coreMesh);
  }

  /* ----------------------------------------------------------- projectiles */

  #instanced(geo, mat, count, name, order = 5) {
    const m = new THREE.InstancedMesh(geo, mat, count);
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.frustumCulled = false;
    m.castShadow = name === "items:bananas";
    m.renderOrder = order;
    m.name = name;
    for (let i = 0; i < count; i++) m.setMatrixAt(i, ZERO);
    this.root.add(m);
    return m;
  }

  #buildProjectiles(ctx) {
    const lit = (color, extra = {}) => new THREE.MeshStandardMaterial({
      color, roughness: 0.34, metalness: 0.05, envMapIntensity: 1.1, ...extra,
    });

    const shellGeo = new THREE.SphereGeometry(0.46, 14, 10);
    shellGeo.scale(1, 0.82, 1);
    this.shellMesh = this.#instanced(shellGeo, lit(0xffffff), MAX_SHELLS, 'items:shells');
    this.shellMesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(MAX_SHELLS * 3).fill(1), 3);
    this.shellMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);

    const bananaGeo = new THREE.TorusGeometry(0.30, 0.11, 6, 12, Math.PI * 1.05);
    bananaGeo.rotateX(Math.PI / 2);
    this.bananaMesh = this.#instanced(bananaGeo, lit(0xffd738, { emissive: 0x3a2c00 }),
      MAX_BANANAS, 'items:bananas');

    const bombGeo = new THREE.SphereGeometry(0.42, 12, 9);
    this.bombMesh = this.#instanced(bombGeo, lit(0x181c22, { roughness: 0.5 }),
      MAX_BOMBS, 'items:bombs');

    const orbGeo = new THREE.SphereGeometry(0.30, 10, 8);
    this.orbMesh = this.#instanced(orbGeo, lit(0xff5a45, { emissive: 0x501008 }),
      ctx.karts.length * 3 + 6, 'items:orbits');
  }

  #blankProjectile() {
    return {
      live: false, kind: '', owner: null, target: null,
      pos: new THREE.Vector3(), vel: new THREE.Vector3(),
      life: 0, age: 0, spin: 0, bounces: 0, armed: 0,
    };
  }

  /* ================================================================ update */

  update(dt, ctx) {
    if (ctx.race?.state === 'idle') return;
    this.#tickBoxes(dt, ctx);
    this.#tickKarts(dt, ctx);
    this.#tickProjectiles(dt, ctx);
  }

  /* ---------------------------------------------------------------- boxes */

  #tickBoxes(dt, ctx) {
    if (!this.boxMesh) return;
    const t = ctx.time.t;
    this.boxMat.uniforms.uTime.value = t;

    for (const s of this.spots) {
      if (!s.alive) {
        s.timer -= dt;
        if (s.timer <= 0) { s.alive = true; s.timer = 0; }
        continue;
      }
      for (const k of ctx.karts) {
        if (k.frozen || k.finished) continue;
        if (k.item || (k.itemCount ?? 0) > 0) continue;
        if (k.position.distanceToSquared(s.pos) > BOX_RADIUS * BOX_RADIUS) continue;
        this.#pickup(k, s, ctx);
        break;
      }
    }
    this.#writeBoxMatrices(t);
  }

  #writeBoxMatrices(t) {
    for (let i = 0; i < this.spots.length; i++) {
      const s = this.spots[i];
      if (!s.alive) {
        // pop back in with a short overshoot instead of blinking on
        const k = clamp01((BOX_RESPAWN - s.timer) / BOX_RESPAWN);
        if (k < 0.86) {
          this.boxMesh.setMatrixAt(i, ZERO);
          this.coreMesh.setMatrixAt(i, ZERO);
          continue;
        }
        const g = (k - 0.86) / 0.14;
        this.#s.setScalar(g * (1.28 - 0.28 * g));
      } else {
        this.#s.setScalar(1);
      }
      const bob = Math.sin(t * 1.9 + s.phase * 6.28) * 0.16;
      this.#v.copy(s.pos);
      this.#v.y += bob;
      this.#q.setFromAxisAngle(UP, t * s.spin + s.phase * 6.28);
      this.#qt.setFromAxisAngle(AXIS_X, Math.sin(t * 0.9 + s.phase * 4.0) * 0.30);
      this.#q.multiply(this.#qt);
      this.#m.compose(this.#v, this.#q, this.#s);
      this.boxMesh.setMatrixAt(i, this.#m);

      this.#s.multiplyScalar(0.80 + Math.sin(t * 5.5 + s.phase * 9.0) * 0.10);
      this.#m.compose(this.#v, this.#q, this.#s);
      this.coreMesh.setMatrixAt(i, this.#m);
    }
    this.boxMesh.instanceMatrix.needsUpdate = true;
    this.coreMesh.instanceMatrix.needsUpdate = true;
  }

  #pickup(kart, spot, ctx) {
    spot.alive = false;
    spot.timer = BOX_RESPAWN;

    const field = ctx.race?.fieldSize || ctx.karts.length || 8;
    const place = Math.min(field, Math.max(1, kart.place || field));
    const id = rollItem(this.rng, field > 1 ? (place - 1) / (field - 1) : 0);
    this.#give(kart, id);

    ctx.events.emit('item:pickup', { kart, item: id, place });
    ctx.events.emit('audio:sfx', { name: 'item-get', position: kart.position, volume: 0.8 });
    ctx.vfx?.burst('pickup', spot.pos, { color: 0xfff2a0, count: 22 });
    ctx.vfx?.burst('ring', spot.pos, { color: 0xffe07a, from: 0.5, to: 4.0, life: 0.4 });
  }

  #give(kart, id) {
    kart.item = id;
    kart.itemCount = ITEM[id]?.uses ?? 1;
  }

  /* ---------------------------------------------------------------- karts */

  #tickKarts(dt, ctx) {
    for (const k of ctx.karts) {
      if (k.item === undefined) this.#initKart(k);

      if (k.starTimer > 0) {
        k.starTimer -= dt;
        k.invuln = Math.max(k.invuln, k.starTimer);
        k.giveBoost(0.2, ITEM.star.boost.power, 'star');
        if (this.rng.next() < 0.5) {
          this.#v.copy(k.position)
            .addScaledVector(UP, this.rng.range(0.1, 1.1))
            .addScaledVector(this.#right(k), this.rng.range(-0.9, 0.9));
          ctx.vfx?.burst('aura', this.#v, { color: 0xffd83a });
        }
        if (k.starTimer <= 0) ctx.events.emit('item:star-end', { kart: k });
        else this.#starContact(k, ctx);
      }

      if (k.ghostTimer > 0) {
        k.ghostTimer -= dt;
        k.invuln = Math.max(k.invuln, k.ghostTimer);
        if (this.rng.next() < 0.18) {
          this.#v.copy(k.position).addScaledVector(UP, 0.6);
          ctx.vfx?.burst('sparkle', this.#v, { color: 0xcfe0ff, count: 2 });
        }
      }
      if (k.invuln > 0) k.invuln -= dt;

      if (k.frozen || k.finished) continue;

      if (k.isPlayer) {
        if (ctx.input.state.pressed.item) this.#use(k, ctx);
      } else if (k.item) {
        // CPU racers hold an item for a beat so the pack is not a firing squad
        if (k._aiItemDelay <= 0) k._aiItemDelay = this.rng.range(AI_USE_MIN, AI_USE_MAX);
        k._aiItemDelay -= dt;
        if (k._aiItemDelay <= 0) { this.#use(k, ctx); k._aiItemDelay = 0; }
      }
    }
    this.#writeOrbits(ctx);
  }

  #right(k) { return this.#v3.set(1, 0, 0).applyQuaternion(k.quaternion); }
  #fwd(k) { return this.#v2.set(0, 0, 1).applyQuaternion(k.quaternion); }

  /** A star runs anything it touches off the road. */
  #starContact(k, ctx) {
    for (const o of ctx.karts) {
      if (o === k || o.frozen || o.finished) continue;
      if (o.starTimer > 0 || o.invuln > 0) continue;
      if (k.position.distanceToSquared(o.position) > 4.4) continue;
      this.#hit(o, k, 1.15, ctx, 'star');
      this.#v.copy(o.position).sub(k.position).setY(0.35).normalize().multiplyScalar(11);
      o.applyImpulse(this.#v);
    }
  }

  /* ------------------------------------------------------------------ use */

  #use(kart, ctx) {
    const id = kart.item;
    if (!id) return;
    const def = ITEM[id] ?? {};

    switch (id) {
      case 'boost':
      case 'triple':
        kart.giveBoost(def.boost.time, def.boost.power, 'item');
        ctx.events.emit('kart:boost', {
          kart, source: 'item', tier: 0,
          duration: def.boost.time, power: def.boost.power,
        });
        break;

      case 'coin':
        kart.coins = (kart.coins ?? 0) + 1;
        kart.giveBoost(def.boost.time, def.boost.power, 'item');
        ctx.vfx?.burst('sparkle', kart.position, { color: 0xffd24a, count: 12 });
        break;

      case 'banana': this.#dropBanana(kart); break;
      case 'shellGreen': this.#fireShell(kart, ctx, false); break;
      case 'shellRed': this.#fireShell(kart, ctx, true); break;
      case 'bomb': this.#fireBomb(kart); break;

      case 'star':
        kart.starTimer = def.duration;
        kart.invuln = def.duration;
        kart.giveBoost(def.boost.time, def.boost.power, 'star');
        ctx.events.emit('kart:boost', {
          kart, source: 'star', tier: 0,
          duration: def.boost.time, power: def.boost.power,
        });
        ctx.vfx?.burst('ring', kart.position, { color: 0xffd83a, from: 0.6, to: 6, life: 0.5 });
        break;

      case 'ghost':
        kart.ghostTimer = def.duration;
        kart.invuln = Math.max(kart.invuln, def.duration);
        kart.giveBoost(def.boost.time, def.boost.power, 'item');
        ctx.vfx?.burst('sparkle', kart.position, { color: 0xd8e6ff, count: 18 });
        break;

      case 'bolt': this.#lightning(kart, ctx); break;
      default: break;
    }

    kart.itemCount = Math.max(0, (kart.itemCount ?? 1) - 1);
    if (kart.itemCount <= 0) kart.item = null;

    ctx.events.emit('item:use', { kart, item: id, remaining: kart.itemCount });
    ctx.events.emit('audio:sfx', { name: `item-${id}`, position: kart.position, volume: 0.9 });
  }

  #lightning(kart, ctx) {
    ctx.events.emit('item:lightning', { kart });
    for (const o of ctx.karts) {
      if (o === kart || o.frozen || o.finished) continue;
      if (o.starTimer > 0) continue;
      o.squash(ITEM.bolt.squash);
      o.item = null;
      o.itemCount = 0;
      ctx.events.emit('kart:hit', { kart: o, by: kart, source: 'bolt' });
    }
  }

  /* ---------------------------------------------------------- projectiles */

  #free(list) {
    for (const p of list) if (!p.live) return p;
    return null;
  }

  #dropBanana(kart) {
    const p = this.#free(this.pool.bananas);
    if (!p) return;
    this.#fwd(kart);
    p.live = true; p.kind = 'banana'; p.owner = kart; p.target = null;
    p.pos.copy(kart.position).addScaledVector(this.#v2, -2.3);
    p.pos.y += 0.1;
    p.vel.set(0, 0, 0);
    p.life = 1e9; p.age = 0; p.armed = 0.4; p.spin = this.rng.range(0, 6.28);
  }

  #fireShell(kart, ctx, homing) {
    const p = this.#free(this.pool.shells);
    if (!p) return;
    const def = homing ? ITEM.shellRed : ITEM.shellGreen;
    this.#fwd(kart);
    p.live = true;
    p.kind = homing ? 'shellRed' : 'shellGreen';
    p.owner = kart;
    p.target = homing ? this.#targetAhead(kart, ctx) : null;
    p.pos.copy(kart.position).addScaledVector(this.#v2, 2.2);
    p.pos.y += 0.15;
    p.vel.copy(this.#v2).multiplyScalar(def.speed).addScaledVector(kart.velocity, 0.25);
    p.life = def.life; p.age = 0; p.bounces = 0; p.armed = 0.14; p.spin = 0;
  }

  #fireBomb(kart) {
    const p = this.#free(this.pool.bombs);
    if (!p) return;
    this.#fwd(kart);
    p.live = true; p.kind = 'bomb'; p.owner = kart; p.target = null;
    p.pos.copy(kart.position).addScaledVector(this.#v2, 2.0);
    p.pos.y += 0.6;
    p.vel.copy(this.#v2).multiplyScalar(ITEM.bomb.speed)
      .addScaledVector(UP, 4.5).addScaledVector(kart.velocity, 0.4);
    p.life = ITEM.bomb.life; p.age = 0; p.armed = 0.18; p.spin = 0;
  }

  /** The kart one place ahead — a red shell's whole personality. */
  #targetAhead(kart, ctx) {
    let best = null;
    let bestPlace = -1;
    for (const o of ctx.karts) {
      if (o === kart || o.finished) continue;
      if (o.place < kart.place && o.place > bestPlace) { best = o; bestPlace = o.place; }
    }
    return best;
  }

  #tickProjectiles(dt, ctx) {
    this.#stepList(this.pool.shells, dt, ctx);
    this.#stepList(this.pool.bananas, dt, ctx);
    this.#stepList(this.pool.bombs, dt, ctx);
    this.#writeProjectileMatrices(ctx);
  }

  #stepList(list, dt, ctx) {
    for (const p of list) {
      if (!p.live) continue;
      p.age += dt;
      if (p.armed > 0) p.armed -= dt;

      if (p.kind === 'banana') {
        // a banana settles onto whatever it was dropped on and stays there
        const g = ctx.world.sampleGround(p.pos.x, p.pos.z);
        p.pos.y += (g.y + 0.22 - p.pos.y) * Math.min(1, dt * 12);
      } else if (p.kind === 'bomb') {
        p.vel.y -= 22 * dt;
        p.pos.addScaledVector(p.vel, dt);
        const g = ctx.world.sampleGround(p.pos.x, p.pos.z);
        if (p.pos.y <= g.y + 0.42) {
          p.pos.y = g.y + 0.42;
          p.vel.y = Math.abs(p.vel.y) * 0.32;
          p.vel.x *= 0.72; p.vel.z *= 0.72;
        }
        p.spin += dt * 6;
        if (p.age >= p.life) { this.#explode(p, ctx); continue; }
      } else {
        if (p.kind === 'shellRed' && p.target && !p.target.finished) {
          const def = ITEM.shellRed;
          this.#v.copy(p.target.position).sub(p.pos).setY(0);
          const d = this.#v.length();
          if (d > 0.01) {
            this.#v.divideScalar(d);
            p.vel.addScaledVector(this.#v, def.homing * dt * def.speed * 0.16);
            p.vel.setLength(def.speed);
          }
        }
        p.pos.addScaledVector(p.vel, dt);
        const g = ctx.world.sampleGround(p.pos.x, p.pos.z);
        p.pos.y += (g.y + 0.40 - p.pos.y) * Math.min(1, dt * 9);
        p.spin += dt * 13;

        const wall = ctx.world.collideWall?.(p.pos, 0.42);
        if (wall && wall.depth > 0) {
          if (p.kind === 'shellGreen' && p.bounces < 4) {
            p.pos.addScaledVector(wall.normal, wall.depth + 0.05);
            const vn = p.vel.dot(wall.normal);
            p.vel.addScaledVector(wall.normal, -2 * vn);
            p.bounces++;
            ctx.vfx?.burst('sparkle', p.pos, { color: 0xbfffd0, count: 6 });
            ctx.events.emit('audio:sfx', { name: 'shell-bounce', position: p.pos, volume: 0.6 });
          } else {
            this.#pop(p, ctx);
            continue;
          }
        }
        if (p.age >= p.life) { this.#pop(p, ctx); continue; }
      }

      // --- contact with karts ---------------------------------------------
      const def = ITEM[p.kind] ?? { radius: 1.1, spin: 1.0 };
      const r2 = def.radius * def.radius;
      for (const k of ctx.karts) {
        if (k.frozen || k.finished) continue;
        if (k === p.owner && p.armed > 0) continue;
        if (k.position.distanceToSquared(p.pos) > r2) continue;
        if (k.starTimer > 0 || k.invuln > 0) {
          if (p.kind !== 'banana') { this.#pop(p, ctx); break; }
          continue;
        }
        if (p.kind === 'bomb') { this.#explode(p, ctx); break; }
        this.#hit(k, p.owner, def.spin, ctx, p.kind);
        this.#v.copy(p.vel).setY(2.5).multiplyScalar(0.24);
        k.applyImpulse(this.#v);
        this.#pop(p, ctx);
        break;
      }
    }
  }

  #hit(kart, by, dur, ctx, source) {
    kart.spinOut(dur);
    kart.item = null;
    kart.itemCount = 0;
    kart.invuln = 0.6;
    ctx.events.emit('kart:hit', { kart, by, source });
    ctx.vfx?.burst('sparkle', kart.position, { color: 0xfff0a0, count: 14 });
  }

  #pop(p, ctx) {
    p.live = false;
    ctx.vfx?.burst('puff', p.pos, { color: 0xdcd6cf, count: 5, scale: 1.0 });
    ctx.vfx?.burst('sparkle', p.pos, { color: 0xffffff, count: 6 });
  }

  #explode(p, ctx) {
    p.live = false;
    const R = ITEM.bomb.radius;
    ctx.events.emit('item:explode', { position: p.pos.clone(), radius: R, by: p.owner });
    ctx.vfx?.burst('explode', p.pos, { radius: R });
    for (const k of ctx.karts) {
      if (k.frozen || k.finished) continue;
      if (k.starTimer > 0 || k.invuln > 0) continue;
      const d2 = k.position.distanceToSquared(p.pos);
      if (d2 > R * R) continue;
      const f = 1 - Math.sqrt(d2) / R;
      this.#hit(k, p.owner, ITEM.bomb.spin, ctx, 'bomb');
      this.#v.copy(k.position).sub(p.pos).setY(0).normalize()
        .multiplyScalar(16 * f).addScaledVector(UP, 6 * f);
      k.applyImpulse(this.#v);
    }
  }

  /* ------------------------------------------------------------- matrices */

  #writeProjectileMatrices(ctx) {
    const t = ctx.time.t;

    this.#writeList(this.pool.shells, this.shellMesh, (p, i) => {
      this.#q.setFromAxisAngle(UP, p.spin);
      this.#s.setScalar(1);
      this.#col.setHex(p.kind === 'shellRed' ? 0xff5646 : 0x46e07a, THREE.SRGBColorSpace);
      this.shellMesh.instanceColor.setXYZ(i, this.#col.r, this.#col.g, this.#col.b);
    });
    this.shellMesh.instanceColor.needsUpdate = true;

    this.#writeList(this.pool.bananas, this.bananaMesh, (p) => {
      this.#q.setFromAxisAngle(UP, p.spin + t * 0.6);
      this.#s.setScalar(1);
    });

    this.#writeList(this.pool.bombs, this.bombMesh, (p) => {
      this.#q.setFromAxisAngle(AXIS_X, p.spin);
      const pulse = 1 + Math.sin(p.age * 22) * 0.09 * clamp01(p.age / ITEM.bomb.life);
      this.#s.setScalar(pulse);
    });
  }

  #writeList(list, mesh, pose) {
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      if (!p.live) { mesh.setMatrixAt(i, ZERO); continue; }
      pose(p, i);
      this.#m.compose(p.pos, this.#q, this.#s);
      mesh.setMatrixAt(i, this.#m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  /** Triple mushrooms ride a ring around their owner until they are spent. */
  #writeOrbits(ctx) {
    const mesh = this.orbMesh;
    if (!mesh) return;
    const t = ctx.time.t;
    let i = 0;
    for (const k of ctx.karts) {
      if (k.item !== 'triple' || (k.itemCount ?? 0) <= 0) continue;
      for (let j = 0; j < k.itemCount && i < mesh.count; j++, i++) {
        const a = t * 2.4 + (j / 3) * Math.PI * 2;
        this.#v.copy(k.position);
        this.#v.x += Math.cos(a) * 1.75;
        this.#v.z += Math.sin(a) * 1.75;
        this.#v.y += 0.55 + Math.sin(t * 3 + j) * 0.08;
        this.#q.setFromAxisAngle(UP, -a);
        this.#s.setScalar(1);
        this.#m.compose(this.#v, this.#q, this.#s);
        mesh.setMatrixAt(i, this.#m);
      }
    }
    for (; i < mesh.count; i++) mesh.setMatrixAt(i, ZERO);
    mesh.instanceMatrix.needsUpdate = true;
  }

  /* -------------------------------------------------------------- teardown */

  dispose() {
    for (const off of this.#offs) off?.();
    this.#offs.length = 0;
    this.root?.traverse((o) => {
      o.geometry?.dispose?.();
      const m = o.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose?.()); else m?.dispose?.();
    });
    this.markTex?.dispose?.();
    this.root?.parent?.remove(this.root);
  }
}
