/* ============================================================
   HIS3_jogo_arteB2.js — "Detetives do Tempo" (cenários, parte 2):
   rios (Rios Antigos, nado), cidade (Cidade em Construção),
   museu (Museu da Memória, chefão), linha (Trilha da Linha do
   Tempo) e o fundo do submundo sub_arquivo (A.fundoSub).
   Mesmo contrato da parte 1 (HIS3_jogo_arteB.js, A.TB): embrulha
   A.ceu/longe/perto/chao/plataforma e cai na função anterior para
   as cenas que não são daqui. ATENÇÃO: registra A.CENAS.cidade de
   novo (a cidade noturna do LP3 deixa de ser usada neste jogo).
   Tudo por código: sem imagem, sem emoji. Nada pisca.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING||!A.TB) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, sol=N.sol, nuvemF=N.nuvemF, raios=N.raios, linha=N.linha,
    arvoreR=N.arvoreR, flor=N.flor, bolha=N.bolha, bordas=N.bordas, sombraPlat=N.sombraPlat, peixe=N.peixe;
var T=A.TB, txt=T.txt, relogio=T.relogio, morro=T.morro;

A.CENAS.rios  ={ceu:['#7cc8ee','#2f9a92','#0b3d45'], chaoTop:'#d9c89a', chao:'#b8a676', chaoBase:'#6e6444', plat:'#8b8f86', platTop:'#6faa4a', part:'', musica:'agua'};
A.CENAS.cidade={ceu:['#4a3a8a','#e07a7a','#ffd08a'], chaoTop:'#c8c6be', chao:'#55555e', chaoBase:'#2a2a30', plat:'#f2b713', platTop:'#ffd84a', part:'nuvem', musica:'cidade'};
A.CENAS.museu ={ceu:['#141a3a','#232a52','#3a3a6a'], chaoTop:'#b22234', chao:'#dcd8d0', chaoBase:'#8a8478', plat:'#e6e0d4', platTop:'#f6f2ea', part:'', musica:'castelo'};
A.CENAS.linha ={ceu:['#9cc8f0','#d8d0f4','#fde3c4'], chaoTop:'#c8b8a0', chao:'#8a7a6a', chaoBase:'#4a4038', plat:'#2a2a3a', platTop:'#f6cf4a', part:'polen', musica:'montanha'};
A.CENAS.sub_arquivo={ceu:['#1c1712','#2a221a','#3a2e22'], chaoTop:'#78350f', chao:'#57534e', chaoBase:'#1c1917', plat:'#6b4a2a', platTop:'#a16207', part:'polen', musica:'mapa'};

/* ============================================================
   RIOS ANTIGOS — debaixo d'água num grande rio; na margem, lá em
   cima, as pirâmides (Egito), o zigurate (Mesopotâmia) e o pagode
   com a muralha (China)
   ============================================================ */
var SUP=112;
function ceuG2(c,y0,y1,stops){ var g=c.createLinearGradient(0,y0,0,y1); stops.forEach(function(s){ g.addColorStop(s[0],s[1]); }); c.fillStyle=g; c.fillRect(0,y0,W,y1-y0); }
function ceuRios(c,t){
  var g=c.createLinearGradient(0,0,0,SUP); g.addColorStop(0,'#6ec0ec'); g.addColorStop(1,'#f4e3b4'); c.fillStyle=g; c.fillRect(0,0,W,SUP);
  sol(c,820,40,20,'#fff3c4','rgba(255,240,190,.35)');
  ceuG2(c,SUP,H,[[0,'#3fae9e'],[.35,'#24857e'],[.75,'#135a5e'],[1,'#0a3a42']]);
  raios(c,[80,260,450,640,820],SUP,470,80,40,'rgba(220,255,230,A)',.16,t);
}
function piramide(c,x,y,h,cor){ c.fillStyle=cor; c.beginPath(); c.moveTo(x-h,y); c.lineTo(x,y-h); c.lineTo(x+h,y); c.fill(); c.fillStyle='rgba(120,80,30,.35)'; c.beginPath(); c.moveTo(x,y-h); c.lineTo(x+h,y); c.lineTo(x+h*.3,y); c.fill(); c.strokeStyle='rgba(120,80,30,.25)'; c.lineWidth=1; for(var k=1;k<6;k++){ var yy=y-h+h*k/6; linha(c,x-h*k/6,yy,x+h*k/6,yy); } }
function palmeira(c,x,y,h,t){ c.strokeStyle='#8a6a3a'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+4,y-h*.5,x+2,y-h); c.stroke(); c.strokeStyle='#4f8a3a'; c.lineWidth=2.5; for(var k=0;k<6;k++){ var a=-PI+k*PI/5+Math.sin(t*.8+k)*.04; c.beginPath(); c.moveTo(x+2,y-h); c.quadraticCurveTo(x+2+Math.cos(a)*h*.3,y-h-8,x+2+Math.cos(a)*h*.45,y-h+Math.abs(Math.sin(a))*4+6); c.stroke(); } }
function zigurate(c,x,y){ var cores=['#c99a5a','#d6aa6a','#e0b878'], k; for(k=0;k<3;k++){ var w=120-k*34, h=16; c.fillStyle=cores[k]; c.fillRect(x-w/2,y-(k+1)*h,w,h); c.fillStyle='rgba(110,70,30,.3)'; c.fillRect(x+w/2-8,y-(k+1)*h,8,h); }
  c.fillStyle='#b08048'; c.beginPath(); c.moveTo(x-8,y); c.lineTo(x-5,y-48); c.lineTo(x+5,y-48); c.lineTo(x+8,y); c.fill(); c.strokeStyle='rgba(255,240,200,.5)'; c.lineWidth=1; for(k=1;k<10;k++) linha(c,x-7+k*.3,y-k*4.8,x+7-k*.3,y-k*4.8);
  c.fillStyle='#e8c88a'; c.fillRect(x-12,y-58,24,10); }
function pagode(c,x,y){ for(var k=0;k<4;k++){ var w=48-k*10, yy=y-k*16; c.fillStyle='#e8d6b0'; c.fillRect(x-w/2+6,yy-12,w-12,12); c.fillStyle='#b0303a'; c.beginPath(); c.moveTo(x-w/2-6,yy-10); c.quadraticCurveTo(x-w/2,yy-14,x-w/2+4,yy-17); c.lineTo(x+w/2-4,yy-17); c.quadraticCurveTo(x+w/2,yy-14,x+w/2+6,yy-10); c.closePath(); c.fill(); }
  c.strokeStyle='#b0303a'; c.lineWidth=2; linha(c,x,y-66,x,y-78); }
function muralha(c,x0,x1,y){ c.fillStyle='#b8a888'; c.beginPath(); c.moveTo(x0,y); for(var x=x0;x<=x1;x+=6) c.lineTo(x,y-14-Math.sin((x-x0)*.02)*10); c.lineTo(x1,y); c.fill();
  c.fillStyle='#a89878'; for(x=x0;x<=x1;x+=8){ var yy=y-14-Math.sin((x-x0)*.02)*10; c.fillRect(x,yy-4,4,4); }
  [x0+30,x0+(x1-x0)*.55].forEach(function(tx){ var ty=y-14-Math.sin((tx-x0)*.02)*10; c.fillStyle='#c8b898'; c.fillRect(tx-8,ty-12,16,12); c.fillStyle='#a89878'; c.fillRect(tx-9,ty-15,18,3); }); }
function longeRios(c,cam,t){
  var mo=cam*.6, x;
  c.fillStyle='#e2c890'; c.beginPath(); c.moveTo(0,SUP); for(x=0;x<=W;x+=16) c.lineTo(x,SUP-12-Math.sin((x+mo)*.01)*3); c.lineTo(W,SUP); c.fill();
  rep(mo,1500,function(ox){ if(ox>W+80||ox<-1580) return;
    piramide(c,ox+120,SUP-10,46,'#e8c27a'); piramide(c,ox+200,SUP-10,62,'#f0cc84'); piramide(c,ox+270,SUP-10,30,'#e0b870');
    palmeira(c,ox+60,SUP-10,30,t); palmeira(c,ox+330,SUP-10,36,t); palmeira(c,ox+352,SUP-10,26,t);
    zigurate(c,ox+620,SUP-10); palmeira(c,ox+540,SUP-10,28,t); palmeira(c,ox+712,SUP-10,32,t);
    muralha(c,ox+900,ox+1140,SUP-8); pagode(c,ox+1220,SUP-10);
    c.fillStyle='#5f9a4a'; [1160,1180,1290].forEach(function(dx){ circ(c,ox+dx,SUP-16,8); c.fill(); });
  });
  c.fillStyle='rgba(200,245,235,.55)'; c.beginPath(); c.moveTo(0,SUP-3); for(x=0;x<=W;x+=12) c.lineTo(x,SUP-2+Math.sin(x*.04+t*1.6)*2.5); c.lineTo(W,SUP+10); c.lineTo(0,SUP+10); c.fill();
  c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=2; c.beginPath(); for(x=0;x<=W;x+=12){ var yy=SUP-2+Math.sin(x*.04+t*1.6)*2.5; if(x===0) c.moveTo(x,yy); else c.lineTo(x,yy); } c.stroke();
  rep(cam,760,function(ox){ c.fillStyle='rgba(20,90,90,.55)'; [[60,70,26],[300,50,20],[520,90,30]].forEach(function(r){ el(c,ox+r[0],452,r[1],r[2]); c.fill(); });
    for(var i=0;i<7;i++){ var kx=ox+30+i*105+hash(i)*30, h=90+hash(i+4)*90; c.strokeStyle='rgba(30,110,90,.55)'; c.lineWidth=3; c.beginPath(); c.moveTo(kx,452); c.quadraticCurveTo(kx+Math.sin(t*.7+i)*8,452-h*.5,kx+Math.sin(t*.8+i)*12,452-h); c.stroke(); } });
  for(var g=0;g<2;g++){ var gx=((g*520-cam*.5+t*(14+g*6))%(W+400)+W+400)%(W+400)-200, gy=210+g*100+Math.sin(t*.6+g)*12;
    for(var f=0;f<9;f++) peixe(c,gx+hash(f+g*13)*80,gy+hash(f+g*7)*34+Math.sin(t*1.4+f)*3,.85,1,'rgba(10,60,60,.5)'); }
  bruma(c,240,452,'rgba(10,70,70,.35)');
}
function papiro(c,x,y,h,t,seed){
  var sw=Math.sin(t*.9+seed)*6, tx=x+sw, ty=y-h;
  c.strokeStyle='#4f9a3a'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+sw*.2,y-h*.5,tx,ty); c.stroke();
  c.strokeStyle='#7cc050'; c.lineWidth=1.2; for(var k=0;k<13;k++){ var a=-PI*.95+k*PI*.9/12; linha(c,tx,ty,tx+Math.cos(a)*22,ty+Math.sin(a)*18+6); }
  c.fillStyle='#5fae45'; el(c,tx,ty,4,3); c.fill();
}
function taboa(c,x,y,h,t,seed){ var sw=Math.sin(t*.8+seed)*4; c.strokeStyle='#5a8a3a'; c.lineWidth=2.5; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x,y-h*.6,x+sw,y-h); c.stroke(); c.fillStyle='#7a4a24'; rr(c,x+sw-4,y-h+6,8,26,4); c.fill(); c.strokeStyle='#4f7a30'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x-10,y-h*.4,x-16+sw,y-h*.7); c.stroke(); }
function pedras(c,x,y,s){ [[0,26,18,'#7a8a84'],[30,18,13,'#8e9a90'],[-24,14,10,'#6e7c76'],[16,10,8,'#a0aaa0']].forEach(function(p){ var px=x+p[0]*s, rx=p[1]*s, ry=p[2]*s; c.fillStyle=lin(c,0,y-ry*2,0,y,cla(p[3],.2),esc(p[3],.25)); el(c,px,y,rx,ry); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; el(c,px-rx*.3,y-ry*.5,rx*.35,ry*.2); c.fill(); c.fillStyle='rgba(90,150,60,.75)'; el(c,px+3,y-ry+2,rx*.6,3); c.fill(); }); }
function vitoria(c,x,t,seed){ var sw=Math.sin(t*.6+seed)*3; c.strokeStyle='rgba(60,120,60,.8)'; c.lineWidth=2; c.beginPath(); c.moveTo(x+sw,SUP+6); c.quadraticCurveTo(x-12,SUP+170,x+6,452); c.stroke();
  c.fillStyle='rgba(30,90,50,.85)'; el(c,x+sw,SUP+6,30,5); c.fill(); c.fillStyle='rgba(120,190,110,.5)'; el(c,x+sw-6,SUP+5,18,2); c.fill(); }
function tartaruga(c,x,y,t){ c.save(); c.translate(x,y); var b=Math.sin(t*1.3)*.25;
  c.fillStyle='#8fbf6a'; c.save(); c.translate(10,6); c.rotate(.5+b); el(c,0,6,4,9); c.fill(); c.restore(); c.save(); c.translate(-10,6); c.rotate(-.3-b); el(c,0,5,3.5,7); c.fill(); c.restore();
  c.fillStyle='#8fbf6a'; el(c,24,0,8,6); c.fill(); c.fillStyle='#111'; circ(c,27,-1.5,1.4); c.fill(); c.strokeStyle='#3a5a2a'; c.lineWidth=1; c.beginPath(); c.arc(27,1.5,2.5,.2*PI,.8*PI); c.stroke();
  c.fillStyle=lin(c,0,-14,0,8,'#7a9a4a','#4a6a2a'); c.beginPath(); c.ellipse(0,0,20,13,0,PI,TAU); c.lineTo(20,3); c.lineTo(-20,3); c.fill(); c.strokeStyle='rgba(40,60,20,.6)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-8,-12); c.lineTo(-4,-4); c.lineTo(4,-4); c.lineTo(8,-12); c.moveTo(-4,-4); c.lineTo(-12,2); c.moveTo(4,-4); c.lineTo(12,2); c.stroke(); c.restore(); }
function pertoRios(c,cam,t){
  rep(cam,1200,function(ox){ if(ox>W+80||ox<-1300) return;
    vitoria(c,ox+210,t,1); vitoria(c,ox+520,t,2); vitoria(c,ox+900,t,3);
    for(var i=0;i<5;i++) papiro(c,ox+40+i*22,452,170+hash(i)*60,t,i);
    taboa(c,ox+330,452,120,t,1); taboa(c,ox+350,452,150,t,2);
    pedras(c,ox+250,452,1.5); pedras(c,ox+790,452,1.9); pedras(c,ox+1150,452,1.1);
    for(i=0;i<4;i++) papiro(c,ox+600+i*24,452,150+hash(i+9)*60,t,i+5);
    taboa(c,ox+980,452,140,t,3); for(i=0;i<3;i++) papiro(c,ox+1060+i*26,452,190+hash(i+3)*40,t,i+9);
    tartaruga(c,ox+700+Math.sin(t*.25)*60,190+Math.sin(t*.5)*10,t);
    peixe(c,ox+460+Math.sin(t*.5)*40,300+Math.sin(t*.9)*10,1.6,Math.cos(t*.5)>0?1:-1,'#e8a040');
    peixe(c,ox+880+Math.sin(t*.4+2)*50,260+Math.sin(t*.7)*12,1.3,Math.cos(t*.4+2)>0?1:-1,'#7ab0c8');
    for(i=0;i<8;i++){ var bx=ox+hash(i+50)*1200+Math.sin(t*1.4+i)*4, sp=26+hash(i+3)*26, by=452-((t*sp+hash(i)*330)%330); if(bx<-10||bx>W+10) continue; bolha(c,bx,by,3+hash(i+7)*4,.7); }
  });
}
function chaoRios(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-16,s.w,s.h+16); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#cdbb8a','#7a6e4c'); c.fillRect(s.x,s.y,s.w,s.h);
  c.strokeStyle='rgba(110,95,60,.35)'; c.lineWidth=1.5; for(x=grade(a,44);x<b;x+=44) for(var j=0;j<3;j++){ var yy=s.y+18+j*16+hash(x+j)*6; if(yy>s.y+s.h-6) continue; c.beginPath(); c.moveTo(x+(j%2)*22,yy); c.quadraticCurveTo(x+11+(j%2)*22,yy-4,x+24+(j%2)*22,yy); c.stroke(); }
  for(x=grade(a,18);x<b;x+=18){ var hv=hash(x*.9); c.fillStyle=['#8e9a90','#a8a090','#6e7c76','#b8a888'][Math.floor(hv*4)]; el(c,x+hash(x)*14,s.y+10+hash(x+2)*Math.min(50,s.h-14),2+hv*2.5,1.5+hv*1.5); c.fill(); }
  c.fillStyle='#e2d2a2'; c.beginPath(); c.moveTo(s.x,s.y+6); for(x=grade(a,18);x<=b+18;x+=18) c.quadraticCurveTo(x+9,s.y-2,x+18,s.y+1); c.lineTo(b+18,s.y+8); c.lineTo(s.x,s.y+8); c.fill();
  for(x=grade(a,56);x<b;x+=56){ var h2=hash(x*1.7), sx=x+hash(x+4)*30; if(h2>.55){ c.fillStyle='#4f9a4a'; for(var k=0;k<4;k++){ c.beginPath(); c.moveTo(sx+k*3,s.y+2); c.quadraticCurveTo(sx+k*3-5,s.y-8,sx+k*3+1,s.y-12-k*2); c.lineTo(sx+k*3+3,s.y+2); c.fill(); } } else if(h2<.2){ c.fillStyle='#f4ead6'; el(c,sx,s.y,5,3); c.fill(); c.strokeStyle='#c8b090'; c.lineWidth=1; linha(c,sx-3,s.y,sx+3,s.y-1); } }
  bordas(c,s,'rgba(50,40,20,.3)'); c.fillStyle='rgba(0,30,40,.2)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platRios(c,p){
  sombraPlat(c,p,8); var x;
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h+4,'#9aa298','#5e665e'); c.beginPath(); c.moveTo(p.x+8,p.y+p.h); c.quadraticCurveTo(p.x-3,p.y+p.h*.5,p.x+5,p.y+2);
  for(x=p.x+5;x<p.x+p.w-8;x+=14) c.quadraticCurveTo(x+7,p.y-3-hash(x)*2,x+14,p.y+1);
  c.quadraticCurveTo(p.x+p.w+3,p.y+p.h*.5,p.x+p.w-8,p.y+p.h); c.quadraticCurveTo(p.x+p.w/2,p.y+p.h+5,p.x+8,p.y+p.h); c.closePath(); c.fill();
  c.fillStyle='rgba(40,50,45,.3)'; for(x=p.x+12;x<p.x+p.w-10;x+=17){ el(c,x,p.y+10+hash(x)*4,4,2); c.fill(); }
  c.fillStyle='rgba(255,255,255,.2)'; el(c,p.x+p.w*.3,p.y+5,p.w*.18,2); c.fill();
  c.fillStyle=lin(c,0,p.y-3,0,p.y+6,'#8fd060','#4f8f3a'); c.beginPath(); c.moveTo(p.x+5,p.y+5); for(x=p.x+5;x<=p.x+p.w-8;x+=8) c.quadraticCurveTo(x+4,p.y-3-hash(x*.7)*2,x+8,p.y+3); c.lineTo(p.x+p.w-8,p.y+6); c.closePath(); c.fill();
  c.strokeStyle='#5fa042'; c.lineWidth=2; c.lineCap='round'; for(x=p.x+10;x<p.x+p.w-10;x+=13){ if(hash(x*1.3)>.45){ var l=4+hash(x)*10; c.beginPath(); c.moveTo(x,p.y+4); c.quadraticCurveTo(x+2,p.y+4+l*.5,x,p.y+4+l); c.stroke(); } } c.lineCap='butt';
}

/* ============================================================
   CIDADE EM CONSTRUÇÃO — fim de tarde, guindastes e andaimes
   ============================================================ */
function ceuCidade(c,t){
  ceuG(c,[[0,'#4a3a8a'],[.38,'#b8648e'],[.7,'#f5946a'],[1,'#ffd08a']]);
  sol(c,690,350,42,'#ffe2a8','rgba(255,196,140,.32)');
  for(var i=0;i<4;i++){ var x=((i*280+t*4)%(W+300))-150; nuvemF(c,x,80+(i%2)*60,1+(i%2)*.4,'#ffd9cc','#e88a9a',.75); }
}
function guindaste(c,x,y,h,t,seed){
  var top=y-h, jl=230, cj=70, i;
  c.strokeStyle='#f2b713'; c.lineWidth=2; linha(c,x-7,y,x-7,top); linha(c,x+7,y,x+7,top);
  c.lineWidth=1.2; for(var yy=y;yy>top;yy-=14){ linha(c,x-7,yy,x+7,yy-14); linha(c,x-7,yy,x+7,yy); }
  c.lineWidth=2; linha(c,x-cj,top,x+jl,top); linha(c,x-cj,top+10,x+jl,top+10); c.lineWidth=1; for(i=x-cj;i<x+jl;i+=12){ linha(c,i,top+10,i+6,top); linha(c,i+6,top,i+12,top+10); }
  c.lineWidth=1.2; linha(c,x,top-30,x+jl*.9,top); linha(c,x,top-30,x-cj,top); c.fillStyle='#f2b713'; c.beginPath(); c.moveTo(x-6,top); c.lineTo(x,top-32); c.lineTo(x+6,top); c.fill();
  c.fillStyle='#7a7a86'; c.fillRect(x-cj+4,top+10,30,18); c.fillStyle='#3a3a46'; c.fillRect(x-4,top+10,18,16); c.fillStyle='#ffd08a'; c.fillRect(x-1,top+13,12,7);
  var hx=x+jl*.62, a=Math.sin(t*.7+seed)*.05, len=h*.55, ex=hx+Math.sin(a)*len, ey=top+10+Math.cos(a)*len;
  c.strokeStyle='#2a2a34'; c.lineWidth=1.2; linha(c,hx,top+10,ex,ey); c.fillStyle='#2a2a34'; c.fillRect(hx-6,top+8,12,6);
  c.save(); c.translate(ex,ey); c.rotate(a); c.fillStyle='#e05a2a'; c.fillRect(-4,0,8,8); c.strokeStyle='#2a2a34'; c.lineWidth=2; c.beginPath(); c.arc(0,12,4,-PI*.2,PI*1.1); c.stroke();
  c.strokeStyle='rgba(40,40,50,.8)'; c.lineWidth=1; linha(c,0,16,-26,26); linha(c,0,16,26,26); c.fillStyle='#d9a018'; c.fillRect(-34,26,68,7); c.restore();
  c.fillStyle='#ef4444'; circ(c,x+jl,top+4,2.5); c.fill(); brilho(c,x+jl,top+4,8,'rgba(255,90,90,.6)',.6);
}
function esqueleto(c,x,y,w,h,andares,acabado){
  var ah=h/andares, i, j;
  for(i=0;i<andares;i++){ var yy=y-(i+1)*ah, pronto=i<acabado;
    if(pronto){ c.fillStyle=lin(c,0,yy,0,yy+ah,'#c9b8c8','#a898b0'); c.fillRect(x,yy,w,ah); for(j=0;j<Math.floor(w/22);j++){ var lit=hash(x*.1+i*7+j)>.6; c.fillStyle=lit?'#ffd88a':'#5a5a7a'; c.fillRect(x+6+j*22,yy+6,12,ah-12); } }
    else { c.fillStyle='rgba(60,50,80,.55)'; c.fillRect(x,yy,w,ah); c.fillStyle='#9a8aa8'; for(j=0;j<=4;j++) c.fillRect(x+j*(w-6)/4,yy,6,ah); }
    c.fillStyle='#b8a8c0'; c.fillRect(x-3,yy-4,w+6,5); }
  c.strokeStyle='#6a5a7a'; c.lineWidth=1.5; for(j=0;j<=4;j++){ var rx=x+3+j*(w-6)/4; linha(c,rx-2,y-h-4,rx-3,y-h-16); linha(c,rx+2,y-h-4,rx+3,y-h-14); }
}
function hospital(c,x,y){
  var w=180, h=150, i, j;
  c.fillStyle=lin(c,0,y-h,0,y,'#f4f2f6','#cfc8d8'); c.fillRect(x,y-h,w,h); c.fillStyle='#e2dce8'; c.fillRect(x+55,y-h-26,70,26);
  for(j=0;j<5;j++) for(i=0;i<6;i++){ if(j===4&&(i===2||i===3)) continue; c.fillStyle=hash(i*3+j*11)>.45?'#ffe2a0':'#8ab0cc'; c.fillRect(x+12+i*28,y-h+14+j*26,16,14); }
  c.fillStyle='#ffffff'; rr(c,x+70,y-h-62,40,40,6); c.fill(); c.fillStyle='#16a34a'; c.fillRect(x+84,y-h-56,12,28); c.fillRect(x+76,y-h-48,28,12);
  brilho(c,x+90,y-h-42,44,'rgba(120,255,160,.35)',1);
  c.fillStyle='#7aa8c8'; c.fillRect(x+70,y-36,40,36); c.fillStyle='#e2dce8'; c.fillRect(x+60,y-42,60,6);
}
function longeCidade(c,cam,t){
  var mo=cam*.5;
  rep(mo,620,function(ox){ for(var i=0;i<9;i++){ var bx=ox+i*70, bh=90+hash(i*3.3)*120; c.fillStyle='#7a5a96'; c.fillRect(bx,412-bh,58,bh+40); for(var j=0;j<6;j++) if(hash(i*9+j)>.62){ c.fillStyle='rgba(255,220,150,.75)'; c.fillRect(bx+8+(j%3)*16,412-bh+12+Math.floor(j/3)*22,8,10); } } });
  bruma(c,200,420,'rgba(255,190,150,.35)');
  rep(cam,1500,function(ox){ if(ox>W+300||ox<-1800) return;
    hospital(c,ox+260,430); esqueleto(c,ox+560,430,130,200,6,3); guindaste(c,ox+640,430,280,t,1); esqueleto(c,ox+1000,430,110,150,5,5); guindaste(c,ox+1260,430,230,t,2);
  });
  c.fillStyle='#6a4a7a'; c.fillRect(0,428,W,24); bruma(c,380,452,'rgba(255,200,150,.3)');
}
function andaime(c,x,y,w,h,t){
  var col=4, nv=Math.round(h/60), i, j, cw=w/col;
  c.fillStyle=lin(c,0,y-h,0,y,'#b8b0a8','#8a8278'); c.fillRect(x+10,y-h+10,w-20,h-10);
  for(j=0;j<nv;j++){ c.fillStyle='#6e665e'; c.fillRect(x+10,y-h+10+j*60,w-20,8); for(i=0;i<3;i++){ var jx=x+30+i*(w-60)/2.5; if(hash(x+j*5+i)>.5){ c.fillStyle='#3a3a46'; c.fillRect(jx,y-h+24+j*60,30,30); } } }
  c.strokeStyle='#2f6fd6'; c.lineWidth=3; for(i=0;i<=col;i++) linha(c,x+i*cw,y,x+i*cw,y-h-10);
  for(j=0;j<=nv;j++){ var ly=y-j*60; c.strokeStyle='#2f6fd6'; c.lineWidth=2.5; linha(c,x-4,ly,x+w+4,ly); if(j>0){ c.fillStyle=lin(c,0,ly-6,0,ly,'#e0b060','#a87a30'); c.fillRect(x-2,ly-6,w+4,6); } }
  c.strokeStyle='rgba(47,111,214,.8)'; c.lineWidth=1.5; for(j=0;j<nv;j++) for(i=0;i<col;i++){ var y0=y-j*60, y1=y0-60; if((i+j)%2) linha(c,x+i*cw,y0,x+(i+1)*cw,y1); else linha(c,x+i*cw,y1,x+(i+1)*cw,y0); }
  c.fillStyle='rgba(60,170,90,.35)'; c.fillRect(x+w*.5,y-h-6,w*.5+4,h*.55); c.strokeStyle='rgba(30,120,60,.4)'; c.lineWidth=1; for(i=0;i<10;i++) linha(c,x+w*.5+i*(w*.05),y-h-6,x+w*.5+i*(w*.05),y-h-6+h*.55);
}
function cone(c,x,y){ c.fillStyle='#1f2937'; c.fillRect(x-12,y-4,24,4); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(x-9,y-4); c.lineTo(x-2,y-30); c.lineTo(x+2,y-30); c.lineTo(x+9,y-4); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.moveTo(x-6.5,y-13); c.lineTo(x-4.5,y-20); c.lineTo(x+4.5,y-20); c.lineTo(x+6.5,y-13); c.fill(); }
function cavalete(c,x,y){ c.fillStyle='#e2e8f0'; c.fillRect(x-30,y-30,4,30); c.fillRect(x+26,y-30,4,30); c.save(); c.beginPath(); c.rect(x-36,y-40,72,14); c.clip(); c.fillStyle='#fff'; c.fillRect(x-36,y-40,72,14); c.fillStyle='#dc2626'; for(var k=-40;k<40;k+=16){ c.beginPath(); c.moveTo(x+k,y-26); c.lineTo(x+k+8,y-40); c.lineTo(x+k+16,y-40); c.lineTo(x+k+8,y-26); c.fill(); } c.restore(); c.fillStyle='#f59e0b'; circ(c,x-30,y-44,4); c.fill(); }
function tijolos(c,x,y){ c.fillStyle='#8a6a4a'; c.fillRect(x-40,y-8,80,8); for(var r=0;r<4;r++) for(var k=0;k<5-(r>2?1:0);k++){ c.fillStyle=['#c0603a','#b0502e','#cc7048'][(k+r)%3]; c.fillRect(x-38+k*15+(r%2)*7,y-16-r*8,14,7); } }
function betoneira(c,x,y,t){
  c.fillStyle='#3a3a46'; c.fillRect(x-24,y-30,6,30); c.fillRect(x+18,y-30,6,30); c.fillStyle='#1f2937'; circ(c,x-21,y-3,5); c.fill(); circ(c,x+21,y-3,5); c.fill();
  c.save(); c.translate(x,y-50); c.rotate(-.35); c.fillStyle=lin(c,-26,0,26,0,'#f59e0b','#b8740a'); c.beginPath(); c.moveTo(-24,-20); c.lineTo(14,-26); c.lineTo(28,-10); c.lineTo(28,10); c.lineTo(14,26); c.lineTo(-24,20); c.closePath(); c.fill();
  c.save(); c.clip(); c.strokeStyle='rgba(120,70,0,.45)'; c.lineWidth=4; var o=(t*8)%16; for(var k=-50;k<50;k+=16) linha(c,k+o-30,-30,k+o,30); c.restore();
  c.fillStyle='#3a3a46'; el(c,28,0,4,10); c.fill(); c.restore();
}
function poste(c,x,y,t){ c.fillStyle='#3a3a46'; c.fillRect(x-3,y-170,6,170); c.beginPath(); c.moveTo(x,y-170); c.quadraticCurveTo(x+4,y-186,x+30,y-184); c.lineTo(x+30,y-180); c.quadraticCurveTo(x+6,y-182,x+3,y-166); c.fill(); c.fillStyle='#2a2a34'; rr(c,x+18,y-186,26,8,3); c.fill(); brilho(c,x+31,y-176,60,'rgba(255,214,140,.55)',1); c.fillStyle='#fff3c4'; el(c,x+31,y-178,10,3); c.fill(); }
function tapume(c,x,y,w){ c.fillStyle=lin(c,0,y-70,0,y,'#d9c8a0','#b8a47a'); c.fillRect(x,y-70,w,70); c.strokeStyle='rgba(120,100,60,.45)'; c.lineWidth=1.5; for(var k=x+60;k<x+w;k+=60) linha(c,k,y-70,k,y); c.fillStyle='#2f6fd6'; c.fillRect(x,y-74,w,6);
  c.fillStyle='#ffd84a'; rr(c,x+w/2-50,y-58,100,34,5); c.fill(); c.strokeStyle='#1f2937'; c.lineWidth=2.5; rr(c,x+w/2-46,y-54,92,26,4); c.stroke(); txt(c,'OBRA',x+w/2+10,y-40,15,'#1f2937');
  c.fillStyle='#f59e0b'; c.beginPath(); c.arc(x+w/2-24,y-38,9,PI,TAU); c.fill(); c.fillRect(x+w/2-35,y-39,22,3); }
function pertoCidade(c,cam,t){
  rep(cam,1300,function(ox){ if(ox>W+120||ox<-1450) return;
    andaime(c,ox+40,452,300,250,t); poste(c,ox+380,452,t); tapume(c,ox+430,452,250);
    cone(c,ox+700,452); cone(c,ox+740,452); cavalete(c,ox+800,452); tijolos(c,ox+900,452); betoneira(c,ox+1010,452,t);
    andaime(c,ox+1080,452,200,190,t); cone(c,ox+1060,452);
  });
}
function chaoCidade(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-4,s.w,s.h+4); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#5a5a64','#2a2a32'); c.fillRect(s.x,s.y,s.w,s.h);
  for(x=grade(a,10);x<b;x+=10) for(var j=0;j<6;j++){ var py=s.y+24+j*12+hash(x+j)*8; if(py>s.y+s.h-6) continue; c.fillStyle=hash(x*.7+j)>.5?'rgba(255,255,255,.1)':'rgba(0,0,0,.2)'; c.fillRect(x+hash(x*1.3+j)*8,py,2,2); }
  if(s.h>=50){ c.fillStyle='#f2b713'; for(x=grade(a,80);x<b;x+=80) c.fillRect(x+10,s.y+42,40,4); }
  c.fillStyle=lin(c,0,s.y,0,s.y+16,'#dedcd4','#aaa8a0'); c.fillRect(s.x,s.y,s.w,16);
  c.fillStyle='rgba(80,80,90,.5)'; for(x=grade(a,64);x<b;x+=64) c.fillRect(x,s.y+1,1.5,15);
  c.fillStyle='rgba(255,255,255,.55)'; c.fillRect(s.x,s.y,s.w,2); c.fillStyle='#55555e'; c.fillRect(s.x,s.y+16,s.w,3);
  for(x=grade(a,64);x<b;x+=64){ if(hash(x*.31)>.8){ c.fillStyle='rgba(60,60,70,.3)'; c.beginPath(); c.moveTo(x+20,s.y+4); c.lineTo(x+28,s.y+9); c.lineTo(x+24,s.y+14); c.lineTo(x+30,s.y+16); c.lineTo(x+22,s.y+16); c.closePath(); c.fill(); } }
  bordas(c,s,'rgba(0,0,0,.35)'); c.restore();
}
function platCidade(c,p){
  sombraPlat(c,p,2); var x;
  if(hash(p.x*.17+p.y*.05)>.4){ /* viga de aço amarela em I */
    c.fillStyle='#b8860b'; c.fillRect(p.x+2,p.y+5,p.w-4,p.h-10);
    c.fillStyle=lin(c,0,p.y+5,0,p.y+p.h-5,'#e8a80c','#c48a08'); c.fillRect(p.x+4,p.y+6,p.w-8,p.h-12);
    c.fillStyle='#5a4206'; for(x=p.x+16;x<p.x+p.w-12;x+=24){ circ(c,x,p.y+p.h/2,2.6); c.fill(); }
    c.fillStyle=lin(c,0,p.y,0,p.y+5,'#ffd84a','#f2b713'); c.fillRect(p.x,p.y,p.w,5); c.fillStyle=lin(c,0,p.y+p.h-5,0,p.y+p.h,'#f2b713','#a87a08'); c.fillRect(p.x,p.y+p.h-5,p.w,5);
    c.fillStyle='rgba(255,255,255,.55)'; c.fillRect(p.x+1,p.y+.5,p.w-2,1.3);
    c.fillStyle='#7a5a06'; for(x=p.x+8;x<p.x+p.w-4;x+=12){ circ(c,x,p.y+2.5,1); c.fill(); circ(c,x,p.y+p.h-2.5,1); c.fill(); }
    [p.x,p.x+p.w-12].forEach(function(ex){ c.save(); c.beginPath(); c.rect(ex,p.y,12,p.h); c.clip(); c.fillStyle='#1f2937'; for(var k=-20;k<20;k+=8){ c.beginPath(); c.moveTo(ex+k,p.y+p.h); c.lineTo(ex+k+4,p.y+p.h); c.lineTo(ex+k+4+p.h,p.y); c.lineTo(ex+k+p.h,p.y); c.fill(); } c.restore(); });
  } else { /* tábua do andaime sobre tubos */
    c.strokeStyle='#2f6fd6'; c.lineWidth=3; linha(c,p.x+8,p.y+8,p.x+8,p.y+p.h+14); linha(c,p.x+p.w-8,p.y+8,p.x+p.w-8,p.y+p.h+14); linha(c,p.x-4,p.y+p.h-2,p.x+p.w+4,p.y+p.h-2);
    c.fillStyle='#9aa3b5'; circ(c,p.x+8,p.y+p.h-2,3); c.fill(); circ(c,p.x+p.w-8,p.y+p.h-2,3); c.fill();
    c.fillStyle=lin(c,0,p.y,0,p.y+11,'#e8b868','#b07a34'); rr(c,p.x,p.y,p.w,11,2); c.fill();
    c.strokeStyle='rgba(110,70,20,.45)'; c.lineWidth=1; for(x=p.x+8;x<p.x+p.w-20;x+=30) linha(c,x,p.y+4+hash(x)*3,x+16+hash(x)*8,p.y+4+hash(x)*3);
    c.fillStyle='rgba(255,240,200,.55)'; c.fillRect(p.x+2,p.y+1,p.w-4,1.3);
  }
}

/* ============================================================
   MUSEU DA MEMÓRIA — salão à noite (chefão)
   ============================================================ */
function ceuMuseu(c,t){ ceuG(c,[[0,'#121838'],[.5,'#1e2650'],[1,'#2e2e60']]); brilho(c,W*.6,200,520,'rgba(140,170,255,.10)',1); }
function coluna(c,x,y0,y1,w,cor){
  c.fillStyle=lin(c,x-w/2,0,x+w/2,0,cla(cor,.15),esc(cor,.3)); c.fillRect(x-w/2,y0+18,w,y1-y0-30);
  c.strokeStyle='rgba(40,40,80,.35)'; c.lineWidth=1.5; for(var k=1;k<5;k++) linha(c,x-w/2+k*w/5,y0+22,x-w/2+k*w/5,y1-16);
  c.fillStyle=cla(cor,.1); c.fillRect(x-w/2-8,y0,w+16,10); c.fillRect(x-w/2-4,y0+10,w+8,8); c.fillRect(x-w/2-6,y1-14,w+12,8); c.fillRect(x-w/2-10,y1-6,w+20,6);
  c.strokeStyle=esc(cor,.3); c.lineWidth=2; c.beginPath(); c.arc(x-w/2-2,y0+14,5,PI*.5,PI*2.2); c.stroke(); c.beginPath(); c.arc(x+w/2+2,y0+14,5,PI*.8,PI*2.5); c.stroke();
}
function quadro(c,x,y,w,h,k){
  brilho(c,x,y-h/2-10,w*.9,'rgba(255,220,150,.22)',1); c.fillStyle='#3a3020'; rr(c,x-12,y-h/2-26,24,6,3); c.fill();
  c.fillStyle='rgba(0,0,0,.35)'; c.fillRect(x-w/2-6,y-h/2-4,w+16,h+16);
  c.fillStyle=lin(c,0,y-h/2,0,y+h/2,'#e8c25a','#9a7420'); c.fillRect(x-w/2-9,y-h/2-9,w+18,h+18); c.strokeStyle='#fff0b0'; c.lineWidth=1; c.strokeRect(x-w/2-5,y-h/2-5,w+10,h+10);
  c.save(); c.beginPath(); c.rect(x-w/2,y-h/2,w,h); c.clip(); var x0=x-w/2, y0=y-h/2;
  if(k===0){ c.fillStyle=lin(c,0,y0,0,y0+h,'#7ab8e0','#f4d8a0'); c.fillRect(x0,y0,w,h); c.fillStyle='#f6cf4a'; circ(c,x0+w*.75,y0+h*.3,8); c.fill(); c.fillStyle='#5f9a4a'; c.beginPath(); c.moveTo(x0,y0+h); c.quadraticCurveTo(x0+w*.3,y0+h*.45,x0+w*.6,y0+h*.75); c.quadraticCurveTo(x0+w*.8,y0+h*.6,x0+w,y0+h*.7); c.lineTo(x0+w,y0+h); c.fill(); }
  else if(k===1){ c.fillStyle='#e8d8b0'; c.fillRect(x0,y0,w,h); c.fillStyle='#7aa0b8'; c.fillRect(x0,y0,w,h); c.fillStyle='#d8c08a'; c.beginPath(); c.moveTo(x0+w*.1,y0+h*.2); c.quadraticCurveTo(x0+w*.4,y0+h*.05,x0+w*.5,y0+h*.4); c.quadraticCurveTo(x0+w*.35,y0+h*.8,x0+w*.15,y0+h*.7); c.closePath(); c.fill(); c.beginPath(); c.moveTo(x0+w*.6,y0+h*.3); c.quadraticCurveTo(x0+w*.9,y0+h*.2,x0+w*.85,y0+h*.6); c.quadraticCurveTo(x0+w*.7,y0+h*.9,x0+w*.62,y0+h*.6); c.fill(); c.strokeStyle='#c0392b'; c.lineWidth=1.5; c.setLineDash([3,3]); c.beginPath(); c.moveTo(x0+w*.3,y0+h*.45); c.quadraticCurveTo(x0+w*.55,y0+h*.6,x0+w*.72,y0+h*.45); c.stroke(); c.setLineDash([]); }
  else if(k===2){ c.fillStyle=lin(c,0,y0,0,y0+h,'#6a4a3a','#3a2a20'); c.fillRect(x0,y0,w,h); c.fillStyle='#e0b890'; circ(c,x,y0+h*.4,w*.16); c.fill(); c.fillStyle='#2a1a10'; c.beginPath(); c.arc(x,y0+h*.37,w*.17,PI,TAU); c.fill(); c.fillStyle='#8a2a3a'; el(c,x,y0+h*.95,w*.32,h*.32); c.fill(); }
  else { c.fillStyle=lin(c,0,y0,0,y0+h,'#f4e2c0','#d8c098'); c.fillRect(x0,y0,w,h); c.fillStyle='#8a6a4a'; for(var i=0;i<3;i++){ c.fillRect(x0+w*.15+i*w*.25,y0+h*.5,w*.18,h*.32); c.beginPath(); c.moveTo(x0+w*.12+i*w*.25,y0+h*.5); c.lineTo(x0+w*.24+i*w*.25,y0+h*.32); c.lineTo(x0+w*.36+i*w*.25,y0+h*.5); c.fill(); } }
  c.restore();
  c.fillStyle='#e8e0cc'; c.fillRect(x-14,y+h/2+16,28,8);
}
function janelaLua(c,x,t){
  c.fillStyle='#2a2a50'; c.beginPath(); c.moveTo(x-70,360); c.lineTo(x-70,150); c.arc(x,150,70,PI,TAU); c.lineTo(x+70,360); c.fill();
  c.save(); c.beginPath(); c.moveTo(x-60,352); c.lineTo(x-60,150); c.arc(x,150,60,PI,TAU); c.lineTo(x+60,352); c.closePath(); c.clip();
  c.fillStyle=lin(c,0,90,0,352,'#1a2860','#3a4a8a'); c.fillRect(x-60,80,120,280);
  c.fillStyle='#fff'; for(var i=0;i<14;i++){ c.globalAlpha=.4+.4*Math.abs(Math.sin(t*.5+i)); circ(c,x-58+hash(i+3)*116,100+hash(i+8)*220,hash(i)*1.1+.5); c.fill(); } c.globalAlpha=1;
  brilho(c,x+18,140,56,'rgba(230,240,255,.5)',1); c.fillStyle='#f4f6ff'; circ(c,x+18,140,20); c.fill(); c.fillStyle='rgba(180,190,220,.5)'; circ(c,x+12,134,4); c.fill(); circ(c,x+25,146,3); c.fill();
  c.restore(); c.strokeStyle='#2a2a50'; c.lineWidth=5; linha(c,x,82,x,352); linha(c,x-60,230,x+60,230); c.fillStyle='#4a4a7a'; c.fillRect(x-80,352,160,12);
}
function longeMuseu(c,cam,t){
  c.fillStyle='#2a3264'; c.fillRect(0,0,W,40); c.fillStyle='#3e4a84'; c.fillRect(0,40,W,10); c.fillStyle='#232a58'; c.fillRect(0,50,W,6);
  rep(cam,40,function(ox){ c.fillStyle='#3e4a84'; c.fillRect(ox+10,56,20,8); });
  rep(cam,1200,function(ox){ if(ox>W+200||ox<-1400) return;
    janelaLua(c,ox+600,t);
    var g=c.createLinearGradient(ox+600,150,ox+800,452); g.addColorStop(0,'rgba(190,210,255,.22)'); g.addColorStop(1,'rgba(190,210,255,0)'); c.fillStyle=g; c.beginPath(); c.moveTo(ox+550,170); c.lineTo(ox+650,170); c.lineTo(ox+900,452); c.lineTo(ox+700,452); c.closePath(); c.fill();
    [ox+120,ox+420,ox+780,ox+1080].forEach(function(cx){ coluna(c,cx,64,420,36,'#8a90c0'); });
    quadro(c,ox+270,190,90,70,0); quadro(c,ox+270,300,50,60,2); quadro(c,ox+930,200,110,76,1); quadro(c,ox+930,310,70,50,3); quadro(c,ox+1180,230,60,80,2);
  });
  c.fillStyle=lin(c,0,410,0,452,'#2a2a58','#1a1a40'); c.fillRect(0,410,W,42); c.fillStyle='#4a4a80'; c.fillRect(0,408,W,4);
}
function vitrine(c,x,y,k,t){
  c.fillStyle='rgba(0,0,0,.3)'; el(c,x,y,52,6); c.fill();
  c.fillStyle=lin(c,0,y-60,0,y,'#5a3a2a','#3a2418'); c.fillRect(x-44,y-60,88,60); c.fillStyle='#c99a3a'; c.fillRect(x-48,y-64,96,6); c.fillRect(x-46,y-6,92,6);
  c.fillStyle='#e8e0cc'; c.fillRect(x-14,y-38,28,10);
  var gy=y-64; c.save(); c.beginPath(); c.rect(x-42,gy-80,84,80); c.clip(); c.fillStyle='rgba(170,200,240,.14)'; c.fillRect(x-42,gy-80,84,80);
  if(k===0){ c.fillStyle='#f4ead6'; c.fillRect(x-24,gy-34,48,30); c.strokeStyle='#c8b090'; c.lineWidth=1.5; c.beginPath(); c.moveTo(x-24,gy-34); c.lineTo(x,gy-16); c.lineTo(x+24,gy-34); c.stroke(); c.fillStyle='#c0392b'; c.fillRect(x+12,gy-32,8,9); c.fillStyle='#b03030'; circ(c,x,gy-16,4); c.fill(); }
  else if(k===1){ c.fillStyle='#c0392b'; c.fillRect(x-24,gy-26,26,14); c.fillStyle='#2c6fb5'; c.fillRect(x+4,gy-22,20,10); c.fillStyle='#f6cf4a'; c.fillRect(x-18,gy-36,10,10); c.fillStyle='#2a2a2a'; [x-18,x-4,x+9,x+20].forEach(function(wx){ circ(c,wx,gy-10,4.5); c.fill(); }); c.fillStyle='#555'; c.fillRect(x-2,gy-18,8,3); }
  else if(k===2){ c.fillStyle='#2a2a2a'; rr(c,x-22,gy-36,44,28,4); c.fill(); c.fillStyle='#8a8a8a'; c.fillRect(x-22,gy-30,44,4); c.fillStyle='#5a5a5a'; circ(c,x,gy-20,10); c.fill(); c.fillStyle='#9ab8d8'; circ(c,x,gy-20,6); c.fill(); c.fillStyle='rgba(255,255,255,.6)'; circ(c,x-2,gy-22,2); c.fill(); c.fillStyle='#c0c0c0'; c.fillRect(x+10,gy-42,8,6); }
  else { c.fillStyle=lin(c,x-18,0,x+18,0,'#d9884a','#9a4a22'); c.beginPath(); c.moveTo(x-6,gy-58); c.lineTo(x+6,gy-58); c.quadraticCurveTo(x+4,gy-48,x+16,gy-34); c.quadraticCurveTo(x+18,gy-14,x+6,gy-6); c.lineTo(x-6,gy-6); c.quadraticCurveTo(x-18,gy-14,x-16,gy-34); c.quadraticCurveTo(x-4,gy-48,x-6,gy-58); c.fill(); c.strokeStyle='#3a1a0a'; c.lineWidth=2; linha(c,x-15,gy-30,x+15,gy-30); c.lineWidth=1; c.beginPath(); for(var u=-14;u<=14;u+=4){ c.lineTo(x+u,gy-24+(u%8?3:-1)); } c.stroke(); }
  c.fillStyle='rgba(255,255,255,.22)'; c.beginPath(); c.moveTo(x-42,gy-30); c.lineTo(x-12,gy-80); c.lineTo(x+2,gy-80); c.lineTo(x-42,gy-6); c.fill();
  c.restore(); c.strokeStyle='rgba(220,235,255,.6)'; c.lineWidth=1.5; c.strokeRect(x-42,gy-80,84,80); c.fillStyle='#c99a3a'; c.fillRect(x-44,gy-84,88,5);
}
function busto(c,x,y){
  c.fillStyle='rgba(0,0,0,.3)'; el(c,x,y,40,6); c.fill();
  c.fillStyle=lin(c,x-26,0,x+26,0,'#e8e4dc','#a8a49c'); c.fillRect(x-24,y-110,48,104); c.fillRect(x-32,y-10,64,10); c.fillRect(x-30,y-118,60,10);
  c.fillStyle='#c99a3a'; c.fillRect(x-24,y-70,48,4);
  c.fillStyle=lin(c,x-30,0,x+30,0,'#f4f2ee','#b8b4ac'); c.beginPath(); c.moveTo(x-34,y-118); c.quadraticCurveTo(x-30,y-150,x-12,y-156); c.lineTo(x+12,y-156); c.quadraticCurveTo(x+30,y-150,x+34,y-118); c.fill();
  c.fillRect(x-8,y-170,16,18); circ(c,x,y-182,18); c.fill(); c.fillStyle='#d8d4cc'; c.beginPath(); c.arc(x,y-186,19,PI*1.05,TAU*.98); c.fill();
  c.fillStyle='rgba(90,90,100,.5)'; c.beginPath(); c.arc(x-6,y-182,2.5,0,PI); c.fill(); c.beginPath(); c.arc(x+6,y-182,2.5,0,PI); c.fill(); c.strokeStyle='rgba(90,90,100,.5)'; c.lineWidth=1.2; c.beginPath(); c.arc(x,y-174,4,.2*PI,.8*PI); c.stroke();
  c.fillStyle='#6a9a5a'; for(var k=0;k<6;k++){ el(c,x-17+k*2,y-196+k*3.5,4,2); c.fill(); el(c,x+17-k*2,y-196+k*3.5,4,2); c.fill(); }
}
function cordao(c,x0,x1,y){ [x0,x1].forEach(function(px){ c.fillStyle='#c99a3a'; c.fillRect(px-2,y-46,4,46); el(c,px,y-2,10,3); c.fill(); circ(c,px,y-48,5); c.fill(); });
  c.strokeStyle='#a01a2a'; c.lineWidth=4; c.beginPath(); c.moveTo(x0+4,y-42); c.quadraticCurveTo((x0+x1)/2,y-18,x1-4,y-42); c.stroke(); c.strokeStyle='rgba(255,120,130,.4)'; c.lineWidth=1.2; c.stroke(); }
function pertoMuseu(c,cam,t){
  rep(cam,1250,function(ox){ if(ox>W+120||ox<-1370) return;
    vitrine(c,ox+120,452,0,t); cordao(c,ox+200,ox+330,452); busto(c,ox+400,452); vitrine(c,ox+560,452,1,t); vitrine(c,ox+760,452,2,t); cordao(c,ox+830,ox+960,452); vitrine(c,ox+1060,452,3,t);
  });
}
function chaoMuseu(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-4,s.w,s.h+4); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#e4e0d8','#9a948a'); c.fillRect(s.x,s.y,s.w,s.h);
  c.strokeStyle='rgba(120,120,140,.35)'; c.lineWidth=1.2; for(x=grade(a,90);x<b;x+=90){ var hv=hash(x*.3); c.beginPath(); c.moveTo(x+10,s.y+16); c.bezierCurveTo(x+30,s.y+30+hv*20,x+50,s.y+20,x+80,s.y+50+hv*20); c.stroke(); c.beginPath(); c.moveTo(x+40,s.y+34); c.quadraticCurveTo(x+52,s.y+50,x+46,s.y+70); c.stroke(); }
  c.fillStyle='rgba(90,90,110,.35)'; for(x=grade(a,90);x<b;x+=90) c.fillRect(x,s.y+12,1.5,s.h); for(var yy=s.y+56;yy<s.y+s.h;yy+=44) c.fillRect(s.x,yy,s.w,1.5);
  c.fillStyle='#b22234'; c.fillRect(s.x,s.y,s.w,10); c.fillStyle='#e0b04a'; c.fillRect(s.x,s.y+10,s.w,2.5); c.fillStyle='rgba(255,160,160,.35)'; c.fillRect(s.x,s.y,s.w,2);
  c.fillStyle='rgba(120,10,30,.5)'; for(x=grade(a,12);x<b;x+=12) c.fillRect(x,s.y+12.5,1.5,3);
  bordas(c,s,'rgba(20,20,50,.35)'); c.fillStyle='rgba(0,0,30,.2)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platMuseu(c,p){
  sombraPlat(c,p,3);
  c.fillStyle=lin(c,0,p.y+5,0,p.y+p.h,'#d8d4cc','#9a948a'); c.fillRect(p.x+5,p.y+5,p.w-10,p.h-5);
  c.strokeStyle='rgba(120,120,140,.35)'; c.lineWidth=1; for(var x=p.x+14;x<p.x+p.w-20;x+=46) { c.beginPath(); c.moveTo(x,p.y+8); c.quadraticCurveTo(x+12,p.y+14,x+24,p.y+p.h-2); c.stroke(); }
  c.fillStyle='#c99a3a'; c.fillRect(p.x+5,p.y+p.h-6,p.w-10,3);
  c.fillStyle=lin(c,0,p.y,0,p.y+6,'#fbf8f2','#cfcac0'); rr(c,p.x,p.y,p.w,6,2); c.fill(); c.fillStyle='rgba(255,255,255,.8)'; c.fillRect(p.x+2,p.y+.5,p.w-4,1.3);
  c.fillStyle='#e0b04a'; c.fillRect(p.x,p.y+5,p.w,1.5);
}

/* ============================================================
   TRILHA DA LINHA DO TEMPO — da caverna à cidade moderna
   ============================================================ */
var EPOCA=['#b08a5a','#7cb04a','#d8b878','#8a9ab8'];
function corEpoca(x){ var u=((x/1500)%4+4)%4, i=Math.floor(u), k=u-i; k=k<.75?0:(k-.75)/.25; return mix(EPOCA[i],EPOCA[(i+1)%4],k); }
function ceuLinha(c,t){
  ceuG(c,[[0,'#8cbcf0'],[.5,'#d4ccf2'],[1,'#fde3c4']]);
  for(var i=0;i<4;i++){ var x=((i*260+t*3)%(W+300))-150; nuvemF(c,x,90+(i%2)*50,.8+(i%2)*.3,'#ffffff','#e2dcf4',.8); }
}
function caverna(c,x,y,t){
  c.fillStyle=lin(c,0,y-170,0,y,'#9a7a5a','#6a5038'); c.beginPath(); c.moveTo(x-140,y); c.quadraticCurveTo(x-130,y-150,x-40,y-170); c.quadraticCurveTo(x+60,y-190,x+130,y-110); c.quadraticCurveTo(x+160,y-50,x+150,y); c.fill();
  c.fillStyle='#2a1a10'; c.beginPath(); c.moveTo(x-70,y); c.quadraticCurveTo(x-70,y-100,x,y-104); c.quadraticCurveTo(x+66,y-100,x+70,y); c.fill();
  c.fillStyle='#b8302a'; c.save(); c.translate(x-100,y-90); c.fillRect(-1,-6,2,12); [[-1,-1],[1,-1],[0,1]].forEach(function(d){ el(c,d[0]*5,d[1]*6-4,2,4); c.fill(); }); el(c,0,2,5,5); c.fill(); c.restore();
  c.fillStyle='#8a2a1a'; c.beginPath(); el(c,x+96,y-110,14,6); c.fill(); c.fillRect(x+86,y-106,2,8); c.fillRect(x+104,y-106,2,8); circ(c,x+110,y-114,4); c.fill();
  c.fillStyle='#5a3a24'; c.fillRect(x-20,y-6,40,6); c.save(); c.translate(x,y-6); c.rotate(.4); c.fillRect(-18,-3,36,5); c.rotate(-.8); c.fillRect(-18,-3,36,5); c.restore();
  var fl=Math.sin(t*4)*.12; brilho(c,x,y-20,70,'rgba(255,170,80,.5)',.8);
  [['#f97316',22,30],['#fbbf24',14,20],['#fff3c4',7,10]].forEach(function(f,i){ c.fillStyle=f[0]; c.beginPath(); c.moveTo(x-f[1]/1.4,y-6); c.quadraticCurveTo(x-f[1],y-6-f[2]*.6,x+Math.sin(t*3+i)*3,y-6-f[2]*(1+fl)); c.quadraticCurveTo(x+f[1],y-6-f[2]*.6,x+f[1]/1.4,y-6); c.fill(); });
}
function oca(c,x,y){ c.fillStyle='#8a5a34'; c.fillRect(x-36,y-34,72,34); c.fillStyle=lin(c,0,y-80,0,y-30,'#e8c870','#b8903a'); c.beginPath(); c.moveTo(x-50,y-30); c.lineTo(x,y-82); c.lineTo(x+50,y-30); c.fill(); c.strokeStyle='rgba(120,80,20,.5)'; c.lineWidth=1; for(var k=-4;k<=4;k++) linha(c,x,y-80,x+k*11,y-31); c.fillStyle='#3a2414'; c.fillRect(x-10,y-26,20,26); }
function trigo(c,x,y,t,seed){ var sw=Math.sin(t*.9+seed)*3; c.strokeStyle='#c8a040'; c.lineWidth=1.5; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x,y-30,x+sw,y-52); c.stroke(); c.fillStyle='#e8c25a'; for(var k=0;k<5;k++){ el(c,x+sw-2,y-52+k*4,2,3); c.fill(); el(c,x+sw+2,y-50+k*4,2,3); c.fill(); } }
function templo(c,x,y){ c.fillStyle='#d8c8a0'; c.fillRect(x-90,y-14,180,14); c.fillRect(x-80,y-22,160,8); for(var k=0;k<6;k++){ c.fillStyle=lin(c,x-80+k*31,0,x-70+k*31,0,'#f2e6c8','#c8b890'); c.fillRect(x-76+k*30,y-102,16,80); }
  c.fillStyle='#e8dcbc'; c.fillRect(x-86,y-114,172,12); c.beginPath(); c.moveTo(x-92,y-114); c.lineTo(x,y-152); c.lineTo(x+92,y-114); c.fill(); c.fillStyle='#c8b890'; c.beginPath(); c.moveTo(x-70,y-118); c.lineTo(x,y-146); c.lineTo(x+70,y-118); c.fill(); }
function predioMod(c,x,y,w,h,cor){ c.fillStyle=lin(c,0,y-h,0,y,cla(cor,.2),cor); c.fillRect(x,y-h,w,h); for(var j=0;j<Math.floor(h/24)-1;j++) for(var i=0;i<Math.floor(w/18);i++){ c.fillStyle=hash(x+i*7+j*3)>.4?'#d8f0ff':'#7fb3d9'; c.fillRect(x+5+i*18,y-h+10+j*24,11,14); } }
function semaforo(c,x,y){ c.fillStyle='#3a3a46'; c.fillRect(x-2,y-110,4,110); rr(c,x-9,y-150,18,44,4); c.fill(); ['#ef4444','#f59e0b','#22c55e'].forEach(function(k,i){ c.fillStyle=i===2?k:esc(k,.5); circ(c,x,y-140+i*13,4.5); c.fill(); }); brilho(c,x,y-114,16,'rgba(34,197,94,.5)',1); }
function marco(c,x,y,t){ c.fillStyle=lin(c,x-8,0,x+8,0,'#e2d6c0','#a89a80'); c.fillRect(x-7,y-120,14,120); c.fillStyle='#8a7a60'; c.fillRect(x-12,y-6,24,6); relogio(c,x,y-138,20,t,'#c99a3a'); }
function longeLinha(c,cam,t){
  rep(cam*2.2,1100,function(ox){ [[150,150,58],[520,90,40],[860,190,70]].forEach(function(r,i){ var rx=ox+r[0]; if(rx<-100||rx>W+100) return; c.save(); c.globalAlpha=.55; relogio(c,rx,r[1],r[2],t*(1+i*.3)+i*7,'#d8b060','#f6f0ff'); c.restore(); }); });
  rep(cam,1600,function(ox){ if(ox>W+60||ox<-1660) return;
    c.fillStyle='#b8a090'; c.beginPath(); c.moveTo(ox,420); c.quadraticCurveTo(ox+120,300,ox+220,340); c.quadraticCurveTo(ox+320,290,ox+400,420); c.fill();
    c.fillStyle='#a8c890'; c.beginPath(); c.moveTo(ox+380,420); c.quadraticCurveTo(ox+600,370,ox+820,420); c.fill(); for(var k=0;k<3;k++){ c.fillStyle='#c8b080'; c.beginPath(); c.moveTo(ox+500+k*90,406); c.lineTo(ox+520+k*90,384); c.lineTo(ox+540+k*90,406); c.fill(); }
    c.fillStyle='#d8c8a8'; c.fillRect(ox+840,370,300,50); for(k=0;k<10;k++) c.fillRect(ox+840+k*30,362,16,10); c.beginPath(); c.moveTo(ox+940,370); c.lineTo(ox+990,330); c.lineTo(ox+1040,370); c.fill();
    c.fillStyle='#a8b4d0'; [[1200,60],[1250,110],[1320,80],[1380,140],[1450,90],[1510,70]].forEach(function(b){ c.fillRect(ox+b[0],420-b[1],44,b[1]); });
  });
  bruma(c,300,450,'rgba(253,227,196,.5)');
}
function pertoLinha(c,cam,t){
  rep(cam,2800,function(ox){ if(ox>W+200||ox<-3000) return;
    caverna(c,ox+260,452,t); marco(c,ox+640,452,t);
    for(var i=0;i<9;i++) trigo(c,ox+760+i*16,452,t,i); oca(c,ox+1000,452); for(i=0;i<7;i++) trigo(c,ox+1080+i*16,452,t,i+3); marco(c,ox+1340,452,t);
    templo(c,ox+1620,452); c.fillStyle='#c8b890'; c.beginPath(); c.moveTo(ox+1800,452); c.lineTo(ox+1808,320); c.lineTo(ox+1816,310); c.lineTo(ox+1824,320); c.lineTo(ox+1832,452); c.fill(); marco(c,ox+2040,452,t);
    predioMod(c,ox+2120,452,90,230,'#5a7ab0'); predioMod(c,ox+2220,452,70,160,'#b06a5a'); semaforo(c,ox+2320,452); predioMod(c,ox+2360,452,110,280,'#4a8a8a'); predioMod(c,ox+2490,452,80,190,'#8a6ab0'); marco(c,ox+2740,452,t);
  });
}
function chaoLinha(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x, r; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-4,s.w,s.h+4); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#8a7a6a','#4a4038'); c.fillRect(s.x,s.y,s.w,s.h);
  for(r=0;r*15+16<s.h;r++){ var yy=s.y+16+r*15, off=(r%2)*14; for(x=grade(a-off,28)+off;x<b;x+=28){ var hv=hash(x*.21+r*3.7); c.fillStyle=['#9a8a78','#8a7a68','#a89884','#7e705e'][Math.floor(hv*4)]; rr(c,x+1.5,yy+1,25,12,5); c.fill(); c.fillStyle='rgba(255,255,255,.15)'; rr(c,x+4,yy+2,16,3,1.5); c.fill(); } }
  for(x=grade(a,20);x<b;x+=20){ c.fillStyle=corEpoca(x+10); c.fillRect(x,s.y,20.5,13); }
  c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(s.x,s.y,s.w,2); c.fillStyle='rgba(0,0,0,.2)'; c.fillRect(s.x,s.y+11,s.w,2);
  for(x=grade(a,150);x<b;x+=150){ c.fillStyle='rgba(255,255,255,.7)'; circ(c,x+75,s.y+6.5,2.5); c.fill(); }
  bordas(c,s,'rgba(20,10,0,.35)'); c.fillStyle='rgba(0,0,0,.16)'; c.fillRect(s.x,s.y+s.h-8,s.w,8);
  c.restore();
}
function platLinha(c,p){
  sombraPlat(c,p,4);
  if(hash(p.x*.13+p.y*.11)>.5){ /* ponteiro de relógio gigante */
    var cy=p.y+p.h/2; c.fillStyle='#2a2a3a'; c.beginPath(); c.moveTo(p.x+p.h/2,p.y+2); c.lineTo(p.x+p.w-18,p.y+3); c.lineTo(p.x+p.w-18,p.y-3); c.lineTo(p.x+p.w,cy); c.lineTo(p.x+p.w-18,p.y+p.h+3); c.lineTo(p.x+p.w-18,p.y+p.h-3); c.lineTo(p.x+p.h/2,p.y+p.h-2); c.closePath(); c.fill();
    c.fillStyle='#4a4a62'; c.fillRect(p.x+p.h/2,p.y+3,p.w-p.h/2-20,3);
    c.fillStyle='#f6cf4a'; circ(c,p.x+p.h/2,cy,p.h/2+2); c.fill(); c.fillStyle='#c99a3a'; circ(c,p.x+p.h/2,cy,p.h/4); c.fill(); c.fillStyle='rgba(255,255,255,.6)'; circ(c,p.x+p.h/2-3,cy-3,2); c.fill();
    c.strokeStyle='#f6cf4a'; c.lineWidth=1.5; c.beginPath(); c.moveTo(p.x+p.h+2,p.y+3); c.lineTo(p.x+p.w-18,p.y+3); c.stroke();
  } else { /* blocos de calendário */
    var n=Math.max(1,Math.round(p.w/46)), bw=p.w/n;
    for(var i=0;i<n;i++){ var bx=p.x+i*bw; c.fillStyle='#fffdf6'; rr(c,bx+1,p.y,bw-2,p.h,3); c.fill(); c.fillStyle='#dc2626'; rr(c,bx+1,p.y,bw-2,6,3); c.fill(); c.fillRect(bx+1,p.y+3,bw-2,3);
      c.fillStyle='#7a7a86'; circ(c,bx+bw*.3,p.y+1,1.6); c.fill(); circ(c,bx+bw*.7,p.y+1,1.6); c.fill();
      txt(c,String(1+Math.floor(hash(bx*.7+p.y)*28)),bx+bw/2,p.y+12.5,10,'#2a2a3a'); c.fillStyle='rgba(0,0,0,.08)'; c.fillRect(bx+1,p.y+p.h-3,bw-2,3); }
  }
}

/* ============================================================
   SUBMUNDO sub_arquivo — porão do arquivo: estantes de pastas e
   caixas. Neste jogo o desenho do nível passa 'sub_caverna' para
   A.fundoSub, então também olhamos a cena real do mundo atual.
   ============================================================ */
var PASTAS=['#c0392b','#2c6fb5','#2f8f57','#e0a020','#7b4fa8','#16808a'];
function fundoArquivo(c,cam,t){
  ceuG(c,[[0,'#1a1510'],[.5,'#2a2219'],[1,'#3a2e22']]);
  rep(cam,180,function(ox){ var x0=ox+10; c.fillStyle='#4a4038'; c.fillRect(x0,96,8,356); c.fillRect(x0+152,96,8,356);
    for(var r=0;r<5;r++){ var y=150+r*62; c.fillStyle='#5a5048'; c.fillRect(x0,y,160,6);
      for(var bx=x0+12;bx<x0+150;){ var hv=hash(bx*.31+r*17+Math.floor((ox+cam)/180)*0), bw=hv>.7?40:10; if(bx+bw>x0+150) break;
        if(bw>20){ c.fillStyle='#b08a5a'; c.fillRect(bx,y-34,bw,34); c.fillStyle='#f4ead6'; c.fillRect(bx+8,y-24,bw-16,9); c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(bx+bw/2-4,y-31,8,3); }
        else { c.fillStyle=PASTAS[Math.floor(hash(bx*1.7+r)*6)]; c.fillRect(bx,y-46,bw-1,46); c.fillStyle='#f4ead6'; c.fillRect(bx+1.5,y-38,bw-4,8); c.fillStyle='rgba(0,0,0,.4)'; circ(c,bx+bw/2-.5,y-12,2); c.fill(); }
        bx+=bw+1; } } });
  c.fillStyle='rgba(0,0,0,.5)'; c.fillRect(0,0,W,90); c.strokeStyle='#5a4a3a'; c.lineWidth=8; linha(c,0,70,W,70); c.lineWidth=5; linha(c,0,82,W,82);
  rep(cam,320,function(ox){ var lx=ox+160, a=Math.sin(t*.9+ox*.01)*.06, ex=lx+Math.sin(a)*60, ey=70+Math.cos(a)*60; c.strokeStyle='#1a1a1a'; c.lineWidth=1.5; linha(c,lx,70,ex,ey);
    brilho(c,ex,ey+8,120,'rgba(255,200,110,.28)',1); c.fillStyle='#2a2a2a'; c.fillRect(ex-3,ey,6,6); c.fillStyle='#ffe9a8'; circ(c,ex,ey+11,6); c.fill(); });
  c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(0,0,W,H);
}
var sub0=A.fundoSub;
A.fundoSub=function(c,cena,cam,t){
  var real=cena; try{ var J=window.JOGO&&window.JOGO.J; if(J&&J.mundo&&J.mundo.cena) real=J.mundo.cena; }catch(e){}
  if(cena==='sub_arquivo'||real==='sub_arquivo'){ c.save(); fundoArquivo(c,cam||0,t||0); c.restore(); return; }
  if(sub0) sub0(c,cena,cam,t);
};

/* ---------- embrulho das funções de cena ---------- */
var F={
  rios:{ceu:ceuRios,longe:longeRios,perto:pertoRios,chao:chaoRios,plat:platRios},
  cidade:{ceu:ceuCidade,longe:longeCidade,perto:pertoCidade,chao:chaoCidade,plat:platCidade},
  museu:{ceu:ceuMuseu,longe:longeMuseu,perto:pertoMuseu,chao:chaoMuseu,plat:platMuseu},
  linha:{ceu:ceuLinha,longe:longeLinha,perto:pertoLinha,chao:chaoLinha,plat:platLinha}
};
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma;
A.ceu=function(c,cena,t){ var f=F[cena]; if(f){ c.save(); f.ceu(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.longe(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.perto(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.chao=function(c,s,cena){ var f=F[cena]; if(f){ c.save(); f.chao(c,s); c.restore(); return; } chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ var f=F[cena]; if(f){ c.save(); f.plat(c,p); c.restore(); return; } plat0(c,p,cena); };
})();
