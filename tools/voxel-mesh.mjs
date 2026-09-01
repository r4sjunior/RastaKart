/**
 * Greedy voxel mesher with baked per-vertex ambient occlusion.
 *
 * - merges coplanar, same-colour, same-AO faces into a single quad
 * - never emits a face that has a solid neighbour (no interior geometry)
 * - flat (hard) normals: every quad carries its own face normal
 * - colour + AO are folded into a single linear-space vertex colour, so the
 *   whole character needs exactly one material and one draw call
 */

const AO_LEVELS = [0.48, 0.68, 0.85, 1.0];

const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/**
 * @param {Uint8Array} vox  index = (x*sy + y)*sz + z, 0 = empty else palette+1
 * @param {{x,y,z}} size
 * @param {Array<{r,g,b}>} palette
 * @param {object} opts  { scale, origin:[x,y,z], joint, aoStrength }
 * @returns {{positions:number[],normals:number[],colors:number[],joints:number[],indices:number[]}}
 */
export function greedyMesh(vox, size, palette, opts = {}) {
  const dims = [size.x, size.y, size.z];
  const [sx, sy, sz] = dims;
  const scale = opts.scale ?? 1;
  const origin = opts.origin ?? [0, 0, 0];
  const joint = opts.joint ?? 0;
  const aoStrength = opts.aoStrength ?? 1;

  const at = (x, y, z) => (x < 0 || y < 0 || z < 0 || x >= sx || y >= sy || z >= sz)
    ? 0 : vox[(x * sy + y) * sz + z];
  const solid = (p) => at(p[0], p[1], p[2]) !== 0;

  const out = { positions: [], normals: [], colors: [], joints: [], indices: [] };
  const cache = new Map();
  const linColor = (idx) => {
    let c = cache.get(idx);
    if (!c) {
      const p = palette[idx - 1];
      c = [srgbToLinear(p.r / 255), srgbToLinear(p.g / 255), srgbToLinear(p.b / 255)];
      cache.set(idx, c);
    }
    return c;
  };

  const x = [0, 0, 0], q = [0, 0, 0], du = [0, 0, 0], dv = [0, 0, 0];

  for (let d = 0; d < 3; d++) {
    const u = (d + 1) % 3;
    const v = (d + 2) % 3;
    q[0] = q[1] = q[2] = 0; q[d] = 1;
    const w = dims[u], h = dims[v];
    /** mask[j*w+i] = null | { c, back, ao:[4] } */
    const mask = new Array(w * h);

    for (x[d] = -1; x[d] < dims[d];) {
      let n = 0;
      for (x[v] = 0; x[v] < h; x[v]++) {
        for (x[u] = 0; x[u] < w; x[u]++, n++) {
          const a = x[d] >= 0 ? at(x[0], x[1], x[2]) : 0;
          const b = x[d] < dims[d] - 1 ? at(x[0] + q[0], x[1] + q[1], x[2] + q[2]) : 0;
          if ((a !== 0) === (b !== 0)) { mask[n] = null; continue; }
          const back = a === 0;
          const c = back ? b : a;
          // the voxel cell on the *empty* side of this face, used for AO probes
          const p = back
            ? [x[0], x[1], x[2]]
            : [x[0] + q[0], x[1] + q[1], x[2] + q[2]];
          const ao = [0, 0, 0, 0];
          for (let k = 0; k < 4; k++) {
            const su = (k === 1 || k === 2) ? 1 : -1;
            const sv = (k === 2 || k === 3) ? 1 : -1;
            const s1 = [...p]; s1[u] += su;
            const s2 = [...p]; s2[v] += sv;
            const cr = [...p]; cr[u] += su; cr[v] += sv;
            const a1 = solid(s1) ? 1 : 0;
            const a2 = solid(s2) ? 1 : 0;
            ao[k] = (a1 && a2) ? 0 : 3 - (a1 + a2 + (solid(cr) ? 1 : 0));
          }
          mask[n] = { c, back, ao, key: `${c}|${back ? 1 : 0}|${ao[0]}${ao[1]}${ao[2]}${ao[3]}` };
        }
      }
      x[d]++;

      n = 0;
      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w;) {
          const m = mask[n];
          if (!m) { i++; n++; continue; }
          let wq = 1;
          while (i + wq < w && mask[n + wq] && mask[n + wq].key === m.key) wq++;
          let hq = 1;
          outer: for (; j + hq < h; hq++) {
            for (let k = 0; k < wq; k++) {
              const mm = mask[n + k + hq * w];
              if (!mm || mm.key !== m.key) break outer;
            }
          }

          x[u] = i; x[v] = j;
          du[0] = du[1] = du[2] = 0; du[u] = wq;
          dv[0] = dv[1] = dv[2] = 0; dv[v] = hq;

          const base = out.positions.length / 3;
          const corners = [
            [x[0], x[1], x[2]],
            [x[0] + du[0], x[1] + du[1], x[2] + du[2]],
            [x[0] + du[0] + dv[0], x[1] + du[1] + dv[1], x[2] + du[2] + dv[2]],
            [x[0] + dv[0], x[1] + dv[1], x[2] + dv[2]],
          ];
          const nrm = [0, 0, 0];
          nrm[d] = m.back ? -1 : 1;
          const col = linColor(m.c);
          for (let k = 0; k < 4; k++) {
            out.positions.push(
              corners[k][0] * scale + origin[0],
              corners[k][1] * scale + origin[1],
              corners[k][2] * scale + origin[2],
            );
            out.normals.push(nrm[0], nrm[1], nrm[2]);
            const a = 1 - (1 - AO_LEVELS[m.ao[k]]) * aoStrength;
            out.colors.push(col[0] * a, col[1] * a, col[2] * a);
            out.joints.push(joint);
          }
          // flip the diagonal so the AO gradient never creases the wrong way
          const flip = m.ao[0] + m.ao[2] < m.ao[1] + m.ao[3];
          const order = m.back
            ? (flip ? [1, 2, 3, 1, 3, 0] : [0, 1, 2, 0, 2, 3])
            : (flip ? [1, 0, 3, 1, 3, 2] : [0, 3, 2, 0, 2, 1]);
          for (const o of order) out.indices.push(base + o);

          for (let l = 0; l < hq; l++) for (let k = 0; k < wq; k++) mask[n + k + l * w] = null;
          i += wq; n += wq;
        }
      }
    }
  }
  return out;
}
