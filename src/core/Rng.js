/** Deterministic PRNG (mulberry32). Every system must draw randomness from here
 *  so that screenshot verification runs are byte-for-byte reproducible. */
export class Rng {
  constructor(seed = 0x9e3779b9) { this.seed = seed >>> 0; this._s = this.seed; }

  next() {
    this._s = (this._s + 0x6d2b79f5) >>> 0;
    let t = this._s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(a, b) { return a + (b - a) * this.next(); }
  int(a, b) { return Math.floor(this.range(a, b + 1)); }
  pick(arr) { return arr[Math.floor(this.next() * arr.length)]; }
  sign() { return this.next() < 0.5 ? -1 : 1; }
  fork(salt = 1) { return new Rng((this._s ^ Math.imul(salt, 0x85ebca6b)) >>> 0); }
  reset() { this._s = this.seed; }
}
