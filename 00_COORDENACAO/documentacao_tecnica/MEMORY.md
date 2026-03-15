# PROJETO SERAFINA - MEMORIA COMPLETA
**Salvo em:** 08/03/2026 | **Atualizado:** 08/03/2026 (sessao 3) | **PROXIMO:** Devolutiva LP02-03 → ELA 18/03

---

## INSTRUCOES PARA RETOMAR APOS /CLEAR
1. Ler este arquivo + `LP02-03_estado.md` + `TECH.md`
2. Confirmar: "Memoria carregada. Pronto para continuar o Projeto Serafina."
3. Se usuario escrever "continuar": responder PROXIMA_RESPOSTA abaixo
4. Avisar ao chegar a 80% de contexto

---

## CONTEXTO GERAL
- **Projeto:** Preparacao para AFs 1o trimestre 2026 - Maple Bear Y2 Elementary
- **Crianca:** 7 anos | **Pasta raiz:** `C:\Users\paulo\OneDrive\td junto outlook hotmail\MAPLE BEAR\provas\`
- **Metodologia:** Ferramentas HTML gamificadas, acessiveis pelo index.html da raiz
- **Filosofia:** Crianca protagonista, drag&drop, gamificado, feedback imediato, nunca frustrante
- **Hospedagem:** GitHub Pages ativo (configurar URL nas Settings > Pages do repositorio)

---

## CALENDARIO DAS AFs
| Data       | Disciplina        | Prioridade  |
|------------|-------------------|-------------|
| 10/03/2026 | Lingua Portuguesa | TODAS CONCLUIDAS — online e funcionando |
| 18/03/2026 | ELA - Ingles      | AGUARDANDO — iniciar apos devolutiva LP02-03 |
| 26/03/2026 | Historia          | A PLANEJAR |

---

## BACKLOG LP (AF 10/03) — ESTADO FINAL
| Cod      | Ferramenta                   | Status                        | Arquivo                                    |
|----------|------------------------------|-------------------------------|--------------------------------------------|
| LP-01    | Genero Textual - Diario      | CONCLUIDA + CORRIGIDA         | LP01_genero_textual_diario.html            |
| LP-02/03 | Personagem Serafina          | CONCLUIDA — aguarda devolutiva| LP02-03_personagem_serafina.html           |
| LP-04+07 | Alfabeto Maiusc/Minusc+Uso   | CONCLUIDA                     | LP04-07_maiuscula_minuscula.html           |
| LP-05    | Ordem Alfabetica             | CONCLUIDA                     | LP05_ordem_alfabetica.html                 |
| LP-06    | Separacao Silabica           | CONCLUIDA + CORRIGIDA         | LP06_separacao_silabica.html               |
| LP-08    | Escrita: Meu Esconderijo     | CONCLUIDA + VALIDADA          | LP08_meu_esconderijo.html                  |

---

## ESTRUTURA DE PASTAS (sessao 3 — estrutura PLANA)
```
provas/
  index.html                        <- hub central com links para todas as ferramentas
  LP01_genero_textual_diario.html   <- TODOS os HTMLs ficam na RAIZ de provas/
  LP02-03_personagem_serafina.html
  LP04-07_maiuscula_minuscula.html
  LP05_ordem_alfabetica.html
  LP06_separacao_silabica.html
  LP08_meu_esconderijo.html
  01_LINGUA_PORTUGUESA/             <- materiais de estudo (nao mais ferramentas aqui)
  02_ELA_INGLES/                    <- a criar (ELA-01 a ELA-05)
  03_HISTORIA/                      <- a criar
  planejamento/                     <- docs Word, scripts Python, agentes .md
```
**REGRA DE CAMINHO:** goToIndex() usa `'index.html'` (sem barras — mesmo diretorio).
index.html usa `href="LP01_..."` (sem subpastas).

---

## O QUE FOI FEITO — SESSAO 3 (08/03/2026)

### LP06 — modulo vogais corrigido
- Texto anterior: "Toda silaba tem pelo menos 1 vogal" (impreciso)
- Corrigido para: cada silaba tem 1 vogal FORTE; pode ter mais vogais se as outras forem semivogais
- Exemplos atualizados: PAI (A forte, I semivogal), QUATRO
- Tip corrigido: "conte as VOGAIS FORTES para saber quantas silabas tem"

### LP02-03 — bug critico corrigido
- **Bug:** BANCO_EVIDENCIAS tinha string com aspas simples nao escapadas na linha 556
  `acao:'manter — usar 'na mangueira...'` → quebrava o parser JS inteiro
- **Sintoma:** todos os botoes da ferramenta nao respondiam (JS morria silenciosamente)
- **Correcao:** aspas duplas na string problemática: `acao:"manter — usar 'na mangueira...'"`
- **Licao:** ao usar aspas simples em strings JS, verificar aspas internas

### Reestruturacao de pastas
- Todos os 6 HTMLs movidos de `01_LINGUA_PORTUGUESA/ferramentas/` para raiz de `provas/`
- Todos os `goToIndex()` atualizados: `../../index.html` → `index.html`
- index.html: todos os hrefs atualizados para caminhos diretos
- Motivo: simplificacao para hospedagem online e compartilhamento

### Hospedagem GitHub Pages
- Conta GitHub criada pelo pai
- Repositorio criado (publico)
- 7 arquivos HTML + index.html enviados pela interface web do GitHub
- GitHub Pages ativado: Branch main, pasta / (root)
- URL disponivel em Settings > Pages do repositorio

---

## O QUE FOI FEITO — SESSAO 2 (08/03/2026)

### LP02-03 — ajustes aplicados
- Flashcards reais com flip 3D (frente = pergunta visivel, verso = resposta)
- Nivel 1: multipla escolha A/B/C/D vertical, feedback imediato sem botao Verificar
- Erro fica VERMELHO permanente ate clicar outra opcao
- Tema padrao: LIGHT (branco)
- Botao "Home" (novo, primeiro da navbar): abre modal confirmacao → index.html
- Francisco removido das alternativas (era nome completo de Chiquinho)

### LP02-03 — varredura de evidencias (anti-alucinacao)
- Cada questao recebeu campos `evidencia` e `confianca`
- BANCO_EVIDENCIAS inserido no codigo como auditoria permanente
- QS_LIVRO criado: 8 questoes so com evidencia alto/medio
- Ver `LP02-03_estado.md` para lista completa das 17 removidas e devolutiva pendente

### LP06 — criado do zero (conversao JSX→HTML)
- 266 palavras preservadas integralmente | mecanica de clique entre letras
- Teoria: 6 modulos estaticos (hiato, ditongo, tritongo, encontro consonantal, vogais, silaba)
- XP system + navbar padrao do projeto

### Todas as ferramentas LP
- Botao "Home" (modal confirmacao → index.html) adicionado a LP01, LP04-07, LP05, LP08
- index.html limpo: duplicata LP-08 removida, LP-06 linkado

---

## PADRAO DE NAVBAR — OBRIGATORIO EM TODAS AS FERRAMENTAS
- **Primeiro botao (esquerda):** `Home` (nb-index, verde #059669) → modal confirmacao → `index.html`
- **Modal confirmacao:** "Tem certeza que quer ir para a tela de escolher o jogo?" | Sim ir! / Nao ficar
- **Botao Reiniciar:** location.reload()
- **A- / A+:** changeFontSize aplicado ao body
- **Tema:** toggle light/dark | LP02-03 usa `body.light`/`body.dark` | outras usam `body.theme-light`/`body.theme-dark`

---

## REGRA GERAL DE INTERFACE — OBRIGATORIA EM TODOS OS PRODUTOS
- **Caber na tela:** toda interface deve caber sem scroll
- **Texto nunca cortado:** JAMAIS truncar com reticencias
- **Label acima do conteudo:** flex-direction:column, nunca ao lado
- **Texto conciso:** corpo de cards: 3 frases curtas (~30-35 palavras)

## PADRAO DE DESIGN (todas as ferramentas exceto LP06)
- Fundo: `#0d0b1e` escuro com estrelas animadas em canvas JS
- Navbar fixa: logo | score | Home | Reiniciar | Voltar | Avancar | A+/A-/ajuda
- Cards: AMARELO neutro | VERDE correto | VERMELHO errado
- Gabarito nunca deduzivel | Delay conclusao >= 2400ms
- LP06 usa design proprio "Livro de Magia" (Fredoka One + coral/roxo)

## CHECKLIST PRE-ENTREGA
- [ ] Nova rodada gera combinacao diferente
- [ ] Apos erro: pecas/opcoes erradas continuam interativas
- [ ] Skip nao mostra parabens | Nenhum item entrega gabarito visualmente
- [ ] Botao Home presente e funcional com modal confirmacao
- [ ] A+/A- funcionais | Delay >= 2400ms
- [ ] goToIndex() aponta para `index.html` (sem barras)
- [ ] Strings JS sem aspas nao escapadas dentro de strings

---

## CONTEUDOS ELA (AF 18/03)
- Acrostic poem | Bucket filler vs dipper | Community helpers
- Sense of community | Family vocabulary | Reading texts
- **Design aprovado (sessao anterior):** ELA-01, ELA-02, ELA-03, ELA-05
- **Status:** aguardando devolutiva LP02-03, depois iniciar

## CONTEUDOS HISTORIA (AF 26/03)
- Unidade 1: Quanto o tempo o tempo tem?

---

## HOSPEDAGEM
- **GitHub Pages (ativo):** repositorio criado, arquivos enviados, Pages ativado
  - Para atualizar: abrir arquivo no GitHub > editar (lapizinho) > Commit changes
  - Ou: arrastar novo arquivo pela interface de upload
  - Site atualiza em ~1 minuto apos cada commit
- **Netlify Drop (alternativa rapida):** arrastar pasta provas/ em netlify.com/drop

---

## PROXIMA_RESPOSTA (responder apos /clear quando usuario escrever "continuar")
**Estado atual (08/03 — fim da sessao 3):**

LP completa com 6 ferramentas. Todas funcionando. Hospedagem GitHub Pages ativa.

AGUARDANDO devolutiva do pai sobre 17 questoes removidas da LP02-03 (ver LP02-03_estado.md).
Apos devolutiva: reativar questoes confirmadas, remover definitivamente as rejeitadas.

Depois da devolutiva LP02-03: iniciar ELA (AF 18/03) — 4 ferramentas ja planejadas.

Perguntar: "Tem a devolutiva das questoes da Serafina? Se sim, me passe por numero. Se nao, partimos para o ELA?"
