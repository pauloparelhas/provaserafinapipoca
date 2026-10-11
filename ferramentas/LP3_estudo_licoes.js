/* ============================================================
   LP3_estudo_licoes.js — as 15 LIÇÕES do estudo (LP3_estudo.html).
   v2 (12/10/2026): menos enredo, mais TESE. As duas histórias viram
   EXEMPLO do gênero conto de fadas (uma ficha por história), e o peso
   vai para o que a prova cobra: gênero, paráfrase/paródia, ortografia.

   Fonte única: trabalho/3tri_portugues/_roteiro.md (seções v2).
   Regras herdadas: sempre "o caçador"; nada do que o lobo fez com a
   vovó em detalhe; vilão SÓ o Lobo Mau (o Gigante nunca é vilão/mau);
   nada de plural em ÃES/ÃOS. Lacuna nenhuma pode formar OUTRA palavra
   real com a opção errada (JATO, NICHO, ORA, IENA, GANHO, TENHA, MINHO,
   CASAIS, ANIMAS: fora) — o validador confere.

   Lição: {k, tema, nome, cor, ic, treino:[[temas,n,tipo],...], telas:[...]}
     tema   chave do LP3_banco (cor padrão e perguntas do treininho)
     cor    cor própria da lição (opcional)   ic  ícone (LP3ARTE.icone)
   Tipos de telinha (o motor desenha cada um):
     texto       html livre
     palavras    regra + palavras-exemplo tocáveis (lidas pela Thalita)
     revela      cartões "toque para ver"
     personagens figurinhas com nome e uma linha
     capas       capas de livro (exemplos de contos de fadas)
     ficha       quadro de elementos de uma história (lugar, magia...)
     ordena      tocar nos quadros na ordem da história
     escolha     uma frase/coisa por vez, com resposta e explicação
     completa    LISTA de palavras com lacuna, como a folha da professora
     liga        ligar pares (sinônimos)
     pares       MOLA → MOLHA
   Marcação das palavras: [X] destaca, {U} U quietinho, (H) H mudo,
   _ buraco a completar; "PALAVRA|SÍ-LA-BAS" mostra a separação.
   ============================================================ */
window.LP3_LICOES = (function(){
'use strict';
var A = window.LP3ARTE;
function W(s){ return String(s).replace(/\[([^\]]+)\]/g,'<span class="hl">$1</span>')
  .replace(/\{([^}]+)\}/g,'<span class="qt">$1</span>').replace(/\(([^)]+)\)/g,'<span class="mudo">$1</span>'); }
function limpo(s){ return String(s).replace(/[\[\]{}()]/g,''); }
/* fileira de palavras tocáveis para usar dentro de html livre */
function P(lista, grandes){
  return '<div class="pals'+(grandes?' grandes':'')+'">'+lista.map(function(p){
    var m=p.split('|');
    return '<button class="pal" data-f="'+limpo(m[0]).replace(/→/g,',')+'">'+W(m[0])+(m[1]?'<small class="sil">'+m[1]+'</small>':'')+'</button>';
  }).join('')+'</div>';
}
function R(t){ return '<div class="regra">'+t+'</div>'; }
function caixa(t,corpo){ return '<div class="caixa"><h3>'+t+'</h3>'+corpo+'</div>'; }
/* três passos lado a lado (começo, meio, fim; avó, mãe, criança...) */
function passos(lista){
  return '<div class="passos">'+lista.map(function(p,i){
    return (i?'<span class="pseta" aria-hidden="true">&rsaquo;</span>':'')+
      '<div class="passo">'+(p.fig?A.figura(p.fig,p.fundo):'')+'<b>'+p.t+'</b>'+(p.s?'<span>'+p.s+'</span>':'')+'</div>';
  }).join('')+'</div>';
}

return [

/* ===================== 1. CONTO DE FADAS: O QUE É ===================== */
{k:'conto', tema:'conto', nome:'Conto de fadas: o que é', cor:'#f472b6', ic:'conto',
 treino:[[['conto'],5,'conceito']], telas:[
 {tipo:'texto', tit:'O que é um conto de fadas?',
  fala:'Conto de fadas é uma história inventada e muito antiga. As pessoas contavam umas para as outras, de geração em geração: a avó contava para a mãe, a mãe contava para os filhos. Depois, a história foi escrita nos livros.',
  html:R('Conto de fadas é uma <b>história inventada</b> e <b>muito antiga</b>.')+
   passos([{fig:'vovo',t:'A avó contava',fundo:'#f3e8ff'},{fig:'mae',t:'a mãe contava',fundo:'#dbeafe'},{fig:'chapeu',t:'para os filhos',fundo:'#fee2e2'},{fig:'livro',t:'e foi escrita',fundo:'#fce7f3'}])+
   R('Ela passou <b>de geração em geração</b>, contada de boca em boca, e depois foi <b>escrita nos livros</b>.')},
 {tipo:'capas', tit:'Contos de fadas famosos',
  fala:'Chapeuzinho Vermelho, João e o pé de feijão, Os Três Porquinhos, Cinderela, Branca de Neve e A Bela Adormecida são contos de fadas.',
  regra:'Todos estes são <b>contos de fadas</b>:',
  livros:[
   {t:'Chapeuzinho Vermelho', fig:'chapeu', cor:'#ef4444'},
   {t:'João e o pé de feijão', fig:'joao', cor:'#16a34a'},
   {t:'Os Três Porquinhos', fig:'casa', cor:'#d97706'},
   {t:'Cinderela', fig:'castelo', cor:'#2563eb'},
   {t:'Branca de Neve', fig:'arvore', cor:'#7c3aed'},
   {t:'A Bela Adormecida', fig:'cama', cor:'#db2777'}
  ]},
 {tipo:'escolha', tit:'Complete a frase', pergunta:'Qual palavra completa a frase?', rotulo:'Frase', proxRot:'Próxima frase', frase:true,
  itens:[
   {m:'Conto de fadas é uma história _.', cheia:'Conto de fadas é uma história <b>inventada</b>.', op:['inventada','que saiu no jornal'], c:'inventada', d:'É inventada: tem magia, lobo que fala, feijão que cresce até as nuvens.'},
   {m:'O conto de fadas é uma história muito _.', cheia:'O conto de fadas é uma história muito <b>antiga</b>.', op:['antiga','nova'], c:'antiga', d:'É muito antiga: os avós dos nossos avós já contavam.'},
   {m:'Ela foi contada de _ em geração.', cheia:'Ela foi contada de <b>geração</b> em geração.', op:['geração','semana'], c:'geração', d:'De geração em geração: dos avós para os pais, dos pais para os filhos.'},
   {m:'Depois de muito tempo, a história foi _ nos livros.', cheia:'Depois de muito tempo, a história foi <b>escrita</b> nos livros.', op:['escrita','apagada'], c:'escrita', d:'Primeiro contada de boca em boca, depois escrita nos livros.'},
   {m:'Cinderela é um conto de _.', cheia:'Cinderela é um conto de <b>fadas</b>.', op:['fadas','jornal'], c:'fadas', d:'Cinderela, Branca de Neve e A Bela Adormecida são contos de fadas.'}
  ]}
]},

/* ===================== 2. COMEÇO, MEIO E FIM ===================== */
{k:'cmf', tema:'conto', nome:'Começo, meio e fim', cor:'#fb7185', ic:'cmf',
 treino:[[['conto'],5,'conceito']], telas:[
 {tipo:'texto', tit:'As três partes do conto',
  fala:'Todo conto de fadas tem começo, meio e fim. No começo: Era uma vez. A gente conhece os personagens e o lugar. No meio, aparece um problema, um perigo. No fim, o problema é resolvido, e muitas vezes: e viveram felizes para sempre.',
  html:passos([
    {fig:'livro',t:'COMEÇO',s:'“Era uma vez...” Conhecemos os personagens e o lugar.',fundo:'#ffe4e6'},
    {fig:'lobo',t:'MEIO',s:'Aparece um problema, um perigo.',fundo:'#fef3c7'},
    {fig:'coracao',t:'FIM',s:'O problema é resolvido. “...e viveram felizes para sempre.”',fundo:'#d1fae5'}])+
   R('<b>Começo</b> apresenta. <b>Meio</b> complica. <b>Fim</b> resolve.')},
 {tipo:'escolha', tit:'Começo, meio ou fim?', pergunta:'Em que parte do conto fica esta frase?', rotulo:'Frase', proxRot:'Próxima frase', frase:true,
  op:['Começo','Meio','Fim'], itens:[
   {m:'Era uma vez uma menina que usava uma capa vermelha.', c:'Começo', d:'“Era uma vez” apresenta a personagem: é o começo.'},
   {m:'Há muito tempo, num reino distante, vivia uma princesa.', c:'Começo', d:'“Há muito tempo” e o lugar sendo apresentado: começo.'},
   {m:'Era uma vez três porquinhos que saíram de casa para morar sozinhos.', c:'Começo', d:'Apresenta os personagens: começo.'},
   {m:'O lobo chegou antes e se disfarçou de vovó.', c:'Meio', d:'É o problema, o perigo: meio.'},
   {m:'O lobo soprou, soprou e derrubou a casa de palha.', c:'Meio', d:'O perigo aparece: meio.'},
   {m:'O Gigante acordou e desceu atrás do João.', c:'Meio', d:'É o perigo da história: meio.'},
   {m:'O caçador salvou a Chapeuzinho e a vovó.', c:'Fim', d:'O problema foi resolvido: fim.'},
   {m:'João cortou o pé de feijão, e ele e a mãe viveram felizes.', c:'Fim', d:'Problema resolvido e final feliz: fim.'},
   {m:'E viveram felizes para sempre.', c:'Fim', d:'A frase mais famosa do fim.'}
  ]}
]},

/* ===================== 3. OS ELEMENTOS ===================== */
{k:'elem', tema:'conto', nome:'Os elementos do conto', cor:'#e879f9', ic:'elem',
 treino:[[['conto'],5,'conceito']], telas:[
 {tipo:'revela', tit:'O que tem num conto de fadas', regra:'Toque em cada cartão para ver.',
  fala:'Os elementos do conto de fadas: o tempo, o lugar, os personagens, a magia, o problema e a solução, e o final feliz.',
  cartoes:[
   {f:'Tempo', fig:'relogio', b:'Não se sabe quando foi: “Era uma vez...”, “Há muito tempo...”'},
   {f:'Lugar', fig:'castelo', b:'Reino, castelo, floresta, aldeia.'},
   {f:'Herói', fig:'joao', b:'O mocinho da história: Chapeuzinho, João.'},
   {f:'Vilão', fig:'lobo', fundo:'#fee2e2', b:'Quem faz maldade: o Lobo Mau.'},
   {f:'Seres mágicos', fig:'gigante', fundo:'#ede9fe', b:'Fadas, bruxas, gigantes, animais que falam.'},
   {f:'Magia', fig:'harpa', b:'Um objeto ou acontecimento mágico: feijões mágicos, harpa que canta.'},
   {f:'Problema e solução', fig:'machado', b:'Aparece um perigo, e alguém resolve.'},
   {f:'Final feliz', fig:'coracao', b:'“...e viveram felizes para sempre.”'}
  ]},
 {tipo:'escolha', tit:'Qual é o elemento?', pergunta:'Isto é qual elemento do conto?', rotulo:'Pista', proxRot:'Próxima pista', medio:true,
  itens:[
   {m:'“ERA UMA VEZ...”', op:['Tempo','Lugar','Vilão'], c:'Tempo', d:'Mostra um tempo que não se sabe quando foi.'},
   {m:'“HÁ MUITO TEMPO...”', op:['Tempo','Lugar','Magia'], c:'Tempo', d:'Também mostra o tempo do conto.'},
   {m:'UM CASTELO', op:['Lugar','Tempo','Final feliz'], c:'Lugar', d:'Castelo, reino, floresta e aldeia são lugares.'},
   {m:'A FLORESTA', op:['Lugar','Tempo','Herói'], c:'Lugar', d:'É onde a Chapeuzinho encontra o lobo.'},
   {m:'UMA FADA', op:['Ser mágico','Lugar','Tempo'], c:'Ser mágico', d:'Fadas, bruxas e gigantes são seres mágicos.'},
   {m:'O LOBO MAU', op:['Vilão','Herói','Lugar'], c:'Vilão', d:'O Lobo Mau faz maldade: é o vilão.'},
   {m:'FEIJÕES MÁGICOS', op:['Magia','Lugar','Tempo'], c:'Magia', d:'Um objeto mágico: dele nasce um pé de feijão até as nuvens.'},
   {m:'“...E VIVERAM FELIZES PARA SEMPRE.”', op:['Final feliz','Tempo','Lugar'], c:'Final feliz', d:'É o final feliz.'}
  ]}
]},

/* ===================== 4. OS ELEMENTOS NAS DUAS HISTÓRIAS ===================== */
{k:'historias', tema:'conto', nome:'Os elementos nas duas histórias', cor:'#4ade80', ic:'historias',
 treino:[[['chapeu','joao'],2,'leitura'],[['conto'],3,'conceito']], telas:[
 {tipo:'ficha', tit:'Chapeuzinho Vermelho', heroi:'chapeu', fundo:'#fee2e2',
  fala:'Chapeuzinho Vermelho. Lugar: a floresta e a casa da vovó. Personagens: Chapeuzinho, a mãe, a vovó, o Lobo Mau, que é o vilão, e o caçador. Magia: um lobo que fala. Problema: o lobo engana a menina e a vovó. Solução: o caçador salva as duas.',
  linhas:[
   {rot:'Lugar', figs:['arvore','casa'], txt:'a floresta e a casa da vovó'},
   {rot:'Personagens', figs:['chapeu','vovo','lobo','cacador'], txt:'Chapeuzinho, a mãe, a vovó, o <b>Lobo Mau</b> (o vilão) e o caçador'},
   {rot:'Magia', figs:['lobo'], txt:'um lobo que fala'},
   {rot:'Problema', figs:['cama'], txt:'o lobo engana a menina e a vovó'},
   {rot:'Solução', figs:['cacador'], txt:'o caçador salva as duas'}
  ]},
 {tipo:'ficha', tit:'João e o pé de feijão', heroi:'joao', fundo:'#dcfce7',
  fala:'João e o pé de feijão. Lugar: a casa do João e o castelo nas nuvens. Personagens: João, a mãe e o Gigante. Magia: feijões mágicos, a galinha dos ovos de ouro e a harpa que canta. Problema: João precisa fugir do Gigante. Solução: João corta o pé de feijão.',
  linhas:[
   {rot:'Lugar', figs:['casa','castelo'], txt:'a casa do João e o castelo nas nuvens'},
   {rot:'Personagens', figs:['joao','mae','gigante'], txt:'João, a mãe e o Gigante'},
   {rot:'Magia', figs:['feijoes','galinha','harpa'], txt:'feijões mágicos, galinha dos ovos de ouro, harpa que canta'},
   {rot:'Problema', figs:['gigante'], txt:'João precisa fugir do Gigante'},
   {rot:'Solução', figs:['machado'], txt:'João corta o pé de feijão'}
  ]},
 {tipo:'ordena', tit:'Conte em ordem', regra:'João e o pé de feijão: toque nos quadros na ordem da história.',
  fala:'Toque nos quadros na ordem da história: começo, meio e fim.', fimMsg:'Muito bem! Começo: a vaca. Meio: o feijão e o Gigante. Fim: João corta o pé de feijão.',
  quadros:[
   {cena:'jo1', cap:'João e a mãe só tinham uma vaca.'},
   {cena:'jo4', cap:'Nasce o pé de feijão mágico.'},
   {cena:'jo7', cap:'O Gigante desce atrás do João.'},
   {cena:'jo8', cap:'João corta o pé de feijão.'}
  ]}
]},

/* ===================== 5. PARÁFRASE ===================== */
{k:'parafrase', tema:'parodia', nome:'Paráfrase', cor:'#a78bfa', ic:'parafrase',
 treino:[[['parodia'],5,'conceito']], telas:[
 {tipo:'texto', tit:'Com as suas palavras',
  fala:'Paráfrase é recontar com as suas palavras, sem mudar o sentido. Como fazer: trocar palavras por outras de mesmo sentido, os sinônimos; mudar a ordem da frase; contar do seu jeito. Chapeuzinho levou doces para a vovó. Paráfrase: A garota levou guloseimas para a avó.',
  html:R('<b>Paráfrase</b> é recontar <b>com as suas palavras</b>, <b>sem mudar o sentido</b>.')+
   '<div class="dupla">'+caixa('Original','<p class="frase"><span class="troca">Chapeuzinho</span> levou <span class="troca">doces</span> para a <span class="troca">vovó</span>.</p>')+
   caixa('Paráfrase','<p class="frase">A <span class="troca">garota</span> levou <span class="troca">guloseimas</span> para a <span class="troca">avó</span>.</p>')+'</div>'+
   R('Como fazer: trocar palavras por <b>sinônimos</b> (palavras de mesmo sentido), mudar a ordem da frase, contar do seu jeito.')},
 {tipo:'pares', tit:'Sinônimos', regra:'Sinônimos são palavras que querem dizer <b>a mesma coisa</b>. Toque para ver.',
  fala:'Menina, garota. Vovó, avó. Floresta, mata. Doces, guloseimas. Grande, enorme. Bravo, zangado. Com medo, assustado.',
  pares:[['MENINA','GAROTA'],['VOVÓ','AVÓ'],['FLORESTA','MATA'],['DOCES','GULOSEIMAS'],['GRANDE','ENORME'],['BRAVO','ZANGADO'],['COM MEDO','ASSUSTADO']]},
 {tipo:'liga', tit:'Ligue os sinônimos', regra:'Toque numa palavra e depois no sinônimo dela.',
  fala:'Toque numa palavra e depois no sinônimo dela.',
  pares:[['MENINA','GAROTA'],['FLORESTA','MATA'],['DOCES','GULOSEIMAS'],['GRANDE','ENORME'],['BRAVO','ZANGADO'],['COM MEDO','ASSUSTADO']]},
 {tipo:'escolha', tit:'Qual é a paráfrase?', pergunta:'Qual frase diz a MESMA coisa com outras palavras?', rotulo:'Frase', proxRot:'Próxima frase', frase:true,
  itens:[
   {m:'Chapeuzinho levou doces para a vovó.', op:['A garota levou guloseimas para a avó.','Chapeuzinho levou pizza para o vovô.','A vovó levou doces para Chapeuzinho.'], c:'A garota levou guloseimas para a avó.', d:'Garota = menina, guloseimas = doces, avó = vovó. O sentido ficou igual.'},
   {m:'A menina andou pela floresta.', op:['A garota andou pela mata.','A menina andou pela praia.','O lobo andou pela floresta.'], c:'A garota andou pela mata.', d:'Mata = floresta. Nada mudou no que acontece.'},
   {m:'A mãe ficou brava com João.', op:['A mãe ficou zangada com João.','A mãe ficou feliz com João.','João ficou bravo com a mãe.'], c:'A mãe ficou zangada com João.', d:'Bravo e zangado são sinônimos.'},
   {m:'O pé de feijão era muito grande.', op:['O pé de feijão era enorme.','O pé de feijão era pequenino.','O pé de feijão era de chocolate.'], c:'O pé de feijão era enorme.', d:'Muito grande = enorme.'},
   {m:'Os porquinhos ficaram com medo do lobo.', op:['Os porquinhos ficaram assustados com o lobo.','Os porquinhos ficaram alegres com o lobo.','O lobo ficou com medo dos porquinhos.'], c:'Os porquinhos ficaram assustados com o lobo.', d:'Com medo = assustado.'}
  ]}
]},

/* ===================== 6. PARÓDIA ===================== */
{k:'parodia', tema:'parodia', nome:'Paródia', cor:'#c084fc', ic:'parodia',
 treino:[[['parodia'],5,'conceito']], telas:[
 {tipo:'texto', tit:'Imitar e mudar de propósito',
  fala:'Paródia é imitar um texto conhecido e mudar alguma coisa de propósito: o personagem, o lugar, um objeto, o final. Muitas vezes, para ficar engraçado. E ainda dá para reconhecer o texto original. Os três porquinhos fizeram casas de chocolate!',
  html:R('<b>Paródia</b> é <b>imitar</b> um texto conhecido e <b>mudar alguma coisa de propósito</b>: o personagem, o lugar, um objeto, o final. Muitas vezes, para ficar <b>engraçado</b>.')+
   '<div class="dupla">'+caixa('Paródia dos Três Porquinhos','<p class="frase">Os três porquinhos fizeram casas de <span class="muda">chocolate</span>.</p>')+
   caixa('Paródia da Chapeuzinho','<p class="frase">Chapeuzinho <span class="muda">Verde</span> foi <span class="muda">de bicicleta</span> levar <span class="muda">pizza</span> para o <span class="muda">vovô</span>.</p>')+'</div>'+
   R('Mesmo mudando, <b>dá para reconhecer</b> a história original.')},
 {tipo:'texto', tit:'Paródia de música',
  fala:'Paródia também se faz com música: a mesma melodia, com a letra mudada. Ciranda, cirandinha, vamos todos cirandar. Virou: Ciranda, cirandinha, vamos todos estudar!',
  html:R('Paródia também se faz com <b>música</b>: a <b>mesma melodia</b>, com a <b>letra mudada</b>.')+
   '<div class="dupla">'+caixa('Música original','<p class="frase">Ciranda, cirandinha,<br>vamos todos cirandar.</p>')+
   caixa('Paródia','<p class="frase">Ciranda, cirandinha,<br>vamos todos <span class="muda">estudar</span>!</p>')+'</div>'+
   R('A música é a mesma. A letra mudou de propósito.')},
 {tipo:'escolha', tit:'O que mudou?', pergunta:'O que a paródia mudou?', rotulo:'Paródia', proxRot:'Próxima paródia', frase:true,
  itens:[
   {m:'Original: Chapeuzinho <b>Vermelho</b><br>Paródia: Chapeuzinho <b>Verde</b>', op:['A cor','O lugar','O final'], c:'A cor', d:'Vermelho virou verde: mudou a cor.'},
   {m:'Original: Chapeuzinho levou doces para a <b>vovó</b>.<br>Paródia: Chapeuzinho levou doces para o <b>vovô</b>.', op:['O personagem','A comida','O lugar'], c:'O personagem', d:'A vovó virou vovô: mudou o personagem.'},
   {m:'Original: Chapeuzinho levou <b>doces</b> para a vovó.<br>Paródia: Chapeuzinho levou <b>pizza</b> para a vovó.', op:['A comida','O personagem','O final'], c:'A comida', d:'Doces viraram pizza: mudou a comida.'},
   {m:'Original: A menina atravessou a <b>floresta</b>.<br>Paródia: A menina atravessou a <b>praia</b>.', op:['O lugar','A cor','A comida'], c:'O lugar', d:'Floresta virou praia: mudou o lugar.'},
   {m:'Original: Os porquinhos fizeram casas de <b>palha, madeira e tijolos</b>.<br>Paródia: Os porquinhos fizeram casas de <b>chocolate</b>.', op:['Do que as casas eram feitas','O lugar','O final'], c:'Do que as casas eram feitas', d:'Palha, madeira e tijolos viraram chocolate.'},
   {m:'Original: O caçador salvou as duas.<br>Paródia: <b>O lobo virou amigo de todos e tomou chá com a vovó.</b>', op:['O final','A cor','O lugar'], c:'O final', d:'O fim da história mudou de propósito.'},
   {m:'Original: Ciranda, cirandinha, vamos todos <b>cirandar</b>.<br>Paródia: Ciranda, cirandinha, vamos todos <b>estudar</b>!', op:['A letra da música','A melodia','Nada'], c:'A letra da música', d:'A melodia ficou igual; a letra mudou: cirandar virou estudar.'}
  ]}
]},

/* ===================== 7. PARÁFRASE OU PARÓDIA? ===================== */
{k:'pp', tema:'parodia', nome:'Paráfrase ou paródia?', cor:'#818cf8', ic:'pp',
 treino:[[['parodia'],5,'rapida']], telas:[
 {tipo:'texto', tit:'A pergunta que resolve',
  fala:'Para saber, pergunte: o sentido ficou igual? É paráfrase. Mudou de propósito, imitando o original? É paródia.',
  html:'<div class="chave"><div><span class="tag">Pergunte</span><span>O sentido ficou igual?</span></div>'+
   '<div><span class="tag">Sim</span><span>É <b>paráfrase</b>: outras palavras, mesmo sentido.</span></div>'+
   '<div><span class="tag">Não</span><span>É <b>paródia</b>: imita o original e muda de propósito.</span></div></div>'},
 {tipo:'escolha', tit:'Paráfrase ou paródia?', pergunta:'O sentido da história ficou igual?', rotulo:'Frase', proxRot:'Próxima frase', frase:true,
  op:['Paráfrase','Paródia'], itens:[
   {m:'A garota de capuz vermelho levou guloseimas para a avó.', c:'Paráfrase', d:'Outras palavras, mesmo sentido.'},
   {m:'Chapeuzinho Verde foi de bicicleta levar pizza para o vovô.', c:'Paródia', d:'Mudaram a cor, a comida e o personagem, de propósito.'},
   {m:'O lobo correu por um caminho mais curto e chegou primeiro à casa da avó.', c:'Paráfrase', d:'Caminho mais curto = atalho. Nada mudou.'},
   {m:'Os três porquinhos fizeram casas de chocolate.', c:'Paródia', d:'As casas de chocolate mudam a história de propósito.'},
   {m:'O garoto trocou a vaca por feijões mágicos.', c:'Paráfrase', d:'Garoto = menino. É o que acontece na história do João.'},
   {m:'João trocou a vaca por sementes de pipoca, e o pé de pipoca estourou até o céu.', c:'Paródia', d:'O feijão virou pipoca, de propósito, para ficar engraçado.'},
   {m:'O pé de feijão ficou enorme e chegou até as nuvens.', c:'Paráfrase', d:'Enorme = muito grande. O sentido é o mesmo.'},
   {m:'Ciranda, cirandinha, vamos todos estudar!', c:'Paródia', d:'É a música “Ciranda, cirandinha” com a letra mudada.'},
   {m:'A mãe ficou zangada e jogou os feijões pela janela.', c:'Paráfrase', d:'Zangada = brava. Nada mudou no que acontece.'},
   {m:'Chapeuzinho chamou a polícia pelo celular quando viu o lobo.', c:'Paródia', d:'O celular foi posto de propósito: mudou a história.'}
  ]}
]},

/* ===================== 8. LETRA H ===================== */
{k:'h', tema:'h', nome:'Letra H', ic:'h',
 treino:[[['h'],7,'rapida']], telas:[
 {tipo:'palavras', tit:'O H que não faz som', grandes:true,
  fala:'Algumas palavras começam com H. O H do começo não tem som, mas é escrito mesmo assim. Hoje, hora, homem. Falamos oje, mas escrevemos hoje, com H.',
  regra:'Algumas palavras começam com <b>H</b>. O H do começo <b>não tem som</b>, mas é escrito mesmo assim.',
  pals:['(H)OJE','(H)ORA','(H)OMEM'],
  depois:'Falamos “oje”, escrevemos <b>HOJE</b>. Falamos “ora”, escrevemos <b>HORA</b> (a do relógio).'},
 {tipo:'palavras', tit:'Palavras com H', regra:'O H fica quietinho. E <b>ovo</b>, <b>uva</b>, <b>ilha</b> e <b>escola</b> não têm H.',
  fala:'Hotel, hospital, hipopótamo, helicóptero, história, horta, hino, herói, hélice, hortelã, harpa, higiene, humano. Ovo, uva, ilha e escola não têm H.',
  pals:['(H)OTEL','(H)OSPITAL','(H)IPOPÓTAMO','(H)ELICÓPTERO','(H)ISTÓRIA','(H)ORTA','(H)INO','(H)ERÓI','(H)ÉLICE','(H)ORTELÃ','(H)ARPA','(H)IGIENE','(H)UMANO']},
 {tipo:'completa', tit:'Complete as palavras', regra:'A palavra começa com <b>H</b> ou sem H?', op:['H','sem H'], itens:[
   {m:'_OJE', cheia:'(H)OJE', c:'H'},
   {m:'_OVO', cheia:'OVO', c:'sem H'},
   {m:'_OSPITAL', cheia:'(H)OSPITAL', c:'H'},
   {m:'_UVA', cheia:'UVA', c:'sem H'},
   {m:'_ELICÓPTERO', cheia:'(H)ELICÓPTERO', c:'H'},
   {m:'_ILHA', cheia:'ILHA', c:'sem H'},
   {m:'_ORTA', cheia:'(H)ORTA', c:'H'},
   {m:'_ESCOLA', cheia:'ESCOLA', c:'sem H'},
   {m:'_IPOPÓTAMO', cheia:'(H)IPOPÓTAMO', c:'H'},
   {m:'_OMEM', cheia:'(H)OMEM', c:'H'},
   {m:'_ABELHA', cheia:'ABELHA', c:'sem H'},
   {m:'_ISTÓRIA', cheia:'(H)ISTÓRIA', c:'H'}
  ]}
]},

/* ===================== 9. J OU G ===================== */
{k:'jg', tema:'jg', nome:'J ou G', ic:'jg',
 treino:[[['jg'],7,'rapida']], telas:[
 {tipo:'palavras', tit:'JA, JO, JU: sempre J',
  fala:'O som de jê pode ser escrito com J ou com G. Com A, O e U, é sempre J: janela, jacaré, jogo, joia, caju, juba, laranja, feijão.',
  regra:'O som de <b>jê</b> pode ser escrito com <b>J</b> ou com <b>G</b>. Com <b>A</b>, <b>O</b> e <b>U</b>, é <b>sempre J</b>: JA, JO, JU.',
  pals:['[JA]NELA','[JA]CARÉ','[JO]GO','[JO]IA','CA[JU]','[JU]BA','LARAN[JA]','FEI[J]ÃO'],
  depois:'Cuidado: <b>GA</b>, <b>GO</b>, <b>GU</b> fazem outro som, o de guê (gato, gorila).'},
 {tipo:'texto', tit:'JE e JI ou GE e GI?',
  fala:'Com E e I, os dois existem. Aí é preciso lembrar como a palavra se escreve. Com J: jeito, jiló, jipe, canjica, berinjela, sujeira. Com G: gelo, gente, geladeira, girafa, gigante, girassol, mágico, página, relógio, tigela.',
  html:R('Com <b>E</b> e <b>I</b>, os dois existem. Aí é preciso <b>lembrar como a palavra se escreve</b>.')+
   '<div class="dupla">'+caixa('Com J',P(['[JE]ITO','[JI]LÓ','[JI]PE','CAN[JI]CA','BERIN[JE]LA','SU[JE]IRA']))+
   caixa('Com G',P(['[GE]LO','[GE]NTE','[GE]LADEIRA','[GI]RAFA','[GI]GANTE','[GI]RASSOL','MÁ[GI]CO','PÁ[GI]NA','RELÓ[GI]O','TI[GE]LA']))+'</div>'},
 {tipo:'completa', tit:'Complete as palavras', regra:'Complete com <b>J</b> ou <b>G</b>.', op:['J','G'], itens:[
   {m:'_ACARÉ', cheia:'[J]ACARÉ', c:'J'},
   {m:'CA_U', cheia:'CA[J]U', c:'J'},
   {m:'_IRAFA', cheia:'[G]IRAFA', c:'G'},
   {m:'_ELO', cheia:'[G]ELO', c:'G'},
   {m:'_IPE', cheia:'[J]IPE', c:'J'},
   {m:'LARAN_A', cheia:'LARAN[J]A', c:'J'},
   {m:'MÁ_ICO', cheia:'MÁ[G]ICO', c:'G'},
   {m:'_ANELA', cheia:'[J]ANELA', c:'J'},
   {m:'_ENTE', cheia:'[G]ENTE', c:'G'},
   {m:'_ILÓ', cheia:'[J]ILÓ', c:'J'},
   {m:'PÁ_INA', cheia:'PÁ[G]INA', c:'G'},
   {m:'FEI_ÃO', cheia:'FEI[J]ÃO', c:'J'}
  ]}
]},

/* ===================== 10. G OU GU ===================== */
{k:'ggu', tema:'ggu', nome:'G ou GU', ic:'ggu',
 treino:[[['ggu'],7,'rapida']], telas:[
 {tipo:'palavras', tit:'GA, GO, GU',
  fala:'Com A, O e U, o som de guê é só o G: gato, galinha, galho, gorila, fogo, lago, gude, agulha.',
  regra:'Com <b>A</b>, <b>O</b> e <b>U</b>, o som de <b>guê</b> é só o <b>G</b>: GA, GO, GU.',
  pals:['[GA]TO','[GA]LINHA','[GA]LHO','[GO]RILA','FO[GO]','LA[GO]','[GU]DE','A[GU]LHA']},
 {tipo:'palavras', tit:'GUE, GUI: o U quietinho',
  fala:'Antes de E e I, para fazer o som de guê, entra um U que não se fala: guerra, foguete, fogueira, mangueira, formigueiro, guitarra, águia, guindaste, preguiça.',
  regra:'Antes de <b>E</b> e <b>I</b>, para fazer o som de guê, entra um <b>U</b> que <b>não se fala</b>: GUE, GUI.',
  pals:['[G{U}E]RRA','FO[G{U}E]TE','FO[G{U}E]IRA','MAN[G{U}E]IRA','FORMI[G{U}E]IRO','[G{U}I]TARRA','Á[G{U}I]A','[G{U}I]NDASTE','PRE[G{U}I]ÇA']},
 {tipo:'texto', tit:'GE e GI × GUE e GUI',
  fala:'Sem o U, GE e GI fazem som de jê: gelo, girafa. Com o U, GUE e GUI fazem som de guê: guerra, guitarra. Gigante tem os dois: GI, com som de jê, e GAN, com som de guê.',
  html:'<div class="dupla">'+caixa('Sem U: som de jê',P(['[GE]LO','[GI]RAFA']))+caixa('Com U: som de guê',P(['[G{U}E]RRA','[G{U}I]TARRA']))+'</div>'+
   R('Palavra que tem os dois: <b>GIGANTE</b>.')+P(['[GI]GANTE|GI tem som de jê','GI[GAN]TE|GAN tem som de guê'])},
 {tipo:'completa', tit:'Complete as palavras', regra:'Complete com <b>G</b> ou <b>GU</b>.', op:['G','GU'], itens:[
   {m:'_ATO', cheia:'[G]ATO', c:'G'},
   {m:'FO_ETE', cheia:'FO[G{U}]ETE', c:'GU'},
   {m:'_ITARRA', cheia:'[G{U}]ITARRA', c:'GU'},
   {m:'_ORILA', cheia:'[G]ORILA', c:'G'},
   {m:'MAN_EIRA', cheia:'MAN[G{U}]EIRA', c:'GU'},
   {m:'Á_IA', cheia:'Á[G{U}]IA', c:'GU'},
   {m:'LA_O', cheia:'LA[G]O', c:'G'},
   {m:'_ALINHA', cheia:'[G]ALINHA', c:'G'},
   {m:'FO_EIRA', cheia:'FO[G{U}]EIRA', c:'GU'},
   {m:'_ERRA', cheia:'[G{U}]ERRA', c:'GU'},
   {m:'A_ULHA', cheia:'A[G]ULHA', c:'G'},
   {m:'PRE_IÇA', cheia:'PRE[G{U}]IÇA', c:'GU'}
  ]}
]},

/* ===================== 11. C OU QU ===================== */
{k:'cqu', tema:'cqu', nome:'C ou QU', ic:'cqu',
 treino:[[['cqu'],7,'rapida']], telas:[
 {tipo:'palavras', tit:'C com A, O e U',
  fala:'Com A, O e U, o som de quê é só o C: casa, cavalo, cama, caju, copo, coelho, coruja, cubo, cutia.',
  regra:'Com <b>A</b>, <b>O</b> e <b>U</b>, o som de <b>quê</b> é só o <b>C</b>: casa, copo, cubo.',
  pals:['[C]ASA','[C]AVALO','[C]AMA','[C]AJU','[C]OPO','[C]OELHO','[C]ORUJA','[C]UBO','[C]UTIA']},
 {tipo:'palavras', tit:'QUE, QUI: o U quietinho',
  fala:'Antes de E e I, o som de quê se escreve com QU, e o U não se fala: queijo, quente, leque, moleque, quiabo, quilo, esquilo, periquito, máquina, mosquito, caqui.',
  regra:'Antes de <b>E</b> e <b>I</b>, o som de quê se escreve com <b>QU</b>. O <b>U</b> não se fala: QUE, QUI.',
  pals:['[Q{U}E]IJO','[Q{U}E]NTE','LE[Q{U}E]','MOLE[Q{U}E]','[Q{U}I]ABO','[Q{U}I]LO','ES[Q{U}I]LO','PERI[Q{U}I]TO','MÁ[Q{U}I]NA','MOS[Q{U}I]TO','CA[Q{U}I]']},
 {tipo:'completa', tit:'Complete as palavras', regra:'Complete com <b>C</b> ou <b>QU</b>.', op:['C','QU'], itens:[
   {m:'_ASA', cheia:'[C]ASA', c:'C'},
   {m:'_EIJO', cheia:'[Q{U}]EIJO', c:'QU'},
   {m:'ES_ILO', cheia:'ES[Q{U}]ILO', c:'QU'},
   {m:'_OPO', cheia:'[C]OPO', c:'C'},
   {m:'MOS_ITO', cheia:'MOS[Q{U}]ITO', c:'QU'},
   {m:'_UBO', cheia:'[C]UBO', c:'C'},
   {m:'_IABO', cheia:'[Q{U}]IABO', c:'QU'},
   {m:'LE_E', cheia:'LE[Q{U}]E', c:'QU'},
   {m:'_ENTE', cheia:'[Q{U}]ENTE', c:'QU'},
   {m:'MÁ_INA', cheia:'MÁ[Q{U}]INA', c:'QU'},
   {m:'_ORUJA', cheia:'[C]ORUJA', c:'C'},
   {m:'_AVALO', cheia:'[C]AVALO', c:'C'}
  ]}
]},

/* ===================== 12. CH · NH · LH ===================== */
{k:'dig', tema:'dig', nome:'CH · NH · LH', ic:'dig',
 treino:[[['dig'],7,'rapida']], telas:[
 {tipo:'palavras', tit:'Duas letras, um som só',
  fala:'CH, NH e LH são duas letras que fazem um som só. Chave, chuva, chapéu, chocolate. Ninho, galinha, banho, aranha. Folha, coelho, abelha, olho.',
  regra:'<b>CH</b>, <b>NH</b> e <b>LH</b> são <b>duas letras</b> que fazem <b>um som só</b>.',
  pals:['[CH]AVE','[CH]UVA','[CH]APÉU','[CH]OCOLATE','NI[NH]O','GALI[NH]A','BA[NH]O','ARA[NH]A','FO[LH]A','COE[LH]O','ABE[LH]A','O[LH]O'],
  depois:'E <b>CHAPEUZINHO</b> tem dois: CH no começo e NH no fim!'},
 {tipo:'pares', tit:'Uma letrinha muda tudo', regra:'Toque em cada par: entra um H e a palavra vira outra.',
  fala:'Mola, molha. Fila, filha. Mina, minha. Sono, sonho. Galo, galho.',
  pares:[['MOLA','MO[LH]A'],['FILA','FI[LH]A'],['MINA','MI[NH]A'],['SONO','SO[NH]O'],['GALO','GA[LH]O']]},
 {tipo:'completa', tit:'Complete as palavras', regra:'Complete com <b>CH</b>, <b>NH</b> ou <b>LH</b>.', op:['CH','NH','LH'], itens:[
   {m:'_AVE', cheia:'[CH]AVE', c:'CH'},
   {m:'CAMI_O', cheia:'CAMI[NH]O', c:'NH'},
   {m:'FO_A', cheia:'FO[LH]A', c:'LH'},
   {m:'GALI_A', cheia:'GALI[NH]A', c:'NH'},
   {m:'_UVA', cheia:'[CH]UVA', c:'CH'},
   {m:'COE_O', cheia:'COE[LH]O', c:'LH'},
   {m:'ARA_A', cheia:'ARA[NH]A', c:'NH'},
   {m:'OVE_A', cheia:'OVE[LH]A', c:'LH'},
   {m:'_OCOLATE', cheia:'[CH]OCOLATE', c:'CH'},
   {m:'ABE_A', cheia:'ABE[LH]A', c:'LH'},
   {m:'COZI_A', cheia:'COZI[NH]A', c:'NH'},
   {m:'CA_ORRO', cheia:'CA[CH]ORRO', c:'CH'}
  ]}
]},

/* ===================== 13. PLURAL ===================== */
{k:'plural', tema:'plural', nome:'Plural', ic:'plural',
 treino:[[['plural'],7,'rapida']], telas:[
 {tipo:'palavras', tit:'Mais de um: plural',
  fala:'Plural é quando tem mais de um. Uma casa, duas casas. Quando a palavra termina em vogal, é só pôr S: casas, lobos, ovos, porquinhos. E o artigo vai junto: o lobo, os lobos. A casa, as casas.',
  regra:'<b>Plural</b> é quando tem <b>mais de um</b>. Terminou em vogal? É só pôr <b>S</b>.',
  pals:['CASA → CASA[S]','LOBO → LOBO[S]','OVO → OVO[S]','PORQUINHO → PORQUINHO[S]'],
  depois:'O artigo vai junto: <b>O</b> lobo → <b>OS</b> lobos · <b>A</b> casa → <b>AS</b> casas.'},
 {tipo:'texto', tit:'R ou Z: ES · ÃO: ÕES',
  fala:'Terminou em R ou Z, põe ES: flores, colheres, mares, luzes, narizes. Terminou em ÃO, vira ÕES: aviões, balões, botões, limões, leões.',
  html:'<div class="dupla">'+caixa('R ou Z: põe ES',P(['FLOR → FLOR[ES]','COLHER → COLHER[ES]','MAR → MAR[ES]','LUZ → LUZ[ES]','NARIZ → NARIZ[ES]']))+
   caixa('ÃO vira ÕES',P(['AVIÃO → AVI[ÕES]','BALÃO → BAL[ÕES]','BOTÃO → BOT[ÕES]','LIMÃO → LIM[ÕES]','LEÃO → LE[ÕES]']))+'</div>'},
 {tipo:'texto', tit:'L: IS · M: NS',
  fala:'Terminou em L, vira IS: animais, jornais, varais, anzóis. Terminou em M, vira NS: homens, nuvens, trens.',
  html:'<div class="dupla">'+caixa('L vira IS',P(['ANIMAL → ANIMA[IS]','JORNAL → JORNA[IS]','VARAL → VARA[IS]','ANZOL → ANZÓ[IS]']))+
   caixa('M vira NS',P(['HOMEM → HOME[NS]','NUVEM → NUVE[NS]','TREM → TRE[NS]']))+'</div>'},
 {tipo:'completa', tit:'Complete o plural', regra:'Toque no final que forma o plural.', itens:[
   {m:'LOBO → LOBO_', cheia:'LOBO → LOBO[S]', op:['S','ES','IS'], c:'S'},
   {m:'OVO → OVO_', cheia:'OVO → OVO[S]', op:['S','ES','NS'], c:'S'},
   {m:'BOLA → BOLA_', cheia:'BOLA → BOLA[S]', op:['S','ES','NS'], c:'S'},
   {m:'FLOR → FLOR_', cheia:'FLOR → FLOR[ES]', op:['S','ES','NS'], c:'ES'},
   {m:'LUZ → LUZ_', cheia:'LUZ → LUZ[ES]', op:['S','ES','NS'], c:'ES'},
   {m:'MAR → MAR_', cheia:'MAR → MAR[ES]', op:['S','ES','ÕES'], c:'ES'},
   {m:'BALÃO → BAL_', cheia:'BALÃO → BAL[ÕES]', op:['ES','ÕES','IS'], c:'ÕES'},
   {m:'LIMÃO → LIM_', cheia:'LIMÃO → LIM[ÕES]', op:['ÕES','IS','NS'], c:'ÕES'},
   {m:'ANIMAL → ANIMA_', cheia:'ANIMAL → ANIMA[IS]', op:['ES','IS','NS'], c:'IS'},
   {m:'JORNAL → JORNA_', cheia:'JORNAL → JORNA[IS]', op:['S','ES','IS'], c:'IS'},
   {m:'NUVEM → NUVE_', cheia:'NUVEM → NUVE[NS]', op:['S','IS','NS'], c:'NS'},
   {m:'HOMEM → HOME_', cheia:'HOMEM → HOME[NS]', op:['ÕES','IS','NS'], c:'NS'}
  ]}
]},

/* ===================== 14. DICIONÁRIO ===================== */
{k:'dic', tema:'dic', nome:'Dicionário', ic:'dic',
 treino:[[['dic'],6]], telas:[
 {tipo:'texto', tit:'Ordem alfabética',
  fala:'No dicionário, as palavras estão em ordem alfabética, a ordem do alfabeto, que tem 26 letras. Se a primeira letra é igual, olhe a segunda: bala, bola, bule. Se a segunda também é igual, olhe a terceira: casa vem antes de cavalo, porque S vem antes de V.',
  html:R('No dicionário, as palavras estão em <b>ordem alfabética</b>: a ordem do alfabeto, que tem <b>26 letras</b>.')+
   '<div class="abc">'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(l){ return '<span>'+l+'</span>'; }).join('')+'</div>'+
   R('1ª letra igual? Olhe a <b>2ª</b>: B<b>A</b>LA, B<b>O</b>LA, B<b>U</b>LE.')+
   R('2ª também igual? Olhe a <b>3ª</b>: CA<b>S</b>A vem antes de CA<b>V</b>ALO.')},
 {tipo:'texto', tit:'Verbete e palavras-guia',
  fala:'O dicionário mostra o significado da palavra e a escrita certa. Cada palavra explicada é um verbete. No alto da página, as palavras-guia mostram a primeira e a última palavra daquela página.',
  html:R('O dicionário mostra o <b>significado</b> e a <b>escrita certa</b>.')+
   '<div class="pagdic"><div class="guias"><span>BALA</span><em>palavras-guia</em><span>BULE</span></div>'+
   '<p><b>bala</b> doce pequeno e duro.</p>'+
   '<p class="verb"><b>bola</b> objeto redondo, usado para brincar e jogar.<em>verbete</em></p>'+
   '<p><b>bule</b> vasilha com bico, usada para servir chá ou café.</p></div>'+
   R('<b>Verbete</b>: cada palavra explicada. <b>Palavras-guia</b>: a primeira e a última palavra da página.')},
 {tipo:'texto', tit:'Mais de um significado',
  fala:'Uma palavra pode ter mais de um significado, e o dicionário mostra todos. Manga: uma fruta. Manga: a parte da camisa que cobre o braço. Pena: o que cobre o corpo das aves. Pena: sentir dó de alguém.',
  html:R('Uma palavra pode ter <b>mais de um significado</b>. O dicionário mostra <b>todos</b>.')+
   '<div class="pagdic"><p class="verb"><b>manga</b> <b>1.</b> fruta doce, de casca verde ou amarela. <b>2.</b> parte da camisa que cobre o braço.<em>verbete</em></p>'+
   '<p class="verb"><b>pena</b> <b>1.</b> o que cobre o corpo das aves. <b>2.</b> dó, tristeza pelo que acontece com alguém: “senti pena dele”.<em>verbete</em></p></div>'},
 {tipo:'escolha', tit:'Qual vem primeiro?', pergunta:'Toque na palavra que vem primeiro no dicionário.', rotulo:'Rodada', proxRot:'Próxima rodada',
  itens:[
   {m:'', op:['LOBO','GATO','URSO'], c:'GATO', d:'G vem antes de L, e L vem antes de U.'},
   {m:'', op:['BOLA','BULE','BALA'], c:'BALA', d:'Mesma 1ª letra: olhe a 2ª. A vem antes de O e de U.'},
   {m:'', op:['COPO','CUBO','CASA'], c:'CASA', d:'Casa, copo, cubo: olhe a 2ª letra. O A vem antes do O e do U.'},
   {m:'', op:['CAVALO','CASA'], c:'CASA', d:'CAS e CAV: o S vem antes do V.'},
   {m:'', op:['ZEBRA','MAPA','ABELHA'], c:'ABELHA', d:'A é a primeira letra do alfabeto.'},
   {m:'', op:['PATO','PIPA','PENA'], c:'PATO', d:'PA, PE, PI: o A vem primeiro.'}
  ]}
]},

/* ===================== 15. INVENÇÕES E DESCOBERTAS ===================== */
{k:'invento', tema:'invento', nome:'Invenções e descobertas', ic:'invento',
 treino:[[['invento'],5]], telas:[
 {tipo:'personagens', tit:'Invenção', compacto:true,
  fala:'Invenção é algo que as pessoas criaram e que não existia antes: a roda, a lâmpada, o telefone, o avião, a bicicleta, o relógio. Também são invenções o computador e a geladeira. Uma invenção resolve um problema: a lâmpada ilumina a noite.',
  regra:'<b>Invenção</b> é algo que <b>as pessoas criaram</b> e que <b>não existia antes</b>.',
  figs:[{k:'roda', nome:'A roda'},{k:'lampada', nome:'A lâmpada'},{k:'telefone', nome:'O telefone'},
   {k:'aviao', nome:'O avião'},{k:'bicicleta', nome:'A bicicleta'},{k:'relogio', nome:'O relógio'}],
  depois:'Também são invenções: o computador e a geladeira. Uma invenção <b>resolve um problema</b>: a lâmpada ilumina a noite.'},
 {tipo:'personagens', tit:'Descoberta e inventor', compacto:true,
  fala:'Descoberta é encontrar algo que já existia na natureza: o fogo, uma planta nova, um animal nunca visto. Quem inventa é o inventor. O brasileiro Santos Dumont é conhecido como o pai da aviação. Ele criou o 14-Bis.',
  regra:'<b>Descoberta</b> é <b>encontrar</b> algo que <b>já existia</b> na natureza.',
  figs:[{k:'fogo', nome:'O fogo', fundo:'#fef3c7'},{k:'planta', nome:'Uma planta nova', fundo:'#dcfce7'},{k:'bicho', nome:'Um animal nunca visto', fundo:'#e0f2fe'}],
  depois:'Quem inventa é o <b>inventor</b>. O brasileiro <b>Santos Dumont</b> é conhecido como o pai da aviação: ele criou o 14-Bis.'},
 {tipo:'escolha', tit:'Invenção ou descoberta?', pergunta:'Alguém criou ou alguém achou?', rotulo:'Coisa', medio:true,
  op:['Invenção','Descoberta'], itens:[
   {m:'A LÂMPADA', c:'Invenção', d:'Pessoas criaram a lâmpada. Ela não existia antes.'},
   {m:'O FOGO', c:'Descoberta', d:'O fogo já existia na natureza.'},
   {m:'A RODA', c:'Invenção', d:'A roda foi criada pelas pessoas.'},
   {m:'UMA PLANTA NOVA NA FLORESTA', c:'Descoberta', d:'A planta já estava lá. Alguém achou.'},
   {m:'O AVIÃO', c:'Invenção', d:'Santos Dumont é conhecido como o pai da aviação.'},
   {m:'UM ANIMAL NUNCA VISTO', c:'Descoberta', d:'O animal já existia. Alguém encontrou.'},
   {m:'A BICICLETA', c:'Invenção', d:'A bicicleta foi criada pelas pessoas.'}
  ]}
]}

];
})();
