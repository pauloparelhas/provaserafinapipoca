/* ============================================================
   ING3_jogo_cena.js — tudo que o canvas desenha, por estado:
   intro (biblioteca → livro), escolha do herói, mapa-livro, reino
   (parallax, tiles, manchas de tinta, moradores, Pip, herói, placas
   e balão do quiz), fim de reino; íris e flash por cima.
   Fork do LP3_jornada_cena.js.
   ============================================================ */
window.CENA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, F=window.FASES, W=G.W, H=G.H, TAM=G.TAM;
var HEROIS=['lia','theo','bia','leo'];

function desenha(){
  var c=G.ctx(), esc=G.escala(), dpr=G.dpr(); if(!c) return;
  c.setTransform(esc*dpr,0,0,esc*dpr,0,0); c.save();
  if(J.shake>0) c.translate((Math.random()-.5)*J.shake,(Math.random()-.5)*J.shake);
  switch(J.estado){
    case 'boot': c.fillStyle='#1c1917'; c.fillRect(0,0,W,H); break;
    case 'intro': desenhaIntro(c); break;
    case 'escolha': desenhaEscolha(c); break;
    case 'capa': desenhaCapa(c); break;
    case 'mapa': desenhaMapa(c); break;
    case 'corrida': if(window.CORRIDA) CORRIDA.desenha(c); break;
    case 'final': desenhaFinal(c); break;
    case 'estadio': if(window.ESTADIO) ESTADIO.desenha(c); break;
    case 'cano': default: desenhaNivel(c);
  }
  J.clima.forEach(function(p){ A.particula(c,p); });
  if(J.flash>0){ c.fillStyle='rgba(255,255,255,'+(J.flash*.5)+')'; c.fillRect(0,0,W,H); }
  if(J.trans) A.iris(c,J.trans.x,J.trans.y,G.raioIris());
  c.restore();
}

/* ---------- personagens (com reserva enquanto a arte não chega) ---------- */
function heroi(c,x,y,estado,t,dir,s,quem){
  if(A.heroi){ A.heroi(c,x,y,estado,t,dir,s,quem||J.prog.heroi||'lia',J.prog.cor?{cor:J.prog.cor}:null); return; }
  c.save(); c.translate(x,y); c.scale(s*dir,s); c.fillStyle={lia:'#94a3b8',theo:'#2563eb',bia:'#db2777'}[quem||'lia']; A.rr(c,-16,-60,32,46,12); c.fill(); c.fillStyle='#f2c9a0'; A.circ(c,0,-72,20); c.fill(); c.fillStyle='#111'; A.circ(c,6,-74,3); c.fill(); c.fillStyle='#334155'; A.rr(c,-14,-16,12,16,5); c.fill(); A.rr(c,2,-16,12,16,5); c.fill(); c.restore();
}
function pip(c,x,y,estado,t,dir,s){
  if(A.pip){ A.pip(c,x,y,estado,t,dir,s); return; }
  c.save(); c.translate(x,y); c.scale(s*dir,s); if(estado==='egg'){ c.fillStyle='#ecfccb'; A.el(c,0,-26,20,26); c.fill(); c.fillStyle='#22c55e'; A.circ(c,-6,-30,5); c.fill(); A.circ(c,8,-16,4); c.fill(); } else { c.fillStyle='#22c55e'; A.el(c,0,-22,28,20); c.fill(); A.circ(c,22,-40,14); c.fill(); c.fillStyle='#111'; A.circ(c,26,-43,3); c.fill(); } c.restore();
}
/* entrada do ambiente de questões: PORTA (vila, floresta, ginásio, castelo) ou BAÚ (recife, céu, cozinha).
   Fechada e brilhando = desafio novo; prateada = já feita (pode jogar de novo). */
function morador(c,m,t){
  var cena=J.mundo&&J.mundo.cena, bau=cena==='recife'||cena==='nuvens'||cena==='biscoito', feita=m.feito;
  c.save(); c.translate(m.x,m.y);
  if(!feita){ var g=c.createRadialGradient(0,-50,6,0,-50,90); g.addColorStop(0,'rgba(253,224,71,'+(.35+.15*Math.sin(t*3))+')'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; A.circ(c,0,-50,90); c.fill(); }
  if(bau){
    c.fillStyle='rgba(0,0,0,.25)'; A.el(c,0,2,44,7); c.fill();
    c.fillStyle=feita?A.lin(c,0,-60,0,0,'#e2e8f0','#94a3b8'):A.lin(c,0,-60,0,0,'#b45309','#78350f'); A.rr(c,-40,-52,80,52,8); c.fill();
    c.fillStyle=feita?'#cbd5e1':A.lin(c,0,-80,0,-50,'#d97706','#92400e'); c.beginPath(); c.moveTo(-42,-50); c.quadraticCurveTo(0,-86,42,-50); c.closePath(); c.fill();
    c.fillStyle=feita?'#64748b':'#fbbf24'; c.fillRect(-42,-54,84,7); c.fillRect(-6,-70,12,70); A.rr(c,-10,-40,20,18,4); c.fill();
    c.fillStyle=feita?'#334155':'#78350f'; A.circ(c,0,-33,3); c.fill();
  } else {
    c.fillStyle=feita?'#94a3b8':'#57534e'; A.rr(c,-38,-118,76,118,8); c.fill();
    c.fillStyle=feita?A.lin(c,0,-110,0,0,'#e2e8f0','#94a3b8'):A.lin(c,0,-110,0,0,'#a16207','#713f12'); c.beginPath(); c.moveTo(-30,0); c.lineTo(-30,-80); c.quadraticCurveTo(-30,-110,0,-110); c.quadraticCurveTo(30,-110,30,-80); c.lineTo(30,0); c.closePath(); c.fill();
    c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=2; for(var k=-15;k<=15;k+=15){ c.beginPath(); c.moveTo(k,-104); c.lineTo(k,-4); c.stroke(); }
    c.fillStyle=feita?'#475569':'#fbbf24'; A.circ(c,18,-50,4.5); c.fill();
  }
  /* o "?" que pula: diz que ali há um desafio */
  var b=Math.sin(t*4)*5, yq=bau?-112:-150; c.translate(0,yq+b);
  c.fillStyle=feita?'#e2e8f0':'#fde047'; c.strokeStyle=feita?'#475569':'#78350f'; c.lineWidth=3; A.rr(c,-19,-19,38,38,10); c.fill(); c.stroke();
  c.fillStyle=feita?'#475569':'#78350f'; c.font='900 26px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(feita?'✓':'?',0,1);
  c.restore();
}
function manchaTinta(c,e,t){
  var esm=e.achatado?.35:1, ond=Math.sin(t*6+e.x*.05);
  c.save(); c.translate(e.x,e.y); c.scale(1,esm);
  c.fillStyle='rgba(0,0,0,.2)'; A.el(c,0,2,20,5); c.fill();
  var g=c.createRadialGradient(-6,-24,3,0,-16,26); g.addColorStop(0,'#6366f1'); g.addColorStop(.6,'#312e81'); g.addColorStop(1,'#1e1b4b'); c.fillStyle=g;
  c.beginPath(); c.moveTo(-20,0); c.quadraticCurveTo(-24,-20,-12,-30-ond*2); c.quadraticCurveTo(0,-38,12,-30+ond*2); c.quadraticCurveTo(24,-20,20,0); for(var i=0;i<4;i++){ c.quadraticCurveTo(15-i*10,6+((i+Math.floor(t*4))%2)*3,10-i*10,0); } c.closePath(); c.fill();
  c.fillStyle='rgba(255,255,255,.35)'; A.el(c,-8,-24,5,3); c.fill();
  if(!e.achatado){ var d=e.dir||-1; c.fillStyle='#fff'; A.el(c,-5+d*3,-18,5,6); c.fill(); A.el(c,7+d*3,-18,5,6); c.fill(); c.fillStyle='#111'; A.circ(c,-5+d*5,-17,2.4); c.fill(); A.circ(c,7+d*5,-17,2.4); c.fill(); c.strokeStyle='#c7d2fe'; c.lineWidth=2; c.beginPath(); c.arc(1+d*3,-9,4,.15*Math.PI,.85*Math.PI); c.stroke(); }
  c.restore();
}

/* ---------- reino ---------- */
function desenhaNivel(c){
  var M=J.mundo, u=J.urso, t=J.t; if(!M) return;
  var sub=/^sub_/.test(M.cena), cena=sub?'sub_caverna':(A.CENAS[M.cena]?M.cena:'floresta');
  if(sub&&A.fundoSub){ A.ceu(c,cena,t); A.fundoSub(c,cena,J.cam*.2,t); } else { A.ceu(c,cena,t); c.save(); A.longe(c,cena,J.cam*.15,t); A.perto(c,cena,J.cam*.45,t); c.restore(); }
  c.save(); c.translate(-Math.round(J.cam),-Math.round(J.camY));
  var vx0=J.cam-120, vx1=J.cam+W+120, vis=function(o){ return o.x+(o.w||60)>vx0 && o.x-(o.w?0:60)<vx1; };
  M.agua.forEach(function(a){ if(vis(a)) A.agua(c,a,t); });
  M.segs.forEach(function(s){ if(vis(s)) A.chao(c,s,cena); });
  M.canos.forEach(function(p){ if(vis(p)) A.cano(c,p,cena,t,false); });
  M.plats.forEach(function(p){ if(vis(p)&&!(window.APARELHOS&&APARELHOS.plataforma(c,p,cena,t))) A.plataforma(c,p,cena); });
  if(window.APARELHOS) APARELHOS.desenha(c,t);
  M.movers.forEach(function(p){ if(vis(p)) A.platMovel(c,p,cena,t); });
  M.caindo.forEach(function(p){ if(p.estado!=='sumiu'&&vis(p)) A.platCaindo(c,p,cena,t); });
  M.espinhos.forEach(function(s){ if(vis(s)) A.espinhos(c,s,cena); });
  M.molas.forEach(function(m){ if(vis(m)) A.mola(c,m,t); });
  M.checkpoints.forEach(function(cp){ if(vis(cp)) A.bandeira(c,cp.x,cp.y,cp.acesa,t); });
  if(M.mastro) desenhaMastro(c,M.mastro.x,M.mastro.y,t);
  M.tijolos.forEach(function(b){ if(vis(b)) A.tijolo(c,b,cena); });
  M.moedas.forEach(function(m){ if(m.x>vx0&&m.x<vx1) A.moeda(c,m,t); });
  M.itens.forEach(function(it){ if(!it.pego&&it.x>vx0&&it.x<vx1) item(c,it,t); });
  M.ovos.forEach(function(o){ if(!o.chocado&&o.x>vx0&&o.x<vx1){ var bal=Math.sin(t*5)*.12; c.save(); c.translate(o.x,o.y); c.rotate(bal); pip(c,0,0,'egg',t,1,1); c.restore(); } });
  M.moradores.forEach(function(m){ if(m.x>vx0-100&&m.x<vx1+100) morador(c,m,t); });
  if(window.PERIGOS) PERIGOS.desenha(c,t,vx0,vx1);
  if(window.CHEFINHO) CHEFINHO.desenha(c,t);
  if(window.MARCEU) MARCEU.desenha(c,t);
  M.inimigos.forEach(function(e){ if(!e.morto&&e.x>vx0&&e.x<vx1){ if(e.tipo==='tinta') manchaTinta(c,e,t); else if(!(window.PERIGOS&&PERIGOS.inimigo(c,e,t))&&!(window.APARELHOS&&APARELHOS.zagueiro(c,e,t))&&!(window.MARCEU&&MARCEU.inimigo(c,e,t))) A.inimigo(c,e,t); } });
  if(J.chefe&&window.CHEFAO&&!J.quiz) CHEFAO.desenha(c,t); /* no duelo, o Conde aparece uma vez só: no ambiente de questões */
  if(J.quiz&&window.QUIZ) QUIZ.desenhaMundo(c,t);
  if(J.pip){ var p=J.pip; pip(c,p.x,p.y,p.parado?'idle':'walk',t,p.vx>=0?1:-1,1); }
  /* o herói: tamanho + squash & stretch, pisca quando invencível */
  if(!(u.invT>0 && Math.floor(t*14)%2===0)){ var s=TAM[u.tam];
    if(u.montado){ var sela=(A.pip&&A.pip.SELA_Y)||40; pip(c,u.x,u.y,u.noChao?(Math.abs(u.vx)>5?'walk':'idle'):'fly',u.anim,u.dir,1); c.save(); c.translate(u.x,u.y-sela); c.scale(u.sx,u.sy); heroi(c,0,0,'ride',u.anim,u.dir,s,u.quem); c.restore(); }
    else { c.save(); c.translate(u.x,u.y); if(u.giro){ var hh2=G.URSO_H*s*.5; c.translate(0,-hh2); c.rotate(u.giro); c.translate(0,hh2); } c.scale(u.sx,u.sy); var est2=u.estado==='hang'||u.estado==='spin'?'cheer':null; heroi(c,0,0,est2||(u.abaixado?(Math.abs(u.vx)>8?'crawl':'crouch'):(u.estado==='glide'?'fly':u.estado)),u.anim,u.dir,s,u.quem); c.restore(); } }
  J.part.forEach(function(p){ if(!(window.PERIGOS&&PERIGOS.particula(c,p))) A.particula(c,p); });
  if(J.dica && J.estado==='nivel') desenhaDica(c,J.dica,t);
  c.restore();
  if(J.chefe&&window.CHEFAO) CHEFAO.desenhaTela(c,t);
  if(J.quiz&&window.QUIZ) QUIZ.desenhaTela(c,t);
  if(J.fimFase){ var k=Math.min(1,J.fimFase.t/.8); c.fillStyle='rgba(13,11,30,'+(k*.35)+')'; c.fillRect(0,0,W,H); if(J.fimFase.t>.3){ c.save(); c.translate(W/2,150); var sc=Math.min(1,(J.fimFase.t-.3)*2.5); c.scale(sc,sc); titulo(c,'Kingdom complete!',0,0,54); c.restore(); } }
}
function item(c,it,t){
  var b=Math.sin(t*3+it.x*.03)*4; c.save(); c.translate(it.x,it.y+b);
  var g=c.createRadialGradient(0,0,4,0,0,30); g.addColorStop(0,'rgba(255,255,255,.4)'); g.addColorStop(1,'rgba(255,255,255,0)'); c.fillStyle=g; A.circ(c,0,0,30); c.fill();
  if(it.tipo==='maca'){ c.fillStyle=A.lin(c,-14,-14,14,14,'#f87171','#b91c1c'); A.circ(c,-6,2,13); c.fill(); A.circ(c,6,2,13); c.fill(); c.fillStyle='rgba(255,255,255,.45)'; A.el(c,-8,-4,4,6); c.fill(); c.strokeStyle='#78350f'; c.lineWidth=3; c.beginPath(); c.moveTo(0,-8); c.lineTo(2,-18); c.stroke(); c.fillStyle='#22c55e'; A.el(c,8,-16,7,4); c.fill(); A.estrela(c,12,-6,5,'#fde047',t*2); }
  else if(it.tipo==='capa'){ c.fillStyle='#7c3aed'; c.beginPath(); c.moveTo(-14,-14); c.quadraticCurveTo(0,-20,14,-14); c.lineTo(18,14); c.quadraticCurveTo(0,8,-18,14); c.fill(); c.fillStyle='#fbbf24'; A.circ(c,0,-12,3.5); c.fill(); }
  else if(it.tipo==='historia'){ var n=it.ordem||0; c.fillStyle='rgba(255,255,255,.9)'; A.circ(c,0,0,20); c.fill(); c.strokeStyle='#d97706'; c.lineWidth=3; c.stroke();
    if(n===0||n===8){ if(A.biscoito) A.biscoito(c,0,0,13,0); } else if(n===1){ c.fillStyle='#e0f2fe'; A.rr(c,-8,-12,16,24,4); c.fill(); c.fillStyle='#fff'; A.rr(c,-6,-4,12,14,3); c.fill(); }
    else if(n===2){ c.strokeStyle='#ef4444'; c.lineWidth=4; c.beginPath(); c.moveTo(-6,12); c.lineTo(4,-8); c.lineTo(10,-12); c.stroke(); } else if(n===3){ c.fillStyle='#93c5fd'; c.fillRect(-10,-10,20,20); c.strokeStyle='#fff'; c.lineWidth=2; c.strokeRect(-6,-6,12,12); }
    else if(n===4){ c.fillStyle='#cbd5e1'; A.el(c,0,0,9,12); c.fill(); c.fillStyle='#e0f2fe'; A.el(c,-2,-2,5,8); c.fill(); } else if(n===5){ c.strokeStyle='#64748b'; c.lineWidth=3; c.beginPath(); c.moveTo(-10,-10); c.lineTo(8,8); c.moveTo(10,-10); c.lineTo(-8,8); c.stroke(); A.circ(c,-10,10,4); c.stroke(); A.circ(c,10,10,4); c.stroke(); }
    else if(n===6){ c.strokeStyle='#92400e'; c.lineWidth=3; c.beginPath(); c.moveTo(8,-12); c.lineTo(-4,6); c.stroke(); c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(-10,4); c.lineTo(2,8); c.lineTo(-6,14); c.closePath(); c.fill(); } else { c.fillStyle='#d6d3d1'; A.circ(c,0,0,10); c.fill(); c.fillStyle='#fff'; A.circ(c,0,0,4); c.fill(); } }
  else if(it.tipo==='bota'){ c.fillStyle='#b45309'; A.rr(c,-8,-16,14,24,4); c.fill(); A.rr(c,-10,2,26,10,4); c.fill(); c.fillStyle='#fde68a'; A.rr(c,-8,-16,14,5,2); c.fill(); }
  c.restore();
}
function desenhaMastro(c,x,y,t){ /* fim do reino: um grande livro aberto num pedestal */
  c.save(); c.translate(x,y);
  c.fillStyle='#78716c'; A.rr(c,-26,-60,52,60,6); c.fill(); c.fillStyle='#a8a29e'; A.rr(c,-34,-66,68,10,4); c.fill();
  var b=Math.sin(t*2)*4; c.translate(0,-96+b);
  var g=c.createRadialGradient(0,0,4,0,0,70); g.addColorStop(0,'rgba(253,230,138,.7)'); g.addColorStop(1,'rgba(253,230,138,0)'); c.fillStyle=g; A.circ(c,0,0,70); c.fill();
  c.fillStyle='#7c2d12'; A.rr(c,-46,-6,92,40,6); c.fill();
  c.fillStyle='#fffbeb'; c.beginPath(); c.moveTo(-42,0); c.quadraticCurveTo(-20,-12,0,-2); c.lineTo(0,30); c.quadraticCurveTo(-20,22,-42,30); c.closePath(); c.fill(); c.beginPath(); c.moveTo(42,0); c.quadraticCurveTo(20,-12,0,-2); c.lineTo(0,30); c.quadraticCurveTo(20,22,42,30); c.closePath(); c.fill();
  c.strokeStyle='rgba(120,53,15,.35)'; c.lineWidth=2; for(var i=0;i<3;i++){ c.beginPath(); c.moveTo(-34,8+i*7); c.lineTo(-8,10+i*7); c.moveTo(8,10+i*7); c.lineTo(34,8+i*7); c.stroke(); }
  for(var k=0;k<3;k++){ var a=t*1.5+k*2.1; A.estrela(c,Math.cos(a)*56,Math.sin(a)*22-10,5,'#fde047',a); }
  c.restore();
}
/* balão de dica (inglês; português embaixo com a bandeira) */
function desenhaDica(c,d,t){
  var pul=Math.sin(t*7)*4; c.save(); c.font='900 17px "Nunito","Segoe UI",Arial';
  var w=c.measureText(d.txt).width+28; c.font='700 13px "Nunito",Arial'; if(J.tr&&d.pt) w=Math.max(w,c.measureText(d.pt).width+28);
  var h=J.tr&&d.pt?52:34;
  var sx=Math.max(J.cam+w/2+8,Math.min(J.cam+W-w/2-8,d.x)), sy=Math.max(J.camY+h+70,d.y);
  c.translate(sx,sy+pul); c.globalAlpha=d.leve?.85:1;
  c.fillStyle='rgba(13,11,30,.86)'; c.beginPath(); c.moveTo(d.x-sx,0); c.lineTo(d.x-sx-10,-14); c.lineTo(d.x-sx+10,-14); c.fill();
  A.rr(c,-w/2,-14-h,w,h,12); c.fill(); c.strokeStyle='rgba(253,224,71,.6)'; c.lineWidth=2; A.rr(c,-w/2,-14-h,w,h,12); c.stroke();
  c.fillStyle='#fff'; c.textAlign='center'; c.textBaseline='middle'; c.font='900 17px "Nunito","Segoe UI",Arial'; c.fillText(d.txt,0,-14-h+17);
  if(J.tr&&d.pt){ c.fillStyle='#fde68a'; c.font='700 13px "Nunito",Arial'; c.fillText(d.pt,0,-14-h+37); }
  c.restore();
}
function titulo(c,txt,x,y,px){ c.save(); c.fillStyle='#fde68a'; c.font='900 '+px+'px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeStyle='#4c1d95'; c.lineWidth=8; c.lineJoin='round'; c.strokeText(txt,x,y); c.fillText(txt,x,y); c.restore(); }

/* ---------- intro ---------- */
function desenhaIntro(c){
  var t=J.t, it=J.intro||{i:0,t:0}, cena=A.CENAS.biblioteca?'biblioteca':'floresta';
  A.ceu(c,cena,t); A.longe(c,cena,0,t); A.perto(c,cena,0,t);
  var cx=W/2, cy=330;
  /* o livro sobre a mesa */
  c.save(); c.translate(cx,cy);
  var abre=it.i>=1?1:Math.min(1,it.t/2), brilho=.5+.5*Math.sin(t*3);
  var g=c.createRadialGradient(0,-20,10,0,-20,200); g.addColorStop(0,'rgba(253,230,138,'+(.35+.25*brilho)+')'); g.addColorStop(1,'rgba(253,230,138,0)'); c.fillStyle=g; A.circ(c,0,-20,200); c.fill();
  c.fillStyle='#7c2d12'; A.rr(c,-150,-20,300,26,8); c.fill();
  c.fillStyle='#fffbeb'; c.beginPath(); c.moveTo(-140,-16); c.quadraticCurveTo(-70,-40-abre*20,0,-14); c.lineTo(0,4); c.quadraticCurveTo(-70,-12,-140,4); c.closePath(); c.fill(); c.beginPath(); c.moveTo(140,-16); c.quadraticCurveTo(70,-40-abre*20,0,-14); c.lineTo(0,4); c.quadraticCurveTo(70,-12,140,4); c.closePath(); c.fill();
  if(it.i>=1){ c.fillStyle='rgba(30,27,75,.85)'; [[-80,-18,26],[-40,-10,16],[60,-16,30],[100,-8,14]].forEach(function(s){ A.el(c,s[0],s[1],s[2],s[2]*.45); c.fill(); }); }
  c.restore();
  if(it.i===1&&A.conde) A.conde(c,cx+250,450,it.t<2?'write':'laugh',t);
  if(it.i===2&&A.conde) A.conde(c,cx+300,450,'laugh',t);
  if(it.i>=3){ var k=Math.min(1,it.t/1.5); HEROIS.forEach(function(q,i){ heroi(c,cx-180+i*180,450-k*20*Math.abs(Math.sin(t*3+i)),'cheer',t,1,1.25,q); }); if(A.pip) A.pip(c,cx+260,450,'idle',t,-1,1); }
  titulo(c,'The Lost Endings',W/2,58,46);
}
/* ---------- final ---------- */
function desenhaFinal(c){
  var t=J.t, it=J.final||{i:3,t:0}, sc=JOGO.CENAS_FINAL[it.i]||JOGO.CENAS_FINAL[3], cena=A.CENAS[sc.cena]?sc.cena:'floresta';
  A.ceu(c,cena,t); A.longe(c,cena,0,t); A.perto(c,cena,0,t); if(cena!=='biblioteca') A.chao(c,{x:0,y:450,w:W,h:90},cena);
  if(it.i<=1){ if(A.conde) A.conde(c,620,450,it.i===0?'sad':'write',t); heroi(c,330,450,'idle',t,1,1.2); if(it.i===1){ for(var k=0;k<6;k++){ var a=t*1.2+k; if(A.paginaVoando) A.paginaVoando(c,480+Math.cos(a)*200,240+Math.sin(a*1.3)*60,a); } } }
  else if(it.i===2){ ['lia','theo','bia'].forEach(function(q,i){ heroi(c,320+i*160,450-Math.abs(Math.sin(t*3+i))*16,'cheer',t,1,1.2,q); }); if(A.pip) A.pip(c,800,450,'idle',t,-1,1.1); if(A.conde) A.conde(c,160,450,'laugh',t); }
  else { if(A.biscoito) A.biscoito(c,480,330,46,0); heroi(c,330,450,'cheer',t,1,1.2); }
  titulo(c,it.i===2?'Happily ever after':'The Lost Endings',W/2,58,40);
}
/* ---------- capa do livro ---------- */
function desenhaCapa(c){
  var t=J.t; if(A.capaLivro){ A.capaLivro(c,t); return; }
  c.fillStyle='#7c2d12'; c.fillRect(0,0,W,H); c.fillStyle='#9a3412'; A.rr(c,60,30,840,440,24); c.fill(); titulo(c,'The Lost Endings',W/2,140,64);
  HEROIS.forEach(function(q,i){ heroi(c,240+i*160,400,'idle',t+i,1,1.2,q); });
}
/* ---------- escolha do herói (os cartões ficam no DOM; aqui só o palco) ---------- */
function desenhaEscolha(c){
  var t=J.t, cena=A.CENAS.vila?'vila':'floresta'; A.ceu(c,cena,t); A.longe(c,cena,t*8,t); A.perto(c,cena,t*16,t); A.chao(c,{x:0,y:450,w:W,h:90},cena);
  c.fillStyle='rgba(13,11,30,.25)'; c.fillRect(0,0,W,H);
  var sel=(window.UI&&UI.heroiSel)?UI.heroiSel():(J.prog.heroi||'lia');
  HEROIS.forEach(function(q,i){ var x=150+i*220, on=q===sel; if(on){ c.fillStyle='rgba(253,224,71,.25)'; A.el(c,x,452,90,16); c.fill(); } heroi(c,x,450,on?(Math.floor(t)%4===0?'cheer':'idle'):'idle',t+i,1,on?1.9:1.5,q); });
  titulo(c,'Choose your hero',W/2,58,42);
}
/* ---------- mapa-livro ---------- */
function desenhaMapa(c){
  var t=J.t, L=F.LISTA;
  if(A.mapaLivro) A.mapaLivro(c,t); else { c.fillStyle='#fef3c7'; c.fillRect(0,0,W,H); }
  for(var i=0;i<L.length-1;i++){
    var pts=F.caminho(L[i],L[i+1]), feito=G.faseFeita(L[i].id), frac=1;
    if(J.mapaAnim && J.mapaAnim.de===i){ feito=true; frac=Math.min(1,J.mapaAnim.t/J.mapaAnim.dur); }
    pts.forEach(function(p,k){ if(k/pts.length>frac) return; c.fillStyle=feito?'#b45309':'rgba(120,53,15,.35)'; A.circ(c,p[0],p[1],feito?4:3); c.fill(); });
  }
  L.forEach(function(f,i){
    var pronto=!!F.PRONTOS[f.id], feita=G.faseFeita(f.id), sel=i===J.sel && !J.mapaAnim;
    c.save(); c.translate(f.mx,f.my);
    if(sel){ c.fillStyle='rgba(253,224,71,'+(.3+Math.sin(t*5)*.15)+')'; A.circ(c,0,0,40); c.fill(); }
    var g=c.createRadialGradient(-6,-6,4,0,0,26); if(f.chefao){ g.addColorStop(0,'#c4b5fd'); g.addColorStop(1,'#4c1d95'); } else if(feita){ g.addColorStop(0,'#fef3c7'); g.addColorStop(1,'#d97706'); } else if(pronto){ g.addColorStop(0,'#dcfce7'); g.addColorStop(1,'#15803d'); } else { g.addColorStop(0,'#e7e5e4'); g.addColorStop(1,'#78716c'); }
    c.fillStyle=g; A.circ(c,0,0,24); c.fill(); c.strokeStyle='#fff'; c.lineWidth=3; c.stroke();
    c.fillStyle='#fff'; c.font='900 19px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(f.id),0,1);
    if(feita){ var pg=G.paginas(f.id); for(var s=0;s<3;s++) A.estrela(c,-16+s*16,32,6.5,s<(J.prog.fases[f.id].estrelas||0)?'#fde047':'rgba(120,53,15,.3)',0); }
    if(!pronto){ c.fillStyle='rgba(68,64,60,.85)'; c.font='900 10px "Nunito",Arial'; var tw=c.measureText('SOON').width+10; A.rr(c,-tw/2,-38,tw,15,6); c.fill(); c.fillStyle='#fff'; c.fillText('SOON',0,-30); }
    c.restore();
  });
  /* o herói no mapa */
  if(J.mapaAnim){ var m=J.mapaAnim, pts2=F.caminho(L[m.de],L[m.para]), k=Math.min(1,m.t/m.dur)*(pts2.length-1), i0=Math.floor(k), p0=pts2[i0], p1=pts2[Math.min(pts2.length-1,i0+1)], fr=k-i0; heroi(c,p0[0]+(p1[0]-p0[0])*fr,p0[1]+(p1[1]-p0[1])*fr-20,'walk',t,p1[0]>=p0[0]?1:-1,.55); }
  else if(J.sel>=0&&L[J.sel]){ var f2=L[J.sel]; heroi(c,f2.mx,f2.my-26+Math.sin(t*3)*3,'idle',t,1,.55); }
}

return {desenha:desenha, titulo:titulo, heroi:heroi};
})();
