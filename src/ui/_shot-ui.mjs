#!/usr/bin/env node
/**
 * HUD screenshot harness.
 *
 * `tests/shot.mjs` only captures the `#gl` canvas, so it can never see the DOM
 * HUD. This one drives the same deterministic page but screenshots the whole
 * viewport, at several sizes, forcing each UI state in turn.
 *
 *   node src/ui/_shot-ui.mjs                      # every scene, every size
 *   node src/ui/_shot-ui.mjs --scenes race,pause --sizes 1920x1080
 *   node src/ui/_shot-ui.mjs --dir tests/shots/ui2
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function argv() {
  const a = process.argv.slice(2); const o = {};
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith('--')) continue;
    const k = a[i].slice(2);
    o[k] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
  }
  return o;
}
const opt = argv();
const PORT = Number(opt.port ?? 5185);
const SEED = Number(opt.seed ?? 1337);
const OUT = resolve(ROOT, String(opt.dir ?? 'tests/shots/ui'));
const SIZES = String(opt.sizes ?? '1920x1080,1280x720,390x844')
  .split(',').map((s) => { const [w, h] = s.split('x').map(Number); return { w, h, tag: `${w}x${h}` }; });
const WANT = String(opt.scenes ?? 'menu,countdown,race,pause,options,results').split(',');

const GL_ARGS = [
  '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist', '--enable-webgl', '--disable-gpu-sandbox',
  '--disable-frame-rate-limit', '--force-device-scale-factor=1',
  '--js-flags=--max-old-space-size=4096',
];

async function waitForPort(url, timeoutMs = 90_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try { const r = await fetch(url); if (r.ok || r.status === 404) return true; } catch { }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`dev server never answered at ${url}`);
}

async function startServer() {
  const url = `http://127.0.0.1:${PORT}`;
  try { const r = await fetch(url, { signal: AbortSignal.timeout(1200) }); if (r.ok) return { url, kill: () => { } }; } catch { }
  const bin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const child = spawn(process.execPath, [bin, '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
  let err = '';
  child.stdout.on('data', () => { });
  child.stderr.on('data', (b) => { err += String(b); });
  child.on('exit', (c) => { if (c) console.error(`vite exited ${c}\n${err}`); });
  await waitForPort(url);
  return { url, kill: () => { try { child.kill(); } catch { } } };
}

/* --------------------------------------------------------------- scenes -- */

const DRIVE = `window.__RK.ctx.input.setScripted((t) => ({
  accel: 1,
  steer: Math.sin(t * 0.55) * 0.42,
  drift: t > 6.4 && t < 9.2,
}));`;

const SCENES = {
  menu: { query: '', setup: null, settle: 900 },

  countdown: {
    query: '&nomenu=1',
    setup: `window.__RK.ctx.events.emit('race:countdown', { n: 3 });`,
    settle: 260,
  },

  race: {
    query: '&nomenu=1',
    setup: `${DRIVE}
      window.__RK.simulate(12);
      window.__RK.ctx.player.item = 'shellRed';
      window.__RK.ctx.player.boost.timer = 0.9;
      window.__RK.ctx.player.drift.active = true;
      window.__RK.ctx.player.drift.tier = 2;
      window.__RK.ctx.player.bestLapMs = 41233;
      window.__RK.ctx.race.lap = 2; window.__RK.ctx.player.lap = 2;
      window.__RK.ctx.hud.sync();
      window.__RK.renderOnce();`,
    settle: 500,
  },

  finallap: {
    query: '&nomenu=1',
    setup: `${DRIVE}
      window.__RK.simulate(12);
      const c = window.__RK.ctx;
      c.player.lap = 3; c.race.lap = 3; c.player.bestLapMs = 41233;
      c.player.item = 'star';
      c.events.emit('race:lap', { kart: c.player, lap: 3, lapMs: 43120, final: true });
      c.hud.sync(); window.__RK.renderOnce();`,
    settle: 400,
  },

  pause: {
    query: '&nomenu=1',
    setup: `${DRIVE} window.__RK.simulate(12); window.__RK.ctx.hud.open('pause'); window.__RK.renderOnce();`,
    settle: 700,
  },

  options: {
    query: '&nomenu=1',
    setup: `${DRIVE} window.__RK.simulate(12); window.__RK.ctx.hud.open('options'); window.__RK.renderOnce();`,
    settle: 700,
  },

  results: {
    query: '&nomenu=1',
    setup: `${DRIVE}
      window.__RK.simulate(12);
      const c = window.__RK.ctx;
      const order = [2, 0, 5, 1, 7, 3, 6, 4];
      c.race.results = order.map((id, i) => {
        const k = c.karts[id];
        k.finished = true; k.place = i + 1;
        k.bestLapMs = 41233 + i * 812 + (i % 3) * 190;
        k.finishTimeMs = 128400 + i * 1730;
        return { id: k.id, name: k.name, place: i + 1, timeMs: k.finishTimeMs, bestLapMs: k.bestLapMs };
      });
      c.race.state = 'results';
      c.events.emit('race:results', { results: c.race.results, karts: c.karts });
      window.__RK.renderOnce();`,
    settle: 900,
  },
};

/* ------------------------------------------------------------------ run -- */

const server = await startServer();
const browser = await chromium.launch({ args: GL_ARGS });
const logs = [];
let failed = 0;

await mkdir(OUT, { recursive: true });

for (const size of SIZES) {
  for (const name of WANT) {
    const sc = SCENES[name];
    if (!sc) { console.error(`unknown scene "${name}"`); continue; }
    const page = await browser.newPage({
      viewport: { width: size.w, height: size.h },
      deviceScaleFactor: 1,
      isMobile: size.w < 500,
      hasTouch: size.w < 500,
    });
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${name} ${size.tag}] ${m.text()}`); });
    page.on('pageerror', (e) => logs.push(`[${name} ${size.tag} pageerror] ${e.message}`));

    const touch = size.w < 500 ? '&touch=1' : '';
    const url = `${server.url}/?static=1&seed=${SEED}&quality=high&dpr=1&shot=1${sc.query}${touch}`;
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 90_000 });
      await page.waitForFunction(() => window.__RK && window.__RK.ready === true, null, { timeout: 120_000 });
      await page.waitForFunction(() => !document.getElementById('boot'), null, { timeout: 10_000 }).catch(() => { });
      if (sc.setup) await page.evaluate(sc.setup);
      await page.waitForTimeout(sc.settle ?? 400);
      const out = join(OUT, `${name}_${size.tag}.png`);
      await page.screenshot({ path: out });
      console.log(`shot: ${name} @ ${size.tag} -> ${out}`);
    } catch (e) {
      failed++;
      console.error(`FAILED ${name} @ ${size.tag}: ${e.message}`);
    }
    await page.close();
  }
}

await browser.close();
server.kill();

if (logs.length) {
  console.log(`\n${logs.length} console problem(s):`);
  [...new Set(logs)].slice(0, 30).forEach((l) => console.log('  ' + l));
}
if (failed) process.exitCode = 1;
