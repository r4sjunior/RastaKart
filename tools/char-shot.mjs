#!/usr/bin/env node
/**
 * Fast isolated preview of the driver + kart (tools/preview/char.html).
 * Renders a contact sheet of several angles so silhouette, seating and
 * proportion can be judged without booting the whole race.
 *
 *   node tools/char-shot.mjs --out tests/shots/char2/sheet.png
 *   node tools/char-shot.mjs --views hero,side,front --eval "__PV.worldPos('Left_Hand')"
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const a = process.argv.slice(2); const opt = {};
for (let i = 0; i < a.length; i++) {
  if (!a[i].startsWith('--')) continue;
  const k = a[i].slice(2);
  opt[k] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
}
const VIEWS = String(opt.views ?? 'hero,side,front,close').split(',').map((s) => s.trim());
const OUT = resolve(ROOT, String(opt.out ?? 'tests/shots/char/sheet.png'));
const PORT = Number(opt.port ?? 5181);
const URL = `http://127.0.0.1:${PORT}/tools/preview/char.html`;

const GL_ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist', '--enable-webgl', '--disable-gpu-sandbox',
  '--disable-frame-rate-limit', '--force-device-scale-factor=1'];

async function up() {
  try { const r = await fetch(`http://127.0.0.1:${PORT}`, { signal: AbortSignal.timeout(1200) }); if (r.ok) return null; } catch {}
  const bin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const child = spawn(process.execPath, [bin, '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', () => {}); child.stderr.on('data', () => {});
  const t0 = Date.now();
  while (Date.now() - t0 < 60000) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}`); if (r.ok || r.status === 404) return child; } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('vite did not start');
}

const server = await up();
const browser = await chromium.launch({ args: GL_ARGS });
const page = await browser.newPage({ viewport: { width: 760, height: 760 }, deviceScaleFactor: 1 });
const logs = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));

try {
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction(() => window.__PV?.ready === true, null, { timeout: 60000 });

  if (opt.drive) {
    const [s, v] = String(opt.drive).split(',').map(Number);
    await page.evaluate(([s2, v2]) => window.__PV.drive(s2 ?? 0, v2 ?? 0), [s, v]);
  }
  if (opt.hidekart) await page.evaluate(() => window.__PV.hideKart(true));
  if (opt.eval) {
    const val = await page.evaluate((src) => {
      try { return JSON.parse(JSON.stringify(eval(src), (k, v) => (typeof v === 'number' ? +v.toFixed(4) : v))); }
      catch (e) { return { evalError: String(e?.message ?? e) }; }
    }, String(opt.eval));
    console.log('eval:', JSON.stringify(val));
  }

  const frames = [];
  for (const v of VIEWS) {
    await page.evaluate((n) => { window.__PV.view(n); window.__PV.render(); }, v);
    frames.push({ v, data: 'data:image/png;base64,' + (await page.locator('#gl').screenshot()).toString('base64') });
  }
  await mkdir(dirname(OUT), { recursive: true });
  const sp = await browser.newPage({ viewport: { width: 100, height: 100 } });
  const cols = Math.min(frames.length, 2);
  await sp.setContent(`<!doctype html><meta charset=utf-8><style>
    *{margin:0;padding:0;box-sizing:border-box}body{background:#101216}
    #g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:4px;width:max-content}
    .f{position:relative}.f img{display:block;width:640px}
    .n{position:absolute;left:8px;top:6px;font:700 16px system-ui;color:#ffd23f;text-shadow:0 1px 4px #000}
    </style><div id=g>${frames.map((f) => `<div class=f><img src="${f.data}"><div class=n>${f.v}</div></div>`).join('')}</div>`);
  await sp.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  await sp.locator('#g').screenshot({ path: OUT });
  console.log('sheet ->', OUT);
} finally {
  if (logs.length) { console.log(`${logs.length} console problem(s):`); logs.slice(0, 12).forEach((l) => console.log('  ' + l)); }
  await browser.close();
  if (server) try { server.kill(); } catch {}
}
