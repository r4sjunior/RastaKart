import * as THREE from 'three';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

/**
 * Atmosphere + ambient occlusion + light shafts, fused into one pass.
 *
 * Fusing matters: the screenshot harness runs on SwiftShader, and every extra
 * full-screen pass costs another 1.4 M dependent texture fetches. Here the
 * depth buffer is decoded once and reused for AO, for the height-fog world
 * position, and for the god-ray occlusion test.
 *
 * Internally there are up to three draws:
 *   1. AO      at 1/2 resolution (depth-only, normals reconstructed from ddx/ddy)
 *   2. Shafts  at 1/4 resolution (radial accumulation of sky-only luminance)
 *   3. Composite at full resolution
 *
 * This pass is the FIRST in the chain: it reads an explicit HDR scene target
 * rather than the composer read buffer, so the composer's own buffers never
 * need a depth attachment (avoiding a read/write feedback loop on the depth
 * texture).
 */

const QUAD_VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const DEPTH_HELPERS = /* glsl */`
uniform mat4 uProjInv;
uniform mat4 uViewInv;
uniform float uNear;
uniform float uFar;

vec3 viewPosFromDepth(vec2 uv, float d) {
  vec4 ndc = vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec4 v = uProjInv * ndc;
  return v.xyz / v.w;
}
vec3 worldPosFromDepth(vec2 uv, float d) {
  return (uViewInv * vec4(viewPosFromDepth(uv, d), 1.0)).xyz;
}
`;

const AO_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D tDepth;
uniform mat4 uProj;
uniform vec2 uRes;
uniform float uRadius;
uniform float uBias;
uniform float uIntensity;
uniform float uPower;
${DEPTH_HELPERS}

const float GOLDEN = 2.39996323;

float ign(vec2 p) {
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

void main() {
  float d = texture2D(tDepth, vUv).x;
  if (d >= 0.99995) { gl_FragColor = vec4(1.0); return; }

  vec3 P = viewPosFromDepth(vUv, d);
  vec3 N = normalize(cross(dFdx(P), dFdy(P)));
  if (dot(N, normalize(-P)) < 0.0) N = -N;

  float rot = ign(gl_FragCoord.xy) * 6.2831853;

  // Two nested radii out of one tap loop. The wide ring gives the broad ambient
  // darkening; the tight ring (a quarter of the radius) is what actually reads
  // as a *contact* shadow where a tyre meets tarmac, and it is the term that was
  // missing -- one radius sized for room-scale occlusion cannot resolve a 4 cm
  // gap. The tight ring is weighted higher because contact is what grounds the
  // object.
  float occW = 0.0, occT = 0.0;
  float nW = 0.0, nT = 0.0;

  for (int i = 0; i < AO_SAMPLES; i++) {
    float fi = (float(i) + 0.5) / float(AO_SAMPLES);
    float ang = rot + float(i) * GOLDEN;
    bool tight = (i - (i / 2) * 2) == 1;
    float R = tight ? uRadius * 0.25 : uRadius;
    float rad = sqrt(fi) * R;
    vec3 S = P + vec3(cos(ang), sin(ang), 0.0) * rad + N * R * 0.06;

    vec4 clip = uProj * vec4(S, 1.0);
    vec2 suv = clip.xy / clip.w * 0.5 + 0.5;
    if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) continue;

    float sd = texture2D(tDepth, suv).x;
    if (sd >= 0.99995) continue;
    vec3 Ps = viewPosFromDepth(suv, sd);

    vec3 v = Ps - P;
    float len = length(v);
    if (len < 1e-4) continue;
    float range = clamp(R / len, 0.0, 1.0);
    float o = max(0.0, dot(N, v / len) - uBias) * range * range;
    if (tight) { occT += o; nT += 1.0; } else { occW += o; nW += 1.0; }
  }

  float occ = occW / max(nW, 1.0) * 0.65 + occT / max(nT, 1.0) * 1.35;
  float ao = clamp(1.0 - occ * uIntensity, 0.0, 1.0);
  ao = pow(ao, uPower);

  // Fade AO out with distance: past ~60 m the half-res depth cannot resolve the
  // geometry any more and the term degenerates into shimmering noise.
  float vd = -P.z;
  ao = mix(ao, 1.0, smoothstep(45.0, 90.0, vd));

  gl_FragColor = vec4(ao, ao, ao, 1.0);
}
`;

const SHAFT_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 uSunUv;
uniform float uDensity;
uniform float uDecay;

void main() {
  vec2 delta = (vUv - uSunUv) * (uDensity / float(SHAFT_STEPS));
  vec2 p = vUv;
  vec3 acc = vec3(0.0);
  float illum = 1.0;
  for (int i = 0; i < SHAFT_STEPS; i++) {
    p -= delta;
    vec2 cp = clamp(p, vec2(0.0), vec2(1.0));
    float d = texture2D(tDepth, cp).x;
    float sky = step(0.99995, d);
    acc += texture2D(tDiffuse, cp).rgb * sky * illum;
    illum *= uDecay;
  }
  gl_FragColor = vec4(acc / float(SHAFT_STEPS), 1.0);
}
`;

const COMPOSITE_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform sampler2D tAo;
uniform sampler2D tShaft;
uniform vec2 uAoTexel;
uniform float uAoStrength;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform vec3 uFogColor;
uniform vec3 uFogSunColor;
uniform float uFogDensity;
uniform float uFogFalloff;
uniform float uFogGroundY;
uniform float uFogStart;
uniform float uFogMax;
uniform float uShaftIntensity;
uniform vec3 uShaftTint;
uniform float uSunOnScreen;
${DEPTH_HELPERS}

/**
 * Analytic integral of an exponentially height-decaying medium along a ray.
 * (Inigo Quilez's formulation.) Far geometry therefore picks up the sky colour
 * gradually instead of stepping into a grey wall like FogExp2 does.
 */
float heightFog(vec3 ro, vec3 rd, float t) {
  float b = uFogFalloff;
  float h = ro.y - uFogGroundY;
  float denom = b * rd.y;
  float amount;
  if (abs(denom) < 1e-4) {
    amount = uFogDensity * exp(-b * h) * t;
  } else {
    amount = (uFogDensity / denom) * exp(-b * h) * (1.0 - exp(-denom * t));
  }
  return 1.0 - exp(-max(amount, 0.0));
}

void main() {
  vec3 col = texture2D(tDiffuse, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  bool isSky = d >= 0.99995;

  #ifdef USE_AO
  if (!isSky) {
    vec2 t = uAoTexel;
    float ao =
      texture2D(tAo, vUv + vec2(-0.5, -0.5) * t).r +
      texture2D(tAo, vUv + vec2( 0.5, -0.5) * t).r +
      texture2D(tAo, vUv + vec2(-0.5,  0.5) * t).r +
      texture2D(tAo, vUv + vec2( 0.5,  0.5) * t).r;
    ao *= 0.25;
    col *= mix(1.0, ao, uAoStrength);
  }
  #endif

  if (!isSky) {
    vec3 wp = worldPosFromDepth(vUv, d);
    vec3 rd = wp - uCamPos;
    float dist = length(rd);
    rd /= max(dist, 1e-4);
    // Nothing inside uFogStart is fogged at all. Aerial perspective that starts
    // at the bumper is what turned the mid-field into milk; a hard clear zone
    // keeps the 0-80 m band -- the band the player actually reads -- crisp.
    float t = max(dist - uFogStart, 0.0);
    float f = heightFog(uCamPos, rd, t);
    // ...and it never fully dissolves the far field either, so distant scenery
    // keeps a silhouette instead of becoming a flat plate of sky colour.
    f = clamp(f, 0.0, 1.0) * uFogMax;
    float su = max(dot(rd, uSunDir), 0.0);
    vec3 fc = mix(uFogColor, uFogSunColor, pow(su, 5.0));
    col = mix(col, fc, f);
  }

  #ifdef USE_SHAFTS
  col += texture2D(tShaft, vUv).rgb * uShaftTint * (uShaftIntensity * uSunOnScreen);
  #endif

  gl_FragColor = vec4(col, 1.0);
}
`;

export class AtmospherePass extends Pass {
  /**
   * @param {THREE.Camera} camera
   * @param {{ao:boolean, aoSamples:number, shafts:boolean, shaftSteps:number}} cfg
   */
  constructor(camera, cfg) {
    super();
    this.camera = camera;
    this.cfg = { ao: true, aoSamples: 12, shafts: true, shaftSteps: 24, ...cfg };
    this.needsSwap = true;

    /** Source of the lit HDR frame + its depth. Set by RenderSystem. */
    this.sceneTexture = null;
    this.depthTexture = null;

    this._size = new THREE.Vector2(1, 1);

    const rtOpts = { type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false };
    this.aoRT = new THREE.WebGLRenderTarget(1, 1, rtOpts);
    this.aoRT.texture.name = 'RK.AO';
    this.shaftRT = new THREE.WebGLRenderTarget(1, 1, rtOpts);
    this.shaftRT.texture.name = 'RK.Shafts';

    this.aoMaterial = new THREE.ShaderMaterial({
      name: 'RK.AO',
      defines: { AO_SAMPLES: this.cfg.aoSamples },
      uniforms: {
        tDepth: { value: null },
        uProj: { value: new THREE.Matrix4() },
        uProjInv: { value: new THREE.Matrix4() },
        uViewInv: { value: new THREE.Matrix4() },
        uNear: { value: 0.1 }, uFar: { value: 1000 },
        uRes: { value: new THREE.Vector2() },
        uRadius: { value: 1.5 },
        uBias: { value: 0.02 },
        uIntensity: { value: 1.35 },
        uPower: { value: 1.6 },
      },
      vertexShader: QUAD_VERT,
      fragmentShader: AO_FRAG,
      depthTest: false, depthWrite: false,
    });

    this.shaftMaterial = new THREE.ShaderMaterial({
      name: 'RK.Shafts',
      defines: { SHAFT_STEPS: this.cfg.shaftSteps },
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        uSunUv: { value: new THREE.Vector2(0.5, 0.5) },
        uDensity: { value: 0.9 },
        uDecay: { value: 0.955 },
      },
      vertexShader: QUAD_VERT,
      fragmentShader: SHAFT_FRAG,
      depthTest: false, depthWrite: false,
    });

    this.compositeMaterial = new THREE.ShaderMaterial({
      name: 'RK.Atmosphere',
      defines: {},
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        tAo: { value: this.aoRT.texture },
        tShaft: { value: this.shaftRT.texture },
        uAoTexel: { value: new THREE.Vector2() },
        uAoStrength: { value: 0.95 },
        uProjInv: { value: new THREE.Matrix4() },
        uViewInv: { value: new THREE.Matrix4() },
        uNear: { value: 0.1 }, uFar: { value: 1000 },
        uCamPos: { value: new THREE.Vector3() },
        uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uFogColor: { value: new THREE.Color(0xa9c9e6) },
        uFogSunColor: { value: new THREE.Color(0xffd39a) },
        uFogDensity: { value: 0.009 },
        uFogFalloff: { value: 0.026 },
        uFogGroundY: { value: -2 },
        uFogStart: { value: 90 },
        uFogMax: { value: 0.82 },
        uShaftIntensity: { value: 0.7 },
        uShaftTint: { value: new THREE.Color(0xffe0b0) },
        uSunOnScreen: { value: 0 },
      },
      vertexShader: QUAD_VERT,
      fragmentShader: COMPOSITE_FRAG,
      depthTest: false, depthWrite: false,
    });

    this._quad = new FullScreenQuad(this.compositeMaterial);
    this._applyDefines();
  }

  _applyDefines() {
    const d = this.compositeMaterial.defines;
    delete d.USE_AO; delete d.USE_SHAFTS;
    if (this.cfg.ao) d.USE_AO = '';
    if (this.cfg.shafts) d.USE_SHAFTS = '';
    this.compositeMaterial.needsUpdate = true;
  }

  setEnabledEffects({ ao, shafts }) {
    if (ao !== undefined) this.cfg.ao = ao;
    if (shafts !== undefined) this.cfg.shafts = shafts;
    this._applyDefines();
  }

  setSize(width, height) {
    this._size.set(width, height);
    this.aoRT.setSize(Math.max(1, Math.floor(width / 2)), Math.max(1, Math.floor(height / 2)));
    this.shaftRT.setSize(Math.max(1, Math.floor(width / 4)), Math.max(1, Math.floor(height / 4)));
    this.aoMaterial.uniforms.uRes.value.set(this.aoRT.width, this.aoRT.height);
    this.compositeMaterial.uniforms.uAoTexel.value.set(1 / this.aoRT.width, 1 / this.aoRT.height);
  }

  /** Push per-frame camera + preset state. */
  sync(camera, tod, sunScreen, shaftIntensity) {
    const cu = this.compositeMaterial.uniforms;
    const au = this.aoMaterial.uniforms;

    camera.updateMatrixWorld();
    const projInv = camera.projectionMatrixInverse;
    for (const u of [cu, au]) {
      u.uProjInv.value.copy(projInv);
      u.uViewInv.value.copy(camera.matrixWorld);
      u.uNear.value = camera.near;
      u.uFar.value = camera.far;
    }
    au.uProj.value.copy(camera.projectionMatrix);

    cu.uCamPos.value.copy(camera.position);
    cu.uSunDir.value.copy(tod.sunDir);
    cu.uFogColor.value.copy(tod.fog.color);
    cu.uFogSunColor.value.copy(tod.fog.sunColor);
    cu.uFogDensity.value = tod.fog.density;
    cu.uFogFalloff.value = tod.fog.falloff;
    cu.uFogGroundY.value = tod.fog.groundY;
    cu.uFogStart.value = tod.fog.start;
    cu.uFogMax.value = tod.fog.max;
    cu.uShaftTint.value.copy(tod.sunColor);
    cu.uShaftIntensity.value = shaftIntensity;
    cu.uSunOnScreen.value = sunScreen.visibility;
    this.shaftMaterial.uniforms.uSunUv.value.set(sunScreen.x, sunScreen.y);
  }

  render(renderer, writeBuffer /*, readBuffer */) {
    const src = this.sceneTexture;
    const depth = this.depthTexture;

    if (this.cfg.ao) {
      this.aoMaterial.uniforms.tDepth.value = depth;
      this._quad.material = this.aoMaterial;
      renderer.setRenderTarget(this.aoRT);
      renderer.clear();
      this._quad.render(renderer);
    }

    if (this.cfg.shafts && this.compositeMaterial.uniforms.uSunOnScreen.value > 0.001) {
      this.shaftMaterial.uniforms.tDiffuse.value = src;
      this.shaftMaterial.uniforms.tDepth.value = depth;
      this._quad.material = this.shaftMaterial;
      renderer.setRenderTarget(this.shaftRT);
      renderer.clear();
      this._quad.render(renderer);
    }
    // When the sun is off screen the composite multiplies the shaft buffer by
    // zero, so leaving stale content in it costs nothing and saves a clear.

    this.compositeMaterial.uniforms.tDiffuse.value = src;
    this.compositeMaterial.uniforms.tDepth.value = depth;
    this._quad.material = this.compositeMaterial;

    if (this.renderToScreen) renderer.setRenderTarget(null);
    else renderer.setRenderTarget(writeBuffer);
    this._quad.render(renderer);
  }

  dispose() {
    this.aoRT.dispose();
    this.shaftRT.dispose();
    this.aoMaterial.dispose();
    this.shaftMaterial.dispose();
    this.compositeMaterial.dispose();
    this._quad.dispose();
  }
}
