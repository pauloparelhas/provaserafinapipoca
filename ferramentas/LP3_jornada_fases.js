/* ============================================================
   LP3_jornada_fases.js — os 10 nós do mapa (pontos reais do Canadá,
   de OESTE para LESTE, chefão no Ártico) + o Treino, a ORDEM dos
   pedaços de cada fase (arrumada à mão, dificuldade crescente), o
   submundo de cada uma e o parser que transforma a grade de tiles
   no objeto de nível. Os temas vêm do LP3_banco.js.
   ============================================================ */
window.FASES = (function(){
'use strict';
var N=window.NIVEIS, C=N.C, T=N.T, CHAO_Y=10*T;

var LISTA=[
  {id:1, nome:'Vancouver',          lugar:'Costa do Pacífico',  cena:'mar',      temas:['conto','chapeu','parodia'], bichos:['b','g'],     sub:'caverna', mare:true, mx:95,  my:335, ideia:'Travessia de troncos na água com maré', cur:'Na costa do Pacífico vivem orcas, e os povos indígenas esculpem totens de madeira.'},
  {id:2, nome:'Lago Moraine',       lugar:'Banff, Rochosas',    cena:'montanha', temas:['joao','parodia','conto'],   bichos:['r','w'],     sub:'gelo', mx:175, my:322, ideia:'Escalada vertical com elevador e avalanche', cur:'Banff é o parque nacional mais antigo do Canadá. A água do Lago Moraine é azul-turquesa.'},
  {id:3, nome:'Pradarias',          lugar:'Saskatchewan',       cena:'pradaria', temas:['h'],                        bichos:['k','b','g'], sub:'caverna', mx:270, my:332, vento:true, ideia:'Vento que empurra, fardos rolando e molas', cur:'Saskatchewan tem campos de trigo enormes e um céu que parece não acabar.'},
  {id:4, nome:'Churchill',          lugar:'Baía de Hudson',     cena:'gelo',     temas:['jg'],                       bichos:['k','r'],     sub:'gelo',    mx:420, my:252, gelo:true, ideia:'Gelo escorregadio, patins e ursos-polares', cur:'Churchill é a capital mundial dos ursos-polares, na beira da Baía de Hudson.'},
  {id:5, nome:'Niágara',            lugar:'Cataratas',          cena:'agua',     temas:['ggu'],                      bichos:['b','g'],     sub:'caverna', mx:598, my:380, nevoa:true, ideia:'Subir a cachoeira: plataformas que caem e barris', cur:'As Cataratas do Niágara ficam na fronteira do Canadá com os Estados Unidos.'},
  {id:6, nome:'Toronto',            lugar:'CN Tower',           cena:'cidade',   temas:['dic'],                      bichos:['r','k'],     sub:'mina',    mx:680, my:378, ideia:'CN Tower vertical com elevadores e porta da biblioteca', cur:'Toronto é a maior cidade do Canadá. A CN Tower tem 553 metros de altura.'},
  {id:7, nome:'Ottawa',             lugar:'Canal Rideau',       cena:'canal',    temas:['cqu'],                      bichos:['r','k'],     sub:'gelo',    mx:740, my:352, gelo:true, ideia:'Canal congelado: patins, pingentes e espinhos de gelo', cur:'Ottawa é a capital do Canadá. No inverno, o Canal Rideau vira uma pista de patinação.'},
  {id:8, nome:'Quebec',             lugar:'Floresta de bordos', cena:'floresta', temas:['dig'],                      bichos:['b','r'],     sub:'mina',    mx:798, my:320, ideia:'Muralhas e telhados: molas, canhões de neve e a porta do Château', cur:'Em Quebec se fala francês, e o xarope de bordo vem das árvores da floresta.'},
  {id:9, nome:"Peggy's Cove",       lugar:'Nova Escócia',       cena:'farol',    temas:['plural','invento'],         bichos:['g','w','b'], sub:'caverna', mx:868, my:316, nevoa:true, mare:true, farol:true, noite:true, ideia:'Noite no farol: a luz revela plataformas; maré', cur:"O farol de Peggy's Cove, na Nova Escócia, fica sobre rochas na beira do Atlântico."},
  {id:10,nome:'Castelo de Gelo',    lugar:'Ártico · O Gigante', cena:'castelo',  temas:['conto','chapeu','joao','parodia','h','jg','ggu','dic','invento','cqu','dig','plural'], chefao:true, mx:560, my:95, cur:'No Ártico, a aurora boreal pinta o céu de verde à noite.'}
];
var TREINO={id:0, nome:'Treino', lugar:'Como jogar', cena:'floresta', temas:['conto','parodia'], bichos:['b'], treino:true, mx:70, my:470, cur:'Aqui você aprende a andar, pular e abrir as caixas.'};

/* ---------- a ordem dos pedaços, fase a fase (2 arenas no mundo + 1 no submundo) ---------- */
var SEQ={
  1:[C.start(),C.flat(3),C.box('?'),C.coins(),C.gap(2),C.enemy(),C.item('H'),C.checkpoint(),C.pipe(1),C.flat(3),C.boxHi('O'),C.water(2),C.goose(),C.checkpoint(),C.stairs('?'),C.enemy(),C.flat(2),C.pipe(2),C.end()],
  2:[C.start(),C.flat(2),C.hill('H'),C.coinsArc(),C.gap(3),C.enemy(),C.pitfall(),C.box('?'),C.checkpoint(),C.pipe(1),C.stairs('J'),C.goose(),C.gap(3),C.boxHi('?'),C.checkpoint(),C.hill2('O'),C.enemy2(),C.pipe(2),C.end()],
  3:[C.start(),C.flat(2),C.item('H'),C.coinsArc(),C.goose(),C.gap(3),C.tronco('?'),C.checkpoint(),C.pipe(1),C.spring('A'),C.enemy(),C.pitfall(),C.checkpoint(),C.enemy2(),C.moverH2(),C.skyBox('M'),C.pipe(2),C.end()],
  4:[C.start(),C.flat(2),C.box('?'),C.icicles(),C.enemy(),C.gap(3),C.spikes(),C.item('H'),C.checkpoint(),C.pipe(1),C.falling(),C.spikesPlat('N'),C.enemy2(),C.checkpoint(),C.icicles(),C.stairsDown('M'),C.moverH(),C.pipe(2),C.end()],
  5:[C.start(),C.flat(2),C.item('H'),C.water(3),C.enemy(),C.pitfallW(),C.boxHi('?'),C.checkpoint(),C.pipe(1),C.logs(),C.goose(),C.water(3),C.spikesPlat('A'),C.checkpoint(),C.moverH(),C.coinsArc(),C.stairs('M'),C.pipe(2),C.end()],
  6:[C.start(),C.flat(2),C.bricks('H'),C.enemy(),C.gap(3),C.tower('?'),C.checkpoint(),C.pipe(1),C.bricksHi('N'),C.pitfall(),C.enemy2(),C.checkpoint(),C.moverH(),C.spikesPlat('O'),C.hill2('M'),C.pipe(2),C.end()],
  7:[C.start(),C.flat(2),C.item('Z'),C.spikes(),C.box('?'),C.enemy(),C.icicles(),C.checkpoint(),C.pipe(1),C.falling(),C.item('H'),C.moverV('O'),C.enemy2(),C.checkpoint(),C.vines(),C.spikesPlat('M'),C.pipe(2),C.end()],
  8:[C.start(),C.flat(2),C.box('?'),C.vines(),C.enemy(),C.tronco('H'),C.checkpoint(),C.pipe(1),C.spring('J'),C.bricksHi('O'),C.enemy2(),C.checkpoint(),C.moverH2(),C.tower('M'),C.pipe(2),C.end()],
  9:[C.start(),C.flat(2),C.item('H'),C.water(3),C.goose(),C.logs(),C.boxHi('?'),C.checkpoint(),C.pipe(1),C.pitfallW(),C.enemy(),C.springCoin(),C.vines(),C.checkpoint(),C.logs(),C.enemy2(),C.stairs('M'),C.pipe(2),C.end()]
};
var SEQ_TREINO=[C.start(),C.flat(4),C.coins(),C.gap(2),C.item('H'),C.flat(2),C.box('?'),C.checkpoint(),C.enemy(),C.flat(2),C.end()];

/* ---------- parser: grade → objeto de nível ---------- */
var ITENS={H:'mel',A:'capa',J:'bota',N:'pinhas',Z:'patins'};
function parse(rows,opts){
  opts=opts||{};
  var h=rows.length, w=0; rows.forEach(function(s){ w=Math.max(w,s.length); });
  rows=rows.map(function(s){ return (s+new Array(w+1).join(' ')).slice(0,w); });
  var L={w:w*T, h:h*T, cols:w, grade:rows, segs:[], plats:[], tijolos:[], caixas:[], moedas:[], itens:[], canhoes:[], espinhos:[], pingentes:[], molas:[], caindo:[], agua:[], canos:[], checkpoints:[], inimigos:[], troncos:[], movers:[], mastro:null, inicioX:90, mundo:opts.mundo||'main'};
  var at=function(c,r){ return (r<0||r>=h||c<0||c>=w)?' ':rows[r][c]; };
  var visto={};
  for(var r=0;r<h;r++) for(var c=0;c<w;c++){
    var ch=at(c,r), x=c*T, y=r*T, k=c+','+r; if(visto[k]) continue;
    switch(ch){
      case '#': { var n=1; while(at(c+n,r)==='#'){ visto[(c+n)+','+r]=1; n++; } L.segs.push({x:x,y:y,w:n*T,h:T}); break; }
      case '=': { var n2=1; while(at(c+n2,r)==='='){ visto[(c+n2)+','+r]=1; n2++; } L.plats.push({x:x,y:y,w:n2*T,h:18}); break; }
      case 'f': { var n3=1; while(at(c+n3,r)==='f'){ visto[(c+n3)+','+r]=1; n3++; } L.caindo.push({x:x,y:y,x0:x,y0:y,w:n3*T,h:18,t:0,estado:'ok'}); break; }
      case 'W': { var n4=1; while(at(c+n4,r)==='W'){ visto[(c+n4)+','+r]=1; n4++; } if(at(c,r-1)!=='W') L.agua.push({x:x,y:y,w:n4*T,h:(h-r)*T}); break; }
      case 'B': L.tijolos.push({x:x,y:y,w:T,h:T,vivo:true}); break;
      case '?': case 'M': L.caixas.push({x:x+2,y:y,w:T-4,h:T,grande:ch==='M',tipo:ch==='M'?'multi':'single',mundo:L.mundo,n:ch==='M'?8:5,meta:ch==='M'?6:4}); break;
      case 'o': L.moedas.push({x:x+T/2,y:y+T/2,r:11,big:false}); break;
      case 'O': L.moedas.push({x:x+T/2,y:y+T/2,r:17,big:true}); break;
      case '^': L.espinhos.push({x:x,y:y+T-22,w:T,h:22}); break;
      case 'v': L.pingentes.push({x:x+T/2,y:y,y0:y,estado:'preso',t:0}); break;
      case 'S': L.molas.push({x:x+4,y:y+T-20,w:T-8,h:20,t:0}); break;
      case 'm': L.movers.push({x:x,y:y,x0:x,y0:y,w:3*T,h:18,dx:5*T,dy:0,per:4.2}); break;
      case 'N': L.movers.push({x:x,y:y,x0:x,y0:y,w:2*T,h:18,dx:0,dy:-8*T,per:7,elevador:true}); break;
      case 'h': { var n6=1; while(at(c+n6,r)==='h'){ visto[(c+n6)+','+r]=1; n6++; } L.plats.push({x:x,y:y,w:n6*T,h:18,oculta:true}); break; }
      case 'K': L.troncos.push({x:x+T/2,y:y+T,prox:1.2,cada:3.2,bola:true}); break;
      case 'C': L.canhoes.push({x:x+T/2,y:y+T/2,prox:2,cada:3.4}); break;
      case 'p': L.inimigos.push({tipo:'polar',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:70,voa:false,grande:true}); break;
      case 'D': L.caixas.push({x:x+4,y:y-T,w:T-8,h:2*T,porta:true,grande:false,tipo:'porta',mundo:L.mundo,n:5,meta:4}); break;
      case 'n': L.movers.push({x:x,y:y,x0:x,y0:y,w:2*T,h:18,dx:0,dy:-4*T,per:4.5}); break;
      case 'T': L.troncos.push({x:x+T/2,y:y+T,prox:1.5,cada:3.6}); break;
      case 'c': L.checkpoints.push({x:x+T/2,y:y+T,acesa:false}); break;
      case 'F': L.mastro={x:x+T/2,y:y+T}; break;
      case 'U': L.inicioX=x+T/2; L.inicioY=y+T; break;
      case 'b': case 'r': case 'k': case 'w': L.inimigos.push({tipo:{b:'castor',r:'guaxinim',k:'gamba',w:'carcaju'}[ch],x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:ch==='w'?95:(ch==='k'?45:60),voa:false}); break;
      case 'g': L.inimigos.push({tipo:'ganso',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:70,voa:true,amp:40}); break;
      default:
        if(ITENS[ch]) L.itens.push({x:x+T/2,y:y+T/2,tipo:ITENS[ch],pego:false});
        else if(ch>='1'&&ch<='4'){ var n5=1; while(at(c+n5,r)===ch){ visto[(c+n5)+','+r]=1; n5++; } var hh=1; while(r+hh<h && at(c,r+hh)===' ') hh++; L.canos.push({x:x,y:y,w:n5*T,h:hh*T,id:ch,mundo:L.mundo}); }
    }
  }
  var segs=[]; L.segs.sort(function(a,b){ return a.x-b.x||a.y-b.y; });
  L.segs.forEach(function(s){ var u=null; for(var i=0;i<segs.length;i++){ var q=segs[i]; if(q.x===s.x&&q.w===s.w&&q.y+q.h===s.y){ u=q; break; } } if(u) u.h+=s.h; else segs.push(s); });
  L.segs=segs;
  if(L.inicioY===undefined) L.inicioY=CHAO_Y;
  return L;
}

/* ---------- monta uma fase completa (mundo principal + submundo) ---------- */
function monta(f){
  var MP=window.MAPAS&&MAPAS[f.id];
  var rows= f.treino?N.bichos(N.grade(SEQ_TREINO),['b']):(MP?MP.main:N.bichos(N.grade(SEQ[f.id]), f.bichos||['b']));
  var L=parse(rows,{mundo:'main'}); L.fase=f; L.cena=f.cena; L.gelo=!!f.gelo; L.vento=!!f.vento; L.nevoa=!!f.nevoa; L.mare=!!f.mare; L.farol=!!f.farol; L.noite=!!f.noite;
  if(f.sub){ var S=parse(MP?MP.sub:N.SUBS[f.sub],{mundo:'sub'}); S.cena='sub_'+f.sub; S.fase=f; S.gelo=f.sub==='gelo'; L.sub=S; }
  L.totalArenas=L.caixas.length+(L.sub?L.sub.caixas.length:0);
  if(f.treino){
    L.passos=[
      {id:'andar', texto:'Ande para a direita', teclas:[['→','D'],['▶']], ate:function(J){ return J.urso.x>380; }},
      {id:'pular', texto:'Pule o buraco!', teclas:[['↑','W','ESPAÇO'],['PULAR']], ate:function(J){ return J.urso.x>800; }},
      {id:'mel',   texto:'Pegue o pote de mel para crescer', teclas:[['→']], ate:function(J){ return J.nivel.itens[0].pego; }},
      {id:'caixa', texto:'Pule e bata a cabeça na caixa ? — é a arena!', teclas:[['↑','W','ESPAÇO']], ate:function(J){ return J.nivel.caixas[0].aberta; }},
      {id:'bicho', texto:'Pule EM CIMA do castor', teclas:[['↑']], ate:function(J){ return J.nivel.inimigos.every(function(e){ return e.morto||e.achatado; })||J.urso.x>L.mastro.x-300; }},
      {id:'fim',   texto:'Vá até a bandeira!', teclas:[['→']], ate:function(J){ return J.urso.x>L.mastro.x-40; }}
    ];
  }
  return L;
}

/* ---------- arena do chefão ---------- */
function chefao(){
  var f=LISTA[9];
  var L={fase:f, cena:'castelo', segs:[], plats:[], caixas:[], inimigos:[], checkpoints:[], tijolos:[], moedas:[], itens:[], canhoes:[], espinhos:[], pingentes:[], molas:[], caindo:[], agua:[], canos:[], troncos:[], movers:[], w:960, h:540, inicioX:110, inicioY:CHAO_Y, chefao:true, mundo:'main', totalArenas:0};
  L.segs.push({x:0,y:CHAO_Y,w:960,h:90});
  L.plats.push({x:60,y:330,w:130,h:18});
  L.plats.push({x:300,y:280,w:140,h:18});
  L.plats.push({x:500,y:340,w:120,h:18});
  L.caixas.push({x:100,y:150,w:44,h:45,n:2,tipo:'single',flutua:true,fase0:0,mundo:'main'});
  L.caixas.push({x:230,y:262,w:44,h:45,n:2,tipo:'single',flutua:true,fase0:1.5,mundo:'main'});
  L.caixas.push({x:350,y:110,w:44,h:45,n:2,tipo:'single',flutua:true,fase0:3,mundo:'main'});
  L.caixas.push({x:560,y:180,w:44,h:45,n:2,tipo:'single',flutua:true,fase0:4.5,mundo:'main'});
  L.gigante={x:810,y:CHAO_Y,hp:8,max:8,estado:'idle',t:0,proxBola:2.5};
  return L;
}

function caminho(a,b){
  var pts=[], n=14, mx=(a.mx+b.mx)/2, my=(a.my+b.my)/2-30;
  for(var i=0;i<=n;i++){ var t=i/n, u=1-t; pts.push([u*u*a.mx+2*u*t*mx+t*t*b.mx, u*u*a.my+2*u*t*my+t*t*b.my]); }
  return pts;
}

return {LISTA:LISTA, TREINO:TREINO, SEQ:SEQ, SEQ_TREINO:SEQ_TREINO, monta:monta, parse:parse, chefao:chefao, caminho:caminho, CHAO_Y:CHAO_Y, T:T};
})();
