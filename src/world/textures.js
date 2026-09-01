import * as THREE from 'three';

/**
 * Procedural texture factory. Everything is drawn into a 2D canvas at init and
 * uploaded once — no external assets, fully deterministic (all randomness comes
 * from a forked ctx.rng).
 *
 * Height -> normal conversion is done with a Sobel filter so the asphalt,
 * sand and rock actually catch the sun instead of reading as flat paint.
 */

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (a, b, x) => { const t = clamp01((x - a) / (b - a || 1)); return t * t * (3 - 2 * t); };

/* ------------------------------------------------------------------ noise */
function hash2(x, y, s) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
const fade = (t) => t * t * (3 - 2 * t);

/** tileable value noise on a `period` grid */
function vnoise(x, y, period, s) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const w = (a, b) => hash2(((a % period) + period) % period, ((b % period) + period) % period, s);
  const a = w(xi, yi), b = w(xi + 1, yi), c = w(xi, yi + 1), d = w(xi + 1, yi + 1);
  const u = fade(xf), v = fade(yf);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

/** tileable fbm; `base` = cells across the texture at octave 0 */
export function fbm(u, v, base, oct, s, gain = 0.5) {
  let amp = 1, sum = 0, norm = 0, f = base;
  for (let i = 0; i < oct; i++) {
    sum += amp * vnoise(u * f, v * f, f, s + i * 977);
    norm += amp; amp *= gain; f *= 2;
  }
  return sum / norm;
}

/* ------------------------------------------------------------- canvas util */
export function canvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function texFromCanvas(c, { srgb = true, repeat = 1, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = aniso;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

/** Sobel a height field (Float32Array size*size, 0..1) into a normal map. */
export function normalFromHeight(height, size, strength = 2.4, aniso = 8) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const d = img.data;
  const at = (x, y) => height[(((y % size) + size) % size) * size + (((x % size) + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tl = at(x - 1, y - 1), t = at(x, y - 1), tr = at(x + 1, y - 1);
      const l = at(x - 1, y), r = at(x + 1, y);
      const bl = at(x - 1, y + 1), b = at(x, y + 1), br = at(x + 1, y + 1);
      const dx = (tr + 2 * r + br) - (tl + 2 * l + bl);
      const dy = (bl + 2 * b + br) - (tl + 2 * t + tr);
      let nx = -dx * strength, ny = -dy * strength, nz = 1;
      const inv = 1 / Math.hypot(nx, ny, nz);
      nx *= inv; ny *= inv; nz *= inv;
      const i = (y * size + x) * 4;
      d[i] = (nx * 0.5 + 0.5) * 255;
      d[i + 1] = (ny * 0.5 + 0.5) * 255;
      d[i + 2] = (nz * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return texFromCanvas(c, { srgb: false, aniso });
}

export function grayTexture(values, size, aniso = 8) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = clamp01(values[i]) * 255;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return texFromCanvas(c, { srgb: false, aniso });
}

/* ------------------------------------------------------------------ ASPHALT
 * Real asphalt, photographically, is three separate frequency bands:
 *
 *   high   ~3-5 cm chippings. *Low* albedo contrast (the binder coats them);
 *          almost all of their read comes from the height/normal, which mips
 *          away to flat grey by 30 m. Getting this band's albedo contrast
 *          wrong is what turns tarmac into gravel.
 *   mid    hairline cracks and the coarse binder mottle, ~0.3-2 m.
 *   low    repairs, discolouration, oil — metres to tens of metres. This band
 *          cannot live in the tile at all (it would repeat); it comes from
 *          `roadMacroTexture()`, sampled in world space at ~90 m.
 *
 * Hue matters: the scene key light is warm (0xffcf8a) and the grade tints
 * shadows blue, so a *neutral* albedo renders magenta. Bitumen is authored
 * slightly green-grey (G >= R > B) so it neutralises under that key — this is
 * the same relationship the Nintendo reference frames show (RGB ~115/121/106).
 */
export function asphaltSet(rng, aniso, size = 512) {
  const h = new Float32Array(size * size);
  const alb = canvas(size);
  const actx = alb.getContext('2d');
  const img = actx.createImageData(size, size);
  const d = img.data;

  // ROAD_TILE is 10 m; 170 cells => ~5.9 cm chippings, ~3 texels across.
  const cells = 170;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;

      // --- aggregate: F2 - F1 of a jittered grid (tileable via modulo hash)
      const cx = u * cells, cy = v * cells;
      let best = 9, best2 = 9;
      const ix = Math.floor(cx), iy = Math.floor(cy);
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const gx = ix + ox, gy = iy + oy;
          const wx = ((gx % cells) + cells) % cells;
          const wy = ((gy % cells) + cells) % cells;
          const jx = gx + hash2(wx, wy, 11) * 0.96 + 0.02;
          const jy = gy + hash2(wx, wy, 23) * 0.96 + 0.02;
          const dd = (cx - jx) ** 2 + (cy - jy) ** 2;
          if (dd < best) { best2 = best; best = dd; } else if (dd < best2) best2 = dd;
        }
      }
      const grain = clamp01((Math.sqrt(best2) - Math.sqrt(best)) * 2.1);
      const sx = Math.floor(cx), sy = Math.floor(cy);
      const stone = hash2(((sx % cells) + cells) % cells, ((sy % cells) + cells) % cells, 57);

      const micro = fbm(u, v, 190, 2, 5);          // sub-chipping grit
      const meso = fbm(u, v, 17, 3, 913);          // binder richness, ~60 cm
      const macro = fbm(u, v, 4, 3, 91);           // slow tonal drift, ~2.5 m

      // --- hairline cracks: ridged noise, thin and shallow.
      const rd = 1 - Math.abs(fbm(u, v, 11, 4, 3307) * 2 - 1);
      const crack = clamp01((rd - 0.86) * 7.4);

      // Height keeps the full chipping relief (it is what catches the sun and
      // it mips out on its own); the albedo does NOT.
      h[y * size + x] = clamp01(grain * 0.50 + micro * 0.22 + meso * 0.16
        + macro * 0.12 - crack * 0.55);

      // Albedo: dark bitumen. Aggregate contributes +-0.022, not +-0.17 —
      // that single number is the difference between tarmac and gravel.
      let base = 0.150
        + (macro - 0.5) * 0.052
        + (meso - 0.5) * 0.034
        + (grain - 0.45) * 0.030 * (0.6 + stone * 0.8)
        + (micro - 0.5) * 0.016;
      base = clamp01(base) * (1 - crack * 0.34);

      // green-grey bitumen, so it neutralises under the warm key
      const i = (y * size + x) * 4;
      d[i] = clamp01(base * 0.972) * 255;
      d[i + 1] = clamp01(base * 1.000) * 255;
      d[i + 2] = clamp01(base * 0.948) * 255;
      d[i + 3] = 255;
    }
  }
  actx.putImageData(img, 0, 0);

  const rough = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) rough[i] = 0.74 + h[i] * 0.24;

  return {
    map: texFromCanvas(alb, { aniso }),
    // Sobel strength 0.75 (was 1.5): the old value combed badly at grazing
    // angles, which is exactly where the `lowchase` camera sits.
    normalMap: normalFromHeight(h, size, 0.75, aniso),
    roughnessMap: grayTexture(rough, size, aniso),
  };
}

/**
 * The road's low-frequency band, sampled in world space at ~90 m so it never
 * shows a repeat inside one straight. Mean is normalised to 0.5 and it is used
 * multiplicatively, so it redistributes value without shifting the average.
 *
 * Carries: broad discolouration, soft-edged resurfacing patches and the darker
 * bitumen bleed around them.
 */
export function roadMacroTexture(size = 256, seed = 8821, aniso = 8) {
  const v = new Float32Array(size * size);
  let mn = 1, mx = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, w = y / size;
      // three incommensurate low octaves: broad drift with no blob signature
      let n = fbm(u, w, 3, 3, seed) * 0.52
        + fbm(u, w, 6, 3, seed + 131) * 0.30
        + fbm(u, w, 11, 2, seed + 277) * 0.18;
      // resurfacing patches: a thresholded mid octave, darker than its
      // surroundings with a soft feathered lip
      const pa = fbm(u, w, 5, 2, seed + 613);
      n -= smoothstep(0.60, 0.76, pa) * 0.20;
      n += smoothstep(0.30, 0.16, pa) * 0.10;
      v[y * size + x] = n;
      if (n < mn) mn = n; if (n > mx) mx = n;
    }
  }
  const inv = 1 / (mx - mn || 1);
  for (let i = 0; i < size * size; i++) v[i] = (v[i] - mn) * inv;
  return grayTexture(v, size, aniso);
}

/**
 * Low-frequency, mean-0.5 grey field. Sampled at a *much* larger world scale
 * than the detail map and multiplied over it, it removes the visible period of
 * any tiled material without adding recognisable shapes of its own.
 */
export function macroTexture(size = 256, seed = 4211, aniso = 8) {
  const v = new Float32Array(size * size);
  let mn = 1, mx = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, w = y / size;
      // three incommensurate low octaves => no repeating blob signature
      const n = fbm(u, w, 3, 4, seed) * 0.5 + fbm(u, w, 7, 3, seed + 31) * 0.32
        + fbm(u, w, 13, 2, seed + 77) * 0.18;
      v[y * size + x] = n;
      if (n < mn) mn = n; if (n > mx) mx = n;
    }
  }
  const inv = 1 / (mx - mn || 1);
  for (let i = 0; i < size * size; i++) v[i] = (v[i] - mn) * inv;
  return grayTexture(v, size, aniso);
}

/* ------------------------------------------------------------ GROUND COVERS
 * Three tiling detail albedos (sand / grass / rock) blended per-vertex by a
 * splat weight attribute, sharing one normal + roughness pair. Values are kept
 * deliberately mid-dark: the terrain also carries a vertex tint and sits under
 * a strong tropical key light, and a bright albedo simply clips to white.
 */
function coverCanvas(size, rng, kind) {
  const c = canvas(size);
  const cx = c.getContext('2d');
  const img = cx.createImageData(size, size);
  const d = img.data;
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      let r, g, b, hh;
      if (kind === 'sand') {
        // wind ripples + grain + the odd shell, all low contrast
        // Bright warm shell sand. It is the *light* end of the scene's value
        // range, so it stays high and low-contrast; the grain lives in the
        // height map where mipping can retire it with distance.
        const ripple = 0.5 + 0.5 * Math.sin((u * 5.2 + v * 2.1) * Math.PI * 2 * 6
          + fbm(u, v, 5, 3, 71) * 7.0);
        const grain = fbm(u, v, 150, 2, 7);
        const drift = fbm(u, v, 9, 4, 401);
        const t = ripple * 0.20 + grain * 0.22 + drift * 0.58;
        r = 214 + t * 34 - 17;
        g = 196 + t * 34 - 17;
        b = 156 + t * 36 - 18;
        if (grain > 0.90) { r += 20; g += 18; b += 15; }        // shell fleck
        hh = ripple * 0.45 + grain * 0.3 + drift * 0.25;
      } else if (kind === 'grass') {
        // blade clutter at two scales, plus dry/lush patches
        // Deep saturated tropical green. The blade octave is deliberately weak
        // in albedo (it is pure aliasing bait at 40 m) and strong in height.
        const blades = fbm(u, v, 110, 2, 17);
        const clump = fbm(u, v, 26, 3, 233);
        const patch = fbm(u, v, 6, 3, 401);
        const t = blades * 0.18 + clump * 0.42 + patch * 0.40;
        r = 42 + t * 46 - 20 + patch * 26;
        g = 96 + t * 74 - 32 + patch * 30;
        b = 30 + t * 28 - 12 + patch * 8;
        hh = blades * 0.6 + clump * 0.4;
      } else { // rock
        // fractured strata: ridged noise + a directional bedding plane
        const ridge = 1 - Math.abs(fbm(u, v, 14, 4, 37) * 2 - 1);
        const strata = 0.5 + 0.5 * Math.sin((v * 3.1 + u * 0.8) * Math.PI * 2 * 5
          + fbm(u, v, 7, 3, 611) * 5.0);
        const grit = fbm(u, v, 96, 2, 733);
        // Darker, cooler basalt so cliffs read as the scene's shadow end and
        // the crests can be lit back up by the vertex tint.
        const t = ridge * 0.52 + strata * 0.22 + grit * 0.26;
        r = 84 + t * 92 - 40;
        g = 79 + t * 86 - 37;
        b = 72 + t * 76 - 33;
        if (ridge > 0.74) { r -= 26; g -= 25; b -= 20; }        // shadowed crack
        hh = ridge * 0.55 + strata * 0.2 + grit * 0.25;
      }
      const i = (y * size + x) * 4;
      d[i] = clamp01(r / 255) * 255;
      d[i + 1] = clamp01(g / 255) * 255;
      d[i + 2] = clamp01(b / 255) * 255;
      d[i + 3] = 255;
      h[y * size + x] = hh;
    }
  }
  cx.putImageData(img, 0, 0);
  return { canvas: c, height: h };
}

export function groundSet(rng, aniso, size = 256) {
  const sand = coverCanvas(size, rng, 'sand');
  const grass = coverCanvas(size, rng, 'grass');
  const rock = coverCanvas(size, rng, 'rock');
  const h = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) h[i] = (sand.height[i] * 0.4 + grass.height[i] * 0.3 + rock.height[i] * 0.3);
  const rough = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) rough[i] = 0.80 + h[i] * 0.18;
  return {
    sand: texFromCanvas(sand.canvas, { aniso }),
    grass: texFromCanvas(grass.canvas, { aniso }),
    rock: texFromCanvas(rock.canvas, { aniso }),
    normalMap: normalFromHeight(h, size, 1.4, aniso),
    roughnessMap: grayTexture(rough, size, aniso),
  };
}

/* ------------------------------------------------------------------- DIRT */
export function dirtSet(rng, aniso, size = 256) {
  const c = canvas(size);
  const cx = c.getContext('2d');
  const img = cx.createImageData(size, size);
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      const n = fbm(u, v, 32, 4, 61);
      const ruts = 0.5 + 0.5 * Math.sin((u * 6.283) * 3 + fbm(u, v, 6, 2, 99) * 4);
      const t = n * 0.7 + ruts * 0.3;
      const i = (y * size + x) * 4;
      img.data[i] = clamp01((122 + t * 74 - 34) / 255) * 255;
      img.data[i + 1] = clamp01((92 + t * 60 - 28) / 255) * 255;
      img.data[i + 2] = clamp01((62 + t * 46 - 22) / 255) * 255;
      img.data[i + 3] = 255;
      h[y * size + x] = t;
    }
  }
  cx.putImageData(img, 0, 0);
  return { map: texFromCanvas(c, { aniso }), normalMap: normalFromHeight(h, size, 2.2, aniso) };
}

/* ------------------------------------------------------------ SMALL DECALS */
export function checkerTexture(n = 8, px = 256) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const s = px / n;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      g.fillStyle = (x + y) % 2 ? '#ffffff' : '#16181c';
      g.fillRect(x * s, y * s, s, s);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Soft round alpha blob used for tyre marks / oil stains. */
export function smudgeTexture(rng, px = 128) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const img = g.createImageData(px, px);
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const u = x / px, v = y / px;
      const edge = Math.min(1, Math.min(u, 1 - u) * 6) * Math.min(1, Math.min(v, 1 - v) * 3);
      const n = fbm(u, v, 10, 3, 555);
      const a = clamp01(edge * (0.35 + n * 0.85) - 0.12);
      const i = (y * px + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 20;
      img.data[i + 3] = a * 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Painted arrow / chevron, white on transparent. */
export function arrowTexture(kind, px = 256) {
  const c = canvas(px);
  const g = c.getContext('2d');
  g.clearRect(0, 0, px, px);
  g.fillStyle = '#ffffff';
  g.strokeStyle = '#ffffff';
  if (kind === 'arrow') {
    g.beginPath();
    g.moveTo(px * 0.5, px * 0.06);
    g.lineTo(px * 0.9, px * 0.5);
    g.lineTo(px * 0.66, px * 0.5);
    g.lineTo(px * 0.66, px * 0.94);
    g.lineTo(px * 0.34, px * 0.94);
    g.lineTo(px * 0.34, px * 0.5);
    g.lineTo(px * 0.1, px * 0.5);
    g.closePath(); g.fill();
  } else {
    for (let i = 0; i < 3; i++) {
      const y0 = px * (0.08 + i * 0.30);
      g.beginPath();
      g.moveTo(px * 0.08, y0 + px * 0.18);
      g.lineTo(px * 0.5, y0);
      g.lineTo(px * 0.92, y0 + px * 0.18);
      g.lineTo(px * 0.92, y0 + px * 0.26);
      g.lineTo(px * 0.5, y0 + px * 0.08);
      g.lineTo(px * 0.08, y0 + px * 0.26);
      g.closePath(); g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Boost pad: rasta chevrons on black with a glowing edge. */
export function boostTexture(px = 256) {
  const c = canvas(px);
  const g = c.getContext('2d');
  g.fillStyle = '#0d1013'; g.fillRect(0, 0, px, px);
  const cols = ['#d8232a', '#ffd21e', '#1eae4b'];
  for (let i = 0; i < 6; i++) {
    g.fillStyle = cols[i % 3];
    const y0 = px * (i / 6) - px * 0.06;
    g.beginPath();
    g.moveTo(0, y0 + px * 0.14);
    g.lineTo(px * 0.5, y0);
    g.lineTo(px, y0 + px * 0.14);
    g.lineTo(px, y0 + px * 0.20);
    g.lineTo(px * 0.5, y0 + px * 0.06);
    g.lineTo(0, y0 + px * 0.20);
    g.closePath(); g.fill();
  }
  g.strokeStyle = '#ffffff'; g.lineWidth = px * 0.035;
  g.strokeRect(px * 0.017, px * 0.017, px * 0.966, px * 0.966);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ------------------------------------------------------------- FOLIAGE ALPHA */
/** A cluster of leaves on transparent background, for cross-quad bushes. */
export function leafClusterTexture(rng, px = 128, tint = [0.18, 0.55, 0.22]) {
  const c = canvas(px);
  const g = c.getContext('2d');
  g.clearRect(0, 0, px, px);
  const n = 26;
  for (let i = 0; i < n; i++) {
    const a = rng.range(0, Math.PI * 2);
    const rad = Math.pow(rng.next(), 0.6) * px * 0.42;
    const x = px * 0.5 + Math.cos(a) * rad;
    const y = px * 0.62 - Math.sin(a) * rad * 0.85;
    const s = px * rng.range(0.10, 0.20);
    const sh = rng.range(0.62, 1.18);
    g.save();
    g.translate(x, y);
    g.rotate(rng.range(0, Math.PI * 2));
    g.fillStyle = `rgb(${Math.round(tint[0] * 255 * sh)},${Math.round(tint[1] * 255 * sh)},${Math.round(tint[2] * 255 * sh)})`;
    g.beginPath();
    g.ellipse(0, 0, s, s * 0.42, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Palm frond: a feathered leaf pointing +X, on transparent background. */
export function frondTexture(rng, px = 128) {
  const c = canvas(px);
  const g = c.getContext('2d');
  g.clearRect(0, 0, px, px);
  const midY = px * 0.5;
  g.strokeStyle = '#4a7a2c'; g.lineWidth = px * 0.028;
  g.beginPath(); g.moveTo(0, midY); g.lineTo(px * 0.98, midY * 0.92); g.stroke();
  for (let i = 0; i < 30; i++) {
    const t = i / 29;
    const x = t * px * 0.97;
    const y = midY - t * midY * 0.08;
    const len = Math.sin(Math.PI * Math.pow(t, 0.75)) * px * 0.34;
    const sh = 0.72 + 0.42 * ((i * 37 % 13) / 13);
    g.strokeStyle = `rgb(${Math.round(46 * sh)},${Math.round(126 * sh)},${Math.round(48 * sh)})`;
    g.lineWidth = px * 0.030;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + px * 0.05, y - len); g.stroke();
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + px * 0.05, y + len); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Rippled water normal map (tileable), two wave scales, wind-stretched. */
export function waterNormalTexture(size = 256, aniso = 8) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      // stretch along the wind direction so it reads as swell, not as soup
      const a = fbm(u * 1.0, v * 1.0, 6, 4, 131);
      const b = fbm(u * 2.0, v * 0.7, 17, 3, 733);
      const c = fbm(u * 0.6, v * 1.4, 40, 2, 977);
      h[y * size + x] = a * 0.5 + b * 0.32 + c * 0.18;
    }
  }
  return normalFromHeight(h, size, 1.9, aniso);
}

/** Broken foam mask: white blobs on transparent, tileable. */
export function foamTexture(size = 256, aniso = 8) {
  const v = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, w = y / size;
      const n = fbm(u, w, 9, 4, 1301) * 0.55 + fbm(u, w, 30, 3, 1777) * 0.45;
      v[y * size + x] = clamp01((n - 0.34) * 2.3);
    }
  }
  return grayTexture(v, size, aniso);
}

/** Corrugated iron sheet, as used on every shack roof in the Caribbean. */
export function corrugatedTexture(px = 128, tint = [180, 170, 158]) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const img = g.createImageData(px, px);
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const u = x / px, v = y / px;
      const rib = 0.5 + 0.5 * Math.sin(u * Math.PI * 2 * 9);
      const rust = fbm(u, v, 12, 4, 881);
      const streak = fbm(u * 0.3, v * 2.4, 20, 3, 313);
      const t = rib * 0.62 + streak * 0.38;
      let r = tint[0] * (0.62 + t * 0.62);
      let gg = tint[1] * (0.62 + t * 0.62);
      let b = tint[2] * (0.62 + t * 0.62);
      if (rust > 0.66) { const k = (rust - 0.66) * 2.6; r = r * (1 - k) + 132 * k; gg = gg * (1 - k) + 74 * k; b = b * (1 - k) + 42 * k; }
      const i = (y * px + x) * 4;
      img.data[i] = clamp01(r / 255) * 255;
      img.data[i + 1] = clamp01(gg / 255) * 255;
      img.data[i + 2] = clamp01(b / 255) * 255;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return texFromCanvas(c, { aniso: 8 });
}

/** Sponsor / event banner for the overhead gantries. */
export function bannerTexture(px = 512, rng) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const h = px / 4;
  g.fillStyle = '#12161a'; g.fillRect(0, 0, px, h);
  // rasta bands top and bottom
  const bands = ['#1eae4b', '#ffd21e', '#d8232a'];
  for (let i = 0; i < 3; i++) {
    g.fillStyle = bands[i];
    g.fillRect(0, i * h * 0.055, px, h * 0.055);
    g.fillRect(0, h - (i + 1) * h * 0.055, px, h * 0.055);
  }
  g.fillStyle = '#f2f6f8';
  g.font = `bold ${Math.round(h * 0.42)}px sans-serif`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('KINGSTON COAST', px * 0.5, h * 0.5);
  g.fillStyle = '#ffd21e';
  g.font = `bold ${Math.round(h * 0.2)}px sans-serif`;
  g.fillText('★ RASTA KART GRAND PRIX ★', px * 0.5, h * 0.80);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/**
 * Crowd sheet: rows of shoulders-and-heads on transparent, used as a billboard
 * strip across the top of each grandstand tier. Far cheaper than instancing a
 * thousand bodies and, at grandstand distance, indistinguishable.
 */
export function crowdTexture(rng, px = 256) {
  const c = canvas(px);
  const g = c.getContext('2d');
  g.clearRect(0, 0, px, px);
  const shirts = ['#e0533f', '#f4a52a', '#2fb3a6', '#5a7fd0', '#7cc45a', '#f2d64b', '#e07ab0', '#f2f6f8', '#1eae4b', '#d8232a'];
  const skins = ['#5a3a24', '#7a4f30', '#3d2718', '#9a6a44', '#c99a70'];
  const cols = 16;
  for (let row = 0; row < 3; row++) {
    const y0 = px * (row / 3);
    const rh = px / 3;
    for (let i = 0; i < cols; i++) {
      const jitter = rng.range(-0.3, 0.3);
      const x = px * ((i + 0.5 + jitter) / cols);
      const bodyW = px / cols * rng.range(0.75, 1.05);
      const headR = bodyW * 0.30;
      const baseY = y0 + rh * 0.98;
      const bob = rng.range(0, 0.10) * rh;
      g.fillStyle = rng.pick(shirts);
      g.beginPath();
      g.ellipse(x, baseY - rh * 0.22 - bob, bodyW * 0.52, rh * 0.34, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = rng.pick(skins);
      g.beginPath();
      g.arc(x, baseY - rh * 0.52 - bob, headR, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** Falling-water sheet: vertical streaks, white, with an alpha gradient. */
export function waterfallTexture(px = 256) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const img = g.createImageData(px, px);
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const u = x / px, v = y / px;
      const streak = fbm(u * 3.0, v * 0.22, 26, 3, 1913);
      const froth = fbm(u, v, 40, 3, 2287);
      const t = clamp01(streak * 0.7 + froth * 0.3);
      const i = (y * px + x) * 4;
      const c0 = 210 + t * 45;
      img.data[i] = clamp01(c0 / 255) * 255;
      img.data[i + 1] = clamp01((c0 + 6) / 255) * 255;
      img.data[i + 2] = 255;
      // more opaque as it falls and spreads
      img.data[i + 3] = clamp01(0.30 + t * 0.62 + v * 0.22) * 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

/** Bark / bamboo / plank strip texture (vertical grain). */
export function barkTexture(rng, px = 128, base = [126, 96, 62], grain = 0.5) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const img = g.createImageData(px, px);
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const u = x / px, v = y / px;
      const n = fbm(u * 0.35, v * 3.0, 16, 3, 211);
      const rings = 0.5 + 0.5 * Math.sin(u * Math.PI * 2 * 6 + n * 6);
      const t = n * (1 - grain) + rings * grain;
      const i = (y * px + x) * 4;
      img.data[i] = clamp01((base[0] + t * 70 - 34) / 255) * 255;
      img.data[i + 1] = clamp01((base[1] + t * 62 - 30) / 255) * 255;
      img.data[i + 2] = clamp01((base[2] + t * 50 - 24) / 255) * 255;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return texFromCanvas(c, { aniso: 4 });
}

/** Stucco / painted plaster for the village houses. */
export function stuccoTexture(px = 128) {
  const c = canvas(px);
  const g = c.getContext('2d');
  const img = g.createImageData(px, px);
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const u = x / px, v = y / px;
      const n = fbm(u, v, 24, 4, 313);
      const t = 0.82 + n * 0.36;
      const i = (y * px + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = clamp01(t) * 255;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return texFromCanvas(c, { aniso: 4 });
}

export { texFromCanvas, clamp01 };
