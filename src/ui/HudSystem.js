/**
 * HudSystem — race HUD, full-screen menus and touch controls.
 *
 * Design rules this file obeys:
 *  - The DOM tree is built once in `init`. Nothing allocates elements per frame
 *    and `innerHTML` is never touched after build (except when a screen opens).
 *  - Every write goes through `setText` / `setClass` / `setVar`, which bail out
 *    when the value did not change, so a steady frame costs a handful of
 *    property compares and nothing else.
 *  - Only `transform` and `opacity` are animated; the minimap is a canvas.
 *  - No `Math.random()`, no `Date.now()`. All timing rides on `ctx.time.t`.
 *
 * System contract: name 'hud', order 70, init/lateUpdate/resize/dispose.
 */
import cssText from './hud.css?inline';
import { el, add, setText, setClass, setVar, replay } from './dom.js';
import { lapTime, raceTime, ordinal, clamp } from './format.js';
import { icon, uiIcon, ITEM_ORDER, ITEM_LABEL } from './icons.js';

/* -------------------------------------------------------------------------- */
/* Static data                                                                 */
/* -------------------------------------------------------------------------- */

/** Mirrors PhysicsSystem's CHARACTERS + KartModel's LIVERIES (kept local on
 *  purpose: the HUD must not import gameplay modules). */
const ROSTER = [
  { name: 'Rasta',  color: '#1eae4b', stats: { topSpeed: 27.0, accel: 12.0, handling: 2.65, weight: 1.00, miniTurbo: 4.50 } },
  { name: 'Zion',   color: '#f2622e', stats: { topSpeed: 28.4, accel: 10.4, handling: 2.30, weight: 1.22, miniTurbo: 3.50 } },
  { name: 'Marley', color: '#1b7fd4', stats: { topSpeed: 26.2, accel: 13.4, handling: 3.00, weight: 0.84, miniTurbo: 5.00 } },
  { name: 'Selah',  color: '#8bd42a', stats: { topSpeed: 27.4, accel: 11.6, handling: 2.55, weight: 1.05, miniTurbo: 4.25 } },
  { name: 'Kofi',   color: '#d42a8b', stats: { topSpeed: 28.8, accel: 10.0, handling: 2.20, weight: 1.30, miniTurbo: 3.25 } },
  { name: 'Nia',    color: '#7a4fd4', stats: { topSpeed: 26.0, accel: 13.8, handling: 3.10, weight: 0.80, miniTurbo: 5.25 } },
  { name: 'Tafari', color: '#59606b', stats: { topSpeed: 27.2, accel: 12.2, handling: 2.70, weight: 1.00, miniTurbo: 4.50 } },
  { name: 'Ayo',    color: '#e8d7ab', stats: { topSpeed: 27.8, accel: 11.2, handling: 2.45, weight: 1.12, miniTurbo: 4.00 } },
];

const QUALITIES = [
  { id: 'low', label: 'BAIXA' },
  { id: 'medium', label: 'MÉDIA' },
  { id: 'high', label: 'ALTA' },
  { id: 'ultra', label: 'ULTRA' },
];

const ITEM_KEYS = ['none', ...ITEM_ORDER];

/* -------------------------------------------------------------------------- */
/* Speedometer geometry (viewBox 100 x 68)                                     */
/* -------------------------------------------------------------------------- */

const G_CX = 50, G_CY = 49.3, G_R = 38, G_SWEEP = 115;   // degrees each side of 12 o'clock
const ARC_LEN = G_R * (G_SWEEP * 2) * Math.PI / 180;      // 152.54

const gp = (a, r) => {
  const rad = a * Math.PI / 180;
  return [G_CX + Math.sin(rad) * r, G_CY - Math.cos(rad) * r];
};

function gaugeSvg() {
  const [ax, ay] = gp(-G_SWEEP, G_R);
  const [bx, by] = gp(G_SWEEP, G_R);
  const d = `M${ax.toFixed(2)} ${ay.toFixed(2)} A${G_R} ${G_R} 0 1 1 ${bx.toFixed(2)} ${by.toFixed(2)}`;

  let ticks = '';
  for (let i = 0; i <= 10; i++) {
    const a = -G_SWEEP + (i / 10) * G_SWEEP * 2;
    const major = i % 5 === 0;
    const [x1, y1] = gp(a, G_R - (major ? 8.5 : 6.5));
    const [x2, y2] = gp(a, G_R - 4.6);
    ticks += `<path class="arc-tick" d="M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}"` +
             ` stroke-width="${major ? 1.9 : 1.1}" stroke-linecap="round"/>`;
  }

  return `<svg viewBox="0 0 100 68" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="rk-speedgrad" x1="0" y1="1" x2="1" y2="0.1">
        <stop offset="0" stop-color="#24d15c"/>
        <stop offset=".52" stop-color="#ffc61a"/>
        <stop offset="1" stop-color="#f04437"/>
      </linearGradient>
    </defs>
    <path d="${d}" stroke="rgba(4,10,7,.86)" stroke-width="12.5" stroke-linecap="round"/>
    <path class="arc-bg" d="${d}" stroke-width="8" stroke-linecap="round"/>
    ${ticks}
    <path class="arc-fill" d="${d}" stroke-width="8" stroke-linecap="round" style="--len:${ARC_LEN.toFixed(2)}"/>
    <g class="needle">
      <path d="M50 12.2 L51.75 29.6 L48.25 29.6 Z" fill="#ffffff" stroke="#08120c" stroke-width="1" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

/* -------------------------------------------------------------------------- */

export class HudSystem {
  name = 'hud'; order = 70;

  #warns = new Map();
  #rows = [];
  #cards = [];
  #screens = {};
  #nav = null;
  #screen = null;
  #map = null;
  #keyHandler = null;
  #ptrHandlers = [];
  #frame = 0;

  /* ------------------------------------------------------------------ init */

  async init(ctx) {
    this.ctx = ctx;
    const q = new URLSearchParams(typeof location !== 'undefined' ? location.search : '');

    this.settings = {
      quality: QUALITIES.findIndex((x) => x.id === ctx.quality) < 0 ? 2
        : QUALITIES.findIndex((x) => x.id === ctx.quality),
      volume: 7,
      sens: 6,
    };
    this.charIndex = clamp(Number(q.get('char') ?? 0) | 0, 0, ROSTER.length - 1);

    this.#injectCss();
    this.#build();
    this.#bindEvents();
    this.#bindKeys();
    this.#bakeMap();

    this.#applyCharacter(this.charIndex, true);

    // Public hooks — handy for the screenshot harness and for other systems.
    ctx.settings = ctx.settings ?? {};
    ctx.settings.volume = this.settings.volume / 10;
    ctx.settings.sensitivity = this.settings.sens / 10;
    ctx.hud = {
      open: (n) => this.#openScreen(n),
      close: () => this.#closeScreen(),
      toast: (t, kind, ms) => this.#toast('api', t, kind, ms ?? 2200),
      root: this.root,
      sync: () => this.lateUpdate(0, ctx),
    };

    if (!q.has('nomenu')) this.#openScreen('menu');
    else this.#closeScreen();

    this.#tick(ctx, true);
    ctx.onProgress?.(0.98, 'montando o hud');
  }

  #injectCss() {
    let tag = document.getElementById('rk-hud-css');
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'rk-hud-css';
      document.head.appendChild(tag);
    }
    tag.textContent = cssText;
    this.styleTag = tag;
  }

  /* ----------------------------------------------------------------- build */

  #build() {
    const host = document.getElementById('ui-root') ?? document.body;
    const root = this.root = el('div');
    root.id = 'rk';
    host.appendChild(root);

    const P = this.parts = {};

    /* ---------------------------------------------------------- race grid */
    const grid = P.grid = add(root, 'div', 'grid swoop');

    // top-left: lap counter + timing block
    const tl = add(grid, 'div', 'a-tl');

    const lap = P.lap = add(tl, 'div', 'lap chip');
    add(lap, 'span', 'ico', uiIcon('flag'));
    add(lap, 'span', 'tag').textContent = 'VOLTA';
    P.lapCur = add(add(lap, 'span', 'n'), 'b');
    add(lap, 'span', 'sep').textContent = '/';
    P.lapTot = add(lap, 'span', 'n');

    const times = add(tl, 'div', 'times');
    const mkRow = (cls, label) => {
      const r = add(times, 'div', 'row ' + cls);
      add(r, 'span', 'k').textContent = label;
      return { row: r, v: add(r, 'span', 'v') };
    };
    P.tTotal = mkRow('total', 'TEMPO');
    P.tLap = mkRow('cur', 'VOLTA');
    P.tBest = mkRow('best', 'MELHOR');

    // top-centre: transient warnings
    P.warns = add(add(grid, 'div', 'a-tc'), 'div', 'warns');

    // top-right: minimap + live standings
    const tr = add(grid, 'div', 'a-tr');
    const map = P.mapBox = add(tr, 'div', 'map');
    P.mapCanvas = add(map, 'canvas');
    add(map, 'div', 'cap').textContent = 'CIRCUITO';

    const board = P.board = add(tr, 'div', 'board');
    for (let i = 0; i < 8; i++) {
      const r = add(board, 'div', 'r');
      const row = {
        node: r,
        p: add(r, 'span', 'p'),
        nm: add(r, 'span', 'nm'),
        dot: add(r, 'span', 'dot'),
        id: -1,
      };
      this.#rows.push(row);
    }

    // bottom-left: item slot + speedometer + mini-turbo pips
    const bl = add(grid, 'div', 'a-bl');

    const item = P.item = add(bl, 'div', 'item');
    const glyphs = add(item, 'div', 'glyphs');
    P.glyphs = {};
    for (const k of ITEM_KEYS) P.glyphs[k] = add(glyphs, 'div', 'g', icon(k));
    add(item, 'div', 'sheen');
    P.itemLabel = add(item, 'div', 'label');

    const gw = add(bl, 'div', 'gaugewrap');
    const speedo = P.speedo = add(gw, 'div', 'speedo', gaugeSvg());
    const read = add(speedo, 'div', 'read');
    P.kmh = add(read, 'span', 'kmh');
    add(read, 'span', 'unit').textContent = 'KM/H';
    P.mt = add(gw, 'div', 'mt');
    for (let i = 0; i < 3; i++) add(P.mt, 'i');

    // bottom-right: placing
    const place = P.place = add(add(grid, 'div', 'a-br'), 'div', 'place');
    add(place, 'div', 'flash');
    const num = add(place, 'div', 'num');
    P.placeNumS = add(num, 'i', 'stroke');
    P.placeNumF = add(num, 'i', 'fill');
    const ord = add(place, 'div', 'ord');
    add(ord, 'i', 'stroke').textContent = ordinal();
    add(ord, 'i', 'fill').textContent = ordinal();
    P.placeOf = add(place, 'div', 'of');

    /* ---------------------------------------------------------- countdown */
    const count = P.count = add(root, 'div', 'count');
    const hub = add(count, 'div', 'hub');
    add(hub, 'div', 'halo');
    const cn = add(hub, 'div', 'n');
    P.countS = add(cn, 'i', 'stroke');
    P.countF = add(cn, 'i', 'fill');

    /* -------------------------------------------------------------- touch */
    this.#buildTouch(root);

    /* ------------------------------------------------------------ screens */
    P.screens = add(root, 'div', 'screens');
    this.#buildMenu();
    this.#buildOptions();
    this.#buildPause();
    this.#buildResults();
  }

  /* --------------------------------------------------------------- screens */

  #newScreen(id, thin) {
    const s = add(this.parts.screens, 'div', 'screen' + (thin ? ' thin' : ''));
    add(s, 'div', 'veil');
    const body = add(s, 'div', 'body');
    this.#screens[id] = { node: s, body, items: [], index: 0 };
    return this.#screens[id];
  }

  /** A menu row. `opts.values` turns it into a left/right cycler. */
  #menuItem(list, label, opts = {}) {
    const mi = add(list, 'div', 'mi' + (opts.primary ? ' primary' : ''));
    add(mi, 'span', null).textContent = label;
    const val = add(mi, 'span', 'val');
    let out = null;
    if (opts.values) {
      add(val, 'span', 'arw l', uiIcon('chevron'));
      out = add(val, 'span', 'ov');
      add(val, 'span', 'arw r', uiIcon('chevron'));
    } else if (opts.value != null) {
      out = add(val, 'span', 'ov');
      out.textContent = opts.value;
    } else {
      add(val, 'span', 'arw r', uiIcon('chevron'));
    }
    return { node: mi, out };
  }

  #buildMenu() {
    const sc = this.#newScreen('menu', false);
    const b = sc.body;

    const wm = add(b, 'div', 'wordmark');
    add(wm, 'i', 'stroke').textContent = 'RASTA KART';
    add(wm, 'i', 'fill').textContent = 'RASTA KART';
    add(wm, 'span', 'sub').textContent = 'GRANDE PRÊMIO';

    add(b, 'div', 'sectitle').textContent = 'ESCOLHA SEU PILOTO';

    const picker = add(b, 'div', 'picker');
    ROSTER.forEach((c, i) => {
      const card = add(picker, 'div', 'card');
      card.style.setProperty('--c', c.color);
      add(card, 'div', 'art', uiIcon('kart'));
      add(card, 'div', 'nm').textContent = c.name.toUpperCase();
      const bars = add(card, 'div', 'bars');
      const norm = [
        (c.stats.topSpeed - 25.4) / 3.8,
        (c.stats.accel - 9.4) / 5.0,
        (c.stats.handling - 2.05) / 1.25,
      ];
      for (const f of norm) add(add(bars, 'div', 'bar'), 'span').style.setProperty('--f', f.toFixed(3));
      card.addEventListener('click', () => { sc.index = 0; this.#applyCharacter(i); this.#paintNav(sc); });
      card.addEventListener('pointerenter', () => { sc.index = 0; this.#paintNav(sc); });
      this.#cards.push(card);
    });

    const list = add(b, 'div', 'menu');
    const start = this.#menuItem(list, 'LARGAR', { primary: true });
    const opts = this.#menuItem(list, 'OPÇÕES');

    const hint = add(b, 'div', 'hint');
    hint.innerHTML = '<kbd>&larr;</kbd><kbd>&rarr;</kbd> escolher &nbsp;·&nbsp; ' +
      '<kbd>&uarr;</kbd><kbd>&darr;</kbd> navegar &nbsp;·&nbsp; <kbd>Enter</kbd> confirmar' +
      '<br>W/&uarr; acelera &nbsp;·&nbsp; A/D dirige &nbsp;·&nbsp; Shift derrapa &nbsp;·&nbsp; Esc pausa';

    sc.items = [
      {
        mark: (on) => this.#cards.forEach((c, i) => setClass(c, 'sel', i === this.charIndex && on !== false)),
        left: () => this.#applyCharacter((this.charIndex + ROSTER.length - 1) % ROSTER.length),
        right: () => this.#applyCharacter((this.charIndex + 1) % ROSTER.length),
        enter: () => { sc.index = 1; this.#paintNav(sc); },
      },
      { node: start.node, enter: () => this.#startRace() },
      { node: opts.node, enter: () => this.#openScreen('options', 'menu') },
    ];
    this.#wire(sc);
  }

  #buildOptions() {
    const sc = this.#newScreen('options', true);
    const b = sc.body;
    add(b, 'h2', null).textContent = 'OPÇÕES';
    const list = add(b, 'div', 'menu');

    const q = this.#menuItem(list, 'QUALIDADE', { values: true });
    const vol = this.#menuItem(list, 'VOLUME', { values: true });
    const sen = this.#menuItem(list, 'SENSIBILIDADE', { values: true });
    const back = this.#menuItem(list, 'VOLTAR');
    add(b, 'div', 'hint').innerHTML = '<kbd>&larr;</kbd><kbd>&rarr;</kbd> ajustar &nbsp;·&nbsp; <kbd>Esc</kbd> voltar';

    this.optOut = { q: q.out, vol: vol.out, sen: sen.out };

    const step = (key, dir, lo, hi) => {
      this.settings[key] = clamp(this.settings[key] + dir, lo, hi);
      this.#applySettings();
    };
    sc.items = [
      { node: q.node, left: () => step('quality', -1, 0, 3), right: () => step('quality', 1, 0, 3), enter: () => step('quality', 1, 0, 3) },
      { node: vol.node, left: () => step('volume', -1, 0, 10), right: () => step('volume', 1, 0, 10) },
      { node: sen.node, left: () => step('sens', -1, 1, 10), right: () => step('sens', 1, 1, 10) },
      { node: back.node, enter: () => this.#back() },
    ];
    this.#wire(sc);
    this.#applySettings();
  }

  #buildPause() {
    const sc = this.#newScreen('pause', true);
    const b = sc.body;
    add(b, 'h2', null).textContent = 'PAUSA';
    const list = add(b, 'div', 'menu');
    const cont = this.#menuItem(list, 'CONTINUAR', { primary: true });
    const opts = this.#menuItem(list, 'OPÇÕES');
    const again = this.#menuItem(list, 'REINICIAR');
    const quit = this.#menuItem(list, 'SAIR PARA O MENU');
    add(b, 'div', 'hint').innerHTML = '<kbd>Esc</kbd> continuar';

    sc.items = [
      { node: cont.node, enter: () => this.#closeScreen() },
      { node: opts.node, enter: () => this.#openScreen('options', 'pause') },
      { node: again.node, enter: () => this.#restart() },
      { node: quit.node, enter: () => this.#restart(true) },
    ];
    this.#wire(sc);
  }

  #buildResults() {
    const sc = this.#newScreen('results', false);
    const b = sc.body;
    const h = add(b, 'h2', null);
    h.textContent = 'RESULTADO';
    this.parts.resultTitle = h;
    this.parts.podium = add(b, 'div', 'podium');
    const list = add(b, 'div', 'menu');
    const again = this.#menuItem(list, 'CORRER DE NOVO', { primary: true });
    const menu = this.#menuItem(list, 'MENU PRINCIPAL');
    add(b, 'div', 'hint').innerHTML = '<kbd>Enter</kbd> confirmar';

    sc.items = [
      { node: again.node, enter: () => this.#restart() },
      { node: menu.node, enter: () => this.#restart(true) },
    ];
    this.#wire(sc);
  }

  #wire(sc) {
    sc.items.forEach((it, i) => {
      if (!it.node) return;
      it.node.addEventListener('click', (e) => {
        const r = it.node.getBoundingClientRect();
        sc.index = i;
        this.#paintNav(sc);
        if (it.left && it.right) {
          (e.clientX < r.left + r.width * 0.35 ? it.left : it.right)();
        } else it.enter?.();
      });
      it.node.addEventListener('pointerenter', () => { sc.index = i; this.#paintNav(sc); });
    });
  }

  #paintNav(sc) {
    sc.items.forEach((it, i) => {
      const on = i === sc.index;
      if (it.mark) it.mark(on);
      else if (it.node) setClass(it.node, 'sel', on);
    });
  }

  /* ----------------------------------------------------------------- touch */

  #buildTouch(root) {
    const P = this.parts;
    const wrap = add(root, 'div', 'touch');

    const stick = P.stick = add(wrap, 'div', 'tstick');
    P.knob = add(stick, 'div', 'knob');
    add(stick, 'div', 'tick').textContent = '◀   ▶';

    const btns = add(wrap, 'div', 'tbtns');
    const mk = (cls, label) => {
      const n = add(btns, 'div', 'tb ' + cls);
      n.textContent = label;
      return n;
    };
    P.bBrake = mk('brake', 'RÉ');
    P.bItem = mk('item', 'ITEM');
    P.bDrift = mk('drift', 'DRIFT');
    P.bAccel = mk('accel big', 'GÁS');

    const t = this.touch = { steer: 0, accel: 0, brake: 0, drift: false, item: false, active: false };

    const push = () => {
      const it = this.ctx?.input?.touch;
      if (it) Object.assign(it, t);
    };

    let stickId = null;
    const onStick = (e) => {
      const r = stick.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width * 0.42);
      t.steer = clamp(dx, -1, 1) * (0.55 + this.settings.sens * 0.045);
      t.steer = clamp(t.steer, -1, 1);
      t.active = true;
      setVar(P.knob, '--sx', t.steer.toFixed(3));
      push();
    };
    this.#on(stick, 'pointerdown', (e) => {
      stickId = e.pointerId; stick.setPointerCapture(e.pointerId); onStick(e); e.preventDefault();
    });
    this.#on(stick, 'pointermove', (e) => { if (e.pointerId === stickId) onStick(e); });
    const endStick = (e) => {
      if (e.pointerId !== stickId) return;
      stickId = null; t.steer = 0; setVar(P.knob, '--sx', '0'); push();
    };
    this.#on(stick, 'pointerup', endStick);
    this.#on(stick, 'pointercancel', endStick);

    const hold = (node, apply) => {
      const down = (e) => {
        node.setPointerCapture?.(e.pointerId);
        setClass(node, 'on', true); apply(true); t.active = true; push(); e.preventDefault();
      };
      const up = () => { setClass(node, 'on', false); apply(false); push(); };
      this.#on(node, 'pointerdown', down);
      this.#on(node, 'pointerup', up);
      this.#on(node, 'pointercancel', up);
      this.#on(node, 'pointerleave', up);
    };
    hold(P.bAccel, (v) => { t.accel = v ? 1 : 0; });
    hold(P.bBrake, (v) => { t.brake = v ? 1 : 0; });
    hold(P.bDrift, (v) => { t.drift = v; });
    hold(P.bItem, (v) => { t.item = v; });

    const q = new URLSearchParams(typeof location !== 'undefined' ? location.search : '');
    const coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
    this.touchOn = q.has('touch') ? q.get('touch') !== '0' : coarse;
    setClass(root, 'touch-on', this.touchOn);
  }

  #on(node, type, fn) {
    node.addEventListener(type, fn, { passive: false });
    this.#ptrHandlers.push([node, type, fn]);
  }

  /* ---------------------------------------------------------------- events */

  #bindEvents() {
    const ev = this.ctx.events;
    this.offs = [
      ev.on('race:countdown', (e) => this.#countdown(e?.n ?? 0)),
      ev.on('race:start', () => { replay(this.parts.grid, 'swoop'); }),
      ev.on('race:lap', (e) => {
        if (!e?.kart?.isPlayer) return;
        if (e.final) this.#toast('final', 'VOLTA FINAL!', 'gold', 2600, true);
        const best = e.kart.bestLapMs;
        if (best && e.lapMs <= best + 0.001 && e.kart.lapTimes.length > 1) {
          this.#toast('rec', 'MELHOR VOLTA', 'good', 2000);
          replay(this.parts.tBest.row, 'record');
        }
      }),
      ev.on('race:finish', (e) => {
        if (!e?.kart?.isPlayer) return;
        this.#toast('fin', `${e.place}${ordinal()} LUGAR!`, e.place <= 3 ? 'good' : 'gold', 3200);
      }),
      ev.on('race:results', () => this.#showResults()),
      ev.on('kart:drift-tier', (e) => {
        if (!e?.kart?.isPlayer || !e.tier) return;
        replay(this.parts.mt, 'pop');
      }),
      ev.on('kart:respawn-start', (e) => {
        if (e?.kart?.isPlayer) this.#toast('resp', 'RESGATE', 'danger', 1600);
      }),
      ev.on('item:pickup', (e) => {
        if (e && e.kart && !e.kart.isPlayer) return;
        this.#roll = { until: this.ctx.time.t + 0.85, id: this.#itemId(e?.item) };
      }),
      ev.on('item:use', (e) => {
        if (e && e.kart && !e.kart.isPlayer) return;
        this.#roll = null;
        this.#setItem('none');
      }),
      ev.on('kart:hit', (e) => {
        if (e?.kart?.isPlayer) this.#toast('hit', 'ATINGIDO!', 'danger', 1200);
      }),
    ];
  }

  #bindKeys() {
    this.#keyHandler = (e) => {
      if (!this.#screen) return;
      const sc = this.#screens[this.#screen];
      if (!sc) return;
      const it = sc.items[sc.index];
      let used = true;
      switch (e.code) {
        case 'ArrowUp': case 'KeyW':
          sc.index = (sc.index + sc.items.length - 1) % sc.items.length; this.#paintNav(sc); break;
        case 'ArrowDown': case 'KeyS':
          sc.index = (sc.index + 1) % sc.items.length; this.#paintNav(sc); break;
        case 'ArrowLeft': case 'KeyA': it?.left?.(); break;
        case 'ArrowRight': case 'KeyD': it?.right?.(); break;
        case 'Enter': case 'Space': case 'NumpadEnter': it?.enter?.(); break;
        case 'Escape': case 'KeyP': this.#back(); break;
        default: used = false;
      }
      if (used) { e.preventDefault(); e.stopPropagation(); }
    };
    window.addEventListener('keydown', this.#keyHandler, { capture: true });
  }

  /* --------------------------------------------------------------- actions */

  #applyCharacter(i, silent) {
    const ctx = this.ctx;
    this.charIndex = i;
    const chosen = ROSTER[i];
    const player = ctx.karts?.[0];
    if (player) {
      const other = ctx.karts.find((k) => k !== player && k.name === chosen.name);
      if (other) { other.name = player.name; Object.assign(other.stats, ROSTER.find((r) => r.name === player.name)?.stats ?? {}); }
      player.name = chosen.name;
      Object.assign(player.stats, chosen.stats);
    }
    this.#cards.forEach((c, n) => setClass(c, 'sel', n === i));
    if (!silent) this.#syncBoardNames();
  }

  #applySettings() {
    const s = this.settings;
    const ctx = this.ctx;
    const qi = QUALITIES[s.quality];
    if (this.optOut) {
      setText(this.optOut.q, qi.label);
      setText(this.optOut.vol, s.volume === 0 ? 'MUDO' : `${s.volume * 10}%`);
      setText(this.optOut.sen, `${s.sens}/10`);
    }
    if (ctx.quality !== qi.id) {
      ctx.quality = qi.id;
      ctx.events.emit('quality:change', { quality: qi.id });
      ctx.game?.resize?.();
    }
    ctx.settings = ctx.settings ?? {};
    ctx.settings.volume = s.volume / 10;
    ctx.settings.sensitivity = s.sens / 10;
    ctx.events.emit('audio:volume', { volume: s.volume / 10 });
  }

  #startRace() {
    this.#closeScreen();
    replay(this.parts.grid, 'swoop');
  }

  #restart(toMenu) {
    const q = new URLSearchParams(location.search);
    q.set('char', String(this.charIndex));
    q.set('quality', QUALITIES[this.settings.quality].id);
    if (toMenu) q.delete('nomenu'); else q.set('nomenu', '1');
    location.search = q.toString();
  }

  #back() {
    if (this.#screen === 'options') this.#openScreen(this.optionsFrom ?? 'menu');
    else if (this.#screen === 'pause') this.#closeScreen();
    else if (this.#screen === 'menu') { /* nowhere to go */ }
  }

  #openScreen(name, from) {
    if (name === 'options') this.optionsFrom = from ?? this.optionsFrom ?? 'menu';
    for (const k in this.#screens) setClass(this.#screens[k].node, 'open', k === name);
    this.#screen = name;
    const sc = this.#screens[name];
    if (sc) { sc.index = name === 'menu' ? 0 : 0; this.#paintNav(sc); }
    setClass(this.root, 'hide-hud', true);
    if (this.ctx?.time) this.ctx.time.scale = 0;
  }

  #closeScreen() {
    for (const k in this.#screens) setClass(this.#screens[k].node, 'open', false);
    this.#screen = null;
    setClass(this.root, 'hide-hud', false);
    if (this.ctx?.time) this.ctx.time.scale = 1;
  }

  /* --------------------------------------------------------------- results */

  #showResults() {
    const ctx = this.ctx;
    const pod = this.parts.podium;
    while (pod.firstChild) pod.removeChild(pod.firstChild);

    const rows = [];
    for (const r of ctx.race.results ?? []) rows.push(r);
    const seen = new Set(rows.map((r) => r.id));
    for (const k of ctx.karts) {
      if (seen.has(k.id)) continue;
      rows.push({ id: k.id, name: k.name, place: k.place ?? rows.length + 1, timeMs: 0, bestLapMs: k.bestLapMs });
    }
    rows.sort((a, b) => a.place - b.place);

    const medal = ['gold', 'silver', 'bronze'];
    rows.forEach((r, i) => {
      const kart = ctx.karts.find((k) => k.id === r.id);
      const cls = ['pr', medal[i] ?? '', kart?.isPlayer ? 'me' : ''].filter(Boolean).join(' ');
      const n = add(pod, 'div', cls);
      n.style.setProperty('--i', String(i));
      const p = add(n, 'span', 'p' + (i < 3 ? ' medal' : ''));
      p.textContent = `${r.place}${ordinal()}`;
      add(n, 'span', 'nm').textContent = r.name.toUpperCase();
      add(n, 'span', 't').textContent = r.timeMs ? raceTime(r.timeMs) : '—';
      add(n, 'span', 'bl').textContent = lapTime(r.bestLapMs);
    });

    const me = rows.find((r) => ctx.karts.find((k) => k.id === r.id)?.isPlayer);
    setText(this.parts.resultTitle, me && me.place <= 3 ? 'PÓDIO!' : 'RESULTADO');
    this.#openScreen('results');
  }

  /* ------------------------------------------------------------- countdown */

  #countdown(n) {
    const P = this.parts;
    const txt = n > 0 ? String(n) : 'GO!';
    setText(P.countS, txt);
    setText(P.countF, txt);
    setClass(P.count, 'go', n === 0);
    replay(P.count, 'beat');
  }

  /* ---------------------------------------------------------------- toasts */

  #toast(key, text, kind = 'gold', ms = 2200, blink = false) {
    let w = this.#warns.get(key);
    if (!w) {
      const node = add(this.parts.warns, 'div', 'warn ' + kind);
      w = { node, span: add(node, 'span'), kind };
      this.#warns.set(key, w);
    }
    if (w.kind !== kind) { w.node.classList.remove(w.kind); w.node.classList.add(kind); w.kind = kind; }
    setText(w.span, text);
    setClass(w.node, 'blink', blink);
    w.node.classList.remove('out');
    w.closing = false;
    w.until = ms > 0 ? this.ctx.time.t + ms / 1000 : Infinity;
    replay(w.node, 'warn');
  }

  #clearToast(key) {
    const w = this.#warns.get(key);
    if (w && w.until === Infinity) w.until = this.ctx.time.t;
  }

  #tickToasts(t) {
    for (const [key, w] of this.#warns) {
      if (t < w.until) continue;
      if (!w.closing) { w.closing = true; w.closeAt = t + 0.32; w.node.classList.add('out'); }
      else if (t >= w.closeAt) { w.node.remove(); this.#warns.delete(key); }
    }
  }

  /* --------------------------------------------------------------- minimap */

  #bakeMap() {
    const w = this.ctx.world;
    if (!w?.sampleSpline) return;
    const N = 320;
    const L = new Float32Array(N * 2), R = new Float32Array(N * 2), C = new Float32Array(N * 2);
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (let i = 0; i < N; i++) {
      const s = w.sampleSpline(i / N);
      const hw = (s.width ?? 12) * 0.5 + 1.2;
      const lx = s.pos.x - s.right.x * hw, lz = s.pos.z - s.right.z * hw;
      const rx = s.pos.x + s.right.x * hw, rz = s.pos.z + s.right.z * hw;
      L[i * 2] = lx; L[i * 2 + 1] = lz;
      R[i * 2] = rx; R[i * 2 + 1] = rz;
      C[i * 2] = s.pos.x; C[i * 2 + 1] = s.pos.z;
      minX = Math.min(minX, lx, rx); maxX = Math.max(maxX, lx, rx);
      minZ = Math.min(minZ, lz, rz); maxZ = Math.max(maxZ, lz, rz);
    }
    this.#map = { N, L, R, C, minX, maxX, minZ, maxZ, bg: null, w: 0, h: 0, sc: 1, ox: 0, oy: 0 };
    this.#renderMapBg();
  }

  #renderMapBg() {
    const m = this.#map;
    const cv = this.parts.mapCanvas;
    if (!m || !cv) return;
    const rect = this.parts.mapBox.getBoundingClientRect();
    const dpr = Math.min(this.ctx.viewport?.dpr || 1, 2);
    const px = Math.max(64, Math.round((rect.width || 160) * dpr));
    if (px === m.w && m.bg) return;
    cv.width = cv.height = m.w = m.h = px;

    const pad = px * 0.11;
    const spanX = m.maxX - m.minX, spanZ = m.maxZ - m.minZ;
    const sc = Math.min((px - pad * 2) / spanX, (px - pad * 2) / spanZ);
    m.sc = sc;
    m.ox = (px - spanX * sc) * 0.5 - m.minX * sc;
    m.oy = (px - spanZ * sc) * 0.5 - m.minZ * sc;

    const off = document.createElement('canvas');
    off.width = off.height = px;
    const g = off.getContext('2d');
    const X = (x) => x * sc + m.ox, Y = (z) => z * sc + m.oy;

    // road body
    g.beginPath();
    for (let i = 0; i < m.N; i++) {
      const x = X(m.L[i * 2]), y = Y(m.L[i * 2 + 1]);
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    for (let i = m.N - 1; i >= 0; i--) g.lineTo(X(m.R[i * 2]), Y(m.R[i * 2 + 1]));
    g.closePath();
    g.fillStyle = 'rgba(232, 248, 236, .19)';
    g.fill();
    g.strokeStyle = 'rgba(255, 255, 255, .38)';
    g.lineWidth = Math.max(1, px * 0.006);
    g.stroke();

    // centre line
    g.beginPath();
    for (let i = 0; i < m.N; i++) {
      const x = X(m.C[i * 2]), y = Y(m.C[i * 2 + 1]);
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath();
    g.setLineDash([px * 0.022, px * 0.026]);
    g.strokeStyle = 'rgba(255, 198, 26, .5)';
    g.lineWidth = Math.max(1, px * 0.008);
    g.stroke();
    g.setLineDash([]);

    // start / finish
    const sx = X(m.C[0]), sy = Y(m.C[1]);
    const lx = X(m.L[0]) - sx, ly = Y(m.L[1]) - sy;
    g.beginPath();
    g.moveTo(sx - lx, sy - ly); g.lineTo(sx + lx, sy + ly);
    g.strokeStyle = '#ffffff';
    g.lineWidth = Math.max(2, px * 0.018);
    g.stroke();

    m.bg = off;
  }

  #drawMap(ctx) {
    const m = this.#map;
    const cv = this.parts.mapCanvas;
    if (!m?.bg || !cv) return;
    const g = cv.getContext('2d');
    const px = m.w;
    g.clearRect(0, 0, px, px);
    g.drawImage(m.bg, 0, 0);

    const rDot = Math.max(2.4, px * 0.031);
    for (const k of ctx.karts) {
      const x = k.position.x * m.sc + m.ox;
      const y = k.position.z * m.sc + m.oy;
      const me = k.isPlayer;
      g.beginPath();
      g.arc(x, y, me ? rDot * 1.32 : rDot, 0, Math.PI * 2);
      g.fillStyle = me ? '#ffffff' : (ROSTER[k.liveryIndex % ROSTER.length]?.color ?? '#9aa');
      g.globalAlpha = k.finished ? 0.4 : 1;
      g.fill();
      g.lineWidth = Math.max(1, px * 0.008);
      g.strokeStyle = me ? '#08120c' : 'rgba(6,14,9,.75)';
      g.stroke();
      if (me) {
        g.beginPath();
        g.arc(x, y, rDot * 0.6, 0, Math.PI * 2);
        g.fillStyle = '#24d15c';
        g.fill();
      }
      g.globalAlpha = 1;
    }
  }

  /* ------------------------------------------------------------- item slot */

  #itemId(v) {
    if (!v) return 'none';
    const id = typeof v === 'string' ? v : (v.id ?? v.name ?? v.type);
    return ITEM_KEYS.includes(id) ? id : 'none';
  }

  #setItem(id, landed) {
    const P = this.parts;
    if (this.curItem === id) return;
    for (const k of ITEM_KEYS) setClass(P.glyphs[k], 'on', k === id);
    this.curItem = id;
    setClass(P.item, 'has', id !== 'none');
    setText(P.itemLabel, ITEM_LABEL[id] ?? '');
    if (landed) replay(P.item, 'landed');
  }

  #tickItem(ctx) {
    const P = this.parts;
    const player = ctx.player;
    const held = this.#itemId(player?.item);

    if (this.#roll) {
      const t = ctx.time.t;
      if (t < this.#roll.until) {
        setClass(P.item, 'spin', true);
        const i = Math.floor(t * 15) % ITEM_ORDER.length;
        const id = ITEM_ORDER[i];
        for (const k of ITEM_KEYS) setClass(P.glyphs[k], 'on', k === id);
        this.curItem = id;
        setClass(P.item, 'has', false);
        return;
      }
      const landed = this.#roll.id !== 'none' ? this.#roll.id : held;
      this.#roll = null;
      setClass(P.item, 'spin', false);
      this.curItem = null;
      this.#setItem(landed, true);
      return;
    }
    setClass(P.item, 'spin', false);
    this.#setItem(held);
  }

  /* ------------------------------------------------------------------ tick */

  lateUpdate(dt, ctx) { this.#tick(ctx, false); }

  #tick(ctx, first) {
    const P = this.parts;
    const race = ctx.race;
    const k = ctx.player;
    this.#frame++;

    /* pause toggle -------------------------------------------------------- */
    if (ctx.input?.state?.pressed?.pause) {
      if (!this.#screen && race.state !== 'results') this.#openScreen('pause');
      else if (this.#screen === 'pause') this.#closeScreen();
      else if (this.#screen === 'options') this.#back();
    }

    if (!k) return;

    /* placing ------------------------------------------------------------- */
    const place = race.playerPlace || k.place || 1;
    const field = race.fieldSize || ctx.karts.length || 8;
    if (place !== this.lastPlace) {
      if (setText(P.placeNumF, place)) setText(P.placeNumS, place);
      if (!first && this.lastPlace != null) {
        P.place.classList.remove('up', 'down');
        void P.place.offsetWidth;
        P.place.classList.add(place < this.lastPlace ? 'up' : 'down');
      }
      this.lastPlace = place;
    }
    setText(P.placeOf, '/' + field);

    /* laps ---------------------------------------------------------------- */
    const lap = Math.min(k.lap ?? 1, race.totalLaps);
    setText(P.lapCur, lap);
    setText(P.lapTot, race.totalLaps);
    const isFinal = lap >= race.totalLaps && race.state !== 'results';
    setClass(P.lap, 'final', isFinal);

    /* timing -------------------------------------------------------------- */
    const total = race.timeMs ?? 0;
    setText(P.tTotal.v, raceTime(total));
    const lapMs = race.state === 'countdown' ? 0 : Math.max(0, total - (k.lapStartMs ?? 0));
    setText(P.tLap.v, lapTime(lapMs));
    setText(P.tBest.v, lapTime(k.bestLapMs));

    /* speedometer --------------------------------------------------------- */
    const kmh = Math.round((k.speed ?? 0) * 3.6);
    setText(P.kmh, kmh);
    const top = (k.stats?.topSpeed ?? 27) * 1.55;
    setVar(P.speedo, '--v', clamp((k.speed ?? 0) / top, 0, 1).toFixed(3));
    setClass(P.speedo, 'boosting', (k.boost?.timer ?? 0) > 0);

    /* mini-turbo pips ----------------------------------------------------- */
    const tier = k.drift?.active ? (k.drift.tier ?? 0) : 0;
    if (tier !== this.lastTier) {
      P.mt.classList.remove('t1', 't2', 't3');
      if (tier > 0) P.mt.classList.add('t' + Math.min(3, tier));
      this.lastTier = tier;
    }

    /* item ---------------------------------------------------------------- */
    this.#tickItem(ctx);

    /* standings ----------------------------------------------------------- */
    this.#tickBoard(ctx);

    /* warnings ------------------------------------------------------------ */
    this.#tickWarnings(ctx, k, race);
    this.#tickToasts(ctx.time.t);

    /* minimap ------------------------------------------------------------- */
    const skip = ctx.quality === 'low' ? 3 : 1;
    if (first || this.#frame % skip === 0) this.#drawMap(ctx);
  }

  #tickWarnings(ctx, k, race) {
    if (race.state !== 'racing' && race.state !== 'finishing') { this.#clearToast('wrong'); return; }

    // forward axis straight from the quaternion (cheaper than a Vector3 round-trip)
    const q = k.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const p = ctx.world?.project?.(k.position);
    let wrong = false;
    if (p?.forward && (k.speed ?? 0) > 4 && !k.respawn?.active) {
      wrong = fx * p.forward.x + fz * p.forward.z < -0.3;
    }
    if (wrong && !this.#warns.has('wrong')) this.#toast('wrong', 'NA CONTRAMÃO!', 'danger', 0, true);
    else if (!wrong) this.#clearToast('wrong');
  }

  #syncBoardNames() { this.boardOrder = null; }

  #tickBoard(ctx) {
    const board = this.parts.board;
    const sorted = (this.sortBuf = this.sortBuf ?? []);
    sorted.length = 0;
    for (const k of ctx.karts) sorted.push(k);
    sorted.sort((a, b) => (a.place || 99) - (b.place || 99));

    let changed = !this.boardOrder;
    if (!changed) for (let i = 0; i < sorted.length; i++) if (this.boardOrder[i] !== sorted[i].id) { changed = true; break; }

    if (changed) {
      const nodes = this.#rows.slice(0, sorted.length).map((r) => r.node);
      const before = nodes.map((n) => n.offsetTop);
      sorted.forEach((k, i) => board.appendChild(this.#rows[i].node));
      const after = nodes.map((n) => n.offsetTop);
      nodes.forEach((n, i) => {
        const d = before[i] - after[i];
        if (!d) return;
        n.style.transition = 'none';
        n.style.transform = `translateY(${d}px)`;
      });
      void board.offsetWidth;
      nodes.forEach((n) => { n.style.transition = ''; n.style.transform = ''; });
      this.boardOrder = sorted.map((k) => k.id);
    }

    sorted.forEach((k, i) => {
      const row = this.#rows[i];
      if (!row) return;
      setText(row.p, k.place || i + 1);
      setText(row.nm, k.name);
      setClass(row.node, 'me', !!k.isPlayer);
      setClass(row.node, 'done', !!k.finished);
      const c = ROSTER[k.liveryIndex % ROSTER.length]?.color ?? '#9aa';
      if (row.id !== k.id) { row.dot.style.background = c; row.id = k.id; }
    });
  }

  /* ---------------------------------------------------------------- resize */

  resize(w, h, ctx) {
    setClass(this.root, 'portrait', h > w);
    this.#renderMapBg();
    this.#drawMap(ctx);
  }

  dispose() {
    for (const off of this.offs ?? []) off?.();
    if (this.#keyHandler) window.removeEventListener('keydown', this.#keyHandler, { capture: true });
    for (const [n, t, f] of this.#ptrHandlers) n.removeEventListener(t, f);
    this.#ptrHandlers.length = 0;
    this.root?.remove();
    this.styleTag?.remove();
    if (this.ctx) { this.ctx.hud = null; this.ctx.time.scale = 1; }
  }

  #roll = null;
}
