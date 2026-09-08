/* ============================================================
   reserva_treino_B.js — BLOCO DE ITENS DE TREINO (AUTORAIS)
   Categoria G · 2º ano · 12 questões · ids TR13 a TR24

   ATENÇÃO — ESTAS QUESTÕES NÃO SÃO DE PROVA.
   Nenhum item deste arquivo saiu de uma prova da Olimpíada de
   Português. São exercícios ESCRITOS POR NÓS, no molde da banca,
   e por isso a `origem` de todos é a mesma frase, sem ano e sem
   número de questão: 'Treino no estilo da prova'. Citar ano/fase/
   questão aqui seria mentira — o banco oficial (OP_data.js) só usa
   `origem` com ano quando o enunciado é verbatim do PDF.

   POR QUE ESTE ARQUIVO EXISTE
   O banco verbatim tem 60 itens (2024 e 2025, 1ª e 2ª fases). Isso
   dá para poucos simulados antes de a criança começar a reconhecer
   a questão em vez de resolvê-la. Estes 12 itens dão VOLUME DE
   TREINO nos três eixos em que a repetição mais rende, sem gastar
   as provas de verdade: `contar` (4), `silabas` (4) e `buraco` (4).

   COMO FORAM ESCRITOS (assinatura da banca, obedecida item a item)
   - O distrator premia a leitura parcial: passa em quase todos os
     critérios e cai em UM.
   - Nada se resolve numa operação só: sempre duas etapas encadeadas.
   - Uma letra ou uma sílaba decide a questão (TA × TE, CA × CO,
     NA × NO, NHO × NO, FON × FO+NE).
   - O enunciado explica a regra em linguagem de criança antes de
     cobrar. Zero metalinguagem: só VOGAL, CONSOANTE, SÍLABA, LETRA.
   - `truque` é copiado palavra por palavra da família em FAMILIAS
     (contar, silabas, buraco). Não se inventa truque novo.
   - Toda contagem foi feita letra por letra e conferida duas vezes.
     As contas ficam explícitas no `visual` e no `porque` de cada item.

   Colar dentro da lista ITENS do OP_data.js (ou do carregador de
   reservas), exatamente como está.
   ============================================================ */

{id:'TR13', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'RAFAEL ESCREVEU UMA FRASE NO CADERNO, MAS ESQUECEU DE DEIXAR ESPAÇO ENTRE AS PALAVRAS. VEJA COMO ELA FICOU:',
 quadro:'OGATODEMARIADORMENOSOF&Aacute;DASALA.',
 pede:'QUANTOS ESPAÇOS FALTAM PARA CONSERTAR A FRASE DE RAFAEL?',
 opts:[
  {t:'7.', no:'Sete é o que dá quando duas palavrinhas ficam grudadas na hora de separar, como NO SOFÁ virando NOSOFÁ. Aí sobram oito palavras. Separando com cuidado são nove.'},
  {t:'8.', ok:1},
  {t:'9.', no:'Nove é o número de PALAVRAS da frase, e é aqui que quase todo mundo cai. A pergunta é de ESPAÇOS: os espaços ficam ENTRE as palavras, então são sempre um a menos.'},
  {t:'10.', no:'Dez é contar as nove palavras e ainda pôr um espaço depois do ponto final. Depois do ponto a frase acabou: ali não entra espaço nenhum.'}
 ],
 dica:'Primeiro separe a frase e escreva as palavras uma do lado da outra. Só depois conte os buraquinhos ENTRE elas.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="pc">GATO</span><span class="pc">DE</span><span class="pc">MARIA</span><span class="pc">DORME</span><span class="pc">NO</span><span class="pc">SOF&Aacute;</span><span class="pc">DA</span><span class="pc">SALA</span><span class="arw">&rarr;</span><span class="pc hit">9 palavras</span></div>'+
        '<div class="pcs"><span class="pc hit">1</span><span class="pc hit">2</span><span class="pc hit">3</span><span class="pc hit">4</span><span class="pc hit">5</span><span class="pc hit">6</span><span class="pc hit">7</span><span class="pc hit">8</span><span class="arw">&rarr;</span><span class="pc hit">8 espa&ccedil;os</span></div>'+
        '<p class="vx">O espa&ccedil;o mora <b>entre</b> duas palavras. Por isso ele &eacute; sempre <b>um a menos</b> que o n&uacute;mero de palavras.</p>'+
        '<p class="vx"><span class="dm">Depois do ponto final n&atilde;o entra espa&ccedil;o: a frase j&aacute; acabou.</span></p>',
 porque:'Separando, a frase é O GATO DE MARIA DORME NO SOFÁ DA SALA: nove palavras. Entre nove palavras cabem oito espaços, porque não tem espaço antes da primeira nem depois do ponto final.',
 proximo:'Separe a frase INTEIRA antes de contar. Depois conte as palavras e tire um: esse é o número de espaços.'},

{id:'TR14', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'LEIA A FRASE ABAIXO COM O DEDO, DEVAGAR:',
 quadro:'O CARRO VERMELHO CORREU NA RUA ESTREITA.',
 pede:'QUANTAS VEZES A LETRA R APARECE NESSA FRASE?',
 opts:[
  {t:'5.', no:'Cinco é o número de PALAVRAS que têm R: CARRO, VERMELHO, CORREU, RUA e ESTREITA. Mas a pergunta não é quantas palavras: é quantas vezes a LETRA aparece — e CARRO e CORREU têm dois R cada um.'},
  {t:'6.', no:'Seis é o que dá quando o dedo para antes do fim da frase. O último R está escondido em ESTREITA, espremido entre o T e o E, bem no lugar em que a gente passa batido.'},
  {t:'7.', ok:1},
  {t:'8.', no:'Oito é um R a mais. Quem chega nele contou dois R em VERMELHO, porque a palavra é comprida e o dedo volta. Soletre devagar: V-E-R-M-E-L-H-O. Tem um R só.'}
 ],
 dica:'Vá de uma palavra por vez e escreva o número de R em cima de cada uma. Cuidado com as palavras que têm RR: ali são dois pontinhos, não um.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">CA<b>RR</b>O = 2</span><span class="pc hit">VE<b>R</b>MELHO = 1</span><span class="pc hit">CO<b>RR</b>EU = 2</span><span class="pc hit"><b>R</b>UA = 1</span><span class="pc hit">EST<b>R</b>EITA = 1</span></div>'+
        '<p class="vx">2 + 1 + 2 + 1 + 1 = <b>7</b></p>'+
        '<div class="pcs"><span class="pc bad">5 palavras com R</span><span class="arw">&rarr;</span><span class="pc bad">a pergunta n&atilde;o &eacute; essa</span></div>'+
        '<p class="vx"><span class="dm">CARRO e CORREU valem <b>dois</b> pontinhos cada. &Eacute; o que separa o 5 do 7.</span></p>',
 porque:'CARRO tem dois R, VERMELHO tem um, CORREU tem dois, RUA tem um e ESTREITA tem um. Somando: 2 + 1 + 2 + 1 + 1 = 7.',
 proximo:'Conte LETRA por letra, não palavra por palavra. Onde aparecer RR, marque dois pontinhos.'},

{id:'TR15', eixo:'contar', origem:'Treino no estilo da prova',
 pede:'QUAL DAS FRASES ABAIXO TEM MAIS CONSOANTES DO QUE VOGAIS?',
 opts:[
  {t:'MEU AVÔ VIAJOU PARA A PRAIA DE CARRO.', no:'É a frase mais comprida das quatro, e comprida engana. Mas AVÔ, VIAJOU e PRAIA vivem com vogal atrás de vogal: aqui sobram vogais, não consoantes.'},
  {t:'O PASSARINHO AZUL VOOU ATÉ A JANELA.', no:'PASSARINHO tem letra dobrada e dá cara de frase pesada de consoante. Só que VOOU tem três vogais grudadas, e AZUL, ATÉ e A quase não trazem consoante. As vogais ganham.'},
  {t:'CRISTINA PLANTOU FLORES BRANCAS.', ok:1},
  {t:'A COELHINHA COMEU UMA CENOURA.', no:'O LH e o NH parecem consoantes grudadas, e é isso que atrai. Mas olhe o resto: COELHINHA, COMEU, UMA e CENOURA são cheias de vogal. Aqui as vogais também ganham.'}
 ],
 dica:'Vogal é A, E, I, O, U — todo o resto é consoante. Procure a frase em que as consoantes andam grudadas: CR, PL, FL, BR.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">CR</span><span class="pc hit">ST</span><span class="pc hit">PL</span><span class="pc hit">NT</span><span class="pc hit">FL</span><span class="pc hit">BR</span><span class="pc hit">NC</span></div>'+
        '<p class="vx">Em <b>CRISTINA PLANTOU FLORES BRANCAS</b> as consoantes andam de duas em duas o tempo todo: 10 vogais contra 18 consoantes.</p>'+
        '<div class="pcs"><span class="pc bad">AV&Ocirc;</span><span class="pc bad">VIAJOU</span><span class="pc bad">PRAIA</span><span class="pc bad">VOOU</span><span class="pc bad">COMEU</span><span class="pc bad">CENOURA</span></div>'+
        '<p class="vx">Nas outras tr&ecirc;s frases quem anda grudada &eacute; a <b>vogal</b>. &Eacute; o sinal de que ali as vogais ganham.</p>',
 porque:'Em CRISTINA PLANTOU FLORES BRANCAS as consoantes vêm grudadas: CR, ST, PL, NT, FL, BR, NC. São 10 vogais contra 18 consoantes. Nas outras três, quem vem grudada é a vogal.',
 proximo:'Não escolha pela frase mais comprida. Procure aquela em que as consoantes se encostam umas nas outras — é ali que elas ganham das vogais.'},

{id:'TR16', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'DONA LUÍSA VAI ARRUMAR A CESTA DO PIQUENIQUE E INVENTOU UMA REGRA PARA ESCOLHER O QUE LEVA:',
 quadro:'&mdash; S&Oacute; VOU LEVAR AS COMIDAS QUE T&Ecirc;M UMA &Uacute;NICA VOGAL, MESMO QUE ELA APARE&Ccedil;A V&Aacute;RIAS VEZES!'+
        '<div class="sep"></div>BANANA &ndash; ABACATE &ndash; SALADA &ndash; PIPOCA &ndash; BATATA &ndash; SUCO &ndash; SORVETE',
 pede:'MARQUE A ALTERNATIVA QUE MOSTRA APENAS AS COMIDAS QUE DONA LUÍSA VAI LEVAR:',
 opts:[
  {t:'BANANA, ABACATE E SALADA.', no:'BANANA e SALADA estão certas. ABACATE parece só de A — A, BA, CA — mas o último pedaço é TE: tem um E escondido bem no fim da palavra.'},
  {t:'BATATA, PIPOCA E SUCO.', no:'BATATA está certa. Mas PIPOCA tem I, O e A, três vogais diferentes, e SUCO tem U e O. Duas erradas na mesma alternativa.'},
  {t:'BANANA, SALADA E BATATA.', ok:1},
  {t:'SALADA, BATATA E SORVETE.', no:'Duas estão certinhas, e é justamente por isso que essa engana. SORVETE tem O e tem E — basta uma comida errada para a alternativa inteira cair.'}
 ],
 dica:'Vogal é A, E, I, O, U. Ponha um pontinho embaixo de cada vogal do nome e vá até a ÚLTIMA letra da palavra.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">B<b>A</b>N<b>A</b>N<b>A</b></span><span class="pc hit">S<b>A</b>L<b>A</b>D<b>A</b></span><span class="pc hit">B<b>A</b>T<b>A</b>T<b>A</b></span></div>'+
        '<p class="vx">Nas tr&ecirc;s aparece s&oacute; o <b>A</b>, tr&ecirc;s vezes em cada uma. Repetir pode; o que n&atilde;o pode &eacute; entrar uma vogal diferente.</p>'+
        '<div class="pcs"><span class="pc bad">ABACAT<b>E</b></span><span class="pc bad">P<b>I</b>P<b>O</b>CA</span><span class="pc bad">S<b>U</b>C<b>O</b></span><span class="pc bad">S<b>O</b>RV<b>E</b>TE</span></div>'+
        '<p class="vx">No ABACATE a vogal diferente est&aacute; na <b>&uacute;ltima letra</b> &mdash; bem onde o dedo costuma parar de conferir.</p>',
 porque:'BANANA, SALADA e BATATA usam só a vogal A, mesmo repetindo três vezes. Nas outras entra uma segunda vogal: o E de ABACATE, o I e o O de PIPOCA, o U de SUCO, o O e o E de SORVETE.',
 proximo:'Vá com o dedo até a última letra da palavra. A vogal que estraga costuma estar no fim, depois de todas as outras terem dado certo.'},

{id:'TR17', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'SE VOCÊ ME DER UM BO, UM LA E UM CHA, EU DAREI A VOCÊ UMA BOLACHA. SE VOCÊ ME DER UM PA, UM TO E UM SA, EU DAREI A VOCÊ UM SAPATO.',
 pede:'AGORA, SE VOCÊ ME DER UM TA, UM CA E UM NE, O QUE EU DAREI A VOCÊ?',
 opts:[
  {t:'UMA CANECA.', no:'CANECA bate palma em CA-NE-CA: gasta o CA duas vezes, e você só recebeu um. E ainda deixa o TA parado na mesa.'},
  {t:'UMA CANETA.', ok:1},
  {t:'UMA NETA.', no:'NETA usa o NE e o TA, e essas duas peças existem mesmo. Mas gasta só duas e deixa o CA sobrando — quando sobra peça, a palavra está errada.'},
  {t:'UMA TECLA.', no:'TECLA parece começar com a sua peça, e é por isso que atrai. Mas o começo dela é TE, e o que te deram foi TA: uma letra de diferença. E CLA ninguém te deu.'}
 ],
 dica:'Os dois exemplos ensinam a regra: usar TODAS as peças, uma vez cada, e pode trocar a ordem delas.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">TA</span><span class="pc">CA</span><span class="pc">NE</span><span class="arw">&rarr;</span><span class="pc hit">CA</span><span class="pc hit">NE</span><span class="pc hit">TA</span></div>'+
        '<p class="vx">Tr&ecirc;s pe&ccedil;as dadas, tr&ecirc;s pe&ccedil;as usadas. Nada sobrou e nada foi inventado.</p>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">NE</span><span class="pc bad">CA</span><span class="arw">&rarr;</span><span class="pc bad">o CA foi usado duas vezes</span></div>'+
        '<div class="pcs"><span class="pc hit">NE</span><span class="pc hit">TA</span><span class="pc bad">CA</span><span class="arw">&rarr;</span><span class="pc bad">NETA deixou o CA sobrando</span></div>',
 porque:'CA-NE-TA gasta as três peças, uma vez cada, só trocando a ordem — exatamente como nos exemplos: BO+LA+CHA virou BOLACHA e PA+TO+SA virou SAPATO.',
 proximo:'Conte as peças que a prova deu e conte os pedaços da palavra que você escolheu. Os dois números têm de ser iguais.'},

{id:'TR18', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'A PROFESSORA DEU A LUCAS QUATRO PEÇAS DE SÍLABA. ELE TEM DE USAR AS QUATRO, UMA VEZ CADA, NA ORDEM QUE QUISER.',
 quadro:'FO &nbsp;&ndash;&nbsp; NE &nbsp;&ndash;&nbsp; TE &nbsp;&ndash;&nbsp; LE',
 pede:'QUE PALAVRA LUCAS CONSEGUE FORMAR COM AS QUATRO PEÇAS?',
 opts:[
  {t:'ELEFANTE.', no:'ELEFANTE é a armadilha mais forte daqui: ele tem o LE e tem o TE, iguaizinhos aos de Lucas. Mas bata palma: E-LE-FAN-TE. O E sozinho e o FAN ninguém deu, e ainda sobrariam o FO e o NE.'},
  {t:'FONTE.', no:'FONTE parece feita de FO + NE + TE, mas não é. Bata palma: FON-TE. O primeiro pedaço é FON, e Lucas tem FO e NE separados, que não viram FON. E sobrariam duas peças.'},
  {t:'TELEFONE.', ok:1},
  {t:'FONE.', no:'FONE usa o FO e o NE, e as duas peças existem mesmo. Mas gasta só duas: o TE e o LE ficam parados na mesa. Tem de usar as quatro.'}
 ],
 dica:'Bata palma na palavra de cada alternativa e conte os pedaços. Lucas tem QUATRO peças: a palavra certa tem de ter quatro pedaços.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">FO</span><span class="pc">NE</span><span class="pc">TE</span><span class="pc">LE</span><span class="arw">&rarr;</span><span class="pc hit">TE</span><span class="pc hit">LE</span><span class="pc hit">FO</span><span class="pc hit">NE</span></div>'+
        '<p class="vx">Quatro pe&ccedil;as dadas, quatro pe&ccedil;as usadas: TE-LE-FO-NE.</p>'+
        '<div class="pcs"><span class="pc bad">E</span><span class="pc hit">LE</span><span class="pc bad">FAN</span><span class="pc hit">TE</span><span class="arw">&rarr;</span><span class="pc bad">E e FAN n&atilde;o existem</span></div>'+
        '<div class="pcs"><span class="pc hit">FO</span><span class="pc hit">NE</span><span class="pc bad">TE</span><span class="pc bad">LE</span><span class="arw">&rarr;</span><span class="pc bad">FONE deixou duas sobrando</span></div>',
 porque:'TE-LE-FO-NE usa as quatro peças, uma vez cada, só mudando a ordem. ELEFANTE pede E e FAN, que ninguém deu; FONTE pede FON; e FONE deixa duas peças na mesa.',
 proximo:'Antes de escolher, bata palma na palavra e conte os pedaços. Se der um número diferente do número de peças, já pode riscar.'},

{id:'TR19', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'ESTAS SÃO TRÊS COISAS QUE EXISTEM NA COZINHA:',
 quadro:'SACOLA &nbsp;&ndash;&nbsp; PANELA &nbsp;&ndash;&nbsp; TOMATE',
 pede:'QUE ALTERNATIVA MOSTRA UMA PALAVRA FORMADA APENAS COM SÍLABAS DOS NOMES ACIMA?',
 opts:[
  {t:'SALADA.', no:'SALADA é comida, e numa lista de cozinha ela parece pertencer — é essa a isca. O SA e o LA existem mesmo, mas o DA não vem de ninguém. Uma sílaba de fora derruba a palavra inteira.'},
  {t:'SAPATO.', ok:1},
  {t:'MACACO.', no:'MACACO chega perto: o MA vem do tomate e o CO vem da sacola. Mas o CA não existe — a sacola dá CO, não CA. Uma letra de diferença.'},
  {t:'SAPO.', no:'SAPO começa com o SA da sacola, e é só por isso que atrai. Mas o segundo pedaço é PO, e ninguém tem PO: a panela dá PA. Uma letra de diferença.'}
 ],
 dica:'Bata palma em cada nome e escreva as peças: SA-CO-LA, PA-NE-LA, TO-MA-TE. Essas são todas as peças que você tem.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">SA</span><span class="pc">CO</span><span class="pc">LA</span><span class="pc">PA</span><span class="pc">NE</span><span class="pc">LA</span><span class="pc">TO</span><span class="pc">MA</span><span class="pc">TE</span></div>'+
        '<p class="vx">Essas s&atilde;o as pe&ccedil;as que os tr&ecirc;s nomes d&atilde;o.</p>'+
        '<div class="pcs"><span class="pc hit">SA</span><span class="pc hit">PA</span><span class="pc hit">TO</span><span class="arw">&rarr;</span><span class="pc hit">uma de cada nome</span></div>'+
        '<div class="pcs"><span class="pc hit">MA</span><span class="pc bad">CA</span><span class="pc hit">CO</span><span class="arw">&rarr;</span><span class="pc bad">CA n&atilde;o existe, s&oacute; CO</span></div>'+
        '<div class="pcs"><span class="pc hit">SA</span><span class="pc hit">LA</span><span class="pc bad">DA</span><span class="arw">&rarr;</span><span class="pc bad">DA n&atilde;o existe</span></div>',
 porque:'SA vem de SACOLA, PA vem de PANELA e TO vem de TOMATE: SAPATO usa uma sílaba de cada nome. Nas outras sempre falta uma peça — o DA de SALADA, o CA de MACACO, o PO de SAPO.',
 proximo:'Confira TODAS as sílabas da palavra escolhida, uma por uma, não só a primeira. A que estraga costuma ser a do meio ou a do fim.'},

{id:'TR20', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'VEJA ESTAS TRÊS PALAVRAS:',
 quadro:'CAMISA &nbsp;&ndash;&nbsp; MENINO &nbsp;&ndash;&nbsp; BOLO',
 pede:'QUE ALTERNATIVA MOSTRA O NOME DE UM ANIMAL FORMADO APENAS COM SÍLABAS DAS PALAVRAS ACIMA?',
 opts:[
  {t:'CAMINHO.', no:'CAMINHO começa igualzinho: CA-MI, as duas da camisa. Quem confere só o começo marca esta. Mas o terceiro pedaço é NHO, e o menino dá NI e NO — nunca NHO. E caminho nem animal é.'},
  {t:'CAMELO.', ok:1},
  {t:'MENINA.', no:'MENINA está a uma letra de dar certo: ME e NI existem, mas o último pedaço é NA, e o menino termina em NO. Além disso, menina não é animal.'},
  {t:'BONITO.', no:'BONITO pega o BO do bolo e o NI do menino, e por isso engana. Mas o TO não existe em ninguém: o bolo dá BO e LO. E bonito não é nome de animal.'}
 ],
 dica:'Bata palma nas três palavras: CA-MI-SA, ME-NI-NO, BO-LO. Depois lembre que a pergunta pede o nome de um ANIMAL.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">CA</span><span class="pc">MI</span><span class="pc">SA</span><span class="pc">ME</span><span class="pc">NI</span><span class="pc">NO</span><span class="pc">BO</span><span class="pc">LO</span></div>'+
        '<p class="vx">Essas s&atilde;o todas as pe&ccedil;as dispon&iacute;veis.</p>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">ME</span><span class="pc hit">LO</span><span class="arw">&rarr;</span><span class="pc hit">CAMELO</span></div>'+
        '<p class="vx">CA da camisa, ME do menino, LO do bolo: uma pe&ccedil;a de cada palavra.</p>'+
        '<div class="pcs"><span class="pc hit">ME</span><span class="pc hit">NI</span><span class="pc bad">NA</span><span class="arw">&rarr;</span><span class="pc bad">o menino termina em NO</span></div>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">MI</span><span class="pc bad">NHO</span><span class="arw">&rarr;</span><span class="pc bad">NHO n&atilde;o existe</span></div>',
 porque:'CA vem de CAMISA, ME vem de MENINO e LO vem de BOLO: CAMELO se forma com uma sílaba de cada palavra, e camelo é animal. Nas outras falta sempre uma peça — NHO, NA, TO —, e nenhuma delas é animal.',
 proximo:'Confira as sílabas até o fim E confira o que a pergunta pediu. Aqui não bastava formar a palavra: tinha de ser o nome de um animal.'},

{id:'TR21', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA COMPLETA A FRASE ABAIXO?',
 quadro:'ONTEM JOANA PERDEU UM <span class="bl">_______</span>. HOJE DE MANH&Atilde; ELA ACHOU UMA MOEDINHA EMBAIXO DO TRAVESSEIRO!',
 opts:[
  {t:'BRINQUEDO.', no:'Brinquedo se perde o tempo todo, e é o que dá mais vontade de marcar. Mas leia a frase até o fim: ninguém troca brinquedo perdido por moedinha embaixo do travesseiro.'},
  {t:'DENTE.', ok:1},
  {t:'SAPATO.', no:'Dá para perder um sapato, e essa parte da frase combina. Só que a segunda parte não fecha: sapato perdido não vira moedinha embaixo do travesseiro.'},
  {t:'TRAVESSEIRO.', no:'A palavra TRAVESSEIRO já aparece na própria frase, e é isso que puxa o olho para ela. Mas se Joana tivesse perdido o travesseiro, ela não podia achar nada embaixo dele.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro do buraco. Duas pistas mandam: PERDEU e MOEDINHA EMBAIXO DO TRAVESSEIRO.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">PERDEU UM</span> ... <span class="mk">MOEDINHA</span> ... <span class="mk">EMBAIXO DO TRAVESSEIRO</span></p>'+
        '<p class="vx">As tr&ecirc;s pistas t&ecirc;m de fechar ao mesmo tempo. S&oacute; o <b>dente</b> fecha as tr&ecirc;s.</p>'+
        '<p class="vx"><span class="dm">perdeu um</span> <b class="bad2">SAPATO</b> <span class="dm">&mdash; a primeira pista at&eacute; combina, mas a moedinha n&atilde;o vem</span></p>',
 porque:'Quem perde dente é que acha moedinha embaixo do travesseiro. As duas partes da frase só fecham juntas com DENTE.',
 proximo:'Antes de marcar, leia a frase inteira com a palavra dentro, até o ponto final. Se a segunda metade brigar, é a errada.'},

{id:'TR22', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA COMPLETA A FRASE ABAIXO?',
 quadro:'O BOLO CHEGOU NA MESA COM SETE <span class="bl">_______</span> EM CIMA. TODO MUNDO CANTOU E LU&Iacute;SA SOPROU.',
 opts:[
  {t:'VELINHAS.', ok:1},
  {t:'MORANGOS.', no:'Morango fica em cima do bolo mesmo, e essa parte combina. Mas a frase termina com Luísa SOPRANDO — e ninguém sopra morango.'},
  {t:'BALÕES.', no:'Balão a gente sopra, e é aí que essa engana: ela passa na pista do sopro. Mas balão não fica em cima do bolo, e não é o que se sopra na hora do parabéns.'},
  {t:'GARFOS.', no:'Garfo tem em toda festa, é verdade. Mas garfo fica ao lado do bolo, não em cima dele, e ninguém sopra garfo.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro. Três pistas mandam: SETE, EM CIMA DO BOLO e SOPROU.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">SETE</span> ... <span class="mk">EM CIMA</span> do bolo ... <span class="mk">LU&Iacute;SA SOPROU</span></p>'+
        '<p class="vx">S&oacute; a <b>velinha</b> fecha as tr&ecirc;s: sete velinhas s&atilde;o a idade, ficam em cima do bolo e s&atilde;o o que a gente sopra.</p>'+
        '<p class="vx"><b class="bad2">BAL&Otilde;ES</b> <span class="dm">&mdash; passa na pista do sopro e cai na pista do bolo</span></p>'+
        '<p class="vx"><b class="bad2">MORANGOS</b> <span class="dm">&mdash; passa na pista do bolo e cai na pista do sopro</span></p>',
 porque:'Sete velinhas em cima do bolo são a idade de quem faz aniversário, e velinha é o que a gente sopra depois do parabéns. As três pistas da frase fecham só com VELINHAS.',
 proximo:'Quando a frase dá mais de uma pista, confira TODAS. A alternativa errada costuma passar numa delas e cair na outra.'},

{id:'TR23', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA PREENCHE CORRETAMENTE A LACUNA NA FRASE ABAIXO?',
 quadro:'NO QUINTAL DA MINHA CASA NASCERAM <span class="bl">_____</span> FLORES AMARELAS.',
 opts:[
  {t:'UMA', no:'UMA é de uma só. Leia a frase inteira: "nasceram uma flores amarelas" — ela tropeça na hora. FLORES tem S no fim, são várias.'},
  {t:'MUITAS', ok:1},
  {t:'ALGUNS', no:'ALGUNS é de várias, e essa parte combina direitinho — é por isso que atrai. Mas leia baixinho: "nasceram alguns flores amarelas" tropeça. Aqui a palavra seria ALGUMAS.'},
  {t:'AQUELE', no:'AQUELE é de um só, e a frase fala de várias. "Nasceram aquele flores amarelas" tropeça duas vezes.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. Repare no que vem DEPOIS do buraco: FLORES e AMARELAS terminam em S.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">nasceram <b class="mk">MUITAS</b> FLORES AMARELAS <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><span class="dm">nasceram</span> <b class="bad2">ALGUNS</b> <span class="dm">FLORES AMARELAS &mdash; a frase tropeça</span></p>'+
        '<p class="vx"><span class="dm">nasceram</span> <b class="bad2">UMA</b> <span class="dm">FLORES AMARELAS &mdash; a frase tropeça</span></p>'+
        '<p class="vx">FLORES e AMARELAS t&ecirc;m <b>S</b> no fim. Ent&atilde;o a palavrinha da frente tamb&eacute;m tem de ser de <b>v&aacute;rias</b> e de <b>menina</b>.</p>',
 porque:'A frase fala de várias flores, e FLORES e AMARELAS são de menina. Lendo a frase inteira, só MUITAS FLORES AMARELAS anda sem tropeçar.',
 proximo:'Olhe a palavra que vem depois do buraco: tem S no fim? Então a palavrinha da frente também é de várias. E veja se ela é de menino ou de menina.'},

{id:'TR24', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA PREENCHE CORRETAMENTE A LACUNA NA FRASE ABAIXO?',
 quadro:'NO DIA DO ANIVERS&Aacute;RIO DELE, PEDRO GANHOU <span class="bl">_____</span> BICICLETA NOVA.',
 opts:[
  {t:'UM', no:'UM é de um só, e é uma bicicleta só mesmo — essa parte combina, e é aí que ele engana. Mas leia a frase inteira: "ganhou um bicicleta nova" tropeça.'},
  {t:'UMAS', no:'UMAS combina com bicicleta, essa parte está certa. Mas UMAS é de várias, e a frase fala de uma bicicleta só, sem S: "ganhou umas bicicleta nova" tropeça.'},
  {t:'UMA', ok:1},
  {t:'ALGUNS', no:'ALGUNS tropeça duas vezes: é de vários e é de menino. "Ganhou alguns bicicleta nova" não é jeito de falar nem de escrever.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. A pista vem depois do buraco: BICICLETA NOVA, uma só, e não é palavra de menino.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">ganhou <b class="mk">UMA</b> BICICLETA NOVA <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><span class="dm">ganhou</span> <b class="bad2">UM</b> <span class="dm">BICICLETA NOVA &mdash; a frase tropeça</span></p>'+
        '<p class="vx"><span class="dm">ganhou</span> <b class="bad2">UMAS</b> <span class="dm">BICICLETA NOVA &mdash; a frase tropeça</span></p>'+
        '<p class="vx">BICICLETA e NOVA est&atilde;o sozinhas, sem S no fim, e s&atilde;o palavras de menina. A palavrinha da frente tem de combinar com as duas coisas.</p>',
 porque:'A frase fala de uma bicicleta só, e BICICLETA e NOVA são de menina. Lendo a frase inteira, só UMA BICICLETA NOVA anda sem tropeçar.',
 proximo:'Leia sempre até o fim da frase com a palavra dentro. Uma palavrinha pode acertar o "quantos" e errar o "de menino ou de menina" — e uma coisa só já derruba.'},
