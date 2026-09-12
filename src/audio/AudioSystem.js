import * as THREE from 'three';
import { clamp, clamp01, noiseBuffer, engineWaves } from './dsp.js';
import { Mixer } from './Mixer.js';
import { EngineVoice, SurfaceVoice } from './voices.js';
import { MusicBed } from './music.js';
import { renderBank } from './sfx.js';

/**
 * ============================================================================
 *  AudioSystem — wires the procedural engine/mixer/sfx/music banks together.
 * ============================================================================
 *
 *  Nothing here generates a waveform itself — that is Mixer, voices.js,
 *  music.js and sfx.js, all of which existed and worked in isolation but were
 *  never connected to a running game. This file is the connection: one engine
 *  voice per kart, one surface voice for the player, the one-shot bank fired
 *  off the game's own event bus, and a reggae bed the race director drives by
 *  intensity.
 *
 *  Positioning is deliberately simple and consistent with the rest of the
 *  audio code (which never touches PannerNode/AudioListener): a StereoPanner
 *  fed by the sound's position relative to the camera's right axis, and a
 *  gain fed by distance. That is enough for "that shell came from my left"
 *  without the cost or the browser quirks of full 3D panning.
 */

const ENGINE_FALLOFF = 18;      // metres — level ~= 1 / (1 + (d/this)^2)
const SFX_MAX_DIST = 130;       // metres — one-shots beyond this are skipped
const WET_SOUNDS = new Set(['wall', 'hit', 'bump', 'explode', 'land', 'boost', 'squash', 'go', 'finish']);

/** Direct event -> one-shot mappings that need no extra logic. */
const KART_SFX = {
  'kart:hit': (e) => ({ name: 'hit', position: e.kart?.position, volume: 0.8 }),
  'kart:wall': (e) => ({ name: 'wall', position: e.kart?.position, volume: clamp(e.strength ?? 0.6, 0.15, 1) }),
  'kart:bump': (e) => ({ name: 'bump', position: e.a?.position, volume: clamp01((e.force ?? 6) / 14) }),
  'kart:hop': (e) => ({ name: 'hop', position: e.kart?.position, volume: 0.30 }),
  'kart:trick': (e) => ({ name: 'trick', position: e.kart?.position, volume: 0.55 }),
  'kart:boost': (e) => ({ name: 'boost', position: e.kart?.position, volume: e.source === 'pad' ? 0.35 : 0.6 }),
  'kart:squash': (e) => ({ name: 'squash', position: e.kart?.position, volume: 0.75 }),
  'item:explode': (e) => ({ name: 'explode', position: e.position, volume: 1 }),
};

export class AudioSystem {
  name = 'audio'; order = 80;

  #rel = new THREE.Vector3();
  #right = new THREE.Vector3();
  #offs = [];

  async init(ctx) {
    this.ctx = ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { ctx.audio = this.#noopApi(); return; }

    this.ac = new AC();
    this.rng = ctx.rng.fork(0x0a0d10);
    this.mixer = new Mixer(this.ac, this.rng.fork(1), ctx.quality);

    // Browsers refuse to run an AudioContext before a user gesture. The game
    // boots and starts driving straight away, so resume opportunistically on
    // the first click/key/touch rather than gating the boot sequence on it.
    this._resume = () => { this.ac.resume().catch(() => {}); };
    window.addEventListener('pointerdown', this._resume);
    window.addEventListener('keydown', this._resume);
    window.addEventListener('touchstart', this._resume, { passive: true });
    this._resume();

    ctx.onProgress?.(0.94, 'sintetizando o som');
    this.bank = await renderBank(this.ac.sampleRate, this.rng.fork(2), ctx.quality);

    const waves = engineWaves(this.ac, this.rng.fork(3));
    const engineNoise = noiseBuffer(this.ac, this.rng.fork(4), ctx.quality === 'low' ? 1.2 : 2.0, 'white', 1);

    this.engines = ctx.karts.map((k, i) => {
      const top = 150 + clamp01(((k.stats?.topSpeed ?? 26) - 24) / 6) * 55;
      const e = new EngineVoice(this.ac, this.mixer.bus('engine'), waves, engineNoise, {
        full: k.isPlayer, idle: 40 + (i % 4) * 3, top,
      });
      e.start();
      return e;
    });

    this.surface = new SurfaceVoice(this.ac, this.mixer.bus('sfx'), this.rng.fork(5), ctx.quality);
    this.surface.start();

    this.music = new MusicBed(this.ac, this.mixer.bus('music'), this.rng.fork(6), ctx.quality);
    this.music.start();

    this._muteKey = (e) => { if (e.code === 'KeyM') this.mixer.setMuted(!this.mixer.muted); };
    window.addEventListener('keydown', this._muteKey);

    this.#bindEvents(ctx);

    ctx.audio = {
      setMuted: (v) => this.mixer.setMuted(v),
      setBusVolume: (name, v) => this.mixer.setBusVolume(name, v),
      getBusVolume: (name) => this.mixer.getBusVolume(name),
      get muted() { return this.mixer?.muted ?? false; },
    };

    ctx.onProgress?.(0.98, 'ligando os motores');
  }

  #noopApi() {
    return { setMuted() {}, setBusVolume() {}, getBusVolume: () => 0, muted: false };
  }

  #bindEvents(ctx) {
    const on = (t, f) => this.#offs.push(ctx.events.on(t, f));

    on('audio:sfx', (e) => this.#play(e?.name, e));
    for (const [type, map] of Object.entries(KART_SFX)) {
      on(type, (e) => { const o = map(e); this.#play(o.name, o); });
    }

    // A drift hop barely leaves the ground; only a real fall should be heard.
    on('kart:land', (e) => {
      if (e?.hard) this.#play('land', { position: e.kart?.position, volume: clamp01(e.strength ?? 0.6) });
    });
    on('kart:drift-tier', (e) => {
      if (e?.tier > 0) this.#play(`drift-${e.tier}`, { position: e.kart?.position, volume: 0.55 });
    });
    on('kart:offroad', (e) => {
      if (e?.entering) this.#play('offroad', { position: e.kart?.position, volume: 0.35 });
    });

    on('race:countdown', (e) => {
      if (e?.n > 0) this.#play('count', { volume: 0.5 });
      else {
        this.#play('go', { volume: 0.85 });
        this.mixer.duck('music', 0.45, 0.4);
        this.music.setIntensity(0.75);
      }
    });
    on('race:lap', (e) => {
      if (!e?.kart?.isPlayer) return;
      this.#play('lap', { volume: 0.6 });
      if (e.final) this.music.setIntensity(1);
    });
    on('race:finish', (e) => {
      if (!e?.kart?.isPlayer) return;
      this.#play('finish', { volume: 0.85 });
      this.mixer.duck('music', 0.5, 0.6);
      this.music.setIntensity(0.35);
    });
    on('race:results', () => this.music.stop(1.4));
  }

  /* ------------------------------------------------------------- one-shots */

  #spatial(pos) {
    const cam = this.ctx.camera;
    this.#rel.copy(pos).sub(cam.position);
    const dist = this.#rel.length();
    this.#right.set(1, 0, 0).applyQuaternion(cam.quaternion);
    const pan = dist > 0.05 ? clamp(this.#rel.dot(this.#right) / Math.max(3, dist), -1, 1) : 0;
    return { dist, pan };
  }

  #play(name, opts = {}) {
    if (!this.ac || !this.bank || !name) return;
    const buf = this.bank[name];
    if (!buf) return;

    let gain = clamp01(opts.volume ?? 1);
    let pan = 0;
    if (opts.position) {
      const { dist, pan: p } = this.#spatial(opts.position);
      if (dist > SFX_MAX_DIST) return;
      gain *= clamp01(1 - dist / SFX_MAX_DIST);
      pan = p;
    }
    if (gain < 0.01) return;

    const src = this.ac.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = 0.97 + this.rng.next() * 0.06;   // de-phases identical repeats

    const g = this.ac.createGain();
    g.gain.value = gain;
    src.connect(g);

    let node = g;
    if (this.ac.createStereoPanner) {
      const panner = this.ac.createStereoPanner();
      panner.pan.value = pan;
      g.connect(panner);
      node = panner;
    }
    node.connect(this.mixer.bus('sfx'));

    if (WET_SOUNDS.has(name)) {
      const send = this.ac.createGain();
      send.gain.value = gain * 0.22;
      src.connect(send);
      send.connect(this.mixer.reverbSend);
    }

    src.start();
    src.stop(this.ac.currentTime + buf.duration + 0.05);
  }

  /* ---------------------------------------------------------- continuous */

  lateUpdate(dt, ctx) {
    if (!this.ac) return;
    this.music?.schedule();

    const karts = ctx.karts;
    for (let i = 0; i < this.engines.length; i++) {
      const k = karts[i];
      const eng = this.engines[i];
      if (!k || !eng) continue;
      const { dist, pan } = this.#spatial(k.position);
      const level = 1 / (1 + (dist / ENGINE_FALLOFF) ** 2);
      if (level < 0.004) { eng.silence(); continue; }
      eng.set({
        speedN: clamp01(k.speed / Math.max(1, k.stats?.topSpeed ?? 26)),
        throttle: k.throttleInput ?? 0,
        brake: k.brakeInput ?? 0,
        boost: k.boost?.timer ?? 0,
        airborne: !!k.airborne,
        level,
        pan,
        cutoff: 1100 + 2600 * clamp01(1 - dist / 70),
      });
    }

    const player = ctx.player;
    if (player && this.surface) {
      this.surface.set({
        speedN: clamp01(player.speed / Math.max(1, player.stats?.topSpeed ?? 26)),
        surface: player.surface,
        drift: player.drift?.active ? clamp01(Math.abs(player.slipAngle ?? 0) / 0.6) : 0,
        brake: player.brakeInput ?? 0,
        airborne: !!player.airborne,
      });
    }
  }

  dispose() {
    for (const off of this.#offs) off?.();
    this.#offs.length = 0;
    window.removeEventListener('pointerdown', this._resume);
    window.removeEventListener('keydown', this._resume);
    window.removeEventListener('touchstart', this._resume);
    if (this._muteKey) window.removeEventListener('keydown', this._muteKey);

    this.engines?.forEach((e) => e.dispose());
    this.surface?.dispose();
    this.music?.dispose();
    this.mixer?.dispose();
    this.ac?.close?.().catch(() => {});
  }
}
