/* ============================================================
   SERAFINA CORE (JS) — casca kid compartilhada, todas as matérias.
   Starfield, lock/fullscreen, TTS say(), tradução (bandeira),
   fonte A+/A-, voltar ao menu. Substitui os blocos que antes
   eram duplicados inline em cada produto (licença da refatoração
   05/07: 1 bug = 1 correção, não 7).

   USO — no fim do <body>, ANTES do <script> do produto:
     <link rel="stylesheet" href="serafina-core.css">   (no <head>)
     <script>window.SERA_CFG={trKey:'cie2_tr',lang:'en-US'};</script>
     <script src="serafina-core.js"></script>

   CONTRATO DE DOM esperado (igual em todos os produtos):
     <canvas id="starfield">            fundo estrelado (opcional)
     <button id="lockbtn" class="lockbtn" onclick="toggleLock()">
     botão casa com class="sera-home" e onclick="goHome()"
     body.show-tr liga a tradução · body.locked = navegação travada
     #unlockov é INJETADO automaticamente se não existir.

   CONFIG (window.SERA_CFG — todas opcionais):
     trKey     chave localStorage p/ persistir tradução (null = não persiste)
     lang      idioma TTS: 'en-US' (padrão) ou 'pt-BR'
     rate      velocidade TTS (padrão .85)
     home      destino do botão casa (padrão '../index.html')
     homeMsg   mensagem de confirmação do botão casa
     stars     nº de estrelas (120) · starfield:false desliga
     unlock    false = não injeta o overlay de desbloqueio
   ============================================================ */
(function(){
'use strict';
var CFG=Object.assign({
  trKey:null, lang:'en-US', rate:.85,
  home:'../index.html',
  homeMsg:'Voltar ao menu do site? / Back to the menu?',
  stars:120, starfield:true, unlock:true,
  voicePrefs:null,          /* nomes de voz em ordem de preferencia (ver abaixo) */
  somKey:null               /* chave localStorage do mudo; null = nao persiste  */
}, window.SERA_CFG||{});

function $id(i){return document.getElementById(i);}

/* ============================================================
   VOZ — preferencia por NOME, nao "a primeira que aparecer".
   O bug: `voices.filter(pt-BR)[0]` pegava a "Microsoft Daniel",
   que e SAPI antiga e soa robotica — era ela que deixava a
   leitura chata. As vozes boas em pt-BR sao, em ordem:
     1. Thalita / Antonio  — neurais, mas SO existem no EDGE
     2. Google portugues do Brasil — natural, existe no CHROME
     3. Maria / Daniel — SAPI local, ultimo recurso
   Produto pt-BR herda essa lista sem configurar nada. Produto
   en-US (Ciencias) nao passa `voicePrefs` e cai no ramo antigo,
   byte-a-byte igual ao de antes.
   ============================================================ */
var VOZ_PT=['Thalita','Antonio','Antônio','Google portugu','Maria','Daniel'];
function escolheVoz(){
  var vs=[]; try{vs=speechSynthesis.getVoices()||[];}catch(e){return null;}
  if(!vs.length)return null;
  var ehPt=/^pt/i.test(CFG.lang);
  var prefs=CFG.voicePrefs||(ehPt?VOZ_PT:null);
  if(prefs){
    var doIdioma=vs.filter(function(v){return /pt[-_]BR/i.test(v.lang);});
    for(var i=0;i<prefs.length;i++){
      var achou=doIdioma.filter(function(v){
        return v.name.toLowerCase().indexOf(prefs[i].toLowerCase())>-1;})[0];
      if(achou)return achou;
    }
    if(doIdioma[0])return doIdioma[0];
  }
  var re=ehPt?/pt[-_]BR/i:/en[-_]US|English \(United States\)/i;
  return vs.filter(function(v){return re.test(v.lang+' '+v.name);})[0]||null;
}
window.vozAtual=function(){var v=escolheVoz();return v?v.name:'(nenhuma)';};

/* ---- mudo (o botao fica no produto; aqui so a mecanica) ---- */
window.somLigado=true;
try{ if(CFG.somKey&&localStorage.getItem(CFG.somKey)==='0') window.somLigado=false; }catch(e){}
function pintaBotaoSom(){
  var b=$id('sombtn'); if(!b)return;
  b.innerHTML=window.somLigado?'\uD83D\uDD0A':'\uD83D\uDD07';
  b.classList.toggle('off',!window.somLigado);
  b.setAttribute('aria-pressed',String(!window.somLigado));
  b.title=window.somLigado?'Desligar a voz':'Ligar a voz';
}
window.toggleSom=function(){
  window.somLigado=!window.somLigado;
  if(!window.somLigado){try{speechSynthesis.cancel();}catch(e){}}
  if(CFG.somKey){try{localStorage.setItem(CFG.somKey,window.somLigado?'1':'0');}catch(e){}}
  pintaBotaoSom();
};

/* ---- TTS ---- */
window.say=function(txt){
  if(!txt||!window.somLigado||!('speechSynthesis' in window))return;
  try{
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(String(txt));
    u.lang=CFG.lang; u.rate=CFG.rate;
    var v=escolheVoz();
    if(v)u.voice=v;
    speechSynthesis.speak(u);
  }catch(e){}
};

/* ---- tradução (bandeira) ---- */
window.toggleTr=function(){
  var on=document.body.classList.toggle('show-tr');
  if(CFG.trKey){try{localStorage.setItem(CFG.trKey,on?'1':'0');}catch(e){}}
};

/* ---- fonte A+/A- (via --fs) ---- */
var fsStep=0;
window.fs=function(d){
  fsStep=Math.max(-2,Math.min(3,fsStep+d));
  document.documentElement.style.setProperty('--fs',1+fsStep*0.12);
};

/* ---- voltar ao menu ---- */
window.goHome=function(){
  if(window.screenLocked)return;
  if(confirm(CFG.homeMsg))location.href=CFG.home;
};

/* ---- lock / fullscreen (anti saída acidental) ---- */
window.screenLocked=false;
window.toggleLock=function(){ if(!window.screenLocked) window.doLock(); else $id('unlockov').classList.add('show'); };
window.doLock=function(){
  window.screenLocked=true;
  var el=document.documentElement;
  if(el.requestFullscreen){try{el.requestFullscreen().catch(function(){});}catch(e){}}
  var b=$id('lockbtn'); if(b)b.classList.add('on');
  document.body.classList.add('locked');
  try{history.pushState({lock:1},'');}catch(e){}
};
window.doUnlock=function(){
  window.screenLocked=false;
  $id('unlockov').classList.remove('show');
  var b=$id('lockbtn'); if(b)b.classList.remove('on');
  document.body.classList.remove('locked');
  if(document.fullscreenElement&&document.exitFullscreen){try{document.exitFullscreen().catch(function(){});}catch(e){}}
};
window.cancelUnlock=function(){ $id('unlockov').classList.remove('show'); };
addEventListener('popstate',function(){ if(window.screenLocked){try{history.pushState({lock:1},'');}catch(e){}} });

/* overlay de desbloqueio: injetado se o produto não tiver o seu */
if(CFG.unlock && !$id('unlockov')){
  var d=document.createElement('div');
  d.className='unlockov'; d.id='unlockov';
  d.innerHTML='<div class="ulk-emo">&#128274;</div>'
   +'<h2>Desbloquear a tela?<small>Unlock the screen? &middot; ask a grown-up</small></h2>'
   +'<button class="ulk-yes" onclick="doUnlock()">&#128275; Desbloquear / Unlock</button>'
   +'<button class="ulk-no" onclick="cancelUnlock()">&#8617;&#65039; Continuar / Keep playing</button>';
  document.body.appendChild(d);
}

/* ---- starfield ---- */
if(CFG.starfield){(function(){
  var c=$id('starfield'); if(!c)return;
  var x=c.getContext('2d'),s=[];
  function rz(){c.width=innerWidth;c.height=innerHeight;s=[];for(var i=0;i<CFG.stars;i++)s.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.2,a:Math.random(),da:(Math.random()-.5)*.004,sp:Math.random()*.1+.02});}
  function d(){x.clearRect(0,0,c.width,c.height);s.forEach(function(t){t.y-=t.sp;if(t.y<-5)t.y=c.height+5;t.a+=t.da;if(t.a>1||t.a<.1)t.da*=-1;x.save();x.globalAlpha=t.a;x.fillStyle='#fff';x.beginPath();x.arc(t.x,t.y,t.r,0,Math.PI*2);x.fill();x.restore();});requestAnimationFrame(d);}
  rz();addEventListener('resize',rz);d();
})();}

/* ---- restaura tradução persistida + aquece vozes TTS ---- */
if(CFG.trKey){try{if(localStorage.getItem(CFG.trKey)==='1')document.body.classList.add('show-tr');}catch(e){}}
if('speechSynthesis' in window){
  try{
    speechSynthesis.getVoices();
    /* a lista de vozes chega ASSINCRONA no Chrome: sem este listener a
       primeira fala da sessao sai com a voz errada (a robotica) */
    speechSynthesis.addEventListener('voiceschanged',function(){escolheVoz();});
  }catch(e){}
}
pintaBotaoSom();
document.addEventListener('DOMContentLoaded',pintaBotaoSom);
})();
