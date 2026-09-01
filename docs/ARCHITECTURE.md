# Rasta Kart — arquitetura e contratos

Regra número um: **cada agente só escreve nos arquivos da sua pasta**. Se você
precisa de algo de outro sistema, use o contrato abaixo ou emita um evento.
Nunca edite `src/core/*`, `src/main.js`, `index.html` ou `tests/*` — se o
contrato não te atende, reporte no retorno da tarefa.

## Loop

`Game` roda passo fixo de 1/120 s (`FIXED_DT`) com interpolação no render.

| fase | método | frequência |
|---|---|---|
| lógica/física | `update(dt, ctx)` | passo fixo |
| pós-lógica (câmera, VFX que segue) | `lateUpdate(dt, ctx)` | por frame |
| desenho | `render(alpha, ctx)` | por frame |
| viewport | `resize(w, h, ctx)` | on resize |

Sistema = `{ name, order, init?, update?, lateUpdate?, render?, resize?, dispose? }`.

## ctx (objeto compartilhado)

```
ctx.scene            THREE.Scene
ctx.camera           THREE.PerspectiveCamera
ctx.renderer         THREE.WebGLRenderer          (RenderSystem)
ctx.composer         EffectComposer               (RenderSystem)
ctx.world            WorldAPI                     (WorldSystem)
ctx.karts            KartEntity[]                 (PhysicsSystem/AISystem)
ctx.player           KartEntity
ctx.events           EventBus
ctx.rng              Rng determinístico — NUNCA use Math.random()
ctx.input            Input (leia ctx.input.state)
ctx.time             { t, dt, frame, scale }
ctx.race             { state, lap, totalLaps, countdown, timeMs }
ctx.quality          'low' | 'medium' | 'high' | 'ultra'
ctx.viewport         { w, h, dpr }
```

## WorldAPI (WorldSystem fornece — física e IA consomem)

```js
world.sampleGround(x, z)       // -> { y, normal:Vector3, surface, onTrack, banking }
                               //    surface: 'road'|'dirt'|'grass'|'boost'|'sand'|'water'
world.sampleSpline(u)          // u in [0,1) -> { pos, tangent, normal, right, width, banking }
world.project(pos)             // -> { u, lateral, distAlong, forward:Vector3 }
world.collideWall(pos, radius) // -> null | { normal:Vector3, depth:number }
world.trackLength              // metros
world.startGrid(i)             // -> { position:Vector3, quaternion:Quaternion }
world.itemBoxSpots             // Vector3[]
world.checkpointCount
```

## KartEntity (PhysicsSystem é dono; todos leem)

```js
{
  id, name, isPlayer, characterId,
  position: Vector3, quaternion: Quaternion, up: Vector3,
  velocity: Vector3, speed, forwardSpeed, steerInput, steerAngle,
  drift: { active, dir, charge, tier },       // tier 0..3 (azul/laranja/roxo)
  boost: { timer, power, source },
  air: { off, time, trickDone },
  onGround, surface, groundNormal: Vector3,
  wheelContacts: [{ pos, compression, grounded, surface, normal, force }],
  throttleInput, brakeInput, steerInput,
  lap, checkpoint, progress, place, finished,
  visual: Object3D,          // CharacterSystem cria e preenche
  stats: { topSpeed, accel, handling, weight, offroad },
  applyImpulse(v), spinOut(dur), squash(dur), giveBoost(dur, power)
}
```

### Armadilha: `wheelContacts[i].pos` vs `.contact`

Cada roda publica **dois** pontos e os nomes enganam:

| campo | o que é |
|---|---|
| `pos` | o **hub** da roda, na altura do eixo — use este para emitir partícula, poeira e faísca |
| `contact` | `pos` empurrado `wheelRadius` (0,42 m) para **baixo**, ou seja **abaixo do asfalto** |

Emitir em `.contact` enterra o efeito sob a pista e ele fica invisível. Já custou
horas de depuração a um agente. Use `.pos`.

## Eventos

`race:countdown` `race:start` `race:lap` `race:finish`
`kart:drift-tier` `kart:boost` `kart:land` `kart:trick` `kart:hit`
`kart:offroad` `kart:wall` `item:pickup` `item:use` `item:explode`
`audio:sfx` `{name, position, volume, pitch}`

## Qualidade determinística

Nada de `Math.random()`, `Date.now()` ou `performance.now()` na lógica.
Use `ctx.rng` e `ctx.time.t`. O harness de screenshot depende disso.

## Verificação visual

`node tests/shot.mjs --pose <nome> --out tests/shots/<arquivo>.png`
Poses registradas em `src/core/CameraSystem.js` (`pose()`).
