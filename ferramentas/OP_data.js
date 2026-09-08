/* ============================================================
   OP_data.js — BANCO ÚNICO da Olimpíada de Português (OP bê-á-bá)
   Categoria G · 2º ano · 1ª fase · prova em 10/09/2026

   FONTE DE TUDO: as provas oficiais baixadas de olimpiadadeportugues.org
   (2023, 2024 e 2025 · 1ª e 2ª fases · Categoria G), convertidas em
   olimpiadas/_fontes_md/ e transcritas em olimpiadas/_fontes/DOSSIE_*.md.
   NENHUM enunciado aqui foi inventado: todo item traz `origem` com ano,
   fase e número da questão, e o gabarito veio da célula vermelha do
   ESPAÇO-RESPOSTA do PDF oficial (lido na imagem, conferido duas vezes).

   O QUE A ANÁLISE DAS 90 QUESTÕES MOSTROU (olimpiadas/_PLANO.md):
   - 15 questões, 4 alternativas (A-D), 1h30. Tudo em CAIXA ALTA.
   - Metade da prova NÃO é interpretação: é operação com letras, sílabas
     e contagem. Por isso são 9 famílias, e não "texto e gramática".
   - A alternativa errada é quase sempre uma QUASE-CERTA que para cedo.
     O erro típico não é ignorância: é parar no primeiro acerto parcial.
     Todo truque termina com o mesmo gesto: conferir as quatro.

   COMO O TEXTO É ESCRITO AQUI:
   - `enun`, `pede`, `texto`, `quadro` e as alternativas ficam em CAIXA
     ALTA, iguais à prova — treinar no formato do papel é parte do treino.
   - `truque`, `porque`, os comentários de erro e `proximo` ficam em letra
     normal: é a voz de quem ensina, não a da prova, e a criança precisa
     distinguir as duas na tela.
   - Sem metalinguagem. Só sobrevivem as palavras que a própria prova
     usa com a criança: VOGAL, CONSOANTE, SÍLABA, LETRA, ALFABETO.

   ANATOMIA DE UM ITEM
     id        identificador curto (ano/fase/questão)
     eixo      chave da família (ver FAMILIAS)
     origem    citação visível na tela, para ela saber que é prova de verdade
     enun      o contexto/história (caixa alta, verbatim)
     pede      a pergunta em si (caixa alta, verbatim)
     texto     array de linhas -> ativa a RÉGUA quando tem 3 ou mais
     quadro    bloco destacado da prova (lista, frase, tabela) em HTML
     nota      adaptação declarada, quando a questão original dependia de
               uma figura que não temos (nomeamos o desenho em palavras)
     opts      alternativas; a certa tem ok:1, as erradas trazem `no`,
               que é a linha "por que a sua não serve" do comentário
     dica      o que o botão DICA mostra ANTES de responder (empurrão, nunca
               a resposta)
     truque    a frase do cartão de truque, IDÊNTICA em todo lugar onde ela
               aparece — reconhecer a frase é o que faz a próxima dar certo
     visual    o truque aplicado NESTA questão, em HTML (peças que acendem,
               pontinhos, linha do texto reacesa). Classes disponíveis:
                 .pcs   linha de peças        .pc    uma peça (letra/sílaba)
                 .pc.hit  peça que serve      .pc.bad  peça que sobra/falta
                 .arw   seta entre dois grupos
                 .mk    trecho aceso          .dm   trecho apagado
     porque    por que a certa é a certa (2 a 4 linhas)
     proximo   o gesto para a próxima questão do mesmo estilo
   ============================================================ */

window.OP = (function(){

/* ---------- AS 9 FAMÍLIAS ----------
   `nome` é o que a criança lê. `truque` é a frase que ela vai reconhecer
   no cartão, na dica e no comentário de erro — sempre a mesma.
   `cota` é quantas questões dessa família entram no simulado de 15,
   espelhando a distribuição real de 2024+2025.                         */
var FAMILIAS = [
  {k:'ler',      nome:'Ler e entender',   cota:3, cor:'#f472b6',
   truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.'},
  {k:'letras',   nome:'Brincar com letras', cota:2, cor:'#a78bfa',
   truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.'},
  {k:'contar',   nome:'Contar com o dedo', cota:2, cor:'#38bdf8',
   truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.'},
  {k:'silabas',  nome:'Sílabas',          cota:2, cor:'#34d399',
   truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.'},
  {k:'buraco',   nome:'Frase com buraco', cota:2, cor:'#fbbf24',
   truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.'},
  {k:'intruso',  nome:'Intruso e troca-troca', cota:2, cor:'#fb923c',
   truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.'},
  {k:'alfabeto', nome:'Alfabeto e charada', cota:1, cor:'#60a5fa',
   truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.'},
  {k:'codigo',   nome:'Código e tabela',  cota:1, cor:'#c4b5fd',
   truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.'},
  {k:'placa',    nome:'Placas e desenhos', cota:0, cor:'#94a3b8',
   truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.'}
];

/* ---------- OS ITENS ----------
   Núcleo: 2025 · 1ª fase e 2024 · 1ª fase (as duas provas no formato
   vigente de 4 alternativas), verbatim. A 2025 Q4 (as quatro placas SÃO
   as alternativas, desenhadas) não vira item de simulado — vive só no
   cartão de truque, como regra dita em palavras.                       */
var ITENS = [

/* ===================== 2025 · 1ª FASE ===================== */

{id:'25F1Q1', eixo:'alfabeto', origem:'Olimpíada 2025 · 1ª fase · questão 1',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['ACHAM-ME PARECIDO COM UM ANZOL',
        'MAS SOU UMA LETRA MUITO ELEGANTE',
        'QUE MUITOS CONFUNDEM COM UMA OUTRA',
        'CUJO SOM PODE SER SEMELHANTE'],
 pede:'QUAL SERIA O MELHOR TÍTULO PARA ESSE POEMA?',
 opts:[
  {t:'LETRA J.', ok:1},
  {t:'LETRA P.', no:'O P também tem uma perninha, mas a curva dele é para cima, do lado da cabeça. Anzol curva para baixo.'},
  {t:'LETRA A.', no:'O A é a letra mais conhecida de todas, e por isso ela dá vontade de marcar. Mas o A não parece anzol e não se confunde com nenhuma outra no som.'},
  {t:'LETRA M.', no:'O M não parece anzol nem se confunde com outra letra no som. Essa dava para riscar logo de cara.'}
 ],
 dica:'Quem está falando no poema é uma letra. Ela dá duas pistas: a FORMA dela e o SOM dela.',
 truque:'Na charada, a letra fala dela mesma. Pense na forma dela e no som dela — e confira TODAS as pistas.',
 visual:'<div class="pcs"><span class="pc hit">parecido com anzol</span><span class="arw">&rarr;</span><span class="pc hit">J</span></div>'+
        '<div class="pcs"><span class="pc hit">confundem com outra no som</span><span class="arw">&rarr;</span><span class="pc hit">J e G</span></div>'+
        '<p class="vx">GELO come&ccedil;a com G e JEITO come&ccedil;a com J, mas as duas come&ccedil;am com o mesmo som.</p>',
 porque:'O J é a única letra parecida com um anzol: a haste desce e faz a curva embaixo. E o som do J se confunde com o do G — GELO e JEITO começam igual.',
 proximo:'Leia todas as pistas antes de marcar. Uma letra pode passar na primeira pista e cair na última.'},

{id:'25F1Q2', eixo:'buraco', origem:'Olimpíada 2025 · 1ª fase · questão 2',
 pede:'QUE PALAVRA COMPLETA A FRASE ABAIXO?',
 quadro:'EU VI MUITAS NUVENS NO C&Eacute;U. POUCO DEPOIS, COME&Ccedil;OU A CAIR UMA <span class="bl">_______</span> BEM FORTE!',
 opts:[
  {t:'LUA.', ok:0, no:'A lua fica no céu, é verdade. Mas lua não CAI, e ninguém diz "uma lua bem forte".'},
  {t:'ESTRELA.', no:'Estrela também fica no céu. Mas a frase diz que a coisa CAIU e era FORTE — isso não combina com estrela.'},
  {t:'CHUVA.', ok:1},
  {t:'BOLA.', no:'Bola cai mesmo, essa parte combina. Mas bola não tem nada a ver com as nuvens do começo da frase.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro do buraco. Duas pistas mandam: NUVENS e CAIR.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo. A pista mora do lado do buraco.',
 visual:'<p class="vx"><span class="mk">MUITAS NUVENS</span> ... <span class="mk">COME&Ccedil;OU A CAIR</span> ... <span class="mk">BEM FORTE</span></p>'+
        '<p class="vx">As tr&ecirc;s pistas t&ecirc;m de fechar ao mesmo tempo. S&oacute; a chuva fecha as tr&ecirc;s.</p>',
 porque:'Nuvem é o que faz cair chuva. E "bem forte" combina com chuva. As três pistas da frase fecham só com CHUVA.',
 proximo:'Antes de marcar, leia a frase inteira com a palavra dentro. Se alguma parte da frase brigar, é a errada.'},

{id:'25F1Q3', eixo:'silabas', origem:'Olimpíada 2025 · 1ª fase · questão 3',
 enun:'SE VOCÊ ME DER UM PÉ, UM TA E UM LA, EU DAREI A VOCÊ UMA PÉTALA. SE VOCÊ ME DER UM PO, UM RE E UM LHO, EU DAREI A VOCÊ UM REPOLHO.',
 pede:'AGORA, SE VOCÊ ME DER UM LA, UM CO E UM SA, O QUE EU DAREI A VOCÊ?',
 opts:[
  {t:'UM COLAR.', no:'COLAR usa o CO e o LA, mas deixa o SA parado e ainda precisa de um R que ninguém te deu.'},
  {t:'UMA SALADA.', no:'SALADA usa o SA e o LA, mas esquece o CO e ainda pede um DA que ninguém te deu. Cada peça vale uma vez, e só valem as peças que você recebeu.'},
  {t:'UM LAÇO.', no:'LAÇO gasta só duas peças e para. Sobrou o SA na mesa — quando sobra peça, a palavra está errada.'},
  {t:'UMA SACOLA.', ok:1}
 ],
 dica:'Os dois exemplos ensinam a regra: usar TODAS as peças, uma vez cada, e pode trocar a ordem.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">LA</span><span class="pc">CO</span><span class="pc">SA</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">SA</span><span class="pc hit">CO</span><span class="pc hit">LA</span></div>'+
        '<p class="vx">Tr&ecirc;s pe&ccedil;as dadas, tr&ecirc;s pe&ccedil;as usadas. Nada sobrou.</p>'+
        '<div class="pcs"><span class="pc hit">LA</span><span class="pc hit">CO</span><span class="pc bad">SA</span><span class="arw">&rarr;</span><span class="pc bad">LA&Ccedil;O sobrou o SA</span></div>',
 porque:'SA-CO-LA gasta as três peças, uma vez cada. É a mesma regra dos exemplos: PO+RE+LHO virou RE-PO-LHO, com a ordem trocada.',
 proximo:'Conte as peças que a prova deu e conte as peças da palavra que você escolheu. Os dois números têm de ser iguais.'},

{id:'25F1Q5', eixo:'alfabeto', origem:'Olimpíada 2025 · 1ª fase · questão 5',
 enun:'JOANA ESTAVA FAZENDO UMA LISTA DE ANIMAIS EM UMA ORDEM MISTERIOSA. CONFIRA OS ANIMAIS QUE ELA JÁ ANOTOU NO CADERNO:',
 quadro:'<span class="lst"><b>A</b>BELHA</span><span class="lst"><b>B</b>EIJA-FLOR</span><span class="lst"><b>C</b>AMALE&Atilde;O</span>'+
        '<span class="lst"><b>D</b>ONINHA</span><span class="lst"><b>E</b>LEFANTE</span><span class="lst vaz">_____________</span><span class="lst"><b>G</b>AIVOTA</span>',
 pede:'DE ACORDO COM A ORDEM MISTERIOSA, QUAL DOS ANIMAIS ABAIXO COMPLETA O ESPAÇO EM BRANCO NESSA LISTA?',
 opts:[
  {t:'IGUANA.', no:'IGUANA começa com I. O I vem depois do G, e o buraco fica ANTES da gaivota.'},
  {t:'FALCÃO.', ok:1},
  {t:'JACARÉ.', no:'JACARÉ começa com J, que vem bem depois do G. O buraco não é no fim da lista, é no meio.'},
  {t:'HIENA.', no:'HIENA é a pegadinha desta questão. O H vem depois do G — serve para CONTINUAR a lista, não para preencher o buraco que ficou no meio.'}
 ],
 dica:'Olhe só a primeira letra de cada animal, de cima para baixo. Que ordem é essa?',
 truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.',
 visual:'<div class="pcs"><span class="pc hit">A</span><span class="pc hit">B</span><span class="pc hit">C</span><span class="pc hit">D</span>'+
        '<span class="pc hit">E</span><span class="pc bad">?</span><span class="pc hit">G</span></div>'+
        '<p class="vx">Entre o <b>E</b> e o <b>G</b> falta o <b>F</b>. O animal tem de come&ccedil;ar com F: FALC&Atilde;O.</p>',
 porque:'A ordem misteriosa é o alfabeto: A, B, C, D, E, ?, G. Entre o E e o G falta o F — e o único animal com F é FALCÃO.',
 proximo:'Quando a lista tem um buraco no meio, olhe a letra de ANTES e a de DEPOIS do buraco. A resposta fica espremida entre as duas.'},

{id:'25F1Q6', eixo:'letras', origem:'Olimpíada 2025 · 1ª fase · questão 6',
 enun:'OLGA DECIDIU BRINCAR COM AS LETRAS DO SEU NOME, TROCANDO A POSIÇÃO DAS VOGAIS. ASSIM, "OLGA" VIROU "ALGO".',
 pede:'SE TROCARMOS AS VOGAIS DE LUGAR, QUAL DAS PALAVRAS ABAIXO SE TRANSFORMARÁ EM UMA PARTE DE UMA CAMISA?',
 opts:[
  {t:'GALO.', ok:1},
  {t:'GATO.', no:'GATO com as vogais trocadas vira GOTA. É palavra de verdade, mas gota é de água — não é parte de camisa. Formou palavra, só que não a que a pergunta pediu.'},
  {t:'GELO.', no:'GELO com as vogais trocadas vira GOLE. Também é palavra de verdade, e também não tem nada a ver com camisa.'},
  {t:'GIRA.', no:'GIRA com as vogais trocadas vira GARI, que é a pessoa que limpa a rua. É gente, não é roupa.'}
 ],
 dica:'Vogal é A, E, I, O, U. Só as vogais mudam de lugar; as outras letras ficam paradas.',
 truque:'Só as vogais mudam de lugar. As outras letras ficam paradas.',
 visual:'<div class="pcs"><span class="pc hit">O</span><span class="pc">L</span><span class="pc">G</span><span class="pc hit">A</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">A</span><span class="pc">L</span><span class="pc">G</span><span class="pc hit">O</span></div>'+
        '<p class="vx">No exemplo da prova, o <b>O</b> e o <b>A</b> trocaram. O L e o G n&atilde;o sa&iacute;ram do lugar.</p>'+
        '<div class="pcs"><span class="pc">G</span><span class="pc hit">A</span><span class="pc">L</span><span class="pc hit">O</span>'+
        '<span class="arw">&rarr;</span><span class="pc">G</span><span class="pc hit">O</span><span class="pc">L</span><span class="pc hit">A</span></div>'+
        '<p class="vx">GOLA &eacute; a parte da camisa que fica no pesco&ccedil;o.</p>',
 porque:'Em GALO as vogais são o A e o O. Trocando as duas de lugar: G-O-L-A. A gola é a parte da camisa que fica no pescoço.',
 proximo:'Troque as duas vogais de lugar em CADA uma das quatro palavras e leia o que saiu. Só depois pergunte: é isso que a pergunta pediu?'},

{id:'25F1Q7', eixo:'contar', origem:'Olimpíada 2025 · 1ª fase · questão 7',
 enun:'A FLORESTA ESTAVA EM FESTA! TODOS OS BICHOS DANÇAVAM, CANTAVAM E SE DIVERTIAM. A SÁBIA CORUJA ERA A MAIS ANIMADA, E TODOS QUERIAM DANÇAR COM ELA. MAS, PARA ESCOLHER SEUS PARES, A CORUJA PROPÔS UMA REGRA:',
 quadro:'&mdash; S&Oacute; VOU DAN&Ccedil;AR COM QUEM TIVER UM NOME QUE USE UMA &Uacute;NICA VOGAL, MESMO QUE ELA APARE&Ccedil;A V&Aacute;RIAS VEZES!'+
        '<div class="sep"></div>JACAR&Eacute; &ndash; LAGARTA &ndash; MACACO &ndash; TAMANDU&Aacute; &ndash; CAPIVARA &ndash; URUBU &ndash; ARARA',
 pede:'MARQUE A ALTERNATIVA QUE MOSTRA APENAS OS ANIMAIS QUE PODERÃO DANÇAR COM A CORUJA:',
 opts:[
  {t:'JACARÉ, LAGARTA E MACACO.', no:'JACARÉ tem A e tem E, já são duas vogais diferentes. E MACACO parece só de A, mas o último pedaço é CO: tem um O escondido no fim.'},
  {t:'TAMANDUÁ, CAPIVARA E URUBU.', no:'URUBU está certo, só tem U. Mas TAMANDUÁ tem um U no meio e CAPIVARA tem um I no meio — dois nomes com vogal escondida.'},
  {t:'ARARA, LAGARTA E URUBU.', ok:1},
  {t:'MACACO, ARARA E CAPIVARA.', no:'ARARA está certo. Mas MACACO tem o O do fim e CAPIVARA tem o I do meio. Basta um deles estar errado para a alternativa inteira cair.'}
 ],
 dica:'Vogal é A, E, I, O, U. Ponha um pontinho embaixo de cada vogal do nome, uma por uma, até o fim da palavra.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">A R A R A</span><span class="pc hit">L A G A R T A</span><span class="pc hit">U R U B U</span></div>'+
        '<p class="vx">ARARA: s&oacute; A. LAGARTA: s&oacute; A. URUBU: s&oacute; U.</p>'+
        '<div class="pcs"><span class="pc bad">MACAC<b>O</b></span><span class="pc bad">CAP<b>I</b>VARA</span><span class="pc bad">TAMAND<b>U</b>&Aacute;</span><span class="pc bad">JACAR<b>É</b></span></div>'+
        '<p class="vx">Nesses, a vogal diferente est&aacute; escondida no meio ou no fim. &Eacute; onde o dedo costuma passar batido.</p>',
 porque:'ARARA só tem A, LAGARTA só tem A e URUBU só tem U. Nos outros nomes aparece uma segunda vogal escondida: o O de MACACO, o I de CAPIVARA, o U de TAMANDUÁ.',
 proximo:'Vá até o FIM da palavra com o dedo. A vogal que estraga costuma estar no último pedaço, onde a gente para de conferir.'},

{id:'25F1Q8', eixo:'intruso', origem:'Olimpíada 2025 · 1ª fase · questão 8',
 enun:'NO OUTRO LADO DA FLORESTA, ALGUNS ANIMAIS TENTAVAM ADIVINHAR UMA PALAVRA SECRETA. O SENHOR MACACO RESOLVEU DAR UMA FORCINHA E SOLTOU AS SEGUINTES DICAS:',
 quadro:'A PALAVRA TEM MAIS DE DUAS S&Iacute;LABAS.<div class="sep"></div>TEM A LETRA C.<div class="sep"></div>&Eacute; UMA COMIDA.<div class="sep"></div>N&Atilde;O &Eacute; UMA FRUTA.',
 pede:'QUAL É A PALAVRA SECRETA?',
 opts:[
  {t:'BOLO.', no:'BOLO é comida e não é fruta, mas bate palma: BO-LO, só dois pedaços. E não tem nenhum C. Falha em duas pistas.'},
  {t:'ABACATE.', no:'ABACATE passa em três pistas: tem mais de duas sílabas, tem C e é comida. Ele cai só na ÚLTIMA pista — abacate é fruta. É a pegadinha para quem para antes do fim.'},
  {t:'CARNE.', no:'CARNE tem C, é comida e não é fruta. Mas bate palma: CAR-NE, só dois pedaços. Cai na primeira pista.'},
  {t:'MACARRÃO.', ok:1}
 ],
 dica:'São quatro pistas. Uma pista de cada vez: a cada pista, risque quem não passa. Quem sobrar no fim é a resposta.',
 truque:'Uma pista de cada vez. A cada pista, risque quem não passa. Quem sobrar é a resposta.',
 visual:'<div class="pcs"><span class="pc">MA</span><span class="pc">CAR</span><span class="pc">R&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">3 peda&ccedil;os</span></div>'+
        '<p class="vx">tem C <b>sim</b> &middot; &eacute; comida <b>sim</b> &middot; &eacute; fruta <b>n&atilde;o</b> &mdash; passou nas quatro.</p>'+
        '<p class="vx"><span class="dm">ABACATE passou em tr&ecirc;s pistas e caiu na quarta.</span></p>',
 porque:'MACARRÃO passa nas quatro pistas ao mesmo tempo: MA-CAR-RÃO tem três pedaços, tem C, é comida e não é fruta.',
 proximo:'Quando a questão dá várias pistas, confira TODAS antes de marcar. A alternativa errada costuma passar em quase todas e cair na última.'},

{id:'25F1Q9', eixo:'contar', origem:'Olimpíada 2025 · 1ª fase · questão 9',
 enun:'VEJA COMO A LETRA X É INTERESSANTE! EM CADA UMA DAS PALAVRAS A SEGUIR, ELA TEM UM SOM DIFERENTE:',
 quadro:'CAIXA &ndash; T&Aacute;XI &ndash; EXAME &ndash; PR&Oacute;XIMO',
 pede:'ENTRE AS LETRAS ABAIXO, QUAL É A ÚNICA QUE NÃO MUDA DE SOM NAS DUAS PALAVRAS INDICADAS?',
 opts:[
  {t:'LETRA C: CASA, CEGONHA.', no:'Fale as duas em voz alta: CASA faz som de K, CEGONHA faz som de S. A mesma letra, dois sons.'},
  {t:'LETRA B: BALA, ABACAXI.', ok:1},
  {t:'LETRA G: GELEIA, AGASALHO.', no:'Fale em voz alta: GELEIA soa como se fosse J, AGASALHO tem o G duro. Dois sons diferentes.'},
  {t:'LETRA S: SÁBIO, CASA.', no:'Essa é a mais escondida. SÁBIO tem som de S, mas o S de CASA, espremido entre duas vogais, soa como Z.'}
 ],
 dica:'Aqui não adianta olhar: fale as palavras em voz alta, baixinho, e escute a letra.',
 truque:'Quando a pergunta fala de SOM, fale as palavras em voz alta e escute. Olhar não resolve.',
 visual:'<div class="pcs"><span class="pc hit">BALA</span><span class="pc hit">ABACAXI</span><span class="arw">&rarr;</span><span class="pc hit">mesmo som</span></div>'+
        '<div class="pcs"><span class="pc bad">CASA</span><span class="pc bad">CEGONHA</span><span class="arw">&rarr;</span><span class="pc bad">K e S</span></div>'+
        '<div class="pcs"><span class="pc bad">GELEIA</span><span class="pc bad">AGASALHO</span><span class="arw">&rarr;</span><span class="pc bad">J e G</span></div>'+
        '<div class="pcs"><span class="pc bad">S&Aacute;BIO</span><span class="pc bad">CASA</span><span class="arw">&rarr;</span><span class="pc bad">S e Z</span></div>',
 porque:'O B faz o mesmo som em BALA e em ABACAXI. Nas outras três, a mesma letra muda de som de uma palavra para a outra.',
 proximo:'Pergunta sobre SOM se resolve com a boca, não com o olho. Fale as duas palavras baixinho e compare.'},

{id:'25F1Q10', eixo:'intruso', origem:'Olimpíada 2025 · 1ª fase · questão 10',
 enun:'JÉSSICA ESTAVA AJUDANDO SUA MÃE A FAZER A LISTA DE COMPRAS DA FRUTARIA. A MENINA ANOTAVA TUDO O QUE A MAMÃE DIZIA, MAS, EM UM MOMENTO, ELA SE CONFUNDIU E ESCREVEU UMA PALAVRA ESTRANHA NA LISTA.',
 pede:'QUAL É ESSA PALAVRA?',
 opts:[
  {t:'ABACAXI.', no:'Abacaxi é fruta, e numa lista de frutaria ele está no lugar certo.'},
  {t:'ACEROLA.', no:'Acerola é uma fruta pequena e vermelha, azedinha. Se você não conhecia, dava para achar que era a estranha — mas ela é fruta e pertence à lista.'},
  {t:'ALICATE.', ok:1},
  {t:'AMEIXA.', no:'Ameixa é fruta, roxinha por fora. Também está no lugar certo na lista da frutaria.'}
 ],
 dica:'As quatro começam com A e têm um som parecido: por aí não dá para decidir. Pense no que cada palavra SIGNIFICA.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">ABACAXI</span><span class="pc hit">ACEROLA</span><span class="pc hit">AMEIXA</span><span class="arw">&rarr;</span><span class="pc hit">frutas</span></div>'+
        '<div class="pcs"><span class="pc bad">ALICATE</span><span class="arw">&rarr;</span><span class="pc bad">ferramenta</span></div>'+
        '<p class="vx">Alicate &eacute; a ferramenta que aperta e corta arame. N&atilde;o se compra na frutaria.</p>',
 porque:'Três das quatro são frutas. ALICATE é uma ferramenta — não tem o que fazer numa lista de frutaria.',
 proximo:'Quando as palavras são parecidas no som, o som é a armadilha. Pergunte o que cada uma É, e ache a que não pertence ao grupo.'},

{id:'25F1Q11', eixo:'letras', origem:'Olimpíada 2025 · 1ª fase · questão 11',
 enun:'A PROFESSORA PREPAROU UM DIVERTIDO CAMINHO DE LETRAS. OS ALUNOS DEVERIAM PEGAR TODAS AS LETRAS ESPALHADAS PELO PERCURSO E DIZER O NOME DO ANIMAL FORMADO POR ELAS. A TURMA RECOLHEU TUDO:',
 quadro:'O &ndash; F &ndash; H &ndash; L &ndash; N &ndash; O &ndash; I &ndash; G',
 pede:'MARQUE O NOME DO ANIMAL QUE É POSSÍVEL FORMAR COM ESSAS LETRAS:',
 opts:[
  {t:'GAFANHOTO.', no:'GAFANHOTO precisa de dois A, e não tem nenhum A no caminho. Ele ainda pede um T, que também não foi dado. Tem G, F e H iguais aos do caminho — é por isso que engana.'},
  {t:'GOLFINHO.', ok:1},
  {t:'FLAMINGO.', no:'FLAMINGO precisa de um A e de um M, e nenhum dos dois está no caminho.'},
  {t:'GALINHO.', no:'GALINHO precisa de um A, que não existe no caminho. E ainda sobrariam letras sem uso: o F e um dos O.'}
 ],
 dica:'Conte quantas letras o caminho deu. A palavra certa usa exatamente essas, nem mais nem menos. Repare que tem DOIS O.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="pc">F</span><span class="pc">H</span><span class="pc">L</span><span class="pc">N</span><span class="pc">O</span><span class="pc">I</span><span class="pc">G</span><span class="arw">&rarr;</span><span class="pc hit">8 letras</span></div>'+
        '<div class="pcs"><span class="pc hit">G</span><span class="pc hit">O</span><span class="pc hit">L</span><span class="pc hit">F</span><span class="pc hit">I</span><span class="pc hit">N</span><span class="pc hit">H</span><span class="pc hit">O</span></div>'+
        '<p class="vx">GOLFINHO gasta as oito, inclusive os <b>dois O</b>. Nada sobrou, nada faltou.</p>'+
        '<div class="pcs"><span class="pc bad">G<b>A</b>FANHOTO</span><span class="pc bad">FL<b>A</b>MINGO</span><span class="pc bad">G<b>A</b>LINHO</span></div>'+
        '<p class="vx">As tr&ecirc;s erradas pedem um <b>A</b>. N&atilde;o havia nenhum A no caminho.</p>',
 porque:'GOLFINHO usa exatamente as oito letras do caminho, contando os dois O. As outras três precisam de um A, que não foi dado.',
 proximo:'Escreva a palavra e risque uma letra do caminho para cada letra dela. Se faltar ou sobrar, essa não é.'},

{id:'25F1Q12', eixo:'letras', origem:'Olimpíada 2025 · 1ª fase · questão 12',
 enun:'A FRASE ABAIXO ESTÁ UM POUCO ESTRANHA, MAS, MUDANDO UMA LETRA DE LUGAR, CONSEGUIMOS CONSERTÁ-LA.',
 quadro:'O GALHO SUBIU NO GALO DA &Aacute;RVORE E COME&Ccedil;OU A CANTAR.',
 pede:'QUAL É ESSA LETRA?',
 opts:[
  {t:'B.', no:'Não existe nenhum B nas duas palavras trocadas. Essa dava para riscar de cara.'},
  {t:'H.', ok:1},
  {t:'M.', no:'Não existe nenhum M nas duas palavras trocadas. Essa também dava para riscar de cara.'},
  {t:'P.', no:'Não existe nenhum P nas duas palavras trocadas. Essa também dava para riscar de cara.'}
 ],
 dica:'Primeiro descubra por que a frase está esquisita. Depois repare: a pergunta não pede a PALAVRA, pede a LETRA.',
 truque:'Ache a palavra esquisita, tire UMA letra dela e dê para a outra. E confira o que a pergunta pediu: palavra ou letra?',
 visual:'<p class="vx">GAL<b class="mk">H</b>O subiu e cantou? Galho n&atilde;o canta. Quem canta &eacute; o galo.</p>'+
        '<div class="pcs"><span class="pc bad">GAL<b>H</b>O</span><span class="pc bad">GALO</span><span class="arw">&rarr;</span><span class="pc hit">GALO</span><span class="pc hit">GAL<b>H</b>O</span></div>'+
        '<p class="vx">O <b>H</b> saiu de uma palavra e entrou na outra. Foi uma letra s&oacute; que andou: o <b>H</b>.</p>',
 porque:'A frase certa é "O GALO SUBIU NO GALHO". Para consertar, basta o H sair de GALHO e entrar em GALO. A letra que mudou de lugar é o H.',
 proximo:'Depois de consertar a frase na cabeça, volte e leia a pergunta de novo. Às vezes ela pede a LETRA, e não a palavra.'},

{id:'25F1Q13', eixo:'ler', origem:'Olimpíada 2025 · 1ª fase · questão 13',
 enun:'LEIA O POEMA PONTINHO DE VISTA, DE PEDRO BANDEIRA:',
 texto:['EU SOU PEQUENO, ME DIZEM,','E EU FICO MUITO ZANGADO.','TENHO DE OLHAR TODO MUNDO','COM O QUEIXO LEVANTADO.',
        'MAS, SE FORMIGA FALASSE','E ME VISSE LÁ DO CHÃO,','IA DIZER, COM CERTEZA:','— MINHA NOSSA, QUE GRANDÃO!'],
 pede:'POR QUE O MENINO DO POEMA PRECISA OLHAR TODO MUNDO COM O QUEIXO LEVANTADO?',
 opts:[
  {t:'PORQUE ELE QUER PARECER AINDA MAIOR DO QUE É.', no:'O poema não diz que ele quer parecer maior. Diz que ele TEM DE olhar assim — e quem tem de fazer uma coisa não está escolhendo fazer.'},
  {t:'PORQUE AS PESSOAS SÃO MAIS ALTAS DO QUE ELE; ENTÃO, PRECISA OLHAR PARA CIMA PARA VÊ-LAS.', ok:1},
  {t:'PORQUE ELE GOSTA DE ERGUER A CABEÇA.', no:'O poema diz TENHO DE, que é obrigação. Não diz que ele gosta.'},
  {t:'PORQUE ELE ESTÁ COM MEDO DA FORMIGA, QUE É MUITO GRANDE.', no:'A formiga aparece só no fim, e ela é pequena, não grande. Quem acha o menino GRANDÃO é ela. A resposta do POR QUE estava lá em cima, na primeira linha.'}
 ],
 dica:'A pergunta tem POR QUE. Volte com a régua para o começo e ache a linha que explica.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[0,2,3],
 visual:'<p class="vx"><b class="mk">EU SOU PEQUENO</b>, e por isso <b class="mk">TENHO DE OLHAR TODO MUNDO COM O QUEIXO LEVANTADO</b>.</p>'+
        '<p class="vx">Quem &eacute; pequeno olha para cima para ver os outros. As duas linhas juntas d&atilde;o a resposta.</p>',
 porque:'O poema diz "EU SOU PEQUENO" e logo depois "TENHO DE OLHAR TODO MUNDO COM O QUEIXO LEVANTADO". Ele levanta o queixo porque é pequeno e os outros são mais altos.',
 proximo:'Se a pergunta começa com POR QUE, volte ao começo do texto com a régua e desça linha por linha até achar a frase que explica. Marque só depois de achar.'},

{id:'25F1Q14', eixo:'ler', origem:'Olimpíada 2025 · 1ª fase · questão 14',
 enun:'LEIA O POEMA ABAIXO, DE LEONARDO GONÇALVES FISCHER.',
 texto:['UMA VEZ O JOÃOZINHO,','UM MENINO MUITO ARTEIRO,','NO SALEIRO PÔS AÇÚCAR','E PÔS SAL NO AÇUCAREIRO.',
        'DONA CÉLIA, SEM SABER','O QUE FEZ O JOÃOZINHO,','LEVANTOU DE MANHÃ CEDO','E SALGOU SEU CAFEZINHO.',
        'SÓ NO ALMOÇO DONA CÉLIA','PERCEBEU ALGO DE ERRADO:','O FEIJÃO QUE ELA COMEU','_______________________'],
 pede:'MARQUE O VERSO QUE MELHOR COMBINA COM O FINAL DA HISTÓRIA.',
 opts:[
  {t:'TINHA UM GOSTO ADOCICADO.', ok:1},
  {t:'ESTAVA MUITO APIMENTADO.', no:'APIMENTADO rima com ERRADO, e é por isso que atrai. Mas ninguém pôs pimenta em lugar nenhum na história.'},
  {t:'TINHA UM SABOR BEM SALGADO.', no:'Essa é a pegadinha. Salgado foi o CAFÉ, no começo do poema. O feijão ela temperou com o saleiro — e o saleiro está cheio de açúcar.'},
  {t:'ESTAVA AZEDO E GELADO.', no:'Rimar com ERRADO ela rima, mas nada no poema fala de azedo nem de gelado. Aqui a rima não decide nada: as quatro rimam. Quem decide é o que estava dentro do pote.'}
 ],
 dica:'Segure a troca na cabeça: o saleiro tem açúcar e o açucareiro tem sal. Agora, o que ela pôs no feijão?',
 truque:'Quando a história troca duas coisas, escreva a troca antes de responder. Depois aplique na cena nova.',
 acende:[2,3,10],
 visual:'<div class="pcs"><span class="pc bad">SALEIRO</span><span class="arw">&rarr;</span><span class="pc hit">tem A&Ccedil;&Uacute;CAR</span></div>'+
        '<div class="pcs"><span class="pc bad">A&Ccedil;UCAREIRO</span><span class="arw">&rarr;</span><span class="pc hit">tem SAL</span></div>'+
        '<p class="vx">No feij&atilde;o ela usou o <b>saleiro</b>. E o saleiro est&aacute; cheio de a&ccedil;&uacute;car: o feij&atilde;o ficou <b>doce</b>.</p>'+
        '<p class="vx"><span class="dm">Aqui a rima n&atilde;o ajuda a escolher: ADOCICADO, APIMENTADO, SALGADO e GELADO rimam todas com ERRADO. Quem decide &eacute; o pote.</span></p>',
 porque:'O Joãozinho trocou os potes: o saleiro ficou com açúcar. No almoço, Dona Célia temperou o feijão com o saleiro — ou seja, com açúcar. O feijão ficou adocicado.',
 proximo:'Quando a história troca duas coisas de lugar, anote a troca antes de olhar as alternativas. Depois é só aplicar na cena nova.'},

{id:'25F1Q15', eixo:'codigo', origem:'Olimpíada 2025 · 1ª fase · questão 15',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO CORRESPONDE A UMA SÍLABA.',
 /* A tabela fica EMBARALHADA, como na prova (lá a ordem das colunas é
    NHA·SÓ·MAL·DO·TES·A·PA·QUE·AN·COM). Numa versão anterior as colunas
    estavam na ordem da frase, e bastava ler a linha de baixo da esquerda
    para a direita para ter a resposta sem olhar um único símbolo — o item
    deixava de treinar exatamente o que o truque promete. */
 quadro:'<table class="tbc"><tr><td>&#10022;</td><td>&#9650;</td><td>&#9733;</td><td>&#9660;</td><td>&#9679;</td><td>&#9829;</td><td>&#9834;</td><td>&#9670;</td><td>&#9632;</td><td>&#9788;</td></tr>'+
        '<tr><td>NHA</td><td>S&Oacute;</td><td>MAL</td><td>DO</td><td>TES</td><td>A</td><td>PA</td><td>QUE</td><td>AN</td><td>COM</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9632; &#9679; &#9650; &#9660; &#9670; &#9733; &#9829; &#9788; &#9834; &#10022; &#9660;</div>',
 nota:'Na prova os símbolos são outros desenhinhos. A tabela está embaralhada igual à da prova: é preciso caçar cada símbolo, um por um. A última sílaba (DO) se repete no fim, também igual à prova.',
 pede:'ESSA SEQUÊNCIA ESCONDE UMA FRASE. JUNTE AS SÍLABAS NA ORDEM CORRETA E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'ANTES DO QUE MAL APANHADO.', no:'Essa pulou o símbolo do SÓ e comeu sílabas no fim. Quem pula um símbolo no meio perde a frase inteira.'},
  {t:'ANTES SÓ DO QUE MAL COMPREENDIDO.', no:'O começo está certinho, mas o fim não. Quem reconhece o ditado no meio do caminho e completa de memória cai aqui: os últimos símbolos dizem outra coisa.'},
  {t:'ANDO SÓ COM MAL ENTENDIDO.', no:'Essa nem o começo respeita. O primeiro símbolo é AN e o segundo é TES: ANTES, não ANDO.'},
  {t:'ANTES SÓ DO QUE MAL ACOMPANHADO.', ok:1}
 ],
 dica:'Um símbolo de cada vez, sem pular nenhum. Escreva a sílaba embaixo de cada um e só junte tudo no fim.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">AN</span><span class="pc hit">TES</span><span class="pc hit">S&Oacute;</span><span class="pc hit">DO</span><span class="pc hit">QUE</span><span class="pc hit">MAL</span></div>'+
        '<div class="pcs"><span class="pc hit">A</span><span class="pc hit">COM</span><span class="pc hit">PA</span><span class="pc hit">NHA</span><span class="pc hit">DO</span></div>'+
        '<p class="vx">Os cinco &uacute;ltimos s&iacute;mbolos formam <b>uma palavra s&oacute;</b>: A-COM-PA-NHA-DO. &Eacute; a parte em que todo mundo se perde.</p>',
 porque:'Decodificando símbolo por símbolo, sem pular nenhum, sai ANTES SÓ DO QUE MAL ACOMPANHADO. Os cinco últimos símbolos formam uma palavra só.',
 proximo:'Nunca adivinhe o fim de um código porque reconheceu o começo. Vá até o último símbolo com o dedo.'},

/* ===================== 2024 · 1ª FASE ===================== */

{id:'24F1Q1', eixo:'alfabeto', origem:'Olimpíada 2024 · 1ª fase · questão 1',
 pede:'EM QUAL DAS PALAVRAS ABAIXO AS LETRAS ESTÃO EM ORDEM ALFABÉTICA?',
 opts:[
  {t:'BATATA.', no:'BATATA começa com B e a segunda letra já é A, que vem antes. Voltou logo no segundo passo.'},
  {t:'ALMA.', no:'ALMA é a pegadinha: A, L, M vão andando bonito para a frente... e aí a última letra volta para o A. Quem para de conferir antes do fim marca esta.'},
  {t:'AMOR.', ok:1},
  {t:'CINTO.', no:'CINTO parece arrumada porque não repete letra nenhuma. Mas C, I, N, T vão para a frente e o O volta: o O vem antes do T no alfabeto.'}
 ],
 dica:'Olhe as letras DENTRO da palavra, uma de cada vez. Cante o alfabeto e veja se cada letra vem depois da anterior.',
 truque:'Cante o alfabeto com o dedo andando. Cada letra tem de vir DEPOIS da anterior, até o fim da palavra.',
 visual:'<div class="pcs"><span class="pc hit">A</span><span class="arw">&rarr;</span><span class="pc hit">M</span><span class="arw">&rarr;</span><span class="pc hit">O</span><span class="arw">&rarr;</span><span class="pc hit">R</span></div>'+
        '<p class="vx">Em AMOR o dedo s&oacute; anda para a frente: A, M, O, R.</p>'+
        '<div class="pcs"><span class="pc hit">A</span><span class="arw">&rarr;</span><span class="pc hit">L</span><span class="arw">&rarr;</span><span class="pc hit">M</span><span class="arw">&rarr;</span><span class="pc bad">A</span></div>'+
        '<p class="vx">Em ALMA ele anda tr&ecirc;s vezes e <b>volta</b> na &uacute;ltima letra.</p>',
 porque:'Em AMOR as letras só avançam no alfabeto: A, depois M, depois O, depois R. Nenhuma volta para trás.',
 proximo:'Confira até a ÚLTIMA letra da palavra. A pegadinha costuma estar bem no fim, depois de tudo ter dado certo.'},

{id:'24F1Q2', eixo:'buraco', origem:'Olimpíada 2024 · 1ª fase · questão 2',
 pede:'QUE PALAVRA PREENCHE CORRETAMENTE A LACUNA NO TEXTO ABAIXO?',
 quadro:'EU ESTAVA NA JANELA DA MINHA CASA QUANDO VI UM CACHORRO CORRENDO ATR&Aacute;S DE <span class="bl">_____</span> CICLISTA NA RUA.',
 opts:[
  {t:'UM', ok:1},
  {t:'ALGUNS', no:'ALGUNS é de mais de um. Leia a frase inteira: "atrás de alguns ciclista" — a frase tropeça. Seria "alguns ciclistas".'},
  {t:'OS', no:'OS também é de mais de um. "Atrás de os ciclista" não é jeito de falar nem de escrever.'},
  {t:'AS', no:'AS é de mais de um e ainda é de menina. "Atrás de as ciclista" tropeça duas vezes.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. Repare: é UM ciclista só ou vários?',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">atr&aacute;s de <b class="mk">UM</b> CICLISTA <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><span class="dm">atr&aacute;s de</span> <b class="bad2">ALGUNS</b> <span class="dm">CICLISTA &mdash; a frase tropeça</span></p>'+
        '<p class="vx">CICLISTA est&aacute; sozinho, sem o S do fim. Ent&atilde;o a palavrinha da frente tamb&eacute;m tem de ser de um s&oacute;.</p>',
 porque:'CICLISTA está no singular, é um só. Então a palavrinha da frente também tem de ser de um só: UM ciclista.',
 proximo:'Repare se a palavra depois do buraco tem S no fim. Uma coisa só pede UM; várias coisas pedem OS ou ALGUNS.'},

{id:'24F1Q3', eixo:'letras', origem:'Olimpíada 2024 · 1ª fase · questão 3',
 enun:'ENTRE OUTRAS COISAS, USAMOS O OBJETO ABAIXO PARA GELAR BEBIDAS: O GELO.',
 nota:'Na prova aparece o desenho de um cubo de gelo derretendo, e é a criança que descobre o nome. Aqui o nome vem escrito.',
 pede:'SE TROCARMOS DE LUGAR AS VOGAIS DO NOME DESSE OBJETO, QUE PALAVRA TEREMOS?',
 opts:[
  {t:'LEGO', no:'LEGO usa as mesmas quatro letras de GELO, mas embaralhou tudo. A pergunta manda trocar SÓ as vogais e deixar as outras letras paradas.'},
  {t:'GOTA', no:'GOTA veio do desenho do gelo derretendo, não das letras. Ela até tem o G e o O, mas pede um T e um A que não existem em GELO.'},
  {t:'GOLE', ok:1},
  {t:'ÁGUA', no:'ÁGUA é o que o gelo vira quando derrete, mas a pergunta não é sobre derreter: é sobre trocar as vogais de lugar.'}
 ],
 dica:'As vogais de GELO são o E e o O. Troque as duas de lugar e deixe o G e o L parados.',
 truque:'Só as vogais mudam de lugar. As outras letras ficam paradas.',
 visual:'<div class="pcs"><span class="pc">G</span><span class="pc hit">E</span><span class="pc">L</span><span class="pc hit">O</span>'+
        '<span class="arw">&rarr;</span><span class="pc">G</span><span class="pc hit">O</span><span class="pc">L</span><span class="pc hit">E</span></div>'+
        '<p class="vx">O <b>E</b> e o <b>O</b> trocaram de lugar. O G e o L ficaram parados: GOLE.</p>',
 porque:'GELO tem as vogais E e O. Trocando as duas de lugar, com o G e o L parados: G-O-L-E, que é GOLE.',
 proximo:'Marque as vogais da palavra primeiro. Depois troque só elas e leia o que sobrou.'},

{id:'24F1Q4', eixo:'contar', origem:'Olimpíada 2024 · 1ª fase · questão 4',
 pede:'QUAL FRASE ABAIXO TEM MAIS CONSOANTES DO QUE VOGAIS?',
 opts:[
  {t:'JOÃO SAIU PASSEAR NO SÁBADO.', no:'Essa frase está cheia de vogais grudadas: JO-ÃO, SA-IU. Todo lugar em que duas vogais se encontram derruba a conta das consoantes.'},
  {t:'MARIA OUVIU UM SABIÁ CANTAR.', no:'MARIA, OUVIU e SABIÁ são palavras carregadas de vogais. Não sobra consoante suficiente.'},
  {t:'MEU PRIMO TRABALHA COM TRANSPORTES.', ok:1},
  {t:'PAULO VIAJOU COM A FAMÍLIA NO FERIADO.', no:'É a frase mais comprida das quatro, e por isso parece a resposta. Mas comprida não quer dizer cheia de consoantes: PAULO, VIAJOU, FAMÍLIA e FERIADO têm vogal atrás de vogal.'}
 ],
 dica:'Vogal é A, E, I, O, U — todo o resto é consoante. Ponha um pontinho embaixo de cada vogal e conte no fim.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">PR</span><span class="pc hit">TR</span><span class="pc hit">LH</span><span class="pc hit">NSP</span><span class="pc hit">RT</span></div>'+
        '<p class="vx">Em <b>PRIMO, TRABALHA, TRANSPORTES</b> as consoantes andam grudadas, duas e tr&ecirc;s de cada vez. &Eacute; o sinal de que ali tem mais consoante que vogal.</p>'+
        '<div class="pcs"><span class="pc bad">JO&Atilde;O</span><span class="pc bad">SAIU</span><span class="pc bad">OUVIU</span><span class="pc bad">PAULO</span></div>'+
        '<p class="vx">Nessas, as vogais &eacute; que andam grudadas.</p>',
 porque:'Em MEU PRIMO TRABALHA COM TRANSPORTES as consoantes vêm grudadas: PR, TR, LH, NSP, RT. Nas outras frases são as vogais que vêm grudadas.',
 proximo:'Não escolha pela frase mais comprida. Procure onde as consoantes estão grudadas umas nas outras — é ali que elas ganham das vogais.'},

{id:'24F1Q5', eixo:'alfabeto', origem:'Olimpíada 2024 · 1ª fase · questão 5',
 enun:'QUEM SOU EU?',
 texto:['ESTOU PRESENTE NA COR DO CÉU,','NO SOM DA ABELHA QUE FAZ O MEL,','NA FALTA DE SORTE, ESTOU CORRETO.','MORO NO FINAL DO ALFABETO.'],
 pede:'QUAL É A LETRA?',
 opts:[
  {t:'A LETRA S.', no:'O S pode lembrar o chiado da abelha e aparece em SORTE, mas não está em AZUL e não mora no final do alfabeto.'},
  {t:'A LETRA L.', no:'O L está em AZUL e em MEL, mas não é o som da abelha e não mora no final do alfabeto.'},
  {t:'A LETRA A.', no:'Essa é a pegadinha grande: o A está em AZUL, em ABELHA e em AZAR — passa em três pistas das quatro! Mas o A é a PRIMEIRA letra do alfabeto, e a última pista pede a do final.'},
  {t:'A LETRA Z.', ok:1}
 ],
 dica:'Cada linha é uma pista para a MESMA letra. Transforme cada pista numa palavra e veja que letra aparece nas quatro.',
 truque:'Na charada, cada linha é uma pista da mesma letra. Confira as quatro antes de marcar.',
 visual:'<div class="pcs"><span class="pc hit">cor do c&eacute;u = A<b>Z</b>UL</span><span class="pc hit">som da abelha = <b>ZZZ</b></span></div>'+
        '<div class="pcs"><span class="pc hit">falta de sorte = A<b>Z</b>AR</span><span class="pc hit">final do alfabeto = <b>Z</b></span></div>'+
        '<p class="vx">O <b>A</b> passava em tr&ecirc;s pistas e caiu na quarta. O <b>Z</b> passa nas quatro.</p>',
 porque:'Cor do céu é aZul, o som da abelha é zzz, falta de sorte é aZar, e o Z é a última letra do alfabeto. As quatro pistas fecham no Z.',
 proximo:'Numa charada, teste a sua resposta em TODAS as pistas. A alternativa errada costuma passar em quase todas e cair na última.'},

{id:'24F1Q6', eixo:'buraco', origem:'Olimpíada 2024 · 1ª fase · questão 6',
 pede:'QUAL É A CONTINUAÇÃO QUE MAIS COMBINA COM O TRECHO ABAIXO?',
 quadro:'JO&Atilde;O ABRIU UM LIVRO, MAS N&Atilde;O EST&Aacute; CONSEGUINDO LER, PORQUE <span class="bl">___________</span>',
 opts:[
  {t:'A GRAMA É VERDE.', no:'A grama ser verde não impede ninguém de ler. Essa não tem nada a ver com a primeira parte da frase.'},
  {t:'COMERÁ MACARRÃO NO DIA SEGUINTE.', no:'Comer macarrão amanhã não impede de ler hoje. A segunda parte tem de EXPLICAR a primeira.'},
  {t:'NÃO SE LEMBROU DE COLOCAR OS SEUS ÓCULOS.', ok:1},
  {t:'SE ESQUECEU DE COMO CONTAR ATÉ DEZ.', no:'Essa engana porque também fala de esquecer, igual à certa. Mas contar é com número; ler é com letra. Esquecer de contar não impede de ler.'}
 ],
 dica:'A palavra PORQUE pede uma causa. Teste cada opção assim: "isso impede alguém de ler?"',
 truque:'Depois de PORQUE vem a explicação. Pergunte: isso explica mesmo a primeira parte?',
 visual:'<p class="vx">n&atilde;o consegue ler <b class="mk">porque</b> esqueceu os &oacute;culos <span class="dm">&mdash; sem &oacute;culos ele n&atilde;o enxerga as letras. Explica.</span></p>'+
        '<p class="vx"><span class="dm">n&atilde;o consegue ler porque</span> <b class="bad2">esqueceu de contar at&eacute; dez</b> <span class="dm">&mdash; contar &eacute; com n&uacute;mero. N&atilde;o explica.</span></p>',
 porque:'Sem os óculos ele não enxerga as letras — isso explica por que não consegue ler. É a única alternativa que é uma causa de verdade.',
 proximo:'Depois de PORQUE, pergunte sempre: isso impede mesmo? Se não impede, não é a resposta, por mais parecida que pareça.'},

{id:'24F1Q7', eixo:'intruso', origem:'Olimpíada 2024 · 1ª fase · questão 7',
 enun:'IDENTIFIQUE E ASSINALE A ALTERNATIVA QUE POSSUI UMA PALAVRA INTRUSA, QUE NÃO É UM VERBO. LEMBRE-SE DE QUE VERBOS SÃO PALAVRAS QUE SIGNIFICAM AÇÕES, ESTADOS, MUDANÇAS DE ESTADO E FENÔMENOS DA NATUREZA.',
 pede:'QUAL ALTERNATIVA TEM A PALAVRA INTRUSA?',
 opts:[
  {t:'CORRER, ANDAR, PULAR.', no:'As três são coisas que a gente FAZ. Nenhuma intrusa aqui.'},
  {t:'COMER, ALMOÇAR, LANCHAR.', no:'As três são coisas que a gente FAZ. Nenhuma intrusa aqui.'},
  {t:'NADAR, MERGULHAR, MAR.', ok:1},
  {t:'LER, ESTUDAR, ESCREVER.', no:'As três são coisas que a gente FAZ. Nenhuma intrusa aqui.'}
 ],
 dica:'Não procure pelo assunto: procure o que a palavra É. Duas dessas são coisas que a gente faz e uma é um lugar.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">NADAR</span><span class="pc hit">MERGULHAR</span><span class="pc bad">MAR</span></div>'+
        '<p class="vx">Nadar a gente <b>faz</b>. Mergulhar a gente <b>faz</b>. Mar a gente n&atilde;o faz &mdash; mar &eacute; um <b>lugar</b>.</p>'+
        '<p class="vx">A armadilha: as tr&ecirc;s falam de &aacute;gua. Se voc&ecirc; agrupar pelo assunto, o intruso se esconde.</p>',
 porque:'NADAR e MERGULHAR são coisas que a gente faz. MAR é um lugar, não uma ação. As três falam de água, e é isso que esconde o intruso.',
 proximo:'Não agrupe pelo assunto. Pergunte de cada palavra: isso é uma coisa que a gente FAZ, ou é uma coisa que EXISTE?'},

{id:'24F1Q8', eixo:'ler', origem:'Olimpíada 2024 · 1ª fase · questão 8',
 enun:'LEIA O POEMA ADAPTADO DE RUTH ROCHA:',
 texto:['CHEGARAM AS FÉRIAS','QUE BOM QUE VAI SER!','EU VOU PASSEAR,','PULAR E CORRER!',
        'EU VOU DORMIR TARDE,','VOU BRINCAR LÁ FORA...','VOU LER O QUE EU QUERO,','DE NOITE E DE DIA...',
        'BRINCAR COM O CACHORRO,','OU FAZER FOLIA!','COM TODOS OS AMIGOS','VOU FICAR DE BEM,',
        'SÓ VOLTO PARA A ESCOLA','NO ANO QUE VEM!'],
 pede:'QUAL TÍTULO MAIS COMBINA COM O POEMA?',
 opts:[
  {t:'VOLTA ÀS AULAS.', no:'Essa vem da ÚLTIMA linha do poema. Mas a última linha não é o título: o poema inteiro fala de férias, e ele diz que só volta à escola no ano que vem.'},
  {t:'LÁ VÊM AS FÉRIAS!', ok:1},
  {t:'FELIZ PÁSCOA!', no:'Não tem nada de Páscoa no poema. Essa é uma festa que a gente associa a folga, mas o poema não fala dela.'},
  {t:'CHEGOU O CARNAVAL.', no:'A palavra FOLIA aparece no poema e lembra Carnaval — é a isca. Mas uma palavra solta não dá o título: o assunto do poema todo é férias.'}
 ],
 dica:'O título fala do poema INTEIRO, não de uma linha só. Desça a régua até o fim e depois pergunte: do que ele fala do começo ao fim?',
 truque:'O título é do poema inteiro, não de uma linha. Uma palavra solta não manda.',
 acende:[0,12,13],
 visual:'<p class="vx">O poema come&ccedil;a com <b class="mk">CHEGARAM AS F&Eacute;RIAS</b> e termina dizendo que <b class="mk">S&Oacute; VOLTA PARA A ESCOLA NO ANO QUE VEM</b>.</p>'+
        '<p class="vx">Do come&ccedil;o ao fim, o assunto &eacute; um s&oacute;: <b>f&eacute;rias</b>. A escola aparece justamente para dizer que ela est&aacute; <b>longe</b>.</p>',
 porque:'Todo o poema lista o que a criança vai fazer nas férias. A escola só aparece no fim para dizer que ela está longe. O título é sobre férias.',
 proximo:'Nunca tire o título da última linha. Leia o poema todo com a régua e pergunte: do que ele fala do começo ao fim?'},

{id:'24F1Q9', eixo:'intruso', origem:'Olimpíada 2024 · 1ª fase · questão 9',
 enun:'LEIA O TRECHO DE CÂNTICO DOS CÂNTICOS, DE SALOMÃO, E MARQUE A PALAVRA QUE PODERIA ENTRAR NO LUGAR DE CESSOU.',
 quadro:'POIS EIS QUE PASSOU O INVERNO, A CHUVA <b>CESSOU</b> E SE FOI; APARECEM AS FLORES NA FEIRA; CHEGA O TEMPO DE CANTAR E A VOZ DOS P&Aacute;SSAROS SE OUVE EM NOSSA TERRA.',
 pede:'QUE PALAVRA PODERIA ENTRAR NO LUGAR DE CESSOU?',
 opts:[
  {t:'COMEÇOU.', no:'Leia a frase com ela dentro: "A CHUVA COMEÇOU E SE FOI". Briga: uma coisa que começou não se vai logo em seguida. E depois aparecem flores e pássaros — sinal de que a chuva acabou.'},
  {t:'AUMENTOU.', no:'"A CHUVA AUMENTOU E SE FOI" também briga. E o resto do texto fala de flores e pássaros, que aparecem quando o tempo melhora.'},
  {t:'DUPLICOU.', no:'Duplicar é ficar em dobro. "A CHUVA DUPLICOU E SE FOI" não faz sentido nenhum na frase.'},
  {t:'TERMINOU.', ok:1}
 ],
 dica:'Você não precisa saber o que é CESSOU. Tire a palavra, ponha a nova e leia a frase toda: a pista está do lado, em E SE FOI.',
 truque:'Tire a palavra velha, ponha a nova, leia a frase de novo. Continua dizendo a mesma coisa?',
 visual:'<p class="vx">A CHUVA <b class="mk">TERMINOU</b> E SE FOI <span class="dm">&mdash; combina</span></p>'+
        '<p class="vx">A CHUVA <b class="bad2">COME&Ccedil;OU</b> E SE FOI <span class="dm">&mdash; briga</span></p>'+
        '<p class="vx">A pista mora bem do lado: <b class="mk">E SE FOI</b>. E logo depois vem <b class="mk">APARECEM AS FLORES</b>.</p>',
 porque:'O texto diz que o inverno passou, que a chuva "cessou E SE FOI" e que depois vêm flores e pássaros. Tudo indica que a chuva acabou: TERMINOU.',
 proximo:'Quando não conhecer a palavra, não pare nela. Leia o que vem ANTES e DEPOIS: a frase vizinha entrega o sentido.'},

{id:'24F1Q10', eixo:'ler', origem:'Olimpíada 2024 · 1ª fase · questão 10',
 enun:'LEIA A POESIA DE CECÍLIA MEIRELES:',
 texto:['ARABELA','ABRIA A JANELA.','CAROLINA','ERGUIA A CORTINA.','E MARIA','OLHAVA E SORRIA:','"BOM DIA!"'],
 pede:'SE FÔSSEMOS ADICIONAR MAIS DUAS LINHAS AO POEMA, QUAL ALTERNATIVA MELHOR SE ENCAIXARIA NELE?',
 opts:[
  {t:'JOANA / COMIA BRIGADEIRO.', no:'JOANA e BRIGADEIRO não terminam com o mesmo som. Tem a mesma forma das outras, mas falta a rima.'},
  {t:'JULIETA / FAZIA CARETA.', ok:1},
  {t:'LUÍZA / LAVAVA ROUPA.', no:'LUÍZA e ROUPA não rimam. Ter o mesmo formato não basta: tem de terminar com o mesmo som.'},
  {t:'AMANDA / BEBIA ÁGUA.', no:'AMANDA e ÁGUA terminam as duas com A, e por isso parecem rimar. Mas rima é o SOM do fim inteiro: AN-DA e Á-GUA não soam igual.'}
 ],
 dica:'Repare no que acontece em cada dupla do poema: ArabELA / janELA, CarolINA / cortINA. Fale em voz alta e escute o fim.',
 truque:'Rima é quando o fim das duas palavras soa igual. Termina com a mesma letra não é a mesma coisa que rimar.',
 acende:[0,1,2,3],
 visual:'<div class="pcs"><span class="pc hit">ARAB<b>ELA</b></span><span class="pc hit">JAN<b>ELA</b></span></div>'+
        '<div class="pcs"><span class="pc hit">CAROL<b>INA</b></span><span class="pc hit">CORT<b>INA</b></span></div>'+
        '<div class="pcs"><span class="pc hit">JULI<b>ETA</b></span><span class="pc hit">CAR<b>ETA</b></span></div>'+
        '<p class="vx">Sempre o nome da menina rima com o fim da linha seguinte. JULIETA e CARETA seguem a mesma brincadeira.</p>',
 porque:'No poema, o nome da menina sempre rima com o fim da linha seguinte: ArabELA/janELA, CarolINA/cortINA, MarIA/sorrIA. JuliETA/carETA repete a brincadeira.',
 proximo:'Para saber se rima, fale as duas palavras em voz alta e escute só o fim. Terminar com a mesma letra não basta.'},

{id:'24F1Q11', eixo:'silabas', origem:'Olimpíada 2024 · 1ª fase · questão 11',
 enun:'ESTES SÃO OS NOMES DE TRÊS ANIMAIS MUITO CONHECIDOS:',
 quadro:'GALO &nbsp;&ndash;&nbsp; CAVALO &nbsp;&ndash;&nbsp; ELEFANTE',
 nota:'Na prova aparecem três sombras pretas e é a criança que descobre os nomes. Aqui os nomes já vêm escritos.',
 pede:'QUE ALTERNATIVA MOSTRA UMA PALAVRA FORMADA APENAS COM SÍLABAS DOS NOMES DOS ANIMAIS ACIMA?',
 opts:[
  {t:'COELHO', no:'COELHO é outro animal conhecido, e é só por isso que atrai. Mas CO e LHO não existem em nenhum dos três nomes.'},
  {t:'ELEVADOR', no:'ELEVADOR começa com E-LE, que vem mesmo do elefante, e o VA vem do cavalo. Mas DOR não vem de ninguém. Quem confere só o começo cai aqui.'},
  {t:'CAFANGA', ok:1},
  {t:'GALOPANTE', no:'Essa é a armadilha mais forte da prova. GA-LO é o galo inteirinho, galopar lembra cavalo e -TE lembra elefante. Mas PAN não existe: o elefante dá FAN, não PAN. Uma letra de diferença derruba a alternativa.'}
 ],
 dica:'Bata palma em cada nome: GA-LO, CA-VA-LO, E-LE-FAN-TE. Essas são todas as peças que você tem.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">GA</span><span class="pc">LO</span><span class="pc">CA</span><span class="pc">VA</span><span class="pc">LO</span><span class="pc">E</span><span class="pc">LE</span><span class="pc">FAN</span><span class="pc">TE</span></div>'+
        '<p class="vx">Essas s&atilde;o as pe&ccedil;as que os tr&ecirc;s nomes d&atilde;o.</p>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">FAN</span><span class="pc hit">GA</span><span class="arw">&rarr;</span><span class="pc hit">todas do banco</span></div>'+
        '<div class="pcs"><span class="pc hit">GA</span><span class="pc hit">LO</span><span class="pc bad">PAN</span><span class="pc hit">TE</span><span class="arw">&rarr;</span><span class="pc bad">PAN n&atilde;o existe</span></div>',
 porque:'CA vem de cavalo, FAN vem de elefante e GA vem de galo. As três peças de CAFANGA saem dos nomes. Em GALOPANTE, o PAN não existe: o elefante dá FAN.',
 proximo:'Confira TODAS as sílabas da palavra, uma por uma, não só as primeiras. A que estraga costuma ser a do meio.'},

{id:'24F1Q12', eixo:'ler', origem:'Olimpíada 2024 · 1ª fase · questão 12',
 enun:'LEIA O POEMA CANÇÃO DA RUAZINHA DESCONHECIDA, DE MÁRIO QUINTANA:',
 texto:['RUAZINHA QUE EU CONHEÇO APENAS','DA ESQUINA ONDE ELA PRINCIPIA...','RUAZINHA PERDIDA, PERDIDA...',
        'RUAZINHA ONDE MARIA FIA...','RUAZINHA EM QUE EU PENSO ÀS VEZES','COMO QUEM PENSA NOUTRA VIDA...',
        'E PARA ONDE HEI DE MUDAR-ME, UM DIA,','QUANDO TUDO ESTIVER PERDIDO...','RUAZINHA DA QUIETA VIDA...',
        'TRISTONHA... TRISTONHA...','RUAZINHA ONDE MARTA FIA','E ONDE MARIA, NA JANELA, SONHA...'],
 pede:'SOBRE A RUAZINHA DO POEMA, O QUE PODEMOS AFIRMAR?',
 opts:[
  {t:'É UMA RUA ALEGRE E COLORIDA.', no:'É o contrário do que o poema diz. A palavra "ruazinha" soa carinhosa e dá vontade de imaginar coisa alegre, mas o poema fala de PERDIDA, QUIETA e TRISTONHA.'},
  {t:'O POETA MORA NELA.', no:'O poema diz que ele conhece a rua APENAS da esquina. Quem conhece só a esquina não mora lá.'},
  {t:'É UM LUGAR SILENCIOSO E DESANIMADO.', ok:1},
  {t:'O POETA PERCORRE A RUAZINHA TODO DIA.', no:'Ele diz que PENSA na rua às vezes, e que vai se mudar para lá UM DIA. Pensar não é percorrer, e um dia não é todo dia.'}
 ],
 dica:'Junte as palavras que o poema usa para descrever a rua. Elas se repetem: procure com a régua.',
 truque:'Quando a pergunta é sobre como é um lugar, junte as palavras que o texto usa para descrever ele.',
 acende:[2,8,9],
 visual:'<div class="pcs"><span class="pc hit">PERDIDA</span><span class="pc hit">QUIETA</span><span class="pc hit">TRISTONHA</span></div>'+
        '<p class="vx">Quieta quer dizer <b>silenciosa</b>. Tristonha quer dizer <b>desanimada</b>. Somando as palavras do poema, chega-se na resposta.</p>',
 porque:'O poema chama a rua de PERDIDA, de QUIETA e de TRISTONHA, duas vezes. Quieta é silenciosa; tristonha é desanimada.',
 proximo:'Quando a pergunta é sobre o jeito de um lugar, não procure uma linha só. Junte as palavras que o texto repete.'},

{id:'24F1Q13', eixo:'ler', origem:'Olimpíada 2024 · 1ª fase · questão 13',
 enun:'MIGUEL FAZ UM PEDIDO NO BALCÃO E TEM ESTE DIÁLOGO COM A ATENDENTE:',
 texto:['— OLÁ, O QUE VOCÊS SERVEM AQUI?',
        '— SÓ UM MINUTINHO, JÁ TRAGO O CARDÁPIO PARA VOCÊ DAR UMA OLHADINHA.',
        '— LEGAL. ENTÃO, VOU QUERER UM HAMBÚRGUER E UM SUCO DE LARANJA.',
        '— SÓ UM MINUTINHO, ANOTANDO AQUI: UM HAMBURGUERZINHO E UM SUQUINHO. VAI QUERER BATATINHA JUNTO?',
        '— PODE SER. ACEITAM CARTÃO DE CRÉDITO?',
        '— HOJE ESTAMOS COM UM PROBLEMINHA NA NOSSA MAQUININHA.',
        '— TUDO BEM, PAGO NO DINHEIRO.'],
 pede:'CONSIDERANDO O MODO DE FALAR DA ATENDENTE, O QUE ELA TERIA DITO NO FINAL DESSA CONVERSA?',
 opts:[
  {t:'— EM UM MOMENTINHO O SEU PEDIDO ESTARÁ PRONTINHO!', ok:1},
  {t:'— MUITO OBRIGADA! LOGO LEVAREMOS O PEDIDO À SUA MESA.', no:'É uma fala educada e faz todo sentido no balcão. Mas a pergunta não é o que faz sentido: é qual soa como ELA fala. E aqui não tem nenhum -INHO.'},
  {t:'— AQUI ESTÁ O SEU TROCO, SENHOR. TENHA UM BOM APETITE.', no:'Essa encaixa direitinho na história — ele disse que ia pagar em dinheiro, então tem troco. Mas ela fala SENHOR e não usa nenhum -INHO: não é o jeito dela.'},
  {t:'— OBRIGADA. VOLTE SEMPRE.', no:'Faz sentido no balcão, mas é curta e seca. A atendente do texto põe -INHO em tudo o que fala.'}
 ],
 dica:'Não procure a frase que faz sentido: procure a que soa como ELA. Repare no fim das palavras que ela usa.',
 truque:'Quando a pergunta é sobre o JEITO de falar, procure o que se repete na fala da pessoa.',
 acende:[1,3,5],
 visual:'<div class="pcs"><span class="pc hit">MINUT<b>INHO</b></span><span class="pc hit">OLHAD<b>INHA</b></span><span class="pc hit">SUQU<b>INHO</b></span><span class="pc hit">BATAT<b>INHA</b></span><span class="pc hit">PROBLEM<b>INHA</b></span><span class="pc hit">MAQUIN<b>INHA</b></span></div>'+
        '<p class="vx">Ela p&otilde;e <b>-INHO</b> e <b>-INHA</b> em tudo. A &uacute;nica resposta que faz igual &eacute; MOMENT<b>INHO</b> e PRONT<b>INHO</b>.</p>',
 porque:'A atendente põe -INHO e -INHA em tudo: minutinho, olhadinha, suquinho, batatinha, probleminha, maquininha. Só uma resposta fala do mesmo jeito: momentinho e prontinho.',
 proximo:'Quando perguntarem sobre o JEITO de falar, procure o que se repete na boca da pessoa e ache a resposta que repete a mesma coisa.'},

{id:'24F1Q14', eixo:'ler', origem:'Olimpíada 2024 · 1ª fase · questão 14',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['HOJE É TERÇA-FEIRA, E MAURÍCIO SAIU PARA ANDAR DE BICICLETA.',
        'ONTEM ELE TREINOU FUTSAL COM A EQUIPE DA ESCOLA,',
        'POIS SEMANA QUE VEM COMEÇA O CAMPEONATO MUNICIPAL.',
        'SEMANA PASSADA ELE CAIU E MACHUCOU O JOELHO,',
        'MAS ELE JÁ SE RECUPEROU E ESTÁ PRONTO PARA JOGAR.'],
 pede:'COM BASE NO TEXTO, QUAL EVENTO ACONTECEU ANTES DOS OUTROS?',
 opts:[
  {t:'MAURÍCIO FOI ANDAR DE BICICLETA.', no:'A bicicleta é a primeira coisa CONTADA, mas não a primeira que aconteceu: ela é de HOJE. A ordem em que o texto conta não é a ordem em que aconteceu.'},
  {t:'A EQUIPE DE FUTSAL DA ESCOLA TREINOU.', no:'O treino foi ONTEM. É mais antigo que a bicicleta, mas ainda tem uma coisa mais antiga no texto.'},
  {t:'O CAMPEONATO MUNICIPAL COMEÇOU.', no:'O campeonato ainda NÃO começou: o texto diz semana que vem. Não pode ser o mais antigo se nem aconteceu.'},
  {t:'MAURÍCIO MACHUCOU O JOELHO.', ok:1}
 ],
 dica:'Procure as palavrinhas de tempo: HOJE, ONTEM, SEMANA QUE VEM, SEMANA PASSADA. Ponha-as em fila.',
 truque:'Monte a fila do tempo: semana passada, ontem, hoje, semana que vem. Só então responda.',
 acende:[0,1,2,3],
 visual:'<div class="pcs"><span class="pc hit">SEMANA PASSADA<br>joelho</span><span class="arw">&rarr;</span><span class="pc">ONTEM<br>futsal</span><span class="arw">&rarr;</span><span class="pc">HOJE<br>bicicleta</span><span class="arw">&rarr;</span><span class="pc bad">SEMANA QUE VEM<br>campeonato</span></div>'+
        '<p class="vx">O texto conta fora de ordem. Na fila do tempo, o joelho &eacute; o mais antigo &mdash; e o campeonato nem aconteceu.</p>',
 porque:'O texto conta os fatos fora de ordem. Na fila do tempo: semana passada (joelho), ontem (futsal), hoje (bicicleta), semana que vem (campeonato). O mais antigo é o joelho.',
 proximo:'Sublinhe as palavrinhas de tempo e monte a fila antes de responder. A ordem em que o texto conta quase nunca é a ordem em que aconteceu.'},

{id:'24F1Q15', eixo:'silabas', origem:'Olimpíada 2024 · 1ª fase · questão 15',
 enun:'RAIMUNDA CHEGOU EM CASA ASSUSTADA E ESCREVEU O QUE VIU. MAS ESTAVA TÃO CONFUSA QUE ALGUMAS PALAVRAS TROCARAM DE SÍLABAS ENTRE SI. VEJA O QUE ELA ESCREVEU:',
 quadro:'UMA PALDERA ECAUME MEISABOU POR VENSA DO NORTO.',
 pede:'O QUE RAIMUNDA VIU?',
 opts:[
  {t:'UM CARRO EM CIMA DE UMA PALMEIRA.', no:'Não existe nenhuma sílaba de CARRO na frase embaralhada. O carro veio da imaginação, não das peças.'},
  {t:'UMA PALMEIRA PEGANDO FOGO.', no:'A palmeira está certa, mas o fogo não. Quem decodifica só a primeira palavra e inventa o resto da história cai aqui.'},
  {t:'UM CARRO SENDO ARRASTADO PELO VENTO DO NORTE.', no:'Essa cata pedaços soltos: viu NORTO e pensou "norte", viu VEN e pensou "vento". Mas trocou a palmeira por um carro que não existe em nenhuma sílaba.'},
  {t:'UMA PALMEIRA QUE FOI DERRUBADA PELO VENTO.', ok:1}
 ],
 dica:'As sílabas trocaram de lugar entre as palavras. Desembarace uma palavra de cada vez, do começo ao fim.',
 truque:'Desembarace uma palavra de cada vez, até o fim da frase. Não responda com meia frase.',
 visual:'<div class="pcs"><span class="pc bad">PALDERA</span><span class="arw">&rarr;</span><span class="pc hit">PALMEIRA</span></div>'+
        '<div class="pcs"><span class="pc bad">ECAUME</span><span class="arw">&rarr;</span><span class="pc hit">ENORME</span></div>'+
        '<div class="pcs"><span class="pc bad">MEISABOU</span><span class="arw">&rarr;</span><span class="pc hit">DESABOU</span></div>'+
        '<div class="pcs"><span class="pc bad">VENSA</span><span class="arw">&rarr;</span><span class="pc hit">CAUSA</span></div>'+
        '<div class="pcs"><span class="pc bad">NORTO</span><span class="arw">&rarr;</span><span class="pc hit">VENTO</span></div>'+
        '<p class="vx">A frase inteira: <b>UMA PALMEIRA ENORME DESABOU POR CAUSA DO VENTO.</b></p>',
 porque:'Desembaraçando tudo, a frase é: UMA PALMEIRA ENORME DESABOU POR CAUSA DO VENTO. Ou seja, o vento derrubou a palmeira.',
 proximo:'Desembarace a frase INTEIRA antes de olhar as alternativas. Meia frase leva para a alternativa errada.'},


/* fim dos itens */
{id:'FIM', eixo:'_', origem:'', pede:'', opts:[], _sentinela:1}
];

/* remove a sentinela usada só para fechar a lista com vírgula segura */
ITENS = ITENS.filter(function(i){ return !i._sentinela; });

/* ---------- OS CARTÕES DE TRUQUE ----------
   A "Caixa de truques" é o material teórico. Cada cartão tem sempre a
   mesma anatomia, para a criança saber o que esperar:
     1. o truque em uma frase   2. uma questão real resolvida na tela
     3. "agora você": outra questão real da MESMA família, para responder
   Criança de 7 anos não lê teoria: ela imita um gesto que viu funcionar.
   Por isso o cartão mostra o gesto, faz repetir uma vez e para.
   `min` é a estimativa de tempo, em minutos.                          */
var CARTOES = [
 {k:'regua', titulo:'A régua', min:3,
  truque:'Uma linha acesa de cada vez. O dedo fica embaixo da linha; a linha acaba, o dedo desce UMA só.',
  texto:'Quase todo mundo da sua idade pula linha quando lê. Não é falta de atenção: é que as linhas são parecidas e o olho se perde na volta. Tem um jeito de resolver, e ele é com o dedo.',
  exemplo:'24F1Q12',
  fecho:'Na prova não tem tela. Seu dedo é a régua: ele fica embaixo da linha e só desce quando a linha acaba. A borracha também serve.'},

 {k:'ler', titulo:'Ler e entender', min:4,
  truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
  texto:'Esta é a parte da prova com mais perguntas. E é a mais justa de todas: a resposta está escrita ali, no papel. Não é para adivinhar nem para lembrar da sua vida — é para achar.',
  extras:['Pergunta que começa com POR QUE: procure a linha que explica.',
          'Título é do poema INTEIRO, nunca da última linha.',
          'Lição da fábula: o que os bichos deviam ter feito e não fizeram.',
          'Antes de marcar, leia as QUATRO respostas até o fim.'],
  exemplo:'25F1Q13', agora:'24F1Q8'},

 {k:'letras', titulo:'Brincar com letras', min:3,
  truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
  texto:'Aqui a prova dá um monte de letras e pergunta que palavra dá para montar. Ou manda trocar as vogais de lugar. É conta de letra, não é adivinhação.',
  extras:['Trocar as vogais: só as vogais mudam de lugar; as outras letras ficam paradas.',
          'Mover uma letra: ache a palavra esquisita, tire UMA letra dela e dê para a outra.'],
  exemplo:'25F1Q6', agora:'25F1Q11'},

 {k:'contar', titulo:'Contar com o dedo', min:3,
  truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
  texto:'Vogal é A, E, I, O, U. Todo o resto é consoante. Quando a prova manda contar, ninguém acerta de cabeça: acerta quem marca uma por uma e conta no fim.',
  extras:['A vogal que estraga costuma estar no ÚLTIMO pedaço da palavra.',
          'Quando a pergunta fala de SOM, fale as palavras em voz alta e escute. Olhar não resolve.'],
  exemplo:'25F1Q7', agora:'24F1Q4'},

 {k:'silabas', titulo:'Sílabas', min:3,
  truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
  texto:'A prova dá pedaços de palavra e pergunta o que dá para montar. A regra é sempre a mesma: usar todas as peças, uma vez cada. Pode trocar a ordem.',
  extras:['Sobrou peça na mesa? Errado. Faltou peça? Errado.',
          'Se as peças vêm de figuras, fale o nome da figura batendo palma.'],
  exemplo:'25F1Q3', agora:'24F1Q11'},

 {k:'buraco', titulo:'Frase com buraco', min:3,
  truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
  texto:'A frase tem um espaço vazio e quatro palavras para escolher. Não dá para decidir olhando só a palavra: tem de ler a frase toda com ela dentro.',
  extras:['A pista mora do lado do buraco.',
          'Depois de PORQUE vem a explicação: pergunte se aquilo impede mesmo.'],
  exemplo:'25F1Q2', agora:'24F1Q6'},

 {k:'intruso', titulo:'Intruso e troca-troca', min:3,
  truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
  texto:'Duas brincadeiras parecidas: achar a palavra que não pertence ao grupo, e trocar uma palavra por outra que diga a mesma coisa.',
  extras:['Palavra que troca: tire a velha, ponha a nova, leia a frase de novo.',
          'Quando a questão dá várias pistas, confira TODAS: a errada passa em quase todas e cai na última.'],
  exemplo:'24F1Q9', agora:'25F1Q10'},

 {k:'alfabeto', titulo:'Alfabeto e charada', min:3,
  truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.',
  texto:'Duas coisas caem aqui: listas em ordem alfabética e charadas em que uma letra fala dela mesma.',
  extras:['Ordem dentro da palavra: cada letra tem de vir DEPOIS da anterior, até o fim.',
          'Na charada, pense na FORMA da letra e no SOM dela.'],
  exemplo:'25F1Q5', agora:'24F1Q1'},

 {k:'codigo', titulo:'Código, tabela e placa', min:3,
  truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
  texto:'A prova dá uma tabela em que cada desenho vale uma sílaba, e uma fila de desenhos para decifrar. É trabalho de detetive: devagar e sem pular nenhum.',
  extras:['Nunca adivinhe o fim porque reconheceu o começo.',
          'Placa: círculo vermelho cortado quer dizer PROIBIDO, e o desenho de dentro diz o que é proibido. Na prova de 2025 a placa certa era a do cachorro dentro do círculo vermelho cortado: nenhum animal ali.'],
  exemplo:'25F1Q15'}
];

return { FAMILIAS: FAMILIAS, ITENS: ITENS, CARTOES: CARTOES,
         acha: function(id){ return ITENS.filter(function(x){ return x.id===id; })[0]||null; } };
})();
