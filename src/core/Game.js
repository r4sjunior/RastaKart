import * as THREE from 'three';
import { EventBus } from './EventBus.js';
import { Rng } from './Rng.js';
import { Input } from './Input.js';

export const FIXED_DT = 1 / 120;   // physics step (s)
const MAX_STEPS = 8;               // spiral-of-death guard

/**
 * Game owns the frame loop and the shared `ctx` object. It knows nothing about
 * karts, tracks or items: every feature is a System registered against it.
 *
 * A System is `{ name, order?, init?(ctx), update?(dt, ctx), lateUpdate?(dt, ctx),
 *                render?(alpha, ctx), resize?(w, h, ctx), dispose?() }`
 * `update` runs on the fixed step; `lateUpdate` and `render` run once per frame.
 */
export class Game {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.opts = opts;
    this.systems = [];
    this.running = false;
    this._acc = 0;
    this._last = 0;
    this._raf = 0;

    this.ctx = {
      game: this,
      canvas,
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(62, 16 / 9, 0.1, 4000),
      renderer: null,        // render system fills these in
      composer: null,
      world: null,           // world system fills in (ground/spline queries)
      karts: [],             // physics/AI push KartEntity records here
      player: null,
      events: new EventBus(),
      rng: new Rng(opts.seed ?? 1337),
      input: new Input(),
      assets: null,
      time: { t: 0, dt: 0, frame: 0, scale: 1 },
      race: { state: 'idle', lap: 1, totalLaps: 3, countdown: 3, timeMs: 0 },
      quality: opts.quality ?? 'high',
      debug: { enabled: false, freeze: false },
      viewport: { w: 1, h: 1, dpr: 1 },
    };
  }

  add(system) {
    this.systems.push(system);
    this.systems.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
    return system;
  }

  get(name) { return this.systems.find((s) => s.name === name); }

  async init() {
    for (const s of this.systems) {
      if (s.init) await s.init(this.ctx);
    }
    this.resize();
    window.addEventListener('resize', this._onResize = () => this.resize());
    return this;
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr ?? 2);
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    Object.assign(this.ctx.viewport, { w, h, dpr });
    this.ctx.camera.aspect = w / h;
    this.ctx.camera.updateProjectionMatrix();
    for (const s of this.systems) s.resize?.(w, h, this.ctx);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._last = performance.now();
    const tick = (now) => {
      this._raf = requestAnimationFrame(tick);
      this.frame((now - this._last) / 1000);
      this._last = now;
    };
    this._raf = requestAnimationFrame(tick);
  }

  stop() { this.running = false; cancelAnimationFrame(this._raf); }

  /** Advance one display frame. `raw` is wall-clock delta in seconds. */
  frame(raw) {
    const ctx = this.ctx;
    const dt = Math.min(raw, 0.25) * ctx.time.scale;
    ctx.input.update(ctx.time.t);

    this._acc += dt;
    let steps = 0;
    while (this._acc >= FIXED_DT && steps < MAX_STEPS) {
      if (!ctx.debug.freeze) this.step(FIXED_DT);
      this._acc -= FIXED_DT;
      steps++;
    }
    if (steps === MAX_STEPS) this._acc = 0;

    const alpha = this._acc / FIXED_DT;
    ctx.time.dt = dt;
    ctx.time.frame++;
    for (const s of this.systems) s.lateUpdate?.(dt, ctx);
    for (const s of this.systems) s.render?.(alpha, ctx);
  }

  step(dt) {
    const ctx = this.ctx;
    ctx.time.t += dt;
    for (const s of this.systems) s.update?.(dt, ctx);
  }

  /**
   * Deterministic advance used by the screenshot harness.
   *
   * `lateUpdate` has to run on the same cadence it would during real play, not
   * once at the end: anything that smooths towards a target — the chase camera
   * above all — converges over many frames, and calling it once leaves the
   * camera stranded wherever the simulation started.
   */
  simulate(seconds) {
    const steps = Math.round(seconds / FIXED_DT);
    const stepsPerFrame = 2;               // 120 Hz physics, 60 Hz presentation
    const frameDt = FIXED_DT * stepsPerFrame;
    const ctx = this.ctx;

    for (let i = 0; i < steps; i++) {
      ctx.input.update(ctx.time.t);
      this.step(FIXED_DT);
      if ((i + 1) % stepsPerFrame === 0) {
        ctx.time.dt = frameDt;
        ctx.time.frame++;
        for (const s of this.systems) s.lateUpdate?.(frameDt, ctx);
      }
    }
  }

  renderOnce() {
    for (const s of this.systems) s.render?.(0, this.ctx);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this._onResize);
    for (const s of [...this.systems].reverse()) s.dispose?.();
    this.ctx.input.dispose();
    this.ctx.events.clear();
    this.systems.length = 0;
  }
}
