/* ============================================================
   LP3_jornada_ui4.js — POPUP DE TEORIA (abre quando a criança erra
   ou o tempo acaba; o cronômetro fica parado): o tema, a regra em
   1-2 frases com 3-5 exemplos destacados (LP3_jornada_regras.js),
   a resposta certa e o porquê (campo ex do banco), botão de ouvir
   (Thalita, say()), "Explicar mais" com as telinhas da lição do mesmo
   tema (LP3_estudo_licoes.js: palavras/texto/pares) e "Entendi".
   ============================================================ */
(function(U){
'use strict';
var $=function(id){ return document.getElementById(id); };
function W(s){ return String(s).replace(/\[([^\]]+)\]/g,'<span class="hl">$1</span>').replace(/\{([^}]+)\}/g,'<span class="qt">$1</span>').replace(/\(([^)]+)\)/g,'<span class="mudo">$1</span>'); }
function limpo(s){ return String(s).replace(/[\[\]{}()]/g,'').replace(/\|.*$/,''); }
function texto(html){ var d=document.createElement('div'); d.innerHTML=html; return d.textContent||''; }
/* telinhas da lição do tema que dá para mostrar aqui (até 2) */
function telasExtras(tema){
  var L=window.LP3_LICOES||[], out=[];
  L.filter(function(l){ return l.tema===tema; }).forEach(function(l){ (l.telas||[]).forEach(function(t){ if(t.tipo==='palavras'||t.tipo==='texto'||t.tipo==='pares') out.push(t); }); });
  return out.slice(0,2);
}
function telaHtml(t){
  var h='<div class="tela">'+(t.tit?'<h4>'+U.esc(t.tit)+'</h4>':'');
  if(t.tipo==='palavras'){ h+='<div class="regra">'+(t.regra||'')+'</div><div class="pals">'+(t.pals||[]).map(function(p){ var m=p.split('|'); return '<span class="pal">'+W(m[0])+(m[1]?'<small class="sil">'+m[1]+'</small>':'')+'</span>'; }).join('')+'</div>'+(t.depois?'<div class="regra">'+t.depois+'</div>':''); }
  else if(t.tipo==='pares'){ h+='<div class="regra">'+(t.regra||'')+'</div><div class="pals">'+(t.pares||[]).map(function(p){ return '<span class="pal">'+W(U.esc(p[0]))+' → '+W(U.esc(p[1]))+'</span>'; }).join('')+'</div>'; }
  else h+=(t.html||'');
  return h+'</div>';
}
function teoria(item,cb){
  var tema=LP3.TEMAS[item.tema]||{nome:item.tema,cor:'#60a5fa'}, R=window.REGRAS?REGRAS.R[item.tema]:null, extras=telasExtras(item.tema);
  var h='<h2><span class="qtema" style="background:'+tema.cor+'">'+U.esc(tema.nome)+'</span> Vamos entender</h2><div class="tcorpo">';
  if(R){ h+='<div class="tregra">'+REGRAS.marca(R.regra)+'</div><div class="tex">'+R.ex.slice(0,5).map(function(e){ return '<span>'+REGRAS.marca(e)+'</span>'; }).join('')+'</div>'; }
  h+='<div class="tcerta"><span>✓</span><div>A certa era <b>'+U.esc(item.o[item.c])+'</b>.'+(item.ex?' '+U.esc(item.ex):'')+'</div></div>';
  if(extras.length) h+='<div class="tmais" id="tMais">'+extras.map(telaHtml).join('')+'</div>';
  h+='</div><div class="tbtns"><button class="mbtn voz" id="tVoz" aria-label="Ouvir a explicação">'+U.SVG.ouvir+'</button>'+(extras.length?'<button class="mbtn" id="tExplica">Explicar mais</button>':'')+'<button class="mbtn pri" id="tEntendi">Entendi</button></div>';
  var falaBase=(R?R.regra+'. Por exemplo: '+R.ex.slice(0,3).map(function(e){ return e.replace(/\*/g,''); }).join('. ')+'. ':'')+'A certa era '+item.o[item.c]+'. '+(item.ex||'');
  var falaMais=extras.map(function(t){ return t.fala||texto(t.regra||t.html||''); }).join(' ');
  U.menu(h,{tEntendi:function(){ U.fechaMenu(); try{ speechSynthesis.cancel(); }catch(e){} if(cb) cb(); },
    tExplica:function(){ var m=$('tMais'); if(!m) return; var on=m.classList.toggle('show'); $('tExplica').textContent=on?'Explicar menos':'Explicar mais'; if(on){ m.scrollIntoView({block:'nearest'}); try{ say(falaMais); }catch(e){} } },
    tVoz:function(){ try{ var m=$('tMais'); say(falaBase+(m&&m.classList.contains('show')?' '+falaMais:'')); }catch(e){} }},'teoria');
  var card=$('mcard'); card.style.setProperty('--tc',tema.cor);
}
U.teoria=teoria;
})(window.UI);
