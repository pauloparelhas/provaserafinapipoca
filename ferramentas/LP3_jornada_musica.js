/* ============================================================
   LP3_jornada_musica.js — sequenciador WebAudio das partituras.
   Compila a notação compacta em eventos (puro, testável sem áudio)
   e agenda com lookahead. Timbres macios: osciladores filtrados
   com ADSR, eco por delay e reverb por convolução (impulso gerado),
   tudo em volume baixo sob os efeitos. Troca de cena com fade.

   API: MUSICA.compila(cena) → {eventos, loopSeg, compassos, bpm, minF, maxF}
        MUSICA.ligar(ctx, destino)   depois do 1º gesto do usuário
        MUSICA.toca(cena) / MUSICA.para() / MUSICA.setGanho(0..1)
   ============================================================ */
window.MUSICA = (function(){
'use strict';
var P=window.PARTITURAS, U=8; /* unidades (colcheias) por compasso */
var NOTAS={C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11};
function freq(semi){ return 440*Math.pow(2,(semi-57)/12); } /* semi: C0=0 … A4=57 */
function semiDe(nome){ var m=/^([A-G][#b]?)(-?\d)$/.exec(nome); if(!m) throw new Error('nota ruim: '+nome); return NOTAS[m[1]]+12*(parseInt(m[2],10)); }
function acorde(nome){
  var m=/^([A-G][#b]?)(m7|maj7|m|7|dim)?$/.exec(nome); if(!m) throw new Error('acorde ruim: '+nome);
  var r=NOTAS[m[1]], q=m[2]||'', t=[0,4,7];
  if(q==='m'||q==='m7'||q==='dim') t=[0,3,7]; if(q==='dim') t=[0,3,6];
  if(q==='7'||q==='m7') t.push(10); if(q==='maj7') t.push(11);
  return {raiz:r, tons:t};
}
/* uma frase "a:2 b . |" → lista de {u (início em unidades), d (duração), notas:[semi]} ; valida 8 por compasso */
function parseFrase(txt, erros, rot){
  var comp=txt.split('|'), ev=[], u=0;
  comp.forEach(function(cs,ci){
    var soma=0; cs.trim().split(/\s+/).filter(Boolean).forEach(function(tok){
      var p=tok.split(':'), d=p[1]?parseInt(p[1],10):1; soma+=d;
      if(p[0]!=='.'){ ev.push({u:u,d:d,notas:p[0].split('+').map(semiDe)}); }
      u+=d;
    });
    if(soma!==U && erros) erros.push(rot+' compasso '+(ci+1)+' soma '+soma);
  });
  return {ev:ev, compassos:comp.length};
}
/* acompanhamento gerado dos acordes */
var BAIXO={ passeio:[[0,0],[2,7],[4,0],[5,12],[6,7]], pulso:[[0,0],[3,0],[6,7]], rock:[[0,0],[1,0],[2,0],[3,0],[4,7],[5,7],[6,0],[7,0]] };
function geraAcomp(voz, acordes){
  var ev=[]; acordes.forEach(function(a,ci){
    var base=ci*U, tons=a.tons, raiz=a.raiz;
    if(voz.baixo){ BAIXO[voz.baixo].forEach(function(p){ ev.push({u:base+p[0],d:voz.baixo==='rock'?1:1.6,notas:[raiz+24+p[1]]}); }); }
    if(voz.pad){ ev.push({u:base,d:U,notas:tons.map(function(t){ return raiz+36+t; })}); }
    if(voz.arp){ var seq= voz.arp==='sobe'? [0,1,2,3,0,1,2,3] : [0,1,2,1,0,1,2,1]; var oit=[0,0,0,12,0,0,0,12];
      for(var k=0;k<U;k++){ var idx=seq[k], t=tons[idx%tons.length]+(idx>=tons.length?12:0); ev.push({u:base+k,d:1.2,notas:[raiz+48+t+oit[k]*0]}); } }
  });
  return ev;
}
function compilaPeca(nomePeca, tr, lead){
  var peca=P.PECAS[nomePeca]; if(!peca) throw new Error('peça? '+nomePeca);
  var erros=[], acordes=peca.prog.replace(/\|/g,' ').trim().split(/\s+/).map(acorde);
  var nComp=acordes.length, eventos=[], minF=1e9, maxF=0;
  peca.vozes.forEach(function(voz,vi){
    var inst= (vi===0&&lead)?lead:voz.inst, vol=voz.vol||1, lista=[];
    if(voz.mel){ var u0=0; voz.mel.forEach(function(fr,fi){ var r=parseFrase(fr,erros,nomePeca+' voz'+vi+' frase'+fi); r.ev.forEach(function(e){ lista.push({u:e.u+u0,d:e.d,notas:e.notas}); }); u0+=r.compassos*U; });
      if(u0!==nComp*U) erros.push(nomePeca+' voz'+vi+' tem '+(u0/U)+' compassos, progressão tem '+nComp); }
    else if(voz.pat){ var toks=voz.pat.trim().split(/\s+/); for(var c=0;c<nComp;c++) for(var k=0;k<U;k++){ var tk=toks[k%toks.length]; if(tk!=='.') lista.push({u:c*U+k,d:.2,perc:tk}); } }
    else lista=geraAcomp(voz,acordes);
    if(voz.so){ /* só nas frases B (compassos 16-23) */ lista=lista.filter(function(e){ return e.u>=16*U&&e.u<24*U; }); }
    lista.forEach(function(e){ var o={u:e.u,d:e.d,inst:inst,vol:vol}; if(e.perc) o.perc=e.perc; else { o.f=e.notas.map(function(s){ var f=freq(s+(tr||0)); if(f<minF)minF=f; if(f>maxF)maxF=f; return f; }); } eventos.push(o); });
  });
  eventos.sort(function(a,b){ return a.u-b.u; });
  var unidade=60/peca.bpm/2;
  return {eventos:eventos, unidade:unidade, loopSeg:nComp*U*unidade, compassos:nComp, bpm:peca.bpm, minF:minF, maxF:maxF, erros:erros, nEventos:eventos.length};
}
function compila(cena){ var v=P.CENAS[cena]; if(!v) return null; var c=compilaPeca(v.peca,v.tr||0,v.lead); c.peca=v.peca; return c; }

/* ============================================================
   SÍNTESE
   ============================================================ */
var ctx=null, bus=null, fx=null, ganho=.5, ligada=true;
var INST={
  flauta: {onda:'triangle', vol:.34, att:.04, rel:.22, corte:2400, vib:4.5},
  oboe:   {onda:'sawtooth', vol:.16, att:.05, rel:.2,  corte:1300, vib:5},
  ocarina:{onda:'sine',     vol:.42, att:.05, rel:.3,  corte:3000, vib:4, oit2:.15},
  sino:   {onda:'sine',     vol:.36, att:.004,rel:.9,  corte:5000, dec:.5, oit2:.35, oit3:.12},
  tecla:  {onda:'triangle', vol:.3,  att:.004,rel:.5,  corte:2800, dec:.4, oit2:.2},
  harpa:  {onda:'triangle', vol:.2,  att:.004,rel:.45, corte:3200, dec:.35},
  baixo:  {onda:'triangle', vol:.4,  att:.01, rel:.12, corte:520},
  pad:    {onda:'sawtooth', vol:.055,att:.5,  rel:.7,  corte:800, des:7}
};
function impulso(seg){ var n=Math.floor(ctx.sampleRate*seg), b=ctx.createBuffer(2,n,ctx.sampleRate); for(var ch=0;ch<2;ch++){ var d=b.getChannelData(ch); for(var i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6); } return b; }
function ligar(c, destino){
  ctx=c; bus=ctx.createGain(); bus.gain.value=0;
  var lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=5200;
  var dl=ctx.createDelay(1); dl.delayTime.value=.27; var fb=ctx.createGain(); fb.gain.value=.26; var dm=ctx.createGain(); dm.gain.value=.18;
  var cv=ctx.createConvolver(); cv.buffer=impulso(1.4); var cm=ctx.createGain(); cm.gain.value=.22;
  bus.connect(lp); lp.connect(destino); lp.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(dm); dm.connect(destino); lp.connect(cv); cv.connect(cm); cm.connect(destino);
  fx={lp:lp};
  if(atual) comeca(atual);
}
function nota(e,t0){
  var I=INST[e.inst]||INST.flauta, dur=e.d*cur.unidade;
  e.f.forEach(function(f){
    var g=ctx.createGain(), flt=ctx.createBiquadFilter(); flt.type='lowpass'; flt.frequency.value=I.corte; flt.Q.value=.6;
    var pico=I.vol*e.vol, sus=I.dec?pico*.35:pico*.8;
    g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(pico,t0+I.att);
    if(I.dec) g.gain.setTargetAtTime(sus,t0+I.att,I.dec); else g.gain.setValueAtTime(sus,t0+Math.min(dur*.5,I.att+.1));
    var fim=t0+dur; g.gain.setValueAtTime(g.gain.value||sus,fim); g.gain.exponentialRampToValueAtTime(0.0001,fim+I.rel);
    g.connect(flt); flt.connect(bus);
    var oscs=[[f,1,0]]; if(I.oit2) oscs.push([f*2,I.oit2,0]); if(I.oit3) oscs.push([f*3,I.oit3,0]); if(I.des){ oscs=[[f,.5,-I.des],[f,.5,I.des]]; }
    oscs.forEach(function(o){ var osc=ctx.createOscillator(); osc.type=o[1]<1&&I.oit2?'sine':I.onda; osc.frequency.value=o[0]; osc.detune.value=o[2];
      var og=ctx.createGain(); og.gain.value=o[1]; osc.connect(og); og.connect(g);
      if(I.vib&&o[0]===f){ var lfo=ctx.createOscillator(), lg=ctx.createGain(); lfo.frequency.value=I.vib; lg.gain.value=f*.004; lfo.connect(lg); lg.connect(osc.frequency); lfo.start(t0); lfo.stop(fim+I.rel+.05); }
      osc.start(t0); osc.stop(fim+I.rel+.05); });
  });
}
var ruidoBuf=null;
function perc(e,t0){
  var v=.9*e.vol;
  if(e.perc==='K'){ var o=ctx.createOscillator(), g=ctx.createGain(); o.frequency.setValueAtTime(150,t0); o.frequency.exponentialRampToValueAtTime(42,t0+.18); g.gain.setValueAtTime(.5*v,t0); g.gain.exponentialRampToValueAtTime(0.0001,t0+.24); o.connect(g); g.connect(bus); o.start(t0); o.stop(t0+.26); return; }
  if(!ruidoBuf){ var n=Math.floor(ctx.sampleRate*.3); ruidoBuf=ctx.createBuffer(1,n,ctx.sampleRate); var d=ruidoBuf.getChannelData(0); for(var i=0;i<n;i++) d[i]=Math.random()*2-1; }
  var s=ctx.createBufferSource(); s.buffer=ruidoBuf; var f=ctx.createBiquadFilter(), g2=ctx.createGain();
  if(e.perc==='S'){ f.type='bandpass'; f.frequency.value=1700; f.Q.value=.8; g2.gain.setValueAtTime(.14*v,t0); g2.gain.exponentialRampToValueAtTime(0.0001,t0+.14); }
  else { f.type='highpass'; f.frequency.value=7500; g2.gain.setValueAtTime(.05*v,t0); g2.gain.exponentialRampToValueAtTime(0.0001,t0+.045); }
  s.connect(f); f.connect(g2); g2.connect(bus); s.start(t0); s.stop(t0+.2);
}

/* ---------- agendador ---------- */
var cur=null, atual='', timer=null, idx=0, t0Loop=0, fadeT=null;
function agenda(){
  if(!cur||!ctx) return;
  try{
    var agora=ctx.currentTime, horizonte=agora+.45;
    while(true){
      if(idx>=cur.eventos.length){ idx=0; t0Loop+=cur.loopSeg; }
      var e=cur.eventos[idx], t=t0Loop+e.u*cur.unidade;
      if(t>horizonte) break;
      if(t>=agora-.05){ if(e.perc) perc(e,t); else nota(e,t); }
      idx++;
    }
  }catch(x){}
  timer=setTimeout(agenda,110);
}
function comeca(cena){
  if(!ctx) return; cur=compila(cena); if(!cur) return;
  idx=0; t0Loop=ctx.currentTime+.12; clearTimeout(timer);
  bus.gain.cancelScheduledValues(ctx.currentTime); bus.gain.setValueAtTime(0.0001,ctx.currentTime); bus.gain.exponentialRampToValueAtTime(Math.max(.0001,ligada?ganho:.0001),ctx.currentTime+1.2);
  agenda();
}
function toca(cena){
  cena=cena||'';
  if(cena===atual) return;
  var antes=atual; atual=cena;
  if(!ctx) return;
  clearTimeout(fadeT);
  if(antes){ var t=ctx.currentTime; bus.gain.cancelScheduledValues(t); bus.gain.setValueAtTime(Math.max(.0001,bus.gain.value),t); bus.gain.exponentialRampToValueAtTime(.0001,t+.5); clearTimeout(timer); cur=null;
    fadeT=setTimeout(function(){ if(atual===cena&&cena) comeca(cena); },520); }
  else if(cena) comeca(cena);
}
function para(){ toca(''); }
function setGanho(v){ ganho=v; if(ctx&&cur&&ligada){ bus.gain.setTargetAtTime(ganho,ctx.currentTime,.1); } }
function setLigada(v){ ligada=!!v; if(ctx&&bus){ bus.gain.setTargetAtTime(ligada?ganho:.0001,ctx.currentTime,.15); } }

return {compila:compila, compilaPeca:compilaPeca, ligar:ligar, toca:toca, para:para, setGanho:setGanho, setLigada:setLigada, get atual(){ return atual; }, INST:INST};
})();
