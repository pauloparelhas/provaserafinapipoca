/* ============================================================
   reserva_2025F2.js — BLOCO DE ITENS: Olimpíada de Português
   2025 · 2ª FASE · Categoria G · 2º ano · 15 questões

   O QUE É: só o array de itens, no formato do banco de produção
   ferramentas/OP_data.js. Colar dentro da lista ITENS existente,
   antes da sentinela {id:'FIM'}. Não traz window.OP nem função.

   DE ONDE VEIO:
   - Enunciados e alternativas, verbatim e em caixa alta:
     olimpiadas/_fontes_md/OP_2025_catG_fase2_prova.md
   - Análise de cada distrator:
     olimpiadas/_fontes/DOSSIE_2025.md, seção FASE 2
   - Gabarito oficial da 2ª fase de 2025, conferido:
     1=C 2=C 3=A 4=B 5=B 6=B 7=D 8=C 9=C 10=B 11=B 12=A 13=B 14=D 15=C

   QUESTÕES QUE FICARAM DE FORA: nenhuma. As 15 entraram.
   - A Q11 (as três gravuras: cachorro, nariz, bananeira) é a única
     que dependia de figura para valer ponto. Como a figura só NOMEIA
     coisas, os três nomes vêm escritos no `quadro` e a adaptação está
     declarada no campo `nota`, igual ao que 24F1Q3 e 24F1Q11 fazem.
     Consequência assumida: o distrator ARBUSTO (que na prova pega quem
     chama a bananeira de "árvore") perde força — o comentário dele
     explica isso à criança em vez de esconder.
   - As demais figuras da prova são decorativas (foca, casinha, ursinho,
     criança com livro) ou texto transcritível (o cartaz da Q10).

   TRUQUES NOVOS (não existiam nas FAMILIAS nem em nenhum item):
   - Q2  'As vogais ficam paradas. Troque só as consoantes e leia a
          palavra que saiu.'  (espelha a frase da troca de vogais)
   - Q4 e Q12 'Palavra escondida vem inteira e grudada, na ordem. Tape o
          começo e o fim com o dedo e leia o que sobrou.'
   - Q9  'Descubra o que muda de uma palavra para a outra. Se só a
          primeira letra muda, o resto tem de ficar igualzinho.'
   - Q13 'Escreva a fila em ordem alfabética e depois escreva a mesma
          fila de trás para frente, uma embaixo da outra. Só então
          compare.'
   - Q15 'O que os três exemplos do texto têm de igual? A resposta certa
          faz a mesma coisa.'
   Todos os outros truques foram copiados palavra por palavra do banco.
   ============================================================ */

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
