import * as THREE from 'three';
import { RacingLine, clamp, clamp01 } from './RacingLine.js';
import { buildProfile, rubberFactor, RUBBER } from './profiles.js';

/**
 * ============================================================================
 *  AISystem — CPU racers
 * ============================================================================
 *
 *  One `RacingLine` is baked once for the whole field (init only — see that
 *  file for what it precomputes). Every driver then does three O(1) lookups
 *  a step — current station, a pure-pursuit aim point further down the line,
 *  and the pre-baked speed limit at the braking-lookahead station — plus a
 *  handful of scalar behaviours layered on top:
 *
 *    - per-character skill/personality from `profiles.js`, so the field is not
 *      one driver in eight liveries;
 *    - lateral wander, so nobody rides the mathematically ideal line like a
 *      slot car;
 *    - a sticky side-offset when a slower kart is directly ahead, which is
 *      what breaks the pack out of a single-file conga line and into actual
 *      side-by-side racing;
 *    - drift-zone usage (hop, hold, release) so CPUs earn mini-turbos instead
 *      of just braking through every corner;
 *    - occasional "mistakes" — a wide, slightly slower moment — so a driver
 *      does not feel robotically perfect lap after lap;
 *    - light rubber-banding on corner speed only (see `profiles.js`), so a
 *      lapped kart is not also a parked one.
 *
 *  Item usage stays in ItemSystem (`_aiItemDelay`) — this system only ever
 *  writes `kart.aiControls`.
 */

const UP = new THREE.Vector3(0, 1, 0);

export class AISystem {
  name = 'ai'; order = 35;

  #tgt = new THREE.Vector3();
  #to = new THREE.Vector3();
  #fwd = new THREE.Vector3();

  async init(ctx) {
    this.ctx = ctx;
    this.line = new RacingLine(ctx.world);
    this.drivers = ctx.karts.filter((k) => !k.isPlayer).map((k) => this.#makeDriver(k, ctx));
    ctx.onProgress?.(0.92, 'calibrando os pilotos');
  }

  #makeDriver(kart, ctx) {
    const profile = buildProfile(kart.name, kart.id);
    const rng = ctx.rng.fork(0x41000 + kart.id * 7919);
    return {
      kart, profile, rng,
      speedPlan: this.line.speedProfile(kart, profile),
      steer: 0,
      wanderPhase: rng.next() * Math.PI * 2,
      passSide: 0,
      passTimer: 0,
      slipTimer: rng.range(1.5, profile.slipEvery),
      slipUntil: -1,
      zone: -999,
      zoneAttempt: false,
      zoneEntryDist: 0,
      trickRolled: false,
    };
  }

  update(dt, ctx) {
    if (ctx.race?.state === 'idle') return;
    for (const d of this.drivers) this.#driveOne(d, dt, ctx);
  }

  #driveOne(d, dt, ctx) {
    const k = d.kart;
    if (k.frozen || k.finished || k.respawn?.active) {
      k.aiControls = { throttle: 0, brake: 0, steer: 0, drift: false, driftPressed: false, item: false };
      return;
    }

    const line = this.line;
    const w = ctx.world;
    const p = w.project(k.position);
    const i = line.indexAt(p.u);

    // ---- rubber band: nudges cornerSafety only, so straight-line pace is
    // never touched and the effect stays small and symmetric (see profiles.js)
    const gap = (ctx.player?.raceDistance ?? 0) - (k.raceDistance ?? 0);
    const rubberTarget = clamp(rubberFactor(gap), 0.9, RUBBER.hardCap / Math.max(0.7, d.profile.cornerSafety));
    d.rubber = (d.rubber ?? 1) + (rubberTarget - (d.rubber ?? 1)) * (1 - Math.exp(-dt / RUBBER.smooth));

    // ---- mistakes: a rare, brief loss of precision -------------------------
    d.slipTimer -= dt;
    if (d.slipTimer <= 0) {
      d.slipTimer = d.profile.slipEvery * (0.6 + d.rng.next() * 0.8);
      if (d.rng.next() < d.profile.slipChance) d.slipUntil = ctx.time.t + 0.45 + d.rng.next() * 0.5;
    }
    const slipping = ctx.time.t < d.slipUntil;

    // ---- traffic: sticky sideways offset to overtake rather than queue ----
    d.passTimer -= dt;
    const passOffset = this.#trafficOffset(d, ctx);

    // ---- aim point: pure pursuit down the baked racing line ---------------
    const lookM = d.profile.lookBase + d.profile.lookGain * Math.max(2, k.speed);
    const j = line.advance(i, lookM);
    d.wanderPhase += dt * d.profile.wanderHz * Math.PI * 2;
    const wander = Math.sin(d.wanderPhase) * d.profile.wander * (slipping ? 1.8 : 1);
    const cap = line.limit[j] * 0.7;
    const lateral = clamp(wander + passOffset, -cap, cap);

    line.point(j, this.#tgt);
    this.#tgt.x += line.rx[j] * lateral;
    this.#tgt.y += line.ry[j] * lateral;
    this.#tgt.z += line.rz[j] * lateral;

    this.#to.copy(this.#tgt).sub(k.position).setY(0);
    let steerTarget = 0;
    if (this.#to.lengthSq() > 1e-6) {
      this.#to.normalize();
      this.#fwd.set(0, 0, 1).applyQuaternion(k.quaternion).setY(0).normalize();
      const err = Math.atan2(
        this.#fwd.x * this.#to.z - this.#fwd.z * this.#to.x,
        this.#fwd.dot(this.#to),
      );
      steerTarget = clamp(err * 2.1, -1, 1);
    }
    d.steer += (steerTarget - d.steer) * (1 - Math.exp(-d.profile.steerRate * dt));
    let steer = clamp(d.steer, -1, 1);
    if (slipping) steer = clamp(steer + (d.rng.next() - 0.5) * 0.35, -1, 1);

    // ---- speed plan: read the pre-baked corner limit a bit further ahead --
    // (brakeMargin metres — short for a good driver, long for a weak one, so
    // the weak driver reacts to the corner earlier instead of trail-braking
    // into it) then throttle/brake towards it exactly like the player would.
    const bi = line.advance(i, d.profile.brakeMargin);
    let targetSpeed = d.speedPlan[bi] * Math.sqrt(clamp(d.rubber, 0.85, 1.1));
    if (slipping) targetSpeed *= 0.86;

    const over = k.speed - targetSpeed;
    const throttle = over > 0 ? 0 : 1;
    const brake = over > 2.5 ? clamp01((over - 2.5) / 7) : 0;

    // ---- drift zones: hop in, hold, release near the exit ------------------
    const zoneId = line.zoneOf[i];
    let driftPressed = false;
    if (zoneId !== d.zone) {
      d.zone = zoneId;
      d.zoneEntryDist = k.raceDistance ?? 0;
      d.zoneAttempt = zoneId >= 0 && d.rng.next() >= d.profile.driftSkip;
      if (d.zoneAttempt && k.speed > 8 && !k.airborne) driftPressed = true;
    }
    let drift = false;
    if (zoneId >= 0 && d.zoneAttempt) {
      const zone = line.driftZones[zoneId];
      const travelled = (k.raceDistance ?? 0) - d.zoneEntryDist;
      drift = clamp01(travelled / Math.max(1, zone.len)) < d.profile.driftHold;
    }

    // ---- the occasional trick off a jump for the boost ---------------------
    if (k.onGround) d.trickRolled = false;
    else if (!d.trickRolled && !k.air?.trickDone) {
      d.trickRolled = true;
      if (d.rng.next() < d.profile.trickChance) driftPressed = true;
    }

    k.aiControls = { throttle, brake, steer, drift, driftPressed, item: false };
  }

  /**
   * When a slower kart sits within a short window ahead and we have not
   * already cleared it sideways, commit to one side (personality-biased
   * amount, `passOffset`) and hold it for a beat instead of re-deciding every
   * frame, which would otherwise weave. Clearing the gap relaxes it back to 0.
   */
  #trafficOffset(d, ctx) {
    const k = d.kart;
    let nearestGap = Infinity;
    let nearest = null;
    for (const o of ctx.karts) {
      if (o === k || o.frozen || o.finished) continue;
      const gap = (o.raceDistance ?? 0) - (k.raceDistance ?? 0);
      if (gap > 0.5 && gap < 13 && gap < nearestGap) { nearestGap = gap; nearest = o; }
    }
    if (!nearest) { d.passSide *= 0.92; return d.passSide; }

    const lat = (k.lateral ?? 0) - (nearest.lateral ?? 0);
    if (Math.abs(lat) > d.profile.gapWanted * 1.5) { d.passSide *= 0.92; return d.passSide; }

    if (d.passTimer <= 0) {
      d.passSide = d.rng.sign() * d.profile.passOffset;
      d.passTimer = 1.1 + d.rng.next() * 0.6;
    }
    return d.passSide;
  }

  dispose() { this.drivers = []; }
}
