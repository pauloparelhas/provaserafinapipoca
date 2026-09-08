/* ============================================================
   reserva_2024F2.js — BLOCO DE ITENS: Olimpíada de Português
   Categoria G · 2º ano · 2024 · 2ª FASE

   O QUE É: o array de itens da 2ª fase de 2024, no formato exato do
   banco em produção (ferramentas/OP_data.js). É para ser COLADO dentro
   da lista ITENS que já existe lá — não traz window.OP nem função em
   volta.

   DE ONDE VEIO:
   - Enunciados e alternativas, verbatim e em caixa alta:
     olimpiadas/_fontes_md/OP_2024_catG_fase2_prova.md
   - Análise de cada distrator: olimpiadas/_fontes/DOSSIE_2024.md (FASE 2)
   - Gabarito oficial da 2ª fase de 2024, lido duas vezes (leitura visual
     do ESPAÇO-RESPOSTA e detecção de célula vermelha por coordenada):
     1=B 2=B 3=C 4=D 5=B 6=A 7=C 8=B 9=D 10=D 11=D 12=B 13=C 14=B 15=B
   Nenhum enunciado, alternativa ou gabarito foi inventado.

   14 DE 15 QUESTÕES ENTRARAM. FICOU DE FORA:
   - Q15 (código de Carlito): a chave do código é uma FILA DE SÍMBOLOS
     DESENHADOS alinhada com ESPORTE, e as quatro alternativas TAMBÉM são
     filas de símbolos desenhados. Não há como escrever a questão em
     palavras sem inventar um código novo — e um código novo já não seria
     a questão da prova. A família `codigo` continua treinada pelo 25F1Q15,
     que existe no banco.

   ADAPTAÇÃO DECLARADA (com campo `nota`, no padrão dos itens 24F1Q3 e
   24F1Q11):
   - Q8: na prova aparece o desenho de um sapo e é a criança que descobre
     o nome. Aqui o nome vem escrito no `quadro`, porque a figura só
     NOMEIA a coisa — o resto da questão (achar SA e PO dentro das
     palavras) continua igual.

   TRUQUES NOVOS (os demais foram copiados palavra por palavra do banco):
   - Q8 e Q9 pedem gestos que nenhuma família cobria: procurar os pedaços
     do nome DENTRO de cada palavra (Q8) e colar um pedaço na frente de
     uma palavra e testar se o que saiu existe E diz o que a pergunta
     pediu (Q9).
   ============================================================ */

/* ===================== 2024 · 2ª FASE ===================== */

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
