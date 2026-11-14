/* ============================================================
   MAT3_jogo_voz.js — a abertura de "Math Stars" NARRADA (escrito à mão; o fork não toca).
   Pedido do Paulo (14/11): "no jogo não tem as falas na abertura ... tablet, cel e pc, pra ajudar na imersão".
   · Cada cartão da intro traz cena.voz ('intro_1'...) e o mp3 gravado mora em media/mat3/jogo_voz/<voz>.mp3
     (pt-BR-ThalitaMultilingualNeural lendo o INGLÊS; gerado e conferido por trabalho/3tri_matematica/gen/jogo/voz_abertura.py).
     Nada de voz do navegador nesses cartões: no celular e no tablet ela não existe ou é robótica.
   · Trava de autoplay (iOS/Android/Chrome): o som só nasce num gesto. Next ▶ (clique ou ENTER) já é gesto; o 1º cartão,
     que aparece sozinho ao abrir, toca no primeiro toque/clique na tela (ou no botão de voz). Um único <audio> é reusado:
     destravado uma vez, os cartões seguintes tocam.
   · A fala PARA quando o cartão muda, no Skip e quando a abertura acaba. O avanço continua manual (só Next).
   · Botão de voz (alto-falante) no próprio cartão: liga/desliga, lembrado em localStorage 'mat3_jogo_voz'.
   · Bandeira ligada: a legenda PT aparece no cartão (ui.js); a voz continua em inglês.
   ============================================================ */
window.MAT3VOZ=(function(){
'use strict';
var KEY='mat3_jogo_voz', BASE='media/mat3/jogo_voz/', VER='2';
var ligada=true, au=null, atual=null, pend=null, log=[];
try{ ligada=localStorage.getItem(KEY)!=='0'; }catch(e){}
var ICO_ON='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
var ICO_OFF='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M16 9l6 6M22 9l-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
function css(){ if(document.getElementById('vozCss')) return; var st=document.createElement('style'); st.id='vozCss';
  st.textContent='#legenda .lgvoz{height:44px;width:48px;min-width:44px;padding:0;border-radius:12px;border:2px solid rgba(253,224,71,.65);background:rgba(253,224,71,.14);color:#fde68a;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}'+
    '#legenda .lgvoz.off{border-color:rgba(255,255,255,.35);background:transparent;color:rgba(255,255,255,.7)}'+
    '#legenda .lgvoz{min-height:var(--alvo,44px)!important;min-width:var(--alvo,44px)}'; /* alvo de toque >= 44 px reais também no celular (a UI é escalada) */
  document.head.appendChild(st); }
function para(){ pend=null; atual=null; if(au){ try{ au.pause(); au.currentTime=0; }catch(e){} } }
function toca(cena){ para(); atual=cena; if(!ligada||window.somLigado===false||!cena||!cena.voz) return; /* guardião: o 'Voice: off' do menu vale aqui também */
  try{ if(!au){ au=new Audio(); au.preload='auto'; }
    au.src=BASE+cena.voz+'.mp3?v='+VER; log.push(cena.voz);
    var pr=au.play(); if(pr&&pr.catch) pr.catch(function(){ if(atual===cena) pend=cena; }); /* bloqueado: espera o 1º gesto */
  }catch(e){ pend=cena; } }
/* chamado pelo ui.js a cada cartão: true = este cartão é narrado aqui (o say() do navegador fica de fora) */
function fala(cena){ if(!cena||!cena.voz){ para(); return false; } toca(cena); return true; }
function pinta(b){ if(!b) return; b.classList.toggle('off',!ligada); b.innerHTML=ligada?ICO_ON:ICO_OFF;
  b.setAttribute('aria-label',ligada?'Voice on: tap to turn off':'Voice off: tap to turn on'); b.title=ligada?'Voice: on':'Voice: off'; b.setAttribute('aria-pressed',String(ligada)); }
/* põe o botão de voz no cartão (só nos cartões narrados) */
function liga(d,cena){ css(); if(!d||!cena||!cena.voz) return; var row=d.querySelector('.lgrow'); if(!row) return;
  var b=document.createElement('button'); b.className='lgvoz'; b.id='lgVoz'; b.type='button'; pinta(b); row.insertBefore(b,row.firstChild);
  b.addEventListener('click',function(e){ e.stopPropagation(); ligada=!ligada; try{ localStorage.setItem(KEY,ligada?'1':'0'); }catch(x){} pinta(b);
    if(ligada) toca(cena); else { var c=atual; para(); atual=c; } }); }
/* o 1º cartão aparece sem gesto: o primeiro toque/clique/tecla na tela o faz falar (Next/Skip/voz cuidam de si) */
function gesto(e){ if(!pend) return; var t=e.target; if(t&&t.closest&&t.closest('#lgNext,#lgPula,#lgVoz')) return;
  if(e.type==='keydown'&&(e.key==='Enter'||e.key===' '||e.key==='Escape')) return; var c=pend; pend=null; toca(c); }
document.addEventListener('pointerdown',gesto,true); document.addEventListener('keydown',gesto,true);
document.addEventListener('visibilitychange',function(){ if(document.hidden&&au){ try{ au.pause(); }catch(e){} } });
return {fala:fala, para:para, liga:liga, ligada:function(){ return ligada; },
  estado:function(){ return {ligada:ligada, atual:atual&&atual.voz||null, pend:pend&&pend.voz||null, log:log.slice()}; }};
})();
