# PROJETO SERAFINA - MAPA DE TAXONOMIA
**Responsavel:** Agente Coordenador Pedagogico
**Atualizado em:** 09/08/2026 (GEOGRAFIA 2tri "Expedicao Brasil" entregue — 9 produtos GEO2 sobre serafina-core/serafina-adventure + gate de legitimidade de escolhas; rediagramacao dos 9 produtos + index, sw v24)
**Historico:** 05/07/2026 (REFATORACAO GERAL: infra kid compartilhada serafina-core.* + motor serafina-adventure.js + CIE2_data.js; novos produtos CIE2_aventura "Matter Quest" e CIE2_estudo "Study Hub"; sesilab e resumo/superrevisao/mindmap removidos; index por modalidade; sw v22) · 01/07/2026 (SESILAB laboratorio interativo) · 24/06/2026 (INFRA CIE2 reutilizavel: cie2_theme.js [seletor de tema compartilhado + bandeira BR SVG] e cie2_summary.js [modal resumo/gabarito]; melhoria no Pop it!) · 17/06/2026 (SCIENCE 2tri "Properties of Matter" entregue) · 12/06/2026 (HISTORIA 2tri "Memoria e Historia") · 04/06/2026 (ELA 2tri "The Animal Inquiry")

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
| CIE2-POP  | Pop it! — Balloon Pop: jogo de estourar baloes por alvo. Cada jogo do drag&drop vira um NIVEL; cada coluna vira uma RODADA-alvo; a crianca fura os baloes que combinam com o alvo. WebAudio (plim acerto / erro), caneta que segue o ponteiro, cores pastel. Mesmo banco validado do drag&drop. Funcionalidades padrao: cadeado, bandeira BR, A+/A-, tema, som on/off, setas de nivel. EN + flag BR p/ PT | Science | 25/06 | CONCLUIDA | CIE2_popit.html |

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

**Adendo 24/06/2026 — nova ferramenta CIE2-POP + melhoria no simulado (no ar):**
Commit `beb01ae`, `sw.js` cache bumpado para v17.
- NOVA: `CIE2_popit.html` "Pop it! — Balloon Pop" (ver tabela acima). Cada jogo do drag&drop
  vira um nivel; cada coluna vira uma rodada-alvo; a crianca fura os baloes que combinam com
  o alvo. WebAudio (plim/erro), caneta que segue o ponteiro, cores pastel, mesmo banco validado
  do drag&drop. Funcionalidades padrao: cadeado, bandeira BR, A+/A-, tema, som on/off, setas de
  nivel. Adicionada ao `index.html` como card "Pop it!" no grupo "Study & practise"
  (href `ferramentas/CIE2_popit.html`, class `tool-card-sm ready`, icone &#x1F388;).
- MELHORIA: `CIE2_simulado.html` ganhou botao "Sem resposta" (pula para a proxima questao nao
  respondida; habilitado so quando ha outra pendente).
Science 2tri agora tem 6 produtos HTML (SIM/RES/MM/GAL/DRAG/POP).

**Adendo 24/06/2026 (rodada 2) — INFRA reutilizavel CIE2 + melhoria do Pop it (no ar):**
Commits `beb01ae`->`91075f7`, `sw.js` cache bumpado para v18.

*Dois novos modulos compartilhados (INFRA — NAO sao ferramentas, mas codigo reutilizavel CIE2),
ambos em `ferramentas/`:*

| Modulo (INFRA) | Tipo | Funcao | Usado por | Arquivo |
|----------------|------|--------|-----------|---------|
| CIE2-THEME | JS compartilhado | Seletor de tema visual (Noite/Dia/Castelo/Praia/Natureza); substitui o rotulo "BR PT" por bandeira do Brasil em SVG; persiste em localStorage `cie2_theme`. Plugado nas 6 guias CIE2 (1 linha antes de `</body>`). | dragdrop, popit, simulado, resumo, galeria, mindmap (6/6) | cie2_theme.js |
| CIE2-SUMMARY | JS compartilhado | Modal estruturado "Ver resumo/gabarito" (resumo + respostas corretas). | popit, dragdrop | cie2_summary.js |

> Observacao de taxonomia: estes dois `.js` sao INFRA CIE2 (analogos a `base.*`/`ela-base.*`,
> porem especificos da disciplina/trimestre). Nao recebem codigo "CONCLUIDA" de ferramenta —
> sao dependencias compartilhadas das ferramentas Science 2tri. Convencao de nome observada:
> `cie2_<funcao>.js` (minusculas, prefixo da disciplina+trimestre).

*Melhorias nas ferramentas:*
- `CIE2_popit.html` (Pop it!): a crianca agora CONFIRMA a conclusao via botao "I popped them all!"
  (o jogo nao conclui sozinho); titulo do alvo em pilula com contraste automatico; baloes em
  formato de festa; botao "Ver resumo" (usa cie2_summary.js). Reforca o padrao do projeto
  "nunca avancar/concluir automaticamente — sempre acao explicita da crianca".
- `CIE2_dragdrop.html` (Sort it!): botao "Ver resumo" (usa cie2_summary.js).
- As 6 guias CIE2 (dragdrop/popit/simulado/resumo/galeria/mindmap) passaram a importar
  `cie2_theme.js`.

Science 2tri continua com 6 produtos HTML (SIM/RES/MM/GAL/DRAG/POP) + 2 modulos INFRA
compartilhados (cie2_theme.js, cie2_summary.js).

**Adendo 01/07/2026 — NOVO TIPO DE PRODUTO: "laboratorio interativo" (SESILAB) (no ar):**
`sw.js` cache bumpado para v20. Primeiro produto de um tipo inedito no projeto: um
**laboratorio interativo imersivo** rodando num motor 3D proprio (SESILAB, portado do projeto
Pratico), distinto dos joguinhos/simulados/mapas ate aqui. Vive em sub-pasta propria
`ferramentas/sesilab/` com COPIA PROPRIA do motor (nao usa nem duplica `base.*`/`ela-base.*`).

| Codigo    | Conteudo                              | Disciplina | Data AF | Status    | Arquivo                  |
|-----------|---------------------------------------|------------|---------|-----------|--------------------------|
| CIE2-LAB  | Serafina Lab "Properties of Matter" — laboratorio interativo com 7 modulos: (1) three states, (2) particles (simulacao de calor: slider liga particulas ao estado), (3) which state(s)? (classificar Solid/Liquid/BOTH — fecha a Q5 da prova, propriedade compartilhada), (4) change of state, (5) light (opaque/translucent/transparent), (6) absorb/repel, (7) review. Casca kid Serafina: bilingue EN + bandeira BR (traducao PT), TTS en-US, alvos >=44px, tema starfield escuro, erro revela a verdade (nunca pune). EN + flag BR p/ PT | Science | 25/06 | CONCLUIDA | sesilab/cie2.html |

**Estrutura da sub-pasta `ferramentas/sesilab/` (produto auto-contido):**
```
ferramentas/sesilab/
  cie2.html              <- o laboratorio (importa apenas assets/sesilab.css + assets/sesilab.js)
  index.html             <- sumario do lab (lista os laboratorios; linka cie2.html)
  assets/
    sesilab.js           <- motor SESILAB (import local de ./assets/three.module.js)
    sesilab.css          <- estilos do motor
    three.module.js      <- three.js (WebGL 3D), ~1.2MB, copia local
  _labplan/
    cie2.md              <- diagnostico pedagogico do lab (7 eixos -> bloco; Top-3 prioridades)
```

> Observacao de taxonomia: o SESILAB e um **motor proprio** (nivel de `base.*`/`ela-base.*`,
> porem auto-contido na sub-pasta do produto). E CORRETO que tenha copia propria de
> assets — nao deve importar nem duplicar `base.*`/`ela-base.*` (motor incompativel, portado
> de outro projeto). Convencao observada: HTML do lab nomeado pela disciplina+trimestre
> (`cie2.html`), assets genericos do motor sem prefixo (`sesilab.*`).

**index.html principal (estado 01/07/2026):** card hero "Serafina Lab — Interactive Lab"
adicionado (href `ferramentas/sesilab/cie2.html`, class `tool-card-hero`, icone microscopio
&#x1F52C;), preservando os demais cards.

**Nota de cobertura pedagogica:** viscosidade foi DELIBERADAMENTE deixada de fora do lab —
nao constava de nenhum insumo; inclui-la so por ter caido na prova fisica seria "conta de
chegada" (retrofit de prova ja vista). Registrado no `_labplan/cie2.md`. NAO e topico coberto.

Science 2tri agora tem 6 produtos HTML classicos (SIM/RES/MM/GAL/DRAG/POP) + 1 laboratorio
interativo (CIE2-LAB, sesilab/cie2.html) + 2 modulos INFRA (cie2_theme.js, cie2_summary.js).

**Adendo 05/07/2026 — REFATORACAO GERAL (5 commits: 9f1a076, 0966571, 58cd847, ae19f40, 53fae89):**
`sw.js` cache bumpado para v22. Reorganizacao pos-prova de Science 2tri: extracao de infra
compartilhada, novo motor de jogo de fases, fusao de 3 produtos de estudo em 1 hub, e
remocao do sesilab e do video (politica de ciclo de vida pos-prova).

*NOVOS modulos INFRA (nivel projeto, NAO especificos de CIE2 — reutilizaveis nas proximas
materias), em `ferramentas/`:*

| Modulo (INFRA) | Tipo | Funcao | Arquivo |
|----------------|------|--------|---------|
| SERAFINA-CORE | JS+CSS compartilhados | Infra kid compartilhada: starfield, lock (cadeado + #unlockov), TTS `say`, bandeira BR, A+/A-, `goHome` (-> `../index.html`). Substitui codigo inline duplicado entre as guias. | serafina-core.js + serafina-core.css |
| SERAFINA-ADVENTURE | JS compartilhado | Motor GENERICO de jogo de fases / mastery loop. Replicavel por materia: cada materia define um objeto `ADVENTURE` proprio e importa o motor. | serafina-adventure.js |
| CIE2-DATA | JS de dados (CIE2) | Banco GAMES UNICO consumido por dragdrop E popit (antes duplicado em cada HTML). Convencao: `<COD><tri>_data.js`. | CIE2_data.js |

> Observacao de taxonomia: `serafina-core.*` e `serafina-adventure.js` sao INFRA de nivel
> projeto (analogos a `base.*`/`ela-base.*`), prefixo `serafina-` em minusculas. `CIE2_data.js`
> e dado da disciplina (prefixo maiusculo da ferramenta, como os HTML CIE2_*).

*NOVOS produtos:*

| Codigo    | Conteudo                              | Disciplina | Data AF | Status    | Arquivo                  |
|-----------|---------------------------------------|------------|---------|-----------|--------------------------|
| CIE2-AVT  | Matter Quest — AVENTURA: jogo de fases (6 fases + 2 bosses) sobre o motor serafina-adventure.js. Substitui o sesilab como produto imersivo. Destaque (hero) no index | Science | 25/06 (pos-prova) | CONCLUIDA | CIE2_aventura.html |
| CIE2-EST  | Study Hub — 3 abas fundindo os antigos resumo + super revisao + mind map num unico produto de estudo | Science | 25/06 (pos-prova) | CONCLUIDA | CIE2_estudo.html |
| EXTRA     | Relogio das Princesas (extra ludico, standalone, SEM card no index; movido da raiz do repo para ferramentas/) | Extra | — | NO AR (sem card) | relogio_princesas.html |

*REMOVIDOS (nada perdido — licoes preservadas):*
- `ferramentas/sesilab/` INTEIRA (motor 3D + cie2.html + assets): apagada do git (commit
  53fae89). Licao/diagnostico preservado em `_arquivo_1tri/sesilab_labplan_cie2.md`.
  O registro CIE2-LAB do adendo 01/07 acima passa a status REMOVIDO/ARQUIVADO.
- `CIE2_resumo.html`, `CIE2_superrevisao.html`, `CIE2_mindmap.html`: FUNDIDOS no Study Hub
  (CIE2_estudo.html, 3 abas). Nota: CIE2_superrevisao.html (mural de palavras-chave, criado
  ~24-25/06) nunca chegou a ser registrado nas tabelas deste mapa — registrado aqui apenas
  como origem da fusao.
- `ferramentas/media/video_cie2_matter.mp4`: apagado conforme politica pos-prova (video pesado
  sai, aprendizado fica).
- Raiz do repo: pasta local "provas fisicas/" movida para `fontes/2tri/CIE/` (gitignored,
  fora do git — contem a prova fisica escaneada).

*index.html (estado 05/07/2026):* reorganizado por MODALIDADE — "Jogar" (Aventura hero +
Pop it + Sort it), "Testar" (Simulado), "Estudar" (Study Hub + Galeria). Aventura como card
destaque. `sw.js` v22 com BASE_FILES em caminhos RELATIVOS (bugfix: caminhos absolutos
quebravam o install no subpath do GitHub Pages /provaserafinapipoca/) + pre-cache de
serafina-core.css/js e serafina-adventure.js.

**Estado final Science 2tri (pos-refatoracao):** 6 produtos HTML no ar
(AVENTURA/ESTUDO/SIM/GAL/DRAG/POP) + 1 extra sem card (relogio_princesas) + 5 modulos INFRA
(serafina-core.js/css, serafina-adventure.js, CIE2_data.js, cie2_theme.js, cie2_summary.js).
Removidos: sesilab, resumo, superrevisao, mindmap (fundidos/arquivados), video.

---

### GEOGRAFIA — GEO2 2tri "Expedicao Brasil" (Unidade 2 — Diferentes comunidades e sua
relacao com os lugares, prova 11/08) — CONCLUIDA (09/08/2026)

Materia PT pura (sem versao EN — Geografia segue a regra PT puro de Historia/Portugues).
Prefixo `GEO2_`. Todos os produtos vivem em `ferramentas/` e ja NASCEM sobre a infra
pos-refatoracao de 05/07: importam `serafina-core.css/js` (starfield/lock/TTS/A+A-/goHome)
+ `cie2_theme.js` (seletor de tema + bandeira BR SVG, reaproveitado apesar do nome
"cie2" — e INFRA de nivel projeto, nao exclusiva de Science). O produto de fases
(GEO2-AVT) roda sobre `serafina-adventure.js` (motor generico de jogo de fases, primeira
replicacao do motor fora de Science, confirmando a tese de reuso do adendo 05/07).

| Codigo    | Conteudo                              | Disciplina | Data AF | Status    | Arquivo                  |
|-----------|---------------------------------------|------------|---------|-----------|--------------------------|
| GEO2-AVT  | Expedicao Brasil — AVENTURA: jogo de fases (7 fases + 2 chefes, 58 perguntas) sobre serafina-adventure.js. PT puro | Geografia | 11/08 | CONCLUIDA | GEO2_aventura.html |
| GEO2-SIM  | Simulado — 137 questoes, 6 tipos (mc/vf/completar/ligar/ordenar/aberta), seletor de tema e de tamanho | Geografia | 11/08 | CONCLUIDA | GEO2_simulado.html |
| GEO2-DRAG | Sort it! — arrasta e classifica, banco `GEO2_data.js` | Geografia | 11/08 | CONCLUIDA | GEO2_dragdrop.html |
| GEO2-POP  | Pop it! — estoura o balao, mesmo banco `GEO2_data.js` do drag&drop | Geografia | 11/08 | CONCLUIDA | GEO2_popit.html |
| GEO2-EST  | Estudar — 3 abas: folha de estudo / palavras-chave / mapa mental (Study Hub, mesmo padrao do CIE2-EST) | Geografia | 11/08 | CONCLUIDA | GEO2_estudo.html |
| GEO2-FC   | Flashcards — 46 cartas curadas, com rodada de revisao do que errou | Geografia | 11/08 | CONCLUIDA | GEO2_flashcards.html |
| GEO2-NLM  | Quiz explicado (10 questoes com o porque de cada alternativa) + revisao rapida (65 cartas), gerados a partir do NotebookLM | Geografia | 11/08 | CONCLUIDA | GEO2_nlm.html |
| GEO2-VID  | Video da unidade (NotebookLM, pt_BR kawaii, 4min22) + sumario na ordem | Geografia | 11/08 | CONCLUIDA | GEO2_video.html |
| GEO2-GAL  | Galeria — 15 figuras do material + PDF completo da professora; lightbox com navegacao ‹ › | Geografia | 11/08 | CONCLUIDA | GEO2_galeria.html |

*Modulo/dado novo desta materia:*

| Modulo | Tipo | Funcao | Usado por | Arquivo |
|--------|------|--------|-----------|---------|
| GEO2-DATA | JS de dados (Geografia) | Banco UNICO compartilhado entre dragdrop e popit (mesmo padrao de CIE2_data.js). Convencao confirmada: `<COD><tri>_data.js`. | dragdrop, popit | GEO2_data.js |

*Infra de PROCESSO nova (nao sao ferramentas do site — vivem em `_processo/geracao/`,
uso interno de producao/QA, nao publicadas em `ferramentas/`):*

| Script | Funcao |
|--------|--------|
| `extrai_escolhas.js` | Extrai do banco de questoes toda escolha entre alternativas (mc/ligar/etc.) para auditoria. |
| `audita_escolhas.js` | GATE de legitimidade de TODA escolha entre alternativas — 5 regras: R1 fusao (alternativas que na verdade sao a mesma coisa), R2 sem lastro (nao vem do insumo), R3 dois donos (duas alternativas defensaveis como certas), R4 gabarito (gabarito inconsistente com o enunciado), R5 nao cobravel (fora do que a prova pode cobrar). Roda ANTES de declarar a materia pronta — nasceu do adendo 09/08 (rediagramacao) mas e regra permanente de QA de banco de questoes daqui pra frente. |
| `validate_geo.js` | Validador do banco/estrutura de dados GEO2 (dragdrop/popit). |
| `validate_geo_sim.js` | Validador do banco do simulado GEO2 (137 questoes, 6 tipos). |
| `nlm_geo2.py` | Script de geracao/orquestracao NotebookLM especifico de Geografia 2tri (quiz explicado + revisao rapida + video). |

> Observacao de taxonomia: diferente dos modulos INFRA de `ferramentas/` (que sao codigo
> RUNTIME importado pelas paginas), estes 5 scripts sao infra de PROCESSO (rodam no
> pipeline de producao/QA, nao no navegador da crianca) — por isso vivem em
> `_processo/geracao/` e nao em `ferramentas/`.

**index.html / sw.js:** os 9 produtos GEO2 linkados em `index.html` com href
`ferramentas/GEO2_*.html`. `sw.js` cache bumpado (ver adendo abaixo, v23 -> v24).

**Adendo 09/08/2026 — REDIAGRAMACAO dos 9 produtos + index (no ar):**
Passada de QA de layout pos-entrega sobre os 9 produtos GEO2 + `index.html`:
- Linha de tarefa (`.task`) em cada tela dizendo explicitamente o que fazer naquela tela.
- Hierarquia visual redesenhada com a pergunta dominante em destaque por tela.
- Layout de PAISAGEM de celular reorganizado em 2 colunas (antes so retrato era tratado).
- Breakpoint de NOTEBOOK adicionado em 1000px (alem dos breakpoints mobile ja existentes).
- `prefers-reduced-motion` respeitado (animacoes suprimidas/reduzidas quando o SO pede).
- PT completo: restos de texto em ingles herdados do template de Ciencias removidos
  (os 9 produtos GEO2 sao PT puro — nenhum residuo EN deve sobrar da copia do template CIE2).
- Botao de som UNICO por barra de navegacao (antes havia risco de duplicidade de controle
  de som entre core e tema).
- `sw.js` cache bumpado v23 -> v24.
- Verificacao: todos os gates de legitimidade (`audita_escolhas.js`) verdes + QA de layout
  medido via Playwright (72 medicoes, 0 achados) + agente `ti` rodado sobre os 9 produtos.

**Regra permanente nova (QA automatizado de navegador):** todo QA automatizado de
navegador (Playwright ou similar) deve rodar MUDO — neutralizar `speechSynthesis` e
`AudioContext` ANTES da pagina carregar (ex.: via `addInitScript`/stub antes do primeiro
`goto`). O usuario nao autoriza som/voz automaticos disparando na maquina dele durante
testes automatizados. Aplica-se a QA de qualquer materia daqui pra frente, nao so GEO2.

**Estado final Geografia 2tri:** 9 produtos HTML no ar
(AVENTURA/SIM/DRAG/POP/ESTUDO/FLASHCARDS/NLM/VIDEO/GALERIA) + 1 modulo de dados
(GEO2_data.js) + 5 scripts de processo/QA (`_processo/geracao/`: extrai_escolhas.js,
audita_escolhas.js, validate_geo.js, validate_geo_sim.js, nlm_geo2.py). Primeira materia
PT pura a nascer inteira sobre serafina-core + serafina-adventure (confirma o motor de
fases como reutilizavel entre materias, nao exclusivo de Science).
