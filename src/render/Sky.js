import * as THREE from 'three';

/**
 * Procedural sky dome.
 *
 * A single draw call that produces: a three-stop vertical gradient, Mie-style
 * glow around the sun, a hard sun disc, a horizon haze band, two scrolling
 * cloud decks (cumulus + cirrus) with directional shading and a silver lining,
 * and a ground half below the horizon.
 *
 * The same material is instanced into a tiny off-screen scene so that
 * `PMREMGenerator.fromScene()` can turn it into the scene environment map —
 * meaning the IBL and the visible sky can never drift apart.
 */

const VERT = /* glsl */`
varying vec3 vDir;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vDir = wp.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const FRAG = /* glsl */`
precision highp float;

uniform vec3  uSunDir;
uniform vec3  uSunColor;
uniform float uSunDisc;
uniform float uSunDiscSize;
uniform float uSunHalo;

uniform vec3  uZenith;
uniform vec3  uMid;
uniform vec3  uHorizon;
uniform vec3  uGround;
uniform float uGradExp;
uniform float uHaze;

uniform sampler2D uNoise;
uniform float uTime;
uniform float uCloudCover;
uniform float uCloudScale;
uniform float uCloudSpeed;
uniform float uCloudOpacity;
uniform float uCirrus;
uniform vec3  uCloudLit;
uniform vec3  uCloudDark;
uniform float uCloudLayers;   // 0 = none, 1 = cumulus only, 2 = cumulus + cirrus

varying vec3 vDir;

float density(vec2 uv, vec2 w) {
  vec4 n0 = texture2D(uNoise, uv + w);
  vec4 n1 = texture2D(uNoise, uv * 2.61 + vec2(0.317, 0.719) + w * 1.9);
  // G = coverage band, R = mid band, B = erosion band
  float d = n0.g * 0.58 + n0.r * 0.26 + n1.b * 0.16;
  // weather cells break the deck up into islands instead of a uniform mush
  d *= 0.62 + 0.62 * n0.a;
  return d;
}

void main() {
  vec3 dir = normalize(vDir);
  float y = dir.y;
  float cosT = dot(dir, uSunDir);

  // ---- base gradient -------------------------------------------------------
  float a = pow(clamp(1.0 - max(y, 0.0), 0.0, 1.0), uGradExp);
  vec3 col = mix(uZenith, uMid, smoothstep(0.00, 0.62, a));
  col = mix(col, uHorizon, smoothstep(0.66, 1.00, a));

  // ---- atmospheric glow around the sun ------------------------------------
  float m0 = pow(max(cosT, 0.0), 6.0);
  float m1 = pow(max(cosT, 0.0), 48.0);
  float m2 = pow(max(cosT, 0.0), 900.0);
  col += uSunColor * (m0 * 0.085 + m1 * 0.30 + m2 * 0.85) * uSunHalo;

  // horizon haze band: thickens the join between sky and land
  col = mix(col, uHorizon, exp(-abs(y) * 11.0) * uHaze * 0.42);

  // ---- sun disc ------------------------------------------------------------
  float ang = acos(clamp(cosT, -1.0, 1.0));
  float disc = 1.0 - smoothstep(uSunDiscSize * 0.78, uSunDiscSize * 1.22, ang);
  col += uSunColor * disc * uSunDisc;

  // ---- cloud decks ---------------------------------------------------------
  if (uCloudLayers > 0.5 && y > 0.004) {
    vec2 plane = dir.xz / max(y, 0.045);
    float t = uTime * uCloudSpeed;

    // cumulus deck
    vec2 uv = plane * uCloudScale * 0.055;
    vec2 wind = vec2(t * 0.0022, t * 0.0011);
    float d = density(uv, wind);
    float cov = smoothstep(uCloudCover, uCloudCover + 0.20, d);

    if (cov > 0.001) {
      // fake self-shadowing: compare density against density a step toward the sun
      vec2 sunStep = normalize(uSunDir.xz + vec2(1e-4, 1e-4)) * 0.030;
      float dl = density(uv - sunStep, wind);
      float lit = clamp((d - dl) * 7.0 + 0.52, 0.0, 1.0);
      lit = mix(lit, 1.0, 0.22);

      vec3 cc = mix(uCloudDark, uCloudLit, lit);
      // silver lining where the deck thins out in front of the sun
      float rim = pow(max(cosT, 0.0), 9.0) * (1.0 - cov) * 1.6;
      cc += uSunColor * rim * 0.9;
      cc += uSunColor * pow(max(cosT, 0.0), 2.0) * 0.06;

      float fade = smoothstep(0.006, 0.14, y);
      col = mix(col, cc, cov * fade * uCloudOpacity);
    }

    // cirrus deck: higher, thinner, faster, stretched
    if (uCloudLayers > 1.5 && uCirrus > 0.001) {
      vec2 uv2 = plane * vec2(0.020, 0.055) * uCloudScale + vec2(t * 0.0009, 0.0);
      vec4 n = texture2D(uNoise, uv2);
      float c2 = smoothstep(0.52, 0.86, n.r * 0.6 + n.b * 0.4);
      float fade2 = smoothstep(0.02, 0.30, y);
      vec3 cirCol = mix(uCloudLit, uSunColor, pow(max(cosT, 0.0), 5.0) * 0.6);
      col = mix(col, cirCol, c2 * fade2 * uCirrus * 0.55);
    }
  }

  // ---- below the horizon ---------------------------------------------------
  col = mix(col, uGround, smoothstep(-0.005, -0.10, y));

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

export class Sky {
  /**
   * @param {THREE.Texture} noiseTex baked cloud noise
   */
  constructor(noiseTex) {
    this.uniforms = {
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uSunColor: { value: new THREE.Color(1, 1, 1) },
      uSunDisc: { value: 30 },
      uSunDiscSize: { value: 0.026 },
      uSunHalo: { value: 1 },
      uZenith: { value: new THREE.Color(0x1a5aa8) },
      uMid: { value: new THREE.Color(0x71a8d8) },
      uHorizon: { value: new THREE.Color(0xffd6a0) },
      uGround: { value: new THREE.Color(0x6b6a58) },
      uGradExp: { value: 1.3 },
      uHaze: { value: 0.7 },
      uNoise: { value: noiseTex },
      uTime: { value: 0 },
      uCloudCover: { value: 0.46 },
      uCloudScale: { value: 0.62 },
      uCloudSpeed: { value: 1 },
      uCloudOpacity: { value: 0.97 },
      uCirrus: { value: 0.42 },
      uCloudLit: { value: new THREE.Color(0xfff0d8) },
      uCloudDark: { value: new THREE.Color(0x7f88a8) },
      uCloudLayers: { value: 2 },
    };

    this.material = new THREE.ShaderMaterial({
      name: 'RK.Sky',
      uniforms: this.uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: false,
      fog: false,
    });

    // Visible dome. depthTest:false + renderOrder -1000 makes it a background
    // fill that still leaves the depth buffer at "far" for the sky pixels,
    // which is exactly what the god-ray and fog passes key off.
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(3000, 48, 24), this.material);
    this.mesh.renderOrder = -1000;
    this.mesh.frustumCulled = false;
    this.mesh.name = 'RK.SkyDome';

    // Off-screen twin used to bake the environment map.
    this.envMaterial = this.material.clone();
    this.envMaterial.uniforms = this.uniforms;      // share, so it never drifts
    this.envMaterial.depthTest = true;
    this.envMaterial.depthWrite = true;
    this.envScene = new THREE.Scene();
    this.envMesh = new THREE.Mesh(new THREE.SphereGeometry(80, 40, 24), this.envMaterial);
    this.envMesh.frustumCulled = false;
    this.envScene.add(this.envMesh);
  }

  /** Apply a resolved time-of-day preset. */
  apply(tod, cloudLayers = 2) {
    const u = this.uniforms;
    u.uSunDir.value.copy(tod.sunDir);
    u.uSunColor.value.copy(tod.sunColor);
    u.uSunDisc.value = tod.sky.sunDisc;
    u.uSunDiscSize.value = tod.sunDiscSize;
    u.uSunHalo.value = tod.sky.sunHalo;
    u.uZenith.value.copy(tod.sky.zenith);
    u.uMid.value.copy(tod.sky.mid);
    u.uHorizon.value.copy(tod.sky.horizon);
    u.uGround.value.copy(tod.sky.ground);
    u.uGradExp.value = tod.sky.gradExp;
    u.uHaze.value = tod.sky.haze;
    u.uCloudCover.value = tod.sky.cloudCover;
    u.uCloudScale.value = tod.sky.cloudScale;
    u.uCloudSpeed.value = tod.sky.cloudSpeed;
    u.uCloudOpacity.value = tod.sky.cloudOpacity;
    u.uCirrus.value = tod.sky.cirrus;
    u.uCloudLit.value.copy(tod.sky.cloudLit);
    u.uCloudDark.value.copy(tod.sky.cloudDark);
    u.uCloudLayers.value = cloudLayers;
  }

  setTime(t) { this.uniforms.uTime.value = t; }

  follow(camera) { this.mesh.position.copy(camera.position); }

  dispose() {
    this.mesh.geometry.dispose();
    this.envMesh.geometry.dispose();
    this.material.dispose();
    this.envMaterial.dispose();
  }
}
