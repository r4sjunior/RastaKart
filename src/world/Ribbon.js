import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smoothstep = (a, b, x) => {
  if (a === b) return x < a ? 0 : 1;
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * A "ribbon" is a closed (or open) 3D spline baked into a uniformly
 * arc-length-sampled lookup table, with per-sample width, banking, wall offsets
 * and a *constant time* nearest-point query.
 *
 * The stub used to do a 256-sample linear scan for every projection. This class
 * bakes a coarse seed grid over the world so `project()` starts from an index
 * that is already within a couple of samples of the answer and finishes with a
 * short local hill-climb + exact segment projection. Cost is a handful of
 * distance tests, independent of track length.
 */
export class Ribbon {
  /**
   * @param {object} o
   * @param {number[][]} o.points      control points [x,y,z]
   * @param {boolean}    o.closed
   * @param {number}     o.sampleStep  target metres between LUT samples
   * @param {Array}      o.width       keyframes [cpIndexFloat, metres]
   * @param {Array}      o.wall        keyframes [cpIndexFloat, wallHalfWidth|0 for none]
   * @param {number}     o.bankGain    curvature -> bank radians multiplier
   * @param {number}     o.maxBank     radians
   * @param {Array}      o.bumps       [{cp0, cp1, height, kind}] additive elevation
   */
  constructor(o) {
    this.closed = o.closed !== false;
    this.cpVecs = o.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    this.curve = new THREE.CatmullRomCurve3(this.cpVecs, this.closed, 'centripetal', 0.5);
    this.curve.arcLengthDivisions = 4000;
    this.length = this.curve.getLength();

    const step = o.sampleStep ?? 1.6;
    const N = Math.max(128, Math.round(this.length / step));
    this.N = N;
    this.ds = this.length / N;

    // ---- bake positions + tangents ------------------------------------
    const px = new Float32Array(N + 1), py = new Float32Array(N + 1), pz = new Float32Array(N + 1);
    const tx = new Float32Array(N + 1), ty = new Float32Array(N + 1), tz = new Float32Array(N + 1);
    const tmp = new THREE.Vector3();
    for (let i = 0; i <= N; i++) {
      const u = this.closed ? (i % N) / N : i / N;
      this.curve.getPointAt(u, tmp);
      px[i] = tmp.x; py[i] = tmp.y; pz[i] = tmp.z;
      this.curve.getTangentAt(u, tmp).normalize();
      tx[i] = tmp.x; ty[i] = tmp.y; tz[i] = tmp.z;
    }

    // ---- control point -> u -------------------------------------------
    this.cpU = this.cpVecs.map((cp) => {
      let best = 0, bd = Infinity;
      for (let i = 0; i < N; i++) {
        const d = (px[i] - cp.x) ** 2 + (py[i] - cp.y) ** 2 + (pz[i] - cp.z) ** 2;
        if (d < bd) { bd = d; best = i; }
      }
      return best / N;
    });

    // ---- additive elevation bumps (ramps, rollers) ---------------------
    if (o.bumps) {
      // Ramps are authored as a kicker + drop pair that share their end sample,
      // so those combine with max() while independent rollers add.
      const delta = new Float32Array(N);
      for (const b of o.bumps) {
        const u0 = this.uAt(b.cp0), u1 = this.uAt(b.cp1);
        const i0 = Math.round(u0 * N), i1 = Math.round(u1 * N);
        const span = ((i1 - i0) + N) % N || 1;
        const ramp = b.kind === 'kicker' || b.kind === 'drop';
        for (let s = 0; s <= span; s++) {
          const i = (i0 + s) % N;
          const t = s / span;
          let w;
          if (b.kind === 'kicker') w = Math.pow(t, 1.7);            // ramps up to the lip
          else if (b.kind === 'drop') w = 1 - t * t * (3 - 2 * t);  // falls away
          else w = Math.sin(Math.PI * t) ** 2;                      // roller
          const v = b.height * w;
          delta[i] = ramp ? Math.max(delta[i], v) : delta[i] + v;
        }
      }
      for (let i = 0; i < N; i++) py[i] += delta[i];
      py[N] = py[0];
      // re-derive tangents from the modified polyline so slopes stay consistent
      for (let i = 0; i <= N; i++) {
        const a = (i - 1 + N) % N, c = (i + 1) % N;
        const dx = px[c] - px[a], dy = py[c] - py[a], dz = pz[c] - pz[a];
        const l = Math.hypot(dx, dy, dz) || 1;
        tx[i] = dx / l; ty[i] = dy / l; tz[i] = dz / l;
      }
    }

    // ---- signed curvature (positive = turning left) --------------------
    const kappa = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = (i - 3 + N) % N, c = (i + 3) % N;
      const ax = tx[a], az = tz[a], cx = tx[c], cz = tz[c];
      const cross = ax * cz - az * cx;           // y component of a x c
      const dot = clamp(ax * cx + az * cz, -1, 1);
      const ang = Math.atan2(cross, dot);
      kappa[i] = ang / (6 * this.ds);
    }
    this.kappa = this.#blur(kappa, 6);

    // ---- banking --------------------------------------------------------
    const bankGain = o.bankGain ?? 0;
    const maxBank = o.maxBank ?? 0;
    const bank = new Float32Array(N);
    for (let i = 0; i < N; i++) bank[i] = clamp(this.kappa[i] * bankGain, -maxBank, maxBank);
    this.bank = this.#blur(bank, 10);

    // ---- width / wall profiles -----------------------------------------
    this.width = this.#profile(o.width ?? [[0, 14]], N);
    this.wallL = this.#profile(o.wallL ?? [[0, 0]], N);
    this.wallR = this.#profile(o.wallR ?? [[0, 0]], N);
    this.shoulder = this.#profile(o.shoulder ?? [[0, 2.4]], N);

    // ---- frames ---------------------------------------------------------
    // right = cross(up, tangent) so it matches the kart's local +X when the
    // kart's +Z is the tangent (see startGrid()).
    const rx = new Float32Array(N + 1), ry = new Float32Array(N + 1), rz = new Float32Array(N + 1);
    const nx = new Float32Array(N + 1), ny = new Float32Array(N + 1), nz = new Float32Array(N + 1);
    const t = new THREE.Vector3(), r = new THREE.Vector3(), n = new THREE.Vector3();
    const q = new THREE.Quaternion();
    for (let i = 0; i <= N; i++) {
      const j = i % N;
      t.set(tx[i], ty[i], tz[i]);
      r.crossVectors(UP, t).normalize();
      if (r.lengthSq() < 1e-6) r.set(1, 0, 0);
      n.crossVectors(t, r).normalize();
      q.setFromAxisAngle(t, this.bank[j]);
      r.applyQuaternion(q); n.applyQuaternion(q);
      rx[i] = r.x; ry[i] = r.y; rz[i] = r.z;
      nx[i] = n.x; ny[i] = n.y; nz[i] = n.z;
    }

    // ---- cumulative arc length -----------------------------------------
    const dist = new Float32Array(N + 1);
    for (let i = 1; i <= N; i++) {
      dist[i] = dist[i - 1] + Math.hypot(px[i] - px[i - 1], py[i] - py[i - 1], pz[i] - pz[i - 1]);
    }
    this.realLength = dist[N];

    Object.assign(this, { px, py, pz, tx, ty, tz, rx, ry, rz, nx, ny, nz, dist });

    this.#buildSeedGrid();
    this._s = { pos: new THREE.Vector3(), tangent: new THREE.Vector3(), normal: new THREE.Vector3(), right: new THREE.Vector3(), width: 0, banking: 0 };
    this._p = { u: 0, lateral: 0, distAlong: 0, forward: new THREE.Vector3() };
  }

  #blur(arr, rad) {
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

  /** keyframes [cpIndexFloat, value] -> per-sample Float32Array (smoothstep). */
  #profile(keys, N) {
    const kf = keys.map(([cp, v]) => [this.uAt(cp), v]).sort((a, b) => a[0] - b[0]);
    const out = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const u = i / N;
      let lo = kf[kf.length - 1], hi = kf[0], loU = lo[0] - 1, hiU = hi[0];
      for (let k = 0; k < kf.length; k++) {
        if (kf[k][0] <= u) { lo = kf[k]; loU = kf[k][0]; hi = kf[(k + 1) % kf.length]; hiU = hi[0] + (k + 1 >= kf.length ? 1 : 0); }
      }
      out[i] = lo[1] + (hi[1] - lo[1]) * smoothstep(loU, hiU, u);
    }
    return out;
  }

  /** u of a (possibly fractional) control point index. */
  uAt(cp) {
    const n = this.cpU.length;
    const i0 = Math.floor(cp), f = cp - i0;
    const a = this.cpU[((i0 % n) + n) % n];
    let b = this.cpU[(((i0 + 1) % n) + n) % n];
    if (f === 0) return a;
    if (b < a) b += 1;
    return (a + (b - a) * f) % 1;
  }

  // -------------------------------------------------------------------------
  // O(1) nearest point: coarse seed grid + local descent + segment projection
  // -------------------------------------------------------------------------
  #buildSeedGrid() {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (let i = 0; i < this.N; i++) {
      if (this.px[i] < minX) minX = this.px[i];
      if (this.px[i] > maxX) maxX = this.px[i];
      if (this.pz[i] < minZ) minZ = this.pz[i];
      if (this.pz[i] > maxZ) maxZ = this.pz[i];
    }
    const pad = 260;
    this.gx0 = minX - pad; this.gz0 = minZ - pad;
    const w = (maxX - minX) + pad * 2, h = (maxZ - minZ) + pad * 2;
    const res = 128;
    this.gw = res; this.gh = res;
    this.gcx = w / res; this.gcz = h / res;
    const seeds = new Int32Array(res * res);
    const stride = Math.max(1, Math.floor(this.N / 512));
    for (let gz = 0; gz < res; gz++) {
      const cz = this.gz0 + (gz + 0.5) * this.gcz;
      for (let gxi = 0; gxi < res; gxi++) {
        const cx = this.gx0 + (gxi + 0.5) * this.gcx;
        let best = 0, bd = Infinity;
        for (let i = 0; i < this.N; i += stride) {
          const dx = this.px[i] - cx, dz = this.pz[i] - cz;
          const d = dx * dx + dz * dz;
          if (d < bd) { bd = d; best = i; }
        }
        seeds[gz * res + gxi] = best;
      }
    }
    this.seeds = seeds;
    this.seedStride = stride;
  }

  #seedIndex(x, z) {
    const gx = clamp(Math.floor((x - this.gx0) / this.gcx), 0, this.gw - 1);
    const gz = clamp(Math.floor((z - this.gz0) / this.gcz), 0, this.gh - 1);
    return this.seeds[gz * this.gw + gx];
  }

  #d2(i, x, z) { const dx = this.px[i] - x, dz = this.pz[i] - z; return dx * dx + dz * dz; }

  /** nearest LUT index, constant time. */
  nearestIndex(x, z) {
    const N = this.N;
    let i = this.#seedIndex(x, z);
    let d = this.#d2(i, x, z);
    // local descent, bounded — the seed is at most seedStride/2 samples off
    const span = this.seedStride + 6;
    let moved = true, guard = 0;
    while (moved && guard++ < 64) {
      moved = false;
      const stepSizes = [Math.max(1, span >> 1), 4, 1];
      for (const s of stepSizes) {
        for (;;) {
          const a = (i - s + N) % N, b = (i + s) % N;
          const da = this.#d2(a, x, z), db = this.#d2(b, x, z);
          if (da < d && da <= db) { i = a; d = da; moved = true; }
          else if (db < d) { i = b; d = db; moved = true; }
          else break;
        }
      }
    }
    return i;
  }

  /** @returns {{u, lateral, distAlong, forward:THREE.Vector3, index:number}} */
  project(pos, out) {
    const N = this.N;
    const i = this.nearestIndex(pos.x, pos.z);
    // exact projection onto the two adjacent segments (XZ plane)
    let bestT = 0, bestI = i, bestD = Infinity;
    for (const j of [(i - 1 + N) % N, i]) {
      const k = (j + 1) % N;
      const ax = this.px[j], az = this.pz[j];
      const bx = this.px[k], bz = this.pz[k];
      const ex = bx - ax, ez = bz - az;
      const len2 = ex * ex + ez * ez || 1;
      const t = clamp(((pos.x - ax) * ex + (pos.z - az) * ez) / len2, 0, 1);
      const cx = ax + ex * t, cz = az + ez * t;
      const d = (pos.x - cx) ** 2 + (pos.z - cz) ** 2;
      if (d < bestD) { bestD = d; bestT = t; bestI = j; }
    }
    const j = bestI, k = (j + 1) % N, t = bestT;
    const fx = this.tx[j] + (this.tx[k] - this.tx[j]) * t;
    const fz = this.tz[j] + (this.tz[k] - this.tz[j]) * t;
    const fy = this.ty[j] + (this.ty[k] - this.ty[j]) * t;
    const fl = Math.hypot(fx, fy, fz) || 1;
    const rgx = this.rx[j] + (this.rx[k] - this.rx[j]) * t;
    const rgz = this.rz[j] + (this.rz[k] - this.rz[j]) * t;
    const cx = this.px[j] + (this.px[k] - this.px[j]) * t;
    const cz = this.pz[j] + (this.pz[k] - this.pz[j]) * t;
    const rl = Math.hypot(rgx, rgz) || 1;
    const lateral = ((pos.x - cx) * rgx + (pos.z - cz) * rgz) / rl;

    const o = out || this._p;
    o.u = ((j + t) / N) % 1;
    o.lateral = lateral;
    o.distAlong = this.dist[j] + (this.dist[j + 1] - this.dist[j]) * t;
    o.forward.set(fx / fl, fy / fl, fz / fl);
    o.index = j;
    return o;
  }

  /** frame at normalised arc-length u. */
  sample(u, out) {
    const N = this.N;
    let uu = u % 1; if (uu < 0) uu += 1;
    const f = uu * N;
    const j = Math.floor(f) % N, t = f - Math.floor(f), k = (j + 1) % N;
    const o = out || this._s;
    o.pos.set(
      this.px[j] + (this.px[k] - this.px[j]) * t,
      this.py[j] + (this.py[k] - this.py[j]) * t,
      this.pz[j] + (this.pz[k] - this.pz[j]) * t,
    );
    o.tangent.set(
      this.tx[j] + (this.tx[k] - this.tx[j]) * t,
      this.ty[j] + (this.ty[k] - this.ty[j]) * t,
      this.tz[j] + (this.tz[k] - this.tz[j]) * t,
    ).normalize();
    o.right.set(
      this.rx[j] + (this.rx[k] - this.rx[j]) * t,
      this.ry[j] + (this.ry[k] - this.ry[j]) * t,
      this.rz[j] + (this.rz[k] - this.rz[j]) * t,
    ).normalize();
    o.normal.set(
      this.nx[j] + (this.nx[k] - this.nx[j]) * t,
      this.ny[j] + (this.ny[k] - this.ny[j]) * t,
      this.nz[j] + (this.nz[k] - this.nz[j]) * t,
    ).normalize();
    o.width = this.width[j] + (this.width[k] - this.width[j]) * t;
    o.banking = this.bank[j] + (this.bank[k] - this.bank[j]) * t;
    o.wallL = this.wallL[j] + (this.wallL[k] - this.wallL[j]) * t;
    o.wallR = this.wallR[j] + (this.wallR[k] - this.wallR[j]) * t;
    o.shoulder = this.shoulder[j] + (this.shoulder[k] - this.shoulder[j]) * t;
    o.curvature = this.kappa[j] + (this.kappa[k] - this.kappa[j]) * t;
    o.distAlong = this.dist[j] + (this.dist[j + 1] - this.dist[j]) * t;
    return o;
  }

  widthAtIndex(i) { return this.width[i % this.N]; }

  /** point on the ribbon surface at (u, lateral) */
  point(u, lateral, out = new THREE.Vector3()) {
    const s = this.sample(u);
    return out.copy(s.pos).addScaledVector(s.right, lateral);
  }
}

export { clamp, smoothstep };
