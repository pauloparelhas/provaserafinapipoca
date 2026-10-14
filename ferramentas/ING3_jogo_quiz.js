/* ============================================================
   ING3_jogo_quiz.js — a PERGUNTA DENTRO DO MUNDO (The Lost Endings).
   Ao chegar perto de um morador, o jogo não troca de tela: a câmera
   enquadra a praça, o morador fala a pergunta num balão (inglês; a
   bandeira mostra o português menor embaixo) e três PLACAS de madeira
   descem à altura de um pulo. Responder = pular e bater a cabeça na
   placa certa (o mesmo gesto da caixa "?"), ou tocar nela, ou 1/2/3.
   Acertou: placa verde, o morador diz o porquê. Errou: a placa treme,
   a certa acende e o morador explica. Toque/ENTER/pulo segue.
   Cada morador faz 3 perguntas e entrega 1 página do livro.
   Perguntas: ING3_banco.js, filtradas pelo tema e pelos átomos do
   reino (FASES.LISTA[].at), sem repetir (localStorage ing3_jogo_usadas).
   ============================================================ */
window.QUIZ = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var N_POR_MORADOR=3, PLACA_W=200, PLACA_GAP=15, PLACA_BASE=150; /* base da placa = chão - 150 px: o herói grande (110) passa por baixo; o pequeno alcança com um pulo */
var USADAS='ing3_jogo_usadas';

/* ---------- escolha das perguntas ---------- */
function usadas(){ try{ return JSON.parse(localStorage.getItem(USADAS)||'[]'); }catch(e){ return []; } }
function marca(id){ var u=usadas(); if(u.indexOf(id)<0){ u.push(id); try{ localStorage.setItem(USADAS,JSON.stringify(u)); }catch(e){} } }
function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function escolhe(f,n,jaNaFase){
  var pool=ING3.ITENS.filter(function(it){ if(f.tema!=='todos'&&it.tema!==f.tema) return false; if(f.at&&it.at&&!it.at.some(function(a){ return f.at.indexOf(a)>=0; })) return false; return jaNaFase.indexOf(it.id)<0; });
  var u=usadas(), novas=pool.filter(function(it){ return u.indexOf(it.id)<0; });
  if(novas.length<n){ /* o reino esgotou: recomeça só as deste reino */ var ids=pool.map(function(it){ return it.id; }); try{ localStorage.setItem(USADAS,JSON.stringify(u.filter(function(id){ return ids.indexOf(id)<0; }))); }catch(e){} novas=pool; }
  var sel=[], leit=0;
  embaralha(novas).forEach(function(it){ if(sel.length>=n) return; if(it.tipo==='leitura'){ if(leit>=1) return; leit++; } sel.push(it); });
  return sel;
}

/* ---------- ciclo ---------- */
function inicia(m){
  if(J.quiz) return;
  var f=J.faseAtual, L=J.nivel, ja=L.quizIds||(L.quizIds=[]);
  var itens=escolhe(f,N_POR_MORADOR,ja); if(!itens.length) return;
  itens.forEach(function(it){ ja.push(it.id); });
  var u=J.urso; u.vx=0; J.in.left=J.in.right=false;
  J.quiz={m:m, itens:itens, i:0, fase:'entra', t:0, acertos:0, placas:[], camX:m.x-140, chao:m.y, lay:null};
  J.estado='quiz'; m.visto=true; SOM.fx('plim');
  montaPergunta();
  if(window.UI) UI.quizBotoes(true);
}
function montaPergunta(){
  var q=J.quiz, it=q.itens[q.i]; var ordem=embaralha(it.o.map(function(_,i){ return i; }));
  q.item=it; q.ordem=ordem; q.certa=ordem.indexOf(it.c); q.escolha=-1; q.fase='entra'; q.t=0; q.lay=null; q.dica=false;
  q.placas=ordem.map(function(oi,k){ return {k:k, x:q.m.x+170+k*(PLACA_W+PLACA_GAP), y:q.chao-PLACA_BASE-90, w:PLACA_W, h:90, txt:it.o[oi], pt:(it.o_pt||[])[oi]||'', estado:'normal', ativa:false, bump:0, queda:0}; });
  q.m.falando=2.5;
  try{ say(it.p); }catch(e){}
}
function responde(k){
  var q=J.quiz; if(!q||q.fase!=='pergunta') return;
  var ok=k===q.certa; q.escolha=k; q.fase='resposta'; q.t=0; if(!J.prog.quizVisto){ J.prog.quizVisto=true; G.salva(); }
  J.stats.perguntas++; marca(q.item.id);
  q.placas.forEach(function(p){ p.ativa=false; p.estado= p.k===q.certa?'certa':(p.k===k?'errada':'apagada'); });
  var p=q.placas[k]; p.bump=12;
  if(ok){ q.acertos++; J.stats.acertos++; G.pontua(100,p.x+p.w/2,p.y); SOM.fx('acerto'); G.brilho(p.x+p.w/2,p.y+p.h/2,14,'#86efac'); J.urso.cheerT=.9; }
  else { SOM.fx('erro'); J.shake=4; }
  q.m.falando=2.5;
  try{ say((ok?'Yes! ':'Not quite. ')+(q.item.ex||'')); }catch(e){}
}
function segue(){
  var q=J.quiz; if(!q||q.fase!=='resposta'||q.t<.6) return;
  q.i++;
  if(q.i<q.itens.length){ montaPergunta(); return; }
  /* fim do morador: uma página do livro */
  q.fase='pagina'; q.t=0; q.placas.forEach(function(p){ p.ativa=false; p.estado='sobe'; });
  q.m.feito=true; SOM.fx('vitoria');
  var L=J.nivel, n=L.moradores.filter(function(mm){ return mm.feito; }).length;
  G.toast('You found a lost page! ('+n+' of '+L.moradores.length+')',2600,'Você achou uma página perdida! ('+n+' de '+L.moradores.length+')');
  G.pontua(150);
}
function sai(){ /* ✕ Leave: volta a jogar na hora; o morador espera o herói se afastar */
  var q=J.quiz; if(!q) return; q.m.esperaT=1.5; termina();
}
function termina(){ var q=J.quiz; J.quiz=null; J.estado='nivel'; if(window.UI) UI.quizBotoes(false); G.hud(); try{ speechSynthesis.cancel(); }catch(e){} if(q&&!q.m.feito){ q.m.esperaT=Math.max(q.m.esperaT||0,1.5); } }

function atualiza(dt){
  var q=J.quiz; if(!q) return; q.t+=dt;
  var u=J.urso; /* o herói fica na praça enquanto a conversa dura */
  if(u.x<q.camX+30){ u.x=q.camX+30; u.vx=0; } if(u.x>q.camX+W-30){ u.x=q.camX+W-30; u.vx=0; }
  q.placas.forEach(function(p){ if(p.bump>0) p.bump=Math.max(0,p.bump-dt*60); });
  if(q.fase==='entra'){ q.placas.forEach(function(p,i){ p.queda=Math.min(1,Math.max(0,(q.t-i*.12)/.45)); }); if(q.t>.75){ q.fase='pergunta'; q.placas.forEach(function(p){ p.ativa=true; p.queda=1; }); } }
  else if(q.fase==='resposta'){ if(J.in.jump&&J.jumpSolto===false&&q.t>.9&&u.noChao){ /* pular de novo também segue */ } }
  else if(q.fase==='pagina'){ q.placas.forEach(function(p){ p.queda=Math.max(0,1-q.t/.5); }); if(q.t>1.8) termina(); }
}

/* ---------- texto em canvas ---------- */
function quebra(c,txt,larg){ var pal=String(txt).split(' '), linhas=[], cur=''; pal.forEach(function(w){ var t=cur?cur+' '+w:w; if(c.measureText(t).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=t; }); if(cur) linhas.push(cur); return linhas; }
function layout(c){
  var q=J.quiz, it=q.item, tr=!!J.tr, chaoTela=q.chao-J.camY, baseY=chaoTela-PLACA_BASE;
  var temTexto=!!it.texto, bx=temTexto?300:20, bw=temTexto?640:920;
  /* tenta o maior corpo de letra que deixa as placas abaixo do balão */
  var tamanhos=[24,21,19,17], L=null;
  for(var s=0;s<tamanhos.length;s++){
    var fs=tamanhos[s]; c.font='900 '+fs+'px "Nunito","Segoe UI",Arial';
    var lp=quebra(c,it.p,bw-36); c.font='700 '+Math.round(fs*.68)+'px "Nunito","Segoe UI",Arial';
    var lpt=tr&&it.p_pt?quebra(c,it.p_pt,bw-36):[];
    var bh=18+lp.length*fs*1.22+(lpt.length?6+lpt.length*fs*.86:0)+16;
    var fsP=Math.max(15,fs-4); c.font='900 '+fsP+'px "Nunito","Segoe UI",Arial';
    var placas=q.placas.map(function(p){ var l1=quebra(c,p.txt,p.w-24); c.font='700 '+Math.round(fsP*.72)+'px "Nunito","Segoe UI",Arial'; var l2=tr&&p.pt&&p.pt!==p.txt?quebra(c,p.pt,p.w-24):[]; c.font='900 '+fsP+'px "Nunito","Segoe UI",Arial'; return {l1:l1,l2:l2,h:22+l1.length*fsP*1.15+(l2.length?4+l2.length*fsP*.82:0)}; });
    var hp=Math.max.apply(null,placas.map(function(x){ return x.h; }));
    L={fs:fs,fsP:fsP,lp:lp,lpt:lpt,bx:bx,by:60,bw:bw,bh:bh,placas:placas,hp:Math.max(70,hp),baseY:baseY};
    if(60+bh+18<baseY-L.hp) break;
  }
  q.placas.forEach(function(p,i){ p.h=L.hp; p.y=q.chao-PLACA_BASE-L.hp; });
  L.tr=tr; q.lay=L; return L;
}

/* ---------- desenho: placas (coordenadas do mundo) ---------- */
function desenhaMundo(c,t){
  var q=J.quiz; if(!q) return; var L=(q.lay&&q.lay.tr===!!J.tr)?q.lay:layout(c);
  q.placas.forEach(function(p,i){
    var desce=(1-Math.pow(1-p.queda,3))*(p.y+p.h+40)-(p.h+40), y=desce-(p.bump||0)+(p.estado==='errada'?Math.sin(q.t*40)*Math.max(0,3-q.t*4):0);
    if(p.queda<=0) return;
    var cx=p.x;
    /* correntes até o alto da tela */
    /* correntes até o alto da tela (a placa da arte desenha só o trecho de perto) */
    c.strokeStyle='rgba(75,85,99,.55)'; c.lineWidth=2; c.setLineDash([5,5]); c.beginPath(); c.moveTo(cx+p.w*.18,J.camY-10); c.lineTo(cx+p.w*.18,y-66); c.moveTo(cx+p.w*.82,J.camY-10); c.lineTo(cx+p.w*.82,y-66); c.stroke(); c.setLineDash([]);
    if(A.placa) A.placa(c,cx+p.w/2,y+p.h/2,p.w,p.h,p.estado==='normal'&&p.bump>0?'bump':p.estado,q.t); else { c.fillStyle=p.estado==='certa'?'#86efac':(p.estado==='errada'?'#fca5a5':(p.estado==='apagada'?'#a8a29e':'#fde68a')); A.rr(c,cx,y,p.w,p.h,12); c.fill(); }
    var lp=L.placas[i]; c.textAlign='center'; c.textBaseline='top';
    var cor= p.estado==='apagada'?'rgba(41,24,10,.45)':'#2b1a0b';
    var ty=y+(p.h-(lp.l1.length*L.fsP*1.15+(lp.l2.length?4+lp.l2.length*L.fsP*.82:0)))/2;
    c.fillStyle=cor; c.font='900 '+L.fsP+'px "Nunito","Segoe UI",Arial'; lp.l1.forEach(function(l,k){ c.fillText(l,cx+p.w/2,ty+k*L.fsP*1.15); });
    if(lp.l2.length){ c.fillStyle=p.estado==='apagada'?'rgba(91,53,20,.45)':'#7c4a1e'; c.font='700 '+Math.round(L.fsP*.72)+'px "Nunito","Segoe UI",Arial'; var y2=ty+lp.l1.length*L.fsP*1.15+4; lp.l2.forEach(function(l,k){ c.fillText(l,cx+p.w/2,y2+k*L.fsP*.82); }); }
    /* número da tecla */
    c.fillStyle='rgba(43,26,11,.75)'; A.circ(c,cx+16,y+16,11); c.fill(); c.fillStyle='#fde68a'; c.font='900 13px Arial'; c.textBaseline='middle'; c.fillText(String(i+1),cx+16,y+16);
  });
}

/* ---------- desenho: balão, pergaminho, instrução (coordenadas da tela) ---------- */
function desenhaTela(c,t){
  var q=J.quiz; if(!q||q.fase==='pagina') return; var L=q.lay; if(!L) return; var it=q.item;
  if(it.texto) pergaminho(c,it,t);
  /* balão: pergunta, ou a fala de resposta */
  var falaEN, falaPT, cor='#fff';
  if(q.fase==='resposta'){ var ok=q.escolha===q.certa; falaEN=(ok?'Yes! ':'Not quite! ')+(it.ex||''); falaPT=(ok?'Isso! ':'Quase! ')+(it.ex_pt||''); fs=Math.min(fs,20); cor=ok?'#dcfce7':'#fee2e2'; }
  var bx=L.bx, by=L.by, bw=L.bw, bh=L.bh, linhas=L.lp, linhasPT=L.lpt, fs=L.fs;
  if(falaEN){ fs=Math.min(fs,20); c.font='900 '+fs+'px "Nunito","Segoe UI",Arial'; linhas=quebra(c,falaEN,bw-36); c.font='700 '+Math.round(fs*.68)+'px "Nunito","Segoe UI",Arial'; linhasPT=J.tr?quebra(c,falaPT,bw-36):[]; bh=18+linhas.length*fs*1.22+(linhasPT.length?6+linhasPT.length*fs*.86:0)+16; }
  var mx=q.m.x-J.cam;
  c.save(); c.shadowColor='rgba(0,0,0,.35)'; c.shadowBlur=14; c.shadowOffsetY=5;
  c.fillStyle=cor; A.rr(c,bx,by,bw,bh,20); c.fill(); c.restore();
  c.fillStyle=cor; c.beginPath(); var tx=Math.max(bx+30,Math.min(bx+bw-30,mx+20)); c.moveTo(tx-14,by+bh-2); c.lineTo(tx+14,by+bh-2); c.lineTo(mx+6,by+bh+26); c.closePath(); c.fill();
  c.strokeStyle='rgba(30,27,58,.15)'; c.lineWidth=2; A.rr(c,bx,by,bw,bh,20); c.stroke();
  c.textAlign='left'; c.textBaseline='top'; c.fillStyle='#1e1b3a'; c.font='900 '+fs+'px "Nunito","Segoe UI",Arial';
  linhas.forEach(function(l,k){ c.fillText(l,bx+18,by+16+k*fs*1.22); });
  if(linhasPT.length){ c.fillStyle='#6b5d4f'; c.font='700 '+Math.round(fs*.68)+'px "Nunito","Segoe UI",Arial'; var y0=by+16+linhas.length*fs*1.22+6; linhasPT.forEach(function(l,k){ c.fillText(l,bx+18,y0+k*fs*.86); }); }
  /* contador e instrução */
  c.textAlign='right'; c.fillStyle='rgba(30,27,58,.5)'; c.font='900 13px "Nunito",Arial'; c.fillText((q.i+1)+' / '+q.itens.length,bx+bw-14,by+6);
  if(q.dica&&q.fase==='pergunta'){ var d=it.dica_en||it.dica; c.font='800 16px "Nunito",Arial'; var dl=quebra(c,'Hint: '+d,560), dh=dl.length*20+14+(J.tr&&it.dica?18:0); var dy=L.baseY-L.hp-dh-14; if(dy<by+bh+8) dy=by+bh+8; c.fillStyle='rgba(254,243,199,.97)'; A.rr(c,300,dy,600,dh,12); c.fill(); c.fillStyle='#78350f'; c.textAlign='left'; dl.forEach(function(l,k){ c.fillText(l,314,dy+7+k*20); }); if(J.tr&&it.dica){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#a16207'; c.fillText(it.dica,314,dy+7+dl.length*20); } }
  var instr=null, ipt=null;
  /* instrução só na 1ª pergunta do jogo; depois, só a seta discreta para seguir */
  if(q.fase==='pergunta'&&!J.prog.quizVisto){ instr='Jump and hit the right sign!'; ipt='Pule e bata a cabeça na placa certa!'; }
  else if(q.fase==='resposta'&&q.t>.6){ instr='▶'; ipt=''; }
  if(instr){ var a=.7+.3*Math.sin(t*4); c.save(); c.globalAlpha=a; c.textAlign='center'; c.textBaseline='middle'; c.font='900 18px "Nunito",Arial'; var w2=c.measureText(instr).width+30, yy=H-88-(J.tr?14:0); c.fillStyle='rgba(13,11,30,.75)'; A.rr(c,W/2-w2/2,yy-16-(J.tr?2:0),w2,32+(J.tr?16:0),16); c.fill(); c.fillStyle='#fde68a'; c.fillText(instr,W/2,yy); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#e9e6ff'; c.fillText(ipt,W/2,yy+17); } c.restore(); }
}
function pergaminho(c,it,t){
  var x=16, y=60, w=274; c.font='800 16px "Nunito","Segoe UI",Arial';
  var linhas=[]; String(it.texto).split('\n').forEach(function(l){ if(!l.trim()){ linhas.push(''); return; } quebra(c,l,w-28).forEach(function(q2){ linhas.push(q2); }); });
  var h=24+(it.titulo?28:0)+linhas.length*21+(it.autor?24:0)+14;
  c.save(); c.shadowColor='rgba(0,0,0,.35)'; c.shadowBlur=12; c.shadowOffsetY=4;
  c.fillStyle=A.lin(c,x,y,x+w,y,'#fef3c7','#fde68a'); A.rr(c,x,y,w,h,10); c.fill(); c.restore();
  c.fillStyle='#d6b77a'; A.rr(c,x-6,y-6,w+12,14,7); c.fill(); A.rr(c,x-6,y+h-8,w+12,14,7); c.fill();
  c.textAlign='left'; c.textBaseline='top'; var yy=y+16;
  if(it.titulo){ c.fillStyle='#7c2d12'; c.font='900 19px "Nunito","Segoe UI",Arial'; c.fillText(it.titulo,x+14,yy); yy+=28; }
  c.fillStyle='#3b2412'; c.font='800 16px "Nunito","Segoe UI",Arial';
  linhas.forEach(function(l){ if(l.trim()) c.fillText(l,x+14,yy); yy+=21; });
  if(it.autor){ c.textAlign='right'; c.font='italic 800 15px "Nunito",Arial'; c.fillStyle='#7c4a1e'; c.fillText(it.autor,x+w-12,yy+4); }
}

/* ---------- entradas ---------- */
function bate(p){ var q=J.quiz; if(!q||q.fase!=='pergunta'||!p.ativa) return; responde(p.k); }
function toque(lx,ly){
  var q=J.quiz; if(!q) return false;
  if(q.fase==='resposta'){ segue(); return true; }
  if(q.fase!=='pergunta') return false;
  for(var i=0;i<q.placas.length;i++){ var p=q.placas[i], sx=p.x-J.cam, sy=p.y-J.camY; if(lx>sx&&lx<sx+p.w&&ly>sy&&ly<sy+p.h){ p.bump=10; responde(i); return true; } }
  return false;
}
function tecla(k){
  var q=J.quiz; if(!q) return false;
  if(q.fase==='pergunta'){ var n=parseInt(k,10); if(n>=1&&n<=q.placas.length){ responde(n-1); return true; } }
  if(q.fase==='resposta'&&(k==='Enter'||k===' '||k==='ArrowUp'||k==='w'||k==='W')){ segue(); return k==='Enter'; }
  return false;
}
function alternaDica(){ var q=J.quiz; if(!q||q.fase!=='pergunta') return; q.dica=!q.dica; if(q.dica){ try{ say(q.item.dica_en||''); }catch(e){} } }
function ouvir(){ var q=J.quiz; if(!q) return; var it=q.item; try{ say(q.fase==='resposta'?(it.ex||''):it.p+'. '+q.ordem.map(function(oi,k){ return (k+1)+': '+it.o[oi]; }).join('. ')); }catch(e){} }

return {inicia:inicia, atualiza:atualiza, desenhaMundo:desenhaMundo, desenhaTela:desenhaTela, bate:bate, toque:toque, tecla:tecla, sai:sai, segue:segue, alternaDica:alternaDica, ouvir:ouvir, escolhe:escolhe};
})();
