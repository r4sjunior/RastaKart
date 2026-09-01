# Biblioteca de referência visual

Capturas oficiais de imprensa da Nintendo (Mario Kart World / Mario Kart 8
Deluxe), baixadas de `assets.nintendo.com`. Servem **exclusivamente** como
régua de qualidade durante o desenvolvimento, em comparações lado a lado.
Nada aqui é distribuído no build do jogo — `tests/` não entra em `dist/`.

| arquivo | serve para julgar |
|---|---|
| `mkw_race_01.jpg` | close de kart + piloto, asfalto, campo de corredores |
| `mkw_race_02..04.jpg` | câmera de perseguição em corrida, HUD, sensação de velocidade |
| `mkw_world_01..02.jpg` | escala de cenário, horizonte em camadas, densidade de mundo |
| `mkw_kart_01..02.jpg` | materiais do kart, pintura, cromado, borracha |
| `mkw_freeroam_01..02.jpg` | terreno, vegetação, iluminação de ambiente |
| `mk8_*.jpg` | material adicional trazido por agentes |

Uso:

```bash
node tools/compare.mjs --a tests/shots/<rodada>/chase.png \
     --b tests/refs/mkw_race_02.jpg --blind --out tests/compare/x.png
```
