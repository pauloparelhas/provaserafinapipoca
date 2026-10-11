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
  cqu:     {nome:'CA CO CU · QUE QUI',   cor:'#34d399', emoji:'🧀'},
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
{id:'co4',tema:'conto',p:'Quem é o vilão em João e o pé de feijão?',o:['O Gigante','A mãe do João','A vaca'],c:0,
 dica:'Ele mora no castelo lá em cima das nuvens.',ex:'O vilão é o Gigante do castelo.'},
{id:'co5',tema:'conto',p:'O que NÃO costuma ter num conto de fadas?',o:['Notícia do jornal de hoje','Magia','Um vilão'],c:0,
 dica:'Conto de fadas é uma história inventada.',ex:'Conto de fadas é inventado; tem magia e vilão. Notícia de jornal não é conto de fadas.'},
{id:'co6',tema:'conto',p:'Qual destes é um elemento MÁGICO de um conto?',o:['Feijões mágicos','Uma mesa','Um caderno'],c:0,
 dica:'Mágico é o que não acontece de verdade.',ex:'Os feijões mágicos fazem nascer um pé de feijão até as nuvens.'},
{id:'co7',tema:'conto',p:'Qual destes é um conto de fadas?',o:['Os Três Porquinhos','A lista do mercado','O calendário'],c:0,
 dica:'Procure a história com "Era uma vez".',ex:'Os Três Porquinhos é um conto de fadas.'},
{id:'co8',tema:'conto',p:'Onde muitos contos de fadas acontecem?',o:['Na floresta ou no castelo','No supermercado','No aeroporto'],c:0,
 dica:'Lembre da Chapeuzinho e do João.',ex:'Floresta (Chapeuzinho) e castelo (o Gigante) são lugares de conto de fadas.'},

/* ---------------- CHAPEUZINHO VERMELHO ---------------- */
{id:'ch1',tema:'chapeu',p:'Para quem a Chapeuzinho levava a cesta de doces?',o:['Para a vovó','Para o lobo','Para o caçador'],c:0,
 dica:'Essa pessoa estava doente.',ex:'Ela levava doces para a vovó, que estava doente.'},
{id:'ch2',tema:'chapeu',p:'O que a mãe pediu para a Chapeuzinho?',o:['Não sair do caminho','Correr pela floresta','Conversar com o lobo'],c:0,
 dica:'Foi um conselho para ela ficar segura.',ex:'A mãe avisou: não saia do caminho e não converse com estranhos.'},
{id:'ch3',tema:'chapeu',p:'Por que ela se chamava Chapeuzinho Vermelho?',o:['Usava uma capa com capuz vermelho','Comia morangos','Morava numa casa vermelha'],c:0,
 dica:'Pense na roupa dela.',ex:'Ela usava uma capa com capuz vermelho.'},
{id:'ch4',tema:'chapeu',p:'"Vovó, que olhos grandes você tem!" O que o lobo respondeu?',o:['É para te ver melhor!','É para te ouvir melhor!','É para te comer!'],c:0,
 dica:'Olhos servem para...',ex:'Olhos grandes: "é para te ver melhor!". Orelhas: ouvir. Boca: comer.'},
{id:'ch5',tema:'chapeu',p:'"Que boca grande você tem!" O que o lobo respondeu?',o:['É para te comer!','É para te ver melhor!','É para cantar!'],c:0,
 dica:'É a parte mais assustadora da história.',ex:'"É para te comer!" — aí o lobo pulou da cama.'},
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

/* ---------------- LETRA H ---------------- */
{id:'h1',tema:'h',p:'Qual palavra está escrita certo?',o:['HOJE','OJE','OGE'],c:0,
 dica:'Essa palavra começa com uma letra que não tem som.',ex:'HOJE começa com H, mesmo sem som.'},
{id:'h2',tema:'h',p:'Qual palavra começa com H?',o:['HIPOPÓTAMO','ELEFANTE','ABELHA'],c:0,
 dica:'O H fica quietinho no começo.',ex:'HIPOPÓTAMO começa com H.'},
{id:'h3',tema:'h',p:'O H no começo da palavra tem som?',o:['Não, ele fica mudo','Sim, som de R','Sim, som de A'],c:0,
 dica:'Fale "hora" bem devagar.',ex:'O H no começo não tem som: hora, hoje, homem.'},
{id:'h4',tema:'h',p:'Complete: ___ELICÓPTERO',o:['H','E','A'],c:0,
 dica:'A primeira letra é a que não faz som.',ex:'HELICÓPTERO começa com H.'},
{id:'h5',tema:'h',p:'Qual destas palavras NÃO começa com H?',o:['OVO','HORTA','HOTEL'],c:0,
 dica:'Duas começam com H mudo. Uma começa direto com a vogal.',ex:'OVO começa com O. HORTA e HOTEL começam com H.'},
{id:'h6',tema:'h',p:'Complete: ___OSPITAL',o:['H','O','U'],c:0,
 dica:'Lugar onde se cuida de quem está doente.',ex:'HOSPITAL começa com H.'},
{id:'h7',tema:'h',p:'Qual palavra está escrita certo?',o:['HISTÓRIA','ISTÓRIA','ESTÓRIA'],c:0,
 dica:'Era uma vez... é uma ____.',ex:'HISTÓRIA se escreve com H.'},
{id:'h8',tema:'h',p:'Quantas destas começam com H? HOMEM · ILHA · HORA',o:['2','1','3'],c:0,
 dica:'Olhe só a primeira letra de cada uma.',ex:'HOMEM e HORA: 2. ILHA começa com I.'},

/* ---------------- J OU G (som de jê) ---------------- */
{id:'jg1',tema:'jg',p:'Complete: ___ACARÉ',o:['J','G'],c:0,
 dica:'Antes de A, o som de jê é sempre com...',ex:'JA, JO, JU: sempre J. JACARÉ.'},
{id:'jg2',tema:'jg',p:'Complete: ___IRAFA',o:['G','J'],c:0,
 dica:'É uma palavra de G antes do I.',ex:'GIRAFA se escreve com G.'},
{id:'jg3',tema:'jg',p:'Complete: ___ELO (água congelada)',o:['G','J'],c:0,
 dica:'Começa igual a GELADEIRA.',ex:'GELO se escreve com G.'},
{id:'jg4',tema:'jg',p:'Complete: CA___U (uma fruta)',o:['J','G'],c:0,
 dica:'Antes do U, o som de jê é sempre com...',ex:'JU: sempre J. CAJU.'},
{id:'jg5',tema:'jg',p:'Qual está escrita certo?',o:['FEIJÃO','FEIGÃO','FEIXÃO'],c:0,
 dica:'Antes de Ã, o som de jê é com J.',ex:'FEIJÃO, com J — igual ao nome JOÃO.'},
{id:'jg6',tema:'jg',p:'Qual está escrita certo?',o:['GIGANTE','JIGANTE','GUIGANTE'],c:0,
 dica:'O vilão do pé de feijão começa com G.',ex:'GIGANTE começa com G (GI com som de jê).'},
{id:'jg7',tema:'jg',p:'Com A, O e U, o som de jê se escreve com...',o:['J','G','os dois'],c:0,
 dica:'GA, GO e GU fazem outro som.',ex:'JA, JO, JU: sempre J. (GA, GO, GU fazem som de guê.)'},
{id:'jg8',tema:'jg',p:'Complete: ___ANELA',o:['J','G'],c:0,
 dica:'Antes de A...',ex:'JANELA, com J.'},
{id:'jg9',tema:'jg',p:'Qual está escrita certo?',o:['MÁGICO','MÁJICO','MÁGUICO'],c:0,
 dica:'Os feijões eram ___.',ex:'MÁGICO se escreve com G.'},
{id:'jg10',tema:'jg',p:'Qual está escrita certo?',o:['JIPE','GIPE','GUIPE'],c:0,
 dica:'É um carro. É de J antes do I.',ex:'JIPE se escreve com J.'},

/* ---------------- G OU GU (som de guê) ---------------- */
{id:'gg1',tema:'ggu',p:'Complete: ___ITARRA',o:['GU','G','J'],c:0,
 dica:'Antes do I, para soar guê, precisa de uma ajudante.',ex:'GUITARRA: GUI. Sem o U seria som de jê.'},
{id:'gg2',tema:'ggu',p:'Complete: FO___ETE',o:['GU','G','J'],c:0,
 dica:'Antes do E, para soar guê...',ex:'FOGUETE: GUE, com o U quietinho.'},
{id:'gg3',tema:'ggu',p:'Complete: ___ATO',o:['G','GU','J'],c:0,
 dica:'Antes do A, o G já soa guê sozinho.',ex:'GATO: GA, sem precisar de U.'},
{id:'gg4',tema:'ggu',p:'Em GUERRA, o U...',o:['fica quietinho, não se fala','faz som de U','vira V'],c:0,
 dica:'Fale GUERRA em voz alta.',ex:'Em GUE e GUI, o U não se fala.'},
{id:'gg5',tema:'ggu',p:'Qual está escrita certo?',o:['ÁGUIA','ÁGIA','ÁJIA'],c:0,
 dica:'É uma ave. Tem som de guê antes do I.',ex:'ÁGUIA: GUI.'},
{id:'gg6',tema:'ggu',p:'Qual palavra tem som de guê?',o:['GORILA','GELO','GIRAFA'],c:0,
 dica:'GE e GI soam jê.',ex:'GORILA: GO soa guê. GELO e GIRAFA soam jê.'},
{id:'gg7',tema:'ggu',p:'Complete: A___LHA (de costura)',o:['GU','G','J'],c:1,
 dica:'Antes do U, o G já soa guê sozinho.',ex:'AGULHA: GU com o G sozinho, porque vem antes do U.'},
{id:'gg8',tema:'ggu',p:'Complete: FO___EIRA',o:['GU','G','J'],c:0,
 dica:'GE soaria jê. Queremos guê.',ex:'FOGUEIRA: GUE.'},
{id:'gg9',tema:'ggu',p:'GIGANTE tem quais sons?',o:['jê (GI) e guê (GAN)','só guê','só jê'],c:0,
 dica:'Fale GI-GAN-TE devagar.',ex:'GI soa jê, GAN soa guê. Duas regras numa palavra só!'},

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
 dica:'Segunda letra: A, O, U.',ex:'CA, CO, CU: casa, copo, cubo.'},
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

/* ---------------- CA CO CU · QUE QUI ---------------- */
{id:'cq1',tema:'cqu',p:'Complete: ___EIJO',o:['QU','C','K'],c:0,
 dica:'Antes do E, o som de quê se escreve com...',ex:'QUEIJO: QUE, com U quietinho.'},
{id:'cq2',tema:'cqu',p:'Complete: ___ELHO',o:['CO','QUO','QU'],c:0,
 dica:'É um bichinho de orelhas compridas.',ex:'COELHO: CO.'},
{id:'cq3',tema:'cqu',p:'Complete: ES___ILO',o:['QU','C','G'],c:0,
 dica:'Antes do I, o som de quê precisa do U.',ex:'ESQUILO: QUI.'},
{id:'cq4',tema:'cqu',p:'Qual está escrita certo?',o:['MÁQUINA','MÁCINA','MÁKINA'],c:0,
 dica:'Uma invenção! Antes do I, som de quê...',ex:'MÁQUINA: QUI.'},
{id:'cq5',tema:'cqu',p:'Complete: ___BO (forma de dado)',o:['CU','QU','CO'],c:0,
 dica:'Antes do U, só o C basta.',ex:'CUBO: CU.'},
{id:'cq6',tema:'cqu',p:'Qual está escrita certo?',o:['QUIABO','CIABO','QIABO'],c:0,
 dica:'É um legume. Começa com o som de quê antes do I.',ex:'QUIABO: QUI.'},
{id:'cq7',tema:'cqu',p:'Antes de E e I, o som de quê se escreve com...',o:['QU','C','CH'],c:0,
 dica:'Pense em QUEIJO e QUIABO.',ex:'QUE e QUI. Antes de A, O, U, é C: CA, CO, CU.'},
{id:'cq8',tema:'cqu',p:'Complete: ___SA',o:['CA','QUA','QUE'],c:0,
 dica:'Onde você mora.',ex:'CASA: CA.'},
{id:'cq9',tema:'cqu',p:'Qual está escrita certo?',o:['MOSQUITO','MOSCITO','MOSKITO'],c:0,
 dica:'Inseto que pica. Som de quê antes do I.',ex:'MOSQUITO: QUI.'},

/* ---------------- CH NH LH ---------------- */
{id:'dg1',tema:'dig',p:'Complete: ___AVE (abre a porta)',o:['CH','NH','LH'],c:0,
 dica:'Som de xis no começo.',ex:'CHAVE: CH.'},
{id:'dg2',tema:'dig',p:'Complete: NI___O (casa do passarinho)',o:['NH','LH','CH'],c:0,
 dica:'Fale NI-NHO.',ex:'NINHO: NH.'},
{id:'dg3',tema:'dig',p:'Complete: FO___A (da árvore)',o:['LH','NH','CH'],c:0,
 dica:'A folha do bordo do Canadá!',ex:'FOLHA: LH.'},
{id:'dg4',tema:'dig',p:'Complete: COE___O',o:['LH','NH','CH'],c:0,
 dica:'Bicho de orelha comprida.',ex:'COELHO: LH.'},
{id:'dg5',tema:'dig',p:'Complete: GALI___A',o:['NH','LH','CH'],c:0,
 dica:'A dos ovos de ouro!',ex:'GALINHA: NH.'},
{id:'dg6',tema:'dig',p:'Complete: ___UVA',o:['CH','LH','NH'],c:0,
 dica:'Cai das nuvens.',ex:'CHUVA: CH.'},
{id:'dg7',tema:'dig',p:'MOLA virou MOLHA. Que dupla entrou?',o:['LH','NH','CH'],c:0,
 dica:'O L ganhou um H.',ex:'MOLA → MOLHA: entrou o LH, e o sentido mudou.'},
{id:'dg8',tema:'dig',p:'Qual palavra tem NH?',o:['CAMINHO','CHAPÉU','OLHO'],c:0,
 dica:'O lobo encontrou Chapeuzinho no ____.',ex:'CAMINHO tem NH. CHAPÉU tem CH, OLHO tem LH.'},
{id:'dg9',tema:'dig',p:'CH, NH e LH são duas letras que fazem...',o:['um som só','dois sons','nenhum som'],c:0,
 dica:'Fale CHA-VE: o CH faz um barulho só.',ex:'Duas letras, um som só.'},
{id:'dg10',tema:'dig',p:'Qual palavra tem CH e NH?',o:['CHAPEUZINHO','CHUVA','NINHO'],c:0,
 dica:'O nome de uma menina de capa vermelha.',ex:'CHAPEUZINHO: CH no começo, NH no fim.'},

/* ---------------- PLURAL ---------------- */
{id:'pl1',tema:'plural',p:'Plural de LOBO:',o:['LOBOS','LOBOES','LOBOIS'],c:0,
 dica:'Termina em vogal: é só pôr S.',ex:'LOBO → LOBOS.'},
{id:'pl2',tema:'plural',p:'Plural de FLOR:',o:['FLORES','FLORS','FLORIS'],c:0,
 dica:'Termina em R: põe ES.',ex:'FLOR → FLORES.'},
{id:'pl3',tema:'plural',p:'Plural de AVIÃO:',o:['AVIÕES','AVIÃOS','AVIÃES'],c:0,
 dica:'ÃO vira ÕES.',ex:'AVIÃO → AVIÕES.'},
{id:'pl4',tema:'plural',p:'Plural de ANIMAL:',o:['ANIMAIS','ANIMALS','ANIMALES'],c:0,
 dica:'Termina em L: vira IS.',ex:'ANIMAL → ANIMAIS.'},
{id:'pl5',tema:'plural',p:'Plural de HOMEM:',o:['HOMENS','HOMEMS','HOMEMES'],c:0,
 dica:'Termina em M: vira NS.',ex:'HOMEM → HOMENS.'},
{id:'pl6',tema:'plural',p:'Plural de LUZ:',o:['LUZES','LUZS','LUZIS'],c:0,
 dica:'Termina em Z: põe ES.',ex:'LUZ → LUZES.'},
{id:'pl7',tema:'plural',p:'Plural de BALÃO:',o:['BALÕES','BALÃOS','BALÃES'],c:0,
 dica:'ÃO vira ÕES.',ex:'BALÃO → BALÕES.'},
{id:'pl8',tema:'plural',p:'O plural de "o porquinho" é...',o:['os porquinhos','o porquinhos','os porquinho'],c:0,
 dica:'O artigo também vai para o plural.',ex:'O → OS, porquinho → porquinhos.'},
{id:'pl9',tema:'plural',p:'Plural de NUVEM:',o:['NUVENS','NUVEMS','NUVEIS'],c:0,
 dica:'Termina em M: vira NS.',ex:'NUVEM → NUVENS.'},
{id:'pl10',tema:'plural',p:'Plural de CASA:',o:['CASAS','CASES','CASAIS'],c:0,
 dica:'Termina em vogal.',ex:'CASA → CASAS.'},
{id:'pl11',tema:'plural',p:'Qual palavra está no PLURAL?',o:['COELHOS','COELHO','FOLHA'],c:0,
 dica:'Plural é mais de um.',ex:'COELHOS: mais de um coelho.'}
];

return {TEMAS:TEMAS, ITENS:ITENS,
  doTema:function(k){ return ITENS.filter(function(i){ return i.tema===k; }); }};
})();
