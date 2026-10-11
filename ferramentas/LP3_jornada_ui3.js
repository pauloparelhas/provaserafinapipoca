/* ============================================================
   LP3_jornada_ui3.js — camada DOM (parte 3): o CARTÃO DO CONTEÚDO
   no mapa (o que se estuda na fase, regra + exemplos, botão Jogar),
   o cartão da regra no início da fase, o botão de AJUDA "?" e o
   CADEADO de tela cheia (travar = 1 toque; destravar = segurar 2 s,
   depois confirmar no overlay do serafina-core).
   ============================================================ */
(function(U){
'use strict';
var $=function(id){ return document.getElementById(id); };

/* ---------- cartão do mapa ---------- */
function cartaoMapa(f){
  var d=$('mapCard'); if(!d) return;
  if(!f){ d.classList.remove('show'); return; }
  var n=0, q=0; if(f.treino){ n=1; q=5; } else if(f.chefao){ n=4; q=8; } else { var mp=window.MAPAS&&MAPAS[f.id]; var rows=(mp?mp.main:NIVEIS.grade(FASES.SEQ[f.id])).join(''), sub=(mp?mp.sub:NIVEIS.SUBS[f.sub]||[]).join(''); var ns=(rows.match(/[?D]/g)||[]).length+(sub.match(/[?D]/g)||[]).length, nm=(rows.match(/M/g)||[]).length+(sub.match(/M/g)||[]).length; n=ns+nm; q=(ns+nm)*4; }
  var h='<div class="mcTop"><div class="mcNome"><b>'+U.esc(f.nome)+'</b> · '+U.esc(f.lugar)+(f.ideia?' <small>· '+U.esc(f.ideia)+'</small>':'')+'</div><div class="mcN">'+n+' arena'+(n>1?'s':'')+' · '+q+' perguntas</div><button class="mbtn pri" id="mcJogar">Jogar</button></div>';
  h+='<div class="mcRegras">'+(window.REGRAS?REGRAS.cartaoFase(f,true):'')+'</div>';
  d.innerHTML=h; d.classList.add('show');
  $('mcJogar').addEventListener('click',function(){ SOM.init(); JOGO.confirmar(); });
}
/* ---------- cartão da regra no início da fase ---------- */
function cartaoRegra(f,cb){
  var h='<h2>'+U.esc(f.nome)+' — o que vamos treinar</h2><div class="rgwrap">'+(window.REGRAS?REGRAS.cartaoFase(f,false):'')+'</div><button class="mbtn pri" id="mOk">Vamos!</button>';
  U.menu(h,{mOk:function(){ U.fechaMenu(); if(cb) cb(); }},'regra');
}

/* ---------- cadeado / tela cheia ---------- */
var segurando=null, barra=null;
function pintaLock(){ var b=$('btnLock'); if(!b) return; b.classList.toggle('on',!!window.screenLocked); b.title=window.screenLocked?'Travado — segure 2 s para destravar':'Tela cheia e travar'; document.body.classList.toggle('locked',!!window.screenLocked); }
function initLock(){
  var b=$('btnLock'); if(!b) return;
  b.addEventListener('click',function(){ SOM.init(); if(!window.screenLocked){ try{ doLock(); }catch(e){} SOM.fx('tranca'); U.toast('Tela travada. Para destravar, segure o cadeado por 2 segundos.',3000); pintaLock(); } });
  function comeca(e){ if(!window.screenLocked) return; e.preventDefault(); b.classList.add('hold'); segurando=setTimeout(function(){ b.classList.remove('hold'); try{ $('unlockov').classList.add('show'); }catch(x){} },2000); }
  function solta(){ clearTimeout(segurando); b.classList.remove('hold'); }
  b.addEventListener('pointerdown',comeca); b.addEventListener('pointerup',solta); b.addEventListener('pointerleave',solta); b.addEventListener('pointercancel',solta);
  /* saiu do fullscreen (Esc) com o cadeado ligado: volta no próximo toque */
  document.addEventListener('pointerdown',function(){ if(window.screenLocked && !document.fullscreenElement){ var el=document.documentElement; if(el.requestFullscreen){ try{ el.requestFullscreen().catch(function(){}); }catch(e){} } } },true);
  document.addEventListener('fullscreenchange',pintaLock);
  var ov=$('unlockov'); if(ov){ ov.addEventListener('click',function(){ setTimeout(pintaLock,50); }); }
  pintaLock();
}
function initAjuda(){ var b=$('btnHelp'); if(!b) return; b.addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); if(U.menuAberto()) return; var J=JOGO.J, pausar=(J.estado==='nivel'||J.estado==='arena'); if(pausar) JOGO.pausa(true); U.comoJogar(function(){ if(pausar) JOGO.pausa(false); }); }); }

U.cartaoMapa=cartaoMapa; U.cartaoRegra=cartaoRegra; U.initLock=initLock; U.initAjuda=initAjuda; U.pintaLock=pintaLock;
})(window.UI);
