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
