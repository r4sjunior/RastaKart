import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { Lighting } from './Lighting.js';
import { Sky } from './Sky.js';
import { makeCloudNoise } from './noise.js';
import { resolvePreset, DEFAULT_TOD, TOD_NAMES } from './TimeOfDay.js';
import { AtmospherePass } from './passes/AtmospherePass.js';
import { CameraBlurPass } from './passes/CameraBlurPass.js';
import { GradePass } from './passes/GradePass.js';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/**
 * The image pipeline.
 *
 * Scene -> HDR target -> atmosphere (AO + height fog + god rays, all reading
 * the same depth buffer) -> bloom -> camera blur (radial + DoF) -> grade
 * (split-tone, vignette, grain, speed lines, flashes) -> SMAA -> output.
 *
 * Tone mapping is AgX: it holds saturated primaries together far better than
 * ACES at this exposure, and the whole point of this art direction is that reds
 * and greens stay reds and greens instead of sliding towards orange.
 *
 * Quality tiers drop passes rather than resolution first; a dynamic resolution
 * scaler is the last resort, applied only after the frame budget is missed
 * consistently.
 */
const TIERS = {
  low:    { shadows: false, cascades: 1, shadowMapSize: 1024, ao: false, shafts: false,
            bloom: false, blur: false, smaa: false, cloudLayers: 0, aoSamples: 6, shaftSteps: 12 },
  medium: { shadows: true,  cascades: 2, shadowMapSize: 1024, ao: false, shafts: true,
            bloom: true,  blur: true,  smaa: false, cloudLayers: 1, aoSamples: 8, shaftSteps: 16 },
  high:   { shadows: true,  cascades: 3, shadowMapSize: 2048, ao: true,  shafts: true,
            bloom: true,  blur: true,  smaa: true,  cloudLayers: 2, aoSamples: 12, shaftSteps: 24 },
  ultra:  { shadows: true,  cascades: 4, shadowMapSize: 2048, ao: true,  shafts: true,
            bloom: true,  blur: true,  smaa: true,  cloudLayers: 2, aoSamples: 16, shaftSteps: 32 },
};

export class RenderSystem {
  name = 'render'; order = 0;

  #speed = 0;          // 0..1, driven by CameraSystem
  #flash = 0;
  #flashColor = new THREE.Color(1, 1, 1);
  #sunScreen = Object.assign(new THREE.Vector2(0.5, 0.5), { visibility: 0 });
  #sunWorld = new THREE.Vector3();
  #ndc = new THREE.Vector3();
  #budget = { over: 0, under: 0, scale: 1 };

  async init(ctx) {
    this.ctx = ctx;
    const tier = TIERS[ctx.quality] ?? TIERS.high;
    this.tier = tier;

    // ---------------------------------------------------------- renderer --
    const renderer = new THREE.WebGLRenderer({
      canvas: ctx.canvas,
      antialias: false,           // SMAA handles edges; MSAA cannot fix speculars
      alpha: false,
      stencil: false,
      depth: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = tier.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.info.autoReset = false;
    ctx.renderer = renderer;

    this.maxAniso = renderer.capabilities.getMaxAnisotropy();

    // ------------------------------------------------------------- sky ----
    const rng = ctx.rng.fork(0x5c1);
    this.cloudNoise = makeCloudNoise(rng, tier.cloudLayers ? 512 : 128);
    this.sky = new Sky(this.cloudNoise);
    ctx.scene.add(this.sky.mesh);

    // --------------------------------------------------------- lighting ---
    this.lighting = new Lighting(ctx.scene, ctx.camera, {
      cascades: tier.cascades,
      shadowMapSize: tier.shadowMapSize,
      shadows: tier.shadows,
    });

    // ---------------------------------------------------- time of day -----
    this.tod = null;
    this.setTimeOfDay(ctx.opts?.timeOfDay ?? DEFAULT_TOD);

    // ------------------------------------------------------------- IBL ----
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.pmrem.compileEquirectangularShader();
    this.#bakeEnvironment();

    // -------------------------------------------------------- composer ----
    const size = new THREE.Vector2();
    renderer.getSize(size);
    const w = Math.max(2, size.x), h = Math.max(2, size.y);


    // The scene is drawn into our own HDR target rather than through a
    // RenderPass. Keeping it off the composer's ping-pong buffers is what lets
    // later passes sample its depth without forming a framebuffer feedback loop.
    this.beauty = new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      colorSpace: THREE.LinearSRGBColorSpace,
      depthBuffer: true,
    });
    this.depthTex = new THREE.DepthTexture(w, h, THREE.UnsignedInt248Type);
    this.depthTex.format = THREE.DepthStencilFormat;
    this.beauty.depthTexture = this.depthTex;

    const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      colorSpace: THREE.LinearSRGBColorSpace,
    }));
    composer.setPixelRatio(1);   // the renderer already carries the DPR
    ctx.composer = composer;
    this.composer = composer;

    if (tier.ao || tier.shafts) {
      // AtmospherePass is the head of the chain: it consumes the beauty texture
      // plus its depth and writes the first composer buffer.
      this.atmosphere = new AtmospherePass(ctx.camera, {
        ao: tier.ao, aoSamples: tier.aoSamples,
        shafts: tier.shafts, shaftSteps: tier.shaftSteps,
      });
      this.atmosphere.depthTexture = this.depthTex;
      this.atmosphere.sceneTexture = this.beauty.texture;
      composer.addPass(this.atmosphere);
    } else {
      composer.addPass(new TexturePass(this.beauty.texture, 1));
    }

    if (tier.bloom) {
      this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.5, 0.55, 0.9);
      composer.addPass(this.bloom);
    }

    if (tier.blur) {
      this.blur = new CameraBlurPass({ taps: ctx.quality === 'ultra' ? 14 : 10 });
      this.blur.material.uniforms.tDepth.value = this.depthTex;
      this.blur.material.uniforms.uNear.value = ctx.camera.near;
      this.blur.material.uniforms.uFar.value = ctx.camera.far;
      composer.addPass(this.blur);
    }

    // Tone mapping + sRGB encode happen HERE, not at the end of the chain.
    // Everything downstream therefore works on display-referred 0..1 pixels:
    // SMAA's edge detector is calibrated for gamma-encoded luma and misfires on
    // linear HDR, and the grade's black point / contrast / grain only mean
    // anything once the tone curve has already been applied. With the grade
    // sitting before this pass its final `clamp(col, 0, 1)` also amputated the
    // whole highlight range before AgX ever saw it, which is why nothing in the
    // frame could reach white.
    this.output = new OutputPass();
    composer.addPass(this.output);

    if (tier.smaa) { this.smaa = new SMAAPass(); composer.addPass(this.smaa); }

    this.grade = new GradePass();
    composer.addPass(this.grade);

    this.#applyTod();

    // -------------------------------------------------------- public API --
    ctx.render = {
      /** Escape hatch for the screenshot harness' --eval probe. */
      _sys: this,
      setSpeedFactor: (v) => { this.#speed = clamp(v, 0, 1); },
      pulse: (kind, intensity = 1) => this.pulse(kind, intensity),
      setTimeOfDay: (n) => { this.setTimeOfDay(n); this.#applyTod(); this.#bakeEnvironment(); },
      timesOfDay: TOD_NAMES,
      syncMaterials: () => this.lighting.syncMaterials(ctx.scene),
      get exposure() { return renderer.toneMappingExposure; },
    };

    this.lighting.syncMaterials(ctx.scene);

    ctx.events.on('kart:boost', (e) => { if (e?.kart?.isPlayer) this.pulse('boost', 1); });
    ctx.events.on('kart:hit', (e) => { if (e?.kart?.isPlayer) this.pulse('hit', 1); });
    ctx.events.on('item:lightning', () => this.pulse('lightning', 1));

    ctx.onProgress?.(0.1, 'acendendo as luzes');
  }

  /* ------------------------------------------------------------ time of day */

  setTimeOfDay(name) {
    this.todName = TOD_NAMES.includes(name) ? name : DEFAULT_TOD;
    this.tod = resolvePreset(this.todName);
    return this.tod;
  }

  #applyTod() {
    const ctx = this.ctx;
    const tod = this.tod;
    this.lighting.apply(tod);
    this.sky.apply(tod, this.tier.cloudLayers);
    ctx.renderer.toneMappingExposure = tod.exposure;
    this.grade.applyPreset(tod.grade);
    if (this.bloom) {
      this.bloom.strength = tod.bloom.strength;
      this.bloom.threshold = tod.bloom.threshold;
      this.bloom.radius = tod.bloom.radius;
    }
    // Scene fog is handled analytically in AtmospherePass; keep the cheap
    // built-in fog only when that pass is absent, so `low` still has depth.
    ctx.scene.fog = this.atmosphere
      ? null
      : new THREE.FogExp2(tod.fog.color.getHex(), tod.fog.density * 0.55);
    this.#sunWorld.copy(tod.sunDir).multiplyScalar(2200);
  }

  /** Render the sky dome into a cube map and prefilter it for IBL. */
  #bakeEnvironment() {
    const ctx = this.ctx;
    const size = this.tier.cloudLayers ? 256 : 128;
    const cubeRT = new THREE.WebGLCubeRenderTarget(size, { type: THREE.HalfFloatType });
    const cubeCam = new THREE.CubeCamera(1, 6000, cubeRT);

    // Isolate the sky: nothing else should contribute to the ambient probe.
    const prevVisible = [];
    ctx.scene.traverse((o) => {
      if (o.isMesh && o !== this.sky.mesh) { prevVisible.push([o, o.visible]); o.visible = false; }
    });
    const prevTone = ctx.renderer.toneMapping;
    ctx.renderer.toneMapping = THREE.NoToneMapping;
    cubeCam.position.set(0, 0, 0);
    this.sky.mesh.position.set(0, 0, 0);
    cubeCam.update(ctx.renderer, ctx.scene);
    ctx.renderer.toneMapping = prevTone;
    for (const [o, v] of prevVisible) o.visible = v;

    const env = this.pmrem.fromCubemap(cubeRT.texture);
    this.envMap?.dispose?.();
    this.envMap = env.texture;
    ctx.scene.environment = this.envMap;
    ctx.scene.environmentIntensity = this.tod.envIntensity;
    cubeRT.dispose();
  }

  /* ---------------------------------------------------------------- pulses */

  pulse(kind, intensity = 1) {
    switch (kind) {
      case 'boost': this.#flash = Math.max(this.#flash, 0.30 * intensity); this.#flashColor.setRGB(0.45, 0.85, 1.0); break;
      case 'hit': this.#flash = Math.max(this.#flash, 0.55 * intensity); this.#flashColor.setRGB(1.0, 0.35, 0.25); break;
      case 'lightning': this.#flash = Math.max(this.#flash, 1.0 * intensity); this.#flashColor.setRGB(1.0, 1.0, 0.85); break;
      default: this.#flash = Math.max(this.#flash, 0.3 * intensity); this.#flashColor.setRGB(1, 1, 1);
    }
  }

  /* ---------------------------------------------------------------- frame */

  resize(w, h, ctx) {
    const dpr = ctx.viewport.dpr * this.#budget.scale;
    ctx.renderer.setPixelRatio(dpr);
    ctx.renderer.setSize(w, h, false);
    const bw = Math.max(2, Math.round(w * dpr));
    const bh = Math.max(2, Math.round(h * dpr));
    this.composer.setSize(w, h);
    this.beauty.setSize(bw, bh);
    this.atmosphere?.setSize(bw, bh);
    this.blur?.setSize(bw, bh);
    this.grade?.setSize(bw, bh);
    this.bloom?.setSize?.(bw, bh);
  }

  lateUpdate(dt, ctx) {
    // Hook newly-created materials into the CSM shader. Nothing else in the
    // game calls `ctx.render.syncMaterials()`, and a material that misses the
    // hook does not merely lose its cascade selection: it falls into the
    // stock directional-light loop and accumulates *every* cascade light at
    // full intensity. Three cascades meant a 3x sun, which blew the whole
    // frame past the clamp and is the root cause of the flat, milky image.
    if ((ctx.time.frame & 15) === 0) this.lighting.syncMaterials(ctx.scene);

    this.sky.setTime(ctx.time.t);
    this.sky.follow(ctx.camera);
    this.lighting.update(ctx.camera);

    // sun position in screen space, for god rays and lens response
    this.#ndc.copy(ctx.camera.position).add(this.#sunWorld).project(ctx.camera);
    const behind = this.#ndc.z > 1;
    this.#sunScreen.set((this.#ndc.x + 1) * 0.5, (this.#ndc.y + 1) * 0.5);
    // fade the shafts out as the sun leaves the frame
    const sx = this.#sunScreen.x, sy = this.#sunScreen.y;
    const edge = Math.max(Math.abs(sx - 0.5), Math.abs(sy - 0.5));
    this.#sunScreen.visibility = behind ? 0 : clamp(1 - (edge - 0.45) / 0.35, 0, 1);
    const shaft = behind ? 0 : this.tod.godRays;

    if (this.atmosphere) this.atmosphere.sync(ctx.camera, this.tod, this.#sunScreen, shaft);

    if (this.blur) {
      const u = this.blur.material.uniforms;
      // radial blur tracks speed; DoF stays gentle so the road ahead reads
      u.uRadial.value = Math.pow(this.#speed, 1.6) * 0.021;
      u.uDofMax.value = 0.0026;
      u.uFocusStart.value = 42;
      u.uFocusEnd.value = 210;
      u.uCenter.value.set(0.5, 0.5);
      u.uNear.value = ctx.camera.near;
      u.uFar.value = ctx.camera.far;
    }

    const gu = this.grade.material.uniforms;
    gu.uTime.value = ctx.time.t;
    // Speed lines are a boost effect, not a "you reached top speed" effect:
    // CameraSystem only pushes past ~0.85 while a boost is actually running, so
    // normal flat-out driving leaves the frame clean.
    gu.uSpeedLines.value = Math.max(0, this.#speed - 0.86) * 1.6;
    this.#flash = Math.max(0, this.#flash - dt * 2.6);
    gu.uFlash.value = this.#flash;
    gu.uFlashColor.value.copy(this.#flashColor);
  }

  render(alpha, ctx) {
    const r = ctx.renderer;
    r.info.reset();

    r.setRenderTarget(this.beauty);
    r.clear();
    r.render(ctx.scene, ctx.camera);
    r.setRenderTarget(null);

    this.composer.render();
    this.#budgetCheck(r);
  }

  /** Dynamic resolution: only after the budget is missed repeatedly. */
  #budgetCheck() {
    const b = this.#budget;
    const ms = performance.now() - (this._lastFrameStart ?? performance.now());
    this._lastFrameStart = performance.now();
    if (ms > 20) { b.over++; b.under = 0; } else if (ms < 12) { b.under++; b.over = 0; }
    if (b.over > 90 && b.scale > 0.65) { b.scale -= 0.1; b.over = 0; this.ctx.game.resize(); }
    else if (b.under > 240 && b.scale < 1) { b.scale = Math.min(1, b.scale + 0.1); b.under = 0; this.ctx.game.resize(); }
  }

  dispose() {
    this.lighting?.dispose?.();
    this.sky?.dispose?.();
    this.atmosphere?.dispose?.();
    this.blur?.dispose?.();
    this.grade?.dispose?.();
    this.bloom?.dispose?.();
    this.beauty?.dispose?.();
    this.depthTex?.dispose?.();
    this.pmrem?.dispose?.();
    this.composer?.dispose?.();
    this.ctx?.renderer?.dispose?.();
  }
}
