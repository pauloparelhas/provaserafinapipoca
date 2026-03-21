# PROJETO SERAFINA - MAPA DE TAXONOMIA
**Responsavel:** Agente Coordenador Pedagogico
**Atualizado em:** 21/03/2026

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
|-- ferramentas/                       <- TODOS os HTMLs aqui (desde sessao 7)
|   |-- LP01..LP08*.html               <- 6 ferramentas LP
|   |-- ELA01..ELA06*.html             <- 6 ferramentas ELA
|   |-- HIS01..HIS03*.html             <- 3 ferramentas HIS
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

### Complementos (nao sao ferramentas HTML)
| Tipo      | Conteudo                         | Disciplina | Status    | Local                            |
|-----------|----------------------------------|------------|-----------|----------------------------------|
| Audio     | Podcast Historia U1 (v2, 6min)   | Historia   | GERADO    | 03_HISTORIA/assets/audio_*_v2.mp3|
| Video     | Video Historia U1 (v2)           | Historia   | GERADO    | 03_HISTORIA/assets/video_*_v2.mp4|
