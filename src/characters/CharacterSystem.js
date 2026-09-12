import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as skeletonClone } from 'three/addons/utils/SkeletonUtils.js';
import { KartModel, LIVERIES } from './KartModel.js';

/**
 * Driver + kart visuals.
 *
 * The driver is the authored voxel character (ME002), parsed out of VoxEdit by
 * `tools/build-character.mjs` into a skinned GLB plus a rig manifest of poses
 * lifted from the original .vxa clips.
 *
 * The .vxa `sit` clip is a chair-idle, not a driving pose: its arms swing out
 * to the sides and its hands end up in mid air, which is why the driver used to
 * read as perched rather than seated. So the seated body here is authored
 * directly — hips on the pan, thighs forward, knees up — and the arms are then
 * solved with two-bone IK onto two grips that live on the steering wheel and
 * turn with it. That single change is what makes the pose read as "driving":
 * the hands are on the wheel by construction, at any steering angle, for every
 * kart on the grid.
 *
 * The .vxa poses are still used, but for reactions: hit, cheer, victory, sad
 * blend in over the driving pose and fade back out.
 *
 * Layered on top: the torso leans into a drift, the head looks into the corner,
 * and the beanie and three dreadlocks run on spring chains driven by the kart's
 * own acceleration. That secondary motion is most of what separates "a model
 * sitting on a kart" from "someone driving".
 */

// Files under public/ are served from the base URL, not bundled.
const BASE = import.meta.env?.BASE_URL ?? '/';
const CHAR_URL = (slug) => `${BASE}assets/characters/${slug}.glb`;
const RIG_URL = (slug) => `${BASE}assets/characters/${slug}.rig.json`;

/**
 * One GLB per driver (built by tools/build-character.mjs for 'rasta', and
 * tools/build-roster.mjs for the rest — same rig, same voxel technique, each
 * with its own recoloured skin/hair/outfit). Keyed by the lowercase name
 * PhysicsSystem's CHARACTERS array assigns each kart.
 */
const ROSTER_SLUGS = ['rasta', 'zion', 'marley', 'selah', 'kofi', 'nia', 'tafari', 'ayo'];

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const damp = (c, w, l, dt) => c + (w - c) * (1 - Math.exp(-l * dt));
const D = Math.PI / 180;

/**
 * The rig's bone names are mirrored with respect to the character's facing:
 * the character looks down +Z, so its own left hand is at +X, and the bones
 * living at +X are the ones VoxEdit called `Right_*`. Everything below is keyed
 * by geometry rather than by name to keep that straight.
 */
const SIDE_POS_X = 'Right';   // the driver's actual left
const SIDE_NEG_X = 'Left';    // the driver's actual right

/**
 * Seated driving pose, in degrees, XYZ. Hip lightly reclined into the seat,
 * spine curled forward over the wheel, thighs rotated up and splayed around the
 * steering column, shins dropped onto the pedals. Arm bones are seeded here
 * only as an IK fallback — the solver overwrites them every frame.
 */
const DRIVE_POSE = {
  Hip: [-7, 0, 0],
  Belly: [7, 0, 0],
  Chest: [10, 0, 0],
  Head: [-8, 0, 0],
  [`${SIDE_NEG_X}_Thigh`]: [-84, -4, -15],
  [`${SIDE_NEG_X}_Leg`]: [74, 2, 4],
  [`${SIDE_NEG_X}_Foot`]: [-18, 0, -6],
  [`${SIDE_POS_X}_Thigh`]: [-84, 4, 15],
  [`${SIDE_POS_X}_Leg`]: [74, -2, -4],
  [`${SIDE_POS_X}_Foot`]: [-18, 0, 6],
  [`${SIDE_NEG_X}_Arm`]: [0, 22, 58],
  [`${SIDE_NEG_X}_Forearm`]: [0, 46, 0],
  [`${SIDE_NEG_X}_Hand`]: [-80, 0, 0],
  [`${SIDE_POS_X}_Arm`]: [0, -22, -58],
  [`${SIDE_POS_X}_Forearm`]: [0, -46, 0],
  [`${SIDE_POS_X}_Hand`]: [-80, 0, 0],
};

/** The two arm chains, with the local axis each bone points its child down. */
const ARMS = [
  { side: SIDE_POS_X, axis: new THREE.Vector3(1, 0, 0), grip: 'gripL', out: 1 },
  { side: SIDE_NEG_X, axis: new THREE.Vector3(-1, 0, 0), grip: 'gripR', out: -1 },
];

const HAIR = [
  ['Beanie', 'beanie', 0.5],
  ['Dread_L', 'dreadL', 1.0],
  ['Dread_C', 'dreadC', 1.15],
  ['Dread_R', 'dreadR', 1.0],
];

function poseToQuats(src) {
  const out = {};
  const e = new THREE.Euler();
  for (const [name, xyz] of Object.entries(src)) {
    e.set((xyz[0] ?? 0) * D, (xyz[1] ?? 0) * D, (xyz[2] ?? 0) * D, 'XYZ');
    out[name] = new THREE.Quaternion().setFromEuler(e);
  }
  return out;
}
const DRIVE_Q = poseToQuats(DRIVE_POSE);

/** A one-dimensional spring, used per axis on the hair and hat chains. */
class Spring {
  constructor(stiffness, damping, limit = 0.6) {
    this.k = stiffness; this.d = damping; this.limit = limit;
    this.x = 0; this.v = 0;
  }
  step(target, dt) {
    // semi-implicit Euler; stable at the 120 Hz fixed step and cheap
    this.v += (-this.k * (this.x - target) - this.d * this.v) * dt;
    this.x = clamp(this.x + this.v * dt, -this.limit, this.limit);
    return this.x;
  }
}

/* --------------------------------------------------------------------- IK */

const _S = new THREE.Vector3();
const _E = new THREE.Vector3();
const _T = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _bend = new THREE.Vector3();
const _pq = new THREE.Quaternion();
const _q = new THREE.Quaternion();
const _v = new THREE.Vector3();

/**
 * Analytic two-bone IK. `root` and `mid` are aimed so that `mid`'s child lands
 * on `target`; the elbow is pushed toward `pole`. Bone lengths come from the
 * rest translations, scaled by the driver's uniform scale, so this stays
 * correct whatever size the character is drawn at.
 *
 * @returns {boolean} false when the target is unreachable and the chain was
 * simply straightened at it.
 */
function solveTwoBone(root, mid, tip, target, pole, axis, scale) {
  const l1 = mid.position.length() * scale;
  const l2 = tip.position.length() * scale;
  if (l1 < 1e-5 || l2 < 1e-5) return false;

  root.getWorldPosition(_S);
  _dir.copy(target).sub(_S);
  const dist = _dir.length();
  if (dist < 1e-5) return false;
  _dir.multiplyScalar(1 / dist);

  const reach = clamp(dist, Math.abs(l1 - l2) + 1e-4, l1 + l2 - 1e-4);
  // angle at the shoulder between the target direction and the upper bone
  const cosA = clamp((l1 * l1 + reach * reach - l2 * l2) / (2 * l1 * reach), -1, 1);
  const a = Math.acos(cosA);

  // bend plane: the component of the pole hint perpendicular to the aim
  _bend.copy(pole).sub(_S);
  _bend.addScaledVector(_dir, -_bend.dot(_dir));
  if (_bend.lengthSq() < 1e-8) _bend.set(0, -1, 0).addScaledVector(_dir, -_dir.y * -1);
  _bend.normalize();

  _E.copy(_S).addScaledVector(_dir, Math.cos(a) * l1).addScaledVector(_bend, Math.sin(a) * l1);

  aim(root, _v.copy(_E).sub(_S).normalize(), axis);
  aim(mid, _v.copy(target).sub(_E).normalize(), axis);
  return dist <= l1 + l2;
}

/** Rotate `bone` so its local `axis` points along the world direction `dir`. */
function aim(bone, dir, axis) {
  if (bone.parent) bone.parent.getWorldQuaternion(_pq); else _pq.identity();
  _pq.invert();
  _v.copy(dir).applyQuaternion(_pq).normalize();
  _q.setFromUnitVectors(axis, _v);
  bone.quaternion.copy(_q);
  bone.updateMatrix();
  bone.matrixWorldNeedsUpdate = true;
}

/* ================================================== CharacterSystem ===== */

export class CharacterSystem {
  name = 'characters'; order = 20;

  #rigs = [];
  #byId = new Map();
  #accel = new THREE.Vector3();
  #tmp = new THREE.Vector3();
  #grip = new THREE.Vector3();
  #pole = new THREE.Vector3();

  async init(ctx) {
    this.ctx = ctx;
    ctx.onProgress?.(0.72, 'trazendo os pilotos');

    const loader = new GLTFLoader();
    this.templates = new Map();
    await Promise.all(ROSTER_SLUGS.map(async (slug) => {
      const [gltf, rig] = await Promise.all([
        loader.loadAsync(CHAR_URL(slug)).catch((e) => { console.warn(`[characters] GLB indisponível: ${slug}`, e); return null; }),
        fetch(RIG_URL(slug)).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);
      if (!gltf) return;

      // The manifest stores radians; poseToQuats expects degrees, so build
      // the quaternions directly here instead of double-converting.
      const posesQ = {};
      for (const [name, p] of Object.entries(rig?.poses ?? {})) {
        if (!p?.euler) continue;
        const out = {};
        const e = new THREE.Euler();
        for (const [b, xyz] of Object.entries(p.euler)) {
          e.set(xyz[0] ?? 0, xyz[1] ?? 0, xyz[2] ?? 0, 'XYZ');
          out[b] = new THREE.Quaternion().setFromEuler(e);
        }
        posesQ[name] = out;
      }

      gltf.scene.traverse((o) => {
        if (!o.isMesh && !o.isSkinnedMesh) return;
        o.castShadow = true;
        o.receiveShadow = true;
        o.frustumCulled = false;      // skinned bounds go stale while posed
        const m = o.material;
        if (m) {
          m.vertexColors = true;
          m.roughness = 0.88;
          m.metalness = 0.0;
          // the voxel palette is already quite light; a hot IBL on top of a
          // 4.4-intensity key was bleaching the olive jacket to white
          m.envMapIntensity = 0.45;
          m.flatShading = true;       // voxels have no business being smooth
          m.needsUpdate = true;
        }
      });

      this.templates.set(slug, { scene: gltf.scene, posesQ });
    }));

    ctx.events.on('kart:spawn', (k) => this.attach(k, ctx));
    for (const k of ctx.karts) if (!k.visual) this.attach(k, ctx);

    ctx.events.on('kart:hit', (k) => this.#react(k, 'hit', 1.0));
    ctx.events.on('kart:trick', (k) => this.#react(k, 'cheer', 0.55));
    ctx.events.on('kart:drift-tier', (e) => {
      if ((e?.tier ?? 0) >= 3) this.#react(e.kart ?? e, 'cheer', 0.35);
    });
    ctx.events.on('race:finish', (e) => {
      const k = e?.kart ?? e;
      if (!k) return;
      this.#react(k, (k.place ?? 9) <= 3 ? 'victory' : 'sad', 9.0, 0.85);
    });

    ctx.onProgress?.(0.85, 'montando os karts');
  }

  attach(kart, ctx = this.ctx) {
    const group = new THREE.Group();
    group.name = `racer:${kart.id}`;

    // The player must always be the rasta colourway (index 0); the rest of the
    // grid takes the remaining eight so no CPU steals the hero livery.
    const raw = kart.liveryIndex ?? kart.id ?? 0;
    const liveryIndex = kart.isPlayer
      ? 0
      : 1 + (((raw - 1) % (LIVERIES.length - 1)) + LIVERIES.length - 1) % (LIVERIES.length - 1);

    const kartModel = new KartModel(liveryIndex, ctx.quality);
    group.add(kartModel.root);

    // The player is always the Rasta driver — the hero avatar, regardless of
    // which stat card was picked in the menu — every CPU wears the avatar
    // matching its own name (see tools/build-roster.mjs for how those were
    // built). Falls back to Rasta if a name has no matching GLB.
    const slug = kart.isPlayer ? 'rasta' : (kart.name ?? 'rasta').toLowerCase();
    const tpl = this.templates.get(slug) ?? this.templates.get('rasta');

    let driver = null;
    let bones = null;
    const scale = 1.0;
    if (tpl) {
      driver = skeletonClone(tpl.scene);
      driver.scale.setScalar(scale);
      // The rig's hip pivot is 0.6 m up in its own space; drop the character so
      // that pivot lands exactly on the seat pan.
      const anchor = kartModel.driverAnchor.position;
      driver.position.set(anchor.x, anchor.y - 0.6 * scale, anchor.z);
      group.add(driver);

      bones = {};
      driver.traverse((o) => { if (o.isBone) bones[o.name] = o; });
      // Mario Kart proportions: the head, hat and dreads carry the silhouette,
      // so the whole head group is drawn oversized relative to the body.
      if (bones.Head) bones.Head.scale.setScalar(1.16);
    }

    kart.visual = group;
    ctx.scene.add(group);

    const rig = {
      kart,
      group,
      kartModel,
      driver,
      bones,
      posesQ: tpl?.posesQ ?? {},
      scale,
      lean: 0,
      pitch: 0,
      yaw: 0,
      prevVel: new THREE.Vector3(),
      bob: ctx.rng.range(0, Math.PI * 2),
      react: null,
      springs: {
        beanie: [new Spring(95, 12, 0.34), new Spring(95, 12, 0.34)],
        dreadL: [new Spring(54, 7.6, 0.70), new Spring(54, 7.6, 0.70)],
        dreadC: [new Spring(48, 7.0, 0.75), new Spring(48, 7.0, 0.75)],
        dreadR: [new Spring(54, 7.6, 0.70), new Spring(54, 7.6, 0.70)],
      },
    };
    this.#rigs.push(rig);
    this.#byId.set(kart.id, rig);
    if (bones) this.#writePose(rig, 0);
  }

  /** Blend one of the .vxa reaction poses in over the driving pose. */
  #react(kart, pose, dur, peak = 1.0) {
    const r = this.#byId.get(kart?.id);
    if (!r || !r.posesQ?.[pose]) return;
    r.react = { pose, t: 0, dur, peak, w: 0 };
  }

  /**
   * Write the seated pose (plus any active reaction) onto the skeleton. The
   * driving pose is the base for every bone; the reaction slerps over it.
   */
  #writePose(r, reactW) {
    const b = r.bones;
    const over = reactW > 0.001 && r.react ? r.posesQ[r.react.pose] : null;
    for (const [name, q] of Object.entries(DRIVE_Q)) {
      const bone = b[name];
      if (!bone) continue;
      bone.quaternion.copy(q);
      const oq = over?.[name];
      if (oq) bone.quaternion.slerp(oq, reactW);
    }
  }

  lateUpdate(dt, ctx) {
    const t = ctx.time.t;
    for (const r of this.#rigs) {
      const k = r.kart;
      if (!r.group) continue;

      r.group.position.copy(k.position);
      r.group.quaternion.copy(k.quaternion);
      r.kartModel.update(k, dt);

      if (!r.bones) continue;

      // ---- body-frame acceleration drives every secondary motion ---------
      this.#accel.copy(k.velocity).sub(r.prevVel).multiplyScalar(1 / Math.max(dt, 1e-4));
      r.prevVel.copy(k.velocity);
      const inv = _q.copy(r.group.quaternion).invert();
      const local = this.#tmp.copy(this.#accel).applyQuaternion(inv).multiplyScalar(0.012);
      const lateralG = clamp(local.x, -1.2, 1.2);
      const longG = clamp(local.z, -1.2, 1.2);

      const drift = k.drift?.active ? k.drift.dir : 0;
      const speedN = clamp(k.speed / Math.max(1, k.stats?.topSpeed ?? 26), 0, 1);
      const steer = k.steerAngle ?? 0;

      // ---- reaction envelope --------------------------------------------
      let reactW = 0;
      if (r.react) {
        r.react.t += dt;
        const p = r.react;
        reactW = p.dur > 4
          ? Math.min(1, p.t / 0.35) * p.peak                       // hold (finish)
          : Math.min(1, p.t / 0.12) * Math.max(0, 1 - p.t / p.dur) * p.peak;
        if (p.t > p.dur) { r.react = null; reactW = 0; }
      }

      this.#writePose(r, reactW);

      // ---- torso ---------------------------------------------------------
      // lateralG is in the kart frame where +X is the driver's left, so a
      // left-hand corner throws the body to the right: lean into it.
      const wantLean = -lateralG * 0.26 - drift * 0.20;
      const wantPitch = clamp(-longG * 0.14, -0.16, 0.22) + speedN * 0.11;
      const wantYaw = steer * 0.30 + drift * 0.22;
      r.lean = damp(r.lean, wantLean, 9, dt);
      r.pitch = damp(r.pitch, wantPitch, 8, dt);
      r.yaw = damp(r.yaw, wantYaw, 7, dt);

      const lead = 1 - reactW;
      const spine = [['Chest', 0.60, 0.55], ['Belly', 0.30, 0.30], ['Hip', 0.14, 0.16]];
      for (const [name, kp, kl] of spine) {
        const bone = r.bones[name];
        if (!bone) continue;
        bone.quaternion.multiply(_q.setFromEuler(new THREE.Euler(
          r.pitch * kp * lead, r.yaw * kl * lead, r.lean * kl * 1.5 * lead, 'XYZ')));
      }
      const head = r.bones.Head;
      if (head) {
        // counter-rotate and look into the corner
        head.quaternion.multiply(_q.setFromEuler(new THREE.Euler(
          -r.pitch * 0.35 * lead, r.yaw * 0.9 * lead, -r.lean * 0.5 * lead, 'XYZ')));
      }

      // ---- hands on the wheel -------------------------------------------
      // Matrices must be current before the solver reads world positions: the
      // group was just re-posed and the renderer has not run yet.
      r.group.updateMatrixWorld(true);
      if (reactW < 0.6) {
        const wheel = r.kartModel.steeringWheel;
        for (const arm of ARMS) {
          const a = r.bones[`${arm.side}_Arm`];
          const f = r.bones[`${arm.side}_Forearm`];
          const h = r.bones[`${arm.side}_Hand`];
          if (!a || !f || !h) continue;
          this.#grip.copy(r.kartModel[arm.grip]);
          wheel.localToWorld(this.#grip);
          r.group.localToWorld(this.#pole.set(arm.out * 1.05, 0.10, -0.45));
          const ok = solveTwoBone(a, f, h, this.#grip, this.#pole, arm.axis, r.scale);
          if (!ok) continue;
          // wrap the hand around the rim rather than leaving it on the aim axis
          h.quaternion.setFromEuler(new THREE.Euler(-1.35, 0, arm.out * 0.35, 'XYZ'));
        }
        r.group.updateMatrixWorld(true);
      }

      // ---- beanie and dreadlocks ----------------------------------------
      const jitter = Math.sin(t * 11 + r.bob) * 0.012 * speedN;
      for (const [name, key, gain] of HAIR) {
        const bone = r.bones[name];
        if (!bone) continue;
        const spr = r.springs[key];
        const tx = spr[0].step(-longG * 0.5 * gain + jitter, dt);
        const tz = spr[1].step(-lateralG * 0.7 * gain - drift * 0.30 * gain, dt);
        bone.quaternion.setFromEuler(new THREE.Euler(tx, 0, tz, 'XYZ'));
      }
    }
  }

  dispose() {
    for (const r of this.#rigs) {
      r.kartModel?.dispose?.();
      r.group?.parent?.remove(r.group);
    }
    this.#rigs.length = 0;
    this.#byId.clear();
  }
}
