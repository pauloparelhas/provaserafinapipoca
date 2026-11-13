/* ============================================================
   MAT3_jogo_arteC.js — "Motion Rangers" (cenários, parte 2):
   nuvens = Windy Fields, ginasio = The Move Park (biscoito igual),
   estadio = Tug-of-War Stadium, tinta = Twister! (sem o vilão),
   biblioteca = sala de aula, pista = savana, sub_* (A.fundoSub),
   tiles por cena (cano, tijolo, espinhos), A.mapaLivro, A.PARADAS_MAPA
   + A.MAPA_NOS, A.capaLivro. A tela lógica é 960x540.
   Carregar DEPOIS de MAT3_jogo_arteB.js.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CB) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var N=A.CN, grade=N.grade, ceuG=N.ceuG, nuvemF=N.nuvemF, sol=N.sol, linha=N.linha;
var B=A.CB, OL=B.OL, FONTE=B.FONTE, fs=B.fs, poly=B.poly, box=B.box, txt=B.txt, rot=B.rot, mod=B.mod, camada=B.camada, faixaP=B.faixaP, JJ=B.JJ, bolaFut=B.bolaFut, caixaP=B.caixaP, livroDeitado=B.livroDeitado, placaTexto=B.placaTexto, tronco=B.tronco, vaso=B.vaso;

/* ============================================================
   NUVENS = WINDY FIELDS
   ============================================================ */
A.CENAS.nuvens={ceu:['#1f7fe0','#5fb0f0','#cfeaf8'], chaoTop:'#7cc548', chao:'#6a8f3a', chaoBase:'#3f5a24', plat:'#9c6c3c', platTop:'#c49a60', part:'', musica:'montanha'};
function ceuNuvens(c,t){ ceuG(c,[[0,'#1a78de'],[.6,'#62b4f2'],[1,'#d9f0fa']]);
  [[90,70,1.2,'#d8c8f2','#a892d8'],[520,50,.9,'#fff','#dfe8f6'],[820,110,1,'#d8c8f2','#a892d8'],[300,150,.7,'#fff','#dfe8f6']].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*(5+i*2),W+260)-130,n[1],n[2],n[3],n[4],.95); });
  c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=2.5; [0,1,2,3].forEach(function(i){ var x=mod(i*300+t*70,W+300)-150, y=90+i*62; c.beginPath(); c.moveTo(x,y); c.bezierCurveTo(x+60,y-14,x+110,y+14,x+170,y); c.quadraticCurveTo(x+196,y-10,x+180,y-20); c.stroke(); }); }
function torreT(c,x,y,h){ poly(c,[[x-h*.018,y-h],[x+h*.018,y-h],[x+h*.03,y],[x-h*.03,y]]); fs(c,lin(c,x-h*.03,0,x+h*.03,0,'#fff','#b8c6d4'),1.2,'#6a7888'); }
function pa(c,x,y,L,a){ rot(c,x,y,a,function(){ c.beginPath(); c.moveTo(-L*.03,0); c.quadraticCurveTo(L*.02,-L*.5,0,-L); c.quadraticCurveTo(L*.09,-L*.5,L*.04,0); c.closePath(); fs(c,'#fff',1,'#7a8a9a'); c.fillStyle='#d94141'; c.beginPath(); c.moveTo(-L*.008,-L*.86); c.lineTo(0,-L); c.lineTo(L*.03,-L*.86); c.closePath(); c.fill(); }); }
function rotor(c,x,y,L,a){ for(var i=0;i<3;i++) pa(c,x,y,L,a+i*TAU/3); c.fillStyle='#dfe7ee'; circ(c,x,y,L*.05+1); fs(c,'#dfe7ee',1,'#6a7888'); }
function camposLonge(c){ var P=1400, i, x;
  /* dunas ao longe */
  c.fillStyle=lin(c,0,290,0,380,'#f0d89c','#d9b872'); c.beginPath(); c.moveTo(0,380); for(x=0;x<=P;x+=20) c.lineTo(x,332+Math.sin(x*TAU/700)*28+Math.sin(x*TAU/350)*10); c.lineTo(P,380); c.fill();
  c.strokeStyle='rgba(170,120,60,.4)'; c.lineWidth=2; for(i=0;i<8;i++){ x=90+i*180; c.beginPath(); c.moveTo(x,340); c.quadraticCurveTo(x+40,320,x+90,342); c.stroke(); }
  /* morro e campo verde */
  c.fillStyle='#71b34c'; c.beginPath(); c.moveTo(0,470); for(x=0;x<=P;x+=20) c.lineTo(x,372+Math.sin(x*TAU/1400+1)*12); c.lineTo(P,470); c.fill();
  c.fillStyle=lin(c,0,390,0,470,'#a2d060','#6fb040'); c.fillRect(0,396,P,74); c.strokeStyle='rgba(240,220,120,.5)'; c.lineWidth=2; for(i=0;i<3;i++) linha(c,0,412+i*18,P,412+i*18);
  /* torres das turbinas (pás giram por cima, em pertoNuvens) */
  TURB.forEach(function(k){ torreT(c,k[0],k[1],k[2]); });
  for(i=0;i<14;i++){ x=hash(i*2.1)*P; c.fillStyle='#3f8a3a'; circ(c,x,392,9+hash(i)*9); c.fill(); }
}
var TURB=[[120,400,150],[230,396,105],[300,394,70],[360,392,44],[760,398,120],[900,394,80],[1200,398,140]];
function palmeira(c,x,y,h,d){ c.strokeStyle='#8a5a2c'; c.lineWidth=h*.07; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x-d*h*.05,y-h*.55,x+d*h*.4,y-h); c.stroke(); c.lineWidth=2; c.strokeStyle='rgba(50,25,10,.5)';
  var tx=x+d*h*.4, ty=y-h; [-.15,.12,.4,.7,-.45].forEach(function(a,i){ rot(c,tx,ty,a*d+(d<0?PI:0),function(){ var L=h*(.55-.03*i); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(L*.5,-L*.18,L,L*.14); c.quadraticCurveTo(L*.5,L*.12,0,0); fs(c,i%2?'#4e9e3a':'#3f8a30',1.5); c.strokeStyle='rgba(20,60,15,.5)'; c.lineWidth=1; for(var k=1;k<6;k++){ var u=k/6; linha(c,L*u,-L*.06+L*.1*u,L*u+6,L*.1); } }); }); c.fillStyle='#7a4a1e'; circ(c,tx,ty+6,h*.03+3); c.fill(); }
function denteLeao(c,x,y,h,r){ c.strokeStyle='#6d9a3a'; c.lineWidth=h*.02+2; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x-h*.1,y-h*.5,x+h*.05,y-h); c.stroke(); var cx=x+h*.05, cy=y-h; c.fillStyle='rgba(255,255,255,.55)'; circ(c,cx,cy,r); c.fill();
  c.strokeStyle='rgba(255,255,255,.95)'; c.lineWidth=1; for(var i=0;i<46;i++){ var a=i*TAU/46+hash(i)*.05; linha(c,cx,cy,cx+Math.cos(a)*r,cy+Math.sin(a)*r); c.fillStyle='#fff'; circ(c,cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.6); c.fill(); } c.fillStyle='#a87a3a'; circ(c,cx,cy,r*.14); c.fill(); }
function semente(c,x,y,a,s){ rot(c,x,y,a,function(){ c.scale(s,s); c.strokeStyle='#fff'; c.lineWidth=1.2; linha(c,0,0,0,-16); for(var i=-3;i<=3;i++) linha(c,0,-16,i*3.4,-24+Math.abs(i)); c.fillStyle='#9a5a2a'; el(c,0,3,2,4.5); c.fill(); }); }
function pipa(c,x,y,s,a,cab){ rot(c,x,y,a,function(){ c.scale(s,s); var T=[[0,-30],[22,-4],[0,34],[-22,-4]], cor=['#e8423c','#f2c23a','#3a7fd8','#3fb04a']; [[0,1],[1,2],[2,3],[3,0]].forEach(function(p,i){ poly(c,[T[p[0]],T[p[1]],[0,-4]]); c.fillStyle=cor[i]; c.fill(); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke(); });
  c.strokeStyle='#555'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,34); for(var k=1;k<=4;k++) c.quadraticCurveTo(k%2?14:-14,34+k*13-6,0,34+k*13); c.stroke(); [0,1,2].forEach(function(k){ var yy=48+k*16; poly(c,[[-7,yy-4],[0,yy],[-7,yy+4]]); c.fillStyle=cor[k]; c.fill(); poly(c,[[7,yy-4],[0,yy],[7,yy+4]]); c.fill(); }); }); }
function casaVent(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); box(c,-46,-54,92,54,lin(c,0,-54,0,0,'#f4e4c0','#d8c090'),1); poly(c,[[-56,-52],[0,-92],[56,-52]]); fs(c,'#d64a2a'); box(c,-10,-34,20,34,'#8a5428',1); [-36,20].forEach(function(d){ box(c,d,-44,16,16,'#a8d8ee',1,1.2); }); c.restore(); }
function camposPerto(c){ palmeira(c,240,450,250,1); casaVent(c,330,450,1); palmeira(c,480,450,210,1); denteLeao(c,860,450,240,70); denteLeao(c,1010,450,90,26); denteLeao(c,1060,450,60,18); palmeira(c,1500,450,230,1); denteLeao(c,1760,450,150,42);
  for(var i=0;i<30;i++){ var x=hash(i*5.1)*2000; c.fillStyle=i%3?'#f2e24a':'#fff'; circ(c,x,440+hash(i)*10,3.5); c.fill(); } }
function longeNuvens(c,cam,t){ faixaP(c,camada('nuvens','L',1400,470,1.1,camposLonge),cam,0); var P=1400, o=-mod(cam,P); for(var x=o;x<W;x+=P) TURB.forEach(function(k,i){ var X=x+k[0]; if(X>-140&&X<W+140) rotor(c,X,k[1]-k[2],k[2]*.62,t*.9+i*1.3); }); }
function pertoNuvens(c,cam,t){ faixaP(c,camada('nuvens','P',2000,470,1,camposPerto),cam,0);
  [[0,160,.8],[1,120,1],[2,260,.7]].forEach(function(k){ var x=mod(k[0]*360+40-cam*.3,W+200)-100; pipa(c,x,k[1]+Math.sin(t*.7+k[0]*2)*12,k[2]*1.3,.35+Math.sin(t*.9+k[0])*.12); });
  var P=2000, dx=mod(860-cam,P); for(var i=0;i<9;i++){ var u=mod(t*.09+i/9,1), sx=dx+60+u*640+Math.sin(t*.8+i*2)*14, sy=200-u*140+Math.sin(t+i)*18; if(sx<W+40) semente(c,sx,sy,.6+Math.sin(t+i)*.3,1.2); } }
function chaoNuvens(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#84bc48','#4a6e2a'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#b2e070'; c.fillRect(s.x,s.y,s.w,5); for(var x=grade(s.x,10);x<s.x+s.w;x+=10){ if(x<s.x) continue; var hh=4+hash(x)*7; c.fillStyle=hash(x+1)>.5?'#7cc548':'#5fa83a'; c.beginPath(); c.moveTo(x,s.y+2); c.lineTo(x+3-hash(x+2)*1,s.y-hh); c.lineTo(x+7,s.y+2); c.fill(); } c.strokeStyle='rgba(30,50,15,.8)'; c.lineWidth=2; c.strokeRect(s.x,s.y+2,s.w,s.h-2); }
function platNuvens(c,p){ tronco(c,p,'#b08850','#6f5230'); }

/* ============================================================
   GINASIO = THE MOVE PARK (os aparelhos dos 6 movimentos)
   ============================================================ */
A.CENAS.ginasio={ceu:['#68c0f4','#b6e4f9','#f4fbdc'], chaoTop:'#7cc548', chao:'#d6a868', chaoBase:'#8c6a3a', plat:'#b57a3a', platTop:'#dda764', part:'polen', musica:'cidade'};
A.CENAS.biscoito={ceu:A.CENAS.ginasio.ceu, chaoTop:'#7cc548', chao:'#d6a868', chaoBase:'#8c6a3a', plat:'#b57a3a', platTop:'#dda764', part:'polen', musica:'cidade'};
function ceuParque(c,t){ ceuG(c,[[0,'#62bcf2'],[.7,'#b4e3f8'],[1,'#f2fadc']]); sol(c,830,74,28,'#fff3c4','rgba(255,244,200,.35)'); [[100,70,1],[420,110,.8],[650,50,.9]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*(3+i),W+220)-110,n[1],n[2],'#fff','#e2eef8',.92); }); }
function escorrega(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); /* escada azul + rampa vermelha como no slide */
  c.strokeStyle='#2f4bb0'; c.lineWidth=7; linha(c,-70,0,-34,-160); linha(c,-30,0,4,-160); c.lineWidth=5; for(var i=1;i<6;i++){ var u=i/6; linha(c,-70+36*u,-160*u,-30+34*u,-160*u); }
  [-30,6].forEach(function(d){ circ(c,d,-186,15); fs(c,'#2f4bb0'); box(c,d-3,-172,6,14,'#2f4bb0',1); });
  c.beginPath(); c.moveTo(-6,-168); c.bezierCurveTo(50,-130,70,-20,160,-16); c.lineTo(164,8); c.bezierCurveTo(50,8,30,-110,-22,-148); c.closePath(); fs(c,lin(c,0,-168,100,8,'#e8423c','#b81f1f'),2.5);
  c.strokeStyle='#f77'; c.lineWidth=3; c.beginPath(); c.moveTo(-2,-160); c.bezierCurveTo(50,-124,70,-14,158,-8); c.stroke(); c.restore(); }
function balanco(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle='#8a5a2c'; c.lineWidth=12; linha(c,-120,0,-90,-210); linha(c,-60,0,-90,-210); linha(c,120,0,90,-210); linha(c,60,0,90,-210); c.lineWidth=11; linha(c,-100,-210,100,-210); c.restore(); }
function balancoAss(c,x,y,s,a){ rot(c,x,y,a,function(){ c.scale(s,s); c.strokeStyle='#666'; c.lineWidth=2.5; c.setLineDash([5,3]); linha(c,-26,0,-26,130); linha(c,26,0,26,130); c.setLineDash([]); box(c,-34,130,68,10,'#8a5428',3,2); }); }
function cataventoEst(c,x,y,h){ box(c,x-4,y-h,8,h,'#b0793e',1,1.5); }
function catavento(c,x,y,r,a){ var cor=['#e8423c','#f2a020','#f2d23a','#3fb04a','#3a7fd8','#9a52d0']; for(var i=0;i<6;i++) rot(c,x,y,a+i*TAU/6,function(){ c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(r*.5,-r*.5,r,-r*.2); c.lineTo(r*.2,r*.1); c.closePath(); fs(c,cor[i],1.4); }); c.fillStyle='#f2d23a'; circ(c,x,y,r*.1); fs(c,'#f2d23a',1.4); }
function piao(c,x,y,s,a){ c.save(); c.translate(x,y); c.scale(s,s); c.save(); c.scale(1,1); var cor=['#e8423c','#f2c23a','#3fb04a','#3a7fd8','#e8423c'], nn=5; var i; c.beginPath(); c.moveTo(-3,0); c.lineTo(3,0); c.lineTo(46,-46); c.quadraticCurveTo(0,-86,-46,-46); c.closePath(); c.save(); c.clip(); for(i=0;i<nn;i++){ c.fillStyle=cor[(i+Math.floor(a*3))%nn]; c.fillRect(-50,-90+i*18,100,18); } c.restore(); c.strokeStyle=OL; c.lineWidth=2.2; c.stroke(); box(c,-6,-92,12,20,'#e8423c',3,2); c.restore(); c.strokeStyle='#222'; c.lineWidth=2; c.beginPath(); c.arc(0,-6,44,PI*.15,PI*.85); c.stroke(); c.restore(); }
function praca(c){ /* cerca de grama e morros */
  c.fillStyle='#a4d67a'; c.beginPath(); c.moveTo(0,470); for(var x=0;x<=1400;x+=20) c.lineTo(x,330+Math.sin(x*TAU/700)*22); c.lineTo(1400,470); c.fill();
  c.fillStyle=lin(c,0,380,0,470,'#8bc958','#6db046'); c.fillRect(0,376,1400,94);
  [80,300,700,1000,1300].forEach(function(x,i){ box(c,x-9,300,18,88,'#7e5428',3); [[0,-26,46],[-30,4,34],[30,4,34]].forEach(function(b){ circ(c,x+b[0],300+b[1],b[2]); fs(c,i%2?'#5fa845':'#4f9a3e',1.5); }); });
  c.fillStyle='#e8d2a2'; for(x=0;x<1400;x+=32){ box(c,x+8,364,12,28,'#f2e6c2',2,1.4); } box(c,0,370,1400,6,'#f2e6c2',1,1);
}
var APR={};
function parquePerto(c){
  /* aparelhos: escorregador, balanço (estrutura), cata-vento, pião, bolas, gelo, planta, porta, roda, lata */
  escorrega(c,170,450,1.25);
  balanco(c,560,450,1.05);
  cataventoEst(c,870,450,250);
  bolaFut(c,1040,425,25);
  circ(c,1110,428,22); fs(c,'#d4e04a'); c.strokeStyle='#fff'; c.lineWidth=2; c.beginPath(); c.arc(1098,428,18,-.8,.8); c.stroke(); c.beginPath(); c.arc(1122,428,18,PI-.8,PI+.8); c.stroke();
  circ(c,1180,420,30); fs(c,'#e0752a'); c.strokeStyle=OL; c.lineWidth=2; linha(c,1150,420,1210,420); linha(c,1180,390,1180,450); c.beginPath(); c.arc(1150,420,22,-.9,.9); c.stroke(); c.beginPath(); c.arc(1210,420,22,PI-.9,PI+.9); c.stroke();
  /* bola de praia */ circ(c,1250,424,26); fs(c,'#fff'); [['#d9352e',.0],['#3a7fd8',2.1],['#f2c23a',4.2]].forEach(function(k){ c.beginPath(); c.moveTo(1250,424); c.arc(1250,424,25,k[1],k[1]+1.05); c.closePath(); c.fillStyle=k[0]; c.fill(); });
  /* bloco de gelo */
  poly(c,[[1360,380],[1436,380],[1456,398],[1456,450],[1380,450],[1360,432]]); fs(c,lin(c,1360,380,1456,450,'#e4f6ff','#8fd0ee'),2,'#4a8fb4'); poly(c,[[1360,380],[1436,380],[1456,398],[1380,398]]); c.fillStyle='rgba(255,255,255,.7)'; c.fill(); c.strokeStyle='#4a8fb4'; c.lineWidth=1.5; c.stroke(); c.fillStyle='rgba(180,225,245,.65)'; el(c,1400,454,80,6); c.fill();
  /* pérgola com planta pendurada (viva) e ventilador */
  box(c,1520,180,16,270,'#8a5a2c',2); box(c,1820,180,16,270,'#8a5a2c',2); box(c,1500,166,356,18,'#a0703a',3);
  /* porta com batente */
  box(c,1960,226,132,224,'#6e4018',3); box(c,1972,238,108,212,lin(c,0,238,0,450,'#c08246','#92602c'),2); [[1984,252],[2032,252],[1984,342],[2032,342]].forEach(function(p){ box(c,p[0],p[1],38,76,'#a87038',2,1.5); }); circ(c,2068,342,6); fs(c,'#e8c84a',1.5);
  /* roda (rolling) e lata vermelha deitada */
  circ(c,2230,410,40); fs(c,'#222'); circ(c,2230,410,24); fs(c,'#b8bec4'); circ(c,2230,410,6); fs(c,'#666');
  c.save(); c.translate(2340,428); c.rotate(-.1); box(c,-40,-22,80,44,lin(c,0,-22,0,22,'#ee3e3e','#b01c1c'),4); el(c,40,0,6,21); fs(c,'#c8ccd0'); c.restore();
  livroDeitado(c,2440,448,90,'#2f5fb0',0);
}
function longeGinasio(c,cam){ faixaP(c,camada('ginasio','L',1400,470,1.1,praca),cam,0); }
function pertoGinasio(c,cam,t){ var P=2600; faixaP(c,camada('ginasio','P',P,470,1,parquePerto),cam,0);
  function vivo(wx,fn){ var o=-mod(cam,P); for(var x=o+wx;x<W+300;x+=P) if(x>-300) fn(x); }
  vivo(560,function(x){ balancoAss(c,x-50,244,1.05,Math.sin(t*1.3)*.22); balancoAss(c,x+55,244,1.05,Math.sin(t*1.3+2)*.22); });
  vivo(870,function(x){ catavento(c,x,200,72,t*1.2); });
  vivo(720,function(x){ piao(c,x,450,1,t*2); });
  vivo(1620,function(x){ var a=Math.sin(t*1.1)*.16; rot(c,x,184,a,function(){ c.strokeStyle='#8a5a2c'; c.lineWidth=2; linha(c,-14,50,0,0); linha(c,14,50,0,0); vaso(c,0,108,.75,'#b9733a'); }); });
  vivo(1760,function(x){ c.fillStyle='#3f4348'; c.fillRect(x-3,184,6,22); circ(c,x,212,12); fs(c,'#dfe3e7',1.5); [0,1,2,3].forEach(function(i){ rot(c,x,212,t*1.4+i*PI/2,function(){ box(c,6,-7,62,14,'#b8bec6',3,1.5); }); }); }); }
function chaoGinasio(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#dcb477','#8c6a3a'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#7cc548'; c.fillRect(s.x,s.y,s.w,8); c.fillStyle='#a8e070'; c.fillRect(s.x,s.y,s.w,2); for(var x=grade(s.x,22);x<s.x+s.w;x+=22){ if(x<s.x) continue; c.fillStyle='rgba(90,60,25,.3)'; circ(c,x+hash(x)*12,s.y+22+hash(x+1)*Math.max(4,s.h-30),2); c.fill(); } c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }
function platGinasio(c,p){ var h=hash(p.x*.7+p.y); box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,h<.5?'#e8423c':'#dda764',h<.5?'#b01c1c':'#a2703a'),5,2.5); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(p.x+5,p.y+2,p.w-10,3); }

/* ============================================================
   ESTADIO = TUG-OF-WAR STADIUM
   ============================================================ */
A.CENAS.estadio={ceu:['#58b4ee','#a4dcf8','#eef8fa'], chaoTop:'#68b848', chao:'#4f9a38', chaoBase:'#336824', plat:'#c48d4e', platTop:'#e0b27c', part:'', musica:'mar'};
function ceuEstadio(c,t){ ceuG(c,[[0,'#50aeec'],[.7,'#a4dcf8'],[1,'#eef8f6']]); [[160,50,.9],[640,70,1.1]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*3,W+220)-110,n[1],n[2],'#fff','#e0ecf6',.9); }); }
function arquibancada(c){ var P=1500, i, j;
  box(c,-4,120,P+8,250,lin(c,0,120,0,370,'#7a8ca0','#54667a'),1,1);
  var cs=['#e8423c','#f2c23a','#3a7fd8','#3fb04a','#f97316','#fff','#ec4899','#8b5cf6'];
  for(j=0;j<7;j++){ c.fillStyle='rgba(0,0,0,.22)'; c.fillRect(0,132+j*32,P,4); for(i=0;i<P/18;i++){ var x=i*18+(j%2)*9, h=hash(i*1.3+j*7); c.fillStyle=cs[Math.floor(h*8)]; rr(c,x+2,144+j*32-8,13,18,4); c.fill(); c.fillStyle=['#f1c79c','#c98a58','#8a5a34'][Math.floor(hash(i+j)*3)]; circ(c,x+8.5,136+j*32-6,5); c.fill(); } }
  box(c,-4,90,P+8,32,'#22407e',1,1); [['PUSH',220,'#f97316'],['PULL',700,'#38bdf8'],['PUSH',1180,'#f97316']].forEach(function(k){ box(c,k[1]-70,94,140,24,'#fff',3,1.5); txt(c,k[0],k[1],106,18,k[2]); });
  [120,620,1120].forEach(function(x){ box(c,x-3,20,6,72,'#6b7686',1,1); box(c,x-34,8,68,24,'#e8ecf4',3,1.5); });
  box(c,-4,368,P+8,22,'#d9dde2',1,1); c.fillStyle=lin(c,0,388,0,470,'#6fbe4e','#4f9a38'); c.fillRect(0,388,P,82); for(i=0;i<8;i++){ c.fillStyle='rgba(255,255,255,.06)'; c.fillRect(i*190,388,95,82); }
  c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=3; linha(c,0,420,P,420);
}
function carrinho(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); poly(c,[[-74,-54],[74,-54],[64,-14],[-64,-14]]); fs(c,lin(c,0,-54,0,-14,'#e8423c','#b01c1c'),2.5); box(c,-74,-58,148,8,'#d42a2a',1,2); c.fillStyle='rgba(0,0,0,.25)'; [-34,0,34].forEach(function(d){ c.fillRect(d-1.5,-48,3,30); }); c.strokeStyle=OL; c.lineWidth=7; linha(c,74,-34,132,-90); c.lineWidth=4; [-44,44].forEach(function(d){ circ(c,d,-10,16); fs(c,'#222'); circ(c,d,-10,6); fs(c,'#c8ccd0',1.5); }); c.restore(); }
function gaveteiro(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); box(c,-120,-300,240,300,lin(c,-120,0,120,0,'#c08246','#a06a34'),3,3); box(c,-132,-312,264,16,'#b0743a',2,3); [-290,-195,-100].forEach(function(yy,i){ box(c,-108,yy,216,86,'#b67a40',3,2.2); box(c,-24,yy+36,48,10,'#e4e4e8',3,2); }); poly(c,[[-108,-195],[108,-195],[176,-142],[176,-92],[-40,-92],[-108,-110]]); fs(c,'#cf9356',2.5); poly(c,[[-40,-126],[176,-142],[176,-92],[-40,-92]]); fs(c,lin(c,0,-126,0,-92,'#d9a266','#b67a40'),2.5); box(c,50,-120,52,10,'#e4e4e8',3,2); c.restore(); }
function portaPush(c,x,y){ box(c,x-74,y-262,148,262,lin(c,0,y-262,0,y,'#d8452e','#ae2f1c'),2,3); box(c,x-34,y-236,68,70,'#bfe5f4',2,2.5); box(c,x-44,y-136,88,40,'#fff',2,2); txt(c,'PUSH',x,y-116,22,'#222'); box(c,x+42,y-100,30,10,'#c8ccd0',3,1.6); }
function cordaT(c,x0,x1,y){ c.strokeStyle='#8a6a34'; c.lineWidth=15; c.beginPath(); c.moveTo(x0,y); c.quadraticCurveTo((x0+x1)/2,y+12,x1,y); c.stroke(); c.strokeStyle='#d9b676'; c.lineWidth=10; c.setLineDash([9,5]); c.stroke(); c.setLineDash([]); box(c,(x0+x1)/2-8,y+2,16,22,'#e8423c',2,1.5); }
function estadioPerto(c){ cordaT(c,70,640,410); [70,640].forEach(function(x){ box(c,x-11,400,22,50,'#8a5a2c',3,2); });
  carrinho(c,810,450,1.2); caixaP(c,1240,450,150,130,false); gaveteiro(c,1620,450,.95); portaPush(c,1950,450); bolaFut(c,2120,420,30); cordaT(c,2220,2500,410); }
function longeEstadio(c,cam){ faixaP(c,camada('estadio','L',1500,470,1.1,arquibancada),cam,0); }
function pertoEstadio(c,cam){ faixaP(c,camada('estadio','P',2600,470,1,estadioPerto),cam,0); }
function chaoEstadio(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#62b444','#336824'); c.fillRect(s.x,s.y,s.w,s.h); for(var x=grade(s.x,90);x<s.x+s.w;x+=90){ if(x<s.x) continue; if(Math.floor(x/90)%2){ c.fillStyle='rgba(255,255,255,.07)'; c.fillRect(x,s.y,Math.min(90,s.x+s.w-x),s.h); } } c.fillStyle='#fff'; c.fillRect(s.x,s.y,s.w,4); c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }
function platEstadio(c,p){ var h=hash(p.x*.31+p.y); if(h<.5){ box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,'#d9a766','#b0803c'),2,2.5); c.strokeStyle='rgba(70,40,10,.5)'; c.lineWidth=2; c.strokeRect(p.x+p.w/2-10,p.y+1,20,p.h-2); } else { box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,'#c88c4e','#a06a34'),3,2.5); box(c,p.x+p.w/2-16,p.y+p.h/2-3,32,6,'#e4e4e8',3,1.3); } }

/* ============================================================
   TINTA = TWISTER! (céu do slide; o tornado é de outro arquivo)
   ============================================================ */
A.CENAS.tinta={ceu:['#3a424e','#5e6874','#8a939a'], chaoTop:'#6f9a4a', chao:'#585e60', chaoBase:'#2e3234', plat:'#a65a30', platTop:'#d6804a', part:'', musica:'chefao'};
function ceuTinta(c,t){ ceuG(c,[[0,'#3a424c'],[.5,'#5d6772'],[.85,'#8d969c'],[1,'#b0b8b4']]);
  [[120,40,2.2],[420,20,2.6],[760,50,2.2],[300,110,1.6],[640,120,1.7],[900,110,1.6],[40,130,1.5]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*(6+i),W+420)-210,n[1],n[2],i%2?'#6a7480':'#59626e','#3c444e',.95); }); }
function tempLonge(c){ /* a escola (hexágonos) com árvores tortas sob a tempestade */
  c.fillStyle='#7c927a'; c.beginPath(); c.moveTo(0,470); for(var x=0;x<=1400;x+=20) c.lineTo(x,352+Math.sin(x*TAU/700)*12); c.lineTo(1400,470); c.fill();
  [[300,370,150],[640,380,100],[1000,370,150]].forEach(function(k){ B.octo(c,k[0],k[1],k[2],k[2]*.62); fs(c,lin(c,0,k[1]-k[2]*.6,0,k[1]+40,'#a4a8a6','#6e7472'),2); B.octo(c,k[0],k[1]-20,k[2]*.38,k[2]*.22); fs(c,'#8c918f',1.4); });
  c.fillStyle=lin(c,0,396,0,470,'#6d8c50','#4f6a3a'); c.fillRect(0,396,1400,74); c.fillStyle='#3f4347'; poly(c,[[880,470],[960,400],[1000,400],[1040,470]]); c.fill();
  [90,500,830,1230].forEach(function(x,i){ c.strokeStyle='#5a3e22'; c.lineWidth=10; c.beginPath(); c.moveTo(x,410); c.quadraticCurveTo(x-6,370,x+26,340); c.stroke(); [[34,330,30],[64,340,24],[14,322,24]].forEach(function(b){ el(c,x+b[0],b[1],b[2]*1.2,b[2]*.8); fs(c,'#477a38',1.5); }); });
  /* telhados e casinha vermelha do slide */
  c.save(); c.translate(1160,420); box(c,-36,-40,72,40,'#d8c7a4',1); poly(c,[[-46,-38],[0,-68],[46,-38]]); fs(c,'#c43e24'); c.restore();
}
var VOAM=[function(c){ bolaFut(c,0,0,22); },function(c){ livroDeitado(c,0,10,58,'#2f5fb0',0); },function(c){ caixaP(c,-26,20,52,40,false); },function(c){ rr(c,-30,-22,60,44,10); fs(c,'#b090d8'); },function(c){ box(c,-5,-40,10,80,'#b0793e',2,1.4); },function(c){ poly(c,[[0,-24],[18,-4],[0,28],[-18,-4]]); fs(c,'#e8423c',1.5); },function(c){ box(c,-22,-16,44,32,'#c44440',2); c.fillStyle='#fff'; c.fillRect(-16,-10,32,4); },function(c){ circ(c,0,0,18); fs(c,'#f2c23a'); }];
function longeTinta(c,cam){ faixaP(c,camada('tinta','L',1400,470,1.1,tempLonge),cam,0); }
function pertoTinta(c,cam,t){ /* objetos girando no ar, sem pisca: trajetórias fixas no tempo */
  for(var i=0;i<8;i++){ var x=mod(i*137+t*(28+i*5)-cam*.4,W+120)-60, y=120+(i*53%210)+Math.sin(t*.9+i*1.7)*26; c.save(); c.translate(x,y); c.rotate(t*(.6+i*.08)+i); c.scale(.92,.92); VOAM[i](c); c.restore(); }
  c.strokeStyle='rgba(235,240,245,.35)'; c.lineWidth=3; for(i=0;i<5;i++){ var wx=mod(i*220+t*160,W+260)-130, wy=80+i*72; c.beginPath(); c.moveTo(wx,wy); c.quadraticCurveTo(wx+60,wy-14,wx+130,wy); c.stroke(); } }
function chaoTinta(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#5c6264','#2e3234'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#6f9a4a'; c.fillRect(s.x,s.y,s.w,8); c.fillStyle='rgba(0,0,0,.35)'; c.fillRect(s.x,s.y+8,s.w,2); c.fillStyle='#e8d87a'; if(s.h>60) for(var x=grade(s.x,80);x<s.x+s.w;x+=80){ if(x>=s.x&&x+40<s.x+s.w) c.fillRect(x,s.y+44,40,5); } c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }
function platTinta(c,p){ box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,'#c8683a','#8a4220'),2,2.5); c.strokeStyle='rgba(60,25,8,.5)'; c.lineWidth=1.4; for(var x=p.x+14;x<p.x+p.w-4;x+=14) { c.beginPath(); c.arc(x,p.y+3,7,0,PI); c.stroke(); } }

/* ============================================================
   BIBLIOTECA = sala de aula com o mapa da escola na parede
   ============================================================ */
A.CENAS.biblioteca={ceu:['#f4efd8','#efe6c4','#e4d8ae'], chaoTop:'#c4a074', chao:'#a68058', chaoBase:'#6e4e30', plat:'#b08048', platTop:'#d6a974', part:'', musica:'mapa'};
function ceuAula(c){ ceuG(c,[[0,'#f3f4dc'],[.72,'#ebe8c6'],[1,'#d2b488']]); }
function aula(c){ c.fillStyle=lin(c,0,0,0,372,'#f4f6e0','#e7e7c4'); c.fillRect(0,0,1000,372); c.fillStyle='#b98f62'; c.fillRect(0,372,1000,6); c.fillStyle=lin(c,0,378,0,470,'#d2ad80','#ad8456'); c.fillRect(0,378,1000,92);
  /* faixa verde como no título do slide */
  box(c,20,14,920,44,'#5cc060',2,2); txt(c,'Reading Maps',480,37,28,'#111',800);
  /* mapa da escola na parede */
  box(c,308,70,344,276,'#c99a58',3,3); c.save(); c.translate(322,82); c.scale(.532,.404); c.translate(-992,-258); B.planta(c,true); c.restore();
  /* lousa com as palavras da aula */
  box(c,24,76,262,176,'#2f6b4a',3,3); box(c,16,70,278,10,'#b08048',2); ['left','right','behind','under'].forEach(function(s,i){ txt(c,s,90+(i%2)*120,120+Math.floor(i/2)*60,26,'#f3f6e4',700); });
  /* janela */
  box(c,690,76,240,160,'#fff',2,3); c.fillStyle=lin(c,0,84,0,228,'#9ad6f2','#dff2fb'); c.fillRect(698,84,224,144); c.strokeStyle='#fff'; c.lineWidth=6; linha(c,810,84,810,228); circ(c,750,210,34); fs(c,'#7cb648',1.5); circ(c,860,214,40); fs(c,'#6aa63e',1.5);
  /* carteiras */
  [[110,396],[340,410],[620,410],[850,396]].forEach(function(k){ box(c,k[0]-66,k[1]-30,132,12,'#d6a660',2); [-56,48].forEach(function(d){ box(c,k[0]+d,k[1]-18,8,62,'#6e7a88',1,1.4); }); box(c,k[0]-40,k[1]-40,40,10,'#c44440',1,1.2); });
  vaso(c,40,370,.85,'#6fb0e6');
}
function longeBiblioteca(c){ c.drawImage(camada('biblioteca','L',1000,470,1.25,aula),0,0,1000,470); }
function pertoBiblioteca(){}
function chaoAula(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#c4a074','#6e4e30'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#e0c49a'; c.fillRect(s.x,s.y,s.w,5); c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }

/* ============================================================
   PISTA = savana, bichos ao fundo (rally)
   ============================================================ */
A.CENAS.pista={ceu:['#f4b860','#fbdc98','#fdeec8'], chaoTop:'#d9b850', chao:'#b48a40', chaoBase:'#7a5a28', plat:'#a87a3a', platTop:'#d6a858', part:'', musica:'pradaria'};
function ceuPista(c,t){ ceuG(c,[[0,'#70c4ee'],[.55,'#cfe6d8'],[.8,'#fbdc98'],[1,'#f4c870']]); sol(c,720,110,36,'#fff0b0','rgba(255,230,150,.4)'); [[120,70,1],[480,50,.8]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*3,W+200)-100,n[1],n[2],'#fff','#ece4d4',.9); }); }
function acacia(c,x,y,h){ c.strokeStyle='#5a3e22'; c.lineWidth=h*.06; linha(c,x,y,x,y-h*.6); linha(c,x,y-h*.5,x-h*.3,y-h*.8); linha(c,x,y-h*.5,x+h*.3,y-h*.8); el(c,x,y-h*.88,h*.6,h*.14); fs(c,'#5f8a36',1.5); }
function savana(c){ var P=1400;
  c.fillStyle='#d4b860'; c.beginPath(); c.moveTo(0,470); for(var x=0;x<=P;x+=20) c.lineTo(x,330+Math.sin(x*TAU/700)*14); c.lineTo(P,470); c.fill();
  c.fillStyle=lin(c,0,360,0,470,'#e4c868','#c8a040'); c.fillRect(0,366,P,104);
  [[120,120],[560,150],[860,110],[1240,140]].forEach(function(a){ acacia(c,a[0],380,a[1]*1.2); });
  /* girafa, elefante, zebra, leão, pássaro */
  function gir(x,y){ c.strokeStyle='#eab04a'; c.lineWidth=11; c.beginPath(); c.moveTo(x,y-46); c.quadraticCurveTo(x+8,y-90,x+30,y-120); c.stroke(); el(c,x-4,y-40,26,18); fs(c,'#eab04a',1.5); [-18,4,14].forEach(function(d){ c.fillStyle='#d09a38'; c.fillRect(x+d,y-26,5,26); }); el(c,x+36,y-122,12,7); fs(c,'#eab04a',1.2); c.fillStyle='#a8682a'; [[-8,-44],[6,-38],[12,-70]].forEach(function(p){ circ(c,x+p[0],y+p[1],3.6); c.fill(); }); }
  function ele(x,y){ el(c,x,y-38,44,32); fs(c,'#9098a0',1.5); circ(c,x+44,y-46,20); fs(c,'#9098a0',1.5); el(c,x+30,y-48,14,20); fs(c,'#a2a8b0',1.5); c.strokeStyle='#9098a0'; c.lineWidth=9; c.beginPath(); c.moveTo(x+60,y-40); c.quadraticCurveTo(x+72,y-18,x+62,y-4); c.stroke(); [-28,-8,14,30].forEach(function(d){ c.fillStyle='#8a929a'; c.fillRect(x+d,y-14,11,14); }); }
  function zeb(x,y){ el(c,x,y-34,28,17); fs(c,'#f4f4f0',1.5); circ(c,x+30,y-48,11); fs(c,'#f4f4f0',1.5); c.fillStyle='#222'; [-16,-6,4,14].forEach(function(d){ c.fillRect(x+d,y-50,3,28); }); [-18,14].forEach(function(d){ c.fillStyle='#ddd'; c.fillRect(x+d,y-22,5,22); }); }
  function leao(x,y){ el(c,x,y-26,28,16); fs(c,'#d9a24a',1.5); circ(c,x+26,y-38,16); fs(c,'#a8682a',1.5); circ(c,x+26,y-38,10); fs(c,'#e8bc64',1.2); [-18,12].forEach(function(d){ c.fillStyle='#c48e3e'; c.fillRect(x+d,y-14,6,14); }); }
  gir(240,386); ele(440,392); zeb(700,392); leao(980,392); gir(1120,386); zeb(1320,392);
  c.strokeStyle='#333'; c.lineWidth=2; [[300,120],[340,100],[880,130]].forEach(function(b){ c.beginPath(); c.arc(b[0]-6,b[1],6,PI,TAU); c.arc(b[0]+6,b[1],6,PI,TAU); c.stroke(); });
}
function longePista(c,cam){ faixaP(c,camada('pista','L',1400,470,1.1,savana),cam,0); }
function pertoPista(c,cam){}
function chaoPista(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#c8a048','#7a5a28'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#e8cc68'; c.fillRect(s.x,s.y,s.w,5); c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }

/* ============================================================
   SUBFASES: por baixo do sofá, porão da escola, dentro da torre,
   túnel da represa, raízes do campo, depósito do estádio.
   O cena.js manda 'sub_caverna'; a cena real vem de J.mundo.
   ============================================================ */
var SUBS={sub_sofa:['#3a1c1a','#c78a68','#6e3a2a','#b23a3a'], sub_porao:['#2e3238','#9aa09c','#4a4f54','#6e7478'], sub_torre:['#26323e','#a4662c','#5e3616','#b0702f'], sub_represa:['#0f3e52','#6e8a92','#34505c','#7a8a8c'], sub_raiz:['#3a2614','#8a6a3a','#54381c','#8a6030'], sub_deposito:['#34281e','#a88458','#5a4228','#c48d4e']};
Object.keys(SUBS).forEach(function(k){ var s=SUBS[k]; A.CENAS[k]={ceu:[s[0],s[0],s[0]], chaoTop:s[1], chao:s[2], chaoBase:s[0], plat:s[3], platTop:s[1], part:'', musica:'mapa'}; });
A.CENAS.sub_caverna=A.CENAS.sub_caverna||{}; ['ceu','chaoTop','chao','chaoBase','plat','platTop'].forEach(function(p){ A.CENAS.sub_caverna[p]=A.CENAS.sub_sofa[p]; }); A.CENAS.sub_caverna.part=''; A.CENAS.sub_caverna.musica='mapa';
var PAI={vila:'sub_sofa',bosque:'sub_porao',casa:'sub_torre',recife:'sub_represa',nuvens:'sub_raiz',ginasio:'sub_raiz',biscoito:'sub_raiz',estadio:'sub_deposito',tinta:'sub_porao'};
function subReal(cena){ if(cena!=='sub_caverna') return SUBS[cena]?cena:'sub_porao'; var j=JJ(), m=j&&j.mundo, r=m&&m.cena; if(r&&SUBS[r]) return r; var f=m&&m.fase&&m.fase.cena; return PAI[f]||'sub_sofa'; }
function subDesenho(k,c){ var i, x;
  if(k==='sub_sofa'){ /* debaixo do sofá: forro vermelho franjado, pés de madeira, coisas perdidas */
    c.fillStyle=lin(c,0,0,0,470,'#2a1414','#5a3a2a'); c.fillRect(0,0,960,470);
    c.fillStyle=lin(c,0,0,0,110,'#b23030','#6e1a1a'); c.fillRect(0,0,960,108); c.fillStyle='#8e2424'; for(x=0;x<960;x+=24){ poly(c,[[x,104],[x+24,104],[x+12,134]]); c.fill(); }
    [130,830].forEach(function(xx){ poly(c,[[xx-30,104],[xx+30,104],[xx+18,450],[xx-18,450]]); fs(c,lin(c,xx-30,0,xx+30,0,'#8a5a30','#4a2c14'),2.5); });
    box(c,300,396,70,54,'#3a7fd8',4); bolaFut(c,560,420,30); B.livroDeitado(c,700,448,80,'#c44440',.05); for(i=0;i<16;i++){ c.fillStyle='rgba(200,190,170,.35)'; circ(c,hash(i)*960,300+hash(i+2)*140,3+hash(i+3)*5); c.fill(); } }
  else if(k==='sub_porao'){ /* porão da escola: canos, caixas, mapas enrolados */
    c.fillStyle=lin(c,0,0,0,470,'#3a3f46','#26292e'); c.fillRect(0,0,960,470); c.strokeStyle='rgba(255,255,255,.07)'; c.lineWidth=2; for(i=0;i<9;i++) for(x=0;x<960;x+=64) c.strokeRect(x+(i%2)*32,i*50,64,50);
    c.strokeStyle='#7a8088'; c.lineWidth=14; linha(c,0,68,960,68); c.strokeStyle='#b05a30'; c.lineWidth=10; linha(c,0,94,960,94); [200,620].forEach(function(xx){ c.strokeStyle='#7a8088'; c.lineWidth=14; linha(c,xx,68,xx,330); });
    B.octo(c,420,260,120,120); fs(c,'rgba(170,175,172,.3)',2,'#8a9090'); B.octo(c,420,260,50,50); c.strokeStyle='#8a9090'; c.stroke(); txt(c,'Basement',420,260,20,'#c8ccc8',800);
    caixaP(c,640,450,110,90,false); caixaP(c,740,450,90,60,false); caixaP(c,70,450,100,80,false); for(i=0;i<3;i++){ el(c,820+i*22,440-i*2,8,8); fs(c,'#f4efdc',1.5); } }
  else if(k==='sub_torre'){ /* dentro da torre: escada e treliça, céu entre as vigas */
    c.fillStyle=lin(c,0,0,0,470,'#a4d2ee','#5f9cc4'); c.fillRect(0,0,960,470); B.trelica(c,0,960,0,240,12,'#6a3e1a'); B.trelica(c,0,960,240,470,12,'#6a3e1a'); c.strokeStyle='#5e3616'; c.lineWidth=14; linha(c,0,20,960,20); linha(c,0,240,960,240); linha(c,120,0,120,470); linha(c,840,0,840,470);
    for(i=0;i<9;i++){ box(c,300+i*38,420-i*30,42,10,'#a4662c',1,1.5); } c.strokeStyle='#5e3616'; c.lineWidth=5; linha(c,300,404,640,134); }
  else if(k==='sub_represa'){ /* túnel da represa: cano grande, grades */
    c.fillStyle=lin(c,0,0,0,470,'#3a5a68','#10303e'); c.fillRect(0,0,960,470); c.strokeStyle='rgba(180,220,235,.18)'; c.lineWidth=2; for(i=0;i<8;i++) linha(c,0,i*60,960,i*60);
    [180,500,820].forEach(function(xx){ circ(c,xx,220,120); fs(c,lin(c,0,100,0,340,'#6a8a96','#2a4a58'),6,'#20343e'); circ(c,xx,220,94); fs(c,'#0a2632',4,'#20343e'); c.strokeStyle='#5a7a86'; c.lineWidth=4; [-60,-30,0,30,60].forEach(function(d){ linha(c,xx+d,146,xx+d,294); }); c.fillStyle='rgba(120,210,240,.35)'; poly(c,[[xx-40,290],[xx+40,290],[xx+56,450],[xx-56,450]]); c.fill(); }); }
  else if(k==='sub_raiz'){ /* por baixo do campo: raízes, sementes, pedras */
    c.fillStyle=lin(c,0,0,0,470,'#5a3e22','#2c1e12'); c.fillRect(0,0,960,470); c.fillStyle='#74b84a'; c.fillRect(0,0,960,26); c.strokeStyle='#a8875a'; c.lineCap='round'; for(i=0;i<9;i++){ x=60+i*104; c.lineWidth=9; c.beginPath(); c.moveTo(x,26); c.bezierCurveTo(x+30,110,x-30,180,x+10,270+hash(i)*70); c.stroke(); c.lineWidth=4; c.beginPath(); c.moveTo(x+8,130); c.quadraticCurveTo(x+44,160,x+50,210); c.stroke(); }
    for(i=0;i<22;i++){ el(c,hash(i*3)*960,120+hash(i*7)*330,8+hash(i)*16,5+hash(i)*9); fs(c,'#7a6a58',1.2,'#3a2c1e'); } }
  else { /* depósito sob a arquibancada: degraus em diagonal, caixas e bolas */
    c.fillStyle=lin(c,0,0,0,470,'#3f3226','#221a12'); c.fillRect(0,0,960,470); c.fillStyle='#57697a'; for(i=0;i<8;i++){ poly(c,[[i*120,0],[i*120+120,0],[i*120+120,140-i*12],[i*120,152-i*12]]); c.fill(); c.strokeStyle='#2a3440'; c.lineWidth=2; c.stroke(); }
    caixaP(c,120,450,130,100,false); caixaP(c,280,450,100,70,false); bolaFut(c,470,420,30); box(c,660,330,190,120,'#b67a40',3,2); box(c,700,360,110,10,'#e4e4e8',3,1.5); box(c,700,410,110,10,'#e4e4e8',3,1.5); c.strokeStyle='#d9b676'; c.lineWidth=7; c.beginPath(); c.arc(590,430,20,0,TAU); c.stroke(); }
}
var sub0=A.fundoSub;
A.fundoSub=function(c,cena,cam,t){ var k=subReal(cena), cv=camada(k,'S',960,470,1,function(x){ subDesenho(k,x); }); c.save(); faixaP(c,cv,cam||0,0); c.restore(); };
function chaoSub(c,s,cena){ var k=subReal(cena), o=A.CENAS[k]; c.fillStyle=lin(c,0,s.y,0,s.y+s.h,o.chao,o.chaoBase); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle=o.chaoTop; c.fillRect(s.x,s.y,s.w,5); c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }
function platSub(c,p,cena){ var k=subReal(cena), o=A.CENAS[k]; if(k==='sub_torre') B.vigaP(c,p,'#b0702f','#744620'); else if(k==='sub_raiz') tronco(c,p,'#a87444','#6a4424'); else { box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,o.platTop,o.plat),3,2.5); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(p.x+4,p.y+2,p.w-8,2.5); } }

/* ============================================================
   TILES POR CENA: cano = caixa de papelão aberta / tubo; tijolo = caixa
   ou livro; espinhos = lápis em pé (quarto, sala) ou cones. Sem cano verde.
   ============================================================ */
var cano0=A.cano;
A.cano=function(c,p,cena,t,marcado){ var pre=cena==='vila'||cena==='biblioteca'||cena==='estadio', cor=pre?['#d9a766','#a8743a']:['#8ab4d4','#46708e'];
  c.save(); box(c,p.x+4,p.y+14,p.w-8,p.h-14,lin(c,p.x,0,p.x+p.w,0,cor[0],cor[1]),2,2.5); box(c,p.x,p.y,p.w,22,cor[0],4,2.5); c.fillStyle='rgba(20,12,4,.65)'; el(c,p.x+p.w/2,p.y+7,p.w/2-8,5); c.fill(); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(p.x+10,p.y+26,5,p.h-32); c.restore();
  if(marcado&&cano0){ var b=Math.sin(t*5)*4; c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(p.x+p.w/2,p.y-10+b); c.lineTo(p.x+p.w/2-12,p.y-30+b); c.lineTo(p.x+p.w/2+12,p.y-30+b); c.fill(); } };
A.tijolo=function(c,b,cena){ if(!b.vivo) return; var y=b.y-(b.bump||0); if(cena==='vila'||cena==='biblioteca'){ box(c,b.x+1,y+1,b.w-2,b.h-2,lin(c,0,y,0,y+b.h,'#3a70c4','#25508f'),4,2.5); c.fillStyle='#fdfaf0'; c.fillRect(b.x+b.w-8,y+5,6,b.h-10); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(b.x+5,y+5,b.w-16,3); }
  else { box(c,b.x+1,y+1,b.w-2,b.h-2,lin(c,0,y,0,y+b.h,'#d9a766','#a8743a'),2,2.5); c.strokeStyle='rgba(70,40,10,.6)'; c.lineWidth=2; c.strokeRect(b.x+b.w/2-6,y+2,12,b.h-4); } };
A.espinhos=function(c,s,cena){ for(var x=s.x;x<s.x+s.w-2;x+=15){ if(cena==='vila'||cena==='biblioteca'){ c.fillStyle=['#e8423c','#f2c23a','#3a7fd8','#3fb04a'][Math.floor(hash(x)*4)]; c.fillRect(x+3,s.y+9,9,s.h-9); c.fillStyle='#f2d7ae'; c.beginPath(); c.moveTo(x+3,s.y+9); c.lineTo(x+7.5,s.y); c.lineTo(x+12,s.y+9); c.fill(); c.fillStyle=OL; circ(c,x+7.5,s.y+2,1.5); c.fill(); }
  else { c.fillStyle='#f97316'; c.beginPath(); c.moveTo(x,s.y+s.h); c.lineTo(x+7.5,s.y); c.lineTo(x+15,s.y+s.h); c.fill(); c.fillStyle='#fff'; c.fillRect(x+4.5,s.y+s.h*.55,6,s.h*.16); c.strokeStyle=OL; c.lineWidth=1; c.beginPath(); c.moveTo(x,s.y+s.h); c.lineTo(x+7.5,s.y); c.lineTo(x+15,s.y+s.h); c.stroke(); } } };

/* ============================================================
   MAPA INICIAL — a Ilha dos Rangers em vista 3/4: mar em volta, colinas,
   montanha com a tempestade no topo e um caminho dourado ligando 9
   lugares (miniatura da fase em cada um). Tela 960x540; nós com y entre
   96 e 322 (HUD em cima, cartão embaixo, menu à direita de x=790).
   Só a ilha é cacheada; o céu, as nuvens, os passarinhos, o mar e as
   peças que giram são vivos (lentos, sem pisca, sem sorteio por frame).
   ============================================================ */
/* 1 casa · 2 escola · 3 torre · 4 represa · 5 campos · 6 parque · 7 savana · 8 estádio · 9 tempestade */
A.PARADAS_MAPA=[[84,320],[192,232],[300,320],[410,232],[520,320],[630,232],[738,318],[700,130],[500,98]];
A.MAPA_NOS=A.PARADAS_MAPA.map(function(p){ return {x:p[0],y:p[1]}; });
var NO=A.MAPA_NOS, HORIZ=172;
var ILHA=[[42,330],[58,252],[128,184],[246,152],[380,122],[506,106],[624,120],[724,150],[792,202],[818,272],[796,340],[724,386],[602,406],[462,412],[302,408],[162,392],[72,370]];
function blob(c,P,dx,dy,k){ /* contorno suave pelos pontos; k infla em volta do centro */
  dx=dx||0; dy=dy||0; k=k||1; var cx=0, cy=0; P.forEach(function(p){ cx+=p[0]; cy+=p[1]; }); cx/=P.length; cy/=P.length;
  var Q=P.map(function(p){ return [cx+(p[0]-cx)*k+dx, cy+(p[1]-cy)*k+dy]; }), n=Q.length;
  c.beginPath(); c.moveTo((Q[0][0]+Q[1][0])/2,(Q[0][1]+Q[1][1])/2);
  for(var i=1;i<=n;i++){ var a=Q[i%n], b=Q[(i+1)%n]; c.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2); } c.closePath();
}
function sombra(c,x,y,rx,ry){ c.fillStyle='rgba(20,60,10,.22)'; el(c,x,y,rx,ry); c.fill(); }
function arvM(c,x,y,r,cor){ c.fillStyle='#8a5a30'; c.fillRect(x-1.5,y-r*.6,3,r*.9); circ(c,x,y-r,r); fs(c,cor||'#4f9e45',1.4,'rgba(20,70,20,.6)'); c.fillStyle='rgba(255,255,255,.22)'; circ(c,x-r*.3,y-r*1.3,r*.4); c.fill(); }
function colina(c,x,y,rx,ry){ el(c,x,y,rx,ry); fs(c,lin(c,0,y-ry,0,y+ry,'#a9e46e','#6fbe44'),1.6,'rgba(40,90,20,.4)'); c.fillStyle='rgba(255,255,255,.2)'; el(c,x-rx*.25,y-ry*.45,rx*.4,ry*.3); c.fill(); }
function montanha(c,x,y,w,h){ /* montanha do chefão, com neve */
  poly(c,[[x-w,y],[x-w*.3,y-h*.55],[x,y-h],[x+w*.35,y-h*.5],[x+w,y]]); fs(c,lin(c,x-w,0,x+w,0,'#c4c9d6','#7d8495'),2,'rgba(40,45,60,.6)');
  poly(c,[[x-w*.3,y-h*.55],[x,y-h],[x+w*.35,y-h*.5],[x+w*.2,y-h*.35],[x,y-h*.42],[x-w*.15,y-h*.3]]); fs(c,'#fff','1.4','rgba(60,70,90,.4)');
  c.strokeStyle='rgba(40,45,60,.35)'; c.lineWidth=2; linha(c,x,y-h,x-w*.1,y-h*.2); linha(c,x,y-h,x+w*.22,y-h*.25);
}
/* ---------- as miniaturas (origem no pé do lugar) ---------- */
function miniCasa(c){ /* 1: a casa com a sala aconchegante — o sofá vermelho na janela grande */
  sombra(c,0,2,46,8);
  box(c,-34,-40,68,40,lin(c,0,-40,0,0,'#fff3cc','#f1cf8c'),3,2);
  box(c,-2,-30,30,22,'#9ad9f5',2,2);
  c.save(); c.beginPath(); c.rect(0,-28,26,18); c.clip(); c.fillStyle='#fde9c8'; c.fillRect(0,-28,26,18); c.fillStyle='#f6d9a8'; c.fillRect(0,-28,26,3);
  c.fillStyle='#d93b3b'; rr(c,2,-24,22,7,3); c.fill(); rr(c,1,-18,24,8,2); c.fill(); c.fillStyle='#f06060'; c.fillRect(4,-17,8,5); c.fillRect(14,-17,8,5); c.fillStyle='#f2c23a'; circ(c,22,-26,2.5); c.fill(); c.restore();
  c.strokeStyle=OL; c.lineWidth=1.4; linha(c,13,-30,13,-8); linha(c,-2,-19,28,-19);
  box(c,-26,-22,12,22,'#8a5428',2,1.8); c.fillStyle='#f2c23a'; circ(c,-17,-11,1.6); c.fill();
  poly(c,[[-42,-38],[0,-66],[42,-38]]); fs(c,lin(c,0,-66,0,-38,'#f26a52','#c8362a'),2);
  box(c,16,-62,10,16,'#9a6a4a',1,1.5); c.fillStyle='rgba(255,255,255,.85)'; [[21,-70,3.5],[26,-78,4.5],[33,-86,5.5]].forEach(function(p){ circ(c,p[0],p[1],p[2]); c.fill(); });
  arvM(c,-48,2,9); c.fillStyle='#4f9e45'; circ(c,42,-3,8); c.fill(); c.fillStyle='#ff6fa3'; [[40,-7],[46,-3],[-54,-2]].forEach(function(p){ circ(c,p[0],p[1],2.2); c.fill(); });
}
function miniEscola(c){ /* 2: a escola colorida, pátio e a casa na árvore */
  sombra(c,0,2,60,9);
  c.fillStyle='#ead9a8'; el(c,-20,-2,56,10); fs(c,'#ead9a8',1.2,'rgba(120,90,40,.4)');
  box(c,-42,-44,84,44,lin(c,0,-44,0,0,'#ffd34d','#f2a93b'),3,2);
  box(c,-46,-50,92,9,'#2f7fd6',3,2);
  box(c,-12,-70,24,22,'#f26a52',2,2); poly(c,[[-16,-70],[0,-84],[16,-70]]); fs(c,'#c8362a',2);
  circ(c,0,-59,5); fs(c,'#fff',1.2); c.strokeStyle=OL; c.lineWidth=1; linha(c,0,-59,0,-63); linha(c,0,-59,3,-59);
  [[-36,-36],[-20,-36],[12,-36],[28,-36]].forEach(function(p){ box(c,p[0],p[1],12,12,'#9ad9f5',1.5,1.5); c.fillStyle='rgba(255,255,255,.6)'; c.fillRect(p[0]+2,p[1]+2,4,4); });
  box(c,-7,-22,14,22,'#d64545',2,1.8); c.fillStyle='#f2c23a'; circ(c,4,-11,1.4); c.fill(); box(c,-12,-2,24,4,'#c9b084',1,1.2);
  c.strokeStyle='#555'; c.lineWidth=1.5; linha(c,38,-50,38,-78); poly(c,[[38,-78],[52,-73],[38,-68]]); fs(c,'#3fb04a',1);
  B.casaArvore(c,-64,0,1); arvM(c,56,-2,9,'#4f9e45');
}
function miniEiffel(c){ /* 3: a Torre Eiffel */
  sombra(c,0,2,38,7);
  poly(c,[[-30,0],[-16,0],[-10,-30],[10,-30],[16,0],[30,0],[14,-30],[8,-54],[3,-84],[-3,-84],[-8,-54],[-14,-30]]); fs(c,lin(c,0,-84,0,0,'#e09a52','#8e5222'),2);
  box(c,-18,-32,36,5,'#b8743a',1,1.5); box(c,-9,-56,18,4,'#b8743a',1,1.5);
  c.strokeStyle='rgba(60,30,10,.5)'; c.lineWidth=1; [[-24,0,-12,-28],[24,0,12,-28],[-12,-32,-6,-52],[12,-32,6,-52]].forEach(function(l){ linha(c,l[0],l[1],l[2],l[3]); linha(c,l[2],l[1],l[0],l[3]); });
  c.beginPath(); c.arc(0,-6,12,PI,0); c.strokeStyle='#8e5222'; c.lineWidth=2.5; c.stroke(); linha(c,0,-84,0,-94);
  arvM(c,-40,2,8); arvM(c,40,2,8); c.fillStyle='#ff6fa3'; circ(c,-44,0,2); c.fill(); c.fillStyle='#f2c23a'; circ(c,46,-1,2); c.fill();
}
function miniRepresa(c){ /* 4: o rio bravo com a represa */
  sombra(c,0,4,50,8);
  el(c,0,-44,46,16); fs(c,'#3f9ee0',1.5,'#2a6fb0'); c.fillStyle='rgba(255,255,255,.35)'; el(c,-12,-48,18,5); c.fill();
  [[-52,-48,9],[50,-50,8],[-30,-60,7],[36,-64,7]].forEach(function(p){ arvM(c,p[0],p[1],p[2]); });
  c.beginPath(); c.moveTo(-40,-38); c.quadraticCurveTo(0,-22,40,-38); c.lineTo(40,-10); c.quadraticCurveTo(0,4,-40,-10); c.closePath(); fs(c,lin(c,0,-38,0,0,'#dfe3e8','#8d949e'),2);
  c.strokeStyle='rgba(60,70,80,.45)'; c.lineWidth=1.2; [-26,-13,0,13,26].forEach(function(x){ linha(c,x,-30,x,-8); });
  box(c,-46,-46,10,16,'#c4cad2',1,1.5); box(c,36,-46,10,16,'#c4cad2',1,1.5);
  c.fillStyle='rgba(120,200,250,.9)'; [-18,0,18].forEach(function(x){ poly(c,[[x-5,-26],[x+5,-26],[x+7,2],[x-7,2]]); c.fill(); }); c.fillStyle='rgba(255,255,255,.8)'; [-18,0,18].forEach(function(x){ c.fillRect(x-1,-24,2,24); });
  el(c,0,4,44,8); fs(c,'#5fb8f0',1.5,'#2a6fb0'); c.fillStyle='rgba(255,255,255,.6)'; [[-20,2],[0,5],[18,3]].forEach(function(p){ el(c,p[0],p[1],6,2); c.fill(); });
}
var TURB_M=[[-28,-14,46],[6,-8,58],[36,-16,40]];
function miniCampos(c){ /* 5: campo com turbinas (as pás giram em vivoIlha) e pipas */
  sombra(c,0,2,58,9);
  rot(c,0,-18,-.1,function(){ el(c,0,0,60,22); fs(c,lin(c,0,-22,0,22,'#dce66c','#a9cf4a'),1.5,'rgba(60,100,20,.5)'); c.strokeStyle='rgba(120,150,40,.55)'; c.lineWidth=2; [-12,-4,4,12].forEach(function(y){ linha(c,-52,y,52,y); }); });
  TURB_M.forEach(function(k){ torreT(c,k[0],k[1],k[2]); });
  arvM(c,-58,-6,8); arvM(c,56,-4,7); c.fillStyle='#f2c23a'; [[-30,-6],[8,-2],[30,-8]].forEach(function(p){ circ(c,p[0],p[1],2); c.fill(); });
}
function miniParque(c){ /* 6: parque com escorregador vermelho, balanço e cata-vento (os vivos ficam em vivoIlha) */
  sombra(c,0,2,58,9);
  el(c,0,-6,58,14); fs(c,'#efd9a2',1.2,'rgba(140,100,40,.4)');
  escorrega(c,-34,-6,.3); balanco(c,32,-6,.3); cataventoEst(c,2,-6,54);
  arvM(c,-60,-8,9); arvM(c,62,-6,8); c.fillStyle='#ff6fa3'; [[-50,-2],[52,0]].forEach(function(p){ circ(c,p[0],p[1],2.2); c.fill(); });
}
function miniSavana(c){ /* 7: a savana com bichos */
  sombra(c,0,2,58,9);
  el(c,0,-10,60,16); fs(c,lin(c,0,-26,0,6,'#f3d574','#d9b24e'),1.5,'rgba(120,80,20,.45)');
  acacia(c,-44,-14,40); acacia(c,46,-18,34);
  c.strokeStyle='#eab04a'; c.lineWidth=5; c.beginPath(); c.moveTo(-6,-22); c.quadraticCurveTo(-2,-40,8,-52); c.stroke(); el(c,-8,-20,11,7); fs(c,'#eab04a',1.2); el(c,10,-53,6,3.5); fs(c,'#eab04a',1); c.fillStyle='#a8682a'; [[-10,-21],[-4,-18],[3,-38]].forEach(function(p){ circ(c,p[0],p[1],1.6); c.fill(); }); c.fillStyle='#d09a38'; [-14,-10,-4,0].forEach(function(d){ c.fillRect(d,-15,2.5,10); });
  el(c,26,-14,13,9); fs(c,'#9098a0',1.2); circ(c,38,-18,6.5); fs(c,'#9098a0',1.2); el(c,34,-18,5,6); fs(c,'#a2a8b0',1); c.strokeStyle='#9098a0'; c.lineWidth=3; c.beginPath(); c.moveTo(43,-16); c.quadraticCurveTo(48,-8,44,-4); c.stroke(); c.fillStyle='#8a929a'; [18,24,30].forEach(function(d){ c.fillRect(d,-8,4,6); });
  el(c,-34,-10,9,5); fs(c,'#f4f4f0',1); circ(c,-26,-14,3.5); fs(c,'#f4f4f0',1); c.fillStyle='#222'; [-39,-35,-31].forEach(function(d){ c.fillRect(d,-14,1.3,8); });
}
function miniEstadio(c){ /* 8: o estádio do cabo de guerra */
  sombra(c,0,6,60,10);
  c.beginPath(); c.moveTo(-52,-28); c.lineTo(-52,-8); c.ellipse(0,-8,52,22,0,PI,0,true); c.lineTo(52,-28); c.ellipse(0,-28,52,22,0,0,PI,false); c.closePath(); fs(c,lin(c,0,-30,0,14,'#eef2f6','#9aa6b4'),2);
  c.strokeStyle='rgba(60,70,90,.25)'; c.lineWidth=1.2; for(var a=.3;a<PI;a+=.42){ var x=Math.cos(a)*52, y=-28+Math.sin(a)*22; linha(c,x,y,x,y+20); }
  el(c,0,-28,52,22); fs(c,'#6b7a8e',2); el(c,0,-28,46,18); fs(c,'#e8423c',1); el(c,0,-28,40,15); fs(c,'#f2c23a',1); el(c,0,-28,34,12); fs(c,'#3a7fd8',1);
  el(c,0,-28,27,9); fs(c,'#5fb848',1.4); c.strokeStyle='#fff'; c.lineWidth=1.3; linha(c,0,-37,0,-19); c.beginPath(); c.ellipse(0,-28,8,3,0,0,TAU); c.stroke();
  [[-46,-44],[46,-44]].forEach(function(p){ box(c,p[0]-2,p[1],4,20,'#6b7686',1,1.2); box(c,p[0]-10,p[1]-8,20,9,'#f4f7fb',2,1.4); });
  c.fillStyle='#e8423c'; poly(c,[[-30,-56],[-30,-44],[-18,-50]]); c.fill(); c.fillStyle='#3a7fd8'; poly(c,[[30,-56],[30,-44],[18,-50]]); c.fill(); c.strokeStyle=OL; c.lineWidth=1.2; linha(c,-30,-56,-30,-40); linha(c,30,-56,30,-40);
}
function miniTempestade(c){ /* 9: a nuvem de tempestade (a cara do Twister fica à direita do nó) */
  nuvemF(c,-10,0,.95,'#8d97a8','#4a5262',1);
  c.fillStyle='#fde047'; poly(c,[[-30,8],[-22,-6],[-26,-6],[-18,-20],[-30,-2],[-25,-2]]); c.fill();
  c.fillStyle='#fff'; el(c,22,-14,7,8); fs(c,'#fff',1.4); el(c,42,-14,7,8); fs(c,'#fff',1.4); c.fillStyle='#222'; circ(c,24,-13,3); c.fill(); circ(c,44,-13,3); c.fill();
  c.strokeStyle='#222'; c.lineWidth=2.5; linha(c,12,-28,28,-22); linha(c,54,-28,38,-22);
  c.beginPath(); c.arc(33,-4,9,.15,PI-.15); c.stroke(); c.fillStyle='#fff'; c.fillRect(27,-2,5,4); c.fillRect(35,-2,5,4);
}
var MINIS=[miniCasa,miniEscola,miniEiffel,miniRepresa,miniCampos,miniParque,miniSavana,miniEstadio,miniTempestade];
function ceuIlha(c){ ceuG(c,[[0,'#2b8ae6'],[.3,'#6fbdf2'],[1,'#dff3ff']]); sol(c,108,78,24,'#fff3b0','rgba(255,240,170,.35)'); }
function caminhoIlha(c){ var P=NO; c.lineCap='round'; c.lineJoin='round';
  function rota(){ c.beginPath(); c.moveTo(P[0].x,P[0].y); for(var k=0;k<P.length-1;k++){ var a=P[k], b=P[k+1]; c.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2-24,b.x,b.y); } c.stroke(); }
  c.strokeStyle='rgba(40,70,20,.35)'; c.lineWidth=20; c.save(); c.translate(0,4); rota(); c.restore();
  c.strokeStyle='#a9701f'; c.lineWidth=18; rota(); c.strokeStyle='#f6c453'; c.lineWidth=12; rota(); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=3; c.setLineDash([9,13]); rota(); c.setLineDash([]); }
function ilhaBase(c){ var i, x;
  /* mar */
  c.fillStyle=lin(c,0,HORIZ,0,H,'#55bdf0','#1d6cc2'); c.fillRect(0,HORIZ,W,H-HORIZ); c.fillStyle='rgba(255,255,255,.55)'; c.fillRect(0,HORIZ,W,3);
  c.strokeStyle='rgba(255,255,255,.14)'; c.lineWidth=2; for(i=0;i<12;i++){ var y=HORIZ+20+i*31; c.beginPath(); for(x=0;x<=W;x+=16) c.lineTo(x,y+Math.sin(x*.05+i)*3); c.stroke(); }
  /* a ilha em camadas: sombra no mar, raso, praia, lado da falésia e o tampo verde */
  blob(c,ILHA,10,26,1.03); c.fillStyle='rgba(8,40,100,.3)'; c.fill();
  blob(c,ILHA,0,12,1.09); c.fillStyle='rgba(170,240,245,.6)'; c.fill(); c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=2.5; c.setLineDash([7,11]); c.stroke(); c.setLineDash([]);
  blob(c,ILHA,0,10,1.045); c.fillStyle='#f4e3a8'; c.fill(); c.strokeStyle='rgba(150,110,40,.4)'; c.lineWidth=1.5; c.stroke();
  blob(c,ILHA,0,13,1); c.fillStyle='#4d8f30'; c.fill();
  blob(c,ILHA); c.fillStyle=lin(c,0,100,0,420,'#97dc5e','#64b93f'); c.fill(); c.strokeStyle='rgba(40,90,20,.55)'; c.lineWidth=2; c.stroke();
  /* colinas, montanha, matinhas */
  colina(c,150,268,64,26); colina(c,330,176,58,24); colina(c,620,330,56,22); colina(c,760,236,46,20); colina(c,250,392,70,16);
  montanha(c,540,214,120,104);
  [[70,210,9],[110,196,7],[230,170,8],[290,190,6],[560,372,9],[600,386,7],[400,372,8],[690,386,8],[780,300,7],[640,160,7],[330,240,6]].forEach(function(p){ arvM(c,p[0],p[1],p[2],p[1]%2?'#4f9e45':'#3f8f3a'); });
  c.fillStyle='#ff6fa3'; [[190,300],[360,390],[470,180],[690,330],[120,250]].forEach(function(p){ circ(c,p[0],p[1],2.4); c.fill(); }); c.fillStyle='#fff'; [[205,306],[380,398],[650,340],[150,240]].forEach(function(p){ circ(c,p[0],p[1],2.2); c.fill(); });
  caminhoIlha(c);
  /* os lugares, do norte para o sul (3/4: o que está atrás se desenha antes) */
  var ordem=[8,7,1,3,5,0,2,4,6]; ordem.forEach(function(i){ var p=NO[i]; c.save(); c.translate(p.x,p.y-(i===8?-6:8)); MINIS[i](c); c.restore(); });
}
function passaro(c,x,y,s,f){ c.strokeStyle='#2a2e3a'; c.lineWidth=2*s; c.lineCap='round'; c.beginPath(); c.moveTo(x-9*s,y-f*4*s); c.quadraticCurveTo(x-4*s,y+2*s,x,y); c.quadraticCurveTo(x+4*s,y+2*s,x+9*s,y-f*4*s); c.stroke(); }
function barco(c,x,y){ poly(c,[[x-18,y],[x+18,y],[x+12,y+9],[x-12,y+9]]); fs(c,'#d9573a',1.5); c.strokeStyle='#5a3a20'; c.lineWidth=2; linha(c,x,y,x,y-26); poly(c,[[x+2,y-26],[x+18,y-6],[x+2,y-4]]); fs(c,'#fff',1.4); poly(c,[[x-2,y-22],[x-14,y-6],[x-2,y-4]]); fs(c,'#ffd166',1.4); }
function vivoIlha(c,t){ var i, p;
  /* turbinas e pipas (5) */
  p=NO[4]; TURB_M.forEach(function(k,j){ rotor(c,p.x+k[0],p.y-8+k[1]-k[2],k[2]*.62,t*1.1+j*1.4); });
  pipa(c,p.x-46+Math.sin(t*.7)*5,p.y-92+Math.sin(t*.9)*5,.42,.32+Math.sin(t*.8)*.1); pipa(c,p.x+50+Math.sin(t*.8+2)*5,p.y-84+Math.sin(t*1.1+1)*5,.36,-.28+Math.sin(t*.7)*.1);
  /* balanço e cata-vento (6) */
  p=NO[5]; balancoAss(c,p.x+18,p.y-14-62,.3,Math.sin(t*1.3)*.26); balancoAss(c,p.x+47,p.y-14-62,.3,Math.sin(t*1.3+2.2)*.26); catavento(c,p.x+2,p.y-14-54,15,t*1.2);
  /* o funil do Twister (9), à direita do nó, balançando devagar */
  p=NO[8]; var sx=Math.sin(t*1.4)*7, x0=p.x+36, y0=p.y-4, x1=p.x+44+sx, y1=p.y+50;
  c.beginPath(); c.moveTo(x0-28,y0); c.quadraticCurveTo(x0-2,y0+22,x1-4,y1); c.lineTo(x1+4,y1); c.quadraticCurveTo(x0+38,y0+22,x0+28,y0); c.closePath(); fs(c,lin(c,x0-28,0,x0+28,0,'#dfe4ec','#9aa3b4'),2,'rgba(40,45,60,.75)');
  c.strokeStyle='rgba(40,45,60,.35)'; c.lineWidth=2.2; for(i=0;i<5;i++){ var u=.1+i*.19, hw=28-24*u, wx=x0+(x1-x0)*u, wy=y0+(y1-y0)*u, fase=Math.sin(t*1.2+i)*2; c.beginPath(); c.moveTo(wx-hw,wy+fase); c.quadraticCurveTo(wx,wy+6,wx+hw,wy-4+fase); c.stroke(); }
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=2; [[-1,.3],[1,.55]].forEach(function(k){ var wx=x0+(x1-x0)*k[1]+k[0]*(30-24*k[1])+k[0]*8, wy=y0+(y1-y0)*k[1]; c.beginPath(); c.moveTo(wx,wy-4); c.quadraticCurveTo(wx+k[0]*7,wy,wx,wy+5); c.stroke(); });
  for(i=0;i<3;i++){ var a=t*1+i*2.1, dx=Math.cos(a)*(22+i*4), dy=Math.sin(a)*6; c.fillStyle=['#f2c23a','#3fb04a','#e8423c'][i]; circ(c,x0+dx,y0+18+i*12+dy,3); c.fill(); }
  /* passarinhos */
  for(i=0;i<4;i++){ var bx=mod(t*22+i*260,W+80)-40, by=58+(i*23)%60+Math.sin(t*.9+i)*5; passaro(c,bx,by,.9+i*.1,Math.sin(t*7+i*1.3)); }
  /* o mar: brilhos que respiram e um barquinho */
  for(i=0;i<14;i++){ var al=.25+.3*Math.sin(t*1.3+i*1.7); if(al<=0) continue; c.strokeStyle='rgba(255,255,255,'+al.toFixed(2)+')'; c.lineWidth=2; var wx2=i<10?70+hash(i*3.3)*800:830+hash(i*2.2)*110, wy2=i<10?418+hash(i*7.1)*36:286+hash(i*5.5)*150; linha(c,wx2-6,wy2,wx2+6,wy2); }
  barco(c,mod(t*9,520)+120,434+Math.sin(t*1.2)*2);
}
function nuvensFundo(c,t){ [[60,96,.8],[380,70,1],[700,100,.7],[880,70,.9]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*(3+i),W+260)-130,n[1],n[2],'#fff','#dceaf6',.95); }); }
A.mapaLivro=function(c,t){ t=t||0; ceuIlha(c); nuvensFundo(c,t); c.drawImage(camada('fixo','ilha',W,H,2,ilhaBase),0,0,W,H); vivoIlha(c,t);
  /* o Pin marca onde se está (o nó escolhido; na viagem, o destino) */
  var j=JJ(), i=j?(j.mapaAnim?j.mapaAnim.para:j.sel):0; if(!(i>=0&&i<NO.length)) i=0; var p=NO[i], b=Math.sin(t*2)*3;
  c.fillStyle='rgba(226,31,38,.25)'; el(c,p.x+28,p.y-10,9+Math.sin(t*2)*2,3.5); c.fill(); B.pinoV(c,p.x+28,p.y-16+b,.95); };

/* ============================================================
   CAPA — céu, faixa do título, cartão-postal da ilha, o Pin e dois Rangers
   ============================================================ */
function capaBase(c){
  ceuG(c,[[0,'#2b8ae6'],[.45,'#8fcdf4'],[1,'#e6f6ff']]); sol(c,96,176,34,'#fff3b0','rgba(255,240,170,.35)');
  [[40,230,.9],[700,210,1.1],[520,150,.7]].forEach(function(n){ nuvemF(c,n[0],n[1],n[2],'#fff','#dceaf6',.95); });
  box(c,28,16,904,104,lin(c,0,16,0,120,'#6ad068','#3d9e44'),16,3);
  c.lineJoin='round'; c.font='900 58px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=11; c.strokeStyle='#123a18'; c.strokeText('Motion Rangers',480,54); c.fillStyle='#fff8d0'; c.fillText('Motion Rangers',480,54); txt(c,'Find Everything!',480,100,22,'#123a18');
  rot(c,392,286,-.04,function(){ c.fillStyle='rgba(10,40,80,.3)'; rr(c,-272,-140,564,296,14); c.fill(); rr(c,-282,-150,564,296,14); fs(c,'#fff',3,'#2a2018');
    c.save(); rr(c,-270,-138,540,272,8); c.clip(); c.translate(-270,-154); c.scale(540/W,540/W); ceuIlha(c); c.drawImage(camada('fixo','ilha',W,H,2,ilhaBase),0,0,W,H); c.restore(); });
}
A.capaLivro=function(c,t,sel){ t=t||0; c.drawImage(camada('fixo','capa',W,H,2,capaBase),0,0,W,H); var by=Math.sin(t*1.6)*7;
  if(A.heroi){ A.heroi(c,776,430,'idle',t,1,1.15,'helmet'); A.heroi(c,886,430,'idle',t+1.5,-1,1.15,'pony'); }
  c.fillStyle='rgba(226,31,38,.25)'; el(c,826,300,26+Math.sin(t*1.6)*3,8); c.fill(); B.pinoV(c,826,292+by,3.6); };
A.capaLivro.LIVRE_Y=440;

/* ---------- embrulho ---------- */
var F={
  nuvens:{ceu:ceuNuvens,longe:longeNuvens,perto:pertoNuvens,chao:chaoNuvens,plat:platNuvens},
  ginasio:{ceu:ceuParque,longe:longeGinasio,perto:pertoGinasio,chao:chaoGinasio,plat:platGinasio},
  biscoito:{ceu:ceuParque,longe:longeGinasio,perto:pertoGinasio,chao:chaoGinasio,plat:platGinasio},
  estadio:{ceu:ceuEstadio,longe:longeEstadio,perto:pertoEstadio,chao:chaoEstadio,plat:platEstadio},
  tinta:{ceu:ceuTinta,longe:longeTinta,perto:pertoTinta,chao:chaoTinta,plat:platTinta},
  biblioteca:{ceu:ceuAula,longe:longeBiblioteca,perto:pertoBiblioteca,chao:chaoAula,plat:platGinasio},
  pista:{ceu:ceuPista,longe:longePista,perto:pertoPista,chao:chaoPista,plat:platGinasio}
};
function ehSub(cena){ return !!(SUBS[cena]||cena==='sub_caverna'); }
function ceuSub(c,cena){ var o=A.CENAS[subReal(cena)]; c.fillStyle=o.ceu[0]; c.fillRect(0,0,W,H); }
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma;
A.ceu=function(c,cena,t){ if(ehSub(cena)){ ceuSub(c,cena); return; } var f=F[cena]; if(f){ c.save(); f.ceu(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ if(ehSub(cena)){ return; } var f=F[cena]; if(f){ c.save(); f.longe(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ if(ehSub(cena)){ return; } var f=F[cena]; if(f){ c.save(); f.perto(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.chao=function(c,s,cena){ if(ehSub(cena)){ c.save(); chaoSub(c,s,cena); c.restore(); return; } var f=F[cena]; if(f){ c.save(); f.chao(c,s); c.restore(); return; } chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ if(ehSub(cena)){ c.save(); platSub(c,p,cena); c.restore(); return; } var f=F[cena]; if(f){ c.save(); f.plat(c,p); c.restore(); return; } plat0(c,p,cena); };
})();
