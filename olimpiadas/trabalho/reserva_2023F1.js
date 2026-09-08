/* ============================================================
   reserva_2023F1.js — BLOCO DE ITENS · Olimpíada de Português
   Categoria G · 2º ano · prova de 2023 · 1ª FASE

   O QUE É: 14 itens prontos para colar dentro da lista `ITENS` do
   ferramentas/OP_data.js, no mesmo formato e na mesma voz dos itens
   de 2025 e 2024 que já estão lá.

   DE ONDE VEIO: olimpiadas/_fontes_md/OP_2023_catG_fase1_prova.md
   (conversão do PDF oficial), com a análise de cada distrator em
   olimpiadas/_fontes/DOSSIE_2023.md (seção Fase 1) e as imagens em
   olimpiadas/_fontes/png/OP_2023_catG_fase1_prova_p*.png.
   Gabarito oficial conferido: 1=A 2=D 3=A 4=D 5=C 6=E 7=E 8=B 9=D
   10=C 11=A 12=C 13=E 14=D 15=A. Nenhum enunciado, alternativa ou
   gabarito foi inventado: os enunciados e as alternativas estão
   verbatim, em caixa alta, como na prova.

   O QUE FICOU DE FORA: a questão 9 (a tabela transforma cada letra
   num desenho e as CINCO alternativas são fileiras de oito ícones).
   Não há como representá-la em texto sem virar outra questão, e a
   armadilha dela é justamente visual — dois chinelos quase iguais
   valendo O e S. Ficam 14 itens dos 15.

   POLÍTICA DE CORTE DA 5ª ALTERNATIVA: em 2023 cada questão tinha
   cinco respostas (A a E) e a prova de hoje tem quatro. Cada item
   aqui perdeu UMA alternativa errada — a mais fraca, a de descarte
   óbvio, nunca a que revela a armadilha típica. A alternativa
   correta nunca sai, e nenhuma alternativa foi reescrita. Todo item
   declara a redução no campo `nota`.

   DUAS FIGURAS ENTRARAM COM O NOME ESCRITO: a Q7 (o desenho é uma
   borboleta) e a Q10 (coração, castelo, boca, faca). Nos dois casos
   a adaptação está declarada na mesma frase da `nota`.
   ============================================================ */

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
