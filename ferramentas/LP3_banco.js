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
   v3 (12/10): ortografia e plural reescritos NO JEITO DA PROVA (frase
   com sentido, achar o erro, contar, classificar, explicar a regra);
   ver a seção "ORTOGRAFIA E PLURAL — v3".
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

/* ---------------- ORTOGRAFIA: itens escritos à mão que ficaram ----------------
   (v3, 12/10) Saíram os "Complete: ___AVE (abre a porta)": lacuna solta com
   pista de adivinhação não treina a regra e não é o jeito da prova. Ficaram
   só as perguntas de REGRA e de leitura; o resto da ortografia está mais
   abaixo, em frases com sentido (seção v3). */
{id:'h3',tema:'h',p:'O H no começo da palavra tem som?',o:['Não: ele não tem som, mas é escrito','Sim: tem som de R','Sim: tem som de A'],c:0,
 dica:'Fale "hora" bem devagar. Você ouve alguma coisa antes do O?',ex:'O H no começo não tem som: hora, hoje, homem. Mesmo assim ele é escrito.'},
{id:'jg7',tema:'jg',p:'Com A, O e U, o som de jê se escreve com...',o:['J','G','os dois'],c:0,
 dica:'GA, GO e GU fazem outro som, como em GATO.',ex:'JA, JO, JU: sempre J. (GA, GO, GU fazem som de guê.)'},
{id:'gg4',tema:'ggu',p:'Em GUERRA, o U...',o:['fica quietinho, não se fala','faz som de U','pode ser apagado'],c:0,
 dica:'Fale GUERRA em voz alta.',ex:'Em GUE e GUI, o U não se fala. Mas sem ele GERRA soaria com jê.'},
{id:'gg6',tema:'ggu',p:'Qual palavra tem som de guê?',o:['GORILA','GELO','GIRAFA'],c:0,
 dica:'GE e GI soam jê.',ex:'GORILA: GO soa guê. GELO e GIRAFA soam jê.'},
{id:'gg9',tema:'ggu',p:'GIGANTE tem quais sons?',o:['jê (GI) e guê (GAN)','só guê','só jê'],c:0,
 dica:'Fale GI-GAN-TE devagar.',ex:'GI soa jê, GAN soa guê. Duas regras numa palavra só!'},
{id:'cq7',tema:'cqu',p:'Antes de E e I, o som de quê se escreve com...',o:['QU','C','CH'],c:0,
 dica:'Pense em QUEIJO e QUIABO.',ex:'QUE e QUI. Antes de A, O e U, é só C: casa, copo, cubo.'},
{id:'dg9',tema:'dig',p:'CH, NH e LH são duas letras que fazem...',o:['um som só','dois sons','nenhum som'],c:0,
 dica:'Fale CHA-VE: o CH faz um barulho só.',ex:'Duas letras, um som só.'},
{id:'dg10',tema:'dig',p:'Qual palavra tem CH e também NH?',o:['CHAPEUZINHO','CHUVA','NINHO'],c:0,
 dica:'Procure as duas duplas na mesma palavra.',ex:'CHAPEUZINHO: CH no começo, NH no fim. CHUVA só tem CH; NINHO só tem NH.'},
{id:'pl8',tema:'plural',p:'Passe para o plural: O PORQUINHO',o:['OS PORQUINHOS','O PORQUINHOS','OS PORQUINHO'],c:0,
 dica:'O artigo também vai para o plural.',ex:'O → OS, porquinho → porquinhos. As duas palavras mudam.'},
{id:'pl11',tema:'plural',p:'Qual frase fala de MAIS DE UM bicho?',o:['OS COELHOS COMERAM CENOURA.','O COELHO COMEU CENOURA.','A MENINA VIU O COELHO.'],c:0,
 dica:'Plural é mais de um. Procure o S no fim.',ex:'OS COELHOS: plural, mais de um. Nas outras frases há um coelho só.'},

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
   ORTOGRAFIA E PLURAL — v3 (12/10/2026): NO JEITO DA PROVA.
   A v2 tinha "Complete: ___AVE (abre a porta)" e "Qual está escrita
   certo? HOJE · OJE": lacuna solta + pista de adivinhar. Não é assim que
   a escola cobra. A revisão do 2º tri (trabalho/2tri_portugues/conteudo/)
   mostra: a regra é dita e depois APLICADA ("Aprendemos que usamos M
   antes de P e B. Registre as palavras corretamente"), e os aspectos
   linguísticos vêm DENTRO de um texto ("O diálogo abaixo está sem
   pontuação. Leia atentamente e complete o texto"). Então cada pergunta
   aqui faz a criança PENSAR, sempre numa frase com sentido:
     LAC    frase com uma lacuna; a REGRA decide a letra (J/G, G/GU, C/QU)
     FR     frase com lacuna; escolher a palavra escrita certo
     ERR    achar a palavra escrita ERRADA na frase (e o ex corrige)
     CONTA  contar, na frase, as palavras com a dupla/som pedido
            (a conta é feita aqui pelo próprio código: não tem erro)
     GRUPO  achar o grupo em que todas seguem a regra / a palavra intrusa
     FRASES qual das frases está toda escrita certo
     PAR    MOLA × MOLHA, FILA × FILHA: só uma combina com a frase
     REGRA  explicar o porquê
   Distrator: palavra que NÃO existe (GALILHA, FOGETE, CEIJO...), ou,
   no PAR, palavra real que não combina com a frase.
   ============================================================ */
var V3=0;
function nv(tema,pref,p,o,dica,ex){ ITENS.push({id:pref+(++V3),tema:tema,tipo:'rapida',p:p,o:o,c:0,dica:dica,ex:ex}); }
var DICA={
  h:{LAC:'',ERR:'O H do começo não tem som: não dá para ouvir. Lembre como cada palavra aparece escrita.',CONTA:'Olhe só a PRIMEIRA letra de cada palavra.',GRUPO:'Confira a primeira letra de cada palavra do grupo.',FRASES:'Confira as palavras que começam com vogal e as que começam com H.'},
  jg:{LAC:'Olhe a letra que vem DEPOIS da lacuna. A, O, U pedem J. Com E e I, lembre como a palavra se escreve.',ERR:'GA, GO, GU nunca soam jê. Procure a palavra que ficou com o som errado.',CONTA:'Leia cada palavra em voz alta e escute o som de jê.',GRUPO:'Confira as três palavras de cada grupo.',FRASES:'Confira cada palavra que tem som de jê.'},
  ggu:{LAC:'Depois da lacuna vem E ou I e o som é de guê? Então precisa do U.',ERR:'Leia a palavra do jeito que está escrita: GE e GI soam jê.',CONTA:'Procure GUE e GUI, com o U que não se fala.',GRUPO:'Confira as três palavras de cada grupo.',FRASES:'Confira as palavras com som de guê.'},
  cqu:{LAC:'Depois da lacuna vem E ou I e o som é de quê? Então é QU.',ERR:'Leia a palavra do jeito que está escrita: CE e CI soam sê e si.',CONTA:'Procure QUE e QUI.',GRUPO:'Confira as três palavras de cada grupo.',FRASES:'Confira as palavras com som de quê.'},
  dig:{FR:'Leia a frase inteira. Depois leia cada palavra em voz alta e pense em como ela se escreve.',ERR:'Procure a palavra em que a dupla CH, NH ou LH foi trocada.',CONTA:'Procure a dupla pedida no meio e no começo das palavras.',GRUPO:'Confira as três palavras de cada grupo.',FRASES:'Confira as palavras que têm CH, NH ou LH.',PAR:'As duas palavras existem. Leia a frase com cada uma: só uma faz sentido.'},
  plural:{FR:'Olhe como a palavra entre parênteses TERMINA: vogal, R ou Z, ÃO, L ou M.',ERR:'Confira o final de cada palavra que está no plural.'}
};
function LAC(tema,regra,ops,lista){ lista.forEach(function(x){
  /* x = [frase com ___, letra certa, palavra inteira] */
  nv(tema,tema+'L','Complete com '+ops.join(' ou ')+': "'+x[0]+'"',[x[1]].concat(ops.filter(function(l){ return l!==x[1]; })),DICA[tema].LAC,x[2]+'. '+regra(x));
}); }
function FR(tema,lista){ lista.forEach(function(x){
  /* x = [frase com ___, certa, [erradas], explicação] */
  nv(tema,tema+'F','Qual palavra completa a frase e está escrita certo? "'+x[0]+'"',[x[1]].concat(x[2]),DICA[tema].FR,x[3]);
}); }
function ERR(tema,lista){ lista.forEach(function(x){
  /* x = [frase, palavra errada, como se escreve, [outras palavras da frase], regra] */
  nv(tema,tema+'E','Uma palavra desta frase está escrita ERRADA. Qual? "'+x[0]+'"',[x[1]].concat(x[3]),DICA[tema].ERR,
    x[1]+' está errada: o certo é '+x[2]+'. '+x[4]);
}); }
var ALVO={
  h:{rot:'começam com H',re:/^H/},
  jg:{rot:'têm o som de jê',re:/J|G[EIÉÍÊ]/},
  ggu:{rot:'têm GUE ou GUI (o U que não se fala)',re:/GU[EIÉÍÊ]/},
  cqu:{rot:'têm QUE ou QUI',re:/QU[EIÉÍÊ]/},
  CH:{rot:'têm CH',re:/CH/}, NH:{rot:'têm NH',re:/NH/}, LH:{rot:'têm LH',re:/LH/}
};
function CONTA(tema,lista){ lista.forEach(function(x){
  /* x = [frase, chave do ALVO, nota para o ex]. A resposta é CONTADA aqui. */
  var a=ALVO[x[1]], ws=x[0].replace(/[.,!?:;"]/g,'').split(/\s+/).filter(function(w){ return w && a.re.test(w); });
  var n=ws.length, o=[String(n),String(n+1),String(n>0?n-1:n+2)];
  nv(tema,tema+'C','Quantas palavras desta frase '+a.rot+'? "'+x[0]+'"',o,DICA[tema].CONTA,
    (n?'São '+n+': '+ws.join(', ')+'.':'Nenhuma.')+(x[2]?' '+x[2]:''));
}); }
function GRUPO(tema,lista){ lista.forEach(function(x){
  /* x = [pergunta, [certo, errado, errado], explicação] */
  nv(tema,tema+'G',x[0],x[1],DICA[tema].GRUPO||'Confira cada palavra.',x[2]);
}); }
function FRASES(tema,lista){ lista.forEach(function(x){
  /* x = [[frase certa, erradas...], explicação] */
  nv(tema,tema+'S','Qual frase está escrita certo?',x[0],DICA[tema].FRASES,x[1]);
}); }
function PAR(tema,lista){ lista.forEach(function(x){
  /* x = [frase com ___, certa, [outras], explicação] */
  nv(tema,tema+'P','Qual palavra combina com a frase? "'+x[0]+'"',[x[1]].concat(x[2]),DICA[tema].PAR,x[3]);
}); }
function REGRA(tema,lista){ lista.forEach(function(x){
  /* x = [pergunta, [certa, erradas...], dica, explicação] */
  nv(tema,tema+'R',x[0],x[1],x[2],x[3]);
}); }

/* ---------- LETRA H ---------- */
var H_MUDO='O H do começo não tem som, mas é escrito.';
ERR('h',[
 ['ONTEM FUI AO OSPITAL VISITAR MEU AVÔ.','OSPITAL','HOSPITAL',['ONTEM','AVÔ'],H_MUDO+' ONTEM e AVÔ não têm H.'],
 ['A ORTA DA ESCOLA TEM ALFACE E HORTELÃ.','ORTA','HORTA',['ESCOLA','HORTELÃ'],H_MUDO+' HORTELÃ já está certa, com H.'],
 ['A PROFESSORA CONTOU UMA ISTÓRIA DE UM HERÓI.','ISTÓRIA','HISTÓRIA',['PROFESSORA','HERÓI'],H_MUDO],
 ['MEU TIO É UM OMEM MUITO ALTO.','OMEM','HOMEM',['TIO','ALTO'],H_MUDO],
 ['NAS FÉRIAS, DORMIMOS NUM OTEL PERTO DA PRAIA.','OTEL','HOTEL',['FÉRIAS','PRAIA'],H_MUDO],
 ['O IPOPÓTAMO E O ELEFANTE TOMARAM BANHO NO RIO.','IPOPÓTAMO','HIPOPÓTAMO',['ELEFANTE','BANHO'],H_MUDO+' ELEFANTE começa direto com E.'],
 ['OJE É O DIA DO PASSEIO DA ESCOLA.','OJE','HOJE',['DIA','ESCOLA'],'Falamos "oje", mas escrevemos HOJE. '+H_MUDO],
 ['O ELICÓPTERO POUSOU EM CIMA DO HOSPITAL.','ELICÓPTERO','HELICÓPTERO',['HOSPITAL','CIMA'],H_MUDO+' HOSPITAL já está certa.'],
 ['ANTES DO ALMOÇO, LAVE AS MÃOS: É IGIENE!','IGIENE','HIGIENE',['ALMOÇO','MÃOS'],H_MUDO],
 ['NO CAFÉ DA MANHÃ, COMI UM HOVO.','HOVO','OVO',['CAFÉ','MANHÃ'],'OVO não tem H: começa direto com a vogal. Nem toda palavra que começa com vogal tem H.'],
 ['A HUVA ESTAVA DOCE E GELADA.','HUVA','UVA',['DOCE','GELADA'],'UVA não tem H: começa direto com a vogal.'],
 ['O BARCO CHEGOU À HILHA DEPOIS DE UMA HORA.','HILHA','ILHA',['BARCO','HORA'],'ILHA não tem H no começo. HORA, do relógio, tem.']
]);
CONTA('h',[
 ['A HIENA E O HIPOPÓTAMO VIVEM LONGE DA ESCOLA.','h'],
 ['NA HORTA DO HOTEL TEM UVA, ALFACE E HORTELÃ.','h','UVA e ALFACE começam direto com a vogal.'],
 ['O HERÓI CANTOU O HINO NA HORA CERTA.','h'],
 ['O OVO DA GALINHA CAIU NO CHÃO.','h','GALINHA e CHÃO têm H, mas no meio, não no começo.']
]);
/* h8: era "HOMEM · ILHA · HORA"; agora a mesma conta, numa frase */
ITENS.push({id:'h8',tema:'h',tipo:'rapida',p:'Quantas palavras desta frase começam com H? "HOJE O HOMEM FOI À ILHA DE HELICÓPTERO."',o:['3','2','4'],c:0,
 dica:DICA.h.CONTA,ex:'São 3: HOJE, HOMEM, HELICÓPTERO. ILHA começa com I.'});
FRASES('h',[
 [['O HOMEM LEVOU O FILHO AO HOSPITAL.','O OMEM LEVOU O FILHO AO HOSPITAL.','O HOMEM LEVOU O FILHO AO OSPITAL.'],'HOMEM e HOSPITAL começam com H.'],
 [['A ABELHA VOOU ATÉ A HORTA.','A HABELHA VOOU ATÉ A HORTA.','A ABELHA VOOU ATÉ A ORTA.'],'ABELHA começa com A, sem H. HORTA começa com H.'],
 [['O ELEFANTE OUVIU A HISTÓRIA.','O HELEFANTE OUVIU A HISTÓRIA.','O ELEFANTE OUVIU A ISTÓRIA.'],'ELEFANTE não tem H. HISTÓRIA tem.'],
 [['NA ESCOLA, CANTAMOS O HINO.','NA HESCOLA, CANTAMOS O HINO.','NA ESCOLA, CANTAMOS O INO.'],'ESCOLA não tem H. HINO tem.']
]);
GRUPO('h',[
 ['Em qual grupo TODAS as palavras começam com H?',['HOTEL · HINO · HUMANO','HOTEL · OVO · HINO','ILHA · HINO · HUMANO'],'HOTEL, HINO e HUMANO começam com H. OVO e ILHA, não.'],
 ['Em qual grupo NENHUMA palavra começa com H?',['OVO · UVA · ILHA','OVO · HORA · ILHA','UVA · ESCOLA · HOJE'],'OVO, UVA e ILHA começam direto com a vogal. HORA e HOJE têm H.'],
 ['Em qual grupo TODAS as palavras começam com H?',['HÉLICE · HIGIENE · HORTA','HÉLICE · ANEL · HORTA','OLHO · HIGIENE · HORTA'],'OLHO tem H, mas no meio (LH). Começar com H é ter o H na primeira letra.']
]);
REGRA('h',[
 ['Falamos "oje", mas escrevemos HOJE. Por quê?',['O H do começo não tem som, mas faz parte da palavra','Porque o H tem som de O','Porque toda palavra que começa com O tem H'],'Pense em OVO: começa com O e não tem H.','O H do começo é mudo: não se ouve, mas se escreve. OVO, que também começa com O, não tem H.'],
 ['Se o H não tem som, como saber se a palavra começa com H?',['Lembrar como ela se escreve ou procurar no dicionário','Escutar o som do H','Pôr H em toda palavra que começa com vogal'],'O ouvido não ajuda com o H.','O H mudo não se ouve: é preciso lembrar a palavra escrita, ou conferir no dicionário.'],
 ['Qual palavra está escrita ERRADA?',['UMANO','HOTEL','OVO'],'Uma delas perdeu o H do começo.','UMANO está errada: o certo é HUMANO. HOTEL tem H; OVO não tem.'],
 ['Qual palavra está escrita ERRADA?',['HANEL','HINO','UVA'],'Uma delas ganhou um H que não tem.','HANEL está errada: o certo é ANEL, sem H. HINO tem H; UVA não tem.']
]);

/* ---------- J OU G (som de jê) ---------- */
function rJG(x){ var v=x[0].split('___')[1].charAt(0); return /[AOUÃÕ]/.test(v)?'Antes de '+v+', o som de jê é sempre J (GA, GO, GU soam guê).':'Antes de E e I pode ser J ou G: '+x[2]+' se escreve com '+x[1]+'. Essa a gente lembra palavra por palavra.'; }
LAC('jg',rJG,['J','G'],[
 ['O ___ACARÉ NADOU NO RIO.','J','JACARÉ'],
 ['A MAMÃE FEZ SUCO DE LARAN___A.','J','LARANJA'],
 ['O LEÃO BALANÇOU A ___UBA.','J','JUBA'],
 ['COMI ARROZ, FEI___ÃO E SALADA.','J','FEIJÃO'],
 ['O ___ABUTI ANDA DEVAGAR.','J','JABUTI'],
 ['DEI UM BEI___O NA VOVÓ.','J','BEIJO'],
 ['O SUCO FICOU FRIO COM ___ELO.','G','GELO'],
 ['A ___IRAFA COMEU AS FOLHAS DO ALTO.','G','GIRAFA'],
 ['ABRA O LIVRO NA PÁ___INA DEZ.','G','PÁGINA'],
 ['O RELÓ___IO MARCOU OITO HORAS.','G','RELÓGIO'],
 ['O ___IPE SUBIU A ESTRADA DE TERRA.','J','JIPE'],
 ['O MÁ___ICO TIROU UM COELHO DA CARTOLA.','G','MÁGICO']
]);
ERR('jg',[
 ['A GIRAFA E O GACARÉ SÃO ANIMAIS.','GACARÉ','JACARÉ',['GIRAFA','ANIMAIS'],'GA soa guê, como em GATO. Para o som de jê com A, é J.'],
 ['COLOQUEI A SOPA NA TIJELA AZUL.','TIJELA','TIGELA',['SOPA','AZUL'],'Antes de E pode ser J ou G; TIGELA se escreve com G.'],
 ['NA COZINHA TEM UMA LARANGA.','LARANGA','LARANJA',['COZINHA','UMA'],'GA soa guê. Para o som de jê com A, é J.'],
 ['O JIPE PASSOU PERTO DA JIRAFA.','JIRAFA','GIRAFA',['JIPE','PERTO'],'JIPE é com J, mas GIRAFA é com G. Antes de I, é preciso lembrar a palavra.'],
 ['O QUEIGO E O PÃO ESTÃO NA MESA.','QUEIGO','QUEIJO',['PÃO','MESA'],'GO soa guê. Para o som de jê com O, é J.'],
 ['A FADA FEZ UMA MÁJICA COM A VARINHA.','MÁJICA','MÁGICA',['FADA','VARINHA'],'MÁGICA, como MÁGICO, se escreve com G.'],
 ['NO PRATO TEM JILÓ E FEIGÃO.','FEIGÃO','FEIJÃO',['JILÓ','PRATO'],'GÃ soaria guã. Para o som de jê com Ã, é J, igual a JOÃO.'],
 ['O RELÓJIO DA SALA PAROU.','RELÓJIO','RELÓGIO',['SALA','PAROU'],'Antes de I pode ser J ou G; RELÓGIO se escreve com G.']
]);
CONTA('jg',[
 ['O GIGANTE COMEU QUEIJO E JILÓ.','jg','No GIGANTE, só o GI soa jê; o GAN soa guê.'],
 ['A GIRAFA VIU O GATO NA JANELA.','jg','GATO tem G, mas GA soa guê.'],
 ['O JACARÉ DORMIU PERTO DO LAGO.','jg','LAGO tem G, mas GO soa guê.'],
 ['A GENTE BEBEU SUCO DE LARANJA COM GELO.','jg']
]);
GRUPO('jg',[
 ['Em qual grupo TODAS as palavras se escrevem com J?',['JANELA · JUBA · JOIA','JANELA · GELO · JOIA','GIRAFA · JUBA · JOIA'],'JANELA, JUBA e JOIA têm J. GELO e GIRAFA têm G.'],
 ['Em qual grupo TODAS as palavras têm som de jê escrito com G?',['GELO · GIRAFA · TIGELA','GELO · JIPE · TIGELA','GENTE · GIRAFA · JILÓ'],'GELO, GIRAFA e TIGELA: GE e GI. JIPE e JILÓ são com J.'],
 ['Em qual grupo TODAS as palavras estão escritas certo?',['JABUTI · PÁGINA · BEIJO','GABUTI · PÁGINA · BEIJO','JABUTI · PÁJINA · BEIJO'],'JABUTI (JA: sempre J), PÁGINA (com G) e BEIJO (JO: sempre J).'],
 ['Qual palavra tem o som de jê escrito com G?',['GIRASSOL','GATO','JOIA'],'GIRASSOL: GI soa jê. GATO soa guê; JOIA tem som de jê, mas com J.']
]);
FRASES('jg',[
 [['O GIGANTE GUARDOU A JOIA.','O JIGANTE GUARDOU A JOIA.','O GIGANTE GUARDOU A GOIA.'],'GIGANTE é com G; JOIA é com J (JO: sempre J).'],
 [['O JABUTI COMEU GELEIA.','O GABUTI COMEU GELEIA.','O JABUTI COMEU JELEIA.'],'JABUTI: JA é sempre J. GELEIA se escreve com G.'],
 [['A SUJEIRA FICOU NA PÁGINA.','A SUGEIRA FICOU NA PÁGINA.','A SUJEIRA FICOU NA PÁJINA.'],'SUJEIRA é com J; PÁGINA é com G. Antes de E e I, lembre a palavra.']
]);
REGRA('jg',[
 ['Por que JACARÉ não pode ser escrito com G?',['Porque GA tem som de guê, como em GATO','Porque é nome de bicho','Porque é uma palavra comprida'],'Leia GACARÉ do jeito que está escrito.','Com G ficaria GACARÉ, com som de guê. JA, JO, JU: sempre J.'],
 ['Antes de E e I, como saber se o som de jê é com J ou com G?',['Lembrar como a palavra se escreve ou olhar no dicionário','É sempre G','É sempre J'],'Pense em JEITO e GELO.','Com E e I os dois existem: JEITO, JIPE; GELO, GIRAFA. É preciso lembrar a palavra.'],
 ['GIRAFA e JIPE começam com o mesmo som. O que muda?',['A letra: G em GIRAFA, J em JIPE','O som do começo','Nada: as duas começam com J'],'Fale as duas. O som é igual?','O som é o mesmo (jê), mas a escrita muda: GIRAFA com G, JIPE com J.']
]);

/* ---------- G OU GU (som de guê) ---------- */
function rGGU(x){ return x[1]==='GU'?'Antes de E e I, o som de guê precisa do U quietinho: sem ele, GE e GI soam jê.':'Antes de A, O e U, o G já soa guê sozinho: não precisa de U.'; }
LAC('ggu',rGGU,['G','GU'],[
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
 ['AS FORMIGAS FIZERAM UM FORMIGEIRO NO JARDIM.','FORMIGEIRO','FORMIGUEIRO',['FORMIGAS','JARDIM'],'Sem o U, GE soa jê. Para soar guê antes do E, é GUE.'],
 ['NA FESTA, O MENINO TOCOU GITARRA.','GITARRA','GUITARRA',['FESTA','MENINO'],'Sem o U, GI soa jê. Para soar guê antes do I, é GUI.'],
 ['O FOGETE DO DESENHO ERA AZUL.','FOGETE','FOGUETE',['DESENHO','AZUL'],'Sem o U, GE soa jê. O certo é GUE.'],
 ['A ÁGIA FEZ O NINHO NA MONTANHA.','ÁGIA','ÁGUIA',['NINHO','MONTANHA'],'Sem o U, GI soa jê. O certo é GUI.'],
 ['O GUATO BEBEU O LEITE.','GUATO','GATO',['LEITE','BEBEU'],'Antes de A o G já soa guê: GA, sem U.'],
 ['A FOGEIRA DA FESTA ERA GRANDE.','FOGEIRA','FOGUEIRA',['FESTA','GRANDE'],'Sem o U, GE soa jê. O certo é GUE.']
]);
CONTA('ggu',[
 ['A ÁGUIA E O FOGUETE VOARAM SOBRE O LAGO.','ggu','LAGO tem GO: o G soa guê sem precisar de U.'],
 ['PERTO DA FOGUEIRA, O MENINO TOCAVA GUITARRA.','ggu'],
 ['O GORILA E O GATO BRINCARAM NO GALHO.','ggu','GO e GA não precisam de U.']
]);
GRUPO('ggu',[
 ['Em qual grupo TODAS as palavras têm o U que não se fala (GUE, GUI)?',['GUERRA · FOGUETE · ÁGUIA','GUERRA · AGULHA · ÁGUIA','GATO · FOGUETE · ÁGUIA'],'Em AGULHA o U se fala (a-GU-lha). GATO não tem U.'],
 ['Em qual grupo TODAS as palavras estão escritas certo?',['GORILA · MANGUEIRA · LAGO','GORILA · MANGEIRA · LAGO','GUORILA · MANGUEIRA · LAGO'],'GORILA e LAGO: GO, sem U. MANGUEIRA: GUE, com U.']
]);
REGRA('ggu',[
 ['Por que GUITARRA tem um U depois do G?',['Para o G soar guê antes do I','Porque o U se fala forte','Porque toda palavra com G tem U'],'Leia GITARRA do jeito que está escrito.','Sem o U ficaria GITARRA, com som de jê. O U faz o G soar guê antes do I.'],
 ['Sem o U, FOGUETE viraria FOGETE. Como se leria FOGETE?',['Com som de jê: fo-JE-te','Do mesmo jeito que FOGUETE','Com som de quê'],'GE soa como em GELO.','GE soa jê. Por isso FOGUETE precisa do U: GUE.'],
 ['GELO e GUERRA: o G tem o mesmo som?',['Não: GE soa jê e GUE soa guê','Sim: os dois soam guê','Sim: os dois soam jê'],'Fale as duas palavras devagar.','GE (GELO) soa jê. GUE (GUERRA) soa guê: o U muda o som do G.']
]);
FRASES('ggu',[
 [['A ÁGUIA VIU O FOGUETE.','A ÁGIA VIU O FOGUETE.','A ÁGUIA VIU O FOGETE.'],'ÁGUIA (GUI) e FOGUETE (GUE) precisam do U.'],
 [['O GATO DORMIU NA MANGUEIRA.','O GUATO DORMIU NA MANGUEIRA.','O GATO DORMIU NA MANGEIRA.'],'GATO: GA, sem U. MANGUEIRA: GUE, com U.']
]);

/* ---------- C OU QU (som de quê) ---------- */
function rCQU(x){ return x[1]==='QU'?'Antes de E e I, o som de quê se escreve QU, com o U quietinho (com C ficaria som de sê ou si).':'Antes de A, O e U, o C já tem som de quê: não precisa de QU.'; }
LAC('cqu',rCQU,['C','QU'],[
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
 ['NO LANCHE TEM PÃO COM CEIJO.','CEIJO','QUEIJO',['LANCHE','PÃO'],'CE soa sê. Para o som de quê antes do E, é QUE.'],
 ['O ESCILO SUBIU NA ÁRVORE.','ESCILO','ESQUILO',['SUBIU','ÁRVORE'],'CI soa si. Para o som de quê antes do I, é QUI.'],
 ['O MOSCITO ZUMBIU NA ORELHA.','MOSCITO','MOSQUITO',['ZUMBIU','ORELHA'],'CI soa si. O certo é QUI.'],
 ['A QUASA DA VOVÓ É AMARELA.','QUASA','CASA',['VOVÓ','AMARELA'],'Antes de A, o C já soa quê: CA, sem U.'],
 ['MAMÃE COMPROU CIABO NA FEIRA.','CIABO','QUIABO',['MAMÃE','FEIRA'],'CI soa si. O certo é QUI.'],
 ['O MOLECE CORREU PELA RUA.','MOLECE','MOLEQUE',['CORREU','RUA'],'CE soa sê. O certo é QUE.']
]);
CONTA('cqu',[
 ['O ESQUILO E O PERIQUITO COMERAM QUIABO.','cqu'],
 ['O QUEIJO QUENTE CAIU NO COPO.','cqu','COPO tem som de quê, mas com C: antes de O não precisa de QU.'],
 ['A CORUJA VIU O CAVALO PERTO DA CASA.','cqu','Antes de O e A o som de quê é só C: CORUJA, CAVALO, CASA.']
]);
GRUPO('cqu',[
 ['Em qual grupo TODAS as palavras se escrevem com QU?',['QUEIJO · LEQUE · ESQUILO','QUEIJO · COPO · ESQUILO','CASA · LEQUE · ESQUILO'],'QUEIJO, LEQUE e ESQUILO: QUE e QUI. COPO e CASA são com C.'],
 ['Em qual grupo TODAS as palavras estão escritas certo?',['CAMA · QUIABO · COELHO','QUAMA · QUIABO · COELHO','CAMA · CIABO · COELHO'],'CAMA e COELHO: C antes de A e O. QUIABO: QUI.']
]);
REGRA('cqu',[
 ['Por que QUEIJO se escreve com QU, e não com C?',['Porque com C ficaria CEIJO, com som de sê','Porque é uma comida','Porque o U se fala forte'],'Leia CEIJO do jeito que está escrito.','Antes de E e I, o C soa sê/si. Para o som de quê, é QUE, QUI.'],
 ['Em ESQUILO, o U...',['é escrito, mas não se fala','se fala bem forte','pode ser apagado'],'Fale ESQUILO devagar. Você ouve o U?','Em QUE e QUI o U não se fala, mas sem ele ficaria ESCILO.'],
 ['Por que COPO se escreve só com C?',['Porque antes de O o C já tem som de quê','Porque é uma palavra pequena','Porque o O não deixa usar QU'],'Pense em CASA e CUBO.','Com A, O e U o C já soa quê: CASA, COPO, CUBO. QU só antes de E e I.']
]);
FRASES('cqu',[
 [['O ESQUILO COMEU O QUIABO.','O ESCILO COMEU O QUIABO.','O ESQUILO COMEU O CIABO.'],'ESQUILO e QUIABO: QUI.'],
 [['O CAVALO BEBEU ÁGUA QUENTE.','O QUAVALO BEBEU ÁGUA QUENTE.','O CAVALO BEBEU ÁGUA CENTE.'],'CAVALO: CA, só C. QUENTE: QUE.'],
 [['A MÁQUINA FEZ SUCO DE CAQUI.','A MÁCINA FEZ SUCO DE CAQUI.','A MÁQUINA FEZ SUCO DE CACI.'],'MÁQUINA e CAQUI: QUI.']
]);

/* ---------- CH · NH · LH ---------- */
FR('dig',[
 ['A ___ FEZ MEL NA COLMEIA.','ABELHA',['ABENHA','ABECHA'],'ABELHA se escreve com LH.'],
 ['O CAVALO DEITOU NA ___ SECA.','PALHA',['PANHA','PACHA'],'PALHA se escreve com LH.'],
 ['O ___ LATIU PARA O CARTEIRO.','CACHORRO',['CANHORRO','CALHORRO'],'CACHORRO se escreve com CH.'],
 ['A ___ FEZ UMA TEIA NO CANTO DA SALA.','ARANHA',['ARACHA','ARALHA'],'ARANHA se escreve com NH.']
]);
ERR('dig',[
 ['A GALINA FEZ O NINHO NA PALHA.','GALINA','GALINHA',['NINHO','PALHA'],'Faltou o H: GALINHA tem NH. NINHO (NH) e PALHA (LH) estão certas.'],
 ['O COENHO COMEU A FOLHA DA ALFACE.','COENHO','COELHO',['FOLHA','ALFACE'],'COELHO tem LH, igual a FOLHA.'],
 ['CHAPEUZINHO SEGUIU PELO CAMILHO DA FLORESTA.','CAMILHO','CAMINHO',['CHAPEUZINHO','FLORESTA'],'CAMINHO tem NH.'],
 ['A OVENHA DORMIU PERTO DO CACHORRO.','OVENHA','OVELHA',['CACHORRO','DORMIU'],'OVELHA tem LH.'],
 ['DEPOIS DO BALHO, ELA CALÇOU O CHINELO.','BALHO','BANHO',['CHINELO','DEPOIS'],'BANHO tem NH.'],
 ['GUARDEI O DINHEIRO E A LHAVE NA BOLSA.','LHAVE','CHAVE',['DINHEIRO','BOLSA'],'CHAVE tem CH. DINHEIRO (NH) está certa.'],
 ['A ABENHA POUSOU NA FLOR DO CAMINHO.','ABENHA','ABELHA',['CAMINHO','FLOR'],'ABELHA tem LH.'],
 ['NA COZILHA, A VOVÓ FEZ CHOCOLATE QUENTE.','COZILHA','COZINHA',['VOVÓ','CHOCOLATE'],'COZINHA tem NH.'],
 ['CAÍ NO PARQUE E RALEI O JOENHO.','JOENHO','JOELHO',['PARQUE','RALEI'],'JOELHO tem LH.']
]);
CONTA('dig',[
 ['A OVELHA E O COELHO COMERAM FOLHAS PERTO DO GALHO.','LH'],
 ['A GALINHA FEZ O NINHO NO CAMINHO.','NH'],
 ['COM A CHUVA, O CACHORRO FICOU NA CASINHA.','CH','CASINHA tem NH, não CH.'],
 ['A ABELHA VOOU ATÉ A ARANHA.','LH','ARANHA tem NH, não LH.'],
 ['A ABELHA E A OVELHA COMERAM PALHA.','NH','Todas essas têm LH, nenhuma tem NH.']
]);
GRUPO('dig',[
 ['Em qual grupo TODAS as palavras têm LH?',['FOLHA · OLHO · ABELHA','FOLHA · NINHO · ABELHA','CHAVE · OLHO · ABELHA'],'FOLHA, OLHO e ABELHA têm LH. NINHO tem NH; CHAVE tem CH.'],
 ['Em qual grupo TODAS as palavras têm NH?',['UNHA · BANHO · ARANHA','UNHA · TELHA · ARANHA','UNHA · BANHO · CHUVA'],'UNHA, BANHO e ARANHA têm NH. TELHA tem LH; CHUVA tem CH.'],
 ['Em qual grupo TODAS as palavras têm CH?',['CHAPÉU · CHINELO · CACHORRO','CHAPÉU · COELHO · CACHORRO','CHAPÉU · CHINELO · DINHEIRO'],'CHAPÉU, CHINELO e CACHORRO têm CH. COELHO tem LH; DINHEIRO tem NH.'],
 ['Qual palavra NÃO tem a mesma dupla de letras que as outras: GALINHA, CAMINHO, FOLHA, ARANHA?',['FOLHA','GALINHA','CAMINHO','ARANHA'],'FOLHA tem LH. GALINHA, CAMINHO e ARANHA têm NH.'],
 ['Qual palavra NÃO tem a mesma dupla de letras que as outras: OLHO, CHUVA, COELHO, JOELHO?',['CHUVA','OLHO','COELHO','JOELHO'],'CHUVA tem CH. OLHO, COELHO e JOELHO têm LH.']
]);
PAR('dig',[
 ['ANA É ___ DA DONA ROSA.','FILHA',['FILA'],'Ana é FILHA da Dona Rosa. FILA é gente esperando, uma atrás da outra: o LH mudou o sentido.'],
 ['ANTES DO LANCHE, A TURMA FEZ UMA ___ PARA LAVAR AS MÃOS.','FILA',['FILHA'],'A turma fez uma FILA. FILHA é outra palavra, com outro sentido.'],
 ['A MENINA ___ AS PLANTAS COM O REGADOR.','MOLHA',['MOLA'],'Com o regador, ela MOLHA as plantas. MOLA é a peça que estica e volta.'],
 ['ESTA BONECA É ___, NÃO É SUA!','MINHA',['MINA'],'A boneca é MINHA. MINA é outra palavra: o NH mudou o sentido.'],
 ['ESTOU COM MUITO ___, VOU DORMIR.','SONO',['SONHO'],'Quem vai dormir está com SONO. SONHO é o que a gente vê dormindo.'],
 ['ESTA NOITE TIVE UM ___ COM DRAGÕES.','SONHO',['SONO'],'O que se vê dormindo é um SONHO. Entrou o NH e a palavra mudou.']
]);
REGRA('dig',[
 ['MOLA virou MOLHA quando entrou o H. O que aconteceu?',['Virou outra palavra, com outro sentido','Ficou a mesma palavra','A palavra ficou errada'],'Mola e molha querem dizer a mesma coisa?','Uma letrinha muda tudo: MOLA é uma peça; MOLHA é pôr água.']
]);
FRASES('dig',[
 [['A OVELHA DORMIU NA PALHA.','A OVENHA DORMIU NA PALHA.','A OVELHA DORMIU NA PANHA.'],'OVELHA e PALHA têm LH.'],
 [['O CACHORRO ACHOU UM NINHO.','O CANHORRO ACHOU UM NINHO.','O CACHORRO ACHOU UM NILHO.'],'CACHORRO tem CH; NINHO tem NH.'],
 [['CHAPEUZINHO SEGUIU PELO CAMINHO.','CHAPEUZILHO SEGUIU PELO CAMINHO.','CHAPEUZINHO SEGUIU PELO CAMILHO.'],'CHAPEUZINHO e CAMINHO têm NH.']
]);

/* ---------- PLURAL: numa frase, com o número pedindo o plural ---------- */
function PLU(lista){ lista.forEach(function(x){
  /* x = [frase com ___ , singular, certa, [erradas], regra] */
  nv('plural','plF','Complete a frase com o plural de '+x[1]+': "'+x[0]+'"',[x[2]].concat(x[3]),DICA.plural.FR,x[1]+' → '+x[2]+': '+x[4]+'.');
}); }
PLU([
 ['NO CÉU PASSARAM DOIS ___.','AVIÃO','AVIÕES',['AVIÃOS','AVIÕS'],'ÃO vira ÕES'],
 ['NO JARDIM NASCERAM MUITAS ___.','FLOR','FLORES',['FLORS','FLORIS'],'termina em R, põe ES'],
 ['NO ZOOLÓGICO VIMOS VÁRIOS ___.','ANIMAL','ANIMAIS',['ANIMALS','ANIMALES'],'AL vira AIS'],
 ['NA FESTA, AS CRIANÇAS SOLTARAM ___ COLORIDOS.','BALÃO','BALÕES',['BALÃOS','BALÕS'],'ÃO vira ÕES'],
 ['NO CÉU HAVIA MUITAS ___ BRANCAS.','NUVEM','NUVENS',['NUVEMS','NUVEIS'],'M vira NS'],
 ['DOIS ___ CONVERSAVAM NA PRAÇA.','HOMEM','HOMENS',['HOMEMS','HOMEMES'],'M vira NS'],
 ['NA MESA HAVIA QUATRO ___.','COLHER','COLHERES',['COLHERS','COLHERIS'],'termina em R, põe ES'],
 ['DE NOITE, ACENDEMOS AS ___ DA CASA.','LUZ','LUZES',['LUZS','LUZIS'],'termina em Z, põe ES'],
 ['NO DOMINGO, O PAPAI LEU DOIS ___.','JORNAL','JORNAIS',['JORNALS','JORNALES'],'AL vira AIS'],
 ['OS TRÊS ___ FIZERAM SUAS CASAS.','PORQUINHO','PORQUINHOS',['PORQUINHOES','PORQUINHONS'],'termina em vogal, põe S'],
 ['O PESCADOR LEVOU DOIS ___.','ANZOL','ANZÓIS',['ANZOLS','ANZOLES'],'OL vira ÓIS'],
 ['NO ZOOLÓGICO, DOIS ___ RUGIRAM.','LEÃO','LEÕES',['LEÃOS','LEÕS'],'ÃO vira ÕES'],
 ['A CAMISA TEM CINCO ___.','BOTÃO','BOTÕES',['BOTÃOS','BOTÕS'],'ÃO vira ÕES'],
 ['NA ESTAÇÃO PASSARAM DOIS ___.','TREM','TRENS',['TREMS','TREMES'],'M vira NS'],
 ['A GALINHA BOTOU SEIS ___.','OVO','OVOS',['OVOES','OVONS'],'termina em vogal, põe S'],
 ['NA FEIRA, MAMÃE COMPROU TRÊS ___.','LIMÃO','LIMÕES',['LIMÃOS','LIMÕS'],'ÃO vira ÕES'],
 ['NA PRAIA, VIMOS DOIS ___ DIFERENTES.','MAR','MARES',['MARS','MARIS'],'termina em R, põe ES']
]);
REGRA('plural',[
 ['Passe para o plural: A CASA',['AS CASAS','A CASAS','AS CASA'],'As DUAS palavras vão para o plural.','A → AS, casa → casas. O artigo acompanha a palavra.'],
 ['Passe para o plural: O LOBO',['OS LOBOS','O LOBOS','OS LOBO'],'As DUAS palavras vão para o plural.','O → OS, lobo → lobos.'],
 ['Passe para o plural: A NUVEM',['AS NUVENS','A NUVENS','AS NUVEMS'],'As DUAS palavras vão para o plural. NUVEM termina em M.','A → AS, e o M vira NS: AS NUVENS.'],
 ['Qual destas palavras faz o plural com ES?',['MAR','LOBO','BALÃO'],'Olhe como cada uma termina.','MAR termina em R: MARES. LOBO ganha só S; BALÃO vira BALÕES.'],
 ['Qual destas palavras faz o plural trocando ÃO por ÕES?',['LIMÃO','FLOR','JORNAL'],'Olhe como cada uma termina.','LIMÃO → LIMÕES. FLOR → FLORES; JORNAL → JORNAIS.'],
 ['Qual destas palavras faz o plural trocando o L por IS?',['ANIMAL','HOMEM','CASA'],'Olhe como cada uma termina.','ANIMAL → ANIMAIS. HOMEM → HOMENS; CASA → CASAS.']
]);
ERR('plural',[
 ['OS ANIMALS COMERAM AS FLORES.','ANIMALS','ANIMAIS',['FLORES','COMERAM'],'Terminou em AL, o plural é AIS. FLORES está certa (R ganha ES).'],
 ['AS CRIANÇAS VIRAM DOIS AVIÃOS E TRÊS BALÕES.','AVIÃOS','AVIÕES',['BALÕES','CRIANÇAS'],'ÃO vira ÕES. BALÕES está certa.'],
 ['OS HOMEMS ACENDERAM AS LUZES.','HOMEMS','HOMENS',['LUZES','ACENDERAM'],'Terminou em M, o M vira NS. LUZES está certa (Z ganha ES).']
]);

/* dicionário v3: palavras-guia em uso (achar a página certa) */
[['BALA','BULE','BONÉ',['CASA','ABELHA'],'BA... BO... BU: BONÉ fica entre BALA e BULE.'],
 ['GATO','GOLA','GELO',['FADA','HORA'],'GA... GE... GO: GELO fica entre GATO e GOLA.'],
 ['MAPA','MOLA','MESA',['NUVEM','LOBO'],'MA... ME... MO: MESA fica entre MAPA e MOLA.'],
 ['JABUTI','JANELA','JACARÉ',['GATO','LUA'],'JAB... JAC... JAN: JACARÉ fica entre JABUTI e JANELA.']
].forEach(function(x,i){ ITENS.push({id:'rdg'+i,tema:'dic',tipo:'rapida',
  p:'No alto de uma página do dicionário estão as palavras-guia '+x[0]+' e '+x[1]+'. Qual destas palavras está nessa página?',
  o:[x[2]].concat(x[3]),c:0,dica:'A palavra tem de vir DEPOIS de '+x[0]+' e ANTES de '+x[1]+' na ordem alfabética.',ex:x[4]}); });

/* dicionário: qual vem primeiro / por último */
function ordena(a){ return a.slice().sort(function(x,y){ return x.localeCompare(y,'pt'); }); }
[['BALA','BOLA','BULE'],['GATO','LOBO','URSO'],['CASA','COPO','CUBO'],['ABELHA','BOLA','CASA'],['FADA','FOGO','FUMAÇA'],
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
