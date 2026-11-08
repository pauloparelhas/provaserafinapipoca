/* ============================================================
   GEO3_jogo_arteH3.js — Guardiões da Casa Maior. Cenas 3/6:
   'pampa' (fase 6, U4 S13: campos com capim baixo, gado, quero-quero, ema,
   capim-dos-pampas, cerca e porteira; cavalo crioulo) e 'pantanal' (fase 7, U4 S14:
   área alagada — a fase é de nado: acima da água, a margem com bromélias, tuiuiú e
   capivaras; o jacaré boia na superfície; embaixo, plantas da água e peixes).
   Mesmo contrato de GEO3_jogo_arteH.js (A.TH). Sem imagem, sem emoji, nada pisca.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING||!A.TB||!A.TH) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, sol=N.sol, nuvemF=N.nuvemF, raios=N.raios, linha=N.linha,
    arvoreR=N.arvoreR, arbusto=N.arbusto, flor=N.flor, bolha=N.bolha, bordas=N.bordas, sombraPlat=N.sombraPlat;
var T=A.TB, txt=T.txt, topoGrama=T.topoGrama, morro=T.morro, morroY=T.morroY;
var TH=A.TH, tile=TH.tile, poe=TH.poe, nuvens=TH.nuvens, jogo=TH.jogo, FONTE=TH.FONTE;

A.CENAS.pampa   ={ceu:['#4aa8ee','#bfe5fa','#fff1c8'], chaoTop:'#7cc85a', chao:'#9a5a30', chaoBase:'#5a2e14', plat:'#c98a4f', platTop:'#e8b878', part:'polen', musica:'floresta'};
A.CENAS.pantanal={ceu:['#7cc8ee','#3fae9e','#0b3d45'], chaoTop:'#b8a060', chao:'#8a7040', chaoBase:'#4a3a20', plat:'#6b5a3a', platTop:'#6faa4a', part:'', musica:'agua'};

/* ============================================================
   PAMPA — campo aberto, coxilhas, gado, ema, quero-quero, capim-dos-pampas
   ============================================================ */
function ceuPampa(c,t){ ceuG(c,[[0,'#4aa8ee'],[.55,'#bfe5fa'],[1,'#fff1c8']]); sol(c,760,90,32,'#fff3c4','rgba(255,244,200,.35)'); nuvens(c,t,50,6,5); }
/* capim-dos-pampas: touceira verde com plumas claras que balançam devagar */
function capimPampas(c,x,y,h,t,seed){
  var sw=Math.sin((t||0)*.9+seed)*3; c.strokeStyle='#8fbf5a'; c.lineWidth=2;
  for(var k=0;k<7;k++){ var a=(k-3)*.18; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+a*30,y-h*.5,x+a*60+sw,y-h*(.8+hash(seed+k)*.2)); c.stroke(); }
  for(k=0;k<4;k++){ var px=x+(k-1.5)*16+sw, py=y-h-6-hash(seed+k*3)*14; c.strokeStyle='#8a6a3a'; c.lineWidth=1.5; linha(c,x+(k-1.5)*6,y-h*.6,px,py+8); c.fillStyle='#f7efe0'; el(c,px,py,5,14); c.fill(); c.fillStyle='rgba(255,255,255,.7)'; el(c,px-1.5,py-3,2.5,8); c.fill(); }
}
function gado(c,x,y,s,dir,t,seed){ /* boi malhado, marrom e branco, pastando */
  c.save(); c.translate(x,y); c.scale(dir*s,s); var come=Math.sin(t*.7+seed)>.2, hy=come?-8:-18;
  c.fillStyle='rgba(0,0,0,.18)'; el(c,0,0,22,4); c.fill();
  c.fillStyle='#b5651d'; el(c,0,-15,19,10); c.fill(); c.fillStyle='#f8f1e6'; el(c,-6,-16,8,6); c.fill(); el(c,8,-12,6,4); c.fill();
  c.fillStyle='#8a4a14'; c.fillRect(-14,-8,4,9); c.fillRect(-7,-8,4,9); c.fillRect(8,-8,4,9); c.fillRect(13,-8,4,9); c.fillStyle='#3b2412'; c.fillRect(-14,0,4,2); c.fillRect(-7,0,4,2); c.fillRect(8,0,4,2); c.fillRect(13,0,4,2);
  c.fillStyle='#b5651d'; c.beginPath(); c.moveTo(14,-20); c.lineTo(25,hy-2); c.lineTo(29,hy+7); c.lineTo(16,-10); c.fill(); c.fillStyle='#f8f1e6'; el(c,27,hy+3,6,5); c.fill(); c.fillStyle='#e8a090'; el(c,30,hy+5,3,2); c.fill();
  c.fillStyle='#f3e6d0'; c.beginPath(); c.moveTo(22,hy-4); c.quadraticCurveTo(18,hy-12,24,hy-10); c.fill(); c.beginPath(); c.moveTo(28,hy-4); c.quadraticCurveTo(34,hy-12,30,hy-9); c.fill();
  c.fillStyle='#1f2937'; circ(c,26,hy-1,1.2); c.fill();
  c.strokeStyle='#8a4a14'; c.lineWidth=1.5; c.beginPath(); c.moveTo(-18,-18); c.quadraticCurveTo(-22+Math.sin(t*1.1+seed)*2,-10,-20,-3); c.stroke();
  c.restore();
}
function ema(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s); var p=Math.sin(t*2.2);
  c.fillStyle='rgba(0,0,0,.18)'; el(c,0,0,16,3); c.fill();
  c.strokeStyle='#8a7a5a'; c.lineWidth=2.5; linha(c,-4,-26,-6+p*3,0); linha(c,4,-26,6-p*3,0);
  c.fillStyle='#8f8a7a'; el(c,0,-34,18,12); c.fill(); c.fillStyle='#b8b2a0'; el(c,-4,-38,10,7); c.fill();
  c.strokeStyle='#8f8a7a'; c.lineWidth=4; c.beginPath(); c.moveTo(10,-40); c.quadraticCurveTo(16,-60,14,-74); c.stroke();
  c.fillStyle='#8f8a7a'; el(c,15,-76,6,4.5); c.fill(); c.fillStyle='#4a4a3a'; c.beginPath(); c.moveTo(20,-76); c.lineTo(28,-74); c.lineTo(20,-73); c.fill(); c.fillStyle='#1f2937'; circ(c,16,-77,1.2); c.fill();
  c.restore(); }
function queroQuero(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s);
  c.fillStyle='rgba(0,0,0,.15)'; el(c,0,0,9,2); c.fill(); c.strokeStyle='#e06060'; c.lineWidth=1.5; linha(c,-2,-8,-3,0); linha(c,3,-8,4,0);
  c.fillStyle='#9ca3af'; el(c,0,-13,10,6); c.fill(); c.fillStyle='#f8fafc'; el(c,2,-11,6,3.5); c.fill(); c.fillStyle='#4b5563'; el(c,-6,-15,5,3); c.fill(); c.fillStyle='#b8860b'; el(c,-2,-16,3,2); c.fill();
  c.fillStyle='#9ca3af'; circ(c,9,-20,4.5); c.fill(); c.fillStyle='#1f2937'; c.fillRect(7,-22,6,3); c.fillStyle='#e06060'; c.beginPath(); c.moveTo(13,-20); c.lineTo(18,-19); c.lineTo(13,-18); c.fill();
  c.strokeStyle='#1f2937'; c.lineWidth=1; linha(c,6,-24,2,-30); linha(c,7,-24,5,-31); c.fillStyle='#fff'; circ(c,10,-20,1.3); c.fill();
  c.restore(); }
function capivara(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s);
  c.fillStyle='rgba(0,0,0,.18)'; el(c,0,0,18,3); c.fill(); c.fillStyle='#a0703c'; el(c,0,-12,17,9); c.fill(); c.fillStyle='#8a5a2a'; c.fillRect(-11,-6,5,6); c.fillRect(-3,-6,5,6); c.fillRect(5,-6,5,6); c.fillRect(11,-6,5,6);
  c.fillStyle='#a0703c'; rr(c,10,-24,16,14,6); c.fill(); c.fillStyle='#8a5a2a'; el(c,13,-25,3,3); c.fill(); c.fillStyle='#1f2937'; circ(c,19,-20,1.5); c.fill(); el(c,25,-15,2,1.5); c.fill();
  c.restore(); }
function araucaria(c,x,y,h){ c.fillStyle='#6b4428'; c.fillRect(x-3,y-h,6,h); c.fillStyle='#2f6f3a'; for(var k=0;k<4;k++){ var yy=y-h+k*10, w=10+k*8; c.beginPath(); c.moveTo(x-w,yy+6); c.quadraticCurveTo(x,yy-10,x+w,yy+6); c.quadraticCurveTo(x,yy+2,x-w,yy+6); c.fill(); } }
function cerca(c,x,y,w,porteira){ c.fillStyle='#8a5a34'; for(var px=x;px<=x+w;px+=60) c.fillRect(px-3,y-46,6,46); c.fillStyle='#a8743f'; c.fillRect(x,y-40,w,5); c.fillRect(x,y-22,w,5);
  if(porteira){ var gx=x+w/2-40; c.fillStyle='#6b4428'; c.fillRect(gx-4,y-60,8,60); c.fillRect(gx+76,y-60,8,60); c.fillStyle='#b8864a'; c.fillRect(gx,y-50,80,5); c.fillRect(gx,y-32,80,5); c.fillRect(gx,y-14,80,5); c.strokeStyle='#b8864a'; c.lineWidth=4; linha(c,gx+2,y-12,gx+78,y-48); } }
function longePampa(c,cam,t){
  morro(c,330,22,.005,cam*.3,'#9fd08a'); morro(c,356,16,.008,cam*.5+300,'#8cc472');
  rep(cam*.6,900,function(ox){ if(ox>W+60||ox<-960) return; var hy=morroY(ox+200,356,16,.008,cam*.5+300-ox*0);
    for(var k=0;k<5;k++) araucaria(c,ox+150+k*22,morroY(ox+150+k*22,356,16,.008,cam*.5+300)+2,30+hash(k)*14);
    for(k=0;k<6;k++){ var gx=ox+450+k*50, gy=morroY(gx,356,16,.008,cam*.5+300)+10; gado(c,gx,gy,.35,k%2?1:-1,t,k); }
  });
  c.fillStyle='#a3d47a'; c.fillRect(0,392,W,H-392);
  /* 08/11: o vão entre dois trechos de chão é uma VALA de terra escura (antes aparecia o campo verde-claro até o fim da tela) */
  var Jv=jogo(), gy=452-Math.round((Jv&&Jv.camY)||0);
  if(gy<H){ var gv=c.createLinearGradient(0,gy,0,H); gv.addColorStop(0,'#5a2e14'); gv.addColorStop(.35,'#3a1c0b'); gv.addColorStop(1,'#1a0c04'); c.fillStyle=gv; c.fillRect(0,gy,W,H-gy);
    c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(0,gy,W,6); }
  rep(cam,1200,function(ox){ if(ox>W+60||ox<-1260) return; cerca(c,ox+40,394,500,false); arvoreR(c,ox+700,396,70,'#4f8f44','#6fb35e','#6b4428'); ema(c,ox+900,396,.6,1,t); ema(c,ox+950,396,.5,-1,t+1); for(var k=0;k<8;k++) capimPampas(c,ox+60+k*150,396,20,t,k); });
  bruma(c,300,452,'rgba(255,241,200,.4)');
}
function pertoPampa(c,cam,t){
  rep(cam,1500,function(ox){ if(ox>W+80||ox<-1580) return;
    cerca(c,ox+40,452,560,true); arvoreR(c,ox+700,452,190,'#4f8f44','#6fb35e','#6b4428');
    gado(c,ox+150,452,1,1,t,1); gado(c,ox+240,452,.9,-1,t,2); capivara(c,ox+1180,452,1,1,t);
    ema(c,ox+860,452,1,1,t); queroQuero(c,ox+1020+Math.sin(t*.4)*20,452,1.2,Math.cos(t*.4)>0?1:-1,t); queroQuero(c,ox+1300,452,1.1,-1,t+2);
    for(var k=0;k<9;k++) capimPampas(c,ox+30+k*170+hash(k)*40,452,30+hash(k+3)*18,t,k+10);
    arbusto(c,ox+1400,452,40,'#4f8a3c','#6fae4f',['#fde047','#fff'],12);
  });
}
function chaoPampa(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-20,s.w,s.h+20); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#9a5a30','#5a2e14'); c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle='rgba(0,0,0,.12)'; for(x=grade(a,30);x<b;x+=30){ el(c,x+hash(x)*20,s.y+22+hash(x+1)*(Math.min(s.h,100)-30),5+hash(x+2)*4,3); c.fill(); }
  topoGrama(c,s,a,b,{c0:'#9ad868',c1:'#5aa83c',luz:'#b6ec88',fio:['#7fcf52','#67b844']});
  for(x=grade(a,52);x<b;x+=52){ if(hash(x*1.3)>.55){ var fx=x+hash(x+5)*30; flor(c,fx,s.y-4,2,['#fff','#fde047','#f9a8d4'][Math.floor(hash(x)*3)]); } }
  bordas(c,s,'rgba(50,25,10,.35)'); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platPampa(c,p){
  sombraPlat(c,p,5); var x, k=hash(p.x*.13+p.y*.07);
  if(k>.5){ /* tronco de árvore caído, com musgo em cima */
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#c98a4f','#6b4428'); rr(c,p.x,p.y,p.w,p.h,p.h/2); c.fill();
    c.strokeStyle='rgba(60,30,10,.35)'; c.lineWidth=1.2; for(x=p.x+10;x<p.x+p.w-8;x+=16) linha(c,x,p.y+4,x+6,p.y+p.h-4);
    c.fillStyle='#e8b878'; el(c,p.x+p.w-2,p.y+p.h/2,4,p.h/2-1); c.fill(); c.strokeStyle='#a8743f'; c.lineWidth=1; el(c,p.x+p.w-2,p.y+p.h/2,2,p.h/4); c.stroke();
    c.fillStyle='#6fb35e'; for(x=p.x+6;x<p.x+p.w-6;x+=10){ if(hash(x*.9)>.4){ el(c,x,p.y+1,6,3); c.fill(); } }
  } else { /* trecho de cerca de madeira (a tábua de cima é a plataforma) */
    c.fillStyle='#8a5a34'; for(x=p.x+8;x<p.x+p.w;x+=52) c.fillRect(x-3,p.y+p.h-2,6,14);
    c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#e8b878','#a8743f'); rr(c,p.x,p.y,p.w,p.h,2); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(p.x+2,p.y+1,p.w-4,2);
    c.strokeStyle='rgba(80,40,10,.3)'; c.lineWidth=1; linha(c,p.x+6,p.y+p.h/2,p.x+p.w-6,p.y+p.h/2+1);
    if(p.w>=90) queroQuero(c,p.x+p.w*.75,p.y,.8,1,0);
  }
}

/* ============================================================
   PANTANAL — debaixo d'água na área alagada; na margem, bromélias, tuiuiú e capivaras
   ============================================================ */
function sup(){ var J=jogo(); return (J&&J.mundo&&J.mundo.superficie)||180; }
function ceuPant(c,t){ var S=sup();
  var g=c.createLinearGradient(0,0,0,S); g.addColorStop(0,'#5fb8ec'); g.addColorStop(1,'#f4e3b4'); c.fillStyle=g; c.fillRect(0,0,W,S); sol(c,820,Math.max(30,S-130),22,'#fff3c4','rgba(255,240,190,.35)');
  var g2=c.createLinearGradient(0,S,0,H); g2.addColorStop(0,'#5fb3a0'); g2.addColorStop(.35,'#2f8a7a'); g2.addColorStop(.75,'#1a5a56'); g2.addColorStop(1,'#0b3a3e'); c.fillStyle=g2; c.fillRect(0,S,W,H-S);
  raios(c,[80,260,450,640,820],S,470,80,40,'rgba(220,255,230,A)',.16,t);
}
function bromelia(c,x,y,s,seed){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#3f9a4a'; for(var k=0;k<7;k++){ var a=(k-3)*.32; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(Math.sin(a)*18,-16,Math.sin(a)*26,-30-hash(seed+k)*8); c.quadraticCurveTo(Math.sin(a)*12,-12,0,0); c.fill(); }
  c.strokeStyle='#c0304a'; c.lineWidth=2; linha(c,0,-8,4,-44); c.fillStyle='#e11d48'; for(k=0;k<6;k++){ el(c,4+Math.sin(k)*4,-44+k*5,3,2.5); c.fill(); } c.fillStyle='#f9a8d4'; el(c,5,-50,3,3); c.fill(); c.restore(); }
function tuiuiu(c,x,y,s,dir,t){ c.save(); c.translate(x,y); c.scale(dir*s,s); var p=Math.sin(t*.8);
  c.fillStyle='rgba(0,0,0,.15)'; el(c,0,0,14,3); c.fill(); c.strokeStyle='#1f2937'; c.lineWidth=2.5; linha(c,-4,-28,-5,0); linha(c,4,-28,5+p*2,0);
  c.fillStyle='#f8fafc'; el(c,0,-36,18,11); c.fill(); c.fillStyle='#1f2937'; c.beginPath(); c.moveTo(-14,-40); c.lineTo(-26,-30); c.lineTo(-12,-32); c.fill();
  c.strokeStyle='#1f2937'; c.lineWidth=5; c.beginPath(); c.moveTo(10,-42); c.quadraticCurveTo(14,-62,12,-76); c.stroke(); c.strokeStyle='#dc2626'; c.lineWidth=5; c.beginPath(); c.moveTo(11,-56); c.lineTo(12,-64); c.stroke();
  c.fillStyle='#1f2937'; el(c,12,-79,6,5); c.fill(); c.beginPath(); c.moveTo(16,-80); c.lineTo(40,-76); c.lineTo(16,-75); c.fill(); c.fillStyle='#fff'; circ(c,13,-80,1.5); c.fill();
  c.restore(); }
function jacare(c,x,y,t,dir){ c.save(); c.translate(x,y); c.scale(dir||1,1); var b=Math.sin(t*.6)*1.5;
  c.fillStyle='#4d7c3a'; el(c,0,b,46,7); c.fill(); el(c,-40,b+1,14,4); c.fill(); c.fillStyle='#6b9a4a'; for(var k=-30;k<30;k+=10){ c.beginPath(); c.moveTo(k,b-6); c.lineTo(k+4,b-11); c.lineTo(k+8,b-6); c.fill(); }
  c.fillStyle='#4d7c3a'; el(c,40,b+1,18,5); c.fill(); c.fillStyle='#6b9a4a'; circ(c,26,b-7,5); c.fill(); circ(c,34,b-7,5); c.fill(); c.fillStyle='#fde047'; circ(c,27,b-8,2.5); c.fill(); circ(c,35,b-8,2.5); c.fill(); c.fillStyle='#1f2937'; c.fillRect(26.5,b-10,1.2,4); c.fillRect(34.5,b-10,1.2,4);
  c.fillStyle='#fff'; for(k=0;k<4;k++) c.fillRect(44+k*4,b+3,2,2); c.restore(); }
function peixinho(c,x,y,s,dir,cor){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle=cor; el(c,0,0,10,5); c.fill(); c.beginPath(); c.moveTo(-8,0); c.lineTo(-15,-5); c.lineTo(-15,5); c.closePath(); c.fill(); c.fillStyle='rgba(255,255,255,.5)'; el(c,2,-1,3,2); c.fill(); c.fillStyle='#1f2937'; circ(c,5,-1,1); c.fill(); c.restore(); }
function planta(c,x,y,h,t,seed){ var sw=Math.sin(t*.7+seed)*5; c.strokeStyle='rgba(60,140,90,.75)'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+sw*.5,y-h*.5,x+sw,y-h); c.stroke(); c.fillStyle='rgba(80,170,100,.7)'; for(var k=1;k<4;k++){ el(c,x+sw*k/4+(k%2?6:-6),y-h*k/4,7,3); c.fill(); } }
function longePant(c,cam,t){
  var S=sup(), mo=cam*.6, x;
  /* a margem: barranco, mato, árvores, bromélias, tuiuiú e capivaras */
  c.fillStyle='#8fbf5a'; c.beginPath(); c.moveTo(0,S); for(x=0;x<=W;x+=16) c.lineTo(x,S-10-Math.sin((x+mo)*.01)*4); c.lineTo(W,S); c.fill();
  rep(mo,1500,function(ox){ if(ox>W+80||ox<-1580) return;
    arvoreR(c,ox+80,S-10,70,'#3f8a44','#5fae5a','#6b4428'); arvoreR(c,ox+330,S-10,56,'#4f9a4a','#6fbf5e','#6b4428'); arvoreR(c,ox+900,S-10,64,'#3f8a44','#5fae5a','#6b4428'); arvoreR(c,ox+1250,S-10,50,'#4f9a4a','#6fbf5e','#6b4428');
    bromelia(c,ox+180,S-10,.7,1); bromelia(c,ox+210,S-10,.55,2); bromelia(c,ox+700,S-10,.7,3); bromelia(c,ox+1100,S-10,.65,4); bromelia(c,ox+1130,S-10,.5,5);
    tuiuiu(c,ox+500,S-10,.6,1,t); capivara(c,ox+780,S-10,.7,-1,t); capivara(c,ox+815,S-10,.5,-1,t);
    c.fillStyle='#4d8a3c'; [120,260,620,660,980,1010,1300,1400].forEach(function(dx){ circ(c,ox+dx,S-14,11); c.fill(); });
  });
  /* a linha d'água e o jacaré boiando */
  c.fillStyle='rgba(200,245,235,.5)'; c.beginPath(); c.moveTo(0,S-3); for(x=0;x<=W;x+=12) c.lineTo(x,S-2+Math.sin(x*.04+t*1.4)*2.5); c.lineTo(W,S+10); c.lineTo(0,S+10); c.fill();
  c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=2; c.beginPath(); for(x=0;x<=W;x+=12){ var yy=S-2+Math.sin(x*.04+t*1.4)*2.5; if(x===0) c.moveTo(x,yy); else c.lineTo(x,yy); } c.stroke();
  rep(cam*.5,1400,function(ox){ if(ox>W+80||ox<-1480) return; jacare(c,ox+600+Math.sin(t*.2)*30,S+1,t,Math.cos(t*.2)>0?1:-1); });
  /* debaixo d'água, longe: plantas altas e cardumes */
  rep(cam,760,function(ox){ c.fillStyle='rgba(20,90,80,.5)'; [[60,70,26],[300,50,20],[520,90,30]].forEach(function(r){ el(c,ox+r[0],452,r[1],r[2]); c.fill(); });
    for(var i=0;i<7;i++){ var kx=ox+30+i*105+hash(i)*30, h=90+hash(i+4)*90; c.strokeStyle='rgba(30,110,90,.5)'; c.lineWidth=3; c.beginPath(); c.moveTo(kx,452); c.quadraticCurveTo(kx+Math.sin(t*.7+i)*8,452-h*.5,kx+Math.sin(t*.8+i)*12,452-h); c.stroke(); } });
  for(var g=0;g<2;g++){ var gx=((g*520-cam*.5+t*(14+g*6))%(W+400)+W+400)%(W+400)-200, gy=S+90+g*100+Math.sin(t*.6+g)*12; for(var f=0;f<9;f++) peixinho(c,gx+hash(f+g*13)*80,gy+hash(f+g*7)*34+Math.sin(t*1.4+f)*3,.8,1,'rgba(10,60,60,.5)'); }
  bruma(c,S+60,452,'rgba(10,70,70,.3)');
}
function pertoPant(c,cam,t){ var S=sup();
  rep(cam,1200,function(ox){ if(ox>W+80||ox<-1300) return; var i;
    /* bromélias flutuando na superfície e vitórias-régias pequenas */
    [[210,1],[520,2],[900,3]].forEach(function(v){ var vx=ox+v[0]+Math.sin(t*.5+v[1])*4; c.fillStyle='#3f9a4a'; el(c,vx,S+2,26,6); c.fill(); c.fillStyle='#2f7a3a'; el(c,vx,S+4,26,3); c.fill(); bromelia(c,vx,S+2,.6,v[1]+10); c.strokeStyle='rgba(60,120,60,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(vx+Math.sin(t*.6+v[1])*3,S+6); c.quadraticCurveTo(vx-12,S+170,vx+6,452); c.stroke(); });
    for(i=0;i<5;i++) planta(c,ox+40+i*22,452,170+hash(i)*60,t,i);
    planta(c,ox+330,452,120,t,11); planta(c,ox+350,452,150,t,12);
    for(i=0;i<4;i++) planta(c,ox+600+i*24,452,150+hash(i+9)*60,t,i+5); planta(c,ox+980,452,140,t,3); for(i=0;i<3;i++) planta(c,ox+1060+i*26,452,190+hash(i+3)*40,t,i+9);
    c.fillStyle='#7a8a6a'; [[250,1.5],[790,1.9],[1150,1.1]].forEach(function(p){ el(c,ox+p[0],452,26*p[1],12*p[1]); c.fill(); c.fillStyle='rgba(255,255,255,.15)'; el(c,ox+p[0]-8*p[1],452-6*p[1],8*p[1],3*p[1]); c.fill(); c.fillStyle='#7a8a6a'; });
    peixinho(c,ox+460+Math.sin(t*.5)*40,300+Math.sin(t*.9)*10,1.6,Math.cos(t*.5)>0?1:-1,'#e8a040'); peixinho(c,ox+880+Math.sin(t*.4+2)*50,260+Math.sin(t*.7)*12,1.3,Math.cos(t*.4+2)>0?1:-1,'#60a5fa'); peixinho(c,ox+150+Math.sin(t*.45+1)*30,380+Math.sin(t*.8)*8,1.2,Math.cos(t*.45+1)>0?1:-1,'#f472b6');
    capivara(c,ox+700+Math.sin(t*.25)*60,S+8+Math.sin(t*.5)*3,.9,Math.cos(t*.25)>0?1:-1,t); /* capivara nadando: só a cabeça e as costas fora d'água */
    for(i=0;i<8;i++){ var bx=ox+hash(i+50)*1200+Math.sin(t*1.4+i)*4, sp=26+hash(i+3)*26, by=452-((t*sp+hash(i)*(452-S))%(452-S)); if(bx<-10||bx>W+10) continue; bolha(c,bx,by,3+hash(i+7)*4,.7); }
  });
}
function chaoPant(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-16,s.w,s.h+16); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#b8a060','#5a4a28'); c.fillRect(s.x,s.y,s.w,s.h);
  for(x=grade(a,18);x<b;x+=18){ var hv=hash(x*.9); c.fillStyle=['#8e9a80','#a8a080','#6e7c66','#b8a888'][Math.floor(hv*4)]; el(c,x+hash(x)*14,s.y+10+hash(x+2)*Math.min(50,s.h-14),2+hv*2.5,1.5+hv*1.5); c.fill(); }
  c.fillStyle='#d2c080'; c.beginPath(); c.moveTo(s.x,s.y+6); for(x=grade(a,18);x<=b+18;x+=18) c.quadraticCurveTo(x+9,s.y-2,x+18,s.y+1); c.lineTo(b+18,s.y+8); c.lineTo(s.x,s.y+8); c.fill();
  for(x=grade(a,56);x<b;x+=56){ var h2=hash(x*1.7), sx=x+hash(x+4)*30; if(h2>.5){ c.fillStyle='#4f9a4a'; for(var k=0;k<4;k++){ c.beginPath(); c.moveTo(sx+k*3,s.y+2); c.quadraticCurveTo(sx+k*3-5,s.y-8,sx+k*3+1,s.y-12-k*2); c.lineTo(sx+k*3+3,s.y+2); c.fill(); } } else if(h2<.2){ c.fillStyle='#f4ead6'; el(c,sx,s.y,5,3); c.fill(); } }
  bordas(c,s,'rgba(50,40,20,.3)'); c.fillStyle='rgba(0,30,40,.2)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platPant(c,p){ /* tronco submerso coberto de musgo, com uma bromélia em cima */
  sombraPlat(c,p,8); var x;
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h+4,'#8a6a3a','#4a3a20'); rr(c,p.x,p.y+3,p.w,p.h-3,p.h/2); c.fill();
  c.strokeStyle='rgba(40,25,10,.35)'; c.lineWidth=1.2; for(x=p.x+10;x<p.x+p.w-8;x+=16) linha(c,x,p.y+6,x+5,p.y+p.h-3);
  c.fillStyle=lin(c,0,p.y-3,0,p.y+8,'#8fd060','#4f8f3a'); c.beginPath(); c.moveTo(p.x+5,p.y+6); for(x=p.x+5;x<=p.x+p.w-8;x+=8) c.quadraticCurveTo(x+4,p.y-3-hash(x*.7)*2,x+8,p.y+3); c.lineTo(p.x+p.w-8,p.y+8); c.closePath(); c.fill();
  c.strokeStyle='#5fa042'; c.lineWidth=2; c.lineCap='round'; for(x=p.x+10;x<p.x+p.w-10;x+=13){ if(hash(x*1.3)>.45){ var l=4+hash(x)*10; c.beginPath(); c.moveTo(x,p.y+4); c.quadraticCurveTo(x+2,p.y+4+l*.5,x,p.y+4+l); c.stroke(); } } c.lineCap='butt';
  if(p.w>=90) bromelia(c,p.x+p.w*.7,p.y+2,.55,p.x);
}

/* ---------- registro das cenas ---------- */
A.TH.F.pampa   ={ceu:ceuPampa,longe:longePampa,perto:pertoPampa,chao:chaoPampa,plat:platPampa};
A.TH.F.pantanal={ceu:ceuPant,longe:longePant,perto:pertoPant,chao:chaoPant,plat:platPant};
A.TH.capimPampas=capimPampas; A.TH.gado=gado; A.TH.ema=ema; A.TH.queroQuero=queroQuero; A.TH.capivara=capivara; A.TH.bromelia=bromelia; A.TH.tuiuiu=tuiuiu; A.TH.jacare=jacare; A.TH.peixinho=peixinho; A.TH.plantaAgua=planta; A.TH.araucaria=araucaria; A.TH.cerca=cerca;
})();
