#!/usr/bin/env node
/**
 * Side-by-side comparator. Composites our screenshot against a reference frame
 * into one labelled PNG so a critic can judge both in a single glance, at the
 * same scale, with no order bias (use --swap to flip and re-judge).
 *
 *   node tools/compare.mjs --a tests/shots/render/chase.png --b tests/refs/mk8_1.jpg \
 *        --labelA "RASTA KART" --labelB "MARIO KART 8 DELUXE" \
 *        --out tests/compare/chase_vs_mk8.png
 *
 *   --mode side | stack | split   (split = one image left half, other right half)
 *   --blind                       hide labels (labels become "A" / "B")
 *   --swap                        put B on the left
 *   --h <px>                      row height, default 720
 */
import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';

function argv() {
  const a = process.argv.slice(2); const o = {};
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith('--')) continue;
    const k = a[i].slice(2);
    o[k] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
  }
  return o;
}
const o = argv();
if (!o.a || !o.b) { console.error('need --a and --b'); process.exit(2); }

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif' };
async function dataUrl(p) {
  const buf = await readFile(resolve(p));
  return `data:${MIME[extname(p).toLowerCase()] ?? 'image/png'};base64,${buf.toString('base64')}`;
}

let [A, B] = [await dataUrl(o.a), await dataUrl(o.b)];
let [LA, LB] = [String(o.labelA ?? 'A'), String(o.labelB ?? 'B')];
if (o.blind) { LA = 'A'; LB = 'B'; }
if (o.swap) { [A, B] = [B, A]; [LA, LB] = [LB, LA]; }

const ROW_H = Number(o.h ?? 720);
const MODE = String(o.mode ?? 'side');
const out = resolve(String(o.out ?? 'tests/compare/compare.png'));
await mkdir(dirname(out), { recursive: true });

const html = `<!doctype html><meta charset=utf-8><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0b0d10;font-family:ui-sans-serif,system-ui,"Segoe UI",sans-serif}
  #wrap{display:${MODE === 'stack' ? 'block' : 'flex'};width:max-content}
  .cell{position:relative;background:#000}
  .cell img{display:block;height:${ROW_H}px;width:auto}
  .tag{position:absolute;left:0;bottom:0;right:0;padding:10px 14px;
       font:700 15px/1 ui-sans-serif,system-ui;letter-spacing:.14em;text-transform:uppercase;
       color:#fff;background:linear-gradient(to top,rgba(0,0,0,.85),rgba(0,0,0,0))}
  .sep{width:2px;background:#1fbf4a}
  #split{position:relative;height:${ROW_H}px;overflow:hidden}
  #split img{position:absolute;top:0;left:0;height:${ROW_H}px}
  #split .r{clip-path:inset(0 0 0 50%)}
  #split .line{position:absolute;top:0;bottom:0;left:50%;width:2px;background:#f7d417}
</style>
${MODE === 'split'
  ? `<div id=split><img src="${A}"><img class=r src="${B}"><div class=line></div>
     <div class=tag style="width:50%">${LA}</div>
     <div class=tag style="left:50%;text-align:right">${LB}</div></div>`
  : `<div id=wrap>
      <div class=cell><img src="${A}"><div class=tag>${LA}</div></div>
      <div class="sep"></div>
      <div class=cell><img src="${B}"><div class=tag>${LB}</div></div>
     </div>`}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 100, height: 100 } });
await page.setContent(html);
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
const el = await page.locator(MODE === 'split' ? '#split' : '#wrap');
await el.screenshot({ path: out });
const box = await el.boundingBox();
await browser.close();
console.log(`compare -> ${out}  (${Math.round(box.width)}x${Math.round(box.height)})`);
