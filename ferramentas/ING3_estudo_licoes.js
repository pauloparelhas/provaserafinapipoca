/* ============================================================
   ING3_estudo_licoes.js — as 8 LIÇÕES da teoria de Inglês (ELA) Y2,
   3º trimestre (ING3_estudo.html). Mesmo formato do LP3_estudo_licoes.js.

   Fonte única: trabalho/3tri_ingles/_roteiro.md + insumo/ (pôster
   Cause and Effect e os slides S1–S6). Conteúdo em INGLÊS simples;
   a tradução vem logo depois em <span class="tr">…</span> (a bandeira
   liga body.show-tr). O poema "animals" (Brian Bilston) NÃO é
   reproduzido: só os números do slide (31 lines, 8 stanzas).

   Lição: {k, tema, nome, nome_pt, cor, treino:[[temas,n,tipo],...], telas:[...]}
     tema   chave do ING3_banco (fairy | realmb | circle | cause | poem)
     sem `ic` e sem figuras: a casca desenha um ícone por tema.
   Tipos de telinha usados (só os que a casca desenha sem LP3ARTE):
     texto · palavras · revela (sem fig) · pares · escolha · completa ·
     liga · ordena (sem cena: só a legenda `cap`)
   Cada tela traz `fala` só em inglês (o botão de ouvir lê isso).
   Nos campos que passam por W() (escolha.m/cheia, completa.m/cheia,
   palavras, pares) NÃO há ( ) [ ] { } nem _ fora da lacuna.
   Opções de escolha/completa são texto puro em inglês (o motor
   compara textContent com `c`).
   ============================================================ */
window.ING3_LICOES = (function(){
'use strict';
function tr(pt){ return ' <span class="tr">'+pt+'</span>'; }
function R(en,pt){ return '<div class="regra">'+en+(pt?tr(pt):'')+'</div>'; }
function caixa(t,corpo){ return '<div class="caixa"><h3>'+t+'</h3>'+corpo+'</div>'; }
/* passos lado a lado, sem figura */
function passos(lista){
  return '<div class="passos">'+lista.map(function(p,i){
    return (i?'<span class="pseta" aria-hidden="true">&rsaquo;</span>':'')+
      '<div class="passo"><b>'+p.t+'</b>'+(p.s?'<span>'+p.s+'</span>':'')+'</div>';
  }).join('')+'</div>';
}
/* quadro Cause | Effect (If… / Then…) */
function chave(linhas){
  return '<div class="chave">'+linhas.map(function(l){
    return '<div><span class="tag">'+l[0]+'</span><span>'+l[1]+'</span></div>';
  }).join('')+'</div>';
}
/* poema curto ORIGINAL, com título, linhas, estrofes e autor */
var POEMA={tit:'My Dog', tit_pt:'Meu cachorro', autor:'Lily Bell',
  st:[['My dog is small,','he loves his ball.','He runs and plays','on sunny days.'],
      ['When day is done,','he dreams of fun.','He curls up tight','and sleeps all night.']],
  st_pt:[['Meu cachorro é pequeno,','ele ama sua bola.','Ele corre e brinca','nos dias de sol.'],
         ['Quando o dia acaba,','ele sonha com diversão.','Ele se enrola bem','e dorme a noite toda.']]};
function poema(marcaRima){
  var n=0;
  return '<div class="caixa" style="max-width:420px;margin:0 auto 12px">'+
    '<h3>'+POEMA.tit+tr(POEMA.tit_pt)+'</h3>'+
    POEMA.st.map(function(st,s){
      return '<div style="margin:0 0 10px">'+st.map(function(l,i){
        n++;
        var txt=l;
        if(marcaRima){ txt=l.replace(/(\w+)([.,]?)$/,'<span class="hl">$1</span>$2'); }
        return '<p><small style="opacity:.55;display:inline-block;min-width:22px">'+n+'</small>'+txt+tr(POEMA.st_pt[s][i])+'</p>';
      }).join('')+'</div>';
    }).join('')+
    '<p style="text-align:right;font-style:italic">'+POEMA.autor+'</p></div>';
}

return [

/* ===================== 1. FAIRY TALES: CHARACTERS, SETTINGS, EVENTS ===================== */
{k:'fairy1', tema:'fairy', nome:'Fairy tales: story elements', nome_pt:'Contos de fadas: elementos', cor:'#f472b6',
 treino:[[['fairy'],3,'rapida'],[['fairy'],2,'conceito']], telas:[
 {tipo:'texto', tit:'What is a fairy tale?',
  fala:'A fairy tale is a make-believe type of story. It has characters, settings and story events.',
  html:R('A <b>fairy tale</b> is a <b>make-believe</b> type of story.','Conto de fadas é um tipo de história de faz de conta.')+
   passos([
    {t:'Characters'+tr('Personagens'), s:'WHO is in the story'+tr('QUEM está na história')},
    {t:'Settings'+tr('Cenários'), s:'WHERE the story happens'+tr('ONDE a história acontece')},
    {t:'Story events'+tr('Acontecimentos'), s:'WHAT happens'+tr('O QUE acontece')}])+
   R('A fairy tale has a <b>beginning</b>, a <b>middle</b> and an <b>end</b>.','Tem começo, meio e fim.')},
 {tipo:'revela', tit:'Characters', regra:'Tap each card.'+tr('Toque em cada cartão.'),
  fala:'Characters: royalty, magical creatures, a good character and a bad character, a special helper, talking animals.',
  cartoes:[
   {f:'Royalty'+tr('Realeza'), b:'king, queen, princess, prince, knight'+tr('rei, rainha, princesa, príncipe, cavaleiro')},
   {f:'Magical creatures'+tr('Criaturas mágicas'), b:'fairies, dragons, ogres'+tr('fadas, dragões, ogros')},
   {f:'Good character × bad character'+tr('Personagem bom × mau'), b:'One is good. One is bad.'+tr('Um é bom. Um é mau.')},
   {f:'A special helper'+tr('Um ajudante especial'), b:'fairy, godmother, wizard, elf'+tr('fada, madrinha, mago, elfo')},
   {f:'Talking animals'+tr('Animais que falam'), b:'Animals that talk like people.'+tr('Animais que falam como gente.')}
  ]},
 {tipo:'revela', tit:'Settings and story events', regra:'Tap each card.'+tr('Toque em cada cartão.'),
  fala:'Settings: kingdom, castle, forest, village, house. Story events: Once upon a time. And they lived happily ever after.',
  cartoes:[
   {f:'Settings'+tr('Cenários'), b:'kingdom: castle, forest, village; house'+tr('reino: castelo, floresta, vila; casa')},
   {f:'Special beginning'+tr('Começo especial'), b:'“Once upon a time…”'+tr('“Era uma vez…”')},
   {f:'Special ending'+tr('Final especial'), b:'“And they lived happily ever after.”'+tr('“E viveram felizes para sempre.”')}
  ]},
 {tipo:'escolha', tit:'Character, setting or story event?', fala:'Character, setting or story event. Where does it go on the castle poster?', pergunta:'Where does it go on the castle poster?'+tr('Em que parte do cartaz do castelo fica?'),
  rotulo:'Card', proxRot:'Next card', medio:true, op:['Character','Setting','Story event'], itens:[
   {m:'a queen'+tr('uma rainha'), c:'Character', d:'Royalty are characters.'+tr('A realeza são personagens.')},
   {m:'a dragon'+tr('um dragão'), c:'Character', d:'Magical creatures are characters.'+tr('Criaturas mágicas são personagens.')},
   {m:'an elf'+tr('um elfo'), c:'Character', d:'An elf can be a special helper.'+tr('O elfo pode ser o ajudante especial.')},
   {m:'a castle'+tr('um castelo'), c:'Setting', d:'The castle is in the kingdom: a setting.'+tr('O castelo fica no reino: um cenário.')},
   {m:'a forest'+tr('uma floresta'), c:'Setting', d:'The forest is WHERE the story happens.'+tr('A floresta é ONDE a história acontece.')},
   {m:'a village'+tr('uma vila'), c:'Setting', d:'Kingdom: castle, forest, village.'+tr('Reino: castelo, floresta, vila.')},
   {m:'“Once upon a time…”'+tr('“Era uma vez…”'), c:'Story event', d:'It is the special beginning.'+tr('É o começo especial.')},
   {m:'“And they lived happily ever after.”'+tr('“E viveram felizes para sempre.”'), c:'Story event', d:'It is the special ending.'+tr('É o final especial.')}
  ]}
]},

/* ===================== 2. FAIRY TALES: MAGIC, HELPER, 3 AND 7, LESSON ===================== */
{k:'fairy2', tema:'fairy', nome:'Fairy tales: magic and lesson', nome_pt:'Contos de fadas: magia e lição', cor:'#e879f9',
 treino:[[['fairy'],3,'conceito'],[['fairy'],2,'leitura']], telas:[
 {tipo:'texto', tit:'Magic in fairy tales',
  fala:'Spells, enchantments and curses are magic. Magical objects: a wand, books, foods. Special numbers: threes or sevens.',
  html:R('Spells, enchantments, curses = <b>magic</b>.','Feitiços, encantamentos e maldições = magia.')+
   caixa('Magical objects'+tr('Objetos mágicos'),'<p>wand, books, foods'+tr('varinha, livros, comidas')+'</p>')+
   '<div style="height:10px"></div>'+
   caixa('Special numbers'+tr('Números especiais'),'<p><b>threes</b> or <b>sevens</b>: 3 or 7'+tr('três ou sete')+'</p>')},
 {tipo:'texto', tit:'Good, bad and the special helper',
  fala:'A fairy tale has a good character and a bad character. A special helper helps the good character: a fairy, a godmother, a wizard or an elf. The story has a lesson or moral.',
  html:passos([
    {t:'Good character'+tr('Personagem bom')},
    {t:'×'},
    {t:'Bad character'+tr('Personagem mau')}])+
   R('A <b>special helper</b> helps the good character: fairy, godmother, wizard, elf.','Um ajudante especial ajuda o personagem bom: fada, madrinha, mago, elfo.')+
   R('A fairy tale has <b>a lesson or moral</b>.','O conto de fadas tem uma lição ou moral.')},
 {tipo:'escolha', tit:'Fairy tale words', fala:'Fairy tale words. Which word completes it?', pergunta:'Which word completes it?'+tr('Qual palavra completa?'),
  rotulo:'Sentence', proxRot:'Next sentence', frase:true, itens:[
   {m:'Spells, enchantments, curses = _.', cheia:'Spells, enchantments, curses = <b>magic</b>.', op:['magic','settings'], c:'magic', d:'Spells, enchantments and curses are magic.'+tr('Feitiços, encantamentos e maldições são magia.')},
   {m:'A fairy uses a _ to do magic.', cheia:'A fairy uses a <b>wand</b> to do magic.', op:['wand','village'], c:'wand', d:'The wand is a magical object.'+tr('A varinha é um objeto mágico.')},
   {m:'Special numbers: threes or _.', cheia:'Special numbers: threes or <b>sevens</b>.', op:['sevens','tens'], c:'sevens', d:'The special numbers are 3 and 7.'+tr('Os números especiais são 3 e 7.')},
   {m:'The fairy godmother is a special _.', cheia:'The fairy godmother is a special <b>helper</b>.', op:['helper','ending'], c:'helper', d:'Special helper: fairy, godmother, wizard, elf.'+tr('Ajudante especial: fada, madrinha, mago, elfo.')},
   {m:'A fairy tale has a lesson or _.', cheia:'A fairy tale has a lesson or <b>moral</b>.', op:['moral','castle'], c:'moral', d:'The story teaches us a lesson.'+tr('A história nos ensina uma lição.')},
   {m:'A fairy tale is a _ type of story.', cheia:'A fairy tale is a <b>make-believe</b> type of story.', op:['make-believe','real'], c:'make-believe', d:'Fairy tales are make-believe.'+tr('Contos de fadas são faz de conta.')}
  ]}
]},

/* ===================== 3. REAL OR MAKE-BELIEVE ===================== */
{k:'realmb', tema:'realmb', nome:'Real or make-believe?', nome_pt:'Real ou faz de conta?', cor:'#38bdf8',
 treino:[[['realmb'],3,'rapida'],[['realmb'],2,'conceito']], telas:[
 {tipo:'texto', tit:'Real or make-believe?',
  fala:'Real: a thing, character or story that really exists or can really happen in real life. We can see, touch, or it is true. Make-believe: it is not real or true and cannot really happen in real life. We cannot touch it. It is imagined or invented.',
  html:caixa('Real','<p>A thing, character or story that <b>really exists</b> or <b>can really happen</b> in real life. We can <b>see</b>, <b>touch</b>, or it is <b>TRUE</b>.'+
     tr('Coisa, personagem ou história que existe de verdade ou pode acontecer na vida real. Podemos ver, tocar, ou é VERDADE.')+'</p>')+
   '<div style="height:10px"></div>'+
   caixa('Make-believe','<p>A thing, character or story that is <b>NOT real or true</b> and <b>cannot really happen</b> in real life. We <b>can’t touch</b> it; it is <b>imagined</b> or <b>invented</b>.'+
     tr('Coisa, personagem ou história que NÃO é real nem verdade e não pode acontecer na vida real. Não dá para tocar; é imaginada ou inventada.')+'</p>')},
 {tipo:'revela', tit:'Examples', regra:'Tap each card.'+tr('Toque em cada cartão.'),
  fala:'Real: a dog, a tree, the school, the sun, the story of Anne Frank. Make-believe: superheroes, talking animals, Cinderella, fairy tales.',
  cartoes:[
   {f:'Real', b:'a dog, a tree, the school, the sun, the story of Anne Frank'+tr('um cachorro, uma árvore, a escola, o sol, a história de Anne Frank')},
   {f:'Make-believe'+tr('Faz de conta'), b:'superheroes, talking animals, Cinderella, fairy tales'+tr('super-heróis, animais que falam, Cinderela, contos de fadas')}
  ]},
 {tipo:'escolha', tit:'Real or make-believe?', fala:'Real or make-believe. Is it real or make-believe?', pergunta:'Is it real or make-believe?'+tr('É real ou faz de conta?'),
  rotulo:'Card', proxRot:'Next card', medio:true, op:['Real','Make-believe'], itens:[
   {m:'an alligator in a river'+tr('um jacaré num rio'), c:'Real', d:'Alligators really exist.'+tr('Jacarés existem de verdade.')},
   {m:'an alligator under my bed that talks'+tr('um jacaré debaixo da minha cama que fala'), c:'Make-believe', d:'An alligator is real, but a talking alligator under the bed cannot happen.'+tr('O jacaré é real, mas um jacaré que fala debaixo da cama não pode acontecer.')},
   {m:'Richarlison, the football player'+tr('Richarlison, o jogador de futebol'), c:'Real', d:'He is a real person.'+tr('Ele é uma pessoa de verdade.')},
   {m:'Mew, a Pokémon'+tr('Mew, um Pokémon'), c:'Make-believe', d:'Pokémon are invented.'+tr('Pokémon são inventados.')},
   {m:'Harry Potter', c:'Make-believe', d:'A boy who does magic is invented.'+tr('Um menino que faz magia é inventado.')},
   {m:'the story of Anne Frank'+tr('a história de Anne Frank'), c:'Real', d:'It is a TRUE story.'+tr('É uma história VERDADEIRA.')},
   {m:'Diary of a Wimpy Kid'+tr('Diário de um Banana'), c:'Make-believe', d:'It is an invented story.'+tr('É uma história inventada.')},
   {m:'Cinderella'+tr('Cinderela'), c:'Make-believe', d:'Cinderella is a fairy tale.'+tr('Cinderela é um conto de fadas.')},
   {m:'the sun'+tr('o sol'), c:'Real', d:'We can see the sun.'+tr('Podemos ver o sol.')}
  ]}
]},

/* ===================== 4. CIRCLE STORY ===================== */
{k:'circle', tema:'circle', nome:'Circle story', nome_pt:'História circular', cor:'#fbbf24',
 treino:[[['circle'],3,'conceito'],[['circle'],2,'rapida']], telas:[
 {tipo:'texto', tit:'What is a circle story?',
  fala:'A circle story is a type of story that begins and ends in the same place or with the same thing. Many events happen in the middle, but at the end, the story comes back to the beginning.',
  html:R('A <b>circle story</b> begins and ends in the <b>same place</b> or with the <b>same thing</b>.','História circular começa e termina no mesmo lugar ou com a mesma coisa.')+
   passos([
    {t:'Beginning'+tr('Começo'), s:'The story starts with a cookie.'+tr('Começa com um biscoito.')},
    {t:'Middle'+tr('Meio'), s:'Many events happen.'+tr('Muitos acontecimentos.')},
    {t:'End'+tr('Fim'), s:'The story ends with a cookie again!'+tr('Termina com um biscoito de novo!')}])+
   R('At the end, the story <b>comes back to the beginning</b>.','No fim, a história volta para o começo.')},
 {tipo:'texto', tit:'If You Give a Mouse a Cookie',
  fala:'If You Give a Mouse a Cookie, by Laura Numeroff. Cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape on the refrigerator, milk, and a cookie again.',
  html:R('<b>If You Give a Mouse a Cookie</b> — Laura Numeroff','Se você der um biscoito a um rato')+
   '<div class="pals">'+['cookie','milk','straw','napkin','mirror','scissors','broom','nap','story','drawing','pen','tape','milk','cookie'].map(function(w,i){
     return '<button class="pal" data-f="'+w+'" style="font-size:calc(1rem*var(--fs));min-height:48px"><small>'+(i+1)+'</small>'+w+'</button>';
   }).join('')+'</div>'+
   R('It starts with a <b>cookie</b> and ends with a <b>cookie</b>: a circle!','Começa com biscoito e termina com biscoito: um círculo!')},
 {tipo:'ordena', tit:'Put the story in order', fala:'Put the story in order. Tap the events in order.', regra:'Tap the events in order.'+tr('Toque nos acontecimentos na ordem.'),
  fimMsg:'Well done! It ends with a cookie again.',
  quadros:[
   {cap:'If you give a mouse a cookie…'+tr('Se você der um biscoito a um rato…')},
   {cap:'he will ask for a glass of milk.'+tr('ele vai pedir um copo de leite.')},
   {cap:'He will ask for a straw.'+tr('Ele vai pedir um canudo.')},
   {cap:'He will ask for a napkin.'+tr('Ele vai pedir um guardanapo.')},
   {cap:'He will want to take a nap.'+tr('Ele vai querer tirar uma soneca.')},
   {cap:'He will want to hang his drawing on the refrigerator.'+tr('Ele vai querer pendurar o desenho na geladeira.')},
   {cap:'He will ask for a cookie again!'+tr('Ele vai pedir um biscoito de novo!')}
  ]},
 {tipo:'escolha', tit:'Circle story', fala:'Circle story. Which word completes it?', pergunta:'Which word completes it?'+tr('Qual palavra completa?'),
  rotulo:'Sentence', proxRot:'Next sentence', frase:true, itens:[
   {m:'A circle story begins and ends with the _ thing.', cheia:'A circle story begins and ends with the <b>same</b> thing.', op:['same','last'], c:'same', d:'Same beginning, same end.'+tr('Mesmo começo, mesmo fim.')},
   {m:'Many events happen in the _.', cheia:'Many events happen in the <b>middle</b>.', op:['middle','title'], c:'middle', d:'The middle has many events.'+tr('O meio tem muitos acontecimentos.')},
   {m:'The mouse story starts with a _.', cheia:'The mouse story starts with a <b>cookie</b>.', op:['cookie','broom'], c:'cookie', d:'If You Give a Mouse a Cookie starts with a cookie.'+tr('Começa com um biscoito.')},
   {m:'The mouse story ends with a _.', cheia:'The mouse story ends with a <b>cookie</b>.', op:['cookie','nap'], c:'cookie', d:'It ends with a cookie again.'+tr('Termina com um biscoito de novo.')},
   {m:'At the end, the story comes back to the _.', cheia:'At the end, the story comes back to the <b>beginning</b>.', op:['beginning','castle'], c:'beginning', d:'That is why it is a circle.'+tr('Por isso é um círculo.')}
  ]}
]},

/* ===================== 5. CAUSE AND EFFECT ===================== */
{k:'cause', tema:'cause', nome:'Cause and effect', nome_pt:'Causa e efeito', cor:'#34d399',
 treino:[[['cause'],3,'rapida'],[['cause'],2,'conceito']], telas:[
 {tipo:'texto', tit:'Cause and effect',
  fala:'Cause and effect happen when one thing makes another thing happen. The cause is If. The effect is Then. If you give a dog a donut, then he will want to drink some juice.',
  html:R('<b>Cause</b> and <b>effect</b> happen when one thing makes another thing happen.','Causa e efeito acontecem quando uma coisa faz outra coisa acontecer.')+
   chave([['Cause'+tr('Causa'),'<b>If…</b>'+tr('Se…')],['Effect'+tr('Efeito'),'<b>Then…</b>'+tr('Então…')]])+
   chave([['If…','you give a dog a donut.'+tr('você der um donut a um cachorro.')],['Then…','he’ll want to drink some juice.'+tr('ele vai querer beber suco.')]])},
 {tipo:'pares', tit:'If… Then…', regra:'Tap each cause to see the effect.'+tr('Toque em cada causa para ver o efeito.'),
  fala:'If Ash goes on adventure, then he will find many Pokémon to catch. If Cinderella goes to the ball, then she will lose one of her slippers. If you read books every day, then you will be more intelligent and learn new things.',
  pares:[
   ['If Ash goes on adventure…','Then he will find many Pokémon to catch.'+tr('Então ele vai achar muitos Pokémon para pegar.')],
   ['If Cinderella goes to the ball…','Then she will lose one of her slippers.'+tr('Então ela vai perder um dos sapatinhos.')],
   ['If you read books every day…','Then you will be more intelligent and learn new things.'+tr('Então você vai ficar mais inteligente e aprender coisas novas.')],
   ['If you give a dog a donut…','Then he’ll want to drink some juice.'+tr('Então ele vai querer beber suco.')]
  ]},
 {tipo:'liga', tit:'Match the cause and the effect', regra:'Tap a cause, then its effect.'+tr('Toque numa causa e depois no efeito dela.'),
  fala:'Match each cause with its effect.',
  pares:[
   ['If Ash goes on adventure…','Then he will find many Pokémon.'],
   ['If Cinderella goes to the ball…','Then she will lose a slipper.'],
   ['If you read books every day…','Then you will learn new things.'],
   ['If you give a dog a donut…','Then he’ll want some juice.']
  ]},
 {tipo:'escolha', tit:'Cause or effect?', fala:'Cause or effect. Is this part the cause or the effect?', pergunta:'Is this part the cause or the effect?'+tr('Esta parte é a causa ou o efeito?'),
  rotulo:'Part', proxRot:'Next part', frase:true, op:['Cause','Effect'], itens:[
   {m:'If Ash goes on adventure…', c:'Cause', d:'“If” is the cause.'+tr('“If” é a causa.')},
   {m:'Then she will lose one of her slippers.', c:'Effect', d:'“Then” is the effect.'+tr('“Then” é o efeito.')},
   {m:'If you read books every day…', c:'Cause', d:'Reading books makes you learn: it is the cause.'+tr('Ler livros faz você aprender: é a causa.')},
   {m:'Then he’ll want to drink some juice.', c:'Effect', d:'It happens because of the donut: the effect.'+tr('Acontece por causa do donut: o efeito.')},
   {m:'If you give a mouse a cookie…', c:'Cause', d:'The cookie makes the mouse ask for milk: the cause.'+tr('O biscoito faz o rato pedir leite: a causa.')},
   {m:'Then he will find many Pokémon to catch.', c:'Effect', d:'“Then” shows what happens: the effect.'+tr('“Then” mostra o que acontece: o efeito.')}
  ]},
 {tipo:'completa', tit:'If or Then?', fala:'If or Then. Complete with If or Then.', regra:'Complete with If or Then.'+tr('Complete com If ou Then.'),
  op:['If','Then'], itens:[
   {m:'_ Cinderella goes to the ball…', cheia:'<b>If</b> Cinderella goes to the ball…', c:'If'},
   {m:'_ she will lose one of her slippers.', cheia:'<b>Then</b> she will lose one of her slippers.', c:'Then'},
   {m:'_ you give a dog a donut…', cheia:'<b>If</b> you give a dog a donut…', c:'If'},
   {m:'_ he’ll want to drink some juice.', cheia:'<b>Then</b> he’ll want to drink some juice.', c:'Then'}
  ]}
]},

/* ===================== 6. POEM AND POETRY ===================== */
{k:'poetry', tema:'poem', nome:'Poem and poetry', nome_pt:'Poema e poesia', cor:'#a78bfa',
 treino:[[['poem'],4,'conceito']], telas:[
 {tipo:'texto', tit:'Poetry and poem',
  fala:'Poetry is the full art. A poem is the text, the paper.',
  html:passos([
    {t:'poetry'+tr('poesia'), s:'the full art'+tr('a arte inteira')},
    {t:'poem'+tr('poema'), s:'the text / paper'+tr('o texto / o papel')}])+
   R('The <b>poem</b> is inside <b>poetry</b>: poetry is the big art, the poem is one text.','O poema está dentro da poesia: a poesia é a arte toda, o poema é um texto.')},
 {tipo:'pares', tit:'Poetry or poem?', regra:'Tap to see.'+tr('Toque para ver.'),
  fala:'Poetry, the full art. Poem, the text on the paper.',
  pares:[['poetry','the full art'],['poem','the text / paper']]},
 {tipo:'escolha', tit:'Poetry or poem?', fala:'Poetry or poem. Which word is it?', pergunta:'Which word is it?'+tr('Qual é a palavra?'),
  rotulo:'Card', proxRot:'Next card', medio:true, op:['poetry','poem'], itens:[
   {m:'the full art'+tr('a arte inteira'), c:'poetry', d:'Poetry is the full art.'+tr('Poesia é a arte inteira.')},
   {m:'the text on the paper'+tr('o texto no papel'), c:'poem', d:'A poem is the text, the paper.'+tr('Poema é o texto, o papel.')},
   {m:'“My Dog” by Lily Bell, on a page'+tr('“My Dog”, de Lily Bell, numa página'), c:'poem', d:'One text on paper is a poem.'+tr('Um texto no papel é um poema.')},
   {m:'the big circle'+tr('o círculo grande'), c:'poetry', d:'Poetry is the big circle; the poem is inside it.'+tr('Poesia é o círculo grande; o poema fica dentro.')}
  ]}
]},

/* ===================== 7. ELEMENTS OF A POEM ===================== */
{k:'poemelem', tema:'poem', nome:'Elements of a poem', nome_pt:'Elementos do poema', cor:'#818cf8',
 treino:[[['poem'],4,'leitura'],[['poem'],1,'conceito']], telas:[
 {tipo:'texto', tit:'Elements of a poem',
  fala:'Elements of a poem: the title, the lines, the stanza, and the author. A stanza is a group of lines.',
  html:R('<b>title</b> · <b>lines</b> · <b>stanza</b> · <b>author</b>','título · versos/linhas · estrofe · autor')+
   R('A <b>stanza</b> is a <b>group of lines</b>.','Estrofe é um grupo de linhas.')+
   R('The poem “animals” by Brian Bilston has <b>31 lines</b> and <b>8 stanzas</b>.','O poema “animals”, de Brian Bilston, tem 31 linhas e 8 estrofes.')},
 {tipo:'texto', tit:'Look at this poem',
  fala:'My Dog, by Lily Bell. The title is My Dog. The author is Lily Bell. This poem has 8 lines and 2 stanzas.',
  html:poema(false)+
   R('Title: <b>My Dog</b> · Author: <b>Lily Bell</b><br>This poem has <b>8 lines</b> and <b>2 stanzas</b>.','Título: My Dog · Autor: Lily Bell. Este poema tem 8 linhas e 2 estrofes.')},
 {tipo:'escolha', tit:'Title, line, stanza or author?', fala:'Title, line, stanza or author. What is it in the poem “My Dog”?', pergunta:'What is it in the poem “My Dog”?'+tr('O que é isto no poema “My Dog”?'),
  rotulo:'Card', proxRot:'Next card', medio:true, op:['title','line','stanza','author'], itens:[
   {m:'My Dog', c:'title', d:'The title is the name of the poem, on top.'+tr('O título é o nome do poema, em cima.')},
   {m:'Lily Bell', c:'author', d:'The author wrote the poem.'+tr('O autor escreveu o poema.')},
   {m:'he loves his ball.', c:'line', d:'One row of words is a line.'+tr('Uma fileira de palavras é uma linha.')},
   {m:'My dog is small, he loves his ball. He runs and plays on sunny days.', c:'stanza', d:'A group of lines is a stanza.'+tr('Um grupo de linhas é uma estrofe.')},
   {m:'and sleeps all night.', c:'line', d:'Just one line.'+tr('Só uma linha.')}
  ]},
 {tipo:'escolha', tit:'Count them', fala:'Count them. Look at “My Dog” again.', pergunta:'Look at “My Dog” again.'+tr('Olhe “My Dog” de novo.'),
  rotulo:'Question', proxRot:'Next question', frase:true, itens:[
   {m:'How many lines does “My Dog” have?'+tr('Quantas linhas tem “My Dog”?'), op:['8','2','4'], c:'8', d:'Count every row of words, not the title or the author: 8.'+tr('Conte cada fileira, sem o título e o autor: 8.')},
   {m:'How many stanzas does “My Dog” have?'+tr('Quantas estrofes tem “My Dog”?'), op:['2','8','1'], c:'2', d:'There are 2 groups of lines.'+tr('São 2 grupos de linhas.')},
   {m:'How many lines are in each stanza?'+tr('Quantas linhas tem cada estrofe?'), op:['4','2','8'], c:'4', d:'Each stanza has 4 lines.'+tr('Cada estrofe tem 4 linhas.')},
   {m:'A stanza is a group of _.'+tr('Estrofe é um grupo de…'), cheia:'A stanza is a group of <b>lines</b>.', op:['lines','poems','authors'], c:'lines', d:'Stanza = a group of lines.'+tr('Estrofe = grupo de linhas.')}
  ]}
]},

/* ===================== 8. RHYME, RHYTHM, IMAGERY ===================== */
{k:'rri', tema:'poem', nome:'Rhyme, rhythm, imagery', nome_pt:'Rima, ritmo, imagens', cor:'#c084fc',
 treino:[[['poem'],3,'conceito'],[['poem'],2,'leitura']], telas:[
 {tipo:'revela', tit:'Other elements of a poem', regra:'Tap each card.'+tr('Toque em cada cartão.'),
  fala:'Rhyme: poems often have words that sound the same at the end of the lines, like cat and hat. Rhythm: poems can have a beat or a pattern when we read them. They often sound like a song. Imagery: poems use words to help us create pictures in our minds.',
  cartoes:[
   {f:'Rhyme'+tr('Rima'), b:'Poems often have words that sound the same at the end of the lines: cat / hat.'+tr('Palavras com o mesmo som no fim das linhas.')},
   {f:'Rhythm'+tr('Ritmo'), b:'Poems can have a beat or a pattern when we read them. They often sound like a song.'+tr('Uma batida ou padrão; parece uma música.')},
   {f:'Imagery'+tr('Imagens'), b:'Poems use words to help us create pictures in our minds.'+tr('Palavras que criam figuras na nossa mente.')}
  ]},
 {tipo:'palavras', tit:'Words that rhyme',
  regra:'These words <b>rhyme</b>: they sound the same at the end.'+tr('Estas palavras rimam: o fim tem o mesmo som.'),
  fala:'Cat, hat. Small, ball. Plays, days. Tight, night.',
  pals:['cat','hat','small','ball','plays','days','tight','night']},
 {tipo:'texto', tit:'Find the rhymes',
  fala:'In My Dog, small rhymes with ball, plays rhymes with days, done rhymes with fun, tight rhymes with night.',
  html:poema(true)+R('small / ball · plays / days · done / fun · tight / night','Pares que rimam no fim das linhas.')},
 {tipo:'escolha', tit:'Rhyme, rhythm or imagery?', fala:'Rhyme, rhythm or imagery. Which element is it?', pergunta:'Which element is it?'+tr('Qual elemento é?'),
  rotulo:'Card', proxRot:'Next card', frase:true, op:['Rhyme','Rhythm','Imagery'], itens:[
   {m:'cat and hat sound the same at the end.'+tr('cat e hat têm o mesmo som no fim.'), c:'Rhyme', d:'Same sound at the end = rhyme.'+tr('Mesmo som no fim = rima.')},
   {m:'The poem has a beat, like a song.'+tr('O poema tem uma batida, como música.'), c:'Rhythm', d:'A beat or a pattern = rhythm.'+tr('Batida ou padrão = ritmo.')},
   {m:'The words make a picture in my mind.'+tr('As palavras fazem uma figura na minha mente.'), c:'Imagery', d:'Pictures in our minds = imagery.'+tr('Figuras na mente = imagens.')},
   {m:'small and ball'+tr('small e ball'), c:'Rhyme', d:'small / ball: same sound at the end.'+tr('Mesmo som no fim.')},
   {m:'I clap when I read it: one, two, one, two.'+tr('Eu bato palmas quando leio: um, dois, um, dois.'), c:'Rhythm', d:'The beat is the rhythm.'+tr('A batida é o ritmo.')},
   {m:'“He curls up tight” – I can see the dog in my mind.'+tr('“He curls up tight” – consigo ver o cachorro na mente.'), c:'Imagery', d:'Words that make pictures = imagery.'+tr('Palavras que fazem figuras = imagens.')}
  ]},
 {tipo:'liga', tit:'Match the rhymes', regra:'Tap a word, then the word that rhymes.'+tr('Toque numa palavra e depois na que rima com ela.'),
  fala:'Match the words that rhyme.',
  pares:[['cat','hat'],['small','ball'],['days','plays'],['night','tight'],['fun','done']]}
]}

];
})();
