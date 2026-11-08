/* ============================================================
   GEO3_jogo_arteH2.js — Guardiões da Casa Maior. Cenas 2/6:
   'campinho' (fase 3, U3 S14: lazer e esporte no bairro; padaria do José ao lado,
   prédio alto como ponto de referência) — tanto a fase de plataforma quanto o fundo
   do pênalti (A.fundoCampinho / A.postesCampinho, chamados pelo penalti.js) —
   e 'avenida' (fase 4, U3 S7: Avenida Paulista, prédios altos, várias faixas,
   semáforos; o prédio em obra com andaime e guindaste é a peça de jogo).
   Mesmo contrato de GEO3_jogo_arteH.js (A.TH). Sem imagem, sem emoji, nada pisca.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING||!A.TB||!A.TH) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, sol=N.sol, nuvemF=N.nuvemF, linha=N.linha,
    arvoreR=N.arvoreR, arbusto=N.arbusto, flor=N.flor, bordas=N.bordas, sombraPlat=N.sombraPlat;
var T=A.TB, txt=T.txt, topoGrama=T.topoGrama, morro=T.morro;
var TH=A.TH, tile=TH.tile, poe=TH.poe, nuvens=TH.nuvens, janela=TH.janela, arvoreRua=TH.arvoreRua, poste=TH.poste, placa=TH.placa, semaforo=TH.semaforo, faixaPedestre=TH.faixaPedestre, carro=TH.carro, casa=TH.casa, loja=TH.loja, FONTE=TH.FONTE;

A.CENAS.campinho={ceu:['#2f6fb5','#8fc3ea','#ffd9a0'], chaoTop:'#5cbf60', chao:'#8a5a2a', chaoBase:'#4a2c12', plat:'#e5e7eb', platTop:'#ffffff', part:'', musica:'mar'};
A.CENAS.avenida ={ceu:['#3b82c4','#9ed0f0','#f3e6c8'], chaoTop:'#cfcac0', chao:'#4b4f5a', chaoBase:'#23262e', plat:'#f2b713', platTop:'#ffd84a', part:'nuvem', musica:'cidade'};

/* ============================================================
   O CAMPINHO DO BAIRRO — fim de tarde; casas, prédio alto, igreja, a padaria
   ============================================================ */
function ceuCamp(c,t){ ceuG(c,[[0,'#2f6fb5'],[.45,'#8fc3ea'],[.8,'#f7c89a'],[1,'#ffd9a0']]); sol(c,150,250,34,'#fff0c0','rgba(255,220,160,.35)'); nuvens(c,t,70,4,3); }
function predioAlto(c,x,y,w,h,cor,sd){ c.fillStyle=lin(c,0,y-h,0,y,cla(cor,.15),cor); c.fillRect(x,y-h,w,h); c.fillStyle='rgba(0,0,0,.1)'; c.fillRect(x+w-8,y-h,8,h); c.fillStyle=esc(cor,.3); c.fillRect(x-3,y-h-5,w+6,6); c.fillRect(x+w/2-2,y-h-22,4,18);
  for(var j=0;j<Math.floor(h/22)-1;j++) for(var i=0;i<Math.floor(w/16);i++){ c.fillStyle=hash(sd+i*7+j*3)>.35?'#dbeefb':'#5b86a8'; c.fillRect(x+5+i*16,y-h+10+j*22,9,13); } }
function igreja(c,x,y){ c.fillStyle='#f6efe0'; c.fillRect(x-40,y-70,80,70); c.fillRect(x-14,y-118,28,50); c.fillStyle='#b45309'; c.beginPath(); c.moveTo(x-18,y-118); c.lineTo(x,y-142); c.lineTo(x+18,y-118); c.fill(); c.beginPath(); c.moveTo(x-48,y-70); c.lineTo(x,y-94); c.lineTo(x+48,y-70); c.fill();
  c.strokeStyle='#92400e'; c.lineWidth=2.5; linha(c,x,y-142,x,y-156); linha(c,x-6,y-150,x+6,y-150); c.fillStyle='#7a4a2a'; c.beginPath(); c.moveTo(x-9,y); c.lineTo(x-9,y-30); c.arc(x,y-30,9,PI,TAU); c.lineTo(x+9,y); c.fill(); c.fillStyle='#93c5fd'; c.beginPath(); c.moveTo(x-5,y-80); c.lineTo(x-5,y-100); c.arc(x,y-100,5,PI,TAU); c.lineTo(x+5,y-80); c.fill(); }
function longeCamp(c,cam,t){
  morro(c,322,16,.006,cam*.4,'#9fc9b8'); c.fillStyle='#a8d59a'; c.fillRect(0,392,W,H-392);
  rep(cam,1400,function(ox){ if(ox>W+60||ox<-1460) return;
    predioAlto(c,ox+120,394,60,170,'#d7dde6',1); c.save(); c.translate(ox+260,394); c.scale(.55,.55); casa(c,0,0,160,92,31); c.restore(); c.save(); c.translate(ox+380,394); c.scale(.55,.55); casa(c,0,0,150,84,32); c.restore();
    igreja(c,ox+560,394); c.save(); c.translate(ox+660,394); c.scale(.55,.55); casa(c,0,0,170,96,33); c.restore(); predioAlto(c,ox+800,394,50,120,'#e9d8c8',2);
    c.save(); c.translate(ox+900,394); c.scale(.55,.55); loja(c,0,0,190,96,34,'PADARIA','#d97706',true); c.restore();
    c.save(); c.translate(ox+1060,394); c.scale(.55,.55); casa(c,0,0,160,90,35); c.restore(); predioAlto(c,ox+1200,394,70,200,'#cfd8e3',3);
    [40,330,520,760,1000,1150,1340].forEach(function(dx,j){ arvoreR(c,ox+dx,396,34+(j%3)*8,'#4f9f44','#6fbf5a','#6b4428'); });
  });
  bruma(c,300,452,'rgba(255,225,180,.4)');
}
function alambrado(c,x,y,w,h){ c.save(); c.beginPath(); c.rect(x,y-h,w,h); c.clip(); c.strokeStyle='rgba(120,135,150,.55)'; c.lineWidth=1; for(var d=-h;d<w;d+=11){ linha(c,x+d,y,x+d+h,y-h); linha(c,x+d+h,y,x+d,y-h); } c.restore();
  c.fillStyle='#64748b'; for(var px=x;px<=x+w;px+=70){ c.fillRect(px-2.5,y-h-4,5,h+4); c.fillStyle='#94a3b8'; c.fillRect(px-1,y-h-4,1.5,h+4); c.fillStyle='#64748b'; } c.fillRect(x,y-h-4,w,4); }
function trave(c,x,y){ c.strokeStyle='#f8fafc'; c.lineWidth=5; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-70); c.lineTo(x+110,y-70); c.lineTo(x+110,y); c.stroke(); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=1; for(var k=0;k<=110;k+=11) linha(c,x+k,y-70,x+k,y); for(k=0;k<=70;k+=10) linha(c,x,y-k,x+110,y-k); }
function banco(c,x,y){ c.fillStyle='#4b5563'; c.fillRect(x-30,y-22,4,22); c.fillRect(x+26,y-22,4,22); c.fillStyle=lin(c,0,y-26,0,y-18,'#c98a4f','#8a5428'); c.fillRect(x-36,y-26,72,7); c.fillRect(x-36,y-44,72,6); c.fillRect(x-36,y-36,72,6); c.fillStyle='#4b5563'; c.fillRect(x-30,y-46,4,22); c.fillRect(x+26,y-46,4,22); }
function lixeira(c,x,y,cor){ c.fillStyle=cor; rr(c,x-10,y-30,20,30,3); c.fill(); c.fillStyle=esc(cor,.3); rr(c,x-12,y-34,24,6,2); c.fill(); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(x-7,y-26,3,20); }
function bandeirinha(c,x,y,t){ c.strokeStyle='#f8fafc'; c.lineWidth=3; linha(c,x,y,x,y-80); c.fillStyle='#facc15'; var w=Math.sin(t*1.4)*3; c.beginPath(); c.moveTo(x,y-80); c.lineTo(x+26+w,y-72); c.lineTo(x,y-62); c.fill(); }
function pertoCamp(c,cam,t){
  rep(cam,1400,function(ox){ if(ox>W+60||ox<-1460) return;
    alambrado(c,ox+40,452,620,120); trave(c,ox+120,452); bandeirinha(c,ox+60,452,t); bandeirinha(c,ox+640,452,t);
    arvoreR(c,ox+760,452,170,'#4f8f4a','#6fb35e'); banco(c,ox+860,452); lixeira(c,ox+910,452,'#16a34a'); poste(c,ox+960,452,180);
    loja(c,ox+1000,452,190,96,40,'PADARIA','#d97706',true); arvoreR(c,ox+1260,452,150,'#e2b11c','#ffd84a','#6b4428'); banco(c,ox+1340,452);
    arbusto(c,ox+700,452,40,'#3f8a3c','#5fae4f',['#fde047','#fff'],12); arbusto(c,ox+1230,452,44,'#3f8a3c','#5fae4f',['#f472b6','#fff'],13);
  });
}
function chaoCamp(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#a0623a','#5a3418'); c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle='rgba(0,0,0,.1)'; for(x=grade(a,26);x<b;x+=26){ el(c,x+hash(x)*20,s.y+24+hash(x+1)*(Math.min(s.h,90)-30),4+hash(x+2)*4,2.5); c.fill(); }
  /* grama do campinho com as linhas brancas de cal */
  topoGrama(c,s,a,b,{c0:'#8fd860',c1:'#4c9c37',luz:'#a8e67c',fio:['#74c64e','#5fb043']});
  c.fillStyle='rgba(255,255,255,.75)'; for(x=grade(a,180);x<b;x+=180){ c.fillRect(x+20,s.y+3,60,3); }
  for(x=grade(a,46);x<b;x+=46){ if(hash(x*1.31)>.7){ var fx=x+hash(x+5)*30; flor(c,fx,s.y-4,2,['#fff','#fde047'][Math.floor(hash(x)*2)]); } }
  bordas(c,s,'rgba(40,20,10,.35)'); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platCamp(c,p){
  sombraPlat(c,p,4); var x, k=hash(p.x*.13+p.y*.07);
  if(k>.5){ /* arquibancadinha de concreto do campinho (dois degraus) */
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#f1f5f9','#94a3b8'); rr(c,p.x,p.y,p.w,p.h,3); c.fill(); c.fillStyle='rgba(255,255,255,.6)'; c.fillRect(p.x+2,p.y+1,p.w-4,2); c.fillStyle='rgba(0,0,0,.14)'; c.fillRect(p.x,p.y+p.h*.5,p.w,2);
    c.fillStyle='#1d4ed8'; c.fillRect(p.x+6,p.y+3,p.w-12,4); if(p.w>=90){ c.fillStyle='#16a34a'; rr(c,p.x+p.w*.6,p.y-10,22,10,3); c.fill(); c.fillStyle='#fff'; c.fillRect(p.x+p.w*.6+4,p.y-7,14,4); }
  } else { /* pneus coloridos empilhados, como no parquinho do bairro */
    var cores=['#ef4444','#2563eb','#f59e0b','#22c55e'], n=Math.max(1,Math.floor(p.w/44));
    for(x=0;x<n;x++){ var cx=p.x+22+x*(p.w-44)/Math.max(1,n-1)*(n>1?1:0)+(n===1?p.w/2-22:0), cor=cores[Math.floor(hash(p.x+x*7)*4)];
      c.fillStyle=cor; rr(c,cx-22,p.y,44,p.h,p.h/2); c.fill(); c.fillStyle='#1f2937'; rr(c,cx-11,p.y+p.h*.25,22,p.h*.5,p.h/4); c.fill(); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(cx-16,p.y+2,32,2); }
  }
}

/* ---------- fundo do pênalti (chamado pelo penalti.js no lugar do estádio) ---------- */
A.fundoCampinho=function(GOL,SPOT,RB){
  var cv=document.createElement('canvas'); cv.width=W*2; cv.height=H*2; var c=cv.getContext('2d'); c.scale(2,2); c.lineJoin='round'; c.lineCap='round'; var i,x,y;
  ceuG(c,[[0,'#2f6fb5'],[.3,'#8fc3ea'],[.5,'#f7c89a'],[.6,'#ffd9a0'],[1,'#ffd9a0']]); sol(c,820,120,30,'#fff0c0','rgba(255,220,160,.3)');
  for(i=0;i<4;i++) nuvemF(c,80+i*240,50+(i%2)*22,.8,'#ffffff','#dbe9f6',.9);
  /* o bairro atrás do campinho: prédio alto, casas, igreja, padaria, árvores */
  c.fillStyle='#a8d59a'; c.fillRect(0,96,W,20);
  predioAlto(c,40,100,70,200,'#d7dde6',5); c.save(); c.translate(140,100); c.scale(.6,.6); casa(c,0,0,160,92,41); c.restore(); c.save(); c.translate(270,100); c.scale(.6,.6); loja(c,0,0,190,96,42,'PADARIA','#d97706',true); c.restore();
  igreja(c,470,100); c.save(); c.translate(540,100); c.scale(.6,.6); casa(c,0,0,170,96,43); c.restore(); c.save(); c.translate(680,100); c.scale(.6,.6); casa(c,0,0,150,84,44); c.restore(); predioAlto(c,800,100,60,150,'#e9d8c8',6); c.save(); c.translate(880,100); c.scale(.6,.6); casa(c,0,0,160,90,45); c.restore();
  [20,130,250,440,520,660,780,900].forEach(function(dx,j){ arvoreR(c,dx,102,40+(j%3)*10,'#4f9f44','#6fbf5a','#6b4428'); });
  /* arquibancadinha de concreto (3 degraus; a torcida do bairro senta nelas) */
  var deg=[[60,118,'#cbd5e1','#94a3b8'],[118,198,'#d6dde6','#9aa6b4'],[198,284,'#e2e8f0','#a3aebb']];
  deg.forEach(function(d,k){ c.fillStyle=lin(c,0,d[0],0,d[1],d[2],d[3]); c.fillRect(0,d[0],W,d[1]-d[0]); c.fillStyle='rgba(255,255,255,.6)'; c.fillRect(0,d[0],W,4); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(0,d[1]-5,W,5); });
  c.fillStyle='rgba(30,40,60,.25)'; [160,480,800].forEach(function(sx){ c.fillRect(sx-10,60,20,224); });
  /* mureta pintada com os dizeres do bairro e alambrado baixo */
  c.fillStyle='#0f172a'; c.fillRect(0,284,W,10);
  var pubs=[['CAMPINHO DO BAIRRO','#1d4ed8'],['PADARIA DO JOSÉ','#d97706'],['OLHE OS 2 LADOS!','#dc2626'],['GUARDIÕES','#16a34a'],['VAI, TIME!','#7c3aed']];
  for(i=0;i<6;i++){ var p=pubs[i%pubs.length], bx=i*172-40; c.fillStyle=lin(c,0,294,0,330,p[1],esc(p[1],.35)); c.fillRect(bx,294,170,36); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(bx,294,170,4); c.font='900 17px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#fff'; c.fillText(p[0],bx+85,313); c.fillStyle='rgba(0,0,0,.4)'; c.fillRect(bx+168,294,2,36); }
  /* gramado em perspectiva + linhas (iguais às do motor: linha do gol, área, marca) */
  var y0=330, yy=y0; for(i=0;i<9;i++){ var hh=8+i*i*1.25+i*4; c.fillStyle=i%2?'#3f9d48':'#4cae54'; c.fillRect(0,yy,W,hh+1); yy+=hh; if(yy>H) break; } if(yy<H){ c.fillStyle='#4cae54'; c.fillRect(0,yy,W,H-yy); }
  var gg=c.createLinearGradient(0,330,0,H); gg.addColorStop(0,'rgba(10,30,20,.35)'); gg.addColorStop(.35,'rgba(10,30,20,0)'); c.fillStyle=gg; c.fillRect(0,330,W,H-330);
  c.strokeStyle='rgba(255,255,255,.88)'; c.lineWidth=3; c.beginPath(); c.moveTo(0,GOL.y1+1); c.lineTo(W,GOL.y1+1); c.stroke();
  c.lineWidth=3.4; c.beginPath(); c.moveTo(82,GOL.y1+1); c.lineTo(46,438); c.lineTo(914,438); c.lineTo(878,GOL.y1+1); c.stroke();
  c.lineWidth=4; c.beginPath(); c.moveTo(-40,520); c.lineTo(1000,520); c.stroke(); c.beginPath(); c.ellipse(SPOT.x,520,150,26,0,0,PI); c.stroke();
  c.fillStyle='#fff'; el(c,SPOT.x,SPOT.y+RB-1,9,3.4); c.fill();
  var gl=c.createRadialGradient(480,420,30,480,420,520); gl.addColorStop(0,'rgba(255,250,220,.14)'); gl.addColorStop(1,'rgba(255,250,220,0)'); c.fillStyle=gl; c.fillRect(0,300,W,240);
  return cv;
};
/* postes de luz do campinho (no lugar das torres de refletor) */
A.postesCampinho=function(c,t){
  [[44,1],[916,-1]].forEach(function(r){ var x=r[0]; c.save();
    var g=c.createLinearGradient(x,40,x+r[1]*200,330); g.addColorStop(0,'rgba(255,248,214,.22)'); g.addColorStop(1,'rgba(255,248,214,0)'); c.fillStyle=g; c.beginPath(); c.moveTo(x-20,44); c.lineTo(x+20,44); c.lineTo(x+r[1]*300+110,330); c.lineTo(x+r[1]*110-110,330); c.closePath(); c.fill();
    c.fillStyle='#374151'; c.fillRect(x-4,40,8,250); c.fillStyle='#4b5563'; c.fillRect(x-14,286,28,8);
    c.translate(x,34); c.rotate(r[1]*.1); c.fillStyle='#1f2937'; rr(c,-30,-12,60,26,5); c.fill(); for(var i=0;i<3;i++){ var px=-18+i*18, fl=.85+.15*Math.sin(t*1.2+i+x); var b=c.createRadialGradient(px,0,0,px,0,12); b.addColorStop(0,'rgba(255,255,240,'+fl+')'); b.addColorStop(1,'rgba(255,244,200,0)'); c.fillStyle=b; circ(c,px,0,12); c.fill(); c.fillStyle='#fffbe8'; circ(c,px,0,4.4); c.fill(); }
    c.restore(); });
};

/* ============================================================
   A AVENIDA — Avenida Paulista (U3 S7): prédios altos, várias faixas, semáforos
   ============================================================ */
function ceuAv(c,t){ ceuG(c,[[0,'#3b82c4'],[.5,'#9ed0f0'],[1,'#f3e6c8']]); sol(c,180,90,26,'#fff3c4','rgba(255,244,200,.3)'); nuvens(c,t,50,5,3); }
function predioVidro(c,x,y,w,h,sd){ var g=lin(c,x,0,x+w,0,'#bfe3f7','#6ea3c8'); c.fillStyle=g; c.fillRect(x,y-h,w,h); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; for(var yy=y-h+12;yy<y;yy+=12) linha(c,x,yy,x+w,yy); for(var xx=x+10;xx<x+w;xx+=10) linha(c,xx,y-h,xx,y); c.fillStyle='rgba(255,255,255,.3)'; c.beginPath(); c.moveTo(x,y-h*.4); c.lineTo(x+w*.5,y-h); c.lineTo(x+w*.7,y-h); c.lineTo(x,y-h*.2); c.fill(); c.fillStyle='#475569'; c.fillRect(x-2,y-h-4,w+4,4); if(hash(sd)>.5){ c.fillRect(x+w/2-1.5,y-h-30,3,26); c.fillStyle='#ef4444'; circ(c,x+w/2,y-h-31,2.5); c.fill(); } }
function vaosVermelhos(c,x,y){ /* prédio suspenso em dois vãos vermelhos, ponto de referência da avenida */ c.fillStyle='#dc2626'; c.fillRect(x,y-110,10,110); c.fillRect(x+150,y-110,10,110); c.fillRect(x-6,y-116,172,10); c.fillRect(x-6,y-56,172,8); c.fillStyle='rgba(255,255,255,.75)'; c.fillRect(x+10,y-106,140,50); c.fillStyle='#93c5fd'; c.fillRect(x+16,y-100,128,38); c.fillStyle='rgba(0,0,0,.08)'; c.fillRect(x+10,y-48,140,48); }
function longeAv(c,cam,t){
  c.fillStyle='#c9d6e2'; c.fillRect(0,300,W,H-300);
  rep(cam,1500,function(ox){ if(ox>W+60||ox<-1560) return;
    [[0,70,200,'#cbd5e1',1],[90,60,250,'#e2e8f0',2],[170,80,170,'#d6c8b8',3],[270,56,300,'#cbd5e1',4],[340,90,220,'#e9e2d6',5],[450,64,330,'#d1d5db',6],[530,80,190,'#e2e8f0',7],[630,70,270,'#cfd8e3',8],[720,60,230,'#e6ddd0',9],[800,90,310,'#d1d5db',10],[910,70,180,'#e2e8f0',11],[1000,60,260,'#cbd5e1',12],[1080,84,340,'#dfe6ee',13],[1190,66,200,'#d6c8b8',14],[1280,76,290,'#e2e8f0',15],[1380,60,240,'#d1d5db',16]].forEach(function(p,k){ if(k%3===1) predioVidro(c,ox+p[0],392,p[1],p[2],p[4]); else predioAlto(c,ox+p[0],392,p[1],p[2],p[3],p[4]); });
    vaosVermelhos(c,ox+1100,392);
  });
  bruma(c,240,452,'rgba(243,230,200,.5)');
}
function guindaste(c,x,y,h,t){ var a=Math.sin(t*.35)*.12; c.fillStyle='#f59e0b'; c.fillRect(x-6,y-h,12,h); c.strokeStyle='#b45309'; c.lineWidth=1.5; for(var k=y-h;k<y;k+=14){ linha(c,x-6,k,x+6,k+7); linha(c,x+6,k,x-6,k+7); } c.save(); c.translate(x,y-h); c.rotate(a); c.fillStyle='#f59e0b'; c.fillRect(-60,-6,260,10); c.fillStyle='#374151'; c.fillRect(-60,-20,40,14); c.strokeStyle='#1f2937'; c.lineWidth=1.5; linha(c,150,4,150,120); c.fillStyle='#64748b'; c.fillRect(140,120,20,8); c.fillStyle='#9ca3af'; c.fillRect(130,128,40,10); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(-60,-6); c.lineTo(0,-40); c.lineTo(200,-6); c.lineTo(0,-28); c.fill(); c.restore(); }
function esqueleto(c,x,y,w,h,andares){ c.fillStyle='#9ca3af'; for(var k=0;k<=andares;k++) c.fillRect(x,y-k*(h/andares),w,6); for(var i=0;i<=3;i++) c.fillRect(x+i*(w-6)/3,y-h,6,h); c.fillStyle='rgba(0,0,0,.06)'; c.fillRect(x,y-h,w,h); c.fillStyle='#2f6fd6'; c.fillRect(x-4,y-h-8,w+8,8); }
function pontoOnibus(c,x,y){ c.fillStyle='#374151'; c.fillRect(x,y-80,5,80); c.fillRect(x+90,y-80,5,80); c.fillStyle='#2563eb'; rr(c,x-6,y-90,108,12,3); c.fill(); c.fillStyle='rgba(191,219,254,.45)'; c.fillRect(x+5,y-78,85,50); c.fillStyle='#1d4ed8'; rr(c,x+10,y-70,40,16,3); c.fill(); txt(c,'ÔNIBUS',x+30,y-62,8,'#fff'); c.fillStyle='#64748b'; c.fillRect(x+8,y-26,80,5); c.fillRect(x+14,y-21,4,21); c.fillRect(x+78,y-21,4,21); }
function onibus(c,x,y,t){ c.save(); c.translate(x,y); c.fillStyle='rgba(0,0,0,.25)'; el(c,0,0,70,6); c.fill(); c.fillStyle='#16a34a'; rr(c,-70,-52,140,44,8); c.fill(); c.fillStyle='#bfe3fa'; for(var k=0;k<5;k++) rr(c,-62+k*26,-46,20,18,3); c.fill(); c.fillStyle='#fde68a'; rr(c,-66,-24,28,10,3); c.fill(); c.fillStyle='#1f2937'; circ(c,-42,-6,8); c.fill(); circ(c,42,-6,8); c.fill(); c.fillStyle='#9ca3af'; circ(c,-42,-6,3); c.fill(); circ(c,42,-6,3); c.fill(); c.restore(); }
function pertoAv(c,cam,t){
  rep(cam,1600,function(ox){ if(ox>W+80||ox<-1680) return;
    /* fachadas no nível da rua, o prédio em obra, o ponto de ônibus, semáforos e placas */
    predioAlto(c,ox+20,452,150,260,'#e2e8f0',21); c.fillStyle='#2563eb'; rr(c,ox+30,452-80,130,22,4); c.fill(); txt(c,'BANCO',ox+95,452-69,12,'#fff'); c.fillStyle='#bfe3fa'; c.fillRect(ox+34,452-52,122,46);
    semaforo(c,ox+200,452,t); placa(c,ox+240,452,'rua','AV. PAULISTA');
    tapume(c,ox+280,452,300); esqueleto(c,ox+310,452,240,220,5); guindaste(c,ox+600,452,300,t);
    pontoOnibus(c,ox+680,452); onibus(c,ox+860+Math.sin(t*.25)*30,452,t);
    predioVidro(c,ox+960,452,180,300,22); c.fillStyle='#dc2626'; rr(c,ox+970,452-70,80,20,4); c.fill(); txt(c,'CAFÉ',ox+1010,452-60,12,'#fff');
    arvoreRua(c,ox+1180,452,120,23); semaforo(c,ox+1260,452,t+3); predioAlto(c,ox+1300,452,200,240,'#f1f5f9',24); c.fillStyle='#7c3aed'; rr(c,ox+1310,452-80,110,22,4); c.fill(); txt(c,'LIVRARIA',ox+1365,452-69,12,'#fff');
    poste(c,ox+1540,452,200);
  });
}
function tapume(c,x,y,w){ c.fillStyle=lin(c,0,y-70,0,y,'#fde68a','#f59e0b'); c.fillRect(x,y-70,w,70); c.strokeStyle='rgba(120,80,0,.3)'; c.lineWidth=1.5; for(var k=x+60;k<x+w;k+=60) linha(c,k,y-70,k,y); c.fillStyle='#2f6fd6'; c.fillRect(x,y-74,w,6); c.fillStyle='#1f2937'; rr(c,x+w/2-50,y-50,100,22,4); c.fill(); txt(c,'OBRA',x+w/2,y-39,12,'#fde047'); }
function chaoAv(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  /* calçada larga de mosaico preto e branco, meio-fio e avenida de várias faixas */
  c.fillStyle='#e5e3dc'; c.fillRect(s.x,s.y,s.w,20); c.fillStyle='#4b4f5a'; for(x=grade(a,16);x<b;x+=16) for(var j=0;j<2;j++){ if(((x/16|0)+j)%2===0) c.fillRect(x+2,s.y+3+j*8,10,6); }
  c.fillStyle='#9ca3af'; c.fillRect(s.x,s.y+20,s.w,6); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(s.x,s.y,s.w,2);
  c.fillStyle=lin(c,0,s.y+26,0,s.y+Math.min(s.h,160),'#4b4f5a','#2a2d35'); c.fillRect(s.x,s.y+26,s.w,s.h-26);
  c.fillStyle='#e5e7eb'; for(var r=0;r<3;r++){ var yy=s.y+48+r*22; if(yy>s.y+s.h-6) break; for(x=grade(a,40);x<b;x+=40) c.fillRect(x,yy,20,3); }
  c.fillStyle='#f5c518'; if(s.h>40) c.fillRect(s.x,s.y+40,s.w,3);
  for(x=grade(a,300);x<b;x+=300){ carro(c,x+hash(x)*120,s.y+70,['#ef4444','#f8fafc','#2563eb','#fbbf24'][Math.floor(hash(x+1)*4)],1); }
  bordas(c,s,'rgba(20,20,30,.4)'); c.fillStyle='rgba(0,0,0,.2)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platAv(c,p){ /* andaime: tábuas amarelas sobre tubos de aço (a peça de jogo do prédio em obra) */
  sombraPlat(c,p,3); var x;
  c.fillStyle='#64748b'; c.fillRect(p.x+4,p.y+p.h-2,4,14); c.fillRect(p.x+p.w-8,p.y+p.h-2,4,14); c.strokeStyle='#64748b'; c.lineWidth=2; linha(c,p.x+6,p.y+p.h+12,p.x+p.w-6,p.y+p.h+2);
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#ffd84a','#d97706'); rr(c,p.x,p.y,p.w,p.h,2); c.fill();
  c.strokeStyle='rgba(120,70,0,.35)'; c.lineWidth=1.2; for(x=p.x+22;x<p.x+p.w;x+=22) linha(c,x,p.y+1,x,p.y+p.h-1); c.fillStyle='rgba(255,255,255,.45)'; c.fillRect(p.x+2,p.y+1,p.w-4,2);
  c.fillStyle='#1f2937'; for(x=p.x+8;x<p.x+p.w-4;x+=22) c.fillRect(x,p.y+p.h-3,3,3);
  if(p.w>=90){ var bx=p.x+p.w*.7; c.fillStyle='#ef4444'; rr(c,bx-9,p.y-14,18,14,2); c.fill(); c.fillStyle='#fff'; c.fillRect(bx-6,p.y-10,12,2); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(bx-30,p.y); c.lineTo(bx-25,p.y-18); c.lineTo(bx-21,p.y); c.fill(); c.fillStyle='#fff'; c.fillRect(bx-28,p.y-10,6,3); }
}

/* ---------- registro das cenas ---------- */
A.TH.F.campinho={ceu:ceuCamp,longe:longeCamp,perto:pertoCamp,chao:chaoCamp,plat:platCamp};
A.TH.F.avenida ={ceu:ceuAv,longe:longeAv,perto:pertoAv,chao:chaoAv,plat:platAv};
A.TH.predioAlto=predioAlto; A.TH.igreja=igreja; A.TH.banco=banco; A.TH.alambrado=alambrado;
})();
