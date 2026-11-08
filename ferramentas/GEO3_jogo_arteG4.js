/* ============================================================
   GEO3_jogo_arteG4.js — Guardiões da Casa Maior. Arte nova 4/5: OBJETOS E ÍCONES.
   - A.itemTrilha(c,n,t): 0 mochila de sementes · 1 Semente da Amazônia · 2/3 folha da
     vitória-régia · 4 Cerrado · 5 Caatinga · 6 Pampa · 7 Pantanal · 8 Mata Atlântica
     (índices = os que o motor usa em poderes.js/cena.js; cores do mapa U4 S8).
   - A.biscoito(c,x,y,r)          -> GOTA DE CHUVA (tiro e ícone da fase 8)
   - A.paginaHud / A.paginaVoando -> SELO DE GUARDIÃO (folha verde com estrela)
   - A.cartaFonte(c,tipo,x,y,s,t) -> os 4 cartões CASA · RUA · BAIRRO · CIDADE (U3 S12/S14)
   - CARRINHOS.desenhaTras: pilotos e carrinhos da corrida vistos de costas: Mariana e
     João (mochila), motorista (ônibus), Seu José (pães), gari (lixeira), entregador
     (bolsa térmica), cozinheiro (panela), Dona Antônia (carrinho de feira), Rei Entulho
     (carrinho de lixo). Os demais (professora, médica, pedreiro) ficam como estavam.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, brilho=I.brilho, cintila=I.cintila;
var FONTE='"Nunito","Segoe UI Black","Arial Rounded MT Bold","Arial Black",Arial,sans-serif';
var BIOMA={1:['#9ccc3c','amaz'],4:['#f06fae','cerr'],5:['#f2e27a','caat'],6:['#f58b4c','pamp'],7:['#e9c6e6','pant'],8:['#9fd0ef','mata']};

/* ---------- semente (gota com broto), ~30 px, com o glifo do bioma ---------- */
function semente(c,cor,glifo,t){
  c.save(); c.rotate(Math.sin(t*1.5)*.04);
  c.beginPath(); c.moveTo(0,-15); c.bezierCurveTo(10,-6,14,2,13,7); c.bezierCurveTo(12,14,-12,14,-13,7); c.bezierCurveTo(-14,2,-10,-6,0,-15); c.closePath();
  fs(c,rad(c,-4,0,16,cla(cor,.35),esc(cor,.12)),esc(cor,.5),1.4);
  c.fillStyle='rgba(255,255,255,.5)'; el(c,-6,-2,2.4,5); c.fill();
  c.strokeStyle='#15803d'; c.lineWidth=1.8; c.beginPath(); c.moveTo(0,-14); c.quadraticCurveTo(1,-20,4,-22); c.stroke();
  c.beginPath(); c.moveTo(4,-22); c.quadraticCurveTo(10,-26,11,-20); c.quadraticCurveTo(6,-18,4,-22); c.closePath(); fs(c,'#4ade80','#15803d',1);
  var g='rgba(40,30,20,.55)'; c.fillStyle=g; c.strokeStyle=g; c.lineWidth=1.6; c.lineCap='round';
  if(glifo==='amaz'){ c.beginPath(); c.moveTo(0,10); c.lineTo(0,-2); c.stroke(); circ(c,-3,-3,3.2); c.fill(); circ(c,3,-4,3.4); c.fill(); circ(c,0,-7,3.2); c.fill(); }
  else if(glifo==='cerr'){ c.beginPath(); c.moveTo(-1,10); c.quadraticCurveTo(3,4,-2,0); c.quadraticCurveTo(-5,-3,1,-5); c.stroke(); circ(c,2,-7,3); c.fill(); circ(c,-4,-4,2.4); c.fill(); }
  else if(glifo==='caat'){ c.lineWidth=2.6; c.beginPath(); c.moveTo(0,10); c.lineTo(0,-6); c.moveTo(-5,2); c.lineTo(-5,-2); c.quadraticCurveTo(-5,-5,-1,-4); c.moveTo(5,4); c.lineTo(5,0); c.quadraticCurveTo(5,-3,1,-2); c.stroke(); }
  else if(glifo==='pamp'){ c.beginPath(); [-6,-3,0,3,6].forEach(function(x,k){ c.moveTo(x,10); c.quadraticCurveTo(x+(k%2?2:-2),2,x+(k%2?3:-3),-4); }); c.stroke(); }
  else if(glifo==='pant'){ c.beginPath(); c.moveTo(-8,5); c.quadraticCurveTo(-4,1,0,5); c.quadraticCurveTo(4,9,8,5); c.moveTo(-8,9); c.quadraticCurveTo(-4,5,0,9); c.quadraticCurveTo(4,13,8,9); c.stroke(); circ(c,1,-4,3); c.fill(); }
  else if(glifo==='mata'){ c.beginPath(); c.moveTo(0,10); c.lineTo(0,2); c.stroke(); [[-7,-6],[-3,-9],[2,-10],[6,-7],[8,-2],[-8,0]].forEach(function(p){ c.beginPath(); c.moveTo(0,2); c.quadraticCurveTo(p[0]*.6,p[1]*.4,p[0],p[1]); c.stroke(); }); }
  c.restore();
}
function mochilinha(c,t){
  c.save(); c.rotate(-.06+Math.sin(t*1.5)*.03);
  rr(c,-12,-13,24,28,7); fs(c,lin(c,-12,-13,12,15,'#a78bfa','#5b21b6'),'#3b0764',1.4);
  c.beginPath(); c.moveTo(-12,-5); c.lineTo(12,-5); c.lineTo(12,-9); c.quadraticCurveTo(12,-16,4,-16); c.lineTo(-4,-16); c.quadraticCurveTo(-12,-16,-12,-9); c.closePath(); fs(c,lin(c,0,-16,0,-5,'#fde68a','#f59e0b'),'#92400e',1.1);
  rr(c,-8,0,16,10,3); fs(c,'#4c1d95','#2e1065',1); c.fillStyle='#fde047'; circ(c,0,-3,2); c.fill();
  c.strokeStyle='#3b0764'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-6,-16); c.quadraticCurveTo(-6,-22,0,-22); c.quadraticCurveTo(6,-22,6,-16); c.stroke();
  c.restore();
}
function folhaVR(c,t){
  c.save(); c.rotate(Math.sin(t*1.2)*.04);
  c.beginPath(); c.moveTo(4,-2); c.lineTo(15,-5); c.arc(0,0,15.5,-.32,TAU-.42); c.closePath(); fs(c,rad(c,-4,-4,17,'#86efac','#15803d'),'#14532d',1.4);
  c.strokeStyle='rgba(20,83,45,.45)'; c.lineWidth=1; for(var k=0;k<7;k++){ var a=.3+k*.75; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.cos(a)*13,Math.sin(a)*13); c.stroke(); }
  c.strokeStyle='#dcfce7'; c.lineWidth=2.4; c.beginPath(); c.arc(0,0,14,-.25,TAU-.5); c.stroke();
  c.fillStyle='#f9a8d4'; for(var p=0;p<6;p++){ var pa=p/6*TAU; el(c,-5+Math.cos(pa)*4.5,-7+Math.sin(pa)*4.5,3,1.8); c.save(); c.translate(-5+Math.cos(pa)*4.5,-7+Math.sin(pa)*4.5); c.rotate(pa); el(c,0,0,3.6,1.9); c.fill(); c.restore(); } c.fillStyle='#fde047'; circ(c,-5,-7,2.2); c.fill();
  c.restore();
}
A.itemTrilha=function(c,n,t){
  t=t||0; c.save(); c.lineJoin='round'; c.lineCap='round';
  if(n===0) mochilinha(c,t); else if(n===2||n===3) folhaVR(c,t); else { var b=BIOMA[n]||BIOMA[8]; semente(c,b[0],b[1],t); }
  c.restore();
};

/* ---------- GOTA DE CHUVA (ex-biscoito) ---------- */
A.biscoito=function(c,x,y,r,mordida){
  c.save(); c.translate(x,y); c.lineJoin='round';
  c.beginPath(); c.moveTo(0,-r*1.25); c.bezierCurveTo(r*.75,-r*.45,r,r*.05,r,r*.3); c.bezierCurveTo(r,r*.85,r*.55,r*1.1,0,r*1.1); c.bezierCurveTo(-r*.55,r*1.1,-r,r*.85,-r,r*.3); c.bezierCurveTo(-r,r*.05,-r*.75,-r*.45,0,-r*1.25); c.closePath();
  fs(c,rad(c,-r*.3,r*.1,r*1.2,'#bae6fd','#2563eb'),'#1e3a8a',Math.max(1,r*.09));
  c.fillStyle='rgba(255,255,255,.75)'; el(c,-r*.4,r*.1,r*.18,r*.4); c.fill(); c.fillStyle='rgba(255,255,255,.5)'; circ(c,-r*.25,r*.6,r*.1); c.fill();
  c.restore();
};

/* ---------- SELO DE GUARDIÃO: folha verde redonda com estrela ---------- */
function selo(c,r,t){
  c.beginPath(); for(var i=0;i<=28;i++){ var a=i/28*TAU, k=i%2?.9:1; c.lineTo(Math.cos(a)*r*k,Math.sin(a)*r*k); } c.closePath(); fs(c,rad(c,-r*.3,-r*.3,r*1.2,'#86efac','#15803d'),'#14532d',Math.max(1,r*.08));
  c.beginPath(); c.moveTo(-r*.62,r*.55); c.quadraticCurveTo(-r*.7,-r*.5,r*.6,-r*.6); c.quadraticCurveTo(r*.7,r*.4,-r*.62,r*.55); c.closePath(); fs(c,'rgba(255,255,255,.22)','rgba(20,83,45,.5)',1);
  c.strokeStyle='rgba(20,83,45,.5)'; c.lineWidth=1; c.beginPath(); c.moveTo(-r*.55,r*.5); c.lineTo(r*.5,-r*.52); c.stroke();
  A.estrela(c,r*.02,-r*.02,r*.42,'#fde047',t*.3); c.strokeStyle='#a16207'; c.lineWidth=.8; c.save(); c.globalAlpha=.7; A.estrela(c,r*.02,-r*.02,r*.42,'rgba(0,0,0,0)',t*.3); c.restore();
}
A.paginaHud=function(c,x,y,n,t){
  t=t||0; c.save(); c.translate(x,y); c.lineJoin='round';
  brilho(c,0,0,26,'rgba(134,239,172,.55)',.55+.25*Math.sin(t*3));
  c.save(); c.rotate(-.1+Math.sin(t*2)*.03); selo(c,14,t); c.restore();
  if(n!=null){ c.font='900 18px '+FONTE; c.textAlign='left'; c.textBaseline='middle'; c.lineWidth=4; c.strokeStyle='rgba(20,40,20,.75)'; c.strokeText('x'+n,18,2); c.fillStyle='#f0fdf4'; c.fillText('x'+n,18,2); }
  c.restore();
};
A.paginaVoando=function(c,x,y,rot){
  rot=rot||0; var fl=Math.sin(rot*3);
  c.save(); c.translate(x,y); c.lineJoin='round';
  brilho(c,0,0,42,'rgba(187,247,208,.8)',.7);
  for(var i=0;i<5;i++){ var a=rot*1.5+i*TAU/5; c.save(); c.globalAlpha=.55+.45*Math.sin(rot*4+i); cintila(c,Math.cos(a)*30,Math.sin(a)*26,3+(i%2)*2,'#fffbe0'); c.restore(); }
  c.rotate(rot*.25); c.scale(1,.9+.1*Math.abs(fl)); selo(c,22,rot);
  c.restore();
};

/* ---------- CARTÕES casa -> rua -> bairro -> cidade ---------- */
var COR={oral:'#a855f7',escrita:'#3b82f6',visual:'#f97316',material:'#22c55e'}, NOME={oral:'CASA',escrita:'RUA',visual:'BAIRRO',material:'CIDADE'};
function txt(c,s,x,y,px,cor,halo){ c.font='900 '+px+'px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; if(halo){ c.lineJoin='round'; c.lineWidth=Math.max(2.5,px*.3); c.strokeStyle=halo; c.strokeText(s,x,y); } c.fillStyle=cor; c.fillText(s,x,y); }
function casinha(c,x,y,w,h,cor,telhado){ rr(c,x-w/2,y-h,w,h,1); fs(c,cor,OL,.9); c.beginPath(); c.moveTo(x-w/2-1.5,y-h); c.lineTo(x,y-h-w*.45); c.lineTo(x+w/2+1.5,y-h); c.closePath(); fs(c,telhado||'#dc2626',OL,.9); c.fillStyle='#7dd3fc'; c.fillRect(x-w*.3,y-h*.75,w*.25,h*.3); c.fillStyle='#7c4a1e'; c.fillRect(x+w*.08,y-h*.55,w*.22,h*.55); }
A.cartaFonte=function(c,tipo,x,y,s,t){
  var cor=COR[tipo]||COR.oral; s=s||1; t=t||0; c.save(); c.translate(x,y); c.scale(s,s); c.lineJoin='round'; c.lineCap='round';
  c.fillStyle='rgba(0,0,0,.25)'; rr(c,-20.5,-26.5,44,58,7); c.fill();
  rr(c,-22,-29,44,58,7); c.fillStyle=lin(c,-22,-29,22,29,cla(cor,.28),esc(cor,.18)); c.fill(); c.strokeStyle=esc(cor,.5); c.lineWidth=1.5; c.stroke();
  c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1; rr(c,-19.5,-26.5,39,53,5); c.stroke();
  rr(c,-17,-24,34,33,5); c.fillStyle='#fffaf0'; c.fill(); c.strokeStyle=esc(cor,.35); c.lineWidth=1; c.stroke();
  c.save(); rr(c,-17,-24,34,33,5); c.clip(); c.fillStyle='#bae6fd'; c.fillRect(-17,-24,34,20); c.fillStyle='#86efac'; c.fillRect(-17,-4,34,13);
  if(tipo==='escrita'){ c.fillStyle='#64748b'; c.fillRect(-17,0,34,9); c.strokeStyle='#fff'; c.lineWidth=1; c.setLineDash([3,2]); c.beginPath(); c.moveTo(-17,4.5); c.lineTo(17,4.5); c.stroke(); c.setLineDash([]); casinha(c,-9,0,10,8,'#fde68a'); casinha(c,3,0,9,7,'#fecaca','#1d4ed8'); casinha(c,13,0,8,7,'#bfdbfe'); c.fillStyle='#78716c'; c.fillRect(-15,-12,1.5,12); c.fillStyle='#fde047'; circ(c,-14.2,-13,2); c.fill(); }
  else if(tipo==='visual'){ c.fillStyle='#64748b'; c.fillRect(-17,-8,34,4); c.fillRect(-17,3,34,4); c.fillRect(-4,-24,4,33); [[-11,-9,'#fde68a'],[8,-9,'#fecaca'],[-11,2,'#bfdbfe'],[8,2,'#d9f99d'],[13,-9,'#fde68a']].forEach(function(p){ casinha(c,p[0],p[1],7,5,p[2]); }); c.fillStyle='#16a34a'; circ(c,13,5,2.6); c.fill(); circ(c,-14,6,2.2); c.fill(); }
  else if(tipo==='material'){ [[-14,-16,6],[-7,-22,6],[1,-18,7],[9,-24,6],[15,-14,5]].forEach(function(b){ rr(c,b[0]-b[2]/2,b[1],b[2],8-b[1],.5); fs(c,lin(c,b[0],b[1],b[0],8,'#cbd5e1','#64748b'),OL,.8); c.fillStyle='#fde047'; for(var w=b[1]+2;w<4;w+=3) c.fillRect(b[0]-1.5,w,3,1.6); }); c.fillStyle='#475569'; c.fillRect(-17,5,34,5); c.strokeStyle='#fff'; c.lineWidth=.8; c.setLineDash([2,2]); c.beginPath(); c.moveTo(-17,7.5); c.lineTo(17,7.5); c.stroke(); c.setLineDash([]); }
  else { casinha(c,0,4,18,14,'#fde68a'); c.fillStyle='#16a34a'; circ(c,-12,0,3.4); c.fill(); c.fillStyle='#7c4a1e'; c.fillRect(-12.6,0,1.2,5); c.fillStyle='#fde047'; circ(c,12,-17,3.4); c.fill(); }
  c.restore();
  if(s>=.75) txt(c,NOME[tipo]||'',0,18.5,tipo==='material'?6.6:tipo==='visual'?7:8,'#fff',esc(cor,.45));
  var sw=((t*.4)%2.2)-.6; if(sw<1){ c.save(); rr(c,-22,-29,44,58,7); c.clip(); c.globalAlpha=.35; c.fillStyle='#fff'; c.beginPath(); c.moveTo(-30+sw*70,-30); c.lineTo(-22+sw*70,-30); c.lineTo(-40+sw*70,30); c.lineTo(-48+sw*70,30); c.fill(); c.restore(); }
  c.restore();
};

/* ============================================================
   CARRINHOS vistos de costas (corrida): pilotos e carrinhos do universo.
   Centrados em (0,0) = chão entre as rodas; ~120 px na escala 1.
   ============================================================ */
function borda(c,cor,lw){ c.strokeStyle=cor||'rgba(48,24,44,.55)'; c.lineWidth=lw||2; c.stroke(); }
function ombros(c,cor,cor2){ rr(c,-17,7,34,17,7); c.fillStyle=lin(c,-17,0,17,0,cla(cor,.15),cor2||esc(cor,.2)); c.fill(); borda(c,null,1.5); }
function nuca(c,pele,cab,curto){ c.fillStyle=pele; el(c,-15,-2,3.6,5); c.fill(); el(c,15,-2,3.6,5); c.fill(); circ(c,0,-4,15.5); c.fillStyle=lin(c,0,-20,0,12,cla(cab,.12),esc(cab,.1)); c.fill(); borda(c,null,1.5);
  if(curto){ c.fillStyle=pele; c.beginPath(); c.moveTo(-8,9); c.quadraticCurveTo(0,4,8,9); c.lineTo(6,12); c.lineTo(-6,12); c.closePath(); c.fill(); } }
function mochTras(c,cor,cor2){ rr(c,-13,-2,26,28,7); c.fillStyle=lin(c,-13,0,13,0,cla(cor,.15),esc(cor,.25)); c.fill(); borda(c,esc(cor,.5),1.4); c.beginPath(); c.moveTo(-13,6); c.lineTo(13,6); c.lineTo(13,2); c.quadraticCurveTo(13,-3,8,-3); c.lineTo(-8,-3); c.quadraticCurveTo(-13,-3,-13,2); c.closePath(); c.fillStyle=cor2; c.fill(); borda(c,esc(cor2,.4),1); rr(c,-8,12,16,10,3); c.fillStyle=esc(cor,.35); c.fill(); c.fillStyle='#fde047'; circ(c,0,4,2); c.fill(); }
function bone(c,cor){ c.beginPath(); c.arc(0,-6,16.5,PI,0); c.closePath(); c.fillStyle=lin(c,0,-22,0,-6,cla(cor,.15),esc(cor,.15)); c.fill(); borda(c,null,1.5); rr(c,-17,-9,34,5,2.5); c.fillStyle=esc(cor,.3); c.fill(); }
function tampinha(c,x,y,r,cor){ c.save(); c.translate(x,y); c.beginPath(); for(var i=0;i<=20;i++){ var a=i/20*TAU, k=i%2?.86:1; c.lineTo(Math.cos(a)*r*k,Math.sin(a)*r*k); } c.closePath(); c.fillStyle=lin(c,-r,-r,r,r,cla(cor,.3),esc(cor,.2)); c.fill(); borda(c,esc(cor,.5),1); c.restore(); }
var PIL={
  lia:function(c,o,t){ ombros(c,o.cor||'#e11d48'); mochTras(c,'#7c3aed','#fbbf24'); c.fillStyle='#fcdcc4'; el(c,-15,-2,3.6,5); c.fill(); el(c,15,-2,3.6,5); c.fill();
    circ(c,0,-4,15.5); c.fillStyle=lin(c,0,-20,0,12,'#a26a3a','#5a3219'); c.fill(); borda(c,null,1.5); var sw=Math.sin(t*4)*3; c.beginPath(); c.moveTo(-5,6); c.quadraticCurveTo(-8+sw,16,sw,26); c.quadraticCurveTo(8+sw,16,5,6); c.closePath(); c.fillStyle='#8d5530'; c.fill(); borda(c,'#5a3219',1.2); c.fillStyle=o.cor||'#e11d48'; circ(c,0,7,3.4); c.fill(); },
  theo:function(c,o,t){ ombros(c,o.cor||'#2563eb'); mochTras(c,'#16a34a','#f97316'); nuca(c,'#b97a4e','#2c1a10',true); c.fillStyle='#2c1a10'; for(var q=0;q<7;q++){ circ(c,-12+q*4,-16-Math.abs(q-3)*.8,4.8); c.fill(); } },
  dragon:function(c,o,t){ ombros(c,'#bfdbfe','#60a5fa'); c.fillStyle='#1e3a8a'; c.fillRect(-2,7,4,17); nuca(c,'#c68b59','#2c1a10',true); bone(c,'#1e3a8a'); c.fillStyle='#fde047'; rr(c,-5,-9,10,4,1.5); c.fill(); },
  knight:function(c,o,t){ ombros(c,'#bfdbfe','#60a5fa'); c.fillStyle='#fff'; c.fillRect(-9,7,18,17); c.strokeStyle='#94a3b8'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-9,7); c.lineTo(-13,12); c.moveTo(9,7); c.lineTo(13,12); c.stroke();
    nuca(c,'#f1c6a0','#78716c',true); rr(c,-18,-9,36,8,3); c.fillStyle='#e5e7eb'; c.fill(); borda(c,'#9ca3af',1.2); c.beginPath(); c.moveTo(-17,-8); c.bezierCurveTo(-24,-22,-10,-30,-4,-22); c.bezierCurveTo(0,-32,12,-32,13,-22); c.bezierCurveTo(20,-28,28,-18,17,-8); c.closePath(); c.fillStyle=lin(c,0,-30,0,-8,'#ffffff','#e5e7eb'); c.fill(); borda(c,'#9ca3af',1.2); },
  fairy:function(c,o,t){ ombros(c,'#fb923c','#ea580c'); c.fillStyle='#e5e7eb'; c.fillRect(-17,14,34,3); c.fillRect(-17,20,34,3); nuca(c,'#f0c39a','#3a2416',true); bone(c,'#f97316'); },
  red:function(c,o,t){ ombros(c,'#ef4444','#b91c1c'); c.fillStyle='#fde68a'; c.fillRect(-17,15,34,3); nuca(c,'#b97a4e','#2c1a10',true); c.beginPath(); c.arc(0,-5,17,PI,0); c.lineTo(17,4); c.lineTo(-17,4); c.closePath(); c.fillStyle=lin(c,0,-22,0,4,'#f87171','#b91c1c'); c.fill(); borda(c,'#7f1d1d',1.4); c.fillStyle='#fde047'; c.fillRect(-10,-14,20,3); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=2; c.beginPath(); c.arc(0,-6,12,1.15*PI,1.4*PI); c.stroke(); },
  pig:function(c,o,t){ ombros(c,'#f8fafc','#cbd5e1'); c.fillStyle='#1e3a8a'; for(var y=9;y<24;y+=5) c.fillRect(-4,y,8,2); nuca(c,'#e0a77a','#3a2416',true); rr(c,-17,-9,34,7,3); c.fillStyle='#e5e7eb'; c.fill(); borda(c,'#9ca3af',1.2);
    c.beginPath(); c.moveTo(-16,-8); c.bezierCurveTo(-22,-26,-6,-34,0,-24); c.bezierCurveTo(6,-34,22,-26,16,-8); c.closePath(); c.fillStyle=lin(c,0,-32,0,-8,'#ffffff','#e5e7eb'); c.fill(); borda(c,'#9ca3af',1.2); },
  witch:function(c,o,t){ ombros(c,'#f9a8d4','#db2777'); c.fillStyle='#fff'; for(var i=0;i<6;i++){ circ(c,-12+(i%3)*12,11+Math.floor(i/3)*8,1.6); c.fill(); }
    nuca(c,'#d9a072','#4a3222',false); circ(c,0,-18,8); c.fillStyle=lin(c,0,-26,0,-10,'#6b4a2b','#2a160b'); c.fill(); borda(c,'#1f1009',1.4); c.strokeStyle='#fbbf24'; c.lineWidth=2; c.beginPath(); c.moveTo(-9,-22); c.lineTo(9,-16); c.stroke(); c.strokeStyle='#b45309'; c.lineWidth=1.6; c.beginPath(); c.moveTo(-17,-5); c.lineTo(-13,-3); c.moveTo(17,-5); c.lineTo(13,-3); c.stroke(); },
  count:function(c,o,t){ [-1,1].forEach(function(s){ c.save(); c.translate(s*22,10); c.rotate(s*.4); rr(c,-7,-12,14,18,4); c.fillStyle='rgba(191,219,254,.85)'; c.fill(); borda(c,'#60a5fa',1.2); c.restore(); });
    for(var g=0;g<6;g++){ circ(c,-14+g*5.6,10,5); c.fillStyle=g%2?'#f5f5f4':'#e7e5e4'; c.fill(); borda(c,'#a8a29e',1); }
    circ(c,0,-4,15.5); c.fillStyle=lin(c,0,-20,0,12,'#d6d3d1','#8a847c'); c.fill(); borda(c,'#3f3a34',1.6); c.beginPath(); c.moveTo(-5,-18); c.quadraticCurveTo(-8,-26,-2,-25); c.quadraticCurveTo(0,-29,2,-25); c.quadraticCurveTo(8,-26,5,-18); c.closePath(); c.fillStyle='#b8b0a4'; c.fill(); borda(c,'#3f3a34',1.2);
    c.save(); c.translate(3,-12); c.rotate(.15); rr(c,-15,-3,30,6,2); c.fillStyle='#d1d5db'; c.fill(); borda(c,'#4b5563',1); [[-11,'#dc2626'],[-5,'#2563eb'],[1,'#facc15'],[7,'#16a34a'],[13,'#f97316']].forEach(function(p){ tampinha(c,p[0],-6,3.6,p[1]); }); c.restore(); }
};
var CAR={
  lia:function(c,o,t){ var cor=o.cor||'#e11d48'; rr(c,-46,-56,92,52,10); c.fillStyle=lin(c,0,-56,0,-4,cla(cor,.2),esc(cor,.25)); c.fill(); borda(c,esc(cor,.5),2); c.fillStyle='rgba(255,255,255,.25)'; rr(c,-40,-50,80,10,4); c.fill(); A.estrela(c,0,-30,12,'#fde047',0); c.fillStyle='#fff'; rr(c,-20,-14,40,6,3); c.fill(); return -56; },
  theo:function(c,o,t){ var cor=o.cor||'#2563eb'; rr(c,-46,-56,92,52,10); c.fillStyle=lin(c,0,-56,0,-4,cla(cor,.2),esc(cor,.25)); c.fill(); borda(c,esc(cor,.5),2); c.fillStyle='rgba(255,255,255,.25)'; rr(c,-40,-50,80,10,4); c.fill(); c.fillStyle='#fde047'; rr(c,-30,-36,60,12,6); c.fill(); c.fillStyle='#1e3a8a'; c.fillRect(-20,-32,40,4); return -56; },
  dragon:function(c,o,t){ rr(c,-48,-74,96,70,8); c.fillStyle=lin(c,0,-74,0,-4,'#fde047','#ca8a04'); c.fill(); borda(c,'#854d0e',2); c.fillStyle='#1e3a8a'; rr(c,-40,-66,80,24,3); c.fill(); c.fillStyle='#93c5fd'; for(var k=0;k<4;k++){ rr(c,-38+k*20,-64,16,20,2); c.fill(); }
    c.fillStyle='#fff'; c.font='900 11px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillText('ÔNIBUS',0,-30); c.fillStyle='#ef4444'; rr(c,-46,-18,12,8,3); c.fill(); rr(c,34,-18,12,8,3); c.fill(); c.fillStyle='#d97706'; c.fillRect(-48,-10,96,4); return -70; },
  knight:function(c,o,t){ for(var k=0;k<7;k++){ var x=-36+k*12, y=-62+(k%2)*4; el(c,x,y,8,5.5); c.fillStyle=rad(c,x-2,y-2,8,'#fde68a','#c2762a'); c.fill(); borda(c,'#8a4f1d',1); c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=1; c.beginPath(); c.moveTo(x-4,y-1); c.quadraticCurveTo(x,y-4,x+4,y-1); c.stroke(); }
    rr(c,-46,-58,92,54,4); c.fillStyle=lin(c,0,-58,0,-4,'#d6a265','#9a6a3a'); c.fill(); borda(c,'#5b3a1e',2); c.strokeStyle='#7a5028'; c.lineWidth=2; [-40,-24].forEach(function(y){ c.beginPath(); c.moveTo(-46,y); c.lineTo(46,y); c.stroke(); }); c.fillStyle='#fff'; rr(c,-22,-44,44,14,3); c.fill(); borda(c,'#b45309',1.2); c.fillStyle='#b45309'; c.font='900 9px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillText('PADARIA',0,-37); return -60; },
  fairy:function(c,o,t){ rr(c,-40,-70,80,66,6); c.fillStyle=lin(c,-40,0,40,0,'#4ade80','#15803d'); c.fill(); borda(c,'#14532d',2); rr(c,-44,-76,88,9,3); c.fillStyle='#86efac'; c.fill(); borda(c,'#14532d',1.5); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(-28,-60,5,48); c.fillStyle='#fde047'; rr(c,-12,-50,24,12,2); c.fill();
    c.strokeStyle='#92400e'; c.lineWidth=4; c.beginPath(); c.moveTo(34,-70); c.lineTo(40,-104); c.stroke(); c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(30,-70); c.lineTo(38,-70); c.lineTo(46,-52); c.lineTo(24,-52); c.closePath(); c.fill(); borda(c,'#92400e',1); return -72; },
  red:function(c,o,t){ rr(c,-42,-66,84,62,6); c.fillStyle=lin(c,0,-66,0,-4,'#f87171','#b91c1c'); c.fill(); borda(c,'#7f1d1d',2); c.fillStyle='#fde68a'; c.fillRect(-42,-36,84,6); rr(c,-30,-58,60,14,3); c.fillStyle='#fecaca'; c.fill(); c.fillStyle='#7f1d1d'; c.fillRect(-30,-28,60,3); c.fillStyle='#fff'; rr(c,-10,-20,20,8,3); c.fill(); return -66; },
  pig:function(c,o,t){ el(c,0,-62,44,10); c.fillStyle='#9ca3af'; c.fill(); borda(c,'#4b5563',1.5); rr(c,-44,-62,88,58,8); c.fillStyle=lin(c,-44,0,44,0,'#f3f4f6','#6b7280'); c.fill(); borda(c,'#374151',2); el(c,0,-64,38,8); c.fillStyle=lin(c,-38,0,38,0,'#e5e7eb','#9ca3af'); c.fill(); borda(c,'#4b5563',1.2); rr(c,-5,-74,10,8,3); c.fillStyle='#374151'; c.fill();
    c.strokeStyle='#1f2937'; c.lineWidth=4; [-1,1].forEach(function(s){ c.beginPath(); c.moveTo(s*44,-50); c.lineTo(s*56,-50); c.lineTo(s*56,-34); c.stroke(); }); for(var v=0;v<3;v++){ var f=(t*.5+v/3)%1; c.save(); c.globalAlpha=.5*(1-f); c.fillStyle='#fff'; circ(c,-12+v*12,-70-f*28,4+f*5); c.fill(); c.restore(); } return -64; },
  witch:function(c,o,t){ rr(c,-34,-66,68,62,8); c.fillStyle=lin(c,0,-66,0,-4,'#f87171','#b91c1c'); c.fill(); borda(c,'#7f1d1d',2); c.save(); rr(c,-34,-66,68,62,8); c.clip(); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=3; for(var k=-60;k<70;k+=14){ c.beginPath(); c.moveTo(k,-70); c.lineTo(k+40,0); c.moveTo(k+40,-70); c.lineTo(k,0); c.stroke(); } c.restore();
    c.strokeStyle='#1f2937'; c.lineWidth=4; c.beginPath(); c.moveTo(-40,-6); c.lineTo(-40,-90); c.lineTo(40,-90); c.lineTo(40,-6); c.stroke(); el(c,-4,-70,5,3.6); c.fillStyle='#e9b36f'; c.fill(); borda(c,'#8a4f1d',1); c.fillStyle='#16a34a'; el(c,10,-72,7,4); c.fill(); return -72; },
  count:function(c,o,t){ rr(c,-44,-60,88,56,6); c.fillStyle=lin(c,-44,0,44,0,'#78716c','#292524'); c.fill(); borda(c,'#1c1917',2); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(-32,-52,4,44); c.fillRect(28,-52,4,44);
    rr(c,-48,-68,96,10,4); c.fillStyle=lin(c,0,-68,0,-58,'#57534e','#292524'); c.fill(); borda(c,'#1c1917',1.5); rr(c,-10,-74,20,6,2); c.fillStyle='#44403c'; c.fill();
    c.save(); c.translate(-26,-72); c.rotate(-.3); rr(c,-5,-10,10,20,3); c.fillStyle='#16a34a'; c.fill(); borda(c,'#14532d',1); c.restore(); c.save(); c.translate(26,-74); c.rotate(.4); rr(c,-6,-8,12,16,2.5); c.fillStyle='#e5e7eb'; c.fill(); borda(c,'#6b7280',1); c.fillStyle='#ef4444'; c.fillRect(-6,-2,12,4); c.restore();
    c.fillStyle='#fde047'; [[-12,-80],[0,-84],[12,-80]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],p[1]+6); c.quadraticCurveTo(p[0]-5,p[1]-2,p[0],p[1]-8); c.quadraticCurveTo(p[0]+5,p[1]-2,p[0],p[1]+6); c.fill(); }); return -64; }
};
function liga(){
  var CR=window.CARRINHOS; if(!CR||CR.__geo3) return; CR.__geo3=true;
  var tras0=CR.desenhaTras;
  CR.desenhaTras=function(c,id,o){
    if(!CAR[id]) return tras0(c,id,o);
    o=o||{}; var t=o.t||0; c.save();
    c.fillStyle='rgba(0,0,0,.28)'; el(c,0,2,60,10); c.fill();
    if(o.giro) c.rotate(Math.sin(o.giro*Math.PI*2)*.5);
    c.rotate((o.inc||0)*.12);
    if(o.turbo){ for(var k=0;k<2;k++){ var fl=14+((t*37+k*13)%1)*10; c.fillStyle='rgba(249,115,22,.9)'; c.beginPath(); c.moveTo(-26+k*52-6,-12); c.lineTo(-26+k*52,-12+fl); c.lineTo(-26+k*52+6,-12); c.fill(); } }
    [-1,1].forEach(function(l){ c.fillStyle='#111827'; rr(c,l*46-11,-30,22,30,6); c.fill(); c.fillStyle='#374151'; c.fillRect(l*46-8,-26+((t*30)%6),16,2); });
    var topo=CAR[id](c,o,t);
    c.save(); c.translate(0,topo-6); (PIL[id]||function(){})(c,o,t); c.restore();
    c.restore();
  };
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',liga); else liga();
})();
