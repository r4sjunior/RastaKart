/**
 * Parsers for the Sandbox / VoxEdit voxel formats: VXM (model), VXR (rig),
 * VXA (animation clip).
 *
 * Binary layout transcribed from the vengi reference implementation
 * (vengi-voxel/vengi, src/modules/voxelformat/private/sandbox/VX{M,R,A}Format.cpp).
 * Nothing here is guessed.
 */
import { readFileSync } from 'node:fs';

export class Reader {
  constructor(buf) { this.b = buf; this.o = 0; }
  get eos() { return this.o >= this.b.length; }
  get remaining() { return this.b.length - this.o; }
  u8() { return this.b.readUInt8(this.o++); }
  peekU8() { return this.b.readUInt8(this.o); }
  bool() { return this.u8() !== 0; }
  u32() { const v = this.b.readUInt32LE(this.o); this.o += 4; return v; }
  i32() { const v = this.b.readInt32LE(this.o); this.o += 4; return v; }
  u64() { const v = this.b.readBigUInt64LE(this.o); this.o += 8; return v; }
  f32() { const v = this.b.readFloatLE(this.o); this.o += 4; return v; }
  skip(n) { this.o += n; }
  /** vengi readString(size, buf, terminated=true): bytes up to a NUL. */
  str() {
    const s = this.o;
    while (this.o < this.b.length && this.b[this.o] !== 0) this.o++;
    const v = this.b.toString('latin1', s, this.o);
    this.o++; // consume NUL
    return v;
  }
  magic() { const v = this.b.toString('latin1', this.o, this.o + 4); this.o += 4; return v; }
}

const versionFromMagic = (m) => {
  const c = m[3];
  if (c >= '0' && c <= '9') return c.charCodeAt(0) - 48;
  if (c >= 'A' && c <= 'C') return 10 + c.charCodeAt(0) - 65;
  return -1;
};

/**
 * @returns {{version,size:{x,y,z},pivot:{x,y,z},palette:Array<{r,g,b,a,emit}>,
 *            models:Array<{name,visible,voxels:Uint8Array}>}}
 * `voxels` is sx*sy*sz, index = (x*sy + y)*sz + z, 0 = empty, else paletteIndex+1.
 */
export function parseVXM(pathOrBuf) {
  const buf = Buffer.isBuffer(pathOrBuf) ? pathOrBuf : readFileSync(pathOrBuf);
  const r = new Reader(buf);
  const magic = r.magic();
  if (magic.slice(0, 3) !== 'VXM') throw new Error(`not a vxm: ${magic}`);
  const version = versionFromMagic(magic);
  if (version < 3 || version > 12) throw new Error(`vxm version ${version} unsupported`);

  let size = { x: 0, y: 0, z: 0 };
  let pivot = { x: 0.5, y: 0, z: 0.5 };
  if (version >= 6) size = { x: r.u32(), y: r.u32(), z: r.u32() };
  if (version >= 5) {
    pivot = { x: r.f32(), y: r.f32(), z: r.f32() };
    if (version <= 10) pivot.x = 1 - pivot.x;
  }
  if (version >= 9) {
    if (r.u8()) {
      const sx = r.u32(), sy = r.u32(), sz = r.u32();
      const ex = r.u32(), ey = r.u32(), ez = r.u32();
      const normal = r.u32();
      let sw = 0, sh = 0;
      if (version >= 10) { sw = r.u32(); sh = r.u32(); }
      else if (normal <= 1) { sw = ez - sz; sh = ey - sy; }
      else if (normal <= 3) { sw = ex - sx; sh = ez - sz; }
      else { sw = ex - sx; sh = ey - sy; }
      r.skip(sw * sh);
    }
  }
  if (version >= 8) { r.f32(); r.f32(); r.f32(); r.f32(); } // lod scale + lod pivot
  const lodLevels = version >= 7 ? r.u32() : 1;
  for (let lod = 0; lod < lodLevels; lod++) {
    r.u32(); r.u32(); // texture dims
    if (version >= 11) { r.skip(r.u32()); }
    else if (version === 3) { let b; do { b = r.u8(); if (b) r.skip(3); } while (b); }
    else {
      const texAmount = r.u32();
      for (let t = 0; t < texAmount; t++) {
        r.str();
        if (version >= 6) r.skip(r.u32());
        else for (;;) { const stride = r.u8(); if (!stride) break; r.skip(3); }
      }
    }
    for (let i = 0; i < 6; i++) r.skip(r.u32() * 4 * 20); // baked quad mesh
  }
  if (version <= 5) size = { x: r.u32(), y: r.u32(), z: r.u32() };

  if (version >= 11) {
    r.skip(256 * 4); // albedo material palette
    r.skip(256 * 4); // emissive material palette
    const chunks = r.u8();
    for (let i = 0; i < chunks; i++) { r.str(); r.skip(2); }
  }

  const materialAmount = r.u8();
  const palette = [];
  for (let i = 0; i < materialAmount; i++) {
    const b = r.u8(), g = r.u8(), rr = r.u8(), a = r.u8();
    const emit = version > 3 ? r.u8() : 0;
    palette.push({ r: rr, g, b, a, emit });
  }

  const { x: sx, y: sy, z: sz } = size;
  const maxModels = version >= 12 ? r.u8() : 1;
  const models = [];
  for (let m = 0; m < maxModels; m++) {
    let name = `Model ${m}`, visible = true;
    if (version >= 12) { name = r.str(); visible = r.bool(); }
    const voxels = new Uint8Array(sx * sy * sz);
    let idx = 0;
    for (;;) {
      const length = r.u8();
      if (length === 0) break;
      const mat = r.u8();
      if (mat !== 0xff && mat < materialAmount) {
        for (let i = idx; i < idx + length; i++) {
          const x = Math.floor(i / (sy * sz));
          const y = Math.floor(i / sz) % sy;
          const z = i % sz;
          // vengi mirrors X on read
          voxels[((sx - x - 1) * sy + y) * sz + z] = mat + 1;
        }
      }
      idx += length;
    }
    models.push({ name, visible, voxels });
  }
  return { version, size, pivot, palette, models };
}

function readIkAndFlags(r, version, node) {
  if (version <= 4) return;
  if (version >= 9) { node.collidable = r.bool(); node.decorative = r.bool(); }
  if (version >= 6) { node.color = r.u32(); node.favorite = r.bool(); node.visible = r.bool(); }
  node.mirror = [r.bool(), r.bool(), r.bool()];
  node.previewMirror = [r.bool(), r.bool(), r.bool()];
  node.ikAnchor = r.bool();
  if (version >= 9) {
    node.ikEffectorId = r.str();
    node.ikVisible = r.bool();
    node.ikRollMin = r.f32();
    node.ikRollMax = r.f32();
    const n = r.i32();
    node.ikSwing = [];
    for (let i = 0; i < n; i++) node.ikSwing.push({ cx: r.f32(), cy: r.f32(), radius: r.f32() });
  } else {
    r.bool(); r.f32(); r.f32(); r.bool(); r.bool(); r.bool(); r.bool();
  }
}

/** VXR 4..9. Returns { version, defaultAnim, root:{children:[...]} } */
export function parseVXR(pathOrBuf) {
  const buf = Buffer.isBuffer(pathOrBuf) ? pathOrBuf : readFileSync(pathOrBuf);
  const r = new Reader(buf);
  const magic = r.magic();
  if (magic.slice(0, 3) !== 'VXR') throw new Error(`not a vxr: ${magic}`);
  const version = versionFromMagic(magic);
  if (version < 4) throw new Error(`vxr version ${version} not supported by this tool`);

  const out = { version, defaultAnim: '', baseTemplate: '', root: { name: '__root__', children: [] } };
  if (version >= 7) out.defaultAnim = r.str();
  const childCount = r.i32();
  if (version >= 8) {
    out.baseTemplate = r.str();
    const isStatic = r.bool();
    if (isStatic) {
      const lods = r.i32();
      for (let i = 0; i < lods; i++) {
        r.u32(); r.u32();
        r.skip(r.u32());
        if (r.bool()) r.skip(r.u32());
        const quads = r.i32();
        r.skip(quads * 4 * 5 * 4);
      }
    }
  }
  const readNode = () => {
    const node = { name: r.str(), filename: r.str(), children: [] };
    readIkAndFlags(r, version, node);
    if (version >= 4) {
      const n = r.i32();
      for (let i = 0; i < n; i++) node.children.push(readNode());
    }
    return node;
  };
  for (let i = 0; i < childCount; i++) out.root.children.push(readNode());
  return out;
}

/**
 * VXA 3/4. Walks the rig tree in the same DFS order the writer used and
 * attaches per-node channel keyframes.
 * @param rigRoot the `root` object from parseVXR
 * @returns {{version, animId, tracks: Map<string,{name,frames:Array<{frame,t,e,s}>}>}}
 */
export function parseVXA(pathOrBuf, rigRoot) {
  const buf = Buffer.isBuffer(pathOrBuf) ? pathOrBuf : readFileSync(pathOrBuf);
  const r = new Reader(buf);
  const magic = r.magic();
  if (magic.slice(0, 3) !== 'VXA') throw new Error(`not a vxa: ${magic}`);
  const version = versionFromMagic(magic);
  if (version < 3 || version > 4) throw new Error(`vxa version ${version} unsupported`);
  r.u64(); r.u64(); // md5 of the scene graph node names
  const animId = r.str();
  const rootChildren = r.i32();
  const tracks = new Map();
  if (rootChildren === 0) return { version, animId, tracks };
  if (rootChildren !== rigRoot.children.length) {
    throw new Error(`vxa root child mismatch: ${rootChildren} vs ${rigRoot.children.length}`);
  }

  const sample = (chan, frame) => {
    if (!chan.length) return null;
    if (frame <= chan[0].frame) return chan[0].val;
    for (let i = 0; i < chan.length - 1; i++) {
      if (frame >= chan[i].frame && frame <= chan[i + 1].frame) {
        const span = chan[i + 1].frame - chan[i].frame;
        const t = span === 0 ? 0 : (frame - chan[i].frame) / span;
        return chan[i].val + t * (chan[i + 1].val - chan[i].val);
      }
    }
    return chan[chan.length - 1].val;
  };

  const readNode = (node, path) => {
    const channels = [[], [], [], [], [], [], []];
    for (let c = 0; c < 7; c++) {
      const kfc = r.i32();
      for (let k = 0; k < kfc; k++) {
        const frame = r.i32();
        if (c === 6 && frame > 0) { r.i32(); r.f32(); continue; }
        const interpolation = r.i32();
        if (c === 3) r.bool(); // slerp flag
        const val = r.f32();
        channels[c].push({ frame, interpolation, val });
      }
    }
    const frameSet = new Set();
    for (const ch of channels) for (const k of ch) frameSet.add(k.frame);
    const frames = [...frameSet].sort((a, b) => a - b).map((frame) => ({
      frame,
      t: [sample(channels[0], frame) ?? 0, sample(channels[1], frame) ?? 0, sample(channels[2], frame) ?? 0],
      e: [sample(channels[3], frame) ?? 0, sample(channels[4], frame) ?? 0, sample(channels[5], frame) ?? 0],
      s: sample(channels[6], frame) ?? 1,
    }));
    tracks.set(path, { name: node.name, frames });

    const n = r.i32();
    if (n !== node.children.length) {
      throw new Error(`vxa child mismatch at ${path}: ${n} vs ${node.children.length}`);
    }
    for (const c of node.children) readNode(c, `${path}/${c.name}`);
  };
  for (const c of rigRoot.children) readNode(c, c.name);
  return { version, animId, tracks };
}
