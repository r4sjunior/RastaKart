/** Formatting helpers. Tabular output only: fixed digit count, no jitter. */

const PAD2 = (n) => (n < 10 ? '0' + n : '' + n);
const PAD3 = (n) => (n < 10 ? '00' + n : n < 100 ? '0' + n : '' + n);

/** ms -> "1:23.456". Returns the dash placeholder for empty/invalid values. */
export function lapTime(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "-'--\u2033---";
  const total = Math.floor(ms);
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const f = total % 1000;
  return `${m}'${PAD2(s)}\u2033${PAD3(f)}`;
}

/** ms -> "01:23.4" for the running total (one decimal reads calmer). */
export function raceTime(ms) {
  if (!Number.isFinite(ms) || ms < 0) ms = 0;
  const total = Math.floor(ms);
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const d = Math.floor((total % 1000) / 100);
  return `${PAD2(m)}:${PAD2(s)}.${d}`;
}

/** Portuguese ordinal suffix (masculine): 1 -> "º". */
export function ordinal() { return '\u00BA'; }

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
