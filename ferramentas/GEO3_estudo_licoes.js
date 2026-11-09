/* ============================================================
   GEO3_estudo_licoes.js — as 12 LIÇÕES da teoria de Geografia Y2,
   3º trimestre (prova ESCRITA em português, 12/11/2026).
   Unidade 3 (T1–T8): ruas, deslocamentos e transportes.
   Unidade 4 (T9–T12): meio ambiente, nossa casa maior.

   Fonte única: trabalho/3tri_geografia/_roteiro.md. Cores: BIBLIA_GEO3.md.

   v5 (08/11, crítica do Paulo + teste de sobrevivência isolada em
   trabalho/3tri_geografia/avaliacao/teoria_v5_sobrevivencia.md):
   - UM molde de tela: título curto (o termo em cor) → figura da escola GRANDE →
     ao lado (computador) ou abaixo (celular) 2–4 linhas "termo — explicação".
     Comparação = colunas iguais com o mesmo molde. Sem fichas, chips, ícones
     inventados, conectores ou caixas dentro de caixas.
   - Cada linha fica de pé sozinha (frase completa, com o contexto do slide) e
     bate com a figura da tela.
   - No máximo 2 atividades por lição (classificar com botões, ligar, ordenar);
     nada de arrastar. A última tela é "Agora você!": só as perguntas e a
     resposta oculta. Nenhuma palavra sobre prova, simulado, questão ou lição.
   Figuras: recortes das figuras da escola em media/geo3/t_*.jpg.
   v6 (08/11, Paulo: "teoria ancorada nas imagens reais da aula"): toda tela de ensino sobre um recorte da
   ficha/slide da escola (t_*, t6_*), com legenda e linhas alinhadas ao que a foto mostra; o desenho do
   "um dentro do outro" saiu (vale a ilustração da canção); entraram as fotos dos trabalhos de U3 S26–S27.
   Inventário: trabalho/3tri_geografia/avaliacao/teoria_v6_imagens.md.
   ============================================================ */
window.GEO3_LICOES = (function(){
'use strict';
function I(n){ return 'media/geo3/'+n+'.jpg'; }
function O(t){ return '<b class="ocl">'+t+'</b>'; }
/* uma linha: termo em negrito (rótulo) — explicação curta */
function LN(t,e){ return '<p class="ml"><b class="mt rot">'+t+'</b>'+(e?' — '+e:'')+'</p>'; }
/* figura da escola (ou desenho em HTML) com a legenda do que ela mostra */
function FIG(img,cap){ return '<figure class="mfig">'+(img.charAt(0)==='<'?img:'<img src="'+I(img)+'" alt="'+(cap||'').replace(/"/g,'')+'">')+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'; }
/* molde 1: figura grande + linhas (ou tabela + linhas) */
function M(img,cap,linhas,cl){ return '<div class="m1'+(cl?' '+cl:'')+'">'+FIG(img,cap)+'<div class="mlin">'+linhas.join('')+'</div></div>'; }
/* quatro fotos da escola, cada uma com o seu nome (vai dentro da figura do molde 1) */
function QUAD(fs){ return '<div class="mq">'+fs.map(function(f){ return '<figure class="mqf"><img src="'+I(f[0])+'" alt="'+f[1]+'"><figcaption>'+f[1]+'</figcaption></figure>'; }).join('')+'</div>'; }
/* molde 2: colunas iguais, cada uma figura + linhas; rodapé opcional (linhas embaixo) */
function MC(cols,rod,o){ o=o||{};
  return '<div class="mg'+(o.cl?' '+o.cl:'')+'" style="--mc:'+(o.n||cols.length)+'">'+cols.map(function(c){
    return '<div class="mcol">'+FIG(c[0],c[1])+(c[2]&&c[2].length?'<div class="mlin">'+c[2].join('')+'</div>':'')+'</div>'; }).join('')+'</div>'+
    (rod&&rod.length?'<div class="mlin mrod">'+rod.join('')+'</div>':''); }
/* tabela curta (como no Pocket Card): primeira coluna com a cor do bioma */
function TAB(cab,linhas){ return '<table class="mtab"><tr>'+cab.map(function(c){ return '<th class="rot">'+c+'</th>'; }).join('')+'</tr>'+
  linhas.map(function(l){ return '<tr style="--bc:'+l[0]+'">'+l.slice(1).map(function(c,i){ return i?'<td>'+c+'</td>':'<td><b class="rot">'+c+'</b></td>'; }).join('')+'</tr>'; }).join('')+'</table>'; }
/* cores dos biomas (mapa da escola, U4 S8) */
var COR={amz:'#9ccc3c',cer:'#f06fae',caa:'#e8d44d',pam:'#f58b4c',pan:'#d9a3d4',mat:'#7cc0ea'};
var NOME={amz:'Amazônia',cer:'Cerrado',caa:'Caatinga',pam:'Pampa',pan:'Pantanal',mat:'Mata Atlântica'};
var ORD=['amz','cer','caa','pam','pan','mat'];
function tc(h){ h=String(h).replace('#',''); var c=[0,2,4].map(function(i){ var v=parseInt(h.substr(i,2),16)/255; return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4); });
  var L=.2126*c[0]+.7152*c[1]+.0722*c[2]; return (1.05/(L+.05))>=((L+.05)/.0556)?'#fff':'#111'; }
/* um dentro do outro: casa ⊂ rua ⊂ bairro ⊂ cidade (desenho) */
function NINHO(){ var n=[['cidade','#f97316'],['bairro','#a855f7'],['rua','#0ea5e9'],['casa','#22c55e']], h='';
  for(var i=n.length-1;i>=0;i--) h='<div class="nn" style="--fc:'+n[i][1]+';--ft:'+tc(n[i][1])+'"><b class="rot nn-r">'+n[i][0]+'</b>'+h+'</div>';
  return '<div class="ninho ig-svg">'+h+'</div>'; }
/* "Agora você!": pergunta + resposta (oculta); f = figura opcional */
function P(pede,resp,f){
  return {pede:pede, q:pede+'<br>'+(resp.indexOf('<b')>=0?'<span class="resp">'+resp.replace(/<b>/g,'<b class="resp">')+'</span>':'<b class="resp">'+resp+'</b>'), f:f};
}
function DES(itens){ return {tipo:'texto', tit:'Agora você!', desafio:true,
  html:'<ol class="naprova">'+itens.map(function(x,i){ var q='<span class="npn">'+(i+1)+'.</span> '+x.q;
    return x.f?'<li class="npf"><img src="'+I(x.f)+'" alt=""><div>'+q+'</div></li>':'<li>'+q+'</li>'; }).join('')+'</ol>',
  fala:'Agora você! '+itens.map(function(x,i){ return (i+1)+'. '+x.pede; }).join(' ')}; }
function liga(tit,pares,fala){ return {tipo:'liga', tit:tit, regra:'Toque num item e depois no par dele.', fala:fala||(tit+'. Toque num item e depois no par dele.'), pares:pares}; }

var LS=[

/* ===================== UNIDADE 3 ===================== */

/* T1. O espaço urbano (U3 S3, S4) */
{k:'urbano', tema:'urbano', unid:3, nome:'O espaço urbano', curto:'O espaço urbano', capa:'t_cidade', cor:'#0ea5e9', treino:[], telas:[
 {tipo:'texto', tit:'A <em>cidade</em>',
  fala:'A cidade. Cidade é o lugar onde vivem muitas pessoas; também se chama espaço urbano. Na cidade há ruas, casas, comércios, escolas e prédios. A cidade é feita de caminhos, sons e movimentos. Ruas e bairros organizam o espaço urbano.',
  html:M('t_cidade','Muitas pessoas atravessando a rua numa cidade',[
   LN('Cidade','lugar onde vivem muitas pessoas. Também se chama espaço urbano.'),
   LN('Na cidade há','ruas, casas, comércios, escolas e prédios.'),
   LN('Caminhos, sons e movimentos','a cidade é feita deles.'),
   LN('Ruas e bairros','organizam o espaço urbano.')])},
 {tipo:'texto', tit:'<em>Deslocamento</em> e <em>rua</em>',
  fala:'Deslocamento e rua. Deslocamento: mover-se de um lugar para outro, a pé, de bicicleta, de carro ou de ônibus. Rua: via por onde pessoas e veículos se deslocam. Pode ter calçada, asfalto e sinalização.',
  html:MC([['t_rua_lojas','A pé e de bicicleta',[LN('Deslocamento','mover-se de um lugar para outro: a pé, de bicicleta, de carro ou de ônibus.')]],
           ['t_padaria','Rua com calçada e asfalto',[LN('Rua','via por onde pessoas e veículos se deslocam. Pode ter calçada, asfalto e sinalização.')]]])},
 {tipo:'texto', tit:'<em>Sinalização</em>',
  fala:'Sinalização. Placas, faixas ou sinais que ajudam as pessoas a se orientar nas ruas.',
  html:M('t_faixa_v5','Faixa, semáforos e placa de pare',[LN('Sinalização','placas, faixas ou sinais que ajudam as pessoas a se orientar nas ruas.')],'larga')}
]},

/* T2. Segurança e sinalização para atravessar (U3 S3, S4, S30) */
{k:'sinal', tema:'sinal', unid:3, nome:'Atravessar com segurança', curto:'Atravessar a rua', capa:'t_faixa', cor:'#ef4444', treino:[], telas:[
 {tipo:'texto', tit:'Atravessar na <em>faixa</em>',
  fala:'Atravessar na faixa. As pessoas precisam atravessar a rua sempre na faixa de pedestre, quando o sinal estiver verde para o pedestre. Ruas seguras são as sinalizadas e com faixa de pedestre.',
  html:M('t_faixa_v5','Crianças atravessando na faixa de pedestre',[
   LN('Faixa de pedestre','as pessoas precisam atravessar a rua sempre na faixa.'),
   LN('Sinal verde','atravessamos quando o sinal estiver verde para o pedestre.'),
   LN('Ruas seguras','são as sinalizadas e com faixa de pedestre.')],'larga')},
 {tipo:'texto', tit:'Olhar para os <em>dois lados</em>',
  fala:'Olhar para os dois lados. Ao atravessar a rua, mesmo com sinal de pedestre, devemos sempre olhar para a esquerda e para a direita. Para todos se deslocarem com segurança, a cidade precisa de ruas, calçadas, ciclovias, pontos de ônibus e sinais.',
  html:M('t_olhar','Antes de atravessar: olhar para a esquerda e para a direita',[
   LN('Esquerda e direita','mesmo com sinal de pedestre, devemos sempre olhar para os dois lados.'),
   LN('Segurança','para todos se deslocarem com segurança, a cidade precisa de ruas, calçadas, ciclovias, pontos de ônibus e sinais.')])}
]},

/* T3. Direções — as "palavras especiais" (U3 S3, S4, S19, S25) */
{k:'direcoes', tema:'direcoes', unid:3, nome:'As palavras especiais', curto:'Frente, atrás, lados', capa:'t_olhar', cor:'#f59e0b', treino:[], telas:[
 {tipo:'texto', tit:'As <em>direções</em>',
  fala:'As direções. Frente: a direção para onde queremos ir. Atrás: por onde já passamos. Direita: o lado da nossa mão direita. Esquerda: o lado da nossa mão esquerda.',
  html:M('t_olhar','De costas, o menino olha para a esquerda e para a direita',[
   LN('Frente','a direção para onde queremos ir.'),
   LN('Atrás','por onde já passamos.'),
   LN('Direita','o lado da nossa mão direita.'),
   LN('Esquerda','o lado da nossa mão esquerda.')])},
 {tipo:'texto', tit:'Descrever o <em>caminho</em>',
  fala:'Descrever o caminho. Frente, atrás, direita e esquerda ajudam a descrever o caminho. Um exemplo: siga em frente por 200 metros e vire à direita na próxima esquina.',
  html:M('t_mapa_cel','Um caminho no mapa',[
   LN('Direções','frente, atrás, direita e esquerda ajudam a descrever o caminho.'),
   LN('Um exemplo','“Siga em frente por 200 metros e vire à direita na próxima esquina.”')])}
]},

/* T4. Pontos de referência e localização (U3 S3, S4, S14, S18, S19, S28, S29) */
{k:'referencia', tema:'referencia', unid:3, nome:'Pontos de referência', curto:'Pontos de referência', capa:'t_padaria', cor:'#a855f7', treino:[], telas:[
 {tipo:'texto', tit:'Ponto de <em>referência</em>',
  fala:'Ponto de referência. Ponto de referência é um lugar que não muda na paisagem e nos ajuda a encontrar outros lugares. A padaria na esquina é um comércio e serve de ponto de referência. Outros exemplos: construção colorida, prédio alto, árvore, linha de transmissão de energia.',
  html:M('t_padaria','Uma padaria na esquina da rua',[
   LN('Ponto de referência','lugar que não muda na paisagem e nos ajuda a encontrar outros lugares.'),
   LN('Padaria na esquina','é um comércio e serve de ponto de referência.'),
   LN('Outros exemplos','construção colorida, prédio alto, árvore, linha de transmissão de energia.')])},
 {tipo:'texto', tit:'Saber se <em>localizar</em>',
  fala:'Saber se localizar. Localização é saber onde estamos, para onde vamos e como chegaremos lá. Sem saber o caminho, usamos pontos de referência indicados por alguém que já conhece o trajeto. Saber se localizar é observar, pensar e se locomover com atenção; ajuda a andar com segurança e a ajudar outras pessoas.',
  html:M('t_mapa_cel','Localização na cidade',[
   LN('Localização','saber onde estamos, para onde vamos e como chegaremos lá.'),
   LN('Sem saber o caminho','usamos pontos de referência indicados por alguém que já conhece o trajeto.'),
   LN('Saber se localizar','é observar, pensar e se locomover com atenção. Ajuda a andar com segurança e a ajudar outros.')])}
]},

/* T5. Mapas, croqui e planta baixa (U3 S2, S5, S9, S10, S19, S22, S25, S29)
   A escola não define croqui nem planta baixa: aqui só se RECONHECE pelo exemplo e pela função. */
{k:'mapas', tema:'mapas', unid:3, nome:'Mapa, croqui e planta baixa', curto:'Mapa, croqui e planta', capa:'t_croqui_rua', cor:'#14b8a6', treino:[], telas:[
 {tipo:'texto', tit:'O <em>mapa</em>',
  fala:'O mapa. O mapa localiza e representa os espaços. Ajuda a entender os caminhos e a planejar os trajetos. Pode ser de papel ou digital: o aplicativo de navegação do celular é um mapa digital.',
  html:M('t_app','Aplicativo de navegação no celular, dentro do carro',[
   LN('Mapa','localiza e representa os espaços.'),
   LN('Para que serve','ajuda a entender os caminhos e a planejar os trajetos.'),
   LN('De papel ou digital','o aplicativo de navegação do celular é um mapa digital.')],'larga')},
 {tipo:'texto', tit:'O <em>croqui</em>',
  fala:'O croqui. Este desenho simples da rua é um croqui. Num croqui da rua desenhamos rua, calçadas, casas, comércios, árvores, veículos, pessoas, postes de iluminação e placas. Ele mostra os elementos da rua e ajuda a ler um caminho.',
  html:M('t_croqui_rua','',[
   LN('Croqui','este desenho simples da rua é um croqui.'),
   LN('Num croqui da rua','desenhamos rua, calçadas, casas, comércios, árvores, veículos, pessoas, postes de iluminação e placas.'),
   LN('Para que serve','mostra os elementos da rua e ajuda a ler um caminho.')])},
 {tipo:'texto', tit:'A <em>planta baixa</em>',
  fala:'A planta baixa. A sala de aula, de frente; a mesma sala, vista de cima; e a planta do apartamento, com sacada, quarto, sala, escritório, cozinha e banheiro. A planta baixa é o desenho de um lugar visto de cima, como a sala ou o apartamento, e mostra onde ficam as coisas. Podemos ver um lugar de frente ou de cima; imagens aéreas e mapas mostram os lugares vistos de cima.',
  html:MC([['t_sala3d','A sala, de frente',null],['t_planta_sala','A sala, vista de cima',null],['t_planta_ap','Planta do apartamento',null]],
   [LN('Planta baixa','desenho de um lugar visto de cima, como esta sala. Mostra onde ficam as coisas.'),
    LN('Pontos de vista','vemos um lugar de frente ou de cima; mapas e imagens aéreas mostram de cima.')],{cl:'cont'})}
]},

/* T6. Tipos de rua e vias de circulação (U3 S7, S8) */
{k:'ruas', tema:'ruas', unid:3, nome:'Tipos de rua e vias', curto:'Tipos de rua', capa:'t_avenida', cor:'#6366f1', treino:[], telas:[
 {tipo:'texto', tit:'As ruas <em>não são iguais</em>',
  fala:'As ruas não são iguais. Rua residencial: predominam as moradias; geralmente é mais tranquila, com pouco comércio. Rua comercial: muitas lojas, mercados e padarias, e muitas pessoas circulando; é muito movimentada.',
  html:MC([['t_residencial','Rua residencial, vista de cima',[LN('Rua residencial','predominam as moradias. Geralmente é mais tranquila, com pouco comércio.')]],
           ['t_comercial','Rua comercial',[LN('Rua comercial','muitas lojas, mercados e padarias, e muitas pessoas circulando. É muito movimentada.')]]])},
 {tipo:'texto', tit:'<em>Avenida</em> e <em>rodovia</em>',
  fala:'Avenida e rodovia. A avenida é mais larga que a rua, com várias faixas para carros, e liga distâncias maiores dentro da cidade, como a Avenida Paulista, em São Paulo. A rodovia liga cidades e passa por áreas mais afastadas, como a Rodovia dos Imigrantes. Nas cidades há ruas e avenidas; entre as cidades, rodovias e estradas de terra ou asfaltadas.',
  html:MC([['t_avenida','Avenida Paulista, em São Paulo',[LN('Avenida','mais larga que a rua, com várias faixas para carros. Liga distâncias maiores dentro da cidade.'),LN('Nas cidades','ruas e avenidas.')]],
           ['t_rodovia','Rodovia dos Imigrantes',[LN('Rodovia','liga cidades e passa por áreas mais afastadas.'),LN('Entre as cidades','rodovias e estradas de terra ou asfaltadas.')]]])},
 {tipo:'texto', tit:'O <em>planejamento urbano</em>',
  fala:'O planejamento urbano. É o plano que organiza a cidade; por isso cada rua tem um jeito de ser usada. Entender as ruas ajuda a andar com segurança, cuidar do bairro e melhorar o lugar onde vivemos.',
  html:M('t_zoneamento','Campinas (SP), Lagoa Taquaral',[
   LN('Planejamento urbano','o plano que organiza a cidade: cada rua tem um jeito de ser usada.'),
   LN('Entender as ruas','ajuda a andar com segurança, cuidar do bairro e melhorar o lugar onde vivemos.')])},
 {tipo:'texto', tit:'Do que a rua é <em>feita</em>',
  fala:'Do que a rua é feita. Paralelepípedo, como nesta foto de Paraty: usado em ruas de cidades mais antigas ou históricas. Terra batida: rua sem calçamento, mais comum em áreas rurais.',
  html:M('t_paraty','Paraty (RJ): calçamento de blocos de rocha',[
   LN('Paralelepípedo','como nesta foto: usado em ruas de cidades mais antigas ou históricas.'),
   LN('Terra batida','rua sem calçamento, mais comum em áreas rurais.')])}
]},

/* T7. O bairro e a cidade (U3 S11, S12, S13, S14) */
{k:'bairro', tema:'bairro', unid:3, nome:'O bairro e a cidade', curto:'O bairro e a cidade', capa:'t_bairro_sb', cor:'#f97316', treino:[], telas:[
 {tipo:'texto', tit:'O <em>bairro</em>',
  fala:'O bairro. Bairro Cabo Branco, em João Pessoa. Uma cidade é composta por vários bairros. O bairro é um conjunto de ruas e quarteirões.',
  html:M('t_bairro_praia','Bairro Cabo Branco, em João Pessoa (PB)',[
   LN('Cidade','é composta por vários bairros.'),
   LN('Bairro','conjunto de ruas e quarteirões.')])},
 {tipo:'texto', tit:'A vida no <em>bairro</em>',
  fala:'A vida no bairro. Bairro em Santa Bárbara, na Bahia. No bairro há casas, prédios, escolas, praças, igrejas, hospitais, farmácias e pontos de ônibus. No bairro, as pessoas frequentam espaços de lazer, praticam esportes e convivem com amigos e familiares.',
  html:M('t_bairro_sb','Bairro em Santa Bárbara (BA), visto de cima',[
   LN('No bairro há','casas, prédios, escolas, praças, igrejas, hospitais, farmácias e pontos de ônibus.'),
   LN('As pessoas','no bairro, frequentam espaços de lazer, praticam esportes e convivem com amigos e familiares.')])},
 {tipo:'texto', tit:'Tudo está <em>conectado</em>',
  fala:'Tudo está conectado. Pessoas circulando por uma rua de lojas. Pela rua chegamos à escola, ao trabalho e aos lugares de lazer. Os veículos transportam pessoas e mercadorias. No poema O meu bairro há supermercado, sorveteria, hospital, banco, padaria, parquinho e rampas para quem é especial.',
  html:M('t6_25marco','Pessoas circulando por rua de lojas: a Rua 25 de Março',[
   LN('Pela rua','chegamos à escola, ao trabalho e aos lugares de lazer.'),
   LN('Os veículos','transportam pessoas e mercadorias.'),
   LN('No poema “O meu bairro”','há supermercado, sorveteria, hospital, banco, padaria, parquinho e rampas para quem é especial.')])},
 {tipo:'texto', tit:'Um <em>dentro</em> do outro',
  fala:'Um dentro do outro. Na canção Ora bolas, a casa tá na rua, a rua tá dentro da cidade. Do menor para o maior: casa, rua, bairro, cidade. A canção continua: a cidade tá do lado da floresta, a floresta é no Brasil, o Brasil tá na América do Sul.',
  html:M('t6_orabolas_capa','Canção “Ora bolas”, da Palavra Cantada',[
   LN('Canção “Ora bolas”','a casa tá na rua, a rua tá dentro da cidade.'),
   LN('Do menor para o maior','casa, rua, bairro, cidade.'),
   LN('A canção continua','a cidade tá do lado da floresta, a floresta é no Brasil, o Brasil tá na América do Sul.')])}
]},

/* T8. Meios de transporte e trabalho na cidade (U3 S4, S7, S24, S26, S27, S28) */
{k:'transporte', tema:'transporte', unid:3, nome:'Transporte e trabalho', curto:'Transporte e trabalho', capa:'t_motorista', cor:'#2563eb', treino:[], telas:[
 {tipo:'texto', tit:'Meios de <em>transporte</em>',
  fala:'Meios de transporte. Muitas pessoas usam o ônibus para trabalhar ou estudar em outro bairro. Na rodovia passam carros, motos, ônibus e caminhões.',
  html:M('t_motorista','Motorista de ônibus',[
   LN('Ônibus','muitas pessoas usam para trabalhar ou estudar em outro bairro.'),
   LN('Na rodovia','passam carros, motos, ônibus e caminhões.')])},
 {tipo:'texto', tit:'O <em>trabalho</em> na cidade',
  fala:'O trabalho na cidade. A professora, em sala de aula. O gari mantém as ruas limpas. O agente de trânsito e o motorista de ônibus também trabalham na cidade.',
  html:M(QUAD([['t_professora','professora'],['t_gari','gari'],['t_agente','agente de trânsito'],['t_motorista','motorista de ônibus']]),'',[
   LN('Professora','trabalha em sala de aula.'),
   LN('Gari','mantém as ruas limpas.'),
   LN('Agente de trânsito e motorista de ônibus','também trabalham na cidade.')],'larga')},
 {tipo:'texto', tit:'Mais <em>trabalhos</em> na cidade',
  fala:'Mais trabalhos na cidade. Cozinheiro, cientista, pedreiro e médica trabalham na cidade. O entregador e os policiais também.',
  html:M(QUAD([['t6_cozinheiro','cozinheiro'],['t6_cientista','cientista'],['t6_pedreiro','pedreiro'],['t6_medica','médica']]),'',[
   LN('Cozinheiro, cientista, pedreiro e médica','trabalham na cidade.'),
   LN('Entregador e policiais','também trabalham na cidade.')],'larga')}
]},

/* ===================== UNIDADE 4 ===================== */

/* T9. Meio ambiente, a casa de todos (U4 S5, S6) */
{k:'ambiente', tema:'ambiente', unid:4, nome:'Meio ambiente, a casa de todos', curto:'Meio ambiente', capa:'t_ilha', cor:'#22c55e', treino:[], telas:[
 {tipo:'texto', tit:'Uma casa <em>bem maior</em>',
  fala:'Uma casa bem maior. O lugar onde moramos é muito maior do que a nossa casa: começa nas ruas e passa por parques, montanhas, mares, florestas e céus. Essa grande casa se chama meio ambiente, a casa de todos os seres vivos. Cuidando do meio ambiente, cuidamos de nós mesmos e de todos.',
  html:M('t6_globo','Meio ambiente, a casa de todos os seres vivos',[
   LN('Casa maior','começa nas ruas e vai até parques, mares e florestas.'),
   LN('Meio ambiente','é o nome dessa grande casa, a casa de todos os seres vivos.'),
   LN('Cuidar','cuidando do meio ambiente, cuidamos de nós e de todos.')],'larga')},
 {tipo:'texto', tit:'O que faz <em>parte</em> dele',
  fala:'O que faz parte dele. Fazem parte do meio ambiente: árvores, animais, pedras, água, ar, solo, Sol e chuva. E nós também fazemos parte disso tudo! No dia a dia, ele está nas plantas do quintal, no passarinho que visita a janela, no cheirinho da terra molhada e no céu.',
  html:M('t_janela','Natureza vista da janela',[
   LN('Fazem parte do meio ambiente','árvores, animais, pedras, água, ar, solo, Sol e chuva.'),
   LN('Nós também','fazemos parte do meio ambiente!'),
   LN('No dia a dia','o meio ambiente está nas plantas do quintal, no passarinho que visita a janela, no cheirinho da terra molhada e no céu.')],'larga')}
]},

/* T10. Sons da natureza (U4 S6; U3 S3) — só o átomo cobrável */
{k:'sons', tema:'sons', unid:4, nome:'Sons da natureza', curto:'Sons da natureza', capa:'t_janela', cor:'#06b6d4', treino:[], telas:[
 {tipo:'texto', tit:'Os <em>sons</em> da natureza',
  fala:'Os sons da natureza. No meio ambiente moram juntos pessoas, animais, plantas, rios, nuvens, ventos e até os sons da natureza. Os sons da natureza fazem parte do meio ambiente.',
  html:M('t_ilha','Mar, montanhas, florestas e céu com nuvens',[
   LN('Moram juntos','pessoas, animais, plantas, rios, nuvens, ventos e até os sons da natureza.'),
   LN('Sons da natureza','fazem parte do meio ambiente.')],'larga')}
]},

/* T11. Fauna e flora — os biomas do Brasil (U4 S4, S8–S14, S17, S20) */
{k:'biomas', tema:'biomas', unid:4, nome:'Fauna e flora: os biomas', curto:'Os 6 biomas', capa:'t_arara', cor:'#84cc16', treino:[], telas:[
 {tipo:'texto', tit:'<em>Fauna</em> e <em>flora</em>',
  fala:'Fauna e flora. Fauna: os animais de um lugar. Flora: as plantas, a vegetação de um lugar. Os biomas e os animais são a riqueza natural do país e precisam ser cuidados.',
  html:MC([['t_arara','Araras-vermelhas',[LN('Fauna','os animais de um lugar.')]],['t_vitoria','Vitória-régia',[LN('Flora','as plantas, a vegetação de um lugar.')]]],
   [LN('Riqueza natural','os biomas e os animais do Brasil precisam ser cuidados.')])},
 {tipo:'texto', tit:'Os 6 <em>biomas</em> do Brasil',
  fala:'Os 6 biomas do Brasil. Amazônia: Norte, árvores altas e muitas folhas. Cerrado: Centro, árvores tortas e grama. Caatinga: Nordeste, plantas com espinhos, os cactos. Pampa: Sul, campos com capim baixo. Pantanal: Mato Grosso e Mato Grosso do Sul, plantas que gostam de água. Mata Atlântica: Litoral, floresta úmida e densa.',
  html:M('t_mapa_biomas','',[
   TAB(['Bioma','Onde fica','Vegetação'],[[COR.amz,NOME.amz,'Norte','árvores altas e muitas folhas'],[COR.cer,NOME.cer,'Centro','árvores tortas e grama'],[COR.caa,NOME.caa,'Nordeste','plantas com espinhos (cactos)'],
     [COR.pam,NOME.pam,'Sul','campos com capim baixo'],[COR.pan,NOME.pan,'Mato Grosso e Mato Grosso do Sul','plantas que gostam de água'],[COR.mat,NOME.mat,'Litoral','floresta úmida e densa']])])},
 {tipo:'texto', tit:'Os <em>animais</em> de cada bioma',
  fala:'Os animais de cada bioma. Amazônia: onça-pintada, macaco, arara. Cerrado: lobo-guará, tamanduá-bandeira. Caatinga: tatu, veado-catingueiro, asa-branca. Pampa: cavalo, ema, quero-quero, capivara. Pantanal: jacaré, tuiuiú, sucuri, capivara. Mata Atlântica: mico-leão-dourado, preguiça. A capivara aparece no Pampa e no Pantanal.',
  html:M('t_mapa_biomas','',[
   TAB(['Bioma','Animais (fauna)'],[[COR.amz,NOME.amz,'onça-pintada, macaco, arara'],[COR.cer,NOME.cer,'lobo-guará, tamanduá-bandeira'],[COR.caa,NOME.caa,'tatu, veado-catingueiro, asa-branca'],
     [COR.pam,NOME.pam,'cavalo, ema, quero-quero, capivara'],[COR.pan,NOME.pan,'jacaré, tuiuiú, sucuri, capivara'],[COR.mat,NOME.mat,'mico-leão-dourado, preguiça']]),
   LN('Capivara','aparece no Pampa e no Pantanal.')])},
 {tipo:'texto', tit:'As <em>plantas</em> das fotos',
  fala:'As plantas das fotos. Vitória-régia: Amazônia. Sempre-viva: Cerrado. Louro-preto: Caatinga. Capim-dos-pampas: Pampa. Bromélias em área alagada: Pantanal. Bromélia: Mata Atlântica.',
  html:MC([['t_vitoria','',[LN(NOME.amz,'vitória-régia')]],['t_sempreviva','',[LN(NOME.cer,'sempre-viva')]],['t_louro','',[LN(NOME.caa,'louro-preto')]],
           ['t_capim','',[LN(NOME.pam,'capim-dos-pampas')]],['t_bromelia_agua','',[LN(NOME.pan,'bromélias em área alagada')]],['t_bromelia','',[LN(NOME.mat,'bromélia')]]],
   null,{n:3})},
 {tipo:'texto', tit:'Cada <em>bioma</em> (1)',
  fala:'Cada bioma. Amazônia: o maior bioma do Brasil, quase metade do território. Cerrado: o segundo maior, a savana brasileira. Caatinga: só existe no Brasil; clima semiárido.',
  html:MC([['t_amazonia','Amazônia',[LN('Amazônia','o maior bioma do Brasil: quase metade do território.')]],
           ['t_cerrado','Cerrado',[LN('Cerrado','o segundo maior bioma do Brasil. É a savana brasileira.')]],
           ['t_caatinga','Caatinga',[LN('Caatinga','só existe no Brasil. Clima semiárido.')]]])},
 {tipo:'texto', tit:'Cada <em>bioma</em> (2)',
  fala:'Cada bioma. Pampa: no Brasil, só no Rio Grande do Sul. Pantanal: uma das maiores áreas úmidas do planeta, com alagamentos. Mata Atlântica: muito rica, mas muito reduzida.',
  html:MC([['t_pampa','Pampa, com gado no campo',[LN('Pampa','no Brasil, só existe no Rio Grande do Sul.')]],
           ['t_pantanal','Pantanal',[LN('Pantanal','uma das maiores áreas úmidas do planeta, com alagamentos.')]],
           ['t_mata','Mata Atlântica',[LN('Mata Atlântica','é muito rica, mas muito reduzida.')]]])}
]},

/* T12. Preservação do meio ambiente (U4 S2, S3, S18–S22) */
{k:'preservacao', tema:'preservacao', unid:4, nome:'Preservação do meio ambiente', curto:'Preservação', capa:'t_araras_azuis', cor:'#16a34a', treino:[], telas:[
 {tipo:'texto', tit:'Por que as <em>plantas</em> importam',
  fala:'Por que as plantas importam. As plantas ajudam a manter o ar limpo, protegem o solo, servem de alimento e abrigo para muitos animais e deixam o meio ambiente mais bonito e equilibrado.',
  html:M('t_araras_azuis','Araras-azuis no alto de árvore da floresta Amazônica preservada',[
   LN('Ar limpo','as plantas ajudam a manter o ar limpo.'),
   LN('Solo','as plantas protegem o solo.'),
   LN('Alimento e abrigo','as plantas servem de alimento e abrigo para muitos animais.'),
   LN('Bonito e equilibrado','as plantas deixam o meio ambiente mais bonito e equilibrado.')])},
 {tipo:'texto', tit:'O <em>desmatamento</em>',
  fala:'O desmatamento. Desmatamento é derrubar florestas para cultivos agrícolas, pastagens para gado e o crescimento das cidades. Ele causa a perda do hábitat dos animais. Outros impactos no meio ambiente: lixo nas margens dos rios, enchentes, ar e água poluídos, calor e ar seco.',
  html:M('t_desmatamento','Desmatamento da floresta',[
   LN('Desmatamento','derrubar florestas para cultivos agrícolas, pastagens para gado e o crescimento das cidades.'),
   LN('Perda do hábitat','o desmatamento causa a perda do hábitat dos animais.'),
   LN('Outros impactos no meio ambiente','lixo nas margens dos rios, enchentes, ar e água poluídos, calor e ar seco.')])},
 {tipo:'texto', tit:'<em>Preservar</em>',
  fala:'Preservar. Preservar é responsabilidade coletiva, para o bem comum. Preservar a natureza garante a qualidade de vida das futuras gerações. Ter atenção com a vegetação e respeitar as áreas de preservação ajudam as plantas a continuarem vivas.',
  html:M('t_amazonia','Floresta vista de cima',[
   LN('Responsabilidade coletiva','preservar é de todos, para o bem comum.'),
   LN('Futuras gerações','preservar a natureza garante a qualidade de vida das futuras gerações.'),
   LN('Áreas de preservação','ter atenção com a vegetação e respeitar as áreas de preservação ajudam as plantas a continuarem vivas.')],'larga')}
]}
];
return LS;
})();
