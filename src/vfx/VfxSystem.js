import * as THREE from 'three';
import { ParticlePool, setColor } from './ParticlePool.js';
import { makeVfxAtlas, makeTyreMark, CELL } from './vfxTextures.js';
import { TyreMarks } from './TyreMarks.js';

/**
 * =============================================================================
 *  VfxSystem — everything the race throws off itself.
 * =============================================================================
 *
 *  Three draw calls carry the whole game's particle load:
 *
 *      1. alpha pool     dust, tyre smoke, spray, exhaust soot, debris
 *      2. additive pool  drift sparks, boost flame, glints, blast fronts
 *      3. tyre marks     one ring buffer of skid quads on the road
 *
 *  A particle is written once and never touched again: `ParticlePool` keeps the
 *  closed-form ballistic solution in the vertex shader, so the CPU cost of a
 *  spark is one row of floats at birth and nothing afterwards. That is what
 *  makes it affordable to run continuous emitters on eight karts inside a
 *  120 Hz fixed step.
 *
 *  Emission is deterministic. Rates are accumulated per emitter in the fixed
 *  step (never per frame), all randomness comes from a fork of `ctx.rng`, and
 *  every birth stamp is `ctx.time.t`. Two runs of the screenshot harness
 *  produce the same image.
 *
 *  The look is calibrated against Mario Kart: sparks are small, bright, tightly
 *  clustered at the contact patch and short-lived; dust is large, slow, low
 *  contrast and tinted by the surface; boost is a hot white core wrapped in
 *  saturated flame. Nothing is a fog of grey squares.
 */

const UP = new THREE.Vector3(0, 1, 0);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* ------------------------------------------------------------------ palette */

/**
 * Spark colours.
 *
 * `core` is deliberately not white. Additive sprites at a high gain get
 * desaturated by AgX exactly where they are brightest, so a white core plus a
 * coloured tail comes out of the pipeline as a white blob with a faint fringe —
 * which is what the first pass of this system looked like. Keeping the core
 * inside the tier's own hue, at a gain that only just clears the bloom
 * threshold, is what makes a blue spark read blue.
 */
const SPARK_TIER = [
  null,
  { core: 0x2f9dff, glow: 0x0a6cff, tail: 0x0026a8, gain: 3.6 },   // 1 — blue
  { core: 0xff8a12, glow: 0xff5200, tail: 0x8f1a00, gain: 3.4 },   // 2 — orange
  { core: 0xa64cff, glow: 0x7a1eff, tail: 0x33068f, gain: 3.8 },   // 3 — purple
];

const BOOST_TINT = {
  minitrubo: 0x49c2ff,
  pad: 0xffc23a,
  trick: 0x7ef0ff,
  item: 0xff8a2a,
  star: 0xffd83a,
  default: 0xffa432,
};

/** Per-surface dust identity: colour, sprite, how much of it, how it moves. */
const SURFACE = {
  road:  { color: 0x9c9791, cell: CELL.SMOKE, rate: 0.0, size: 0.55, life: 0.55, debris: 0, rise: 0.5 },
  dirt:  { color: 0xc09068, cell: CELL.SMOKE, rate: 26.0, size: 1.15, life: 1.15, debris: 16, rise: 1.5 },
  sand:  { color: 0xf3e2b4, cell: CELL.SMOKE, rate: 28.0, size: 1.25, life: 1.20, debris: 14, rise: 1.3 },
  grass: { color: 0x9cbe72, cell: CELL.SMOKE, rate: 18.0, size: 0.90, life: 0.85, debris: 24, rise: 1.0 },
  water: { color: 0xeaf7ff, cell: CELL.SMOKE, rate: 30.0, size: 0.95, life: 0.65, debris: 38, rise: 1.8 },
  boost: { color: 0xffc46a, cell: CELL.SMOKE, rate: 0.0, size: 0.6, life: 0.5, debris: 0, rise: 0.9 },
};

const SMOKE_TYRE = 0xb9b2ab;

/* --------------------------------------------------------------- quality ---- */

const TIERS = {
  low:    { add: 600, alpha: 260, marks: 0, rate: 0.40, far: 34 },
  medium: { add: 1200, alpha: 480, marks: 700, rate: 0.68, far: 46 },
  high:   { add: 2000, alpha: 760, marks: 1200, rate: 1.0, far: 62 },
  ultra:  { add: 2800, alpha: 1000, marks: 1600, rate: 1.15, far: 78 },
};

/* ------------------------------------------------------------------ system -- */

export class VfxSystem {
  name = 'vfx'; order = 50;

  #p = {};                 // spawn scratch — never allocated per particle
  #v = new THREE.Vector3();
  #v2 = new THREE.Vector3();
  #v3 = new THREE.Vector3();
  #fwd = new THREE.Vector3();
  #right = new THREE.Vector3();
  #up = new THREE.Vector3();
  #states = [];
  #offs = [];

  async init(ctx) {
    this.ctx = ctx;
    this.rng = ctx.rng.fork(0x5f27a1);
    const tier = this.tier = TIERS[ctx.quality] ?? TIERS.high;
    this.farSq = tier.far * tier.far;

    const atlas = makeVfxAtlas(this.rng.fork(0x11));
    this.atlas = atlas;

    this.add = new ParticlePool({
      capacity: tier.add, map: atlas.texture, cols: atlas.cols, rows: atlas.rows,
      additive: true, renderOrder: 12,
    });
    this.alpha = new ParticlePool({
      capacity: tier.alpha, map: atlas.texture, cols: atlas.cols, rows: atlas.rows,
      additive: false, renderOrder: 11,
    });
    ctx.scene.add(this.add.mesh, this.alpha.mesh);

    if (tier.marks > 0) {
      this.markTex = makeTyreMark(this.rng.fork(0x22));
      this.marks = new TyreMarks({ capacity: tier.marks, map: this.markTex, life: 7.5 });
      ctx.scene.add(this.marks.mesh);
    }

    for (const k of ctx.karts) this.#stateFor(k);
    ctx.events.on('kart:spawn', (k) => this.#stateFor(k));

    this.#bind(ctx);

    // Public contract for the item system (and anything else that wants a
    // one-shot effect). Accessed lazily: `vfx` initialises after `items`.
    ctx.vfx = {
      burst: (kind, pos, o) => this.burst(kind, pos, o),
      sparkle: (pos, color, n) => this.#sparkleBurst(pos, color ?? 0xfff0a0, n ?? 10),
      trailPuff: (pos, color) => this.#trailPuff(pos, color),
      get budget() { return { add: tier.add, alpha: tier.alpha }; },
    };

    ctx.onProgress?.(0.92, 'acendendo as faíscas');
  }

  #stateFor(kart) {
    if (this.#states.some((s) => s.kart === kart)) return;
    this.#states.push({
      kart,
      spark: 0, sparkGlow: 0, smoke: 0,
      dust: [0, 0, 0, 0],
      flame: 0, trail: 0,
      lastTier: 0,
      boostTint: BOOST_TINT.default,
      wasBoost: false,
      wheels: [0, 1, 2, 3].map(() => ({
        has: false, v: 0,
        l: new THREE.Vector3(), r: new THREE.Vector3(), c: new THREE.Vector3(),
      })),
      near: 1,
    });
  }

  #bind(ctx) {
    const ev = ctx.events;
    this.#offs = [
      ev.on('kart:drift-tier', (e) => this.#onDriftTier(e)),
      ev.on('kart:boost', (e) => this.#onBoost(e)),
      ev.on('kart:land', (e) => this.#onLand(e)),
      ev.on('kart:wall', (e) => this.#onWall(e)),
      ev.on('kart:hit', (e) => this.#onHit(e)),
      ev.on('kart:spinout', (e) => this.#onHit(e)),
      ev.on('kart:squash', (e) => this.#onSquash(e)),
      ev.on('kart:bump', (e) => this.#onBump(e)),
      ev.on('kart:hop', (e) => this.#onHop(e)),
      ev.on('kart:trick', (e) => this.#onTrick(e)),
      ev.on('item:pickup', (e) => this.#onPickup(e)),
      ev.on('item:explode', (e) => this.burst('explode', e?.position ?? e?.kart?.position, e)),
      ev.on('item:lightning', () => this.#onLightning()),
      ev.on('race:start', () => this.#onRaceStart()),
    ];
  }

  /* ===================================================================== */
  /*  spawn plumbing                                                        */
  /* ===================================================================== */

  /** Reset the scratch row to neutral defaults. Cheaper than an object literal
   *  and, more importantly, guarantees no field leaks between emitters. */
  #reset(cell, life, size0, size1) {
    const p = this.#p;
    p.x = 0; p.y = 0; p.z = 0;
    p.vx = 0; p.vy = 0; p.vz = 0;
    p.birth = this.ctx.time.t;
    p.life = life; p.size0 = size0; p.size1 = size1 ?? size0;
    p.r0 = 1; p.g0 = 1; p.b0 = 1; p.a0 = 1;
    p.r1 = 1; p.g1 = 1; p.b1 = 1; p.a1 = 0;
    p.drag = 1.6; p.gravity = -9.8;
    p.rot = 0; p.rotSpeed = 0;
    p.cell = cell; p.stretch = 0; p.mode = 0; p.fade = 1;
    return p;
  }

  #at(p, v) { p.x = v.x; p.y = v.y; p.z = v.z; return p; }
  #vel(p, v) { p.vx = v.x; p.vy = v.y; p.vz = v.z; return p; }

  /* ===================================================================== */
  /*  per-step emitters                                                     */
  /* ===================================================================== */

  update(dt, ctx) {
    const cam = ctx.camera.position;
    const rateK = this.tier.rate;

    for (const st of this.#states) {
      const k = st.kart;
      if (!k || k.frozen) { st.near = 0; continue; }

      // Distance falloff: a kart on the far side of the valley still emits,
      // but at a fraction of the rate, so the pools stay for the foreground.
      const d2 = cam.distanceToSquared(k.position);
      st.near = d2 > this.farSq * 2.25 ? 0
        : d2 > this.farSq ? 0.18
          : d2 > this.farSq * 0.25 ? 0.55 : 1;
      if (st.near <= 0) continue;

      this.#basis(k);
      const gain = rateK * st.near;

      this.#driftEmitters(dt, ctx, st, k, gain);
      this.#surfaceEmitters(dt, ctx, st, k, gain);
      this.#boostEmitters(dt, ctx, st, k, gain);
      if (this.marks) this.#tyreMarks(dt, ctx, st, k);
    }
  }

  /** Body axes of `kart` into #fwd / #right / #up. */
  /**
   * `wheelContacts[i].pos` is the point where the wheel meets the ground;
   * `.contact` is that point pushed a further wheel-radius down, which is
   * *inside* the road. Everything that must sit on the tarmac - sparks, dust,
   * skid marks - reads `.pos`.
   */
  #basis(k) {
    this.#fwd.set(0, 0, 1).applyQuaternion(k.quaternion);
    this.#right.set(1, 0, 0).applyQuaternion(k.quaternion);
    this.#up.copy(k.up ?? UP);
  }

  /* --------------------------------------------------------- drift sparks -- */

  /**
   * The single most important effect in the game.
   *
   * Two emitters sit on the rear contact patches. Below the first mini-turbo
   * tier the tyres only smoke — grey, soft, low. From tier 1 the smoke is
   * joined by hard bright sparks in the tier's colour, thrown backwards and
   * outwards out of the slide, plus a small additive glow pinned to the contact
   * patch so the wheel itself reads as lit rather than as a sprite fountain.
   */
  #driftEmitters(dt, ctx, st, k, gain) {
    const d = k.drift;
    if (!d?.active || !k.onGround) { st.spark = st.sparkGlow = st.smoke = 0; return; }

    const speedK = clamp01(k.speed / 14);
    if (speedK < 0.12) return;

    const tier = d.tier | 0;
    const pal = SPARK_TIER[tier];
    const charge = clamp01((d.charge ?? 0) / 780);

    // A drift always scrubs rubber: grey smoke, more of it the harder it bites.
    st.smoke += (tier > 0 ? 8 : 12) * speedK * gain * dt;
    while (st.smoke >= 1) { st.smoke -= 1; this.#tyreSmoke(k, speedK); }

    if (!pal) return;

    // sparks ramp up as the tier's charge fills, so the moment before a tier
    // change is visibly hotter than the moment after it
    const rate = (330 + 190 * charge) * speedK * gain;
    st.spark += rate * dt;
    let n = 0;
    while (st.spark >= 1 && n < 10) { st.spark -= 1; n++; this.#spark(k, pal, speedK, tier); }

    st.sparkGlow += 52 * speedK * gain * dt;
    while (st.sparkGlow >= 1) { st.sparkGlow -= 1; this.#contactGlow(k, pal, speedK); }
  }

  /** One drift spark off a rear wheel. */
  #spark(k, pal, speedK, tier) {
    const r = this.rng;
    const wIdx = r.next() < 0.62 ? (k.drift.dir > 0 ? 2 : 3) : (k.drift.dir > 0 ? 3 : 2);
    const w = k.wheelContacts?.[wIdx];
    if (!w) return;
    const src = w.pos ?? w.contact;

    const out = -Math.sign(k.drift.dir || 1);
    // Sprite mix, in the order the eye reads them: a four-ray flare is what
    // says "spark", a stretched streak is what says "fast", and the soft-cored
    // SPARK cell is only there to stop the cluster looking like clip art.
    const roll = r.next();
    const cell = roll < 0.50 ? CELL.SPARKLE : roll < 0.86 ? CELL.STREAK : CELL.SPARK;
    const p = this.#reset(cell, r.range(0.10, 0.21), r.range(0.150, 0.29), r.range(0.02, 0.05));

    this.#v.copy(src)
      .addScaledVector(this.#up, 0.08 + r.range(0, 0.10))
      .addScaledVector(this.#right, r.range(-0.10, 0.10))
      .addScaledVector(this.#fwd, r.range(-0.14, 0.10));
    this.#at(p, this.#v);

    // ejected back and out of the slide, with a slice of the kart's own motion
    // Kept deliberately short: in Mario Kart the spray is a tight bouquet
    // welded to the contact patch, not a comet tail. High drag plus a sixth of
    // a second of life is what keeps it there while the kart moves out from
    // under it.
    const back = r.range(0.9, 2.8);
    const side = out * r.range(0.3, 1.4);
    const rise = r.range(0.6, 2.0);
    this.#v2.copy(k.velocity).multiplyScalar(0.45)
      .addScaledVector(this.#fwd, -back)
      .addScaledVector(this.#right, side)
      .addScaledVector(this.#up, rise);
    this.#vel(p, this.#v2);

    p.drag = r.range(7.5, 11.0);
    p.gravity = -10.0;
    p.mode = 2;
    p.stretch = cell === CELL.STREAK ? r.range(0.28, 0.50) : r.range(0.05, 0.14);
    p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-5, 5);
    p.fade = 0.5;
    setColor(p, '0', pal.core, pal.gain);
    setColor(p, '1', pal.tail, 1.5);
    p.a0 = 1; p.a1 = 0;
    this.add.spawn(p);

    // one spark in eight is a proper four-point flare, the shape the eye
    // actually recognises as "spark" when everything else is a moving line
    if (r.next() < 0.075) {
      const g = this.#reset(CELL.SPARKLE, r.range(0.12, 0.22), r.range(0.18, 0.30), 0.02);
      g.x = p.x; g.y = p.y; g.z = p.z;
      g.vx = p.vx * 0.5; g.vy = p.vy * 0.5; g.vz = p.vz * 0.5;
      g.drag = 4.5; g.gravity = -8; g.fade = 1.1;
      g.rot = r.range(0, 6.28); g.rotSpeed = r.range(-3, 3);
      setColor(g, '0', pal.core, pal.gain * 1.25);
      setColor(g, '1', pal.glow, 1.4);
      this.add.spawn(g);
    }
  }

  /** Soft additive pool of light welded to the sliding contact patch. */
  #contactGlow(k, pal, speedK) {
    const r = this.rng;
    for (const wIdx of [2, 3]) {
      const w = k.wheelContacts?.[wIdx];
      if (!w || w.grounded === false) continue;
      const src = w.pos ?? w.contact;
      const p = this.#reset(CELL.GLOW, 0.11, r.range(0.24, 0.38), 0.06);
      this.#v.copy(src).addScaledVector(this.#up, 0.05);
      this.#at(p, this.#v);
      this.#vel(p, this.#v2.copy(k.velocity).multiplyScalar(0.85));
      p.drag = 6; p.gravity = 0; p.fade = 1.4;
      setColor(p, '0', pal.glow, 1.9 + speedK * 0.8);
      setColor(p, '1', pal.tail, 0.5);
      p.a0 = 0.85;
      this.add.spawn(p);
    }
  }

  /** Grey rubber smoke from the scrubbing rear tyres. */
  #tyreSmoke(k, speedK) {
    const r = this.rng;
    const w = k.wheelContacts?.[r.next() < 0.5 ? 2 : 3];
    if (!w || w.grounded === false) return;
    const src = w.pos ?? w.contact;
    const surf = SURFACE[w.surface ?? k.surface] ?? SURFACE.road;
    const onRoad = (w.surface ?? k.surface) === 'road' || (w.surface ?? k.surface) === 'boost';

    const p = this.#reset(CELL.SMOKE, r.range(0.45, 0.85),
      r.range(0.26, 0.40), r.range(0.85, 1.35));
    this.#v.copy(src)
      .addScaledVector(this.#up, 0.14)
      .addScaledVector(this.#right, r.range(-0.18, 0.18));
    this.#at(p, this.#v);
    this.#v2.copy(k.velocity).multiplyScalar(0.42)
      .addScaledVector(this.#fwd, -r.range(0.6, 2.4))
      .addScaledVector(this.#up, r.range(0.25, 0.9))
      .addScaledVector(this.#right, -Math.sign(k.drift.dir || 1) * r.range(0.2, 1.4));
    this.#vel(p, this.#v2);
    p.drag = 2.1; p.gravity = 0.35;
    p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-1.4, 1.4);
    p.fade = 1.25;
    setColor(p, '0', onRoad ? SMOKE_TYRE : surf.color, 0.95);
    setColor(p, '1', onRoad ? SMOKE_TYRE : surf.color, 0.75);
    p.a0 = onRoad ? 0.24 : 0.46; p.a1 = 0;
    this.alpha.spawn(p);
  }

  /* --------------------------------------------------------- surface dust -- */

  #surfaceEmitters(dt, ctx, st, k, gain) {
    const wheels = k.wheelContacts;
    if (!wheels || wheels.length < 4) return;
    const speedK = clamp01(k.speed / 16);
    if (speedK < 0.06) return;

    for (let i = 0; i < 4; i++) {
      const w = wheels[i];
      if (!w || w.grounded === false) { st.dust[i] = 0; continue; }
      const name = w.surface ?? k.surface ?? 'road';
      const S = SURFACE[name] ?? SURFACE.road;
      if (S.rate <= 0) { st.dust[i] = 0; continue; }

      // Only the driven wheels throw a plume. The fronts would double the
      // fill cost for a puff that is hidden behind the kart anyway.
      if (i < 2) { st.dust[i] = 0; continue; }
      const bias = 1.0;
      const slide = k.drift?.active ? 1.7 : 1;
      st.dust[i] += S.rate * bias * slide * speedK * gain * dt;

      let n = 0;
      while (st.dust[i] >= 1 && n < 4) {
        st.dust[i] -= 1; n++;
        if (name === 'water') this.#splash(k, w, S);
        else this.#dust(k, w, S, speedK, i >= 2);
      }
    }
  }

  #dust(k, w, S, speedK, rear) {
    const r = this.rng;
    const src = w.pos ?? w.contact;
    const p = this.#reset(CELL.SMOKE, S.life * r.range(0.75, 1.25),
      S.size * r.range(0.34, 0.52), S.size * r.range(1.15, 1.85));
    this.#v.copy(src)
      .addScaledVector(this.#up, 0.10)
      .addScaledVector(this.#right, r.range(-0.22, 0.22));
    this.#at(p, this.#v);
    this.#v2.copy(k.velocity).multiplyScalar(rear ? 0.24 : 0.18)
      .addScaledVector(this.#fwd, -r.range(0.8, 3.6) * speedK)
      .addScaledVector(this.#up, S.rise * r.range(0.6, 1.6))
      .addScaledVector(this.#right, r.range(-1.1, 1.1));
    this.#vel(p, this.#v2);
    p.drag = 1.9; p.gravity = 0.25;
    p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-1.1, 1.1);
    p.fade = 1.35;
    setColor(p, '0', S.color, 1.45);
    setColor(p, '1', S.color, 0.95);
    p.a0 = r.range(0.46, 0.72); p.a1 = 0;
    this.alpha.spawn(p);

    // hard debris: pebbles off dirt/sand, blades off grass
    if (S.debris > 0 && r.next() < S.debris / 100) {
      const isGrass = S.cell === CELL.SMOKE && S.color === SURFACE.grass.color;
      const d = this.#reset(isGrass ? CELL.LEAF : CELL.CHUNK,
        r.range(0.45, 0.85), r.range(0.055, 0.13), r.range(0.04, 0.10));
      d.x = p.x; d.y = p.y; d.z = p.z;
      this.#v2.copy(k.velocity).multiplyScalar(0.34)
        .addScaledVector(this.#fwd, -r.range(1.5, 5.5))
        .addScaledVector(this.#up, r.range(2.0, 5.0))
        .addScaledVector(this.#right, r.range(-2.4, 2.4));
      this.#vel(d, this.#v2);
      d.drag = 0.9; d.gravity = -13;
      d.rot = r.range(0, 6.28); d.rotSpeed = r.range(-9, 9);
      d.fade = 0.6;
      setColor(d, '0', S.color, isGrass ? 0.9 : 0.72);
      setColor(d, '1', S.color, isGrass ? 0.75 : 0.55);
      d.a0 = 0.95; d.a1 = 0.6;
      this.alpha.spawn(d);
    }
  }

  #splash(k, w, S) {
    const r = this.rng;
    const src = w.pos ?? w.contact;

    const p = this.#reset(CELL.CLOUD, r.range(0.35, 0.6), r.range(0.28, 0.5), r.range(1.0, 1.6));
    this.#v.copy(src).addScaledVector(this.#up, 0.05);
    this.#at(p, this.#v);
    this.#v2.copy(k.velocity).multiplyScalar(0.35)
      .addScaledVector(this.#up, r.range(1.6, 3.6))
      .addScaledVector(this.#right, r.range(-2.2, 2.2));
    this.#vel(p, this.#v2);
    p.drag = 2.6; p.gravity = -3.2; p.fade = 1.2;
    setColor(p, '0', S.color, 1.25);
    setColor(p, '1', S.color, 0.9);
    p.a0 = r.range(0.42, 0.7); p.a1 = 0;
    this.alpha.spawn(p);

    if (r.next() < 0.5) {
      const d = this.#reset(CELL.DROP, r.range(0.4, 0.8), r.range(0.06, 0.14), 0.04);
      d.x = p.x; d.y = p.y; d.z = p.z;
      this.#v2.copy(k.velocity).multiplyScalar(0.5)
        .addScaledVector(this.#up, r.range(3.0, 6.5))
        .addScaledVector(this.#right, r.range(-3.5, 3.5))
        .addScaledVector(this.#fwd, r.range(-2, 2));
      this.#vel(d, this.#v2);
      d.drag = 0.6; d.gravity = -16; d.mode = 2; d.stretch = 0.05; d.fade = 0.7;
      setColor(d, '0', 0xffffff, 1.2);
      setColor(d, '1', S.color, 0.8);
      d.a0 = 0.85; d.a1 = 0.2;
      this.add.spawn(d);
    }
  }

  /* --------------------------------------------------------------- boost --- */

  #boostEmitters(dt, ctx, st, k, gain) {
    const boosting = (k.boost?.timer ?? 0) > 0;
    if (!boosting) { st.flame = st.trail = 0; st.wasBoost = false; return; }
    st.wasBoost = true;
    const tint = st.boostTint;
    const power = clamp((k.boost.power ?? 1.35) - 1, 0, 1.2);

    st.flame += (72 + 50 * power) * gain * dt;
    let n = 0;
    while (st.flame >= 1 && n < 6) { st.flame -= 1; n++; this.#exhaustFlame(k, tint); }

    st.trail += 26 * gain * dt;
    while (st.trail >= 1) { st.trail -= 1; this.#boostTrail(k, tint); }
  }

  /** Exhaust local anchors mirror KartModel's tail pipes. */
  #pipe(k, side, out) {
    return out.copy(k.position)
      .addScaledVector(this.#right, side * 0.30)
      .addScaledVector(this.#up, 0.62)
      .addScaledVector(this.#fwd, -1.32);
  }

  #exhaustFlame(k, tint) {
    const r = this.rng;
    const side = r.next() < 0.5 ? -1 : 1;
    this.#pipe(k, side, this.#v);

    const p = this.#reset(CELL.FLAME, r.range(0.10, 0.20), r.range(0.16, 0.28), r.range(0.04, 0.09));
    this.#at(p, this.#v);
    this.#v2.copy(k.velocity).multiplyScalar(0.72)
      .addScaledVector(this.#fwd, -r.range(4.5, 9.0))
      .addScaledVector(this.#up, r.range(-0.3, 1.1))
      .addScaledVector(this.#right, side * r.range(0, 0.7));
    this.#vel(p, this.#v2);
    p.drag = 4.4; p.gravity = 1.2;
    p.mode = 2; p.stretch = r.range(0.14, 0.26); p.fade = 0.85;
    setColor(p, '0', 0xffe9b8, 1.35);
    setColor(p, '1', tint, 0.8);
    p.a0 = 1; p.a1 = 0;
    this.add.spawn(p);

    // sooty heat haze so the flame is not floating in clean air
    if (r.next() < 0.30) {
      const s = this.#reset(CELL.SMOKE, r.range(0.3, 0.55), 0.18, r.range(0.7, 1.1));
      s.x = p.x; s.y = p.y; s.z = p.z;
      this.#v2.copy(k.velocity).multiplyScalar(0.5)
        .addScaledVector(this.#fwd, -r.range(1, 3))
        .addScaledVector(this.#up, r.range(0.4, 1.4));
      this.#vel(s, this.#v2);
      s.drag = 2.4; s.gravity = 0.4; s.fade = 1.3;
      s.rot = r.range(0, 6.28); s.rotSpeed = r.range(-1, 1);
      setColor(s, '0', 0x6d6a68, 0.9);
      setColor(s, '1', 0x8a8683, 0.7);
      s.a0 = 0.26; s.a1 = 0;
      this.alpha.spawn(s);
    }
  }

  /** Low ribbon of light dragged along the ground behind a boosting kart. */
  #boostTrail(k, tint) {
    const r = this.rng;
    const p = this.#reset(CELL.STREAK, r.range(0.20, 0.36), r.range(0.09, 0.18), 0.02);
    this.#v.copy(k.position)
      .addScaledVector(this.#fwd, -r.range(0.9, 1.5))
      .addScaledVector(this.#up, r.range(0.12, 0.40))
      .addScaledVector(this.#right, r.range(-0.62, 0.62));
    this.#at(p, this.#v);
    this.#v2.copy(k.velocity).multiplyScalar(0.30)
      .addScaledVector(this.#fwd, -r.range(2, 5))
      .addScaledVector(this.#up, r.range(0.2, 1.2));
    this.#vel(p, this.#v2);
    p.drag = 3.2; p.gravity = 0.8;
    p.mode = 2; p.stretch = 0.34; p.fade = 0.9;
    setColor(p, '0', tint, 1.5);
    setColor(p, '1', tint, 0.5);
    p.a0 = 0.9; p.a1 = 0;
    this.add.spawn(p);
  }

  /* ---------------------------------------------------------- tyre marks --- */

  /**
   * Rubber is laid whenever a tyre is asked for more than it can give: any
   * drift, a heavy brake, or the first metre of a boost. The strip is built
   * from the previous frame's corners, so it stays continuous through a hairpin.
   */
  #tyreMarks(dt, ctx, st, k) {
    const wheels = k.wheelContacts;
    if (!wheels) return;
    const drifting = !!k.drift?.active;
    // The entity does not publish the brake pedal; the body does. Optional all
    // the way down so this degrades to "drift and boost only" if it moves.
    const braking = (k._body?.controls?.brake ?? 0) > 0.5 && k.speed > 8;
    const boosting = (k.boost?.timer ?? 0) > 0.25 && k.speed > 6;
    const laying = (drifting || braking || boosting) && k.speed > 4;

    for (let i = 0; i < 4; i++) {
      const w = wheels[i];
      const m = st.wheels[i];
      const surf = w?.surface ?? k.surface;
      const hard = surf === 'road' || surf === 'boost';
      if (!w || w.grounded === false || !laying || !hard || (i < 2 && !drifting)) {
        m.has = false;
        continue;
      }
      const c = w.pos ?? w.contact;
      if (m.has && m.c.distanceToSquared(c) < 0.30) continue;    // ~0.55 m spacing

      const half = (i >= 2 ? 0.16 : 0.12) * (drifting ? 1.25 : 1);
      this.#v.copy(this.#right).multiplyScalar(half);
      const l1 = this.#v2.copy(c).sub(this.#v).addScaledVector(this.#up, 0.035);
      const r1 = this.#v3.copy(c).add(this.#v).addScaledVector(this.#up, 0.035);

      if (m.has) {
        const dv = m.c.distanceTo(c) * 0.55;
        const alpha = (drifting ? 0.62 : 0.42) * clamp01(k.speed / 12) * st.near;
        this.marks.push(m.l, m.r, l1, r1, ctx.time.t, alpha, m.v, m.v + dv);
        m.v += dv;
      } else {
        m.v = 0;
      }
      m.l.copy(l1); m.r.copy(r1); m.c.copy(c); m.has = true;
    }
  }

  /* ===================================================================== */
  /*  event bursts                                                          */
  /* ===================================================================== */

  #st(kart) { return this.#states.find((s) => s.kart === kart); }

  #onDriftTier(e) {
    const k = e?.kart; const tier = e?.tier | 0;
    if (!k) return;
    const st = this.#st(k);
    if (st) st.lastTier = tier;
    if (!tier) return;
    const pal = SPARK_TIER[tier];
    this.#basis(k);
    const r = this.rng;

    // the snap: a ring on the ground plus a hard fan of sparks off both wheels
    for (const wIdx of [2, 3]) {
      const w = k.wheelContacts?.[wIdx];
      if (!w) continue;
      const src = w.pos ?? w.contact;
      for (let i = 0; i < 14; i++) {
        const p = this.#reset(CELL.SPARK, r.range(0.22, 0.44), r.range(0.20, 0.36), 0.02);
        this.#at(p, this.#v.copy(src).addScaledVector(this.#up, 0.10));
        this.#v2.copy(k.velocity).multiplyScalar(0.45)
          .addScaledVector(this.#fwd, -r.range(1.2, 6))
          .addScaledVector(this.#right, r.range(-4, 4))
          .addScaledVector(this.#up, r.range(1.0, 4.5));
        this.#vel(p, this.#v2);
        p.drag = r.range(2.6, 4.4); p.gravity = -13;
        p.mode = 2; p.stretch = r.range(0.12, 0.24); p.fade = 0.5;
        setColor(p, '0', pal.core, pal.gain * 1.2);
        setColor(p, '1', pal.tail, 1.6);
        this.add.spawn(p);
      }
      const g = this.#reset(CELL.GLOW, 0.26, 0.10, 0.62);
      this.#at(g, this.#v.copy(src).addScaledVector(this.#up, 0.20));
      this.#vel(g, this.#v2.copy(k.velocity).multiplyScalar(0.7));
      g.drag = 5; g.gravity = 0; g.fade = 1.8;
      setColor(g, '0', pal.glow, 2.6);
      setColor(g, '1', pal.tail, 0.7);
      this.add.spawn(g);
    }

    const ring = this.#reset(CELL.RING, 0.30, 0.4, 2.6);
    this.#at(ring, this.#v.copy(k.position).addScaledVector(this.#up, -0.28));
    ring.mode = 1; ring.drag = 8; ring.gravity = 0; ring.fade = 1.6;
    setColor(ring, '0', pal.glow, 2.4);
    setColor(ring, '1', pal.tail, 0.4);
    ring.a0 = 0.85;
    this.add.spawn(ring);
  }

  #onBoost(e) {
    const k = e?.kart;
    if (!k) return;
    const st = this.#st(k);
    const src = e.source ?? k.boost?.source ?? 'default';
    const tint = BOOST_TINT[src] ?? BOOST_TINT.default;
    if (st) st.boostTint = tint;
    this.#basis(k);
    const r = this.rng;

    // shockwave ring on the ground
    const ring = this.#reset(CELL.RING, 0.46, 0.8, 6.0);
    this.#at(ring, this.#v.copy(k.position).addScaledVector(this.#up, -0.26));
    ring.mode = 1; ring.drag = 9; ring.gravity = 0; ring.fade = 1.5;
    setColor(ring, '0', tint, 1.7);
    setColor(ring, '1', tint, 0.35);
    ring.a0 = 0.95;
    this.add.spawn(ring);

    // a hard cone of flame out of both pipes
    for (const side of [-1, 1]) {
      this.#pipe(k, side, this.#v);
      for (let i = 0; i < 12; i++) {
        const p = this.#reset(CELL.FLAME, r.range(0.16, 0.34), r.range(0.20, 0.40), r.range(0.05, 0.12));
        this.#at(p, this.#v);
        this.#v2.copy(k.velocity).multiplyScalar(0.6)
          .addScaledVector(this.#fwd, -r.range(6, 15))
          .addScaledVector(this.#up, r.range(-0.6, 1.8))
          .addScaledVector(this.#right, side * r.range(0, 2.0));
        this.#vel(p, this.#v2);
        p.drag = 3.6; p.gravity = 1.4;
        p.mode = 2; p.stretch = r.range(0.16, 0.30); p.fade = 0.8;
        setColor(p, '0', 0xffeec0, 1.6);
        setColor(p, '1', tint, 0.9);
        this.add.spawn(p);
      }
    }
    // and a puff of dust off the road as the kart lights up
    for (let i = 0; i < 8; i++) {
      const p = this.#reset(CELL.CLOUD, r.range(0.4, 0.8), r.range(0.3, 0.5), r.range(1.2, 2.0));
      this.#at(p, this.#v.copy(k.position)
        .addScaledVector(this.#fwd, -1.4)
        .addScaledVector(this.#right, r.range(-0.9, 0.9))
        .addScaledVector(this.#up, -0.1));
      this.#v2.copy(k.velocity).multiplyScalar(0.25)
        .addScaledVector(this.#fwd, -r.range(1, 4))
        .addScaledVector(this.#up, r.range(0.5, 2.0))
        .addScaledVector(this.#right, r.range(-2, 2));
      this.#vel(p, this.#v2);
      p.drag = 2.2; p.gravity = 0.3; p.fade = 1.3;
      p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-1, 1);
      const S = SURFACE[k.surface] ?? SURFACE.road;
      setColor(p, '0', k.surface === 'road' ? SMOKE_TYRE : S.color, 1.0);
      setColor(p, '1', k.surface === 'road' ? SMOKE_TYRE : S.color, 0.7);
      p.a0 = 0.34; p.a1 = 0;
      this.alpha.spawn(p);
    }
  }

  #onLand(e) {
    const k = e?.kart;
    if (!k) return;
    const impact = clamp(e.impact ?? 0, 0, 30);
    if (impact < 2.2) return;
    this.#basis(k);
    const r = this.rng;
    const S = SURFACE[k.surface] ?? SURFACE.dirt;
    const color = k.surface === 'road' ? SMOKE_TYRE : S.color;
    const n = Math.round(clamp(4 + impact * 1.4, 4, 26) * this.tier.rate);

    for (let i = 0; i < n; i++) {
      const a = r.range(0, Math.PI * 2);
      const p = this.#reset(CELL.CLOUD, r.range(0.5, 1.0), r.range(0.35, 0.6), r.range(1.4, 2.6));
      this.#at(p, this.#v.copy(k.position)
        .addScaledVector(this.#up, -0.32)
        .addScaledVector(this.#fwd, Math.cos(a) * r.range(0.2, 1.0))
        .addScaledVector(this.#right, Math.sin(a) * r.range(0.2, 1.0)));
      this.#v2.set(Math.sin(a), 0, Math.cos(a)).multiplyScalar(r.range(1.4, 4.0) * clamp01(impact / 9))
        .addScaledVector(this.#up, r.range(0.5, 1.8))
        .addScaledVector(k.velocity, 0.18);
      this.#vel(p, this.#v2);
      p.drag = 2.4; p.gravity = 0.25; p.fade = 1.35;
      p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-1.2, 1.2);
      setColor(p, '0', color, 1.05);
      setColor(p, '1', color, 0.7);
      p.a0 = r.range(0.3, 0.55); p.a1 = 0;
      this.alpha.spawn(p);
    }

    const ring = this.#reset(CELL.RING, 0.42, 0.6, 3.0 + impact * 0.28);
    this.#at(ring, this.#v.copy(k.position).addScaledVector(this.#up, -0.3));
    ring.mode = 1; ring.drag = 9; ring.gravity = 0; ring.fade = 1.7;
    setColor(ring, '0', color, 1.3);
    setColor(ring, '1', color, 0.3);
    ring.a0 = 0.55;
    this.alpha.spawn(ring);

    if (e.hard) this.#sparkleBurst(k.position, 0xfff2c0, 8);
  }

  #onWall(e) {
    const k = e?.kart;
    if (!k) return;
    const strength = clamp01(e.strength ?? 0.5);
    if (strength < 0.12) return;
    this.#basis(k);
    const r = this.rng;
    const n = Math.round(6 + strength * 26);
    const nrm = e.normal ?? this.#v3.set(0, 0, 1);

    this.#v.copy(k.position)
      .addScaledVector(nrm, -1.0)
      .addScaledVector(this.#up, -0.1);

    for (let i = 0; i < n; i++) {
      const p = this.#reset(CELL.SPARK, r.range(0.14, 0.34), r.range(0.09, 0.20), 0.02);
      this.#at(p, this.#v);
      this.#v2.copy(nrm).multiplyScalar(r.range(2, 9))
        .addScaledVector(this.#up, r.range(0.5, 5))
        .addScaledVector(this.#fwd, r.range(-4, 1))
        .addScaledVector(this.#right, r.range(-2.5, 2.5));
      this.#vel(p, this.#v2);
      p.drag = 3.6; p.gravity = -14; p.mode = 2; p.stretch = 0.09; p.fade = 0.55;
      setColor(p, '0', 0xfff0c0, 2.2);
      setColor(p, '1', 0xff7a1a, 1.0);
      this.add.spawn(p);
    }
    for (let i = 0; i < Math.round(3 + strength * 6); i++) {
      const s = this.#reset(CELL.SMOKE, r.range(0.4, 0.8), 0.3, r.range(1.0, 1.7));
      this.#at(s, this.#v);
      this.#v2.copy(nrm).multiplyScalar(r.range(0.5, 2.5)).addScaledVector(this.#up, r.range(0.4, 1.6));
      this.#vel(s, this.#v2);
      s.drag = 2.2; s.gravity = 0.2; s.fade = 1.3;
      s.rot = r.range(0, 6.28); s.rotSpeed = r.range(-1.4, 1.4);
      setColor(s, '0', 0xb0aaa4, 0.95);
      setColor(s, '1', 0xb0aaa4, 0.7);
      s.a0 = 0.3 * (0.4 + strength); s.a1 = 0;
      this.alpha.spawn(s);
    }
  }

  #onHit(e) {
    const k = e?.kart;
    if (!k) return;
    this.#basis(k);
    const r = this.rng;
    for (let i = 0; i < 10; i++) {
      const p = this.#reset(CELL.STAR, r.range(0.45, 0.8), r.range(0.10, 0.20), r.range(0.04, 0.08));
      this.#at(p, this.#v.copy(k.position).addScaledVector(this.#up, r.range(0.5, 1.1)));
      this.#v2.set(r.range(-1, 1), 0, r.range(-1, 1)).normalize()
        .multiplyScalar(r.range(1.5, 4.5))
        .addScaledVector(this.#up, r.range(1.5, 4.0))
        .addScaledVector(k.velocity, 0.35);
      this.#vel(p, this.#v2);
      p.drag = 1.6; p.gravity = -7.5;
      p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-7, 7); p.fade = 0.8;
      setColor(p, '0', 0xfff0a0, 1.6);
      setColor(p, '1', 0xffb020, 0.7);
      this.add.spawn(p);
    }
    this.#puff(k.position, 0xcfc9c2, 8, 1.4);
  }

  #onSquash(e) {
    const k = e?.kart;
    if (!k) return;
    this.#basis(k);
    const ring = this.#reset(CELL.RING, 0.5, 0.4, 4.5);
    this.#at(ring, this.#v.copy(k.position).addScaledVector(this.#up, -0.3));
    ring.mode = 1; ring.drag = 8; ring.gravity = 0; ring.fade = 1.5;
    setColor(ring, '0', 0xfff3a0, 1.6);
    setColor(ring, '1', 0xffd23a, 0.3);
    this.add.spawn(ring);
    this.#puff(k.position, 0xcfc9c2, 12, 1.7);
  }

  #onBump(e) {
    const a = e?.a, b = e?.b;
    if (!a || !b) return;
    this.#v.copy(a.position).add(b.position).multiplyScalar(0.5);
    const f = clamp01((e.force ?? 4) / 12);
    this.#puff(this.#v, 0xd8d2cb, Math.round(3 + f * 6), 1.0);
    this.#sparkleBurst(this.#v, 0xfff3c0, Math.round(2 + f * 5));
  }

  #onHop(e) {
    const k = e?.kart;
    if (!k || !k.onGround) return;
    this.#basis(k);
    const S = SURFACE[k.surface] ?? SURFACE.road;
    this.#puff(this.#v.copy(k.position).addScaledVector(this.#up, -0.3),
      k.surface === 'road' ? SMOKE_TYRE : S.color, 5, 1.0);
  }

  #onTrick(e) {
    const k = e?.kart;
    if (!k) return;
    this.#sparkleBurst(k.position, 0x9ff0ff, 14);
  }

  #onPickup(e) {
    const k = e?.kart;
    if (!k) return;
    this.#sparkleBurst(k.position, 0xfff2a0, 16);
  }

  #onLightning() {
    const r = this.rng;
    for (const st of this.#states) {
      const k = st.kart;
      if (!k) continue;
      for (let i = 0; i < 6; i++) {
        const p = this.#reset(CELL.BAR, r.range(0.10, 0.22), r.range(0.10, 0.22), 0.02);
        this.#at(p, this.#v.copy(k.position).addScaledVector(UP, r.range(0.4, 3.2)));
        this.#vel(p, this.#v2.set(0, -r.range(6, 16), 0));
        p.drag = 0.5; p.gravity = 0; p.mode = 2; p.stretch = 0.16; p.fade = 0.6;
        setColor(p, '0', 0xffffff, 3.0);
        setColor(p, '1', 0xfff0a0, 1.2);
        this.add.spawn(p);
      }
    }
  }

  #onRaceStart() {
    for (const st of this.#states) {
      const k = st.kart;
      if (!k) continue;
      this.#basis(k);
      const S = SURFACE[k.surface] ?? SURFACE.road;
      this.#puff(this.#v.copy(k.position).addScaledVector(this.#up, -0.25).addScaledVector(this.#fwd, -1.1),
        k.surface === 'road' ? SMOKE_TYRE : S.color, 10, 1.6);
    }
  }

  /* --------------------------------------------------------------- shared -- */

  #puff(pos, color, n, scale) {
    const r = this.rng;
    const count = Math.max(1, Math.round(n * this.tier.rate));
    for (let i = 0; i < count; i++) {
      const p = this.#reset(CELL.CLOUD, r.range(0.45, 0.9),
        0.32 * scale, r.range(1.0, 1.9) * scale);
      this.#at(p, this.#v2.copy(pos).addScaledVector(UP, r.range(-0.1, 0.4)));
      this.#vel(p, this.#v3.set(r.range(-1, 1), r.range(0.2, 1.2), r.range(-1, 1))
        .multiplyScalar(r.range(1.0, 3.0)));
      p.drag = 2.3; p.gravity = 0.25; p.fade = 1.3;
      p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-1.2, 1.2);
      setColor(p, '0', color, 1.0);
      setColor(p, '1', color, 0.7);
      p.a0 = r.range(0.26, 0.48); p.a1 = 0;
      this.alpha.spawn(p);
    }
  }

  #sparkleBurst(pos, color, n) {
    if (!pos) return;
    const r = this.rng;
    const count = Math.max(1, Math.round(n * this.tier.rate));
    for (let i = 0; i < count; i++) {
      const p = this.#reset(CELL.SPARKLE, r.range(0.30, 0.65), r.range(0.14, 0.34), 0.02);
      this.#at(p, this.#v2.copy(pos).addScaledVector(UP, r.range(0.2, 1.3)));
      this.#vel(p, this.#v3.set(r.range(-1, 1), r.range(-0.2, 1), r.range(-1, 1))
        .multiplyScalar(r.range(1.5, 5.0)));
      p.drag = 2.6; p.gravity = -3.5; p.fade = 0.9;
      p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-4, 4);
      setColor(p, '0', 0xfff6e0, 1.9);
      setColor(p, '1', color, 0.9);
      this.add.spawn(p);
    }
  }

  #trailPuff(pos, color) {
    const r = this.rng;
    const p = this.#reset(CELL.GLOW, r.range(0.18, 0.34), r.range(0.20, 0.36), 0.03);
    this.#at(p, this.#v2.copy(pos));
    this.#vel(p, this.#v3.set(r.range(-0.6, 0.6), r.range(0.2, 1.2), r.range(-0.6, 0.6)));
    p.drag = 3.0; p.gravity = 0.6; p.fade = 1.1;
    setColor(p, '0', color ?? 0xffffff, 1.5);
    setColor(p, '1', color ?? 0xffffff, 0.4);
    this.add.spawn(p);
  }

  /* ===================================================================== */
  /*  public one-shot API (ctx.vfx)                                         */
  /* ===================================================================== */

  burst(kind, pos, o = {}) {
    if (!pos) return;
    const r = this.rng;
    switch (kind) {
      case 'explode': {
        const scale = o.radius ? o.radius / 5 : 1;
        // white-hot front
        const disc = this.#reset(CELL.DISC, 0.30, 0.6 * scale, 7.0 * scale);
        this.#at(disc, this.#v2.copy(pos));
        disc.drag = 8; disc.gravity = 0; disc.fade = 1.4;
        setColor(disc, '0', 0xffd98a, 1.9);
        setColor(disc, '1', 0xff5a10, 1.1);
        this.add.spawn(disc);

        const ring = this.#reset(CELL.RING, 0.55, 1.0 * scale, 12.0 * scale);
        this.#at(ring, this.#v2.copy(pos).setY(pos.y - 0.5));
        ring.mode = 1; ring.drag = 6; ring.gravity = 0; ring.fade = 1.5;
        setColor(ring, '0', 0xffd08a, 1.8);
        setColor(ring, '1', 0xff5a1a, 0.3);
        this.add.spawn(ring);

        for (let i = 0; i < Math.round(30 * this.tier.rate); i++) {
          const p = this.#reset(CELL.FLAME, r.range(0.24, 0.55),
            r.range(0.4, 0.9) * scale, r.range(0.1, 0.3));
          this.#at(p, this.#v2.copy(pos));
          this.#vel(p, this.#v3.set(r.range(-1, 1), r.range(-0.1, 1.1), r.range(-1, 1))
            .normalize().multiplyScalar(r.range(4, 16) * scale));
          p.drag = 3.0; p.gravity = 2.0; p.mode = 2; p.stretch = 0.08; p.fade = 0.8;
          setColor(p, '0', 0xffc35a, 2.3);
          setColor(p, '1', 0xff3208, 1.5);
          this.add.spawn(p);
        }
        for (let i = 0; i < Math.round(22 * this.tier.rate); i++) {
          const p = this.#reset(CELL.SMOKE, r.range(0.8, 1.6),
            r.range(0.5, 0.9) * scale, r.range(2.2, 4.0) * scale);
          this.#at(p, this.#v2.copy(pos));
          this.#vel(p, this.#v3.set(r.range(-1, 1), r.range(0, 1.2), r.range(-1, 1))
            .multiplyScalar(r.range(1.5, 6.0)));
          p.drag = 1.7; p.gravity = 0.7; p.fade = 1.4;
          p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-1.2, 1.2);
          setColor(p, '0', 0x4a4340, 1.0);
          setColor(p, '1', 0x6d6663, 0.75);
          p.a0 = r.range(0.4, 0.7); p.a1 = 0;
          this.alpha.spawn(p);
        }
        this.#sparkleBurst(pos, 0xffc06a, 12);
        break;
      }
      case 'pickup':
        this.#sparkleBurst(pos, o.color ?? 0xfff2a0, o.count ?? 18);
        break;
      case 'sparkle':
        this.#sparkleBurst(pos, o.color ?? 0xffffff, o.count ?? 10);
        break;
      case 'puff':
        this.#puff(pos, o.color ?? 0xbfb9b2, o.count ?? 8, o.scale ?? 1.2);
        break;
      case 'ring': {
        const ring = this.#reset(CELL.RING, o.life ?? 0.45, o.from ?? 0.6, o.to ?? 5.0);
        this.#at(ring, this.#v2.copy(pos));
        ring.mode = 1; ring.drag = 8; ring.gravity = 0; ring.fade = 1.5;
        setColor(ring, '0', o.color ?? 0xffffff, o.gain ?? 2.6);
        setColor(ring, '1', o.color ?? 0xffffff, 0.4);
        this.add.spawn(ring);
        break;
      }
      case 'aura': {
        const p = this.#reset(CELL.SPARKLE, r.range(0.3, 0.6), r.range(0.16, 0.34), 0.02);
        this.#at(p, this.#v2.copy(pos));
        this.#vel(p, this.#v3.set(r.range(-1, 1), r.range(0.3, 1.6), r.range(-1, 1))
          .multiplyScalar(r.range(1, 3)));
        p.drag = 2.4; p.gravity = -1.5; p.fade = 0.9;
        p.rot = r.range(0, 6.28); p.rotSpeed = r.range(-6, 6);
        setColor(p, '0', 0xffffff, 4.0);
        setColor(p, '1', o.color ?? 0xffd83a, 1.6);
        this.add.spawn(p);
        break;
      }
      default:
        this.#sparkleBurst(pos, 0xffffff, 6);
    }
  }

  /* ===================================================================== */

  lateUpdate(dt, ctx) {
    const t = ctx.time.t;
    this.add.flush(t);
    this.alpha.flush(t);
    this.marks?.flush(t);
  }

  dispose() {
    for (const off of this.#offs) off?.();
    this.#offs.length = 0;
    this.add?.mesh?.parent?.remove(this.add.mesh);
    this.alpha?.mesh?.parent?.remove(this.alpha.mesh);
    this.marks?.mesh?.parent?.remove(this.marks.mesh);
    this.add?.dispose();
    this.alpha?.dispose();
    this.marks?.dispose();
    this.markTex?.dispose();
    this.atlas?.texture?.dispose();
    this.#states.length = 0;
  }
}
