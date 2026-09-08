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



/* ===== reserva_2025F2 ===== */
{id:'25F2Q1', eixo:'intruso', origem:'Olimpíada 2025 · 2ª fase · questão 1',
 enun:'LEIA O POEMA A FOCA, DE VINICIUS DE MORAES:',
 texto:['QUER VER A FOCA','FICAR FELIZ?','É PÔR UMA BOLA','NO SEU NARIZ.',
        'QUER VER A FOCA','BATER PALMINHA?','É DAR A ELA','UMA SARDINHA.',
        'QUER VER A FOCA','FAZER UMA BRIGA?','É ESPETAR ELA','BEM NA BARRIGA!'],
 pede:'QUAL DAS PALAVRAS ABAIXO PODE SER COLOCADA NO LUGAR DE FELIZ PARA QUE A FRASE CONTINUE DIZENDO A MESMA COISA?',
 opts:[
  {t:'TRISTE.', no:'TRISTE é o contrário de FELIZ. A frase até anda com ela dentro — "QUER VER A FOCA FICAR TRISTE?" — e é por isso que engana: as quatro cabem na frase. Só uma diz a mesma coisa.'},
  {t:'CABISBAIXA.', no:'CABISBAIXA é palavra difícil, e é aí que mora o perigo: quando a gente não conhece a palavra, dá vontade de chutar nela. Cabisbaixa é quem anda de cabeça baixa, de tristeza — o contrário de feliz.'},
  {t:'ALEGRE.', ok:1},
  {t:'DESANIMADA.', no:'DESANIMADA é quem está sem vontade de nada. Cabe na frase, mas diz o contrário de feliz — e a pergunta manda continuar dizendo a MESMA coisa.'}
 ],
 dica:'Não é para achar a palavra que cabe na frase: as quatro cabem. É para achar a que quer dizer a mesma coisa que FELIZ.',
 truque:'Tire a palavra velha, ponha a nova, leia a frase de novo. Continua dizendo a mesma coisa?',
 visual:'<p class="vx">QUER VER A FOCA FICAR <b class="mk">ALEGRE</b>? <span class="dm">&mdash; diz a mesma coisa que FELIZ</span></p>'+
        '<p class="vx">QUER VER A FOCA FICAR <b class="bad2">TRISTE</b>? <span class="dm">&mdash; a frase anda, mas virou o contr&aacute;rio</span></p>'+
        '<div class="pcs"><span class="pc bad">TRISTE</span><span class="pc bad">CABISBAIXA</span><span class="pc bad">DESANIMADA</span><span class="arw">&rarr;</span><span class="pc bad">as tr&ecirc;s s&atilde;o o contr&aacute;rio</span></div>',
 porque:'FELIZ e ALEGRE querem dizer a mesma coisa. Trocando uma pela outra, o poema continua dizendo que a foca fica contente com a bola no nariz.',
 proximo:'Ponha a palavra nova no lugar e leia. Se a frase continua andando mas passa a dizer o contrário, essa não é a resposta.'},

{id:'25F2Q2', eixo:'letras', origem:'Olimpíada 2025 · 2ª fase · questão 2',
 enun:'VAMOS BRINCAR DE TRANSFORMAR PALAVRAS MUDANDO CONSOANTES?',
 pede:'PENSE NA PALAVRA AMIGO. QUE CONSOANTES PODEMOS COLOCAR NO LUGAR DO M E DO G PARA VIRAR O NOME DE ALGO PEQUENO QUE FAZ MUITO BARULHO QUANDO SOPRAMOS?',
 opts:[
  {t:'G E T.', no:'Faça a troca e leia: A-G-I-T-O, AGITO. É palavra de verdade — é o que a gente faz quando agita, quando sacode um vidro de suco. Mas não é o nome de nenhum objeto que a gente sopra.'},
  {t:'V E S.', no:'Essa é a mais forte. A troca dá A-V-I-S-O, AVISO, que é palavra bem conhecida. Formou palavra, só que aviso não é pequeno, não faz barulho e ninguém sopra um aviso.'},
  {t:'P E T.', ok:1},
  {t:'L E S.', no:'A troca dá A-L-I-S-O, ALISO. É o que a gente faz quando alisa o cabelo, não é o nome de um objeto.'}
 ],
 dica:'As vogais A, I e O ficam paradas nos lugares delas. Ponha as duas consoantes de cada alternativa, leia a palavra que saiu e pergunte: dá para soprar?',
 truque:'As vogais ficam paradas. Troque só as consoantes e leia a palavra que saiu.',
 visual:'<div class="pcs"><span class="pc hit">A</span><span class="pc bad">M</span><span class="pc hit">I</span><span class="pc bad">G</span><span class="pc hit">O</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">A</span><span class="pc">P</span><span class="pc hit">I</span><span class="pc">T</span><span class="pc hit">O</span></div>'+
        '<p class="vx">O <b>A</b>, o <b>I</b> e o <b>O</b> n&atilde;o saem do lugar. S&oacute; o M e o G foram trocados: virou <b>APITO</b>.</p>'+
        '<div class="pcs"><span class="pc bad">AGITO</span><span class="pc bad">AVISO</span><span class="pc bad">ALISO</span></div>'+
        '<p class="vx">As tr&ecirc;s viram palavra de verdade. Nenhuma delas &eacute; uma coisinha que a gente sopra.</p>',
 porque:'Pondo P no lugar do M e T no lugar do G, AMIGO vira APITO. O apito é pequeno, a gente sopra e ele faz muito barulho — bate com tudo o que a pergunta pediu.',
 proximo:'Faça a troca nas QUATRO alternativas e leia cada palavra que saiu. Só depois pergunte qual delas é a coisa que a pergunta descreveu.'},

{id:'25F2Q3', eixo:'contar', origem:'Olimpíada 2025 · 2ª fase · questão 3',
 pede:'EM QUAL DESTAS PALAVRAS O SOM DA LETRA E É DIFERENTE?',
 opts:[
  {t:'BICICLETA.', ok:1},
  {t:'BORBOLETA.', no:'Fale BORBOLETA e CANETA em voz alta, uma atrás da outra: o E das duas sai igualzinho, fechadinho. Se duas soam iguais, nenhuma das duas pode ser a diferente.'},
  {t:'CANETA.', no:'CANETA é a palavra mais conhecida das quatro, e por isso dá vontade de marcar. Mas o E dela soa igual ao de BORBOLETA e ao de CAMISETA.'},
  {t:'CAMISETA.', no:'CAMISETA soa igual a CANETA e a BORBOLETA. As quatro terminam com as mesmas letras no papel, então olhar não decide nada: tem de falar.'}
 ],
 dica:'As quatro terminam igual no papel: -ETA. Fale as quatro em voz alta, baixinho, uma atrás da outra, e escute o E.',
 truque:'Quando a pergunta fala de SOM, fale as palavras em voz alta e escute. Olhar não resolve.',
 visual:'<div class="pcs"><span class="pc bad">BORBOL<b>E</b>TA</span><span class="pc bad">CAN<b>E</b>TA</span><span class="pc bad">CAMIS<b>E</b>TA</span><span class="arw">&rarr;</span><span class="pc bad">o mesmo som nas tr&ecirc;s</span></div>'+
        '<div class="pcs"><span class="pc hit">BICICL<b>E</b>TA</span><span class="arw">&rarr;</span><span class="pc hit">bicicl-&Eacute;-ta, de boca aberta</span></div>'+
        '<p class="vx">As quatro terminam com as mesmas letras <b>-ETA</b>. O olho n&atilde;o separa; a boca separa.</p>',
 porque:'Falando em voz alta, o E de BICICLETA sai de boca aberta: bicicl-É-ta. Nas outras três — BORBOLETA, CANETA e CAMISETA — o E sai fechadinho, do mesmo jeito nas três.',
 proximo:'Quando três alternativas soam iguais entre si, nenhuma delas pode ser a resposta. A diferente é a que sobra.'},

{id:'25F2Q4', eixo:'letras', origem:'Olimpíada 2025 · 2ª fase · questão 4',
 pede:'A PALAVRA GALOPE ESCONDE UM ANIMAL. QUAL É ELE?',
 opts:[
  {t:'GATO.', no:'GATO tem o G, o A e o O, iguais aos de GALOPE, e ainda começa com GA — por isso engana. Mas não existe nenhum T em GALOPE, e a palavra escondida tem de estar grudada e na ordem: depois do GA vem o L.'},
  {t:'GALO.', ok:1},
  {t:'GANSO.', no:'GANSO precisa de um N e de um S. GALOPE não tem nem um nem outro. As quatro alternativas começam com G, e é só isso que ela tem de parecido.'},
  {t:'GORILA.', no:'GORILA precisa de um R e de um I, e nenhum dos dois está em GALOPE.'}
 ],
 dica:'GALOPE tem seis letras: G, A, L, O, P, E. Tape com o dedo as letras do fim e veja o que sobra escrito.',
 truque:'Palavra escondida vem inteira e grudada, na ordem. Tape o começo e o fim com o dedo e leia o que sobrou.',
 visual:'<div class="pcs"><span class="pc hit">G</span><span class="pc hit">A</span><span class="pc hit">L</span><span class="pc hit">O</span><span class="pc bad">P</span><span class="pc bad">E</span></div>'+
        '<p class="vx">Tapando o <b>PE</b> do fim com o dedo, sobra <b class="mk">GALO</b>: inteiro, grudado e na ordem.</p>'+
        '<div class="pcs"><span class="pc bad">GA<b>T</b>O</span><span class="pc bad">GA<b>NS</b>O</span><span class="pc bad">G<b>ORI</b>LA</span></div>'+
        '<p class="vx">As tr&ecirc;s pedem letras que GALOPE n&atilde;o tem: T, N, S, R e I.</p>',
 porque:'Tapando as duas últimas letras de GALOPE sobra GALO: as quatro letras inteiras, grudadas e na ordem certa. É assim que uma palavra fica escondida dentro da outra.',
 proximo:'Palavra escondida tem de estar grudada e na ordem. Se você precisou pular uma letra do meio, não vale.'},

{id:'25F2Q5', eixo:'buraco', origem:'Olimpíada 2025 · 2ª fase · questão 5',
 enun:'MAURÍCIO ESTAVA ESCREVENDO UMA HISTÓRIA SOBRE SUAS FÉRIAS, MAS, AO REVISAR O TEXTO, PERCEBEU QUE SE ESQUECEU DE UMA PALAVRA.',
 quadro:'NO VER&Atilde;O, EU GOSTO DE <span class="bl">_________</span> NA AREIA COM MEUS AMIGOS.',
 pede:'QUAL SERIA A PALAVRA CORRETA NESSE CASO?',
 opts:[
  {t:'COMERMOS.', no:'Leia a frase inteira com ela dentro: "EU GOSTO DE COMERMOS NA AREIA". A frase tropeça — quem fala é EU, uma pessoa só, e COMERMOS é de mais de um.'},
  {t:'BRINCAR.', ok:1},
  {t:'BRINCARAM.', no:'BRINCARAM traz o verbo certo, e é por isso que engana. Mas leia: "EU GOSTO DE BRINCARAM NA AREIA" — a frase tropeça. BRINCARAM é o que eles já fizeram, não é o que EU gosto de fazer.'},
  {t:'NADARMOS.', no:'Verão e praia lembram nadar, e essa é a isca. Mas a frase diz NA AREIA, e na areia ninguém nada. E "EU GOSTO DE NADARMOS" também tropeça.'}
 ],
 dica:'Leia a frase inteira, do começo, com cada palavra dentro do buraco. Duas pistas mandam: quem fala é EU, e o lugar é NA AREIA.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">EU GOSTO DE <b class="mk">BRINCAR</b> NA AREIA <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><span class="dm">EU GOSTO DE</span> <b class="bad2">BRINCARAM</b> <span class="dm">NA AREIA &mdash; a frase tropeça</span></p>'+
        '<p class="vx">Na areia a gente <b>brinca</b>; nadar &eacute; na &aacute;gua. E quem fala &eacute; <b>EU</b>, uma pessoa s&oacute;.</p>',
 porque:'Na areia a gente brinca — nadar é na água. E como quem fala é EU, a palavra certa é BRINCAR: "EU GOSTO DE BRINCAR". Só ela passa nas duas coisas ao mesmo tempo.',
 proximo:'Depois de GOSTO DE vem a palavra inteirinha, sem o fim mudado: gosto de BRINCAR, gosto de CORRER. Leia a frase toda antes de marcar.'},

{id:'25F2Q6', eixo:'ler', origem:'Olimpíada 2025 · 2ª fase · questão 6',
 enun:'DURANTE A AULA, A PROFESSORA ESTAVA DITANDO O POEMA A CASA E O SEU DONO, DE ELIAS JOSÉ, PARA OS ALUNOS ESCREVEREM NO CADERNO:',
 texto:['ESSA CASA É DE CACO','QUEM MORA NELA É O MACACO.',
        'ESSA CASA É TÃO BONITA','QUEM MORA NELA É A CABRITA.',
        'ESSA CASA É DE CIMENTO','QUEM MORA NELA É O JUMENTO.',
        'ESSA CASA É DE TELHA','QUEM MORA NELA É A ABELHA.'],
 pede:'TAINÁ NÃO OUVIU DIREITO A ÚLTIMA PALAVRA QUE A PROFESSORA FALOU E ESCREVEU OUTRA COM SOM PARECIDO. COMO ESSA PALAVRA TAMBÉM COMBINAVA COM O POEMA, ELA NÃO PERCEBEU O ENGANO. QUAL PALAVRA TAINÁ ESCREVEU?',
 opts:[
  {t:'CIGARRA.', no:'CIGARRA é bicho, e é só por isso que atrai. Mas fale em voz alta: CIGARRA não rima com TELHA e não soa nada parecido com ABELHA.'},
  {t:'OVELHA.', ok:1},
  {t:'GIRAFA.', no:'GIRAFA também é bicho e também cabe na história. Mas ela não rima com TELHA, e Tainá escreveu uma palavra de SOM PARECIDO com a que ouviu.'},
  {t:'ARARA.', no:'ARARA é bicho, mas termina com um som bem diferente de TELHA. Ser bicho é só metade do que a questão pede.'}
 ],
 dica:'Repare como o poema funciona: CACO/MACACO, BONITA/CABRITA, CIMENTO/JUMENTO, TELHA/ABELHA. Agora ache o bicho que rima com TELHA e ainda soa parecido com ABELHA.',
 truque:'Rima é quando o fim das duas palavras soa igual. Termina com a mesma letra não é a mesma coisa que rimar.',
 acende:[6,7],
 visual:'<div class="pcs"><span class="pc hit">T<b>ELHA</b></span><span class="pc hit">AB<b>ELHA</b></span><span class="pc hit">OV<b>ELHA</b></span></div>'+
        '<p class="vx">As tr&ecirc;s terminam com o mesmo som. E <b>ABELHA</b> e <b>OVELHA</b> ainda soam quase iguais na boca.</p>'+
        '<div class="pcs"><span class="pc bad">CIGARRA</span><span class="pc bad">GIRAFA</span><span class="pc bad">ARARA</span></div>'+
        '<p class="vx">S&atilde;o bichos, sim &mdash; mas nenhum rima com TELHA nem parece com ABELHA.</p>',
 porque:'Tainá ouviu ABELHA e escreveu OVELHA: as duas soam quase iguais. E OVELHA ainda rima com TELHA, do jeito que o poema pede — por isso ela não percebeu o engano.',
 proximo:'Quando a questão pede duas coisas ao mesmo tempo (ser bicho E soar parecido), confira as duas em cada alternativa. Uma só não basta.'},

{id:'25F2Q7', eixo:'silabas', origem:'Olimpíada 2025 · 2ª fase · questão 7',
 enun:'VEJA AS SÍLABAS ABAIXO:',
 quadro:'TA &nbsp;&ndash;&nbsp; POR &nbsp;&ndash;&nbsp; NE &nbsp;&ndash;&nbsp; JA &nbsp;&ndash;&nbsp; LA &nbsp;&ndash;&nbsp; BI',
 pede:'COM ELAS, PODEMOS FORMAR OS NOMES DE DUAS PARTES MUITO IMPORTANTES DE UMA CASA – AQUELAS QUE USAMOS PARA ENTRAR, SAIR OU OLHAR PARA FORA. NO ENTANTO, UMA DESSAS SÍLABAS NÃO APARECE EM NENHUMA DAS PALAVRAS. QUAL É A SÍLABA QUE SOBRA?',
 opts:[
  {t:'TA.', no:'TA é o último pedaço de POR-TA. Quem monta só a JANELA olha para a mesa, vê o TA parado e acha que ele sobrou.'},
  {t:'NE.', no:'NE é o pedaço do meio de JA-NE-LA. Quem monta só a PORTA acha que o NE sobrou.'},
  {t:'LA.', no:'LA é o fim de JA-NE-LA. Também parece sobrar para quem parou na porta e não montou a segunda palavra.'},
  {t:'BI.', ok:1}
 ],
 dica:'Primeiro descubra as duas partes da casa: por onde a gente entra e sai, e por onde a gente olha para fora. Só depois monte as duas com as peças.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">TA</span><span class="pc">POR</span><span class="pc">NE</span><span class="pc">JA</span><span class="pc">LA</span><span class="pc">BI</span></div>'+
        '<div class="pcs"><span class="pc hit">POR</span><span class="pc hit">TA</span><span class="arw">&rarr;</span><span class="pc hit">PORTA</span></div>'+
        '<div class="pcs"><span class="pc hit">JA</span><span class="pc hit">NE</span><span class="pc hit">LA</span><span class="arw">&rarr;</span><span class="pc hit">JANELA</span></div>'+
        '<div class="pcs"><span class="pc bad">BI</span><span class="arw">&rarr;</span><span class="pc bad">ficou na mesa</span></div>'+
        '<p class="vx">S&atilde;o seis pe&ccedil;as. A porta gasta duas e a janela gasta tr&ecirc;s: sobra <b>uma</b>.</p>',
 porque:'As duas partes da casa são PORTA e JANELA. POR+TA gasta duas peças e JA+NE+LA gasta três. Das seis peças, sobra só o BI.',
 proximo:'Monte as DUAS palavras antes de dizer qual sobrou. Quem monta só uma acha que as peças da outra estão sobrando.'},

{id:'25F2Q8', eixo:'ler', origem:'Olimpíada 2025 · 2ª fase · questão 8',
 enun:'LEIA COM ATENÇÃO O TEXTO ABAIXO:',
 quadro:'O PIPOQUEIRO DA PRA&Ccedil;A SEMPRE CANTA ENQUANTO TRABALHA. ELE CANTA T&Atilde;O ALTO, MAS T&Atilde;O ALTO, QUE TODO MUNDO O PERCEBE ANTES MESMO DE SENTIR O CHEIRO DA PIPOCA!',
 pede:'SEGUNDO O TEXTO, COMO AS PESSOAS FICAM SABENDO QUE O PIPOQUEIRO ESTÁ NA PRAÇA?',
 opts:[
  {t:'PELO CHEIRO DA PIPOCA.', no:'CHEIRO DA PIPOCA está escrito no texto com todas as letras, e é isso que atrai. Mas o texto diz que todo mundo percebe ANTES de sentir o cheiro — então não foi o cheiro que avisou.'},
  {t:'PELO SOM DAS PIPOCAS ESTOURANDO.', no:'Pipoca estourando faz barulho mesmo, na vida real. Só que o texto não fala disso em lugar nenhum, e a pergunta diz SEGUNDO O TEXTO.'},
  {t:'PELO SEU CANTO.', ok:1},
  {t:'PELA FUMACEIRA QUE FAZ.', no:'O carrinho de pipoca solta fumaça, é verdade. Mas de novo: o texto não fala de fumaça nenhuma. Aqui vale o que está escrito, não o que a gente já viu na rua.'}
 ],
 dica:'Volte ao texto com a régua e ache a palavrinha ANTES. Ela diz o que chega primeiro.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 visual:'<p class="vx">ELE <b class="mk">CANTA T&Atilde;O ALTO</b> QUE TODO MUNDO O PERCEBE <b class="mk">ANTES</b> DE SENTIR O CHEIRO.</p>'+
        '<div class="pcs"><span class="pc hit">o canto</span><span class="arw">&rarr;</span><span class="pc bad">o cheiro</span></div>'+
        '<p class="vx">O canto chega <b>primeiro</b>. Quem avisa &eacute; ele.</p>',
 porque:'O texto diz que ele canta tão alto que todo mundo percebe ANTES de sentir o cheiro da pipoca. Quem chega primeiro é o canto — é o canto que avisa.',
 proximo:'Marcar uma alternativa só porque as palavras dela aparecem no texto é a armadilha. Leia a frase inteira em volta e veja o que ela está dizendo.'},

{id:'25F2Q9', eixo:'letras', origem:'Olimpíada 2025 · 2ª fase · questão 9',
 enun:'OBSERVE ESTA SEQUÊNCIA DE PALAVRAS:',
 quadro:'CADEIRA &mdash; LADEIRA &mdash; MADEIRA<div class="sep"></div>ESSAS PALAVRAS T&Ecirc;M ALGO EM COMUM, MAS N&Atilde;O &Eacute; O SEU SIGNIFICADO.'+
        '<div class="sep"></div>AGORA, VEJA OUTRA SEQU&Ecirc;NCIA:<div class="sep"></div>CANELA &mdash; JANELA &mdash; ?',
 pede:'QUAL PALAVRA DEVE COMPLETAR A SEGUNDA SEQUÊNCIA, MANTENDO A MESMA IDEIA DA PRIMEIRA?',
 opts:[
  {t:'CAPELA.', no:'CAPELA rima com CANELA, e é por isso que engana. Mas olhe as letras: de CANELA para CAPELA quem mudou foi o N do meio, e a primeira letra ficou a mesma. Na brincadeira, é a primeira que muda.'},
  {t:'GALERA.', no:'GALERA nem rima direito: fale CANELA e GALERA em voz alta e escute o fim, -ELA e -ERA. E ainda muda mais de uma letra.'},
  {t:'PANELA.', ok:1},
  {t:'FIVELA.', no:'FIVELA também rima em -ELA, mas de CANELA para FIVELA mudaram três letras: o C virou F, o A virou I e o N virou V. A brincadeira troca uma letra só.'}
 ],
 dica:'Escreva CADEIRA, LADEIRA e MADEIRA uma embaixo da outra. O que muda de uma para a outra? E o que fica igualzinho?',
 truque:'Descubra o que muda de uma palavra para a outra. Se só a primeira letra muda, o resto tem de ficar igualzinho.',
 visual:'<div class="pcs"><span class="pc"><b>C</b>ADEIRA</span><span class="pc"><b>L</b>ADEIRA</span><span class="pc"><b>M</b>ADEIRA</span></div>'+
        '<p class="vx">S&oacute; a <b>primeira</b> letra muda. O resto, <b>ADEIRA</b>, fica igualzinho nas tr&ecirc;s.</p>'+
        '<div class="pcs"><span class="pc hit"><b>C</b>ANELA</span><span class="pc hit"><b>J</b>ANELA</span><span class="pc hit"><b>P</b>ANELA</span></div>'+
        '<p class="vx">Aqui o peda&ccedil;o que fica &eacute; <b>ANELA</b>. Basta p&ocirc;r uma letra nova na frente.</p>'+
        '<div class="pcs"><span class="pc bad">CA<b>P</b>ELA</span><span class="pc bad"><b>FIV</b>ELA</span><span class="arw">&rarr;</span><span class="pc bad">mudaram letras do meio</span></div>',
 porque:'De CADEIRA para LADEIRA e para MADEIRA muda só a primeira letra; o resto, ADEIRA, continua igual. Fazendo o mesmo com CANELA e JANELA, o pedaço que fica é ANELA — e com um P na frente dá PANELA.',
 proximo:'Descubra a regra do exemplo e escreva o pedaço que não muda. Depois é só experimentar uma letra na frente dele.'},

{id:'25F2Q10', eixo:'intruso', origem:'Olimpíada 2025 · 2ª fase · questão 10',
 enun:'VEJA O QUE DIZ O CARTAZ NA PORTA DO CLUBE:',
 quadro:'<b>FESTA DA FRUTA</b><div class="sep"></div>PARA ENTRAR, VOC&Ecirc; DEVE CUMPRIR AS TR&Ecirc;S REGRAS ABAIXO:'+
        '<div class="sep"></div>&bull; ESTAR FANTASIADO DE FRUTA;<div class="sep"></div>&bull; LEVAR UM SUCO;<div class="sep"></div>&bull; LEVAR UM DOCE.',
 pede:'QUAL DAS CRIANÇAS ABAIXO PODERÁ ENTRAR NA FESTA?',
 opts:[
  {t:'ANDRESSA, QUE SE FANTASIOU DE MELANCIA E LEVOU SUCO DE LARANJA E PIZZA DE QUATRO QUEIJOS.', no:'Andressa passa em duas regras: melancia é fruta e ela levou suco. Mas pizza não é doce — falhou na terceira, e o cartaz manda cumprir as três.'},
  {t:'BORGES, QUE SE FANTASIOU DE ABACAXI E LEVOU SUCO DE MELANCIA E BRIGADEIRO.', ok:1},
  {t:'CLEÓPATRA, QUE SE FANTASIOU DE BATATA E LEVOU SUCO DE AMORA E BOLO DE CHOCOLATE.', no:'Cleópatra levou suco e levou doce, e por isso parece certa. Mas ela se fantasiou de BATATA, e batata não é fruta. É a errada mais escondida das três.'},
  {t:'DIÓGENES, QUE SE FANTASIOU DE ABACATE E LEVOU LEITE E BOLACHA DE MAÇÃ.', no:'Diógenes se fantasiou de abacate, que é fruta, e levou bolacha, que é doce. Mas ele levou LEITE, e leite não é suco.'}
 ],
 dica:'São três regras, e as três têm de valer ao mesmo tempo. Confira uma regra de cada vez em cada criança e risque quem não passa.',
 truque:'Uma pista de cada vez. A cada pista, risque quem não passa. Quem sobrar é a resposta.',
 visual:'<div class="pcs"><span class="pc hit">BORGES</span><span class="arw">&rarr;</span><span class="pc hit">abacaxi &eacute; fruta</span><span class="pc hit">suco de melancia</span><span class="pc hit">brigadeiro &eacute; doce</span></div>'+
        '<div class="pcs"><span class="pc bad">ANDRESSA</span><span class="arw">&rarr;</span><span class="pc bad">pizza n&atilde;o &eacute; doce</span></div>'+
        '<div class="pcs"><span class="pc bad">CLE&Oacute;PATRA</span><span class="arw">&rarr;</span><span class="pc bad">batata n&atilde;o &eacute; fruta</span></div>'+
        '<div class="pcs"><span class="pc bad">DI&Oacute;GENES</span><span class="arw">&rarr;</span><span class="pc bad">leite n&atilde;o &eacute; suco</span></div>'+
        '<p class="vx">Cada errada cumpre <b>duas</b> regras e falha em <b>uma</b>. &Eacute; a que falha que decide.</p>',
 porque:'Borges cumpre as três regras do cartaz: fantasia de abacaxi, que é fruta; suco de melancia; e brigadeiro, que é doce. As outras três crianças cumprem só duas regras cada uma.',
 proximo:'Quando o cartaz manda cumprir três regras, confira as três em cada um. Não pare na primeira que der certo.'},

{id:'25F2Q11', eixo:'silabas', origem:'Olimpíada 2025 · 2ª fase · questão 11',
 enun:'OBSERVE AS FIGURAS:',
 quadro:'CACHORRO &nbsp;&ndash;&nbsp; NARIZ &nbsp;&ndash;&nbsp; BANANEIRA',
 nota:'Na prova aparecem três gravuras e é a criança que descobre os nomes: um cachorro, um nariz e uma bananeira. Aqui os nomes já vêm escritos.',
 pede:'USANDO APENAS A PRIMEIRA SÍLABA DOS NOMES DE CADA FIGURA, QUE NOVA PALAVRA PODEMOS FORMAR? DICA: AS SÍLABAS NÃO PRECISAM SEGUIR A MESMA ORDEM DAS FIGURAS.',
 opts:[
  {t:'CABELO.', no:'CABELO usa o CA do cachorro e depois pede BE e LO. As figuras dão BA e NA — o BE parece o BA, mas não é o mesmo pedaço, e LO não vem de figura nenhuma.'},
  {t:'CABANA.', ok:1},
  {t:'ARBUSTO.', no:'ARBUSTO é a pegadinha de quem olha a bananeira e diz "árvore". Nenhum pedaço de ARBUSTO — AR, BUS, TO — sai dos três nomes.'},
  {t:'CABINE.', no:'CABINE também começa com CA e depois pede BI e NE. A bananeira dá BA e o nariz dá NA: nem o BI nem o NE existem aqui.'}
 ],
 dica:'Fale o nome de cada figura batendo palma e guarde só o PRIMEIRO pedaço de cada uma. Depois experimente juntar os três em ordens diferentes.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc"><b>CA</b>CHORRO</span><span class="pc"><b>NA</b>RIZ</span><span class="pc"><b>BA</b>NANEIRA</span></div>'+
        '<p class="vx">O primeiro peda&ccedil;o de cada nome: <b>CA</b>, <b>NA</b>, <b>BA</b>.</p>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">BA</span><span class="pc hit">NA</span><span class="arw">&rarr;</span><span class="pc hit">CABANA</span></div>'+
        '<p class="vx">Na ordem das figuras dava CA-NA-BA. Trocando o NA com o BA sai <b>CABANA</b> &mdash; e a pr&oacute;pria prova avisa que pode trocar a ordem.</p>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc bad">BE</span><span class="pc bad">LO</span><span class="arw">&rarr;</span><span class="pc bad">BE e LO n&atilde;o vieram de figura nenhuma</span></div>',
 porque:'Os nomes das figuras são CACHORRO, NARIZ e BANANEIRA. Os primeiros pedaços são CA, NA e BA. Trocando a ordem, como a prova deixa, sai CA-BA-NA: CABANA.',
 proximo:'Diga o nome de cada figura e escreva o primeiro pedaço antes de olhar as alternativas. Errar o nome da figura derruba a questão inteira.'},

{id:'25F2Q12', eixo:'letras', origem:'Olimpíada 2025 · 2ª fase · questão 12',
 enun:'VAMOS BRINCAR DE CAÇAR PALAVRAS ESCONDIDAS? UMA PALAVRA ESTÁ ESCONDIDA QUANDO APARECE INTEIRA DENTRO DE OUTRA PALAVRA, SEM NENHUMA LETRA DIFERENTE NO MEIO. POR EXEMPLO, DENTRO DA PALAVRA TESOURO, ESTÁ ESCONDIDA A PALAVRA OURO.',
 pede:'DAS PALAVRAS ABAIXO, QUAL É A ÚNICA QUE NÃO ESCONDE NENHUMA OUTRA PALAVRA COM MAIS DE TRÊS LETRAS?',
 opts:[
  {t:'LONTRA.', ok:1},
  {t:'GAVIÃO.', no:'GAVIÃO esconde AVIÃO: tape o G do começo e leia o que sobra. AVIÃO tem cinco letras, mais de três — então GAVIÃO esconde, sim, e a pergunta quer quem NÃO esconde.'},
  {t:'PIOLHO.', no:'PIOLHO esconde OLHO: tape o PI do começo e sobra OLHO, com quatro letras. Achar a palavra escondida dá alegria e faz marcar rápido — mas a pergunta é ao contrário.'},
  {t:'SAPATO.', no:'SAPATO esconde PATO: tape o SA do começo e sobra PATO, com quatro letras. Também esconde, então também não serve.'}
 ],
 dica:'Cuidado: a pergunta é ao contrário, ela pede a palavra que NÃO esconde nada. Tape o começo de cada uma com o dedo e veja o que sobra.',
 truque:'Palavra escondida vem inteira e grudada, na ordem. Tape o começo e o fim com o dedo e leia o que sobrou.',
 visual:'<p class="vx"><span class="dm">G</span><b class="mk">AVI&Atilde;O</b> &nbsp;&middot;&nbsp; <span class="dm">PI</span><b class="mk">OLHO</b> &nbsp;&middot;&nbsp; <span class="dm">SA</span><b class="mk">PATO</b></p>'+
        '<p class="vx">Nas tr&ecirc;s, tapando o come&ccedil;o com o dedo sobra uma palavra inteira de quatro letras ou mais.</p>'+
        '<div class="pcs"><span class="pc hit">L</span><span class="pc hit">O</span><span class="pc hit">N</span><span class="pc hit">T</span><span class="pc hit">R</span><span class="pc hit">A</span></div>'+
        '<p class="vx">Em LONTRA nenhum peda&ccedil;o grudado forma palavra: ONT, NTRA, LONT... nada.</p>'+
        '<p class="vx"><span class="dm">A pergunta tem um N&Atilde;O. Quem esconde est&aacute; fora; quem sobra &eacute; a resposta.</span></p>',
 porque:'GAVIÃO esconde AVIÃO, PIOLHO esconde OLHO e SAPATO esconde PATO — as três escondem palavra de quatro letras ou mais. Só LONTRA não esconde nenhuma, e a pergunta pede justamente essa.',
 proximo:'Leia a pergunta duas vezes quando ela tiver um NÃO. Ache primeiro quem esconde e marque quem sobrou.'},

{id:'25F2Q13', eixo:'alfabeto', origem:'Olimpíada 2025 · 2ª fase · questão 13',
 enun:'ÁGATHA E ÚRSULA SÃO IRMÃS E GOSTAM DE ARRUMAR OS SEUS CINCO BICHINHOS DE PELÚCIA:',
 quadro:'GATO &ndash; COELHO &ndash; URSO &ndash; ESQUILO &ndash; BALEIA<div class="sep"></div>MAS CADA UMA FAZ DO SEU JEITO:'+
        '<div class="sep"></div>&bull; &Aacute;GATHA SEMPRE COLOCA OS BICHINHOS EM ORDEM ALFAB&Eacute;TICA.'+
        '<div class="sep"></div>&bull; &Uacute;RSULA SEMPRE COLOCA OS BICHINHOS NA ORDEM CONTR&Aacute;RIA &Agrave; DA IRM&Atilde;, OU SEJA, DE TR&Aacute;S PARA FRENTE.',
 pede:'QUAL BICHINHO FICA SEMPRE NA MESMA POSIÇÃO, TANTO NA ARRUMAÇÃO DE ÁGATHA QUANTO NA DE ÚRSULA?',
 opts:[
  {t:'BALEIA.', no:'BALEIA é a primeira da fila da Ágatha e a última da fila da Úrsula. Ela aparece nas duas filas, mas pula de uma ponta para a outra — aparecer nas duas não é ficar no mesmo lugar.'},
  {t:'ESQUILO.', ok:1},
  {t:'GATO.', no:'GATO é o primeiro nome que a prova escreve, e é por isso que parece o primeiro da fila. Mas na ordem alfabética ele é o quarto, e na fila de trás para frente vira o segundo.'},
  {t:'URSO.', no:'URSO faz o contrário da baleia: é o último na fila da Ágatha e o primeiro na da Úrsula. Também troca de ponta.'}
 ],
 dica:'Escreva a fila da Ágatha em ordem alfabética. Depois escreva a mesma fila de trás para frente, uma embaixo da outra, e compare lugar por lugar.',
 truque:'Escreva a fila em ordem alfabética e depois escreva a mesma fila de trás para frente, uma embaixo da outra. Só então compare.',
 visual:'<div class="pcs"><span class="pc">BALEIA</span><span class="pc">COELHO</span><span class="pc hit">ESQUILO</span><span class="pc">GATO</span><span class="pc">URSO</span></div>'+
        '<div class="pcs"><span class="pc">URSO</span><span class="pc">GATO</span><span class="pc hit">ESQUILO</span><span class="pc">COELHO</span><span class="pc">BALEIA</span></div>'+
        '<p class="vx">S&atilde;o cinco bichinhos, e o ESQUILO fica bem no <b>meio</b>. Quem est&aacute; no meio n&atilde;o sai do lugar quando a fila vira ao contr&aacute;rio.</p>',
 porque:'Em ordem alfabética a fila fica BALEIA, COELHO, ESQUILO, GATO, URSO. De trás para frente: URSO, GATO, ESQUILO, COELHO, BALEIA. O ESQUILO é o terceiro nas duas — é o do meio, e o do meio não se mexe.',
 proximo:'Escreva as duas filas uma embaixo da outra antes de responder. Com cinco nomes, fazer de cabeça é onde todo mundo se perde.'},

{id:'25F2Q14', eixo:'ler', origem:'Olimpíada 2025 · 2ª fase · questão 14',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['HOJE LETÍCIA VAI À FEIRA COM SUA MÃE COMPRAR BANANAS E MORANGOS.',
        'AMANHÃ IRÁ AO SUPERMERCADO COM SEU PAI COMPRAR VERDURAS E LEGUMES.',
        'ONTEM FOI DOMINGO, E ELA FICOU EM CASA MONTANDO QUEBRA-CABEÇA.'],
 pede:'EM QUAL DIA LETÍCIA IRÁ AO SUPERMERCADO COM O PAI?',
 opts:[
  {t:'SÁBADO.', no:'SÁBADO é o dia antes do domingo. A pergunta é sobre AMANHÃ, que é para a frente, não para trás.'},
  {t:'DOMINGO.', no:'DOMINGO é a única palavra de dia escrita no texto, e é por isso que atrai. Mas o texto diz que domingo foi ONTEM, e ontem ela ficou em casa montando quebra-cabeça.'},
  {t:'SEGUNDA-FEIRA.', no:'Se ontem foi domingo, hoje é segunda — essa parte está certa. Mas hoje ela vai à FEIRA com a MÃE. O supermercado com o pai é amanhã.'},
  {t:'TERÇA-FEIRA.', ok:1}
 ],
 dica:'Ache no texto o único dia que tem nome. Depois monte a fila: ontem, hoje, amanhã. E confira em qual dos três está o passeio com o PAI.',
 truque:'Monte a fila do tempo: semana passada, ontem, hoje, semana que vem. Só então responda.',
 acende:[1,2],
 visual:'<div class="pcs"><span class="pc">ONTEM<br>domingo<br>quebra-cabe&ccedil;a</span><span class="arw">&rarr;</span>'+
        '<span class="pc">HOJE<br>segunda<br>feira com a m&atilde;e</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">AMANH&Atilde;<br>ter&ccedil;a<br>supermercado com o pai</span></div>'+
        '<p class="vx">O &uacute;nico dia com nome est&aacute; no <b>fim</b> do texto: <b class="mk">ONTEM FOI DOMINGO</b>. A fila come&ccedil;a por ali.</p>',
 porque:'O texto diz que ONTEM foi domingo. Então hoje é segunda-feira e amanhã é terça-feira. E o supermercado com o pai é AMANHÃ: terça-feira.',
 proximo:'Ache o único dia que o texto nomeia, monte a fila ontem–hoje–amanhã e só então volte para ver qual passeio a pergunta pediu.'},

{id:'25F2Q15', eixo:'ler', origem:'Olimpíada 2025 · 2ª fase · questão 15',
 enun:'LEIA O POEMA O MENINO QUE CARREGAVA ÁGUA NA PENEIRA, DE MANOEL DE BARROS:',
 texto:['TENHO UM LIVRO SOBRE ÁGUAS E MENINOS.',
        'GOSTEI MAIS DE UM MENINO',
        'QUE CARREGAVA ÁGUA NA PENEIRA.',
        'A MÃE DISSE QUE CARREGAR ÁGUA NA PENEIRA',
        'ERA O MESMO QUE ROUBAR UM VENTO E',
        'SAIR CORRENDO COM ELE PARA MOSTRAR AOS IRMÃOS.',
        'A MÃE DISSE QUE ERA O MESMO',
        'QUE CATAR ESPINHOS NA ÁGUA.',
        'O MESMO QUE CRIAR PEIXES NO BOLSO.'],
 pede:'SEGUINDO A IDEIA DO POEMA, A ATITUDE DE CARREGAR ÁGUA NA PENEIRA SERIA O MESMO QUE:',
 opts:[
  {t:'CARREGAR AREIA NO BALDINHO.', no:'A palavra CARREGAR está no poema, e é ela que atrai. Mas carregar areia no baldinho dá certo: a areia fica dentro do balde. Os exemplos da mãe são coisas que NÃO dão certo.'},
  {t:'CRIAR MINHOCAS NA TERRA.', no:'A palavra CRIAR está no poema, e é ela que atrai. Mas minhoca mora na terra mesmo, então isso dá certo. No poema é CRIAR PEIXES NO BOLSO, que é o contrário: peixe não vive no bolso.'},
  {t:'ENCHER UM BALÃO FURADO.', ok:1},
  {t:'USAR O RELÓGIO PARADO.', no:'Um relógio parado não serve para nada, e por isso essa parece boa. Mas dele não escapa nada: ele só não anda. Nos exemplos do poema, o que a gente tenta segurar sempre foge.'}
 ],
 dica:'Olhe os três exemplos que a mãe deu. Pergunte de cada um: isso dá para fazer? E o que é que sempre escapa?',
 truque:'O que os três exemplos do texto têm de igual? A resposta certa faz a mesma coisa.',
 acende:[4,7,8],
 visual:'<div class="pcs"><span class="pc hit">ROUBAR UM VENTO</span><span class="pc hit">CATAR ESPINHOS NA &Aacute;GUA</span><span class="pc hit">CRIAR PEIXES NO BOLSO</span></div>'+
        '<p class="vx">Os tr&ecirc;s exemplos da m&atilde;e s&atilde;o coisas que <b>n&atilde;o d&atilde;o para fazer</b>: o que a gente tenta segurar sempre foge.</p>'+
        '<div class="pcs"><span class="pc hit">&aacute;gua na peneira</span><span class="arw">&rarr;</span><span class="pc hit">escorre pelos buracos</span></div>'+
        '<div class="pcs"><span class="pc hit">ar no bal&atilde;o furado</span><span class="arw">&rarr;</span><span class="pc hit">escapa pelo furo</span></div>'+
        '<p class="vx"><span class="dm">Carregar areia no baldinho e criar minhocas na terra d&atilde;o certo. Por isso n&atilde;o servem.</span></p>',
 porque:'A mãe compara carregar água na peneira com roubar um vento, catar espinhos na água e criar peixes no bolso: três coisas que não dão para fazer, porque o que se tenta guardar escapa. Encher um balão furado é assim — o ar sai pelo furo do mesmo jeito que a água escorre pelos buracos da peneira.',
 proximo:'Quando o texto dá três exemplos parecidos, ache o que eles têm de igual antes de olhar as alternativas. A certa vai repetir essa mesma ideia.'},


/* ===== reserva_2024F2 ===== */
{id:'24F2Q1', eixo:'contar', origem:'Olimpíada 2024 · 2ª fase · questão 1',
 pede:'QUAL DAS PALAVRAS ABAIXO TEM MAIS SÍLABAS?',
 opts:[
  {t:'GUARDANAPO', no:'GUARDANAPO tem as mesmas 10 letras de APOSENTADO e parece a maior das quatro. Mas bate palma: GUAR-DA-NA-PO, quatro pedaços. O GUAR é um pedaço só, e é aí que a conta encurta.'},
  {t:'APOSENTADO', ok:1},
  {t:'BÁRBARO', no:'BÁRBARO tem acento e cara de palavra difícil, mas bate palma: BÁR-BA-RO, três pedaços.'},
  {t:'PORTUGUÊS', no:'PORTUGUÊS é o nome da prova, e por isso a mão vai nela. Bate palma: POR-TU-GUÊS, três pedaços.'}
 ],
 dica:'Bata palma em cada palavra, uma de cada vez, e ponha um pontinho para cada palma. Não conte letra: conte palma.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">A</span><span class="pc hit">PO</span><span class="pc hit">SEN</span><span class="pc hit">TA</span><span class="pc hit">DO</span><span class="arw">&rarr;</span><span class="pc hit">5 palmas</span></div>'+
        '<div class="pcs"><span class="pc bad">GUAR</span><span class="pc bad">DA</span><span class="pc bad">NA</span><span class="pc bad">PO</span><span class="arw">&rarr;</span><span class="pc bad">4 palmas</span></div>'+
        '<p class="vx">As duas t&ecirc;m <b>10 letras</b>. Mas <b>GUAR</b> &eacute; um peda&ccedil;o s&oacute;: letra n&atilde;o &eacute; a mesma coisa que peda&ccedil;o.</p>'+
        '<div class="pcs"><span class="pc bad">B&Aacute;R BA RO</span><span class="pc bad">POR TU GU&Ecirc;S</span><span class="arw">&rarr;</span><span class="pc bad">3 e 3</span></div>',
 porque:'A-PO-SEN-TA-DO tem cinco pedaços. GUAR-DA-NA-PO tem quatro, BÁR-BA-RO tem três e POR-TU-GUÊS tem três. A maior é APOSENTADO.',
 proximo:'Nunca escolha pela palavra mais comprida no papel. Bata palma nas quatro e compare os pontinhos.'},

{id:'24F2Q2', eixo:'intruso', origem:'Olimpíada 2024 · 2ª fase · questão 2',
 pede:'QUAL DAS PALAVRAS ABAIXO NÓS USAMOS PARA DIZER QUE ALGO ESTÁ PERTO?',
 opts:[
  {t:'LONGE', no:'LONGE é a palavra mais conhecida da lista, e o olho para nela primeiro. Mas ela diz o contrário de perto.'},
  {t:'PRÓXIMO', ok:1},
  {t:'AFASTADO', no:'AFASTADO diz a mesma coisa que LONGE: quem se afastou foi para longe. Como é palavra menos usada, dá vontade de marcar por parecer difícil.'},
  {t:'DISTANTE', no:'DISTANTE também diz longe. Repare que LONGE, AFASTADO e DISTANTE dizem todas a mesma coisa — três iguais não podem ser a resposta.'}
 ],
 dica:'Leia as quatro e veja quais dizem a mesma coisa. Sobra uma sozinha — e é ela que a pergunta quer.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc bad">LONGE</span><span class="pc bad">AFASTADO</span><span class="pc bad">DISTANTE</span><span class="arw">&rarr;</span><span class="pc bad">as tr&ecirc;s dizem LONGE</span></div>'+
        '<div class="pcs"><span class="pc hit">PR&Oacute;XIMO</span><span class="arw">&rarr;</span><span class="pc hit">PERTO</span></div>'+
        '<p class="vx">Tr&ecirc;s dizem a mesma coisa. A que fica sozinha &eacute; a resposta.</p>',
 porque:'PRÓXIMO é o jeito de dizer que uma coisa está perto. LONGE, AFASTADO e DISTANTE dizem todas o contrário — e três palavras iguais nunca são a resposta de uma pergunta só.',
 proximo:'Quando três alternativas dizem a mesma coisa, a resposta é a quarta. Junte as parecidas antes de escolher.'},

{id:'24F2Q3', eixo:'ler', origem:'Olimpíada 2024 · 2ª fase · questão 3',
 enun:'LEIA UM TRECHO DO POEMA AS ESTAÇÕES, DE OLAVO BILAC:',
 texto:['SOU A ESTAÇÃO DO FRIO;','O CÉU ESTÁ SOMBRIO,','E O SOL NÃO TEM CALOR.',
        'QUE VENTO NOS CAMINHOS!','TRAGO A TRISTEZA AOS NINHOS,','E TRAGO A MORTE À FLOR.',
        'HÁ NEVOA NO HORIZONTE,','NO CAMPO E SOBRE O MONTE,','NO VALE E SOBRE O MAR.',
        'OS PÁSSAROS SE ENCOLHEM,','OS VELHOS SE RECOLHEM','À CASA A TIRITAR.'],
 pede:'DE QUAL ESTAÇÃO DO ANO ESSE TRECHO FALA?',
 opts:[
  {t:'PRIMAVERA', no:'A palavra FLOR aparece no poema e puxa para a primavera. Mas leia a linha inteira: o poema TRAZ A MORTE À FLOR, ou seja, acaba com as flores.'},
  {t:'VERÃO', no:'A palavra SOL aparece, e é a isca. Mas a linha inteira diz que O SOL NÃO TEM CALOR — o poema fala de sol sem calor, que é o contrário de verão.'},
  {t:'INVERNO', ok:1},
  {t:'OUTONO', no:'Essa é a mais difícil de riscar: no outono também venta e as folhas caem. Mas o poema diz na primeira linha SOU A ESTAÇÃO DO FRIO, e no fim as pessoas entram em casa a tiritar, que é tremer de frio. Isso é o frio mais forte do ano.'}
 ],
 dica:'A resposta está escrita logo na primeira linha. Volte com a régua e leia a linha inteira, não só uma palavra.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[0,2,11],
 visual:'<p class="vx"><b class="mk">SOU A ESTA&Ccedil;&Atilde;O DO FRIO</b> &middot; <b class="mk">O SOL N&Atilde;O TEM CALOR</b> &middot; <b class="mk">&Agrave; CASA A TIRITAR</b></p>'+
        '<p class="vx">Tiritar &eacute; tremer de frio. As tr&ecirc;s linhas juntas s&oacute; podem ser o <b>inverno</b>.</p>'+
        '<p class="vx"><span class="dm">A palavra FLOR puxa para a primavera e a palavra SOL puxa para o ver&atilde;o. As duas est&atilde;o no poema &mdash; e as duas est&atilde;o dentro de uma linha que diz o contr&aacute;rio.</span></p>',
 porque:'A primeira linha já entrega: SOU A ESTAÇÃO DO FRIO. E o resto confirma — sol sem calor, vento, névoa, os velhos entrando em casa a tiritar, que é tremer de frio. É o inverno.',
 proximo:'Nunca decida por uma palavra solta que você viu no meio do poema. Leia a linha inteira em que a palavra mora.'},

{id:'24F2Q4', eixo:'letras', origem:'Olimpíada 2024 · 2ª fase · questão 4',
 pede:'QUAL DAS PALAVRAS ABAIXO NÃO TEM AS MESMAS LETRAS QUE AS OUTRAS?',
 opts:[
  {t:'ACERTO', no:'ACERTO usa A, C, E, R, T e O. Escreva ARCOTE embaixo e vá riscando: são exatamente as mesmas seis letras, só em outra ordem.'},
  {t:'ARCOTE', no:'ARCOTE é a palavra mais esquisita da lista e por isso parece a intrusa. Mas escreva e vá riscando: A, R, C, O, T, E são as mesmas seis letras de ACERTO.'},
  {t:'CERATO', no:'CERATO também é palavra estranha, e também usa as mesmas seis letras: C, E, R, A, T, O. Estranha no ouvido não quer dizer diferente nas letras.'},
  {t:'CENTRO', ok:1}
 ],
 dica:'As quatro têm seis letras. Escreva uma embaixo da outra e vá riscando letra por letra: alguma vai pedir uma letra que as outras não têm.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc hit">A C E R T O</span><span class="pc hit">A R C O T E</span><span class="pc hit">C E R A T O</span></div>'+
        '<p class="vx">As tr&ecirc;s usam as mesmas seis letras: <b>A C E R T O</b>. S&oacute; muda a ordem.</p>'+
        '<div class="pcs"><span class="pc bad">C E <b>N</b> T R O</span><span class="arw">&rarr;</span><span class="pc bad">tem N e n&atilde;o tem A</span></div>'+
        '<p class="vx">Uma letra de diferen&ccedil;a em seis, bem no meio da palavra, onde a gente confere menos.</p>',
 porque:'ACERTO, ARCOTE e CERATO usam as mesmas seis letras: A, C, E, R, T, O. CENTRO trocou o A por um N — é a única diferente.',
 proximo:'CENTRO é a única palavra conhecida das quatro, e é justamente ela a intrusa. Confira as letras uma por uma; não confie no que parece familiar.'},

{id:'24F2Q5', eixo:'intruso', origem:'Olimpíada 2024 · 2ª fase · questão 5',
 enun:'A MITOLOGIA GREGA É MUITO INTERESSANTE! LEIA O TRECHO ADAPTADO DE CLAUDE POUZADOUX SOBRE HÉRACLES, UM HERÓI GREGO:',
 quadro:'H&Eacute;RACLES, TAMB&Eacute;M CONHECIDO COMO H&Eacute;RCULES, FOI O HER&Oacute;I MAIS POPULAR DA GR&Eacute;CIA. PRESTOU GRANDES SERVI&Ccedil;OS AOS HOMENS, LIVRANDO-OS DE MONSTROS QUE CAUSAVAM NUMEROSOS ESTRAGOS. POR ISSO, OS GREGOS N&Atilde;O PARARAM DE CELEBRAR SEUS FEITOS.'+
        '<div class="sep"></div>BASTAVA V&Ecirc;-LO PARA PERCEBER SUA FOR&Ccedil;A: ELE ERA <b>COLOSSAL</b>. ESSE TAMANHO FORA DO COMUM, H&Eacute;RACLES HERDOU DO PAI. DE FATO, ERA FILHO DE ZEUS COM UMA MORTAL, ALCMENA.',
 pede:'QUAL PALAVRA MELHOR SUBSTITUI A PALAVRA COLOSSAL?',
 opts:[
  {t:'PEQUENO.', no:'Ponha PEQUENO no lugar e leia: ELE ERA PEQUENO. Aí vem a frase seguinte, ESSE TAMANHO FORA DO COMUM — as duas brigam.'},
  {t:'GIGANTE.', ok:1},
  {t:'MINÚSCULO.', no:'MINÚSCULO é ainda menor que pequeno. Quem chuta pelo som da palavra COLOSSAL, sem voltar ao texto, pode cair aqui.'},
  {t:'BONITO.', no:'Essa é a mais escondida: BONITO é um elogio e combina com herói. Mas a pista do texto é a palavra TAMANHO, e bonito não fala de tamanho.'}
 ],
 dica:'Você não precisa saber o que é COLOSSAL. Tire a palavra, ponha a nova e leia a frase seguinte: ela dá a pista.',
 truque:'Tire a palavra velha, ponha a nova, leia a frase de novo. Continua dizendo a mesma coisa?',
 visual:'<p class="vx">ELE ERA <b class="mk">COLOSSAL</b>. ESSE <b class="mk">TAMANHO FORA DO COMUM</b>...</p>'+
        '<p class="vx">ELE ERA <b class="mk">GIGANTE</b> <span class="dm">&mdash; continua dizendo a mesma coisa</span></p>'+
        '<p class="vx">ELE ERA <b class="bad2">BONITO</b> <span class="dm">&mdash; &eacute; elogio, mas n&atilde;o fala de tamanho</span></p>',
 porque:'A frase seguinte explica a palavra: ESSE TAMANHO FORA DO COMUM. Somando com BASTAVA VÊ-LO PARA PERCEBER SUA FORÇA, COLOSSAL só pode querer dizer enorme — GIGANTE.',
 proximo:'Quando não conhecer a palavra, leia a frase de antes e a de depois. A pista quase sempre está grudada nela.'},

{id:'24F2Q6', eixo:'buraco', origem:'Olimpíada 2024 · 2ª fase · questão 6',
 pede:'MARQUE A ALTERNATIVA QUE PREENCHE CORRETAMENTE A LACUNA DO TEXTO ABAIXO:',
 quadro:'HOJE, A TURMA DE JULIANA N&Atilde;O TEVE AULA DE PORTUGU&Ecirc;S. A PROFESSORA N&Atilde;O P&Ocirc;DE IR POR MOTIVOS DE SA&Uacute;DE. ELA ESTAVA MUITO <span class="bl">____________</span> E PRECISOU FICAR EM CASA, PARA REPOUSAR.',
 opts:[
  {t:'GRIPADA', ok:1},
  {t:'CONTENTE', no:'CONTENTE encaixa na frase e não faz a leitura tropeçar — é por isso que engana. Mas quem está contente não precisa ficar em casa descansando, e o texto diz que o motivo foi de saúde.'},
  {t:'APRESSADA', no:'APRESSADA também encaixa na frase. Só que quem está com pressa sai correndo; não fica em casa repousando.'},
  {t:'BRAVA', no:'BRAVA é a mais atraente das erradas: dá para imaginar alguém que não foi trabalhar de tão brava. Mas ficar brava não é coisa de saúde e não pede repouso.'}
 ],
 dica:'As pistas estão dos dois lados do buraco: POR MOTIVOS DE SAÚDE vem antes, PARA REPOUSAR vem depois. As duas têm de fechar.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">POR MOTIVOS DE SA&Uacute;DE</span> &middot;&middot;&middot; buraco &middot;&middot;&middot; <span class="mk">PRECISOU FICAR EM CASA, PARA REPOUSAR</span></p>'+
        '<p class="vx">ESTAVA MUITO <b class="mk">GRIPADA</b> <span class="dm">&mdash; as duas pistas fecham</span></p>'+
        '<p class="vx">ESTAVA MUITO <b class="bad2">BRAVA</b> <span class="dm">&mdash; encaixa na frase, mas n&atilde;o &eacute; sa&uacute;de e n&atilde;o pede repouso</span></p>',
 porque:'A frase diz que ela não foi POR MOTIVOS DE SAÚDE e que precisou ficar em casa PARA REPOUSAR. Só GRIPADA é uma coisa de saúde que faz a pessoa descansar.',
 proximo:'Encaixar na frase não basta: três das quatro encaixavam. Confira se a palavra fecha com as pistas dos DOIS lados do buraco.'},

{id:'24F2Q7', eixo:'intruso', origem:'Olimpíada 2024 · 2ª fase · questão 7',
 enun:'QUANDO QUEREMOS DIZER QUE ALGUMA COISA É MUITO GRANDE OU IMPORTANTE, GERALMENTE COLOCAMOS UM "ÃO" OU "ONA" NO FINAL DA PALAVRA, COMO EM "LEGALZÃO" OU "LEGALZONA".',
 pede:'EM QUAL DAS PALAVRAS ABAIXO O FINAL NÃO SEGUE ESSA REGRA?',
 opts:[
  {t:'CARRÃO.', no:'CARRÃO é um carro grande: dá para ouvir CARRO dentro dele. Segue a regra do enunciado.'},
  {t:'GRANDÃO.', no:'GRANDÃO é uma coisa muito grande, e dentro dele está GRANDE. Segue a regra.'},
  {t:'VERÃO.', ok:1},
  {t:'MENINÃO.', no:'MENINÃO é um menino grande, e dentro dele está MENINO. Segue a regra.'}
 ],
 dica:'As quatro terminam igual, então o fim não decide nada. Tire o ÃO de cada uma e veja se sobra uma palavra que você conhece.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">CARR&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">CARRO</span></div>'+
        '<div class="pcs"><span class="pc hit">GRAND&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">GRANDE</span></div>'+
        '<div class="pcs"><span class="pc hit">MENIN&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">MENINO</span></div>'+
        '<div class="pcs"><span class="pc bad">VER&Atilde;O</span><span class="arw">&rarr;</span><span class="pc bad">VER?</span></div>'+
        '<p class="vx">Nos tr&ecirc;s primeiros d&aacute; para ouvir a palavra pequena dentro da grande. Em VER&Atilde;O n&atilde;o d&aacute;: ver&atilde;o n&atilde;o &eacute; um <b>ver</b> grande, &eacute; o nome do tempo quente do ano.</p>',
 porque:'Em CARRÃO, GRANDÃO e MENINÃO dá para achar a palavra de dentro: carro, grande, menino. Em VERÃO não sobra palavra nenhuma — verão é o nome de uma parte do ano, e o ÃO faz parte do nome.',
 proximo:'Quando as quatro terminam igual, o fim não decide. Faça a mesma conta nas quatro e ache aquela em que a conta não funciona.'},

{id:'24F2Q8', eixo:'silabas', origem:'Olimpíada 2024 · 2ª fase · questão 8',
 enun:'ESTE É O NOME DE UM ANIMALZINHO MUITO CONHECIDO:',
 nota:'Na prova aparece o desenho de um sapo e é a criança que descobre o nome. Aqui o nome já vem escrito.',
 quadro:'SAPO',
 pede:'QUAL DAS PALAVRAS ABAIXO NÃO TEM AS SÍLABAS DO NOME DO ANIMAL ACIMA?',
 opts:[
  {t:'RAPOSA', no:'RAPOSA é outro bicho, e isso desvia a atenção. Mas bata palma: RA-PO-SA. O PO está lá e o SA está lá — tem os dois pedaços do sapo.'},
  {t:'SAPATO', ok:1},
  {t:'SARAMPO', no:'SA-RAM-PO tem um RAM no meio que não vem do sapo, e é por isso que dá vontade de marcar. Mas a pergunta só quer saber se SA e PO estão lá — e estão os dois.'},
  {t:'POROSA', no:'POROSA é palavra pouco conhecida e atrai por ser estranha. Bata palma: PO-RO-SA. O PO está lá e o SA está lá.'}
 ],
 dica:'Bata palma no nome do bicho: SA-PO, dois pedaços. Agora bata palma em cada palavra e procure esses dois pedaços dentro dela.',
 truque:'Bata palma no nome da figura e guarde os pedaços. Depois procure esses pedaços dentro de cada palavra.',
 visual:'<div class="pcs"><span class="pc">SA</span><span class="pc">PO</span><span class="arw">&rarr;</span><span class="pc hit">os dois peda&ccedil;os do nome</span></div>'+
        '<div class="pcs"><span class="pc hit">RA <b>PO</b> <b>SA</b></span><span class="pc hit"><b>SA</b> RAM <b>PO</b></span><span class="pc hit"><b>PO</b> RO <b>SA</b></span></div>'+
        '<div class="pcs"><span class="pc bad"><b>SA</b> PA TO</span><span class="arw">&rarr;</span><span class="pc bad">tem SA, n&atilde;o tem PO</span></div>'+
        '<p class="vx">SAPATO &eacute; a que mais parece SAPO na escrita &mdash; e &eacute; justamente a que falta um peda&ccedil;o. O segundo peda&ccedil;o dela &eacute; <b>PA</b>, n&atilde;o PO.</p>',
 porque:'O nome do bicho é SA-PO. RA-PO-SA, SA-RAM-PO e PO-RO-SA têm os dois pedaços. SA-PA-TO tem o SA, mas o segundo pedaço dele é PA: não tem PO.',
 proximo:'A palavra mais parecida na escrita não é a que tem os pedaços. Bata palma e confira pedaço por pedaço, não letra por letra.'},

{id:'24F2Q9', eixo:'silabas', origem:'Olimpíada 2024 · 2ª fase · questão 9',
 enun:'LEIA A CONVERSA ABAIXO:',
 texto:['— JÚLIA, JÚLIA! VOCÊ NÃO SABE O QUE ACONTECEU ONTEM!',
        '— O QUÊ? O QUÊ?',
        '— VI UM GRUPO DE AMIGOS PASSEANDO NO PARQUE, BEM CEDINHO. ELES ESTAVAM ANDANDO PRÓXIMOS AO RIO, ONDE ESTÁ CHEIO DE BURACOS, QUANDO UM DELES TROPEÇOU E ROLOU ABAIXO. MACHUCOU-SE TODO.',
        '— E O QUE OS OUTROS FIZERAM PELO COITADO? APOSTO QUE FICARAM PARADOS, ESPERANDO ALGUÉM AJUDAR.',
        '— CLARO QUE NÃO, ELES FORAM CORRER!'],
 pede:'ACRESCENTANDO UMA SÍLABA NO COMEÇO DE UMA DAS PALAVRAS DA ÚLTIMA FRASE, MUDAMOS A HISTÓRIA, FAZENDO COM QUE OS AMIGOS AJUDEM A PESSOA QUE CAIU. QUAL É A SÍLABA QUE DEVEMOS COLOCAR?',
 opts:[
  {t:'CON-', no:'CON + CORRER dá CONCORRER, que é uma palavra de verdade: é disputar, brigar por um lugar. Ela existe, mas ninguém ajuda ninguém concorrendo.'},
  {t:'DE-', no:'DE + CORRER dá DECORRER, que também existe: é o tempo passando. Existir não basta — a pergunta pede a palavra que faz os amigos ajudarem.'},
  {t:'PER-', no:'PER + CORRER dá PERCORRER, que existe também: é andar por um caminho inteiro. De novo, andar pelo caminho não é socorrer o amigo caído.'},
  {t:'SO-', ok:1}
 ],
 dica:'A última frase é ELES FORAM CORRER. Cole cada pedaço na frente de CORRER e leia em voz alta o que saiu.',
 truque:'Cole cada pedaço na frente da palavra e leia o que saiu. Só serve se a palavra existir E disser o que a pergunta pediu.',
 visual:'<div class="pcs"><span class="pc">SO</span><span class="arw">&rarr;</span><span class="pc hit">SO CORRER</span></div>'+
        '<p class="vx">ELES FORAM <b>SOCORRER</b>: foram ajudar quem se machucou. A hist&oacute;ria muda.</p>'+
        '<div class="pcs"><span class="pc bad">CON CORRER</span><span class="pc bad">DE CORRER</span><span class="pc bad">PER CORRER</span></div>'+
        '<p class="vx">As tr&ecirc;s existem de verdade, e &eacute; por isso que enganam. Nenhuma delas quer dizer <b>ajudar</b>.</p>',
 porque:'Colando SO na frente de CORRER sai SOCORRER, que é ir ajudar quem se machucou. Fica ELES FORAM SOCORRER — a história muda como a pergunta pediu.',
 proximo:'Quando a pergunta manda montar uma palavra, faça duas perguntas: essa palavra existe? e ela diz o que a pergunta pediu? As duas têm de dar sim.'},

{id:'24F2Q10', eixo:'intruso', origem:'Olimpíada 2024 · 2ª fase · questão 10',
 enun:'O CACHORRO DE DUDA ACABOU DE PICOTAR A REVISTA SOBRE PROFISSÕES QUE ELA ESTAVA LENDO. NOS PEDACINHOS QUE SOBRARAM, SÓ ALGUMAS PALAVRAS ESTAVAM LEGÍVEIS:',
 quadro:'ANIMAIS &ndash; CUIDAR &ndash; CL&Iacute;NICA &ndash; VACINA &ndash; DOENTES &ndash; CACHORRO &ndash; FAZENDA &ndash; EXAME',
 pede:'SOBRE QUAL PROFISSÃO DUDA ESTAVA LENDO?',
 opts:[
  {t:'PROFESSOR.', no:'Nenhuma das oito palavras fala de escola, de aula ou de aluno. Essa dava para riscar logo na primeira pista.'},
  {t:'MÉDICO.', no:'Essa é a armadilha montada. MÉDICO explica CLÍNICA, VACINA, DOENTES, EXAME e CUIDAR — cinco palavras das oito. Mas ANIMAIS, CACHORRO e FAZENDA ficam de fora, e quem para quando a maioria fecha marca esta.'},
  {t:'ADVOGADO.', no:'Nada na lista tem a ver com advogado. É a alternativa do chute.'},
  {t:'MÉDICO VETERINÁRIO.', ok:1}
 ],
 dica:'São oito palavras, e todas as oito são pistas. Vá riscando quem não explica cada uma; quem sobrar no fim é a resposta.',
 truque:'Uma pista de cada vez. A cada pista, risque quem não passa. Quem sobrar é a resposta.',
 visual:'<div class="pcs"><span class="pc hit">CL&Iacute;NICA</span><span class="pc hit">VACINA</span><span class="pc hit">DOENTES</span><span class="pc hit">EXAME</span><span class="pc hit">CUIDAR</span><span class="arw">&rarr;</span><span class="pc hit">m&eacute;dico</span></div>'+
        '<div class="pcs"><span class="pc hit">ANIMAIS</span><span class="pc hit">CACHORRO</span><span class="pc hit">FAZENDA</span><span class="arw">&rarr;</span><span class="pc hit">bichos</span></div>'+
        '<p class="vx">S&oacute; o <b>m&eacute;dico veterin&aacute;rio</b> junta as duas metades da lista.</p>'+
        '<p class="vx"><span class="dm">M&Eacute;DICO explica cinco palavras das oito e deixa tr&ecirc;s de fora. Parar a&iacute; &eacute; o erro.</span></p>',
 porque:'CLÍNICA, VACINA, DOENTES, EXAME e CUIDAR são de médico. ANIMAIS, CACHORRO e FAZENDA são de bicho. Só o médico veterinário explica as oito palavras ao mesmo tempo.',
 proximo:'Use TODAS as palavras da lista, não a maioria. Se sobrou palavra sem explicação, a sua resposta ainda não é a certa.'},

{id:'24F2Q11', eixo:'ler', origem:'Olimpíada 2024 · 2ª fase · questão 11',
 enun:'LEIA UM TRECHO DO POEMA BONS E MAUS NEGÓCIOS, DE JOSÉ PAULO PAES:',
 texto:['FABRICANTES DE CALÇADOS','GANHARIAM DINHEIRO E FICARIAM GRATOS','ÀS CENTOPEIAS SE ELAS USASSEM SAPATOS',
        'DENTISTAS E PROTÉTICOS','VIVERIAM NA MAIOR FARTURA','SE OS JACARÉS USASSEM DENTADURA',
        'LOJAS DE ARTIGOS DE INVERNO','TERIAM MUITO MAIS LUGAR AO SOL','SE AS GIRAFAS USASSEM CACHECOL',
        'FARMÁCIAS DO MUNDO INTEIRO','TERIAM O LUCRO QUE LHES COMPETE','________________________________'],
 pede:'USANDO A MESMA IDEIA DO POEMA, QUE ALTERNATIVA COMPLETA A ESTROFE ABAIXO?',
 opts:[
  {t:'SE CACHORROS USASSEM PATINETE', no:'PATINETE rima com COMPETE, e essa parte está certa. Mas o cachorro não tem nenhuma parte do corpo grande demais, e patinete não é coisa que se compre na farmácia. A rima sozinha não resolve.'},
  {t:'SE OS GALOS FUGISSEM DO POLEIRO', no:'POLEIRO rima com INTEIRO, que é a PRIMEIRA linha da estrofe. No poema quem rima com quem é a última linha com a do meio: GRATOS/SAPATOS, FARTURA/DENTADURA, SOL/CACHECOL.'},
  {t:'SE OS URSOS USASSEM CAPACETE', no:'CAPACETE também rima com COMPETE. Mas capacete não se compra na farmácia, e o urso não tem uma parte do corpo enorme que faça a farmácia vender mais.'},
  {t:'SE COELHOS USASSEM COTONETE', ok:1}
 ],
 dica:'São duas pistas ao mesmo tempo. Uma: a última linha rima com a do meio. Outra: o bicho tem uma parte do corpo grande demais que faz aquela loja vender muito.',
 truque:'Uma pista de cada vez. A cada pista, risque quem não passa. Quem sobrar é a resposta.',
 acende:[2,5,8],
 visual:'<div class="pcs"><span class="pc hit">CENTOPEIA<br>muitos p&eacute;s</span><span class="arw">&rarr;</span><span class="pc hit">SAPATOS</span></div>'+
        '<div class="pcs"><span class="pc hit">JACAR&Eacute;<br>muitos dentes</span><span class="arw">&rarr;</span><span class="pc hit">DENTADURA</span></div>'+
        '<div class="pcs"><span class="pc hit">GIRAFA<br>pesco&ccedil;o comprido</span><span class="arw">&rarr;</span><span class="pc hit">CACHECOL</span></div>'+
        '<div class="pcs"><span class="pc hit">COELHO<br>orelhas enormes</span><span class="arw">&rarr;</span><span class="pc hit">COTONETE</span></div>'+
        '<p class="vx">E o fim tem de rimar com <b>COMPETE</b>: COTON<b>ETE</b>. <span class="dm">PATINETE e CAPACETE tamb&eacute;m rimam &mdash; a rima risca s&oacute; o POLEIRO. Quem decide o resto &eacute; a farm&aacute;cia.</span></p>',
 porque:'No poema, o bicho tem uma parte do corpo exagerada que faria aquela loja vender muito: centopeia e sapatos, jacaré e dentadura, girafa e cachecol. O coelho tem orelhas enormes, e cotonete se compra na farmácia. E COTONETE rima com COMPETE.',
 proximo:'Quando a questão pede duas coisas ao mesmo tempo, confira as duas em cada alternativa. Passar em uma só não é passar.'},

{id:'24F2Q12', eixo:'contar', origem:'Olimpíada 2024 · 2ª fase · questão 12',
 enun:'MARCELO ESTÁ DE FÉRIAS E FOI SE DIVERTIR NA PISCINA.',
 pede:'QUAL É A PALAVRA QUE MELHOR REPRESENTA O SOM DE QUANDO MARCELO CAI NA ÁGUA?',
 opts:[
  {t:'NHOM NHOM.', no:'NHOM NHOM é o barulho de quem está comendo. Fale em voz alta e escute: não tem nada de água aí.'},
  {t:'TCHIBUM.', ok:1},
  {t:'TIRIRIRIRIM.', no:'TIRIRIRIRIM é barulho de musiquinha, daquelas que tocam quando alguém ganha alguma coisa.'},
  {t:'CREC.', no:'CREC é a errada mais forte: é barulho de pancada, de coisa quebrando ou rangendo. Quem pensa só em "bateu" marca esta e esquece que o Marcelo bateu na ÁGUA.'}
 ],
 dica:'As quatro são barulhos de verdade. Fale cada uma em voz alta e pergunte: esse barulho é de quê?',
 truque:'Quando a pergunta fala de SOM, fale as palavras em voz alta e escute. Olhar não resolve.',
 visual:'<div class="pcs"><span class="pc hit">TCHIBUM</span><span class="arw">&rarr;</span><span class="pc hit">algu&eacute;m caindo na &aacute;gua</span></div>'+
        '<div class="pcs"><span class="pc bad">NHOM NHOM</span><span class="arw">&rarr;</span><span class="pc bad">comendo</span></div>'+
        '<div class="pcs"><span class="pc bad">TIRIRIRIRIM</span><span class="arw">&rarr;</span><span class="pc bad">musiquinha</span></div>'+
        '<div class="pcs"><span class="pc bad">CREC</span><span class="arw">&rarr;</span><span class="pc bad">coisa quebrando</span></div>',
 porque:'TCHIBUM é o barulho de alguém caindo ou pulando na água. As outras três também são barulhos de verdade, mas de outras cenas: comer, musiquinha e coisa quebrando.',
 proximo:'A pergunta não é se a palavra é um barulho: é de QUE cena ela é. Ligue cada barulho à sua cena antes de marcar.'},

{id:'24F2Q13', eixo:'buraco', origem:'Olimpíada 2024 · 2ª fase · questão 13',
 enun:'JOÃOZINHO ENCONTROU UMA CARTA ANTIGA DA SUA AVÓ PARA O SEU AVÔ, QUANDO ERAM JOVENS NAMORADOS, MAS ALGUNS PEDAÇOS DE PALAVRAS HAVIAM SIDO COMIDOS PELAS TRAÇAS. LEIA UM TRECHO DA CARTA:',
 quadro:'QUERI<span class="bl"></span> BARTOLOMEU,<div class="sep"></div>ESCREVO, PORQUE N&Oacute;S COMBINA<span class="bl"></span> DE NOS ENCONTRAR, E VOC&Ecirc; N&Atilde;O APARE<span class="bl"></span>. ACONTECEU ALGUMA COISA COM VO<span class="bl"></span>? AINDA POSSO CONTAR COM O NOSSO PR&Oacute;XIMO ENCONTRO?',
 pede:'QUAL É A ALTERNATIVA QUE MELHOR COMPLETA OS PEDAÇOS QUE ESTÃO FALTANDO, EM ORDEM?',
 opts:[
  {t:'DO - MOS - SEU - SE.', no:'Essa é a mais capciosa: acerta os DOIS primeiros buracos (QUERIDO, COMBINAMOS) e só descarrila depois, escrevendo APARESEU e VOSE, com S no lugar do C. Fala igual, escreve errado — e quem confere só o começo marca esta.'},
  {t:'DA - RAM - RAM - CÊ.', no:'Erra logo no primeiro buraco: QUERIDA é de menina, e a carta é para BARTOLOMEU. Depois põe COMBINARAM, mas quem combinou foi NÓS. Só o CÊ do fim está certo, e é ele que engana quem confere só a última.'},
  {t:'DO - MOS - CEU - CÊ.', ok:1},
  {t:'DO - RAM - CEMOS - CÊ.', no:'Acerta o primeiro e o último e erra os dois do meio, onde a atenção já caiu: COMBINARAM (quem combinou foi NÓS) e APARECEMOS (quem não apareceu foi VOCÊ, não nós).'}
 ],
 dica:'São quatro buracos, e cada um se decide sozinho. Em cada um, pergunte: para quem é a carta? quem fez essa coisa?',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<div class="pcs"><span class="pc hit">QUERI + DO</span><span class="arw">&rarr;</span><span class="pc hit">a carta &eacute; para BARTOLOMEU</span></div>'+
        '<div class="pcs"><span class="pc hit">COMBINA + MOS</span><span class="arw">&rarr;</span><span class="pc hit">quem combinou foi N&Oacute;S</span></div>'+
        '<div class="pcs"><span class="pc hit">APARE + CEU</span><span class="arw">&rarr;</span><span class="pc hit">quem n&atilde;o apareceu foi VOC&Ecirc;</span></div>'+
        '<div class="pcs"><span class="pc hit">VO + C&Ecirc;</span></div>'+
        '<p class="vx"><span class="dm">A alternativa DO - MOS - SEU - SE acerta os dois primeiros e escreve APARE<b>SEU</b> e VO<b>SE</b>, com S no lugar do C.</span></p>',
 porque:'A carta é para Bartolomeu, então é QUERIDO. Quem combinou foi NÓS: COMBINAMOS. Quem não apareceu foi VOCÊ: APARECEU. E o último buraco fecha VOCÊ.',
 proximo:'Buraco por buraco, do primeiro ao último. A alternativa errada costuma acertar as pontas e errar o meio.'},

{id:'24F2Q14', eixo:'contar', origem:'Olimpíada 2024 · 2ª fase · questão 14',
 enun:'CERTA ESCOLA DECIDIU FAZER UM ANÚNCIO AOS ALUNOS PELOS ALTO-FALANTES, MAS ELES ESTÃO COM UM PROBLEMA DE CHIADO, EM QUE OS SONS DE S SAEM MUITO CARREGADOS, POR EXEMPLO: A PALAVRA ACENTO SOA COMO ASSSENTO.',
 quadro:'FORAM CEDIDOS NOVOS LIVROS &Agrave; BIBLIOTECA QUE EST&Atilde;O DISPON&Iacute;VEIS PARA EMPR&Eacute;STIMO.',
 pede:'NA FRASE ABAIXO, QUE A ESCOLA COMUNICOU PELOS ALTO-FALANTES, QUANTOS CHIADOS OS ALUNOS PODERÃO OUVIR?',
 opts:[
  {t:'7', no:'Sete é o número de letras S da frase — e é onde para quem conta só o S. Mas o enunciado avisa: em ACENTO quem chia é o C. O C de CEDIDOS chia igual, e ele é o oitavo.'},
  {t:'8', ok:1},
  {t:'9', no:'Nove é o que dá somando as sete letras S com os DOIS C da frase. Só que o C de BIBLIOTECA soa como K, não chia. Tirando esse, sobram oito.'},
  {t:'10', no:'Dez é chiado a mais. A frase tem sete letras S e dois C; mesmo somando tudo dá nove. Para chegar a dez é preciso contar um som que não existe.'}
 ],
 dica:'Não conte a letra S: conte o barulho de chiado. Ponha um pontinho em cada chiado, palavra por palavra, e some no fim. Lembre que o C pode chiar.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">CEDIDOS<br>2</span><span class="pc hit">NOVOS<br>1</span><span class="pc hit">LIVROS<br>1</span><span class="pc hit">EST&Atilde;O<br>1</span><span class="pc hit">DISPON&Iacute;VEIS<br>2</span><span class="pc hit">EMPR&Eacute;STIMO<br>1</span></div>'+
        '<p class="vx">Somando os pontinhos: 2 + 1 + 1 + 1 + 2 + 1 = <b>8</b>.</p>'+
        '<p class="vx">Na frase h&aacute; <b>7 letras S</b>. O oitavo chiado &eacute; o <b>C de CEDIDOS</b>, igual ao C de ACENTO do exemplo.</p>'+
        '<p class="vx"><span class="dm">O C de BIBLIOTECA soa como K: esse n&atilde;o chia. FORAM, &Agrave;, QUE e PARA n&atilde;o t&ecirc;m chiado nenhum.</span></p>',
 porque:'Contando o barulho e não a letra: CEDIDOS 2 (o C do começo e o S do fim), NOVOS 1, LIVROS 1, ESTÃO 1, DISPONÍVEIS 2 (o S do meio e o S do fim), EMPRÉSTIMO 1. Total: 8.',
 proximo:'Faça a conta palavra por palavra, escrevendo o número embaixo de cada uma, e só some no fim. Contar tudo de cabeça é onde a conta se perde.'},


/* ===== reserva_2023F1 ===== */
{id:'23F1Q1', eixo:'contar', origem:'Olimpíada 2023 · 1ª fase · questão 1',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 pede:'QUE FRASE TEM MAIS VOGAIS?',
 opts:[
  {t:'EU AMO A OLIMPÍADA DE PORTUGUÊS!', ok:1},
  {t:'A LÍNGUA PORTUGUESA É BELA!', no:'LÍNGUA e PORTUGUESA são palavras carregadas de vogal, e é por isso que ela engana. Mas contando a frase inteira dá 12, e a certa dá 15.'},
  {t:'EU GOSTO MUITO DE FALAR!', no:'MUITO tem três vogais grudadas e chama a atenção. Só que a frase toda dá 10: EU 2, GOSTO 2, MUITO 3, DE 1, FALAR 2. É a que tem menos de todas.'},
  {t:'NOSSAS VIDAS NUNCA MAIS SERÃO AS MESMAS!', no:'É a frase mais comprida das quatro, e quem chuta pelo tamanho marca esta. Mas comprida não quer dizer cheia de vogal: contando uma por uma dá 14, e a certa dá 15. Perde por uma.'}
 ],
 dica:'Vogal é A, E, I, O, U — e as que estão com chapeuzinho ou tracinho em cima também contam: Í, Ê, Á, Ã. Ponha um pontinho embaixo de cada uma.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">EU AMO A OLIMP&Iacute;ADA DE PORTUGU&Ecirc;S!</span><span class="arw">&rarr;</span><span class="pc hit">15</span></div>'+
        '<div class="pcs"><span class="pc bad">NOSSAS VIDAS NUNCA MAIS SER&Atilde;O AS MESMAS!</span><span class="arw">&rarr;</span><span class="pc bad">14</span></div>'+
        '<p class="vx">A de baixo &eacute; mais <b>comprida</b> e mesmo assim tem <b>menos</b> vogal. Comprida n&atilde;o &eacute; a mesma coisa que cheia de vogal.</p>'+
        '<p class="vx"><span class="dm">A L&Iacute;NGUA PORTUGUESA &Eacute; BELA! d&aacute; 12 &middot; EU GOSTO MUITO DE FALAR! d&aacute; 10</span></p>',
 porque:'Contando uma por uma, EU AMO A OLIMPÍADA DE PORTUGUÊS! tem 15 vogais. A frase mais comprida, a das VIDAS, tem 14. As outras duas têm 12 e 10. Ganha por uma vogal só.',
 proximo:'Não escolha pela frase mais comprida. Faça o pontinho em cada vogal, some frase por frase e só compare os números no fim.'},

{id:'23F1Q2', eixo:'buraco', origem:'Olimpíada 2023 · 1ª fase · questão 2',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 pede:'MARQUE A ALTERNATIVA QUE CONTÉM A PALAVRA CERTA PARA COMPLETAR A FRASE ABAIXO:',
 quadro:'ONTEM, &Agrave; NOITE, <span class="bl">____</span> CACHORROS DA VIZINHA N&Atilde;O PARAVAM DE LATIR.',
 opts:[
  {t:'O', no:'Leia a frase inteira: "O CACHORROS DA VIZINHA". Ela tropeça. O é de um só, e CACHORROS tem S no fim: são vários.'},
  {t:'AS', no:'Essa é a armadilha. AS acerta a parte dos vários, e quem só escuta o S marca aqui. Mas AS é de menina, e cachorro é de menino.'},
  {t:'OS', ok:1},
  {t:'UM', no:'UM é de um só. "UM CACHORROS" não é jeito de falar nem de escrever, porque a palavra depois do buraco está com S.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. Repare no S do fim de CACHORROS: é um só ou são vários?',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><b class="mk">OS</b> CACHORROS <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><b class="bad2">AS</b> CACHORROS <span class="dm">&mdash; acerta os v&aacute;rios, erra o menino</span></p>'+
        '<p class="vx"><b class="bad2">O</b> CACHORROS <span class="dm">&mdash; acerta o menino, erra os v&aacute;rios</span></p>'+
        '<p class="vx">A palavrinha da frente tem de acertar as <b>duas</b> coisas ao mesmo tempo.</p>',
 porque:'CACHORROS tem S no fim: são vários. E cachorro é de menino. A palavrinha tem de ser de vários E de menino ao mesmo tempo, e só OS é as duas coisas.',
 proximo:'Antes de marcar, faça as duas perguntas: é um só ou são vários? é de menino ou de menina? A errada costuma acertar só uma delas.'},

{id:'23F1Q3', eixo:'ler', origem:'Olimpíada 2023 · 1ª fase · questão 3',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['DEPOIS DE UM DIA DE TRABALHO, AUGUSTO CHEGOU',
        'A CASA COM UMA FOME DE LEÃO.',
        'ABRIU A GELADEIRA, VIU O ARROZ E O FEIJÃO DE ONTEM,',
        'MAS NÃO QUIS COMER NADA DISSO.',
        'NA MESA, HAVIA PÃES E ALGUMAS BOLACHAS,',
        'MAS TAMBÉM NÃO QUIS.',
        'PROCUROU PELA COZINHA E ENCONTROU UMA LINDA MAÇÃ,',
        'QUE ESTAVA NA FRUTEIRA, SOBRE O BALCÃO.',
        'AUGUSTO COMEU A MAÇÃ E FOI DESCANSAR.'],
 pede:'O QUE AUGUSTO COMEU QUANDO CHEGOU DO TRABALHO?',
 opts:[
  {t:'MAÇÃ', ok:1},
  {t:'FEIJÃO', no:'FEIJÃO está escrito no texto, e é só por isso que atrai. Leia a linha inteira: ele VIU o feijão na geladeira, e a linha seguinte diz que não quis comer nada disso.'},
  {t:'PÃO', no:'Os pães estavam na mesa, é verdade. Mas logo embaixo vem MAS TAMBÉM NÃO QUIS. Ver a comida não é comer a comida.'},
  {t:'BOLACHA', no:'As bolachas estavam na mesa junto com os pães, e a mesma linha diz que ele não quis. Achar a palavra no texto não basta: é preciso ler o que a linha diz dela.'}
 ],
 dica:'As quatro comidas estão todas escritas no texto. A pergunta não é o que ele VIU: é o que ele COMEU. Procure com a régua a linha que tem a palavra COMEU.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[3,5,8],
 visual:'<p class="vx">VIU O ARROZ E O FEIJ&Atilde;O <b class="bad2">MAS N&Atilde;O QUIS COMER NADA DISSO</b></p>'+
        '<p class="vx">HAVIA P&Atilde;ES E ALGUMAS BOLACHAS <b class="bad2">MAS TAMB&Eacute;M N&Atilde;O QUIS</b></p>'+
        '<p class="vx">AUGUSTO <b class="mk">COMEU A MA&Ccedil;&Atilde;</b> E FOI DESCANSAR</p>'+
        '<p class="vx">S&oacute; uma linha tem a palavra <b>COMEU</b>. As outras t&ecirc;m <b>N&Atilde;O QUIS</b>.</p>',
 porque:'O texto conta as comidas que Augusto viu e recusou, uma por uma. Só uma linha diz o que ele comeu: "AUGUSTO COMEU A MAÇÃ E FOI DESCANSAR".',
 proximo:'Não marque a palavra só porque ela apareceu no texto. Leia a linha inteira: ela pode estar dizendo que NÃO.'},

{id:'23F1Q4', eixo:'intruso', origem:'Olimpíada 2023 · 1ª fase · questão 4',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 pede:'QUE PALAVRA NÃO COMEÇA COM O MESMO SOM DAS DEMAIS?',
 opts:[
  {t:'GELO', no:'Fale em voz alta: GE-LO. Esse começo soa igual ao de GELADEIRA e ao de GENERAL. Se três palavras começam com o mesmo som, nenhuma das três pode ser a diferente.'},
  {t:'GELADEIRA', no:'GELADEIRA é a palavra mais comprida da lista e chama a atenção por isso. Mas comprida não tem nada a ver com som: o começo dela soa igualzinho ao de GELO.'},
  {t:'GENERAL', no:'Essa é a pegadinha grande. GELO e GELADEIRA são coisas de frio e GENERAL não é — dá vontade de marcar por causa disso. Só que a pergunta é sobre SOM, e GENERAL começa com o mesmo som de GELO.'},
  {t:'GUERRA', ok:1}
 ],
 dica:'Aqui não adianta olhar: as quatro começam com a letra G. Fale as quatro em voz alta, baixinho, e escute só o comecinho de cada uma.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">GELO</span><span class="pc hit">GELADEIRA</span><span class="pc hit">GENERAL</span><span class="arw">&rarr;</span><span class="pc hit">mesmo som</span></div>'+
        '<div class="pcs"><span class="pc bad">GUERRA</span><span class="arw">&rarr;</span><span class="pc bad">som de GATO</span></div>'+
        '<p class="vx">As quatro come&ccedil;am com a mesma <b>letra</b>. S&oacute; que em GUERRA vem um <b>U</b> depois do G, e a&iacute; o som muda.</p>',
 porque:'GELO, GELADEIRA e GENERAL começam com o mesmo som, o som que se ouve no começo de JANELA. Em GUERRA vem um U depois do G e o som fica igual ao de GATO. É a única diferente.',
 proximo:'Quando a pergunta falar de SOM, fale as palavras em voz alta e escute. E não decida pelo assunto: a palavra que fala de outra coisa nem sempre é a do som diferente.'},

{id:'23F1Q5', eixo:'buraco', origem:'Olimpíada 2023 · 1ª fase · questão 5',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 pede:'MARQUE A ALTERNATIVA QUE COMPLETA A FRASE:',
 quadro:'HOJE, PELA MANH&Atilde;, AJUDEI MINHA M&Atilde;E A CORTAR BATATA, ABOBRINHA, CENOURA, BETERRABA E TOMATE, PARA QUE ELA PUDESSE COZINHAR UMA DELICIOSA <span class="bl">____________</span> PARA O ALMO&Ccedil;O.',
 opts:[
  {t:'PIZZA', no:'É a mais forte das erradas: pizza é comida, é gostosa e a frase até anda com ela dentro. Mas ninguém faz pizza cozinhando beterraba, abobrinha e cenoura picadas numa panela.'},
  {t:'SOPA', ok:1},
  {t:'BOLO', no:'Bolo é comida, mas a frase diz UMA DELICIOSA e teria de ser "um delicioso bolo" — a frase tropeça. E ninguém corta beterraba, abobrinha e tomate para fazer bolo de almoço.'},
  {t:'BRINCADEIRA', no:'Brincadeira combina com UMA DELICIOSA no jeito de falar, e é só isso que ela acerta. Mas não se cozinha brincadeira, e ninguém pica legumes para brincar.'}
 ],
 dica:'A frase dá três pistas: são legumes cortados, a mãe vai COZINHAR e é para o ALMOÇO. Ponha cada palavra no buraco e leia tudo de novo, do começo.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">BATATA, ABOBRINHA, CENOURA, BETERRABA E TOMATE</span> ... <span class="mk">COZINHAR</span> ... <span class="mk">PARA O ALMO&Ccedil;O</span></p>'+
        '<p class="vx">As tr&ecirc;s pistas t&ecirc;m de fechar ao mesmo tempo. S&oacute; a sopa fecha as tr&ecirc;s.</p>'+
        '<p class="vx"><span class="dm">A PIZZA fecha duas e para na terceira: legume picado na panela n&atilde;o vira pizza.</span></p>',
 porque:'Batata, abobrinha, cenoura, beterraba e tomate são legumes cortados, e a mãe vai COZINHAR para o ALMOÇO. As três pistas fecham só com SOPA.',
 proximo:'Leia a frase inteira com a palavra dentro. Se uma parte da frase brigar, essa não é — mesmo que as outras partes combinem direitinho.'},

{id:'23F1Q6', eixo:'contar', origem:'Olimpíada 2023 · 1ª fase · questão 6',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'JULINHO ESCREVEU UMA FRASE, MAS SE ESQUECEU DE COLOCAR ESPAÇO ENTRE AS PALAVRAS. VEJA COMO ELA FICOU:',
 quadro:'UMGRANDES&Aacute;BIODISSEQUENADASABIASOBREAVIDAESOBREELEMESMO.',
 pede:'QUANTOS ESPAÇOS DEVEMOS COLOCAR ENTRE AS PALAVRAS PARA CORRIGIR A FRASE DE JULINHO?',
 opts:[
  {t:'10', no:'Dez fica três abaixo do certo. Para chegar em dez seria preciso colar três pares de palavras — ler NADASABIA, ELEMESMO e SOBREA como se cada um fosse uma palavra só.'},
  {t:'11', no:'Onze fica dois abaixo. É o resultado de quem lê depressa e cola duas duplas no caminho, como SOBRE A e E SOBRE: cada dupla colada come um espaço.'},
  {t:'12', no:'Doze é o erro mais comum, e falta só um. Basta engolir uma palavrinha curta — o A de SOBRE A VIDA ou o E de VIDA E SOBRE — para a conta cair de 13 para 12.'},
  {t:'13', ok:1}
 ],
 dica:'Primeiro separe a frase e conte as PALAVRAS com o dedo, uma por uma. Depois lembre: entre duas palavras vai um espaço só, e depois do ponto final não vai espaço nenhum.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc">UM</span><span class="pc">GRANDE</span><span class="pc">S&Aacute;BIO</span><span class="pc">DISSE</span><span class="pc">QUE</span><span class="pc">NADA</span><span class="pc">SABIA</span><span class="pc">SOBRE</span><span class="pc bad">A</span><span class="pc">VIDA</span><span class="pc bad">E</span><span class="pc">SOBRE</span><span class="pc">ELE</span><span class="pc">MESMO</span></div>'+
        '<p class="vx">S&atilde;o <b>14</b> palavras. As duas em destaque s&atilde;o as que somem quando a gente l&ecirc; r&aacute;pido: o <b>A</b> e o <b>E</b>, sozinhos no meio da frase.</p>'+
        '<div class="pcs"><span class="pc hit">14 palavras</span><span class="arw">&rarr;</span><span class="pc hit">13 espa&ccedil;os</span></div>'+
        '<p class="vx">O espa&ccedil;o mora <b>entre</b> duas palavras. Por isso ele &eacute; sempre <b>um a menos</b> que o n&uacute;mero de palavras.</p>',
 porque:'Separando, a frase é UM GRANDE SÁBIO DISSE QUE NADA SABIA SOBRE A VIDA E SOBRE ELE MESMO. São 14 palavras, e o espaço fica entre duas: 14 menos 1 dá 13.',
 proximo:'Conte as palavras primeiro e só depois tire um. E não engula as palavrinhas de uma letra só: o A e o E também pedem o seu espaço.'},

{id:'23F1Q7', eixo:'silabas', origem:'Olimpíada 2023 · 1ª fase · questão 7',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas — aqui ela está com quatro, como na prova de hoje, e o desenho da prova, uma borboleta, vem com o nome escrito.',
 pede:'QUE ALTERNATIVA CONTÉM APENAS AS SÍLABAS DO DESENHO ABAIXO?',
 quadro:'O DESENHO &Eacute; UMA <b>BORBOLETA</b>.',
 opts:[
  {t:'BOR - TA - LE - BOR', no:'Bata palma no nome: BOR-BO-LE-TA. São quatro pedaços diferentes. Esta usa BOR duas vezes e deixa o BO de fora. Cada peça vale uma vez só.'},
  {t:'LE - TA - LE - BOR', no:'Esta repete o LE e também esquece o BO. Ela traz BOR e TA certinhos, e é aí que engana: quem confere só duas peças acha que está tudo bem.'},
  {t:'BOR - LE - TAR - BO', no:'Aqui as quatro peças são diferentes, e por isso ela parece a certa. Mas TAR não existe em BOR-BO-LE-TA: o pedaço é TA, sem R. O R já foi usado lá no BOR.'},
  {t:'BO - LE - TA - BOR', ok:1}
 ],
 dica:'Diga o nome do desenho e bata palma em cada pedaço. Escreva os quatro pedaços num canto do papel ANTES de olhar as alternativas.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">BOR</span><span class="pc">BO</span><span class="pc">LE</span><span class="pc">TA</span><span class="arw">&rarr;</span><span class="pc hit">quatro pe&ccedil;as</span></div>'+
        '<div class="pcs"><span class="pc hit">BO</span><span class="pc hit">LE</span><span class="pc hit">TA</span><span class="pc hit">BOR</span><span class="arw">&rarr;</span><span class="pc hit">as quatro, uma vez cada</span></div>'+
        '<div class="pcs"><span class="pc bad">BOR</span><span class="pc bad">TA</span><span class="pc bad">LE</span><span class="pc bad">BOR</span><span class="arw">&rarr;</span><span class="pc bad">dois BOR, nenhum BO</span></div>'+
        '<p class="vx">E cuidado com o <b>TAR</b>: em BOR-BO-LE-TA o &uacute;ltimo peda&ccedil;o &eacute; <b>TA</b>. O R ficou l&aacute; atr&aacute;s, grudado no BOR.</p>',
 porque:'O desenho é uma BORBOLETA: BOR-BO-LE-TA. As peças são BOR, BO, LE e TA. Só uma alternativa traz essas quatro, uma vez cada: BO - LE - TA - BOR.',
 proximo:'Escreva os pedaços do nome antes de olhar as respostas. Depois risque um pedaço para cada peça da alternativa: se sobrar ou faltar, essa não é.'},

{id:'23F1Q8', eixo:'contar', origem:'Olimpíada 2023 · 1ª fase · questão 8',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'COMPLETE A FRASE COM "R" OU COM "RR":',
 quadro:'SONHEI QUE MEU PAI DI<span class="bl">___</span>IGIA UM CA<span class="bl">___</span>O QUANDO VIU UM <span class="bl">___</span>ATO <span class="bl">___</span>OENDO A <span class="bl">___</span>OUPA DO <span class="bl">___</span>EI DE <span class="bl">___</span>OMA.',
 pede:'QUANTAS VEZES A LETRA "R" APARECE NA FRASE?',
 opts:[
  {t:'7', no:'Sete é o número de buracos da frase, e é exatamente por isso que atrai. Mas um dos buracos leva DOIS R, o de CARRO. Buraco não é a mesma coisa que letra.'},
  {t:'8', ok:1},
  {t:'9', no:'Nove sai de quem dobrou o R numa palavra além de CARRO. RATO, ROENDO, ROUPA, REI e ROMA começam com R, e no começo da palavra o som já é forte com um R só.'},
  {t:'10', no:'Dez sai de quem dobrou o R em duas palavras além de CARRO. No começo de palavra nunca se escreve RR: seria RRATO, RROMA, e isso não existe.'}
 ],
 dica:'Preencha os sete buracos primeiro e escreva a frase inteira. Só depois ponha um pontinho embaixo de cada R e conte os pontinhos.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">DI<b>R</b>IGIA</span><span class="pc hit">CA<b>RR</b>O</span><span class="pc hit"><b>R</b>ATO</span><span class="pc hit"><b>R</b>OENDO</span><span class="pc hit"><b>R</b>OUPA</span><span class="pc hit"><b>R</b>EI</span><span class="pc hit"><b>R</b>OMA</span></div>'+
        '<p class="vx">1 + <b>2</b> + 1 + 1 + 1 + 1 + 1 = <b>8</b></p>'+
        '<p class="vx">S&atilde;o <b>7 buracos</b> e <b>8 letras R</b>: o buraco de CARRO leva dois.</p>'+
        '<p class="vx"><span class="dm">S&oacute; CARRO pede RR, porque ali o R forte est&aacute; espremido entre duas vogais. No come&ccedil;o da palavra basta um R.</span></p>',
 porque:'Preenchendo os buracos: DIRIGIA, CARRO, RATO, ROENDO, ROUPA, REI, ROMA. Só CARRO leva RR. Somando as letras: 1+2+1+1+1+1+1 = 8.',
 proximo:'Conte a coisa que a pergunta pediu. Aqui ela pediu LETRAS, e não buracos — e um buraco pode levar duas letras.'},

{id:'23F1Q10', eixo:'silabas', origem:'Olimpíada 2023 · 1ª fase · questão 10',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas — aqui ela está com quatro, como na prova de hoje, e os quatro desenhos da prova, um coração, um castelo, uma boca e uma faca, vêm com os nomes escritos.',
 pede:'QUE PALAVRA PODEMOS MONTAR USANDO APENAS A SEGUNDA SÍLABA DE CADA FIGURA?',
 quadro:'AS QUATRO FIGURAS S&Atilde;O:<div class="sep"></div>CORA&Ccedil;&Atilde;O &ndash; CASTELO &ndash; BOCA &ndash; FACA',
 opts:[
  {t:'CARÁTER', no:'CA e RA existem no monte de peças, e é por isso que ela quase fecha. Mas TER não sai de nenhuma figura, e ainda ficam de fora o TE e um dos CA.'},
  {t:'BOLOTECA', no:'BO e LO existem nos nomes, só que no lugar errado: BO é o PRIMEIRO pedaço de BO-CA e LO é o último de CAS-TE-LO. A pergunta pede o segundo pedaço de cada uma.'},
  {t:'CARATECA', ok:1},
  {t:'TERAPIA', no:'TE e RA são peças de verdade, e o começo dá certo. Mas PI e A não saem de nenhuma figura, e os dois CA ficam sobrando na mesa.'}
 ],
 dica:'Bata palma no nome de cada figura e pegue só o SEGUNDO pedaço. Escreva as quatro peças num canto antes de olhar as respostas.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">CO</span><span class="pc hit">RA</span><span class="pc">&Ccedil;&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">RA</span></div>'+
        '<div class="pcs"><span class="pc">CAS</span><span class="pc hit">TE</span><span class="pc">LO</span><span class="arw">&rarr;</span><span class="pc hit">TE</span></div>'+
        '<div class="pcs"><span class="pc">BO</span><span class="pc hit">CA</span><span class="arw">&rarr;</span><span class="pc hit">CA</span></div>'+
        '<div class="pcs"><span class="pc">FA</span><span class="pc hit">CA</span><span class="arw">&rarr;</span><span class="pc hit">CA</span></div>'+
        '<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">RA</span><span class="pc hit">TE</span><span class="pc hit">CA</span></div>'+
        '<p class="vx">As quatro pe&ccedil;as, uma vez cada, com a ordem trocada: <b>CARATECA</b>.</p>',
 porque:'O segundo pedaço de cada figura: CO-RA-ÇÃO dá RA, CAS-TE-LO dá TE, BO-CA dá CA e FA-CA dá CA. Com RA, TE, CA e CA monta-se CA-RA-TE-CA.',
 proximo:'Escreva as peças antes de olhar as respostas e confira se a palavra escolhida usa TODAS, sem deixar nenhuma sobrando na mesa.'},

{id:'23F1Q11', eixo:'letras', origem:'Olimpíada 2023 · 1ª fase · questão 11',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'MUDANDO A ORDEM DAS LETRAS DE UMA PALAVRA, PODEMOS FORMAR OUTRAS PALAVRAS. POR EXEMPLO: SE MUDARMOS A ORDEM DAS LETRAS DA PALAVRA "ALEGRIA", PODEMOS ESCREVER "ALERGIA", "REGALIA" E "GALERIA".',
 pede:'QUE ALTERNATIVA TEM SOMENTE PALAVRAS QUE PODEMOS FORMAR COM AS LETRAS DA PALAVRA ABAIXO?',
 quadro:'TERNO',
 opts:[
  {t:'TENRO, NORTE, TENOR E TORNE.', ok:1},
  {t:'NORTE, TEMOR, TEMPO E TORNE.', no:'NORTE e TORNE estão certas, e é por isso que ela engana. Mas TEMOR pede um M, e TEMPO pede um M e um P: nenhuma dessas letras existe em TERNO. Uma palavra errada derruba a alternativa inteira.'},
  {t:'NORTE, TENOR, TORNE E TRONO', no:'As três primeiras estão certas, e a armadilha fina é a última: TRONO precisa de DOIS O, e em TERNO o O aparece uma vez só.'},
  {t:'TENRO, NORTE, TENOR E TORNO.', no:'Também acerta as três primeiras e cai na última: TORNO pede DOIS O, e TERNO só tem um. É preciso contar as letras repetidas, não só reconhecê-las.'}
 ],
 dica:'Escreva T, E, R, N, O num canto do papel. Para cada palavra, risque uma letra do canto por letra dela: se pedir letra que não está lá, ou pedir a mesma duas vezes, essa alternativa caiu.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">T</span><span class="pc">E</span><span class="pc">R</span><span class="pc">N</span><span class="pc">O</span><span class="arw">&rarr;</span><span class="pc hit">uma de cada</span></div>'+
        '<div class="pcs"><span class="pc hit">TENRO</span><span class="pc hit">NORTE</span><span class="pc hit">TENOR</span><span class="pc hit">TORNE</span></div>'+
        '<p class="vx">As quatro usam exatamente T, E, R, N e O.</p>'+
        '<div class="pcs"><span class="pc bad">TE<b>M</b>OR</span><span class="pc bad">TE<b>MP</b>O</span><span class="arw">&rarr;</span><span class="pc bad">M e P n&atilde;o existem em TERNO</span></div>'+
        '<div class="pcs"><span class="pc bad">TR<b>O</b>N<b>O</b></span><span class="pc bad">T<b>O</b>RN<b>O</b></span><span class="arw">&rarr;</span><span class="pc bad">dois O, e TERNO tem um s&oacute;</span></div>',
 porque:'TERNO dá as letras T, E, R, N e O, uma de cada. TENRO, NORTE, TENOR e TORNE usam exatamente essas cinco. As outras alternativas pedem um M, um P ou um segundo O.',
 proximo:'Confira TODAS as palavras da alternativa, até a última. Uma palavra errada no fim derruba a alternativa inteira.'},

{id:'23F1Q12', eixo:'intruso', origem:'Olimpíada 2023 · 1ª fase · questão 12',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'PODEMOS TRANSFORMAR ALGUMAS PALAVRAS EM OUTRAS MUDANDO SOMENTE A SUA PRIMEIRA LETRA. POR EXEMPLO, SE MUDARMOS A PRIMEIRA LETRA DA PALAVRA "FAMA", PODEMOS TER A PALAVRA "DAMA", OU AINDA "LAMA".',
 pede:'QUE PALAVRA ABAIXO NÃO PODEMOS TRANSFORMAR EM OUTRA SE MUDARMOS APENAS A PRIMEIRA LETRA?',
 opts:[
  {t:'OLHO', no:'OLHO é a pegadinha mais forte, porque começa com vogal e ninguém pensa em trocar vogal por vogal. Mas tire o O e ponha um A: vira ALHO, o tempero da comida.'},
  {t:'FRÁGIL', ok:1},
  {t:'FARTO', no:'FARTO é palavra pouco usada, e por isso parece que não tem par. Mas troque o F pelo P e ela vira PARTO, que é a hora em que o bebê nasce.'},
  {t:'BROCA', no:'BROCA também é palavra pouco conhecida — é a pecinha que a furadeira usa para furar. Mas troque o B pelo T e ela vira TROCA.'}
 ],
 dica:'Tape a primeira letra com o dedo e leia só o resto. Depois vá passando as letras do alfabeto na frente do resto e escute se aparece alguma palavra de verdade.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit"><b>O</b>LHO</span><span class="arw">&rarr;</span><span class="pc hit"><b>A</b>LHO</span></div>'+
        '<div class="pcs"><span class="pc hit"><b>F</b>ARTO</span><span class="arw">&rarr;</span><span class="pc hit"><b>P</b>ARTO</span></div>'+
        '<div class="pcs"><span class="pc hit"><b>B</b>ROCA</span><span class="arw">&rarr;</span><span class="pc hit"><b>T</b>ROCA</span></div>'+
        '<div class="pcs"><span class="pc bad"><b>F</b>R&Aacute;GIL</span><span class="arw">&rarr;</span><span class="pc bad">R&Aacute;GIL n&atilde;o vira nada</span></div>'+
        '<p class="vx">As tr&ecirc;s de cima viram outra palavra. S&oacute; a de baixo n&atilde;o vira &mdash; e &eacute; ela que a pergunta pede.</p>',
 porque:'OLHO vira ALHO, FARTO vira PARTO e BROCA vira TROCA. Só FRÁGIL não vira nada: nenhuma letra na frente de RÁGIL forma palavra.',
 proximo:'Antes de marcar, tente de verdade trocar a primeira letra de cada uma. A palavra que você não conhece costuma ter par escondido.'},

{id:'23F1Q13', eixo:'intruso', origem:'Olimpíada 2023 · 1ª fase · questão 13',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'ALGUMAS PALAVRAS PODEM SER IGUAIS, MAS, EM UMA MESMA FRASE, PODEM TAMBÉM TER SIGNIFICADOS DIFERENTES. VEJA O EXEMPLO:',
 quadro:'DESENHEI A <b>FOLHA</b> DA &Aacute;RVORE EM UMA <b>FOLHA</b> DE PAPEL.',
 pede:'EM QUE FRASE ABAIXO AS PALAVRAS DESTACADAS SÃO IGUAIS, MAS NÃO TÊM SIGNIFICADOS DIFERENTES?',
 opts:[
  {t:'COMI UMA <b>MANGA</b> BEM DOCINHA, MAS ACABEI MANCHANDO A <b>MANGA</b> DA MINHA CAMISETA.', no:'Aqui MANGA aparece duas vezes querendo dizer coisas diferentes: a primeira é a fruta que se come, a segunda é a parte da camiseta que cobre o braço. A pergunta pede o contrário disso.'},
  {t:'FUI AO <b>BANCO</b> SACAR DINHEIRO, E A ATENDENTE PEDIU QUE EU ME SENTASSE NO <b>BANCO</b> RESERVADO AOS IDOSOS.', no:'BANCO de guardar dinheiro e BANCO de sentar são duas coisas bem diferentes. É um exemplo tão bonito que dá vontade de marcar — mas o enunciado tem um NÃO no meio.'},
  {t:'TIVE MUITA <b>PENA</b> DO POBRE PASSARINHO, PORQUE ELE PERDEU A SUA ÚLTIMA <b>PENA</b>.', no:'A primeira PENA é dó, tristeza pelo passarinho. A segunda é a peninha que cobre o corpo dele. Duas coisas diferentes outra vez.'},
  {t:'EU GOSTO DE LER <b>LIVROS</b>, MAS ULTIMAMENTE NÃO TENHO TIDO TEMPO PARA LER OS <b>LIVROS</b> QUE GANHEI DA MINHA MÃE.', ok:1}
 ],
 dica:'Leia o enunciado devagar: ele tem um NÃO. Você está procurando a frase em que a palavra repetida quer dizer A MESMA COISA nas duas vezes.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc bad">MANGA fruta</span><span class="pc bad">MANGA da camiseta</span></div>'+
        '<div class="pcs"><span class="pc bad">BANCO de dinheiro</span><span class="pc bad">BANCO de sentar</span></div>'+
        '<div class="pcs"><span class="pc bad">PENA de d&oacute;</span><span class="pc bad">PENA do passarinho</span></div>'+
        '<div class="pcs"><span class="pc hit">LIVROS de ler</span><span class="pc hit">LIVROS de ler</span></div>'+
        '<p class="vx">Nas tr&ecirc;s de cima a palavra repetida quer dizer <b>duas coisas</b>. S&oacute; embaixo ela quer dizer <b>a mesma coisa</b> nas duas vezes &mdash; e o enunciado tem um <b>N&Atilde;O</b>.</p>',
 porque:'Nas outras três, a palavra repetida quer dizer duas coisas diferentes. Em LIVROS, as duas vezes falam do mesmo livro de ler. E o enunciado pede justamente a frase em que a palavra NÃO muda de sentido.',
 proximo:'Quando o enunciado tiver um NÃO, sublinhe esse NÃO antes de olhar as alternativas. Ele vira a pergunta do avesso.'},

{id:'23F1Q14', eixo:'ler', origem:'Olimpíada 2023 · 1ª fase · questão 14',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'LEIA A FÁBULA A ASSEMBLEIA DOS RATOS, ESCRITA POR MONTEIRO LOBATO:',
 texto:['UM GATO DE NOME FARO-FINO DEU DE FAZER TAL DESTROÇO',
        'NA RATARIA DE UMA CASA VELHA QUE OS SOBREVIVENTES,',
        'SEM ÂNIMO DE SAIR DAS TOCAS,',
        'ESTAVAM A PONTO DE MORRER DE FOME.',
        'TORNANDO-SE MUITO SÉRIO O CASO,',
        'RESOLVERAM REUNIR-SE EM ASSEMBLEIA PARA O ESTUDO DA QUESTÃO.',
        'AGUARDARAM PARA ISSO CERTA NOITE EM QUE FARO-FINO',
        'ANDAVA AOS MIOS PELO TELHADO, FAZENDO SONETOS À LUA.',
        '— ACHO — DISSE UM ELES — QUE O MEIO DE NOS DEFENDERMOS',
        'DE FARO-FINO É LHE ATARMOS UM GUIZO (UM CHOCALHO) AO PESCOÇO.',
        'ASSIM QUE ELE SE APROXIME, O GUIZO O DENUNCIA',
        'E POMO-NOS AO FRESCO A TEMPO.',
        'PALMAS E BRAVOS SAUDARAM A LUMINOSA IDEIA.',
        'O PROJETO FOI APROVADO COM DELÍRIO.',
        'SÓ VOTOU CONTRA UM RATO CASMURRO,',
        'QUE PEDIU A PALAVRA E DISSE:',
        '— ESTÁ TUDO MUITO DIREITO. MAS QUEM VAI AMARRAR',
        'O GUIZO NO PESCOÇO DE FARO-FINO?',
        'SILÊNCIO GERAL. UM DESCULPOU-SE POR NÃO SABER DAR NÓ.',
        'OUTRO, PORQUE NÃO ERA TOLO.',
        'TODOS, PORQUE NÃO TINHAM CORAGEM.',
        'E A ASSEMBLEIA DISSOLVEU-SE NO MEIO',
        'DE GERAL CONSTERNAÇÃO (TRISTEZA).'],
 pede:'AS FÁBULAS COSTUMAM NOS ENSINAR ALGO. QUE LIÇÃO PODEMOS TIRAR DA FÁBULA ACIMA?',
 opts:[
  {t:'A UNIÃO FAZ A FORÇA.', no:'É a mais forte das erradas: os ratos se reuniram, votaram e aplaudiram juntos. Mas a reunião não resolveu nada — no fim ninguém fez o que tinha sido combinado.'},
  {t:'É MELHOR PREVENIR DO QUE REMEDIAR.', no:'O guizo seria mesmo um jeito de se proteger do gato antes de ele chegar, e é por isso que ela atrai. Só que o plano nunca saiu do papel, e não se tira lição de um plano que ninguém fez.'},
  {t:'FALAR É FÁCIL, DIFÍCIL É FAZER.', ok:1},
  {t:'PARA O BOM ENTENDEDOR, MEIA PALAVRA BASTA.', no:'O rato casmurro fala pouco e acerta em cheio, e é isso que engana. Mas a fábula não é sobre falar pouco: é sobre ninguém ter coragem de fazer.'}
 ],
 dica:'A lição não está escrita em nenhuma linha. Compare duas partes da história: o que os ratos fizeram quando o plano foi dito, e o que fizeram quando alguém perguntou quem ia amarrar o guizo.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[12,13,18,20],
 visual:'<div class="pcs"><span class="pc hit">PALMAS E BRAVOS</span><span class="pc hit">APROVADO COM DEL&Iacute;RIO</span><span class="arw">&rarr;</span><span class="pc hit">na hora de falar</span></div>'+
        '<div class="pcs"><span class="pc bad">SIL&Ecirc;NCIO GERAL</span><span class="pc bad">N&Atilde;O TINHAM CORAGEM</span><span class="arw">&rarr;</span><span class="pc bad">na hora de fazer</span></div>'+
        '<p class="vx">As mesmas bocas que aplaudiram ficaram caladas quando o rato perguntou <b>quem vai amarrar o guizo</b>.</p>',
 porque:'Os ratos aplaudiram o plano com palmas e bravos e aprovaram tudo com delírio. Mas quando um deles perguntou quem ia amarrar o guizo no pescoço do gato, veio o silêncio geral: ninguém teve coragem. Falar foi fácil; fazer, ninguém fez.',
 proximo:'Na fábula, a lição sai do que os bichos FIZERAM, não do que eles disseram. Procure a parte em que a história vira do avesso.'},

{id:'23F1Q15', eixo:'contar', origem:'Olimpíada 2023 · 1ª fase · questão 15',
 nota:'Esta questão é de 2023, quando a prova tinha cinco respostas. Aqui ela está com quatro, como na prova de hoje.',
 enun:'ABAIXO, TEMOS UM TRECHO DO POEMA OU ISTO OU AQUILO, DE CECÍLIA MEIRELES. MAS, ATENÇÃO: ALGUMAS LETRAS FORAM MUDADAS QUANDO O COPIAMOS PARA CÁ.',
 texto:['OU SE TEM CHUVA E NÃO SE TEM VOL,',
        'OU SE TEM SOL E NÃO SE TEM CHUBA!',
        'OU SE CALÇA A LUVA E NÃO SE PÕE O ATEL,',
        'OU SE PÕE O ANEL E NÃO SE CALÇA A XUVA!',
        'QUEM SOBE NOS ABES NÃO FICA NO CHÃI,',
        'QUEM TICA NO CHÃI NÃO SOTE NOS ARES.',
        'É UMA GRANDE PENA QUE NÃO SE POZZA',
        'ESTAR AO MESMO TEMPO NOS DOIS LUGAREZ!',
        'OU GUARDO O DINHEURO E NÃO CONPRO O DOCE,',
        'OU CONPRO O DOCE E GASTO O DINHEURO.',
        'OU ISTO OU AQUILO: OU ISTO OU AQUILO…',
        'E VIVO ESCOLHENDO O DIA INTEIRO!'],
 pede:'QUANTAS PALAVRAS TIVERAM LETRAS TROCADAS?',
 opts:[
  {t:'15', ok:1},
  {t:'16', no:'Dezesseis é uma a mais: sobrou uma palavra marcada que estava certinha. PÕE e CALÇA parecem esquisitas, mas as duas estão escritas do jeito certo.'},
  {t:'17', no:'Dezessete são duas a mais. Palavra difícil não é palavra errada: GUARDO, ESCOLHENDO e AQUILO estão todas certas no poema.'},
  {t:'18', no:'Dezoito são três a mais. O verso OU ISTO OU AQUILO se repete de propósito, é assim no poema de verdade — repetir não é trocar letra.'}
 ],
 dica:'Vá linha por linha com a régua e ponha um pontinho embaixo de cada palavra estranha. Conte no fim — e conte todas as vezes que a palavra aparece, não uma vez só.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc bad">VOL</span><span class="pc bad">CHUBA</span><span class="pc bad">ATEL</span><span class="pc bad">XUVA</span><span class="pc bad">ABES</span><span class="pc bad">CH&Atilde;I</span><span class="pc bad">TICA</span><span class="pc bad">CH&Atilde;I</span></div>'+
        '<div class="pcs"><span class="pc bad">SOTE</span><span class="pc bad">POZZA</span><span class="pc bad">LUGAREZ</span><span class="pc bad">DINHEURO</span><span class="pc bad">CONPRO</span><span class="pc bad">CONPRO</span><span class="pc bad">DINHEURO</span></div>'+
        '<p class="vx">S&atilde;o <b>15</b> pontinhos. Repare: <b>CH&Atilde;I</b>, <b>CONPRO</b> e <b>DINHEURO</b> aparecem <b>duas vezes cada</b>, e cada vez vale um pontinho.</p>'+
        '<p class="vx"><span class="dm">Quem conta s&oacute; as palavras diferentes chega a 12 e se perde.</span></p>',
 porque:'Riscando linha por linha: VOL, CHUBA, ATEL, XUVA, ABES, CHÃI, TICA, CHÃI, SOTE, POZZA, LUGAREZ, DINHEURO, CONPRO, CONPRO, DINHEURO. São 15 pontinhos, porque CHÃI, CONPRO e DINHEURO contam duas vezes cada.',
 proximo:'Quando a palavra estranha aparecer de novo, conte de novo. A pergunta é quantas VEZES, e não quantas palavras diferentes.'},


/* ===== reserva_treino_A ===== */
{id:'TR01', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA: É PRECISO CAÇAR CADA SÍMBOLO.',
 quadro:'<table class="tbc"><tr><td>&#9829;</td><td>&#9660;</td><td>&#9650;</td><td>&#9733;</td><td>&#10022;</td><td>&#9632;</td><td>&#9788;</td><td>&#9679;</td><td>&#9670;</td></tr>'+
        '<tr><td>GA</td><td>COM</td><td>TEM</td><td>CA</td><td>TO</td><td>QUEM</td><td>&Ccedil;A</td><td>N&Atilde;O</td><td>C&Atilde;O</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9632; &#9679; &#9650; &#9670; &#9733; &#9788; &#9660; &#9829; &#10022;</div>',
 pede:'ESSA SEQUÊNCIA ESCONDE UM DITADO. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'QUEM TEM CÃO NÃO CAÇA COM GATO.', no:'Essa frase é o ditado de cabeça para baixo, e ela sai da memória, não da tabela. O segundo símbolo é o círculo preto, que vale NÃO. O TEM só aparece no terceiro símbolo.'},
  {t:'QUEM NÃO TEM CÃO CAÇA COM GATO.', ok:1},
  {t:'QUEM NÃO TEM CÃO CAÇA COM RATO.', no:'Oito símbolos batem certinho, e é isso que atrai. Mas o oitavo símbolo é o coração, e na tabela o coração vale GA: dá GATO. RA não existe em lugar nenhum da tabela.'},
  {t:'QUEM NÃO TEM PÃO CAÇA COM GATO.', no:'PÃO e CÃO mudam uma letra só, e é aí que o olho escorrega. O quarto símbolo é o losango, e o losango vale CÃO. PÃO não está na tabela.'}
 ],
 dica:'Escreva a sílaba embaixo de cada símbolo, um por um, sem pular nenhum. Só junte tudo depois que o último símbolo estiver escrito.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">QUEM</span><span class="pc hit">N&Atilde;O</span><span class="pc hit">TEM</span><span class="pc hit">C&Atilde;O</span>'+
        '<span class="pc hit">CA</span><span class="pc hit">&Ccedil;A</span><span class="pc hit">COM</span><span class="pc hit">GA</span><span class="pc hit">TO</span></div>'+
        '<p class="vx">Nove s&iacute;mbolos, nove pe&ccedil;as escritas. S&oacute; no fim a gente junta.</p>'+
        '<div class="pcs"><span class="pc bad">RA</span><span class="arw">&rarr;</span><span class="pc bad">n&atilde;o existe na tabela</span>'+
        '<span class="pc bad">P&Atilde;O</span><span class="arw">&rarr;</span><span class="pc bad">n&atilde;o existe na tabela</span></div>',
 porque:'Símbolo por símbolo sai QUEM-NÃO-TEM-CÃO-CA-ÇA-COM-GA-TO: QUEM NÃO TEM CÃO CAÇA COM GATO. As nove sílabas da tabela foram usadas na ordem em que os símbolos aparecem.',
 proximo:'Confira as sílabas do FIM com o mesmo cuidado das do começo. É no fim que a memória tenta completar o ditado sozinha.'},

{id:'TR02', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. UM MESMO SÍMBOLO PODE APARECER MAIS DE UMA VEZ NA SEQUÊNCIA.',
 quadro:'<table class="tbc"><tr><td>&#9829;</td><td>&#9632;</td><td>&#9650;</td><td>&#9679;</td><td>&#9788;</td><td>&#9670;</td><td>&#10010;</td><td>&#9733;</td></tr>'+
        '<tr><td>MA</td><td>GA</td><td>CA</td><td>LHO</td><td>NO</td><td>SEU</td><td>CO</td><td>DA</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9733; &#9829; &#9650; &#10010; &#9788; &#9670; &#9632; &#9679;</div>',
 pede:'JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS. QUAL FRASE A SEQUÊNCIA FORMA?',
 opts:[
  {t:'CADA MACACO NO SEU LUGAR.', no:'O começo bate, e quem reconhece o ditado no meio do caminho completa de memória. Mas os dois últimos símbolos são o quadrado e o círculo, que valem GA e LHO: GALHO. LU e GAR não existem na tabela.'},
  {t:'CADA MACACO NO GALHO.', no:'Essa pulou o losango, que vale SEU. Conte: a sequência tem nove símbolos e essa frase tem sete pedaços. Sobrou símbolo sem uso.'},
  {t:'CADA MACACO NO SEU GALO.', no:'GALO e GALHO mudam uma letra só. O último símbolo é o círculo preto, e na tabela ele vale LHO, com LH. LO não está na tabela.'},
  {t:'CADA MACACO NO SEU GALHO.', ok:1}
 ],
 dica:'O triângulo aparece duas vezes na sequência. Cada vez que ele aparece, você escreve a mesma sílaba de novo.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">CA</span><span class="pc hit">DA</span><span class="pc hit">MA</span><span class="pc hit">CA</span><span class="pc hit">CO</span>'+
        '<span class="pc hit">NO</span><span class="pc hit">SEU</span><span class="pc hit">GA</span><span class="pc hit">LHO</span></div>'+
        '<p class="vx">O tri&acirc;ngulo apareceu na 1&ordf; e na 4&ordf; posi&ccedil;&atilde;o, e nas duas vezes vale <b>CA</b>.</p>'+
        '<div class="pcs"><span class="pc hit">GA</span><span class="pc hit">LHO</span><span class="arw">&rarr;</span><span class="pc bad">GA</span><span class="pc bad">LO</span></div>'+
        '<p class="vx">Uma letra de diferen&ccedil;a no &uacute;ltimo peda&ccedil;o &mdash; e o LO nem est&aacute; na tabela.</p>',
 porque:'Na ordem dos símbolos sai CA-DA MA-CA-CO NO SEU GA-LHO. O triângulo vale CA e aparece duas vezes, uma em CADA e outra em MACACO.',
 proximo:'Quando um símbolo se repete, escreva a mesma sílaba nas duas vezes. Não invente uma sílaba nova só porque a palavra ficaria mais bonita.'},

{id:'TR03', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NESTA TABELA, CADA SÍMBOLO VALE UMA LETRA — NÃO É UMA SÍLABA, É UMA LETRA SÓ.',
 quadro:'<table class="tbc"><tr><td>&#9733;</td><td>&#9632;</td><td>&#9660;</td><td>&#9679;</td><td>&#9829;</td><td>&#9670;</td></tr>'+
        '<tr><td>&Ccedil;</td><td>P</td><td>O</td><td>A</td><td>H</td><td>L</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9632; &#9679; &#9670; &#9829; &#9679; &#9733; &#9660;</div>',
 pede:'JUNTE AS LETRAS NA ORDEM DOS SÍMBOLOS. QUAL PALAVRA A SEQUÊNCIA FORMA?',
 opts:[
  {t:'PALHAÇO.', ok:1},
  {t:'PALHA.', no:'PALHA usa os cinco primeiros símbolos e para. Sobraram dois na fila: a estrela e o triângulo de ponta para baixo. Quando sobra símbolo, a palavra está errada.'},
  {t:'PALHAÇOS.', no:'Quase tudo bate, e o S do fim passa quase despercebido. Mas a fila acaba no triângulo de ponta para baixo, que vale O — e não existe nenhum S na tabela.'},
  {t:'PAÇOCA.', no:'A tabela tem P, A, Ç e O, e dá vontade de montar uma palavra gostosa com essas letras. Mas o código manda seguir a ORDEM dos símbolos, e PAÇOCA ainda pede um C, que não está na tabela.'}
 ],
 dica:'São sete símbolos, então a palavra tem sete letras. Escreva uma letra embaixo de cada símbolo antes de olhar as alternativas.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">P</span><span class="pc hit">A</span><span class="pc hit">L</span><span class="pc hit">H</span>'+
        '<span class="pc hit">A</span><span class="pc hit">&Ccedil;</span><span class="pc hit">O</span></div>'+
        '<p class="vx">Sete s&iacute;mbolos, sete letras: <b>PALHA&Ccedil;O</b>.</p>'+
        '<div class="pcs"><span class="pc hit">P</span><span class="pc hit">A</span><span class="pc hit">L</span><span class="pc hit">H</span>'+
        '<span class="pc hit">A</span><span class="pc bad">?</span><span class="pc bad">?</span></div>'+
        '<p class="vx">PALHA para na quinta letra e deixa dois s&iacute;mbolos sem uso.</p>',
 porque:'Na ordem dos símbolos as letras são P, A, L, H, A, Ç, O: PALHAÇO. São sete símbolos e sete letras — nenhuma sobra e nenhuma falta.',
 proximo:'Conte os símbolos ANTES de escolher. O número de símbolos é o número de letras da palavra certa.'},

{id:'TR04', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA.',
 quadro:'<table class="tbc"><tr><td>&#9679;</td><td>&#9733;</td><td>&#9650;</td><td>&#9670;</td><td>&#9632;</td><td>&#9829;</td><td>&#9788;</td></tr>'+
        '<tr><td>LA</td><td>P&Eacute;</td><td>O</td><td>VA</td><td>N&Atilde;O</td><td>SA</td><td>PO</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9829; &#9788; &#9632; &#9679; &#9670; &#9650; &#9733;</div>',
 pede:'ESSA SEQUÊNCIA ESCONDE UM PEDACINHO DE UMA CANTIGA. QUAL É A FRASE?',
 opts:[
  {t:'O SAPO LAVA O PÉ.', no:'Essa pulou o quadrado, que vale NÃO — e sem o NÃO a frase diz o contrário do que o código escreveu. Conte: são oito símbolos e essa frase tem sete pedaços.'},
  {t:'O PATO NÃO LAVA O PÉ.', no:'PATO e SAPO são quase a mesma palavra no ouvido. Mas o segundo símbolo é o coração, que vale SA, e o terceiro é o sol, que vale PO: SA-PO. PA e TO não existem na tabela.'},
  {t:'O SAPO NÃO LAVA O PÉ.', ok:1},
  {t:'O SAPO NÃO LAVA A MÃO.', no:'Os três últimos símbolos são o losango, o triângulo e a estrela: VA, O e PÉ. MÃO não aparece em lugar nenhum da tabela.'}
 ],
 dica:'O triângulo aparece duas vezes: no começo e quase no fim. Ele vale a mesma sílaba nas duas vezes.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">O</span><span class="pc hit">SA</span><span class="pc hit">PO</span><span class="pc hit">N&Atilde;O</span>'+
        '<span class="pc hit">LA</span><span class="pc hit">VA</span><span class="pc hit">O</span><span class="pc hit">P&Eacute;</span></div>'+
        '<p class="vx">Oito s&iacute;mbolos, oito peda&ccedil;os escritos.</p>'+
        '<div class="pcs"><span class="pc hit">O</span><span class="pc hit">SA</span><span class="pc hit">PO</span><span class="pc bad">N&Atilde;O pulado</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">a frase vira o contr&aacute;rio</span></div>',
 porque:'Na ordem dos símbolos sai O SA-PO NÃO LA-VA O PÉ. O triângulo vale O e aparece duas vezes: no primeiro símbolo e no sétimo.',
 proximo:'Uma sílaba pequenininha como NÃO muda a frase inteira. Não pule símbolo curto achando que ele não vale nada.'},

{id:'TR05', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'TOMÁS CHEGOU NUMA PRAÇA EMPURRANDO A BICICLETA. LOGO NA ENTRADA TINHA UMA PLACA COM UM DESENHO. TOMÁS OLHOU A PLACA E DISSE:',
 quadro:'&mdash; N&Atilde;O D&Aacute;, M&Atilde;E. AQUI N&Atilde;O PODE ANDAR DE BICICLETA.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL DESTAS PLACAS TOMÁS VIU?',
 opts:[
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UMA BICICLETA DESENHADA DENTRO.', ok:1},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM CACHORRO DESENHADO DENTRO.', no:'Essa placa diz NÃO PODE de verdade, e quem procura só o círculo cortado marca esta. Mas o desenho de dentro é um cachorro: ela proíbe entrar com animal, não andar de bicicleta.'},
  {t:'UMA PLACA AZUL COM UMA BICICLETA DESENHADA DENTRO E SEM BARRA NENHUMA.', no:'A bicicleta está lá, e quem procura só a bicicleta para aqui. Mas não tem círculo vermelho nem barra: sem a barra a placa não proíbe nada — essa mostra o caminho da bicicleta.'},
  {t:'UMA PLACA COM UMA SETA APONTANDO PARA A DIREITA.', no:'Uma seta só diz para que lado ir. Não tem bicicleta desenhada e não tem barra vermelha.'}
 ],
 dica:'A placa certa tem de dizer duas coisas ao mesmo tempo: que alguma coisa é PROIBIDA e QUAL é a coisa proibida.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">c&iacute;rculo vermelho cortado</span><span class="arw">+</span><span class="pc hit">bicicleta dentro</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">proibido andar de bicicleta</span></div>'+
        '<div class="pcs"><span class="pc hit">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">cachorro</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">pro&iacute;be animal</span></div>'+
        '<div class="pcs"><span class="pc hit">bicicleta</span><span class="arw">+</span><span class="pc bad">sem barra</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">n&atilde;o pro&iacute;be nada</span></div>'+
        '<p class="vx">As duas metades t&ecirc;m de fechar juntas. Uma s&oacute; n&atilde;o serve.</p>',
 porque:'Tomás leu duas coisas na mesma placa: o círculo vermelho cortado, que quer dizer PROIBIDO, e o desenho de dentro, que é uma bicicleta. Só uma placa junta as duas.',
 proximo:'Pergunte sempre duas vezes: essa placa PROÍBE? e proíbe O QUÊ? Se uma das duas respostas falhar, a placa não é a sua.'},

{id:'TR06', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'NO SHOPPING, HELENA PRECISAVA IR AO BANHEIRO. A MÃE DISSE: — PROCURA A PLACA, FILHA. NO CORREDOR HAVIA QUATRO PLACAS DIFERENTES.',
 nota:'Na prova as placas são desenhadas. Aqui cada uma vem descrita em palavras: a forma, se tem barra vermelha e o que está desenhado dentro.',
 pede:'QUAL DESSAS PLACAS MOSTRA O BANHEIRO?',
 opts:[
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM O DESENHO DE UMA PESSOA DENTRO.', no:'Tem gente desenhada, igual à placa do banheiro, e é por isso que engana. Mas o círculo vermelho cortado quer dizer PROIBIDO: essa placa diz que ali a pessoa NÃO pode entrar.'},
  {t:'UMA PLACA COM O DESENHO DE UMA PESSOA JOGANDO UM PAPEL NA LIXEIRA.', no:'Essa placa também tem uma pessoa desenhada, e é bem conhecida. Mas quem manda é o resto do desenho: a lixeira. Ela pede para jogar o lixo no lugar certo.'},
  {t:'UMA PLACA COM O DESENHO DE UM HOMEM E DE UMA MULHER, UM DE CADA LADO DE UM RISCO EM PÉ.', ok:1},
  {t:'UMA PLACA COM O DESENHO DE UM COPO EMBAIXO DE UMA TORNEIRA.', no:'No banheiro tem torneira, e é aí que essa placa pega. Mas copo embaixo de torneira é a placa do bebedouro, o lugar de beber água — e não tem nenhuma pessoa desenhada.'}
 ],
 dica:'Três dessas placas têm gente ou água desenhada. Olhe o desenho INTEIRO de cada uma antes de escolher, e não só o primeiro pedaço.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">homem</span><span class="pc hit">risco em p&eacute;</span><span class="pc hit">mulher</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">banheiro</span></div>'+
        '<div class="pcs"><span class="pc bad">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">pessoa</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">PROIBIDO entrar</span></div>'+
        '<p class="vx">A barra vermelha n&atilde;o mostra lugar: ela pro&iacute;be. Placa que mostra lugar n&atilde;o tem barra.</p>'+
        '<div class="pcs"><span class="pc bad">pessoa + lixeira</span><span class="arw">&rarr;</span><span class="pc bad">jogue o lixo aqui</span>'+
        '<span class="pc bad">copo + torneira</span><span class="arw">&rarr;</span><span class="pc bad">bebedouro</span></div>',
 porque:'A placa do banheiro é o desenho de um homem e de uma mulher separados por um risco em pé — um lado para cada banheiro. Nenhuma outra mostra duas pessoas, e a do círculo cortado proíbe em vez de mostrar.',
 proximo:'Quando a placa tem círculo vermelho cortado, ela nunca está mostrando um lugar: ela está proibindo alguma coisa.'},

{id:'TR07', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'LUÍSA IA ATRAVESSAR A RUA COM O PAI. O PAI PAROU NA CALÇADA, APONTOU PARA UMA PLACA E DISSE: — É AQUI QUE A GENTE ATRAVESSA.',
 nota:'Na prova as placas são desenhadas. Aqui cada uma vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA O PAI DE LUÍSA APONTOU?',
 opts:[
  {t:'UMA PLACA VERMELHA DE OITO PONTAS COM A PALAVRA PARE ESCRITA DENTRO.', no:'É a placa mais conhecida de todas e a primeira que vem à cabeça quando se fala de rua. Mas ela manda o CARRO parar; ela não mostra o lugar de atravessar a pé.'},
  {t:'UMA PLACA COM O DESENHO DE UMA PESSOA ANDANDO EM CIMA DE UMAS FAIXAS BRANCAS.', ok:1},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM O DESENHO DE UMA PESSOA ANDANDO DENTRO.', no:'A pessoa andando está lá, igualzinha à da placa certa, e por isso essa é a pegadinha forte. Mas o círculo vermelho cortado quer dizer PROIBIDO: essa placa diz que ali NÃO pode passar a pé.'},
  {t:'UMA PLACA COM O DESENHO DE UM CARRO E UMA SETA.', no:'Essa placa fala do carro e do caminho dele. Não tem pessoa desenhada nem faixa no chão.'}
 ],
 dica:'Duas placas têm uma pessoa andando desenhada. O que muda de uma para a outra é o círculo vermelho cortado.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">pessoa andando</span><span class="arw">+</span><span class="pc hit">faixas brancas no ch&atilde;o</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">atravesse aqui</span></div>'+
        '<div class="pcs"><span class="pc bad">pessoa andando</span><span class="arw">+</span><span class="pc bad">c&iacute;rculo cortado</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">proibido passar a p&eacute;</span></div>'+
        '<p class="vx">O mesmo desenho dentro, e as duas placas dizem coisas <b>contr&aacute;rias</b>. Quem decide &eacute; a barra.</p>',
 porque:'A placa da pessoa andando em cima das faixas brancas mostra a faixa de pedestres, o lugar de atravessar. A outra tem a mesma pessoa, mas dentro do círculo cortado — e aí ela proíbe.',
 proximo:'Duas placas com o mesmo desenho dentro podem dizer o contrário uma da outra. Olhe a barra vermelha antes de decidir.'},

{id:'TR08', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'O PAI DE BIA PAROU O CARRO NO POSTO DE GASOLINA. NA PAREDE TINHA UMA PLACA COM UM DESENHO. BIA OLHOU E DISSE:',
 quadro:'&mdash; J&Aacute; SEI! AQUI N&Atilde;O PODE ACENDER FOGO.',
 nota:'Na prova as placas são desenhadas. Aqui cada uma vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA BIA VIU?',
 opts:[
  {t:'UM TRIÂNGULO AMARELO COM UMA CHAMA DE FOGO DESENHADA DENTRO, SEM BARRA NENHUMA.', no:'O fogo está desenhado, e é justamente o fogo que a criança procura. Mas não tem círculo vermelho nem barra: essa placa avisa que ali existe perigo de fogo, ela não diz NÃO PODE.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM CELULAR DESENHADO DENTRO.', no:'Essa placa diz NÃO PODE mesmo, e quem procura só o círculo cortado marca esta. Mas o desenho de dentro é um celular: ela proíbe usar o celular.'},
  {t:'UMA PLACA AZUL COM O DESENHO DE UMA MÃO EMBAIXO DE UMA TORNEIRA.', no:'Essa placa mostra onde lavar a mão. Não tem fogo desenhado e não tem barra vermelha.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM FÓSFORO ACESO DESENHADO DENTRO.', ok:1}
 ],
 dica:'Duas placas têm fogo ou barra vermelha, mas cada uma tem só uma das duas coisas. A certa tem as duas juntas.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">c&iacute;rculo vermelho cortado</span><span class="arw">+</span><span class="pc hit">f&oacute;sforo aceso</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">proibido acender fogo</span></div>'+
        '<div class="pcs"><span class="pc bad">tri&acirc;ngulo amarelo</span><span class="arw">+</span><span class="pc hit">fogo</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">cuidado, sem barra n&atilde;o pro&iacute;be</span></div>'+
        '<div class="pcs"><span class="pc hit">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">celular</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">pro&iacute;be o celular</span></div>',
 porque:'Bia leu as duas metades da mesma placa: o círculo vermelho cortado, que quer dizer PROIBIDO, e o fósforo aceso desenhado dentro, que é o fogo. Só uma placa tem as duas coisas.',
 proximo:'Uma metade certa não basta. Confira as quatro placas até achar a que tem a barra E o desenho que a história pediu.'},

{id:'TR09', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'A PROFESSORA ESCREVEU A LISTA DE CHAMADA DA TURMA NO QUADRO. OS NOMES ESTÃO EM UMA ORDEM, MAS UM DELES APAGOU:',
 quadro:'<span class="lst"><b>B</b>RUNO</span><span class="lst"><b>C</b>AIO</span><span class="lst"><b>D</b>AVI</span>'+
        '<span class="lst vaz">_____________</span><span class="lst"><b>F</b>ELIPE</span><span class="lst"><b>G</b>ABI</span>',
 pede:'QUAL NOME COMPLETA O ESPAÇO EM BRANCO DA LISTA?',
 opts:[
  {t:'HELENA.', no:'HELENA começa com H, e o H vem depois do G. Esse nome serve para CONTINUAR a lista embaixo da GABI, não para tapar o buraco que ficou no meio.'},
  {t:'ENZO.', ok:1},
  {t:'DUDA.', no:'DUDA começa com D, e o D já passou: DAVI está logo em cima do buraco. O dedo do alfabeto não volta para trás.'},
  {t:'IGOR.', no:'IGOR começa com I, que vem depois do G e depois do H. É ainda mais longe do buraco do que HELENA.'}
 ],
 dica:'Olhe só a primeira letra de cada nome, de cima para baixo. Que ordem é essa?',
 truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.',
 visual:'<div class="pcs"><span class="pc hit">B</span><span class="pc hit">C</span><span class="pc hit">D</span><span class="pc bad">?</span>'+
        '<span class="pc hit">F</span><span class="pc hit">G</span></div>'+
        '<p class="vx">Entre o <b>D</b> e o <b>F</b> falta o <b>E</b>. O nome tem de come&ccedil;ar com E: ENZO.</p>'+
        '<div class="pcs"><span class="pc bad">H</span><span class="pc bad">I</span><span class="arw">&rarr;</span>'+
        '<span class="pc bad">v&ecirc;m DEPOIS do G, no fim da lista</span></div>',
 porque:'Os nomes estão na ordem do alfabeto: B, C, D, ?, F, G. Entre o D e o F falta o E — e o único nome que começa com E é ENZO.',
 proximo:'Com o buraco no meio, olhe a letra de ANTES e a de DEPOIS dele. A resposta fica espremida entre as duas.'},

{id:'TR10', eixo:'alfabeto', origem:'Treino no estilo da prova',
 pede:'EM QUAL DAS PALAVRAS ABAIXO CADA LETRA VEM DEPOIS DA LETRA ANTERIOR NO ALFABETO, DO COMEÇO ATÉ O FIM?',
 opts:[
  {t:'DEDO.', no:'DEDO começa bonito: D e depois E, andando para a frente. Mas a terceira letra é o D de novo, e o D já tinha passado. Voltou no terceiro passo.'},
  {t:'FILHO.', no:'F, I, L vão andando para a frente e dá vontade de parar por aí. A quarta letra é o H, e o H vem ANTES do L. Cai no meio da palavra.'},
  {t:'CHUVA.', no:'CHUVA é a pegadinha desta questão: C, H, U, V andam sempre para a frente, uma atrás da outra. E aí vem o A, que volta lá para o começo do alfabeto. Quem para de conferir na quarta letra marca esta.'},
  {t:'BEIJO.', ok:1}
 ],
 dica:'Cante o alfabeto e vá andando com o dedo dentro da palavra: da primeira letra para a segunda, da segunda para a terceira, até a última.',
 truque:'Cante o alfabeto com o dedo andando. Cada letra tem de vir DEPOIS da anterior, até o fim da palavra.',
 visual:'<div class="pcs"><span class="pc hit">B</span><span class="arw">&rarr;</span><span class="pc hit">E</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">I</span><span class="arw">&rarr;</span><span class="pc hit">J</span><span class="arw">&rarr;</span><span class="pc hit">O</span></div>'+
        '<p class="vx">Em BEIJO o dedo s&oacute; anda para a frente, at&eacute; a &uacute;ltima letra.</p>'+
        '<div class="pcs"><span class="pc hit">C</span><span class="arw">&rarr;</span><span class="pc hit">H</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">U</span><span class="arw">&rarr;</span><span class="pc hit">V</span><span class="arw">&rarr;</span><span class="pc bad">A</span></div>'+
        '<p class="vx">Em CHUVA tudo vai bem at&eacute; o <b>V</b> &mdash; e a &uacute;ltima letra volta para o come&ccedil;o.</p>',
 porque:'Em BEIJO o dedo só anda para a frente no alfabeto: B, depois E, depois I, depois J, depois O. Nenhuma letra volta, e a palavra chega inteira até o fim.',
 proximo:'Vá até a ÚLTIMA letra sempre. A palavra que engana é a que anda certinho quase até o fim e escorrega no último passo.'},

{id:'TR11', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'LEIA A CHARADA ABAIXO. QUEM SOU EU?',
 texto:['ESTOU NO SOL QUE ESQUENTA O DIA,',
        'NO SAPATO QUE VOCÊ CALÇA,',
        'NO SOM DA COBRA ESCONDIDA,',
        'E MORO ENTRE O R E O T NO ALFABETO.'],
 pede:'QUAL LETRA ESTÁ FALANDO NA CHARADA?',
 opts:[
  {t:'A LETRA S.', ok:1},
  {t:'A LETRA O.', no:'A LETRA O é a pegadinha desta charada: ela aparece escrita em SOL, em SAPATO e em COBRA — três pistas! Mas ela cai na última: entre o R e o T mora o S, não o O.'},
  {t:'A LETRA C.', no:'O C aparece em COBRA e em CALÇA, e por isso atrai. Mas não está em SOL, e o C mora lá no começo do alfabeto, longe do R e do T.'},
  {t:'A LETRA A.', no:'O A aparece em SAPATO, em CALÇA e em COBRA, e é a letra mais conhecida de todas. Mas não está em SOL, e o A é a primeira do alfabeto — não fica entre o R e o T.'}
 ],
 dica:'Cada verso é uma pista para a MESMA letra. Descubra a palavra escondida em cada verso e veja qual letra aparece em todas — inclusive na última pista.',
 truque:'Na charada, a letra fala dela mesma. Pense na forma dela e no som dela — e confira TODAS as pistas.',
 visual:'<div class="pcs"><span class="pc hit"><b>S</b>OL</span><span class="pc hit"><b>S</b>APATO</span>'+
        '<span class="pc hit">cobra faz S<b>SS</b></span><span class="pc hit">R &middot; <b>S</b> &middot; T</span></div>'+
        '<p class="vx">As quatro pistas fecham no <b>S</b>.</p>'+
        '<div class="pcs"><span class="pc hit">S<b>O</b>L</span><span class="pc hit">SAPAT<b>O</b></span>'+
        '<span class="pc hit">C<b>O</b>BRA</span><span class="pc bad">R &middot; O? &middot; T</span></div>'+
        '<p class="vx">O <span class="bad2">O</span> passa em tr&ecirc;s pistas e cai na &uacute;ltima. &Eacute; a que ningu&eacute;m confere.</p>',
 porque:'O S está no começo de SOL e de SAPATO, é o som que a cobra faz — sss — e é a letra que fica bem no meio, entre o R e o T. Só o S passa nas quatro pistas.',
 proximo:'Leia a ÚLTIMA pista antes de marcar. Na charada, a letra que engana passa em três e morre na quarta.'},

{id:'TR12', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'LEIA A CHARADA ABAIXO. QUEM SOU EU?',
 texto:['ESTOU NA LUA QUE BRILHA DE NOITE,',
        'NA BALA QUE VOCÊ GANHA NA FESTA,',
        'NA ESCOLA ONDE VOCÊ ESTUDA,',
        'E MORO ENTRE O K E O M NO ALFABETO.'],
 pede:'QUAL LETRA ESTÁ FALANDO NA CHARADA?',
 opts:[
  {t:'A LETRA U.', no:'O U aparece em LUA, e a lua é a primeira pista, a mais fácil de ver. Mas o U não está em BALA, e ele mora quase no fim do alfabeto, longe do K e do M.'},
  {t:'A LETRA A.', no:'A LETRA A é a pegadinha: ela aparece em LUA, em BALA e em ESCOLA — as três primeiras pistas. Mas ela cai na última, porque entre o K e o M mora o L, e o A é a primeira letra do alfabeto.'},
  {t:'A LETRA L.', ok:1},
  {t:'A LETRA B.', no:'O B aparece em BALA e é a primeira letra dela, bem visível. Mas não está em LUA nem em ESCOLA, e o B fica no comecinho do alfabeto.'}
 ],
 dica:'As três primeiras pistas são palavras. Ache a letra que aparece nas três — e depois confira se ela também passa na quarta pista.',
 truque:'Na charada, a letra fala dela mesma. Pense na forma dela e no som dela — e confira TODAS as pistas.',
 visual:'<div class="pcs"><span class="pc hit"><b>L</b>UA</span><span class="pc hit">BA<b>L</b>A</span>'+
        '<span class="pc hit">ESCO<b>L</b>A</span><span class="pc hit">K &middot; <b>L</b> &middot; M</span></div>'+
        '<p class="vx">As quatro pistas fecham no <b>L</b>.</p>'+
        '<div class="pcs"><span class="pc hit">LU<b>A</b></span><span class="pc hit">B<b>A</b>L<b>A</b></span>'+
        '<span class="pc hit">ESCOL<b>A</b></span><span class="pc bad">K &middot; A? &middot; M</span></div>'+
        '<p class="vx">O <span class="bad2">A</span> passa em tr&ecirc;s e cai na quarta: quem para cedo marca ele.</p>',
 porque:'O L está em LUA, em BALA e em ESCOLA, e é a letra que fica entre o K e o M no alfabeto. Só o L passa nas quatro pistas.',
 proximo:'Depois de achar a letra que aparece nas palavras, cante o alfabeto para conferir a pista do lugar. É ela que decide.'},

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
 {k:'ler', titulo:'Ler e entender', min:4,
  truque:'A resposta mora no texto. Volte e ache a linha que responde.',
  texto:'É o tipo com mais perguntas na prova, e o mais justo: a resposta está escrita ali. Não é para adivinhar nem para lembrar da sua vida — é para achar.',
  extras:['Pergunta que começa com POR QUE: procure a linha que explica.',
          'Título é do texto INTEIRO, nunca da última linha.',
          'Lição da fábula: o que os bichos deviam ter feito e não fizeram.',
          'Se a pergunta é sobre um lugar ou uma pessoa, junte as palavras que o texto repete sobre ele.',
          'Antes de marcar, leia as QUATRO respostas até o fim.'],
  exemplo:'25F1Q13', agora:'24F1Q8',
  /* A régua entra aqui, como apoio de quem quer, e não como lição de
     abertura: é técnica de leitura, não conteúdo de prova. (Ela nasceu
     de um problema real — a mãe relatou que a Mari pula linha —, mas
     virou a primeira coisa da tela, o que era desproporcional.) */
  apoio:'Se o texto for comprido e você se perder de linha, ligue o guia de leitura: ele acende uma linha por vez. Na prova, quem faz esse papel é o seu dedo embaixo da linha.'},

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
