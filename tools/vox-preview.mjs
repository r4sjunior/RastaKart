/**
 * Parser validation: renders each .vxm with a simple isometric voxel raycast
 * so the result can be eyeballed against the official <name>.vxm.png preview
 * that VoxEdit shipped next to it.
 *
 *   node tools/vox-preview.mjs [ME002] [tools/out/preview]
 */
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseVXM } from './vox-format.mjs';
import { encodePNG } from './png.mjs';

const DIR = process.argv[2] ?? 'ME002';
const OUT = process.argv[3] ?? 'tools/out/preview';
mkdirSync(OUT, { recursive: true });

const SCALE = 6;      // px per voxel step
const SHADE = [1.0, 0.62, 0.80]; // +Y top, side, front

/** Painter's-algorithm isometric: draw back-to-front, three lit faces per voxel. */
function renderIso(m, { flipX = false } = {}) {
  const { x: sx, y: sy, z: sz } = m.size;
  const vox = m.models[0].voxels;
  const at = (x, y, z) => (x < 0 || y < 0 || z < 0 || x >= sx || y >= sy || z >= sz)
    ? 0 : vox[((flipX ? sx - 1 - x : x) * sy + y) * sz + z];

  const hw = SCALE, hh = SCALE / 2, dy = SCALE;
  const px = (x, y, z) => [(x - z) * hw, -(y * dy) + (x + z) * hh];
  const pts = [];
  for (const [x, z] of [[0, 0], [sx, 0], [0, sz], [sx, sz]]) {
    for (const y of [0, sy]) pts.push(px(x, y, z));
  }
  const minX = Math.min(...pts.map((p) => p[0])) - 4;
  const maxX = Math.max(...pts.map((p) => p[0])) + 4;
  const minY = Math.min(...pts.map((p) => p[1])) - 4;
  const maxY = Math.max(...pts.map((p) => p[1])) + 4;
  const W = Math.ceil(maxX - minX), H = Math.ceil(maxY - minY);
  const img = new Uint8Array(W * H * 4);

  const poly = (verts, r, g, b) => {
    let lo = Infinity, hi = -Infinity;
    for (const v of verts) { lo = Math.min(lo, v[1]); hi = Math.max(hi, v[1]); }
    for (let y = Math.floor(lo); y <= Math.ceil(hi); y++) {
      const xs = [];
      for (let i = 0; i < verts.length; i++) {
        const a = verts[i], c = verts[(i + 1) % verts.length];
        if ((a[1] <= y && c[1] > y) || (c[1] <= y && a[1] > y)) {
          xs.push(a[0] + ((y - a[1]) / (c[1] - a[1])) * (c[0] - a[0]));
        }
      }
      if (xs.length < 2) continue;
      xs.sort((p, q) => p - q);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        for (let x = Math.floor(xs[k]); x < Math.ceil(xs[k + 1]); x++) {
          const sxp = x - Math.floor(minX), syp = y - Math.floor(minY);
          if (sxp < 0 || syp < 0 || sxp >= W || syp >= H) continue;
          const o = (syp * W + sxp) * 4;
          img[o] = r; img[o + 1] = g; img[o + 2] = b; img[o + 3] = 255;
        }
      }
    }
  };

  // depth order: far -> near for a camera looking from (+x, +y, +z)
  for (let d = 0; d <= sx + sy + sz; d++) {
    for (let x = 0; x < sx; x++) {
      for (let z = 0; z < sz; z++) {
        const y = d - x - z;
        if (y < 0 || y >= sy) continue;
        const v = at(x, y, z);
        if (!v) continue;
        const c = m.palette[v - 1];
        const P = (X, Y, Z) => { const p = px(X, Y, Z); return [p[0], p[1]]; };
        if (!at(x, y + 1, z)) {
          poly([P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)],
            c.r * SHADE[0], c.g * SHADE[0], c.b * SHADE[0]);
        }
        if (!at(x + 1, y, z)) {
          poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)],
            c.r * SHADE[1], c.g * SHADE[1], c.b * SHADE[1]);
        }
        if (!at(x, y, z + 1)) {
          poly([P(x, y, z + 1), P(x, y + 1, z + 1), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)],
            c.r * SHADE[2], c.g * SHADE[2], c.b * SHADE[2]);
        }
      }
    }
  }
  return { img, W, H };
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.vxm')).sort();
for (const f of files) {
  const m = parseVXM(join(DIR, f));
  const { img, W, H } = renderIso(m);
  writeFileSync(join(OUT, f.replace('.vxm', '.png')), encodePNG(img, W, H));
  console.log(`${f} -> ${W}x${H}`);
}
