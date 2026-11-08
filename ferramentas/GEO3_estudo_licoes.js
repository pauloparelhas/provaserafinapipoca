/* ============================================================
   GEO3_estudo_licoes.js — as 12 LIÇÕES da teoria de Geografia Y2,
   3º trimestre (prova ESCRITA em português, 12/11/2026).
   Unidade 3 (T1–T8): ruas, deslocamentos e transportes.
   Unidade 4 (T9–T12): meio ambiente, nossa casa maior.

   Fonte única: trabalho/3tri_geografia/_roteiro.md (cada tela aponta para
   um slide). Cores: trabalho/3tri_geografia/BIBLIA_GEO3.md.
   Tudo em português, sem bandeira e sem tradução.

   v2 (08/11, Paulo: "só faz sentido a oclusão nas palavras que a criança tem
   condições de adivinhar"; jogabilidade no nível do Inglês):
   - <b> comum = DESTAQUE colorido, sempre visível;
   - O('termo') = <b class="ocl">: hachurado SÓ quando dá para adivinhar na hora
     (a figura mostra, a frase/título entrega, ou acabou de aparecer);
     no máximo 1–2 por tela, até 3 palavras (decisão em avaliacao/oclusao_decisao.md);
   - mecânicas: texto · arrasta · revela (cartões com figura e pergunta) ·
     escolha (classificar item a item, com placar) · ordena · liga · pares
     (revisão da tela anterior); nunca 2 telas de texto seguidas;
   - fala: o que o botão de ouvir lê (curta, sem ler o que está hachurado);
   - sem lista de perguntas A/B/C na teoria (questões ficam no simulado);
     cada lição termina na tela "Na prova", com a resposta oculta.
   Figuras: recortes das figuras da escola em media/geo3/t_*.jpg.
   ============================================================ */
window.GEO3_LICOES = (function(){
'use strict';
function I(n){ return 'media/geo3/'+n+'.jpg'; }
function R(t){ return '<div class="regra">'+t+'</div>'; }
function O(t){ return '<b class="ocl">'+t+'</b>'; }
function caixa(t,corpo,cor){ return '<div class="caixa"'+(cor?' style="border-color:'+cor+'"':'')+'><h3'+(cor?' style="color:'+cor+'"':'')+'>'+t+'</h3>'+corpo+'</div>'; }
function esp(){ return '<div style="height:8px"></div>'; }
/* figura ao lado do texto (na tela larga) — encolhe até caber */
function lado(n,txt){ return '<div class="lado"><div class="lfig"><img src="'+I(n)+'" alt=""></div><div class="ltx">'+txt+'</div></div>'; }
/* grade de figuras com legenda: itens [figura, legenda] */
function grade(cols,itens,larga){
  return '<div class="grd'+(larga?' '+larga:'')+'" style="--g:'+cols+'">'+itens.map(function(i){
    return '<figure><img src="'+I(i[0])+'" alt="">'+i[1]+'</figure>';
  }).join('')+'</div>';
}
/* cartões dos biomas (cor do mapa da escola, U4 S8) */
var COR={amz:'#9ccc3c',cer:'#f06fae',caa:'#e8d44d',pam:'#f58b4c',pan:'#d9a3d4',mat:'#7cc0ea'};
var NOME={amz:'Amazônia',cer:'Cerrado',caa:'Caatinga',pam:'Pampa',pan:'Pantanal',mat:'Mata Atlântica'};
var ORD=['amz','cer','caa','pam','pan','mat'];
function bios(txt){ return '<div class="bios">'+ORD.map(function(k){ return '<div class="bio" style="--bc:'+COR[k]+'"><i>'+NOME[k]+'</i>'+txt[k]+'</div>'; }).join('')+'</div>'; }
function cxBio(){ return ORD.map(function(k){ return {k:k,t:NOME[k],cor:COR[k]}; }); }
/* "Na prova": pergunta + resposta (oculta pela oclusão); f = figura opcional */
function P(pede,resp,f){
  return {pede:pede, q:pede+'<br>'+(resp.indexOf('<b')>=0?'<span class="resp">'+resp.replace(/<b>/g,'<b class="resp">')+'</span>':'<b class="resp">'+resp+'</b>'), f:f};
}
function naProva(itens){
  return '<p class="nptit">É assim que pode cair na prova.</p><ol class="naprova">'+itens.map(function(x,i){
    var q='<span class="npn">'+(i+1)+'.</span> '+x.q;
    return x.f?'<li class="npf"><img src="'+I(x.f)+'" alt=""><div>'+q+'</div></li>':'<li>'+q+'</li>';
  }).join('')+'</ol>';
}
var NP='Na prova';
/* a tela "Na prova" fala só as perguntas: a resposta continua escondida */
function NPT(itens,tit){ return {tipo:'texto', tit:tit||NP, html:naProva(itens), fala:'É assim que pode cair na prova. '+itens.map(function(x,i){ return (i+1)+'. '+x.pede; }).join(' ')}; }
var REV='Toque em cada frase para ver o pedaço que falta.';

var LS=[

/* ===================== UNIDADE 3 ===================== */

/* T1. O espaço urbano (U3 S3, S4) */
{k:'urbano', tema:'urbano', unid:3, nome:'O espaço urbano', curto:'O espaço urbano', capa:'t_cidade', cor:'#0ea5e9', treino:[], telas:[
 {tipo:'texto', tit:'A cidade',
  fala:'A cidade. A cidade, o espaço urbano, é o lugar onde vivem… Olhe a foto! Tem ruas, casas, comércios, escolas e prédios. As cidades são feitas de caminhos, sons e movimentos. O espaço urbano se organiza a partir de ruas e bairros.',
  html:lado('t_cidade',
   R('A <b>cidade</b> (o espaço urbano) é o lugar onde vivem '+O('muitas pessoas')+', com ruas, casas, comércios, escolas e prédios.')+
   R('As cidades são feitas de <b>caminhos</b>, <b>sons</b> e <b>movimentos</b>.')+
   R('O espaço urbano se organiza a partir de <b>ruas</b> e <b>bairros</b>.'))},
 {tipo:'revela', tit:'Palavras da cidade', cols:4, regra:'Vire cada cartão para ver o que a palavra quer dizer.', q:'O que é?',
  fala:'Palavras da cidade. Vire cada cartão: deslocamento, rua, bairro e sinalização.',
  cartoes:[
   {n:'Deslocamento', img:'t_cidade', b:'A pessoa se <b>movimenta</b> de um lugar para outro: a pé, de bicicleta, de carro, de ônibus.'},
   {n:'Rua', img:'t_residencial', b:'Via por onde as <b>pessoas</b> e os <b>veículos</b> se deslocam. Pode ter calçada, asfalto e sinalização.'},
   {n:'Bairro', img:'t_bairro_sb', b:'Parte de uma <b>cidade</b> onde vivem várias pessoas. Tem casas, ruas e comércios.'},
   {n:'Sinalização', img:'t_faixa', b:'<b>Placas, faixas</b> ou <b>sinais</b> que ajudam as pessoas a <b>se orientar</b> nas ruas.'}]},
 {tipo:'arrasta', tit:'Qual é a palavra?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: a pessoa se movimenta de um lugar para outro.'},{k:'k1',frase:'___: via por onde as pessoas e os veículos se deslocam.'},{k:'k2',frase:'___: parte de uma cidade onde vivem várias pessoas.'},{k:'k3',frase:'___: placas, faixas e sinais que ajudam a se orientar.'},{k:'k4',frase:'A ___ é o lugar onde vivem muitas pessoas.'}],
  itens:[{c:'k0',t:'Deslocamento'},{c:'k1',t:'Rua'},{c:'k2',t:'Bairro'},{c:'k3',t:'Sinalização'},{c:'k4',t:'cidade'}]},
 {tipo:'escolha', tit:'Deslocamento ou sinalização?', pergunta:'É um jeito de se deslocar ou é sinalização?',
  fala:'Deslocamento ou sinalização? Toque na resposta certa.', op:['Deslocamento','Sinalização'], itens:[
   {m:'a pé', c:'Deslocamento', d:'Ir a pé é um jeito de se deslocar.'},
   {m:'de bicicleta', c:'Deslocamento', d:'Ir de bicicleta é um jeito de se deslocar.'},
   {m:'de carro', c:'Deslocamento', d:'Ir de carro é um jeito de se deslocar.'},
   {m:'de ônibus', c:'Deslocamento', d:'Ir de ônibus é um jeito de se deslocar.'},
   {m:'placas', c:'Sinalização', d:'Placas são sinalização: ajudam a se orientar nas ruas.'},
   {m:'faixas', c:'Sinalização', d:'Faixas são sinalização: ajudam a se orientar nas ruas.'},
   {m:'sinais', c:'Sinalização', d:'Sinais são sinalização: ajudam a se orientar nas ruas.'}]},
 {tipo:'arrasta', tit:'O que a rua pode ter?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A rua pode ter ___, asfalto e sinalização.'},{k:'k1',frase:'A rua pode ter calçada, ___ e sinalização.'},{k:'k2',frase:'A rua pode ter calçada, asfalto e ___.'}],
  itens:[{c:'k0',t:'calçada'},{c:'k1',t:'asfalto'},{c:'k2',t:'sinalização'}]},
 NPT([
   P('O que é deslocamento?','a pessoa se <b>movimenta</b> de um lugar para outro'),
   P('Cite dois jeitos de se deslocar.','<b>a pé</b>, de <b>bicicleta</b>, de <b>carro</b>, de <b>ônibus</b>'),
   P('Complete: a rua pode ter calçada, asfalto e ___.','sinalização'),
   P('Para que serve a sinalização?','para ajudar as pessoas a <b>se orientar</b>')])
]},

/* T2. Segurança e sinalização para atravessar (U3 S3, S4, S30) */
{k:'sinal', tema:'sinal', unid:3, nome:'Atravessar com segurança', curto:'Atravessar a rua', capa:'t_faixa', cor:'#ef4444', treino:[], telas:[
 {tipo:'texto', tit:'Na hora de atravessar',
  fala:'Na hora de atravessar. Olhe a figura. Atravesse a rua sempre na… de pedestre. Atravesse quando o sinal estiver… para o pedestre. Mesmo com o sinal de pedestre, olhe para a esquerda e para a direita.',
  html:lado('t_faixa',
   R('Atravesse a rua <b>sempre</b> na '+O('faixa')+' de pedestre.')+
   R('Atravesse quando o sinal estiver '+O('verde')+' para o pedestre.')+
   R('Mesmo com o sinal de pedestre, olhe para a <b>esquerda</b> e para a <b>direita</b>.'))},
 {tipo:'liga', tit:'Ligue as duas partes', regra:'Toque no começo da frase e depois no fim dela.',
  fala:'Ligue as duas partes. Toque no começo da frase e depois no fim dela.',
  pares:[['Atravesse a rua','sempre na faixa de pedestre.'],['Atravesse quando o sinal','estiver verde para o pedestre.'],['Mesmo com o sinal de pedestre,','olhe para a esquerda e para a direita.']]},
 {tipo:'texto', tit:'Ruas seguras',
  fala:'Ruas seguras. Ruas seguras são as sinalizadas e com… você acabou de ver! A cidade precisa de ruas, calçadas, ciclovias, pontos de ônibus e sinais para todos andarem com segurança. Saber se localizar ajuda a andar com segurança e a ajudar outras pessoas.',
  html:lado('t_olhar',
   R('Ruas seguras são as <b>sinalizadas</b> e com '+O('faixas de pedestre')+'.')+
   R('A cidade precisa de ruas, calçadas, ciclovias, pontos de ônibus e <b>sinais</b> para todos andarem com <b>segurança</b>.')+
   R('Saber se localizar ajuda a andar com segurança e a <b>ajudar outras pessoas</b>.'))},
 {tipo:'pares', tit:'Lembra das ruas seguras?', regra:REV,
  fala:'Lembra das ruas seguras? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Ruas seguras são as ___ e com faixas de pedestre.','sinalizadas'],['A cidade precisa de sinais para todos andarem com ___.','segurança'],['Saber se localizar ajuda a andar com segurança e a ___.','ajudar outras pessoas']]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_faixa', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Atravesse sempre na ___ de pedestre.'},{k:'k1',frase:'Atravesse quando o sinal estiver ___ para o pedestre.'},{k:'k2',frase:'Antes de atravessar, olhe para os ___ lados.'},{k:'k3',frase:'Ruas seguras são as ___ e com faixas de pedestre.'}],
  itens:[{c:'k0',t:'faixa'},{c:'k1',t:'verde'},{c:'k2',t:'dois'},{c:'k3',t:'sinalizadas'}]},
 NPT([
   P('Onde devemos atravessar a rua?','na <b>faixa de pedestre</b>','t_faixa'),
   P('O sinal de pedestre deve estar de que cor para atravessar?','<b>verde</b>'),
   P('Para que lados olhamos antes de atravessar?','para a <b>esquerda</b> e para a <b>direita</b>'),
   P('Quais ruas são seguras?','as <b>sinalizadas</b> e com <b>faixas de pedestre</b>')])
]},

/* T3. Direções — as "palavras especiais" (U3 S3, S4, S19, S25) */
{k:'direcoes', tema:'direcoes', unid:3, nome:'As palavras especiais', curto:'Frente, atrás, lados', capa:'t_olhar', cor:'#f59e0b', treino:[], telas:[
 {tipo:'texto', tit:'Para se orientar',
  fala:'Para se orientar. Frente: a direção para onde queremos ir. Atrás: por onde já passamos. Direita: o lado da nossa mão… qual? Esquerda: o lado da nossa mão… qual?',
  html:lado('t_olhar',
   '<div class="duas2">'+
   caixa('Frente','<p>A direção para onde <b>queremos ir</b>.</p>')+
   caixa('Atrás','<p>Por onde <b>já passamos</b>.</p>')+
   caixa('Direita','<p>O lado da nossa '+O('mão direita')+'.</p>')+
   caixa('Esquerda','<p>O lado da nossa '+O('mão esquerda')+'.</p>')+'</div>')},
 {tipo:'arrasta', tit:'Para onde aponta?', cols:2, regra:'Arraste cada palavra para a sua seta.',
  caixas:[{k:'f',t:'<span class="seta-dir" aria-label="para cima">&#8679;</span>'},{k:'a',t:'<span class="seta-dir" aria-label="para baixo">&#8681;</span>'},{k:'d',t:'<span class="seta-dir" aria-label="para a direita">&#8680;</span>'},{k:'e',t:'<span class="seta-dir" aria-label="para a esquerda">&#8678;</span>'}],
  itens:[{c:'f',t:'em frente'},{c:'a',t:'atrás'},{c:'d',t:'direita'},{c:'e',t:'esquerda'}]},
 {tipo:'texto', tit:'Descrever o caminho',
  fala:'Descrever o caminho. As direções ajudam a… o título conta! Um exemplo: siga em frente por 200 metros, vire à direita na próxima esquina, ande mais um quarteirão, vire à esquerda e você chegará ao seu destino.',
  html:lado('t_mapa_cel',
   R('As direções ajudam a '+O('descrever o caminho')+'.')+
   caixa('Um exemplo','<p>"Siga em <b>frente</b> por 200 metros, vire à <b>direita</b> na próxima esquina, ande mais um quarteirão, vire à <b>esquerda</b> e você chegará ao seu destino."</p>'))},
 {tipo:'ordena', tit:'O caminho, passo a passo', linha:true, regra:'Toque nos passos do exemplo, na ordem.',
  fala:'O caminho, passo a passo. Toque nos passos do exemplo, na ordem.',
  fimMsg:'Muito bem! Esse é o caminho do exemplo.',
  quadros:[{cap:'Siga em <b>frente</b> por 200 metros.'},{cap:'Vire à <b>direita</b> na próxima esquina.'},{cap:'Ande mais um quarteirão.'},{cap:'Vire à <b>esquerda</b>.'},{cap:'Você chegará ao seu destino.'}]},
 {tipo:'pares', tit:'Lembra das direções?', regra:REV,
  fala:'Lembra das direções? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Frente: a direção para onde ___.','queremos ir'],['Atrás: por onde ___.','já passamos'],['As direções ajudam a ___.','descrever o caminho']]},
 {tipo:'arrasta', tit:'Qual é a palavra?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: a direção para onde queremos ir.'},{k:'k1',frase:'___: por onde já passamos.'},{k:'k2',frase:'___: o lado da nossa mão direita.'},{k:'k3',frase:'___: o lado da nossa mão esquerda.'}],
  itens:[{c:'k0',t:'Frente'},{c:'k1',t:'Atrás'},{c:'k2',t:'Direita'},{c:'k3',t:'Esquerda'}]},
 NPT([
   P('O que quer dizer "atrás"?','por onde <b>já passamos</b>'),
   P('O que quer dizer "frente"?','a direção para onde <b>queremos ir</b>'),
   P('Complete: a ___ é o lado da nossa mão esquerda.','esquerda'),
   P('Para que servem as direções?','para <b>descrever o caminho</b>')])
]},

/* T4. Pontos de referência e localização (U3 S3, S14, S18, S19, S28, S29) */
{k:'referencia', tema:'referencia', unid:3, nome:'Pontos de referência', curto:'Pontos de referência', capa:'t_padaria', cor:'#a855f7', treino:[], telas:[
 {tipo:'texto', tit:'Onde estou?',
  fala:'Onde estou? Localização é saber onde estamos, para onde vamos e como chegaremos lá. Pontos de referência são lugares que não mudam na paisagem. Eles nos ajudam a encontrar outros lugares.',
  html:lado('t_mapa_cel',
   R('<b>Localização</b> é saber onde estamos, para onde vamos e como chegaremos lá.')+
   R('Pontos de referência são lugares que <b>não mudam</b> na paisagem.')+
   R('Eles nos ajudam a <b>encontrar outros lugares</b>.'))},
 {tipo:'escolha', tit:'Localização ou ponto de referência?', pergunta:'É localização ou é um ponto de referência?',
  fala:'Localização ou ponto de referência? Toque na resposta certa.', op:['Localização','Ponto de referência'], itens:[
   {m:'saber onde estamos', c:'Localização', d:'Localização é saber onde estamos, para onde vamos e como chegaremos lá.'},
   {m:'saber para onde vamos', c:'Localização', d:'Localização é saber onde estamos, para onde vamos e como chegaremos lá.'},
   {m:'saber como chegaremos lá', c:'Localização', d:'Localização é saber onde estamos, para onde vamos e como chegaremos lá.'},
   {m:'um prédio alto', c:'Ponto de referência', d:'Um prédio alto é um ponto de referência: não muda na paisagem.'},
   {m:'uma árvore', c:'Ponto de referência', d:'Uma árvore é um ponto de referência do material.'},
   {m:'uma construção colorida', c:'Ponto de referência', d:'Uma construção colorida é um ponto de referência do material.'},
   {m:'a padaria na esquina', img:'t_padaria', c:'Ponto de referência', d:'A padaria na esquina serve de ponto de referência.'}]},
 {tipo:'texto', tit:'Exemplos do material',
  fala:'Exemplos do material. Pontos de referência: uma construção colorida, um prédio alto, uma árvore, a linha de transmissão de energia ao lado da escola. A padaria na esquina é um comércio que serve de… você acabou de ver!',
  html:lado('t_padaria',
   caixa('Pontos de referência','<p>uma construção colorida · um <b>prédio alto</b> · uma <b>árvore</b> · a linha de transmissão de energia ao lado da escola</p>')+esp()+
   R('A padaria na esquina é um comércio que serve de '+O('ponto de referência')+'.'))},
 {tipo:'pares', tit:'Para que servem?', regra:REV,
  fala:'Para que servem? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Pontos de referência são lugares que ___ na paisagem.','não mudam'],['Eles nos ajudam a ___ outros lugares.','encontrar'],['A padaria na esquina serve de ___.','ponto de referência']]},
 {tipo:'texto', tit:'Para chegar lá',
  fala:'Para chegar lá. No croqui do jogo: casa da família, escola do João, escola da Maria, padaria do José e trabalho da Antônia. Antônia vai ao trabalho pelo caminho mais… pense: a rua da escola é muito movimentada! Sem saber o caminho, usamos pontos indicados por alguém que conhece o trajeto. Saber se localizar é observar, pensar e se locomover com atenção.',
  html:caixa('No croqui do jogo','<p>Casa da família · Escola do João · Escola da Maria · Padaria do José · Trabalho da Antônia</p>')+esp()+
   R('Antônia vai ao trabalho pelo '+O('caminho mais tranquilo')+', porque a rua da escola é <b>muito movimentada</b>.')+
   R('Sem saber o caminho, usamos pontos indicados por <b>alguém que conhece</b> o trajeto.')+
   R('Saber se localizar é <b>observar</b>, <b>pensar</b> e se locomover com <b>atenção</b>.')},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Pontos de referência ___ na paisagem.'},{k:'k1',frase:'Eles nos ajudam a ___ outros lugares.'},{k:'k2',frase:'___ é saber onde estamos, para onde vamos e como chegaremos lá.'},{k:'k3',frase:'Sem saber o caminho, seguimos pontos indicados por alguém que já ___ o trajeto.'}],
  itens:[{c:'k0',t:'não mudam'},{c:'k1',t:'encontrar'},{c:'k2',t:'Localização'},{c:'k3',t:'conhece'}]},
 NPT([
   P('O que é um ponto de referência?','um lugar que <b>não muda</b> na paisagem e ajuda a <b>encontrar outros lugares</b>'),
   P('Cite um ponto de referência do material.','um <b>prédio alto</b>, uma <b>árvore</b>, a <b>padaria</b>','t_padaria'),
   P('Por que Antônia não vai pela rua da escola?','porque ela é <b>muito movimentada</b>')])
]},

/* T5. Mapas, croqui e planta baixa (U3 S5, S9, S10, S19, S20, S21, S22, S25, S29)
   O material não define croqui nem planta baixa: aqui só se RECONHECE pelo exemplo e pela função. */
{k:'mapas', tema:'mapas', unid:3, nome:'Mapa, croqui e planta baixa', curto:'Mapa, croqui e planta', capa:'t_croqui_rua', cor:'#14b8a6', treino:[], telas:[
 {tipo:'texto', tit:'Para que serve um mapa?',
  fala:'Para que serve um mapa? Os mapas servem para localizar e representar os espaços. Eles ajudam a entender os caminhos e a planejar os trajetos. Podem ser de papel ou… olhe a foto do celular!',
  html:lado('t_app',
   R('Os mapas servem para <b>localizar</b> e <b>representar</b> os espaços.')+
   R('Eles ajudam a <b>entender os caminhos</b> e a <b>planejar os trajetos</b>.')+
   R('Podem ser <b>de papel</b> ou '+O('digitais')+': os aplicativos de navegação do celular e do computador.'))},
 {tipo:'pares', tit:'O mapa serve para…', regra:REV,
  fala:'O mapa serve para… Toque em cada frase para ver o pedaço que falta.',
  pares:[['Os mapas servem para ___ e representar os espaços.','localizar'],['Eles ajudam a entender os caminhos e a ___.','planejar os trajetos'],['Os mapas podem ser de papel ou ___.','digitais']]},
 {tipo:'texto', tit:'O desenho da rua',
  fala:'O desenho da rua. Este desenho da rua é um croqui. Nele aparecem casas, calçada, poste de iluminação, placas, árvores, veículos e pessoas. O croqui mostra os elementos da rua e ajuda a ler um caminho.',
  html:lado('t_croqui_rua',
   R('Este desenho da rua é um <b>croqui</b>.')+
   R('Nele aparecem casas, calçada, poste de iluminação, placas, árvores, veículos e pessoas.')+
   R('O croqui mostra os elementos da rua e ajuda a <b>ler um caminho</b>.'))},
 {tipo:'arrasta', tit:'O croqui da rua', cols:1, fig:'t_croqui_rua', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O desenho da rua, com casas, calçada e postes, é um ___.'},{k:'k2',frase:'O croqui ajuda a ler um ___.'}],
  itens:[{c:'k0',t:'croqui'},{c:'k2',t:'caminho'}]},
 {tipo:'texto', tit:'Visto de cima',
  fala:'Visto de cima. A sala de aula, e a mesma sala vista… o título conta! Este desenho da sala, visto de cima, é uma planta baixa: mostra onde ficam as coisas. Na planta baixa do apartamento: sacada, quarto, sala, escritório, cozinha e banheiro. Imagens aéreas, mapas e fotos mostram os lugares de pontos de vista diferentes: de cima ou de frente.',
  html:'<div class="lado ladog"><div class="lfig">'+grade(3,[['t_sala3d','a sala de aula'],['t_planta_sala','a mesma sala vista '+O('de cima')],['t_planta_ap','a planta baixa do apartamento']])+'</div><div class="ltx">'+
   R('Este desenho da sala, visto de cima, é uma <b>planta baixa</b>: mostra onde ficam as coisas.')+
   R('Na <b>planta baixa</b> do apartamento: sacada, quarto, sala, escritório, cozinha e banheiro.')+
   R('Imagens aéreas, mapas e fotos mostram os lugares de pontos de vista <b>diferentes</b>: de cima ou de frente.')+'</div></div>'},
 {tipo:'escolha', tit:'Croqui da rua ou planta baixa?', pergunta:'Onde aparece: no croqui da rua ou na planta baixa do apartamento?',
  fala:'Croqui da rua ou planta baixa? Toque na resposta certa.', op:['Croqui da rua','Planta baixa'], itens:[
   {m:'casas', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'calçada', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'poste de iluminação', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'veículos', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'sacada', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'quarto', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'cozinha', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'banheiro', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'escritório', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'}]},
 {tipo:'arrasta', tit:'Qual é o nome?', cols:3, regra:'Arraste cada nome para a sua figura.',
  caixas:[{k:'cro',t:'',img:'t_croqui_rua'},{k:'pla',t:'',img:'t_planta_ap'},{k:'map',t:'',img:'t_app'}],
  itens:[{c:'cro',t:'croqui da rua'},{c:'pla',t:'planta baixa'},{c:'map',t:'mapa digital'}]},
 NPT([
   P('Este desenho da sala, visto de cima, é um croqui ou uma planta baixa?','uma <b>planta baixa</b>','t_planta_sala'),
   P('Este desenho da rua é um ___.','croqui','t_croqui_rua'),
   P('Para que serve um mapa?','para <b>entender os caminhos</b> e <b>planejar os trajetos</b>')])
]},

/* T6. Tipos de rua e vias de circulação (U3 S6, S7, S8) */
{k:'ruas', tema:'ruas', unid:3, nome:'Tipos de rua e vias', curto:'Tipos de rua', capa:'t_avenida', cor:'#94a3b8', treino:[], telas:[
 {tipo:'texto', tit:'As ruas não são iguais',
  fala:'As ruas não são iguais. Olhe as fotos. Rua residencial: muitas… o quê? Mais tranquila, pouco comércio. Rua comercial: muitas… o quê? Muito movimentada. Algumas ruas são largas, outras estreitas.',
  html:grade(2,[['t_residencial','Rua <b>residencial</b>: '+O('muitas casas')+', mais <b>tranquila</b>, pouco comércio.'],['t_comercial','Rua <b>comercial</b>: '+O('muitas lojas')+', muito <b>movimentada</b>.']])+
   R('Algumas ruas são <b>largas</b>, outras <b>estreitas</b>.')},
 {tipo:'escolha', tit:'Residencial ou comercial?', pergunta:'É rua residencial ou rua comercial?',
  fala:'Residencial ou comercial? Toque na resposta certa.', op:['Residencial','Comercial'], itens:[
   {img:'t_residencial', c:'Residencial', d:'Muitas casas: rua residencial.'},
   {img:'t_comercial', c:'Comercial', d:'Muitas lojas: rua comercial.'},
   {img:'t_rua_lojas', c:'Comercial', d:'Muitas lojas: rua comercial.'},
   {m:'muitas casas', c:'Residencial', d:'A rua residencial tem muitas casas.'},
   {m:'mais tranquila', c:'Residencial', d:'A rua residencial geralmente é mais tranquila.'},
   {m:'pouco comércio', c:'Residencial', d:'A rua residencial tem pouco comércio.'},
   {m:'muitas lojas', c:'Comercial', d:'A rua comercial tem muitas lojas.'},
   {m:'muito movimentada', c:'Comercial', d:'A rua comercial é muito movimentada.'}]},
 {tipo:'texto', tit:'Dentro e entre as cidades',
  fala:'Dentro e entre as cidades. Avenida Paulista, São Paulo. Rodovia dos Imigrantes. Nas cidades: ruas e avenidas. Entre as cidades: … olhe a segunda foto! E estradas de terra ou asfaltadas.',
  html:grade(2,[['t_avenida','<b>Avenida</b> Paulista, São Paulo'],['t_rodovia','<b>Rodovia</b> dos Imigrantes']])+
   R('<b>Nas cidades</b>: ruas e avenidas. <b>Entre as cidades</b>: '+O('rodovias')+' e estradas de terra ou asfaltadas.')},
 {tipo:'revela', tit:'Como cada uma é', cols:4, regra:'Vire cada cartão para ver como é a via.', q:'Como é?',
  fala:'Como cada uma é. Vire cada cartão: avenida, rodovia, rua residencial e rua comercial.',
  cartoes:[
   {n:'Avenida', img:'t_avenida', b:'Mais <b>larga</b> que a rua, com mais de uma faixa, semáforos e placas. Liga <b>distâncias maiores</b> dentro da cidade.'},
   {n:'Rodovia', img:'t_rodovia', b:'Usada por carros, motos, ônibus e caminhões. <b>Liga cidades</b> e passa por áreas <b>mais afastadas</b>.'},
   {n:'Rua residencial', img:'t_residencial', b:'Predominam as <b>moradias</b>: casas e prédios.'},
   {n:'Rua comercial', img:'t_comercial', b:'Lojas, mercados, padarias e <b>muitas pessoas</b> circulando.'}]},
 {tipo:'arrasta', tit:'Que tipo de via é?', cols:2, regra:'Arraste cada foto para o seu tipo de via.',
  caixas:[{k:'res',t:'Rua residencial',cor:'#22c55e'},{k:'com',t:'Rua comercial',cor:'#f97316'},{k:'ave',t:'Avenida',cor:'#0ea5e9'},{k:'rod',t:'Rodovia',cor:'#a855f7'}],
  itens:[{c:'res',img:'t_residencial'},{c:'com',img:'t_comercial'},{c:'com',img:'t_rua_lojas'},{c:'ave',img:'t_avenida'},{c:'rod',img:'t_rodovia'}]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A ___ liga uma cidade a outra.'},{k:'k1',frase:'A ___ é mais larga e liga distâncias maiores dentro da cidade.'},{k:'k2',frase:'Na rua ___ há muitas lojas.'},{k:'k3',frase:'Na rua ___ predominam as moradias.'}],
  itens:[{c:'k0',t:'rodovia'},{c:'k1',t:'avenida'},{c:'k2',t:'comercial'},{c:'k3',t:'residencial'}]},
 {tipo:'texto', tit:'Cada rua tem um jeito',
  fala:'Cada rua tem um jeito. Cada rua tem um jeito de ser usada: faz parte do planejamento urbano. Em Campinas há uma área onde prédios são permitidos e, perto do lago, só casas. Entender as ruas ajuda a andar com mais segurança, cuidar do bairro e melhorar o lugar onde vivemos.',
  html:lado('t_zoneamento',
   R('Cada rua tem um jeito de ser usada: faz parte do <b>planejamento urbano</b>.')+
   R('Em Campinas há uma área onde prédios são permitidos e, perto do lago, só casas.')+
   R('Entender as ruas ajuda a andar com <b>mais segurança</b>, cuidar do bairro e melhorar o lugar onde vivemos.'))},
 {tipo:'arrasta', tit:'Como é a rua?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A rua residencial geralmente é mais ___.'},{k:'k1',frase:'A rua comercial é muito ___.'},{k:'k2',frase:'As ruas não são iguais: algumas são largas, outras ___.'}],
  itens:[{c:'k0',t:'tranquila'},{c:'k1',t:'movimentada'},{c:'k2',t:'estreitas'}]},
 {tipo:'texto', tit:'Do que a rua é feita?',
  fala:'Do que a rua é feita? Paralelepípedo: cidades mais antigas ou históricas, como Paraty. Bloquetes: blocos encaixados, em muitos bairros. Terra batida: sem calçamento, mais comum em áreas rurais. A rua também pode ter asfalto.',
  html:lado('t_paraty',
   caixa('Os materiais das ruas','<p class="linhas">Paralelepípedo: cidades <b>mais antigas</b> ou históricas, como Paraty (RJ).<br>Bloquetes: <b>blocos encaixados</b>, em muitos bairros.<br>Terra batida: <b>sem calçamento</b>, mais comum em áreas rurais.<br>A rua também pode ter <b>asfalto</b>.</p>'))},
 {tipo:'arrasta', tit:'Qual é o material?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: ruas de cidades mais antigas ou históricas.'},{k:'k1',frase:'___: blocos encaixados, usados em muitos bairros.'},{k:'k2',frase:'___: rua sem calçamento, comum em áreas rurais.'}],
  itens:[{c:'k0',t:'Paralelepípedo'},{c:'k1',t:'Bloquetes'},{c:'k2',t:'Terra batida'}]},
 NPT([
   P('Olhe a foto. É uma rua residencial ou comercial?','<b>comercial</b>','t_comercial'),
   P('Qual via liga uma cidade a outra?','a <b>rodovia</b>','t_rodovia'),
   P('Ruas de cidades antigas ou históricas, como Paraty, usam ___.','paralelepípedo'),
   P('Ligue: muitas lojas, muitas casas → residencial, comercial.','muitas lojas: <b>comercial</b> · muitas casas: <b>residencial</b>')])
]},

/* T7. O bairro e a cidade (U3 S11, S12, S13, S14) */
{k:'bairro', tema:'bairro', unid:3, nome:'O bairro e a cidade', curto:'O bairro e a cidade', capa:'t_bairro_sb', cor:'#f97316', treino:[], telas:[
 {tipo:'texto', tit:'O que é o bairro?',
  fala:'O que é o bairro? Uma cidade é composta por vários bairros. O bairro é um conjunto de ruas e quarteirões. Nos bairros há casas, prédios, escolas, praças, igrejas, hospitais, farmácias e pontos de ônibus. No bairro as pessoas frequentam espaços de lazer, praticam esportes e convivem.',
  html:lado('t_bairro_sb',
   R('Uma cidade é composta por <b>vários bairros</b>.')+
   R('O bairro é um <b>conjunto de ruas</b> e quarteirões.')+
   R('Nos bairros há casas, prédios, escolas, praças, igrejas, hospitais, farmácias e pontos de ônibus.')+
   R('No bairro as pessoas frequentam <b>espaços de lazer</b>, praticam esportes e convivem.'))},
 {tipo:'pares', tit:'Lembra do bairro?', regra:REV,
  fala:'Lembra do bairro? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Uma cidade é composta por ___.','vários bairros'],['O bairro é um ___ e quarteirões.','conjunto de ruas'],['No bairro as pessoas frequentam espaços de ___.','lazer']]},
 {tipo:'texto', tit:'Tudo está conectado',
  fala:'Tudo está conectado. Pela rua chegamos à escola, ao trabalho e aos lugares de lazer. Os veículos transportam pessoas e mercadorias. No poema O meu bairro: supermercado, sorveteria, hospital, banco, padaria, parquinho e rampas para quem é especial.',
  html:lado('t_bairro_praia',
   R('Pela rua chegamos à <b>escola</b>, ao <b>trabalho</b> e aos lugares de lazer.')+
   R('Os veículos transportam <b>pessoas</b> e <b>mercadorias</b>.')+
   R('No poema "O meu bairro": supermercado, sorveteria, hospital, banco, padaria, parquinho e <b>rampas</b> para quem é especial.'))},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_bairro_sb', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'No bairro as pessoas frequentam espaços de ___.'},{k:'k1',frase:'No bairro as pessoas praticam ___ e convivem.'},{k:'k2',frase:'Pela rua chegamos à ___, ao trabalho e aos lugares de lazer.'},{k:'k3',frase:'Os veículos transportam pessoas e ___.'}],
  itens:[{c:'k0',t:'lazer'},{c:'k1',t:'esportes'},{c:'k2',t:'escola'},{c:'k3',t:'mercadorias'}]},
 {tipo:'texto', tit:'Um dentro do outro',
  fala:'Um dentro do outro. Na canção Ora bolas: a casa tá na rua, a rua tá dentro da cidade. Casa, rua, bairro, cidade. Do menor para o maior: a casa fica na rua, a rua fica no bairro e o bairro fica na… olhe a fileira!',
  html:R('Na canção "Ora bolas": a casa <b>tá na rua</b>, a rua tá dentro da <b>cidade</b>.')+
   '<div class="passos"><div class="passo"><b>casa</b></div><span class="pseta" aria-hidden="true">&rsaquo;</span><div class="passo"><b>rua</b></div><span class="pseta" aria-hidden="true">&rsaquo;</span><div class="passo"><b>bairro</b></div><span class="pseta" aria-hidden="true">&rsaquo;</span><div class="passo"><b>cidade</b></div></div>'+
   R('Do menor para o maior: a casa fica na rua, a rua fica no bairro e o bairro fica na '+O('cidade')+'.')},
 {tipo:'ordena', tit:'Do menor para o maior', cols:4, regra:'Toque do menor para o maior.',
  fala:'Do menor para o maior. Toque do menor para o maior: casa, rua, bairro e cidade, embaralhados.',
  fimMsg:'Muito bem! A casa fica na rua, a rua fica no bairro e o bairro fica na cidade.',
  quadros:[{cap:'casa'},{cap:'rua'},{cap:'bairro'},{cap:'cidade'}]},
 {tipo:'arrasta', tit:'A canção "Ora bolas"', cols:1, regra:'Arraste cada palavra para completar a canção.',
  caixas:[{k:'k0',frase:'A casa tá na ___.'},{k:'k1',frase:'A rua tá dentro da ___.'},{k:'k2',frase:'A cidade tá do lado da ___.'},{k:'k3',frase:'A floresta é no ___.'},{k:'k4',frase:'O Brasil tá na ___.'}],
  itens:[{c:'k0',t:'rua'},{c:'k1',t:'cidade'},{c:'k2',t:'floresta'},{c:'k3',t:'Brasil'},{c:'k4',t:'América do Sul'}]},
 NPT([
   P('Uma cidade é formada por vários ___.','bairros'),
   P('Ordene do menor para o maior: cidade, casa, bairro, rua.','<b>casa</b> → <b>rua</b> → <b>bairro</b> → <b>cidade</b>'),
   P('Cite dois lugares que existem no bairro.','<b>escola</b>, <b>praça</b>, <b>mercado</b>, <b>farmácia</b>','t_bairro_sb'),
   P('O que os veículos transportam?','<b>pessoas</b> e <b>mercadorias</b>')])
]},

/* T8. Meios de transporte e trabalho na cidade (U3 S4, S7, S24, S26, S27, S28) */
{k:'transporte', tema:'transporte', unid:3, nome:'Transporte e trabalho', curto:'Transporte e trabalho', capa:'t_motorista', cor:'#2563eb', treino:[], telas:[
 {tipo:'texto', tit:'Como as pessoas se deslocam',
  fala:'Como as pessoas se deslocam. Meios de transporte: a pé, de bicicleta, de carro, de ônibus e de moto. Na rodovia passam carros, motos, ônibus e caminhões. Muitas pessoas usam o ônibus para trabalhar ou estudar em outro bairro. No jogo da rota: sou professora, vou de ônibus até a escola.',
  html:R('Meios de transporte: <b>a pé</b>, de <b>bicicleta</b>, de <b>carro</b>, de <b>ônibus</b> e de <b>moto</b>.')+
   R('Na rodovia passam carros, motos, ônibus e <b>caminhões</b>.')+
   R('Muitas pessoas usam o ônibus para <b>trabalhar</b> ou <b>estudar</b> em outro bairro.')+
   R('No jogo da rota: "Sou professora, vou de <b>ônibus</b> até a escola."')},
 {tipo:'pares', tit:'Lembra do ônibus?', regra:REV,
  fala:'Lembra do ônibus? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Muitas pessoas usam o ônibus para ___ ou estudar em outro bairro.','trabalhar'],['No jogo da rota: "Sou professora, vou de ___ até a escola."','ônibus'],['Na rodovia passam carros, motos, ônibus e ___.','caminhões']]},
 {tipo:'texto', tit:'O trabalho na cidade',
  fala:'O trabalho na cidade. Olhe as fotos. Quem está na sala de aula? O gari mantém as ruas limpas. O agente de trânsito. Quem dirige o ônibus? Também: cozinheiro, cientista, pedreiro, entregador, policiais e médica.',
  html:grade(2,[['t_professora','a '+O('professora')+' na sala de aula'],['t_gari','o <b>gari</b> mantém as ruas limpas'],['t_agente','o <b>agente de trânsito</b>'],['t_motorista','o '+O('motorista')+' de ônibus']],'g4w')+
   R('Também: cozinheiro, cientista, pedreiro, entregador, policiais e médica.')},
 {tipo:'escolha', tit:'Transporte ou trabalho?', pergunta:'É um meio de transporte ou um trabalho na cidade?',
  fala:'Transporte ou trabalho? Toque na resposta certa.', op:['Meio de transporte','Trabalho'], itens:[
   {m:'a pé', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de bicicleta', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de carro', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de ônibus', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de moto', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'professora', img:'t_professora', c:'Trabalho', d:'A professora trabalha na sala de aula.'},
   {m:'gari', img:'t_gari', c:'Trabalho', d:'O gari mantém as ruas limpas.'},
   {m:'cozinheiro', c:'Trabalho', d:'Cozinheiro é um dos trabalhos na cidade.'},
   {m:'pedreiro', c:'Trabalho', d:'Pedreiro é um dos trabalhos na cidade.'},
   {m:'entregador', c:'Trabalho', d:'Entregador é um dos trabalhos na cidade.'},
   {m:'médica', c:'Trabalho', d:'Médica é um dos trabalhos na cidade.'}]},
 {tipo:'arrasta', tit:'Quem é?', cols:2, regra:'Arraste cada profissão para a sua foto.',
  caixas:[{k:'pro',t:'',img:'t_professora'},{k:'gar',t:'',img:'t_gari'},{k:'age',t:'',img:'t_agente'},{k:'mot',t:'',img:'t_motorista'}],
  itens:[{c:'pro',t:'professora'},{c:'gar',t:'gari'},{c:'age',t:'agente de trânsito'},{c:'mot',t:'motorista de ônibus'}]},
 NPT([
   P('Quem mantém as ruas limpas?','o <b>gari</b>','t_gari'),
   P('Cite dois meios de transporte.','<b>ônibus</b>, <b>carro</b>, <b>bicicleta</b>, <b>moto</b>, <b>a pé</b>'),
   P('Para que muitas pessoas usam o ônibus?','para <b>trabalhar</b> ou <b>estudar</b> em outro bairro')])
]},

/* ===================== UNIDADE 4 ===================== */

/* T9. Meio ambiente, a casa de todos (U4 S5, S6) */
{k:'ambiente', tema:'ambiente', unid:4, nome:'Meio ambiente, a casa de todos', curto:'Meio ambiente', capa:'t_ilha', cor:'#22c55e', treino:[], telas:[
 {tipo:'texto', tit:'Uma casa bem maior',
  fala:'Uma casa bem maior. O lugar onde moramos é muito… o título conta! … do que a nossa casa. Começa nas ruas e passa por parques, montanhas, mares, florestas e céus cheios de nuvens. Essa grande casa se chama meio ambiente.',
  html:lado('t_ilha',
   R('O lugar onde moramos é muito '+O('maior')+' do que a nossa casa.')+
   R('Começa nas ruas e passa por parques, montanhas, mares, florestas e céus cheios de nuvens.')+
   R('Essa grande casa se chama <b>meio ambiente</b>.'))},
 {tipo:'pares', tit:'A grande casa', regra:REV,
  fala:'A grande casa. Toque em cada frase para ver o pedaço que falta.',
  pares:[['O lugar onde moramos é muito maior do que a nossa ___.','casa'],['Começa nas ___ e passa por parques, montanhas, mares, florestas e céus.','ruas'],['Essa grande casa se chama ___.','meio ambiente']]},
 {tipo:'texto', tit:'O que faz parte dela',
  fala:'O que faz parte dela. O meio ambiente é tudo o que existe na natureza: árvores, animais, pedras, água, ar, solo, Sol, chuva. E nós também fazemos parte disso tudo! Ele está nas plantas do quintal, no passarinho que visita a janela, no cheirinho da terra molhada e no céu.',
  html:lado('t_janela',
   R('O meio ambiente é tudo o que existe na natureza: árvores, animais, pedras, água, ar, solo, Sol, chuva…')+
   R('E <b>nós também</b> fazemos parte disso tudo!')+
   R('Ele está nas plantas do <b>quintal</b>, no <b>passarinho</b> que visita a janela, no cheirinho da terra molhada e no <b>céu</b>.'))},
 {tipo:'arrasta', tit:'No nosso dia a dia', cols:1, fig:'t_janela', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O meio ambiente está nas plantas do ___.'},{k:'k1',frase:'Também está no ___ que visita a janela.'},{k:'k2',frase:'Também está no cheirinho da terra ___.'},{k:'k3',frase:'Também está no ___ cheio de nuvens.'}],
  itens:[{c:'k0',t:'quintal'},{c:'k1',t:'passarinho'},{c:'k2',t:'molhada'},{c:'k3',t:'céu'}]},
 {tipo:'texto', tit:'A casa de todos',
  fala:'A casa de todos. Meio ambiente: a casa de todos os seres vivos. Quando cuidamos dessa casa maior, cuidamos de… lembra? Nós também fazemos parte dela! Seja um guardião do meio ambiente!',
  html:R('Meio ambiente: a casa de todos os <b>seres vivos</b>.')+
   R('Quando cuidamos dessa casa maior, cuidamos de '+O('nós mesmos')+' e de todos que vivem com a gente.')+
   R('Seja um <b>guardião</b> do meio ambiente!')},
 {tipo:'liga', tit:'Ligue as duas partes', regra:'Toque no começo da frase e depois no fim dela.',
  fala:'Ligue as duas partes. Toque no começo da frase e depois no fim dela.',
  pares:[['Essa grande casa se chama','meio ambiente.'],['O meio ambiente é a casa de todos os','seres vivos.'],['E nós também','fazemos parte disso tudo!'],['Seja um guardião','do meio ambiente!']]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_ilha', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O lugar onde moramos é muito ___ do que a nossa casa.'},{k:'k1',frase:'Essa grande casa se chama ___.'},{k:'k2',frase:'O meio ambiente é a casa de todos os ___.'},{k:'k3',frase:'Quando cuidamos do meio ambiente, cuidamos de ___ mesmos.'}],
  itens:[{c:'k0',t:'maior'},{c:'k1',t:'meio ambiente'},{c:'k2',t:'seres vivos'},{c:'k3',t:'nós'}]},
 NPT([
   P('O que faz parte do meio ambiente?','<b>animais</b>, <b>plantas</b>, <b>água</b>, <b>ar</b>, <b>solo</b>… e <b>nós também</b>'),
   P('Verdadeiro ou falso: as pessoas fazem parte do meio ambiente.','<b>Verdadeiro</b>'),
   P('O meio ambiente é a casa de todos os ___.','seres vivos')])
]},

/* T10. Sons da natureza (U4 S6; U3 S3) — só o átomo cobrável */
{k:'sons', tema:'sons', unid:4, nome:'Sons da natureza', curto:'Sons da natureza', capa:'t_janela', cor:'#06b6d4', treino:[], telas:[
 {tipo:'texto', tit:'Quem mora na grande casa',
  fala:'Quem mora na grande casa. O mundo é como uma grande casa onde moram juntos: pessoas, animais, plantas, rios, nuvens, ventos e até os sons da natureza. Os sons da natureza fazem parte do meio ambiente. A cidade também tem sons: ela é feita de caminhos… e de quê? A frase já contou!',
  html:R('O mundo é como uma grande casa onde moram juntos: pessoas, animais, plantas, rios, nuvens, ventos e até os <b>sons da natureza</b>.')+
   R('Os sons da natureza <b>fazem parte</b> do meio ambiente.')+
   R('A cidade também tem sons: ela é feita de caminhos, '+O('sons')+' e movimentos.')},
 {tipo:'pares', tit:'Os sons', regra:REV,
  fala:'Os sons. Toque em cada frase para ver o pedaço que falta.',
  pares:[['O mundo é como uma grande ___.','casa'],['Os sons da natureza fazem parte do ___.','meio ambiente'],['A cidade é feita de caminhos, sons e ___.','movimentos']]},
 {tipo:'liga', tit:'Ligue as duas partes', regra:'Toque no começo da frase e depois no fim dela.',
  fala:'Ligue as duas partes. Toque no começo da frase e depois no fim dela.',
  pares:[['O mundo é como','uma grande casa.'],['Os sons da natureza','fazem parte do meio ambiente.'],['A cidade também tem sons:','ela é feita de caminhos, sons e movimentos.']]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Os sons da natureza fazem ___ do meio ambiente.'},{k:'k1',frase:'As cidades são feitas de caminhos, ___ e movimentos.'}],
  itens:[{c:'k0',t:'parte'},{c:'k1',t:'sons'}]},
 NPT([
   P('Verdadeiro ou falso: os sons da natureza fazem parte do meio ambiente.','<b>Verdadeiro</b>'),
   P('Complete: as cidades são feitas de caminhos, ___ e movimentos.','sons')])
]},

/* T11. Fauna e flora — os biomas do Brasil (U4 S4, S8–S14, S17, S20) */
{k:'biomas', tema:'biomas', unid:4, nome:'Fauna e flora: os biomas', curto:'Os 6 biomas', capa:'t_arara', cor:'#84cc16', treino:[], telas:[
 {tipo:'texto', tit:'Animais e plantas',
  fala:'Animais e plantas. Fauna são os animais de um lugar. Flora são as plantas, a vegetação de um lugar. O Brasil tem 6 biomas. Os biomas e os animais são a riqueza natural do país e precisam ser cuidados.',
  html:lado('t_mapa_biomas',
   R('<b>Fauna</b> são os animais de um lugar.')+
   R('<b>Flora</b> são as plantas, a vegetação de um lugar.')+
   R('O Brasil tem <b>6 biomas</b>.')+
   R('Os biomas e os animais são a riqueza natural do país e <b>precisam ser cuidados</b>.'))},
 {tipo:'escolha', tit:'Fauna ou flora?', pergunta:'É fauna (animal) ou flora (planta)?',
  fala:'Fauna ou flora? Olhe a foto e toque na resposta certa.', op:['Fauna','Flora'], itens:[
   {m:'arara', img:'t_arara', c:'Fauna', d:'A arara é um animal: fauna.'},
   {m:'lobo-guará', img:'t_loboguara', c:'Fauna', d:'O lobo-guará é um animal: fauna.'},
   {m:'mico-leão-dourado', img:'t_mico', c:'Fauna', d:'O mico-leão-dourado é um animal: fauna.'},
   {m:'quero-quero', img:'t_queroquero', c:'Fauna', d:'O quero-quero é um animal: fauna.'},
   {m:'vitória-régia', img:'t_vitoria', c:'Flora', d:'A vitória-régia é uma planta: flora.'},
   {m:'bromélia', img:'t_bromelia', c:'Flora', d:'A bromélia é uma planta: flora.'},
   {m:'capim-dos-pampas', img:'t_capim', c:'Flora', d:'O capim-dos-pampas é uma planta: flora.'},
   {m:'sempre-viva', img:'t_sempreviva', c:'Flora', d:'A sempre-viva é uma planta: flora.'}]},
 {tipo:'revela', tit:'Os 6 biomas', cols:3, regra:'Vire cada cartão: onde fica o bioma e como é a vegetação.', q:'Onde fica? Vegetação?',
  fala:'Os 6 biomas. Vire cada cartão para ver onde fica o bioma e como é a vegetação: Amazônia, Cerrado, Caatinga, Pampa, Pantanal e Mata Atlântica.',
  cartoes:[
   {n:NOME.amz, cor:COR.amz, img:'t_amazonia', b:'<b>Norte</b> do Brasil.<br>Árvores altas e muitas folhas.'},
   {n:NOME.cer, cor:COR.cer, img:'t_cerrado', b:'<b>Centro</b> do Brasil.<br>Árvores tortas e grama.'},
   {n:NOME.caa, cor:COR.caa, img:'t_caatinga', b:'<b>Nordeste</b> do Brasil.<br>Plantas com espinhos (cactos).'},
   {n:NOME.pam, cor:COR.pam, img:'t_pampa', b:'<b>Sul</b> do Brasil.<br>Campos com capim baixo.'},
   {n:NOME.pan, cor:COR.pan, img:'t_pantanal', b:'<b>Mato Grosso</b> e Mato Grosso do Sul.<br>Plantas que gostam de água.'},
   {n:NOME.mat, cor:COR.mat, img:'t_mata', b:'<b>Litoral</b> do Brasil.<br>Floresta úmida e densa.'}]},
 {tipo:'arrasta', tit:'Onde fica?', cols:3, fig:'t_mapa_biomas', regra:'Arraste cada lugar para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',t:'Norte'},{c:'cer',t:'Centro'},{c:'caa',t:'Nordeste'},{c:'pam',t:'Sul'},{c:'pan',t:'Mato Grosso e Mato Grosso do Sul'},{c:'mat',t:'Litoral'}]},
 {tipo:'arrasta', tit:'De qual bioma é a paisagem?', cols:3, regra:'Arraste cada foto para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',img:'t_amazonia'},{c:'cer',img:'t_cerrado'},{c:'caa',img:'t_caatinga'},{c:'pam',img:'t_pampa'},{c:'pan',img:'t_pantanal'},{c:'mat',img:'t_mata'}]},
 {tipo:'texto', tit:'Os animais (fauna)',
  fala:'Os animais, a fauna. Amazônia: onça-pintada, macaco, arara. Cerrado: lobo-guará, tamanduá-bandeira. Caatinga: tatu, veado-catingueiro, asa-branca. Pampa: cavalo, ema, quero-quero, capivara. Pantanal: jacaré, tuiuiú, sucuri, capivara. Mata Atlântica: mico-leão-dourado, preguiça. No material, a capivara aparece em dois biomas: Pampa e Pantanal.',
  html:bios({amz:'<b>onça-pintada</b>, <b>macaco</b>, <b>arara</b>',cer:'<b>lobo-guará</b>, <b>tamanduá-bandeira</b>',caa:'<b>tatu</b>, <b>veado-catingueiro</b>, <b>asa-branca</b>',pam:'<b>cavalo</b>, <b>ema</b>, <b>quero-quero</b>, capivara',pan:'<b>jacaré</b>, <b>tuiuiú</b>, <b>sucuri</b>, capivara',mat:'<b>mico-leão-dourado</b>, <b>preguiça</b>'})+
   R('No material, a capivara aparece em <b>dois biomas</b>: Pampa e Pantanal.')},
 {tipo:'arrasta', tit:'De qual bioma é o bicho?', cols:3, regra:'Arraste cada bicho para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',img:'t_arara'},{c:'cer',img:'t_loboguara'},{c:'caa',img:'t_asabranca'},{c:'pam',img:'t_queroquero'},{c:'mat',img:'t_mico'},{c:'pan',t:'tuiuiú'}]},
 {tipo:'escolha', tit:'Mais bichos', pergunta:'Na tabela do material, de qual bioma é este bicho?',
  fala:'Mais bichos. Na tabela do material, de qual bioma é este bicho? Toque no bioma certo.', op:ORD.map(function(k){ return NOME[k]; }), itens:[
   {m:'onça-pintada', c:NOME.amz, d:'Amazônia: onça-pintada, macaco, arara.'},
   {m:'macaco', c:NOME.amz, d:'Amazônia: onça-pintada, macaco, arara.'},
   {m:'tamanduá-bandeira', c:NOME.cer, d:'Cerrado: lobo-guará, tamanduá-bandeira.'},
   {m:'tatu', c:NOME.caa, d:'Caatinga: tatu, veado-catingueiro, asa-branca.'},
   {m:'veado-catingueiro', c:NOME.caa, d:'Caatinga: tatu, veado-catingueiro, asa-branca.'},
   {m:'cavalo', c:NOME.pam, d:'Pampa: cavalo, ema, quero-quero, capivara.'},
   {m:'ema', c:NOME.pam, d:'Pampa: cavalo, ema, quero-quero, capivara.'},
   {m:'jacaré', c:NOME.pan, d:'Pantanal: jacaré, tuiuiú, sucuri, capivara.'},
   {m:'sucuri', c:NOME.pan, d:'Pantanal: jacaré, tuiuiú, sucuri, capivara.'},
   {m:'preguiça', c:NOME.mat, d:'Mata Atlântica: mico-leão-dourado, preguiça.'}]},
 {tipo:'texto', tit:'As plantas das fotos',
  fala:'As plantas das fotos. Vitória-régia: Amazônia. Sempre-viva: Cerrado. Louro-preto: Caatinga. Capim-dos-pampas: Pampa. Bromélias em área alagada: Pantanal. Bromélia: Mata Atlântica.',
  html:grade(3,[['t_vitoria','vitória-régia: <b>Amazônia</b>'],['t_sempreviva','sempre-viva: <b>Cerrado</b>'],['t_louro','louro-preto: <b>Caatinga</b>'],['t_capim','capim-dos-pampas: <b>Pampa</b>'],['t_bromelia_agua','bromélias em área alagada: <b>Pantanal</b>'],['t_bromelia','bromélia: <b>Mata Atlântica</b>']],'g3w')},
 {tipo:'arrasta', tit:'De qual bioma é a planta?', cols:2, regra:'Arraste cada planta para o seu bioma.',
  caixas:[{k:'amz',t:NOME.amz,cor:COR.amz},{k:'cer',t:NOME.cer,cor:COR.cer},{k:'caa',t:NOME.caa,cor:COR.caa},{k:'pam',t:NOME.pam,cor:COR.pam}],
  itens:[{c:'amz',img:'t_vitoria'},{c:'cer',img:'t_sempreviva'},{c:'caa',img:'t_louro'},{c:'pam',img:'t_capim'}]},
 {tipo:'texto', tit:'Os cartazes dos biomas',
  fala:'Os cartazes dos biomas. Amazônia: o maior bioma do Brasil, quase metade do território. Cerrado: o segundo maior, a savana brasileira, de caules retorcidos. Caatinga: só existe no Brasil, clima semiárido, muitos cactos. Pampa: só no Rio Grande do Sul, campos abertos. Pantanal: uma das maiores áreas úmidas do planeta, alagamentos. Mata Atlântica: no litoral, muito rica, mas muito reduzida.',
  html:bios({amz:'o <b>maior bioma</b> do Brasil: quase metade do território',cer:'o <b>segundo maior</b>; a savana brasileira, de caules retorcidos',caa:'<b>só existe</b> no Brasil; clima semiárido, muitos <b>cactos</b>',pam:'só no <b>Rio Grande</b> do Sul; campos abertos',pan:'uma das maiores <b>áreas úmidas</b> do planeta; alagamentos',mat:'no litoral; muito rica, mas <b>muito reduzida</b>'})},
 {tipo:'arrasta', tit:'Qual é o bioma?', cols:1, regra:'Arraste cada bioma para a sua frase.',
  caixas:[{k:'amz',frase:'O maior bioma do Brasil: ___.'},{k:'caa',frase:'Só existe no Brasil e tem muitos cactos: ___.'},{k:'pan',frase:'Plantas que gostam de água: ___.'},{k:'cer',frase:'Árvores tortas e grama: ___.'},{k:'pam',frase:'Campos com capim baixo: ___.'},{k:'mat',frase:'Fica no litoral do Brasil: ___.'}],
  itens:[{c:'amz',t:'Amazônia'},{c:'caa',t:'Caatinga'},{c:'pan',t:'Pantanal'},{c:'cer',t:'Cerrado'},{c:'pam',t:'Pampa'},{c:'mat',t:'Mata Atlântica'}]},
 NPT([
   P('Fauna são os ___ e flora são as ___.','fauna: <b>animais</b> · flora: <b>plantas</b>'),
   P('Qual é o maior bioma do Brasil?','a <b>Amazônia</b>'),
   P('Ligue: lobo-guará, mico-leão-dourado, tuiuiú → Pantanal, Cerrado, Mata Atlântica.','lobo-guará: <b>Cerrado</b> · mico-leão-dourado: <b>Mata Atlântica</b> · tuiuiú: <b>Pantanal</b>')], NP+' (1/2)'),
 {tipo:'arrasta', tit:'O que diz o cartaz?', cols:1, regra:'Arraste cada bioma para a sua frase.',
  caixas:[{k:'amz',frase:'O maior bioma do Brasil: ___.'},{k:'cer',frase:'O segundo maior bioma do Brasil: ___.'},{k:'caa',frase:'Só existe no Brasil: ___.'},{k:'pam',frase:'Fica só no Rio Grande do Sul: ___.'},{k:'mat',frase:'Muito rica, mas muito reduzida: ___.'}],
  itens:[{c:'amz',t:'Amazônia'},{c:'cer',t:'Cerrado'},{c:'caa',t:'Caatinga'},{c:'pam',t:'Pampa'},{c:'mat',t:'Mata Atlântica'}]},
 NPT([
   P('Olhe a foto. De qual bioma é esta paisagem com cactos?','<b>Caatinga</b>','t_caatinga'),
   P('Qual bioma só existe no Brasil?','a <b>Caatinga</b>'),
   P('Em quais biomas do material aparece a capivara? Pode ser mais de uma resposta.','no <b>Pampa</b> e no <b>Pantanal</b>','t_capivara')], NP+' (2/2)')
]},

/* T12. Preservação do meio ambiente (U4 S2, S3, S18–S22) */
{k:'preservacao', tema:'preservacao', unid:4, nome:'Preservação do meio ambiente', curto:'Preservação', capa:'t_araras_azuis', cor:'#16a34a', treino:[], telas:[
 {tipo:'texto', tit:'Por que as plantas importam',
  fala:'Por que as plantas importam. As plantas ajudam a manter o ar limpo. Elas protegem o solo e servem de alimento e abrigo para muitos animais. Deixam o meio ambiente mais bonito e equilibrado.',
  html:lado('t_araras_azuis',
   R('As plantas ajudam a manter o <b>ar limpo</b>.')+
   R('Elas <b>protegem o solo</b> e servem de <b>alimento e abrigo</b> para muitos animais.')+
   R('Deixam o meio ambiente mais <b>bonito</b> e <b>equilibrado</b>.'))},
 {tipo:'pares', tit:'O que as plantas fazem', regra:REV,
  fala:'O que as plantas fazem. Toque em cada frase para ver o pedaço que falta.',
  pares:[['As plantas ajudam a manter o ___.','ar limpo'],['Elas protegem o ___.','solo'],['Elas servem de ___ para muitos animais.','alimento e abrigo'],['Deixam o meio ambiente mais bonito e ___.','equilibrado']]},
 {tipo:'texto', tit:'Impactos no meio ambiente',
  fala:'Impactos no meio ambiente. O material mostra: desmatamento da mata das margens dos rios; acúmulo de lixo nas margens dos rios; enchentes e ruas alagadas depois da chuva na cidade; ar e água poluídos; sensação de calor e ar seco; áreas agrícolas secas e sem água.',
  html:caixa('O material mostra','<p class="linhas">desmatamento da mata das margens dos rios<br>acúmulo de <b>lixo</b> nas margens dos rios<br><b>enchentes</b> e ruas alagadas depois da chuva na cidade<br>ar e água <b>poluídos</b><br>sensação de calor e ar seco<br>áreas agrícolas secas e sem água</p>')},
 {tipo:'escolha', tit:'Ajuda ou é impacto?', pergunta:'É o que as plantas fazem ou é um impacto no meio ambiente?',
  fala:'Ajuda ou é impacto? Toque na resposta certa.', op:['As plantas ajudam','Impacto'], itens:[
   {m:'ar limpo', c:'As plantas ajudam', d:'As plantas ajudam a manter o ar limpo.'},
   {m:'protegem o solo', c:'As plantas ajudam', d:'As plantas protegem o solo.'},
   {m:'alimento e abrigo para muitos animais', c:'As plantas ajudam', d:'As plantas servem de alimento e abrigo para muitos animais.'},
   {m:'meio ambiente bonito e equilibrado', c:'As plantas ajudam', d:'As plantas deixam o meio ambiente mais bonito e equilibrado.'},
   {m:'desmatamento da mata das margens dos rios', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'lixo nas margens dos rios', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'enchentes e ruas alagadas', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'ar e água poluídos', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'sensação de calor e ar seco', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'áreas agrícolas secas e sem água', c:'Impacto', d:'É um dos impactos que o material mostra.'}]},
 {tipo:'texto', tit:'Florestas derrubadas',
  fala:'Florestas derrubadas. O desmatamento derruba florestas para cultivos agrícolas, pastagens para gado e o crescimento das cidades. Ele causa grandes impactos, como a perda do hábitat dos animais.',
  html:lado('t_desmatamento',
   R('O <b>desmatamento</b> derruba florestas para cultivos agrícolas, <b>pastagens para gado</b> e o crescimento das cidades.')+
   R('Ele causa grandes impactos, como a <b>perda do hábitat</b> dos animais.'))},
 {tipo:'arrasta', tit:'Os 6 impactos', cols:1, regra:'Arraste cada palavra para completar o impacto.',
  caixas:[{k:'k0',frase:'___ da mata das margens dos rios.'},{k:'k1',frase:'Acúmulo de ___ nas margens dos rios.'},{k:'k2',frase:'___ e ruas alagadas depois da chuva na cidade.'},{k:'k3',frase:'Ar e água ___.'},{k:'k4',frase:'Sensação de ___ e ar seco.'},{k:'k5',frase:'Áreas agrícolas ___ e sem água.'}],
  itens:[{c:'k0',t:'Desmatamento'},{c:'k1',t:'lixo'},{c:'k2',t:'Enchentes'},{c:'k3',t:'poluídos'},{c:'k4',t:'calor'},{c:'k5',t:'secas'}]},
 {tipo:'texto', tit:'Preservar',
  fala:'Preservar. A preservação é responsabilidade coletiva, voltada para o bem comum. Ela ajuda a manter a qualidade de vida das futuras gerações. Ter atenção com a vegetação e respeitar as áreas de preservação ajuda as plantas a continuarem vivas.',
  html:R('A preservação é <b>responsabilidade coletiva</b>, voltada para o <b>bem comum</b>.')+
   R('Ela ajuda a manter a <b>qualidade de vida</b> das futuras gerações.')+
   R('Ter atenção com a vegetação e respeitar as <b>áreas de preservação</b> ajuda as plantas a continuarem vivas.')},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_desmatamento', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O desmatamento causa a perda do ___ dos animais.'},{k:'k1',frase:'A preservação é responsabilidade ___.'},{k:'k2',frase:'Preservar ajuda a manter a qualidade de vida das ___ gerações.'},{k:'k3',frase:'Respeitar as áreas de ___ ajuda as plantas a continuarem vivas.'}],
  itens:[{c:'k0',t:'hábitat'},{c:'k1',t:'coletiva'},{c:'k2',t:'futuras'},{c:'k3',t:'preservação'}]},
 NPT([
   P('Cite uma importância das plantas.','manter o <b>ar limpo</b>, <b>proteger o solo</b>, dar <b>alimento e abrigo</b>'),
   P('O que o desmatamento causa aos animais?','a <b>perda do hábitat</b>','t_desmatamento'),
   P('Por que preservar a natureza?','para ajudar a manter a <b>qualidade de vida</b> das futuras gerações'),
   P('A preservação é responsabilidade de quem?','é responsabilidade <b>coletiva</b>, de todos')])
]}
];
/* arrastar: a fala é o título + a instrução (o que arrastar para onde), nunca a resposta */
LS.forEach(function(l){ l.telas.forEach(function(t){ if(!t.fala && t.tipo==='arrasta') t.fala=t.tit+'. '+(t.regra||'Arraste cada um para o lugar certo.'); }); });
return LS;
})();
