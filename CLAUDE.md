# Projeto Serafina — Instrucoes para o Claude

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

## REGRAS DE DESIGN
- Fundo: `#0d0b1e` com starfield canvas
- Cards: gradientes, NUNCA cor chapada
- CSS vars: --fs, --bg, --card-bg, --card-border, --text, --text-soft, --text-dim
- Flag BR: appendar no CONTAINER (fc-front/fc-back), NUNCA dentro do texto
- Emojis: drop-shadow, animacoes float/pulse
- Mobile-first: testar em 360px mentalmente

## O QUE NAO FAZER
- NAO entregar rapido e errado — melhor demorar e acertar
- NAO tratar sintoma CSS sem investigar causa raiz no JS/DOM
- NAO copiar codigo entre arquivos sem verificar contexto
- NAO usar agente de revisao com prompt vago
