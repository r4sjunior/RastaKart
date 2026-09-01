/**
 * ============================================================================
 *  RACING LINE — offline pre-computation for the CPU drivers
 * ============================================================================
 *
 *  Everything in this file runs exactly once, inside AISystem.init(). At race
 *  time the drivers only ever index the flat typed arrays it produces, so the
 *  per-kart cost of a physics step stays O(1) with no allocation.
 *
 *  What gets baked:
 *
 *   1. A CORRIDOR — for every 1.5 m station along the track, the lateral band
 *      the kart may legally use (road + half the kerb, minus its own width).
 *
 *   2. A LINE — a closed path inside that corridor found by constrained
 *      Laplacian relaxation. Relaxing "move me to the midpoint of my
 *      neighbours, then clamp me back into the corridor" converges on the
 *      shortest closed path through the corridor, which is the classical
 *      geometric racing line: wide in, apex on the kerb, wide out. A wide
 *      (+/-3 station, ~9 m) stencil is used so the line is smooth enough to
 *      differentiate for curvature instead of being a polyline of kinks.
 *
 *   3. A LATE-APEX BIAS — the pure geometric line apexes too early to get a
 *      good exit. Blending the profile with a copy of itself delayed by
 *      `apexDelay` metres moves the apex down the road without narrowing the
 *      entry, which is what a real driver does.
 *
 *   4. CURVATURE of that line, signed: positive = the line turns left.
 *
 *   5. DRIFT ZONES — contiguous runs of same-sign, tight-enough curvature that
 *      are long enough for the mini-turbo counter to actually reach a tier.
 *
 *   6. Per-kart SPEED PROFILES: a cornering limit from curvature, grip and the
 *      speed-sensitive yaw-rate ceiling, then a backwards pass that drags each
 *      station's target down until it is reachable from the one behind it
 *      under braking. That backwards pass IS the "brake before the corner"
 *      behaviour: by the time the driver merely follows the profile, it is
 *      already off the throttle at the right place.
 *
 *  Sign conventions (checked against KartBody):
 *      fwd = (sin(yaw), 0, cos(yaw)), right = up x fwd, yaw grows to the right.
 *      => positive steer / positive yaw rate = turning RIGHT.
 *      Ribbon curvature is positive when the track turns LEFT.
 *      => yawRight_required = -curvature * speed.
 */

import * as THREE from 'three';

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;

/** Physical constants mirrored from src/physics/tuning.js. Kept as a local
 *  copy on purpose: the AI must not import the physics folder, and a small
 *  model error here is absorbed by the closed-loop controllers anyway. */
export const PHYS = {
  kerbWidth: 1.15,        // TUNING — painted kerb, still counts as 'road'
  maxLatAccel: 26,        // grip.maxLatAccel
  driftLatAccel: 15.5,    // grip.driftMaxLatAccel
  brakeDecel: 21,         // drive.brakeDecel
  coastDecel: 6.5,        // drive.coastDecel
  yawLowDeg: 118,         // steer.yawRateLowDeg
  yawHighDeg: 62,         // steer.yawRateHighDeg
  handlingRef: 2.6,
  driftYawMin: 0.55,      // drift.yawMulMin
  driftYawMax: 1.55,      // drift.yawMulMax
  driftEngageSteer: 0.12,
  driftMinSpeed: 6.0,
  chargeFast: 300,        // units/s at full lock
  chargeSlow: 120,
  chargeFastSteer: 0.55,
  miniTurboRef: 4.25,
  tierThresholds: [240, 510, 780],
  boostPower: [1.22, 1.33, 1.45],
  kartHalfWidth: 1.05,    // chassis.radius
};

/** Peak yaw rate (rad/s, positive = right) the kart can produce at `v`. */
export function maxYawRate(v, topSpeed, handling) {
  const hm = handling / PHYS.handlingRef;
  const sn = clamp01(v / Math.max(1, topSpeed));
  let deg = lerp(PHYS.yawLowDeg, PHYS.yawHighDeg, sn);
  if (v > topSpeed) {
    const over = clamp01((v - topSpeed) / (topSpeed * 0.6));
    deg = lerp(deg, 50, over);
  }
  return deg * DEG * hm;
}

/**
 * Largest speed at which a kart of this handling can still yaw fast enough to
 * follow curvature `k`. maxYaw(v) falls off linearly in v, the requirement
 * grows linearly in v, so the crossing point has a closed form.
 */
function yawLimitedSpeed(k, topSpeed, handling, yawMul) {
  const kk = Math.abs(k);
  if (kk < 1e-5) return Infinity;
  const hm = (handling / PHYS.handlingRef) * yawMul;
  const A = PHYS.yawLowDeg * DEG * hm;
  const B = (PHYS.yawLowDeg - PHYS.yawHighDeg) * DEG * hm / Math.max(1, topSpeed);
  return A / (kk + B);
}

export class RacingLine {
  /**
   * @param {object} world  ctx.world (WorldAPI)
   * @param {object} [opt]
   */
  constructor(world, opt = {}) {
    const length = world.trackLength;
    const ds = opt.stationStep ?? 1.5;
    const N = Math.max(256, Math.round(length / ds));

    this.N = N;
    this.length = length;
    this.ds = length / N;

    // ---- station data straight off the ribbon ---------------------------
    const cx = new Float32Array(N), cy = new Float32Array(N), cz = new Float32Array(N);
    const rx = new Float32Array(N), ry = new Float32Array(N), rz = new Float32Array(N);
    const tx = new Float32Array(N), tz = new Float32Array(N);
    const width = new Float32Array(N);
    const bank = new Float32Array(N);
    const ckap = new Float32Array(N);

    const s = { pos: new THREE.Vector3(), tangent: new THREE.Vector3(), normal: new THREE.Vector3(),
      right: new THREE.Vector3(), width: 0, banking: 0, wallL: 0, wallR: 0, shoulder: 0,
      curvature: 0, distAlong: 0 };
    // `sampleSpline` hands back a shared scratch object; go through the raw
    // ribbon with our own output record when it is exposed, and copy field by
    // field otherwise. Either way nothing is retained across the loop.
    const rb = world.ribbon;
    const sampleInto = rb?.sample
      ? (u) => rb.sample(u, s)
      : (u) => { const r = world.sampleSpline(u); s.pos.copy(r.pos); s.right.copy(r.right);
        s.tangent.copy(r.tangent); s.normal.copy(r.normal); s.width = r.width;
        s.banking = r.banking ?? 0; s.shoulder = r.shoulder ?? 2;
        s.curvature = r.curvature ?? 0; return s; };

    for (let i = 0; i < N; i++) {
      sampleInto(i / N);
      cx[i] = s.pos.x; cy[i] = s.pos.y; cz[i] = s.pos.z;
      rx[i] = s.right.x; ry[i] = s.right.y; rz[i] = s.right.z;
      const tl = Math.hypot(s.tangent.x, s.tangent.z) || 1;
      tx[i] = s.tangent.x / tl; tz[i] = s.tangent.z / tl;
      width[i] = s.width;
      bank[i] = s.banking ?? 0;
      ckap[i] = s.curvature ?? 0;
    }

    // ---- usable corridor -------------------------------------------------
    // The kerb is still 'road' in sampleGround, so half of it is fair game;
    // beyond that is dirt shoulder, which costs 22 % of top speed.
    const margin = opt.edgeMargin ?? 0.55;
    const half = new Float32Array(N);      // half road width (tarmac only)
    const limit = new Float32Array(N);     // |lateral| the line may reach
    for (let i = 0; i < N; i++) {
      half[i] = width[i] * 0.5;
      const usable = half[i] + PHYS.kerbWidth * 0.55 - PHYS.kartHalfWidth - margin;
      limit[i] = Math.max(0.6, usable);
    }

    Object.assign(this, { cx, cy, cz, rx, ry, rz, tx, tz, width, bank, ckap, half, limit });

    // ---- relax the line --------------------------------------------------
    this.lat = this.#relax(opt);
    this.#applyApexDelay(opt.apexDelay ?? 9.0);
    this.#bakeLine();
    this.#bakeCurvature(opt);
    this.driftZones = this.#findDriftZones(opt);
    this.#tagZones();
  }

  // ------------------------------------------------------------------ index
  /** Station index for a normalised spline parameter. */
  indexAt(u) {
    const n = this.N;
    let i = Math.floor((u - Math.floor(u)) * n);
    if (i < 0) i = 0; else if (i >= n) i = n - 1;
    return i;
  }
  /** Station index `metres` further down the road. */
  advance(i, metres) {
    const n = this.N;
    let j = (i + Math.round(metres / this.ds)) % n;
    if (j < 0) j += n;
    return j;
  }

  // ------------------------------------------------------- line relaxation
  /**
   * Constrained Laplacian relaxation. Each station is free to slide along its
   * own lateral axis only; the target is the point on that axis nearest the
   * chord between the stations `stencil` steps away. Clamping to the corridor
   * after every sweep is what turns "smooth me out" into "take the shortest
   * way round", i.e. an apexing racing line rather than the centreline.
   */
  #relax(opt) {
    const { N, cx, cz, rx, rz, limit } = this;
    const iters = opt.relaxIters ?? 900;
    const stencil = opt.relaxStencil ?? 3;
    const w = opt.relaxRate ?? 0.35;
    const lat = new Float32Array(N);

    for (let it = 0; it < iters; it++) {
      // even/odd sweeps: a red-black order converges without a second buffer
      for (let phase = 0; phase < 2; phase++) {
        for (let i = phase; i < N; i += 2) {
          const a = (i - stencil + N) % N, b = (i + stencil) % N;
          const ax = cx[a] + rx[a] * lat[a], az = cz[a] + rz[a] * lat[a];
          const bx = cx[b] + rx[b] * lat[b], bz = cz[b] + rz[b] * lat[b];
          const mx = (ax + bx) * 0.5, mz = (az + bz) * 0.5;
          // project the midpoint onto this station's lateral axis
          const rl = Math.hypot(rx[i], rz[i]) || 1;
          const target = ((mx - cx[i]) * rx[i] + (mz - cz[i]) * rz[i]) / rl;
          const v = lat[i] + (target - lat[i]) * w;
          lat[i] = clamp(v, -limit[i], limit[i]);
        }
      }
    }
    return lat;
  }

  /**
   * Delay the lateral profile so the apex lands later in the corner. Blending
   * with the delayed copy (rather than replacing) keeps the entry wide: the
   * result is wide-in / late-apex / wide-out instead of wide-in / early-apex.
   */
  #applyApexDelay(metres) {
    if (metres <= 0) return;
    const { N, lat, limit } = this;
    const shift = Math.round(metres / this.ds);
    const out = new Float32Array(N);
    const mix = 0.42;
    for (let i = 0; i < N; i++) {
      const j = (i - shift + N * 2) % N;
      out[i] = clamp(lat[i] * (1 - mix) + lat[j] * mix, -limit[i], limit[i]);
    }
    // one light smoothing pass so the blend cannot introduce a kink
    for (let i = 0; i < N; i++) {
      const a = (i - 1 + N) % N, b = (i + 1) % N;
      lat[i] = out[a] * 0.25 + out[i] * 0.5 + out[b] * 0.25;
    }
  }

  /** World-space line points + per-station arc length along the line. */
  #bakeLine() {
    const { N, cx, cy, cz, rx, ry, rz, lat } = this;
    const px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      px[i] = cx[i] + rx[i] * lat[i];
      py[i] = cy[i] + ry[i] * lat[i];
      pz[i] = cz[i] + rz[i] * lat[i];
    }
    Object.assign(this, { px, py, pz });
  }

  /** Signed curvature of the line (positive = turns left), lightly blurred. */
  #bakeCurvature(opt) {
    const { N, px, pz } = this;
    const st = opt.kappaStencil ?? 4;
    const raw = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = (i - st + N) % N, b = (i + st) % N;
      let ax = px[i] - px[a], az = pz[i] - pz[a];
      let bx = px[b] - px[i], bz = pz[b] - pz[i];
      const la = Math.hypot(ax, az) || 1, lb = Math.hypot(bx, bz) || 1;
      ax /= la; az /= la; bx /= lb; bz /= lb;
      const cross = ax * bz - az * bx;
      const dot = clamp(ax * bx + az * bz, -1, 1);
      raw[i] = Math.atan2(cross, dot) / (la + lb);
    }
    this.kap = blurWrap(raw, opt.kappaBlur ?? 5);
  }

  // --------------------------------------------------------- drift zones
  /**
   * A drift is only worth it where the corner is tight enough that the forced
   * yaw rate of a slide is useful rather than a liability, and long enough
   * that the counter reaches at least tier 1 before the exit. Anything else
   * and the CPU would be trading real cornering grip (26 m/s^2) for drift grip
   * (15.5 m/s^2) and getting no mini-turbo back.
   */
  #findDriftZones(opt) {
    const { N, kap } = this;
    const kMin = 1 / (opt.driftMaxRadius ?? 58);     // tight enough to slide
    const kExit = 1 / (opt.driftExitRadius ?? 110);  // still committed
    const zones = [];

    const inZone = new Int8Array(N);
    for (let i = 0; i < N; i++) inZone[i] = Math.abs(kap[i]) >= kMin ? Math.sign(kap[i]) : 0;

    // grow each seed run outwards while the sign holds and the corner has not
    // opened up completely — that is the entry and the exit of the corner.
    const used = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      if (!inZone[i] || used[i]) continue;
      const dir = inZone[i];
      let a = i, b = i;
      let guard = 0;
      while (guard++ < N) {
        const p = (a - 1 + N) % N;
        if (Math.sign(kap[p]) === dir && Math.abs(kap[p]) >= kExit) a = p; else break;
      }
      guard = 0;
      while (guard++ < N) {
        const q = (b + 1) % N;
        if (Math.sign(kap[q]) === dir && Math.abs(kap[q]) >= kExit) b = q; else break;
      }
      let len = (b - a + N) % N + 1;
      for (let k = 0; k < len; k++) used[(a + k) % N] = 1;
      zones.push({ i0: a, i1: b, dir, len: len * this.ds });
    }

    // merge neighbours of the same hand separated by a short straight
    const gapMax = opt.driftMergeGap ?? 14;
    zones.sort((p, q) => p.i0 - q.i0);
    const merged = [];
    for (const z of zones) {
      const prev = merged[merged.length - 1];
      if (prev && prev.dir === z.dir) {
        const gap = ((z.i0 - prev.i1 + N) % N) * this.ds;
        if (gap <= gapMax) {
          prev.i1 = z.i1;
          prev.len = (((prev.i1 - prev.i0 + N) % N) + 1) * this.ds;
          continue;
        }
      }
      merged.push({ ...z });
    }
    // drop anything too short to charge even a blue spark at corner speed
    return merged.filter((z) => z.len >= (opt.driftMinLength ?? 26));
  }

  /** zoneOf[i] = index into driftZones, or -1. */
  #tagZones() {
    const { N } = this;
    const zoneOf = new Int16Array(N).fill(-1);
    this.driftZones.forEach((z, id) => {
      const n = ((z.i1 - z.i0 + N) % N) + 1;
      for (let k = 0; k < n; k++) zoneOf[(z.i0 + k) % N] = id;
    });
    this.zoneOf = zoneOf;
  }

  // -------------------------------------------------------- speed profile
  /**
   * Target speed at every station for one kart.
   *
   * cornering limit  = min( grip limit sqrt(a_lat R), yaw-rate limit )
   * then a backwards relaxation drags each station down to what is reachable
   * from its successor under braking:  v[i] <= sqrt(v[i+1]^2 + 2 a_b ds).
   *
   * `a_b` is deliberately below the real 21 m/s^2 brake so the CPU is off the
   * throttle before it is on the brakes, which is what stops the "brakes at
   * the apex" look. `lookahead` extra metres of margin are folded in the same
   * way for the less skilled drivers.
   *
   * The ceiling is topSpeed * 1.45 (the strongest mini-turbo), NOT topSpeed:
   * the profile must only ever be a *corner* limiter, otherwise a driver on a
   * purple boost would brake on the straight to obey its own plan.
   */
  speedProfile(kart, cfg) {
    const { N, kap, bank, ds, zoneOf } = this;
    const st = kart.stats;
    const top = st.topSpeed;
    const grip = st.grip ?? 1;
    const v = new Float32Array(N);
    const ceiling = top * (cfg.speedCeiling ?? 1.45);

    for (let i = 0; i < N; i++) {
      const k = Math.abs(kap[i]);
      // banking adds a component of gravity to the cornering budget
      const bankBonus = Math.abs(Math.tan(bank[i])) * 9.81 * 0.8;
      const drifting = zoneOf[i] >= 0;
      const base = drifting
        ? lerp(PHYS.driftLatAccel, PHYS.maxLatAccel, cfg.driftGripBlend ?? 0.45)
        : PHYS.maxLatAccel;
      const aLat = (base * grip + bankBonus) * cfg.cornerSafety;
      const vGrip = k > 1e-5 ? Math.sqrt(aLat / k) : Infinity;
      const vYaw = yawLimitedSpeed(k, top, st.handling,
        drifting ? PHYS.driftYawMax * 0.92 : 1) * (cfg.yawSafety ?? 0.98);
      v[i] = Math.min(ceiling, vGrip, vYaw);
    }

    // backwards braking pass; two laps of it so the wrap converges
    const aB = PHYS.brakeDecel * (cfg.brakeUse ?? 0.55);
    for (let pass = 0; pass < 2; pass++) {
      for (let n = N - 1; n >= 0; n--) {
        const i = n, j = (i + 1) % N;
        const reach = Math.sqrt(v[j] * v[j] + 2 * aB * ds);
        if (v[i] > reach) v[i] = reach;
      }
    }
    return v;
  }

  // ------------------------------------------------------------- accessors
  /** Copy the line point at station i into `out`. */
  point(i, out) { return out.set(this.px[i], this.py[i], this.pz[i]); }
}

function blurWrap(arr, rad) {
  const N = arr.length, out = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let s = 0, w = 0;
    for (let k = -rad; k <= rad; k++) {
      const g = 1 - Math.abs(k) / (rad + 1);
      s += arr[(i + k + N * 4) % N] * g; w += g;
    }
    out[i] = s / w;
  }
  return out;
}

export { clamp, clamp01, lerp, DEG, TAU };
