/* ============================================================
   LP3_banco.js — BANCO ÚNICO de Português · 3º trimestre · Y2
   AF de Língua Portuguesa em 14/10/2026.

   Fonte: trabalho/3tri_portugues/_roteiro.md (derivado do informativo
   "Conteúdos das AFs - 3 Tri", Unidades 4 e 5). Nada aqui sai do roteiro.

   Usado por: LP3_jornada (caixas "?" e chefão) e LP3_estudo (treininho
   no fim de cada tema). O simulado tem banco próprio, no formato prova.

   ANATOMIA
     TEMAS[k] = {nome, cor, emoji}
     ITENS    = {id, tema, p, o:[...], c, dica, ex}
       p    pergunta (curta; lida pela Thalita)
       o    3 alternativas (às vezes 4)
       c    índice da certa em o
       dica empurrão antes de responder (nunca a resposta)
       ex   explicação curta mostrada depois (certa ou errada)
   v4 (12/10): ortografia e plural só no formato que a prova cobra
   (escrever a palavra certa); saíram pares de sentido, contagem,
   classificar e teoria. Ver a seção "ORTOGRAFIA E PLURAL — v4".
   ============================================================ */
window.LP3 = (function(){

var TEMAS = {
  conto:   {nome:'Contos de fadas',      cor:'#f472b6', emoji:'🏰'},
  chapeu:  {nome:'Chapeuzinho Vermelho', cor:'#ef4444', emoji:'🧺'},
  joao:    {nome:'João e o pé de feijão',cor:'#22c55e', emoji:'🌱'},
  parodia: {nome:'Paráfrase e paródia',  cor:'#a78bfa', emoji:'🎭'},
  h:       {nome:'Letra H',              cor:'#38bdf8', emoji:'🚁'},
  jg:      {nome:'J ou G',               cor:'#fbbf24', emoji:'🦒'},
  ggu:     {nome:'G ou GU',              cor:'#fb923c', emoji:'🎸'},
  dic:     {nome:'Dicionário',           cor:'#60a5fa', emoji:'📖'},
  invento: {nome:'Invenções e descobertas', cor:'#facc15', emoji:'💡'},
  cqu:     {nome:'C ou QU',   cor:'#34d399', emoji:'🧀'},
  dig:     {nome:'CH · NH · LH',         cor:'#2dd4bf', emoji:'🔑'},
  plural:  {nome:'Plural',               cor:'#f87171', emoji:'🎈'}
};

var ITENS = [
/* ---------------- CONTOS DE FADAS ---------------- */
{id:'co1',tema:'conto',p:'Como começam muitos contos de fadas?',o:['Era uma vez...','Querido diário...','Bom dia, turma!'],c:0,
 dica:'É a frase mais famosa das histórias de fadas.',ex:'Os contos de fadas costumam começar com "Era uma vez...".'},
{id:'co2',tema:'conto',p:'Como costuma terminar um conto de fadas?',o:['E viveram felizes para sempre.','Fim da aula.','Continua amanhã.'],c:0,
 dica:'O final dos contos de fadas costuma ser feliz.',ex:'O final feliz: "e viveram felizes para sempre".'},
{id:'co3',tema:'conto',p:'Quem é o vilão em Chapeuzinho Vermelho?',o:['O Lobo Mau','O caçador','A vovó'],c:0,
 dica:'Vilão é o personagem que faz maldade.',ex:'O vilão é o Lobo Mau: ele engana a Chapeuzinho.'},
{id:'co4',tema:'conto',p:'Qual destes personagens é de um conto de fadas?',o:['O Lobo Mau','Um jogador de futebol','Um piloto de corrida'],c:0,
 dica:'Pense nos personagens de "Era uma vez...".',ex:'O Lobo Mau é personagem da Chapeuzinho Vermelho, um conto de fadas.'},
{id:'co5',tema:'conto',p:'Um conto de fadas é uma história...',o:['inventada, que tem magia','que saiu no jornal de hoje','que ensina a fazer um bolo'],c:0,
 dica:'Feijão que cresce até as nuvens acontece de verdade?',ex:'Conto de fadas é uma história inventada, com magia, contada de geração em geração.'},
{id:'co6',tema:'conto',p:'Qual destes é um elemento MÁGICO de um conto?',o:['Feijões mágicos','Uma mesa','Um caderno'],c:0,
 dica:'Mágico é o que não acontece de verdade.',ex:'Os feijões mágicos fazem nascer um pé de feijão até as nuvens.'},
{id:'co7',tema:'conto',p:'Qual destes é um conto de fadas?',o:['Os Três Porquinhos','A lista do mercado','O calendário'],c:0,
 dica:'Procure a história com "Era uma vez".',ex:'Os Três Porquinhos é um conto de fadas.'},


/* ---------------- CHAPEUZINHO VERMELHO ---------------- */
{id:'ch1',tema:'chapeu',p:'Para quem a Chapeuzinho levava a cesta de doces?',o:['Para a vovó','Para o lobo','Para o caçador'],c:0,
 dica:'Essa pessoa estava doente.',ex:'Ela levava doces para a vovó, que estava doente.'},
{id:'ch2',tema:'chapeu',p:'O que a mãe pediu para a Chapeuzinho?',o:['Não sair do caminho','Correr pela floresta','Conversar com o lobo'],c:0,
 dica:'Foi um conselho para ela ficar segura.',ex:'A mãe avisou: não saia do caminho e não converse com estranhos.'},
{id:'ch3',tema:'chapeu',p:'Por que ela se chamava Chapeuzinho Vermelho?',o:['Usava uma capa com capuz vermelho','Comia morangos','Morava numa casa vermelha'],c:0,
 dica:'Pense na roupa dela.',ex:'Ela usava uma capa com capuz vermelho.'},
{id:'ch4',tema:'chapeu',p:'"Vovó, que olhos grandes você tem!" O que o lobo respondeu?',o:['É para te ver melhor!','É para te ouvir melhor!','É para te devorar!'],c:0,
 dica:'Olhos servem para...',ex:'Olhos grandes: "é para te ver melhor!". Orelhas: ouvir. Boca: devorar.'},
{id:'ch5',tema:'chapeu',p:'"Que boca grande você tem!" O que o lobo respondeu?',o:['É para te devorar!','É para te ver melhor!','É para cantar!'],c:0,
 dica:'É a última fala do lobo.',ex:'"É para te devorar!" é a última fala do lobo no diálogo.'},
{id:'ch6',tema:'chapeu',p:'Como o lobo chegou antes na casa da vovó?',o:['Foi por um atalho','Pegou um avião','Dormiu na floresta'],c:0,
 dica:'Atalho é um caminho mais curto.',ex:'O lobo correu por um atalho e chegou primeiro.'},
{id:'ch7',tema:'chapeu',p:'Quem salvou a Chapeuzinho e a vovó?',o:['O caçador','O Gigante','O João'],c:0,
 dica:'Ele ouviu o barulho e entrou na casa.',ex:'O caçador ouviu, entrou e salvou as duas.'},
{id:'ch8',tema:'chapeu',p:'O que aconteceu PRIMEIRO?',o:['A mãe deu a cesta para a Chapeuzinho','O lobo deitou na cama','O caçador entrou na casa'],c:0,
 dica:'Pense no começo da história.',ex:'Primeiro a mãe entregou a cesta; depois veio o lobo; no fim, o caçador.'},

/* ---------------- JOÃO E O PÉ DE FEIJÃO ---------------- */
{id:'jo1',tema:'joao',p:'João trocou a vaca por quê?',o:['Por feijões mágicos','Por um cavalo','Por uma galinha'],c:0,
 dica:'Foi uma troca que deixou a mãe brava.',ex:'Ele trocou a vaca por feijões mágicos.'},
{id:'jo2',tema:'joao',p:'O que a mãe fez com os feijões?',o:['Jogou pela janela','Cozinhou no jantar','Guardou na gaveta'],c:0,
 dica:'Ela ficou muito brava.',ex:'A mãe ficou brava e jogou os feijões pela janela.'},
{id:'jo3',tema:'joao',p:'Até onde cresceu o pé de feijão?',o:['Até as nuvens','Até o telhado','Até a janela'],c:0,
 dica:'Era um pé de feijão GIGANTE.',ex:'Cresceu até as nuvens, onde ficava o castelo do Gigante.'},
{id:'jo4',tema:'joao',p:'Que animal mágico João levou do castelo?',o:['A galinha dos ovos de ouro','O cavalo voador','O gato de botas'],c:0,
 dica:'Os ovos dela eram muito valiosos.',ex:'A galinha dos ovos de ouro.'},
{id:'jo5',tema:'joao',p:'Com o que João cortou o pé de feijão?',o:['Com um machado','Com uma tesoura','Com uma colher'],c:0,
 dica:'É a ferramenta de cortar árvore.',ex:'Ele cortou o pé de feijão com o machado, e o Gigante caiu.'},
{id:'jo6',tema:'joao',p:'O que aconteceu por ÚLTIMO?',o:['O Gigante caiu','João subiu no pé de feijão','A mãe jogou os feijões'],c:0,
 dica:'Pense no fim da história.',ex:'Por último, João cortou o pé de feijão e o Gigante caiu.'},
{id:'jo7',tema:'joao',p:'Onde morava o Gigante?',o:['Num castelo nas nuvens','Numa casinha na floresta','Embaixo da ponte'],c:0,
 dica:'João teve de subir muito para chegar lá.',ex:'O Gigante morava num castelo, lá em cima das nuvens.'},

/* ---------------- PARÁFRASE E PARÓDIA ---------------- */
{id:'pa1',tema:'parodia',p:'Contar a MESMA história com OUTRAS palavras, sem mudar o que acontece, é...',o:['Paráfrase','Paródia','Poema'],c:0,
 dica:'Nada muda no que acontece.',ex:'Paráfrase: mesma história, outras palavras.'},
{id:'pa2',tema:'parodia',p:'Mudar a história de propósito, para ficar diferente ou engraçada, é...',o:['Paródia','Paráfrase','Dicionário'],c:0,
 dica:'Mudou o que acontece.',ex:'Paródia: imita a história e muda alguma coisa de propósito.'},
{id:'pa3',tema:'parodia',p:'"Chapeuzinho Verde foi de bicicleta levar pizza para o vovô." Isso é...',o:['Paródia','Paráfrase'],c:0,
 dica:'A cor, a comida e a pessoa mudaram?',ex:'Mudou a cor, a comida e o vovô: é paródia.'},
{id:'pa4',tema:'parodia',p:'"A menina da capa vermelha foi levar guloseimas para a avó." Isso é...',o:['Paráfrase','Paródia'],c:0,
 dica:'Guloseimas são doces. Mudou alguma coisa da história?',ex:'É a mesma história com outras palavras: paráfrase.'},
{id:'pa5',tema:'parodia',p:'"João trocou a vaca por sementes de pipoca, e o pé de pipoca estourou até o céu." Isso é...',o:['Paródia','Paráfrase'],c:0,
 dica:'Feijão virou pipoca?',ex:'Trocar feijão por pipoca muda a história de propósito: paródia.'},
{id:'pa6',tema:'parodia',p:'"O menino deu a vaca e ganhou feijões mágicos." Isso é...',o:['Paráfrase','Paródia'],c:0,
 dica:'É o mesmo que acontece na história do João?',ex:'Outras palavras, mesma história: paráfrase.'},
{id:'pa7',tema:'parodia',p:'Numa paródia, dá para reconhecer a história original?',o:['Sim','Não'],c:0,
 dica:'A paródia imita a original.',ex:'Sim: a paródia imita a original e muda só algumas coisas.'},

/* ---------------- ORTOGRAFIA: item escrito à mão que ficou ----------------
   (v4, 12/10) Saíram as perguntas de teoria ("o H tem som?", "qual palavra
   tem som de guê?", "GIGANTE tem quais sons?", "CH, NH e LH fazem...") e a
   de classificar ("qual tem CH e também NH?"). A prova cobra ESCREVER a
   palavra certa; o resto da ortografia está na seção v4, mais abaixo. */
{id:'pl8',tema:'plural',p:'Passe para o plural: O PORQUINHO',o:['OS PORQUINHOS','O PORQUINHOS','OS PORQUINHO'],c:0,
 dica:'As duas palavras mudam.',ex:'O PORQUINHO → OS PORQUINHOS.'},

/* ---------------- DICIONÁRIO ---------------- */
{id:'di1',tema:'dic',p:'No dicionário, as palavras estão em...',o:['ordem alfabética','ordem de tamanho','qualquer ordem'],c:0,
 dica:'A B C D...',ex:'Em ordem alfabética.'},
{id:'di2',tema:'dic',p:'Qual vem PRIMEIRO no dicionário?',o:['BALA','BOLA','BULE'],c:0,
 dica:'Todas começam com B. Olhe a segunda letra.',ex:'BA vem antes de BO, que vem antes de BU.'},
{id:'di3',tema:'dic',p:'Qual vem PRIMEIRO no dicionário?',o:['GATO','LOBO','URSO'],c:0,
 dica:'G, L ou U: qual aparece antes no alfabeto?',ex:'G vem antes de L, que vem antes de U.'},
{id:'di4',tema:'dic',p:'Para que serve o dicionário?',o:['Ver o significado e a escrita certa','Fazer contas','Ver as horas'],c:0,
 dica:'Tem palavras explicadas lá dentro.',ex:'Ele mostra o significado e como a palavra se escreve.'},
{id:'di5',tema:'dic',p:'A palavra explicada no dicionário se chama...',o:['verbete','capítulo','legenda'],c:0,
 dica:'Começa com V.',ex:'Cada palavra explicada é um verbete.'},
{id:'di6',tema:'dic',p:'Qual vem DEPOIS de todas no dicionário?',o:['ZEBRA','CASA','MAPA'],c:0,
 dica:'Qual é a última letra do alfabeto?',ex:'Z é a última letra: ZEBRA vem depois.'},
{id:'di7',tema:'dic',p:'Qual ordem está certa?',o:['CASA · COPO · CUBO','CUBO · CASA · COPO','COPO · CUBO · CASA'],c:0,
 dica:'Segunda letra: A, O, U.',ex:'Casa, copo, cubo: a segunda letra é A, depois O, depois U.'},
{id:'di8',tema:'dic',p:'As palavras no alto da página do dicionário se chamam...',o:['palavras-guia','palavras-chave','títulos'],c:0,
 dica:'Elas guiam você para achar a página.',ex:'As palavras-guia mostram a primeira e a última palavra da página.'},

/* ---------------- INVENÇÕES E DESCOBERTAS ---------------- */
{id:'in1',tema:'invento',p:'Algo criado pelas pessoas, que não existia antes, é uma...',o:['invenção','descoberta','floresta'],c:0,
 dica:'Alguém teve a ideia e construiu.',ex:'Invenção: criada por alguém, não existia antes.'},
{id:'in2',tema:'invento',p:'Encontrar algo que JÁ existia na natureza é uma...',o:['descoberta','invenção','paródia'],c:0,
 dica:'Já estava lá; alguém achou.',ex:'Descoberta: achar algo que já existia, como o fogo.'},
{id:'in3',tema:'invento',p:'Qual destas é uma INVENÇÃO?',o:['A lâmpada','O fogo','A chuva'],c:0,
 dica:'Qual foi construída por pessoas?',ex:'A lâmpada foi inventada. O fogo e a chuva já existiam.'},
{id:'in4',tema:'invento',p:'Quem inventa alguma coisa é o...',o:['inventor','vilão','caçador'],c:0,
 dica:'Inventar → ___.',ex:'Quem inventa é o inventor.'},
{id:'in5',tema:'invento',p:'Santos Dumont é conhecido como o pai...',o:['da aviação','da lâmpada','do telefone'],c:0,
 dica:'O 14-Bis voava.',ex:'O brasileiro Santos Dumont é conhecido como o pai da aviação.'},
{id:'in6',tema:'invento',p:'Qual destas é uma invenção?',o:['A roda','Uma montanha','Um rio'],c:0,
 dica:'Montanha e rio são da natureza.',ex:'A roda foi inventada pelas pessoas.'},
{id:'in7',tema:'invento',p:'Por que as pessoas inventam coisas?',o:['Para resolver problemas e facilitar a vida','Para fazer bagunça','Para assustar'],c:0,
 dica:'Pense na lâmpada: o que ela resolve?',ex:'Invenções resolvem problemas, como a lâmpada que ilumina a noite.'},

];

/* ============================================================
   ORTOGRAFIA E PLURAL — v4 (12/10/2026): SÓ O QUE A PROVA COBRA.
   O que a prova cobra é ESCREVER A PALAVRA CERTA. Então toda pergunta
   daqui é uma destas:
     LAC    completar a palavra com a letra certa (J ou G, G ou GU, C ou QU)
     PAL    completar a palavra com CH, NH ou LH
     CERTA  qual palavra está escrita certo (as erradas são a MESMA
            palavra escrita errado, nunca outra palavra que existe)
     ERR    qual palavra da frase está escrita errado
     FR     qual palavra completa a frase e está escrita certo
     GRUPO  em qual grupo todas estão escritas certo
     FRASES qual frase está toda escrita certo
     PLU / PLD / REGRA(plural)  escrever o plural
   SAÍRAM na v4 (pedido do Paulo, 12/10): pares de SENTIDO (FILA × FILHA,
   SONO × SONHO, MOLA × MOLHA, MINA × MINHA: todas as opções existem e a
   pergunta vira interpretação), CONTAGEM ("quantas palavras têm LH?"),
   CLASSIFICAR ("em qual grupo todas têm NH?") e TEORIA ("qual som?",
   "por que tem U?", "as duas letras têm o mesmo som?"). Dica e explicação
   são curtas: mostram a palavra certa, sem conversa de som e de letra.
   IDS ESTÁVEIS: item que saiu guarda o número (null / pula), para os ids
   dos que ficaram não mudarem.
   ============================================================ */
var V3=0;
function nv(tema,pref,p,o,dica,ex){ ITENS.push({id:pref+(++V3),tema:tema,tipo:'rapida',p:p,o:o,c:0,dica:dica,ex:ex}); }
function pula(n){ V3+=n; }
var DICA={
  h:{ERR:'Leia cada palavra com calma. Uma está escrita errado.',GRUPO:'Confira cada palavra do grupo.',FRASES:'Confira cada palavra da frase.'},
  jg:{LAC:'Com A, O e U, use J: JANELA, JOGO, CAJU.',ERR:'Leia cada palavra com calma. Uma está escrita errado.',GRUPO:'Confira cada palavra do grupo.',FRASES:'Confira cada palavra da frase.'},
  ggu:{LAC:'Lembre: GATO e GORILA, só G. FOGUETE e GUITARRA, com GU.',ERR:'Leia cada palavra com calma. Uma está escrita errado.',GRUPO:'Confira cada palavra do grupo.',FRASES:'Confira cada palavra da frase.'},
  cqu:{LAC:'Lembre: CASA e COPO, só C. QUEIJO e ESQUILO, com QU.',ERR:'Leia cada palavra com calma. Uma está escrita errado.',GRUPO:'Confira cada palavra do grupo.',FRASES:'Confira cada palavra da frase.'},
  dig:{FR:'Lembre como a palavra se escreve.',ERR:'Leia cada palavra com calma. Uma está escrita errado.',GRUPO:'Confira cada palavra do grupo.',FRASES:'Confira cada palavra da frase.'},
  plural:{FR:'Olhe como a palavra termina.',ERR:'Confira as palavras que estão no plural.'}
};
var D_CERTA='Leia as três com calma. Só uma está escrita certo.';
var D_PAL='Leia a palavra inteira e lembre como ela se escreve.';
function LAC(tema,ops,lista){ lista.forEach(function(x){
  /* x = [frase com ___, letra certa, palavra inteira] */
  if(!x){ V3++; return; }
  nv(tema,tema+'L','Complete com '+ops.join(' ou ')+': "'+x[0]+'"',[x[1]].concat(ops.filter(function(l){ return l!==x[1]; })),DICA[tema].LAC,'Escreve-se '+x[2]+', com '+x[1]+'.');
}); }
function FR(tema,lista){ lista.forEach(function(x){
  /* x = [frase com ___, certa, [erradas], explicação] */
  if(!x){ V3++; return; }
  nv(tema,tema+'F','Qual palavra completa a frase e está escrita certo? "'+x[0]+'"',[x[1]].concat(x[2]),DICA[tema].FR,x[3]);
}); }
function ERR(tema,lista){ lista.forEach(function(x){
  /* x = [frase, palavra errada, como se escreve, [outras palavras da frase], nota curta] */
  if(!x){ V3++; return; }
  nv(tema,tema+'E','Uma palavra desta frase está escrita ERRADA. Qual? "'+x[0]+'"',[x[1]].concat(x[3]),DICA[tema].ERR,
    'O certo é '+x[2]+'.'+(x[4]?' '+x[4]:''));
}); }
function GRUPO(tema,lista){ lista.forEach(function(x){
  /* x = [pergunta, [certo, errado, errado], explicação] */
  if(!x){ V3++; return; }
  nv(tema,tema+'G',x[0],x[1],DICA[tema].GRUPO,x[2]);
}); }
function FRASES(tema,lista){ lista.forEach(function(x){
  /* x = [[frase certa, erradas...], explicação] */
  if(!x){ V3++; return; }
  nv(tema,tema+'S','Qual frase está escrita certo?',x[0],DICA[tema].FRASES,x[1]);
}); }
function REGRA(tema,lista){ lista.forEach(function(x){
  /* x = [pergunta, [certa, erradas...], dica, explicação] */
  if(!x){ V3++; return; }
  nv(tema,tema+'R',x[0],x[1],x[2],x[3]);
}); }
function CERTA(tema,lista){ lista.forEach(function(x){
  /* x = [certa, [a mesma palavra escrita errado], nota curta] */
  nv(tema,tema+'K','Qual palavra está escrita certo?',[x[0]].concat(x[1]),D_CERTA,'Escreve-se '+x[0]+(x[2]?', '+x[2]:'')+'.');
}); }
function PAL(lista){ var ops=['CH','NH','LH']; lista.forEach(function(x){
  /* x = [frase com __ dentro da palavra, dupla certa, palavra inteira] */
  nv('dig','digW','Complete a palavra com CH, NH ou LH: "'+x[0]+'"',[x[1]].concat(ops.filter(function(l){ return l!==x[1]; })),D_PAL,'Escreve-se '+x[2]+', com '+x[1]+'.');
}); }
var GR='Em qual grupo TODAS as palavras estão escritas certo?';

/* ---------- LETRA H ---------- */
ERR('h',[
 ['ONTEM FUI AO OSPITAL VISITAR MEU AVÔ.','OSPITAL','HOSPITAL',['ONTEM','AVÔ'],''],
 ['A ORTA DA ESCOLA TEM ALFACE E HORTELÃ.','ORTA','HORTA',['ESCOLA','HORTELÃ'],''],
 ['A PROFESSORA CONTOU UMA ISTÓRIA DE UM HERÓI.','ISTÓRIA','HISTÓRIA',['PROFESSORA','HERÓI'],''],
 ['MEU TIO É UM OMEM MUITO ALTO.','OMEM','HOMEM',['TIO','ALTO'],''],
 ['NAS FÉRIAS, DORMIMOS NUM OTEL PERTO DA PRAIA.','OTEL','HOTEL',['FÉRIAS','PRAIA'],''],
 ['O IPOPÓTAMO E O ELEFANTE TOMARAM BANHO NO RIO.','IPOPÓTAMO','HIPOPÓTAMO',['ELEFANTE','BANHO'],''],
 ['OJE É O DIA DO PASSEIO DA ESCOLA.','OJE','HOJE',['DIA','ESCOLA'],''],
 ['O ELICÓPTERO POUSOU EM CIMA DO HOSPITAL.','ELICÓPTERO','HELICÓPTERO',['HOSPITAL','CIMA'],''],
 ['ANTES DO ALMOÇO, LAVE AS MÃOS: É IGIENE!','IGIENE','HIGIENE',['ALMOÇO','MÃOS'],''],
 ['NO CAFÉ DA MANHÃ, COMI UM HOVO.','HOVO','OVO',['CAFÉ','MANHÃ'],'OVO não tem H.'],
 ['A HUVA ESTAVA DOCE E GELADA.','HUVA','UVA',['DOCE','GELADA'],'UVA não tem H.'],
 ['O BARCO CHEGOU À HILHA DEPOIS DE UMA HORA.','HILHA','ILHA',['BARCO','HORA'],'ILHA não tem H.']
]);
pula(4); /* saíram as 4 de contar palavras com H */
FRASES('h',[
 [['O HOMEM LEVOU O FILHO AO HOSPITAL.','O OMEM LEVOU O FILHO AO HOSPITAL.','O HOMEM LEVOU O FILHO AO OSPITAL.'],'Escreve-se HOMEM e HOSPITAL, com H.'],
 [['A ABELHA VOOU ATÉ A HORTA.','A HABELHA VOOU ATÉ A HORTA.','A ABELHA VOOU ATÉ A ORTA.'],'Escreve-se ABELHA, sem H, e HORTA, com H.'],
 [['O ELEFANTE OUVIU A HISTÓRIA.','O HELEFANTE OUVIU A HISTÓRIA.','O ELEFANTE OUVIU A ISTÓRIA.'],'Escreve-se ELEFANTE, sem H, e HISTÓRIA, com H.'],
 [['NA ESCOLA, CANTAMOS O HINO.','NA HESCOLA, CANTAMOS O HINO.','NA ESCOLA, CANTAMOS O INO.'],'Escreve-se ESCOLA, sem H, e HINO, com H.']
]);
GRUPO('h',[
 [GR,['HOTEL · HINO · HUMANO','OTEL · HINO · HUMANO','HOTEL · INO · UMANO'],'Escreve-se HOTEL, HINO e HUMANO, com H.'],
 [GR,['OVO · UVA · ILHA','HOVO · UVA · ILHA','OVO · HUVA · HILHA'],'OVO, UVA e ILHA não têm H.'],
 [GR,['HÉLICE · HORTA · ANEL','ÉLICE · HORTA · ANEL','HÉLICE · ORTA · HANEL'],'Escreve-se HÉLICE e HORTA, com H. ANEL não tem H.']
]);
REGRA('h',[
 null, null, /* saíram as 2 de teoria do H */
 ['Qual palavra está escrita ERRADA?',['UMANO','HOTEL','OVO'],'Uma delas está escrita errado.','O certo é HUMANO, com H.'],
 ['Qual palavra está escrita ERRADA?',['HANEL','HINO','UVA'],'Uma delas está escrita errado.','O certo é ANEL, sem H.']
]);

/* ---------- J OU G ---------- */
LAC('jg',['J','G'],[
 ['O ___ACARÉ NADOU NO RIO.','J','JACARÉ'],
 ['A MAMÃE FEZ SUCO DE LARAN___A.','J','LARANJA'],
 ['O LEÃO BALANÇOU A ___UBA.','J','JUBA'],
 ['COMI ARROZ, FEI___ÃO E SALADA.','J','FEIJÃO'],
 ['O ___ABUTI ANDA DEVAGAR.','J','JABUTI'],
 ['DEI UM BEI___O NA VOVÓ.','J','BEIJO'],
 null, null, null, null, null, null /* GELO, GIRAFA, PÁGINA, RELÓGIO, JIPE, MÁGICO: viraram "qual está escrita certo" (CERTA, no fim) */
]);
ERR('jg',[
 ['A GIRAFA E O GACARÉ SÃO ANIMAIS.','GACARÉ','JACARÉ',['GIRAFA','ANIMAIS'],''],
 ['COLOQUEI A SOPA NA TIJELA AZUL.','TIJELA','TIGELA',['SOPA','AZUL'],''],
 ['NA COZINHA TEM UMA LARANGA.','LARANGA','LARANJA',['COZINHA','UMA'],''],
 ['O JIPE PASSOU PERTO DA JIRAFA.','JIRAFA','GIRAFA',['JIPE','PERTO'],''],
 ['O QUEIGO E O PÃO ESTÃO NA MESA.','QUEIGO','QUEIJO',['PÃO','MESA'],''],
 ['A FADA FEZ UMA MÁJICA COM A VARINHA.','MÁJICA','MÁGICA',['FADA','VARINHA'],''],
 ['NO PRATO TEM JILÓ E FEIGÃO.','FEIGÃO','FEIJÃO',['JILÓ','PRATO'],''],
 ['O RELÓJIO DA SALA PAROU.','RELÓJIO','RELÓGIO',['SALA','PAROU'],'']
]);
pula(4); /* saíram as 4 de contar */
GRUPO('jg',[
 [GR,['JANELA · JUBA · JOIA','GANELA · JUBA · JOIA','JANELA · JUBA · GOIA'],'Escreve-se JANELA, JUBA e JOIA, com J.'],
 [GR,['GELO · GIRAFA · TIGELA','JELO · GIRAFA · TIGELA','GELO · JIRAFA · TIJELA'],'Escreve-se GELO, GIRAFA e TIGELA, com G.'],
 [GR,['JABUTI · PÁGINA · BEIJO','GABUTI · PÁGINA · BEIJO','JABUTI · PÁJINA · BEIJO'],'Escreve-se JABUTI e BEIJO, com J, e PÁGINA, com G.'],
 ['Qual palavra está escrita certo?',['GIRASSOL','JIRASSOL'],'Escreve-se GIRASSOL, com G.']
]);
FRASES('jg',[
 [['O GIGANTE GUARDOU A JOIA.','O JIGANTE GUARDOU A JOIA.','O GIGANTE GUARDOU A GOIA.'],'Escreve-se GIGANTE, com G, e JOIA, com J.'],
 [['O JABUTI COMEU GELEIA.','O GABUTI COMEU GELEIA.','O JABUTI COMEU JELEIA.'],'Escreve-se JABUTI, com J, e GELEIA, com G.'],
 [['A SUJEIRA FICOU NA PÁGINA.','A SUGEIRA FICOU NA PÁGINA.','A SUJEIRA FICOU NA PÁJINA.'],'Escreve-se SUJEIRA, com J, e PÁGINA, com G.']
]);
pula(3); /* saíram as 3 de teoria */

/* ---------- G OU GU ---------- */
LAC('ggu',['G','GU'],[
 ['NA FESTA, O MENINO TOCOU ___ITARRA.','GU','GUITARRA'],
 ['O FO___ETE SUBIU ATÉ O CÉU.','GU','FOGUETE'],
 ['A FO___EIRA ESQUENTOU A FESTA JUNINA.','GU','FOGUEIRA'],
 ['A Á___IA VOOU BEM ALTO.','GU','ÁGUIA'],
 ['O ___ATO DORMIU NO SOFÁ.','G','GATO'],
 ['O ___ORILA COMEU BANANA.','G','GORILA'],
 ['OS PATOS NADARAM NO LA___O.','G','LAGO'],
 ['A ___ALINHA BOTOU UM OVO.','G','GALINHA'],
 ['O VOVÔ MOLHOU AS PLANTAS COM A MAN___EIRA.','GU','MANGUEIRA'],
 ['A PRE___IÇA DORMIU NO GALHO.','GU','PREGUIÇA']
]);
ERR('ggu',[
 ['AS FORMIGAS FIZERAM UM FORMIGEIRO NO JARDIM.','FORMIGEIRO','FORMIGUEIRO',['FORMIGAS','JARDIM'],''],
 ['NA FESTA, O MENINO TOCOU GITARRA.','GITARRA','GUITARRA',['FESTA','MENINO'],''],
 ['O FOGETE DO DESENHO ERA AZUL.','FOGETE','FOGUETE',['DESENHO','AZUL'],''],
 ['A ÁGIA FEZ O NINHO NA MONTANHA.','ÁGIA','ÁGUIA',['NINHO','MONTANHA'],''],
 ['O GUATO BEBEU O LEITE.','GUATO','GATO',['LEITE','BEBEU'],''],
 ['A FOGEIRA DA FESTA ERA GRANDE.','FOGEIRA','FOGUEIRA',['FESTA','GRANDE'],'']
]);
pula(3); /* saíram as 3 de contar */
GRUPO('ggu',[
 [GR,['GUERRA · FOGUETE · ÁGUIA','GERRA · FOGUETE · ÁGUIA','GUERRA · FOGETE · ÁGIA'],'Escreve-se GUERRA, FOGUETE e ÁGUIA, com GU.'],
 [GR,['GORILA · MANGUEIRA · LAGO','GORILA · MANGEIRA · LAGO','GUORILA · MANGUEIRA · LAGO'],'Escreve-se GORILA e LAGO, só com G, e MANGUEIRA, com GU.']
]);
pula(3); /* saíram as 3 de teoria */
FRASES('ggu',[
 [['A ÁGUIA VIU O FOGUETE.','A ÁGIA VIU O FOGUETE.','A ÁGUIA VIU O FOGETE.'],'Escreve-se ÁGUIA e FOGUETE, com GU.'],
 [['O GATO DORMIU NA MANGUEIRA.','O GUATO DORMIU NA MANGUEIRA.','O GATO DORMIU NA MANGEIRA.'],'Escreve-se GATO, só com G, e MANGUEIRA, com GU.']
]);

/* ---------- C OU QU ---------- */
LAC('cqu',['C','QU'],[
 ['NO LANCHE, COMI PÃO COM ___EIJO.','QU','QUEIJO'],
 ['O ES___ILO GUARDOU NOZES NA ÁRVORE.','QU','ESQUILO'],
 ['O MOS___ITO PICOU MEU BRAÇO.','QU','MOSQUITO'],
 ['A ___ORUJA PIOU DE NOITE.','C','CORUJA'],
 ['O ___AVALO CORREU NO CAMPO.','C','CAVALO'],
 ['BEBI ÁGUA NO ___OPO AZUL.','C','COPO'],
 ['A MÁ___INA DE LAVAR ESTÁ LIGADA.','QU','MÁQUINA'],
 ['CUIDADO: A SOPA ESTÁ ___ENTE!','QU','QUENTE'],
 ['O PERI___ITO É UM PASSARINHO VERDE.','QU','PERIQUITO'],
 ['A ___ASA DA VOVÓ É AMARELA.','C','CASA']
]);
ERR('cqu',[
 ['NO LANCHE TEM PÃO COM CEIJO.','CEIJO','QUEIJO',['LANCHE','PÃO'],''],
 ['O ESCILO SUBIU NA ÁRVORE.','ESCILO','ESQUILO',['SUBIU','ÁRVORE'],''],
 ['O MOSCITO ZUMBIU NA ORELHA.','MOSCITO','MOSQUITO',['ZUMBIU','ORELHA'],''],
 ['A QUASA DA VOVÓ É AMARELA.','QUASA','CASA',['VOVÓ','AMARELA'],''],
 ['MAMÃE COMPROU CIABO NA FEIRA.','CIABO','QUIABO',['MAMÃE','FEIRA'],''],
 ['O MOLECE CORREU PELA RUA.','MOLECE','MOLEQUE',['CORREU','RUA'],'']
]);
pula(3); /* saíram as 3 de contar */
GRUPO('cqu',[
 [GR,['QUEIJO · LEQUE · ESQUILO','CEIJO · LEQUE · ESQUILO','QUEIJO · LECE · ESCILO'],'Escreve-se QUEIJO, LEQUE e ESQUILO, com QU.'],
 [GR,['CAMA · QUIABO · COELHO','QUAMA · QUIABO · COELHO','CAMA · CIABO · COELHO'],'Escreve-se CAMA e COELHO, com C, e QUIABO, com QU.']
]);
pula(3); /* saíram as 3 de teoria */
FRASES('cqu',[
 [['O ESQUILO COMEU O QUIABO.','O ESCILO COMEU O QUIABO.','O ESQUILO COMEU O CIABO.'],'Escreve-se ESQUILO e QUIABO, com QU.'],
 [['O CAVALO BEBEU ÁGUA QUENTE.','O QUAVALO BEBEU ÁGUA QUENTE.','O CAVALO BEBEU ÁGUA CENTE.'],'Escreve-se CAVALO, com C, e QUENTE, com QU.'],
 [['A MÁQUINA FEZ SUCO DE CAQUI.','A MÁCINA FEZ SUCO DE CAQUI.','A MÁQUINA FEZ SUCO DE CACI.'],'Escreve-se MÁQUINA e CAQUI, com QU.']
]);

/* ---------- CH · NH · LH ---------- */
FR('dig',[
 ['A ___ FEZ MEL NA COLMEIA.','ABELHA',['ABENHA','ABECHA'],'Escreve-se ABELHA, com LH.'],
 ['O CAVALO DEITOU NA ___ SECA.','PALHA',['PANHA','PACHA'],'Escreve-se PALHA, com LH.'],
 ['O ___ LATIU PARA O CARTEIRO.','CACHORRO',['CANHORRO','CALHORRO'],'Escreve-se CACHORRO, com CH.'],
 ['A ___ FEZ UMA TEIA NO CANTO DA SALA.','ARANHA',['ARACHA','ARALHA'],'Escreve-se ARANHA, com NH.']
]);
ERR('dig',[
 ['A GALINA FEZ O NINHO NA PALHA.','GALINA','GALINHA',['NINHO','PALHA'],''],
 ['O COENHO COMEU A FOLHA DA ALFACE.','COENHO','COELHO',['FOLHA','ALFACE'],''],
 ['CHAPEUZINHO SEGUIU PELO CAMILHO DA FLORESTA.','CAMILHO','CAMINHO',['CHAPEUZINHO','FLORESTA'],''],
 ['A OVENHA DORMIU PERTO DO CACHORRO.','OVENHA','OVELHA',['CACHORRO','DORMIU'],''],
 ['DEPOIS DO BALHO, ELA CALÇOU O CHINELO.','BALHO','BANHO',['CHINELO','DEPOIS'],''],
 ['GUARDEI O DINHEIRO E A LHAVE NA BOLSA.','LHAVE','CHAVE',['DINHEIRO','BOLSA'],''],
 ['A ABENHA POUSOU NA FLOR DO CAMINHO.','ABENHA','ABELHA',['CAMINHO','FLOR'],''],
 ['NA COZILHA, A VOVÓ FEZ CHOCOLATE QUENTE.','COZILHA','COZINHA',['VOVÓ','CHOCOLATE'],''],
 ['CAÍ NO PARQUE E RALEI O JOENHO.','JOENHO','JOELHO',['PARQUE','RALEI'],'']
]);
pula(5); /* saíram as 5 de contar */
GRUPO('dig',[
 [GR,['FOLHA · OLHO · ABELHA','FONHA · OLHO · ABELHA','FOLHA · OLHO · ABENHA'],'Escreve-se FOLHA, OLHO e ABELHA, com LH.'],
 [GR,['UNHA · BANHO · ARANHA','ULHA · BANHO · ARANHA','UNHA · BALHO · ARALHA'],'Escreve-se UNHA, BANHO e ARANHA, com NH.'],
 [GR,['CHAPÉU · CHINELO · CACHORRO','LHAPÉU · CHINELO · CACHORRO','CHAPÉU · CHINELO · CANHORRO'],'Escreve-se CHAPÉU, CHINELO e CACHORRO, com CH.'],
 null, null /* saíram as 2 de "qual não tem a mesma dupla" */
]);
pula(6); /* saíram os 6 pares de sentido: FILA/FILHA, MOLA/MOLHA, MINA/MINHA, SONO/SONHO */
pula(1); /* saiu "MOLA virou MOLHA: o que aconteceu?" */
FRASES('dig',[
 [['A OVELHA DORMIU NA PALHA.','A OVENHA DORMIU NA PALHA.','A OVELHA DORMIU NA PANHA.'],'Escreve-se OVELHA e PALHA, com LH.'],
 [['O CACHORRO ACHOU UM NINHO.','O CANHORRO ACHOU UM NINHO.','O CACHORRO ACHOU UM NILHO.'],'Escreve-se CACHORRO, com CH, e NINHO, com NH.'],
 [['CHAPEUZINHO SEGUIU PELO CAMINHO.','CHAPEUZILHO SEGUIU PELO CAMINHO.','CHAPEUZINHO SEGUIU PELO CAMILHO.'],'Escreve-se CHAPEUZINHO e CAMINHO, com NH.']
]);

/* ---------- PLURAL: numa frase, com o número pedindo o plural ---------- */
function PLU(lista){ lista.forEach(function(x){
  /* x = [frase com ___ , singular, certa, [erradas], regra curta] */
  nv('plural','plF','Complete a frase com o plural de '+x[1]+': "'+x[0]+'"',[x[2]].concat(x[3]),DICA.plural.FR,x[1]+' → '+x[2]+': '+x[4]+'.');
}); }
PLU([
 ['NO CÉU PASSARAM DOIS ___.','AVIÃO','AVIÕES',['AVIÃOS','AVIÕS'],'ÃO vira ÕES'],
 ['NO JARDIM NASCERAM MUITAS ___.','FLOR','FLORES',['FLORS','FLORIS'],'R ganha ES'],
 ['NO ZOOLÓGICO VIMOS VÁRIOS ___.','ANIMAL','ANIMAIS',['ANIMALS','ANIMALES'],'AL vira AIS'],
 ['NA FESTA, AS CRIANÇAS SOLTARAM ___ COLORIDOS.','BALÃO','BALÕES',['BALÃOS','BALÕS'],'ÃO vira ÕES'],
 ['NO CÉU HAVIA MUITAS ___ BRANCAS.','NUVEM','NUVENS',['NUVEMS','NUVEIS'],'M vira NS'],
 ['DOIS ___ CONVERSAVAM NA PRAÇA.','HOMEM','HOMENS',['HOMEMS','HOMEMES'],'M vira NS'],
 ['NA MESA HAVIA QUATRO ___.','COLHER','COLHERES',['COLHERS','COLHERIS'],'R ganha ES'],
 ['DE NOITE, ACENDEMOS AS ___ DA CASA.','LUZ','LUZES',['LUZS','LUZIS'],'Z ganha ES'],
 ['NO DOMINGO, O PAPAI LEU DOIS ___.','JORNAL','JORNAIS',['JORNALS','JORNALES'],'AL vira AIS'],
 ['OS TRÊS ___ FIZERAM SUAS CASAS.','PORQUINHO','PORQUINHOS',['PORQUINHOES','PORQUINHONS'],'ganha S'],
 ['O PESCADOR LEVOU DOIS ___.','ANZOL','ANZÓIS',['ANZOLS','ANZOLES'],'OL vira ÓIS'],
 ['NO ZOOLÓGICO, DOIS ___ RUGIRAM.','LEÃO','LEÕES',['LEÃOS','LEÕS'],'ÃO vira ÕES'],
 ['A CAMISA TEM CINCO ___.','BOTÃO','BOTÕES',['BOTÃOS','BOTÕS'],'ÃO vira ÕES'],
 ['NA ESTAÇÃO PASSARAM DOIS ___.','TREM','TRENS',['TREMS','TREMES'],'M vira NS'],
 ['A GALINHA BOTOU SEIS ___.','OVO','OVOS',['OVOES','OVONS'],'ganha S'],
 ['NA FEIRA, MAMÃE COMPROU TRÊS ___.','LIMÃO','LIMÕES',['LIMÃOS','LIMÕS'],'ÃO vira ÕES'],
 ['NA PRAIA, VIMOS DOIS ___ DIFERENTES.','MAR','MARES',['MARS','MARIS'],'R ganha ES']
]);
REGRA('plural',[
 ['Passe para o plural: A CASA',['AS CASAS','A CASAS','AS CASA'],'As duas palavras mudam.','A CASA → AS CASAS.'],
 ['Passe para o plural: O LOBO',['OS LOBOS','O LOBOS','OS LOBO'],'As duas palavras mudam.','O LOBO → OS LOBOS.'],
 ['Passe para o plural: A NUVEM',['AS NUVENS','A NUVENS','AS NUVEMS'],'As duas palavras mudam.','A NUVEM → AS NUVENS.'],
 null, null, null /* saíram as 3 de "qual destas faz o plural com ES / ÕES / IS" */
]);
ERR('plural',[
 ['OS ANIMALS COMERAM AS FLORES.','ANIMALS','ANIMAIS',['FLORES','COMERAM'],''],
 ['AS CRIANÇAS VIRAM DOIS AVIÃOS E TRÊS BALÕES.','AVIÃOS','AVIÕES',['BALÕES','CRIANÇAS'],''],
 ['OS HOMEMS ACENDERAM AS LUZES.','HOMEMS','HOMENS',['LUZES','ACENDERAM'],'']
]);

/* ---------- v4: itens NOVOS (no fim, para não mexer nos ids de cima) ---------- */
CERTA('h',[
 ['HOJE',['OJE','HOGE'],'com H'],
 ['HOMEM',['OMEM','HOMEN'],'com H'],
 ['HOSPITAL',['OSPITAL','HOSPITAU'],'com H'],
 ['HIPOPÓTAMO',['IPOPÓTAMO','HIPOPÓTAMU'],'com H'],
 ['HISTÓRIA',['ISTÓRIA','HISTÓRRIA'],'com H'],
 ['HELICÓPTERO',['ELICÓPTERO','HELICÓPITERO'],'com H'],
 ['OVO',['HOVO','OVU'],'sem H'],
 ['ILHA',['HILHA','ILIA'],'sem H']
]);
CERTA('jg',[
 ['GELO',['JELO','GELU'],'com G'],
 ['GIRAFA',['JIRAFA','GIRRAFA'],'com G'],
 ['PÁGINA',['PÁJINA','PÁGENA'],'com G'],
 ['RELÓGIO',['RELÓJIO','RELÓGEO'],'com G'],
 ['JIPE',['GIPE','JIPI'],'com J'],
 ['MÁGICO',['MÁJICO','MÁGECO'],'com G'],
 ['GELADEIRA',['JELADEIRA','GELADERA'],'com G'],
 ['GIGANTE',['JIGANTE','GIGANTI'],'com G'],
 ['JEITO',['GEITO','JEITU'],'com J'],
 ['CANJICA',['CANGICA','CAMJICA'],'com J'],
 ['GENTE',['JENTE','GENTI'],'com G'],
 ['TIGELA',['TIJELA','TEGELA'],'com G'],
 ['SUJEIRA',['SUGEIRA','SUJERA'],'com J']
]);
CERTA('ggu',[
 ['FOGUETE',['FOGETE','FOGUETI'],'com GU'],
 ['GUERRA',['GERRA','GUERA'],'com GU'],
 ['FORMIGUEIRO',['FORMIGEIRO','FORMIGUERO'],'com GU'],
 ['PREGUIÇA',['PREGIÇA','PREGUISSA'],'com GU'],
 ['GUINDASTE',['GINDASTE','GUIMDASTE'],'com GU'],
 ['FOGUEIRA',['FOGEIRA','FOGUERA'],'com GU'],
 ['MANGUEIRA',['MANGEIRA','MANGUERA'],'com GU']
]);
CERTA('cqu',[
 ['ESQUILO',['ESCILO','ESQILO'],'com QU'],
 ['MÁQUINA',['MÁCINA','MÁQINA'],'com QU'],
 ['PERIQUITO',['PERICITO','PERIQITO'],'com QU'],
 ['QUIABO',['CIABO','QIABO'],'com QU'],
 ['MOLEQUE',['MOLECE','MOLEQE'],'com QU'],
 ['QUENTE',['CENTE','QENTE'],'com QU']
]);
PAL([
 ['A GALI__A BOTOU UM OVO.','NH','GALINHA'],
 ['A ABE__A FEZ MEL.','LH','ABELHA'],
 ['CAIU MUITA __UVA HOJE.','CH','CHUVA'],
 ['O CA__ORRO LATIU.','CH','CACHORRO'],
 ['CHAPEUZINHO SEGUIU PELO CAMI__O.','NH','CAMINHO'],
 ['O VENTO LEVOU A FO__A DA ÁRVORE.','LH','FOLHA'],
 ['O COE__O COMEU CENOURA.','LH','COELHO'],
 ['A ARA__A FEZ UMA TEIA.','NH','ARANHA'],
 ['O MENINO CALÇOU O __INELO.','CH','CHINELO'],
 ['A OVE__A DORMIU NO PASTO.','LH','OVELHA'],
 ['A VOVÓ FEZ BOLO NA COZI__A.','NH','COZINHA'],
 ['GUARDEI O DI__EIRO NO COFRE.','NH','DINHEIRO']
]);
CERTA('dig',[
 ['COELHO',['COENHO','COELIO'],'com LH'],
 ['CACHORRO',['CANHORRO','CACHORO'],'com CH'],
 ['ABELHA',['ABENHA','ABELA'],'com LH'],
 ['GALINHA',['GALILHA','GALINIA'],'com NH'],
 ['ARANHA',['ARALHA','ARANIA'],'com NH'],
 ['JOELHO',['JOENHO','JOELIO'],'com LH']
]);
[['Qual é o plural de NARIZ?',['NARIZES','NARIZS','NARIZIS'],'NARIZ → NARIZES.'],
 ['Qual é o plural de VARAL?',['VARAIS','VARALS','VARALES'],'VARAL → VARAIS.'],
 ['Passe para o plural: A FLOR',['AS FLORES','A FLORES','AS FLORS'],'A FLOR → AS FLORES.'],
 ['Passe para o plural: O LEÃO',['OS LEÕES','O LEÕES','OS LEÃOS'],'O LEÃO → OS LEÕES.']
].forEach(function(x){ nv('plural','plD',x[0],x[1],'Olhe como a palavra termina.',x[2]); });

/* dicionário v3: palavras-guia em uso (achar a página certa) */
[['BALA','BULE','BONÉ',['CASA','ABELHA'],'BA... BO... BU: BONÉ fica entre BALA e BULE.'],
 ['GATO','GOLA','GELO',['FADA','HORA'],'GA... GE... GO: GELO fica entre GATO e GOLA.'],
 ['MAPA','MOLA','MESA',['NUVEM','LOBO'],'MA... ME... MO: MESA fica entre MAPA e MOLA.'],
 ['JABUTI','JANELA','JACARÉ',['GATO','LUA'],'JAB... JAC... JAN: JACARÉ fica entre JABUTI e JANELA.']
].forEach(function(x,i){ ITENS.push({id:'rdg'+i,tema:'dic',tipo:'rapida',
  p:'No alto de uma página do dicionário estão as palavras-guia '+x[0]+' e '+x[1]+'. Qual destas palavras está nessa página?',
  o:[x[2]].concat(x[3]),c:0,dica:'A palavra tem de vir DEPOIS de '+x[0]+' e ANTES de '+x[1]+' na ordem alfabética.',ex:x[4]}); });

/* dicionário: qual vem primeiro / por último (v4: os 2 primeiros trios eram
   iguais a di2 e di3; trocados por DADO/DEDO/DOCE e RATO/PATO/MATO) */
function ordena(a){ return a.slice().sort(function(x,y){ return x.localeCompare(y,'pt'); }); }
[['DADO','DEDO','DOCE'],['RATO','PATO','MATO'],['CASA','COPO','CUBO'],['ABELHA','BOLA','CASA'],['FADA','FOGO','FUMAÇA'],
 ['LOBO','LUA','LAGO'],['MESA','MAPA','MOLA'],['PATO','PIPA','PENA'],['VACA','VELA','VIOLA'],['SAPO','SOL','SINO'],
 ['CASA','CAVALO','CAMA'],['JOÃO','GIGANTE','HARPA']
].forEach(function(t,i){
  var ord=ordena(t), ult=i%3===2;
  var certo=ult?ord[2]:ord[0];
  var o=[certo].concat(t.filter(function(w){ return w!==certo; }));
  ITENS.push({id:'rdc'+i,tema:'dic',tipo:'rapida',p:'Qual vem '+(ult?'POR ÚLTIMO':'PRIMEIRO')+' no dicionário?',o:o,c:0,
    dica:'Compare a primeira letra. Se for igual, compare a segunda.',ex:'Ordem: '+ord.join(' · ')+'.'});
});

/* paráfrase × paródia: frases novas (não só Chapeuzinho e João) */
[['Os três porquinhos fizeram casas de chocolate, e o lobo comeu todas.','Paródia','casas de chocolate mudam a história'],
 ['Três irmãos porquinhos construíram suas casas: uma de palha, uma de madeira e uma de tijolos.','Paráfrase','é a mesma história com outras palavras'],
 ['A menina de capuz vermelho atravessou a mata para visitar a avó.','Paráfrase','mata é floresta; nada mudou'],
 ['Chapeuzinho Vermelho levou o celular e chamou a polícia quando viu o lobo.','Paródia','o celular muda a história de propósito'],
 ['O garoto subiu pelo pé de feijão e chegou ao castelo nas nuvens.','Paráfrase','é o que acontece na história, com outras palavras'],
 ['João subiu no pé de feijão e encontrou um gigante que só queria um amigo para jogar videogame.','Paródia','o gigante do videogame foi inventado para ficar engraçado'],
 ['O lobo se vestiu de vovó e deitou na cama dela.','Paráfrase','é o que acontece na história'],
 ['O Lobo Mau abriu uma loja de doces e ficou amigo de todos.','Paródia','o final mudou de propósito']
].forEach(function(x,i){ ITENS.push({id:'rpp'+i,tema:'parodia',tipo:'rapida',p:'"'+x[0]+'" Isso é...',o:x[1]==='Paródia'?['Paródia','Paráfrase']:['Paráfrase','Paródia'],c:0,
  dica:'Mudou o que acontece na história original?',ex:x[1]+': '+x[2]+'.'}); });

/* invenção × descoberta */
[['A roda','Invenção'],['A lâmpada','Invenção'],['O telefone','Invenção'],['O avião','Invenção'],['A bicicleta','Invenção'],
 ['O computador','Invenção'],['A geladeira','Invenção'],['O fogo','Descoberta'],['Um animal que ninguém conhecia, encontrado na floresta','Descoberta'],
 ['Uma planta nova encontrada na mata','Descoberta']
].forEach(function(x,i){ ITENS.push({id:'rid'+i,tema:'invento',tipo:'rapida',p:x[0]+' é...',o:x[1]==='Invenção'?['Invenção','Descoberta']:['Descoberta','Invenção'],c:0,
  dica:'Foi criada pelas pessoas ou já existia?',ex:x[1]==='Invenção'?'Invenção: foi criada pelas pessoas e não existia antes.':'Descoberta: já existia; alguém encontrou.'}); });

/* v2 — conto como GÊNERO, sinônimos da paráfrase, paródia de música,
   palavra com mais de um significado (roteiro v2) */
[
 ['conto','Num conto de fadas, o que acontece no MEIO da história?',['Aparece um problema','Era uma vez...','Viveram felizes para sempre'],'No meio aparece o problema. "Era uma vez" é o começo; "felizes para sempre", o fim.'],
 ['conto','"Era uma vez..." aparece em que parte do conto?',['No começo','No meio','No fim'],'É o começo: apresenta o tempo, os personagens e o lugar.'],
 ['conto','"Era uma vez" mostra um tempo...',['que não se sabe quando foi','que é hoje','que é amanhã'],'"Era uma vez" e "há muito tempo" mostram um tempo que não se sabe quando foi.'],
 ['conto','Qual destes é um SER MÁGICO dos contos de fadas?',['Uma fada','Um professor','Um motorista'],'Fadas, bruxas, gigantes e animais que falam são seres mágicos.'],
 ['conto','Qual destes é um conto de fadas?',['Cinderela','O jornal de hoje','A conta de luz'],'Cinderela é conto de fadas, como Branca de Neve e A Bela Adormecida.'],
 ['conto','Os contos de fadas são histórias...',['antigas, contadas de geração em geração','que aconteceram ontem','escritas só no computador'],'São histórias antigas que as pessoas contavam umas para as outras e depois foram escritas.'],
 ['conto','Na Chapeuzinho Vermelho, qual é o elemento MÁGICO?',['Um lobo que fala','A cesta de doces','A casa da vovó'],'Lobo que fala não existe de verdade: é a magia da história.'],
 ['conto','Em João e o pé de feijão, qual é o elemento MÁGICO?',['Os feijões que crescem até as nuvens','A vaca','A janela'],'Feijões mágicos, galinha dos ovos de ouro e harpa que canta são a magia.'],
 ['parodia','Na paráfrase, a gente troca palavras por...',['sinônimos, palavras de mesmo sentido','palavras de sentido contrário','números'],'Sinônimos: menina = garota, floresta = mata.'],
 ['parodia','Qual é um sinônimo de MENINA?',['garota','menino','mulher'],'Menina e garota querem dizer a mesma coisa.'],
 ['parodia','Qual é um sinônimo de FLORESTA?',['mata','deserto','praia'],'Floresta e mata querem dizer a mesma coisa.'],
 ['parodia','Qual é um sinônimo de DOCES?',['guloseimas','legumes','salgados'],'Doces e guloseimas querem dizer a mesma coisa.'],
 ['parodia','Qual é um sinônimo de GRANDE?',['enorme','pequeno','baixo'],'Grande e enorme querem dizer a mesma coisa.'],
 ['parodia','Qual é um sinônimo de BRAVO?',['zangado','alegre','calmo'],'Bravo e zangado querem dizer a mesma coisa.'],
 ['parodia','"Ciranda, cirandinha, vamos todos estudar" é uma paródia de qual música?',['Ciranda, cirandinha','Parabéns a você','Borboletinha'],'Mesma melodia, letra mudada de propósito: paródia de "Ciranda, cirandinha" (a original diz "vamos todos cirandar").'],
 ['parodia','Paródia também pode ser feita com...',['música, mudando a letra','números','mapas'],'Na paródia de música, a melodia fica e a letra muda.'],
 ['parodia','Na paráfrase, o SENTIDO da história...',['continua igual','muda de propósito','fica engraçado'],'Paráfrase muda as palavras, não o sentido.'],
 ['dic','MANGA pode ser fruta e também parte da camisa. Isso mostra que uma palavra...',['pode ter mais de um significado','não está no dicionário','está escrita errado'],'O dicionário mostra todos os significados da palavra.'],
 ['dic','PENA pode ser das aves e também sentir dó. No dicionário você vai achar...',['os dois significados','só um significado','nenhum significado'],'Uma palavra pode ter mais de um significado, e o dicionário mostra todos.']
].forEach(function(x,i){ ITENS.push({id:'v2c'+i,tema:x[0],tipo:'conceito',p:x[1],o:x[2],c:0,
  dica:'Releia a pergunta com calma e pense na regra.',ex:x[3]}); });

/* tipo dos itens escritos à mão */
var TIPO={h:'rapida',jg:'rapida',ggu:'rapida',cqu:'rapida',dig:'rapida',plural:'rapida',dic:'conceito',
  conto:'conceito',parodia:'conceito',invento:'conceito',chapeu:'leitura',joao:'leitura'};
ITENS.forEach(function(i){ if(!i.tipo) i.tipo=TIPO[i.tema]; });

function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

return {TEMAS:TEMAS, ITENS:ITENS,
  doTema:function(k){ return ITENS.filter(function(i){ return i.tema===k; }); },
  /* sorteia n itens dos temas pedidos (opcional: só de um tipo) */
  sorteia:function(temas,n,tipo){
    var pool=ITENS.filter(function(i){ return temas.indexOf(i.tema)>=0 && (!tipo||i.tipo===tipo); });
    return embaralha(pool).slice(0,n);
  }};
})();
