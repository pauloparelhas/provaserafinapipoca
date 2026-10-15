/* ============================================================
   ING3_jogo_arte4.js — cenários de "The Lost Endings" (parte 2):
   ginásio, estádio, cozinha do biscoito, castelo de tinta e o
   mapa-livro (A.mapaLivro + A.MAPA_NOS). Usa os utilitários de
   ING3_jogo_arte3.js (A.CN) e registra as cenas no mesmo embrulho.
   Tudo por código: sem imagem externa, sem emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho, cintila=I.cintila;
var N=A.CN, rep=N.rep, faixa=N.faixa, grade=N.grade, ceuG=N.ceuG, bruma=N.bruma, linha=N.linha, pontoQ=N.pontoQ, bordas=N.bordas, sombraPlat=N.sombraPlat, flor=N.flor;

/* desenho estático guardado num canvas (2x) — multidões e o livro do mapa */
var CACHE={};
function cache(key,w,h,fn){ if(CACHE[key]) return CACHE[key]; var cv=document.createElement('canvas'); cv.width=Math.ceil(w*2); cv.height=Math.ceil(h*2); var x=cv.getContext('2d'); x.scale(2,2); fn(x); CACHE[key]=cv; return cv; }
var PELE=['#fcdcc4','#e8b48c','#c68a5e','#9a6440','#6e4228'];
/* arquibancada: fileiras de gente (cabeça + tronco), algumas de braço erguido */
function torcida(c,w,h,rows,esp,banco,camisas,tom,k){
  var rh=h/rows;
  for(var r=0;r<rows;r++){ var y0=r*rh; c.fillStyle=mix(banco,'#000',r%2?.08:0); c.fillRect(0,y0+rh*.62,w,rh*.38);
    for(var px=(r%2)*esp/2;px<w+esp;px+=esp){ var hv=hash(px*.37+r*13+k), cam=mix(camisas[Math.floor(hv*camisas.length)],tom,.42), pele=mix(PELE[Math.floor(hash(px+r*7+k)*5)],tom,.34);
      if(hash(px*1.3+r+k)>.82){ c.strokeStyle=pele; c.lineWidth=rh*.1; linha(c,px+rh*.16,y0+rh*.5,px+rh*.3,y0+rh*.02); }
      c.fillStyle=cam; rr(c,px-rh*.2,y0+rh*.38,rh*.4,rh*.42,rh*.12); c.fill();
      c.fillStyle=pele; circ(c,px,y0+rh*.27,rh*.15); c.fill();
      if(hv>.6){ c.fillStyle=mix('#3b2416',tom,.25); c.beginPath(); c.arc(px,y0+rh*.25,rh*.155,PI,TAU); c.fill(); } } }
}
function bandeirinhas(c,x0,x1,y,sag,t,cores){ var cx=(x0+x1)/2, cy=y+sag*2; c.strokeStyle='rgba(20,25,50,.8)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(x0,y); c.quadraticCurveTo(cx,cy,x1,y); c.stroke();
  var n=Math.floor((x1-x0)/20); for(var i=1;i<n;i++){ var p=pontoQ(x0,y,cx,cy,x1,y,i/n); c.save(); c.translate(p[0],p[1]); c.rotate(Math.sin(t*2+i)*.1); c.fillStyle=cores[i%cores.length]; c.beginPath(); c.moveTo(-6,0); c.lineTo(6,0); c.lineTo(0,13); c.fill(); c.restore(); } }

/* ============================================================
   GINÁSIO — ginástica artística
   ============================================================ */
A.CENAS.ginasio ={ceu:['#151c38','#2b3a6e','#6a80c0'], chaoTop:'#4a8cf0', chao:'#2f6fd6', chaoBase:'#151b38', plat:'#4b8df0', platTop:'#7fb0ff', part:'', musica:'cidade'};
var CAM_G=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899','#f8fafc','#14b8a6'];
function ceuGin(c,t){ ceuG(c,[[0,'#151c38'],[.3,'#2b3a6e'],[.7,'#4a5f9f'],[1,'#6a80c0']]); }
function longeGin(c,cam,t){
  var gente=cache('ginTorcida',960,168,function(x){ torcida(x,960,168,6,20,'#27336a',CAM_G,'#3a4c8c',1); });
  rep(cam,960,function(ox){ c.drawImage(gente,ox,240,960,168); }); c.fillStyle='rgba(30,40,90,.22)'; c.fillRect(0,240,W,168);
  c.fillStyle='#202b5c'; c.fillRect(0,228,W,14); c.fillStyle='#3b4f9a'; c.fillRect(0,226,W,3);
  /* treliça do teto */
  c.fillStyle='#0e1329'; c.fillRect(0,16,W,6); c.fillRect(0,46,W,6); c.strokeStyle='#0e1329'; c.lineWidth=3; var o=-(((cam%40)+40)%40); c.beginPath(); for(var x=o-40;x<W+40;x+=40){ c.moveTo(x,22); c.lineTo(x+20,46); c.lineTo(x+40,22); } c.stroke();
  rep(cam,480,function(ox){ var lx=ox+240; if(lx<-120||lx>W+120) return;
    var g=c.createLinearGradient(0,56,0,450); g.addColorStop(0,'rgba(255,250,225,.2)'); g.addColorStop(1,'rgba(255,250,225,0)'); c.fillStyle=g; c.beginPath(); c.moveTo(lx-12,56); c.lineTo(lx+12,56); c.lineTo(lx+110,450); c.lineTo(lx-110,450); c.fill();
    c.fillStyle='#1a2140'; rr(c,lx-17,44,34,14,4); c.fill(); brilho(c,lx,58,46,'rgba(255,250,220,.7)',.8); c.fillStyle='#fffbe6'; el(c,lx,57,12,4); c.fill();
    bandeirinhas(c,lx,lx+480,62,22,t,['#ef4444','#facc15','#22c55e','#3b82f6','#f8fafc']); });
  rep(cam,1440,function(ox){ var bx=ox+480; if(bx>-200&&bx<W+200){ c.strokeStyle='#0e1329'; c.lineWidth=2; linha(c,bx-90,52,bx-90,104); linha(c,bx+90,52,bx+90,104);
      c.fillStyle='#f8fafc'; rr(c,bx-120,100,240,50,6); c.fill(); c.fillStyle='#c0264b'; c.fillRect(bx-120,100,240,7); c.fillRect(bx-120,143,240,7);
      c.fillStyle='#1e3a8a'; c.font='900 25px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('RHYTHM GYM',bx,126); }
    var sx=ox+1120; if(sx>-200&&sx<W+200){ c.fillStyle='#0e1329'; rr(c,sx-80,96,160,84,8); c.fill(); c.strokeStyle='#3b4f9a'; c.lineWidth=3; rr(c,sx-80,96,160,84,8); c.stroke();
      c.fillStyle='#93c5fd'; c.font='800 12px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('SCORE',sx,112); brilho(c,sx,146,60,'rgba(251,191,36,.35)',1); c.fillStyle='#fbbf24'; c.font='900 36px "Segoe UI",Arial'; c.fillText('9.95',sx,148); } });
  /* muro acolchoado */
  c.fillStyle=lin(c,0,408,0,452,'#22306a','#141b40'); c.fillRect(0,408,W,44); c.fillStyle='#4a62b8'; c.fillRect(0,406,W,4);
  rep(cam,240,function(ox){ c.fillStyle='rgba(255,255,255,.07)'; rr(c,ox+10,416,220,28,6); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; A.estrela(c,ox+120,430,8,'rgba(250,204,21,.55)',0); });
}
function trave(c,x,t){
  c.fillStyle='rgba(0,0,0,.25)'; el(c,x,452,140,6); c.fill();
  c.fillStyle=lin(c,0,436,0,452,'#3b82f6','#1d4ed8'); rr(c,x-130,436,260,18,6); c.fill(); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(x-124,437,248,2);
  [-70,70].forEach(function(d){ var lx=x+d; c.fillStyle=lin(c,lx-6,0,lx+6,0,'#c9d1df','#7d879b'); c.fillRect(lx-5,362,10,76); c.fillStyle='#4b5468'; c.beginPath(); c.moveTo(lx-24,440); c.lineTo(lx+24,440); c.lineTo(lx+12,426); c.lineTo(lx-12,426); c.fill(); });
  c.fillStyle='rgba(0,0,0,.2)'; rr(c,x-112,354,230,14,7); c.fill();
  c.fillStyle=lin(c,0,346,0,362,'#f1d5ad','#c2955f'); rr(c,x-116,346,232,14,7); c.fill(); c.fillStyle='rgba(255,255,255,.45)'; rr(c,x-110,347,220,3,1.5); c.fill(); c.fillStyle='#a8784a'; rr(c,x-116,346,8,14,4); c.fill(); rr(c,x+108,346,8,14,4); c.fill();
}
function argolas(c,x,t){
  var a=Math.sin(t*1.1)*.025; c.save(); c.translate(x,52); c.rotate(a);
  c.strokeStyle='#2a2320'; c.lineWidth=3; linha(c,-16,0,-16,186); linha(c,16,0,16,186); c.strokeStyle='#5b4a3a'; c.lineWidth=2; linha(c,-16,186,-16,200); linha(c,16,186,16,200);
  [-16,16].forEach(function(d){ c.strokeStyle='#b88a52'; c.lineWidth=6; circ(c,d,214,13); c.stroke(); c.strokeStyle='rgba(255,236,200,.7)'; c.lineWidth=2; c.beginPath(); c.arc(d,214,13,-2.4,-1.2); c.stroke(); });
  c.restore();
}
function barras(c,x,t){
  c.fillStyle='rgba(0,0,0,.25)'; el(c,x,452,150,6); c.fill();
  c.fillStyle=lin(c,0,436,0,452,'#3b82f6','#1d4ed8'); rr(c,x-150,436,300,18,6); c.fill();
  function barra(x0,x1,y){ c.strokeStyle='rgba(220,226,236,.75)'; c.lineWidth=1.2; linha(c,x0,y+4,x0-34,446); linha(c,x1,y+4,x1+34,446);
    [x0,x1].forEach(function(px){ c.fillStyle=lin(c,px-5,0,px+5,0,'#e6ebf3','#9aa3b5'); c.fillRect(px-4,y,8,446-y); c.fillStyle='#2f6fd6'; c.fillRect(px-5,446-70,10,70); c.fillStyle='#4b5468'; c.fillRect(px-14,440,28,8); });
    c.fillStyle=lin(c,0,y-4,0,y+4,'#fbf0dc','#d4b68a'); rr(c,x0-6,y-4,x1-x0+12,8,4); c.fill(); }
  barra(x-120,x+40,330); barra(x-60,x+110,262);
}
function pertoGin(c,cam,t){
  rep(cam,1300,function(ox){ if(ox>W+200||ox<-1500) return; trave(c,ox+220,t); argolas(c,ox+600,t); barras(c,ox+960,t);
    var bx=ox+760; c.fillStyle='#9aa3b5'; c.fillRect(bx-3,400,6,46); c.fillStyle='#4b5468'; c.fillRect(bx-12,444,24,6); c.fillStyle=lin(c,0,388,0,404,'#e6ebf3','#9aa3b5'); c.beginPath(); c.moveTo(bx-20,388); c.lineTo(bx+20,388); c.lineTo(bx+14,404); c.lineTo(bx-14,404); c.fill(); c.fillStyle='#ffffff'; el(c,bx,388,20,4); c.fill(); });
}
function chaoGin(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-4,s.w,s.h+4); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#283266','#121836'); c.fillRect(s.x,s.y,s.w,s.h);
  if(s.h>=30){ c.fillStyle='#c79a62'; c.fillRect(s.x,s.y+22,s.w,8); c.strokeStyle='rgba(120,80,40,.5)'; c.lineWidth=1; for(x=grade(a,60);x<b;x+=60){ linha(c,x+6,s.y+25,x+40,s.y+25); linha(c,x+24,s.y+28,x+56,s.y+28); }
    c.fillStyle='#86b4f5'; c.fillRect(s.x,s.y+14,s.w,8); }
  c.fillStyle=lin(c,0,s.y,0,s.y+14,'#5b9af5','#2f6fd6'); c.fillRect(s.x,s.y,s.w,14);
  c.fillStyle='rgba(255,255,255,.12)'; for(x=grade(a,9);x<b;x+=9){ c.fillRect(x+hash(x)*6,s.y+8+hash(x+1)*5,1.5,1.5); }
  c.fillStyle='#f8fafc'; c.fillRect(s.x,s.y+4,s.w,3); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(s.x,s.y,s.w,1.5);
  c.strokeStyle='rgba(15,30,80,.45)'; c.lineWidth=1.5; for(x=grade(a,120);x<b;x+=120) linha(c,x,s.y+7,x,s.y+22);
  bordas(c,s,'rgba(0,0,20,.4)'); c.restore();
}
function platGin(c,p){
  sombraPlat(c,p,6); c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#5b9af5','#2557b8'); rr(c,p.x,p.y,p.w,p.h,6); c.fill();
  var n=Math.max(1,Math.round(p.w/45)); for(var i=1;i<n;i++){ var sx=p.x+p.w*i/n; c.fillStyle='rgba(10,30,90,.45)'; c.fillRect(sx-1,p.y+1,2,p.h-2); c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(sx+1,p.y+1,1,p.h-2); }
  c.save(); c.setLineDash([3,3]); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=1; rr(c,p.x+3,p.y+3,p.w-6,p.h-6,4); c.stroke(); c.restore();
  c.fillStyle='rgba(255,255,255,.35)'; rr(c,p.x+3,p.y+1,p.w-6,2.5,1.2); c.fill();
}

/* ============================================================
   ESTÁDIO — futebol ao entardecer, refletores acesos
   ============================================================ */
A.CENAS.estadio ={ceu:['#0b1640','#24418f','#f2b170'], chaoTop:'#5cbf60', chao:'#43a047', chaoBase:'#2b6b33', plat:'#4caf50', platTop:'#ffffff', part:'', musica:'mar'};
var CAM_E=['#dc2626','#dc2626','#f8fafc','#2563eb','#2563eb','#facc15','#16a34a','#f97316'];
var FRASES=['GOAL!','FAIR PLAY','KICK OFF','GO TEAM!','CAUSE & EFFECT','WELL DONE!','SCORE!'];
function ceuEst(c,t){ ceuG(c,[[0,'#0b1640'],[.4,'#24418f'],[.75,'#b9708a'],[1,'#f2b170']]); c.fillStyle='#fff'; for(var i=0;i<30;i++){ c.globalAlpha=.3+.5*Math.abs(Math.sin(t*1.3+i)); circ(c,hash(i+5)*W,hash(i+50)*150,hash(i)*1.2+.4); c.fill(); } c.globalAlpha=1; }
function bola(c,x,y,r){ c.fillStyle='#fff'; circ(c,x,y,r); c.fill(); c.fillStyle='#1f2937'; c.beginPath(); for(var i=0;i<5;i++){ var a=-PI/2+i*TAU/5; c.lineTo(x+Math.cos(a)*r*.38,y+Math.sin(a)*r*.38); } c.fill(); for(i=0;i<5;i++){ a=-PI/2+i*TAU/5; c.strokeStyle='#1f2937'; c.lineWidth=r*.12; linha(c,x+Math.cos(a)*r*.38,y+Math.sin(a)*r*.38,x+Math.cos(a)*r*.95,y+Math.sin(a)*r*.95); } c.strokeStyle='rgba(0,0,0,.3)'; c.lineWidth=1; circ(c,x,y,r); c.stroke(); }
function longeEst(c,cam,t){
  rep(cam,640,function(ox){ var tx=ox+320; if(tx<-160||tx>W+160) return;
    var g=c.createLinearGradient(0,60,0,450); g.addColorStop(0,'rgba(255,250,225,.16)'); g.addColorStop(1,'rgba(255,250,225,0)'); c.fillStyle=g; c.beginPath(); c.moveTo(tx-34,60); c.lineTo(tx+34,60); c.lineTo(tx+200,450); c.lineTo(tx-120,450); c.fill();
    c.strokeStyle='#1a2142'; c.lineWidth=3; linha(c,tx-12,170,tx-5,62); linha(c,tx+12,170,tx+5,62); c.lineWidth=1.5; c.beginPath(); for(var y=166;y>66;y-=12){ var k=(170-y)/108; c.moveTo(tx-12+7*k,y); c.lineTo(tx+12-7*(k+.11),y-12); } c.stroke();
    brilho(c,tx,44,150,'rgba(255,248,215,.32)',1); c.fillStyle='#232a4d'; rr(c,tx-40,24,80,40,5); c.fill();
    for(var i=0;i<6;i++) for(var j=0;j<3;j++){ c.fillStyle='#fffbe6'; circ(c,tx-30+i*12,33+j*11,4.3); c.fill(); } });
  c.fillStyle='#161d3f'; c.fillRect(0,150,W,260);
  var gente=cache('estTorcida',960,232,function(x){ torcida(x,960,232,10,14,'#1d2550',CAM_E,'#2a3466',7); });
  rep(cam,960,function(ox){ c.drawImage(gente,ox,172,960,232); }); c.fillStyle='rgba(12,18,48,.32)'; c.fillRect(0,172,W,232);
  c.fillStyle='#0e1430'; c.fillRect(0,140,W,26); c.fillStyle='#2b3566'; c.fillRect(0,164,W,4);
  rep(cam,24,function(ox){ c.fillStyle='rgba(255,247,214,.85)'; circ(c,ox+12,170,1.8); c.fill(); });
  for(var f=0;f<10;f++){ var sd=f*7+Math.floor(t*2.5); if(hash(sd)>.55){ var fx=hash(sd+1)*W, fy=190+hash(sd+2)*200; brilho(c,fx,fy,10,'rgba(255,255,255,.95)',.9); cintila(c,fx,fy,5,'#fff'); } }
  c.fillStyle=lin(c,0,400,0,452,'#1a2350','#0f1534'); c.fillRect(0,400,W,52); c.fillStyle='#0c112a'; c.fillRect(0,452,W,H-452);
}
function placaLed(c,x,y,i){ var cores=[['#1d4ed8','#1e3a8a'],['#dc2626','#991b1b'],['#16a34a','#14532d'],['#f59e0b','#b45309'],['#7c3aed','#4c1d95']], k=cores[i%5];
  c.fillStyle='#0b1022'; rr(c,x,y,200,44,4); c.fill(); c.fillStyle=lin(c,0,y+3,0,y+41,k[0],k[1]); rr(c,x+4,y+3,192,38,3); c.fill();
  c.fillStyle='rgba(255,255,255,.12)'; c.fillRect(x+4,y+3,192,12);
  c.fillStyle='rgba(10,15,40,.18)'; rr(c,x+4,y+3,192,38,3); c.fill(); bola(c,x+24,y+22,10); c.fillStyle='#fff'; c.font='900 17px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(FRASES[i%FRASES.length],x+112,y+23); }
function gol(c,x,t){
  var x1=x+230, top=296, dx=30, dy=-20;
  c.save(); c.globalAlpha=.9; c.fillStyle='rgba(255,255,255,.07)'; c.beginPath(); c.moveTo(x,top); c.lineTo(x+dx,top+dy); c.lineTo(x1+dx,top+dy); c.lineTo(x1+dx,452); c.lineTo(x,452); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x,top); c.lineTo(x+dx,top+dy); c.lineTo(x1+dx,top+dy); c.lineTo(x1+dx,452+dy*.2); c.lineTo(x1,452); c.lineTo(x,452); c.closePath(); c.clip();
  c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; for(var k=-200;k<300;k+=12){ linha(c,x+k,top-30,x+k+170,452); linha(c,x+k+170,top-30,x+k,452); } c.restore();
  c.strokeStyle='#cbd5e1'; c.lineWidth=3; linha(c,x+dx,top+dy,x1+dx,top+dy); linha(c,x1+dx,top+dy,x1+dx,450); linha(c,x+dx,top+dy,x+dx,320);
  c.strokeStyle='#ffffff'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(x,452); c.lineTo(x,top); c.lineTo(x1,top); c.lineTo(x1,452); c.stroke(); c.lineCap='butt';
  c.strokeStyle='rgba(0,0,0,.18)'; c.lineWidth=2; linha(c,x+3,top+4,x+3,452);
}
function bandeiraEscanteio(c,x,t){ c.strokeStyle='#f8fafc'; c.lineWidth=3; linha(c,x,452,x,372); c.fillStyle='#facc15'; var w=Math.sin(t*4)*3; c.beginPath(); c.moveTo(x,374); c.quadraticCurveTo(x+14,372+w,x+26,378+w); c.lineTo(x,392); c.fill(); c.fillStyle='#ef4444'; c.beginPath(); c.moveTo(x,383); c.lineTo(x+13,385+w*.5); c.lineTo(x,392); c.fill(); }
function pertoEst(c,cam,t){
  rep(cam,1400,function(ox){ if(ox>W+40||ox<-1440) return; for(var i=0;i<7;i++){ var px=ox+i*200; if(px>-210&&px<W+10) placaLed(c,px,402,i); }
    bandeiraEscanteio(c,ox+260,t); if(ox+900<W+40&&ox+1160>-40) gol(c,ox+900,t); });
}
function chaoEst(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-12,s.w,s.h+12); c.clip();
  for(x=grade(a,56);x<b;x+=56){ c.fillStyle=(((Math.floor(x/56))%2)+2)%2?'#4fb354':'#42a048'; c.fillRect(x,s.y,56,s.h); }
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,140),'rgba(0,30,10,0)','rgba(0,30,10,.5)'); c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle='rgba(255,255,255,.08)'; for(x=grade(a,11);x<b;x+=11){ c.fillRect(x+hash(x)*8,s.y+16+hash(x+3)*Math.max(4,Math.min(60,s.h-20)),1.5,4); }
  for(x=grade(a,6);x<b;x+=6){ var hh=3+hash(x*.7)*5; c.fillStyle=hash(x)>.5?'#6fcf6a':'#58b95c'; c.beginPath(); c.moveTo(x,s.y+1); c.lineTo(x+2,s.y-hh); c.lineTo(x+4,s.y+1); c.fill(); }
  c.fillStyle='rgba(255,255,255,.92)'; c.fillRect(s.x,s.y+5,s.w,4);
  bordas(c,s,'rgba(0,30,10,.4)'); c.restore();
}
function platEst(c,p){
  sombraPlat(c,p,5); c.save(); rr(c,p.x,p.y,p.w,p.h,5); c.clip();
  for(var x=p.x;x<p.x+p.w;x+=28){ c.fillStyle=Math.floor((x-p.x)/28)%2?'#4fb354':'#42a048'; c.fillRect(x,p.y,28,p.h); }
  c.fillStyle='#6b4a2a'; c.fillRect(p.x,p.y+p.h-5,p.w,5); c.fillStyle='rgba(255,255,255,.9)'; c.fillRect(p.x,p.y+3,p.w,3); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(p.x,p.y,p.w,1.5); c.restore();
  c.fillStyle='#6fcf6a'; for(x=p.x+3;x<p.x+p.w-3;x+=6){ c.beginPath(); c.moveTo(x,p.y+1); c.lineTo(x+2,p.y-3-hash(x)*3); c.lineTo(x+4,p.y+1); c.fill(); }
}

/* ============================================================
   BISCOITO — a cozinha vista por um ratinho
   ============================================================ */
A.CENAS.biscoito={ceu:['#fbe3bd','#fdeccc','#f3d6a8'], chaoTop:'#e8b980', chao:'#c88a50', chaoBase:'#7e4f28', plat:'#f2c47a', platTop:'#f8d79a', part:'', musica:'cidade'};
function ceuBisc(c,t){ ceuG(c,[[0,'#f9ddb2'],[.45,'#fdeccc'],[1,'#f3d6a8']]); }
function blob(c,x,y,r,seed,n){ n=n||30; c.beginPath(); for(var i=0;i<n;i++){ var a=i*TAU/n, k=r*(1+(hash(seed+i*1.7)-.5)*.07); if(i===0) c.moveTo(x+Math.cos(a)*k,y+Math.sin(a)*k); else c.lineTo(x+Math.cos(a)*k,y+Math.sin(a)*k); } c.closePath(); }
function gotas(c,x,y,r,seed,n,cor){ c.fillStyle=cor; for(var i=0;i<n;i++){ var a=hash(seed+i)*TAU, d=hash(seed+i*3.3)*r*.72, s=r*(.09+hash(seed+i*5.1)*.07); c.beginPath(); c.ellipse(x+Math.cos(a)*d,y+Math.sin(a)*d,s,s*.8,a,0,TAU); c.fill(); } }
function biscoitoG(c,x,y,r,rot,seed){
  c.save(); c.translate(x,y); c.rotate(rot);
  c.fillStyle='#9a5a22'; blob(c,r*.06,r*.05,r,seed); c.fill();
  var g=c.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r); g.addColorStop(0,'#f3c27a'); g.addColorStop(.7,'#d9984e'); g.addColorStop(1,'#b8732f'); c.fillStyle=g; blob(c,0,0,r,seed); c.fill();
  c.strokeStyle='rgba(140,80,30,.35)'; c.lineWidth=Math.max(1,r*.02); for(var i=0;i<4;i++){ var a=hash(seed+i*9)*TAU, d=r*(.3+hash(seed+i)*.4); c.beginPath(); c.moveTo(Math.cos(a)*d,Math.sin(a)*d); c.lineTo(Math.cos(a+.25)*d*1.25,Math.sin(a+.25)*d*1.25); c.stroke(); }
  gotas(c,0,0,r,seed+40,22,'rgba(150,90,35,.35)');
  for(i=0;i<9;i++){ var aa=hash(seed+i*2.3)*TAU, dd=hash(seed+i*4.1)*r*.72, s=r*(.09+hash(seed+i)*.05), cx=Math.cos(aa)*dd, cy=Math.sin(aa)*dd; c.fillStyle='#4a2614'; blob(c,cx,cy,s,seed+i*11,9); c.fill(); c.fillStyle='rgba(140,90,60,.8)'; circ(c,cx-s*.3,cy-s*.35,s*.28); c.fill(); }
  c.fillStyle='rgba(255,240,210,.25)'; el(c,-r*.35,-r*.45,r*.3,r*.12); c.fill();
  c.restore();
}
function discoBisc(c,x,y,rx,ry,th,seed){
  c.fillStyle=lin(c,x-rx,0,x+rx,0,'#c27c35','#9a5a22'); c.fillRect(x-rx,y,rx*2,th); el(c,x,y+th,rx,ry); c.fill();
  c.strokeStyle='rgba(110,60,20,.35)'; c.lineWidth=1; for(var k=0;k<rx*2;k+=7) linha(c,x-rx+k,y+2,x-rx+k+2,y+th-2);
  c.fillStyle=lin(c,0,y-ry,0,y+ry,'#f0bb72','#d18d45'); el(c,x,y,rx,ry); c.fill();
  for(var i=0;i<8;i++){ var px=x+(hash(seed+i)-.5)*rx*1.5, py=y+(hash(seed+i*3)-.5)*ry*1.3; c.fillStyle='#4a2614'; el(c,px,py,rx*.07,ry*.16); c.fill(); }
}
function copoLeite(c,x,y,w,h,t){
  var top=y-h, wt=w/2, wb=w*.42;
  c.fillStyle='rgba(120,80,40,.18)'; el(c,x+10,y,wt+16,8); c.fill();
  c.save(); c.beginPath(); c.moveTo(x-wt,top); c.lineTo(x-wb,y-10); c.quadraticCurveTo(x,y+6,x+wb,y-10); c.lineTo(x+wt,top); c.closePath(); c.fillStyle='rgba(230,246,255,.3)'; c.fill(); c.clip();
  var my=top+h*.2+Math.sin(t*1.5)*1.5, wm=wt-(my-top)*(wt-wb)/h;
  c.fillStyle=lin(c,x-wt,0,x+wt,0,'#ffffff','#e4e0d4'); c.fillRect(x-wt,my,w,h);
  c.fillStyle='rgba(200,190,170,.35)'; c.fillRect(x+wt*.45,my,wt*.6,h);
  c.fillStyle='#fffef8'; el(c,x,my,wm,9); c.fill(); c.fillStyle='rgba(220,212,195,.6)'; el(c,x+wm*.2,my+2,wm*.7,5); c.fill();
  c.fillStyle='rgba(255,255,255,.65)'; c.fillRect(x-wt+12,top+14,9,h-40); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(x-wt+26,top+20,4,h-60); c.fillRect(x+wt-26,top+24,5,h-70);
  c.restore();
  c.strokeStyle='rgba(150,185,210,.75)'; c.lineWidth=2.5; c.beginPath(); c.moveTo(x-wt,top); c.lineTo(x-wb,y-10); c.quadraticCurveTo(x,y+6,x+wb,y-10); c.lineTo(x+wt,top); c.stroke();
  c.strokeStyle='rgba(255,255,255,.95)'; c.lineWidth=3; el(c,x,top,wt,8); c.stroke(); c.strokeStyle='rgba(150,185,210,.6)'; c.lineWidth=1.5; c.beginPath(); c.ellipse(x,top,wt,8,0,0,PI); c.stroke();
  c.fillStyle='#fffef8'; c.beginPath(); c.moveTo(x-wt+20,top+2); c.quadraticCurveTo(x-wt+22,top+20,x-wt+18,top+26); c.arc(x-wt+21,top+26,3.5,PI,0,true); c.fill();
}
function pote(c,x,y){
  c.fillStyle='rgba(120,80,40,.18)'; el(c,x+8,y,86,8); c.fill();
  c.fillStyle='rgba(230,246,255,.3)'; rr(c,x-72,y-190,144,190,30); c.fill();
  discoBisc(c,x-8,y-40,56,13,20,3); discoBisc(c,x+6,y-74,54,13,20,5); discoBisc(c,x-4,y-108,55,13,20,8); biscoitoG(c,x+18,y-150,38,.5,12);
  c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(x-60,y-170,8,140); c.strokeStyle='rgba(150,185,210,.8)'; c.lineWidth=2.5; rr(c,x-72,y-190,144,190,30); c.stroke();
  c.fillStyle=lin(c,0,y-214,0,y-188,'#e76f51','#b8462f'); rr(c,x-66,y-212,132,26,10); c.fill(); c.fillStyle='#f4a261'; circ(c,x,y-218,12); c.fill(); c.fillStyle='rgba(255,255,255,.3)'; rr(c,x-60,y-209,120,5,3); c.fill();
  c.fillStyle='#fff7e8'; rr(c,x-38,y-82,76,34,8); c.fill(); c.fillStyle='#b8462f'; c.font='900 15px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('COOKIES',x,y-64);
}
function longeBisc(c,cam,t){
  rep(cam,1500,function(ox){ if(ox>W+20||ox<-1520) return;
    c.fillStyle='#bcd8d2'; c.fillRect(ox,250,1500,202); for(var ty=252;ty<452;ty+=40) for(var tx=ox+2;tx<ox+1500;tx+=40){ c.fillStyle=((tx-ox)/40+(ty-252)/40)%2?'#e0f0ec':'#d2e8e3'; rr(c,tx,ty,37,37,4); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(tx+4,ty+4,12,3); }
    c.fillStyle='#e8d2b0'; c.fillRect(ox,236,1500,16); c.fillStyle='#c9a77c'; c.fillRect(ox,250,1500,3);
    /* armários altos */
    for(var k=0;k<4;k++){ var ax=ox+30+k*150; c.fillStyle=lin(c,0,0,0,180,'#a9ddd0','#86c6b6'); rr(c,ax,-10,144,186,10); c.fill(); c.strokeStyle='rgba(60,120,105,.4)'; c.lineWidth=3; rr(c,ax+14,8,116,150,8); c.stroke(); c.fillStyle='#e2b04a'; circ(c,k%2?ax+20:ax+124,96,6); c.fill(); }
    c.strokeStyle='#8a6a4a'; c.lineWidth=3; [[ox+120,'concha'],[ox+200,'bat'],[ox+300,'esp']].forEach(function(u){ var ux=u[0]; linha(c,ux,176,ux,236); if(u[1]==='concha'){ c.fillStyle='#b9c2cc'; c.beginPath(); c.arc(ux,240,13,0,PI); c.fill(); } else if(u[1]==='bat'){ c.strokeStyle='#b9c2cc'; c.lineWidth=1.6; for(var q=-2;q<=2;q++){ el(c,ux,236,4+Math.abs(q)*3,22); } c.stroke(); c.strokeStyle='#8a6a4a'; c.lineWidth=3; } else { c.fillStyle='#b98a5a'; el(c,ux,240,8,13); c.fill(); } });
    /* relógio */
    var rx=ox+690, ry=112; c.fillStyle='#e76f51'; circ(c,rx,ry,40); c.fill(); c.fillStyle='#fffaf0'; circ(c,rx,ry,32); c.fill(); c.strokeStyle='#4a3020'; c.lineWidth=3; linha(c,rx,ry,rx,ry-22); linha(c,rx,ry,rx+15,ry+6); for(var h2=0;h2<12;h2++){ var ah=h2*TAU/12; c.lineWidth=h2%3?1:2.5; linha(c,rx+Math.cos(ah)*26,ry+Math.sin(ah)*26,rx+Math.cos(ah)*30,ry+Math.sin(ah)*30); }
    /* janela com cortina xadrez */
    var jx=ox+800; c.fillStyle='#fffaf0'; rr(c,jx,46,280,250,8); c.fill(); c.fillStyle=lin(c,0,58,0,284,'#9fd8f7','#e0f4ff'); c.fillRect(jx+14,58,252,226); c.fillStyle='#8fcf7e'; c.beginPath(); c.moveTo(jx+14,284); c.quadraticCurveTo(jx+120,220,jx+266,250); c.lineTo(jx+266,284); c.fill(); A.CN.arvoreR(c,jx+200,262,90,'#5f9a5c','#77b36c'); A.CN.nuvemF(c,jx+80,110,.7,'#fff','#e6f2fb',.95);
    c.fillStyle='#fffaf0'; c.fillRect(jx+136,58,8,226); c.fillRect(jx+14,166,252,8);
    [jx-10,jx+214].forEach(function(cx2,i){ c.save(); c.beginPath(); c.moveTo(cx2,40); c.lineTo(cx2+76,40); if(i===0){ c.quadraticCurveTo(cx2+40,170,cx2+60,300); c.lineTo(cx2,300); } else { c.lineTo(cx2+76,300); c.lineTo(cx2+16,300); c.quadraticCurveTo(cx2+36,170,cx2,40); } c.closePath(); c.fillStyle='#fdf2f2'; c.fill(); c.clip(); c.fillStyle='rgba(220,60,70,.45)'; for(var gx=cx2-10;gx<cx2+90;gx+=16){ c.fillRect(gx,40,8,260); } for(var gy=40;gy<300;gy+=16){ c.fillRect(cx2-10,gy,100,8); } c.restore(); });
    c.fillStyle='#c9a77c'; c.fillRect(jx-20,34,320,8); c.fillStyle='#f1e2c6'; c.fillRect(jx-6,294,292,12);
    /* geladeira */
    var gx2=ox+1130; c.fillStyle='rgba(80,60,40,.15)'; c.fillRect(gx2+10,40,330,412); c.fillStyle=lin(c,gx2,0,gx2+320,0,'#f7fcfd','#cfe2e8'); rr(c,gx2,24,320,432,24); c.fill();
    c.strokeStyle='#b7cdd4'; c.lineWidth=3; linha(c,gx2+4,166,gx2+316,166); c.fillStyle=lin(c,gx2+20,0,gx2+34,0,'#e5ecef','#9fb0b8'); rr(c,gx2+22,70,12,70,6); c.fill(); rr(c,gx2+22,190,12,120,6); c.fill();
    [[gx2+110,90,'#ef4444'],[gx2+250,120,'#3b82f6'],[gx2+200,230,'#facc15'],[gx2+120,330,'#22c55e']].forEach(function(m){ c.fillStyle=m[2]; circ(c,m[0],m[1],11); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; circ(c,m[0]-3,m[1]-3,3.5); c.fill(); });
    c.save(); c.translate(gx2+170,232); c.rotate(-.06); c.fillStyle='#fffdf5'; c.fillRect(-60,0,120,96); c.fillStyle='#facc15'; circ(c,-34,24,12); c.fill(); c.strokeStyle='#facc15'; c.lineWidth=2; for(var s2=0;s2<8;s2++){ var as=s2*TAU/8; linha(c,-34+Math.cos(as)*15,24+Math.sin(as)*15,-34+Math.cos(as)*20,24+Math.sin(as)*20); }
    c.fillStyle='#ef4444'; c.beginPath(); c.moveTo(4,56); c.lineTo(26,36); c.lineTo(48,56); c.fill(); c.fillStyle='#60a5fa'; c.fillRect(8,56,36,30); c.fillStyle='#22c55e'; c.fillRect(-60,86,120,10); c.restore(); A.estrela(c,gx2+200,226,9,'#a855f7',0);
    A.estrela(c,gx2+250,300,12,'#ec4899',.3);
  });
  c.fillStyle='rgba(253,236,205,.3)'; c.fillRect(0,0,W,H);
  bruma(c,300,452,'rgba(250,225,185,.35)');
}
function pertoBisc(c,cam,t){
  rep(cam,1300,function(ox){ if(ox>W+250||ox<-1550) return;
    /* 17/10: o copo de leite gigante saiu do fundo: o único copo de leite é o da mesa do café, que se bebe */
    c.fillStyle='rgba(120,80,40,.2)'; el(c,ox+478,452,84,8); c.fill(); biscoitoG(c,ox+470,452-92,94,-.12+Math.sin(t*.6)*.01,21);
    c.fillStyle='rgba(120,80,40,.2)'; el(c,ox+770,452,96,9); c.fill(); discoBisc(c,ox+770,422,86,16,26,31); discoBisc(c,ox+776,392,82,15,26,37); discoBisc(c,ox+766,362,80,15,26,43);
    pote(c,ox+1070,452);
  });
}
function chaoBisc(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-6,s.w,s.h+6); c.clip();
  c.fillStyle=lin(c,0,s.y,0,s.y+Math.min(s.h,150),'#c88a50','#7a4c26'); c.fillRect(s.x,s.y,s.w,s.h);
  c.strokeStyle='rgba(110,60,25,.35)'; c.lineWidth=1.4;
  for(var j=0;j<6;j++){ var yy=s.y+22+j*13; if(yy>s.y+s.h-6) break; c.beginPath(); for(x=grade(a,20);x<=b+20;x+=20){ var py=yy+Math.sin(x*.012+j*1.7)*3+Math.sin(x*.041+j)*1.2; if(x===grade(a,20)) c.moveTo(x,py); else c.lineTo(x,py); } c.stroke(); }
  for(x=grade(a,170);x<b;x+=170){ if(hash(x*.3)>.5&&s.h>50){ var kx=x+hash(x)*100, ky=s.y+34+hash(x+1)*20; c.strokeStyle='rgba(100,55,20,.5)'; el(c,kx,ky,10,4); c.stroke(); el(c,kx,ky,5,2); c.stroke(); } }
  c.fillStyle=lin(c,0,s.y,0,s.y+12,'#efc48c','#d9a062'); c.fillRect(s.x,s.y,s.w,12);
  c.strokeStyle='rgba(160,100,50,.35)'; c.lineWidth=1; for(x=grade(a,90);x<b;x+=90){ linha(c,x+hash(x)*20,s.y+4,x+60+hash(x)*20,s.y+4); linha(c,x+40,s.y+8,x+100,s.y+8); }
  c.fillStyle='#f6d4a2'; c.fillRect(s.x,s.y+12,s.w,1.5); c.fillStyle='rgba(80,40,10,.35)'; c.fillRect(s.x,s.y+13.5,s.w,2);
  for(x=grade(a,34);x<b;x+=34){ if(hash(x*1.1)>.55){ var cx=x+hash(x+2)*24; c.fillStyle=hash(x)>.8?'#4a2614':'#c8873f'; el(c,cx,s.y+3,2+hash(x+5)*2.5,1.6+hash(x+6)); c.fill(); } }
  bordas(c,s,'rgba(60,30,10,.35)'); c.restore();
}
function platBisc(c,p){
  sombraPlat(c,p,5); c.fillStyle='#b9782f'; rr(c,p.x,p.y,p.w,p.h,5); c.fill();
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#f6cd84','#d99c4f'); rr(c,p.x+2,p.y+1.5,p.w-4,p.h-4,4); c.fill();
  c.fillStyle='rgba(150,90,30,.55)'; for(var x=p.x+10;x<p.x+p.w-6;x+=14){ circ(c,x,p.y+6,1.5); c.fill(); circ(c,x+7,p.y+12,1.5); c.fill(); }
  c.fillStyle='rgba(255,245,220,.5)'; rr(c,p.x+4,p.y+2,p.w-8,2.5,1.2); c.fill();
  c.fillStyle='rgba(255,255,255,.8)'; for(x=p.x+8;x<p.x+p.w-8;x+=23){ c.fillRect(x+hash(x)*10,p.y+3+hash(x+1)*10,1.5,1.5); }
}

/* ============================================================
   TINTA — castelo do Conde Rabisco, noite de lua (sem susto)
   ============================================================ */
A.CENAS.tinta   ={ceu:['#140c33','#3a1d6e','#6b3fa0'], chaoTop:'#8a6cc2', chao:'#5b3f8f', chaoBase:'#2e1f52', plat:'#7d60b5', platTop:'#a58ad8', part:'vagalume', musica:'castelo'};
function ceuTinta(c,t){
  ceuG(c,[[0,'#140c33'],[.55,'#3a1d6e'],[1,'#6b3fa0']]);
  c.fillStyle='#fff'; for(var i=0;i<50;i++){ c.globalAlpha=.3+.6*Math.abs(Math.sin(t*1.4+i*1.3)); circ(c,hash(i+3)*W,hash(i+33)*300,hash(i)*1.4+.4); c.fill(); } c.globalAlpha=1;
  cintila(c,300,70,6,'#fff'); cintila(c,620,150,5,'#fde68a');
  brilho(c,170,110,170,'rgba(255,243,196,.28)',1); var g=c.createRadialGradient(158,98,6,170,110,48); g.addColorStop(0,'#fffbe6'); g.addColorStop(1,'#f5e2a0'); c.fillStyle=g; circ(c,170,110,46); c.fill();
  c.fillStyle='rgba(200,180,120,.35)'; circ(c,184,96,8); c.fill(); circ(c,156,124,6); c.fill(); circ(c,188,128,4); c.fill();
  for(i=0;i<3;i++){ var x=((i*380+t*7)%(W+300))-150; A.CN.nuvemF(c,x,150+i*40,.9+i*.2,'rgba(150,110,200,.9)','rgba(90,60,150,.9)',.55); }
}
function pena(c,x,y,len,ang,cor,haste){ c.save(); c.translate(x,y); c.rotate(ang);
  c.fillStyle=cor; c.beginPath(); c.moveTo(0,-len*.18); c.quadraticCurveTo(-len*.24,-len*.55,-2,-len); c.quadraticCurveTo(len*.2,-len*.6,0,-len*.18); c.fill();
  c.strokeStyle=esc(cor,.25); c.lineWidth=1; for(var k=1;k<8;k++){ var yy=-len*(.25+k*.09); linha(c,0,yy,-len*.13*Math.sin(k*.45),yy-len*.05); linha(c,0,yy,len*.11*Math.sin(k*.45),yy-len*.05); }
  c.strokeStyle=haste||'#efe6ff'; c.lineWidth=1.6; linha(c,0,0,0,-len*.96); c.fillStyle='#2a1d5c'; c.beginPath(); c.moveTo(-2,0); c.lineTo(2,0); c.lineTo(0,9); c.fill(); c.restore(); }
function tinteiro(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle='rgba(0,0,0,.25)'; el(c,4,0,46,6); c.fill();
  c.fillStyle=lin(c,-44,0,44,0,'#3a2a7a','#1a1240'); c.beginPath(); c.moveTo(-40,0); c.quadraticCurveTo(-48,-30,-30,-52); c.lineTo(-14,-58); c.lineTo(-14,-72); c.lineTo(14,-72); c.lineTo(14,-58); c.lineTo(30,-52); c.quadraticCurveTo(48,-30,40,0); c.closePath(); c.fill();
  c.fillStyle='rgba(200,180,255,.35)'; c.beginPath(); c.moveTo(-30,-44); c.quadraticCurveTo(-38,-26,-32,-8); c.lineTo(-26,-8); c.quadraticCurveTo(-30,-26,-24,-44); c.fill();
  c.fillStyle='#f3e8d0'; rr(c,-24,-36,48,22,4); c.fill(); c.strokeStyle='#7c3aed'; c.lineWidth=2; c.beginPath(); c.moveTo(-14,-24); c.bezierCurveTo(-8,-34,0,-16,6,-26); c.bezierCurveTo(10,-32,14,-24,16,-22); c.stroke();
  c.fillStyle='#d4af37'; rr(c,-17,-76,34,7,3); c.fill();
  c.fillStyle='#2a1d5c'; c.beginPath(); c.moveTo(-14,-58); c.quadraticCurveTo(-20,-46,-16,-38); c.arc(-16,-36,3,PI*1.5,PI*3.5); c.fill();
  c.restore(); }
function pingos(c,x,y,w,seed){ c.fillStyle='#1c1240'; c.fillRect(x,y,w,7); for(var i=0;i<4;i++){ var px=x+6+hash(seed+i)*(w-12), L=10+hash(seed+i*3)*34, r=3+hash(seed+i*5)*3; c.fillRect(px-r,y,r*2,L); circ(c,px,y+L,r+.6); c.fill(); c.fillStyle='rgba(170,150,255,.55)'; c.fillRect(px-r*.5,y+4,1.4,L-6); c.fillStyle='#1c1240'; } }
function respingo(c,x,y,r,cor,seed){ c.fillStyle=cor; c.beginPath(); for(var i=0;i<22;i++){ var a=i*TAU/22, k=r*(i%2?.62:1)*(.8+hash(seed+i)*.4); c.lineTo(x+Math.cos(a)*k,y+Math.sin(a)*k); } c.closePath(); c.fill(); for(i=0;i<6;i++){ var a2=hash(seed+i*7)*TAU, d=r*(1.25+hash(seed+i)*.6); circ(c,x+Math.cos(a2)*d,y+Math.sin(a2)*d,r*(.08+hash(seed+i*2)*.1)); c.fill(); } c.fillStyle='rgba(255,255,255,.3)'; el(c,x-r*.25,y-r*.3,r*.25,r*.12); c.fill(); }
function pilar(c,x,y0,w,seed){
  c.fillStyle='#3b2766'; c.fillRect(x,y0,w,452-y0);
  for(var y=y0,r=0;y<452;y+=28,r++){ var off=r%2?w/4:0; for(var bx=x-off;bx<x+w;bx+=w/2){ var x0=Math.max(x,bx+2), x1=Math.min(x+w,bx+w/2-2); if(x1<=x0) continue; c.fillStyle=mix('#6b4fa3','#4d3584',hash(bx+y+seed)*.6); rr(c,x0,y+2,x1-x0,24,4); c.fill(); c.fillStyle='rgba(255,255,255,.12)'; c.fillRect(x0+3,y+4,x1-x0-6,2); } }
  c.fillStyle='#8a6cc2'; rr(c,x-10,y0-18,w+20,20,4); c.fill(); c.fillStyle='#a58ad8'; c.fillRect(x-10,y0-18,w+20,4);
  pingos(c,x-10,y0+2,w+20,seed);
}
function lanterna(c,x,y,t){ c.strokeStyle='#2a1d5c'; c.lineWidth=2; linha(c,x,y-30,x,y-12); brilho(c,x,y+4,60,'rgba(255,214,120,.45)',.8+.2*Math.sin(t*4+x)); c.fillStyle='#2a1d5c'; rr(c,x-12,y-14,24,6,2); c.fill(); rr(c,x-10,y+18,20,5,2); c.fill(); c.fillStyle='rgba(255,226,140,.95)'; rr(c,x-9,y-8,18,26,4); c.fill(); c.strokeStyle='#2a1d5c'; c.lineWidth=1.5; linha(c,x,y-8,x,y+18); }
function longeTinta(c,cam,t){
  c.fillStyle='#2b1856'; c.beginPath(); c.moveTo(0,H); for(var x=0;x<=W;x+=16) c.lineTo(x,380+Math.sin((x+cam*.6)*.006)*20); c.lineTo(W,H); c.fill();
  rep(cam,1300,function(ox){ var cx=ox+640; if(cx<-300||cx>W+300) return; var cor='#3d2470';
    c.fillStyle=cor; c.fillRect(cx-170,250,340,200); for(var i=0;i<12;i++) c.fillRect(cx-170+i*30,240,16,12);
    [[-170,40,250,'dome'],[170,40,250,'dome'],[-80,46,320,'pena'],[60,60,370,'pote'],[0,0,0,'']].forEach(function(T){ if(!T[3]) return; var tx=cx+T[0], tw=T[1], th=T[2]; c.fillStyle=cor; c.fillRect(tx-tw/2,450-th,tw,th);
      if(T[3]==='dome'){ c.beginPath(); c.arc(tx,450-th,tw*.62,PI,TAU); c.fill(); c.fillRect(tx-3,450-th-tw*.62-14,6,16); }
      else if(T[3]==='pena'){ pena(c,tx,450-th+6,120,.12,cor,cor); }
      else { c.beginPath(); c.moveTo(tx-tw/2,450-th); c.quadraticCurveTo(tx-tw*.7,450-th-40,tx-tw*.25,450-th-56); c.lineTo(tx-tw*.25,450-th-74); c.lineTo(tx+tw*.25,450-th-74); c.lineTo(tx+tw*.25,450-th-56); c.quadraticCurveTo(tx+tw*.7,450-th-40,tx+tw/2,450-th); c.fill(); }
      for(var j=0;j<3;j++){ var wy=450-th+30+j*58; if(wy>430) break; var on=.65+.35*Math.sin(t*1.5+tx*.1+j); c.fillStyle='rgba(255,211,107,'+on.toFixed(2)+')'; c.beginPath(); c.moveTo(tx-6,wy+16); c.lineTo(tx-6,wy+5); c.arc(tx,wy+5,6,PI,TAU); c.lineTo(tx+6,wy+16); c.fill(); } });
    c.fillStyle='rgba(255,211,107,.85)'; c.beginPath(); c.moveTo(cx-20,450); c.lineTo(cx-20,410); c.arc(cx,410,20,PI,TAU); c.lineTo(cx+20,450); c.fill();
    c.fillStyle='#e879f9'; var fl=Math.sin(t*3)*3; c.beginPath(); c.moveTo(cx+60,450-370-74); c.lineTo(cx+60,450-370-104); c.quadraticCurveTo(cx+74,450-370-100+fl,cx+88,450-370-96+fl); c.lineTo(cx+60,450-370-88); c.fill(); });
  bruma(c,300,452,'rgba(120,70,180,.35)');
}
function pertoTinta(c,cam,t){
  rep(cam,1200,function(ox){ if(ox>W+200||ox<-1400) return;
    pilar(c,ox+90,150,92,1); pilar(c,ox+700,200,92,2);
    respingo(c,ox+124,290,20,'rgba(236,72,153,.7)',3); respingo(c,ox+158,392,12,'rgba(250,204,21,.7)',15); respingo(c,ox+742,310,22,'rgba(45,212,191,.65)',9);
    lanterna(c,ox+420,170,t); lanterna(c,ox+900,150,t);
    c.strokeStyle='#2a1d5c'; c.lineWidth=2; linha(c,ox+420,0,ox+420,140); linha(c,ox+900,0,ox+900,120);
    tinteiro(c,ox+360,452,1.25); pena(c,ox+344,362,120,-.38,'#f9a8d4'); pena(c,ox+378,364,104,.3,'#99f6e4');
    tinteiro(c,ox+1060,452,.9); pena(c,ox+1066,390,96,.18,'#fde68a');
    for(var i=0;i<4;i++){ var px=ox+((i*300+t*14)%1200), py=120+i*60+Math.sin(t*1.2+i*2)*14; if(px<-30||px>W+30) continue; c.save(); c.translate(px,py); c.rotate(Math.sin(t+i)*.3); c.fillStyle='#fdf6e3'; rr(c,-13,-17,26,34,2); c.fill(); c.strokeStyle='rgba(90,60,140,.45)'; c.lineWidth=1; for(var l=0;l<5;l++) linha(c,-8,-10+l*5,8-(l===4?6:0),-10+l*5); c.restore(); }
  });
}
function chaoTinta(c,s){
  var f=faixa(c,s,30), a=f[0], b=f[1], x; if(b<=a) return;
  c.save(); c.beginPath(); c.rect(s.x,s.y-6,s.w,s.h+6); c.clip();
  c.fillStyle='#2e1f52'; c.fillRect(s.x,s.y,s.w,s.h);
  for(var r=0;r*22+16<s.h;r++){ var y=s.y+16+r*22, off=r%2?20:0; for(x=grade(a-off,40)+off;x<b;x+=40){ c.fillStyle=mix('#5b3f8f','#3f2a70',Math.min(1,r*.18+hash(x*.3+r)*.25)); rr(c,x+1.5,y+1.5,37,19,3); c.fill(); } }
  for(x=grade(a,48);x<b;x+=48){ c.fillStyle=lin(c,0,s.y,0,s.y+16,'#a58ad8','#7a5cb4'); rr(c,x+1,s.y,46,16,4); c.fill(); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(x+4,s.y+2,40,2); }
  for(x=grade(a,150);x<b;x+=150){ var hv=hash(x*.7); if(hv>.45){ var px=x+hash(x+1)*90; c.fillStyle='#1c1240'; el(c,px,s.y+3,22,4); c.fill(); c.fillRect(px+6,s.y+3,6,14+hv*12); circ(c,px+9,s.y+17+hv*12,3.6); c.fill(); c.fillStyle='rgba(190,170,255,.55)'; el(c,px-6,s.y+2,6,1.4); c.fill(); } }
  bordas(c,s,'rgba(10,0,30,.45)'); c.restore();
}
function platTinta(c,p){
  sombraPlat(c,p,5); c.fillStyle=lin(c,0,p.y,0,p.y+p.h,'#8d70c6','#4f3585'); rr(c,p.x,p.y,p.w,p.h,5); c.fill();
  var n=Math.max(1,Math.round(p.w/45)); c.strokeStyle='rgba(30,15,60,.5)'; c.lineWidth=1.5; for(var i=1;i<n;i++) linha(c,p.x+p.w*i/n,p.y+2,p.x+p.w*i/n,p.y+p.h-2);
  c.fillStyle='rgba(255,255,255,.28)'; rr(c,p.x+3,p.y+1.5,p.w-6,3,1.5); c.fill();
  var dx=p.x+p.w*(.3+hash(p.x)*.4); c.fillStyle='#1c1240'; c.fillRect(dx-3,p.y+p.h-2,6,8+hash(p.x+1)*6); circ(c,dx,p.y+p.h+7+hash(p.x+1)*6,3.4); c.fill();
  c.fillStyle='#1c1240'; el(c,p.x+p.w*.75,p.y+2,10,2.5); c.fill();
}

/* ============================================================
   MAPA-LIVRO — livro de histórias aberto, visto de cima
   Nós: 1 vila, 2 floresta, 3 pista, 4 recife, 5 nuvens,
        6 ginásio, 7 estádio, 8 roda de biscoito, 9 castelo de tinta.
   Livre: y<70 (HUD), x>800 & 60<y<260 (botões), y>420 (cartão).
   ============================================================ */
A.MAPA_NOS=[{x:92,y:290},{x:190,y:214},{x:292,y:292},{x:394,y:212},{x:550,y:290},{x:626,y:212},{x:708,y:294},{x:762,y:216},{x:878,y:292}];
var VIN=[ /* centro de cada ilustração (acima dos nós altos, abaixo dos baixos) */ ];
A.MAPA_NOS.forEach(function(n,i){ var alto=n.y<240; VIN.push({x:n.x+(i===7?-20:0),y:alto?n.y-84:n.y+98,k:alto?1:.88,alto:alto}); });
function lavado(c,x,y,rx,ry,cor){ var g=c.createRadialGradient(x,y,2,x,y,rx); g.addColorStop(0,cor); g.addColorStop(1,'rgba(255,255,255,0)'); c.save(); c.translate(x,y); c.scale(1,ry/rx); c.translate(-x,-y); c.fillStyle=g; circ(c,x,y,rx); c.fill(); c.restore(); }
function paginas(c){
  /* mesa */
  c.fillStyle=lin(c,0,0,0,H,'#4a2a18','#2e1a0e'); c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(255,220,170,.06)'; c.lineWidth=2; for(var y=8;y<H;y+=22){ c.beginPath(); c.moveTo(0,y); for(var x=0;x<=W;x+=40) c.lineTo(x,y+Math.sin(x*.01+y)*3); c.stroke(); }
  /* capa */
  c.fillStyle='rgba(0,0,0,.4)'; rr(c,16,30,W-24,H-34,20); c.fill();
  c.fillStyle=lin(c,0,20,0,H-10,'#8e2a3a','#5e1624'); rr(c,10,20,W-20,H-30,18); c.fill();
  c.strokeStyle='rgba(224,176,74,.55)'; c.lineWidth=2; rr(c,18,28,W-36,H-46,14); c.stroke();
  /* bloco de páginas (bordas empilhadas) */
  for(var k=5;k>=1;k--){ c.fillStyle=k%2?'#e9d9b4':'#d8c497'; rr(c,26-k,34+k*1.2,W-52+2*k,H-58+k*.6,10); c.fill(); }
  function pagina(lado){ var x0=lado<0?30:W-30, xs=W/2; c.beginPath(); c.moveTo(x0,46); c.bezierCurveTo(x0+(xs-x0)*.35,32,x0+(xs-x0)*.8,34,xs,56); c.lineTo(xs,H-24); c.bezierCurveTo(x0+(xs-x0)*.8,H-38,x0+(xs-x0)*.35,H-40,x0,H-28); c.closePath();
    var g=c.createLinearGradient(x0,0,xs,0); g.addColorStop(0,'#eedcb3'); g.addColorStop(.12,'#faf0d6'); g.addColorStop(.7,'#f7e9c8'); g.addColorStop(.92,'#e0c999'); g.addColorStop(1,'#a8895a'); c.fillStyle=g; c.fill(); }
  pagina(-1); pagina(1);
  /* textura do papel */
  c.save(); c.beginPath(); c.rect(30,40,W-60,H-66); c.clip();
  for(var i=0;i<900;i++){ var px=hash(i*1.13)*W, py=40+hash(i*2.71)*(H-70); c.fillStyle=i%3?'rgba(150,110,60,.08)':'rgba(255,255,255,.25)'; c.fillRect(px,py,1.4,1.4); }
  c.strokeStyle='rgba(150,110,60,.06)'; c.lineWidth=1; for(i=0;i<140;i++){ var fx=hash(i+300)*W, fy=40+hash(i+600)*(H-70), a=hash(i+900)*PI; linha(c,fx,fy,fx+Math.cos(a)*9,fy+Math.sin(a)*9); }
  var vg=c.createLinearGradient(0,40,0,H-24); vg.addColorStop(0,'rgba(120,80,30,.12)'); vg.addColorStop(.12,'rgba(120,80,30,0)'); vg.addColorStop(.9,'rgba(120,80,30,0)'); vg.addColorStop(1,'rgba(120,80,30,.14)'); c.fillStyle=vg; c.fillRect(0,40,W,H-60);
  c.restore();
  /* lombada */
  var lg=c.createLinearGradient(W/2-22,0,W/2+22,0); lg.addColorStop(0,'rgba(90,60,20,0)'); lg.addColorStop(.5,'rgba(90,60,20,.4)'); lg.addColorStop(1,'rgba(90,60,20,0)'); c.fillStyle=lg; c.fillRect(W/2-22,52,44,H-76);
  c.strokeStyle='rgba(120,80,40,.5)'; c.lineWidth=1; c.save(); c.setLineDash([4,5]); linha(c,W/2,62,W/2,H-30); c.restore();
  /* cantos ornamentados */
  c.strokeStyle='rgba(150,95,40,.35)'; c.lineWidth=1.6; [[44,62,1,1],[W-44,62,-1,1]].forEach(function(o){ c.save(); c.translate(o[0],o[1]); c.scale(o[2],o[3]); c.beginPath(); c.moveTo(0,40); c.quadraticCurveTo(0,0,40,0); c.moveTo(8,30); c.quadraticCurveTo(10,10,30,8); c.stroke(); c.beginPath(); c.arc(16,16,4,0,TAU); c.stroke(); c.restore(); });
}
function trilha(c){
  var P=A.MAPA_NOS; c.lineCap='round'; c.lineJoin='round';
  for(var i=0;i<P.length-1;i++){ var a=P[i], b=P[i+1], mx=(a.x+b.x)/2, my=(a.y+b.y)/2-24;
    c.strokeStyle='rgba(196,150,90,.32)'; c.lineWidth=18; c.beginPath(); c.moveTo(a.x,a.y); c.quadraticCurveTo(mx,my,b.x,b.y); c.stroke();
    [.3,.7].forEach(function(u,k){ var p=pontoQ(a.x,a.y,mx,my,b.x,b.y,u), q=pontoQ(a.x,a.y,mx,my,b.x,b.y,u+.02), nx=-(q[1]-p[1]), ny=q[0]-p[0], L=Math.hypot(nx,ny)||1, sg=(i+k)%2?1:-1, tx=p[0]+nx/L*20*sg, ty=p[1]+ny/L*20*sg; c.strokeStyle=LAV[i].replace(/,\.4\d?\)/,',.75)'); c.lineWidth=1.4; for(var m=-1;m<=1;m++){ linha(c,tx+m*3,ty+3,tx+m*4.5,ty-4-(m===0?2:0)); } });
    c.strokeStyle='rgba(140,95,45,.28)'; c.lineWidth=1.5; c.save(); c.setLineDash([2,6]); c.translate(0,7); c.beginPath(); c.moveTo(a.x,a.y); c.quadraticCurveTo(mx,my,b.x,b.y); c.stroke(); c.translate(0,-14); c.beginPath(); c.moveTo(a.x,a.y); c.quadraticCurveTo(mx,my,b.x,b.y); c.stroke(); c.restore(); }
  c.lineCap='butt';
}
var LAV=['rgba(120,200,110,.4)','rgba(40,120,70,.4)','rgba(240,170,90,.4)','rgba(70,170,230,.42)','rgba(150,200,250,.45)','rgba(170,140,230,.4)','rgba(90,190,110,.4)','rgba(230,170,100,.42)','rgba(140,90,200,.42)'];
var VIG=[
  function(c){ /* 1 vila */ c.fillStyle='#98c79e'; el(c,0,0,54,8); c.fill(); A.CN.castelo(c,28,-4,.27,0); A.CN.arvoreR(c,-50,0,30,'#4f8f4a','#6fb35e'); c.save(); c.scale(.25,.25); A.CN.casa(c,-196,0,150,104,62,{teto:'#c4553b',jan:'#3f8f5a'},0); A.CN.casa(c,-26,0,128,150,70,{teto:'#4f6fae',jan:'#c2410c'},0); c.restore(); flor(c,-46,-2,1.6,'#f472b6'); flor(c,30,-1,1.6,'#fde047'); },
  function(c){ /* 2 floresta */ c.fillStyle='#4f8a3c'; el(c,0,0,50,7); c.fill(); A.CN.arvoreR(c,-28,0,58,'#2f6b4a','#3f8a5a','#5a3a2a'); A.CN.arvoreR(c,4,0,68,'#255a40','#357a50','#5a3a2a'); A.CN.arvoreR(c,32,0,52,'#2f6b4a','#3f8a5a','#5a3a2a'); A.CN.cogumelo(c,-8,2,.45,'#d9433b','#fff7ed',null,0); A.CN.cogumelo(c,44,2,.3,'#4cc3dd','#e0fbff',null,0); },
  function(c){ /* 3 pista */ c.save(); c.translate(0,-14); c.fillStyle='#9fd08a'; el(c,0,0,54,24); c.fill(); c.strokeStyle='#d9824a'; c.lineWidth=11; el(c,0,0,44,16); c.stroke(); c.strokeStyle='#fff'; c.lineWidth=1.2; c.save(); c.setLineDash([4,4]); el(c,0,0,44,16); c.stroke(); c.restore();
    for(var q=0;q<4;q++) for(var r=0;r<2;r++){ c.fillStyle=(q+r)%2?'#1f2937':'#fff'; c.fillRect(-49+q*3,-4+r*3,3,3); }
    A.CN.arvoreR(c,-2,4,22,'#4f8f4a','#6fb35e'); c.strokeStyle='#6b4a2a'; c.lineWidth=2; linha(c,36,-4,36,-40); for(q=0;q<4;q++) for(r=0;r<3;r++){ c.fillStyle=(q+r)%2?'#1f2937':'#fff'; c.fillRect(37+q*4,-40+r*4,4,4); } c.restore(); },
  function(c){ /* 4 recife */ var g=c.createRadialGradient(0,-26,4,0,-26,56); g.addColorStop(0,'rgba(80,190,240,.75)'); g.addColorStop(1,'rgba(80,190,240,.15)'); c.fillStyle=g; el(c,0,-24,56,34); c.fill();
    c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.2; for(var q=0;q<3;q++){ c.beginPath(); c.arc(-28+q*24,-50,6,PI*1.1,PI*1.9); c.stroke(); }
    c.fillStyle='#efd59a'; el(c,0,0,50,6); c.fill(); A.CN.coralGalho(c,-26,0,58,'#f27ba6',1); A.CN.coralCerebro(c,12,0,13,'#f2a65a'); A.CN.leque(c,34,0,30,'#9b6bd6',0); A.CN.peixe(c,-4,-30,1,1,'#f97316'); A.CN.peixe(c,20,-40,.8,-1,'#facc15'); },
  function(c){ /* 5 nuvens */ A.CN.nuvemF(c,-16,-6,.78,'#ffffff','#c9d8f0',1); A.CN.nuvemF(c,22,-22,.55,'#ffffff','#c9d8f0',1); A.CN.balao(c,30,-36,.42,['#f87171','#fde68a'],0); c.strokeStyle='rgba(60,90,130,.5)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-44,-44); c.quadraticCurveTo(-41,-47,-38,-44); c.quadraticCurveTo(-35,-47,-32,-44); c.stroke(); },
  function(c){ /* 6 ginásio */ c.fillStyle='#3b82f6'; rr(c,-50,-6,100,9,3); c.fill(); c.fillStyle='#c2955f'; rr(c,-8,-26,52,5,2.5); c.fill(); c.fillStyle='#9aa3b5'; c.fillRect(0,-21,3,15); c.fillRect(34,-21,3,15);
    c.strokeStyle='#5b4a3a'; c.lineWidth=1.5; linha(c,22,-60,48,-60); linha(c,29,-60,29,-38); linha(c,41,-60,41,-38); c.strokeStyle='#b88a52'; c.lineWidth=2.5; circ(c,29,-34,4.5); c.stroke(); circ(c,41,-34,4.5); c.stroke();
    c.strokeStyle='#8a5a30'; c.lineWidth=2; linha(c,-42,-6,-34,-36); c.strokeStyle='#ec4899'; c.lineWidth=2.6; c.lineCap='round'; c.beginPath(); c.moveTo(-34,-36); c.bezierCurveTo(-8,-70,12,-32,-12,-36); c.bezierCurveTo(-34,-40,-22,-66,2,-62); c.bezierCurveTo(18,-60,10,-48,4,-50); c.stroke(); c.lineCap='butt'; A.estrela(c,-44,-56,6,'#facc15',0); },
  function(c){ /* 7 estádio */ c.save(); c.translate(0,-14); c.fillStyle='#64748b'; el(c,0,4,54,22); c.fill(); c.fillStyle='#ef4444'; el(c,0,0,52,20); c.fill(); c.fillStyle='#2563eb'; c.beginPath(); c.ellipse(0,0,52,20,0,0,PI); c.fill(); c.fillStyle='#4caf50'; el(c,0,0,38,12); c.fill(); c.strokeStyle='#fff'; c.lineWidth=1.2; el(c,0,0,34,10); c.stroke(); linha(c,0,-10,0,10); el(c,0,0,6,3); c.stroke();
    [-46,46].forEach(function(d){ c.strokeStyle='#475569'; c.lineWidth=2; linha(c,d,0,d,-32); c.fillStyle='#fffbe6'; rr(c,d-6,-38,12,7,2); c.fill(); brilho(c,d,-34,14,'rgba(255,250,200,.8)',.8); }); bola(c,24,-4,4); c.restore(); },
  function(c){ /* 8 roda de biscoito */ c.save(); c.translate(0,-18); c.fillStyle='rgba(180,120,60,.25)'; el(c,0,8,48,20); c.fill(); for(var q=0;q<7;q++){ var aq=q*TAU/7+PI/2; if(Math.sin(aq)<0) biscoitoG(c,Math.cos(aq)*36,Math.sin(aq)*16+4,10,aq,q*5); }
    c.fillStyle='rgba(230,246,255,.6)'; rr(c,-10,-26,20,34,4); c.fill(); c.fillStyle='#fffef8'; c.fillRect(-9,-17,18,24); c.strokeStyle='rgba(150,185,210,.9)'; c.lineWidth=1.2; rr(c,-10,-26,20,34,4); c.stroke();
    for(q=0;q<7;q++){ aq=q*TAU/7+PI/2; if(Math.sin(aq)>=0) biscoitoG(c,Math.cos(aq)*36,Math.sin(aq)*16+4,10,aq,q*5); } c.restore(); },
  function(c){ /* 9 castelo de tinta */ c.fillStyle='#5b3f8f'; el(c,0,0,52,7); c.fill(); c.fillStyle='#6b4fa3'; c.fillRect(-30,-30,60,30); c.fillRect(-36,-46,14,46); c.fillRect(22,-46,14,46); c.fillRect(-8,-58,16,58);
    c.beginPath(); c.arc(-29,-46,9,PI,TAU); c.fill(); c.beginPath(); c.arc(29,-46,9,PI,TAU); c.fill(); pena(c,0,-56,20,.1,'#8a6cc2','#6b4fa3'); c.fillStyle='#ffd36b'; c.fillRect(-2,-40,4,6); c.fillRect(-31,-34,4,5); c.fillRect(27,-34,4,5); c.beginPath(); c.arc(0,0,7,PI,TAU); c.fill();
    tinteiro(c,46,0,.3); pena(c,48,-20,26,.3,'#f9a8d4'); respingo(c,-46,-10,6,'rgba(28,18,64,.8)',4); c.fillStyle='#fff3c4'; circ(c,-42,-52,7); c.fill(); c.fillStyle='rgba(247,236,214,1)'; circ(c,-38,-54,6); c.fill(); }
];
function vinhetas(c){
  VIN.forEach(function(v,i){ lavado(c,v.x,v.y+6,74*v.k,44*v.k,LAV[i]); });
  VIN.forEach(function(v,i){ c.save(); c.translate(v.x,v.y); c.scale(v.k,v.k); c.translate(0,24); VIG[i](c); c.restore(); });
}
var doodles=function(c){ c.strokeStyle='rgba(120,80,40,.3)'; c.lineWidth=1.2; [[470,250],[455,120],[150,380],[640,395],[800,300]].forEach(function(d){ A.estrela(c,d[0],d[1],4,'rgba(200,150,60,.35)',0); });
  c.beginPath(); c.moveTo(560,240); c.quadraticCurveTo(566,234,572,240); c.quadraticCurveTo(578,234,584,240); c.stroke(); c.beginPath(); c.moveTo(80,110); c.quadraticCurveTo(86,104,92,110); c.quadraticCurveTo(98,104,104,110); c.stroke(); };
A.mapaLivro=function(c,t){
  t=t||0; var base=cache('mapaLivro',W,H,function(x){ paginas(x); trilha(x); doodles(x); vinhetas(x); });
  c.drawImage(base,0,0,W,H);
  /* vida: bolhas no recife, brilhos na página, bandeira da vila */
  var v=VIN[3]; for(var i=0;i<4;i++){ var by=v.y+16-((t*14+i*11)%44); N.bolha(c,v.x-30+i*18+Math.sin(t*2+i)*2,by,2+i%2,.8); }
  for(i=0;i<7;i++){ var a=Math.abs(Math.sin(t*1.3+i*1.9)); if(a>.75){ var sx=60+hash(i+77)*700, sy=90+hash(i+31)*310; cintila(c,sx,sy,3+4*(a-.75)*4,'rgba(255,236,170,'+(a*.9).toFixed(2)+')'); } }
  v=VIN[4]; A.CN.nuvemF(c,v.x-60+((t*6)%120),v.y-20,.3,'#ffffff','#dde8f7',.75*(1-Math.abs(((t*6)%120)/60-1)));
};

/* ---------- registro no embrulho de cenas de arte3 ---------- */
N.registra('ginasio',{ceu:ceuGin,longe:longeGin,perto:pertoGin,chao:chaoGin,plat:platGin});
N.registra('estadio',{ceu:ceuEst,longe:longeEst,perto:pertoEst,chao:chaoEst,plat:platEst});
N.registra('biscoito',{ceu:ceuBisc,longe:longeBisc,perto:pertoBisc,chao:chaoBisc,plat:platBisc});
N.registra('tinta',{ceu:ceuTinta,longe:longeTinta,perto:pertoTinta,chao:chaoTinta,plat:platTinta});
A.CN.biscoitoG=biscoitoG; A.CN.pena=pena; A.CN.tinteiro=tinteiro; A.CN.bola=bola;
})();
