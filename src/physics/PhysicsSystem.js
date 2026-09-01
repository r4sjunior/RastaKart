import * as THREE from 'three';
import { KartBody } from './KartBody.js';
import { DEFAULT_STATS } from './tuning.js';

/**
 * Owns the eight KartEntity records and steps each one's KartBody.
 *
 * The entity is the shared contract (docs/ARCHITECTURE.md); KartBody is the
 * simulation behind it. Everything other systems read — position, quaternion,
 * drift state, wheel contacts — lives on the entity, so nothing outside this
 * folder ever touches the solver.
 *
 * Kart-to-kart contact is resolved here rather than in KartBody, because it is
 * the one interaction that needs to see every body at once.
 */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const KART_RADIUS = 0.95;
const FIELD = 8;

/** Per-character stat lines. Sum of the deltas is kept near zero on purpose. */
const CHARACTERS = [
  { name: 'Rasta',  stats: { topSpeed: 27.0, accel: 12.0, handling: 2.65, weight: 1.00, miniTurbo: 4.5 } },
  { name: 'Zion',   stats: { topSpeed: 28.4, accel: 10.4, handling: 2.30, weight: 1.22, miniTurbo: 3.5 } },
  { name: 'Marley', stats: { topSpeed: 26.2, accel: 13.4, handling: 3.00, weight: 0.84, miniTurbo: 5.0 } },
  { name: 'Selah',  stats: { topSpeed: 27.4, accel: 11.6, handling: 2.55, weight: 1.05, miniTurbo: 4.25 } },
  { name: 'Kofi',   stats: { topSpeed: 28.8, accel: 10.0, handling: 2.20, weight: 1.30, miniTurbo: 3.25 } },
  { name: 'Nia',    stats: { topSpeed: 26.0, accel: 13.8, handling: 3.10, weight: 0.80, miniTurbo: 5.25 } },
  { name: 'Tafari', stats: { topSpeed: 27.2, accel: 12.2, handling: 2.70, weight: 1.00, miniTurbo: 4.5 } },
  { name: 'Ayo',    stats: { topSpeed: 27.8, accel: 11.2, handling: 2.45, weight: 1.12, miniTurbo: 4.0 } },
];

export class PhysicsSystem {
  name = 'physics'; order = 30;

  #bodies = [];
  #d = new THREE.Vector3();
  #rel = new THREE.Vector3();
  #imp = new THREE.Vector3();

  async init(ctx) {
    this.ctx = ctx;

    for (let i = 0; i < FIELD; i++) {
      const kart = this.#makeKart(ctx, i);
      ctx.karts.push(kart);
      const body = new KartBody(kart, ctx);
      kart._body = body;
      body.place(ctx);
      this.#bodies.push(body);
    }
    ctx.player = ctx.karts[0];

    for (const k of ctx.karts) ctx.events.emit('kart:spawn', k);
    ctx.onProgress?.(0.9, 'alinhando o grid');
  }

  #makeKart(ctx, i) {
    const spawn = ctx.world.startGrid(i);
    const c = CHARACTERS[i % CHARACTERS.length];

    const kart = {
      id: i,
      name: c.name,
      isPlayer: i === 0,
      characterId: 'rasta',
      liveryIndex: i,

      position: spawn.position.clone(),
      quaternion: spawn.quaternion.clone(),
      up: new THREE.Vector3(0, 1, 0),
      velocity: new THREE.Vector3(),

      speed: 0,
      forwardSpeed: 0,
      steerInput: 0,
      steerAngle: 0,

      drift: { active: false, dir: 0, charge: 0, tier: 0 },
      boost: { timer: 0, power: 1, source: null },
      air: { off: false, time: 0, trickDone: false },

      onGround: true,
      surface: 'road',
      groundNormal: new THREE.Vector3(0, 1, 0),
      wheelContacts: [],

      lap: 1, checkpoint: 0, progress: 0, place: i + 1, finished: false,
      frozen: true,
      visual: null,

      stats: { ...DEFAULT_STATS, ...c.stats },

      applyImpulse(v) { this._body?.applyImpulse(v); },
      spinOut(dur) { this._body?.spinOut(dur); },
      squash(dur) { this._body?.squashKart(dur); },
      giveBoost(dur, power = 1.35, source = 'item') {
        const b = this.boost;
        b.timer = Math.max(b.timer, dur);
        b.power = Math.max(b.power, power);
        b.source = source;
      },
    };
    return kart;
  }

  /** Player reads the pad; CPUs are driven by AISystem writing kart.aiControls. */
  #controlsFor(kart, ctx) {
    if (kart.isPlayer) {
      const s = ctx.input.state;
      return {
        throttle: s.accel,
        brake: s.brake,
        steer: s.steer,
        drift: s.drift,
        driftPressed: s.pressed.drift,
        item: s.pressed.item,
      };
    }
    const a = kart.aiControls;
    if (a) return a;
    // No AI yet: hold the throttle and steer down the racing line so the grid
    // is never a row of parked karts during development.
    return this.#fallbackAi(kart, ctx);
  }

  /**
   * Placeholder driver, used until AISystem publishes `kart.aiControls`.
   *
   * Deliberately simple but *stable*: a proportional-derivative controller on
   * heading error towards a speed-scaled look-ahead point, biased back towards
   * the centreline, with a curvature-based speed limit so it lifts before a
   * corner instead of understeering into the scenery. It will not win a race,
   * but it keeps a full grid on the track, which is what every screenshot and
   * every other system needs from it.
   */
  #fallbackAi(kart, ctx) {
    const w = ctx.world;
    const p = w.project(kart.position);

    // Look further ahead the faster we go — but pull the aim point back in when
    // the road bends hard, or the controller sights straight across a hairpin
    // and drives into the outside barrier.
    const here = w.sampleSpline(p.u);
    const bend = Math.abs(here.curvature ?? 0);
    const tighten = 1 / (1 + bend * 42);
    const lead = (12 + Math.min(kart.speed, 30) * 0.6) * Math.max(0.32, tighten);
    const ahead = w.sampleSpline((p.u + lead / w.trackLength) % 1);

    // Aim at the centreline, pulled back towards it if we have drifted wide.
    const target = this.#d.copy(ahead.pos).addScaledVector(ahead.right, -p.lateral * 0.35);

    const to = target.sub(kart.position).setY(0);
    if (to.lengthSq() < 1e-6) return { throttle: 1, brake: 0, steer: 0, drift: false, driftPressed: false, item: false };
    to.normalize();
    const fwd = this.#rel.set(0, 0, 1).applyQuaternion(kart.quaternion).setY(0).normalize();

    // Signed heading error. `right = up x fwd` points to the chassis' +X, which
    // is screen-left, so the sign here matches the steering input convention.
    const err = Math.atan2(fwd.x * to.z - fwd.z * to.x, fwd.dot(to));
    const prev = kart._aiPrevErr ?? err;
    kart._aiPrevErr = err;
    const derivative = err - prev;

    const steer = clamp(err * 1.9 + derivative * 24, -1, 1);

    // Curvature-limited target speed, then throttle/brake towards it.
    const curve = Math.abs(ahead.curvature ?? 0);
    const limit = curve > 1e-4
      ? Math.min(kart.stats.topSpeed, Math.sqrt(9.2 / curve))
      : kart.stats.topSpeed;
    const over = kart.speed - limit;

    return {
      throttle: over > 0 ? 0 : 1,
      brake: over > 3 ? Math.min(1, (over - 3) / 6) : 0,
      steer,
      drift: false,
      driftPressed: false,
      item: false,
    };
  }

  /**
   * Three phases per step, and the order matters.
   *
   * Every body integrates before anything is resolved, so kart-on-kart contact
   * sees a consistent snapshot rather than a half-updated field where the karts
   * stepped earlier in the loop have already moved. Walls are resolved after
   * that, because a kart shoved sideways into a barrier must still end the step
   * outside it. `finalize` then rebuilds each body's basis and publishes the
   * derived state (speed, slip, up vector) the rest of the game reads.
   */
  update(dt, ctx) {
    const bodies = this.#bodies;

    for (let i = 0; i < bodies.length; i++) {
      const kart = ctx.karts[i];
      const controls = this.#controlsFor(kart, ctx);
      // Publish the resolved controls on the entity. Without these, consumers
      // (VFX skid marks, audio engine load, HUD) end up reaching into
      // `kart._body.controls`, which is solver-private.
      kart.throttleInput = controls.throttle;
      kart.brakeInput = controls.brake;
      bodies[i].integrate(dt, ctx, controls);
    }

    this.#resolveKartContacts(dt, ctx);

    for (let i = 0; i < bodies.length; i++) bodies[i].resolveWorld(dt, ctx);
    for (let i = 0; i < bodies.length; i++) bodies[i].finalize(dt, ctx);
  }

  /**
   * Elastic kart-on-kart contact.
   *
   * Momentum is split by weight so the heavy characters genuinely shove the
   * light ones, which is the whole point of the weight stat in a pack.
   */
  #resolveKartContacts(dt, ctx) {
    const karts = ctx.karts;
    const R2 = (KART_RADIUS * 2) ** 2;

    for (let i = 0; i < karts.length; i++) {
      const a = karts[i];
      if (a.frozen) continue;
      for (let j = i + 1; j < karts.length; j++) {
        const b = karts[j];
        if (b.frozen) continue;

        this.#d.copy(b.position).sub(a.position);
        const d2 = this.#d.lengthSq();
        if (d2 > R2 || d2 < 1e-6) continue;

        const dist = Math.sqrt(d2);
        const n = this.#d.multiplyScalar(1 / dist);
        const overlap = KART_RADIUS * 2 - dist;

        const wa = a.stats.weight, wb = b.stats.weight;
        const total = wa + wb;
        // push apart, heavier kart moves less
        a.position.addScaledVector(n, -overlap * (wb / total));
        b.position.addScaledVector(n, overlap * (wa / total));

        // exchange the closing component of velocity
        this.#rel.copy(b.velocity).sub(a.velocity);
        const closing = this.#rel.dot(n);
        if (closing >= 0) continue;

        const restitution = 0.42;
        const magnitude = -(1 + restitution) * closing / (1 / wa + 1 / wb);
        this.#imp.copy(n).multiplyScalar(magnitude);
        a.velocity.addScaledVector(this.#imp, -1 / wa);
        b.velocity.addScaledVector(this.#imp, 1 / wb);

        if (Math.abs(closing) > 4) {
          ctx.events.emit('kart:bump', { a, b, force: Math.abs(closing) });
        }
      }
    }
  }

  dispose() {
    this.#bodies.length = 0;
  }
}
