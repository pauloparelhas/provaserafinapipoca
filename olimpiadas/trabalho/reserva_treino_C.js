/* ============================================================
   reserva_treino_C.js — BLOCO DE ITENS DE TREINO (AUTORAIS)
   Categoria G · 2º ano · 14 questões · ids TR25 a TR38 · eixo `ler`

   ATENÇÃO — ESTAS QUESTÕES NÃO SÃO DE PROVA.
   Nenhum item deste arquivo saiu de uma prova da Olimpíada de
   Português. São exercícios ESCRITOS POR NÓS, no molde da banca, e
   por isso a `origem` de todos é a mesma frase, sem ano e sem número
   de questão: 'Treino no estilo da prova'. Citar ano/fase/questão
   aqui seria mentira — o banco oficial (ferramentas/OP_data.js) só
   usa `origem` com ano quando o enunciado é verbatim do PDF.

   OS TEXTOS TAMBÉM SÃO AUTORAIS.
   Nenhum poema, fábula ou diálogo daqui foi copiado de autor real.
   A prova de verdade usa Cecília Meireles, Mário Quintana, Ruth
   Rocha, Olavo Bilac, Manoel de Barros — e nós não podemos
   reproduzir esses textos sem permissão. Então cada texto abaixo foi
   escrito para este arquivo, no tamanho e no assunto da prova: 4 a 8
   versos ou 2 a 5 frases, sobre bicho, escola, casa, festa,
   brincadeira, chuva e comida. Onde há verso, a rima foi lida em voz
   alta e conferida sílaba a sílaba.

   POR QUE 14 ITENS DE `ler`:
   o banco de produção tem 18 itens de `ler` vindos das provas
   oficiais, e a cota do simulado é 3 por rodada. Sem volume de
   treino, a criança repete os mesmos textos. Aqui estão os formatos
   que a banca de fato usa nesse eixo, cada um com o mesmo desenho de
   distrator do original:
     - título que combina com o poema inteiro (TR25, TR37)
     - por que a pessoa do poema faz uma coisa (TR26)
     - que lição a fábula ensina (TR27)
     - como é o lugar descrito, somando as palavras (TR28)
     - qual evento aconteceu antes / em que dia (TR29, TR38)
     - qual verso completa a história (TR30)
     - que rima encaixa (TR31)
     - o jeito de falar de quem fala (TR32)
     - o que o texto diz contra o que a vida sugere (TR33, TR34)
     - a charada de quem fala e os três exemplos iguais (TR35, TR36)

   COMO ESTÃO ESCRITOS OS COMENTÁRIOS DE ERRO (`no`):
   cada `no` tem duas frases curtas. A primeira diz o que aquela
   alternativa faz de errado. A segunda diz onde estava a pista no
   texto. Nunca se elogia a alternativa errada antes de negá-la:
   nada de "é verdade, mas", "está certo, porém", "acontece mesmo,
   só que". Para uma criança de 7 anos, a concessão vira permissão —
   ela guarda a primeira metade da frase e larga a segunda.
   Uma ideia por frase, sem oração dentro de oração. E toda dica tem
   de servir ANTES de ela saber a resposta.

   OS QUATRO TIPOS DE ERRADA que a banca usa e que estão aqui:
     - a que responde OUTRA pergunta (fala de uma coisa do texto que
       a pergunta não pediu);
     - a que sai da ÚLTIMA linha (armadilha de quem lê só o fim);
     - a que vem da vida, e não do texto (o que a criança suporia);
     - a que só repete uma palavra que apareceu no texto.
   Nenhuma se resolve numa etapa só.

   `truque`: nenhuma frase nova foi inventada. Todas são cópia
   palavra por palavra de um truque que já existe no banco (a frase
   da família `ler` ou a de um item `ler` das provas de 2023-2025).

   `acende`: por ser eixo `ler`, TODO item aponta em base zero as
   linhas do texto onde a resposta mora — é o que reacende a linha
   certa na tela depois da resposta.

   Colar dentro da lista ITENS do OP_data.js (ou do carregador de
   reservas), exatamente como está.
   ============================================================ */

{id:'TR25', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['MEU GATO DORME NA CADEIRA,',
        'DORME EM CIMA DA GELADEIRA,',
        'DORME NO MEIO DA ESCADA,',
        'DORME NA CAIXA GUARDADA.',
        'SÓ ACORDA NA HORA DA COMIDA,',
        'DEPOIS VOLTA PRA SUA DORMIDA.'],
 pede:'QUAL TÍTULO MAIS COMBINA COM O POEMA?',
 opts:[
  {t:'A HORA DA COMIDA.', no:'Essa sai da última linha do poema. A comida aparece uma vez só, e aparece para o gato acordar e voltar a dormir.'},
  {t:'O GATO E O RATO.', no:'Essa fala de rato, e no poema não tem rato nenhum. Gato correndo atrás de rato é coisa que a gente sabe da vida, não deste poema.'},
  {t:'O GATO DORMINHOCO.', ok:1},
  {t:'A GELADEIRA DA COZINHA.', no:'A geladeira é um dos quatro lugares onde o gato dorme. Uma palavra do meio não dá o título do poema inteiro.'}
 ],
 dica:'O título fala do poema INTEIRO, não de uma linha só. Desça a régua até o fim e pergunte: o que esse gato faz do começo ao fim?',
 truque:'O título é do poema inteiro, não de uma linha. Uma palavra solta não manda.',
 acende:[0,1,2,3],
 visual:'<div class="pcs"><span class="pc hit">DORME NA CADEIRA</span><span class="pc hit">DORME NA GELADEIRA</span><span class="pc hit">DORME NA ESCADA</span><span class="pc hit">DORME NA CAIXA</span></div>'+
        '<p class="vx">Quatro linhas seguidas dizem a mesma coisa: esse gato dorme o tempo todo.</p>'+
        '<div class="pcs"><span class="pc bad">A HORA DA COMIDA</span><span class="arw">&rarr;</span><span class="pc bad">s&oacute; a &uacute;ltima linha</span></div>'+
        '<div class="pcs"><span class="pc hit">O GATO DORMINHOCO</span><span class="arw">&rarr;</span><span class="pc hit">o poema inteiro</span></div>',
 porque:'Quatro das seis linhas dizem onde o gato dorme: cadeira, geladeira, escada e caixa. A comida aparece só para ele acordar e voltar a dormir. O poema inteiro é sobre um gato dorminhoco.',
 proximo:'Nunca tire o título da última linha. Leia o poema todo com a régua e pergunte: do que ele fala do começo ao fim?'},

{id:'TR26', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['EU ANDO NA PONTA DO PÉ,',
        'EU FALO BEM BAIXINHO,',
        'NÃO CORRO PELO CORREDOR,',
        'NÃO CANTO NO CAMINHO.',
        'É QUE O MEU IRMÃO PEQUENO',
        'ACABOU DE ADORMECER,',
        'E SE ELE ACORDAR AGORA',
        'VAI CHORAR ATÉ AMANHECER.'],
 pede:'POR QUE A MENINA DO POEMA ANDA NA PONTA DO PÉ?',
 opts:[
  {t:'PORQUE ELA ESTÁ APRENDENDO A DANÇAR.', no:'Essa fala de dança, e o poema não fala de dança em nenhuma linha. Dança é coisa que a gente lembra da vida quando ouve "ponta do pé".'},
  {t:'PORQUE O IRMÃO PEQUENO DELA ACABOU DE DORMIR E ELA NÃO QUER ACORDAR ELE.', ok:1},
  {t:'PORQUE O IRMÃO DELA ESTÁ CHORANDO.', no:'Essa diz que o irmão já está chorando. O poema diz que ele vai chorar SE acordar: agora ele está dormindo.'},
  {t:'PORQUE ELA FALA BEM BAIXINHO E NÃO CANTA NO CAMINHO.', no:'Essa não responde à pergunta. Falar baixinho é mais uma coisa que ela faz para não acordar o irmão, e a pergunta é POR QUE ela faz.'}
 ],
 dica:'A pergunta tem POR QUE. Volte com a régua e ache a linha que explica. Ela vem depois de tudo o que a menina deixa de fazer.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[4,5],
 visual:'<p class="vx">ANDO NA PONTA DO P&Eacute; &middot; FALO BAIXINHO &middot; N&Atilde;O CORRO &middot; N&Atilde;O CANTO</p>'+
        '<p class="vx">Quatro coisas que ela faz para n&atilde;o fazer barulho. O motivo vem logo depois:</p>'+
        '<p class="vx"><b class="mk">&Eacute; QUE O MEU IRM&Atilde;O PEQUENO ACABOU DE ADORMECER</b></p>'+
        '<p class="vx"><span class="dm">VAI CHORAR &eacute; o que aconteceria SE ele acordasse. N&atilde;o &eacute; o que est&aacute; acontecendo.</span></p>',
 porque:'O poema diz "É QUE O MEU IRMÃO PEQUENO ACABOU DE ADORMECER". É por isso que ela anda na ponta do pé, fala baixinho, não corre e não canta: tudo para não acordar o irmão.',
 proximo:'Se a pergunta começa com POR QUE, procure a linha que explica, não a que descreve. Muitas linhas contam O QUE a pessoa faz; só uma conta por quê.'},

{id:'TR27', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA A FÁBULA ABAIXO:',
 texto:['UM MACACO ACHOU UM CACHO DE BANANAS NO ALTO DA ÁRVORE.',
        'ELE PEGOU UMA BANANA EM CADA MÃO, UMA EM CADA PÉ, E AINDA QUIS SEGURAR MAIS DUAS NA BOCA.',
        'NA HORA DE DESCER, PRECISOU SEGURAR NO GALHO E SOLTOU TODAS.',
        'AS BANANAS ROLARAM PARA DENTRO DO RIO, E O MACACO FICOU SEM NENHUMA.'],
 pede:'AS FÁBULAS COSTUMAM NOS ENSINAR ALGO. QUE LIÇÃO PODEMOS TIRAR DA FÁBULA ACIMA?',
 opts:[
  {t:'QUEM QUER LEVAR TUDO DE UMA VEZ ACABA FICANDO SEM NADA.', ok:1},
  {t:'BANANA É A COMIDA PREFERIDA DO MACACO.', no:'Essa é um palpite sobre macaco, não uma lição. A fábula não fala do que ele prefere: fala do que ele perdeu.'},
  {t:'PARA DESCER DA ÁRVORE É PRECISO SEGURAR NO GALHO.', no:'Essa conta uma coisa que aconteceu na história. A pergunta é qual LIÇÃO a história ensina.'},
  {t:'NÃO SE DEVE BRINCAR PERTO DO RIO.', no:'Essa sai da última linha da fábula. Ninguém brincou no rio: as bananas rolaram para lá depois que o macaco soltou tudo.'}
 ],
 dica:'A lição não está escrita em nenhuma linha. Compare duas partes: quantas bananas ele quis levar e com quantas ele ficou no fim.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[1,3],
 visual:'<div class="pcs"><span class="pc hit">2 nas m&atilde;os</span><span class="pc hit">2 nos p&eacute;s</span><span class="pc hit">2 na boca</span><span class="arw">&rarr;</span><span class="pc hit">seis de uma vez</span></div>'+
        '<div class="pcs"><span class="pc bad">FICOU SEM NENHUMA</span></div>'+
        '<p class="vx">Ele quis levar <b>seis</b> e ficou com <b>zero</b>. A li&ccedil;&atilde;o mora nessa conta.</p>'+
        '<p class="vx"><span class="dm">O rio aparece s&oacute; para dizer onde as bananas foram parar. A hist&oacute;ria n&atilde;o &eacute; sobre o rio.</span></p>',
 porque:'O macaco tentou carregar seis bananas ao mesmo tempo. Como precisava das mãos para descer, soltou todas e ficou sem nenhuma. Quem quer levar tudo de uma vez acaba ficando sem nada.',
 proximo:'Na fábula, a lição sai do que o bicho fez e do que sobrou para ele no fim. Compare o começo com o fim antes de escolher.'},

{id:'TR28', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['O QUINTAL DA MINHA AVÓ',
        'NUNCA FICA SOSSEGADO.',
        'TEM CACHORRO CORRE-CORRE,',
        'TEM GALINHA DE UM LADO,',
        'TEM MENINO NA MANGUEIRA,',
        'TEM PANELA NO FOGÃO,',
        'TEM BARULHO DE MANHÃ',
        'E DE NOITE TEM VIOLÃO.'],
 pede:'SOBRE O QUINTAL DO POEMA, O QUE PODEMOS AFIRMAR?',
 opts:[
  {t:'É UM LUGAR CALMO E SILENCIOSO.', no:'Essa diz que o quintal é calmo. A segunda linha do poema diz NUNCA FICA SOSSEGADO.'},
  {t:'LÁ SÓ MORAM BICHOS.', no:'Essa serve para quem parou na galinha e não desceu mais. O poema continua: tem menino, tem panela no fogão e tem violão.'},
  {t:'O BARULHO DE LÁ ACABA QUANDO ANOITECE.', no:'Essa diz que de noite o quintal fica quieto. A última linha diz que de noite tem violão.'},
  {t:'É UM LUGAR ANIMADO E CHEIO DE BARULHO.', ok:1}
 ],
 dica:'Junte as palavras que o poema usa para dizer como é o quintal. Elas estão espalhadas: uma na segunda linha, outras nas duas últimas.',
 truque:'Quando a pergunta é sobre como é um lugar, junte as palavras que o texto usa para descrever ele.',
 acende:[1,6,7],
 visual:'<div class="pcs"><span class="pc hit">NUNCA FICA SOSSEGADO</span><span class="pc hit">BARULHO DE MANH&Atilde;</span><span class="pc hit">DE NOITE TEM VIOL&Atilde;O</span></div>'+
        '<p class="vx">De manh&atilde; tem barulho e de noite tem viol&atilde;o: o quintal <b>n&atilde;o para nunca</b>.</p>'+
        '<div class="pcs"><span class="pc bad">CALMO E SILENCIOSO</span><span class="arw">&rarr;</span><span class="pc bad">briga com NUNCA FICA SOSSEGADO</span></div>',
 porque:'O poema diz que o quintal NUNCA FICA SOSSEGADO, que tem BARULHO DE MANHÃ e que DE NOITE TEM VIOLÃO. Somando as palavras do próprio poema, é um lugar animado e cheio de barulho.',
 proximo:'Quando a pergunta é sobre o jeito de um lugar, não procure uma linha só. Junte as palavras que o texto repete do começo ao fim.'},

{id:'TR29', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['HOJE PAULA LEVOU UM BOLO PARA A ESCOLA.',
        'ONTEM À NOITE ELA E A MÃE FIZERAM O BOLO NA COZINHA.',
        'AMANHÃ A TURMA VAI FAZER UM PIQUENIQUE NO PÁTIO.',
        'NA SEMANA PASSADA A PROFESSORA AVISOU QUE IA TER FESTA,',
        'E PAULA JÁ COMEÇOU A CONTAR OS DIAS.'],
 pede:'COM BASE NO TEXTO, QUAL EVENTO ACONTECEU ANTES DOS OUTROS?',
 opts:[
  {t:'PAULA LEVOU O BOLO PARA A ESCOLA.', no:'Essa é a primeira coisa CONTADA, e não a primeira que aconteceu. O bolo foi levado HOJE.'},
  {t:'PAULA E A MÃE FIZERAM O BOLO.', no:'O bolo foi feito ONTEM À NOITE. Tem uma coisa mais antiga no texto: procure a linha da semana passada.'},
  {t:'A PROFESSORA AVISOU QUE IA TER FESTA.', ok:1},
  {t:'A TURMA FEZ O PIQUENIQUE NO PÁTIO.', no:'O piquenique ainda NÃO aconteceu: o texto diz AMANHÃ. Uma coisa que nem aconteceu não pode ser a mais antiga.'}
 ],
 dica:'Procure as palavrinhas de tempo: HOJE, ONTEM À NOITE, AMANHÃ, NA SEMANA PASSADA. Ponha-as em fila antes de escolher.',
 truque:'Monte a fila do tempo: semana passada, ontem, hoje, semana que vem. Só então responda.',
 acende:[0,1,2,3],
 visual:'<div class="pcs"><span class="pc hit">SEMANA PASSADA<br>o aviso</span><span class="arw">&rarr;</span><span class="pc">ONTEM<br>fizeram o bolo</span><span class="arw">&rarr;</span><span class="pc">HOJE<br>levou o bolo</span><span class="arw">&rarr;</span><span class="pc bad">AMANH&Atilde;<br>piquenique</span></div>'+
        '<p class="vx">O texto conta fora de ordem. Na fila do tempo, o aviso da professora &eacute; o mais antigo &mdash; e o piquenique nem aconteceu.</p>',
 porque:'Pondo em fila: na semana passada veio o aviso da professora, ontem à noite fizeram o bolo, hoje ela levou o bolo e amanhã será o piquenique. O mais antigo é o aviso.',
 proximo:'Sublinhe as palavrinhas de tempo e monte a fila antes de responder. A ordem em que o texto conta quase nunca é a ordem em que aconteceu.'},

{id:'TR30', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['NA MOCHILA DO JOÃO',
        'TEM CADERNO E LAPISEIRA.',
        'NA MOCHILA DO IRMÃO BEBÊ',
        'TEM UM URSO E UMA MAMADEIRA.',
        'HOJE OS DOIS SE ATRAPALHARAM',
        'E TROCARAM AS MOCHILAS.',
        'NA HORA DA LIÇÃO, O JOÃO',
        '_______________________'],
 pede:'MARQUE O VERSO QUE MELHOR COMBINA COM O FINAL DA HISTÓRIA.',
 opts:[
  {t:'TIROU DA MOCHILA A SUA LAPISEIRA.', no:'A lapiseira está na mochila do João. E a mochila do João ficou com o irmão bebê.'},
  {t:'TIROU DA MOCHILA UMA MAMADEIRA.', ok:1},
  {t:'TIROU DA MOCHILA A LIÇÃO INTEIRA.', no:'Essa repete a palavra LIÇÃO da linha de cima. A lição estava no caderno, e o caderno foi junto na mochila trocada.'},
  {t:'TIROU DA MOCHILA A SUA LANCHEIRA.', no:'Essa fala de lanche, e o poema não fala de lanche. O poema diz o que tem em cada mochila: caderno e lapiseira numa, urso e mamadeira na outra.'}
 ],
 dica:'Segure a troca na cabeça: cada um está com a mochila do outro. Agora pergunte: o João abriu qual mochila, e o que tem dentro dela?',
 truque:'Quando a história troca duas coisas, escreva a troca antes de responder. Depois aplique na cena nova.',
 acende:[1,3,5],
 visual:'<div class="pcs"><span class="pc bad">MOCHILA DO JO&Atilde;O</span><span class="arw">&rarr;</span><span class="pc hit">caderno e lapiseira</span></div>'+
        '<div class="pcs"><span class="pc bad">MOCHILA DO BEB&Ecirc;</span><span class="arw">&rarr;</span><span class="pc hit">urso e mamadeira</span></div>'+
        '<p class="vx">Eles <b>trocaram</b>. Ent&atilde;o o Jo&atilde;o est&aacute; com a mochila do beb&ecirc; &mdash; e nela s&oacute; tem urso e mamadeira.</p>'+
        '<p class="vx"><span class="dm">Aqui a rima n&atilde;o ajuda a escolher: LAPISEIRA, MAMADEIRA, INTEIRA e LANCHEIRA rimam todas. Quem decide &eacute; a mochila.</span></p>',
 porque:'O poema diz que na mochila do bebê tem um urso e uma mamadeira, e que os dois trocaram as mochilas. Então o João abriu a mochila do bebê e tirou de dentro uma mamadeira.',
 proximo:'Quando a história troca duas coisas de lugar, anote a troca antes de olhar as alternativas. Depois é só aplicar na cena nova.'},

{id:'TR31', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['A GALINHA',
        'SUBIU NA CADEIRINHA.',
        'O PATO',
        'DORMIU NO SAPATO.',
        'A ARARA',
        'LAVOU A CARA.'],
 pede:'SE FÔSSEMOS ADICIONAR MAIS DUAS LINHAS AO POEMA, QUAL ALTERNATIVA MELHOR SE ENCAIXARIA NELE?',
 opts:[
  {t:'O CACHORRO / LATIU NO PORTÃO.', no:'Fale em voz alta: CACHORRO e PORTÃO não terminam com o mesmo som. Ter o mesmo formato das outras duplas não basta.'},
  {t:'A VACA / COMEU A GRAMA.', no:'VACA e GRAMA terminam as duas com A. Rima é o som do fim inteiro: VA-CA e GRA-MA não soam igual.'},
  {t:'O PORCO / ROLOU NO BARRO.', no:'PORCO e BARRO terminam as duas com O e têm um R no meio. Escute o fim: POR-CO e BAR-RO não soam igual.'},
  {t:'A COELHA / DORMIU NA TELHA.', ok:1}
 ],
 dica:'Repare no que acontece em cada dupla: galINHA / cadeirINHA, pATO / sapATO, arARA / cARA. Fale em voz alta e escute só o fim.',
 truque:'Rima é quando o fim das duas palavras soa igual. Termina com a mesma letra não é a mesma coisa que rimar.',
 acende:[0,1,2,3,4,5],
 visual:'<div class="pcs"><span class="pc hit">GAL<b>INHA</b></span><span class="pc hit">CADEIR<b>INHA</b></span></div>'+
        '<div class="pcs"><span class="pc hit">P<b>ATO</b></span><span class="pc hit">SAP<b>ATO</b></span></div>'+
        '<div class="pcs"><span class="pc hit">AR<b>ARA</b></span><span class="pc hit">C<b>ARA</b></span></div>'+
        '<div class="pcs"><span class="pc hit">CO<b>ELHA</b></span><span class="pc hit">T<b>ELHA</b></span></div>'+
        '<p class="vx">Sempre o nome do bicho rima com o fim da linha seguinte. COELHA e TELHA seguem a mesma brincadeira.</p>'+
        '<div class="pcs"><span class="pc bad">VACA / GRAMA</span><span class="pc bad">PORCO / BARRO</span><span class="arw">&rarr;</span><span class="pc bad">mesma letra, som diferente</span></div>',
 porque:'No poema, o nome do bicho sempre rima com o fim da linha seguinte: galINHA/cadeirINHA, pATO/sapATO, arARA/cARA. COELHA e TELHA repetem a mesma brincadeira.',
 proximo:'Para saber se rima, fale as duas palavras em voz alta e escute só o fim. Terminar com a mesma letra não basta.'},

{id:'TR32', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'BRUNO CHEGOU DA ESCOLA E FOI CONVERSAR COM O AVÔ, QUE TINHA VOLTADO DA PESCARIA:',
 texto:['— VOVÔ, COMO FOI A PESCARIA?',
        '— FOI UM DIÃO, MENINO! O RIO ESTAVA UM ESPELHÃO.',
        '— E O SENHOR PEGOU PEIXE?',
        '— PEGUEI UM PEIXÃO! DEU UM PUXÃO NA LINHA QUE QUASE ME DERRUBOU DO BARCÃO.',
        '— E DEPOIS, VOVÔ?',
        '— DEPOIS COMI UM PRATÃO DE PEIXE FRITO COM UM COPÃO DE SUCO.'],
 pede:'CONSIDERANDO O MODO DE FALAR DO AVÔ, O QUE ELE TERIA DITO NO FINAL DESSA CONVERSA?',
 opts:[
  {t:'— AGORA VOU TIRAR UM SONÃO NA MINHA REDE!', ok:1},
  {t:'— AGORA VOU DESCANSAR UM POUCO NA REDE.', no:'Essa frase não tem nenhum -ÃO no fim das palavras. A pergunta é qual delas soa como o avô fala.'},
  {t:'— OBRIGADO POR PERGUNTAR, MEU NETO. TENHA UMA BOA TARDE.', no:'Essa frase também não tem nenhum -ÃO. O avô estica o fim das palavras, e aqui nada está esticado.'},
  {t:'— AGORA VOU TIRAR UM SONINHO NA MINHA REDE.', no:'SONINHO termina em -INHO, que deixa a coisa pequena. O avô põe -ÃO em tudo, que deixa a coisa grande.'}
 ],
 dica:'Não procure a frase que faz sentido: procure a que soa como ELE. Repare no fim das palavras que o avô usa.',
 truque:'Quando a pergunta é sobre o JEITO de falar, procure o que se repete na fala da pessoa.',
 acende:[1,3,5],
 visual:'<div class="pcs"><span class="pc hit">DI<b>&Atilde;O</b></span><span class="pc hit">ESPELH<b>&Atilde;O</b></span><span class="pc hit">PEIX<b>&Atilde;O</b></span><span class="pc hit">BARC<b>&Atilde;O</b></span><span class="pc hit">PRAT<b>&Atilde;O</b></span><span class="pc hit">COP<b>&Atilde;O</b></span></div>'+
        '<p class="vx">O av&ocirc; p&otilde;e <b>-&Atilde;O</b> em tudo, para tudo ficar grande. A &uacute;nica resposta que faz igual &eacute; SON<b>&Atilde;O</b>.</p>'+
        '<div class="pcs"><span class="pc bad">SON<b>INHO</b></span><span class="arw">&rarr;</span><span class="pc bad">deixa pequeno, &eacute; o contr&aacute;rio</span></div>',
 porque:'O avô põe -ÃO em tudo o que fala: dião, espelhão, peixão, barcão, pratão, copão. Só uma resposta fala do mesmo jeito: SONÃO.',
 proximo:'Quando perguntarem sobre o JEITO de falar, ache o pedacinho que se repete na boca da pessoa e procure a resposta que repete o mesmo pedacinho.'},

{id:'TR33', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA COM ATENÇÃO O TEXTO ABAIXO:',
 texto:['A CAMPAINHA DA ESCOLA DO PEDRO ESTÁ QUEBRADA DESDE SEGUNDA-FEIRA.',
        'POR ISSO, QUANDO O RECREIO ACABA, A PROFESSORA MARTA VAI ATÉ O MEIO DO PÁTIO E BATE PALMAS TRÊS VEZES.',
        'AÍ TODO MUNDO LARGA A BOLA E CORRE PARA A FILA.'],
 pede:'SEGUNDO O TEXTO, COMO AS CRIANÇAS FICAM SABENDO QUE O RECREIO ACABOU?',
 opts:[
  {t:'PELA CAMPAINHA DA ESCOLA.', no:'Essa repete uma palavra do texto. Leia a linha inteira: a campainha está QUEBRADA desde segunda-feira.'},
  {t:'PELO RELÓGIO DO PÁTIO.', no:'Essa fala de relógio, e o texto não fala de relógio nenhum. A pergunta diz SEGUNDO O TEXTO.'},
  {t:'PELAS PALMAS DA PROFESSORA MARTA.', ok:1},
  {t:'PORQUE VEEM A FILA COMEÇANDO.', no:'Essa sai da última linha. A fila se forma DEPOIS das palmas: primeiro elas escutam, aí largam a bola e correm.'}
 ],
 dica:'Volte ao texto com a régua e ache o POR ISSO. Depois dele vem o que a professora faz quando o recreio acaba.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[0,1],
 visual:'<p class="vx">A CAMPAINHA EST&Aacute; <b class="bad2">QUEBRADA</b> &mdash; ela n&atilde;o pode avisar ningu&eacute;m.</p>'+
        '<p class="vx"><b class="mk">POR ISSO</b> A PROFESSORA MARTA <b class="mk">BATE PALMAS TR&Ecirc;S VEZES</b></p>'+
        '<div class="pcs"><span class="pc hit">as palmas</span><span class="arw">&rarr;</span><span class="pc">largam a bola</span><span class="arw">&rarr;</span><span class="pc">correm para a fila</span></div>'+
        '<p class="vx">A fila vem <b>depois</b>. Quem avisa &eacute; a palma.</p>',
 porque:'O texto diz que a campainha está quebrada e que POR ISSO a professora Marta bate palmas três vezes quando o recreio acaba. É a palma que avisa; a fila só se forma depois.',
 proximo:'Marcar uma alternativa só porque a palavra dela aparece no texto é a armadilha. Leia a frase inteira em volta e veja o que ela diz daquela palavra.'},

{id:'TR34', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['NO DIA DO PASSEIO, CLARA ABRIU O ARMÁRIO PARA ESCOLHER A ROUPA.',
        'VIU O VESTIDO AMARELO, MAS ELE ESTAVA NO CESTO DE ROUPA SUJA.',
        'VIU O CASACO DE LÃ, MAS O DIA ESTAVA QUENTE DEMAIS PARA ELE.',
        'VIU A SAIA NOVA, MAS A SAIA AINDA ESTAVA MOLHADA NO VARAL.',
        'ENTÃO CLARA VESTIU O SHORT AZUL E CORREU PARA PEGAR O ÔNIBUS.'],
 pede:'O QUE CLARA VESTIU PARA O PASSEIO?',
 opts:[
  {t:'O VESTIDO AMARELO.', no:'A linha do vestido continua depois do MAS: ele estava no cesto de roupa suja. Ver a roupa não é vestir a roupa.'},
  {t:'O CASACO DE LÃ.', no:'A linha do casaco continua depois do MAS: o dia estava quente demais para ele.'},
  {t:'A SAIA NOVA.', no:'A linha da saia continua depois do MAS: ela ainda estava molhada no varal.'},
  {t:'O SHORT AZUL.', ok:1}
 ],
 dica:'As quatro roupas estão todas escritas no texto. A pergunta não é o que ela VIU: é o que ela VESTIU. Procure com a régua a linha que tem a palavra VESTIU.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[1,2,3,4],
 visual:'<p class="vx">VIU O VESTIDO AMARELO <b class="bad2">MAS ESTAVA NO CESTO DE ROUPA SUJA</b></p>'+
        '<p class="vx">VIU O CASACO DE L&Atilde; <b class="bad2">MAS O DIA ESTAVA QUENTE DEMAIS</b></p>'+
        '<p class="vx">VIU A SAIA NOVA <b class="bad2">MAS ESTAVA MOLHADA NO VARAL</b></p>'+
        '<p class="vx">CLARA <b class="mk">VESTIU O SHORT AZUL</b> E CORREU PARA PEGAR O &Ocirc;NIBUS</p>'+
        '<p class="vx">Tr&ecirc;s linhas t&ecirc;m <b>MAS</b>. S&oacute; uma tem <b>VESTIU</b>.</p>',
 porque:'O texto conta uma por uma as roupas que Clara viu e deixou de lado, sempre com um MAS logo depois. Só uma linha diz o que ela vestiu: "ENTÃO CLARA VESTIU O SHORT AZUL".',
 proximo:'Não marque a palavra só porque ela apareceu no texto. Leia a linha inteira: depois do MAS ela pode estar dizendo que NÃO.'},

{id:'TR35', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'NESTE POEMA, ALGUÉM ESTÁ FALANDO DE SI MESMO. LEIA COM ATENÇÃO:',
 texto:['ANDO SEMPRE COM VOCÊ,',
        'MAS NÃO POSSO TE TOCAR.',
        'QUANDO O SOL VAI EMBORA,',
        'EU TAMBÉM VOU DESCANSAR.',
        'DE TARDE FICO COMPRIDA,',
        'AO MEIO-DIA, ENCOLHIDA.'],
 pede:'QUE NOME PODERÍAMOS DAR A ESSE POEMA?',
 opts:[
  {t:'O ESPELHO.', no:'O espelho fica pendurado na parede. Ele não anda com você para todo lado e não some quando o sol vai embora.'},
  {t:'A SOMBRA.', ok:1},
  {t:'O SOL.', no:'Essa repete uma palavra do poema. Quem fala aqui diz que descansa QUANDO O SOL VAI EMBORA, então quem fala não é o sol.'},
  {t:'O RELÓGIO.', no:'Essa vem das palavras MEIO-DIA e TARDE. Relógio não anda com você e não fica comprido nem encolhido: ele só marca a hora.'}
 ],
 dica:'Quem está falando dá três pistas sobre si: anda sempre com você, some quando o sol vai embora e muda de tamanho durante o dia. Procure quem faz as três.',
 truque:'Uma pista de cada vez. A cada pista, risque quem não passa. Quem sobrar é a resposta.',
 acende:[0,2,4,5],
 visual:'<p class="vx"><span class="mk">ANDO SEMPRE COM VOC&Ecirc;</span> &rarr; vai junto para todo lado</p>'+
        '<p class="vx"><span class="mk">QUANDO O SOL VAI EMBORA, EU TAMB&Eacute;M VOU DESCANSAR</span> &rarr; depende do sol</p>'+
        '<p class="vx"><span class="mk">DE TARDE COMPRIDA, AO MEIO-DIA ENCOLHIDA</span> &rarr; muda de tamanho</p>'+
        '<div class="pcs"><span class="pc hit">A SOMBRA</span><span class="arw">&rarr;</span><span class="pc hit">fecha as tr&ecirc;s</span></div>'+
        '<div class="pcs"><span class="pc bad">O ESPELHO</span><span class="arw">&rarr;</span><span class="pc bad">fica parado na parede</span></div>',
 porque:'A sombra anda com a gente para todo lado, não dá para pegar nela, some quando o sol vai embora e fica comprida de tarde e curtinha ao meio-dia. As três pistas do poema fecham só com a sombra.',
 proximo:'Junte TODAS as pistas do texto antes de marcar. Uma resposta pode fechar uma pista e brigar com a outra.'},

{id:'TR36', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['TODO SÁBADO A MINHA MÃE PEDE QUE EU ARRUME O QUARTO.',
        'MAS O MEU IRMÃO DE DOIS ANOS FICA SOLTO LÁ DENTRO, TIRANDO TUDO DE NOVO.',
        'A VOVÓ DIZ QUE ARRUMAR O QUARTO ASSIM É O MESMO QUE VARRER A CASA COM A PORTA ABERTA NO VENTO.',
        'DIZ QUE É O MESMO QUE ENXUGAR O CHÃO COM A TORNEIRA ESCORRENDO.',
        'E O MESMO QUE FAZER A CAMA COM O GATO DORMINDO EM CIMA DELA.'],
 pede:'SEGUINDO A IDEIA DO TEXTO, ARRUMAR O QUARTO ASSIM SERIA O MESMO QUE:',
 opts:[
  {t:'ENCHER O BALDE NA TORNEIRA.', no:'Essa repete a palavra TORNEIRA do texto. Encher o balde dá certo: a água fica dentro dele.'},
  {t:'VARRER A CASA COM A PORTA FECHADA.', no:'Essa repete VARRER e PORTA, mas troca aberta por fechada. Com a porta fechada, a casa varrida continua varrida.'},
  {t:'PINTAR UM DESENHO COM A IRMÃ RABISCANDO POR CIMA.', ok:1},
  {t:'LAVAR A LOUÇA DEPOIS DO JANTAR.', no:'A louça lavada continua lavada. Nos três exemplos da vovó, alguém desmancha o trabalho na hora em que ele está sendo feito.'}
 ],
 dica:'Olhe os três exemplos que a vovó deu. Pergunte de cada um: quem está desmanchando o trabalho enquanto ele é feito?',
 truque:'O que os três exemplos do texto têm de igual? A resposta certa faz a mesma coisa.',
 acende:[2,3,4],
 visual:'<div class="pcs"><span class="pc hit">VARRER COM A PORTA ABERTA</span><span class="pc hit">ENXUGAR COM A TORNEIRA ESCORRENDO</span><span class="pc hit">FAZER A CAMA COM O GATO EM CIMA</span></div>'+
        '<p class="vx">Nos tr&ecirc;s, o trabalho <b>se desfaz enquanto est&aacute; sendo feito</b>: o vento traz sujeira, a torneira molha, o gato amassa.</p>'+
        '<div class="pcs"><span class="pc hit">pintar com a irm&atilde; rabiscando por cima</span><span class="arw">&rarr;</span><span class="pc hit">desmancha na hora</span></div>'+
        '<p class="vx"><span class="dm">Encher o balde, varrer com a porta fechada e lavar a lou&ccedil;a d&atilde;o certo. Por isso n&atilde;o servem.</span></p>',
 porque:'A vovó compara arrumar o quarto com varrer com a porta aberta no vento, enxugar o chão com a torneira escorrendo e fazer a cama com o gato em cima: nos três, alguém desmancha o trabalho enquanto ele está sendo feito. Pintar um desenho com a irmã rabiscando por cima é assim.',
 proximo:'Quando o texto dá três exemplos parecidos, ache o que eles têm de igual antes de olhar as alternativas. A certa vai repetir essa mesma ideia.'},

{id:'TR37', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O PEQUENO POEMA ABAIXO:',
 texto:['A CADEIRA DA COZINHA',
        'TEM UM RISCO NO ENCOSTO.',
        'FUI EU QUE FIZ, SUBINDO NELA,',
        'QUANDO EU NÃO ALCANÇAVA A PIA.',
        'HOJE EU ALCANÇO ATÉ O ARMÁRIO DE CIMA.'],
 pede:'PENSE SOBRE O PEQUENO POEMA ACIMA E RESPONDA: QUE NOME O AUTOR DEU A ELE?',
 opts:[
  {t:'QUANDO EU ERA PEQUENO.', ok:1},
  {t:'A CADEIRA QUEBRADA.', no:'Essa repete a palavra CADEIRA. O poema diz que a cadeira tem um RISCO no encosto, e riscada não é quebrada.'},
  {t:'O ARMÁRIO DE CIMA.', no:'Essa sai da última linha. O armário aparece uma vez só, e aparece para mostrar o quanto ele cresceu.'},
  {t:'A HORA DO JANTAR.', no:'Essa fala de jantar, e o poema não fala de comida em nenhuma linha. Ele fala de subir na cadeira e de alcançar.'}
 ],
 dica:'Leia com a régua as duas últimas linhas. Uma diz o que ele NÃO alcançava antes; a outra diz o que ele alcança hoje. O que mudou entre as duas?',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[3,4],
 visual:'<div class="pcs"><span class="pc bad">ANTES<br>N&Atilde;O ALCAN&Ccedil;AVA A PIA</span><span class="arw">&rarr;</span><span class="pc hit">HOJE<br>ALCAN&Ccedil;A O ARM&Aacute;RIO DE CIMA</span></div>'+
        '<p class="vx">Ele precisava da cadeira para chegar &agrave; pia. <b>Hoje n&atilde;o precisa mais.</b></p>'+
        '<p class="vx">O poema n&atilde;o &eacute; sobre a cadeira nem sobre o arm&aacute;rio: &eacute; sobre o tempo em que ele era pequeno.</p>',
 porque:'O poema conta que ele subia na cadeira porque NÃO ALCANÇAVA A PIA, e que HOJE alcança até o armário de cima. O risco na cadeira é a marca do tempo em que ele era pequeno.',
 proximo:'Olhe se o texto está falando de agora ou de uma coisa que já passou. Uma palavrinha como NÃO ALCANÇAVA muda o poema inteiro.'},

{id:'TR38', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['HOJE BRUNO VAI AO DENTISTA DEPOIS DA AULA.',
        'AMANHÃ ELE VAI À FESTA DE ANIVERSÁRIO DA PRIMA.',
        'ONTEM ELE TREINOU NATAÇÃO COM O TIO, PORQUE TODA QUARTA-FEIRA TEM TREINO.'],
 pede:'EM QUAL DIA BRUNO VAI À FESTA DA PRIMA?',
 opts:[
  {t:'TERÇA-FEIRA.', no:'Terça é o dia antes da quarta. A pergunta é sobre AMANHÃ, que fica para a frente, não para trás.'},
  {t:'QUARTA-FEIRA.', no:'Essa é o único dia com nome escrito no texto. O texto diz que a quarta foi ONTEM, e ontem ele treinou natação.'},
  {t:'QUINTA-FEIRA.', no:'Quinta é HOJE. Hoje ele vai ao dentista; a festa é amanhã.'},
  {t:'SEXTA-FEIRA.', ok:1}
 ],
 dica:'Ache no texto o único dia que tem nome. Depois monte a fila: ontem, hoje, amanhã. E confira em qual dos três está a festa.',
 truque:'Monte a fila do tempo: semana passada, ontem, hoje, semana que vem. Só então responda.',
 acende:[1,2],
 visual:'<div class="pcs"><span class="pc">ONTEM<br>quarta<br>nata&ccedil;&atilde;o</span><span class="arw">&rarr;</span>'+
        '<span class="pc">HOJE<br>quinta<br>dentista</span><span class="arw">&rarr;</span>'+
        '<span class="pc hit">AMANH&Atilde;<br>sexta<br>festa da prima</span></div>'+
        '<p class="vx">O &uacute;nico dia com nome est&aacute; na <b>&uacute;ltima</b> linha: <b class="mk">TODA QUARTA-FEIRA TEM TREINO</b>, e o treino foi ontem. A fila come&ccedil;a por ali.</p>',
 porque:'O texto diz que o treino é toda quarta-feira e que o treino foi ONTEM. Então ontem foi quarta, hoje é quinta e amanhã é sexta. A festa da prima é amanhã: sexta-feira.',
 proximo:'Ache o único dia que o texto nomeia, monte a fila ontem–hoje–amanhã e só então volte para ver qual dia a pergunta pediu.'},
