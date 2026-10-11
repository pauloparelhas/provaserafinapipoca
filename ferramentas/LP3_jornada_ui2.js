/* ============================================================
   LP3_jornada_ui2.js — camada DOM (parte 2): tela de customização
   do urso (ícones grandes, preview ao vivo no canvas), botões do
   mapa (História, Como jogar, Visual, Recomeçar), teclado e toque,
   init e gancho de QA (window.__lp3).
   ============================================================ */
(function(U){
'use strict';
var $=function(id){ return document.getElementById(id); }, A=window.ARTE;

/* ---------- customização ---------- */
function swatch(cor){ return '<span class="sw" style="background:'+cor+'"></span>'; }
var ICO={
  mochila:{nenhuma:'<svg viewBox="0 0 40 40"><path d="M8 34 L32 34 M20 6v28" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".5"/></svg>', costas:'<svg viewBox="0 0 40 40"><rect x="9" y="10" width="22" height="26" rx="7" fill="#2563eb"/><rect x="13" y="16" width="14" height="9" rx="3" fill="#93c5fd"/><path d="M14 10v-4m12 4v-4" stroke="#1e3a8a" stroke-width="3"/></svg>', rodinhas:'<svg viewBox="0 0 40 40"><rect x="10" y="10" width="20" height="22" rx="5" fill="#16a34a"/><path d="M20 10V3" stroke="#14532d" stroke-width="3"/><circle cx="14" cy="35" r="3.5" fill="#111"/><circle cx="26" cy="35" r="3.5" fill="#111"/></svg>'},
  lancheira:{nao:'<svg viewBox="0 0 40 40"><path d="M10 30 L30 10" stroke="#fff" stroke-width="3" opacity=".5"/></svg>', sim:'<svg viewBox="0 0 40 40"><rect x="7" y="14" width="26" height="18" rx="4" fill="#f472b6"/><rect x="7" y="14" width="26" height="6" rx="3" fill="#be185d"/><path d="M15 14a5 5 0 0 1 10 0" fill="none" stroke="#be185d" stroke-width="3"/></svg>'},
  chapeu:{nenhum:'<svg viewBox="0 0 40 40"><circle cx="20" cy="22" r="11" fill="#3a3a44"/></svg>', bone:'<svg viewBox="0 0 40 40"><path d="M8 24a12 12 0 0 1 24 0z" fill="#dc2626"/><rect x="18" y="22" width="18" height="5" rx="2" fill="#dc2626"/></svg>', gorro:'<svg viewBox="0 0 40 40"><path d="M8 26a12 12 0 0 1 24 0z" fill="#2563eb"/><rect x="6" y="24" width="28" height="6" rx="3" fill="#fff"/><circle cx="21" cy="12" r="4" fill="#fff"/></svg>', coroa:'<svg viewBox="0 0 40 40"><path d="M8 30V14l6 6 6-10 6 10 6-6v16z" fill="#fbbf24"/><circle cx="20" cy="22" r="2.5" fill="#ef4444"/></svg>', laco:'<svg viewBox="0 0 40 40"><path d="M20 20 8 12v16zM20 20l12-8v16z" fill="#ec4899"/><circle cx="20" cy="20" r="4" fill="#be185d"/></svg>'},
  oculos:{nao:'<svg viewBox="0 0 40 40"><path d="M10 30 L30 10" stroke="#fff" stroke-width="3" opacity=".5"/></svg>', sim:'<svg viewBox="0 0 40 40"><circle cx="13" cy="21" r="7" fill="rgba(147,197,253,.5)" stroke="#1d4ed8" stroke-width="3"/><circle cx="27" cy="21" r="7" fill="rgba(147,197,253,.5)" stroke="#1d4ed8" stroke-width="3"/><path d="M20 21h0M4 18l2 2M36 18l-2 2" stroke="#1d4ed8" stroke-width="3"/></svg>'}
};
function customizar(cb){
  var L=A.LOOK, O=A.OPCOES;
  function linha(tit,chave,itens,render){ var h='<div class="crow"><div class="ctit">'+tit+'</div><div class="copts" data-k="'+chave+'">'; itens.forEach(function(v,i){ var ativo= chave==='uniforme'? L.uniforme===i : String(L[chave])===String(v); h+='<button class="copt'+(ativo?' on':'')+'" data-v="'+(chave==='uniforme'?i:v)+'" aria-label="'+tit+' '+v+'">'+render(v,i)+'</button>'; }); return h+'</div></div>'; }
  var h='<h2>Monte o seu urso</h2><div class="cwrap">';
  h+=linha('Uniforme','uniforme',O.uniforme,swatch);
  h+=linha('Mochila','mochila',O.mochila,function(v){ return ICO.mochila[v]; });
  h+=linha('Lancheira','lancheira',O.lancheira,function(v){ return ICO.lancheira[v]; });
  h+=linha('Chapéu','chapeu',O.chapeu,function(v){ return ICO.chapeu[v]; });
  h+=linha('Óculos','oculos',O.oculos,function(v){ return ICO.oculos[v]; });
  h+=linha('Cachecol','cachecol',O.cachecol,function(v){ return v==='nenhum'?'<span class="sw none"></span>':swatch(v); });
  h+='</div><button class="mbtn pri" id="mOk">Pronto! Vamos jogar</button>';
  U.menu(h,{mOk:function(){ U.fechaMenu(); cb(); }},'custom');
  [].slice.call($('mcard').querySelectorAll('.copt')).forEach(function(b){ b.addEventListener('click',function(){ SOM.init(); SOM.fx('plim'); var k=b.parentNode.getAttribute('data-k'), v=b.getAttribute('data-v'); L[k]= k==='uniforme'?parseInt(v,10):v; [].slice.call(b.parentNode.children).forEach(function(x){ x.classList.toggle('on',x===b); }); }); });
}

/* ---------- botões do mapa ---------- */
function montaMapBtns(){
  var d=document.createElement('div'); d.id='mapBtns';
  d.innerHTML='<button class="mb" id="mbHist">História</button><button class="mb" id="mbComo">Como jogar</button><button class="mb" id="mbVis">Visual do urso</button><button class="mb sec" id="mbRec">Recomeçar</button>';
  $('ui').appendChild(d);
  $('mbHist').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); U.historia(); });
  $('mbComo').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); U.comoJogar(); });
  $('mbVis').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); JOGO.abrirCustom(); });
  $('mbRec').addEventListener('click',function(){ SOM.init(); U.confirmaRecomecar(); });
}

/* ---------- teclado ---------- */
var mapaTeclas={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'jump',w:'jump',W:'jump',' ':'jump',ArrowDown:'down',s:'down',S:'down',x:'act',X:'act',Enter:'act'};
function keydown(e){
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  SOM.init(); document.body.classList.add('kbd');
  var k=e.key, J2=JOGO.J, q=U.qAberta(), m=U.menuAberto();
  if(k==='Escape'&&(J2.estado==='arena'||J2.estado==='pergunta')&&!J2.pausado){ e.preventDefault(); if(window.ARENA) ARENA.sairX(); return; }
  if(k==='Escape'){ e.preventDefault(); if(m){ if(J2.estado==='nivel'||J2.estado==='arena'||J2.estado==='cano'){ U.fechaMenu(); JOGO.pausa(false); } } else U.pausa(); return; }
  if(m){ if(k==='Enter'||k===' '){ var pri=$('mcard').querySelector('.mbtn.pri'); if(pri){ e.preventDefault(); pri.click(); } } return; }
  if(q){ e.preventDefault(); q.tecla(k); return; }
  if(J2.estado==='globo'||J2.estado==='mapa'){
    if(k==='Enter'||k===' '){ e.preventDefault(); JOGO.confirmar(); return; }
    if(J2.estado==='mapa'){ if(k==='ArrowRight'||k==='d'||k==='D'||k==='ArrowDown'||k==='s'||k==='S') JOGO.mapaMove(1); if(k==='ArrowLeft'||k==='a'||k==='A'||k==='ArrowUp'||k==='w'||k==='W') JOGO.mapaMove(-1); }
    return;
  }
  var ac=mapaTeclas[k]; if(ac){ e.preventDefault(); J2.in[ac]=true; }
}
function keyup(e){ var ac=mapaTeclas[e.key]; if(ac) JOGO.J.in[ac]=false; }

/* ---------- toque ---------- */
function botaoToque(id,ac){
  var b=$(id);
  function on(e){ e.preventDefault(); SOM.init(); document.body.classList.remove('kbd'); b.classList.add('on'); JOGO.J.in[ac]=true; try{ b.setPointerCapture(e.pointerId); }catch(x){} }
  function off(e){ e.preventDefault(); b.classList.remove('on'); JOGO.J.in[ac]=false; }
  b.addEventListener('pointerdown',on); b.addEventListener('pointerup',off); b.addEventListener('pointercancel',off); b.addEventListener('pointerleave',off);
  b.addEventListener('contextmenu',function(e){ e.preventDefault(); });
}

function init(){
  montaMapBtns();
  $('btnHome').innerHTML=U.SVG.casa; $('btnLock').innerHTML=U.SVG.cadeado; $('btnHelp').innerHTML=U.SVG.ajuda; $('btnPause').innerHTML=U.SVG.pausa;
  $('hudCoinIco').innerHTML=U.SVG.moeda; $('hudArenaIco').innerHTML=U.SVG.caixa; $('hudPtsIco').innerHTML=U.SVG.estrela;
  U.pintaBotoes();
  $('btnHome').addEventListener('click',function(){ SOM.init(); if(window.screenLocked) return; U.confirmaCasa(); });
  U.initLock(); U.initAjuda();
  $('btnSairArena').addEventListener('click',function(){ SOM.init(); if(window.ARENA) ARENA.sairX(); });
  $('btnPause').addEventListener('click',function(){ SOM.init(); if(U.menuAberto()){ U.fechaMenu(); JOGO.pausa(false); } else U.pausa(); });
  botaoToque('tLeft','left'); botaoToque('tRight','right'); botaoToque('tJump','jump'); botaoToque('tDown','down'); botaoToque('tAct','act');
  var cv=$('game');
  cv.addEventListener('pointerdown',function(e){ SOM.init(); if(e.pointerType==='touch') document.body.classList.remove('kbd'); if(U.menuAberto()||U.qAberta()) return; JOGO.toque(e.clientX,e.clientY); });
  cv.addEventListener('pointermove',function(e){ if(e.pointerType==='mouse'&&!U.menuAberto()){ var p=JOGO.paraLogico(e.clientX,e.clientY); JOGO.mapaHover(p.x,p.y); } });
  window.addEventListener('keydown',keydown); window.addEventListener('keyup',keyup);
  window.addEventListener('blur',function(){ var i=JOGO.J.in; i.left=i.right=i.jump=i.down=i.act=false; });
  document.addEventListener('touchmove',function(e){ e.preventDefault(); },{passive:false});
  U.modoNivel(false); U.modoMapa(false);
  JOGO.init();
  /* gancho de QA (automatizado, mudo) */
  window.__lp3={J:JOGO.J, JOGO:JOGO, UI:U, ARENA:window.ARENA, FASES:window.FASES,
    responder:function(certa){ var q=U.qAberta(); if(!q) return false; var i=certa?q.certa():(q.certa()+1)%2; q.responderIdx(i); return true; },
    continuar:function(){ var q=U.qAberta(); if(q){ var g=$('qGo'); if(g) g.click(); } },
    menuAberto:function(){ return !!U.menuAberto(); }, perguntaAberta:function(){ return !!U.qAberta(); },
    clicaPri:function(){ var p=$('mcard').querySelector('.mbtn.pri'); if(p) p.click(); },
    sairX:function(){ var b=$('btnSairArena'); if(b&&b.classList.contains('show')){ b.click(); return true; } return false; }};
}
U.customizar=customizar;
document.addEventListener('DOMContentLoaded',init);
})(window.UI);
