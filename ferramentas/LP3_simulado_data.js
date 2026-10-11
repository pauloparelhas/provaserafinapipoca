/* ============================================================
   LP3_simulado_data.js — BANCO DO SIMULADO de Português · 3º tri · Y2
   AF de Língua Portuguesa em 14/10/2026.

   FONTE: trabalho/3tri_portugues/_roteiro.md (Unidades 4 e 5 do
   informativo "Conteúdos das AFs - 3 Tri"). Banco INÉDITO, no formato
   de prova escolar de 2º ano. Nada do livro "Invenções" da escola (não
   foi fornecido). Respeitadas as notas "Evitar como pergunta" do roteiro:
   sempre "o caçador"; nada do que o lobo fez com a vovó em detalhe; nada
   de fala exata do gigante nem de quantas vezes João subiu; nenhum
   plural em ÃES/ÃOS como pergunta.

   MESMO FORMATO do OP_data.js, para o componente único OP_questao.js
   funcionar sem nenhuma mudança:
     id, eixo, origem, enun, texto[], quadro, pede, opts[{t, ok|no}],
     dica, truque, visual, porque, proximo
   - enun, pede, texto, quadro e alternativas em CAIXA ALTA, como na prova;
   - truque, porque, dica, `no` e proximo em letra normal: é a voz de quem
     ensina, não a da prova.
   - `truque` e `origem` vêm da FAMÍLIA (preenchidos no fim do arquivo):
     a frase do truque é a mesma em todo item da família, de propósito.
   - Distrator INDEFENSÁVEL: nenhuma alternativa errada pode ser defendida
     como certa. Toda questão tem exatamente uma resposta.
   Validação: node trabalho/3tri_portugues/... (ver relatório do QA).
   ============================================================ */
window.LP3S = (function(){

/* ---------- AS 12 FAMÍLIAS = os 12 temas do roteiro ----------
   `cota` = quantas entram na "Prova inteira" (12): uma de cada tema, para
   cobrir TODOS os conteúdos da AF em cada rodada.                      */
var FAMILIAS = [
  {k:'conto',   nome:'Contos de fadas',        cota:1, cor:'#f472b6',
   truque:'Conto de fadas tem: Era uma vez, mocinho e vilão, magia, um problema e um final feliz.'},
  {k:'chapeu',  nome:'Chapeuzinho Vermelho',   cota:1, cor:'#ef4444',
   truque:'Conte a história na ordem: cesta, conselho da mãe, lobo, atalho, disfarce, olhos grandes, caçador.'},
  {k:'joao',    nome:'João e o pé de feijão',  cota:1, cor:'#22c55e',
   truque:'Conte a história na ordem: vaca, feijões mágicos, janela, pé de feijão, castelo, galinha, machado.'},
  {k:'parodia', nome:'Paráfrase e paródia',    cota:1, cor:'#a78bfa',
   truque:'Mudou o que acontece? Não: paráfrase. Sim, de propósito: paródia.'},
  {k:'h',       nome:'Letra H',                cota:1, cor:'#38bdf8',
   truque:'O H do começo não tem som, mas está lá. Lembre: HOJE, HORA, HOMEM.'},
  {k:'jg',      nome:'J ou G',                 cota:1, cor:'#fbbf24',
   truque:'JA, JO, JU: sempre J. Com E e I, pode ser J ou G: lembre como a palavra se escreve.'},
  {k:'ggu',     nome:'G ou GU',                cota:1, cor:'#fb923c',
   truque:'GA, GO, GU: só o G. Antes de E e I, para soar guê, entra o U quietinho: GUE, GUI.'},
  {k:'dic',     nome:'Dicionário',             cota:1, cor:'#60a5fa',
   truque:'No dicionário vale a ordem do alfabeto. Primeira letra igual? Olhe a segunda.'},
  {k:'invento', nome:'Invenções e descobertas',cota:1, cor:'#facc15',
   truque:'Invenção: alguém criou, não existia antes. Descoberta: já existia, alguém achou.'},
  {k:'cqu',     nome:'CA CO CU · QUE QUI',     cota:1, cor:'#34d399',
   truque:'CA, CO, CU: só o C. Antes de E e I, o som de quê vira QUE, QUI, com o U quietinho.'},
  {k:'dig',     nome:'CH · NH · LH',           cota:1, cor:'#2dd4bf',
   truque:'CH, NH, LH: duas letras, um som só. Uma letra a mais muda a palavra.'},
  {k:'plural',  nome:'Plural',                 cota:1, cor:'#f87171',
   truque:'Vogal: põe S. R ou Z: põe ES. ÃO vira ÕES. L vira IS. M vira NS.'}
];

/* textos de apoio usados por mais de uma questão */
var TX_CHAPEU = [
  'UMA MENINA USAVA UMA CAPA COM CAPUZ VERMELHO.',
  'POR ISSO, TODOS A CHAMAVAM DE CHAPEUZINHO VERMELHO.',
  'UM DIA, A MÃE PEDIU QUE ELA LEVASSE UMA CESTA',
  'COM DOCES PARA A VOVÓ, QUE ESTAVA DOENTE.',
  '— NÃO SAIA DO CAMINHO E NÃO CONVERSE COM ESTRANHOS! — AVISOU A MÃE.',
  'NA FLORESTA, CHAPEUZINHO ENCONTROU O LOBO MAU',
  'E CONTOU PARA ELE AONDE IA.'
];
var TX_JOAO = [
  'JOÃO E A MÃE ERAM POBRES. SÓ TINHAM UMA VACA.',
  'A MÃE MANDOU JOÃO VENDER A VACA,',
  'MAS ELE TROCOU A VACA POR FEIJÕES MÁGICOS.',
  'A MÃE FICOU BRAVA E JOGOU OS FEIJÕES PELA JANELA.',
  'DE NOITE, NASCEU UM PÉ DE FEIJÃO GIGANTE,',
  'QUE SUBIA ATÉ AS NUVENS.'
];
var TX_PARODIA = [
  'ERA UMA VEZ UMA MENINA CHAMADA CHAPEUZINHO AZUL.',
  'ELA FOI DE PATINETE LEVAR SORVETE PARA O VOVÔ.',
  'NO CAMINHO, ENCONTROU UM LOBO QUE SÓ COMIA SALADA.'
];
var TX_INVENTO = [
  'AS PESSOAS INVENTAM COISAS PARA RESOLVER PROBLEMAS',
  'E FACILITAR A VIDA. A LÂMPADA, POR EXEMPLO, ILUMINA A NOITE.',
  'O BRASILEIRO SANTOS DUMONT É CONHECIDO COMO O PAI DA AVIAÇÃO.',
  'ELE CRIOU O 14-BIS.',
  'JÁ O FOGO NÃO FOI INVENTADO: ELE JÁ EXISTIA NA NATUREZA.',
  'ENCONTRAR ALGO QUE JÁ EXISTIA É UMA DESCOBERTA.'
];

var ITENS = [

/* ======================= CONTOS DE FADAS ======================= */
{id:'SCO1', eixo:'conto',
 pede:'QUAL DESTES COMEÇOS É DE UM CONTO DE FADAS?',
 opts:[
  {t:'ERA UMA VEZ UM MENINO QUE MORAVA COM A MÃE E UMA VACA.', ok:1},
  {t:'HOJE CHOVEU MUITO NA CIDADE E AS RUAS FICARAM CHEIAS DE ÁGUA.', no:'Isso é notícia: conta uma coisa que aconteceu de verdade, hoje. Conto de fadas é história inventada.'},
  {t:'PARA FAZER O BOLO, MISTURE A FARINHA COM OS OVOS.', no:'Isso é receita: ensina a fazer um bolo. Não conta história nenhuma.'},
  {t:'QUERIDA VOVÓ, ESTOU COM SAUDADE. UM BEIJO!', no:'Isso é um bilhete para a vovó. Não é história.'}
 ],
 dica:'Procure o jeito mais famoso de começar uma história de fadas.',
 visual:'<div class="pcs"><span class="pc hit">ERA UMA VEZ...</span><span class="arw">&rarr;</span><span class="pc hit">conto de fadas</span></div>',
 porque:'"Era uma vez..." é o começo dos contos de fadas. As outras são notícia, receita e bilhete.',
 proximo:'Procure as marcas do conto: Era uma vez, magia, vilão, final feliz.'},

{id:'SCO2', eixo:'conto',
 quadro:'E VIVERAM <span class="bl">________</span> PARA SEMPRE.',
 pede:'QUE PALAVRA COMPLETA O FINAL MAIS CONHECIDO DOS CONTOS DE FADAS?',
 opts:[
  {t:'TRISTES', no:'Conto de fadas costuma ter final feliz. "Tristes para sempre" não é o final dos contos.'},
  {t:'FELIZES', ok:1},
  {t:'CANSADOS', no:'Ninguém termina um conto de fadas assim. O final conhecido é feliz.'},
  {t:'BRAVOS', no:'Bravo é o vilão, não o final da história. O final conhecido é feliz.'}
 ],
 dica:'O final dos contos de fadas costuma ser bom para o mocinho.',
 porque:'O final mais conhecido dos contos de fadas é: "e viveram felizes para sempre".',
 proximo:'Lembre: começo = Era uma vez; fim = felizes para sempre.'},

{id:'SCO3', eixo:'conto',
 pede:'QUAL PAR MOSTRA UM MOCINHO E UM VILÃO DA MESMA HISTÓRIA?',
 opts:[
  {t:'JOÃO E O LOBO MAU', no:'O Lobo Mau é vilão, mas da história da Chapeuzinho, não da história do João.'},
  {t:'CHAPEUZINHO VERMELHO E O GIGANTE', no:'O Gigante é vilão da história do João. Na história da Chapeuzinho, o vilão é o Lobo Mau.'},
  {t:'CHAPEUZINHO VERMELHO E O LOBO MAU', ok:1},
  {t:'JOÃO E O CAÇADOR', no:'O caçador não é vilão: ele salva a Chapeuzinho. E nem é da história do João.'}
 ],
 dica:'Pense em cada história separada: quem é o mocinho e quem é o vilão de cada uma?',
 visual:'<div class="pcs"><span class="pc hit">CHAPEUZINHO</span><span class="arw">&times;</span><span class="pc hit">LOBO MAU</span></div>'+
        '<div class="pcs"><span class="pc">JOÃO</span><span class="arw">&times;</span><span class="pc">GIGANTE</span></div>',
 porque:'Chapeuzinho é a mocinha e o Lobo Mau é o vilão da mesma história. João e o Gigante também formariam um par, mas não aparecem juntos em nenhuma alternativa.',
 proximo:'Confira as DUAS partes da resposta: os dois têm de ser da mesma história.'},

{id:'SCO4', eixo:'conto',
 pede:'EM QUAL FRASE APARECE MAGIA?',
 opts:[
  {t:'A MENINA LEVOU UMA CESTA DE DOCES.', no:'Levar uma cesta de doces é coisa que acontece de verdade. Não tem magia.'},
  {t:'A MÃE ABRIU A JANELA.', no:'Abrir a janela é comum, acontece todo dia. Não tem magia.'},
  {t:'O MENINO SUBIU NA ÁRVORE.', no:'Subir numa árvore é coisa de verdade. Não tem magia.'},
  {t:'A HARPA CANTAVA SOZINHA.', ok:1}
 ],
 dica:'Mágico é o que não acontece de verdade.',
 porque:'Harpa de verdade não canta sozinha. A harpa que canta é um elemento mágico do conto de fadas.',
 proximo:'Pergunte: isso pode acontecer de verdade? Se não pode, é magia.'},

{id:'SCO5', eixo:'conto',
 pede:'QUAL DESTES LUGARES APARECE MUITO NOS CONTOS DE FADAS?',
 opts:[
  {t:'O SUPERMERCADO', no:'Nas histórias da Chapeuzinho e do João não tem supermercado.'},
  {t:'O CASTELO', ok:1},
  {t:'O AEROPORTO', no:'Nas histórias da Chapeuzinho e do João não tem aeroporto.'},
  {t:'A ESTAÇÃO DE METRÔ', no:'Nas histórias da Chapeuzinho e do João não tem estação de metrô.'}
 ],
 dica:'Lembre onde morava o Gigante.',
 porque:'Floresta e castelo são lugares dos contos de fadas. O Gigante morava num castelo nas nuvens.',
 proximo:'Pense nos lugares das histórias que você conhece: floresta, castelo, casa da vovó.'},

{id:'SCO6', eixo:'conto',
 pede:'O QUE É UM CONTO DE FADAS?',
 opts:[
  {t:'UMA NOTÍCIA DE JORNAL SOBRE O QUE ACONTECEU ONTEM.', no:'Notícia conta o que aconteceu de verdade. Conto de fadas é inventado.'},
  {t:'UMA LISTA DE COMPRAS DO MERCADO.', no:'Lista de compras não conta história nenhuma.'},
  {t:'UMA HISTÓRIA INVENTADA, CONTADA DE GERAÇÃO EM GERAÇÃO.', ok:1},
  {t:'UMA RECEITA PARA FAZER BOLO.', no:'Receita ensina a fazer comida. Não conta história.'}
 ],
 dica:'Conto de fadas é uma história. Ela aconteceu de verdade ou foi inventada?',
 porque:'Conto de fadas é uma história inventada, que os avós contaram para os pais, e os pais contam para os filhos.',
 proximo:'Separe: história inventada (conto) de texto que informa ou ensina (notícia, receita, lista).'},

{id:'SCO7', eixo:'conto',
 pede:'NA HISTÓRIA "JOÃO E O PÉ DE FEIJÃO", QUAL É O PROBLEMA E COMO ELE É RESOLVIDO?',
 opts:[
  {t:'O LOBO ENGANA A MENINA, E O GIGANTE SALVA TODOS.', no:'Lobo e menina são da história da Chapeuzinho. E o Gigante não salva ninguém: ele é o vilão.'},
  {t:'A VACA FOGE, E A MÃE COMPRA OUTRA.', no:'A vaca não foge: João troca a vaca por feijões. E a mãe não compra outra.'},
  {t:'JOÃO SE PERDE NA FLORESTA, E O CAÇADOR O ENCONTRA.', no:'O caçador é da história da Chapeuzinho. João não se perde na floresta.'},
  {t:'O GIGANTE DESCE ATRÁS DE JOÃO, E JOÃO CORTA O PÉ DE FEIJÃO.', ok:1}
 ],
 dica:'Qual é o perigo do fim da história? E o que João faz?',
 porque:'O perigo é o Gigante descendo atrás de João. João resolve cortando o pé de feijão com o machado.',
 proximo:'Problema = o perigo. Solução = o que alguém faz para acabar com ele.'},

/* ======================= CHAPEUZINHO VERMELHO ======================= */
{id:'SCH1', eixo:'chapeu', enun:'LEIA O TEXTO:', texto:TX_CHAPEU,
 pede:'POR QUE A MENINA ERA CHAMADA DE CHAPEUZINHO VERMELHO?',
 opts:[
  {t:'PORQUE A VOVÓ ESTAVA DOENTE.', no:'A vovó doente está no texto, mas explica para onde ia a cesta, não o nome da menina.'},
  {t:'PORQUE USAVA UMA CAPA COM CAPUZ VERMELHO.', ok:1},
  {t:'PORQUE MORAVA NA FLORESTA.', no:'O texto não diz que ela morava na floresta. Ela passou pela floresta.'},
  {t:'PORQUE LEVAVA DOCES NA CESTA.', no:'Os doces estão no texto, mas não explicam o nome dela.'}
 ],
 dica:'A resposta está nas duas primeiras linhas do texto. Procure a palavra POR ISSO.',
 visual:'<p class="vx"><span class="mk">USAVA UMA CAPA COM CAPUZ VERMELHO</span> &rarr; <b>POR ISSO</b> &rarr; CHAPEUZINHO VERMELHO</p>',
 porque:'O texto diz: ela usava uma capa com capuz vermelho; POR ISSO a chamavam de Chapeuzinho Vermelho.',
 proximo:'Pergunta com POR QUE? Procure no texto a palavra POR ISSO ou PORQUE.'},

{id:'SCH2', eixo:'chapeu', enun:'LEIA O TEXTO:', texto:TX_CHAPEU,
 pede:'O QUE A MÃE AVISOU?',
 opts:[
  {t:'CORRER BEM RÁPIDO PELA FLORESTA.', no:'O texto não fala em correr. A fala da mãe está na linha com travessão.'},
  {t:'CONTAR PARA TODOS AONDE IA.', no:'Foi a Chapeuzinho que contou ao lobo aonde ia, e isso foi um erro. A mãe pediu o contrário: não conversar com estranhos.'},
  {t:'DEIXAR A CESTA NA FLORESTA.', no:'A cesta era para a vovó. O texto não manda deixar a cesta na floresta.'},
  {t:'NÃO SAIR DO CAMINHO E NÃO CONVERSAR COM ESTRANHOS.', ok:1}
 ],
 dica:'Procure a linha que começa com o travessão (—): é a fala da mãe.',
 visual:'<p class="vx"><span class="mk">— NÃO SAIA DO CAMINHO E NÃO CONVERSE COM ESTRANHOS!</span> — AVISOU A MÃE.</p>',
 porque:'A fala da mãe, depois do travessão, é: "Não saia do caminho e não converse com estranhos!".',
 proximo:'Quando a pergunta é o que alguém DISSE, procure o travessão (—) no texto.'},

{id:'SCH3', eixo:'chapeu', enun:'LEIA O TEXTO:', texto:TX_CHAPEU,
 pede:'PARA QUEM ERAM OS DOCES DA CESTA?',
 opts:[
  {t:'PARA A MÃE.', no:'A mãe deu a cesta. Os doces não eram para ela.'},
  {t:'PARA O LOBO MAU.', no:'O lobo apareceu no caminho, mas a cesta não era para ele.'},
  {t:'PARA A VOVÓ.', ok:1},
  {t:'PARA A PRÓPRIA CHAPEUZINHO.', no:'Chapeuzinho levava a cesta, mas os doces eram para outra pessoa.'}
 ],
 dica:'Procure no texto a palavra PARA perto da palavra DOCES.',
 visual:'<p class="vx">UMA CESTA COM DOCES <span class="mk">PARA A VOVÓ</span>, QUE ESTAVA DOENTE.</p>',
 porque:'O texto diz: uma cesta com doces para a vovó, que estava doente.',
 proximo:'Ache no texto a palavra que a pergunta usa (DOCES) e leia a linha inteira.'},

{id:'SCH4', eixo:'chapeu',
 quadro:'— VOVÓ, QUE ORELHAS GRANDES VOCÊ TEM!<br>— É PARA TE <span class="bl">________</span> MELHOR!',
 pede:'QUE PALAVRA COMPLETA A RESPOSTA DO LOBO?',
 opts:[
  {t:'VER', no:'VER é a resposta sobre os OLHOS grandes. Aqui a fala é sobre as ORELHAS.'},
  {t:'OUVIR', ok:1},
  {t:'COMER', no:'COMER é a resposta sobre a BOCA grande. Aqui a fala é sobre as ORELHAS.'},
  {t:'ABRAÇAR', no:'O lobo não fala em abraçar. Orelhas servem para ouvir.'}
 ],
 dica:'Para que servem as orelhas?',
 visual:'<div class="pcs"><span class="pc">OLHOS</span><span class="arw">&rarr;</span><span class="pc">VER</span></div>'+
        '<div class="pcs"><span class="pc hit">ORELHAS</span><span class="arw">&rarr;</span><span class="pc hit">OUVIR</span></div>'+
        '<div class="pcs"><span class="pc">BOCA</span><span class="arw">&rarr;</span><span class="pc">COMER</span></div>',
 porque:'Orelhas grandes: "é para te ouvir melhor!". Olhos: ver. Boca: comer.',
 proximo:'Ligue a parte do corpo ao que ela faz: olhos veem, orelhas ouvem, boca come.'},

{id:'SCH5', eixo:'chapeu',
 pede:'QUAL É A ORDEM CERTA DOS FATOS?',
 opts:[
  {t:'O CAÇADOR SALVA AS DUAS → O LOBO VAI PELO ATALHO → O LOBO SE DISFARÇA DE VOVÓ.', no:'O caçador é o fim da história, não o começo.'},
  {t:'O LOBO SE DISFARÇA DE VOVÓ → O LOBO VAI PELO ATALHO → O CAÇADOR SALVA AS DUAS.', no:'O lobo só pode se disfarçar depois de chegar à casa da vovó, e ele chega pelo atalho.'},
  {t:'O LOBO VAI PELO ATALHO → O LOBO SE DISFARÇA DE VOVÓ → O CAÇADOR SALVA AS DUAS.', ok:1},
  {t:'O LOBO VAI PELO ATALHO → O CAÇADOR SALVA AS DUAS → O LOBO SE DISFARÇA DE VOVÓ.', no:'O caçador salva as duas no fim. Depois disso o lobo não se disfarça mais.'}
 ],
 dica:'Primeiro o lobo precisa chegar à casa da vovó. O caçador aparece por último.',
 visual:'<div class="pcs"><span class="pc hit">1. ATALHO</span><span class="arw">&rarr;</span><span class="pc hit">2. DISFARCE</span><span class="arw">&rarr;</span><span class="pc hit">3. CAÇADOR</span></div>',
 porque:'O lobo vai pelo atalho e chega antes; depois se disfarça de vovó e deita na cama; no fim, o caçador salva as duas.',
 proximo:'Conte a história com o dedo: o que vem primeiro, o que vem depois, o que vem no fim.'},

{id:'SCH6', eixo:'chapeu',
 pede:'O LOBO CHEGOU PRIMEIRO À CASA DA VOVÓ PORQUE...',
 opts:[
  {t:'FOI POR UM ATALHO.', ok:1},
  {t:'PEGOU CARONA COM O CAÇADOR.', no:'O caçador só aparece no fim, para salvar as duas. Ele não deu carona ao lobo.'},
  {t:'A VOVÓ FOI BUSCÁ-LO NA FLORESTA.', no:'A vovó estava doente, em casa. Ela não foi buscar o lobo.'},
  {t:'DORMIU NA CASA DA VOVÓ NA NOITE ANTERIOR.', no:'Isso não acontece na história. O lobo correu por um caminho mais curto.'}
 ],
 dica:'Atalho é um caminho mais curto.',
 porque:'O lobo foi por um atalho, um caminho mais curto, e chegou antes da Chapeuzinho.',
 proximo:'Lembre a sequência: lobo na floresta, atalho, casa da vovó.'},

{id:'SCH7', eixo:'chapeu',
 pede:'O QUE O CAÇADOR FEZ NA HISTÓRIA?',
 opts:[
  {t:'DEU A CESTA DE DOCES PARA A CHAPEUZINHO.', no:'Quem deu a cesta foi a mãe, no começo da história.'},
  {t:'MOSTROU O ATALHO PARA O LOBO.', no:'O caçador não ajudou o lobo. Ele salvou a Chapeuzinho e a vovó.'},
  {t:'SE DISFARÇOU DE VOVÓ.', no:'Quem se disfarçou de vovó foi o lobo.'},
  {t:'OUVIU, ENTROU NA CASA E SALVOU A CHAPEUZINHO E A VOVÓ.', ok:1}
 ],
 dica:'O caçador aparece no fim da história.',
 porque:'Um caçador ouviu, entrou na casa e salvou a Chapeuzinho e a vovó.',
 proximo:'Para cada personagem, lembre UMA coisa que ele faz: mãe (cesta), lobo (atalho e disfarce), caçador (salva).'},

/* ======================= JOÃO E O PÉ DE FEIJÃO ======================= */
{id:'SJO1', eixo:'joao', enun:'LEIA O TEXTO:', texto:TX_JOAO,
 pede:'O QUE A MÃE MANDOU JOÃO FAZER COM A VACA?',
 opts:[
  {t:'TROCAR POR FEIJÕES MÁGICOS.', no:'Trocar por feijões foi o que JOÃO fez, e a mãe ficou brava com isso. A pergunta é o que a MÃE mandou.'},
  {t:'VENDER.', ok:1},
  {t:'LEVAR PARA O CASTELO.', no:'O texto não fala em levar a vaca para o castelo.'},
  {t:'DAR PARA O GIGANTE.', no:'O Gigante nem aparece neste pedaço do texto.'}
 ],
 dica:'Leia a segunda linha do texto. Cuidado: o que a mãe mandou é diferente do que João fez.',
 visual:'<p class="vx">A MÃE MANDOU JOÃO <span class="mk">VENDER A VACA</span>,</p><p class="vx">MAS ELE <span class="dm">TROCOU A VACA POR FEIJÕES</span>.</p>',
 porque:'O texto diz: "A mãe mandou João vender a vaca, mas ele trocou a vaca por feijões mágicos". Vender foi o pedido da mãe.',
 proximo:'Veja de QUEM a pergunta fala. A mãe mandou uma coisa; João fez outra.'},

{id:'SJO2', eixo:'joao', enun:'LEIA O TEXTO:', texto:TX_JOAO,
 pede:'POR QUE A MÃE JOGOU OS FEIJÕES PELA JANELA?',
 opts:[
  {t:'PORQUE QUERIA PLANTAR UM PÉ DE FEIJÃO.', no:'A mãe não sabia que ia nascer um pé de feijão. Ela jogou os feijões fora.'},
  {t:'PORQUE OS FEIJÕES ESTAVAM ESTRAGADOS.', no:'O texto não diz que os feijões estavam estragados. Eles eram mágicos.'},
  {t:'PORQUE O GIGANTE PEDIU.', no:'O Gigante nem aparece neste pedaço do texto.'},
  {t:'PORQUE FICOU BRAVA COM A TROCA.', ok:1}
 ],
 dica:'Leia a linha em que aparece a palavra JANELA. Como a mãe estava?',
 visual:'<p class="vx">A MÃE <span class="mk">FICOU BRAVA</span> E JOGOU OS FEIJÕES PELA JANELA.</p>',
 porque:'João trocou a vaca, que era tudo o que a família tinha, por feijões. A mãe ficou brava e jogou os feijões pela janela.',
 proximo:'Para responder POR QUE, procure no texto o que aconteceu logo antes.'},

{id:'SJO3', eixo:'joao', enun:'LEIA O TEXTO:', texto:TX_JOAO,
 pede:'ATÉ ONDE SUBIA O PÉ DE FEIJÃO?',
 opts:[
  {t:'ATÉ O TELHADO.', no:'Era um pé de feijão GIGANTE: subia muito mais alto que o telhado.'},
  {t:'ATÉ AS NUVENS.', ok:1},
  {t:'ATÉ A JANELA.', no:'A janela aparece no texto, mas é por onde a mãe jogou os feijões.'},
  {t:'ATÉ O TOPO DA ÁRVORE.', no:'O texto não fala em árvore. Leia a última linha.'}
 ],
 dica:'A resposta está na última linha do texto.',
 visual:'<p class="vx">QUE SUBIA ATÉ <span class="mk">AS NUVENS</span>.</p>',
 porque:'O texto diz: "nasceu um pé de feijão gigante, que subia até as nuvens".',
 proximo:'A resposta mora no texto: ache a linha que tem a palavra da pergunta (SUBIA).'},

{id:'SJO4', eixo:'joao',
 pede:'O QUE JOÃO LEVOU DO CASTELO DO GIGANTE?',
 opts:[
  {t:'A VACA DA FAMÍLIA.', no:'A vaca foi trocada por feijões no começo da história. Ela nem foi ao castelo.'},
  {t:'A CESTA DE DOCES DA VOVÓ.', no:'A cesta de doces é da história da Chapeuzinho.'},
  {t:'A GALINHA DOS OVOS DE OURO.', ok:1},
  {t:'UM LOBO QUE FALAVA.', no:'O lobo que fala é da história da Chapeuzinho.'}
 ],
 dica:'Era um animal mágico, que botava ovos muito valiosos.',
 porque:'No castelo, João levou a galinha dos ovos de ouro (e, depois, a harpa mágica).',
 proximo:'Cuidado com o que é de OUTRA história: cesta e lobo são da Chapeuzinho.'},

{id:'SJO5', eixo:'joao',
 pede:'O QUE ACONTECEU LOGO DEPOIS QUE O GIGANTE ACORDOU?',
 opts:[
  {t:'ELE DESCEU ATRÁS DE JOÃO.', ok:1},
  {t:'JOÃO TROCOU A VACA POR FEIJÕES.', no:'A troca da vaca é o começo da história, muito antes de o Gigante acordar.'},
  {t:'A MÃE JOGOU OS FEIJÕES PELA JANELA.', no:'Isso aconteceu no começo, antes de nascer o pé de feijão.'},
  {t:'NASCEU O PÉ DE FEIJÃO.', no:'O pé de feijão nasceu antes: foi por ele que João subiu até o castelo.'}
 ],
 dica:'O Gigante acorda quase no fim da história.',
 visual:'<div class="pcs"><span class="pc">FEIJÕES</span><span class="arw">&rarr;</span><span class="pc">PÉ DE FEIJÃO</span><span class="arw">&rarr;</span><span class="pc">CASTELO</span><span class="arw">&rarr;</span><span class="pc">GIGANTE ACORDA</span><span class="arw">&rarr;</span><span class="pc hit">DESCE ATRÁS</span></div>',
 porque:'O Gigante acordou e desceu atrás de João. As outras alternativas aconteceram no começo da história.',
 proximo:'LOGO DEPOIS quer dizer o fato seguinte. Ache o fato da pergunta e ande um passo.'},

{id:'SJO6', eixo:'joao',
 pede:'COMO A HISTÓRIA "JOÃO E O PÉ DE FEIJÃO" TERMINA?',
 opts:[
  {t:'O GIGANTE PEGA JOÃO E O LEVA PARA O CASTELO.', no:'O Gigante não pega João. Quem cai no fim é o Gigante.'},
  {t:'JOÃO DEVOLVE A GALINHA E PEDE DESCULPAS.', no:'Isso não acontece na história.'},
  {t:'A VACA VOLTA E OS FEIJÕES SOMEM.', no:'A vaca não volta. Isso não acontece na história.'},
  {t:'JOÃO CORTA O PÉ DE FEIJÃO, O GIGANTE CAI, E JOÃO E A MÃE VIVEM FELIZES.', ok:1}
 ],
 dica:'Lembre o que João pegou para cortar o pé de feijão.',
 porque:'João pegou o machado e cortou o pé de feijão; o Gigante caiu; João e a mãe viveram felizes, sem passar necessidade.',
 proximo:'O fim dos contos de fadas costuma ser feliz para o mocinho.'},

{id:'SJO7', eixo:'joao',
 pede:'QUAL DESTES É UM OBJETO MÁGICO DA HISTÓRIA DE JOÃO?',
 opts:[
  {t:'A CESTA DE DOCES', no:'A cesta é da história da Chapeuzinho, e não é mágica.'},
  {t:'A HARPA MÁGICA', ok:1},
  {t:'A CAPA VERMELHA', no:'A capa vermelha é da Chapeuzinho, e não é mágica.'},
  {t:'A CAMA DA VOVÓ', no:'A cama é da casa da vovó, na história da Chapeuzinho. Não é mágica.'}
 ],
 dica:'Na história do João tem feijões mágicos, a galinha dos ovos de ouro e...',
 porque:'Os objetos mágicos da história do João são os feijões mágicos, a galinha dos ovos de ouro e a harpa mágica.',
 proximo:'Separe as duas histórias: cesta, capa e cama são da Chapeuzinho.'},

/* ======================= PARÁFRASE E PARÓDIA ======================= */
{id:'SPA1', eixo:'parodia',
 quadro:'ORIGINAL: JOÃO TROCOU A VACA POR FEIJÕES MÁGICOS.<div class="sep"></div>NOVO: O MENINO DEU A VACA EM TROCA DE UNS FEIJÕES MÁGICOS.',
 pede:'O TEXTO NOVO É...',
 opts:[
  {t:'UMA PARÁFRASE, PORQUE CONTA A MESMA COISA COM OUTRAS PALAVRAS.', ok:1},
  {t:'UMA PARÓDIA, PORQUE MUDOU O QUE ACONTECE NA HISTÓRIA.', no:'Nada mudou no que acontece: a vaca continua sendo trocada por feijões mágicos.'},
  {t:'UMA PARÓDIA, PORQUE FICOU ENGRAÇADO.', no:'O texto novo não mudou nada de propósito, e não tem nada engraçado nele.'},
  {t:'UM VERBETE DE DICIONÁRIO.', no:'Verbete é a palavra explicada no dicionário. Aqui é um pedaço de história.'}
 ],
 dica:'Compare as duas frases: o que acontece mudou?',
 visual:'<div class="pcs"><span class="pc">JOÃO</span><span class="arw">=</span><span class="pc hit">O MENINO</span></div>'+
        '<div class="pcs"><span class="pc">TROCOU A VACA POR</span><span class="arw">=</span><span class="pc hit">DEU A VACA EM TROCA DE</span></div>',
 porque:'Mudaram só as palavras: João virou "o menino", "trocou" virou "deu em troca". O que acontece é o mesmo. Isso é paráfrase.',
 proximo:'Pergunte sempre: mudou o que acontece? Não mudou, é paráfrase.'},

{id:'SPA2', eixo:'parodia', enun:'LEIA O TEXTO:', texto:TX_PARODIA,
 pede:'ESSE TEXTO É UMA PARÓDIA DE QUAL HISTÓRIA?',
 opts:[
  {t:'JOÃO E O PÉ DE FEIJÃO', no:'No texto não tem vaca, feijão nem Gigante. Tem uma menina, um lobo e uma visita a alguém da família.'},
  {t:'CHAPEUZINHO VERMELHO', ok:1},
  {t:'OS TRÊS PORQUINHOS', no:'No texto não tem porquinhos. Tem uma menina, um lobo e uma visita.'},
  {t:'NENHUMA, PORQUE NÃO DÁ PARA RECONHECER', no:'Na paródia sempre dá para reconhecer a original. Chapeuzinho + lobo + visita ao avô: é a Chapeuzinho Vermelho.'}
 ],
 dica:'Uma menina com "Chapeuzinho" no nome, um lobo e uma visita... lembra qual história?',
 visual:'<p class="vx"><span class="mk">CHAPEUZINHO</span> AZUL · <span class="mk">LOBO</span> · LEVAR COMIDA PARA O <span class="mk">VOVÔ</span></p>',
 porque:'A menina se chama Chapeuzinho, encontra um lobo no caminho e leva comida para o vovô: dá para reconhecer a Chapeuzinho Vermelho.',
 proximo:'Paródia imita a original. Procure o que ficou igual: é a pista da história original.'},

{id:'SPA3', eixo:'parodia', enun:'LEIA O TEXTO:', texto:TX_PARODIA,
 pede:'O QUE MUDOU EM RELAÇÃO À HISTÓRIA ORIGINAL?',
 opts:[
  {t:'NADA MUDOU: É A MESMA HISTÓRIA.', no:'Mudou muita coisa: a cor do nome, a comida, quem recebe a visita e o lobo.'},
  {t:'SÓ MUDOU O LUGAR: AGORA É NUM CASTELO.', no:'O texto não fala em castelo. E não mudou só uma coisa.'},
  {t:'O NOME DA MENINA CONTINUOU IGUAL, SÓ O LOBO MUDOU.', no:'O nome mudou: de Chapeuzinho VERMELHO para Chapeuzinho AZUL.'},
  {t:'A COR DO NOME, A COMIDA E QUEM RECEBE A VISITA.', ok:1}
 ],
 dica:'Compare com a original: menina de capuz vermelho, doces, vovó.',
 visual:'<div class="pcs"><span class="pc">VERMELHO</span><span class="arw">&rarr;</span><span class="pc bad">AZUL</span></div>'+
        '<div class="pcs"><span class="pc">DOCES</span><span class="arw">&rarr;</span><span class="pc bad">SORVETE</span></div>'+
        '<div class="pcs"><span class="pc">VOVÓ</span><span class="arw">&rarr;</span><span class="pc bad">VOVÔ</span></div>',
 porque:'Vermelho virou azul, doces viraram sorvete e a vovó virou o vovô. Isso foi mudado de propósito: é uma paródia.',
 proximo:'Para achar o que mudou, ponha a original do lado e compare pedaço por pedaço.'},

{id:'SPA4', eixo:'parodia',
 pede:'QUAL FRASE É UMA PARÓDIA DE "JOÃO E O PÉ DE FEIJÃO"?',
 opts:[
  {t:'O MENINO TROCOU A VACA POR FEIJÕES MÁGICOS.', no:'Aqui nada mudou no que acontece: só trocou João por "o menino". É paráfrase.'},
  {t:'JOÃO E A MÃE ERAM POBRES E SÓ TINHAM UMA VACA.', no:'Isso é a própria história original, sem mudança.'},
  {t:'JOÃO TROCOU A VACA POR SEMENTES DE PIPOCA, E O PÉ DE PIPOCA ESTOUROU ATÉ O CÉU.', ok:1},
  {t:'A MENINA DA CAPA VERMELHA LEVOU DOCES PARA A AVÓ.', no:'Essa frase é da história da Chapeuzinho, não da história do João.'}
 ],
 dica:'Paródia muda alguma coisa de propósito, e ainda dá para reconhecer a original.',
 visual:'<div class="pcs"><span class="pc">FEIJÕES MÁGICOS</span><span class="arw">&rarr;</span><span class="pc bad">SEMENTES DE PIPOCA</span></div>',
 porque:'O feijão virou pipoca, de propósito e de um jeito engraçado, mas ainda dá para reconhecer a história do João. É paródia.',
 proximo:'Paródia = imita + muda de propósito. Se só trocou palavras, é paráfrase.'},

{id:'SPA5', eixo:'parodia',
 quadro:'CHAPEUZINHO LEVOU DOCES PARA A VOVÓ.',
 pede:'QUAL FRASE É UMA PARÁFRASE DA FRASE DO QUADRO?',
 opts:[
  {t:'CHAPEUZINHO VERDE FOI DE BICICLETA LEVAR PIZZA PARA O VOVÔ.', no:'Aqui mudaram a cor, a comida e quem recebe: isso é paródia, não paráfrase.'},
  {t:'CHAPEUZINHO COMEU TODOS OS DOCES NO CAMINHO.', no:'Aqui mudou o que acontece: os doces não chegaram à vovó.'},
  {t:'A VOVÓ LEVOU DOCES PARA A CHAPEUZINHO.', no:'Aqui inverteu quem leva e quem recebe. Mudou o que acontece.'},
  {t:'A MENINA DA CAPA VERMELHA FOI ENTREGAR GULOSEIMAS À AVÓ.', ok:1}
 ],
 dica:'Paráfrase: mesma história, outras palavras. Guloseimas são doces.',
 visual:'<div class="pcs"><span class="pc">CHAPEUZINHO</span><span class="arw">=</span><span class="pc hit">A MENINA DA CAPA VERMELHA</span></div>'+
        '<div class="pcs"><span class="pc">DOCES</span><span class="arw">=</span><span class="pc hit">GULOSEIMAS</span></div>',
 porque:'"A menina da capa vermelha" é a Chapeuzinho, "guloseimas" são doces e "avó" é a vovó. Mesma história, outras palavras: paráfrase.',
 proximo:'Troque cada palavra pela parecida e veja se a história continua igual.'},

{id:'SPA6', eixo:'parodia',
 pede:'O QUE É UMA PARÓDIA?',
 opts:[
  {t:'A MESMA HISTÓRIA CONTADA COM OUTRAS PALAVRAS, SEM MUDAR NADA DO QUE ACONTECE.', no:'Isso é a paráfrase. Na paródia, alguma coisa muda de propósito.'},
  {t:'UM TEXTO QUE IMITA UMA HISTÓRIA E MUDA ALGUMA COISA DE PROPÓSITO.', ok:1},
  {t:'UMA LISTA DE PALAVRAS EM ORDEM ALFABÉTICA.', no:'Lista em ordem alfabética lembra o dicionário, não a paródia.'},
  {t:'UMA HISTÓRIA QUE NÃO DÁ PARA RECONHECER DE JEITO NENHUM.', no:'Na paródia sempre dá para reconhecer a original: ela imita a história.'}
 ],
 dica:'Pense na Chapeuzinho Verde que foi de bicicleta levar pizza.',
 porque:'Paródia imita a história e muda alguma coisa de propósito (personagem, cor, lugar, final), muitas vezes para ficar engraçada.',
 proximo:'Paródia muda; paráfrase não muda o que acontece.'},

/* ======================= LETRA H ======================= */
{id:'SH1', eixo:'h',
 pede:'ASSINALE A PALAVRA ESCRITA CORRETAMENTE.',
 opts:[
  {t:'OSPITAL', no:'Falta o H do começo. Ele não tem som, mas tem de ser escrito.'},
  {t:'ROSPITAL', no:'Não tem R no começo dessa palavra. O que fica quietinho no começo é o H.'},
  {t:'HOSPITAL', ok:1},
  {t:'OSPITÁ', no:'Falta o H do começo e falta o L do fim.'}
 ],
 dica:'Essa palavra começa com uma letra que não tem som.',
 visual:'<div class="pcs"><span class="pc hit">H</span><span class="pc">OSPITAL</span></div><p class="vx">O H não tem som, mas está lá.</p>',
 porque:'HOSPITAL se escreve com H no começo. A gente não ouve o H, mas ele é escrito.',
 proximo:'Palavra que começa com som de vogal? Lembre se ela é do time do H: hora, hoje, hospital.'},

{id:'SH2', eixo:'h',
 pede:'QUAL PALAVRA COMEÇA COM H?',
 opts:[
  {t:'ILHA', no:'ILHA começa com I. Ela tem H no meio (LH), mas não no começo.'},
  {t:'HIENA', ok:1},
  {t:'UVA', no:'UVA começa direto com a vogal U.'},
  {t:'ANEL', no:'ANEL começa direto com a vogal A.'}
 ],
 dica:'Olhe só a PRIMEIRA letra de cada palavra.',
 porque:'HIENA começa com H. ILHA tem H, mas no meio, junto com o L.',
 proximo:'Começa com H = o H é a primeira letra. Não vale H no meio.'},

{id:'SH3', eixo:'h',
 quadro:'A GENTE FALA: "OJE".<br>A GENTE ESCREVE: <span class="bl">________</span>',
 pede:'COMO SE ESCREVE A PALAVRA?',
 opts:[
  {t:'OJE', no:'Assim é como a gente FALA. Na escrita, tem um H no começo.'},
  {t:'OGE', no:'Falta o H do começo, e o som de jê antes do E dessa palavra é com J.'},
  {t:'HOGE', no:'O H está certo, mas o som de jê dessa palavra é com J: HOJE.'},
  {t:'HOJE', ok:1}
 ],
 dica:'O H do começo não tem som. E o som de jê dessa palavra é com J.',
 visual:'<div class="pcs"><span class="pc hit">H</span><span class="pc">O</span><span class="pc hit">J</span><span class="pc">E</span></div>',
 porque:'Falamos "oje", mas escrevemos HOJE: com H no começo e com J.',
 proximo:'Desconfie da palavra que começa com som de vogal: pode ter um H escondido.'},

{id:'SH4', eixo:'h',
 quadro:'<span class="bl">___</span>IPOPÓTAMO',
 pede:'QUAL LETRA COMPLETA A PALAVRA?',
 opts:[
  {t:'E', no:'"EIPOPÓTAMO" não existe. O começo é HI.'},
  {t:'H', ok:1},
  {t:'O', no:'"OIPOPÓTAMO" não existe. O começo é HI.'},
  {t:'NENHUMA: A PALAVRA COMEÇA COM I.', no:'"IPOPÓTAMO" é como a gente fala, mas na escrita tem um H no começo.'}
 ],
 dica:'A letra que falta não faz som nenhum.',
 porque:'HIPOPÓTAMO se escreve com H no começo, mesmo sem som.',
 proximo:'Se o buraco está no começo e parece que não falta nada, pense no H.'},

{id:'SH5', eixo:'h',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS COMEÇAM COM H?',
 opts:[
  {t:'HORA · OVO · HINO', no:'OVO começa direto com O. Uma palavra só já tira o grupo.'},
  {t:'HOMEM · UVA · HERÓI', no:'UVA começa direto com U.'},
  {t:'HORA · HOTEL · HINO', ok:1},
  {t:'ILHA · HORTA · HÉLICE', no:'ILHA começa com I.'}
 ],
 dica:'Confira a primeira letra das TRÊS palavras de cada grupo.',
 porque:'HORA, HOTEL e HINO começam com H. Nos outros grupos, sempre tem uma palavra que começa com vogal.',
 proximo:'Grupo "todas": confira uma por uma. Uma errada já derruba o grupo.'},

{id:'SH6', eixo:'h',
 pede:'O H NO COMEÇO DA PALAVRA HORTA...',
 opts:[
  {t:'NÃO TEM SOM, MAS PRECISA SER ESCRITO.', ok:1},
  {t:'TEM SOM DE R, COMO EM RATO.', no:'Em português, o H do começo não tem som nenhum.'},
  {t:'PODE SER APAGADO, PORQUE NÃO TEM SOM.', no:'Sem o H, a palavra fica escrita errada. Ele não tem som, mas tem de estar lá.'},
  {t:'TEM SOM DE A.', no:'O H não tem som de A. Ele não tem som nenhum.'}
 ],
 dica:'Fale HORTA bem devagar. Dá para ouvir o H?',
 porque:'O H do começo não tem som. Mesmo assim, HORTA se escreve com H.',
 proximo:'Lembre a regra em duas partes: sem som, mas escrito.'},

{id:'SH7', eixo:'h',
 quadro:'A <span class="bl">________</span> DO RECREIO CHEGOU.',
 pede:'QUE PALAVRA COMPLETA A FRASE?',
 opts:[
  {t:'ORA', no:'A frase fala do tempo do relógio. Essa palavra se escreve com H: HORA.'},
  {t:'OURA', no:'Essa palavra não existe. A do relógio é HORA, com H.'},
  {t:'HORA', ok:1},
  {t:'HORRA', no:'HORA tem um R só.'}
 ],
 dica:'É a palavra do relógio: a ___ do recreio.',
 visual:'<p class="vx">A <span class="mk">HORA</span> DO RECREIO CHEGOU.</p>',
 porque:'A palavra do relógio é HORA, com H no começo e um R só.',
 proximo:'Leia a frase inteira com a palavra no buraco e confira a escrita, letra por letra.'},

/* ======================= J OU G ======================= */
{id:'SJG1', eixo:'jg',
 quadro:'<span class="bl">___</span>ACARÉ',
 pede:'QUAL LETRA COMPLETA A PALAVRA?',
 opts:[
  {t:'G', no:'GA tem som de guê, como em GATO. Para o som de jê antes do A, só J.'},
  {t:'J', ok:1},
  {t:'GU', no:'GUA não faz o som de jê. Antes do A, o som de jê é sempre J.'},
  {t:'CH', no:'CH tem som de xis (CHAVE). A palavra começa com som de jê.'}
 ],
 dica:'Antes do A, o som de jê é sempre com...',
 visual:'<div class="pcs"><span class="pc hit">JA</span><span class="pc">CA</span><span class="pc">RÉ</span></div>',
 porque:'JA, JO, JU: sempre J. JACARÉ.',
 proximo:'Veja a vogal depois do buraco. A, O ou U? Então é J.'},

{id:'SJG2', eixo:'jg',
 pede:'ASSINALE A PALAVRA ESCRITA CORRETAMENTE.',
 opts:[
  {t:'JIRASSOL', no:'Antes do I, o som de jê pode ser J ou G, e é preciso lembrar a palavra. GIRASSOL é com G.'},
  {t:'GUIRASSOL', no:'GUI tem som de guê (GUITARRA). GIRASSOL começa com som de jê.'},
  {t:'XIRASSOL', no:'X tem outro som. GIRASSOL é com G.'},
  {t:'GIRASSOL', ok:1}
 ],
 dica:'É a flor que segue o sol. Começa igual a GIRAFA.',
 porque:'GIRASSOL se escreve com G, igual a GIRAFA. Com E e I, é preciso lembrar como a palavra se escreve.',
 proximo:'Com E e I, pense numa palavra parecida que você já sabe: GIRAFA, GIRASSOL.'},

{id:'SJG3', eixo:'jg',
 pede:'EM QUAL PALAVRA O SOM DE JÊ É ESCRITO COM J?',
 opts:[
  {t:'GELADEIRA', no:'GELADEIRA tem som de jê, mas escrito com G.'},
  {t:'PÁGINA', no:'PÁGINA tem som de jê, mas escrito com G.'},
  {t:'CANJICA', ok:1},
  {t:'RELÓGIO', no:'RELÓGIO tem som de jê, mas escrito com G.'}
 ],
 dica:'Todas têm som de jê. Olhe a LETRA que escreve esse som.',
 visual:'<div class="pcs"><span class="pc">CAN</span><span class="pc hit">JI</span><span class="pc">CA</span></div>',
 porque:'CANJICA tem JI, com J. As outras têm GE ou GI, com G.',
 proximo:'Som igual não quer dizer letra igual: olhe a letra escrita.'},

{id:'SJG4', eixo:'jg',
 quadro:'O MACACO COMEU UMA LARAN<span class="bl">___</span>A.',
 pede:'QUAL LETRA COMPLETA A PALAVRA?',
 opts:[
  {t:'J', ok:1},
  {t:'G', no:'GA tem som de guê (GATO). LARANJA tem som de jê antes do A: só J.'},
  {t:'GU', no:'GUA não faz som de jê. Antes do A, o som de jê é sempre J.'},
  {t:'X', no:'X não faz esse som em LARANJA. Antes do A, o som de jê é J.'}
 ],
 dica:'Veja a vogal depois do buraco.',
 visual:'<div class="pcs"><span class="pc">LA</span><span class="pc">RAN</span><span class="pc hit">JA</span></div>',
 porque:'JA: sempre J. LARANJA.',
 proximo:'Depois do buraco vem A, O ou U? Então o som de jê é J.'},

{id:'SJG5', eixo:'jg',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS ESTÃO ESCRITAS CORRETAMENTE?',
 opts:[
  {t:'JOGO · CAGU · GELO', no:'CAGU está errada: JU é sempre com J. O certo é CAJU.'},
  {t:'JOGO · CAJU · JELO', no:'JELO está errada: GELO se escreve com G.'},
  {t:'GOJO · CAJU · GELO', no:'GOJO está errada: o certo é JOGO, com J no começo.'},
  {t:'JOGO · CAJU · GELO', ok:1}
 ],
 dica:'Confira as três palavras de cada grupo. Uma errada já derruba o grupo.',
 porque:'JOGO e CAJU têm JO e JU (sempre J). GELO se escreve com G.',
 proximo:'Em grupo "todas", leia palavra por palavra até o fim.'},

{id:'SJG6', eixo:'jg',
 pede:'POR QUE JANELA SÓ PODE SER ESCRITA COM J?',
 opts:[
  {t:'PORQUE TODA PALAVRA COMEÇA COM J.', no:'Não é verdade: GELO e GIRAFA começam com G.'},
  {t:'PORQUE COM A, O E U O SOM DE JÊ É SEMPRE COM J.', ok:1},
  {t:'PORQUE GA FAZ SOM DE JÊ.', no:'GA faz som de guê, como em GATO. Por isso não serve.'},
  {t:'PORQUE J E G NUNCA FAZEM O MESMO SOM.', no:'Fazem, sim: com E e I, os dois podem fazer som de jê (JEITO, GELO).'}
 ],
 dica:'Olhe a vogal depois do J em JANELA.',
 porque:'JA, JO, JU: sempre J, porque GA, GO e GU fazem o som de guê.',
 proximo:'Antes de responder POR QUE, lembre a regra inteira: com A, O, U, sempre J.'},

{id:'SJG7', eixo:'jg',
 pede:'ASSINALE A PALAVRA ESCRITA CORRETAMENTE.',
 opts:[
  {t:'TIJELA', no:'Muita gente escreve assim, mas o certo é com G: TIGELA.'},
  {t:'TIGUELA', no:'GUE tem som de guê. TIGELA tem som de jê.'},
  {t:'TIGELA', ok:1},
  {t:'TIXELA', no:'X tem outro som. TIGELA se escreve com G.'}
 ],
 dica:'Com E, o som de jê pode ser J ou G. Essa palavra é do time do G.',
 porque:'TIGELA se escreve com G. Com E e I, é preciso lembrar como a palavra se escreve.',
 proximo:'Palavra de E e I com som de jê: lembre do jeito que você viu escrito.'},

/* ======================= G OU GU ======================= */
{id:'SGG1', eixo:'ggu',
 quadro:'FO<span class="bl">___</span>ETE',
 pede:'O QUE COMPLETA A PALAVRA?',
 opts:[
  {t:'G', no:'Sem o U, GE faz som de jê, como em GELO. Ficaria "fojete".'},
  {t:'GU', ok:1},
  {t:'J', no:'JE tem som de jê. FOGUETE tem som de guê.'},
  {t:'Q', no:'Q faz som de quê, não de guê.'}
 ],
 dica:'Antes do E, para soar guê, precisa de uma ajudante quietinha.',
 visual:'<div class="pcs"><span class="pc">FO</span><span class="pc hit">GUE</span><span class="pc">TE</span></div><p class="vx">O U fica quietinho: só ajuda o G a soar guê.</p>',
 porque:'FOGUETE: GUE. Antes do E, o som de guê precisa do U, que não se fala.',
 proximo:'Depois do buraco vem E ou I e o som é guê? Então é GU.'},

{id:'SGG2', eixo:'ggu',
 pede:'ASSINALE A PALAVRA ESCRITA CORRETAMENTE.',
 opts:[
  {t:'GITARRA', no:'Sem o U, GI faz som de jê, como em GIRAFA. Ficaria "jitarra".'},
  {t:'JITARRA', no:'JI tem som de jê. GUITARRA tem som de guê.'},
  {t:'GUITARRA', ok:1},
  {t:'QUITARRA', no:'QUI faz som de quê. GUITARRA começa com som de guê.'}
 ],
 dica:'Começa com som de guê antes do I.',
 visual:'<div class="pcs"><span class="pc hit">GUI</span><span class="pc">TAR</span><span class="pc">RA</span></div>',
 porque:'GUITARRA: GUI, com o U quietinho.',
 proximo:'Som de guê antes de E ou I: GUE, GUI.'},

{id:'SGG3', eixo:'ggu',
 pede:'EM QUAL PALAVRA O U NÃO É FALADO?',
 opts:[
  {t:'AGULHA', no:'Em AGULHA o U é falado: A-GU-LHA.'},
  {t:'GUDE', no:'Em GUDE o U é falado: GU-DE.'},
  {t:'CAJU', no:'Em CAJU o U é falado: CA-JU.'},
  {t:'MANGUEIRA', ok:1}
 ],
 dica:'Fale cada palavra bem devagar. Em qual o U some?',
 visual:'<div class="pcs"><span class="pc">MAN</span><span class="pc hit">GUEI</span><span class="pc">RA</span></div><p class="vx">GUE: o U está escrito, mas não se fala.</p>',
 porque:'Em MANGUEIRA, o U de GUE não se fala. Nas outras, o U é ouvido.',
 proximo:'O U quietinho aparece em GUE e GUI. Em GU sozinho, o U é falado.'},

{id:'SGG4', eixo:'ggu',
 pede:'QUAL PALAVRA TEM O SOM DE GUÊ?',
 opts:[
  {t:'GELADEIRA', no:'GE tem som de jê: GELADEIRA.'},
  {t:'LAGO', ok:1},
  {t:'GIRASSOL', no:'GI tem som de jê: GIRASSOL.'},
  {t:'GENTE', no:'GE tem som de jê: GENTE.'}
 ],
 dica:'GE e GI têm som de jê. Procure GA, GO ou GU.',
 visual:'<div class="pcs"><span class="pc">LA</span><span class="pc hit">GO</span></div>',
 porque:'LAGO tem GO, com som de guê. As outras têm GE ou GI, com som de jê.',
 proximo:'Olhe a vogal depois do G: A, O, U = guê; E, I = jê.'},

{id:'SGG5', eixo:'ggu',
 pede:'NA PALAVRA GIGANTE, QUE SOM TÊM AS PARTES GI E GAN?',
 opts:[
  {t:'OS DOIS TÊM SOM DE JÊ.', no:'GAN tem som de guê, como em GATO.'},
  {t:'GI TEM SOM DE JÊ, E GAN TEM SOM DE GUÊ.', ok:1},
  {t:'OS DOIS TÊM SOM DE GUÊ.', no:'GI tem som de jê, como em GIRAFA.'},
  {t:'GI TEM SOM DE GUÊ, E GAN TEM SOM DE JÊ.', no:'Está trocado: GI soa jê e GAN soa guê.'}
 ],
 dica:'Fale GI-GAN-TE devagar.',
 visual:'<div class="pcs"><span class="pc hit">GI = jê</span><span class="pc hit">GAN = guê</span><span class="pc">TE</span></div>',
 porque:'GI soa jê (como GIRAFA) e GAN soa guê (como GATO). Duas regras numa palavra só.',
 proximo:'Olhe a vogal depois de cada G.'},

{id:'SGG6', eixo:'ggu',
 quadro:'À NOITE, ACENDEMOS UMA FO<span class="bl">___</span>EIRA.',
 pede:'O QUE COMPLETA A PALAVRA?',
 opts:[
  {t:'G', no:'Sem o U, GE faz som de jê. Ficaria "fojeira".'},
  {t:'J', no:'JE tem som de jê. FOGUEIRA tem som de guê.'},
  {t:'Q', no:'Q faz som de quê.'},
  {t:'GU', ok:1}
 ],
 dica:'Depois do buraco vem E. Queremos o som de guê.',
 visual:'<div class="pcs"><span class="pc">FO</span><span class="pc hit">GUEI</span><span class="pc">RA</span></div>',
 porque:'FOGUEIRA: GUE, com o U quietinho.',
 proximo:'E ou I depois do buraco + som de guê = GU.'},

{id:'SGG7', eixo:'ggu',
 pede:'QUAL DESTAS PALAVRAS ESTÁ ESCRITA DE FORMA ERRADA?',
 opts:[
  {t:'FOGUETE', no:'FOGUETE está certa: GUE, com o U quietinho.'},
  {t:'GERRA', ok:1},
  {t:'ÁGUIA', no:'ÁGUIA está certa: GUI, com o U quietinho.'},
  {t:'GATO', no:'GATO está certa: GA, só o G.'}
 ],
 dica:'A pergunta pede a ERRADA. Fale cada uma como está escrita.',
 visual:'<div class="pcs"><span class="pc bad">GERRA</span><span class="arw">&rarr;</span><span class="pc hit">GUERRA</span></div>',
 porque:'Sem o U, GE soaria jê: "jerra". O certo é GUERRA, com GUE.',
 proximo:'Pergunta com ERRADA: procure a que quebra a regra.'},

/* ======================= DICIONÁRIO ======================= */
{id:'SDI1', eixo:'dic',
 pede:'QUAL PALAVRA VEM PRIMEIRO NO DICIONÁRIO?',
 opts:[
  {t:'BULE', no:'BU: o U vem depois do A, do E e do O no alfabeto.'},
  {t:'BOLA', no:'BO: o O vem depois do A no alfabeto.'},
  {t:'BELO', no:'BE: o E vem depois do A no alfabeto.'},
  {t:'BALA', ok:1}
 ],
 dica:'Todas começam com B. Olhe a segunda letra.',
 visual:'<div class="pcs"><span class="pc hit">BA</span><span class="arw">&rarr;</span><span class="pc">BE</span><span class="arw">&rarr;</span><span class="pc">BO</span><span class="arw">&rarr;</span><span class="pc">BU</span></div>',
 porque:'A segunda letra decide: A, E, O, U. BALA vem primeiro.',
 proximo:'Primeira letra igual? Passe para a segunda.'},

{id:'SDI2', eixo:'dic',
 pede:'EM QUAL ORDEM AS PALAVRAS APARECEM NO DICIONÁRIO?',
 opts:[
  {t:'LOBO · GATO · URSO', no:'L vem depois de G no alfabeto. GATO tem de vir antes de LOBO.'},
  {t:'GATO · LOBO · URSO', ok:1},
  {t:'URSO · LOBO · GATO', no:'Essa ordem está de trás para a frente.'},
  {t:'GATO · URSO · LOBO', no:'U vem depois de L no alfabeto. LOBO tem de vir antes de URSO.'}
 ],
 dica:'G, L, U: cante o alfabeto e veja qual chega primeiro.',
 porque:'No alfabeto, G vem antes de L, e L vem antes de U: GATO, LOBO, URSO.',
 proximo:'Olhe a primeira letra de cada palavra e ponha na ordem do alfabeto.'},

{id:'SDI3', eixo:'dic',
 pede:'CASA E CAVALO COMEÇAM COM CA. QUAL VEM PRIMEIRO NO DICIONÁRIO?',
 opts:[
  {t:'CAVALO, PORQUE É UMA PALAVRA MAIOR.', no:'O tamanho não importa no dicionário. Vale a ordem do alfabeto.'},
  {t:'CAVALO, PORQUE V VEM ANTES DE S.', no:'Não vem: no alfabeto, S vem antes de V.'},
  {t:'CASA, PORQUE S VEM ANTES DE V.', ok:1},
  {t:'AS DUAS FICAM NO MESMO LUGAR.', no:'Cada palavra tem o seu lugar. A terceira letra decide.'}
 ],
 dica:'As duas primeiras letras são iguais. Olhe a terceira.',
 visual:'<div class="pcs"><span class="pc">CA</span><span class="pc hit">S</span><span class="pc">A</span></div><div class="pcs"><span class="pc">CA</span><span class="pc">V</span><span class="pc">ALO</span></div>',
 porque:'CAS e CAV: a terceira letra decide. S vem antes de V, então CASA vem antes de CAVALO.',
 proximo:'Letras iguais? Ande para a próxima letra até achar uma diferente.'},

{id:'SDI4', eixo:'dic',
 pede:'PARA QUE SERVE O DICIONÁRIO?',
 opts:[
  {t:'PARA CONTAR HISTÓRIAS DE FADAS.', no:'Histórias de fadas estão em livros de contos, não no dicionário.'},
  {t:'PARA FAZER CONTAS DE MAIS.', no:'Conta se faz na Matemática. O dicionário explica palavras.'},
  {t:'PARA VER AS HORAS.', no:'Para ver as horas, usamos o relógio.'},
  {t:'PARA DESCOBRIR O SIGNIFICADO DE UMA PALAVRA E COMO ELA SE ESCREVE.', ok:1}
 ],
 dica:'O que tem dentro do dicionário? Palavras explicadas.',
 porque:'O dicionário mostra o significado da palavra e a escrita certa dela.',
 proximo:'Lembre as duas coisas: significado e escrita certa.'},

{id:'SDI5', eixo:'dic',
 quadro:'BOLA: OBJETO REDONDO, USADO PARA BRINCAR E JOGAR.',
 pede:'NO DICIONÁRIO, A PALAVRA EXPLICADA COM O SEU SIGNIFICADO, COMO NO QUADRO, SE CHAMA...',
 opts:[
  {t:'VERBETE', ok:1},
  {t:'PALAVRA-GUIA', no:'Palavras-guia ficam no alto da página e mostram a primeira e a última palavra dela.'},
  {t:'TÍTULO', no:'Título é o nome de um texto. No dicionário, a palavra explicada tem outro nome.'},
  {t:'RIMA', no:'Rima é quando palavras terminam com o mesmo som. Não tem nada a ver.'}
 ],
 dica:'Começa com V.',
 porque:'Cada palavra explicada no dicionário, com o seu significado, é um verbete.',
 proximo:'Verbete = palavra + explicação. Palavras-guia = no alto da página.'},

{id:'SDI6', eixo:'dic',
 quadro:'NO ALTO DE UMA PÁGINA DO DICIONÁRIO ESTÁ ESCRITO:<br>BALA ........ BULE',
 pede:'QUAL PALAVRA PODE ESTAR NESSA PÁGINA?',
 opts:[
  {t:'ABELHA', no:'ABELHA começa com A: vem antes de BALA, numa página anterior.'},
  {t:'CASA', no:'CASA começa com C: vem depois de BULE, numa página seguinte.'},
  {t:'BOLA', ok:1},
  {t:'UVA', no:'UVA começa com U: fica bem mais para o fim do dicionário.'}
 ],
 dica:'As palavras-guia mostram a primeira (BALA) e a última (BULE) palavra da página.',
 visual:'<div class="pcs"><span class="pc">BALA</span><span class="arw">&rarr;</span><span class="pc hit">BOLA</span><span class="arw">&rarr;</span><span class="pc">BULE</span></div>',
 porque:'BOLA fica entre BALA e BULE: BA, BO, BU. Por isso está nessa página.',
 proximo:'A palavra tem de caber ENTRE as duas palavras-guia.'},

{id:'SDI7', eixo:'dic',
 pede:'QUAL PALAVRA VEM POR ÚLTIMO NO DICIONÁRIO?',
 opts:[
  {t:'ABELHA', no:'A é a primeira letra do alfabeto: ABELHA vem logo no começo.'},
  {t:'MAPA', no:'M fica no meio do alfabeto.'},
  {t:'ZEBRA', ok:1},
  {t:'VACA', no:'V vem antes de Z no alfabeto.'}
 ],
 dica:'Qual é a última letra do alfabeto?',
 porque:'Z é a última letra do alfabeto. ZEBRA vem depois de todas.',
 proximo:'POR ÚLTIMO: procure a letra mais perto do fim do alfabeto.'},

/* ======================= INVENÇÕES E DESCOBERTAS ======================= */
{id:'SIN1', eixo:'invento', enun:'LEIA O TEXTO:', texto:TX_INVENTO,
 pede:'SEGUNDO O TEXTO, POR QUE AS PESSOAS INVENTAM COISAS?',
 opts:[
  {t:'PARA ACHAR O QUE JÁ EXISTIA NA NATUREZA.', no:'Achar o que já existia é DESCOBERTA, não invenção.'},
  {t:'PARA RESOLVER PROBLEMAS E FACILITAR A VIDA.', ok:1},
  {t:'PARA DEIXAR A NOITE MAIS ESCURA.', no:'É o contrário: a lâmpada ilumina a noite.'},
  {t:'PARA ASSUSTAR AS PESSOAS.', no:'O texto não diz isso.'}
 ],
 dica:'A resposta está nas duas primeiras linhas.',
 visual:'<p class="vx">AS PESSOAS INVENTAM COISAS <span class="mk">PARA RESOLVER PROBLEMAS E FACILITAR A VIDA</span>.</p>',
 porque:'O texto diz: as pessoas inventam coisas para resolver problemas e facilitar a vida.',
 proximo:'Procure no texto a palavra PARA perto de INVENTAM.'},

{id:'SIN2', eixo:'invento', enun:'LEIA O TEXTO:', texto:TX_INVENTO,
 pede:'QUEM É CONHECIDO COMO O PAI DA AVIAÇÃO?',
 opts:[
  {t:'JOÃO, DO PÉ DE FEIJÃO', no:'João é personagem de conto de fadas. O texto fala de outra pessoa.'},
  {t:'O CAÇADOR', no:'O caçador é da história da Chapeuzinho.'},
  {t:'SANTOS DUMONT', ok:1},
  {t:'O GIGANTE', no:'O Gigante é o vilão da história do João.'}
 ],
 dica:'Procure no texto a palavra AVIAÇÃO.',
 visual:'<p class="vx">O BRASILEIRO <span class="mk">SANTOS DUMONT</span> É CONHECIDO COMO O PAI DA AVIAÇÃO.</p>',
 porque:'O texto diz: o brasileiro Santos Dumont é conhecido como o pai da aviação. Ele criou o 14-Bis.',
 proximo:'Ache no texto a palavra da pergunta e leia a linha inteira.'},

{id:'SIN3', eixo:'invento', enun:'LEIA O TEXTO:', texto:TX_INVENTO,
 pede:'POR QUE O TEXTO DIZ QUE O FOGO NÃO FOI INVENTADO?',
 opts:[
  {t:'PORQUE SANTOS DUMONT O CRIOU.', no:'Santos Dumont criou o 14-Bis, não o fogo.'},
  {t:'PORQUE ELE É UMA MÁQUINA.', no:'Fogo não é máquina. O texto diz outra coisa.'},
  {t:'PORQUE NINGUÉM SABE O QUE É FOGO.', no:'O texto não diz isso.'},
  {t:'PORQUE ELE JÁ EXISTIA NA NATUREZA.', ok:1}
 ],
 dica:'Leia a linha do texto que fala do fogo.',
 visual:'<p class="vx">JÁ O FOGO NÃO FOI INVENTADO: <span class="mk">ELE JÁ EXISTIA NA NATUREZA</span>.</p>',
 porque:'O fogo já existia na natureza. Encontrar algo que já existia é uma descoberta, não uma invenção.',
 proximo:'Depois dos dois-pontos (:), o texto costuma explicar o porquê.'},

{id:'SIN4', eixo:'invento',
 pede:'QUAL DESTAS É UMA INVENÇÃO?',
 opts:[
  {t:'O RIO', no:'O rio é da natureza: ninguém o criou.'},
  {t:'A MONTANHA', no:'A montanha é da natureza: ninguém a criou.'},
  {t:'A BICICLETA', ok:1},
  {t:'A CHUVA', no:'A chuva é da natureza: ninguém a criou.'}
 ],
 dica:'Qual delas foi construída por pessoas?',
 porque:'A bicicleta foi criada pelas pessoas e não existia antes. Rio, montanha e chuva são da natureza.',
 proximo:'Pergunte: alguém construiu isso? Se sim, é invenção.'},

{id:'SIN5', eixo:'invento',
 pede:'QUAL DESTAS É UMA DESCOBERTA?',
 opts:[
  {t:'CRIAR O PRIMEIRO TELEFONE.', no:'O telefone não existia antes: foi criado. É invenção.'},
  {t:'ENCONTRAR UM ANIMAL NUNCA VISTO NA FLORESTA.', ok:1},
  {t:'CONSTRUIR O PRIMEIRO AVIÃO.', no:'O avião foi construído pelas pessoas. É invenção.'},
  {t:'FAZER A PRIMEIRA BICICLETA.', no:'A bicicleta foi feita pelas pessoas. É invenção.'}
 ],
 dica:'Descoberta é achar algo que já existia.',
 porque:'O animal já existia na floresta: alguém só o encontrou. Isso é descoberta.',
 proximo:'Criar, construir, fazer = invenção. Encontrar, achar = descoberta.'},

{id:'SIN6', eixo:'invento',
 pede:'QUEM INVENTA ALGUMA COISA É CHAMADO DE...',
 opts:[
  {t:'VILÃO', no:'Vilão é o personagem que faz maldade nas histórias.'},
  {t:'LEITOR', no:'Leitor é quem lê.'},
  {t:'CAÇADOR', no:'Caçador é personagem da Chapeuzinho.'},
  {t:'INVENTOR', ok:1}
 ],
 dica:'Inventar... inven...',
 porque:'Quem inventa é o inventor. Santos Dumont foi um inventor.',
 proximo:'A palavra de quem faz vem da palavra do que se faz: inventar, inventor.'},

{id:'SIN7', eixo:'invento',
 pede:'ASSINALE O GRUPO QUE TEM SÓ INVENÇÕES.',
 opts:[
  {t:'RODA · FOGO · RELÓGIO', no:'O FOGO não foi inventado: ele já existia na natureza.'},
  {t:'AVIÃO · RIO · TELEFONE', no:'O RIO é da natureza: ninguém o criou.'},
  {t:'RODA · LÂMPADA · RELÓGIO', ok:1},
  {t:'COMPUTADOR · GELADEIRA · CHUVA', no:'A CHUVA é da natureza: ninguém a criou.'}
 ],
 dica:'Confira as três coisas de cada grupo. Uma da natureza já derruba o grupo.',
 porque:'Roda, lâmpada e relógio foram criados pelas pessoas. Nos outros grupos sempre tem algo da natureza.',
 proximo:'Grupo "só": confira uma por uma até o fim.'},

/* ======================= CA CO CU · QUE QUI ======================= */
{id:'SCQ1', eixo:'cqu',
 quadro:'<span class="bl">___</span>EIJO',
 pede:'O QUE COMPLETA A PALAVRA?',
 opts:[
  {t:'C', no:'CE tem som de sê, como em CEBOLA. Para soar quê antes do E, é QU.'},
  {t:'K', no:'Essa palavra não se escreve com K. Antes do E, o som de quê é QU.'},
  {t:'QU', ok:1},
  {t:'G', no:'G faz outro som. QUEIJO começa com som de quê.'}
 ],
 dica:'Antes do E, o som de quê se escreve com duas letras.',
 visual:'<div class="pcs"><span class="pc hit">QUEI</span><span class="pc">JO</span></div><p class="vx">O U fica quietinho.</p>',
 porque:'QUEIJO: QUE. Antes do E, o som de quê se escreve com QU, e o U não se fala.',
 proximo:'Buraco antes de E ou I com som de quê? É QU.'},

{id:'SCQ2', eixo:'cqu',
 pede:'ASSINALE A PALAVRA ESCRITA CORRETAMENTE.',
 opts:[
  {t:'PERICITO', no:'CI tem som de si. Para soar quê antes do I, é QUI.'},
  {t:'PERIQUITO', ok:1},
  {t:'PERIKITO', no:'Essa palavra não se escreve com K.'},
  {t:'PERIQITO', no:'Falta o U: o Q sempre vem com o U quietinho, QUI.'}
 ],
 dica:'Som de quê antes do I.',
 visual:'<div class="pcs"><span class="pc">PE</span><span class="pc">RI</span><span class="pc hit">QUI</span><span class="pc">TO</span></div>',
 porque:'PERIQUITO: QUI, com o U quietinho.',
 proximo:'Q nunca anda sozinho: QUE, QUI.'},

{id:'SCQ3', eixo:'cqu',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS TÊM O SOM DE QUÊ ESCRITO SÓ COM C?',
 opts:[
  {t:'CAVALO · QUEIJO · CUBO', no:'QUEIJO tem QU, não C sozinho.'},
  {t:'QUIABO · COPO · CAMA', no:'QUIABO tem QU, não C sozinho.'},
  {t:'CAMA · LEQUE · CUCA', no:'LEQUE tem QU, não C sozinho.'},
  {t:'CAVALO · COPO · CUTIA', ok:1}
 ],
 dica:'Procure o grupo só com CA, CO, CU.',
 porque:'CAVALO, COPO e CUTIA têm CA, CO e CU: só o C. Os outros grupos têm uma palavra com QU.',
 proximo:'Confira as três palavras do grupo, uma por uma.'},

{id:'SCQ4', eixo:'cqu',
 quadro:'O ES<span class="bl">___</span>ILO SUBIU NA ÁRVORE.',
 pede:'O QUE COMPLETA A PALAVRA?',
 opts:[
  {t:'QU', ok:1},
  {t:'C', no:'CI tem som de si. Ficaria "essilo".'},
  {t:'CU', no:'CUI faz o U ser falado. ESQUILO tem o U quietinho, com QU.'},
  {t:'G', no:'G faz outro som. ESQUILO tem som de quê.'}
 ],
 dica:'Antes do I, o som de quê precisa de duas letras.',
 visual:'<div class="pcs"><span class="pc">ES</span><span class="pc hit">QUI</span><span class="pc">LO</span></div>',
 porque:'ESQUILO: QUI, com o U quietinho.',
 proximo:'E ou I depois do buraco + som de quê = QU.'},

{id:'SCQ5', eixo:'cqu',
 pede:'POR QUE QUEIJO SE ESCREVE COM QU?',
 opts:[
  {t:'PORQUE ANTES DE E E I O SOM DE QUÊ SE ESCREVE COM QU.', ok:1},
  {t:'PORQUE O U DE QUEIJO É FALADO BEM ALTO.', no:'O U de QUEIJO não se fala: ele fica quietinho.'},
  {t:'PORQUE CE TEM SOM DE QUÊ.', no:'CE não tem som de quê: tem som de sê, como em CEBOLA.'},
  {t:'PORQUE TODA PALAVRA COMEÇA COM Q.', no:'Não é verdade: CASA, COPO e CUBO começam com C.'}
 ],
 dica:'Olhe a vogal que vem depois do QU em QUEIJO.',
 porque:'Antes de E e I, o som de quê se escreve com QU: QUE, QUI. Antes de A, O, U, é só o C.',
 proximo:'Lembre a regra inteira, com as duas partes: CA, CO, CU; QUE, QUI.'},

{id:'SCQ6', eixo:'cqu',
 pede:'QUAL PALAVRA ESTÁ ESCRITA DE FORMA ERRADA?',
 opts:[
  {t:'CAQUI', no:'CAQUI está certa: CA e QUI.'},
  {t:'MOSQUITO', no:'MOSQUITO está certa: QUI.'},
  {t:'QUBO', ok:1},
  {t:'COELHO', no:'COELHO está certa: CO.'}
 ],
 dica:'A pergunta pede a ERRADA. Antes do U, o som de quê é só o C.',
 visual:'<div class="pcs"><span class="pc bad">QUBO</span><span class="arw">&rarr;</span><span class="pc hit">CUBO</span></div>',
 porque:'Antes do U, o som de quê é só o C: CUBO. QUBO está errada.',
 proximo:'Pergunta com ERRADA: confira cada uma com a regra.'},

{id:'SCQ7', eixo:'cqu',
 quadro:'LE<span class="bl">___</span>E (OBJETO PARA SE ABANAR NO CALOR)',
 pede:'O QUE COMPLETA A PALAVRA?',
 opts:[
  {t:'C', no:'CE tem som de sê. Ficaria "lesse".'},
  {t:'CU', no:'Com CU, o U seria falado: "lecue". LEQUE tem o U quietinho.'},
  {t:'G', no:'GE tem som de jê. Ficaria "leje".'},
  {t:'QU', ok:1}
 ],
 dica:'Depois do buraco vem E, e o som é de quê.',
 porque:'LEQUE: QUE, com o U quietinho.',
 proximo:'E ou I depois do buraco + som de quê = QU.'},

/* ======================= CH · NH · LH ======================= */
{id:'SDG1', eixo:'dig',
 pede:'QUAL PALAVRA TEM LH?',
 opts:[
  {t:'ARANHA', no:'ARANHA tem NH, não LH.'},
  {t:'OVELHA', ok:1},
  {t:'CHINELO', no:'CHINELO tem CH, não LH.'},
  {t:'BANHO', no:'BANHO tem NH, não LH.'}
 ],
 dica:'Procure o L seguido de H.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="pc">VE</span><span class="pc hit">LHA</span></div>',
 porque:'OVELHA tem LH. ARANHA e BANHO têm NH; CHINELO tem CH.',
 proximo:'Olhe a letra que vem ANTES do H: C, N ou L.'},

{id:'SDG2', eixo:'dig',
 quadro:'MOLA &rarr; MOLHA',
 pede:'O QUE ACONTECEU COM A PALAVRA MOLA?',
 opts:[
  {t:'TIROU UMA LETRA E A PALAVRA FICOU IGUAL.', no:'Nenhuma letra saiu: entrou uma. E a palavra mudou.'},
  {t:'ENTROU UM N E FORMOU NH.', no:'Não entrou N. O H entrou depois do L.'},
  {t:'ENTROU UM H DEPOIS DO L, FORMOU LH E A PALAVRA MUDOU.', ok:1},
  {t:'O M VIROU CH.', no:'O M continua lá: MO-LHA.'}
 ],
 dica:'Compare as duas palavras letra por letra.',
 visual:'<div class="pcs"><span class="pc">MO</span><span class="pc">LA</span><span class="arw">&rarr;</span><span class="pc">MO</span><span class="pc hit">LHA</span></div>',
 porque:'Entrou um H depois do L. O L virou LH, e MOLA (de brinquedo) virou MOLHA (de molhar).',
 proximo:'Uma letrinha muda tudo: mola e molha, fila e filha, sono e sonho.'},

{id:'SDG3', eixo:'dig',
 quadro:'ARA<span class="bl">___</span>A',
 pede:'O QUE COMPLETA O NOME DO BICHO QUE FAZ TEIA?',
 opts:[
  {t:'LH', no:'"ARALHA" não é o bicho da teia.'},
  {t:'CH', no:'"ARACHA" não é o bicho da teia.'},
  {t:'RR', no:'"ARARRA" não é o bicho da teia.'},
  {t:'NH', ok:1}
 ],
 dica:'Fale A-RA-NHA devagar.',
 visual:'<div class="pcs"><span class="pc">A</span><span class="pc">RA</span><span class="pc hit">NHA</span></div>',
 porque:'ARANHA se escreve com NH.',
 proximo:'Fale a palavra devagar e ouça o som da dupla.'},

{id:'SDG4', eixo:'dig',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS TÊM CH?',
 opts:[
  {t:'CHAVE · CHUVA · BICHO', ok:1},
  {t:'CHAVE · NINHO · BICHO', no:'NINHO tem NH, não CH.'},
  {t:'CHUVA · FOLHA · CHAPÉU', no:'FOLHA tem LH, não CH.'},
  {t:'CACHORRO · UNHA · CHINELO', no:'UNHA tem NH, não CH.'}
 ],
 dica:'Confira as três palavras de cada grupo.',
 porque:'CHAVE, CHUVA e BICHO têm CH. Nos outros grupos, uma palavra tem NH ou LH.',
 proximo:'Grupo "todas": uma palavra fora derruba o grupo inteiro.'},

{id:'SDG5', eixo:'dig',
 quadro:'O PASSARINHO DORMIU NO SEU NI<span class="bl">___</span>O.',
 pede:'O QUE COMPLETA A PALAVRA?',
 opts:[
  {t:'LH', no:'"NILHO" não existe. A casa do passarinho é NINHO.'},
  {t:'NH', ok:1},
  {t:'RR', no:'"NIRRO" não existe. A casa do passarinho é NINHO.'},
  {t:'N', no:'"NINO" não é a casa do passarinho. Falta o H: NINHO.'}
 ],
 dica:'Fale NI-NHO devagar.',
 visual:'<div class="pcs"><span class="pc">NI</span><span class="pc hit">NHO</span></div>',
 porque:'A casa do passarinho é o NINHO, com NH.',
 proximo:'Leia a frase inteira com a palavra completa: ela tem de fazer sentido.'},

{id:'SDG6', eixo:'dig',
 pede:'EM QUAL PAR A PALAVRA MUDA DE SENTIDO SÓ PORQUE GANHOU UM H?',
 opts:[
  {t:'CASA → CASAS', no:'Aqui entrou um S: virou plural. Não entrou H.'},
  {t:'GATO → GATA', no:'Aqui o O virou A. Não entrou H.'},
  {t:'BOLA → BOLO', no:'Aqui o A virou O. Não entrou H.'},
  {t:'FILA → FILHA', ok:1}
 ],
 dica:'Procure o par em que a segunda palavra tem um H a mais.',
 visual:'<div class="pcs"><span class="pc">FI</span><span class="pc">LA</span><span class="arw">&rarr;</span><span class="pc">FI</span><span class="pc hit">LHA</span></div>',
 porque:'FILA (de esperar a vez) virou FILHA só porque entrou um H depois do L.',
 proximo:'Compare letra por letra e veja qual letra entrou.'},

{id:'SDG7', eixo:'dig',
 pede:'CH, NH E LH SÃO...',
 opts:[
  {t:'TRÊS VOGAIS.', no:'C, N, L e H não são vogais. Vogais são A, E, I, O, U.'},
  {t:'DUAS LETRAS QUE FAZEM UM SOM SÓ.', ok:1},
  {t:'LETRAS QUE NÃO FAZEM SOM NENHUM.', no:'Fazem som, sim: CH de CHAVE, NH de NINHO, LH de FOLHA.'},
  {t:'UMA LETRA SÓ COM DOIS SONS.', no:'É o contrário: são duas letras com um som só.'}
 ],
 dica:'Fale CHA-VE: quantos sons o CH faz?',
 porque:'CH, NH e LH são duas letras juntas que fazem um som só.',
 proximo:'Duas letras, um som: CH, NH, LH.'},

/* ======================= PLURAL ======================= */
{id:'SPL1', eixo:'plural',
 pede:'QUAL É O PLURAL DE COLHER?',
 opts:[
  {t:'COLHERS', no:'Terminou em R, não se põe só S: põe ES.'},
  {t:'COLHERIS', no:'IS é para palavras que terminam em L. COLHER termina em R.'},
  {t:'COLHERES', ok:1},
  {t:'COLHEIS', no:'O R não pode sumir. Terminou em R: põe ES.'}
 ],
 dica:'COLHER termina em R.',
 visual:'<div class="pcs"><span class="pc">COLHER</span><span class="arw">+</span><span class="pc hit">ES</span></div>',
 porque:'Terminou em R, põe ES: COLHER, COLHERES.',
 proximo:'Olhe a ÚLTIMA letra da palavra antes de escolher.'},

{id:'SPL2', eixo:'plural',
 pede:'QUAL É O PLURAL DE LIMÃO?',
 opts:[
  {t:'LIMÕES', ok:1},
  {t:'LIMÃOS', no:'LIMÃO segue a regra mais comum: ÃO vira ÕES.'},
  {t:'LIMÕS', no:'Falta o E: ÃO vira ÕES.'},
  {t:'LIMONES', no:'Essa forma não existe em português. ÃO vira ÕES.'}
 ],
 dica:'ÃO vira...',
 visual:'<div class="pcs"><span class="pc">LIM</span><span class="pc bad">ÃO</span><span class="arw">&rarr;</span><span class="pc">LIM</span><span class="pc hit">ÕES</span></div>',
 porque:'ÃO vira ÕES: LIMÃO, LIMÕES (igual a BALÃO, BALÕES).',
 proximo:'Pense numa palavra parecida que você conhece: AVIÃO, AVIÕES.'},

{id:'SPL3', eixo:'plural',
 pede:'QUAL É O PLURAL DE JORNAL?',
 opts:[
  {t:'JORNALS', no:'Terminou em L, não se põe S: o L vira IS.'},
  {t:'JORNALES', no:'ES é para palavras que terminam em R ou Z. JORNAL termina em L.'},
  {t:'JORNAL', no:'Essa é a palavra no singular, sem mudar nada.'},
  {t:'JORNAIS', ok:1}
 ],
 dica:'JORNAL termina em L.',
 visual:'<div class="pcs"><span class="pc">JORNA</span><span class="pc bad">L</span><span class="arw">&rarr;</span><span class="pc">JORNA</span><span class="pc hit">IS</span></div>',
 porque:'Terminou em L, o L vira IS: JORNAL, JORNAIS.',
 proximo:'L no fim? Troque o L por IS.'},

{id:'SPL4', eixo:'plural',
 pede:'QUAL É O PLURAL DE TREM?',
 opts:[
  {t:'TREMS', no:'Terminou em M, o M vira N: TRENS.'},
  {t:'TRENS', ok:1},
  {t:'TRENES', no:'Não entra E. Terminou em M: o M vira NS.'},
  {t:'TREMES', no:'Terminou em M, não se põe ES: o M vira NS.'}
 ],
 dica:'TREM termina em M.',
 visual:'<div class="pcs"><span class="pc">TRE</span><span class="pc bad">M</span><span class="arw">&rarr;</span><span class="pc">TRE</span><span class="pc hit">NS</span></div>',
 porque:'Terminou em M, vira NS: TREM, TRENS (igual a HOMEM, HOMENS).',
 proximo:'M no fim? Troque o M por NS.'},

{id:'SPL5', eixo:'plural',
 pede:'QUAL É O PLURAL DE "O LEÃO"?',
 opts:[
  {t:'O LEÕES', no:'O artigo também vai para o plural: O vira OS.'},
  {t:'OS LEÃOS', no:'LEÃO segue a regra mais comum: ÃO vira ÕES.'},
  {t:'OS LEÕES', ok:1},
  {t:'OS LEÃO', no:'A palavra LEÃO também tem de ir para o plural.'}
 ],
 dica:'As DUAS palavras vão para o plural.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="arw">&rarr;</span><span class="pc hit">OS</span></div><div class="pcs"><span class="pc">LEÃO</span><span class="arw">&rarr;</span><span class="pc hit">LEÕES</span></div>',
 porque:'O artigo vai junto: O vira OS. E ÃO vira ÕES: OS LEÕES.',
 proximo:'Plural com artigo: mude as DUAS palavras.'},

{id:'SPL6', eixo:'plural',
 pede:'QUAL PALAVRA ESTÁ NO PLURAL?',
 opts:[
  {t:'NARIZ', no:'NARIZ é um só: está no singular.'},
  {t:'FLOR', no:'FLOR é uma só: está no singular.'},
  {t:'ANZOL', no:'ANZOL é um só: está no singular.'},
  {t:'NARIZES', ok:1}
 ],
 dica:'Plural é mais de um.',
 porque:'NARIZES é o plural de NARIZ: mais de um. As outras estão no singular.',
 proximo:'Plural quase sempre termina em S.'},

{id:'SPL7', eixo:'plural',
 pede:'QUAL É O PLURAL DE ANZOL?',
 opts:[
  {t:'ANZÓIS', ok:1},
  {t:'ANZOLS', no:'Terminou em L, não se põe S: o L vira IS.'},
  {t:'ANZOLES', no:'ES é para R e Z. ANZOL termina em L.'},
  {t:'ANZÕES', no:'ÕES é para palavras que terminam em ÃO. ANZOL termina em L.'}
 ],
 dica:'ANZOL termina em L.',
 visual:'<div class="pcs"><span class="pc">ANZO</span><span class="pc bad">L</span><span class="arw">&rarr;</span><span class="pc">ANZÓ</span><span class="pc hit">IS</span></div>',
 porque:'Terminou em OL, o L vira IS: ANZOL, ANZÓIS.',
 proximo:'L no fim? Troque o L por IS.'},

{id:'SPL8', eixo:'plural',
 pede:'QUAL É O PLURAL DE "A NUVEM"?',
 opts:[
  {t:'A NUVENS', no:'O artigo também vai para o plural: A vira AS.'},
  {t:'AS NUVEMS', no:'Terminou em M, o M vira N: NUVENS.'},
  {t:'AS NUVENS', ok:1},
  {t:'AS NUVEM', no:'A palavra NUVEM também tem de ir para o plural.'}
 ],
 dica:'As DUAS palavras vão para o plural. NUVEM termina em M.',
 visual:'<div class="pcs"><span class="pc">A</span><span class="arw">&rarr;</span><span class="pc hit">AS</span></div><div class="pcs"><span class="pc">NUVEM</span><span class="arw">&rarr;</span><span class="pc hit">NUVENS</span></div>',
 porque:'A vira AS, e o M vira NS: AS NUVENS.',
 proximo:'Plural com artigo: mude as DUAS palavras.'}
];

/* truque e origem vêm da família: a frase do truque é IDÊNTICA em todo
   item da família, e a origem é o nome do conteúdo na tela. */
var FAM={}; FAMILIAS.forEach(function(f){ FAM[f.k]=f; });
ITENS.forEach(function(i){
  i.truque = FAM[i.eixo].truque;
  i.origem = 'Português · ' + FAM[i.eixo].nome;
});

return { FAMILIAS: FAMILIAS, ITENS: ITENS,
         acha: function(id){ return ITENS.filter(function(x){ return x.id===id; })[0]||null; } };
})();
