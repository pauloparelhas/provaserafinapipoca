/* ============================================================
   LP3_jornada_som.js — todo o som do jogo é SINTETIZADO (WebAudio).
   Nenhum arquivo de áudio. O contexto só nasce no primeiro toque
   (regra do navegador) e tudo vive dentro de try/catch: sem
   AudioContext (QA mudo), o jogo roda igual, só em silêncio.

   API:  SOM.init()            chama no primeiro gesto do usuário
         SOM.fx('pulo')        efeitos: pulo, plim, moeda, acerto, erro,
                               arremesso, checkpoint, chefao, risada,
                               vitoria, pisao, clique, destrava, folha
         SOM.musica('floresta')  troca o loop de fundo ('' = para)
         SOM.ligado / SOM.setLigado(bool)   salvo em localStorage lp3_sfx
   ============================================================ */
window.SOM = (function(){
'use strict';
var ctx=null, master=null, musGain=null, ok=false, tentou=false;
var S={ligado:true, musicaAtual:''};
try{ S.ligado = localStorage.getItem('lp3_sfx')!=='0'; }catch(e){}

function init(){
  if(tentou) { if(ctx&&ctx.state==='suspended'){try{ctx.resume();}catch(e){}} return ok; }
  tentou=true;
  try{
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC) return false;
    ctx=new AC();
    master=ctx.createGain(); master.gain.value=S.ligado?1:0; master.connect(ctx.destination);
    musGain=ctx.createGain(); musGain.gain.value=.22; musGain.connect(master);
    ok=true;
    if(ctx.state==='suspended'){try{ctx.resume();}catch(e){}}
    if(S.musicaAtual) startMusic(S.musicaAtual);
  }catch(e){ ok=false; ctx=null; }
  return ok;
}
function setLigado(v){
  S.ligado=!!v;
  try{ localStorage.setItem('lp3_sfx',S.ligado?'1':'0'); }catch(e){}
  if(master){ try{ master.gain.setTargetAtTime(S.ligado?1:0, ctx.currentTime, .02); }catch(e){} }
}

/* ---------- blocos básicos ---------- */
function tom(freq, t0, dur, tipo, vol, slideTo){
  if(!ok) return;
  try{
    var o=ctx.createOscillator(), g=ctx.createGain();
    o.type=tipo||'sine'; o.frequency.setValueAtTime(freq, t0);
    if(slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0+dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol||.2, t0+.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0+dur+.02);
  }catch(e){}
}
function ruido(t0, dur, vol, hp){
  if(!ok) return;
  try{
    var n=Math.floor(ctx.sampleRate*dur), buf=ctx.createBuffer(1,n,ctx.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
    var src=ctx.createBufferSource(); src.buffer=buf;
    var f=ctx.createBiquadFilter(); f.type=hp?'highpass':'lowpass'; f.frequency.value=hp||900;
    var g=ctx.createGain(); g.gain.value=vol||.2;
    src.connect(f); f.connect(g); g.connect(master); src.start(t0);
  }catch(e){}
}

/* ---------- efeitos ---------- */
var FX={
  pulo:function(t){ tom(300,t,.18,'square',.08,620); },
  plim:function(t){ tom(880,t,.08,'square',.12); tom(1320,t+.07,.16,'square',.12); },
  moeda:function(t){ tom(988,t,.07,'square',.1); tom(1319,t+.06,.22,'square',.1); },
  acerto:function(t){
    var n=[523,659,784,1047]; for(var i=0;i<n.length;i++) tom(n[i],t+i*.09,.18,'square',.1);
    tom(1047,t+.4,.35,'triangle',.14); tom(1319,t+.4,.35,'triangle',.1); tom(1568,t+.55,.5,'triangle',.12);
  },
  erro:function(t){ tom(220,t,.35,'sawtooth',.14,110); tom(165,t+.3,.45,'sawtooth',.12,70); },
  arremesso:function(t){ tom(700,t,.9,'sine',.14,180); tom(1400,t,.9,'triangle',.05,360); ruido(t,.25,.08,2000); },
  checkpoint:function(t){ var n=[659,784,988,1319]; for(var i=0;i<n.length;i++) tom(n[i],t+i*.07,.2,'triangle',.12); },
  chefao:function(t){ ruido(t,.3,.25); tom(120,t,.4,'sawtooth',.18,50); tom(90,t+.1,.3,'square',.1,40); },
  risada:function(t){ var f=[260,230,200,180]; for(var i=0;i<4;i++) tom(f[i],t+i*.14,.12,'sawtooth',.1,f[i]*.8); },
  vitoria:function(t){
    var n=[523,523,523,659,784,659,784,1047]; var d=[.12,.12,.12,.3,.12,.12,.12,.6];
    var tt=t; for(var i=0;i<n.length;i++){ tom(n[i],tt,d[i],'square',.1); tom(n[i]/2,tt,d[i],'triangle',.08); tt+=d[i]; }
  },
  pisao:function(t){ ruido(t,.12,.15); tom(200,t,.12,'square',.1,80); },
  clique:function(t){ tom(600,t,.05,'square',.06); },
  destrava:function(t){ var n=[392,523,659,784]; for(var i=0;i<4;i++) tom(n[i],t+i*.06,.25,'triangle',.11); tom(1568,t+.3,.5,'sine',.1); },
  folha:function(t){ tom(500,t,.5,'sine',.12,1800); ruido(t,.2,.06,3000); },
  tonto:function(t){ for(var i=0;i<5;i++) tom(400+Math.sin(i)*120,t+i*.1,.1,'sine',.07); }
};
function fx(nome){
  if(!ok||!S.ligado) return;
  var f=FX[nome]; if(!f) return;
  try{ f(ctx.currentTime+.005); }catch(e){}
}

/* ---------- música de fundo (loop procedural, baixo volume) ---------- */
/* Cada cena: escala (frequências), padrão de baixo, bpm, timbre.
   O agendador roda um passo à frente (lookahead) com setTimeout. */
var MUS={
  mapa:     {bpm:92, lead:'triangle', esc:[392,440,494,587,659,784,880], baixo:[196,196,247,294], len:16},
  floresta: {bpm:104,lead:'triangle', esc:[523,587,659,784,880,1047],    baixo:[262,262,330,392], len:16},
  montanha: {bpm:96, lead:'square',   esc:[440,494,554,659,740,880],     baixo:[220,220,277,330], len:16},
  agua:     {bpm:100,lead:'sine',     esc:[494,554,622,740,831,988],     baixo:[247,247,311,370], len:16},
  gelo:     {bpm:88, lead:'triangle', esc:[587,659,740,880,988,1175],    baixo:[294,294,370,440], len:16},
  pradaria: {bpm:110,lead:'triangle', esc:[466,523,587,698,784,932],     baixo:[233,233,294,349], len:16},
  cidade:   {bpm:112,lead:'square',   esc:[523,622,698,784,932,1047],    baixo:[262,262,349,392], len:16},
  oficina:  {bpm:118,lead:'square',   esc:[440,523,587,659,784,880],     baixo:[220,220,262,330], len:16},
  mar:      {bpm:94, lead:'sine',     esc:[415,466,554,622,698,831],     baixo:[208,208,277,311], len:16},
  aurora:   {bpm:80, lead:'sine',     esc:[554,622,740,831,932,1109],    baixo:[277,277,370,415], len:16},
  chefao:   {bpm:126,lead:'sawtooth', esc:[330,349,415,440,494,523],     baixo:[165,165,175,208], len:16},
  final:    {bpm:108,lead:'triangle', esc:[523,659,784,880,1047,1319],   baixo:[262,330,392,440], len:16}
};
var mus={timer:null, passo:0, prox:0, cena:'', seq:[]};
function geraSeq(m){
  /* melodia pseudo-aleatória mas repetível por cena: anda pela escala em passos pequenos */
  var seq=[], idx=2, seed=0; for(var i=0;i<m.esc.length;i++) seed+=m.esc[i];
  for(var k=0;k<m.len;k++){
    seed=(seed*9301+49297)%233280; var r=seed/233280;
    idx+=r<.3?-1:(r<.6?1:(r<.75?0:2)); if(idx<0)idx=1; if(idx>=m.esc.length)idx=m.esc.length-2;
    seq.push(r<.15?0:m.esc[idx]);
  }
  return seq;
}
function agenda(){
  if(!ok||!mus.cena) return;
  var m=MUS[mus.cena]; if(!m) return;
  var dur=60/m.bpm/2; /* colcheia */
  try{
    while(mus.prox<ctx.currentTime+.4){
      var i=mus.passo%m.len, f=mus.seq[i];
      if(f){ tomMus(f,mus.prox,dur*.9,m.lead,.5); }
      if(i%4===0){ tomMus(m.baixo[(i/4)|0],mus.prox,dur*1.8,'triangle',.7); }
      if(i%2===0) hiMus(mus.prox, i%8===4?.5:.25);
      mus.prox+=dur; mus.passo++;
    }
  }catch(e){}
  mus.timer=setTimeout(agenda,120);
}
function tomMus(freq,t0,dur,tipo,vol){
  try{
    var o=ctx.createOscillator(), g=ctx.createGain();
    o.type=tipo; o.frequency.value=freq;
    g.gain.setValueAtTime(0.0001,t0); g.gain.exponentialRampToValueAtTime(vol*.35,t0+.02); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    o.connect(g); g.connect(musGain); o.start(t0); o.stop(t0+dur+.02);
  }catch(e){}
}
function hiMus(t0,vol){
  try{
    var n=Math.floor(ctx.sampleRate*.03), buf=ctx.createBuffer(1,n,ctx.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
    var src=ctx.createBufferSource(); src.buffer=buf;
    var f=ctx.createBiquadFilter(); f.type='highpass'; f.frequency.value=6000;
    var g=ctx.createGain(); g.gain.value=vol*.12;
    src.connect(f); f.connect(g); g.connect(musGain); src.start(t0);
  }catch(e){}
}
function startMusic(cena){
  stopMusic();
  var m=MUS[cena]; if(!m||!ok) return;
  mus.cena=cena; mus.seq=geraSeq(m); mus.passo=0;
  try{ mus.prox=ctx.currentTime+.05; }catch(e){ return; }
  agenda();
}
function stopMusic(){ if(mus.timer){clearTimeout(mus.timer);mus.timer=null;} mus.cena=''; }
function musica(cena){
  cena=cena||'';
  if(cena===S.musicaAtual && (!ok || mus.cena===cena)) return;
  S.musicaAtual=cena;
  if(!ok) return;
  if(!cena) stopMusic(); else startMusic(cena);
}

return {init:init, fx:fx, musica:musica, setLigado:setLigado,
  get ligado(){return S.ligado;}, get pronto(){return ok;}};
})();
