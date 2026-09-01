import * as THREE from 'three';

/**
 * One instanced-quad particle pool = one draw call.
 *
 * The CPU never touches a particle after it is born. Spawning writes a row of
 * constants (origin, velocity, drag, gravity, life, two colours, sprite cell)
 * into pre-allocated instance buffers; the vertex shader integrates the closed
 * form of `v' = -k v + g` every frame from `uTime`. That is what lets 2000
 * particles run inside a 120 Hz fixed step without a single allocation, and it
 * also means motion stays smooth on frames where only `lateUpdate` runs (the
 * screenshot harness does exactly that).
 *
 * Quads rather than gl.POINTS on purpose: point sprites are clipped by their
 * centre - a big dust puff pops out of existence as it crosses the frame edge -
 * and cannot be stretched along the direction of travel, which is most of what
 * makes a spark read as a spark.
 *
 * Modes
 *   0  billboard, rotates with `rot0 + rotSpeed * age`
 *   1  ground plane (world XZ), for shockwaves and scorch rings
 *   2  billboard stretched along the screen-space velocity (sparks, flames)
 */

const VERT = /* glsl */`
precision highp float;

attribute vec3 aOrigin;
attribute vec3 aVel;
attribute vec4 aLife;     // birth, life, size0, size1
attribute vec4 aColorA;   // rgb + alpha at birth
attribute vec4 aColorB;   // rgb + alpha at death
attribute vec4 aParams;   // drag, gravity, rot0, rotSpeed
attribute vec4 aOpts;     // atlasCell, stretch, mode, fadePow

uniform float uTime;
uniform vec2  uAtlas;     // cols, rows
uniform float uScale;

varying vec2 vUv;
varying vec4 vColor;

void main() {
  float age = uTime - aLife.x;
  float life = max(aLife.y, 1e-4);
  float u = age / life;

  if (age < 0.0 || u >= 1.0) {
    vColor = vec4(0.0);
    vUv = vec2(0.0);
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);   // behind the far plane: clipped
    return;
  }

  // ---- closed-form ballistic integration ---------------------------------
  float k = max(aParams.x, 1e-3);
  float e = exp(-k * age);
  vec3 pos = aOrigin
           + aVel * ((1.0 - e) / k)
           + vec3(0.0, 0.5 * aParams.y * age * age, 0.0);
  vec3 vel = aVel * e + vec3(0.0, aParams.y * age, 0.0);

  float size = mix(aLife.z, aLife.w, u) * uScale;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vec2 q = position.xy;                       // unit quad, -0.5 .. 0.5

  float rot = aParams.z + aParams.w * age;
  float cr = cos(rot), sr = sin(rot);
  vec2 rq = vec2(q.x * cr - q.y * sr, q.x * sr + q.y * cr);

  // screen-space velocity basis, for stretched sprites
  vec3 vView = (modelViewMatrix * vec4(vel, 0.0)).xyz;
  vec2 d = vView.xy;
  float dl = length(d);
  vec2 dir = dl > 1e-4 ? d / dl : vec2(0.0, 1.0);
  vec2 perp = vec2(-dir.y, dir.x);
  float stretched = size * (1.0 + aOpts.y * dl);
  vec2 offVel = dir * (q.y * stretched) + perp * (q.x * size);

  float useVel = step(1.5, aOpts.z);
  float useGround = step(0.5, aOpts.z) * (1.0 - useVel);

  vec4 clipBill = projectionMatrix * (mv + vec4(mix(rq * size, offVel, useVel), 0.0, 0.0));
  vec4 clipGround = projectionMatrix * (modelViewMatrix *
      vec4(pos + vec3(rq.x, 0.0, rq.y) * size, 1.0));
  gl_Position = mix(clipBill, clipGround, useGround);

  // ---- atlas cell --------------------------------------------------------
  float cell = aOpts.x;
  float cx = mod(cell, uAtlas.x);
  float cy = floor(cell / uAtlas.x);
  vec2 inset = uv * 0.980 + 0.010;
  vUv = (vec2(cx, cy) + inset) / uAtlas;

  // ---- colour / fade -----------------------------------------------------
  vColor = mix(aColorA, aColorB, u);
  float fade = pow(max(0.0, 1.0 - u), max(0.05, aOpts.w));
  fade *= smoothstep(0.0, 0.055, u);
  vColor.a *= fade;
}
`;

const FRAG = /* glsl */`
precision highp float;
uniform sampler2D uMap;
varying vec2 vUv;
varying vec4 vColor;
void main() {
  vec4 t = texture2D(uMap, vUv);
  float a = t.a * vColor.a;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor.rgb * t.rgb, a);
}
`;

const _c = new THREE.Color();

export class ParticlePool {
  /**
   * @param {object} o
   * @param {number} o.capacity   ring-buffer size
   * @param {THREE.Texture} o.map atlas texture
   * @param {number} o.cols
   * @param {number} o.rows
   * @param {boolean} o.additive
   * @param {number} o.renderOrder
   */
  constructor(o) {
    const n = this.capacity = o.capacity;
    this.head = 0;
    this.live = 0;
    this._dirty = false;

    const base = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.attributes.position = base.attributes.position;
    geo.attributes.uv = base.attributes.uv;
    geo.instanceCount = n;
    base.dispose();

    const attr = (size) => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(n * size), size);
      a.setUsage(THREE.DynamicDrawUsage);
      return a;
    };
    this.aOrigin = attr(3);
    this.aVel = attr(3);
    this.aLife = attr(4);
    this.aColorA = attr(4);
    this.aColorB = attr(4);
    this.aParams = attr(4);
    this.aOpts = attr(4);

    geo.setAttribute('aOrigin', this.aOrigin);
    geo.setAttribute('aVel', this.aVel);
    geo.setAttribute('aLife', this.aLife);
    geo.setAttribute('aColorA', this.aColorA);
    geo.setAttribute('aColorB', this.aColorB);
    geo.setAttribute('aParams', this.aParams);
    geo.setAttribute('aOpts', this.aOpts);

    // life = 0 marks a dead slot; the shader kills it on the first frame
    for (let i = 0; i < n; i++) this.aLife.array[i * 4 + 1] = 0;

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMap: { value: o.map },
        uAtlas: { value: new THREE.Vector2(o.cols, o.rows) },
        uScale: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: o.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      side: THREE.DoubleSide,
      toneMapped: false,
      fog: false,
    });

    this.mesh = new THREE.Mesh(geo, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = o.renderOrder ?? 10;
    this.mesh.matrixAutoUpdate = false;
    this.mesh.name = o.additive ? 'vfx:additive' : 'vfx:alpha';
    this.geometry = geo;

    // Rows written since the last upload, so a quiet frame costs nothing.
    this._lo = n; this._hi = -1;
  }

  /**
   * Spawn one particle. Every field has a sane default so call sites stay
   * readable; `p` is a plain object reused by the caller.
   */
  spawn(p) {
    const i = this.head;
    this.head = (this.head + 1) % this.capacity;

    let o = i * 3;
    this.aOrigin.array[o] = p.x; this.aOrigin.array[o + 1] = p.y; this.aOrigin.array[o + 2] = p.z;
    this.aVel.array[o] = p.vx || 0; this.aVel.array[o + 1] = p.vy || 0; this.aVel.array[o + 2] = p.vz || 0;

    o = i * 4;
    const L = this.aLife.array;
    L[o] = p.birth; L[o + 1] = p.life; L[o + 2] = p.size0; L[o + 3] = p.size1 ?? p.size0;

    const A = this.aColorA.array;
    A[o] = p.r0; A[o + 1] = p.g0; A[o + 2] = p.b0; A[o + 3] = p.a0 ?? 1;
    const B = this.aColorB.array;
    B[o] = p.r1 ?? p.r0; B[o + 1] = p.g1 ?? p.g0; B[o + 2] = p.b1 ?? p.b0; B[o + 3] = p.a1 ?? 0;

    const P = this.aParams.array;
    P[o] = p.drag ?? 1.5; P[o + 1] = p.gravity ?? -9.8;
    P[o + 2] = p.rot ?? 0; P[o + 3] = p.rotSpeed ?? 0;

    const O = this.aOpts.array;
    O[o] = p.cell; O[o + 1] = p.stretch ?? 0; O[o + 2] = p.mode ?? 0; O[o + 3] = p.fade ?? 1;

    if (i < this._lo) this._lo = i;
    if (i > this._hi) this._hi = i;
    this._dirty = true;
    return i;
  }

  setScale(s) { this.material.uniforms.uScale.value = s; }

  /** Push only the touched range of every attribute. Call once per frame. */
  flush(time) {
    this.material.uniforms.uTime.value = time;
    if (!this._dirty) return;
    const lo = this._lo, hi = this._hi;
    const count = hi - lo + 1;
    for (const a of [this.aOrigin, this.aVel, this.aLife, this.aColorA,
      this.aColorB, this.aParams, this.aOpts]) {
      a.addUpdateRange(lo * a.itemSize, count * a.itemSize);
      a.needsUpdate = true;
    }
    this._lo = this.capacity; this._hi = -1;
    this._dirty = false;
  }

  clear() {
    const L = this.aLife.array;
    for (let i = 0; i < this.capacity; i++) L[i * 4 + 1] = 0;
    this.aLife.needsUpdate = true;
    this.head = 0;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

/** Small helper: write a THREE-style hex/Color into the p.r0/g0/b0 fields. */
export function setColor(p, key, color, gain = 1) {
  if (typeof color === 'number') _c.setHex(color, THREE.SRGBColorSpace);
  else _c.copy(color);
  p['r' + key] = _c.r * gain;
  p['g' + key] = _c.g * gain;
  p['b' + key] = _c.b * gain;
  return p;
}
