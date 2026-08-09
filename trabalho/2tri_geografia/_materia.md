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
| 4 | Derivados | `GEO2_dragdrop`, `GEO2_popit`, `GEO2_simulado` (141 q.), `GEO2_estudo` (3 modos), `GEO2_flashcards` (46 cartas), `GEO2_nlm` (quiz explicado + 65 cartas), `GEO2_video` (vídeo 4 min), `GEO2_galeria` (15 figuras + PDF) | ✅ |
| 4b | Roteiro de vídeo | `notebooklm/roteiro_video.md` (<3 min) | ✅ |
| 5 | NotebookLM | caderno `f7acb1fc` (3 fontes) → quiz + flashcards + **vídeo 4 min** | ✅ |
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

## NotebookLM — o que rodou

Caderno **`f7acb1fc-ccfa-46b0-a471-1ec71a43f295`** — "Serafina - GEO2: Comunidades e lugares (Y2)".
Fontes: PDF da professora + `nlm_source_geo2.md` + `roteiro_video.md`.

| Artefato | Estado | Onde foi parar |
|---|---|---|
| Quiz (10 questões, com o porquê de cada alternativa) | ✅ | `media/quiz_geo2_nlm.json` → `GEO2_nlm.html` |
| Flashcards (65 cartas) | ✅ | `media/flashcards_geo2_nlm.json` → aba "Revisão rápida" |
| Vídeo (kawaii, `pt_BR`) | ✅ **4 min 22 s**, 23 MB | `media/video_geo2_nb1_pt.mp4` → `GEO2_video.html` |

**Conferência antes de publicar:** as 10 questões e as 65 cartas foram lidas uma a uma. Todas
fiéis às fontes, incluindo os dois pares-armadilha (boi-bumbá × bumba meu boi; cuscuz paulista ×
nordestino) e a ambiguidade da Festa do Divino (carta 65). Nada inventado — nada foi cortado.

## Armadilhas do CLI `notebooklm` 0.7.3 (o `CLAUDE.md` do projeto está desatualizado)

| O que o CLAUDE.md diz | O que a 0.7.3 faz |
|---|---|
| `source add --file <caminho>` | **não existe `--file`** — o caminho é argumento **posicional** |
| `generate quiz --language pt_BR` | **quiz/flashcards não aceitam `--language`** — o idioma vem do prompt + env `NOTEBOOKLM_HL` |
| `--language pt_BR` | certo, mas **só em `generate video`**, e com **underscore**: `pt-BR` dá `Unknown language code` |

O runner `_processo/geracao/nlm_geo2.py` já está corrigido para a 0.7.3.

## O que ficou NÃO VERIFICADO

**A reprodução do vídeo.** No Chrome automatizado o `<video>` fica em `readyState 0` — sem
metadata, sem duração — tanto no servidor local quanto no GitHub Pages, e mesmo abrindo o
`.mp4` direto. O arquivo, porém, está **íntegro**: `ftyp` + `moov` + `mdat` somam exatamente
os 24.340.644 bytes, o `moov` está **na frente** (bom para streaming), os codecs são
**H.264 (`avc1`) + AAC (`mp4a`)** e o `mvhd` diz `timescale 1000 / duration 262711` = 4 min 22 s.
Ou seja: nada aponta para defeito no arquivo — parece limitação do navegador sob automação.
**Abrir num navegador normal para confirmar.**

Por causa disso, a página do vídeo **não promete o que não foi conferido**: o sumário é
numerado, sem carimbo de minuto, e a navegação é por −10 s / +10 s.

## Como reprocessar o vídeo, se precisar

```bash
notebooklm artifact list --notebook f7acb1fc-ccfa-46b0-a471-1ec71a43f295 --json
python _processo/geracao/nlm_geo2.py --etapa baixar
```

O runner só baixa o que estiver `completed` e lê o status pelo `--json` (o parse da tabela
dava falso positivo: `grep Video -A4` alcançava o `completed` do artefato seguinte).
