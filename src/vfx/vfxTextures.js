import * as THREE from 'three';

/**
 * Every VFX sprite in the game lives in one 4x4 atlas baked at boot.
 *
 * One texture means one material can draw sparks, smoke, leaves, rings and
 * flames in a single instanced draw call - the difference between "particles"
 * and "particles you can afford". The shapes are drawn with the 2D canvas API
 * from a deterministic RNG so a screenshot run is byte-identical.
 */

export const CELL = {
  GLOW: 0,        // soft radial falloff - cores, glints, boost heat
  SPARK: 1,       // bright core + four thin rays - the drift spark
  STREAK: 2,      // vertical soft capsule - velocity-aligned trails
  SMOKE: 3,       // noisy round puff with soft edges
  RING: 4,        // annulus - shockwaves, boost rings
  STAR: 5,        // five-point cartoon star - spin-out
  LEAF: 6,        // pointed blade - grass debris
  CHUNK: 7,       // irregular hard-edged pebble - dirt/sand debris
  DROP: 8,        // teardrop - water
  FLAME: 9,       // teardrop with a hot core - exhaust fire
  SPARKLE: 10,    // four thin rays, no core - item box shimmer
  CLOUD: 11,      // large low-contrast puff - landing dust
  DISC: 12,       // filled circle, bright rim - blast fronts
  HALO: 13,       // wide soft disc - light bloom under a kart
  BAR: 14,        // thin vertical bar - speed lines
  COIN: 15,       // small ring with a slab - coins / item sparkle
};

const N = 4;                    // atlas is N x N cells
const CELL_PX = 192;

function ctx2d(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h ?? w;
  return c.getContext('2d', { willReadFrequently: false });
}

/** Radial gradient blob helper, all values in cell-local pixels. */
function blob(g, x, y, r, stops) {
  const grad = g.createRadialGradient(x, y, 0, x, y, Math.max(0.01, r));
  for (const s of stops) grad.addColorStop(s[0], s[1]);
  g.fillStyle = grad;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}

const W = (a) => 'rgba(255,255,255,' + a + ')';
const K = (a) => 'rgba(0,0,0,' + a + ')';

function drawGlow(g, s) {
  blob(g, s / 2, s / 2, s / 2, [
    [0.0, W(1)], [0.22, W(0.82)], [0.55, W(0.24)], [1.0, W(0)],
  ]);
}

function drawHalo(g, s) {
  blob(g, s / 2, s / 2, s / 2, [
    [0.0, W(0.55)], [0.45, W(0.22)], [1.0, W(0)],
  ]);
}

function drawSpark(g, s) {
  const c = s / 2;
  g.save();
  g.translate(c, c);
  for (let i = 0; i < 4; i++) {
    g.rotate(Math.PI / 2);
    const len = i % 2 === 0 ? c * 0.98 : c * 0.62;
    const grad = g.createLinearGradient(0, 0, 0, -len);
    grad.addColorStop(0, W(1));
    grad.addColorStop(0.32, W(0.42));
    grad.addColorStop(1, W(0));
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(-s * 0.030, 0);
    g.lineTo(0, -len);
    g.lineTo(s * 0.030, 0);
    g.closePath();
    g.fill();
  }
  g.restore();
  blob(g, c, c, s * 0.24, [[0.0, W(1)], [0.40, W(0.85)], [1.0, W(0)]]);
}

function drawSparkle(g, s) {
  const c = s / 2;
  g.save();
  g.translate(c, c);
  g.rotate(Math.PI / 4);
  for (let i = 0; i < 4; i++) {
    g.rotate(Math.PI / 2);
    const grad = g.createLinearGradient(0, 0, 0, -c);
    grad.addColorStop(0, W(0.95));
    grad.addColorStop(1, W(0));
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(-s * 0.016, 0);
    g.lineTo(0, -c * 0.96);
    g.lineTo(s * 0.016, 0);
    g.closePath();
    g.fill();
  }
  g.restore();
  blob(g, c, c, s * 0.13, [[0, W(1)], [1, W(0)]]);
}

function drawStreak(g, s) {
  const c = s / 2;
  // sine-tapered capsule: full opacity band whose width follows a cosine so
  // the head is round and the tail dissolves.
  for (let y = 0; y < s; y++) {
    const t = y / (s - 1);
    const w = Math.sin(Math.PI * Math.pow(t, 0.80)) * c * 0.36 + 0.6;
    const a = Math.min(1, Math.sin(Math.PI * Math.pow(t, 0.55)) * 1.15);
    g.fillStyle = W(a.toFixed(3));
    g.fillRect(c - w, y, w * 2, 1);
  }
  g.globalCompositeOperation = 'lighter';
  blob(g, c, s * 0.30, s * 0.26, [[0, W(0.5)], [1, W(0)]]);
  g.globalCompositeOperation = 'source-over';
}

function drawBar(g, s) {
  const c = s / 2;
  const grad = g.createLinearGradient(0, 0, 0, s);
  grad.addColorStop(0.0, W(0));
  grad.addColorStop(0.5, W(1));
  grad.addColorStop(1.0, W(0));
  g.fillStyle = grad;
  g.fillRect(c - s * 0.045, 0, s * 0.09, s);
}

/** Layered soft blobs masked by a radial falloff: reads as volume, not a disc. */
function drawSmoke(g, s, rng, puffs, contrast) {
  const c = s / 2;
  for (let i = 0; i < puffs; i++) {
    const a = rng.range(0, Math.PI * 2);
    const rr = Math.sqrt(rng.next()) * c * 0.46;
    const x = c + Math.cos(a) * rr;
    const y = c + Math.sin(a) * rr;
    const r = rng.range(c * 0.22, c * 0.50);
    const alpha = rng.range(0.16, 0.34) * contrast;
    blob(g, x, y, r, [
      [0.0, W(alpha.toFixed(3))],
      [0.55, W((alpha * 0.55).toFixed(3))],
      [1.0, W(0)],
    ]);
  }
  const mask = g.createRadialGradient(c, c, c * 0.40, c, c, c);
  mask.addColorStop(0, K(1));
  mask.addColorStop(1, K(0));
  g.globalCompositeOperation = 'destination-in';
  g.fillStyle = mask;
  g.fillRect(0, 0, s, s);
  g.globalCompositeOperation = 'source-over';
}

function drawRing(g, s) {
  const c = s / 2;
  const grad = g.createRadialGradient(c, c, c * 0.48, c, c, c);
  grad.addColorStop(0, W(0));
  grad.addColorStop(0.55, W(1));
  grad.addColorStop(1, W(0));
  g.fillStyle = grad;
  g.beginPath();
  g.arc(c, c, c, 0, Math.PI * 2);
  g.fill();
}

function drawDisc(g, s) {
  const c = s / 2;
  blob(g, c, c, c, [
    [0.0, W(0.5)], [0.62, W(0.66)], [0.86, W(1)], [1.0, W(0)],
  ]);
}

function drawStar(g, s) {
  const c = s / 2;
  const R = c * 0.94, r = c * 0.40;
  g.save();
  g.translate(c, c);
  g.rotate(-Math.PI / 2);
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = (i / 10) * Math.PI * 2;
    const x = Math.cos(a) * rad, y = Math.sin(a) * rad;
    if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
  }
  g.closePath();
  g.fillStyle = W(1);
  g.fill();
  g.restore();
}

function drawLeaf(g, s) {
  const c = s / 2;
  g.fillStyle = W(1);
  g.beginPath();
  g.moveTo(c, s * 0.06);
  g.quadraticCurveTo(s * 0.92, c, c, s * 0.94);
  g.quadraticCurveTo(s * 0.08, c, c, s * 0.06);
  g.fill();
  g.globalCompositeOperation = 'destination-out';
  g.strokeStyle = K(0.5);
  g.lineWidth = s * 0.035;
  g.beginPath();
  g.moveTo(c, s * 0.12); g.lineTo(c, s * 0.88);
  g.stroke();
  g.globalCompositeOperation = 'source-over';
}

function drawChunk(g, s, rng) {
  const c = s / 2;
  g.beginPath();
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = c * rng.range(0.55, 0.94);
    const x = c + Math.cos(a) * r, y = c + Math.sin(a) * r;
    if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
  }
  g.closePath();
  g.fillStyle = W(1);
  g.fill();
  // knock a soft bite out of one side so it is not a flat silhouette
  g.globalCompositeOperation = 'destination-out';
  blob(g, c * 1.35, c * 1.35, c * 0.55, [[0, K(0.42)], [1, K(0)]]);
  g.globalCompositeOperation = 'source-over';
}

function drawDrop(g, s) {
  const c = s / 2;
  g.fillStyle = W(1);
  g.beginPath();
  g.moveTo(c, s * 0.05);
  g.quadraticCurveTo(s * 0.86, s * 0.64, c, s * 0.95);
  g.quadraticCurveTo(s * 0.14, s * 0.64, c, s * 0.05);
  g.fill();
  g.globalCompositeOperation = 'destination-out';
  blob(g, c, s * 0.70, s * 0.16, [[0, K(0.45)], [1, K(0)]]);
  g.globalCompositeOperation = 'source-over';
}

function drawFlame(g, s) {
  const c = s / 2;
  // teardrop with the point at v=0; used velocity-aligned so the point trails
  const grad = g.createLinearGradient(0, s, 0, 0);
  grad.addColorStop(0.0, W(0));
  grad.addColorStop(0.16, W(0.5));
  grad.addColorStop(0.52, W(0.95));
  grad.addColorStop(1.0, W(0));
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(c, s * 0.02);
  g.bezierCurveTo(s * 0.96, s * 0.42, s * 0.80, s * 0.99, c, s * 0.99);
  g.bezierCurveTo(s * 0.20, s * 0.99, s * 0.04, s * 0.42, c, s * 0.02);
  g.fill();
  g.globalCompositeOperation = 'lighter';
  blob(g, c, s * 0.66, s * 0.26, [[0, W(0.85)], [1, W(0)]]);
  g.globalCompositeOperation = 'source-over';
}

function drawCoin(g, s) {
  const c = s / 2;
  g.lineWidth = s * 0.12;
  g.strokeStyle = W(1);
  g.beginPath();
  g.arc(c, c, c * 0.72, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = W(0.5);
  g.beginPath();
  g.arc(c, c, c * 0.62, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = W(1);
  g.fillRect(c - s * 0.055, c - s * 0.30, s * 0.11, s * 0.60);
}

/** Bakes the sprite atlas. `rng` must be a deterministic Rng. */
export function makeVfxAtlas(rng) {
  const size = CELL_PX * N;
  const g = ctx2d(size, size);
  g.clearRect(0, 0, size, size);

  const draw = (cell, fn) => {
    const cx = (cell % N) * CELL_PX;
    const cy = Math.floor(cell / N) * CELL_PX;
    g.save();
    g.translate(cx, cy);
    g.beginPath();
    g.rect(0, 0, CELL_PX, CELL_PX);
    g.clip();
    fn(g, CELL_PX);
    g.restore();
  };

  draw(CELL.GLOW, drawGlow);
  draw(CELL.SPARK, drawSpark);
  draw(CELL.STREAK, drawStreak);
  draw(CELL.SMOKE, (gg, s) => drawSmoke(gg, s, rng, 26, 1.0));
  draw(CELL.RING, drawRing);
  draw(CELL.STAR, drawStar);
  draw(CELL.LEAF, drawLeaf);
  draw(CELL.CHUNK, (gg, s) => drawChunk(gg, s, rng));
  draw(CELL.DROP, drawDrop);
  draw(CELL.FLAME, drawFlame);
  draw(CELL.SPARKLE, drawSparkle);
  draw(CELL.CLOUD, (gg, s) => drawSmoke(gg, s, rng, 44, 0.60));
  draw(CELL.DISC, drawDisc);
  draw(CELL.HALO, drawHalo);
  draw(CELL.BAR, drawBar);
  draw(CELL.COIN, drawCoin);

  const tex = new THREE.CanvasTexture(g.canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  // The atlas is addressed by cell index straight out of canvas space:
  // cell 5 must be the sixth cell reading left-to-right, top-to-bottom. With
  // three.js' default flipY the V axis runs the other way, which silently
  // mirrors the row index - cell 1 (SPARK) samples cell 13 (HALO), and every
  // spark in the game renders as a soft disc. It also decides which end of a
  // velocity-stretched sprite trails: the flame and the drop are authored with
  // their point at v=0 so it follows the particle, which only holds with
  // flipY off.
  tex.flipY = false;
  tex.needsUpdate = true;
  return { texture: tex, cols: N, rows: N };
}

/**
 * Tyre mark texture: a rubber smear with tread grooves and scuff noise so the
 * decal strip never reads as a clean rectangle laid on the road.
 */
export function makeTyreMark(rng) {
  const w = 64, h = 256;
  const g = ctx2d(w, h);
  g.clearRect(0, 0, w, h);

  const grad = g.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0.00, W(0));
  grad.addColorStop(0.18, W(0.7));
  grad.addColorStop(0.50, W(1));
  grad.addColorStop(0.82, W(0.7));
  grad.addColorStop(1.00, W(0));
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);

  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 5; i++) {
    const x = (i + 0.5) / 5 * w + rng.range(-2, 2);
    g.fillStyle = K(rng.range(0.12, 0.30).toFixed(3));
    g.fillRect(x - 1.2, 0, 2.4, h);
  }
  for (let i = 0; i < 300; i++) {
    const x = rng.range(0, w), y = rng.range(0, h);
    const r = rng.range(1.2, 5.5);
    g.fillStyle = K(rng.range(0.05, 0.40).toFixed(3));
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  g.globalCompositeOperation = 'source-over';

  const tex = new THREE.CanvasTexture(g.canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}
