/* ============================================================
   ING3_jogo_corrida.js — Real or Make-believe RALLY (reino 3).
   Corrida simples para criança: o carrinho anda sozinho; a criança só
   troca de FAIXA (↑ ↓, W S, os botões ▲ ▼, ou tocando na faixa).
   O locutor fala a pergunta; os PORTAIS de resposta vêm pela pista,
   um em cada faixa. Passar pelo portal certo = turbo e estrelas;
   pelo errado = o carro roda e o locutor explica (curto). Entre uma
   pergunta e outra, moedas e poças de tinta para desviar.
   9 perguntas = 3 páginas (uma a cada 3). Itens: tema 'realmb'.
   ============================================================ */
window.CORRIDA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var FAIXAS=[322,412,502], CARRO_X=210, VEL=300, N=9;
var R=null;

function inicia(f){
  var itens=QUIZ.escolhe({tema:'realmb'},N,[]);
  R={f:f, itens:itens, i:-1, fase:'largada', t:0, faixa:1, yCarro:FAIXAS[1], dist:0, giro:0, turbo:0, portais:[], coisas:[], acertos:0, paginas:0, fala:null, prox:2.2, quer:0};
  J.estado='corrida'; J.stats={perguntas:0,acertos:0}; J.pontos=0; J.corrida=R;
  SOM.musica('pista'); G.hud(); if(window.UI){ UI.modoNivel(true); UI.modoMapa(false); UI.modoCorrida(true); }
  falaLocutor('Ready… set… GO!','Preparar… apontar… JÁ!');
}
function falaLocutor(en,pt,cor){ R.fala={en:en,pt:pt,cor:cor||'#fff',t:0}; try{ say(en); }catch(e){} }
function novaPergunta(){
  R.i++; if(R.i>=R.itens.length){ R.fase='chegada'; R.t=0; return; }
  var it=R.itens[R.i], ordem=it.o.map(function(_,k){ return k; }); if(ordem.length>2) ordem=QUIZ.embaralha?QUIZ.embaralha(ordem):ordem;
  var faixas= ordem.length===2?[0,2]:[0,1,2];
  R.q={it:it, ordem:ordem, faixas:faixas, certaFaixa:faixas[ordem.indexOf(it.c)]};
  R.fase='pergunta'; R.t=0;
  falaLocutor(it.p,it.p_pt);
  /* os portais nascem longe: dá ~4 s para ler e escolher a faixa */
  R.portais=ordem.map(function(oi,k){ return {x:W+80+VEL*2.6, faixa:faixas[k], txt:it.o[oi], pt:(it.o_pt||[])[oi]||'', certa:oi===it.c, estado:'normal'}; });
}
function passaPortal(){
  var q=R.q, ok=R.faixa===q.certaFaixa; R.fase='resposta'; R.t=0; J.stats.perguntas++;
  R.portais.forEach(function(p){ p.estado= p.certa?'certa':(p.faixa===R.faixa?'errada':'apagada'); });
  if(ok){ R.acertos++; J.stats.acertos++; R.turbo=1.2; G.pontua(100); SOM.fx('acerto'); G.brilho(CARRO_X+J.cam,R.yCarro-40,14,'#fde047'); }
  else { R.giro=1; SOM.fx('erro'); J.shake=5; }
  falaLocutor((ok?'Yes! ':'Not quite! ')+(q.it.ex||''),(ok?'Isso! ':'Quase! ')+(q.it.ex_pt||''),ok?'#dcfce7':'#fee2e2');
  try{ QUIZ.marca&&QUIZ.marca(q.it.id); }catch(e){}
  if(R.i%3===2){ R.paginas++; setTimeout(function(){ if(R) G.toast('You found a lost page! ('+R.paginas+' of 3)',2400,'Você achou uma página perdida! ('+R.paginas+' de 3)'); },900); }
}
function mudaFaixa(d){ if(!R||R.giro>0) return; var n=Math.max(0,Math.min(2,R.faixa+d)); if(n!==R.faixa){ R.faixa=n; SOM.fx('clique'); } }

function atualiza(dt){
  if(!R) return; R.t+=dt; if(R.fala) R.fala.t+=dt;
  /* entrada: ↑/↓ (o pulo sobe de faixa, o ▼ desce) — só na borda do toque */
  if(J.in.jump&&J.jumpSolto){ mudaFaixa(-1); J.jumpSolto=false; } if(!J.in.jump) J.jumpSolto=true;
  if(J.in.down&&J.downSolto){ mudaFaixa(1); J.downSolto=false; } if(!J.in.down) J.downSolto=true;
  R.yCarro+=(FAIXAS[R.faixa]-R.yCarro)*Math.min(1,dt*10);
  if(R.giro>0) R.giro=Math.max(0,R.giro-dt*1.1); if(R.turbo>0) R.turbo=Math.max(0,R.turbo-dt);
  var v=VEL*(R.giro>0?.45:1)*(R.turbo>0?1.5:1); R.dist+=v*dt; J.cam=R.dist;
  R.portais.forEach(function(p){ p.x-=v*dt; });
  R.coisas.forEach(function(o){ o.x-=v*dt; });
  /* coisas entre perguntas: moedas e poças */
  if(R.fase!=='pergunta'&&R.fase!=='chegada'){ R.quer-=dt; if(R.quer<=0){ R.quer=.7+Math.random()*.6; var fx=Math.floor(Math.random()*3); R.coisas.push({x:W+60,faixa:fx,tipo:Math.random()<.7?'moeda':'poca',pega:false}); } }
  R.coisas.forEach(function(o){ if(!o.pega&&Math.abs(o.x-CARRO_X)<34&&o.faixa===R.faixa){ o.pega=true; if(o.tipo==='moeda'){ J.moedas++; G.pontua(10); SOM.fx('moeda'); } else if(R.giro<=0&&R.turbo<=0){ R.giro=.6; SOM.fx('tonto'); } } });
  R.coisas=R.coisas.filter(function(o){ return o.x>-80; });
  if(R.fase==='largada'&&R.t>2.2) novaPergunta();
  else if(R.fase==='pergunta'){ var p0=R.portais[0]; if(p0&&p0.x<=CARRO_X) passaPortal(); }
  else if(R.fase==='resposta'){ if(R.t>3.4){ R.portais=[]; novaPergunta(); } }
  else if(R.fase==='chegada'){ if(R.t>1.2&&!R.fim){ R.fim=true; termina(); } }
}
function termina(){
  var f=R.f; if(window.UI) UI.modoCorrida(false);
  /* o fim de reino comum (estrelas e páginas) com um "nível" mínimo para o placar */
  J.nivel={moradores:[1,2,3].map(function(k){ return {feito:R.paginas>=k}; })}; J.mundo=null; J.faseAtual=f;
  J.urso={estado:'cheer',anim:0}; G.fimDeFase(); R=null; J.corrida=null;
}
function toque(lx,ly){ if(!R) return false; var best=0,d=1e9; FAIXAS.forEach(function(y,k){ var dd=Math.abs(ly-y+20); if(dd<d){ d=dd; best=k; } }); if(d<70){ R.faixa=best; SOM.fx('clique'); return true; } return false; }
function tecla(k){ if(!R) return false; if(k==='ArrowUp'||k==='w'||k==='W'){ mudaFaixa(-1); return true; } if(k==='ArrowDown'||k==='s'||k==='S'){ mudaFaixa(1); return true; } var n=parseInt(k,10); if(n>=1&&n<=3&&R.fase==='pergunta'&&R.q){ var fx=R.q.faixas[n-1]; if(fx!==undefined){ R.faixa=fx; return true; } } return false; }

/* ---------- desenho ---------- */
function quebra(c,txt,larg){ var pal=String(txt).split(' '), linhas=[], cur=''; pal.forEach(function(w){ var t=cur?cur+' '+w:w; if(c.measureText(t).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=t; }); if(cur) linhas.push(cur); return linhas; }
function desenha(c){
  if(!R) return; var t=J.t, off=R.dist;
  /* céu e arquibancada */
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#38bdf8'); g.addColorStop(.45,'#bae6fd'); g.addColorStop(1,'#bbf7d0'); c.fillStyle=g; c.fillRect(0,0,W,H);
  for(var i=0;i<6;i++){ var nx=((i*220-off*.08)%(W+240)+W+240)%(W+240)-120; A.nuvem(c,nx,60+(i%3)*24,1.1,.9); }
  c.fillStyle='#64748b'; c.fillRect(0,170,W,70); c.fillStyle='#475569'; c.fillRect(0,232,W,10);
  for(var k=0;k<70;k++){ var px=((k*17-off*.3)%(W+40)+W+40)%(W+40)-20, py=184+(k%4)*12; c.fillStyle=['#f87171','#fbbf24','#60a5fa','#4ade80','#f472b6','#fde68a'][k%6]; A.circ(c,px,py+Math.sin(t*8+k)*2,5); c.fill(); }
  for(var b=0;b<10;b++){ var bx=((b*110-off*.3)%(W+110)+W+110)%(W+110)-55; c.fillStyle=b%2?'#ef4444':'#fff'; c.beginPath(); c.moveTo(bx,170); c.lineTo(bx+40,170); c.lineTo(bx+20,158); c.fill(); }
  /* pista */
  c.fillStyle='#16a34a'; c.fillRect(0,242,W,H-242);
  c.fillStyle='#3f3f46'; c.fillRect(0,252,W,270);
  c.fillStyle='#fafafa'; for(var x=0;x<W+60;x+=60){ var xx=x-(off%60); c.fillRect(xx,252,30,6); c.fillRect(xx+30,516,30,6); }
  c.fillStyle='#ef4444'; for(x=0;x<W+60;x+=60){ xx=x-(off%60)+30; c.fillRect(xx,252,30,6); c.fillRect(xx-30,516,30,6); }
  c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=4; c.setLineDash([34,26]); c.lineDashOffset=off%60; [342,432].forEach(function(y){ c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); }); c.setLineDash([]);
  /* moedas e poças */
  R.coisas.forEach(function(o){ if(o.pega) return; var y=FAIXAS[o.faixa]-10; if(o.tipo==='moeda') A.moeda(c,{x:o.x,y:y-14,r:11},t); else { c.fillStyle='#312e81'; A.el(c,o.x,y+8,30,10); c.fill(); c.fillStyle='rgba(165,180,252,.6)'; A.el(c,o.x-8,y+5,8,3); c.fill(); } });
  /* portais */
  R.portais.forEach(function(p){ portal(c,p,t); });
  /* carro com o herói */
  carro(c,CARRO_X,R.yCarro,t);
  /* linha de chegada */
  if(R.fase==='chegada'){ var fx=W-R.t*300; for(var q=0;q<9;q++){ c.fillStyle=q%2?'#111':'#fff'; c.fillRect(fx,252+q*30,20,30); c.fillStyle=q%2?'#fff':'#111'; c.fillRect(fx+20,252+q*30,20,30); } }
  /* o locutor e o balão */
  locutor(c,t);
}
function portal(c,p,t){
  /* portal = arco sobre a faixa inteira + o "tapete" colorido da faixa, para não haver dúvida de qual faixa ele é */
  var base=FAIXAS[p.faixa], topo=base-86, cor= p.estado==='certa'?['#22c55e','#dcfce7']:(p.estado==='errada'?['#ef4444','#fee2e2']:(p.estado==='apagada'?['#a8a29e','#f5f5f4']:['#7c3aed','#ffffff']));
  c.save(); c.globalAlpha=p.estado==='apagada'?.5:1;
  c.fillStyle=cor[0]; c.globalAlpha*=.22; c.fillRect(p.x-6,topo+6,170,84); c.globalAlpha=p.estado==='apagada'?.5:1;
  c.fillStyle=cor[0]; A.rr(c,p.x-8,topo-30,12,120,5); c.fill(); A.rr(c,p.x+152,topo-30,12,120,5); c.fill();
  c.fillStyle=cor[1]; A.rr(c,p.x-16,topo-58,196,52,14); c.fill(); c.strokeStyle=cor[0]; c.lineWidth=5; A.rr(c,p.x-16,topo-58,196,52,14); c.stroke();
  c.fillStyle='#1e1b3a'; c.textAlign='center'; c.textBaseline='middle'; c.font='900 20px "Nunito",Arial';
  var linhas=quebra(c,p.txt,176); if(linhas.length>1){ c.font='900 15px "Nunito",Arial'; linhas=quebra(c,p.txt,180); }
  var lh=linhas.length>1?16:20, y0=topo-32-(Math.min(2,linhas.length)-1)*lh/2-(J.tr&&p.pt?7:0);
  linhas.slice(0,2).forEach(function(l,k){ c.fillText(l,p.x+82,y0+k*lh); });
  if(J.tr&&p.pt){ c.font='700 12px "Nunito",Arial'; c.fillStyle='#6b5d4f'; c.fillText(p.pt,p.x+82,y0+Math.min(2,linhas.length)*lh-2); }
  c.restore();
}
function carro(c,x,y,t){
  /* kart: o herói vai SENTADO DENTRO (desenha o herói e depois a carroceria por cima) */
  var gir=R.giro>0?Math.sin(R.giro*20)*.5:0, cor=J.prog.cor||'#dc2626';
  c.save(); c.translate(x,y); c.rotate(gir);
  if(R.turbo>0){ for(var k=0;k<5;k++){ c.fillStyle='rgba(251,191,36,'+(.6-k*.1)+')'; A.circ(c,-66-k*14-Math.random()*6,-22+Math.random()*8,8-k); c.fill(); } }
  c.fillStyle='rgba(0,0,0,.25)'; A.el(c,0,4,66,9); c.fill();
  if(window.CENA) CENA.heroi(c,-4,-26,'ride',J.t,1,.78,J.prog.heroi);
  c.fillStyle=A.lin(c,0,-44,0,-6,'#ffffff',cor); c.beginPath(); c.moveTo(-58,-10); c.quadraticCurveTo(-60,-40,-34,-40); c.lineTo(-26,-40); c.quadraticCurveTo(-22,-24,6,-24); c.lineTo(30,-24); c.quadraticCurveTo(56,-26,62,-12); c.lineTo(62,-6); c.lineTo(-58,-6); c.closePath(); c.fill();
  c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=2; c.stroke();
  c.fillStyle='#fde047'; A.circ(c,56,-15,4); c.fill(); c.fillStyle='rgba(255,255,255,.75)'; A.rr(c,-44,-34,16,5,2); c.fill();
  c.fillStyle='#111'; A.circ(c,-36,-4,14); c.fill(); A.circ(c,38,-4,14); c.fill(); c.fillStyle='#9ca3af'; A.circ(c,-36,-4,5); c.fill(); A.circ(c,38,-4,5); c.fill();
  c.restore();
}
function locutor(c,t){
  var f=R.fala; if(!f) return;
  if(A.morador) A.morador(c,'announcer',70,160,t,1,f.t<2);
  c.font='900 21px "Nunito",Arial'; var linhas=quebra(c,f.en,700); c.font='700 14px "Nunito",Arial'; var lpt=J.tr&&f.pt?quebra(c,f.pt,700):[];
  var h=20+linhas.length*26+(lpt.length?4+lpt.length*18:0), bx=140, by=62, bw=720;
  c.save(); c.shadowColor='rgba(0,0,0,.3)'; c.shadowBlur=10; c.fillStyle=f.cor; A.rr(c,bx,by,bw,h,18); c.fill(); c.restore();
  c.fillStyle=f.cor; c.beginPath(); c.moveTo(bx+4,by+24); c.lineTo(bx-14,by+36); c.lineTo(bx+4,by+40); c.fill();
  c.fillStyle='#1e1b3a'; c.textAlign='left'; c.textBaseline='top'; c.font='900 21px "Nunito",Arial'; linhas.forEach(function(l,k){ c.fillText(l,bx+16,by+12+k*26); });
  if(lpt.length){ c.fillStyle='#6b5d4f'; c.font='700 14px "Nunito",Arial'; lpt.forEach(function(l,k){ c.fillText(l,bx+16,by+14+linhas.length*26+k*18); }); }
  if(R.fase==='pergunta'&&!J.prog.corridaVista){ c.save(); c.globalAlpha=.75+.25*Math.sin(t*4); c.fillStyle='rgba(13,11,30,.75)'; A.rr(c,W/2-190,by+h+10,380,34,16); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='middle'; c.font='900 17px "Nunito",Arial'; c.fillText('Drive into the right gate!  ↑ ↓',W/2,by+h+27); c.restore(); }
  if(R.fase==='resposta') J.prog.corridaVista=true;
}

return {inicia:inicia, atualiza:atualiza, desenha:desenha, toque:toque, tecla:tecla, ativa:function(){ return !!R; }};
})();
