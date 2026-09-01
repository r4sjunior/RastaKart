import { clamp, clamp01, lerp, approach, engineWaves, noiseBuffer, crackleBuffer, driveCurve } from './dsp.js';

/**
 * =============================================================================
 *  Sustained voices — the engine, the tyres, the wind.
 * =============================================================================
 *
 *  These are the sounds that never stop, so none of them is ever created or
 *  destroyed during a race. Every voice builds its graph once and afterwards
 *  only writes AudioParams, which is the difference between an engine that
 *  tracks the throttle and one that crackles every time a kart changes state.
 *
 *  All parameter writes go through `setTargetAtTime`, never `value =`. A direct
 *  assignment steps the parameter between render quanta and that step is
 *  audible as a zipper on anything sustained; a one-pole approach at 20–60 ms
 *  is inaudible and costs the same.
 */

const SMOOTH = 0.045;      // s — parameter glide for pitch and filters
const GAIN_SMOOTH = 0.06;  // s — parameter glide for levels

/* ===========================================================================*/
/*  Engine                                                                     */
/* ===========================================================================*/

/**
 * One kart's engine.
 *
 *   [open ]--\
 *   [closed]--+--> drive --> body(lowpass) --> voice --> pan --> bus
 *   [sub   ]--/                                  ^
 *   [induction noise]---------------------------/
 *
 * Pitch comes from a pseudo-gearbox: mapping speed straight onto frequency
 * gives one long uneventful ramp, so the normalised speed is cut into four
 * ratios and the revs sweep inside each one. The result rises, drops on the
 * shift and rises again — which is what makes acceleration audible as
 * acceleration rather than as a siren.
 *
 * The `open` and `closed` wavetables are crossfaded by throttle, so lifting off
 * genuinely changes the timbre (bright bark to hollow engine braking) instead
 * of just turning the volume down.
 */
export class EngineVoice {
  /**
   * @param {AudioContext} ac
   * @param {AudioNode} out
   * @param {object} waves  from `engineWaves()`
   * @param {AudioBuffer} noiseBuf
   * @param {object} o  { full:boolean, idle:number, top:number }
   */
  constructor(ac, out, waves, noiseBuf, o = {}) {
    this.ac = ac;
    this.full = o.full !== false;
    this.idleHz = o.idle ?? 46;
    this.topHz = o.top ?? 186;
    this.gears = 4;
    this.rev = 0;
    this.started = false;

    const t = ac.currentTime;

    this.pan = ac.createStereoPanner ? ac.createStereoPanner() : null;
    this.voice = ac.createGain();
    this.voice.gain.value = 0;
    if (this.pan) { this.voice.connect(this.pan); this.pan.connect(out); }
    else this.voice.connect(out);

    // Body filter doubles as the distance cue: a kart across the valley is not
    // just quieter, it has lost its top end.
    this.body = ac.createBiquadFilter();
    this.body.type = 'lowpass';
    this.body.frequency.value = 3200;
    this.body.Q.value = 0.6;
    this.body.connect(this.voice);

    this.drive = ac.createWaveShaper();
    this.drive.curve = driveCurve(2048, this.full ? 2.1 : 1.4);
    this.drive.oversample = this.full ? '2x' : 'none';
    this.drive.connect(this.body);

    const osc = (wave, gain) => {
      const o1 = ac.createOscillator();
      o1.setPeriodicWave(wave);
      o1.frequency.value = this.idleHz;
      const g = ac.createGain();
      g.gain.value = gain;
      o1.connect(g); g.connect(this.drive);
      return { osc: o1, gain: g };
    };

    this.sub = osc(waves.sub, 0.55);
    this.open = osc(waves.open, 0.0);
    this.closed = osc(waves.closed, 0.35);

    if (this.full && noiseBuf) {
      // induction roar: noise band that opens with revs
      this.noiseSrc = ac.createBufferSource();
      this.noiseSrc.buffer = noiseBuf;
      this.noiseSrc.loop = true;
      this.noiseFilter = ac.createBiquadFilter();
      this.noiseFilter.type = 'bandpass';
      this.noiseFilter.frequency.value = 700;
      this.noiseFilter.Q.value = 0.8;
      this.noiseGain = ac.createGain();
      this.noiseGain.gain.value = 0;
      this.noiseSrc.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.drive);
    }
  }

  start() {
    if (this.started) return;
    this.started = true;
    const t = this.ac.currentTime + 0.02;
    for (const v of [this.sub, this.open, this.closed]) v.osc.start(t);
    this.noiseSrc?.start(t, 0);
  }

  /**
   * @param {object} s  { speedN, throttle, brake, boost, airborne, level, pan, cutoff }
   */
  set(s) {
    const ac = this.ac;
    const t = ac.currentTime;
    const speedN = clamp01(s.speedN);

    // ---- pseudo-gearbox --------------------------------------------------
    const scaled = speedN * this.gears;
    const gear = Math.min(this.gears - 1, Math.floor(scaled));
    const within = scaled - gear;
    // revs never fall to zero on a shift; a kart engine keeps loading
    let rev = 0.30 + 0.70 * within;
    // boost pins it against the limiter
    if (s.boost > 0) rev = Math.min(1.12, rev + 0.22);
    // in the air the engine unloads and screams
    if (s.airborne) rev = Math.min(1.15, rev + 0.10);

    const hz = lerp(this.idleHz, this.topHz, rev);
    this.sub.osc.frequency.setTargetAtTime(hz * 0.5, t, SMOOTH);
    this.open.osc.frequency.setTargetAtTime(hz, t, SMOOTH);
    this.closed.osc.frequency.setTargetAtTime(hz, t, SMOOTH);

    // ---- timbre ----------------------------------------------------------
    const th = clamp01(s.throttle);
    const openG = 0.10 + 0.50 * th;
    const closedG = 0.34 * (1 - th * 0.75);
    this.open.gain.gain.setTargetAtTime(openG, t, GAIN_SMOOTH);
    this.closed.gain.gain.setTargetAtTime(closedG, t, GAIN_SMOOTH);
    this.sub.gain.gain.setTargetAtTime(0.42 + 0.22 * th, t, GAIN_SMOOTH);

    if (this.noiseGain) {
      this.noiseGain.gain.setTargetAtTime(0.05 + 0.16 * th * speedN, t, GAIN_SMOOTH);
      this.noiseFilter.frequency.setTargetAtTime(420 + 2600 * speedN, t, SMOOTH);
    }

    // ---- placement -------------------------------------------------------
    this.body.frequency.setTargetAtTime(clamp(s.cutoff ?? 3200, 260, 12000), t, 0.08);
    this.voice.gain.setTargetAtTime(clamp01(s.level), t, GAIN_SMOOTH);
    if (this.pan) this.pan.pan.setTargetAtTime(clamp(s.pan ?? 0, -1, 1), t, 0.08);
  }

  silence() {
    this.voice.gain.setTargetAtTime(0, this.ac.currentTime, 0.08);
  }

  dispose() {
    try {
      for (const v of [this.sub, this.open, this.closed]) { v.osc.stop(); v.osc.disconnect(); v.gain.disconnect(); }
      this.noiseSrc?.stop();
      this.noiseSrc?.disconnect();
      this.noiseFilter?.disconnect();
      this.noiseGain?.disconnect();
      this.drive.disconnect();
      this.body.disconnect();
      this.voice.disconnect();
      this.pan?.disconnect();
    } catch { /* context gone */ }
  }
}

/* ===========================================================================*/
/*  Tyres, surface and wind — player only                                      */
/* ===========================================================================*/

/**
 * The layer that actually sells speed.
 *
 * Three permanently running noise beds, each with its own filter and level:
 *
 *   roll  — tyre contact. Filter and level follow the surface, so tarmac is a
 *           tight high hiss and dirt is a broad low rumble with grit under it.
 *   skid  — the scrub of a sliding tyre; opens only while drifting or locked.
 *   wind  — buffeting, driven by speed alone.
 *
 * Nothing here is ever retriggered. Changing surface is a filter move, which is
 * why crossing from tarmac to sand sounds like a transition rather than like
 * one sample stopping and another starting.
 */
export class SurfaceVoice {
  constructor(ac, out, rng, quality = 'high') {
    this.ac = ac;
    this.state = { roll: 0, skid: 0, wind: 0 };

    const white = noiseBuffer(ac, rng.fork(11), quality === 'low' ? 1.2 : 2.4, 'white', 2);
    const pink = noiseBuffer(ac, rng.fork(12), quality === 'low' ? 1.2 : 2.4, 'pink', 2);
    const grit = crackleBuffer(ac, rng.fork(13), 1.6, 300, 0.0032);

    const layer = (buf, type, hz, q, loopRate = 1) => {
      const src = ac.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.playbackRate.value = loopRate;
      const f = ac.createBiquadFilter();
      f.type = type;
      f.frequency.value = hz;
      f.Q.value = q;
      const g = ac.createGain();
      g.gain.value = 0;
      src.connect(f); f.connect(g); g.connect(out);
      return { src, f, g };
    };

    this.roll = layer(pink, 'bandpass', 900, 0.7);
    this.grit = layer(grit, 'bandpass', 1800, 0.9);
    this.skid = layer(white, 'bandpass', 2400, 2.2);
    this.wind = layer(white, 'lowpass', 700, 0.5);
    this.started = false;
  }

  start() {
    if (this.started) return;
    this.started = true;
    const t = this.ac.currentTime + 0.02;
    for (const l of [this.roll, this.grit, this.skid, this.wind]) l.src.start(t, 0);
  }

  /**
   * @param {object} s
   *   speedN 0..1, surface string, drift 0..1, brake 0..1, airborne bool
   */
  set(s) {
    const t = this.ac.currentTime;
    const sp = clamp01(s.speedN);
    const air = s.airborne ? 0.12 : 1;

    // ---- rolling ---------------------------------------------------------
    const S = SURFACE_TONE[s.surface] ?? SURFACE_TONE.road;
    const rollLevel = S.level * (0.10 + 0.90 * sp) * air;
    this.roll.g.gain.setTargetAtTime(rollLevel, t, GAIN_SMOOTH);
    this.roll.f.frequency.setTargetAtTime(S.hz * (0.7 + 0.6 * sp), t, 0.09);
    this.roll.f.Q.setTargetAtTime(S.q, t, 0.09);
    this.roll.src.playbackRate.setTargetAtTime(0.85 + 0.5 * sp, t, 0.12);

    this.grit.g.gain.setTargetAtTime(S.grit * (0.15 + 0.85 * sp) * air, t, GAIN_SMOOTH);
    this.grit.f.frequency.setTargetAtTime(S.gritHz, t, 0.12);

    // ---- scrub -----------------------------------------------------------
    const scrub = clamp01(Math.max(s.drift, s.brake * 0.75)) * sp * air;
    this.skid.g.gain.setTargetAtTime(scrub * 0.30, t, 0.05);
    this.skid.f.frequency.setTargetAtTime(1500 + 2600 * sp, t, 0.07);

    // ---- wind ------------------------------------------------------------
    // cubic: barely there at half speed, unmistakable flat out
    const w = sp * sp * sp;
    this.wind.g.gain.setTargetAtTime(w * 0.34, t, 0.10);
    this.wind.f.frequency.setTargetAtTime(360 + 2400 * sp, t, 0.10);
  }

  silence() {
    const t = this.ac.currentTime;
    for (const l of [this.roll, this.grit, this.skid, this.wind]) {
      l.g.gain.setTargetAtTime(0, t, 0.1);
    }
  }

  dispose() {
    try {
      for (const l of [this.roll, this.grit, this.skid, this.wind]) {
        l.src.stop(); l.src.disconnect(); l.f.disconnect(); l.g.disconnect();
      }
    } catch { /* context gone */ }
  }
}

/** Per-surface rolling tone. `grit` is how much hard debris rattles under it. */
const SURFACE_TONE = {
  road:  { level: 0.15, hz: 1500, q: 0.8, grit: 0.020, gritHz: 3000 },
  boost: { level: 0.16, hz: 1600, q: 0.8, grit: 0.022, gritHz: 3100 },
  dirt:  { level: 0.30, hz: 520, q: 0.5, grit: 0.130, gritHz: 1700 },
  sand:  { level: 0.28, hz: 430, q: 0.5, grit: 0.090, gritHz: 1300 },
  grass: { level: 0.24, hz: 640, q: 0.6, grit: 0.075, gritHz: 2000 },
  water: { level: 0.34, hz: 900, q: 0.4, grit: 0.045, gritHz: 2600 },
};

export { SURFACE_TONE };
