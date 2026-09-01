import * as THREE from 'three';

/**
 * Race director: countdown, checkpoint validation, laps, live placement,
 * lap/total timing, out-of-bounds respawn and the finish sequence.
 *
 * Placement uses a monotonic "race distance" (lap * trackLength + distAlong)
 * rather than raw spline position, so a kart that briefly drives backwards or
 * cuts a corner cannot flicker between positions.
 */
const COUNTDOWN_FROM = 3;
const RESPAWN_DELAY = 1.4;

export class RaceSystem {
  name = 'race'; order = 45;

  #tmp = new THREE.Vector3();

  async init(ctx) {
    this.ctx = ctx;
    const w = ctx.world;
    this.checkpoints = Array.isArray(w?.checkpoints) && w.checkpoints.length
      ? [...w.checkpoints].sort((a, b) => a - b)
      : Array.from({ length: w?.checkpointCount ?? 16 }, (_, i) => i / (w?.checkpointCount ?? 16));
    this.cpCount = this.checkpoints.length;
    this.trackLength = w?.trackLength ?? 1000;

    ctx.race.totalLaps = ctx.opts?.laps ?? ctx.race.totalLaps ?? 3;
    ctx.race.state = 'countdown';
    ctx.race.countdown = COUNTDOWN_FROM;
    ctx.race.timeMs = 0;
    ctx.race.startedAt = 0;
    ctx.race.results = [];

    for (const k of ctx.karts) this.#initKart(k);
    this._lastCountShown = COUNTDOWN_FROM + 1;

    ctx.events.on('kart:respawn-request', (k) => this.#beginRespawn(k));
  }

  #initKart(k) {
    const p = this.ctx.world?.project?.(k.position);
    k.lap = 1;
    k.checkpoint = 0;
    k.nextCp = 0;
    k.progress = 0;
    k.raceDistance = 0;
    k.lastU = p?.u ?? 0;
    k.finished = false;
    k.finishTimeMs = 0;
    k.lapTimes = [];
    k.lapStartMs = 0;
    k.bestLapMs = 0;
    k.respawn = { active: false, timer: 0, u: p?.u ?? 0 };
    k.frozen = true;                    // released on race:start
    k.offTrackTime = 0;
  }

  update(dt, ctx) {
    const race = ctx.race;

    if (race.state === 'countdown') {
      race.countdown -= dt;
      const shown = Math.ceil(race.countdown);
      if (shown < this._lastCountShown) {
        this._lastCountShown = shown;
        if (shown > 0) ctx.events.emit('race:countdown', { n: shown });
      }
      if (race.countdown <= 0) {
        race.state = 'racing';
        race.countdown = 0;
        for (const k of ctx.karts) { k.frozen = false; k.lapStartMs = 0; }
        ctx.events.emit('race:start', {});
        ctx.events.emit('race:countdown', { n: 0 });   // "GO!"
      }
      return;
    }

    if (race.state === 'racing' || race.state === 'finishing') {
      race.timeMs += dt * 1000;
      for (const k of ctx.karts) {
        this.#trackProgress(k, dt, ctx);
        this.#checkBounds(k, dt, ctx);
      }
      this.#rank(ctx);

      if (race.state === 'racing' && ctx.player?.finished) {
        race.state = 'finishing';
        race.finishGraceMs = 6000;
      } else if (race.state === 'finishing') {
        race.finishGraceMs -= dt * 1000;
        if (race.finishGraceMs <= 0 || ctx.karts.every((k) => k.finished)) {
          race.state = 'results';
          ctx.events.emit('race:results', { results: race.results, karts: ctx.karts });
        }
      }
    }
  }

  #trackProgress(k, dt, ctx) {
    if (k.finished) return;
    const w = ctx.world;
    const p = w.project(k.position);
    const u = p.u;

    // wrap-aware forward delta
    let du = u - k.lastU;
    if (du > 0.5) du -= 1;
    if (du < -0.5) du += 1;
    k.lastU = u;

    // checkpoint gating: must sweep them in order, no cutting the whole lap
    const nextU = this.checkpoints[k.nextCp];
    if (du > 0 && this.#passed(u, du, nextU)) {
      k.checkpoint = k.nextCp;
      k.nextCp = (k.nextCp + 1) % this.cpCount;
      if (k.nextCp === 0) this.#completeLap(k, ctx);
    }

    k.progress = (k.lap - 1) + (k.nextCp / this.cpCount) * 0.999 + u * 1e-4;

    // The starting grid sits *behind* the line, at u ≈ 0.996, so a kart that
    // has not moved yet measures a distAlong of nearly a full lap. Left alone
    // that ranks the whole stationary grid ahead of the field. While a kart is
    // still short of the first checkpoint, wrap that tail back to a negative
    // distance so the grid reads as "not started" instead of "nearly finished".
    let along = p.distAlong;
    if (k.nextCp === 0 && along > this.trackLength * 0.5) along -= this.trackLength;
    k.raceDistance = (k.lap - 1) * this.trackLength + along;
    k.lateral = p.lateral;
    k.splineU = u;
  }

  #passed(u, du, target) {
    const prev = u - du;
    if (prev <= target && u >= target) return true;
    if (prev > u && (prev <= target + 1 && u + 1 >= target)) return true;  // wrapped
    return false;
  }

  #completeLap(k, ctx) {
    const race = ctx.race;
    const lapMs = race.timeMs - k.lapStartMs;
    k.lapStartMs = race.timeMs;
    k.lapTimes.push(lapMs);
    if (!k.bestLapMs || lapMs < k.bestLapMs) k.bestLapMs = lapMs;

    if (k.lap >= race.totalLaps) {
      k.finished = true;
      k.finishTimeMs = race.timeMs;
      race.results.push({ id: k.id, name: k.name, place: race.results.length + 1, timeMs: k.finishTimeMs, bestLapMs: k.bestLapMs });
      k.place = race.results.length;
      ctx.events.emit('race:finish', { kart: k, place: k.place, timeMs: k.finishTimeMs });
    } else {
      k.lap++;
      if (k.isPlayer) race.lap = k.lap;
      ctx.events.emit('race:lap', { kart: k, lap: k.lap, lapMs, final: k.lap === race.totalLaps });
    }
  }

  #checkBounds(k, dt, ctx) {
    if (k.finished) return;
    if (k.respawn.active) {
      k.respawn.timer -= dt;
      if (k.respawn.timer <= 0) this.#finishRespawn(k, ctx);
      return;
    }
    const fellThrough = k.position.y < (ctx.world.minY ?? -25);
    const drowned = k.surface === 'water' && k.onGround;
    const strayed = Math.abs(k.lateral ?? 0) > (ctx.world.maxLateral ?? 90);

    // A kart that wanders off the racing surface and stays there is not coming
    // back on its own. Rather than let it drive to the horizon, give it a few
    // seconds of grace — enough for a legitimate shortcut or a wide line — and
    // then put it back on the track.
    const offSurface = k.onGround && (k.surface === 'grass' || k.surface === 'sand');
    k.offTrackTime = offSurface ? k.offTrackTime + dt : 0;
    const lost = k.offTrackTime > 4 || Math.abs(k.lateral ?? 0) > 34;

    if (fellThrough || drowned || strayed || lost) this.#beginRespawn(k);
  }

  #beginRespawn(k) {
    if (k.respawn.active) return;
    k.respawn.active = true;
    k.respawn.timer = RESPAWN_DELAY;
    k.respawn.u = k.splineU ?? k.respawn.u;
    k.frozen = true;
    k.velocity.set(0, 0, 0);
    k.forwardSpeed = 0;
    this.ctx.events.emit('kart:respawn-start', { kart: k });
  }

  #finishRespawn(k, ctx) {
    const w = ctx.world;
    const spot = w.respawn ? w.respawn(k.respawn.u) : (() => {
      const s = w.sampleSpline(k.respawn.u);
      const q = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(new THREE.Vector3(), s.tangent.clone().negate(), s.normal));
      return { position: s.pos.clone().add(this.#tmp.copy(s.normal).multiplyScalar(1.2)), quaternion: q };
    })();
    k.position.copy(spot.position);
    k.quaternion.copy(spot.quaternion);
    k.velocity.set(0, 0, 0);
    k.forwardSpeed = 0;
    k.drift.active = false; k.drift.charge = 0; k.drift.tier = 0;
    k.respawn.active = false;
    k.frozen = false;
    ctx.events.emit('kart:respawn-end', { kart: k });
  }

  #rank(ctx) {
    const running = ctx.karts.filter((k) => !k.finished);
    running.sort((a, b) => b.raceDistance - a.raceDistance);
    const base = ctx.race.results.length;
    running.forEach((k, i) => { k.place = base + i + 1; });
    ctx.race.playerPlace = ctx.player?.place ?? 1;
    ctx.race.fieldSize = ctx.karts.length;
  }

  dispose() { }
}
