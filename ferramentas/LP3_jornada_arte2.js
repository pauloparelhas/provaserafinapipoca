/* ============================================================
   LP3_jornada_arte2.js — a arte NOVA da v2, somada a window.ARTE:
   bichos canadenses (gambá, carcaju, ganso), canos, molas, espinhos,
   pingentes, tijolos, moedas, troncos rolando, água, os submundos
   (caverna, gelo, mina), decoração viva do mapa e a íris de transição.
   Tudo desenhado por código — nenhuma imagem, nenhum emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;

/* ---------- submundos: céu/chão ---------- */
A.CENAS.sub_caverna={ceu:['#1c1917','#292524','#3f2a1a'], chaoTop:'#78350f', chao:'#57534e', chaoBase:'#1c1917', plat:'#6b4a2a', platTop:'#a16207', part:'pingo', musica:'sub_caverna'};
A.CENAS.sub_gelo   ={ceu:['#0f172a','#1e3a8a','#1e40af'], chaoTop:'#bae6fd', chao:'#3b82f6', chaoBase:'#1e3a8a', plat:'#93c5fd', platTop:'#e0f2fe', part:'neve', musica:'sub_gelo'};
A.CENAS.sub_mina   ={ceu:['#18181b','#27272a','#3f3f46'], chaoTop:'#a16207', chao:'#44403c', chaoBase:'#18181b', plat:'#78716c', platTop:'#d6d3d1', part:'faisca', musica:'sub_mina'};

/* ---------- fundo dos submundos (câmera já multiplicada) ---------- */
A.fundoSub=function(c,cena,cam,t){
  var i,x;
  if(cena==='sub_caverna'){ c.fillStyle='rgba(120,53,15,.25)'; for(i=0;i<9;i++){ x=((i*150-cam)%(W+200)+W+200)%(W+200)-100; el(c,x,120+hash(i)*200,60+hash(i+2)*40,90+hash(i+5)*60); c.fill(); }
    c.fillStyle='rgba(0,0,0,.35)'; for(i=0;i<12;i++){ x=((i*110-cam)%(W+200)+W+200)%(W+200)-100; c.beginPath(); c.moveTo(x-18,90); c.lineTo(x,90+60+hash(i)*70); c.lineTo(x+18,90); c.fill(); }
    for(i=0;i<5;i++){ x=((i*260-cam)%(W+300)+W+300)%(W+300)-150; var gl=.5+Math.sin(t*2+i)*.3; c.fillStyle='rgba(252,211,77,'+gl*.35+')'; circ(c,x,330,40); c.fill(); c.fillStyle='#fbbf24'; circ(c,x,330,6); c.fill(); c.fillStyle='#78350f'; c.fillRect(x-3,336,6,30); } }
  else if(cena==='sub_gelo'){ c.fillStyle='rgba(224,242,254,.12)'; for(i=0;i<10;i++){ x=((i*140-cam)%(W+200)+W+200)%(W+200)-100; c.beginPath(); c.moveTo(x-40,460); c.lineTo(x,160+hash(i)*120); c.lineTo(x+40,460); c.fill(); }
    c.fillStyle='rgba(255,255,255,.5)'; for(i=0;i<30;i++){ x=((i*47-cam*.5)%(W+40)+W+40)%(W+40)-20; c.globalAlpha=.3+.5*Math.abs(Math.sin(t*2+i)); circ(c,x,100+hash(i)*300,1.5); c.fill(); } c.globalAlpha=1; }
  else { c.strokeStyle='rgba(120,113,108,.6)'; c.lineWidth=14; for(i=0;i<8;i++){ x=((i*180-cam)%(W+300)+W+300)%(W+300)-150; c.beginPath(); c.moveTo(x,90); c.lineTo(x,450); c.stroke(); c.beginPath(); c.moveTo(x-50,120); c.lineTo(x+50,120); c.stroke(); }
    c.fillStyle='#fbbf24'; for(i=0;i<5;i++){ x=((i*300-cam)%(W+300)+W+300)%(W+300)-150; var g2=c.createRadialGradient(x,160,2,x,160,70); g2.addColorStop(0,'rgba(253,224,71,.6)'); g2.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g2; circ(c,x,160,70); c.fill(); c.fillStyle='#fde68a'; circ(c,x,160,7); c.fill(); }
    c.fillStyle='rgba(0,0,0,.4)'; for(i=0;i<6;i++){ x=((i*230-cam*.8)%(W+300)+W+300)%(W+300)-150; c.fillRect(x,400,70,50); c.fillStyle='#57534e'; c.fillRect(x+6,406,58,38); c.fillStyle='rgba(0,0,0,.4)'; } }
  /* teto */
  c.fillStyle='rgba(0,0,0,.45)'; c.fillRect(0,0,W,90);
};

/* ---------- gambá (listra branca), carcaju (marrom forte), ganso-do-canadá ---------- */
A.gamba=function(c,x,y,t,dir,achatado){
  c.save(); c.translate(x,y); c.scale(dir,achatado?.35:1); var w=Math.sin(t*10)*2;
  c.fillStyle='#111827'; el(c,-20,-22,10,14); c.fill(); c.fillStyle='#f8fafc'; el(c,-20,-24,5,10); c.fill();
  c.fillStyle=lin(c,0,-30,0,0,'#1f2937','#111827'); el(c,0,-15,16,13); c.fill();
  c.fillStyle='#f8fafc'; c.beginPath(); c.moveTo(-14,-26); c.quadraticCurveTo(0,-32,14,-26); c.lineTo(14,-20); c.quadraticCurveTo(0,-26,-14,-20); c.fill();
  c.fillStyle='#111827'; circ(c,12,-24,9); c.fill(); c.fillStyle='#f8fafc'; c.fillRect(10,-33,4,10);
  c.fillStyle='#fff'; circ(c,15,-25,2.6); c.fill(); c.fillStyle='#111'; circ(c,16,-25,1.4); c.fill(); c.fillStyle='#f472b6'; el(c,21,-21,2.5,2); c.fill();
  c.fillStyle='#111827'; el(c,-6+w,-1,6,3); c.fill(); el(c,8-w,-1,6,3); c.fill(); c.restore();
};
A.carcaju=function(c,x,y,t,dir,achatado){
  c.save(); c.translate(x,y); c.scale(dir,achatado?.35:1); var w=Math.sin(t*14)*3;
  c.fillStyle='#3f2a14'; el(c,-20,-14,10,5); c.fill();
  c.fillStyle=lin(c,0,-32,0,0,'#6b4423','#3f2a14'); el(c,0,-16,19,14); c.fill();
  c.fillStyle='#b08a5a'; c.beginPath(); c.moveTo(-16,-22); c.quadraticCurveTo(0,-14,16,-22); c.lineTo(16,-16); c.quadraticCurveTo(0,-8,-16,-16); c.fill();
  c.fillStyle='#4a2e14'; circ(c,13,-24,10); c.fill(); c.fillStyle='#4a2e14'; circ(c,8,-32,3.5); c.fill(); circ(c,18,-32,3.5); c.fill();
  c.fillStyle='#fff'; circ(c,16,-25,3); c.fill(); c.fillStyle='#111'; circ(c,17,-25,1.6); c.fill(); c.strokeStyle='#111'; c.lineWidth=1.5; c.beginPath(); c.moveTo(12,-30); c.lineTo(19,-28); c.stroke();
  c.fillStyle='#fff'; rr(c,18,-20,5,3,1); c.fill();
  c.fillStyle='#3f2a14'; el(c,-8+w,-1,6,3); c.fill(); el(c,8-w,-1,6,3); c.fill(); c.restore();
};
A.ganso=function(c,x,y,t,dir){
  c.save(); c.translate(x,y-30); c.scale(dir,1); var asa=Math.sin(t*9)*.7;
  c.fillStyle='#78716c'; el(c,0,0,20,10); c.fill(); c.fillStyle='#f5f5f4'; el(c,-6,4,10,5); c.fill();
  c.save(); c.rotate(-asa); c.fillStyle='#57534e'; c.beginPath(); c.moveTo(-4,-2); c.lineTo(-28,-14-asa*10); c.lineTo(8,-4); c.fill(); c.restore();
  c.fillStyle='#1c1917'; rr(c,14,-16,7,18,3); c.fill(); circ(c,20,-16,7); c.fill(); c.fillStyle='#f5f5f4'; el(c,22,-14,3.5,5); c.fill();
  c.fillStyle='#1c1917'; c.beginPath(); c.moveTo(26,-16); c.lineTo(34,-14); c.lineTo(26,-12); c.fill(); c.fillStyle='#fff'; circ(c,21,-18,1.6); c.fill();
  c.restore();
};
A.polar=function(c,x,y,t,dir,achatado){
  c.save(); c.translate(x,y); c.scale(dir,achatado?.35:1); var w=Math.sin(t*6)*3;
  c.fillStyle=lin(c,0,-50,0,0,'#ffffff','#cbd5e1'); el(c,0,-24,28,20); c.fill();
  c.fillStyle='#e2e8f0'; el(c,-4,-16,16,10); c.fill();
  c.fillStyle='#f8fafc'; circ(c,24,-36,13); c.fill(); circ(c,19,-47,4); c.fill(); circ(c,30,-47,4); c.fill();
  c.fillStyle='#111'; circ(c,36,-34,3.5); c.fill(); circ(c,27,-39,2); c.fill(); c.fillStyle='#fff'; circ(c,28,-40,.8); c.fill();
  c.fillStyle='#e2e8f0'; rr(c,-22,-10,12,12,5); c.fill(); rr(c,-8+w,-10,12,12,5); c.fill(); rr(c,6-w,-10,12,12,5); c.fill(); rr(c,18,-10,12,12,5); c.fill();
  c.restore();
};
A.canhao=function(c,g,t){
  c.save(); c.translate(g.x,g.y); var rec=g.t>0?g.t*20:0;
  c.fillStyle='#374151'; rr(c,-18,8,36,14,4); c.fill(); c.fillStyle='#111827'; circ(c,-10,22,6); c.fill(); circ(c,10,22,6); c.fill();
  c.save(); c.translate(rec,0); c.fillStyle=lin(c,-30,-14,-30,14,'#4b5563','#1f2937'); rr(c,-34,-12,44,24,10); c.fill(); c.fillStyle='#111827'; circ(c,-32,0,10); c.fill(); c.restore();
  c.fillStyle='#fff'; circ(c,-32-rec,0,6); c.fill(); c.restore();
};
A.porta=function(c,k,t,cena){
  c.save(); c.translate(k.x,k.y); var gelo=/gelo|canal|aurora/.test(cena);
  c.fillStyle=k.aberta?lin(c,0,0,0,k.h,'#e2e8f0','#64748b'):lin(c,0,0,0,k.h,gelo?'#bae6fd':'#9a6b3a',gelo?'#3b82f6':'#5c3a1a'); rr(c,0,0,k.w,k.h,8); c.fill();
  c.strokeStyle=k.aberta?'#cbd5e1':'#fde68a'; c.lineWidth=3; rr(c,3,3,k.w-6,k.h-6,6); c.stroke();
  if(k.aberta){ c.fillStyle='#334155'; c.font='900 28px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('?',k.w/2,k.h*.42); c.fillStyle='#475569'; circ(c,k.w-10,k.h*.6,3.5); c.fill(); }
  else { var pul=1+Math.sin(t*4)*.08; c.save(); c.translate(k.w/2,k.h*.42); c.scale(pul,pul); c.fillStyle='#fde68a'; c.font='900 30px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('?',0,0); c.restore(); c.fillStyle='#fbbf24'; circ(c,k.w-10,k.h*.6,3.5); c.fill(); }
  c.restore();
};
A.bolaRolando=function(c,b,t,cena){
  var barril=/agua|mar|farol/.test(cena); c.save(); c.translate(b.x,b.y); c.rotate(b.rot||0);
  if(barril){ c.fillStyle=lin(c,-20,-20,20,20,'#a16207','#78350f'); rr(c,-b.r,-b.r,b.r*2,b.r*2,8); c.fill(); c.strokeStyle='#451a03'; c.lineWidth=3; c.beginPath(); c.moveTo(-b.r,-8); c.lineTo(b.r,-8); c.moveTo(-b.r,8); c.lineTo(b.r,8); c.stroke(); }
  else { c.fillStyle='#fff'; circ(c,0,0,b.r); c.fill(); c.fillStyle='rgba(148,163,184,.4)'; circ(c,b.r*.3,b.r*.3,b.r*.5); c.fill(); c.fillStyle='rgba(255,255,255,.9)'; circ(c,-b.r*.35,-b.r*.35,b.r*.25); c.fill(); }
  c.restore();
};
A.trava=function(c,g,t,cena){
  var gelo=/gelo|canal|aurora|castelo|montanha/.test(cena), k=g.aberta?Math.min(1,g.anim):0; if(k>=1) return;
  c.save(); c.globalAlpha=1-k; c.translate(g.x,g.y+k*g.h);
  if(gelo){ c.fillStyle=lin(c,0,0,g.w,0,'rgba(191,235,255,.95)','rgba(96,165,250,.9)'); rr(c,2,0,g.w-4,g.h,8); c.fill(); c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=2; for(var i=1;i<6;i++){ c.beginPath(); c.moveTo(8,g.h*i/6); c.lineTo(g.w-8,g.h*i/6+6); c.stroke(); } }
  else { c.fillStyle=lin(c,0,0,g.w,0,'#8b5a2b','#5c3a1a'); rr(c,4,0,g.w-8,g.h,6); c.fill(); c.fillStyle='#d4a26a'; for(var j=0;j<g.h;j+=45){ rr(c,0,j+10,g.w,8,3); c.fill(); } }
  var cy=g.h*.45; c.fillStyle='rgba(13,11,30,.75)'; circ(c,g.w/2,cy,20); c.fill(); A.cadeado(c,g.w/2,cy+2);
  c.fillStyle='#fde68a'; c.font='900 20px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('?',g.w/2,cy-40);
  c.restore();
};
/* destaque de elemento pendente: brilho pulsando + seta grande animada apontando */
A.destaque=function(c,x,y,t,txt){
  var p=.5+.5*Math.sin(t*5); c.save();
  var g=c.createRadialGradient(x,y,10,x,y,70+p*20); g.addColorStop(0,'rgba(253,224,71,'+(.35+.25*p)+')'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; circ(c,x,y,90); c.fill();
  var by=Math.max((window.JOGO?JOGO.J.camY:0)+150,y-70-p*12); c.fillStyle='#fde68a'; c.strokeStyle='#78350f'; c.lineWidth=3; c.beginPath(); c.moveTo(x,by+26); c.lineTo(x-22,by); c.lineTo(x-9,by); c.lineTo(x-9,by-26); c.lineTo(x+9,by-26); c.lineTo(x+9,by); c.lineTo(x+22,by); c.closePath(); c.fill(); c.stroke();
  if(txt){ c.font='900 14px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; var tw=c.measureText(txt).width+16; c.fillStyle='rgba(13,11,30,.8)'; rr(c,x-tw/2,by-52,tw,22,8); c.fill(); c.fillStyle='#fff'; c.fillText(txt,x,by-41); }
  c.restore();
};
var inimigo1=A.inimigo;
A.inimigo=function(c,e,t){
  if(e.tipo==='polar') A.polar(c,e.x,e.y,t,e.dir,e.achatado);
  else if(e.tipo==='gamba') A.gamba(c,e.x,e.y,t,e.dir,e.achatado);
  else if(e.tipo==='carcaju') A.carcaju(c,e.x,e.y,t,e.dir,e.achatado);
  else if(e.tipo==='ganso') A.ganso(c,e.x,e.y,t,e.dir);
  else inimigo1(c,e,t);
};

/* ---------- cano (verde Mario-like, mas com folha de bordo) ---------- */
A.cano=function(c,p,cena,t,marcado){
  var gelo=/gelo|aurora|castelo/.test(cena), c1=gelo?'#7dd3fc':'#4ade80', c2=gelo?'#0369a1':'#166534';
  c.fillStyle=lin(c,p.x,0,p.x+p.w,0,c1,c2); c.fillRect(p.x+4,p.y+16,p.w-8,p.h-16);
  c.fillStyle=lin(c,p.x,0,p.x+p.w,0,c1,c2); rr(c,p.x,p.y,p.w,22,5); c.fill();
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(p.x+10,p.y+4,6,14); c.fillRect(p.x+14,p.y+26,5,p.h-30);
  c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(p.x+p.w-14,p.y+24,8,p.h-28);
  if(marcado){ var b=Math.sin(t*5)*4; c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(p.x+p.w/2,p.y-10+b); c.lineTo(p.x+p.w/2-12,p.y-30+b); c.lineTo(p.x+p.w/2+12,p.y-30+b); c.fill(); c.font='900 13px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.fillText('↓',p.x+p.w/2,p.y-36+b); }
};
/* ---------- mola ---------- */
A.mola=function(c,m,t){
  var comp=m.t>0?.5:1; c.save(); c.translate(m.x+m.w/2,m.y+m.h);
  c.strokeStyle='#9ca3af'; c.lineWidth=3; c.beginPath(); for(var i=0;i<5;i++){ c.moveTo(-10,-i*5*comp); c.lineTo(10,-i*5*comp-2.5*comp); } c.stroke();
  c.fillStyle=lin(c,-20,0,20,0,'#f87171','#b91c1c'); rr(c,-m.w/2,-26*comp-4,m.w,8,3); c.fill();
  c.fillStyle='#4b5563'; rr(c,-m.w/2+4,-4,m.w-8,5,2); c.fill(); c.restore();
};
/* ---------- espinhos / pingentes ---------- */
A.espinhos=function(c,s,cena){
  var gelo=/gelo|aurora/.test(cena); c.fillStyle=gelo?'#e0f2fe':'#9ca3af'; c.beginPath();
  for(var x=s.x;x<s.x+s.w;x+=15){ c.moveTo(x,s.y+s.h); c.lineTo(x+7.5,s.y); c.lineTo(x+15,s.y+s.h); } c.fill();
  c.fillStyle=gelo?'rgba(59,130,246,.6)':'#4b5563'; c.beginPath(); for(var x2=s.x;x2<s.x+s.w;x2+=15){ c.moveTo(x2+7.5,s.y); c.lineTo(x2+15,s.y+s.h); c.lineTo(x2+11,s.y+s.h); } c.fill();
};
A.pingente=function(c,p,t){
  if(p.estado==='sumiu') return; var trem=p.estado==='tremendo'?Math.sin(t*60)*2:0;
  c.save(); c.translate(p.x+trem,p.y); c.fillStyle=lin(c,-10,0,10,0,'#e0f2fe','#7dd3fc'); c.beginPath(); c.moveTo(-10,0); c.lineTo(10,0); c.lineTo(0,44); c.fill();
  c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.moveTo(-6,2); c.lineTo(-2,2); c.lineTo(-1,30); c.fill(); c.restore();
};
/* ---------- tijolo, moeda, tronco, água ---------- */
A.tijolo=function(c,b,cena){
  if(!b.vivo) return; var y=b.y-(b.bump||0);
  c.fillStyle=lin(c,0,y,0,y+b.h,'#c2410c','#7c2d12'); rr(c,b.x+1,y+1,b.w-2,b.h-2,4); c.fill();
  c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=2; c.beginPath(); c.moveTo(b.x+2,y+b.h/2); c.lineTo(b.x+b.w-2,y+b.h/2); c.moveTo(b.x+b.w/2,y+2); c.lineTo(b.x+b.w/2,y+b.h/2); c.moveTo(b.x+b.w*.25,y+b.h/2); c.lineTo(b.x+b.w*.25,y+b.h-2); c.moveTo(b.x+b.w*.75,y+b.h/2); c.lineTo(b.x+b.w*.75,y+b.h-2); c.stroke();
  c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(b.x+4,y+3,b.w-8,4);
};
A.moeda=function(c,m,t){
  if(m.pega) return; var k=Math.abs(Math.cos(t*4+m.x*.05)), r=m.r, bob=Math.sin(t*3+m.x*.02)*3;
  c.save(); c.translate(m.x,m.y+bob);
  var g=c.createRadialGradient(0,0,r*.2,0,0,r*1.9); g.addColorStop(0,'rgba(253,224,71,.45)'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; circ(c,0,0,r*1.9); c.fill();
  c.fillStyle=lin(c,-r,-r,r,r,'#fde68a','#d97706'); el(c,0,0,r*k,r); c.fill();
  c.strokeStyle='#b45309'; c.lineWidth=2; el(c,0,0,r*.7*k,r*.7); c.stroke();
  if(k>.5){ c.save(); c.scale(k,1); A.folha(c,0,0,r*.5,0,m.big?'#b91c1c':'#b45309'); c.restore(); }
  if(m.big){ var s=Math.abs(Math.sin(t*6)); c.fillStyle='rgba(255,255,255,'+(.4+s*.5)+')'; A.estrela(c,-r*.6,-r*.7,4,'#fff',t*2); }
  c.restore();
};
A.tronco=function(c,b,t){
  c.save(); c.translate(b.x,b.y); c.rotate(b.rot||0);
  c.fillStyle=lin(c,-20,-20,20,20,'#8b5a2b','#4a2e14'); circ(c,0,0,b.r); c.fill();
  c.fillStyle='#d4a26a'; circ(c,0,0,b.r*.65); c.fill(); c.strokeStyle='#8b5a2b'; c.lineWidth=1.5; circ(c,0,0,b.r*.4); c.stroke(); circ(c,0,0,b.r*.18); c.stroke();
  c.fillStyle='#4a2e14'; for(var i=0;i<4;i++){ var a=i*PI/2; c.fillRect(Math.cos(a)*b.r*.8-2,Math.sin(a)*b.r*.8-2,4,4); }
  c.restore();
};
A.agua=function(c,a,t,cam){
  c.fillStyle=lin(c,0,a.y,0,a.y+a.h,'rgba(56,189,248,.85)','rgba(3,105,161,.95)'); c.fillRect(a.x,a.y+6,a.w,a.h-6);
  c.fillStyle='rgba(224,242,254,.9)'; c.beginPath(); c.moveTo(a.x,a.y+10); for(var x=a.x;x<=a.x+a.w;x+=10){ c.lineTo(x,a.y+6+Math.sin(x*.08+t*3)*4); } c.lineTo(a.x+a.w,a.y+16); c.lineTo(a.x,a.y+16); c.fill();
  c.fillStyle='rgba(255,255,255,.35)'; for(var x2=a.x+10;x2<a.x+a.w;x2+=38){ el(c,x2+Math.sin(t+x2)*6,a.y+26+hash(x2)*20,10,3); c.fill(); }
};
/* ---------- plataforma que cai / móvel ---------- */
A.platMovel=function(c,p,cena,t){
  var ox=(p.x0!=null?p.x-p.x0:0), oy=(p.y0!=null?p.y-p.y0:0), q=Object.create(p); q.x=p.x-ox; q.y=p.y-oy; /* desenha na ORIGEM e translada: a decoração sorteada pela posição não pisca */
  c.save(); c.translate(ox,oy); A.plataforma(c,q,cena); c.fillStyle='rgba(0,0,0,.35)'; for(var i=0;i<2;i++){ circ(c,q.x+10+i*(q.w-20),q.y+q.h-5,3); c.fill(); }
  c.strokeStyle='rgba(255,255,255,.25)'; c.lineWidth=2; c.beginPath(); c.moveTo(q.x+q.w/2-14,q.y+q.h+6); c.lineTo(q.x+q.w/2+14,q.y+q.h+6); c.stroke(); c.restore();
};
A.platCaindo=function(c,p,cena,t){
  var trem=p.estado==='tremendo'?Math.sin(t*50)*2:0; c.save(); c.translate(trem,0); A.plataforma(c,p,cena);
  c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=2; c.beginPath(); c.moveTo(p.x+p.w*.3,p.y+2); c.lineTo(p.x+p.w*.36,p.y+p.h-2); c.moveTo(p.x+p.w*.7,p.y+2); c.lineTo(p.x+p.w*.64,p.y+p.h-2); c.stroke(); c.restore();
};
/* ---------- íris (transição circular) ---------- */
A.iris=function(c,x,y,r){
  if(r>=1400) return; c.save(); c.fillStyle='#0d0b1e'; c.beginPath(); c.rect(0,0,W,H); c.arc(x,y,Math.max(0,r),0,TAU,true); c.fill('evenodd'); c.restore();
  if(r>4){ c.strokeStyle='rgba(253,224,71,.6)'; c.lineWidth=4; circ(c,x,y,r); c.stroke(); }
};
/* ---------- decoração viva do mapa ---------- */
A.mapaVivo=function(c,t){
  for(var i=0;i<4;i++){ var x=((i*280+t*12)%(W+200))-100; A.nuvem(c,x,30+i*18,1.1+i*.2,.55); }
  c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=2; for(var k=0;k<14;k++){ var wx=((k*90+t*25)%(W+100))-50, wy=455+(k%3)*22; c.beginPath(); c.arc(wx,wy,12,PI*1.1,PI*1.9); c.stroke(); }
  c.fillStyle='rgba(255,255,255,.8)'; for(var s=0;s<30;s++){ var sx=(hash(s)*W+t*8*(1+hash(s+2)))%W, sy=(hash(s+30)*140+t*18*(1+hash(s+9)))%140; if(sy<130){ c.globalAlpha=.5+.5*hash(s+4); circ(c,sx,sy,1.2+hash(s+1)*1.5); c.fill(); } } c.globalAlpha=1;
  var mx=870, my=60; c.save(); c.translate(mx,my); for(var b=0;b<3;b++){ c.fillStyle=['#dc2626','#ef4444','#f87171'][b]; A.folha(c,Math.sin(t*1.3+b)*6,Math.cos(t*1.1+b)*4,10-b*2,t*.5+b,['#dc2626','#f97316','#fbbf24'][b]); } c.restore();
};
A.setaIndicador=function(c,x,y,ang,t,txt){
  var pul=1+Math.sin(t*8)*.1; c.save(); c.translate(x,y); c.scale(pul,pul);
  c.fillStyle='rgba(13,11,30,.75)'; circ(c,0,0,30); c.fill(); c.strokeStyle='#fde68a'; c.lineWidth=3; circ(c,0,0,30); c.stroke();
  c.save(); c.rotate(ang); c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(20,0); c.lineTo(-6,-12); c.lineTo(-2,0); c.lineTo(-6,12); c.closePath(); c.fill(); c.restore();
  if(txt){ c.fillStyle='#fff'; c.font='900 14px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='rgba(13,11,30,.75)'; var tw=c.measureText(txt).width+16; rr(c,-tw/2,36,tw,24,8); c.fill(); c.fillStyle='#fff'; c.fillText(txt,0,48); }
  c.restore();
};
})();
