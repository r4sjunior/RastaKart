/**
 * Unified input: keyboard, gamepad and touch, normalised into an analogue
 * action state. Systems must read `Input.state` and never touch DOM events.
 *
 * state = {
 *   accel: 0..1, brake: 0..1, steer: -1..1,
 *   drift: bool, item: bool, look: -1..1, pause: bool,
 *   pressed: { drift, item, pause }   // edge-triggered, cleared each frame
 * }
 */
const KEYMAP = {
  accel:  ['KeyW', 'ArrowUp', 'KeyZ'],
  brake:  ['KeyS', 'ArrowDown'],
  left:   ['KeyA', 'ArrowLeft'],
  right:  ['KeyD', 'ArrowRight'],
  drift:  ['ShiftLeft', 'ShiftRight', 'Space'],
  item:   ['KeyE', 'ControlLeft', 'Enter'],
  look:   ['KeyQ'],
  pause:  ['Escape', 'KeyP'],
};

export class Input {
  constructor(target = window) {
    this.target = target;
    this.keys = new Set();
    this.gamepadIndex = null;
    this.touch = { steer: 0, accel: 0, brake: 0, drift: false, item: false, active: false };
    this.enabled = true;

    this.state = {
      accel: 0, brake: 0, steer: 0, drift: false, item: false, look: 0, pause: false,
      pressed: { drift: false, item: false, pause: false },
      source: 'keyboard',
    };
    this._prev = { drift: false, item: false, pause: false };
    this._scripted = null;

    this._onKeyDown = (e) => {
      if (!this.enabled) return;
      if (e.repeat) return;
      this.keys.add(e.code);
      if (Object.values(KEYMAP).some((codes) => codes.includes(e.code))) e.preventDefault();
    };
    this._onKeyUp = (e) => { this.keys.delete(e.code); };
    this._onBlur = () => this.keys.clear();
    this._onGamepad = (e) => { this.gamepadIndex = e.gamepad.index; };

    target.addEventListener('keydown', this._onKeyDown, { passive: false });
    target.addEventListener('keyup', this._onKeyUp);
    target.addEventListener('blur', this._onBlur);
    target.addEventListener('gamepadconnected', this._onGamepad);
  }

  /** Replace live input with a deterministic script (used by screenshot runs). */
  setScripted(fn) { this._scripted = fn; }

  _held(action) { return KEYMAP[action].some((c) => this.keys.has(c)); }

  update(t) {
    const s = this.state;

    if (this._scripted) {
      Object.assign(s, { accel: 0, brake: 0, steer: 0, drift: false, item: false, look: 0 },
        this._scripted(t) || {});
      s.source = 'script';
    } else {
      let accel = this._held('accel') ? 1 : 0;
      let brake = this._held('brake') ? 1 : 0;
      let steer = (this._held('right') ? 1 : 0) - (this._held('left') ? 1 : 0);
      let drift = this._held('drift');
      let item = this._held('item');
      let look = this._held('look') ? 1 : 0;
      let source = 'keyboard';

      const pad = this._pad();
      if (pad) {
        const dz = (v) => (Math.abs(v) < 0.18 ? 0 : (v - Math.sign(v) * 0.18) / 0.82);
        const padSteer = dz(pad.axes[0] ?? 0);
        const padAccel = Math.max(pad.buttons[7]?.value ?? 0, pad.buttons[0]?.pressed ? 1 : 0);
        const padBrake = Math.max(pad.buttons[6]?.value ?? 0, pad.buttons[1]?.pressed ? 1 : 0);
        if (padAccel || padBrake || Math.abs(padSteer) > 0 || pad.buttons[5]?.pressed) source = 'gamepad';
        accel = Math.max(accel, padAccel);
        brake = Math.max(brake, padBrake);
        if (Math.abs(padSteer) > Math.abs(steer)) steer = padSteer;
        drift = drift || !!(pad.buttons[5]?.pressed || pad.buttons[4]?.pressed);
        item = item || !!(pad.buttons[2]?.pressed || pad.buttons[3]?.pressed);
        look = Math.max(look, pad.buttons[11]?.pressed ? 1 : 0);
      }

      if (this.touch.active) {
        source = 'touch';
        accel = Math.max(accel, this.touch.accel);
        brake = Math.max(brake, this.touch.brake);
        if (Math.abs(this.touch.steer) > Math.abs(steer)) steer = this.touch.steer;
        drift = drift || this.touch.drift;
        item = item || this.touch.item;
      }

      s.accel = accel; s.brake = brake;
      s.steer = Math.max(-1, Math.min(1, steer));
      s.drift = drift; s.item = item; s.look = look;
      s.source = source;
      s.pause = this._held('pause');
    }

    s.pressed.drift = s.drift && !this._prev.drift;
    s.pressed.item = s.item && !this._prev.item;
    s.pressed.pause = s.pause && !this._prev.pause;
    this._prev.drift = s.drift;
    this._prev.item = s.item;
    this._prev.pause = s.pause;
    return s;
  }

  _pad() {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return null;
    const pads = navigator.getGamepads();
    if (this.gamepadIndex != null && pads[this.gamepadIndex]) return pads[this.gamepadIndex];
    for (const p of pads) if (p && p.connected) { this.gamepadIndex = p.index; return p; }
    return null;
  }

  dispose() {
    this.target.removeEventListener('keydown', this._onKeyDown);
    this.target.removeEventListener('keyup', this._onKeyUp);
    this.target.removeEventListener('blur', this._onBlur);
    this.target.removeEventListener('gamepadconnected', this._onGamepad);
  }
}
