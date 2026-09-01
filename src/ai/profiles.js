/**
 * ============================================================================
 *  DRIVER PROFILES — skill, personality and the rubber-band contract
 * ============================================================================
 *
 *  `skill` is 0..1 and every other number in a profile is derived from it, so
 *  a character is described by one dial plus a small personality offset. The
 *  field is deliberately spread: the fastest CPU should be a real benchmark
 *  for a good player, the slowest should be beatable by someone learning the
 *  track, and nobody should look like the same robot with a different hat.
 *
 *  Personality knobs that are NOT derived from skill (so two drivers of equal
 *  pace still feel different):
 *    aggression   how hard they fight for a line and how close they follow
 *    patience     how long they wait to attack a gap
 *    driftLove    how eagerly they slide corners that are borderline
 */

import { clamp01, lerp } from './RacingLine.js';

/**
 * Per-character dials, keyed by the name PhysicsSystem gives each kart.
 * Kart 0 ('Rasta') is the player and is never driven by this system, but it is
 * listed so a bench run that hands the player to the AI still gets a profile.
 */
export const CHARACTER_SKILL = {
  Rasta:  { skill: 0.80, aggression: 0.60, patience: 0.55, driftLove: 0.70 },
  Zion:   { skill: 0.90, aggression: 0.85, patience: 0.30, driftLove: 0.55 },
  Marley: { skill: 0.96, aggression: 0.55, patience: 0.70, driftLove: 0.95 },
  Selah:  { skill: 0.74, aggression: 0.50, patience: 0.60, driftLove: 0.70 },
  Kofi:   { skill: 0.55, aggression: 0.90, patience: 0.20, driftLove: 0.35 },
  Nia:    { skill: 0.86, aggression: 0.45, patience: 0.80, driftLove: 0.90 },
  Tafari: { skill: 0.66, aggression: 0.70, patience: 0.45, driftLove: 0.60 },
  Ayo:    { skill: 0.44, aggression: 0.35, patience: 0.75, driftLove: 0.45 },
};

const DEFAULT_DIALS = { skill: 0.7, aggression: 0.5, patience: 0.5, driftLove: 0.6 };

/**
 * Expand one character's dials into the numbers the driver actually reads.
 * Everything here is a pure function of the dials, so a profile is stable and
 * reproducible across runs.
 */
export function buildProfile(name, id) {
  const d = CHARACTER_SKILL[name] ?? DEFAULT_DIALS;
  const s = clamp01(d.skill);

  return {
    name, id,
    skill: s,
    aggression: d.aggression,
    patience: d.patience,
    driftLove: d.driftLove,

    // ---- speed profile inputs ------------------------------------------
    /** Fraction of the physical cornering limit this driver dares to use.
     *  0.855 (worst) .. 0.985 (best): about 7 % of corner speed across the
     *  field, which on this circuit is roughly 4 s of lap time. */
    cornerSafety: lerp(0.855, 0.985, s),
    /** Fraction of the real 21 m/s^2 brake the plan assumes. Lower = the
     *  backwards pass starts shedding speed earlier = brakes earlier. */
    brakeUse: lerp(0.40, 0.68, s),
    /** How much of a drifting corner's lost grip they get back by being
     *  smooth. Feeds the drift-zone entry in the speed profile. */
    driftGripBlend: lerp(0.30, 0.58, s),
    /** Safety factor on the yaw-rate ceiling. */
    yawSafety: lerp(0.90, 0.99, s),
    /** Extra metres of "I lifted early" padding on top of the plan. */
    brakeMargin: lerp(11.0, 1.5, s),

    // ---- controller ------------------------------------------------------
    /** Pure-pursuit lookahead = base + gain * speed (metres). Short = precise
     *  and twitchy, long = smooth and lazy. Good drivers look further ahead
     *  AND correct faster, which is why both move with skill. */
    lookBase: lerp(7.5, 5.0, s),
    lookGain: lerp(0.42, 0.58, s),
    /** Steering command smoothing (1/s). A weak driver has visible reaction
     *  lag; a strong one is nearly instant. */
    steerRate: lerp(9.0, 26.0, s),
    /** Gain on the "I am off my line" correction term. */
    lateralGain: lerp(0.055, 0.105, s),

    // ---- line noise: the reason they are not all on rails ---------------
    /** Amplitude (m) of a slow deterministic wander around the ideal line. */
    wander: lerp(1.35, 0.16, s),
    /** ...and its frequency (Hz). */
    wanderHz: lerp(0.17, 0.31, s),

    // ---- mistakes --------------------------------------------------------
    /** Mean seconds between mistake rolls. */
    slipEvery: lerp(7.0, 26.0, s),
    /** Probability a roll actually becomes a mistake. */
    slipChance: lerp(0.55, 0.10, s),

    // ---- drift -----------------------------------------------------------
    /** A zone is attempted only if the predicted charge reaches this tier. */
    minTier: s > 0.8 ? 1 : 1,
    /** Multiplier on the predicted charge time needed before committing —
     *  cautious drivers want more margin before they throw it sideways. */
    driftCommit: lerp(1.55, 1.02, s) / Math.max(0.35, d.driftLove),
    /** Chance (per zone) that a weak driver simply does not bother. */
    driftSkip: lerp(0.34, 0.0, s) * (1 - d.driftLove * 0.5),
    /** Fraction of the zone's remaining length at which they release. 1.0 =
     *  exactly at the exit; below 1 = early release, losing tier progress. */
    driftHold: lerp(0.80, 1.0, s),

    // ---- air / tricks ----------------------------------------------------
    trickChance: lerp(0.35, 1.0, s),

    // ---- traffic ---------------------------------------------------------
    /** Metres of side clearance they try to keep from the kart ahead. */
    gapWanted: lerp(3.4, 2.2, s),
    /** How hard they swerve to take a gap (m of lateral offset). */
    passOffset: lerp(1.6, 3.4, s) * (0.6 + d.aggression * 0.8),

    // ---- shortcut --------------------------------------------------------
    /** Only the confident take the dirt. */
    takesShortcut: s >= 0.72,
  };
}

/**
 * ---------------------------------------------------------------------------
 *  RUBBER BANDING — small, symmetric and documented
 * ---------------------------------------------------------------------------
 *  The only thing that moves is `cornerSafety`, i.e. how close to the physical
 *  limit a CPU drives through corners. Straight-line speed, acceleration and
 *  boost are untouched, so a player who is genuinely faster on the straights
 *  stays faster; nobody gets a phantom engine.
 *
 *    gap = (player raceDistance) - (cpu raceDistance), metres
 *    t   = clamp(gap / FULL, -1, +1)          FULL = 260 m (~1/6 of a lap)
 *    behind (t > 0): cornerSafety * (1 + 0.030 * t)     -> at most +3.0 %
 *    ahead  (t < 0): cornerSafety * (1 + 0.022 * t)     -> at most -2.2 %
 *
 *  Corner speed is roughly half of a lap on this circuit, so +3 % of corner
 *  speed is about +1.4 % of lap pace: on a 55 s lap, 0.8 s. That is enough to
 *  keep a pack together over three laps and far too little to feel like the
 *  CPU teleported. The multiplier is also clamped so that it can never push a
 *  driver past 0.995 of the true grip limit — a rubber-banded CPU still spins
 *  wide if it asks for more than the tyres have.
 */
export const RUBBER = {
  fullGap: 260,
  behindGain: 0.030,
  aheadGain: 0.022,
  hardCap: 0.995,
  /** Seconds to blend towards a new rubber factor; keeps it invisible. */
  smooth: 2.5,
};

export function rubberFactor(gapMetres) {
  const t = Math.max(-1, Math.min(1, gapMetres / RUBBER.fullGap));
  return 1 + (t > 0 ? RUBBER.behindGain : RUBBER.aheadGain) * t;
}
