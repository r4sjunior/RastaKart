import * as THREE from 'three';
import { TUNING, DEFAULT_STATS } from './tuning.js';
import { clamp, clamp01, lerp, sign, approach, wrapAngle, hashNoise, finite } from './util.js';

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const WORLD_UP = new THREE.Vector3(0, 1, 0);

/** Wheel layout, in signed multiples of halfTrack / halfBase. */
const WHEEL_LAYOUT = [
  { key: 'FL', sx: -1, sz: 1 },
  { key: 'FR', sx: 1, sz: 1 },
  { key: 'RL', sx: -1, sz: -1 },
  { key: 'RR', sx: 1, sz: -1 },
];

/**
 * =============================================================================
 *  KartBody — one kart's dynamics.
 * =============================================================================
 *
 *  Frames
 *  ------
 *  The kart is a rigid body whose orientation is built every step from three
 *  pieces, in this order:
 *
 *      q = basis(up, heading) * rollAboutZ(phi) * pitchAboutX(theta)
 *
 *    * `up`      — the smoothed terrain normal.  This is what makes the kart
 *                  follow banking without ever tipping over: the alignment is
 *                  kinematic and rate-limited, so a bad `sampleGround` normal
 *                  or a surface seam can wobble it by a fraction of a degree,
 *                  never flip it.
 *    * `heading` — yaw, integrated from the steering / drift model.
 *    * phi/theta — roll and pitch *on the suspension*.  These are a genuine
 *                  second-order mode: the steady-state angle is the load
 *                  transfer torque divided by the roll (pitch) stiffness of
 *                  the springs, and the body converges on it at the natural
 *                  frequency of the sprung mass.  Roll comes out of measured
 *                  lateral acceleration and pitch out of measured longitudinal
 *                  acceleration, so a hard brake dives and a hard corner rolls
 *                  as a *consequence* of driving, never as an animation.
 *
 *  Local axes: +X right, +Y up, +Z forward (matches `world.startGrid`).
 *
 *  Suspension
 *  ----------
 *  Four raycast wheels.  Each casts from its anchor along -up against
 *  `world.sampleGround`, and runs a linear spring + viscous damper.  The sum
 *  of the four spring forces drives the body's heave (vertical velocity), the
 *  asymmetry between them feeds the lean model, and the per-wheel compression
 *  is published in `kart.wheelContacts` for the character system to animate.
 */
export class KartBody {
  constructor(kart, ctx) {
    this.k = kart;
    this.ctx = ctx;

    const stats = kart.stats;
    const C = TUNING.chassis;
    const S = TUNING.suspension;

    this.mass = C.mass * (stats.weight ?? 1);
    this.invMass = 1 / this.mass;

    // Spring rate derived from the sag target so the feel survives any change
    // to mass or gravity: k = W / sag, with W the static wheel load.
    this.sag = S.restLength * S.sagRatio;
    this.springK = (this.mass * TUNING.air.gravityDown) / (4 * this.sag);
    const critical = 2 * Math.sqrt(this.springK * (this.mass / 4));
    this.springC = critical * S.dampingRatio;

    // Anchor height chosen so that, at rest, the body origin sits exactly
    // `rideHeight` above the ground.
    this.anchorY = S.restLength - this.sag - C.rideHeight;

    this.wheels = WHEEL_LAYOUT.map((w) => ({
      key: w.key,
      front: w.sz > 0,
      side: w.sx,
      local: new THREE.Vector3(w.sx * C.halfTrack, this.anchorY, w.sz * C.halfBase),
      anchor: new THREE.Vector3(),
      pos: new THREE.Vector3(),
      contact: new THREE.Vector3(),
      normal: new THREE.Vector3(0, 1, 0),
      len: S.restLength - this.sag,
      vel: 0,
      compression: S.sagRatio,
      force: 0,
      grounded: true,
      surface: 'road',
      groundY: 0,
      spin: 0,
    }));
    kart.wheelContacts = this.wheels;

    // ---- orientation state -------------------------------------------------
    this.yaw = 0;
    this.up = kart.up;                      // shared with the entity
    this.roll = 0; this.rollVel = 0;
    this.pitch = 0; this.pitchVel = 0;
    this.airPitch = 0;
    this.trickSpin = 0;

    // ---- scratch -----------------------------------------------------------
    this.fwd = new THREE.Vector3(0, 0, 1);
    this.right = new THREE.Vector3(1, 0, 0);
    this._v = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
    this._v3 = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._q2 = new THREE.Quaternion();
    this._m = new THREE.Matrix4();
    this._prevVel = new THREE.Vector3();

    // ---- driving state -----------------------------------------------------
    this.speedCap = stats.topSpeed;
    this.localAccel = new THREE.Vector3();  // measured, body frame (m/s^2)
    this.airTime = 0;
    this.groundTime = 0;
    this.coyote = 0;
    this.hopTimer = 0;
    this.hopArmed = false;
    this.driftAir = 0;
    this.launchUp = 0;
    this.padCooldown = 0;
    this.spin = { t: 0, dur: 0, dir: 1 };
    this.squash = { t: 0, dur: 0 };
    this.trick = { t: 0, dur: 0, kind: 0, done: false };
    this.wasGrounded = true;
    this.prevSurface = 'road';
    this.rumble = 0;

    this.controls = { throttle: 0, brake: 0, steer: 0, drift: false, driftPressed: false, item: false };
  }

  // ==========================================================================
  //  setup
  // ==========================================================================

  /** Snap the kart onto the ground and face it down the track at spawn. */
  place(ctx) {
    const k = this.k;
    this.fwd.set(0, 0, 1).applyQuaternion(k.quaternion);
    this.yaw = Math.atan2(this.fwd.x, this.fwd.z);
    const g = sampleGround(ctx, k.position.x, k.position.z);
    k.position.y = g.y + TUNING.chassis.rideHeight;
    this.up.copy(g.normal);
    k.groundNormal.copy(g.normal);
    k.surface = g.surface;
    this.speedCap = k.stats.topSpeed;
    // makeBasis derives fwd/right from `yaw` and `up`; without it buildQuaternion
    // would compose the spawn orientation from an uninitialised `right`, and the
    // resulting garbage heading gets locked in by the countdown's frozen step.
    this.makeBasis();
    this.buildQuaternion();
    this.refreshWheels(ctx, true);
  }

  // ==========================================================================
  //  main step — phase 1: integrate
  // ==========================================================================

  integrate(dt, ctx, controls) {
    const k = this.k;
    Object.assign(this.controls, controls);

    this.tickTimers(dt);

    if (k.frozen) { this.frozenStep(dt, ctx); return; }

    this._prevVel.copy(k.velocity);

    // --- ground probe ------------------------------------------------------
    this.suspension(dt, ctx);

    const onGround = this.groundedCount > 0;
    if (onGround) { this.coyote = TUNING.air.coyote; this.groundTime += dt; }
    else { this.coyote = Math.max(0, this.coyote - dt); this.groundTime = 0; }
    const effGround = onGround || this.coyote > 0;

    if (onGround) {
      if (!this.wasGrounded) this.onLanded(ctx);
      this.airTime = 0;
    } else {
      if (this.wasGrounded) this.onLeftGround(ctx);
      this.airTime += dt;
    }
    this.wasGrounded = onGround;

    k.onGround = onGround;
    k.air.off = !onGround;
    k.air.time = this.airTime;

    // --- basis -------------------------------------------------------------
    this.alignUp(dt, onGround);
    this.makeBasis();

    // --- decompose velocity into the tangent frame -------------------------
    const vFwd = k.velocity.dot(this.fwd);
    const vLat = k.velocity.dot(this.right);
    const vUp = k.velocity.dot(this.up);
    const planar = Math.hypot(vFwd, vLat);

    // --- driver model ------------------------------------------------------
    this.driftMachine(dt, ctx, onGround, planar);
    const yawRate = this.steering(dt, ctx, vFwd, planar, effGround);
    this.yaw = wrapAngle(this.yaw + yawRate * dt);

    // --- forces ------------------------------------------------------------
    let nFwd = vFwd, nLat = vLat, nUp = vUp;

    if (effGround) {
      const r = this.groundForces(dt, ctx, vFwd, vLat, planar);
      nFwd = r.fwd; nLat = r.lat;
      nUp = vUp + (this.springAccel - this.gravity()) * dt;
    } else {
      const r = this.airForces(dt, ctx, vFwd, vLat);
      nFwd = r.fwd; nLat = r.lat;
      nUp = vUp - this.gravity() * dt;
      nUp = Math.max(nUp, -TUNING.air.maxFall);
    }

    // --- recompose ---------------------------------------------------------
    k.velocity.copy(this.fwd).multiplyScalar(nFwd)
      .addScaledVector(this.right, nLat)
      .addScaledVector(this.up, nUp);

    // gravity that the tangent frame cannot express (steep slopes)
    if (effGround) {
      const lean = 1 - Math.abs(this.up.y);
      if (lean > 0.01) {
        this._v.copy(WORLD_UP).addScaledVector(this.up, -this.up.y).multiplyScalar(-1);
        k.velocity.addScaledVector(this._v, this.gravity() * lean * dt * 0.9);
      }
    }

    // --- integrate position -------------------------------------------------
    k.position.addScaledVector(k.velocity, dt);

    // --- measured body-frame acceleration (drives the lean model) ----------
    this._v.copy(k.velocity).sub(this._prevVel).multiplyScalar(1 / dt);
    this.localAccel.set(this._v.dot(this.right), this._v.dot(this.up), this._v.dot(this.fwd));

    // guard: never let a bad world sample poison the state
    if (!Number.isFinite(k.position.x + k.position.y + k.position.z)) k.position.copy(this._prevVel).set(0, 0, 0);
    k.velocity.set(finite(k.velocity.x), finite(k.velocity.y), finite(k.velocity.z));
  }

  // ==========================================================================
  //  timers / status effects
  // ==========================================================================

  tickTimers(dt) {
    const k = this.k;
    if (k.boost.timer > 0) {
      k.boost.timer -= dt;
      if (k.boost.timer <= 0) { k.boost.timer = 0; k.boost.source = null; k.boost.power = 1; }
    }
    if (this.spin.t > 0) {
      this.spin.t -= dt;
      if (this.spin.t <= 0) { this.spin.t = 0; k.spinning = false; }
    }
    if (this.squash.t > 0) {
      this.squash.t -= dt;
      if (this.squash.t <= 0) { this.squash.t = 0; k.squashed = false; k.squashAmount = 0; }
      else k.squashAmount = Math.min(1, this.squash.t / 0.18);
    }
    if (this.trick.t > 0) {
      this.trick.t -= dt;
      const u = 1 - clamp01(this.trick.t / this.trick.dur);
      this.trickSpin = Math.sin(u * Math.PI) * (this.trick.kind === 1 ? 1 : -1) * 0.55;
      if (this.trick.t <= 0) this.trickSpin = 0;
    }
    if (this.hopTimer > 0) this.hopTimer -= dt;
    if (this.padCooldown > 0) this.padCooldown -= dt;
  }

  /** Frozen karts (countdown, respawn) hold their pose but keep sitting on the
   *  ground, so the suspension and wheel contacts stay valid for the visuals. */
  frozenStep(dt, ctx) {
    const k = this.k;
    k.velocity.set(0, 0, 0);
    k.forwardSpeed = 0; k.speed = 0;
    this.fwd.set(0, 0, 1).applyQuaternion(k.quaternion);
    this.yaw = Math.atan2(this.fwd.x, this.fwd.z);
    const g = sampleGround(ctx, k.position.x, k.position.z);
    k.position.y += (g.y + TUNING.chassis.rideHeight - k.position.y) * approach(14, dt);
    k.surface = g.surface;
    k.groundNormal.copy(g.normal);
    this.alignUp(dt, true, g.normal);
    this.roll += (0 - this.roll) * approach(9, dt);
    this.pitch += (0 - this.pitch) * approach(9, dt);
    this.rollVel = this.pitchVel = 0;
    this.airPitch = 0;
    k.onGround = true; k.air.off = false; k.air.time = 0;
    this.airTime = 0; this.wasGrounded = true;
    this.makeBasis();
    this.suspension(dt, ctx);
  }

  // ==========================================================================
  //  suspension
  // ==========================================================================

  suspension(dt, ctx) {
    const k = this.k;
    const S = TUNING.suspension;
    const maxLen = S.restLength;
    const probe = maxLen + S.probeExtra;

    let sumForce = 0;
    let grounded = 0;
    let comp = [0, 0, 0, 0];
    this.deepest = 0;

    for (let i = 0; i < 4; i++) {
      const w = this.wheels[i];
      w.anchor.copy(w.local).applyQuaternion(k.quaternion).add(k.position);

      const g = sampleGround(ctx, w.anchor.x, w.anchor.z);
      w.groundY = g.y;
      w.normal.copy(g.normal);
      w.surface = g.surface;

      // distance from the anchor to the ground plane along -up
      const denom = Math.max(0.25, this.up.dot(g.normal));
      let t = ((w.anchor.y - g.y) * Math.max(0.25, g.normal.y)) / denom;
      if (!Number.isFinite(t)) t = probe;

      const prevLen = w.len;
      const len = clamp(t, 0, probe);
      w.grounded = t <= maxLen;

      if (w.grounded) {
        grounded++;
        w.len = len;
        w.vel = (prevLen - w.len) / dt;                 // + = compressing
        const x = maxLen - w.len;                       // spring travel (m)
        const damping = this.springC * (w.vel < 0 ? S.reboundExtra : 1);
        let f = this.springK * x + damping * w.vel;
        f = clamp(f, 0, S.maxForce);
        w.force = f;
        sumForce += f;
        if (t < 0) this.deepest = Math.max(this.deepest, -t);
      } else {
        w.len = len;
        w.vel = 0;
        w.force = 0;
      }
      w.compression = clamp01((maxLen - w.len) / maxLen);
      comp[i] = w.compression;

      // hub position: down the suspension from the anchor
      w.pos.copy(w.anchor).addScaledVector(this.up, -Math.min(w.len, maxLen));
      w.contact.copy(w.pos).addScaledVector(this.up, -S.wheelRadius * 0);
      w.spin = (w.spin + (this.k.forwardSpeed || 0) * dt / S.wheelRadius) % TAU;
    }

    this.groundedCount = grounded;
    this.springAccel = (sumForce * this.invMass);
    this.compFL = comp[0]; this.compFR = comp[1]; this.compRL = comp[2]; this.compRR = comp[3];

    // sum of the wheel surfaces decides the chassis surface (majority wins,
    // and the front axle counts double so entering grass is felt early)
    k.surface = pickSurface(this.wheels);
  }

  // ==========================================================================
  //  orientation
  // ==========================================================================

  alignUp(dt, onGround, forced) {
    const A = TUNING.align;
    const target = this._v3;
    if (forced) target.copy(forced);
    else if (onGround) {
      target.set(0, 0, 0);
      let n = 0;
      for (const w of this.wheels) if (w.grounded) { target.add(w.normal); n++; }
      if (n === 0) target.copy(WORLD_UP); else target.multiplyScalar(1 / n);
    } else target.copy(WORLD_UP);

    if (target.lengthSq() < 1e-6) target.copy(WORLD_UP);
    target.normalize();

    // clamp the terrain normal so a broken sample can never capsize the kart
    const maxCos = Math.cos(A.maxTiltDeg * DEG);
    if (target.y < maxCos) {
      target.setY(0);
      if (target.lengthSq() < 1e-6) target.set(0, 0, 1);
      target.normalize().multiplyScalar(Math.sqrt(Math.max(0, 1 - maxCos * maxCos)));
      target.y = maxCos;
      target.normalize();
    }

    const diff = 1 - this.up.dot(target);
    if (diff > A.deadband * A.deadband) {
      const rate = onGround ? A.groundRate : A.airRate;
      this.up.lerp(target, approach(rate, dt)).normalize();
    }
  }

  makeBasis() {
    // forward from yaw, projected into the plane perpendicular to `up`
    this.fwd.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this.fwd.addScaledVector(this.up, -this.fwd.dot(this.up));
    if (this.fwd.lengthSq() < 1e-6) this.fwd.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this.fwd.normalize();
    this.right.copy(this.up).cross(this.fwd).normalize();
  }

  /**
   * Roll and pitch as a damped second-order suspension mode.
   *
   *   steady state:  phi_ss = (m * aLat * hCoM) / K_roll
   *   dynamics:      phi'' = w^2 (phi_ss - phi) - 2 z w phi'
   *
   * `rollPerLatAccelDeg` folds m, hCoM and K_roll into one tunable number, and
   * the wheel-compression asymmetry adds whatever the terrain contributes on
   * top (a kerb strike, one wheel dropping off the road).
   */
  leanStep(dt) {
    const L = TUNING.lean;
    const k = this.k;
    const w0 = TAU * L.freqHz;
    const zeta = L.dampingRatio;

    const aLat = clamp(this.localAccel.x, -40, 40);
    const aLong = clamp(this.localAccel.z, -40, 40);

    // load transfer
    let rollTarget = L.rollPerLatAccelDeg * DEG * aLat;
    let pitchTarget = -L.pitchPerLongAccelDeg * DEG * aLong;

    // terrain / one-wheel asymmetry straight out of the springs
    const rollGeom = ((this.compFL + this.compRL) - (this.compFR + this.compRR)) * 0.5;
    const pitchGeom = ((this.compRL + this.compRR) - (this.compFL + this.compFR)) * 0.5;
    rollTarget += rollGeom * L.terrainRollDeg * DEG;
    pitchTarget += pitchGeom * L.terrainPitchDeg * DEG;

    // a drift leans the body over its outside wheels
    if (k.drift.active) rollTarget += k.drift.dir * L.driftRollDeg * DEG * clamp01(Math.abs(this.slip) / (TUNING.drift.slipMaxDeg * DEG));

    const maxR = L.maxRollDeg * DEG, maxP = L.maxPitchDeg * DEG;
    rollTarget = clamp(rollTarget, -maxR, maxR);
    pitchTarget = clamp(pitchTarget, -maxP, maxP);

    this.rollVel += (w0 * w0 * (rollTarget - this.roll) - 2 * zeta * w0 * this.rollVel) * dt;
    this.pitchVel += (w0 * w0 * (pitchTarget - this.pitch) - 2 * zeta * w0 * this.pitchVel) * dt;
    this.roll = clamp(this.roll + this.rollVel * dt, -maxR * 1.4, maxR * 1.4);
    this.pitch = clamp(this.pitch + this.pitchVel * dt, -maxP * 1.4, maxP * 1.4);
  }

  buildQuaternion() {
    const k = this.k;
    this._m.makeBasis(this.right, this.up, this.fwd);
    k.quaternion.setFromRotationMatrix(this._m);
    const totalPitch = clamp(this.pitch + this.airPitch, -1.2, 1.2);
    if (this.roll !== 0) k.quaternion.multiply(this._q.setFromAxisAngle(AXIS_Z, this.roll));
    if (totalPitch !== 0) k.quaternion.multiply(this._q.setFromAxisAngle(AXIS_X, totalPitch));
    if (this.trickSpin !== 0) k.quaternion.multiply(this._q.setFromAxisAngle(AXIS_X, this.trickSpin * TAU));
    if (this.spin.t > 0) {
      const u = 1 - this.spin.t / Math.max(0.001, this.spin.dur);
      k.quaternion.multiply(this._q.setFromAxisAngle(AXIS_Y, this.spin.dir * u * TAU * TUNING.status.spinTurns));
    }
  }

  // ==========================================================================
  //  steering
  // ==========================================================================

  steering(dt, ctx, vFwd, planar, onGround) {
    const k = this.k;
    const T = TUNING.steer;
    const c = this.controls;

    // Steering sign.
    //
    // The chassis is authored +Z forward in three.js' right-handed space, so
    // its local +X sits on the driver's *left*, not the right. Yaw is measured
    // as atan2(fwd.x, fwd.z), which means a positive yaw rate swings the nose
    // toward +X — a left turn on screen. The player pressing right must
    // therefore drive yaw negative, so the raw input is negated once, here, at
    // the boundary. Everything downstream (drift direction, the visual wheel
    // angle, the hop kick, camera roll) derives from `steerInput` and stays
    // consistent with it.
    const raw = this.spin.t > 0 ? 0 : clamp(c.steer, -1, 1);
    const want = -raw;
    k.steerInput += (want - k.steerInput) * approach(T.inputRate, dt);

    if (this.spin.t > 0) {
      k.steerAngle = 0;
      return 0;              // the spin rotation is baked into the quaternion
    }

    if (!onGround) {
      // weak yaw authority in the air
      k.steerAngle = k.steerInput * 0.25;
      return k.steerInput * TUNING.air.yawRateDeg * DEG;
    }

    const stats = k.stats;
    const handlingMul = (stats.handling ?? DEFAULT_STATS.handling) / T.handlingRef;
    const topRef = Math.max(1, stats.topSpeed);
    const sn = clamp01(planar / topRef);

    let maxYaw = lerp(T.yawRateLowDeg, T.yawRateHighDeg, sn) * DEG;
    if (planar > topRef) {
      const over = clamp01((planar - topRef) / (topRef * 0.6));
      maxYaw = lerp(maxYaw, T.yawRateBoostDeg * DEG, over);
    }
    maxYaw *= handlingMul;

    const fade = clamp01((planar - T.minTurnSpeed) / Math.max(0.01, T.fadeInSpeed - T.minTurnSpeed));
    const dirSign = vFwd < -0.4 ? -1 : 1;         // steering inverts in reverse

    let yawRate;
    if (k.drift.active) {
      const D = TUNING.drift;
      const into = clamp(k.steerInput * k.drift.dir, -1, 1);
      const s = (into + 1) * 0.5;                 // 0 = full counter-steer
      yawRate = k.drift.dir * maxYaw * lerp(D.yawMulMin, D.yawMulMax, s) * fade;

      // hold the slip angle inside the controllable band
      const slipTarget = k.drift.dir * lerp(D.slipMinDeg, D.slipMaxDeg, s) * DEG;
      const excess = (this.slip - slipTarget) * k.drift.dir;
      yawRate -= k.drift.dir * clamp(excess, -0.6, 1.2) * D.slipRate;

      k.steerAngle = clamp(k.drift.dir * 0.42 + k.steerInput * 0.22, -0.7, 0.7);
    } else {
      yawRate = k.steerInput * maxYaw * fade * dirSign;
      k.steerAngle = k.steerInput * lerp(0.55, 0.24, sn);
    }

    // off-road wobble: the wheel is fighting you on loose ground
    if (this.rumble > 0.001) {
      const n = hashNoise(Math.floor(ctx.time.t * TUNING.surfaces.rumbleHz) * 1.7 + k.id * 13.1);
      yawRate += n * TUNING.surfaces.rumbleSteerDeg * DEG * this.rumble * 6;
    }

    k.steerNorm = k.steerInput;
    return yawRate;
  }

  // ==========================================================================
  //  ground forces
  // ==========================================================================

  groundForces(dt, ctx, vFwd, vLat, planar) {
    const k = this.k;
    const D = TUNING.drive;
    const G = TUNING.grip;
    const SU = TUNING.surfaces;
    const c = this.controls;
    const stats = k.stats;

    const surf = k.surface;
    const boosting = k.boost.timer > 0;

    // ---- surface -----------------------------------------------------------
    const base = SU.speedMul[surf] ?? 1;
    const offroadStat = clamp01(stats.offroad ?? DEFAULT_STATS.offroad);
    const surfMul = base >= 1 ? 1 : clamp01(base + (1 - base) * offroadStat * SU.offroadRecovery);
    const surfDrag = (SU.dragBoost[surf] ?? 0) * (1 - offroadStat * SU.offroadRecovery);
    this.rumble = boosting ? 0 : (1 - surfMul) * clamp01(planar / Math.max(1, stats.topSpeed));

    if (surf !== this.prevSurface) {
      const wasOff = (SU.speedMul[this.prevSurface] ?? 1) < 1;
      const isOff = base < 1;
      if (isOff !== wasOff) ctx.events.emit('kart:offroad', { kart: k, surface: surf, entering: isOff });
      if (surf === 'boost' && this.padCooldown <= 0) {
        this.padCooldown = SU.padCooldown;
        k.giveBoost(SU.padBoostTime, SU.padBoostPower, 'pad');
      }
      this.prevSurface = surf;
    } else if (surf === 'boost' && this.padCooldown <= 0) {
      this.padCooldown = SU.padCooldown;
      k.giveBoost(SU.padBoostTime, SU.padBoostPower, 'pad');
    }

    // ---- speed cap ---------------------------------------------------------
    let capTarget = stats.topSpeed * surfMul;
    if (boosting) capTarget = Math.max(capTarget, stats.topSpeed * k.boost.power);
    if (this.squash.t > 0) capTarget *= TUNING.status.squashSpeedMul;
    if (k.drift.active) capTarget *= 1 - TUNING.drift.slipSpeedCost * clamp01(Math.abs(this.slip) / (TUNING.drift.slipMaxDeg * DEG));
    // the cap rises instantly (boost punch) and relaxes slowly (boost fade)
    this.speedCap = capTarget > this.speedCap
      ? capTarget
      : this.speedCap + (capTarget - this.speedCap) * approach(TUNING.boost.decayRate, dt);

    // ---- longitudinal ------------------------------------------------------
    const accelMul = (stats.accel ?? DEFAULT_STATS.accel) / D.accelRef;
    const r = clamp01(planar / Math.max(1, this.speedCap * D.topSpeedOvershoot));
    let a = 0;

    const throttle = this.spin.t > 0 ? 0 : c.throttle;
    const brake = this.spin.t > 0 ? 0 : c.brake;

    if (throttle > 0) {
      a += throttle * D.peakAccel * accelMul * (1 - Math.pow(r, D.curveExp));
    }
    if (boosting) a += TUNING.boost.accelBonus * clamp01(1 - r);

    if (brake > 0) {
      if (vFwd > D.reverseThreshold) a -= brake * D.brakeDecel;
      else a -= brake * D.reverseAccel * clamp01(1 - Math.abs(vFwd) / D.reverseTop);
    }
    if (throttle <= 0 && brake <= 0) a -= sign(vFwd) * Math.min(D.coastDecel, Math.abs(vFwd) / dt);

    // resistance
    a -= vFwd * D.rollDrag;
    a -= sign(vFwd) * vFwd * vFwd * D.aeroDrag;
    if (surfDrag > 0) a -= sign(vFwd) * surfDrag;
    if (this.spin.t > 0) a -= vFwd * TUNING.status.spinDrag;
    if (this.squash.t > 0) a -= vFwd * TUNING.status.squashDrag;

    let nFwd = vFwd + a * dt;
    if (vFwd < 0 && nFwd < -D.reverseTop) nFwd = -D.reverseTop;

    // ---- lateral grip ------------------------------------------------------
    const gripSurf = G.surface[surf] ?? 1;
    const gripStat = stats.grip ?? DEFAULT_STATS.grip;
    let stiff, maxLat;
    if (this.spin.t > 0) { stiff = G.spinStiffness; maxLat = G.maxLatAccel; }
    else if (k.drift.active) { stiff = G.driftStiffness; maxLat = G.driftMaxLatAccel; }
    else { stiff = G.stiffness; maxLat = G.maxLatAccel; }
    stiff *= gripSurf * gripStat;
    maxLat *= gripSurf * gripStat;

    const latAccel = clamp(-vLat * stiff, -maxLat, maxLat);
    let nLat = vLat + latAccel * dt;
    if (Math.abs(nLat) > Math.abs(vLat)) nLat = vLat;   // grip never adds slide

    // ---- soft top-speed limit ---------------------------------------------
    const nPlanar = Math.hypot(nFwd, nLat);
    const hardCap = this.speedCap * 1.02;
    if (nPlanar > hardCap) {
      const s = 1 - Math.min(0.5, (nPlanar - hardCap) / Math.max(0.5, nPlanar) * 12 * dt + (nPlanar - hardCap) / nPlanar * 0.35);
      nFwd *= s; nLat *= s;
    }

    // ---- rumble on rough ground -------------------------------------------
    if (this.rumble > 0.001) {
      const ph = ctx.time.t * SU.rumbleHz * TAU + k.id * 2.3;
      this.springAccel += Math.sin(ph) * SU.rumbleHeave * this.rumble * 24;
    }

    this.slipUpdate(nFwd, nLat);
    return { fwd: nFwd, lat: nLat };
  }

  slipUpdate(vFwd, vLat) {
    const planar = Math.hypot(vFwd, vLat);
    this.slip = planar > 0.4 ? Math.atan2(-vLat, Math.abs(vFwd)) : 0;
    // slip > 0 means the nose points left of the velocity, i.e. drifting right
    this.slip = -this.slip;
  }

  // ==========================================================================
  //  air forces
  // ==========================================================================

  airForces(dt, ctx, vFwd, vLat) {
    const A = TUNING.air;
    const c = this.controls;
    const k = this.k;

    // limited pitch authority: brake noses up, throttle noses down
    const pitchIn = clamp((c.brake - c.throttle) * 0.85, -1, 1);
    this.airPitch += pitchIn * A.pitchRateDeg * DEG * dt;
    this.airPitch = clamp(this.airPitch, -A.pitchMaxDeg * DEG, A.pitchMaxDeg * DEG);

    const d = 1 - approach(A.drag, dt);
    this.slipUpdate(vFwd * d, vLat * d);
    return { fwd: vFwd * d, lat: vLat * d };
  }

  gravity() {
    const A = TUNING.air;
    return this.k.velocity.dot(this.up) > 0 ? A.gravityUp : A.gravityDown;
  }

  // ==========================================================================
  //  drift + mini-turbo
  // ==========================================================================

  driftMachine(dt, ctx, onGround, planar) {
    const k = this.k;
    const D = TUNING.drift;
    const c = this.controls;
    const d = k.drift;

    if (this.spin.t > 0) { this.releaseDrift(ctx, false); return; }

    // ---- hop ---------------------------------------------------------------
    if (c.driftPressed) {
      if (!onGround && this.airTime < TUNING.air.trickWindow && !this.trick.done
          && this.launchUp > TUNING.air.trickMinUp) {
        this.doTrick(ctx);
      } else if (onGround && !d.active && this.hopTimer <= 0 && planar > D.minSpeed) {
        this.hop(ctx);
      }
    }

    // ---- engage ------------------------------------------------------------
    if (this.hopArmed) {
      const st = k.steerInput;
      if (Math.abs(st) > D.engageSteer) {
        d.active = true;
        d.dir = sign(st);
        d.charge = 0; d.counter = 0; d.tier = 0; d.tierProgress = 0;
        this.hopArmed = false;
        this.driftAir = 0;
        this.yaw += -d.dir * 0 + d.dir * D.hopYawDeg * DEG * 0;   // kick applied below
        this.yaw = wrapAngle(this.yaw + d.dir * D.hopYawDeg * DEG);
        ctx.events.emit('kart:drift-start', { kart: k, dir: d.dir });
      } else if (this.hopTimer <= 0 || onGround) {
        this.hopArmed = false;    // hop with no steering: just a hop
      }
    }

    if (!d.active) return;

    // ---- sustain conditions ------------------------------------------------
    if (!c.drift || planar < D.breakSpeed) { this.releaseDrift(ctx, true); return; }

    if (!onGround) {
      this.driftAir += dt;
      if (this.driftAir > D.airGrace) {
        // losing the ground kills the charge but leaves you sliding
        if (d.counter > 0) {
          d.counter = 0; d.charge = 0; d.tierProgress = 0;
          if (d.tier !== 0) { d.tier = 0; ctx.events.emit('kart:drift-tier', { kart: k, tier: 0 }); }
        }
      }
      return;
    }
    this.driftAir = 0;

    // ---- charge ------------------------------------------------------------
    const mt = (k.stats.miniTurbo ?? DEFAULT_STATS.miniTurbo) / D.miniTurboRef;
    const angle = Math.abs(k.steerInput);
    const a = clamp01((angle - 0.15) / Math.max(0.01, D.chargeFastSteer - 0.15));
    const rate = lerp(D.chargeSlow, D.chargeFast, a) * mt;
    d.counter += rate * dt;

    const th = D.tierThresholds;
    let tier = 0;
    if (d.counter >= th[2]) tier = 3;
    else if (d.counter >= th[1]) tier = 2;
    else if (d.counter >= th[0]) tier = 1;

    if (tier > d.tier) {
      d.tier = tier;
      ctx.events.emit('kart:drift-tier', { kart: k, tier, dir: d.dir });
    }
    d.charge = clamp01(d.counter / th[2]);
    const lo = tier === 0 ? 0 : th[tier - 1];
    const hi = tier >= 3 ? th[2] : th[tier];
    d.tierProgress = tier >= 3 ? 1 : clamp01((d.counter - lo) / Math.max(1, hi - lo));
  }

  hop(ctx) {
    const k = this.k;
    const D = TUNING.drift;
    k.velocity.addScaledVector(this.up, D.hopSpeed);
    this.hopTimer = D.hopWindow;
    this.hopArmed = true;
    this.wasGrounded = true;              // a hop is not "leaving the ground"
    this.driftAir = 0;
    ctx.events.emit('kart:hop', { kart: k });
  }

  releaseDrift(ctx, grant) {
    const k = this.k;
    const d = k.drift;
    if (!d.active) return;
    const D = TUNING.drift;
    const tier = d.tier;
    d.active = false; d.dir = 0; d.charge = 0; d.counter = 0; d.tier = 0; d.tierProgress = 0;
    this.driftAir = 0;
    if (grant && tier > 0) {
      k.giveBoost(D.boostTime[tier - 1], D.boostPower[tier - 1], 'minitrubo');
      ctx.events.emit('kart:boost', {
        kart: k, source: 'minitrubo', tier,
        duration: D.boostTime[tier - 1], power: D.boostPower[tier - 1],
      });
    }
    ctx.events.emit('kart:drift-end', { kart: k, tier });
  }

  // ==========================================================================
  //  air: leaving, tricks, landing
  // ==========================================================================

  onLeftGround(ctx) {
    this.launchUp = this.k.velocity.dot(this.up);
    this.trick.done = false;
    this.k.air.trickDone = false;
    this.airPitch = 0;
  }

  doTrick(ctx) {
    const k = this.k;
    const A = TUNING.air;
    // only if there is enough hang time left to actually land it
    const vUp = k.velocity.dot(this.up);
    const est = (vUp + Math.sqrt(Math.max(0, vUp * vUp + 2 * A.gravityDown * 1.0))) / A.gravityDown;
    if (est < A.trickMinAir) return;
    this.trick.done = true;
    this.trick.dur = A.trickDuration;
    this.trick.t = A.trickDuration;
    this.trick.kind = k.steerInput > 0.3 ? 1 : k.steerInput < -0.3 ? 2 : 0;
    k.air.trickDone = true;
    ctx.events.emit('kart:trick', { kart: k, kind: this.trick.kind, dir: sign(k.steerInput) });
  }

  onLanded(ctx) {
    const k = this.k;
    const A = TUNING.air;
    const impact = Math.max(0, -this._prevVel.dot(this.up));

    // eat the vertical energy into the springs instead of bouncing
    const vUp = k.velocity.dot(this.up);
    if (vUp < 0) k.velocity.addScaledVector(this.up, -vUp * A.landAbsorb);

    // misaligned landing costs speed
    let aligned = 1;
    const planar = this._v.copy(k.velocity).addScaledVector(this.up, -k.velocity.dot(this.up));
    if (planar.lengthSq() > 1) {
      planar.normalize();
      aligned = clamp01(planar.dot(this.fwd));
      if (aligned < A.landAlignGood) {
        const pen = A.landPenaltyMax * (1 - aligned / A.landAlignGood);
        k.velocity.multiplyScalar(1 - pen);
      }
    }

    // pitch/roll kick so the landing has weight
    this.pitchVel += clamp(impact, 0, 14) * 0.16;

    if (this.trick.done) {
      this.trick.done = false;
      k.air.trickDone = false;
      if (aligned > 0.6) {
        k.giveBoost(A.trickBoostTime, A.trickBoostPower, 'trick');
        ctx.events.emit('kart:boost', {
          kart: k, source: 'trick', tier: 0,
          duration: A.trickBoostTime, power: A.trickBoostPower,
        });
      }
    }

    this.airPitch = 0;
    this.launchUp = 0;
    ctx.events.emit('kart:land', {
      kart: k, impact, hard: impact >= A.landHardImpact,
      strength: clamp01(impact / A.landHardImpact),
      speed: k.speed, aligned, surface: k.surface,
    });
  }

  // ==========================================================================
  //  collisions (called after every kart has integrated)
  // ==========================================================================

  resolveWorld(dt, ctx) {
    const k = this.k;
    if (k.frozen) return;
    const C = TUNING.collide;
    const R = TUNING.chassis.radius;

    // ---- walls -------------------------------------------------------------
    let hit = null;
    try { hit = ctx.world.collideWall?.(k.position, R) ?? null; } catch { hit = null; }
    if (hit && hit.normal && hit.depth > 0) {
      const n = this._v.copy(hit.normal);
      if (n.lengthSq() < 1e-6) n.set(0, 1, 0);
      n.normalize();
      k.position.addScaledVector(n, hit.depth * C.wallPush);

      const vn = k.velocity.dot(n);
      if (vn < 0) {
        const speed = k.velocity.length();
        const cosAng = speed > 0.01 ? Math.abs(vn) / speed : 0;
        const graze = cosAng < C.wallGrazeCos;

        // tangential component
        this._v2.copy(k.velocity).addScaledVector(n, -vn);
        if (graze) {
          this._v2.multiplyScalar(1 - C.wallGrazeFriction);
          k.velocity.copy(this._v2).addScaledVector(n, -vn * 0.15);
        } else {
          this._v2.multiplyScalar(1 - C.wallSpeedLoss);
          k.velocity.copy(this._v2).addScaledVector(n, -vn * C.wallRestitution);
          if (k.drift.active) this.releaseDrift(ctx, false);
        }
        if (Math.abs(vn) > C.wallEventSpeed) {
          ctx.events.emit('kart:wall', {
            kart: k, normal: n.clone(), speed: Math.abs(vn), graze,
            strength: clamp01(Math.abs(vn) / 14),
          });
        }
      }
    }

    // ---- do not sink through the ground -----------------------------------
    if (this.deepest > 0.001) {
      k.position.addScaledVector(this.up, Math.min(this.deepest, 0.5));
      const vu = k.velocity.dot(this.up);
      if (vu < 0) k.velocity.addScaledVector(this.up, -vu);
    }
  }

  finalize(dt, ctx) {
    const k = this.k;
    this.makeBasis();
    this.leanStep(dt);
    this.buildQuaternion();
    this.refreshWheels(ctx, false);

    const vFwd = k.velocity.dot(this.fwd);
    const vLat = k.velocity.dot(this.right);
    k.forwardSpeed = vFwd;
    k.speed = Math.hypot(vFwd, vLat);
    k.slipAngle = this.slip ?? 0;
    k.up.copy(this.up);
    k.groundNormal.copy(this.wheels[0].normal);
    k.airborne = !k.onGround;
    k.rumble = this.rumble;
  }

  /** Re-place the wheel anchors/hubs after the quaternion changed. */
  refreshWheels(ctx, full) {
    const k = this.k;
    const S = TUNING.suspension;
    for (const w of this.wheels) {
      w.anchor.copy(w.local).applyQuaternion(k.quaternion).add(k.position);
      w.pos.copy(w.anchor).addScaledVector(this.up, -Math.min(w.len, S.restLength));
      w.contact.copy(w.pos).addScaledVector(this.up, -S.wheelRadius);
    }
  }

  // ==========================================================================
  //  external API used by items / AI / race director
  // ==========================================================================

  applyImpulse(v) {
    const k = this.k;
    const wm = 1 / Math.max(0.4, k.stats.weight ?? 1);
    k.velocity.addScaledVector(v, wm);
    if (v.length() * wm > TUNING.collide.chargeCancelImpulse && k.drift.active) {
      this.releaseDrift(this.ctx, false);
    }
  }

  spinOut(dur = 1.1) {
    const k = this.k;
    if (this.spin.t > dur) return;
    this.spin.t = dur; this.spin.dur = dur;
    this.spin.dir = k.drift.active ? -k.drift.dir : (k.steerInput >= 0 ? 1 : -1);
    if (this.spin.dir === 0) this.spin.dir = 1;
    k.spinning = true;
    k.boost.timer = 0; k.boost.power = 1; k.boost.source = null;
    this.releaseDrift(this.ctx, false);
    this.ctx.events.emit('kart:spinout', { kart: k, duration: dur });
  }

  squashKart(dur = 1.6) {
    const k = this.k;
    this.squash.t = Math.max(this.squash.t, dur);
    this.squash.dur = dur;
    k.squashed = true;
    k.squashAmount = 1;
    k.boost.timer = 0; k.boost.power = 1;
    this.releaseDrift(this.ctx, false);
    this.ctx.events.emit('kart:squash', { kart: k, duration: dur });
  }
}

const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);
const AXIS_Z = new THREE.Vector3(0, 0, 1);

const _gnormal = new THREE.Vector3(0, 1, 0);
const _gresult = { y: 0, normal: _gnormal, surface: 'road', onTrack: true, banking: 0 };

/**
 * Defensive wrapper around `world.sampleGround`. The world system is being
 * rewritten under us, so treat every field as optional.
 */
export function sampleGround(ctx, x, z) {
  const w = ctx.world;
  let g = null;
  if (w && w.sampleGround) {
    try { g = w.sampleGround(x, z); } catch { g = null; }
  }
  if (!g) { _gresult.y = 0; _gnormal.set(0, 1, 0); _gresult.surface = 'road'; _gresult.onTrack = true; _gresult.banking = 0; return _gresult; }
  _gresult.y = Number.isFinite(g.y) ? g.y : 0;
  const n = g.normal;
  if (n && Number.isFinite(n.x + n.y + n.z) && (n.x * n.x + n.y * n.y + n.z * n.z) > 1e-6) {
    _gnormal.set(n.x, n.y, n.z).normalize();
    if (_gnormal.y < 0) _gnormal.multiplyScalar(-1);
  } else _gnormal.set(0, 1, 0);
  _gresult.normal = _gnormal;
  _gresult.surface = typeof g.surface === 'string' ? g.surface : 'road';
  _gresult.onTrack = g.onTrack !== false;
  _gresult.banking = Number.isFinite(g.banking) ? g.banking : 0;
  return _gresult;
}

/** Front axle counts double so entering the grass is felt before it bites. */
function pickSurface(wheels) {
  const score = Object.create(null);
  let best = 'road', bestN = -1;
  for (const w of wheels) {
    if (!w.grounded) continue;
    const s = w.surface || 'road';
    const add = w.front ? 2 : 1;
    score[s] = (score[s] ?? 0) + add;
    if (score[s] > bestN) { bestN = score[s]; best = s; }
  }
  if (bestN < 0) return wheels[0].surface || 'road';
  // a boost pad under any wheel always wins
  for (const w of wheels) if (w.grounded && w.surface === 'boost') return 'boost';
  return best;
}
