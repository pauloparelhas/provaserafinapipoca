/* ============================================================
   SERAFINA ELA-BASE.JS — Funcoes Compartilhadas ELA (Ingles)
   Importar APOS base.js em todas as ferramentas ELA.
   Contem: TTS/karaoke, speak-btn, tour, lock/sound, flag BR.

   HOOKS que cada ferramenta ELA define ANTES de chamar initEla():
   - var tourSteps = [{selector, title, text}, ...]
   - var TOUR_KEY  = 'ela01_tour_done'  (localStorage key)
   ============================================================ */

// ===== TTS / KARAOKE =====
var karaokeRate = 0.75;
var karaokeActive = false;
var soundEnabled = true;

// Preload voices
if ('speechSynthesis' in window) {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = function(){ speechSynthesis.getVoices(); };
}

function _getEnVoice(){
  var voices = speechSynthesis.getVoices();
  return voices.find(function(x){return x.lang.startsWith('en')&&x.name.includes('Female');})
    || voices.find(function(x){return x.lang.startsWith('en');});
}

function speakWithKaraoke(textEN, onEnd){
  if(!soundEnabled||!('speechSynthesis' in window)){if(onEnd)onEnd();return;}
  window.speechSynthesis.cancel();
  karaokeActive=true;
  var bar=document.getElementById('karaokeBar');
  var wordsDiv=document.getElementById('karaokeWords');
  var words=textEN.split(/\s+/);
  wordsDiv.innerHTML=words.map(function(w,i){return '<span class="kw" data-i="'+i+'">'+w+'</span>';}).join(' ');
  bar.style.display='flex';
  var spans=wordsDiv.querySelectorAll('.kw');
  var idx=0;
  var u=new SpeechSynthesisUtterance(textEN);
  u.lang='en-US'; u.rate=karaokeRate; u.pitch=1.1;
  var voice=_getEnVoice();
  if(voice) u.voice=voice;
  u.onboundary=function(e){
    if(e.name==='word'&&idx<spans.length){
      if(idx>0){spans[idx-1].classList.remove('kw-active');spans[idx-1].classList.add('kw-done');}
      spans[idx].classList.add('kw-active');
      idx++;
    }
  };
  u.onend=function(){
    if(!karaokeActive)return;
    spans.forEach(function(s){s.classList.remove('kw-active');s.classList.add('kw-done');});
    setTimeout(function(){bar.style.display='none';karaokeActive=false;if(onEnd)onEnd();},2500);
  };
  u.onerror=function(){bar.style.display='none';karaokeActive=false;if(onEnd)onEnd();};
  window.speechSynthesis.speak(u);
}

function stopKaraoke(){
  karaokeActive=false;window.speechSynthesis.cancel();
  var bar=document.getElementById('karaokeBar');
  if(bar)bar.style.display='none';
}

function setKSpeed(rate){
  karaokeRate=rate;
  document.querySelectorAll('.ks-btn').forEach(function(b){
    b.classList.toggle('active',parseFloat(b.dataset.rate)===rate);
  });
}

function speak(text, onEnd){
  if(!soundEnabled||!('speechSynthesis' in window)){if(onEnd)onEnd();return;}
  window.speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(text);
  u.lang='en-US'; u.rate=0.85; u.pitch=1.1;
  var voice=_getEnVoice();
  if(voice) u.voice=voice;
  if(onEnd) u.onend=onEnd;
  speechSynthesis.speak(u);
}

function makeSpeakBtn(text, size){
  var btn=document.createElement('button');
  btn.className='speak-btn';
  btn.innerHTML='\u{1F50A}';
  if(size){btn.style.width=size;btn.style.height=size;btn.style.fontSize=(parseInt(size)/2.5)+'px';}
  btn.onclick=function(e){
    e.stopPropagation();
    btn.classList.add('speaking');
    speakWithKaraoke(text,function(){btn.classList.remove('speaking');});
  };
  return btn;
}

// ===== SOUND TOGGLE =====
function toggleSound(){
  soundEnabled=!soundEnabled;
  var btn=document.getElementById('soundBtn');
  if(soundEnabled){
    btn.innerHTML='\u{1F50A}';
    btn.classList.remove('sound-off');
  } else {
    stopKaraoke();
    btn.innerHTML='\u{1F507}';
    btn.classList.add('sound-off');
  }
}

// ===== LOCK MODE =====
var lockActive=false;

function preventLeave(e){e.preventDefault();e.returnValue='';}

function toggleLock(){
  if(!lockActive){
    lockActive=true;
    document.body.classList.add('locked');
    var btn=document.getElementById('lockBtn');
    btn.innerHTML='\u{1F512}';
    btn.classList.add('lock-active');
    try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();}catch(e){}
    window.addEventListener('beforeunload',preventLeave);
  } else {
    document.getElementById('lockOverlay').classList.add('active');
  }
}

function unlockScreen(){
  lockActive=false;
  document.body.classList.remove('locked');
  var btn=document.getElementById('lockBtn');
  btn.innerHTML='\u{1F513}';
  btn.classList.remove('lock-active');
  document.getElementById('lockOverlay').classList.remove('active');
  window.removeEventListener('beforeunload',preventLeave);
  try{document.fullscreenElement&&document.exitFullscreen();}catch(e){}
}

// ===== BRAZIL FLAG TRANSLATION =====
var BR_FLAG='<svg viewBox="0 0 20 14" width="14" height="10" style="display:block"><rect fill="#009c3b" width="20" height="14" rx="2"/><polygon fill="#ffdf00" points="10,1.5 18,7 10,12.5 2,7"/><circle fill="#002776" cx="10" cy="7" r="3"/></svg>';

function initFlags(){
  document.querySelectorAll('[data-pt]').forEach(function(el){
    var pt=el.getAttribute('data-pt');
    if(!pt) return;
    var fcFace=el.closest('.fc-front')||el.closest('.fc-back');
    var target=fcFace||el;
    if(target.querySelector('.flag-pt')) return;
    var flag=document.createElement('span');
    flag.className='flag-pt';
    flag.innerHTML=BR_FLAG;
    flag.title='Tradu\u00e7\u00e3o';
    var label=document.createElement('div');
    label.className='pt-label';
    label.textContent=pt;
    flag.addEventListener('click',function(e){
      e.stopPropagation();
      e.preventDefault();
      label.classList.toggle('visible');
    });
    target.appendChild(flag);
    target.appendChild(label);
  });
}

// ===== PRODUCT TOUR =====
var tourIdx=0;

function startTour(){
  if(typeof tourSteps==='undefined'||!tourSteps.length) return;
  if(typeof TOUR_KEY!=='undefined'&&localStorage.getItem(TOUR_KEY)) return;
  tourIdx=0;
  showTourStep();
  var overlay=document.getElementById('tourOverlay');
  if(overlay) overlay.style.display='block';
}

function showTourStep(){
  var step=tourSteps[tourIdx];
  var el=step.selector?document.querySelector(step.selector):null;
  var bubble=document.getElementById('tourBubble');
  var spot=document.getElementById('tourSpotlight');
  document.getElementById('tourTitle').textContent=step.title;
  document.getElementById('tourText').textContent=step.text;
  var dotsEl=document.getElementById('tourDots');
  dotsEl.innerHTML='';
  tourSteps.forEach(function(_,i){
    var d=document.createElement('div');
    d.className='tour-dot'+(i===tourIdx?' active':(i<tourIdx?' done':''));
    dotsEl.appendChild(d);
  });
  document.getElementById('tourPrev').style.display=tourIdx===0?'none':'';
  document.getElementById('tourNext').textContent=(tourIdx===tourSteps.length-1)?'Conclu\u00edr \u2714':'Pr\u00f3ximo \u25B6';
  if(el){
    var r=el.getBoundingClientRect(),pad=10;
    spot.style.display='block';
    spot.style.left=(r.left-pad)+'px';spot.style.top=(r.top-pad)+'px';
    spot.style.width=(r.width+pad*2)+'px';spot.style.height=(r.height+pad*2)+'px';
    var bw=290,bh=180,bl=r.left,bt=r.bottom+14;
    if(bt+bh>window.innerHeight) bt=r.top-bh-14;
    if(bl+bw>window.innerWidth) bl=window.innerWidth-bw-12;
    if(bl<8) bl=8;
    bubble.style.top=bt+'px';bubble.style.left=bl+'px';bubble.style.transform='none';
  } else {
    spot.style.display='none';
    bubble.style.top='50%';bubble.style.left='50%';bubble.style.transform='translate(-50%,-50%)';
  }
}

function tourStep(dir){
  tourIdx+=dir;
  if(tourIdx>=tourSteps.length){skipTour();return;}
  if(tourIdx<0) tourIdx=0;
  showTourStep();
}

function skipTour(){
  var overlay=document.getElementById('tourOverlay');
  if(overlay) overlay.style.display='none';
  if(typeof TOUR_KEY!=='undefined') localStorage.setItem(TOUR_KEY,'1');
}

// ===== KARAOKE BAR HTML =====
function ensureKaraokeBar(){
  if(document.getElementById('karaokeBar')) return;
  var bar=document.createElement('div');
  bar.className='karaoke-bar';bar.id='karaokeBar';
  bar.innerHTML='<div class="karaoke-speed">'
    +'<button class="ks-btn" data-rate="0.6" onclick="setKSpeed(0.6)">\u{1F40C}</button>'
    +'<button class="ks-btn active" data-rate="0.75" onclick="setKSpeed(0.75)">\u{1F422}</button>'
    +'<button class="ks-btn" data-rate="0.9" onclick="setKSpeed(0.9)">\u{1F407}</button>'
    +'<button class="ks-btn" data-rate="1.1" onclick="setKSpeed(1.1)">\u{1F680}</button>'
    +'</div>'
    +'<div class="karaoke-words" id="karaokeWords"></div>';
  document.body.appendChild(bar);
}

// ===== TOUR OVERLAY HTML =====
function ensureTourOverlay(){
  if(document.getElementById('tourOverlay')) return;
  var ov=document.createElement('div');
  ov.id='tourOverlay';ov.style.display='none';
  ov.innerHTML='<div class="tour-bg" onclick="skipTour()"></div>'
    +'<div class="tour-spotlight" id="tourSpotlight"></div>'
    +'<div class="tour-bubble" id="tourBubble">'
    +'<div class="tour-bubble-title" id="tourTitle"></div>'
    +'<div class="tour-bubble-text" id="tourText"></div>'
    +'<div class="tour-bubble-nav">'
    +'<div class="tour-step-dots" id="tourDots"></div>'
    +'<button class="tour-btn" id="tourPrev" onclick="tourStep(-1)">\u25C0 Anterior</button>'
    +'<button class="tour-btn" id="tourNext" onclick="tourStep(1)">Pr\u00f3ximo \u25B6</button>'
    +'<button class="tour-btn-skip" onclick="skipTour()">Pular tour</button>'
    +'</div></div>';
  document.body.appendChild(ov);
}

// ===== LOCK OVERLAY HTML =====
function ensureLockOverlay(){
  if(document.getElementById('lockOverlay')) return;
  var ov=document.createElement('div');
  ov.className='lock-overlay';ov.id='lockOverlay';
  ov.innerHTML='<div class="lock-box">'
    +'<div class="lock-icon">\u{1F512}</div>'
    +'<div class="lock-title">Screen Locked</div>'
    +'<p style="margin:10px 0;font-weight:700;font-size:14px;color:var(--text-soft,rgba(255,255,255,.7))">Tap the button below to unlock</p>'
    +'<button class="btn-start" onclick="unlockScreen()" style="font-size:14px;padding:12px 28px">\u{1F513} Unlock</button>'
    +'</div>';
  document.body.appendChild(ov);
}

// ===== ELA INIT =====
function initEla(){
  ensureKaraokeBar();
  ensureTourOverlay();
  ensureLockOverlay();
  initFlags();
  setTimeout(startTour, 800);
}
