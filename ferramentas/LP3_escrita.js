/* ============================================================
   LP3_escrita.js — a PARTE ESCRITA do simulado de Português (3º tri).
   Criado em 11/10/2026. Componente PRÓPRIO: não mexe no OP_questao.js
   (o componente único das questões de marcar continua intacto).

   Uma tarefa = comando da prova (CAIXA ALTA) + quadro + caixa de texto
   grande, pautada como a folha. A criança escreve no caderno ou na caixa;
   depois toca "Ver uma resposta modelo", confere com a lista do que olhar
   e se autoavalia: Acertei / Quase / Errei. Só então aparece o botão de
   seguir (não avança sozinho).

   API
     LP3E.sorteia(n)            -> n tarefas, com cotas por grupo e sem
                                   repetir o que já viu (lp3_escrita_vistos)
     LP3E.Tarefa                -> componente React; props:
        tarefa, numero, total, aoAvaliar(nota), aoAvancar, rotuloAvancar
     LP3E.NOTAS                 -> [{k,rotulo}] Acertei / Quase / Errei
   Depende de: React, window.OPQ (para h e embaralha), window.LP3E_BANCO.
   ============================================================ */
(function(global){
'use strict';
var h = React.createElement;
var BANCO = global.LP3E_BANCO || [];
var VISTOS = 'lp3_escrita_vistos';
var NOTAS = [
  {k:'ok',    rotulo:'Acertei'},
  {k:'quase', rotulo:'Quase'},
  {k:'errei', rotulo:'Errei'}
];

function embaralha(a){
  if(global.OPQ && global.OPQ.embaralha) return global.OPQ.embaralha(a);
  a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a;
}
function textoPuro(s){ return String(s||'').replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ').replace(/\s+/g,' ').trim(); }
function vistos(){ try{ return JSON.parse(localStorage.getItem(VISTOS)||'[]'); }catch(e){ return []; } }
function marcaVisto(ids){
  var v=vistos(); ids.forEach(function(i){ if(v.indexOf(i)<0) v.push(i); });
  try{ localStorage.setItem(VISTOS,JSON.stringify(v)); }catch(e){}
}
function zeraVistos(){ try{ localStorage.removeItem(VISTOS); }catch(e){} }

/* Cotas: o peso do roteiro também vale aqui. Em 4 tarefas: 1 de texto
   (paráfrase/paródia), 2 de palavra (ortografia, plural, ordem), 1 de
   conceito ("com suas palavras"). Em 8: 3 · 3 · 2. Dentro de cada grupo,
   primeiro as que ela não viu, e de TIPOS diferentes quando der. */
function cotas(n){
  if(n<=4) return {texto:1, palavra:2, conceito:1};
  return {texto:3, palavra:3, conceito:2};
}
function sorteia(n){
  var jaVi=vistos(), escolhidas=[], c=cotas(n);
  Object.keys(c).forEach(function(g){
    var pool=BANCO.filter(function(t){ return t.grupo===g; });
    var ord=embaralha(pool.filter(function(t){ return jaVi.indexOf(t.id)<0; }))
      .concat(embaralha(pool.filter(function(t){ return jaVi.indexOf(t.id)>=0; })));
    var tipos=[], pega=[];
    ord.forEach(function(t){ if(pega.length<c[g] && tipos.indexOf(t.tipo)<0){ pega.push(t); tipos.push(t.tipo); } });
    ord.forEach(function(t){ if(pega.length<c[g] && pega.indexOf(t)<0) pega.push(t); });
    escolhidas=escolhidas.concat(pega);
  });
  /* a ordem da folha: palavra primeiro (aquece), texto, conceito por último */
  var ordem={palavra:0, texto:1, conceito:2};
  escolhidas.sort(function(a,b){ return ordem[a.grupo]-ordem[b.grupo]; });
  marcaVisto(escolhidas.map(function(t){ return t.id; }));
  return escolhidas.slice(0,n);
}

function falar(t){ if(global.say) global.say(textoPuro(t)); }
function html(s){ return {dangerouslySetInnerHTML:{__html:s}}; }

function Tarefa(props){
  var t=props.tarefa;
  var tx=React.useState(''), texto=tx[0], setTexto=tx[1];
  var vm=React.useState(false), verModelo=vm[0], setVerModelo=vm[1];
  var nt=React.useState(null), nota=nt[0], setNota=nt[1];
  var fim=React.useRef(null);
  React.useEffect(function(){
    if(verModelo && fim.current){ try{ fim.current.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){} }
  },[verModelo]);

  function avalia(k){
    if(nota) return;
    setNota(k);
    if(props.aoAvaliar) props.aoAvaliar(k, t);
  }

  return h('div',{className:'q esc'},
    h('div',{className:'qhead'},
      h('span',{className:'qnum'},'Parte escrita'+(props.numero?' · '+props.numero+(props.total?' de '+props.total:''):'')),
      h('span',{className:'qorig'},t.tipo)
    ),
    h('p',{className:'pede'},t.cmd),
    t.quadro && h('div',Object.assign({className:'quadro'},html(t.quadro))),
    h('label',{className:'esclab', htmlFor:'esc-'+t.id},'Escreva no caderno ou aqui embaixo:'),
    h('textarea',{id:'esc-'+t.id, className:'escarea', rows:t.linhas||3, value:texto,
      spellCheck:false, autoCapitalize:'characters', autoComplete:'off',
      onChange:function(e){ setTexto(e.target.value); }}),
    h('div',{className:'linhabtn'},
      (!global.temVoz || global.temVoz()) && h('button',{className:'mini ouvir', onClick:function(){
        falar([t.cmd, t.quadro||''].join('. ')); }},'Ouvir')
    ),
    !verModelo && h('button',{className:'avancar calmo', onClick:function(){ setVerModelo(true); }},
      'Ver uma resposta modelo'),
    verModelo && h('div',{className:'fb modelo', ref:fim},
      h('p',{className:'fbok'},'Uma resposta modelo:'),
      h('div',Object.assign({className:'modtxt'},html(t.modelo))),
      h('p',{className:'confti'},'Confira na sua:'),
      h('ul',{className:'confere'}, (t.confere||[]).map(function(c,i){ return h('li',{key:i},c); })),
      h('p',{className:'confti'},'Como foi a sua?'),
      h('div',{className:'autoav'}, NOTAS.map(function(n){
        var cls='av av-'+n.k+(nota===n.k?' on':'')+(nota && nota!==n.k?' apaga':'');
        return h('button',{key:n.k, className:cls, disabled:!!nota && nota!==n.k,
          'aria-pressed':nota===n.k, onClick:function(){ avalia(n.k); }}, n.rotulo);
      })),
      nota && h('p',{className:'avmsg'},
        nota==='ok' ? 'Muito bem. Na prova, capriche na letra também.'
        : nota==='quase' ? 'Quase lá: veja na lista acima o que faltou e guarde para a prova.'
        : 'Tudo bem errar aqui. Leia a resposta modelo mais uma vez, devagar.')
    ),
    nota && props.aoAvancar && h('button',{className:'avancar', onClick:props.aoAvancar},
      props.rotuloAvancar||'Próxima tarefa')
  );
}

global.LP3E = { sorteia:sorteia, Tarefa:Tarefa, NOTAS:NOTAS, BANCO:BANCO,
                zeraVistos:zeraVistos, vistos:vistos };
})(window);
