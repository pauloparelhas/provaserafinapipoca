# PROJETO SERAFINA - MAPA DE TAXONOMIA
**Responsavel:** Agente Coordenador Pedagogico
**Atualizado em:** 04/06/2026 (ELA 2tri "The Animal Inquiry" entregue — ver secao 2tri no fim)

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
