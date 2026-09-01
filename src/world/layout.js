/**
 * "Kingston Coast" — circuit layout data.
 *
 * The whole course is authored here as control points + profiles keyed by
 * control-point index, so the road mesh, the collision data and the scenery all
 * read from one source of truth. Profiles interpolate with smoothstep between
 * keys, and fractional control-point indices are allowed (`8.55` = 55% of the
 * way from cp 8 to cp 9).
 *
 * Section map:
 *   0        start / finish line, beach front, start tower + main grandstand
 *   0 –  3   MAIN STRAIGHT along the sand — widest part of the circuit
 *   3 –  6   T1, a long right-hander of increasing radius climbing off the beach
 *   6 –  9   VILLAGE CHICANE, narrow left-right flick between painted shacks
 *   9 – 12   THE CLIMB, long banked left into the Blue Mountains
 *  13 – 17   SUMMIT HAIRPIN, tightest corner on the circuit, grandstand outside
 *  18 – 19   descent to the gorge
 *  19 – 21   GORGE BRIDGE, narrow elevated span over the waterfall
 *  21 – 22   THE KICKER, ramp + drop-away = big air, trick zone
 *  22 – 25   JUNGLE ESSES, fast left-right dropping back to sea level
 *  22 – 25   (alt) BEACH SHORTCUT, dirt, plank bridge over the creek, boost pad
 *  25 – 28   COAST ROAD, fast, cliff and open sea on the outside
 *  28 –  0   FINAL CORNER, heavily banked right onto the straight
 */

/** Authoring scale; keeps the lap at roughly 1.65 km. */
const S = 0.86;
const scale = (pts) => pts.map(([x, y, z]) => [x * S, y, z * S]);

export const TRACK_POINTS = scale([
  [-240,  2.0, -176],  //  0 start / finish
  [-150,  2.0, -180],  //  1
  [ -55,  2.2, -184],  //  2
  [  45,  3.0, -180],  //  3 braking for T1
  [ 140,  6.0, -158],  //  4 T1
  [ 205, 10.0, -108],  //  5 T1 exit, climbing
  [ 232, 14.0,  -58],  //  6 village entry
  [ 216, 17.2,  -16],  //  7 chicane left
  [ 244, 20.6,   22],  //  8 chicane right
  [ 254, 26.0,   66],  //  9 the climb
  [ 240, 34.0,  124],  // 10
  [ 206, 42.0,  172],  // 11
  [ 140, 47.5,  202],  // 12
  [  70, 50.0,  208],  // 13 hairpin entry
  [  16, 50.4,  201],  // 14
  [   1, 50.2,  180],  // 15 hairpin apex
  [  10, 49.6,  153],  // 16
  [  62, 48.6,  136],  // 17 hairpin exit
  [  76, 45.0,   96],  // 18 descent
  [  40, 40.0,   46],  // 19 bridge start
  [ -18, 36.0,   24],  // 20 bridge middle (gorge below)
  [ -84, 33.0,   30],  // 21 kicker lip
  [-142, 24.0,   58],  // 22 landing
  [-198, 15.0,   96],  // 23 esse
  [-252,  9.0,  112],  // 24
  [-300,  5.0,   80],  // 25 coast road
  [-306,  3.0,   20],  // 26
  [-320,  2.0,  -40],  // 27
  [-334,  2.0, -100],  // 28 final banked right
  [-318,  2.0, -150],  // 29
]);

/** Full road width in metres. */
export const WIDTH_KEYS = [
  [0, 19], [2, 19], [3, 18],
  [4, 16.5], [5, 15.5],
  [6, 13], [7, 11.5], [8, 12.5],       // village chicane: tight
  [9, 14], [10, 15.5], [11, 16.5], [12, 16],
  [13, 14], [14, 13], [15, 12.5], [16, 13], [17, 13.5],  // hairpin
  [18, 14],
  [19, 12], [20, 11.5], [21, 12.5],    // bridge: narrow, no runoff
  [22, 19], [22.6, 18],                // wide landing zone
  [23, 14], [24, 13.5], [25, 15],
  [26, 16], [27, 16], [28, 17], [29, 18],
];

/**
 * Barrier half-offset from the centreline. 0 = open runoff on that side (the
 * kart simply goes off-road). L is the -lateral side, R the +lateral side.
 */
export const WALL_L_KEYS = [
  [0, 0], [3, 0],
  [4, 11], [5, 10.5],
  [6, 8.5], [7, 7.5], [8, 8],
  [9, 9], [10, 10], [11, 11], [12, 10.5],
  [13, 9.5], [14, 9], [15, 8.5], [16, 9], [17, 9],
  [18, 9.5],
  [19, 7.5], [20, 7.2], [21, 8],
  [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0],
];
export const WALL_R_KEYS = [
  [0, 12.5], [1, 12.5], [2, 12.5], [3, 12],   // sea wall along the beach straight
  [4, 0], [5, 0],
  [6, 8.5], [7, 7.5], [8, 8],                 // village shacks hem you in
  [9, 0], [10, 0], [11, 0], [12, 0],
  [13, 9.5], [14, 9], [15, 8.5], [16, 9], [17, 9],
  [18, 0],
  [19, 7.5], [20, 7.2], [21, 8],
  [22, 0], [23, 0], [24, 0],
  [25, 10], [26, 10.5], [27, 10.5], [28, 11], [29, 12],  // cliff over the sea
];

/** Paved shoulder / apron beyond the road edge (metres, per side). */
export const SHOULDER_KEYS = [
  [0, 3.5], [3, 3.0], [4, 2.4], [6, 1.2], [9, 2.2], [13, 2.6],
  [19, 0.8], [22, 3.2], [25, 2.6], [28, 3.4],
];

/** Additive elevation shaping on top of the spline (ramps, rollers). */
export const BUMPS = [
  { cp0: 20.70, cp1: 21.06, height: 6.0, kind: 'kicker' },  // the jump lip
  { cp0: 21.06, cp1: 21.36, height: 6.0, kind: 'drop' },    // ...and the fall away
  { cp0: 1.2, cp1: 2.1, height: 1.1, kind: 'roller' },      // the straight is not flat
  { cp0: 26.2, cp1: 27.1, height: 1.6, kind: 'roller' },
  { cp0: 11.3, cp1: 12.2, height: 2.0, kind: 'roller' },
];

export const BANK_GAIN = 4.6;         // curvature (1/m) -> radians
export const MAX_BANK = 0.245;        // ~14 degrees

/** Barrier styling per control-point range. */
export const BARRIER_STYLE = [
  { cp0: 0, cp1: 4, style: 'bamboo' },
  { cp0: 4, cp1: 6, style: 'sandbag' },
  { cp0: 6, cp1: 9, style: 'wall' },
  { cp0: 9, cp1: 19, style: 'stone' },
  { cp0: 19, cp1: 22, style: 'rail' },
  { cp0: 22, cp1: 25, style: 'bamboo' },
  { cp0: 25, cp1: 30, style: 'stone' },
];

/** Boost panels: centre control point + lateral lane offsets. */
export const BOOST_PANELS = [
  { cp: 3.55, lanes: [-4.5, 0, 4.5] },   // last beach kink into T1
  { cp: 8.60, lanes: [-3, 3] },          // village exit
  { cp: 17.35, lanes: [-3.2, 3.2] },     // hairpin exit
  { cp: 20.72, lanes: [-3.6, 0, 3.6] },  // run-up to the kicker
  { cp: 24.75, lanes: [-3.4, 3.4] },     // esses exit
  { cp: 29.35, lanes: [-5, 0, 5] },      // final corner onto the straight
];

/** Painted direction markings on the tarmac. */
export const ROAD_DECALS = [
  { cp: 3.15, kind: 'chevron', side: 1 },
  { cp: 6.40, kind: 'arrow', side: -1 },
  { cp: 7.60, kind: 'arrow', side: 1 },
  { cp: 15.20, kind: 'chevron', side: -1 },
  { cp: 20.30, kind: 'arrow', side: 0 },
  { cp: 23.40, kind: 'chevron', side: 1 },
  { cp: 28.30, kind: 'chevron', side: -1 },
];

/** The risky beach shortcut (dirt), branching off after the jump landing. */
export const SHORTCUT_POINTS = scale([
  [-146, 23.0, 60],
  [-178, 17.0, 50],
  [-214, 11.5, 42],
  [-248,  7.5, 40],
  [-276,  5.6, 52],
  [-298,  5.0, 72],
]);
export const SHORTCUT_WIDTH_KEYS = [[0, 9], [1, 7], [2, 6.2], [3, 6.0], [4, 7], [5, 9]];
export const SHORTCUT_JOIN = { enter: 22.08, exit: 25.02 };
export const SHORTCUT_BOOST = 0.58;    // u along the shortcut

/** Item boxes: rows across the track. */
export const ITEM_ROWS = [
  { cp: 1.50, n: 5 },
  { cp: 5.40, n: 4 },
  { cp: 9.60, n: 4 },
  { cp: 12.40, n: 5 },
  { cp: 18.60, n: 4 },
  { cp: 22.90, n: 5 },
  { cp: 26.40, n: 4 },
];

export const CHECKPOINT_COUNT = 24;

/** World constants shared by terrain / water / scenery. */
export const WORLD = {
  seaLevel: 0,
  // L-shaped coastline: open sea to the south (low z) and to the west (low x).
  coastZ: -205 * S,
  coastX: -352 * S,
  extent: 1500,
  gorge: {
    path: scale([[152, 0, 202], [96, 0, 156], [44, 0, 98], [6, 0, 52], [-20, 0, 22], [-52, 0, -18], [-88, 0, -62]]),
    width: 30,
    depth: 24,
    fallAt: 2,                       // waterfall lands near path[2]
    lagoon: [-88 * S, -62 * S],
  },
};

/** Caribbean village: colourful shacks around the chicane. */
export const VILLAGE = { cp0: 5.6, cp1: 9.2, rows: 3 };

/** Grandstands with crowd. */
export const STANDS = [
  { cp: 0.35, side: -1, len: 64, tiers: 7 },
  { cp: 1.55, side: -1, len: 46, tiers: 6 },
  { cp: 29.50, side: -1, len: 42, tiers: 5 },
  { cp: 15.05, side: 1, len: 34, tiers: 5 },   // hairpin grandstand
  { cp: 22.60, side: 1, len: 30, tiers: 4 },
];

/** Overhead gantries / arches. */
export const ARCHES = [
  { cp: 0.0, kind: 'start' },
  { cp: 4.6, kind: 'banner' },
  { cp: 9.4, kind: 'banner' },
  { cp: 17.6, kind: 'banner' },
  { cp: 22.35, kind: 'banner' },
  { cp: 26.8, kind: 'banner' },
];

export const PALETTE = {
  rasta: [0x1eae4b, 0xffd21e, 0xd8232a, 0x111417],
  houses: [0x2fb3a6, 0xf4a52a, 0xe0533f, 0x7cc45a, 0x5a7fd0, 0xf2d64b, 0xe07ab0, 0xf07030],
  sand: 0xe8d5a6,
  sandDark: 0xc9ae78,
  grass: 0x4aa348,
  grassDark: 0x2f7434,
  jungle: 0x27713a,
  rock: 0x8a7f6e,
  rockDark: 0x5e5648,
  seaShallow: 0x3fd2c7,
  seaDeep: 0x0b6c8f,
  foam: 0xf2fbff,
};
