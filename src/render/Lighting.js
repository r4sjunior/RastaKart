import * as THREE from 'three';
import { CSM } from 'three/addons/csm/CSM.js';

/**
 * Key + fill + bounce, with cascaded shadow maps for the key.
 *
 * A single 400 m shadow map turns to mud; CSM splits the view frustum into
 * 2–4 slices, each with its own map, so the shadow under the kart stays crisp
 * while distant scenery still receives one. `fade` blends the cascade seams.
 *
 * Because other systems create their materials *after* this one initialises,
 * `syncMaterials()` walks the scene periodically and hooks any lit material it
 * has not seen yet. The previous `onBeforeCompile` (if a material already had
 * one) is preserved and chained.
 */

const CASCADE_MAX_FAR = 300;   // metres of shadowed range
const LIT_TYPES = new Set([
  'MeshStandardMaterial', 'MeshPhysicalMaterial',
  'MeshLambertMaterial', 'MeshPhongMaterial', 'MeshToonMaterial',
]);

export class Lighting {
  /**
   * @param {THREE.Scene} scene
   * @param {THREE.Camera} camera
   * @param {{cascades:number, shadowMapSize:number, shadows:boolean}} cfg
   */
  constructor(scene, camera, cfg) {
    this.scene = scene;
    this.camera = camera;
    this.cfg = cfg;
    this._seen = new WeakSet();
    this._sunDir = new THREE.Vector3(0, -1, 0);

    // --- ambient fill ------------------------------------------------------
    // Most of the ambient comes from the IBL (scene.environment). These two
    // lights add the directional character IBL alone cannot give cheaply:
    // a cool wrap from the sky opposite the sun, and a warm bounce off the
    // ground that lifts the underside of the kart and the wheel wells.
    this.skyFill = new THREE.DirectionalLight(0x9fd0ff, 0.55);
    this.skyFill.castShadow = false;
    this.skyFill.name = 'RK.SkyFill';
    scene.add(this.skyFill, this.skyFill.target);

    this.bounce = new THREE.DirectionalLight(0xc0a271, 0.45);
    this.bounce.castShadow = false;
    this.bounce.name = 'RK.GroundBounce';
    scene.add(this.bounce, this.bounce.target);

    // A whisper of hemisphere keeps deep crevices from going pure black even
    // when the environment map has not been baked yet.
    this.hemi = new THREE.HemisphereLight(0xbcd8ff, 0x6b7a55, 0.10);
    scene.add(this.hemi);

    if (cfg.shadows) {
      this.csm = new CSM({
        camera,
        parent: scene,
        cascades: cfg.cascades,
        maxFar: CASCADE_MAX_FAR,
        mode: 'practical',
        shadowMapSize: cfg.shadowMapSize,
        shadowBias: -0.0004,
        lightIntensity: 0,           // set per preset below
        lightNear: 1,
        lightFar: 1200,
        lightMargin: 160,
        lightDirection: new THREE.Vector3(-1, -1, -1).normalize(),
      });
      this.csm.fade = true;
      for (const l of this.csm.lights) {
        l.shadow.normalBias = 0.035;
        l.shadow.bias = -0.0004;
        l.shadow.camera.updateProjectionMatrix();
      }
      this.csm.updateFrustums();
    } else {
      // low quality: one plain directional, no shadow cascades
      this.sun = new THREE.DirectionalLight(0xffffff, 3);
      this.sun.castShadow = true;
      this.sun.shadow.mapSize.set(cfg.shadowMapSize, cfg.shadowMapSize);
      this.sun.shadow.camera.near = 1;
      this.sun.shadow.camera.far = 500;
      this.sun.shadow.bias = -0.0006;
      this.sun.shadow.normalBias = 0.05;
      const d = 60;
      Object.assign(this.sun.shadow.camera, { left: -d, right: d, top: d, bottom: -d });
      this.sun.shadow.camera.updateProjectionMatrix();
      scene.add(this.sun, this.sun.target);
    }
  }

  /** Apply a resolved time-of-day preset. */
  apply(tod) {
    // `tod.sunDir` points at the sun; light travels the other way.
    this._sunDir.copy(tod.sunDir).negate().normalize();

    if (this.csm) {
      this.csm.lightDirection.copy(this._sunDir);
      for (const l of this.csm.lights) {
        l.color.copy(tod.sunColor);
        l.intensity = tod.sunIntensity;
      }
    } else if (this.sun) {
      this.sun.color.copy(tod.sunColor);
      this.sun.intensity = tod.sunIntensity;
    }

    this.skyFill.color.copy(tod.fill.skyColor);
    this.skyFill.intensity = tod.fill.skyIntensity;
    this.bounce.color.copy(tod.fill.bounceColor);
    this.bounce.intensity = tod.fill.bounceIntensity;

    // Fill comes from roughly opposite the sun and slightly above.
    const fillDir = tod.sunDir.clone().negate();
    fillDir.y = Math.abs(fillDir.y) * 0.35 + 0.55;
    fillDir.normalize();
    this.skyFill.position.copy(fillDir).multiplyScalar(120);
    this.skyFill.target.position.set(0, 0, 0);

    // Bounce comes from below, tinted by the ground.
    this.bounce.position.set(tod.sunDir.x * 40, -60, tod.sunDir.z * 40);
    this.bounce.target.position.set(0, 0, 0);

    // update() caches the fill offsets on first use; the preset just moved them.
    this.invalidate();
  }

  /** Follow the camera so the fill lights stay relevant on a big track. */
  update(camera) {
    const p = camera.position;
    // Directional lights are position-independent for shading, but keeping the
    // rig near the camera keeps their matrices well conditioned on a big track.
    if (!this._fillCached) {
      this._fillCached = true;
      this._fillOffset = this.skyFill.position.clone();
      this._bounceOffset = this.bounce.position.clone();
    }
    this.skyFill.position.copy(p).add(this._fillOffset);
    this.skyFill.target.position.copy(p);
    this.bounce.position.copy(p).add(this._bounceOffset);
    this.bounce.target.position.copy(p);
    this.skyFill.target.updateMatrixWorld();
    this.bounce.target.updateMatrixWorld();

    if (this.csm) {
      this.csm.update();
    } else if (this.sun) {
      this.sun.position.copy(p).addScaledVector(this._sunDir, -140);
      this.sun.target.position.copy(p);
      this.sun.target.updateMatrixWorld();
    }
  }

  /** Re-cache fill offsets after a preset change. */
  invalidate() { this._fillCached = false; }

  /**
   * Hook every lit material in the scene into the CSM shader. Cheap enough to
   * run every N frames; new materials appear as other systems stream content.
   */
  syncMaterials(root) {
    if (!this.csm) return 0;
    let n = 0;
    root.traverse((o) => {
      const m = o.material;
      if (!m) return;
      const list = Array.isArray(m) ? m : [m];
      for (const mat of list) {
        if (!mat || this._seen.has(mat)) continue;
        this._seen.add(mat);
        if (!LIT_TYPES.has(mat.type)) continue;
        const prev = mat.onBeforeCompile;
        this.csm.setupMaterial(mat);
        const hook = mat.onBeforeCompile;
        if (prev && prev !== THREE.Material.prototype.onBeforeCompile) {
          mat.onBeforeCompile = function (shader, renderer) {
            hook.call(this, shader, renderer);
            prev.call(this, shader, renderer);
          };
        }
        mat.needsUpdate = true;
        n++;
      }
    });
    return n;
  }

  dispose() {
    this.csm?.remove?.();
    this.csm?.dispose?.();
  }
}
