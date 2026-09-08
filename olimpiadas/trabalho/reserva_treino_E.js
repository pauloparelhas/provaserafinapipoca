/* ============================================================
   reserva_treino_E.js — BLOCO DE ITENS DE TREINO (AUTORAIS)
   Categoria G · 2º ano · 14 questões · ids TR53 a TR66

   ATENÇÃO — ESTAS QUESTÕES NÃO SÃO DE PROVA.
   Nenhum item deste arquivo saiu de uma prova da Olimpíada de
   Português. São exercícios ESCRITOS POR NÓS, no molde da banca,
   e por isso a `origem` de todos é a mesma frase, sem ano e sem
   número de questão: 'Treino no estilo da prova'. Citar ano/fase/
   questão aqui seria mentira — o banco oficial (OP_data.js) só usa
   `origem` com ano quando o enunciado é verbatim do PDF.

   O QUE ESTE BLOCO TRAZ
   Sete itens do eixo `contar` (TR53 a TR59) e sete do eixo `intruso`
   (TR60 a TR66), os dois eixos em que a repetição mais rende e em que
   o banco verbatim tem pouca munição.
   - `contar`: uma única vogal (TR53, TR58), mais consoantes do que
     vogais (TR54), espaços que faltam (TR55), quantas vezes a letra
     aparece (TR56, TR57), letra que não muda de som (TR59).
   - `intruso`: a palavra que não pertence ao grupo, com as vizinhas
     foneticamente parecidas (TR60, TR61, TR62, TR63); troca de palavra
     com a pista morando ao lado (TR64, TR65); pistas em cadeia, com o
     distrator caindo só na última (TR66).

   COMO FORAM ESCRITOS (assinatura da banca, obedecida item a item)
   - O distrator premia a leitura parcial: passa em quase todos os
     critérios e cai em UM.
   - Nada se resolve numa operação só: sempre duas etapas encadeadas.
   - Uma letra decide a questão (CANETA × CANECA, PENTE × ANEL,
     MOSCA × MOCHILA, SS × S).
   - No intruso por significado, a palavra certa NUNCA é a que a
     criança provavelmente não conhece: as quatro são do mundo dela,
     e o que separa é o que a palavra QUER DIZER.
   - O enunciado explica a regra em linguagem de criança antes de
     cobrar. Zero metalinguagem: só VOGAL, CONSOANTE, SÍLABA, LETRA.
   - `truque` é copiado palavra por palavra da família em FAMILIAS
     (contar, intruso), ou — nos itens de troca de palavra e de pistas
     em cadeia — da frase que o próprio banco já usa nesses formatos
     (24F1Q9/24F2Q5/25F2Q1 e 25F1Q8). Não se inventa truque novo.
   - Toda contagem foi feita letra por letra, refeita do zero e
     conferida por script. As contas ficam explícitas no `visual` e
     no `porque` de cada item.

   COMO OS COMENTÁRIOS DE ERRO FORAM ESCRITOS
   Nenhum `no` valida a alternativa errada antes de negá-la. Nada de
   "é verdade, mas", "está certo, porém", "isso acontece mesmo, só
   que": para uma criança de 7 anos, isso soa como permissão para
   marcar. Cada `no` começa dizendo o que a alternativa ERRA — no eixo
   `contar`, com a conta na mão — e só depois diz onde estava a pista
   ou o que puxou a mão para ali. Uma ideia por frase. A `dica`
   funciona ANTES de a criança saber a resposta, e o `proximo` dá o
   gesto da próxima questão em vez de repetir o truque.

   Colar dentro da lista ITENS do OP_data.js (ou do carregador de
   reservas), exatamente como está.
   ============================================================ */

{id:'TR53', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'A PROFESSORA VAI MONTAR UM MURAL COM FIGURINHAS E INVENTOU UMA REGRA PARA ESCOLHER QUAIS ENTRAM:',
 quadro:'&mdash; S&Oacute; VOU COLAR AS FIGURINHAS CUJO NOME USA UMA &Uacute;NICA VOGAL, MESMO QUE ELA APARE&Ccedil;A V&Aacute;RIAS VEZES!'+
        '<div class="sep"></div>LARANJA &ndash; CAVALO &ndash; DENTE &ndash; ESTRELA &ndash; PORCO &ndash; CADERNO &ndash; TESOURA',
 pede:'MARQUE A ALTERNATIVA QUE MOSTRA APENAS AS FIGURINHAS QUE A PROFESSORA VAI COLAR:',
 opts:[
  {t:'LARANJA, CAVALO E DENTE.', no:'CAVALO termina em LO: tem A, A e O. São duas vogais diferentes. Os dois primeiros pedaços, CA-VA, só têm A — é ali que o dedo para de conferir.'},
  {t:'DENTE, ESTRELA E PORCO.', no:'ESTRELA termina em A: tem E, E e A. São duas vogais diferentes. A vogal que estraga está na última letra da palavra.'},
  {t:'LARANJA, DENTE E PORCO.', ok:1},
  {t:'PORCO, CADERNO E TESOURA.', no:'CADERNO tem A, E e O: três vogais diferentes. TESOURA tem E, O, U e A: quatro. Uma figurinha errada derruba a alternativa inteira.'}
 ],
 dica:'Vogal é A, E, I, O, U. Ponha um pontinho embaixo de cada vogal do nome e vá até a ÚLTIMA letra da palavra.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">L<b>A</b>R<b>A</b>NJ<b>A</b></span><span class="pc hit">D<b>E</b>NT<b>E</b></span><span class="pc hit">P<b>O</b>RC<b>O</b></span></div>'+
        '<p class="vx">S&oacute; <b>A</b> na primeira, s&oacute; <b>E</b> na segunda, s&oacute; <b>O</b> na terceira. Repetir a mesma vogal pode. Trocar de vogal, n&atilde;o.</p>'+
        '<div class="pcs"><span class="pc bad">CAVAL<b>O</b></span><span class="pc bad">ESTREL<b>A</b></span><span class="pc bad">C<b>A</b>D<b>E</b>RN<b>O</b></span><span class="pc bad">T<b>E</b>S<b>OU</b>R<b>A</b></span></div>'+
        '<p class="vx">Em CAVALO e em ESTRELA a vogal que estraga est&aacute; na <b>&uacute;ltima letra</b>.</p>',
 porque:'LARANJA usa só o A, três vezes. DENTE usa só o E, duas vezes. PORCO usa só o O, duas vezes. Nas outras entra uma segunda vogal: o O do fim de CAVALO, o A do fim de ESTRELA, o A, o E e o O de CADERNO, e as quatro de TESOURA.',
 proximo:'Passe o dedo pela palavra até a última letra e só então conte os pontinhos. Na alternativa com três nomes, confira os três antes de marcar.'},

{id:'TR54', eixo:'contar', origem:'Treino no estilo da prova',
 pede:'QUAL DAS FRASES ABAIXO TEM MAIS CONSOANTES DO QUE VOGAIS?',
 opts:[
  {t:'A MENINA VIU UMA ABELHA NA AREIA.', no:'Esta frase tem 16 vogais e 10 consoantes: as vogais ganham. Em VIU e em AREIA as vogais vêm grudadas umas nas outras.'},
  {t:'MARTA COMPROU PRATOS BRANCOS.', ok:1},
  {t:'O PAPAGAIO COMEU A GOIABA MADURA.', no:'Esta frase tem 17 vogais e 10 consoantes: as vogais ganham. PAPAGAIO sozinha já traz cinco vogais.'},
  {t:'A MOEDA DOURADA CAIU DEBAIXO DA MESA DA COZINHA.', no:'Esta frase tem 22 vogais e 17 consoantes: as vogais ganham. Ela é a mais comprida das quatro, e é o tamanho que puxa a mão para ela.'}
 ],
 dica:'Vogal é A, E, I, O, U — todo o resto é consoante. Em cada frase, procure os lugares em que duas consoantes estão coladas e os lugares em que duas vogais estão coladas.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">MPR</span><span class="pc hit">PR</span><span class="pc hit">TS</span><span class="pc hit">BR</span><span class="pc hit">NC</span></div>'+
        '<p class="vx">Em <b>MARTA COMPROU PRATOS BRANCOS</b> as consoantes andam grudadas o tempo todo: <b>9 vogais</b> contra <b>16 consoantes</b>.</p>'+
        '<div class="pcs"><span class="pc bad">VIU</span><span class="pc bad">AREIA</span><span class="pc bad">PAPAGAIO</span><span class="pc bad">GOIABA</span><span class="pc bad">CAIU</span><span class="pc bad">DEBAIXO</span></div>'+
        '<p class="vx">Nas outras tr&ecirc;s frases quem anda grudada &eacute; a <b>vogal</b>. As contas dessas tr&ecirc;s: 16 a 10, 17 a 10 e 22 a 17, sempre a favor das vogais.</p>',
 porque:'MARTA COMPROU PRATOS BRANCOS tem 9 vogais e 16 consoantes. As consoantes vêm grudadas em MPR, PR, TS, BR e NC. Nas outras três frases as vogais é que vêm grudadas, e elas ganham em todas: 16 a 10, 17 a 10 e 22 a 17.',
 proximo:'Antes de contar, olhe onde as letras estão coladas. Depois faça a conta das quatro frases e só então compare os números.'},

{id:'TR55', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'BEATRIZ COPIOU UMA FRASE DO QUADRO CORRENDO E ESQUECEU DE DEIXAR ESPAÇO ENTRE AS PALAVRAS. VEJA COMO FICOU:',
 quadro:'OPASSARINHOPEQUENOPOUSOUEMCIMADOMURODACASA.',
 pede:'QUANTOS ESPAÇOS FALTAM PARA CONSERTAR A FRASE DE BEATRIZ?',
 opts:[
  {t:'8.', no:'Oito sai de quem cola duas palavras numa só na hora de separar, como EM CIMA virando EMCIMA. Aí a frase fica com nove palavras. Separando com cuidado são dez.'},
  {t:'9.', ok:1},
  {t:'10.', no:'Dez é o número de PALAVRAS da frase. A pergunta é de ESPAÇOS, e o espaço mora entre duas palavras: ele é sempre um a menos.'},
  {t:'11.', no:'Onze é contar as dez palavras e ainda pôr um espaço depois do ponto final. Depois do ponto a frase acabou: ali não entra espaço nenhum.'}
 ],
 dica:'Primeiro separe a frase e escreva as palavras uma do lado da outra. Só depois conte os buraquinhos ENTRE elas.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="pc">PASSARINHO</span><span class="pc">PEQUENO</span><span class="pc">POUSOU</span><span class="pc bad">EM</span><span class="pc">CIMA</span><span class="pc bad">DO</span><span class="pc">MURO</span><span class="pc bad">DA</span><span class="pc">CASA</span></div>'+
        '<p class="vx">S&atilde;o <b>10</b> palavras. As tr&ecirc;s em destaque s&atilde;o as curtinhas, as que somem quando a gente l&ecirc; r&aacute;pido.</p>'+
        '<div class="pcs"><span class="pc hit">10 palavras</span><span class="arw">&rarr;</span><span class="pc hit">9 espa&ccedil;os</span></div>'+
        '<p class="vx">O espa&ccedil;o mora <b>entre</b> duas palavras. Por isso ele &eacute; sempre <b>um a menos</b> que o n&uacute;mero de palavras.</p>',
 porque:'Separando, a frase é O PASSARINHO PEQUENO POUSOU EM CIMA DO MURO DA CASA: dez palavras. Entre dez palavras cabem nove espaços, porque não tem espaço antes da primeira nem depois do ponto final.',
 proximo:'Separe a frase inteira e escreva as palavras no papel. Depois conte as palavras e tire um: esse é o número de espaços.'},

{id:'TR56', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'LEIA A FRASE ABAIXO COM O DEDO, BEM DEVAGAR:',
 quadro:'O MENINO COMPROU OITO OVOS NO MERCADO.',
 pede:'QUANTAS VEZES A LETRA O APARECE NESSA FRASE?',
 opts:[
  {t:'7.', no:'Sete é o número de PALAVRAS da frase. A pergunta é quantas vezes a LETRA aparece, e COMPROU, OITO e OVOS têm dois O cada uma.'},
  {t:'8.', no:'Oito é o que sobra quando as palavras curtas somem da conta. O primeiro O da frase está sozinho e o NO tem O: cada um vale um pontinho.'},
  {t:'9.', no:'Nove é um O a menos. O que escapa costuma ser o segundo O de COMPROU, espremido entre o R e o U.'},
  {t:'10.', ok:1}
 ],
 dica:'Vá de uma palavra por vez e escreva o número de O em cima de cada uma. Só depois some tudo.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit"><b>O</b> = 1</span><span class="pc hit">MENIN<b>O</b> = 1</span><span class="pc hit">C<b>O</b>MPR<b>O</b>U = 2</span><span class="pc hit"><b>O</b>IT<b>O</b> = 2</span><span class="pc hit"><b>O</b>V<b>O</b>S = 2</span><span class="pc hit">N<b>O</b> = 1</span><span class="pc hit">MERCAD<b>O</b> = 1</span></div>'+
        '<p class="vx">1 + 1 + 2 + 2 + 2 + 1 + 1 = <b>10</b></p>'+
        '<div class="pcs"><span class="pc bad">7 palavras com O</span><span class="arw">&rarr;</span><span class="pc bad">a pergunta n&atilde;o &eacute; essa</span></div>'+
        '<p class="vx"><span class="dm">COMPROU, OITO e OVOS valem <b>dois</b> pontinhos cada. &Eacute; o que separa o 7 do 10.</span></p>',
 porque:'Contando letra por letra: O tem 1, MENINO tem 1, COMPROU tem 2, OITO tem 2, OVOS tem 2, NO tem 1 e MERCADO tem 1. Somando: 1+1+2+2+2+1+1 = 10.',
 proximo:'Escreva o número em cima de cada palavra e some no fim. Não conte de cabeça, e não pule as palavras de uma ou duas letras.'},

{id:'TR57', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'LEIA A FRASE ABAIXO COM O DEDO, UMA PALAVRA POR VEZ:',
 quadro:'A PROFESSORA PASSOU SEIS LIVROS PARA A CLASSE.',
 pede:'QUANTAS VEZES A LETRA S APARECE NESSA FRASE?',
 opts:[
  {t:'5.', no:'Cinco é o número de PALAVRAS que têm S: PROFESSORA, PASSOU, SEIS, LIVROS e CLASSE. A pergunta é quantas vezes a LETRA aparece, e quatro dessas palavras têm dois S cada uma.'},
  {t:'6.', no:'Seis sai de quem lê o SS como se fosse um S só. Em PROFESSORA, PASSOU e CLASSE são duas letras coladas, e cada uma pede o seu pontinho.'},
  {t:'8.', no:'Oito é um S a menos, e o que escapa é o último de tudo: o S do fim de LIVROS ou o segundo S de SEIS, que está na última letra.'},
  {t:'9.', ok:1}
 ],
 dica:'Escreva o número de S em cima de cada palavra. Onde aparecer SS, marque dois pontinhos, não um.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">PROFE<b>SS</b>ORA = 2</span><span class="pc hit">PA<b>SS</b>OU = 2</span><span class="pc hit"><b>S</b>EI<b>S</b> = 2</span><span class="pc hit">LIVRO<b>S</b> = 1</span><span class="pc hit">CLA<b>SS</b>E = 2</span></div>'+
        '<p class="vx">2 + 2 + 2 + 1 + 2 = <b>9</b></p>'+
        '<div class="pcs"><span class="pc bad">5 palavras com S</span><span class="arw">&rarr;</span><span class="pc bad">a pergunta n&atilde;o &eacute; essa</span></div>'+
        '<p class="vx"><span class="dm">A, PARA e A n&atilde;o t&ecirc;m S nenhum. O <b>SS</b> vale dois pontinhos: quem conta um s&oacute; para no seis.</span></p>',
 porque:'Contando letra por letra: PROFESSORA tem 2, PASSOU tem 2, SEIS tem 2 (o do começo e o do fim), LIVROS tem 1 e CLASSE tem 2. As outras palavras não têm nenhum. Somando: 2+2+2+1+2 = 9.',
 proximo:'Marque dois pontinhos onde a palavra tiver duas letras iguais coladas. Depois vá até a última letra de cada palavra antes de somar.'},

{id:'TR58', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'NO CIRCO, O MÁGICO CONTOU O SEGREDO DELE:',
 quadro:'&mdash; S&Oacute; CONSIGO FAZER SUMIR AS COISAS CUJO NOME USA UMA &Uacute;NICA VOGAL, MESMO QUE ELA APARE&Ccedil;A V&Aacute;RIAS VEZES!',
 pede:'QUAL DAS COISAS ABAIXO O MÁGICO CONSEGUE FAZER SUMIR?',
 opts:[
  {t:'ESPELHO.', no:'ESPELHO termina em LHO: tem E, E e O. São duas vogais diferentes. Os dois primeiros pedaços, ES-PE, só têm E — é ali que o dedo para de conferir.'},
  {t:'ANEL.', no:'ANEL tem o A do começo e o E do fim: A-N-E-L. São duas vogais diferentes numa palavra de quatro letras.'},
  {t:'PENTE.', ok:1},
  {t:'TAMBOR.', no:'TAMBOR tem o A do primeiro pedaço e o O do segundo: TAM-BOR. São duas vogais diferentes.'}
 ],
 dica:'Vogal é A, E, I, O, U. Soletre a palavra inteira, do começo ao fim, e faça um pontinho em cada vogal.',
 truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
 visual:'<div class="pcs"><span class="pc hit">P<b>E</b>NT<b>E</b></span><span class="arw">&rarr;</span><span class="pc hit">s&oacute; E, duas vezes</span></div>'+
        '<div class="pcs"><span class="pc bad">ESP<b>E</b>LH<b>O</b></span><span class="pc bad"><b>A</b>N<b>E</b>L</span><span class="pc bad">T<b>A</b>MB<b>O</b>R</span></div>'+
        '<p class="vx">Nas tr&ecirc;s de baixo entram <b>duas</b> vogais diferentes. Repetir a mesma vogal pode. Trocar de vogal, n&atilde;o.</p>',
 porque:'PENTE usa só a vogal E, mesmo aparecendo duas vezes: P-E-N-T-E. Nas outras entra uma segunda vogal: o O de ESPELHO, o E de ANEL e o O de TAMBOR.',
 proximo:'Soletre a palavra em voz baixa, letra por letra, até o fim. A segunda vogal costuma aparecer no último pedaço.'},

{id:'TR59', eixo:'contar', origem:'Treino no estilo da prova',
 enun:'A MESMA LETRA NEM SEMPRE FAZ O MESMO BARULHO EM DUAS PALAVRAS DIFERENTES.',
 pede:'ENTRE AS LETRAS ABAIXO, QUAL É A ÚNICA QUE NÃO MUDA DE SOM NAS DUAS PALAVRAS INDICADAS?',
 opts:[
  {t:'LETRA S: SOL, ROSA.', no:'Fale as duas em voz alta. SOL começa com o barulho de cobra: sssol. O S de ROSA fica espremido entre duas vogais e sai como Z: ro-Z-a.'},
  {t:'LETRA P: PATO, COPO.', ok:1},
  {t:'LETRA X: PEIXE, EXAME.', no:'Fale as duas em voz alta. O X de PEIXE faz o barulho de CHI. O X de EXAME sai como Z: e-Z-ame.'},
  {t:'LETRA R: RIO, PERA.', no:'Fale as duas em voz alta. O R de RIO é forte, igual ao RR de CARRO. O R de PERA é fraquinho, batidinho. Esse é o par mais difícil de escutar.'}
 ],
 dica:'Aqui não adianta olhar: fale as duas palavras de cada alternativa em voz alta, baixinho, e escute a letra.',
 truque:'Quando a pergunta fala de SOM, fale as palavras em voz alta e escute. Olhar não resolve.',
 visual:'<div class="pcs"><span class="pc hit">PATO</span><span class="pc hit">COPO</span><span class="arw">&rarr;</span><span class="pc hit">mesmo som</span></div>'+
        '<div class="pcs"><span class="pc bad">SOL</span><span class="pc bad">ROSA</span><span class="arw">&rarr;</span><span class="pc bad">S e Z</span></div>'+
        '<div class="pcs"><span class="pc bad">PEIXE</span><span class="pc bad">EXAME</span><span class="arw">&rarr;</span><span class="pc bad">CHI e Z</span></div>'+
        '<div class="pcs"><span class="pc bad">RIO</span><span class="pc bad">PERA</span><span class="arw">&rarr;</span><span class="pc bad">R forte e R fraco</span></div>',
 porque:'O P faz o mesmo barulho em PATO e em COPO. Nas outras três, a mesma letra muda de som de uma palavra para a outra: o S vira Z em ROSA, o X vira Z em EXAME e o R forte de RIO vira o R fraquinho de PERA.',
 proximo:'Fale as duas palavras de cada alternativa baixinho, uma atrás da outra. Marque só aquela em que a letra sair com o mesmo barulho nas duas.'},

{id:'TR60', eixo:'intruso', origem:'Treino no estilo da prova',
 enun:'TOMÁS PASSOU O DIA NA CHÁCARA DA VOVÓ E FOI ANOTANDO NUM PAPEL OS BICHOS QUE ENCONTRAVA. NA HORA DE ESCREVER DEPRESSA, ELE SE ATRAPALHOU E ANOTOU UMA PALAVRA QUE NÃO É BICHO.',
 pede:'QUAL É ESSA PALAVRA?',
 opts:[
  {t:'MOSCA.', no:'A mosca é um bicho: ela voa e pousa na comida. Ela pertence à lista de bichos.'},
  {t:'MORCEGO.', no:'O morcego é um bicho: ele voa de noite e dorme de cabeça para baixo. Ele pertence à lista de bichos.'},
  {t:'MOCHILA.', ok:1},
  {t:'MOSQUITO.', no:'O mosquito é um bicho: é ele que zune no ouvido e pica. Ele pertence à lista de bichos.'}
 ],
 dica:'As quatro começam com MO e têm um som parecido: por aí não dá para decidir. Pense no que cada palavra SIGNIFICA.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">MOSCA</span><span class="pc hit">MORCEGO</span><span class="pc hit">MOSQUITO</span><span class="arw">&rarr;</span><span class="pc hit">bichos</span></div>'+
        '<div class="pcs"><span class="pc bad">MOCHILA</span><span class="arw">&rarr;</span><span class="pc bad">coisa de carregar nas costas</span></div>'+
        '<p class="vx">Mochila &eacute; onde se guarda o caderno para ir &agrave; escola. Ela n&atilde;o anda, n&atilde;o voa e n&atilde;o come.</p>',
 porque:'Três das quatro são bichos: mosca, morcego e mosquito. MOCHILA é uma coisa que a gente carrega nas costas — não tem o que fazer numa lista de bichos.',
 proximo:'Tape com o dedo o comecinho igual das quatro palavras. Depois diga em voz alta o que cada uma é: bicho ou coisa.'},

{id:'TR61', eixo:'intruso', origem:'Treino no estilo da prova',
 pede:'QUE PALAVRA NÃO FAZ PARTE DO GRUPO DE PALAVRAS A SEGUIR?',
 opts:[
  {t:'BOCA.', no:'A boca é uma parte do corpo da gente: é com ela que se come e se fala. Ela fica no grupo.'},
  {t:'BONECA.', ok:1},
  {t:'BARRIGA.', no:'A barriga é uma parte do corpo da gente: é ela que dói quando se come demais. Ela fica no grupo.'},
  {t:'BRAÇO.', no:'O braço é uma parte do corpo da gente: é com ele que se abraça e se carrega peso. Ele fica no grupo.'}
 ],
 dica:'As quatro começam com B, e BOCA e BONECA soam quase iguais. Faça a mesma pergunta para as quatro: isso é uma parte do MEU corpo?',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">BOCA</span><span class="pc hit">BARRIGA</span><span class="pc hit">BRA&Ccedil;O</span><span class="arw">&rarr;</span><span class="pc hit">partes do corpo</span></div>'+
        '<div class="pcs"><span class="pc bad">BONECA</span><span class="arw">&rarr;</span><span class="pc bad">brinquedo</span></div>'+
        '<p class="vx">BOCA e BONECA come&ccedil;am com o mesmo <b>BO</b>. Uma fica no meu rosto. A outra fica na caixa de brinquedos.</p>',
 porque:'BOCA, BARRIGA e BRAÇO são partes do corpo da gente. BONECA é um brinquedo: a gente pega na mão, e ela não faz parte do nosso corpo.',
 proximo:'Faça uma pergunta só e faça ela para as quatro palavras. Aqui a pergunta foi: isso é uma parte do meu corpo? Marque a que responder não.'},

{id:'TR62', eixo:'intruso', origem:'Treino no estilo da prova',
 enun:'A PROFESSORA MANDOU UM BILHETE PEDINDO QUE CADA CRIANÇA LEVASSE PARA A AULA COISAS QUE SERVEM PARA ESCREVER. NO BILHETE DE DAVI ENTROU UMA COISA QUE NÃO SERVE PARA ISSO.',
 pede:'QUAL DELAS NÃO SERVE PARA ESCREVER?',
 opts:[
  {t:'LÁPIS.', no:'O lápis escreve, e ainda dá para apagar depois. Ele pertence ao bilhete.'},
  {t:'CANETA.', no:'A caneta escreve: é a mais usada de todas para isso. Ela pertence ao bilhete.'},
  {t:'CANECA.', ok:1},
  {t:'GIZ.', no:'O giz é o pauzinho branco que escreve no quadro. Ele pertence ao bilhete.'}
 ],
 dica:'CANETA e CANECA são quase a mesma palavra: muda uma letra só. Não decida pelo som — pergunte para que serve cada coisa.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">L&Aacute;PIS</span><span class="pc hit">CANETA</span><span class="pc hit">GIZ</span><span class="arw">&rarr;</span><span class="pc hit">escrevem</span></div>'+
        '<div class="pcs"><span class="pc bad">CANECA</span><span class="arw">&rarr;</span><span class="pc bad">serve para beber</span></div>'+
        '<div class="pcs"><span class="pc">CANE<b>T</b>A</span><span class="arw">&rarr;</span><span class="pc">CANE<b>C</b>A</span></div>'+
        '<p class="vx">Uma letra separa as duas palavras: o <b>T</b> e o <b>C</b>. Uma escreve. A outra segura o leite.</p>',
 porque:'LÁPIS, CANETA e GIZ servem para escrever. CANECA serve para beber. Ela é parecidíssima com CANETA no som, e é aí que a questão pega.',
 proximo:'Quando duas palavras forem quase iguais, leia as duas letra por letra com o dedo. Depois diga em voz alta o que cada coisa faz.'},

{id:'TR63', eixo:'intruso', origem:'Treino no estilo da prova',
 enun:'AS QUATRO PALAVRAS ABAIXO SÃO COISAS QUE A GENTE FAZ. TRÊS DELAS A GENTE FAZ COM A MESMA PARTE DO CORPO.',
 pede:'QUAL DAS PALAVRAS ABAIXO NÃO É UMA COISA QUE A GENTE FAZ COM A BOCA?',
 opts:[
  {t:'CANTAR.', no:'Cantar é com a boca: é dela que sai a música. Fica no grupo.'},
  {t:'COMER.', no:'Comer é com a boca: é ela que mastiga. Fica no grupo.'},
  {t:'CORRER.', ok:1},
  {t:'CONVERSAR.', no:'Conversar é falar com alguém, e falar é com a boca. Fica no grupo.'}
 ],
 dica:'As quatro começam com CA ou CO e as quatro são coisas que a gente faz. Faça cada uma de mentirinha e repare que parte do corpo se mexe.',
 truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
 visual:'<div class="pcs"><span class="pc hit">CANTAR</span><span class="pc hit">COMER</span><span class="pc hit">CONVERSAR</span><span class="arw">&rarr;</span><span class="pc hit">com a boca</span></div>'+
        '<div class="pcs"><span class="pc bad">CORRER</span><span class="arw">&rarr;</span><span class="pc bad">com as pernas</span></div>'+
        '<p class="vx">As quatro come&ccedil;am quase igual: CA, CO, CO, CO. Quem junta as palavras pelo come&ccedil;o n&atilde;o acha o intruso.</p>',
 porque:'CANTAR, COMER e CONVERSAR são coisas que a gente faz com a boca. CORRER a gente faz com as pernas: é a única que não usa a boca.',
 proximo:'Faça cada palavra de mentirinha, uma por vez, e veja que parte do corpo se mexe. Não junte as palavras pelo comecinho igual.'},

{id:'TR64', eixo:'intruso', origem:'Treino no estilo da prova',
 enun:'LEIA O TRECHO ABAIXO E MARQUE A PALAVRA QUE PODERIA ENTRAR NO LUGAR DE EXAUSTO.',
 quadro:'TIAGO CORREU A TARDE INTEIRA ATR&Aacute;S DA BOLA. QUANDO O SOL SE P&Ocirc;S, ELE CHEGOU EM CASA <b>EXAUSTO</b> E DORMIU ANTES DAS OITO.',
 pede:'QUE PALAVRA PODERIA ENTRAR NO LUGAR DE EXAUSTO?',
 opts:[
  {t:'ANIMADO.', no:'Leia a frase com ela dentro: "CHEGOU EM CASA ANIMADO E DORMIU ANTES DAS OITO". As duas partes brigam: quem está animado não vai dormir tão cedo.'},
  {t:'CANSADO.', ok:1},
  {t:'DESCANSADO.', no:'Descansado é quem não gastou energia. O texto diz que o Tiago correu a tarde inteira atrás da bola. A palavra briga com a pista.'},
  {t:'ACORDADO.', no:'Acordado é quem não está dormindo. O texto já diz que ele chegou em casa, então isso não conta nada de novo. E logo depois ele dorme.'}
 ],
 dica:'Você não precisa saber o que é EXAUSTO. Tire a palavra, ponha a nova e leia a frase toda. As pistas moram do lado: CORREU A TARDE INTEIRA e DORMIU ANTES DAS OITO.',
 truque:'Tire a palavra velha, ponha a nova, leia a frase de novo. Continua dizendo a mesma coisa?',
 visual:'<p class="vx"><span class="mk">CORREU A TARDE INTEIRA</span> ... <span class="mk">DORMIU ANTES DAS OITO</span></p>'+
        '<p class="vx">CHEGOU EM CASA <b class="mk">CANSADO</b> <span class="dm">&mdash; continua dizendo a mesma coisa</span></p>'+
        '<p class="vx">CHEGOU EM CASA <b class="bad2">DESCANSADO</b> <span class="dm">&mdash; briga: ele correu a tarde inteira</span></p>'+
        '<p class="vx">CHEGOU EM CASA <b class="bad2">ANIMADO</b> <span class="dm">&mdash; briga: quem est&aacute; animado n&atilde;o dorme &agrave;s oito</span></p>',
 porque:'As duas pistas estão grudadas na palavra: ele CORREU A TARDE INTEIRA e DORMIU ANTES DAS OITO. Quem corre a tarde toda e cai no sono cedo chegou em casa CANSADO.',
 proximo:'Leia a linha de antes e a de depois da palavra difícil. Depois ponha cada alternativa no lugar dela e leia a frase inteira em voz alta.'},

{id:'TR65', eixo:'intruso', origem:'Treino no estilo da prova',
 enun:'LEIA O TRECHO ABAIXO E MARQUE A PALAVRA QUE PODERIA ENTRAR NO LUGAR DE VELOZ.',
 quadro:'NA CORRIDA DA ESCOLA, BRUNO FOI O MAIS <b>VELOZ</b> DE TODOS. ELE CRUZOU A LINHA DE CHEGADA BEM ANTES DO SEGUNDO COLOCADO.',
 pede:'QUE PALAVRA PODERIA ENTRAR NO LUGAR DE VELOZ?',
 opts:[
  {t:'RÁPIDO.', ok:1},
  {t:'DEVAGAR.', no:'Ponha DEVAGAR no lugar e leia: "FOI O MAIS DEVAGAR DE TODOS". A frase seguinte diz que ele cruzou a chegada bem antes dos outros. As duas brigam.'},
  {t:'FORTE.', no:'Forte fala da força do corpo. A pista do texto fala de CRUZAR A LINHA DE CHEGADA BEM ANTES, e isso é sobre correr depressa. Numa corrida a gente pensa logo em força: é aí que ela atrai.'},
  {t:'ALEGRE.', no:'Alegre fala do que a pessoa está sentindo. O texto não fala do que o Bruno sentiu: ele fala de chegar na frente.'}
 ],
 dica:'Você não precisa saber o que é VELOZ. Tire a palavra, ponha a nova e leia a frase seguinte: ela dá a pista.',
 truque:'Tire a palavra velha, ponha a nova, leia a frase de novo. Continua dizendo a mesma coisa?',
 visual:'<p class="vx">FOI O MAIS <b class="mk">VELOZ</b>. ELE <span class="mk">CRUZOU A LINHA DE CHEGADA BEM ANTES</span>...</p>'+
        '<p class="vx">FOI O MAIS <b class="mk">R&Aacute;PIDO</b> <span class="dm">&mdash; continua dizendo a mesma coisa</span></p>'+
        '<p class="vx">FOI O MAIS <b class="bad2">DEVAGAR</b> <span class="dm">&mdash; briga com chegar na frente</span></p>'+
        '<p class="vx">FOI O MAIS <b class="bad2">FORTE</b> <span class="dm">&mdash; fala de for&ccedil;a, e a pista fala de chegar antes</span></p>',
 porque:'A frase seguinte explica a palavra: ele CRUZOU A LINHA DE CHEGADA BEM ANTES DO SEGUNDO COLOCADO. Quem chega bem antes é quem corre mais depressa. VELOZ quer dizer RÁPIDO.',
 proximo:'Ache no texto a linha que fala da palavra difícil. Depois pergunte de cada alternativa: ela fala dessa mesma coisa?'},

{id:'TR66', eixo:'intruso', origem:'Treino no estilo da prova',
 enun:'NO RECREIO, A TURMA BRINCAVA DE ADIVINHAR UMA PALAVRA SECRETA. A TIA FOI DANDO AS PISTAS UMA POR UMA:',
 quadro:'A PALAVRA TEM TR&Ecirc;S S&Iacute;LABAS.<div class="sep"></div>COME&Ccedil;A COM A LETRA C.<div class="sep"></div>&Eacute; UM BICHO.<div class="sep"></div>N&Atilde;O SABE VOAR.',
 pede:'QUAL É A PALAVRA SECRETA?',
 opts:[
  {t:'CABRA.', no:'Bata palma em CABRA: CA-BRA, dois pedaços. A primeira pista pede três, e ela cai logo ali.'},
  {t:'CADEIRA.', no:'Cadeira não é bicho: é onde a gente senta. Ela passa nas duas primeiras pistas e cai na terceira.'},
  {t:'CAVALO.', ok:1},
  {t:'CORUJA.', no:'A coruja voa. A quarta pista pede um bicho que não voa, e ela cai ali. Ela passa nas três primeiras pistas: é a armadilha para quem para antes do fim.'}
 ],
 dica:'São quatro pistas. Uma pista de cada vez: a cada pista, risque quem não passa. Quem sobrar no fim é a resposta.',
 truque:'Uma pista de cada vez. A cada pista, risque quem não passa. Quem sobrar é a resposta.',
 visual:'<div class="pcs"><span class="pc">CA</span><span class="pc">VA</span><span class="pc">LO</span><span class="arw">&rarr;</span><span class="pc hit">3 peda&ccedil;os</span></div>'+
        '<p class="vx">come&ccedil;a com C <b>sim</b> &middot; &eacute; bicho <b>sim</b> &middot; sabe voar <b>n&atilde;o</b> &mdash; passou nas quatro.</p>'+
        '<div class="pcs"><span class="pc bad">CA BRA</span><span class="arw">&rarr;</span><span class="pc bad">2 peda&ccedil;os</span></div>'+
        '<div class="pcs"><span class="pc bad">CADEIRA</span><span class="arw">&rarr;</span><span class="pc bad">n&atilde;o &eacute; bicho</span></div>'+
        '<div class="pcs"><span class="pc bad">CORUJA</span><span class="arw">&rarr;</span><span class="pc bad">voa</span></div>',
 porque:'CAVALO passa nas quatro pistas ao mesmo tempo: CA-VA-LO tem três pedaços, começa com C, é bicho e não voa. CORUJA passa em três pistas e cai na quarta.',
 proximo:'Escreva as quatro alternativas no papel e risque uma a cada pista. Só marque depois de usar a última pista.'},
