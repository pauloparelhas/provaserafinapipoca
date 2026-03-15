# DOCUMENTACAO TECNICA — PROJETO SERAFINA
**Criado:** 08/03/2026 | Versao 1.0

---

## VISAO GERAL DA STACK

| Item           | Decisao                                      |
|----------------|----------------------------------------------|
| Tecnologia     | HTML5 + CSS3 + JavaScript puro (vanilla JS)  |
| Frameworks     | Nenhum (zero dependencias externas)          |
| Build          | Nenhum — abrir direto no navegador           |
| Deploy         | GitHub Pages (ativo) ou Netlify Drop (arrastar pasta) |
| Empacotamento  | Um arquivo `.html` por ferramenta (autocontido) |
| Navegadores    | Chrome/Edge modernos; nao otimizado para IE  |

**Decisao arquitetural central:** cada ferramenta e um unico arquivo HTML completamente autocontido — todo CSS e JS esta inline no mesmo arquivo. Isso permite:
- Abrir sem servidor (file://)
- Enviar por WhatsApp/email como arquivo unico
- Nao requer instalacao nenhuma

---

## ESTRUTURA DE PASTAS (sessao 3 — estrutura PLANA)

```
provas/
  index.html                          <- hub central com links para todas as ferramentas
  LP01_genero_textual_diario.html     <- todos os HTMLs ficam na RAIZ de provas/
  LP02-03_personagem_serafina.html
  LP04-07_maiuscula_minuscula.html
  LP05_ordem_alfabetica.html
  LP06_separacao_silabica.html
  LP08_meu_esconderijo.html
  01_LINGUA_PORTUGUESA/               <- materiais de estudo (sem ferramentas)
  02_ELA_INGLES/                      <- a criar; futuras ferramentas ELA tambem na raiz
  03_HISTORIA/                        <- a criar
  planejamento/                       <- docs, scripts, agentes .md
```

**REGRA DE CAMINHO (obrigatoria desde sessao 3):**
- `goToIndex()` usa `'index.html'` (sem barras — mesmo diretorio)
- `index.html` usa `href="LP01_..."` (sem prefixo de subpasta)
- Novas ferramentas ELA/HIS: tambem na raiz de provas/, mesmo padrao

---

## ARQUITETURA INTERNA DE CADA FERRAMENTA

### Secoes padrao de um arquivo HTML

```
1. <head>          — meta, title, CSS completo (dark + light themes)
2. <body>
   - <canvas>      — fundo de estrelas animadas
   - <nav>         — barra de navegacao fixa
   - .screen[data-screen="teoria"]   — tela de teoria/instrucoes
   - .screen[data-screen="nivel-1"]  — primeiro nivel interativo
   - .screen[data-screen="nivel-2"]  — segundo nivel (se houver)
   - .screen[data-screen="bonus"]    — atividade de escrita (se houver)
   - <dialog>      — modal de ajuda (acessibilidade)
3. <script>
   - Dados de conteudo (arrays de objetos)
   - Estado do jogo (objeto JS)
   - Logica de drag & drop
   - Logica de click-to-move
   - Gerenciamento de rodadas (anti-repeticao)
   - Funcoes de feedback visual
   - Funcoes de acessibilidade (tema, A+/A-)
```

---

## COMPONENTES VISUAIS REUTILIZAVEIS

### Fundo de estrelas (canvas)
- `<canvas id="starfield">` posicionado fixed, z-index 0
- JS gera N estrelas com posicao/tamanho/opacidade aleatorios
- requestAnimationFrame para cintilacao suave
- Sempre presente em todas as ferramentas

### Navbar fixa
```
[Logo/Titulo] [Score: X/Y] [Inicio] [Voltar] [Avancar] [Tema] [A-] [A+] [?]
```
- `position: fixed; top: 0; z-index: 100`
- Score: acumula entre niveis dentro da mesma ferramenta
- Inicio: volta ao index.html
- Voltar/Avancar: navega entre telas (.screen) da ferramenta atual
- Tema: alterna dark (#0d0b1e) / light (branco com overrides completos)
- A- / A+: reduz/aumenta font-size base (min 14px, max 22px)
- ?: abre `<dialog>` com instrucoes resumidas

### Cards de jogo
| Estado   | Cor            | Hex base             | Comportamento           |
|----------|----------------|----------------------|-------------------------|
| Neutro   | Amarelo        | #f59e0b → #fbbf24    | Arrastavel + clicavel   |
| Correto  | Verde          | #10b981              | Bloqueado (nao interage)|
| Erro     | Vermelho       | #ef4444              | Arrastavel + clicavel   |

**Regra critica:** card correto fica BLOQUEADO. Card errado permanece TOTALMENTE INTERATIVO (pode ser arrastado de volta ao banco ou para outra zona).

### Banco de pecas
- Container sempre visivel com todas as pecas disponiveis naquela rodada
- Rodada nova: banco recarregado com combinacao diferente da anterior
- Anti-repeticao: estado `lastRound` guarda indices/IDs usados; nova rodada sorteia ate ser diferente

---

## MECANICA DE DRAG & DROP

### Implementacao
```javascript
// HTML5 Drag and Drop API
card.setAttribute('draggable', 'true');
card.addEventListener('dragstart', handleDragStart);
zona.addEventListener('dragover', e => e.preventDefault());
zona.addEventListener('drop', handleDrop);
```

### Click-to-move (complementar ao drag)
- Primeiro clique: seleciona peca (estado "selecionado", borda destacada)
- Segundo clique em zona vazia: move a peca para la
- Segundo clique em outra peca no banco: troca selecao
- Click em zona ocupada por peca correta: ignorado

### Fluxo de validacao
```
1. Usuario solta peca em zona
2. Verificar se peca == resposta esperada da zona
3a. Correto → peca fica verde + bloqueada, incrementa score
3b. Errado  → peca fica vermelha, permanece interativa
4. Verificar se todas as zonas estao corretas
5. Se sim: delay >= 2400ms → exibir feedback de conclusao
```

### Skip (pular nivel)
- Avanca para proxima tela SEM mostrar tela de parabens
- SEM incrementar score do nivel pulado
- SEM revelar gabarito visualmente

---

## GERENCIAMENTO DE RODADAS

```javascript
const state = {
  currentRound: 0,
  score: 0,
  lastCombo: null,   // evita repeticao
  fontSize: 16,
  theme: 'dark'
};

function novaRodada() {
  let combo;
  do {
    combo = sortearCombinacao();
  } while (combo.id === state.lastCombo);
  state.lastCombo = combo.id;
  renderRodada(combo);
}
```

---

## ESTRUTURA DE DADOS DE CONTEUDO

### Padrao geral
```javascript
const CONTENT = [
  {
    id: 'unique_id',
    // campos especificos de cada ferramenta
  }
];
```

### LP-01 (Genero Textual Diario)
```javascript
// 6 entradas exclusivas para teoria (exemplos do livro Serafina)
const SERAFINA_DIARIES = [ { date, greeting, body, signoff, signature } ];

// 20 contextos universais para os niveis do jogo
const GAME_CONTEXTS = [
  {
    id,
    saudacao,      // 2-3 palavras ex: "Querido Diario,"
    corpo,         // 3 frases com conectivos (mas/depois/entao/por isso), ~30-35 palavras
    despedida,     // simples: "Ate amanha" / "Com carinho" / "Beijos"
    assinatura,    // nome+sobrenome fantasia, genero coerente com o texto
    data           // data ficticia
  }
];
```

### LP-08 (Meu Esconderijo)
```javascript
const ESCONDERIJOS = [
  {
    id,
    titulo,        // cor #fb923c
    ondeficca,     // cor #f472b6
    oquettem,      // cor #a78bfa
    oquefaco,      // cor #34d399
  }
]; // 6 versoes para Nivel 1 | mesma base + 2 distratoras para Nivel 2
```

---

## PADROES DE ACESSIBILIDADE

| Feature     | Implementacao                                               |
|-------------|-------------------------------------------------------------|
| Tema claro  | Classe `.light` no `<body>`, overrides COMPLETOS no CSS     |
| Tamanho     | `document.body.style.fontSize` em px; min 14, max 22       |
| Ajuda       | `<dialog>` nativo HTML5, fechado com botao ou Escape        |
| Contraste   | Testado visualmente em dark e light; botoes sempre cor solida |
| Touch       | Drag funciona em touch via eventos touchstart/touchmove/touchend (ou pointer events) |

**Regra:** botoes secundarios NUNCA transparentes — sempre cor solida em ambos os temas.

---

## ANTI-PADROES CONHECIDOS (EVITAR)

| Anti-padrao                         | Problema                                      |
|-------------------------------------|-----------------------------------------------|
| Gabarito deduzivel pela formatacao  | Crianca aprende posicao, nao conteudo         |
| Tela de parabens no Skip            | Recompensa comportamento de pular             |
| Card errado bloqueado               | Frustrante; impede correcao                   |
| Scroll na tela de jogo              | Ruim em tablet/touch; perde visao geral       |
| Texto truncado com reticencias      | Ilegivel; perda de contexto pedagogico        |
| Label ao lado do conteudo em card   | Espaco insuficiente; hierarquia confusa       |
| Delay < 2400ms na conclusao         | Crianca nao processa o feedback antes de avancar |

---

## FERRAMENTAS CONCLUIDAS — RESUMO TECNICO

| Codigo   | Ferramenta               | Interacao principal       | Niveis | Bonus |
|----------|--------------------------|---------------------------|--------|-------|
| LP-06    | Separacao Silabica       | Drag sílabas em ordem     | 2      | Nao   |
| LP-05    | Ordem Alfabetica         | Drag palavras em ranking  | 2      | Nao   |
| LP-04+07 | Maiusc/Minusc + Uso      | Identificar + arrastar    | 2      | Nao   |
| LP-01    | Genero Textual Diario    | Montar + escrever         | 2      | Sim (textarea + andaime) |
| LP-08    | Meu Esconderijo          | Identificar + fill-blank  | 2      | Sim (guia de escrita 4 etapas) |

---

## GUIA DE REPLICACAO — NOVA AF / NOVA DISCIPLINA

Este projeto e um **framework reutilizavel**. Para replicar em uma nova avaliacao:

### O que NUNCA muda (design system)
- Stack: HTML/CSS/JS puro, arquivo unico por ferramenta
- Visual: fundo #0d0b1e + estrelas canvas, navbar fixa, cards amarelo/verde/vermelho
- Interacoes: drag&drop + click-to-move, banco de pecas, anti-repeticao
- Acessibilidade: tema, A+/A-, ajuda modal
- Regras: card-ok bloqueado, card-err interativo, skip silencioso, delay 2400ms

### O que SEMPRE muda por AF
| Variavel          | Onde configurar             | Exemplos                       |
|-------------------|-----------------------------|--------------------------------|
| Disciplina        | Nome da pasta e prefixo     | LP, ELA, HIS, MAT              |
| Conteudos         | Arrays de dados no JS       | palavras, textos, conceitos    |
| Personagem/tema   | Nome, cores, narrativa      | Serafina / outro personagem    |
| Niveis de jogo    | Tipos de interacao          | identificar, ordenar, completar|
| Bonus             | Atividade de producao       | escrita, desenho guiado, etc.  |

### Processo para criar nova ferramenta (protocolo obrigatorio)
```
1. Identificar conteudo da AF (lista do professor/caderno)
2. Mapear em categorias: teoria / pratica nivel 1 / pratica nivel 2 / bonus opcional
3. Definir tipo de interacao para cada nivel (drag-order / drag-match / fill-blank / etc.)
4. Propor design em texto — aguardar aprovacao
5. Definir estrutura de dados (quais campos cada item precisa)
6. Gerar HTML a partir do template mental deste framework
7. Adicionar link no index.html da disciplina e no hub raiz
```

### Tipos de interacao disponiveis (ja implementados e testados)
| Tipo            | Descricao                                         | Usado em     |
|-----------------|---------------------------------------------------|--------------|
| drag-order      | Arrastar itens em ordem correta                   | LP-05, LP-06 |
| drag-match      | Arrastar peca para zona rotulada correspondente   | LP-08 N1     |
| fill-blank      | Banco de palavras para preencher lacunas          | LP-08 N2     |
| identify-write  | Identificar estrutura + escrever producao propria | LP-01        |
| highlight-rule  | Identificar elemento e aplicar regra              | LP-04+07     |

### Checklist nova ferramenta
- [ ] Arquivo nomeado: `ELA01_acrostic_poem.html` e salvo DIRETO na raiz de `provas/`
- [ ] Conteudo: minimo 6 itens no banco para variedade de rodadas
- [ ] Anti-repeticao implementada
- [ ] goToIndex() usa `'index.html'` (sem barras)
- [ ] Strings JS: verificar aspas simples nao escapadas dentro de strings
- [ ] Checklist pre-entrega geral aplicada (ver MEMORY.md)
- [ ] Adicionado no hub raiz: `index.html` com href direto `ELA01_...html`
- [ ] Apos adicionar no index.html local: enviar arquivo atualizado ao GitHub

---

## PARA DISCUTIR COM PROFISSIONAIS DE TI

### O que foi construido
- 5 ferramentas educativas interativas em HTML/CSS/JS puro
- Zero dependencias, zero servidor, zero build
- Padrao visual consistente (dark space theme, navbar, cards)
- Pedagogia gamificada: feedback imediato, nao punitivo, anti-frustracao

### Possiveis evolucoes tecnicas
1. **Componentizacao:** extrair navbar, starfield, card como Web Components ou modulos JS
2. **Banco de dados de conteudo:** mover arrays de dados para JSON externo ou CMS headless
3. **Progressao persistente:** localStorage para salvar score entre sessoes
4. **PWA:** service worker para funcionar offline instalado
5. **Framework:** migrar para React/Vue para facilitar manutencao do estado
6. **Gerador de ferramentas:** template engine que gera HTML a partir de YAML de conteudo
7. **Autoria:** interface para professores criarem novas ferramentas sem codar

### Esforco estimado por ferramenta
- Ferramenta simples (2 niveis, 1 tipo de interacao): ~3-4h de desenvolvimento
- Ferramenta complexa (teoria + 2 niveis + bonus): ~6-8h de desenvolvimento
- Todas as 5 ferramentas LP: ~25-30h equivalente humano

---

## ELA — DESIGN APROVADO (08/03/2026)

### Decisao de estrutura
4 ferramentas em vez de 6 (alguns conteudos agrupados). Todas em ingles.
Botao "PT BR" na navbar: quando ativo, hover em qualquer card/zona exibe tooltip com traducao em portugues.

### ELA-01 — Acrostic Poem
- **Arquivo:** ELA-01_acrostic_poem.html
- **Teoria:** o que e acrostic poem + exemplo com FRIEND
- **Nivel 1:** banco de versos embaralhados → arrastar para a letra certa (palavras-chave: FRIEND / FAMILY / SCHOOL)
- **Nivel 2:** fill-in-the-blank — verso com lacuna + banco de opcoes
- **Bonus:** escrever proprio poema com o nome da crianca; sugestoes de palavras por letra
- **Dados:** 3 palavras-chave × 6 versos cada = 18 itens

### ELA-02 — Bucket Filler vs Dipper
- **Arquivo:** ELA-02_bucket_filler.html
- **Teoria:** balde cheio (feliz) vs vazio (triste) — baseado no livro Have You Filled a Bucket Today?
- **Nivel 1:** classificar comportamentos → arrastar para balde FILLER ou DIPPER (6 por rodada, 3+3)
- **Nivel 2:** completar frase com o verbo certo (fill/empty + contexto)
- **Sem bonus**
- **Dados (16 comportamentos):**
  - Fillers: say something nice, share your lunch, help a friend, give a hug, say thank you, include everyone, smile at someone, say sorry
  - Dippers: say something mean, leave someone out, take without asking, ignore a friend, make fun of someone, call bad names, yell at a friend, break someone's things

### ELA-03 — My Community
- **Arquivo:** ELA-03_my_community.html
- **Cobre:** Community helpers + Sense of community
- **Teoria:** o que e comunidade + quem ajuda
- **Nivel 1:** match profissao → funcao (arrastar card de profissao para descricao correta)
- **Nivel 2:** match profissao → local de trabalho
- **Bonus:** "What do YOU want to be?" — escolher profissao + escrever 1 frase
- **Dados (8 profissoes):** doctor, firefighter, teacher, police officer, dentist, baker, farmer, librarian

### ELA-05 — Family & Friends
- **Arquivo:** ELA-05_family_friends.html
- **Cobre:** Family vocabulary + Reading texts (ELA-05 + ELA-06)
- **Teoria:** arvore da familia com vocabulario
- **Nivel 1:** identificar parentesco na arvore — arrastar nome para posicao correta (5 membros por rodada)
- **Nivel 2:** reading comprehension — texto curto (3-4 frases) + 3 perguntas de multipla escolha (drag resposta)
- **Bonus:** preencher arvore da propria familia (escrita guiada)
- **Dados:** vocabulario nuclear (mother, father, sister, brother, baby, grandma, grandpa) + extended (aunt, uncle, cousin) | 6 textos de leitura no banco

---

## HISTORICO DE DECISOES

| Data       | Decisao                                         | Razao                              |
|------------|-------------------------------------------------|------------------------------------|
| 08/03/2026 | Card errado: interativo (nao bloqueado)         | Crianca pode corrigir sem frustrar |
| 08/03/2026 | Skip silencioso (sem parabens)                  | Nao recompensar pular              |
| 08/03/2026 | GAME_CONTEXTS separado de SERAFINA_DIARIES      | Teoria x jogo: contextos diferentes |
| 08/03/2026 | Delay >= 2400ms antes de avancar                | Crianca processa feedback          |
| 08/03/2026 | Anti-repeticao de rodadas                       | Variedade; nao memorizar posicao   |
| 08/03/2026 | Label acima do conteudo (flex-column)           | Hierarquia visual clara em cards   |
| 08/03/2026 | ELA: 4 ferramentas em vez de 6 (agrupamentos)  | Conteudos afins na mesma ferramenta|
| 08/03/2026 | ELA: botao PT BR toggle na navbar              | Crianca desafia a si mesma sem apoio fixo |
| 08/03/2026 | Docs visiveis em 00_COORDENACAO/documentacao_tecnica/ | Sem conflito de numeracao; coordenacao e unica pasta meta |
| 08/03/2026 | Estrutura plana: todos os HTMLs na raiz de provas/    | Simplifica hospedagem GitHub Pages; sem subpastas de ferramentas |
| 08/03/2026 | GitHub Pages ativado (main, root)                      | URL publica permanente; atualizavel pela interface do GitHub |
| 08/03/2026 | Bug BANCO_EVIDENCIAS: aspas simples nao escapadas      | Strings com aspas internas: usar aspas duplas ou escapar |
| 08/03/2026 | LP06 vogais: vogal forte vs semivogal documentado      | Correcao pedagogica — silaba pode ter mais de uma vogal |
