import * as THREE from 'three';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

/**
 * Camera blur: radial/velocity motion blur and far-field depth of field in a
 * single gather.
 *
 * Both effects are "sample the neighbourhood along an offset", so they share
 * one tap loop: each tap walks along the motion vector *and* is jittered
 * inside the circle of confusion. One pass, `TAPS` fetches, instead of two
 * passes and 2·TAPS fetches.
 *
 * Deliberate gameplay constraints:
 *  - the motion vector is scaled by squared distance from the blur centre, so
 *    the kart (which sits near the centre) never smears;
 *  - the CoC is far-field only, with the focal plane pushed well past the
 *    braking distance — the track ahead must stay readable.
 */

const VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2  uCenter;
uniform float uRadial;      // motion blur strength (screen fraction)
uniform float uNear;
uniform float uFar;
uniform float uFocusStart;  // metres: everything nearer is perfectly sharp
uniform float uFocusEnd;    // metres: CoC reaches its maximum here
uniform float uDofMax;      // max CoC in screen fraction
uniform float uAspect;

const float GOLDEN = 2.39996323;

float viewDistance(float d) {
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}

void main() {
  vec3 base = texture2D(tDiffuse, vUv).rgb;

  if (uRadial < 0.0008 && uDofMax < 0.0004) {
    gl_FragColor = vec4(base, 1.0);
    return;
  }

  vec2 toC = vUv - uCenter;
  toC.x *= uAspect;
  float r2 = clamp(dot(toC, toC) * 3.0, 0.0, 1.0);
  vec2 mdir = (vUv - uCenter) * uRadial * r2;

  float d = texture2D(tDepth, vUv).x;
  float dist = viewDistance(d);
  float coc = smoothstep(uFocusStart, uFocusEnd, dist) * uDofMax;

  vec3 acc = base;
  float wsum = 1.0;

  for (int i = 0; i < TAPS; i++) {
    float fi = (float(i) + 1.0) / float(TAPS);
    float ang = float(i) * GOLDEN;
    vec2 disk = vec2(cos(ang), sin(ang)) * sqrt(fi) * coc;
    disk.x /= uAspect;
    vec2 off = mdir * (fi - 0.5) * 2.0 + disk;
    vec2 suv = clamp(vUv + off, vec2(0.0015), vec2(0.9985));
    float w = 1.0 - 0.45 * fi;
    acc += texture2D(tDiffuse, suv).rgb * w;
    wsum += w;
  }

  gl_FragColor = vec4(acc / wsum, 1.0);
}
`;

export class CameraBlurPass extends Pass {
  constructor({ taps = 10 } = {}) {
    super();
    this.material = new THREE.ShaderMaterial({
      name: 'RK.CameraBlur',
      defines: { TAPS: taps },
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        uCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uRadial: { value: 0 },
        uNear: { value: 0.1 },
        uFar: { value: 1000 },
        uFocusStart: { value: 55 },
        uFocusEnd: { value: 260 },
        uDofMax: { value: 0.0 },
        uAspect: { value: 1.777 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      depthTest: false, depthWrite: false,
    });
    this._quad = new FullScreenQuad(this.material);
  }

  setSize(w, h) { this.material.uniforms.uAspect.value = w / Math.max(1, h); }

  render(renderer, writeBuffer, readBuffer) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture;
    if (this.renderToScreen) renderer.setRenderTarget(null);
    else renderer.setRenderTarget(writeBuffer);
    this._quad.render(renderer);
  }

  dispose() { this.material.dispose(); this._quad.dispose(); }
}
