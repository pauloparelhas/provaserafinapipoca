/* ============================================================
   GEO3_jogo_arteG.js — Guardiões da Casa Maior (Geografia 3º tri).
   Arte nova 1/5: os HERÓIS. Carrega depois de GEO3_jogo_arteC.js e
   antes de GEO3_jogo_alias.js; troca A.heroi por dentro, mantendo
   nome, assinatura, âncora (pés em x,y), ~95 px na escala 1 e todos os
   estados (idle walk jump fall cheer dizzy crouch crawl swim fly ride kick).
   - chave 'lia'  = MARIANA, a menina do poema "O meu bairro" (U3 S12),
     mochila nas costas como as crianças da faixa (U3 S3), vestido na cor
     escolhida, rabo de cavalo.
   - chave 'theo' = JOÃO, o vizinho (U3 S12/S18): camiseta na cor escolhida,
     bermuda, tênis, cabelo crespo, mochila.
   No voo (poder "asas do Bem-te-vi") a mochila ganha asas amarelas e marrons.
   Óculos de nadar (U4 S14 Pantanal) no lugar da máscara. Sem imagem, sem emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho, boca=I.boca;

var HEROIS={
  lia: {pele:'#fcdcc4',peleS:'#eab08f',cab:'#8d5530',cabS:'#5a3219',olho:'#6b3f1f',cor:'#dc2626',cilio:true, moch:'#7c3aed', mochB:'#fbbf24'},
  theo:{pele:'#b97a4e',peleS:'#93572f',cab:'#2c1a10',cabS:'#140a05',olho:'#3b2112',cor:'#2f55c8',cilio:false, moch:'#16a34a', mochB:'#f97316'},
  bia: {pele:'#d9a072',peleS:'#b47b4c',cab:'#3d2416',cabS:'#1f1009',olho:'#3f2210',cor:'#ec4899',cilio:true, moch:'#0ea5e9', mochB:'#fde047'}
};
A.HEROIS=HEROIS;

function pose(e,t){
  var P={bob:0,rot:0,sx:1,sy:1,lean:0,aN:.12,aF:-.1,lN:[0,.05],lF:[0,.05],tilt:0,face:'normal',boca:'smile',capa:.4,sw:.2,corpo:0,sent:0};
  var s,k;
  switch(e){
    case 'walk': s=Math.sin(t*11); P.bob=-Math.abs(Math.cos(t*11))*2.4; P.lN=[s*.62,Math.max(0,-s)*.75+.1]; P.lF=[-s*.62,Math.max(0,s)*.75+.1];
      P.aN=-s*.75; P.aF=s*.75; P.lean=.06; P.sw=.45+Math.abs(s)*.15; P.capa=1.4+Math.abs(s); P.tilt=s*.03; break;
    case 'kick': P.lF=[1.45,.08]; P.lN=[-.18,.12]; P.aN=-.7; P.aF=1.0; P.lean=-.1; P.boca='open'; P.face='feliz'; P.sw=.3; P.capa=1.2; break;
    case 'jump': P.sx=.94; P.sy=1.07; P.lN=[1.05,1.4]; P.lF=[-.25,.75]; P.aN=-2.35; P.aF=2.15; P.boca='o'; P.face='alto'; P.sw=-.15; P.capa=2.2; break;
    case 'fall': s=Math.sin(t*16); P.sy=.98; P.lN=[.28,.4]; P.lF=[-.22,.55]; P.aN=-2.55+s*.25; P.aF=2.35-s*.25; P.boca='O'; P.face='susto'; P.sw=1.0; P.capa=-2.6; break;
    case 'cheer': s=Math.abs(Math.sin(t*7)); k=s<.22?(.22-s)/.22:0; P.bob=-s*12; P.sx=1+k*.08-s*.03; P.sy=1-k*.08+s*.05;
      P.aN=-2.6+Math.sin(t*14)*.15; P.aF=2.45-Math.sin(t*14)*.15; P.lN=[s*.5,s*.9]; P.lF=[s*.15,s*.7]; P.face='feliz'; P.boca='open'; P.tilt=Math.sin(t*7)*.07; P.sw=.2-s*.5; P.capa=.8-s*2; break;
    case 'dizzy': P.rot=Math.sin(t*3.5)*.07; P.tilt=Math.sin(t*4.5)*.2; P.aN=.5+Math.sin(t*4)*.2; P.aF=-.3; P.face='tonto'; P.boca='wavy'; P.lN=[.08,.1]; P.lF=[-.1,.15]; P.sw=Math.sin(t*4.5)*.4; break;
    case 'swim': s=Math.sin(t*6); P.corpo=PI/2*.8+Math.sin(t*3)*.05; P.aN=1.25+s*.65; P.aF=1.25-s*.65; P.tilt=-1.0; P.lN=[Math.sin(t*12)*.35,.25]; P.lF=[-Math.sin(t*12)*.35,.25]; P.boca='o'; P.sw=.25; P.capa=1; break;
    case 'fly': P.corpo=PI/2*.84+Math.sin(t*2)*.04; P.aN=1.05+Math.sin(t*3)*.08; P.aF=1.9+Math.sin(t*3)*.08; P.tilt=-1.05; P.lN=[-.06,.14+Math.sin(t*5)*.1]; P.lF=[.12,.28]; P.boca='open'; P.sw=.55; break;
    case 'ride': P.sent=1; P.lN=[1.45,1.5]; P.lF=[1.35,1.4]; P.aN=1.0+Math.sin(t*4)*.06; P.aF=.85; P.bob=Math.sin(t*5)*.8; P.sw=.3+Math.sin(t*5)*.1; break;
    default: s=Math.sin(t*2.6); P.sy=1+s*.012; P.sx=1-s*.008; P.aN=.12+s*.04; P.aF=-.1-s*.03; P.sw=.15+Math.sin(t*1.7)*.08; P.tilt=Math.sin(t*1.3)*.025;
  }
  return P;
}

/* ---------- asa do Bem-te-vi (amarela com borda marrom), pivô na raiz ---------- */
function asaBem(c,ang,longe,s){
  c.save(); c.rotate(ang); c.scale(s||1,s||1);
  c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-8,-18,-18,-28); c.quadraticCurveTo(-24,-18,-30,-20); c.quadraticCurveTo(-28,-10,-34,-8); c.quadraticCurveTo(-24,-3,-26,3); c.quadraticCurveTo(-12,1,0,4); c.closePath();
  fs(c,lin(c,0,-28,-30,4,longe?'#d9b240':'#fde047',longe?'#7a5a1e':'#b7791f'),'#5b3a12',1.2);
  c.strokeStyle=longe?'#6b4a16':'#8a5a2b'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-2,1); c.lineTo(-18,-28); c.moveTo(-3,2); c.lineTo(-30,-20); c.moveTo(-4,3); c.lineTo(-34,-8); c.stroke();
  c.restore();
}
/* ---------- mochila (atrás das costas; o herói olha para +x) ---------- */
function mochila(c,K,P,t,voa){
  var mc=K.moch, k=P.capa||0, sw=Math.sin(t*8)*Math.min(1.5,Math.abs(k)*.4), dy=Math.min(0,k)*1.2;
  c.save(); c.translate(-10+sw*.4,-34+dy);
  if(voa||K.capaNuvem){ var flap=voa?Math.sin(t*12)*.55:Math.sin(t*3)*.12;
    c.save(); c.translate(-2,-9); asaBem(c,-.25-flap,true,1); c.restore();
    c.save(); c.translate(-6,-6); asaBem(c,-.05-flap*.9,false,1.08); c.restore(); }
  c.fillStyle='rgba(0,0,0,.14)'; rr(c,-7,-11,16,26,6); c.fill();
  rr(c,-9,-13,16,26,6); fs(c,lin(c,-9,-13,7,13,cla(mc,.15),esc(mc,.28)));
  c.beginPath(); c.moveTo(-9,-7); c.lineTo(7,-7); c.lineTo(7,-9); c.quadraticCurveTo(7,-14,2,-14); c.lineTo(-4,-14); c.quadraticCurveTo(-9,-14,-9,-9); c.closePath(); fs(c,lin(c,0,-14,0,-7,cla(K.mochB,.2),esc(K.mochB,.1)),esc(K.mochB,.45),1);
  rr(c,-6,0,10,9,3); fs(c,esc(mc,.35),esc(mc,.5),1); c.fillStyle='#fde047'; circ(c,-1,-5,1.8); c.fill(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-6,-10); c.lineTo(-6,9); c.stroke();
  c.restore();
}
function alca(c,K){ c.strokeStyle=esc(K.moch,.25); c.lineWidth=3.2; c.beginPath(); c.moveTo(-3,-45); c.quadraticCurveTo(3,-36,5,-27); c.stroke(); c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,-45); c.quadraticCurveTo(3,-36,5,-27); c.stroke(); }

/* ---------- braço (pivô no ombro) ---------- */
function braco(c,K,a,sx,longe,t,estado){
  var q=K.q, pele=longe?esc(K.pele,.12):K.pele, cor=longe?esc(K.cor,.18):K.cor;
  c.save(); c.translate(sx,-41); c.rotate(-a);
  if(K.mergulho){ rr(c,-3.6,-3,7.2,16.5,3.6); fs(c,lin(c,-3,0,3,0,longe?'#183052':'#2a4f82',longe?'#0f2038':'#16304f')); c.fillStyle=cor; c.fillRect(-3.6,4,7.2,2); circ(c,0,15.6,3.9); fs(c,pele); c.restore(); return; }
  if(q==='theo'){ rr(c,-3.7,-3,7.4,9,3.5); fs(c,lin(c,-3,0,3,0,cla(cor,.12),esc(cor,.15))); rr(c,-3.3,4,6.6,9,3.3); fs(c,lin(c,-3,0,3,0,cla(pele,.08),esc(pele,.08))); circ(c,0,15.4,3.9); fs(c,pele); }
  else { rr(c,-3.7,-3,7.4,16.5,3.7); fs(c,lin(c,-3,0,3,0,cla(cor,.1),esc(cor,.12)));
    rr(c,-3.9,9,7.8,4.4,2); fs(c,longe?'#cbd5e1':lin(c,0,9,0,13,'#ffffff','#cbd5e1'));
    circ(c,0,15.6,3.9); fs(c,pele); }
  c.restore();
}
/* ---------- perna (coxa + canela, pivô no quadril) ---------- */
function perna(c,K,L,hxx,longe){
  var q=K.q, d=longe?.16:0, pele=esc(K.pele,d);
  if(K.mergulho){ c.save(); c.translate(hxx,-18); c.rotate(-L[0]); rr(c,-3.9,-3,7.8,13,3.9); fs(c,esc('#24466f',d)); c.translate(0,9); c.rotate(L[1]); rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,esc('#1f3b63',d));
    c.beginPath(); c.moveTo(-4.5,6); c.lineTo(4.5,6); c.quadraticCurveTo(15,9,19,13); c.quadraticCurveTo(8,15.5,-4,12.5); c.closePath(); fs(c,lin(c,0,6,0,14,esc(K.cor,d),esc(K.cor,d+.3))); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; c.beginPath(); c.moveTo(4,9); c.lineTo(15,12); c.stroke(); c.restore(); return; }
  var coxa=q==='theo'?esc('#1e3a8a',d):pele, can=pele;
  c.save(); c.translate(hxx,-18); c.rotate(-L[0]);
  rr(c,-3.9,-3,7.8,13,3.9); fs(c,coxa);
  if(q==='theo'){ c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(-3.9,7,7.8,1.6); }
  c.translate(0,9); c.rotate(L[1]);
  rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,can);
  rr(c,-4.1,5.2,8.2,3.6,1.6); fs(c,esc('#f8fafc',d));
  if(q==='theo'){ el(c,2.4,10.2,6.6,3.9); fs(c,esc('#f8fafc',d)); c.fillStyle=esc(K.cor,d); rr(c,-4,11.6,13,2.4,1.1); c.fill(); c.strokeStyle=esc(K.cor,d+.1); c.lineWidth=1; c.beginPath(); c.moveTo(1,8.2); c.lineTo(4.5,7.6); c.stroke(); }
  else { el(c,2.4,10.2,6.4,3.9); fs(c,esc('#7c2d12',d)); c.fillStyle='rgba(255,255,255,.3)'; el(c,3.5,8.6,3,1); c.fill(); c.strokeStyle=esc('#7c2d12',d); c.lineWidth=1.2; c.beginPath(); c.moveTo(-1,7.5); c.lineTo(6,7.5); c.stroke(); }
  c.restore();
}
/* ---------- tronco ---------- */
function torso(c,K,P,t){
  var q=K.q, cor=K.cor;
  if(K.mergulho){ rr(c,-11,-47,22,32,10); fs(c,lin(c,-11,-47,11,-15,'#2f5a92','#14294a'));
    c.save(); rr(c,-11,-47,22,32,10); c.clip(); c.fillStyle=cor; c.beginPath(); c.moveTo(-12,-30); c.lineTo(12,-42); c.lineTo(12,-37); c.lineTo(-12,-25); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(-7,-46,3,30); c.restore();
    c.strokeStyle='#cbd5e1'; c.lineWidth=1.2; c.beginPath(); c.moveTo(2,-46); c.lineTo(2,-33); c.stroke(); circ(c,2,-46,1.4); c.fillStyle='#e5e7eb'; c.fill(); return; }
  if(q==='theo'){
    rr(c,-11,-47,22,27,8); fs(c,lin(c,-11,-47,11,-20,cla(cor,.15),esc(cor,.18)));
    c.save(); rr(c,-11,-47,22,27,8); c.clip(); c.fillStyle='rgba(255,255,255,.22)'; c.fillRect(-12,-33,24,3); c.fillRect(-12,-27,24,3); c.restore();
    c.beginPath(); c.moveTo(-6,-47); c.quadraticCurveTo(0,-41,6,-47); c.closePath(); fs(c,cla(K.pele,.1),OL,1);
    rr(c,-11.5,-22.5,23,4,2); fs(c,'#1e3a8a'); rr(c,-2,-23,4,5,1); fs(c,'#fbbf24','#92400e',.8);
    alca(c,K);
  } else {
    c.beginPath(); c.moveTo(-11,-27); c.lineTo(11,-27); c.lineTo(13.6,-13.5); c.quadraticCurveTo(0,-10.6,-13.6,-13.5); c.closePath(); fs(c,lin(c,0,-27,0,-12,esc(cor,.05),esc(cor,.3)));
    c.strokeStyle='rgba(255,255,255,.28)'; c.lineWidth=1; for(var i=-1;i<=1;i++){ c.beginPath(); c.moveTo(i*5,-25); c.lineTo(i*6.4,-13); c.stroke(); }
    rr(c,-11,-47,22,24,9); fs(c,lin(c,-11,-47,11,-23,cla(cor,.15),esc(cor,.15)));
    c.beginPath(); c.moveTo(-10,-44); c.quadraticCurveTo(0,-48.5,10,-44); c.lineTo(10,-29); c.quadraticCurveTo(0,-25,-10,-29); c.closePath(); fs(c,lin(c,-10,-46,10,-26,'#f8fafc','#94a3b8'),'#5b6577',1.3);
    c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=1.6; c.beginPath(); c.moveTo(-5.5,-43); c.quadraticCurveTo(-7,-36,-5.5,-30.5); c.stroke();
    /* folhinha verde de guardiã (no lugar do broche) */
    c.save(); c.translate(3,-37); c.rotate(-.4); c.beginPath(); c.moveTo(0,4); c.quadraticCurveTo(-5,0,0,-4.5); c.quadraticCurveTo(5,0,0,4); c.closePath(); fs(c,'#4ade80','#166534',.9); c.strokeStyle='#166534'; c.lineWidth=.7; c.beginPath(); c.moveTo(0,3); c.lineTo(0,-3.5); c.stroke(); c.restore();
    rr(c,-11.5,-28.5,23,4.4,2); fs(c,'#7c4a25'); rr(c,1.5,-29.2,5.6,5.8,1.4); fs(c,'#f6c445','#b7791f',1);
    alca(c,K);
  }
}
/* ---------- cabeça (origem no centro; olha para +x) ---------- */
function cabeca(c,K,P,t){
  var q=K.q, cab=lin(c,-20,-22,20,10,cla(K.cab,.12),K.cabS), pisca=(t%3.6)<.11 && P.face==='normal';
  if(q==='lia'){ el(c,-2,-3,21.6,20.6); fs(c,cab);
    c.save(); c.translate(-15,-11); c.rotate(.25+P.sw+Math.sin(t*3)*.05);
    c.beginPath(); c.moveTo(1,-4); c.bezierCurveTo(-13,-7,-21,9,-13,24); c.bezierCurveTo(-11,17,-3,10,4,3); c.closePath(); fs(c,cab);
    c.strokeStyle='rgba(0,0,0,.18)'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,-1); c.quadraticCurveTo(-12,6,-12,18); c.stroke();
    c.restore(); c.save(); c.translate(-15,-11); circ(c,0,0,3.6); fs(c,K.cor); c.restore(); }
  else if(q==='bia'){ circ(c,-7,-20,9.6); fs(c,cab); }
  else { c.fillStyle=K.cabS; c.beginPath(); [[-15,2,7],[-12,-7,7],[-17,-3,6],[-11,9,5],[-4,-14,7],[5,-15,6.5],[13,-12,5.5]].forEach(function(p){ c.moveTo(p[0]+p[2],p[1]); c.arc(p[0],p[1],p[2],0,TAU); }); c.fill(); }
  el(c,1,0,20,18.6); fs(c,rad(c,3,-1,21,cla(K.pele,.28),K.pele));
  c.save(); el(c,1,0,20,18.6); c.clip(); c.fillStyle=K.peleS; c.globalAlpha=.35; el(c,-17,4,10,20); c.fill(); c.restore();
  var ex1=-.5, ex2=12, ey=1.5;
  if(P.face==='feliz'){ c.strokeStyle='#2a1610'; c.lineWidth=2; c.beginPath(); c.arc(ex1,ey+2,3.6,1.12*PI,1.88*PI); c.stroke(); c.beginPath(); c.arc(ex2,ey+2,3.2,1.12*PI,1.88*PI); c.stroke(); }
  else if(P.face==='tonto'){ c.strokeStyle='#2a1610'; c.lineWidth=1.3; [ex1,ex2].forEach(function(x0,j){ c.beginPath(); for(var a=0;a<TAU*2.2;a+=.3){ var r=a*.6; c.lineTo(x0+Math.cos(a+t*6*(j?-1:1))*r,ey+Math.sin(a+t*6*(j?-1:1))*r); } c.stroke(); }); }
  else { var ryk=P.face==='susto'||P.face==='alto'?1.08:1; olho(c,ex1,ey,4.3,5.8*ryk,K.olho,pisca,K.cilio); olho(c,ex2,ey,3.8,5.5*ryk,K.olho,pisca,K.cilio); }
  c.fillStyle='rgba(244,114,128,.38)'; el(c,-6.5,9,4.2,2.6); c.fill(); el(c,16.5,8.5,3,2.4); c.fill();
  c.strokeStyle=esc(K.peleS,.15); c.lineWidth=1.2; c.beginPath(); c.moveTo(6.5,4.5); c.quadraticCurveTo(8,6.5,6.2,7.2); c.stroke();
  boca(c,P.boca,6.2,11.4,1);
  c.save(); el(c,1,0,20.6,19.2); c.clip();
  if(q==='lia'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-1); c.quadraticCurveTo(20,-9,15.5,-3.5); c.quadraticCurveTo(12,-11,6,-5.5); c.quadraticCurveTo(1.5,-12,-4,-6.5); c.quadraticCurveTo(-8.5,-10,-10.5,-1); c.lineTo(-12.5,7); c.quadraticCurveTo(-16,13,-24,16); c.closePath(); fs(c,cab,K.cabS,1); }
  else if(q==='bia'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-8.5); c.quadraticCurveTo(14,-15.5,2,-11); c.quadraticCurveTo(-8,-7,-11,2); c.quadraticCurveTo(-12.5,9,-17,14); c.closePath(); fs(c,cab,K.cabS,1); }
  else { [[-9,-11,4.8],[-3,-12.5,4.6],[3,-13,4.2],[9,-12,3.8],[14,-10,3.4],[-13,-6,4.2],[-15,1,3.6]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,cab,K.cabS,.8); }); }
  c.restore();
  el(c,1,0,20,18.6); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  c.strokeStyle='rgba(255,255,255,.32)'; c.lineWidth=2.6; c.beginPath(); c.arc(1,-2,15,1.18*PI,1.5*PI); c.stroke();
  el(c,-12.5,4,3.4,4.4); fs(c,K.pele); c.strokeStyle=K.peleS; c.lineWidth=1; c.beginPath(); c.arc(-12.3,4.3,1.8,-.5*PI,.6*PI); c.stroke();
  if(P.face!=='tonto'){ var by=P.face==='susto'||P.face==='alto'?-12.6:-10.8, inc=P.face==='susto'?-.25:0;
    c.strokeStyle=esc(K.cab,.15); c.globalAlpha=.9; c.lineWidth=1.15; c.beginPath(); c.moveTo(ex1-3,by+.6-inc*4); c.quadraticCurveTo(ex1,by-1.2,ex1+3,by+.2+inc*4); c.stroke(); c.beginPath(); c.moveTo(ex2-2.6,by+.2+inc*4); c.quadraticCurveTo(ex2,by-1.2,ex2+2.6,by+.6-inc*4); c.stroke(); c.globalAlpha=1; }
  if(K.mergulho){ /* óculos de nadar: duas lentes redondas e a tira */
    c.strokeStyle='#0f172a'; c.lineWidth=2.6; c.beginPath(); c.ellipse(1,0,20.6,19.2,0,1.08*PI,1.6*PI); c.stroke();
    [[-.5,1.5,6.4],[12,1.2,6]].forEach(function(l){ circ(c,l[0],l[1],l[2]); fs(c,'rgba(186,230,253,.38)','#0f766e',2.4); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.2; c.beginPath(); c.arc(l[0],l[1],l[2]*.6,1.1*PI,1.45*PI); c.stroke(); });
    c.strokeStyle='#0f766e'; c.lineWidth=2; c.beginPath(); c.moveTo(5.9,1); c.lineTo(6.2,1); c.stroke(); }
}

/* ---------- agachado / rastejando (nunca de quatro: humano agacha ou se arrasta de barriga) ---------- */
function agacha(c,K,t){
  var r=Math.sin(t*2.6), P={face:'normal',boca:'smile',sw:.35+r*.05,capa:.5,tilt:0};
  sombra(c,20);
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.85,2.85],4,true); c.restore();
  function quadro(){ c.translate(0,-7+r*.3); c.rotate(.22); c.scale(1.05,.64); c.translate(0,18); }
  c.save(); quadro(); if(!K.mergulho) mochila(c,K,P,t,false); braco(c,K,1.05,5,true,t,'crouch'); torso(c,K,P,t); c.restore();
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.75,2.8],-3,false); c.restore();
  c.save(); c.translate(6.5,-36+r*.6); c.rotate(-.04); c.scale(.93,.93); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,1.2+r*.03,-4,false,t,'crouch'); c.restore();
}
function rasteja(c,K,t){
  var f=t*7, s=Math.sin(f), P={face:'normal',boca:'smile',sw:.9,capa:1.4,tilt:0,lN:[s*.12,.08],lF:[-s*.12,.08]};
  c.save(); c.translate(4,0); sombra(c,36,.2); c.restore();
  c.save(); c.translate(s*1.2,0);
  function quadro(){ c.translate(-8,-11); c.rotate(PI/2); c.translate(0,18); }
  c.save(); quadro(); if(!K.mergulho) mochila(c,K,P,t,false); braco(c,K,PI*.72-s*.38,5,true,t,'crawl'); perna(c,K,P.lF,3,true); perna(c,K,P.lN,-3,false); torso(c,K,P,t); c.restore();
  c.save(); c.translate(31,-26+Math.abs(s)*.8); c.rotate(-.06+s*.03); c.scale(.92,.92); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,PI*.72+s*.38,-4,false,t,'crawl'); c.restore();
  c.restore();
}

A.heroi=function(c,x,y,estado,t,dir,escala,quem,look){
  var H0=HEROIS[quem]||HEROIS.lia; quem=HEROIS[quem]?quem:'lia';
  var K={q:quem,pele:H0.pele,peleS:H0.peleS,cab:H0.cab,cabS:H0.cabS,olho:H0.olho,cilio:H0.cilio,cor:(look&&look.cor)||H0.cor,moch:H0.moch,mochB:H0.mochB,capaNuvem:!!(look&&look.capaNuvem),mergulho:estado==='swim'||!!(look&&look.mergulho)};
  escala=escala||1; dir=dir||1; t=t||0;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala); c.lineJoin='round'; c.lineCap='round';
  if(estado==='crawl'){ rasteja(c,K,t); c.restore(); return; }
  if(estado==='crouch'){ agacha(c,K,t); c.restore(); return; }
  var P=pose(estado,t);
  if(!P.corpo && !P.sent) sombra(c,17);
  if(P.sent) c.translate(0,18);
  c.translate(0,P.bob);
  if(P.corpo){ c.translate(0,-30); c.rotate(P.corpo); c.translate(0,30); }
  c.rotate(P.rot+P.lean); c.scale(P.sx,P.sy);
  if(!K.mergulho) mochila(c,K,P,t,estado==='fly');
  braco(c,K,P.aF,5,true,t,estado);
  perna(c,K,P.lF,3,true);
  perna(c,K,P.lN,-3,false);
  torso(c,K,P,t);
  c.save(); c.translate(1,-62); c.rotate(P.tilt); cabeca(c,K,P,t); c.restore();
  braco(c,K,P.aN,-4,false,t,estado);
  if(estado==='dizzy'){ for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; A.estrela(c,1+Math.cos(a)*20,-90+Math.sin(a)*5,4.5,'#fde047',a); } }
  if(estado==='swim'){ for(var b=0;b<3;b++){ var fb=(t*.9+b/3)%1; c.save(); c.globalAlpha=.75*(1-fb); c.strokeStyle='#e0f2fe'; c.lineWidth=1.3; circ(c,14+Math.sin(fb*9+b)*2,-60-fb*26,2+b*.8+fb*2); c.stroke(); c.restore(); } }
  if(estado==='fly'){ for(var p=0;p<4;p++){ var fp=(t*1.4+p/4)%1; c.save(); c.globalAlpha=.7*(1-fp); c.translate(-24-fp*22,-20+Math.sin(p*2.1+t*3)*8+fp*6); c.rotate(fp*4+p); c.beginPath(); c.moveTo(0,-4); c.quadraticCurveTo(3,0,0,4); c.quadraticCurveTo(-3,0,0,-4); c.closePath(); fs(c,p%2?'#fde047':'#b7791f',null); c.restore(); } }
  if(estado==='cheer'){ for(var s=0;s<3;s++){ var fs2=(t*1.2+s/3)%1; c.save(); c.globalAlpha=1-fs2; cintila(c,-20+s*20+Math.sin(s*3+t*4)*4,-100-fs2*18,2.5+(1-fs2)*2,'#fef08a'); c.restore(); } }
  c.restore();
};
})();
