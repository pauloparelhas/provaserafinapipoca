/* ============================================================
   reserva_treino_A.js — BLOCO DE ITENS AUTORAIS DE TREINO
   Olimpíada de Português · Categoria G · 2º ano · 12 questões

   ATENÇÃO — ESTAS QUESTÕES NÃO SÃO DE PROVA.
   Nenhuma delas caiu em 2023, 2024 ou 2025. São exercícios ESCRITOS
   AQUI, no molde da prova, e por isso o campo `origem` de todas é
   exatamente 'Treino no estilo da prova' — sem ano, sem fase, sem
   número de questão. Se algum dia alguém precisar separar o que é
   prova de verdade do que é treino, é esse campo que decide.

   POR QUE EXISTEM: o banco de produção (ferramentas/OP_data.js) é
   fiel às provas oficiais, e por isso ele herda a escassez delas em
   três tipos que a prova USA e cobra, mas em doses pequenas:
     - `codigo`   — 1 item real no banco (2025 F1 Q15)
     - `placa`    — 0 itens (a 2025 F1 Q4 vive só no cartão de truque,
                    porque as quatro placas SÃO as alternativas)
     - `alfabeto` — 3 itens (2025 F1 Q1 e Q5, 2024 F1 Q1)
   Sem volume de treino nesses três, a criança chega na prova tendo
   visto o formato uma vez só. Daí 4 + 4 + 4.

   COMO FORAM CONSTRUÍDAS (assinatura da banca, DOSSIE_2024.md e
   DOSSIE_2025.md, seções PADRÃO OBSERVADO):
   - duas etapas encadeadas, nunca uma operação só;
   - o distrator passa em quase todos os critérios e cai em UM;
   - uma letra ou uma sílaba de diferença decide (GALO × GALHO,
     SAPO × PATO, CHUVA que só quebra na última letra);
   - o enunciado explica a regra em linguagem de criança antes de cobrar;
   - vocabulário difícil só nos distratores, nunca na resposta certa.

   AS TABELAS DE CÓDIGO ESTÃO EMBARALHADAS DE PROPÓSITO. Em TR01,
   TR02, TR03 e TR04, ler a linha de baixo da tabela da esquerda para
   a direita dá só uma sequência sem sentido (GA COM TEM CA TO QUEM
   ÇA NÃO CÃO, por exemplo). A criança é obrigada a caçar símbolo por
   símbolo, que é o que o truque promete. Cada sequência foi
   decodificada símbolo a símbolo e conferida contra o gabarito.

   TRUQUES: nenhum truque novo foi inventado. Cada item repete, palavra
   por palavra, uma frase que JÁ existe no banco:
   - codigo (TR01-TR04) e placa (TR05-TR08): a frase da própria família
     em FAMILIAS;
   - alfabeto: TR09 usa a frase da família em FAMILIAS (lista com
     buraco); TR10 usa a frase de 24F1Q1 (letras em ordem dentro da
     palavra); TR11 e TR12 usam a frase de 25F1Q1 (charada em verso).
     A frase da família fala de buraco na lista e não serviria para
     charada nem para palavra — por isso a variante já existente no
     banco, e não uma frase nova.

   AS PLACAS VÊM DESCRITAS EM PALAVRAS. Na prova elas são desenhadas.
   Como aqui não há desenho, cada alternativa descreve a placa por
   inteiro (forma, cor, barra, o que está dentro) e a adaptação está
   declarada no campo `nota`, igual ao que 24F1Q3 e 24F1Q11 fazem.
   Só entraram placas que a criança de 7 anos vê na rua e que dá para
   descrever honestamente: proibição de círculo cortado, banheiro,
   faixa de pedestres, aviso de perigo.

   COLAR: dentro da lista ITENS existente, antes da sentinela {id:'FIM'}.
   Não traz window.OP nem função em volta.
   ============================================================ */

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
