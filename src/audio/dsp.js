/**
 * Shared DSP primitives for the Rasta Kart audio engine.
 *
 * Everything here is procedural: there is not a single audio file in the
 * project. Buffers (noise, crackle, impulse responses) and wavetables are
 * generated from a deterministic Rng so that two runs with the same seed
 * produce byte-identical audio.
 *
 * Every function takes a `BaseAudioContext` as its first argument so the exact
 * same code can run inside an `OfflineAudioContext` - that is what
 * `_audit.mjs` uses to measure peak / RMS / clipping / spectrum offline.
 */

export const TAU = Math.PI * 2;

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const dbToGain = (db) => Math.pow(10, db / 20);
/** Exponential approach usable with a variable dt (frame-rate independent). */
export const approach = (cur, target, rate, dt) =>
  cur + (target - cur) * (1 - Math.exp(-rate * dt));

/**
 * Soft-clip transfer curve for the master safety stage.
 * WaveShaper clamps its input to the curve end points, so the peak output is
 * literally bounded by `ceil` (0.985) - the master can never produce a +/-1.0
 * sample no matter what the mix does.
 */
export function tanhCurve(n = 8192, drive = 1.45, ceil = 0.985) {
  const c = new Float32Array(n);
  const k = Math.tanh(drive);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    c[i] = (ceil * Math.tanh(x * drive)) / k;
  }
  return c;
}

/** Mild asymmetric drive used to add grit to engine / impact material. */
export function driveCurve(n = 4096, amount = 2.2) {
  const c = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    const y = Math.tanh(x * amount) * (1 + 0.12 * Math.tanh(x * amount * 2));
    c[i] = clamp(y / 1.12, -0.99, 0.99);
  }
  return c;
}

// ---------------------------------------------------------------------------
//  Noise
// ---------------------------------------------------------------------------

/**
 * Looping noise bed. The tail is cross-faded into the head so that
 * `loop = true` never produces a discontinuity at the seam.
 *
 * @param {'white'|'pink'|'brown'} color
 */
export function noiseBuffer(ac, rng, seconds = 2.5, color = 'white', channels = 2) {
  const sr = ac.sampleRate;
  const len = Math.floor(seconds * sr);
  const xf = Math.min(Math.floor(sr * 0.05), Math.floor(len / 4));
  const buf = ac.createBuffer(channels, len, sr);

  for (let ch = 0; ch < channels; ch++) {
    const tmp = new Float32Array(len + xf);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < tmp.length; i++) {
      const w = rng.next() * 2 - 1;
      let v;
      if (color === 'pink') {
        // Paul Kellet refined pink filter
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.0168980;
        v = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      } else if (color === 'brown') {
        last = (last + 0.02 * w) / 1.02;
        v = last * 3.2;
      } else {
        v = w;
      }
      tmp[i] = v;
    }

    const out = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) out[i] = tmp[i];
    for (let i = 0; i < xf; i++) {
      const t = i / xf;
      out[i] = tmp[i] * t + tmp[len + i] * (1 - t);
    }
    normalize(out, 0.85);
  }
  return buf;
}

/**
 * Sparse decaying impulses - the grit layer under dirt rolling, engine braking
 * crackle and gravel impacts. Grains never cross the buffer end so the loop
 * point stays silent-safe.
 */
export function crackleBuffer(ac, rng, seconds = 1.6, density = 220, decay = 0.004) {
  const sr = ac.sampleRate;
  const len = Math.floor(seconds * sr);
  const buf = ac.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);
  const grain = Math.floor(decay * 6 * sr);
  const n = Math.floor(density * seconds);
  for (let g = 0; g < n; g++) {
    const at = Math.floor(rng.next() * (len - grain - 1));
    const amp = 0.35 + rng.next() * 0.65;
    const dk = decay * (0.4 + rng.next() * 1.6);
    const f = 900 + rng.next() * 5200;
    for (let i = 0; i < grain; i++) {
      const t = i / sr;
      d[at + i] += amp * Math.exp(-t / dk) * Math.sin(TAU * f * t);
    }
  }
  normalize(d, 0.9);
  return buf;
}

export function normalize(arr, peak = 0.95) {
  let m = 0;
  for (let i = 0; i < arr.length; i++) { const a = Math.abs(arr[i]); if (a > m) m = a; }
  if (m < 1e-9) return arr;
  const g = peak / m;
  for (let i = 0; i < arr.length; i++) arr[i] *= g;
  return arr;
}

// ---------------------------------------------------------------------------
//  Reverb impulse response (procedural)
// ---------------------------------------------------------------------------

/**
 * Short "outdoor stadium" IR: a handful of discrete early reflections followed
 * by an exponentially decaying, progressively damped diffuse tail. Generated
 * from code - no IR file anywhere.
 */
export function impulseResponse(ac, rng, {
  seconds = 1.4, decay = 2.6, predelay = 0.012, damp = 0.42, width = 0.85, early = 7,
} = {}) {
  const sr = ac.sampleRate;
  const len = Math.max(8, Math.floor(seconds * sr));
  const buf = ac.createBuffer(2, len, sr);
  const pre = Math.floor(predelay * sr);

  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let lp = 0;
    for (let i = pre; i < len; i++) {
      const t = (i - pre) / sr;
      const env = Math.pow(1 - (i - pre) / (len - pre), decay);
      const w = rng.next() * 2 - 1;
      // progressive high-frequency damping: coefficient grows with time
      const a = clamp01(damp * (0.35 + 0.65 * (t / seconds)));
      lp = lp * a + w * (1 - a);
      d[i] = lp * env;
    }
    for (let e = 0; e < early; e++) {
      const at = pre + Math.floor((0.006 + rng.next() * 0.075) * sr);
      if (at >= len) continue;
      d[at] += (rng.next() * 2 - 1) * 0.55 * Math.pow(0.72, e);
    }
    if (ch === 1) {
      const shift = Math.floor(sr * 0.0031);
      for (let i = len - 1; i >= shift; i--) d[i] = lerp(d[i], d[i - shift], width);
    }
    normalize(d, 0.62);
  }
  return buf;
}

// ---------------------------------------------------------------------------
//  Wavetables
// ---------------------------------------------------------------------------

/**
 * Build a PeriodicWave from a harmonic amplitude function. Phases come from the
 * deterministic Rng: an all-cosine spectrum collapses into a pulse train
 * (harsh, buzzy, high crest factor), while decorrelated phases give the
 * smoother, engine-like waveform we want.
 */
export function harmonicWave(ac, rng, n, ampFn, { randomPhase = true } = {}) {
  const real = new Float32Array(n + 1);
  const imag = new Float32Array(n + 1);
  for (let h = 1; h <= n; h++) {
    const a = ampFn(h);
    if (!a) continue;
    const ph = randomPhase ? rng.next() * TAU : 0;
    real[h] = a * Math.cos(ph);
    imag[h] = a * Math.sin(ph);
  }
  return ac.createPeriodicWave(real, imag, { disableNormalization: false });
}

/**
 * The three wavetables the engine crossfades between.
 *  - `open`   full throttle: broad, bright, buzzy two-stroke bark
 *  - `closed` off throttle: hollow, odd-harmonic dominated engine braking
 *  - `sub`    the low chug that carries the body under both
 */
export function engineWaves(ac, rng) {
  const open = harmonicWave(ac, rng, 30, (h) => {
    const base = Math.pow(h, -0.82);
    const bark = 1 + 0.55 * Math.exp(-Math.pow((h - 3.2) / 2.1, 2));
    const comb = 1 + 0.32 * Math.cos(h * 0.78);
    const roll = h > 20 ? Math.exp(-(h - 20) * 0.22) : 1;
    return base * bark * comb * roll;
  });
  const closed = harmonicWave(ac, rng, 22, (h) => {
    const odd = h % 2 === 1 ? 1 : 0.34;
    const roll = h > 10 ? Math.exp(-(h - 10) * 0.34) : 1;
    return Math.pow(h, -1.15) * odd * roll * (1 + 0.25 * Math.cos(h * 1.7));
  });
  const sub = harmonicWave(ac, rng, 6,
    (h) => (h === 1 ? 1 : h === 2 ? 0.42 : h === 3 ? 0.16 : 0.05));
  return { open, closed, sub };
}

// ---------------------------------------------------------------------------
//  Envelope helpers used by the offline one-shot renderers
// ---------------------------------------------------------------------------

/** Percussive AD envelope; returns the time the voice can be stopped. */
export function ampEnv(param, t0, {
  peak = 1, attack = 0.003, hold = 0, decay = 0.25, floor = 0.0008,
} = {}) {
  const p = Math.max(floor * 2, peak);
  param.setValueAtTime(floor, t0);
  param.exponentialRampToValueAtTime(p, t0 + attack);
  const s = t0 + attack + hold;
  if (hold) param.setValueAtTime(p, s);
  param.exponentialRampToValueAtTime(floor, s + decay);
  param.setValueAtTime(0, s + decay + 0.001);
  return s + decay + 0.004;
}

/** ADSR for sustained material. */
export function adsr(param, t0, dur, {
  peak = 1, a = 0.01, d = 0.08, s = 0.7, r = 0.2, floor = 0.0008,
} = {}) {
  const p = Math.max(floor * 2, peak);
  param.setValueAtTime(floor, t0);
  param.exponentialRampToValueAtTime(p, t0 + a);
  param.exponentialRampToValueAtTime(Math.max(floor * 2, p * s), t0 + a + d);
  const off = t0 + Math.max(dur, a + d);
  param.setValueAtTime(Math.max(floor * 2, p * s), off);
  param.exponentialRampToValueAtTime(floor, off + r);
  param.setValueAtTime(0, off + r + 0.001);
  return off + r + 0.004;
}

/** Tiny head/tail fades so a rendered one-shot can never click. */
export function deClick(buf, fadeIn = 0.0015, fadeOut = 0.006) {
  const sr = buf.sampleRate;
  const fi = Math.max(1, Math.floor(fadeIn * sr));
  const fo = Math.max(1, Math.floor(fadeOut * sr));
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < fi && i < d.length; i++) d[i] *= i / fi;
    for (let i = 0; i < fo && i < d.length; i++) d[d.length - 1 - i] *= i / fo;
  }
  return buf;
}

/** Peak-normalise a rendered buffer to a ceiling (keeps SFX headroom sane). */
export function trimPeak(buf, ceiling = 0.9) {
  let m = 0;
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > m) m = a; }
  }
  if (m < 1e-8 || m <= ceiling) return buf;
  const g = ceiling / m;
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < d.length; i++) d[i] *= g;
  }
  return buf;
}

export const A4 = 440;
export const midiToHz = (m) => A4 * Math.pow(2, (m - 69) / 12);
