/**
 * ============================================================================
 *  RASTA KART — PHYSICS TUNING
 * ============================================================================
 *  Every number that decides how the kart *feels* lives here, in real units:
 *  metres (m), seconds (s), metres per second (m/s), m/s^2, degrees (deg),
 *  kilograms (kg), newtons (N).  Nothing else in the physics folder should
 *  contain a magic constant; if you want to change the feel, change it here.
 *
 *  Design target: Mario Kart 8 Deluxe.  That is an *arcade* model, carefully
 *  tuned — not a simulation.  Where "correct" and "fun" disagree, fun wins,
 *  but the model stays internally consistent so the kart never wobbles,
 *  jitters or flips itself over.
 *
 *  Reference numbers taken from MK8DX community datamining (see NOTES below).
 * ============================================================================
 */

const DEG = Math.PI / 180;

export const TUNING = {
  // ---------------------------------------------------------------- chassis
  chassis: {
    mass: 220,              // kg — kart + driver
    /** Half-distance between left and right wheels (m). */
    halfTrack: 0.74,
    /** Half-distance between front and rear axles (m). */
    halfBase: 0.88,
    /** Height of the centre of mass above the contact plane (m).
     *  This is the single most important number for how much the kart rolls
     *  in a corner and dives under braking: torque = m * a * comHeight. */
    comHeight: 0.46,
    /** Roll inertia about the longitudinal axis (kg m^2). */
    rollInertia: 52,
    /** Pitch inertia about the lateral axis (kg m^2). */
    pitchInertia: 104,
    /** Collision radius used against walls and other karts (m). */
    radius: 1.05,
    /** Distance from the kart origin to the ground when parked (m).
     *  The visual model has its wheel bottoms at local y = 0, so this is a
     *  small clearance, not a full ride height. */
    rideHeight: 0.06,
  },

  // ------------------------------------------------------------- suspension
  //  Four raycast wheels, each a linear spring + viscous damper.
  //  Static sag is what makes the dive/roll readable: a stiff kart is
  //  invisible, a soft kart floats.  ~24 % of travel at rest reads well.
  suspension: {
    restLength: 0.42,       // m — fully extended spring length
    /** Fraction of travel used at rest. KartBody derives the spring rate from
     *  this (k = static load / sag) so the feel survives a mass change; it is
     *  the same 0.10 m of sag the `stiffness` note below describes. */
    sagRatio: 0.24,
    /** Extra ray length past full extension, so the wheels still find the
     *  ground on a crest and the kart does not "pop" off small bumps. */
    probeExtra: 0.22,
    /** Spring rate per wheel (N/m).  Static load per wheel is
     *  mass*g/4 ≈ 540 N, so 5400 N/m gives ≈0.10 m of sag (24 % of travel). */
    stiffness: 5400,
    /** Damping ratio, 1.0 = critically damped.  Slightly under-damped so a
     *  landing settles with one visible compression instead of dead-stopping. */
    dampingRatio: 0.88,
    /** Extra damping on rebound (extension) — stops the kart pogo-ing. */
    reboundExtra: 1.35,
    /** Hard limit for the impulse a single wheel may deliver in one step (N).
     *  Guards against a numerical spike when the ground jumps a step. */
    maxForce: 42000,
    /** Wheel radius, only used to place `wheelContacts[i].pos` (m). */
    wheelRadius: 0.42,
  },

  // ------------------------------------------------------------- body lean
  //  Roll and pitch are solved as two torsional degrees of freedom driven by
  //  the real wheel spring forces plus the d'Alembert (inertial) torque from
  //  lateral/longitudinal acceleration.  That is the suspension doing the
  //  work — there is no keyframed "lean" animation anywhere in this system.
  lean: {
    maxRollDeg: 9,          // hard clamp, deg
    /** Natural frequency of the sprung body in roll/pitch (Hz). A kart is
     *  stiff and short: it settles in well under a second, so one visible
     *  compression on landing and no wallow through a corner. */
    freqHz: 1.9,
    /** Damping ratio of that second-order mode. Just under critical, so the
     *  body overshoots once and stops rather than arriving dead. */
    dampingRatio: 0.78,
    /** Steady-state roll per unit of measured lateral acceleration
     *  (deg per m/s^2). At ~10 m/s^2 in a hard corner this is 5.5 deg, which
     *  reads clearly without hitting the clamp on every turn. */
    rollPerLatAccelDeg: 0.55,
    /** Steady-state pitch per unit of longitudinal acceleration
     *  (deg per m/s^2): dive under braking, squat under power. */
    pitchPerLongAccelDeg: 0.40,
    /** How much left/right spring asymmetry becomes visible roll (deg at full
     *  asymmetry). This is what makes a kerb strike or a banked entry read. */
    terrainRollDeg: 6.5,
    /** Same, front/rear, for crests and compressions. */
    terrainPitchDeg: 5.0,
    maxPitchDeg: 8,         // hard clamp, deg
    /** Extra damping applied to the roll/pitch rates (1/s). Keeps the body
     *  from ringing after a kerb strike. */
    damp: 7.5,
    /** How much of the *drift* slip angle bleeds into visual roll (deg per
     *  rad of slip).  Physically this is the extra lateral force of a
     *  sliding tyre; visually it is what makes a drift read as a drift. */
    driftRollDeg: 16,
  },

  // ----------------------------------------------------- ground alignment
  align: {
    /** Exponential rate at which the kart's up vector chases the terrain
     *  normal while grounded (1/s).  Low enough to ignore surface seams,
     *  high enough to follow real banking. */
    groundRate: 9.0,
    /** Rate at which it returns to world-up while airborne (1/s). */
    airRate: 2.6,
    /** Never lean more than this away from world up, whatever the terrain
     *  says.  Stops a bad normal from flipping the kart (deg). */
    maxTiltDeg: 55,
    /** Ignore normal changes smaller than this (rad) — anti-jitter deadband
     *  for surface transitions where sampleGround snaps between materials. */
    deadband: 0.004,
  },

  // ------------------------------------------------------------- longitudinal
  drive: {
    /** Reference `stats.accel` — a kart with this stat gets exactly the
     *  acceleration curve below.  Other karts scale linearly. */
    accelRef: 12,
    /** Peak acceleration at zero speed (m/s^2) for the reference kart. */
    peakAccel: 21.5,
    /** Torque curve exponent.  a(v) = peak * (1 - (v/vmax)^exp).
     *  exp > 1 keeps the launch strong and flattens the top end. */
    curveExp: 2.3,
    /** The engine aims slightly past the nominal top speed so the kart
     *  actually reaches it instead of asymptoting 8 % short. */
    topSpeedOvershoot: 1.06,
    /** Rolling resistance (1/s), always on. */
    rollDrag: 0.10,
    /** Quadratic aero drag coefficient (1/m). */
    aeroDrag: 0.0016,
    /** Engine braking when the throttle is released (m/s^2). */
    coastDecel: 6.5,
    /** Brake deceleration (m/s^2). */
    brakeDecel: 21,
    /** Reverse top speed (m/s) and acceleration (m/s^2). */
    reverseTop: 7.5,
    reverseAccel: 7.0,
    /** Below this forward speed the brake starts to engage reverse (m/s). */
    reverseThreshold: 0.6,
  },

  // ------------------------------------------------------------------ steer
  //  Speed-sensitive steering.  Without it the kart is unusable at top speed:
  //  a fixed yaw rate that feels lively at 8 m/s is a spin-out at 26 m/s.
  steer: {
    /** Reference `stats.handling`. */
    handlingRef: 2.6,
    /** Peak yaw rate at low speed (deg/s). */
    yawRateLowDeg: 118,
    /** Peak yaw rate at nominal top speed (deg/s). */
    yawRateHighDeg: 62,
    /** Yaw rate floor when boosting past top speed (deg/s). */
    yawRateBoostDeg: 50,
    /** Steering input smoothing rate (1/s).  Keeps a digital keyboard press
     *  from producing a square wave in the telemetry. */
    inputRate: 12,
    /** Below this speed the kart cannot turn on the spot (m/s). */
    minTurnSpeed: 0.5,
    /** Speed over which steering authority is fully faded in (m/s). */
    fadeInSpeed: 3.0,
    /** Extra yaw damping so the heading never oscillates (1/s). */
    yawDamp: 14,
  },

  // ------------------------------------------------------------------- grip
  grip: {
    /** Lateral velocity is killed at this rate while gripping (1/s). */
    stiffness: 11.0,
    /** ...but never harder than this (m/s^2) — that cap is what lets the
     *  kart break away and slide instead of being railed to its heading. */
    maxLatAccel: 26,
    /** Same two numbers while drifting: much looser. */
    driftStiffness: 3.4,
    driftMaxLatAccel: 15.5,
    /** Grip multiplier per surface (applied to both numbers). */
    surface: { road: 1, boost: 1, dirt: 0.72, sand: 0.6, grass: 0.66, water: 0.4 },
    /** While spinning out the kart is on ice. */
    spinStiffness: 1.2,
  },

  // ---------------------------------------------------------------- surfaces
  //  Off-road penalty.  `stats.offroad` (0..1, higher = better) recovers half
  //  of the loss: mul = base + (1 - base) * offroad * offroadRecovery.
  surfaces: {
    speedMul: { road: 1, boost: 1, dirt: 0.78, sand: 0.62, grass: 0.55, water: 0.35 },
    /** Extra deceleration applied on top of the speed cap (m/s^2). */
    dragBoost: { road: 0, boost: 0, dirt: 5, sand: 11, grass: 8, water: 16 },
    offroadRecovery: 0.55,
    /** Rumble: vertical shake amplitude (m/s) and steer wobble (rad) at top
     *  speed on the roughest surface. */
    rumbleHeave: 0.9,
    rumbleSteerDeg: 1.6,
    rumbleHz: 17,
    /** Boost pad grant. */
    padBoostTime: 1.6,
    padBoostPower: 1.5,
    /** Re-trigger guard so one pad does not fire every step (s). */
    padCooldown: 0.5,
  },

  // ------------------------------------------------------------------ boost
  boost: {
    /** Extra acceleration while boosting (m/s^2) — the punch you feel at the
     *  moment of release, on top of the raised speed cap. */
    accelBonus: 26,
    /** How fast the speed cap relaxes back after a boost ends (1/s).
     *  Without this the kart slams from 40 m/s to 26 m/s in one step. */
    decayRate: 1.5,
  },

  // ------------------------------------------------------------------ drift
  //  MK8DX reference (mariowiki / vikemk drift guide, MT stat 4.25):
  //    counter thresholds  240 / 510 / 780
  //    charge rate         5 units per frame at 60 fps  = 300 units/s
  //                        2 units per frame            = 120 units/s (shallow)
  //    => full-lock charge times 0.80 s / 1.70 s / 2.60 s
  //    boost durations     0.621 s / 1.674 s / 2.633 s (Nintendo tutorial)
  drift: {
    /** Minimum speed to start a drift (m/s). */
    minSpeed: 6.0,
    /** Steering deadzone that decides the drift direction at the hop. */
    engageSteer: 0.12,
    /** Hop: vertical launch speed (m/s) and how long the input window to
     *  commit a direction stays open (s). */
    hopSpeed: 2.9,
    hopWindow: 0.30,
    /** Yaw kick given at the hop, deg — the little snap into the slide. */
    hopYawDeg: 9,
    /** Drift slip angle range (deg).  Counter-steering tightens toward min,
     *  steering into the drift opens toward max. */
    slipMinDeg: 11,
    slipMaxDeg: 34,
    /** How fast the slip angle chases its target (1/s). */
    slipRate: 5.0,
    /** Yaw rate multiplier range while drifting, relative to normal steering.
     *  min = full counter-steer, max = full steer into the drift. */
    yawMulMin: 0.55,
    yawMulMax: 1.55,
    /** Speed penalty for being sideways: a drift costs a little top speed
     *  (fraction lost at max slip). */
    slipSpeedCost: 0.10,
    /** Charge counter thresholds (arbitrary units, MK8DX scale). */
    tierThresholds: [240, 510, 780],
    /** Charge rate at full lock and at shallow angle (units/s). */
    chargeFast: 300,
    chargeSlow: 120,
    /** Steer magnitude (into the drift) above which you get the fast rate. */
    chargeFastSteer: 0.55,
    /** Reference `stats.miniTurbo` for the numbers above. */
    miniTurboRef: 4.25,
    /** Boost granted on release, per tier (s). */
    boostTime: [0.62, 1.674, 2.633],
    /** Speed-cap multiplier per tier. */
    boostPower: [1.22, 1.33, 1.45],
    /** Grace period of air time before the charge is cancelled (s).
     *  A kerb or a suspension blip must not eat a purple charge. */
    airGrace: 0.16,
    /** Minimum speed below which the drift auto-releases (m/s). */
    breakSpeed: 4.0,
  },

  // -------------------------------------------------------------------- air
  air: {
    /** Arcade gravity: heavier on the way down than on the way up.  This is
     *  the single oldest trick in the platformer book and it is why MK jumps
     *  feel snappy instead of floaty (m/s^2). */
    gravityUp: 20,
    gravityDown: 30,
    /** Terminal fall speed (m/s). */
    maxFall: 55,
    /** Pitch authority in the air (deg/s) and its clamp (deg). */
    pitchRateDeg: 85,
    pitchMaxDeg: 26,
    /** Yaw authority in the air (deg/s) — deliberately weak. */
    yawRateDeg: 34,
    /** Air drag (1/s). */
    drag: 0.05,
    /** Vertical speed at take-off above which a trick may be performed. */
    trickMinUp: 2.2,
    /** Input window after leaving the ground to trigger a trick (s). */
    trickWindow: 0.35,
    /** Minimum remaining air time for a trick to be allowed (s). */
    trickMinAir: 0.28,
    /** Trick animation duration (s) and the boost it pays on a clean land. */
    trickDuration: 0.45,
    trickBoostTime: 0.55,
    trickBoostPower: 1.26,
    /** Landing alignment: dot(forward, velocity) below which speed is lost,
     *  and the maximum fraction of speed a bad landing costs. */
    landAlignGood: 0.94,
    landPenaltyMax: 0.32,
    /** Impact speed (m/s) that counts as a "hard" landing, for VFX scaling. */
    landHardImpact: 9,
    /** Fraction of the impact speed converted into suspension compression. */
    landAbsorb: 0.75,
    /** Coyote time: ignore this much air before switching to air physics (s). */
    coyote: 0.10,
  },

  // --------------------------------------------------------------- collision
  collide: {
    /** Wall restitution and how much speed a head-on hit costs. */
    wallRestitution: 0.32,
    wallSpeedLoss: 0.45,
    /** Below this |cos| between the velocity and the wall normal the hit is
     *  a graze: the kart slides along the wall instead of stopping dead. */
    wallGrazeCos: 0.42,
    /** Tangential friction applied during a graze (0 = frictionless slide). */
    wallGrazeFriction: 0.12,
    /** Positional correction over-relaxation (1 = exactly out of the wall). */
    wallPush: 1.02,
    /** Minimum normal speed to emit a `kart:wall` event (m/s). */
    wallEventSpeed: 1.5,
    /** Kart vs kart. */
    kartRestitution: 0.35,
    /** Extra sideways shove so trading paint reads as a real bump (m/s). */
    kartShove: 1.6,
    /** Minimum closing speed to emit `kart:hit` (m/s). */
    kartEventSpeed: 1.2,
    /** Any impulse cancels a drift charge above this magnitude (m/s). */
    chargeCancelImpulse: 3.5,
  },

  // ------------------------------------------------------------ status effects
  status: {
    /** Spin-out: full turns performed over the duration, and how fast the
     *  kart is slowed down (1/s). */
    spinTurns: 2.5,
    spinDrag: 2.2,
    /** Squash: speed cap multiplier while flattened. */
    squashSpeedMul: 0.42,
    squashDrag: 3.0,
  },
};

export const TUNING_DEG = DEG;

/** Default stats for any kart that is missing fields. Contract-compatible. */
export const DEFAULT_STATS = {
  topSpeed: 26,     // m/s
  accel: 12,        // scales the acceleration curve, relative to drive.accelRef
  handling: 2.6,    // scales yaw rate, relative to steer.handlingRef
  weight: 1,        // scales mass and collision momentum
  offroad: 0.45,    // 0..1, higher = less off-road penalty
  miniTurbo: 4.25,  // MK8DX-scale MT stat (1 .. 5.75)
  grip: 1,          // lateral grip multiplier
};
