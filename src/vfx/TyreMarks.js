import * as THREE from 'three';

/**
 * Every skid mark in the race, in one draw call.
 *
 * A ring buffer of quads. Each emitter (one per rear wheel per kart) remembers
 * the two corners it wrote last frame and reuses them as the leading edge of
 * the next quad, so a curved skid is a continuous ribbon instead of a dashed
 * line of disconnected stamps. Nothing is ever removed: the shader fades a quad
 * out from its birth stamp and the ring simply overwrites the oldest slot, so
 * the cost is a fixed buffer and zero allocation per frame.
 *
 * The marks are drawn as an unlit dark multiply-ish layer with depth write off
 * and a polygon offset, which keeps them glued to the road without z-fighting
 * against the track ribbon that is a few millimetres below them.
 */

const VERT = /* glsl */`
precision highp float;
attribute float aBirth;
attribute float aAlpha;
uniform float uTime;
uniform float uLife;
varying vec2 vUv;
varying float vFade;
void main() {
  float age = uTime - aBirth;
  // hold at full for the first third of the life, then fall off smoothly
  float f = 1.0 - clamp((age - uLife * 0.34) / (uLife * 0.66), 0.0, 1.0);
  vFade = aAlpha * f * f * step(0.0, age);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */`
precision highp float;
uniform sampler2D uMap;
uniform vec3 uColor;
varying vec2 vUv;
varying float vFade;
void main() {
  float a = texture2D(uMap, vUv).a * vFade;
  if (a < 0.006) discard;
  gl_FragColor = vec4(uColor, a);
}
`;

export class TyreMarks {
  /** @param {{capacity:number, map:THREE.Texture, life?:number, color?:number}} o */
  constructor(o) {
    const Q = this.capacity = o.capacity;
    this.life = o.life ?? 7.0;
    this.head = 0;
    this.used = 0;
    this._lo = Q; this._hi = -1;

    const pos = new Float32Array(Q * 4 * 3);
    const uv = new Float32Array(Q * 4 * 2);
    const birth = new Float32Array(Q * 4);
    const alpha = new Float32Array(Q * 4);
    const idx = new Uint32Array(Q * 6);
    for (let q = 0; q < Q; q++) {
      const v = q * 4, i = q * 6;
      idx[i] = v; idx[i + 1] = v + 1; idx[i + 2] = v + 2;
      idx[i + 3] = v; idx[i + 4] = v + 2; idx[i + 5] = v + 3;
      birth[v] = birth[v + 1] = birth[v + 2] = birth[v + 3] = -1e9;
    }

    const geo = new THREE.BufferGeometry();
    this.aPos = new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.aUv = new THREE.BufferAttribute(uv, 2).setUsage(THREE.DynamicDrawUsage);
    this.aBirth = new THREE.BufferAttribute(birth, 1).setUsage(THREE.DynamicDrawUsage);
    this.aAlpha = new THREE.BufferAttribute(alpha, 1).setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', this.aPos);
    geo.setAttribute('uv', this.aUv);
    geo.setAttribute('aBirth', this.aBirth);
    geo.setAttribute('aAlpha', this.aAlpha);
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.setDrawRange(0, 0);
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uLife: { value: this.life },
        uMap: { value: o.map },
        uColor: { value: new THREE.Color(o.color ?? 0x0d0c0c) },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: -6,
      polygonOffsetUnits: -6,
      side: THREE.DoubleSide,
      toneMapped: false,
      fog: false,
    });

    this.mesh = new THREE.Mesh(geo, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.matrixAutoUpdate = false;
    this.mesh.renderOrder = 4;          // above the road, below the particles
    this.mesh.name = 'vfx:tyremarks';
    this.geometry = geo;
  }

  /**
   * Append one quad. `l0/r0` are the previous edge corners, `l1/r1` the new
   * ones; `v0/v1` are the texture coordinates along the strip so the tread
   * keeps scrolling instead of restarting at every segment.
   */
  push(l0, r0, l1, r1, birth, alpha, v0, v1) {
    const q = this.head;
    this.head = (this.head + 1) % this.capacity;
    if (this.used < this.capacity) this.used++;

    const p = this.aPos.array;
    let o = q * 12;
    p[o] = l0.x; p[o + 1] = l0.y; p[o + 2] = l0.z;
    p[o + 3] = r0.x; p[o + 4] = r0.y; p[o + 5] = r0.z;
    p[o + 6] = r1.x; p[o + 7] = r1.y; p[o + 8] = r1.z;
    p[o + 9] = l1.x; p[o + 10] = l1.y; p[o + 11] = l1.z;

    const u = this.aUv.array;
    o = q * 8;
    u[o] = 0; u[o + 1] = v0;
    u[o + 2] = 1; u[o + 3] = v0;
    u[o + 4] = 1; u[o + 5] = v1;
    u[o + 6] = 0; u[o + 7] = v1;

    const b = this.aBirth.array, a = this.aAlpha.array;
    o = q * 4;
    b[o] = b[o + 1] = b[o + 2] = b[o + 3] = birth;
    a[o] = a[o + 1] = a[o + 2] = a[o + 3] = alpha;

    if (q < this._lo) this._lo = q;
    if (q > this._hi) this._hi = q;
  }

  flush(time) {
    this.material.uniforms.uTime.value = time;
    if (this._hi < 0) return;
    const lo = this._lo, count = this._hi - lo + 1;
    this.aPos.addUpdateRange(lo * 12, count * 12); this.aPos.needsUpdate = true;
    this.aUv.addUpdateRange(lo * 8, count * 8); this.aUv.needsUpdate = true;
    this.aBirth.addUpdateRange(lo * 4, count * 4); this.aBirth.needsUpdate = true;
    this.aAlpha.addUpdateRange(lo * 4, count * 4); this.aAlpha.needsUpdate = true;
    this.geometry.setDrawRange(0, this.used * 6);
    this._lo = this.capacity; this._hi = -1;
  }

  clear() {
    this.aBirth.array.fill(-1e9);
    this.aBirth.needsUpdate = true;
    this.head = 0; this.used = 0;
    this.geometry.setDrawRange(0, 0);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
