/* ============================================================
   ING3_jogo_quiz.js — o AMBIENTE DE QUESTÕES (v2, 15/10, Paulo).
   A criança ENTRA num elemento da fase (porta, baú…; ▼ ou toque nele)
   e o jogo muda de clima: a fase fica esmaecida atrás de uma moldura
   escura, toca a música de suspense, um relógio de 30 s corre, o
   personagem que pergunta aparece grande e a criança TOCA no cartão
   numerado da resposta (ou aperta 1/2/3). Errou ou o tempo acabou: o
   cartão certo acende e o personagem explica (curto). ▶ segue.
   3 perguntas por entrada = 1 página do livro; depois volta à fase.
   "✕ Leave" sai a qualquer hora. Perguntas: ING3_banco.js filtradas
   pelo tema/átomos do reino, sem repetir (localStorage).
   ============================================================ */
window.QUIZ = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var N_POR_MORADOR=3, TEMPO=30, /* regra do Paulo (16/10): 30 s por pergunta */ USADAS='ing3_jogo_usadas';

/* ---------- escolha das perguntas ---------- */
function usadas(){ try{ return JSON.parse(localStorage.getItem(USADAS)||'[]'); }catch(e){ return []; } }
function marca(id){ var u=usadas(); if(u.indexOf(id)<0){ u.push(id); try{ localStorage.setItem(USADAS,JSON.stringify(u)); }catch(e){} } }
function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function escolhe(f,n,jaNaFase){
  var pool=ING3.ITENS.filter(function(it){ if(f.tema!=='todos'&&it.tema!==f.tema) return false; if(f.at&&it.at&&!it.at.some(function(a){ return f.at.indexOf(a)>=0; })) return false; if(it.texto) return false; /* 15/10 (Paulo): no jogo a pergunta tem 1-2 linhas; textos de leitura ficam no simulado e no estudo */ return jaNaFase.indexOf(it.id)<0; });
  var u=usadas(), novas=pool.filter(function(it){ return u.indexOf(it.id)<0; });
  if(novas.length<n){ var ids=pool.map(function(it){ return it.id; }); try{ localStorage.setItem(USADAS,JSON.stringify(u.filter(function(id){ return ids.indexOf(id)<0; }))); }catch(e){} novas=pool; }
  var sel=[], leit=0;
  if(f.mix){ f.mix.forEach(function(tp){ var c=embaralha(novas.filter(function(it){ return it.tipo===tp&&sel.indexOf(it)<0; }))[0]||embaralha(pool.filter(function(it){ return it.tipo===tp&&sel.indexOf(it)<0; }))[0]; if(c) sel.push(c); }); if(sel.length>=n) return sel.slice(0,n); }
  embaralha(novas).forEach(function(it){ if(sel.length>=n) return; if(it.tipo==='leitura'){ if(leit>=1) return; leit++; } sel.push(it); });
  if(sel.length<n) embaralha(pool).forEach(function(it){ if(sel.length<n&&sel.indexOf(it)<0) sel.push(it); }); /* nunca porta com 1 pergunta só */
  return sel;
}

/* ---------- ciclo ---------- */
function inicia(m,op){
  if(J.quiz) return;
  var f=J.faseAtual, L=J.nivel, ja=L.quizIds||(L.quizIds=[]);
  var itens=(op&&op.itens)||escolhe(f,N_POR_MORADOR,ja); if(!itens.length) return;
  itens.forEach(function(it){ ja.push(it.id); });
  var u=J.urso; u.vx=0; J.in.left=J.in.right=J.in.jump=J.in.down=false;
  J.quiz={m:m, op:op||null, itens:itens, i:0, fase:'entra', t:0, acertos:0, cartoes:[], dica:false};
  try{ var tt=document.getElementById('toast'); if(tt) tt.classList.remove('show'); }catch(e){} /* nada cobre a pergunta */
  J.estado='quiz'; m.visto=true; SOM.fx('iris'); SOM.musica('arena');
  montaPergunta();
  if(window.UI) UI.quizBotoes(true);
}
function montaPergunta(){
  var q=J.quiz, it=q.itens[q.i], ordem=embaralha(it.o.map(function(_,i){ return i; }));
  q.item=it; q.ordem=ordem; q.certa=ordem.indexOf(it.c); q.escolha=-1; q.minT=0; q.fase=q.i?'pergunta':'entra'; q.t=0; q.tempo=TEMPO; q.dica=false; q.lay=null; q.next=null;
  q.cartoes=ordem.map(function(oi,k){ return {k:k, txt:it.o[oi], pt:(it.o_pt||[])[oi]||'', estado:'normal', bump:0}; });
  try{ say(it.p); }catch(e){}
}
function responde(k){
  var q=J.quiz; if(!q||q.fase!=='pergunta') return;
  var ok=k===q.certa; q.escolha=k; q.fase='resposta'; q.t=0; q.auto=0; /* 15/10 (Paulo): não avança sozinho — a criança lê o comentário e toca no Next, que respira suave para chamar */
  J.stats.perguntas++; marca(q.item.id);
  q.cartoes.forEach(function(c){ c.estado= c.k===q.certa?'certa':(c.k===k?'errada':'apagada'); });
  if(k>=0) q.cartoes[k].bump=10;
  if(penalti()) PENALTI.chute(q,k,ok,J.t); /* reino 7: a resposta vira um pênalti (só a animação) */
  if(ok){ q.acertos++; J.stats.acertos++; G.pontua(100); SOM.fx('acerto'); }
  else { SOM.fx('erro'); J.shake=4; }
  try{ say((ok?'Yes! ':'Not quite. ')+(q.item.ex||'')); }catch(e){}
  if(q.op&&q.op.aoResponder) q.op.aoResponder(ok);
}
function segue(){
  var q=J.quiz; if(!q||q.fase!=='resposta'||q.t<(q.minT||.5)) return;
  q.i++;
  if(q.i<q.itens.length){ montaPergunta(); return; }
  q.fase='pagina'; q.t=0;
  if(!q.op){ q.m.feito=true; var E=J.nivel.todasEntradas||J.nivel.moradores, n=E.filter(function(mm){ return mm.feito; }).length;
    G.toast('You found a lost page! ('+n+' of '+E.length+')',2600,'Você achou uma página perdida! ('+n+' de '+E.length+')'); G.pontua(150); SOM.fx('vitoria'); }
}
function sai(){ var q=J.quiz; if(!q) return; if(q.op) q.op.aoTerminar=null; termina(); if(q.op&&q.op.aoSair) q.op.aoSair(); }
function termina(){
  var q=J.quiz; J.quiz=null; J.estado='nivel'; if(window.UI) UI.quizBotoes(false); G.hud(); try{ speechSynthesis.cancel(); }catch(e){}
  if(q){ q.m.esperaT=1.2; if(!q.op){ var cn=J.nivel.cena; SOM.musica(window.PARTITURAS&&PARTITURAS.CENAS[cn]?cn:'floresta'); } }
  if(J.urso) J.urso.invT=Math.max(J.urso.invT||0,1);
  if(q&&q.op&&q.op.aoTerminar) setTimeout(q.op.aoTerminar,0);
}
function atualiza(dt){
  var q=J.quiz; if(!q) return; q.t+=dt;
  q.cartoes.forEach(function(c){ if(c.bump>0) c.bump=Math.max(0,c.bump-dt*50); });
  if(q.fase==='entra'&&q.t>.7){ q.fase='pergunta'; q.t=0; }
  else if(q.fase==='pergunta'){ var antes=Math.ceil(q.tempo); var lendo=false; try{ lendo=speechSynthesis.speaking; }catch(e){} if(!lendo&&q.item.tipo!=='leitura') q.tempo=Math.max(0,q.tempo-dt); /* guardiao: sem pressa para ler */ var agora=Math.ceil(q.tempo); if(agora!==antes&&agora<=5&&agora>0) SOM.fx('clique'); if(q.tempo<=0) responde(-1); }
  
  else if(q.fase==='pagina'&&q.t>1.6) termina();
}

/* ---------- texto ---------- */
function quebra(c,txt,larg){ var pal=String(txt).split(' '), linhas=[], cur=''; pal.forEach(function(w){ var t=cur?cur+' '+w:w; if(c.measureText(t).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=t; }); if(cur) linhas.push(cur); return linhas; }
function F(peso,px){ return peso+' '+px+'px "Nunito","Segoe UI",Arial'; }

/* layout: quem pergunta à esquerda; balão no alto; texto de leitura (se houver) ao lado; cartões embaixo */
var CART_Y=372, CART_H=118;
function layout(){
  var q=J.quiz, n=q.cartoes.length, gap=16, x0=200, larg=(W-x0-24-gap*(n-1))/n;
  q.cartoes.forEach(function(cd,k){ cd.x=x0+k*(larg+gap); cd.y=CART_Y; cd.w=larg; cd.h=CART_H; });
  q.lay={larg:larg,tr:!!J.tr}; return q.lay;
}

/* ---------- desenho ---------- */
function desenhaMundo(){ /* o ambiente de questões é desenhado por cima, na tela */ }
/* reino 7 (estádio): o ambiente de questões é a cena de pênalti (ING3_jogo_penalti.js) */
function penalti(){ var f=J.faseAtual; return !!(window.PENALTI&&f&&f.cena==='estadio'&&!f.chefao&&!J.chefe); }
function desenhaTela(c,t){
  var q=J.quiz; if(!q) return; var it=q.item;
  if(penalti()){ if(!q.lay||!q.lay.pen||q.lay.tr!==!!J.tr) PENALTI.layout(q); PENALTI.desenha(c,t,q); return; } if(!q.lay||q.lay.tr!==!!J.tr) layout();
  var ent=q.fase==='entra'?Math.min(1,q.t/.7):(q.fase==='pagina'?Math.max(0,1-q.t/1.2):1);
  /* a fase esmaecida e a moldura escura (clima de desafio) */
  c.save(); c.globalAlpha=ent;
  c.fillStyle='rgba(10,8,26,.72)'; c.fillRect(0,0,W,H);
  var vg=c.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.95); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.75)'); c.fillStyle=vg; c.fillRect(0,0,W,H);
  var pul=.5+.5*Math.sin(t*3); c.strokeStyle='rgba(253,224,71,'+(.25+.2*pul)+')'; c.lineWidth=6; A.rr(c,10,10,W-20,H-20,22); c.stroke();
  var sp=c.createRadialGradient(110,330,10,110,330,170); sp.addColorStop(0,'rgba(253,230,138,.28)'); sp.addColorStop(1,'rgba(253,230,138,0)'); c.fillStyle=sp; c.fillRect(0,120,260,380);
  c.restore();
  if(q.fase==='pagina'){ if(A.paginaVoando&&!q.op){ var k2=Math.min(1,q.t/1.2); A.paginaVoando(c,W/2+(W/2-80)*k2,H/2-(H/2-30)*k2,q.t*6); } return; }
  c.save(); c.globalAlpha=ent;
  var tipo=q.m.tipo||'crier', fala=(q.fase==='pergunta'||q.fase==='resposta')&&q.t<2.5;
  if(tipo==='conde'&&A.conde) A.conde(c,110,350,q.fase==='resposta'?(q.escolha===q.certa?'hit':'laugh'):'idle',t);
  else if(A.morador){ c.save(); c.translate(110,350); c.scale(1.45,1.45); A.morador(c,tipo,0,0,t,1,fala); c.restore(); }
  relogio(c,W/2,88,q,t);
  balao(c,q,it);
  q.cartoes.forEach(function(cd){ cartao(c,cd); });
  if(q.fase==='resposta'&&q.t>.5) botaoNext(c,q,t,ent);
  c.restore();
}
/* Next: grande, amarelo, "respirando" devagar (escala e brilho suaves, ~1 vez por segundo — nada de piscar) */
function botaoNext(c,q,t,ent){ var bw=170, bh=56, bx=W-bw-26, by=CART_Y-bh-12, k=.5+.5*Math.sin(t*3.2), s=1+.05*k;
  c.save(); c.globalAlpha=ent*Math.min(1,(q.t-.5)/.3); c.translate(bx+bw/2,by+bh/2); c.scale(s,s);
  c.shadowColor='rgba(253,224,71,'+(.35+.4*k)+')'; c.shadowBlur=14+12*k; c.fillStyle=A.lin?A.lin(c,0,-bh/2,0,bh/2,'#fde68a','#f59e0b'):'#fbbf24'; A.rr(c,-bw/2,-bh/2,bw,bh,22); c.fill(); c.shadowBlur=0;
  c.strokeStyle='#b45309'; c.lineWidth=3; A.rr(c,-bw/2,-bh/2,bw,bh,22); c.stroke();
  c.fillStyle='#1e1b3a'; c.font=F(900,24); c.textAlign='center'; c.textBaseline='middle'; c.fillText(q.i<q.itens.length-1?'Next ▶':'Done ▶',0,1); c.restore();
  q.next={x:bx,y:by,w:bw,h:bh}; }
function relogio(c,x,y,q,t){
  var frac=q.fase==='entra'?1:q.tempo/TEMPO, urg=frac<.34&&q.fase==='pergunta';
  c.save(); c.translate(x,y); if(urg){ var s=1+.05*Math.sin(t*4); c.scale(s,s); }
  c.fillStyle='rgba(13,11,30,.85)'; A.circ(c,0,0,30); c.fill();
  c.strokeStyle='rgba(255,255,255,.15)'; c.lineWidth=7; A.circ(c,0,0,24); c.stroke();
  c.strokeStyle=urg?'#ef4444':'#fde047'; c.lineCap='round'; c.beginPath(); c.arc(0,0,24,-Math.PI/2,-Math.PI/2+Math.PI*2*frac); c.stroke();
  c.fillStyle=urg?'#fecaca':'#fff'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(Math.ceil(q.tempo)),0,1);
  c.restore();
}
function balao(c,q,it){
  var resp=q.fase==='resposta', ok=q.escolha===q.certa;
  var en=resp?((ok?'Yes! ':(q.escolha<0?'Time is up! ':'Not quite! '))+(it.ex||'')):it.p;
  var pt=resp?((ok?'Isso! ':(q.escolha<0?'Acabou o tempo! ':'Quase! '))+(it.ex_pt||'')):(it.p_pt||'');
  var temTexto=!!it.texto&&!resp, bx=200, bw=W-bx-24, by=128, fs=23;
  if(temTexto){ textoLeitura(c,it,bx,by); bx=520; bw=W-bx-24; fs=20; }
  c.font=F(900,fs); var l1=quebra(c,en,bw-36); c.font=F(700,Math.round(fs*.66)); var l2=J.tr&&pt?quebra(c,pt,bw-36):[];
  var bh=20+l1.length*fs*1.22+(l2.length?6+l2.length*fs*.84:0)+14;
  if(bh>CART_Y-24-by){ fs=18; c.font=F(900,fs); l1=quebra(c,en,bw-36); c.font=F(700,12); l2=J.tr&&pt?quebra(c,pt,bw-36):[]; bh=20+l1.length*fs*1.22+(l2.length?6+l2.length*14:0)+14; }
  c.fillStyle=resp?(ok?'#dcfce7':'#fee2e2'):'#ffffff'; A.rr(c,bx,by,bw,bh,20); c.fill();
  c.beginPath(); c.moveTo(bx+2,by+26); c.lineTo(bx-22,by+44); c.lineTo(bx+2,by+50); c.closePath(); c.fill();
  c.fillStyle='#1e1b3a'; c.textAlign='left'; c.textBaseline='top'; c.font=F(900,fs); l1.forEach(function(l,k){ c.fillText(l,bx+18,by+14+k*fs*1.22); });
  if(l2.length){ c.fillStyle='#6b5d4f'; c.font=F(700,Math.round(fs*.66)); l2.forEach(function(l,k){ c.fillText(l,bx+18,by+18+l1.length*fs*1.22+k*fs*.84); }); }
  c.textAlign='right'; c.fillStyle='rgba(30,27,58,.45)'; c.font=F(900,13); c.fillText((q.i+1)+' / '+q.itens.length,bx+bw-12,by+6);
  if(q.dica&&!resp){ var d=(it.dica_en||it.dica), dy=by+bh+8; c.font=F(800,16); var dl=quebra(c,'Hint: '+d,bw-28); var dh=dl.length*20+12+(J.tr&&it.dica?16:0); if(dy+dh<CART_Y-6){ c.fillStyle='rgba(254,243,199,.97)'; A.rr(c,bx,dy,bw,dh,12); c.fill(); c.fillStyle='#78350f'; c.textAlign='left'; c.textBaseline='top'; dl.forEach(function(l,k){ c.fillText(l,bx+14,dy+6+k*20); }); if(J.tr&&it.dica){ c.font=F(700,12); c.fillStyle='#a16207'; c.fillText(it.dica,bx+14,dy+6+dl.length*20); } } }
}
function textoLeitura(c,it,x,y){
  var w=304; c.font=F(800,15); var linhas=[]; String(it.texto).split('\n').forEach(function(l){ if(!l.trim()){ linhas.push(''); return; } quebra(c,l,w-28).forEach(function(q2){ linhas.push(q2); }); });
  var h=Math.min(CART_Y-14-y,20+(it.titulo?26:0)+linhas.length*19+(it.autor?22:0));
  c.fillStyle=A.lin(c,x,y,x+w,y,'#fef3c7','#fde68a'); A.rr(c,x,y,w,h,12); c.fill(); c.fillStyle='#d6b77a'; A.rr(c,x-4,y-5,w+8,10,5); c.fill();
  c.save(); A.rr(c,x,y,w,h,12); c.clip(); c.textAlign='left'; c.textBaseline='top'; var yy=y+12;
  if(it.titulo){ c.fillStyle='#7c2d12'; c.font=F(900,18); c.fillText(it.titulo,x+14,yy); yy+=26; }
  c.fillStyle='#3b2412'; c.font=F(800,15); linhas.forEach(function(l){ if(l) c.fillText(l,x+14,yy); yy+=19; });
  if(it.autor){ c.textAlign='right'; c.font='italic 800 14px "Nunito",Arial'; c.fillStyle='#7c4a1e'; c.fillText(it.autor,x+w-12,yy+2); }
  c.restore();
}
function cartao(c,cd){
  var y=cd.y-cd.bump, cores={normal:['#fffbeb','#f59e0b','#1e1b3a'],certa:['#dcfce7','#16a34a','#14532d'],errada:['#fee2e2','#dc2626','#7f1d1d'],apagada:['rgba(255,255,255,.35)','rgba(255,255,255,.3)','rgba(30,27,58,.55)']}[cd.estado];
  c.save();
  if(cd.estado==='certa'){ c.shadowColor='rgba(74,222,128,.9)'; c.shadowBlur=24; }
  c.fillStyle=cores[0]; A.rr(c,cd.x,y,cd.w,cd.h,18); c.fill(); c.shadowBlur=0;
  c.strokeStyle=cores[1]; c.lineWidth=4; A.rr(c,cd.x,y,cd.w,cd.h,18); c.stroke();
  c.fillStyle=cores[1]; A.circ(c,cd.x+30,y+30,20); c.fill(); c.fillStyle='#fff'; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(cd.k+1),cd.x+30,y+31);
  var fs=20; c.font=F(900,fs); var l1=quebra(c,cd.txt,cd.w-70); if(l1.length>3){ fs=16; c.font=F(900,fs); l1=quebra(c,cd.txt,cd.w-64); }
  c.font=F(700,12); var l2=J.tr&&cd.pt&&cd.pt!==cd.txt?quebra(c,cd.pt,cd.w-64):[];
  var th=l1.length*fs*1.15+(l2.length?4+l2.length*14:0), ty=y+(cd.h-th)/2;
  c.fillStyle=cores[2]; c.textAlign='left'; c.textBaseline='top'; c.font=F(900,fs); l1.forEach(function(l,k){ c.fillText(l,cd.x+58,ty+k*fs*1.15); });
  if(l2.length){ c.fillStyle='#7c4a1e'; c.font=F(700,12); l2.forEach(function(l,k){ c.fillText(l,cd.x+58,ty+l1.length*fs*1.15+4+k*14); }); }
  c.restore();
}

/* ---------- entradas ---------- */
function bate(){}
function toque(lx,ly){
  var q=J.quiz; if(!q) return false;
  if(q.fase==='resposta'){ var nb=q.next; if(!nb||(lx>nb.x-12&&lx<nb.x+nb.w+12&&ly>nb.y-12&&ly<nb.y+nb.h+12)) segue(); return true; } /* só o botão Next avança: tocar no cartão não pula o comentário */
  if(q.fase!=='pergunta') return true;
  for(var i=0;i<q.cartoes.length;i++){ var cd=q.cartoes[i]; if(lx>cd.x&&lx<cd.x+cd.w&&ly>cd.y&&ly<cd.y+cd.h){ responde(i); return true; } }
  return true;
}
function tecla(k){
  var q=J.quiz; if(!q) return false;
  if(q.fase==='pergunta'){ var n=parseInt(k,10); if(n>=1&&n<=q.cartoes.length){ responde(n-1); return true; } }
  if(q.fase==='resposta'&&(k==='Enter'||k===' ')){ segue(); return true; }
  return ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','w','a','s','d','W','A','S','D'].indexOf(k)>=0; /* durante o desafio o herói fica parado */
}
function alternaDica(){ var q=J.quiz; if(!q||q.fase!=='pergunta') return; q.dica=!q.dica; if(q.dica){ try{ say(q.item.dica_en||''); }catch(e){} } }
function ouvir(){ var q=J.quiz; if(!q) return; var it=q.item; try{ say(q.fase==='resposta'?(it.ex||''):it.p+'. '+q.ordem.map(function(oi,k){ return (k+1)+': '+it.o[oi]; }).join('. ')); }catch(e){} }

return {embaralha:embaralha, marca:marca, inicia:inicia, atualiza:atualiza, desenhaMundo:desenhaMundo, desenhaTela:desenhaTela, bate:bate, toque:toque, tecla:tecla, sai:sai, segue:segue, alternaDica:alternaDica, ouvir:ouvir, escolhe:escolhe};
})();
