# Painel — Matemática 2º tri (prova 19/08/2026)

**Maple Bear Y2 · Unit 9: 2-D Geometry and Patterning · AP1 "Exploring 2-D Figures"**
Live: `pauloparelhas.github.io/provaserafinapipoca`

> A prova é **em inglês**. Todo produto segue a engenharia de Ciências: o conteúdo em EN
> é o texto principal e a tradução PT vive atrás do botão 🇧🇷 da barra de cima. O TTS lê
> em `en-US`. A casca de botões continua em português — quem lê é uma criança brasileira
> de 7 anos, e o que a prova cobra é o conteúdo.

## Produtos no ar (10)

| # | Produto | Arquivo | O que é |
|---|---|---|---|
| 1 | **Revisão** | `MAT2_estudo.html` | folha de estudo + palavras-chave + mapa mental (3 modos, 1 dado) |
| 2 | **Vídeo da unidade** | `MAT2_video.html` | 6min33 do NotebookLM, com o sumário conferido quadro a quadro |
| 3 | **Shape Lab** ⭐ novo | `MAT2_lab.html` | three.js: contar lado a lado, dobrar a letra na linha de simetria em 3D, e slide/flip/turn com fantasma |
| 4 | **Simulado** | `MAT2_simulado.html` | ~120 itens, 6 temas, 6 formatos (MC, V/F, completar, ligar, ordenar, aberta) |
| 5 | **Shape Quest** | `MAT2_aventura.html` | 7 fases + 2 chefes, com galeria SVG das figuras na lição da fase 1 |
| 6 | **Flashcards** | `MAT2_flashcards.html` | 7 baralhos, 61 cartas (`media/flashcards_mat2.json`) |
| 7 | **Quiz explicado** | `MAT2_nlm.html` | 10 perguntas do NLM com o porquê de CADA alternativa + 57 cartas de revisão |
| 8 | **Arrasta e classifica** | `MAT2_dragdrop.html` | 6 jogos de classificação (`MAT2_data.js`) |
| 9 | **Estoura o balão** | `MAT2_popit.html` | mesmos 6 jogos, outro formato |
| 10 | **Materiais da turma** | `MAT2_galeria.html` | as 9 páginas do caderno + o PDF com todas |

## Insumos

9 páginas do caderno Pearson *Math Makes Sense 2* (pp. 215, 216, 220, 221, 224, 227, 232, 233, 234)
postadas no Toddle + **as instruções oficiais da AP1** (10ª fonte, só no caderno do NotebookLM).
Inventário e decisões: `_roteiro.md`.

## NotebookLM

Caderno **`1d809265-42c8-404f-acc1-f63e454ae8bf`** ("Geometria no Cotidiano"), criado pelo Paulo
com as 9 imagens + o print da AP1. O pipeline subiu mais duas fontes (o `.md` consolidado e o
roteiro do vídeo) e gerou vídeo + quiz + flashcards.

Runner: `python _processo/geracao/nlm_mat2.py` (idempotente, estado em `notebooklm/_estado_nlm.json`).
**O login é automático:** o runner chama a escada `nlm_auth_garantir.py` do projeto Prático antes de
qualquer chamada. Não se pede login ao Paulo.

## Gates rodados

- `python _processo/geracao/qa_mat2.py` → **10/10 aprovados** em 3 viewports (360×640, 740×360,
  1280×800): zero erro de console, zero rolagem horizontal, zero alvo de toque abaixo de 40px.
  O QA roda **mudo** (Regra Zero) e sobe servidor HTTP local, porque produto que lê JSON por
  `fetch()` não roda em `file://`.
- Auditoria de conteúdo do quiz e dos flashcards do NLM, item a item: 1 reparo (um distrator
  contava o `circle` como figura de "0 lados", o que o roteiro proíbe).
- Sumário do vídeo conferido quadro a quadro (1 quadro a cada 20 s + checagens em 10 s e 50 s).

## Correção herdada

A barra de cima tinha 8 teclas de 44px numa linha só: a 8ª (o cadeado) nascia **cortada fora da
tela** a 360px — defeito que vinha do GEO2. Agora o título sobe para a própria linha e as teclas
dividem a largura.

## Fora do ar

Geografia (prova 11/08) e Ciências (prova 25/06) saíram da home. Os HTML continuam no repositório
como modelo; **os vídeos antigos de Geografia pesam 115 MB** (`video_geo2_nb1_pt.mp4` +
`_v1` + `_v2`) e são candidatos a apagar — decisão do Paulo.
