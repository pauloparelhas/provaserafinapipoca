/* ============================================================
   HIS3_jogo_arteA2.js — carrega logo DEPOIS de HIS3_jogo_arteA.js.
   - A.pip passa a desenhar o PANGARÉ, o cavalo do Seu Pedro
     (estados idle | walk | fly | ride | egg). A.pip.SELA_Y = topo da sela.
   - A.itemTrilha(c,n,t): ícones da Trilha da Linha do Tempo (~30 px,
     centrados em 0,0): 0/8 ampulheta · 1 jornal · 2 envelope ·
     3 envelope com selo · 4 diário com cadeado · 5 álbum · 6 espanador ·
     7 fita adesiva.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, cintila=I.cintila, olho=I.olho;

/* ---------- PANGARÉ ---------- */
var PEL='#a8652f', PELS='#6b3a17', CRI='#3a1f0e', FOC='#ecc9a0';
function pata(c,x,a,longe,dob){
  c.save(); c.translate(x,-24); c.rotate(a);
  var cor=longe?esc(PEL,.2):PEL;
  if(dob){ rr(c,-3.6,-2,7.2,13,3.6); fs(c,lin(c,-3,0,3,0,cla(cor,.1),esc(cor,.15))); c.translate(0,11); c.rotate(dob); }
  var L=dob?11:22; rr(c,-3.6,dob?-2:-2,7.2,L+2,3.6); fs(c,lin(c,-3,0,3,0,cla(cor,.1),esc(cor,.15)));
  rr(c,-4.4,L-2,8.8,5,2); fs(c,longe?'#2a1a10':'#3f2a1c','#1c1008',1); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(-2.8,L-1,4,1.2);
  c.restore();
}
function crina(c,t,vento){
  var pts=[[27,-69],[24,-63],[21,-56],[18,-49],[15,-42]];
  pts.forEach(function(p,i){ var w=Math.sin(t*(vento?9:2.2)+i*.9)*(vento?3:1.2);
    c.beginPath(); c.moveTo(p[0]+3,p[1]-4); c.quadraticCurveTo(p[0]-6-(vento?6:0),p[1]-3+w,p[0]-9-(vento?10:2)+w,p[1]+4+w*.5); c.quadraticCurveTo(p[0]-2,p[1]+2,p[0]+2,p[1]+5); c.closePath();
    fs(c,lin(c,p[0]-10,p[1],p[0]+3,p[1],'#5a3218',CRI),'#1c1008',1); });
  c.strokeStyle='rgba(255,220,180,.25)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(25,-66); c.quadraticCurveTo(18,-56,14,-44); c.stroke();
}
function cabecaCavalo(c,t,boca){
  c.beginPath(); c.moveTo(16,-37); c.lineTo(25,-36); c.quadraticCurveTo(33,-48,37,-60); c.lineTo(26,-66); c.quadraticCurveTo(19,-52,16,-37); c.closePath(); fs(c,lin(c,16,-60,30,-36,cla(PEL,.12),esc(PEL,.1)),null);
  c.save(); c.translate(35,-61); c.rotate(.55);
  el(c,0,0,13,9); fs(c,rad(c,-2,-3,14,cla(PEL,.3),PEL),null);
  el(c,10,0,7.5,7.6); fs(c,rad(c,9,-2,8,'#f7dcb9','#d9ab7c'),null);
  c.beginPath(); c.moveTo(-6,-7.5); c.quadraticCurveTo(2,-9,10,-7); c.lineTo(9,-4); c.quadraticCurveTo(2,-6,-5,-4); c.closePath(); fs(c,'#fff7ea',null);
  el(c,0,0,13,9); el(c,10,0,7.5,7.6); c.strokeStyle=OL; c.lineWidth=1.4; c.stroke();
  c.fillStyle='#5c3a22'; el(c,14,-2.5,1.6,1.1); c.fill();
  c.strokeStyle='#5c3a22'; c.lineWidth=1.3; c.beginPath(); if(boca) { c.arc(12,3.5,3.2,.1*PI,.9*PI); } else { c.moveTo(8,4.5); c.quadraticCurveTo(12,6.5,16,4); } c.stroke();
  c.restore();
  c.save(); c.translate(27,-69); c.rotate(-.25+Math.sin(t*1.7)*.08); c.beginPath(); c.moveTo(-3.5,3); c.quadraticCurveTo(-2,-7,0,-10); c.quadraticCurveTo(3,-6,3.5,3); c.closePath(); fs(c,lin(c,0,-10,0,3,cla(PEL,.2),PELS)); c.fillStyle='#f5b5a5'; el(c,0,-2,1.4,4); c.fill(); c.restore();
  var pis=(t%4.4)<.12; olho(c,31.5,-63,3.2,4.2,'#3b2112',pis,true);
  c.fillStyle='rgba(244,114,128,.4)'; el(c,34,-56,3,1.8); c.fill();
  c.beginPath(); c.moveTo(29,-72); c.quadraticCurveTo(36,-72,37,-66); c.quadraticCurveTo(33,-68,30,-66); c.closePath(); fs(c,CRI,'#1c1008',1);
}
function sela(c){
  c.beginPath(); c.moveTo(-14,-41); c.quadraticCurveTo(-1,-45,13,-41); c.lineTo(12,-31); c.quadraticCurveTo(-1,-34,-14,-31); c.closePath(); fs(c,lin(c,0,-44,0,-31,'#fde68a','#d97706'),'#92400e',1.1);
  c.beginPath(); c.moveTo(-11,-43); c.quadraticCurveTo(-4,-41,0,-41); c.quadraticCurveTo(5,-41,8,-44); c.quadraticCurveTo(12,-47,11,-41); c.lineTo(10,-36); c.quadraticCurveTo(-1,-38,-11,-36); c.closePath(); fs(c,lin(c,0,-46,0,-36,'#f87171','#b91c1c'),'#7f1d1d',1.2);
  c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-9,-41.5); c.quadraticCurveTo(-2,-40,6,-42); c.stroke();
  c.strokeStyle='#5b3418'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-1,-37); c.lineTo(-1,-24); c.stroke();
  c.beginPath(); c.moveTo(-4.5,-24); c.lineTo(2.5,-24); c.lineTo(1.5,-20); c.lineTo(-3.5,-20); c.closePath(); c.strokeStyle='#9ca3af'; c.lineWidth=1.6; c.stroke();
}
function rabo(c,t,a){
  c.save(); c.translate(-26,-36); c.rotate(a);
  c.beginPath(); c.moveTo(0,-3); c.bezierCurveTo(-12,-2,-16,10,-12,24); c.quadraticCurveTo(-8,20,-6,26); c.quadraticCurveTo(-4,18,-1,22); c.bezierCurveTo(-4,10,2,4,3,3); c.closePath(); fs(c,lin(c,-12,-2,0,24,'#5a3218',CRI),'#1c1008',1);
  c.strokeStyle='rgba(255,220,180,.22)'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,0); c.quadraticCurveTo(-10,8,-9,20); c.stroke(); c.restore();
}
function deitado(c,t){
  sombra(c,34,.22);
  var r=Math.sin(t*1.8);
  c.save(); c.translate(0,10);
  rabo(c,t,1.25+Math.sin(t*1.6)*.1);
  [[-18,1],[14,1]].forEach(function(p){ el(c,p[0],-13,9,4.5); fs(c,esc(PEL,.2)); });
  el(c,0,-28,28,12.5*(1+r*.02)); fs(c,rad(c,2,-34,28,cla(PEL,.3),PELS));
  c.save(); el(c,0,-28,28,12.5); c.clip(); c.fillStyle=cla(PEL,.3); el(c,4,-18,20,6); c.fill(); c.restore();
  sela(c);
  [[-10,0],[20,0]].forEach(function(p){ el(c,p[0],-14,10,4.6); fs(c,lin(c,0,-16,0,-8,PEL,esc(PEL,.15))); rr(c,p[0]+6,-17.5,6,7,2); fs(c,'#3f2a1c','#1c1008',1); });
  crina(c,t,false); cabecaCavalo(c,t,true);
  c.restore();
  var a=.55+.3*Math.sin(t*2); c.save(); c.globalAlpha=a; c.fillStyle='#fde047'; c.strokeStyle='#b45309'; c.lineWidth=2; c.font='900 22px Arial'; c.textAlign='center'; c.strokeText('!',40,-70+Math.sin(t*2)*2); c.fillText('!',40,-70+Math.sin(t*2)*2); c.restore();
}
A.pip=function(c,x,y,estado,t,dir,escala){
  escala=escala||1; dir=dir||1; t=t||0;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala); c.lineJoin='round'; c.lineCap='round';
  if(estado==='egg'){ deitado(c,t); c.restore(); return; }
  var voa=estado==='fly', anda=estado==='walk', ph=t*10;
  var bob=anda?-Math.abs(Math.cos(ph))*2.2:(voa?-4:Math.sin(t*2.4)*.6), inc=voa?-.08:(anda?Math.sin(ph*2)*.015:0);
  if(!voa) sombra(c,32,.22); else { c.save(); c.globalAlpha=.12; c.fillStyle='#000'; el(c,0,1.5,26,5); c.fill(); c.restore(); }
  c.translate(0,bob); c.rotate(inc);
  rabo(c,t,voa?1.2+Math.sin(t*9)*.08:.5+Math.sin(t*(anda?8:1.6))*(anda?.15:.08));
  var sw=function(f){ return anda?Math.sin(f)*.42:0; };
  if(voa){ pata(c,-20,.95,true,-1.4); pata(c,17,-1.0,true,1.6); } else { pata(c,-20,sw(ph+PI),true); pata(c,17,sw(ph),true); }
  el(c,0,-31,28,12.5); fs(c,rad(c,4,-37,28,cla(PEL,.32),PELS));
  c.save(); el(c,0,-31,28,12.5); c.clip(); c.fillStyle=cla(PEL,.28); el(c,4,-20,22,6); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; el(c,-6,-38,14,3); c.fill(); c.fillStyle=esc(PEL,.25); circ(c,-18,-28,3); c.fill(); circ(c,-12,-24,2); c.fill(); c.restore();
  crina(c,t,voa);
  c.save(); if(!voa) { c.translate(16,-37); c.rotate(anda?Math.sin(ph)*.04:Math.sin(t*1.5)*.04); c.translate(-16,37); } cabecaCavalo(c,t,voa); c.restore();
  sela(c);
  if(voa){ pata(c,-14,.85,false,-1.5); pata(c,22,-.95,false,1.7); } else { pata(c,-14,sw(ph),false); pata(c,22,sw(ph+PI),false); }
  if(voa){ c.save(); c.globalAlpha=.45; c.strokeStyle='#fff'; c.lineWidth=2; for(var v=0;v<3;v++){ var fv=(t*2+v/3)%1; c.beginPath(); c.moveTo(-40-fv*20,-50+v*10); c.lineTo(-30-fv*20,-50+v*10); c.stroke(); } c.restore(); }
  c.restore();
};
A.pip.SELA_Y=42; A.pip.SELA_X=-1;

/* ---------- ícones da Trilha da Linha do Tempo ---------- */
function envelope(c,selo){
  c.save(); c.rotate(-.08);
  rr(c,-15,-10,30,20,2.5); fs(c,lin(c,0,-10,0,10,'#fffdf5','#ece3cf'),'#8a7a5c',1.4);
  c.strokeStyle='#b8a888'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-15,10); c.lineTo(-3,0); c.moveTo(15,10); c.lineTo(3,0); c.stroke();
  c.beginPath(); c.moveTo(-14.5,-9.5); c.lineTo(0,2); c.lineTo(14.5,-9.5); c.closePath(); fs(c,lin(c,0,-10,0,2,'#f7efdc','#ddd0b2'),'#8a7a5c',1.2);
  if(selo){ c.save(); c.translate(8.5,-4); c.beginPath(); for(var i=0;i<=24;i++){ var a=i/24*TAU, r=(i%2?5.2:6); c.lineTo(Math.cos(a)*r*1.05,Math.sin(a)*r*1.15); } c.closePath(); fs(c,'#fff','#94a3b8',.8);
    rr(c,-4,-4.6,8,9.2,1); fs(c,lin(c,0,-4,0,5,'#f87171','#b91c1c'),null); c.fillStyle='#fde68a'; circ(c,0,-.5,2); c.fill(); c.restore();
    c.strokeStyle='rgba(30,58,138,.55)'; c.lineWidth=1; for(var k=0;k<3;k++){ c.beginPath(); c.moveTo(-1,-8+k*3); c.quadraticCurveTo(1,-9.5+k*3,3,-8+k*3); c.quadraticCurveTo(5,-6.5+k*3,7,-8+k*3); c.stroke(); }
    c.strokeStyle='#64748b'; c.lineWidth=1; c.beginPath(); c.moveTo(-10,4); c.lineTo(-1,4); c.moveTo(-10,7); c.lineTo(-4,7); c.stroke(); }
  c.restore();
}
function ampulheta(c,t){
  var k=(t*.25)%1;
  rr(c,-12,-16,24,4.5,2); fs(c,lin(c,0,-16,0,-11,'#c08040','#7c4a1e'),'#4a2810',1.1); rr(c,-12,11.5,24,4.5,2); fs(c,lin(c,0,11,0,16,'#c08040','#7c4a1e'),'#4a2810',1.1);
  c.fillStyle='#7c4a1e'; c.fillRect(-11,-12,2.4,24); c.fillRect(8.6,-12,2.4,24);
  c.beginPath(); c.moveTo(-7,-11.5); c.lineTo(7,-11.5); c.quadraticCurveTo(7,-3,1.2,0); c.quadraticCurveTo(7,3,7,11.5); c.lineTo(-7,11.5); c.quadraticCurveTo(-7,3,-1.2,0); c.quadraticCurveTo(-7,-3,-7,-11.5); c.closePath();
  c.fillStyle='rgba(219,234,254,.55)'; c.fill(); c.save(); c.clip();
  c.fillStyle='#f59e0b'; var top=-2-6*(1-k); c.beginPath(); c.moveTo(-7,top); c.lineTo(7,top); c.lineTo(0,0); c.closePath(); c.fill();
  var h=3+5*k; c.beginPath(); c.moveTo(-7,11.5); c.lineTo(7,11.5); c.lineTo(7,11.5-h*.6); c.quadraticCurveTo(0,11.5-h*1.3,-7,11.5-h*.6); c.closePath(); c.fill();
  c.fillRect(-.5,0,1,11.5-h*.9); c.restore();
  c.strokeStyle='rgba(100,116,139,.8)'; c.lineWidth=1.2; c.stroke(); c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-4.5,-9); c.quadraticCurveTo(-4.5,-5,-2,-3); c.stroke();
}
function jornal(c){
  c.save(); c.rotate(-.12);
  rr(c,-12,-15,26,30,1.5); fs(c,'#d6d3d1','#57534e',1.1);
  rr(c,-14,-14,26,30,1.5); fs(c,lin(c,-14,0,12,0,'#fafaf9','#e7e5e4'),'#57534e',1.3);
  c.fillStyle='#1c1917'; c.fillRect(-11,-11,20,4); c.fillStyle='#78716c'; c.fillRect(-11,-5.5,20,1.2);
  rr(c,-11,-3,9,8,1); fs(c,'#93c5fd',null); c.fillStyle='#22c55e'; c.fillRect(-11,2,9,3);
  c.strokeStyle='#a8a29e'; c.lineWidth=1; for(var i=0;i<4;i++){ c.beginPath(); c.moveTo(0,-2+i*2.6); c.lineTo(9,-2+i*2.6); c.stroke(); } for(var j=0;j<3;j++){ c.beginPath(); c.moveTo(-11,8+j*2.6); c.lineTo(9,8+j*2.6); c.stroke(); }
  c.fillStyle='rgba(0,0,0,.08)'; c.fillRect(-1.5,-14,3,30); c.restore();
}
function diario(c){
  c.save(); c.rotate(.08);
  rr(c,-11,-15,24,30,3); fs(c,lin(c,-11,-15,13,15,'#f472b6','#be185d'),'#831843',1.3);
  c.fillStyle='#fffbeb'; c.fillRect(11,-13,2.4,26); c.fillStyle='#9d174d'; c.fillRect(-11,-15,4,30);
  c.fillStyle='#fde68a'; c.save(); c.translate(1,-5); c.beginPath(); c.moveTo(0,4); c.bezierCurveTo(-7,-1,-4,-7,0,-3); c.bezierCurveTo(4,-7,7,-1,0,4); c.fill(); c.restore();
  rr(c,7,-2,10,5,1.5); fs(c,'#7c2d12','#451a03',1);
  c.save(); c.translate(15,3); c.strokeStyle='#a16207'; c.lineWidth=1.8; c.beginPath(); c.arc(0,-1,2.6,PI,TAU); c.stroke(); rr(c,-3.6,-1,7.2,6,1.4); fs(c,lin(c,0,-1,0,5,'#fde047','#ca8a04'),'#854d0e',1); c.fillStyle='#713f12'; circ(c,0,1.8,.9); c.fill(); c.restore();
  c.restore();
}
function album(c){
  c.save(); c.rotate(-.06);
  rr(c,-15,-12,30,24,2.5); fs(c,lin(c,0,-12,0,12,'#b45309','#7c2d12'),'#451a03',1.3);
  c.fillStyle='#5b210e'; c.fillRect(-15,-12,4,24);
  rr(c,-6,-8,16,13,1); fs(c,'#fffbeb','#a16207',.8); c.fillStyle='#7dd3fc'; c.fillRect(-5,-7,14,6); c.fillStyle='#4ade80'; c.fillRect(-5,-1,14,5);
  c.fillStyle='#fbbf24'; circ(c,5,-4,1.8); c.fill(); c.fillStyle='#78350f'; circ(c,-1,-2,2); c.fill(); rr(c,-2.6,0,3.2,4,1); c.fill();
  c.fillStyle='#fbbf24'; [[-11,-12,1,1],[15,-12,-1,1],[-11,12,1,-1],[15,12,-1,-1]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],p[1]); c.lineTo(p[0]+p[2]*5,p[1]); c.lineTo(p[0],p[1]+p[3]*5); c.closePath(); c.fill(); });
  c.strokeStyle='#fde68a'; c.lineWidth=1; c.beginPath(); c.moveTo(-4,8.5); c.lineTo(8,8.5); c.stroke(); c.restore();
}
function espanador(c,t){
  c.save(); c.rotate(.5+Math.sin(t*2)*.06);
  rr(c,-2.2,0,4.4,17,2); fs(c,lin(c,-2,0,2,0,'#c08040','#7c4a1e'),'#4a2810',1); rr(c,-3.2,-1,6.4,4,1.5); fs(c,'#f59e0b','#92400e',1);
  var cores=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899','#f97316'];
  for(var i=0;i<7;i++){ var a=-PI/2+(i-3)*.28; c.save(); c.translate(0,-1); c.rotate(a+PI/2); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-5,-9,0,-18); c.quadraticCurveTo(5,-9,0,0); c.closePath(); fs(c,lin(c,0,0,0,-18,esc(cores[i],.15),cla(cores[i],.35)),esc(cores[i],.4),.8); c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=.7; c.beginPath(); c.moveTo(0,-2); c.lineTo(0,-15); c.stroke(); c.restore(); }
  c.restore();
}
function fita(c){
  c.beginPath(); c.moveTo(4,6); c.lineTo(14,16); c.lineTo(9,17.5); c.lineTo(11,14); c.lineTo(7,15); c.lineTo(0,8); c.closePath(); fs(c,'rgba(253,230,138,.85)','#b7791f',1);
  circ(c,-1,-1,14); fs(c,rad(c,-1,-1,14,'#fde68a','#d4a24c'),'#92400e',1.4);
  c.strokeStyle='rgba(146,64,14,.35)'; c.lineWidth=1; circ(c,-1,-1,11.5); c.stroke(); circ(c,-1,-1,9.5); c.stroke();
  circ(c,-1,-1,7); fs(c,lin(c,-8,-8,6,6,'#f5f5f4','#a8a29e'),'#78716c',1.2); circ(c,-1,-1,5); fs(c,'#ffffff',null);
  c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.6; c.beginPath(); c.arc(-1,-1,12.5,1.1*PI,1.45*PI); c.stroke();
}
A.itemTrilha=function(c,n,t){
  t=t||0; c.save(); c.lineJoin='round'; c.lineCap='round';
  switch(n){ case 0: case 8: ampulheta(c,t); break; case 1: jornal(c); break; case 2: envelope(c,false); break; case 3: envelope(c,true); break;
    case 4: diario(c); break; case 5: album(c); break; case 6: espanador(c,t); break; case 7: fita(c); break; default: ampulheta(c,t); }
  c.restore();
};
})();
