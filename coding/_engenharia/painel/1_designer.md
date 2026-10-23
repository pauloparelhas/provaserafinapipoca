# Fábrica de Jogos — proposta do designer (painel, 23/10/2026)

Leitura prévia: `DESIGN.md`, `ROADMAP.md`, `banco/catalogo.js`, `banco/blocos.js`, `banco/missoes.js`,
`js/motor.js`, `js/editor.js`, `js/telas.js`, `js/estado.js`, `js/ui.js`. Nenhum arquivo do produto foi tocado.

## O que o produto é hoje (o chão de onde partimos)

- Mapa fixo de **12 linhas** (`LINHAS = 12`, `VH = 192`), largura 20 a 120 casinhas; a câmera só anda em x
  (`cam.y` nunca muda). Toda fase é "andar para a direita até a bandeira".
- A água **já existe** como física (herói lento, pulo curto, gravidade fraca) — mas não há fase aquática:
  nenhum bicho nada, nada acontece embaixo d'água, o cenário "Fundo do mar" é só um fundo.
- Poderes já existem como ações temporárias do FAÇA: `pulaalto`, `rapido`, `gigante`, `pequeno`.
  Gigante e pequeno **só mudam o desenho**, não a colisão — hoje são cosmética.
- Blocos: 12 QUANDO, 4 SÓ SE, 22 FAÇA. Regras-modelo nascem com o jogo; ela troca a peça do cartão.
- Jornada: barra com 11 telas (5 grandes + 6 pequenas); Painel tem "Continuar" (vai para a missão),
  "Testar", a missão sugerida, a grade de jogos e dois botões do papai (arquivo e microfone) no mesmo
  lugar que os dela. A tela em que ela parou é lembrada (`fab_tela`), mas o Painel não diz isso a ela.
- Salvar: autosave no navegador a cada mudança (invisível para ela); "foto do jogo" no Diário;
  "Guardar no computador" baixa o .json inteiro (canal com o robô). Publicar = link com o jogo dentro.
- Feedback dela: três carinhas + "o que vou mudar" no fim do teste; pedido ao robô em 3 partes.

Diagnóstico em uma frase: o motor é bom e o banco é generoso, mas o **mundo é plano** e a **porta de
entrada é um corredor com 11 portas iguais**. A proposta ataca as duas coisas e mantém a regra da casa:
ela constrói, o robô faz peças, nada trava, instrução mínima.

---

## 1. Mundo de possibilidades (o cardápio)

Legenda de custo: **ela** = quanto ela precisa entender para usar; **nós** = esforço de construção
(B baixo = horas, M médio = um dia, A alto = vários dias). **Leva** = 1 (primeira), 2, 3.

### 1.1 Tipos de fase (formatos)

Cada formato é um **modelo de fase** (não de jogo): nasce pré-pintado com começo, bandeira e o esqueleto
do caminho; ela pinta por cima. Entra no botão "Fase nova" (hoje cria só uma reta de 40 casinhas).

| Formato (nome na tela) | O que é | Encanto para ela | Precisa de | ela | nós | Leva |
|---|---|---|---|---|---|---|
| **Reta** | o que existe hoje: anda para a direita | já conhece | nada | B | B | 1 |
| **Torre** (sobe) | mapa alto (24 a 48 linhas), bandeira no topo; nuvens, molas, cipós para subir; cair custa tempo, não vida | "cheguei lá em cima!"; o mapa vira escalada | mapa alto + câmera em y | B | M | 1 |
| **Poço** (desce) | começa no topo, bandeira no fundo; cai de nuvem em nuvem desviando de espinhos; água no fundo amortece | queda controlada, vertigem boa | mapa alto | B | B (depois da Torre) | 1 |
| **Lago** (nada) | fase quase toda de água; bolhas de ar, peixes e polvos, cofre no fundo | nadar livre, "fôlego" como relógio que esvazia | fôlego + bichos que nadam | B | M | 1 |
| **Caverna** | reta ou torre em cenário escuro; morcegos; cristais; (leva 2: lanterna com círculo de luz) | mistério, descobrir o caminho | só modelo (leva 1); lanterna (leva 2) | B | B / M | 1 / 2 |
| **Céu** | torre de nuvens com molas, pássaros e penas (planar) | voar curto, cair e se salvar | mapa alto + pena | B | B | 1 |
| **Castelo** | já existe como jogo-modelo; vira formato de fase com chave, porta, placa | já ama | nada | B | B | 1 |
| **Corrida** | reta comprida com relógio e relógios para pegar | já existe (`corrida`) | nada | B | B | 1 |
| **Montaria** | reta com cavalo no começo e trechos que só a montaria passa | correr e pular montada | pacote montaria | M | M | 1 |
| **Chefão** | sala fechada com um bicho grande que tem vidas | "venci o chefe" | vida do inimigo = caixinha | M | A | 2 |
| **Labirinto** (vista de cima) | andar nos 4 sentidos, sem gravidade | outro jogo inteiro | segundo motor | M | A | 3 |

Regras de formato (para a tela não confundir): a escolha tem **no máximo 6 cartões** por vez; os três
primeiros são sempre Reta, Torre, Lago; o resto gira conforme o que ela já usou (ver 2.4).

### 1.2 Peças e mecânicas novas (o que entra na paleta de Fases)

| Peça (nome de criança) | O que faz no motor | Encanto | Custo ela / nós | Leva |
|---|---|---|---|---|
| **Cipó** (`classe: escada`, vertical, planta) | segurando ▲ o herói sobe, ▼ desce; solta e cai | subir a torre pela selva | B / B | 1 |
| **Escada** (madeira; mesma classe do cipó, outra cara) | igual ao cipó | castelo e caverna | B / B | 1 |
| **Bolha de ar** (item da água) | fôlego +5 ao tocar | "respirei!" | B / B | 1 |
| **Peixe**, **Polvo**, **Água-viva** (inimigos `mover: nada`) | peixe vai e volta; polvo sobe e desce; água-viva flutua devagar atrás dela | fase do lago tem vida | B / B | 1 |
| **Cano** (par da mesma cor; entra com ▼) | teletransporta para o outro cano da mesma cor; sem par, leva para a próxima fase | passagem secreta; Mario | B / B | 1 |
| **Pena** (item) | liga o poder Planar até o fim da fase | voar curto | B / B | 1 |
| **Luva grudenta** (item) | liga o poder Grudar na parede | subir paredes como lagartixa | B / B | 1 |
| **Asinha** (item) | liga Pulo duplo | pular no ar | B / B | 1 |
| **Portinha de rato** (chão que só o herói pequeno atravessa) | sólido, exceto quando `pequeno` | túnel secreto, rastejar | B / B | 1 |
| **Cavalo**, **Tartaruga**, **Dino amigo** (montarias, parados no mapa) | ao tocar, o herói monta (ver seção 3) | Yoshi | M / M | 1 |
| **Plataforma que anda** (↔ ou ↕, 2 velocidades) | sólido móvel; o herói vai junto | ritmo, esperar a hora de pular | B / M | 2 |
| **Alavanca** | liga/desliga plataforma, porta ou cano | causa e efeito à distância | M / M | 2 |
| **Lanterna** + escuridão da caverna | círculo de luz ao redor do herói; lanterna aumenta | medo bom, exploração | B / M | 2 |
| **Tijolo frágil** | quebra quando o herói gigante bate | gigante vira útil | B / B | 2 |
| **Chefão** (`vidas` por peça) | inimigo grande com caixinha de vida; pisar tira 1 | épico | M / A | 2 |
| **Vento** (zona que empurra) | acelera ou freia na horizontal/vertical | céu e caverna ganham força invisível | M / M | 3 |
| **Música** (sequenciador) | já no ROADMAP | — | — | 3 |

Observação de motor: a classe `escada` exige uma tecla **para baixo** (hoje só existe ▲ = pulo).
Proposta: `ArrowDown`/`S` e um botão ▼ na mesa de toques. Fora do cipó, ▼ = **agachar** (o herói
fica pequeno enquanto segura). Isso dá o "rastejar" que o pai citou sem peça nova.

### 1.3 Poderes (o que o herói passa a saber fazer)

| Poder (nome na tela) | Como funciona | Como ela liga | Custo ela / nós | Leva |
|---|---|---|---|---|
| **Grudar na parede** | encostado na parede caindo, desliza devagar; ▲ pula para o lado oposto | item Luva grudenta ou FAÇA "ligar poder" | B / B | 1 |
| **Pulo duplo** | um pulo a mais no ar | Asinha | B / B | 1 |
| **Planar** | segurar ▲ no ar = cai bem devagar | Pena | B / B | 1 |
| **Pequeno** (de verdade) | colisão 6×7; passa na Portinha de rato; agachar (▼) também | já existe o FAÇA; passa a valer | B / B | 1 |
| **Nadadeira** | na água anda 2× e não gasta fôlego | item Pé de pato | B / B | 1 |
| **Gigante** (de verdade) | quebra Tijolo frágil; pisa inimigo sem pular | já existe o FAÇA | B / B | 2 |
| **Lanterna** | círculo de luz na caverna | item | B / M | 2 |
| **Super velocidade** | já existe (`rapido`) | — | — | já |

### 1.4 O que cada mecânica ensina (a programação por trás)

O princípio que mantém a tela limpa: **o bloco só aparece na lista quando a peça dele existe na fase**
(se não há cano em nenhuma fase, "entrar no cano" não aparece em QUANDO). Hoje a lista de FAÇA já tem
22 itens; sem este filtro a leva 1 a levaria a 30.

| Mecânica | Blocos novos | Regra-modelo que nasce com a peça | Carta do saber |
|---|---|---|---|
| Torre / Poço | nenhum bloco novo; usa "cair no buraco", "ponto de controle" | QUANDO cair no buraco → FAÇA voltar ao controle (já existe) | Fase (caminho agora sobe) |
| Cipó / Escada | nenhum (é física) | — | — (zero custo cognitivo: "é só segurar ▲") |
| Lago: **fôlego** | QUANDO "o fôlego acabar"; FAÇA "fôlego +N"; HUD mostra a barra de fôlego | QUANDO tocar na bolha → FAÇA fôlego +5, some, som "magia". QUANDO o fôlego acabar → FAÇA vida −1, voltar ao controle | **Caixinha que esvazia sozinha** (variável + laço escondido): a ideia mais forte da leva |
| Cano | QUANDO "entrar no cano"; FAÇA "ir para" [outro cano / fase 2 / lugar secreto] | QUANDO entrar no cano → FAÇA ir para o outro cano, som "pulo" | **Ir para** (salto de lugar; pareamento por cor) |
| Poderes | FAÇA "ligar poder [x] por [10 s / até o fim da fase]"; FAÇA "desligar poder [x]"; QUANDO "o poder [x] acabar"; SÓ SE "tiver o poder [x]" | QUANDO tocar na pena → FAÇA ligar Planar até o fim da fase, some. QUANDO o poder acabar → FAÇA balão "Acabou!" | **Ligado ou desligado** (estado/booleano) + **tempo do poder** (variável de duração) |
| Montaria | FAÇA "montar"; FAÇA "desmontar"; SÓ SE "estiver montada"; QUANDO "montar" | QUANDO tocar no cavalo → FAÇA montar, balão "Vamos!". QUANDO tocar em inimigo SÓ SE estiver montada → FAÇA desmontar, som "ai" (em vez de perder vida: a lógica do Yoshi) | **Só se** com estado (condição sobre o herói, não sobre a mochila) |
| Portinha de rato | SÓ SE "estiver pequena" | QUANDO tocar na portinha SÓ SE estiver pequena → FAÇA balão "Passei!" | Só se (variação) |
| Plataforma / Alavanca (leva 2) | FAÇA "ligar/parar [peça]" | QUANDO tocar na alavanca → FAÇA ligar a plataforma | **Interruptor** (estado de outra peça) |
| Chefão (leva 2) | QUANDO "a vida do chefão chegar a 0"; FAÇA "vida do chefão −1" | QUANDO pular em cima do chefão → FAÇA vida do chefão −1, som "bum". QUANDO a vida do chefão chegar a 0 → FAÇA ganhar a fase | **Caixinha de outro** (variável do inimigo) |

Blocos novos na leva 1, contados: QUANDO +4 (fôlego acabar, entrar no cano, poder acabar, montar),
SÓ SE +3 (tiver o poder, estiver montada, estiver pequena), FAÇA +6 (fôlego +N, ir para, ligar poder,
desligar poder, montar, desmontar). Com o filtro "só aparece se a peça existe", uma fase reta comum
continua vendo exatamente a lista de hoje.

---

## 2. A jornada fácil

Meta: em qualquer momento, com a Fábrica aberta, ela sabe **onde está**, **o que fazer agora** e
**onde clicar** — sem ler mais que uma frase, e com o alto-falante sempre ao lado.

### 2.1 "Comece por aqui": o Painel vira uma só pergunta

Hoje o Painel oferece 6 ações de peso igual. Proposta: o Painel tem **um botão grande** e o resto
fica pequeno embaixo.

```
┌──────────────────────────────────────────────────────────────┐
│  [urso]  Castelo da chave                                     │
│                                                               │
│  Você parou aqui: FASES, Fase 2 "Torre"           (ontem)     │
│                                                               │
│      ┌──────────────────────────────────┐                     │
│      │  ▶  CONTINUAR DE ONDE PAREI       │   (amarelo, grande)│
│      └──────────────────────────────────┘                     │
│                                                               │
│  Próximo passo:  Teste a Torre e veja se dá para subir.       │
│  [Testar]                                                     │
├──────────────────────────────────────────────────────────────┤
│  Meus jogos   [Castelo] [Primeiro jogo] [Lago] [ + Jogo novo ]│
│  Minha estante (publicados)  [Castelo v2]                     │
├──────────────────────────────────────────────────────────────┤
│  Para o papai (pequeno, cinza):  arquivo · microfone          │
└──────────────────────────────────────────────────────────────┘
```

- **"Você parou aqui"** usa o que já é guardado (`fab_tela`, `E.atual`, fase aberta no editor) e passa a
  guardar também a fase e a aba de Regras. A frase é lida em voz alta ao abrir ("Você parou nas Fases,
  na Torre. Quer continuar?").
- **"Continuar de onde parei"** leva à tela, ao jogo e à fase exatos. Na primeira abertura de todas,
  o mesmo botão diz **"Começar o meu primeiro jogo"** e abre o Mapa de caminhos (2.2) com a primeira ilha acesa.
- **"Próximo passo"** é a missão sugerida reescrita como ação sobre o jogo dela (não "Missão 7 de 25").
- Os botões do papai saem do caminho dela: ficam numa linha cinza pequena no rodapé, com o rótulo "Para o papai".

### 2.2 Mapa de caminhos (a trilha como tabuleiro)

Uma tela nova e leve, "**Caminho**", que substitui a tela Missões como porta de entrada da trilha
(Missões continua existindo para quem quer a lista inteira). É um tabuleiro de **5 ilhas** na ordem
do ciclo que a DESIGN.md já ensina, com a bolinha do herói parada na ilha atual:

```
 (1) DESENHAR  ──►  (2) FASES  ──►  (3) REGRAS  ──►  (4) TESTAR  ──►  (5) MOSTRAR
   o herói        pintar o        o que         jogar e          chamar
   do seu jeito   caminho         acontece      consertar        alguém
     [feito]       [você está aqui]  [ ]           [ ]              [ ]
```

- Cada ilha é um botão grande com desenho SVG, uma palavra e o alto-falante.
- A ilha atual pulsa; as ilhas feitas ganham uma estrela; nada trava (ela clica em qualquer ilha).
- Dentro da ilha, as missões daquela tela aparecem como **3 pedrinhas** (as próximas três do lugar),
  não as 25 de uma vez.
- Quando chega na ilha 5 e publica, o caminho "dá a volta": "Agora melhore: o que o papai achou difícil?"
  e aponta para o Diário (o ciclo da DESIGN.md desenhado na tela).

### 2.3 Próximo passo sempre visível (o trilho)

Toda tela ganha, no rodapé, um **trilho** com dois botões fixos:

```
  ◀ Fases                      Próximo:  Regras  ▶
```

- O botão da direita diz o próximo passo do ciclo (Desenhar → Fases → Regras → Testar → Mostrar → Diário).
- Se há missão sugerida naquela tela, o trilho mostra a frase dela em cima ("Espalhe moedas até ter 15 — faltam 4")
  com o **contador vivo** (a conferência das missões já roda a cada `FAB.mudou()`; só falta mostrar o número).
- O chip de missão do topo (`chipMissao`) continua, mas fala a mesma frase do trilho (uma voz só).
- No Testar, o trilho vira "◀ Regras · Mostrar ▶" e fica escondido na tela grande, como hoje a barra.

### 2.4 Fase nova vertical ou aquática em três cliques

```
 Fases  →  [+ Fase nova]  →  "Como é a fase?"  →  [Reta] [Torre] [Lago] [Poço] [Céu] [Castelo]  →  pinta
```

- A escolha mostra 6 cartões com **miniatura real** do modelo (a `desenhaMapa` já faz miniaturas).
- O modelo nasce jogável: começo, bandeira, chão/água, 3 moedas e 1 peça típica (Torre: 2 cipós e 3 nuvens;
  Lago: 4 bolhas e 1 peixe; Céu: 2 penas). Testar na hora já diverte; pintar é opcional.
- Na Torre e no Poço o editor ganha ▲▼ "ver mais para cima/baixo" (irmãos dos ◀▶ de hoje) e "+alto / −alto"
  ao lado de "+comprida / −comprida". Um **mini-mapa** no canto mostra onde a janela está.
- A paleta de peças ganha dois grupos: **"Subir e descer"** (cipó, escada, mola, cano, nuvem) e **"Água"**
  (água, bolha, peixe, polvo, água-viva, pé de pato). Os grupos de hoje perdem o que migrou; o total vai de 5
  para 7 grupos, cada um com no máximo 9 peças (como hoje).
- O cenário acompanha o formato (Lago nasce "Fundo do mar", Céu nasce "Dia de sol"); ela troca se quiser.

### 2.5 Guardar e publicar (sem o papai)

Hoje ela nunca "salva" — salva-se sozinho — e isso a deixa insegura ("vai sumir?"). Proposta:

- **Selo "Salvo"** no topo: um check verde pequeno que pisca a cada `FAB.mudou()`; ao abrir a Fábrica,
  o Painel diz "Tudo guardado". Custo zero, segurança alta.
- **"Guardar com nome"** no Diário (é a foto do jogo com nome dela em vez de "Foto 3"): "Guardar como…"
  → campo com ditado → "Castelo com torre". A lista de fotos vira **"Minhas versões"**.
- **Estante** (tela Mostrar): botão **"Pôr na estante"** cria uma cópia congelada do jogo com capa
  (sprite do herói + nome + história) e data. A estante aparece no Painel. Jogo publicado não muda quando
  ela continua editando o original (a mesma lógica de `tiraFoto`, com rótulo `publicado`).
- **"Fazer o link"** continua como hoje (jogo dentro do link). Fica ao lado de "Pôr na estante".
- "Guardar no computador" (o .json) vira **"Mandar para o papai"**, na linha do papai. É também o canal do
  ciclo de melhoria (seção 4).

### 2.6 Retomar de onde parou (o que muda no estado)

Guardar em `prefs`: `ultimaTela`, `ultimoJogo`, `ultimaFase`, `ultimaAba`, `quando`. Ao abrir:
Painel monta a frase "Você parou em X" a partir disso. Se a última tela foi Testar, "Continuar" reabre
o Testar na fase onde ela estava (hoje Testar é sempre trocado por Painel na partida: `t === 'testar' → painel`).

---

## 3. Poderes e montarias como pacotes

O equilíbrio: **o pacote funciona sem nenhuma regra** (ela toca na pena e plana) e **toda parte do
pacote é uma regra que ela pode abrir e trocar** (como as regras-modelo já fazem).

### 3.1 O que é um pacote

Um pacote = peça (ou item) + física pronta no motor + 1 a 3 regras-modelo que nascem quando a peça
entra na fase pela primeira vez. Ela liga o pacote **pondo a peça no mapa**. Só isso.

| Pacote | Peça que liga | Física pronta | Regras-modelo que nascem (ela pode mudar) |
|---|---|---|---|
| Planar | Pena | segura ▲ no ar = cai devagar | QUANDO tocar na pena → FAÇA ligar Planar até o fim da fase, some, som "magia" |
| Grudar na parede | Luva grudenta | desliza na parede; pulo de parede | QUANDO tocar na luva → FAÇA ligar Grudar por 20 s. QUANDO o poder acabar → FAÇA balão "Acabou a cola!" |
| Pulo duplo | Asinha | 1 pulo extra no ar | QUANDO tocar na asinha → FAÇA ligar Pulo duplo até o fim da fase |
| Pequeno | Cogumelo roxo (ou ▼ agachar, sem item) | colisão 6×7; passa na Portinha de rato | QUANDO tocar no cogumelo roxo → FAÇA ligar Pequeno por 10 s |
| Nadadeira | Pé de pato | nada 2×, fôlego não gasta | QUANDO tocar no pé de pato → FAÇA ligar Nadadeira até o fim da fase |
| Cavalo | Cavalo (parado no mapa) | corre 1,6×, pula 1,3×; não entra na água | QUANDO tocar no cavalo → FAÇA montar, balão "Vamos!". QUANDO tocar em inimigo SÓ SE estiver montada → FAÇA desmontar, som "ai" |
| Tartaruga | Tartaruga | na água 2×, no chão 0,6×, nunca perde fôlego | QUANDO tocar na tartaruga → FAÇA montar |
| Dino amigo | Dino (sprite já existe como herói) | come inimigo que toca pela frente | QUANDO tocar em inimigo SÓ SE estiver montada → FAÇA a peça some, pontos +5, som "bum" |

### 3.2 Como aparece na tela

- Na paleta de Fases, grupo **"Poderes"**: pena, luva, asinha, cogumelo roxo, pé de pato; grupo
  **"Montarias"**: cavalo, tartaruga, dino amigo. Dois grupos novos (totalizando 9 grupos com os de 2.4?
  Não: "Poderes" e "Montarias" viram **um grupo só, "Poderes"**, com 8 peças — fica em 7 grupos).
- Ao soltar a peça na fase pela primeira vez, um aviso de uma frase com voz: "A pena faz o herói planar.
  Segure a seta para cima no ar." E embaixo, em letra pequena: "As regras da pena estão em Regras".
- Em Regras, as regras do pacote nascem **agrupadas com o ícone da peça** (um cartão-cabeçalho "Pena") para
  ela ver que aquelas 2 regras são "o pacote". Desligar o cadeado da regra = desliga o pedaço.
- No HUD do jogo, poder ligado aparece como ícone ao lado da mochila, com a barrinha do tempo quando tem tempo.
- Montada, o herói é desenhado em cima da montaria (dois sprites de 16 px, herói deslocado 6 px para cima); a
  montaria tem a skin dela (ela pode pintar o cavalo no Ateliê, como pinta o inimigo).

### 3.3 Personalizar = trocar uma coisa por vez

O que ela pode mudar em cada pacote, e onde:

1. **Quem liga** (o item): no cartão QUANDO, trocar "pena" por "estrela" — a estrela passa a dar Planar.
2. **Por quanto tempo**: no cartão FAÇA, trocar "até o fim da fase" por "10 s".
3. **O que acontece quando acaba**: a regra QUANDO o poder acabar (balão, som, perder vida…).
4. **O que a montaria aguenta**: a regra SÓ SE estiver montada (desmontar, ou perder vida, ou nada).
5. **Força** (leva 2): em Ajustes, "quão rápido o cavalo corre" com 3 bolinhas.

O que ela **não** pode mudar (fica no motor): a física em si. Isso é o limite saudável: o pacote é a peça
de LEGO; as regras são como ela encaixa.

### 3.4 Missões que ensinam os pacotes (entram no fim da trilha)

- "Ponha uma pena na Torre e chegue no topo planando."
- "Faça a luva grudenta durar só 5 segundos. Dá para subir mesmo assim?"
- "Monte no cavalo e passe pelo besouro sem perder vida."
- "Faça a estrela dar o pulo duplo em vez da asinha."
- "Fique pequena e passe pela portinha de rato."
- "Ponha 4 bolhas no Lago e não deixe o fôlego acabar."

---

## 4. Ciclo de melhoria contínua alimentado por ela

O ROADMAP já manda ler o .json e tirar uma melhoria de pedido dela. Falta a criança **ver** o ciclo.

### 4.1 Feedback em um toque (três lugares, nenhum obrigatório)

1. **Fim do teste** (já existe: 3 caras + "o que vou mudar"). Acrescentar uma linha: **"Queria que tivesse…"**
   com 6 fichas que giram (voar · nadar · cavalo · chefão · música · escuro) + ditado. Um toque, salvo em `E.desejos`.
2. **Na paleta de peças**: segurar o dedo numa peça abre dois carimbos: **coração** ("adoro") e **bocejo** ("chato").
   Salvo em `E.carimbos[peça]`. Custo mínimo; diz o que ela ama sem perguntar.
3. **Na medalha** de missão: antes do "Oba!", três bolinhas: **fácil · médio · difícil**. Salvo em `E.missoes[id].dif`.

Nada disso pede texto. Tudo vai no .json que o papai manda ("Mandar para o papai").

### 4.2 Como volta como melhoria (fechando o laço na tela dela)

- A rodada da Fábrica (skill `fabrica-mariana`) lê `desejos`, `carimbos`, `dif`, `pedidos`, `diario`.
  Regra da rodada, já existente: no máximo 3 melhorias, **uma vem dela**. Proposta: a que vem dela é
  sempre a mais votada entre desejos e pedidos ao robô.
- Quando a melhoria é publicada, o Painel mostra um cartão **"Você pediu, o robô fez"** com o ícone da
  novidade e um botão "Ver" (reaproveita `FAB.ENTREGAS`, que já existe para pedidos ao robô): ela vê a
  conexão entre pedir e receber. Isso é o que faz a criança continuar pedindo.
- Carimbos "chato" em peça que ela nunca usa → a peça sai da paleta visível (vai para "mais peças…").
  Carimbo "adoro" → a peça entra no modelo de fase nova. A paleta se molda ao gosto dela sem menu.
- Missões marcadas "difícil" por ela e paradas há 3 sessões → a rodada quebra a missão em duas ou
  cria uma regra-modelo que faz metade do caminho.
- O registro no fim do ROADMAP ganha uma coluna: **"veio dela?"** (desejo / carimbo / pedido / diário).

### 4.3 O que o papai vê

Um resumo de uma tela (gerado pela rodada, não pela Fábrica): o que ela mais usou, o que pediu,
onde parou, o que ficou "difícil". Sem gráfico — três listas curtas.

---

## 5. Primeira leva recomendada (10 itens, em ordem)

| # | Item | Por quê nesta posição | Custo nós | O que aparece de novo na tela |
|---|---|---|---|---|
| 1 | **Painel "Comece por aqui" + "Você parou aqui" + botões do papai no rodapé** | sem isso, nada do resto é encontrado; é o pedido mais urgente do pai | B | 1 botão grande, 1 frase |
| 2 | **Trilho "Próximo" em toda tela** + contador vivo da missão | o "próximo passo sempre visível"; custo quase zero porque a conferência já existe | B | 1 barra fixa no rodapé |
| 3 | **Mapa alto** (Torre e Poço): câmera em y, editor com ▲▼ e +alto/−alto, mini-mapa | o coração do pedido "subir e descer"; destrava Céu, Caverna alta e cipó | M | 2 botões no editor, mini-mapa |
| 4 | **Fase nova por formato** (Reta, Torre, Poço, Lago, Céu, Castelo) com miniatura | transforma o item 3 em "três cliques"; Lago e Céu já nascem com peças da leva | B | 1 janela de 6 cartões |
| 5 | **Cipó e escada** + tecla ▼ (agachar fora do cipó) | subir a Torre sem depender só de nuvens; ▼ dá o "rastejar" de graça | B | 2 peças, 1 botão de toque |
| 6 | **Fôlego, bolhas de ar, peixe, polvo, água-viva** | a fase aquática de verdade; ensina "caixinha que esvazia" (o conceito mais forte da leva) | M | grupo "Água" na paleta, barra de fôlego no HUD, 2 blocos |
| 7 | **Pacote de poderes: Pena, Luva grudenta, Asinha, Pequeno real + Portinha de rato** | quatro poderes com a mesma mecânica de bloco ("ligar poder"); grudar na parede e planar casam com a Torre e o Céu | B cada | grupo "Poderes", 4 blocos, ícone no HUD |
| 8 | **Montaria: Cavalo, Tartaruga, Dino amigo** | o pedido "tipo Yoshi"; reaproveita sprites e o Ateliê | M | 3 peças no grupo "Poderes", 3 blocos |
| 9 | **Cano** (par por cor; sem par = próxima fase) | barato, Mario puro, e ensina "ir para", que a fase 2 já pedia | B | 1 peça, 2 blocos |
| 10 | **Estante + "Guardar com nome" + selo "Salvo" + "Queria que tivesse…" + carimbos** | fecha "salvar/publicar" e abre o ciclo de feedback; tudo barato | B | 1 botão em Mostrar, 1 check no topo, 1 linha no fim do teste |

Fica para a **leva 2**: plataforma que anda + alavanca, lanterna e caverna escura, chefão, tijolo frágil e
gigante real, "peça inventada" (ela desenha e escolhe o comportamento numa lista), força do pacote em Ajustes.
**Leva 3**: vento, música, labirinto (vista de cima), galeria da família.

### Como os 10 cabem sem confundir a tela

- Paleta de Fases: de 5 para **7 grupos** (Chão · Coisas · Perigos · Inimigos · Subir e descer · Água · Poderes ·
  Começo e fim = 8; para ficar em 7, "Começo e fim" se funde com "Subir e descer" como **"Caminho"**: começo,
  controle, ponto de volta, bandeira, cipó, escada, cano, mola, nuvem). Nenhum grupo passa de 9 peças.
- Regras: **bloco só aparece quando a peça existe na fase**; fase reta comum vê a lista de hoje.
- Painel: 1 botão grande, 1 frase, o resto pequeno.
- Barra lateral: sem tela nova além de "Caminho" (que pode entrar no lugar de Missões na barra, com Missões
  acessível de dentro dela).
- Tudo que é novo nasce com voz (frase gravada por `frases.js` + `gera_audio.py`) e entrada no dicionário do inglês.

### Portões antes de publicar cada item (os de sempre, mais dois)

`valida_banco.js` · `seguranca.js` · `qa_fabrica.py` · `jogador_robo.py` (precisa aprender ▼ e cipó) ·
`teste_funcoes.py` · `teste_ingles.py`. Novos: **o robô-jogador sobe a Torre-modelo e termina o Lago-modelo
sem perder o fôlego** (um modelo que o robô não vence não entra), e **a lista de FAÇA numa fase reta tem o
mesmo tamanho de hoje** (prova de que o filtro funciona).
