#!/usr/bin/env node
/**
 * Deterministic screenshot harness.
 *
 *   node tests/shot.mjs --pose hero --sim 3 --out tests/shots/hero.png
 *   node tests/shot.mjs --poses hero,front,vista,overhead --sim 4 --dir tests/shots/round1
 *   node tests/shot.mjs --pose chase --sim 6 --w 1920 --h 1080 --drive
 *
 * Flags
 *   --pose/--poses  named camera pose(s) from CameraSystem.pose()
 *   --sim <s>       seconds of deterministic simulation before the shot
 *   --drive         feed a scripted "hold accelerator" input during the sim
 *   --start         dismiss the front-end menu before simulating
 *   --w --h         viewport (default 1600x900)
 *   --seed          RNG seed (default 1337)
 *   --quality       low|medium|high|ultra
 *   --url           override page URL
 *   --strip <n>     capture n frames spread over --sim seconds and composite
 *                   them into one filmstrip PNG (motion, drift, VFX review)
 *   --telemetry     dump per-step kart telemetry as CSV next to the shot
 *   --eval <js>     evaluate an expression in the page (game is __RK) and
 *                   print the result; use it to probe world/physics state
 *   --json          print machine-readable result
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function argv() {
  const a = process.argv.slice(2); const o = {};
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith('--')) continue;
    const k = a[i].slice(2);
    const v = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
    o[k] = v;
  }
  return o;
}
const opt = argv();
const POSES = String(opt.poses || opt.pose || 'chase').split(',').map((s) => s.trim()).filter(Boolean);
const SIM = Number(opt.sim ?? 3);
const W = Number(opt.w ?? 1600);
const H = Number(opt.h ?? 900);
const SEED = Number(opt.seed ?? 1337);
const QUALITY = String(opt.quality ?? 'high');
const OUT_DIR = opt.dir ? resolve(ROOT, String(opt.dir)) : null;
const opt_drift = !!opt.drift;
const OUT_ONE = opt.out ? resolve(ROOT, String(opt.out)) : null;

const GL_ARGS = [
  '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist', '--enable-webgl', '--disable-gpu-sandbox',
  '--disable-frame-rate-limit', '--force-device-scale-factor=1',
  '--js-flags=--max-old-space-size=4096',
];

async function waitForPort(url, timeoutMs = 90_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const r = await fetch(url, { method: 'GET' });
      if (r.ok || r.status === 404) return true;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`dev server never answered at ${url}`);
}

async function startServer() {
  if (opt.url) return { url: String(opt.url), kill: () => {} };
  const PORT = Number(opt.port ?? 5180);
  const url = `http://127.0.0.1:${PORT}`;
  // Reuse an already-running dev server when there is one.
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(1200) });
    if (r.ok) return { url, kill: () => {} };
  } catch { /* start our own */ }

  const bin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const child = spawn(process.execPath, [bin, '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
  let stderr = '';
  child.stdout.on('data', () => {});
  child.stderr.on('data', (b) => { stderr += String(b); });
  child.on('exit', (c) => { if (c) console.error(`vite exited ${c}
${stderr}`); });
  await waitForPort(url);
  return { url, kill: () => { try { child.kill(); } catch {} } };
}

const server = await startServer();
const browser = await chromium.launch({ args: GL_ARGS });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

const logs = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${e.stack ?? ''}`));

const target = `${server.url}/?static=1&seed=${SEED}&quality=${QUALITY}&dpr=1&shot=1`;
const result = { url: target, poses: [], errors: logs, ok: false };

try {
  await page.goto(target, { waitUntil: 'load', timeout: 90_000 });
  await page.waitForFunction(() => window.__RK && window.__RK.ready === true, null, { timeout: 120_000 });

  // Dismiss the front-end so gameplay poses frame the race, not the menu.
  if (opt.start) {
    await page.keyboard.press("Enter").catch(() => {});
    await page.waitForTimeout(250);
    const started = await page.evaluate(() => {
      const r = window.__RK?.ctx?.race;
      return r ? r.state : null;
    });
    if (true) {   // always try the button; race.state is already 'countdown' here
      await page.locator("text=LARGAR").first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(250);
    }
  }

  if (opt.drive) {
    // Steer the player down the racing line instead of holding a blind sine.
    // A screenshot is only worth judging if the kart is actually on the track.
    await page.evaluate((DRIFT) => {
      const ctx = window.__RK.ctx;
      let prevErr = 0;
      ctx.input.setScripted(() => {
        const k = ctx.player;
        const w = ctx.world;
        if (!k || !w) return { accel: 1 };
        const p = w.project(k.position);
        const here = w.sampleSpline(p.u);
        const bend = Math.abs(here.curvature ?? 0);
        const lead = (12 + Math.min(k.speed, 30) * 0.6) * Math.max(0.32, 1 / (1 + bend * 42));
        const ahead = w.sampleSpline((p.u + lead / w.trackLength) % 1);
        const target = ahead.pos.clone().addScaledVector(ahead.right, -p.lateral * 0.35);
        const to = target.sub(k.position); to.y = 0; to.normalize();
        const f = new ahead.pos.constructor(0, 0, 1).applyQuaternion(k.quaternion);
        f.y = 0; f.normalize();
        const err = Math.atan2(f.x * to.z - f.z * to.x, f.dot(to));
        const d = err - prevErr; prevErr = err;
        const steer = Math.max(-1, Math.min(1, err * 1.9 + d * 24));
        const curve = Math.abs(ahead.curvature ?? 0);
        const limit = curve > 1e-4 ? Math.min(k.stats.topSpeed, Math.sqrt(9.2 / curve)) : k.stats.topSpeed;
        const over = k.speed - limit;
        return {
          accel: over > 0 ? 0 : 1,
          brake: over > 3 ? Math.min(1, (over - 3) / 6) : 0,
          steer,
          drift: DRIFT && Math.abs(steer) > 0.45,
        };
      });
    }, opt_drift);
  }

  if (SIM > 0) await page.evaluate((s) => window.__RK.simulate(s), SIM);

  // --- probe ------------------------------------------------------------
  if (opt.eval) {
    const val = await page.evaluate((src) => {
      const __RK = window.__RK;
      const round = (k, v) => (typeof v === "number" ? +v.toFixed(4) : v);
      try { return JSON.parse(JSON.stringify(eval(src), round)); }
      catch (e) { return { evalError: String((e && e.message) || e) }; }
    }, String(opt.eval));
    console.log("eval:", JSON.stringify(val, null, 2));
    result.eval = val;
  }

  // --- filmstrip -------------------------------------------------------
  if (opt.strip) {
    const N = Number(opt.strip);
    const chunk = SIM / N;
    const frames = [];
    const pose = POSES[0] ?? 'chase';
    for (let i = 0; i < N; i++) {
      await page.evaluate((s) => window.__RK.simulate(s), chunk);
      await page.evaluate((p) => { window.__RK.pose(p); window.__RK.renderOnce(); window.__RK.renderOnce(); }, pose);
      frames.push('data:image/png;base64,' +
        (await page.locator('#gl').screenshot()).toString('base64'));
    }
    const stripOut = OUT_ONE ?? join(OUT_DIR ?? join(ROOT, 'tests', 'shots'), `strip_${pose}.png`);
    await mkdir(dirname(stripOut), { recursive: true });
    const sp = await browser.newPage({ viewport: { width: 100, height: 100 } });
    const cols = Math.min(N, 4);
    await sp.setContent(`<!doctype html><meta charset=utf-8><style>
      *{margin:0;padding:0;box-sizing:border-box}body{background:#0b0d10}
      #g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:3px;width:max-content}
      .f{position:relative}.f img{display:block;height:300px}
      .n{position:absolute;left:6px;top:6px;font:700 13px ui-sans-serif,system-ui;color:#f7d417;
         text-shadow:0 1px 3px #000}</style>
      <div id=g>${frames.map((f, i) =>
        `<div class=f><img src="${f}"><div class=n>t=${((i + 1) * chunk).toFixed(2)}s</div></div>`).join('')}</div>`);
    await sp.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
    await sp.locator('#g').screenshot({ path: stripOut });
    await sp.close();
    result.strip = stripOut;
    if (!opt.json) console.log(`strip: ${N} frames -> ${stripOut}`);
  }

  // --- telemetry -------------------------------------------------------
  if (opt.telemetry) {
    const rows = await page.evaluate(() => {
      const ctx = window.__RK.ctx;
      const g = window.__RK.game;
      const out = [];
      for (let i = 0; i < 480; i++) {          // 4 s at 120 Hz
        g.ctx.input.update(ctx.time.t);
        g.step(1 / 120);
        const k = ctx.player;
        if (!k) break;
        out.push({
          t: +ctx.time.t.toFixed(4), speed: +k.speed.toFixed(3),
          fwd: +(k.forwardSpeed ?? 0).toFixed(3), steer: +(k.steerAngle ?? 0).toFixed(3),
          drift: k.drift.active ? k.drift.dir : 0, charge: +(k.drift.charge ?? 0).toFixed(3),
          tier: k.drift.tier ?? 0, boost: +(k.boost.timer ?? 0).toFixed(3),
          air: k.onGround ? 0 : 1, surf: k.surface,
          x: +k.position.x.toFixed(2), y: +k.position.y.toFixed(2), z: +k.position.z.toFixed(2),
          lat: +(k.lateral ?? 0).toFixed(2), place: k.place ?? 0,
        });
      }
      return out;
    });
    const csvOut = join(OUT_DIR ?? join(ROOT, 'tests', 'shots'), 'telemetry.csv');
    await mkdir(dirname(csvOut), { recursive: true });
    const head = Object.keys(rows[0] ?? { t: 0 }).join(',');
    await writeFile(csvOut, [head, ...rows.map((r) => Object.values(r).join(','))].join(String.fromCharCode(10)));
    result.telemetry = { out: csvOut, rows: rows.length };
    if (!opt.json) console.log(`telemetry: ${rows.length} rows -> ${csvOut}`);
  }

  for (const pose of POSES) {
    const info = await page.evaluate((p) => {
      const r = window.__RK.pose(p);
      window.__RK.renderOnce();
      return r;
    }, pose);
    // two extra frames so temporal effects (TAA/motion blur) settle
    await page.evaluate(() => { window.__RK.renderOnce(); window.__RK.renderOnce(); });

    const out = OUT_ONE && POSES.length === 1
      ? OUT_ONE
      : join(OUT_DIR ?? join(ROOT, 'tests', 'shots'), `${pose}.png`);
    await mkdir(dirname(out), { recursive: true });
    await page.locator('#gl').screenshot({ path: out, timeout: 120000 });
    result.poses.push({ pose, out, camera: info });
    if (!opt.json) console.log(`shot: ${pose} -> ${out}`);
  }

  const stats = await page.evaluate(() => {
    const i = window.__RK.ctx.renderer?.info;
    return i ? { calls: i.render.calls, tris: i.render.triangles, textures: i.memory.textures, geoms: i.memory.geometries, programs: i.programs?.length ?? 0 } : null;
  });
  result.stats = stats;
  result.ok = true;
} catch (err) {
  result.error = err.message;
  process.exitCode = 1;
} finally {
  result.errors = logs;
  await browser.close();
  server.kill();
}

if (opt.json) console.log(JSON.stringify(result, null, 2));
else {
  if (result.stats) console.log('render:', JSON.stringify(result.stats));
  if (logs.length) { console.log(`\n${logs.length} console problem(s):`); logs.slice(0, 25).forEach((l) => console.log('  ' + l)); }
  if (result.error) console.error('FAILED:', result.error);
}
