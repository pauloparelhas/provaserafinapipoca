# Aprendizados do 1º Trimestre (2026) — backup leve

> **Por que este arquivo existe:** os PRODUTOS do 1tri (vídeos, apresentações,
> jogos) só serviam até as provas (mar–abr/26), que já passaram. Os arquivos
> pesados foram apagados para liberar o OneDrive. Aqui ficam preservados os
> **aprendizados de formulação e desenvolvimento** + o **manifesto** do que foi
> construído — para inspiração e continuidade, sem o peso.

## Calendário e cobertura (tudo concluído)
| Prova | Data | Produtos entregues |
|---|---|---|
| Língua Portuguesa | 10/03 | 6 ferramentas (LP01–LP08) |
| ELA (Inglês) | 18/03 | ELA01–ELA06 |
| História | 26/03 | HIS01–HIS03 + vídeo/áudio/flashcards NLM |
| Ciências | 07/04 | mindmap + flashcards + 4 vídeos + 2 apresentações + 2 quizzes NLM |
| Geografia | ~14/04 | mindmap + flashcards + GEO01/GEO02 + 2 vídeos + 2 PDFs + 3 quizzes NLM |
| Matemática | (fim 1tri) | mindmap + flashcards + roteiro pais + 3 vídeos + 3 apresentações + quiz |

Os **HTML leves** (jogos, mindmaps, flashcards) seguem em `ferramentas/` como
modelo. O que foi removido: `*.mp4`, `apresentacao_*.pdf`, `audio_historia_*`.

## O que funcionou (replicar)
1. **Design system compartilhado** (`base.*` PT, `ela-base.*` EN) — mudar navbar/tema num lugar só. Nunca duplicar CSS/JS.
2. **Pipeline file-driven** (estado em disco) → permite retomar sessão sem perder o fio. Formalizado em `_processo/PIPELINE.md` + `RUNBOOK_MATERIA.md`.
3. **NLM como fábrica de conteúdo**, Claude como montador — vídeo/áudio/quiz gerados fora, integrados no HTML. Economiza tokens.
4. **Acessibilidade ELA** (`_processo/ACESSIBILIDADE.md`): tela em inglês + tooltip PT (`data-pt`), karaoke TTS palavra-a-palavra, tap-to-select no mobile, navegação livre entre fases.
5. **Mindmap e flashcards** como produtos âncora de revisão rápida.

## Anti-padrões corrigidos (não repetir)
- **NLM, mesmo PDF em N notebooks → vídeos idênticos.** Solução: dividir o PDF por páginas relevantes (pypdf, `writer.add_page(reader.pages[i])`), um recorte por notebook. Nunca incluir seção "revisão geral" que resume outros notebooks.
- **Ambiguidade no banco de questões** (ex.: "escovar os dentes" = manhã ou noite?; "ir à escola" depende do turno). Validar cada item: a resposta é inequívoca para 7 anos? Trocar por item universal ou dar contexto explícito.
- **Delegar arquivo >500 linhas a um agente → trunca silenciosamente.** Escrever arquivos grandes direto com Write; agente só revisa.
- **Mexer em CSS sem ler o JS que gera o DOM.** Sempre DOM-trace antes.

## Detalhes técnicos preservados
- Vídeos NLM: idioma `pt_BR` (não `pt`); download com acento no nome → `-a ARTIFACT_ID`.
- Matérias PT (LP/HIS/GEO/MATH) → só vídeo PT. Matérias EN (ELA/CIE) → PT + EN.
- `goToIndex()` aponta para `../index.html` (ferramentas estão em subpasta).
- Modelos de-facto p/ copiar: `CIE_mindmap.html`, `CIE_flashcards.html` (EN); `GEO_mindmap.html`, `GEO_flashcards.html` (PT).

## Onde está o resto
- Casos detalhados e memória de processo: `00_COORDENACAO/` (local) e a memória do Claude (`.claude/.../memory/`).
- Materiais brutos da escola: `fontes/1tri/<MAT>/` (local, gitignored).
- Índice navegável do 1tri (backup, fora do site principal): `_arquivo_1tri/index_1tri.html`.
