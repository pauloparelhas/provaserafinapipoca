# INSTRUÇÕES DE EXECUÇÃO — Vídeos Geografia Y2
## Prova: ~14/04/2026 | 3 notebooks | PT apenas

---

## PASSO 0 — LOGIN (fazer em terminal separado, NUNCA via Claude Code)

```
notebooklm login
```
→ abre browser → logar com maas.psi@gmail.com → pressionar ENTER

---

## VISÃO GERAL DOS 3 NOTEBOOKS

| Notebook | Tópicos | Fontes | Duração alvo |
|----------|---------|--------|-------------|
| NB1 — Períodos do Dia e Estações | Manhã/tarde/noite, verão/inverno/primavera/outono | PDF Toddle + conteudo_nb1 | 8-10 min |
| NB2 — Povos, Culturas e Conexões | 3 povos, povo/cultura/tradição, transporte | PDF Toddle + conteudo_nb2 | 8-10 min |
| NB3 — Espaço e Orientação | Referências espaciais, ponto de vista, representações | PDF Toddle + conteudo_nb3 | 5-7 min |

---

## NOTA CRÍTICA — ESTILO DO VÍDEO (sem enrolação)

Ao gerar cada vídeo, se o NotebookLM permitir instrução customizada, adicionar:

> "Vá direto ao conteúdo desde a primeira frase. Sem apresentações do tipo 'pessoal, hoje vamos aprender'. Sem frases de encerramento que sugiram provas ou avaliações. Sem 'muito bem, agora você já sabe'. Apenas o conteúdo, explicado de forma clara e direta."

Os arquivos de conteúdo `.md` já estão estruturados de forma densa para favorecer vídeos diretos.

---

## PASSO 1 — CRIAR OS 3 NOTEBOOKS

```bash
notebooklm notebook create --title "Serafina - Geografia: Períodos do Dia e Estações do Ano"
# → anota NB1_ID

notebooklm notebook create --title "Serafina - Geografia: Povos, Culturas e Conexões"
# → anota NB2_ID

notebooklm notebook create --title "Serafina - Geografia: Espaço e Orientação"
# → anota NB3_ID
```

---

## PASSO 2 — UPLOAD DAS FONTES

**NB1 — Períodos do Dia e Estações:**
```bash
notebooklm source add --notebook NB1_ID --file "05_GEOGRAFIA/Toddle-9919c638-b2ce-4d14-aafe-b2606792ddb0-Unidade 1 - Pontos de vista e atividades do dia a dia Y2 Geo.pdf"
notebooklm source add --notebook NB1_ID --file "05_GEOGRAFIA/notebooklm/conteudo_nb1_periodos_estacoes.md"
```

**NB2 — Povos, Culturas e Conexões:**
```bash
notebooklm source add --notebook NB2_ID --file "05_GEOGRAFIA/Toddle-9919c638-b2ce-4d14-aafe-b2606792ddb0-Unidade 1 - Pontos de vista e atividades do dia a dia Y2 Geo.pdf"
notebooklm source add --notebook NB2_ID --file "05_GEOGRAFIA/notebooklm/conteudo_nb2_povos_cultura.md"
```

**NB3 — Espaço e Orientação:**
```bash
notebooklm source add --notebook NB3_ID --file "05_GEOGRAFIA/Toddle-9919c638-b2ce-4d14-aafe-b2606792ddb0-Unidade 1 - Pontos de vista e atividades do dia a dia Y2 Geo.pdf"
notebooklm source add --notebook NB3_ID --file "05_GEOGRAFIA/notebooklm/conteudo_nb3_orientacao_espacial.md"
```

---

## PASSO 3 — GERAR VÍDEOS (PT apenas)

```bash
# NB1
notebooklm generate video --notebook NB1_ID --language pt_BR --style kawaii

# NB2
notebooklm generate video --notebook NB2_ID --language pt_BR --style kawaii

# NB3
notebooklm generate video --notebook NB3_ID --language pt_BR --style kawaii

# Verificar status:
notebooklm artifact list --notebook NB1_ID
notebooklm artifact list --notebook NB2_ID
notebooklm artifact list --notebook NB3_ID

# Aguardar (substituir IDs reais):
notebooklm artifact wait -n NB1_ID ARTIFACT_ID
notebooklm artifact wait -n NB2_ID ARTIFACT_ID
notebooklm artifact wait -n NB3_ID ARTIFACT_ID
```

---

## PASSO 4 — GERAR APRESENTAÇÕES, QUIZZES E FLASHCARDS NLM

```bash
# Apresentações (uma por notebook):
notebooklm generate presentation --notebook NB1_ID
notebooklm generate presentation --notebook NB2_ID
notebooklm generate presentation --notebook NB3_ID

# Quizzes:
notebooklm generate quiz --notebook NB1_ID
notebooklm generate quiz --notebook NB2_ID
notebooklm generate quiz --notebook NB3_ID

# Flashcards NLM (complemento aos flashcards HTML do Claude):
notebooklm generate flashcards --notebook NB1_ID
notebooklm generate flashcards --notebook NB2_ID
notebooklm generate flashcards --notebook NB3_ID
```

---

## PASSO 5 — DOWNLOAD

```bash
# Vídeos PT (usar -a ARTIFACT_ID se nome tiver acentos):
notebooklm download video --notebook NB1_ID -a ARTIFACT_ID
# → renomear para: video_geo_nb1_pt.mp4

notebooklm download video --notebook NB2_ID -a ARTIFACT_ID
# → renomear para: video_geo_nb2_pt.mp4

notebooklm download video --notebook NB3_ID -a ARTIFACT_ID
# → renomear para: video_geo_nb3_pt.mp4

# Apresentações:
notebooklm download presentation --notebook NB1_ID
# → renomear para: apresentacao_geo_nb1.pdf

notebooklm download presentation --notebook NB2_ID
# → renomear para: apresentacao_geo_nb2.pdf

notebooklm download presentation --notebook NB3_ID
# → renomear para: apresentacao_geo_nb3.pdf

# Quizzes e flashcards NLM:
notebooklm download quiz --notebook NB1_ID
notebooklm download quiz --notebook NB2_ID
notebooklm download quiz --notebook NB3_ID
notebooklm download flashcards --notebook NB1_ID
notebooklm download flashcards --notebook NB2_ID
notebooklm download flashcards --notebook NB3_ID

# Mover tudo para ferramentas/media/
```

---

## PASSO 6 — FERRAMENTAS HTML (Claude executa após downloads)

**Flashcards:**
- `ferramentas/GEO_flashcards.html` — copiar de CIE_flashcards.html
- `ferramentas/media/flashcards_geo_u1.json` — ~28 cards curados do roteiro

**Mapa Mental:**
- `ferramentas/GEO_mindmap.html` — copiar de CIE_mindmap.html, 4 branches:
  1. Períodos do Dia
  2. Estações do Ano
  3. Povos e Culturas (com sub-branch Transporte)
  4. Espaço e Orientação

---

## PASSO 7 — ATUALIZAR INDEX.HTML

1. Colapsar seção Ciências
2. Colapsar História, LP, ELA
3. Adicionar seção Geografia no topo:
   - Hero: mapa mental
   - Apresentações (3 PDFs)
   - Vídeos PT (3)
   - Outros colapsado: quizzes NLM, flashcards NLM, flashcards HTML

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
git add ferramentas/media/video_geo_nb1_pt.mp4 ferramentas/media/video_geo_nb2_pt.mp4 ferramentas/media/video_geo_nb3_pt.mp4
git add ferramentas/media/apresentacao_geo_nb1.pdf ferramentas/media/apresentacao_geo_nb2.pdf ferramentas/media/apresentacao_geo_nb3.pdf
git add index.html .gitignore
git commit -m "Add Geografia: mindmap, flashcards, 3 NLM videos + presentations"
git push origin main
```

---

## CHECKLIST FINAL

- [ ] Conteúdo 100% baseado nos insumos (nada inventado)
- [ ] PT apenas — sem inglês em nada
- [ ] 3 vídeos PT gerados e baixados
- [ ] 3 apresentações PDF baixadas
- [ ] Quizzes e flashcards NLM baixados
- [ ] GEO_flashcards.html funcional + JSON com ~28 cards
- [ ] GEO_mindmap.html: 4 branches, PT, modelo Ciências
- [ ] Index: Geography no topo, todas as outras matérias colapsadas
- [ ] .gitignore atualizado com PDFs/fotos de 05_GEOGRAFIA
- [ ] Deploy confirmado (gh run list)
