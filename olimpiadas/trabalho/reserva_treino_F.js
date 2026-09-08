/* ============================================================
   reserva_treino_F.js — 12 itens AUTORAIS DE TREINO (eixo `buraco`)

   ATENÇÃO: estas questões NÃO são questões de prova. Nenhuma delas
   saiu de uma prova da Olimpíada de Português. São questões escritas
   por nós, no estilo da prova, para treinar a família FRASE COM BURACO.
   Por isso `origem` é 'Treino no estilo da prova' — sem ano, sem fase,
   sem número. Só as questões copiadas do PDF oficial podem citar ano.

   TR67 a TR70 — SENTIDO: a pista mora na frase, e são duas ou três
                 pistas que têm de fechar ao mesmo tempo. Os distratores
                 fecham uma e brigam com a outra.
   TR71 a TR74 — CONTINUAÇÃO LÓGICA: depois do PORQUE vem a explicação.
                 Em todas há um distrator que fala da MESMA coisa da
                 certa (esquecer, perder, não achar) mas de algo que não
                 impede o fato.
   TR75 a TR78 — A PALAVRINHA QUE COMBINA: um só / vários, de menino /
                 de menina. Os distratores erram só o número, só o
                 gênero, e os dois. A explicação é sempre a mesma:
                 ler a frase inteira com a palavra dentro e escutar
                 se ela tropeça.

   Colar o array abaixo dentro de ITENS, em OP_data.js.
   ============================================================ */

{id:'TR67', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA COMPLETA A FRASE ABAIXO?',
 quadro:'LUCAS PASSOU A TARDE INTEIRA NO SOL, SEM CHAP&Eacute;U E SEM PROTETOR. QUANDO CHEGOU EM CASA, A PELE DOS OMBROS DELE ARDIA E ESTAVA TODA <span class="bl">_______</span>.',
 opts:[
  {t:'VERMELHA.', ok:1},
  {t:'MOLHADA.', no:'Um dia inteiro de sol lembra praia e piscina, e é por isso que MOLHADA dá vontade de marcar. Mas ele já CHEGOU EM CASA, e água nenhuma faz a pele arder.'},
  {t:'GELADA.', no:'Leia a frase do começo: quem manda nela é o SOL a tarde inteira, e sol esquenta. Pele que ardia não pode estar gelada ao mesmo tempo.'},
  {t:'MACIA.', no:'MACIA é o que a gente diz de uma pele boa, sem nada. A frase diz que a pele ARDIA — essa dava para riscar logo de cara.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro do buraco. Duas pistas mandam: A TARDE INTEIRA NO SOL, SEM PROTETOR e ARDIA.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">A TARDE INTEIRA NO SOL</span> ... <span class="mk">SEM PROTETOR</span> ... <span class="mk">ARDIA</span></p>'+
        '<p class="vx">As tr&ecirc;s pistas t&ecirc;m de fechar ao mesmo tempo. S&oacute; a pele <b>vermelha</b> fecha as tr&ecirc;s.</p>'+
        '<p class="vx">A PELE ESTAVA TODA <b class="mk">VERMELHA</b> <span class="dm">&mdash; sol demais deixa assim, e assim arde</span></p>'+
        '<p class="vx">A PELE ESTAVA TODA <b class="bad2">MOLHADA</b> <span class="dm">&mdash; passa na pista do dia de sol e cai na pista do ARDIA</span></p>',
 porque:'Sol a tarde inteira sem chapéu e sem protetor deixa a pele ardendo e vermelha. As pistas da frase fecham só com VERMELHA.',
 proximo:'Ache primeiro as palavras que dão pista na frase e sublinhe com o dedo. Depois confira se a sua palavra fecha com TODAS elas.'},

{id:'TR68', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'MARQUE A ALTERNATIVA QUE CONTÉM A PALAVRA CERTA PARA COMPLETAR A FRASE ABAIXO:',
 quadro:'O GATINHO DA VIZINHA SUBIU NA <span class="bl">_______</span> MAIS ALTA DO QUINTAL E MIAVA SEM PARAR. O BOMBEIRO PRECISOU DE UMA ESCADA BEM GRANDE PARA TIRAR ELE DE L&Aacute;.',
 opts:[
  {t:'PISCINA.', no:'A piscina fica no quintal, e essa parte combina — é por isso que ela atrai. Mas ninguém sobe NA piscina, e não se chama bombeiro com escada para tirar um gato de dentro dela.'},
  {t:'ÁRVORE.', ok:1},
  {t:'CADEIRA.', no:'Gato sobe em cadeira o tempo todo, e é aí que essa engana. Mas cadeira é baixa: o gato desce sozinho num pulo, e não precisa de escada bem grande.'},
  {t:'CAMA.', no:'Gato adora subir na cama, só que cama fica dentro de casa, e a frase diz DO QUINTAL. Essa dava para riscar logo de cara.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro do buraco. Três pistas mandam: DO QUINTAL, MAIS ALTA e ESCADA BEM GRANDE.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">DO QUINTAL</span> ... <span class="mk">MAIS ALTA</span> ... <span class="mk">ESCADA BEM GRANDE</span></p>'+
        '<p class="vx">S&oacute; a <b>&aacute;rvore</b> fecha as tr&ecirc;s: fica no quintal, &eacute; alta e s&oacute; se alcan&ccedil;a de escada.</p>'+
        '<p class="vx">SUBIU NA <b class="bad2">CADEIRA</b> MAIS ALTA <span class="dm">&mdash; passa na pista do subir e cai na pista da escada</span></p>'+
        '<p class="vx">SUBIU NA <b class="bad2">PISCINA</b> MAIS ALTA <span class="dm">&mdash; passa na pista do quintal e cai na pista do subir</span></p>',
 porque:'O gato subiu numa coisa alta do quintal e ficou preso lá em cima, tanto que precisou de uma escada bem grande. Só ÁRVORE fecha as três pistas ao mesmo tempo.',
 proximo:'Quando a frase dá mais de uma pista, confira TODAS. A alternativa errada costuma passar numa delas e cair na outra.'},

{id:'TR69', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA COMPLETA A FRASE A SEGUIR?',
 quadro:'DE MANH&Atilde;, VOV&Oacute; PENDUROU AS ROUPAS LAVADAS NO <span class="bl">_______</span> DO QUINTAL. NA HORA DO ALMO&Ccedil;O, COM AQUELE SOL FORTE, ESTAVA TUDO SEQUINHO.',
 opts:[
  {t:'ARMÁRIO.', no:'Roupa vai mesmo para o armário, e é por isso que essa atrai. Mas armário fica dentro de casa e é fechado: lá não bate o sol forte que a frase diz ter secado tudo.'},
  {t:'TANQUE.', no:'O tanque fica no quintal e é onde a vovó lava a roupa, então ele passa na pista do quintal. Só que no tanque a roupa fica de molho, molhada — não é lá que ela seca.'},
  {t:'VARAL.', ok:1},
  {t:'CHUVEIRO.', no:'O chuveiro é de tomar banho e fica dentro do banheiro. Ninguém pendura roupa lavada no chuveiro esperando o sol secar.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro. Três pistas mandam: PENDUROU, DO QUINTAL e AQUELE SOL FORTE.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">PENDUROU AS ROUPAS LAVADAS</span> ... <span class="mk">DO QUINTAL</span> ... <span class="mk">SOL FORTE</span> ... <span class="mk">TUDO SEQUINHO</span></p>'+
        '<p class="vx">S&oacute; o <b>varal</b> fecha tudo: fica no quintal, a roupa fica pendurada nele e o sol bate em cheio.</p>'+
        '<p class="vx">PENDUROU NO <b class="bad2">TANQUE</b> DO QUINTAL <span class="dm">&mdash; acerta o quintal e erra o secar</span></p>'+
        '<p class="vx">PENDUROU NO <b class="bad2">ARM&Aacute;RIO</b> DO QUINTAL <span class="dm">&mdash; acerta a roupa e erra o sol</span></p>',
 porque:'Roupa lavada fica pendurada no varal, no quintal, e é o sol que seca. As pistas da frase fecham só com VARAL.',
 proximo:'Repare no que a frase diz que ACONTECEU no fim. Se a sua palavra não deixa aquilo acontecer, ela não é a certa.'},

{id:'TR70', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA COMPLETA A FRASE ABAIXO?',
 quadro:'COME&Ccedil;OU A VENTAR MUITO FORTE NA PRA&Ccedil;A. A <span class="bl">_______</span> DE SOFIA SUBIU BEM ALTO NO C&Eacute;U, PRESA S&Oacute; POR UM FIO DE LINHA.',
 opts:[
  {t:'PIPA.', ok:1},
  {t:'BOLA.', no:'A bola sobe quando a gente chuta bem forte, e é nessa parte que ela engana. Mas bola não sobe por causa do vento, e ninguém prende bola num fio de linha.'},
  {t:'BONECA.', no:'A boneca é de Sofia e vai junto para a praça, essa parte combina. Mas boneca não voa com o vento nem fica lá em cima presa por uma linha.'},
  {t:'BICICLETA.', no:'Bicicleta a gente leva para a praça também. Só que bicicleta anda no chão, não sobe no céu — essa dava para riscar logo de cara.'}
 ],
 dica:'Leia a frase inteira com cada palavra dentro do buraco. Três pistas mandam: VENTAR MUITO FORTE, SUBIU BEM ALTO e FIO DE LINHA.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><span class="mk">VENTAR MUITO FORTE</span> ... <span class="mk">SUBIU BEM ALTO NO C&Eacute;U</span> ... <span class="mk">PRESA POR UM FIO DE LINHA</span></p>'+
        '<p class="vx">S&oacute; a <b>pipa</b> fecha as tr&ecirc;s: ela sobe com o vento e fica presa na linha da m&atilde;o de quem solta.</p>'+
        '<p class="vx">A <b class="mk">PIPA</b> DE SOFIA SUBIU BEM ALTO <span class="dm">&mdash; a frase anda inteirinha</span></p>'+
        '<p class="vx">A <b class="bad2">BOLA</b> DE SOFIA SUBIU BEM ALTO <span class="dm">&mdash; passa na pista do subir e cai na pista do vento e da linha</span></p>',
 porque:'Quem sobe no céu por causa do vento e fica presa por um fio de linha é a pipa. As três pistas da frase fecham só com PIPA.',
 proximo:'Passar numa pista não basta. Leia a frase até o ponto final e veja se a última pista também fecha.'},

{id:'TR71', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUAL É A CONTINUAÇÃO QUE MAIS COMBINA COM O TRECHO ABAIXO?',
 quadro:'BEATRIZ CAL&Ccedil;OU OS PATINS, MAS N&Atilde;O CONSEGUIU ANDAR NA CAL&Ccedil;ADA, PORQUE <span class="bl">___________</span>',
 opts:[
  {t:'A CALÇADA DA RUA DELA É DE CIMENTO.', no:'Calçada de cimento é justamente onde todo mundo anda de patins. Isso não impede nada, e a parte depois do PORQUE tem de impedir.'},
  {t:'NÃO ACHOU O SEU BONÉ EM LUGAR NENHUM.', no:'Essa engana porque também fala de não achar uma coisa, igual à certa. Mas boné é de pôr na cabeça: ficar sem boné não impede ninguém de andar de patins.'},
  {t:'UMA DAS RODINHAS DO PATINS TINHA CAÍDO.', ok:1},
  {t:'VAI VIAJAR COM A FAMÍLIA NO MÊS QUE VEM.', no:'Viajar no mês que vem ainda vai acontecer. Uma coisa de depois não pode explicar o que aconteceu agora.'}
 ],
 dica:'A palavra PORQUE pede um motivo. Teste cada opção assim: "isso impede mesmo a Beatriz de andar de patins?"',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">n&atilde;o conseguiu andar <b class="mk">porque</b> uma rodinha tinha ca&iacute;do <span class="dm">&mdash; patins sem rodinha n&atilde;o anda. Explica.</span></p>'+
        '<p class="vx"><span class="dm">n&atilde;o conseguiu andar porque</span> <b class="bad2">n&atilde;o achou o bon&eacute;</b> <span class="dm">&mdash; tamb&eacute;m &eacute; n&atilde;o achar uma coisa, mas bon&eacute; &eacute; da cabe&ccedil;a. N&atilde;o impede.</span></p>',
 porque:'Patins sem uma das rodinhas não roda, e por isso ela não conseguiu andar. É a única alternativa que impede de verdade.',
 proximo:'Depois de PORQUE, faça sempre a mesma pergunta: isso IMPEDE? Se não impede, não é a resposta, por mais parecida que pareça.'},

{id:'TR72', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUAL É A CONTINUAÇÃO QUE MAIS COMBINA COM O TRECHO ABAIXO?',
 quadro:'CAIO ENCHEU O COPO DE SUCO, MAS N&Atilde;O CONSEGUIU BEBER NADA, PORQUE <span class="bl">___________</span>',
 opts:[
  {t:'O COPO ESCORREGOU DA MÃO E O SUCO TODO CAIU NO CHÃO.', ok:1},
  {t:'ESQUECEU O CANUDINHO EM CIMA DA MESA.', no:'Essa fala de esquecer uma coisa, igual à certa, e é por isso que ela atrai. Mas dá para beber suco direto no copo: ficar sem canudinho não impede de beber.'},
  {t:'A COZINHA DA CASA DELE É AMARELA.', no:'A cor da cozinha não tem nada a ver com beber suco. Essa não explica a primeira parte de jeito nenhum.'},
  {t:'VAI COMER PIPOCA NO CINEMA NO SÁBADO.', no:'Pipoca no sábado é coisa que ainda vai acontecer. O que vem depois do PORQUE tem de explicar o que aconteceu agora.'}
 ],
 dica:'A palavra PORQUE pede um motivo. Pergunte em cada opção: "por causa disso o Caio ficou mesmo sem beber?"',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">n&atilde;o bebeu nada <b class="mk">porque</b> o suco caiu no ch&atilde;o <span class="dm">&mdash; se o suco foi para o ch&atilde;o, n&atilde;o sobrou o que beber. Explica.</span></p>'+
        '<p class="vx"><span class="dm">n&atilde;o bebeu nada porque</span> <b class="bad2">esqueceu o canudinho</b> <span class="dm">&mdash; d&aacute; para beber sem canudo. N&atilde;o impede.</span></p>',
 porque:'Se o copo escorregou e o suco todo foi para o chão, não sobrou suco nenhum para beber. É a única que explica a primeira parte.',
 proximo:'Leia a primeira parte, leia a segunda e junte as duas em voz baixa. Se a segunda não faz a primeira acontecer, ela não serve.'},

{id:'TR73', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'MARQUE A ALTERNATIVA QUE COMPLETA A FRASE:',
 quadro:'TIA MARTA CHEGOU NA PORTA DE CASA, MAS N&Atilde;O CONSEGUIU ENTRAR, PORQUE <span class="bl">___________</span>',
 opts:[
  {t:'O SOL NASCE TODO DIA BEM CEDINHO.', no:'O sol nascer cedo é verdade, mas não tem nada a ver com abrir uma porta. Não explica a primeira parte.'},
  {t:'PERDEU A CHAVE NO CAMINHO DE VOLTA.', ok:1},
  {t:'NÃO ACHOU O GUARDA-CHUVA DENTRO DA BOLSA.', no:'Essa também fala de não achar uma coisa dentro da bolsa, e é aí que ela engana. Mas guarda-chuva serve para a chuva: sem ele a porta abre do mesmo jeito.'},
  {t:'COMPROU PÃO NA PADARIA ONTEM DE MANHÃ.', no:'Comprar pão ontem não impede ninguém de entrar em casa hoje. A segunda parte tem de EXPLICAR a primeira.'}
 ],
 dica:'A palavra PORQUE pede um motivo. Pergunte em cada opção: "isso deixa a tia Marta trancada do lado de fora?"',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">n&atilde;o conseguiu entrar <b class="mk">porque</b> perdeu a chave <span class="dm">&mdash; sem chave a porta n&atilde;o abre. Explica.</span></p>'+
        '<p class="vx"><span class="dm">n&atilde;o conseguiu entrar porque</span> <b class="bad2">n&atilde;o achou o guarda-chuva</b> <span class="dm">&mdash; tamb&eacute;m &eacute; n&atilde;o achar uma coisa na bolsa, mas guarda-chuva n&atilde;o abre porta. N&atilde;o impede.</span></p>',
 porque:'Quem perde a chave fica do lado de fora: sem chave a porta não abre. Só essa impede a tia Marta de entrar.',
 proximo:'Duas alternativas podem falar da mesma coisa — perder, esquecer, não achar. Ganha a que fala do objeto que faz falta AQUI.'},

{id:'TR74', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUAL É A CONTINUAÇÃO QUE MAIS COMBINA COM O TRECHO ABAIXO?',
 quadro:'NA AULA DE DESENHO, HELENA N&Atilde;O CONSEGUIU PINTAR O C&Eacute;U DO SEU DESENHO, PORQUE <span class="bl">___________</span>',
 opts:[
  {t:'A PRIMA DELA MORA EM OUTRA CIDADE.', no:'A prima morar longe não tem nada a ver com pintar um céu. Essa dava para riscar logo de cara.'},
  {t:'ESQUECEU A BORRACHA DENTRO DA MOCHILA.', no:'Essa fala de esquecer um material da escola, igual à certa, e é por isso que engana. Mas borracha serve para APAGAR: sem borracha ela pinta do mesmo jeito.'},
  {t:'O RECREIO COMEÇA DEPOIS DESSA AULA.', no:'O recreio vem só depois. Isso não impede ninguém de pintar durante a aula.'},
  {t:'O SEU LÁPIS AZUL SUMIU DO ESTOJO.', ok:1}
 ],
 dica:'A palavra PORQUE pede um motivo. Pergunte em cada opção: "sem isso ela consegue ou não consegue pintar o céu?"',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">n&atilde;o conseguiu pintar o c&eacute;u <b class="mk">porque</b> o l&aacute;pis azul sumiu <span class="dm">&mdash; c&eacute;u se pinta de azul. Sem o azul, n&atilde;o d&aacute;. Explica.</span></p>'+
        '<p class="vx"><span class="dm">n&atilde;o conseguiu pintar porque</span> <b class="bad2">esqueceu a borracha</b> <span class="dm">&mdash; borracha apaga, n&atilde;o pinta. N&atilde;o impede.</span></p>',
 porque:'O céu do desenho se pinta de azul, e o lápis azul sumiu do estojo. Só essa impede mesmo a Helena de pintar.',
 proximo:'Antes de marcar, veja se a coisa que sumiu é justo a que faltava para fazer aquilo. Lápis pinta; borracha apaga.'},

{id:'TR75', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA PREENCHE CORRETAMENTE A LACUNA NA FRASE ABAIXO?',
 quadro:'NA FESTA JUNINA DA ESCOLA, <span class="bl">_____</span> PROFESSORAS DAN&Ccedil;ARAM QUADRILHA COM OS ALUNOS.',
 opts:[
  {t:'ALGUMAS', ok:1},
  {t:'ALGUNS', no:'ALGUNS é de várias, e essa parte combina direitinho — é por isso que ele atrai. Mas leia baixinho: "alguns professoras dançaram" tropeça. Aqui a palavrinha seria ALGUMAS.'},
  {t:'ALGUMA', no:'ALGUMA é de uma só. Leia a frase inteira: "alguma professoras dançaram" — tropeça na hora. PROFESSORAS tem S no fim, são várias.'},
  {t:'ALGUM', no:'ALGUM tropeça duas vezes: é de um só e é de menino. "Algum professoras dançaram" não é jeito de falar nem de escrever.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. Olhe o que vem depois do buraco: PROFESSORAS tem S no fim e é palavra de menina.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><b class="mk">ALGUMAS</b> PROFESSORAS DAN&Ccedil;ARAM <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><b class="bad2">ALGUNS</b> <span class="dm">PROFESSORAS DAN&Ccedil;ARAM &mdash; acerta as v&aacute;rias, erra a menina</span></p>'+
        '<p class="vx"><b class="bad2">ALGUMA</b> <span class="dm">PROFESSORAS DAN&Ccedil;ARAM &mdash; acerta a menina, erra as v&aacute;rias</span></p>'+
        '<p class="vx">PROFESSORAS tem <b>S</b> no fim e &eacute; palavra de <b>menina</b>. A palavrinha da frente tem de acertar as duas coisas ao mesmo tempo.</p>',
 porque:'A frase fala de várias professoras, e PROFESSORAS é palavra de menina. Lendo a frase inteira, só ALGUMAS PROFESSORAS anda sem tropeçar.',
 proximo:'Faça as duas perguntas antes de marcar: é uma só ou são várias? é de menino ou de menina? A errada costuma acertar só uma delas.'},

{id:'TR76', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'MARQUE A ALTERNATIVA QUE PREENCHE CORRETAMENTE A LACUNA DA FRASE ABAIXO:',
 quadro:'DEPOIS DO JOGO, EU GUARDEI <span class="bl">_____</span> SAPATOS SUJOS DENTRO DA SACOLA.',
 opts:[
  {t:'ESSE', no:'ESSE é de um só. Leia a frase inteira: "guardei esse sapatos sujos" — tropeça. SAPATOS e SUJOS têm S no fim, são vários.'},
  {t:'ESSES', ok:1},
  {t:'ESSAS', no:'ESSAS é de várias, e essa parte está certa — é a que mais engana. Mas ESSAS é de menina, e "guardei essas sapatos sujos" tropeça.'},
  {t:'ESSA', no:'ESSA tropeça duas vezes: é de uma só e é de menina. "Guardei essa sapatos sujos" não é jeito de falar nem de escrever.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. Repare nas duas palavras depois do buraco: SAPATOS e SUJOS, as duas com S no fim.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">guardei <b class="mk">ESSES</b> SAPATOS SUJOS <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><span class="dm">guardei</span> <b class="bad2">ESSAS</b> <span class="dm">SAPATOS SUJOS &mdash; acerta os v&aacute;rios, erra o menino</span></p>'+
        '<p class="vx"><span class="dm">guardei</span> <b class="bad2">ESSE</b> <span class="dm">SAPATOS SUJOS &mdash; acerta o menino, erra os v&aacute;rios</span></p>'+
        '<p class="vx">SAPATOS e SUJOS t&ecirc;m <b>S</b> no fim e s&atilde;o palavras de <b>menino</b>. A palavrinha da frente tem de ser as duas coisas.</p>',
 porque:'A frase fala de vários sapatos, e SAPATOS e SUJOS são palavras de menino. Lendo a frase inteira, só ESSES SAPATOS SUJOS anda sem tropeçar.',
 proximo:'Olhe as palavras que vêm DEPOIS do buraco: elas contam quantos são e se são de menino ou de menina. A palavrinha só copia isso.'},

{id:'TR77', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA PREENCHE CORRETAMENTE A LACUNA NO TEXTO ABAIXO?',
 quadro:'ONTEM CHOVEU MUITO NA VOLTA DA ESCOLA E <span class="bl">_____</span> CADERNO NOVO FICOU TODO MOLHADO.',
 opts:[
  {t:'MINHA', no:'MINHA erra só uma coisa, e é por isso que ela engana tanto: é de menina. Leia a frase inteira — "minha caderno novo ficou molhado" tropeça. CADERNO é palavra de menino.'},
  {t:'MEUS', no:'MEUS é de vários. "Meus caderno novo ficou molhado" tropeça: CADERNO e NOVO estão sozinhos, sem S no fim.'},
  {t:'MEU', ok:1},
  {t:'MINHAS', no:'MINHAS tropeça duas vezes: é de várias e é de menina. "Minhas caderno novo" não é jeito de falar nem de escrever.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. A pista vem depois do buraco: CADERNO NOVO, um só, e não é palavra de menina.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx"><b class="mk">MEU</b> CADERNO NOVO FICOU MOLHADO <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><b class="bad2">MINHA</b> <span class="dm">CADERNO NOVO FICOU MOLHADO &mdash; acerta o um s&oacute;, erra o menino</span></p>'+
        '<p class="vx"><b class="bad2">MEUS</b> <span class="dm">CADERNO NOVO FICOU MOLHADO &mdash; acerta o menino, erra o um s&oacute;</span></p>'+
        '<p class="vx">CADERNO e NOVO est&atilde;o sem <b>S</b> no fim e s&atilde;o palavras de <b>menino</b>. S&oacute; o MEU &eacute; as duas coisas.</p>',
 porque:'É um caderno só, e CADERNO e NOVO são palavras de menino. Lendo a frase inteira, só MEU CADERNO NOVO anda sem tropeçar.',
 proximo:'Uma palavrinha pode acertar o "quantos" e errar o "de menino ou de menina" — e uma coisa errada já derruba. Confira as duas.'},

{id:'TR78', eixo:'buraco', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA PREENCHE CORRETAMENTE A LACUNA NA FRASE ABAIXO?',
 quadro:'ANA CHEGOU CORRENDO DO RECREIO E DEIXOU <span class="bl">_____</span> MOCHILA VERMELHA EM CIMA DA CADEIRA.',
 opts:[
  {t:'SEU', no:'SEU erra só uma coisa, e é aí que ele engana: é de menino. Leia tudo — "deixou seu mochila vermelha" tropeça. MOCHILA e VERMELHA são palavras de menina.'},
  {t:'SUA', ok:1},
  {t:'SUAS', no:'SUAS combina com mochila, essa parte está certa. Mas SUAS é de várias, e a frase fala de uma mochila só, sem S no fim: "deixou suas mochila vermelha" tropeça.'},
  {t:'SEUS', no:'SEUS tropeça duas vezes: é de vários e é de menino. "Deixou seus mochila vermelha" não é jeito de falar nem de escrever.'}
 ],
 dica:'Ponha cada palavrinha no buraco e leia a frase toda em voz baixa. Olhe as duas palavras depois do buraco: MOCHILA VERMELHA, uma só e de menina.',
 truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
 visual:'<p class="vx">deixou <b class="mk">SUA</b> MOCHILA VERMELHA <span class="dm">&mdash; a frase anda</span></p>'+
        '<p class="vx"><span class="dm">deixou</span> <b class="bad2">SEU</b> <span class="dm">MOCHILA VERMELHA &mdash; acerta a uma s&oacute;, erra a menina</span></p>'+
        '<p class="vx"><span class="dm">deixou</span> <b class="bad2">SUAS</b> <span class="dm">MOCHILA VERMELHA &mdash; acerta a menina, erra a uma s&oacute;</span></p>'+
        '<p class="vx">MOCHILA e VERMELHA est&atilde;o sem <b>S</b> no fim e s&atilde;o palavras de <b>menina</b>. S&oacute; o SUA &eacute; as duas coisas.</p>',
 porque:'É uma mochila só, e MOCHILA e VERMELHA são palavras de menina. Lendo a frase inteira, só SUA MOCHILA VERMELHA anda sem tropeçar.',
 proximo:'Leia sempre até o fim da frase com a palavrinha dentro. Se ela tropeçar em qualquer pedaço, já não serve.'},
