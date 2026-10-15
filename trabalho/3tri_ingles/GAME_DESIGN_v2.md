# The Lost Endings — Game Design v2 (documento executável)

15/10/2026 · diretor de game design · para o loop que implementa.
Fontes lidas: `JOGO_SPEC.md`, `_roteiro.md`, `_cobertura_banco.md`, `ferramentas/ING3_jogo*.js`, `gen/gen_mapas.py`, WiseBear (`LP3_jornada*.js`, `JOGO_REQUISITOS.md`).
Evidência visual: `trabalho/3tri_ingles/gd_v2_shots/` (Playwright MUDO, 1280×800; `ing3_*` = jogo atual, `wb_*` = WiseBear).
Mapas propostos: `trabalho/3tri_ingles/gen/gen_mapas_v2_proposta.py` (imprime os ASCII do Anexo e roda o portão de encaixe; hoje: **PORTÃO OK**).

---

## 0. O eixo deste documento: voltar a ser JOGO

O Paulo, literal: *"as fases estão com dificuldade nenhuma, é basicamente andar pra frente e responder perguntas, isso não é um jogo; um jogo de verdade deve ter obstáculos, desafios, tensão, satisfação em passar pelos obstáculos e vencer a fase, um pequeno sentimento de 'aaahhh' ao perder ou sofrer um dano… isso estava bem entendido no primeiro jogo e se perdeu agora".*

### 0.1 Medição: WiseBear × The Lost Endings atual

Contagem feita por script sobre os mapas (`scratchpad/conta_mapas_gd.js`, lê `LP3_jornada_mapas.js` e `ING3_jogo_mapas.js`). "Obstáculos ativos" = buracos/água + inimigos + espinhos + pingentes + rolantes/canhões + plataformas móveis + plataformas que caem (molas e moedas fora da conta).

| fase WiseBear | buracos/água | inimigos | espinhos | pingentes | rolantes/canhões | móveis | caem | submundo (ativos) | **total** |
|---|---|---|---|---|---|---|---|---|---|
| 1 Vancouver | 5 | 3 | 0 | 0 | 0 | 7 | 0 | 0 | **15** |
| 2 Banff (vertical, 30 linhas) | 0 | 2 | 0 | 0 | 1 | 1 | 0 | 6 | **10** |
| 3 Pradarias | 4 | 4 | 0 | 0 | 2 | 1 | 0 | 1 | **12** |
| 4 Churchill | 5 | 5 | 3 | 12 | 0 | 1 | 2 | 8 | **36** |
| 5 Niágara (vertical) | 0 | 2 | 0 | 0 | 2 | 0 | 6 | 4 | **14** |
| 6 Toronto (vertical, 32 linhas) | 0 | 3 | 0 | 0 | 0 | 3 | 0 | 1 | **7** |
| 7 Ottawa | 4 | 2 | 6 | 8 | 0 | 2 | 4 | 11 | **37** |
| 8 Quebec | 5 | 4 | 0 | 0 | 4 | 1 | 2 | 1 | **17** |
| 9 Peggy's Cove | 5 | 5 | 0 | 0 | 0 | 1 | 0 | 1 | **12** |
| **média WiseBear** | | | | | | | | | **17,8** |

| reino atual (ING3) | buracos/água | inimigos | espinhos | rolantes | móveis | caem | submundo | **total** | tipos de inimigo |
|---|---|---|---|---|---|---|---|---|---|
| 1 Village | 3 | 2 | 0 | 0 | 0 | 0 | não tem | **5** | 1 (mancha) |
| 2 Forest | 4 | 3 | 0 | 0 | 1* | 0 | não tem | **8** | 1 |
| 4 Reef | 0 | 3 | 0 | 0 | 0 | 0 | não tem | **3** | 1 |
| 5 Skies | 3 vãos | 0 | 0 | 0 | 0 | 0 | não tem | **3** | 0 |
| 6 Gym | 2 | 2 | 0 | 0 | 0 | 0 | não tem | **4** | 1 |
| 8 Cookie | 2 | 3 | 0 | 0 | 0 | 0 | não tem | **5** | 1 |
| **média** | | | | | | | | **4,7** | |

\* `gen_mapas.py` bosque usa `m.faixa(104,106,7,'m')`: o parser cria **3 plataformas móveis sobrepostas** (cada `m` já tem 3 tiles). Bug a corrigir: um `m` só.

Outros números que explicam a sensação de "andar e responder":
- Cada mapa tem 3 "praças" de 19 tiles planos e VAZIOS (regra do quiz no mundo) = 57 de 140–160 colunas, **38–41 % do reino é chão liso sem nada**.
- O motor do ING3 não porta 6 perigos que o WiseBear tinha: troncos/barris rolando, pingentes, canhões, caixas "?", canos/submundo, pinhas (arremesso). Há 1 tipo de inimigo (mancha de tinta) em todo o jogo; o WiseBear tinha 7.
- Física medida (`ING3_jogo_motor.js`): pulo sobe 152 px (3,4 tiles), pulo correndo alcança ~216 px (4,8 tiles); mola sobe ~348 px (7,7 tiles). Buracos atuais de 2–3 tiles são vencidos sem pensar; nenhuma exigência de timing existe.

**Meta v2 (verificável por script):** cada reino de plataforma com **≥ 18 obstáculos ativos (main + submundo) no reino 1 e ≥ 22 do reino 2 em diante**, **≥ 4 tipos de perigo**, **≥ 3 comportamentos de inimigo** (anda / voa em onda / espinhento que não se pisa / com aviso), **1 submundo**, **1 mini-chefe ou set-piece final**, **0 trechos planos vazios > 10 tiles**. Os mapas do Anexo já atingem: Village 18, Forest 27, Gym 25, Stadium 21, Cookie 20 (+ mini-chefe em todos).

### 0.2 Regras de dificuldade para 8 anos (valem para todos os reinos)
1. **Desafiante, vencível em poucas tentativas.** Alvo de playtest: trecho difícil passa em 1ª tentativa ~50 %, até a 3ª ~95 %.
2. **Dano lê-se na tela** ("aaah"): encostar em inimigo = o herói **encolhe um tamanho** (3 tamanhos, como o WiseBear), salta para trás, pisca 1,7 s, som "tonto"; no menor tamanho, encostar = volta ao checkpoint. Buraco, espinho, água = volta ao checkpoint com íris curta. HUD ganha **3 corações** que espelham o tamanho (3 grande, 2 normal, 1 pequeno) para a criança VER que perdeu algo. Maçã devolve um coração.
3. **Sem game over, sem vidas.** Checkpoint generoso: um a cada 25–35 colunas (30–45 s de jogo), sempre DEPOIS de um trecho difícil e ANTES do próximo; nenhum perigo nos 6 tiles depois de um checkpoint. Inimigo vencido continua vencido depois de voltar ao checkpoint; plataformas que caem voltam.
4. **Padrões legíveis.** Todo perigo temporizado tem período ≥ 2 s e janela segura ≥ 1 s, com AVISO visual de 0,6 s (tremor, brilho, agachar). Inimigos ≤ 95 px/s (o herói anda a 270).
5. **"Ufa, passei"**: cada trecho difícil termina num checkpoint que acende com som próprio + moeda grande de recompensa visível no fim do trecho (a criança vê o prêmio antes e sente ao pegar).
6. **Primeiros ~20 s sem perigo** (regra já existente) e a 1ª entrada de questões antes do 1º perigo.
7. **Saída trancada** até as 3 entradas visitadas (regra WiseBear R17/3ª rodada: visitada = respondeu a 1ª ou saiu depois de ver), com seta para a que falta.

---

## 1. As 9 críticas do Paulo — onde cada uma se resolve

| # | crítica | resolução v2 | seção |
|---|---|---|---|
| 1 | Intro avançava sozinha | Intro e final **só** avançam com o botão **Next ▶** (≥ 64 px) ou ENTER; tocar na tela não avança; "Skip ▶▶" continua. *Já no working tree* (`atualizaIntro` não avança mais). Aceite: QA espera 20 s parado e a cena continua a 1ª. | C.6 |
| 2 | Toque acidental no mapa entrava em outra fase | 1 toque só SELECIONA (cartão); entrar = **toque duplo em < 450 ms no mesmo reino** OU botão **Play**; toques ignorados nos 600 ms depois de o mapa abrir. *Já no working tree* (`mapaToque`). | C.7 |
| 3 | "Ancião" no caminho ficou forçado | Fim do morador no chão. A criança **ENTRA** num elemento do cenário (porta, baú, arca, toca, marca do pênalti, box do pit) com **brilho pulsante + "?" flutuando + seta**; perto dele aparece o balão "**Press ▼ to go in**" e o botão ▼ pulsa; tocar no elemento também entra. Lá dentro: **ambiente de questões** com moldura esmaecida, música de suspense, relógio de 30 s, o personagem que pergunta e **cartões numerados TOCÁVEIS** (não anda nem pula). Fim → volta ao mesmo ponto da fase. *Esboço já no working tree* (`QUIZ` v2, screenshot `ing3_r1_f_ambiente_wip.png`). | C.1, B (cada reino) |
| 4 | Futebol / pênaltis "péssimo" | Reino 7 vira **aventura 2D no estádio** (vestiário, gramado com zagueiros e máquina de bolas, irrigadores-mola, travessão como plataforma, **arquibancada com a "ola"**, túnel-submundo, Goleiro-Mancha). Os **pênaltis viram o ambiente de questões**: alternativa ERRADA = goleiro defende; CERTA = GOL, com corrida, chute, rede que estufa, torcida. | B.7 |
| 5 | Título feio; falta capa | **Capa de livro infantil de verdade** antes do mapa: capa dura de tecido, título em letra de livro de histórias, ilustração com os 4 heróis + Pip + castelo + o Conde espiando com respingo de tinta; botão "Open the book ▶" abre a capa (animação de virar 0,9 s) e mostra o livro aberto (mapa). *Placeholder já no working tree* (`ing3_02b_capa_wip.png`: fundo liso e a Lia repetida — precisa da arte). | C.8 |
| 6 | 2 meninas + 1 menino | **2 + 2**: Lia (cavaleira), Bia (ginasta), Theo (mago) e **Leo (jogador de futebol)**, novo. | C.9 |
| 7 | Ginástica só decorativa | O herói **usa** os aparelhos: anda na **trave** sobre a espuma, **pendura-se e balança nas argolas** (solta com PULAR), **gira nas barras assimétricas** (solta na janela certa para subir à barra alta), **salto sobre a mesa** com trampolim, **solo no ritmo** (blocos que aparecem na batida). | B.6 |
| 8 | Corrida malfeita | **Corrida VERTICAL** (pista desce na tela, estilo Enduro/Spy Hunter): curvas, ponte estreita, rampas, rivais que avisam antes de trocar de faixa; **3 pit stops OBRIGATÓRIOS** (a pista afunila para o box) = ambiente de questões: trocar pneus, abastecer, beber água — com 30 s, carro parado. Moedas/poças primárias saem: estrelas em trilha, latas de turbo, óleo de tinta, lama, cones, pedras. | B.3 |
| 9 | Faltam poderes e interação | **Poder global** (tiro de estrela que transforma manchas em borboletas; skin muda por reino: bolha, bola, gota de leite) + **poder próprio por reino** que muda o jeito de jogar (Botas de Sete Léguas, sopro do Pip, monster truck, bolha, rajada de vento, cambalhota, chute, itens da história do Mouse). Elementos interativos em todos os reinos (cipós, argolas, barras, molas temáticas, paredes que só o poder quebra, ola da torcida, torradeira…). | C.2, B |

---

## A. Diagnóstico dos 9 reinos atuais

Arte de cenário é boa (é a parte que se preserva). O problema é jogo.

| reino | o que funciona | o que é fraco | screenshots |
|---|---|---|---|
| 1 Village | cenário lindo (casas enxaimel, castelo ao fundo, bandeirolas) | 5 obstáculos em 140 colunas; 3 praças de 19 tiles vazias; único inimigo é a mancha; morador "no caminho" interrompe a corrida | `gd_v2_shots/ing3_r1_a_inicio.png`, `ing3_r1_b_meio.png`, `ing3_r1_e_porta_wip.png` |
| 2 Forest | Pip planando é o único poder que muda o jogo; floresta noturna bonita | Pip é inútil porque nada exige planar (buracos de 3 tiles se pulam sem ele); 1 móvel (triplicado por bug) | `ing3_r2_a_inicio.png`, `ing3_r2_b_meio.png` |
| 3 Rally | locutor e portais legíveis | corrida lateral de 3 faixas, carro anda sozinho, o único desafio é trocar de faixa; pergunta corre na pista (4 s para ler) — "rápida demais"; moedas e poça roxa primárias | `ing3_r3_a_inicio.png`, `ing3_r3_b_pergunta.png`, `ing3_r3_c_resposta.png` |
| 4 Reef | nado livre funciona; corais e luz bonitos | nenhum perigo de água (sem corrente, sem água-viva, sem ouriço); 3 manchas no fundo; nada para fazer com o nado | `ing3_r4_a_inicio.png`, `ing3_r4_b_meio.png` |
| 5 Skies | voo com capa é gostoso | zero inimigos; o céu é um corredor vazio; cair = checkpoint é o único risco | `ing3_r5_a_inicio.png`, `ing3_r5_b_meio.png` |
| 6 Gym | arena bonita, placar 9.95, aparelhos desenhados | aparelhos são FUNDO (trave, argolas): o herói não os usa; 3 molas; 4 obstáculos | `ing3_r6_a_inicio.png`, `ing3_r6_b_meio.png` |
| 7 Stadium | noite com refletores | não é aventura: tela única de pênaltis; goleiro é bolha azul; chute sem corrida, sem rede estufando, sem torcida reagindo | `ing3_r7_a_inicio.png`, `ing3_r7_b_pergunta.png`, `ing3_r7_c_resposta.png` |
| 8 Cookie | escala de cozinha gigante é ótima; começa e termina no prato | itens da história (leite, canudo, guardanapo…) são só cenário; 5 obstáculos | `ing3_r8_a_inicio.png`, `ing3_r8_b_meio.png` |
| 9 Castle | Conde cômico, 3 rodadas por tema | luta = ficar parado respondendo; gotas de tinta lentas; no screenshot o Conde aparece DUAS vezes (retrato + personagem) e a sala de questões cobre o castelo meio transparente | `ing3_r9_a_inicio.png`, `ing3_r9_b_conde.png` |

Piso de qualidade (WiseBear): `wb_f3_meio.png` (Churchill: pingentes, urso-polar, buraco, mel no alto), `wb_f3_arena.png` (arena com cronômetro, cartões A/B/C, X SAIR), `wb_f3_arena_teoria.png`.
Estado do working tree hoje (o loop já começou): intro sem avanço, toque duplo no mapa, capa placeholder, porta com ▼ e ambiente de questões (`ing3_r1_f_ambiente_wip.png`). **Bug visto**: o botão "Open the book ▶" da capa ficou por cima dos cartões dentro do ambiente de questões quando o mapa foi aberto por `irMapa()` sem passar por `abreLivro()` — `irMapa` precisa chamar `UI.botaoCapa(false)`.

---

## B. Design v2 por reino

Formato de cada reino: tema/propósito · mecânica central · elementos interativos · poder · inimigos · **curva de desafio trecho a trecho** (onde erra, o que acontece, o "ufa") · final do reino · entrada e ambientação das questões · átomos · aceite.
Coordenadas em tiles (45 px; 12 linhas, chão nas linhas 10–11; mapas no Anexo). Três entradas `D` por reino (2 no mundo + 1 no submundo), 3 perguntas cada = 3 páginas (mantém a regra atual).

### B.1 Once Upon a Time Village (reino 1 — aprender a jogar, já com perigo)
- **Tema**: vila de conto de fadas, feira, telhados, riacho, castelo com fosso. Ensina os controles e o poder global.
- **Mecânica central**: plataforma clássica + **pulo duplo das Botas de Sete Léguas** (o "sete" é número especial dos contos, F9). Divertido porque o 2º pulo no ar é a sensação mais gostosa de plataforma e o muro alto faz a criança SENTIR que ganhou algo.
- **Interativos**: monte de feno = mola (col 20); tijolos com moeda (43–45); toldo da feira; telhas que caem quando se passa embaixo (`v` 80, 82); telhas soltas que caem sobre o buraco (`f` 84–86); poço = cano para o porão (97); ponte levadiça móvel sobre o fosso (114); barris rolando da rampa do castelo (`K` 112).
- **Poder do reino**: **Seven-League Boots** (`J` col 67): toast "Magic boots! Press JUMP again in the air". Muda o jogo: o muro (71–72, topo na linha 6, 180 px) é impossível sem elas.
- **Poder global apresentado aqui**: saco de estrelas `Y` (col 50): +3 estrelas, botão ACTION aparece com o ícone e o número.
- **Inimigos**: mancha `i` (anda, pisa-se), corvo de tinta `g` (voa em onda, amplitude 40 px), **ouriço de tinta `e`** (espinhento: pisar machuca; só estrela ou pular por cima) — a criança aprende a LER o inimigo.
- **Curva de desafio**:
  1. col 0–26 (aquecimento, 20 s sem perigo): moedas, toldo, D1 na casa do contador de histórias (col 16), feno-mola até o telhado com moeda grande (desafio opcional de mira). Checkpoint 27.
  2. col 28–59: mancha (31) → riacho de 3 tiles (34) logo depois: quem pisa a mancha e cai do pulo-impulso pode cair na água ("aaah" → checkpoint 27, 8 s perdidos). Corvo em onda sobre os tijolos (47): timing para quebrar o tijolo sem tocar o corvo. Saco de estrelas (50) **antes** do ouriço (56): a 1ª estrela tem alvo óbvio. Checkpoint 60 = "ufa".
  3. col 61–93: D2 na padaria (63), botas (67), **muro de pulo duplo** (71). Errar o 2º pulo = só cai de volta (sem dano: tentativa barata). Em cima, muralha com moedas; desce para as **telhas que caem** (só caem quando o herói passa: correr sem parar) e a **ilha de 2 tiles entre dois buracos de 3** com o corvo passando por cima: o trecho mais tenso do reino. Checkpoint 94.
  4. col 95–129: poço → porão (submundo: D3, mancha, espinhos sob plataforma) → sai pelo cano 2 (100). Maçã (103) devolve o tamanho. Rampa do castelo com **barris** (período 3,2 s, pular cada um). Checkpoint 109. Fosso de 3 com ponte levadiça móvel (opcional: dá para pular, a ponte dá segurança).
- **Final do reino — "The Big Blot"** (`E` 120): mancha grande (2× altura) que pula em arco a cada 2 s; pisar 3 vezes; a cada pisada ela se divide em 2 manchinhas pequenas (pisa-se ou foge). Vencida, a bandeira (129) destrava se as 3 entradas foram visitadas.
- **Entrada das questões**: **portas de casa com placa pintada "?"** (D1 contador de histórias, D2 padaria, D3 porta do porão). Indicativo: brilho dourado pulsante na moldura da porta + "?" flutuando + seta; perto: balão "Press ▼ to go in" e botão ▼ pulsando. Visitada: porta prateada, sem pulsar ("Play again? Press ▼").
- **Ambientação das questões**: praça da vila à noite atrás da moldura de **madeira entalhada**; quem pergunta: **o Arauto (crier)** num pódio com o sino. Certa: ele toca o sino, bandeirolas sobem, o cartão fica verde com brilho, +1 página-pedaço. Errada: o pergaminho dele enrola sozinho (cômico, 0,6 s), o cartão errado treme e apaga, o certo acende, popup de teoria.
- **Átomos**: F1 F2 F6 F7 F10 F11 F12 F15 (sem mudança).
- **Aceite**: (a) o script de contagem dá ≥ 18 ativos (main+sub) — hoje a proposta dá 18 + mini-chefe; (b) sem botas, um bot que só pula não passa da col 71 (BFS com pulo simples); com botas passa; (c) encostar no ouriço `e` por cima machuca; (d) estrela acerta a mancha e ela vira 3 borboletas; (e) bandeira trancada com 2/3 entradas e seta apontando para o poço; (f) Big Blot vencível em ≤ 3 tentativas pelo bot de QA com padrão fixo.

### B.2 Enchanted Forest (reino 2 — o Pip vira necessário)
- **Tema**: floresta encantada à noite, cogumelos, árvores ocas, ravinas, espinheiros.
- **Mecânica central**: **balançar em cipós** (`l`: o herói agarra ao encostar, balança como pêndulo com período 1,4 s; PULAR solta e o impulso segue a velocidade do balanço) + **Pip** (planar segurando PULAR). Divertido: soltar no ponto certo do balanço é o "timing" mais satisfatório de jogo de plataforma e só precisa de 1 botão.
- **Interativos**: cipós (23, 36, 40, 108, 112), cogumelo-mola (70), folha-plataforma que vai e vem (90), folhas que caem (95–97), toca do coelho = cano (100), **muros de espinheiro `%`** (53–54, 115–116) que só o sopro do Pip queima.
- **Poder do reino**: **Pip** (ovo col 6, montaria já existente) + **sopro de faíscas do Pip** no botão ACTION (alcance 3 tiles, recarrega 1 s): queima espinheiro (vira cinza que se desfaz em vagalumes) e transforma manchas. Se a criança cai do Pip (levar dano montado), o Pip espera perto — já existe.
- **Inimigos**: mancha, **mariposa de tinta** (`g`, voa em onda), **cardo de tinta** `e` (espinhento), **bolotas caindo** (`v`, caem quando se passa: correr sem parar), **troncos rolando** (`T`, período 3,6 s).
- **Curva de desafio**:
  1. 0–19: ovo do Pip, plataforma, D1 na árvore oca da fada madrinha (15). Checkpoint 19.
  2. 20–50: **1º cipó** sobre ravina de 3 (cair = checkpoint 19, perto: tentativa barata). Mancha + **bolotas** (30, 32). **Ravina dupla com toco de 1 tile e 2 cipós**: soltar cedo demais = cai; com o Pip planando fica mais fácil (recompensa por ter o Pip). Estrelas (44) antes do cardo (47). Checkpoint 50 ("ufa").
  3. 51–86: **espinheiro** (53) — sem Pip, não passa (se perdeu o Pip, ele está esperando 2 tiles atrás). D2 na casa da coruja (57). Troncos rolando (60) + escada de plataformas até moeda grande (66–67, opcional). Cogumelo-mola até a copa (72–75). Mariposa em onda sobre a mancha e o cardo (78–83). Checkpoint 86.
  4. 87–104: folha móvel sobre buraco (90) + folhas que caem sobre buraco (95–97) — **parar = cair**. Toca do coelho → submundo (D3 na toca, raízes = plataformas, 2 bolotas). Checkpoint 104.
- **Final do reino — gran-final + Ink Ogre**: cipó, toco, cipó (107–113) sem checkpoint no meio; espinheiro final (115) que precisa do sopro; **Ogro de Tinta** (`E` 120, cômico, ogro = magical creature F3): anda devagar, a cada 3 s bate a clava no chão (aviso: levanta a clava 0,6 s) e solta 3 bolotas; acertar 3 sopros/estrelas nas costas enquanto ele está "tonto" depois da batida; vira um ogro gentil que acena.
- **Entrada**: **portas de árvore oca, cogumelo-casa e a toca** com brilho de vagalume e "?" de folha. 
- **Ambientação**: clareira enluarada esmaecida atrás de moldura de **cipós e flores**; perguntam a **Fada Madrinha** (D1, D3) e a **Coruja** (D2). Certa: a varinha transforma o cartão em ouro + flor desabrocha. Errada: a varinha solta um "puf" de fumacinha (cômico), cartão apaga, o certo acende, teoria.
- **Átomos**: F3 F4 F5 F8 F9 F13 F14.
- **Aceite**: (a) ≥ 22 ativos (proposta: 27); (b) cipó: herói agarra ao encostar, solta com PULAR, alcance ≥ 5 tiles quando solta no ponto mais alto da frente; (c) espinheiro intransponível sem o sopro (BFS) e destruído por 1 sopro; (d) com o Pip a ravina dupla passa planando; (e) Ogro com aviso visível de 0,6 s antes de cada batida.

### B.3 Real or Make-believe Rally (reino 3 — corrida VERTICAL com pit stop)
- **Tema**: rali do livro de histórias; pista vista de cima que **desce na tela** (estilo Enduro/Spy Hunter), tela em paisagem: pista de 420 px no centro (x 270–690), laterais com grama, árvores, arquibancada, placas.
- **Mecânica central**: o carro fica na parte de baixo (y ≈ 430) e a pista rola para baixo a 260 px/s; **◀ ▶ seguram para virar** (deslocamento lateral 320 px/s com suavização — sem faixas travadas); **ACTION = turbo** quando há lata de turbo. Divertido: desviar e ultrapassar com controle contínuo, e a corrida tem POSIÇÃO ("6th → 1st").
- **Interativos/obstáculos** (pista gerada por trechos fixos, não aleatória, para poder testar): curvas (o centro da pista desliza ±180 px em senoide; sair para a grama = 50 % da velocidade), **ponte estreita** (pista vira 160 px por 3 s com água dos lados: sair = "splash", o carro reaparece no centro piscando 1 s e perde posições), **rampas** (pular um trecho de lama/pedras; estrelas no ar), **slalom de cones** (fila com uma abertura de 140 px), **pedras** (rodar 0,8 s), **óleo de tinta** (derrapa 0,8 s), **lama** (lento 1 s), **rivais** (6 karts de personagens de conto — princesa, cavaleiro, sapo, etc.; trocam de faixa só depois de piscar a seta 0,8 s: ler o padrão).
- **Coletáveis** (no lugar das moedas e poças "primárias"): **trilhas de estrelas douradas** com brilho, **latas de turbo** (azuis, chama no escape), **engrenagem-monstro** (poder).
- **Poder do reino**: **MONSTER TRUCK** (engrenagem dourada com pneu gigante; 2 na corrida): por 8 s o kart cresce 1,4×, rodas enormes quicando, ronco grave, barra de tempo sob o carro; **esmaga pedras e cones**, ignora lama e óleo, empurra rivais para o lado (eles rodam, sem dano a ninguém). Turbo: 1,6× por 2 s.
- **Curva de desafio** (≈ 4 min de pista + pits):
  1. Trecho 1 (40 s): reta larga, estrelas, 2 rivais lentos, curvas suaves, 1 pedra isolada. Placa "PIT ▶" 3 vezes (a 6 s, 4 s, 2 s) e marcador de combustível piscando → **a pista afunila em barreiras de pneus que conduzem ao box** (desvio OBRIGATÓRIO; não tem como errar a entrada, mas é preciso dirigir até a caixa amarela; dentro da faixa do pit o carro freia sozinho). **Pit 1**.
  2. Trecho 2 (45 s): curvas mais fortes, slalom de cones, óleo, **1ª ponte estreita** ("aaah" se cair na água), engrenagem-monstro antes de um campo de pedras (esmagar tudo = "uau"). **Pit 2**.
  3. Trecho 3 (50 s): rampa sobre lama, rivais trocando de faixa, 2ª ponte com curva, lama em xadrez. **Pit 3**.
  4. **Final — a volta do Conde**: o kart do Conde Rabisco aparece à frente e joga gotas de tinta para trás (a gota cai marcada por uma sombra 0,8 s antes: ler e desviar); turbo para ultrapassá-lo na reta final; linha de chegada com bandeira quadriculada e pódio (posição final só dá medalha; nada é perdido).
- **Ambiente de questões = PIT STOP** (entrada: a caixa amarela do box, com cones e equipe acenando): garagem esmaecida atrás de moldura de **pneus e bandeira quadriculada**; música de suspense com motor em marcha lenta; quem pergunta: **a Chefe de Box** (mecânica com fone e chave inglesa; substitui o locutor no pit — o locutor continua na pista narrando). Três tarefas = três perguntas, ícones no topo: **pneus · combustível · água**. Certa: a equipe faz a tarefa (pistola de ar "brrrt" e pneu novo / a bomba enche o marcador / o herói bebe água e faz joinha). Errada: tarefa feita com trapalhada cômica (o pneu sai rolando e um mecânico corre atrás) + teoria. Carro parado, 30 s por pergunta, **nada na pista corre enquanto isso** (resolve "perguntas rápidas demais").
- **Átomos**: R1–R8 (real × make-believe, armadilha do animal real fazendo coisa de faz de conta).
- **Aceite**: (a) pista rola de cima para baixo; ◀ ▶ contínuos; (b) 3 pits obrigatórios (QA dirige "reto" e mesmo assim entra no box); (c) monster truck muda o sprite e atravessa pedras por 8 s; (d) rival pisca 0,8 s antes de trocar de faixa; (e) ponte: sair da pista = splash e reaparecer; (f) nenhuma pergunta aparece fora do box.

### B.4 Rhyme Reef (reino 4 — nado com correntes e bolhas)
- **Tema**: recife de coral com navio afundado.
- **Mecânica central**: nado livre (já existe: PULAR = braçada, afunda devagar) + **correntes** (faixas horizontais com bolhas mostrando a direção; empurram 120 px/s) que ora ajudam, ora atrapalham.
- **Interativos**: **ostras gigantes que abrem e fecham** (2 s aberta, 1 s fechada, fechar = morder de leve = dano; dentro tem pérola = moeda grande), **anêmonas-mola** (lançam para cima), **conchas-alavanca** (tocar com bolha abre a porta do navio), algas que escondem moedas, baús.
- **Poder do reino**: **Bubble Shot** (o poder global com skin de bolha): a bolha flutua em linha reta 5 tiles e **prende** água-viva/baiacu numa bolha que sobe e some; acerta a concha-alavanca.
- **Inimigos**: **água-viva de tinta** (sobe e desce 3 tiles, período 2,4 s: passar no vão), **baiacu de tinta** (incha espinhento 1 s a cada 3 s: só se pisa murcho — ler o padrão), **ouriços** (`^` no fundo e no teto de cavernas), manchas.
- **Curva**: 1) recife aberto, D1 no baú (sem perigo) · 2) corredor de águas-vivas em fila fora de fase + ouriços no chão (checkpoint) · 3) **corrente contrária** com ostras: nadar rente ao fundo onde a corrente é fraca, pegar pérola com timing · 4) cano-coral → gruta (D3) · 5) navio afundado: porta aberta pela concha-alavanca, corredor com baiacus.
- **Final**: **Caranguejo de Tinta** no convés: anda de lado, abre as garras a cada 3 s (aviso: garras tremem); bolha na carapaça quando abertas, 3 vezes.
- **Entrada**: **baús de tesouro e a ostra-gigante-porta** (brilho de pérola + "?").
- **Ambientação**: gruta azul esmaecida, moldura de **corais e conchas**; pergunta o **Polvo Poeta** segurando o pergaminho do poema (perguntas `texto` já usam o pergaminho). Certa: cada tentáculo aplaude e solta bolhas-coração. Errada: o polvo fica corado e solta um jatinho de tinta que vira ponto de interrogação (cômico).
- **Átomos**: P7 P9 P10.
- **Aceite**: ≥ 22 ativos; corrente visível e mensurável (bolhas na direção); baiacu só pisável murcho; caranguejo vencível em ≤ 3 tentativas.

### B.5 Stanza Skies (reino 5 — voo com tempestade)
- **Tema**: céu das estrofes; nuvens, balões, moinhos de vento nas nuvens, castelo de nuvem.
- **Mecânica central**: voo com a capa (segurar PULAR sobe; soltar plana) — já existe; agora com **zonas de vento** (para cima/baixo, setas de vento desenhadas) e **teto/chão perigosos**.
- **Interativos**: **nuvens de chuva que viram plataforma** quando se pousa por 1 s (depois se desfazem em 2 s), **balões-plataforma** que sobem devagar, **moinhos** (rajada faz girar e abre portão de nuvem), **sinos de nota** que, tocados em sequência, formam a ponte do arco-íris (atalho com moedas).
- **Poder do reino**: **Wind Gust** (ACTION): rajada em cone de 4 tiles que **afasta nuvens de tempestade por 4 s**, gira moinhos e sopra corvos para longe.
- **Inimigos**: **corvos de tinta** em onda, **nuvens de tempestade** (escurecem e piscam 1 s, depois raio vertical 0,7 s, período 3 s), **balões de tinta** que estouram em gotas se encostar.
- **Curva**: 1) voo livre, D1 no castelo de nuvem · 2) primeiras nuvens de tempestade isoladas (aprender o aviso) · 3) corredor de vento para baixo com corvos (segurar PULAR com força) · 4) portão de nuvem do moinho (precisa da rajada) · 5) cano-balão → submundo "dentro da nuvem" (D3).
- **Final**: **Muralha de Tempestade**: 4 nuvens em sequência com raios alternados + a **Nuvem Rabugenta** (rosto emburrado, fofa) que chove em 3 colunas; quando ela INSPIRA (bochechas cheias 1 s), uma rajada a faz espirrar; 3 vezes = ela vira arco-íris.
- **Entrada**: **portas de castelo de nuvem e cesto de balão**.
- **Ambientação**: céu do entardecer esmaecido, moldura de **nuvens douradas**; pergunta o **Bardo das Nuvens** com o alaúde. Certa: nota musical sobe e vira estrela. Errada: nuvenzinha chuvisca só no cartão errado.
- **Átomos**: P1–P6 P11.
- **Aceite**: ≥ 24 ativos; raio sempre precedido de 1 s de aviso; portão do moinho só abre com a rajada; Nuvem Rabugenta vencível em ≤ 3 tentativas.

### B.6 Rhythm Gym (reino 6 — USAR os aparelhos)
- **Tema**: ginásio de competição com público, juízes e placar. O conteúdo é **rhythm** (P8), então a fase inteira tem batida.
- **Mecânica central**: cada trecho é um aparelho que o herói **usa de verdade**:
  - **Trave** (`L`, 12 tiles na linha 7, cols 26–37) sobre o **fosso de espuma** (cair na espuma = afunda fofo e volta ao começo da trave, sem dano). Herói anda com os braços abertos (pose nova), velocidade 70 %. Uma bola de tinta rola NA trave: pular por cima sem sair da trave.
  - **Argolas** (`R` 44, 48, 52): pular nelas = agarra automaticamente; o herói **balança** (pêndulo, período 1,2 s); **PULAR solta** e o impulso leva ~4 tiles se solto na frente; de argola em argola sobre a espuma. Pose: pendurado com braços esticados, pernas juntas.
  - **Barras assimétricas** (`X` 63 baixa linha 6, 67 alta linha 3): ao tocar a barra o herói **gira em volta dela** (0,8 s por volta, animação de gigante); um **arco verde de soltura** brilha na parte de cima-frente (janela de 0,25 s por volta); PULAR na janela = voa para a barra alta; fora da janela = cai de pé no tablado (sem dano, tenta de novo). Da barra alta, soltar leva ao pouso alto com moedas.
  - **Salto sobre a mesa** (`V` 84): correr (≥ 0,5 s acelerando) → trampolim → mãos na mesa → **reversão** (flip) → pouso no parapeito alto (90–93, linha 5) com moeda grande. Sem corrida, o salto é curto e o herói fica embaixo (tenta de novo).
  - **Solo no ritmo** (`t`/`u`, 103–117): blocos-tablado sobre a espuma que **aparecem e somem na batida** (100 bpm; grupo A e B trocam a cada 2 batidas = 1,2 s); o chão pulsa com a música e o placar marca "1-2-3-4". Pular na batida de bloco em bloco. É o P8 virando jogo: ritmo = batida, padrão.
- **Poder do reino**: **Gold Chalk → Somersault**: depois do pó de giz (pego no vestiário), o 2º pulo vira **cambalhota** (herói gira 360°, invulnerável no giro, quebra tijolo acima e transforma mancha que toca). Perceptível: o herói gira e as manchas viram borboletas no contato.
- **Inimigos**: bola de tinta rolando na trave, manchas, `e` espinhento, **Mancha Malabarista** (final).
- **Curva**: 1) aquecimento: trampolim (11), D1 no vestiário (19), checkpoint 23 · 2) **trave** (o 1º "aaah" é cair na espuma; tentativa barata) · checkpoint 41 · 3) **argolas** (3 seguidas; soltar cedo = espuma) · D2 na mesa dos juízes (56) · checkpoint 60 · 4) **barras** (janela de soltura) + `e` e mancha no chão · checkpoint 80 · 5) **salto** até o parapeito → alçapão (95) → submundo "sala de aquecimento" (D3, colchões-mola, 2 manchas) · checkpoint 99 · 6) **solo no ritmo**.
- **Final — a Mancha Malabarista** (`E` 124): joga 3 bolas de tinta em arco NA BATIDA (sempre nas batidas 1 e 3); pular na batida 2 e 4 para pisar nela; 3 pisadas. Juízes erguem placas "10.0" e o placar mostra a nota.
- **Entrada**: **porta do vestiário, mesa dos juízes (cortina com "?") e alçapão**.
- **Ambientação**: arena escurecida com um só refletor, moldura de **fitas de ginástica**; pergunta a **Treinadora** com prancheta. Certa: **os juízes erguem "10.0"** e a plateia aplaude. Errada: juízes erguem "7.5", a treinadora explica (teoria).
- **Átomos**: P8 P10 (+ P7 P9 revisão).
- **Aceite**: (a) o herói visivelmente usa cada aparelho (poses novas: equilíbrio, pendurado, giro, reversão); (b) barra: soltar fora da janela nunca dá dano; (c) blocos do ritmo sincronizados com a música (tolerância 50 ms) e com indicador visual de batida; (d) ≥ 22 ativos (proposta 25); (e) exceção NOMEADA no portão: o fosso do solo (16 tiles) só existe porque os blocos garantem a travessia (`EXCECOES` no script).

### B.7 Cause & Effect Stadium (reino 7 — aventura 2D no estádio; pênaltis = questões)
- **Tema**: noite de final no estádio: vestiário → túnel → gramado → arquibancada → camarote → gol final.
- **Mecânica central**: plataforma com **leitura de padrão de adversário** (zagueiros que avisam e deslizam) + **chute** (poder) + **a OLA da torcida** como plataformas que sobem e descem em onda.
- **Interativos**: bancos do vestiário (plataformas), **irrigadores = molas** (39) que esguicham água para cima, **travessão do gol como plataforma** (57–64) com a **rede como cama elástica** (61), **ola** (`n` 70–82: blocos de torcedores com bandeiras que sobem 3 tiles e descem fora de fase — é preciso subir de onda em onda), camarote (86–90), maca-carrinho móvel (113).
- **Poder do reino**: **Kick!** — saco de bolas `Y` (10): ACTION chuta a bola, que rola e quica 6 tiles; derruba zagueiros (eles caem sentados e levantam rindo), acerta o Goleiro-Mancha. Bola some depois de 2 quiques; 3 por saco.
- **Inimigos**: **zagueiros de tinta `s`** (andam; quando o herói chega a 4 tiles, **agacham 0,6 s (aviso)** e deslizam 3 tiles: pular na hora certa por cima), **máquina de bolas `C`** (atira bolas rolando para a esquerda a cada 3,2 s; pular), manchas, `e`.
- **Curva**: 1) vestiário, bola, D1 na **marca do pênalti** (18), checkpoint 22 · 2) gramado: máquina de bolas + 2 zagueiros + irrigador até moeda grande + poça de irrigação (46) → checkpoint 50 · 3) D2 (53), **gol como obstáculo**: subir no travessão pela rede-mola, mancha dentro do gol · checkpoint 67 · 4) **a OLA** (o trecho de tensão: subir de bloco em bloco enquanto sobem e descem; cair = chão, sem dano, mas a mancha e o `e` embaixo dão dano) até o camarote · checkpoint 95 · 5) túnel = cano → submundo "sala dos juízes" (D3) · 6) zagueiros + máquina + zagueiro em sequência (o "corredor de zaga") + maca sobre poça · checkpoint 118.
- **Final — o Goleiro-Mancha** (`E` 124): guarda a bandeirinha de escanteio; anda de trave a trave; a cada 3 s **abre os braços** (aviso: pula no lugar 0,6 s) — chute a bola na barriga dele nessa hora; 3 gols e ele cai sentado rindo. Torcida faz a ola.
- **Entrada**: **marcas do pênalti** (bola branca sobre a marca, holofote circular pulsando e "?" na bandeira de canto ao lado; perto: "Press ▼ to take the penalty").
- **Ambientação = PÊNALTIS** (resolve a crítica 4): câmera **atrás do batedor**, gol ocupando 70 % da largura (x 150–810, y 150–380), rede em malha com profundidade, **3 zonas do gol = 3 cartões numerados** (placas penduradas na rede, texto grande); goleiro de verdade (camisa, luvas, joelheiras; amigável, do time do Conde); torcida em 3 fileiras com bandeiras; refletores; placar "PENALTY 1/3". Tocar no cartão → **corrida de 3 passos (0,5 s) → chute (som) → bola gira com rastro e sombra (0,7 s), câmera lenta nos últimos 0,2 s**. CERTA: goleiro mergulha para o lado oposto, **a rede estufa**, "GOAL!" gigante, confete, ola, apito. ERRADA: goleiro **mergulha e defende** (luva "pow"), torcida "ohh", a zona certa acende verde com a trajetória-fantasma da bola, teoria. O **juiz** (referee) é quem lê a pergunta (balão) com o apito. Relógio de 30 s = "shot clock" no canto.
- **Átomos**: E1–E7.
- **Aceite**: (a) é fase de plataforma com ≥ 20 ativos (proposta 21) e 3 marcas de pênalti; (b) zagueiro sempre agacha 0,6 s antes de deslizar; (c) na questão, certa = gol com rede estufando, errada = defesa visível do goleiro; (d) chute tem corrida, voo e sombra; (e) Goleiro-Mancha vencível em ≤ 3 tentativas.

### B.8 The Cookie Circle (reino 8 — a história vira os poderes)
- **Tema**: o herói pequenino na cozinha de *If You Give a Mouse a Cookie*. **A fase começa no prato do biscoito e termina no MESMO prato** (circle story, C1/C5): a última tela é a primeira; a câmera faz uma volta e o HUD tem a **roda da história** (14 eventos) que vai acendendo.
- **Mecânica central**: os **itens da história, na ordem do livro**, viram ferramentas: biscoito → **leite** (cura 1 coração) → **canudo** (poder de tiro: gotas de leite) → **guardanapo** (paraquedas: planar) → espelho (mostra um caminho escondido de plataformas por 6 s) → **tesoura** (corta o barbante que segura uma ponte de palitos) → **vassoura** (varre o muro de migalhas `%`) → fita adesiva (conserta a ponte quebrada; com ela, o atalho de cima) → biscoito de novo. Os eventos sem ferramenta (nap, story, drawing, pen) aparecem como cenas de fundo no caminho. Divertido e pedagógico: a ORDEM dos eventos (C6, 17 itens no banco) é a ordem em que a criança ganha os poderes.
- **Interativos**: **torradeira = mola** (68; a torrada pula junto), **xícaras deslizando** (móveis), **gotas da torneira** (`v`), **prateleiras da geladeira** (elevadores `n` 100–106), leite derramado (escorrega), muro de migalhas, gaveta = cano.
- **Poder**: o botão ACTION mostra o ícone do item atual (canudo/vassoura/tesoura conforme o que está perto); o guardanapo funciona segurando PULAR no ar.
- **Inimigos**: **formigas de tinta** (`i`), **migalha espinhenta** `e`, **ervilhas rolando** (`K`), gotas, **Rolo-de-Massa de Tinta** (final).
- **Curva**: 1) prato, D1 na **porta da geladeira** (12), leite · 2) gotas da torneira (correr), canudo, `e` + ervilhas, buraco · checkpoint 50 · 3) **vão da pia**: dois buracos de 3 com toco de 1 tile (com o guardanapo é tranquilo; sem, é o pulo mais difícil do reino) · D2 no **forno** (60) · espelho/tesoura · torradeira até moeda grande · checkpoint 75 · 4) vassoura → **muro de migalhas** (só ela passa) · formiga, mariposa, `e` · gaveta → submundo "armário" (D3) · checkpoint 97 · 5) **subida da geladeira** (prateleiras que sobem e descem) até a fita · ponte quebrada.
- **Final — Rolo-de-Massa de Tinta** (`E` 119): rola de um lado ao outro do balcão (pular por cima a cada passada); para 1,5 s em cada ponta com o cabo para cima (aviso: brilho) — pisar no cabo 3 vezes. Depois, o prato com o biscoito (127) e a bandeira: **"The story ends where it began!"** e a roda da história fecha o círculo.
- **Entrada**: **porta da geladeira, porta do forno, gaveta** (o ratinho espia pela fresta com "?").
- **Ambientação**: mesa da cozinha à luz de vela, moldura de **migalhas e xadrez de toalha**; pergunta **o Ratinho** com o biscoito. Certa: o ratinho ganha o próximo objeto da roda (e a roda gira um passo). Errada: o ratinho dá de ombros e aponta o certo.
- **Átomos**: C1–C8.
- **Aceite**: (a) itens coletados na ordem do livro e a roda do HUD acende na mesma ordem; (b) muro de migalhas intransponível sem vassoura; (c) primeira e última tela com o mesmo prato; (d) ≥ 20 ativos (proposta 20 + mini-chefe).

### B.9 Inkwell Castle (reino 9 — chefão em 3 fases, todos os poderes)
- **Tema**: sala do trono do Conde Rabisco, livros voadores, tinteiros gigantes.
- **Estrutura**: 3 fases de **plataforma de chefe**, cada uma terminando numa **porta de duelo** (ambiente de questões, 3 perguntas por tema — mantém as RODADAS atuais: 1 fairy+realmb, 2 poem, 3 cause+circle). Cada acerto no duelo = uma página voa e acerta o Conde (já existe); erro = ele ri, não se cura.
  - **Fase 1 — Tinteiros**: o Conde na sacada joga gotas (a sombra marca onde cai 0,8 s antes; a poça fica 3 s no chão = dano); 3 tinteiros acendem um por vez: acertar estrela no tinteiro aceso → ele tomba e o Conde fica tonto → abre a porta de duelo 1.
  - **Fase 2 — Livros voadores**: o chão vira "maré" de tinta roxa lenta (sobe 2 tiles e desce, período 8 s, aviso de borbulhas); livros voadores são plataformas móveis; manchas surgem em ondas de 3 (estrela, pisada, cambalhota). Sobreviver 40 s ou transformar 9 manchas → porta de duelo 2.
  - **Fase 3 — Letras gigantes**: o Conde escreve palavras que caem como blocos (a sombra avisa); as letras caídas viram escada até a sacada; chegar lá → porta de duelo 3 → ele desiste → FINAL circular (já existe).
- **Poderes**: o herói chega com estrela (9), botas, cambalhota; o castelo dá 1 saco de estrelas por fase.
- **Ambientação do duelo**: moldura de **tinta escorrendo**, sala esmaecida; o Conde em pessoa pergunta (um só desenho dele — corrigir o retrato duplicado de `ing3_r9_b_conde.png`); certa: página voa e o acerta; errada: ele gargalha e a pena dele faz um rabisco no cartão errado.
- **Aceite**: checkpoint no início de cada fase; cada fase tem um mecanismo perigoso com aviso; o duelo nunca abre sem a criança vencer a parte de plataforma (com saída: o X volta para a sala, sem perder a fase).

---

## C. Sistema comum

### C.1 Ambiente de questões (todos os reinos)
- **Entrar**: elemento `D` do reino (2 tiles de altura) com brilho pulsante, "?" flutuando e seta grande; perto (±60 px, mesmo nível): balão "**Press ▼ to go in**" + botão ▼ pulsando; tocar no elemento também entra (se longe: "Walk to the door first!"). Visitada: versão prateada, sem pulsar ("Play again? Press ▼") = treino extra (WiseBear 3ª rodada, item 4).
- **Transição**: herói entra 0,4 s → íris → sala.
- **Moldura esmaecida**: tira-se UM retrato do mundo na entrada (canvas fora da tela), escurece 45 % + vinheta + desfoque barato por reduzir/ampliar (nunca animar `filter`, regra de performance do projeto); moldura temática de 24 px (madeira, cipós, pneus, corais, nuvens, fitas, rede, migalhas, tinta).
- **Música**: peça nova `suspense` (32 compassos, 84 bpm, menor, pizzicato + batida de coração suave); nos 10 s finais, tique-taque discreto e o anel do relógio fica laranja (10 s) e vermelho (5 s). Nada assustador.
- **Layout 960×540**: relógio de 30 s no topo-centro (anel 64 px); balão da pergunta y 90–190; personagem que pergunta à esquerda (≈180×260); **3 cartões numerados 230×150 em y 330** (x 260/500/740; 2 cartões se 2 alternativas); botões Hint, Listen e **✕ Leave** (≥ 66 px, canto superior direito, sempre por cima de tudo); contador "1/3" e 3 pedaços de página.
- **Responder**: tocar no cartão (o cartão inteiro é alvo) ou 1/2/3. Sem andar, sem pular.
- **Certa**: cartão verde + animação temática do reino (B) + "Next ▶" (aparece em 0,6 s; não avança sozinho — checklist do projeto).
- **Errada / tempo**: cartão treme e apaga, o certo acende, animação temática leve, **popup de teoria** (regra em 1–2 frases + exemplo + `ex` da pergunta, botão Listen, "Got it ▶"); relógio PARADO no popup.
- **Fim (3 perguntas)**: a página voa para o HUD → "Back to the adventure ▶" → íris de volta ao mesmo ponto, herói invulnerável 1,5 s.
- **Sem frustração** (herdado do WiseBear): ✕ Leave e Esc saem na hora sem confirmação; visitada = respondeu a 1ª ou saiu depois de ver; abaixo do esperado → placar amigável "Keep going ▶" / "Try again".
- **Aceite**: QA abre cada uma das 26 entradas, mede relógio = 30, cartões ≥ 120 px, Leave ≥ 66 px, música trocou, mundo atrás esmaecido (amostra de pixel mais escura que antes), nenhum botão de outra tela por cima (o bug do "Open the book").

### C.2 Poder global e poderes por reino
- **Estrela** (botão ACTION, ícone + contador; 3 por saco `Y`, máx. 9): voa reto 6 tiles; mancha atingida vira 3 borboletas + moeda (transforma, não mata); `e` espinhento só sai com ela. Um só motor de projétil com skins por reino: estrela (1, 2, 5, 9), **bolha** que flutua (4), **bola** que quica (7), **gota de leite** (8).
- Poderes próprios: Botas de Sete Léguas (1), Pip + sopro (2), Monster truck + turbo (3), Bolha (4), Rajada de vento (5), Cambalhota (6), Chute (7), Itens da história (8), todos (9).
- **Aceite**: cada poder tem pelo menos 1 obstáculo do reino que SÓ ele resolve ou que fica claramente mais fácil com ele (verificável por BFS com/sem o poder).

### C.3 Checkpoints
Regras atuais mantidas (acende só na mesma altura; volta ao último aceso). Arte temática: lanterna (1), cogumelo luminoso (2), bandeira do box (3), concha com pérola (4), balão (5), pote de giz (6), bandeirinha de canto (7), cubo de açúcar (8), vela (9). Som próprio + brilho = o "ufa".

### C.4 Dano e corações
Ver 0.2. HUD: 3 corações espelhando o tamanho; ao levar dano, um coração "quebra" com som curto, herói recua e pisca.

### C.5 Controles no tablet
◀ ▶ (120 px) embaixo à esquerda, ▼ acima deles; **JUMP** (150 px) embaixo à direita; **ACTION** (110 px) à esquerda do JUMP, só aparece com poder disponível, com ícone e contador. Nenhum gesto (sem deslizar, sem pinça, sem toque longo obrigatório); nos aparelhos/cipós, PULAR solta. Corrida: ◀ ▶ + ACTION (turbo). Teclado: ←→/AD, ↑/W/Espaço, ↓/S, X/Enter, 1–3, Esc.

### C.6 Intro sem avanço automático
4 cenas da biblioteca; cada uma espera **Next ▶** (64 px, embaixo à direita, pulsa depois de 3 s) ou ENTER; "Skip ▶▶" pula tudo. A voz lê, a legenda fica.

### C.7 Mapa (livro aberto)
Herói-ficha no reino atual; próximo sugerido pulsa; nenhum trancado (WiseBear R4). 1 toque = seleciona e mostra o cartão (nome, ideia em 1 linha, páginas); **entrar = Play ou toque duplo** no mesmo reino; toques ignorados nos 600 ms iniciais. Depois de terminar um reino, a ficha anda sozinha até o próximo e o cartão aparece — ainda é preciso tocar Play.

### C.8 Capa do livro
Antes do mapa (e ao voltar do menu inicial). Livro de capa dura em tecido vermelho-vinho, cantoneiras douradas, lombada à esquerda, fita marcadora. **Título** "The Lost Endings" em duas linhas ("The Lost" pequeno em arco, "ENDINGS" grande), dourado com contorno escuro e relevo, em fonte de livro de histórias **local** (proposta: `Cherry Swash` Bold, OFL, woff2 em `ferramentas/assets/`; reserva Georgia bold); arabescos nas laterais. **Ilustração**: castelo no morro, os 4 heróis na frente (Lia com espada, Theo com varinha, Bia em pose, Leo com bola), Pip voando, e o Conde espiando no canto com a pena e um respingo de tinta que "come" a borda da capa. Subtítulo: "A storybook adventure". Botão "**Open the book ▶**" → a capa gira na lombada (0,9 s) e aparecem as páginas do mapa.
Aceite: nenhum herói repetido; título legível a 3 m num tablet de 10" (altura ≥ 60 px lógicos); botão some ao sair da capa por qualquer caminho.

### C.9 Personagens: 2 + 2
Decisão: **Lia (cavaleira), Bia (ginasta), Theo (mago) e Leo (jogador de futebol, novo)**. Por quê: 1+1 jogaria fora um herói pronto e reduziria a escolha a 2; 2+2 custa UM herói novo e cada herói tem "casa" num reino (cavaleira: vila/castelo; mago: floresta; ginasta: ginásio; jogador: estádio). Jogabilidade igual para os 4 (sem vantagem); no reino "de casa" o herói tem uma pose de comemoração especial. Leo: pele morena clara, cabelo cacheado, camisa listrada verde e branca nº 10, chuteiras; todos os estados (`idle walk jump fall cheer dizzy swim fly crouch crawl` + os novos de ginástica e corrida).

---

## D. Arte nova (para o agente de arte; tudo em canvas, sem emoji, sem imagem externa)

**Global**
1. Leo completo (todos os estados) + retrato da escolha.
2. Poses novas para os 4 heróis: equilíbrio na trave, pendurado (argola/cipó/barra) com balanço, giro na barra (8 quadros), reversão no salto, cambalhota, chute, arremesso, "dentro do kart" de cima (vista superior).
3. Capa do livro (C.8) + animação de abrir.
4. Moldura do ambiente de questões em 9 temas; cartão numerado (normal/certo/errado/apagado); anel de relógio 30 s com cores 10 s/5 s; página voando.
5. Elemento de entrada `D` em 9 versões, estado pendente (brilho) e visitado (prata).
6. Corações do HUD (cheio/quebrando/vazio); botão ACTION com ícones (estrela, bolha, bola, gota, sopro, vento, vassoura, tesoura, turbo).
7. Projéteis: estrela com rastro, bolha, bola, gota de leite; efeito mancha→3 borboletas.
8. Checkpoints temáticos (9).
9. Inimigos-base novos: ouriço/cardo/migalha espinhento (`e`, 3 skins), corvo/mariposa de tinta (`g`, 2 skins).

**Por reino**
- R1: casa do contador com placa "?", padaria, porta do porão, poço, telhas que caem, monte de feno-mola, ponte levadiça, barril, Botas de Sete Léguas, Big Blot (2 tamanhos + divisão), Arauto com sino.
- R2: árvore oca, cogumelo-casa, toca, cipó (corda + folhas), muro de espinheiro e a queima, bolota, tronco, folha móvel, sopro do Pip, Ogro de Tinta (andar, levantar clava, batida, tonto, gentil), Fada Madrinha e Coruja em tamanho de diálogo.
- R3: pista vista de cima (asfalto, zebra, grama, água, ponte, rampa, lama, óleo, cones, pedras, placas PIT), kart de cima com herói, monster truck de cima, 6 karts rivais de conto, kart do Conde, gota com sombra, box com equipe (3 mecânicos), Chefe de Box, animações pneu/bomba/água, pódio.
- R4: corrente com bolhas, ostra gigante (abre/fecha), anêmona-mola, concha-alavanca, água-viva, baiacu (murcho/inchado), navio afundado, baú, Caranguejo de Tinta.
- R5: nuvem de tempestade (normal/aviso/raio), zona de vento, balão-plataforma, moinho, sinos de nota, arco-íris, Nuvem Rabugenta (inspirar/espirrar), castelo de nuvem.
- R6: trave, fosso de espuma, argolas, barras assimétricas com arco de soltura, trampolim + mesa de salto, blocos do ritmo (aceso/sumindo), indicador de batida, juízes com placas 10.0/7.5, pote de giz, Mancha Malabarista.
- R7: vestiário (bancos, armários), marca do pênalti com holofote, irrigador, máquina de bolas, zagueiro de tinta (andar/agachar/deslizar/sentado), gol com rede que estufa, blocos da ola com torcedores, camarote, maca, Goleiro-Mancha; **cena de pênalti** (câmera atrás do batedor, gol grande, goleiro com mergulho para 3 lados e defesa, rede estufando, torcida em 3 fileiras, placar "PENALTY 1/3").
- R8: os 9 itens da história, roda da história no HUD (14 eventos), porta da geladeira/forno/gaveta com ratinho espiando, torradeira, xícara móvel, torneira com gota, prateleiras, muro de migalhas e a varrida, barbante/ponte de palitos, Rolo-de-Massa de Tinta, cenas de fundo (cochilo, livro, desenho, caneta).
- R9: tinteiro aceso/tombado, maré de tinta, livros voadores, letras caindo com sombra, porta de duelo, um só Conde no duelo.

---

## E. Plano de implementação (etapas pequenas, testáveis, maior salto primeiro)

Tamanho: P (≤ 2 h), M (meio dia), G (1 dia). Cada etapa termina com QA mudo + screenshot olhado + commit.

| # | etapa | por que nessa ordem | tamanho | aceite principal |
|---|---|---|---|---|
| 1 | Fechar o que já está no working tree: intro sem avanço, mapa com toque duplo/Play, ambiente de questões (C.1) com teoria e Leave; corrigir botão da capa vazando; um só Conde no duelo | críticas 1, 2, 3 resolvidas no jogo todo de uma vez | M | C.1 aceite em 1 reino + intro parada 20 s |
| 2 | **Portar os perigos do WiseBear para o motor ING3**: barris/troncos `K/T`, gotas `v`, canhão `C`, canos + submundo, elevador `N`, projétil (estrela) e botão ACTION, corações no HUD, inimigo `e` e `g` com skins | é o que devolve "jogo"; tudo depois depende disso | G | bateria de unidade: cada perigo causa o dano certo |
| 3 | Village v2 (mapa do Anexo, botas, Big Blot, entradas `D`) + script de contagem/portão no `gen_mapas.py` | reino 1 é o primeiro que o Paulo vê | M | B.1 aceite + contagem ≥ 18 |
| 4 | Capa do livro + Leo (arte) | crítica 5 e 6 são a primeira impressão | M (arte) | C.8/C.9 aceite |
| 5 | Forest v2 (cipó = mecânica de pêndulo genérica, sopro do Pip, espinheiro, Ogro) | o pêndulo serve também às argolas | G | B.2 aceite |
| 6 | Stadium v2 (plataforma + pênaltis como ambiente) | crítica 4, a mais dura ("péssimo") | G | B.7 aceite |
| 7 | Gym v2 (trave, argolas = pêndulo, barras, salto, ritmo, Malabarista) | crítica 7 | G | B.6 aceite |
| 8 | Rally vertical + pit stop + monster truck | crítica 8, módulo novo inteiro | G+ | B.3 aceite |
| 9 | Cookie v2 (itens da história, roda) | | M | B.8 aceite |
| 10 | Reef v2 e Skies v2 (correntes, ostras, baiacu, tempestade, rajada, chefes) | já são jogáveis hoje; ganham desafio | G | B.4/B.5 aceite |
| 11 | Castle v2 (3 fases de chefe) | depende de todos os poderes | M | B.9 aceite |
| 12 | Polimento: música `suspense`, sons de dano/checkpoint, playtest de dificuldade (bot + Paulo) e regressão completa (9 reinos de ponta a ponta, 0 erro de console, 4 viewports) | | M | R-lista do WiseBear toda verde de novo |

**Regra de segurança (Paulo)**: cada reino v2 só substitui o atual depois de passar o próprio aceite E a comparação com o WiseBear (contagem ≥ e jogável de ponta a ponta). Se piorar, o reino volta à versão anterior pelo git.

---

## Anexo — mapas v2 em ASCII (gerados por `gen/gen_mapas_v2_proposta.py`, portão OK)

Legenda: `#` sólido · `=` plataforma fina · `f` cai · `m` móvel ↔ · `n` móvel ↕ · `S` mola · `^` espinho · `W` água/espuma (volta ao checkpoint) · `B` tijolo · `o/O` moeda · `c` checkpoint · `F` bandeira · `U` início · `H` maçã · `J` botas · `P` ovo do Pip · `i` mancha · `g` voador · `K` barril/bola rolando · `v` gota/telha/bolota que cai · `C` canhão/máquina de bolas · `1`/`2` cano de ida/volta do submundo.
Novos: `D` entrada de questões · `Y` saco de projéteis · `e` espinhento · `l` cipó · `R` argola · `X` barra · `L` trave · `V` salto · `t`/`u` blocos do ritmo · `%` parede que só o poder quebra · `s` zagueiro · `E` mini-chefe · `&` item da história.
Regras verificadas: buraco ≤ 3 tiles (exceção nomeada: fosso do solo no ritmo, Gym 103–118); sobre toda superfície, 3 linhas livres de sólido e 2 de plataforma fina (herói grande 110 px). Contagem por mapa na linha `###`.

```
### 1 Village  {'buracos': 4, 'inimigos': 6, 'espinhos': 0, 'quedas': 2, 'rolantes': 1, 'moveis': 1, 'caem': 1, 'aparelhos': 0, 'ritmo': 0, 'paredes': 0, 'molas': 1, 'entradas': 2, 'checkpoints': 4}
    '                                                                                                                                    '
    '                                                                                                                                    '
    '                                                                                                                                    '
    '                       O                                                        v v                                                 '
    '                     ====                                                                                                           '
    '                                            o                             oooo                                                      '
    '          oooo                             BBB g                   J   ########         g                  oo                       '
    '          ====                        ===                         ===  ##                                                           '
    '     oooo                                         Y                    ##           fff          11 22    #       m                 '
    '  U             D   S      c   i                     i  e   c  D       ##                     c        H ##  c  K       E        F  '
    '##################################WWW###############################################   ##   #####################WWW################'
    '##################################WWW###############################################   ##   #####################WWW################'
### 1 Village submundo  {'buracos': 0, 'inimigos': 1, 'espinhos': 2, 'quedas': 0, 'rolantes': 0, 'moveis': 0, 'caem': 0, 'aparelhos': 0, 'ritmo': 0, 'paredes': 0, 'molas': 0, 'entradas': 1, 'checkpoints': 0}
    '############################'
    '############################'
    '##                        ##'
    '##                        ##'
    '##                        ##'
    '##                        ##'
    '##       oooo             ##'
    '##       ====    ====     ##'
    '## 11                  22 ##'
    '##      i      D  ^^      ##'
    '############################'
    '############################'
### 2 Forest  {'buracos': 7, 'inimigos': 6, 'espinhos': 0, 'quedas': 2, 'rolantes': 0, 'moveis': 1, 'caem': 1, 'aparelhos': 5, 'ritmo': 0, 'paredes': 4, 'molas': 1, 'entradas': 2, 'checkpoints': 4}
    '                                                                                                                                      '
    '                                                                                                                                      '
    '                       l            l   l            %%                   o                                 l   l  %%                 '
    '                              v v                    ##                 ====                                       ##                 '
    '                                                     ##            O                                               ##                 '
    '                                                     ##           ===                                              ##                 '
    '         oooo                                        ##                         g                                  ##                 '
    '         ====                                        ##       ===                         m                        ##                 '
    '                                            Y        ##                                        fff  1122           ##                 '
    '  U   P        D   c        i                  e  c  ##  D  T         S       i    e  c                 c          ##   E         F   '
    '######################   ##########   #   ###############################################   ###   #########   #   ####################'
    '######################   ##########   #   ###############################################   ###   #########   #   ####################'
### 6 Gym  {'buracos': 7, 'inimigos': 4, 'espinhos': 0, 'quedas': 0, 'rolantes': 0, 'moveis': 0, 'caem': 0, 'aparelhos': 6, 'ritmo': 10, 'paredes': 0, 'molas': 1, 'entradas': 2, 'checkpoints': 5}
    '                                                                                                                                        '
    '                                                                                                                                        '
    '                                            R   R   R                 oooooo                                                            '
    '             oooo                                                  X  ======                                                            '
    '             ====                                                                          O                                            '
    '                                                                                          ####                                          '
    '                              o i o                            X                          ####                                          '
    '                          LLLLLLLLLLLL                                                    ####                                          '
    '     ooooo                                                                                #### 1122    tt uu tt uu tt                   '
    '  U        S       D   c                 c              D   c            e   i  c   V     ####     c                        E       F   '
    '###########################WWW#WWW#WWW#####WWW#WWW#WWW#################################################WWWWWWWWWWWWWWWW#################'
    '###########################WWW#WWW#WWW#####WWW#WWW#WWW#################################################WWWWWWWWWWWWWWWW#################'
### 7 Stadium  {'buracos': 2, 'inimigos': 8, 'espinhos': 0, 'quedas': 0, 'rolantes': 2, 'moveis': 6, 'caem': 0, 'aparelhos': 0, 'ritmo': 0, 'paredes': 0, 'molas': 2, 'entradas': 2, 'checkpoints': 5}
    '                                                                                                                                            '
    '                                                                                                                                            '
    '                                                                                                                                            '
    '                                          O                                            ooo                                                  '
    '                                        ====             #======#                     #####                                                 '
    '                                                         #      #              n  n   #####                                                 '
    '                                                         #      #        n  n         #####                                                 '
    '      ====  ====                                         #      #     n               #####                      m                          '
    '          Y                                              #      #                     #####      11 22                                      '
    '  U               D   c   C   s     s  S          c  D   #  iS  #  c        i       e #####    c       s  C  s        c     E           F   '
    '##############################################WW################################################################WWW#########################'
    '##############################################WW################################################################WWW#########################'
### 8 Cookie  {'buracos': 4, 'inimigos': 6, 'espinhos': 0, 'quedas': 2, 'rolantes': 1, 'moveis': 3, 'caem': 0, 'aparelhos': 0, 'ritmo': 0, 'paredes': 2, 'molas': 1, 'entradas': 2, 'checkpoints': 4}
    '                                                                                                                                    '
    '                                                                                                              &                     '
    '                                                                                 %%                       n =====                   '
    '                           v v                                        O          ##                                                 '
    '                                                                     ====        ##                                                 '
    '                                                                                 ##                    n                            '
    '      &          &                            &                                  ##    g                                       &    '
    '    =====      ====                          ===                                 ##                 n                        =====  '
    '                                &                              &  &           &  ##          1122                                   '
    '  U         D        c  i          e  K           c         D       S      c     ##  i    e      c                     E          F '
    '#########################################   #########   #   ######################################################   ###############'
    '#########################################   #########   #   ######################################################   ###############'
PORTAO: OK
```
