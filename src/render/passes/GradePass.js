import * as THREE from 'three';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

/**
 * Final look pass. **Display space** — it runs after OutputPass (tone mapping +
 * sRGB encode) and after SMAA, so every number below is a 0..1 display value
 * and behaves the way a colourist expects.
 *
 * That placement is load bearing. When this pass ran before OutputPass it was
 * operating on linear HDR: the `clamp(col, 0, 1)` at the end amputated every
 * value above 1.0 *before* the tone curve, so no pixel could ever reach display
 * white (AgX(1.0) lands near 0.83) and the shadow lift, meant as a hint, became
 * a ~0.12 milky floor once encoded. The image had neither black nor highlight.
 *
 * Order now: black point -> S-curve -> split tone -> vibrance -> speed lines ->
 * flash -> vignette -> grain -> aberration. All subtle by default; the grade is
 * what makes the image snap, and if you can name the effect while playing it is
 * too strong.
 */

const VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform float uAberration;
uniform float uVignette;
uniform float uGrain;
uniform float uTime;
uniform float uSaturation;
uniform float uContrast;
uniform float uSCurve;
uniform float uBlackPoint;
uniform float uWhitePoint;
uniform float uLift;
uniform vec3  uShadowTint;
uniform vec3  uHighlightTint;
uniform float uTintAmount;
uniform float uSpeedLines;
uniform vec3  uFlashColor;
uniform float uFlash;
uniform float uAspect;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

void main() {
  vec2 c = vUv - 0.5;
  vec2 ca = c;
  ca.x *= uAspect;
  float r2 = dot(ca, ca);

  // ---- chromatic aberration: lateral only, grows with r^2 -------------------
  vec3 col;
  if (uAberration > 0.00002) {
    vec2 off = c * r2 * uAberration;
    col.r = texture2D(tDiffuse, clamp(vUv + off, 0.0005, 0.9995)).r;
    col.g = texture2D(tDiffuse, vUv).g;
    col.b = texture2D(tDiffuse, clamp(vUv - off, 0.0005, 0.9995)).b;
  } else {
    col = texture2D(tDiffuse, vUv).rgb;
  }
  col = max(col, 0.0);

  // ---- black / white point -------------------------------------------------
  // The single most important line in the file. Tone mapping leaves the darkest
  // pixel well above zero; remapping [bp, wp] onto [0, 1] is what puts real
  // black back on the screen and lets a highlight actually reach paper white.
  col = (col - uBlackPoint) / max(uWhitePoint - uBlackPoint, 1e-3);
  col = clamp(col, 0.0, 1.0);

  // ---- tonal shaping -------------------------------------------------------
  // A smoothstep S-curve: it pins 0 and 1, so it deepens shadows and brightens
  // highlights without ever clipping either end into a flat plate.
  col = mix(col, col * col * (3.0 - 2.0 * col), uSCurve);

  // Linear contrast around a pivot below mid grey, so the road (which occupies
  // the lower midtones) gets pushed down rather than up.
  const float PIVOT = 0.44;
  col = clamp((col - PIVOT) * uContrast + PIVOT, 0.0, 1.0);

  // A whisper of lift back into the deepest shadows: Nintendo shadows carry hue
  // rather than going to dead zero. Applied *after* the crush so it is a hue
  // carrier, not a haze.
  col += uLift * (1.0 - smoothstep(0.0, 0.28, luma(col)));

  // ---- split tone: cool shadows, warm highlights ---------------------------
  float l = luma(col);
  vec3 tint = mix(uShadowTint, uHighlightTint, smoothstep(0.14, 0.80, l));
  col = mix(col, col * tint * 2.0, uTintAmount * 0.5);

  // ---- vibrance: push unsaturated pixels harder than saturated ones ---------
  float mx = max(col.r, max(col.g, col.b));
  float mn = min(col.r, min(col.g, col.b));
  float sat = mx - mn;
  float amount = (uSaturation - 1.0) * (1.0 - sat * 0.6);
  col = mix(vec3(luma(col)), col, 1.0 + amount);

  // ---- boost speed lines ---------------------------------------------------
  if (uSpeedLines > 0.001) {
    float ang = atan(ca.y, ca.x);
    float rr = sqrt(r2);
    // The angle has to be quantised into wedges before it is hashed. Sampling
    // the hash with a continuous angle gives every pixel its own value, which
    // reads as white speckle over the whole frame rather than radial streaks.
    float band = floor(rr * 2.6);
    float wedge = floor(ang * 44.0);
    float n = hash21(vec2(wedge, band * 7.0));
    float lines = smoothstep(0.86, 0.995, n) * smoothstep(0.30, 0.78, rr);
    col += lines * uSpeedLines * vec3(1.0, 0.97, 0.90);
  }

  // ---- impact flash --------------------------------------------------------
  col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));

  // ---- vignette ------------------------------------------------------------
  col *= 1.0 - uVignette * smoothstep(0.10, 0.62, r2);

  // ---- grain ---------------------------------------------------------------
  // Display space, and rolled off in the highlights: in linear space this same
  // amplitude turned into visible dirt all over the road after tone mapping.
  if (uGrain > 0.0001) {
    float g = hash21(vUv * 1024.0 + fract(uTime) * 91.7) - 0.5;
    col += g * uGrain * (1.0 - 0.7 * smoothstep(0.5, 1.0, luma(col)));
  }

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export class GradePass extends Pass {
  constructor() {
    super();
    this.material = new THREE.ShaderMaterial({
      name: 'RK.Grade',
      uniforms: {
        tDiffuse: { value: null },
        uAberration: { value: 0.0016 },
        uVignette: { value: 0.26 },
        uGrain: { value: 0.008 },
        uTime: { value: 0 },
        uSaturation: { value: 1.20 },
        uContrast: { value: 1.10 },
        uSCurve: { value: 0.30 },
        uBlackPoint: { value: 0.045 },
        uWhitePoint: { value: 0.94 },
        uLift: { value: 0.010 },
        uShadowTint: { value: new THREE.Color(0.44, 0.48, 0.60) },
        uHighlightTint: { value: new THREE.Color(0.56, 0.52, 0.44) },
        uTintAmount: { value: 0.22 },
        uSpeedLines: { value: 0 },
        uFlashColor: { value: new THREE.Color(1, 1, 1) },
        uFlash: { value: 0 },
        uAspect: { value: 1.777 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      depthTest: false, depthWrite: false,
    });
    this._quad = new FullScreenQuad(this.material);
  }

  /**
   * Split-tone colours are authored as sRGB hexes but used as multipliers, so
   * they are normalised around 0.5 grey: a tint of pure white must not change
   * the image.
   */
  applyPreset(grade) {
    const u = this.material.uniforms;
    u.uSaturation.value = grade.saturation;
    u.uContrast.value = grade.contrast;
    u.uSCurve.value = grade.sCurve ?? 0.30;
    u.uBlackPoint.value = grade.blackPoint ?? 0.045;
    u.uWhitePoint.value = grade.whitePoint ?? 0.94;
    u.uLift.value = grade.lift;
    u.uTintAmount.value = grade.tintAmount;
    if (grade.vignette !== undefined) u.uVignette.value = grade.vignette;
    if (grade.grain !== undefined) u.uGrain.value = grade.grain;
    const norm = (src, dst) => {
      const m = Math.max(src.r, src.g, src.b) || 1;
      dst.setRGB(src.r / m * 0.5, src.g / m * 0.5, src.b / m * 0.5);
    };
    norm(grade.shadowTint, u.uShadowTint.value);
    norm(grade.highlightTint, u.uHighlightTint.value);
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
