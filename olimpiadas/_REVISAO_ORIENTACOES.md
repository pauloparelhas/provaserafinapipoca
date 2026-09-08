# Revisão das orientações — OP_data.js

**Arquivo auditado:** `ferramentas/OP_data.js` (126 itens + 9 cartões)
**Pergunta única:** isto orienta ou confunde uma criança de 7 anos?
**Campos auditados:** `truque`, `dica`, `no` das alternativas erradas, `porque`, `proximo`; nos `CARTOES`: `truque`, `texto`, `extras`, `apoio`.
**Não auditados (verbatim, intocáveis):** `enun`, `pede`, `texto`, `quadro`, o rótulo `t` das alternativas.

**Resultado:** 58 dos 126 itens têm pelo menos um defeito, mais 4 dos 9 cartões e 1 inconsistência entre cartão e família.

| tipo | o que é | ocorrências |
|---|---|---|
| 1 | frase que abre brecha para o erro | 28 trechos em 21 itens |
| 2 | ordem invertida (só funciona depois de saber a resposta) | 2 |
| 3 | duas coisas numa frase só / oração dentro de oração | 7 |
| 4 | metalinguagem sobrevivente | 11 trechos em 8 itens |
| 5 | palavra fora do vocabulário de 7 anos | 7 |
| 6 | ironia / negação dupla | 2 |
| 7 | **truque que não descreve o gesto que a questão exige** | 20 itens + 4 cartões |
| 8 | `proximo` que repete o `truque` | 7 |

---

## TIPO 1 — Frase que abre brecha para o erro

É o defeito que o dono do material apontou. A construção "X está certo, **mas**…" entrega à criança uma metade que ela guarda ("está certo") e uma metade que ela esquece. A correção é sempre a mesma: **começar pela falha e nunca dar veredito positivo a uma alternativa errada.**

Palavras-gatilho encontradas: *é verdade*, *está certo / está certa / estão certas*, *essa parte está certa*, *é palavra de verdade*.

### 25F1Q2 · opts[0].no (LUA)
- **Atual:** A lua fica no céu, é verdade. Mas lua não CAI, e ninguém diz "uma lua bem forte".
- **Novo:** Lua não cai do céu, e ninguém diz "uma lua bem forte". A frase fala de uma coisa que caiu e era forte — a lua não é essa coisa.

### 25F1Q2 · opts[3].no (BOLA)
- **Atual:** Bola cai mesmo, essa parte combina. Mas bola não tem nada a ver com as nuvens do começo da frase.
- **Novo:** A frase começa falando de NUVENS, e bola não vem de nuvem. Ela fecha uma pista só, e a frase dá três.

### 25F1Q6 · opts[1].no (GATO)
- **Atual:** GATO com as vogais trocadas vira GOTA. É palavra de verdade, mas gota é de água — não é parte de camisa. Formou palavra, só que não a que a pergunta pediu.
- **Novo:** GATO com as vogais trocadas vira GOTA. Gota é de água, e a pergunta pediu uma parte de camisa. Saiu uma palavra, só que não a que a pergunta pediu.

### 25F1Q6 · opts[2].no (GELO)
- **Atual:** GELO com as vogais trocadas vira GOLE. Também é palavra de verdade, e também não tem nada a ver com camisa.
- **Novo:** GELO com as vogais trocadas vira GOLE. Gole é de beber, e a pergunta pediu uma parte de camisa.

### 25F1Q7 · opts[1].no
- **Atual:** URUBU está certo, só tem U. Mas TAMANDUÁ tem um U no meio e CAPIVARA tem um I no meio — dois nomes com vogal escondida.
- **Novo:** TAMANDUÁ tem A e tem U. CAPIVARA tem A e tem I. São dois nomes com mais de uma vogal, e a coruja só dança com quem tem uma.

### 25F1Q7 · opts[3].no
- **Atual:** ARARA está certo. Mas MACACO tem o O do fim e CAPIVARA tem o I do meio. Basta um deles estar errado para a alternativa inteira cair.
- **Novo:** MACACO tem o O do fim e CAPIVARA tem o I do meio: os dois têm mais de uma vogal. Basta um nome errado para a alternativa inteira cair.

### 24F1Q3 · opts[1].no (GOTA)
- **Atual:** GOTA veio do desenho do gelo derretendo, não das letras. Ela até tem o G e o O, mas pede um T e um A que não existem em GELO.
- **Novo:** GOTA pede um T e um A, e essas letras não existem em GELO. Ela veio do desenho do gelo derretendo, não das letras.

### 24F1Q11 · opts[1].no (ELEVADOR)
- **Atual:** ELEVADOR começa com E-LE, que vem mesmo do elefante, e o VA vem do cavalo. Mas DOR não vem de ninguém. Quem confere só o começo cai aqui.
- **Novo:** ELEVADOR termina em DOR, e DOR não sai de nenhum dos três nomes. O começo saiu do elefante e do cavalo, e é aí que para quem confere só o começo.

### 24F1Q13 · opts[1].no
- **Atual:** É uma fala educada e faz todo sentido no balcão. Mas a pergunta não é o que faz sentido: é qual soa como ELA fala. E aqui não tem nenhum -INHO.
- **Novo:** Nessa fala não tem nenhum -INHO. A pergunta não é qual frase faz sentido no balcão: é qual soa como ELA fala.

### 24F1Q13 · opts[2].no
- **Atual:** Essa encaixa direitinho na história — ele disse que ia pagar em dinheiro, então tem troco. Mas ela fala SENHOR e não usa nenhum -INHO: não é o jeito dela.
- **Novo:** Aqui a atendente fala SENHOR e não usa nenhum -INHO. Não é o jeito dela de falar, e é o jeito dela que a pergunta pede.

### 24F1Q15 · opts[1].no
- **Atual:** A palmeira está certa, mas o fogo não. Quem decodifica só a primeira palavra e inventa o resto da história cai aqui.
- **Novo:** Nenhuma sílaba da frase embaralhada fala de fogo. Quem desembaraça só a primeira palavra e inventa o resto da história cai aqui.

### 25F2Q2 · opts[0].no (AGITO)
- **Atual:** Faça a troca e leia: A-G-I-T-O, AGITO. É palavra de verdade — é o que a gente faz quando agita, quando sacode um vidro de suco. Mas não é o nome de nenhum objeto que a gente sopra.
- **Novo:** Faça a troca e leia: A-G-I-T-O, AGITO. Agitar é sacudir um vidro de suco. A pergunta pede o nome de uma coisa que a gente sopra, e agito não é nome de coisa nenhuma.

### 25F2Q8 · opts[1].no
- **Atual:** Pipoca estourando faz barulho mesmo, na vida real. Só que o texto não fala disso em lugar nenhum, e a pergunta diz SEGUNDO O TEXTO.
- **Novo:** O texto não fala de pipoca estourando em lugar nenhum. A pergunta diz SEGUNDO O TEXTO, e aqui só vale o que está escrito.

### 25F2Q8 · opts[3].no
- **Atual:** O carrinho de pipoca solta fumaça, é verdade. Mas de novo: o texto não fala de fumaça nenhuma. Aqui vale o que está escrito, não o que a gente já viu na rua.
- **Novo:** O texto não fala de fumaça nenhuma. Aqui vale o que está escrito, não o que a gente já viu na rua.

### 25F2Q14 · opts[2].no
- **Atual:** Se ontem foi domingo, hoje é segunda — essa parte está certa. Mas hoje ela vai à FEIRA com a MÃE. O supermercado com o pai é amanhã.
- **Novo:** Na segunda ela vai à FEIRA com a MÃE. O supermercado com o pai é AMANHÃ, e amanhã não é segunda.

### 24F2Q11 · opts[0].no
- **Atual:** PATINETE rima com COMPETE, e essa parte está certa. Mas o cachorro não tem nenhuma parte do corpo grande demais, e patinete não é coisa que se compre na farmácia. A rima sozinha não resolve.
- **Novo:** Patinete não se compra na farmácia, e o cachorro não tem nenhuma parte do corpo grande demais. Rimar com COMPETE não basta: três alternativas rimam.

### 23F1Q3 · opts[2].no (PÃO)
- **Atual:** Os pães estavam na mesa, é verdade. Mas logo embaixo vem MAS TAMBÉM NÃO QUIS. Ver a comida não é comer a comida.
- **Novo:** Logo embaixo dos pães o texto diz MAS TAMBÉM NÃO QUIS. Ver a comida não é comer a comida.

### 23F1Q11 · opts[1].no
- **Atual:** NORTE e TORNE estão certas, e é por isso que ela engana. Mas TEMOR pede um M, e TEMPO pede um M e um P: nenhuma dessas letras existe em TERNO. Uma palavra errada derruba a alternativa inteira.
- **Novo:** TEMOR pede um M, e TEMPO pede um M e um P. Nenhuma dessas letras existe em TERNO. Uma palavra errada derruba a alternativa inteira, mesmo com as outras batendo.

### 23F1Q11 · opts[2].no
- **Atual:** As três primeiras estão certas, e a armadilha fina é a última: TRONO precisa de DOIS O, e em TERNO o O aparece uma vez só.
- **Novo:** A armadilha está na última palavra: TRONO precisa de DOIS O, e em TERNO o O aparece uma vez só. Confira até a última.

### 23F2Q10 · opts[2].no
- **Atual:** Ela usa as seis peças, é verdade, mas ainda pede LE e ZA, que ninguém deu. Quando a frase precisa de peça a mais, está errada do mesmo jeito.
- **Novo:** A BELEZA É DA VILA pede LE e ZA, e ninguém deu essas duas peças. Quando a frase precisa de peça a mais, ela está errada.

### 23F2Q14 · opts[1].no  *(também tipo 6)*
- **Atual:** Essa é a mais perigosa, porque a parte do morrer junto foi mesmo o que aconteceu. Mas o próprio escorpião tinha dito que NÃO QUERIA MORRER, porque tinha os negócios dele e a família. Então não é verdade que nada lhe importa.
- **Novo:** O escorpião tinha dito que NÃO QUERIA MORRER: falou dos negócios dele e da família. Essa resposta briga com o que ele mesmo falou.

### TR16 · opts[0].no
- **Atual:** BANANA e SALADA estão certas. ABACATE parece só de A — A, BA, CA — mas o último pedaço é TE: tem um E escondido bem no fim da palavra.
- **Novo:** ABACATE parece só de A — A, BA, CA — mas o último pedaço é TE: tem um E escondido bem no fim. Basta uma comida errada para a alternativa inteira cair.

### TR16 · opts[1].no
- **Atual:** BATATA está certa. Mas PIPOCA tem I, O e A, três vogais diferentes, e SUCO tem U e O. Duas erradas na mesma alternativa.
- **Novo:** PIPOCA tem I, O e A: três vogais diferentes. E SUCO tem U e O. São duas comidas erradas na mesma alternativa.

### TR22 · opts[3].no (GARFOS)
- **Atual:** Garfo tem em toda festa, é verdade. Mas garfo fica ao lado do bolo, não em cima dele, e ninguém sopra garfo.
- **Novo:** Garfo fica ao lado do bolo, não em cima dele. E ninguém sopra garfo. Ele não passa em duas das três pistas.

### TR24 · opts[1].no (UMAS)
- **Atual:** UMAS combina com bicicleta, essa parte está certa. Mas UMAS é de várias, e a frase fala de uma bicicleta só, sem S: "ganhou umas bicicleta nova" tropeça.
- **Novo:** UMAS é de várias, e a frase fala de uma bicicleta só, sem S no fim. Leia: "ganhou umas bicicleta nova" — tropeça.

### TR73 · opts[0].no
- **Atual:** O sol nascer cedo é verdade, mas não tem nada a ver com abrir uma porta. Não explica a primeira parte.
- **Novo:** O sol nascer cedo não tem nada a ver com abrir uma porta. Isso não deixa ninguém trancado do lado de fora.

### TR76 · opts[2].no (ESSAS)
- **Atual:** ESSAS é de várias, e essa parte está certa — é a que mais engana. Mas ESSAS é de menina, e "guardei essas sapatos sujos" tropeça.
- **Novo:** ESSAS é de menina, e SAPATOS é palavra de menino. Leia: "guardei essas sapatos sujos" — tropeça.

### TR78 · opts[2].no (SUAS)
- **Atual:** SUAS combina com mochila, essa parte está certa. Mas SUAS é de várias, e a frase fala de uma mochila só, sem S no fim: "deixou suas mochila vermelha" tropeça.
- **Novo:** SUAS é de várias, e a frase fala de uma mochila só, sem S no fim. Leia: "deixou suas mochila vermelha" — tropeça.

> **Ficam como estão** (não são deste defeito): comentários que descrevem o alcance parcial da armadilha sem dar veredito — "acerta os DOIS primeiros buracos", "o começo bate", "passa em três pistas e cai na última". Eles ensinam justamente a conferir até o fim.

---

## TIPO 2 — Ordem invertida

### 24F1Q7 · dica
Só faz sentido depois de saber que a certa é NADAR, MERGULHAR, MAR. Antes de responder, "duas dessas" não tem a que se referir: a criança está olhando quatro alternativas com três palavras cada.
- **Atual:** Não procure pelo assunto: procure o que a palavra É. Duas dessas são coisas que a gente faz e uma é um lugar.
- **Novo:** Não procure pelo assunto. Em cada alternativa, pergunte de cada palavra: isso é uma coisa que a gente FAZ, ou é um lugar?

### 24F2Q4 · proximo  *(também tipo 8)*
Abre recapitulando a resposta desta questão em vez de dar o gesto da próxima.
- **Atual:** CENTRO é a palavra mais familiar do grupo, e é justamente ela a intrusa. Confira as letras uma por uma; não confie no que parece conhecido.
- **Novo:** Escreva as quatro palavras uma embaixo da outra e risque letra por letra. Não decida pela palavra que você já conhece.

---

## TIPO 3 — Duas coisas numa frase só / oração dentro de oração

### 24F1Q11 · opts[3].no (GALOPANTE)
- **Atual:** Essa é a armadilha mais forte da prova. GA-LO é o galo inteirinho, galopar lembra cavalo e -TE lembra elefante. Mas PAN não existe: o elefante dá FAN, não PAN. Uma letra de diferença derruba a alternativa.
- **Novo:** GALOPANTE tem um PAN no meio. O elefante dá FAN, não PAN. Uma letra de diferença já derruba a alternativa. O começo GA-LO engana porque é o galo inteirinho.

### 24F2Q13 · opts[0].no  *(também tipo 5: "capciosa", "descarrila")*
- **Atual:** Essa é a mais capciosa: acerta os DOIS primeiros buracos (QUERIDO, COMBINAMOS) e só descarrila depois, escrevendo APARESEU e VOSE, com S no lugar do C. Fala igual, escreve errado — e quem confere só o começo marca esta.
- **Novo:** Os dois primeiros buracos batem: QUERIDO e COMBINAMOS. Os dois últimos escrevem APARESEU e VOSE, com S no lugar do C. Fala igual e escreve errado. Quem confere só o começo marca esta.

### 25F2Q1 · opts[1].no (CABISBAIXA)
- **Atual:** CABISBAIXA é palavra difícil, e é aí que mora o perigo: quando a gente não conhece a palavra, dá vontade de chutar nela. Cabisbaixa é quem anda de cabeça baixa, de tristeza — o contrário de feliz.
- **Novo:** Cabisbaixa é quem anda de cabeça baixa, de tristeza. Isso é o contrário de feliz. É palavra difícil, e palavra difícil dá vontade de chutar.

### 23F1Q11 · dica
- **Atual:** Escreva T, E, R, N, O num canto do papel. Para cada palavra, risque uma letra do canto por letra dela: se pedir letra que não está lá, ou pedir a mesma duas vezes, essa alternativa caiu.
- **Novo:** Escreva T, E, R, N, O num canto do papel. Depois pegue uma palavra e risque uma letra do canto para cada letra dela. Se faltar letra no canto, essa alternativa caiu.

### 25F2Q15 · porque
- **Atual:** A mãe compara carregar água na peneira com roubar um vento, catar espinhos na água e criar peixes no bolso: três coisas que não dão para fazer, porque o que se tenta guardar escapa. Encher um balão furado é assim — o ar sai pelo furo do mesmo jeito que a água escorre pelos buracos da peneira.
- **Novo:** A mãe deu três exemplos: roubar um vento, catar espinhos na água, criar peixes no bolso. Nos três, o que a gente tenta guardar escapa. No balão furado é igual: o ar sai pelo furo, como a água escorre pelos buracos da peneira.

### 23F2Q15 · porque
- **Atual:** Comparando as palavras do quadro, cada letra tem uma parceira fixa: A com I, E com U, O com Y, L com P, H com J, R com V, G com M, S com N, D com T e B com Z. Decifrando a frase inteira sai A LÍNGUA PORTUGUESA É MARAVILHOSA.
- **Novo:** Comparando as palavras do quadro, cada letra tem uma parceira que nunca muda: A com I, E com U, O com Y, L com P, H com J. Também R com V, G com M, S com N, D com T e B com Z. Trocando letra por letra, a frase inteira dá A LÍNGUA PORTUGUESA É MARAVILHOSA.

### 24F2Q3 · opts[3].no (OUTONO)
- **Atual:** Essa é a mais difícil de riscar: no outono também venta e as folhas caem. Mas o poema diz na primeira linha SOU A ESTAÇÃO DO FRIO, e no fim as pessoas entram em casa a tiritar, que é tremer de frio. Isso é o frio mais forte do ano.
- **Novo:** No outono também venta, e por isso essa é a mais difícil de riscar. Mas a primeira linha diz SOU A ESTAÇÃO DO FRIO. E no fim as pessoas entram em casa a tiritar, que é tremer de frio. Esse é o frio mais forte do ano.

---

## TIPO 4 — Metalinguagem sobrevivente

Palavras encontradas fora da lista permitida (vogal, consoante, sílaba, letra, alfabeto, rima, frase, palavra): **singular**, **verbo**, **estrofe**, **verso**, **enunciado**.

| id · campo | palavra | atual | novo |
|---|---|---|---|
| 24F1Q2 · porque | singular | CICLISTA está no singular, é um só. Então a palavrinha da frente também tem de ser de um só: UM ciclista. | CICLISTA não tem S no fim: é um só. Então a palavrinha da frente também tem de ser de um só: UM ciclista. |
| 25F2Q5 · opts[2].no | verbo | BRINCARAM traz o verbo certo, e é por isso que engana. Mas leia: "EU GOSTO DE BRINCARAM NA AREIA" — a frase tropeça. BRINCARAM é o que eles já fizeram, não é o que EU gosto de fazer. | Leia: "EU GOSTO DE BRINCARAM NA AREIA" — a frase tropeça. BRINCARAM é o que eles já fizeram. Quem fala aqui é EU, e depois de GOSTO DE vem BRINCAR. |
| 24F2Q11 · opts[1].no | estrofe | POLEIRO rima com INTEIRO, que é a PRIMEIRA linha da estrofe. No poema quem rima com quem é a última linha com a do meio: GRATOS/SAPATOS, FARTURA/DENTADURA, SOL/CACHECOL. | POLEIRO rima com INTEIRO, que é a PRIMEIRA linha. No poema, quem rima é a última linha com a do meio: GRATOS/SAPATOS, FARTURA/DENTADURA, SOL/CACHECOL. |
| TR11 · dica | verso (2x) | Cada verso é uma pista para a MESMA letra. Descubra a palavra escondida em cada verso e veja qual letra aparece em todas — inclusive na última pista. | Cada linha é uma pista para a MESMA letra. Ache a palavra escondida em cada linha e veja qual letra aparece em todas. E confira a última pista também. |
| 23F1Q15 · opts[3].no | verso | Dezoito são três a mais. O verso OU ISTO OU AQUILO se repete de propósito, é assim no poema de verdade — repetir não é trocar letra. | Dezoito são três a mais. A linha OU ISTO OU AQUILO se repete de propósito: é assim no poema de verdade. Repetir não é trocar letra. |
| 23F1Q13 · dica | enunciado | Leia o enunciado devagar: ele tem um NÃO. Você está procurando a frase em que a palavra repetida quer dizer A MESMA COISA nas duas vezes. | Leia a pergunta devagar: ela tem um NÃO. Você procura a frase em que a palavra repetida quer dizer A MESMA COISA nas duas vezes. |
| 23F1Q13 · porque | enunciado | ...E o enunciado pede justamente a frase em que a palavra NÃO muda de sentido. | Nas outras três, a palavra repetida quer dizer duas coisas diferentes. Em LIVROS, as duas vezes falam do mesmo livro de ler. E a pergunta quer justamente a frase em que a palavra não muda. |
| 23F1Q13 · proximo | enunciado | Quando o enunciado tiver um NÃO, sublinhe esse NÃO antes de olhar as alternativas. Ele vira a pergunta do avesso. | Quando a pergunta tiver um NÃO, ponha o dedo em cima dele antes de olhar as alternativas. Ele vira a pergunta do avesso. |
| 23F1Q13 · opts[1].no | enunciado (+ tipo 6) | BANCO de guardar dinheiro e BANCO de sentar são duas coisas bem diferentes. É um exemplo tão bonito que dá vontade de marcar — mas o enunciado tem um NÃO no meio. | BANCO de guardar dinheiro e BANCO de sentar são duas coisas bem diferentes. A pergunta tem um NÃO no meio: ela quer a frase em que a palavra não muda. |
| 24F2Q7 · opts[0].no | enunciado | CARRÃO é um carro grande: dá para ouvir CARRO dentro dele. Segue a regra do enunciado. | CARRÃO é um carro grande: dá para ouvir CARRO dentro dele. Segue a regra que a pergunta deu. |
| 24F2Q14 · opts[0].no | enunciado | Sete é o número de letras S da frase — e é onde para quem conta só o S. Mas o enunciado avisa: em ACENTO quem chia é o C. O C de CEDIDOS chia igual, e ele é o oitavo. | Sete é o número de letras S da frase, e é aí que para quem conta só o S. Mas a pergunta avisa: em ACENTO quem chia é o C. O C de CEDIDOS chia igual, e ele é o oitavo. |

---

## TIPO 5 — Palavra que uma criança de 7 anos não usa

| id · campo | palavra | atual | novo |
|---|---|---|---|
| 23F2Q5 · opts[0].no | traiçoeira | Aqui não tem nenhuma letra trocada, e é por isso que essa é a mais traiçoeira. O erro está em ESTUDARAM: eu e meu amigo somos NÓS, e nós ESTUDAMOS. | Aqui nenhuma letra está trocada, e por isso o erro passa batido. O erro está em ESTUDARAM: eu e meu amigo somos NÓS, e nós ESTUDAMOS. |
| 25F1Q15 · porque | decodificando | Decodificando símbolo por símbolo, sem pular nenhum, sai ANTES SÓ DO QUE MAL ACOMPANHADO. Os cinco últimos símbolos formam uma palavra só. | Escrevendo a sílaba de cada símbolo, um por um, sem pular nenhum, sai ANTES SÓ DO QUE MAL ACOMPANHADO. Os cinco últimos símbolos formam uma palavra só. |
| 24F1Q8 · opts[2].no | associa | Não tem nada de Páscoa no poema. Essa é uma festa que a gente associa a folga, mas o poema não fala dela. | Não tem nada de Páscoa no poema. Páscoa é festa e dá folga, e por isso ela vem à cabeça — mas o poema não fala dela. |
| 25F1Q10 · dica | SIGNIFICA | As quatro começam com A e têm um som parecido: por aí não dá para decidir. Pense no que cada palavra SIGNIFICA. | As quatro começam com A e têm um som parecido: por aí não dá para decidir. Pergunte de cada palavra: o que ela É? |
| 25F1Q13 · opts[2].no | obrigação | O poema diz TENHO DE, que é obrigação. Não diz que ele gosta. | O poema diz TENHO DE: ele é obrigado a olhar assim. Não diz que ele gosta. |
| 24F2Q13 · opts[0].no | capciosa, descarrila | (ver TIPO 3) | (ver TIPO 3) |
| 24F1Q15 · opts[1].no | decodifica | (ver TIPO 1) | (ver TIPO 1) |

> **Nota de estilo, não defeito:** a fórmula "e é por isso que **atrai**" aparece em cerca de 30 comentários. "Atrair" não é palavra de criança de 7 anos, mas a troca é sistêmica, não pontual. Se for corrigir, corrija em massa: "e é por isso que dá vontade de marcar".

---

## TIPO 6 — Ironia / negação dupla

### 23F2Q14 · opts[1].no
"Então **não é verdade que nada** lhe importa" empilha três negações. Corrigido no TIPO 1.

### 23F1Q13 · opts[1].no
"É um exemplo tão bonito que dá vontade de marcar" elogia a alternativa errada antes de negá-la. Corrigido no TIPO 4.

---

## TIPO 7 — Truque que não descreve o gesto que a questão exige

**O defeito mais grave: a criança aplica a regra errada com confiança.** Em todos os casos abaixo o item herdou o `truque` da família em vez de trazer o seu, e o gesto herdado ou não decide nada ou leva direto para uma alternativa errada.

### 7.1 · TR71, TR72, TR73, TR74 — questão de PORQUE com truque de "frase com buraco"
Estes quatro itens são do eixo `buraco`, mas não têm buraco de palavra: pedem a **continuação depois de PORQUE**. O truque manda "ponha cada palavra no buraco e leia a frase inteira" — e as quatro continuações leem bem. O gesto que decide ("isso impede mesmo?") só aparece na `dica` e no `proximo`. O item 24F1Q6, que é a mesma coisa, já tem o truque certo.
- **Atual (nos quatro):** Ponha cada palavra no buraco e leia a frase inteira, do começo.
- **Novo (nos quatro, idêntico ao de 24F1Q6):** Depois de PORQUE vem a explicação. Pergunte: isso explica mesmo a primeira parte?

### 7.2 · 25F2Q7 — a pergunta é qual peça SOBRA; o truque manda usar todas
- **Atual:** Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.
- **Novo:** Monte as duas palavras com as peças da mesa. A peça que ficar na mesa é a que sobra.

### 7.3 · 24F1Q11, TR19, TR20 — só algumas peças são usadas
Nestes três, a palavra certa usa **uma sílaba de cada nome**, não todas as sílabas dos nomes. "Use TODAS as peças, uma vez cada" está errado aqui e faria a criança riscar a resposta certa.
- **Atual (nos três):** Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.
- **Novo (nos três):** Bata palma em cada pedaço da palavra. Cada pedaço tem de sair de um dos nomes, sem trocar nenhuma letra.

### 7.4 · 23F1Q6 e TR13 — o truque entrega o número errado
A pergunta é quantos **espaços**. O gesto "pontinho em cada uma, conte os pontinhos" dá o número de **palavras** — 14 em 23F1Q6 e 9 em TR13 — e os dois são alternativas erradas da própria questão.
- **Atual (nos dois):** Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.
- **Novo (nos dois):** Separe a frase e conte as palavras com o dedo. Depois tire uma: o espaço fica entre duas palavras.

### 7.5 · 23F1Q14 — o truque contradiz a própria dica do item
Truque: "ache a linha que responde". Dica do mesmo item: "A lição **não está escrita em nenhuma linha**".
- **Atual:** A resposta mora no texto. Volte com a régua e ache a linha que responde.
- **Novo:** Na fábula, a lição sai do que os bichos FIZERAM no fim, não do que eles disseram.

### 7.6 · TR06 e TR07 — placa que MOSTRA, com truque de placa que PROÍBE
TR06 pergunta qual placa **mostra o banheiro**; TR07, qual mostra **onde atravessar**. O truque só fala de proibição e, em TR06, elimina uma alternativa das três erradas.
- **Atual (nos dois):** Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.
- **Novo (nos dois):** Olhe a placa inteira: primeiro a barra vermelha, depois o desenho. Sem barra vermelha, a placa não proíbe: ela mostra.

### 7.7 · 23F2Q15 — não há símbolo nem tabela
É uma troca de letra por letra descoberta comparando palavras. O truque fala de "dedo no símbolo, dedo na tabela".
- **Atual:** Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.
- **Novo:** Ache a parceira de cada letra comparando as duas listas. Depois troque uma letra de cada vez, até o fim.

### 7.8 · 24F2Q14 — contar o barulho, não a letra
"Pontinho embaixo de cada uma" lido como "cada letra S" dá 7, que é a alternativa A (errada).
- **Atual:** Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.
- **Novo:** Ponha o pontinho no barulho, não na letra. Fale a palavra baixinho e escute quem chia.

### 7.9 · 23F1Q9 e 24F2Q15 — o caminho é o inverso do truque
Aqui não se decifra símbolo para achar palavra: parte-se da palavra e trocam-se as letras por desenhos. "Junte só no fim" não se aplica.
- **Atual (nos dois):** Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.
- **Novo (nos dois):** Escreva a palavra letra por letra. Depois troque cada letra pelo desenho dela, na ordem, do começo ao fim.

### 7.10 · 23F2Q2 — a resposta não está numa linha
Quem fala é a Lua, e o nome sai de juntar três pistas espalhadas.
- **Atual:** A resposta mora no texto. Volte com a régua e ache a linha que responde.
- **Novo:** Quem fala no poema dá várias pistas. Junte todas as pistas antes de dizer quem é.

### 7.11 · 23F2Q14 — a resposta é uma fala que não está no texto
- **Atual:** A resposta mora no texto. Volte com a régua e ache a linha que responde.
- **Novo:** Quando a pergunta é sobre o que um bicho da história diria, procure o que ele já falou antes.

### 7.12 · 23F1Q8 — é preciso preencher os buracos antes de contar
Sem esse passo, "conte os pontinhos" conta buracos (7), que é a alternativa A.
- **Atual:** Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.
- **Novo:** Preencha os buracos e escreva a frase inteira. Só então ponha um pontinho em cada R.

### 7.13 · CARTAO `silabas` · texto — a raiz de 7.2 e 7.3
O cartão-mestre afirma uma regra que é falsa em quatro itens do banco.
- **Atual:** A prova dá pedaços de palavra e pergunta o que dá para montar. A regra é sempre a mesma: usar todas as peças, uma vez cada. Pode trocar a ordem.
- **Novo:** A prova dá pedaços de palavra e pergunta o que dá para montar. Às vezes ela manda usar todas as peças, uma vez cada. Às vezes ela dá peças demais e pergunta qual sobra. Leia a pergunta e veja qual dos dois é. Nos dois casos, pode trocar a ordem.

### 7.14 · CARTAO `silabas` · extras[0]
- **Atual:** Sobrou peça na mesa? Errado. Faltou peça? Errado.
- **Novo:** Quando a pergunta manda usar todas: sobrou peça na mesa, errado; faltou peça, errado.

### 7.15 · CARTAO `ler` · truque — frase diferente da que aparece nas telas
O material declara que o truque é "IDÊNTICO em todo lugar onde ele aparece". Este é o único que não é: falta "com a régua".
- **Atual:** A resposta mora no texto. Volte e ache a linha que responde.
- **Novo:** A resposta mora no texto. Volte com a régua e ache a linha que responde.

### 7.16 · CARTAO `letras` · extras — falta a regra da palavra escondida
Dois itens do banco (25F2Q4 e 25F2Q12) dependem dessa regra, e ela não está no cartão. Sem ela, a criança que estuda o cartão chega nesses itens com o truque de riscar letras, que é de outra operação.
- **Acrescentar um terceiro item em `extras`:** Palavra escondida: ela vem inteira e grudada, na ordem. Tape o começo e o fim com o dedo e leia o que sobrou.

### 7.17 · CARTAO `codigo` · extras[1] — o fecho confunde
"nenhum animal ali" logo depois de dizer que a placa tinha um cachorro desenhado dentro.
- **Atual:** Placa: círculo vermelho cortado quer dizer PROIBIDO, e o desenho de dentro diz o que é proibido. Na prova de 2025 a placa certa era a do cachorro dentro do círculo vermelho cortado: nenhum animal ali.
- **Novo:** Placa: círculo vermelho cortado quer dizer PROIBIDO, e o desenho de dentro diz o que é proibido. Sem barra vermelha, a placa não proíbe: ela mostra o que tem ali. Na prova de 2025 a placa certa tinha um cachorro dentro do círculo cortado, e queria dizer: aqui não pode entrar com animal.

---

## TIPO 8 — `proximo` que repete o `truque`

O `proximo` deve dar o **gesto concreto** para a próxima questão, não parafrasear a frase que a criança já vai guardar.

| id | truque (fica) | proximo atual | proximo novo |
|---|---|---|---|
| 25F1Q9 | Quando a pergunta fala de SOM, fale as palavras em voz alta e escute. Olhar não resolve. | Pergunta sobre SOM se resolve com a boca, não com o olho. Fale as duas palavras baixinho e compare. | Fale as duas palavras de cada alternativa antes de marcar. Não pare na primeira em que a letra parecer igual. |
| 25F1Q14 | Quando a história troca duas coisas, escreva a troca antes de responder. Depois aplique na cena nova. | Quando a história troca duas coisas de lugar, anote a troca antes de olhar as alternativas. Depois é só aplicar na cena nova. | Escreva a troca num canto do papel: o que ficou dentro de cada pote. Depois volte à cena do fim e leia o que você escreveu. |
| 24F1Q12 | Quando a pergunta é sobre como é um lugar, junte as palavras que o texto usa para descrever ele. | Quando a pergunta é sobre o jeito de um lugar, não procure uma linha só. Junte as palavras que o texto repete. | Passe a régua no poema inteiro e circule as palavras que se repetem. Depois escolha a alternativa que diz a mesma coisa que elas. |
| 24F1Q13 | Quando a pergunta é sobre o JEITO de falar, procure o que se repete na fala da pessoa. | Quando perguntarem sobre o JEITO de falar, procure o que se repete na boca da pessoa e ache a resposta que repete a mesma coisa. | Circule o pedacinho que se repete na fala da pessoa. Depois leia as quatro respostas procurando esse mesmo pedacinho. |
| 24F1Q15 | Desembarace uma palavra de cada vez, até o fim da frase. Não responda com meia frase. | Desembarace a frase INTEIRA antes de olhar as alternativas. Meia frase leva para a alternativa errada. | Escreva a frase desembaraçada no papel, do começo ao fim. Só então leia as quatro alternativas. |
| 25F2Q15 | O que os três exemplos do texto têm de igual? A resposta certa faz a mesma coisa. | Quando o texto dá três exemplos parecidos, ache o que eles têm de igual antes de olhar as alternativas. A certa vai repetir essa mesma ideia. | Diga em voz baixa, com as suas palavras, o que os exemplos do texto têm de igual. Depois procure a alternativa que faz a mesma coisa. |
| 24F2Q4 | Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada. | CENTRO é a palavra mais familiar do grupo, e é justamente ela a intrusa. Confira as letras uma por uma; não confie no que parece conhecido. | Escreva as quatro palavras uma embaixo da outra e risque letra por letra. Não decida pela palavra que você já conhece. |

---

## TABELA FINAL — para aplicar em massa

`id · campo · trecho atual · trecho novo`

| id | campo | trecho atual | trecho novo |
|---|---|---|---|
| 25F1Q2 | opts[0].no | A lua fica no céu, é verdade. Mas lua não CAI, e ninguém diz "uma lua bem forte". | Lua não cai do céu, e ninguém diz "uma lua bem forte". A frase fala de uma coisa que caiu e era forte — a lua não é essa coisa. |
| 25F1Q2 | opts[3].no | Bola cai mesmo, essa parte combina. Mas bola não tem nada a ver com as nuvens do começo da frase. | A frase começa falando de NUVENS, e bola não vem de nuvem. Ela fecha uma pista só, e a frase dá três. |
| 25F1Q6 | opts[1].no | GATO com as vogais trocadas vira GOTA. É palavra de verdade, mas gota é de água — não é parte de camisa. Formou palavra, só que não a que a pergunta pediu. | GATO com as vogais trocadas vira GOTA. Gota é de água, e a pergunta pediu uma parte de camisa. Saiu uma palavra, só que não a que a pergunta pediu. |
| 25F1Q6 | opts[2].no | GELO com as vogais trocadas vira GOLE. Também é palavra de verdade, e também não tem nada a ver com camisa. | GELO com as vogais trocadas vira GOLE. Gole é de beber, e a pergunta pediu uma parte de camisa. |
| 25F1Q7 | opts[1].no | URUBU está certo, só tem U. Mas TAMANDUÁ tem um U no meio e CAPIVARA tem um I no meio — dois nomes com vogal escondida. | TAMANDUÁ tem A e tem U. CAPIVARA tem A e tem I. São dois nomes com mais de uma vogal, e a coruja só dança com quem tem uma. |
| 25F1Q7 | opts[3].no | ARARA está certo. Mas MACACO tem o O do fim e CAPIVARA tem o I do meio. Basta um deles estar errado para a alternativa inteira cair. | MACACO tem o O do fim e CAPIVARA tem o I do meio: os dois têm mais de uma vogal. Basta um nome errado para a alternativa inteira cair. |
| 25F1Q9 | proximo | Pergunta sobre SOM se resolve com a boca, não com o olho. Fale as duas palavras baixinho e compare. | Fale as duas palavras de cada alternativa antes de marcar. Não pare na primeira em que a letra parecer igual. |
| 25F1Q10 | dica | As quatro começam com A e têm um som parecido: por aí não dá para decidir. Pense no que cada palavra SIGNIFICA. | As quatro começam com A e têm um som parecido: por aí não dá para decidir. Pergunte de cada palavra: o que ela É? |
| 25F1Q13 | opts[2].no | O poema diz TENHO DE, que é obrigação. Não diz que ele gosta. | O poema diz TENHO DE: ele é obrigado a olhar assim. Não diz que ele gosta. |
| 25F1Q14 | proximo | Quando a história troca duas coisas de lugar, anote a troca antes de olhar as alternativas. Depois é só aplicar na cena nova. | Escreva a troca num canto do papel: o que ficou dentro de cada pote. Depois volte à cena do fim e leia o que você escreveu. |
| 25F1Q15 | porque | Decodificando símbolo por símbolo, sem pular nenhum, sai ANTES SÓ DO QUE MAL ACOMPANHADO. Os cinco últimos símbolos formam uma palavra só. | Escrevendo a sílaba de cada símbolo, um por um, sem pular nenhum, sai ANTES SÓ DO QUE MAL ACOMPANHADO. Os cinco últimos símbolos formam uma palavra só. |
| 24F1Q2 | porque | CICLISTA está no singular, é um só. Então a palavrinha da frente também tem de ser de um só: UM ciclista. | CICLISTA não tem S no fim: é um só. Então a palavrinha da frente também tem de ser de um só: UM ciclista. |
| 24F1Q3 | opts[1].no | GOTA veio do desenho do gelo derretendo, não das letras. Ela até tem o G e o O, mas pede um T e um A que não existem em GELO. | GOTA pede um T e um A, e essas letras não existem em GELO. Ela veio do desenho do gelo derretendo, não das letras. |
| 24F1Q7 | dica | Não procure pelo assunto: procure o que a palavra É. Duas dessas são coisas que a gente faz e uma é um lugar. | Não procure pelo assunto. Em cada alternativa, pergunte de cada palavra: isso é uma coisa que a gente FAZ, ou é um lugar? |
| 24F1Q8 | opts[2].no | Não tem nada de Páscoa no poema. Essa é uma festa que a gente associa a folga, mas o poema não fala dela. | Não tem nada de Páscoa no poema. Páscoa é festa e dá folga, e por isso ela vem à cabeça — mas o poema não fala dela. |
| 24F1Q11 | truque | Bata palma em cada pedaço. Use TODAS as peças, uma vez cada. | Bata palma em cada pedaço da palavra. Cada pedaço tem de sair de um dos nomes, sem trocar nenhuma letra. |
| 24F1Q11 | opts[1].no | ELEVADOR começa com E-LE, que vem mesmo do elefante, e o VA vem do cavalo. Mas DOR não vem de ninguém. Quem confere só o começo cai aqui. | ELEVADOR termina em DOR, e DOR não sai de nenhum dos três nomes. O começo saiu do elefante e do cavalo, e é aí que para quem confere só o começo. |
| 24F1Q11 | opts[3].no | Essa é a armadilha mais forte da prova. GA-LO é o galo inteirinho, galopar lembra cavalo e -TE lembra elefante. Mas PAN não existe: o elefante dá FAN, não PAN. Uma letra de diferença derruba a alternativa. | GALOPANTE tem um PAN no meio. O elefante dá FAN, não PAN. Uma letra de diferença já derruba a alternativa. O começo GA-LO engana porque é o galo inteirinho. |
| 24F1Q12 | proximo | Quando a pergunta é sobre o jeito de um lugar, não procure uma linha só. Junte as palavras que o texto repete. | Passe a régua no poema inteiro e circule as palavras que se repetem. Depois escolha a alternativa que diz a mesma coisa que elas. |
| 24F1Q13 | opts[1].no | É uma fala educada e faz todo sentido no balcão. Mas a pergunta não é o que faz sentido: é qual soa como ELA fala. E aqui não tem nenhum -INHO. | Nessa fala não tem nenhum -INHO. A pergunta não é qual frase faz sentido no balcão: é qual soa como ELA fala. |
| 24F1Q13 | opts[2].no | Essa encaixa direitinho na história — ele disse que ia pagar em dinheiro, então tem troco. Mas ela fala SENHOR e não usa nenhum -INHO: não é o jeito dela. | Aqui a atendente fala SENHOR e não usa nenhum -INHO. Não é o jeito dela de falar, e é o jeito dela que a pergunta pede. |
| 24F1Q13 | proximo | Quando perguntarem sobre o JEITO de falar, procure o que se repete na boca da pessoa e ache a resposta que repete a mesma coisa. | Circule o pedacinho que se repete na fala da pessoa. Depois leia as quatro respostas procurando esse mesmo pedacinho. |
| 24F1Q15 | opts[1].no | A palmeira está certa, mas o fogo não. Quem decodifica só a primeira palavra e inventa o resto da história cai aqui. | Nenhuma sílaba da frase embaralhada fala de fogo. Quem desembaraça só a primeira palavra e inventa o resto da história cai aqui. |
| 24F1Q15 | proximo | Desembarace a frase INTEIRA antes de olhar as alternativas. Meia frase leva para a alternativa errada. | Escreva a frase desembaraçada no papel, do começo ao fim. Só então leia as quatro alternativas. |
| 25F2Q1 | opts[1].no | CABISBAIXA é palavra difícil, e é aí que mora o perigo: quando a gente não conhece a palavra, dá vontade de chutar nela. Cabisbaixa é quem anda de cabeça baixa, de tristeza — o contrário de feliz. | Cabisbaixa é quem anda de cabeça baixa, de tristeza. Isso é o contrário de feliz. É palavra difícil, e palavra difícil dá vontade de chutar. |
| 25F2Q2 | opts[0].no | Faça a troca e leia: A-G-I-T-O, AGITO. É palavra de verdade — é o que a gente faz quando agita, quando sacode um vidro de suco. Mas não é o nome de nenhum objeto que a gente sopra. | Faça a troca e leia: A-G-I-T-O, AGITO. Agitar é sacudir um vidro de suco. A pergunta pede o nome de uma coisa que a gente sopra, e agito não é nome de coisa nenhuma. |
| 25F2Q5 | opts[2].no | BRINCARAM traz o verbo certo, e é por isso que engana. Mas leia: "EU GOSTO DE BRINCARAM NA AREIA" — a frase tropeça. BRINCARAM é o que eles já fizeram, não é o que EU gosto de fazer. | Leia: "EU GOSTO DE BRINCARAM NA AREIA" — a frase tropeça. BRINCARAM é o que eles já fizeram. Quem fala aqui é EU, e depois de GOSTO DE vem BRINCAR. |
| 25F2Q7 | truque | Bata palma em cada pedaço. Use TODAS as peças, uma vez cada. | Monte as duas palavras com as peças da mesa. A peça que ficar na mesa é a que sobra. |
| 25F2Q8 | opts[1].no | Pipoca estourando faz barulho mesmo, na vida real. Só que o texto não fala disso em lugar nenhum, e a pergunta diz SEGUNDO O TEXTO. | O texto não fala de pipoca estourando em lugar nenhum. A pergunta diz SEGUNDO O TEXTO, e aqui só vale o que está escrito. |
| 25F2Q8 | opts[3].no | O carrinho de pipoca solta fumaça, é verdade. Mas de novo: o texto não fala de fumaça nenhuma. Aqui vale o que está escrito, não o que a gente já viu na rua. | O texto não fala de fumaça nenhuma. Aqui vale o que está escrito, não o que a gente já viu na rua. |
| 25F2Q14 | opts[2].no | Se ontem foi domingo, hoje é segunda — essa parte está certa. Mas hoje ela vai à FEIRA com a MÃE. O supermercado com o pai é amanhã. | Na segunda ela vai à FEIRA com a MÃE. O supermercado com o pai é AMANHÃ, e amanhã não é segunda. |
| 25F2Q15 | porque | A mãe compara carregar água na peneira com roubar um vento, catar espinhos na água e criar peixes no bolso: três coisas que não dão para fazer, porque o que se tenta guardar escapa. Encher um balão furado é assim — o ar sai pelo furo do mesmo jeito que a água escorre pelos buracos da peneira. | A mãe deu três exemplos: roubar um vento, catar espinhos na água, criar peixes no bolso. Nos três, o que a gente tenta guardar escapa. No balão furado é igual: o ar sai pelo furo, como a água escorre pelos buracos da peneira. |
| 25F2Q15 | proximo | Quando o texto dá três exemplos parecidos, ache o que eles têm de igual antes de olhar as alternativas. A certa vai repetir essa mesma ideia. | Diga em voz baixa, com as suas palavras, o que os exemplos do texto têm de igual. Depois procure a alternativa que faz a mesma coisa. |
| 24F2Q3 | opts[3].no | Essa é a mais difícil de riscar: no outono também venta e as folhas caem. Mas o poema diz na primeira linha SOU A ESTAÇÃO DO FRIO, e no fim as pessoas entram em casa a tiritar, que é tremer de frio. Isso é o frio mais forte do ano. | No outono também venta, e por isso essa é a mais difícil de riscar. Mas a primeira linha diz SOU A ESTAÇÃO DO FRIO. E no fim as pessoas entram em casa a tiritar, que é tremer de frio. Esse é o frio mais forte do ano. |
| 24F2Q4 | proximo | CENTRO é a palavra mais familiar do grupo, e é justamente ela a intrusa. Confira as letras uma por uma; não confie no que parece conhecido. | Escreva as quatro palavras uma embaixo da outra e risque letra por letra. Não decida pela palavra que você já conhece. |
| 24F2Q7 | opts[0].no | CARRÃO é um carro grande: dá para ouvir CARRO dentro dele. Segue a regra do enunciado. | CARRÃO é um carro grande: dá para ouvir CARRO dentro dele. Segue a regra que a pergunta deu. |
| 24F2Q11 | opts[0].no | PATINETE rima com COMPETE, e essa parte está certa. Mas o cachorro não tem nenhuma parte do corpo grande demais, e patinete não é coisa que se compre na farmácia. A rima sozinha não resolve. | Patinete não se compra na farmácia, e o cachorro não tem nenhuma parte do corpo grande demais. Rimar com COMPETE não basta: três alternativas rimam. |
| 24F2Q11 | opts[1].no | POLEIRO rima com INTEIRO, que é a PRIMEIRA linha da estrofe. No poema quem rima com quem é a última linha com a do meio: GRATOS/SAPATOS, FARTURA/DENTADURA, SOL/CACHECOL. | POLEIRO rima com INTEIRO, que é a PRIMEIRA linha. No poema, quem rima é a última linha com a do meio: GRATOS/SAPATOS, FARTURA/DENTADURA, SOL/CACHECOL. |
| 24F2Q13 | opts[0].no | Essa é a mais capciosa: acerta os DOIS primeiros buracos (QUERIDO, COMBINAMOS) e só descarrila depois, escrevendo APARESEU e VOSE, com S no lugar do C. Fala igual, escreve errado — e quem confere só o começo marca esta. | Os dois primeiros buracos batem: QUERIDO e COMBINAMOS. Os dois últimos escrevem APARESEU e VOSE, com S no lugar do C. Fala igual e escreve errado. Quem confere só o começo marca esta. |
| 24F2Q14 | truque | Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos. | Ponha o pontinho no barulho, não na letra. Fale a palavra baixinho e escute quem chia. |
| 24F2Q14 | opts[0].no | Sete é o número de letras S da frase — e é onde para quem conta só o S. Mas o enunciado avisa: em ACENTO quem chia é o C. O C de CEDIDOS chia igual, e ele é o oitavo. | Sete é o número de letras S da frase, e é aí que para quem conta só o S. Mas a pergunta avisa: em ACENTO quem chia é o C. O C de CEDIDOS chia igual, e ele é o oitavo. |
| 24F2Q15 | truque | Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim. | Escreva a palavra letra por letra. Depois troque cada letra pelo desenho dela, na ordem, do começo ao fim. |
| 23F1Q3 | opts[2].no | Os pães estavam na mesa, é verdade. Mas logo embaixo vem MAS TAMBÉM NÃO QUIS. Ver a comida não é comer a comida. | Logo embaixo dos pães o texto diz MAS TAMBÉM NÃO QUIS. Ver a comida não é comer a comida. |
| 23F1Q6 | truque | Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos. | Separe a frase e conte as palavras com o dedo. Depois tire uma: o espaço fica entre duas palavras. |
| 23F1Q8 | truque | Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos. | Preencha os buracos e escreva a frase inteira. Só então ponha um pontinho em cada R. |
| 23F1Q9 | truque | Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim. | Escreva a palavra letra por letra. Depois troque cada letra pelo desenho dela, na ordem, do começo ao fim. |
| 23F1Q11 | dica | Escreva T, E, R, N, O num canto do papel. Para cada palavra, risque uma letra do canto por letra dela: se pedir letra que não está lá, ou pedir a mesma duas vezes, essa alternativa caiu. | Escreva T, E, R, N, O num canto do papel. Depois pegue uma palavra e risque uma letra do canto para cada letra dela. Se faltar letra no canto, essa alternativa caiu. |
| 23F1Q11 | opts[1].no | NORTE e TORNE estão certas, e é por isso que ela engana. Mas TEMOR pede um M, e TEMPO pede um M e um P: nenhuma dessas letras existe em TERNO. Uma palavra errada derruba a alternativa inteira. | TEMOR pede um M, e TEMPO pede um M e um P. Nenhuma dessas letras existe em TERNO. Uma palavra errada derruba a alternativa inteira, mesmo com as outras batendo. |
| 23F1Q11 | opts[2].no | As três primeiras estão certas, e a armadilha fina é a última: TRONO precisa de DOIS O, e em TERNO o O aparece uma vez só. | A armadilha está na última palavra: TRONO precisa de DOIS O, e em TERNO o O aparece uma vez só. Confira até a última. |
| 23F1Q13 | dica | Leia o enunciado devagar: ele tem um NÃO. Você está procurando a frase em que a palavra repetida quer dizer A MESMA COISA nas duas vezes. | Leia a pergunta devagar: ela tem um NÃO. Você procura a frase em que a palavra repetida quer dizer A MESMA COISA nas duas vezes. |
| 23F1Q13 | porque | Nas outras três, a palavra repetida quer dizer duas coisas diferentes. Em LIVROS, as duas vezes falam do mesmo livro de ler. E o enunciado pede justamente a frase em que a palavra NÃO muda de sentido. | Nas outras três, a palavra repetida quer dizer duas coisas diferentes. Em LIVROS, as duas vezes falam do mesmo livro de ler. E a pergunta quer justamente a frase em que a palavra não muda. |
| 23F1Q13 | proximo | Quando o enunciado tiver um NÃO, sublinhe esse NÃO antes de olhar as alternativas. Ele vira a pergunta do avesso. | Quando a pergunta tiver um NÃO, ponha o dedo em cima dele antes de olhar as alternativas. Ele vira a pergunta do avesso. |
| 23F1Q13 | opts[1].no | BANCO de guardar dinheiro e BANCO de sentar são duas coisas bem diferentes. É um exemplo tão bonito que dá vontade de marcar — mas o enunciado tem um NÃO no meio. | BANCO de guardar dinheiro e BANCO de sentar são duas coisas bem diferentes. A pergunta tem um NÃO no meio: ela quer a frase em que a palavra não muda. |
| 23F1Q14 | truque | A resposta mora no texto. Volte com a régua e ache a linha que responde. | Na fábula, a lição sai do que os bichos FIZERAM no fim, não do que eles disseram. |
| 23F1Q15 | opts[3].no | Dezoito são três a mais. O verso OU ISTO OU AQUILO se repete de propósito, é assim no poema de verdade — repetir não é trocar letra. | Dezoito são três a mais. A linha OU ISTO OU AQUILO se repete de propósito: é assim no poema de verdade. Repetir não é trocar letra. |
| 23F2Q2 | truque | A resposta mora no texto. Volte com a régua e ache a linha que responde. | Quem fala no poema dá várias pistas. Junte todas as pistas antes de dizer quem é. |
| 23F2Q5 | opts[0].no | Aqui não tem nenhuma letra trocada, e é por isso que essa é a mais traiçoeira. O erro está em ESTUDARAM: eu e meu amigo somos NÓS, e nós ESTUDAMOS. | Aqui nenhuma letra está trocada, e por isso o erro passa batido. O erro está em ESTUDARAM: eu e meu amigo somos NÓS, e nós ESTUDAMOS. |
| 23F2Q10 | opts[2].no | Ela usa as seis peças, é verdade, mas ainda pede LE e ZA, que ninguém deu. Quando a frase precisa de peça a mais, está errada do mesmo jeito. | A BELEZA É DA VILA pede LE e ZA, e ninguém deu essas duas peças. Quando a frase precisa de peça a mais, ela está errada. |
| 23F2Q14 | truque | A resposta mora no texto. Volte com a régua e ache a linha que responde. | Quando a pergunta é sobre o que um bicho da história diria, procure o que ele já falou antes. |
| 23F2Q14 | opts[1].no | Essa é a mais perigosa, porque a parte do morrer junto foi mesmo o que aconteceu. Mas o próprio escorpião tinha dito que NÃO QUERIA MORRER, porque tinha os negócios dele e a família. Então não é verdade que nada lhe importa. | O escorpião tinha dito que NÃO QUERIA MORRER: falou dos negócios dele e da família. Essa resposta briga com o que ele mesmo falou. |
| 23F2Q15 | truque | Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim. | Ache a parceira de cada letra comparando as duas listas. Depois troque uma letra de cada vez, até o fim. |
| 23F2Q15 | porque | Comparando as palavras do quadro, cada letra tem uma parceira fixa: A com I, E com U, O com Y, L com P, H com J, R com V, G com M, S com N, D com T e B com Z. Decifrando a frase inteira sai A LÍNGUA PORTUGUESA É MARAVILHOSA. | Comparando as palavras do quadro, cada letra tem uma parceira que nunca muda: A com I, E com U, O com Y, L com P, H com J. Também R com V, G com M, S com N, D com T e B com Z. Trocando letra por letra, a frase inteira dá A LÍNGUA PORTUGUESA É MARAVILHOSA. |
| TR06 | truque | Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido. | Olhe a placa inteira: primeiro a barra vermelha, depois o desenho. Sem barra vermelha, a placa não proíbe: ela mostra. |
| TR07 | truque | Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido. | Olhe a placa inteira: primeiro a barra vermelha, depois o desenho. Sem barra vermelha, a placa não proíbe: ela mostra. |
| TR11 | dica | Cada verso é uma pista para a MESMA letra. Descubra a palavra escondida em cada verso e veja qual letra aparece em todas — inclusive na última pista. | Cada linha é uma pista para a MESMA letra. Ache a palavra escondida em cada linha e veja qual letra aparece em todas. E confira a última pista também. |
| TR13 | truque | Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos. | Separe a frase e conte as palavras com o dedo. Depois tire uma: o espaço fica entre duas palavras. |
| TR16 | opts[0].no | BANANA e SALADA estão certas. ABACATE parece só de A — A, BA, CA — mas o último pedaço é TE: tem um E escondido bem no fim da palavra. | ABACATE parece só de A — A, BA, CA — mas o último pedaço é TE: tem um E escondido bem no fim. Basta uma comida errada para a alternativa inteira cair. |
| TR16 | opts[1].no | BATATA está certa. Mas PIPOCA tem I, O e A, três vogais diferentes, e SUCO tem U e O. Duas erradas na mesma alternativa. | PIPOCA tem I, O e A: três vogais diferentes. E SUCO tem U e O. São duas comidas erradas na mesma alternativa. |
| TR19 | truque | Bata palma em cada pedaço. Use TODAS as peças, uma vez cada. | Bata palma em cada pedaço da palavra. Cada pedaço tem de sair de um dos nomes, sem trocar nenhuma letra. |
| TR20 | truque | Bata palma em cada pedaço. Use TODAS as peças, uma vez cada. | Bata palma em cada pedaço da palavra. Cada pedaço tem de sair de um dos nomes, sem trocar nenhuma letra. |
| TR22 | opts[3].no | Garfo tem em toda festa, é verdade. Mas garfo fica ao lado do bolo, não em cima dele, e ninguém sopra garfo. | Garfo fica ao lado do bolo, não em cima dele. E ninguém sopra garfo. Ele não passa em duas das três pistas. |
| TR24 | opts[1].no | UMAS combina com bicicleta, essa parte está certa. Mas UMAS é de várias, e a frase fala de uma bicicleta só, sem S: "ganhou umas bicicleta nova" tropeça. | UMAS é de várias, e a frase fala de uma bicicleta só, sem S no fim. Leia: "ganhou umas bicicleta nova" — tropeça. |
| TR71 | truque | Ponha cada palavra no buraco e leia a frase inteira, do começo. | Depois de PORQUE vem a explicação. Pergunte: isso explica mesmo a primeira parte? |
| TR72 | truque | Ponha cada palavra no buraco e leia a frase inteira, do começo. | Depois de PORQUE vem a explicação. Pergunte: isso explica mesmo a primeira parte? |
| TR73 | truque | Ponha cada palavra no buraco e leia a frase inteira, do começo. | Depois de PORQUE vem a explicação. Pergunte: isso explica mesmo a primeira parte? |
| TR73 | opts[0].no | O sol nascer cedo é verdade, mas não tem nada a ver com abrir uma porta. Não explica a primeira parte. | O sol nascer cedo não tem nada a ver com abrir uma porta. Isso não deixa ninguém trancado do lado de fora. |
| TR74 | truque | Ponha cada palavra no buraco e leia a frase inteira, do começo. | Depois de PORQUE vem a explicação. Pergunte: isso explica mesmo a primeira parte? |
| TR76 | opts[2].no | ESSAS é de várias, e essa parte está certa — é a que mais engana. Mas ESSAS é de menina, e "guardei essas sapatos sujos" tropeça. | ESSAS é de menina, e SAPATOS é palavra de menino. Leia: "guardei essas sapatos sujos" — tropeça. |
| TR78 | opts[2].no | SUAS combina com mochila, essa parte está certa. Mas SUAS é de várias, e a frase fala de uma mochila só, sem S no fim: "deixou suas mochila vermelha" tropeça. | SUAS é de várias, e a frase fala de uma mochila só, sem S no fim. Leia: "deixou suas mochila vermelha" — tropeça. |
| CARTAO silabas | texto | A prova dá pedaços de palavra e pergunta o que dá para montar. A regra é sempre a mesma: usar todas as peças, uma vez cada. Pode trocar a ordem. | A prova dá pedaços de palavra e pergunta o que dá para montar. Às vezes ela manda usar todas as peças, uma vez cada. Às vezes ela dá peças demais e pergunta qual sobra. Leia a pergunta e veja qual dos dois é. Nos dois casos, pode trocar a ordem. |
| CARTAO silabas | extras[0] | Sobrou peça na mesa? Errado. Faltou peça? Errado. | Quando a pergunta manda usar todas: sobrou peça na mesa, errado; faltou peça, errado. |
| CARTAO ler | truque | A resposta mora no texto. Volte e ache a linha que responde. | A resposta mora no texto. Volte com a régua e ache a linha que responde. |
| CARTAO letras | extras | (só dois itens: trocar as vogais; mover uma letra) | acrescentar: Palavra escondida: ela vem inteira e grudada, na ordem. Tape o começo e o fim com o dedo e leia o que sobrou. |
| CARTAO codigo | extras[1] | Placa: círculo vermelho cortado quer dizer PROIBIDO, e o desenho de dentro diz o que é proibido. Na prova de 2025 a placa certa era a do cachorro dentro do círculo vermelho cortado: nenhum animal ali. | Placa: círculo vermelho cortado quer dizer PROIBIDO, e o desenho de dentro diz o que é proibido. Sem barra vermelha, a placa não proíbe: ela mostra o que tem ali. Na prova de 2025 a placa certa tinha um cachorro dentro do círculo cortado, e queria dizer: aqui não pode entrar com animal. |
