# Geografia — 2º trimestre · Year 2 · Prova 11/08/2026
## Unidade 2 — Diferentes comunidades e sua relação com os lugares

**Insumo único:** PDF Toddle da Unidade 2 (26 slides) — `Toddle-226a5c4b-…Y2.pdf`.
**Idioma:** português (matéria PT, sem versão EN).
**Fonte de verdade do conteúdo:** [`_roteiro.md`](_roteiro.md).

## Painel de entrega

| # | Etapa do RUNBOOK | Produto | Status |
|---|---|---|---|
| 0 | Sequenciar fontes | `_roteiro.md` §0 (6 blocos, simples → complexo) | ✅ |
| 1 | Extrair conteúdo + figuras | `_roteiro.md` + `figuras/` (15 figuras, `_figmap.json` + `_manifest.json`) | ✅ |
| 2 | Template | motor CIE2 reaproveitado (`serafina-core` + `serafina-adventure`) | ✅ |
| 3 | Produto-âncora | `GEO2_aventura.html` — 7 fases + 2 chefes, 57 perguntas | ✅ |
| 4 | Derivados | `GEO2_dragdrop`, `GEO2_popit`, `GEO2_simulado` (141 q.), `GEO2_estudo` (3 modos), `GEO2_flashcards` (46 cartas), `GEO2_galeria` (15 figuras + PDF) | ✅ |
| 4b | Roteiro de vídeo | `notebooklm/roteiro_video.md` (<3 min) | ✅ |
| 5 | NotebookLM | `notebooklm/nlm_source_geo2.md` + runner `_processo/geracao/nlm_geo2.py` | ⏳ **bloqueado no login** |
| 6 | Entrega + commit | `index.html` (Geografia no topo) + sw v23 + push | ✅ |

## Gates rodados

| Gate | O que verifica | Resultado |
|---|---|---|
| `_processo/geracao/validate_geo.js` | GAMES + ADVENTURE: integridade referencial, gabarito único em MC, coluna sem carta, duplicatas | **PASSOU** (0 erros) |
| `_processo/geracao/validate_geo_sim.js` | banco do simulado: gabarito único, distrator repetido, tema órfão, cobertura ≥8 por tema, **ambiguidade §7** | **PASSOU** (0 erros, 0 avisos) |
| QA no navegador (Chrome) | os 7 produtos abertos e jogados; PT completo; board das 5 regiões em tela estreita | **PASSOU** (6 defeitos achados e corrigidos) |

## Cobertura insumo → produto

Mapa completo em [`_roteiro.md` §10](_roteiro.md). Todo átomo do PDF (glossário, texto-base,
10 tradições, painel das 5 regiões × 5 categorias, diversidade/meio ambiente, atividades da
apostila) é treinado por ≥1 produto. Nenhum dado foi inventado; o que o material não diz
(ex.: qual tradição do Centro-Oeste aparece nas fotos da Aula 4) ficou **fora**, e o jogo 6
do Sort it! usa 4 regiões em vez de 5 por causa disso.

## Ambiguidades resolvidas (§7 do roteiro)

`Festa do Divino`, `festa da uva`, `sertanejo`, `carnaval` e `xote` existem em **duas regiões**
no material. Nenhum deles é gabarito de resposta única em produto nenhum — só entram com o nome
completo. O `validate_geo_sim.js` **reprova o build** se algum voltar isolado.

## Pendência

**NotebookLM.** A sessão está expirada (`CAUSA: SESSAO-MORTA`). O login exige stdin interativo,
então tem de ser o humano:

```
! bash "C:/Users/paulo/OneDrive/td junto outlook hotmail/Prático/_ecossistema/skills/nlm-auth/scripts/nlm_login.sh"
```

Depois: `python _processo/geracao/nlm_geo2.py` — cria o caderno, sobe as 3 fontes, gera vídeo
(`pt_BR`, kawaii), quiz e flashcards, espera e baixa para `ferramentas/media/`. É idempotente.
