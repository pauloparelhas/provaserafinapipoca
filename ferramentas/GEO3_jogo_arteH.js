/* ============================================================
   GEO3_jogo_arteH.js — Guardiões da Casa Maior. Arte nova, rodada 2: as CENAS (1/6).
   Base comum (A.TH) + cena 'rua' (fase 1, U3 S3/S7/S9/S14: rua residencial que vira
   rua comercial, faixa de pedestre com semáforo e os patinhos) + cena 'apto' (fase 2,
   U3 S10: o apartamento da planta visto em corte, um cômodo por andar; o submundo
   mostra a planta baixa).
   Contrato (ARTE_ENCOMENDA_GEO3 §2): cada cena tem ceu / longe / perto / chao / plat;
   chão em y=450; cenário é só desenho (plataformas e colisões não mudam). Embrulha
   A.ceu/longe/perto/chao/plataforma e cai na função anterior para as outras cenas.
   GEO3_jogo_alias.js (carregado depois) aponta vila -> rua, casa/nuvens -> apto etc.
   Tudo por código: sem imagem, sem emoji. Nada pisca (oscilação <= 1,5 Hz).
   Peças estáticas pesadas vão para canvas fora da tela (A.TH.tile).
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING||!A.TB) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, sol=N.sol, nuvemF=N.nuvemF, linha=N.linha,
    arvoreR=N.arvoreR, arbusto=N.arbusto, flor=N.flor, bordas=N.bordas, sombraPlat=N.sombraPlat;
var T=A.TB, txt=T.txt, topoGrama=T.topoGrama, morro=T.morro;
var FONTE='"Nunito","Segoe UI",Arial';

/* ---------- base comum ---------- */
function jogo(){ return window.JOGO&&window.JOGO.J; }
function camY(){ var J=jogo(); return J?(J.camY||0):0; }
function camX(){ var J=jogo(); return J?(J.cam||0):0; }
var TILES={};
/* canvas fora da tela: fn desenha com o chão em y=0 (para cima é negativo), largura w, altura h */
function tile(key,w,h,fn){ var cv=TILES[key]; if(cv) return cv; cv=document.createElement('canvas'); cv.width=Math.ceil(w*2); cv.height=Math.ceil(h*2); var x=cv.getContext('2d'); x.scale(2,2); x.translate(0,h); x.lineJoin='round'; x.lineCap='round'; fn(x); cv.w=w; cv.h=h; TILES[key]=cv; return cv; }
function poe(c,cv,x,y){ c.drawImage(cv,x,y-cv.h,cv.w,cv.h); }
function rotulo(c,s,x,y,px,cor,fundo,w){ c.font='900 '+px+'px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; var tw=w||c.measureText(s).width+px; c.fillStyle=fundo; rr(c,x-tw/2,y-px*.75,tw,px*1.5,px*.3); c.fill(); c.fillStyle=cor; c.fillText(s,x,y+1); }
/* nuvens lentas no céu */
function nuvens(c,t,y0,n,vel){ for(var i=0;i<n;i++){ var x=((i*230+t*(vel||4))%(W+300))-150; nuvemF(c,x,y0+(i%3)*34,.75+(i%2)*.45,'#ffffff','#dbe9f6',.92); } }
/* janela genérica com moldura, vidro e cortina opcional */
function janela(c,x,y,w,h,moldura,seed){
  c.fillStyle=moldura; c.fillRect(x-3,y-3,w+6,h+6);
  c.fillStyle=lin(c,0,y,0,y+h,'#dff3ff','#7fb8dc'); c.fillRect(x,y,w,h);
  c.fillStyle='rgba(255,255,255,.5)'; c.beginPath(); c.moveTo(x,y+h*.5); c.lineTo(x+w*.45,y); c.lineTo(x+w*.7,y); c.lineTo(x,y+h*.8); c.fill();
  c.strokeStyle=moldura; c.lineWidth=2; linha(c,x+w/2,y,x+w/2,y+h);
  if(hash(seed)>.5){ c.fillStyle=['#f87171','#fbbf24','#a78bfa','#34d399'][Math.floor(hash(seed+2)*4)]; c.fillRect(x,y,w*.22,h); c.fillRect(x+w*.78,y,w*.22,h); }
}
/* árvore de rua: copa redonda em dois tons e tronco */
function arvoreRua(c,x,y,h,seed){ var cor=['#3f8f3c','#4f9f44','#5aa84a'][Math.floor(hash(seed)*3)]; arvoreR(c,x,y,h,cor,cla(cor,.25),'#6b4428'); }
/* poste de iluminação com fios */
function poste(c,x,y,h){
  c.fillStyle='#4b5563'; c.fillRect(x-3,y-h,6,h); c.fillStyle='#374151'; c.fillRect(x-6,y-6,12,6);
  c.beginPath(); c.moveTo(x,y-h); c.quadraticCurveTo(x+6,y-h-14,x+30,y-h-12); c.lineTo(x+30,y-h-8); c.quadraticCurveTo(x+8,y-h-10,x+3,y-h+4); c.fill();
  c.fillStyle='#1f2937'; rr(c,x+18,y-h-15,26,8,3); c.fill(); c.fillStyle='#fff7d6'; el(c,x+31,y-h-7,10,3); c.fill();
  c.fillStyle='#6b7280'; c.fillRect(x-7,y-h+30,14,10); c.fillStyle='#9ca3af'; c.fillRect(x-7,y-h+30,14,2);
}
function fios(c,x0,x1,y){ c.strokeStyle='rgba(40,40,50,.55)'; c.lineWidth=1.3; for(var k=0;k<2;k++){ c.beginPath(); c.moveTo(x0,y+k*5); c.quadraticCurveTo((x0+x1)/2,y+16+k*5,x1,y+k*5); c.stroke(); } }
/* placa de sinalização: 'pare' (octógono), 'rua' (nome), 'faixa' (pedestres) */
function placa(c,x,y,tipo,nome){
  c.fillStyle='#6b7280'; c.fillRect(x-2.5,y-84,5,84);
  if(tipo==='pare'){ c.fillStyle='#dc2626'; c.beginPath(); for(var k=0;k<8;k++){ var a=k*TAU/8+PI/8; c.lineTo(x+Math.cos(a)*20,y-100+Math.sin(a)*20); } c.closePath(); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2; c.stroke(); txt(c,'PARE',x,y-99,10,'#fff'); }
  else if(tipo==='faixa'){ c.fillStyle='#2563eb'; rr(c,x-18,y-120,36,36,4); c.fill(); c.fillStyle='#fff'; c.fillRect(x-14,y-96,28,2); c.fillRect(x-14,y-90,28,2); circ(c,x-2,y-112,3.5); c.fill(); c.fillRect(x-5,y-108,6,10); c.fillRect(x-7,y-98,3,8); c.fillRect(x+1,y-98,3,8); }
  else { c.fillStyle='#1d4ed8'; rr(c,x-34,y-100,68,18,3); c.fill(); c.strokeStyle='#fff'; c.lineWidth=1.2; rr(c,x-32,y-98,64,14,2); c.stroke(); txt(c,nome||'RUA DAS FLORES',x,y-91,8,'#fff'); }
}
/* semáforo de pedestre e de carro no mesmo poste; luz muda devagar (período 6 s) */
function semaforo(c,x,y,t){
  var f=((t||0)%6)/6, verde=f<.5, amarelo=f>=.5&&f<.62;
  c.fillStyle='#374151'; c.fillRect(x-3,y-150,6,150); c.fillRect(x-3,y-150,40,5);
  c.fillStyle='#1f2937'; rr(c,x+28,y-150,22,56,5); c.fill();
  [['#ef4444',!verde&&!amarelo],['#f59e0b',amarelo],['#22c55e',verde]].forEach(function(l,i){ c.fillStyle=l[1]?l[0]:esc(l[0],.55); circ(c,x+39,y-139+i*17,6); c.fill(); if(l[1]) brilho(c,x+39,y-139+i*17,16,l[0]==='#22c55e'?'rgba(34,197,94,.45)':(l[0]==='#ef4444'?'rgba(239,68,68,.45)':'rgba(245,158,11,.45)'),1); });
  c.fillStyle='#1f2937'; rr(c,x-14,y-96,28,36,4); c.fill(); /* pedestre: bonequinho vermelho (carros no verde) ou verde */
  var ped=!verde; c.fillStyle=ped?'#22c55e':'#ef4444'; circ(c,x,y-88,3); c.fill(); c.fillRect(x-3,y-84,6,9); if(ped){ c.fillRect(x-6,y-76,4,9); c.fillRect(x+2,y-76,4,9); } else { c.fillRect(x-2,y-76,4,10); }
}
function faixaPedestre(c,x,y,w){ c.fillStyle='#f8fafc'; for(var k=0;k<w;k+=14) c.fillRect(x+k,y,8,22); }
function carro(c,x,y,cor,dir){ c.save(); c.translate(x,y); c.scale(dir||1,1); c.fillStyle='rgba(0,0,0,.25)'; el(c,0,0,34,5); c.fill(); c.fillStyle=cor; rr(c,-32,-18,64,16,5); c.fill(); rr(c,-20,-32,38,18,6); c.fill(); c.fillStyle='#bfe3fa'; rr(c,-16,-30,14,12,3); c.fill(); rr(c,0,-30,15,12,3); c.fill(); c.fillStyle='#1f2937'; circ(c,-18,-2,6); c.fill(); circ(c,18,-2,6); c.fill(); c.fillStyle='#9ca3af'; circ(c,-18,-2,2.5); c.fill(); circ(c,18,-2,2.5); c.fill(); c.fillStyle='#fde68a'; c.fillRect(28,-14,4,4); c.restore(); }
A.TH={tile:tile,poe:poe,rotulo:rotulo,nuvens:nuvens,janela:janela,arvoreRua:arvoreRua,poste:poste,fios:fios,placa:placa,semaforo:semaforo,faixaPedestre:faixaPedestre,carro:carro,jogo:jogo,camX:camX,camY:camY,FONTE:FONTE};

/* ---------- cores das cenas desta parte ---------- */
A.CENAS.rua ={ceu:['#3f9be6','#a9dcf8','#fff2cf'], chaoTop:'#d9d4c8', chao:'#4b4f5a', chaoBase:'#23262e', plat:'#e0a040', platTop:'#f6c860', part:'polen', musica:'pradaria'};
A.CENAS.apto={ceu:['#fbe9d2','#f6dcc0','#e8c8a4'], chaoTop:'#c98a4f', chao:'#8a5a2a', chaoBase:'#4a2c12', plat:'#b07a48', platTop:'#e2b27c', part:'polen', musica:'mapa'};
A.CENAS.sub_apto={ceu:['#1b2a4a','#223a66','#2b4a80'], chaoTop:'#6b7fa0', chao:'#3a4a6a', chaoBase:'#1b2a4a', plat:'#5a6a8a', platTop:'#9fb3d0', part:'polen', musica:'mapa'};

/* ============================================================
   A RUA DO MEU BAIRRO — rua residencial (casas, calçada, poste, árvores, placas,
   croqui U3 S9) que vira rua comercial (lojas com toldo, padaria na esquina,
   faixa de pedestre com semáforo e os patinhos, U3 S3/S7/S14)
   ============================================================ */
function ceuRua(c,t){ ceuG(c,[[0,'#3f9be6'],[.55,'#a9dcf8'],[1,'#fff2cf']]); sol(c,790,80,30,'#fff3c4','rgba(255,244,200,.35)'); nuvens(c,t,56,5,4); }
/* casa residencial: parede pastel, telhado de telhas, porta, janelas, muro baixo com grade e número */
function casa(c,x,y,w,h,seed){
  var par=['#f8e3b0','#f5c9b0','#cfe8f3','#e6e0f5','#d8efc6','#fde68a'][Math.floor(hash(seed)*6)], tel=['#c0503a','#a8432f','#7a5a3a','#5f6f8f'][Math.floor(hash(seed+1)*4)];
  c.fillStyle=lin(c,0,y-h,0,y,cla(par,.2),par); c.fillRect(x,y-h,w,h); c.fillStyle='rgba(0,0,0,.08)'; c.fillRect(x+w-10,y-h,10,h);
  /* telhado */
  c.fillStyle=tel; c.beginPath(); c.moveTo(x-12,y-h+2); c.lineTo(x+18,y-h-28); c.lineTo(x+w-18,y-h-28); c.lineTo(x+w+12,y-h+2); c.closePath(); c.fill();
  c.strokeStyle='rgba(0,0,0,.18)'; c.lineWidth=1; for(var k=1;k<4;k++){ var yy=y-h-28+k*7.5; linha(c,x+18-k*7.5,yy,x+w-18+k*7.5,yy); }
  c.fillStyle=cla(tel,.35); c.fillRect(x-14,y-h,w+28,4);
  if(hash(seed+3)>.5){ c.fillStyle='#8a6a4a'; c.fillRect(x+w-30,y-h-44,10,18); c.fillStyle='#6b4a2a'; c.fillRect(x+w-32,y-h-46,14,4); }
  /* porta e janelas */
  var pw=22, px=x+w*.5-pw/2+ (hash(seed+4)>.5?w*.18:-w*.18); c.fillStyle='#7a4a2a'; rr(c,px,y-50,pw,50,3); c.fill(); c.fillStyle='#fde68a'; circ(c,px+pw-5,y-26,1.8); c.fill(); c.fillStyle='#c9b48e'; c.fillRect(px-4,y-3,pw+8,3);
  var jw=26, jh=24; [x+14,x+w-14-jw].forEach(function(jx,i){ if(jx+jw>px-4&&jx<px+pw+4) return; janela(c,jx,y-h+18,jw,jh,'#f8fafc',seed+10+i); c.fillStyle='#e7b86a'; c.fillRect(jx-5,y-h+45,jw+10,4); if(hash(seed+20+i)>.5){ c.fillStyle='#e04848'; rr(c,jx+4,y-h+36,8,8,2); c.fill(); flor(c,jx+8,y-h+32,2,'#f472b6'); flor(c,jx+14,y-h+33,2,'#fde047'); } });
  /* muro baixo com grade e número da casa */
  c.fillStyle=esc(par,.25); c.fillRect(x-14,y-26,w+28,26); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(x-14,y-26,w+28,3);
  c.strokeStyle='#374151'; c.lineWidth=2; for(var g=x-10;g<x+w+12;g+=9) linha(c,g,y-26,g,y-44); linha(c,x-14,y-44,x+w+14,y-44);
  c.fillStyle='#1f2937'; rr(c,x+w-30,y-20,18,10,2); c.fill(); txt(c,String(Math.floor(hash(seed+5)*80)*4+12),x+w-21,y-15,7,'#fff');
}
/* loja com toldo listrado, vitrine e letreiro */
function loja(c,x,y,w,h,seed,nome,cor,esq){
  var par=['#fff1d6','#fde2e2','#e3f2fd','#f3e8ff','#e8f5e9'][Math.floor(hash(seed)*5)];
  c.fillStyle=lin(c,0,y-h,0,y,cla(par,.1),par); c.fillRect(x,y-h,w,h); c.fillStyle=esc(par,.2); c.fillRect(x,y-h-8,w,8);
  /* andar de cima: janelas */
  for(var jx=x+12;jx<x+w-30;jx+=42) janela(c,jx,y-h+14,24,24,'#64748b',seed+jx);
  /* letreiro */
  c.fillStyle=cor; rr(c,x+4,y-78,w-8,22,4); c.fill(); c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(x+4,y-78,w-8,3); txt(c,nome,x+w/2,y-67,12,'#fff');
  /* toldo */
  var tc=[cor,'#fff']; c.save(); c.beginPath(); c.rect(x-6,y-56,w+12,18); c.clip(); for(var k=0;k<w+12;k+=14){ c.fillStyle=tc[(k/14)%2]; c.fillRect(x-6+k,y-56,14,18); } c.restore();
  c.fillStyle='rgba(0,0,0,.12)'; c.fillRect(x-6,y-40,w+12,2); for(k=0;k<w+12;k+=14){ c.fillStyle=tc[(k/14)%2]; c.beginPath(); c.arc(x+1+k,y-38,7,0,PI); c.fill(); }
  /* vitrine e porta */
  c.fillStyle=lin(c,0,y-36,0,y,'#dff3ff','#9cc8e4'); c.fillRect(x+6,y-36,w*.55,36); c.strokeStyle='#64748b'; c.lineWidth=2; c.strokeRect(x+6,y-36,w*.55,36);
  if(esq){ /* padaria: pães na vitrine */ c.fillStyle='#d9842c'; for(k=0;k<4;k++){ el(c,x+16+k*14,y-16,6,4); c.fill(); el(c,x+20+k*14,y-26,5,3.5); c.fill(); } c.fillStyle='#fde68a'; for(k=0;k<3;k++){ el(c,x+22+k*16,y-9,5,2.5); c.fill(); } }
  else { c.fillStyle=['#f472b6','#60a5fa','#fbbf24','#34d399'][Math.floor(hash(seed+7)*4)]; for(k=0;k<3;k++){ rr(c,x+14+k*16,y-28+hash(seed+k)*6,10,14,2); c.fill(); } }
  c.fillStyle='#374151'; rr(c,x+w*.55+14,y-40,24,40,3); c.fill(); c.fillStyle='#bfe3fa'; rr(c,x+w*.55+17,y-37,18,28,2); c.fill();
}
function longeRua(c,cam,t){
  morro(c,330,14,.006,cam*.4,'#bcdcc8'); c.fillStyle='#a9d39c'; c.fillRect(0,392,W,H-392);
  rep(cam,1300,function(ox){ if(ox>W+60||ox<-1360) return;
    /* casinhas ao longe, a igreja e um prédio alto (pontos de referência do bairro, U3 S14/S19) */
    for(var k=0;k<9;k++){ var x=ox+30+k*140, h=28+hash(k*3)*14, w=44+hash(k)*20, par=['#f8e3b0','#f5c9b0','#cfe8f3','#e6e0f5','#d8efc6'][k%5];
      if(k===4){ c.fillStyle='#e5e7eb'; c.fillRect(x,392-120,46,120); c.fillStyle='#93c5fd'; for(var r=0;r<9;r++) for(var q=0;q<3;q++) c.fillRect(x+6+q*13,392-112+r*12,8,7); c.fillStyle='#9ca3af'; c.fillRect(x-3,392-124,52,5); continue; }
      if(k===7){ c.fillStyle='#f4ead6'; c.fillRect(x,392-54,60,54); c.fillRect(x+20,392-92,20,40); c.fillStyle='#b45309'; c.beginPath(); c.moveTo(x+16,392-92); c.lineTo(x+30,392-110); c.lineTo(x+44,392-92); c.fill(); c.beginPath(); c.moveTo(x-6,392-54); c.lineTo(x+30,392-72); c.lineTo(x+66,392-54); c.fill(); c.strokeStyle='#92400e'; c.lineWidth=2; linha(c,x+30,392-110,x+30,392-120); linha(c,x+25,392-116,x+35,392-116); c.fillStyle='#7a4a2a'; rr(c,x+24,392-26,12,26,5); c.fill(); continue; }
      c.fillStyle=par; c.fillRect(x,392-h,w,h); c.fillStyle=['#c0503a','#7a5a3a','#5f6f8f'][k%3]; c.beginPath(); c.moveTo(x-5,392-h); c.lineTo(x+w/2,392-h-16); c.lineTo(x+w+5,392-h); c.fill(); c.fillStyle='#7fb8dc'; c.fillRect(x+8,392-h+8,10,9); c.fillRect(x+w-18,392-h+8,10,9);
      if(hash(k*5)>.4) arvoreR(c,x+w+14,394,34+hash(k)*14,'#4f9f44','#6fbf5a','#6b4428'); }
  });
  bruma(c,300,452,'rgba(255,242,207,.4)');
}
/* quarteirão residencial (750 px) e quarteirão comercial (750 px), estáticos, em cache */
function blocoRes(x){ casa(x,60,0,160,92,1); arvoreRua(x,250,0,120,2); casa(x,290,0,150,84,3); poste(x,470,0,170); casa(x,520,0,170,96,5); arvoreRua(x,720,0,140,6); fios(x,100,470,-168); fios(x,470,900,-168); placa(x,690,0,'pare'); arbusto(x,240,0,34,'#3f8a3c','#5fae4f',['#f472b6','#fff'],11); }
function blocoCom(x){ placa(x,30,0,'rua','RUA DAS FLORES'); loja(x,120,0,190,96,20,'PADARIA','#d97706',true); loja(x,330,0,150,90,21,'MERCADO','#16a34a'); poste(x,500,0,170); loja(x,520,0,150,96,22,'FARMÁCIA','#dc2626'); loja(x,690,0,140,88,23,'FLORES','#db2777'); fios(x,120,500,-168); fios(x,500,900,-168); placa(x,-30,0,'faixa'); }
function pertoRua(c,cam,t){
  var tr=tile('rua_res',760,300,blocoRes), tc=tile('rua_com',760,300,blocoCom);
  rep(cam,1500,function(ox){ if(ox>W+80||ox<-1560) return;
    poe(c,tr,ox,452); poe(c,tc,ox+750,452);
    /* a faixa de pedestre com semáforo e os patinhos do trânsito (U3 S15), entre os dois quarteirões */
    semaforo(c,ox+742,452,t);
    if(A.patinho){ var f=((t%6)/6), anda=f>=.5; for(var p=0;p<3;p++){ var px=ox+700+p*16+(anda?Math.min(40,(f-.5)*2*90):0); A.patinho(c,px,452,t+p,1,1); } }
    /* carros parados ou passando devagar */
    carro(c,ox+1180+Math.sin(t*.3)*8,452,'#2563eb',1);
  });
}
function chaoRua(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  /* calçada de placas de concreto, meio-fio, asfalto com faixa amarela e sarjeta */
  c.fillStyle=lin(c,0,s.y,0,s.y+18,'#e6e2d8','#c9c4b8'); c.fillRect(s.x,s.y,s.w,18);
  c.strokeStyle='rgba(90,85,75,.35)'; c.lineWidth=1.2; for(x=grade(a,40);x<b;x+=40) linha(c,x,s.y+2,x,s.y+16); linha(c,s.x,s.y+1,s.x+s.w,s.y+1);
  c.fillStyle='#8f8a80'; c.fillRect(s.x,s.y+18,s.w,6); c.fillStyle='#fde047'; for(x=grade(a,60);x<b;x+=60) c.fillRect(x,s.y+18,30,6);
  c.fillStyle=lin(c,0,s.y+24,0,s.y+Math.min(s.h,160),'#4b4f5a','#2a2d35'); c.fillRect(s.x,s.y+24,s.w,s.h-24);
  c.fillStyle='rgba(255,255,255,.07)'; for(x=grade(a,36);x<b;x+=36){ if(hash(x)>.6) c.fillRect(x+hash(x+1)*20,s.y+30+hash(x+2)*40,3,2); }
  if(s.h>52){ c.fillStyle='#f5c518'; for(x=grade(a,48);x<b;x+=48) c.fillRect(x,s.y+54,26,4); }
  if(s.h>80){ c.fillStyle='#e5e7eb'; for(x=grade(a,34);x<b;x+=34){ if(hash(x*.7)>.5) c.fillRect(x,s.y+82,16,3); } }
  /* bueiro de vez em quando e uma flor na calçada */
  for(x=grade(a,220);x<b;x+=220){ var bx=x+hash(x)*150; c.fillStyle='#1f2937'; rr(c,bx,s.y+26,22,6,2); c.fill(); c.fillStyle='#4b5563'; for(var k=0;k<4;k++) c.fillRect(bx+3+k*5,s.y+27,2,4); }
  bordas(c,s,'rgba(20,20,30,.4)'); c.fillStyle='rgba(0,0,0,.2)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platRua(c,p){
  sombraPlat(c,p,4); var x, k=hash(p.x*.13+p.y*.07);
  if(k>.5){ /* toldo de loja: listras e babado */
    var cor=['#d97706','#16a34a','#dc2626','#2563eb'][Math.floor(hash(p.y)*4)];
    c.fillStyle='#4b5563'; c.fillRect(p.x+6,p.y+p.h-2,4,10); c.fillRect(p.x+p.w-10,p.y+p.h-2,4,10);
    c.save(); c.beginPath(); rr(c,p.x,p.y,p.w,p.h,3); c.clip(); for(x=p.x;x<p.x+p.w;x+=14){ c.fillStyle=((x-p.x)/14)%2?'#fff':cor; c.fillRect(x,p.y,14,p.h); } c.restore();
    c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(p.x,p.y,p.w,3); c.fillStyle='rgba(0,0,0,.15)'; c.fillRect(p.x,p.y+p.h-3,p.w,3);
    for(x=p.x;x<p.x+p.w;x+=14){ c.fillStyle=((x-p.x)/14)%2?'#fff':cor; c.beginPath(); c.arc(x+7,p.y+p.h,6,0,PI); c.fill(); }
  } else { /* mureta de tijolinhos com tampa de concreto e vaso de flor */
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#d9825a','#9a4a2a'); rr(c,p.x,p.y+4,p.w,p.h-4,2); c.fill();
    c.strokeStyle='rgba(255,230,200,.35)'; c.lineWidth=1; for(var r=0;r<Math.floor(p.h/8);r++){ var yy=p.y+8+r*8; linha(c,p.x,yy,p.x+p.w,yy); for(x=p.x+((r%2)*10);x<p.x+p.w;x+=20) linha(c,x,yy-8,x,yy); }
    c.fillStyle=lin(c,0,p.y,0,p.y+6,'#f1efe9','#c9c4b8'); rr(c,p.x-3,p.y,p.w+6,7,2); c.fill(); c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(p.x-1,p.y+1,p.w+2,1.5);
    if(p.w>=90){ var vx=p.x+p.w*.7; c.fillStyle='#c2410c'; c.beginPath(); c.moveTo(vx-9,p.y-14); c.lineTo(vx+9,p.y-14); c.lineTo(vx+7,p.y); c.lineTo(vx-7,p.y); c.fill(); c.fillStyle='#22c55e'; el(c,vx-5,p.y-19,5,3); c.fill(); el(c,vx+5,p.y-20,5,3); c.fill(); flor(c,vx,p.y-24,3,'#f472b6'); }
  }
}

/* ============================================================
   A PLANTA DA MINHA CASA — o apartamento da planta (U3 S10) em corte: sacada,
   quarto, sala, escritório, cozinha e banheiro, um cômodo por andar; a câmera
   sobe junto (paralaxe vertical 1:1 para ler como um corte de verdade)
   ============================================================ */
var COMODOS=[['SACADA','#bfe6ff','#8ec9ee'],['QUARTO','#f6dcef','#e9b8d9'],['SALA','#fdebc8','#f3cf8e'],['ESCRITÓRIO','#dbeafe','#b4cdf5'],['COZINHA','#dcfce7','#a9e2bc'],['BANHEIRO','#e0f2fe','#a9d5ee']];
var ANDAR=255, ALT=6*ANDAR;
function ceuApto(c,t){ ceuG(c,[[0,'#9fd3f5'],[.5,'#cfe8f8'],[1,'#f5e7cc']]); nuvens(c,t,40,4,3); }
function moveisComodo(c,i,y0,x0,w){ /* y0 = teto do cômodo; chão do cômodo em y0+ANDAR; tudo estático */
  var yc=y0+ANDAR-14, k;
  if(i===0){ /* sacada: grade, vaso, vista com telhados do bairro */
    c.fillStyle='#bfe6ff'; c.fillRect(x0,y0,w,ANDAR); c.fillStyle='#9fd3f5'; c.fillRect(x0,y0,w,ANDAR*.55); for(k=0;k<6;k++){ var hx=x0+40+k*150; c.fillStyle='#f5c9b0'; c.fillRect(hx,y0+112,60,30); c.fillStyle='#c0503a'; c.beginPath(); c.moveTo(hx-6,y0+112); c.lineTo(hx+30,y0+92); c.lineTo(hx+66,y0+112); c.fill(); }
    c.fillStyle='#4f9f44'; for(k=0;k<5;k++){ circ(c,x0+110+k*170,y0+130,16); c.fill(); }
    c.strokeStyle='#64748b'; c.lineWidth=3; for(k=x0;k<x0+w;k+=18) linha(c,k,yc-70,k,yc); c.lineWidth=5; linha(c,x0,yc-72,x0+w,yc-72);
    c.fillStyle='#c2410c'; c.fillRect(x0+120,yc-34,30,34); c.fillStyle='#22c55e'; circ(c,x0+135,yc-44,18); c.fill(); flor(c,x0+128,yc-50,4,'#f472b6'); flor(c,x0+144,yc-46,4,'#fde047');
    c.fillStyle='#8a5a34'; c.fillRect(x0+300,yc-40,70,6); c.fillRect(x0+304,yc-34,6,34); c.fillRect(x0+360,yc-34,6,34); c.fillStyle='#fbbf24'; c.fillRect(x0+296,yc-46,78,8);
  }
  if(i===1){ /* quarto: cama, criado-mudo, abajur, quadro */
    c.fillStyle='#7a4a2a'; c.fillRect(x0+80,yc-62,120,8); c.fillRect(x0+84,yc-54,8,54); c.fillRect(x0+188,yc-54,8,54);
    c.fillStyle='#f8fafc'; rr(c,x0+84,yc-48,112,20,4); c.fill(); c.fillStyle='#60a5fa'; rr(c,x0+84,yc-34,112,30,4); c.fill(); c.fillStyle='#fff'; rr(c,x0+90,yc-56,34,12,4); c.fill();
    c.fillStyle='#8a5a34'; c.fillRect(x0+220,yc-40,36,40); c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(x0+230,yc-66); c.lineTo(x0+246,yc-66); c.lineTo(x0+250,yc-50); c.lineTo(x0+226,yc-50); c.fill(); c.fillStyle='#4b5563'; c.fillRect(x0+237,yc-50,2,10);
    c.fillStyle='#d97706'; c.fillRect(x0+330,y0+60,60,46); c.fillStyle='#bfe6ff'; c.fillRect(x0+335,y0+65,50,36); c.fillStyle='#4f9f44'; circ(c,x0+360,y0+90,10); c.fill();
  }
  if(i===2){ /* sala: sofá, mesinha redonda, tapete, estante, televisão */
    c.fillStyle='#c2410c'; rr(c,x0+40,yc-30,160,30,6); c.fill(); c.fillStyle='#ea580c'; rr(c,x0+40,yc-58,160,30,6); c.fill(); rr(c,x0+40,yc-62,22,62,6); c.fill(); rr(c,x0+178,yc-62,22,62,6); c.fill(); c.fillStyle='#fde68a'; rr(c,x0+70,yc-54,40,22,5); c.fill(); c.fillStyle='#22c55e'; rr(c,x0+120,yc-54,40,22,5); c.fill();
    c.fillStyle='#8a5a34'; el(c,x0+290,yc-30,40,12); c.fill(); c.fillRect(x0+286,yc-30,8,30); c.fillStyle='#fde047'; el(c,x0+290,yc-34,10,4); c.fill();
    c.fillStyle='#1f2937'; rr(c,x0+380,y0+70,90,56,4); c.fill(); c.fillStyle='#60a5fa'; c.fillRect(x0+386,y0+76,78,44); c.fillStyle='#8a5a34'; c.fillRect(x0+370,y0+130,110,8);
  }
  if(i===3){ /* escritório: mesa, cadeira, computador, estante e mapa na parede */
    c.fillStyle='#8a5a34'; c.fillRect(x0+120,yc-46,150,8); c.fillRect(x0+126,yc-38,8,38); c.fillRect(x0+256,yc-38,8,38);
    c.fillStyle='#374151'; rr(c,x0+170,yc-80,50,34,3); c.fill(); c.fillStyle='#bfe3fa'; c.fillRect(x0+174,yc-76,42,26); c.fillStyle='#374151'; c.fillRect(x0+192,yc-46,6,6);
    c.fillStyle='#2563eb'; rr(c,x0+60,yc-50,36,20,4); c.fill(); c.fillRect(x0+64,yc-30,6,30); c.fillRect(x0+86,yc-30,6,30); rr(c,x0+58,yc-80,12,34,3); c.fill();
    c.fillStyle='#f4ead6'; c.fillRect(x0+330,y0+50,110,76); c.strokeStyle='#92400e'; c.lineWidth=3; c.strokeRect(x0+330,y0+50,110,76); c.strokeStyle='#64748b'; c.lineWidth=1.5; for(k=0;k<3;k++){ linha(c,x0+330,y0+70+k*18,x0+440,y0+70+k*18); linha(c,x0+356+k*28,y0+50,x0+356+k*28,y0+126); } c.fillStyle='#ef4444'; circ(c,x0+384,y0+88,4); c.fill();
  }
  if(i===4){ /* cozinha: pia, fogão, geladeira, armários */
    c.fillStyle='#e5e7eb'; c.fillRect(x0+40,yc-50,200,50); c.fillStyle='#9ca3af'; c.fillRect(x0+40,yc-54,200,6); c.fillStyle='#60a5fa'; rr(c,x0+70,yc-50,60,10,3); c.fill(); c.strokeStyle='#64748b'; c.lineWidth=3; c.beginPath(); c.moveTo(x0+100,yc-54); c.quadraticCurveTo(x0+100,yc-74,x0+112,yc-70); c.stroke();
    c.fillStyle='#f8fafc'; c.fillRect(x0+160,yc-50,60,50); c.fillStyle='#1f2937'; for(k=0;k<2;k++){ circ(c,x0+176+k*28,yc-52,7); c.fill(); } c.fillStyle='#374151'; c.fillRect(x0+160,yc-30,60,3);
    c.fillStyle='#bfdbfe'; rr(c,x0+300,yc-110,60,110,4); c.fill(); c.fillStyle='#93c5fd'; c.fillRect(x0+300,yc-70,60,3); c.fillStyle='#1f2937'; c.fillRect(x0+352,yc-100,3,22); c.fillRect(x0+352,yc-60,3,30);
    c.fillStyle='#d97706'; for(k=0;k<3;k++){ rr(c,x0+40+k*66,y0+60,60,40,3); c.fill(); c.fillStyle='#92400e'; c.fillRect(x0+64+k*66,y0+78,12,3); c.fillStyle='#d97706'; }
  }
  if(i===5){ /* banheiro: azulejos, pia, vaso, chuveiro, cortina */
    c.fillStyle='#bae6fd'; c.fillRect(x0,y0+ANDAR*.5,w,ANDAR*.5); c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=1.5; for(k=x0;k<x0+w;k+=30) linha(c,k,y0+ANDAR*.5,k,y0+ANDAR); for(k=y0+ANDAR*.5;k<y0+ANDAR;k+=30) linha(c,x0,k,x0+w,k);
    c.fillStyle='#f8fafc'; rr(c,x0+60,yc-40,60,14,5); c.fill(); c.fillRect(x0+80,yc-26,20,26); c.fillStyle='#9ca3af'; c.fillRect(x0+88,yc-50,4,10);
    c.fillStyle='#f8fafc'; rr(c,x0+180,yc-30,30,30,6); c.fill(); rr(c,x0+176,yc-44,38,14,4); c.fill(); c.fillStyle='#9ca3af'; c.fillRect(x0+200,yc-52,8,8);
    c.strokeStyle='#9ca3af'; c.lineWidth=4; linha(c,x0+330,y0+70,x0+330,y0+110); c.fillStyle='#9ca3af'; el(c,x0+330,y0+112,14,5); c.fill(); c.fillStyle='rgba(125,211,252,.5)'; for(k=0;k<5;k++) c.fillRect(x0+320+k*5,y0+120,2,26);
    c.fillStyle='#f472b6'; for(k=0;k<6;k++) c.fillRect(x0+360+k*14,y0+60,10,150); c.fillStyle='#9ca3af'; c.fillRect(x0+300,y0+56,160,4);
  }
}
var APTO=null;
function fundoApto(){ if(APTO) return APTO; var cv=document.createElement('canvas'); cv.width=W*2; cv.height=ALT*2; var c=cv.getContext('2d'); c.scale(2,2); c.lineJoin='round';
  for(var i=0;i<6;i++){ var y0=i*ANDAR, cm=COMODOS[i]; c.fillStyle=lin(c,0,y0,0,y0+ANDAR,cm[1],cm[2]); c.fillRect(0,y0,W,ANDAR);
    if(i!==0&&i!==5){ c.fillStyle='rgba(255,255,255,.18)'; for(var py=y0+20;py<y0+ANDAR;py+=40) for(var px=(py/40%2)*30;px<W;px+=60){ circ(c,px,py,5); c.fill(); } }
    c.fillStyle='rgba(120,70,30,.35)'; c.fillRect(0,y0+ANDAR-14,W,14); c.fillStyle='rgba(60,35,15,.5)'; c.fillRect(0,y0,W,8); /* laje entre andares */
    c.save(); c.translate(0,0); moveisComodo(c,i,y0,0,W); c.restore();
    if(i!==5){ /* escada entre os andares, no canto direito */ c.fillStyle='#8a5a34'; for(var d=0;d<6;d++) c.fillRect(W-150+d*22,y0+ANDAR-14-d*22,22,8); }
    c.save(); c.font='900 15px '+FONTE; c.textAlign='left'; c.textBaseline='middle'; var tw=c.measureText(cm[0]).width+20; c.fillStyle='#1e3a8a'; rr(c,16,y0+22,tw,26,6); c.fill(); c.fillStyle='#fff'; c.fillText(cm[0],26,y0+36); c.restore();
  }
  APTO=cv; return cv; }
function longeApto(c,cam,t){
  /* o corte do prédio sobe e desce com a câmera (1:1 no eixo y); de lado, paralaxe leve */
  var cv=fundoApto(), cy=camY(), ox=-(cam*.3%120);
  var vis=Math.min(ALT,H+cy), y0=Math.max(0,cy); if(vis>y0) c.drawImage(cv,0,y0*2,W*2,(vis-y0)*2,0,y0-cy,W,vis-y0);
  c.fillStyle='rgba(0,0,0,.06)'; for(var x=ox;x<W;x+=120) c.fillRect(x,0,2,H);
}
function pertoApto(c,cam,t){ /* vasos e luminárias que passam na frente, leves */
  rep(cam,900,function(ox){ if(ox>W+40||ox<-940) return; var cy=camY(), b=Math.sin(t*.8+ox*.01)*2;
    c.fillStyle='rgba(0,0,0,.18)'; el(c,ox+200,452,24,4); c.fill(); c.fillStyle='#c2410c'; c.beginPath(); c.moveTo(ox+188,452-30); c.lineTo(ox+212,452-30); c.lineTo(ox+208,452); c.lineTo(ox+192,452); c.fill(); c.fillStyle='#22c55e'; el(c,ox+192,452-36+b,8,5); c.fill(); el(c,ox+208,452-38+b,8,5); c.fill(); el(c,ox+200,452-44+b,6,8); c.fill();
    c.strokeStyle='#374151'; c.lineWidth=2; linha(c,ox+640,0,ox+640,80); c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(ox+624,80); c.lineTo(ox+656,80); c.lineTo(ox+650,100); c.lineTo(ox+630,100); c.fill(); brilho(c,ox+640,110,50,'rgba(255,230,150,.25)',1);
  });
}
function chaoApto(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  /* piso de tábuas (ou azulejo no andar de baixo) sobre a laje */
  var az=s.y>ALT-ANDAR-40; c.fillStyle=lin(c,0,s.y,0,s.y+14,az?'#dff3ff':'#d9a066',az?'#a9d5ee':'#a86a34'); c.fillRect(s.x,s.y,s.w,14);
  c.strokeStyle=az?'rgba(255,255,255,.8)':'rgba(90,50,20,.4)'; c.lineWidth=1.2; for(x=grade(a,az?28:60);x<b;x+=(az?28:60)) linha(c,x,s.y+1,x,s.y+13); linha(c,s.x,s.y+7,s.x+s.w,s.y+7);
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(s.x,s.y,s.w,2);
  c.fillStyle=lin(c,0,s.y+14,0,s.y+Math.min(s.h,120),'#8a5a2a','#4a2c12'); c.fillRect(s.x,s.y+14,s.w,s.h-14);
  c.fillStyle='rgba(0,0,0,.12)'; for(x=grade(a,90);x<b;x+=90) c.fillRect(x+hash(x)*40,s.y+24,40,s.h-40); /* vigas */
  bordas(c,s,'rgba(50,25,10,.4)'); c.fillStyle='rgba(0,0,0,.2)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platApto(c,p){
  sombraPlat(c,p,4); var x, k=hash(p.x*.11+p.y*.05);
  if(k>.5){ /* prateleira de madeira com livros, vaso e porta-retrato */
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#d6a46a','#8a5a2a'); rr(c,p.x,p.y,p.w,p.h,3); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(p.x+2,p.y+1,p.w-4,1.5);
    c.fillStyle='#5a3a1a'; c.fillRect(p.x+6,p.y+p.h,4,10); c.fillRect(p.x+p.w-10,p.y+p.h,4,10);
    for(x=p.x+6;x<p.x+p.w*.5;){ var bw=5+hash(x)*4; c.fillStyle=['#c0392b','#2c6fb5','#2f8f57','#e0a020','#7b4fa8'][Math.floor(hash(x*3.1)*5)]; c.fillRect(x,p.y-16-hash(x+1)*4,bw,16+hash(x+1)*4); x+=bw+1; }
    var vx=p.x+p.w*.72; c.fillStyle='#c2410c'; c.beginPath(); c.moveTo(vx-7,p.y-12); c.lineTo(vx+7,p.y-12); c.lineTo(vx+5,p.y); c.lineTo(vx-5,p.y); c.fill(); c.fillStyle='#22c55e'; el(c,vx,p.y-17,8,4); c.fill(); el(c,vx,p.y-22,4,6); c.fill();
  } else { /* bancada/mesa com toalha xadrez e caneca */
    c.fillStyle='#8a5a34'; c.fillRect(p.x+5,p.y+p.h-2,5,12); c.fillRect(p.x+p.w-10,p.y+p.h-2,5,12);
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#f8fafc','#cbd5e1'); rr(c,p.x,p.y,p.w,p.h,3); c.fill();
    c.save(); c.beginPath(); rr(c,p.x,p.y,p.w,Math.min(p.h,10),3); c.clip(); c.fillStyle='#ef4444'; for(x=p.x;x<p.x+p.w;x+=12) for(var j=0;j<2;j++) if((((x-p.x)/12|0)+j)%2===0) c.fillRect(x,p.y+j*5,12,5); c.restore();
    if(p.w>=90){ var mx=p.x+p.w*.3; c.fillStyle='#2563eb'; rr(c,mx-7,p.y-14,14,14,3); c.fill(); c.strokeStyle='#2563eb'; c.lineWidth=2.5; c.beginPath(); c.arc(mx+9,p.y-7,4,-PI/2,PI/2); c.stroke(); c.fillStyle='#fbbf24'; circ(c,p.x+p.w*.7,p.y-6,6); c.fill(); c.fillStyle='#22c55e'; el(c,p.x+p.w*.7+3,p.y-13,4,2); c.fill(); }
  }
}
/* submundo da fase 2: a planta baixa (U3 S10) desenhada grande na parede, como o Bem-te-vi vê de cima */
var PLANTA=null;
function planta(){ if(PLANTA) return PLANTA; var cv=document.createElement('canvas'); cv.width=W*2; cv.height=H*2; var c=cv.getContext('2d'); c.scale(2,2); c.lineJoin='round';
  ceuG(c,[[0,'#1b2a4a'],[.6,'#223a66'],[1,'#2b4a80']]);
  var X=250, Y=70, S=.78; c.save(); c.translate(X,Y); c.scale(S,S);
  c.fillStyle='#f8fafc'; rr(c,-20,-20,560,440,10); c.fill(); c.fillStyle='rgba(0,0,0,.25)'; rr(c,-14,-14,560,440,10); c.fill(); c.fillStyle='#f8fafc'; rr(c,-20,-20,560,440,10); c.fill();
  c.strokeStyle='#1f2937'; c.lineWidth=7; c.strokeRect(0,40,520,340);
  c.fillStyle='#bfe6ff'; c.fillRect(0,0,340,40); c.strokeStyle='#1f2937'; c.lineWidth=3; c.strokeRect(0,0,340,40);
  c.lineWidth=7; linha(c,200,40,200,200); linha(c,0,200,200,200); linha(c,260,250,520,250); linha(c,260,250,260,380); linha(c,0,300,170,300); linha(c,170,300,170,380);
  var P=[['SACADA',170,22,'#0c4a6e'],['QUARTO',100,130,'#9d174d'],['SALA',380,120,'#92400e'],['ESCRITÓRIO',100,250,'#1e3a8a'],['COZINHA',390,300,'#166534'],['BANHEIRO',85,345,'#0c4a6e']];
  c.strokeStyle='#64748b'; c.lineWidth=2.5; c.strokeRect(40,60,90,70); c.strokeRect(40,220,60,30); c.strokeRect(430,60,70,110); c.beginPath(); c.arc(360,180,24,0,TAU); c.stroke(); c.strokeRect(280,270,120,40); c.strokeRect(20,310,80,24); c.strokeRect(120,340,30,30);
  P.forEach(function(p){ c.font='900 20px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle=p[3]; c.fillText(p[0],p[1],p[2]); });
  c.fillStyle='#dc2626'; c.beginPath(); c.moveTo(230,420); c.lineTo(230,390); c.lineTo(220,400); c.moveTo(230,390); c.lineTo(240,400); c.stroke(); c.strokeStyle='#dc2626'; c.lineWidth=4; c.beginPath(); c.moveTo(230,425); c.lineTo(230,392); c.stroke();
  c.restore();
  c.save(); c.font='900 18px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#fde68a'; c.fillText('A PLANTA DA MINHA CASA',W/2,36); c.fillStyle='rgba(255,255,255,.75)'; c.font='700 13px '+FONTE; c.fillText('vista de cima, como o Bem-te-vi vê',W/2,58); c.restore();
  PLANTA=cv; return cv; }
var sub0=A.fundoSub;
A.fundoSub=function(c,cena,cam,t){
  var real=cena; try{ var J=jogo(); if(J&&J.mundo&&J.mundo.cena) real=J.mundo.cena; }catch(e){}
  if(cena==='sub_apto'||real==='sub_arquivo'){ c.save(); c.drawImage(planta(),0,0,W,H); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(0,0,W,H);
    rep(cam||0,320,function(ox){ var lx=ox+160; c.strokeStyle='#1f2937'; c.lineWidth=1.5; linha(c,lx,0,lx,56); c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(lx-14,56); c.lineTo(lx+14,56); c.lineTo(lx+9,70); c.lineTo(lx-9,70); c.fill(); brilho(c,lx,80,110,'rgba(255,230,150,.22)',1); });
    c.restore(); return; }
  if(sub0) sub0(c,cena,cam,t);
};

/* ---------- embrulho das funções de cena ---------- */
var F={
  rua:{ceu:ceuRua,longe:longeRua,perto:pertoRua,chao:chaoRua,plat:platRua},
  apto:{ceu:ceuApto,longe:longeApto,perto:pertoApto,chao:chaoApto,plat:platApto}
};
A.TH.F=F; A.TH.casa=casa; A.TH.loja=loja;
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma;
A.ceu=function(c,cena,t){ var f=F[cena]; if(f){ c.save(); f.ceu(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.longe(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.perto(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.chao=function(c,s,cena){ var f=F[cena]; if(f){ c.save(); f.chao(c,s); c.restore(); return; } chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ var f=F[cena]; if(f){ c.save(); f.plat(c,p); c.restore(); return; } plat0(c,p,cena); };
})();
