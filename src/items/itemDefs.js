/**
 * Item table.
 *
 * `WEIGHTS` is a roulette in five buckets from the front of the field to the
 * back, the same shape Mario Kart uses: the leader is fed coins and defensive
 * shells, the tail of the field is fed stars and lightning. Interpolating
 * between adjacent buckets rather than snapping keeps 4th and 5th place from
 * feeling like two different games.
 *
 * Ids match `src/ui/icons.js` — the HUD draws whatever id it is handed.
 */
export const ITEM_IDS = [
  'coin', 'banana', 'shellGreen', 'boost', 'shellRed',
  'triple', 'bomb', 'ghost', 'star', 'bolt',
];

/** rows: item, cols: 0 = leader .. 4 = last */
export const WEIGHTS = {
  coin:       [30, 18, 8, 2, 0],
  banana:     [22, 20, 14, 8, 4],
  shellGreen: [20, 18, 14, 8, 4],
  boost:      [10, 18, 22, 22, 16],
  shellRed:   [8, 14, 18, 18, 12],
  triple:     [4, 8, 12, 16, 14],
  bomb:       [4, 6, 10, 12, 10],
  ghost:      [2, 4, 6, 8, 10],
  star:       [0, 2, 6, 14, 22],
  bolt:       [0, 0, 2, 6, 18],
};

/** Per-item behaviour constants. Everything the tuning cares about is here. */
export const ITEM = {
  boost:      { uses: 1, boost: { time: 1.9, power: 1.55 } },
  triple:     { uses: 3, boost: { time: 1.7, power: 1.5 } },
  banana:     { uses: 1, drop: true, radius: 1.05, spin: 0.95 },
  shellGreen: { uses: 1, speed: 33, life: 8.0, radius: 1.15, spin: 1.15, bounce: true },
  shellRed:   { uses: 1, speed: 30, life: 9.0, radius: 1.15, spin: 1.25, homing: 5.5 },
  bomb:       { uses: 1, speed: 21, life: 2.6, radius: 6.2, spin: 1.35, fuse: true },
  star:       { uses: 1, duration: 7.2, boost: { time: 7.2, power: 1.32 } },
  bolt:       { uses: 1, squash: 3.6 },
  coin:       { uses: 1, boost: { time: 0.55, power: 1.12 } },
  ghost:      { uses: 1, duration: 5.5, boost: { time: 0.8, power: 1.15 } },
};

/** Blend the two nearest buckets for a normalised race position 0..1. */
export function rollItem(rng, t01) {
  const x = Math.max(0, Math.min(1, t01)) * 4;
  const i = Math.min(3, Math.floor(x));
  const f = x - i;

  let total = 0;
  const acc = [];
  for (const id of ITEM_IDS) {
    const w = WEIGHTS[id];
    const v = w[i] * (1 - f) + w[i + 1] * f;
    if (v <= 0) continue;
    total += v;
    acc.push([id, total]);
  }
  if (total <= 0) return 'banana';
  const r = rng.next() * total;
  for (const [id, cum] of acc) if (r < cum) return id;
  return acc[acc.length - 1][0];
}
