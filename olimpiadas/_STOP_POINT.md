# STOP POINT — Olimpíada de Português (Categoria G · 2º ano)

**Prova da Mariana: quinta-feira, 10/09/2026 — é AMANHÃ.**
Parado na madrugada de 09/09.
Tudo o que está descrito como "no ar" está publicado e funcionando em
`https://pauloparelhas.github.io/provaserafinapipoca/` (último commit: 78c3157).

---

## O QUE ESTÁ NO AR E PRONTO PARA USO

O site já serve para ela estudar hoje. Nada abaixo é bloqueante.

**Home** (`index.html`) — três portas: Truques de prova, Simulado, e (menores)
Provas anteriores e o vídeo.

**`ferramentas/OP_estudo.html` — "Truques de prova"**
Nove blocos fechados: a prova inteira cabe em uma tela. O primeiro é o de
estrela, "Antes de tudo: o que a pergunta está pedindo" — ler a pergunta
antes do texto, achar a palavra que manda, cuidar do NÃO, conferir a resposta
lendo-a junto com a pergunta. Cada bloco abre com o truque em uma frase e
leva a um popup React com as questões REAIS daquele tipo: ela responde, vê o
gabarito e o comentário, fecha e volta exatamente onde estava.

**`ferramentas/OP_simulado.html`** — rodadas de 15 com as cotas da prova
real, sorteando primeiro o que ela nunca viu. Modo papel ligado por padrão.
Errar não fecha a questão: abre o truque, o truque desenhado naquela questão,
por que a alternativa marcada não serve, e o gesto para a próxima — e entra
uma questão-irmã da mesma família, fora da nota.

**`ferramentas/OP_provas.html`** — as seis provas oficiais inteiras, por ano e
fase, na ordem original, com grade de navegação e placar por prova.

**`ferramentas/OP_video.html`** — vídeo de 7min10s (versão antiga; ver pendências).

**Banco: `ferramentas/OP_data.js` — 194 questões**
90 reais (as 6 provas oficiais completas: 2023, 2024 e 2025 × 1ª e 2ª fase) +
104 autorais de treino (`origem: 'Treino no estilo da prova'`, nunca citando
ano ou número, e fora da tela de Provas anteriores).
Por tipo: ler 38 · buraco 26 · contar 24 · intruso 23 · sílabas 21 · letras 20
· alfabeto 16 · código 15 · placa 11.

**Nenhuma questão de fora.** As três que dependiam de desenho voltaram com as
figuras recortadas do PDF oficial (`_processo/geracao/recorta_figuras_op.py`,
12 recortes em `ferramentas/media/op/`).

**Gates** (rodar sempre os dois antes de publicar):
```
node _processo/geracao/valida_op_data.js     # estrutura, cotas, códigos, figuras, duplicatas
python _processo/geracao/qa_op.py            # percurso nas 4 telas, 4 viewports, fala silenciada
```

---

## PENDÊNCIAS — para retomar quando o Paulo mandar

### 1. APLICAR AS FALHAS DAS AUDITORIAS — a pendência nº 1
Duas das três auditorias chegaram antes de eu parar; a terceira pode ter
chegado depois.
- `_AUDITORIA_TR53_78.md` — **9 falhas críticas**, PRONTO, NÃO APLICADO
- `_AUDITORIA_TR79_104.md` — **8 falhas críticas**, PARCIALMENTE APLICADO
- `_AUDITORIA_TR25_52.md` — **CHEGOU: 10 falhas críticas + 26 concessivas**,
  NÃO APLICADO. As duas piores estão aqui:
  · **TR48 e TR49** — o truque "use TODAS as peças, uma vez cada" ELIMINA a
    resposta certa (PIPOCA usa 3 das 9 peças; PALITO, 3 das 6). É o pior caso
    de todo o acervo: seguir o truque faz riscar o gabarito.
  · **TR50** — fato falso: "SOU e RO são os outros pedaços da tesoura". RO não
    existe em TE-SOU-RA; RO é de TESOURO.
  · **TR25** — diz "última linha" onde a comida está na penúltima.
  · **TR27, TR37, TR39, TR40, TR43, TR44** — truque incompatível com o gesto.
  · 26 concessivas ("é palavra de verdade, mas…"), todas em `letras` e
    `silabas`; os 14 itens de `ler` desse bloco estão limpos.

**Já apliquei à mão** as concessivas de TR99, TR100, TR101, TR102, TR103 e
TR104 (a fórmula banida aparecia uma vez em cada item do eixo `ler` da última
leva). **Falta o resto.**

**O que falta, em ordem de gravidade** (todas com o texto substituto pronto
nos relatórios):
- **TR54** — o comentário afirma um encontro de consoantes "TS" que NÃO existe
  em PRATOS (o T e o S estão separados pelo O). Fato falso no `no`, no
  `visual` e no `porque`. É o pior: ensina a contar errado numa questão de
  contar.
- **TR86** — o `no` diz "sete pedaços" onde são oito (QUEM·CAN·TA·MA·LES·ES·
  PAN·TA), e chama de "os dois últimos símbolos" o 7º e o 8º.
- **TR53, TR55, TR58** — `truque` incompatível: "conte os pontinhos" não
  decide a questão (em TR55 o truque leva a 10, que é o distrator errado).
- **TR71-TR74** — `truque` de "frase com buraco" em questões de PORQUE, onde
  as quatro alternativas leem bem; o gesto certo é "isso IMPEDE?".
- **TR71, TR72, TR74** — comentários que dizem "igual à certa" descrevendo
  algo que a certa não faz.
- 12 concessivas remanescentes em TR67-TR78 (TR68, TR69, TR70, TR73, TR75,
  TR76, TR78).

**Por que não apliquei em massa:** o script casa o texto exato, e as tabelas
dos relatórios reformatam os trechos (0 de 30 casaram). Aplicar por
aproximação é justamente o erro que já custou caro aqui. O caminho é ler as
seções detalhadas dos relatórios (`- **Atual:**` / `- **Novo:**`), que trazem
o texto íntegro, e usar `scratchpad/aplica_truques.py` (troca dentro do bloco
do item).

**É a pendência mais importante.** Cada auditoria resolve as questões do zero
e tenta derrubá-las. As anteriores acharam coisa real: cinco erros factuais na
primeira leva (um "três A" em GAFANHOTO que tem dois; uma alternativa (M) que
virou (C); um "não rima" sobre GELADO que rima) e um "sete pedaços que são
oito" na segunda. **Não considerar o material fechado sem aplicar o que elas
apontarem.**

Como aplicar: a tabela final de cada relatório tem `trecho atual → trecho
novo`. Use o script `scratchpad/aplica_revisao.py` (troca por trecho único) e,
para campos compartilhados como `truque`, o `aplica_truques.py` (troca dentro
do bloco do item). **Nunca replace global em `truque`** — a mesma frase é
usada por até 27 itens.

Margens estreitas que os autores já sinalizaram, para conferir primeiro:
TR27 (o que é "lição de fábula"), TR35 (O ESPELHO x A SOMBRA), TR45
(BONECO × BONECA), TR51 (BANANA, duas peças NA), TR59 (R de RIO × PERA),
TR61 (critério do grupo não enunciado), TR85 (pista de forma vale para P e I),
TR90 (BARRACA só cai pela ordem), TR96 (depende do "AVISA" no comando).

### 2. Vídeo novo — FALHOU, e o antigo segue no ar (correto)
A regravação com o truque do comando na abertura chegou a gerar um vídeo,
mas com **9min04** — longo demais para uma criança de 7 anos na véspera. O
agente estava enxugando o roteiro para regerar quando travou.

**Nada foi estragado:** o vídeo publicado continua o de 7min10s, intacto
(38.019.754 bytes, sem alteração no git). A instrução de só substituir depois
de conferir o novo funcionou.

Para retomar: roteiro em `olimpiadas/trabalho/nlm_fonte_truques.md`, caderno
NotebookLM `831c48c1-9a9e-4ed6-8638-44adfcb2d88c`. O que falta é cortar o
roteiro (as variações internas dos truques 2 e 7, e o bloco do truque 8, que
é o tipo mais raro) e regerar. O tom já foi acertado com o agente: sem
preâmbulo, sem motivação, sem o vídeo falando de si mesmo.

**Julgamento honesto:** o vídeo é a peça menos importante das quatro. O que
prepara para a prova é responder questão, não assistir. Se o tempo for curto,
esta pendência é a primeira a cair.

### 3. Repetição no pior caso
Num teste de 4 rodadas **errando todas as 60 perguntas**, 38 de 160 vistas
eram repetição — quase todas questões-irmã, que só entram quando ela erra.
A irmã já consulta o histórico (corrigido); o que resta é a cota por família:
famílias pequenas (placa 11, código 15) esgotam antes. Se incomodar, o
caminho é ampliar essas duas famílias, não mexer no sorteio.

### 4. Coisas menores anotadas e não feitas
- `24F2Q9` poderia ter `acende:[4]` marcando a última frase que o `pede` cita.
- A fórmula "e é por isso que atrai" aparece em ~30 comentários; é troca
  sistêmica de estilo, não defeito.
- `25F2Q11` mantém `enun:'OBSERVE AS TRÊS COISAS ABAIXO:'` — foi ajustado,
  mas o par dele (`24F2Q8`) usa outra redação.

---

## O QUE NÃO REFAZER (decisões já tomadas, com o porquê)

- **A régua não é lição de abertura.** Virou "guia de leitura", desligado por
  padrão, dentro do próprio texto. Ela desce ao toque na linha **de baixo**.
- **Modo papel é o padrão** no simulado e nas provas: treina o olho para o
  formato do dia. A correção sai da folha, em fundo escuro, de propósito.
- **React só no componente de questão** (`OP_questao.js`), local em `assets/`.
  O projeto não usa CDN.
- **Nunca dizer que a alternativa errada "é verdadeira"** — soa como permissão
  para marcá-la. Diz-se que ela não responde à pergunta que foi feita.
- **O rótulo "(A)" nunca entra numa imagem de alternativa**: a ordem é
  sorteada, e um "(A)" gravado apareceria na posição C.
- **Questão autoral nunca aparece em "Provas anteriores"** — lá só entra o que
  caiu de verdade.
