import { tanhCurve, impulseResponse, dbToGain, clamp01, clamp } from './dsp.js';

/**
 * The mix bus tree.
 *
 *   [music] [engine] [sfx] [ui] --.
 *                                 +--> preMaster --> master --> limiter --> softClip --> out
 *   reverbSend -> convolver ------'
 *
 * Every bus is two gains deep: `vol` is what the player controls from the
 * options screen, `auto` is what the game drives (ducking, pause fades,
 * intensity). They multiply, so a duck can never fight a user setting.
 *
 * The final stage is a DynamicsCompressor used as a brick-wall-ish limiter
 * followed by a tanh WaveShaper. The shaper's curve is bounded at 0.985, and
 * WaveShaper clamps out-of-range input to the curve end points, so the master
 * output is mathematically incapable of reaching +/-1.0.
 */

export const BUS_NAMES = ['music', 'engine', 'sfx', 'ui'];

const DEFAULT_VOL = { master: 0.9, music: 0.62, engine: 0.85, sfx: 0.95, ui: 0.9 };

export class Mixer {
  constructor(ac, rng, quality = 'high') {
    this.ac = ac;
    this.quality = quality;
    this.nodeCount = 0;
    this.buses = {};
    this.volumes = { ...DEFAULT_VOL };
    this._muted = false;
    this._duck = { music: 1, sfx: 1 };
    this._duckTarget = { music: 1, sfx: 1 };

    const N = (n) => { this.nodeCount++; return n; };

    // ---- master chain ----------------------------------------------------
    this.softClip = N(ac.createWaveShaper());
    this.softClip.curve = tanhCurve(8192, 1.45, 0.985);
    this.softClip.oversample = quality === 'low' ? 'none' : '2x';
    this.softClip.connect(ac.destination);

    this.limiter = N(ac.createDynamicsCompressor());
    this.limiter.threshold.value = -7.5;
    this.limiter.knee.value = 3;
    this.limiter.ratio.value = 18;
    this.limiter.attack.value = 0.0035;
    this.limiter.release.value = 0.12;
    this.limiter.connect(this.softClip);

    this.master = N(ac.createGain());
    this.master.gain.value = DEFAULT_VOL.master;
    this.master.connect(this.limiter);

    this.preMaster = N(ac.createGain());
    this.preMaster.gain.value = 1;
    this.preMaster.connect(this.master);

    // ---- reverb ----------------------------------------------------------
    const irLen = quality === 'low' ? 0.75 : quality === 'medium' ? 1.05 : 1.45;
    this.convolver = N(ac.createConvolver());
    this.convolver.normalize = true;
    this.convolver.buffer = impulseResponse(ac, rng, {
      seconds: irLen, decay: 2.7, predelay: 0.014, damp: 0.46, width: 0.9, early: 8,
    });
    this.reverbReturn = N(ac.createGain());
    this.reverbReturn.gain.value = 0.85;
    this.reverbHiCut = N(ac.createBiquadFilter());
    this.reverbHiCut.type = 'lowpass';
    this.reverbHiCut.frequency.value = 5200;
    this.reverbSend = N(ac.createGain());
    this.reverbSend.gain.value = 1;
    this.reverbSend.connect(this.reverbHiCut);
    this.reverbHiCut.connect(this.convolver);
    this.convolver.connect(this.reverbReturn);
    this.reverbReturn.connect(this.preMaster);

    // ---- buses -----------------------------------------------------------
    for (const name of BUS_NAMES) {
      const vol = N(ac.createGain());
      const auto = N(ac.createGain());
      vol.gain.value = DEFAULT_VOL[name];
      auto.gain.value = 1;
      vol.connect(auto);
      auto.connect(this.preMaster);
      this.buses[name] = { input: vol, vol, auto };
    }

    // The music bus is what gets side-chained, so it keeps its own duck node
    // in front of the user volume.
    this.musicDuck = this.buses.music.auto;
  }

  /** Bus input node other modules connect into. */
  bus(name) { return (this.buses[name] ?? this.buses.sfx).input; }

  setBusVolume(name, v) {
    const g = clamp01(v);
    if (name === 'master') {
      this.volumes.master = g;
      if (!this._muted) this.master.gain.setTargetAtTime(g, this.ac.currentTime, 0.02);
      return;
    }
    const b = this.buses[name];
    if (!b) return;
    this.volumes[name] = g;
    b.vol.gain.setTargetAtTime(g, this.ac.currentTime, 0.02);
  }

  getBusVolume(name) { return this.volumes[name] ?? 0; }

  setMuted(on) {
    this._muted = !!on;
    const t = this.ac.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(this._muted ? 0 : this.volumes.master, t, 0.03);
  }

  get muted() { return this._muted; }

  /**
   * Side-chain: pull a bus down for `hold` seconds then let it float back.
   * Used on the music bus when something important happens (countdown, boost,
   * lightning, finish) so effects always cut through without being louder.
   */
  duck(bus = 'music', amount = 0.45, hold = 0.35) {
    const b = this.buses[bus];
    if (!b) return;
    const t = this.ac.currentTime;
    const lo = clamp(1 - amount, 0.05, 1);
    const g = b.auto.gain;
    // Do not fight a deeper duck already in flight.
    const cur = g.value;
    g.cancelScheduledValues(t);
    g.setValueAtTime(Math.min(cur, 1), t);
    g.linearRampToValueAtTime(Math.min(cur, lo), t + 0.035);
    g.setValueAtTime(Math.min(cur, lo), t + 0.035 + hold);
    g.setTargetAtTime(1, t + 0.035 + hold, 0.22);
  }

  /** Master fade used for pause / tab-hidden, never for gameplay. */
  fadeMaster(to, seconds = 0.25) {
    const t = this.ac.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(
      this._muted ? 0 : this.volumes.master * clamp01(to), t + seconds);
  }

  dispose() {
    try {
      this.softClip.disconnect();
      this.limiter.disconnect();
      this.master.disconnect();
      this.preMaster.disconnect();
      this.convolver.disconnect();
      this.reverbSend.disconnect();
      this.reverbHiCut.disconnect();
      this.reverbReturn.disconnect();
      for (const n of BUS_NAMES) { this.buses[n].vol.disconnect(); this.buses[n].auto.disconnect(); }
    } catch { /* context already gone */ }
  }
}

export { dbToGain };
