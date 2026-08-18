# RUNBOOK — Produzir uma matéria (replicável, do zero à entrega)

> Receita fixa. Toda prova nova repete **exatamente** estas etapas, na ordem.
> Detalhe conceitual em [`PIPELINE.md`](PIPELINE.md). Padrões de UI em [`ACESSIBILIDADE.md`](ACESSIBILIDADE.md) e [`GOVERNANCA.md`](GOVERNANCA.md).
> **Política:** produto serve até a prova; depois pode ser apagado — preserva-se só o aprendizado (ver `_arquivo_1tri/APRENDIZADOS_1TRI.md`).

## Mapa de pastas (onde cada coisa vive)
```
_processo/              ← como trabalhamos (imutável): pipeline, runbook, governança, geração
ferramentas/            ← SITE / deploy (o que vai pro GitHub Pages)
  serafina-*.css/js     ← design system compartilhado (NÃO duplicar)
  sera_theme.js         ← 5 temas · sera_summary.js ← modal de resumo
  assets/               ← three.module.js (r160, local; nunca CDN)
  <MAT>_*.html          ← os produtos da matéria NO AR — e a base da próxima
  media/                ← PDFs/JSON/quizzes leves (sem vídeo)
fontes/<tri>/<MAT>/     ← material bruto da escola (LOCAL, gitignored)
trabalho/<tri>_<mat>/   ← produção: _outline, conteudo/, figuras/, _materia.md
_arquivo_1tri/          ← backup leve + aprendizados (fora do site)
```

## As 6 etapas (commit por etapa)

**0 · Sequenciar fontes** → `trabalho/<tri>_<mat>/_outline_pedagogico.md`
Inventariar cada insumo, mapear pré-requisitos, ordenar do simples ao complexo (independe da ordem do material). Cada tópico aponta a fonte de origem.
☑ toda fonte inventariada? ordem simples→difícil? todo tópico da prova coberto? nada depende do que vem depois?

**1 · Extrair conteúdo + figuras** → `conteudo/NN-topico.md` + `figuras/_figmap.json`
Reescrever em linguagem de criança (não copiar frase de adulto). Extrair imagens do PDF/fotos, identificar 1 a 1, nomear pelo tópico. Figura ruim/cortada → descartar ou marcar para desenhar.
☑ cada tópico tem texto curto? cada figura tem rótulo+descrição? figura ilegível descartada?

**2 · Base** → **a matéria ANTERIOR**, não um template. Os `templates/` foram apagados em
17/08/2026: o motor legado (`base.*`, `ela-base.*`) não era usado por nenhum produto vivo, e
duas matérias seguidas nasceram do mesmo jeito — copiando os HTML da matéria pronta. Hoje a
base é `ferramentas/MAT2_*.html`. **NÃO reescrever o motor.**

**3 · Derivar a casca** → `python _processo/geracao/gen_mat2.py --base MAT2 --novo <XXX>2`
Depois, a tabela de strings da matéria nova, no formato de `gen_mat2_textos.py`.
**Regra dura:** toda substituição é EXATA e o script IMPRIME o que não encontrou — o erro que
mata este tipo de derivação é a troca silenciosa que não aconteceu.
☑ zero string da matéria antiga sobrando? (`grep` pelo prefixo antigo antes de fechar)

**4 · Produtos derivados (fan-out paralelo)** — leem a Apostila + `_outline`:
| Produto | Arquivo | Base |
|---|---|---|
| Revisão (folha + palavras + mapa) | `ferramentas/<MAT>_estudo.html` | 3 modos sobre o MESMO dado |
| Simulado | `ferramentas/<MAT>_simulado.html` | 6 formatos; distrator sempre indefensável |
| Aventura | `ferramentas/<MAT>_aventura.html` | fases + chefes; `lesson.custom` p/ a lição interativa |
| Flashcards | `ferramentas/<MAT>_flashcards.html` + `media/flashcards_<mat>.json` | baralhos por tema |
| Classificar | `<MAT>_dragdrop.html` + `<MAT>_popit.html` + `<MAT>_data.js` | 1 banco, 2 formatos |
| Galeria | `ferramentas/<MAT>_galeria.html` | as páginas reais + o PDF |
| Laboratório 3D | `ferramentas/<MAT>_lab.html` (three.js) | **só quando o 3D prova o que o texto não prova** |
| Roteiro de vídeo | insumo p/ NLM | briefing longo e exaustivo, não parágrafo curto |
☑ quiz acolhe erro? flashcards com poucas palavras? **mesmas cores em todos os produtos**?
☑ o sumário do vídeo foi conferido no vídeo GERADO (quadro a quadro), não copiado do roteiro pedido?

**5 · NotebookLM** — consolidar a matéria num `.md` e subir como fonte. Gerar vídeo (`pt_BR`,
kawaii) + quiz + flashcards. **O login é AUTOMÁTICO** (escada `nlm_auth_garantir.py`, ver
`CLAUDE.md` › WORKFLOW NOTEBOOKLM) — nunca se pede ao usuário. Runner de referência:
`_processo/geracao/nlm_mat2.py` (idempotente). Baixar para `ferramentas/media/`, nome
`<tipo>_<mat>_nbN_pt.<ext>`, e passar o `limpa_nlm_*.py` (o NLM escreve número em LaTeX).
**Antes de publicar, ler o quiz e os flashcards item a item** — é onde aparece contradição
com o roteiro.
> Anti-padrão: nunca subir o PDF inteiro em N notebooks (vídeos saem idênticos). Dividir o PDF por páginas relevantes (pypdf) — um recorte por notebook.

**6 · Entrega + commit** — atualizar `index.html` (seção da matéria no topo), commit claro por etapa, push (deploy automático ~2 min). Atualizar `trabalho/<tri>_<mat>/_materia.md` (painel ✅/⏳).

## Gate automático (roda antes de qualquer "pronto")

```bash
python _processo/geracao/qa_mat2.py        # todos os produtos da matéria
```
Playwright **mudo** (Regra Zero), 3 viewports (360×640, 740×360, 1280×800), **com servidor HTTP
local** — produto que lê JSON por `fetch()` não roda em `file://` e passava batido no gate.
Reprova: erro de console, rolagem horizontal, alvo de toque < 40px.

## Checklist QA antes de declarar "pronto" (resumo do CLAUDE.md)
- [ ] Render mental em 360px: nada sobrepõe, nada cortado, toque ≥44px
- [ ] Navegação prev/next sempre visível; Home com confirmação → `../index.html`
- [ ] Tema claro/escuro + A-/A+ funcionam e persistem
- [ ] Funciona offline (`file://`) e no GitHub Pages
- [ ] Conteúdo 100% vindo das fontes (nada inventado); ambiguidades resolvidas
- [ ] Rodar agentes `pedagogico` (antes) e `ti` (antes de "pronto")
