/* ============================================================
   LP3_jornada_arte.js — tudo que aparece no canvas é desenhado
   por código: o urso, os bichos, as caixas, os cenários do Canadá
   com parallax, partículas, o Gigante e o mapa-múndi.
   Nenhuma imagem externa, nenhum emoji como ilustração.
   Coordenadas: resolução lógica 960x540 (W x H).
   ============================================================ */
window.ARTE = (function(){
'use strict';
var W=960, H=540, PI=Math.PI, TAU=PI*2;

function rr(c,x,y,w,h,r){ /* retângulo arredondado */
  r=Math.min(r,w/2,h/2);
  c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath();
}
function el(c,x,y,rx,ry){ c.beginPath(); c.ellipse(x,y,rx,ry,0,0,TAU); }
function circ(c,x,y,r){ c.beginPath(); c.arc(x,y,r,0,TAU); }
function lin(c,x0,y0,x1,y1,c0,c1){ var g=c.createLinearGradient(x0,y0,x1,y1); g.addColorStop(0,c0); g.addColorStop(1,c1); return g; }
function hash(n){ var x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }

/* ---------- folha de bordo ---------- */
var LEAF=[[0,-1],[.18,-.62],[.42,-.72],[.36,-.4],[.75,-.5],[.62,-.2],[1,-.02],[.6,.22],[.72,.52],[.3,.4],[.12,.62],[.1,1],[-.1,1],[-.12,.62],[-.3,.4],[-.72,.52],[-.6,.22],[-1,-.02],[-.62,-.2],[-.75,-.5],[-.36,-.4],[-.42,-.72],[-.18,-.62]];
function folha(c,x,y,r,rot,cor,borda){
  c.save(); c.translate(x,y); c.rotate(rot||0);
  c.beginPath(); for(var i=0;i<LEAF.length;i++){ var p=LEAF[i]; if(i===0)c.moveTo(p[0]*r,p[1]*r); else c.lineTo(p[0]*r,p[1]*r); } c.closePath();
  c.fillStyle=cor||'#dc2626'; c.fill();
  if(borda){ c.lineWidth=borda; c.strokeStyle='rgba(0,0,0,.25)'; c.stroke(); }
  c.restore();
}
function estrela(c,x,y,r,cor,rot){
  c.save(); c.translate(x,y); c.rotate(rot||0); c.beginPath();
  for(var i=0;i<10;i++){ var a=-PI/2+i*PI/5, rr2=i%2?r*.45:r; c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2); }
  c.closePath(); c.fillStyle=cor||'#fbbf24'; c.fill(); c.restore();
}

/* ============================================================
   O URSO — pés em (x,y), olhando para dir (1 ou -1).
   estado: 'idle' | 'walk' | 'jump' | 'fall' | 'cheer' | 'dizzy' | 'thrown'
   t: tempo em segundos (animação)
   ============================================================ */
function urso(c,x,y,estado,t,dir,escala){
  escala=escala||1; dir=dir||1;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala);
  var resp=Math.sin(t*3)*1.5;              /* respiração */
  var passo=Math.sin(t*14);                /* andar */
  var bob=0, legL=0, legR=0, armL=0, armR=0, bodyRot=0, headTilt=0;
  if(estado==='idle'){ bob=resp; armL=.15; armR=-.15; }
  else if(estado==='walk'){ bob=Math.abs(passo)*2; legL=passo*18; legR=-passo*18; armL=-passo*.5; armR=passo*.5; }
  else if(estado==='jump'){ bob=-3; legL=-8; legR=10; armL=-1.6; armR=1.6; }
  else if(estado==='fall'){ bob=0; legL=6; legR=-6; armL=-2.2; armR=2.2; }
  else if(estado==='cheer'){ var ch=Math.abs(Math.sin(t*8)); bob=-ch*14; armL=-2.6-ch*.3; armR=2.6+ch*.3; legL=-ch*8; legR=-ch*8; headTilt=Math.sin(t*8)*.12; }
  else if(estado==='dizzy'){ headTilt=Math.sin(t*5)*.25; armL=.6; armR=-.6; bodyRot=Math.sin(t*4)*.08; }
  else if(estado==='thrown'){ bodyRot=t*9; armL=-2.4; armR=2.4; legL=12; legR=-12; }
  c.rotate(bodyRot);
  /* sombra */
  if(estado!=='thrown'){ c.save(); c.globalAlpha=.25; c.fillStyle='#000'; el(c,0,2,22,5); c.fill(); c.restore(); }
  c.translate(0,bob);
  var preto=lin(c,-20,-60,20,0,'#3a3a44','#121216');
  /* pernas */
  c.fillStyle='#16161a';
  rr(c,-16+legL*.3,-22,14,24,7); c.fill(); rr(c,2+legR*.3,-22,14,24,7); c.fill();
  /* pés */
  c.fillStyle='#1f1f25'; el(c,-9+legL*.4,-1,11,5); c.fill(); el(c,9+legR*.4,-1,11,5); c.fill();
  /* corpo */
  c.fillStyle=preto; el(c,0,-34,24,26); c.fill();
  /* barriga */
  c.fillStyle='rgba(232,211,176,.22)'; el(c,0,-28,13,14); c.fill();
  /* braços */
  function braco(sx,rot){ c.save(); c.translate(sx*20,-44); c.rotate(rot*sx); c.fillStyle='#16161a'; rr(c,-6,-4,12,24,6); c.fill(); c.fillStyle='#1f1f25'; circ(c,0,20,6.5); c.fill(); c.restore(); }
  braco(-1,armL); braco(1,armR);
  /* cachecol */
  c.fillStyle='#dc2626'; rr(c,-18,-58,36,10,5); c.fill();
  c.fillStyle='#b91c1c'; rr(c,6,-52,9,16,4); c.fill();
  folha(c,10,-45,4,0,'#fff');
  /* cabeça */
  c.save(); c.translate(0,-72); c.rotate(headTilt);
  c.fillStyle='#16161a'; circ(c,-18,-14,9); c.fill(); circ(c,18,-14,9); c.fill();
  c.fillStyle='#4a3a35'; circ(c,-18,-14,4.5); c.fill(); circ(c,18,-14,4.5); c.fill();
  c.fillStyle=lin(c,-22,-22,22,22,'#3a3a44','#141418'); circ(c,0,0,23); c.fill();
  /* focinho */
  c.fillStyle='#e8d3b0'; el(c,6,6,11,8.5); c.fill();
  c.fillStyle='#1a1a1a'; el(c,10,3,5,3.6); c.fill();
  c.fillStyle='rgba(255,255,255,.5)'; el(c,9,2,1.8,1.1); c.fill();
  c.strokeStyle='#5b4636'; c.lineWidth=1.3; c.beginPath(); c.moveTo(10,6.5); c.lineTo(10,9.5); c.moveTo(6,10.5); c.quadraticCurveTo(10,12.5,14,10.5); c.stroke();
  /* olhos */
  if(estado==='dizzy'){
    c.strokeStyle='#fff'; c.lineWidth=2;
    [-7,9].forEach(function(ex){ c.beginPath(); c.moveTo(ex-3,-6); c.lineTo(ex+3,0); c.moveTo(ex+3,-6); c.lineTo(ex-3,0); c.stroke(); });
  } else {
    var blink = (Math.sin(t*1.3)>.985)?.25:1;
    c.fillStyle='#fff'; el(c,-6,-4,4.5,4.8*blink); c.fill(); el(c,10,-4,4.5,4.8*blink); c.fill();
    c.fillStyle='#111'; el(c,-5,-3.5,2.6,3*blink); c.fill(); el(c,11,-3.5,2.6,3*blink); c.fill();
    c.fillStyle='#fff'; circ(c,-4.2,-5,1); c.fill(); circ(c,11.8,-5,1); c.fill();
    if(estado==='cheer'){ c.strokeStyle='#e8d3b0'; c.lineWidth=1.5; c.beginPath(); c.arc(8,8,6,.15*PI,.85*PI); c.stroke(); }
  }
  c.restore();
  /* estrelinhas do tonto */
  if(estado==='dizzy'){
    for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; estrela(c,Math.cos(a)*22,-104+Math.sin(a)*6,5,'#fde047',a); }
  }
  c.restore();
}

/* ============================================================
   INIMIGOS fofos — castor e guaxinim (pés em x,y)
   ============================================================ */
function castor(c,x,y,t,dir,achatado){
  c.save(); c.translate(x,y); c.scale(dir,achatado?.35:1);
  var w=Math.sin(t*10)*2;
  c.fillStyle='#6b4423'; el(c,-16,-6,12,5); c.fill();                 /* cauda */
  c.strokeStyle='#4a2e14'; c.lineWidth=1; for(var i=-24;i<-8;i+=5){ c.beginPath(); c.moveTo(i,-9); c.lineTo(i+3,-3); c.stroke(); }
  c.fillStyle=lin(c,0,-30,0,0,'#a0632e','#6b4423'); el(c,0,-15,16,14); c.fill();  /* corpo */
  c.fillStyle='#c98a4b'; el(c,3,-12,8,8); c.fill();                  /* barriga */
  c.fillStyle='#8a5530'; circ(c,10,-24,10); c.fill();                 /* cabeça */
  c.fillStyle='#8a5530'; circ(c,5,-32,3.5); c.fill(); circ(c,15,-32,3.5); c.fill();
  c.fillStyle='#fff'; circ(c,12,-26,3); c.fill(); c.fillStyle='#111'; circ(c,13,-26,1.6); c.fill();
  c.fillStyle='#3a2314'; el(c,19,-22,3,2.2); c.fill();
  c.fillStyle='#fff'; rr(c,15,-19,5,4,1); c.fill();                   /* dentes */
  c.fillStyle='#4a2e14'; el(c,-6+w,-1,6,3); c.fill(); el(c,8-w,-1,6,3); c.fill();
  c.restore();
}
function guaxinim(c,x,y,t,dir,achatado){
  c.save(); c.translate(x,y); c.scale(dir,achatado?.35:1);
  var w=Math.sin(t*10)*2;
  c.strokeStyle='#5a5a66'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(-14,-14); c.quadraticCurveTo(-30,-18,-28,-34); c.stroke();
  c.strokeStyle='#2b2b33'; c.lineWidth=7; c.setLineDash([5,5]); c.beginPath(); c.moveTo(-14,-14); c.quadraticCurveTo(-30,-18,-28,-34); c.stroke(); c.setLineDash([]);
  c.fillStyle=lin(c,0,-30,0,0,'#8e8e9c','#5a5a66'); el(c,0,-15,16,13); c.fill();
  c.fillStyle='#6f6f7d'; circ(c,10,-25,10); c.fill();
  c.fillStyle='#6f6f7d'; c.beginPath(); c.moveTo(2,-30); c.lineTo(4,-40); c.lineTo(9,-32); c.fill(); c.beginPath(); c.moveTo(18,-30); c.lineTo(17,-40); c.lineTo(11,-32); c.fill();
  c.fillStyle='#2b2b33'; el(c,12,-26,8,4); c.fill();                 /* máscara */
  c.fillStyle='#fff'; circ(c,13,-26,2.6); c.fill(); c.fillStyle='#111'; circ(c,14,-26,1.4); c.fill();
  c.fillStyle='#e5e5ea'; el(c,13,-20,6,3.5); c.fill(); c.fillStyle='#111'; circ(c,18,-21,1.8); c.fill();
  c.fillStyle='#2b2b33'; el(c,-6+w,-1,6,3); c.fill(); el(c,8-w,-1,6,3); c.fill();
  c.restore();
}
function inimigo(c,e,t){
  if(e.tipo==='castor') castor(c,e.x,e.y,t,e.dir,e.achatado); else guaxinim(c,e.x,e.y,t,e.dir,e.achatado);
}

/* ============================================================
   CAIXA "?" — b:{x,y,w,h,tipo:'single'|'multi',n,aberta,bump}
   ============================================================ */
function caixa(c,b,t){
  var y=b.y-(b.bump||0);
  c.save(); c.translate(b.x,y);
  if(b.aberta){ /* visitada: "?" prateado = dá para treinar de novo (sem pulsar) */
    c.fillStyle=lin(c,0,0,0,b.h,'#f1f5f9','#94a3b8'); rr(c,0,0,b.w,b.h,8); c.fill();
    c.strokeStyle='#475569'; c.lineWidth=2.5; rr(c,2,2,b.w-4,b.h-4,6); c.stroke();
    c.fillStyle='rgba(255,255,255,.55)'; rr(c,5,4,b.w-10,8,4); c.fill();
    c.fillStyle='#475569'; c.font='900 28px "Segoe UI",Arial,sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('?',b.w/2,b.h/2+2);
    c.fillStyle='#64748b'; [[8,8],[b.w-8,8],[8,b.h-8],[b.w-8,b.h-8]].forEach(function(p){ circ(c,p[0],p[1],2); c.fill(); });
  } else {
    var multi=b.tipo==='multi';
    var g=lin(c,0,0,0,b.h, multi?'#c084fc':'#fde68a', multi?'#7e22ce':'#d97706');
    c.fillStyle=g; rr(c,0,0,b.w,b.h,8); c.fill();
    c.strokeStyle=multi?'#581c87':'#92400e'; c.lineWidth=2.5; rr(c,2,2,b.w-4,b.h-4,6); c.stroke();
    c.fillStyle='rgba(255,255,255,.35)'; rr(c,5,4,b.w-10,8,4); c.fill();
    var pul=1+Math.sin(t*4+b.x)*.06;
    c.save(); c.translate(b.w/2,b.h/2); c.scale(pul,pul);
    c.fillStyle=multi?'#faf5ff':'#78350f'; c.font='900 30px "Segoe UI",Arial,sans-serif'; c.textAlign='center'; c.textBaseline='middle';
    c.fillText(multi?'?'+'?':'?',0,2);
    c.restore();
    if(multi){ c.fillStyle='#fde68a'; c.font='900 12px Arial'; c.textAlign='center'; c.fillText('x'+b.n,b.w/2,b.h-5); }
    c.fillStyle='rgba(255,255,255,.75)'; [[8,8],[b.w-8,8],[8,b.h-8],[b.w-8,b.h-8]].forEach(function(p){ circ(c,p[0],p[1],2); c.fill(); });
  }
  c.restore();
}

/* ---------- bandeira de checkpoint ---------- */
function bandeira(c,x,y,acesa,t){
  c.save(); c.translate(x,y);
  c.fillStyle='#d6d3d1'; rr(c,-3,-96,6,96,3); c.fill(); c.fillStyle='#fbbf24'; circ(c,0,-98,5); c.fill();
  var ond=Math.sin(t*6)*3;
  c.fillStyle=acesa?'#22c55e':'#9ca3af';
  c.beginPath(); c.moveTo(3,-94); c.quadraticCurveTo(26,-90+ond,40,-78); c.quadraticCurveTo(26,-70-ond,3,-62); c.closePath(); c.fill();
  if(acesa){ folha(c,20,-78,8,0,'#fff'); c.save(); c.globalAlpha=.35+Math.sin(t*5)*.15; c.fillStyle='#86efac'; circ(c,20,-78,22); c.fill(); c.restore(); }
  c.fillStyle='#57534e'; el(c,0,0,14,5); c.fill();
  c.restore();
}

/* ---------- barreira (gelo ou tronco) que some quando as caixas resolvem ---------- */
function barreira(c,x,y,h,tipo,alpha,t){
  if(alpha<=0) return;
  c.save(); c.globalAlpha=alpha; c.translate(x,y);
  if(tipo==='tronco'){
    c.fillStyle=lin(c,0,0,40,0,'#8b5a2b','#5c3a1a'); rr(c,0,-h,40,h,10); c.fill();
    c.strokeStyle='#3f2a14'; c.lineWidth=2; for(var i=1;i<4;i++){ c.beginPath(); c.moveTo(6,-h+i*h/4); c.lineTo(34,-h+i*h/4+4); c.stroke(); }
    c.fillStyle='#d4a26a'; el(c,20,-h,20,7); c.fill(); c.strokeStyle='#8b5a2b'; c.lineWidth=1.5; el(c,20,-h,12,4); c.stroke(); el(c,20,-h,5,2); c.stroke();
  } else {
    c.fillStyle=lin(c,0,-h,40,0,'rgba(191,235,255,.95)','rgba(96,165,250,.85)'); rr(c,0,-h,40,h,6); c.fill();
    c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=2; c.beginPath(); c.moveTo(8,-h+10); c.lineTo(14,-h+40); c.lineTo(10,-h+70); c.stroke();
    c.beginPath(); c.moveTo(28,-h+20); c.lineTo(24,-h+60); c.stroke();
    var sp=Math.sin(t*3)*.5+.5; c.fillStyle='rgba(255,255,255,'+(.4+sp*.5)+')'; circ(c,30,-h+14,3); c.fill(); circ(c,12,-h+h*.6,2); c.fill();
  }
  c.restore();
}

/* ---------- mastro final com a folha de bordo ---------- */
function mastro(c,x,y,t){
  c.save(); c.translate(x,y);
  c.fillStyle='#78350f'; rr(c,-26,-8,52,8,3); c.fill();
  c.fillStyle=lin(c,-4,0,4,0,'#f5f5f4','#a8a29e'); rr(c,-4,-180,8,180,4); c.fill();
  var g=c.createRadialGradient(0,-186,2,0,-186,16); g.addColorStop(0,'#fff7ae'); g.addColorStop(1,'rgba(251,191,36,0)'); c.fillStyle=g; circ(c,0,-186,16); c.fill();
  c.fillStyle='#fbbf24'; circ(c,0,-186,7); c.fill();
  var ond=Math.sin(t*4)*4;
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(4,-176); c.lineTo(62,-170+ond); c.lineTo(62,-120+ond); c.lineTo(4,-114); c.closePath(); c.fill();
  c.fillStyle='#dc2626'; c.fillRect(4,-176,10,62); c.fillRect(52,-170+ond,10,50);
  folha(c,33,-145+ond*.5,20,0,'#dc2626');
  c.restore();
}

/* ---------- teclas desenhadas (tutorial) ---------- */
function tecla(c,x,y,label,w){
  w=w||44; c.save(); c.translate(x,y);
  c.fillStyle='#3f3f55'; rr(c,0,4,w,40,8); c.fill();
  c.fillStyle=lin(c,0,0,0,40,'#ffffff','#d4d4e2'); rr(c,0,0,w,40,8); c.fill();
  c.fillStyle='#1e1b3a'; c.font='900 '+(label.length>2?14:20)+'px "Segoe UI",Arial,sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(label,w/2,20);
  c.restore();
}
function balao(c,x,y,w,texto,corFundo){
  c.save(); c.translate(x,y);
  c.fillStyle=corFundo||'rgba(255,255,255,.95)'; rr(c,-w/2,-30,w,60,16); c.fill();
  c.beginPath(); c.moveTo(-10,28); c.lineTo(0,44); c.lineTo(10,28); c.fill();
  c.fillStyle='#1e1b3a'; c.font='900 20px "Segoe UI",Arial,sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(texto,0,0);
  c.restore();
}

/* ============================================================
   CENÁRIOS — céu + camada longe (parallax .15) + camada perto (.45)
   ============================================================ */
var CENAS={
  floresta:{ceu:['#f59e0b','#fde68a','#fca5a5'], chaoTop:'#b45309', chao:'#7c3f12', chaoBase:'#4a2510', plat:'#8b5a2b', platTop:'#d97706', part:'folha', musica:'floresta'},
  montanha:{ceu:['#1e3a8a','#60a5fa','#dbeafe'], chaoTop:'#4d7c0f', chao:'#57534e', chaoBase:'#292524', plat:'#78716c', platTop:'#a3e635', part:'nuvem', musica:'montanha'},
  agua:    {ceu:['#0ea5e9','#7dd3fc','#e0f2fe'], chaoTop:'#64748b', chao:'#475569', chaoBase:'#1e293b', plat:'#64748b', platTop:'#94a3b8', part:'nevoa', musica:'agua'},
  gelo:    {ceu:['#312e81','#6366f1','#c7d2fe'], chaoTop:'#e0f2fe', chao:'#7dd3fc', chaoBase:'#0369a1', plat:'#bae6fd', platTop:'#ffffff', part:'neve', musica:'gelo'},
  pradaria:{ceu:['#2563eb','#93c5fd','#fef3c7'], chaoTop:'#eab308', chao:'#a16207', chaoBase:'#713f12', plat:'#b91c1c', platTop:'#fca5a5', part:'polen', musica:'pradaria'},
  cidade:  {ceu:['#1e1b4b','#312e81','#4c1d95'], chaoTop:'#a16207', chao:'#78350f', chaoBase:'#451a03', plat:'#92400e', platTop:'#d97706', part:'vagalume', musica:'cidade'},
  oficina: {ceu:['#3f1d0b','#7c2d12','#b45309'], chaoTop:'#9ca3af', chao:'#4b5563', chaoBase:'#1f2937', plat:'#6b7280', platTop:'#d1d5db', part:'faisca', musica:'oficina'},
  mar:     {ceu:['#7c2d12','#f97316','#fde68a'], chaoTop:'#fcd34d', chao:'#a16207', chaoBase:'#57534e', plat:'#7c2d12', platTop:'#fbbf24', part:'nuvem', musica:'mar'},
  aurora:  {ceu:['#020617','#0f172a','#1e1b4b'], chaoTop:'#f8fafc', chao:'#cbd5e1', chaoBase:'#475569', plat:'#92400e', platTop:'#f8fafc', part:'neve', musica:'aurora'},
  castelo: {ceu:['#0f172a','#1e3a8a','#60a5fa'], chaoTop:'#e0f2fe', chao:'#60a5fa', chaoBase:'#1e3a8a', plat:'#93c5fd', platTop:'#ffffff', part:'neve', musica:'chefao'},
  mapa:    {ceu:['#0f172a','#1e3a8a','#0ea5e9'], part:'', musica:'mapa'}
};

function ceu(c,cena,t){
  var k=CENAS[cena]; var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,k.ceu[0]); g.addColorStop(.55,k.ceu[1]); g.addColorStop(1,k.ceu[2]);
  c.fillStyle=g; c.fillRect(0,0,W,H);
  if(cena==='aurora'||cena==='castelo'||cena==='cidade'){ /* estrelas */
    c.fillStyle='#fff'; for(var i=0;i<60;i++){ var sx=hash(i)*W, sy=hash(i+99)*H*.6, a=.4+.6*Math.abs(Math.sin(t*1.5+i)); c.globalAlpha=a; circ(c,sx,sy,hash(i+7)*1.4+.4); c.fill(); } c.globalAlpha=1;
  }
  if(cena==='aurora'){ /* bandas da aurora */
    for(var b=0;b<3;b++){ c.save(); c.globalAlpha=.28; var gg=c.createLinearGradient(0,40+b*40,0,220+b*40); gg.addColorStop(0,'rgba(34,197,94,0)'); gg.addColorStop(.5,b===1?'#a78bfa':'#4ade80'); gg.addColorStop(1,'rgba(34,197,94,0)'); c.fillStyle=gg;
      c.beginPath(); c.moveTo(0,60+b*40); for(var x=0;x<=W;x+=40){ c.lineTo(x,60+b*40+Math.sin(x*.012+t*.6+b)*30); } for(x=W;x>=0;x-=40){ c.lineTo(x,220+b*40+Math.sin(x*.01+t*.4+b)*40); } c.closePath(); c.fill(); c.restore(); }
  }
  if(cena==='pradaria'||cena==='floresta'||cena==='mar'){ /* sol */
    var sx2=cena==='mar'?700:160, sy2=cena==='mar'?300:110; var rg=c.createRadialGradient(sx2,sy2,10,sx2,sy2,120); rg.addColorStop(0,'rgba(255,255,220,.95)'); rg.addColorStop(.25,'rgba(255,240,180,.6)'); rg.addColorStop(1,'rgba(255,220,120,0)'); c.fillStyle=rg; circ(c,sx2,sy2,120); c.fill();
  }
}
function pinheiro(c,x,y,h,cor){ c.fillStyle=cor||'#14532d'; for(var i=0;i<3;i++){ var yy=y-h*(.3+i*.3), ww=h*(.45-i*.11); c.beginPath(); c.moveTo(x,yy-h*.3); c.lineTo(x+ww,yy); c.lineTo(x-ww,yy); c.closePath(); c.fill(); } c.fillStyle='#3f2a14'; c.fillRect(x-h*.05,y-h*.3,h*.1,h*.3); }
function bordo(c,x,y,h,cor){ c.fillStyle='#4a2c12'; rr(c,x-h*.06,y-h*.55,h*.12,h*.55,4); c.fill(); c.fillStyle=cor; circ(c,x,y-h*.7,h*.32); c.fill(); circ(c,x-h*.22,y-h*.55,h*.22); c.fill(); circ(c,x+h*.22,y-h*.55,h*.22); c.fill(); c.fillStyle='rgba(255,255,255,.15)'; circ(c,x-h*.08,y-h*.8,h*.14); c.fill(); }
function montanha(c,x,y,w,h,cor,neve){ c.fillStyle=cor; c.beginPath(); c.moveTo(x-w/2,y); c.lineTo(x,y-h); c.lineTo(x+w/2,y); c.closePath(); c.fill(); if(neve){ c.fillStyle='#f8fafc'; c.beginPath(); c.moveTo(x,y-h); c.lineTo(x+w*.16,y-h*.68); c.lineTo(x+w*.07,y-h*.72); c.lineTo(x,y-h*.62); c.lineTo(x-w*.07,y-h*.72); c.lineTo(x-w*.16,y-h*.68); c.closePath(); c.fill(); } }
function predio(c,x,y,w,h,cor,t){ c.fillStyle=cor; c.fillRect(x,y-h,w,h); c.fillStyle='rgba(253,224,71,.8)'; for(var j=0;j<Math.floor(h/18);j++) for(var i=0;i<Math.floor(w/14);i++){ if(hash(x+i*7+j*13)>.45){ c.fillRect(x+4+i*14,y-h+6+j*18,7,9); } } }
function nuvem(c,x,y,s,alpha){ c.save(); c.globalAlpha=alpha||.9; c.fillStyle='#fff'; circ(c,x,y,18*s); c.fill(); circ(c,x+20*s,y-8*s,22*s); c.fill(); circ(c,x+44*s,y,16*s); c.fill(); rr(c,x-10*s,y,64*s,14*s,8); c.fill(); c.restore(); }

/* camada longe e perto por cena. cam = deslocamento horizontal já multiplicado pelo parallax */
function longe(c,cena,cam,t){
  var i,x;
  switch(cena){
    case 'floresta': c.fillStyle='#b45309'; c.beginPath(); c.moveTo(0,H); for(x=0;x<=W;x+=20) c.lineTo(x,380+Math.sin((x+cam)*.006)*40); c.lineTo(W,H); c.fill();
      for(i=0;i<14;i++){ x=((i*140-cam)%(W+200)+W+200)%(W+200)-100; bordo(c,x,392+Math.sin((x+cam)*.006)*40,90,['#dc2626','#ea580c','#f59e0b'][i%3]); } break;
    case 'montanha': for(i=0;i<6;i++){ x=((i*260-cam)%(W+400)+W+400)%(W+400)-200; montanha(c,x,430,320,260+hash(i)*80,'#334155',true); }
      c.fillStyle='#1e293b'; c.beginPath(); c.moveTo(0,H); for(x=0;x<=W;x+=20) c.lineTo(x,420+Math.sin((x+cam)*.01)*15); c.lineTo(W,H); c.fill(); break;
    case 'agua': c.fillStyle='#38bdf8'; c.fillRect(0,120,W,330); for(i=0;i<40;i++){ x=((i*26-cam*.5)%(W+40)+W+40)%(W+40)-20; c.fillStyle=i%2?'rgba(255,255,255,.55)':'rgba(224,242,254,.3)'; c.fillRect(x,120,14,330); }
      c.fillStyle='#0369a1'; c.fillRect(0,120,W,8); for(i=0;i<5;i++) nuvem(c,((i*230-cam*.3+t*8)%(W+200)+W+200)%(W+200)-100,440-(i%2)*20,1.4,.7);
      var cores=['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#8b5cf6']; c.save(); c.globalAlpha=.5; c.lineWidth=10; var rx=((600-cam*.5)%(W+600)+W+600)%(W+600)-300;
      for(var r=0;r<cores.length;r++){ c.strokeStyle=cores[r]; c.beginPath(); c.arc(rx,430,300-r*10,PI,TAU); c.stroke(); } c.restore(); break;
    case 'gelo': c.fillStyle='#1e1b4b'; for(i=0;i<5;i++){ x=((i*300-cam)%(W+400)+W+400)%(W+400)-200; c.fillRect(x,330,140,120); c.fillRect(x+55,260,30,80); c.beginPath(); c.moveTo(x+50,262); c.lineTo(x+70,225); c.lineTo(x+90,262); c.fill(); c.fillStyle='rgba(253,224,71,.8)'; for(var j=0;j<3;j++) c.fillRect(x+16+j*40,350,16,22); c.fillStyle='#1e1b4b'; } break;
    case 'pradaria': c.fillStyle='#ca8a04'; c.beginPath(); c.moveTo(0,H); for(x=0;x<=W;x+=40) c.lineTo(x,400+Math.sin((x+cam)*.004)*10); c.lineTo(W,H); c.fill();
      for(i=0;i<3;i++){ x=((i*520-cam)%(W+600)+W+600)%(W+600)-300; c.fillStyle='#b91c1c'; c.fillRect(x,340,110,70); c.fillStyle='#7f1d1d'; c.beginPath(); c.moveTo(x-6,340); c.lineTo(x+55,300); c.lineTo(x+116,340); c.fill(); c.fillStyle='#f8fafc'; c.fillRect(x+40,370,30,40); c.fillStyle='#64748b'; c.fillRect(x+160,350,8,60); c.save(); c.translate(x+164,350); c.rotate(t*1.2); c.fillStyle='#e5e7eb'; for(var k=0;k<4;k++){ c.rotate(PI/2); c.fillRect(-3,-36,6,36); } c.restore(); } break;
    case 'cidade': for(i=0;i<9;i++){ x=((i*120-cam)%(W+200)+W+200)%(W+200)-100; predio(c,x,440,70+hash(i)*30,120+hash(i+3)*140,'#1e1b4b',t); }
      x=((500-cam)%(W+200)+W+200)%(W+200)-100; c.fillStyle='#334155'; c.fillRect(x-5,420,10,-320); c.fillRect(x-30,170,60,22); c.fillStyle='#475569'; el(c,x,160,34,14); c.fill(); c.fillRect(x-3,60,6,110); c.fillStyle='#ef4444'; circ(c,x,56,4); c.fill(); break;
    case 'oficina': for(i=0;i<5;i++){ x=((i*280-cam)%(W+300)+W+300)%(W+300)-150; engrenagem(c,x,160+(i%2)*120,70+hash(i)*30,t*(i%2?.6:-.4)+i,'rgba(120,53,15,.9)'); } break;
    case 'mar': c.fillStyle='#1e3a5f'; for(i=0;i<5;i++){ x=((i*300-cam*.6)%(W+400)+W+400)%(W+400)-200; montanha(c,x,400,360,200+hash(i)*60,'#1e3a5f',true); }
      c.fillStyle='#0ea5e9'; c.fillRect(0,400,W,60); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=2; for(i=0;i<12;i++){ x=((i*90-cam*.4+t*20)%(W+100)+W+100)%(W+100)-50; c.beginPath(); c.arc(x,415+(i%3)*12,14,PI*1.1,PI*1.9); c.stroke(); }
      x=((300-cam*.5)%(W+300)+W+300)%(W+300)-150; var sal=Math.max(0,Math.sin(t*.9)); c.save(); c.translate(x,405-sal*60); c.rotate(-.5+sal*.6); c.fillStyle='#0f172a'; el(c,0,0,46,16); c.fill(); c.beginPath(); c.moveTo(-6,-10); c.lineTo(4,-36); c.lineTo(14,-8); c.fill(); c.fillStyle='#fff'; el(c,12,6,22,6); c.fill(); el(c,22,-9,5,3); c.fill(); c.restore(); break;
    case 'aurora': c.fillStyle='#1e293b'; c.beginPath(); c.moveTo(0,H); for(x=0;x<=W;x+=20) c.lineTo(x,370+Math.sin((x+cam)*.005)*30); c.lineTo(W,H); c.fill();
      for(i=0;i<10;i++){ x=((i*180-cam)%(W+300)+W+300)%(W+300)-150; pinheiro(c,x,380+Math.sin((x+cam)*.005)*30,70+hash(i)*30,'#0f172a'); } break;
    case 'castelo': for(i=0;i<4;i++){ x=((i*320-cam)%(W+400)+W+400)%(W+400)-200; c.fillStyle='rgba(147,197,253,.5)'; c.fillRect(x,230,160,220); c.fillRect(x-20,200,40,250); c.fillRect(x+140,200,40,250); c.beginPath(); c.moveTo(x-24,200); c.lineTo(x,150); c.lineTo(x+24,200); c.fill(); c.beginPath(); c.moveTo(x+136,200); c.lineTo(x+160,150); c.lineTo(x+184,200); c.fill(); } break;
  }
}
function engrenagem(c,x,y,r,rot,cor){ c.save(); c.translate(x,y); c.rotate(rot); c.fillStyle=cor; c.beginPath(); for(var i=0;i<12;i++){ var a0=i*TAU/12, a1=a0+TAU/24; c.lineTo(Math.cos(a0)*r,Math.sin(a0)*r); c.lineTo(Math.cos(a0+TAU/48)*r*1.2,Math.sin(a0+TAU/48)*r*1.2); c.lineTo(Math.cos(a1-TAU/48)*r*1.2,Math.sin(a1-TAU/48)*r*1.2); c.lineTo(Math.cos(a1)*r,Math.sin(a1)*r); } c.closePath(); c.fill(); c.globalCompositeOperation='destination-out'; circ(c,0,0,r*.4); c.fill(); c.restore(); }
function perto(c,cena,cam,t){
  var i,x;
  switch(cena){
    case 'floresta': for(i=0;i<8;i++){ x=((i*240-cam)%(W+300)+W+300)%(W+300)-150; bordo(c,x,452,150,['#b91c1c','#c2410c','#d97706'][i%3]); } break;
    case 'montanha': for(i=0;i<9;i++){ x=((i*200-cam)%(W+300)+W+300)%(W+300)-150; pinheiro(c,x,452,120+hash(i)*40,'#166534'); }
      x=((700-cam)%(W+400)+W+400)%(W+400)-200; alce(c,x,452); break;
    case 'agua': for(i=0;i<6;i++) nuvem(c,((i*200-cam+t*14)%(W+240)+W+240)%(W+240)-120,380+(i%2)*40,1.8,.55);
      x=((420-cam)%(W+300)+W+300)%(W+300)-150; c.fillStyle='#1d4ed8'; c.beginPath(); c.moveTo(x-50,400); c.lineTo(x+50,400); c.lineTo(x+40,420); c.lineTo(x-40,420); c.fill(); c.fillStyle='#f8fafc'; c.fillRect(x-30,386,60,14); break;
    case 'gelo': for(i=0;i<7;i++){ x=((i*250-cam)%(W+300)+W+300)%(W+300)-150; pinheiro(c,x,452,90+hash(i)*30,'#1e3a8a'); c.fillStyle='#e0f2fe'; el(c,x,452-80,12,5); c.fill(); } break;
    case 'pradaria': c.fillStyle='#facc15'; for(i=0;i<60;i++){ x=((i*18-cam)%(W+40)+W+40)%(W+40)-20; var sw=Math.sin(t*2+i)*4; c.fillRect(x,420,3,32); el(c,x+1.5+sw,418,4,10); c.fill(); } break;
    case 'cidade': for(i=0;i<5;i++){ x=((i*300-cam)%(W+400)+W+400)%(W+400)-200; estante(c,x,452); } break;
    case 'oficina': for(i=0;i<6;i++){ x=((i*200-cam)%(W+300)+W+300)%(W+300)-150; c.fillStyle='#57534e'; c.fillRect(x,100,18,352); c.fillStyle='#a8a29e'; c.fillRect(x-6,120,30,12); c.fillRect(x-6,300,30,12); engrenagem(c,x+80,330,34,-t*1.5+i,'#a16207'); engrenagem(c,x+136,300,24,t*2.1+i,'#ca8a04'); } break;
    case 'mar': for(i=0;i<4;i++){ x=((i*330-cam)%(W+400)+W+400)%(W+400)-200; totem(c,x,452); } break;
    case 'aurora': for(i=0;i<6;i++){ x=((i*260-cam)%(W+300)+W+300)%(W+300)-150; pinheiro(c,x,452,130+hash(i)*30,'#14532d'); c.fillStyle='#e2e8f0'; el(c,x,452-105,14,6); c.fill(); }
      x=((600-cam)%(W+500)+W+500)%(W+500)-250; cabana(c,x,452,t); break;
    case 'castelo': for(i=0;i<8;i++){ x=((i*160-cam)%(W+200)+W+200)%(W+200)-100; c.fillStyle='rgba(224,242,254,.55)'; c.beginPath(); c.moveTo(x-16,452); c.lineTo(x,452-120-hash(i)*80); c.lineTo(x+16,452); c.fill(); } break;
  }
}
function alce(c,x,y){ c.fillStyle='#3f2a14'; rr(c,x-30,y-70,60,34,12); c.fill(); c.fillRect(x-24,y-40,8,40); c.fillRect(x+16,y-40,8,40); c.fillRect(x-14,y-40,8,40); c.fillRect(x+6,y-40,8,40); rr(c,x+22,y-98,26,34,10); c.fill(); c.strokeStyle='#5c3a1a'; c.lineWidth=4; c.beginPath(); c.moveTo(x+30,y-98); c.lineTo(x+18,y-120); c.lineTo(x+8,y-112); c.moveTo(x+18,y-120); c.lineTo(x+22,y-132); c.moveTo(x+40,y-98); c.lineTo(x+54,y-120); c.lineTo(x+64,y-112); c.moveTo(x+54,y-120); c.lineTo(x+50,y-132); c.stroke(); }
function estante(c,x,y){ c.fillStyle='#5b3a1e'; c.fillRect(x,y-200,140,200); var cores=['#ef4444','#3b82f6','#22c55e','#eab308','#a855f7','#f97316']; for(var j=0;j<4;j++){ c.fillStyle='#3f2a14'; c.fillRect(x,y-200+j*50,140,6); var bx=x+6; while(bx<x+128){ var bw=10+hash(bx+j)*10, bh=30+hash(bx*3+j)*12; c.fillStyle=cores[Math.floor(hash(bx+j*7)*6)]; c.fillRect(bx,y-200+j*50+50-bh,bw,bh); bx+=bw+2; } } }
function totem(c,x,y){ c.fillStyle='#7c2d12'; rr(c,x-18,y-170,36,170,6); c.fill(); var cores=['#dc2626','#0ea5e9','#facc15']; for(var j=0;j<3;j++){ var yy=y-160+j*52; c.fillStyle=cores[j]; rr(c,x-18,yy,36,40,6); c.fill(); c.fillStyle='#111'; el(c,x-8,yy+14,4,3); c.fill(); el(c,x+8,yy+14,4,3); c.fill(); c.fillStyle='#fff'; rr(c,x-10,yy+26,20,6,3); c.fill(); } c.fillStyle='#0ea5e9'; c.beginPath(); c.moveTo(x-40,y-170); c.lineTo(x-18,y-180); c.lineTo(x-18,y-160); c.fill(); c.beginPath(); c.moveTo(x+40,y-170); c.lineTo(x+18,y-180); c.lineTo(x+18,y-160); c.fill(); }
function cabana(c,x,y,t){ c.fillStyle='#78350f'; for(var j=0;j<5;j++){ rr(c,x-60,y-20-j*20,120,18,8); c.fill(); } c.fillStyle='#450a0a'; c.beginPath(); c.moveTo(x-72,y-100); c.lineTo(x,y-150); c.lineTo(x+72,y-100); c.fill(); c.fillStyle='#e2e8f0'; c.beginPath(); c.moveTo(x-72,y-100); c.lineTo(x,y-150); c.lineTo(x+72,y-100); c.lineTo(x+72,y-92); c.lineTo(x,y-142); c.lineTo(x-72,y-92); c.fill(); var gl=.7+Math.sin(t*3)*.2; c.fillStyle='rgba(253,224,71,'+gl+')'; c.fillRect(x+14,y-80,30,28); c.fillStyle='#3f2a14'; c.fillRect(x-40,y-70,28,70); c.fillStyle='#64748b'; c.fillRect(x+30,y-140,14,30); c.save(); c.globalAlpha=.5; c.fillStyle='#cbd5e1'; circ(c,x+37+Math.sin(t)*4,y-150-((t*20)%30),6+((t*20)%30)*.2); c.fill(); c.restore(); }

/* ============================================================
   CHÃO e PLATAFORMAS (coordenadas de tela — a câmera já foi aplicada)
   ============================================================ */
function chao(c,s,cena){
  var k=CENAS[cena]||CENAS.floresta;
  c.fillStyle=lin(c,0,s.y,0,s.y+s.h,k.chao,k.chaoBase); c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle=k.chaoTop; c.fillRect(s.x,s.y,s.w,12);
  if(cena==='floresta'||cena==='montanha'||cena==='pradaria'){ /* tufos */
    c.fillStyle=k.chaoTop; for(var x=s.x+8;x<s.x+s.w-8;x+=22){ c.beginPath(); c.moveTo(x,s.y); c.lineTo(x+5,s.y-8-hash(x)*5); c.lineTo(x+10,s.y); c.fill(); }
  } else if(cena==='gelo'||cena==='aurora'||cena==='castelo'){ /* brilho de gelo/neve */
    c.fillStyle='rgba(255,255,255,.5)'; for(var x2=s.x+10;x2<s.x+s.w-10;x2+=40){ el(c,x2,s.y+6,10,3); c.fill(); }
  } else if(cena==='oficina'){ c.strokeStyle='#1f2937'; c.lineWidth=2; for(var x3=s.x;x3<s.x+s.w;x3+=48){ c.beginPath(); c.moveTo(x3,s.y+12); c.lineTo(x3,s.y+s.h); c.stroke(); } c.fillStyle='#374151'; for(x3=s.x+8;x3<s.x+s.w;x3+=48){ circ(c,x3,s.y+22,3); c.fill(); circ(c,x3+32,s.y+22,3); c.fill(); }
  } else if(cena==='cidade'){ c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=2; for(var x4=s.x;x4<s.x+s.w;x4+=60){ c.beginPath(); c.moveTo(x4,s.y+12); c.lineTo(x4,s.y+s.h); c.stroke(); }
  } else if(cena==='agua'){ c.fillStyle='rgba(255,255,255,.25)'; for(var x5=s.x+6;x5<s.x+s.w-6;x5+=30){ el(c,x5,s.y+20+hash(x5)*20,8,5); c.fill(); } }
  c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+s.h-10,s.w,10);
}
function plataforma(c,p,cena){
  var k=CENAS[cena]||CENAS.floresta;
  c.fillStyle='rgba(0,0,0,.2)'; rr(c,p.x+3,p.y+4,p.w,p.h,8); c.fill();
  c.fillStyle=lin(c,0,p.y,0,p.y+p.h,k.plat,k.chaoBase); rr(c,p.x,p.y,p.w,p.h,8); c.fill();
  c.fillStyle=k.platTop; rr(c,p.x,p.y,p.w,8,6); c.fill();
  if(cena==='gelo'||cena==='aurora'||cena==='castelo'){ c.fillStyle='rgba(255,255,255,.6)'; el(c,p.x+p.w/2,p.y+4,p.w*.3,3); c.fill(); }
}

/* ============================================================
   PARTÍCULAS — p:{x,y,vx,vy,vida,max,tipo,cor,r,rot}
   ============================================================ */
function particula(c,p){
  var a=Math.max(0,Math.min(1,p.vida/p.max)); c.save(); c.globalAlpha=a*(p.alpha||1);
  switch(p.tipo){
    case 'folha': folha(c,p.x,p.y,p.r||6,p.rot,p.cor||'#dc2626'); break;
    case 'neve': c.fillStyle='#fff'; circ(c,p.x,p.y,p.r||2.5); c.fill(); break;
    case 'nevoa': c.fillStyle='rgba(255,255,255,.35)'; circ(c,p.x,p.y,p.r||30); c.fill(); break;
    case 'polen': c.fillStyle='#fde68a'; circ(c,p.x,p.y,p.r||2); c.fill(); break;
    case 'vagalume': var g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r||8); g.addColorStop(0,'rgba(253,224,71,1)'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; circ(c,p.x,p.y,p.r||8); c.fill(); break;
    case 'faisca': c.fillStyle=p.cor||'#fb923c'; circ(c,p.x,p.y,p.r||2); c.fill(); break;
    case 'nuvem': nuvem(c,p.x,p.y,p.r||1,.8); break;
    case 'moeda': c.fillStyle='#fbbf24'; el(c,p.x,p.y,(p.r||7)*Math.abs(Math.cos(p.rot)),p.r||7); c.fill(); c.fillStyle='#b45309'; el(c,p.x,p.y,(p.r||7)*.5*Math.abs(Math.cos(p.rot)),(p.r||7)*.5); c.fill(); break;
    case 'estrela': estrela(c,p.x,p.y,p.r||7,p.cor||'#fde047',p.rot); break;
    case 'confete': c.fillStyle=p.cor; c.save(); c.translate(p.x,p.y); c.rotate(p.rot); c.fillRect(-5,-3,10,6); c.restore(); break;
    case 'fogo': c.fillStyle=p.cor; circ(c,p.x,p.y,p.r||3); c.fill(); break;
    case 'texto': c.fillStyle=p.cor||'#fff'; c.font='900 '+(p.r||22)+'px "Segoe UI",Arial,sans-serif'; c.textAlign='center'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=4; c.strokeText(p.txt,p.x,p.y); c.fillText(p.txt,p.x,p.y); break;
    case 'risco': c.strokeStyle=p.cor||'rgba(255,255,255,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x-p.vx*.05,p.y-p.vy*.05); c.stroke(); break;
  }
  c.restore();
}

/* ============================================================
   O GIGANTE — cômico, não assustador. Pés em (x,y), escala ~3x urso.
   estado: 'idle' | 'throw' | 'hit' | 'laugh' | 'down'
   ============================================================ */
function gigante(c,x,y,estado,t,fase){
  c.save(); c.translate(x,y);
  var resp=Math.sin(t*2)*4, inc=0, braco=0, boca=0, sent=estado==='down';
  if(estado==='throw'){ braco=-1.8; inc=-.05; }
  if(estado==='hit'){ inc=.12; boca=1; }
  if(estado==='laugh'){ resp=Math.sin(t*14)*8; boca=.7; braco=-.4; }
  if(estado==='stomp'){ inc=-.06; resp=t<.3?-40*(.3-t)/.3:0; boca=.5; }
  if(sent){ c.translate(0,0); }
  c.save(); c.globalAlpha=.3; c.fillStyle='#000'; el(c,0,4,110,16); c.fill(); c.restore();
  c.rotate(inc);
  var corPele='#f1c27d', corRoupa=lin(c,-80,-240,80,0,'#15803d','#14532d');
  if(sent){ c.translate(0,70); }
  /* pernas */
  c.fillStyle='#5b3a1e'; rr(c,-70,-110,50,110,20); c.fill(); rr(c,20,-110,50,110,20); c.fill();
  c.fillStyle='#3f2a14'; el(c,-45,-4,40,14); c.fill(); el(c,45,-4,40,14); c.fill();
  /* corpo */
  c.fillStyle=corRoupa; rr(c,-95,-250+resp,190,160,50); c.fill();
  c.fillStyle='#a16207'; rr(c,-95,-170+resp,190,18,6); c.fill(); c.fillStyle='#fbbf24'; rr(c,-14,-174+resp,28,26,5); c.fill();
  c.fillStyle='rgba(255,255,255,.08)'; for(var j=0;j<4;j++){ c.fillRect(-85+j*45,-245+resp,16,150); }
  /* braços */
  c.save(); c.translate(-95,-230+resp); c.rotate(.5+braco*.6); c.fillStyle=corRoupa; rr(c,-22,0,44,120,22); c.fill(); c.fillStyle=corPele; circ(c,0,128,30); c.fill(); c.restore();
  c.save(); c.translate(95,-230+resp); c.rotate(-.5-braco); c.fillStyle=corRoupa; rr(c,-22,0,44,120,22); c.fill(); c.fillStyle=corPele; circ(c,0,128,30); c.fill();
  if(estado==='throw'){ c.fillStyle='#fff'; circ(c,0,128,26); c.fill(); c.fillStyle='rgba(0,0,0,.08)'; circ(c,6,134,14); c.fill(); } c.restore();
  /* cabeça */
  c.save(); c.translate(0,-300+resp);
  c.fillStyle=corPele; rr(c,-70,-60,140,140,50); c.fill();
  c.fillStyle='#b45309'; c.beginPath(); c.moveTo(-72,-30); c.quadraticCurveTo(-60,-80,0,-78); c.quadraticCurveTo(60,-80,72,-30); c.lineTo(60,-40); c.lineTo(40,-56); c.lineTo(20,-44); c.lineTo(0,-60); c.lineTo(-20,-44); c.lineTo(-40,-56); c.lineTo(-60,-40); c.closePath(); c.fill();
  c.fillStyle='#b45309'; rr(c,-72,-10,22,90,10); c.fill(); rr(c,50,-10,22,90,10); c.fill();
  c.fillStyle='#fecaca'; circ(c,-42,30,12); c.fill(); circ(c,42,30,12); c.fill();
  c.fillStyle='#e9a86b'; el(c,0,26,16,20); c.fill();
  if(estado==='hit'||sent){ c.strokeStyle='#111'; c.lineWidth=4; [-30,30].forEach(function(ex){ c.beginPath(); c.moveTo(ex-10,-10); c.lineTo(ex+10,10); c.moveTo(ex+10,-10); c.lineTo(ex-10,10); c.stroke(); }); }
  else { c.fillStyle='#fff'; el(c,-30,0,16,18); c.fill(); el(c,30,0,16,18); c.fill(); var olh=fase||0; c.fillStyle='#1e3a8a'; circ(c,-28+olh*4,2,8); c.fill(); circ(c,32+olh*4,2,8); c.fill(); c.fillStyle='#fff'; circ(c,-25,-2,3); c.fill(); circ(c,35,-2,3); c.fill(); c.strokeStyle='#92400e'; c.lineWidth=6; c.beginPath(); c.moveTo(-46,-26); c.lineTo(-14,-18); c.moveTo(46,-26); c.lineTo(14,-18); c.stroke(); }
  if(boca){ c.fillStyle='#7f1d1d'; el(c,0,56,22*boca+6,14*boca+4); c.fill(); c.fillStyle='#fff'; c.fillRect(-14,48,28,6); }
  else if(sent){ c.strokeStyle='#7f1d1d'; c.lineWidth=5; c.beginPath(); c.arc(0,66,16,PI*1.15,PI*1.85); c.stroke(); }
  else { c.strokeStyle='#7f1d1d'; c.lineWidth=5; c.beginPath(); c.arc(0,48,18,.15*PI,.85*PI); c.stroke(); }
  c.restore();
  c.restore();
}
function bolaNeve(c,b,t){ c.fillStyle='#fff'; circ(c,b.x,b.y,b.r); c.fill(); c.fillStyle='rgba(148,163,184,.4)'; circ(c,b.x+b.r*.3,b.y+b.r*.3,b.r*.5); c.fill(); c.fillStyle='rgba(255,255,255,.9)'; circ(c,b.x-b.r*.35,b.y-b.r*.35,b.r*.25); c.fill(); }
function barraVida(c,x,y,w,hp,max){ c.fillStyle='rgba(0,0,0,.5)'; rr(c,x-4,y-4,w+8,30,10); c.fill(); for(var i=0;i<max;i++){ var cw=(w-(max-1)*4)/max; c.fillStyle=i<hp?lin(c,0,y,0,y+22,'#f87171','#b91c1c'):'rgba(255,255,255,.15)'; rr(c,x+i*(cw+4),y,cw,22,6); c.fill(); } c.fillStyle='#fff'; c.font='900 14px Arial'; c.textAlign='left'; c.fillText('GIGANTE',x,y-10); }

/* ============================================================
   MAPA DO CANADÁ (estilizado) + nós das fases
   ============================================================ */
var CANADA=[[70,330],[90,250],[140,200],[200,150],[260,110],[330,80],[420,60],[520,55],[620,70],[700,60],[760,80],[800,120],[840,150],[870,200],[905,250],[915,300],[880,330],[850,320],[820,360],[780,390],[730,400],[690,380],[660,400],[600,420],[560,400],[520,420],[470,410],[420,420],[370,410],[320,420],[260,400],[200,410],[150,400],[110,380],[80,360]];
function mapaFundo(c,t){
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#0c1a3a'); g.addColorStop(1,'#0e4f7a'); c.fillStyle=g; c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(255,255,255,.08)'; c.lineWidth=1; for(var i=0;i<12;i++){ c.beginPath(); c.moveTo(0,i*48+Math.sin(t*.5+i)*4); c.lineTo(W,i*48+Math.cos(t*.4+i)*4); c.stroke(); }
  c.fillStyle='#fff'; for(var s=0;s<40;s++){ c.globalAlpha=.3+.6*Math.abs(Math.sin(t+s)); circ(c,hash(s)*W,hash(s+50)*60,hash(s+9)*1.5+.5); c.fill(); } c.globalAlpha=1;
  /* terra */
  c.save(); c.shadowColor='rgba(0,0,0,.5)'; c.shadowBlur=24; c.shadowOffsetY=8;
  c.beginPath(); CANADA.forEach(function(p,i){ if(i)c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.closePath();
  var tg=c.createLinearGradient(0,60,0,420); tg.addColorStop(0,'#e2e8f0'); tg.addColorStop(.35,'#86efac'); tg.addColorStop(1,'#4d7c0f'); c.fillStyle=tg; c.fill(); c.restore();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=3; c.stroke();
  /* lagos e detalhes */
  c.fillStyle='#38bdf8'; el(c,560,250,40,22); c.fill(); el(c,640,230,26,14); c.fill(); el(c,480,300,22,12); c.fill();
  for(var m=0;m<5;m++){ montanha(c,150+m*30,230-m*6,40,36+hash(m)*16,'#64748b',true); }
  for(var p2=0;p2<6;p2++){ pinheiro(c,300+p2*40+hash(p2)*20,200+hash(p2+3)*30,24,'#166534'); }
  c.fillStyle='rgba(255,255,255,.35)'; c.font='900 13px Arial'; c.textAlign='center'; c.fillText('OCEANO ÁRTICO',480,36); c.fillText('OCEANO PACÍFICO',90,470); c.fillText('OCEANO ATLÂNTICO',880,470);
  c.save(); c.translate(900,70); c.strokeStyle='#fff'; c.lineWidth=2; c.beginPath(); c.moveTo(0,22); c.lineTo(0,-22); c.moveTo(-8,-10); c.lineTo(0,-22); c.lineTo(8,-10); c.stroke(); c.fillStyle='#fff'; c.font='900 14px Arial'; c.fillText('N',0,-28); c.restore();
}
function cadeado(c,x,y){ c.fillStyle='#78716c'; rr(c,x-11,y-6,22,18,5); c.fill(); c.strokeStyle='#a8a29e'; c.lineWidth=4; c.beginPath(); c.arc(x,y-8,7,PI,TAU); c.stroke(); c.fillStyle='#292524'; circ(c,x,y+3,3); c.fill(); }

var A={W:W,H:H,rr:rr,el:el,circ:circ,lin:lin,hash:hash,folha:folha,estrela:estrela,urso:urso,inimigo:inimigo,caixa:caixa,
  bandeira:bandeira,barreira:barreira,mastro:mastro,tecla:tecla,balao:balao,CENAS:CENAS,ceu:ceu,longe:longe,perto:perto,nuvem:nuvem,engrenagem:engrenagem,pinheiro:pinheiro,bordo:bordo,montanha:montanha,
  chao:chao,plataforma:plataforma,particula:particula,gigante:gigante,bolaNeve:bolaNeve,barraVida:barraVida,mapaFundo:mapaFundo,cadeado:cadeado};
return A;
})();
