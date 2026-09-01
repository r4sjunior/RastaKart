# Briefing comum — Rasta Kart

Jogo de kart em terceira pessoa, Three.js puro, alvo de qualidade **Mario Kart 8
Deluxe / Mario Kart World**. Nada de "bom o suficiente": o padrão é AAA.

## Antes de escrever código

1. Leia `docs/ARCHITECTURE.md` (contratos de sistema, `ctx`, WorldAPI, KartEntity).
2. Rode `npx vite build` para confirmar que a base está verde.
3. Olhe as screenshots existentes em `tests/shots/` para ver o estado atual.

## Regras invioláveis

- **Só escreva nos arquivos da sua pasta.** Colisão entre agentes quebra tudo.
  Nunca toque em `src/core/`, `src/main.js`, `index.html`, `tests/`, `package.json`.
- **Nunca `Math.random()`** na lógica de jogo — use `ctx.rng`. Screenshots
  precisam ser reprodutíveis. Em VFX puramente visual, `ctx.rng` também.
- **Nunca `performance.now()`/`Date.now()`** na lógica — use `ctx.time.t`.
- Three.js `0.180`. Importe de `'three'` e de `'three/addons/...'`
  (mapeado para `three/examples/jsm/...`). Não adicione dependências novas sem
  reportar; se precisar, diga no retorno em vez de instalar.
- Nada de asset externo por CDN em runtime. Tudo gerado proceduralmente ou
  colocado em `public/assets/`.
- Orçamento de performance: **60 fps a 1080p** em GPU integrada moderna.
  Draw calls < 400, triângulos < 1.5M. Respeite `ctx.quality`
  (`low|medium|high|ultra`) degradando efeitos.

## Você DEVE verificar visualmente o seu próprio trabalho

Não entregue sem ter olhado. O ciclo é:

```bash
npx vite build                                   # tem que passar limpo
node tests/shot.mjs --poses <suas-poses> --sim 4 --drive \
     --port <SUA_PORTA> --dir tests/shots/<seu-nome>
```

Depois **abra os PNGs com a ferramenta Read e olhe de verdade**. Pergunte-se:
"isso passaria num trailer da Nintendo?". Se não, conserte e repita. Espere
gastar 3–6 rodadas. Entregar algo que você não olhou é falha da tarefa.

Poses disponíveis: `chase, hero, front, wheel, lowchase, overhead, vista, horizon, grid`.

## Referência de qualidade

Você tem WebSearch/WebFetch. Busque capturas reais de Mario Kart 8 Deluxe e
Mario Kart World e estude: paleta, contraste, densidade de detalhe, leitura de
silhueta, escala do cenário, tratamento de céu, bordas de pista. Compare sua
screenshot lado a lado com a referência antes de dizer que terminou.

## Retorno da tarefa

Reporte, de forma concisa:
- arquivos criados/alterados;
- o que você verificou visualmente e em qual screenshot;
- números de `render:` (draw calls / triângulos) do último shot;
- o que ficou abaixo do nível AAA e por quê (seja honesto — outro agente vai
  auditar e discrepância conta contra você);
- qualquer contrato de `ARCHITECTURE.md` que não te atendeu.

## Ferramentas extras de verificação

**Filmstrip** — julga movimento, drift, VFX e continuidade temporal, coisas que
uma foto estática esconde:

```bash
node tests/shot.mjs --pose chase --sim 5 --drive --strip 6 \
     --port <SUA_PORTA> --dir tests/shots/<seu-nome>
```

**Telemetria** — CSV com velocidade, drift, carga de mini-turbo, boost, ar,
superfície, posição e colocação, 480 linhas a 120 Hz:

```bash
node tests/shot.mjs --pose chase --sim 0 --drive --telemetry \
     --port <SUA_PORTA> --dir tests/shots/<seu-nome>
```

**Comparação lado a lado com o jogo real** — o padrão-ouro do projeto:

```bash
node tools/fetch-ref.mjs "<url-da-imagem-de-referencia>" mk8_pista
node tools/compare.mjs --a tests/shots/<seu>/chase.png --b tests/refs/mk8_pista.jpg \
     --blind --out tests/compare/<seu>_chase.png
```

`--blind` esconde os rótulos e `--swap` inverte os lados, para você julgar sem
saber qual é qual. `--mode split` cola as duas metades na mesma imagem.
Veja `docs/CRITIC_PROTOCOL.md` para a rubrica completa.
