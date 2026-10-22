/* ============================================================
   HIS3_jogo_aparelhos.js — os APARELHOS que o herói USA (Game
   Design v2, B.2 e B.6): o jogo deixa de ser "andar e pular".
     l  cipó (floresta)      R  argola (ginásio)  → pêndulo: encostou,
        agarra; balança sozinho; PULAR solta e o impulso segue o balanço
        (soltar na frente, no alto, voa mais longe; soltar cedo = cai).
     X  barra (17/10, pedido do Paulo: o giro de 360 graus ficou feio): o
        herói fica PENDURADO pelos braços e balança as pernas como um
        pêndulo; PULAR solta e o impulso é sempre para a frente (mais
        forte quando as pernas vão para a frente, nunca "errado"); a
        barra seguinte fica perto e agarra sozinha ao passar.
     L  trave: plataforma estreita; anda a 70% da velocidade.
     V  trampolim do salto: chegar CORRENDO = reversão longa (vx 520,
        vy -950); parado = pulinho.
     t/u blocos do RITMO: aparecem e somem na batida (100 bpm; os dois
        grupos trocam a cada 2 batidas), piscando 0,3 s antes de sumir.
     s  zagueiro: anda; a 4 tiles do herói AGACHA 0,6 s (aviso) e
        desliza 3 tiles; pisa-se quando está andando.
   ============================================================ */
window.APARELHOS = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, T=45, BATIDA=60/100;

/* ---------- parser (chamado por FASES.parse para os símbolos novos) ---------- */
function parse(ch,x,y,L){
  switch(ch){
    /* a ponta fica à altura das mãos do herói (y 290-300): pega-se com um pulinho, do chão ou da borda (Paulo: "tão lá no alto") */
    case 'l': { var lc=Math.max(80,290-y); L.pendulos.push({ax:x+T/2,ay:y,len:lc,th:0,tipo:'cipo',fase0:x*.01}); return true; }
    case 'R': { var lr=Math.max(80,300-y); L.pendulos.push({ax:x+T/2,ay:y,len:lr,th:0,tipo:'argola',fase0:x*.01}); return true; }
    case 'X': L.barras.push({x:x+T/2,y:y+T/2}); return true;
    case 'L': L.plats.push({x:x,y:y+T-14,w:T,h:12,trave:true}); return true;
    case 'V': L.saltos.push({x:x+2,y:y+T-22,w:T-4,h:22,t:0}); return true;
    case 't': case 'u': L.plats.push({x:x,y:y,w:T,h:18,ritmo:ch,visivel:true}); return true;
    case 's': L.inimigos.push({tipo:'zagueiro',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:45,voa:false,est:'anda',et:0}); return true;
  }
  return false;
}

/* ---------- pêndulos: todos balançam sempre (o herói só pega carona) ---------- */
function pontaPend(p){ return {x:p.ax+Math.sin(p.th)*p.len, y:p.ay+Math.cos(p.th)*p.len}; }
var AMP=.55, PER={cipo:1.5,argola:1.3,barra:1.25};
function balancaTodos(M,dt){
  (M.pendulos||[]).forEach(function(p){ if(J.agarrado&&J.agarrado.p===p) return; p.th=AMP*Math.sin(J.t*2*Math.PI/PER[p.tipo]+p.fase0); });
}
function ativo(){ return !!J.agarrado; }
/* agarrar é GENEROSO: as mãos do herói perto da ponta (50 px de lado, 60 px de altura) */
function tentaAgarrar(M){
  var u=J.urso; if(J.agarrado||u.noChao||(J.soltouT||0)>0) return;
  var hh=G.URSO_H*G.TAM[u.tam], maos=u.y-hh, gx=u.poderes.giz?70:50, gy=u.poderes.giz?80:60; /* giz: mãos que seguram mais fácil */
  (M.pendulos||[]).forEach(function(p){ if(J.agarrado) return; var e=pontaPend(p); if(Math.abs(u.x-e.x)<gx&&Math.abs(maos-e.y)<gy){ J.agarrado={tipo:p.tipo,p:p,t:0}; SOM.fx('clique'); u.vx=0; u.vy=0; u.lancado=false; } });
  (M.barras||[]).forEach(function(b){ if(J.agarrado) return; if(Math.abs(u.x-b.x)<gx&&Math.abs(maos-b.y)<gy){ J.agarrado={tipo:'barra',b:b,t:0,th0:Math.max(-.5,Math.min(.5,u.vx/600))}; SOM.fx('clique'); u.vx=0; u.vy=0; u.lancado=false; } });
}
/* solta: o impulso é SEMPRE para a frente (para onde o herói olha ou a seta segurada); mais forte se o
   balanço vai para a frente, mas nunca "errado": não existe janela que derrube (Paulo: facilitar soltar e pegar) */
function solta(u,a,th,om){
  var d=J.in.left?-1:(J.in.right?1:(u.dir||1)), aFavor=(om*d)>0;
  J.agarrado=null; J.soltouT=.3; u.giro=0; u.noChao=false; u.lancado=true; u.impulsoT=.45;
  u.vx=d*(aFavor?380:330); u.vy=a.tipo==='barra'?-780:(aFavor?-640:-580); u.dir=d;
  SOM.fx(aFavor?'mola':'pulo'); if(aFavor) G.brilho(u.x,u.y-50,8,'#86efac');
}
function fisica(dt){
  var u=J.urso, a=J.agarrado, hh=G.URSO_H*G.TAM[u.tam];
  a.t+=dt; var per=PER[a.tipo], th, om;
  if(a.tipo==='barra'){
    /* pendurado pelos braços: as mãos ficam na barra e as pernas balançam (pêndulo pelo topo) */
    var k=Math.min(1,a.t/.4); th=(AMP+.15)*Math.sin(a.t*2*Math.PI/per)*k+(a.th0||0)*(1-k); om=Math.cos(a.t*2*Math.PI/per);
    u.x=a.b.x+Math.sin(th)*6; u.y=a.b.y+hh; u.giro=-th; u.estado='hang'; u.anim+=dt;
  } else {
    var p=a.p; p.th=AMP*Math.sin(J.t*2*Math.PI/per+p.fase0); th=p.th; om=Math.cos(J.t*2*Math.PI/per+p.fase0);
    var e=pontaPend(p); u.x=e.x; u.y=e.y+hh; u.giro=-th*.8; u.estado='hang'; u.anim+=dt;
  }
  if(J.in.left) u.dir=-1; else if(J.in.right) u.dir=1;
  if(J.in.jump&&J.jumpSolto&&a.t>.12){ J.jumpSolto=false; solta(u,a,th,om); return; }
  if(!J.in.jump) J.jumpSolto=true;
}

/* ---------- por quadro (dentro de perigos) ---------- */
function atualiza(dt){
  var M=J.mundo, u=J.urso; if(!M) return; if(J.soltouT>0) J.soltouT-=dt;
  balancaTodos(M,dt); tentaAgarrar(M);
  /* ritmo */
  var fase=Math.floor(J.t/(2*BATIDA))%2, dentro=(J.t%(2*BATIDA))/(2*BATIDA);
  (M.plats||[]).forEach(function(p){ if(!p.ritmo) return; var vis=(p.ritmo==='t')===(fase===0); p.visivel=vis; p.pisca=vis&&dentro>.6; if(!vis&&u.sobre===p){ u.sobre=null; u.noChao=false; } });
  /* salto */
  var R=G.ursoRet();
  /* salto: o trampolim SEMPRE lança alto e para a frente (correndo, mais longe); o impulso não é cortado ao soltar PULAR */
  (M.saltos||[]).forEach(function(s){ if(s.t>0) s.t-=dt; if(u.vy>=0&&G.colideRet(R.x,R.y+R.h-8,R.w,12,s.x,s.y-6,s.w,s.h)){ var correndo=Math.abs(u.vx)>150, d=u.vx<-5?-1:(u.vx>5?1:(u.dir||1)); u.vy=correndo?-980:-900; u.vx=d*(correndo?470:330); u.noChao=false; u.y=s.y; s.t=.3; u.flip=1; u.lancado=true; u.impulsoT=.7; SOM.fx('mola'); } });
  if(u.flip>0){ u.flip=Math.max(0,u.flip-dt*1.4); u.giro=(1-u.flip)*Math.PI*2*(u.dir||1); if(u.flip===0||u.noChao){ u.flip=0; u.giro=0; } }
  /* zagueiros */
  M.inimigos.forEach(function(e){ if(e.tipo!=='zagueiro'||e.morto||e.achatado) return; e.et+=dt;
    if(e.est==='anda'&&Math.abs(u.x-e.x)<180&&Math.abs(u.y-e.y)<60){ e.est='agacha'; e.et=0; e.dir=u.x<e.x?-1:1; }
    else if(e.est==='agacha'&&e.et>.6){ e.est='desliza'; e.et=0; e.v0=e.v; e.v=330; SOM.fx('clique'); }
    else if(e.est==='desliza'&&e.et>.42){ e.est='levanta'; e.et=0; e.v=0; }
    else if(e.est==='levanta'&&e.et>.9){ e.est='anda'; e.et=0; e.v=45; } });
}

/* ---------- desenho ---------- */
function desenha(c,t){
  var M=J.mundo; if(!M) return;
  (M.pendulos||[]).forEach(function(p){ var e=pontaPend(p);
    c.save(); c.strokeStyle=p.tipo==='cipo'?'#4d7c0f':'#e5e7eb'; c.lineWidth=p.tipo==='cipo'?6:4; c.beginPath(); c.moveTo(p.ax,p.ay); c.lineTo(e.x,e.y); c.stroke();
    if(p.tipo==='cipo'){ c.fillStyle='#65a30d'; for(var k=1;k<5;k++){ var fx=p.ax+(e.x-p.ax)*k/5, fy=p.ay+(e.y-p.ay)*k/5; A.el(c,fx+6,fy,7,3.5); c.fill(); } c.fillStyle='#3f6212'; A.circ(c,p.ax,p.ay,7); c.fill(); }
    else { c.fillStyle='#64748b'; A.rr(c,p.ax-8,p.ay-6,16,8,3); c.fill(); c.strokeStyle='#d97706'; c.lineWidth=6; A.circ(c,e.x,e.y+10,13); c.stroke(); }
    c.restore(); });
  (M.barras||[]).forEach(function(b){ c.save();
    c.strokeStyle='#94a3b8'; c.lineWidth=6; c.beginPath(); c.moveTo(b.x-30,b.y); c.lineTo(b.x-30,b.y+(450-b.y)); c.moveTo(b.x+30,b.y); c.lineTo(b.x+30,b.y+(450-b.y)); c.stroke();
    c.strokeStyle='#e2e8f0'; c.lineWidth=7; c.beginPath(); c.moveTo(b.x-34,b.y); c.lineTo(b.x+34,b.y); c.stroke();
    var a=J.agarrado; if(!(a&&a.b===b)){ c.strokeStyle='rgba(253,224,71,'+(.35+.3*Math.sin(t*5))+')'; c.lineWidth=3; c.beginPath(); c.arc(b.x,b.y,22,0,Math.PI*2); c.stroke(); } /* brilho: pegue aqui */
    c.restore(); });
  (M.saltos||[]).forEach(function(s){ var sq=s.t>0?.6:1; c.save(); c.translate(s.x,s.y+s.h); c.fillStyle='#1d4ed8'; A.rr(c,0,-s.h*sq,s.w,s.h*sq,6); c.fill(); c.fillStyle='#fde047'; A.rr(c,2,-s.h*sq,s.w-4,5,3); c.fill(); c.restore(); });
}
/* trave e blocos do ritmo (no lugar do desenho da plataforma comum) */
function plataforma(c,p,cena,t){
  if(p.trave){ c.fillStyle='#a16207'; A.rr(c,p.x,p.y,p.w+1,p.h,4); c.fill(); c.fillStyle='#fde68a'; c.fillRect(p.x,p.y,p.w+1,3); c.fillStyle='#78716c'; if(Math.round(p.x/45)%6===0){ c.fillRect(p.x+18,p.y+p.h,6,450-p.y-p.h); } return true; }
  if(p.ritmo){ if(!p.visivel){ c.save(); c.globalAlpha=.18; c.strokeStyle='#fff'; c.setLineDash([5,5]); A.rr(c,p.x+2,p.y,p.w-4,p.h,6); c.stroke(); c.restore(); return true; }
    var a=p.pisca?(.5+.5*Math.abs(Math.sin(t*9))):1; c.save(); c.globalAlpha=a; c.fillStyle=p.ritmo==='t'?'#ec4899':'#22d3ee'; A.rr(c,p.x+2,p.y,p.w-4,p.h,6); c.fill(); c.fillStyle='rgba(255,255,255,.5)'; A.rr(c,p.x+5,p.y+2,p.w-10,5,3); c.fill(); c.restore(); return true; }
  return false;
}
function zagueiro(c,e,t){
  if(e.tipo!=='zagueiro') return false;
  c.save(); c.translate(e.x,e.y); c.scale(e.dir||-1,1); var ag=e.est==='agacha'?.7:(e.est==='desliza'?.5:1);
  c.fillStyle='rgba(0,0,0,.2)'; A.el(c,0,2,20,5); c.fill();
  if(e.est==='desliza'){ c.rotate(-.9); }
  c.scale(1,ag);
  c.fillStyle='#111827'; A.rr(c,-11,-24,9,24,4); c.fill(); A.rr(c,2,-24,9,24,4); c.fill();
  c.fillStyle='#4338ca'; A.rr(c,-14,-52,28,30,9); c.fill(); c.fillStyle='#fff'; c.font='900 12px Arial'; c.textAlign='center'; c.fillText('5',0,-32);
  var g=c.createRadialGradient(-3,-66,2,0,-62,15); g.addColorStop(0,'#6366f1'); g.addColorStop(1,'#1e1b4b'); c.fillStyle=g; A.circ(c,0,-64,14); c.fill();
  c.fillStyle='#fff'; A.circ(c,5,-66,4); c.fill(); c.fillStyle='#111'; A.circ(c,6,-66,2); c.fill();
  if(e.est==='agacha'){ c.fillStyle='#fde047'; c.font='900 20px Arial'; c.fillText('!',0,-86); }
  c.restore(); return true;
}
return {parse:parse, ativo:ativo, fisica:fisica, atualiza:atualiza, desenha:desenha, plataforma:plataforma, zagueiro:zagueiro};
})();
