import * as THREE from 'three';

/**
 * Time-of-day presets.
 *
 * Every colour is authored as an sRGB hex (what a colour picker shows) and is
 * converted to the linear working space by THREE.Color, so the numbers below
 * read the way an artist expects.
 *
 * `golden` is the default: a low, warm key light rakes across the track and
 * gives every volume a lit side and a shaded side — the single biggest reason
 * a kart reads as a solid object instead of a flat sprite.
 */

const C = (hex) => new THREE.Color(hex);

/** @typedef {keyof typeof PRESETS} TimeOfDayName */

export const PRESETS = {
  /** Tropical noon — high contrast, deep blue zenith, near-white key. */
  noon: {
    label: 'meio-dia tropical',
    sun: { elevation: 66, azimuth: 34, color: 0xfff6e2, intensity: 3.35, discSize: 0.021 },
    sky: {
      zenith: 0x1660c8, mid: 0x64b4ee, horizon: 0xd6f0ff, ground: 0x6f8a72,
      gradExp: 1.55, haze: 0.45, sunHalo: 0.55, sunDisc: 26,
      cloudCover: 0.50, cloudScale: 0.75, cloudSpeed: 1.0, cloudOpacity: 0.95,
      cloudLit: 0xffffff, cloudDark: 0x9fb6cc, cirrus: 0.30,
    },
    fog: { color: 0xbfe1f7, sunColor: 0xfff0cf, density: 0.0011, falloff: 0.030,
           groundY: -2, start: 120, max: 0.72 },
    fill: { skyColor: 0x9fd0ff, skyIntensity: 0.30, bounceColor: 0x9dbf7a, bounceIntensity: 0.24 },
    env: { intensity: 0.78 },
    exposure: 1.00,
    grade: {
      saturation: 1.20, contrast: 1.10, sCurve: 0.30, blackPoint: 0.050, whitePoint: 0.94,
      lift: 0.008, shadowTint: 0x2b3f6b, highlightTint: 0xfff3dd, tintAmount: 0.16,
      vignette: 0.24, grain: 0.006,
    },
    bloom: { strength: 0.34, threshold: 0.82, radius: 0.58 },
    godRays: 0.42,
  },

  /** Golden afternoon — the default. Long shadows, warm key, cool sky fill. */
  golden: {
    label: 'tarde dourada',
    sun: { elevation: 26, azimuth: -46, color: 0xffd79a, intensity: 4.4, discSize: 0.026 },
    sky: {
      zenith: 0x1a5aa8, mid: 0x71a8d8, horizon: 0xffd6a0, ground: 0x6b6a58,
      gradExp: 1.30, haze: 0.72, sunHalo: 1.25, sunDisc: 34,
      cloudCover: 0.46, cloudScale: 0.62, cloudSpeed: 1.0, cloudOpacity: 0.97,
      cloudLit: 0xfff0d8, cloudDark: 0x7f88a8, cirrus: 0.42,
    },
    fog: { color: 0xa9c9e6, sunColor: 0xffd39a, density: 0.0013, falloff: 0.030,
           groundY: -2, start: 95, max: 0.76 },
    fill: { skyColor: 0x8fbdff, skyIntensity: 0.32, bounceColor: 0xc0a271, bounceIntensity: 0.28 },
    env: { intensity: 0.80 },
    exposure: 1.00,
    grade: {
      saturation: 1.24, contrast: 1.12, sCurve: 0.34, blackPoint: 0.055, whitePoint: 0.93,
      lift: 0.010, shadowTint: 0x2c4a86, highlightTint: 0xffe6bd, tintAmount: 0.22,
      vignette: 0.26, grain: 0.007,
    },
    bloom: { strength: 0.42, threshold: 0.80, radius: 0.62 },
    godRays: 0.72,
  },

  /** Sunset — heavy inscatter, sun sitting on the horizon. */
  sunset: {
    label: 'pôr do sol',
    sun: { elevation: 6.5, azimuth: -84, color: 0xff9a4f, intensity: 3.2, discSize: 0.032 },
    sky: {
      zenith: 0x1d2f76, mid: 0x8f6fa8, horizon: 0xff8a46, ground: 0x4a3f3c,
      gradExp: 1.10, haze: 0.95, sunHalo: 1.85, sunDisc: 28,
      cloudCover: 0.42, cloudScale: 0.55, cloudSpeed: 0.8, cloudOpacity: 1.0,
      cloudLit: 0xffb277, cloudDark: 0x4d4670, cirrus: 0.55,
    },
    fog: { color: 0x9a86ac, sunColor: 0xff9c58, density: 0.0021, falloff: 0.026,
           groundY: -2, start: 70, max: 0.84 },
    fill: { skyColor: 0x7c8ed8, skyIntensity: 0.38, bounceColor: 0xc08050, bounceIntensity: 0.26 },
    env: { intensity: 0.88 },
    exposure: 1.04,
    grade: {
      saturation: 1.28, contrast: 1.12, sCurve: 0.32, blackPoint: 0.055, whitePoint: 0.93,
      lift: 0.016, shadowTint: 0x33357f, highlightTint: 0xffcf9a, tintAmount: 0.30,
      vignette: 0.30, grain: 0.008,
    },
    bloom: { strength: 0.52, threshold: 0.72, radius: 0.70 },
    godRays: 1.05,
  },
};

export const DEFAULT_TOD = 'golden';

/** Resolve a preset into concrete THREE objects (colours + sun direction). */
export function resolvePreset(name) {
  const p = PRESETS[name] ?? PRESETS[DEFAULT_TOD];
  const el = THREE.MathUtils.degToRad(p.sun.elevation);
  const az = THREE.MathUtils.degToRad(p.sun.azimuth);
  // direction the light travels *from* (i.e. where the sun sits in the sky)
  const sunDir = new THREE.Vector3(
    Math.cos(el) * Math.sin(az),
    Math.sin(el),
    Math.cos(el) * Math.cos(az),
  ).normalize();

  return {
    name: PRESETS[name] ? name : DEFAULT_TOD,
    raw: p,
    sunDir,
    sunColor: C(p.sun.color),
    sunIntensity: p.sun.intensity,
    sunDiscSize: p.sun.discSize,
    sky: {
      zenith: C(p.sky.zenith), mid: C(p.sky.mid), horizon: C(p.sky.horizon), ground: C(p.sky.ground),
      gradExp: p.sky.gradExp, haze: p.sky.haze, sunHalo: p.sky.sunHalo, sunDisc: p.sky.sunDisc,
      cloudCover: p.sky.cloudCover, cloudScale: p.sky.cloudScale, cloudSpeed: p.sky.cloudSpeed,
      cloudOpacity: p.sky.cloudOpacity, cirrus: p.sky.cirrus,
      cloudLit: C(p.sky.cloudLit), cloudDark: C(p.sky.cloudDark),
    },
    fog: {
      color: C(p.fog.color), sunColor: C(p.fog.sunColor),
      density: p.fog.density, falloff: p.fog.falloff, groundY: p.fog.groundY,
      start: p.fog.start ?? 80, max: p.fog.max ?? 0.8,
    },
    fill: {
      skyColor: C(p.fill.skyColor), skyIntensity: p.fill.skyIntensity,
      bounceColor: C(p.fill.bounceColor), bounceIntensity: p.fill.bounceIntensity,
    },
    envIntensity: p.env.intensity,
    exposure: p.exposure,
    grade: {
      saturation: p.grade.saturation, contrast: p.grade.contrast, lift: p.grade.lift,
      sCurve: p.grade.sCurve, blackPoint: p.grade.blackPoint, whitePoint: p.grade.whitePoint,
      vignette: p.grade.vignette, grain: p.grade.grain,
      shadowTint: C(p.grade.shadowTint), highlightTint: C(p.grade.highlightTint),
      tintAmount: p.grade.tintAmount,
    },
    bloom: { ...p.bloom },
    godRays: p.godRays,
  };
}

export const TOD_NAMES = Object.keys(PRESETS);
