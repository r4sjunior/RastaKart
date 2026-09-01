/** Small numeric helpers shared by the physics files. No allocations. */

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const sign = (v) => (v > 0 ? 1 : v < 0 ? -1 : 0);

/**
 * Frame-rate independent exponential approach factor.
 * `x += (target - x) * approach(rate, dt)` converges at `rate` per second
 * regardless of the step size, and can never overshoot.
 */
export const approach = (rate, dt) => 1 - Math.exp(-rate * dt);

/** Move `v` toward `target` by at most `maxDelta`. */
export function moveToward(v, target, maxDelta) {
  const d = target - v;
  if (Math.abs(d) <= maxDelta) return target;
  return v + Math.sign(d) * maxDelta;
}

/** Smoothstep 0..1. */
export const smoothstep = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

/** Wrap an angle to (-PI, PI]. */
export function wrapAngle(a) {
  a = (a + Math.PI) % (Math.PI * 2);
  if (a < 0) a += Math.PI * 2;
  return a - Math.PI;
}

/** Deterministic value noise in [-1, 1] from a float seed. No Math.random. */
export function hashNoise(x) {
  const s = Math.sin(x * 127.1) * 43758.5453123;
  return (s - Math.floor(s)) * 2 - 1;
}

/** Guard against NaN/Infinity creeping into a state variable. */
export const finite = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback);
