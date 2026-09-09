/* ============================================================
   OP_voz.js — THALITA OU NADA.

   Ordem do Paulo (09/09): "a leitura está sendo feita com a locutora que
   eu não suporto; obrigatório usar locutora thalita, se não conseguir,
   retire a função de locutora".

   O problema: a Thalita é voz NEURAL e só existe no Microsoft Edge. No
   Chrome, o `say()` do serafina-core percorre a lista de preferências e
   acaba caindo na "Microsoft Maria"/"Daniel" — as vozes SAPI antigas, que
   são justamente as robóticas. A lista de preferências existia para evitar
   isso, mas ela DEGRADA em vez de desistir: sempre acha alguma voz.

   Aqui não degrada. Só fala com Thalita. Sem Thalita, os botões de ouvir
   somem da tela — melhor não ter a função do que ter com voz ruim.

   Carregar DEPOIS do serafina-core.js e ANTES do motor da página.
   ============================================================ */
(function(global){
'use strict';

var PREFERIDA = 'thalita';
var vozBoa = null;
var jaDecidiu = false;

function procura(){
  var vs = [];
  try { vs = speechSynthesis.getVoices() || []; } catch(e){ return null; }
  if(!vs.length) return null;   /* lista ainda não chegou: não decide nada */
  for(var i=0;i<vs.length;i++){
    if(vs[i].name.toLowerCase().indexOf(PREFERIDA) > -1) return vs[i];
  }
  return false;                 /* lista chegou e a Thalita não está nela */
}

function aplica(){
  var r = procura();
  if(r === null) return;        /* ainda não dá para saber */
  jaDecidiu = true;
  vozBoa = r || null;
  document.body.classList.toggle('sem-voz', !vozBoa);
  /* o botão de mudo não faz sentido sem voz nenhuma */
  var b = document.getElementById('sombtn');
  if(b && !vozBoa) b.style.display = 'none';
}

/* Substitui o say() do core. Mesma assinatura, uma regra a menos de
   tolerância: se não for a Thalita, não fala. */
global.say = function(txt){
  if(!txt || !vozBoa || !global.somLigado) return;
  try{
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(txt));
    u.voice = vozBoa;
    u.lang = vozBoa.lang || 'pt-BR';
    u.rate = (global.SERA_CFG && global.SERA_CFG.rate) || 0.86;
    speechSynthesis.speak(u);
  }catch(e){}
};

/* Diz se a leitura em voz alta está disponível — o componente de questão
   usa isto para não desenhar botão que não faz nada. */
global.temVoz = function(){ return !!vozBoa; };

if('speechSynthesis' in global){
  aplica();
  /* No Chrome a lista de vozes chega assíncrona; sem este listener a
     decisão sairia sempre "não tem Thalita". */
  try{ speechSynthesis.addEventListener('voiceschanged', aplica); }catch(e){}
  /* rede de segurança: alguns navegadores não disparam voiceschanged */
  var tentativas = 0;
  var t = setInterval(function(){
    if(jaDecidiu || ++tentativas > 20) return clearInterval(t);
    aplica();
  }, 250);
}else{
  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('sem-voz');
  });
}
})(window);
