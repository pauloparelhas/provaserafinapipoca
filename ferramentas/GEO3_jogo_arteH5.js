/* ============================================================
   GEO3_jogo_arteH5.js — Guardiões da Casa Maior. Cenas 5/6: as PEÇAS que o motor
   desenha por dentro e que agora chamam a arte nova (ganchos ligados por
   gen/jogo_geo3_t_motor.py e t_falas.py):
   - A.spriteCorrida(c,sp,x,y,k,t,clip): enfeites da beira da pista (corrida.js):
     placas de rodovia, árvores da mata, postes, cones da rua alagada, a margem do
     rio com o Rei Entulho no fim, e a torcida = gente do bairro (U3 S26-S28).
   - A.sacoLixo(c,aceso,caido,t): os sacos de lixo do escudo do chefão (chefao.js).
   - A.tocoTrilha(c,t): o toco de árvore que segura cada semente (poderes.js).
   - A.selaPampa(c): sela simples do cavalo crioulo (arteA2.js).
   - A.trajeItem(c,t): óculos de nadar (cena.js).
   - A.introMesa(c,it,t): a escrivaninha com o croqui, na abertura (cena.js).
   - A.capaLivro(c,t): a capa — Mariana, João e o Bem-te-vi na rua do bairro.
   Sem imagem, sem emoji, nada pisca.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING||!A.TB||!A.TH) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, mix=I.mix, esc=I.esc, cla=I.cla, brilho=I.brilho;
var N=A.CN, linha=N.linha, arvoreR=N.arvoreR, flor=N.flor;
var TH=A.TH, FONTE=TH.FONTE;
function F(peso,px){ return peso+' '+px+'px '+FONTE; }

/* ---------- corrida: enfeites da beira ---------- */
var TORCIDA=[['lucia','locutor','vovo','joao'],['engenheira','fotografo','francisco','lucia'],['vovo','joao','locutor','engenheira'],['fotografo','lucia','francisco','vovo'],['locutor','engenheira','joao','fotografo']];
A.spriteCorrida=function(c,sp,x,y,k,t,clip){
  var s=k, tipo=sp.tipo, q;
  if(tipo==='tocha'){ /* placa verde de rodovia */ c.save(); c.translate(x,y); c.scale(s*600/100,s*600/100); c.fillStyle='#6b7280'; c.fillRect(-4,-60,8,60); c.fillStyle='#15803d'; rr(c,-30,-92,60,30,4); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2; rr(c,-30,-92,60,30,4); c.stroke(); c.fillStyle='#fff'; c.font=F(900,11); c.textAlign='center'; c.textBaseline='middle'; c.fillText('LITORAL',0,-82); c.beginPath(); c.moveTo(-8,-70); c.lineTo(8,-70); c.lineTo(0,-66); c.closePath(); c.fill(); c.restore(); return true; }
  if(tipo==='bandeira'){ /* árvore da mata ciliar */ c.save(); c.translate(x,y); c.scale(s*700/100,s*700/100); c.fillStyle='#6b4428'; c.fillRect(-6,-44,12,44); c.fillStyle='#2f6f3a'; circ(c,0,-66,34); c.fill(); c.fillStyle='#4f9a4c'; circ(c,-14,-76,18); c.fill(); circ(c,16,-70,16); c.fill(); c.fillStyle='#e11d48'; circ(c,-8,-56,3); c.fill(); circ(c,10,-62,3); c.fill(); c.restore(); return true; }
  if(tipo==='fardo'){ /* poste de luz da avenida */ c.save(); c.translate(x,y); c.scale(s*600/100,s*600/100); c.fillStyle='#4b5563'; c.fillRect(-3,-90,6,90); c.beginPath(); c.moveTo(0,-90); c.quadraticCurveTo(4,-104,26,-102); c.lineTo(26,-98); c.quadraticCurveTo(6,-100,3,-86); c.fill(); c.fillStyle='#1f2937'; rr(c,14,-106,24,8,3); c.fill(); c.fillStyle='#fff7d6'; el(c,26,-98,9,3); c.fill(); c.restore(); return true; }
  if(tipo==='junco'){ /* cone de trânsito na rua alagada */ c.save(); c.translate(x,y); c.scale(s*500/100,s*500/100); c.fillStyle='rgba(56,189,248,.45)'; el(c,0,0,40,8); c.fill(); c.fillStyle='#1f2937'; c.fillRect(-14,-4,28,4); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(-10,-4); c.lineTo(-2,-40); c.lineTo(2,-40); c.lineTo(10,-4); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.moveTo(-7,-16); c.lineTo(-5,-26); c.lineTo(5,-26); c.lineTo(7,-16); c.fill(); c.restore(); return true; }
  if(tipo==='arvore_seca'){ /* placa amarela: rua alagada */ c.save(); c.translate(x,y); c.scale(s*600/100,s*600/100); c.fillStyle='#6b7280'; c.fillRect(-3,-50,6,50); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(0,-92); c.lineTo(30,-62); c.lineTo(0,-32); c.lineTo(-30,-62); c.closePath(); c.fill(); c.strokeStyle='#1c1917'; c.lineWidth=2.5; c.stroke(); c.fillStyle='#1c1917'; c.font=F(900,9); c.textAlign='center'; c.textBaseline='middle'; c.fillText('RUA',0,-68); c.fillText('ALAGADA',0,-57); c.restore(); return true; }
  if(tipo==='castelo'){ /* a margem do rio com o monte de lixo e o Rei Entulho em cima */
    c.save(); c.translate(x,y); c.scale(s*4000/300,s*4000/300);
    c.fillStyle='#5fb3d0'; c.fillRect(-220,-70,440,30); c.fillStyle='rgba(255,255,255,.35)'; for(q=-200;q<200;q+=40) el(c,q,-60,10,1.5); c.fill();
    c.fillStyle='#4b5563'; c.beginPath(); c.moveTo(-130,0); c.quadraticCurveTo(-120,-90,-30,-110); c.quadraticCurveTo(40,-140,130,-80); c.quadraticCurveTo(150,-30,140,0); c.closePath(); c.fill();
    c.fillStyle='#1f2937'; [[-80,-40],[20,-70],[70,-40]].forEach(function(p){ circ(c,p[0],p[1],16); c.fill(); c.fillStyle='#4b5563'; circ(c,p[0],p[1],7); c.fill(); c.fillStyle='#1f2937'; });
    c.fillStyle='#f8fafc'; rr(c,-40,-60,22,22,5); c.fill(); c.fillStyle='#22c55e'; rr(c,40,-90,10,24,3); c.fill(); c.fillStyle='#f97316'; rr(c,-100,-70,12,14,2); c.fill();
    if(A.conde){ c.save(); c.translate(0,-104); c.scale(.9,.9); A.conde(c,0,0,'laugh',t); c.restore(); }
    c.restore(); return true; }
  if(tipo==='torcida_magica'){ /* a torcida é a gente do bairro: agente de trânsito, Seu José, Dona Antônia, pedreiro, entregador, gari, motorista */
    c.save(); c.translate(x,y); c.scale(s*2000/300,s*2000/300);
    c.fillStyle='#15803d'; c.fillRect(-150,-78,300,78); c.fillStyle='#4ade80'; c.fillRect(-150,-82,300,8);
    var GR=TORCIDA[sp.k||0];
    if(A.morador&&k*2000/300>.18) GR.forEach(function(tp,i){ var bob=Math.abs(Math.sin(t*3+i*1.3))*6; c.save(); c.translate(-108+i*72,-82-bob); c.scale(.62,.62); A.morador(c,tp,0,0,t+i,i%2?-1:1,false); c.restore(); });
    for(q=0;q<6;q++){ var a3=t*1.5+q; if(A.estrela) A.estrela(c,-130+q*52,-196+Math.sin(a3)*8,5,['#fde047','#4ade80','#93c5fd'][q%3],a3); }
    c.fillStyle='#fde047'; rr(c,-92,-40,184,30,10); c.fill(); c.fillStyle='#14532d'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText('VAI, GUARDIÃO!',0,-25);
    c.restore(); return true; }
  return false;
};

/* ---------- chefão: saco de lixo do escudo (no lugar do tinteiro) ---------- */
A.sacoLixo=function(c,aceso,caido,t){
  c.fillStyle=aceso?lin(c,-16,-44,16,0,'#4b5563','#111827'):'#1f2937';
  c.beginPath(); c.moveTo(-17,0); c.quadraticCurveTo(-22,-20,-14,-34); c.quadraticCurveTo(-6,-40,-2,-44); c.lineTo(2,-44); c.quadraticCurveTo(6,-40,14,-34); c.quadraticCurveTo(22,-20,17,0); c.closePath(); c.fill();
  if(aceso){ c.strokeStyle='#fde047'; c.lineWidth=3; c.stroke(); }
  c.fillStyle='rgba(255,255,255,.14)'; el(c,-7,-22,5,10); c.fill();
  c.fillStyle='#374151'; c.beginPath(); c.moveTo(-6,-46); c.quadraticCurveTo(-12,-56,-4,-58); c.lineTo(0,-50); c.lineTo(4,-58); c.quadraticCurveTo(12,-56,6,-46); c.closePath(); c.fill(); c.fillStyle='#fde047'; circ(c,0,-47,2.5); c.fill();
  c.fillStyle='#fff'; circ(c,-5,-24,3); c.fill(); circ(c,5,-24,3); c.fill(); c.fillStyle='#1f2937'; circ(c,-4,-24,1.4); c.fill(); circ(c,6,-24,1.4); c.fill(); /* olhinhos: cômico, nunca assustador */
  c.strokeStyle='#9ca3af'; c.lineWidth=1.5; c.beginPath(); c.arc(0,-16,4,.2,PI-.2); c.stroke();
  if(caido){ c.fillStyle='#86efac'; el(c,8,4,10,4); c.fill(); c.fillStyle='#f97316'; rr(c,14,-2,8,5,1); c.fill(); }
};

/* ---------- trilha das sementes: toco de árvore ---------- */
A.tocoTrilha=function(c,t){
  c.fillStyle='rgba(0,0,0,.18)'; el(c,0,2,24,5); c.fill();
  c.fillStyle=lin(c,-16,0,16,0,'#a8743f','#6b4428'); c.fillRect(-16,-46,32,46); c.fillStyle='rgba(0,0,0,.15)'; c.fillRect(10,-46,6,46);
  c.strokeStyle='rgba(60,30,10,.35)'; c.lineWidth=1.2; linha(c,-8,-40,-9,-6); linha(c,2,-36,3,-8);
  c.fillStyle='#6b4428'; c.beginPath(); c.moveTo(-16,0); c.lineTo(-26,2); c.lineTo(-16,-8); c.fill(); c.beginPath(); c.moveTo(16,0); c.lineTo(26,2); c.lineTo(16,-8); c.fill();
  c.fillStyle='#e8c89a'; el(c,0,-46,18,6); c.fill(); c.strokeStyle='#b8905a'; c.lineWidth=1; el(c,0,-46,12,4); c.stroke(); el(c,0,-46,6,2); c.stroke();
  c.fillStyle='#4fa844'; el(c,-20,-4,6,3); c.fill(); el(c,22,-6,5,2.5); c.fill(); c.fillStyle='#8fd860'; el(c,-21,-5,3,1.5); c.fill();
};

/* ---------- cavalo crioulo: sela simples, sem marca de fazenda ---------- */
A.selaPampa=function(c){
  c.beginPath(); c.moveTo(-15,-41); c.quadraticCurveTo(-1,-45,14,-41); c.lineTo(13,-30); c.quadraticCurveTo(-1,-33,-15,-30); c.closePath(); c.fillStyle=lin(c,0,-45,0,-30,'#dc2626','#991b1b'); c.fill(); c.strokeStyle='#1f2937'; c.lineWidth=1.5; c.stroke(); /* pelego/manta vermelha com listras */
  c.strokeStyle='#1f2937'; c.lineWidth=1.2; linha(c,-12,-37,12,-37); linha(c,-12,-33,12,-33);
  c.beginPath(); c.moveTo(-10,-43); c.quadraticCurveTo(-3,-41,0,-41); c.quadraticCurveTo(5,-41,9,-44); c.lineTo(9,-38); c.quadraticCurveTo(-1,-40,-10,-38); c.closePath(); c.fillStyle=lin(c,0,-46,0,-38,'#b8864a','#7a4a1a'); c.fill(); c.strokeStyle='#4a2c12'; c.lineWidth=1.2; c.stroke();
  c.strokeStyle='#5b3418'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-1,-38); c.lineTo(-1,-23); c.stroke();
  c.beginPath(); c.moveTo(-4.5,-23); c.lineTo(2.5,-23); c.lineTo(1.5,-19); c.lineTo(-3.5,-19); c.closePath(); c.strokeStyle='#9ca3af'; c.lineWidth=1.6; c.stroke();
};

/* ---------- óculos de nadar (item do traje) ---------- */
A.trajeItem=function(c,t){
  c.save(); c.scale(1.3,1.3);
  c.strokeStyle='#1e293b'; c.lineWidth=4; c.beginPath(); c.moveTo(-18,-4); c.quadraticCurveTo(0,-18,18,-4); c.stroke();
  c.fillStyle='#0ea5e9'; rr(c,-22,-6,20,16,6); c.fill(); rr(c,2,-6,20,16,6); c.fill(); c.strokeStyle='#1e293b'; c.lineWidth=2; rr(c,-22,-6,20,16,6); c.stroke(); rr(c,2,-6,20,16,6); c.stroke();
  c.fillStyle='rgba(255,255,255,.6)'; rr(c,-18,-3,7,4,2); c.fill(); rr(c,6,-3,7,4,2); c.fill(); c.fillStyle='#1e293b'; c.fillRect(-3,0,6,4);
  c.strokeStyle='#f97316'; c.lineWidth=3; c.beginPath(); c.moveTo(-22,2); c.quadraticCurveTo(-30,14,-20,20); c.moveTo(22,2); c.quadraticCurveTo(30,14,20,20); c.stroke();
  c.restore();
};

/* ---------- abertura: a escrivaninha da Mariana com o croqui do bairro (no lugar do livro) ---------- */
A.introMesa=function(c,it,t){
  var abre=it.i>=1?1:Math.min(1,it.t/2), b=.5+.5*Math.sin(t*1.5);
  var g=c.createRadialGradient(0,-20,10,0,-20,200); g.addColorStop(0,'rgba(253,230,138,'+(.25+.2*b)+')'); g.addColorStop(1,'rgba(253,230,138,0)'); c.fillStyle=g; circ(c,0,-20,200); c.fill();
  c.fillStyle='#7c2d12'; rr(c,-160,-14,320,24,8); c.fill(); c.fillStyle='#9a3412'; c.fillRect(-150,10,12,110); c.fillRect(138,10,12,110);
  c.save(); c.translate(0,-18); c.rotate(-.04); c.fillStyle='#fffbeb'; rr(c,-120,-70,240,96,4); c.fill(); c.strokeStyle='#d6c7a0'; c.lineWidth=1.5; rr(c,-120,-70,240,96,4); c.stroke();
  /* o croqui: ruas, casas, a padaria, a escola, o campinho */
  c.strokeStyle='#64748b'; c.lineWidth=5; linha(c,-110,-20,110,-20); linha(c,-40,-66,-40,20); linha(c,50,-66,50,20); c.strokeStyle='#fde047'; c.lineWidth=1; c.setLineDash([4,4]); linha(c,-110,-20,110,-20); c.setLineDash([]);
  [[-100,-50,'#f5c9b0'],[-70,-50,'#cfe8f3'],[-20,-50,'#f8e3b0'],[70,-50,'#e6e0f5'],[-100,0,'#d8efc6'],[80,0,'#f5c9b0']].forEach(function(h){ c.fillStyle=h[2]; c.fillRect(h[0],h[1],22,16); c.fillStyle='#c0503a'; c.beginPath(); c.moveTo(h[0]-3,h[1]); c.lineTo(h[0]+11,h[1]-8); c.lineTo(h[0]+25,h[1]); c.fill(); });
  c.fillStyle='#d97706'; c.fillRect(10,-52,30,18); c.fillStyle='#fff'; c.font=F(900,6); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PADARIA',25,-43);
  c.fillStyle='#2563eb'; c.fillRect(-30,-2,40,20); c.fillStyle='#fff'; c.fillText('ESCOLA',-10,8); c.fillStyle='#4ade80'; c.fillRect(20,-2,50,20); c.strokeStyle='#fff'; c.lineWidth=1; c.strokeRect(24,2,42,12);
  c.fillStyle='#4f9f44'; [[-55,-40],[-55,8],[100,-40],[100,8]].forEach(function(p){ circ(c,p[0],p[1],5); c.fill(); });
  if(abre>0){ c.save(); c.globalAlpha=abre; c.strokeStyle='#dc2626'; c.lineWidth=2; c.setLineDash([3,3]); c.beginPath(); c.moveTo(-90,10); c.lineTo(-40,10); c.lineTo(-40,-20); c.lineTo(50,-20); c.lineTo(50,-40); c.stroke(); c.setLineDash([]); c.fillStyle='#dc2626'; circ(c,-90,10,4); c.fill(); c.restore(); }
  c.restore();
  c.save(); c.translate(130,-30); c.rotate(.6); c.fillStyle='#fbbf24'; c.fillRect(-3,-30,6,50); c.fillStyle='#fcd9b6'; c.beginPath(); c.moveTo(-3,20); c.lineTo(0,30); c.lineTo(3,20); c.fill(); c.fillStyle='#f472b6'; c.fillRect(-3,-34,6,5); c.restore();
  if(it.i>=1){ c.fillStyle='rgba(30,27,75,.5)'; [[-80,-18,16],[60,-16,18]].forEach(function(s){ el(c,s[0],s[1],s[2],s[2]*.45); c.fill(); }); }
};

/* ---------- a capa: Mariana, João e o Bem-te-vi na rua do bairro ---------- */
var capa0=A.capaLivro, LIVRE_Y=(capa0&&capa0.LIVRE_Y)||440;
function titulo(c,s,x,y,fz){ c.save(); c.font=F(900,fz); c.textAlign='center'; c.textBaseline='middle'; c.lineJoin='round';
  var w=c.measureText(s).width; if(w>820){ fz=fz*820/w; c.font=F(900,fz); }
  c.fillStyle='#2a1408'; c.fillText(s,x+3,y+6); c.strokeStyle='#2a1408'; c.lineWidth=fz*.2; c.strokeText(s,x+3,y+6); c.strokeText(s,x,y);
  var g=c.createLinearGradient(0,y-fz*.4,0,y+fz*.4); g.addColorStop(0,'#fff9c4'); g.addColorStop(.45,'#facc15'); g.addColorStop(1,'#f97316'); c.fillStyle=g; c.fillText(s,x,y);
  c.save(); c.beginPath(); c.rect(x-500,y-fz,1000,fz*.78); c.clip(); c.fillStyle='rgba(255,255,255,.25)'; c.fillText(s,x,y); c.restore(); c.restore(); }
A.capaLivro=function(c,t,sel){
  t=t||0; c.save();
  A.ceu(c,'rua',t); A.longe(c,'rua',t*6,t); A.perto(c,'rua',t*14,t); A.chao(c,{x:0,y:450,w:W,h:90},'rua');
  c.fillStyle='rgba(13,11,30,.18)'; c.fillRect(0,0,W,H);
  var g=c.createRadialGradient(W/2,420,20,W/2,420,260); g.addColorStop(0,'rgba(253,224,71,.35)'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; circ(c,W/2,420,260); c.fill();
  if(A.heroi){ A.heroi(c,400,452,'cheer',t,1,1.3,'lia'); A.heroi(c,560,452,'idle',t+1,-1,1.3,'theo'); }
  if(A.morador) A.morador(c,'tic',480,330+Math.sin(t*1.3)*6,t,1,false);
  titulo(c,'GUARDIÕES DA CASA MAIOR',W/2,80,66);
  var sub='Meio ambiente, nossa casa maior'; c.font=F(800,22); var sw=c.measureText(sub).width+56, sx=W/2-sw/2, sy=126, sh=34;
  c.fillStyle=lin(c,0,sy,0,sy+sh,'#3b82f6','#1d4ed8'); rr(c,sx,sy,sw,sh,8); c.fill(); c.strokeStyle='#172554'; c.lineWidth=1.8; rr(c,sx,sy,sw,sh,8); c.stroke(); c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(sub,W/2,sy+sh/2+1);
  for(var i=0;i<5;i++){ var a=Math.sin(t*1.7+i*2.1); if(a>.5&&I.cintila) I.cintila(c,[160,820,700,250,880][i],[220,250,200,214,380][i],2+(a-.5)*12,'rgba(255,250,210,'+a.toFixed(2)+')'); }
  c.restore();
};
A.capaLivro.LIVRE_Y=LIVRE_Y;
})();
