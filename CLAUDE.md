# Projeto Serafina — Instrucoes para o Claude

## PROTOCOLO DE TRABALHO — INVIOLAVEL

**ANTES de implementar qualquer coisa: analisar → propor → aguardar aprovacao do usuario → so entao executar.**

O usuario decide. Claude propoe e executa quando autorizado. Nunca assumir aprovacao implicita.

## AGENTES OBRIGATORIOS — INVOCAR SEMPRE

Os agentes estao em `.claude/agents/`. Sao invocados com `Agent(subagent_type="nome")`.

| Momento | Agente | Como invocar |
|---|---|---|
| Antes de desenhar/codificar nova ferramenta | `pedagogico` | `Agent(subagent_type="pedagogico")` |
| Antes de declarar ferramenta concluida | `ti` | `Agent(subagent_type="ti")` |
| Apos entregar ferramenta | `arquivista` | `Agent(subagent_type="arquivista")` |
| Para retomar sessao ou checar prioridades | `gerente` | `Agent(subagent_type="gerente")` |

**NUNCA declarar ferramenta como "pronta" sem ter rodado o agente `ti` antes.**
**NUNCA comecar a codar sem ter rodado o agente `pedagogico` antes.**

Os agentes leeem os arquivos do projeto diretamente. Passar sempre o caminho do arquivo como contexto no prompt.

## Contexto
Ferramentas HTML gamificadas para crianca de 7 anos (Y2 Maple Bear). Ingles como L2.
Publico: crianca jogando em celular. CADA detalhe visual importa.

## PROTOCOLO QA OBRIGATORIO

**NUNCA declarar uma mudanca como "pronta" sem completar TODOS os passos abaixo.**

### Passo 1: INTENT (Intencao)
Antes de implementar, responder:
- QUEM vai usar isso? (crianca? pai?)
- O QUE deve acontecer?
- POR QUE? (qual o caso de uso real?)

### Passo 2: DOM TRACE (Rastreamento do DOM)
Para qualquer mudanca visual:
1. Ler o HTML estatico
2. Ler o JS que gera/modifica o DOM (funcoes como initFlags, buildCards, etc.)
3. Identificar a relacao pai-filho REAL dos elementos
4. SO ENTAO definir o CSS

**Regra:** NUNCA mexer em CSS sem antes verificar qual JS gera o DOM.

### Passo 3: MENTAL RENDER (Simulacao em 360px)
Antes de entregar, listar mentalmente:
- Elemento X: posicao [top/left/etc], tamanho [WxH]
- Elemento Y: posicao [top/left/etc], tamanho [WxH]
- Sobreposicao? Texto cortado? Alvo de toque < 44px?

### Passo 4: USER FLOW (Fluxo do usuario)
Percorrer 3-5 passos que o usuario real faria:
- Ex: "Crianca clica card -> card vira -> flag aparece onde? -> cobre texto? -> NAO, esta no canto superior esquerdo"
- Ex: "Pai clica lock -> tela cheia -> crianca consegue jogar? -> SIM -> pai clica lock de novo -> overlay aparece -> pai clica unlock"
- SEMPRE verificar: "Crianca esta no meio do exercicio (sem responder ainda) -> consegue navegar para fase anterior/proxima? -> SIM, botoes sempre visiveis"
- SEMPRE verificar: "TTS termina -> karaoke bar some imediatamente? -> NAO, deve ficar 2500ms para dar tempo de ler a ultima palavra, AI entao some"

### Passo 5: AGENTE DE REVISAO
Quando usar agente Explore para revisar, o prompt DEVE incluir:
- "Trace o JS que gera o DOM"
- "Identifique o pai real de cada elemento posicionado"
- "Simule o render em tela 360px"
- "Verifique sobreposicoes e truncamento"
NAO usar prompts vagos como "verifique se o CSS esta correto".

## CHECKLIST PRE-ENTREGA (alem do QA acima)
- [ ] Nova rodada gera combinacao diferente (randomizacao)
- [ ] Apos erro: feedback claro + resposta correta visivel
- [ ] Nao avanca automaticamente — sempre botao "Next"
- [ ] Botao Home com modal de confirmacao
- [ ] A+/A- funcionais via --fs CSS variable
- [ ] Tema sol/lua funcional (body.light)
- [ ] goToIndex() aponta para `index.html`
- [ ] TTS: speakWithKaraoke usa u.onboundary (NAO palavra-por-palavra)
- [ ] karaokeRate = 0.75 como default, 4 velocidades (0.6/0.75/0.9/1.1) em ks-btn dentro do karaokeBar
- [ ] #karaokeWords dentro de #karaokeBar, .karaoke-bar flex-direction:column
- [ ] Speak-btn em cada card/opcao clicavel (ELA)
- [ ] Tour guiado: #tourOverlay presente, usa tour-bg (nao tour-backdrop), startTour() no init
- [ ] localStorage key unica: ela01_tour_done / ela02_tour_done etc.
- [ ] Todos botoes navbar com id= (navLogo, btnHome, btnRestart, btnFontDown, btnFontUp, themeBtn, soundBtn, lockBtn)
- [ ] Todo texto EN visivel com data-pt para flag BR
- [ ] Layout simetrico, alturas uniformes
- [ ] Nada sobrepoe texto em tela 360px
- [ ] Lock: 1o clique trava (fullscreen + bloqueia nav), 2o clique mostra unlock overlay
- [ ] Karaoke bar: sumir 2500ms APOS leitura acabar (nao imediatamente) — dar tempo de ler a ultima palavra
- [ ] Nav prev/next: botoes de fase/historia presentes e VISIVEIS em TODAS as telas, inclusive durante exercicio antes de responder — nada impede a crianca de navegar

## REGRA DE DOCUMENTACAO — AUTOMATICA E OBRIGATORIA

**QUANDO atualizar (nao esperar fim de sessao):**
- Imediatamente apos corrigir um bug causado por padrao errado
- Imediatamente apos implementar feature nova que vira padrao
- Imediatamente apos agente pedagogico ou QA identificar problema estrutural
- Antes de passar para a proxima tarefa — nunca acumular

**O QUE atualizar:**
1. `memory/ELA_PADRAO.md` — anti-padrao que causou o problema + padrao correto que substituiu
2. Este `CLAUDE.md` — novos itens no checklist pre-entrega
3. `memory/MEMORY.md` — status atual do projeto (ELA concluidas, proxima tarefa)

**COMO fazer (sem o usuario pedir) — PROTOCOLO EXATO:**

Ao identificar padrao novo ou anti-padrao corrigido, Claude DEVE:

1. Pausar a tarefa atual e dizer:
   ---
   📋 **Padrao identificado — atualizar docs?**
   - **O que mudou:** [descrever em 1 linha o que foi corrigido ou descoberto]
   - **Arquivo afetado:** memory/ELA_PADRAO.md [e/ou CLAUDE.md]
   - Confirma que eu atualizo agora antes de continuar? (sim / pular)
   ---

2. Se usuario confirmar: atualizar o(s) arquivo(s) e informar "✅ Docs atualizados."
3. Se usuario disser pular: continuar sem atualizar (mas registrar pendencia)
4. Nunca acumular mais de 1 padrao sem perguntar

**POR QUE isso importa:**
Agentes recebem instrucoes baseadas nestes arquivos. Docs desatualizados = agentes repetem erros.
Documentar e parte do trabalho, nao bonus opcional.

## ARQUITETURA DE ARQUIVOS COMPARTILHADOS

```
ferramentas/
  base.css          <- CSS compartilhado HIS/LP (vars, starfield, navbar, modal, quiz, resultado, tema claro, responsivo)
  base.js           <- JS compartilhado HIS/LP (showScreen, toggleTheme, changeFontSize, showHomeModal, updateScore, initStarfield, launchFireworks, updatePhaseNavs, initApp)
  ela-base.css      <- CSS compartilhado ELA (karaoke, speak-btn, tour overlay, flag BR, lock, sound states)
  ela-base.js       <- JS compartilhado ELA (speakWithKaraoke, stopKaraoke, setKSpeed, speak, makeSpeakBtn, toggleSound, toggleLock, unlockScreen, initFlags, startTour, initEla)
  TEMPLATE_PT.html  <- Esqueleto para ferramentas PT (HIS/LP): copiar + preencher placeholders
  TEMPLATE_EN.html  <- Esqueleto para ferramentas EN (ELA): copiar + preencher placeholders
```

**Regras de importacao:**
- Ferramentas PT (HIS/LP): `<link rel="stylesheet" href="base.css">` + `<script src="base.js"></script>`
- Ferramentas EN (ELA): `<link rel="stylesheet" href="ela-base.css">` + `<script src="ela-base.js"></script>`
- ELA NAO importa base.css/base.js (padroes incompativeis: `.nb` vs `.nav-btn`, `body.light` vs `body.theme-light`, `--fs:16px` vs `--fs:1`)

**Hooks ELA (definir ANTES de `initEla()`):**
- `var TOUR_KEY = 'elaXX_tour_done'` — localStorage key para tour
- `var tourSteps = [{selector, title, text}, ...]` — passos do tour guiado

**Hooks HIS/LP (definir ANTES de `initApp()`):**
- `var PHASES = [{id, label}, ...]` — fases para barra de navegacao
- `function onInit(){}` — setup especifico apos base init
- `function onRestart(){}` — reset especifico

**Para criar nova ferramenta:**
1. Copiar o template apropriado (PT ou EN)
2. Buscar/substituir os placeholders `{{...}}`
3. Adicionar CSS tool-specific no `<style>`
4. Preencher dados do jogo e logica no `<script>`
5. NAO duplicar codigo que ja esta nos arquivos base

## REGRAS DE DESIGN
- Fundo: `#0d0b1e` com starfield canvas
- Cards: gradientes, NUNCA cor chapada
- CSS vars: --fs, --bg, --card-bg, --card-border, --text, --text-soft, --text-dim
- Flag BR: appendar no CONTAINER (fc-front/fc-back), NUNCA dentro do texto
- Emojis: drop-shadow, animacoes float/pulse
- Mobile-first: testar em 360px mentalmente

## REGRA CRITICA — ARQUIVOS GRANDES E AGENTES

**NUNCA delegar a escrita de um arquivo HTML/JS completo para um unico agente.**

Agentes tem limite de ~32000 tokens de OUTPUT. Arquivos ELA tipicamente tem 800-1400 linhas. Um unico agente NUNCA consegue escrever um arquivo completo — ele truncara silenciosamente e o arquivo nao sera criado ou estara incompleto. Isso e uma falha critica.

**REGRA INVIOLAVEL:**
- Arquivos com mais de 500 linhas: escrever diretamente do contexto principal (Write tool), em partes se necessario
- Agentes so podem REVER/VALIDAR arquivos existentes — NUNCA escreve-los
- Nunca acumular mais de 1 arquivo por etapa de implementacao
- Commit apos cada mudanca funcional — nunca acumular 3+ arquivos sem commit

**GRANULARIDADE OBRIGATORIA:**
- Dividir implementacao em passos menores: estrutura HTML -> CSS -> JS fase 1 -> JS fase 2 -> etc.
- Salvar (Write/Edit) apos cada parte completada, nao no final
- Perguntar ao usuario apos cada parte entregue antes de continuar

**POR QUE:** Na sessao 5/6, um agente falhou ao tentar escrever ELA-06 (~1400 linhas) e o arquivo simplesmente nao foi criado. O erro foi silencioso — Claude declarou "feito" sem verificar se o arquivo existia. Isso atrasou o projeto e frustrou o usuario.

## PROTOCOLO DE TRATAMENTO DE INSUMOS — OBRIGATORIO

**QUANDO:** Antes de criar qualquer ferramenta ou produto (joguinho, prompt NLM, flashcards).
**OBJETIVO:** Transformar materiais-fonte brutos num roteiro estruturado que serve de base para TODOS os produtos.

### Passo 1: Receber e catalogar insumos
- Identificar todos os materiais fornecidos: PDFs, fotos de caderno, slides Toddle, apostilas, anotacoes
- Listar cada insumo com: tipo, origem, idioma, conteudo resumido

### Passo 2: Decodificar e estruturar
- Extrair TODO o conteudo relevante de cada insumo
- Traduzir se necessario (ingles -> portugues ou vice-versa)
- Organizar por topicos/unidades/habilidades (BNCC quando aplicavel)
- Identificar conceitos-chave, vocabulario, exemplos do material original

### Passo 3: Gerar roteiro unico
- Criar documento estruturado (MD ou JSON) com:
  - Topicos cobertos (com referencia ao insumo de origem)
  - Conceitos-chave por topico
  - Exemplos concretos do material
  - Vocabulario obrigatorio
  - Habilidades BNCC relacionadas
- Salvar em `{materia}/roteiro_{unidade}.md`

### Passo 4: Validar com agente pedagogico
- Chamar `Agent(subagent_type="pedagogico")` passando o roteiro
- Agente verifica: adequacao para 7 anos, coerencia, cobertura, ambiguidades
- Corrigir roteiro com base no feedback

### Passo 5: Derivar produtos do roteiro
O roteiro validado serve de base para:
- **Joguinhos HTML:** banco de questoes, dados de fases, rotinas, classificacoes
- **Prompt NLM (video/audio):** extrair pontos-chave e frases do roteiro
- **Flashcards:** gerar cards a partir dos conceitos-chave
- **REGRA:** Nenhum dado de joguinho pode ser inventado — tudo deve vir do roteiro (e portanto dos insumos originais)

### Passo 6: Revisar ambiguidades no banco de questoes
Antes de implementar, verificar CADA item do banco de dados:
- A resposta e INEQUIVOCA para uma crianca de 7 anos?
- A sequencia/classificacao depende de contexto nao especificado? (turno escolar, regiao, cultura)
- Se houver ambiguidade: substituir por item universal ou adicionar contexto explicito

**POR QUE:** Na sessao 13, rotinas como "escovar os dentes" (pode ser manha ou noite) e "ir para a escola" (depende do turno) causaram ambiguidade nos joguinhos HIS-02. Insumos mal processados geram erros pedagogicos nos produtos.

---

## WORKFLOW NOTEBOOKLM — PROTOCOLO DEFINITIVO

**Claude executa TODO o workflow NLM diretamente via Bash tool.** O usuario nao precisa sair do Claude Code.

### Login (unica excecao — requer acao do usuario)

O login exige stdin interativo que o Bash tool nao suporta. Solucao definitiva:

1. Usuario clica duplo em `notebooklm_login.bat` (ja existe na raiz do projeto)
2. Browser abre → faz login na conta Google
3. Volta na janela cmd preta → pressiona ENTER
4. Janela mostra "Login salvo!" → pode fechar
5. Avisa o Claude que pode continuar

**NUNCA tentar `notebooklm login` via Bash tool — nao funciona (sem stdin).**
**NUNCA pedir para o usuario rodar comandos NLM manualmente — Claude faz tudo.**

### Sequencia completa (Claude executa apos login)

```bash
# 1. Criar notebooks
notebooklm create "Serafina - MATERIA: Topico1 & Topico2"
# anota ID retornado

# 2. Upload de fontes (PDF + MD)
notebooklm source add --notebook ID --file "pasta/arquivo.pdf"
notebooklm source add --notebook ID --file "pasta/notebooklm/conteudo_nb1.md"

# 3. Gerar artefatos
notebooklm generate video --notebook ID --language pt_BR --style kawaii
notebooklm generate slide-deck --notebook ID  # apresentacao PPT/PDF
notebooklm generate quiz --notebook ID
notebooklm generate flashcards --notebook ID

# 4. Aguardar (verificar status)
notebooklm artifact list --notebook ID
notebooklm artifact wait --notebook ID ARTIFACT_ID

# 5. Download (usar -a ID se nome tem acento)
notebooklm download video --notebook ID -a ARTIFACT_ID
notebooklm download slide-deck --notebook ID -a ARTIFACT_ID
notebooklm download quiz --notebook ID
notebooklm download flashcards --notebook ID

# 6. Mover para ferramentas/media/ e renomear
mv arquivo_baixado.mp4 "ferramentas/media/video_MATERIA_nb1_pt.mp4"
```

### Criticos:
- Idioma PT: `pt_BR` (nao `pt` — invalido)
- Download com acento no nome: usar `-a ARTIFACT_ID`
- Materias PT (LP/HIS/GEO): apenas `pt_BR`, sem versao EN
- Materias EN (ELA/CIE): `pt_BR` + `en`
- Apos downloads: atualizar index.html com caminhos reais, fazer git commit + push
- Verificar com `notebooklm artifact list` antes de tentar download

---

## O QUE NAO FAZER
- NAO entregar rapido e errado — melhor demorar e acertar
- NAO tratar sintoma CSS sem investigar causa raiz no JS/DOM
- NAO copiar codigo entre arquivos sem verificar contexto
- NAO usar agente de revisao com prompt vago
- NAO delegar escrita de arquivo >500 linhas para agente — escrever direto com Write tool
- NAO declarar arquivo "criado" sem verificar que o arquivo existe e tem o tamanho esperado
