/* ============================================================
   SERAFINA BASE.JS — Utilitarios Compartilhados
   Todas as ferramentas (HIS, LP, ELA) importam este arquivo.

   HOOKS que cada ferramenta pode definir ANTES de chamar initApp():
   - var PHASES = [{id,label}, ...]  -> fases do jogo (phase-nav)
   - function onInit(){}             -> setup apos base init
   - function onRestart(){}          -> reset vars especificas
   - function onPhaseNavigate(id){}  -> logica custom ao navegar entre fases
   ============================================================ */

// === HELPERS ===
function $(id){return document.getElementById(id);}
function shuffle(arr){
  for(var i=arr.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var t=arr[i];arr[i]=arr[j];arr[j]=t;
  }
  return arr;
}

// === SCREEN NAVIGATION ===
var visitedPhases={};

function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  var el=$(id);if(el)el.classList.add('active');
  window.scrollTo(0,0);
  visitedPhases[id]=true;
  if(typeof PHASES!=='undefined') updatePhaseNavs(id);
}

function updatePhaseNavs(activeId){
  document.querySelectorAll('.phase-nav').forEach(function(nav){
    nav.innerHTML='';
    PHASES.forEach(function(p){
      var btn=document.createElement('button');
      btn.className='phase-btn';
      if(p.id===activeId) btn.classList.add('active');
      else if(visitedPhases[p.id]) btn.classList.add('completed');
      btn.innerHTML=p.label;
      btn.onclick=function(){navigateToPhase(p.id);};
      nav.appendChild(btn);
    });
  });
}

function navigateToPhase(id){
  if(typeof onPhaseNavigate==='function'){
    onPhaseNavigate(id);
  } else {
    showScreen(id);
  }
}

// === THEME & FONT ===
function toggleTheme(){
  var b=document.body;
  if(b.classList.contains('theme-light')){
    b.classList.remove('theme-light');
    var tb=$('themeBtn');if(tb)tb.innerHTML='\u{1F31D}';
    localStorage.setItem('serafina_theme','dark');
  } else {
    b.classList.add('theme-light');
    var tb=$('themeBtn');if(tb)tb.innerHTML='\u{1F31A}';
    localStorage.setItem('serafina_theme','light');
  }
}

function changeFontSize(dir){
  var r=document.documentElement;
  var fs=parseFloat(getComputedStyle(r).getPropertyValue('--fs'))||1;
  fs=Math.max(0.8,Math.min(1.4,fs+dir*0.1));
  r.style.setProperty('--fs',fs);
  localStorage.setItem('serafina_fs',fs);
}

// === HOME MODAL ===
function showHomeModal(){
  var m=$('confirm-home-modal');
  if(m) m.classList.add('active');
}
function closeHomeModal(){
  var m=$('confirm-home-modal');
  if(m) m.classList.remove('active');
}
function goToIndex(){window.location.href='../index.html';}

function ensureHomeModal(){
  if($('confirm-home-modal')) return;
  var d=document.createElement('div');
  d.className='confirm-modal-overlay';d.id='confirm-home-modal';
  d.innerHTML='<div class="confirm-modal">'
    +'<div class="confirm-modal-icon">\u{1F3E0}</div>'
    +'<div class="confirm-modal-title">Ir para o inicio?</div>'
    +'<div class="confirm-modal-text">Tem certeza que quer voltar para a tela principal?</div>'
    +'<div class="confirm-modal-btns">'
    +'<button class="confirm-btn-yes" onclick="goToIndex()">Sim, ir!</button>'
    +'<button class="confirm-btn-no" onclick="closeHomeModal()">Nao, ficar</button>'
    +'</div></div>';
  document.body.appendChild(d);
}

// === SCORE ===
var score=0;
function updateScore(pts){
  score+=pts;
  var el=$('score-val');if(el)el.textContent=score;
}

// === RESTART ===
function restartGame(){
  score=0;
  var el=$('score-val');if(el)el.textContent='0';
  visitedPhases={};
  if(typeof onRestart==='function') onRestart();
  showScreen('screen-intro');
}

// === STARFIELD ===
function initStarfield(){
  var c=$('starfield');if(!c)return;
  var ctx=c.getContext('2d');
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  var stars=[];
  for(var i=0;i<120;i++){
    stars.push({
      x:Math.random()*c.width,y:Math.random()*c.height,
      r:Math.random()*1.8+.3,a:Math.random(),da:Math.random()*.02+.005
    });
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    stars.forEach(function(s){
      s.a+=s.da;if(s.a>1||s.a<0)s.da*=-1;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,'+s.a+')';ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// === FIREWORKS / CONFETTI ===
function launchFireworks(){
  var c=$('fw-canvas');if(!c)return;
  var ctx=c.getContext('2d');
  c.width=window.innerWidth;c.height=window.innerHeight;
  var particles=[];
  var colors=['#a78bfa','#f472b6','#fb923c','#34d399','#fbbf24','#60a5fa'];
  for(var i=0;i<150;i++){
    particles.push({
      x:c.width/2+Math.random()*200-100,y:c.height/2,
      vx:Math.random()*8-4,vy:Math.random()*-10-3,
      r:Math.random()*4+2,
      color:colors[Math.floor(Math.random()*colors.length)],
      life:1,decay:Math.random()*.015+.008
    });
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);var alive=false;
    particles.forEach(function(p){
      if(p.life<=0)return;alive=true;
      p.x+=p.vx;p.y+=p.vy;p.vy+=.15;p.life-=p.decay;
      ctx.globalAlpha=p.life;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color;ctx.fill();
    });
    ctx.globalAlpha=1;
    if(alive) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,c.width,c.height);
  }
  draw();
}

// === INIT ===
function initApp(){
  // Tema
  if(localStorage.getItem('serafina_theme')==='light'){
    document.body.classList.add('theme-light');
    var tb=$('themeBtn');if(tb)tb.innerHTML='\u{1F31A}';
  }
  // Fonte
  var fs=localStorage.getItem('serafina_fs');
  if(fs) document.documentElement.style.setProperty('--fs',fs);
  // Starfield
  initStarfield();
  // Modal
  ensureHomeModal();
  // Phase nav inicial
  if(typeof PHASES!=='undefined'){
    visitedPhases['screen-intro']=true;
    updatePhaseNavs('screen-intro');
  }
  // Hook da ferramenta
  if(typeof onInit==='function') onInit();
}
