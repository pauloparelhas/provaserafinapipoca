/* ============================================================
   reserva_treino_D.js — BLOCO DE ITENS DE TREINO (AUTORAIS)
   Categoria G · 2º ano · 14 questões · ids TR39 a TR52
   Eixos: `letras` (TR39–TR45) e `silabas` (TR46–TR52), 7 + 7.

   ATENÇÃO — ESTAS QUESTÕES NÃO SÃO DE PROVA.
   Nenhum item deste arquivo saiu de uma prova da Olimpíada de
   Português. São exercícios ESCRITOS POR NÓS, no molde da banca,
   e por isso a `origem` de todos é a mesma frase, sem ano e sem
   número de questão: 'Treino no estilo da prova'. Citar ano/fase/
   questão aqui seria mentira — o banco oficial (OP_data.js) só usa
   `origem` com ano quando o enunciado é verbatim do PDF.

   POR QUE ESTE ARQUIVO EXISTE
   `letras` e `silabas` são, juntos, o coração da prova: metade das
   questões de 2024 e 2025 é operação com letra e sílaba. O banco
   verbatim tem poucos itens desses eixos, e a criança já reconhece
   GOLFINHO, SACOLA e CAFANGA em vez de resolvê-los. Estes 14 itens
   dão volume de treino nos dois eixos sem gastar prova de verdade.

   NENHUMA PALAVRA-ALVO SE REPETE. Nenhum gabarito daqui é alvo de
   item já existente (GALO/GOLA, GELO/GOLE, GOLFINHO, GALHO, APITO,
   CENTRO, TERNO, LONTRA, PANELA, ACENTUAVA, SACOLA, CAFANGA, PALMEIRA,
   CABANA, SAPATO, SOCORRER, CARATECA, A VIDA É BELA, CANETA, TELEFONE,
   CAMELO), nem se repete entre os 14 daqui.

   COMO FORAM ESCRITAS (assinatura da banca, obedecida item a item)
   - `letras`: em toda questão de montar palavra há um distrator que
     PEDE UMA LETRA QUE NÃO FOI DADA (foi assim que GAFANHOTO caiu em
     2025) e, nas de trocar vogal, distratores que FORMAM OUTRA PALAVRA,
     que não é a coisa descrita na pergunta (foi assim que GOTA e GOLE
     pegaram).
   - `silabas`: em toda questão há o distrator do tipo GALOPANTE —
     parece feito das peças, e UMA sílaba não existe, por diferença de
     uma letra (CHI×CHA, CA×CO, MÃO×MO, SOR×SO, VE×VER, BA×BO) — e o
     distrator que PARA CEDO, gastando só parte das peças.
   - Toda contagem foi feita peça por peça, riscando, nas quatro
     alternativas de cada item. As contas ficam explícitas no `visual`
     e no `porque`.
   - Zero metalinguagem: só VOGAL, CONSOANTE, SÍLABA, LETRA, ALFABETO.
   - `truque` é copiado palavra por palavra da família em FAMILIAS
     (letras e silabas). Não se inventa truque novo.

   COMO ESTÃO ESCRITOS OS COMENTÁRIOS DE ERRO (regra de redação)
   Nenhum `no` valida a alternativa antes de negá-la. Nada de "é
   verdade, mas", "está certo, porém", "não deixa de ser": a criança
   guarda a primeira metade da frase e larga a segunda. O `no` começa
   pelo FATO conferível — a peça que falta, a que sobra, a letra que
   ninguém deu — e só depois diz onde estava a isca. Uma ideia por
   frase. A `dica` funciona ANTES de ela saber a resposta, e o
   `proximo` dá o GESTO da próxima questão, sem repetir o truque.

   Colar dentro da lista ITENS do OP_data.js (ou do carregador de
   reservas), exatamente como está.
   ============================================================ */

{id:'TR39', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'NA BRINCADEIRA DAS VOGAIS, SÓ AS VOGAIS MUDAM DE LUGAR: AS OUTRAS LETRAS FICAM PARADAS. POR EXEMPLO, TOCA VIRA TACO.',
 pede:'TROCANDO AS VOGAIS DE LUGAR, QUAL DAS PALAVRAS ABAIXO SE TRANSFORMA NUMA COMIDA QUENTE QUE A GENTE TOMA DE COLHER?',
 opts:[
  {t:'SALTO.', no:'SALTO com as vogais trocadas vira SOLTA. Ninguém toma solta de colher. Formar palavra não basta: tem de ser a coisa que a pergunta descreveu.'},
  {t:'SAPO.', ok:1},
  {t:'COLA.', no:'COLA com as vogais trocadas vira CALO. Calo é aquilo que nasce no pé de tanto andar. Não é comida e não se toma de colher.'},
  {t:'VELA.', no:'VELA com as vogais trocadas vira VALE. Vale não é comida quente. Aqui três trocas formam palavra, e o que decide é a comida.'}
 ],
 dica:'Vogal é A, E, I, O, U. Marque as duas vogais da palavra. Troque só elas de lugar e leia o que saiu.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">S</span><span class="pc hit">A</span><span class="pc">P</span><span class="pc hit">O</span>'+
        '<span class="arw">&rarr;</span><span class="pc">S</span><span class="pc hit">O</span><span class="pc">P</span><span class="pc hit">A</span></div>'+
        '<p class="vx">O <b>A</b> e o <b>O</b> trocaram. O S e o P n&atilde;o sa&iacute;ram do lugar: virou <b>SOPA</b>.</p>'+
        '<div class="pcs"><span class="pc bad">SALTO &rarr; SOLTA</span><span class="pc bad">COLA &rarr; CALO</span><span class="pc bad">VELA &rarr; VALE</span></div>'+
        '<p class="vx">As tr&ecirc;s trocas formam palavra. Nenhuma delas &eacute; comida quente de colher.</p>',
 porque:'Em SAPO as vogais são o A e o O. Trocando as duas de lugar, com o S e o P parados: S-O-P-A. A sopa é quente e a gente toma de colher.',
 proximo:'Troque as vogais nas QUATRO palavras e leia as quatro. Marque só depois de saber o que saiu de cada uma.'},

{id:'TR40', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'DE NOVO A BRINCADEIRA DAS VOGAIS: SÓ ELAS MUDAM DE LUGAR, E AS OUTRAS LETRAS FICAM PARADAS.',
 pede:'TROCANDO AS VOGAIS DE LUGAR, QUAL DAS PALAVRAS ABAIXO SE TRANSFORMA NUMA COISA QUE A GENTE FAZ NA AULA DE MATEMÁTICA?',
 opts:[
  {t:'MANTO.', no:'MANTO com as vogais trocadas vira MONTA. Montar é subir no cavalo. Não é coisa de aula de matemática.'},
  {t:'CANTO.', ok:1},
  {t:'BANHO.', no:'BANHO com as vogais trocadas vira BONHA. BONHA não é palavra nenhuma. Leia sempre o que saiu da troca antes de marcar.'},
  {t:'CARRO.', no:'CARRO com as vogais trocadas vira CORRA. Correr é na educação física. A pergunta pede a aula de matemática.'}
 ],
 dica:'Vogal é A, E, I, O, U. Troque as duas vogais de cada palavra e leia o que saiu. Só então pergunte: isso é coisa de aula de matemática?',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">C</span><span class="pc hit">A</span><span class="pc">N</span><span class="pc">T</span><span class="pc hit">O</span>'+
        '<span class="arw">&rarr;</span><span class="pc">C</span><span class="pc hit">O</span><span class="pc">N</span><span class="pc">T</span><span class="pc hit">A</span></div>'+
        '<p class="vx">O <b>A</b> e o <b>O</b> trocaram de lugar. O C, o N e o T ficaram parados: <b>CONTA</b>.</p>'+
        '<div class="pcs"><span class="pc bad">MANTO &rarr; MONTA</span><span class="pc bad">CARRO &rarr; CORRA</span><span class="pc bad">BANHO &rarr; BONHA</span></div>'+
        '<p class="vx">MONTA &eacute; do cavalo e CORRA &eacute; da corrida. BONHA nem palavra &eacute;.</p>',
 porque:'Em CANTO as vogais são o A e o O. Trocando as duas de lugar: C-O-N-T-A. Fazer uma conta é o que a gente faz na aula de matemática.',
 proximo:'Depois de trocar as vogais, faça duas perguntas. Essa palavra existe? Ela é o que a pergunta pediu? As duas têm de dar sim.'},

{id:'TR41', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'CAIO DERRUBOU O SACO DE LETRAS DE MADEIRA E JUNTOU DO CHÃO TODAS AS LETRAS DE UMA PALAVRA SÓ:',
 quadro:'A &ndash; R &ndash; T &ndash; U &ndash; A &ndash; G &ndash; R &ndash; T &ndash; A',
 pede:'MARQUE A PALAVRA QUE CAIO CONSEGUE FORMAR USANDO TODAS ESSAS LETRAS, UMA VEZ CADA:',
 opts:[
  {t:'GARRAFA.', no:'GARRAFA precisa de um F. Não há nenhum F entre as letras do chão. A isca é ela ter GA, RRA e vários A, iguais aos do quadro.'},
  {t:'TARTARUGA.', ok:1},
  {t:'GUITARRA.', no:'GUITARRA precisa de um I. Nenhum I foi dado. Conte também as letras: GUITARRA tem 8, e no chão há 9.'},
  {t:'GARRA.', no:'GARRA gasta 5 letras e para. Sobram os dois T, um A e o U. Letra que sobra na mesa quer dizer palavra errada.'}
 ],
 dica:'Conte quantas letras Caio juntou: são 9. Repare que tem TRÊS A, DOIS R e DOIS T. A palavra certa gasta todas.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">A</span><span class="pc">R</span><span class="pc">T</span><span class="pc">U</span><span class="pc">A</span><span class="pc">G</span><span class="pc">R</span><span class="pc">T</span><span class="pc">A</span><span class="arw">&rarr;</span><span class="pc hit">9 letras</span></div>'+
        '<div class="pcs"><span class="pc hit">T</span><span class="pc hit">A</span><span class="pc hit">R</span><span class="pc hit">T</span><span class="pc hit">A</span><span class="pc hit">R</span><span class="pc hit">U</span><span class="pc hit">G</span><span class="pc hit">A</span></div>'+
        '<p class="vx">TARTARUGA gasta as nove: os <b>tr&ecirc;s A</b>, os <b>dois R</b>, os <b>dois T</b>, o U e o G. Nada sobrou, nada faltou.</p>'+
        '<div class="pcs"><span class="pc bad">GARRA<b>F</b>A</span><span class="pc bad">GU<b>I</b>TARRA</span><span class="arw">&rarr;</span><span class="pc bad">pedem F e I, que ningu&eacute;m deu</span></div>'+
        '<div class="pcs"><span class="pc hit">G</span><span class="pc hit">A</span><span class="pc hit">R</span><span class="pc hit">R</span><span class="pc hit">A</span><span class="pc bad">T</span><span class="pc bad">T</span><span class="pc bad">A</span><span class="pc bad">U</span><span class="arw">&rarr;</span><span class="pc bad">GARRA deixou 4 no ch&atilde;o</span></div>',
 porque:'TARTARUGA usa exatamente as nove letras do chão, contando os três A, os dois R e os dois T. GARRAFA pede um F e GUITARRA pede um I. Nenhuma dessas duas letras foi dada. GARRA gasta só cinco e deixa quatro paradas.',
 proximo:'Procure primeiro as letras repetidas do quadro. Aqui eram três A, dois R e dois T. A palavra certa repete na mesma medida.'},

{id:'TR42', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'BRUNO RECORTOU AS LETRAS DE UMA FRUTA E ELAS SE ESPALHARAM PELA MESA:',
 quadro:'O &ndash; N &ndash; M &ndash; A &ndash; G &ndash; R &ndash; O',
 pede:'QUE PALAVRA BRUNO CONSEGUE MONTAR USANDO TODAS ESSAS LETRAS, UMA VEZ CADA?',
 opts:[
  {t:'MORCEGO.', no:'MORCEGO precisa de um C e de um E. Não há C nem E na mesa. A isca é ela ter 7 letras, o mesmo tanto do monte, e começar com MOR.'},
  {t:'AMOR.', no:'AMOR gasta 4 letras e para. Sobram o N, o G e o segundo O. Letra que sobra na mesa quer dizer palavra errada.'},
  {t:'MORANGO.', ok:1},
  {t:'MARROM.', no:'MARROM precisa de DOIS M e de DOIS R. Bruno recortou um M só e um R só. Conte as letras repetidas antes de marcar.'}
 ],
 dica:'Conte as letras da mesa: são 7, e DUAS delas são O. A palavra certa gasta as sete e não deixa nenhuma para trás.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="pc">N</span><span class="pc">M</span><span class="pc">A</span><span class="pc">G</span><span class="pc">R</span><span class="pc">O</span><span class="arw">&rarr;</span><span class="pc hit">7 letras, com dois O</span></div>'+
        '<div class="pcs"><span class="pc hit">M</span><span class="pc hit">O</span><span class="pc hit">R</span><span class="pc hit">A</span><span class="pc hit">N</span><span class="pc hit">G</span><span class="pc hit">O</span></div>'+
        '<p class="vx">MORANGO gasta as sete, inclusive os <b>dois O</b>. Nada sobrou, nada faltou.</p>'+
        '<div class="pcs"><span class="pc bad">MOR<b>C</b>E<b>G</b>O</span><span class="arw">&rarr;</span><span class="pc bad">pede C e E, que ningu&eacute;m deu</span></div>'+
        '<div class="pcs"><span class="pc bad"><b>M</b>ARRO<b>M</b></span><span class="arw">&rarr;</span><span class="pc bad">pede dois M e dois R</span></div>'+
        '<div class="pcs"><span class="pc hit">A</span><span class="pc hit">M</span><span class="pc hit">O</span><span class="pc hit">R</span><span class="pc bad">N</span><span class="pc bad">G</span><span class="pc bad">O</span><span class="arw">&rarr;</span><span class="pc bad">AMOR deixou 3 na mesa</span></div>',
 porque:'MORANGO usa exatamente as sete letras da mesa, contando os dois O. MORCEGO pede um C e um E que não foram recortados. MARROM pede um segundo M e um segundo R. AMOR gasta só quatro e deixa três letras paradas.',
 proximo:'Antes de conferir letra por letra, conte as duas quantidades. Número de letras diferente já derruba a alternativa.'},

{id:'TR43', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'A FRASE ABAIXO ESTÁ UM POUCO ESTRANHA, MAS, MUDANDO UMA LETRA DE LUGAR, CONSEGUIMOS CONSERTÁ-LA.',
 quadro:'O PRATO NADOU NO LAGO E O PATO CAIU DA MESA.',
 pede:'QUAL É ESSA LETRA?',
 opts:[
  {t:'B.', no:'Não existe nenhum B em PRATO nem em PATO. Uma letra que não está lá não pode mudar de lugar. Essa se risca de cara.'},
  {t:'T.', no:'Tirando o T de PRATO sobra PRAO. E PATO com dois T fica PATTO. O T está nas duas palavras e mesmo assim não conserta a frase.'},
  {t:'R.', ok:1},
  {t:'M.', no:'Não existe M em PRATO nem em PATO. O M que aparece na frase está em MESA. A letra que anda tem de sair de uma das duas palavras trocadas.'}
 ],
 dica:'Primeiro descubra por que a frase está esquisita. Quem é que nada no lago? Quem é que cai da mesa? Depois olhe as letras dessas duas palavras.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<p class="vx">P<b class="mk">R</b>ATO nadou no lago? Prato n&atilde;o nada. Quem nada &eacute; o pato.</p>'+
        '<div class="pcs"><span class="pc bad">P<b>R</b>ATO</span><span class="pc bad">PATO</span><span class="arw">&rarr;</span><span class="pc hit">PATO</span><span class="pc hit">P<b>R</b>ATO</span></div>'+
        '<p class="vx">O <b>R</b> saiu de uma palavra e entrou na outra. Nenhuma letra foi inventada e nenhuma sumiu.</p>'+
        '<p class="vx"><span class="dm">A frase certa: O PATO NADOU NO LAGO E O PRATO CAIU DA MESA.</span></p>',
 porque:'A frase certa é "O PATO NADOU NO LAGO E O PRATO CAIU DA MESA". Para consertar, o R sai de PRATO e entra em PATO. A letra que mudou de lugar é o R.',
 proximo:'Ache as duas palavras trocadas e olhe só para elas. Se a letra não estiver em nenhuma das duas, risque sem pensar mais.'},

{id:'TR44', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'PODEMOS TRANSFORMAR UMA PALAVRA EM OUTRA MUDANDO SOMENTE A PRIMEIRA LETRA. POR EXEMPLO, MOLA VIRA BOLA: A PRIMEIRA LETRA MUDOU E O RESTO, OLA, FICOU IGUALZINHO.',
 pede:'MUDANDO SOMENTE A PRIMEIRA LETRA DA PALAVRA MALA, QUAL DAS PALAVRAS ABAIXO PODEMOS FORMAR?',
 opts:[
  {t:'MULA.', no:'Em MULA a primeira letra continua sendo o M. Quem mudou foi a letra do meio: o A virou U. A isca é MULA ser bem parecida com MALA.'},
  {t:'BALA.', ok:1},
  {t:'MALHA.', no:'MALHA tem 5 letras e MALA tem 4. Entrou um H no meio. Nesta brincadeira não pode entrar letra nova.'},
  {t:'BOLA.', no:'De MALA para BOLA mudaram duas letras: o M virou B e o A virou O. A brincadeira troca uma letra só. A isca é BOLA começar com B.'}
 ],
 dica:'Escreva MALA e, embaixo, a palavra da alternativa. Confira letra por letra. Só a primeira pode ser diferente, e o resto tem de continuar ALA.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc bad">M</span><span class="pc hit">A</span><span class="pc hit">L</span><span class="pc hit">A</span><span class="arw">&rarr;</span><span class="pc bad">B</span><span class="pc hit">A</span><span class="pc hit">L</span><span class="pc hit">A</span></div>'+
        '<p class="vx">S&oacute; a primeira letra mudou. O peda&ccedil;o <b>ALA</b> ficou igualzinho: <b>BALA</b>.</p>'+
        '<div class="pcs"><span class="pc bad">M<b>U</b>LA</span><span class="arw">&rarr;</span><span class="pc bad">mudou a do meio</span></div>'+
        '<div class="pcs"><span class="pc bad">MAL<b>H</b>A</span><span class="arw">&rarr;</span><span class="pc bad">ganhou uma letra: 5 em vez de 4</span></div>'+
        '<div class="pcs"><span class="pc bad"><b>BO</b>LA</span><span class="arw">&rarr;</span><span class="pc bad">mudaram duas</span></div>',
 porque:'De MALA para BALA muda só a primeira letra: o M vira B e o pedaço ALA continua igualzinho. MULA mudou a letra do meio. MALHA ganhou um H a mais. BOLA mudou duas letras.',
 proximo:'Escreva as duas palavras uma embaixo da outra. Ponha o dedo na primeira letra e vá andando até o fim. É assim que se vê o que mudou.'},

{id:'TR45', eixo:'letras', origem:'Treino no estilo da prova',
 enun:'AS LETRAS DE UM BRINQUEDO SE EMBARALHARAM:',
 quadro:'N &ndash; E &ndash; B &ndash; O &ndash; C &ndash; A',
 pede:'QUE PALAVRA APARECE QUANDO COLOCAMOS ESSAS LETRAS NA ORDEM CERTA, USANDO TODAS ELAS?',
 opts:[
  {t:'BONECO.', no:'BONECO precisa de DOIS O. No embaralhado só há um O. E o A ficaria sobrando. Ela erra por uma letra só, a última.'},
  {t:'BONECA.', ok:1},
  {t:'BOCA.', no:'BOCA gasta 4 letras e para. Sobram o N e o E. Letra que sobra quer dizer palavra errada.'},
  {t:'CANOA.', no:'CANOA precisa de DOIS A. Só foi dado um A. E o B e o E ficariam sem uso.'}
 ],
 dica:'Conte as letras embaralhadas: são 6, uma de cada. A palavra certa gasta as seis. Nenhuma pode repetir e nenhuma pode ficar para trás.',
 truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
 visual:'<div class="pcs"><span class="pc">N</span><span class="pc">E</span><span class="pc">B</span><span class="pc">O</span><span class="pc">C</span><span class="pc">A</span><span class="arw">&rarr;</span><span class="pc hit">6 letras, uma de cada</span></div>'+
        '<div class="pcs"><span class="pc hit">B</span><span class="pc hit">O</span><span class="pc hit">N</span><span class="pc hit">E</span><span class="pc hit">C</span><span class="pc hit">A</span></div>'+
        '<p class="vx">BONECA gasta as seis, uma vez cada. Nada sobrou, nada faltou.</p>'+
        '<div class="pcs"><span class="pc hit">B</span><span class="pc hit">O</span><span class="pc hit">N</span><span class="pc hit">E</span><span class="pc hit">C</span><span class="pc bad">O</span><span class="arw">&rarr;</span><span class="pc bad">o segundo O n&atilde;o existe</span></div>'+
        '<div class="pcs"><span class="pc hit">B</span><span class="pc hit">O</span><span class="pc hit">C</span><span class="pc hit">A</span><span class="pc bad">N</span><span class="pc bad">E</span><span class="arw">&rarr;</span><span class="pc bad">BOCA deixou duas para tr&aacute;s</span></div>',
 porque:'BONECA usa exatamente as seis letras embaralhadas, uma vez cada. BONECO pediria um segundo O e CANOA um segundo A, que não foram dados. BOCA gasta só quatro e deixa o N e o E sobrando.',
 proximo:'Leia a sua escolha até a última letra antes de marcar. Aqui BONECO e BONECA só se separam no fim.'},

{id:'TR46', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'A PROFESSORA DEU A CLARA TRÊS PEÇAS DE SÍLABA. ELA TEM DE USAR AS TRÊS, UMA VEZ CADA, NA ORDEM QUE QUISER.',
 quadro:'LA &nbsp;&ndash;&nbsp; MO &nbsp;&ndash;&nbsp; CHI',
 pede:'QUE PALAVRA CLARA CONSEGUE FORMAR COM AS TRÊS PEÇAS?',
 opts:[
  {t:'CHAMA.', no:'CHAMA precisa de CHA e de MA. Clara recebeu CHI e MO. É uma letra de diferença em cada pedaço. E o LA ainda ficaria na mesa.'},
  {t:'MOCHILA.', ok:1},
  {t:'CHINELO.', no:'CHINELO precisa de NE e de LO. Ninguém deu NE nem LO. A isca é o CHI do começo, que é peça de verdade.'},
  {t:'MOLA.', no:'MOLA gasta duas peças e para. O CHI fica parado na mesa. Tem de usar as três.'}
 ],
 dica:'Bata palma na palavra de cada alternativa e conte os pedaços. Clara tem TRÊS peças. A palavra certa tem três pedaços, e os três são esses.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">LA</span><span class="pc">MO</span><span class="pc">CHI</span><span class="arw">&rarr;</span><span class="pc hit">MO</span><span class="pc hit">CHI</span><span class="pc hit">LA</span></div>'+
        '<p class="vx">Tr&ecirc;s pe&ccedil;as dadas, tr&ecirc;s pe&ccedil;as usadas: MO-CHI-LA. Nada sobrou e nada foi inventado.</p>'+
        '<div class="pcs"><span class="pc bad">CHA</span><span class="pc bad">MA</span><span class="arw">&rarr;</span><span class="pc bad">as pe&ccedil;as s&atilde;o CHI e MO</span></div>'+
        '<div class="pcs"><span class="pc hit">CHI</span><span class="pc bad">NE</span><span class="pc bad">LO</span><span class="arw">&rarr;</span><span class="pc bad">NE e LO n&atilde;o existem</span></div>'+
        '<div class="pcs"><span class="pc hit">MO</span><span class="pc hit">LA</span><span class="pc bad">CHI</span><span class="arw">&rarr;</span><span class="pc bad">MOLA deixou o CHI sobrando</span></div>',
 porque:'MO-CHI-LA usa as três peças, uma vez cada, só mudando a ordem. CHAMA pede CHA e MA, que são uma letra diferentes de CHI e MO. CHINELO pede NE e LO, que ninguém deu. MOLA deixa o CHI na mesa.',
 proximo:'Confira as sílabas até o fim, uma por uma. A que estraga costuma ser a do meio.'},

{id:'TR47', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'VEJA AS QUATRO PEÇAS DE SÍLABA ABAIXO. TODAS TÊM DE SER USADAS, UMA VEZ CADA, NA ORDEM QUE VOCÊ QUISER:',
 quadro:'TE &nbsp;&ndash;&nbsp; LA &nbsp;&ndash;&nbsp; CHO &nbsp;&ndash;&nbsp; CO',
 pede:'QUE PALAVRA PODEMOS FORMAR COM ESSAS QUATRO PEÇAS?',
 opts:[
  {t:'COLA.', no:'COLA gasta duas peças e para. O CHO e o TE ficam na mesa. Tem de usar as quatro.'},
  {t:'CHOCALHO.', no:'CHOCALHO precisa de CA e de LHO. As peças do quadro são CO e LA. É uma letra de diferença em cada pedaço. A isca é o CHO do começo.'},
  {t:'CHOCOLATE.', ok:1},
  {t:'COLETE.', no:'COLETE precisa de LE. A peça do quadro é LA. Uma letra de diferença, e o CHO ainda ficaria sobrando.'}
 ],
 dica:'Bata palma na palavra de cada alternativa. A certa tem QUATRO pedaços. Cada pedaço tem de ser uma das quatro peças.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">TE</span><span class="pc">LA</span><span class="pc">CHO</span><span class="pc">CO</span><span class="arw">&rarr;</span><span class="pc hit">CHO</span><span class="pc hit">CO</span><span class="pc hit">LA</span><span class="pc hit">TE</span></div>'+
        '<p class="vx">Quatro pe&ccedil;as dadas, quatro pe&ccedil;as usadas: CHO-CO-LA-TE.</p>'+
        '<div class="pcs"><span class="pc hit">CHO</span><span class="pc bad">CA</span><span class="pc bad">LHO</span><span class="arw">&rarr;</span><span class="pc bad">as pe&ccedil;as s&atilde;o CO e LA</span></div>'+
        '<div class="pcs"><span class="pc hit">CO</span><span class="pc bad">LE</span><span class="pc hit">TE</span><span class="arw">&rarr;</span><span class="pc bad">a pe&ccedil;a &eacute; LA, n&atilde;o LE</span></div>'+
        '<div class="pcs"><span class="pc hit">CO</span><span class="pc hit">LA</span><span class="pc bad">CHO</span><span class="pc bad">TE</span><span class="arw">&rarr;</span><span class="pc bad">COLA deixou duas sobrando</span></div>',
 porque:'CHO-CO-LA-TE gasta as quatro peças, uma vez cada, só trocando a ordem. CHOCALHO pede CA e LHO. COLETE pede LE. Nenhuma dessas peças foi dada. COLA usa só duas e deixa o CHO e o TE na mesa.',
 proximo:'Conte os pedaços da palavra e conte as peças do quadro. Números diferentes já derrubam a alternativa.'},

{id:'TR48', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'VEJA ESTAS TRÊS COISAS QUE ESTAVAM NA MOCHILA DE ANA:',
 quadro:'PIRULITO &nbsp;&ndash;&nbsp; POTE &nbsp;&ndash;&nbsp; CADERNO',
 pede:'QUE ALTERNATIVA MOSTRA UMA PALAVRA FORMADA APENAS COM SÍLABAS DOS NOMES ACIMA?',
 opts:[
  {t:'PIRATA.', no:'PIRATA precisa de RA e de TA. O pirulito é PI-RU-LI-TO: ele dá RU, não RA. E TA não sai de nome nenhum. A isca é o PI do começo.'},
  {t:'PICOLÉ.', no:'PICOLÉ precisa de CO e de LÉ. O caderno é CA-DER-NO: ele dá CA, não CO. LÉ não existe em nenhum dos três nomes.'},
  {t:'PIPOCA.', ok:1},
  {t:'TOMADA.', no:'TOMADA precisa de MA e de DA. Nenhum dos três nomes tem MA nem DA. A isca é o TO, que é mesmo o último pedaço do pirulito.'}
 ],
 dica:'Bata palma em cada nome e escreva as peças: PI-RU-LI-TO, PO-TE, CA-DER-NO. Essas são todas as peças que existem.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">PI</span><span class="pc">RU</span><span class="pc">LI</span><span class="pc">TO</span><span class="pc">PO</span><span class="pc">TE</span><span class="pc">CA</span><span class="pc">DER</span><span class="pc">NO</span></div>'+
        '<p class="vx">Essas s&atilde;o as pe&ccedil;as que os tr&ecirc;s nomes d&atilde;o.</p>'+
        '<div class="pcs"><span class="pc hit">PI</span><span class="pc hit">PO</span><span class="pc hit">CA</span><span class="arw">&rarr;</span><span class="pc hit">PI do pirulito, PO do pote, CA do caderno</span></div>'+
        '<div class="pcs"><span class="pc hit">PI</span><span class="pc bad">RA</span><span class="pc bad">TA</span><span class="arw">&rarr;</span><span class="pc bad">o pirulito d&aacute; RU, n&atilde;o RA</span></div>'+
        '<div class="pcs"><span class="pc hit">PI</span><span class="pc bad">CO</span><span class="pc bad">L&Eacute;</span><span class="arw">&rarr;</span><span class="pc bad">o caderno d&aacute; CA, n&atilde;o CO</span></div>',
 porque:'PI vem de PIRULITO, PO vem de POTE e CA vem de CADERNO: as três sílabas de PIPOCA saem dos nomes. Nas outras sempre falta peça: o RA e o TA de PIRATA, o CO e o LÉ de PICOLÉ, o MA e o DA de TOMADA.',
 proximo:'Escreva as peças de cada nome num canto do papel antes de olhar as alternativas. Depois confira cada pedaço da sua escolha contra essa lista.'},

{id:'TR49', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'AGORA VEJA ESTES TRÊS NOMES:',
 quadro:'PATO &nbsp;&ndash;&nbsp; LIM&Atilde;O &nbsp;&ndash;&nbsp; DEDO',
 pede:'QUE ALTERNATIVA MOSTRA UMA PALAVRA FORMADA APENAS COM SÍLABAS DOS NOMES ACIMA?',
 opts:[
  {t:'PALHAÇO.', no:'PALHAÇO precisa de LHA e de ÇO. Nenhum dos três nomes tem essas peças. Só o PA do começo sai do pato.'},
  {t:'PALITO.', ok:1},
  {t:'LIMONADA.', no:'LIMONADA precisa de MO, NA e DA. O limão é LI-MÃO: a peça dele é MÃO, com M e til. MO não existe aqui.'},
  {t:'DEDÃO.', no:'DEDÃO precisa de DÃO. O limão termina em MÃO, com M. Uma letra de diferença derruba a palavra inteira.'}
 ],
 dica:'Bata palma em cada nome e escreva as peças: PA-TO, LI-MÃO, DE-DO. Depois confira pedaço por pedaço a palavra que você escolheu.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">PA</span><span class="pc">TO</span><span class="pc">LI</span><span class="pc">M&Atilde;O</span><span class="pc">DE</span><span class="pc">DO</span></div>'+
        '<p class="vx">Essas s&atilde;o todas as pe&ccedil;as dispon&iacute;veis.</p>'+
        '<div class="pcs"><span class="pc hit">PA</span><span class="pc hit">LI</span><span class="pc hit">TO</span><span class="arw">&rarr;</span><span class="pc hit">PA e TO do pato, LI do lim&atilde;o</span></div>'+
        '<div class="pcs"><span class="pc hit">LI</span><span class="pc bad">MO</span><span class="pc bad">NA</span><span class="pc bad">DA</span><span class="arw">&rarr;</span><span class="pc bad">a pe&ccedil;a &eacute; M&Atilde;O, n&atilde;o MO</span></div>'+
        '<div class="pcs"><span class="pc hit">DE</span><span class="pc bad">D&Atilde;O</span><span class="arw">&rarr;</span><span class="pc bad">o lim&atilde;o d&aacute; M&Atilde;O, com M</span></div>',
 porque:'PA e TO vêm de PATO e LI vem de LIMÃO: as três sílabas de PALITO saem dos nomes. PALHAÇO precisa de LHA e ÇO. LIMONADA precisa de MO, NA e DA. DEDÃO precisa de DÃO. Nenhuma dessas peças existe aqui.',
 proximo:'Quando duas peças forem quase iguais, escreva as duas uma embaixo da outra. Compare letra por letra antes de decidir.'},

{id:'TR50', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'LEIA ESTAS TRÊS PALAVRAS:',
 quadro:'SORTE &nbsp;&ndash;&nbsp; VER&Atilde;O &nbsp;&ndash;&nbsp; TESOURA',
 pede:'USANDO APENAS A PRIMEIRA SÍLABA DE CADA UMA DELAS, QUE PALAVRA PODEMOS FORMAR?',
 opts:[
  {t:'SOFÁ.', no:'SOFÁ precisa de SO. A primeira sílaba de SOR-TE é SOR, com R. E FÁ não é primeira sílaba de ninguém.'},
  {t:'SORVETE.', ok:1},
  {t:'TESOURO.', no:'TESOURO precisa de SOU e de RO. SOU e RO são o segundo e o terceiro pedaços de TE-SOU-RA. A pergunta manda pegar só o primeiro pedaço de cada palavra.'},
  {t:'VERDE.', no:'VERDE precisa de VER. A primeira sílaba de VE-RÃO é VE, sem R. E DE não é primeira sílaba de ninguém.'}
 ],
 dica:'Bata palma em cada palavra e guarde só o PRIMEIRO pedaço: SOR-TE, VE-RÃO, TE-SOU-RA. Escreva as três peças antes de olhar as alternativas.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc hit">SOR</span><span class="pc">TE</span><span class="arw">&rarr;</span><span class="pc hit">SOR</span></div>'+
        '<div class="pcs"><span class="pc hit">VE</span><span class="pc">R&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">VE</span></div>'+
        '<div class="pcs"><span class="pc hit">TE</span><span class="pc">SOU</span><span class="pc">RA</span><span class="arw">&rarr;</span><span class="pc hit">TE</span></div>'+
        '<div class="pcs"><span class="pc hit">SOR</span><span class="pc hit">VE</span><span class="pc hit">TE</span><span class="arw">&rarr;</span><span class="pc hit">SORVETE</span></div>'+
        '<p class="vx">As tr&ecirc;s pe&ccedil;as, uma vez cada, na ordem em que as palavras aparecem.</p>'+
        '<div class="pcs"><span class="pc bad">SO</span><span class="pc bad">F&Aacute;</span><span class="arw">&rarr;</span><span class="pc bad">a pe&ccedil;a &eacute; SOR, com R</span></div>',
 porque:'O primeiro pedaço de cada palavra: SOR-TE dá SOR, VE-RÃO dá VE e TE-SOU-RA dá TE. Juntando as três peças sai SOR-VE-TE. SOFÁ pede SO e VERDE pede VER, que não são as peças. TESOURO usa pedaços que não são o primeiro.',
 proximo:'Escreva as três peças num canto do papel antes de olhar as respostas. Sem escrever, o olho troca SOR por SO e VE por VER.'},

{id:'TR51', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'LEIA ESTAS TRÊS PALAVRAS:',
 quadro:'SAMBA &nbsp;&ndash;&nbsp; MENINA &nbsp;&ndash;&nbsp; PISCINA',
 pede:'USANDO APENAS A ÚLTIMA SÍLABA DE CADA UMA DELAS, QUE PALAVRA PODEMOS FORMAR?',
 opts:[
  {t:'NABO.', no:'NABO precisa de BO. Nenhuma das três palavras termina em BO: o samba termina em BA. E ainda sobrariam duas peças.'},
  {t:'BANANA.', ok:1},
  {t:'CANA.', no:'CANA precisa de CA. Nenhuma das três palavras termina em CA. E CANA gasta só duas peças: sobram o BA e um NA.'},
  {t:'BANHO.', no:'BANHO precisa de NHO. Nenhuma das três palavras termina em NHO. E os dois NA ficariam na mesa.'}
 ],
 dica:'Bata palma em cada palavra e guarde só o ÚLTIMO pedaço: SAM-BA, ME-NI-NA, PIS-CI-NA. Repare que duas delas terminam igual.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc">SAM</span><span class="pc hit">BA</span><span class="arw">&rarr;</span><span class="pc hit">BA</span></div>'+
        '<div class="pcs"><span class="pc">ME</span><span class="pc">NI</span><span class="pc hit">NA</span><span class="arw">&rarr;</span><span class="pc hit">NA</span></div>'+
        '<div class="pcs"><span class="pc">PIS</span><span class="pc">CI</span><span class="pc hit">NA</span><span class="arw">&rarr;</span><span class="pc hit">NA</span></div>'+
        '<div class="pcs"><span class="pc hit">BA</span><span class="pc hit">NA</span><span class="pc hit">NA</span><span class="arw">&rarr;</span><span class="pc hit">BANANA</span></div>'+
        '<p class="vx">Tr&ecirc;s pe&ccedil;as, tr&ecirc;s peda&ccedil;os: BA-NA-NA. Os <b>dois NA</b> foram usados, um de cada palavra.</p>'+
        '<div class="pcs"><span class="pc hit">NA</span><span class="pc bad">BO</span><span class="pc bad">BA</span><span class="pc bad">NA</span><span class="arw">&rarr;</span><span class="pc bad">NABO inventa o BO e deixa duas na mesa</span></div>',
 porque:'O último pedaço de cada palavra: SAM-BA dá BA, ME-NI-NA dá NA e PIS-CI-NA dá NA. Com BA, NA e NA monta-se BA-NA-NA. As outras três inventam um pedaço — BO, CA, NHO — e ainda deixam peças sobrando.',
 proximo:'Quando duas palavras derem a mesma peça, escreva essa peça duas vezes. A palavra certa tem de gastar as duas.'},

{id:'TR52', eixo:'silabas', origem:'Treino no estilo da prova',
 enun:'TIAGO ESCREVEU O QUE VIU NO QUINTAL, MAS ESTAVA COM TANTA PRESSA QUE ALGUMAS PALAVRAS TROCARAM DE SÍLABAS ENTRE SI. VEJA O QUE ELE ESCREVEU:',
 quadro:'UMA ANILHA POUBE NO NARIZ DA MESOUNA.',
 pede:'O QUE TIAGO VIU?',
 opts:[
  {t:'UMA ABELHA PICOU O NARIZ DA MENINA.', no:'PICOU precisa das peças PI e COU. As peças que andaram na frase foram BE, SOU e NI. A isca é a abelha, que na vida real pica mesmo.'},
  {t:'UMA MENINA ESPANTOU UMA ABELHA COM O CHAPÉU.', no:'ESPANTOU e CHAPÉU não saem de peça nenhuma. Nenhuma sílaba da frase embaralhada forma essas palavras. A isca é a abelha e a menina aparecerem juntas.'},
  {t:'UM PASSARINHO POUSOU NO NARIZ DA MENINA.', no:'ANILHA não vira PASSARINHO. Devolvendo o BE no lugar do NI, ela vira ABELHA. Quem desembaraça duas palavras e inventa a terceira cai aqui.'},
  {t:'UMA ABELHA POUSOU NO NARIZ DA MENINA.', ok:1}
 ],
 dica:'Três palavras trocaram um pedaço entre si. Desembarace uma de cada vez, do começo ao fim da frase. Só depois olhe as alternativas.',
 truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
 visual:'<div class="pcs"><span class="pc bad">A <b>NI</b> LHA</span><span class="arw">&rarr;</span><span class="pc hit">A <b>BE</b> LHA</span></div>'+
        '<div class="pcs"><span class="pc bad">POU <b>BE</b></span><span class="arw">&rarr;</span><span class="pc hit">POU <b>SOU</b></span></div>'+
        '<div class="pcs"><span class="pc bad">ME <b>SOU</b> NA</span><span class="arw">&rarr;</span><span class="pc hit">ME <b>NI</b> NA</span></div>'+
        '<p class="vx">Tr&ecirc;s pe&ccedil;as andaram em roda: o <b>BE</b> foi para POUSOU, o <b>SOU</b> foi para MENINA e o <b>NI</b> foi para ABELHA. Nenhuma sumiu e nenhuma apareceu do nada.</p>'+
        '<p class="vx">A frase inteira: <b>UMA ABELHA POUSOU NO NARIZ DA MENINA.</b></p>',
 porque:'Devolvendo cada pedaço ao seu lugar, ANILHA vira ABELHA, POUBE vira POUSOU e MESOUNA vira MENINA. A frase é: UMA ABELHA POUSOU NO NARIZ DA MENINA.',
 proximo:'Desembarace a frase inteira antes de olhar as alternativas. Duas palavras certas e uma inventada continuam sendo alternativa errada.'},
