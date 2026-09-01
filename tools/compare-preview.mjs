/**
 * Hard validation of the VXM parser: decodes the official VoxEdit preview PNG
 * (via chromium) and checks that every solid colour it contains exists in the
 * palette our parser produced for that part.
 *
 *   node tools/compare-preview.mjs [ME002]
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { parseVXM } from './vox-format.mjs';

const DIR = process.argv[2] ?? 'ME002';
const browser = await chromium.launch();
const page = await browser.newPage();

async function histogram(file) {
  const b64 = readFileSync(file).toString('base64');
  return page.evaluate(async (data) => {
    const img = new Image();
    img.src = `data:image/png;base64,${data}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    const hist = new Map();
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      const k = `${d[i]},${d[i + 1]},${d[i + 2]}`;
      hist.set(k, (hist.get(k) ?? 0) + 1);
    }
    return [...hist.entries()].sort((a, b) => b[1] - a[1]);
  }, b64);
}

let worst = 0;
for (const f of readdirSync(DIR).filter((n) => n.endsWith('.vxm')).sort()) {
  const m = parseVXM(join(DIR, f));
  const used = new Set();
  for (const v of m.models[0].voxels) if (v) used.add(v - 1);
  const pal = [...used].map((i) => m.palette[i]);

  const hist = await histogram(join(DIR, `${f}.png`));
  const total = hist.reduce((s, [, n]) => s + n, 0);
  // The preview renderer shades faces, so match on hue direction: find the
  // palette entry whose normalised RGB is closest, then measure the residual.
  let matchedPixels = 0;
  const misses = [];
  for (const [k, n] of hist) {
    const [r, g, b] = k.split(',').map(Number);
    const mx = Math.max(r, g, b, 1);
    let best = 1e9;
    for (const p of pal) {
      const pm = Math.max(p.r, p.g, p.b, 1);
      const d = Math.abs(r / mx - p.r / pm) + Math.abs(g / mx - p.g / pm) + Math.abs(b / mx - p.b / pm);
      if (d < best) best = d;
    }
    if (best < 0.12) matchedPixels += n; else misses.push([k, n, best.toFixed(2)]);
  }
  const pct = (matchedPixels / total) * 100;
  worst = Math.max(worst, 100 - pct);
  console.log(`${f.padEnd(20)} palette-used=${pal.length} preview-hues-matched=${pct.toFixed(1)}%` +
    (misses.length ? `  top-miss=${misses.slice(0, 3).map((x) => x[0] + '(' + x[2] + ')').join(' ')}` : ''));
}
await browser.close();
console.log(`\nworst unmatched: ${worst.toFixed(1)}%`);
