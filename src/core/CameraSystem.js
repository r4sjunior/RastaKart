import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const damp = (cur, want, lambda, dt) => cur + (want - cur) * (1 - Math.exp(-lambda * dt));

/**
 * Chase camera.
 *
 * Most of what makes a kart racer *feel* fast happens here rather than in the
 * physics: the field of view opening with speed, the rig easing back under
 * acceleration, the camera turning into a drift a beat before the kart does,
 * and impacts kicking the frame. Each of those is a separate, independently
 * tunable term below, summed into one pose per frame.
 *
 * The named poses at the bottom exist so the screenshot harness frames the same
 * shot every run — visual regressions are diffed against them.
 */
const TUNE = {
  distance: 6.4,          // metres behind the kart at rest
  distanceSpeed: 1.6,     // extra distance at top speed
  distanceBoost: 1.1,     // extra distance while boosting
  height: 2.55,
  heightSpeed: 0.25,
  lookAhead: 8.0,         // metres ahead of the kart the camera aims at
  lookAheadSpeed: 4.0,
  lookHeight: 1.05,

  posLambda: 8.5,         // positional follow stiffness
  lookLambda: 11.0,
  yawLambda: 6.0,         // how fast the rig swings back behind the kart

  fovBase: 60,
  fovSpeed: 9,            // added at top speed
  fovBoost: 14,           // added while boosting
  fovLambda: 5.5,

  driftYaw: 0.28,         // radians the rig leads into a drift
  driftRoll: 0.055,
  steerRoll: 0.016,
  rollLambda: 7.0,

  groundClear: 1.05,      // never let the camera sink into the track
  shakeDecay: 7.5,
  shakeAmp: 0.028,        // rad of rotation per unit^2 of shake intensity
  shakeMax: 1.15,
};

export class CameraSystem {
  name = 'camera'; order = 60;

  #pos = new THREE.Vector3();
  #look = new THREE.Vector3();
  #yaw = 0;
  #fov = TUNE.fovBase;
  #roll = 0;
  #shake = 0;
  #shakeSeed = 0;
  #override = null;
  #intro = null;

  #a = new THREE.Vector3();
  #b = new THREE.Vector3();
  #c = new THREE.Vector3();
  #e = new THREE.Euler(0, 0, 0, 'YXZ');

  async init(ctx) {
    this.ctx = ctx;
    this.tune = { ...TUNE };

    const p = ctx.player;
    if (p) {
      this.#yaw = this.#kartYaw(p);
      this.#place(p, 0);
      this.#look.copy(p.position);
    }
    ctx.camera.fov = this.#fov;
    ctx.camera.near = 0.25;
    ctx.camera.far = 4000;
    ctx.camera.updateProjectionMatrix();

    ctx.events.on('kart:hit', (e) => { if (this.#isPlayer(e)) this.kick(0.55); });
    ctx.events.on('kart:wall', (e) => {
      if (this.#isPlayer(e)) this.kick((e?.graze ? 0.10 : 0.30) * clamp(e?.strength ?? 1, 0.3, 1));
    });
    ctx.events.on('kart:land', (e) => {
      // A drift hop barely lifts the kart (~3 m/s) and lands well under
      // `landHardImpact`; only a real fall should kick the camera, or every
      // mini-turbo hop during normal driving reads as constant screen shake.
      if (this.#isPlayer(e) && e?.hard) this.kick(clamp((e?.impact ?? 1) * 0.05, 0, 0.5));
    });
    ctx.events.on('race:start', () => { this.#intro = null; });
    ctx.events.on('race:countdown', (e) => { if (e?.n === 0) this.#intro = null; });

    // Grid intro: a slow push-in during the countdown, cut to gameplay on GO!
    if (ctx.race?.state === 'countdown') {
      this.#intro = { t: 0, dur: Math.max(0.1, ctx.race.countdown) };
    }

    ctx.cameraApi = {
      kick: (i) => this.kick(i),
      pose: (n, o) => this.pose(n, o),
      clearPose: () => this.clearPose(),
      tune: this.tune,
    };
  }

  #isPlayer(e) { return e?.kart ? !!e.kart.isPlayer : false; }

  kick(intensity = 0.5) { this.#shake = Math.min(this.tune.shakeMax, this.#shake + intensity); }

  #kartYaw(k) { return this.#e.setFromQuaternion(k.quaternion, 'YXZ').y; }

  #place(p, extra) {
    const d = this.tune.distance + extra;
    this.#pos.set(
      p.position.x - Math.sin(this.#yaw) * d,
      p.position.y + this.tune.height,
      p.position.z - Math.cos(this.#yaw) * d,
    );
  }

  lateUpdate(dt, ctx) {
    if (this.#override) { this.#applyOverride(ctx); return; }
    const p = ctx.player;
    if (!p) return;
    const T = this.tune;

    const topSpeed = Math.max(1, p.stats?.topSpeed ?? 26);
    const speedN = clamp(p.speed / topSpeed, 0, 1.6);
    const boosting = (p.boost?.timer ?? 0) > 0;
    const drifting = p.drift?.active ? p.drift.dir : 0;

    // --- rig yaw: trails the kart, and leads into a drift -----------------
    const kartYaw = this.#kartYaw(p);
    const wantYaw = kartYaw + drifting * T.driftYaw;
    // shortest-arc, so the rig never swings the long way round
    let dYaw = (wantYaw - this.#yaw) % (Math.PI * 2);
    if (dYaw > Math.PI) dYaw -= Math.PI * 2;
    if (dYaw < -Math.PI) dYaw += Math.PI * 2;
    this.#yaw += dYaw * (1 - Math.exp(-T.yawLambda * dt));

    // --- target position --------------------------------------------------
    const dist = T.distance + speedN * T.distanceSpeed + (boosting ? T.distanceBoost : 0);
    const height = T.height + speedN * T.heightSpeed;
    const want = this.#a.set(
      p.position.x - Math.sin(this.#yaw) * dist,
      p.position.y + height,
      p.position.z - Math.cos(this.#yaw) * dist,
    );

    const g = ctx.world?.sampleGround?.(want.x, want.z);
    if (g && Number.isFinite(g.y)) want.y = Math.max(want.y, g.y + T.groundClear);

    this.#pos.lerp(want, 1 - Math.exp(-T.posLambda * dt));

    // --- aim point --------------------------------------------------------
    const fwd = this.#b.set(0, 0, 1).applyQuaternion(p.quaternion);
    const ahead = T.lookAhead + speedN * T.lookAheadSpeed;
    const lookWant = this.#c.copy(p.position).addScaledVector(fwd, ahead);
    lookWant.y += T.lookHeight;
    this.#look.lerp(lookWant, 1 - Math.exp(-T.lookLambda * dt));

    // --- compose ----------------------------------------------------------
    const cam = ctx.camera;
    cam.position.copy(this.#pos);
    cam.up.copy(UP);
    cam.lookAt(this.#look);

    const wantRoll = drifting * T.driftRoll + (p.steerAngle ?? 0) * T.steerRoll;
    this.#roll = damp(this.#roll, wantRoll, T.rollLambda, dt);
    cam.rotateZ(this.#roll);

    if (this.#shake > 0.001) {
      this.#shakeSeed += dt * 47;
      const s = this.#shake * this.#shake * T.shakeAmp;
      cam.rotateX(Math.sin(this.#shakeSeed * 2.7) * s);
      cam.rotateY(Math.sin(this.#shakeSeed * 3.9 + 1.3) * s);
      cam.rotateZ(Math.sin(this.#shakeSeed * 5.1 + 2.1) * s * 0.6);
      // Plain exponential decay, independent of how it was triggered — a decay
      // rate that scaled with the *current* shake value let repeated small
      // kicks (e.g. a sustained wall graze) stall near the ceiling instead of
      // settling, which is what read as a constant tremor.
      this.#shake *= Math.exp(-T.shakeDecay * dt);
      if (this.#shake < 0.002) this.#shake = 0;
    }

    const wantFov = T.fovBase + speedN * T.fovSpeed + (boosting ? T.fovBoost : 0);
    this.#fov = damp(this.#fov, wantFov, T.fovLambda, dt);
    if (Math.abs(cam.fov - this.#fov) > 0.02) {
      cam.fov = this.#fov;
      cam.updateProjectionMatrix();
    }

    // Let the render pipeline drive motion blur / speed lines from one number.
    ctx.render?.setSpeedFactor?.(clamp(speedN + (boosting ? 0.45 : 0), 0, 1));

    // Countdown push-in, layered over everything above.
    if (this.#intro) {
      this.#intro.t += dt;
      const k = clamp(this.#intro.t / this.#intro.dur, 0, 1);
      const ease = 1 - Math.pow(1 - k, 3);
      const back = 9 * (1 - ease);
      cam.position.x -= Math.sin(this.#yaw) * back;
      cam.position.z -= Math.cos(this.#yaw) * back;
      cam.position.y += 3.4 * (1 - ease);
      cam.lookAt(this.#look);
      if (k >= 1) this.#intro = null;
    }
  }

  #applyOverride(ctx) {
    const o = this.#override;
    ctx.camera.position.copy(o.position);
    ctx.camera.up.copy(UP);
    ctx.camera.lookAt(o.target);
    if (ctx.camera.fov !== o.fov) {
      ctx.camera.fov = o.fov;
      ctx.camera.updateProjectionMatrix();
    }
  }

  /**
   * Named verification poses. `chase` releases the override and hands control
   * back to the live rig; every other pose pins the camera deterministically.
   */
  pose(name, opts = {}) {
    const ctx = this.ctx;
    const p = ctx.player;
    const at = opts.at
      ? new THREE.Vector3().fromArray(opts.at)
      : (p ? p.position.clone() : new THREE.Vector3());
    const yaw = p ? this.#kartYaw(p) : 0;
    const dir = (x, y, z) => new THREE.Vector3(x, y, z).applyAxisAngle(UP, yaw);

    let position, target, fov = 55;
    switch (name) {
      case 'chase':
        this.#override = null;
        this.lateUpdate(1 / 60, ctx);
        return { pose: 'chase', live: true };
      case 'hero':
        position = at.clone().add(dir(4.0, 2.0, -4.8));
        target = at.clone().add(dir(0, 0.8, 0.3)); fov = 42; break;
      case 'front':
        position = at.clone().add(dir(0.5, 1.45, 5.4));
        target = at.clone().add(dir(0, 0.95, 0)); fov = 38; break;
      case 'wheel':
        position = at.clone().add(dir(1.85, 0.8, 1.75));
        target = at.clone().add(dir(0.65, 0.4, 0.85)); fov = 34; break;
      case 'overhead':
        position = at.clone().add(new THREE.Vector3(0, 240, 0.01));
        target = at.clone(); fov = 60; break;
      case 'vista':
        position = at.clone().add(dir(-13, 7.0, -21));
        target = at.clone().add(dir(0, 1.5, 26)); fov = 50; break;
      case 'horizon':
        position = at.clone().add(new THREE.Vector3(0, 5.5, 0));
        target = at.clone().add(dir(0, 9, 60)); fov = 70; break;
      case 'grid':
        position = at.clone().add(dir(0, 8.5, -17));
        target = at.clone().add(dir(0, 0.6, 7)); fov = 46; break;
      // road-level shot: exposes ground texture detail and the contact shadow
      case 'lowchase':
        position = at.clone().add(dir(0, 0.75, -5.2));
        target = at.clone().add(dir(0, 0.9, 14)); fov = 58; break;
      default: return null;
    }
    if (opts.fov) fov = opts.fov;
    this.#override = { position, target, fov };
    this.#applyOverride(ctx);
    return { pose: name, position: position.toArray(), target: target.toArray(), fov };
  }

  clearPose() { this.#override = null; }
  dispose() { }
}
