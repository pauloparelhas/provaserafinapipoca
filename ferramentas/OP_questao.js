/* ============================================================
   OP_questao.js — O COMPONENTE ÚNICO DE QUESTÃO (React 18, sem build).

   Uma questão da Olimpíada se comporta igual em três lugares, e por isso
   existe UM componente só:
     · OP_simulado.html   — rodadas de 15, como a prova
     · OP_estudo.html     — o popup que abre dentro de um bloco teórico
     · OP_provas.html     — fazer uma prova anterior inteira, por ano/fase

   Antes disso o motor estava duplicado entre o simulado e a teoria: dois
   lugares para corrigir cada bug de correção. Agora é um.

   React vem LOCAL de assets/ (react.production.min.js + react-dom). O
   projeto não usa CDN: os produtos abrem offline e no GitHub Pages, e o
   precedente é o assets/three.module.js.

   Sem JSX (não há build): `h` é React.createElement.

   API
   ---
   OPQ.montaQuestao(elemento, {
     item,                 // um item do banco (window.OP.ITENS)
     numero, total,        // rótulo "Pergunta 3 de 15" (opcional)
     etiqueta,             // texto extra no cabeçalho (ex.: "mais uma igual")
     mostrarOrigem,        // default true — de que prova a questão saiu
     aoResponder,          // (acertou, item) => void
     aoAvancar,            // se vier, desenha o botão de seguir adiante
     rotuloAvancar,        // texto do botão
     respostaInicial       // índice já respondido (para reabrir uma questão feita)
   })  -> { destruir() }

   Toda a correção didática mora aqui: o truque, o truque desenhado sobre
   AQUELA questão, por que a alternativa marcada não serve, e o gesto para
   a próxima. É o coração do material — mexer aqui muda os três produtos.
   ============================================================ */
(function(global){
'use strict';
var h = React.createElement;

/* --------- utilidades --------- */
function embaralha(a){
  a=a.slice();
  for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
  return a;
}
function textoPuro(s){
  return String(s||'').replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/gi,' ').replace(/\s+/g,' ').trim();
}
function html(s){ return {dangerouslySetInnerHTML:{__html:s}}; }
function falar(t){ if(global.say) global.say(textoPuro(t)); }

/* --------- o texto longo, linha a linha ---------
   A régua deixou de ser obrigatória (ela travava as alternativas até a
   criança descer linha por linha — fricção que atrapalhava mais do que
   ajudava). Agora o texto nasce inteiro e legível; quem quiser o apoio
   liga o "guia de leitura" e aí só a linha atual fica acesa. A escolha
   fica salva, então quem gosta encontra ligado na próxima questão.     */
var GUIA_KEY='op_guia';
function guiaLigado(){ try{ return localStorage.getItem(GUIA_KEY)==='1'; }catch(e){ return false; } }
function salvaGuia(v){ try{ localStorage.setItem(GUIA_KEY, v?'1':'0'); }catch(e){} }

function Texto(props){
  var linhas=props.linhas, acende=props.acende;
  var estado=React.useState(guiaLigado()), guia=estado[0], setGuia=estado[1];
  var pos=React.useState(0), atual=pos[0], setAtual=pos[1];

  function classe(i){
    if(acende) return acende.indexOf(i)>=0 ? 'lin acesa' : 'lin apagada';
    if(!guia) return 'lin';
    if(i===atual) return 'lin on';
    return i<atual ? 'lin lida' : 'lin adiante';
  }
  return h('div',{className:'leitura'+(guia?' comguia':'')},
    linhas.map(function(l,i){
      return h('button',{key:i, className:classe(i), onClick:function(){
        if(guia && i===atual && i<linhas.length-1) setAtual(i+1); else falar(l);
      }}, l);
    }),
    !acende && h('div',{className:'guiarow'},
      h('button',{className:'guiabtn'+(guia?' on':''), onClick:function(){
        var v=!guia; setGuia(v); salvaGuia(v); setAtual(0);
      }}, guia ? 'Guia de leitura ligado' : 'Ligar guia de leitura'),
      guia && h('span',{className:'guiadica'},'toque na linha acesa para descer uma')
    )
  );
}

/* --------- a questão --------- */
function Questao(props){
  var item=props.item;
  var alt=React.useState(function(){
    return embaralha(item.opts.map(function(o){ return {t:o.t, ok:!!o.ok, no:o.no}; }));
  })[0];
  var r=React.useState(typeof props.respostaInicial==='number'?props.respostaInicial:-1);
  var pick=r[0], setPick=r[1];
  var d=React.useState(false), dica=d[0], setDica=d[1];
  var fim=React.useRef(null);

  var feito = pick>=0;
  var acertou = feito && alt[pick].ok;

  function responde(i){
    if(feito) return;
    setPick(i);
    if(props.aoResponder) props.aoResponder(!!alt[i].ok, item);
  }
  React.useEffect(function(){
    if(feito && fim.current){ try{ fim.current.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){} }
  },[feito]);

  function leTudo(){
    falar([item.enun||'', (item.texto||[]).join(' '), item.quadro||'', item.pede].join('. '));
  }

  return h('div',{className:'q'},
    /* cabeçalho enxuto: número, família, e de onde a questão saiu */
    h('div',{className:'qhead'},
      props.numero && h('span',{className:'qnum'},'Pergunta '+props.numero+(props.total?' de '+props.total:'')),
      props.etiqueta && h('span',{className:'qetq'},props.etiqueta),
      props.mostrarOrigem!==false && h('span',{className:'qorig'},item.origem)
    ),
    item.enun && h('p',Object.assign({className:'enun'},html(item.enun))),
    item.nota && h('p',{className:'nota'},item.nota),
    item.quadro && h('div',Object.assign({className:'quadro'},html(item.quadro))),
    item.texto && h(Texto,{linhas:item.texto}),
    h('p',Object.assign({className:'pede'},html(item.pede))),

    h('div',{className:'linhabtn'},
      h('button',{className:'mini', onClick:leTudo},'Ouvir'),
      !feito && h('button',{className:'mini'+(dica?' on':''), onClick:function(){
        var v=!dica; setDica(v); if(v) falar(item.dica);
      }}, dica?'Esconder a dica':'Dica')
    ),
    dica && !feito && h('div',{className:'dicabox'},h('b',null,'Dica: '),item.dica),

    h('div',{className:'opts'}, alt.map(function(o,i){
      var cls='opt';
      if(feito && o.ok) cls+=' ok';
      if(feito && i===pick && !o.ok) cls+=' no';
      return h('button',{key:i, className:cls, disabled:feito, onClick:function(){ responde(i); }},
        h('span',{className:'let'},'ABCD'.charAt(i)),
        h('span',Object.assign({className:'oct'},html(o.t)))
      );
    })),

    feito && h('div',{className:'fb '+(acertou?'certo':'errado'), ref:fim},
      acertou
        ? h('div',null,
            h('h3',null,'Isso mesmo.'),
            h('p',Object.assign({className:'porq'},html(item.porque))),
            h('p',{className:'truq'},item.truque))
        : h('div',null,
            h('h3',null,'Olha o truque'),
            h('p',{className:'truq'},item.truque),
            h('div',Object.assign({className:'desenho'},html(item.visual))),
            h('p',{className:'sua'},
              h('b',null,'Você marcou '+textoPuro(alt[pick].t)+' '),
              h('span',Object.assign({},html(alt[pick].no||'')))),
            h('p',Object.assign({className:'porq'},html(item.porque))),
            h('p',{className:'prox'},h('i',null,'Na próxima, faça assim'),item.proximo),
            h('button',{className:'mini', onClick:function(){
              falar([item.truque, alt[pick].no, item.porque, item.proximo].join('. '));
            }},'Ouvir a explicação'))
    ),

    feito && props.aoAvancar && h('button',{className:'avancar', onClick:props.aoAvancar},
      props.rotuloAvancar||'Próxima')
  );
}

/* --------- montagem imperativa (as páginas são HTML comum) --------- */
var OPQ = {
  Questao: Questao,
  h: h,
  embaralha: embaralha,
  textoPuro: textoPuro,
  montaQuestao: function(el, props){
    var raiz = ReactDOM.createRoot(el);
    raiz.render(h(Questao, props));
    return { destruir: function(){ raiz.unmount(); },
             atualiza: function(p){ raiz.render(h(Questao, p)); } };
  },
  montar: function(el, componente, props){
    var raiz = ReactDOM.createRoot(el);
    raiz.render(h(componente, props));
    return { destruir: function(){ raiz.unmount(); },
             atualiza: function(p){ raiz.render(h(componente, p)); } };
  }
};

global.OPQ = OPQ;
})(window);
