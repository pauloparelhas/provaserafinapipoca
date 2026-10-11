/* ============================================================
   LP3_jornada_fases.js — as 9 fases + chefão + tutorial e o
   gerador de nível. Cada fase = 3 subfases com checkpoint; cada
   subfase tem 2 caixas "?" e uma barreira que só some quando as
   duas caixas estão resolvidas. Os temas vêm do LP3_banco.js —
   nenhuma pergunta nasce aqui.
   ============================================================ */
window.FASES = (function(){
'use strict';
var CHAO_Y=444, CHAO_H=96, SUB_W=1500, PAD=320;

var LISTA=[
  {id:1, nome:'Floresta de Bordos',   lugar:'Quebec',        cena:'floresta', temas:['conto','chapeu'],   barreira:'tronco', mx:830, my:300, inimigo:'castor'},
  {id:2, nome:'Montanhas Rochosas',   lugar:'Alberta',       cena:'montanha', temas:['joao','parodia'],   barreira:'tronco', mx:720, my:350, inimigo:'guaxinim'},
  {id:3, nome:'Cataratas do Niágara', lugar:'Ontário',       cena:'agua',     temas:['h'],                barreira:'tronco', mx:600, my:300, inimigo:'castor'},
  {id:4, nome:'Canal de Ottawa',      lugar:'Ontário',       cena:'gelo',     temas:['jg'],               barreira:'gelo',   mx:500, my:360, inimigo:'guaxinim'},
  {id:5, nome:'Pradarias',            lugar:'Saskatchewan',  cena:'pradaria', temas:['ggu'],              barreira:'tronco', mx:400, my:300, inimigo:'castor'},
  {id:6, nome:'Biblioteca de Toronto',lugar:'Toronto',       cena:'cidade',   temas:['dic'],              barreira:'tronco', mx:300, my:360, inimigo:'guaxinim'},
  {id:7, nome:'Oficina dos Inventores',lugar:'Montreal',     cena:'oficina',  temas:['invento','cqu'],    barreira:'gelo',   mx:200, my:320, inimigo:'castor'},
  {id:8, nome:'Costa do Pacífico',    lugar:'Vancouver',     cena:'mar',      temas:['dig'],              barreira:'tronco', mx:120, my:220, inimigo:'guaxinim'},
  {id:9, nome:'Yukon',                lugar:'Aurora boreal', cena:'aurora',   temas:['plural'],           barreira:'gelo',   mx:250, my:180, inimigo:'castor'},
  {id:10,nome:'Castelo de Gelo',      lugar:'O Gigante',     cena:'castelo',  temas:['conto','chapeu','joao','parodia','h','jg','ggu','dic','invento','cqu','dig','plural'], chefao:true, mx:520, my:150}
];

function rng(seed){ var s=seed*9301+49297; return function(){ s=(s*9301+49297)%233280; return s/233280; }; }

/* ---------- gerador de uma fase comum ---------- */
function gerar(f){
  var R=rng(f.id*17+3);
  var L={fase:f, cena:f.cena, segs:[], plats:[], caixas:[], inimigos:[], checkpoints:[], barreiras:[], subInicio:[], w:0, inicioX:120};
  var x=0;
  /* chão inicial */
  L.segs.push({x:x,y:CHAO_Y,w:PAD,h:CHAO_H}); x+=PAD;
  for(var s=0;s<3;s++){
    var x0=x; L.subInicio.push(x0-120);
    var gap1=x0+520+Math.floor(R()*120), gapW=96+Math.floor(R()*30);
    var gap2=x0+1060+Math.floor(R()*100), gap2W=90+Math.floor(R()*30);
    L.segs.push({x:x0,y:CHAO_Y,w:gap1-x0,h:CHAO_H});
    L.segs.push({x:gap1+gapW,y:CHAO_Y,w:gap2-(gap1+gapW),h:CHAO_H});
    L.segs.push({x:gap2+gap2W,y:CHAO_Y,w:x0+SUB_W-(gap2+gap2W),h:CHAO_H});
    /* plataformas: uma antes da caixa 1 (decorativa/apoio), uma escada para a caixa 2 */
    var p1y=330+Math.floor(R()*30);
    L.plats.push({x:x0+180,y:p1y,w:130,h:22});
    L.plats.push({x:gap1-40,y:360,w:gapW+80,h:20, ponte:true}); /* ponte fininha sobre o 1º buraco (opcional pular por cima) */
    var p2x=x0+780+Math.floor(R()*60), p2y=320;
    L.plats.push({x:p2x,y:p2y,w:150,h:22});
    L.plats.push({x:p2x+200,y:250,w:120,h:22});
    /* caixas: 1 no chão (altura de pulo), 1 alta sobre a plataforma */
    var c1={x:x0+360+Math.floor(R()*60),y:262,w:48,h:48,sub:s,tipo:'single',n:1};
    var c2={x:p2x+230,y:100,w:48,h:48,sub:s,tipo:'single',n:1};
    L.caixas.push(c1,c2);
    /* inimigos */
    L.inimigos.push({tipo:f.inimigo, x:x0+620+Math.floor(R()*80), y:CHAO_Y, x0:gap1+gapW+30, x1:gap2-40, dir:1, v:55+R()*30, sub:s});
    if(s>0) L.inimigos.push({tipo:f.inimigo==='castor'?'guaxinim':'castor', x:p2x+40, y:p2y, x0:p2x+10, x1:p2x+140, dir:-1, v:40, sub:s});
    /* barreira e checkpoint */
    L.barreiras.push({x:x0+SUB_W-150,y:CHAO_Y,h:130,sub:s,tipo:f.barreira,alpha:1});
    L.checkpoints.push({x:x0+SUB_W-70,y:CHAO_Y,sub:s,acesa:false});
    x=x0+SUB_W;
  }
  /* uma caixa por fase vira "dupla/tripla" — escolhida com a semente da fase */
  var idx=Math.floor(R()*6); var multi=L.caixas[idx]; multi.tipo='multi'; multi.n=2+Math.floor(R()*2);
  /* reta final com o mastro */
  L.segs.push({x:x,y:CHAO_Y,w:520,h:CHAO_H});
  L.mastro={x:x+340,y:CHAO_Y};
  L.w=x+520;
  /* funde segmentos de chão vizinhos (sem emenda visível) */
  var segs=[]; L.segs.forEach(function(sg){ var u=segs[segs.length-1]; if(u&&u.y===sg.y&&u.x+u.w===sg.x) u.w+=sg.w; else segs.push(sg); }); L.segs=segs;
  return L;
}

/* ---------- tutorial: uma fase-zero curtinha e guiada ---------- */
function tutorial(){
  var f={id:0,nome:'Como jogar',lugar:'Tutorial',cena:'floresta',temas:['conto'],barreira:'tronco',inimigo:'castor',tutorial:true};
  var L={fase:f, cena:'floresta', segs:[], plats:[], caixas:[], inimigos:[], checkpoints:[], barreiras:[], subInicio:[0], w:0, inicioX:120};
  L.segs.push({x:0,y:CHAO_Y,w:900,h:CHAO_H});
  L.segs.push({x:1000,y:CHAO_Y,w:900,h:CHAO_H});
  L.plats.push({x:1300,y:330,w:140,h:22});
  L.caixas.push({x:1120,y:262,w:48,h:48,sub:0,tipo:'single',n:1,facil:true});
  L.caixas.push({x:1400,y:140,w:48,h:48,sub:0,tipo:'single',n:1,facil:true});
  L.barreiras.push({x:1640,y:CHAO_Y,h:130,sub:0,tipo:'tronco',alpha:1});
  L.checkpoints.push({x:1700,y:CHAO_Y,sub:0,acesa:false});
  L.mastro={x:1820,y:CHAO_Y}; L.w=1900;
  /* passos guiados: cada um tem uma condição que o motor avalia */
  L.passos=[
    {id:'andar', texto:'Ande para a direita', teclas:[['→','D'],['◀ ▶']], ate:function(J){ return J.urso.x>420; }},
    {id:'pular', texto:'Pule o buraco!', teclas:[['↑','W','ESPAÇO'],['PULAR']], ate:function(J){ return J.urso.x>1040; }},
    {id:'caixa', texto:'Bata a cabeça na caixa ?', teclas:[['↑','W','ESPAÇO']], ate:function(J){ return J.nivel.caixas[0].aberta; }},
    {id:'caixa2',texto:'Suba na plataforma e pegue a outra', teclas:[['→','↑']], ate:function(J){ return J.nivel.caixas[1].aberta; }},
    {id:'fim',   texto:'A barreira sumiu! Vá até a bandeira', teclas:[['→']], ate:function(J){ return J.urso.x>1780; }}
  ];
  return L;
}

/* ---------- arena do chefão ---------- */
function chefao(){
  var f=LISTA[9];
  var L={fase:f, cena:'castelo', segs:[], plats:[], caixas:[], inimigos:[], checkpoints:[], barreiras:[], subInicio:[0], w:960, inicioX:110, chefao:true};
  L.segs.push({x:0,y:CHAO_Y,w:960,h:CHAO_H});
  L.plats.push({x:60,y:330,w:130,h:22});
  L.plats.push({x:300,y:280,w:140,h:22});
  L.plats.push({x:500,y:340,w:120,h:22});
  L.caixas.push({x:100,y:150,w:48,h:48,sub:0,tipo:'single',n:1,flutua:true,fase0:0});
  L.caixas.push({x:230,y:262,w:48,h:48,sub:0,tipo:'single',n:1,flutua:true,fase0:1.5});
  L.caixas.push({x:350,y:110,w:48,h:48,sub:0,tipo:'single',n:1,flutua:true,fase0:3});
  L.caixas.push({x:560,y:180,w:48,h:48,sub:0,tipo:'single',n:1,flutua:true,fase0:4.5});
  L.gigante={x:810,y:CHAO_Y,hp:8,max:8,estado:'idle',t:0,proxBola:2.5};
  return L;
}

/* ---------- caminho do mapa (pontos entre nós) ---------- */
function caminho(a,b){
  /* curva suave entre dois nós; devolve pontos para os tracinhos */
  var pts=[], n=14, mx=(a.mx+b.mx)/2, my=(a.my+b.my)/2-40;
  for(var i=0;i<=n;i++){ var t=i/n, u=1-t; pts.push([u*u*a.mx+2*u*t*mx+t*t*b.mx, u*u*a.my+2*u*t*my+t*t*b.my]); }
  return pts;
}

return {LISTA:LISTA, gerar:gerar, tutorial:tutorial, chefao:chefao, caminho:caminho, CHAO_Y:CHAO_Y};
})();
