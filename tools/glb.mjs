/**
 * Minimal glTF 2.0 / GLB writer for a single skinned, vertex-coloured mesh.
 * Enough of the spec for what the voxel pipeline emits — nothing more.
 */

const FLOAT = 5126;
const USHORT = 5123;
const UINT = 5125;

class BufferBuilder {
  constructor() { this.parts = []; this.len = 0; this.views = []; this.accessors = []; }
  #align(n = 4) {
    const pad = (n - (this.len % n)) % n;
    if (pad) { this.parts.push(Buffer.alloc(pad)); this.len += pad; }
  }
  #view(buf, target) {
    this.#align(4);
    const idx = this.views.length;
    this.views.push({ buffer: 0, byteOffset: this.len, byteLength: buf.length, ...(target ? { target } : {}) });
    this.parts.push(buf);
    this.len += buf.length;
    return idx;
  }
  addFloat(data, type, target) {
    const n = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 }[type];
    const arr = Float32Array.from(data);
    const view = this.#view(Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength), target);
    const count = data.length / n;
    const acc = { bufferView: view, componentType: FLOAT, count, type };
    if (type === 'VEC3' && target === 34962) {
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      for (let i = 0; i < data.length; i += 3) {
        for (let k = 0; k < 3; k++) {
          if (data[i + k] < min[k]) min[k] = data[i + k];
          if (data[i + k] > max[k]) max[k] = data[i + k];
        }
      }
      acc.min = min; acc.max = max;
    }
    this.accessors.push(acc);
    return this.accessors.length - 1;
  }
  addUShort(data, type, target) {
    const n = { SCALAR: 1, VEC4: 4 }[type];
    const arr = Uint16Array.from(data);
    const view = this.#view(Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength), target);
    this.accessors.push({ bufferView: view, componentType: USHORT, count: data.length / n, type });
    return this.accessors.length - 1;
  }
  addUInt(data, target) {
    const arr = Uint32Array.from(data);
    const view = this.#view(Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength), target);
    this.accessors.push({ bufferView: view, componentType: UINT, count: data.length, type: 'SCALAR' });
    return this.accessors.length - 1;
  }
  finish() { this.#align(4); return Buffer.concat(this.parts); }
}

/**
 * @param {object} spec
 *   spec.bones   [{ name, parent:-1|idx, translation:[3], rotation:[4] }]  (bind pose, local)
 *   spec.mesh    { positions, normals, colors, joints, indices }
 *   spec.inverseBind  Float array 16*bones (column-major, glTF order)
 *   spec.material     { name, roughness, metallic }
 */
export function writeGLB(spec) {
  const b = new BufferBuilder();
  const m = spec.mesh;
  const POS = b.addFloat(m.positions, 'VEC3', 34962);
  const NRM = b.addFloat(m.normals, 'VEC3', 34962);
  const COL = b.addFloat(m.colors, 'VEC3', 34962);
  const jointsVec4 = [];
  const weightsVec4 = [];
  for (const j of m.joints) { jointsVec4.push(j, 0, 0, 0); weightsVec4.push(1, 0, 0, 0); }
  const JNT = b.addUShort(jointsVec4, 'VEC4', 34962);
  const WGT = b.addFloat(weightsVec4, 'VEC4', 34962);
  const IDX = b.addUInt(m.indices, 34963);
  const IBM = b.addFloat(spec.inverseBind, 'MAT4');

  const nodes = spec.bones.map((bn) => ({
    name: bn.name,
    translation: bn.translation,
    rotation: bn.rotation ?? [0, 0, 0, 1],
    children: [],
  }));
  spec.bones.forEach((bn, i) => { if (bn.parent >= 0) nodes[bn.parent].children.push(i); });
  for (const n of nodes) if (!n.children.length) delete n.children;

  const meshNodeIdx = nodes.length;
  nodes.push({ name: spec.name ?? 'character', mesh: 0, skin: 0 });

  const roots = spec.bones.map((bn, i) => (bn.parent < 0 ? i : -1)).filter((i) => i >= 0);

  const gltf = {
    asset: { version: '2.0', generator: 'rasta-kart voxel pipeline' },
    scene: 0,
    scenes: [{ nodes: [...roots, meshNodeIdx] }],
    nodes,
    meshes: [{
      name: spec.name ?? 'character',
      primitives: [{
        attributes: { POSITION: POS, NORMAL: NRM, COLOR_0: COL, JOINTS_0: JNT, WEIGHTS_0: WGT },
        indices: IDX,
        material: 0,
      }],
    }],
    skins: [{ inverseBindMatrices: IBM, joints: spec.bones.map((_, i) => i), skeleton: roots[0] }],
    materials: [{
      name: spec.material?.name ?? 'voxel',
      pbrMetallicRoughness: {
        baseColorFactor: [1, 1, 1, 1],
        metallicFactor: spec.material?.metallic ?? 0,
        roughnessFactor: spec.material?.roughness ?? 0.85,
      },
    }],
    accessors: b.accessors,
    bufferViews: b.views,
    buffers: [],
  };

  const bin = b.finish();
  gltf.buffers.push({ byteLength: bin.length });

  let json = Buffer.from(JSON.stringify(gltf), 'utf8');
  const jsonPad = (4 - (json.length % 4)) % 4;
  if (jsonPad) json = Buffer.concat([json, Buffer.alloc(jsonPad, 0x20)]);

  const header = Buffer.alloc(12);
  header.write('glTF', 0, 'latin1');
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + json.length + 8 + bin.length, 8);
  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(json.length, 0);
  jsonHeader.write('JSON', 4, 'latin1');
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(bin.length, 0);
  binHeader.write('BIN\0', 4, 'latin1');

  return Buffer.concat([header, jsonHeader, json, binHeader, bin]);
}
