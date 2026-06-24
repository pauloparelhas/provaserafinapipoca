# PROJETO SERAFINA - MAPA DE TAXONOMIA
**Responsavel:** Agente Coordenador Pedagogico
**Atualizado em:** 23/06/2026 (SCIENCE 2tri ganhou nova ferramenta CIE2-DRAG "Sort it! — Drag & Drop")
**Historico:** 17/06/2026 (SCIENCE 2tri "Properties of Matter" entregue) · 12/06/2026 (HISTORIA 2tri "Memoria e Historia") · 04/06/2026 (ELA 2tri "The Animal Inquiry")

> NOTA v2 (a partir de 02/06/2026): a estrutura de pastas evoluiu para o modelo de
> 4 camadas descrito em `CLAUDE.md` (_processo / fontes / trabalho / ferramentas).
> O bloco "ESTRUTURA DE PASTAS" abaixo descreve o layout 1tri (historico, preservado).
> As secoes 2tri no fim deste arquivo refletem o estado real atual.

---

## ESTRUTURA DE PASTAS

```
provas/
|
|-- 00_COORDENACAO/                    <- Agente: Coordenador Pedagogico
|   |-- informativo_AFs_1trimestre_2026.png
|   |-- PROJETO_SERAFINA_Planejamento.docx   [MASTER - atualizar a cada etapa]
|   |-- TRANSCRICAO_Materiais_Escola.docx    [Transcricao dos prints da escola]
|   |-- preparacao_para_prova_original.docx
|   |-- taxonomia/
|       |-- MAPA_TAXONOMIA.md                [Este arquivo]
|
|-- 01_LINGUA_PORTUGUESA/              <- AF: 10/03/2026 | CONCLUIDA
|   |-- materiais_escola/
|
|-- 02_ELA_INGLES/                     <- AF: 18/03/2026 | CONCLUIDA
|   |-- materiais_escola/              <- fotos caderno + slides Toddle
|
|-- 03_HISTORIA/                       <- AF: 26/03/2026 | CONCLUIDA
|   |-- assets/                        <- audio/video NotebookLM (git-ignored, ~130MB)
|   |-- notebooklm/                    <- prompts para geracao de audio/video
|
|-- 04_CIENCIAS/                        <- AF: 07/04/2026 | CONCLUIDA
|   |-- notebooklm/                    <- fontes NLM (PDFs + MDs)
|
|-- 05_GEOGRAFIA/                      <- AF: ~14/04/2026 | CONCLUIDA
|   |-- notebooklm/                    <- fontes NLM (PDFs + MDs + INSTRUCOES_EXECUCAO.md)
|
|-- ferramentas/                       <- TODOS os HTMLs aqui (desde sessao 7)
|   |-- LP01..LP08*.html               <- 6 ferramentas LP
|   |-- ELA01..ELA06*.html             <- 6 ferramentas ELA
|   |-- HIS01..HIS03*.html             <- 3 ferramentas HIS
|   |-- CIE_mindmap.html               <- mapa mental CIE
|   |-- CIE_flashcards.html            <- flashcards CIE
|   |-- GEO_mindmap.html               <- mapa mental GEO
|   |-- GEO_flashcards.html            <- flashcards GEO (29 cards)
|   |-- GEO01_classifique.html         <- jogo classificacao tap-to-select (3 fases)
|   |-- media/                         <- videos MP4, PDFs NLM, JSONs de dados
|
|-- planejamento/                      <- git-ignored
```

---

## CONVENCAO DE NOMENCLATURA

### Ferramentas HTML
`[CODIGO]-[nome_slug].html`
- LP-05_ordem_alfabetica.html
- ELA-01_acrostic_poem.html

### Imagens de Material Escolar
`[DISCIPLINA]_[descricao_slug].png`
- LP_ordem_alfabetica_instrucoes.png

### Documentos Word
`[TIPO]_[Titulo_Slug].docx`
- PROJETO_SERAFINA_Planejamento.docx
- TRANSCRICAO_Materiais_Escola.docx

---

## CODIGOS DE CONTEUDO

| Codigo    | Conteudo                         | Disciplina | Data AF   | Status    | Arquivo                          |
|-----------|----------------------------------|------------|-----------|-----------|----------------------------------|
| LP-01     | Genero Textual - Diario          | Portugues  | 10/03     | CONCLUIDA | LP01_genero_textual_diario.html  |
| LP-02/03  | Personagem Serafina              | Portugues  | 10/03     | CONCLUIDA | LP02-03_personagem_serafina.html |
| LP-04/07  | Maiuscula e Minuscula            | Portugues  | 10/03     | CONCLUIDA | LP04-07_maiuscula_minuscula.html |
| LP-05     | Ordem Alfabetica                 | Portugues  | 10/03     | CONCLUIDA | LP05_ordem_alfabetica.html       |
| LP-06     | Separacao Silabica               | Portugues  | 10/03     | CONCLUIDA | LP06_separacao_silabica.html     |
| LP-08     | Escrita: Meu Esconderijo         | Portugues  | 10/03     | CONCLUIDA | LP08_meu_esconderijo.html        |
| ELA-01    | Community Helpers                | Ingles     | 18/03     | CONCLUIDA | ELA01_community_helpers.html     |
| ELA-02    | Bucket Fillers & Community       | Ingles     | 18/03     | CONCLUIDA | ELA02_bucket_fillers.html        |
| ELA-03    | Adjectives & Acrostic Poem       | Ingles     | 18/03     | CONCLUIDA | ELA03_acrostic_adjectives.html   |
| ELA-04    | Family & Friends                 | Ingles     | 18/03     | CONCLUIDA | ELA04_family_friends.html        |
| ELA-05    | Reading & Interpreting           | Ingles     | 18/03     | CONCLUIDA | ELA05_reading.html               |
| ELA-06    | Toddle Dashboard (opcional)      | Ingles     | 18/03     | CONCLUIDA | ELA06_toddle_optional.html       |
| HIS-01    | Instrumentos do Tempo            | Historia   | 26/03     | CONCLUIDA | HIS01_instrumentos_do_tempo.html |
| HIS-02    | Linha do Tempo                   | Historia   | 26/03     | CONCLUIDA | HIS02_linha_do_tempo.html        |
| HIS-03    | Tempo e Memorias                 | Historia   | 26/03     | CONCLUIDA | HIS03_tempo_e_memorias.html      |
| CIE    | Mapa Mental Ciencias             | Ciencias   | 07/04     | CONCLUIDA | CIE_mindmap.html                 |
| CIE    | Flashcards Ciencias (45 cards)   | Ciencias   | 07/04     | CONCLUIDA | CIE_flashcards.html              |
| GEO    | Mapa Mental Geografia            | Geografia  | ~14/04    | CONCLUIDA | GEO_mindmap.html                 |
| GEO    | Flashcards Geografia (29 cards)  | Geografia  | ~14/04    | CONCLUIDA | GEO_flashcards.html              |
| GEO-01 | Classifique! (3 fases)           | Geografia  | ~14/04    | CONCLUIDA | GEO01_classifique.html           |
| GEO-02 | Quem Sou Eu? (8 enigmas)         | Geografia  | ~14/04    | CONCLUIDA | GEO02_quem_sou_eu.html           |

---

### Complementos (nao sao ferramentas HTML)
| Tipo      | Conteudo                         | Disciplina | Status    | Local                            |
|-----------|----------------------------------|------------|-----------|----------------------------------|
| Audio     | Podcast Historia U1 (v2, 6min)   | Historia   | GERADO    | 03_HISTORIA/assets/audio_*_v2.mp3|
| Video     | Video Historia U1 (v2)           | Historia   | GERADO    | 03_HISTORIA/assets/video_*_v2.mp4|
| Video     | Video Ciencias NB1 PT+EN         | Ciencias   | GERADO    | ferramentas/media/video_ciencias_nb1_*.mp4|
| Video     | Video Ciencias NB2 PT+EN         | Ciencias   | GERADO    | ferramentas/media/video_ciencias_nb2_*.mp4|
| PDF       | Apresentacao Ciencias NB1/NB2    | Ciencias   | GERADO    | ferramentas/media/apresentacao_ciencias_nb*.pdf|
| Video     | Video GEO NB1 PT — "Uma Jornada Pelo Seu Dia e Ano" (36MB) | Geografia  | GERADO    | ferramentas/media/video_geo_nb1_pt.mp4|
| Video     | Video GEO NB2 PT — "Um Mundo de Culturas" (38MB)          | Geografia  | GERADO    | ferramentas/media/video_geo_nb2_pt.mp4|
| PDF       | Apresentacao GEO NB1 — "A Tela dos Ciclos" (13MB)         | Geografia  | GERADO    | ferramentas/media/apresentacao_geo_nb1.pdf|
| PDF       | Apresentacao GEO NB2 — "Atlas Cultural do Mundo" (18MB)   | Geografia  | GERADO    | ferramentas/media/apresentacao_geo_nb2.pdf|
| Quiz      | Quiz GEO NB1 (10 perguntas — periodos + estacoes)          | Geografia  | GERADO    | ferramentas/media/quiz_geo_nb1.html|
| Quiz      | Quiz GEO NB2 (10 perguntas — povos + culturas + espaco)    | Geografia  | GERADO    | ferramentas/media/quiz_geo_nb2.html|
| Quiz      | Quiz GEO NB3 (orientacao espacial)                         | Geografia  | GERADO    | ferramentas/media/quiz_geo_nb3.html|

---

## 2o TRIMESTRE 2026 — EM ANDAMENTO

**Calendario AF 2tri:** Portugues 03/06 (passou) · ELA 11/06 · Historia 16/06 · Science 25/06 · Geografia 11/08 · Math 19/08.

**Politica de ciclo de vida (v2):** produto serve ate a prova; pos-prova apaga-se o pesado
(video/audio/PDF), preserva-se o aprendizado. Ex: `video_lp2_pt.mp4` foi APAGADO apos a prova de PT (03/06).

### PORTUGUES 2tri (prova 03/06 — PASSOU)
Produtos retirados do ar / arquivados conforme politica. HTMLs leves permanecem em `ferramentas/`
(LP_apostila.html, LP2_quiz.html, LP2_mindmap.html, player_aula.html) mas NAO estao mais
linkados no index.html (bloco PT removido). Video `video_lp2_pt.mp4` apagado.

### INGLES — ELA 2tri "The Animal Inquiry" (Unit 4, prova 11/06) — CONCLUIDA
Materia EN bilingue (ingles principal + traducao PT). Padrao documentado em `memory/padrao_en_bilingue.md`.

| Codigo    | Conteudo                              | Disciplina | Data AF | Status    | Arquivo                  |
|-----------|---------------------------------------|------------|---------|-----------|--------------------------|
| ELA2-SIM  | Simulado — 162 questoes, 6 tipos, seletor de temas + quantidade (5/10/25/50/100, default 25), foco Grupos de Animais, refazer erradas/novo/menu. EN + flag BR p/ PT | Ingles | 11/06 | CONCLUIDA | ELA2_simulado.html |
| ELA2-RES  | Resumo + Dicas (folha de estudo bilingue, secoes colapsaveis) | Ingles | 11/06 | CONCLUIDA | ELA2_resumo.html |
| ELA2-MM   | Mapa Mental (6 topicos, EN+PT)        | Ingles     | 11/06   | CONCLUIDA | ELA2_mindmap.html        |
| ~~ELA2-PAL~~ | ~~Palacio das Memorias~~ — DESCONTINUADO (metafora dificil p/ 7 anos), apagado (commit 36a2d87) | Ingles | — | REMOVIDO | — |
| ELA2-GAL  | Galeria — Imagens e Insumos da turma  | Ingles     | 11/06   | CONCLUIDA | ELA2_galeria.html        |

**Complementos ELA 2tri:**
| Tipo   | Conteudo                                            | Status  | Local                                  |
|--------|-----------------------------------------------------|---------|----------------------------------------|
| Video  | Video Revisao "The Animal Inquiry" (NLM, 47MB)      | GERADO  | ferramentas/media/video_ela2_animals.mp4|
| Insumos| 7 JPGs (posteres) + 5 PDFs (worksheets) da turma    | NO AR   | ferramentas/media/ela_insumos/ (linkados via ELA2_galeria.html)|

**index.html (estado 04/06/2026):** titulo renomeado "Projeto Serafina" -> "Revisao"; bloco PT
removido; bloco ELA no topo (video hero + 4 ferramentas) + link "Arquivo do 1o Trimestre".
`sw.js` cache atualizado v4 -> v5.

**Fontes versionadas:** `trabalho/2tri_ingles/` (_outline_pedagogico.md, nlm_source_ela_unit4.md,
_simulado_banco.md na raiz; materiais brutos em conteudo/ — gitignored).

**Commit da entrega:** `06ff844`. Navegacao validada: todos os Home -> `../index.html`
(via location.href ou goToIndex/showHomeModal de base.js); galeria referencia os 12 insumos (0 orfaos).

---

### HISTORIA — HIS 2tri "Memoria e Historia" (Unidade 2, prova 16/06) — CONCLUIDA
Materia PT puro (sem traducao — historia/geografia/portugues seguem PT). Temas da prova:
evolucao dos registros (jornal -> redes), documentos pessoais, festas/tradicoes do Brasil,
linha do tempo e memoria. Padrao de produtos espelha o de ELA 2tri (simulado + resumo +
mindmap + galeria), porem em portugues.

| Codigo    | Conteudo                              | Disciplina | Data AF | Status    | Arquivo                  |
|-----------|---------------------------------------|------------|---------|-----------|--------------------------|
| HIS2-SIM  | Simulado — 125 questoes, 6 tipos (incl. tipo novo "Ordenar"/linha do tempo), seletor de temas + quantidade (5 a 100). PT puro | Historia | 16/06 | CONCLUIDA | HIS2_simulado.html |
| HIS2-RES  | Resumo + Dicas (folha de estudo, secoes colapsaveis, TTS ouvir) | Historia | 16/06 | CONCLUIDA | HIS2_resumo.html |
| HIS2-MM   | Mapa Mental (5 ramos colapsaveis, importa base.css/base.js) | Historia | 16/06 | CONCLUIDA | HIS2_mindmap.html |
| HIS2-GAL  | Galeria — Imagens e Insumos da turma (registros, documentos, festas) | Historia | 16/06 | CONCLUIDA | HIS2_galeria.html |

**Complementos HIS 2tri:**
| Tipo   | Conteudo                                            | Status        | Local                                  |
|--------|-----------------------------------------------------|---------------|----------------------------------------|
| Video  | Video Revisao "Memoria e Historia" (NLM, PT)        | PENDENTE/GERANDO | ferramentas/media/video_his2_memoria.mp4 (notebook 5f43f615, artifact 8d7a889d) |
| Insumos| 16 JPGs (registros_*, doc_*, festa_*)               | NO AR         | ferramentas/media/his_insumos/ (linkados via HIS2_galeria.html) |

**index.html (estado 12/06/2026):** bloco Historia no TOPO (acima de ELA). Card de video
hero presente porem em estado "Em breve" (opacity .6, sem href) ate o NLM concluir — quando
o MP4 baixar, trocar o card por link real para `ferramentas/media/video_his2_memoria.mp4`.
`sw.js` cache atualizado v6 -> v7.

**Fontes versionadas:** `trabalho/2tri_historia/` — `_roteiro.md` (validado pelo pedagogico)
e `nlm_source_his2.md` (fonte de narracao do video) estao versionados. Materiais brutos
(3 PDFs Toddle + 1 JPEG WhatsApp) estao na RAIZ de `trabalho/2tri_historia/` e NAO estao
gitignored (ver recomendacao abaixo).

**Navegacao validada:** simulado/resumo/galeria usam `location.href='../index.html'`;
mindmap usa `showHomeModal()` de base.js -> goToIndex -> index.html. Galeria referencia
os 16 insumos via `DIR="media/his_insumos/"` (0 orfaos). Todos os 16 JPGs tracked no git.

---

### SCIENCE — CIE 2tri "Properties of Matter" (prova 25/06) — CONCLUIDA (17/06/2026)
Materia EN bilingue (ingles principal + bandeira BR liga traducao PT). Temas da prova:
tres estados da materia (solido/liquido/gas) e suas propriedades, arranjo de particulas,
opaco/translucido/transparente (see-through), absorver/repelir liquidos. Padrao de produtos
espelha ELA 2tri / HIS 2tri (simulado + resumo + mindmap + galeria), em ingles com traducao PT.

| Codigo    | Conteudo                              | Disciplina | Data AF | Status    | Arquivo                  |
|-----------|---------------------------------------|------------|---------|-----------|--------------------------|
| CIE2-SIM  | Simulado — banco de questoes multi-tipo, seletor de temas + quantidade. EN + flag BR p/ PT | Science | 25/06 | CONCLUIDA | CIE2_simulado.html |
| CIE2-RES  | Resumo + Dicas (folha de estudo bilingue, secoes colapsaveis, TTS) | Science | 25/06 | CONCLUIDA | CIE2_resumo.html |
| CIE2-MM   | Mapa Mental (ramos colapsaveis, EN+PT, importa base.css/base.js) | Science | 25/06 | CONCLUIDA | CIE2_mindmap.html |
| CIE2-GAL  | Galeria — Imagens e Insumos da turma (estados, particulas, see-through, absorb/repel) | Science | 25/06 | CONCLUIDA | CIE2_galeria.html |
| CIE2-DRAG | Sort it! — Drag & Drop: 6 jogos de classificacao em sequencia (1 States–Properties, 2 Particles–Arrangement, 3 Light see-through transparent/translucent/opaque, 4 Absorb/Repel, 5 Examples–which state, 6 Heating/Cooling mudanca de estado). Arrastar/tocar cartas para a coluna certa, "Check answers" verde/vermelho, "Redo wrong" devolve so as erradas. EN + flag BR p/ PT. Espelha padrao do CIE2_simulado (navbar inline, tema, A+/A- via --fs, lock, starfield, TTS en-US). Dados do _roteiro.md, validado por pedagogico (3 correcoes) e ti (41/41 PASS) | Science | 25/06 | CONCLUIDA | CIE2_dragdrop.html |

**Complementos CIE 2tri:**
| Tipo   | Conteudo                                            | Status        | Local                                  |
|--------|-----------------------------------------------------|---------------|----------------------------------------|
| Video  | Video Revisao "States of Matter" (NLM, PT + palavras-chave EN) | PENDENTE/GERANDO (notebook 10bbe556, regenerando apos 1a falha) | ferramentas/media/video_cie2_*.mp4 (a definir) |
| Insumos| 7 imagens (PNG/JPEG) + 1 PDF (notebook), reais da turma | NO AR      | ferramentas/media/cie_insumos/ (linkados via CIE2_galeria.html) |

**Pasta de trabalho:** renomeada `trabalho/2_tri sciencias` -> `trabalho/2tri_ciencias`
(padrao `<tri>_<mat>` do CLAUDE.md). Versionados: `_roteiro.md` (validado pelo pedagogico)
e `nlm_source_cie2.md`. Brutos Toddle (7 PNG/JPEG + 1 PDF) na raiz da pasta, gitignored via
regra `trabalho/**/Toddle-*`.

**index.html (estado 17/06/2026):** bloco Science no TOPO (chip "prova 25/06"). Card de video
hero `#cie-video-card` em estado "Em breve" (opacity .6, sem href) ate o NLM concluir — quando
o MP4 baixar, trocar por link real. `sw.js` cache atualizado v9 -> v10.

**Navegacao/galeria validada:** os 4 produtos linkados em `index.html` com href
`ferramentas/CIE2_*.html` (0 quebrados). Galeria referencia os 8 insumos via
`DIR="media/cie_insumos/"` — mapeamento 1:1 com os arquivos em disco (0 orfaos);
todos os 8 insumos tracked no git. Commit da entrega: `ecb93ea` (push ok em main).

**Adendo 23/06/2026 — nova ferramenta CIE2-DRAG (no ar):** entregue `CIE2_dragdrop.html`
(commit `04e8437`), jogo de drag & drop de classificacao com 6 jogos em sequencia (ver tabela
acima). Validado por pedagogico (3 correcoes aplicadas) e ti (41/41 PASS). Adicionada ao
`index.html` como card no grupo "Study & practise" (href `ferramentas/CIE2_dragdrop.html`,
class `tool-card-sm ready`), preservando os demais cards. `sw.js` cache bumpado v14 -> v15.
Science 2tri agora tem 5 produtos HTML (SIM/RES/MM/GAL/DRAG).
