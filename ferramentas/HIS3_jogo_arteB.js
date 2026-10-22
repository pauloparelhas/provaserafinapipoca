/* ============================================================
   HIS3_jogo_arteB.js — "Detetives do Tempo" (cenários, parte 1):
   escola (Escola do Tempo), casa (Casa da Vovó → sótão) e
   fazenda (Fazenda do Seu Pedro).
   Cada cena: céu, camada longe e camada perto (parallax), chão e
   plataforma. Embrulha A.ceu/longe/perto/chao/plataforma de novo e
   cai na função anterior para as cenas que não são daqui.
   Usa os utilitários de HIS3_jogo_arte3.js (A.CN) e arte.js (A.ING).
   Carregar DEPOIS de arte…arte5. Parte 2 (rios, cidade, museu,
   linha, submundo do arquivo): HIS3_jogo_arteB2.js.
   Tudo por código: sem imagem, sem emoji. Nada pisca: oscilações
   lentas (≤1,5 Hz) e decoração sorteada por hash da posição.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, sol=N.sol, nuvemF=N.nuvemF, raios=N.raios, linha=N.linha,
    arvoreR=N.arvoreR, arbusto=N.arbusto, flor=N.flor, bolha=N.bolha, bordas=N.bordas, sombraPlat=N.sombraPlat, peixe=N.peixe;

/* ---------- utilitários desta parte (exportados em A.TB para a parte 2) ---------- */
function txt(c,s,x,y,px,cor){ c.font='900 '+px+'px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle=cor; c.fillText(s,x,y); }
/* relógio redondo: ponteiros giram devagar (minuto ~0,1 Hz) */
function relogio(c,x,y,r,t,aro,fundo,vel){
  vel=vel==null?1:vel;
  c.fillStyle=esc(aro,.3); circ(c,x+1.5,y+2,r+r*.16); c.fill();
  c.fillStyle=lin(c,0,y-r,0,y+r,cla(aro,.25),aro); circ(c,x,y,r+r*.16); c.fill();
  c.fillStyle=lin(c,0,y-r,0,y+r,'#ffffff',fundo||'#f3ead6'); circ(c,x,y,r); c.fill();
  c.strokeStyle='#3b2a20'; for(var k=0;k<12;k++){ var a=k*TAU/12; c.lineWidth=k%3?Math.max(1,r*.05):Math.max(1.5,r*.1); linha(c,x+Math.cos(a)*r*.78,y+Math.sin(a)*r*.78,x+Math.cos(a)*r*.92,y+Math.sin(a)*r*.92); }
  var am=t*.6*vel-PI/2, ah=t*.05*vel+PI*.4; c.lineCap='round';
  c.strokeStyle='#2a1c14'; c.lineWidth=Math.max(2,r*.12); linha(c,x,y,x+Math.cos(ah)*r*.48,y+Math.sin(ah)*r*.48);
  c.lineWidth=Math.max(1.4,r*.07); linha(c,x,y,x+Math.cos(am)*r*.74,y+Math.sin(am)*r*.74); c.lineCap='butt';
  c.fillStyle='#c0392b'; circ(c,x,y,Math.max(1.6,r*.08)); c.fill();
  c.fillStyle='rgba(255,255,255,.35)'; el(c,x-r*.35,y-r*.45,r*.35,r*.14); c.fill();
}
/* faixa de grama no topo de um segmento de chão (mesmo traço da vila) */
function topoGrama(c,s,a,b,k){
  k=k||{c0:'#8fd860',c1:'#4c9c37',luz:'#a8e67c',fio:['#74c64e','#5fb043']};
  c.fillStyle=lin(c,0,s.y-2,0,s.y+14,k.c0,k.c1); c.fillRect(s.x,s.y,s.w,12);
  c.fillStyle=k.c1; for(var x=grade(a,14);x<b;x+=14){ el(c,x+7,s.y+12,7.5,3.5+hash(x)*2.5); c.fill(); }
  c.fillStyle=k.luz; c.fillRect(s.x,s.y,s.w,2);
  for(x=grade(a,8);x<b;x+=8){ var hh=3+hash(x*.7)*6; c.fillStyle=hash(x)>.5?k.fio[0]:k.fio[1]; c.beginPath(); c.moveTo(x,s.y+2); c.lineTo(x+2+hash(x+1)*3,s.y-hh); c.lineTo(x+6,s.y+2); c.fill(); }
}
function morro(c,y0,amp,fr,off,cor){ c.fillStyle=cor; c.beginPath(); c.moveTo(0,H); for(var x=0;x<=W;x+=16) c.lineTo(x,y0+Math.sin((x+off)*fr)*amp+Math.sin((x+off)*fr*2.7+1)*amp*.35); c.lineTo(W,H); c.fill(); }
function morroY(x,y0,amp,fr,off){ return y0+Math.sin((x+off)*fr)*amp+Math.sin((x+off)*fr*2.7+1)*amp*.35; }
A.TB={txt:txt,relogio:relogio,topoGrama:topoGrama,morro:morro,morroY:morroY};

/* ---------- cores das cenas ---------- */
A.CENAS.escola ={ceu:['#4aa3e6','#a9dcf8','#fff2cf'], chaoTop:'#6cc048', chao:'#c4683c', chaoBase:'#7a3a1e', plat:'#d9a066', platTop:'#f0c890', part:'polen', musica:'pradaria'};
A.CENAS.casa   ={ceu:['#f6e3c4','#ecd3a8','#d9b682'], chaoTop:'#b07040', chao:'#8a5228', chaoBase:'#4e2c14', plat:'#a8743f', platTop:'#d6a46a', part:'polen', musica:'mapa'};
A.CENAS.fazenda={ceu:['#58b0ec','#bfe5fa','#fff1c8'], chaoTop:'#6cc048', chao:'#9a4a2a', chaoBase:'#5a2814', plat:'#e8c25a', platTop:'#f6dc84', part:'polen', musica:'floresta'};

/* ============================================================
   ESCOLA DO TEMPO — pátio de escola brasileira, de dia
   ============================================================ */
function ceuEscola(c,t){
  ceuG(c,[[0,'#4aa3e6'],[.55,'#a9dcf8'],[1,'#fff2cf']]);
  sol(c,800,86,30,'#fff3c4','rgba(255,244,200,.35)');
  for(var i=0;i<5;i++){ var x=((i*250+t*4)%(W+300))-150; nuvemF(c,x,62+(i%3)*40,.8+(i%2)*.45,'#ffffff','#dbe9f6',.9); }
}
/* as escolas de antigamente, em fila: a linha do tempo das escolas */
function escolaAntiga(c,x,y,t){
  var w=150, h=70, i;
  c.fillStyle=lin(c,0,y-h,0,y,'#c4654a','#9a4632'); c.fillRect(x-w/2,y-h,w,h);
  c.strokeStyle='rgba(90,30,20,.3)'; c.lineWidth=1; for(var yy=y-h+6;yy<y;yy+=6){ linha(c,x-w/2,yy,x+w/2,yy); }
  for(yy=y-h;yy<y;yy+=12) for(var bx=x-w/2+((yy/6)%2?0:6);bx<x+w/2;bx+=12) linha(c,bx,yy,bx,yy+6);
  c.fillStyle='#6b3a2a'; c.beginPath(); c.moveTo(x-w/2-8,y-h+2); c.lineTo(x-w/2+22,y-h-22); c.lineTo(x+w/2-22,y-h-22); c.lineTo(x+w/2+8,y-h+2); c.fill();
  c.fillStyle='#e9dcc4'; c.fillRect(x-w/2-4,y-h-2,w+8,5);
  for(i=0;i<5;i++){ if(i===2) continue; var jx=x-w/2+18+i*(w-36)/4; c.fillStyle='#f4ead6'; c.beginPath(); c.moveTo(jx-9,y-14); c.lineTo(jx-9,y-44); c.arc(jx,y-44,9,PI,TAU); c.lineTo(jx+9,y-14); c.fill(); c.fillStyle=lin(c,0,y-52,0,y-16,'#cfe8f6','#6f9fc0'); c.beginPath(); c.moveTo(jx-6,y-16); c.lineTo(jx-6,y-44); c.arc(jx,y-44,6,PI,TAU); c.lineTo(jx+6,y-16); c.fill(); c.strokeStyle='#f4ead6'; c.lineWidth=1.4; linha(c,jx,y-50,jx,y-16); linha(c,jx-6,y-34,jx+6,y-34); }
  c.fillStyle='#5b2e1c'; c.beginPath(); c.moveTo(x-10,y); c.lineTo(x-10,y-26); c.arc(x,y-26,10,PI,TAU); c.lineTo(x+10,y); c.fill();
  /* torre com sino que balança devagar */
  var tw=32, ty=y-h-22, th=46;
  c.fillStyle=lin(c,x-tw/2,0,x+tw/2,0,'#c96a4e','#a24c36'); c.fillRect(x-tw/2,ty-th,tw,th);
  c.fillStyle='#3a1d14'; c.beginPath(); c.moveTo(x-10,ty-8); c.lineTo(x-10,ty-th+18); c.arc(x,ty-th+18,10,PI,TAU); c.lineTo(x+10,ty-8); c.fill();
  c.save(); c.translate(x,ty-th+10); c.rotate(Math.sin(t*1.3)*.16); c.fillStyle=lin(c,-7,0,7,0,'#f6cf4a','#c8941e'); c.beginPath(); c.moveTo(-8,17); c.quadraticCurveTo(-7,3,0,1); c.quadraticCurveTo(7,3,8,17); c.closePath(); c.fill(); c.fillStyle='#8a5a14'; circ(c,0,18.5,2.2); c.fill(); c.restore();
  c.fillStyle='#5a2e20'; c.beginPath(); c.moveTo(x-tw/2-5,ty-th+1); c.lineTo(x,ty-th-24); c.lineTo(x+tw/2+5,ty-th+1); c.fill();
  c.strokeStyle='#4a3a30'; c.lineWidth=1.5; linha(c,x,ty-th-24,x,ty-th-34); c.fillStyle='#4a3a30'; c.beginPath(); c.moveTo(x,ty-th-34); c.lineTo(x+9,ty-th-31); c.lineTo(x,ty-th-28); c.fill();
}
function escolaMadeira(c,x,y){
  var w=130, h=54;
  c.fillStyle=lin(c,0,y-h,0,y,'#f4efe2','#d9cdb4'); c.fillRect(x-w/2,y-h,w,h);
  c.strokeStyle='rgba(120,100,70,.35)'; c.lineWidth=1; for(var yy=y-h+5;yy<y;yy+=5) linha(c,x-w/2,yy,x+w/2,yy);
  c.fillStyle='#3d6f9e'; c.beginPath(); c.moveTo(x-w/2-10,y-h+2); c.lineTo(x,y-h-34); c.lineTo(x+w/2+10,y-h+2); c.fill(); c.fillStyle='rgba(255,255,255,.2)'; c.beginPath(); c.moveTo(x-w/2-10,y-h+2); c.lineTo(x,y-h-34); c.lineTo(x-6,y-h+2); c.fill();
  c.fillStyle='#8a5a34'; c.fillRect(x+30,y-h-30,10,18);
  [[-40],[40]].forEach(function(d){ var jx=x+d[0]; c.fillStyle='#3d6f9e'; c.fillRect(jx-13,y-40,26,24); c.fillStyle=lin(c,0,y-38,0,y-18,'#dff1fb','#86b6d6'); c.fillRect(jx-10,y-38,20,20); c.strokeStyle='#3d6f9e'; c.lineWidth=1.5; linha(c,jx,y-38,jx,y-18); linha(c,jx-10,y-28,jx+10,y-28); });
  c.fillStyle='#e9e2cf'; c.fillRect(x-24,y-h-6,48,8); c.fillStyle='#7a4a2a'; c.fillRect(x-11,y-34,22,34); c.fillStyle='#f6cf4a'; circ(c,x+6,y-17,1.6); c.fill();
  c.fillStyle='#c9b48e'; c.fillRect(x-30,y-4,60,4);
}
function escolaModerna(c,x,y){
  var w=170, h=88, i, j, cores=['#f59e0b','#22c55e','#3b82f6','#ef4444'];
  c.fillStyle=lin(c,0,y-h,0,y,'#f8fafc','#d6dde8'); c.fillRect(x-w/2,y-h,w,h);
  c.fillStyle='#94a3b8'; c.fillRect(x-w/2-4,y-h-6,w+8,7);
  for(j=0;j<2;j++) for(i=0;i<6;i++){ var jx=x-w/2+10+i*26, jy=y-h+10+j*36; c.fillStyle=cores[(i+j*2)%4]; c.fillRect(jx,jy,8,26); c.fillStyle=lin(c,0,jy,0,jy+26,'#d8f0ff','#7fb3d9'); c.fillRect(jx+9,jy,13,26); c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(jx+10,jy+2,3,22); }
  c.fillStyle='#475569'; c.fillRect(x-14,y-26,28,26); c.fillStyle=lin(c,0,y-24,0,y,'#bfe3fa','#5f93bd'); c.fillRect(x-12,y-24,11,24); c.fillRect(x+1,y-24,11,24);
  c.fillStyle='#16a34a'; c.fillRect(x-w/2+8,y-h-20,4,14); c.fillRect(x+w/2-12,y-h-20,4,14); c.fillStyle='#fbbf24'; rr(c,x-w/2+8,y-h-22,w-16,6,3); c.fill();
}
function longeEscola(c,cam,t){
  morro(c,322,16,.006,cam*.4,'#b6d9d0');
  c.fillStyle='#a3cf98'; c.fillRect(0,382,W,H-382);
  rep(cam,1500,function(ox){ if(ox>W+40||ox<-1540) return;
    /* a linha do tempo das escolas: fita com marcos e setas */
    c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=3; c.setLineDash([10,7]); linha(c,ox,396,ox+1500,396); c.setLineDash([]);
    [[200,'#c4654a'],[650,'#3d6f9e'],[1100,'#22c55e']].forEach(function(m){ c.fillStyle='#fff'; circ(c,ox+m[0],396,8); c.fill(); c.fillStyle=m[1]; circ(c,ox+m[0],396,5.5); c.fill(); });
    [425,875,1325].forEach(function(sx){ c.fillStyle='rgba(255,255,255,.9)'; c.beginPath(); c.moveTo(ox+sx-6,390); c.lineTo(ox+sx+6,396); c.lineTo(ox+sx-6,402); c.fill(); });
    escolaAntiga(c,ox+200,382,t); escolaMadeira(c,ox+650,382); escolaModerna(c,ox+1100,382);
    [60,330,450,800,960,1260,1400].forEach(function(dx,j){ var tx=ox+dx; if(tx<-40||tx>W+40) return; arvoreR(c,tx,384,40+(j%3)*10,'#6aa766','#84bf76','#6b5a44'); });
  });
  bruma(c,280,452,'rgba(255,242,207,.45)');
  morro(c,428,8,.01,cam,'#8cc47e');
}
function janelaEsc(c,x,y,w,h,seed){
  c.fillStyle='#2f7fc1'; c.fillRect(x-3,y-3,w+6,h+6);
  c.fillStyle=lin(c,0,y,0,y+h,'#e3f4ff','#86bde0'); c.fillRect(x,y,w,h);
  c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.moveTo(x,y+h*.45); c.lineTo(x+w*.4,y); c.lineTo(x+w*.6,y); c.lineTo(x,y+h*.75); c.fill();
  c.strokeStyle='#2f7fc1'; c.lineWidth=2.5; linha(c,x+w/2,y,x+w/2,y+h); linha(c,x,y+h*.45,x+w,y+h*.45);
  if(hash(seed)>.55){ var dx=x+4+hash(seed+1)*(w/2-14), dy=y+h*.5+3; c.fillStyle='#fffdf5'; c.fillRect(dx,dy,12,10); c.fillStyle=['#ef4444','#f59e0b','#22c55e','#a855f7'][Math.floor(hash(seed+2)*4)]; circ(c,dx+6,dy+4,2.5); c.fill(); c.fillStyle='#22c55e'; c.fillRect(dx+1,dy+8,10,2); }
  c.fillStyle='#e7b86a'; c.fillRect(x-5,y+h+3,w+10,4);
}
function escolaPredio(c,x,y,t){
  var w=420, h=168, ex=x+w/2, r, i;
  c.fillStyle='rgba(60,40,20,.18)'; c.fillRect(x+6,y-h,w,h);
  c.fillStyle=lin(c,0,y-h,0,y,'#fde9b0','#f0cb80'); c.fillRect(x,y-h,w,h);
  c.fillStyle='#2f7fc1'; c.fillRect(x,y-36,w,36); c.fillStyle='#1f5f97'; c.fillRect(x,y-38,w,4);
  c.fillStyle='rgba(255,255,255,.12)'; for(i=0;i<w;i+=24) c.fillRect(x+i,y-34,2,34);
  c.fillStyle='#e7b86a'; c.fillRect(x-6,y-h-10,w+12,12); c.fillStyle='#fff5d8'; c.fillRect(x-6,y-h-10,w+12,3);
  for(r=0;r<2;r++) for(i=0;i<6;i++){ if(i===2||i===3) continue; janelaEsc(c,x+22+i*66,y-h+22+r*62,40,40,i+r*7); }
  /* bloco da entrada: frontão, relógio e placa */
  c.fillStyle=lin(c,0,y-h-40,0,y,'#fff6dc','#f3d89a'); c.fillRect(ex-62,y-h-30,124,h+30);
  c.fillStyle='#e7b86a'; c.beginPath(); c.moveTo(ex-72,y-h-28); c.lineTo(ex,y-h-70); c.lineTo(ex+72,y-h-28); c.fill(); c.fillStyle='#fff5d8'; c.beginPath(); c.moveTo(ex-58,y-h-32); c.lineTo(ex,y-h-62); c.lineTo(ex+58,y-h-32); c.fill();
  relogio(c,ex,y-h-40,15,t,'#c98a2e');
  c.fillStyle='#1f5f97'; rr(c,ex-56,y-h-14,112,26,6); c.fill(); c.strokeStyle='#fff5d8'; c.lineWidth=2; rr(c,ex-53,y-h-11,106,20,4); c.stroke();
  txt(c,'ESCOLA',ex,y-h-1,14,'#fff5d8');
  janelaEsc(c,ex-44,y-h+40,30,34,3.3); janelaEsc(c,ex+14,y-h+40,30,34,4.4);
  c.fillStyle='#1f5f97'; c.fillRect(ex-34,y-78,68,78); c.fillStyle=lin(c,0,y-74,0,y,'#3fa05a','#26773e'); c.fillRect(ex-30,y-74,29,74); c.fillRect(ex+1,y-74,29,74);
  c.fillStyle=lin(c,0,y-68,0,y-40,'#d8f0ff','#8cc0e0'); c.fillRect(ex-26,y-68,21,26); c.fillRect(ex+5,y-68,21,26);
  c.fillStyle='#f6cf4a'; c.fillRect(ex-6,y-38,3,12); c.fillRect(ex+3,y-38,3,12);
  c.fillStyle='#d8cbb0'; c.fillRect(ex-46,y-8,92,8); c.fillStyle='#e9dfca'; c.fillRect(ex-40,y-14,80,6);
}
function quadra(c,x,y,t){
  var w=280, h=118;
  c.fillStyle='rgba(30,60,40,.25)'; c.fillRect(x,y-6,w,6);
  /* tabela de basquete atrás do alambrado */
  var bx=x+w-40; c.fillStyle='#3b4a5c'; c.fillRect(bx-3,y-150,6,150); c.fillRect(bx-26,y-140,26,5);
  c.fillStyle='#f8fafc'; rr(c,bx-62,y-160,48,34,3); c.fill(); c.strokeStyle='#ef4444'; c.lineWidth=2.5; c.strokeRect(bx-46,y-146,16,12);
  c.strokeStyle='#f97316'; c.lineWidth=3; el(c,bx-38,y-124,11,3); c.stroke();
  c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=1; for(var k=-2;k<=2;k++) linha(c,bx-38+k*5,y-123,bx-38+k*3.5,y-108); linha(c,bx-47,y-116,bx-29,y-116);
  /* alambrado: tela em losango presa nos postes */
  c.save(); c.beginPath(); c.rect(x,y-h,w,h); c.clip();
  c.strokeStyle='rgba(120,135,150,.55)'; c.lineWidth=1; for(var d=-h;d<w;d+=11){ linha(c,x+d,y,x+d+h,y-h); linha(c,x+d+h,y,x+d,y-h); }
  c.restore();
  c.fillStyle='#64748b'; for(var px=x;px<=x+w;px+=70){ c.fillRect(px-2.5,y-h-4,5,h+4); c.fillStyle='#94a3b8'; c.fillRect(px-1,y-h-4,1.5,h+4); c.fillStyle='#64748b'; }
  c.fillRect(x,y-h-4,w,4); c.fillStyle='#22c55e'; c.fillRect(x,y-8,w,3);
}
function banco(c,x,y){
  c.fillStyle='#4b5563'; c.fillRect(x-30,y-22,4,22); c.fillRect(x+26,y-22,4,22);
  c.fillStyle=lin(c,0,y-26,0,y-18,'#c98a4f','#8a5428'); c.fillRect(x-36,y-26,72,7); c.fillRect(x-36,y-44,72,6); c.fillRect(x-36,y-36,72,6);
  c.fillStyle='#4b5563'; c.fillRect(x-30,y-46,4,22); c.fillRect(x+26,y-46,4,22);
}
function mastro(c,x,y,t){
  c.fillStyle=lin(c,x-3,0,x+3,0,'#e2e8f0','#94a3b8'); c.fillRect(x-2.5,y-190,5,190); c.fillStyle='#fbbf24'; circ(c,x,y-192,4); c.fill();
  var fy=y-184, ond=function(u){ return Math.sin(t*1.4-u*4)*3*u; };
  c.fillStyle='#16a34a'; c.beginPath(); c.moveTo(x+3,fy); for(var u=0;u<=1;u+=.1) c.lineTo(x+3+u*52,fy+ond(u)); for(u=1;u>=0;u-=.1) c.lineTo(x+3+u*52,fy+36+ond(u)); c.closePath(); c.fill();
  var cx=x+29, cy=fy+18+ond(.5); c.fillStyle='#facc15'; c.beginPath(); c.moveTo(cx-21,cy); c.lineTo(cx,cy-13); c.lineTo(cx+21,cy); c.lineTo(cx,cy+13); c.closePath(); c.fill();
  c.fillStyle='#1d4ed8'; circ(c,cx,cy,7.5); c.fill(); c.strokeStyle='#fff'; c.lineWidth=1.3; c.beginPath(); c.arc(cx+2,cy+9,10,-2.3,-1.0); c.stroke();
}
function pertoEscola(c,cam,t){
  rep(cam,1400,function(ox){ if(ox>W+60||ox<-1460) return;
    arvoreR(c,ox+500,452,170,'#e2b11c','#ffd84a','#6b4428');
    escolaPredio(c,ox+40,452,t); mastro(c,ox+480,452,t);
    quadra(c,ox+600,452,t);
    arvoreR(c,ox+980,452,190,'#4f8f4a','#6fb35e'); banco(c,ox+1080,452); arvoreR(c,ox+1250,452,160,'#e2b11c','#ffd84a','#6b4428');
    arbusto(c,ox+30,452,44,'#3f8a3c','#5fae4f',['#f472b6','#fff'],11); arbusto(c,ox+575,452,40,'#3f8a3c','#5fae4f',['#fde047','#fff'],12); arbusto(c,ox+1150,452,50,'#3f8a3c','#5fae4f',['#f87171','#fde047'],13);
  });
}
function chaoEscola(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x, r; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#b3683f','#6e3519'); c.fillRect(s.x,s.y,s.w,s.h);
  /* lajotas de barro em fiadas desencontradas */
  for(r=0;r*16+14<s.h-4;r++){ var yy=s.y+14+r*16, off=(r%2)*16;
    for(x=grade(a-off,32)+off;x<b;x+=32){ var hv=hash(x*.13+r*7.1); c.fillStyle=['#d07a48','#c46a3c','#d9875a','#b9613a'][Math.floor(hv*4)]; rr(c,x+1.5,yy+1.5,29,13,2.5); c.fill(); c.fillStyle='rgba(255,230,200,.22)'; c.fillRect(x+3,yy+2.5,25,2); if(hv>.86){ c.strokeStyle='rgba(90,40,20,.35)'; c.lineWidth=1; linha(c,x+8,yy+5,x+16,yy+11); } } }
  topoGrama(c,s,a,b);
  for(x=grade(a,46);x<b;x+=46){ if(hash(x*1.31)>.6){ var fx=x+hash(x+5)*30; c.strokeStyle='#4c9c37'; c.lineWidth=1.2; linha(c,fx,s.y+1,fx,s.y-7); flor(c,fx,s.y-8,2.2,['#fff','#f9a8d4','#fde047'][Math.floor(hash(x)*3)]); } }
  bordas(c,s,'rgba(60,20,10,.35)'); c.fillStyle='rgba(0,0,0,.16)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
var LIVROS=['#c0392b','#2c6fb5','#2f8f57','#e0a020','#7b4fa8','#d35400','#16808a','#b03a6e'];
function platEscola(c,p){
  sombraPlat(c,p,4); var x, i;
  if(hash(p.x*.13+p.y*.07)>.5){ /* carteira escolar: tampo de madeira, gradil verde e porta-livros */
    c.fillStyle='#2f7d4f'; c.fillRect(p.x+8,p.y+p.h-2,4,12); c.fillRect(p.x+p.w-12,p.y+p.h-2,4,12); c.fillStyle='#1f2937'; rr(c,p.x+5,p.y+p.h+9,10,4,2); c.fill(); rr(c,p.x+p.w-15,p.y+p.h+9,10,4,2); c.fill();
    c.fillStyle=lin(c,0,p.y+7,0,p.y+p.h,'#3f9a62','#256b42'); c.fillRect(p.x+5,p.y+7,p.w-10,p.h-7);
    c.fillStyle='#1d4f33'; c.fillRect(p.x+9,p.y+9,p.w-18,p.h-11);
    for(x=p.x+11;x<p.x+p.w-14;){ var bw=5+hash(x)*4; c.fillStyle=LIVROS[Math.floor(hash(x*3.1)*8)]; c.fillRect(x,p.y+10+hash(x+1)*2,bw,p.h-12); x+=bw+1; }
    c.fillStyle=lin(c,0,p.y,0,p.y+8,'#f0c890','#c08850'); rr(c,p.x,p.y,p.w,8,3); c.fill(); c.fillStyle='rgba(255,255,255,.45)'; c.fillRect(p.x+3,p.y+1,p.w-6,1.5);
    c.strokeStyle='rgba(120,70,30,.3)'; c.lineWidth=1; linha(c,p.x+10,p.y+4,p.x+p.w*.4,p.y+4); linha(c,p.x+p.w*.55,p.y+5,p.x+p.w-12,p.y+5);
    if(p.w>=90){ var lx=p.x+p.w*.25+hash(p.x)*p.w*.3; c.fillStyle='#fbbf24'; c.fillRect(lx,p.y-3,24,3); c.fillStyle='#f9a8d4'; c.fillRect(lx-3,p.y-3,3,3); c.fillStyle='#3b2a20'; c.beginPath(); c.moveTo(lx+24,p.y-3); c.lineTo(lx+29,p.y-1.5); c.lineTo(lx+24,p.y); c.fill();
      var ax=p.x+p.w*.7+hash(p.y)*p.w*.15; c.fillStyle='#dc2626'; circ(c,ax-3,p.y-6,5); c.fill(); circ(c,ax+3,p.y-6,5); c.fill(); c.fillStyle='#4a2c16'; c.fillRect(ax-.5,p.y-14,1.5,4); c.fillStyle='#22c55e'; el(c,ax+3,p.y-13,3.5,1.6); c.fill(); }
  } else { /* estante baixa de livros */
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#a8743f','#6e4422'); rr(c,p.x,p.y,p.w,p.h,3); c.fill();
    c.fillStyle='#3b2412'; c.fillRect(p.x+4,p.y+4,p.w-8,p.h-7);
    for(x=p.x+5;x<p.x+p.w-8;){ var bw2=5+hash(x*.7)*5, bh=p.h-9-hash(x+2)*4; if(hash(x*1.9)>.92){ x+=8; continue; } c.fillStyle=LIVROS[Math.floor(hash(x*2.3)*8)]; c.fillRect(x,p.y+p.h-3-bh,bw2,bh); c.fillStyle='rgba(255,230,160,.6)'; c.fillRect(x+1,p.y+p.h-3-bh+3,bw2-2,1.2); x+=bw2+1; }
    c.fillStyle=lin(c,0,p.y-3,0,p.y+4,'#d6a46a','#a8743f'); rr(c,p.x-3,p.y-3,p.w+6,6,2); c.fill(); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(p.x,p.y-2,p.w,1.2);
    if(p.w>=110){ var gx=p.x+p.w*.7; c.fillStyle='#2563eb'; circ(c,gx,p.y-14,9); c.fill(); c.fillStyle='#22c55e'; el(c,gx-3,p.y-16,4,3); c.fill(); el(c,gx+4,p.y-11,3,2.5); c.fill(); c.strokeStyle='#c8941e'; c.lineWidth=1.5; c.beginPath(); c.arc(gx,p.y-14,11,PI*.6,PI*1.9); c.stroke(); c.fillStyle='#c8941e'; c.fillRect(gx-1,p.y-4,2,2); rr(c,gx-6,p.y-3,12,3,1); c.fill(); }
  }
}

/* ============================================================
   CASA DA VOVÓ — sala aconchegante que sobe até o sótão
   ============================================================ */
function ceuCasa(c,t){
  ceuG(c,[[0,'#ead2a6'],[.5,'#f3e0bd'],[1,'#e2c290']]);
}
function retrato(c,x,y,w,h,oval,moldura,k){
  c.strokeStyle='rgba(70,40,20,.7)'; c.lineWidth=1.2; linha(c,x,y-h/2-16,x-w*.3,y-h/2); linha(c,x,y-h/2-16,x+w*.3,y-h/2); c.fillStyle='#8a6a3a'; circ(c,x,y-h/2-16,2.2); c.fill();
  c.fillStyle='rgba(60,30,10,.25)'; if(oval){ el(c,x+3,y+4,w/2+6,h/2+6); } else { c.beginPath(); c.rect(x-w/2-3,y-h/2+1,w+12,h+10); } c.fill();
  c.fillStyle=lin(c,0,y-h/2,0,y+h/2,cla(moldura,.3),esc(moldura,.2)); if(oval){ el(c,x,y,w/2+6,h/2+6); } else { c.beginPath(); c.rect(x-w/2-6,y-h/2-6,w+12,h+12); } c.fill();
  c.save(); c.beginPath(); if(oval) c.ellipse(x,y,w/2,h/2,0,0,TAU); else c.rect(x-w/2,y-h/2,w,h); c.clip();
  c.fillStyle=lin(c,0,y-h/2,0,y+h/2,'#efdcb6','#c9a874'); c.fillRect(x-w/2,y-h/2,w,h);
  var pessoas=k%3===0?2:1, i;
  for(i=0;i<pessoas;i++){ var px=x+(pessoas===2?(i?w*.2:-w*.2):0), cab=k%2?'#4a3020':'#8a8070';
    c.fillStyle='#7a5a3a'; el(c,px,y+h*.42,w*.24,h*.24); c.fill();
    c.fillStyle='#d9b48a'; circ(c,px,y-h*.04,w*.13); c.fill();
    c.fillStyle=cab; c.beginPath(); c.arc(px,y-h*.07,w*.14,PI*1.05,TAU*.99); c.fill(); if(k%4===1){ circ(c,px,y-h*.24,w*.07); c.fill(); }
    c.fillStyle='#5a3a24'; circ(c,px-w*.045,y-h*.03,1.1); c.fill(); circ(c,px+w*.045,y-h*.03,1.1); c.fill();
    c.strokeStyle='#8a4a3a'; c.lineWidth=1; c.beginPath(); c.arc(px,y+h*.02,w*.04,.2*PI,.8*PI); c.stroke(); }
  c.fillStyle='rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(x-w/2,y-h/2); c.lineTo(x-w*.1,y-h/2); c.lineTo(x-w/2,y+h*.1); c.fill();
  c.restore();
}
function cuco(c,x,y,t){
  c.fillStyle='rgba(60,30,10,.25)'; c.fillRect(x-24,y-30,52,64);
  var pa=Math.sin(t*2.2)*.32; c.save(); c.translate(x,y+30); c.rotate(pa); c.strokeStyle='#a07a3a'; c.lineWidth=2; linha(c,0,0,0,58); c.fillStyle=lin(c,-8,0,8,0,'#f6cf4a','#b88a1e'); circ(c,0,62,8); c.fill(); c.restore();
  [[-10,72],[10,92]].forEach(function(p){ c.strokeStyle='#8a6a3a'; c.lineWidth=1; c.setLineDash([2,2]); linha(c,x+p[0],y+30,x+p[0],y+p[1]); c.setLineDash([]); c.fillStyle='#6b3a1c'; rr(c,x+p[0]-4,y+p[1],8,18,4); c.fill(); c.strokeStyle='#3a1d0e'; c.lineWidth=1; for(var k=0;k<3;k++) linha(c,x+p[0]-4,y+p[1]+4+k*5,x+p[0]+4,y+p[1]+4+k*5); });
  c.fillStyle=lin(c,0,y-30,0,y+32,'#8a5228','#5e3219'); c.fillRect(x-24,y-24,48,56);
  c.fillStyle='#3d6b3a'; c.beginPath(); c.moveTo(x-34,y-20); c.lineTo(x,y-48); c.lineTo(x+34,y-20); c.lineTo(x+28,y-16); c.lineTo(x,y-38); c.lineTo(x-28,y-16); c.fill();
  c.fillStyle='#4f8a4a'; for(var i=0;i<5;i++){ el(c,x-26+i*13,y-22-((i===2)?20:(i%4?10:2)),6,3.5); c.fill(); }
  c.fillStyle='#2a160a'; rr(c,x-7,y-32,14,12,6); c.fill(); c.fillStyle='#f6cf4a'; circ(c,x,y-26,2.2); c.fill();
  relogio(c,x,y+2,15,t,'#b88a3a','#fff7e6');
}
function janelaCasa(c,x,y,t){
  var w=150, h=170;
  c.fillStyle='#7a4a22'; c.fillRect(x-w/2-10,y-10,w+20,h+20);
  c.save(); c.beginPath(); c.rect(x-w/2,y,w,h); c.clip();
  c.fillStyle=lin(c,0,y,0,y+h,'#ffd38a','#ffeccc'); c.fillRect(x-w/2,y,w,h);
  brilho(c,x+30,y+60,90,'rgba(255,240,190,.9)',.8); c.fillStyle='#fff6d8'; circ(c,x+30,y+60,18); c.fill();
  c.fillStyle='#9cc58a'; c.beginPath(); c.moveTo(x-w/2,y+h); for(var hx=x-w/2;hx<=x+w/2;hx+=10) c.lineTo(hx,y+h-40+Math.sin(hx*.05)*8); c.lineTo(x+w/2,y+h); c.fill();
  arvoreR(c,x-40,y+h-30,60,'#6aa766','#84bf76');
  c.restore();
  c.strokeStyle='#7a4a22'; c.lineWidth=6; linha(c,x,y,x,y+h); linha(c,x-w/2,y+h*.45,x+w/2,y+h*.45);
  c.fillStyle='#8a5530'; c.fillRect(x-w/2-16,y+h+8,w+32,10);
  c.fillStyle='#b4532a'; c.beginPath(); c.moveTo(x+30,y+h+8); c.lineTo(x+52,y+h+8); c.lineTo(x+48,y+h-10); c.lineTo(x+34,y+h-10); c.fill();
  [[-1,'#e05a78'],[1,'#f472b6'],[0,'#fde047']].forEach(function(f,i){ c.strokeStyle='#3f8a3c'; c.lineWidth=1.5; linha(c,x+41,y+h-10,x+41+f[0]*8,y+h-26-i*3); flor(c,x+41+f[0]*8,y+h-27-i*3,3.2,f[1]); });
  [[-1],[1]].forEach(function(d){ d=d[0]; var cx=x+d*(w/2+8); c.fillStyle=lin(c,cx-24,0,cx+24,0,'#c0485a','#8e2b40');
    c.beginPath(); c.moveTo(cx-d*10,y-16); c.lineTo(cx+d*30,y-16); c.quadraticCurveTo(cx+d*18,y+120,cx+d*34,y+h+20); c.lineTo(cx+d*4,y+h+20); c.quadraticCurveTo(cx-d*22,y+110,cx-d*10,y-16); c.fill();
    c.fillStyle='rgba(255,255,255,.25)'; for(var k=0;k<4;k++){ circ(c,cx+d*(6+k*5),y+20+k*34,2); c.fill(); }
    c.fillStyle='#e0b04a'; rr(c,cx-6+d*6,y+96,14,8,4); c.fill(); });
  c.fillStyle='#8a4a22'; c.fillRect(x-w/2-40,y-22,w+80,8);
}
function longeCasa(c,cam,t){
  /* papel de parede florido (listras + florzinhas em grade) */
  rep(cam,56,function(ox){ c.fillStyle='rgba(214,170,120,.22)'; c.fillRect(ox,0,22,H); c.strokeStyle='rgba(190,140,90,.25)'; c.lineWidth=1; linha(c,ox+28,0,ox+28,H); });
  rep(cam,112,function(ox){ for(var r=0;r<7;r++){ var fx=ox+(r%2?56:0)+39, fy=100+r*46; c.strokeStyle='rgba(110,150,90,.6)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(fx,fy+3); c.quadraticCurveTo(fx+5,fy+10,fx+2,fy+15); c.stroke(); c.fillStyle='rgba(110,160,90,.6)'; el(c,fx+5,fy+9,3,1.5); c.fill(); flor(c,fx,fy,3,r%3?'#e88aa0':'#8ab4e0'); } });
  /* sótão: tesouras do telhado */
  c.fillStyle=lin(c,0,0,0,40,'#5e3219','#7a4422'); c.fillRect(0,0,W,40); c.fillStyle='#3a1d0e'; c.fillRect(0,38,W,6);
  rep(cam,320,function(ox){ c.fillStyle=lin(c,0,0,0,96,'#6e3b1c','#4e2810'); c.save(); c.translate(ox+160,0); c.beginPath(); c.moveTo(-12,0); c.lineTo(12,0); c.lineTo(12,44); c.lineTo(-12,44); c.fill();
    c.beginPath(); c.moveTo(-10,40); c.lineTo(-80,96); c.lineTo(-92,90); c.lineTo(-22,36); c.fill(); c.beginPath(); c.moveTo(10,40); c.lineTo(80,96); c.lineTo(92,90); c.lineTo(22,36); c.fill();
    c.fillStyle='#2a1508'; circ(c,0,30,3); c.fill(); circ(c,-46,66,2.5); c.fill(); circ(c,46,66,2.5); c.fill(); c.restore(); });
  rep(cam,1300,function(ox){ if(ox>W+120||ox<-1420) return;
    janelaCasa(c,ox+640,150,t);
    retrato(c,ox+150,190,56,70,true,'#c99a3a',0); retrato(c,ox+250,170,48,60,false,'#8a5228',1); retrato(c,ox+240,268,40,48,true,'#b88a3a',2);
    cuco(c,ox+420,170,t);
    retrato(c,ox+900,200,62,76,false,'#c99a3a',3); retrato(c,ox+1010,180,44,56,true,'#8a5228',5); retrato(c,ox+1110,230,52,64,false,'#b06a3a',6);
  });
  /* lambri de madeira */
  c.fillStyle=lin(c,0,350,0,452,'#8a5228','#5e3219'); c.fillRect(0,350,W,102);
  rep(cam,80,function(ox){ c.fillStyle='rgba(255,220,160,.1)'; rr(c,ox+8,364,64,76,4); c.fill(); c.strokeStyle='rgba(40,20,8,.35)'; c.lineWidth=1.5; rr(c,ox+8,364,64,76,4); c.stroke(); });
  c.fillStyle='#a0642f'; c.fillRect(0,344,W,10); c.fillStyle='rgba(255,230,180,.35)'; c.fillRect(0,344,W,2);
  /* luz quente da janela atravessando a sala */
  rep(cam,1300,function(ox){ var x0=ox+580; if(x0<-300||x0>W+100) return; c.save(); var g=c.createLinearGradient(x0,150,x0+240,452); g.addColorStop(0,'rgba(255,226,150,.32)'); g.addColorStop(1,'rgba(255,226,150,0)'); c.fillStyle=g; c.beginPath(); c.moveTo(x0,160); c.lineTo(x0+130,160); c.lineTo(x0+330,452); c.lineTo(x0+120,452); c.closePath(); c.fill(); c.restore(); });
  brilho(c,W/2,300,520,'rgba(255,200,120,.12)',1);
}
function bau(c,x,y,w,cor,aberto){
  c.fillStyle='rgba(0,0,0,.22)'; el(c,x+w/2,y,w*.55,5); c.fill();
  c.fillStyle=lin(c,0,y-46,0,y,cor,esc(cor,.3)); rr(c,x,y-44,w,44,4); c.fill();
  c.fillStyle=lin(c,0,y-72,0,y-44,cla(cor,.15),cor); c.beginPath(); c.moveTo(x,y-44); c.lineTo(x,y-56); c.quadraticCurveTo(x+w/2,y-80,x+w,y-56); c.lineTo(x+w,y-44); c.closePath(); c.fill();
  c.fillStyle='#c99a3a'; [.14,.86].forEach(function(u){ var bx=x+w*u-4; c.fillRect(bx,y-44,8,44); c.beginPath(); c.moveTo(bx,y-44); c.lineTo(bx,y-58+Math.abs(u-.5)*6); c.lineTo(bx+8,y-59+Math.abs(u-.5)*6); c.lineTo(bx+8,y-44); c.fill(); });
  c.fillStyle='#7a5a1a'; c.fillRect(x,y-46,w,4); c.fillStyle='#e6c25a'; rr(c,x+w/2-7,y-50,14,16,3); c.fill(); c.fillStyle='#3a2a10'; circ(c,x+w/2,y-44,2); c.fill(); c.fillRect(x+w/2-1,y-44,2,5);
  c.fillStyle='#ead9a8'; for(var k=0;k<6;k++){ circ(c,x+w*.14,y-38+k*6.5,1.2); c.fill(); circ(c,x+w*.86,y-38+k*6.5,1.2); c.fill(); }
}
function vitrola(c,x,y){
  c.fillStyle=lin(c,0,y-60,0,y,'#7a4422','#4a2614'); c.fillRect(x-30,y-58,60,10); c.fillRect(x-24,y-48,6,48); c.fillRect(x+18,y-48,6,48);
  c.fillStyle=lin(c,0,y-88,0,y-58,'#9a5a2c','#6b3a1c'); rr(c,x-28,y-88,56,30,3); c.fill(); c.fillStyle='#3a1d0e'; c.fillRect(x-24,y-80,48,3);
  c.fillStyle='#1a1a1a'; el(c,x,y-90,22,4); c.fill(); c.fillStyle='#c0392b'; el(c,x,y-90,6,1.5); c.fill();
  c.strokeStyle='#c99a3a'; c.lineWidth=3; c.beginPath(); c.moveTo(x+14,y-90); c.quadraticCurveTo(x+18,y-120,x+8,y-132); c.stroke();
  c.save(); c.translate(x+8,y-132); c.rotate(-.5); c.fillStyle=lin(c,-30,0,30,0,'#f6cf4a','#a8741e'); c.beginPath(); c.moveTo(-4,0); c.lineTo(-34,-40); c.quadraticCurveTo(0,-56,34,-40); c.lineTo(4,0); c.closePath(); c.fill();
  c.strokeStyle='rgba(120,70,10,.5)'; c.lineWidth=1; for(var k=-2;k<=2;k++) linha(c,k*1.5,-2,k*14,-46); c.fillStyle='#5a3a10'; el(c,0,-46,34,8); c.fill(); c.fillStyle='#2a1a08'; el(c,0,-45,26,5); c.fill(); c.restore();
}
function cavalinho(c,x,y,t){
  var a=Math.sin(t*1.4)*.09; c.save(); c.translate(x,y); c.rotate(a);
  c.strokeStyle='#8a5228'; c.lineWidth=6; c.beginPath(); c.arc(0,-260,262,PI*.43,PI*.57); c.stroke();
  c.fillStyle='#b4532a'; c.fillRect(-28,-30,5,26); c.fillRect(22,-30,5,26);
  c.fillStyle=lin(c,0,-60,0,-24,'#f2e4c8','#d4bf96'); el(c,0,-42,34,16); c.fill();
  c.fillStyle='#c0392b'; el(c,-2,-56,14,6); c.fill();
  c.fillStyle='#f2e4c8'; c.beginPath(); c.moveTo(22,-50); c.quadraticCurveTo(30,-78,40,-86); c.lineTo(54,-76); c.quadraticCurveTo(44,-66,34,-44); c.closePath(); c.fill(); el(c,48,-80,12,8); c.fill();
  c.fillStyle='#8a5228'; c.beginPath(); c.moveTo(24,-56); c.quadraticCurveTo(26,-84,40,-92); c.lineTo(36,-78); c.quadraticCurveTo(32,-66,30,-52); c.fill();
  c.fillStyle='#2a1a10'; circ(c,48,-82,1.8); c.fill(); c.fillStyle='#f2e4c8'; c.beginPath(); c.moveTo(40,-88); c.lineTo(43,-98); c.lineTo(46,-88); c.fill();
  c.strokeStyle='#8a5228'; c.lineWidth=3; c.beginPath(); c.moveTo(-32,-46); c.quadraticCurveTo(-46,-44,-44,-28); c.stroke();
  c.fillStyle='#e8b830'; circ(c,40,-72,2); c.fill(); c.restore();
}
function caixas(c,x,y){
  [[0,0,70,46,'FOTOS'],[64,0,58,40,''],[18,-46,62,40,'CARTAS']].forEach(function(b){ var bx=x+b[0], by=y+b[1];
    c.fillStyle=lin(c,0,by-b[3],0,by,'#d9a868','#b07c40'); c.fillRect(bx,by-b[3],b[2],b[3]); c.fillStyle='rgba(120,70,20,.35)'; c.fillRect(bx,by-b[3],b[2],5); c.fillRect(bx+b[2]/2-1,by-b[3],2,b[3]*.4);
    c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(bx+2,by-b[3]+6,2,b[3]-8);
    if(b[4]){ c.fillStyle='#fff6e0'; c.fillRect(bx+b[2]/2-22,by-b[3]*.45-7,44,14); txt(c,b[4],bx+b[2]/2,by-b[3]*.45,10,'#7a3a1a'); } });
}
function teia(c,x,y,r,t){
  c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=1;
  for(var k=0;k<=6;k++){ var a=k*PI/12; linha(c,x,y,x+Math.cos(a)*r,y+Math.sin(a)*r); }
  for(var j=1;j<5;j++){ c.beginPath(); for(k=0;k<=6;k++){ var a2=k*PI/12, rj=r*j/5; if(k===0) c.moveTo(x+rj,y); else c.quadraticCurveTo(x+Math.cos(a2-PI/24)*rj*.88,y+Math.sin(a2-PI/24)*rj*.88,x+Math.cos(a2)*rj,y+Math.sin(a2)*rj); } c.stroke(); }
  var sy=y+r*.7+Math.sin(t*1.1)*8, sx=x+r*.5; c.strokeStyle='rgba(255,255,255,.7)'; linha(c,sx,y+r*.2,sx,sy-6);
  c.strokeStyle='#3a2a3a'; c.lineWidth=1.4; for(var p=0;p<4;p++){ var py=sy-3+p*2.2; c.beginPath(); c.moveTo(sx-4,py); c.quadraticCurveTo(sx-9,py-3,sx-11,py+3); c.stroke(); c.beginPath(); c.moveTo(sx+4,py); c.quadraticCurveTo(sx+9,py-3,sx+11,py+3); c.stroke(); }
  c.fillStyle='#4a3a5a'; circ(c,sx,sy,6); c.fill(); c.fillStyle='#fff'; circ(c,sx-2.2,sy-1,2.2); c.fill(); circ(c,sx+2.2,sy-1,2.2); c.fill(); c.fillStyle='#111'; circ(c,sx-2,sy-.6,1.1); c.fill(); circ(c,sx+2.4,sy-.6,1.1); c.fill();
  c.strokeStyle='#f9a8d4'; c.lineWidth=1; c.beginPath(); c.arc(sx,sy+1.5,2,.2*PI,.8*PI); c.stroke();
}
function pertoCasa(c,cam,t){
  rep(cam,1200,function(ox){ if(ox>W+150||ox<-1350) return;
    bau(c,ox+60,452,120,'#8a4a2a'); vitrola(c,ox+300,452); cavalinho(c,ox+500,452,t); caixas(c,ox+700,452); bau(c,ox+930,452,96,'#3d5f8a');
    teia(c,ox+200,44,70,t); teia(c,ox+860,44,56,t+2);
  });
  for(var i=0;i<14;i++){ var px=((hash(i+5)*W-cam*.3+t*5*(1+hash(i)))%W+W)%W, py=140+((hash(i+9)*280-t*4*(1+hash(i+2)))%280+280)%280; c.fillStyle='rgba(255,236,190,'+(.25+.3*Math.abs(Math.sin(t*.5+i)))+')'; circ(c,px,py,1.2+hash(i)*1.2); c.fill(); }
}
function chaoCasa(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x, yy; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-4,s.w,s.h+4); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#9a5e2e','#4e2c14'); c.fillRect(s.x,s.y,s.w,s.h);
  for(var r=0;r*18<s.h;r++){ yy=s.y+6+r*18; c.fillStyle='rgba(40,20,8,.45)'; c.fillRect(s.x,yy,s.w,1.5);
    for(x=grade(a-r*47,140)+r*47;x<b;x+=140){ c.fillRect(x,yy,1.5,18); c.fillStyle='rgba(30,14,4,.5)'; circ(c,x+5,yy+5,1.1); c.fill(); circ(c,x+5,yy+13,1.1); c.fill(); c.fillStyle='rgba(255,220,160,.08)'; c.fillRect(x+10,yy+2,60+hash(x+r)*50,3); c.fillStyle='rgba(40,20,8,.45)'; } }
  c.fillStyle=lin(c,0,s.y,0,s.y+7,'#c88a50','#9a5e2e'); c.fillRect(s.x,s.y,s.w,7); c.fillStyle='rgba(255,230,180,.45)'; c.fillRect(s.x,s.y,s.w,2);
  bordas(c,s,'rgba(30,10,0,.4)'); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platCasa(c,p){
  sombraPlat(c,p,3); var x;
  if(hash(p.x*.11+p.y*.03)>.45){ /* prateleira com mão-francesa e coisas da vovó */
    [p.x+14,p.x+p.w-22].forEach(function(bx){ c.fillStyle='#5e3219'; c.beginPath(); c.moveTo(bx,p.y+8); c.lineTo(bx+8,p.y+8); c.lineTo(bx+8,p.y+30); c.closePath(); c.fill(); });
    c.fillStyle=lin(c,0,p.y,0,p.y+10,'#c88a50','#8a5228'); rr(c,p.x,p.y,p.w,10,2); c.fill(); c.fillStyle='rgba(255,230,180,.45)'; c.fillRect(p.x+2,p.y+1,p.w-4,1.5);
    c.fillStyle='rgba(40,20,8,.35)'; c.fillRect(p.x,p.y+8,p.w,2);
    for(x=p.x+10;x<p.x+p.w-24;x+=34){ var k=Math.floor(hash(x*.37+p.y)*4);
      if(k===0){ c.fillStyle='rgba(200,230,240,.6)'; rr(c,x,p.y-18,14,18,3); c.fill(); c.fillStyle='#e07a3a'; rr(c,x+2,p.y-12,10,11,2); c.fill(); c.fillStyle='#c0392b'; c.fillRect(x-1,p.y-21,16,4); }
      else if(k===1){ [['#8e2b2b',0],['#2c4a7a',5],['#2f6b47',10]].forEach(function(l){ c.fillStyle=l[0]; c.fillRect(x+l[1],p.y-16+l[1]*.2,5,16-l[1]*.2); }); }
      else if(k===2){ c.fillStyle='#f4ead6'; rr(c,x,p.y-14,18,14,3); c.fill(); c.fillStyle='#3d6f9e'; c.fillRect(x+2,p.y-10,14,2); c.strokeStyle='#f4ead6'; c.lineWidth=2; c.beginPath(); c.arc(x+20,p.y-7,4,-PI/2,PI/2); c.stroke(); } }
  } else { /* caixote de madeira */
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#c08850','#7a4a22'); rr(c,p.x,p.y,p.w,p.h,2); c.fill();
    c.fillStyle='rgba(60,30,10,.45)'; c.fillRect(p.x,p.y+p.h/2-1,p.w,2);
    var n=Math.max(1,Math.round(p.w/60)); for(var i=0;i<n;i++){ var x0=p.x+p.w*i/n, x1=x0+p.w/n; c.strokeStyle='rgba(90,50,20,.6)'; c.lineWidth=2.5; linha(c,x0+4,p.y+3,x1-4,p.y+p.h-3); c.fillStyle='#5e3219'; c.fillRect(x0,p.y,3,p.h); }
    c.fillStyle='#3a1d0e'; for(x=p.x+6;x<p.x+p.w;x+=p.w/n){ circ(c,x,p.y+4,1.2); c.fill(); circ(c,x,p.y+p.h-4,1.2); c.fill(); }
    c.fillStyle='rgba(255,230,180,.35)'; c.fillRect(p.x+2,p.y+1,p.w-4,1.5);
  }
}

/* ============================================================
   FAZENDA DO SEU PEDRO — campo, celeiro e plantação
   ============================================================ */
function ceuFazenda(c,t){
  ceuG(c,[[0,'#58b0ec'],[.55,'#bfe5fa'],[1,'#fff1c8']]);
  sol(c,150,92,36,'#fff3c4','rgba(255,240,190,.4)');
  for(var i=0;i<5;i++){ var x=((i*240+t*5+80)%(W+300))-150; nuvemF(c,x,70+(i%3)*36,.9+(i%2)*.4,'#ffffff','#dbe9f6',.92); }
}
function celeiro(c,x,y){
  var w=150, h=86;
  c.fillStyle=lin(c,0,y-h,0,y,'#d94a3a','#a8301f'); c.beginPath(); c.moveTo(x-w/2,y); c.lineTo(x-w/2,y-h); c.lineTo(x-w/2+24,y-h-34); c.lineTo(x,y-h-50); c.lineTo(x+w/2-24,y-h-34); c.lineTo(x+w/2,y-h); c.lineTo(x+w/2,y); c.fill();
  c.strokeStyle='rgba(110,20,10,.3)'; c.lineWidth=1; for(var vx=x-w/2+8;vx<x+w/2;vx+=8) linha(c,vx,y,vx,y-h-10);
  c.strokeStyle='#5a3a30'; c.lineWidth=7; c.lineJoin='round'; c.beginPath(); c.moveTo(x-w/2-6,y-h+4); c.lineTo(x-w/2+24,y-h-34); c.lineTo(x,y-h-52); c.lineTo(x+w/2-24,y-h-34); c.lineTo(x+w/2+6,y-h+4); c.stroke();
  c.strokeStyle='#f8f4ec'; c.lineWidth=4; c.strokeRect(x-30,y-60,60,60); linha(c,x-30,y-60,x+30,y); linha(c,x+30,y-60,x-30,y); linha(c,x,y-60,x,y);
  c.fillStyle='#5a2a1a'; c.fillRect(x-16,y-h-30,32,26); c.strokeStyle='#f8f4ec'; c.lineWidth=3; c.strokeRect(x-16,y-h-30,32,26); linha(c,x-16,y-h-30,x+16,y-h-4);
  c.fillStyle='#f6dc84'; c.beginPath(); c.moveTo(x-14,y-h-6); c.lineTo(x+14,y-h-6); c.lineTo(x+10,y-h-12); c.lineTo(x-8,y-h-14); c.fill();
  c.strokeStyle='#f8f4ec'; c.lineWidth=3; c.strokeRect(x-w/2+2,y-h+2,w-4,h-4);
  var sx=x+w/2+30; c.fillStyle=lin(c,sx-20,0,sx+20,0,'#e2e8f0','#94a3b8'); c.fillRect(sx-20,y-130,40,130); c.fillStyle='#cbd5e1'; c.beginPath(); c.arc(sx,y-130,20,PI,TAU); c.fill();
  c.strokeStyle='rgba(80,90,110,.35)'; c.lineWidth=1; for(var yy=y-120;yy<y;yy+=12) linha(c,sx-20,yy,sx+20,yy);
}
function catavento(c,x,y,t){
  c.strokeStyle='#8a94a6'; c.lineWidth=2.5; linha(c,x-14,y,x,y-110); linha(c,x+14,y,x,y-110); c.lineWidth=1.5; for(var k=1;k<5;k++){ var yy=y-k*22, ww=14*(1-k*22/110); linha(c,x-ww,yy,x+ww,yy); }
  c.save(); c.translate(x,y-112); c.rotate(t*.7); c.fillStyle='#e2e8f0'; for(k=0;k<12;k++){ c.rotate(TAU/12); c.beginPath(); c.moveTo(0,0); c.lineTo(28,-3); c.lineTo(28,4); c.closePath(); c.fill(); } c.fillStyle='#64748b'; circ(c,0,0,4); c.fill(); c.restore();
  c.fillStyle='#ef4444'; c.beginPath(); c.moveTo(x-4,y-112); c.lineTo(x-26,y-120); c.lineTo(x-26,y-104); c.fill();
}
function boi(c,x,y,s,dir,t,seed){
  c.save(); c.translate(x,y); c.scale(dir*s,s);
  var come=Math.sin(t*.8+seed)>.3;
  c.fillStyle='rgba(90,80,60,.35)'; el(c,0,-14,19.5,10.5); c.fill(); c.fillStyle='#f4f1ea'; el(c,0,-14,18,9); c.fill(); c.fillStyle='#e6e0d4'; el(c,6,-22,7,5); c.fill();
  c.fillStyle='#d6cfc0'; c.fillRect(-14,-8,4,9); c.fillRect(-7,-8,4,9); c.fillRect(8,-8,4,9); c.fillRect(13,-8,4,9);
  var hy=come?-6:-16; c.fillStyle='#ece7dc'; c.beginPath(); c.moveTo(14,-18); c.lineTo(24,hy-2); c.lineTo(28,hy+6); c.lineTo(16,-10); c.fill(); el(c,26,hy+3,5,4); c.fill();
  c.fillStyle='#8a8070'; c.beginPath(); c.moveTo(23,hy-1); c.lineTo(22,hy-6); c.lineTo(25,hy-2); c.fill();
  c.strokeStyle='#d6cfc0'; c.lineWidth=1.5; c.beginPath(); c.moveTo(-17,-16); c.quadraticCurveTo(-21+Math.sin(t*1.2+seed)*2,-10,-20,-4); c.stroke();
  c.restore();
}
function trator(c,x,y,t){
  c.fillStyle='rgba(0,0,0,.2)'; el(c,x,y,40,4); c.fill();
  c.fillStyle='#c0392b'; rr(c,x-30,y-30,46,16,3); c.fill(); c.fillStyle='#a93226'; c.fillRect(x+4,y-50,22,22); c.fillStyle='#bfe3fa'; c.fillRect(x+7,y-47,16,12);
  c.fillStyle='#2d3436'; c.fillRect(x+2,y-52,26,3); c.fillRect(x-22,y-44,4,14);
  for(var k=0;k<3;k++){ var f=(t*.4+k/3)%1; c.save(); c.globalAlpha=(1-f)*.45; c.fillStyle='#e5e7eb'; circ(c,x-20-f*14,y-48-f*30,3+f*6); c.fill(); c.restore(); }
  c.fillStyle='#2d3436'; circ(c,x+16,y-14,14); c.fill(); circ(c,x-24,y-9,9); c.fill(); c.fillStyle='#f6cf4a'; circ(c,x+16,y-14,6); c.fill(); circ(c,x-24,y-9,4); c.fill();
}
function longeFazenda(c,cam,t){
  morro(c,316,18,.005,cam*.5,'#a9cfbf');
  /* morro do meio com a plantação em fileiras */
  var off=cam*.8; c.save(); c.beginPath(); c.moveTo(0,H); for(var x=0;x<=W;x+=16) c.lineTo(x,morroY(x,368,14,.006,off)); c.lineTo(W,H); c.closePath(); c.fillStyle='#9ccc6a'; c.fill(); c.clip();
  for(var k=0;k<14;k++){ c.strokeStyle=k%2?'rgba(86,140,48,.85)':'rgba(196,226,120,.8)'; c.lineWidth=4; c.beginPath(); for(x=0;x<=W;x+=16){ var yy=morroY(x,368,14,.006,off)+10+k*7; if(x===0) c.moveTo(x,yy); else c.lineTo(x,yy); } c.stroke(); }
  c.restore();
  rep(cam,1400,function(ox){ if(ox>W+250||ox<-1650) return;
    celeiro(c,ox+260,404); catavento(c,ox+560,400,t);
    [[700,1,0],[760,-1,1],[820,1,2],[1150,-1,3],[1200,1,4]].forEach(function(b){ boi(c,ox+b[0],410,1.15,b[1],t,b[2]); });
    trator(c,ox+1000+Math.sin(t*.12)*30,410,t);
    [80,140,480,1300,1360].forEach(function(dx,j){ arvoreR(c,ox+dx,408,54+(j%2)*16,'#5f9a5c','#77b36c','#6b5a44'); });
  });
  c.fillStyle='#8cc47e'; c.fillRect(0,408,W,44); bruma(c,300,450,'rgba(255,241,200,.4)');
}
function cercaRustica(c,x,y,w){
  c.fillStyle='rgba(60,40,20,.2)'; c.fillRect(x,y-3,w,3);
  for(var px=x;px<=x+w;px+=52){ c.fillStyle=lin(c,px-4,0,px+4,0,'#a87a4a','#6e4a2a'); c.fillRect(px-4,y-56,8,56); c.fillStyle='#c09a6a'; c.fillRect(px-4,y-58,8,3); }
  [-46,-26].forEach(function(dy,i){ c.fillStyle=lin(c,0,y+dy,0,y+dy+7,'#c09060','#7e5530'); c.beginPath(); c.moveTo(x-6,y+dy); for(var u=x;u<=x+w+6;u+=26) c.lineTo(u,y+dy+Math.sin(u*.05+i)*1.5); c.lineTo(x+w+6,y+dy+7); c.lineTo(x-6,y+dy+7); c.fill(); });
}
function milho(c,x,y,h,t,seed){
  var sw=Math.sin(t*.9+seed)*3;
  c.strokeStyle='#5f9a3a'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+sw*.3,y-h*.5,x+sw,y-h); c.stroke();
  c.fillStyle='#6fae45'; for(var k=0;k<5;k++){ var u=.2+k*.16, py=y-h*u, d=k%2?1:-1; c.beginPath(); c.moveTo(x+sw*u,py); c.quadraticCurveTo(x+d*h*.22,py-h*.12,x+d*h*.34+sw,py+h*.02); c.quadraticCurveTo(x+d*h*.18,py-h*.02,x+sw*u,py+4); c.fill(); }
  c.fillStyle='#f2c230'; el(c,x+5+sw*.5,y-h*.55,4,10); c.fill(); c.fillStyle='#8fc060'; c.beginPath(); c.moveTo(x+2+sw*.5,y-h*.45); c.lineTo(x+5+sw*.5,y-h*.68); c.lineTo(x+9+sw*.5,y-h*.45); c.fill();
  c.strokeStyle='#d9b45a'; c.lineWidth=1.2; for(k=-2;k<=2;k++) linha(c,x+sw,y-h,x+sw+k*3,y-h-9);
}
function espantalho(c,x,y,t){
  var a=Math.sin(t*.9)*.04; c.save(); c.translate(x,y); c.rotate(a);
  c.fillStyle='#7e5530'; c.fillRect(-3,-120,6,120); c.fillRect(-46,-92,92,5);
  c.fillStyle='#d9483b'; rr(c,-24,-96,48,46,6); c.fill(); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=1.5; for(var k=-18;k<24;k+=10) linha(c,k,-96,k,-50); linha(c,-24,-80,24,-80); linha(c,-24,-64,24,-64);
  c.fillStyle='#d9483b'; rr(c,-46,-96,24,12,4); c.fill(); rr(c,22,-96,24,12,4); c.fill();
  c.fillStyle='#e8c25a'; for(k=0;k<3;k++){ c.beginPath(); c.moveTo(-48,-92+k*3); c.lineTo(-56,-88+k*4); c.lineTo(-48,-88+k*3); c.fill(); c.beginPath(); c.moveTo(48,-92+k*3); c.lineTo(56,-88+k*4); c.lineTo(48,-88+k*3); c.fill(); }
  c.fillStyle='#3d6f9e'; c.fillRect(-20,-52,40,12);
  c.fillStyle='#f2e2b8'; circ(c,0,-110,16); c.fill(); c.fillStyle='#2a1a10'; circ(c,-5,-112,2); c.fill(); circ(c,5,-112,2); c.fill(); c.strokeStyle='#8a4a3a'; c.lineWidth=1.5; c.beginPath(); c.arc(0,-107,6,.2*PI,.8*PI); c.stroke(); c.fillStyle='rgba(240,120,120,.5)'; circ(c,-9,-106,3); c.fill(); circ(c,9,-106,3); c.fill();
  c.fillStyle='#e8c25a'; el(c,0,-122,28,6); c.fill(); c.beginPath(); c.moveTo(-14,-122); c.quadraticCurveTo(-12,-140,0,-140); c.quadraticCurveTo(12,-140,14,-122); c.fill(); c.fillStyle='#c0392b'; c.fillRect(-14,-128,28,4);
  c.strokeStyle='rgba(150,110,40,.6)'; c.lineWidth=1; for(k=-24;k<26;k+=6) linha(c,k,-122,k*1.06,-118);
  c.restore();
}
function galinha(c,x,y,t,dir,seed){
  var bic=Math.max(0,Math.sin(t*1.2+seed))*.5; c.save(); c.translate(x,y); c.scale(dir,1);
  c.fillStyle='#f6f1e6'; el(c,0,-10,11,8); c.fill(); c.beginPath(); c.moveTo(-8,-12); c.lineTo(-15,-20); c.lineTo(-11,-8); c.fill();
  c.save(); c.translate(7,-14); c.rotate(bic); c.fillStyle='#f6f1e6'; circ(c,2,-3,5.5); c.fill(); c.fillStyle='#e0393b'; circ(c,1,-9,2.2); c.fill(); circ(c,4,-8.5,2); c.fill(); c.fillStyle='#f59e0b'; c.beginPath(); c.moveTo(7,-4); c.lineTo(11,-2.5); c.lineTo(7,-1); c.fill(); c.fillStyle='#111'; circ(c,4,-4,1); c.fill(); c.restore();
  c.strokeStyle='#f59e0b'; c.lineWidth=1.5; linha(c,-2,-3,-3,0); linha(c,3,-3,3,0); c.restore();
}
function fenoRedondo(c,x,y){
  c.fillStyle='rgba(0,0,0,.2)'; el(c,x,y,40,5); c.fill();
  c.fillStyle=lin(c,0,y-70,0,y,'#f2d070','#c49a30'); c.fillRect(x-42,y-62,60,62); c.fillStyle=lin(c,x+10,0,x+50,0,'#f6dc84','#d9b04a'); el(c,x+18,y-31,24,31); c.fill();
  c.strokeStyle='rgba(150,110,30,.6)'; c.lineWidth=1.2; for(var r=6;r<24;r+=5){ c.beginPath(); c.ellipse(x+18,y-31,r,r*1.28,0,0,TAU); c.stroke(); }
  c.strokeStyle='rgba(150,110,30,.45)'; for(var k=0;k<10;k++){ var yy=y-58+k*6; linha(c,x-40,yy,x+2,yy+1); }
}
function pertoFazenda(c,cam,t){
  rep(cam,1300,function(ox){ if(ox>W+80||ox<-1380) return;
    cercaRustica(c,ox+20,452,410); cercaRustica(c,ox+780,452,300);
    for(var i=0;i<7;i++) milho(c,ox+470+i*30,452,96+hash(i+.5)*20,t,i);
    espantalho(c,ox+700,452,t); fenoRedondo(c,ox+1170,452);
    galinha(c,ox+180,452,t,1,0); galinha(c,ox+220,452,t,-1,2); galinha(c,ox+1110,452,t,1,4);
    arvoreR(c,ox+1260,452,180,'#4f8f4a','#6fb35e');
  });
}
function chaoFazenda(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x, j; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#a85a34','#5a2814'); c.fillRect(s.x,s.y,s.w,s.h);
  c.strokeStyle='rgba(70,30,12,.45)'; c.lineWidth=2; for(j=0;j*14+24<s.h;j++){ var yy=s.y+24+j*14; c.beginPath(); for(x=grade(a,20);x<=b+20;x+=20){ var py=yy+Math.sin(x*.03+j)*2; if(x===grade(a,20)) c.moveTo(x,py); else c.lineTo(x,py); } c.stroke(); }
  for(x=grade(a,24);x<b;x+=24) for(j=0;j<3;j++){ var px=x+hash(x*.3+j)*20, py2=s.y+20+j*22+hash(x+j)*10; if(py2>s.y+s.h-6) continue; c.fillStyle=j%2?'rgba(210,150,110,.35)':'rgba(60,25,10,.35)'; el(c,px,py2,3.5,2.2); c.fill(); }
  topoGrama(c,s,a,b);
  for(x=grade(a,60);x<b;x+=60){ if(hash(x*1.7)>.65){ var fx=x+hash(x+5)*40; flor(c,fx,s.y-6,2.4,'#fde047'); c.strokeStyle='#4c9c37'; c.lineWidth=1.2; linha(c,fx,s.y,fx,s.y-4); } }
  bordas(c,s,'rgba(50,20,8,.35)'); c.fillStyle='rgba(0,0,0,.16)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platFazenda(c,p){
  sombraPlat(c,p,4);
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#f6dc84','#c9a03c'); rr(c,p.x,p.y,p.w,p.h,4); c.fill();
  c.strokeStyle='rgba(160,115,30,.55)'; c.lineWidth=1; for(var x=p.x+3;x<p.x+p.w-6;x+=5){ var hv=hash(x*.9+p.y); linha(c,x,p.y+3+hv*4,x+4+hv*5,p.y+3+hv*4+1); linha(c,x+2,p.y+10+hv*3,x+7,p.y+11+hv*3); }
  c.strokeStyle='rgba(255,245,200,.6)'; for(x=p.x+5;x<p.x+p.w-6;x+=9){ linha(c,x,p.y+6+hash(x)*6,x+5,p.y+6+hash(x)*6); }
  var n=Math.max(2,Math.round(p.w/55)); c.fillStyle='#8a5a24'; for(var i=1;i<=n;i++){ var bx=p.x+p.w*i/(n+1); c.fillRect(bx-1.5,p.y,3,p.h); }
  c.fillStyle='#f8e49a'; for(x=p.x+2;x<p.x+p.w-2;x+=4){ var hh=2+hash(x*1.3)*4; c.beginPath(); c.moveTo(x,p.y+1); c.lineTo(x+1+hash(x)*2,p.y-hh); c.lineTo(x+3,p.y+1); c.fill(); }
  c.strokeStyle='#e8c25a'; c.lineWidth=1; for(i=0;i<5;i++){ var sx=p.x+hash(p.x+i)*p.w; linha(c,sx,p.y+p.h-1,sx+(hash(i+p.y)-.5)*8,p.y+p.h+5); }
}

/* ---------- embrulho das funções de cena ---------- */
var F={
  escola:{ceu:ceuEscola,longe:longeEscola,perto:pertoEscola,chao:chaoEscola,plat:platEscola},
  casa:{ceu:ceuCasa,longe:longeCasa,perto:pertoCasa,chao:chaoCasa,plat:platCasa},
  fazenda:{ceu:ceuFazenda,longe:longeFazenda,perto:pertoFazenda,chao:chaoFazenda,plat:platFazenda}
};
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma;
A.ceu=function(c,cena,t){ var f=F[cena]; if(f){ c.save(); f.ceu(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.longe(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.perto(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.chao=function(c,s,cena){ var f=F[cena]; if(f){ c.save(); f.chao(c,s); c.restore(); return; } chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ var f=F[cena]; if(f){ c.save(); f.plat(c,p); c.restore(); return; } plat0(c,p,cena); };
A.TB.galinha=galinha; A.TB.boi=boi; A.TB.trator=trator; A.TB.teia=teia; A.TB.retrato=retrato;
})();
