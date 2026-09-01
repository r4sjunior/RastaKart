/** Quick dump of the ME002 asset set — sanity check for the parsers. */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseVXM, parseVXR, parseVXA } from './vox-format.mjs';

const DIR = process.argv[2] ?? join(process.cwd(), 'ME002');

for (const f of readdirSync(DIR).filter((n) => n.endsWith('.vxm')).sort()) {
  try {
    const m = parseVXM(join(DIR, f));
    let filled = 0;
    for (const v of m.models[0].voxels) if (v) filled++;
    console.log(
      `${f.padEnd(20)} v${m.version} ${m.size.x}x${m.size.y}x${m.size.z}`,
      `pivot(${m.pivot.x.toFixed(3)},${m.pivot.y.toFixed(3)},${m.pivot.z.toFixed(3)})`,
      `pal=${m.palette.length} models=${m.models.length} filled=${filled}`,
    );
  } catch (e) { console.log(`${f.padEnd(20)} FAIL ${e.message}`); }
}

for (const f of readdirSync(DIR).filter((n) => n.endsWith('.vxr')).sort()) {
  try {
    const rig = parseVXR(join(DIR, f));
    console.log(`\n${f}  v${rig.version} defaultAnim='${rig.defaultAnim}' base='${rig.baseTemplate}'`);
    const walk = (n, d) => {
      console.log(`${'  '.repeat(d + 1)}${n.name}${n.filename ? ` <- ${n.filename}` : ''}`);
      n.children.forEach((c) => walk(c, d + 1));
    };
    rig.root.children.forEach((c) => walk(c, 0));

    const vxa = readdirSync(DIR).filter((n) => n.endsWith('.vxa'));
    for (const a of vxa.slice(0, 3)) {
      try {
        const clip = parseVXA(join(DIR, a), rig.root);
        const total = [...clip.tracks.values()].reduce((s, t) => s + t.frames.length, 0);
        console.log(`  VXA ok: ${a} v${clip.version} id='${clip.animId}' tracks=${clip.tracks.size} keys=${total}`);
      } catch (e) { console.log(`  VXA ${a}: ${e.message}`); }
    }
  } catch (e) { console.log(`${f} FAIL ${e.message}`); }
}
