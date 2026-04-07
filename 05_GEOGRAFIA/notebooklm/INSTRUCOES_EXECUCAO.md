# INSTRUÇÕES DE EXECUÇÃO — Vídeos Geografia Y2
## Prova: ~14/04/2026 | Baseado no case de Ciências (07/04)

> **MODELO:** Este arquivo segue o mesmo padrão de `04_CIENCIAS/notebooklm/INSTRUCOES_EXECUCAO.md`.
> Preencher as seções marcadas com `[PREENCHER]` quando os insumos chegarem.

---

## PASSO 0 — LOGIN (fazer em terminal separado, NUNCA via Claude Code)

```
notebooklm login
```
→ abre browser → logar com maas.psi@gmail.com → pressionar ENTER

---

## VISÃO GERAL

**[PREENCHER após receber insumos]**

| Notebook | Tópicos | Duração alvo |
|----------|---------|-------------|
| NB1 — [nome] | [tópicos] | 8-10 min |
| NB2 — [nome] | [tópicos] | 6-8 min |

---

## PASSO 1 — EXTRAIR CONTEÚDO DOS INSUMOS

Claude executará automaticamente:
1. Listar todos os arquivos em `05_GEOGRAFIA/`
2. Extrair texto de PDFs (PyPDF2), PPTX (zipfile XML), fotos (Read visual)
3. Gerar `roteiro_geografia_u1.md` com todo conteúdo estruturado
4. Gerar `conteudo_nb1_*.md` e `conteudo_nb2_*.md` para upload no NLM

---

## PASSO 2 — CRIAR NOTEBOOKS NLM

```bash
notebooklm notebook create --title "Serafina - Geografia: [Topico1] & [Topico2]"
# anota NB1_ID

notebooklm notebook create --title "Serafina - Geografia: [Topico3] & [Topico4]"
# anota NB2_ID
```

---

## PASSO 3 — UPLOAD DE FONTES

**NB1:**
```bash
notebooklm source add --notebook NB1_ID --file "[arquivo1.pdf]"
notebooklm source add --notebook NB1_ID --file "05_GEOGRAFIA/notebooklm/conteudo_nb1_*.md"
```

**NB2:**
```bash
notebooklm source add --notebook NB2_ID --file "[arquivo2.pdf]"
notebooklm source add --notebook NB2_ID --file "05_GEOGRAFIA/notebooklm/conteudo_nb2_*.md"
```

---

## PASSO 4 — GERAR VÍDEOS

```bash
# NB1 — EN e PT
notebooklm generate video --notebook NB1_ID --language en --style kawaii
notebooklm generate video --notebook NB1_ID --language pt_BR --style kawaii

# NB2 — EN e PT
notebooklm generate video --notebook NB2_ID --language en --style kawaii
notebooklm generate video --notebook NB2_ID --language pt_BR --style kawaii

# Verificar status:
notebooklm artifact list --notebook NB1_ID
notebooklm artifact list --notebook NB2_ID

# Aguardar:
notebooklm artifact wait -n NB1_ID ARTIFACT_ID
```

---

## PASSO 5 — DOWNLOAD

```bash
# Vídeos (usar -a ID se nome tiver acentos):
notebooklm download video --notebook NB1_ID -a ARTIFACT_ID
# → renomear para video_geo_nb1_en.mp4 / video_geo_nb1_pt.mp4

# Quiz e flashcards:
notebooklm download quiz --notebook NB1_ID
notebooklm download flashcards --notebook NB1_ID

# Mover tudo para ferramentas/media/
```

---

## PASSO 6 — CRIAR FERRAMENTAS HTML

**Flashcards:**
- Copiar `ferramentas/CIE_flashcards.html` → `ferramentas/GEO_flashcards.html`
- Atualizar título, emoji, descrição, e `fetch()` para `flashcards_geo_u1.json`
- Criar `ferramentas/media/flashcards_geo_u1.json` com cards baseados no roteiro

**Mapa Mental:**
- Copiar `ferramentas/CIE_mindmap.html` → `ferramentas/GEO_mindmap.html`
- Substituir todo conteúdo das branches/leaves com conteúdo de Geografia
- Manter: EN primário, PT auxiliar, overrides tema claro, `e.stopPropagation()` em toggleLeaf

---

## PASSO 7 — ATUALIZAR INDEX.HTML

1. Colapsar seção Ciências (envolver com disc-toggle/disc-collapse)
2. Adicionar seção Geografia no topo com layout padrão:
   - Hero: mapa mental
   - Apresentações (2 PDFs do NLM)
   - Vídeos PT (2)
   - Outros colapsado (flashcards, vídeos EN, quizzes, cards NLM)

---

## PASSO 8 — GITIGNORE + DEPLOY

```bash
# Adicionar ao .gitignore:
# 05_GEOGRAFIA/*.pdf
# 05_GEOGRAFIA/*.pptx
# 05_GEOGRAFIA/*.jpeg
# 05_GEOGRAFIA/*.jpg
# 05_GEOGRAFIA/*.png

git add ferramentas/GEO_mindmap.html ferramentas/GEO_flashcards.html
git add ferramentas/media/flashcards_geo_u1.json
git add ferramentas/media/video_geo_nb1_pt.mp4 ferramentas/media/video_geo_nb2_pt.mp4
git add ferramentas/media/apresentacao_geo_nb1.pdf ferramentas/media/apresentacao_geo_nb2.pdf
git add index.html .gitignore
git commit -m "Add Geografia: mindmap, flashcards, NLM videos + presentations"
git push origin main
```

---

## CHECKLIST FINAL

- [ ] Conteúdo 100% baseado nos insumos (nada inventado)
- [ ] EN primário, PT auxiliar no mindmap
- [ ] Tema claro: overrides body.theme-light para classes mm-* custom
- [ ] e.stopPropagation() no toggleLeaf do mindmap
- [ ] Cards JSON validados (inequívocos para criança de 7 anos)
- [ ] Index: hero → apresentações → vídeos PT → outros colapsado
- [ ] Ciências colapsada no index
- [ ] .gitignore atualizado
- [ ] Deploy confirmado (gh run list)
