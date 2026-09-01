import * as THREE from 'three';

/**
 * Procedural canvas textures for the kart. Everything is generated from a
 * deterministic integer hash — no Math.random, no external assets.
 */

const hash2 = (x, y, s = 0) => {
  let h = (x * 374761393 + y * 668265263 + s * 1442695040) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const smooth = (t) => t * t * (3 - 2 * t);

function valueNoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s);
  const c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
  return (a + (b - a) * xf) + ((c + (d - c) * xf) - (a + (b - a) * xf)) * yf;
}

function fbm(x, y, oct, s) {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += amp * valueNoise(x * f, y * f, s + i); f *= 2; amp *= 0.5; }
  return v;
}

function canvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

/** Sobel a height field into a tangent-space normal map. */
function heightToNormal(height, size, strength) {
  const img = new ImageData(size, size);
  const at = (x, y) => height[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      let nx = -dx, ny = -dy, nz = 1;
      const l = Math.hypot(nx, ny, nz);
      nx /= l; ny /= l; nz /= l;
      const o = (y * size + x) * 4;
      img.data[o] = (nx * 0.5 + 0.5) * 255;
      img.data[o + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[o + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[o + 3] = 255;
    }
  }
  const c = canvas(size);
  c.getContext('2d').putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Tyre: chevron tread block pattern. u wraps around the circumference. */
export function tyreTextures(size = 256) {
  const h = new Float32Array(size * size);
  const cvs = canvas(size);
  const g = cvs.getContext('2d');
  g.fillStyle = '#16171a';
  g.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;        // around the tyre
      const v = y / size;        // across the tread
      let val = 0.5;
      const shoulder = Math.min(v, 1 - v);
      if (shoulder < 0.14) {
        // sidewall — smooth, with a raised lettering band
        val = 0.34 + 0.06 * Math.sin(u * Math.PI * 2 * 26);
      } else {
        // tread blocks: chevrons pointing outward from the centre line
        const side = v < 0.5 ? -1 : 1;
        const skew = u * 14 + side * (Math.abs(v - 0.5) * 9);
        const block = (skew % 1 + 1) % 1;
        const groove = Math.abs(v - 0.5) < 0.055 ? 0 : 1;
        val = (block > 0.22 ? 1 : 0.15) * groove * 0.85 + 0.15;
        val += fbm(x * 0.13, y * 0.13, 3, 7) * 0.12;
      }
      h[y * size + x] = val;
      const shade = 22 + val * 26;
      g.fillStyle = `rgb(${shade | 0},${(shade * 1.01) | 0},${(shade * 1.06) | 0})`;
      g.fillRect(x, y, 1, 1);
    }
  }
  const map = new THREE.CanvasTexture(cvs);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  return { map, normalMap: heightToNormal(h, size, 2.6) };
}

/** Car paint: metallic flake + faint orange-peel. */
export function paintNormal(size = 256) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h[y * size + x] = fbm(x * 0.55, y * 0.55, 2, 11) * 0.55 + fbm(x * 0.06, y * 0.06, 3, 3) * 0.45;
    }
  }
  const t = heightToNormal(h, size, 0.42);
  t.repeat.set(3, 3);
  return t;
}

/** Brushed / cast metal for the chrome bits. */
export function metalNormal(size = 256) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h[y * size + x] = fbm(x * 0.9, y * 0.05, 3, 23) * 0.8 + fbm(x * 0.04, y * 0.04, 2, 5) * 0.2;
    }
  }
  const t = heightToNormal(h, size, 0.3);
  t.repeat.set(2, 2);
  return t;
}

/** Moulded rubber / matte plastic. */
export function plasticNormal(size = 256) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h[y * size + x] = fbm(x * 1.6, y * 1.6, 2, 41);
    }
  }
  const t = heightToNormal(h, size, 0.5);
  t.repeat.set(4, 4);
  return t;
}

/** Diamond-quilted seat upholstery. */
export function seatTextures(size = 256) {
  const h = new Float32Array(size * size);
  const cvs = canvas(size);
  const g = cvs.getContext('2d');
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size * 6, v = y / size * 6;
      const d = Math.abs(((u + v) % 1) - 0.5) + Math.abs(((u - v + 8) % 1) - 0.5);
      const quilt = smooth(Math.min(1, d * 1.6));
      const val = quilt * 0.8 + fbm(x * 1.1, y * 1.1, 2, 17) * 0.2;
      h[y * size + x] = val;
      const s = 26 + val * 30;
      g.fillStyle = `rgb(${(s * 1.1) | 0},${(s * 0.95) | 0},${(s * 0.9) | 0})`;
      g.fillRect(x, y, 1, 1);
    }
  }
  const map = new THREE.CanvasTexture(cvs);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  return { map, normalMap: heightToNormal(h, size, 1.5) };
}

/**
 * Livery sheet used on the side pods and nose: rasta bands, a lion-of-Judah
 * head and a number roundel. Drawn once, reused by every kart with the
 * per-kart accent colours multiplied in by the material.
 */
export function liveryTexture(w = 512, h = 256) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.clearRect(0, 0, w, h);

  // rasta bands running the length of the pod
  const bands = [['#1b8f3a', 0.10], ['#f2c521', 0.16], ['#cf2027', 0.22]];
  for (const [col, y0] of bands) {
    g.fillStyle = col;
    g.beginPath();
    g.moveTo(0, h * y0);
    g.lineTo(w, h * (y0 - 0.03));
    g.lineTo(w, h * (y0 + 0.045));
    g.lineTo(0, h * (y0 + 0.055));
    g.closePath();
    g.fill();
  }

  // lion of Judah — stylised, built from arcs so it reads at speed
  const cx = w * 0.62, cy = h * 0.60, r = h * 0.27;
  g.save();
  g.translate(cx, cy);
  const mane = g.createRadialGradient(0, 0, r * 0.4, 0, 0, r * 1.15);
  mane.addColorStop(0, '#f7d14a');
  mane.addColorStop(0.65, '#e0a521');
  mane.addColorStop(1, 'rgba(180,120,20,0)');
  g.fillStyle = mane;
  g.beginPath();
  for (let i = 0; i < 13; i++) {
    const a = (i / 13) * Math.PI * 2;
    const rr = r * (i % 2 ? 1.14 : 0.9);
    g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
  g.fillStyle = '#3a2a10';
  g.beginPath(); g.ellipse(0, r * 0.05, r * 0.52, r * 0.58, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#f7d14a';
  g.beginPath(); g.ellipse(0, r * 0.02, r * 0.40, r * 0.46, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#2a1c08';
  g.beginPath(); g.ellipse(-r * 0.17, -r * 0.10, r * 0.075, r * 0.10, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(r * 0.17, -r * 0.10, r * 0.075, r * 0.10, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(0, r * 0.22, r * 0.13, r * 0.10, 0, 0, Math.PI * 2); g.fill();
  g.restore();

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Sky/ground gradient probe so clearcoat and chrome have something to mirror. */
export function makeEnvironment(renderer) {
  const scene = new THREE.Scene();
  const geo = new THREE.SphereGeometry(50, 24, 16);
  const colors = [];
  const pos = geo.attributes.position;
  const sky = new THREE.Color(0x4c92d6);
  const horizon = new THREE.Color(0xe8f2fb);
  const ground = new THREE.Color(0x3d5230);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 50;
    if (y >= 0) c.copy(horizon).lerp(sky, Math.min(1, y * 1.6) ** 0.8);
    else c.copy(horizon).lerp(ground, Math.min(1, -y * 2.4));
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(6, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  sun.position.set(20, 30, 14).setLength(42);
  sun.scale.setScalar(1.1);
  scene.add(sun);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const rt = pmrem.fromScene(scene, 0.04);
  pmrem.dispose();
  geo.dispose();
  return rt.texture;
}

/**
 * Soft elliptical blob used as a contact shadow directly under the kart. Real
 * cascaded shadows lose the tight ambient-occlusion core at this scale, and
 * without that core the kart reads as hovering.
 */
export function contactShadowTexture(size = 128) {
  const c = canvas(size);
  const g = c.getContext('2d');
  g.clearRect(0, 0, size, size);
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0.00, 'rgba(0,0,0,0.86)');
  grad.addColorStop(0.42, 'rgba(0,0,0,0.60)');
  grad.addColorStop(0.72, 'rgba(0,0,0,0.20)');
  grad.addColorStop(1.00, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Number roundel + sponsor block for the nose deck. Kept separate from
 * `liveryTexture` so the flank art and the hood art do not fight for space.
 */
export function hoodTexture(size = 256) {
  const c = canvas(size);
  const g = c.getContext('2d');
  g.clearRect(0, 0, size, size);

  // three rasta chevrons pointing forward
  const cols = ['#118a3c', '#f5c518', '#d02128'];
  for (let i = 0; i < 3; i++) {
    g.fillStyle = cols[i];
    g.beginPath();
    const y = size * (0.30 + i * 0.135);
    g.moveTo(size * 0.10, y);
    g.lineTo(size * 0.50, y - size * 0.16);
    g.lineTo(size * 0.90, y);
    g.lineTo(size * 0.90, y + size * 0.075);
    g.lineTo(size * 0.50, y - size * 0.085);
    g.lineTo(size * 0.10, y + size * 0.075);
    g.closePath();
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
