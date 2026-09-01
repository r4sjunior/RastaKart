/**
 * ME002 (VoxEdit / The Sandbox) -> single-draw-call skinned GLB.
 *
 *   node tools/build-character.mjs
 *
 * Output:
 *   public/assets/characters/rasta.glb        skinned mesh, 1 material
 *   public/assets/characters/rasta.rig.json   bone table + reference poses
 *
 * On top of the 17 authored bones the builder synthesises secondary bones by
 * carving the head volume by colour: the beanie and three dreadlock columns get
 * their own joints so the runtime can drive them with spring chains.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseVXM, parseVXR, parseVXA } from './vox-format.mjs';
import { greedyMesh } from './voxel-mesh.mjs';
import { writeGLB } from './glb.mjs';

const SRC = process.argv[2] ?? 'ME002';
const OUT = process.argv[3] ?? 'public/assets/characters';
const RIG_FILE = 'me.vxr';
const REST_CLIP = 'me.T.vxa';   // authored T-pose: every bone euler is 0
/** metres per voxel — puts the character at ~1.46 m, Mario-Kart chibi scale */
const VOXEL = 0.024;

const POSE_CLIPS = {
  rest: 'me.T.vxa',
  idle: 'me.Idle 01.vxa',
  sit: 'me.Sit Chair Idle 01.vxa',
  sitLow: 'me.Sit 01.vxa',
  cheer: 'me.Cheer 01.vxa',
  victory: 'me.Victory 01.vxa',
  sad: 'me.Sad 01.vxa',
  hit: 'me.Get Hit 01.vxa',
};

/** Head_A palette indices (1-based, as the mesher sees them). */
const HAT = new Set([80, 154, 160]); // green / yellow / red beanie bands
const HAIR = 126;                    // dreadlocks + the band under the beanie
const HAIR_TOP = 12;                 // beanie starts here, so hair below is loose

/**
 * Extra joints carved out of a part volume.
 * `pick(x,y,z,c)` keeps a voxel on this joint; `pivot(bounds)` gives the joint
 * origin in the part's own voxel grid.
 */
const SPLITS = {
  Head: [
    { name: 'Beanie', pick: (x, y, z, c) => HAT.has(c), pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.miny, (b.minz + b.maxz + 1) / 2] },
    { name: 'Dread_L', pick: (x, y, z, c) => c === HAIR && y < HAIR_TOP && x <= 9, pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.maxy + 1, (b.minz + b.maxz + 1) / 2] },
    { name: 'Dread_C', pick: (x, y, z, c) => c === HAIR && y < HAIR_TOP && x > 9 && x < 14, pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.maxy + 1, (b.minz + b.maxz + 1) / 2] },
    { name: 'Dread_R', pick: (x, y, z, c) => c === HAIR && y < HAIR_TOP && x >= 14, pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.maxy + 1, (b.minz + b.maxz + 1) / 2] },
  ],
};

mkdirSync(OUT, { recursive: true });

const rig = parseVXR(join(SRC, RIG_FILE));
const rest = parseVXA(join(SRC, REST_CLIP), rig.root);

/* ---------- flatten the authored bone tree ------------------------------ */

const bones = [];
(function walk(node, parent, path) {
  const p = path ? `${path}/${node.name}` : node.name;
  const t = rest.tracks.get(p)?.frames?.[0]?.t ?? [0, 0, 0];
  const idx = bones.length;
  bones.push({
    name: node.name,
    parent,
    path: p,
    filename: node.filename,
    // Hip carries the clip's root motion — neutralise it so bind is symmetric.
    local: node.name === 'Hip' ? [0, 0, 0] : [t[0] * VOXEL, t[1] * VOXEL, t[2] * VOXEL],
  });
  for (const c of node.children) walk(c, idx, p);
}(rig.root.children[0], -1, ''));

for (const b of bones) {
  b.world = b.parent < 0 ? [...b.local] : bones[b.parent].world.map((v, i) => v + b.local[i]);
}

/* ---------- mesh every part into bind (model) space --------------------- */

const mesh = { positions: [], normals: [], colors: [], joints: [], indices: [] };
const stats = [];

function append(part, label) {
  const base = mesh.positions.length / 3;
  mesh.positions.push(...part.positions);
  mesh.normals.push(...part.normals);
  mesh.colors.push(...part.colors);
  mesh.joints.push(...part.joints);
  for (const i of part.indices) mesh.indices.push(i + base);
  stats.push({ label, tris: part.indices.length / 3 });
}

const authored = bones.length;
for (let i = 0; i < authored; i++) {
  const b = bones[i];
  if (!b.filename) continue;
  const vxm = parseVXM(join(SRC, b.filename));
  const { x: sx, y: sy, z: sz } = vxm.size;
  const vox = vxm.models[0].voxels;
  const origin = [
    b.world[0] - vxm.pivot.x * sx * VOXEL,
    b.world[1] - vxm.pivot.y * sy * VOXEL,
    b.world[2] - vxm.pivot.z * sz * VOXEL,
  ];
  const pivotVox = [vxm.pivot.x * sx, vxm.pivot.y * sy, vxm.pivot.z * sz];

  const splits = SPLITS[b.name] ?? [];
  const claimed = new Uint8Array(vox.length);

  for (const sp of splits) {
    const sub = new Uint8Array(vox.length);
    const bd = { minx: 1e9, maxx: -1e9, miny: 1e9, maxy: -1e9, minz: 1e9, maxz: -1e9 };
    let n = 0;
    for (let x = 0; x < sx; x++) {
      for (let y = 0; y < sy; y++) {
        for (let z = 0; z < sz; z++) {
          const k = (x * sy + y) * sz + z;
          const c = vox[k];
          if (!c || !sp.pick(x, y, z, c)) continue;
          sub[k] = c; claimed[k] = 1; n++;
          bd.minx = Math.min(bd.minx, x); bd.maxx = Math.max(bd.maxx, x);
          bd.miny = Math.min(bd.miny, y); bd.maxy = Math.max(bd.maxy, y);
          bd.minz = Math.min(bd.minz, z); bd.maxz = Math.max(bd.maxz, z);
        }
      }
    }
    if (!n) { console.warn(`split ${sp.name}: no voxels`); continue; }
    const pv = sp.pivot(bd);
    const j = bones.length;
    const local = [(pv[0] - pivotVox[0]) * VOXEL, (pv[1] - pivotVox[1]) * VOXEL, (pv[2] - pivotVox[2]) * VOXEL];
    bones.push({
      name: sp.name, parent: i, path: `${b.path}/${sp.name}`, filename: '',
      local, world: b.world.map((v, k) => v + local[k]), synthetic: true,
    });
    append(greedyMesh(sub, vxm.size, vxm.palette, { scale: VOXEL, origin, joint: j }), `${b.name}/${sp.name}`);
  }

  // whatever the splits did not claim stays on the authored bone
  let main = vox;
  if (splits.length) {
    main = new Uint8Array(vox.length);
    for (let k = 0; k < vox.length; k++) main[k] = claimed[k] ? 0 : vox[k];
  }
  append(greedyMesh(main, vxm.size, vxm.palette, { scale: VOXEL, origin, joint: i }), `${b.name} (${b.filename})`);
}

/* ---------- inverse bind matrices (bind rotations are identity) --------- */

const inverseBind = [];
for (const b of bones) {
  inverseBind.push(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -b.world[0], -b.world[1], -b.world[2], 1);
}

const glb = writeGLB({
  name: 'rasta',
  bones: bones.map((b) => ({ name: b.name, parent: b.parent, translation: b.local })),
  mesh,
  inverseBind,
  material: { name: 'rasta_voxel', roughness: 0.78, metallic: 0.0 },
});
writeFileSync(join(OUT, 'rasta.glb'), glb);

/* ---------- reference poses harvested from the VXA clips ---------------- */

const poses = {};
for (const [key, file] of Object.entries(POSE_CLIPS)) {
  if (!existsSync(join(SRC, file))) { console.warn(`missing clip ${file}`); continue; }
  try {
    const clip = parseVXA(join(SRC, file), rig.root);
    const euler = {};
    for (const b of bones) {
      const tr = clip.tracks.get(b.path);
      if (!tr?.frames?.length) continue;
      const f = tr.frames[Math.floor(tr.frames.length / 2)];
      euler[b.name] = f.e.map((v) => Number(v.toFixed(4)));
    }
    poses[key] = { clip: file, euler };
  } catch (e) { console.warn(`pose ${key}: ${e.message}`); }
}

const bbox = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
for (let i = 0; i < mesh.positions.length; i += 3) {
  for (let k = 0; k < 3; k++) {
    bbox.min[k] = Math.min(bbox.min[k], mesh.positions[i + k]);
    bbox.max[k] = Math.max(bbox.max[k], mesh.positions[i + k]);
  }
}

writeFileSync(join(OUT, 'rasta.rig.json'), JSON.stringify({
  voxelScale: VOXEL,
  bones: bones.map((b) => ({
    name: b.name, parent: b.parent, synthetic: !!b.synthetic,
    local: b.local.map((v) => Number(v.toFixed(5))),
    world: b.world.map((v) => Number(v.toFixed(5))),
  })),
  bbox: { min: bbox.min.map((v) => Number(v.toFixed(4))), max: bbox.max.map((v) => Number(v.toFixed(4))) },
  poses,
}, null, 1));

console.log(`bones=${bones.length} (${authored} authored + ${bones.length - authored} synthetic)`);
console.log(`verts=${mesh.positions.length / 3} tris=${mesh.indices.length / 3}  glb=${(glb.length / 1024).toFixed(1)} KiB`);
console.log(`bbox x ${bbox.min[0].toFixed(3)}..${bbox.max[0].toFixed(3)}  y ${bbox.min[1].toFixed(3)}..${bbox.max[1].toFixed(3)}  z ${bbox.min[2].toFixed(3)}..${bbox.max[2].toFixed(3)}`);
for (const s of stats) console.log(`  ${s.label.padEnd(28)} ${s.tris} tris`);
