import {
  TAU, clamp, clamp01, lerp, noiseBuffer, crackleBuffer,
  ampEnv, adsr, deClick, trimPeak, midiToHz,
} from './dsp.js';

/**
 * =============================================================================
 *  One-shot sound bank — rendered, not loaded.
 * =============================================================================
 *
 *  Every sound in the game is synthesised into an AudioBuffer once at boot
 *  inside an OfflineAudioContext, then played back with a BufferSource. There
 *  is not a single audio file in the project.
 *
 *  Rendering offline rather than building the voice live at each trigger buys
 *  three things that matter here:
 *
 *    * a trigger costs one BufferSource and one Gain instead of the eight to
 *      twenty nodes these patches use, so a pile-up of impacts cannot stall
 *      the audio thread;
 *    * the result can be peak-trimmed and de-clicked as a finished asset, so
 *      no sound can spike the master or tick at its edges;
 *    * it is deterministic. Same seed, same samples — the offline audit in
 *      `_audit.mjs` measures the same buffers the game plays.
 *
 *  The palette is Mario Kart's, read off the reference: bright, short, tuned to
 *  a scale rather than noise-only, with a hard transient and almost no tail.
 *  Anything that needs a tail gets it from the reverb send, not from its own
 *  decay, so the wet amount stays under the mixer's control.
 */

/* ------------------------------------------------------------------ scales */

// D minor pentatonic: every pitched sound in the game is drawn from this so
// the item stingers, the lap chime and the music bed can never disagree.
const SCALE = [50, 53, 55, 57, 60, 62, 65, 67, 69, 72, 74, 77, 79, 81, 84];
const deg = (i) => midiToHz(SCALE[clamp(i, 0, SCALE.length - 1)]);

/* ------------------------------------------------------------- primitives */

/** Oscillator voice with an exponential pitch sweep and an AD envelope. */
function tone(oac, out, o) {
  const t0 = o.t0 ?? 0;
  const osc = oac.createOscillator();
  if (o.wave) osc.setPeriodicWave(o.wave);
  else osc.type = o.type ?? 'sine';
  osc.frequency.setValueAtTime(Math.max(20, o.f0), t0);
  if (o.f1 && o.f1 !== o.f0) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.f1), t0 + (o.glide ?? o.dur));
  }
  const g = oac.createGain();
  const end = ampEnv(g.gain, t0, {
    peak: o.peak ?? 0.5,
    attack: o.attack ?? 0.004,
    hold: o.hold ?? 0,
    decay: o.dur ?? 0.2,
  });
  osc.connect(g);
  if (o.pan !== undefined && oac.createStereoPanner) {
    const p = oac.createStereoPanner();
    p.pan.value = clamp(o.pan, -1, 1);
    g.connect(p); p.connect(out);
  } else {
    g.connect(out);
  }
  osc.start(t0);
  osc.stop(end + 0.02);
  return end;
}

/** Filtered noise burst. `buf` is a pre-made looping noise bed. */
function noise(oac, out, buf, o) {
  const t0 = o.t0 ?? 0;
  const src = oac.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.playbackRate.value = o.rate ?? 1;

  const f = oac.createBiquadFilter();
  f.type = o.filter ?? 'bandpass';
  f.frequency.setValueAtTime(Math.max(40, o.hz0 ?? 1200), t0);
  if (o.hz1) f.frequency.exponentialRampToValueAtTime(Math.max(40, o.hz1), t0 + (o.dur ?? 0.2));
  f.Q.value = o.q ?? 1;

  const g = oac.createGain();
  const end = ampEnv(g.gain, t0, {
    peak: o.peak ?? 0.4,
    attack: o.attack ?? 0.003,
    hold: o.hold ?? 0,
    decay: o.dur ?? 0.2,
  });

  src.connect(f); f.connect(g); g.connect(out);
  src.start(t0, (o.offset ?? 0) % buf.duration);
  src.stop(end + 0.02);
  return end;
}

/** Short pitched click used as the attack transient on impacts. */
function click(oac, out, o) {
  return tone(oac, out, {
    type: 'triangle', f0: o.f0 ?? 1800, f1: o.f1 ?? 220,
    t0: o.t0 ?? 0, dur: o.dur ?? 0.035, glide: o.glide ?? 0.02,
    peak: o.peak ?? 0.5, attack: 0.001,
  });
}

/* --------------------------------------------------------------- renderers */

/**
 * Each entry returns the buffer length it needs and fills the graph. Keeping
 * the length next to the patch stops the bank from rendering three seconds of
 * silence after a 90 ms tick.
 */
const PATCHES = {
  /* ---- items ---------------------------------------------------------- */

  'item-get': (oac, out, k) => {
    // rising four-note arpeggio, the classic "roulette landed" flourish
    for (let i = 0; i < 4; i++) {
      tone(oac, out, {
        type: 'triangle', f0: deg(4 + i * 2), f1: deg(4 + i * 2),
        t0: i * 0.045, dur: 0.16, peak: 0.34 - i * 0.03, attack: 0.003,
      });
      tone(oac, out, {
        type: 'sine', f0: deg(4 + i * 2) * 2, f1: deg(4 + i * 2) * 2,
        t0: i * 0.045, dur: 0.10, peak: 0.16, attack: 0.002,
      });
    }
    noise(oac, out, k.white, { t0: 0, dur: 0.22, hz0: 5200, hz1: 9000, peak: 0.10, q: 0.7 });
  },

  'item-boost': (oac, out, k) => {
    // mushroom: a body-less whoosh that opens up, plus a rising bloop
    noise(oac, out, k.white, {
      t0: 0, dur: 0.34, filter: 'bandpass', hz0: 380, hz1: 4200, q: 0.9, peak: 0.5,
    });
    tone(oac, out, { type: 'sawtooth', f0: 120, f1: 620, t0: 0, dur: 0.30, peak: 0.28 });
    tone(oac, out, { type: 'sine', f0: 60, f1: 240, t0: 0, dur: 0.26, peak: 0.42 });
  },

  'item-banana': (oac, out, k) => {
    tone(oac, out, { type: 'sine', f0: 480, f1: 130, t0: 0, dur: 0.14, glide: 0.09, peak: 0.42 });
    noise(oac, out, k.white, { t0: 0, dur: 0.09, hz0: 1600, hz1: 700, peak: 0.20, q: 1.4 });
  },

  'item-shellGreen': (oac, out, k) => {
    noise(oac, out, k.white, { t0: 0, dur: 0.26, hz0: 900, hz1: 3000, q: 1.6, peak: 0.36 });
    tone(oac, out, { type: 'square', f0: 300, f1: 900, t0: 0, dur: 0.22, peak: 0.18 });
  },

  'item-shellRed': (oac, out, k) => {
    noise(oac, out, k.white, { t0: 0, dur: 0.30, hz0: 800, hz1: 3600, q: 1.8, peak: 0.36 });
    tone(oac, out, { type: 'sawtooth', f0: 260, f1: 1150, t0: 0, dur: 0.28, peak: 0.22 });
    // homing warble so a red shell is audible as *red*
    tone(oac, out, { type: 'sine', f0: 1500, f1: 2400, t0: 0.05, dur: 0.24, peak: 0.10 });
  },

  'item-bomb': (oac, out, k) => {
    noise(oac, out, k.white, { t0: 0, dur: 0.30, hz0: 260, hz1: 1500, q: 0.8, peak: 0.34 });
    tone(oac, out, { type: 'triangle', f0: 180, f1: 420, t0: 0, dur: 0.26, peak: 0.24 });
  },

  'item-star': (oac, out, k) => {
    // shimmering ascending run, the invincibility flourish
    for (let i = 0; i < 7; i++) {
      tone(oac, out, {
        type: 'triangle', f0: deg(3 + i), f1: deg(3 + i),
        t0: i * 0.036, dur: 0.22, peak: 0.26, attack: 0.002,
      });
      tone(oac, out, {
        type: 'sine', f0: deg(3 + i) * 3, f1: deg(3 + i) * 3,
        t0: i * 0.036, dur: 0.12, peak: 0.09,
      });
    }
  },

  'item-bolt': (oac, out, k) => {
    // thunder: a hard crack over a collapsing rumble
    noise(oac, out, k.white, { t0: 0, dur: 0.06, filter: 'highpass', hz0: 3000, peak: 0.85 });
    noise(oac, out, k.brown, {
      t0: 0.01, dur: 0.85, filter: 'lowpass', hz0: 900, hz1: 90, q: 0.7, peak: 0.7,
    });
    tone(oac, out, { type: 'sawtooth', f0: 90, f1: 30, t0: 0.0, dur: 0.55, peak: 0.34 });
    noise(oac, out, k.crackle, { t0: 0.02, dur: 0.45, filter: 'highpass', hz0: 1800, peak: 0.30 });
  },

  'item-coin': (oac, out, k) => {
    tone(oac, out, { type: 'square', f0: deg(9), f1: deg(9), t0: 0, dur: 0.06, peak: 0.26 });
    tone(oac, out, { type: 'square', f0: deg(12), f1: deg(12), t0: 0.055, dur: 0.24, peak: 0.24 });
    tone(oac, out, { type: 'sine', f0: deg(12) * 2, f1: deg(12) * 2, t0: 0.055, dur: 0.18, peak: 0.10 });
  },

  'item-ghost': (oac, out, k) => {
    tone(oac, out, { type: 'sine', f0: 620, f1: 190, t0: 0, dur: 0.55, glide: 0.5, peak: 0.30 });
    tone(oac, out, { type: 'sine', f0: 930, f1: 280, t0: 0.04, dur: 0.50, glide: 0.46, peak: 0.16 });
    noise(oac, out, k.white, { t0: 0, dur: 0.5, filter: 'bandpass', hz0: 2200, hz1: 600, q: 3, peak: 0.14 });
  },

  'item-triple': (oac, out, k) => PATCHES['item-boost'](oac, out, k),

  'shell-bounce': (oac, out, k) => {
    click(oac, out, { f0: 2600, f1: 900, dur: 0.05, peak: 0.42 });
    noise(oac, out, k.white, { t0: 0, dur: 0.07, hz0: 3200, hz1: 1400, q: 2.2, peak: 0.24 });
  },

  /* ---- driving -------------------------------------------------------- */

  'drift-1': (oac, out) => {
    tone(oac, out, { type: 'triangle', f0: deg(7), f1: deg(9), t0: 0, dur: 0.20, glide: 0.05, peak: 0.30 });
    tone(oac, out, { type: 'sine', f0: deg(9) * 2, f1: deg(9) * 2, t0: 0.02, dur: 0.14, peak: 0.12 });
  },
  'drift-2': (oac, out) => {
    tone(oac, out, { type: 'triangle', f0: deg(9), f1: deg(11), t0: 0, dur: 0.22, glide: 0.05, peak: 0.32 });
    tone(oac, out, { type: 'sine', f0: deg(11) * 2, f1: deg(11) * 2, t0: 0.02, dur: 0.16, peak: 0.14 });
  },
  'drift-3': (oac, out) => {
    tone(oac, out, { type: 'triangle', f0: deg(11), f1: deg(13), t0: 0, dur: 0.26, glide: 0.05, peak: 0.34 });
    tone(oac, out, { type: 'square', f0: deg(13), f1: deg(13), t0: 0.03, dur: 0.20, peak: 0.14 });
    tone(oac, out, { type: 'sine', f0: deg(13) * 2, f1: deg(13) * 2, t0: 0.03, dur: 0.18, peak: 0.14 });
  },

  boost: (oac, out, k) => {
    // the turbo itself: a pressure release, wide and short
    noise(oac, out, k.white, {
      t0: 0, dur: 0.42, filter: 'bandpass', hz0: 520, hz1: 5200, q: 0.7, peak: 0.6,
    });
    tone(oac, out, { type: 'sawtooth', f0: 150, f1: 720, t0: 0, dur: 0.34, peak: 0.30 });
    tone(oac, out, { type: 'sine', f0: 70, f1: 200, t0: 0, dur: 0.30, peak: 0.40 });
  },

  land: (oac, out, k) => {
    tone(oac, out, { type: 'sine', f0: 150, f1: 46, t0: 0, dur: 0.22, glide: 0.10, peak: 0.7 });
    noise(oac, out, k.brown, { t0: 0, dur: 0.26, filter: 'lowpass', hz0: 1400, hz1: 260, peak: 0.5 });
    noise(oac, out, k.crackle, { t0: 0.005, dur: 0.18, filter: 'highpass', hz0: 1200, peak: 0.22 });
  },

  wall: (oac, out, k) => {
    click(oac, out, { f0: 900, f1: 120, dur: 0.06, peak: 0.6 });
    noise(oac, out, k.white, { t0: 0, dur: 0.20, filter: 'bandpass', hz0: 2600, hz1: 700, q: 1.2, peak: 0.45 });
    noise(oac, out, k.brown, { t0: 0, dur: 0.22, filter: 'lowpass', hz0: 700, hz1: 150, peak: 0.40 });
  },

  bump: (oac, out, k) => {
    tone(oac, out, { type: 'sine', f0: 220, f1: 70, t0: 0, dur: 0.14, glide: 0.07, peak: 0.5 });
    noise(oac, out, k.brown, { t0: 0, dur: 0.12, filter: 'lowpass', hz0: 900, hz1: 200, peak: 0.30 });
  },

  hop: (oac, out, k) => {
    noise(oac, out, k.white, { t0: 0, dur: 0.09, filter: 'bandpass', hz0: 1400, hz1: 3200, q: 1.5, peak: 0.24 });
    tone(oac, out, { type: 'sine', f0: 300, f1: 640, t0: 0, dur: 0.08, peak: 0.18 });
  },

  trick: (oac, out, k) => {
    noise(oac, out, k.white, { t0: 0, dur: 0.26, filter: 'bandpass', hz0: 700, hz1: 4600, q: 1.1, peak: 0.34 });
    tone(oac, out, { type: 'triangle', f0: deg(5), f1: deg(10), t0: 0, dur: 0.22, peak: 0.20 });
  },

  hit: (oac, out, k) => {
    click(oac, out, { f0: 1400, f1: 160, dur: 0.06, peak: 0.7 });
    noise(oac, out, k.brown, { t0: 0, dur: 0.30, filter: 'lowpass', hz0: 1200, hz1: 160, peak: 0.55 });
    // the dazed wobble that says "you lost your item"
    tone(oac, out, { type: 'sine', f0: 520, f1: 190, t0: 0.04, dur: 0.42, glide: 0.36, peak: 0.24 });
  },

  squash: (oac, out, k) => {
    tone(oac, out, { type: 'sine', f0: 700, f1: 90, t0: 0, dur: 0.30, glide: 0.22, peak: 0.55 });
    noise(oac, out, k.white, { t0: 0, dur: 0.16, filter: 'lowpass', hz0: 2600, hz1: 400, peak: 0.30 });
  },

  explode: (oac, out, k) => {
    noise(oac, out, k.white, { t0: 0, dur: 0.10, filter: 'highpass', hz0: 2400, peak: 0.8 });
    noise(oac, out, k.brown, { t0: 0, dur: 1.0, filter: 'lowpass', hz0: 1600, hz1: 70, q: 0.8, peak: 0.9 });
    tone(oac, out, { type: 'sine', f0: 190, f1: 34, t0: 0, dur: 0.7, glide: 0.5, peak: 0.7 });
    noise(oac, out, k.crackle, { t0: 0.03, dur: 0.6, filter: 'highpass', hz0: 900, peak: 0.35 });
  },

  offroad: (oac, out, k) => {
    // one-shot "you left the tarmac" scuff; the sustained bed is the roll loop
    noise(oac, out, k.crackle, { t0: 0, dur: 0.22, filter: 'bandpass', hz0: 1800, hz1: 900, q: 0.8, peak: 0.4 });
  },

  /* ---- race director --------------------------------------------------- */

  count: (oac, out) => {
    tone(oac, out, { type: 'square', f0: deg(4), f1: deg(4), t0: 0, dur: 0.26, peak: 0.34 });
    tone(oac, out, { type: 'sine', f0: deg(4) * 2, f1: deg(4) * 2, t0: 0, dur: 0.18, peak: 0.14 });
  },

  go: (oac, out, k) => {
    tone(oac, out, { type: 'square', f0: deg(11), f1: deg(11), t0: 0, dur: 0.5, peak: 0.42 });
    tone(oac, out, { type: 'sine', f0: deg(11) * 2, f1: deg(11) * 2, t0: 0, dur: 0.42, peak: 0.18 });
    noise(oac, out, k.white, { t0: 0, dur: 0.3, hz0: 3000, hz1: 8000, peak: 0.16, q: 0.6 });
  },

  lap: (oac, out) => {
    tone(oac, out, { type: 'triangle', f0: deg(7), f1: deg(7), t0: 0, dur: 0.30, peak: 0.30 });
    tone(oac, out, { type: 'triangle', f0: deg(11), f1: deg(11), t0: 0.09, dur: 0.42, peak: 0.30 });
  },

  finish: (oac, out) => {
    const notes = [4, 7, 9, 11, 14];
    notes.forEach((n, i) => {
      tone(oac, out, { type: 'triangle', f0: deg(n), f1: deg(n), t0: i * 0.10, dur: 0.55, peak: 0.30 });
      tone(oac, out, { type: 'sine', f0: deg(n) * 2, f1: deg(n) * 2, t0: i * 0.10, dur: 0.35, peak: 0.12 });
    });
  },

  /* ---- ui -------------------------------------------------------------- */

  'ui-move': (oac, out) => {
    tone(oac, out, { type: 'square', f0: deg(8), f1: deg(8), t0: 0, dur: 0.055, peak: 0.20 });
  },
  'ui-select': (oac, out) => {
    tone(oac, out, { type: 'square', f0: deg(9), f1: deg(9), t0: 0, dur: 0.07, peak: 0.24 });
    tone(oac, out, { type: 'square', f0: deg(13), f1: deg(13), t0: 0.06, dur: 0.16, peak: 0.22 });
  },
  'ui-back': (oac, out) => {
    tone(oac, out, { type: 'square', f0: deg(6), f1: deg(6), t0: 0, dur: 0.07, peak: 0.22 });
    tone(oac, out, { type: 'square', f0: deg(3), f1: deg(3), t0: 0.06, dur: 0.16, peak: 0.20 });
  },
};

/** How long each patch needs, in seconds. Anything not listed gets 0.5 s. */
const LENGTH = {
  'item-get': 0.55, 'item-boost': 0.55, 'item-triple': 0.55, 'item-banana': 0.30,
  'item-shellGreen': 0.45, 'item-shellRed': 0.55, 'item-bomb': 0.50,
  'item-star': 0.65, 'item-bolt': 1.20, 'item-coin': 0.45, 'item-ghost': 0.75,
  'shell-bounce': 0.20,
  'drift-1': 0.40, 'drift-2': 0.42, 'drift-3': 0.48,
  boost: 0.60, land: 0.50, wall: 0.45, bump: 0.30, hop: 0.22, trick: 0.45,
  hit: 0.65, squash: 0.55, explode: 1.35, offroad: 0.40,
  count: 0.45, go: 0.70, lap: 0.85, finish: 1.30,
  'ui-move': 0.12, 'ui-select': 0.30, 'ui-back': 0.30,
};

/* ---------------------------------------------------------------- bank */

const OfflineCtx = typeof globalThis !== 'undefined'
  ? (globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext)
  : null;

/**
 * Render the whole bank.
 *
 * `rng` must be a deterministic Rng. Returns `{}` rather than throwing if the
 * platform has no OfflineAudioContext — the audio system then simply has no
 * one-shots and the game still runs.
 */
export async function renderBank(sampleRate, rng, quality = 'high') {
  if (!OfflineCtx) return {};
  const sr = clamp(sampleRate || 48000, 8000, 96000);

  // Shared source material, rendered once in a scratch context and reused by
  // every patch. `noiseBuffer` is the single most expensive call in boot.
  const scratch = new OfflineCtx(1, 128, sr);
  const kit = {
    white: noiseBuffer(scratch, rng.fork(1), quality === 'low' ? 0.8 : 1.6, 'white', 1),
    brown: noiseBuffer(scratch, rng.fork(2), quality === 'low' ? 0.8 : 1.6, 'brown', 1),
    crackle: crackleBuffer(scratch, rng.fork(3), 1.2, 260, 0.0035),
  };

  const names = Object.keys(PATCHES);
  const bank = {};

  // Rendered in sequence, not in parallel: a dozen simultaneous
  // OfflineAudioContexts is a reliable way to make a low-end machine drop the
  // first second of the race.
  for (const name of names) {
    const seconds = LENGTH[name] ?? 0.5;
    try {
      const oac = new OfflineCtx(2, Math.max(128, Math.ceil(seconds * sr)), sr);
      const out = oac.createGain();
      out.gain.value = 1;
      out.connect(oac.destination);
      PATCHES[name](oac, out, kit);
      const buf = await oac.startRendering();
      bank[name] = trimPeak(deClick(buf), 0.88);
    } catch {
      /* one bad patch must not take the bank down */
    }
  }
  return bank;
}

export { PATCHES, LENGTH, SCALE, deg };
