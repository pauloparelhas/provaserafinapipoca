/* ============================================================
   HIS3_estudo_licoes.js — o CADERNO DO DETETIVE: as 13 lições da
   teoria de História Y2, 3º trimestre (HIS3_estudo.html).
   Mesmo formato do ING3_estudo_licoes.js; PT puro.
   Universo "Detetives do Tempo": quem explica cada lição é um
   personagem do jogo (Tic, Dona Lúcia, Seu Francisco, Seu Pedro,
   Doutor João, Vovó Lembrança, Dra. Clio).

   Fonte única: trabalho/3tri_historia/_roteiro.md (v1.1).
   Regras do pedagogico: objeto NOMEADO na classificação; vídeo de
   relato = oral; estetoscópio/quadro de giz/biblioteca/bicicleta
   ainda existem (ancorar na história); termômetro "de mercúrio";
   robô e fazenda no prédio = FUTURO; só o acendedor de lampião
   "desapareceu"; sem séculos.

   Lição: {k, tema, nome, cor, quem, treino:[[temas,n,tipo],...], telas:[...]}
   Tipos de telinha: texto · revela · escolha · ordena · liga · pares
   Nos campos que passam por W() (escolha.m, pares) NÃO há ( ) [ ] { } nem _
   fora da lacuna. Opções de escolha: texto puro (o motor compara textContent).
   ============================================================ */
window.HIS3_LICOES = (function(){
'use strict';
function R(t){ return '<div class="regra">'+t+'</div>'; }
function caixa(t,corpo,cor){ return '<div class="caixa"'+(cor?' style="border-color:'+cor+'"':'')+'><h3'+(cor?' style="color:'+cor+'"':'')+'>'+t+'</h3>'+corpo+'</div>'; }
function esp(){ return '<div style="height:10px"></div>'; }
function fala(quem,t){ return '<div class="falaper"><b>'+quem+'</b><span>'+t+'</span></div>'; }
function passos(lista){
  return '<div class="passos'+(lista.length>3?' vert':'')+'">'+lista.map(function(p,i){
    return (i?'<span class="pseta" aria-hidden="true">&rsaquo;</span>':'')+
      '<div class="passo"><b>'+p.t+'</b>'+(p.s?'<span>'+p.s+'</span>':'')+'</div>';
  }).join('')+'</div>';
}
/* antes × hoje (e o que continuou) */
function antesHoje(antes,hoje,continua){
  return '<div class="ah"><div class="ahc antes"><b>ANTES</b><ul>'+antes.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul></div>'+
    '<div class="ahc hoje"><b>HOJE</b><ul>'+hoje.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul></div></div>'+
    (continua?'<div class="ahc cont"><b>CONTINUOU IGUAL</b><p>'+continua+'</p></div>':'');
}
/* as 4 cartas de fonte, com as cores fixas do universo */
var COR={oral:'#a855f7',escrita:'#3b82f6',visual:'#f97316',material:'#22c55e'};
function carta(k,nome,frase,ex){
  return '<div class="cartaf" style="--cf:'+COR[k]+'"><span class="cfic cf-'+k+'"></span><b>'+nome+'</b><i>'+frase+'</i><span>'+ex+'</span></div>';
}
function foto(n,leg){ return '<img class="fesc" src="media/his3/fonte-'+n+'.jpg" alt="'+leg+'"> '+leg; }

return [

/* ===================== 1. A MISSÃO: O QUE SÃO FONTES ===================== */
{k:'missao', tema:'fontes', nome:'A missão: o que são fontes históricas', cor:'#a855f7', quem:'Tic',
 treino:[[['fontes'],3,'conceito']], telas:[
 {tipo:'texto', tit:'Socorro! A Rainha Traça chegou',
  fala:'Tic, o despertador, explica: a Rainha Traça e suas traçinhas estão roendo as pistas do passado no Museu da Memória. Sem pistas, todo mundo esquece de onde veio. Vamos ser detetives do tempo!',
  html:fala('Tic, o despertador','Trim! A <b>Rainha Traça</b> e as traçinhas estão roendo as <b>pistas do passado</b> do Museu da Memória: cartas, fotos, mapas, brinquedos, relatos…')+
   R('Sem pistas, todo mundo esquece de onde veio. Pegue a sua <b>lupa</b>: agora você é um <b>detetive do tempo</b>!')+
   caixa('O lema do detetive','<p>"Para entender para onde vamos, precisamos descobrir de onde viemos."</p>')},
 {tipo:'texto', tit:'O que são fontes históricas?',
  fala:'Fontes históricas são aquilo que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas. São pistas do passado. Tudo ao nosso redor pode contar uma história.',
  html:R('<b>Fontes históricas</b> são aquilo que a gente pode <b>ver, ouvir, tocar ou ler</b> para aprender sobre <b>outras épocas</b>.')+
   R('São <b>pistas do passado</b>. "Tudo ao nosso redor pode contar uma história."')+
   R('"Tudo o que produzimos deixa um <b>rastro</b>." Esses rastros são as nossas fontes.')},
 {tipo:'texto', tit:'O que faz um detetive da história?',
  fala:'O detetive da história observa com atenção, pergunta e compara as pistas. As fontes preservam a memória das pessoas e dos povos, em todas as culturas. E o que você faz hoje será a fonte histórica de amanhã.',
  html:passos([{t:'Observa',s:'com atenção'},{t:'Pergunta',s:'quem? quando? por quê?'},{t:'Compara',s:'várias pistas'}])+
   R('As fontes <b>preservam a memória</b> das pessoas e dos povos, em todas as culturas.')+
   caixa('O protagonista é você','<p>O que você faz hoje (desenhos, textos, escolhas) será a <b>fonte histórica de amanhã</b>.</p>')},
 {tipo:'escolha', tit:'É pista do passado?', fala:'Isto pode ser uma fonte histórica?', pergunta:'Isto pode ser uma fonte histórica?',
  rotulo:'Pista', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'uma carta antiga da bisavó', c:'Sim', d:'Guarda o passado: é fonte histórica.'},
   {m:'uma boneca antiga', c:'Sim', d:'Brinquedo antigo conta como as crianças brincavam.'},
   {m:'a vovó contando a infância dela', c:'Sim', d:'Relato contado é fonte histórica: oral.'},
   {m:'uma nuvem passando no céu agora', c:'Não', d:'A nuvem não guarda nada do passado das pessoas.'},
   {m:'uma foto antiga da turma', c:'Sim', d:'A foto guarda um momento do passado.'}
  ]}
]},

/* ===================== 2. AS 4 CARTAS DE FONTE ===================== */
{k:'quatro', tema:'fontes', nome:'As 4 cartas: oral, escrita, visual e material', cor:'#3b82f6', quem:'Tic',
 treino:[[['fontes'],4,'rapida']], telas:[
 {tipo:'texto', tit:'As 4 cartas de fonte',
  fala:'Oral: relatos e histórias contadas por pessoas. Escrita: diários, leis, jornais e cartas. Visual: pinturas, fotografias e mapas. Material: brinquedos, roupas, construções e utensílios.',
  html:'<div class="cartas4">'+
   carta('oral','ORAL','alguém CONTA','relatos e histórias contadas por pessoas: o vovô contando, entrevista, cantigas')+
   carta('escrita','ESCRITA','alguém ESCREVEU','diários, leis, jornais e cartas; bilhete, receita, certidão, livro antigo')+
   carta('visual','VISUAL','a gente VÊ uma imagem','pinturas, fotografias e mapas; escultura')+
   carta('material','MATERIAL','a gente TOCA um objeto','brinquedos, roupas, construções e utensílios')+'</div>'},
 {tipo:'revela', tit:'Fonte falada, história guardada', regra:'Toque em cada cartão.',
  fala:'Fonte oral: memórias passadas de geração em geração por meio da fala.',
  cartoes:[
   {f:'O que é fonte oral?', b:'Um relato ou história CONTADA por uma pessoa. Passa de geração em geração pela fala.'},
   {f:'Exemplos', b:'o vovô contando, uma entrevista, histórias de vida, cantigas que a vovó ensinou cantando'},
   {f:'Perguntas do detetive', b:'Quem conta? O que contou? De que época se lembrava? O que eu aprendi?'}
  ]},
 {tipo:'escolha', tit:'Que fonte é? (fotos da aula)', fala:'Que tipo de fonte é?', pergunta:'Que tipo de fonte é?',
  rotulo:'Foto', proxRot:'Próxima', medio:true, op:['Oral','Escrita','Visual','Material'], itens:[
   {m:foto('carta','a carta antiga'), c:'Escrita', d:'Carta tem texto escrito.'},
   {m:foto('chapeu','o chapéu e o casaco, os objetos'), c:'Material', d:'Roupas são objetos: material.'},
   {m:foto('album','as fotos do álbum'), c:'Visual', d:'Foto é imagem: visual.'},
   {m:foto('mapa','o mapa antigo'), c:'Visual', d:'Mapa é imagem, como pintura e foto.'},
   {m:foto('livros','o que está escrito nos livros antigos'), c:'Escrita', d:'Texto escrito: fonte escrita.'},
   {m:foto('entrevista','a entrevista: uma moça contando a vida dela'), c:'Oral', d:'Ela está CONTANDO: oral.'},
   {m:foto('sofa','o sofá antigo, o móvel'), c:'Material', d:'Móvel é objeto: material.'},
   {m:foto('certidao','a certidão de nascimento'), c:'Escrita', d:'Documento escrito.'},
   {m:foto('quadros','as fotos nos quadros da parede'), c:'Visual', d:'São fotos: visual.'},
   {m:foto('bonecas','as bonecas antigas, os brinquedos'), c:'Material', d:'Brinquedos são objetos.'},
   {m:foto('castelo','o castelo, a construção'), c:'Material', d:'Construções são fonte material.'},
   {m:foto('roda','as cantigas de roda que a vovó ensinou cantando'), c:'Oral', d:'Passaram pela fala, cantando: oral.'}
  ]}
]},

/* ===================== 3. PEGADINHAS, FICHA E LEGENDA ===================== */
{k:'pegadinhas', tema:'fontes', nome:'Pegadinhas do detetive, ficha e legenda', cor:'#f97316', quem:'Tic',
 treino:[[['fontes'],3,'rapida'],[['fontes'],2,'conceito']], telas:[
 {tipo:'texto', tit:'Cuidado com as pegadinhas!',
  fala:'A foto de um objeto é fonte visual. O objeto é fonte material. Vídeo de alguém contando é fonte oral. Se a vovó escreveu, é escrita. Se a vovó falou, é oral. Mapa e pintura são visuais.',
  html:caixa('Foto × objeto','<p>A <b>FOTO</b> da boneca = <b>visual</b>. A <b>boneca</b> de verdade = <b>material</b>.</p>','#f97316')+esp()+
   caixa('Vídeo de relato','<p>Um vídeo de alguém <b>contando</b> uma história continua sendo fonte <b>oral</b>.</p>','#a855f7')+esp()+
   caixa('Escreveu × falou','<p>A vovó <b>escreveu</b> uma carta = <b>escrita</b>. A vovó <b>falou</b> = <b>oral</b>.</p>','#3b82f6')+esp()+
   caixa('Mapa e pintura','<p>São imagens: <b>visual</b> (mesmo com letras no mapa).</p>','#f97316')},
 {tipo:'escolha', tit:'Pegadinha ou não?', fala:'Que tipo de fonte é?', pergunta:'Que tipo de fonte é?',
  rotulo:'Pista', proxRot:'Próxima', medio:true, op:['Oral','Escrita','Visual','Material'], itens:[
   {m:'a FOTO de uma boneca antiga', c:'Visual', d:'É a foto, não a boneca: visual.'},
   {m:'a boneca antiga de verdade', c:'Material', d:'O brinquedo é objeto: material.'},
   {m:'um vídeo do vovô contando como era a cidade', c:'Oral', d:'Ele está contando: oral.'},
   {m:'a carta que a vovó escreveu', c:'Escrita', d:'Ela escreveu: escrita.'},
   {m:'a vovó falando da infância dela', c:'Oral', d:'Ela falou: oral.'},
   {m:'uma pintura antiga', c:'Visual', d:'Pintura é imagem.'},
   {m:'um uniforme antigo da escola', c:'Material', d:'Roupa é objeto.'},
   {m:'um jornal antigo', c:'Escrita', d:'Jornal tem textos.'}
  ]},
 {tipo:'texto', tit:'A ficha de observação do objeto',
  fala:'Na ficha de observação: como é o objeto? Ele conta uma história do passado? Por quê? O que ele faz você lembrar: uma pessoa da família, algo que já aconteceu ou um lugar.',
  html:caixa('Ficha de observação','<p>• Número e nome do objeto<br>• Como é esse objeto?<br>• Conta uma história do passado? (sim / não / não tenho certeza) Por quê?<br>• O que faz você lembrar? <b>uma pessoa da família · algo que já aconteceu · um lugar</b></p>')},
 {tipo:'texto', tit:'Legenda de detetive e fotos da família',
  fala:'Uma boa legenda diz o que a imagem mostra, que tipo de fonte é e o que ela pode contar sobre o passado. Para descobrir a história de uma foto antiga da família, pergunte: quem aparece, onde e quando foi tirada, o que estava acontecendo e por que ela é importante.',
  html:caixa('Legenda de fonte','<p>1. O que a imagem mostra?<br>2. Que tipo de fonte é?<br>3. O que ela pode contar sobre o passado?</p><p>Ex.: <i>foto de um trem a vapor antigo · fonte visual · mostra como as pessoas viajavam antigamente.</i></p>')+esp()+
   caixa('Histórias escondidas nas fotografias','<p>Quem são as pessoas? Onde e quando foi tirada? O que estava acontecendo? Por que a foto é importante para a família?</p>')},
 {tipo:'escolha', tit:'Pode ser mais de uma: é fonte ESCRITA?', fala:'Pode ser mais de uma. Esta pista é fonte escrita?', pergunta:'Esta pista é fonte ESCRITA? (na prova, marque TODAS as escritas)',
  rotulo:'Pista', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'a carta antiga', c:'Sim', d:'Tem texto escrito.'},
   {m:'o chapéu antigo, o objeto', c:'Não', d:'É objeto: material.'},
   {m:'o diário da tia', c:'Sim', d:'Tem texto escrito.'},
   {m:'as fotos do álbum', c:'Não', d:'São imagens: visual.'},
   {m:'a certidão de nascimento', c:'Sim', d:'Documento escrito.'},
   {m:'o mapa antigo', c:'Não', d:'Mapa é imagem: visual.'},
   {m:'a mensagem escrita no verso do cartão-postal', c:'Sim', d:'A parte com letras é escrita; a foto da frente seria visual.'}
  ]}
]},

/* ===================== 4. A ESCOLA TEM HISTÓRIA ===================== */
{k:'escola', tema:'escola', nome:'A escola tem história', cor:'#0ea5e9', quem:'Dona Lúcia',
 treino:[[['escola'],4]], telas:[
 {tipo:'texto', tit:'Investigando os espaços da escola',
  fala:'Dona Lúcia conta: a escola tem uma história cheia de acontecimentos, pessoas e mudanças. Fotos antigas de turmas, cadernos guardados, uniformes antigos, troféus, registros de eventos, bilhetes e livros antigos guardam pistas.',
  html:fala('Dona Lúcia, a professora','A nossa escola tem uma história cheia de <b>acontecimentos, pessoas e mudanças</b>!')+
   '<div class="cartas4">'+
   carta('visual','FOTOS ANTIGAS','de turmas e de eventos','visual')+
   carta('escrita','CADERNOS, BOLETINS, BILHETES','registros escritos','escrita')+
   carta('material','UNIFORMES E TROFÉUS','objetos da escola','material')+
   carta('oral','MEMÓRIAS CONTADAS','por alunos, professores e funcionários','oral')+'</div>'},
 {tipo:'texto', tit:'Documentos da vida escolar',
  fala:'Os documentos guardados na escola são fontes escritas. Eles registram fatos e decisões. Mostram como era o ensino, as regras da escola, o que os estudantes aprendiam e como era o dia a dia. Ajudam a contar como a escola mudou com o tempo.',
  html:R('Os <b>documentos da vida escolar</b> são <b>fontes escritas</b>: cadernos, boletins, registros de eventos, bilhetes.')+
   R('Eles registram <b>fatos e decisões</b> e mostram <b>como era o ensino</b>, as <b>regras</b> da escola, o que os estudantes <b>aprendiam</b> e como era o <b>dia a dia</b>.')+
   R('Comparando documentos de tempos diferentes, vemos <b>como a escola mudou</b>.')},
 {tipo:'revela', tit:'Por que guardar?', regra:'Toque em cada cartão.',
  fala:'Guardar documentos preserva memórias e conta a história da escola e da nossa vida de estudante.',
  cartoes:[
   {f:'Por que guardar documentos?', b:'Para preservar memórias e contar a história da escola e da nossa vida de estudante.'},
   {f:'Pesquisa com a família', b:'Qual documento da sua época de escola era importante? Para que ele servia? Você ainda guarda?'},
   {f:'Memórias diferentes', b:'Alunos, professores e funcionários podem lembrar da mesma escola de jeitos diferentes.'},
   {f:'Objetos, documentos e festas', b:'Guardam lembranças e contam o passado da escola e das pessoas.'}
  ]},
 {tipo:'escolha', tit:'Documento escrito da escola?', fala:'É um documento escrito da vida escolar?', pergunta:'É um documento ESCRITO da vida escolar?',
  rotulo:'Pista', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'um boletim antigo', c:'Sim', d:'Boletim é documento escrito.'},
   {m:'um caderno guardado', c:'Sim', d:'O que está escrito no caderno é registro escrito.'},
   {m:'um bilhete da professora', c:'Sim', d:'Bilhete é texto escrito.'},
   {m:'um troféu antigo', c:'Não', d:'Troféu é fonte da escola, mas MATERIAL (objeto).'},
   {m:'a foto antiga da turma', c:'Não', d:'A foto também guarda lembranças da escola, mas é fonte VISUAL, não escrita.'}
  ]}
]},

/* ===================== 5. MUDOU OU CONTINUOU? ===================== */
{k:'mudou', tema:'escola', nome:'Mudou ou continuou igual?', cor:'#06b6d4', quem:'Dona Lúcia',
 treino:[[['escola'],2],[['profissoes'],2,'rapida']], telas:[
 {tipo:'texto', tit:'Mudanças e permanências',
  fala:'Mudança é o que ficou diferente com o tempo. Permanência é o que continuou igual. O detetive compara objetos e documentos de tempos diferentes.',
  html:'<div class="ah"><div class="ahc antes"><b>MUDANÇA</b><p>o que <b>ficou diferente</b> com o tempo</p></div><div class="ahc hoje"><b>PERMANÊNCIA</b><p>o que <b>continuou igual</b></p></div></div>'+
   R('Para descobrir, o detetive <b>compara</b> objetos e documentos de <b>tempos diferentes</b>.')},
 {tipo:'texto', tit:'Na escola da Dona Lúcia',
  fala:'Antes: quadro de giz, livros grandes e pesados, cadernos grossos, tudo escrito à mão, copiar do quadro e pesquisar na biblioteca. Hoje: computador, vídeos, lousas digitais, tablets, internet e jogos educativos. Continuou igual: conversar com os alunos, ouvir suas ideias e ajudá-los a aprender com alegria.',
  html:antesHoje(['quadro de giz','livros grandes e pesados','cadernos grossos','tudo escrito à mão','copiar do quadro','pesquisar na biblioteca'],
   ['computador e vídeos','lousas digitais e tablets','pesquisar na internet','jogos educativos'],
   'conversar com os alunos, ouvir as ideias deles e ajudá-los a aprender com alegria')},
 {tipo:'escolha', tit:'Mudança ou permanência?', fala:'Isso é uma mudança ou uma permanência?', pergunta:'Isso é uma mudança ou uma permanência?',
  rotulo:'Frase', proxRot:'Próxima', medio:true, op:['Mudança','Permanência'], itens:[
   {m:'Na história da Dona Lúcia: do quadro de giz para a lousa digital', c:'Mudança', d:'Ficou diferente.'},
   {m:'Dona Lúcia conversa e ouve os alunos, antes e hoje', c:'Permanência', d:'Continuou igual.'},
   {m:'Seu Francisco trocou a bicicleta pela moto', c:'Mudança', d:'O jeito de entregar ficou diferente.'},
   {m:'Doutor João cuida com atenção de cada paciente, antes e hoje', c:'Permanência', d:'Isso não mudou.'},
   {m:'Na fazenda do Seu Pedro: dos bois puxando o arado para o trator', c:'Mudança', d:'Ficou diferente.'},
   {m:'Seu Pedro ama a terra e cuida da natureza, antes e hoje', c:'Permanência', d:'Continuou igual.'}
  ]}
]},

/* ===================== 6. CADA UM VÊ DE UM JEITO ===================== */
{k:'olhar', tema:'olhar', nome:'Cada um vê de um jeito', cor:'#f97316', quem:'Dra. Clio',
 treino:[[['olhar'],4]], telas:[
 {tipo:'texto', tit:'O mesmo documento, histórias diferentes',
  fala:'A Dra. Clio, historiadora do Museu da Memória, explica: olhando a mesma imagem, cada pessoa repara em coisas diferentes. Olhando de novo, percebemos coisas novas. Por isso existem histórias diferentes a partir de um mesmo documento: cada pessoa olha com sua experiência, imaginação e ponto de vista.',
  html:fala('Dra. Clio, historiadora','Olhem a mesma foto por 1 minuto. Cada um vai lembrar de coisas diferentes! E olhando de novo, vocês percebem coisas novas.')+
   caixa('Por que existem histórias diferentes a partir de um mesmo documento?','<p>Porque cada pessoa olha com a sua <b>experiência</b>, <b>imaginação</b> e <b>ponto de vista</b>. A história é feita de <b>muitos pontos de vista</b>.</p>')+esp()+
   R('Respeite a opinião dos colegas e valorize todas as interpretações.')},
 {tipo:'texto', tit:'Quem fez e por quê?',
  fala:'Toda fonte foi criada por alguém, em um tempo e lugar, com um objetivo. Pergunte: quem produziu? Para quem foi feita? Qual era o objetivo? O cartão-postal contava a viagem aos amigos. O anúncio de jornal e a propaganda queriam vender.',
  html:R('Toda fonte foi criada <b>por alguém</b>, em um <b>tempo e lugar</b>, com um <b>objetivo</b>.')+
   passos([{t:'Quem produziu?'},{t:'Para quem foi feita?'},{t:'Qual era o objetivo?'}])+
   caixa('Exemplos da aula','<p>• <b>Cartão-postal</b> de Salvador: quem viajou escreveu para os amigos, contando a viagem.<br>• <b>Anúncio de jornal</b> antigo: vender leite tirado na hora.<br>• <b>Propaganda</b> antiga de um alimento: vender o alimento às famílias.</p><p>Anúncio e propaganda servem para <b>VENDER</b>.</p>')},
 {tipo:'texto', tit:'Suposição × fato',
  fala:'Quando não temos todas as informações, fazemos suposições, e nem sempre elas estão certas. Os historiadores reúnem várias fontes, comparam e ouvem diferentes versões para chegar mais perto da verdade. Algumas histórias são registradas e outras acabam esquecidas.',
  html:R('Sem todas as informações, fazemos <b>suposições</b>, e nem sempre elas estão certas.')+
   R('O <b>historiador</b> reúne <b>várias fontes</b>, <b>compara</b> e ouve <b>diferentes versões</b> para chegar mais perto da verdade.')+
   R('Algumas histórias são registradas; outras acabam <b>esquecidas</b>.')},
 {tipo:'escolha', tit:'Qual era o objetivo?', fala:'Qual era o objetivo de quem criou?', pergunta:'Qual era o objetivo de quem criou?',
  rotulo:'Fonte', proxRot:'Próxima', medio:true, itens:[
   {m:'um cartão-postal escrito numa viagem para os amigos', op:['Contar a viagem','Vender leite'], c:'Contar a viagem', d:'Quem viaja manda notícias.'},
   {m:'um anúncio de jornal: vende-se leite na rua tal', op:['Vender leite','Contar uma viagem'], c:'Vender leite', d:'Anúncio serve para vender.'},
   {m:'uma propaganda antiga de alimento para crianças', op:['Vender o alimento','Guardar uma receita'], c:'Vender o alimento', d:'Propaganda quer que você compre.'}
  ]},
 {tipo:'liga', tit:'Quem fez e para quem?', regra:'Toque na fonte e depois em quem fez ou para quem foi feita.', fala:'Ligue a fonte a quem fez ou para quem foi feita.',
  pares:[['cartão-postal de Salvador: quem escreveu?','quem viajou'],['cartão-postal: para quem?','os amigos de quem viajou'],['propaganda do alimento: para quem?','as famílias'],['anúncio de leite: para quem?','quem queria comprar leite']]}
]},

/* ===================== 7. PROFISSÕES NO TEMPO ===================== */
{k:'profissoes', tema:'profissoes', nome:'Profissões no tempo', cor:'#22c55e', quem:'Tic',
 treino:[[['profissoes'],4,'conceito']], telas:[
 {tipo:'texto', tit:'Por que as profissões mudaram?',
  fala:'Muitas profissões mudaram com o tempo. Algumas continuam existindo, mas o jeito de trabalhar não é mais o mesmo, porque surgiram novas máquinas, tecnologias e formas de se comunicar. As pessoas passaram a trabalhar mais rápido ou com mais conforto.',
  html:R('Muitas profissões <b>mudaram</b> com o tempo.')+
   R('Algumas <b>continuam existindo</b>, mas o <b>jeito de trabalhar</b> mudou, porque surgiram <b>novas máquinas, tecnologias e formas de se comunicar</b>.')+
   R('As pessoas passaram a trabalhar <b>mais rápido</b> ou com <b>mais conforto</b>.')+
   R('O trabalho está em todo lugar: na escola, em casa, nas ruas, nas fazendas, nos hospitais.')},
 {tipo:'texto', tit:'Uma profissão que desapareceu',
  fala:'O acendedor de lampião caminhava pelas ruas acendendo os postes um a um. Com a chegada da energia elétrica, esse trabalho deixou de ser necessário. Novas tecnologias passaram a fazer coisas que antes eram feitas por pessoas.',
  html:caixa('O acendedor de lampião','<p>Caminhava pelas ruas acendendo os <b>postes um a um</b>. Com a <b>energia elétrica</b>, esse trabalho <b>deixou de existir</b>.</p>','#eab308')+esp()+
   R('Novas tecnologias passaram a fazer coisas que antes eram feitas por pessoas.')+
   R('<b>Desapareceu</b> × <b>mudou</b>: o acendedor de lampião desapareceu; o carteiro mudou, mas continua existindo.')+
   caixa('Nas fotos antigas da aula','<p>• o <b>leiteiro</b> entregava garrafas de leite na porta das casas<br>• a <b>datilógrafa</b> escrevia numa máquina de escrever<br>• vendedores de rua levavam cestos de frutas e vassouras</p>')},
 {tipo:'escolha', tit:'Pode ser mais de uma: continua existindo?', fala:'Esta profissão das histórias continua existindo hoje?', pergunta:'Esta profissão continua existindo hoje? (pode ser mais de uma)',
  rotulo:'Profissão', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'carteiro, do Seu Francisco', c:'Sim', d:'Continua, de um jeito diferente.'},{m:'professora, da Dona Lúcia', c:'Sim', d:'Continua, com computador e lousa digital.'},
   {m:'fazendeiro, do Seu Pedro', c:'Sim', d:'Continua, com trator e celular.'},{m:'médico, do Doutor João', c:'Sim', d:'Continua, com exames no celular.'},
   {m:'acendedor de lampião', c:'Não', d:'Desapareceu com a energia elétrica.'}
  ]},
 {tipo:'revela', tit:'Profissões novas e mais', regra:'Toque em cada cartão.',
  fala:'Todas as profissões de hoje já existiam no tempo dos avós? Não. A tecnologia criou profissões novas: designer gráfico, desenvolvedor de aplicativos, cientista de dados.',
  cartoes:[
   {f:'Todas as profissões de hoje existiam no tempo dos avós?', b:'Não! Algumas são novas.'},
   {f:'Profissões novas da tecnologia', b:'designer gráfico, desenvolvedor de aplicativos, cientista de dados'},
   {f:'Entrevista com um profissional', b:'profissão, ferramentas, local de trabalho, como trabalha, o que a tecnologia mudou'},
   {f:'Trabalho e condições de vida', b:'o lugar onde a pessoa vive, a família e as condições de vida influenciam o trabalho. Há trabalhos que passam despercebidos, mas são muito importantes.'},
   {f:'Trabalho e meio ambiente', b:'alguns trabalhos ajudam a natureza; outros podem causar problemas e precisam mudar.'}
  ]}
]},

/* ===================== 8. SEU FRANCISCO, O CARTEIRO ===================== */
{k:'carteiro', tema:'profissoes', nome:'Seu Francisco, o carteiro', cor:'#eab308', quem:'Seu Francisco',
 treino:[[['profissoes'],3]], telas:[
 {tipo:'texto', tit:'A história do Seu Francisco',
  fala:'Seu Francisco entregava cartas a pé, com uma grande bolsa de couro, sob sol ou chuva. Depois ganhou uma bicicleta, depois vieram as motos. As cartas diminuíram e ele passou a entregar contas, revistas e caixas de compras pela internet. Hoje os carteiros usam aparelhos com tela. A profissão continua existindo, de um jeito diferente.',
  html:fala('Seu Francisco, o carteiro','Eu andava quilômetros a pé, com a bolsa de couro, levando cartas escritas à mão!')+
   antesHoje(['a pé, com bolsa de couro','cartas escritas à mão','depois: bicicleta','depois: motos (mais longe, mais encomendas)'],
    ['contas, revistas e compras pela internet','aparelhos com tela para registrar as entregas','mensagens chegam em segundos pelo celular'],
    'a profissão de carteiro continua existindo, de um jeito diferente')},
 {tipo:'ordena', tit:'Ponha em ordem', regra:'Toque do mais antigo ao mais novo.', fimMsg:'Isso! A pé, bicicleta, moto e aparelho com tela.',
  fala:'Toque do mais antigo ao mais novo.',
  quadros:[{cap:'a pé, com a bolsa de couro'},{cap:'de bicicleta'},{cap:'de moto'},{cap:'com aparelho com tela'}]},
 {tipo:'texto', tit:'Mensagens antes e hoje; entregas de hoje',
  fala:'Antes do celular, as pessoas mandavam cartas escritas à mão, levadas pelo carteiro. Hoje as mensagens chegam em segundos. Nas entregas, antes havia carrinho de mão; hoje existe até entrega por drone.',
  html:antesHoje(['cartas escritas à mão, levadas pelo carteiro','entrega com carrinho de mão'],['mensagens pelo celular, em segundos','entrega por drone'],null)}
]},

/* ===================== 9. DONA LÚCIA E DOUTOR JOÃO ===================== */
{k:'luciajoao', tema:'profissoes', nome:'Dona Lúcia e Doutor João', cor:'#14b8a6', quem:'Doutor João',
 treino:[[['profissoes'],4]], telas:[
 {tipo:'texto', tit:'Dona Lúcia, a professora',
  fala:'Quando criança, Dona Lúcia brincava de dar aula para as bonecas numa lousinha de papelão. Quando cresceu, deu aula com quadro de giz, livros pesados e tudo escrito à mão. Hoje usa computador e mostra vídeos. Continua igual: conversar com os alunos e ajudá-los a aprender com alegria.',
  html:fala('Dona Lúcia','Eu brincava de dar aula para as bonecas, numa lousinha de papelão!')+
   antesHoje(['quadro de giz','livros grandes e pesados, cadernos grossos','tudo escrito à mão','pesquisa na biblioteca'],['computador e vídeos','lousas digitais e tablets','internet e jogos educativos'],
    'conversar com os alunos, ouvir as ideias deles e ajudá-los a aprender com alegria')},
 {tipo:'texto', tit:'Doutor João, o médico',
  fala:'No começo, Doutor João atendia num consultório simples, com estetoscópio, termômetro de mercúrio, papel e caneta. Os exames demoravam dias e as fichas ficavam em arquivos de papel. Hoje ele usa computador, recebe exames pelo celular, faz consultas por vídeo e há máquinas que mostram o que acontece dentro do corpo. Continua igual: o cuidado e a atenção com cada paciente.',
  html:fala('Doutor João','Quando eu era pequeno, media a "pressão" da família com uma fita métrica!')+
   antesHoje(['consultório simples, poucos aparelhos','estetoscópio, termômetro de mercúrio','papel e caneta','exames demoravam dias','fichas em arquivos de papel'],
    ['computador','exames pelo celular','consulta por vídeo','máquinas que mostram dentro do corpo','na aula: robô que ajuda na cirurgia (já existe hoje)'],
    'o cuidado e a atenção com cada paciente')},
 {tipo:'escolha', tit:'Antes ou hoje?', fala:'Na história, isto era antes ou é hoje?', pergunta:'Na história, isto era ANTES ou é HOJE?',
  rotulo:'Pista', proxRot:'Próxima', op:['Antes','Hoje'], itens:[
   {m:'Doutor João: exames que demoravam dias', c:'Antes', d:'Antes os exames demoravam dias.'},
   {m:'Doutor João: consulta por vídeo', c:'Hoje', d:'Hoje ele atende por vídeo quem mora longe.'},
   {m:'Doutor João: fichas em arquivos de papel', c:'Antes', d:'Hoje usa programas no computador.'},
   {m:'Dona Lúcia: lousa digital e tablets', c:'Hoje', d:'Novidade de hoje.'},
   {m:'Dona Lúcia: tudo escrito à mão no quadro de giz', c:'Antes', d:'Era assim no começo.'},
   {m:'Dona Lúcia: mostrar vídeos para a turma', c:'Hoje', d:'Hoje ela usa computador e vídeos.'}
  ]}
]},

/* ===================== 10. SEU PEDRO E A FAZENDA ===================== */
{k:'fazenda', tema:'profissoes', nome:'Seu Pedro e a fazenda', cor:'#84cc16', quem:'Seu Pedro',
 treino:[[['profissoes'],3],[['mundo'],1]], telas:[
 {tipo:'texto', tit:'A fazenda que mudou com o tempo',
  fala:'Quando Seu Pedro era pequeno, tudo era feito com as mãos e com a ajuda dos animais: arado puxado por bois, uma semente de cada vez, colheita manual. Depois vieram os tratores e máquinas que plantam e colhem sozinhas. Hoje ele usa o celular para saber se vai chover. O fazendeiro do futuro poderá cultivar em cima de prédios ou com robôs. Continua igual: amar a terra, cuidar da natureza e produzir alimentos saudáveis.',
  html:fala('Seu Pedro, o fazendeiro','Para arar a terra, eu usava um arado puxado por bois!')+
   antesHoje(['com as mãos e com a ajuda dos animais','arado puxado por bois','uma semente de cada vez','colheita manual'],
    ['tratores','máquinas que plantam e colhem sozinhas','celular para saber se vai chover e cuidar da plantação a distância'],
    'amar a terra, cuidar da natureza e produzir alimentos saudáveis')+
   caixa('E no FUTURO?','<p>O fazendeiro do futuro poderá cultivar <b>em cima de prédios</b> ou com ajuda de <b>robôs</b>. (Isso é futuro, não é hoje!)</p>','#84cc16')},
 {tipo:'texto', tit:'Lá atrás: nômades, agricultura e cidades',
  fala:'Por milhares de anos, os seres humanos foram nômades: viajavam em busca de comida. Quando aprenderam a cultivar a terra, surgiram acampamentos fixos, que deram origem às cidades.',
  html:passos([{t:'Nômades',s:'viajavam em busca de comida'},{t:'Agricultura',s:'aprenderam a cultivar a terra'},{t:'Acampamentos fixos',s:''},{t:'Cidades',s:''}])+
   R('Na aula, outras áreas também mudaram: na <b>engenharia</b>, dos desenhos de engrenagens no papel para engenheiros com <b>robôs e computador</b>.')},
 {tipo:'escolha', tit:'Antes, hoje ou futuro?', fala:'Na história do Seu Pedro, é antes, hoje ou futuro?', pergunta:'Na história do Seu Pedro, é antes, hoje ou futuro?',
  rotulo:'Pista', proxRot:'Próxima', op:['Antes','Hoje','Futuro'], itens:[
   {m:'arado puxado por bois', c:'Antes', d:'Era assim quando ele era pequeno.'},
   {m:'usar o celular para saber se vai chover', c:'Hoje', d:'É o que ele faz hoje.'},
   {m:'cultivar em cima de prédios', c:'Futuro', d:'É o fazendeiro do futuro.'},
   {m:'colher tudo com as mãos', c:'Antes', d:'Colheita manual era antes.'},
   {m:'plantar com a ajuda de robôs', c:'Futuro', d:'Robôs: fazendeiro do futuro.'}
  ]}
]},

/* ===================== 11. O JOGO DAS FERRAMENTAS ===================== */
{k:'ferramentas', tema:'profissoes', nome:'O jogo das ferramentas', cor:'#10b981', quem:'Tic',
 treino:[[['profissoes'],3,'rapida']], telas:[
 {tipo:'texto', tit:'Cada profissão, suas ferramentas',
  fala:'No jogo das cartas, cada profissão tem mais de uma ferramenta. Médico: maleta, seringa antiga, termômetro de mercúrio, estetoscópio. Fotógrafo: câmera antiga de tripé e fotografias. Professora: lousa, livros e globo. Construtor: marreta, colher de pedreiro e pincel.',
  html:caixa('Médico','<p>maleta · seringa antiga · termômetro de mercúrio · estetoscópio</p>','#14b8a6')+esp()+
   caixa('Fotógrafo','<p>câmera antiga de tripé · fotografias</p>','#f97316')+esp()+
   caixa('Professora','<p>lousa · livros · globo</p>','#0ea5e9')+esp()+
   caixa('Construtor (pedreiro)','<p>marreta · colher de pedreiro · pincel</p>','#eab308')+
   R('Para cada profissão há <b>mais de uma</b> ferramenta.')},
 {tipo:'liga', tit:'Ligue a ferramenta à profissão', regra:'Toque numa ferramenta e depois na profissão.',
  fala:'Ligue a ferramenta à profissão.',
  pares:[['estetoscópio e termômetro de mercúrio','médico'],['câmera antiga de tripé','fotógrafo'],['lousa e globo','professora'],['marreta e colher de pedreiro','construtor'],['bolsa de couro com cartas','carteiro'],['arado puxado por bois','fazendeiro']]},
 {tipo:'escolha', tit:'Pode ser mais de uma: é do MÉDICO?', fala:'É ferramenta do médico?', pergunta:'É ferramenta do MÉDICO? (pode ser mais de uma)', rotulo:'Ferramenta', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'maleta', c:'Sim', d:'Do médico.'},{m:'seringa antiga', c:'Sim', d:'Do médico.'},{m:'termômetro de mercúrio', c:'Sim', d:'Do médico.'},{m:'estetoscópio', c:'Sim', d:'Do médico.'},{m:'globo', c:'Não', d:'É da professora.'},{m:'marreta', c:'Não', d:'É do construtor.'}
  ]},
 {tipo:'escolha', tit:'Pode ser mais de uma: é do CONSTRUTOR?', fala:'É ferramenta do construtor?', pergunta:'É ferramenta do CONSTRUTOR? (pode ser mais de uma)', rotulo:'Ferramenta', proxRot:'Próxima', op:['Sim','Não'], itens:[
   {m:'marreta', c:'Sim', d:'Do construtor.'},{m:'colher de pedreiro', c:'Sim', d:'Do construtor.'},{m:'pincel, junto da marreta e da colher', c:'Sim', d:'Do construtor.'},{m:'lousa', c:'Não', d:'É da professora.'},{m:'câmera de tripé', c:'Não', d:'É do fotógrafo.'}
  ]}
]},

/* ===================== 12. RIOS ANTIGOS E PATRIMÔNIO ===================== */
{k:'rios', tema:'mundo', nome:'Rios antigos e patrimônio', cor:'#eab308', quem:'Dra. Clio',
 treino:[[['mundo'],4]], telas:[
 {tipo:'texto', tit:'As civilizações dos grandes rios',
  fala:'As cidades mais antigas cresceram abraçadas aos rios: Rio Nilo, no Egito; rios Tigre e Eufrates, na Mesopotâmia; Rio Amarelo, na China. Sem os rios, a vida não seria possível nessas regiões.',
  html:'<div class="rios"><div><b>Rio Nilo</b><span>Egito</span></div><div><b>Rios Tigre e Eufrates</b><span>Mesopotâmia</span></div><div><b>Rio Amarelo</b><span>China</span></div></div>'+
   R('As cidades mais antigas cresceram <b>"abraçadas" aos rios</b>: sem eles, a vida não seria possível nessas regiões.')},
 {tipo:'texto', tit:'Tesouros que o tempo não apaga',
  fala:'Patrimônio é tudo o que é importante para a memória de um povo. Material: museus, praças, estátuas. Imaterial: capoeira, festas juninas, receitas de família.',
  html:R('<b>Patrimônio</b> é tudo o que consideramos importante para a <b>memória de um povo</b>.')+
   '<div class="ah"><div class="ahc antes"><b>MATERIAL</b><p>museus, praças, estátuas</p></div><div class="ahc hoje"><b>IMATERIAL</b><p>capoeira, festas juninas, receitas de família</p></div></div>'+
   caixa('Ancestralidade','<p>"A história começa em nós." Cada família carrega <b>tradições</b>. Existe um objeto ou uma história na sua família há muito tempo?</p>')},
 {tipo:'escolha', tit:'Material ou imaterial?', fala:'Este patrimônio é material ou imaterial?', pergunta:'Este patrimônio é material ou imaterial?',
  rotulo:'Patrimônio', proxRot:'Próximo', op:['Material','Imaterial'], itens:[
   {m:'um museu', c:'Material', d:'É um prédio.'},{m:'a capoeira', c:'Imaterial', d:'É um saber, um costume.'},
   {m:'uma estátua na praça', c:'Material', d:'Dá para tocar.'},{m:'a festa junina', c:'Imaterial', d:'É uma festa.'},
   {m:'uma receita de família passada de geração em geração', c:'Imaterial', d:'É um costume da família.'},{m:'uma praça antiga', c:'Material', d:'É um lugar construído.'}
  ]},
 {tipo:'escolha', tit:'Qual é o rio?', fala:'Qual é o rio?', pergunta:'Qual é o rio?', rotulo:'Lugar', proxRot:'Próximo', itens:[
   {m:'Egito', op:['Nilo','Amarelo','Tigre e Eufrates'], c:'Nilo', d:'Egito: Rio Nilo.'},
   {m:'Mesopotâmia', op:['Tigre e Eufrates','Nilo','Amarelo'], c:'Tigre e Eufrates', d:'Mesopotâmia: Tigre e Eufrates.'},
   {m:'China', op:['Amarelo','Nilo','Tigre e Eufrates'], c:'Amarelo', d:'China: Rio Amarelo.'}
  ]}
]},

/* ===================== 13. TEMPO E MEMÓRIA (BASE) ===================== */
{k:'tempo', tema:'tempo', nome:'Tempo e memória (revisão)', cor:'#ec4899', quem:'Vovó Lembrança',
 treino:[[['tempo'],4]], telas:[
 {tipo:'texto', tit:'Quanto tempo o tempo tem?',
  fala:'O relógio marca o tempo igual para todos, mas cada pessoa pode sentir o tempo de um jeito diferente: rápido quando brincamos, devagar quando esperamos numa fila. Para medir o tempo, usamos relógio de sol, relógio de água, ampulheta, relógio cuco, de ponteiros, de bolso, calendário, relógio digital e celular.',
  html:fala('Vovó Lembrança','No meu tempo, a gente olhava o relógio de ponteiros e o calendário na parede!')+
   '<div class="ah"><div class="ahc antes"><b>PASSA RÁPIDO</b><p>brincar com os amigos, festa, jogo divertido</p></div><div class="ahc hoje"><b>PASSA DEVAGAR</b><p>fila, esperar o recreio, esperar o aniversário</p></div></div>'+
   R('O <b>relógio</b> marca o tempo <b>igual para todos</b>; cada pessoa pode <b>sentir</b> diferente.')+
   caixa('Instrumentos de medir o tempo','<p>relógio de sol · relógio de água · ampulheta · relógio cuco · de ponteiros · de bolso · calendário · relógio digital · celular</p>')},
 {tipo:'texto', tit:'O tempo na natureza e na Árvore generosa',
  fala:'Dia e noite e as estações do ano mostram o tempo passando. Em A árvore generosa, o menino cresceu, virou homem e ficou velho: o tempo passou, e o que ele queria mudou.',
  html:R('<b>Dia e noite</b>, as <b>estações do ano</b> e as pessoas <b>envelhecendo</b> mostram o tempo passar.')+
   passos([{t:'brincar'},{t:'dinheiro'},{t:'casa'},{t:'barco'},{t:'descansar'}])+
   R('Em <i>A árvore generosa</i>, o menino cresceu: o tempo passou e o que ele queria <b>mudou</b>.')},
 {tipo:'texto', tit:'Memória, registros e museus',
  fala:'A linha do tempo dos registros, na ordem do material: jornal, carta, diário, álbum de fotos, foto digital e redes sociais. Documentos pessoais, como a certidão de nascimento, registram a nossa história. Festas guardam lembranças, e museus e arquivos guardam memórias para as futuras gerações.',
  html:passos([{t:'jornal'},{t:'carta'},{t:'diário'},{t:'álbum de fotos',s:'bem antigo'},{t:'foto digital',s:'quando papai e mamãe eram crianças'},{t:'redes sociais',s:'hoje'}])+
   R('<b>Documentos pessoais</b> (como a certidão de nascimento) registram a nossa história.')+
   R('<b>Festas</b> guardam lembranças; <b>museus e arquivos</b> guardam memórias para as futuras gerações.')}
]},

/* ===================== 14. RESPOSTAS DE DETETIVE (perguntas abertas) ===================== */
{k:'respostas', tema:'fontes', nome:'Respostas de detetive (com as suas palavras)', cor:'#7c3aed', quem:'Dra. Clio',
 treino:[[['fontes','escola','profissoes','olhar'],4,'conceito']], telas:[
 {tipo:'texto', tit:'Na prova pode ter pergunta aberta',
  fala:'Na prova pode ter pergunta para responder com as suas palavras. Leia a pergunta, pense e depois toque para ver um jeito de responder.',
  html:fala('Dra. Clio','Pergunta aberta = responder com as suas palavras. Pense primeiro, depois toque no cartão e compare com o modelo!')},
 {tipo:'revela', tit:'Fontes e escola', regra:'Pense na resposta. Depois toque para ver o modelo.', fala:'Respostas de detetive sobre fontes e escola.',
  cartoes:[
   {f:'Como registramos o passado?', b:'Com fontes históricas: relatos contados (oral), textos (escrita), imagens (visual) e objetos (material).'},
   {f:'O que são fontes históricas?', b:'São pistas do passado: tudo o que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas.'},
   {f:'Como objetos e documentos da escola contam o passado dela?', b:'Fotos de turmas, cadernos, boletins, uniformes e troféus mostram como era o ensino, as regras e o dia a dia, e o que mudou.'},
   {f:'O que objetos, documentos e festas têm a ver com História?', b:'Eles guardam lembranças e contam o passado das pessoas e da escola.'}
  ]},
 {tipo:'revela', tit:'Pontos de vista e profissões', regra:'Pense na resposta. Depois toque para ver o modelo.', fala:'Respostas de detetive sobre pontos de vista e profissões.',
  cartoes:[
   {f:'Por que existem histórias diferentes a partir de um mesmo documento?', b:'Porque cada pessoa olha com a sua experiência, imaginação e ponto de vista. Por isso o historiador compara várias fontes.'},
   {f:'Como as formas de trabalho mudaram com o tempo?', b:'Surgiram novas máquinas e tecnologias: o carteiro passou da bicicleta para a moto e o aparelho com tela; o fazendeiro, dos bois para o trator.'},
   {f:'O que mudou e o que continuou nas profissões?', b:'Mudaram as ferramentas e o jeito de trabalhar. Continuou o mais importante: cuidar das pessoas, ensinar com alegria, amar a terra.'},
   {f:'Por que o acendedor de lampião não existe mais?', b:'Porque chegou a energia elétrica, e os postes passaram a acender sozinhos.'}
  ]}
]}

];
})();
