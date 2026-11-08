/* ============================================================
   GEO3_jogo_arteG3.js — Guardiões da Casa Maior. Arte nova 3/5: os VILÕES
   (U4 S18: lixo na margem do rio, sacolas, ar poluído). Cômicos, nunca
   assustadores. Nomes internos mantidos (o motor decide por eles):
     A.conde(c,x,y,estado,t)      -> REI ENTULHO: monte de lixo com coroa de
        tampinhas, luvas amarelas, desentupidor de cetro. Pés em (x,y), ~150 px.
        estados idle | write (= joga lixo) | laugh | hit | sad
     A.traca(c,x,y,t,dir,voando)  -> SACOLINHA voadora (~40 px), alças batendo
     A.poeira(c,x,y,t,dir,achatado)-> FUMACINHA, nuvem cinza que anda (~36 px)
     A.tracona(c,x,y,t,hp,max)    -> MONTE DE ENTULHO, mini-chefe (~110 px) com um
        pneu em cima para pisar; hp/max como antes.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho;

function fofo(c,cx,cy,rx,ry,n,amp){ c.beginPath(); for(var i=0;i<=n*4;i++){ var a=i/(n*4)*TAU, k=1+amp*Math.abs(Math.sin(i*PI/4)); c.lineTo(cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k); } c.closePath(); }
/* tampinha de garrafa (vista de cima: borda serrilhada) */
function tampinha(c,x,y,r,cor){ c.save(); c.translate(x,y); c.beginPath(); for(var i=0;i<=20;i++){ var a=i/20*TAU, k=i%2?.86:1; c.lineTo(Math.cos(a)*r*k,Math.sin(a)*r*k); } c.closePath(); fs(c,lin(c,-r,-r,r,r,cla(cor,.3),esc(cor,.2)),esc(cor,.5),1); c.fillStyle='rgba(255,255,255,.55)'; circ(c,-r*.3,-r*.3,r*.22); c.fill(); c.restore(); }
function coroaTamp(c,inc){ c.save(); c.rotate(inc); rr(c,-18,-5,36,8,3); fs(c,lin(c,0,-5,0,3,'#e5e7eb','#9ca3af'),'#4b5563',1.1);
  [[-13,'#dc2626',4],[-6,'#2563eb',4.4],[1,'#facc15',5.2],[8,'#16a34a',4.4],[15,'#f97316',4]].forEach(function(p){ tampinha(c,p[0],-8,p[2],p[1]); }); c.restore(); }
function pneu(c,x,y,rx,ry){ el(c,x,y,rx,ry); fs(c,lin(c,x-rx,y,x+rx,y,'#44403c','#1c1917'),'#0c0a09',1.2); el(c,x,y,rx*.5,ry*.5); fs(c,'#78716c','#1c1917',1); c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=1; c.beginPath(); c.ellipse(x,y,rx*.78,ry*.78,0,0,TAU); c.stroke(); }
function garrafa(c,x,y,a,s,cor){ c.save(); c.translate(x,y); c.rotate(a); c.scale(s,s); rr(c,-5,-10,10,22,3); fs(c,lin(c,-5,0,5,0,cla(cor,.2),esc(cor,.25)),esc(cor,.5),1); rr(c,-2.4,-19,4.8,10,1.5); fs(c,esc(cor,.1),esc(cor,.5),1); rr(c,-3,-21,6,3,1); fs(c,'#e5e7eb','#6b7280',.8); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(-3,-6,2,14); c.restore(); }
function lata(c,x,y,a,s){ c.save(); c.translate(x,y); c.rotate(a); c.scale(s,s); rr(c,-6,-9,12,18,2.5); fs(c,lin(c,-6,0,6,0,'#f3f4f6','#9ca3af'),'#4b5563',1); c.fillStyle='#ef4444'; c.fillRect(-6,-3,12,6); el(c,0,-9,6,2); fs(c,'#d1d5db','#4b5563',.8); c.restore(); }
function casca(c,x,y,a){ c.save(); c.translate(x,y); c.rotate(a); c.fillStyle='#fde047'; c.strokeStyle='#a16207'; c.lineWidth=1; [[-.9],[0],[.9]].forEach(function(p){ c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(Math.sin(p[0])*10,-8,Math.sin(p[0])*14,6); c.quadraticCurveTo(Math.sin(p[0])*6,2,0,0); c.closePath(); c.fill(); c.stroke(); }); c.fillStyle='#78350f'; circ(c,0,0,2); c.fill(); c.restore(); }
function sacolaCorpo(c,s,cor){ /* sacola de plástico (origem no fundo); s=escala */
  c.save(); c.scale(s,s); c.beginPath(); c.moveTo(-14,0); c.quadraticCurveTo(-16,-10,-12,-20); c.lineTo(-7,-24); c.lineTo(7,-24); c.lineTo(12,-20); c.quadraticCurveTo(16,-10,14,0); c.quadraticCurveTo(0,3,-14,0); c.closePath();
  fs(c,lin(c,-14,-24,14,0,cla(cor,.6),cor),esc(cor,.45),1.2); c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.5)'; c.beginPath(); c.moveTo(-8,-22); c.lineTo(-4,-22); c.lineTo(-9,-2); c.lineTo(-12,-2); c.fill(); c.strokeStyle='rgba(0,0,0,.12)'; c.lineWidth=1; c.beginPath(); c.moveTo(4,-20); c.lineTo(8,-4); c.moveTo(-2,-18); c.lineTo(0,-6); c.stroke(); c.restore(); c.restore(); }
function bracoE(c,x,y,a,len,cor,mao){ c.save(); c.translate(x,y); c.rotate(-a); rr(c,-4.5,-2,9,len,4.5); fs(c,lin(c,-4,0,4,0,cla(cor,.12),esc(cor,.18)),'#292524',1.2); if(mao!==false){ circ(c,0,len+3,5.6); fs(c,lin(c,-5,len,5,len,'#fde047','#eab308'),'#92400e',1.1); c.fillStyle='rgba(255,255,255,.35)'; el(c,-1.5,len+1,2,1.2); c.fill(); } c.restore(); }

/* ============================================================
   REI ENTULHO
   ============================================================ */
A.conde=function(c,x,y,estado,t){
  t=t||0; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  var bob=Math.sin(t*2.2)*2, sx=1, sy=1, rot=0, coroa=-.12, olhos='normal', bc='sorri', bN=.5, bF=-.4, mos=0;
  if(estado==='laugh'){ var k=Math.abs(Math.sin(t*10)); bob=-k*6; sx=1+k*.03; olhos='riso'; bc='riso'; bN=.2; bF=.1; coroa=-.12+Math.sin(t*10)*.08; mos=1; }
  else if(estado==='hit'){ var k2=Math.max(0,Math.sin(t*8)); sx=1.1+k2*.04; sy=.88-k2*.03; olhos='tonto'; bc='O'; coroa=-.6; rot=Math.sin(t*20)*.02; bN=-2.4; bF=2.4; }
  else if(estado==='sad'){ bob=0; sy=.97; olhos='triste'; bc='triste'; coroa=-.35; bN=.1; bF=-.1; }
  else if(estado==='write'){ olhos='foco'; bc='forca'; bN=2.3+Math.sin(t*9)*.08; bF=2.3; }
  c.save(); c.globalAlpha=.25; c.fillStyle='#000'; el(c,0,2,46,8); c.fill(); c.restore();
  if(estado==='hit') for(var s=0;s<5;s++){ var a=s/5*TAU+t*2.5; A.estrela(c,Math.cos(a)*40,-168+Math.sin(a)*9,5.5,s%2?'#fde047':'#fff',a); }
  c.translate(0,bob); c.rotate(rot); c.scale(sx,sy);
  /* sacolinhas presas nas costas, como asas murchas */
  [[-1,-30,-84,.6],[1,30,-84,.55]].forEach(function(w){ c.save(); c.translate(w[1],w[2]); c.rotate(w[0]*(.5+Math.sin(t*2.4+w[0])*.08)); c.globalAlpha=.85; sacolaCorpo(c,w[3]*1.6,w[0]<0?'#bfdbfe':'#e5e7eb'); c.restore(); });
  /* botas velhas e pernas */
  [[-14,true],[14,false]].forEach(function(f){ var d=f[1]?.18:0; c.strokeStyle=esc('#57534e',d); c.lineWidth=5; c.beginPath(); c.moveTo(f[0]*.7,-24); c.lineTo(f[0],-7); c.stroke();
    c.beginPath(); c.moveTo(f[0]-7,-2); c.lineTo(f[0]-6,-12); c.lineTo(f[0]+4,-12); c.lineTo(f[0]+5,-4); c.lineTo(f[0]+13,-2); c.quadraticCurveTo(f[0]+14,2,f[0]+9,2); c.lineTo(f[0]-6,2); c.closePath(); fs(c,lin(c,0,-12,0,2,esc('#a16207',d),esc('#713f12',d)),'#3f2412',1.1); c.strokeStyle=esc('#fde68a',d); c.lineWidth=1; c.beginPath(); c.moveTo(f[0]-3,-9); c.lineTo(f[0]+1,-9); c.moveTo(f[0]-3,-6); c.lineTo(f[0]+1,-6); c.stroke(); });
  /* corpo: monte de lixo */
  fofo(c,0,-54,33,40,10,.06); fs(c,rad(c,-6,-66,42,'#b8b0a4','#5f5a52'),'#3f3a34',1.6);
  c.save(); fofo(c,0,-54,33,40,10,.06); c.clip();
  pneu(c,-14,-36,15,12); garrafa(c,16,-30,.5,.9,'#16a34a'); lata(c,10,-62,-.4,.9); casca(c,-10,-78,.3);
  c.fillStyle='rgba(255,255,255,.55)'; el(c,-20,-62,9,6); c.fill(); c.fillStyle='rgba(59,130,246,.45)'; el(c,20,-80,8,5); c.fill(); c.fillStyle='rgba(239,68,68,.4)'; el(c,-4,-22,10,6); c.fill();
  c.fillStyle='rgba(255,255,255,.14)'; el(c,-12,-70,10,16); c.fill(); c.restore();
  /* cheirinho (ondinhas cinza) só quando ri */
  if(mos) for(var o=0;o<3;o++){ var fo=(t*.6+o/3)%1; c.save(); c.globalAlpha=.4*(1-fo); c.strokeStyle='#9ca3af'; c.lineWidth=2; c.beginPath(); var ox=-30+o*30; c.moveTo(ox,-100-fo*26); c.quadraticCurveTo(ox+5,-106-fo*26,ox,-112-fo*26); c.quadraticCurveTo(ox-5,-118-fo*26,ox,-124-fo*26); c.stroke(); c.restore(); }
  /* braço de trás */
  bracoE(c,18,-72,bF,24,'#6b6560',estado!=='write');
  /* gola de papel amassado */
  for(var g=0;g<7;g++){ var ga=PI*(.08+g*.14); circ(c,Math.cos(ga)*25,-94+Math.sin(ga)*8,7.5); fs(c,g%2?'#f5f5f4':'#e7e5e4','#a8a29e',1); }
  /* cabeça: saco de lixo claro, amarrado em cima */
  c.save(); c.translate(0,-120); if(estado==='sad') c.rotate(.08); if(estado==='laugh') c.rotate(Math.sin(t*10)*.05);
  fofo(c,0,0,29,27,9,.05); fs(c,rad(c,-4,-6,32,'#d6d3d1','#8a847c'),'#3f3a34',1.6);
  c.beginPath(); c.moveTo(-9,-24); c.quadraticCurveTo(-14,-36,-4,-34); c.quadraticCurveTo(0,-40,4,-34); c.quadraticCurveTo(14,-36,9,-24); c.closePath(); fs(c,lin(c,0,-40,0,-24,'#d6d3d1','#8a847c'),'#3f3a34',1.3);
  c.fillStyle='rgba(244,114,182,.5)'; el(c,-18,9,6,3.6); c.fill(); el(c,18,9,6,3.6); c.fill();
  var pis=(t%3.9)<.12;
  [[-11,1],[11,-1]].forEach(function(e){ var ex=e[0];
    if(olhos==='riso'){ c.strokeStyle='#292524'; c.lineWidth=3; c.beginPath(); c.arc(ex,2,6,1.1*PI,1.9*PI); c.stroke(); return; }
    if(olhos==='tonto'){ c.strokeStyle='#292524'; c.lineWidth=2; c.beginPath(); for(var q=0;q<20;q++){ var qa=q*.6+t*6*e[1], qr=q*.38; c.lineTo(ex+Math.cos(qa)*qr,-1+Math.sin(qa)*qr); } c.stroke(); return; }
    el(c,ex,-1,9,10.5); fs(c,'#fff','#3f3a34',1.3);
    if(pis){ el(c,ex,-1,9.6,11); fs(c,'#b8b0a4',null); c.strokeStyle='#292524'; c.lineWidth=2; c.beginPath(); c.arc(ex,0,7,.15*PI,.85*PI); c.stroke(); return; }
    var px=olhos==='foco'?3:1.5, py=olhos==='triste'?3:1; olho(c,ex+px,py,5.6,7.2,'#57534e',false,false);
    if(olhos==='normal'||olhos==='foco'){ c.save(); el(c,ex,-1,9.6,11); c.clip(); c.fillStyle='#a8a29e'; c.fillRect(ex-11,-13,22,olhos==='foco'?8:5); c.restore(); c.strokeStyle='#292524'; c.lineWidth=1.6; c.beginPath(); c.moveTo(ex-9,olhos==='foco'?-5:-8); c.lineTo(ex+9,olhos==='foco'?-5:-8); c.stroke(); } });
  var sb=olhos==='triste'?[-.35,.35]:(olhos==='riso'?[0,0]:[.15,-.45]); c.fillStyle='#44403c';
  [[-11,-15,sb[0]],[11,-15,sb[1]]].forEach(function(q){ c.save(); c.translate(q[0],q[1]-(q[0]>0&&olhos==='normal'?3:0)); c.rotate(q[2]*(q[0]>0?1:-1)); el(c,0,0,7,2.6); c.fill(); c.restore(); });
  if(bc==='riso'){ c.beginPath(); c.moveTo(-9,11); c.quadraticCurveTo(0,28,9,11); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.2); c.fillStyle='#f87171'; el(c,0,19,4,2.4); c.fill(); c.fillStyle='#fff'; c.fillRect(-4,11,3.6,4); c.fillRect(.4,11,3.6,4); }
  else if(bc==='O'){ el(c,0,15,4,5); fs(c,'#450a0a',null); }
  else if(bc==='triste'){ c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.arc(0,20,6,1.15*PI,1.85*PI); c.stroke(); var lg=(t*.8)%1; c.fillStyle='rgba(96,165,250,.85)'; c.beginPath(); c.moveTo(-14,8+lg*14); c.quadraticCurveTo(-17,14+lg*14,-14,16+lg*14); c.quadraticCurveTo(-11,14+lg*14,-14,8+lg*14); c.fill(); }
  else if(bc==='forca'){ c.strokeStyle='#450a0a'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-7,13); c.quadraticCurveTo(0,10,7,13); c.stroke(); c.fillStyle='#fff'; c.fillRect(-3,11,3,3.2); c.fillRect(.4,11,3,3.2); }
  else { c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.moveTo(-8,10); c.quadraticCurveTo(0,17,10,8); c.stroke(); c.fillStyle='#fff'; rr(c,-2,12,4,4.6,1); c.fill(); c.strokeStyle='rgba(69,10,10,.5)'; c.lineWidth=.8; c.strokeRect(-2,12,4,4.6); }
  /* coroa de tampinhas, torta */
  c.save(); c.translate(4,-27); coroaTamp(c,coroa+.1); c.restore();
  c.restore();
  /* braço da frente: no 'write' joga lixo (uma lata) e caem pedacinhos */
  if(estado==='write'){ var mb=[18+Math.sin(bF)*27,-72+Math.cos(bF)*27]; c.save(); c.translate(mb[0],mb[1]-4); c.rotate(Math.sin(t*9)*.3); lata(c,0,-6,0,1); c.restore(); circ(c,mb[0],mb[1],5.6); fs(c,'#fde047','#92400e',1.1);
    for(var cr=0;cr<6;cr++){ var cf=(t*1.1+cr/6)%1; c.save(); c.globalAlpha=1-cf; c.fillStyle=['#9ca3af','#fde047','#60a5fa','#f87171','#4ade80','#e5e7eb'][cr]; c.translate(8+Math.sin(cr*5)*16+cf*10,-96+cf*60); c.rotate(cf*6+cr); c.fillRect(-2,-2,4,4); c.restore(); } }
  bracoE(c,-14,-72,bN,24,'#7a746d');
  if(estado==='idle'||estado==='sad'){ var mN=[-14+Math.sin(bN)*27,-72+Math.cos(bN)*27]; c.save(); c.translate(mN[0],mN[1]); c.rotate(-.2); c.strokeStyle='#a16207'; c.lineWidth=3.2; c.beginPath(); c.moveTo(0,12); c.lineTo(0,-34); c.stroke(); c.strokeStyle='#fde68a'; c.lineWidth=1; c.beginPath(); c.moveTo(-.8,10); c.lineTo(-.8,-32); c.stroke();
    c.beginPath(); c.moveTo(-9,-34); c.quadraticCurveTo(0,-52,9,-34); c.closePath(); fs(c,lin(c,0,-50,0,-34,'#f87171','#b91c1c'),'#7f1d1d',1.1); circ(c,0,0,5.6); fs(c,'#fde047','#92400e',1.1); c.restore(); }
  if(estado==='laugh'){ c.fillStyle='#44403c'; c.font='900 16px Arial'; c.textAlign='center'; [[48,-150],[62,-128],[-50,-140]].forEach(function(q,i){ var k3=Math.abs(Math.sin(t*10+i)); c.globalAlpha=.85; c.fillText(i%2?'HI':'HA',q[0],q[1]-k3*5); }); c.globalAlpha=1; }
  c.restore();
};

/* ---------- SACOLINHA (inimigo pequeno, voa) ---------- */
A.traca=function(c,x,y,t,dir,voando){
  t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round';
  var voa=voando!==false, fl=voa?Math.sin(t*9):0, hv=voa?Math.sin(t*3.5)*2:0;
  if(voa){ c.save(); c.globalAlpha=.16; c.fillStyle='#000'; el(c,0,0,10,2.4); c.fill(); c.restore(); }
  if(!voa){ c.strokeStyle='#64748b'; c.lineWidth=1.6; var wk=Math.sin(t*10)*2; [[-6,wk],[4,-wk]].forEach(function(l){ c.beginPath(); c.moveTo(l[0],-4); c.lineTo(l[0]+l[1],2); c.stroke(); el(c,l[0]+l[1]+1.5,3,3,1.8); fs(c,'#475569',null); }); }
  c.translate(0,(voa?-16:-2)+hv);
  /* alças: batem como asas */
  [[-1,.75],[1,1]].forEach(function(w){ c.save(); c.translate(w[0]*7,-22); c.scale(1,voa?.35+.65*Math.abs(fl):.6); c.rotate(w[0]*.2); c.globalAlpha=w[1];
    c.beginPath(); c.ellipse(0,-9,5,11,0,0,TAU); c.strokeStyle='#93c5fd'; c.lineWidth=3.2; c.stroke(); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=1.2; c.stroke(); c.restore(); });
  sacolaCorpo(c,1,'#bfdbfe');
  c.fillStyle='#fff'; el(c,-5,-14,3.6,4); c.fill(); el(c,5,-14,3.6,4); c.fill();
  var pis=(t%3.2)<.12; if(!pis){ c.fillStyle='#1e293b'; circ(c,-4,-13.5,1.9); c.fill(); circ(c,6,-13.5,1.9); c.fill(); c.fillStyle='#fff'; circ(c,-4.6,-14.4,.7); c.fill(); circ(c,5.4,-14.4,.7); c.fill(); } else { c.strokeStyle='#1e293b'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-8,-13.5); c.lineTo(-2,-13.5); c.moveTo(2,-13.5); c.lineTo(8,-13.5); c.stroke(); }
  c.fillStyle='rgba(244,114,182,.5)'; el(c,-9,-9,2.2,1.3); c.fill(); el(c,9,-9,2.2,1.3); c.fill();
  c.strokeStyle='#1e3a8a'; c.lineWidth=1.1; c.beginPath(); c.arc(1,-8,2.4,.15*PI,.85*PI); c.stroke(); c.fillStyle='#fff'; c.fillRect(-.2,-7.2,1.6,1.6);
  c.restore();
};
/* ---------- FUMACINHA (nuvem cinza que anda) ---------- */
A.poeira=function(c,x,y,t,dir,achatado){
  t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,achatado?.35:1); c.lineJoin='round'; c.lineCap='round';
  c.save(); c.globalAlpha=.18; c.fillStyle='#000'; el(c,0,0,16,3.4); c.fill(); c.restore();
  var w=achatado?0:Math.sin(t*9), sq=achatado?0:Math.abs(w)*.06;
  [-7,6].forEach(function(px,i){ el(c,px+(i?-w:w)*3,-2,5,3); fs(c,'#374151','#111827',1); });
  c.save(); c.translate(0,-17); c.scale(1+sq,1-sq);
  c.beginPath(); [[-9,2,9],[-2,-7,10],[7,-3,9],[9,5,7],[0,6,9],[-10,7,6]].forEach(function(b){ c.moveTo(b[0]+b[2],b[1]); c.arc(b[0],b[1],b[2]*(1+Math.sin(t*2+b[0])*.03),0,TAU); }); fs(c,rad(c,-4,-8,20,'#cbd5e1','#64748b'),'#475569',1.2);
  c.fillStyle='rgba(30,41,59,.25)'; el(c,0,9,13,4); c.fill(); c.fillStyle='rgba(255,255,255,.3)'; el(c,-5,-9,5,2.5); c.fill();
  if(achatado){ c.strokeStyle='#1c1917'; c.lineWidth=2; [[2,1],[10,-1]].forEach(function(e){ c.beginPath(); c.moveTo(e[0]-3,-5); c.lineTo(e[0]+2,-2); c.lineTo(e[0]-3,1); c.stroke(); }); }
  else { var pis=(t%2.9)<.12; el(c,3,-3,4.6,5.4); fs(c,'#fff','#475569',1); el(c,12,-3.5,4,5); fs(c,'#fff','#475569',1); if(!pis){ c.fillStyle='#1c1917'; circ(c,5,-2.4,2.4); c.fill(); circ(c,13.4,-3,2.2); c.fill(); c.fillStyle='#fff'; circ(c,4.2,-3.6,.9); c.fill(); circ(c,12.6,-4.2,.8); c.fill(); } else { c.strokeStyle='#1c1917'; c.lineWidth=1.3; c.beginPath(); c.moveTo(0,-3); c.lineTo(6,-3); c.moveTo(9,-3.5); c.lineTo(15,-3.5); c.stroke(); } }
  c.fillStyle='rgba(244,114,128,.45)'; el(c,-2,4,3,1.8); c.fill(); c.strokeStyle='#1f2937'; c.lineWidth=1.2; c.beginPath(); c.arc(8,4,2.6,.15*PI,.85*PI); c.stroke();
  c.restore();
  if(!achatado) for(var p=0;p<4;p++){ var f=(t*.8+p/4)%1; c.save(); c.globalAlpha=.45*(1-f); c.fillStyle='#94a3b8'; circ(c,-14-f*14,-8-f*14+p*3,2+f*3); c.fill(); c.restore(); }
  c.restore();
};
/* ---------- MONTE DE ENTULHO (mini-chefe, ~110 px, pisa-se no pneu) ---------- */
A.tracona=function(c,x,y,t,hp,max){
  t=t||0; max=max||3; hp=hp==null?max:hp; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  var dano=max-hp, k=Math.sin(t*2.2);
  c.save(); c.globalAlpha=.22; c.fillStyle='#000'; el(c,0,1,48,8); c.fill(); c.restore();
  c.translate(0,k*1.5); c.scale(1+k*.015,1-k*.015);
  [[-16],[-5],[6],[17]].forEach(function(l,i){ var wk=Math.sin(t*6+i*1.6)*2; c.strokeStyle='#44403c'; c.lineWidth=3.6; c.beginPath(); c.moveTo(l[0]*.8,-14); c.lineTo(l[0]+wk,-3); c.stroke(); el(c,l[0]+wk+1,-2.5,5,3); fs(c,'#713f12','#3f2412',1); });
  fofo(c,0,-46,44,34,12,.05); fs(c,rad(c,-6,-56,48,'#c4bcb0','#5f5a52'),'#3f3a34',1.8);
  c.save(); fofo(c,0,-46,44,34,12,.05); c.clip(); garrafa(c,-28,-40,-.6,.9,'#2563eb'); lata(c,30,-36,.5,.9); casca(c,22,-66,.4); c.fillStyle='rgba(255,255,255,.5)'; el(c,-26,-62,9,5); c.fill(); c.fillStyle='rgba(239,68,68,.4)'; el(c,4,-26,10,5); c.fill(); c.fillStyle='rgba(255,255,255,.14)'; el(c,-16,-62,12,10); c.fill(); c.restore();
  /* o pneu em cima: lugar de pisar */
  pneu(c,0,-80,22,8);
  var tonto=hp<=1&&hp<max;
  [[-14,-1],[14,1]].forEach(function(e){ el(c,e[0],-52,11,12.5); fs(c,'#fff','#3f3a34',1.4);
    if(tonto){ c.strokeStyle='#292524'; c.lineWidth=2; c.beginPath(); for(var q=0;q<20;q++){ var qa=q*.6+t*5*e[1], qr=q*.45; c.lineTo(e[0]+Math.cos(qa)*qr,-52+Math.sin(qa)*qr); } c.stroke(); }
    else { var cr=e[1]*-3.5; olho(c,e[0]+cr,-50,5.4,6.8,'#57534e',(t%3.4)<.12,false); } });
  c.fillStyle='rgba(244,114,182,.5)'; el(c,-26,-38,6,3.4); c.fill(); el(c,26,-38,6,3.4); c.fill();
  c.beginPath(); c.moveTo(-12,-34); c.quadraticCurveTo(0,-20,12,-34); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.3); c.fillStyle='#fff'; c.fillRect(-5,-34,4.4,5); c.fillRect(.6,-34,4.4,5);
  if(dano>0){ c.save(); c.translate(-26,-66); c.rotate(-.5); rr(c,-10,-3.5,20,7,2); fs(c,'#fde68a','#b45309',1); c.strokeStyle='#b45309'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,-3.5); c.lineTo(-3,3.5); c.moveTo(3,-3.5); c.lineTo(3,3.5); c.stroke(); c.restore(); }
  if(dano>1){ c.save(); c.translate(28,-62); c.rotate(.6); rr(c,-9,-3,18,6,2); fs(c,'#fde68a','#b45309',1); c.restore(); }
  if(tonto) for(var s2=0;s2<3;s2++){ var a=t*4+s2*TAU/3; A.estrela(c,Math.cos(a)*26,-96+Math.sin(a)*6,5,'#fde047',a); }
  for(var h=0;h<max;h++){ var hx2=(h-(max-1)/2)*14; circ(c,hx2,-118,5); fs(c,h<hp?'#f472b6':'rgba(255,255,255,.25)','#3f3a34',1.2); }
  c.restore();
};
})();
