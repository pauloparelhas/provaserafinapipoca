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

   Toda a correção didática mora aqui, em DOIS níveis (09/09): na tela,
   por padrão, só o truque e por que a alternativa marcada não serve;
   atrás de "Ver como se faz", o truque desenhado sobre AQUELA questão, o
   porquê e o gesto para a próxima. É o coração do material — mexer aqui
   muda os três produtos.
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
/* O nome da alternativa marcada, para servir de ETIQUETA em cima do
   comentário. Devolve '' quando o comentário do banco já abre com esse
   mesmo nome — repetir seria gagueira na tela. */
function etiquetaSua(o){
  var nome = textoPuro(o.t).replace(/\s*\.\s*$/,'');
  var frase = textoPuro(o.no);
  if(!nome || !frase) return nome;
  return frase.toUpperCase().indexOf(nome.toUpperCase())===0 ? '' : nome;
}
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
    if(i===atual+1) return 'lin proxima';   /* a próxima é o alvo do toque */
    return i<atual ? 'lin lida' : 'lin adiante';
  }
  /* O gesto é apontar para ONDE SE VAI, não para onde já se está: toca-se
     na linha DE BAIXO para a régua descer até ela. (A primeira versão
     pedia o toque na linha acesa, e o Paulo apontou que é contraintuitivo.)
     Tocar em qualquer outra linha só lê a linha em voz alta. */
  return h('div',{className:'leitura'+(guia?' comguia':'')},
    linhas.map(function(l,i){
      return h('button',{key:i, className:classe(i), onClick:function(){
        if(guia && i===atual+1) setAtual(i); else falar(l);
      }}, l);
    }),
    !acende && h('div',{className:'guiarow'},
      h('button',{className:'guiabtn'+(guia?' on':''), onClick:function(){
        var v=!guia; setGuia(v); salvaGuia(v); setAtual(0);
      }}, guia ? 'Guia de leitura ligado' : 'Ligar guia de leitura'),
      guia && h('span',{className:'guiadica'},
        atual<linhas.length-1
          ? 'leia a linha amarela; para continuar, toque na linha de baixo'
          : 'esta é a última linha')
    )
  );
}

/* --------- a questão --------- */
function Questao(props){
  var item=props.item;
  var alt=React.useState(function(){
    /* `img` tem de vir junto: sem ele, a questao cujas alternativas SAO
       desenhos perdia as imagens no embaralhamento e virava quatro
       legendas sem figura. */
    return embaralha(item.opts.map(function(o){ return {t:o.t, ok:!!o.ok, no:o.no, img:o.img}; }));
  })[0];
  var r=React.useState(typeof props.respostaInicial==='number'?props.respostaInicial:-1);
  var pick=r[0], setPick=r[1];
  var d=React.useState(false), dica=d[0], setDica=d[1];
  /* segundo nível da correção ("Ver como se faz"): fechado por padrão. */
  var vm=React.useState(false), verMais=vm[0], setVerMais=vm[1];
  var fim=React.useRef(null);
  /* "Só a pergunta": esconde o texto de apoio e deixa o comando sozinho na
     tela. É a ordem de leitura que faz acertar — primeiro a pergunta, para
     a cabeça já saber o que procurar; depois o texto; depois a pergunta de
     novo com as alternativas. Só aparece quando há texto para esconder. */
  var so=React.useState(false), soPergunta=so[0], setSoPergunta=so[1];
  var temApoio = !!(item.texto || item.quadro || item.figura || item.enun);

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
    /* Com "Só a pergunta" ligado, o comando sobe sozinho para o topo e
       todo o resto some. A criança lê o que está sendo pedido, e só então
       manda aparecer o texto. */
    soPergunta && h('div',{className:'sopergunta'},
      h('span',{className:'sotit'},'O que a pergunta está pedindo'),
      h('p',Object.assign({className:'pede'},html(item.pede))),
      h('button',{className:'mini', onClick:function(){ setSoPergunta(false); }},'Agora mostrar o texto')
    ),
    !soPergunta && item.enun && h('p',Object.assign({className:'enun'},html(item.enun))),
    !soPergunta && item.nota && h('p',{className:'nota'},item.nota),
    !soPergunta && item.quadro && h('div',Object.assign({className:'quadro'},html(item.quadro))),
    /* A figura recortada da prova original. Quando a questao depende do
       desenho (nomear o objeto, ler a placa, decifrar os icones), e ele
       que vale — descrever em palavras entregaria de graca o primeiro
       passo do raciocinio, que na prova e da crianca. */
    !soPergunta && item.figura && h('div',{className:'figura'},
      h('img',{src:item.figura, alt:item.figuraAlt||'figura da questão', loading:'lazy'})),
    !soPergunta && item.texto && h(Texto,{linhas:item.texto}),
    !soPergunta && h('p',Object.assign({className:'pede'},html(item.pede))),

    h('div',{className:'linhabtn'},
      /* o botao de ouvir so existe se houver a voz certa (ver OP_voz.js):
         botao que nao faz nada e pior do que botao nenhum */
      (!global.temVoz || global.temVoz()) && h('button',{className:'mini ouvir', onClick:leTudo},'Ouvir'),
      !feito && temApoio && !soPergunta && h('button',{className:'mini', onClick:function(){
        setSoPergunta(true); falar(item.pede);
        try{ window.scrollTo({top:0,behavior:'smooth'}); }catch(e){}
      }},'Só a pergunta'),
      !feito && h('button',{className:'mini'+(dica?' on':''), onClick:function(){
        var v=!dica; setDica(v); if(v) falar(item.dica);
      }}, dica?'Esconder a dica':'Dica')
    ),
    dica && !feito && h('div',{className:'dicabox'},h('b',null,'Dica: '),item.dica),

    /* Alternativas. Quando elas SAO desenhos (as placas de 2025, as
       fileiras de icones de 2023), o texto vira a legenda e a imagem vem
       recortada da prova. A letra e sempre desenhada pelo componente, e
       nunca faz parte da imagem: a ordem e sorteada, e um "(A)" gravado no
       recorte apareceria na posicao C e mentiria para a crianca. */
    h('div',{className:'opts'+(alt[0].img?' comimg':'')}, alt.map(function(o,i){
      var cls='opt';
      if(feito && o.ok) cls+=' ok';
      if(feito && i===pick && !o.ok) cls+=' no';
      return h('button',{key:i, className:cls, disabled:feito, onClick:function(){ responde(i); }},
        h('span',{className:'let'},'ABCD'.charAt(i)),
        o.img
          ? h('span',{className:'oimg'}, h('img',{src:o.img, alt:textoPuro(o.t), loading:'lazy'}))
          : h('span',Object.assign({className:'oct'},html(o.t)))
      );
    })),

    /* ---------- a correção ----------
       Regra nova (09/09, crítica do Paulo): "não pode uma questão de 10
       segundos demorar 6 meses pra ler o comentário com o truque que
       deveria simplificar". Antes vinha tudo de uma vez — título, truque,
       o truque desenhado, a alternativa marcada, o porquê, o gesto da
       próxima e um botão: perto de 800 caracteres por erro.

       Agora, ao ERRAR, por padrão são três blocos curtos:
         1. o truque — a única coisa que ela leva para a próxima questão;
         2. a frase da alternativa que ela marcou, com o nome dela como
            etiqueta (caixa alta porque é o que está escrito na prova,
            mas em corpo de etiqueta, não de grito);
         3. a fileira de botões.
       Ao ACERTAR, menos ainda: a confirmação e o truque.

       O desenho, o porquê e o gesto da próxima continuam existindo — no
       segundo nível, atrás de "Ver como se faz". Ficam SEMPRE no DOM
       (só escondidos), porque é assim que o gate os confere e porque
       abrir/fechar não pode custar remontagem. */
    feito && h('div',{className:'fb '+(acertou?'certo':'errado'), ref:fim},
      acertou && h('p',{className:'fbok'},'Isso mesmo. Foi este o truque:'),
      h('p',{className:'truq'},item.truque),
      !acertou && h('p',{className:'sua'},
        /* A etiqueta repete o nome da alternativa em caixa alta — mas em
           37% do banco a própria frase do `no` já começa por ele ("MINHAS
           tropeça duas vezes..."), e aí a etiqueta viraria gagueira
           ("MINHAS / MINHAS tropeça"). Nesses casos ela some: quem
           antecede o comentário é o próprio texto do banco. */
        etiquetaSua(alt[pick]) && h('b',{className:'suaetq'}, etiquetaSua(alt[pick])),
        h('span',Object.assign({},html(alt[pick].no||'')))),
      h('div',{className:'fbmais', hidden:!verMais},
        !acertou && h('div',Object.assign({className:'desenho'},html(item.visual))),
        h('p',Object.assign({className:'porq'},html(item.porque))),
        !acertou && h('p',{className:'prox'},h('i',null,'Na próxima'),item.proximo)
      ),
      /* a fileira de botões fica DEPOIS do texto, nunca entre duas frases
         dele (regra do Paulo sobre controle no meio do conteúdo) */
      h('div',{className:'fbrow'},
        h('button',{className:'mini'+(verMais?' on':''), onClick:function(){ setVerMais(!verMais); }},
          verMais ? 'Fechar' : 'Ver como se faz'),
        (!global.temVoz || global.temVoz()) && h('button',{className:'mini ouvir', onClick:function(){
          /* lê o que está na tela, não o que está escondido */
          falar(acertou ? item.truque
                        : [item.truque, alt[pick].no].join('. '));
        }},'Ouvir')
      )
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
