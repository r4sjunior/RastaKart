import * as THREE from 'three';

/**
 * Deterministic, tileable value-noise fBm baked on the CPU.
 *
 * The sky shader needs several octaves of cloud noise but SwiftShader (used by
 * the screenshot harness) chokes on per-pixel fBm, so the octaves are baked
 * here and the shader only takes 2–3 texture fetches.
 *
 * Channels:
 *   R = mid frequency band  (cloud detail)
 *   G = low frequency band  (cloud coverage)
 *   B = high frequency band (wisps / erosion)
 *   A = very low frequency  (weather cell mask)
 */

const smooth = (t) => t * t * (3 - 2 * t);

function lattice(rng, n) {
  const a = new Float32Array(n * n);
  for (let i = 0; i < n * n; i++) a[i] = rng.next();
  return a;
}

function sampleLattice(grid, n, x, y) {
  const fx = x * n;
  const fy = y * n;
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const tx = smooth(fx - x0);
  const ty = smooth(fy - y0);
  const j0 = ((x0 % n) + n) % n;
  const j1 = ((x0 + 1) % n + n) % n;
  const i0 = ((y0 % n) + n) % n;
  const i1 = ((y0 + 1) % n + n) % n;
  const a = grid[i0 * n + j0];
  const b = grid[i0 * n + j1];
  const c = grid[i1 * n + j0];
  const d = grid[i1 * n + j1];
  const top = a + (b - a) * tx;
  const bot = c + (d - c) * tx;
  return top + (bot - top) * ty;
}

/**
 * @param {import('../core/Rng.js').Rng} rng deterministic source
 * @param {number} size texture edge (power of two)
 * @returns {THREE.DataTexture}
 */
export function makeCloudNoise(rng, size = 512) {
  const OCT = 7;                                    // lattice sizes 3..192
  const grids = [];
  for (let o = 0; o < OCT; o++) {
    const n = Math.max(3, Math.round(3 * Math.pow(1.9, o)));
    grids.push({ n, g: lattice(rng, n) });
  }

  // band definitions: [firstOctave, octaveCount]
  const bands = [
    [2, 4],   // R mid
    [0, 3],   // G low / coverage
    [3, 4],   // B high detail
    [0, 2],   // A weather cells
  ];

  const data = new Uint8Array(size * size * 4);
  const inv = 1 / size;

  for (let ch = 0; ch < 4; ch++) {
    const [first, count] = bands[ch];
    let norm = 0;
    for (let k = 0; k < count; k++) norm += Math.pow(0.55, k);
    for (let y = 0; y < size; y++) {
      const v = (y + 0.5) * inv;
      for (let x = 0; x < size; x++) {
        const u = (x + 0.5) * inv;
        let acc = 0;
        let amp = 1;
        for (let k = 0; k < count; k++) {
          const gr = grids[Math.min(first + k, OCT - 1)];
          acc += sampleLattice(gr.g, gr.n, u, v) * amp;
          amp *= 0.55;
        }
        acc /= norm;
        data[(y * size + x) * 4 + ch] = Math.max(0, Math.min(255, Math.round(acc * 255)));
      }
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  tex.name = 'rk-cloud-noise';
  return tex;
}

/** Small blue-ish dither/rotation texture used by the AO kernel. Deterministic. */
export function makeRotationNoise(rng, size = 64) {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const a = rng.next() * Math.PI * 2;
    data[i * 4 + 0] = Math.round((Math.cos(a) * 0.5 + 0.5) * 255);
    data[i * 4 + 1] = Math.round((Math.sin(a) * 0.5 + 0.5) * 255);
    data[i * 4 + 2] = Math.round(rng.next() * 255);
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  tex.name = 'rk-rot-noise';
  return tex;
}
