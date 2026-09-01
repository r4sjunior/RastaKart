import { Game } from './core/Game.js';
import { RenderSystem } from './render/RenderSystem.js';
import { WorldSystem } from './world/WorldSystem.js';
import { CharacterSystem } from './characters/CharacterSystem.js';
import { PhysicsSystem } from './physics/PhysicsSystem.js';
import { AISystem } from './ai/AISystem.js';
import { ItemSystem } from './items/ItemSystem.js';
import { VfxSystem } from './vfx/VfxSystem.js';
import { CameraSystem } from './core/CameraSystem.js';
import { RaceSystem } from './core/RaceSystem.js';
import { HudSystem } from './ui/HudSystem.js';
import { AudioSystem } from './audio/AudioSystem.js';

const params = new URLSearchParams(location.search);
const boot = document.getElementById('boot');
const bar = document.getElementById('boot-bar');
const msg = document.getElementById('boot-msg');
const progress = (p, label) => {
  if (bar) bar.style.width = `${Math.round(p * 100)}%`;
  if (msg && label) msg.textContent = label;
};

const game = new Game(document.getElementById('gl'), {
  seed: Number(params.get('seed') ?? 1337),
  quality: params.get('quality') ?? 'high',
  maxDpr: Number(params.get('dpr') ?? 2),
});

game.ctx.debug.enabled = params.has('debug');
game.ctx.onProgress = progress;

// Order matters: lower `order` runs first inside each phase.
game.add(new RenderSystem());     // order 0   – renderer, lighting, post
game.add(new WorldSystem());      // order 10  – track, collision, environment
game.add(new CharacterSystem());  // order 20  – voxel driver + kart meshes
game.add(new PhysicsSystem());    // order 30  – kart dynamics
game.add(new AISystem());         // order 35  – CPU racers
game.add(new ItemSystem());       // order 40  – item boxes and projectiles
game.add(new RaceSystem());       // order 45  – laps, placement, countdown
game.add(new VfxSystem());        // order 50  – particles, trails, decals
game.add(new CameraSystem());     // order 60  – chase camera
game.add(new HudSystem());        // order 70  – DOM/canvas HUD
game.add(new AudioSystem());      // order 80  – engine, music, sfx

await game.init();
progress(1, 'pronto');
boot?.classList.add('done');
setTimeout(() => boot?.remove(), 600);

// Screenshot harness hooks (see tests/shot.mjs). Kept out of the hot path.
window.__RK = {
  game,
  ctx: game.ctx,
  ready: true,
  simulate: (s) => game.simulate(s),
  renderOnce: () => game.renderOnce(),
  pose: (name, opts) => game.get('camera')?.pose(name, opts),
};

if (!params.has('static')) game.start();
