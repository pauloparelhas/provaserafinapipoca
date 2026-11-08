/* ============================================================
   GEO3_estudo_licoes.js — as 12 LIÇÕES da teoria de Geografia Y2,
   3º trimestre (prova ESCRITA em português, 12/11/2026).
   Unidade 3 (T1–T8): ruas, deslocamentos e transportes.
   Unidade 4 (T9–T12): meio ambiente, nossa casa maior.

   Fonte única: trabalho/3tri_geografia/_roteiro.md (cada tela aponta para
   um slide). Cores: trabalho/3tri_geografia/BIBLIA_GEO3.md.
   Tudo em português, sem bandeira e sem tradução.

   Regras validadas pelo Paulo:
   - teoria = só a matéria dos slides, objetiva; o termo-chave vem em <b>
     (até 3 palavras) e fica HACHURADO: o toque revela;
   - sem questões na teoria (questões só no simulado), sem conversa de
     personagem; o título da tela não entrega a resposta;
   - arrastar-e-soltar para ligar uma coisa a outra;
   - cada lição termina na tela "Na prova", com a resposta também oculta.
   Figuras: recortes das figuras da escola em media/geo3/t_*.jpg.

   Lição: {k, tema, unid, nome, curto, capa, cor, treino:[], telas:[...]}
   Telinhas: texto (oclusão dos <b>) · arrasta (caixas/itens; frase com ___)
   ============================================================ */
window.GEO3_LICOES = (function(){
'use strict';
function I(n){ return 'media/geo3/'+n+'.jpg'; }
function R(t){ return '<div class="regra">'+t+'</div>'; }
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
  return {q:pede+'<br>'+(resp.indexOf('<b')>=0?'<span class="resp">'+resp.replace(/<b>/g,'<b class="resp">')+'</span>':'<b class="resp">'+resp+'</b>'), f:f};
}
function naProva(itens){
  return '<p class="nptit">É assim que pode cair na prova.</p><ol class="naprova">'+itens.map(function(x,i){
    var q='<span class="npn">'+(i+1)+'.</span> '+x.q;
    return x.f?'<li class="npf"><img src="'+I(x.f)+'" alt=""><div>'+q+'</div></li>':'<li>'+q+'</li>';
  }).join('')+'</ol>';
}
var NP='Na prova';

return [

/* ===================== UNIDADE 3 ===================== */

/* T1. O espaço urbano (U3 S3, S4) */
{k:'urbano', tema:'urbano', unid:3, nome:'O espaço urbano', curto:'O espaço urbano', capa:'t_cidade', cor:'#0ea5e9', treino:[], telas:[
 {tipo:'texto', tit:'A cidade',
  html:lado('t_cidade',
   R('A <b>cidade</b> (o espaço urbano) é o lugar onde vivem <b>muitas pessoas</b>, com ruas, casas, comércios, escolas e prédios.')+
   R('As cidades são feitas de <b>caminhos</b>, <b>sons</b> e <b>movimentos</b>.')+
   R('O espaço urbano se organiza a partir de <b>ruas</b> e <b>bairros</b>.'))},
 {tipo:'texto', tit:'Palavras da cidade',
  html:'<div class="duas2 quebra">'+
   caixa('Deslocamento','<p>A pessoa se <b>movimenta</b> de um lugar para outro: a pé, de bicicleta, de carro, de ônibus.</p>')+
   caixa('Rua','<p>Via por onde as <b>pessoas</b> e os <b>veículos</b> se deslocam. Pode ter calçada, asfalto e <b>sinalização</b>.</p>')+
   caixa('Bairro','<p>Parte de uma <b>cidade</b> onde vivem várias pessoas. Tem casas, ruas e comércios.</p>')+
   caixa('Sinalização','<p><b>Placas, faixas</b> ou <b>sinais</b> que ajudam as pessoas a <b>se orientar</b> nas ruas.</p>')+'</div>'},
 {tipo:'arrasta', tit:'Qual é a palavra?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: a pessoa se movimenta de um lugar para outro.'},{k:'k1',frase:'___: via por onde as pessoas e os veículos se deslocam.'},{k:'k2',frase:'___: parte de uma cidade onde vivem várias pessoas.'},{k:'k3',frase:'___: placas, faixas e sinais que ajudam a se orientar.'},{k:'k4',frase:'A ___ é o lugar onde vivem muitas pessoas.'}],
  itens:[{c:'k0',t:'Deslocamento'},{c:'k1',t:'Rua'},{c:'k2',t:'Bairro'},{c:'k3',t:'Sinalização'},{c:'k4',t:'cidade'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('O que é deslocamento?','a pessoa se <b>movimenta</b> de um lugar para outro'),
   P('Cite dois jeitos de se deslocar.','<b>a pé</b>, de <b>bicicleta</b>, de <b>carro</b>, de <b>ônibus</b>'),
   P('Complete: a rua pode ter calçada, asfalto e ___.','sinalização'),
   P('Para que serve a sinalização?','para ajudar as pessoas a <b>se orientar</b>')])}
]},

/* T2. Segurança e sinalização para atravessar (U3 S3, S4, S30) */
{k:'sinal', tema:'sinal', unid:3, nome:'Atravessar com segurança', curto:'Atravessar a rua', capa:'t_faixa', cor:'#ef4444', treino:[], telas:[
 {tipo:'texto', tit:'Na hora de atravessar',
  html:lado('t_faixa',
   R('Atravesse a rua <b>sempre na faixa</b> de pedestre.')+
   R('Atravesse quando o sinal estiver <b>verde</b> para o pedestre.')+
   R('Mesmo com o sinal de pedestre, olhe para a <b>esquerda</b> e para a <b>direita</b>.'))},
 {tipo:'texto', tit:'Ruas seguras',
  html:lado('t_olhar',
   R('Ruas seguras são as <b>sinalizadas</b> e com <b>faixas de pedestre</b>.')+
   R('A cidade precisa de ruas, calçadas, ciclovias, pontos de ônibus e <b>sinais</b> para todos andarem com <b>segurança</b>.')+
   R('Saber se localizar ajuda a andar com segurança e a <b>ajudar outras pessoas</b>.'))},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_faixa', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Atravesse sempre na ___ de pedestre.'},{k:'k1',frase:'Atravesse quando o sinal estiver ___ para o pedestre.'},{k:'k2',frase:'Antes de atravessar, olhe para os ___ lados.'},{k:'k3',frase:'Ruas seguras são as ___ e com faixas de pedestre.'}],
  itens:[{c:'k0',t:'faixa'},{c:'k1',t:'verde'},{c:'k2',t:'dois'},{c:'k3',t:'sinalizadas'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Onde devemos atravessar a rua?','na <b>faixa de pedestre</b>','t_faixa'),
   P('O sinal de pedestre deve estar de que cor para atravessar?','<b>verde</b>'),
   P('Para que lados olhamos antes de atravessar?','para a <b>esquerda</b> e para a <b>direita</b>'),
   P('Quais ruas são seguras?','as <b>sinalizadas</b> e com <b>faixas de pedestre</b>')])}
]},

/* T3. Direções — as "palavras especiais" (U3 S3, S4, S19, S25) */
{k:'direcoes', tema:'direcoes', unid:3, nome:'As palavras especiais', curto:'Frente, atrás, lados', capa:'t_olhar', cor:'#f59e0b', treino:[], telas:[
 {tipo:'texto', tit:'Para se orientar',
  html:lado('t_olhar',
   '<div class="duas2">'+
   caixa('Frente','<p>A direção para onde <b>queremos ir</b>.</p>')+
   caixa('Atrás','<p>Por onde <b>já passamos</b>.</p>')+
   caixa('Direita','<p>O lado da nossa <b>mão direita</b>.</p>')+
   caixa('Esquerda','<p>O lado da nossa <b>mão esquerda</b>.</p>')+'</div>')},
 {tipo:'texto', tit:'Descrever o caminho',
  html:lado('t_mapa_cel',
   R('As direções ajudam a <b>descrever o caminho</b>.')+
   caixa('Um exemplo','<p>"Siga em <b>frente</b> por 200 metros, vire à <b>direita</b> na próxima esquina, ande mais um quarteirão, vire à <b>esquerda</b> e você chegará ao seu destino."</p>'))},
 {tipo:'arrasta', tit:'Para onde aponta?', cols:2, regra:'Arraste cada palavra para a sua seta.',
  caixas:[{k:'f',t:'<span class="seta-dir" aria-label="para cima">&#8679;</span>'},{k:'a',t:'<span class="seta-dir" aria-label="para baixo">&#8681;</span>'},{k:'d',t:'<span class="seta-dir" aria-label="para a direita">&#8680;</span>'},{k:'e',t:'<span class="seta-dir" aria-label="para a esquerda">&#8678;</span>'}],
  itens:[{c:'f',t:'em frente'},{c:'a',t:'atrás'},{c:'d',t:'direita'},{c:'e',t:'esquerda'}]},
 {tipo:'arrasta', tit:'Qual é a palavra?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: a direção para onde queremos ir.'},{k:'k1',frase:'___: por onde já passamos.'},{k:'k2',frase:'___: o lado da nossa mão direita.'},{k:'k3',frase:'___: o lado da nossa mão esquerda.'}],
  itens:[{c:'k0',t:'Frente'},{c:'k1',t:'Atrás'},{c:'k2',t:'Direita'},{c:'k3',t:'Esquerda'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('O que quer dizer "atrás"?','por onde <b>já passamos</b>'),
   P('O que quer dizer "frente"?','a direção para onde <b>queremos ir</b>'),
   P('Complete: a ___ é o lado da nossa mão esquerda.','esquerda'),
   P('Para que servem as direções?','para <b>descrever o caminho</b>')])}
]},

/* T4. Pontos de referência e localização (U3 S3, S14, S18, S19, S28, S29) */
{k:'referencia', tema:'referencia', unid:3, nome:'Pontos de referência', curto:'Pontos de referência', capa:'t_padaria', cor:'#a855f7', treino:[], telas:[
 {tipo:'texto', tit:'Onde estou?',
  html:lado('t_mapa_cel',
   R('<b>Localização</b> é saber onde estamos, para onde vamos e como chegaremos lá.')+
   R('Pontos de referência são lugares que <b>não mudam</b> na paisagem.')+
   R('Eles nos ajudam a <b>encontrar outros lugares</b>.'))},
 {tipo:'texto', tit:'Exemplos do material',
  html:lado('t_padaria',
   caixa('Pontos de referência','<p>uma construção colorida · um <b>prédio alto</b> · uma <b>árvore</b> · a linha de transmissão de energia ao lado da escola</p>')+esp()+
   R('A padaria na esquina é um comércio que serve de <b>ponto de referência</b>.'))},
 {tipo:'texto', tit:'O jogo de localização',
  html:caixa('No croqui do jogo','<p>Casa da família · Escola do João · Escola da Maria · Padaria do José · Trabalho da Antônia</p>')+esp()+
   R('Antônia vai ao trabalho pelo <b>caminho mais tranquilo</b>, porque a rua da escola é <b>muito movimentada</b>.')},
 {tipo:'texto', tit:'Sem saber o caminho',
  html:lado('t_mapa_cel',
   R('Sem saber o caminho, usamos pontos indicados por <b>alguém que conhece</b> o trajeto.')+
   R('Saber se localizar é <b>observar</b>, <b>pensar</b> e se locomover com <b>atenção</b>.'))},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Pontos de referência ___ na paisagem.'},{k:'k1',frase:'Eles nos ajudam a ___ outros lugares.'},{k:'k2',frase:'___ é saber onde estamos, para onde vamos e como chegaremos lá.'},{k:'k3',frase:'Sem saber o caminho, seguimos pontos indicados por alguém que já ___ o trajeto.'}],
  itens:[{c:'k0',t:'não mudam'},{c:'k1',t:'encontrar'},{c:'k2',t:'Localização'},{c:'k3',t:'conhece'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('O que é um ponto de referência?','um lugar que <b>não muda</b> na paisagem e ajuda a <b>encontrar outros lugares</b>'),
   P('Cite um ponto de referência do material.','um <b>prédio alto</b>, uma <b>árvore</b>, a <b>padaria</b>','t_padaria'),
   P('Por que Antônia não vai pela rua da escola?','porque ela é <b>muito movimentada</b>')])}
]},

/* T5. Mapas, croqui e planta baixa (U3 S5, S9, S10, S19, S20, S21, S22, S25, S29)
   O material não define croqui nem planta baixa: aqui só se RECONHECE pelo exemplo e pela função. */
{k:'mapas', tema:'mapas', unid:3, nome:'Mapa, croqui e planta baixa', curto:'Mapa, croqui e planta', capa:'t_croqui_rua', cor:'#14b8a6', treino:[], telas:[
 {tipo:'texto', tit:'Para que serve um mapa?',
  html:lado('t_app',
   R('Os mapas servem para <b>localizar</b> e <b>representar</b> os espaços.')+
   R('Eles ajudam a <b>entender os caminhos</b> e a <b>planejar os trajetos</b>.')+
   R('Podem ser <b>de papel</b> ou <b>digitais</b>: os aplicativos de navegação do celular e do computador.'))},
 {tipo:'texto', tit:'O desenho da rua',
  html:lado('t_croqui_rua',
   R('Este desenho da rua é um <b>croqui</b>.')+
   R('Nele aparecem casas, calçada, poste de iluminação, placas, árvores, veículos e pessoas.')+
   R('O croqui mostra os elementos da rua e ajuda a <b>ler um caminho</b>.'))},
 {tipo:'texto', tit:'Visto de cima',
  html:grade(2,[['t_sala3d','a sala de aula'],['t_planta_sala','a mesma sala vista <b>de cima</b>']])+
   R('Este desenho da sala, visto de cima, é uma <b>planta baixa</b>: mostra onde ficam as coisas.')},
 {tipo:'texto', tit:'A planta do apartamento',
  html:lado('t_planta_ap',
   R('Na <b>planta baixa</b> do apartamento: sacada, quarto, sala, escritório, cozinha e banheiro.')+
   R('Imagens aéreas, mapas e fotos mostram os lugares de pontos de vista <b>diferentes</b>: de cima ou de frente.'))},
 {tipo:'arrasta', tit:'Qual é o nome?', cols:3, regra:'Arraste cada nome para a sua figura.',
  caixas:[{k:'cro',t:'',img:'t_croqui_rua'},{k:'pla',t:'',img:'t_planta_ap'},{k:'map',t:'',img:'t_app'}],
  itens:[{c:'cro',t:'croqui da rua'},{c:'pla',t:'planta baixa'},{c:'map',t:'mapa digital'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Este desenho da sala, visto de cima, é um croqui ou uma planta baixa?','uma <b>planta baixa</b>','t_planta_sala'),
   P('Este desenho da rua é um ___.','croqui','t_croqui_rua'),
   P('Para que serve um mapa?','para <b>entender os caminhos</b> e <b>planejar os trajetos</b>')])}
]},

/* T6. Tipos de rua e vias de circulação (U3 S6, S7, S8) */
{k:'ruas', tema:'ruas', unid:3, nome:'Tipos de rua e vias', curto:'Tipos de rua', capa:'t_avenida', cor:'#94a3b8', treino:[], telas:[
 {tipo:'texto', tit:'As ruas não são iguais',
  html:grade(2,[['t_residencial','Rua <b>residencial</b>: muitas <b>casas</b>, mais tranquila, pouco comércio.'],['t_comercial','Rua <b>comercial</b>: <b>muitas lojas</b>, muito movimentada.']])+
   R('Algumas ruas são largas, outras estreitas.')},
 {tipo:'texto', tit:'Dentro e entre as cidades',
  html:grade(2,[['t_avenida','<b>Avenida</b> Paulista, São Paulo'],['t_rodovia','<b>Rodovia</b> dos Imigrantes']])+
   R('<b>Nas cidades</b>: ruas e avenidas. <b>Entre as cidades</b>: rodovias e estradas de terra ou asfaltadas.')},
 {tipo:'texto', tit:'Como cada uma é',
  html:'<div class="duas2 quebra">'+
   caixa('Avenida','<p>Mais <b>larga</b> que a rua, com mais de uma faixa, semáforos e placas. Liga <b>distâncias maiores</b> dentro da cidade.</p>')+
   caixa('Rodovia','<p>Usada por carros, motos, ônibus e caminhões. <b>Liga cidades</b> e passa por áreas <b>mais afastadas</b>.</p>')+
   caixa('Rua residencial','<p>Predominam as <b>moradias</b>: casas e prédios.</p>')+
   caixa('Rua comercial','<p>Lojas, mercados, padarias e <b>muitas pessoas</b> circulando.</p>')+'</div>'},
 {tipo:'arrasta', tit:'Que tipo de via é?', cols:2, regra:'Arraste cada foto para o seu tipo de via.',
  caixas:[{k:'res',t:'Rua residencial',cor:'#22c55e'},{k:'com',t:'Rua comercial',cor:'#f97316'},{k:'ave',t:'Avenida',cor:'#0ea5e9'},{k:'rod',t:'Rodovia',cor:'#a855f7'}],
  itens:[{c:'res',img:'t_residencial'},{c:'com',img:'t_comercial'},{c:'com',img:'t_rua_lojas'},{c:'ave',img:'t_avenida'},{c:'rod',img:'t_rodovia'}]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A ___ liga uma cidade a outra.'},{k:'k1',frase:'A ___ é mais larga e liga distâncias maiores dentro da cidade.'},{k:'k2',frase:'Na rua ___ há muitas lojas.'},{k:'k3',frase:'Na rua ___ predominam as moradias.'}],
  itens:[{c:'k0',t:'rodovia'},{c:'k1',t:'avenida'},{c:'k2',t:'comercial'},{c:'k3',t:'residencial'}]},
 {tipo:'texto', tit:'Cada rua tem um jeito',
  html:lado('t_zoneamento',
   R('Cada rua tem um jeito de ser usada: faz parte do <b>planejamento urbano</b>.')+
   R('Em Campinas há uma área onde prédios são permitidos e, perto do lago, só casas.')+
   R('Entender as ruas ajuda a andar com <b>mais segurança</b>, cuidar do bairro e melhorar o lugar onde vivemos.'))},
 {tipo:'texto', tit:'Do que a rua é feita?',
  html:lado('t_paraty',
   caixa('Os materiais das ruas','<p class="linhas">Paralelepípedo: cidades <b>mais antigas</b> ou históricas, como Paraty (RJ).<br>Bloquetes: <b>blocos encaixados</b>, em muitos bairros.<br>Terra batida: <b>sem calçamento</b>, mais comum em áreas rurais.<br>A rua também pode ter <b>asfalto</b>.</p>'))},
 {tipo:'arrasta', tit:'Qual é o material?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: ruas de cidades mais antigas ou históricas.'},{k:'k1',frase:'___: blocos encaixados, usados em muitos bairros.'},{k:'k2',frase:'___: rua sem calçamento, comum em áreas rurais.'}],
  itens:[{c:'k0',t:'Paralelepípedo'},{c:'k1',t:'Bloquetes'},{c:'k2',t:'Terra batida'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Olhe a foto. É uma rua residencial ou comercial?','<b>comercial</b>','t_comercial'),
   P('Qual via liga uma cidade a outra?','a <b>rodovia</b>','t_rodovia'),
   P('Ruas de cidades antigas ou históricas, como Paraty, usam ___.','paralelepípedo'),
   P('Ligue: muitas lojas, muitas casas → residencial, comercial.','muitas lojas: <b>comercial</b> · muitas casas: <b>residencial</b>')])}
]},

/* T7. O bairro e a cidade (U3 S11, S12, S13, S14) */
{k:'bairro', tema:'bairro', unid:3, nome:'O bairro e a cidade', curto:'O bairro e a cidade', capa:'t_bairro_sb', cor:'#f97316', treino:[], telas:[
 {tipo:'texto', tit:'O que é o bairro?',
  html:lado('t_bairro_sb',
   R('Uma cidade é composta por <b>vários bairros</b>.')+
   R('O bairro é um <b>conjunto de ruas</b> e quarteirões.')+
   R('Nos bairros há casas, prédios, escolas, praças, igrejas, hospitais, farmácias e pontos de ônibus.')+
   R('No bairro as pessoas frequentam <b>espaços de lazer</b>, praticam esportes e convivem.'))},
 {tipo:'texto', tit:'Tudo está conectado',
  html:lado('t_bairro_praia',
   R('Pela rua chegamos à <b>escola</b>, ao <b>trabalho</b> e aos lugares de lazer.')+
   R('Os veículos transportam <b>pessoas</b> e <b>mercadorias</b>.')+
   R('No poema "O meu bairro": supermercado, sorveteria, hospital, banco, padaria, parquinho e <b>rampas</b> para quem é especial.'))},
 {tipo:'texto', tit:'Um dentro do outro',
  html:R('Na canção "Ora bolas": a casa <b>tá na rua</b>, a rua tá dentro da <b>cidade</b>.')+
   '<div class="passos"><div class="passo"><b>casa</b></div><span class="pseta" aria-hidden="true">&rsaquo;</span><div class="passo"><b>rua</b></div><span class="pseta" aria-hidden="true">&rsaquo;</span><div class="passo"><b>bairro</b></div><span class="pseta" aria-hidden="true">&rsaquo;</span><div class="passo"><b>cidade</b></div></div>'+
   R('Do menor para o maior: a casa fica na rua, a rua fica no bairro e o bairro fica na <b>cidade</b>.')},
 {tipo:'arrasta', tit:'Do menor para o maior', cols:4, ordem:true, regra:'Arraste cada palavra para o seu lugar, do menor para o maior.',
  caixas:[{k:'1',t:'1º'},{k:'2',t:'2º'},{k:'3',t:'3º'},{k:'4',t:'4º'}],
  itens:[{c:'1',t:'casa'},{c:'2',t:'rua'},{c:'3',t:'bairro'},{c:'4',t:'cidade'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Uma cidade é formada por vários ___.','bairros'),
   P('Ordene do menor para o maior: cidade, casa, bairro, rua.','<b>casa</b> → <b>rua</b> → <b>bairro</b> → <b>cidade</b>'),
   P('Cite dois lugares que existem no bairro.','<b>escola</b>, <b>praça</b>, <b>mercado</b>, <b>farmácia</b>','t_bairro_sb'),
   P('O que os veículos transportam?','<b>pessoas</b> e <b>mercadorias</b>')])}
]},

/* T8. Meios de transporte e trabalho na cidade (U3 S4, S7, S24, S26, S27, S28) */
{k:'transporte', tema:'transporte', unid:3, nome:'Transporte e trabalho', curto:'Transporte e trabalho', capa:'t_motorista', cor:'#2563eb', treino:[], telas:[
 {tipo:'texto', tit:'Como as pessoas se deslocam',
  html:R('Meios de transporte: <b>a pé</b>, de <b>bicicleta</b>, de <b>carro</b>, de <b>ônibus</b> e de <b>moto</b>.')+
   R('Na rodovia passam carros, motos, ônibus e <b>caminhões</b>.')+
   R('Muitas pessoas usam o ônibus para <b>trabalhar</b> ou <b>estudar</b> em outro bairro.')+
   R('No jogo da rota: "Sou professora, vou de <b>ônibus</b> até a escola."')},
 {tipo:'texto', tit:'O trabalho na cidade',
  html:grade(2,[['t_professora','a <b>professora</b> na sala de aula'],['t_gari','o <b>gari</b> mantém as ruas limpas'],['t_agente','o <b>agente de trânsito</b>'],['t_motorista','o <b>motorista de ônibus</b>']],'g4w')+
   R('Também: cozinheiro, cientista, pedreiro, entregador, policiais e médica.')},
 {tipo:'arrasta', tit:'Quem é?', cols:2, regra:'Arraste cada profissão para a sua foto.',
  caixas:[{k:'pro',t:'',img:'t_professora'},{k:'gar',t:'',img:'t_gari'},{k:'age',t:'',img:'t_agente'},{k:'mot',t:'',img:'t_motorista'}],
  itens:[{c:'pro',t:'professora'},{c:'gar',t:'gari'},{c:'age',t:'agente de trânsito'},{c:'mot',t:'motorista de ônibus'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Quem mantém as ruas limpas?','o <b>gari</b>','t_gari'),
   P('Cite dois meios de transporte.','<b>ônibus</b>, <b>carro</b>, <b>bicicleta</b>, <b>moto</b>, <b>a pé</b>'),
   P('Para que muitas pessoas usam o ônibus?','para <b>trabalhar</b> ou <b>estudar</b> em outro bairro')])}
]},

/* ===================== UNIDADE 4 ===================== */

/* T9. Meio ambiente, a casa de todos (U4 S5, S6) */
{k:'ambiente', tema:'ambiente', unid:4, nome:'Meio ambiente, a casa de todos', curto:'Meio ambiente', capa:'t_ilha', cor:'#22c55e', treino:[], telas:[
 {tipo:'texto', tit:'Uma casa bem maior',
  html:lado('t_ilha',
   R('O lugar onde moramos é muito <b>maior</b> do que a nossa casa.')+
   R('Começa nas ruas e passa por parques, montanhas, mares, florestas e céus cheios de nuvens.')+
   R('Essa grande casa se chama <b>meio ambiente</b>.'))},
 {tipo:'texto', tit:'O que faz parte dela',
  html:lado('t_janela',
   R('O meio ambiente é tudo o que existe na natureza: árvores, animais, pedras, água, ar, solo, Sol, chuva…')+
   R('E <b>nós também</b> fazemos parte disso tudo!')+
   R('Ele está nas plantas do quintal, no <b>passarinho</b> que visita a janela, no cheirinho da terra molhada e no céu.'))},
 {tipo:'texto', tit:'A casa de todos',
  html:R('Meio ambiente: a casa de todos os <b>seres vivos</b>.')+
   R('Quando cuidamos dessa casa maior, cuidamos de <b>nós mesmos</b> e de todos que vivem com a gente.')+
   R('Seja um <b>guardião</b> do meio ambiente!')},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_ilha', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O lugar onde moramos é muito ___ do que a nossa casa.'},{k:'k1',frase:'Essa grande casa se chama ___.'},{k:'k2',frase:'O meio ambiente é a casa de todos os ___.'},{k:'k3',frase:'Quando cuidamos do meio ambiente, cuidamos de ___ mesmos.'}],
  itens:[{c:'k0',t:'maior'},{c:'k1',t:'meio ambiente'},{c:'k2',t:'seres vivos'},{c:'k3',t:'nós'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('O que faz parte do meio ambiente?','<b>animais</b>, <b>plantas</b>, <b>água</b>, <b>ar</b>, <b>solo</b>… e <b>nós também</b>'),
   P('Verdadeiro ou falso: as pessoas fazem parte do meio ambiente.','<b>Verdadeiro</b>'),
   P('O meio ambiente é a casa de todos os ___.','seres vivos')])}
]},

/* T10. Sons da natureza (U4 S6; U3 S3) — só o átomo cobrável */
{k:'sons', tema:'sons', unid:4, nome:'Sons da natureza', curto:'Sons da natureza', capa:'t_janela', cor:'#06b6d4', treino:[], telas:[
 {tipo:'texto', tit:'Quem mora na grande casa',
  html:R('O mundo é como uma grande casa onde moram juntos: pessoas, animais, plantas, rios, nuvens, ventos e até os <b>sons da natureza</b>.')+
   R('Os sons da natureza <b>fazem parte</b> do meio ambiente.')+
   R('A cidade também tem sons: ela é feita de caminhos, <b>sons</b> e movimentos.')},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Os sons da natureza fazem ___ do meio ambiente.'},{k:'k1',frase:'As cidades são feitas de caminhos, ___ e movimentos.'}],
  itens:[{c:'k0',t:'parte'},{c:'k1',t:'sons'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Verdadeiro ou falso: os sons da natureza fazem parte do meio ambiente.','<b>Verdadeiro</b>'),
   P('Complete: as cidades são feitas de caminhos, ___ e movimentos.','sons')])}
]},

/* T11. Fauna e flora — os biomas do Brasil (U4 S4, S8–S14, S17, S20) */
{k:'biomas', tema:'biomas', unid:4, nome:'Fauna e flora: os biomas', curto:'Os 6 biomas', capa:'t_arara', cor:'#84cc16', treino:[], telas:[
 {tipo:'texto', tit:'Animais e plantas',
  html:lado('t_mapa_biomas',
   R('<b>Fauna</b> são os animais de um lugar.')+
   R('<b>Flora</b> são as plantas, a vegetação de um lugar.')+
   R('O Brasil tem <b>6 biomas</b>.')+
   R('Os biomas e os animais são a riqueza natural do país e <b>precisam ser cuidados</b>.'))},
 {tipo:'texto', tit:'Onde fica cada bioma',
  html:lado('t_mapa_biomas',bios({amz:'<b>Norte</b> do Brasil',cer:'<b>Centro</b> do Brasil',caa:'<b>Nordeste</b> do Brasil',pam:'<b>Sul</b> do Brasil',pan:'<b>Mato Grosso</b> e Mato Grosso do Sul',mat:'<b>Litoral</b> do Brasil'}))},
 {tipo:'arrasta', tit:'Onde fica?', cols:3, fig:'t_mapa_biomas', regra:'Arraste cada lugar para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',t:'Norte'},{c:'cer',t:'Centro'},{c:'caa',t:'Nordeste'},{c:'pam',t:'Sul'},{c:'pan',t:'Mato Grosso e Mato Grosso do Sul'},{c:'mat',t:'Litoral'}]},
 {tipo:'texto', tit:'A vegetação (flora)',
  html:bios({amz:'<b>árvores altas</b> e muitas folhas',cer:'<b>árvores tortas</b> e grama',caa:'plantas com <b>espinhos</b> (cactos)',pam:'campos com <b>capim baixo</b>',pan:'plantas que <b>gostam de água</b>',mat:'floresta <b>úmida e densa</b>'})},
 {tipo:'arrasta', tit:'De qual bioma é a paisagem?', cols:3, regra:'Arraste cada foto para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',img:'t_amazonia'},{c:'cer',img:'t_cerrado'},{c:'caa',img:'t_caatinga'},{c:'pam',img:'t_pampa'},{c:'pan',img:'t_pantanal'},{c:'mat',img:'t_mata'}]},
 {tipo:'texto', tit:'Os animais (fauna)',
  html:bios({amz:'<b>onça-pintada</b>, <b>macaco</b>, <b>arara</b>',cer:'<b>lobo-guará</b>, <b>tamanduá-bandeira</b>',caa:'<b>tatu</b>, <b>veado-catingueiro</b>, <b>asa-branca</b>',pam:'<b>cavalo</b>, <b>ema</b>, <b>quero-quero</b>, capivara',pan:'<b>jacaré</b>, <b>tuiuiú</b>, <b>sucuri</b>, capivara',mat:'<b>mico-leão-dourado</b>, <b>preguiça</b>'})+
   R('No material, a capivara aparece em <b>dois biomas</b>: Pampa e Pantanal.')},
 {tipo:'arrasta', tit:'De qual bioma é o bicho?', cols:3, regra:'Arraste cada bicho para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',img:'t_arara'},{c:'cer',img:'t_loboguara'},{c:'caa',img:'t_asabranca'},{c:'pam',img:'t_queroquero'},{c:'mat',img:'t_mico'},{c:'pan',t:'tuiuiú'}]},
 {tipo:'arrasta', tit:'Mais bichos', cols:3, regra:'Arraste cada bicho para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',t:'onça-pintada'},{c:'cer',t:'tamanduá-bandeira'},{c:'caa',t:'tatu'},{c:'pam',t:'ema'},{c:'pan',t:'jacaré'},{c:'mat',t:'preguiça'}]},
 {tipo:'texto', tit:'As plantas das fotos',
  html:grade(3,[['t_vitoria','vitória-régia: <b>Amazônia</b>'],['t_sempreviva','sempre-viva: <b>Cerrado</b>'],['t_louro','louro-preto: <b>Caatinga</b>'],['t_capim','capim-dos-pampas: <b>Pampa</b>'],['t_bromelia_agua','bromélias em área alagada: <b>Pantanal</b>'],['t_bromelia','bromélia: <b>Mata Atlântica</b>']],'g3w')},
 {tipo:'arrasta', tit:'De qual bioma é a planta?', cols:2, regra:'Arraste cada planta para o seu bioma.',
  caixas:[{k:'amz',t:NOME.amz,cor:COR.amz},{k:'cer',t:NOME.cer,cor:COR.cer},{k:'caa',t:NOME.caa,cor:COR.caa},{k:'pam',t:NOME.pam,cor:COR.pam}],
  itens:[{c:'amz',img:'t_vitoria'},{c:'cer',img:'t_sempreviva'},{c:'caa',img:'t_louro'},{c:'pam',img:'t_capim'}]},
 {tipo:'texto', tit:'Os cartazes dos biomas',
  html:bios({amz:'o <b>maior bioma</b> do Brasil: quase metade do território',cer:'o segundo maior; a savana brasileira, de caules retorcidos',caa:'<b>só existe</b> no Brasil; clima semiárido, muitos <b>cactos</b>',pam:'só no Rio Grande do Sul; campos abertos',pan:'uma das maiores <b>áreas úmidas</b> do planeta; alagamentos',mat:'no litoral; muito rica, mas <b>muito reduzida</b>'})},
 {tipo:'arrasta', tit:'Qual é o bioma?', cols:1, regra:'Arraste cada bioma para a sua frase.',
  caixas:[{k:'amz',frase:'O maior bioma do Brasil: ___.'},{k:'caa',frase:'Só existe no Brasil e tem muitos cactos: ___.'},{k:'pan',frase:'Plantas que gostam de água: ___.'},{k:'cer',frase:'Árvores tortas e grama: ___.'},{k:'pam',frase:'Campos com capim baixo: ___.'},{k:'mat',frase:'Fica no litoral do Brasil: ___.'}],
  itens:[{c:'amz',t:'Amazônia'},{c:'caa',t:'Caatinga'},{c:'pan',t:'Pantanal'},{c:'cer',t:'Cerrado'},{c:'pam',t:'Pampa'},{c:'mat',t:'Mata Atlântica'}]},
 {tipo:'texto', tit:NP+' (1/2)', html:naProva([
   P('Fauna são os ___ e flora são as ___.','fauna: <b>animais</b> · flora: <b>plantas</b>'),
   P('Qual é o maior bioma do Brasil?','a <b>Amazônia</b>'),
   P('Ligue: lobo-guará, mico-leão-dourado, tuiuiú → Pantanal, Cerrado, Mata Atlântica.','lobo-guará: <b>Cerrado</b> · mico-leão-dourado: <b>Mata Atlântica</b> · tuiuiú: <b>Pantanal</b>')])},
 {tipo:'texto', tit:NP+' (2/2)', html:naProva([
   P('Olhe a foto. De qual bioma é esta paisagem com cactos?','<b>Caatinga</b>','t_caatinga'),
   P('Qual bioma só existe no Brasil?','a <b>Caatinga</b>'),
   P('Em quais biomas do material aparece a capivara? Pode ser mais de uma resposta.','no <b>Pampa</b> e no <b>Pantanal</b>','t_capivara')])}
]},

/* T12. Preservação do meio ambiente (U4 S2, S3, S18–S22) */
{k:'preservacao', tema:'preservacao', unid:4, nome:'Preservação do meio ambiente', curto:'Preservação', capa:'t_araras_azuis', cor:'#16a34a', treino:[], telas:[
 {tipo:'texto', tit:'Por que as plantas importam',
  html:lado('t_araras_azuis',
   R('As plantas ajudam a manter o <b>ar limpo</b>.')+
   R('Elas <b>protegem o solo</b> e servem de <b>alimento e abrigo</b> para muitos animais.')+
   R('Deixam o meio ambiente mais <b>bonito</b> e <b>equilibrado</b>.'))},
 {tipo:'texto', tit:'Florestas derrubadas',
  html:lado('t_desmatamento',
   R('O <b>desmatamento</b> derruba florestas para cultivos agrícolas, <b>pastagens para gado</b> e o crescimento das cidades.')+
   R('Ele causa grandes impactos, como a <b>perda do hábitat</b> dos animais.'))},
 {tipo:'texto', tit:'Impactos no meio ambiente',
  html:caixa('O material mostra','<p class="linhas">desmatamento da mata das margens dos rios<br>acúmulo de <b>lixo</b> nas margens dos rios<br><b>enchentes</b> e ruas alagadas depois da chuva na cidade<br>ar e água <b>poluídos</b><br>sensação de calor e ar seco<br>áreas agrícolas secas e sem água</p>')},
 {tipo:'arrasta', tit:'Ajuda ou é impacto?', cols:2, regra:'Arraste cada frase para o seu grupo.',
  caixas:[{k:'aj',t:'As plantas ajudam',cor:'#16a34a'},{k:'im',t:'Impactos no meio ambiente',cor:'#dc2626'}],
  itens:[{c:'aj',t:'ar limpo'},{c:'aj',t:'protegem o solo'},{c:'aj',t:'alimento e abrigo'},{c:'im',t:'lixo nas margens dos rios'},{c:'im',t:'ar e água poluídos'},{c:'im',t:'enchentes e ruas alagadas'}]},
 {tipo:'texto', tit:'Preservar',
  html:R('A preservação é <b>responsabilidade coletiva</b>, voltada para o <b>bem comum</b>.')+
   R('Ela ajuda a manter a <b>qualidade de vida</b> das futuras gerações.')+
   R('Ter atenção com a vegetação e respeitar as <b>áreas de preservação</b> ajuda as plantas a continuarem vivas.')},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_desmatamento', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O desmatamento causa a perda do ___ dos animais.'},{k:'k1',frase:'A preservação é responsabilidade ___.'},{k:'k2',frase:'Preservar ajuda a manter a qualidade de vida das ___ gerações.'},{k:'k3',frase:'Respeitar as áreas de ___ ajuda as plantas a continuarem vivas.'}],
  itens:[{c:'k0',t:'hábitat'},{c:'k1',t:'coletiva'},{c:'k2',t:'futuras'},{c:'k3',t:'preservação'}]},
 {tipo:'texto', tit:NP, html:naProva([
   P('Cite uma importância das plantas.','manter o <b>ar limpo</b>, <b>proteger o solo</b>, dar <b>alimento e abrigo</b>'),
   P('O que o desmatamento causa aos animais?','a <b>perda do hábitat</b>','t_desmatamento'),
   P('Por que preservar a natureza?','para ajudar a manter a <b>qualidade de vida</b> das futuras gerações'),
   P('A preservação é responsabilidade de quem?','é responsabilidade <b>coletiva</b>, de todos')])}
]}
];
})();
