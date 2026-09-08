/* ============================================================
   reserva_treino_G.js — 14 questões AUTORAIS DE TREINO
   Categoria G · 2º ano · eixos `alfabeto` (7) e `codigo` (7)

   ATENÇÃO: NENHUMA destas questões caiu em prova. Elas são
   AUTORAIS, escritas NO ESTILO da Olimpíada de Português a
   partir do padrão observado em 2023, 2024 e 2025 (ver
   olimpiadas/_fontes/DOSSIE_*.md). Por isso o campo `origem`
   de todas elas é 'Treino no estilo da prova' — e nunca ano,
   fase e número de questão, que só o banco oficial pode usar.

   TR79–TR81 · alfabeto · lista com buraco no meio (2) e palavra
                com as letras em ordem alfabética (1)
   TR82–TR85 · alfabeto · charada em que a letra fala dela mesma;
                em todas, o distrator forte passa em TRÊS pistas e
                morre na quarta (a da posição no alfabeto)
   TR86–TR92 · codigo · tabela embaralhada símbolo→sílaba (e uma
                símbolo→letra, TR90). Toda tabela está FORA da ordem
                da frase; toda sequência foi decodificada símbolo a
                símbolo e bate exatamente com o texto da alternativa
                certa. Símbolo repetido na sequência: TR86, TR89,
                TR90 e TR92. Últimos símbolos formando UMA palavra
                só: TR88 (CHO-CO-LA-TE) e TR92 (ES-CO-LA).

   COMO OS COMENTÁRIOS DE ERRO SÃO ESCRITOS AQUI: primeiro o que a
   alternativa ERRA, com o fato conferido (qual símbolo, qual pista,
   qual letra). Só depois, se couber, o que nela atrai. Nunca se
   começa dando razão à alternativa errada: a criança de 7 anos
   guarda a primeira metade da frase e larga a segunda.

   Cole o array abaixo dentro de ITENS, em ferramentas/OP_data.js,
   e rode: node _processo/geracao/valida_op_data.js
   ============================================================ */

{id:'TR79', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'A MÃE DA CLARA ESCREVEU A LISTA DO LANCHE DA SEMANA EM UMA ORDEM. UM DOS LANCHES BORROU E NÃO DÁ MAIS PARA LER:',
 quadro:'<span class="lst"><b>L</b>EITE</span><span class="lst"><b>M</b>A&Ccedil;&Atilde;</span>'+
        '<span class="lst vaz">_____________</span><span class="lst"><b>O</b>VO</span><span class="lst"><b>P</b>IPOCA</span>',
 pede:'QUAL LANCHE COMPLETA O ESPAÇO EM BRANCO DESSA LISTA?',
 opts:[
  {t:'QUEIJO.', no:'QUEIJO começa com Q, e o Q vem depois do P. Esse lanche continuaria a lista embaixo da pipoca. O buraco não é no fim da lista: é no meio, entre o M e o O.'},
  {t:'NOZ.', ok:1},
  {t:'MEL.', no:'MEL começa com M, e o M já está na lista: é a MAÇÃ, logo em cima do buraco. O dedo do alfabeto não volta para trás.'},
  {t:'SUCO.', no:'SUCO começa com S. O S vem depois do P, ainda mais longe do buraco do que o Q do queijo.'}
 ],
 dica:'Olhe só a primeira letra de cada lanche, de cima para baixo. Que ordem é essa?',
 truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.',
 visual:'<div class="pcs"><span class="pc hit">L</span><span class="pc hit">M</span><span class="pc bad">?</span>'+
        '<span class="pc hit">O</span><span class="pc hit">P</span></div>'+
        '<p class="vx">Entre o <b>M</b> e o <b>O</b> falta o <b>N</b>. O lanche tem de come&ccedil;ar com N: NOZ.</p>'+
        '<div class="pcs"><span class="pc bad">Q</span><span class="pc bad">S</span><span class="arw">&rarr;</span>'+
        '<span class="pc bad">v&ecirc;m DEPOIS do P, no fim da lista</span></div>',
 porque:'Os lanches estão na ordem do alfabeto: L, M, ?, O, P. Entre o M e o O falta o N. O único lanche que começa com N é NOZ.',
 proximo:'Com o buraco no meio, olhe a letra de ANTES e a de DEPOIS dele. A resposta fica espremida entre as duas.'},

{id:'TR80', eixo:'alfabeto', origem:'Treino no estilo da prova',
 pede:'EM QUAL DAS PALAVRAS ABAIXO CADA LETRA VEM DEPOIS DA ANTERIOR NO ALFABETO, DA PRIMEIRA ATÉ A ÚLTIMA?',
 opts:[
  {t:'MESA.', no:'MESA volta no segundo passo. Depois do M vem o E, e o E fica atrás do M no alfabeto.'},
  {t:'BOTA.', no:'BOTA volta na última letra. Depois do T vem o A, que é o começo do alfabeto. As três primeiras letras andam para a frente, e é aí que a maioria para de conferir.'},
  {t:'FLOR.', ok:1},
  {t:'SUCO.', no:'SUCO volta na terceira letra. Depois do U vem o C, e o C fica quase no começo do alfabeto.'}
 ],
 dica:'Cante o alfabeto e vá andando com o dedo dentro da palavra: da primeira letra para a segunda, da segunda para a terceira, até a última.',
 truque:'Cante o alfabeto com o dedo andando. Cada letra tem de vir DEPOIS da anterior, até o fim da palavra.',
 visual:'<div class="pcs"><span class="pc hit">F</span><span class="arw">&rarr;</span><span class="pc hit">L</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">O</span><span class="arw">&rarr;</span><span class="pc hit">R</span></div>'+
        '<p class="vx">Em FLOR o dedo s&oacute; anda para a frente, at&eacute; a &uacute;ltima letra.</p>'+
        '<div class="pcs"><span class="pc hit">B</span><span class="arw">&rarr;</span><span class="pc hit">O</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">T</span><span class="arw">&rarr;</span><span class="pc bad">A</span></div>'+
        '<p class="vx">Em BOTA o dedo anda tr&ecirc;s vezes e <b>volta</b> na &uacute;ltima letra.</p>',
 porque:'Em FLOR o dedo só anda para a frente no alfabeto: F, depois L, depois O, depois R. Nenhuma letra volta, e a palavra chega inteira até o fim.',
 proximo:'Vá até a ÚLTIMA letra sempre. A palavra que engana é a que anda certinho quase até o fim e escorrega no último passo.'},

{id:'TR81', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'O TÉO ESCREVEU, EM UMA ORDEM, AS COISAS QUE TEM NA CASA DELE. DEPOIS APAGOU UMA SEM QUERER:',
 quadro:'<span class="lst"><b>P</b>ANELA</span><span class="lst"><b>Q</b>UADRO</span>'+
        '<span class="lst vaz">_____________</span><span class="lst"><b>S</b>OF&Aacute;</span><span class="lst"><b>T</b>APETE</span>',
 pede:'QUAL PALAVRA COMPLETA O ESPAÇO EM BRANCO DESSA LISTA?',
 opts:[
  {t:'VASO.', no:'VASO começa com V, e o V vem depois do T. Essa palavra continuaria a lista embaixo do tapete. O buraco ficou no meio, entre o Q e o S.'},
  {t:'PORTA.', no:'PORTA começa com P, e o P já está na lista: é a PANELA, a primeira de todas. O dedo do alfabeto não volta para trás.'},
  {t:'RÁDIO.', ok:1},
  {t:'JANELA.', no:'JANELA começa com J. O J vem antes do P, então essa palavra ficaria acima da panela, fora do buraco.'}
 ],
 dica:'Olhe só a primeira letra de cada coisa, de cima para baixo. Que ordem é essa?',
 truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.',
 visual:'<div class="pcs"><span class="pc hit">P</span><span class="pc hit">Q</span><span class="pc bad">?</span>'+
        '<span class="pc hit">S</span><span class="pc hit">T</span></div>'+
        '<p class="vx">Entre o <b>Q</b> e o <b>S</b> falta o <b>R</b>. A palavra tem de come&ccedil;ar com R: R&Aacute;DIO.</p>'+
        '<div class="pcs"><span class="pc bad">J</span><span class="arw">&rarr;</span><span class="pc bad">antes da lista</span>'+
        '<span class="pc bad">V</span><span class="arw">&rarr;</span><span class="pc bad">depois da lista</span></div>',
 porque:'As coisas estão na ordem do alfabeto: P, Q, ?, S, T. Entre o Q e o S falta o R. A única palavra que começa com R é RÁDIO.',
 proximo:'Antes de marcar, pergunte: essa palavra CONTINUA a lista ou TAPA o buraco? Só a que tapa o buraco serve.'},

{id:'TR82', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'LEIA A CHARADA ABAIXO. QUEM SOU EU?',
 texto:['ESTOU NO RATO QUE CORRE PELA COZINHA,',
        'ESTOU NA PORTA QUE RANGE DEVAGAR,',
        'SOU O SOM DO CARRO QUE ACELERA: RRRUM,',
        'E MORO ENTRE O Q E O S NO ALFABETO.'],
 pede:'QUAL LETRA ESTÁ FALANDO NA CHARADA?',
 opts:[
  {t:'A LETRA O.', no:'O O não passa na última pista. Entre o Q e o S mora o R; o O mora entre o N e o P. O O aparece em RATO, em PORTA e em CARRO: passa em três pistas, e é por isso que ele atrai.'},
  {t:'A LETRA R.', ok:1},
  {t:'A LETRA T.', no:'O T não está em CARRO. E o T mora entre o S e o U, não entre o Q e o S. Ele aparece em RATO e em PORTA, e para por aí.'},
  {t:'A LETRA C.', no:'O C não está em RATO nem em PORTA. E o C mora entre o B e o D, no começo do alfabeto. Ele aparece só em CARRO, a palavra da pista do som.'}
 ],
 dica:'Cada verso é uma pista para a MESMA letra. Ache a letra que aparece nas três primeiras. Depois confira se ela também passa na última.',
 truque:'Na charada, a letra fala dela mesma. Pense na forma dela e no som dela — e confira TODAS as pistas.',
 visual:'<div class="pcs"><span class="pc hit"><b>R</b>ATO</span><span class="pc hit">PO<b>R</b>TA</span>'+
        '<span class="pc hit">carro faz <b>RRR</b>UM</span><span class="pc hit">Q &middot; <b>R</b> &middot; S</span></div>'+
        '<p class="vx">As quatro pistas fecham no <b>R</b>.</p>'+
        '<div class="pcs"><span class="pc hit">RAT<b>O</b></span><span class="pc hit">P<b>O</b>RTA</span>'+
        '<span class="pc hit">CARR<b>O</b></span><span class="pc bad">Q &middot; O? &middot; S</span></div>'+
        '<p class="vx">O <span class="bad2">O</span> passa em tr&ecirc;s pistas e morre na quarta. &Eacute; a que ningu&eacute;m confere.</p>',
 porque:'O R está em RATO. Está em PORTA. É o som do carro acelerando, rrrum. E é a letra que fica entre o Q e o S. Só o R passa nas quatro pistas.',
 proximo:'Leia a ÚLTIMA pista antes de marcar. Na charada, a letra que engana passa em três e morre na quarta.'},

{id:'TR83', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'LEIA A CHARADA ABAIXO. QUEM SOU EU?',
 texto:['ESTOU NA FACA QUE CORTA O BOLO,',
        'ESTOU NA FADA DA HISTÓRIA,',
        'ESTOU NA FESTA DE ANIVERSÁRIO,',
        'E VENHO LOGO DEPOIS DO E NO ALFABETO.'],
 pede:'QUAL LETRA ESTÁ FALANDO NA CHARADA?',
 opts:[
  {t:'A LETRA A.', no:'O A não passa na última pista. O A é a PRIMEIRA letra do alfabeto e não vem depois de ninguém. Ele aparece em FACA, em FADA e em FESTA: passa em três pistas, e é por isso que ele atrai.'},
  {t:'A LETRA E.', no:'Quem vem logo depois do E é outra letra, nunca o próprio E. O E também não está em FACA nem em FADA. Ele aparece em FESTA e está escrito na última pista, e é isso que puxa o olho.'},
  {t:'A LETRA F.', ok:1},
  {t:'A LETRA C.', no:'O C não está em FADA nem em FESTA. E quem vem logo depois do E não é o C: o C fica entre o B e o D. Ele aparece só em FACA.'}
 ],
 dica:'As três primeiras pistas são palavras. Ache a letra que aparece nas três. Depois cante o alfabeto para conferir a última.',
 truque:'Na charada, cada linha é uma pista da mesma letra. Confira as quatro antes de marcar.',
 visual:'<div class="pcs"><span class="pc hit"><b>F</b>ACA</span><span class="pc hit"><b>F</b>ADA</span>'+
        '<span class="pc hit"><b>F</b>ESTA</span><span class="pc hit">E &middot; <b>F</b> &middot; G</span></div>'+
        '<p class="vx">As quatro pistas fecham no <b>F</b>.</p>'+
        '<div class="pcs"><span class="pc hit">F<b>A</b>C<b>A</b></span><span class="pc hit">F<b>A</b>D<b>A</b></span>'+
        '<span class="pc hit">FEST<b>A</b></span><span class="pc bad">depois do E? n&atilde;o</span></div>'+
        '<p class="vx">O <span class="bad2">A</span> passa em tr&ecirc;s e morre na quarta: ele &eacute; o come&ccedil;o do alfabeto.</p>',
 porque:'O F está em FACA, em FADA e em FESTA. E é a letra que vem logo depois do E no alfabeto. Só o F passa nas quatro pistas.',
 proximo:'Depois de achar a letra que aparece nas palavras, cante o alfabeto para conferir a pista do lugar. É ela que decide.'},

{id:'TR84', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'LEIA A CHARADA ABAIXO. QUEM SOU EU?',
 texto:['ESTOU NA BOLA QUE VOCÊ CHUTA,',
        'ESTOU NO BOLO QUE A VOVÓ FAZ,',
        'ESTOU NA BOLSA DA SUA MÃE,',
        'E MORO ENTRE O A E O C NO ALFABETO.'],
 pede:'QUAL LETRA ESTÁ FALANDO NA CHARADA?',
 opts:[
  {t:'A LETRA B.', ok:1},
  {t:'A LETRA L.', no:'O L não passa na última pista. O L mora entre o K e o M, longe do começo do alfabeto. Ele aparece em BOLA, em BOLO e em BOLSA: passa em três pistas, e é por isso que ele atrai.'},
  {t:'A LETRA S.', no:'O S não está em BOLA nem em BOLO. E o S mora entre o R e o T. Ele aparece só em BOLSA.'},
  {t:'A LETRA C.', no:'Quem mora ENTRE o A e o C não pode ser o próprio C: ele é uma das pontas. O C também não aparece em BOLA, em BOLO nem em BOLSA. Ele está escrito na última pista, e é isso que puxa o olho.'}
 ],
 dica:'As três primeiras pistas são palavras. Ache a letra que aparece nas três. Depois cante o alfabeto para conferir a última.',
 truque:'Na charada, cada linha é uma pista da mesma letra. Confira as quatro antes de marcar.',
 visual:'<div class="pcs"><span class="pc hit"><b>B</b>OLA</span><span class="pc hit"><b>B</b>OLO</span>'+
        '<span class="pc hit"><b>B</b>OLSA</span><span class="pc hit">A &middot; <b>B</b> &middot; C</span></div>'+
        '<p class="vx">As quatro pistas fecham no <b>B</b>.</p>'+
        '<div class="pcs"><span class="pc hit">BO<b>L</b>A</span><span class="pc hit">BO<b>L</b>O</span>'+
        '<span class="pc hit">BO<b>L</b>SA</span><span class="pc bad">A &middot; L? &middot; C</span></div>'+
        '<p class="vx">O <span class="bad2">L</span> passa em tr&ecirc;s e morre na quarta: ele mora entre o K e o M.</p>',
 porque:'O B está em BOLA, em BOLO e em BOLSA. E é a letra que fica entre o A e o C no alfabeto. Só o B passa nas quatro pistas.',
 proximo:'Quando a pista diz ENTRE duas letras, risque as duas na hora. A resposta é a que fica espremida no meio delas.'},

{id:'TR85', eixo:'alfabeto', origem:'Treino no estilo da prova',
 enun:'LEIA A CHARADA ABAIXO. QUEM SOU EU?',
 texto:['COMEÇO COM UM RISCO EM PÉ, DE CIMA A BAIXO,',
        'ESTOU NA PIPA QUE VOA NO CÉU,',
        'ESTOU NA PIPOCA DO CINEMA,',
        'E VENHO LOGO DEPOIS DO O NO ALFABETO.'],
 pede:'QUAL LETRA ESTÁ FALANDO NA CHARADA?',
 opts:[
  {t:'A LETRA I.', no:'O I não passa na última pista. Quem vem logo depois do O é outra letra; o I mora entre o H e o J. O I também é um risco em pé e aparece em PIPA e em PIPOCA: passa em três pistas, e é por isso que ele atrai.'},
  {t:'A LETRA A.', no:'O A não começa com um risco em pé: ele é feito de dois riscos tortos e um deitado. E o A é a primeira letra do alfabeto, não vem depois do O. Ele aparece em PIPA e em PIPOCA.'},
  {t:'A LETRA P.', ok:1},
  {t:'A LETRA O.', no:'O O não tem risco em pé: ele é uma bolinha. Quem vem logo depois do O também não pode ser ele mesmo. Ele aparece em PIPOCA e está escrito na última pista, e é isso que puxa o olho.'}
 ],
 dica:'A primeira pista é sobre o DESENHO da letra. As duas do meio são palavras. A última é o lugar dela no alfabeto. Confira as quatro.',
 truque:'Na charada, a letra fala dela mesma. Pense na forma dela e no som dela — e confira TODAS as pistas.',
 visual:'<div class="pcs"><span class="pc hit">risco em p&eacute; + barriga = <b>P</b></span><span class="pc hit"><b>P</b>IPA</span>'+
        '<span class="pc hit"><b>P</b>IPOCA</span><span class="pc hit">O &middot; <b>P</b> &middot; Q</span></div>'+
        '<p class="vx">As quatro pistas fecham no <b>P</b>.</p>'+
        '<div class="pcs"><span class="pc hit">risco em p&eacute; = I</span><span class="pc hit">P<b>I</b>PA</span>'+
        '<span class="pc hit">P<b>I</b>POCA</span><span class="pc bad">depois do O? n&atilde;o</span></div>'+
        '<p class="vx">O <span class="bad2">I</span> passa em tr&ecirc;s pistas e morre na quarta.</p>',
 porque:'O P começa com um risco em pé. Está em PIPA e em PIPOCA. E é a letra que vem logo depois do O no alfabeto. Só o P passa nas quatro pistas.',
 proximo:'Quando a charada fala do desenho da letra, desenhe as quatro no papel. Duas letras podem ter o mesmo risco, e aí é a pista do alfabeto que separa.'},

{id:'TR86', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA, E UM MESMO SÍMBOLO PODE APARECER MAIS DE UMA VEZ NA SEQUÊNCIA.',
 quadro:'<table class="tbc"><tr><td>&#9733;</td><td>&#9632;</td><td>&#9829;</td><td>&#9650;</td><td>&#9679;</td><td>&#9670;</td><td>&#9788;</td><td>&#9660;</td></tr>'+
        '<tr><td>TA</td><td>ES</td><td>MA</td><td>QUEM</td><td>PAN</td><td>LES</td><td>CAN</td><td>SEUS</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9788; &#9733; &#9660; &#9829; &#9670; &#9632; &#9679; &#9733;</div>',
 pede:'ESSA SEQUÊNCIA ESCONDE UM DITADO. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'QUEM CANTA MALES ESPANTA.', no:'Essa pulou o quarto símbolo. No lugar onde ela não escreve nada, a tabela diz SEUS. São nove símbolos na fila e sete pedaços nessa frase.'},
  {t:'QUEM CANTA SEUS MALES ESPANTA.', ok:1},
  {t:'QUEM CANTA SEUS MALES AFASTA.', no:'Essa troca o fim da frase. Os dois últimos símbolos valem ES e PAN, e AFAS não existe na tabela. Quem reconhece o ditado no meio do caminho completa de memória e cai aqui.'},
  {t:'QUEM CANTA SEUS MALES ESPALHA.', no:'Essa troca a última palavra. O oitavo símbolo é o círculo preto, e o círculo preto vale PAN. LHA não existe na tabela.'}
 ],
 dica:'A estrela aparece duas vezes na sequência: na terceira posição e na última. Cada vez que ela aparece, você escreve a mesma sílaba de novo.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">QUEM</span><span class="pc hit">CAN</span><span class="pc hit">TA</span><span class="pc hit">SEUS</span>'+
        '<span class="pc hit">MA</span><span class="pc hit">LES</span><span class="pc hit">ES</span><span class="pc hit">PAN</span><span class="pc hit">TA</span></div>'+
        '<p class="vx">A estrela apareceu na 3&ordf; e na 9&ordf; posi&ccedil;&atilde;o, e nas duas vezes vale <b>TA</b>.</p>'+
        '<div class="pcs"><span class="pc bad">AFAS</span><span class="arw">&rarr;</span><span class="pc bad">n&atilde;o existe na tabela</span>'+
        '<span class="pc bad">LHA</span><span class="arw">&rarr;</span><span class="pc bad">n&atilde;o existe na tabela</span></div>',
 porque:'Na ordem dos símbolos sai QUEM CAN-TA SEUS MA-LES ES-PAN-TA. A estrela vale TA e aparece duas vezes: uma no fim de CANTA e outra no fim de ESPANTA.',
 proximo:'Quando um símbolo se repete, escreva a mesma sílaba nas duas vezes. Não invente uma sílaba nova só porque a frase ficaria mais bonita.'},

{id:'TR87', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA: É PRECISO CAÇAR CADA SÍMBOLO.',
 quadro:'<table class="tbc"><tr><td>&#9679;</td><td>&#9733;</td><td>&#9650;</td><td>&#9829;</td><td>&#9670;</td><td>&#9632;</td><td>&#9788;</td><td>&#10022;</td></tr>'+
        '<tr><td>VAI</td><td>LON</td><td>DE</td><td>GE</td><td>AO</td><td>VA</td><td>SE</td><td>GAR</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9632; &#10022; &#9788; &#9679; &#9670; &#9733; &#9829;</div>',
 pede:'ESSA SEQUÊNCIA ESCONDE UM DITADO. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'DEVAGAR SE VAI LONGE.', no:'Essa pulou o sexto símbolo. No lugar onde ela não escreve nada, a tabela diz AO. São oito símbolos na fila e sete pedaços nessa frase.'},
  {t:'DEVAGAR SE VAI AO MAR.', no:'Essa troca o fim da frase. Os dois últimos símbolos valem LON e GE, e MAR não existe na tabela. Quem decifra metade e completa de memória cai aqui.'},
  {t:'DEVAGAR SE VAI AO LONGE.', ok:1},
  {t:'DEVAGAR SE VAI AO LONGO.', no:'Essa troca a última palavra. O último símbolo é o coração, e o coração vale GE. GO não existe na tabela.'}
 ],
 dica:'Escreva a sílaba embaixo de cada símbolo, um por um, sem pular nenhum. Só junte tudo depois que o último símbolo estiver escrito.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">DE</span><span class="pc hit">VA</span><span class="pc hit">GAR</span><span class="pc hit">SE</span>'+
        '<span class="pc hit">VAI</span><span class="pc hit">AO</span><span class="pc hit">LON</span><span class="pc hit">GE</span></div>'+
        '<p class="vx">Oito s&iacute;mbolos, oito peda&ccedil;os escritos. S&oacute; no fim a gente junta.</p>'+
        '<div class="pcs"><span class="pc hit">LON</span><span class="pc hit">GE</span><span class="arw">&rarr;</span>'+
        '<span class="pc bad">LON</span><span class="pc bad">GO</span></div>'+
        '<p class="vx">Uma letra de diferen&ccedil;a no &uacute;ltimo peda&ccedil;o &mdash; e o GO nem est&aacute; na tabela.</p>',
 porque:'Na ordem dos símbolos sai DE-VA-GAR SE VAI AO LON-GE: DEVAGAR SE VAI AO LONGE. As oito sílabas foram usadas na ordem em que os símbolos aparecem.',
 proximo:'Confira as sílabas do FIM com o mesmo cuidado das do começo. É no fim que a memória tenta completar o ditado sozinha.'},

{id:'TR88', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA.',
 quadro:'<table class="tbc"><tr><td>&#9733;</td><td>&#9632;</td><td>&#9679;</td><td>&#9650;</td><td>&#9660;</td><td>&#9670;</td><td>&#9829;</td><td>&#9788;</td><td>&#9834;</td><td>&#10022;</td></tr>'+
        '<tr><td>LA</td><td>TEM</td><td>CHO</td><td>HO</td><td>DE</td><td>TE</td><td>BO</td><td>CO</td><td>JE</td><td>LO</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9834; &#9632; &#9829; &#10022; &#9660; &#9679; &#9788; &#9733; &#9670;</div>',
 nota:'Repare no fim da fila: os quatro últimos símbolos não formam quatro palavrinhas, formam UMA palavra só. É a parte em que todo mundo se perde.',
 pede:'ESSA SEQUÊNCIA ESCONDE UMA FRASE. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'HOJE TEM BOLO CHOCOLATE.', no:'Essa pulou o sexto símbolo. No lugar onde ela não escreve nada, a tabela diz DE. São dez símbolos na fila e nove pedaços nessa frase.'},
  {t:'HOJE TEM BOLO DE MORANGO.', no:'Essa troca o fim da frase. Os quatro últimos símbolos valem CHO, CO, LA e TE. MO, RAN e GO não existem na tabela. Quem lê metade e completa com o que gostaria de comer cai aqui.'},
  {t:'HOJE TEM BOLO DE CHOCOLATE.', ok:1},
  {t:'HOJE TEM BOLO DE CHOCOLATES.', no:'Essa põe um S que a fila não tem. A fila acaba no losango, e o losango vale TE. Não existe nenhum S na tabela.'}
 ],
 dica:'Escreva a sílaba embaixo de cada símbolo, um por um. Os quatro últimos, juntos, formam uma palavra só.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">HO</span><span class="pc hit">JE</span><span class="pc hit">TEM</span>'+
        '<span class="pc hit">BO</span><span class="pc hit">LO</span><span class="pc hit">DE</span></div>'+
        '<div class="pcs"><span class="pc hit">CHO</span><span class="pc hit">CO</span><span class="pc hit">LA</span><span class="pc hit">TE</span></div>'+
        '<p class="vx">Os quatro &uacute;ltimos s&iacute;mbolos formam <b>uma palavra s&oacute;</b>: CHO-CO-LA-TE.</p>'+
        '<div class="pcs"><span class="pc hit">TE</span><span class="arw">&rarr;</span><span class="pc bad">TES</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">n&atilde;o existe S na tabela</span></div>',
 porque:'Na ordem dos símbolos sai HO-JE TEM BO-LO DE CHO-CO-LA-TE. Os quatro últimos símbolos formam uma palavra só, CHOCOLATE, e a fila acaba no símbolo que vale TE.',
 proximo:'Nunca adivinhe o fim de um código porque reconheceu o começo. Vá até o último símbolo com o dedo.'},

{id:'TR89', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. UM MESMO SÍMBOLO PODE APARECER MAIS DE UMA VEZ NA SEQUÊNCIA.',
 quadro:'<table class="tbc"><tr><td>&#9660;</td><td>&#9733;</td><td>&#9650;</td><td>&#9829;</td><td>&#9632;</td><td>&#9788;</td><td>&#9670;</td><td>&#9679;</td><td>&#10022;</td></tr>'+
        '<tr><td>DO</td><td>L&Atilde;O</td><td>CAI</td><td>SA</td><td>NA</td><td>A</td><td>B&Atilde;O</td><td>RU</td><td>BA</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9650; &#10022; &#9733; &#9632; &#9679; &#9788; &#9660; &#9829; &#9670;</div>',
 pede:'ESSA SEQUÊNCIA ESCONDE UM PEDACINHO DE UMA CANTIGA. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'CAI CAI BALÃO NA RUA SABÃO.', no:'Essa pulou o oitavo símbolo. No lugar onde ela não escreve nada, a tabela diz DO. São dez símbolos na fila e nove pedaços nessa frase.'},
  {t:'CAI CAI BALÃO NA MINHA MÃO.', no:'Essa troca o fim da frase. Os últimos símbolos valem RU, A, DO, SA e BÃO. MI, NHA e MÃO não existem na tabela. Quem canta a música de memória completa o resto sem olhar a fila.'},
  {t:'CAI CAI BALÃO NA RUA DO SABÃO.', ok:1},
  {t:'CAI CAI BALÃO NA RUA DO JOÃO.', no:'Essa troca a última palavra. Os dois últimos símbolos valem SA e BÃO, e JO não existe na tabela. SABÃO e JOÃO terminam igual e passam no ouvido.'}
 ],
 dica:'O triângulo aparece duas vezes, logo no começo, um atrás do outro. Ele vale a mesma sílaba nas duas vezes.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">CAI</span><span class="pc hit">CAI</span><span class="pc hit">BA</span><span class="pc hit">L&Atilde;O</span>'+
        '<span class="pc hit">NA</span><span class="pc hit">RU</span><span class="pc hit">A</span><span class="pc hit">DO</span>'+
        '<span class="pc hit">SA</span><span class="pc hit">B&Atilde;O</span></div>'+
        '<p class="vx">O tri&acirc;ngulo apareceu na 1&ordf; e na 2&ordf; posi&ccedil;&atilde;o, e nas duas vezes vale <b>CAI</b>.</p>'+
        '<div class="pcs"><span class="pc hit">SA</span><span class="pc hit">B&Atilde;O</span><span class="arw">&rarr;</span>'+
        '<span class="pc bad">JO</span><span class="pc bad">n&atilde;o existe na tabela</span></div>',
 porque:'Na ordem dos símbolos sai CAI CAI BA-LÃO NA RU-A DO SA-BÃO. O triângulo vale CAI e aparece duas vezes seguidas, no começo da cantiga.',
 proximo:'Símbolo repetido continua valendo a mesma peça. Escreva a sílaba nas duas vezes antes de ler a frase inteira.'},

{id:'TR90', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NESTA TABELA, CADA SÍMBOLO VALE UMA LETRA — NÃO É UMA SÍLABA, É UMA LETRA SÓ. A TABELA ESTÁ EMBARALHADA.',
 quadro:'<table class="tbc"><tr><td>&#9679;</td><td>&#9660;</td><td>&#9733;</td><td>&#9834;</td><td>&#9632;</td><td>&#9670;</td></tr>'+
        '<tr><td>C</td><td>A</td><td>B</td><td>H</td><td>R</td><td>O</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9733; &#9670; &#9632; &#9632; &#9660; &#9679; &#9834; &#9660;</div>',
 pede:'JUNTE AS LETRAS NA ORDEM DOS SÍMBOLOS. QUAL PALAVRA A SEQUÊNCIA FORMA?',
 opts:[
  {t:'BOLACHA.', no:'Essa põe um L que a tabela não tem. O terceiro e o quarto símbolos são o mesmo quadrado, e o quadrado vale R: são dois R seguidos. BOLACHA e BORRACHA passam quase igual no ouvido.'},
  {t:'BORRACHA.', ok:1},
  {t:'BARRACA.', no:'Essa erra a ordem das letras. O segundo símbolo é o losango, e o losango vale O, não A. As letras de BARRACA existem na tabela, e é isso que puxa o olho.'},
  {t:'BORRACHAS.', no:'Essa põe um S que a fila não tem. A fila acaba no triângulo de ponta para baixo, e ele vale A. Não existe nenhum S na tabela.'}
 ],
 dica:'São oito símbolos, então a palavra tem oito letras. Escreva uma letra embaixo de cada símbolo antes de olhar as alternativas.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">B</span><span class="pc hit">O</span><span class="pc hit">R</span><span class="pc hit">R</span>'+
        '<span class="pc hit">A</span><span class="pc hit">C</span><span class="pc hit">H</span><span class="pc hit">A</span></div>'+
        '<p class="vx">Oito s&iacute;mbolos, oito letras: <b>BORRACHA</b>. O quadrado aparece duas vezes seguidas e vale <b>R</b> nas duas.</p>'+
        '<div class="pcs"><span class="pc hit">B</span><span class="pc bad">A?</span><span class="arw">&rarr;</span>'+
        '<span class="pc bad">o 2&ordm; s&iacute;mbolo vale O</span></div>'+
        '<p class="vx">BARRACA usa letras que existem na tabela, mas na ordem errada.</p>',
 porque:'Na ordem dos símbolos as letras são B, O, R, R, A, C, H, A: BORRACHA. São oito símbolos e oito letras — nenhuma sobra e nenhuma falta.',
 proximo:'Conte os símbolos ANTES de escolher e veja se algum se repete. Ter as letras certas não basta: a ORDEM é que decide.'},

{id:'TR91', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA: É PRECISO CAÇAR CADA SÍMBOLO.',
 quadro:'<table class="tbc"><tr><td>&#9632;</td><td>&#9733;</td><td>&#9660;</td><td>&#9679;</td><td>&#9829;</td><td>&#9650;</td><td>&#9670;</td><td>&#9788;</td><td>&#10022;</td></tr>'+
        '<tr><td>QUE</td><td>MAIS</td><td>DO</td><td>LE</td><td>NUN</td><td>VA</td><td>CA</td><td>TAR</td><td>DE</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9733; &#9650; &#9679; &#9788; &#10022; &#9660; &#9632; &#9829; &#9670;</div>',
 pede:'ESSA SEQUÊNCIA ESCONDE UM DITADO. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'MAIS VALE TARDE QUE NUNCA.', no:'Essa pulou o sexto símbolo. No lugar onde ela não escreve nada, a tabela diz DO. São nove símbolos na fila e oito pedaços nessa frase. Muita gente fala o ditado assim, e é por isso que ela atrai.'},
  {t:'MAIS VALE CEDO DO QUE NUNCA.', no:'Essa troca a palavra do meio. O quarto e o quinto símbolos valem TAR e DE, e CE não existe na tabela.'},
  {t:'MAIS VALE TARDE DO QUE NADA.', no:'Essa troca o fim da frase. Os dois últimos símbolos valem NUN e CA. NA e DA não existem na tabela.'},
  {t:'MAIS VALE TARDE DO QUE NUNCA.', ok:1}
 ],
 dica:'Escreva a sílaba embaixo de cada símbolo, um por um, sem pular nenhum. Só junte tudo depois que o último símbolo estiver escrito.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">MAIS</span><span class="pc hit">VA</span><span class="pc hit">LE</span><span class="pc hit">TAR</span>'+
        '<span class="pc hit">DE</span><span class="pc hit">DO</span><span class="pc hit">QUE</span><span class="pc hit">NUN</span><span class="pc hit">CA</span></div>'+
        '<p class="vx">Nove s&iacute;mbolos, nove pe&ccedil;as escritas. S&oacute; no fim a gente junta.</p>'+
        '<div class="pcs"><span class="pc bad">DO pulado</span><span class="arw">&rarr;</span>'+
        '<span class="pc bad">sobra s&iacute;mbolo na fila</span></div>'+
        '<p class="vx">O jeito de falar em casa n&atilde;o manda. Manda a fila de s&iacute;mbolos.</p>',
 porque:'Na ordem dos símbolos sai MAIS VA-LE TAR-DE DO QUE NUN-CA: MAIS VALE TARDE DO QUE NUNCA. As nove sílabas da tabela foram usadas na ordem em que os símbolos aparecem.',
 proximo:'Conte os símbolos e conte os pedaços da frase antes de marcar. Se os dois números não baterem, algum símbolo foi pulado.'},

{id:'TR92', eixo:'codigo', origem:'Treino no estilo da prova',
 enun:'NA TABELA ABAIXO, CADA SÍMBOLO VALE UMA SÍLABA. A TABELA ESTÁ EMBARALHADA, E UM MESMO SÍMBOLO PODE APARECER MAIS DE UMA VEZ NA SEQUÊNCIA.',
 quadro:'<table class="tbc"><tr><td>&#9733;</td><td>&#9679;</td><td>&#9650;</td><td>&#9632;</td><td>&#9829;</td><td>&#9660;</td><td>&#9788;</td><td>&#9670;</td><td>&#9834;</td><td>&#10022;</td></tr>'+
        '<tr><td>LA</td><td>VOU</td><td>A</td><td>ES</td><td>NH&Atilde;</td><td>RA</td><td>CO</td><td>MA</td><td>PA</td><td>EU</td></tr></table>'+
        '<div class="sep"></div><b>A SEQU&Ecirc;NCIA:</b><div class="seq">&#9650; &#9670; &#9829; &#10022; &#9679; &#9834; &#9660; &#9650; &#9632; &#9788; &#9733;</div>',
 nota:'Repare no fim da fila: os três últimos símbolos não formam três palavrinhas, formam UMA palavra só.',
 pede:'ESSA SEQUÊNCIA ESCONDE UMA FRASE. JUNTE AS SÍLABAS NA ORDEM DOS SÍMBOLOS E ASSINALE A FRASE FORMADA.',
 opts:[
  {t:'AMANHÃ EU VOU PARA ESCOLA.', no:'Essa pulou o oitavo símbolo. No lugar onde ela não escreve nada, a tabela diz A. São onze símbolos na fila e dez pedaços nessa frase.'},
  {t:'AMANHÃ EU VOU PARA A ESCOLA.', ok:1},
  {t:'AMANHÃ EU VOU PARA A PRAIA.', no:'Essa troca o fim da frase. Os três últimos símbolos valem ES, CO e LA, e PRAI não existe na tabela. Quem decifra metade e completa com o passeio que prefere cai aqui.'},
  {t:'AMANHÃ EU VOU PARA A ESCOLINHA.', no:'Essa põe dois pedaços que a fila não tem. A fila acaba na estrela, e a estrela vale LA. LI e NHA não existem na tabela.'}
 ],
 dica:'O triângulo aparece duas vezes: na primeira posição e na oitava. Ele vale a mesma sílaba nas duas vezes.',
 truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
 visual:'<div class="pcs"><span class="pc hit">A</span><span class="pc hit">MA</span><span class="pc hit">NH&Atilde;</span><span class="pc hit">EU</span>'+
        '<span class="pc hit">VOU</span><span class="pc hit">PA</span><span class="pc hit">RA</span><span class="pc hit">A</span></div>'+
        '<div class="pcs"><span class="pc hit">ES</span><span class="pc hit">CO</span><span class="pc hit">LA</span></div>'+
        '<p class="vx">O tri&acirc;ngulo vale <b>A</b> nas duas vezes: no come&ccedil;o de AMANH&Atilde; e sozinho, antes de ESCOLA. Os tr&ecirc;s &uacute;ltimos s&iacute;mbolos formam <b>uma palavra s&oacute;</b>.</p>'+
        '<div class="pcs"><span class="pc hit">PA</span><span class="pc hit">RA</span><span class="pc bad">A pulado</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">sobra s&iacute;mbolo na fila</span></div>',
 porque:'Na ordem dos símbolos sai A-MA-NHÃ EU VOU PA-RA A ES-CO-LA. O triângulo vale A e aparece duas vezes: no começo de AMANHÃ e sozinho, antes de ESCOLA.',
 proximo:'Sílaba de uma letra só também tem símbolo. Antes de marcar, confira se o número de pedaços da frase é igual ao número de símbolos da fila.'},
