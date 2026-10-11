/* ============================================================
   LP3_jornada_ui.js — a camada DOM: HUD, quadro da pergunta,
   menus (pausa, fim de fase, créditos, confirmações), controles
   de toque e teclado. Fala com o motor por window.JOGO e com o
   banco por window.LP3. A voz é só a Thalita (OP_voz.js → say()).
   ============================================================ */
window.UI = (function(){
'use strict';
var $=function(id){ return document.getElementById(id); };
var J=null, qAberta=null, menuAberto=null, toastT=null;

function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ---------- HUD ---------- */
function hud(nome,moedas){ $('hudName').textContent=nome; $('hudCoinN').textContent=moedas; }
function toast(txt,dur){ var t=$('toast'); t.textContent=txt; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove('show'); },dur||2200); }
function pintaSfx(){ var b=$('sfxbtn'); b.classList.toggle('off',!SOM.ligado); b.title=SOM.ligado?'Desligar sons do jogo':'Ligar sons do jogo'; }
function modoNivel(on){ $('touch').style.display=on?'block':'none'; }
function modoMapa(on){ var b=$('mapBtns'); if(b) b.style.display=on?'flex':'none'; }

/* ---------- quadro da pergunta ---------- */
/* item do banco: {p,o,c,dica,ex,tema}. A certa costuma vir no índice 0 do
   banco — por isso embaralhamos SEMPRE e recalculamos o índice certo. */
function pergunta(item,opts,aoResponder,aoContinuar){
  var tema=LP3.TEMAS[item.tema]||{nome:item.tema,cor:'#60a5fa'};
  var ordem=embaralha(item.o.map(function(_,i){ return i; }));
  var certa=ordem.indexOf(item.c);
  var card=$('qcard'); card.style.setProperty('--tc',tema.cor);
  var seq= opts.total>1 ? '<span class="qseq">Pergunta '+opts.seq+' de '+opts.total+' desta caixa</span>' : '<span class="qseq"></span>';
  var h='<div class="qtop"><span class="qtema">'+esc(tema.nome)+'</span>'+seq+'<button class="qvoz" id="qVoz" title="Ouvir" aria-label="Ouvir a pergunta">&#128266;</button></div>';
  h+='<div class="qp" id="qP">'+esc(item.p)+'</div>';
  h+='<div class="qops'+(ordem.length===3?' tres':'')+'" id="qOps">';
  ordem.forEach(function(oi,k){ h+='<button class="qop" data-k="'+k+'"><span class="n">'+(k+1)+'</span>'+esc(item.o[oi])+'</button>'; });
  h+='</div><div class="qfoot"><button class="qdica" id="qDica">&#128161; Dica</button><div class="qdicaTxt" id="qDicaTxt">'+esc(item.dica||'')+'</div><div class="qex" id="qEx"></div><button class="qgo" id="qGo">Continuar &#9654;</button></div>';
  card.innerHTML=h;
  $('qbox').classList.add('show');
  var ops=[].slice.call(card.querySelectorAll('.qop')), sel=-1, respondido=false;
  function marca(i){ sel=i; ops.forEach(function(b,k){ b.classList.toggle('sel',k===i); }); }
  function responde(i){
    if(respondido) return; respondido=true; var ok=i===certa;
    ops.forEach(function(b,k){ b.disabled=true; if(k===certa) b.classList.add('ok'); else if(k===i) b.classList.add('err'); else b.classList.add('dim'); b.classList.remove('sel'); });
    $('qDica').style.display='none'; $('qDicaTxt').classList.remove('show');
    var ex=$('qEx'); ex.textContent=(ok?'Isso! ':'A certa é "'+item.o[item.c]+'". ')+(item.ex||''); ex.className='qex show '+(ok?'okc':'errc');
    var go=$('qGo'); go.classList.add('show'); go.textContent= ok?'Continuar ▶':'Tentar de novo ↺'; if(ok && opts.seq<opts.total) go.textContent='Próxima pergunta ▶';
    aoResponder(ok);
  }
  ops.forEach(function(b,k){ b.addEventListener('click',function(){ SOM.init(); if(!respondido){ marca(k); responde(k); } }); });
  $('qVoz').addEventListener('click',function(){ try{ say(item.p+'. '+ordem.map(function(oi,k){ return 'Opção '+(k+1)+': '+item.o[oi]; }).join('. ')); }catch(e){} });
  $('qDica').addEventListener('click',function(){ SOM.fx('clique'); $('qDicaTxt').classList.toggle('show'); try{ if($('qDicaTxt').classList.contains('show')) say(item.dica||''); }catch(e){} });
  $('qGo').addEventListener('click',function(){ fecha(); aoContinuar(); });
  function fecha(){ $('qbox').classList.remove('show'); qAberta=null; try{ speechSynthesis.cancel(); }catch(e){} }
  qAberta={
    tecla:function(k){
      if(k==='Escape') return;
      if(respondido){ if(k==='Enter'||k===' '){ fecha(); aoContinuar(); } return; }
      var n=parseInt(k,10); if(n>=1&&n<=ops.length){ marca(n-1); responde(n-1); return; }
      if(k==='ArrowRight'||k==='ArrowDown'||k==='d'||k==='s'){ marca((sel+1)%ops.length); SOM.fx('clique'); }
      if(k==='ArrowLeft'||k==='ArrowUp'||k==='a'||k==='w'){ marca((sel-1+ops.length)%ops.length); SOM.fx('clique'); }
      if((k==='Enter'||k===' ')&&sel>=0) responde(sel);
    },
    responderIdx:function(i){ marca(i); responde(i); }, certa:function(){ return certa; }, continuar:function(){ if(respondido){ fecha(); aoContinuar(); } }
  };
}

/* ---------- menus ---------- */
function menu(html,acoes){
  var m=$('mcard'); m.innerHTML=html; $('menu').classList.add('show'); menuAberto={acoes:acoes||{}};
  Object.keys(acoes||{}).forEach(function(id){ var b=$(id); if(b) b.addEventListener('click',function(){ SOM.fx('clique'); acoes[id](); }); });
}
function fechaMenu(){ $('menu').classList.remove('show'); menuAberto=null; }
function estrelasHtml(n){ var s=''; for(var i=0;i<3;i++) s+='<span style="font-size:44px;color:'+(i<n?'#fde047':'rgba(255,255,255,.25)')+';text-shadow:0 2px 6px rgba(0,0,0,.5)">&#9733;</span>'; return s; }

function fimFase(f,estrelas,acertos,total){
  var h='<h2>'+esc(f.nome)+'</h2><div style="margin:2px 0 8px">'+estrelasHtml(estrelas)+'</div>';
  h+='<p>Perguntas certas de primeira: <b>'+acertos+' de '+total+'</b></p>';
  if(f.tutorial) h+='<p>Agora você já sabe jogar. Boa jornada!</p>';
  h+='<button class="mbtn pri" id="mMapa">Voltar ao mapa &#128506;</button>';
  if(!f.tutorial) h+='<button class="mbtn" id="mDeNovo">Jogar esta fase de novo</button>';
  menu(h,{mMapa:function(){ fechaMenu(); JOGO.voltaMapa(); }, mDeNovo:function(){ fechaMenu(); JOGO.jogarDeNovo(); }});
}
function creditos(){
  var h='<h2>&#127942; Jornada completa!</h2><p>Você recuperou a Folha de Bordo Dourada e devolveu o Canadá à paz. Conquistas:</p>';
  h+='<div style="text-align:left;font-size:16px;line-height:1.5;columns:2;margin-bottom:10px">';
  FASES.LISTA.forEach(function(f){ var p=JOGO.J.prog.fases[f.id]||{}; h+='<div>&#10003; '+esc(f.nome)+' <span style="color:#fde047">'+'★'.repeat(p.estrelas||0)+'</span></div>'; });
  h+='</div><button class="mbtn pri" id="mMapa">Voltar ao mapa &#128506;</button>';
  menu(h,{mMapa:function(){ fechaMenu(); JOGO.irMapa(); }});
}
function pausa(){
  if(menuAberto||qAberta) return;
  var J2=JOGO.J; if(J2.estado!=='nivel'&&J2.estado!=='arremesso'&&J2.estado!=='pergunta') return;
  JOGO.pausa(true);
  var h='<h2>Pausa</h2><button class="mbtn pri" id="mCont">Continuar &#9654;</button><button class="mbtn" id="mSom">Sons do jogo: '+(SOM.ligado?'ligados':'desligados')+'</button><button class="mbtn" id="mComo">Como jogar</button><button class="mbtn" id="mMapa">Voltar ao mapa</button>';
  menu(h,{mCont:function(){ fechaMenu(); JOGO.pausa(false); }, mSom:function(){ SOM.setLigado(!SOM.ligado); pintaSfx(); $('mSom').textContent='Sons do jogo: '+(SOM.ligado?'ligados':'desligados'); },
    mComo:function(){ fechaMenu(); JOGO.pausa(false); fechaPergunta(); JOGO.iniciaTutorial(); }, mMapa:function(){ fechaMenu(); JOGO.pausa(false); fechaPergunta(); JOGO.irMapa(); }});
}
function fechaPergunta(){ $('qbox').classList.remove('show'); qAberta=null; }
function confirmaCasa(){
  if(menuAberto) return; var estava=JOGO.J.pausado; JOGO.pausa(true);
  menu('<h2>Sair do jogo?</h2><p>Seu progresso fica salvo.</p><div class="mrow"><button class="mbtn" id="mNao">Ficar</button><button class="mbtn danger" id="mSim">Sair &#127968;</button></div>',
    {mNao:function(){ fechaMenu(); JOGO.pausa(estava); }, mSim:function(){ goHome(); }});
}
function confirmaRecomecar(){
  if(menuAberto) return;
  menu('<h2>Recomeçar a jornada?</h2><p>Todas as fases voltam a ficar trancadas e as estrelas somem.</p><div class="mrow"><button class="mbtn" id="mNao">Não</button><button class="mbtn danger" id="mSim">Sim, recomeçar</button></div>',
    {mNao:fechaMenu, mSim:function(){ fechaMenu(); JOGO.recomecar(); }});
}

/* ---------- botões do mapa (DOM, só aparecem no mapa) ---------- */
function montaMapBtns(){
  var d=document.createElement('div'); d.id='mapBtns';
  d.style.cssText='position:absolute;left:0;right:0;bottom:50px;display:none;justify-content:center;gap:12px;pointer-events:none';
  d.innerHTML='<button class="mbtn" id="mbComo" style="width:auto;padding:0 22px;height:52px;font-size:18px;pointer-events:auto;margin:0">&#10067; Como jogar</button>'+
    '<button class="mbtn" id="mbRec" style="width:auto;padding:0 18px;height:52px;font-size:15px;opacity:.75;pointer-events:auto;margin:0">&#8635; Recomeçar jornada</button>';
  $('ui').appendChild(d);
  $('mbComo').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); JOGO.iniciaTutorial(); });
  $('mbRec').addEventListener('click',function(){ SOM.init(); confirmaRecomecar(); });
}

/* ---------- entrada: teclado ---------- */
var mapaTeclas={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'jump',w:'jump',W:'jump',' ':'jump'};
function keydown(e){
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  SOM.init(); document.body.classList.add('kbd');
  var k=e.key, J2=JOGO.J;
  if(k==='Escape'){ e.preventDefault(); if(menuAberto){ if(J2.estado==='nivel'||J2.estado==='pergunta'||J2.estado==='arremesso'){ fechaMenu(); JOGO.pausa(false); } } else pausa(); return; }
  if(menuAberto){ if(k==='Enter'||k===' '){ var pri=$('mcard').querySelector('.mbtn.pri'); if(pri){ e.preventDefault(); pri.click(); } } return; }
  if(qAberta){ e.preventDefault(); qAberta.tecla(k); return; }
  if(J2.estado==='intro'||J2.estado==='mapa'){
    if(k==='Enter'||k===' '){ e.preventDefault(); JOGO.confirmar(); return; }
    if(J2.estado==='mapa'){ if(k==='ArrowRight'||k==='d'||k==='D'||k==='ArrowDown'||k==='s'||k==='S'){ JOGO.mapaMove(1); } if(k==='ArrowLeft'||k==='a'||k==='A'||k==='ArrowUp'||k==='w'||k==='W'){ JOGO.mapaMove(-1); } }
    return;
  }
  var ac=mapaTeclas[k]; if(ac){ e.preventDefault(); J2.in[ac]=true; }
}
function keyup(e){ var ac=mapaTeclas[e.key]; if(ac) JOGO.J.in[ac]=false; }

/* ---------- entrada: toque ---------- */
function botaoToque(id,ac){
  var b=$(id);
  function on(e){ e.preventDefault(); SOM.init(); document.body.classList.remove('kbd'); b.classList.add('on'); JOGO.J.in[ac]=true; try{ b.setPointerCapture(e.pointerId); }catch(x){} }
  function off(e){ e.preventDefault(); b.classList.remove('on'); JOGO.J.in[ac]=false; }
  b.addEventListener('pointerdown',on); b.addEventListener('pointerup',off); b.addEventListener('pointercancel',off); b.addEventListener('pointerleave',off);
  b.addEventListener('contextmenu',function(e){ e.preventDefault(); });
}

function init(){
  J=JOGO.J; montaMapBtns(); pintaSfx();
  $('btnHome').addEventListener('click',function(){ SOM.init(); confirmaCasa(); });
  $('sfxbtn').addEventListener('click',function(){ SOM.init(); SOM.setLigado(!SOM.ligado); pintaSfx(); if(SOM.ligado) SOM.fx('clique'); });
  $('btnPause').addEventListener('click',function(){ SOM.init(); if(menuAberto){ fechaMenu(); JOGO.pausa(false); } else pausa(); });
  botaoToque('tLeft','left'); botaoToque('tRight','right'); botaoToque('tJump','jump');
  $('tAct').addEventListener('pointerdown',function(e){ e.preventDefault(); SOM.init(); JOGO.confirmar(); });
  var cv=$('game');
  cv.addEventListener('pointerdown',function(e){ SOM.init(); document.body.classList.remove('kbd'); if(menuAberto||qAberta) return; JOGO.toque(e.clientX,e.clientY); });
  window.addEventListener('keydown',keydown); window.addEventListener('keyup',keyup);
  window.addEventListener('blur',function(){ var i=JOGO.J.in; i.left=i.right=i.jump=false; });
  document.addEventListener('touchmove',function(e){ e.preventDefault(); },{passive:false});
  modoNivel(false);
  JOGO.init();
  if(JOGO.J.estado==='mapa') modoMapa(true);
  /* gancho de teste (QA automatizado, sem som) */
  window.__lp3={J:JOGO.J, JOGO:JOGO, UI:UI, responder:function(certa){ if(!qAberta) return false; var i=certa?qAberta.certa():(qAberta.certa()+1)%3; qAberta.responderIdx(i); return true; }, continuar:function(){ if(qAberta) qAberta.continuar(); }, menuAberto:function(){ return !!menuAberto; }, perguntaAberta:function(){ return !!qAberta; }, clicaPri:function(){ var p=$('mcard').querySelector('.mbtn.pri'); if(p) p.click(); }};
}
document.addEventListener('DOMContentLoaded',init);

return {hud:hud, toast:toast, pergunta:pergunta, fimFase:fimFase, creditos:creditos, pausa:pausa, modoNivel:modoNivel, modoMapa:modoMapa, menu:menu, fechaMenu:fechaMenu};
})();
