/* ============================================================
   HIS3_jogo_arte2.js — moradores que perguntam, Conde Rabisco,
   cenas novas (vila, bosque, biblioteca) e o mapa-livro.
   Depende de HIS3_jogo_arte.js (A.ING: utilitários de cor/traço).
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho, boca=I.boca;

/* ---------- peças comuns dos moradores ---------- */
function fala(t,falando){ if(!falando) return 0; var a=Math.abs(Math.sin(t*13)), b=Math.sin(t*2.7)>-.6?1:.25; return a*b; }
function bocaFala(c,x,y,m,w){
  if(m<.12){ boca(c,'smile',x,y,1.1); return; }
  c.beginPath(); c.ellipse(x,y+1,w*(.75+m*.25),1.2+m*4.2,0,0,TAU); fs(c,'#8f2d2d','#5c1b1b',1.1);
  c.save(); c.clip(); c.fillStyle='#f58a9b'; el(c,x,y+2.5+m*3.2,w*.6,2.4); c.fill(); c.restore();
}
function membro(c,x,y,a,len,w,cor,maoCor,maoR){
  c.save(); c.translate(x,y); c.rotate(-a); rr(c,-w/2,-2,w,len+2,w/2); fs(c,cor);
  if(maoCor){ circ(c,0,len,maoR||w*.6); fs(c,maoCor); } c.restore();
}
function maoEm(x,y,a,len){ return [x+Math.sin(a)*len, y+Math.cos(a)*len]; }
function pernasAd(c,meia,sap,afast,longeEsc){
  [[-6-afast,true],[5+afast,false]].forEach(function(p){ var d=p[1]?.15:0; rr(c,p[0]-4.6,-26,9.2,24,4.6); fs(c,esc(meia,d)); el(c,p[0]+2.5,-1.8,8,4.2); fs(c,esc(sap,d)); c.fillStyle='rgba(255,255,255,.2)'; el(c,p[0]+3.5,-3.6,3.6,1.2); c.fill(); });
}
/* cabeça de adulto: o = {pele,peleS,olho,cilio,fechados} ; origem no centro */
function cabecaAd(c,o,t,m,extra){
  if(o.tras) o.tras(c,t);
  el(c,1,0,22,20.5); fs(c,rad(c,3,-1,23,cla(o.pele,.25),o.pele));
  c.save(); el(c,1,0,22,20.5); c.clip(); c.fillStyle=o.peleS; c.globalAlpha=.32; el(c,-19,5,11,22); c.fill(); c.restore();
  var pis=(t%4.3)<.12;
  if(o.fechados){ c.strokeStyle='#2a1610'; c.lineWidth=1.9; c.beginPath(); c.arc(-1,2,3.6,1.12*PI,1.88*PI); c.stroke(); c.beginPath(); c.arc(12.5,1.5,3.2,1.12*PI,1.88*PI); c.stroke(); }
  else { olho(c,-1,1,3.7,4.9,o.olho,pis,o.cilio); olho(c,12.5,.5,3.3,4.6,o.olho,pis,o.cilio); }
  c.fillStyle='rgba(244,114,128,.4)'; el(c,-7,9.5,4.6,2.8); c.fill(); el(c,18,9,3.2,2.6); c.fill();
  el(c,8.5,6.5,3.4,2.8); fs(c,cla(o.pele,.05),esc(o.peleS,.1),1);
  if(!o.semBoca) bocaFala(c,7.5,12.6,m,3.4);
  if(o.frente) o.frente(c,t);
  el(c,1,0,22,20.5); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  el(c,-14,4,3.8,4.8); fs(c,o.pele); c.strokeStyle=o.peleS; c.lineWidth=1; c.beginPath(); c.arc(-13.8,4.3,2,-.5*PI,.6*PI); c.stroke();
  if(extra) extra(c,t,m);
}
function sobrancelha(c,x,y,cor,inc){ c.strokeStyle=cor; c.lineWidth=2; c.beginPath(); c.moveTo(x-3.5,y+(inc||0)); c.quadraticCurveTo(x,y-1.8,x+3.5,y-(inc||0)); c.stroke(); }
function nota(c,x,y,s,cor){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle=cor; c.strokeStyle=cor; c.lineWidth=1.6; el(c,0,0,3.6,2.7); c.fill(); c.beginPath(); c.moveTo(3.2,-.5); c.lineTo(3.2,-13); c.quadraticCurveTo(7,-11,8,-7); c.stroke(); c.restore(); }

/* ---------- arauto (crier) ---------- */
function crier(c,t,m){
  var o={pele:'#f6cfae',peleS:'#d9a27c',olho:'#3b2a20'};
  /* braço de trás com o pergaminho */
  var aF=m>0?.35+Math.sin(t*3)*.08:.25; membro(c,7,-56,aF,21,8.5,esc('#c0392b',.2),o.pele,5);
  var mh=maoEm(7,-56,aF,21); c.save(); c.translate(mh[0]+2,mh[1]); c.rotate(.1);
  c.beginPath(); c.moveTo(-8,0); c.lineTo(8,0); c.lineTo(9,28+Math.sin(t*2)*1.5); c.quadraticCurveTo(0,31,-9,28); c.closePath(); fs(c,lin(c,0,0,0,30,'#fff8e7','#ead6ad'),'#a0763f',1.2);
  c.strokeStyle='rgba(120,80,40,.45)'; c.lineWidth=1; for(var i=0;i<4;i++){ c.beginPath(); c.moveTo(-5.5,7+i*5); c.lineTo(5.5-(i===3?5:0),7+i*5); c.stroke(); }
  rr(c,-10,-4,20,7,3.5); fs(c,lin(c,0,-4,0,3,'#f6e7c4','#c9a46a'),'#a0763f',1.1); c.fillStyle='#b91c1c'; circ(c,0,29,2.6); c.fill(); c.restore();
  pernasAd(c,'#f3f4f6','#1f2937',0);
  c.fillStyle='#fbbf24'; rr(c,-8.5,-5,5,3,1); c.fill(); rr(c,4.5,-5,5,3,1); c.fill();
  /* casaco */
  c.beginPath(); c.moveTo(-14,-60); c.quadraticCurveTo(0,-65,14,-60); c.lineTo(19,-17); c.quadraticCurveTo(0,-12,-19,-17); c.closePath(); fs(c,lin(c,-15,-62,15,-14,'#e05246','#9b2a20'));
  c.strokeStyle='#f6c445'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-18.5,-17.5); c.quadraticCurveTo(0,-12.6,18.5,-17.5); c.stroke(); c.beginPath(); c.moveTo(3,-60); c.lineTo(5,-15); c.stroke();
  rr(c,-15,-36,30,5,2); fs(c,'#2d1b12'); rr(c,1,-37,7,7,1.5); fs(c,'#fbbf24','#b7791f',1);
  [-52,-45,-27].forEach(function(by){ circ(c,9,by,2); fs(c,'#fbbf24','#b7791f',.8); });
  c.fillStyle='#fff'; [[-2,-60,5],[3,-58,5],[0,-54,4.5],[5,-53,3.8]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,'#ffffff','rgba(0,0,0,.25)',1); });
  /* cabeça */
  c.save(); c.translate(1,-82);
  o.frente=function(c){ c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#b8bec8'; el(c,-19,0,8,13); c.fill(); c.restore(); };
  cabecaAd(c,o,t,m,function(c){
    var mv=m*1.5; c.fillStyle='#6b4226'; c.beginPath(); c.moveTo(8,8+mv*.3); c.quadraticCurveTo(0,6,-4,10); c.quadraticCurveTo(-6,13,-9,11); c.quadraticCurveTo(-4,16,2,12); c.quadraticCurveTo(6,10,8,10); c.quadraticCurveTo(11,10,15,13); c.quadraticCurveTo(21,15,22,10); c.quadraticCurveTo(19,12,17,9); c.quadraticCurveTo(13,6,8,8); c.fill();
    sobrancelha(c,-1,-8,'#6b7280',-.4); sobrancelha(c,12.5,-8.5,'#6b7280',.4);
    /* tricórnio */
    c.save(); c.translate(0,-12); c.rotate(-.06);
    el(c,0,-8,16,11); fs(c,lin(c,0,-19,0,2,'#2e3d7c','#141c3f'));
    c.beginPath(); c.moveTo(-31,-1); c.quadraticCurveTo(-26,-17,-12,-13); c.quadraticCurveTo(0,-23,13,-13); c.quadraticCurveTo(27,-16,31,-1); c.quadraticCurveTo(0,-8,-31,-1); c.closePath(); fs(c,lin(c,0,-20,0,0,'#34448a','#18224a'));
    c.strokeStyle='#f6c445'; c.lineWidth=2; c.beginPath(); c.moveTo(-30,-2); c.quadraticCurveTo(-26,-16,-12,-13); c.quadraticCurveTo(0,-22,13,-13); c.quadraticCurveTo(27,-15,30,-2); c.stroke();
    c.save(); c.translate(-6,-16); c.rotate(-.7+Math.sin(t*3)*.08); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-4,-14,-2,-24); c.quadraticCurveTo(6,-14,3,0); c.closePath(); fs(c,lin(c,0,-24,0,0,'#fecaca','#dc2626'),'#991b1b',1); c.restore();
    c.restore();
  });
  c.restore();
  /* braço da frente com o sino */
  var aN=m>0?1.1+Math.sin(t*9)*.35:.35+Math.sin(t*2)*.05; membro(c,-6,-56,aN,21,8.5,'#c0392b',o.pele,5);
  var mb=maoEm(-6,-56,aN,21); c.save(); c.translate(mb[0],mb[1]); c.rotate(-aN+.4+(m>0?Math.sin(t*14)*.4:0));
  rr(c,-1.8,-1,3.6,8,1.5); fs(c,'#7c4a25'); c.translate(0,8);
  c.beginPath(); c.moveTo(-3,0); c.quadraticCurveTo(-4,7,-9,12); c.lineTo(9,12); c.quadraticCurveTo(4,7,3,0); c.closePath(); fs(c,lin(c,-9,0,9,12,'#fde68a','#c48a19'),'#8a5a12',1.1);
  c.fillStyle='rgba(255,255,255,.6)'; el(c,-3,6,1.2,3.5); c.fill(); c.fillStyle='#8a5a12'; circ(c,0,13.5,2.4); c.fill(); c.restore();
  if(m>0){ c.save(); c.strokeStyle='rgba(253,224,71,.8)'; c.lineWidth=2; for(var k=0;k<3;k++){ c.beginPath(); c.arc(mb[0],mb[1]+14,14+k*6+Math.sin(t*14)*2,-.9,-.2); c.stroke(); } c.restore(); }
}

/* ---------- fada madrinha (godmother) ---------- */
function godmother(c,t,m){
  var fl=-8+Math.sin(t*2)*4;
  c.save(); c.globalAlpha=.16+.04*Math.sin(t*2); c.fillStyle='#000'; el(c,0,1.5,22,5); c.fill(); c.restore();
  brilho(c,0,-55,70,'rgba(221,214,254,.55)',.6);
  c.translate(0,fl);
  /* asinhas */
  var ab=Math.sin(t*10)*.18; [[-1,.65],[1,.5]].forEach(function(w){ c.save(); c.translate(-10,-60); c.rotate(-.5+w[0]*.25+ab*w[0]); c.globalAlpha=w[1]; c.beginPath(); c.ellipse(-12,-10,14,8,-.5,0,TAU); fs(c,lin(c,-24,-18,0,0,'#f0f9ff','#a5f3fc'),'rgba(103,232,249,.9)',1.2); c.beginPath(); c.ellipse(-11,4,10,6,.4,0,TAU); fs(c,'#e0f2fe','rgba(103,232,249,.9)',1.2); c.restore(); });
  /* braço de trás */
  membro(c,7,-56,.5,19,9,'#8b5cf6','#f7d6c0',5);
  /* vestido sino */
  c.beginPath(); c.moveTo(-13,-62); c.quadraticCurveTo(0,-67,13,-62); c.bezierCurveTo(18,-40,26,-20,30,-4);
  for(var i=0;i<6;i++){ var x0=30-i*10; c.quadraticCurveTo(x0-5,1,x0-10,-4); }
  c.bezierCurveTo(-26,-20,-18,-40,-13,-62); c.closePath(); fs(c,lin(c,-25,-60,25,0,'#c4b5fd','#6d28d9'));
  c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(-6,-64); c.lineTo(0,-64); c.lineTo(-10,2); c.lineTo(-18,2); c.fill(); c.restore();
  for(var s=0;s<6;s++){ var a=.5+.5*Math.sin(t*3+s*1.7); c.save(); c.globalAlpha=.4+.6*a; cintila(c,-18+hash(s)*36,-40+hash(s+4)*34,1.6+a*1.2,'#fff'); c.restore(); }
  c.beginPath(); c.moveTo(-14,-42); c.quadraticCurveTo(0,-38,14,-42); c.lineTo(15,-37); c.quadraticCurveTo(0,-33,-15,-37); c.closePath(); fs(c,'#f9a8d4','#be185d',1);
  /* capuz (atrás da cabeça) e laço */
  c.save(); c.translate(1,-82);
  cabecaAd(c,{pele:'#f7d6c0',peleS:'#dfae92',olho:'#3b5b8a',cilio:true,fechados:m<.12,
    tras:function(c){ c.beginPath(); c.moveTo(-4,-30); c.bezierCurveTo(14,-32,27,-18,25,2); c.quadraticCurveTo(24,16,16,22); c.lineTo(-22,22); c.bezierCurveTo(-32,8,-30,-22,-4,-30); c.closePath(); fs(c,lin(c,-28,-30,24,24,'#c7dcff','#4f7fe0')); },
    frente:function(c){ c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#f5f5f4'; [[-14,-10,7],[-6,-15,7],[3,-16,6.5],[11,-14,6],[17,-10,5]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,'#f8fafc','#cbd5e1',1); }); c.restore(); }},t,m,function(c){
      c.beginPath(); c.moveTo(-21,14); c.bezierCurveTo(-28,-14,-10,-27,4,-25); c.bezierCurveTo(16,-24,24,-14,24,-2); c.strokeStyle='#dbeafe'; c.lineWidth=3; c.stroke(); c.strokeStyle='rgba(59,130,246,.6)'; c.lineWidth=1; c.stroke();
      sobrancelha(c,-1,-8.5,'#cbd5e1',0); sobrancelha(c,12.5,-9,'#cbd5e1',0); });
  c.restore();
  c.save(); c.translate(2,-61); c.fillStyle='#ec4899'; c.beginPath(); c.moveTo(0,0); c.lineTo(-8,-5); c.lineTo(-8,5); c.closePath(); fs(c,'#f472b6','#be185d',1); c.beginPath(); c.moveTo(0,0); c.lineTo(8,-5); c.lineTo(8,5); c.closePath(); fs(c,'#f472b6','#be185d',1); circ(c,0,0,2.6); fs(c,'#db2777'); c.restore();
  /* braço da frente com a varinha */
  var aN=m>0?-2.2+Math.sin(t*5)*.25:1.05+Math.sin(t*2)*.08; membro(c,-6,-56,aN,19,9,'#a78bfa','#f7d6c0',5);
  var mh=maoEm(-6,-56,aN,19); c.save(); c.translate(mh[0],mh[1]); c.rotate(m>0?-.25+Math.sin(t*5)*.2:.85);
  c.strokeStyle='#f8fafc'; c.lineWidth=2.6; c.beginPath(); c.moveTo(0,2); c.lineTo(0,-20); c.stroke(); c.strokeStyle='#c4b5fd'; c.lineWidth=1; c.stroke();
  var pu=1+Math.sin(t*6)*.12+(m>0?.25:0); brilho(c,0,-24,16*pu,'rgba(254,249,195,.95)',.85); A.estrela(c,0,-24,7*pu,'#fde047',t); A.estrela(c,0,-24,3,'#fff',t);
  c.restore();
  if(m>0){ for(var k=0;k<5;k++){ var f=(t*1.2+k/5)%1; c.save(); c.globalAlpha=1-f; cintila(c,mh[0]+Math.sin(k*3+t*3)*14,mh[1]-30-f*30,3*(1-f)+1,k%2?'#fde047':'#fff'); c.restore(); } }
}

/* ---------- coruja sábia (owl) sobre um toco ---------- */
function owl(c,t,m){
  sombra(c,30,.25);
  /* toco */
  c.beginPath(); c.moveTo(-26,-40); c.lineTo(-24,-6); c.quadraticCurveTo(-34,0,-36,0); c.lineTo(36,0); c.quadraticCurveTo(32,-2,24,-6); c.lineTo(26,-40); c.closePath(); fs(c,lin(c,-26,0,26,0,'#9a6a3c','#5b3a1e'));
  c.strokeStyle='rgba(40,20,8,.45)'; c.lineWidth=1.4; [-16,-6,6,16].forEach(function(x,i){ c.beginPath(); c.moveTo(x,-38); c.quadraticCurveTo(x+(i%2?3:-3),-20,x,-4); c.stroke(); });
  el(c,0,-40,26,7); fs(c,lin(c,0,-47,0,-33,'#e8c48f','#c79a5f'),'#5b3a1e',1.4);
  c.strokeStyle='rgba(120,70,30,.5)'; c.lineWidth=1; el(c,0,-40,17,4.4); c.stroke(); el(c,0,-40,8,2); c.stroke();
  c.fillStyle='#6fbf5b'; el(c,-20,-38,7,3); c.fill(); el(c,22,-37,5,2.4); c.fill();
  /* coruja */
  var bob=Math.sin(t*2)*1, inc=m>0?Math.sin(t*4)*.05:0;
  c.save(); c.translate(0,-44+bob); c.rotate(inc);
  [-8,8].forEach(function(x){ c.fillStyle='#f59e0b'; for(var k=-1;k<=1;k++){ el(c,x+k*3.2,2,1.8,3.2); c.fill(); } });
  el(c,0,-30,24,30); fs(c,rad(c,0,-36,28,'#b8834e','#6b4423'));
  c.save(); el(c,0,-30,24,30); c.clip(); el(c,2,-20,15,19); c.fillStyle='#f3dfbf'; c.fill();
  c.strokeStyle='rgba(140,90,40,.6)'; c.lineWidth=1.1; for(var r=0;r<4;r++) for(var q=0;q<3;q++){ var vx=-8+q*8+(r%2)*4, vy=-30+r*6; c.beginPath(); c.moveTo(vx-2.5,vy); c.lineTo(vx,vy+2.4); c.lineTo(vx+2.5,vy); c.stroke(); } c.restore();
  /* asas */
  [[-1,'#7a4d26'],[1,'#8d5a2e']].forEach(function(w){ c.save(); c.translate(w[0]*21,-34); c.rotate(w[0]*(.12+(m>0&&w[0]>0?Math.abs(Math.sin(t*6))*.25:0))); c.beginPath(); c.ellipse(0,10,7.5,18,0,0,TAU); fs(c,lin(c,0,-8,0,28,w[1],esc(w[1],.3))); c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=1; for(var f=0;f<3;f++){ c.beginPath(); c.moveTo(-4,8+f*6); c.quadraticCurveTo(0,12+f*6,4,8+f*6); c.stroke(); } c.restore(); });
  /* livrinho sob a asa */
  c.save(); c.translate(-17,-18); c.rotate(-.3); rr(c,-7,-9,14,18,2); fs(c,lin(c,0,-9,0,9,'#ef4444','#991b1b'),'#7f1d1d',1); c.fillStyle='#fde68a'; c.fillRect(-7,-9,2.5,18); c.restore();
  /* tufos e disco facial */
  [[-1],[1]].forEach(function(s){ var x=s[0]*14; c.beginPath(); c.moveTo(x-5*s[0],-52); c.quadraticCurveTo(x+4*s[0],-66,x+9*s[0],-68); c.quadraticCurveTo(x+6*s[0],-56,x+7*s[0],-48); c.closePath(); fs(c,'#7a4d26'); });
  c.fillStyle='#e9cfa4'; el(c,-9,-42,11,11); c.fill(); el(c,10,-42,11,11); c.fill();
  var pis=(t%3.9)<.14;
  [[-9,-42],[10,-42]].forEach(function(e){ circ(c,e[0],e[1],7.6); fs(c,rad(c,e[0],e[1],8,'#fde68a','#f59e0b'),'#9a5b13',1);
    if(pis){ c.fillStyle='#8d5a2e'; circ(c,e[0],e[1],7.8); c.fill(); c.strokeStyle='#4a2c12'; c.lineWidth=1.3; c.beginPath(); c.moveTo(e[0]-6,e[1]+1); c.quadraticCurveTo(e[0],e[1]+4,e[0]+6,e[1]+1); c.stroke(); }
    else { c.fillStyle='#1c1008'; circ(c,e[0]+1,e[1],4.2); c.fill(); c.fillStyle='#fff'; circ(c,e[0]-.5,e[1]-1.6,1.6); c.fill(); circ(c,e[0]+2.6,e[1]+1.8,.7); c.fill(); } });
  /* óculos */
  c.strokeStyle='#b7791f'; c.lineWidth=2.2; circ(c,-9,-42,10); c.stroke(); circ(c,10,-42,10); c.stroke(); c.beginPath(); c.moveTo(-1,-44); c.quadraticCurveTo(.5,-47,2,-44); c.stroke();
  c.save(); c.globalAlpha=.25; c.fillStyle='#e0f2fe'; circ(c,-9,-42,9); c.fill(); circ(c,10,-42,9); c.fill(); c.restore();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=1.4; c.beginPath(); c.arc(-9,-42,7,1.1*PI,1.4*PI); c.stroke(); c.beginPath(); c.arc(10,-42,7,1.1*PI,1.4*PI); c.stroke();
  /* bico */
  var ab=m*3.5; c.beginPath(); c.moveTo(-2.5,-37); c.quadraticCurveTo(.5,-38.5,3.5,-37); c.lineTo(.5,-30+ab*.2); c.closePath(); fs(c,'#f59e0b','#9a5b13',1);
  if(ab>.5){ c.beginPath(); c.moveTo(-2,-33+ab*.4); c.quadraticCurveTo(.5,-32+ab,3,-33+ab*.4); c.lineTo(.5,-29+ab); c.closePath(); fs(c,'#d97706','#9a5b13',1); }
  c.restore();
}

/* ---------- polvo poeta (octopus) ---------- */
function octopus(c,t,m){
  sombra(c,30,.2);
  var bob=Math.sin(t*2.2)*2;
  var cores=['#c026d3','#d946ef'];
  for(var i=0;i<6;i++){ var bx=-20+i*8, ph=t*3+i, ex=-40+i*16, side=ex<0?-1:1;
    c.beginPath(); c.moveTo(bx-4.5,-42+bob); c.bezierCurveTo(bx-6,-24,ex-side*4+Math.sin(ph)*4,-14,ex,-4);
    c.quadraticCurveTo(ex+side*9,-1+Math.sin(ph)*2,ex+side*6,-9); c.quadraticCurveTo(ex+side*1,-10,ex+side*4,-6);
    c.bezierCurveTo(ex+side*6+Math.sin(ph)*3,-16,bx+6,-24,bx+4.5,-42+bob); c.closePath(); fs(c,lin(c,0,-44,0,0,cores[i%2],'#86198f'));
    c.fillStyle='#fbcfe8'; for(var k=0;k<3;k++){ var tt=.35+k*.2, px=bx+(ex-bx)*tt+Math.sin(ph)*2*tt, py=-36+bob+(32-bob)*tt; circ(c,px+side*1.5,py,1.5); c.fill(); } }
  c.save(); c.translate(0,bob);
  /* tentáculo com a pena */
  var ta=m>0?Math.sin(t*5)*.25:0; c.save(); c.translate(22,-48); c.rotate(-.6+ta); c.beginPath(); c.moveTo(-4,0); c.quadraticCurveTo(6,-12,12,-26); c.quadraticCurveTo(16,-28,16,-22); c.quadraticCurveTo(12,-10,4,4); c.closePath(); fs(c,lin(c,0,0,0,-28,'#d946ef','#a21caf'));
  c.save(); c.translate(15,-26); c.rotate(.5); c.beginPath(); c.moveTo(0,4); c.quadraticCurveTo(-7,-12,0,-30); c.quadraticCurveTo(7,-12,0,4); c.closePath(); fs(c,lin(c,-6,-30,6,4,'#ffffff','#bae6fd'),'#64748b',1); c.strokeStyle='#94a3b8'; c.lineWidth=1; c.beginPath(); c.moveTo(0,4); c.lineTo(0,-26); c.stroke(); c.restore(); c.restore();
  el(c,0,-72,29,31); fs(c,rad(c,-2,-80,32,'#f5a3ff','#a21caf'));
  c.fillStyle='rgba(255,255,255,.25)'; [[-12,-88,4],[10,-92,3],[16,-76,3.5],[-18,-70,2.5]].forEach(function(p){ circ(c,p[0],p[1],p[2]); c.fill(); });
  var pis=(t%3.4)<.12; olho(c,-9,-64,5,6.4,'#3b0764',pis,true); olho(c,10,-64,4.6,6.2,'#3b0764',pis,true);
  c.fillStyle='rgba(251,113,133,.5)'; el(c,-17,-55,4.5,2.6); c.fill(); el(c,18,-55,4.5,2.6); c.fill();
  bocaFala(c,0,-53,m,3.6);
  /* boina */
  c.save(); c.translate(-4,-100); c.rotate(-.22); el(c,0,0,22,8.5); fs(c,lin(c,0,-8,0,8,'#f87171','#b91c1c')); rr(c,-1.5,-12,3,6,1.5); fs(c,'#991b1b'); c.restore();
  c.restore();
}

/* ---------- bardo das nuvens (bard) ---------- */
function nuvemBase(c,t){ var b=Math.sin(t*1.6)*1.5; c.save(); c.translate(0,b); c.fillStyle='#fff'; [[-26,-8,11],[-12,-14,14],[6,-15,15],[22,-9,11],[0,-6,13]].forEach(function(p){ circ(c,p[0],p[1],p[2]); c.fill(); }); c.fillStyle='rgba(148,163,184,.35)'; el(c,0,-2,32,5); c.fill(); c.strokeStyle='rgba(100,116,139,.35)'; c.lineWidth=1.4; c.beginPath(); c.arc(-12,-14,14,1.1*PI,1.75*PI); c.arc(6,-15,15,1.2*PI,1.9*PI); c.stroke(); c.restore(); }
function bard(c,t,m){
  c.save(); c.globalAlpha=.12; c.fillStyle='#000'; el(c,0,2,30,5); c.fill(); c.restore();
  c.save(); c.translate(0,-12+Math.sin(t*1.6)*1.5);
  var o={pele:'#f2c8a0',peleS:'#d39d74',olho:'#1e3a5f'};
  membro(c,7,-56,.9,19,8.5,esc('#0d9488',.2),o.pele,5);
  pernasAd(c,'#78350f','#4a2c12',0);
  c.beginPath(); c.moveTo(-8,-60); c.quadraticCurveTo(-20,-40,-22,-22); c.lineTo(-10,-26); c.closePath(); fs(c,'#f97316');
  rr(c,-15,-63,30,42,13); fs(c,lin(c,-15,-63,15,-21,'#2dd4bf','#0f766e'));
  c.strokeStyle='#fde68a'; c.lineWidth=2; c.beginPath(); c.moveTo(-14,-30); c.lineTo(14,-30); c.stroke();
  c.save(); c.translate(1,-84);
  cabecaAd(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#f6c453'; c.beginPath(); c.moveTo(-26,10); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,-6); c.quadraticCurveTo(14,-12,8,-5); c.quadraticCurveTo(2,-12,-6,-6); c.quadraticCurveTo(-10,-2,-12,6); c.closePath(); fs(c,lin(c,0,-20,0,8,'#fde68a','#d4a017'),'#a16207',1); c.restore();
    sobrancelha(c,-1,-9.5,'#a16207',0); sobrancelha(c,12.5,-10,'#a16207',0);
    c.save(); c.translate(0,-16); c.rotate(-.12); c.beginPath(); c.moveTo(-22,4); c.quadraticCurveTo(-18,-14,4,-14); c.quadraticCurveTo(22,-12,26,4); c.quadraticCurveTo(0,-1,-22,4); c.closePath(); fs(c,lin(c,0,-14,0,4,'#4ade80','#15803d'));
    c.beginPath(); c.moveTo(-10,-8); c.quadraticCurveTo(-30,-26,-34,-12); c.quadraticCurveTo(-24,-14,-12,-3); c.closePath(); fs(c,lin(c,-34,-20,-10,-4,'#fecaca','#dc2626'),'#991b1b',1); c.restore(); });
  c.restore();
  /* alaúde */
  c.save(); c.translate(2,-40); c.rotate(-.75);
  rr(c,-2.6,-34,5.2,26,2); fs(c,'#7c4a25'); rr(c,-4,-40,8,8,2); fs(c,'#5b3418');
  c.beginPath(); c.ellipse(0,0,12,15,0,0,TAU); fs(c,lin(c,-12,-15,12,15,'#e0a060','#9a5b2a')); c.fillStyle='#3f2612'; circ(c,0,-3,3.6); c.fill();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=.6; for(var s=-1;s<=1;s++){ c.beginPath(); c.moveTo(s*1.2,-38); c.lineTo(s*1.6,8); c.stroke(); } rr(c,-5,7,10,2.4,1); fs(c,'#3f2612'); c.restore();
  var aN=1.05+(m>0?Math.sin(t*16)*.18:0); membro(c,-6,-56,aN,19,8.5,'#14b8a6',o.pele,5);
  if(m>0){ for(var k=0;k<3;k++){ var f=(t*.7+k/3)%1; c.save(); c.globalAlpha=1-f; nota(c,24+k*6+Math.sin(f*6+k)*6,-60-f*50,1,['#fde047','#f9a8d4','#a5f3fc'][k]); c.restore(); } }
  c.restore();
  c.save(); c.translate(0,0); nuvemBase(c,t); c.restore();
}

/* ---------- treinadora (coach) ---------- */
function coach(c,t,m){
  sombra(c,20);
  var o={pele:'#8d5a3b',peleS:'#6e4128',olho:'#2a160b',cilio:true};
  var aF=m>0?.25:.15; membro(c,7,-56,aF,20,8.5,'#5b21b6',o.pele,5);
  var mf=maoEm(7,-56,aF,20); c.save(); c.translate(mf[0]+5,mf[1]-6); c.rotate(.12); rr(c,-9,-12,18,24,2); fs(c,lin(c,0,-12,0,12,'#a16207','#78350f'),'#4a2c12',1); rr(c,-7,-9,14,19,1); fs(c,'#fff'); c.strokeStyle='#94a3b8'; c.lineWidth=.8; for(var i=0;i<4;i++){ c.beginPath(); c.moveTo(-5,-5+i*4); c.lineTo(5,-5+i*4); c.stroke(); } rr(c,-4,-14,8,4,1); fs(c,'#cbd5e1'); c.restore();
  pernasAd(c,'#6d28d9','#f8fafc',0);
  c.strokeStyle='#fff'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-6,-24); c.lineTo(-6,-4); c.moveTo(7,-24); c.lineTo(7,-4); c.stroke();
  rr(c,-15,-63,30,40,13); fs(c,lin(c,-15,-63,15,-23,'#a78bfa','#6d28d9'));
  c.strokeStyle='#fff'; c.lineWidth=2.4; c.beginPath(); c.moveTo(0,-61); c.lineTo(0,-24); c.stroke(); c.lineWidth=1.6; c.beginPath(); c.moveTo(-14,-46); c.lineTo(-6,-46); c.stroke();
  c.strokeStyle='#ef4444'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-8,-62); c.quadraticCurveTo(0,-44,8,-62); c.stroke(); rr(c,-3,-48,9,5,2.5); fs(c,'#e5e7eb','#64748b',1);
  c.save(); c.translate(1,-84);
  cabecaAd(c,o,t,m,function(c,t){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,12); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,-8); c.quadraticCurveTo(10,-15,-4,-9); c.quadraticCurveTo(-10,-5,-13,4); c.closePath(); fs(c,'#1c1008','#000',1); c.restore();
    rr(c,-21,-14,44,5.5,2.5); fs(c,'#22d3ee','#0e7490',1);
    c.save(); c.translate(-18,-8); c.rotate(.5+Math.sin(t*3)*.12); c.beginPath(); c.moveTo(0,-4); c.bezierCurveTo(-12,-4,-16,12,-10,22); c.bezierCurveTo(-6,14,0,8,4,3); c.closePath(); fs(c,'#2a160b'); c.restore();
    sobrancelha(c,-1,-9.5,'#1c1008',0); sobrancelha(c,12.5,-10,'#1c1008',0); });
  c.restore();
  var aN=m>0?-2.5+Math.sin(t*6)*.3:.3; membro(c,-6,-56,aN,20,8.5,'#7c3aed',o.pele,5);
  if(m>0){ var mn=maoEm(-6,-56,aN,20); c.save(); c.translate(mn[0],mn[1]); c.rotate(Math.sin(t*6)*.2); rr(c,-1.6,-10,3.2,9,1.6); fs(c,o.pele); c.restore(); }
}

/* ---------- juiz (referee) ---------- */
function referee(c,t,m){
  sombra(c,20);
  var o={pele:'#f1c6a0',peleS:'#d39b74',olho:'#2a1a10'};
  membro(c,7,-56,.2,20,8.5,'#e5e7eb',o.pele,5);
  pernasAd(c,o.pele,'#111827',0);
  [-6,5].forEach(function(x){ rr(c,x-4.8,-14,9.6,11,3); fs(c,'#111827'); c.fillStyle='#fff'; c.fillRect(x-4.8,-11,9.6,1.6); });
  rr(c,-15,-30,30,12,4); fs(c,'#1f2937');
  rr(c,-15,-63,30,36,13); fs(c,'#f8fafc');
  c.save(); rr(c,-15,-63,30,36,13); c.clip(); c.fillStyle='#111827'; for(var x=-13;x<16;x+=8) c.fillRect(x,-64,4,38); c.fillStyle='rgba(0,0,0,.12)'; c.fillRect(5,-64,12,38); c.restore();
  rr(c,-15,-63,30,36,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  c.strokeStyle='#111827'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-6,-62); c.quadraticCurveTo(0,-48,7,-62); c.stroke(); rr(c,-2,-51,9,5,2.5); fs(c,'#e5e7eb','#475569',1);
  c.save(); c.translate(1,-84);
  cabecaAd(c,o,t,m,function(c){
    c.fillStyle='#6b4226'; el(c,-14,-3,6,9); c.fill(); el(c,17,-2,4,7); c.fill();
    c.fillStyle='rgba(255,255,255,.35)'; el(c,-4,-14,8,3.5); c.fill();
    c.fillStyle='#4a2c17'; c.beginPath(); c.moveTo(1,9.5); c.quadraticCurveTo(7.5,6.5,14,9.5); c.quadraticCurveTo(15,11.5,12,11); c.quadraticCurveTo(7.5,9,3,11); c.quadraticCurveTo(0,11.5,1,9.5); c.fill();
    sobrancelha(c,-1,-8.5,'#4a2c17',-.6); sobrancelha(c,12.5,-9,'#4a2c17',.6); });
  c.restore();
  var aN=m>0?-2.75:.25; membro(c,-6,-56,aN,20,8.5,'#e5e7eb',o.pele,5);
  var mc=maoEm(-6,-56,aN,20); c.save(); c.translate(mc[0],mc[1]); c.rotate(m>0?Math.sin(t*4)*.1:-.2); rr(c,-6,m>0?-20:-2,12,17,2); fs(c,lin(c,0,-20,0,0,'#fde047','#eab308'),'#a16207',1.2); c.restore();
}

/* ---------- ratinho com o biscoito (mouse) ---------- */
function mouse(c,t,m){
  sombra(c,18);
  var bob=Math.sin(t*2.6)*1;
  c.translate(0,bob);
  c.strokeStyle='#d6a7a7'; c.lineWidth=3; c.beginPath(); c.moveTo(-12,-12); c.bezierCurveTo(-32,-10,-34,-30,-22,-34+Math.sin(t*3)*3); c.stroke();
  [-6,6].forEach(function(x,i){ el(c,x+1,-2,7,3.8); fs(c,i?'#f9a8d4':'#f0abc6'); });
  rr(c,-13,-44,26,40,12); fs(c,lin(c,0,-44,0,-4,'#c7bfb8','#8a817a'));
  c.beginPath(); c.moveTo(-12,-28); c.lineTo(12,-28); c.lineTo(13,-8); c.quadraticCurveTo(0,-3,-13,-8); c.closePath(); fs(c,lin(c,0,-28,0,-4,'#60a5fa','#1d4ed8'));
  c.strokeStyle='#1d4ed8'; c.lineWidth=2.4; c.beginPath(); c.moveTo(-8,-28); c.lineTo(-6,-42); c.moveTo(8,-28); c.lineTo(6,-42); c.stroke(); c.fillStyle='#fde047'; circ(c,-7,-30,1.6); c.fill(); circ(c,7,-30,1.6); c.fill();
  /* cabeça */
  c.save(); c.translate(2,-62);
  [[-17,-14,13,1],[15,-17,12,0]].forEach(function(e){ circ(c,e[0],e[1],e[2]); fs(c,e[3]?'#a8a19a':'#bfb7b0'); circ(c,e[0],e[1],e[2]*.62); fs(c,'#f9b4c8',null); });
  el(c,0,0,19,17); fs(c,rad(c,2,-3,20,'#d9d2cb','#9d948c'));
  el(c,14,4,8,6.5); fs(c,'#e7e1da',OL,1.2);
  c.fillStyle='#f472b6'; circ(c,21,2.5,3); c.fill(); c.fillStyle='rgba(255,255,255,.6)'; circ(c,20.2,1.6,1); c.fill();
  var pis=(t%3.3)<.12; olho(c,-2,-3,4,5.2,'#1f1208',pis,false); olho(c,9,-4,3.4,4.8,'#1f1208',pis,false);
  c.fillStyle='rgba(244,114,128,.45)'; el(c,-6,6,3.4,2.2); c.fill();
  c.strokeStyle='rgba(60,40,30,.6)'; c.lineWidth=.9; for(var w=-1;w<=1;w++){ c.beginPath(); c.moveTo(18,6); c.lineTo(30,5+w*4); c.stroke(); }
  if(m>.12){ c.beginPath(); c.ellipse(13,10,3.4,1+m*3,0,0,TAU); fs(c,'#8f2d2d','#5c1b1b',1); c.fillStyle='#fff'; c.fillRect(11.5,8.5,3,2.6); }
  else { c.strokeStyle='#6b4a3a'; c.lineWidth=1.2; c.beginPath(); c.arc(13,8,2.6,.2*PI,.8*PI); c.stroke(); c.fillStyle='#fff'; c.fillRect(12,10,2.4,2.4); }
  c.restore();
  /* biscoito nas mãos */
  var cb=m>0?Math.sin(t*6)*2:0; c.save(); c.translate(10,-26+cb); A.biscoito(c,0,0,13,0); c.restore();
  circ(c,2,-24+cb,4); fs(c,'#bfb7b0'); circ(c,20,-22+cb,4); fs(c,'#bfb7b0');
}

/* ---------- locutor (announcer) ---------- */
function announcer(c,t,m){
  sombra(c,20);
  var o={pele:'#c68b59',peleS:'#a26a3c',olho:'#2a160b'};
  membro(c,7,-56,.2,20,8.5,esc('#f97316',.2),o.pele,5);
  pernasAd(c,'#1f2937','#111827',0);
  rr(c,-15,-63,30,40,13); fs(c,lin(c,-15,-63,15,-23,'#fb923c','#c2410c'));
  c.beginPath(); c.moveTo(-6,-62); c.lineTo(0,-44); c.lineTo(6,-62); c.closePath(); fs(c,'#fff');
  c.beginPath(); c.moveTo(-3.5,-60); c.lineTo(3.5,-56); c.lineTo(3.5,-60); c.lineTo(-3.5,-56); c.closePath(); fs(c,'#2563eb','#1e3a8a',1);
  c.strokeStyle='#7c2d12'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-6,-62); c.lineTo(-10,-40); c.moveTo(6,-62); c.lineTo(10,-40); c.stroke();
  c.save(); c.translate(1,-84);
  cabecaAd(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,8); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,-10); c.quadraticCurveTo(8,-16,-8,-8); c.quadraticCurveTo(-13,-4,-14,4); c.closePath(); fs(c,'#1c1008','#000',1); c.restore();
    c.save(); c.translate(-2,-19); c.rotate(-.12); rr(c,-13,-3,12,6,3); fs(c,'#0f172a'); rr(c,2,-3,12,6,3); fs(c,'#0f172a'); c.strokeStyle='#0f172a'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-1,0); c.lineTo(2,0); c.stroke(); c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(-11,-2,4,1.2); c.restore();
    c.strokeStyle='#334155'; c.lineWidth=2.4; c.beginPath(); c.arc(1,-2,23,1.08*PI,1.95*PI); c.stroke(); rr(c,-18,-6,7,13,3); fs(c,'#334155');
    c.strokeStyle='#334155'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-14,6); c.quadraticCurveTo(-6,16,6,14); c.stroke(); c.fillStyle='#111827'; el(c,7,14,3,2.4); c.fill();
    sobrancelha(c,-1,-9.5,'#1c1008',0); sobrancelha(c,12.5,-10,'#1c1008',0); });
  c.restore();
  var aN=m>0?-2.45+Math.sin(t*7)*.25:.5; membro(c,-6,-56,aN,20,8.5,'#f97316',o.pele,5);
  var mf=maoEm(-6,-56,aN,20); c.save(); c.translate(mf[0],mf[1]); c.rotate(m>0?-.35+Math.sin(t*7)*.2:.2);
  c.strokeStyle='#6b7280'; c.lineWidth=2.4; c.beginPath(); c.moveTo(0,4); c.lineTo(0,-30); c.stroke();
  var wv=Math.sin(t*(m>0?10:3))*3; c.save(); c.beginPath(); c.moveTo(0,-30); c.quadraticCurveTo(10,-34+wv,22,-30); c.lineTo(22,-14); c.quadraticCurveTo(10,-18+wv,0,-14); c.closePath(); c.fillStyle='#fff'; c.fill(); c.clip();
  c.fillStyle='#111'; for(var i=0;i<6;i++) for(var j=0;j<4;j++) if((i+j)%2) c.fillRect(i*4,-34+j*4+wv*.5*(i/6),4,4.4); c.restore();
  c.beginPath(); c.moveTo(0,-30); c.quadraticCurveTo(10,-34+wv,22,-30); c.lineTo(22,-14); c.quadraticCurveTo(10,-18+wv,0,-14); c.closePath(); c.strokeStyle=OL; c.lineWidth=1.2; c.stroke();
  c.restore();
}

var MOR={crier:crier,godmother:godmother,owl:owl,octopus:octopus,bard:bard,coach:coach,referee:referee,mouse:mouse,announcer:announcer};
/* morador: pés em (x,y), ~110 px; falando=true anima a boca */
A.morador=function(c,tipo,x,y,t,dir,falando){
  var f=MOR[tipo]||crier; t=t||0;
  c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round';
  f(c,t,fala(t,falando)); c.restore();
};
A.MORADORES=Object.keys(MOR);

/* biscoito com gotas de chocolate (centro x,y; raio r) */
A.biscoito=function(c,x,y,r,mordida){
  c.save(); c.translate(x,y); c.lineJoin='round';
  c.beginPath(); for(var i=0;i<=24;i++){ var a=i/24*TAU, rr2=r*(1+Math.sin(i*2.7)*.04); if(mordida&&a>5.2&&a<6.1) rr2=r*.72; c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2); } c.closePath();
  fs(c,rad(c,0,0,r,'#f2c27b','#c27c34'),'#8a4f1d',Math.max(1,r*.08));
  c.fillStyle='#4a2511'; [[-.4,-.35,.16],[.35,-.3,.13],[.05,.1,.15],[-.45,.35,.12],[.45,.38,.14],[0,-.62,.1]].forEach(function(p){ el(c,p[0]*r,p[1]*r,p[2]*r,p[2]*r*.8); c.fill(); });
  c.fillStyle='rgba(255,240,200,.45)'; el(c,-r*.3,-r*.45,r*.3,r*.12); c.fill();
  c.restore();
};

function manga(c,x,y,a,cor){ c.save(); c.translate(x,y); c.rotate(-a);
  c.beginPath(); c.moveTo(-6,-3); c.lineTo(6,-3); c.lineTo(10,19); c.quadraticCurveTo(0,23,-10,19); c.closePath(); fs(c,lin(c,-8,0,8,0,cla(cor,.12),esc(cor,.25)));
  c.strokeStyle='#f6c445'; c.lineWidth=2.4; c.beginPath(); c.moveTo(-9.5,18.5); c.quadraticCurveTo(0,22.5,9.5,18.5); c.stroke();
  circ(c,0,24,7); fs(c,'#f4d3c4'); c.restore(); }
/* ============================================================
   CONDE RABISCO — mago trapalhão de tinta, cômico. Pés em (x,y),
   ~150 px. estado: idle | laugh | hit | sad | write
   ============================================================ */
A.conde=function(c,x,y,estado,t){
  t=t||0; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  var bob=Math.sin(t*2.4)*1.5, sx=1, sy=1, rot=0, hatR=0, aN=1.25+Math.sin(t*2)*.06, aF=.35, olhos='normal', bc='smile', qA=.72+Math.sin(t*2)*.08;
  if(estado==='laugh'){ bob=-Math.abs(Math.sin(t*12))*5; sx=1+Math.abs(Math.sin(t*12))*.03; olhos='riso'; bc='riso'; aF=.9; aN=1.7+Math.sin(t*12)*.25; hatR=Math.sin(t*12)*.06; qA=.95+Math.sin(t*12)*.25; }
  else if(estado==='hit'){ var k=Math.max(0,Math.sin(t*8)); sx=1.1+k*.04; sy=.88-k*.03; olhos='tonto'; bc='O'; hatR=-.35; aN=-2.3; aF=2.2; rot=Math.sin(t*20)*.02; qA=-2.4+Math.sin(t*9)*.3; }
  else if(estado==='sad'){ bob=0; sy=.97; rot=.04; olhos='triste'; bc='sad'; aN=.35; aF=.15; hatR=.12; qA=2.5; }
  else if(estado==='write'){ aN=1.9+Math.sin(t*5)*.35; olhos='foco'; bc='lingua'; qA=.6+Math.sin(t*10)*.3; }
  c.save(); c.globalAlpha=.25; c.fillStyle='#000'; el(c,0,2,44,8); c.fill(); c.restore();
  if(estado==='hit'){ for(var s=0;s<7;s++){ var a=s/7*TAU+t, d=50+Math.sin(t*6+s)*6; c.fillStyle=s%2?'#1e1b4b':'#4338ca'; circ(c,Math.cos(a)*d,-80+Math.sin(a)*d*.7,4+s%3*2); c.fill(); } }
  c.translate(0,bob); c.rotate(rot); c.scale(sx,sy);
  /* braço de trás */
  manga(c,14,-74,aF,'#3a3290');
  /* sapatos */
  [[-14,'#1e1b4b'],[14,'#272360']].forEach(function(p){ c.beginPath(); c.moveTo(p[0]-12,-2); c.quadraticCurveTo(p[0]-10,-12,p[0],-11); c.quadraticCurveTo(p[0]+14,-10,p[0]+20,-6); c.quadraticCurveTo(p[0]+24,-12,p[0]+22,-15); c.quadraticCurveTo(p[0]+28,-6,p[0]+20,0); c.lineTo(p[0]-12,0); c.closePath(); fs(c,p[1]); });
  /* manto com respingos e barra pingando */
  c.beginPath(); c.moveTo(-22,-86); c.quadraticCurveTo(0,-96,22,-86); c.bezierCurveTo(34,-60,40,-34,40,-10);
  var drips=[[30,0],[18,6],[6,-2],[-6,8],[-18,0],[-30,4]]; drips.forEach(function(d,i){ var px=34-i*12; c.quadraticCurveTo(px-3,-6,px-6,-6+d[1]+Math.sin(t*3+i)*1.5); c.quadraticCurveTo(px-9,-6,px-12,-9); });
  c.bezierCurveTo(-40,-34,-34,-60,-22,-86); c.closePath(); fs(c,lin(c,-30,-90,30,0,'#6a5fd8','#28236b'));
  c.save(); c.clip();
  c.fillStyle='rgba(255,255,255,.1)'; c.beginPath(); c.moveTo(-10,-92); c.lineTo(-2,-92); c.lineTo(-18,0); c.lineTo(-28,0); c.fill();
  [[-17,-60,5,'#17143f'],[16,-28,6.5,'#17143f'],[20,-68,3.5,'#c4b5fd'],[-12,-22,3.5,'#c4b5fd']].forEach(function(b){ c.fillStyle=b[3]; c.beginPath(); for(var k=0;k<=12;k++){ var a=k/12*TAU, r=b[2]*(k%2?.7:1.15); c.lineTo(b[0]+Math.cos(a)*r,b[1]+Math.sin(a)*r); } c.fill(); for(var k2=0;k2<4;k2++){ var a2=k2*1.6+b[0]; circ(c,b[0]+Math.cos(a2)*b[2]*2,b[1]+Math.sin(a2)*b[2]*2,b[2]*.28); c.fill(); } });
  c.restore();
  /* cinto e gola */
  rr(c,-34,-46,68,8,4); fs(c,'#f6c445','#b7791f',1.2); rr(c,-6,-48,12,12,3); fs(c,'#7c3aed','#4c1d95',1.2);
  c.beginPath(); c.moveTo(-24,-88); c.lineTo(-30,-102); c.lineTo(-12,-92); c.lineTo(0,-98); c.lineTo(12,-92); c.lineTo(30,-102); c.lineTo(24,-88); c.closePath(); fs(c,lin(c,0,-102,0,-88,'#a78bfa','#6d28d9'));
  /* cabeça */
  c.save(); c.translate(2,-120); c.rotate(estado==='sad'?.1:(estado==='laugh'?Math.sin(t*12)*.05:0)); c.scale(1.12,1.12);
  el(c,0,0,30,27); fs(c,rad(c,4,-2,30,'#ffe9dd','#f0bfa9'));
  c.fillStyle='rgba(244,114,128,.5)'; el(c,-17,9,7,4.4); c.fill(); el(c,19,9,7,4.4); c.fill();
  if(olhos==='riso'){ c.strokeStyle='#1e1b4b'; c.lineWidth=2.6; [-9,10].forEach(function(ex){ c.beginPath(); c.arc(ex,0,5,1.1*PI,1.9*PI); c.stroke(); }); }
  else if(olhos==='tonto'){ c.strokeStyle='#1e1b4b'; c.lineWidth=2.4; [-9,10].forEach(function(ex){ c.beginPath(); c.moveTo(ex-5,-5); c.lineTo(ex+5,5); c.moveTo(ex+5,-5); c.lineTo(ex-5,5); c.stroke(); }); }
  else { var pis=(t%3.7)<.12; [[-9,5.6],[10,5.2]].forEach(function(e,i){ el(c,e[0],-1,e[1],e[1]*1.2); fs(c,'#fff','rgba(30,27,75,.5)',1.1); if(pis){ c.fillStyle='#f0bfa9'; el(c,e[0],-1,e[1]+.6,e[1]*1.2+.6); c.fill(); return; } var px=olhos==='foco'?2.5:1, py=olhos==='triste'?2:0; c.fillStyle='#1e1b4b'; circ(c,e[0]+px,-1+py,2.9); c.fill(); c.fillStyle='#fff'; circ(c,e[0]+px-1,-2.4+py,1.1); c.fill(); }); }
  /* sobrancelhas grossas */
  var sb=olhos==='triste'?[-3,3]:(olhos==='foco'?[3,-3]:[0,0]);
  c.fillStyle='#14123a'; [[-9,-11,sb[0]],[10,-11.5,sb[1]]].forEach(function(b,i){ c.save(); c.translate(b[0],b[1]); c.rotate((i?-1:1)*b[2]*.1); rr(c,-7,-2.4,14,4.8,2.4); c.fill(); c.restore(); });
  /* nariz */
  el(c,3,6,5.5,4.6); fs(c,rad(c,3,6,6,'#ffd5c4','#e8a48c'),'rgba(150,80,60,.5)',1.1);
  /* bigode enrolado */
  c.fillStyle='#14123a'; [1,-1].forEach(function(sg){ c.save(); c.translate(3,11); c.scale(sg,1); var ri=estado==='sad'?-1:1; c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(6,-3,14,-2,17,-6*ri); c.bezierCurveTo(20,-10*ri,15,-13*ri,14,-9*ri); c.bezierCurveTo(16,-8*ri,15,-5*ri,13,-4*ri); c.bezierCurveTo(9,1,4,4,0,3); c.closePath(); c.fill(); c.restore(); });
  /* boca */
  if(bc==='riso'){ c.beginPath(); c.moveTo(-6,15); c.quadraticCurveTo(3,30,12,15); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.2); c.fillStyle='#f87171'; el(c,3,21,4,2.4); c.fill(); }
  else if(bc==='O'){ c.fillStyle='#450a0a'; el(c,3,19,4,5); c.fill(); }
  else if(bc==='sad'){ c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.arc(3,22,5,1.15*PI,1.85*PI); c.stroke(); }
  else if(bc==='lingua'){ c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.moveTo(-2,17); c.quadraticCurveTo(3,19,8,17); c.stroke(); c.fillStyle='#f472b6'; el(c,8,19,2.6,2.2); c.fill(); }
  else { c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.arc(3,13,6,.2*PI,.8*PI); c.stroke(); }
  /* cavanhaque */
  c.fillStyle='#14123a'; c.beginPath(); c.moveTo(0,24); c.quadraticCurveTo(3,36,6,24); c.closePath(); c.fill();
  if(estado==='sad'){ var lg=(t*.8)%1; c.fillStyle='rgba(96,165,250,.85)'; c.beginPath(); c.moveTo(-12,4+lg*12); c.quadraticCurveTo(-15,10+lg*12,-12,12+lg*12); c.quadraticCurveTo(-9,10+lg*12,-12,4+lg*12); c.fill(); }
  /* chapéu mole de tinta */
  c.save(); c.rotate(hatR); c.translate(0,-18);
  c.beginPath(); c.moveTo(-40,4); c.quadraticCurveTo(0,-8,40,4); c.quadraticCurveTo(34,8,30,14); c.quadraticCurveTo(26,8,20,9); c.quadraticCurveTo(0,6,-22,9); c.quadraticCurveTo(-27,15,-30,10); c.quadraticCurveTo(-36,8,-40,4); c.closePath(); fs(c,lin(c,0,-6,0,14,'#4338ca','#1e1b4b'));
  var tip=Math.sin(t*2.5)*4;
  c.beginPath(); c.moveTo(-24,0); c.bezierCurveTo(-20,-24,-8,-36,4+tip,-44); c.quadraticCurveTo(18+tip,-48,24+tip,-38); c.quadraticCurveTo(14+tip,-40,11,-33); c.bezierCurveTo(16,-22,22,-10,24,0); c.closePath(); fs(c,lin(c,-20,-60,24,0,'#5b52c7','#1e1b4b'));
  c.fillStyle='#17143f'; c.beginPath(); c.moveTo(-6,-20); c.quadraticCurveTo(2,-28,8,-19); c.quadraticCurveTo(11,-13,4,-12); c.quadraticCurveTo(-8,-12,-6,-20); c.fill(); circ(c,11,-25,2.2); c.fill(); circ(c,-10,-10,1.6); c.fill();
  rr(c,-23,-6,46,6,3); fs(c,'#7c3aed','#4c1d95',1);
  c.fillStyle='#fde047'; circ(c,24+tip,-38,3.4); c.fill();
  c.restore();
  c.restore();
  /* braço da frente com a pena enorme */
  var mp=maoEm(-12,-74,aN,25);
  c.save(); c.translate(mp[0],mp[1]); c.rotate(qA);
  c.strokeStyle='#cbd5e1'; c.lineWidth=2; c.beginPath(); c.moveTo(0,10); c.lineTo(0,-62); c.stroke();
  c.beginPath(); c.moveTo(0,-8); c.bezierCurveTo(-16,-20,-14,-48,-2,-68); c.bezierCurveTo(14,-54,14,-24,0,-8); c.closePath(); fs(c,lin(c,-12,-68,12,-8,'#ffffff','#c4b5fd'),'#7c3aed',1.2);
  c.strokeStyle='rgba(124,58,237,.55)'; c.lineWidth=1; for(var f=0;f<6;f++){ c.beginPath(); c.moveTo(0,-14-f*8); c.lineTo(-9+f*.5,-20-f*8); c.moveTo(0,-14-f*8); c.lineTo(8-f*.5,-20-f*8); c.stroke(); }
  c.beginPath(); c.moveTo(-2,8); c.lineTo(2,8); c.lineTo(0,16); c.closePath(); fs(c,'#1e1b4b');
  var gp=(t*1.5)%1; c.fillStyle='#1e1b4b'; circ(c,0,17+gp*14,2.4*(1-gp)+.6); c.fill();
  c.restore();
  manga(c,-12,-74,aN,'#4a40b0');
  if(estado==='laugh'){ c.save(); c.globalAlpha=.8; c.fillStyle='#4338ca'; [[46,-150],[58,-130],[-48,-142]].forEach(function(p,i){ var k=Math.abs(Math.sin(t*12+i)); el(c,p[0],p[1]-k*4,6+k*2,3); c.fill(); }); c.restore(); }
  c.restore();
  if(estado==='write'){ c.save(); c.translate(x,y+bob); c.strokeStyle='rgba(30,27,75,.85)'; c.lineWidth=3; c.beginPath(); for(var i=0;i<40;i++){ var u=i/40, tt=t-u*1.2; var px=78+Math.cos(tt*5)*12+u*36, py=-140+Math.sin(tt*10)*8+u*8; if(i) c.lineTo(px,py); else c.moveTo(px,py); } c.stroke(); c.restore(); }
};
})();
