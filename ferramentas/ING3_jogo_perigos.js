/* ============================================================
   ING3_jogo_perigos.js — os PERIGOS e o PODER GLOBAL do jogo de
   Inglês, portados do WiseBear (LP3_jornada_motor*.js) e estendidos
   (Game Design v2, etapa 2):
     · coisas que caem ao passar embaixo (v: telha, bolota, gota),
       com tremor de aviso de 0,45 s;
     · barris/troncos/bolas rolando (K, T) e canhão/máquina (C);
     · canos para o SUBMUNDO (1–4, ▼ em cima do cano);
     · inimigo ESPINHENTO (e): pisar machuca; só a estrela o desfaz;
     · inimigo VOADOR em onda (g);
     · paredes que só o poder quebra (%);
     · ESTRELA (saco Y = 3; botão ACTION / X / ENTER): voa reto 6 tiles,
       a mancha atingida vira 3 borboletas (transforma, não mata);
     · CORAÇÕES: espelham o tamanho do herói (3 grande, 2 normal,
       1 pequeno) para a criança VER o dano.
   Chamado por ING3_jogo_motor.js (perigos) e motor2 (inimigos/canos).
   ============================================================ */
window.PERIGOS = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;

function solidosExtra(M,s){ (M.paredes||[]).forEach(function(p){ if(p.viva) s.push({x:p.x,y:p.y,w:p.w,h:p.h,parede:p}); }); }

/* ---------- atualiza tudo que se mexe sozinho ---------- */
function atualiza(dt){
  var u=J.urso, M=J.mundo, R=G.ursoRet(); if(!M) return;
  var vivo=u.invT<=0&&u.tontoT<=0&&J.estado==='nivel';
  /* coisas que caem */
  M.pingentes.forEach(function(p){
    if(p.estado==='preso'){ if(Math.abs(u.x-p.x)<70 && u.y>p.y){ p.estado='tremendo'; p.t=0; } }
    else if(p.estado==='tremendo'){ p.t+=dt; if(p.t>.45){ p.estado='caindo'; p.vy=0; } }
    else if(p.estado==='caindo'){ p.vy+=1500*dt; p.y+=p.vy*dt; if(vivo&&G.colideRet(R.x,R.y,R.w,R.h,p.x-10,p.y,20,40)){ G.machucado(); p.estado='sumiu'; p.t=0; } var ch=false; G.solidos(M).forEach(function(b){ if(p.y+40>=b.y && p.y+40<b.y+24 && p.x>b.x && p.x<b.x+b.w) ch=true; }); if(ch||p.y>M.h){ p.estado='sumiu'; p.t=0; SOM.fx('quebra'); G.emite(8,function(){ return {x:p.x,y:p.y+36,vx:(Math.random()-.5)*200,vy:-100-Math.random()*150,vida:.6,max:.6,tipo:'confete',cor:'#a16207',rot:Math.random()*6,g:1}; }); } }
    else if(p.estado==='sumiu'){ p.t+=dt; if(p.t>4){ p.estado='preso'; p.y=p.y0; } }
  });
  /* barris e bolas rolando */
  J.troncosVivos=J.troncosVivos||[];
  M.troncos.forEach(function(g){ g.prox-=dt; if(g.prox<=0 && Math.abs(g.x-u.x)<900 && Math.abs(g.y-u.y)<600){ g.prox=g.cada; J.troncosVivos.push({x:g.x,y:g.y-22,vx:-150,vy:0,r:22,rot:0,bola:!!g.bola,m:M}); } });
  for(var i=J.troncosVivos.length-1;i>=0;i--){ var b=J.troncosVivos[i]; if(b.m!==M){ J.troncosVivos.splice(i,1); continue; } b.vy+=900*dt; b.x+=b.vx*dt; b.y+=b.vy*dt; b.rot-=dt*7;
    G.solidos(M).forEach(function(s){ if(b.y+b.r>=s.y && b.y+b.r<s.y+30 && b.x>s.x && b.x<s.x+s.w){ b.y=s.y-b.r; b.vy=0; } });
    if(b.y>M.h+60||b.x<-100){ J.troncosVivos.splice(i,1); continue; }
    if(vivo&&G.colideRet(R.x+4,R.y,R.w-8,R.h,b.x-b.r,b.y-b.r,b.r*2,b.r*2)){ if(u.vy>50&&u.y<b.y){ u.vy=-420; u.noChao=false; SOM.fx('pisao'); } else { G.machucado(); } } }
  /* canhão / máquina de bolas */
  J.bolasCanhao=J.bolasCanhao||[];
  M.canhoes.forEach(function(g){ g.prox-=dt; if(g.prox<=0 && Math.abs(g.x-u.x)<800){ g.prox=g.cada; g.t=.3; J.bolasCanhao.push({x:g.x-30,y:g.y,vx:-170,vy:-40,r:13}); SOM.fx('clique'); } if(g.t>0) g.t-=dt; });
  for(var q=J.bolasCanhao.length-1;q>=0;q--){ var bc=J.bolasCanhao[q]; bc.vy+=260*dt; bc.x+=bc.vx*dt; bc.y+=bc.vy*dt; if(bc.x<-60||bc.y>M.h+40||Math.abs(bc.x-u.x)>1100){ J.bolasCanhao.splice(q,1); continue; }
    var bateu=false; G.solidos(M).forEach(function(s){ if(bc.x>s.x&&bc.x<s.x+s.w&&bc.y+bc.r>s.y&&bc.y-bc.r<s.y+s.h) bateu=true; });
    if(bateu){ J.bolasCanhao.splice(q,1); continue; }
    if(vivo&&G.colideRet(R.x+4,R.y,R.w-8,R.h,bc.x-bc.r,bc.y-bc.r,bc.r*2,bc.r*2)){ J.bolasCanhao.splice(q,1); G.machucado(); } }
  /* estrelas (projétil) */
  J.estrelas=J.estrelas||[];
  for(var k=J.estrelas.length-1;k>=0;k--){ var e=J.estrelas[k]; e.x+=e.vx*dt; e.dist+=Math.abs(e.vx*dt); e.rot+=dt*14;
    var fim=e.dist>270||e.x<0||e.x>M.w;
    G.solidos(M).forEach(function(s){ if(e.x>s.x&&e.x<s.x+s.w&&e.y>s.y&&e.y<s.y+s.h){ fim=true; if(s.parede){ s.parede.viva=false; SOM.fx('tijolo'); G.brilho(s.x+22,s.y+22,12,'#fde047'); } } });
    M.inimigos.forEach(function(en){ if(fim||en.morto||en.achatado) return; if(G.colideRet(e.x-12,e.y-12,24,24,en.x-20,en.y-40,40,40)){ fim=true; transforma(en); } });
    (M.chefinhos||[]).forEach(function(ch){ if(!fim&&!ch.vencido&&window.CHEFINHO&&G.colideRet(e.x-12,e.y-12,24,24,ch.x-40,ch.y-80,80,80)){ fim=true; CHEFINHO.acerta(ch); } });
    if(fim){ J.estrelas.splice(k,1); G.brilho(e.x,e.y,5,'#fde047'); } }
}
/* mancha/inimigo atingido pela estrela vira 3 borboletas (nada morre: transforma) */
function transforma(en){ en.achatado=true; en.tAch=.4; SOM.fx('moeda'); G.pontua(30,en.x,en.y-40);
  for(var i=0;i<3;i++) J.part.push({x:en.x,y:en.y-20,vx:(i-1)*60,vy:-120-Math.random()*60,vida:1.4,max:1.4,tipo:'borboleta',cor:['#f472b6','#60a5fa','#fbbf24'][i],r:8,rot:0}); }
function atira(){
  var u=J.urso; if(J.estado!=='nivel'||!u||(u.poderes.estrelas||0)<=0) return;
  u.poderes.estrelas--; J.estrelas=J.estrelas||[]; J.estrelas.push({x:u.x+u.dir*22,y:u.y-46*(G.TAM[u.tam]),vx:u.dir*560,dist:0,rot:0});
  SOM.fx('pulo'); if(window.UI) UI.acao(u.poderes.estrelas>0,u.poderes.estrelas);
}

/* ---------- canos: ▼ em cima do cano troca de mundo ---------- */
function canoSob(){ var u=J.urso, M=J.mundo, hw=G.URSO_W*G.TAM[u.tam]/2; for(var i=0;i<M.canos.length;i++){ var p=M.canos[i]; if(u.noChao && u.x+hw-6>p.x && u.x-hw+6<p.x+p.w && Math.abs(u.y-p.y)<3) return p; } return null; }
function entraCano(p){
  var L=J.nivel, outro=J.mundo===L?L.sub:L; if(!outro) return false; var par=null;
  outro.canos.forEach(function(q){ if(q.id===p.id) par=q; }); if(!par) return false;
  SOM.fx('cano'); var u=J.urso; J.estado='cano';
  G.iris(u.x-J.cam,u.y-40-J.camY,function(){ J.mundo=outro; u.x=par.x+par.w/2; u.y=par.y; u.vx=0; u.vy=0; J.cam=Math.max(0,Math.min(outro.w-W,u.x-W*.4)); J.camY=Math.max(0,Math.min(outro.h-H,u.y-H*.62)); J.troncosVivos=[]; J.bolasCanhao=[]; J.estrelas=[]; J.estado='nivel'; });
  return true;
}

/* ---------- desenho ---------- */
function desenha(c,t,vx0,vx1){
  var M=J.mundo;
  M.pingentes.forEach(function(p){ if(p.estado==='sumiu'||p.x<vx0||p.x>vx1) return; var tr=p.estado==='tremendo'?Math.sin(t*60)*2:0; desenhaQueda(c,p.x+tr,p.y,M.cena,t); });
  (J.troncosVivos||[]).forEach(function(b){ if(b.bola) A.bolaRolando(c,b,t,M.cena); else A.tronco(c,b,t); });
  M.canhoes.forEach(function(g){ if(g.x>vx0-60&&g.x<vx1+60) A.canhao(c,g,t); });
  (J.bolasCanhao||[]).forEach(function(b){ c.fillStyle='#f8fafc'; A.circ(c,b.x,b.y,b.r); c.fill(); c.strokeStyle='#111'; c.lineWidth=1.5; c.stroke(); });
  (M.paredes||[]).forEach(function(p){ if(!p.viva||p.x<vx0||p.x>vx1) return; desenhaParede(c,p,M.cena,t); });
  (J.estrelas||[]).forEach(function(e){ c.save(); c.globalAlpha=.35; A.estrela(c,e.x-Math.sign(e.vx)*14,e.y,9,'#fde68a',e.rot); c.restore(); A.estrela(c,e.x,e.y,13,'#fde047',e.rot); });
}
/* o que cai, conforme o reino: telha (vila), bolota (floresta), gota (cozinha/recife), pingente (outros) */
function desenhaQueda(c,x,y,cena,t){
  c.save(); c.translate(x,y);
  if(cena==='bosque'){ c.fillStyle='#92400e'; A.el(c,0,22,10,13); c.fill(); c.fillStyle='#78350f'; A.rr(c,-11,4,22,9,4); c.fill(); c.strokeStyle='#451a03'; c.lineWidth=2; c.beginPath(); c.moveTo(0,4); c.lineTo(2,-2); c.stroke(); }
  else if(cena==='biscoito'||cena==='recife'){ c.fillStyle='rgba(191,219,254,.95)'; c.beginPath(); c.moveTo(0,4); c.quadraticCurveTo(12,26,0,34); c.quadraticCurveTo(-12,26,0,4); c.fill(); c.fillStyle='rgba(255,255,255,.8)'; A.circ(c,-3,24,3); c.fill(); }
  else if(cena==='vila'){ c.fillStyle='#b45309'; c.beginPath(); c.moveTo(-14,6); c.lineTo(14,6); c.lineTo(10,30); c.lineTo(-10,30); c.closePath(); c.fill(); c.strokeStyle='#7c2d12'; c.lineWidth=2; c.stroke(); }
  else A.pingente(c,{x:0,y:0,estado:'preso'},t);
  c.restore();
}
function desenhaParede(c,p,cena,t){
  c.save(); c.translate(p.x,p.y);
  var cor=cena==='bosque'?['#365314','#14532d']:(cena==='biscoito'?['#d6a15a','#92400e']:['#7c3aed','#4c1d95']);
  c.fillStyle=A.lin(c,0,0,0,45,cor[0],cor[1]); A.rr(c,1,1,43,43,6); c.fill();
  c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=2;
  if(cena==='bosque'){ for(var i=0;i<4;i++){ c.beginPath(); c.moveTo(4+i*11,44); c.quadraticCurveTo(10+i*11,22,2+i*11,2); c.stroke(); c.fillStyle='#a3e635'; c.beginPath(); c.moveTo(8+i*11,20); c.lineTo(14+i*11,16); c.lineTo(9+i*11,25); c.fill(); } }
  else { for(var j=0;j<5;j++){ A.circ(c,8+(j*17)%34,8+j*8,4); c.stroke(); } }
  var g=.4+.3*Math.sin(t*4); c.strokeStyle='rgba(253,224,71,'+g+')'; c.lineWidth=2; A.rr(c,1,1,43,43,6); c.stroke();
  c.restore();
}
/* inimigos novos: espinhento e voador (skins por reino) */
function inimigo(c,e,t){
  if(e.tipo==='espinho'){ c.save(); c.translate(e.x,e.y); var es=e.achatado?.3:1; c.scale(1,es); c.fillStyle='#1e1b4b'; for(var i=0;i<9;i++){ var a=Math.PI+i*Math.PI/8; c.beginPath(); c.moveTo(Math.cos(a)*14,-16+Math.sin(a)*14); c.lineTo(Math.cos(a)*28,-16+Math.sin(a)*28); c.lineTo(Math.cos(a+.2)*14,-16+Math.sin(a+.2)*14); c.fill(); }
    var g=c.createRadialGradient(-4,-22,2,0,-16,18); g.addColorStop(0,'#818cf8'); g.addColorStop(1,'#312e81'); c.fillStyle=g; A.el(c,0,-14,18,15); c.fill();
    if(!e.achatado){ var d=e.dir||-1; c.fillStyle='#fff'; A.circ(c,-5+d*3,-17,4.5); c.fill(); A.circ(c,6+d*3,-17,4.5); c.fill(); c.fillStyle='#111'; A.circ(c,-5+d*4,-16,2.2); c.fill(); A.circ(c,6+d*4,-16,2.2); c.fill(); c.strokeStyle='#c7d2fe'; c.lineWidth=2; c.beginPath(); c.moveTo(-6,-7); c.lineTo(6,-8); c.stroke(); }
    c.restore(); return true; }
  if(e.tipo==='corvo'){ c.save(); c.translate(e.x,e.y-20); var bat=Math.sin(t*12)*12; c.scale(e.dir||-1,1);
    c.fillStyle='#312e81'; A.el(c,0,0,18,12); c.fill(); c.fillStyle='#4338ca'; c.beginPath(); c.moveTo(-4,-4); c.lineTo(-22,-14-bat); c.lineTo(-6,4); c.fill(); c.beginPath(); c.moveTo(4,-4); c.lineTo(18,-16-bat); c.lineTo(8,4); c.fill();
    c.fillStyle='#fbbf24'; c.beginPath(); c.moveTo(17,-2); c.lineTo(27,1); c.lineTo(17,4); c.fill(); c.fillStyle='#fff'; A.circ(c,10,-4,4); c.fill(); c.fillStyle='#111'; A.circ(c,11,-4,2); c.fill(); c.restore(); return true; }
  return false;
}
function particula(c,p){ if(p.tipo!=='borboleta') return false; var a=Math.max(0,Math.min(1,p.vida/p.max)); c.save(); c.globalAlpha=a; c.translate(p.x,p.y); var f=Math.abs(Math.sin(p.vida*14)); c.fillStyle=p.cor; A.el(c,-5,0,6*f+1,8); c.fill(); A.el(c,5,0,6*f+1,8); c.fill(); c.fillStyle='#1e1b3a'; A.rr(c,-1,-5,2,10,1); c.fill(); c.restore(); p.vx*=.98; return true; }

return {solidosExtra:solidosExtra, atualiza:atualiza, atira:atira, transforma:transforma, canoSob:canoSob, entraCano:entraCano, desenha:desenha, inimigo:inimigo, particula:particula};
})();
