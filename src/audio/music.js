import { clamp, clamp01, lerp, midiToHz, ampEnv, noiseBuffer } from './dsp.js';

/**
 * =============================================================================
 *  Music bed — a riddim, generated bar by bar.
 * =============================================================================
 *
 *  No track file, no loop point. A lookahead scheduler walks a bar of a reggae
 *  one-drop and emits the notes a fraction of a second before they are due, so
 *  the music is sample-accurate on the audio clock and completely independent
 *  of the frame rate. `lateUpdate` may run at 30 fps or 240 fps or, inside the
 *  screenshot harness, thousands of times in a burst — the scheduler only ever
 *  looks at `ac.currentTime`, so none of that reaches the music.
 *
 *  The arrangement is the genre in its shortest form:
 *
 *    bass    root on the "and" of 1 and on 3, with the downbeat left empty —
 *            the rest on beat 1 is the whole feel
 *    skank   clipped chord on every offbeat eighth
 *    drop    kick and rim together on beat 3, nothing on beat 1
 *    hats    closed eighths, quiet, slightly swung
 *
 *  `intensity` opens the filter, lifts the skank and adds the organ; the race
 *  director drives it from the countdown, the final lap and the finish.
 */

const BPM = 78;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const LOOKAHEAD = 0.55;      // s of音 scheduled ahead of the clock
const SWING = 0.055;         // s pushed onto every offbeat eighth

/** Dm - Bb - F - C, one bar each: minor, warm, and it never resolves hard. */
const PROG = [
  { root: 38, chord: [50, 53, 57] },   // Dm
  { root: 34, chord: [46, 50, 53] },   // Bb
  { root: 29, chord: [45, 48, 53] },   // F
  { root: 36, chord: [48, 52, 55] },   // C
];

export class MusicBed {
  constructor(ac, out, rng, quality = 'high') {
    this.ac = ac;
    this.rng = rng;
    this.bar = 0;
    this.nextBarAt = 0;
    this.intensity = 0.55;
    this.playing = false;
    this.voices = 0;

    this.input = ac.createGain();
    this.input.gain.value = 0;
    this.input.connect(out);

    // One shared colour filter: raising intensity opens the whole bed at once,
    // which reads as the music "leaning in" rather than as a volume change.
    this.tone = ac.createBiquadFilter();
    this.tone.type = 'lowpass';
    this.tone.frequency.value = 2400;
    this.tone.Q.value = 0.7;
    this.tone.connect(this.input);

    this.noise = noiseBuffer(ac, rng.fork(21), quality === 'low' ? 0.8 : 1.4, 'white', 1);

    // A short delay on the skank is the other half of the genre.
    this.delay = ac.createDelay(1.2);
    this.delay.delayTime.value = BEAT * 0.75;
    this.fb = ac.createGain();
    this.fb.gain.value = quality === 'low' ? 0.18 : 0.32;
    this.dampen = ac.createBiquadFilter();
    this.dampen.type = 'lowpass';
    this.dampen.frequency.value = 1900;
    this.delay.connect(this.dampen);
    this.dampen.connect(this.fb);
    this.fb.connect(this.delay);
    this.delay.connect(this.tone);
  }

  start() {
    if (this.playing) return;
    this.playing = true;
    this.nextBarAt = this.ac.currentTime + 0.12;
    this.setLevel(1, 1.2);
  }

  stop(fade = 0.6) {
    this.playing = false;
    this.setLevel(0, fade);
  }

  setLevel(v, seconds = 0.5) {
    const t = this.ac.currentTime;
    this.input.gain.cancelScheduledValues(t);
    this.input.gain.setValueAtTime(this.input.gain.value, t);
    this.input.gain.linearRampToValueAtTime(clamp01(v), t + seconds);
  }

  /** 0..1 — opens the filter and brings the organ up. */
  setIntensity(v) {
    this.intensity = clamp01(v);
    this.tone.frequency.setTargetAtTime(
      lerp(1500, 5200, this.intensity), this.ac.currentTime, 0.5);
  }

  /* --------------------------------------------------------------- voices */

  #env(t0, dur, peak, attack = 0.004) {
    const g = this.ac.createGain();
    const end = ampEnv(g.gain, t0, { peak, attack, decay: dur });
    return { g, end };
  }

  #osc(type, hz, t0, dur, peak, dest, detune = 0) {
    const o = this.ac.createOscillator();
    o.type = type;
    o.frequency.value = hz;
    if (detune) o.detune.value = detune;
    const { g, end } = this.#env(t0, dur, peak);
    o.connect(g); g.connect(dest ?? this.tone);
    o.start(t0); o.stop(end + 0.03);
  }

  #bass(midi, t0, dur) {
    const hz = midiToHz(midi);
    // sine body plus a touch of triangle so it survives a phone speaker
    this.#osc('sine', hz, t0, dur, 0.42);
    this.#osc('triangle', hz * 2, t0, dur * 0.5, 0.055);
  }

  #skank(chord, t0) {
    const dur = 0.11;
    const lvl = 0.055 + 0.06 * this.intensity;
    const bus = this.ac.createGain();
    bus.gain.value = 1;
    bus.connect(this.tone);
    bus.connect(this.delay);
    for (const n of chord) {
      this.#osc('square', midiToHz(n), t0, dur, lvl, bus, -4);
      this.#osc('square', midiToHz(n), t0, dur, lvl * 0.7, bus, +5);
    }
  }

  #organ(chord, t0, dur) {
    const lvl = 0.020 * this.intensity;
    if (lvl < 0.004) return;
    for (const n of chord) {
      this.#osc('sine', midiToHz(n + 12), t0, dur, lvl);
      this.#osc('sine', midiToHz(n + 19), t0, dur, lvl * 0.5);
    }
  }

  #kick(t0) {
    const o = this.ac.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(128, t0);
    o.frequency.exponentialRampToValueAtTime(41, t0 + 0.10);
    const { g, end } = this.#env(t0, 0.30, 0.62, 0.002);
    o.connect(g); g.connect(this.tone);
    o.start(t0); o.stop(end + 0.03);
  }

  #rim(t0) {
    const s = this.ac.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    const f = this.ac.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 2100;
    f.Q.value = 6;
    const { g, end } = this.#env(t0, 0.10, 0.28, 0.001);
    s.connect(f); f.connect(g); g.connect(this.tone);
    g.connect(this.delay);
    s.start(t0, 0); s.stop(end + 0.03);
  }

  #hat(t0, open) {
    const s = this.ac.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    const f = this.ac.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7200;
    const { g, end } = this.#env(t0, open ? 0.13 : 0.035, 0.085, 0.001);
    s.connect(f); f.connect(g); g.connect(this.tone);
    s.start(t0, 0.3); s.stop(end + 0.03);
  }

  /* ------------------------------------------------------------ scheduler */

  /** Call once per frame. Emits any bar that starts inside the lookahead. */
  schedule() {
    if (!this.playing) return;
    const now = this.ac.currentTime;
    // A tab that was hidden for a minute must not try to catch up on 20 bars.
    if (this.nextBarAt < now - BAR) this.nextBarAt = now + 0.05;

    let guard = 0;
    while (this.nextBarAt < now + LOOKAHEAD && guard++ < 4) {
      this.#bar(this.nextBarAt, PROG[this.bar % PROG.length]);
      this.bar++;
      this.nextBarAt += BAR;
    }
  }

  #bar(t0, ch) {
    const E = BEAT / 2;

    // bass: rest on 1, then the "and" of 1, beat 3, and the "and" of 3
    this.#bass(ch.root, t0 + E, BEAT * 0.55);
    this.#bass(ch.root, t0 + BEAT * 2, BEAT * 0.5);
    this.#bass(ch.root + (this.bar % 2 ? 7 : 5), t0 + BEAT * 2 + E, BEAT * 0.45);

    // skank on every offbeat eighth, pushed late for the swing
    for (let b = 0; b < 4; b++) this.#skank(ch.chord, t0 + b * BEAT + E + SWING);

    // one drop: nothing on beat 1, kick and rim together on beat 3
    this.#kick(t0 + BEAT * 2);
    this.#rim(t0 + BEAT * 2);
    if (this.intensity > 0.7) this.#kick(t0 + BEAT * 3 + E);

    // hats
    for (let i = 0; i < 8; i++) {
      const at = t0 + i * E + (i % 2 ? SWING : 0);
      this.#hat(at, i === 7);
    }

    this.#organ(ch.chord, t0, BAR * 0.9);
  }

  dispose() {
    try {
      this.input.disconnect();
      this.tone.disconnect();
      this.delay.disconnect();
      this.fb.disconnect();
      this.dampen.disconnect();
    } catch { /* context gone */ }
  }
}
