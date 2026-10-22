/* ============================================================
   HIS3_jogo_arteA.js — elenco de "Detetives do Tempo".
   Carrega DEPOIS de HIS3_jogo_arte.js … arte5.js e estende window.ARTE:
   - A.morador: tipos novos (lucia francisco pedro joao vovo clio tic
     locutor engenheira fotografo); os antigos caem na função original.
   - A.conde: agora desenha a RAINHA TRAÇA (vilã cômica). Estados:
     idle | write (roendo papel) | laugh | hit | sad. Pés em (x,y), ~150 px.
   - A.traca (traçinha que voa), A.poeira (bolinha de poeira que anda),
     A.tracona (mini-chefe). Tudo em canvas 2D, sem imagem, sem emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho, boca=I.boca;

/* ---------- peças comuns (mesmo traço dos moradores de arte2) ---------- */
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
/* cabeça de adulto, origem no centro; o={pele,peleS,olho,cilio,tras,frente,oculos} */
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
/* cabelo por cima (recortado na cabeça): borda direita em y1, esquerda desce até y2 */
function cab(c,cor,y1,y2){
  c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,y2); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,y1);
  c.quadraticCurveTo(12,y1-9,0,y1-2); c.quadraticCurveTo(-9,y1+2,-12,y2); c.closePath(); fs(c,lin(c,0,-22,0,y2,cla(cor,.18),esc(cor,.12)),esc(cor,.4),1);
  c.strokeStyle='rgba(255,255,255,.22)'; c.lineWidth=2; c.beginPath(); c.arc(0,0,17,1.25*PI,1.5*PI); c.stroke(); c.restore();
}
function cabeca1(c,o,t,m,extra){ c.save(); c.translate(1,-84); cabeca(c,o,t,m,extra); c.restore(); }
function livro(c,w,h,cor,rotulo){ rr(c,-w/2,-h/2,w,h,2.5); fs(c,lin(c,0,-h/2,0,h/2,cla(cor,.15),esc(cor,.2)),esc(cor,.5),1.2); c.fillStyle=esc(cor,.35); c.fillRect(-w/2,-h/2,3,h); c.fillStyle='#fffbeb'; c.fillRect(w/2-1.5,-h/2+2,1.8,h-4); if(rotulo){ rr(c,-w/2+6,-h/2+5,w-11,6,1.5); fs(c,rotulo,null); } }

/* ---------- Dona Lúcia, professora ---------- */
function lucia(c,t,m){
  sombra(c,20); var o={pele:'#f3c9a8',peleS:'#d79f7d',olho:'#4a3020',cilio:true};
  var aF=m>0?.95+Math.sin(t*3)*.25:.22+Math.sin(t*1.4)*.03; membro(c,7,-56,aF,20,8.5,'#e0b10e',o.pele,5);
  pernas(c,'#ecbb98','#7a2e1a',0);
  c.beginPath(); c.moveTo(-14,-37); c.lineTo(14,-37); c.lineTo(20,-13); c.quadraticCurveTo(0,-9,-20,-13); c.closePath(); fs(c,lin(c,-18,-37,18,-12,'#a78bfa','#6d28d9'));
  c.strokeStyle='rgba(46,16,101,.45)'; c.lineWidth=1.2; [-8,0,8].forEach(function(x){ c.beginPath(); c.moveTo(x*.7,-35); c.lineTo(x*1.2,-12); c.stroke(); });
  torso(c,'#fde68a','#eab308',-63,-33);
  c.fillStyle='#fff'; [[-1,1],[1,-1]].forEach(function(s){ c.beginPath(); c.moveTo(0,-62); c.lineTo(s[0]*9,-63); c.lineTo(s[0]*5,-55); c.closePath(); fs(c,'#ffffff','rgba(0,0,0,.25)',1); });
  c.fillStyle='#fb7185'; for(var i=0;i<7;i++){ var a=.2*PI+i*.1*PI; circ(c,Math.cos(a)*9,-62+Math.sin(a)*7,1.5); c.fill(); }
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,12); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,-7); c.quadraticCurveTo(18,-14,10,-9); c.quadraticCurveTo(4,-15,-4,-9); c.quadraticCurveTo(-10,-5,-11,6); c.closePath(); fs(c,lin(c,0,-22,0,8,'#a8998c','#6f6155'),'#4a3f36',1); c.restore();
    c.beginPath(); c.moveTo(-14,-14); c.bezierCurveTo(-30,-12,-28,14,-18,16); c.quadraticCurveTo(-12,12,-14,4); c.closePath(); fs(c,lin(c,-28,-12,-12,16,'#a8998c','#6f6155'),'#4a3f36',1);
    c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1.6; c.beginPath(); c.arc(2,-4,16,1.2*PI,1.55*PI); c.stroke();
    sobr(c,-1,-8,'#7d6e62',0); sobr(c,12.5,-8.5,'#7d6e62',0); c.fillStyle='#fbbf24'; circ(c,-14,10,1.8); c.fill(); });
  var aN=m>0?.75+Math.sin(t*3)*.08:.62; var mh=maoEm(-6,-56,aN,19);
  c.save(); c.translate(mh[0]+4,mh[1]-6); c.rotate(-.12); livro(c,17,23,'#16a34a','#fef9c3'); c.restore();
  membro(c,-6,-56,aN,19,8.5,'#facc15',o.pele,5);
}
/* ---------- Seu Francisco, carteiro ---------- */
function envelope(c,w,h){ rr(c,-w/2,-h/2,w,h,1.5); fs(c,'#fffdf5','#94a3b8',1); c.strokeStyle='#cbd5e1'; c.lineWidth=.9; c.beginPath(); c.moveTo(-w/2,-h/2); c.lineTo(0,1); c.lineTo(w/2,-h/2); c.stroke(); c.fillStyle='#ef4444'; c.fillRect(w/2-4.5,-h/2+1.5,3,3.4); }
function francisco(c,t,m){
  sombra(c,20); var o={pele:'#c68b59',peleS:'#a26a3c',olho:'#2a160b'};
  membro(c,7,-56,.18+Math.sin(t*1.4)*.03,20,8.5,'#ca8a04',o.pele,5);
  pernas(c,'#1e3a8a','#3f2a14',0);
  torso(c,'#fde047','#eab308');
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); c.fillStyle='#2563eb'; c.fillRect(-16,-64,32,8); c.fillRect(-16,-30,32,8); c.restore();
  rr(c,4,-50,7,7,1.5); fs(c,'#2563eb','#1e3a8a',1); rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  /* bolsa a tiracolo, com cartas aparecendo */
  c.strokeStyle='#6b3f1f'; c.lineWidth=4.2; c.beginPath(); c.moveTo(11,-62); c.lineTo(-13,-30); c.stroke(); c.strokeStyle='#a0663a'; c.lineWidth=1.4; c.stroke();
  [[-1,-.25],[5,.15],[-6,-.1]].forEach(function(p){ c.save(); c.translate(-15+p[0],-40); c.rotate(p[1]); envelope(c,11,8); c.restore(); });
  rr(c,-28,-40,26,19,4); fs(c,lin(c,0,-40,0,-21,'#a0663a','#6b3f1f'),'#4a2810',1.3);
  c.beginPath(); c.moveTo(-28,-40); c.lineTo(-2,-40); c.lineTo(-3,-31); c.quadraticCurveTo(-15,-27,-27,-31); c.closePath(); fs(c,lin(c,0,-40,0,-29,'#b9774a','#83502a'),'#4a2810',1.2);
  rr(c,-18,-33,6,5,1.2); fs(c,'#fbbf24','#92400e',1); c.strokeStyle='rgba(255,230,190,.35)'; c.setLineDash([2,2]); c.lineWidth=1; rr(c,-26,-38,22,15,3); c.stroke(); c.setLineDash([]);
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#2c1a10'; el(c,-16,2,7,11); c.fill(); c.restore();
    c.fillStyle='#3a2416'; c.beginPath(); c.moveTo(1,9.5); c.quadraticCurveTo(7.5,6,14,9.5); c.quadraticCurveTo(15,12,12,11.4); c.quadraticCurveTo(7.5,9.5,3,11.4); c.quadraticCurveTo(0,12,1,9.5); c.fill();
    sobr(c,-1,-8.5,'#2c1a10',0); sobr(c,12.5,-9,'#2c1a10',0);
    c.save(); c.translate(0,-11); c.beginPath(); c.moveTo(-22,4); c.bezierCurveTo(-22,-18,20,-20,22,2); c.closePath(); fs(c,lin(c,0,-16,0,4,'#fde047','#eab308'));
    c.beginPath(); c.moveTo(12,1); c.quadraticCurveTo(30,-1,34,5); c.quadraticCurveTo(22,8,10,5); c.closePath(); fs(c,lin(c,10,0,34,6,'#3b82f6','#1e3a8a'));
    rr(c,-22,0,36,5,2.5); fs(c,'#2563eb','#1e3a8a',1); rr(c,-4,-11,9,7,2); fs(c,'#2563eb','#1e3a8a',1); c.fillStyle='#fde047'; c.fillRect(-2,-9,5,3);
    c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1.5; c.beginPath(); c.arc(-4,0,14,1.15*PI,1.45*PI); c.stroke(); c.restore(); });
  var aN=m>0?2.35+Math.sin(t*5)*.25:.3+Math.sin(t*1.4)*.04; membro(c,-6,-56,aN,20,8.5,'#facc15',o.pele,5);
  if(m>0){ var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]-6); c.rotate(-.3+Math.sin(t*5)*.2); envelope(c,16,11); c.restore(); }
}
/* ---------- Seu Pedro, fazendeiro ---------- */
function tomate(c,x,y,r){ circ(c,x,y,r); fs(c,rad(c,x,y,r,'#fca5a5','#dc2626'),'#7f1d1d',1); c.fillStyle='#16a34a'; c.beginPath(); for(var k=0;k<5;k++){ var a=k/5*TAU-PI/2; c.lineTo(x+Math.cos(a)*r*.55,y-r*.75+Math.sin(a)*r*.25); c.lineTo(x+Math.cos(a+.6)*r*.15,y-r*.8); } c.fill(); c.fillStyle='rgba(255,255,255,.55)'; el(c,x-r*.35,y-r*.3,r*.22,r*.14); c.fill(); }
function pedro(c,t,m){
  sombra(c,21); var o={pele:'#e8b48a',peleS:'#c98d62',olho:'#3b2a1a'};
  membro(c,7,-56,.75,19,8.5,'#b91c1c',null);
  pernas(c,'#3b5ea8','#6b3f1f',1);
  torso(c,'#ef4444','#b91c1c');
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); c.fillStyle='rgba(60,10,10,.35)'; for(var x=-14;x<16;x+=7) c.fillRect(x,-64,2.8,42); for(var y=-62;y<-22;y+=7) c.fillRect(-16,y,32,2.8); c.fillStyle='rgba(255,255,255,.25)'; for(var x2=-11;x2<16;x2+=7) c.fillRect(x2,-64,1,42); c.restore();
  c.beginPath(); c.moveTo(-15,-38); c.lineTo(15,-38); c.lineTo(15,-27); c.quadraticCurveTo(15,-21,9,-21); c.lineTo(-9,-21); c.quadraticCurveTo(-15,-21,-15,-27); c.closePath(); fs(c,lin(c,0,-38,0,-21,'#4f75c4','#2c4f99'));
  rr(c,-9,-55,18,19,3); fs(c,lin(c,0,-55,0,-36,'#5a82d0','#3359a8')); rr(c,-5,-51,10,7,1.5); fs(c,'#3a62b2','#1e3a8a',1);
  c.strokeStyle='#3359a8'; c.lineWidth=3.6; c.beginPath(); c.moveTo(-8,-54); c.lineTo(-11,-63); c.moveTo(8,-54); c.lineTo(10,-63); c.stroke();
  c.fillStyle='#fbbf24'; circ(c,-7,-53,1.8); c.fill(); circ(c,7,-53,1.8); c.fill();
  c.strokeStyle='rgba(255,255,255,.4)'; c.setLineDash([2,2]); c.lineWidth=.9; c.beginPath(); c.moveTo(-13,-30); c.lineTo(13,-30); c.stroke(); c.setLineDash([]);
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#8a7a6a'; el(c,-17,0,7,11); c.fill(); c.restore();
    c.fillStyle='#8a7a6a'; c.beginPath(); c.moveTo(0,10); c.quadraticCurveTo(7.5,5.5,15,10); c.quadraticCurveTo(17,13.5,12,12.5); c.quadraticCurveTo(7.5,10.5,3,12.5); c.quadraticCurveTo(-2,13.5,0,10); c.fill();
    sobr(c,-1,-8.5,'#6b5c4e',-.5); sobr(c,12.5,-9,'#6b5c4e',.5);
    c.save(); c.translate(1,-12); c.rotate(-.05);
    el(c,0,0,34,7.5); fs(c,lin(c,0,-7,0,7,'#fde68a','#d4a24c'),'#8a6420',1.2);
    c.beginPath(); c.moveTo(-16,0); c.bezierCurveTo(-16,-20,16,-20,16,0); c.closePath(); fs(c,lin(c,0,-18,0,0,'#fef3c7','#e0b45e'),'#8a6420',1.2);
    c.strokeStyle='rgba(138,100,32,.45)'; c.lineWidth=1; for(var k=-26;k<=26;k+=6){ c.beginPath(); c.moveTo(k,-4); c.lineTo(k+3,4); c.stroke(); } for(var k2=-9;k2<=9;k2+=4.5){ c.beginPath(); c.moveTo(k2,-12+Math.abs(k2)*.3); c.lineTo(k2+1.5,-3); c.stroke(); }
    c.beginPath(); c.moveTo(-16,-1); c.quadraticCurveTo(0,1,16,-1); c.lineTo(16,-5); c.quadraticCurveTo(0,-3,-16,-5); c.closePath(); fs(c,'#dc2626','#7f1d1d',1); c.restore(); });
  membro(c,-6,-56,.62,19,8.5,'#ef4444',null);
  var by=-34-m*2; c.save(); c.translate(15,by);
  [[-9,-8],[0,-9],[9,-8],[-4.5,-12],[4.5,-12.5]].forEach(function(p){ tomate(c,p[0],p[1],5.4); });
  rr(c,-17,-6,34,15,2); fs(c,lin(c,0,-6,0,9,'#d6a265','#9a6a3a'),'#5b3a1e',1.2);
  c.strokeStyle='#7a5028'; c.lineWidth=1.1; c.beginPath(); c.moveTo(-17,1.5); c.lineTo(17,1.5); c.moveTo(-9,-6); c.lineTo(-9,9); c.moveTo(9,-6); c.lineTo(9,9); c.stroke(); c.restore();
  circ(c,0,by-2,5); fs(c,o.pele); circ(c,30,by-2,5); fs(c,esc(o.pele,.08));
}
/* ---------- Doutor João, médico ---------- */
function joao(c,t,m){
  sombra(c,20); var o={pele:'#8d5a3b',peleS:'#6e4128',olho:'#2a160b'};
  membro(c,7,-56,.2+Math.sin(t*1.4)*.03,20,8.5,'#e2e8f0',o.pele,5);
  pernas(c,'#475569','#111827',0);
  c.beginPath(); c.moveTo(-15,-60); c.quadraticCurveTo(0,-66,15,-60); c.lineTo(18,-14); c.quadraticCurveTo(0,-10,-18,-14); c.closePath(); fs(c,lin(c,-15,-62,18,-12,'#ffffff','#cbd5e1'));
  c.beginPath(); c.moveTo(-6,-63); c.lineTo(6,-63); c.lineTo(0,-46); c.closePath(); fs(c,'#93c5fd','#1d4ed8',1); c.beginPath(); c.moveTo(-1.5,-60); c.lineTo(1.5,-60); c.lineTo(2.5,-50); c.lineTo(0,-47); c.lineTo(-2.5,-50); c.closePath(); fs(c,'#1e40af',null);
  c.strokeStyle='#94a3b8'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-7,-63); c.lineTo(-1,-42); c.lineTo(-1,-12); c.moveTo(7,-63); c.lineTo(1,-44); c.stroke();
  rr(c,6,-46,8,8,1.5); fs(c,'#f1f5f9','#94a3b8',1); c.fillStyle='#2563eb'; c.fillRect(7.5,-49,1.6,5); c.fillStyle='#ef4444'; c.fillRect(10.5,-49.5,1.6,5.5);
  c.fillStyle='#cbd5e1'; [-34,-24].forEach(function(y){ circ(c,-3,y,1.4); c.fill(); });
  c.strokeStyle='#334155'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-9,-63); c.quadraticCurveTo(-12,-48,-4,-42); c.moveTo(9,-63); c.quadraticCurveTo(10,-50,4,-44); c.stroke();
  c.beginPath(); c.moveTo(0,-43); c.quadraticCurveTo(6,-38,4,-32); c.stroke(); circ(c,4,-30,3.6); fs(c,rad(c,4,-30,4,'#f8fafc','#94a3b8'),'#475569',1.2);
  cabeca1(c,o,t,m,function(c){
    cab(c,'#1c1008',-9,6); c.fillStyle='#1c1008'; [[-12,-17],[-4,-21],[5,-21],[13,-17],[-18,-9]].forEach(function(p){ circ(c,p[0],p[1],4.6); c.fill(); });
    c.fillStyle='#1c1008'; c.beginPath(); c.moveTo(3,15); c.quadraticCurveTo(7.5,22,12,15); c.quadraticCurveTo(7.5,17,3,15); c.fill();
    sobr(c,-1,-9,'#1c1008',0); sobr(c,12.5,-9.5,'#1c1008',0); });
  var aN=m>0?2.5+Math.sin(t*4)*.12:.28+Math.sin(t*1.4)*.04; membro(c,-6,-56,aN,20,8.5,'#f1f5f9',o.pele,5);
  if(m>0){ var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]); rr(c,-1.6,-10,3.2,9,1.6); fs(c,o.pele); c.restore(); }
}
/* ---------- Vovó Lembrança ---------- */
function vovo(c,t,m){
  sombra(c,20); var o={pele:'#f6d3bc',peleS:'#dcae92',olho:'#4a3a5a',cilio:true,oculos:'#b7791f'};
  membro(c,7,-56,.2,19,8.5,'#7c3aed',o.pele,5);
  pernas(c,'#e8c4ae','#5b2a6b',-1);
  c.beginPath(); c.moveTo(-14,-60); c.quadraticCurveTo(0,-65,14,-60); c.bezierCurveTo(18,-40,22,-24,22,-10); c.quadraticCurveTo(0,-5,-22,-10); c.bezierCurveTo(-22,-24,-18,-40,-14,-60); c.closePath(); fs(c,lin(c,-20,-60,20,-8,'#4f7cc4','#2a4a85'));
  c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.55)'; for(var i=0;i<14;i++){ circ(c,-18+hash(i)*36,-50+hash(i+9)*40,1.3); c.fill(); } c.restore();
  c.beginPath(); c.moveTo(-17,-62); c.quadraticCurveTo(0,-67,17,-62); c.lineTo(15,-46); c.quadraticCurveTo(6,-38,0,-30); c.quadraticCurveTo(-8,-38,-17,-46); c.closePath(); fs(c,lin(c,-17,-64,17,-30,'#ddd6fe','#8b5cf6'));
  c.save(); c.clip(); c.strokeStyle='rgba(76,29,149,.3)'; c.lineWidth=1; for(var k=-60;k<-30;k+=5){ c.beginPath(); c.moveTo(-18,k); c.lineTo(18,k+6); c.stroke(); } c.restore();
  c.strokeStyle='#a78bfa'; c.lineWidth=1.2; for(var f=-3;f<=3;f++){ c.beginPath(); c.moveTo(f*2,-31); c.lineTo(f*2.6,-25); c.stroke(); }
  cabeca1(c,o,t,m,function(c){
    cab(c,'#e5e7eb',-8,7); c.strokeStyle='rgba(148,163,184,.7)'; c.lineWidth=1; for(var w=0;w<4;w++){ c.beginPath(); c.arc(0,4,18-w*2,1.15*PI,1.6*PI); c.stroke(); }
    c.strokeStyle='rgba(180,120,100,.5)'; c.lineWidth=1; c.beginPath(); c.arc(16,11,3,-.2*PI,.4*PI); c.stroke();
    sobr(c,-1,-9.5,'#cbd5e1',0); sobr(c,12.5,-10,'#cbd5e1',0); }, null);
  var aN=m>0?.95+Math.sin(t*2.5)*.08:.75; var mh=maoEm(-6,-56,aN,19);
  c.save(); c.translate(mh[0]+5,mh[1]-5); c.rotate(-.1); rr(c,-12,-9,24,18,2); fs(c,lin(c,0,-9,0,9,'#b45309','#7c2d12'),'#451a03',1.2);
  rr(c,-6,-5,12,10,1); fs(c,'#fffbeb',null); c.fillStyle='#7dd3fc'; c.fillRect(-5,-4,10,5); c.fillStyle='#4ade80'; c.fillRect(-5,0,10,4); c.fillStyle='#78350f'; circ(c,-1,-1,2); c.fill(); circ(c,2.5,-1.5,1.7); c.fill();
  c.fillStyle='#fbbf24'; [[-12,-9],[12,-9],[-12,9],[12,9]].forEach(function(p){ var sx=p[0]>0?-1:1, sy=p[1]>0?-1:1; c.beginPath(); c.moveTo(p[0],p[1]); c.lineTo(p[0]+sx*5,p[1]); c.lineTo(p[0],p[1]+sy*5); c.closePath(); c.fill(); }); c.restore();
  membro(c,-6,-56,aN,19,8.5,'#8b5cf6',o.pele,5);
}
/* coque da vovó: desenhado antes da cabeça */
function coque(c){ circ(c,-13,-99,11.5); fs(c,rad(c,-13,-99,12,'#f8fafc','#a3adbd'),'#64748b',1.5); c.strokeStyle='rgba(100,116,139,.8)'; c.lineWidth=1.1; c.beginPath(); c.arc(-13,-99,7,.6*PI,1.9*PI); c.stroke(); c.beginPath(); c.arc(-13,-99,3.5,.2*PI,1.5*PI); c.stroke(); c.strokeStyle='#ec4899'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-26,-104); c.lineTo(-4,-96); c.stroke(); c.fillStyle='#f9a8d4'; circ(c,-26,-104,2.4); c.fill(); }
/* ---------- Dra. Clio, historiadora ---------- */
function clio(c,t,m){
  sombra(c,20); var o={pele:'#d9a072',peleS:'#b47b4c',olho:'#3f2210',cilio:true,oculos:'#7c2d12'};
  var sw=Math.sin(t*1.6)*.12;
  c.save(); c.translate(-18,-94); c.rotate(.5+sw); c.beginPath(); c.moveTo(-3,0); c.bezierCurveTo(-12,8,-10,26,-2,32); c.bezierCurveTo(2,24,6,10,4,0); c.closePath(); fs(c,lin(c,0,0,0,32,'#3d2416','#1f1009')); c.restore();
  membro(c,7,-56,.2+Math.sin(t*1.4)*.03,20,8.5,'#e5e7eb',o.pele,5);
  pernas(c,'#4d7c0f','#5b3418',0);
  torso(c,'#ffffff','#d1d5db');
  [[-1],[1]].forEach(function(s){ c.beginPath(); c.moveTo(s[0]*15,-58); c.lineTo(s[0]*5,-62); c.lineTo(s[0]*4,-26); c.lineTo(s[0]*15,-26); c.closePath(); fs(c,lin(c,-15,-60,15,-26,'#a16207','#713f12')); rr(c,s[0]*9-4,-38,8,6,1.5); fs(c,'#854d0e','#422006',1); });
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  rr(c,-12,-52,7,9,1.5); fs(c,'#fde68a','#a16207',1); c.fillStyle='#a16207'; c.fillRect(-10.5,-49,4,1.2); c.fillRect(-10.5,-46.5,4,1.2);
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,10); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,-10); c.quadraticCurveTo(14,-6,6,-12); c.quadraticCurveTo(-2,-6,-8,-9); c.quadraticCurveTo(-12,-4,-13,6); c.closePath(); fs(c,lin(c,0,-22,0,6,'#5b3420','#2a160b'),'#1f1009',1); c.restore();
    c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=1.8; c.beginPath(); c.arc(1,-2,17,1.2*PI,1.5*PI); c.stroke();
    rr(c,-20,-12,6,6,3); fs(c,'#f472b6','#9d174d',1); sobr(c,-1,-9,'#2a160b',0); sobr(c,12.5,-9.5,'#2a160b',0); });
  var aN=m>0?2.2+Math.sin(t*2.5)*.1:1.0+Math.sin(t*1.4)*.05; membro(c,-6,-56,aN,20,8.5,'#f3f4f6',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]); c.rotate(m>0?.4:-.5);
  rr(c,-2.4,-2,4.8,16,2.4); fs(c,lin(c,-2,0,2,0,'#92400e','#451a03'));
  c.translate(0,-15); circ(c,0,0,12.5); fs(c,'rgba(186,230,253,.45)',null); c.lineWidth=4; c.strokeStyle='#b45309'; c.stroke(); c.lineWidth=1.4; c.strokeStyle='#fde68a'; circ(c,0,0,13.5); c.stroke();
  c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2; c.beginPath(); c.arc(0,0,8,1.1*PI,1.45*PI); c.stroke(); c.restore();
}
/* ---------- Tic, o despertador falante ---------- */
function tic(c,t,m){
  sombra(c,20); var b=Math.sin(t*2.2)*1.2, sv=m>0?Math.sin(t*30)*.35:Math.sin(t*1.5)*.05;
  [[-9,1],[9,-1]].forEach(function(p,i){ c.strokeStyle='#1f2937'; c.lineWidth=3.4; c.beginPath(); c.moveTo(p[0]*.8,-26); c.lineTo(p[0],-6); c.stroke(); el(c,p[0]+3,-3.5,7,4); fs(c,i?'#b91c1c':'#991b1b'); c.fillStyle='rgba(255,255,255,.35)'; el(c,p[0]+4,-5,3,1.1); c.fill(); });
  c.translate(0,b);
  var aF=m>0?-2.2+Math.sin(t*6)*.3:-.5; c.strokeStyle='#1f2937'; c.lineWidth=3; c.beginPath(); c.moveTo(-26,-50); c.quadraticCurveTo(-36,-44,-26-Math.sin(-aF)*8,-50+Math.cos(aF)*14); c.stroke(); circ(c,-26-Math.sin(-aF)*8,-50+Math.cos(aF)*14,4.6); fs(c,'#fff','#94a3b8',1);
  c.strokeStyle='#9ca3af'; c.lineWidth=2.6; c.beginPath(); c.arc(0,-78,20,1.15*PI,1.85*PI); c.stroke();
  [[-1],[1]].forEach(function(s){ c.save(); c.translate(s[0]*17,-80); c.rotate(s[0]*.55); c.beginPath(); c.moveTo(-11,4); c.bezierCurveTo(-11,-12,11,-12,11,4); c.closePath(); fs(c,lin(c,-10,-10,10,4,'#fef08a','#ca8a04'),'#854d0e',1.2); c.fillStyle='rgba(255,255,255,.6)'; el(c,-4,-4,2,3.5); c.fill(); circ(c,0,-9,2.2); fs(c,'#ca8a04'); c.restore(); });
  c.save(); c.translate(0,-80); c.rotate(sv); c.strokeStyle='#6b7280'; c.lineWidth=2; c.beginPath(); c.moveTo(0,8); c.lineTo(0,-6); c.stroke(); circ(c,0,-7,2.6); fs(c,'#9ca3af'); c.restore();
  circ(c,0,-50,29); fs(c,rad(c,0,-50,30,'#fb7185','#b91c1c'),'#7f1d1d',1.6);
  circ(c,0,-50,22.5); fs(c,rad(c,0,-50,23,'#ffffff','#e5e7eb'),'#9f1239',1.4);
  c.strokeStyle='#64748b'; for(var k=0;k<12;k++){ var a=k/12*TAU; c.lineWidth=k%3?1:2; c.beginPath(); c.moveTo(Math.cos(a)*18,-50+Math.sin(a)*18); c.lineTo(Math.cos(a)*20.5,-50+Math.sin(a)*20.5); c.stroke(); }
  c.fillStyle='rgba(255,255,255,.55)'; el(c,-12,-68,8,3.5); c.fill();
  var pis=(t%3.6)<.12; olho(c,-7,-50,3.8,5,'#1e293b',pis,false); olho(c,7,-50,3.8,5,'#1e293b',pis,false);
  var sob=m>0?Math.sin(t*4)*.12:0; c.save(); c.translate(0,-60); c.strokeStyle='#111827'; c.lineCap='round';
  c.lineWidth=2.6; c.save(); c.rotate(-.28+sob); c.beginPath(); c.moveTo(0,0); c.lineTo(-12,0); c.stroke(); c.restore();
  c.lineWidth=2; c.save(); c.rotate(.22-sob); c.beginPath(); c.moveTo(0,0); c.lineTo(13,0); c.stroke(); c.beginPath(); c.moveTo(13,0); c.lineTo(9.5,-2); c.lineTo(9.5,2); c.closePath(); c.fillStyle='#111827'; c.fill(); c.restore();
  circ(c,0,0,2.2); fs(c,'#dc2626','#111827',1); c.restore();
  c.fillStyle='rgba(244,114,128,.5)'; el(c,-13,-42,3.6,2.2); c.fill(); el(c,13,-42,3.6,2.2); c.fill();
  bocaFala(c,0,-40,m,3.4);
  var aN=m>0?2.3+Math.sin(t*5)*.3:.6+Math.sin(t*1.5)*.06, hx=26+Math.sin(aN)*12, hy=-50+Math.cos(aN)*14;
  c.strokeStyle='#1f2937'; c.lineWidth=3; c.beginPath(); c.moveTo(26,-50); c.quadraticCurveTo(34,-48,hx,hy); c.stroke(); circ(c,hx,hy,4.8); fs(c,'#fff','#94a3b8',1);
}
/* ---------- locutor do estádio (terno e microfone) ---------- */
function locutor(c,t,m){
  sombra(c,20); var o={pele:'#f1c6a0',peleS:'#d39b74',olho:'#2a1a10'};
  var aF=m>0?.9+Math.sin(t*4)*.3:.2; membro(c,7,-56,aF,20,8.5,'#1e2a5a',o.pele,5);
  pernas(c,'#1e2a5a','#0b0f1a',0);
  torso(c,'#33438a','#18214a');
  c.beginPath(); c.moveTo(-7,-63); c.lineTo(7,-63); c.lineTo(0,-40); c.closePath(); fs(c,'#ffffff','rgba(0,0,0,.2)',1);
  c.beginPath(); c.moveTo(-1.8,-60); c.lineTo(1.8,-60); c.lineTo(3,-46); c.lineTo(0,-42); c.lineTo(-3,-46); c.closePath(); fs(c,'#dc2626','#7f1d1d',1);
  c.fillStyle='#16204a'; [[-1],[1]].forEach(function(s){ c.beginPath(); c.moveTo(s[0]*7,-63); c.lineTo(s[0]*12,-55); c.lineTo(s[0]*1,-38); c.lineTo(0,-40); c.closePath(); fs(c,'#2b3a7c','#0f1636',1); });
  c.fillStyle='#fde047'; c.beginPath(); c.moveTo(-12,-50); c.lineTo(-9,-54); c.lineTo(-6,-50); c.closePath(); c.fill(); c.fillStyle='#e5e7eb'; circ(c,1,-33,1.5); c.fill(); circ(c,1,-27,1.5); c.fill();
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.beginPath(); c.moveTo(-26,8); c.lineTo(-26,-24); c.lineTo(26,-24); c.lineTo(26,-11); c.quadraticCurveTo(10,-17,-2,-12); c.quadraticCurveTo(-8,-14,-12,-8); c.quadraticCurveTo(-14,-2,-14,6); c.closePath(); fs(c,lin(c,0,-22,0,6,'#7c4a25','#3f2412'),'#2a160b',1); c.restore();
    c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=1.6; [0,4].forEach(function(d){ c.beginPath(); c.arc(4,4,22-d,1.25*PI,1.5*PI); c.stroke(); });
    sobr(c,-1,-10.5,'#3f2412',-.6); sobr(c,12.5,-11,'#3f2412',.6); });
  var aN=2.05+(m>0?Math.sin(t*3)*.06:0); membro(c,-6,-56,aN,20,8.5,'#2b3a7c',o.pele,5);
  var mh=maoEm(-6,-56,aN,20); c.save(); c.translate(mh[0],mh[1]); c.rotate(-.55);
  rr(c,-2.6,-2,5.2,16,2.4); fs(c,lin(c,-2,0,2,0,'#374151','#111827')); rr(c,-3.4,-4,6.8,4,1); fs(c,'#dc2626',null);
  circ(c,0,-9,6.5); fs(c,rad(c,0,-9,7,'#e5e7eb','#6b7280'),'#374151',1.2); c.save(); circ(c,0,-9,6.5); c.clip(); c.strokeStyle='rgba(55,65,81,.6)'; c.lineWidth=.8; for(var g=-8;g<=8;g+=2.5){ c.beginPath(); c.moveTo(g,-16); c.lineTo(g+3,-2); c.moveTo(g,-2); c.lineTo(g+3,-16); c.stroke(); } c.restore(); c.restore();
}
/* ---------- engenheira ---------- */
function engenheira(c,t,m){
  sombra(c,20); var o={pele:'#b97a4e',peleS:'#93572f',olho:'#3b2112',cilio:true};
  c.save(); c.translate(-17,-90); c.rotate(.25+Math.sin(t*1.6)*.06); for(var k=0;k<4;k++){ el(c,0,k*6,4.4,4); fs(c,'#2c1a10','#140a05',1); } c.fillStyle='#f97316'; circ(c,0,24,2.4); c.fill(); c.restore();
  membro(c,7,-56,m>0?.6+Math.sin(t*3)*.2:.2,20,8.5,'#1d4ed8',o.pele,5);
  pernas(c,'#1e3a8a','#a16207',0);
  torso(c,'#3b82f6','#1d4ed8');
  [[-1],[1]].forEach(function(s){ c.beginPath(); c.moveTo(s[0]*15,-58); c.lineTo(s[0]*5,-63); c.lineTo(s[0]*2,-24); c.lineTo(s[0]*15,-24); c.closePath(); fs(c,lin(c,-15,-60,15,-24,'#fb923c','#ea580c')); });
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); [-46,-34].forEach(function(y){ c.fillStyle='#e5e7eb'; c.fillRect(-16,y,13,4); c.fillRect(3,y,13,4); c.fillStyle='rgba(255,255,255,.8)'; c.fillRect(-16,y,13,1.2); c.fillRect(3,y,13,1.2); }); c.restore();
  rr(c,-15,-63,30,40,13); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  cabeca1(c,o,t,m,function(c){
    cab(c,'#2c1a10',-8,8); sobr(c,-1,-8.5,'#2c1a10',0); sobr(c,12.5,-9,'#2c1a10',0);
    c.save(); c.translate(1,-8); c.beginPath(); c.moveTo(-22,2); c.bezierCurveTo(-22,-22,22,-22,22,2); c.closePath(); fs(c,lin(c,0,-18,0,2,'#ffffff','#d1d5db'),'#6b7280',1.3);
    rr(c,-25,0,54,5,2.5); fs(c,'#f3f4f6','#6b7280',1.2); rr(c,-3,-17,6,17,3); fs(c,'#e5e7eb','#9ca3af',1);
    c.strokeStyle='rgba(255,255,255,.95)'; c.lineWidth=2; c.beginPath(); c.arc(0,0,15,1.15*PI,1.4*PI); c.stroke(); c.restore(); });
  var aN=m>0?1.15+Math.sin(t*2.5)*.08:.85; var mh=maoEm(-6,-56,aN,20);
  c.save(); c.translate(mh[0]+5,mh[1]-4); c.rotate(m>0?-.25:-.1); rr(c,-10,-13,20,26,2); fs(c,lin(c,0,-13,0,13,'#b45309','#78350f'),'#451a03',1); rr(c,-8,-10,16,21,1); fs(c,'#fff',null);
  c.strokeStyle='#94a3b8'; c.lineWidth=.9; for(var i=0;i<4;i++){ c.beginPath(); c.moveTo(-2,-5+i*4.5); c.lineTo(6,-5+i*4.5); c.stroke(); c.strokeStyle='#16a34a'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-6.5,-5+i*4.5); c.lineTo(-5,-3.5+i*4.5); c.lineTo(-3,-7+i*4.5); c.stroke(); c.strokeStyle='#94a3b8'; c.lineWidth=.9; }
  rr(c,-5,-15,10,5,1.5); fs(c,'#9ca3af','#4b5563',1); c.restore();
  membro(c,-6,-56,aN,20,8.5,'#3b82f6',o.pele,5);
}
/* ---------- fotógrafo com câmera de fole no tripé ---------- */
function fotografo(c,t,m){
  sombra(c,20); c.save(); c.translate(40,0); sombra(c,16,.15); c.restore(); var o={pele:'#f0c39a',peleS:'#cf9a70',olho:'#2a1a10'};
  membro(c,7,-56,.2,20,8.5,'#7c3aed',o.pele,5);
  pernas(c,'#6b4423','#1f2937',0);
  torso(c,'#ffffff','#e5e7eb');
  c.save(); rr(c,-15,-63,30,40,13); c.clip(); c.fillStyle='#3b82f6'; for(var y=-60;y<-22;y+=6) c.fillRect(-16,y,32,2.6); c.restore();
  [[-1],[1]].forEach(function(s){ c.beginPath(); c.moveTo(s[0]*15,-58); c.lineTo(s[0]*6,-62); c.lineTo(s[0]*3,-25); c.lineTo(s[0]*15,-25); c.closePath(); fs(c,lin(c,-15,-60,15,-24,'#8b5a2b','#5b3418')); });
  c.fillStyle='#fbbf24'; circ(c,4,-40,1.4); c.fill(); circ(c,4,-32,1.4); c.fill();
  c.beginPath(); c.moveTo(-5,-63); c.lineTo(0,-58); c.lineTo(5,-63); c.lineTo(5,-58); c.lineTo(0,-58); c.lineTo(-5,-58); c.closePath(); fs(c,'#dc2626','#7f1d1d',1);
  cabeca1(c,o,t,m,function(c){
    c.save(); el(c,1,0,22.6,21.2); c.clip(); c.fillStyle='#3a2416'; el(c,-17,2,6,10); c.fill(); c.restore();
    c.fillStyle='#3a2416'; [1,-1].forEach(function(s){ c.save(); c.translate(7.5,9.5); c.scale(s,1); c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(4,-2,8,-1,10,-3); c.bezierCurveTo(12,-5,10,-7,9,-5); c.bezierCurveTo(8,0,3,2,0,2); c.closePath(); c.fill(); c.restore(); });
    sobr(c,-1,-9,'#3a2416',-.4); sobr(c,12.5,-9.5,'#3a2416',.4);
    c.save(); c.translate(-1,-15); c.rotate(-.22); el(c,0,0,24,8); fs(c,lin(c,0,-8,0,8,'#ef4444','#991b1b'),'#7f1d1d',1.2); rr(c,-2,-11,4,5,2); fs(c,'#7f1d1d'); c.restore(); });
  /* câmera antiga no tripé */
  c.save(); c.translate(40,0); c.strokeStyle='#6b3f1f'; c.lineWidth=3; c.beginPath(); c.moveTo(0,-58); c.lineTo(-12,0); c.moveTo(0,-58); c.lineTo(12,0); c.moveTo(0,-58); c.lineTo(2,-2); c.stroke(); c.strokeStyle='#a0663a'; c.lineWidth=1; c.stroke();
  rr(c,-12,-80,20,22,2.5); fs(c,lin(c,0,-80,0,-58,'#b9774a','#6b3f1f'),'#3f2412',1.2);
  c.beginPath(); c.moveTo(8,-78); c.lineTo(22,-74); c.lineTo(22,-64); c.lineTo(8,-60); c.closePath(); fs(c,'#1f2937','#000',1);
  c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=1; for(var f=11;f<22;f+=3){ c.beginPath(); c.moveTo(f,-77+(f-8)*.28); c.lineTo(f,-61-(f-8)*.28); c.stroke(); }
  rr(c,21,-76,5,14,1.5); fs(c,'#b45309','#78350f',1); circ(c,28,-69,5); fs(c,rad(c,28,-69,5,'#93c5fd','#1e3a8a'),'#b7791f',1.6); c.fillStyle='rgba(255,255,255,.8)'; circ(c,26.6,-70.6,1.4); c.fill();
  rr(c,-6,-86,8,6,1.5); fs(c,'#374151'); c.restore();
  var aN=1.05; membro(c,-6,-56,aN,20,8.5,'#ffffff',o.pele,5);
  var mh=maoEm(-6,-56,aN,20), sq=m>0?Math.abs(Math.sin(t*3))*.2:0;
  c.strokeStyle='#111827'; c.lineWidth=1.4; c.beginPath(); c.moveTo(mh[0]+3,mh[1]+2); c.quadraticCurveTo(28,-24,36,-62); c.stroke();
  c.save(); c.translate(mh[0]+2,mh[1]+2); c.scale(1+sq,1-sq); el(c,0,0,4.2,3.4); fs(c,'#1f2937','#000',1); c.restore();
}

var NOVOS={lucia:lucia,francisco:francisco,pedro:pedro,joao:joao,vovo:vovo,clio:clio,tic:tic,locutor:locutor,engenheira:engenheira,fotografo:fotografo};
var morador0=A.morador;
A.morador=function(c,tipo,x,y,t,dir,falando){
  var f=NOVOS[tipo]; if(!f){ if(morador0) morador0(c,tipo,x,y,t,dir,falando); return; }
  t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round';
  if(tipo!=='tic'){ var r=Math.sin(t*2.4); c.translate(0,-r*.4); c.scale(1-r*.006,1+r*.008); }
  if(tipo==='vovo') coque(c);
  f(c,t,fala(t,falando)); c.restore();
};
A.MORADORES=(A.MORADORES||[]).concat(Object.keys(NOVOS));

/* ============================================================
   RAINHA TRAÇA — vilã cômica (mariposa roxa-acinzentada gordinha)
   ============================================================ */
/* contorno de elipse com mordidas (bites:[[ang,larg,prof]]) */
function mordido(c,cx,cy,rx,ry,rot,bites){
  c.beginPath(); for(var i=0;i<=72;i++){ var a=i/72*TAU, r=1; (bites||[]).forEach(function(b){ var d=Math.atan2(Math.sin(a-b[0]),Math.cos(a-b[0])); if(Math.abs(d)<b[1]) r-=b[2]*Math.sqrt(1-(d/b[1])*(d/b[1])); });
    var px=Math.cos(a)*rx*r, py=Math.sin(a)*ry*r; c.lineTo(cx+px*Math.cos(rot)-py*Math.sin(rot),cy+px*Math.sin(rot)+py*Math.cos(rot)); } c.closePath();
}
function letrinhas(c,x0,y0,w,lin2,cor,sem){ c.fillStyle=cor; for(var j=0;j<lin2;j++){ var x=x0; while(x<x0+w){ var lw=2+hash(sem+x*.7+j*13)*4; c.fillRect(x,y0+j*6,lw,1.8); x+=lw+1.6+(hash(x+j+sem)>.75?3:0); } } }
function asaTraca(c,s,cx,cy,rx,ry,rot,cor,sem){
  mordido(c,cx,cy,rx,ry,rot,[[.4*s+(s<0?PI:0),.28,.16],[-.5*s+(s<0?PI:0),.2,.12],[1.4,.22,.1]]);
  var g=c.createRadialGradient(cx-rx*.9*s,cy,2,cx-rx*.9*s,cy,rx*2); g.addColorStop(0,cor); g.addColorStop(.45,'#f1e6f7'); g.addColorStop(1,'#fff6e3'); fs(c,g,null);
  c.save(); c.clip(); letrinhas(c,cx-rx,cy-ry*.62,rx*2,Math.floor(ry/3.3),'rgba(92,60,70,.38)',sem);
  c.strokeStyle=esc(cor,.15); c.lineWidth=Math.max(3,ry*.16); c.globalAlpha=.55; c.stroke(); c.globalAlpha=1;
  c.fillStyle=esc(cor,.25); circ(c,cx+rx*.25*s,cy,ry*.3); c.fill(); c.fillStyle='#fde68a'; circ(c,cx+rx*.25*s,cy,ry*.16); c.fill(); c.fillStyle='#4c1d95'; circ(c,cx+rx*.25*s,cy,ry*.07); c.fill(); c.restore();
  c.strokeStyle=esc(cor,.5); c.lineWidth=1.6; c.stroke();
}
function antena(c,x,y,dx,dy,cur){ c.strokeStyle='#4c3d6b'; c.lineWidth=2.4; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+dx*.2,y+dy*.7,x+dx,y+dy); c.stroke();
  c.lineWidth=1.3; for(var k=1;k<8;k++){ var u=k/8, px=x+dx*(.2*2*u*(1-u)+u*u)*1, py=y+dy*(.7*2*u*(1-u)+u*u); c.beginPath(); c.moveTo(px,py); c.lineTo(px-6*(1-u*.4),py-cur*(1-u*.4)); c.moveTo(px,py); c.lineTo(px+6*(1-u*.4),py-cur*(1-u*.4)); c.stroke(); }
  circ(c,x+dx,y+dy,3); fs(c,'#c4b5fd','#4c3d6b',1); }
function bracoT(c,x,y,a,len,cor,mao){ c.save(); c.translate(x,y); c.rotate(-a); rr(c,-4.5,-2,9,len,4.5); fs(c,lin(c,-4,0,4,0,cla(cor,.15),esc(cor,.15)),'#4c3d6b',1.2); fofo(c,0,len-2,6.5,3.6,5,.14); fs(c,'#ffffff','#cbd5e1',1); if(mao!==false){ circ(c,0,len+3,5.2); fs(c,'#f5f3ff','#4c3d6b',1.1); } c.restore(); }
function fofo(c,cx,cy,rx,ry,n,amp){ c.beginPath(); for(var i=0;i<=n*4;i++){ var a=i/(n*4)*TAU, k=1+amp*Math.abs(Math.sin(i*PI/4)); c.lineTo(cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k); } c.closePath(); }
A.conde=function(c,x,y,estado,t){
  t=t||0; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  var bob=Math.sin(t*2.2)*2, sx=1, sy=1, rot=0, flap=Math.sin(t*2.4)*.06, ant=0, coroa=-.22, olhos='normal', bc='sorri', bN=.5, bF=-.4;
  if(estado==='laugh'){ var k=Math.abs(Math.sin(t*10)); bob=-k*6; sx=1+k*.03; olhos='riso'; bc='riso'; flap=Math.sin(t*7)*.14; ant=Math.sin(t*10)*.2; bN=.2; bF=.1; coroa=-.22+Math.sin(t*10)*.08; }
  else if(estado==='hit'){ var k2=Math.max(0,Math.sin(t*8)); sx=1.1+k2*.04; sy=.88-k2*.03; olhos='tonto'; bc='O'; coroa=-.7; ant=1; rot=Math.sin(t*20)*.02; bN=-2.4; bF=2.4; flap=-.2; }
  else if(estado==='sad'){ bob=0; sy=.97; olhos='triste'; bc='triste'; ant=.85; coroa=-.4; bN=.1; bF=-.1; flap=-.15; }
  else if(estado==='write'){ olhos='foco'; bc='mastiga'; bN=2.3; bF=2.3; }
  c.save(); c.globalAlpha=.25; c.fillStyle='#000'; el(c,0,2,46,8); c.fill(); c.restore();
  if(estado==='hit') for(var s=0;s<5;s++){ var a=s/5*TAU+t*2.5; A.estrela(c,Math.cos(a)*40,-168+Math.sin(a)*9,5.5,s%2?'#fde047':'#fff',a); }
  c.translate(0,bob); c.rotate(rot); c.scale(sx,sy);
  /* asas (a de trás mais escura) */
  [[-1,'#9e8fc0',11],[1,'#b7a9d6',23]].forEach(function(w){ var s=w[0]; c.save(); c.translate(s*10,-82); c.rotate(s*(-.15-flap));
    asaTraca(c,s,s*46,-30,46,30,s*-.45,w[1],w[2]); asaTraca(c,s,s*34,18,30,22,s*.5,esc(w[1],.08),w[2]+5); c.restore(); });
  /* capa de pó */
  c.beginPath(); c.moveTo(-24,-94); c.quadraticCurveTo(0,-100,24,-94); c.bezierCurveTo(38,-66,44,-36,46,-8);
  for(var h=0;h<8;h++){ var px=46-h*11.5; c.quadraticCurveTo(px-6,-1+Math.sin(t*2+h)*2,px-11.5,-6); }
  c.bezierCurveTo(-44,-36,-38,-66,-24,-94); c.closePath(); fs(c,lin(c,-40,-90,40,0,'rgba(196,190,214,.88)','rgba(120,112,146,.88)'),'rgba(80,70,110,.55)',1.4);
  for(var p=0;p<9;p++){ var ph=(t*.35+hash(p))%1; c.save(); c.globalAlpha=.55*(1-ph); c.fillStyle='#d6d3e0'; circ(c,-40+hash(p+3)*80,-6-ph*30,1.6+hash(p+7)*2.4); c.fill(); c.restore(); }
  /* pernas com sapatinhos */
  [[-13,'#6d28d9'],[13,'#7c3aed']].forEach(function(f){ c.strokeStyle='#4c3d6b'; c.lineWidth=4; c.beginPath(); c.moveTo(f[0]*.7,-24); c.lineTo(f[0],-7); c.stroke(); el(c,f[0]+2,-4,9,5); fs(c,f[1],'#3b0764',1.2); circ(c,f[0]+8,-7,2.4); fs(c,'#f9a8d4',null); });
  /* corpo fofinho listrado */
  fofo(c,0,-54,31,38,10,.05); fs(c,rad(c,-4,-62,40,'#c9c0de','#6e6290'),'#4c3d6b',1.6);
  c.save(); fofo(c,0,-54,31,38,10,.05); c.clip(); c.strokeStyle='rgba(76,61,107,.35)'; c.lineWidth=4; for(var b=0;b<4;b++){ c.beginPath(); c.arc(0,-104+b*11,60,.35*PI,.65*PI); c.stroke(); } c.fillStyle='rgba(255,255,255,.18)'; el(c,-12,-66,8,16); c.fill(); c.restore();
  /* braço de trás */
  bracoT(c,18,-72,bF,24,'#8b7fb0',estado!=='write');
  /* gola de arminho */
  for(var g=0;g<7;g++){ var ga=PI*(.08+g*.14); circ(c,Math.cos(ga)*25,-94+Math.sin(ga)*8,7.5); fs(c,'#ffffff','#cbd5e1',1); } c.fillStyle='#1f2937'; [-14,0,14].forEach(function(x2){ c.beginPath(); c.moveTo(x2,-90); c.lineTo(x2-1.5,-86); c.lineTo(x2+1.5,-86); c.closePath(); c.fill(); });
  /* cabeça */
  c.save(); c.translate(0,-120); if(estado==='sad') c.rotate(.08); if(estado==='laugh') c.rotate(Math.sin(t*10)*.05);
  var aE=ant*.9, ar=estado==='laugh'?Math.sin(t*10)*4:Math.sin(t*1.8)*3;
  antena(c,-9,-24,-22-ar*.4-ant*14,-30+aE*26,5-ant*8); antena(c,9,-24,22+ar*.4+ant*14,-30+aE*20,5-ant*8);
  fofo(c,0,0,29,27,9,.05); fs(c,rad(c,-4,-6,32,'#e2dcef','#9a8dbb'),'#4c3d6b',1.6);
  c.fillStyle='rgba(244,114,182,.5)'; el(c,-18,9,6,3.6); c.fill(); el(c,18,9,6,3.6); c.fill();
  var pis=(t%3.9)<.12;
  [[-11,1],[11,-1]].forEach(function(e){ var ex=e[0];
    if(olhos==='riso'){ c.strokeStyle='#2e1065'; c.lineWidth=3; c.beginPath(); c.arc(ex,2,6,1.1*PI,1.9*PI); c.stroke(); return; }
    if(olhos==='tonto'){ c.strokeStyle='#2e1065'; c.lineWidth=2; c.beginPath(); for(var q=0;q<20;q++){ var qa=q*.6+t*6*e[1], qr=q*.38; c.lineTo(ex+Math.cos(qa)*qr,-1+Math.sin(qa)*qr); } c.stroke(); return; }
    el(c,ex,-1,9,10.5); fs(c,'#fff','#4c3d6b',1.3);
    if(pis){ el(c,ex,-1,9.6,11); fs(c,'#c9c0de',null); c.strokeStyle='#2e1065'; c.lineWidth=2; c.beginPath(); c.arc(ex,0,7,.15*PI,.85*PI); c.stroke(); return; }
    var px=olhos==='foco'?3:1.5, py=olhos==='triste'?3:1; olho(c,ex+px,py,5.6,7.2,'#6d28d9',false,false);
    if(olhos==='normal'||olhos==='foco'){ c.save(); el(c,ex,-1,9.6,11); c.clip(); c.fillStyle='#b7a9d6'; c.fillRect(ex-11,-13,22,olhos==='foco'?8:5); c.restore(); c.strokeStyle='#2e1065'; c.lineWidth=1.6; c.beginPath(); c.moveTo(ex-9,olhos==='foco'?-5:-8); c.lineTo(ex+9,olhos==='foco'?-5:-8); c.stroke(); }
    c.strokeStyle='#2e1065'; c.lineWidth=1.5; for(var l=0;l<3;l++){ var la=-PI/2+(l-1)*.45+(e[1]>0?-.2:.2); c.beginPath(); c.moveTo(ex+Math.cos(la)*9,-1+Math.sin(la)*10.5); c.lineTo(ex+Math.cos(la)*13,-1+Math.sin(la)*14); c.stroke(); } });
  var sb=olhos==='triste'?[-.35,.35]:(olhos==='riso'?[0,0]:[.15,-.45]); c.fillStyle='#5b4a80';
  [[-11,-15,sb[0]],[11,-15,sb[1]]].forEach(function(q){ c.save(); c.translate(q[0],q[1]-(q[0]>0&&olhos==='normal'?3:0)); c.rotate(q[2]*(q[0]>0?1:-1)); el(c,0,0,7,2.6); c.fill(); c.restore(); });
  var ch=Math.abs(Math.sin(t*9));
  if(bc==='riso'){ c.beginPath(); c.moveTo(-9,11); c.quadraticCurveTo(0,28,9,11); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.2); c.fillStyle='#f87171'; el(c,0,19,4,2.4); c.fill(); c.fillStyle='#fff'; c.fillRect(-4,11,3.6,4); c.fillRect(.4,11,3.6,4); }
  else if(bc==='O'){ el(c,0,15,4,5); fs(c,'#450a0a',null); }
  else if(bc==='triste'){ c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.arc(0,20,6,1.15*PI,1.85*PI); c.stroke(); var lg=(t*.8)%1; c.fillStyle='rgba(96,165,250,.85)'; c.beginPath(); c.moveTo(-14,8+lg*14); c.quadraticCurveTo(-17,14+lg*14,-14,16+lg*14); c.quadraticCurveTo(-11,14+lg*14,-14,8+lg*14); c.fill(); }
  else if(bc==='mastiga'){ el(c,2,14,4+ch*2,1.5+ch*3); fs(c,'#7f1d1d','#450a0a',1.1); c.fillStyle='#fff'; c.fillRect(-1.5,12-ch,3,3); c.fillRect(2,12-ch,3,3); }
  else { c.strokeStyle='#450a0a'; c.lineWidth=2; c.beginPath(); c.moveTo(-8,10); c.quadraticCurveTo(0,17,10,8); c.stroke(); c.fillStyle='#fff'; rr(c,-3,12,3.4,4.2,1); c.fill(); rr(c,.8,12,3.4,4.2,1); c.fill(); c.strokeStyle='rgba(69,10,10,.5)'; c.lineWidth=.8; c.strokeRect(-3,12,3.4,4.2); c.strokeRect(.8,12,3.4,4.2); }
  /* coroa torta, com uma ponta mordida */
  c.save(); c.translate(6,-25); c.rotate(coroa+.2);
  c.beginPath(); c.moveTo(-15,0); c.lineTo(-17,-16); c.lineTo(-8,-8); c.lineTo(0,-20); c.lineTo(5,-11); c.quadraticCurveTo(7,-15,9,-10); c.lineTo(17,-16); c.lineTo(15,0); c.closePath(); fs(c,lin(c,0,-20,0,0,'#fef08a','#d97706'),'#92400e',1.3);
  rr(c,-16,-3,32,6,2.5); fs(c,'#fbbf24','#92400e',1); c.fillStyle='#ec4899'; circ(c,0,0,2.4); c.fill(); c.fillStyle='#22d3ee'; circ(c,-9,0,1.8); c.fill(); circ(c,9,0,1.8); c.fill(); c.fillStyle='#fff'; circ(c,0,-20,2); c.fill(); c.restore();
  c.restore();
  /* braço da frente (+ papel roído no 'write') */
  if(estado==='write'){ c.save(); c.translate(20,-97); c.rotate(-.1+Math.sin(t*9)*.03);
    c.beginPath(); c.moveTo(-14,-13); c.lineTo(15,-13); c.lineTo(15,13); c.lineTo(-14,13); c.lineTo(-14,11.6); [8,.8,-6.4].forEach(function(yc){ c.arc(-14,yc,3.6,.5*PI,-.5*PI,true); }); c.lineTo(-14,-13); c.closePath(); fs(c,lin(c,0,-13,0,13,'#fffbeb','#ead6ad'),'#a0763f',1.2);
    letrinhas(c,-8,-9,20,3,'rgba(120,80,40,.55)',3); rr(c,1,3,10,7,1); fs(c,'#7dd3fc','#78350f',1); c.fillStyle='#4ade80'; c.fillRect(1.6,7,8.8,2.4); c.restore();
    for(var cr=0;cr<5;cr++){ var cf=(t*1.1+cr/5)%1; c.save(); c.globalAlpha=1-cf; c.fillStyle=cr%2?'#ead6ad':'#fffbeb'; c.translate(8+Math.sin(cr*5)*5,-96+cf*50); c.rotate(cf*6+cr); c.fillRect(-1.6,-1.6,3.2,3.2); c.restore(); }
    var mb=[18+Math.sin(bF)*27,-72+Math.cos(bF)*27]; circ(c,mb[0],mb[1],5.2); fs(c,'#f5f3ff','#4c3d6b',1.1); }
  bracoT(c,-14,-72,bN,24,'#a497c8');
  if(estado==='idle'||estado==='sad'){ var mN=[-14+Math.sin(bN)*27,-72+Math.cos(bN)*27]; c.save(); c.translate(mN[0],mN[1]); c.rotate(-.2); c.strokeStyle='#92400e'; c.lineWidth=3; c.beginPath(); c.moveTo(0,12); c.lineTo(0,-30); c.stroke(); circ(c,0,-33,5); fs(c,rad(c,0,-33,5,'#f0abfc','#a21caf'),'#701a75',1); cintila(c,-1.5,-35,2,'#fff'); circ(c,0,0,5.2); fs(c,'#f5f3ff','#4c3d6b',1.1); c.restore(); }
  if(estado==='laugh'){ c.fillStyle='#6d28d9'; c.font='900 16px Arial'; c.textAlign='center'; [[48,-150],[62,-128],[-50,-140]].forEach(function(q,i){ var k3=Math.abs(Math.sin(t*10+i)); c.globalAlpha=.85; c.fillText(i%2?'HI':'HA',q[0],q[1]-k3*5); }); c.globalAlpha=1; }
  c.restore();
};

/* ---------- traçinha (inimigo pequeno, voa) ---------- */
A.traca=function(c,x,y,t,dir,voando){
  t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round';
  var fl=voando===false?0:Math.sin(t*7), hv=voando===false?0:Math.sin(t*3.5)*2;
  if(voando!==false){ c.save(); c.globalAlpha=.16; c.fillStyle='#000'; el(c,0,0,10,2.4); c.fill(); c.restore(); }
  c.translate(0,-16+hv);
  if(voando!==false){ [[-1,.75],[1,1]].forEach(function(w){ c.save(); c.translate(-2+w[0]*1,-4); c.scale(1,.35+.65*Math.abs(fl)); c.rotate(-.35+w[0]*.18); c.globalAlpha=w[1];
      mordido(c,-7,-11,12,12,-.3,[[-.5,.4,.2],[-1.6,.3,.12]]); fs(c,lin(c,-16,-22,0,0,'#fff6e3','#b9a8d6'),'#5b4a80',1.1); c.save(); c.clip(); letrinhas(c,-15,-18,16,3,'rgba(70,50,100,.4)',w[0]+2); c.restore(); c.restore(); }); }
  else { c.save(); c.translate(-4,-6); mordido(c,-6,0,13,6,.15,[[-.6,.35,.2]]); fs(c,lin(c,-18,-6,6,6,'#fff6e3','#b9a8d6'),'#5b4a80',1.1); c.save(); c.clip(); letrinhas(c,-18,-4,22,2,'rgba(92,60,70,.4)',4); c.restore(); c.restore();
    c.strokeStyle='#4c3d6b'; c.lineWidth=1.6; var wk=Math.sin(t*10)*2; [[-6,wk],[4,-wk]].forEach(function(l){ c.beginPath(); c.moveTo(l[0],5); c.lineTo(l[0]+l[1],13); c.stroke(); el(c,l[0]+l[1]+1.5,14,3,1.8); fs(c,'#7c3aed',null); }); }
  fofo(c,-2,0,11,7.5,6,.06); fs(c,rad(c,-4,-3,12,'#d6cfe7','#7c6fa0'),'#4c3d6b',1.2);
  c.save(); fofo(c,-2,0,11,7.5,6,.06); c.clip(); c.strokeStyle='rgba(76,61,107,.35)'; c.lineWidth=2; [-9,-4].forEach(function(xx){ c.beginPath(); c.arc(xx+14,0,14,.8*PI,1.2*PI); c.stroke(); }); c.fillStyle='rgba(255,255,255,.3)'; el(c,-3,-4,6,2); c.fill(); c.restore();
  c.strokeStyle='#4c3d6b'; c.lineWidth=1.3; c.beginPath(); c.moveTo(11,-6); c.quadraticCurveTo(12,-16,18,-17); c.moveTo(13,-5); c.quadraticCurveTo(18,-12,23,-11); c.stroke(); c.fillStyle='#c4b5fd'; circ(c,18,-17,1.8); c.fill(); circ(c,23,-11,1.8); c.fill();
  circ(c,11,0,7.5); fs(c,rad(c,10,-2,8,'#ece7f6','#a497c8'),'#4c3d6b',1.2);
  var pis=(t%3.2)<.12; olho(c,10,-.5,2.3,3,'#2e1065',pis,false); olho(c,15,-.8,2,2.8,'#2e1065',pis,false);
  c.fillStyle='rgba(244,114,182,.55)'; el(c,8,4.5,2,1.2); c.fill(); c.strokeStyle='#450a0a'; c.lineWidth=1; c.beginPath(); c.arc(14,3,1.8,.15*PI,.85*PI); c.stroke(); c.fillStyle='#fff'; c.fillRect(13.2,4.4,1.6,1.6);
  c.restore();
};
/* ---------- bolinha de poeira (anda) ---------- */
A.poeira=function(c,x,y,t,dir,achatado){
  t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,achatado?.35:1); c.lineJoin='round'; c.lineCap='round';
  c.save(); c.globalAlpha=.18; c.fillStyle='#000'; el(c,0,0,16,3.4); c.fill(); c.restore();
  var w=achatado?0:Math.sin(t*9), sq=achatado?0:Math.abs(w)*.06;
  [-7,6].forEach(function(px,i){ el(c,px+(i?-w:w)*3,-2,5,3); fs(c,'#57534e','#292524',1); });
  c.save(); c.translate(0,-17); c.scale(1+sq,1-sq);
  c.beginPath(); for(var i=0;i<=56;i++){ var a=i/56*TAU, r=16*(1+(i%2?.09:-.01)+Math.sin(i*1.7+t*2)*.025); c.lineTo(Math.cos(a)*r,Math.sin(a)*r); } c.closePath(); fs(c,rad(c,-3,-4,18,'#d6d3d1','#78716c'),'#57534e',1.2);
  c.strokeStyle='rgba(68,64,60,.4)'; c.lineWidth=1; for(var k=0;k<6;k++){ var ka=hash(k)*TAU; c.beginPath(); c.arc(Math.cos(ka)*7,Math.sin(ka)*7,4,ka,ka+2); c.stroke(); }
  if(achatado){ c.strokeStyle='#1c1917'; c.lineWidth=2; [[2,1],[10,-1]].forEach(function(e){ c.beginPath(); c.moveTo(e[0]-3,-5); c.lineTo(e[0]+2,-2); c.lineTo(e[0]-3,1); c.stroke(); }); }
  else { var pis=(t%2.9)<.12; el(c,3,-3,4.6,5.4); fs(c,'#fff','#57534e',1); el(c,12,-3.5,4,5); fs(c,'#fff','#57534e',1); if(!pis){ c.fillStyle='#1c1917'; circ(c,5,-2.4,2.4); c.fill(); circ(c,13.4,-3,2.2); c.fill(); c.fillStyle='#fff'; circ(c,4.2,-3.6,.9); c.fill(); circ(c,12.6,-4.2,.8); c.fill(); } else { c.strokeStyle='#1c1917'; c.lineWidth=1.3; c.beginPath(); c.moveTo(0,-3); c.lineTo(6,-3); c.moveTo(9,-3.5); c.lineTo(15,-3.5); c.stroke(); } }
  c.fillStyle='rgba(244,114,128,.45)'; el(c,-2,4,3,1.8); c.fill(); c.strokeStyle='#44403c'; c.lineWidth=1.2; c.beginPath(); c.arc(8,4,2.6,.15*PI,.85*PI); c.stroke();
  c.restore();
  if(!achatado) for(var p=0;p<3;p++){ var f=(t*.8+p/3)%1; c.save(); c.globalAlpha=.5*(1-f); c.fillStyle='#a8a29e'; circ(c,-14-f*10,-6-f*8+p*3,1.5+f*1.5); c.fill(); c.restore(); }
  c.restore();
};
/* ---------- Traçona (mini-chefe, ~110 px, pisa-se por cima) ---------- */
A.tracona=function(c,x,y,t,hp,max){
  t=t||0; max=max||3; hp=hp==null?max:hp; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  var dano=max-hp, k=Math.sin(t*2.2), fl=Math.sin(t*2.6)*.12;
  c.save(); c.globalAlpha=.22; c.fillStyle='#000'; el(c,0,1,48,8); c.fill(); c.restore();
  c.translate(0,k*1.5); c.scale(1+k*.015,1-k*.015);
  [[-1,'#a99bc9'],[1,'#a99bc9']].forEach(function(w){ var s=w[0]; c.save(); c.translate(s*16,-62); c.rotate(s*(-.2-fl));
    asaTraca(c,s,s*34,-16,34,24,s*-.35,w[1],s+7); asaTraca(c,s,s*24,16,22,15,s*.4,esc(w[1],.1),s+9); c.restore(); });
  [[-16],[-5],[6],[17]].forEach(function(l,i){ var wk=Math.sin(t*6+i*1.6)*2; c.strokeStyle='#4c3d6b'; c.lineWidth=3.6; c.beginPath(); c.moveTo(l[0]*.8,-14); c.lineTo(l[0]+wk,-3); c.stroke(); el(c,l[0]+wk+1,-2.5,5,3); fs(c,'#6d28d9','#3b0764',1); });
  fofo(c,0,-46,44,34,12,.05); fs(c,rad(c,-6,-56,48,'#cfc6e2','#6e6290'),'#4c3d6b',1.8);
  c.save(); fofo(c,0,-46,44,34,12,.05); c.clip(); c.strokeStyle='rgba(76,61,107,.32)'; c.lineWidth=5; for(var b=0;b<4;b++){ c.beginPath(); c.arc(0,-108+b*14,80,.38*PI,.62*PI); c.stroke(); } c.fillStyle='rgba(255,255,255,.2)'; el(c,-16,-62,12,10); c.fill(); c.restore();
  /* topo achatado para pisar: tufinho */
  c.fillStyle='#e2dcef'; [-10,0,10].forEach(function(px,i){ el(c,px,-80+(i===1?-3:0),7,4); c.fill(); });
  c.strokeStyle='#4c3d6b'; c.lineWidth=2.2; [[-1],[1]].forEach(function(s){ c.beginPath(); c.moveTo(s[0]*10,-78); c.quadraticCurveTo(s[0]*16,-98,s[0]*(28+Math.sin(t*2+s[0])*3),-104); c.stroke(); circ(c,s[0]*(28+Math.sin(t*2+s[0])*3),-104,3.4); fs(c,'#c4b5fd','#4c3d6b',1); });
  var tonto=hp<=1&&hp<max;
  [[-14,-1],[14,1]].forEach(function(e){ el(c,e[0],-52,11,12.5); fs(c,'#fff','#4c3d6b',1.4);
    if(tonto){ c.strokeStyle='#2e1065'; c.lineWidth=2; c.beginPath(); for(var q=0;q<20;q++){ var qa=q*.6+t*5*e[1], qr=q*.45; c.lineTo(e[0]+Math.cos(qa)*qr,-52+Math.sin(qa)*qr); } c.stroke(); }
    else { var cr=e[1]*-3.5; olho(c,e[0]+cr,-50,5.4,6.8,'#6d28d9',(t%3.4)<.12,false); } });
  c.fillStyle='rgba(244,114,182,.5)'; el(c,-26,-38,6,3.4); c.fill(); el(c,26,-38,6,3.4); c.fill();
  c.beginPath(); c.moveTo(-12,-34); c.quadraticCurveTo(0,-20,12,-34); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.3); c.fillStyle='#fff'; c.fillRect(-5,-34,4.4,5); c.fillRect(.6,-34,4.4,5);
  c.fillStyle='#f472b6'; c.beginPath(); c.ellipse(5,-25+Math.sin(t*3)*1.2,4,5,.3,0,TAU); c.fill(); c.strokeStyle='#be185d'; c.lineWidth=1; c.stroke();
  if(dano>0){ c.save(); c.translate(-26,-66); c.rotate(-.5); rr(c,-10,-3.5,20,7,2); fs(c,'#fde68a','#b45309',1); c.strokeStyle='#b45309'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,-3.5); c.lineTo(-3,3.5); c.moveTo(3,-3.5); c.lineTo(3,3.5); c.stroke(); c.restore(); }
  if(dano>1){ c.save(); c.translate(28,-62); c.rotate(.6); rr(c,-9,-3,18,6,2); fs(c,'#fde68a','#b45309',1); c.restore(); }
  if(tonto) for(var s2=0;s2<3;s2++){ var a=t*4+s2*TAU/3; A.estrela(c,Math.cos(a)*26,-96+Math.sin(a)*6,5,'#fde047',a); }
  for(var h=0;h<max;h++){ var hx2=(h-(max-1)/2)*14; circ(c,hx2,-118,5); fs(c,h<hp?'#f472b6':'rgba(255,255,255,.25)','#4c3d6b',1.2); }
  c.restore();
};

/* traça e poeira também como inimigos comuns (tipo 'traca' / 'poeira') */
var inim0=A.inimigo;
A.inimigo=function(c,e,t){
  if(e.tipo==='traca') return A.traca(c,e.x,e.y,t,e.dir,e.voa!==false&&!e.achatado);
  if(e.tipo==='poeira') return A.poeira(c,e.x,e.y,t,e.dir,e.achatado);
  if(inim0) return inim0(c,e,t);
};
})();
