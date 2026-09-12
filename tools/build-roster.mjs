/**
 * ME002 (VoxEdit / The Sandbox) -> one skinned GLB per non-Rasta racer.
 *
 *   node tools/build-roster.mjs
 *
 * `build-character.mjs` builds the single, hand-authored `rasta.glb` — the
 * default driver — and is left completely untouched. This script builds the
 * other seven: same rig, same voxel technique, same meshing pipeline, but
 * each with its own palette (skin tone, hair or beanie colour, shirt, pants,
 * shoes) and, for about half the roster, the alternate `Head_B` (loose hair)
 * / `Chest_B` (plain shirt) parts that ME002 already ships but the default
 * build never used — which is how "not everyone wears the reggae beanie"
 * gets done without modelling anything new.
 *
 * Recolouring works because ME002's parts share one master palette: index 3
 * is "main skin tone" in every part that has skin, index 10 is "white" in
 * every part that has white, and so on (confirmed by dumping palette usage
 * per part — see the RGB triples below). A recolour is just "clone this
 * part's palette, and wherever an entry's RGB matches one of these known
 * swatches, replace it" — geometry is never touched, so the technique stays
 * exactly the voxel look, just re-skinned.
 *
 * Output: public/assets/characters/<slug>.glb + <slug>.rig.json, one pair
 * per roster entry below. CharacterSystem picks the file by `kart.name`.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseVXM, parseVXR, parseVXA } from './vox-format.mjs';
import { greedyMesh } from './voxel-mesh.mjs';
import { writeGLB } from './glb.mjs';

const SRC = 'ME002';
const OUT = 'public/assets/characters';
const RIG_FILE = 'me.vxr';
const REST_CLIP = 'me.T.vxa';
const VOXEL = 0.024;

const POSE_CLIPS = {
  rest: 'me.T.vxa', idle: 'me.Idle 01.vxa', sit: 'me.Sit Chair Idle 01.vxa',
  sitLow: 'me.Sit 01.vxa', cheer: 'me.Cheer 01.vxa', victory: 'me.Victory 01.vxa',
  sad: 'me.Sad 01.vxa', hit: 'me.Get Hit 01.vxa',
};

/** Head_A palette indices that make the synthetic beanie/dread joints. */
const HAT = new Set([80, 154, 160]);
const HAIR_A = 126;
const HAIR_TOP = 12;
const SPLITS = {
  Head: [
    { name: 'Beanie', pick: (x, y, z, c) => HAT.has(c), pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.miny, (b.minz + b.maxz + 1) / 2] },
    { name: 'Dread_L', pick: (x, y, z, c) => c === HAIR_A && y < HAIR_TOP && x <= 9, pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.maxy + 1, (b.minz + b.maxz + 1) / 2] },
    { name: 'Dread_C', pick: (x, y, z, c) => c === HAIR_A && y < HAIR_TOP && x > 9 && x < 14, pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.maxy + 1, (b.minz + b.maxz + 1) / 2] },
    { name: 'Dread_R', pick: (x, y, z, c) => c === HAIR_A && y < HAIR_TOP && x >= 14, pivot: (b) => [(b.minx + b.maxx + 1) / 2, b.maxy + 1, (b.minz + b.maxz + 1) / 2] },
  ],
};

/* ===================================================== palette swatches */
// Original RGB triples, one per material role, as authored in ME002 (see the
// file header). Recolouring replaces these with a character's own colours.

const SKIN = {
  warmTan:   [[249, 204, 159], [229, 181, 133], [224, 172, 120], [248, 213, 177], [255, 218, 181]],
  richUmber: [[179, 120, 79], [153, 98, 62], [135, 84, 50], [196, 138, 96], [210, 152, 110]],
  deepBrown: [[146, 94, 58], [123, 76, 45], [107, 64, 37], [163, 110, 72], [178, 124, 84]],
  lightOlive:[[230, 175, 140], [206, 152, 118], [190, 138, 104], [240, 190, 155], [248, 203, 168]],
  porcelain: [[255, 224, 196], [237, 201, 173], [222, 186, 157], [255, 235, 212], [255, 240, 222]],
};
const SKIN_FROM = [[249, 204, 159], [229, 181, 133], [224, 172, 120], [248, 213, 177], [255, 218, 181]];
const DREAD_FROM = [36, 38, 35];
const BANDS_FROM = [[48, 102, 46], [183, 197, 78], [111, 14, 18]];   // green, yellow, red
const HAIRB_FROM = [[67, 42, 34], [77, 50, 41], [91, 60, 49]];        // dark, mid, light
const SHIRT_WHITE_FROM = [242, 242, 242];
const SHIRT_GRAY_FROM = [109, 118, 133];
const STRIPE_FROM = [[86, 169, 22], [183, 197, 78], [255, 41, 63]];   // green, yellow, red
const PANTS_FROM = [41, 63, 127];
const SHOE_FROM = [23, 135, 230];

/* ============================================================ roster ==== */
// Each driver's clothing leans on their kart's own livery (KartModel.js
// LIVERIES, same order/index) so the paint and the outfit read as one
// character rather than two unrelated colour choices.

const CHARACTERS = [
  {
    name: 'Zion', gender: 'M', headFile: 'Head_A.vxm', chestFile: 'Chest_B.vxm', skin: SKIN.richUmber,
    dread: [40, 30, 26], bands: [[216, 81, 31], [246, 197, 106], [122, 37, 89]],
    shirt: { base: [216, 81, 31], stripe: null },
    pants: [122, 37, 89], shoe: [246, 197, 106],
  },
  {
    name: 'Marley', gender: 'M', headFile: 'Head_B.vxm', chestFile: 'Chest_A.vxm', skin: SKIN.deepBrown,
    hairB: [[48, 32, 28], [66, 44, 36], [84, 58, 46]],
    shirt: { base: [214, 231, 242], stripe: [[143, 216, 242], [19, 100, 159], [10, 51, 99]] },
    pants: [10, 51, 99], shoe: [143, 216, 242],
  },
  {
    name: 'Selah', gender: 'F', headFile: 'Head_B.vxm', chestFile: 'Chest_B.vxm', skin: SKIN.porcelain,
    hairB: [[58, 28, 20], [92, 46, 30], [122, 66, 42]],
    shirt: { base: [111, 174, 31], stripe: null },
    pants: [40, 89, 13], shoe: [228, 245, 189],
  },
  {
    name: 'Kofi', gender: 'M', headFile: 'Head_A.vxm', chestFile: 'Chest_A.vxm', skin: SKIN.lightOlive,
    dread: [42, 28, 34], bands: [[168, 32, 108], [241, 182, 216], [74, 11, 45]],
    shirt: { base: [245, 225, 235], stripe: [[168, 32, 108], [241, 182, 216], [74, 11, 45]] },
    pants: [74, 11, 45], shoe: [241, 182, 216],
  },
  {
    name: 'Nia', gender: 'F', headFile: 'Head_A.vxm', chestFile: 'Chest_B.vxm', skin: SKIN.porcelain,
    dread: [34, 30, 40], bands: [[92, 58, 168], [185, 166, 234], [36, 21, 72]],
    shirt: { base: [92, 58, 168], stripe: null },
    pants: [36, 21, 72], shoe: [185, 166, 234],
  },
  {
    name: 'Tafari', gender: 'M', headFile: 'Head_B.vxm', chestFile: 'Chest_B.vxm', skin: SKIN.richUmber,
    hairB: [[18, 18, 18], [28, 28, 28], [40, 40, 40]],
    shirt: { base: [34, 38, 44], stripe: null },
    pants: [13, 16, 20], shoe: [217, 76, 30],
  },
  {
    name: 'Ayo', gender: 'F', headFile: 'Head_B.vxm', chestFile: 'Chest_A.vxm', skin: SKIN.lightOlive,
    hairB: [[120, 92, 50], [168, 132, 74], [206, 172, 110]],
    shirt: { base: [216, 200, 162], stripe: [[47, 93, 61], [235, 215, 150], [184, 31, 36]] },
    pants: [184, 31, 36], shoe: [47, 93, 61],
  },
];

/* ========================================================= recolouring */

const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

/**
 * Head_B.vxm was authored facing the opposite way from every other part in
 * ME002 (confirmed by rendering it: on every Head_B driver the face pointed
 * straight back out of the kart at the chase camera instead of forward down
 * the track). Mirroring X *and* Z is a 180 deg turn about the vertical axis
 * — the same "reverse the row" trick parseVXM's own X-mirror uses — so the
 * geometry ends up facing the same way Head_A's does, with the pivot/origin
 * math elsewhere untouched (reflecting about the grid's own centre keeps the
 * bounding box, and so the pivot reference, exactly where it was).
 */
function mirrorXZ(vox, size) {
  const { x: sx, y: sy, z: sz } = size;
  const out = new Uint8Array(vox.length);
  for (let x = 0; x < sx; x++) {
    for (let y = 0; y < sy; y++) {
      for (let z = 0; z < sz; z++) {
        out[((sx - 1 - x) * sy + y) * sz + (sz - 1 - z)] = vox[(x * sy + y) * sz + z];
      }
    }
  }
  return out;
}

function recolour(palette, pairs) {
  return palette.map((c) => {
    for (const [from, to] of pairs) if (eq([c.r, c.g, c.b], from)) return { ...c, r: to[0], g: to[1], b: to[2] };
    return c;
  });
}

/** Which recolour pairs apply to a given bone, for this character. */
function pairsFor(boneName, def) {
  const skinPairs = SKIN_FROM.map((from, i) => [from, def.skin[i]]);
  switch (boneName) {
    case 'Head': {
      const extra = def.headFile === 'Head_A.vxm'
        ? [[DREAD_FROM, def.dread], ...BANDS_FROM.map((from, i) => [from, def.bands[i]])]
        : HAIRB_FROM.map((from, i) => [from, def.hairB[i]]);
      return [...skinPairs, ...extra];
    }
    case 'Left_Forearm': case 'Right_Forearm': case 'Left_Hand': case 'Right_Hand':
      return skinPairs;
    case 'Chest': case 'Belly': case 'Left_Arm': case 'Right_Arm': {
      const p = [[SHIRT_WHITE_FROM, def.shirt.base], [SHIRT_GRAY_FROM, def.shirt.base]];
      if (def.shirt.stripe) STRIPE_FROM.forEach((from, i) => p.push([from, def.shirt.stripe[i]]));
      return p;
    }
    case 'Hip': case 'Left_Thigh': case 'Right_Thigh': case 'Left_Leg': case 'Right_Leg':
      return [[PANTS_FROM, def.pants]];
    case 'Left_Foot': case 'Right_Foot':
      return [[SHOE_FROM, def.shoe]];
    default:
      return [];
  }
}

/* ============================================================= build ==== */

mkdirSync(OUT, { recursive: true });
const rig = parseVXR(join(SRC, RIG_FILE));
const rest = parseVXA(join(SRC, REST_CLIP), rig.root);

function flattenBones() {
  const bones = [];
  (function walk(node, parent, path) {
    const p = path ? `${path}/${node.name}` : node.name;
    const t = rest.tracks.get(p)?.frames?.[0]?.t ?? [0, 0, 0];
    const idx = bones.length;
    bones.push({
      name: node.name, parent, path, filename: node.filename,
      local: node.name === 'Hip' ? [0, 0, 0] : [t[0] * VOXEL, t[1] * VOXEL, t[2] * VOXEL],
    });
    for (const c of node.children) walk(c, idx, p);
  }(rig.root.children[0], -1, ''));
  for (const b of bones) b.world = b.parent < 0 ? [...b.local] : bones[b.parent].world.map((v, i) => v + b.local[i]);
  return bones;
}

function buildOne(def) {
  const bones = flattenBones();
  const mesh = { positions: [], normals: [], colors: [], joints: [], indices: [] };
  const stats = [];

  const append = (part, label) => {
    const base = mesh.positions.length / 3;
    mesh.positions.push(...part.positions);
    mesh.normals.push(...part.normals);
    mesh.colors.push(...part.colors);
    mesh.joints.push(...part.joints);
    for (const i of part.indices) mesh.indices.push(i + base);
    stats.push({ label, tris: part.indices.length / 3 });
  };

  const authored = bones.length;
  for (let i = 0; i < authored; i++) {
    const b = bones[i];
    if (!b.filename) continue;
    const filename = b.name === 'Head' ? def.headFile : b.name === 'Chest' ? def.chestFile : b.filename;
    const vxm = parseVXM(join(SRC, filename));
    vxm.palette = recolour(vxm.palette, pairsFor(b.name, def));

    const { x: sx, y: sy, z: sz } = vxm.size;
    const vox = filename === 'Head_B.vxm' ? mirrorXZ(vxm.models[0].voxels, vxm.size) : vxm.models[0].voxels;
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
      for (let x = 0; x < sx; x++) for (let y = 0; y < sy; y++) for (let z = 0; z < sz; z++) {
        const k = (x * sy + y) * sz + z;
        const c = vox[k];
        if (!c || !sp.pick(x, y, z, c)) continue;
        sub[k] = c; claimed[k] = 1; n++;
        bd.minx = Math.min(bd.minx, x); bd.maxx = Math.max(bd.maxx, x);
        bd.miny = Math.min(bd.miny, y); bd.maxy = Math.max(bd.maxy, y);
        bd.minz = Math.min(bd.minz, z); bd.maxz = Math.max(bd.maxz, z);
      }
      if (!n) continue;   // e.g. every Head_B beanie/dread split: expected, no warning needed
      const pv = sp.pivot(bd);
      const j = bones.length;
      const local = [(pv[0] - pivotVox[0]) * VOXEL, (pv[1] - pivotVox[1]) * VOXEL, (pv[2] - pivotVox[2]) * VOXEL];
      bones.push({ name: sp.name, parent: i, path: `${b.path}/${sp.name}`, filename: '', local, world: b.world.map((v, k) => v + local[k]), synthetic: true });
      append(greedyMesh(sub, vxm.size, vxm.palette, { scale: VOXEL, origin, joint: j }), `${b.name}/${sp.name}`);
    }

    let main = vox;
    if (splits.length) {
      main = new Uint8Array(vox.length);
      for (let k = 0; k < vox.length; k++) main[k] = claimed[k] ? 0 : vox[k];
    }
    append(greedyMesh(main, vxm.size, vxm.palette, { scale: VOXEL, origin, joint: i }), `${b.name} (${filename})`);
  }

  const inverseBind = [];
  for (const b of bones) inverseBind.push(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -b.world[0], -b.world[1], -b.world[2], 1);

  const glb = writeGLB({
    name: def.slug,
    bones: bones.map((b) => ({ name: b.name, parent: b.parent, translation: b.local })),
    mesh, inverseBind,
    material: { name: `${def.slug}_voxel`, roughness: 0.78, metallic: 0.0 },
  });
  writeFileSync(join(OUT, `${def.slug}.glb`), glb);

  const poses = {};
  for (const [key, file] of Object.entries(POSE_CLIPS)) {
    if (!existsSync(join(SRC, file))) continue;
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
    } catch { /* one bad clip must not take the roster down */ }
  }

  const bbox = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let i = 0; i < mesh.positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      bbox.min[k] = Math.min(bbox.min[k], mesh.positions[i + k]);
      bbox.max[k] = Math.max(bbox.max[k], mesh.positions[i + k]);
    }
  }

  writeFileSync(join(OUT, `${def.slug}.rig.json`), JSON.stringify({
    voxelScale: VOXEL,
    bones: bones.map((b) => ({ name: b.name, parent: b.parent, synthetic: !!b.synthetic, local: b.local.map((v) => Number(v.toFixed(5))), world: b.world.map((v) => Number(v.toFixed(5))) })),
    bbox: { min: bbox.min.map((v) => Number(v.toFixed(4))), max: bbox.max.map((v) => Number(v.toFixed(4))) },
    poses,
  }, null, 1));

  console.log(`${def.name.padEnd(8)} (${def.gender}) head=${def.headFile.replace('.vxm', '')} chest=${def.chestFile.replace('.vxm', '')}  bones=${bones.length} (${authored} authored + ${bones.length - authored} synthetic)  verts=${mesh.positions.length / 3} tris=${mesh.indices.length / 3}  glb=${(glb.length / 1024).toFixed(1)} KiB`);
}

for (const def of CHARACTERS) {
  def.slug = def.name.toLowerCase();
  buildOne(def);
}
console.log(`\n${CHARACTERS.length} characters written to ${OUT}/`);
