/* ============================================================
   LP3_jornada_som.js — efeitos sonoros sintetizados (WebAudio) e
   a ponte para a música (LP3_jornada_musica.js). O contexto só
   nasce no primeiro gesto do usuário e tudo vive em try/catch:
   sem AudioContext (QA mudo) o jogo roda igual, em silêncio.

   API:  SOM.init()                    no primeiro gesto
         SOM.fx('pulo')                efeitos
         SOM.musica('floresta')        troca a trilha ('' = para), com fade
         SOM.sfx / SOM.setSfx(bool)    efeitos   (localStorage lp3_sfx)
         SOM.mus / SOM.setMus(bool)    música    (localStorage lp3_musica)
   ============================================================ */
window.SOM = (function(){
'use strict';
var ctx=null, master=null, fxGain=null, ok=false, tentou=false;
var S={sfx:true, mus:true, cena:''};
try{ S.sfx = localStorage.getItem('lp3_sfx')!=='0'; S.mus = localStorage.getItem('lp3_musica')!=='0'; }catch(e){}

function init(){
  if(tentou){ if(ctx&&ctx.state==='suspended'){ try{ ctx.resume(); }catch(e){} } return ok; }
  tentou=true;
  try{
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return false;
    ctx=new AC();
    master=ctx.createGain(); master.gain.value=1; master.connect(ctx.destination);
    fxGain=ctx.createGain(); fxGain.gain.value=S.sfx?.9:0; fxGain.connect(master);
    ok=true;
    if(ctx.state==='suspended'){ try{ ctx.resume(); }catch(e){} }
    if(window.MUSICA){ MUSICA.ligar(ctx,master); MUSICA.setGanho(.42); MUSICA.setLigada(S.mus); if(S.cena) MUSICA.toca(S.cena); }
  }catch(e){ ok=false; ctx=null; }
  return ok;
}
function setSfx(v){ S.sfx=!!v; try{ localStorage.setItem('lp3_sfx',S.sfx?'1':'0'); }catch(e){} if(fxGain){ try{ fxGain.gain.setTargetAtTime(S.sfx?.9:0,ctx.currentTime,.02); }catch(e){} } }
function setMus(v){ S.mus=!!v; try{ localStorage.setItem('lp3_musica',S.mus?'1':'0'); }catch(e){} if(ok&&window.MUSICA){ try{ MUSICA.setLigada(S.mus); }catch(e){} } }

/* ---------- blocos básicos (timbres macios: filtrados, envelope) ---------- */
function tom(freq,t0,dur,tipo,vol,slideTo,corte){
  if(!ok) return;
  try{
    var o=ctx.createOscillator(), g=ctx.createGain(), f=ctx.createBiquadFilter();
    o.type=tipo||'sine'; o.frequency.setValueAtTime(freq,t0); if(slideTo) o.frequency.exponentialRampToValueAtTime(slideTo,t0+dur);
    f.type='lowpass'; f.frequency.value=corte||2800;
    g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(vol||.2,t0+.012); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    o.connect(f); f.connect(g); g.connect(fxGain); o.start(t0); o.stop(t0+dur+.03);
  }catch(e){}
}
function ruido(t0,dur,vol,hp,bp){
  if(!ok) return;
  try{
    var n=Math.floor(ctx.sampleRate*dur), buf=ctx.createBuffer(1,n,ctx.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
    var src=ctx.createBufferSource(); src.buffer=buf;
    var f=ctx.createBiquadFilter(); f.type=bp?'bandpass':(hp?'highpass':'lowpass'); f.frequency.value=bp||hp||900;
    var g=ctx.createGain(); g.gain.value=vol||.2;
    src.connect(f); f.connect(g); g.connect(fxGain); src.start(t0);
  }catch(e){}
}
function arpejo(notas,t0,passo,dur,tipo,vol){ for(var i=0;i<notas.length;i++) tom(notas[i],t0+i*passo,dur,tipo||'triangle',vol||.12); }

/* ---------- efeitos ---------- */
var FX={
  pulo:      function(t){ tom(320,t,.16,'triangle',.1,640); },
  aterra:    function(t){ ruido(t,.08,.08); tom(140,t,.08,'sine',.08,90); },
  plim:      function(t){ tom(880,t,.07,'triangle',.14); tom(1320,t+.06,.18,'triangle',.14); },
  moeda:     function(t){ tom(1175,t,.06,'triangle',.12); tom(1568,t+.05,.22,'triangle',.12); },
  moedaG:    function(t){ arpejo([784,988,1175,1568],t,.05,.3,'triangle',.12); },
  tijolo:    function(t){ ruido(t,.14,.18,null,900); tom(220,t,.1,'triangle',.1,120); },
  mola:      function(t){ tom(200,t,.25,'triangle',.14,900); },
  cano:      function(t){ tom(400,t,.45,'triangle',.14,120); ruido(t,.3,.08,null,500); },
  acerto:    function(t){ arpejo([523,659,784,1047],t,.09,.2,'triangle',.12); tom(1047,t+.4,.4,'triangle',.14); tom(1319,t+.4,.4,'sine',.1); tom(1568,t+.55,.55,'triangle',.12); },
  erro:      function(t){ tom(240,t,.35,'triangle',.16,120); tom(180,t+.3,.45,'triangle',.14,80); },
  arremesso: function(t){ tom(700,t,.9,'sine',.14,180); tom(1400,t,.9,'triangle',.05,360); ruido(t,.25,.08,2000); },
  checkpoint:function(t){ arpejo([659,784,988,1319],t,.07,.22,'triangle',.12); },
  chefao:    function(t){ ruido(t,.3,.22); tom(120,t,.4,'triangle',.2,50); },
  risada:    function(t){ var f=[260,230,200,180]; for(var i=0;i<4;i++) tom(f[i],t+i*.14,.12,'sawtooth',.07,f[i]*.8,900); },
  vitoria:   function(t){ var n=[523,523,523,659,784,659,784,1047], d=[.12,.12,.12,.3,.12,.12,.12,.6], tt=t; for(var i=0;i<n.length;i++){ tom(n[i],tt,d[i],'triangle',.12); tom(n[i]/2,tt,d[i],'sine',.08); tt+=d[i]; } },
  pisao:     function(t){ ruido(t,.12,.15); tom(200,t,.12,'triangle',.12,80); },
  clique:    function(t){ tom(620,t,.05,'triangle',.07); },
  destrava:  function(t){ arpejo([392,523,659,784],t,.06,.28,'triangle',.11); tom(1568,t+.3,.5,'sine',.1); },
  tranca:    function(t){ tom(300,t,.12,'triangle',.12,220); tom(220,t+.14,.25,'triangle',.12,160); },
  folha:     function(t){ tom(500,t,.5,'sine',.12,1800); ruido(t,.2,.06,3000); },
  tonto:     function(t){ for(var i=0;i<5;i++) tom(400+Math.sin(i)*120,t+i*.1,.1,'sine',.07); },
  quebra:    function(t){ ruido(t,.2,.2,2500); arpejo([1800,1400,1100],t,.04,.12,'sine',.08); },
  iris:      function(t){ tom(300,t,.5,'sine',.08,900); },
  estrela:   function(t){ arpejo([1047,1319,1568,2093],t,.08,.35,'sine',.1); }
};
function fx(nome){ if(!ok||!S.sfx) return; var f=FX[nome]; if(!f) return; try{ f(ctx.currentTime+.005); }catch(e){} }

/* ---------- música ---------- */
function musica(cena){ cena=cena||''; S.cena=cena; if(ok&&window.MUSICA){ try{ MUSICA.toca(cena); }catch(e){} } }

return {init:init, fx:fx, musica:musica, setSfx:setSfx, setMus:setMus,
  get sfx(){ return S.sfx; }, get mus(){ return S.mus; }, get pronto(){ return ok; }, get cena(){ return S.cena; }};
})();
