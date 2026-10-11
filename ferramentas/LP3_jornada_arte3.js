/* ============================================================
   LP3_jornada_arte3.js — o urso CUSTOMIZÁVEL (uniforme, mochila,
   lancheira, chapéu, óculos, cachecol), os itens de poder (mel,
   capa, bota, pinhas, patins), o peixe das arenas, as cenas novas
   (canal de Ottawa, farol de Peggy's Cove) e o fundo das arenas.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;

/* ---------- opções de customização ---------- */
A.OPCOES={
  uniforme:['#dc2626','#2563eb','#16a34a','#eab308','#9333ea','#ec4899','#f97316','#0d9488'],
  mochila:['nenhuma','costas','rodinhas'],
  lancheira:['nao','sim'],
  chapeu:['nenhum','bone','gorro','coroa','laco'],
  oculos:['nao','sim'],
  cachecol:['nenhum','#dc2626','#2563eb','#16a34a','#eab308','#ec4899','#fff']
};
A.LOOK={uniforme:0, mochila:'nenhuma', lancheira:'nao', chapeu:'nenhum', oculos:'nao', cachecol:'#dc2626'};

/* ---------- o urso (pés em x,y; dir ±1; look opcional) ---------- */
A.urso=function(c,x,y,estado,t,dir,escala,look){
  look=look||A.LOOK; escala=escala||1; dir=dir||1;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala);
  var resp=Math.sin(t*3)*1.5, passo=Math.sin(t*14);
  var bob=0,legL=0,legR=0,armL=0,armR=0,bodyRot=0,headTilt=0;
  if(estado==='idle'){ bob=resp; armL=.15; armR=-.15; }
  else if(estado==='walk'){ bob=Math.abs(passo)*2; legL=passo*18; legR=-passo*18; armL=-passo*.5; armR=passo*.5; }
  else if(estado==='jump'){ bob=-3; legL=-8; legR=10; armL=-1.6; armR=1.6; }
  else if(estado==='fall'){ legL=6; legR=-6; armL=-2.2; armR=2.2; }
  else if(estado==='glide'){ legL=4; legR=-4; armL=-2.9; armR=2.9; bob=Math.sin(t*4)*2; }
  else if(estado==='cheer'){ var ch=Math.abs(Math.sin(t*8)); bob=-ch*14; armL=-2.6-ch*.3; armR=2.6+ch*.3; legL=-ch*8; legR=-ch*8; headTilt=Math.sin(t*8)*.12; }
  else if(estado==='eat'){ armR=-1.2+Math.sin(t*10)*.3; armL=.3; headTilt=Math.sin(t*10)*.08; bob=resp; }
  else if(estado==='dizzy'){ headTilt=Math.sin(t*5)*.25; armL=.6; armR=-.6; bodyRot=Math.sin(t*4)*.08; }
  else if(estado==='thrown'){ bodyRot=t*9; armL=-2.4; armR=2.4; legL=12; legR=-12; }
  c.rotate(bodyRot);
  if(estado!=='thrown'){ c.save(); c.globalAlpha=.25; c.fillStyle='#000'; el(c,0,2,22,5); c.fill(); c.restore(); }
  c.translate(0,bob);
  var pelo=lin(c,-20,-60,20,0,'#3a3a44','#121216');
  /* capa (atrás) */
  if(look.capa){ c.save(); c.fillStyle=look.capa; var fl=Math.sin(t*6)*6; c.beginPath(); c.moveTo(-16,-56); c.quadraticCurveTo(-34-fl,-30,-30-fl,-4); c.lineTo(-8,-14); c.lineTo(-10,-56); c.fill(); c.restore(); }
  /* mochila (atrás) */
  if(look.mochila==='costas'){ c.fillStyle=A.OPCOES.uniforme[(look.uniforme+3)%8]; rr(c,-36,-56,20,30,8); c.fill(); c.fillStyle='rgba(255,255,255,.3)'; rr(c,-33,-50,14,10,4); c.fill(); }
  /* pernas e pés */
  c.fillStyle='#16161a'; rr(c,-16+legL*.3,-22,14,24,7); c.fill(); rr(c,2+legR*.3,-22,14,24,7); c.fill();
  if(look.bota){ c.fillStyle='#b45309'; rr(c,-18+legL*.4,-8,20,9,4); c.fill(); rr(c,-2+legR*.4,-8,20,9,4); c.fill(); }
  c.fillStyle=look.patins?'#e5e7eb':'#1f1f25'; el(c,-9+legL*.4,-1,11,5); c.fill(); el(c,9+legR*.4,-1,11,5); c.fill();
  if(look.patins){ c.strokeStyle='#94a3b8'; c.lineWidth=2; c.beginPath(); c.moveTo(-20+legL*.4,3); c.lineTo(2+legL*.4,3); c.moveTo(-2+legR*.4,3); c.lineTo(20+legR*.4,3); c.stroke(); }
  /* corpo + uniforme */
  c.fillStyle=pelo; el(c,0,-34,24,26); c.fill();
  var uni=A.OPCOES.uniforme[look.uniforme||0]; c.fillStyle=lin(c,0,-56,0,-20,uni,uni); c.save(); el(c,0,-34,24,26); c.clip(); c.fillRect(-26,-58,52,30); c.restore();
  c.fillStyle='rgba(255,255,255,.22)'; el(c,0,-28,13,14); c.fill(); A.folha(c,0,-44,5,0,'#fff');
  /* braços */
  function braco(sx,rot){ c.save(); c.translate(sx*20,-44); c.rotate(rot*sx); c.fillStyle=uni; rr(c,-6,-4,12,14,6); c.fill(); c.fillStyle='#16161a'; rr(c,-6,6,12,14,6); c.fill(); c.fillStyle='#1f1f25'; circ(c,0,20,6.5); c.fill(); c.restore(); }
  braco(-1,armL); braco(1,armR);
  if(look.lancheira==='sim'){ c.save(); c.translate(26,-20+Math.sin(t*6)*1.5); c.fillStyle='#f472b6'; rr(c,-8,0,16,13,3); c.fill(); c.fillStyle='#be185d'; rr(c,-8,0,16,4,2); c.fill(); c.strokeStyle='#be185d'; c.lineWidth=2; c.beginPath(); c.arc(0,0,4,PI,TAU); c.stroke(); c.restore(); }
  if(look.mochila==='rodinhas'){ c.save(); c.translate(-30,-6); c.fillStyle=A.OPCOES.uniforme[(look.uniforme+3)%8]; rr(c,-10,-30,20,30,6); c.fill(); c.strokeStyle='#9ca3af'; c.lineWidth=3; c.beginPath(); c.moveTo(0,-30); c.lineTo(8,-52); c.stroke(); c.fillStyle='#111'; circ(c,-6,2,4); c.fill(); circ(c,6,2,4); c.fill(); c.restore(); }
  /* cachecol */
  if(look.cachecol&&look.cachecol!=='nenhum'){ c.fillStyle=look.cachecol; rr(c,-18,-58,36,10,5); c.fill(); rr(c,6,-52,9,16,4); c.fill(); }
  /* cabeça */
  c.save(); c.translate(0,-72); c.rotate(headTilt);
  c.fillStyle='#16161a'; circ(c,-18,-14,9); c.fill(); circ(c,18,-14,9); c.fill(); c.fillStyle='#4a3a35'; circ(c,-18,-14,4.5); c.fill(); circ(c,18,-14,4.5); c.fill();
  c.fillStyle=lin(c,-22,-22,22,22,'#3a3a44','#141418'); circ(c,0,0,23); c.fill();
  c.fillStyle='#e8d3b0'; el(c,6,6,11,8.5); c.fill(); c.fillStyle='#1a1a1a'; el(c,10,3,5,3.6); c.fill(); c.fillStyle='rgba(255,255,255,.5)'; el(c,9,2,1.8,1.1); c.fill();
  c.strokeStyle='#5b4636'; c.lineWidth=1.3; c.beginPath(); c.moveTo(10,6.5); c.lineTo(10,9.5); c.moveTo(6,10.5); c.quadraticCurveTo(10,12.5,14,10.5); c.stroke();
  if(estado==='dizzy'){ c.strokeStyle='#fff'; c.lineWidth=2; [-7,9].forEach(function(ex){ c.beginPath(); c.moveTo(ex-3,-6); c.lineTo(ex+3,0); c.moveTo(ex+3,-6); c.lineTo(ex-3,0); c.stroke(); }); }
  else { var blink=(Math.sin(t*1.3)>.985)?.25:1; c.fillStyle='#fff'; el(c,-6,-4,4.5,4.8*blink); c.fill(); el(c,10,-4,4.5,4.8*blink); c.fill(); c.fillStyle='#111'; el(c,-5,-3.5,2.6,3*blink); c.fill(); el(c,11,-3.5,2.6,3*blink); c.fill(); c.fillStyle='#fff'; circ(c,-4.2,-5,1); c.fill(); circ(c,11.8,-5,1); c.fill();
    if(estado==='cheer'||estado==='eat'){ c.strokeStyle='#e8d3b0'; c.lineWidth=1.5; c.beginPath(); c.arc(8,8,6,.15*PI,.85*PI); c.stroke(); } }
  if(look.oculos==='sim'){ c.strokeStyle='#1d4ed8'; c.lineWidth=2.5; c.beginPath(); c.arc(-6,-4,7,0,TAU); c.moveTo(1,-4); c.lineTo(3,-4); c.arc(10,-4,7,0,TAU); c.moveTo(-13,-5); c.lineTo(-20,-9); c.stroke(); c.fillStyle='rgba(147,197,253,.35)'; circ(c,-6,-4,7); c.fill(); circ(c,10,-4,7); c.fill(); }
  if(look.chapeu==='bone'){ c.fillStyle=uni; c.beginPath(); c.arc(0,-12,21,PI,TAU); c.fill(); rr(c,-2,-14,34,7,3); c.fill(); c.fillStyle='rgba(0,0,0,.2)'; rr(c,-2,-14,34,3,2); c.fill(); }
  else if(look.chapeu==='gorro'){ c.fillStyle=uni; c.beginPath(); c.arc(0,-12,22,PI,TAU); c.fill(); c.fillStyle='#fff'; rr(c,-23,-16,46,8,4); c.fill(); circ(c,2,-36,6); c.fill(); }
  else if(look.chapeu==='coroa'){ c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(-16,-18); c.lineTo(-16,-36); c.lineTo(-8,-26); c.lineTo(0,-40); c.lineTo(8,-26); c.lineTo(16,-36); c.lineTo(16,-18); c.closePath(); c.fill(); c.fillStyle='#ef4444'; circ(c,0,-26,3); c.fill(); }
  else if(look.chapeu==='laco'){ c.fillStyle='#ec4899'; c.beginPath(); c.moveTo(12,-22); c.lineTo(0,-30); c.lineTo(12,-38); c.closePath(); c.fill(); c.beginPath(); c.moveTo(12,-22); c.lineTo(24,-30); c.lineTo(12,-38); c.closePath(); c.fill(); circ(c,12,-30,3.5); c.fill(); }
  c.restore();
  if(estado==='dizzy'){ for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; A.estrela(c,Math.cos(a)*22,-104+Math.sin(a)*6,5,'#fde047',a); } }
  c.restore();
};

/* ---------- itens de poder ---------- */
A.item=function(c,it,t){
  if(it.pego) return; var bob=Math.sin(t*3+it.x*.03)*4; c.save(); c.translate(it.x,it.y+bob);
  var g=c.createRadialGradient(0,0,4,0,0,30); g.addColorStop(0,'rgba(255,255,255,.35)'); g.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=g; circ(c,0,0,30); c.fill();
  switch(it.tipo){
    case 'mel': c.fillStyle=lin(c,-14,-14,14,14,'#fbbf24','#b45309'); rr(c,-14,-10,28,24,8); c.fill(); c.fillStyle='#7c2d12'; rr(c,-11,-16,22,8,3); c.fill(); c.fillStyle='#fde68a'; el(c,0,-2,9,4); c.fill(); c.fillStyle='#fff'; c.font='900 11px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('MEL',0,5); break;
    case 'capa': c.fillStyle='#7c3aed'; c.beginPath(); c.moveTo(-14,-14); c.quadraticCurveTo(0,-20,14,-14); c.lineTo(18,14); c.quadraticCurveTo(0,8,-18,14); c.fill(); c.fillStyle='#fbbf24'; circ(c,0,-12,3.5); c.fill(); break;
    case 'bota': c.fillStyle='#b45309'; rr(c,-8,-16,14,24,4); c.fill(); rr(c,-10,2,26,10,4); c.fill(); c.fillStyle='#fde68a'; rr(c,-8,-16,14,5,2); c.fill(); c.fillStyle='#fff'; A.estrela(c,8,-6,4,'#fff',0); break;
    case 'pinhas': c.fillStyle='#78350f'; el(c,0,0,10,14); c.fill(); c.fillStyle='#a16207'; for(var i=0;i<4;i++) for(var j=0;j<3;j++){ el(c,-6+j*6,-9+i*6,3,2); c.fill(); } c.fillStyle='#fff'; c.font='900 11px "Nunito",Arial'; c.textAlign='center'; c.fillText('x3',14,10); break;
    case 'patins': c.fillStyle='#e5e7eb'; rr(c,-12,-10,22,14,4); c.fill(); c.fillStyle='#2563eb'; rr(c,-12,-12,10,16,3); c.fill(); c.strokeStyle='#94a3b8'; c.lineWidth=3; c.beginPath(); c.moveTo(-14,8); c.lineTo(14,8); c.stroke(); break;
  }
  c.restore();
};
/* ---------- peixe (arena) ---------- */
A.peixe=function(c,x,y,r,t,cor){
  c.save(); c.translate(x,y); var w=Math.sin(t*10)*.2;
  c.fillStyle=cor||'#fb923c'; el(c,0,0,r,r*.55); c.fill();
  c.save(); c.rotate(w); c.beginPath(); c.moveTo(-r*.8,0); c.lineTo(-r*1.4,-r*.5); c.lineTo(-r*1.4,r*.5); c.closePath(); c.fill(); c.restore();
  c.fillStyle='rgba(255,255,255,.4)'; el(c,r*.1,-r*.15,r*.5,r*.2); c.fill();
  c.fillStyle='#fff'; circ(c,r*.5,-r*.12,r*.16); c.fill(); c.fillStyle='#111'; circ(c,r*.55,-r*.12,r*.08); c.fill();
  c.restore();
};
/* ---------- cenas novas: canal de Ottawa e farol de Peggy's Cove ---------- */
A.CENAS.canal={ceu:['#1e3a8a','#60a5fa','#e0f2fe'], chaoTop:'#dbeafe', chao:'#93c5fd', chaoBase:'#1d4ed8', plat:'#bfdbfe', platTop:'#ffffff', part:'neve', musica:'canal'};
A.CENAS.farol={ceu:['#7c2d12','#fb923c','#fde68a'], chaoTop:'#78716c', chao:'#57534e', chaoBase:'#292524', plat:'#a8a29e', platTop:'#e7e5e4', part:'nuvem', musica:'farol'};
var longe1=A.longe, perto1=A.perto;
A.longe=function(c,cena,cam,t){
  var i,x;
  if(cena==='canal'){ /* Parlamento: torres góticas */
    c.fillStyle='#1e293b'; for(i=0;i<5;i++){ x=((i*330-cam)%(W+400)+W+400)%(W+400)-200; c.fillRect(x,300,200,150); c.fillRect(x+80,200,40,110); c.beginPath(); c.moveTo(x+76,200); c.lineTo(x+100,140); c.lineTo(x+124,200); c.fill(); c.fillRect(x+10,260,24,50); c.fillRect(x+166,260,24,50); c.fillStyle='rgba(253,224,71,.7)'; for(var j=0;j<4;j++) c.fillRect(x+30+j*40,330,14,26); c.fillStyle='#1e293b'; }
    c.fillStyle='#bfdbfe'; c.fillRect(0,420,W,40); return; }
  if(cena==='farol'){ c.fillStyle='#0c4a6e'; c.fillRect(0,330,W,130); c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=2; for(i=0;i<16;i++){ x=((i*70-cam*.4+t*25)%(W+100)+W+100)%(W+100)-50; c.beginPath(); c.arc(x,350+(i%4)*20,16,PI*1.1,PI*1.9); c.stroke(); }
    x=((500-cam*.6)%(W+500)+W+500)%(W+500)-250; c.fillStyle='#78716c'; el(c,x,340,120,30); c.fill(); c.fillStyle='#f5f5f4'; c.beginPath(); c.moveTo(x-22,330); c.lineTo(x-14,200); c.lineTo(x+14,200); c.lineTo(x+22,330); c.fill(); c.fillStyle='#dc2626'; c.fillRect(x-16,196,32,26); c.fillRect(x-20,260,40,14);
    var gl=.5+.5*Math.sin(t*2); c.fillStyle='rgba(253,224,71,'+gl+')'; circ(c,x,208,9); c.fill(); c.save(); c.globalAlpha=.25*gl; c.fillStyle='#fde68a'; c.beginPath(); c.moveTo(x,208); c.lineTo(x+320,120); c.lineTo(x+320,300); c.fill(); c.restore(); return; }
  longe1(c,cena,cam,t);
};
A.perto=function(c,cena,cam,t){
  var i,x;
  if(cena==='canal'){ for(i=0;i<6;i++){ x=((i*300-cam)%(W+300)+W+300)%(W+300)-150; A.pinheiro(c,x,452,90+hash(i)*30,'#1e3a8a'); c.fillStyle='#e0f2fe'; el(c,x,452-80,12,5); c.fill(); c.fillStyle='#78350f'; c.fillRect(x+120,420,6,32); c.fillStyle='#fbbf24'; c.fillRect(x+112,410,22,12); } return; }
  if(cena==='farol'){ for(i=0;i<5;i++){ x=((i*280-cam)%(W+300)+W+300)%(W+300)-150; c.fillStyle='#57534e'; el(c,x,452,70,22); c.fill(); c.fillStyle='#ef4444'; rr(c,x-12,428,24,16,6); c.fill(); c.strokeStyle='#ef4444'; c.lineWidth=3; c.beginPath(); c.moveTo(x-10,428); c.lineTo(x-18,414); c.moveTo(x+10,428); c.lineTo(x+18,414); c.stroke(); } return; }
  perto1(c,cena,cam,t);
};
/* ---------- fundo da arena (por mundo) ---------- */
A.arenaFundo=function(c,cena,t){
  var base=/sub_/.test(cena)?'sub_caverna':cena; if(!A.CENAS[base]) base='floresta';
  A.ceu(c,base,t); A.longe(c,base,t*10,t); if(/sub_/.test(cena)) A.fundoSub(c,cena,t*10,t);
  c.fillStyle='rgba(13,11,30,.35)'; c.fillRect(0,0,W,H);
  /* holofotes */
  for(var i=0;i<3;i++){ c.save(); c.globalAlpha=.12; c.fillStyle='#fde68a'; var a=Math.sin(t*.8+i*2)*.3; c.translate(200+i*280,0); c.rotate(a); c.beginPath(); c.moveTo(0,0); c.lineTo(-90,H); c.lineTo(90,H); c.fill(); c.restore(); }
  /* palco */
  c.fillStyle=lin(c,0,430,0,H,'#3f2a14','#1c1917'); c.fillRect(0,430,W,H-430); c.fillStyle='#78350f'; c.fillRect(0,430,W,10);
  for(var k=0;k<24;k++){ c.fillStyle='rgba(253,224,71,'+(.3+.5*Math.abs(Math.sin(t*4+k)))+')'; circ(c,20+k*40,436,3); c.fill(); }
};
})();
