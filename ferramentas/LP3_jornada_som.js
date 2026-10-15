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
    if(window.MUSICA){ MUSICA.ligar(ctx,master); MUSICA.setGanho(.22); MUSICA.setLigada(S.mus); if(S.cena) MUSICA.toca(S.cena); }
    if(ambNome){ var an=ambNome; ambNome='#'; ambiente(an); }
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

/* corrida e ambiente (15/10, Paulo: "sem música, então mais sons imersivos que não encham a paciência") */
FX.ultrapassa=function(t){ varre(t,.5,.07,600,2400); };
FX.turbo=function(t){ varre(t,.9,.09,300,1800); tom(180,t,.8,'sawtooth',.04,420,900); };
FX.faisca=function(t){ tom(1568,t,.08,'sine',.08); tom(2093,t+.06,.16,'sine',.07); };
FX.rampa=function(t){ tom(260,t,.35,'triangle',.08,620); varre(t+.1,.9,.05,500,1400); };
FX.aterraCarro=function(t){ ruido(t,.12,.07,null,300); tom(110,t,.12,'sine',.08,70); };
FX.splash=function(t){ ruido(t,.35,.07,null,900); tom(700,t,.25,'sine',.04,300); };
FX.chave=function(t){ for(var i=0;i<3;i++){ ruido(t+i*.11,.07,.06,2600); } }; /* pistola pneumática da equipe */
FX.torcida=function(t){ varre(t,1.6,.08,900,1300,true); };
FX.desvio=function(t){ tom(520,t,.12,'triangle',.06); tom(660,t+.1,.16,'triangle',.06); };
/* ruído com envelope que sobe e desce e filtro que varre (vento de ultrapassagem, torcida) */
function varre(t0,dur,vol,f0,f1,bp){
  if(!ok) return;
  try{ var n=Math.floor(ctx.sampleRate*dur), buf=ctx.createBuffer(1,n,ctx.sampleRate), d=buf.getChannelData(0); for(var i=0;i<n;i++) d[i]=Math.random()*2-1;
    var src=ctx.createBufferSource(); src.buffer=buf; var f=ctx.createBiquadFilter(); f.type='bandpass'; f.Q.value=bp?.6:1.2; f.frequency.setValueAtTime(f0,t0); f.frequency.exponentialRampToValueAtTime(f1,t0+dur);
    var g=ctx.createGain(); g.gain.setValueAtTime(.0001,t0); g.gain.linearRampToValueAtTime(vol,t0+dur*.4); g.gain.linearRampToValueAtTime(.0001,t0+dur);
    src.connect(f); f.connect(g); g.connect(fxGain); src.start(t0); }catch(e){}
}
/* ---------- motor do carrinho (contínuo, baixinho) ---------- */
var mot=null;
function motor(v){ /* v: 0..1.6 velocidade; <0 desliga */
  if(!ok) return;
  try{
    if(v<0){ if(mot){ mot.g.gain.setTargetAtTime(0,ctx.currentTime,.08); } return; }
    if(!mot){ mot={}; mot.o1=ctx.createOscillator(); mot.o2=ctx.createOscillator(); mot.o3=ctx.createOscillator(); mot.o1.type='sawtooth'; mot.o2.type='sawtooth'; mot.o3.type='sine';
      mot.f=ctx.createBiquadFilter(); mot.f.type='lowpass'; mot.f.frequency.value=320; mot.g=ctx.createGain(); mot.g.gain.value=0;
      mot.o1.connect(mot.f); mot.o2.connect(mot.f); mot.o3.connect(mot.f); mot.f.connect(mot.g); mot.g.connect(fxGain); mot.o1.start(); mot.o2.start(); mot.o3.start(); }
    var now=ctx.currentTime, hz=48+v*82;
    mot.o1.frequency.setTargetAtTime(hz,now,.12); mot.o2.frequency.setTargetAtTime(hz*1.012,now,.12); mot.o3.frequency.setTargetAtTime(hz/2,now,.12);
    mot.f.frequency.setTargetAtTime(260+v*420,now,.15); mot.g.gain.setTargetAtTime(.022+Math.min(1.6,v)*.012,now,.15);
  }catch(e){}
}
/* ---------- ambiente por cenário: um "chão" de ruído filtrado + detalhes esparsos ---------- */
var AMB={
  campo:   {tipo:'lowpass',f:500, vol:.018, lfo:0,   det:'passaro', cada:[3,7]},
  floresta:{tipo:'lowpass',f:420, vol:.022, lfo:0,   det:'passaro', cada:[1.8,4.5]},
  mar:     {tipo:'lowpass',f:380, vol:.05,  lfo:.11, det:'bolha',   cada:[2.5,6]},
  vento:   {tipo:'bandpass',f:650,vol:.035, lfo:.17, det:null},
  ginasio: {tipo:'bandpass',f:900,vol:.012, lfo:0,   det:'tenis',   cada:[4,9]},
  torcida: {tipo:'bandpass',f:1100,vol:.026,lfo:.07, det:null},
  cozinha: {tipo:'lowpass',f:500, vol:.014, lfo:0,   det:'tilim',   cada:[4,8]},
  castelo: {tipo:'lowpass',f:240, vol:.03,  lfo:.06, det:'gota',    cada:[3,7]}
};
var amb=null, ambNome='', ambExtra=0;
function ambiente(nome){
  nome=nome||''; if(nome===ambNome&&(amb||!ok)) return; ambNome=nome; if(!ok) return;
  try{
    if(amb){ var velho=amb; velho.g.gain.setTargetAtTime(0,ctx.currentTime,.4); setTimeout(function(){ try{ velho.src.stop(); if(velho.lfo) velho.lfo.stop(); }catch(e){} },2500); amb=null; }
    var A=AMB[ambNome]; if(!A) return;
    var n=ctx.sampleRate*3, buf=ctx.createBuffer(1,n,ctx.sampleRate), d=buf.getChannelData(0), last=0; for(var i=0;i<n;i++){ last=last*.6+(Math.random()*2-1)*.4; d[i]=last; }
    var src=ctx.createBufferSource(); src.buffer=buf; src.loop=true; var f=ctx.createBiquadFilter(); f.type=A.tipo; f.frequency.value=A.f; f.Q.value=.5;
    var g=ctx.createGain(); g.gain.value=0; g.gain.setTargetAtTime(A.vol,ctx.currentTime,.8);
    src.connect(f); f.connect(g); g.connect(fxGain); src.start();
    var lfo=null; if(A.lfo){ lfo=ctx.createOscillator(); lfo.frequency.value=A.lfo; var lg=ctx.createGain(); lg.gain.value=A.vol*.6; lfo.connect(lg); lg.connect(g.gain); lfo.start(); }
    amb={src:src,g:g,lfo:lfo,A:A,prox:ctx.currentTime+2};
  }catch(e){}
}
function ambVolume(k){ ambExtra=k; if(amb&&ok){ try{ amb.g.gain.setTargetAtTime(amb.A.vol*(1+k*2),ctx.currentTime,.5); }catch(e){} } }
var DET={
  passaro:function(t){ var b=1800+Math.random()*1400, n=2+Math.floor(Math.random()*3); for(var i=0;i<n;i++) tom(b+i*120,t+i*.13,.09,'sine',.025,b*1.25); },
  bolha:function(t){ var b=300+Math.random()*300; tom(b,t,.12,'sine',.03,b*2.2); },
  tenis:function(t){ tom(2200,t,.07,'triangle',.012,2900); },
  tilim:function(t){ tom(2637,t,.25,'sine',.018); },
  gota:function(t){ tom(1400,t,.09,'sine',.022,620); }
};
setInterval(function(){ if(!ok||!amb||!S.sfx||!amb.A.det) return; try{ var now=ctx.currentTime; if(now<amb.prox) return; var c=amb.A.cada; amb.prox=now+c[0]+Math.random()*(c[1]-c[0]); DET[amb.A.det](now+.02); }catch(e){} },400);

/* ---------- música ---------- */
function musica(cena){ cena=cena||''; S.cena=cena; if(ok&&window.MUSICA){ try{ MUSICA.toca(cena); }catch(e){} } }

return {init:init, fx:fx, musica:musica, setSfx:setSfx, setMus:setMus, motor:motor, ambiente:ambiente, ambVolume:ambVolume,
  get sfx(){ return S.sfx; }, get mus(){ return S.mus; }, get pronto(){ return ok; }, get cena(){ return S.cena; }};
})();
