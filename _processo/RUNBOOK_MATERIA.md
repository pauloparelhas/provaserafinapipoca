# RUNBOOK — Produzir uma matéria (replicável, do zero à entrega)

> Receita fixa. Toda prova nova repete **exatamente** estas etapas, na ordem.
> Detalhe conceitual em [`PIPELINE.md`](PIPELINE.md). Padrões de UI em [`ACESSIBILIDADE.md`](ACESSIBILIDADE.md) e [`GOVERNANCA.md`](GOVERNANCA.md).
> **Política:** produto serve até a prova; depois pode ser apagado — preserva-se só o aprendizado (ver `_arquivo_1tri/APRENDIZADOS_1TRI.md`).

## Mapa de pastas (onde cada coisa vive)
```
_processo/              ← como trabalhamos (imutável): pipeline, runbook, governança, geração
ferramentas/            ← SITE / deploy (o que vai pro GitHub Pages)
  base.* / ela-base.*   ← design system compartilhado (NÃO duplicar)
  templates/            ← TEMPLATE_PT, TEMPLATE_EN, wal-kids-base.html (CONGELADOS)
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

**2 · Template** → já existe em `ferramentas/templates/`. **NÃO reescrever.** Só copiar.

**3 · Apostila Mágica (WAL kids)** → `ferramentas/<MAT>_apostila.html`
Copiar `wal-kids-base.html`, preencher `META` + `PAGES[]` na ordem do `_outline`. Figuras embutidas em base64. Tabela de adulto vira par de figuras; regra vira frase-mnemônica; cada tópico fecha com 🎮 ou ❓.
☑ ≤2 frases por tela? toda tela de conceito tem figura? segue o `_outline`? ≥1 brincadeira/tópico? abre offline no tablet?

**4 · Produtos derivados (fan-out paralelo)** — leem a Apostila + `_outline`:
| Produto | Arquivo | Base |
|---|---|---|
| Mapa mental | `ferramentas/<MAT>_mindmap.html` | copiar de modelo PT/EN existente |
| Flashcards | `ferramentas/<MAT>_flashcards.html` + `media/flashcards_<mat>.json` | idem |
| Quiz lúdico | `ferramentas/media/quiz_<mat>.html` (+ `_raw.json` do NLM) | premia acerto, acolhe erro |
| Roteiro de vídeo | insumo p/ NLM | curto (<3 min) |
☑ vídeo <3 min? quiz acolhe erro? flashcards com poucas palavras? **mesmas figuras/cores da Apostila** (identidade única)?

**5 · NotebookLM** — consolidar a matéria num `.md` e subir como fonte. Gerar vídeo (`pt_BR`, kawaii) + mapa. Comandos em `CLAUDE.md` › WORKFLOW NOTEBOOKLM (login via `notebooklm_login.bat`). Baixar para `ferramentas/media/`, nome `<tipo>_<mat>_nbN_pt.<ext>`.
> Anti-padrão: nunca subir o PDF inteiro em N notebooks (vídeos saem idênticos). Dividir o PDF por páginas relevantes (pypdf) — um recorte por notebook.

**6 · Entrega + commit** — atualizar `index.html` (seção da matéria no topo), commit claro por etapa, push (deploy automático ~2 min). Atualizar `trabalho/<tri>_<mat>/_materia.md` (painel ✅/⏳).

## Checklist QA antes de declarar "pronto" (resumo do CLAUDE.md)
- [ ] Render mental em 360px: nada sobrepõe, nada cortado, toque ≥44px
- [ ] Navegação prev/next sempre visível; Home com confirmação → `../index.html`
- [ ] Tema claro/escuro + A-/A+ funcionam e persistem
- [ ] Funciona offline (`file://`) e no GitHub Pages
- [ ] Conteúdo 100% vindo das fontes (nada inventado); ambiguidades resolvidas
- [ ] Rodar agentes `pedagogico` (antes) e `ti` (antes de "pronto")
