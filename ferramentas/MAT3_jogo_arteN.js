/* ============================================================
   MAT3_jogo_arteN.js — cenários de "Math Stars" (escrito à mão; o fork não toca).
   Mesmas chaves internas de cena do motor (vila, bosque, casa, recife, nuvens, ginasio, pista,
   estadio, tinta, sub_*), desenho novo, tudo tirado dos slides de Math do 3º tri:
     vila    = Long and Short Lane : lápis comprido × curto, livro largo × estreito, árvore alta × baixa
     bosque  = Perimeter Park      : canteiros retangulares com os lados em cm e o contorno tracejado
     casa    = Solid Tower         : torre de cubos e cuboides (faces planas empilham), sólidos ao fundo
     recife  = Bar Graph Bay       : o gráfico do slide (Hamsters 4, Rabbits 2, Dogs 6, Cats 3) e os
                                     blocos viram BARRAS com a régua de números (ler a altura)
     nuvens  = Chance Sky          : a seta da probabilidade (certain…impossible), a escola, o deserto
     ginasio = Equal Groups Garden : 3 grupos de 5 flores, 4 grupos de 3 botões, 5 saquinhos de 2 cookies
     estadio = Sharing Picnic      : 10 laranjas em 2 pratos iguais, maçãs, cookies
     tinta   = The Big Eraser      : a sala de aula com o quadro de números meio apagado
   Contrato: A.ceu/longe/perto/chao/plataforma/platMovel/platCaindo/tijolo/espinhos/cano/fundoSub,
   A.ceuDoRio, A.mapaLivro, A.MAPA_NOS, A.capaLivro. Sem aleatório por quadro (hash da posição).
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A) return;
var W=960, H=540, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, OL='#2a2018', FONTE='"Nunito","Segoe UI",Arial,sans-serif';
function fs(c,f,st,lw){ c.fillStyle=f; c.fill(); c.strokeStyle=st||OL; c.lineWidth=lw==null?2:lw; c.stroke(); }
function lin(c,x0,y0,x1,y1,a,b){ var g=c.createLinearGradient(x0,y0,x1,y1); g.addColorStop(0,a); g.addColorStop(1,b); return g; }
function hs(n){ var x=Math.sin(n*12.9898+78.233)*43758.5453; return x-Math.floor(x); }
function mod(a,b){ return ((a%b)+b)%b; }
/* rótulo do cenário (longer, narrow, 5 cm, 10 ÷ 2 = 5…) some enquanto há pergunta na tela: atrás do quadro escurecido ele
   espiava e podia entregar a resposta (revisor-sentido r2). Mapa e capa não desenham durante a pergunta. */
function txt(c,s,x,y,px,cor,peso){ if(window.JOGO&&JOGO.J&&JOGO.J.quiz) return; c.font=(peso||900)+' '+px+'px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle=cor; c.fillText(s,x,y); }
function ceuG(c,a,b,cc){ var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,a); g.addColorStop(.65,b); g.addColorStop(1,cc||b); c.fillStyle=g; c.fillRect(0,0,W,H); }
function nuvem(c,x,y,s,cor){ c.fillStyle=cor||'rgba(255,255,255,.9)'; circ(c,x,y,18*s); c.fill(); circ(c,x+22*s,y-9*s,23*s); c.fill(); circ(c,x+46*s,y,17*s); c.fill(); rr(c,x-8*s,y,62*s,14*s,7*s); c.fill(); }
function nuvens(c,t,n){ for(var i=0;i<(n||4);i++) nuvem(c,mod(i*260+60-t*6*(1+i%2),W+200)-100,60+(i%3)*34,.8+(i%2)*.4); }
/* parallax: desenha f(x0) em faixas de 960 px deslocadas pela câmera */
function faixa(c,cam,f){ var o=-mod(cam,W); c.save(); c.translate(o,0); f(0); c.translate(W,0); f(1); c.restore(); }
function lapisD(c,x,y,len,h,ang){ c.save(); c.translate(x,y); c.rotate(ang||0); var tip=h*1.3; rr(c,0,-h/2,h*.7,h,h*.2); fs(c,'#f4a7b9','#9d174d',1.6); c.fillStyle='#cbd5e1'; c.fillRect(h*.7,-h/2,h*.35,h); c.beginPath(); c.rect(h*1.05,-h/2,len-h*1.05-tip,h); fs(c,lin(c,0,-h/2,0,h/2,'#ffe066','#f5b800'),'#7a5a00',1.6);
  c.beginPath(); c.moveTo(len-tip,-h/2); c.lineTo(len,0); c.lineTo(len-tip,h/2); c.closePath(); fs(c,'#f3e0c0','#7a5a00',1.4); c.beginPath(); c.moveTo(len-tip*.35,-h*.17); c.lineTo(len,0); c.lineTo(len-tip*.35,h*.17); c.closePath(); c.fillStyle='#1f2937'; c.fill(); c.restore(); }
function arvore(c,x,base,alt,cor){ var tr=Math.max(14,alt*.28); rr(c,x-6,base-tr,12,tr,2); fs(c,'#a0703c','#5b3a1a',1.4); el(c,x,base-tr-(alt-tr)/2,Math.max(20,alt*.3),(alt-tr)/2); fs(c,cor||'#7cc576','#2f6b2a',1.6); }
function seta(c,x0,y0,x1,y1,cor){ c.strokeStyle=cor; c.fillStyle=cor; c.lineWidth=3; c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.stroke(); var a=Math.atan2(y1-y0,x1-x0); [[x1,y1,a],[x0,y0,a+PI]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],p[1]); c.lineTo(p[0]-Math.cos(p[2]-.4)*10,p[1]-Math.sin(p[2]-.4)*10); c.lineTo(p[0]-Math.cos(p[2]+.4)*10,p[1]-Math.sin(p[2]+.4)*10); c.closePath(); c.fill(); }); }
function livroD(c,x,y,w,h,cor){ rr(c,x,y,w,h,3); fs(c,cor,'#1f2937',1.6); c.fillStyle='#fffbeb'; c.fillRect(x+3,y+h-6,w-6,4); }
function cuboD(c,x,y,s,cor){ var d=s*.28; c.beginPath(); c.rect(x,y,s,s); fs(c,cor,'#1f2937',1.6); c.beginPath(); c.moveTo(x,y); c.lineTo(x+d,y-d); c.lineTo(x+s+d,y-d); c.lineTo(x+s,y); c.closePath(); fs(c,'rgba(255,255,255,.55)','#1f2937',1.2); c.beginPath(); c.moveTo(x+s,y); c.lineTo(x+s+d,y-d); c.lineTo(x+s+d,y+s-d); c.lineTo(x+s,y+s); c.closePath(); fs(c,'rgba(0,0,0,.25)','#1f2937',1.2); }
function flor(c,x,y,r){ c.fillStyle='#f472b6'; for(var i=0;i<5;i++){ var a=i*TAU/5; circ(c,x+Math.cos(a)*r,y+Math.sin(a)*r,r*.72); c.fill(); } c.fillStyle='#fde047'; circ(c,x,y,r*.55); c.fill(); }
function botaoD(c,x,y,r){ circ(c,x,y,r); fs(c,lin(c,x-r,y-r,x+r,y+r,'#f87171','#b91c1c'),'#7f1d1d',1.4); c.fillStyle='#7f1d1d'; [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(p){ circ(c,x+p[0]*r*.28,y+p[1]*r*.28,r*.13); c.fill(); }); }
function cookieD(c,x,y,r){ circ(c,x,y,r); fs(c,'#e0a55a','#7c4a1e',1.2); c.fillStyle='#5b3418'; [[-.4,-.3],[.3,-.4],[.1,.3],[-.3,.35],[.45,.15]].forEach(function(p){ circ(c,x+p[0]*r,y+p[1]*r,r*.13); c.fill(); }); }
function laranja(c,x,y,r){ circ(c,x,y,r); fs(c,lin(c,x-r,y-r,x+r,y+r,'#fdba74','#ea580c'),'#9a3412',1.2); c.fillStyle='#16a34a'; el(c,x+r*.3,y-r,r*.35,r*.18); c.fill(); }
function maca(c,x,y,r){ circ(c,x,y,r); fs(c,lin(c,x-r,y-r,x+r,y+r,'#f87171','#b91c1c'),'#7f1d1d',1.2); c.strokeStyle='#5b3418'; c.lineWidth=2; c.beginPath(); c.moveTo(x,y-r); c.lineTo(x+2,y-r-6); c.stroke(); }
function prato(c,x,y,rx){ el(c,x,y,rx,rx*.42); fs(c,'#f8fafc','#2563eb',2.4); }

/* ---------------- paletas (o motor lê chaoTop, plat…) ---------------- */
var CEN={
  vila:{ceu:['#8fd3ff','#d8f1ff','#f1fbff'], chaoTop:'#6fc04b', chao:'#a0703c', chaoBase:'#6b4423', plat:'#f5b800', platTop:'#ffe066', part:'', musica:'floresta'},
  bosque:{ceu:['#7cc8f5','#c9ecff','#eefaff'], chaoTop:'#5fb84a', chao:'#8a6a3c', chaoBase:'#5c4426', plat:'#a16207', platTop:'#d6a756', part:'', musica:'floresta'},
  casa:{ceu:['#9ad7ff','#e0f4ff','#f8fdff'], chaoTop:'#a3a3a3', chao:'#737373', chaoBase:'#404040', plat:'#8b5cf6', platTop:'#c4b5fd', part:'', musica:'mapa'},
  recife:{ceu:['#5ec2f0','#bfe9fb','#e8f8ff'], chaoTop:'#e9d8a6', chao:'#c9a96e', chaoBase:'#8a6a3c', plat:'#3b82f6', platTop:'#93c5fd', part:'bolha', musica:'recife'},
  nuvens:{ceu:['#5aa9f0','#a9d6fa','#fde7c0'], chaoTop:'#f2d38a', chao:'#e0b562', chaoBase:'#b98a3c', plat:'#ec4899', platTop:'#f9a8d4', part:'', musica:'montanha'},
  ginasio:{ceu:['#86d0ff','#d3f0ff','#f3fbff'], chaoTop:'#4ade80', chao:'#7a5a2c', chaoBase:'#523a1a', plat:'#10b981', platTop:'#6ee7b7', part:'', musica:'floresta'},
  pista:{ceu:['#7cc8f5','#c9ecff','#eefaff'], chaoTop:'#6fc04b', chao:'#64748b', chaoBase:'#334155', plat:'#f59e0b', platTop:'#fde68a', part:'', musica:'mapa'},
  estadio:{ceu:['#8fd3ff','#d8f1ff','#fff7e6'], chaoTop:'#65c14a', chao:'#9a6b3a', chaoBase:'#64431f', plat:'#14b8a6', platTop:'#99f6e4', part:'', musica:'floresta'},
  tinta:{ceu:['#fef3c7','#fde68a','#fcd34d'], chaoTop:'#d6a756', chao:'#a16207', chaoBase:'#713f12', plat:'#f472b6', platTop:'#fbcfe8', part:'', musica:'chefao'}
};
Object.keys(CEN).forEach(function(k){ var o=A.CENAS[k]||(A.CENAS[k]={}); Object.keys(CEN[k]).forEach(function(q){ if(q==='musica'&&o.musica) return; o[q]=CEN[k][q]; }); });
var MEUS=CEN;

/* ---------------- fundos ---------------- */
var CEU={
  vila:function(c,t){ ceuG(c,'#8fd3ff','#d8f1ff','#f1fbff'); c.fillStyle='#fff7c2'; circ(c,840,80,34); c.fill(); nuvens(c,t,4); },
  bosque:function(c,t){ ceuG(c,'#7cc8f5','#c9ecff','#eefaff'); nuvens(c,t,3); },
  casa:function(c,t){ ceuG(c,'#9ad7ff','#e0f4ff','#f8fdff'); nuvens(c,t,3); },
  recife:function(c,t){ var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#38bdf8'); g.addColorStop(1,'#0c4a6e'); c.fillStyle=g; c.fillRect(0,0,W,H); c.fillStyle='rgba(255,255,255,.08)'; for(var i=0;i<6;i++){ c.beginPath(); c.moveTo(80+i*170,0); c.lineTo(40+i*170+Math.sin(t*.6+i)*10,H); c.lineTo(110+i*170,H); c.lineTo(130+i*170,0); c.fill(); } },
  nuvens:function(c,t){ ceuG(c,'#5aa9f0','#a9d6fa','#fde7c0'); c.fillStyle='#fff3b0'; circ(c,120,90,40); c.fill(); nuvens(c,t,4); },
  ginasio:function(c,t){ ceuG(c,'#86d0ff','#d3f0ff','#f3fbff'); c.fillStyle='#fff7c2'; circ(c,800,70,30); c.fill(); nuvens(c,t,3); },
  pista:function(c,t){ ceuG(c,'#7cc8f5','#c9ecff','#eefaff'); nuvens(c,t,3); },
  estadio:function(c,t){ ceuG(c,'#8fd3ff','#d8f1ff','#fff7e6'); c.fillStyle='#fff7c2'; circ(c,160,80,32); c.fill(); nuvens(c,t,3); },
  tinta:function(c,t){ c.fillStyle=lin(c,0,0,0,H,'#fef3c7','#fcd34d'); c.fillRect(0,0,W,H); }
};
var LONGE={
  vila:function(c,cam,t){ faixa(c,cam,function(k){ c.fillStyle='#bfe3c8'; c.beginPath(); c.moveTo(0,470); for(var x=0;x<=W;x+=40) c.lineTo(x,400-Math.sin((x+k*W)*.01)*22); c.lineTo(W,470); c.closePath(); c.fill();
    [[120,90],[330,170],[560,110],[790,190]].forEach(function(p){ arvore(c,p[0],440,p[1],'#9bd58f'); }); }); },
  bosque:function(c,cam,t){ faixa(c,cam,function(){ c.fillStyle='#b8e0b0'; c.fillRect(0,380,W,90); [[60,330,160,70],[330,345,120,120],[560,320,200,60]].forEach(function(r){ c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(r[0],r[1],r[2],r[3]); }); }); },
  casa:function(c,cam,t){ faixa(c,cam,function(){ [[100,'#fca5a5'],[400,'#c4b5fd'],[700,'#bfdbfe']].forEach(function(p,i){ for(var k=0;k<4+i;k++) cuboD(c,p[0]-30+(k%2)*12,410-k*58,58,p[1]); }); }); },
  recife:function(c,cam,t){ /* fundo do lago claro: as BARRAS do gráfico são os blocos (BLOCO.recife) */ faixa(c,cam,function(){ c.fillStyle='rgba(224,242,254,.18)'; for(var i=0;i<6;i++){ el(c,80+i*160,440,70,16); c.fill(); } }); },
  nuvens:function(c,cam,t){ /* escala da probabilidade (slide u05 likely); a duna vem antes, para não cobrir 'impossible' */ faixa(c,cam*.6,function(){ c.fillStyle='#f6dc9b'; c.beginPath(); c.moveTo(0,470); for(var x2=0;x2<=W;x2+=30) c.lineTo(x2,430-Math.sin(x2*.012)*26); c.lineTo(W,470); c.closePath(); c.fill(); }); c.save(); var x=820, y0=400, y1=96; c.fillStyle='#c026d3'; c.fillRect(x-10,y1+30,20,y0-y1-30); c.beginPath(); c.moveTo(x-30,y1+34); c.lineTo(x,y1); c.lineTo(x+30,y1+34); c.closePath(); c.fill();
    /* durante a pergunta as palavras saem: espiavam atrás do quadro e entregavam "Which word goes at the top?" (revisor-sentido r2) */
    if(!(window.JOGO&&JOGO.J&&JOGO.J.quiz)) ['certain','likely','possible','unlikely','impossible'].forEach(function(w,i){ var yy=y1+44+i*((y0-y1-60)/4); c.font='900 22px '+FONTE; c.textAlign='right'; c.textBaseline='middle'; c.lineWidth=5; c.strokeStyle='rgba(255,255,255,.85)'; c.strokeText(w,x-24,yy); c.fillStyle='#a21caf'; c.fillText(w,x-24,yy); });
    c.restore(); },
  ginasio:function(c,cam,t){ faixa(c,cam,function(){ c.fillStyle='#c6efc4'; c.fillRect(0,390,W,80);
    [0,1,2].forEach(function(g){ var cx=110+g*130, cy=330; el(c,cx,cy,56,40); fs(c,'rgba(255,255,255,.6)','#2563eb',2.4); for(var i=0;i<5;i++){ var a=i*TAU/5-PI/2; flor(c,cx+Math.cos(a)*30,cy+Math.sin(a)*20,7); } });
    [0,1,2,3].forEach(function(g){ var cx=560+g*96, cy=350; circ(c,cx,cy,38); fs(c,'rgba(255,255,255,.6)','#2563eb',2.4); botaoD(c,cx,cy-14,11); botaoD(c,cx-14,cy+10,11); botaoD(c,cx+14,cy+10,11); }); }); },
  pista:function(c,cam,t){ faixa(c,cam,function(){ c.fillStyle='#b8e0b0'; c.fillRect(0,400,W,70); }); },
  estadio:function(c,cam,t){ faixa(c,cam,function(){ c.fillStyle='#c6efc4'; c.fillRect(0,395,W,75); [[160,140],[520,180],[820,120]].forEach(function(p){ arvore(c,p[0],440,p[1],'#8fd18a'); for(var i=0;i<4;i++) laranja(c,p[0]-20+i*13,440-p[1]*.6+(i%2)*14,6); }); }); },
  tinta:function(c,cam,t){ /* o quadro da sala, com os números que a Borracha apagou pela metade */ c.save(); rr(c,90,70,780,300,14); fs(c,'#1f5135','#7c4a1e',12);
    var fr=['4 × 3 = 12','10 ÷ 2 = 5','6 + 6 + 4 + 4 = 20','cube: 6 faces'], k=(Math.sin(t*.7)+1)/2;
    /* durante a pergunta o quadro fica sem as contas: "6 + 6 + 4 + 4 = 20" aparecia atrás da pergunta do perímetro (revisor-sentido r2) */
    if(!(window.JOGO&&JOGO.J&&JOGO.J.quiz)) fr.forEach(function(s,i){ c.globalAlpha=i%2?.35+.25*k:.95; txt(c,s,260+(i%2)*400,150+Math.floor(i/2)*110,34,'#f8fafc',800); }); c.globalAlpha=1;
    c.fillStyle='rgba(249,168,212,.55)'; for(var i=0;i<5;i++) el(c,520+i*40,180+(i%2)*16,24,10); c.fill(); c.restore(); }
};
var PERTO={
  vila:function(c,cam,t){ faixa(c,cam,function(){ /* os pares do slide: comprido × curto, largo × estreito, alta × baixa */
    lapisD(c,40,388,260,18,0); lapisD(c,40,418,130,18,0); txt(c,'longer',350,388,16,'#7a5a00'); txt(c,'shorter',222,418,16,'#7a5a00');
    livroD(c,470,372,46,74,'#1d4ed8'); livroD(c,540,402,150,44,'#f59e0b'); txt(c,'narrow',493,360,15,'#1e293b'); txt(c,'wider',615,390,15,'#1e293b');
    arvore(c,760,450,60,'#7cc576'); arvore(c,860,450,130,'#5fb54f'); txt(c,'shorter',760,462,14,'#14532d'); txt(c,'taller',860,462,14,'#14532d'); }); },
  bosque:function(c,cam,t){ faixa(c,cam,function(k){ /* canteiros: perímetro = somar os lados; as medidas ficam DENTRO do contorno (nada da fase as cobre) */
    [[60,370,180,70,'6 cm','4 cm'],[380,345,100,100,'5 cm','5 cm'],[640,380,220,56,'8 cm','3 cm']].forEach(function(r){ rr(c,r[0],r[1],r[2],r[3],4); fs(c,'#9bd58f','#14532d',2); c.save(); c.setLineDash([8,6]); c.strokeStyle='#ef4444'; c.lineWidth=3; c.strokeRect(r[0]-6,r[1]-6,r[2]+12,r[3]+12); c.restore();
      c.fillStyle='rgba(255,255,255,.85)'; rr(c,r[0]+r[2]/2-22,r[1]+3,44,17,6); c.fill(); txt(c,r[4],r[0]+r[2]/2,r[1]+12,13,'#7f1d1d'); rr(c,r[0]+r[2]-42,r[1]+r[3]/2-9,40,17,6); c.fill(); txt(c,r[5],r[0]+r[2]-22,r[1]+r[3]/2,13,'#7f1d1d');
      for(var i=0;i<3;i++) flor(c,r[0]+16+i*(r[2]-70)/2,r[1]+r[3]-14,6); }); }); },
  casa:function(c,cam,t){},
  recife:function(c,cam,t){ faixa(c,cam,function(){ c.fillStyle='rgba(12,74,110,.35)'; for(var i=0;i<8;i++){ var x=40+i*120; c.beginPath(); c.moveTo(x,470); c.quadraticCurveTo(x+10+Math.sin(t*.8+i)*6,420,x+4,380); c.lineTo(x+12,380); c.quadraticCurveTo(x+20,420,x+16,470); c.fill(); } }); },
  nuvens:function(c,cam,t){ faixa(c,cam,function(k){ /* a escola (likely: students in the school) e o deserto (unlikely: a penguin) */
    rr(c,120,330,200,120,6); fs(c,'#fde68a','#92400e',2); c.beginPath(); c.moveTo(110,332); c.lineTo(220,280); c.lineTo(330,332); c.closePath(); fs(c,'#ef4444','#7f1d1d',2); txt(c,'SCHOOL',220,350,16,'#7c2d12'); for(var i=0;i<3;i++){ rr(c,140+i*60,370,36,30,3); fs(c,'#bfdbfe','#1e3a8a',1.4); }
    c.fillStyle='#f6d58a'; c.beginPath(); c.moveTo(420,470); c.quadraticCurveTo(560,380,720,470); c.closePath(); c.fill(); }); },
  ginasio:function(c,cam,t){ faixa(c,cam,function(){ /* 5 saquinhos de 2 cookies */ for(var i=0;i<5;i++){ var x=90+i*170; c.beginPath(); c.moveTo(x-26,452); c.lineTo(x-20,400); c.lineTo(x+20,400); c.lineTo(x+26,452); c.closePath(); fs(c,'rgba(255,255,255,.7)','#64748b',1.6); c.strokeStyle='#dc2626'; c.lineWidth=3; c.beginPath(); c.moveTo(x-12,404); c.lineTo(x+12,404); c.stroke(); cookieD(c,x-9,436,9); cookieD(c,x+9,436,9); } }); },
  pista:function(c,cam,t){},
  estadio:function(c,cam,t){ faixa(c,cam,function(){ /* toalha do piquenique: 10 laranjas em 2 pratos iguais */ c.fillStyle='#fecaca'; rr(c,220,410,400,50,8); c.fill(); c.fillStyle='rgba(220,38,38,.35)'; for(var i=0;i<10;i++) c.fillRect(220+i*40,410,20,50);
    prato(c,330,428,70); prato(c,510,428,70); [[-30,0],[-10,-8],[10,0],[30,-8],[0,8]].forEach(function(p){ laranja(c,330+p[0],424+p[1],9); laranja(c,510+p[0],424+p[1],9); }); txt(c,'10 ÷ 2 = 5',420,396,20,'#0f766e'); }); },
  tinta:function(c,cam,t){}
};
/* ---------------- chão e blocos ---------------- */
function ehChao(s){ var J=window.JOGO&&JOGO.J, M=J&&J.mundo; return !!M&&s.y+s.h>=M.h-2&&s.w>=6*45; }
function chaoPadrao(c,s,P){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,P.chao,P.chaoBase); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle=P.chaoTop; c.fillRect(s.x,s.y,s.w,10); c.fillStyle='rgba(255,255,255,.45)'; c.fillRect(s.x,s.y,s.w,2.5); c.strokeStyle='rgba(42,32,24,.6)'; c.lineWidth=2; c.strokeRect(s.x+1,s.y+1,s.w-2,s.h-2); }
var BLOCO={
  vila:function(c,s){ /* pilha de livros (largo × estreito) */ var cores=['#1d4ed8','#f59e0b','#16a34a','#dc2626','#9333ea']; for(var y=s.y;y<s.y+s.h;y+=15){ var k=Math.floor(hs(s.x+y)*5), d=(hs(y*3+s.x)-.5)*6; livroD(c,s.x+2+d,y,s.w-4,14,cores[k]); } },
  bosque:function(c,s){ rr(c,s.x,s.y,s.w,s.h,4); fs(c,'#fde68a','#92400e',2); c.strokeStyle='rgba(146,64,14,.35)'; c.lineWidth=1; for(var x=s.x+15;x<s.x+s.w;x+=15){ c.beginPath(); c.moveTo(x,s.y); c.lineTo(x,s.y+s.h); c.stroke(); } for(var y=s.y+15;y<s.y+s.h;y+=15){ c.beginPath(); c.moveTo(s.x,y); c.lineTo(s.x+s.w,y); c.stroke(); } },
  casa:function(c,s){ var cores=['#ef4444','#8b5cf6','#3b82f6','#22c55e','#f59e0b']; for(var y=s.y;y<s.y+s.h;y+=45) for(var x=s.x;x<s.x+s.w;x+=45){ var k=Math.floor(hs(x*.7+y*1.3)*5); c.beginPath(); c.rect(x+1,y+1,43,43); fs(c,cores[k],'#1f2937',1.6); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(x+3,y+3,39,6); } },
  recife:function(c,s){ if(s.w>3*45){ chaoPadrao(c,s,CEN.recife); return; } /* BARRA do gráfico: cor do slide, régua de números à esquerda, número no topo */ var cores=['#3b9ad9','#e0336b','#f5821f','#8cc63f'], k=Math.floor(hs(s.x*.37)*4), n=Math.round(s.h/45);
    c.beginPath(); c.rect(s.x+3,s.y,s.w-6,s.h); fs(c,cores[k],'#1e293b',2.4); c.strokeStyle='rgba(30,41,59,.55)'; c.lineWidth=2; for(var i=1;i<n;i++){ var yy=s.y+s.h-i*45; c.beginPath(); c.moveTo(s.x+3,yy); c.lineTo(s.x+14,yy); c.stroke(); }
    if(n<=12){ rr(c,s.x+s.w/2-15,s.y-24,30,20,8); fs(c,'#fff','#1e293b',1.6); txt(c,String(n),s.x+s.w/2,s.y-14,14,'#1e293b'); } },
  nuvens:function(c,s){ rr(c,s.x,s.y,s.w,s.h,10); fs(c,lin(c,0,s.y,0,s.y+s.h,'#fbcfe8','#ec4899'),'#831843',2); },
  ginasio:function(c,s){ rr(c,s.x,s.y,s.w,s.h,8); fs(c,lin(c,0,s.y,0,s.y+s.h,'#4ade80','#15803d'),'#14532d',2); for(var x=s.x+22;x<s.x+s.w-10;x+=45) for(var y=s.y+22;y<s.y+s.h-10;y+=45) flor(c,x,y,5); },
  estadio:function(c,s){ for(var y=s.y;y<s.y+s.h;y+=45) for(var x=s.x;x<s.x+s.w;x+=45){ rr(c,x+1,y+1,43,43,4); fs(c,'#d6a756','#7c4a1e',1.6); c.strokeStyle='rgba(124,74,30,.5)'; c.lineWidth=1.4; c.beginPath(); c.moveTo(x+4,y+15); c.lineTo(x+41,y+15); c.moveTo(x+4,y+30); c.lineTo(x+41,y+30); c.stroke(); if(hs(x+y)>.6) laranja(c,x+22,y+8,7); } },
  tinta:function(c,s){ rr(c,s.x,s.y,s.w,s.h,6); fs(c,lin(c,0,s.y,0,s.y+s.h,'#fbcfe8','#f472b6'),'#831843',2); c.fillStyle='rgba(37,99,235,.85)'; c.fillRect(s.x+2,s.y+s.h*.55,s.w-4,s.h*.45-2); },
  pista:function(c,s){ chaoPadrao(c,s,CEN.pista); }
};
var PLAT={
  vila:function(c,p){ lapisD(c,p.x,p.y+9,p.w,18,0); },
  bosque:function(c,p){ rr(c,p.x,p.y,p.w,p.h,5); fs(c,'#d6a756','#7c4a1e',2); },
  casa:function(c,p){ rr(c,p.x,p.y,p.w,p.h,3); fs(c,'#c4b5fd','#4c1d95',2); c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(p.x+3,p.y+3,p.w-6,4); },
  recife:function(c,p){ rr(c,p.x,p.y,p.w,p.h,5); fs(c,'#93c5fd','#1e3a8a',2); },
  nuvens:function(c,p){ rr(c,p.x,p.y,p.w,p.h,9); fs(c,'#fff','#94a3b8',2); },
  ginasio:function(c,p){ rr(c,p.x,p.y,p.w,p.h,9); fs(c,'#86efac','#14532d',2); for(var x=p.x+14;x<p.x+p.w-6;x+=30) botaoD(c,x,p.y+9,6); },
  estadio:function(c,p){ rr(c,p.x,p.y,p.w,p.h,4); fs(c,'#99f6e4','#115e59',2); },
  tinta:function(c,p){ rr(c,p.x,p.y,p.w,p.h,5); fs(c,'#fbcfe8','#831843',2); },
  pista:function(c,p){ rr(c,p.x,p.y,p.w,p.h,5); fs(c,'#fde68a','#92400e',2); }
};
function sub(cena){ return /^sub_/.test(cena||''); }
function subFundo(c,cam,t){ c.fillStyle=lin(c,0,0,0,H,'#1e3a5f','#0f1d33'); c.fillRect(0,0,W,H); faixa(c,cam,function(k){ c.save(); c.globalAlpha=.22; for(var i=0;i<10;i++){ txt(c,String(1+((i+k*10)%12)),60+i*92,120+(i%3)*90,40,'#e0f2fe',900); } c.restore(); }); }
function subBloco(c,s){ rr(c,s.x,s.y,s.w,s.h,4); fs(c,lin(c,0,s.y,0,s.y+s.h,'#475569','#1e293b'),'#0f172a',2); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(s.x,s.y,s.w,4); }
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma, mov0=A.platMovel, cai0=A.platCaindo, sub0=A.fundoSub, tij0=A.tijolo, esp0=A.espinhos, cano0=A.cano;
A.ceu=function(c,cena,t){ if(sub(cena)){ subFundo(c,0,t||0); return; } var f=CEU[cena]; if(f){ c.save(); f(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ if(sub(cena)) return; var f=LONGE[cena]; if(f){ c.save(); f(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ if(sub(cena)) return; var f=PERTO[cena]; if(f){ c.save(); f(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.fundoSub=function(c,cena,cam,t){ subFundo(c,cam||0,t||0); };
A.chao=function(c,s,cena){ c.save(); if(sub(cena)) subBloco(c,s); else if(MEUS[cena]){ if(ehChao(s)||cena==='nuvens'&&s.h>90) chaoPadrao(c,s,CEN[cena]); else (BLOCO[cena]||function(c2,s2){ chaoPadrao(c2,s2,CEN[cena]); })(c,s); } else { c.restore(); return chao0(c,s,cena); } c.restore(); };
A.plataforma=function(c,p,cena){ c.save(); if(sub(cena)){ rr(c,p.x,p.y,p.w,p.h,4); fs(c,'#64748b','#0f172a',2); } else if(PLAT[cena]) PLAT[cena](c,p); else { c.restore(); return plat0(c,p,cena); } c.restore(); };
A.platMovel=function(c,p,cena,t){ if(!PLAT[cena]&&!sub(cena)) return mov0(c,p,cena,t); A.plataforma(c,p,cena); c.fillStyle='rgba(255,255,255,.85)'; var mx=p.x+p.w/2, my=p.y+p.h/2; c.beginPath(); c.moveTo(mx-14,my); c.lineTo(mx-6,my-5); c.lineTo(mx-6,my+5); c.closePath(); c.moveTo(mx+14,my); c.lineTo(mx+6,my-5); c.lineTo(mx+6,my+5); c.closePath(); c.fill(); };
A.platCaindo=function(c,p,cena,t){ if(!PLAT[cena]&&!sub(cena)) return cai0(c,p,cena,t); c.save(); var tr=p.estado==='treme'?Math.sin((t||0)*8)*2:0; c.translate(tr,0); A.plataforma(c,p,cena); c.strokeStyle='rgba(42,32,24,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(p.x+p.w*.4,p.y); c.lineTo(p.x+p.w*.5,p.y+p.h); c.stroke(); c.restore(); };
A.tijolo=function(c,b,cena){ if(!b.vivo) return; var y=b.y-(b.bump||0); rr(c,b.x+1,y+1,b.w-2,b.h-2,6); fs(c,lin(c,0,y,0,y+b.h,'#fde68a','#f59e0b'),'#92400e',2.4); txt(c,'+',b.x+b.w/2,y+b.h/2+1,28,'#92400e'); };
A.espinhos=function(c,s,cena){ /* pontas de lápis apontadas para cima: não pise! */ for(var x=s.x;x<s.x+s.w-2;x+=15){ c.beginPath(); c.moveTo(x+1,s.y+s.h); c.lineTo(x+7.5,s.y+2); c.lineTo(x+14,s.y+s.h); c.closePath(); fs(c,'#f3e0c0','#7a5a00',1.2); c.beginPath(); c.moveTo(x+5.5,s.y+8); c.lineTo(x+7.5,s.y+2); c.lineTo(x+9.5,s.y+8); c.closePath(); c.fillStyle='#1f2937'; c.fill(); } };
A.cano=function(c,p,cena,t,marcado){ rr(c,p.x+4,p.y+12,p.w-8,p.h-12,4); fs(c,lin(c,p.x,0,p.x+p.w,0,'#4ade80','#15803d'),'#14532d',2.4); rr(c,p.x,p.y,p.w,18,5); fs(c,lin(c,p.x,0,p.x+p.w,0,'#86efac','#16a34a'),'#14532d',2.4); };
A.ceuDoRio=function(c,ys,cam,t){ if(ys<=0) return; ys=Math.min(ys,300); c.save(); var g=c.createLinearGradient(0,0,0,ys); g.addColorStop(0,'#8fd3ff'); g.addColorStop(1,'#d8f1ff'); c.fillStyle=g; c.fillRect(0,0,W,ys); c.beginPath(); c.rect(0,0,W,ys); c.clip(); nuvens(c,t||0,3); c.restore(); c.fillStyle='rgba(255,255,255,.7)'; c.fillRect(0,ys-3,W,3); };

/* ---------------- mapa: a folha de caderno com o caminho de Mike e Laura ---------------- */
A.PARADAS_MAPA=[[90,420],[200,310],[320,420],[430,300],[540,420],[650,300],[760,420],[700,170],[480,140]]; /* nada atrás dos botões do mapa (x>790, y<320) */
A.MAPA_NOS=A.PARADAS_MAPA.map(function(p){ return {x:p[0],y:p[1]}; });
var ICONE=[
  function(c){ lapisD(c,-26,0,52,10,0); },
  function(c){ c.beginPath(); c.rect(-18,-14,36,28); fs(c,'#ffd6e7','#9d174d',2); c.save(); c.setLineDash([4,3]); c.strokeStyle='#ef4444'; c.lineWidth=2; c.strokeRect(-23,-19,46,38); c.restore(); },
  function(c){ cuboD(c,-14,-10,26,'#ef4444'); },
  function(c){ [[4,'#3b9ad9'],[2,'#e0336b'],[6,'#f5821f'],[3,'#8cc63f']].forEach(function(b,i){ c.beginPath(); c.rect(-22+i*11,14-b[0]*5,9,b[0]*5); fs(c,b[1],'#1e293b',1.2); }); },
  function(c){ c.fillStyle='#c026d3'; c.fillRect(-4,-10,8,26); c.beginPath(); c.moveTo(-12,-8); c.lineTo(0,-22); c.lineTo(12,-8); c.closePath(); c.fill(); },
  function(c){ botaoD(c,-10,-6,9); botaoD(c,10,-6,9); botaoD(c,0,10,9); },
  function(c){ c.fillStyle='#1f2937'; c.fillRect(-2,-20,4,40); for(var i=0;i<4;i++) for(var j=0;j<3;j++){ c.fillStyle=(i+j)%2?'#fff':'#1f2937'; c.fillRect(2+i*6,-20+j*6,6,6); } },
  function(c){ prato(c,0,6,22); laranja(c,-8,2,7); laranja(c,8,2,7); },
  function(c){ rr(c,-16,-18,32,34,6); fs(c,'#f9a8d4','#831843',2); c.fillStyle='#2563eb'; c.fillRect(-15,2,30,13); }
];
A.mapaLivro=function(c,t){ t=t||0; c.fillStyle='#fefcf3'; c.fillRect(0,0,W,H); c.strokeStyle='rgba(59,130,246,.22)'; c.lineWidth=1; for(var y=40;y<H;y+=30){ c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); } c.strokeStyle='rgba(239,68,68,.35)'; c.lineWidth=2; c.beginPath(); c.moveTo(48,0); c.lineTo(48,H); c.stroke();
  c.save(); c.setLineDash([10,9]); c.strokeStyle='#f59e0b'; c.lineWidth=5; c.beginPath(); A.PARADAS_MAPA.forEach(function(p,i){ if(i) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.stroke(); c.restore();
  A.PARADAS_MAPA.forEach(function(p,i){ c.save(); c.translate(p[0],p[1]-44); c.fillStyle='rgba(255,255,255,.92)'; circ(c,0,0,30); c.fill(); c.strokeStyle='#cbd5e1'; c.lineWidth=2; c.stroke(); ICONE[i](c); c.restore(); });
  txt(c,'Math Stars',W/2,40,34,'#1e3a8a'); };
/* ---------------- capa ---------------- */
A.capaLivro=function(c,t,sel){ t=t||0; ceuG(c,'#8fd3ff','#d8f1ff','#f1fbff'); nuvens(c,t,4); c.fillStyle='#6fc04b'; c.fillRect(0,430,W,110);
  var by=Math.sin(t*1.6)*6; c.save(); c.font='900 86px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.lineJoin='round'; c.lineWidth=14; c.strokeStyle='#1e3a8a'; c.strokeText('Math Stars',W/2,98+by); c.fillStyle=lin(c,0,60,0,140,'#fef08a','#f59e0b'); c.fillText('Math Stars',W/2,98+by); c.restore();
  txt(c,'Mike and Laura',W/2,166,30,'#1e3a8a');
  if(A.MAT_MOR){ [['cubo',140,430],['esfera',250,436],['cone',710,432],['cilindro',820,434]].forEach(function(q,i){ A.morador(c,q[0],q[1],q[2],t+i,i<2?1:-1,false); }); }
  if(A.heroi){ A.heroi(c,400,436,'cheer',t,1,1.35,'yellow'); A.heroi(c,560,436,'cheer',t+.5,-1,1.35,'pony'); }
  if(A.conde){ c.save(); c.globalAlpha=.9; A.conde(c,880,300,'laugh',t); c.restore(); } };
})();
