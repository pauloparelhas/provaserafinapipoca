/* ============================================================
   ING3_jogo_arte3.js — cenários de "The Lost Endings" (parte 1):
   vila, bosque, biblioteca, recife e nuvens. Cada cena tem céu,
   camada longe e camada perto (parallax), chão e plataforma.
   Embrulha A.ceu/A.longe/A.perto/A.chao/A.plataforma sem mexer
   nas cenas que já existem. Tudo por código: sem imagem, sem emoji.
   Depende de LP3_jornada_arte.js e ING3_jogo_arte.js (A.ING).
   Parte 2 (ginásio, estádio, biscoito, tinta, mapa-livro): arte4.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho, cintila=I.cintila;

/* ---------- utilitários de cenário (exportados em A.CN para a parte 2) ---------- */
/* repete um "quadro" de largura P pela tela inteira, já descontada a câmera */
function rep(cam,P,fn){ var o=-(((cam%P)+P)%P); for(var ox=o-P; ox<W+P; ox+=P) fn(ox); }
/* trecho visível (coordenadas do mundo) de um segmento de chão — evita desenhar 5000 px fora da tela */
function faixa(c,s,m){ var a=s.x, b=s.x+s.w; try{ var T=c.getTransform(), k=T.a||1, v0=-T.e/k, v1=(c.canvas.width-T.e)/k; a=Math.max(a,v0-m); b=Math.min(b,v1+m); }catch(e){} return [a,b]; }
function grade(a,passo){ return Math.floor(a/passo)*passo; }
function ceuG(c,stops){ var g=c.createLinearGradient(0,0,0,H); stops.forEach(function(s){ g.addColorStop(s[0],s[1]); }); c.fillStyle=g; c.fillRect(0,0,W,H); }
function bruma(c,y0,y1,cor){ var g=c.createLinearGradient(0,y0,0,y1); g.addColorStop(0,'rgba(255,255,255,0)'); g.addColorStop(1,cor); c.fillStyle=g; c.fillRect(0,y0,W,y1-y0); }
function sol(c,x,y,r,nucleo,halo){ brilho(c,x,y,r*6,halo,1); brilho(c,x,y,r*2.2,halo,1); var g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,'#fffef7'); g.addColorStop(.75,nucleo); g.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=g; circ(c,x,y,r); c.fill(); }
/* nuvem fofa: um caminho só (puffs + base), preenchida com degradê */
var PUF=[[-38,2,16],[-16,-10,22],[10,-18,26],[36,-8,21],[56,2,14]];
function nuvemF(c,x,y,s,c0,c1,a){
  c.save(); if(a!=null) c.globalAlpha=a; c.beginPath();
  PUF.forEach(function(p){ var r=p[2]*s, px=x+p[0]*s, py=y+p[1]*s; c.moveTo(px+r,py); c.arc(px,py,r,0,TAU); });
  c.rect(x-38*s,y+2*s,94*s,12*s); c.fillStyle=lin(c,0,y-44*s,0,y+16*s,c0,c1); c.fill(); c.restore();
}
/* raios de luz inclinados (de cima para baixo) */
function raios(c,xs,y0,y1,inc,larg,cor,a,t){
  c.save(); xs.forEach(function(x,i){ var al=a*(.55+.45*Math.sin(t*.6+i*1.7)); var g=c.createLinearGradient(0,y0,0,y1); g.addColorStop(0,cor.replace('A',al.toFixed(3))); g.addColorStop(1,cor.replace('A','0'));
    c.fillStyle=g; var w=larg*(.7+hash(i+3)*.6); c.beginPath(); c.moveTo(x,y0); c.lineTo(x+w,y0); c.lineTo(x+w*1.8+inc,y1); c.lineTo(x+inc-w*.4,y1); c.closePath(); c.fill(); }); c.restore();
}
function linha(c,x0,y0,x1,y1){ c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.stroke(); }
function pontoQ(x0,y0,cx,cy,x1,y1,u){ var v=1-u; return [v*v*x0+2*u*v*cx+u*u*x1, v*v*y0+2*u*v*cy+u*u*y1]; }
/* árvore redonda (copa de bolas com luz de um lado) */
function arvoreR(c,x,y,h,cor,luz,tronco){
  c.fillStyle=tronco||'#6b4428'; c.beginPath(); c.moveTo(x-h*.07,y); c.lineTo(x-h*.04,y-h*.5); c.lineTo(x+h*.04,y-h*.5); c.lineTo(x+h*.07,y); c.fill();
  var B=[[0,-.72,.3],[-.22,-.56,.22],[.22,-.58,.23],[-.1,-.9,.2],[.14,-.86,.2]];
  c.fillStyle=cor; B.forEach(function(b){ circ(c,x+b[0]*h,y+b[1]*h,b[2]*h); c.fill(); });
  c.fillStyle=luz; B.forEach(function(b){ circ(c,x+b[0]*h+b[2]*h*.25,y+b[1]*h-b[2]*h*.28,b[2]*h*.62); c.fill(); });
}
function arbusto(c,x,y,w,cor,luz,flores,seed){
  var n=Math.max(3,Math.round(w/16)); c.fillStyle=cor;
  for(var i=0;i<n;i++){ var bx=x-w/2+(i+.5)*w/n, r=w/n*.85+hash(seed+i)*4; circ(c,bx,y-r*.7,r); c.fill(); }
  c.fillStyle=luz; for(i=0;i<n;i++){ bx=x-w/2+(i+.5)*w/n; r=w/n*.5; circ(c,bx-2,y-r*1.6,r); c.fill(); }
  if(flores) for(i=0;i<n*2;i++){ var fx=x-w/2+hash(seed+i*3.1)*w, fy=y-4-hash(seed+i*7.7)*w/n*1.2; flor(c,fx,fy,2.4,flores[i%flores.length]); }
}
function flor(c,x,y,r,cor){ c.fillStyle=cor; for(var k=0;k<5;k++){ var a=k*TAU/5; circ(c,x+Math.cos(a)*r,y+Math.sin(a)*r,r*.75); c.fill(); } c.fillStyle='#fbbf24'; circ(c,x,y,r*.6); c.fill(); }
function bolha(c,x,y,r,a){ c.save(); c.globalAlpha=a; c.strokeStyle='rgba(235,252,255,.9)'; c.lineWidth=1.3; circ(c,x,y,r); c.stroke(); c.fillStyle='rgba(220,250,255,.18)'; c.fill(); c.fillStyle='rgba(255,255,255,.9)'; circ(c,x-r*.35,y-r*.35,r*.28); c.fill(); c.restore(); }
function bordas(c,s,cor){ /* sombreia as pontas de um segmento (lê como degrau) */
  var g=c.createLinearGradient(s.x,0,s.x+10,0); g.addColorStop(0,cor); g.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=g; c.fillRect(s.x,s.y,10,s.h);
  g=c.createLinearGradient(s.x+s.w,0,s.x+s.w-10,0); g.addColorStop(0,cor); g.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=g; c.fillRect(s.x+s.w-10,s.y,10,s.h);
}
function sombraPlat(c,p,r){ c.fillStyle='rgba(0,0,0,.18)'; rr(c,p.x+3,p.y+5,p.w,p.h,r); c.fill(); }
A.CN={rep:rep,faixa:faixa,grade:grade,ceuG:ceuG,bruma:bruma,sol:sol,nuvemF:nuvemF,raios:raios,linha:linha,pontoQ:pontoQ,arvoreR:arvoreR,arbusto:arbusto,flor:flor,bolha:bolha,bordas:bordas,sombraPlat:sombraPlat};

/* ---------- cenas novas ---------- */
A.CENAS.vila      ={ceu:['#6ec3f4','#bfe6fb','#fdf2d0'], chaoTop:'#6cc048', chao:'#8b5e3c', chaoBase:'#5a3a24', plat:'#c98b4f', platTop:'#86d45a', part:'polen', musica:'pradaria'};
A.CENAS.bosque    ={ceu:['#2e1a5c','#8e4fb0','#ffd27a'], chaoTop:'#5aa04a', chao:'#4b3040', chaoBase:'#2b1a26', plat:'#6b4a3a', platTop:'#5aa04a', part:'vagalume', musica:'floresta'};
A.CENAS.biblioteca={ceu:['#3b1d12','#6b3a20','#9a5a30'], chaoTop:'#a0642f', chao:'#7a4722', chaoBase:'#4a2a14', plat:'#7a4722', platTop:'#c08040', part:'polen', musica:'mapa'};
A.CENAS.recife    ={ceu:['#7fe3e0','#1aa3b8','#073b5c'], chaoTop:'#f3dca2', chao:'#d9b77a', chaoBase:'#9c7a48', plat:'#f08a7e', platTop:'#ffb3a0', part:'', musica:'agua'};
A.CENAS.nuvens    ={ceu:['#3aa0e8','#8fd0f7','#e3f4ff'], chaoTop:'#ffffff', chao:'#eef3fc', chaoBase:'#c9d6f2', plat:'#f4f7fd', platTop:'#ffffff', part:'nuvem', musica:'montanha'};

var NOVAS={vila:1,bosque:1,biblioteca:1,recife:1,nuvens:1};

/* ============================================================
   VILA — manhã de conto de fadas
   ============================================================ */
function casa(c,x,y,w,hw,hr,k,t){
  var x1=x+w, top=y-hw, ap=top-hr, i, n=Math.max(2,Math.round(w/42));
  /* chaminé + fumaça */
  var chx=x+w*.7; c.fillStyle='#9a6248'; c.fillRect(chx,ap+hr*.3,16,hr*.55); c.fillStyle='#6e4433'; c.fillRect(chx-3,ap+hr*.3-2,22,7);
  for(i=0;i<4;i++){ var f=(t*.25+i/4)%1; c.save(); c.globalAlpha=(1-f)*.5; c.fillStyle='#f8fafc'; circ(c,chx+8+Math.sin(t*.8+i*2)*5+f*26,ap+hr*.3-10-f*70,5+f*11); c.fill(); c.restore(); }
  /* parede + empena (triângulo) */
  c.fillStyle=lin(c,0,ap,0,y,'#fff6e2','#ead4ae'); c.beginPath(); c.moveTo(x,y); c.lineTo(x,top); c.lineTo(x+w/2,ap+8); c.lineTo(x1,top); c.lineTo(x1,y); c.closePath(); c.fill();
  c.save(); c.clip();
  c.strokeStyle='#6b4128'; c.lineWidth=5;
  c.strokeRect(x+2.5,top,w-5,hw-2); var mid=top+hw*.48; linha(c,x,mid,x1,mid); linha(c,x,top,x1,top);
  for(i=1;i<n;i++){ var px=x+w*i/n; linha(c,px,top,px,y); }
  linha(c,x+w/2,ap,x+w/2,top); c.lineWidth=4; linha(c,x+w/2,top,x+w*.25,top-hr*.48); linha(c,x+w/2,top,x+w*.75,top-hr*.48);
  for(i=0;i<n;i++){ var a=x+w*i/n, b=x+w*(i+1)/n; if(i%2===0){ c.lineWidth=4; c.beginPath(); c.moveTo(a,mid); c.lineTo(b,top); c.moveTo(a,top); c.lineTo(b,mid); c.stroke(); } }
  c.fillStyle='rgba(90,50,25,.16)'; c.fillRect(x,top,w,9);
  c.restore();
  /* janelas (andar de cima, painéis ímpares; andar de baixo, menos a porta) */
  var porta=Math.floor(n/2);
  for(i=0;i<n;i++){ var cx=x+w*(i+.5)/n; if(i%2===1) janela(c,cx,top+hw*.24,18,22,k.jan); if(i!==porta && hw>110) janela(c,cx,top+hw*.72,18,22,k.jan); }
  /* porta em arco */
  var dx=x+w*(porta+.5)/n, dw=Math.min(28,w/n-10), dh=Math.min(48,hw*.42);
  c.fillStyle='#5b3418'; c.beginPath(); c.moveTo(dx-dw/2-3,y); c.lineTo(dx-dw/2-3,y-dh+dw/2); c.arc(dx,y-dh+dw/2,dw/2+3,PI,TAU); c.lineTo(dx+dw/2+3,y); c.fill();
  c.fillStyle=lin(c,0,y-dh,0,y,'#a5653a','#7a4422'); c.beginPath(); c.moveTo(dx-dw/2,y); c.lineTo(dx-dw/2,y-dh+dw/2); c.arc(dx,y-dh+dw/2,dw/2,PI,TAU); c.lineTo(dx+dw/2,y); c.fill();
  c.strokeStyle='rgba(60,30,10,.45)'; c.lineWidth=1.2; linha(c,dx-dw/6,y-dh+4,dx-dw/6,y); linha(c,dx+dw/6,y-dh+4,dx+dw/6,y); c.fillStyle='#fcd34d'; circ(c,dx+dw/2-5,y-dh*.45,2); c.fill();
  /* janelinha redonda na empena */
  c.fillStyle='#6b4128'; circ(c,x+w/2,top-hr*.38,8); c.fill(); c.fillStyle=lin(c,0,top-hr*.38-6,0,top-hr*.38+6,'#d4eefa','#6aa8cf'); circ(c,x+w/2,top-hr*.38,5.5); c.fill();
  /* telhado: faixa grossa com riscos de telha */
  var ov=16; c.lineJoin='round'; c.lineCap='round';
  c.strokeStyle=esc(k.teto,.35); c.lineWidth=22; c.beginPath(); c.moveTo(x-ov,top+8); c.lineTo(x+w/2,ap-2); c.lineTo(x1+ov,top+8); c.stroke();
  c.strokeStyle=k.teto; c.lineWidth=17; c.stroke();
  c.save(); c.setLineDash([2,8]); c.strokeStyle=esc(k.teto,.28); c.lineWidth=17; c.stroke(); c.restore();
  c.strokeStyle=cla(k.teto,.35); c.lineWidth=3; c.beginPath(); c.moveTo(x-ov-2,top+1); c.lineTo(x+w/2,ap-10); c.lineTo(x1+ov+2,top+1); c.stroke();
  c.lineCap='butt';
  /* sombra no pé da parede */
  c.fillStyle='rgba(60,40,20,.18)'; c.fillRect(x,y-6,w,6);
}
function janela(c,cx,cy,w,h,cor){
  c.fillStyle=cor; c.fillRect(cx-w/2-9,cy-h/2,8,h); c.fillRect(cx+w/2+1,cy-h/2,8,h);
  c.strokeStyle=esc(cor,.3); c.lineWidth=1; for(var j=1;j<4;j++){ linha(c,cx-w/2-9,cy-h/2+j*h/4,cx-w/2-1,cy-h/2+j*h/4); linha(c,cx+w/2+1,cy-h/2+j*h/4,cx+w/2+9,cy-h/2+j*h/4); }
  c.fillStyle='#5b3418'; c.fillRect(cx-w/2-2,cy-h/2-2,w+4,h+4);
  c.fillStyle=lin(c,0,cy-h/2,0,cy+h/2,'#e0f4ff','#79b6dc'); c.fillRect(cx-w/2,cy-h/2,w,h);
  c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.moveTo(cx-w/2,cy+h*.1); c.lineTo(cx-w*.05,cy-h/2); c.lineTo(cx+w*.2,cy-h/2); c.lineTo(cx-w/2,cy+h*.4); c.fill();
  c.strokeStyle='#5b3418'; c.lineWidth=2; linha(c,cx,cy-h/2,cx,cy+h/2); linha(c,cx-w/2,cy,cx+w/2,cy);
  c.fillStyle='#8a5530'; c.fillRect(cx-w/2-5,cy+h/2+1,w+10,6); c.fillStyle='#4f9a35'; for(var i=0;i<4;i++){ circ(c,cx-w/2-2+i*(w+4)/3,cy+h/2,3.5); c.fill(); }
  ['#f472b6','#fde047','#f87171','#fff'].forEach(function(f,i){ flor(c,cx-w/2+i*w/3,cy+h/2-3,1.8,f); });
}
function castelo(c,x,y,s,t){
  var pa='#e6e0f2', ps='#cbc2df', te='#7f8cd1', te2='#c7779a';
  function torre(tx,tw,th,cone,cor){ c.fillStyle=lin(c,tx-tw/2,0,tx+tw/2,0,pa,ps); c.fillRect(tx-tw/2,y-th,tw,th);
    c.fillStyle=cor; c.beginPath(); c.moveTo(tx-tw/2-4,y-th+2); c.lineTo(tx,y-th-cone); c.lineTo(tx+tw/2+4,y-th+2); c.closePath(); c.fill();
    c.fillStyle='rgba(255,255,255,.25)'; c.beginPath(); c.moveTo(tx-tw/2-4,y-th+2); c.lineTo(tx,y-th-cone); c.lineTo(tx-tw*.1,y-th+2); c.fill();
    c.strokeStyle='#8b8aa8'; c.lineWidth=1.2*s; linha(c,tx,y-th-cone,tx,y-th-cone-12*s);
    var fl=Math.sin(t*3+tx)*2*s; c.fillStyle='#e26d6d'; c.beginPath(); c.moveTo(tx,y-th-cone-12*s); c.quadraticCurveTo(tx+7*s,y-th-cone-11*s+fl,tx+13*s,y-th-cone-9*s+fl); c.lineTo(tx,y-th-cone-6*s); c.fill();
    c.fillStyle='#7b7398'; rr(c,tx-2.5*s,y-th+th*.25,5*s,9*s,2.5*s); c.fill(); }
  c.fillStyle=lin(c,0,y-60*s,0,y,pa,ps); c.fillRect(x-80*s,y-58*s,160*s,58*s);
  for(var i=0;i<9;i++){ c.fillRect(x-80*s+i*19*s,y-64*s,10*s,7*s); }
  torre(x-84*s,26*s,96*s,40*s,te); torre(x+84*s,26*s,96*s,40*s,te); torre(x-36*s,22*s,122*s,36*s,te2); torre(x+10*s,38*s,150*s,56*s,te); torre(x+46*s,20*s,112*s,32*s,te2);
  c.fillStyle='#8f86ad'; c.beginPath(); c.moveTo(x-12*s,y); c.lineTo(x-12*s,y-22*s); c.arc(x,y-22*s,12*s,PI,TAU); c.lineTo(x+12*s,y); c.fill();
}
function bandeirolas(c,x0,y0,x1,y1,sag,t){
  var cx=(x0+x1)/2, cy=(y0+y1)/2+sag*2, cores=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899'];
  c.strokeStyle='rgba(80,52,36,.85)'; c.lineWidth=1.4; c.beginPath(); c.moveTo(x0,y0); c.quadraticCurveTo(cx,cy,x1,y1); c.stroke();
  var n=Math.max(3,Math.floor(Math.abs(x1-x0)/22));
  for(var i=1;i<n;i++){ var p=pontoQ(x0,y0,cx,cy,x1,y1,i/n); c.save(); c.translate(p[0],p[1]); c.rotate(Math.sin(t*2.2+i*.9)*.14);
    c.fillStyle=cores[i%6]; c.beginPath(); c.moveTo(-7,0); c.lineTo(7,0); c.lineTo(0,16); c.closePath(); c.fill();
    c.fillStyle='rgba(255,255,255,.28)'; c.beginPath(); c.moveTo(-7,0); c.lineTo(0,0); c.lineTo(0,16); c.fill(); c.restore(); }
}
function poco(c,x,y,t){
  c.fillStyle='#6b4128'; c.fillRect(x-36,y-104,7,74); c.fillRect(x+29,y-104,7,74);
  c.strokeStyle='#5a3420'; c.lineWidth=4; linha(c,x-32,y-84,x+40,y-84); c.lineWidth=3; linha(c,x+40,y-84,x+40,y-72); linha(c,x+40,y-72,x+48,y-72);
  c.lineCap='round'; c.lineJoin='round'; c.strokeStyle='#8e3b2b'; c.lineWidth=12; c.beginPath(); c.moveTo(x-50,y-98); c.lineTo(x,y-130); c.lineTo(x+50,y-98); c.stroke();
  c.save(); c.setLineDash([2,7]); c.strokeStyle='#6d2c20'; c.stroke(); c.restore(); c.lineCap='butt';
  c.fillStyle='#e8d5b8'; c.beginPath(); c.moveTo(x-36,y-101); c.lineTo(x,y-123); c.lineTo(x+36,y-101); c.fill();
  c.fillStyle='#3a2a20'; el(c,x,y-38,36,7); c.fill();
  var sw=Math.sin(t*1.4)*2; c.strokeStyle='#a98d6a'; c.lineWidth=1.5; linha(c,x,y-84,x+sw,y-58);
  c.fillStyle='#8a5530'; c.beginPath(); c.moveTo(x+sw-8,y-58); c.lineTo(x+sw+8,y-58); c.lineTo(x+sw+6,y-44); c.lineTo(x+sw-6,y-44); c.fill(); c.strokeStyle='#5b3418'; c.lineWidth=1.5; linha(c,x+sw-7,y-53,x+sw+7,y-53);
  c.fillStyle=lin(c,x-40,0,x+40,0,'#b9ab96','#8f826f'); c.fillRect(x-40,y-38,80,38); el(c,x,y,40,6); c.fill();
  for(var r=0;r<3;r++) for(var k=0;k<5;k++){ var bx=x-40+k*17+(r%2)*8; c.fillStyle=['#cfc3ad','#bfb29b','#d8ccb6'][(k+r)%3]; rr(c,bx+1,y-36+r*12,15,10,4); c.fill(); }
  c.strokeStyle='#cfc3ad'; c.lineWidth=4; el(c,x,y-38,38,7); c.stroke();
}
function cerca(c,x,y,w){ c.fillStyle='#f5efe2'; c.fillRect(x,y-20,w,4); c.fillRect(x,y-11,w,4); for(var px=x+3;px<x+w;px+=11){ c.beginPath(); c.moveTo(px,y); c.lineTo(px,y-24); c.lineTo(px+3.5,y-29); c.lineTo(px+7,y-24); c.lineTo(px+7,y); c.fill(); } c.fillStyle='rgba(120,100,80,.25)'; c.fillRect(x,y-4,w,4); }

function ceuVila(c,t){
  ceuG(c,[[0,'#5fb6ee'],[.5,'#b9e3fa'],[1,'#fdf0cc']]);
  sol(c,150,96,30,'#fff3c4','rgba(255,244,200,.35)');
  for(var i=0;i<5;i++){ var x=((i*260+t*5)%(W+300))-150; nuvemF(c,x,70+(i%3)*42,.9+(i%2)*.4,'#ffffff','#dbe9f6',.92); }
}
function longeVila(c,cam,t){
  /* colinas mais distantes, azuladas */
  c.fillStyle='#a8cfc4'; c.beginPath(); c.moveTo(0,H); for(var x=0;x<=W;x+=16) c.lineTo(x,330+Math.sin((x+cam*.6)*.007)*22+Math.sin((x+cam*.6)*.019)*8); c.lineTo(W,H); c.fill();
  /* o castelo no alto de uma colina */
  rep(cam,1500,function(ox){ var cx=ox+760; if(cx<-250||cx>W+250) return;
    c.fillStyle='#98c79e'; c.beginPath(); c.moveTo(cx-260,420); c.quadraticCurveTo(cx-120,300,cx,300); c.quadraticCurveTo(cx+130,300,cx+270,420); c.fill();
    castelo(c,cx,306,1,t); });
  /* colinas do meio com bosquinhos */
  c.fillStyle='#86bb7c'; c.beginPath(); c.moveTo(0,H); for(x=0;x<=W;x+=16) c.lineTo(x,388+Math.sin((x+cam)*.009+1)*14); c.lineTo(W,H); c.fill();
  rep(cam,520,function(ox){ [40,70,96,300,330].forEach(function(dx,j){ var tx=ox+dx; if(tx<-40||tx>W+40) return; arvoreR(c,tx,392+Math.sin((tx+cam)*.009+1)*14,48+j%2*14,'#5f9a5c','#77b36c','#6b5a44'); }); });
  bruma(c,300,450,'rgba(253,240,204,.45)');
}
function pertoVila(c,cam,t){
  rep(cam,1180,function(ox){ if(ox>W+40||ox<-1220) return;
    arvoreR(c,ox+300,452,190,'#4f8f4a','#6fb35e'); arvoreR(c,ox+1080,452,170,'#4f8f4a','#6fb35e');
    casa(c,ox+90,452,150,104,62,{teto:'#c4553b',jan:'#3f8f5a'},t);
    casa(c,ox+380,452,128,150,70,{teto:'#4f6fae',jan:'#c2410c'},t);
    casa(c,ox+800,452,172,98,68,{teto:'#9a5bb0',jan:'#2f6fb5'},t);
    poco(c,ox+640,452,t);
    bandeirolas(c,ox+240,350,ox+380,304,16,t); bandeirolas(c,ox+508,304,ox+800,356,34,t); bandeirolas(c,ox+972,356,ox+1270,350,40,t);
    cerca(c,ox+246,452,120); cerca(c,ox+520,452,64); cerca(c,ox+700,452,90);
    arbusto(c,ox+90,452,44,'#3f8a3c','#5fae4f',['#f472b6','#fff'],ox*0+1); arbusto(c,ox+222,452,40,'#3f8a3c','#5fae4f',['#fde047','#f87171'],2);
    arbusto(c,ox+508,452,46,'#3f8a3c','#5fae4f',['#c084fc','#fff'],3); arbusto(c,ox+972,452,50,'#3f8a3c','#5fae4f',['#f87171','#fde047'],4); });
}
function chaoVila(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-24,s.w,s.h+24); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#8b5e3c','#563621'); c.fillRect(s.x,s.y,s.w,s.h);
  for(x=grade(a,26);x<b;x+=26) for(var j=0;j<4;j++){ var py=s.y+52+j*24+hash(x*.3+j)*10; if(py>s.y+s.h-6) continue; c.fillStyle=j%2?'rgba(170,120,80,.35)':'rgba(60,35,20,.35)'; el(c,x+hash(x+j)*20,py,4+hash(x-j)*3,2.5); c.fill(); }
  if(s.h>=40){ c.fillStyle='#6b5646'; c.fillRect(s.x,s.y+12,s.w,30);
    for(var r=0;r<2;r++){ var off=r*12, yy=s.y+13+r*14;
      for(x=grade(a-off,24)+off;x<b;x+=24){ var hv=hash(x*.17+r); c.fillStyle=['#d9ccb6','#cbbca3','#e2d7c3','#bfb097'][Math.floor(hv*4)]; rr(c,x+1.5,yy,21,12.5,5); c.fill(); c.fillStyle='rgba(255,255,255,.35)'; rr(c,x+4,yy+1.5,14,3,1.5); c.fill(); } } }
  c.fillStyle=lin(c,0,s.y-2,0,s.y+14,'#8fd860','#4c9c37'); c.fillRect(s.x,s.y,s.w,13);
  c.fillStyle='#4c9c37'; for(x=grade(a,14);x<b;x+=14){ el(c,x+7,s.y+13,7.5,4+hash(x)*2.5); c.fill(); }
  c.fillStyle='#a8e67c'; c.fillRect(s.x,s.y,s.w,2);
  for(x=grade(a,8);x<b;x+=8){ var hh=4+hash(x*.7)*7; c.fillStyle=hash(x)>.5?'#74c64e':'#5fb043'; c.beginPath(); c.moveTo(x,s.y+2); c.lineTo(x+2+hash(x+1)*3,s.y-hh); c.lineTo(x+6,s.y+2); c.fill(); }
  for(x=grade(a,42);x<b;x+=42){ if(hash(x*1.31)>.55){ var fx=x+hash(x+5)*30; c.strokeStyle='#4c9c37'; c.lineWidth=1.2; linha(c,fx,s.y+1,fx,s.y-7); flor(c,fx,s.y-8,2.2,['#fff','#f9a8d4','#fde047','#c4b5fd'][Math.floor(hash(x)*4)]); } }
  bordas(c,s,'rgba(40,20,10,.35)'); c.fillStyle='rgba(0,0,0,.16)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platVila(c,p){
  sombraPlat(c,p,6);
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#cf9254','#8a5428'); rr(c,p.x,p.y,p.w,p.h,5); c.fill();
  var n=Math.max(1,Math.round(p.w/45)), i; c.strokeStyle='rgba(90,50,22,.7)'; c.lineWidth=1.5;
  for(i=1;i<n;i++) linha(c,p.x+p.w*i/n,p.y+2,p.x+p.w*i/n,p.y+p.h-1);
  c.strokeStyle='rgba(90,50,22,.22)'; c.lineWidth=1; for(i=0;i<n;i++){ var x0=p.x+p.w*i/n; linha(c,x0+6,p.y+8,x0+p.w/n*.7,p.y+8); linha(c,x0+p.w/n*.3,p.y+13,x0+p.w/n-6,p.y+13); }
  c.fillStyle='#4a2c16'; for(i=0;i<n;i++){ var xa=p.x+p.w*i/n; circ(c,xa+5,p.y+p.h/2+1,1.6); c.fill(); circ(c,xa+p.w/n-5,p.y+p.h/2+1,1.6); c.fill(); }
  c.fillStyle='rgba(255,255,255,.25)'; rr(c,p.x+3,p.y+1,p.w-6,3,1.5); c.fill();
  c.fillStyle='#5fb043'; for(var x=p.x+4;x<p.x+p.w-4;x+=9){ if(hash(x*.9)>.3){ el(c,x,p.y+1,5.5,3); c.fill(); } }
  c.fillStyle='#86d45a'; for(x=p.x+6;x<p.x+p.w-6;x+=13){ if(hash(x*.5)>.45){ el(c,x,p.y,3.5,2); c.fill(); } }
  for(i=0;i<2;i++){ var vx=p.x+p.w*(.25+i*.5)+hash(p.x+i)*10; if(hash(p.x*3+i)<.5) continue; c.strokeStyle='#4c9c37'; c.lineWidth=1.4; c.beginPath(); c.moveTo(vx,p.y+p.h-2); c.quadraticCurveTo(vx+5,p.y+p.h+8,vx+1,p.y+p.h+16); c.stroke(); c.fillStyle='#5fb043'; el(c,vx+4,p.y+p.h+6,3,1.8); c.fill(); el(c,vx-1,p.y+p.h+13,3,1.8); c.fill(); }
}

/* ============================================================
   BOSQUE — floresta encantada, tarde dourada e violeta
   ============================================================ */
function arvoreGrande(c,x,y,s,t,seed){
  var g=c.createLinearGradient(x-30*s,0,x+30*s,0); g.addColorStop(0,'#2c1a26'); g.addColorStop(.6,'#4d2f3c'); g.addColorStop(1,'#6d4552'); c.fillStyle=g;
  c.beginPath(); c.moveTo(x-62*s,y); c.quadraticCurveTo(x-26*s,y-8*s,x-24*s,y-60*s); c.quadraticCurveTo(x-20*s,y-170*s,x-14*s,y-240*s); c.lineTo(x+14*s,y-240*s); c.quadraticCurveTo(x+22*s,y-170*s,x+24*s,y-60*s); c.quadraticCurveTo(x+28*s,y-8*s,x+66*s,y); c.closePath(); c.fill();
  c.strokeStyle='rgba(20,10,18,.45)'; c.lineWidth=2*s; for(var i=0;i<4;i++){ var bx=x-14*s+i*9*s; c.beginPath(); c.moveTo(bx,y-8*s); c.quadraticCurveTo(bx+6*s*Math.sin(i+seed),y-110*s,bx-2*s,y-220*s); c.stroke(); }
  c.strokeStyle='rgba(255,200,140,.25)'; c.lineWidth=3*s; c.beginPath(); c.moveTo(x+18*s,y-20*s); c.quadraticCurveTo(x+20*s,y-130*s,x+12*s,y-230*s); c.stroke();
  c.strokeStyle='#3d2532'; c.lineCap='round'; c.lineWidth=14*s; c.beginPath(); c.moveTo(x-6*s,y-170*s); c.quadraticCurveTo(x-50*s,y-200*s,x-90*s,y-250*s); c.moveTo(x+6*s,y-190*s); c.quadraticCurveTo(x+50*s,y-215*s,x+86*s,y-265*s); c.stroke(); c.lineCap='butt';
  /* toca na raiz */
  c.fillStyle='#1c1018'; el(c,x+4*s,y-18*s,12*s,16*s); c.fill(); c.fillStyle='rgba(255,210,122,.5)'; el(c,x+4*s,y-14*s,6*s,8*s); c.fill();
  var B=[[-90,-270,62],[-20,-300,78],[70,-285,66],[-55,-330,54],[40,-345,58],[120,-250,44],[-130,-240,40]];
  c.fillStyle='#173a40'; B.forEach(function(b){ circ(c,x+b[0]*s,y+b[1]*s,b[2]*s); c.fill(); });
  c.fillStyle='#21524f'; B.forEach(function(b){ circ(c,x+(b[0]+b[2]*.18)*s,y+(b[1]-b[2]*.2)*s,b[2]*.78*s); c.fill(); });
  c.strokeStyle='rgba(255,200,110,.55)'; c.lineWidth=3*s; B.forEach(function(b){ c.beginPath(); c.arc(x+b[0]*s,y+b[1]*s,b[2]*s-2,-1.25,.15); c.stroke(); });
  /* lanterninhas mágicas penduradas */
  [[-100,-220,64],[30,-235,84],[110,-215,50]].forEach(function(l,j){ var lx=x+l[0]*s+Math.sin(t*1.3+j+seed)*3, ly=y+l[1]*s+l[2]*s;
    c.strokeStyle='rgba(30,20,30,.6)'; c.lineWidth=1; linha(c,x+l[0]*s,y+l[1]*s,lx,ly-6);
    var cor=j%2?'rgba(120,230,255,.75)':'rgba(255,214,120,.8)'; brilho(c,lx,ly,22,cor,.55+.25*Math.sin(t*2+j));
    c.fillStyle=j%2?'#c9f6ff':'#fff1c2'; circ(c,lx,ly,4.5); c.fill(); });
}
function cogumelo(c,x,y,s,cap,pinta,glow,t){
  if(glow) brilho(c,x,y-26*s,46*s,glow,.5+.2*Math.sin(t*2+x));
  c.fillStyle=lin(c,x-8*s,0,x+8*s,0,'#f6ead6','#d8c3a2'); c.beginPath(); c.moveTo(x-8*s,y); c.quadraticCurveTo(x-6*s,y-14*s,x-7*s,y-26*s); c.lineTo(x+7*s,y-26*s); c.quadraticCurveTo(x+5*s,y-12*s,x+10*s,y); c.closePath(); c.fill();
  c.fillStyle='#e9d4b4'; el(c,x,y-26*s,24*s,5*s); c.fill();
  c.fillStyle=lin(c,0,y-50*s,0,y-24*s,cla(cap,.2),esc(cap,.15)); c.beginPath(); c.moveTo(x-28*s,y-25*s); c.bezierCurveTo(x-28*s,y-56*s,x+28*s,y-56*s,x+28*s,y-25*s); c.quadraticCurveTo(x,y-20*s,x-28*s,y-25*s); c.fill();
  c.fillStyle=pinta; [[-14,-38,4.5],[2,-46,4],[15,-35,5],[-2,-32,3]].forEach(function(p){ el(c,x+p[0]*s,y+p[1]*s,p[2]*s,p[2]*.8*s); c.fill(); });
  c.fillStyle='rgba(255,255,255,.35)'; el(c,x-10*s,y-44*s,8*s,3.5*s); c.fill();
}
function samambaia(c,x,y,h,cor,inc){
  c.strokeStyle=cor; c.fillStyle=cor; c.lineWidth=1.8;
  [-1,-.4,.3,1].forEach(function(d,k){ var ex=x+d*h*.55+inc, ey=y-h*(.75+.25*(1-Math.abs(d)));
    c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+d*h*.1,ey+h*.2,ex,ey); c.stroke();
    for(var i=1;i<8;i++){ var u=i/8, p=pontoQ(x,y,x+d*h*.1,ey+h*.2,ex,ey,u), r=(1-u)*h*.09+1; el(c,p[0]-r*.6,p[1],r,r*.45); c.fill(); el(c,p[0]+r*.6,p[1],r,r*.45); c.fill(); } });
}
function ceuBosque(c,t){
  ceuG(c,[[0,'#2a1857'],[.42,'#7f46a8'],[.72,'#e9877a'],[1,'#ffd27a']]);
  c.fillStyle='#fff'; for(var i=0;i<26;i++){ c.globalAlpha=(.25+.5*Math.abs(Math.sin(t*1.2+i)))*.8; circ(c,hash(i+40)*W,hash(i+70)*170,hash(i)*1.3+.4); c.fill(); } c.globalAlpha=1;
  sol(c,700,340,46,'#ffe9a8','rgba(255,214,140,.32)');
  raios(c,[520,600,680,760],0,H,-140,40,'rgba(255,226,160,A)',.14,t);
}
function longeBosque(c,cam,t){
  rep(cam*.6,700,function(ox){ for(var i=0;i<6;i++){ var tx=ox+i*118+hash(i)*30; if(tx<-90||tx>W+90) continue; var h=150+hash(i+5)*80; c.fillStyle='#8a5aa6'; c.fillRect(tx-5,450-h*.5,10,h*.5); circ(c,tx,450-h*.62,h*.3); c.fill(); circ(c,tx-h*.16,450-h*.48,h*.2); c.fill(); circ(c,tx+h*.17,450-h*.5,h*.21); c.fill(); } });
  bruma(c,250,440,'rgba(255,190,150,.35)');
  rep(cam,640,function(ox){ for(var i=0;i<5;i++){ var tx=ox+i*130+hash(i+9)*40; if(tx<-90||tx>W+90) continue; var h=200+hash(i+2)*90; c.fillStyle='#5a3577'; c.fillRect(tx-7,450-h*.5,14,h*.5); c.beginPath(); c.moveTo(tx-30,450); c.quadraticCurveTo(tx-8,440,tx-7,420); c.lineTo(tx+7,420); c.quadraticCurveTo(tx+8,440,tx+30,450); c.fill(); circ(c,tx,450-h*.66,h*.27); c.fill(); circ(c,tx-h*.17,450-h*.52,h*.19); c.fill(); circ(c,tx+h*.18,450-h*.55,h*.2); c.fill(); } });
  bruma(c,330,452,'rgba(255,200,160,.42)');
}
function pertoBosque(c,cam,t){
  rep(cam,1100,function(ox){ if(ox>W+200||ox<-1300) return;
    arvoreGrande(c,ox+170,452,1,t,1); arvoreGrande(c,ox+760,452,1.15,t,2);
    cogumelo(c,ox+300,452,1.5,'#d9433b','#fff7ed',null,t); cogumelo(c,ox+338,452,.9,'#e05a45','#fff7ed',null,t);
    cogumelo(c,ox+560,452,1.1,'#4cc3dd','#e0fbff','rgba(110,230,255,.7)',t); cogumelo(c,ox+590,452,.7,'#5fd0e6','#e0fbff','rgba(110,230,255,.7)',t);
    cogumelo(c,ox+920,452,1.25,'#b45bd6','#fbeaff','rgba(220,150,255,.6)',t);
    samambaia(c,ox+60,452,60,'#2f6b4a',Math.sin(t+ox)*2); samambaia(c,ox+450,452,54,'#2f6b4a',Math.sin(t*1.1)*2); samambaia(c,ox+1000,452,64,'#2f6b4a',Math.sin(t*.9)*2);
    for(var i=0;i<9;i++){ var fx=ox+hash(i+11)*1100+Math.sin(t*.7+i*2)*26, fy=230+hash(i+31)*190+Math.cos(t*.9+i)*16; if(fx<-20||fx>W+20) continue; brilho(c,fx,fy,12,'rgba(255,236,140,.9)',.4+.5*Math.abs(Math.sin(t*2.3+i))); c.fillStyle='#fffbe0'; circ(c,fx,fy,1.6); c.fill(); }
  });
}
function chaoBosque(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-24,s.w,s.h+24); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#55364a','#2b1a26'); c.fillRect(s.x,s.y,s.w,s.h);
  c.strokeStyle='rgba(120,80,60,.55)'; c.lineCap='round';
  for(x=grade(a,90);x<b;x+=90){ var hv=hash(x*.11); if(s.h<40) break; c.lineWidth=3+hv*3; c.beginPath(); c.moveTo(x,s.y+12); c.bezierCurveTo(x+20,s.y+30+hv*20,x+50,s.y+20,x+80,s.y+40+hv*20); c.stroke(); c.lineWidth=1.6; c.beginPath(); c.moveTo(x+40,s.y+28); c.quadraticCurveTo(x+46,s.y+46,x+38,s.y+60); c.stroke(); }
  c.lineCap='butt';
  for(x=grade(a,30);x<b;x+=30){ var py=s.y+40+hash(x*.7)*40; if(py<s.y+s.h-8){ c.fillStyle='rgba(30,16,26,.5)'; el(c,x+hash(x)*20,py,5,3); c.fill(); } }
  c.fillStyle=lin(c,0,s.y-3,0,s.y+14,'#7cc35d','#2f6b33'); c.fillRect(s.x,s.y,s.w,12);
  c.fillStyle='#2f6b33'; for(x=grade(a,12);x<b;x+=12){ el(c,x+6,s.y+12,7,3+hash(x)*4); c.fill(); }
  c.fillStyle='#9ddb73'; for(x=grade(a,10);x<b;x+=10){ el(c,x+5,s.y+1,5,2.2); c.fill(); }
  for(x=grade(a,64);x<b;x+=64){ var hv2=hash(x*1.9); if(hv2>.62){ var mx=x+hash(x+3)*40; brilho(c,mx,s.y-4,14,'rgba(110,230,255,.7)',.6); c.fillStyle='#e8f8f2'; c.fillRect(mx-1,s.y-6,2,6); c.fillStyle='#5fd0e6'; c.beginPath(); c.arc(mx,s.y-6,4.5,PI,TAU); c.fill(); } else if(hv2<.2){ c.fillStyle='#3b7d45'; var gx=x+hash(x+8)*40; for(var k=0;k<4;k++){ c.beginPath(); c.moveTo(gx+k*3,s.y+1); c.lineTo(gx+k*3+(k-1.5)*2,s.y-9-hash(gx+k)*4); c.lineTo(gx+k*3+2,s.y+1); c.fill(); } } }
  bordas(c,s,'rgba(10,0,10,.4)'); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platBosque(c,p){
  sombraPlat(c,p,9);
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#8a6048','#4a2f24'); rr(c,p.x,p.y,p.w,p.h,9); c.fill();
  c.strokeStyle='rgba(40,20,14,.45)'; c.lineWidth=1.3; for(var x=p.x+14;x<p.x+p.w-14;x+=22){ var hv=hash(x*.7); linha(c,x,p.y+6+hv*3,x+12+hv*6,p.y+6+hv*3); linha(c,x+8,p.y+12,x+16,p.y+12); }
  c.fillStyle='#c79a6c'; el(c,p.x+p.w-6,p.y+p.h/2,5,p.h/2-1); c.fill(); c.strokeStyle='#8a6048'; c.lineWidth=1; el(c,p.x+p.w-6,p.y+p.h/2,3,p.h/2-4); c.stroke(); el(c,p.x+p.w-6,p.y+p.h/2,1.2,2.5); c.stroke();
  c.fillStyle=lin(c,0,p.y-3,0,p.y+6,'#8ad066','#3f8a3c'); c.beginPath(); c.moveTo(p.x+4,p.y+5); for(x=p.x+4;x<=p.x+p.w-10;x+=8) c.quadraticCurveTo(x+4,p.y-3-hash(x)*2,x+8,p.y+3); c.lineTo(p.x+p.w-10,p.y+6); c.closePath(); c.fill();
  if(p.w>=90){ var mx=p.x+p.w*.3+hash(p.x)*p.w*.3; c.fillStyle='#f6ead6'; c.fillRect(mx-1.5,p.y-8,3,8); c.fillStyle='#d9433b'; c.beginPath(); c.arc(mx,p.y-7,6,PI,TAU); c.fill(); c.fillStyle='#fff'; circ(c,mx-2,p.y-10,1.2); c.fill(); circ(c,mx+2.5,p.y-9,1); c.fill(); }
}

/* ============================================================
   BIBLIOTECA — interior aconchegante (intro e final)
   ============================================================ */
var LIV=['#8e2b2b','#2c4a7a','#2f6b47','#b8862f','#6b3f8f','#a0522d','#1f5f6b','#7a2f55'];
function estanteAlta(c,x,y0,y1,w){
  c.fillStyle=lin(c,x,0,x+w,0,'#4a2614','#5e3219'); c.fillRect(x,y0,w,y1-y0);
  var prat=64, y;
  for(y=y0+14;y+prat<=y1+2;y+=prat){
    c.fillStyle='#2c160b'; c.fillRect(x+8,y,w-16,prat-10);
    var bx=x+10, k=0;
    while(bx<x+w-14){ var hv=hash(bx*.37+y), bw=7+hv*9, bh=prat-22-hash(bx+y*.1)*16;
      if(hv>.93){ bx+=14; continue; }
      if(bx+bw>x+w-10) break;
      var cor=LIV[Math.floor(hash(bx*1.7+y)*8)];
      if(hv<.06&&bx<x+w-40){ c.save(); c.translate(bx,y+prat-10); c.rotate(-.32); c.fillStyle=cor; c.fillRect(0,-bh,bw,bh); c.restore(); bx+=bw+12; continue; }
      c.fillStyle=cor; c.fillRect(bx,y+prat-10-bh,bw,bh);
      c.fillStyle='rgba(255,220,150,.55)'; c.fillRect(bx+1,y+prat-10-bh+5,bw-2,1.5); c.fillRect(bx+1,y+prat-16,bw-2,1.5);
      c.fillStyle='rgba(0,0,0,.22)'; c.fillRect(bx+bw-2,y+prat-10-bh,2,bh);
      bx+=bw+1; k++; }
    c.fillStyle=lin(c,0,y+prat-10,0,y+prat-2,'#7a4422','#4a2614'); c.fillRect(x+4,y+prat-10,w-8,8);
  }
  c.fillStyle='#3a1d0e'; c.fillRect(x,y0,8,y1-y0); c.fillRect(x+w-8,y0,8,y1-y0);
  c.fillStyle='#6e3b1c'; c.fillRect(x-4,y0-10,w+8,12);
}
function ceuBiblio(c,t){
  ceuG(c,[[0,'#2e160c'],[.5,'#5a2f1a'],[1,'#7a4424']]);
  c.fillStyle='rgba(255,220,160,.05)'; for(var x=0;x<W;x+=36) c.fillRect(x,0,18,H);
}
function longeBiblio(c,cam,t){
  rep(cam,1400,function(ox){ if(ox>W+20||ox<-1420) return;
    var wx=ox+480;
    estanteAlta(c,ox+40,40,452,170); estanteAlta(c,ox+210,40,452,140); estanteAlta(c,ox+610,40,452,140); estanteAlta(c,ox+750,40,452,170); estanteAlta(c,ox+960,40,452,170); estanteAlta(c,ox+1130,40,452,170);
    /* janela em arco com a noite lá fora */
    c.fillStyle='#4a2614'; c.beginPath(); c.moveTo(wx-96,380); c.lineTo(wx-96,150); c.arc(wx,150,96,PI,TAU); c.lineTo(wx+96,380); c.fill();
    c.save(); c.beginPath(); c.moveTo(wx-82,372); c.lineTo(wx-82,150); c.arc(wx,150,82,PI,TAU); c.lineTo(wx+82,372); c.closePath(); c.clip();
    c.fillStyle=lin(c,0,68,0,372,'#1b2a63','#5b4a9a'); c.fillRect(wx-82,60,164,320);
    c.fillStyle='#fff'; for(var i=0;i<16;i++){ c.globalAlpha=.4+.6*Math.abs(Math.sin(t*1.4+i)); circ(c,wx-80+hash(i+3)*160,80+hash(i+8)*200,hash(i)*1.2+.5); c.fill(); } c.globalAlpha=1;
    brilho(c,wx+34,128,60,'rgba(255,246,200,.45)',1); c.fillStyle='#fff6d0'; circ(c,wx+34,128,20); c.fill(); c.fillStyle='rgba(220,200,150,.5)'; circ(c,wx+28,124,4); c.fill(); circ(c,wx+40,134,3); c.fill();
    c.fillStyle='#2a2a55'; c.beginPath(); c.moveTo(wx-82,372); for(var hx=wx-82;hx<=wx+82;hx+=8) c.lineTo(hx,330+Math.sin(hx*.05)*10); c.lineTo(wx+82,372); c.fill();
    c.restore();
    c.strokeStyle='#4a2614'; c.lineWidth=7; linha(c,wx,64,wx,372); linha(c,wx-82,230,wx+82,230);
    c.fillStyle='#5e3219'; c.fillRect(wx-104,372,208,16);
    /* cortinas de veludo */
    [[-1],[1]].forEach(function(d){ d=d[0]; var cx2=wx+d*104; c.fillStyle=lin(c,cx2-30,0,cx2+30,0,'#7a1630','#b52a48');
      c.beginPath(); c.moveTo(cx2-d*14,44); c.lineTo(cx2+d*40,44); c.quadraticCurveTo(cx2+d*24,250,cx2+d*44,400); c.lineTo(cx2+d*6,400); c.quadraticCurveTo(cx2-d*30,262,cx2-d*14,44); c.fill();
      c.strokeStyle='rgba(60,0,20,.4)'; c.lineWidth=2; for(var k=1;k<4;k++){ c.beginPath(); c.moveTo(cx2+d*(k*12-8),48); c.quadraticCurveTo(cx2+d*(k*8-10),250,cx2+d*(k*10+8),398); c.stroke(); }
      c.fillStyle='#e0b04a'; rr(c,cx2-8+d*8,250,16,10,4); c.fill(); });
    c.fillStyle='#8a4a22'; c.fillRect(wx-150,38,300,10); c.fillStyle='#e0b04a'; circ(c,wx-152,43,7); c.fill(); circ(c,wx+152,43,7); c.fill();
    /* arandelas com vela */
    [ox+392,ox+568,ox+1040].forEach(function(ax,j){ var fl=Math.sin(t*9+j*2)*1.2; brilho(c,ax,196,70,'rgba(255,200,110,.32)',.8+.2*Math.sin(t*5+j)); c.fillStyle='#c99a3a'; c.fillRect(ax-2,206,4,26); el(c,ax,206,9,3); c.fill(); c.fillStyle='#fff5e0'; c.fillRect(ax-3,190,6,16); c.fillStyle='#ffcf5a'; c.beginPath(); c.moveTo(ax-3,190); c.quadraticCurveTo(ax+fl,176,ax+3,190); c.fill(); c.fillStyle='#fff3b0'; el(c,ax,187,1.5,3); c.fill(); });
    /* escada de rodinhas encostada */
    var lx=ox+700; c.strokeStyle='#8a5530'; c.lineWidth=5; linha(c,lx,452,lx+42,96); linha(c,lx+34,452,lx+76,96); c.lineWidth=3; for(var r=0;r<10;r++){ var u=r/10+.04; linha(c,lx+42*u+2,452-356*u,lx+34+42*u-2,452-356*u); }
  });
  brilho(c,W/2,330,520,'rgba(255,190,110,.18)',1);
}
function pertoBiblio(c,cam,t){
  /* piso de tábuas */
  c.fillStyle=lin(c,0,450,0,H,'#8a5228','#4e2c14'); c.fillRect(0,450,W,H-450);
  c.strokeStyle='rgba(40,20,8,.45)'; c.lineWidth=1.5; for(var r=0;r<5;r++){ var yy=456+r*18; linha(c,0,yy,W,yy); rep(cam,220,function(ox){ var sx=ox+(r%2)*110+hash(r)*60; linha(c,sx,yy-18,sx,yy); }); }
  c.fillStyle='rgba(255,220,160,.12)'; c.fillRect(0,450,W,3);
  /* tapete */
  rep(cam,1400,function(ox){ var cx=ox+480; if(cx<-400||cx>W+400) return;
    c.fillStyle='#7a1d2c'; el(c,cx,500,330,34); c.fill(); c.strokeStyle='#e0b04a'; c.lineWidth=3; el(c,cx,500,316,28); c.stroke(); c.strokeStyle='rgba(224,176,74,.6)'; c.lineWidth=2; el(c,cx,500,290,22); c.stroke();
    c.fillStyle='#b8344a'; el(c,cx,500,240,15); c.fill(); c.fillStyle='rgba(224,176,74,.75)'; for(var k=0;k<12;k++){ var a=k*TAU/12; el(c,cx+Math.cos(a)*268,500+Math.sin(a)*19,6,3); c.fill(); }
    /* mesa onde o livro se apoia (tampo em y=336) */
    c.fillStyle='rgba(0,0,0,.25)'; el(c,cx,452,170,9); c.fill();
    c.fillStyle=lin(c,0,350,0,452,'#5e3219','#3a1d0e'); [[-140],[124]].forEach(function(l){ var lx=cx+l[0]; c.beginPath(); c.moveTo(lx,352); c.lineTo(lx+16,352); c.quadraticCurveTo(lx+24,400,lx+12,452); c.lineTo(lx+4,452); c.quadraticCurveTo(lx-8,400,lx,352); c.fill(); });
    c.fillStyle=lin(c,0,336,0,356,'#9a5a2c','#5e3219'); rr(c,cx-166,336,332,18,5); c.fill(); c.fillStyle='rgba(255,220,160,.35)'; c.fillRect(cx-160,337,320,2);
    c.fillStyle='#6b3a1c'; c.fillRect(cx-150,354,300,10);
    /* poltrona, abajur, pilha de livros, vaso */
    poltrona(c,ox+120,452); abajur(c,ox+250,452,t); pilha(c,ox+690,452); vaso(c,ox+850,452,t);
  });
  for(var i=0;i<16;i++){ var px=(hash(i+5)*W+t*6*(1+hash(i)))%W, py=120+((hash(i+9)*300-t*5*(1+hash(i+2)))%300+300)%300; c.fillStyle='rgba(255,230,170,'+(.25+.35*Math.abs(Math.sin(t+i)))+')'; circ(c,px,py,1.3+hash(i)*1.2); c.fill(); }
}
function poltrona(c,x,y){
  c.fillStyle='#2b4f7a'; rr(c,x-56,y-128,112,96,30); c.fill(); c.fillStyle='#355f90'; rr(c,x-44,y-118,88,70,22); c.fill();
  c.fillStyle='#2b4f7a'; rr(c,x-70,y-78,34,60,14); c.fill(); rr(c,x+36,y-78,34,60,14); c.fill(); c.fillStyle='#3d6ba0'; rr(c,x-46,y-60,92,32,12); c.fill();
  c.fillStyle='rgba(255,255,255,.12)'; rr(c,x-66,y-76,26,8,4); c.fill(); rr(c,x+40,y-76,26,8,4); c.fill();
  c.fillStyle='#3a1d0e'; c.fillRect(x-58,y-20,8,20); c.fillRect(x+50,y-20,8,20);
}
function abajur(c,x,y,t){ brilho(c,x,y-150,120,'rgba(255,205,120,.4)',.9+.1*Math.sin(t*3)); c.fillStyle='#c99a3a'; c.fillRect(x-2,y-140,4,140); el(c,x,y-2,18,5); c.fill();
  c.fillStyle=lin(c,0,y-180,0,y-140,'#ffe2a0','#e0a040'); c.beginPath(); c.moveTo(x-16,y-180); c.lineTo(x+16,y-180); c.lineTo(x+30,y-140); c.lineTo(x-30,y-140); c.closePath(); c.fill(); c.fillStyle='rgba(255,240,200,.5)'; el(c,x,y-140,30,4); c.fill(); }
function pilha(c,x,y){ [[0,-12,64,'#2c4a7a'],[4,-24,56,'#8e2b2b'],[-3,-36,60,'#2f6b47'],[2,-46,48,'#b8862f']].forEach(function(b){ c.fillStyle=b[3]; rr(c,x+b[0]-b[2]/2,y+b[1],b[2],11,2); c.fill(); c.fillStyle='#f4ead2'; c.fillRect(x+b[0]+b[2]/2-6,y+b[1]+2,5,7); c.fillStyle='rgba(255,220,150,.6)'; c.fillRect(x+b[0]-b[2]/2+6,y+b[1]+2,2,7); }); }
function vaso(c,x,y,t){ var sw=Math.sin(t*.8)*2; c.fillStyle='#2f6b47'; [[-30,-80],[-14,-104],[6,-110],[24,-90],[34,-70]].forEach(function(f,i){ c.save(); c.translate(x,y-38); c.rotate(Math.atan2(f[1],f[0])+PI/2+sw*.01); el(c,0,-34,9,34); c.fill(); c.restore(); });
  c.fillStyle=lin(c,x-22,0,x+22,0,'#b4532a','#7a3418'); c.beginPath(); c.moveTo(x-24,y-40); c.lineTo(x+24,y-40); c.lineTo(x+17,y); c.lineTo(x-17,y); c.fill(); c.fillStyle='#c8653a'; c.fillRect(x-27,y-44,54,8); }
function chaoBiblio(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#8a5228','#4e2c14'); c.fillRect(s.x,s.y,s.w,s.h); c.strokeStyle='rgba(40,20,8,.45)'; c.lineWidth=1.5; for(var yy=s.y+16;yy<s.y+s.h;yy+=18) linha(c,s.x,yy,s.x+s.w,yy); c.fillStyle='rgba(255,220,160,.2)'; c.fillRect(s.x,s.y,s.w,3); }
function platBiblio(c,p){ sombraPlat(c,p,3); c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#8a4a22','#4a2614'); rr(c,p.x,p.y,p.w,p.h,3); c.fill(); var bx=p.x+4; while(bx<p.x+p.w-12){ var bw=8+hash(bx)*6; c.fillStyle=LIV[Math.floor(hash(bx*3)*8)]; c.fillRect(bx,p.y-14-hash(bx+1)*6,bw,14+hash(bx+1)*6); bx+=bw+1; } c.fillStyle='rgba(255,220,160,.3)'; c.fillRect(p.x,p.y,p.w,2); }

/* ============================================================
   RECIFE — fase submersa
   ============================================================ */
function ceuRecife(c,t){
  ceuG(c,[[0,'#8eeee6'],[.12,'#3cc4cf'],[.45,'#1590ae'],[.8,'#0b5f86'],[1,'#083f62']]);
  c.fillStyle='rgba(225,255,252,.55)'; c.beginPath(); c.moveTo(0,0); for(var x=0;x<=W;x+=12) c.lineTo(x,14+Math.sin(x*.035+t*2)*4+Math.sin(x*.011-t)*3); c.lineTo(W,0); c.fill();
  c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1.5; for(var i=0;i<14;i++){ var cx=((i*80+t*14)%(W+80))-40; c.beginPath(); c.moveTo(cx,30+(i%3)*10); c.quadraticCurveTo(cx+14,24+(i%3)*10,cx+30,32+(i%3)*10); c.stroke(); }
  raios(c,[60,240,420,600,780,900],0,470,90,46,'rgba(220,255,250,A)',.2,t);
}
function peixe(c,x,y,s,dir,cor){ c.save(); c.translate(x,y); c.scale(dir*s,s); c.fillStyle=cor; el(c,0,0,10,5); c.fill(); c.beginPath(); c.moveTo(-8,0); c.lineTo(-15,-5); c.lineTo(-15,5); c.closePath(); c.fill(); c.restore(); }
function longeRecife(c,cam,t){
  rep(cam*.6,820,function(ox){ c.fillStyle='rgba(30,110,150,.55)'; c.beginPath(); c.moveTo(ox-10,452); c.quadraticCurveTo(ox+60,330,ox+150,360); c.quadraticCurveTo(ox+210,300,ox+300,350); c.lineTo(ox+300,452); c.fill();
    c.beginPath(); c.moveTo(ox+420,452); c.lineTo(ox+430,300); c.quadraticCurveTo(ox+520,250,ox+610,300); c.lineTo(ox+620,452); c.lineTo(ox+570,452); c.quadraticCurveTo(ox+520,350,ox+470,452); c.fill(); });
  rep(cam,700,function(ox){ for(var i=0;i<6;i++){ var kx=ox+40+i*112+hash(i)*40; if(kx<-30||kx>W+30) continue; var h=120+hash(i+4)*120; c.strokeStyle='rgba(28,120,120,.6)'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(kx,452); c.bezierCurveTo(kx+Math.sin(t*.9+i)*16,452-h*.4,kx-Math.sin(t*.8+i)*18,452-h*.7,kx+Math.sin(t+i)*12,452-h); c.stroke(); } c.lineCap='butt';
    c.fillStyle='rgba(20,100,140,.6)'; for(i=0;i<4;i++){ var bx=ox+hash(i+20)*700; el(c,bx,452,40+hash(i)*40,22+hash(i+1)*20); c.fill(); } });
  /* cardume ao longe */
  for(var g=0;g<2;g++){ var gx=((g*560-cam*.5+t*(18+g*8))%(W+400)+W+400)%(W+400)-200, gy=150+g*110+Math.sin(t*.7+g)*14;
    for(var f=0;f<11;f++){ var fx=gx+hash(f+g*13)*90, fy=gy+hash(f+g*7)*40+Math.sin(t*2+f)*3; peixe(c,fx,fy,.9,1,'rgba(14,80,110,.55)'); } }
  rep(cam*.8,1300,function(ox){ var tx=ox+300+Math.sin(t*.2)*30, ty=210+Math.sin(t*.5)*12; if(tx<-80||tx>W+80) return; c.fillStyle='rgba(14,80,110,.45)'; el(c,tx,ty,34,20); c.fill(); el(c,tx+38,ty-4,11,8); c.fill(); var fl=Math.sin(t*1.5)*.4; c.save(); c.translate(tx+12,ty-14); c.rotate(-.6+fl); el(c,0,-14,8,18); c.fill(); c.restore(); c.save(); c.translate(tx+12,ty+14); c.rotate(.6-fl); el(c,0,14,8,18); c.fill(); c.restore(); });
  bruma(c,260,452,'rgba(10,80,120,.35)');
}
function coralGalho(c,x,y,h,cor,seed){ c.strokeStyle=cor; c.lineCap='round';
  function ramo(x0,y0,ang,len,larg,n){ var x1=x0+Math.cos(ang)*len, y1=y0+Math.sin(ang)*len; c.lineWidth=larg; linha(c,x0,y0,x1,y1); if(n>0){ ramo(x1,y1,ang-.42-hash(seed+n)*.2,len*.72,larg*.75,n-1); ramo(x1,y1,ang+.38+hash(seed+n*2)*.2,len*.7,larg*.75,n-1); } else { c.fillStyle=cla(cor,.35); circ(c,x1,y1,larg*.8); c.fill(); } }
  ramo(x,y,-PI/2,h*.34,h*.1,3); c.lineCap='butt'; }
function coralCerebro(c,x,y,r,cor){ c.fillStyle=lin(c,0,y-r,0,y,cla(cor,.15),esc(cor,.2)); c.beginPath(); c.arc(x,y,r,PI,TAU); c.fill(); c.strokeStyle=esc(cor,.3); c.lineWidth=1.6; for(var k=1;k<5;k++){ c.beginPath(); for(var a=PI;a<=TAU+.01;a+=.12){ var rr2=r*(k/5)+Math.sin(a*9+k)*2.5; var px=x+Math.cos(a)*rr2, py=y+Math.sin(a)*rr2; if(a===PI) c.moveTo(px,py); else c.lineTo(px,py); } c.stroke(); } c.fillStyle='rgba(255,255,255,.18)'; el(c,x-r*.3,y-r*.6,r*.35,r*.15); c.fill(); }
function leque(c,x,y,h,cor,t){ c.save(); c.translate(x,y); c.rotate(Math.sin(t*.8+x)*.04); c.fillStyle=cor; c.globalAlpha=.85; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-h*.75,-h*.6,-h*.35,-h); c.quadraticCurveTo(0,-h*1.15,h*.35,-h); c.quadraticCurveTo(h*.75,-h*.6,0,0); c.fill();
  c.globalAlpha=1; c.strokeStyle=esc(cor,.3); c.lineWidth=1.2; for(var k=-3;k<=3;k++){ linha(c,0,0,k*h*.11,-h*1.02+Math.abs(k)*h*.06); } for(var j=1;j<5;j++){ c.beginPath(); c.arc(0,0,h*j*.2,-PI*.85,-PI*.15); c.stroke(); } c.restore(); }
function esponja(c,x,y,cor){ [[-12,52,10],[2,70,11],[16,44,9]].forEach(function(e){ c.fillStyle=lin(c,x+e[0]-e[2],0,x+e[0]+e[2],0,cla(cor,.1),esc(cor,.2)); rr(c,x+e[0]-e[2],y-e[1],e[2]*2,e[1],e[2]); c.fill(); c.fillStyle=esc(cor,.45); el(c,x+e[0],y-e[1]+5,e[2]*.65,3.5); c.fill(); }); }
function anemona(c,x,y,cor,t){ c.strokeStyle=cor; c.lineCap='round'; c.lineWidth=4; for(var k=0;k<9;k++){ var a=-PI+.25+k*(PI-.5)/8, sw=Math.sin(t*1.6+k*.7)*5; c.beginPath(); c.moveTo(x,y-8); c.quadraticCurveTo(x+Math.cos(a)*14,y-8+Math.sin(a)*14,x+Math.cos(a)*24+sw,y-8+Math.sin(a)*22); c.stroke(); } c.lineCap='butt'; c.fillStyle=esc(cor,.25); el(c,x,y-4,12,8); c.fill(); }
function alga(c,x,y,h,cor,t,i){ c.fillStyle=cor; c.beginPath(); c.moveTo(x-5,y); var n=8, k; for(k=1;k<=n;k++){ var u=k/n; c.lineTo(x+Math.sin(t*1.2+i+u*3)*14*u-6*(1-u),y-h*u); } for(k=n;k>=0;k--){ u=k/n; c.lineTo(x+Math.sin(t*1.2+i+u*3)*14*u+6*(1-u)+2,y-h*u); } c.fill(); }
function pertoRecife(c,cam,t){
  rep(cam,1150,function(ox){ if(ox>W+150||ox<-1300) return;
    alga(c,ox+30,452,210,'#2e8b57',t,1); alga(c,ox+48,452,160,'#3aa168',t,2); alga(c,ox+520,452,240,'#2e8b57',t,3); alga(c,ox+540,452,180,'#43b072',t,4); alga(c,ox+1000,452,200,'#3aa168',t,5);
    leque(c,ox+150,452,120,'#9b6bd6',t); coralGalho(c,ox+260,452,150,'#f27ba6',1); coralCerebro(c,ox+360,452,46,'#f2a65a'); esponja(c,ox+440,452,'#f2994a');
    anemona(c,ox+620,452,'#f6c35c',t); coralGalho(c,ox+700,452,120,'#ff8a65',2); leque(c,ox+800,452,96,'#e2557e',t); coralCerebro(c,ox+900,452,38,'#c58bdc'); esponja(c,ox+1080,452,'#e86fa0');
    for(var i=0;i<10;i++){ var bx=ox+hash(i+50)*1150+Math.sin(t*2+i)*4, sp=30+hash(i+3)*30, by=452-((t*sp+hash(i)*450)%450); if(bx<-10||bx>W+10) continue; bolha(c,bx,by,3+hash(i+7)*5,.75); }
  });
}
function chaoRecife(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-16,s.w,s.h+16); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#efd59a','#a8834f'); c.fillRect(s.x,s.y,s.w,s.h);
  c.strokeStyle='rgba(150,110,60,.35)'; c.lineWidth=1.5; for(x=grade(a,40);x<b;x+=40) for(var j=0;j<3;j++){ var yy=s.y+16+j*16+hash(x+j)*6; if(yy>s.y+s.h-6) continue; c.beginPath(); c.moveTo(x+(j%2)*20,yy); c.quadraticCurveTo(x+10+(j%2)*20,yy-4,x+22+(j%2)*20,yy); c.stroke(); }
  for(x=grade(a,22);x<b;x+=22){ var hv=hash(x*.9); c.fillStyle=hv>.5?'rgba(255,245,215,.6)':'rgba(140,100,55,.4)'; circ(c,x+hash(x)*18,s.y+10+hash(x+2)*Math.min(60,s.h-14),1.4+hv); c.fill(); }
  c.fillStyle='#f7e3b0'; c.beginPath(); c.moveTo(s.x,s.y+6); for(x=grade(a,16);x<=b+16;x+=16) c.quadraticCurveTo(x+8,s.y-3,x+16,s.y+1); c.lineTo(b+16,s.y+8); c.lineTo(s.x,s.y+8); c.fill();
  c.fillStyle='rgba(255,255,240,.6)'; c.fillRect(s.x,s.y,s.w,2);
  for(x=grade(a,70);x<b;x+=70){ var hv2=hash(x*1.7), sx=x+hash(x+4)*40; if(hv2>.75) estrelaMar(c,sx,s.y+2); else if(hv2>.5) concha(c,sx,s.y+1); else if(hv2<.15){ c.fillStyle='#3aa168'; for(var k=0;k<3;k++){ c.beginPath(); c.moveTo(sx+k*4,s.y+2); c.quadraticCurveTo(sx+k*4-4,s.y-8,sx+k*4+1,s.y-14-k*2); c.lineTo(sx+k*4+3,s.y+2); c.fill(); } } }
  bordas(c,s,'rgba(80,50,20,.3)'); c.fillStyle='rgba(0,30,50,.18)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function estrelaMar(c,x,y){ c.fillStyle='#f0715a'; c.beginPath(); for(var i=0;i<10;i++){ var a=-PI/2+i*PI/5, r=i%2?3:8; c.lineTo(x+Math.cos(a)*r,y-3+Math.sin(a)*r*.55); } c.closePath(); c.fill(); c.fillStyle='#ffd0b0'; circ(c,x,y-3,1.2); c.fill(); }
function concha(c,x,y){ c.fillStyle='#fbcfe8'; c.beginPath(); c.arc(x,y,6,PI,TAU); c.fill(); c.strokeStyle='#e58cb5'; c.lineWidth=1; for(var k=-2;k<=2;k++) linha(c,x,y,x+k*2.6,y-5.5+Math.abs(k)*.6); }
function platRecife(c,p){
  sombraPlat(c,p,9);
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h+6,'#f69a86','#c4506a'); c.beginPath(); c.moveTo(p.x+6,p.y+p.h); c.quadraticCurveTo(p.x-4,p.y+p.h*.5,p.x+4,p.y+2);
  for(var x=p.x+4;x<p.x+p.w-6;x+=10) c.quadraticCurveTo(x+5,p.y-4-hash(x)*2,x+10,p.y+1);
  c.quadraticCurveTo(p.x+p.w+4,p.y+p.h*.5,p.x+p.w-6,p.y+p.h); for(x=p.x+p.w-6;x>p.x+6;x-=12) c.quadraticCurveTo(x-6,p.y+p.h+6+hash(x)*3,x-12,p.y+p.h); c.closePath(); c.fill();
  c.fillStyle='rgba(255,215,200,.75)'; for(x=p.x+8;x<p.x+p.w-6;x+=9){ circ(c,x,p.y+6+hash(x*.3)*6,1.6); c.fill(); }
  c.fillStyle='rgba(150,40,70,.4)'; for(x=p.x+12;x<p.x+p.w-8;x+=11){ circ(c,x,p.y+13+hash(x)*4,1.5); c.fill(); }
  c.fillStyle='#ffc2b0'; c.fillRect(p.x+6,p.y,p.w-12,2);
  c.strokeStyle='#f27ba6'; c.lineCap='round'; c.lineWidth=3; var ex=p.x+8; linha(c,ex,p.y+2,ex-4,p.y-10); linha(c,ex-4,p.y-10,ex-9,p.y-15); linha(c,ex-4,p.y-10,ex+1,p.y-17); ex=p.x+p.w-8; linha(c,ex,p.y+2,ex+3,p.y-12); linha(c,ex+3,p.y-12,ex+8,p.y-16); c.lineCap='butt';
  c.fillStyle='#ffd0e0'; circ(c,p.x-1,p.y-15,2.2); c.fill(); circ(c,p.x+9,p.y-17,2.2); c.fill(); circ(c,p.x+p.w,p.y-16,2.2); c.fill();
}

/* ============================================================
   NUVENS — céu aberto; o chão e as plataformas são nuvens sólidas
   ============================================================ */
function ceuNuvens(c,t){
  ceuG(c,[[0,'#2f93e0'],[.55,'#8fd0f7'],[1,'#e8f6ff']]);
  sol(c,820,96,34,'#fff7d6','rgba(255,250,220,.4)');
  c.save(); c.globalAlpha=.22; c.lineWidth=9; ['#f87171','#fbbf24','#facc15','#4ade80','#60a5fa','#a78bfa'].forEach(function(k,i){ c.strokeStyle=k; c.beginPath(); c.arc(330,520,330-i*9,PI*1.05,PI*1.75); c.stroke(); }); c.restore();
  c.strokeStyle='rgba(40,70,110,.55)'; c.lineWidth=1.6; for(var i=0;i<4;i++){ var bx=((i*190+t*22)%(W+200))-100, by=120+(i%2)*40+Math.sin(t+i)*6, fl=Math.sin(t*6+i)*3; c.beginPath(); c.moveTo(bx-7,by-fl); c.quadraticCurveTo(bx-3,by-2,bx,by); c.quadraticCurveTo(bx+3,by-2,bx+7,by-fl); c.stroke(); }
}
function balao(c,x,y,s,cores,t){
  c.save(); c.translate(x,y+Math.sin(t*.8+x)*6); c.scale(s,s);
  c.strokeStyle='rgba(90,70,60,.8)'; c.lineWidth=1; linha(c,-14,24,-7,44); linha(c,14,24,7,44);
  c.fillStyle='#a0703f'; rr(c,-9,42,18,12,3); c.fill();
  c.beginPath(); c.moveTo(0,30); c.bezierCurveTo(-46,0,-34,-50,0,-50); c.bezierCurveTo(34,-50,46,0,0,30); c.closePath(); c.save(); c.clip();
  for(var i=0;i<6;i++){ c.fillStyle=cores[i%cores.length]; c.fillRect(-40+i*14,-52,14,90); }
  c.fillStyle='rgba(255,255,255,.25)'; el(c,-12,-24,10,18); c.fill(); c.fillStyle='rgba(0,0,0,.12)'; c.fillRect(14,-52,30,90); c.restore();
  c.restore();
}
function longeNuvens(c,cam,t){
  rep(cam*.5,900,function(ox){ for(var i=0;i<6;i++){ var x=ox+i*150+hash(i)*40; if(x<-200||x>W+200) continue; nuvemF(c,x,412-hash(i+3)*30,2.4+hash(i+1)*1.2,'#ffffff','#d6e4f5',.85); } });
  rep(cam,1100,function(ox){ if(ox+300>-100&&ox+300<W+100) balao(c,ox+300,190,.9,['#f87171','#fde68a'],t); if(ox+860>-100&&ox+860<W+100) balao(c,ox+860,250,.6,['#60a5fa','#ffffff'],t); });
  rep(cam,700,function(ox){ for(var i=0;i<5;i++){ var x=ox+i*145+hash(i+9)*50; if(x<-200||x>W+200) continue; nuvemF(c,x,462-hash(i+2)*24,2+hash(i)*1,'#ffffff','#c7d7f0',1); } });
}
function pertoNuvens(c,cam,t){
  rep(cam,1000,function(ox){ [[80,140,1.3],[420,230,1],[700,120,1.6],[930,300,.9]].forEach(function(n,i){ var x=ox+n[0]+Math.sin(t*.3+i)*20; if(x<-150||x>W+150) return; nuvemF(c,x,n[1],n[2],'#ffffff','#dbe7f7',.75); }); });
  rep(cam*1.2,620,function(ox){ for(var i=0;i<6;i++){ var x=ox+i*110; if(x<-150||x>W+150) continue; nuvemF(c,x,515-hash(i)*12,1.6+hash(i+4)*.6,'#ffffff','#b9cbea',1); } });
}
function puffsLinha(c,a,b,y,r0,passo,seed){ for(var x=grade(a,passo);x<b+passo;x+=passo){ var r=r0+hash(x*.13+seed)*r0*.45; c.moveTo(x+passo/2+r,y); c.arc(x+passo/2,y,r,0,TAU); } }
function chaoNuvens(c,s){
  var f=faixa(c,s,40), a=f[0], b=f[1]; if(b<=a) return;
  var fundo=s.y+s.h<H-8, x0=Math.max(a,s.x+14), x1=Math.min(b,s.x+s.w-14);
  /* camada de sombra (mais baixa e lilás) */
  c.beginPath(); c.rect(s.x+6,s.y+12,s.w-12,s.h-(fundo?18:12)); puffsLinha(c,x0,x1-26,s.y+14,15,26,1);
  if(s.x>=a-30){ c.moveTo(s.x+20+20,s.y+24); c.arc(s.x+20,s.y+24,20,0,TAU); } if(s.x+s.w<=b+30){ c.moveTo(s.x+s.w-20+20,s.y+24); c.arc(s.x+s.w-20,s.y+24,20,0,TAU); }
  if(fundo) puffsLinha(c,x0,x1-26,s.y+s.h-10,14,26,5);
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,160),'#e3ebf9','#aebfe3'); c.fill();
  /* corpo claro + puffs de cima */
  c.beginPath(); c.rect(s.x+8,s.y+6,s.w-16,Math.min(s.h-10,34)); puffsLinha(c,x0,x1-26,s.y+8,13,26,2);
  if(s.x>=a-30){ c.moveTo(s.x+18+16,s.y+14); c.arc(s.x+18,s.y+14,16,0,TAU); } if(s.x+s.w<=b+30){ c.moveTo(s.x+s.w-18+16,s.y+14); c.arc(s.x+s.w-18,s.y+14,16,0,TAU); }
  c.fillStyle=lin(c,0,s.y-6,0,s.y+40,'#ffffff','#e7eefb'); c.fill();
  /* brilho no topo dos puffs */
  c.fillStyle='rgba(255,255,255,.9)'; for(var x=grade(x0,26);x<x1-26;x+=26){ el(c,x+9,s.y-1,6,2.5); c.fill(); }
  if(s.h>60){ c.fillStyle='rgba(150,170,215,.25)'; for(x=grade(a,60);x<b;x+=60){ var py=s.y+60+hash(x)*Math.max(10,s.h-90); if(py<s.y+s.h-20) { el(c,x+hash(x+1)*30,py,26,8); c.fill(); } } }
}
function platNuvens(c,p){
  c.fillStyle='rgba(60,90,150,.16)'; el(c,p.x+p.w/2+3,p.y+p.h+6,p.w*.5,6); c.fill();
  var n=Math.max(2,Math.round(p.w/24)), i, st=p.w/n;
  c.beginPath(); rrPath(c,p.x+2,p.y+8,p.w-4,p.h-2,9); for(i=0;i<n;i++){ var cx=p.x+st*(i+.5), r=st*.62; c.moveTo(cx+r,p.y+p.h+2); c.arc(cx,p.y+p.h+2,r*.8,0,TAU); }
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h+12,'#e6eefa','#b4c6e8'); c.fill();
  c.beginPath(); rrPath(c,p.x,p.y+4,p.w,p.h-6,9); for(i=0;i<n;i++){ cx=p.x+st*(i+.5); r=st*.55+hash(p.x+i)*3; c.moveTo(cx+r,p.y+6); c.arc(cx,p.y+6,r,0,TAU); }
  c.fillStyle=lin(c,0,p.y-8,0,p.y+p.h,'#ffffff','#e9f0fb'); c.fill();
  c.fillStyle='rgba(255,255,255,.95)'; for(i=0;i<n;i++){ el(c,p.x+st*(i+.5)-st*.15,p.y-1,st*.22,2.4); c.fill(); }
}
function rrPath(c,x,y,w,h,r){ r=Math.min(r,w/2,h/2); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
A.CN.rrPath=rrPath; A.CN.puffsLinha=puffsLinha;

/* ---------- embrulho das funções de cena ---------- */
var F={
  vila:{ceu:ceuVila,longe:longeVila,perto:pertoVila,chao:chaoVila,plat:platVila},
  bosque:{ceu:ceuBosque,longe:longeBosque,perto:pertoBosque,chao:chaoBosque,plat:platBosque},
  biblioteca:{ceu:ceuBiblio,longe:longeBiblio,perto:pertoBiblio,chao:chaoBiblio,plat:platBiblio},
  recife:{ceu:ceuRecife,longe:longeRecife,perto:pertoRecife,chao:chaoRecife,plat:platRecife},
  nuvens:{ceu:ceuNuvens,longe:longeNuvens,perto:pertoNuvens,chao:chaoNuvens,plat:platNuvens}
};
A.CN.registra=function(nome,fns){ F[nome]=fns; };
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma;
A.ceu=function(c,cena,t){ var f=F[cena]; if(f){ c.save(); f.ceu(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.longe(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.perto(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.chao=function(c,s,cena){ var f=F[cena]; if(f){ c.save(); f.chao(c,s); c.restore(); return; } chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ var f=F[cena]; if(f){ c.save(); f.plat(c,p); c.restore(); return; } plat0(c,p,cena); };
})();
