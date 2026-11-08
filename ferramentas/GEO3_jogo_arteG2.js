/* ============================================================
   GEO3_jogo_arteG2.js — Guardiões da Casa Maior. Arte nova 2/5:
   QUEM PERGUNTA (A.morador, pés em x,y, ~150 px, boca de fala m) e os
   Patinhos do Trânsito. Os nomes internos ficam (o motor decide por eles):
     lucia      -> AGENTE DE TRÂNSITO com colete e placa PARE (U3 S26), com os patinhos
     tic        -> BEM-TE-VI, o guia (U3 S12, U4 S6): amarelo e marrom, faixa branca na cabeça; flutua
     clio       -> TUIUIÚ do Pantanal (U4 S8/S14)
     pedro      -> QUERO-QUERO do Pampa (U4 S8/S13)
     francisco, announcer (box da corrida) -> MOTORISTA DE ÔNIBUS (U3 S26-S28)
     joao       -> PEDREIRO · engenheira -> ENTREGADOR · fotografo -> GARI (U3 S26-S27)
     locutor    -> SEU JOSÉ DA PADARIA (U3 S18) · vovo -> DONA ANTÔNIA (U3 S18)
   A.patinho(c,x,y,t,dir,s): patinho do trânsito (U3 S15), ~26 px.
   Mesmo traço dos moradores do motor (cabeça de adulto, membros, pernas).
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho, boca=I.boca;

/* ---------- peças comuns ---------- */
function fala(t,falando){ if(!falando) return 0; var a=Math.abs(Math.sin(t*13)), b=Math.sin(t*2.7)>-.6?1:.25; return a*b; }
function bocaFala(c,x,y,m,w){
  if(m<.12){ boca(c,'smile',x,y,1.1); return; }
  c.beginPath(); c.ellipse(x,y+1,w*(.75+m*.25),1.2+m*4.2,0,0,TAU); fs(c,'#8f2d2d','#5c1b1b',1.1);
  c.save(); c.clip(); c.fillStyle='#f58a9b'; el(c,x,y+2.5+m*3.2,w*.6,2.4); c.fill(); c.restore();
}
function membro(c,x,y,a,len,w,cor,maoCor,maoR){
  c.save(); c.translate(x,y); c.rotate(-a); rr(c,-w/2,-2,w,len+2,w/2); fs(c,lin(c,-w/2,0,w/2,0,cla(cor,.12),esc(cor,.12)));
  if(maoCor){ circ(c,0,len,maoR||w*.6); fs(c,maoCor); } c.restore();
}
function maoEm(x,y,a,len){ return [x+Math.sin(a)*len, y+Math.cos(a)*len]; }
function pernas(c,meia,sap,afast){
  [[-6-afast,true],[5+afast,false]].forEach(function(p){ var d=p[1]?.15:0; rr(c,p[0]-4.6,-26,9.2,24,4.6); fs(c,esc(meia,d)); el(c,p[0]+2.5,-1.8,8,4.2); fs(c,esc(sap,d)); c.fillStyle='rgba(255,255,255,.22)'; el(c,p[0]+3.5,-3.6,3.6,1.2); c.fill(); });
}
function torso(c,c0,c1,y0,y1){ rr(c,-15,y0||-63,30,(y1||-23)-(y0||-63),13); fs(c,lin(c,-15,-63,15,-23,c0,c1)); }
function sobr(c,x,y,cor,inc){ c.strokeStyle=cor; c.lineWidth=2.2; c.beginPath(); c.moveTo(x-3.5,y+(inc||0)); c.quadraticCurveTo(x,y-1.8,x+3.5,y-(inc||0)); c.stroke(); }
function cabeca(c,o,t,m,extra){
  if(o.tras) o.tras(c,t);
  el(c,1,0,22,20.5); fs(c,rad(c,3,-1,23,cla(o.pele,.25),o.pele),null);
  c.save(); el(c,1,0,22,20.5); c.clip(); c.fillStyle=o.peleS; c.globalAlpha=.32; el(c,-19,5,11,22); c.fill(); c.restore();
  var pis=(t%4.3)<.12;
  olho(c,-1,1,3.7,4.9,o.olho,pis,o.cilio); olho(c,12.5,.5,3.3,4.6,o.olho,pis,o.cilio);
  c.fillStyle='rgba(244,114,128,.42)'; el(c,-7,9.5,4.6,2.8); c.fill(); el(c,18,9,3.2,2.6); c.fill();
  el(c,8.5,6.5,3.4,2.8); fs(c,cla(o.pele,.05),esc(o.peleS,.1),1);
  bocaFala(c,7.5,12.6,m,3.4);
  if(o.frente) o.frente(c,t);
  el(c,1,0,22,20.5); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  el(c,-14,4,3.8,4.8); fs(c,o.pele); c.strokeStyle=o.peleS; c.lineWidth=1; c.beginPath(); c.arc(-13.8,4.3,2,-.5*PI,.6*PI); c.stroke();
  if(o.oculos){ c.save(); c.globalAlpha=.22; c.fillStyle='#e0f2fe'; circ(c,-1,1,6.6); c.fill(); circ(c,12.5,.5,6); c.fill(); c.restore();
    c.strokeStyle=o.oculos; c.lineWidth=1.8; circ(c,-1,1,6.6); c.stroke(); circ(c,12.5,.5,6); c.stroke(); c.beginPath(); c.moveTo(5.6,0); c.quadraticCurveTo(6,-2,6.5,0); c.moveTo(-7.6,0); c.lineTo(-14,1); c.stroke();
    c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.1; c.beginPath(); c.arc(-1,1,4.6,1.1*PI,1.4*PI); c.stroke(); }
  if(extra) extra(c,t,m);
}
function cab(c,cor,y1,y2){
  c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,y2); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,y1);
  c.quadraticCurveTo(12,y1-9,0,y1-2); c.quadraticCurveTo(-9,y1+2,-12,y2); c.closePath(); fs(c,lin(c,0,-22,0,y2,cla(cor,.18),esc(cor,.12)),esc(cor,.4),1);
  c.strokeStyle='rgba(255,255,255,.22)'; c.lineWidth=2; c.beginPath(); c.arc(0,0,17,1.25*PI,1.5*PI); c.stroke(); c.restore();
}
function cabeca1(c,o,t,m,extra){ c.save(); c.translate(1,-84); cabeca(c,o,t,m,extra); c.restore(); }
function bone(c,cor,cor2){ c.save(); c.translate(0,-11); c.beginPath(); c.moveTo(-22,4); c.bezierCurveTo(-22,-18,20,-20,22,2); c.closePath(); fs(c,lin(c,0,-16,0,4,cla(cor,.1),esc(cor,.15)));
  c.beginPath(); c.moveTo(12,1); c.quadraticCurveTo(30,-1,34,5); c.quadraticCurveTo(22,8,10,5); c.closePath(); fs(c,lin(c,10,0,34,6,cla(cor2||cor,.05),esc(cor2||cor,.3)));
  rr(c,-22,0,36,5,2.5); fs(c,cor2||cor,esc(cor2||cor,.4),1); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=1.5; c.beginPath(); c.arc(-4,0,14,1.15*PI,1.45*PI); c.stroke(); c.restore(); }
function colete(c,cor,faixa){ [[-1],[1]].forEach(function(s){ c.beginPath(); c.moveTo(s[0]*15,-58); c.lineTo(s[0]*5,-63); c.lineTo(s[0]*3,-25); c.lineTo(s[0]*15,-25); c.closePath(); fs(c,lin(c,-15,-60,15,-24,cla(cor,.12),esc(cor,.12))); });
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); [-46,-36].forEach(function(y){ c.fillStyle=faixa||'#e5e7eb'; c.fillRect(-16,y,13,4); c.fillRect(3,y,13,4); c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(-16,y,13,1.2); c.fillRect(3,y,13,1.2); }); c.restore(); }
function bigode(c,cor){ c.fillStyle=cor; [1,-1].forEach(function(s){ c.save(); c.translate(7.5,9.5); c.scale(s,1); c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(4,-2,8,-1,10,-3); c.bezierCurveTo(12,-5,10,-7,9,-5); c.bezierCurveTo(8,0,3,2,0,2); c.closePath(); c.fill(); c.restore(); }); }

/* ---------- PATINHO do trânsito (~26 px, pés em x,y) ---------- */
A.patinho=function(c,x,y,t,dir,s){
  t=t||0; s=s||1; c.save(); c.translate(x,y); c.scale((dir||1)*s,s); c.lineJoin='round'; c.lineCap='round';
  var w=Math.sin(t*9), bob=-Math.abs(Math.cos(t*9))*1.2;
  sombra(c,10,.2);
  c.fillStyle='#f97316'; [[-4,w],[3,-w]].forEach(function(p){ c.save(); c.translate(p[0]+p[1]*2,-3); c.beginPath(); c.moveTo(-1.5,0); c.lineTo(1.5,0); c.lineTo(4,3); c.lineTo(-3.5,3); c.closePath(); c.fill(); c.restore(); });
  c.translate(0,bob);
  el(c,0,-11,11,8); fs(c,rad(c,-2,-14,12,'#fef08a','#f59e0b'),'#a16207',1.1);
  c.beginPath(); c.moveTo(-9,-15); c.quadraticCurveTo(-16,-20,-14,-12); c.quadraticCurveTo(-11,-9,-8,-11); c.closePath(); fs(c,'#fde047','#a16207',1);
  c.save(); c.translate(-2,-10); c.rotate(.15+w*.08); el(c,0,0,6,3.8); fs(c,lin(c,0,-4,0,4,'#fde68a','#eab308'),'#a16207',1); c.restore();
  circ(c,8,-21,7); fs(c,rad(c,6,-23,8,'#fef9c3','#fbbf24'),'#a16207',1.1);
  c.beginPath(); c.moveTo(13,-21); c.lineTo(20,-19.5); c.lineTo(13,-17.5); c.closePath(); fs(c,'#f97316','#c2410c',1);
  var pis=(t%3.3)<.12; olho(c,8.5,-22,1.9,2.4,'#1c1917',pis,false);
  c.fillStyle='rgba(244,114,128,.5)'; el(c,5,-18,2,1.2); c.fill();
  c.restore();
};

/* ---------- AGENTE DE TRÂNSITO (lucia) com os patinhos ---------- */
function agente(c,t,m){
  A.patinho(c,-46,0,t,1,1); A.patinho(c,-30,0,t+.7,1,.9); A.patinho(c,42,0,t+1.4,-1,1);
  sombra(c,20); var o={pele:'#e8b48a',peleS:'#c98d62',olho:'#3b2a1a',cilio:true};
  membro(c,7,-56,.22+Math.sin(t*1.4)*.03,20,8.5,'#3b82f6',o.pele,5);
  pernas(c,'#1e3a8a','#111827',0);
  torso(c,'#60a5fa','#2563eb'); colete(c,'#facc15','#d1d5db');
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  c.strokeStyle='#111827'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-8,-60); c.quadraticCurveTo(-4,-50,2,-48); c.stroke(); circ(c,2,-47,2.6); fs(c,'#e5e7eb','#374151',1);
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#3a2416'; el(c,-16,2,7,11); c.fill(); c.restore();
    circ(c,-15,-6,7); fs(c,'#3a2416','#1f1009',1);
    sobr(c,-1,-8.5,'#3a2416',0); sobr(c,12.5,-9,'#3a2416',0);
    bone(c,'#2563eb','#1e3a8a'); c.fillStyle='#fde047'; circ(c,-2,-18,2.6); c.fill(); });
  var aN=m>0?2.1+Math.sin(t*4)*.12:1.35+Math.sin(t*1.4)*.04; membro(c,-6,-56,aN,20,8.5,'#3b82f6',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]); c.rotate(m>0?.1:-.35);
  c.strokeStyle='#6b7280'; c.lineWidth=3; c.beginPath(); c.moveTo(0,6); c.lineTo(0,-30); c.stroke();
  c.save(); c.translate(0,-40); c.beginPath(); for(var k=0;k<8;k++){ var a=k/8*TAU+PI/8; c.lineTo(Math.cos(a)*14,Math.sin(a)*14); } c.closePath(); fs(c,lin(c,0,-14,0,14,'#f87171','#b91c1c'),'#fff',2);
  c.fillStyle='#fff'; c.font='900 8px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('PARE',0,.5); c.restore(); c.restore();
}
/* ---------- BEM-TE-VI, o guia (tic): flutua, ~75 px ---------- */
function bemtevi(c,t,m){
  var bob=Math.sin(t*2.2)*3, flap=Math.sin(t*11)*.55, ab=m*.35;
  c.save(); c.globalAlpha=.16; c.fillStyle='#000'; el(c,0,0,22,5); c.fill(); c.restore();
  c.translate(0,-30+bob);
  /* asa de trás (marrom) */
  c.save(); c.translate(-8,-32); c.rotate(-.5-flap); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-14,-18,-30,-22); c.quadraticCurveTo(-26,-8,-20,2); c.quadraticCurveTo(-10,6,0,4); c.closePath(); fs(c,lin(c,0,-20,-30,4,'#9a7a3a','#5e4420'),'#3f2c12',1.2); c.restore();
  /* cauda */
  c.save(); c.translate(-20,-22); c.rotate(.35+Math.sin(t*2.2)*.06); c.beginPath(); c.moveTo(0,-4); c.lineTo(-22,-10); c.lineTo(-24,2); c.lineTo(-2,5); c.closePath(); fs(c,lin(c,0,0,-24,0,'#8a6a2b','#5e4420'),'#3f2c12',1.2); c.strokeStyle='rgba(255,255,255,.2)'; c.lineWidth=1; c.beginPath(); c.moveTo(-4,-1); c.lineTo(-20,-5); c.stroke(); c.restore();
  /* corpo: barriga amarela, dorso oliva */
  el(c,0,-26,23,17); fs(c,rad(c,4,-32,26,'#fef08a','#f59e0b'),'#7a5a1e',1.5);
  c.save(); el(c,0,-26,23,17); c.clip(); c.fillStyle='#8a6a2b'; el(c,-4,-36,24,10); c.fill(); c.fillStyle='#6b4f1e'; el(c,-8,-39,16,5); c.fill(); c.restore();
  /* patinhas recolhidas */
  c.strokeStyle='#c2410c'; c.lineWidth=2.2; [[-2],[6]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],-12); c.lineTo(p[0]+1,-5); c.moveTo(p[0]-3,-4); c.lineTo(p[0]+1,-5); c.lineTo(p[0]+5,-4); c.stroke(); });
  /* asa da frente */
  c.save(); c.translate(-2,-30); c.rotate(-.35-flap*.9); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-14,-20,-32,-24); c.quadraticCurveTo(-28,-8,-22,4); c.quadraticCurveTo(-10,8,0,5); c.closePath(); fs(c,lin(c,0,-22,-32,5,'#b48a3c','#6b4f1e'),'#3f2c12',1.3);
  c.strokeStyle='rgba(255,240,180,.3)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-3,2); c.lineTo(-26,-18); c.moveTo(-4,3); c.lineTo(-22,0); c.stroke(); c.restore();
  /* cabeça: preta com a faixa branca da sobrancelha e garganta branca */
  c.save(); c.translate(18,-46); c.rotate(m>0?Math.sin(t*6)*.05:Math.sin(t*1.8)*.05);
  circ(c,0,0,14); fs(c,rad(c,-3,-3,15,'#4a3c30','#1f1915'),'#120d0a',1.4);
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(-13,3); c.quadraticCurveTo(-4,8,8,5); c.quadraticCurveTo(12,9,6,13); c.quadraticCurveTo(-6,14,-12,8); c.closePath(); c.fill();
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(-13,-3); c.quadraticCurveTo(0,-9,12,-5); c.lineTo(11,-1); c.quadraticCurveTo(0,-5,-12,1); c.closePath(); c.fill();
  c.fillStyle='#fde047'; el(c,-2,-10,4,1.6); c.fill();
  var pis=(t%3.6)<.12; olho(c,5,-1,3.4,4,'#1c1917',pis,false); c.fillStyle='rgba(244,114,128,.5)'; el(c,-1,6,3,1.6); c.fill();
  /* bico */
  c.beginPath(); c.moveTo(11,-1); c.lineTo(26,1-ab*3); c.lineTo(12,3); c.closePath(); fs(c,'#1f2937','#0b0f14',1);
  c.beginPath(); c.moveTo(12,3); c.lineTo(25,3+ab*6); c.lineTo(11,5+ab*2); c.closePath(); fs(c,'#374151','#0b0f14',1);
  if(m>.3){ c.fillStyle='#f87171'; el(c,15,3.5+ab*2,2.6,1.4); c.fill(); }
  c.restore();
  /* notinhas do canto quando fala */
  if(m>0) for(var k=0;k<3;k++){ var f=(t*.9+k/3)%1; c.save(); c.globalAlpha=1-f; c.fillStyle='#fde047'; c.strokeStyle='#92400e'; c.lineWidth=1; c.translate(36+f*22+Math.sin(k*2+t*5)*3,-62-f*26-k*6); el(c,0,2,2.8,2); c.fill(); c.stroke(); c.beginPath(); c.moveTo(2.4,2); c.lineTo(2.4,-7); c.lineTo(6,-8.5); c.stroke(); c.restore(); }
}
/* ---------- TUIUIÚ (clio): ~150 px, pernas longas ---------- */
function tuiuiu(c,t,m){
  sombra(c,24); var sw=Math.sin(t*1.6)*.03, ab=m*.4; c.scale(.8,.8);
  /* pernas pretas, articuladas */
  [[-10,-.06,true],[8,.05,false]].forEach(function(p){ var d=p[2]?.2:0; c.strokeStyle=esc('#2b2b2b',d); c.lineWidth=4; c.lineCap='round'; c.beginPath(); c.moveTo(p[0],-66); c.lineTo(p[0]-4,-36); c.lineTo(p[0]+2,-4); c.stroke();
    c.strokeStyle=esc('#3f3f46',d); c.lineWidth=2.6; c.beginPath(); c.moveTo(p[0]-6,-2); c.lineTo(p[0]+2,-4); c.lineTo(p[0]+10,-2); c.moveTo(p[0]+2,-4); c.lineTo(p[0]+3,0); c.stroke(); });
  c.save(); c.rotate(sw);
  /* cauda e asa de trás: penas pretas */
  c.beginPath(); c.moveTo(-18,-82); c.quadraticCurveTo(-36,-80,-46,-66); c.quadraticCurveTo(-32,-70,-20,-70); c.closePath(); fs(c,'#1f2937','#0b0f14',1.2);
  /* corpo branco */
  el(c,0,-92,34,25); fs(c,rad(c,-6,-104,40,'#ffffff','#cbd5e1'),'#64748b',1.5);
  /* asa branca com ponta preta */
  c.beginPath(); c.moveTo(10,-100); c.quadraticCurveTo(-10,-110,-30,-96); c.quadraticCurveTo(-36,-84,-24,-74); c.quadraticCurveTo(-8,-72,8,-82); c.closePath(); fs(c,lin(c,10,-100,-30,-74,'#f8fafc','#d1d5db'),'#64748b',1.2);
  c.beginPath(); c.moveTo(-18,-78); c.quadraticCurveTo(-30,-78,-38,-70); c.quadraticCurveTo(-30,-74,-16,-73); c.closePath(); fs(c,'#1f2937',null);
  c.strokeStyle='rgba(100,116,139,.45)'; c.lineWidth=1; [[-6,-100,-22,-90],[-2,-92,-20,-80]].forEach(function(l){ c.beginPath(); c.moveTo(l[0],l[1]); c.quadraticCurveTo((l[0]+l[2])/2,l[3]-6,l[2],l[3]); c.stroke(); });
  /* pescoço preto com a faixa vermelha */
  c.beginPath(); c.moveTo(14,-108); c.quadraticCurveTo(26,-128,24,-146); c.lineTo(36,-146); c.quadraticCurveTo(40,-124,28,-100); c.closePath(); fs(c,lin(c,14,-120,40,-120,'#374151','#0b0f14'),'#0b0f14',1.2);
  c.beginPath(); c.moveTo(13,-104); c.quadraticCurveTo(22,-100,30,-104); c.quadraticCurveTo(30,-112,22,-114); c.quadraticCurveTo(16,-112,13,-104); c.closePath(); fs(c,lin(c,13,-114,30,-104,'#f87171','#b91c1c'),'#7f1d1d',1);
  /* cabeça preta e bico comprido */
  c.save(); c.translate(32,-150); c.rotate(m>0?Math.sin(t*5)*.04:Math.sin(t*1.4)*.04);
  el(c,0,0,15,12.5); fs(c,rad(c,-4,-4,16,'#4b5563','#111827'),'#0b0f14',1.4);
  c.beginPath(); c.moveTo(11,-5); c.lineTo(50,4-ab*2); c.lineTo(12,2); c.closePath(); fs(c,lin(c,12,0,50,0,'#374151','#0b0f14'),'#0b0f14',1);
  c.beginPath(); c.moveTo(12,2); c.lineTo(48,7+ab*8); c.lineTo(12,6+ab*3); c.closePath(); fs(c,'#1f2937','#0b0f14',1);
  if(m>.3){ c.fillStyle='#f87171'; el(c,20,5+ab*3,4,1.6); c.fill(); }
  var pis=(t%4.1)<.12; olho(c,3,-2,3.6,4.2,'#3b2a1a',pis,true); c.fillStyle='rgba(244,114,128,.35)'; el(c,-4,6,3,1.6); c.fill();
  c.restore(); c.restore();
}
/* ---------- QUERO-QUERO (pedro): ~110 px ---------- */
function queroquero(c,t,m){
  sombra(c,22); var ab=m*.4, sw=Math.sin(t*1.8)*.03;
  [[-8,true],[8,false]].forEach(function(p){ var d=p[1]?.2:0; c.strokeStyle=esc('#e879a0',d); c.lineWidth=3; c.lineCap='round'; c.beginPath(); c.moveTo(p[0],-40); c.lineTo(p[0]-2,-20); c.lineTo(p[0]+1,-3); c.stroke(); c.lineWidth=2.2; c.beginPath(); c.moveTo(p[0]-6,-1); c.lineTo(p[0]+1,-3); c.lineTo(p[0]+8,-1); c.moveTo(p[0]+1,-3); c.lineTo(p[0]+2,0); c.stroke(); });
  c.save(); c.rotate(sw);
  c.beginPath(); c.moveTo(-20,-56); c.quadraticCurveTo(-40,-56,-46,-44); c.quadraticCurveTo(-34,-44,-22,-40); c.closePath(); fs(c,'#1f2937','#0b0f14',1.2);
  el(c,0,-54,30,22); fs(c,rad(c,-6,-64,34,'#b8b0a2','#6f6659'),'#4a4238',1.5);
  c.save(); el(c,0,-54,30,22); c.clip(); c.fillStyle='#f8fafc'; el(c,4,-42,30,14); c.fill(); c.fillStyle='#1f2937'; c.beginPath(); c.moveTo(0,-60); c.quadraticCurveTo(14,-62,28,-50); c.quadraticCurveTo(22,-42,8,-44); c.quadraticCurveTo(2,-50,0,-60); c.closePath(); c.fill(); c.restore();
  c.beginPath(); c.moveTo(8,-70); c.quadraticCurveTo(-10,-78,-26,-64); c.quadraticCurveTo(-28,-52,-14,-46); c.quadraticCurveTo(0,-48,10,-58); c.closePath(); fs(c,lin(c,8,-70,-26,-46,'#a39a8a','#6f6659'),'#4a4238',1.2);
  c.fillStyle='#b45309'; el(c,-2,-62,8,4); c.fill(); c.fillStyle='rgba(255,255,255,.35)'; el(c,-12,-54,7,2.6); c.fill();
  c.save(); c.translate(22,-84); c.rotate(m>0?Math.sin(t*5)*.05:Math.sin(t*1.6)*.05);
  circ(c,0,0,13); fs(c,rad(c,-3,-3,14,'#d6cfc2','#8c8577'),'#4a4238',1.4);
  c.fillStyle='#1f2937'; c.beginPath(); c.moveTo(-12,-5); c.quadraticCurveTo(0,-15,12,-6); c.quadraticCurveTo(6,-9,0,-8); c.quadraticCurveTo(-6,-9,-12,-5); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-10,-8); c.quadraticCurveTo(-22,-14,-30,-8); c.quadraticCurveTo(-20,-9,-12,-4); c.closePath(); c.fill();
  c.fillStyle='#1f2937'; c.beginPath(); c.moveTo(6,7); c.quadraticCurveTo(10,10,12,13); c.quadraticCurveTo(4,13,-2,9); c.closePath(); c.fill();
  c.fillStyle='rgba(220,38,38,.35)'; circ(c,4,-1,5); c.fill();
  var pis=(t%3.9)<.12; olho(c,4,-1,3.2,3.8,'#3b2a1a',pis,false);
  c.beginPath(); c.moveTo(11,0); c.lineTo(26,1-ab*2); c.lineTo(11,3); c.closePath(); fs(c,'#f0abfc','#7e22ce',1);
  c.beginPath(); c.moveTo(11,3); c.lineTo(25,3+ab*6); c.lineTo(11,5+ab*2); c.closePath(); fs(c,'#e879f9','#7e22ce',1);
  c.fillStyle='#1f2937'; c.beginPath(); c.moveTo(20,.5); c.lineTo(26,1); c.lineTo(21,2.5); c.fill();
  c.restore(); c.restore();
}
/* ---------- MOTORISTA DE ÔNIBUS (francisco) ---------- */
function motorista(c,t,m){
  sombra(c,20); var o={pele:'#c68b59',peleS:'#a26a3c',olho:'#2a160b'};
  membro(c,7,-56,.2+Math.sin(t*1.4)*.03,20,8.5,'#bfdbfe',o.pele,5);
  pernas(c,'#1e3a8a','#111827',0);
  torso(c,'#dbeafe','#93c5fd');
  c.beginPath(); c.moveTo(-6,-63); c.lineTo(6,-63); c.lineTo(0,-50); c.closePath(); fs(c,'#f8fafc','rgba(0,0,0,.2)',1);
  c.beginPath(); c.moveTo(-2,-61); c.lineTo(2,-61); c.lineTo(3,-44); c.lineTo(0,-40); c.lineTo(-3,-44); c.closePath(); fs(c,'#1e3a8a','#0f172a',1);
  rr(c,4,-50,9,6,1.2); fs(c,'#fde68a','#92400e',1); c.fillStyle='#2563eb'; c.fillRect(5.5,-48.5,6,3);
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#2c1a10'; el(c,-16,2,7,11); c.fill(); c.restore();
    bigode(c,'#3a2416'); sobr(c,-1,-8.5,'#2c1a10',0); sobr(c,12.5,-9,'#2c1a10',0);
    bone(c,'#1e3a8a','#0f172a'); c.fillStyle='#fde047'; rr(c,-6,-19,10,4,1); c.fill(); });
  var aN=m>0?2.2+Math.sin(t*4)*.15:.95+Math.sin(t*1.4)*.04; membro(c,-6,-56,aN,20,8.5,'#bfdbfe',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0]+2,mh[1]-2); c.rotate(m>0?Math.sin(t*4)*.3:.2);
  circ(c,0,0,12); c.strokeStyle='#111827'; c.lineWidth=4.5; c.stroke(); c.strokeStyle='#4b5563'; c.lineWidth=2; c.stroke();
  c.strokeStyle='#111827'; c.lineWidth=3; c.beginPath(); c.moveTo(-10,0); c.lineTo(10,0); c.moveTo(0,0); c.lineTo(0,10); c.stroke(); circ(c,0,0,3.5); fs(c,'#374151','#111827',1); c.restore();
}
/* ---------- PEDREIRO (joao) ---------- */
function pedreiro(c,t,m){
  sombra(c,20); var o={pele:'#8d5a3b',peleS:'#6e4128',olho:'#2a160b'};
  var aF=.55; membro(c,7,-56,aF,20,8.5,'#9ca3af',o.pele,5);
  var mf=maoEm(7,-56,aF,20); c.save(); c.translate(mf[0]+2,mf[1]-2); c.rotate(-.2); rr(c,-9,-6,18,11,1.5); fs(c,lin(c,0,-6,0,5,'#f97316','#c2410c'),'#7c2d12',1.2); c.strokeStyle='rgba(255,255,255,.25)'; c.lineWidth=1; c.beginPath(); c.moveTo(-9,-1); c.lineTo(9,-1); c.stroke(); c.restore();
  pernas(c,'#1e40af','#3f2a14',0);
  torso(c,'#d1d5db','#9ca3af'); colete(c,'#f97316','#e5e7eb');
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#1c1008'; el(c,-16,2,7,11); c.fill(); c.restore();
    sobr(c,-1,-9,'#1c1008',0); sobr(c,12.5,-9.5,'#1c1008',0);
    c.save(); c.translate(1,-9); c.beginPath(); c.moveTo(-22,3); c.bezierCurveTo(-22,-22,22,-22,22,3); c.closePath(); fs(c,lin(c,0,-20,0,3,'#fde047','#eab308'),'#a16207',1.3);
    rr(c,-25,1,54,5,2.5); fs(c,'#facc15','#a16207',1.2); rr(c,-3,-18,6,18,3); fs(c,'#fde68a','#ca8a04',1);
    c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2; c.beginPath(); c.arc(0,0,15,1.15*PI,1.4*PI); c.stroke(); c.restore(); });
  var aN=m>0?1.15+Math.sin(t*4)*.12:.7+Math.sin(t*1.4)*.04; membro(c,-6,-56,aN,20,8.5,'#9ca3af',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]); c.rotate(m>0?-1.5:-1.1);
  c.strokeStyle='#92400e'; c.lineWidth=4; c.beginPath(); c.moveTo(0,0); c.lineTo(0,-12); c.stroke(); c.strokeStyle='#6b7280'; c.lineWidth=2; c.beginPath(); c.moveTo(0,-12); c.lineTo(4,-18); c.stroke();
  c.beginPath(); c.moveTo(-10,-18); c.lineTo(18,-18); c.lineTo(4,-36); c.closePath(); fs(c,lin(c,-10,-18,18,-36,'#e5e7eb','#9ca3af'),'#4b5563',1.1); c.fillStyle='#d1d5db'; el(c,2,-20,8,3); c.fill(); c.restore();
}
/* ---------- ENTREGADOR (engenheira) ---------- */
function entregador(c,t,m){
  sombra(c,20); var o={pele:'#b97a4e',peleS:'#93572f',olho:'#3b2112'};
  c.save(); c.translate(-24,-48); c.rotate(.04); rr(c,-14,-16,28,32,4); fs(c,lin(c,-14,-16,14,16,'#f87171','#b91c1c'),'#7f1d1d',1.3); c.fillStyle='#fecaca'; rr(c,-10,-12,20,6,2); c.fill(); c.fillStyle='#7f1d1d'; c.fillRect(-14,2,28,2.5); c.strokeStyle='#fde68a'; c.lineWidth=1.5; c.beginPath(); c.moveTo(-8,9); c.lineTo(8,9); c.stroke(); c.restore();
  c.strokeStyle='#7f1d1d'; c.lineWidth=3.5; c.beginPath(); c.moveTo(-9,-62); c.lineTo(-12,-30); c.moveTo(9,-62); c.lineTo(6,-30); c.stroke();
  membro(c,7,-56,.2+Math.sin(t*1.4)*.03,20,8.5,'#dc2626',o.pele,5);
  pernas(c,'#1f2937','#111827',0);
  torso(c,'#ef4444','#b91c1c');
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); c.fillStyle='#fde68a'; c.fillRect(-16,-40,32,3); c.fillStyle='#fff'; c.beginPath(); c.moveTo(-6,-63); c.lineTo(6,-63); c.lineTo(0,-54); c.closePath(); c.fill(); c.restore();
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#2c1a10'; el(c,-16,3,7,10); c.fill(); c.restore();
    sobr(c,-1,-8.5,'#2c1a10',0); sobr(c,12.5,-9,'#2c1a10',0);
    c.save(); c.translate(1,-6); c.beginPath(); c.moveTo(-23,8); c.bezierCurveTo(-24,-24,24,-24,23,8); c.lineTo(23,12); c.lineTo(16,12); c.lineTo(16,6); c.lineTo(-16,6); c.lineTo(-16,12); c.lineTo(-23,12); c.closePath(); fs(c,lin(c,0,-20,0,10,'#f87171','#b91c1c'),'#7f1d1d',1.3);
    c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2; c.beginPath(); c.arc(0,-2,15,1.15*PI,1.4*PI); c.stroke();
    c.save(); c.globalAlpha=.35; c.fillStyle='#bae6fd'; rr(c,-18,-4,40,9,4); c.fill(); c.restore(); c.strokeStyle='#7f1d1d'; c.lineWidth=1.5; rr(c,-18,-4,40,9,4); c.stroke(); c.fillStyle='#fde047'; c.fillRect(-10,-14,20,3); c.restore(); });
  var aN=m>0?1.0+Math.sin(t*3)*.08:.8; membro(c,-6,-56,aN,20,8.5,'#dc2626',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0]+4,mh[1]-8); c.rotate(-.1); rr(c,-11,-9,22,18,2); fs(c,lin(c,0,-9,0,9,'#d6a265','#9a6a3a'),'#5b3a1e',1.2); c.fillStyle='#fde68a'; c.fillRect(-11,-2,22,3); c.fillRect(-1.5,-9,3,18); c.restore();
}
/* ---------- GARI (fotografo) com a lixeira ao lado ---------- */
function gari(c,t,m){
  sombra(c,20); c.save(); c.translate(42,0); sombra(c,16,.15); c.restore(); var o={pele:'#f0c39a',peleS:'#cf9a70',olho:'#2a1a10'};
  membro(c,7,-56,.2,20,8.5,'#f97316',o.pele,5);
  pernas(c,'#ea580c','#1f2937',0);
  torso(c,'#fb923c','#ea580c');
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); [-44,-34].forEach(function(y){ c.fillStyle='#e5e7eb'; c.fillRect(-16,y,32,4); c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(-16,y,32,1.2); }); c.restore();
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#3a2416'; el(c,-17,2,6,10); c.fill(); c.restore();
    sobr(c,-1,-9,'#3a2416',-.4); sobr(c,12.5,-9.5,'#3a2416',.4); bone(c,'#f97316','#c2410c'); });
  c.save(); c.translate(42,0); c.fillStyle='#1f2937'; circ(c,-9,-3,3.5); c.fill(); circ(c,9,-3,3.5); c.fill();
  c.beginPath(); c.moveTo(-14,-46); c.lineTo(14,-46); c.lineTo(11,-6); c.lineTo(-11,-6); c.closePath(); fs(c,lin(c,-14,0,14,0,'#4ade80','#15803d'),'#14532d',1.3);
  rr(c,-16,-52,32,7,2.5); fs(c,lin(c,0,-52,0,-45,'#86efac','#16a34a'),'#14532d',1.2); c.strokeStyle='#14532d'; c.lineWidth=2.5; c.beginPath(); c.moveTo(-12,-52); c.lineTo(-18,-70); c.lineTo(18,-70); c.lineTo(12,-52); c.stroke();
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(-9,-40,3,28); c.fillStyle='#fde047'; rr(c,-6,-34,12,8,1.5); c.fill(); c.restore();
  var aN=1.1+(m>0?Math.sin(t*3)*.1:0); membro(c,-6,-56,aN,20,8.5,'#f97316',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]); c.rotate(.25+(m>0?Math.sin(t*3)*.08:0));
  c.strokeStyle='#92400e'; c.lineWidth=4; c.beginPath(); c.moveTo(0,-30); c.lineTo(0,34); c.stroke(); c.strokeStyle='#d97706'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-1,-28); c.lineTo(-1,32); c.stroke();
  c.beginPath(); c.moveTo(-5,34); c.lineTo(5,34); c.lineTo(12,58); c.lineTo(-14,58); c.closePath(); fs(c,lin(c,0,34,0,58,'#fde68a','#d97706'),'#92400e',1.2); c.strokeStyle='#b45309'; c.lineWidth=1; for(var k=0;k<5;k++){ c.beginPath(); c.moveTo(-3+k*1.8,38); c.lineTo(-11+k*5,58); c.stroke(); } c.fillStyle='#dc2626'; rr(c,-6,32,12,4,1.5); c.fill(); c.restore();
}
/* ---------- SEU JOSÉ DA PADARIA (locutor) ---------- */
function seuJose(c,t,m){
  sombra(c,20); var o={pele:'#f1c6a0',peleS:'#d39b74',olho:'#2a1a10'};
  var aF=m>0?.9+Math.sin(t*4)*.2:.25; membro(c,7,-56,aF,20,8.5,'#bfdbfe',o.pele,5);
  pernas(c,'#1f2937','#3f2a14',0);
  torso(c,'#bfdbfe','#60a5fa');
  c.beginPath(); c.moveTo(-10,-56); c.lineTo(10,-56); c.lineTo(14,-24); c.quadraticCurveTo(0,-20,-14,-24); c.closePath(); fs(c,lin(c,-10,-56,10,-24,'#ffffff','#e2e8f0'),'#94a3b8',1.2);
  c.strokeStyle='#94a3b8'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-10,-56); c.lineTo(-4,-63); c.moveTo(10,-56); c.lineTo(4,-63); c.stroke(); c.strokeStyle='#cbd5e1'; c.beginPath(); c.moveTo(-14,-30); c.lineTo(14,-30); c.stroke();
  c.fillStyle='#fbbf24'; circ(c,0,-40,2.2); c.fill();
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#78716c'; el(c,-16,3,7,10); c.fill(); c.restore();
    bigode(c,'#57534e'); sobr(c,-1,-9.5,'#57534e',-.5); sobr(c,12.5,-10,'#57534e',.5);
    c.save(); c.translate(1,-13); rr(c,-19,-4,38,9,3); fs(c,lin(c,0,-4,0,5,'#ffffff','#d1d5db'),'#9ca3af',1.2);
    c.beginPath(); c.moveTo(-18,-3); c.bezierCurveTo(-26,-18,-12,-26,-6,-18); c.bezierCurveTo(-2,-28,10,-28,12,-18); c.bezierCurveTo(20,-24,28,-14,18,-3); c.closePath(); fs(c,lin(c,0,-26,0,-3,'#ffffff','#e5e7eb'),'#9ca3af',1.2); c.restore(); });
  var aN=m>0?1.0+Math.sin(t*3)*.06:.85; membro(c,-6,-56,aN,20,8.5,'#bfdbfe',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0]+6,mh[1]-6);
  el(c,0,2,22,6); fs(c,lin(c,0,-4,0,8,'#d1d5db','#6b7280'),'#374151',1.1);
  [[-11,-4,8,5],[2,-6,9,5.5],[12,-3,7,4.5]].forEach(function(p){ el(c,p[0],p[1],p[2],p[3]); fs(c,rad(c,p[0]-2,p[1]-2,p[2],'#fde68a','#c2762a'),'#8a4f1d',1); c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=1; c.beginPath(); c.moveTo(p[0]-p[2]*.5,p[1]-1); c.quadraticCurveTo(p[0],p[1]-3.5,p[0]+p[2]*.5,p[1]-1); c.stroke(); });
  c.restore();
}
/* ---------- DONA ANTÔNIA (vovo) ---------- */
function donaAntonia(c,t,m){
  sombra(c,20); var o={pele:'#d9a072',peleS:'#b47b4c',olho:'#3f2210',cilio:true,oculos:'#b45309'};
  circ(c,-12,-99,10); fs(c,rad(c,-12,-99,11,'#6b4a2b','#2a160b'),'#1f1009',1.4); c.strokeStyle='#fbbf24'; c.lineWidth=2.4; c.beginPath(); c.moveTo(-23,-104); c.lineTo(-3,-97); c.stroke();
  membro(c,7,-56,.2,19,8.5,'#f472b6',o.pele,5);
  pernas(c,'#f3d9c4','#7c2d12',-1);
  c.beginPath(); c.moveTo(-14,-36); c.lineTo(14,-36); c.lineTo(19,-12); c.quadraticCurveTo(0,-7,-19,-12); c.closePath(); fs(c,lin(c,-18,-36,18,-10,'#4ade80','#15803d'));
  torso(c,'#f9a8d4','#db2777',-63,-33);
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); for(var i=0;i<9;i++){ var fx=-12+hash(i*3.1)*24, fy=-60+hash(i*5.7)*26; c.fillStyle='rgba(255,255,255,.75)'; for(var k=0;k<5;k++){ var a=k/5*TAU; circ(c,fx+Math.cos(a)*2.2,fy+Math.sin(a)*2.2,1.3); c.fill(); } c.fillStyle='#fde047'; circ(c,fx,fy,1.1); c.fill(); } c.restore();
  c.beginPath(); c.moveTo(-6,-63); c.lineTo(6,-63); c.lineTo(0,-56); c.closePath(); fs(c,'#fff','rgba(0,0,0,.2)',1);
  cabeca1(c,o,t,m,function(c){
    cab(c,'#4a3222',-8,7); c.strokeStyle='rgba(203,213,225,.7)'; c.lineWidth=1; for(var w=0;w<3;w++){ c.beginPath(); c.arc(0,4,18-w*2.5,1.2*PI,1.55*PI); c.stroke(); }
    sobr(c,-1,-9.5,'#4a3222',0); sobr(c,12.5,-10,'#4a3222',0); c.fillStyle='#fbbf24'; circ(c,-14,10,1.8); c.fill(); }, null);
  var aN=m>0?.95+Math.sin(t*2.5)*.08:.75; var mh=maoEm(-6,-56,aN,19);
  c.save(); c.translate(mh[0]+4,mh[1]+4); c.strokeStyle='#92400e'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-6,-6); c.quadraticCurveTo(0,-18,6,-6); c.stroke();
  c.beginPath(); c.moveTo(-12,-6); c.lineTo(12,-6); c.lineTo(10,16); c.lineTo(-10,16); c.closePath(); fs(c,lin(c,0,-6,0,16,'#fde68a','#d97706'),'#92400e',1.2);
  el(c,-4,-8,5,3.6); fs(c,'#e9b36f','#8a4f1d',1); c.fillStyle='#16a34a'; [[4,-10],[8,-8]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],-4); c.quadraticCurveTo(p[0]-5,p[1],p[0]+1,p[1]-4); c.quadraticCurveTo(p[0]+5,p[1],p[0],-4); c.fill(); });
  c.strokeStyle='rgba(146,64,14,.4)'; c.lineWidth=1; c.beginPath(); c.moveTo(-9,2); c.lineTo(9,2); c.stroke(); c.restore();
  membro(c,-6,-56,aN,19,8.5,'#f472b6',o.pele,5);
}

var NOVOS={lucia:agente,announcer:motorista,tic:bemtevi,clio:tuiuiu,pedro:queroquero,francisco:motorista,joao:pedreiro,engenheira:entregador,fotografo:gari,locutor:seuJose,vovo:donaAntonia};
var morador0=A.morador;
A.morador=function(c,tipo,x,y,t,dir,falando){
  var f=NOVOS[tipo]; if(!f){ if(morador0) morador0(c,tipo,x,y,t,dir,falando); return; }
  t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round';
  if(tipo!=='tic'&&tipo!=='clio'&&tipo!=='pedro'){ var r=Math.sin(t*2.4); c.translate(0,-r*.4); c.scale(1-r*.006,1+r*.008); }
  f(c,t,fala(t,falando)); c.restore();
};
A.MORADORES=(A.MORADORES||[]).concat(Object.keys(NOVOS).filter(function(k){ return (A.MORADORES||[]).indexOf(k)<0; }));
})();
