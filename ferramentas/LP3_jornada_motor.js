/* ============================================================
   LP3_jornada_motor.js — o jogo em si (parte 1): estado, progresso
   em localStorage (lp3_jornada_v2), física do urso (tamanhos,
   poderes, gelo, vento, squash & stretch), perigos e itens.
   Parte 2 (LP3_jornada_motor2.js): bichos, canos, mastro, chefão,
   mapa, globo, laço principal. Desenho em LP3_jornada_cena.js,
   arena em LP3_jornada_arena.js, DOM em LP3_jornada_ui.js.
   ============================================================ */
window.JOGO = (function(){
'use strict';
var W=960, H=540, A=window.ARTE, F=window.FASES, T=F.T;
var GRAV=1900, VPULO=-760, VAND=270, VMOLA=-1150, URSO_W=36, URSO_H=88;
var TAM=[.72,1,1.25];
var canvas, ctx, escala=1, offX=0, offY=0, dpr=1;
var J={
  estado:'boot', pausado:false, t:0, tFase:0,
  in:{left:false,right:false,jump:false,down:false,act:false}, jumpSolto:true, downSolto:true, actSolto:true,
  prog:null, nivel:null, mundo:null, urso:null, cam:0, camY:0, part:[], clima:[], shake:0, flash:0,
  faseAtual:null, sel:0, mapaAnim:null, trans:null, globo:null,
  caixaAtual:null, pontos:0, moedas:0, stats:null, tut:null, arremesso:null, fimFase:null, chefe:null, dica:null, setaT:0, cur:null, bolas:[], folhas:[], pinhas:[], troncosVivos:[]
};
var CHAVE='lp3_jornada_v2';

/* ---------- progresso ---------- */
function carrega(){
  var p=null; try{ p=JSON.parse(localStorage.getItem(CHAVE)||'null'); }catch(e){}
  if(!p||typeof p!=='object') p={};
  p.fases=p.fases||{}; p.moedas=p.moedas||0; p.pontos=p.pontos||0; p.zerado=!!p.zerado; p.customizado=!!p.customizado; p.treino=!!p.treino;
  if(p.look){ Object.keys(p.look).forEach(function(k){ A.LOOK[k]=p.look[k]; }); }
  J.prog=p; J.moedas=p.moedas; return p;
}
function salva(){ try{ J.prog.moedas=J.moedas; J.prog.look={uniforme:A.LOOK.uniforme,mochila:A.LOOK.mochila,lancheira:A.LOOK.lancheira,chapeu:A.LOOK.chapeu,oculos:A.LOOK.oculos,cachecol:A.LOOK.cachecol}; localStorage.setItem(CHAVE,JSON.stringify(J.prog)); }catch(e){} }
function faseFeita(id){ return !!(J.prog.fases[id]&&J.prog.fases[id].estrelas); }
function faseLiberada(id){ return true; } /* nenhuma fase trancada (pedido do pai) */
function proximaFase(){ for(var i=0;i<F.LISTA.length;i++){ if(!faseFeita(F.LISTA[i].id)) return i; } return F.LISTA.length-1; }
function recomecar(){ var look=J.prog.look; J.prog={fases:{},moedas:0,pontos:0,zerado:false,customizado:true,treino:false,look:look}; J.moedas=0; salva(); J.sel=0; irMapa(false); }

/* ---------- utilidades ---------- */
function emite(n,fn){ for(var i=0;i<n;i++) J.part.push(fn(i)); }
function toast(txt,dur){ if(window.UI) UI.toast(txt,dur||2200); }
function hud(){ if(!window.UI) return; var L=J.nivel; var feitas=L&&!L.chefao?arenasFeitas():0, tot=L?L.totalArenas:0; UI.hud(J.faseAtual?J.faseAtual.nome:'', J.pontos, J.moedas, feitas, tot, !!(L&&!L.chefao&&!J.faseAtual.treino)); }
function arenasFeitas(){ var L=J.nivel; if(!L) return 0; var n=L.caixas.filter(function(c){ return c.aberta; }).length; if(L.sub) n+=L.sub.caixas.filter(function(c){ return c.aberta; }).length; return n; }
function colideRet(ax,ay,aw,ah,bx,by,bw,bh){ return ax<bx+bw && ax+aw>bx && ay<by+bh && ay+ah>by; }
function ursoRet(){ var u=J.urso, s=TAM[u.tam], w=URSO_W*s, h=URSO_H*s; return {x:u.x-w/2,y:u.y-h,w:w,h:h}; }
function poeira(x,y,n){ emite(n||6,function(){ return {x:x+(Math.random()-.5)*24,y:y,vx:(Math.random()-.5)*90,vy:-20-Math.random()*50,vida:.45,max:.45,tipo:'nevoa',r:4+Math.random()*4}; }); }
function brilho(x,y,n,cor){ emite(n||8,function(){ return {x:x,y:y,vx:(Math.random()-.5)*220,vy:-80-Math.random()*200,vida:.8,max:.8,tipo:'estrela',r:4+Math.random()*4,rot:Math.random()*6,g:1,cor:cor||'#fde047'}; }); }
function pontua(n,x,y){ J.pontos+=n; if(x!==undefined) J.part.push({x:x,y:y,vx:0,vy:-60,vida:.9,max:.9,tipo:'texto',txt:'+'+n,r:20,cor:'#fde68a'}); hud(); }

/* ---------- canvas / escala ---------- */
function redimensiona(){
  var vw=window.innerWidth, vh=window.innerHeight;
  dpr=Math.min(2,window.devicePixelRatio||1); escala=Math.min(vw/W,vh/H);
  var cw=Math.floor(W*escala), ch=Math.floor(H*escala);
  canvas.style.width=cw+'px'; canvas.style.height=ch+'px'; canvas.width=Math.floor(cw*dpr); canvas.height=Math.floor(ch*dpr);
  offX=Math.floor((vw-cw)/2); offY=Math.floor((vh-ch)/2);
  var ui=document.getElementById('ui'); ui.style.left=offX+'px'; ui.style.top=offY+'px'; ui.style.transform='scale('+escala+')';
  document.body.classList.toggle('portrait', vh>vw*1.05);
}
function paraLogico(cx,cy){ return {x:(cx-offX)/escala, y:(cy-offY)/escala}; }

/* ---------- carregar fase ---------- */
function novoUrso(x,y){ return {x:x,y:y,vx:0,vy:0,noChao:true,dir:1,estado:'idle',anim:0,tontoT:0,invT:0,tam:1,sx:1,sy:1,poderes:{capa:false,bota:false,patins:false,pinhas:0},puloExtra:false,planando:false,cheerT:0,sobre:null}; }
function iniciaFase(f){
  J.faseAtual=f;
  var L= f.chefao?F.chefao():F.monta(f);
  J.nivel=L; J.mundo=L; J.urso=novoUrso(L.inicioX,L.inicioY); J.cam=0; J.camY=Math.max(0,L.h-H); J.bolasCanhao=[]; J.part=[]; J.clima=[]; J.shake=0; J.tFase=0; J.fimFase=null; J.vit=null; J.arremesso=null; J.bolas=[]; J.folhas=[]; J.pinhas=[]; J.troncosVivos=[]; J.dica=null; J.setaT=0;
  J.respawn={x:L.inicioX,y:L.inicioY,mundo:'main'}; J.stats={perguntas:0,acertos:0,arenas:0}; J.pontos=0;
  [L].concat(L.sub?[L.sub]:[]).forEach(function(M){ M.caixas.forEach(function(c){ c.aberta=false; c.bump=0; c.cooldown=0; }); M.inimigos.forEach(function(e){ e.achatado=false; e.morto=false; e.tAch=0; e.x=e.x0; e.y=e.y0; e.dir=-1; e.t=Math.random()*6; }); M.moedas.forEach(function(m){ m.pega=false; }); M.itens.forEach(function(i){ i.pego=false; }); M.tijolos.forEach(function(b){ b.vivo=true; b.bump=0; }); M.caindo.forEach(function(p){ p.estado='ok'; p.x=p.x0; p.y=p.y0; p.t=0; }); M.pingentes.forEach(function(p){ p.estado='preso'; p.y=p.y0; p.t=0; }); });
  if(window.ARENA) ARENA.novaFase();
  J.tut= L.passos?{i:0,t:0}:null;
  J.chefe= L.gigante?L.gigante:null; if(J.chefe){ J.chefe.hp=J.chefe.max; J.chefe.estado='idle'; J.chefe.t=0; J.chefe.proxBola=3; }
  J.estado='nivel'; J.flash=.6;
  SOM.musica(A.CENAS[L.cena].musica); hud();
  if(window.UI){ UI.modoNivel(true); UI.modoMapa(false); }
}

/* ---------- física do urso ---------- */
function solidos(M){
  var s=[]; M.segs.forEach(function(g){ s.push(g); }); M.tijolos.forEach(function(b){ if(b.vivo) s.push({x:b.x,y:b.y,w:b.w,h:b.h,tijolo:b}); });
  M.caixas.forEach(function(c){ if(!c.porta) s.push({x:c.x,y:c.y,w:c.w,h:c.h,caixa:c}); }); M.canos.forEach(function(p){ s.push({x:p.x,y:p.y,w:p.w,h:p.h,cano:p}); });
  M.travas.forEach(function(g){ if(!g.aberta) s.push({x:g.x,y:g.y,w:g.w,h:g.h,trava:g}); });
  if(J.chefe) s.push({x:J.chefe.x-60,y:J.chefe.y-300,w:120,h:300});
  return s;
}
function umaVia(M){ var s=M.plats.slice(); M.caindo.forEach(function(p){ if(p.estado!=='sumiu') s.push(p); }); M.movers.forEach(function(p){ s.push(p); }); return s; }
function fisica(dt){
  var u=J.urso, M=J.mundo, s=TAM[u.tam], hw=URSO_W*s/2, hh=URSO_H*s;
  if(u.tontoT>0){ u.tontoT-=dt; u.estado='dizzy'; u.vx=0; u.anim+=dt; return; }
  var ax=0; if(J.in.left) ax-=1; if(J.in.right) ax+=1;
  u.abaixado=!!(J.in.down&&u.noChao); if(u.abaixado) ax=0; /* ↓ = abaixar, como no Mario */
  if(J.tut && J.tut.i===0 && ax<0) ax=0;
  var vel=VAND*(u.poderes.patins?1.18:1), alvo=ax*vel, gelo=M.gelo&&!u.poderes.patins;
  u.vx+=(alvo-u.vx)*Math.min(1,dt*(gelo?2.6:18)); if(Math.abs(u.vx)<2&&!ax) u.vx=0;
  if(ax) u.dir=ax>0?1:-1;
  if(M.vento){ u.x+= -58*(0.55+0.45*Math.sin(J.t*.7))*dt; }
  /* pulo (buffer, altura variável, pulo duplo com a bota, planar com a capa) */
  if(J.in.jump && J.jumpSolto){
    if(u.noChao){ u.vy=VPULO; u.noChao=false; J.jumpSolto=false; u.puloExtra=u.poderes.bota; u.sx=.8; u.sy=1.25; SOM.fx('pulo'); poeira(u.x,u.y,5); u.sobre=null; }
    else if(u.puloExtra){ u.vy=-640; u.puloExtra=false; J.jumpSolto=false; u.sx=.85; u.sy=1.2; SOM.fx('pulo'); brilho(u.x,u.y-20,6,'#fbbf24'); }
  }
  if(!J.in.jump){ J.jumpSolto=true; if(u.vy<-250) u.vy=-250; }
  u.planando= u.poderes.capa && J.in.jump && !u.noChao && u.vy>0;
  u.vy+=GRAV*dt; if(u.planando&&u.vy>95) u.vy=95; if(u.vy>900) u.vy=900;
  var nx=u.x+u.vx*dt, ny=u.y+u.vy*dt;
  var sol=solidos(M), via=umaVia(M);
  if(nx<hw) nx=hw; if(nx>M.w-hw) nx=M.w-hw;
  sol.forEach(function(b){ if(colideRet(nx-hw,u.y-hh+6,hw*2,hh-10,b.x,b.y,b.w,b.h)){ nx = u.vx>0? b.x-hw-.01 : b.x+b.w+hw+.01; u.vx=0; if(b.trava) bateTrava(b.trava); } });
  u.x=nx;
  var noChao=false, sobre=null;
  if(u.vy>=0){
    var piso=null;
    via.forEach(function(p){ if(u.x+hw-4>p.x && u.x-hw+4<p.x+p.w && u.y<=p.y+4+(p.vyAnt||0) && ny>=p.y){ if(piso===null||p.y<piso){ piso=p.y; sobre=p; } } });
    sol.forEach(function(b){ if(u.x+hw-2>b.x && u.x-hw+2<b.x+b.w && u.y<=b.y+2 && ny>=b.y){ if(piso===null||b.y<piso){ piso=b.y; sobre=b; } } });
    if(piso!==null){ if(!u.noChao){ u.sx=1.25; u.sy=.75; SOM.fx('aterra'); poeira(u.x,piso,6); } ny=piso; u.vy=0; noChao=true; u.puloExtra=u.poderes.bota; }
  } else {
    var topo=ny-hh;
    sol.forEach(function(b){ if(u.x+hw-6>b.x && u.x-hw+6<b.x+b.w && topo<=b.y+b.h && (u.y-hh)>=b.y+b.h-6){ ny=b.y+b.h+hh; u.vy=120; if(b.caixa) bateCaixa(b.caixa); if(b.tijolo) quebraTijolo(b.tijolo); } });
  }
  u.y=ny; u.noChao=noChao; u.sobre=sobre;
  if(!noChao) u.estado=u.planando?'glide':(u.vy<0?'jump':'fall'); else u.estado=Math.abs(u.vx)>5?'walk':'idle';
  if(noChao&&u.estado==='walk'&&Math.random()<dt*6) poeira(u.x-u.dir*10,u.y,1);
  u.anim+=dt; var alvoSx=u.abaixado?1.18:1, alvoSy=u.abaixado?.62:1; u.sx+=(alvoSx-u.sx)*Math.min(1,dt*14); u.sy+=(alvoSy-u.sy)*Math.min(1,dt*14);
  if(u.y>M.h+60) caiu('Opa! De volta ao checkpoint');
}

/* ---------- caixas, tijolos, itens, perigos ---------- */
function bateTrava(g){
  if(g.avisoT>0||J.estado!=='nivel') return; g.avisoT=3; J.setaT=6; J.shake=3; SOM.fx('tranca');
  var pend=g.alvos.filter(function(c){ return !c.aberta; })[0];
  if(g.tipo==='X') toast('Primeiro: entre no cano e visite a arena do submundo',3200);
  else if(pend&&pend.porta) toast('Primeiro: entre na porta ? (aperte ↓ na frente dela)',3200);
  else toast('Primeiro: bata na caixa ? (pule embaixo dela)',3200);
}
function abreTravas(dt){
  var M=J.mundo; M.travas.forEach(function(g){ if(g.avisoT>0) g.avisoT-=dt; if(g.aberta){ if(g.anim<1) g.anim+=dt*1.5; return; }
    if(g.alvos.every(function(c){ return c.aberta; })){ g.aberta=true; g.anim=0; SOM.fx('destrava'); toast('A trava abriu! Siga em frente',2200); emite(16,function(){ return {x:g.x+22,y:g.y+g.h-Math.random()*g.h,vx:(Math.random()-.5)*200,vy:-100-Math.random()*200,vida:.9,max:.9,tipo:'neve',r:3+Math.random()*3,g:1}; }); } });
}
function bateCaixa(c){ if((c.aberta&&J.chefe)||c.cooldown>0||J.estado!=='nivel') return; /* visitada = treinar de novo */ if(c.porta){ SOM.fx('cano'); J.caixaAtual=c; J.in.left=J.in.right=J.in.jump=false; if(window.ARENA) ARENA.entra(c); return; } c.bump=14; c.cooldown=.8; SOM.fx('plim'); J.caixaAtual=c; J.in.left=J.in.right=J.in.jump=false; if(J.chefe){ setTimeout(function(){ if(window.ARENA) ARENA.duelo(c); },300); } else { if(window.ARENA) ARENA.entra(c); } }
function quebraTijolo(b){ b.vivo=false; SOM.fx('tijolo'); J.shake=4; pontua(10,b.x+b.w/2,b.y); emite(8,function(i){ return {x:b.x+b.w/2,y:b.y+b.h/2,vx:(Math.random()-.5)*300,vy:-150-Math.random()*250,vida:.8,max:.8,tipo:'confete',cor:i%2?'#c2410c':'#7c2d12',rot:Math.random()*6,g:1}; }); J.part.push({x:b.x+b.w/2,y:b.y,vx:0,vy:-200,vida:.6,max:.6,tipo:'moeda',r:9,rot:0,g:1}); }
function pegaItem(it){
  var u=J.urso; it.pego=true; brilho(it.x,it.y,12,'#fff');
  switch(it.tipo){
    case 'mel': if(u.tam<2){ u.tam++; u.sx=1.3; u.sy=1.3; } SOM.fx('moedaG'); toast(u.tam===2?'Urso GRANDE!':'Cresceu!',1600); pontua(50,it.x,it.y); break;
    case 'capa': u.poderes.capa=true; A.LOOK.capa='#7c3aed'; SOM.fx('destrava'); toast('Capa! Segure PULAR no ar para planar',2600); break;
    case 'bota': u.poderes.bota=true; A.LOOK.bota=true; u.puloExtra=true; SOM.fx('destrava'); toast('Bota! Aperte PULAR de novo no ar: pulo duplo',2600); break;
    case 'patins': u.poderes.patins=true; A.LOOK.patins=true; SOM.fx('destrava'); toast('Patins! Agora o gelo não escorrega',2400); break;
    case 'pinhas': u.poderes.pinhas+=3; SOM.fx('moedaG'); toast('3 pinhas! Aperte ARREMESSAR (X ou ENTER) nos bichos',2600); if(window.UI) UI.acao(true);
  }
}
function arremessaPinha(){ var u=J.urso; if(u.poderes.pinhas<=0||J.estado!=='nivel') return; u.poderes.pinhas--; J.pinhas.push({x:u.x+u.dir*20,y:u.y-50,vx:u.dir*430,vy:-120,rot:0}); SOM.fx('clique'); if(u.poderes.pinhas<=0&&window.UI) UI.acao(false); }
function machucado(){
  var u=J.urso; if(u.invT>0||u.tontoT>0) return;
  if(u.tam>0){ u.tam--; u.invT=1.7; u.vy=-300; u.noChao=false; u.vx=-u.dir*150; SOM.fx('tonto'); J.shake=6; toast(u.tam===0?'Ficou bebê! Cuidado...':'Encolheu!',1500); poeira(u.x,u.y,8); }
  else caiu('Ai! De volta ao checkpoint');
}
function caiu(msg){
  var u=J.urso; SOM.fx('tonto'); J.shake=6;
  if(J.respawn.mundo!==J.mundo.mundo) trocaMundo(J.respawn.mundo);
  u.x=J.respawn.x; u.y=J.respawn.y; u.vx=0; u.vy=0; u.tontoT=.8; u.invT=1.2; J.flash=.7; u.puloExtra=u.poderes.bota;
  J.cam=Math.max(0,Math.min(J.mundo.w-W,u.x-W*.4)); J.camY=Math.max(0,Math.min(J.mundo.h-H,u.y-H*.62)); J.bolasCanhao=[]; toast(msg||'De volta ao checkpoint',1800);
  J.mundo.caindo.forEach(function(p){ p.estado='ok'; p.x=p.x0; p.y=p.y0; p.t=0; });
}
function trocaMundo(nome){ var L=J.nivel; J.mundo= nome==='sub'&&L.sub? L.sub : L; SOM.musica(A.CENAS[J.mundo.cena].musica); J.clima=[]; J.bolasCanhao=[]; }
function mareY(a){ return J.nivel&&J.nivel.mare&&J.mundo===J.nivel? a.y-28*Math.max(0,Math.sin(J.t*.45)) : a.y; }
function perigos(dt){
  var u=J.urso, M=J.mundo, R=ursoRet();
  abreTravas(dt);
  if(u.invT>0) u.invT-=dt;
  M.moedas.forEach(function(m){ if(!m.pega && colideRet(R.x,R.y,R.w,R.h,m.x-m.r,m.y-m.r,m.r*2,m.r*2)){ m.pega=true; J.moedas+=m.big?5:1; pontua(m.big?50:10,m.x,m.y-10); SOM.fx(m.big?'moedaG':'moeda'); brilho(m.x,m.y,m.big?14:5); } });
  M.itens.forEach(function(it){ if(!it.pego && colideRet(R.x,R.y,R.w,R.h,it.x-18,it.y-18,36,36)) pegaItem(it); });
  M.molas.forEach(function(m){ if(m.t>0) m.t-=dt; if(u.vy>=0 && colideRet(R.x,R.y+R.h-8,R.w,12,m.x,m.y-6,m.w,m.h)){ u.vy=VMOLA; u.noChao=false; u.y=m.y; m.t=.3; u.sx=.7; u.sy=1.4; SOM.fx('mola'); poeira(u.x,m.y,8); } });
  if(u.invT<=0&&u.tontoT<=0&&J.estado==='nivel'){
    M.espinhos.forEach(function(s){ if(colideRet(R.x+6,R.y+R.h-10,R.w-12,10,s.x,s.y,s.w,s.h)) caiu('Ai, espinhos! De volta ao checkpoint'); });
    M.agua.forEach(function(a){ if(u.y>mareY(a)+30 && u.x>a.x && u.x<a.x+a.w){ emite(10,function(){ return {x:u.x+(Math.random()-.5)*30,y:a.y,vx:(Math.random()-.5)*150,vy:-150-Math.random()*150,vida:.6,max:.6,tipo:'neve',r:3,g:1,cor:'#bae6fd'}; }); caiu('Splash! De volta ao checkpoint'); } });
  }
  M.pingentes.forEach(function(p){
    if(p.estado==='preso'){ if(Math.abs(u.x-p.x)<70 && u.y>p.y){ p.estado='tremendo'; p.t=0; } }
    else if(p.estado==='tremendo'){ p.t+=dt; if(p.t>.45){ p.estado='caindo'; p.vy=0; } }
    else if(p.estado==='caindo'){ p.vy+=1500*dt; p.y+=p.vy*dt; if(u.invT<=0&&J.estado==='nivel'&&colideRet(R.x,R.y,R.w,R.h,p.x-8,p.y,16,44)) caiu('Pingente de gelo! De volta ao checkpoint'); var ch=false; solidos(M).forEach(function(b){ if(p.y+44>=b.y && p.y+44<b.y+20 && p.x>b.x && p.x<b.x+b.w) ch=true; }); if(ch||p.y>H){ p.estado='sumiu'; p.t=0; SOM.fx('quebra'); emite(8,function(){ return {x:p.x,y:p.y+40,vx:(Math.random()-.5)*200,vy:-100-Math.random()*150,vida:.6,max:.6,tipo:'neve',r:3,g:1}; }); } }
    else if(p.estado==='sumiu'){ p.t+=dt; if(p.t>4){ p.estado='preso'; p.y=p.y0; } }
  });
  M.caindo.forEach(function(p){
    if(p.estado==='ok'){ if(u.sobre===p){ p.estado='tremendo'; p.t=0; } }
    else if(p.estado==='tremendo'){ p.t+=dt; if(p.t>.55){ p.estado='caindo'; p.vy=0; p.t=0; } }
    else if(p.estado==='caindo'){ p.vy+=900*dt; p.y+=p.vy*dt; p.t+=dt; if(p.t>2.6){ p.estado='sumiu'; p.t=0; } }
    else if(p.estado==='sumiu'){ p.t+=dt; if(p.t>1.5){ p.estado='ok'; p.x=p.x0; p.y=p.y0; } }
  });
  M.movers.forEach(function(p){ var k=.5-.5*Math.cos(J.t*6.2832/p.per+(p.x0*.01)); var nx=p.x0+p.dx*k, ny=p.y0+p.dy*k; var ddx=nx-p.x, ddy=ny-p.y; p.vyAnt=Math.max(0,ddy); p.x=nx; p.y=ny; if(u.sobre===p&&u.noChao){ u.x+=ddx; u.y=p.y; } });
  M.troncos.forEach(function(g){ g.prox-=dt; if(g.prox<=0 && Math.abs(g.x-u.x)<900 && Math.abs(g.y-u.y)<700){ g.prox=g.cada; J.troncosVivos.push({x:g.x,y:g.y-22,vx:-150,vy:0,r:22,rot:0,bola:!!g.bola}); } });
  for(var i=J.troncosVivos.length-1;i>=0;i--){ var b=J.troncosVivos[i]; b.vy+=900*dt; b.x+=b.vx*dt; b.y+=b.vy*dt; b.rot-=dt*7; var ap=false; solidos(M).forEach(function(s){ if(b.y+b.r>=s.y && b.y+b.r<s.y+30 && b.x>s.x && b.x<s.x+s.w){ b.y=s.y-b.r; b.vy=0; ap=true; } });
    if(b.y>M.h+60||b.x<-100){ J.troncosVivos.splice(i,1); continue; }
    if(u.invT<=0&&u.tontoT<=0&&J.estado==='nivel'&&colideRet(R.x+4,R.y,R.w-8,R.h,b.x-b.r,b.y-b.r,b.r*2,b.r*2)){ if(u.vy>50&&u.y<b.y){ u.vy=-420; u.noChao=false; SOM.fx('pisao'); } else caiu('Tronco! De volta ao checkpoint'); } }
  M.canhoes.forEach(function(g){ g.prox-=dt; if(g.prox<=0 && Math.abs(g.x-u.x)<800){ g.prox=g.cada; g.t=.3; J.bolasCanhao.push({x:g.x-30,y:g.y,vx:-150,vy:-40,r:13}); SOM.fx('clique'); } if(g.t>0) g.t-=dt; });
  for(var q=J.bolasCanhao.length-1;q>=0;q--){ var bc=J.bolasCanhao[q]; bc.vy+=260*dt; bc.x+=bc.vx*dt; bc.y+=bc.vy*dt; if(bc.x<-60||bc.y>M.h+40||Math.abs(bc.x-u.x)>1100){ J.bolasCanhao.splice(q,1); continue; }
    var bateu=false; solidos(M).forEach(function(b){ if(bc.x>b.x&&bc.x<b.x+b.w&&bc.y+bc.r>b.y&&bc.y-bc.r<b.y+b.h) bateu=true; });
    if(bateu){ J.bolasCanhao.splice(q,1); emite(5,function(){ return {x:bc.x,y:bc.y,vx:(Math.random()-.5)*160,vy:-80-Math.random()*100,vida:.5,max:.5,tipo:'neve',r:3,g:1}; }); continue; }
    if(u.invT<=0&&u.tontoT<=0&&J.estado==='nivel'&&colideRet(R.x+4,R.y,R.w-8,R.h,bc.x-bc.r,bc.y-bc.r,bc.r*2,bc.r*2)){ J.bolasCanhao.splice(q,1); machucado(); } }
  for(var k2=J.pinhas.length-1;k2>=0;k2--){ var pn=J.pinhas[k2]; pn.vy+=700*dt; pn.x+=pn.vx*dt; pn.y+=pn.vy*dt; pn.rot+=dt*10; if(pn.y>H||Math.abs(pn.x-u.x)>700){ J.pinhas.splice(k2,1); continue; }
    for(var e=0;e<M.inimigos.length;e++){ var en=M.inimigos[e]; if(!en.morto&&!en.achatado&&colideRet(pn.x-8,pn.y-8,16,16,en.x-18,en.y-40,36,40)){ en.achatado=true; en.tAch=.7; pontua(20,en.x,en.y-40); SOM.fx('pisao'); brilho(en.x,en.y-20,6); J.pinhas.splice(k2,1); break; } } }
}

var api={J:J, W:W, H:H, TAM:TAM, URSO_W:URSO_W, URSO_H:URSO_H, carrega:carrega, salva:salva, faseFeita:faseFeita, faseLiberada:faseLiberada, proximaFase:proximaFase, recomecar:recomecar, emite:emite, toast:toast, hud:hud, arenasFeitas:arenasFeitas, colideRet:colideRet, ursoRet:ursoRet, poeira:poeira, brilho:brilho, pontua:pontua, redimensiona:redimensiona, paraLogico:paraLogico, iniciaFase:iniciaFase, fisica:fisica, perigos:perigos, caiu:caiu, machucado:machucado, bateCaixa:bateCaixa, mareY:mareY, trocaMundo:trocaMundo, arremessaPinha:arremessaPinha, solidos:solidos,
  canvas:function(){ return canvas; }, ctx:function(){ return ctx; }, escala:function(){ return escala; }, dpr:function(){ return dpr; },
  setCanvas:function(cv){ canvas=cv; ctx=cv.getContext('2d'); }};
var irMapa=function(){ if(api.irMapa) api.irMapa.apply(null,arguments); };
return api;
})();
