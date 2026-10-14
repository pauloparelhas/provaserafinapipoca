/* ============================================================
   ING3_banco.js — BANCO ÚNICO de Inglês (ELA) · 3º trimestre · Y2
   Fonte única: trabalho/3tri_ingles/_roteiro.md (pôster Cause and
   Effect + 6 slides S1–S6). Nada aqui sai do roteiro; exemplos novos
   só treinam o mesmo átomo, no nível de 7–8 anos.

   Usado por: simulado, treininho da teoria e jogo da matéria.

   ANATOMIA
     TEMAS[k] = {nome, nome_pt, cor, emoji}
     ITENS    = {id, tema, tipo, at, p, p_pt, o, o_pt, c, dica, dica_en, ex, ex_pt,
                 [texto, texto_pt, titulo, titulo_pt, autor]}
       tema   fairy | realmb | circle | cause | poem
       tipo   rapida | conceito | leitura
       at     átomos do roteiro treinados (ver _cobertura_banco.md)
       p/p_pt enunciado EN / tradução PT (PT vai atrás da bandeira)
       o/o_pt opções EN / tradução PT, MESMA ordem
       c      sempre 0 — a UI embaralha
       dica   empurrão em PT antes de responder (nunca a resposta)
       dica_en  a mesma dica em inglês simples (tela da prova); a dica PT é a tradução
       ex/ex_pt explicação curta depois de responder
       texto  (leitura) trechinho de história ou CORPO do poema:
              '\n' = troca de linha (line), '\n\n' = troca de estrofe
              (stanza). Título e autor NÃO ficam no texto: vão em
              titulo/autor, para a contagem de lines/stanzas ser exata.
   Poemas: todos ORIGINAIS. O poema "animals" (Brian Bilston) NÃO é
   reproduzido — só os números do slide (31 lines, 8 stanzas).
   ============================================================ */
window.ING3 = (function(){

var TEMAS = {
  fairy:  {nome:'Fairy tales',         nome_pt:'Contos de fadas',            cor:'#f472b6', emoji:'🏰'},
  realmb: {nome:'Real or make-believe',nome_pt:'Real ou faz de conta',       cor:'#38bdf8', emoji:'🦄'},
  circle: {nome:'Circle story',        nome_pt:'História circular',          cor:'#fbbf24', emoji:'🍪'},
  cause:  {nome:'Cause and effect',    nome_pt:'Causa e efeito',             cor:'#34d399', emoji:'➡️'},
  poem:   {nome:'Poems and poetry',    nome_pt:'Poemas e poesia',            cor:'#a78bfa', emoji:'📜'}
};

/* dica_en: a mesma dica em inglês simples (a dica PT vira a tradução atrás da bandeira) */
var DICA_EN={
  "f01":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f02":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f03":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f04":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f05":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f06":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f07":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f08":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f09":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f10":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f11":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f12":"On the castle poster: characters (who), settings (where), story events (what happens).",
  "f13":"Think about what the fairy holds to do magic.",
  "f14":"An object is a thing. It is not a person or a place.",
  "f15":"Royalty: king, queen, prince, princess, knight.",
  "f16":"Magic creatures: fairies, dragons, ogres.",
  "f17":"Special helpers: fairy, godmother, wizard, elf.",
  "f18":"Who uses magic to HELP?",
  "f19":"Remember the list: fairy, godmother, wizard, elf.",
  "f20":"One is a small odd number. The other is the number of days in a week.",
  "f21":"Threes or sevens.",
  "f22":"It is the special start.",
  "f23":"It is the special happy end.",
  "f24":"It is the special start of fairy tales.",
  "f25":"It is the special end of fairy tales.",
  "f26":"Can it happen in real life?",
  "f27":"On the poster: spells, enchantments, curses.",
  "f28":"Beginning, middle and...",
  "f29":"What do we learn at the end?",
  "f30":"Good means nice.",
  "f31":"Bad means not nice.",
  "f32":"Who lives in the castle and wears a crown?",
  "f33":"Are they in real life?",
  "f34":"It is at the top of the castle poster.",
  "f35":"A helper is someone who helps.",
  "f36":"Are there real dragons and real magic?",
  "f50":"What comes first?",
  "f37":"Who solved the problem with magic?",
  "f38":"Who did something mean?",
  "f39":"A setting is WHERE the story happens.",
  "f40":"What did the fairy use to do the magic?",
  "f51":"Royalty: king, queen, prince, princess, knight.",
  "f41":"Count the carrots.",
  "f42":"Can a real rabbit talk?",
  "f43":"What does the story teach?",
  "f44":"Does a carrot really turn into a cake?",
  "f52":"Read the first sentence.",
  "f45":"How many little birds?",
  "f46":"On the poster: spells, enchantments, curses.",
  "f47":"How do fairy tales begin?",
  "f48":"How do fairy tales end?",
  "f49":"Who helped the little birds?",
  "f53":"Beginning, middle, end: which one is last?",
  "f54":"The middle is between the beginning and the end.",
  "r01":"Real is true. It can happen in life. Make-believe is made up.",
  "r02":"Real is true. It can happen in life. Make-believe is made up.",
  "r03":"Real is true. It can happen in life. Make-believe is made up.",
  "r04":"Real is true. It can happen in life. Make-believe is made up.",
  "r05":"Real is true. It can happen in life. Make-believe is made up.",
  "r06":"Real is true. It can happen in life. Make-believe is made up.",
  "r07":"Real is true. It can happen in life. Make-believe is made up.",
  "r08":"Real is true. It can happen in life. Make-believe is made up.",
  "r09":"Real is true. It can happen in life. Make-believe is made up.",
  "r10":"Real is true. It can happen in life. Make-believe is made up.",
  "r11":"Real is true. It can happen in life. Make-believe is made up.",
  "r12":"Real is true. It can happen in life. Make-believe is made up.",
  "r13":"Real is true. It can happen in life. Make-believe is made up.",
  "r14":"Real is true. It can happen in life. Make-believe is made up.",
  "r15":"Real is true. It can happen in life. Make-believe is made up.",
  "r16":"Real is true. It can happen in life. Make-believe is made up.",
  "r17":"Real is true. It can happen in life. Make-believe is made up.",
  "r18":"Real is true. It can happen in life. Make-believe is made up.",
  "r19":"Real is true. It can happen in life. Make-believe is made up.",
  "r20":"Real is true. It can happen in life. Make-believe is made up.",
  "r21":"Real is true. It can happen in life. Make-believe is made up.",
  "r22":"Real is true. It can happen in life. Make-believe is made up.",
  "r23":"Real is true. It can happen in life. Make-believe is made up.",
  "r24":"Real is true. It can happen in life. Make-believe is made up.",
  "r25":"Real is true. It can happen in life. Make-believe is made up.",
  "r26":"Read the blue poster.",
  "r27":"Read the yellow poster.",
  "r28":"We can see, touch...",
  "r29":"The blue poster has a big word.",
  "r30":"NOT real or ___.",
  "r31":"It is a real diary.",
  "r32":"Is a fairy godmother real?",
  "r33":"Which one is made up?",
  "r34":"Which one is true?",
  "r35":"The alligator is real. Can what he does happen?",
  "r36":"Which one is a real person?",
  "r41":"Real means true.",
  "r37":"Can all of this happen in real life?",
  "r38":"Does a dog talk and fly to the moon?",
  "r39":"Can all of this happen in real life?",
  "r40":"Does a frog really turn into a king?",
  "r42":"The cat is real. But what does it do?",
  "c01":"A circle story begins and ends in the same place or with the same thing.",
  "c02":"Many ___ happen in the middle.",
  "c03":"Think of a circle.",
  "c04":"A circle story begins and ends in the same place or with the same thing.",
  "c05":"The circle goes around and comes back to the start.",
  "c06":"Circle STORY.",
  "c28":"What happens in the middle of a circle story?",
  "c29":"Where does the story go back to?",
  "c38":"A circle story begins and ends in the same place or with the same thing.",
  "c39":"Does every story have to go back to the start?",
  "c07":"The author was in the class video.",
  "c41":"Who wrote the book?",
  "c08":"Look at the name of the book.",
  "c09":"It is a circle story: it ends like it began.",
  "c10":"What does it begin with? What does it end with?",
  "c11":"A cookie goes well with...",
  "c12":"What do you drink milk with?",
  "c13":"Think of our class circle: cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape, milk, cookie.",
  "c14":"Think of our class circle: cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape, milk, cookie.",
  "c15":"He cut hair. Hair fell on the floor...",
  "c16":"Think of our class circle: cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape, milk, cookie.",
  "c17":"Paper + crayons = ?",
  "c18":"What do we write our name with?",
  "c19":"What holds paper on the refrigerator?",
  "c20":"What do we keep in the refrigerator?",
  "c21":"How does a circle story end?",
  "c22":"Start with the name of the book.",
  "c23":"What does the story end with?",
  "c24":"Think of our class circle: cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape, milk, cookie.",
  "c25":"Think of our class circle: cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape, milk, cookie.",
  "c26":"Many events happen in the middle.",
  "c30":"Where does it begin? Where does it end?",
  "c31":"Where does it begin? Where does it end?",
  "c32":"Does the last sentence go back to the first?",
  "c33":"What does it begin with? What does it end with?",
  "c34":"Where does it begin? Where does it end?",
  "c35":"Read the first and last sentence.",
  "c36":"The middle is between the beginning and the end.",
  "c37":"Look at the first and last line.",
  "c40":"What comes right after the fish?",
  "e01":"Read the poster.",
  "e02":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e03":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e04":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e05":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e32":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e33":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e14":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e15":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e16":"The book about the mouse and the cookie.",
  "e39":"Look for If... Then...",
  "e06":"What does Ash look for on adventures?",
  "e07":"What does Cinderella lose at the ball?",
  "e08":"What does reading do to your brain?",
  "e09":"He ate. Then he felt thirsty...",
  "e10":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e11":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e12":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e13":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e17":"What does rain do to you?",
  "e18":"What happens to glass on the floor?",
  "e19":"How do you feel without sleep?",
  "e20":"A plant needs water to...",
  "e21":"What does too much candy do to your tummy?",
  "e22":"What do we wear when it is cold?",
  "e40":"A library is a quiet place.",
  "e23":"What melts ice cream?",
  "e24":"What makes a dog happy?",
  "e25":"Who gets a medal?",
  "e26":"Why does the plant get dry?",
  "e31":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "e34":"The book about the mouse.",
  "e27":"What made the window break?",
  "e28":"What happened because of the kick?",
  "e29":"Why did the baby cry?",
  "e30":"What happened because she studied?",
  "e35":"Look for what made him wet.",
  "e36":"What happened at the end?",
  "e37":"Read the second sentence.",
  "e38":"Cause = If... (what makes it happen). Effect = Then... (what happens).",
  "p01":"On the slide: the big pink ball.",
  "p02":"On the slide: the blue ball inside.",
  "p03":"Is the text on the paper the poem or the poetry?",
  "p04":"What is the name of the whole art?",
  "p05":"A stanza is a group of ___.",
  "p06":"Line and stanza: one is alone, the other is a group.",
  "p07":"It is at the top.",
  "p08":"Who wrote it?",
  "p09":"Think of cat and hat.",
  "p10":"Think of clapping while you read.",
  "p11":"Think of a picture in your mind.",
  "p12":"Do they end with the same sound?",
  "p13":"We clap a beat, like a song.",
  "p14":"A picture in your mind.",
  "p15":"Say the words out loud. Do the ends sound the same?",
  "p16":"Say the words out loud. Do the ends sound the same?",
  "p17":"Rhyme is sound, not meaning.",
  "p18":"Play... d___",
  "p19":"Tree... b___",
  "p20":"On the slide: 'this poem has __ lines'.",
  "p21":"On the slide: 'this poem has __ stanzas'.",
  "p22":"The name at the end of the poem, with the arrow 'author'.",
  "p23":"The name at the top, with the arrow 'title'.",
  "p24":"A group of lines = stanza.",
  "p25":"4 + 4 = ?",
  "p49":"A stanza is a group of lines. A space is between the groups.",
  "p50":"One text, on a paper.",
  "p26":"Each row is a line. Do not count the title or the author.",
  "p27":"A stanza is a group of lines. A space is between the groups.",
  "p28":"Look at the end of the last line.",
  "p29":"Each row is a line. Do not count the title or the author.",
  "p30":"A stanza is a group of lines. A space is between the groups.",
  "p31":"The title is at the top.",
  "p32":"The author is a person.",
  "p33":"Look at the end of the lines in stanza 2.",
  "p34":"A stanza is a group of lines. A space is between the groups.",
  "p35":"Each row is a line. Do not count the title or the author.",
  "p36":"Say it out loud. Can you clap it?",
  "p51":"Look at the end of line 2.",
  "p37":"The author is the person who wrote it.",
  "p38":"Frog... l___",
  "p39":"Count only the first group.",
  "p52":"A stanza is a group of lines. A space is between the groups.",
  "p40":"Think of a picture in your mind.",
  "p41":"A stanza is a group of lines. A space is between the groups.",
  "p53":"Look at the end of line 2.",
  "p42":"The title is the name of the poem.",
  "p43":"Each row is a line. Do not count the title or the author.",
  "p44":"Look at the end of the first two lines.",
  "p54":"The author is a person.",
  "p45":"It has lines and rhymes.",
  "p46":"Sweet... tr___",
  "p55":"The name of the poem and who wrote it.",
  "p47":"Look at the end of the last line.",
  "p48":"Say it out loud. Can you clap it?"
};

var ITENS = [];
function Q(tema,tipo,id,at,p,p_pt,o,o_pt,dica,ex,ex_pt,x){
  var it={id:id,tema:tema,tipo:tipo,at:at,p:p,p_pt:p_pt,o:o,o_pt:o_pt,c:0,dica:dica,dica_en:DICA_EN[id],ex:ex,ex_pt:ex_pt};
  if(x){ for(var k in x) it[k]=x[k]; }
  ITENS.push(it);
}

/* =================== T1 · FAIRY TALES (S4) =================== */
var F='fairy';
var SET=['a setting','a character','a story event'], SET_PT=['um cenário (lugar)','um personagem','um acontecimento da história'];
var CHA=['a character','a setting','a story event'], CHA_PT=['um personagem','um cenário (lugar)','um acontecimento da história'];
var EVT=['a story event','a character','a setting'], EVT_PT=['um acontecimento da história','um personagem','um cenário (lugar)'];
var DCLS='No cartaz do castelo: personagens (quem), cenários (onde) e acontecimentos (o que acontece).';

Q(F,'rapida','f01',['F7','F15'],"Is a castle a character, a setting or a story event?","O castelo é um personagem, um cenário ou um acontecimento da história?",SET,SET_PT,DCLS,
 "A castle is a place. Places are settings.","O castelo é um lugar. Lugar é cenário (setting).");
Q(F,'rapida','f02',['F7','F15'],"Is a forest a character, a setting or a story event?","A floresta é um personagem, um cenário ou um acontecimento da história?",SET,SET_PT,DCLS,
 "A forest is a place in the kingdom. It is a setting.","A floresta é um lugar do reino. É um cenário.");
Q(F,'rapida','f03',['F7','F15'],"Is a village a character, a setting or a story event?","A vila é um personagem, um cenário ou um acontecimento da história?",SET,SET_PT,DCLS,
 "A village is a place. It is a setting.","A vila é um lugar. É um cenário.");
Q(F,'rapida','f04',['F7','F15'],"Is a house a character, a setting or a story event?","A casa é um personagem, um cenário ou um acontecimento da história?",SET,SET_PT,DCLS,
 "A house is a place where the story happens. It is a setting.","A casa é um lugar onde a história acontece. É um cenário.");
Q(F,'rapida','f05',['F2','F15'],"Is a king a character, a setting or a story event?","O rei é um personagem, um cenário ou um acontecimento da história?",CHA,CHA_PT,DCLS,
 "A king is royalty. He is a character.","O rei é da realeza. Ele é um personagem.");
Q(F,'rapida','f06',['F2','F15'],"Is a princess a character, a setting or a story event?","A princesa é um personagem, um cenário ou um acontecimento da história?",CHA,CHA_PT,DCLS,
 "A princess is royalty. She is a character.","A princesa é da realeza. Ela é uma personagem.");
Q(F,'rapida','f07',['F2','F15'],"Is a knight a character, a setting or a story event?","O cavaleiro é um personagem, um cenário ou um acontecimento da história?",CHA,CHA_PT,DCLS,
 "A knight is royalty. He is a character.","O cavaleiro faz parte da realeza no cartaz. É um personagem.");
Q(F,'rapida','f08',['F3','F15'],"Is a dragon a character, a setting or a story event?","O dragão é um personagem, um cenário ou um acontecimento da história?",CHA,CHA_PT,DCLS,
 "A dragon is a magical creature. It is a character.","O dragão é uma criatura mágica. É um personagem.");
Q(F,'rapida','f09',['F11','F15'],"Is 'Once upon a time…' a character, a setting or a story event?","'Era uma vez…' é um personagem, um cenário ou um acontecimento da história?",EVT,EVT_PT,DCLS,
 "'Once upon a time…' is the special beginning. It is a story event.","'Era uma vez…' é o começo especial. É um acontecimento da história.");
Q(F,'rapida','f10',['F14','F15'],"Is 'a lesson or moral' a character, a setting or a story event?","'Uma lição ou moral' é um personagem, um cenário ou um acontecimento da história?",EVT,EVT_PT,DCLS,
 "A lesson or moral is a story event.","A lição ou moral é um acontecimento da história.");
Q(F,'rapida','f11',['F13','F15'],"Is a magic spell a character, a setting or a story event?","Um feitiço é um personagem, um cenário ou um acontecimento da história?",EVT,EVT_PT,DCLS,
 "Spells are magic. Magic is a story event.","Feitiço é magia. Magia é acontecimento da história.");
Q(F,'rapida','f12',['F6','F15'],"Is a talking animal a character, a setting or a story event?","Um animal que fala é um personagem, um cenário ou um acontecimento da história?",CHA,CHA_PT,DCLS,
 "Talking animals are characters in fairy tales.","Animais que falam são personagens dos contos de fadas.");
Q(F,'rapida','f13',['F8'],"A wand is…","Uma varinha é…",["a magical object","a setting","a special ending"],["um objeto mágico","um cenário","um final especial"],
 "Pense no que a fada segura para fazer mágica.","A wand is a magical object, like magic books and magic foods.","A varinha é um objeto mágico, como livros e comidas mágicas.");
Q(F,'rapida','f14',['F8'],"Which one is a magical object?","Qual é um objeto mágico?",["a magic wand","a king","a village"],["uma varinha mágica","um rei","uma vila"],
 "Objeto é uma coisa, não uma pessoa nem um lugar.","A magic wand is a magical object.","A varinha mágica é um objeto mágico.");
Q(F,'rapida','f15',['F2'],"Which one is royalty?","Qual é da realeza?",["a queen","a dragon","a forest"],["uma rainha","um dragão","uma floresta"],
 "Realeza: rei, rainha, príncipe, princesa, cavaleiro.","A queen is royalty, like a king, a prince and a princess.","A rainha é da realeza, como o rei, o príncipe e a princesa.");
Q(F,'rapida','f16',['F3'],"Which one is a magical creature?","Qual é uma criatura mágica?",["an ogre","a prince","a castle"],["um ogro","um príncipe","um castelo"],
 "Criaturas mágicas: fadas, dragões, ogros.","An ogre is a magical creature, like fairies and dragons.","O ogro é uma criatura mágica, como as fadas e os dragões.");
Q(F,'rapida','f17',['F5'],"Which one is a special helper?","Qual é um ajudante especial?",["a godmother","an ogre","a village"],["uma fada madrinha","um ogro","uma vila"],
 "Ajudantes especiais: fada, madrinha, mago, elfo.","A godmother is a special helper. She helps the good character.","A madrinha é uma ajudante especial. Ela ajuda o personagem bom.");
Q(F,'rapida','f18',['F5'],"Which one is a special helper?","Qual é um ajudante especial?",["a wizard","a dragon","a house"],["um mago","um dragão","uma casa"],
 "Quem usa mágica para AJUDAR?","A wizard is a special helper.","O mago é um ajudante especial.");
Q(F,'rapida','f19',['F5'],"Which one is a special helper?","Qual é um ajudante especial?",["an elf","a forest","an ogre"],["um elfo","uma floresta","um ogro"],
 "Lembre da lista: fairy, godmother, wizard, elf.","An elf is a special helper.","O elfo é um ajudante especial.");
Q(F,'rapida','f20',['F9'],"Fairy tales often have special numbers. Which ones?","Os contos de fadas costumam ter números especiais. Quais?",["three or seven","two or four","five or ten"],["três ou sete","dois ou quatro","cinco ou dez"],
 "Um é ímpar e pequeno; o outro é o número dos dias da semana.","The special numbers are threes or sevens.","Os números especiais são três ou sete.");
Q(F,'rapida','f21',['F9'],"Which one is a special number in fairy tales?","Qual é um número especial nos contos de fadas?",["seven","four","ten"],["sete","quatro","dez"],
 "Threes or sevens.","Seven is a special number. Three is the other one.","Sete é um número especial. O outro é o três.");
Q(F,'rapida','f22',['F11'],"How does a fairy tale often begin?","Como um conto de fadas costuma começar?",["Once upon a time…","And they lived happily ever after.","Good morning, class!"],["Era uma vez…","E viveram felizes para sempre.","Bom dia, turma!"],
 "É o começo especial.","The special beginning is 'Once upon a time…'.","O começo especial é 'Once upon a time…' (Era uma vez…).");
Q(F,'rapida','f23',['F12'],"How does a fairy tale often end?","Como um conto de fadas costuma terminar?",["And they lived happily ever after.","Once upon a time…","See you tomorrow!"],["E viveram felizes para sempre.","Era uma vez…","Até amanhã!"],
 "É o final especial, feliz.","The special ending is 'And they lived happily ever after.'","O final especial é 'And they lived happily ever after.' (E viveram felizes para sempre.)");
Q(F,'rapida','f24',['F11'],"Complete: 'Once upon a ___…'","Complete: 'Once upon a ___…' (Era uma vez…)",["time","day","house"],["time (vez)","day (dia)","house (casa)"],
 "É o começo especial dos contos.","'Once upon a time…' is the special beginning.","'Once upon a time…' é o começo especial.");
Q(F,'rapida','f25',['F12'],"Complete: 'And they lived happily ever ___.'","Complete: 'And they lived happily ever ___.' (E viveram felizes para sempre.)",["after","night","king"],["after","night (noite)","king (rei)"],
 "É o final especial dos contos.","'And they lived happily ever after.' is the special ending.","'And they lived happily ever after.' é o final especial.");

Q(F,'conceito','f26',['F1','R8'],"A fairy tale is a ___ type of story.","Um conto de fadas é um tipo de história ___.",["make-believe","real","true"],["de faz de conta","real","verdadeira"],
 "Pode acontecer de verdade?","A fairy tale is a make-believe type of story.","O conto de fadas é um tipo de história de faz de conta.");
Q(F,'conceito','f27',['F13'],"Spells, enchantments and curses are…","Feitiços, encantamentos e maldições são…",["magic","settings","royalty"],["magia","cenários","realeza"],
 "No cartaz: spells, enchantments, curses = ?","Spells, enchantments and curses = magic.","Feitiços, encantamentos e maldições = magia.");
Q(F,'conceito','f28',['F10'],"A fairy tale has a beginning, a middle and an ___.","Um conto de fadas tem começo, meio e ___.",["end","castle","king"],["fim","castelo","rei"],
 "Começo, meio e…","Beginning – middle – end.","Começo – meio – fim.");
Q(F,'conceito','f29',['F14'],"What does a fairy tale often teach us?","O que um conto de fadas costuma nos ensinar?",["a lesson or moral","a special number","a new setting"],["uma lição ou moral","um número especial","um cenário novo"],
 "O que a gente aprende no fim?","Fairy tales often teach a lesson or moral.","Os contos de fadas costumam ensinar uma lição ou moral.");
Q(F,'conceito','f30',['F4'],"A good character…","Um personagem bom…",["is kind and helps others","is mean and tells lies","is a castle"],["é gentil e ajuda os outros","é malvado e conta mentiras","é um castelo"],
 "Good = bom.","A good character is kind and helps others.","O personagem bom é gentil e ajuda os outros.");
Q(F,'conceito','f31',['F4'],"A bad character…","Um personagem mau…",["does mean things","helps everyone","is a forest"],["faz maldades","ajuda todo mundo","é uma floresta"],
 "Bad = mau.","A bad character does mean things.","O personagem mau faz maldades.");
Q(F,'conceito','f32',['F2'],"Kings, queens and knights are…","Reis, rainhas e cavaleiros são…",["royalty","settings","magical objects"],["realeza","cenários","objetos mágicos"],
 "Quem mora no castelo e usa coroa?","Kings, queens, princes, princesses and knights are royalty.","Reis, rainhas, príncipes, princesas e cavaleiros são a realeza.");
Q(F,'conceito','f33',['F3'],"Fairies, dragons and ogres are…","Fadas, dragões e ogros são…",["magical creatures","royalty","settings"],["criaturas mágicas","realeza","cenários"],
 "Eles existem de verdade?","Fairies, dragons and ogres are magical creatures.","Fadas, dragões e ogros são criaturas mágicas.");
Q(F,'conceito','f34',['F7'],"Castle, forest and village are places in the…","Castelo, floresta e vila são lugares do…",["kingdom","poem","school"],["reino","poema","escola"],
 "No topo do cartaz do castelo.","Kingdom: castle, forest, village.","Reino: castelo, floresta, vila.");
Q(F,'conceito','f35',['F5'],"A special helper…","Um ajudante especial…",["helps the good character","is always the bad character","is a place"],["ajuda o personagem bom","é sempre o personagem mau","é um lugar"],
 "Helper = ajudante.","A special helper (a fairy, a godmother, a wizard, an elf) helps the good character.","O ajudante especial (fada, madrinha, mago, elfo) ajuda o personagem bom.");
Q(F,'conceito','f36',['F1','R2'],"Can a fairy tale really happen in real life?","Um conto de fadas pode acontecer de verdade?",["No. It is make-believe.","Yes. It is real.","Yes. It is true."],["Não. É faz de conta.","Sim. É real.","Sim. É verdade."],
 "Tem dragão e magia de verdade?","Fairy tales are make-believe. They cannot really happen.","Contos de fadas são faz de conta. Não acontecem de verdade.");
Q(F,'conceito','f50',['F10'],"What is the order of a story?","Qual é a ordem de uma história?",["beginning – middle – end","end – middle – beginning","middle – beginning – end"],["começo – meio – fim","fim – meio – começo","meio – começo – fim"],
 "O que vem primeiro?","A story has a beginning, then a middle, then an end.","A história tem começo, depois meio, depois fim.");

var T1="Once upon a time, a kind princess lived in a big castle. One day, a mean ogre took her golden ball. A fairy godmother waved her wand, and the ball came back. And they lived happily ever after.";
var T1P="Era uma vez uma princesa gentil que morava num castelo grande. Um dia, um ogro malvado pegou a bola de ouro dela. Uma fada madrinha balançou a varinha e a bola voltou. E viveram felizes para sempre.";
Q(F,'leitura','f37',['F5'],"Who is the special helper?","Quem é a ajudante especial?",["the fairy godmother","the mean ogre","the princess"],["a fada madrinha","o ogro malvado","a princesa"],
 "Quem resolveu o problema com mágica?","The fairy godmother helps the princess. She is the special helper.","A fada madrinha ajuda a princesa. Ela é a ajudante especial.",{texto:T1,texto_pt:T1P});
Q(F,'leitura','f38',['F4'],"Who is the bad character?","Quem é o personagem mau?",["the mean ogre","the kind princess","the fairy godmother"],["o ogro malvado","a princesa gentil","a fada madrinha"],
 "Quem fez uma maldade?","The ogre took the ball. He is the bad character.","O ogro pegou a bola. Ele é o personagem mau.",{texto:T1,texto_pt:T1P});
Q(F,'leitura','f39',['F7'],"What is the setting?","Qual é o cenário?",["a big castle","a golden ball","a fairy godmother"],["um castelo grande","uma bola de ouro","uma fada madrinha"],
 "Setting = ONDE a história acontece.","The story happens in a big castle. That is the setting.","A história acontece num castelo grande. Esse é o cenário.",{texto:T1,texto_pt:T1P});
Q(F,'leitura','f40',['F8'],"Which one is the magical object?","Qual é o objeto mágico?",["the wand","the castle","the princess"],["a varinha","o castelo","a princesa"],
 "Com o que a fada fez a mágica?","The wand is the magical object.","A varinha é o objeto mágico.",{texto:T1,texto_pt:T1P});
Q(F,'leitura','f51',['F2'],"Which character is royalty?","Qual personagem é da realeza?",["the princess","the ogre","the fairy godmother"],["a princesa","o ogro","a fada madrinha"],
 "Realeza: rei, rainha, príncipe, princesa, cavaleiro.","The princess is royalty.","A princesa é da realeza.",{texto:T1,texto_pt:T1P});

var T2="Once upon a time, a little rabbit lived in a house in the forest. The rabbit could talk! He had three carrots. A wizard said a spell, and the carrots turned into cakes. The rabbit shared his cakes with his friends. Lesson: it is good to share.";
var T2P="Era uma vez um coelhinho que morava numa casa na floresta. O coelho sabia falar! Ele tinha três cenouras. Um mago fez um feitiço, e as cenouras viraram bolos. O coelho dividiu os bolos com os amigos. Lição: é bom dividir.";
Q(F,'leitura','f41',['F9'],"Which special number is in the story?","Qual número especial aparece na história?",["three","two","ten"],["três","dois","dez"],
 "Conte as cenouras.","He had three carrots. Three is a special number.","Ele tinha três cenouras. Três é número especial.",{texto:T2,texto_pt:T2P});
Q(F,'leitura','f42',['F6','R6'],"The rabbit can talk. He is a…","O coelho sabe falar. Ele é um…",["talking animal","real animal","setting"],["animal que fala","animal real","cenário"],
 "Coelho de verdade fala?","A rabbit that talks is a talking animal. It is make-believe.","Coelho que fala é um animal falante. É faz de conta.",{texto:T2,texto_pt:T2P});
Q(F,'leitura','f43',['F14'],"What is the lesson or moral?","Qual é a lição ou moral?",["It is good to share.","Carrots are orange.","Rabbits live in houses."],["É bom dividir.","Cenouras são laranja.","Coelhos moram em casas."],
 "O que a história ensina?","The lesson is: it is good to share.","A lição é: é bom dividir.",{texto:T2,texto_pt:T2P});
Q(F,'leitura','f44',['F13'],"The wizard said a spell. A spell is…","O mago fez um feitiço. Um feitiço é…",["magic","a setting","a lesson"],["magia","um cenário","uma lição"],
 "Cenoura vira bolo de verdade?","A spell is magic.","Feitiço é magia.",{texto:T2,texto_pt:T2P});
Q(F,'leitura','f52',['F7'],"Where does the rabbit live?","Onde o coelho mora?",["in a house in the forest","in a castle","in a school"],["numa casa na floresta","num castelo","numa escola"],
 "Leia a primeira frase.","He lives in a house in the forest. That is the setting.","Ele mora numa casa na floresta. Esse é o cenário.",{texto:T2,texto_pt:T2P});

var T3="Once upon a time, seven little birds lived in a village. A curse made the birds sleep all day. A kind elf sang a song and woke them up. And they lived happily ever after.";
var T3P="Era uma vez sete passarinhos que moravam numa vila. Uma maldição fez os passarinhos dormirem o dia inteiro. Um elfo bondoso cantou uma música e acordou todos. E viveram felizes para sempre.";
Q(F,'leitura','f45',['F9'],"Which special number is in this story?","Qual número especial aparece nesta história?",["seven","five","two"],["sete","cinco","dois"],
 "Quantos passarinhos?","Seven little birds. Seven is a special number.","Sete passarinhos. Sete é número especial.",{texto:T3,texto_pt:T3P});
Q(F,'leitura','f46',['F13'],"A curse made the birds sleep. A curse is…","Uma maldição fez os passarinhos dormirem. Uma maldição é…",["magic","a character","a happy ending"],["magia","um personagem","um final feliz"],
 "Spells, enchantments, curses = ?","A curse is magic.","Maldição é magia.",{texto:T3,texto_pt:T3P});
Q(F,'leitura','f47',['F11'],"Which words are the special beginning?","Quais palavras são o começo especial?",["Once upon a time","And they lived happily ever after","A kind elf sang a song"],["Era uma vez","E viveram felizes para sempre","Um elfo bondoso cantou uma música"],
 "Como os contos começam?","'Once upon a time' is the special beginning.","'Once upon a time' (Era uma vez) é o começo especial.",{texto:T3,texto_pt:T3P});
Q(F,'leitura','f48',['F12'],"Which words are the special ending?","Quais palavras são o final especial?",["And they lived happily ever after","Once upon a time","seven little birds"],["E viveram felizes para sempre","Era uma vez","sete passarinhos"],
 "Como os contos terminam?","'And they lived happily ever after' is the special ending.","'And they lived happily ever after' é o final especial.",{texto:T3,texto_pt:T3P});
Q(F,'leitura','f49',['F5'],"Who is the special helper?","Quem é o ajudante especial?",["the kind elf","the seven birds","the village"],["o elfo bondoso","os sete passarinhos","a vila"],
 "Quem ajudou os passarinhos?","The kind elf helps the birds. He is the special helper.","O elfo bondoso ajuda os passarinhos. Ele é o ajudante especial.",{texto:T3,texto_pt:T3P});

Q(F,'leitura','f53',['F10','F12'],"Which part is the END of the story?","Qual parte é o FIM da história?",["And they lived happily ever after.","Once upon a time, a kind princess lived in a big castle.","One day, a mean ogre took her golden ball."],["E viveram felizes para sempre.","Era uma vez uma princesa gentil que morava num castelo grande.","Um dia, um ogro malvado pegou a bola de ouro dela."],
 "Beginning – middle – end: qual vem por último?","The end is 'And they lived happily ever after.'","O fim é 'And they lived happily ever after.'",{texto:T1,texto_pt:T1P});
Q(F,'leitura','f54',['F10'],"Which part is the MIDDLE of the story?","Qual parte é o MEIO da história?",["A wizard said a spell, and the carrots turned into cakes.","Once upon a time, a little rabbit lived in a house in the forest.","Lesson: it is good to share."],["Um mago fez um feitiço, e as cenouras viraram bolos.","Era uma vez um coelhinho que morava numa casa na floresta.","Lição: é bom dividir."],
 "O meio fica entre o começo e o fim.","The spell happens in the middle of the story.","O feitiço acontece no meio da história.",{texto:T2,texto_pt:T2P});

/* =================== T2 · REAL OR MAKE-BELIEVE (S2) =================== */
var R='realmb';
var RE=['Real','Make-believe'], RE_PT=['Real','Faz de conta'];
var MB=['Make-believe','Real'], MB_PT=['Faz de conta','Real'];
var DRM='Real existe ou pode acontecer de verdade. Faz de conta é inventado.';
function rm(id,at,real,thing,thing_pt,ex,ex_pt){
  Q(R,'rapida',id,at,"Is "+thing+" real or make-believe?",thing_pt.charAt(0).toUpperCase()+thing_pt.slice(1)+" é real ou faz de conta?",real?RE:MB,real?RE_PT:MB_PT,DRM,ex,ex_pt);
}
rm('r01',['R3'],1,"a dog","um cachorro","A dog really exists. We can see and touch it.","O cachorro existe de verdade. Dá para ver e tocar.");
rm('r02',['R3'],1,"a tree","uma árvore","A tree really exists. It is real.","A árvore existe de verdade. É real.");
rm('r03',['R3'],1,"the sun","o sol","The sun really exists. We can see it every day.","O sol existe de verdade. A gente vê todo dia.");
rm('r04',['R3'],1,"the school","a escola","The school really exists. It is real.","A escola existe de verdade. É real.");
rm('r05',['R4'],0,"a superhero","um super-herói","Superheroes are imagined or invented. They are make-believe.","Super-heróis são imaginados, inventados. São faz de conta.");
rm('r06',['R4'],0,"Cinderella","a Cinderela","Cinderella is a character from a fairy tale. She is make-believe.","A Cinderela é personagem de conto de fadas. É faz de conta.");
rm('r07',['R4','R6','F6'],0,"a talking animal","um animal que fala","Animals cannot really talk. A talking animal is make-believe.","Animal não fala de verdade. Animal que fala é faz de conta.");
rm('r08',['R4','F1'],0,"a fairy tale","um conto de fadas","Fairy tales are make-believe stories.","Contos de fadas são histórias de faz de conta.");
rm('r09',['R5'],1,"an alligator in a river","um jacaré num rio","Alligators really exist. An alligator in a river is real.","Jacarés existem de verdade. Um jacaré no rio é real.");
rm('r10',['R5'],0,"Harry Potter","o Harry Potter","Harry Potter is an invented story with magic. It is make-believe.","Harry Potter é uma história inventada, com magia. É faz de conta.");
rm('r11',['R5'],1,"a football player in a real game","um jogador de futebol num jogo de verdade","Football players are real people, like Richarlison.","Jogadores de futebol são pessoas de verdade, como o Richarlison.");
rm('r12',['R5'],0,"Mew, a Pokémon","o Mew, um Pokémon","Pokémon are invented. They are make-believe.","Pokémon são inventados. São faz de conta.");
rm('r13',['R3','R5'],1,"the story of Anne Frank","a história de Anne Frank","The story of Anne Frank really happened. It is real and true.","A história de Anne Frank aconteceu de verdade. É real e verdadeira.");
rm('r14',['R5'],0,"the book 'Diary of a Wimpy Kid'","o livro 'Diário de um Banana'","Diary of a Wimpy Kid is an invented story. It is make-believe.","O Diário de um Banana é uma história inventada. É faz de conta.");
rm('r15',['R5','R6'],0,"an alligator that lives under a bed","um jacaré que mora debaixo da cama","Alligators are real, but one living under your bed is invented. Make-believe!","Jacaré é real, mas jacaré morando debaixo da cama é inventado. Faz de conta!");
rm('r16',['R7'],1,"a cat","um gato","A cat really exists. It is real.","O gato existe de verdade. É real.");
rm('r17',['R7'],0,"a flying horse","um cavalo que voa","Horses cannot really fly. It is make-believe.","Cavalo não voa de verdade. É faz de conta.");
rm('r18',['R7','F3'],0,"a dragon","um dragão","Dragons are magical creatures. They are make-believe.","Dragões são criaturas mágicas. São faz de conta.");
rm('r19',['R7'],1,"the moon","a lua","The moon really exists. We can see it at night.","A lua existe de verdade. A gente vê à noite.");
rm('r20',['R7','F3'],0,"a fairy with a magic wand","uma fada com varinha mágica","Fairies are imagined. They are make-believe.","Fadas são imaginadas. São faz de conta.");
rm('r21',['R6'],0,"a dog that can talk","um cachorro que fala","A dog is real, but a dog that talks is make-believe.","Cachorro é real, mas cachorro que fala é faz de conta.");
rm('r22',['R7'],1,"a teacher","uma professora","A teacher is a real person.","A professora é uma pessoa de verdade.");
rm('r23',['R6'],0,"a pig that drives a car","um porco que dirige carro","Pigs cannot really drive. It is make-believe.","Porco não dirige de verdade. É faz de conta.");
rm('r24',['R6'],1,"a cat that sleeps on a mat","um gato que dorme num tapetinho","Cats really sleep on mats. This can really happen.","Gatos dormem em tapetinhos de verdade. Isso pode acontecer.");
rm('r25',['R7'],1,"rain","a chuva","Rain is real. We can see it and touch it.","A chuva é real. Dá para ver e tocar.");

Q(R,'conceito','r26',['R1'],"'Real' is a thing, character or story that…","'Real' é uma coisa, personagem ou história que…",["really exists or can really happen","is imagined or invented","cannot happen in real life"],["existe de verdade ou pode acontecer de verdade","é imaginada ou inventada","não pode acontecer na vida real"],
 "Leia o cartaz azul.","Real = it really exists or can really happen in real life.","Real = existe de verdade ou pode acontecer na vida real.");
Q(R,'conceito','r27',['R2'],"'Make-believe' is a thing, character or story that…","'Faz de conta' é uma coisa, personagem ou história que…",["is imagined or invented","really exists","we can see and touch"],["é imaginada ou inventada","existe de verdade","a gente pode ver e tocar"],
 "Leia o cartaz amarelo.","Make-believe is imagined or invented. It cannot really happen.","Faz de conta é imaginado ou inventado. Não acontece de verdade.");
Q(R,'conceito','r28',['R1'],"Something real is something we can…","Uma coisa real é uma coisa que a gente pode…",["see and touch","only imagine","never find"],["ver e tocar","só imaginar","nunca encontrar"],
 "We can see, touch…","We can see and touch real things.","A gente pode ver e tocar as coisas reais.");
Q(R,'conceito','r29',['R1','R8'],"Something real is something that is…","Uma coisa real é uma coisa que é…",["true","invented","magic"],["verdadeira","inventada","mágica"],
 "No cartaz azul tem uma palavra em letras grandes.","Real is something that is TRUE.","Real é algo VERDADEIRO.");
Q(R,'conceito','r30',['R2','R8'],"A make-believe story is NOT real or…","Uma história de faz de conta NÃO é real nem…",["true","long","funny"],["verdadeira","comprida","engraçada"],
 "NOT real or ___.","Make-believe is NOT real or true.","Faz de conta NÃO é real nem verdadeiro.");
Q(R,'conceito','r31',['R3','R8'],"The story of Anne Frank is real because it…","A história de Anne Frank é real porque…",["really happened","has magic","is about a fairy"],["aconteceu de verdade","tem magia","é sobre uma fada"],
 "É um diário de verdade.","The story of Anne Frank really happened. It is true.","A história de Anne Frank aconteceu de verdade. É verdadeira.");
Q(R,'conceito','r32',['R2','R4'],"Cinderella is make-believe because…","A Cinderela é faz de conta porque…",["her story cannot really happen in real life","she goes to a real school","we can touch her"],["a história dela não pode acontecer na vida real","ela vai a uma escola de verdade","a gente pode tocar nela"],
 "Fada madrinha existe?","Cinderella is an invented character. Her story cannot really happen.","A Cinderela é uma personagem inventada. A história dela não acontece de verdade.");
Q(R,'conceito','r33',['R4'],"Which one is make-believe?","Qual é faz de conta?",["a superhero","a tree","the school"],["um super-herói","uma árvore","a escola"],
 "Qual deles é inventado?","Superheroes are make-believe. Trees and schools are real.","Super-heróis são faz de conta. Árvores e escolas são reais.");
Q(R,'conceito','r34',['R3'],"Which one is real?","Qual é real?",["a dog","a superhero","Cinderella"],["um cachorro","um super-herói","a Cinderela"],
 "Qual existe de verdade?","A dog is real.","O cachorro é real.");
Q(R,'conceito','r35',['R6'],"Which one is make-believe?","Qual é faz de conta?",["an alligator that talks","an alligator in a river","an alligator in the sun"],["um jacaré que fala","um jacaré no rio","um jacaré tomando sol"],
 "O jacaré é real. O que ele faz pode acontecer?","An alligator is real, but an alligator that talks is make-believe.","O jacaré é real, mas jacaré que fala é faz de conta.");
Q(R,'conceito','r36',['R5'],"Which one is real?","Qual é real?",["a football player","a Pokémon","Harry Potter"],["um jogador de futebol","um Pokémon","o Harry Potter"],
 "Qual é uma pessoa de verdade?","A football player, like Richarlison, is a real person.","Um jogador de futebol, como o Richarlison, é uma pessoa de verdade.");
Q(R,'conceito','r41',['R8'],"Which sentence is TRUE?","Qual frase é VERDADEIRA?",["A dog is real.","A superhero is real.","Cinderella is real."],["O cachorro é real.","O super-herói é real.","A Cinderela é real."],
 "Real = true.","A dog is real. Superheroes and Cinderella are make-believe.","O cachorro é real. Super-herói e Cinderela são faz de conta.");

var RQ="Is this story real or make-believe?", RQP="Esta história é real ou faz de conta?";
Q(R,'leitura','r37',['R1','R7'],RQ,RQP,RE,RE_PT,"Tudo isso pode acontecer de verdade?",
 "A dog can really run, eat and sleep. This can really happen. It is real.","Cachorro corre, come e dorme de verdade. Isso pode acontecer. É real.",
 {texto:"Mia has a dog. The dog likes to run in the park. It eats its food and sleeps in the sun.",texto_pt:"A Mia tem um cachorro. O cachorro gosta de correr no parque. Ele come a comida dele e dorme no sol."});
Q(R,'leitura','r38',['R2','R6'],RQ,RQP,MB,MB_PT,"Cachorro fala e voa até a lua?",
 "Dogs cannot talk or fly to the moon. It is make-believe.","Cachorro não fala nem voa até a lua. É faz de conta.",
 {texto:"Max is a dog. Max can talk, and he can fly to the moon. He eats stars for dinner.",texto_pt:"O Max é um cachorro. O Max sabe falar e voa até a lua. Ele come estrelas no jantar."});
Q(R,'leitura','r39',['R1','R7'],RQ,RQP,RE,RE_PT,"Tudo isso pode acontecer de verdade?",
 "Going to school by bus and reading with a teacher can really happen. It is real.","Ir de ônibus para a escola e ler com a professora acontece de verdade. É real.",
 {texto:"Tom goes to school by bus. He reads a book with his teacher. Then he plays with his friends.",texto_pt:"O Tom vai para a escola de ônibus. Ele lê um livro com a professora. Depois brinca com os amigos."});
Q(R,'leitura','r40',['R2','F1'],RQ,RQP,MB,MB_PT,"Sapo vira rei de verdade?",
 "A frog cannot become a king. It is make-believe, like a fairy tale.","Sapo não vira rei. É faz de conta, como um conto de fadas.",
 {texto:"A frog puts on a crown and becomes a king. He lives in a castle with a fairy.",texto_pt:"Um sapo põe uma coroa e vira rei. Ele mora num castelo com uma fada."});
Q(R,'leitura','r42',['R6'],"Which part of the story is make-believe?","Qual parte da história é faz de conta?",["The cat says, 'Good morning!'","Lucas has a cat.","The cat drinks milk."],["O gato diz: 'Bom dia!'","O Lucas tem um gato.","O gato bebe leite."],
 "O gato é real. Mas o que ele faz?","Cats are real, but a cat that talks is make-believe.","Gato é real, mas gato que fala é faz de conta.",
 {texto:"Lucas has a cat. The cat drinks milk. Then the cat says, 'Good morning!'",texto_pt:"O Lucas tem um gato. O gato bebe leite. Depois o gato diz: 'Bom dia!'"});

/* =================== T3 · CIRCLE STORY (S1, S6) =================== */
var C='circle';
var DCI='Circle story começa e termina no mesmo lugar ou com a mesma coisa.';
var DMO='Lembre da roda da sala: cookie, milk, straw, napkin, mirror, scissors, broom, nap, story, drawing, pen, tape, milk, cookie.';
Q(C,'conceito','c01',['C1'],"A circle story begins and ends…","Uma história circular começa e termina…",["in the same place or with the same thing","in two different places","with a song"],["no mesmo lugar ou com a mesma coisa","em dois lugares diferentes","com uma música"],
 DCI,"A circle story begins and ends in the same place or with the same thing.","A história circular começa e termina no mesmo lugar ou com a mesma coisa.");
Q(C,'conceito','c02',['C2'],"In the middle of a circle story…","No meio de uma história circular…",["many events happen","nothing happens","the story ends"],["muitos acontecimentos acontecem","nada acontece","a história termina"],
 "Many ___ happen in the middle.","Many events happen in the middle.","Muitas coisas acontecem no meio.");
Q(C,'conceito','c03',['C3'],"At the end, a circle story…","No fim, a história circular…",["comes back to the beginning","never ends","starts a new story"],["volta para o começo","nunca termina","começa outra história"],
 "Pense numa roda.","At the end, the story comes back to the beginning.","No fim, a história volta para o começo.");
Q(C,'conceito','c04',['C1','C3'],"What is a circle story?","O que é uma história circular?",["A story that ends where it began.","A story with no end.","A poem with rhymes."],["Uma história que termina onde começou.","Uma história sem fim.","Um poema com rimas."],
 DCI,"A circle story ends where it began.","A história circular termina onde começou.");
Q(C,'conceito','c05',['C3'],"Why is it called a CIRCLE story?","Por que se chama história CIRCULAR?",["Because it goes round and comes back to the start.","Because it is about circles.","Because it has three characters."],["Porque dá a volta e retorna ao começo.","Porque é sobre círculos.","Porque tem três personagens."],
 "O círculo dá a volta e chega onde começou.","Like a circle, the story goes round and comes back to the start.","Como um círculo, a história dá a volta e volta ao começo.");
Q(C,'conceito','c06',['C1'],"A circle story is a type of…","A história circular é um tipo de…",["story","poem","song"],["história","poema","música"],
 "Circle STORY.","A circle story is a type of story.","A história circular é um tipo de história.");
Q(C,'conceito','c28',['C2','C8'],"Beginning: the story starts with a cookie. Middle: ___. End: the story ends with a cookie again.","Começo: a história começa com um biscoito. Meio: ___. Fim: a história termina com um biscoito de novo.",["many events happen","the story ends","the cookie is lost"],["muitos acontecimentos acontecem","a história termina","o biscoito some"],
 "O que acontece no meio de uma circle story?","In the middle, many events happen.","No meio, muitas coisas acontecem.");
Q(C,'conceito','c29',['C3','C8'],"In a circle story, the END is like the…","Na história circular, o FIM é parecido com o…",["beginning","middle","title"],["começo","meio","título"],
 "A história volta para onde?","The end comes back to the beginning.","O fim volta para o começo.");
Q(C,'conceito','c38',['C7'],"Which one is a circle story?","Qual é uma história circular?",["A story that starts at home and ends at home.","A story that starts at home and ends at the zoo.","A story with only one event."],["Uma história que começa em casa e termina em casa.","Uma história que começa em casa e termina no zoológico.","Uma história com um acontecimento só."],
 DCI,"It starts and ends in the same place, so it is a circle story.","Começa e termina no mesmo lugar, então é circular.");
Q(C,'conceito','c39',['C7'],"Is every story a circle story?","Toda história é circular?",["No. Only stories that come back to the beginning.","Yes. All stories are circles.","Yes. All fairy tales are circles."],["Não. Só as que voltam para o começo.","Sim. Toda história é um círculo.","Sim. Todo conto de fadas é um círculo."],
 "A história precisa voltar para onde começou.","Only a story that comes back to the beginning is a circle story.","Só é circular a história que volta para o começo.");

Q(C,'rapida','c07',['C4'],"Who wrote 'If You Give a Mouse a Cookie'?","Quem escreveu 'If You Give a Mouse a Cookie'?",["Laura Numeroff","Brian Bilston","Anne Frank"],["Laura Numeroff","Brian Bilston","Anne Frank"],
 "A autora apareceu no vídeo da aula.","The author is Laura Numeroff.","A autora é Laura Numeroff.");
Q(C,'rapida','c41',['C4'],"Laura Numeroff is the ___ of 'If You Give a Mouse a Cookie'.","Laura Numeroff é a ___ de 'If You Give a Mouse a Cookie'.",["author","title","mouse"],["autora","título","ratinha"],
 "Quem escreveu o livro?","Laura Numeroff wrote the book. She is the author.","Laura Numeroff escreveu o livro. Ela é a autora.");
Q(C,'rapida','c08',['C5'],"'If You Give a Mouse a Cookie' starts with…","'If You Give a Mouse a Cookie' começa com…",["a cookie","a broom","a pen"],["um biscoito","uma vassoura","uma caneta"],
 "Olhe o nome do livro.","The story starts with a cookie.","A história começa com um biscoito.");
Q(C,'rapida','c09',['C5'],"'If You Give a Mouse a Cookie' ends with…","'If You Give a Mouse a Cookie' termina com…",["a cookie again","a nap","scissors"],["um biscoito de novo","uma soneca","uma tesoura"],
 "É uma circle story: termina como começou.","The story ends with a cookie again.","A história termina com um biscoito de novo.");
Q(C,'rapida','c10',['C1','C5','C7'],"Is 'If You Give a Mouse a Cookie' a circle story?","'If You Give a Mouse a Cookie' é uma história circular?",["Yes. It starts and ends with a cookie.","No. It ends with a broom.","No. It has no middle."],["Sim. Começa e termina com um biscoito.","Não. Termina com uma vassoura.","Não. Não tem meio."],
 "Com o que começa e com o que termina?","It starts with a cookie and ends with a cookie. It is a circle story.","Começa com biscoito e termina com biscoito. É circular.");
Q(C,'rapida','c11',['C6'],"The mouse gets a cookie. What does he ask for next?","O ratinho ganha um biscoito. O que ele pede depois?",["a glass of milk","a broom","a pen"],["um copo de leite","uma vassoura","uma caneta"],
 "Biscoito combina com…","After the cookie, he wants a glass of milk.","Depois do biscoito, ele quer um copo de leite.");
Q(C,'rapida','c12',['C6'],"After the milk, the mouse wants…","Depois do leite, o ratinho quer…",["a straw","a story","some tape"],["um canudo","uma história","fita adesiva"],
 "Com o que se bebe leite no copo?","After the milk, he wants a straw.","Depois do leite, ele quer um canudo.");
Q(C,'rapida','c13',['C6'],"After the straw, the mouse wants…","Depois do canudo, o ratinho quer…",["a napkin","a cookie","a pillow"],["um guardanapo","um biscoito","um travesseiro"],
 DMO,"After the straw, he wants a napkin.","Depois do canudo, ele quer um guardanapo.");
Q(C,'rapida','c14',['C6'],"Which comes after the napkin?","O que vem depois do guardanapo?",["a mirror","a pen","a nap"],["um espelho","uma caneta","uma soneca"],
 DMO,"After the napkin comes the mirror.","Depois do guardanapo vem o espelho.");
Q(C,'rapida','c15',['C6'],"The mouse uses scissors. Then he wants a…","O ratinho usa a tesoura. Depois ele quer uma…",["broom","cookie","straw"],["vassoura","biscoito","canudo"],
 "Cortou o cabelo, caiu pelo no chão…","After the scissors, he wants a broom to sweep.","Depois da tesoura, ele quer uma vassoura para varrer.");
Q(C,'rapida','c16',['C6'],"After the nap, the mouse asks you to read him a…","Depois da soneca, o ratinho pede para você ler para ele um(a)…",["story","menu","map"],["história","cardápio","mapa"],
 DMO,"He asks you to read him a story.","Ele pede para você ler uma história.");
Q(C,'rapida','c17',['C6'],"Seeing the pictures makes the mouse want paper and crayons to make a…","Ver as figuras faz o ratinho querer papel e giz de cera para fazer um…",["drawing","cake","bed"],["desenho","bolo","cama"],
 "Papel + giz de cera = ?","He wants paper and crayons to make a drawing.","Ele quer papel e giz de cera para fazer um desenho.");
Q(C,'rapida','c18',['C6'],"When he finishes his drawing, the mouse wants to sign his name with a…","Quando termina o desenho, o ratinho quer assinar o nome com uma…",["pen","broom","straw"],["caneta","vassoura","canudo"],
 "Com o que a gente escreve o nome?","He signs his name with a pen.","Ele assina o nome com uma caneta.");
Q(C,'rapida','c19',['C6'],"The mouse hangs his drawing on the refrigerator with…","O ratinho pendura o desenho na geladeira com…",["tape","milk","a napkin"],["fita adesiva","leite","um guardanapo"],
 "O que gruda papel na geladeira?","He uses tape to hang his drawing on the refrigerator.","Ele usa fita adesiva para pendurar o desenho na geladeira.");
Q(C,'rapida','c20',['C6'],"Looking at the refrigerator reminds the mouse of…","Olhar para a geladeira faz o ratinho lembrar de…",["milk","scissors","a broom"],["leite","tesoura","vassoura"],
 "O que fica guardado na geladeira?","The refrigerator reminds him of milk.","A geladeira faz ele lembrar do leite.");
Q(C,'rapida','c21',['C5','C6'],"He drinks milk again. And then he will ask for…","Ele bebe leite de novo. E depois vai pedir…",["a cookie to go with it","a broom to sweep","a nap"],["um biscoito para acompanhar","uma vassoura para varrer","uma soneca"],
 "Como termina uma circle story?","He asks for a cookie again. The story comes back to the beginning.","Ele pede um biscoito de novo. A história volta ao começo.");
Q(C,'rapida','c22',['C6'],"What are the FIRST three things in the story?","Quais são as TRÊS PRIMEIRAS coisas da história?",["cookie → milk → straw","milk → cookie → straw","straw → milk → cookie"],["biscoito → leite → canudo","leite → biscoito → canudo","canudo → leite → biscoito"],
 "Comece pelo nome do livro.","First the cookie, then the milk, then the straw.","Primeiro o biscoito, depois o leite, depois o canudo.");
Q(C,'rapida','c23',['C6'],"What are the LAST three things in the story?","Quais são as TRÊS ÚLTIMAS coisas da história?",["tape → milk → cookie","cookie → milk → straw","pen → nap → broom"],["fita → leite → biscoito","biscoito → leite → canudo","caneta → soneca → vassoura"],
 "A história termina com o quê?","Tape on the refrigerator, then milk, then a cookie again.","Fita na geladeira, depois leite, depois biscoito de novo.");
Q(C,'rapida','c24',['C6'],"Which one comes FIRST in the story?","Qual vem PRIMEIRO na história?",["the scissors","the drawing","the tape"],["a tesoura","o desenho","a fita"],
 DMO,"The scissors come before the drawing and the tape.","A tesoura vem antes do desenho e da fita.");
Q(C,'rapida','c25',['C6'],"Which one comes LAST of these three?","Qual vem POR ÚLTIMO destes três?",["the pen","the broom","the mirror"],["a caneta","a vassoura","o espelho"],
 DMO,"Mirror, then broom, then pen. The pen comes last.","Espelho, depois vassoura, depois caneta. A caneta vem por último.");
Q(C,'rapida','c26',['C2','C6','C8'],"What happens in the middle of the mouse story?","O que acontece no meio da história do ratinho?",["Many events: milk, a nap, a drawing…","The mouse eats the cookie and the story ends.","Nothing happens."],["Muitas coisas: leite, soneca, desenho…","O ratinho come o biscoito e a história acaba.","Nada acontece."],
 "Many events happen in the middle.","Many events happen in the middle.","Muitas coisas acontecem no meio.");

var C1="Lia wakes up in her bed. She goes to school. She plays in the park. She eats dinner. Then she goes back to her bed to sleep.";
var C1P="A Lia acorda na cama dela. Ela vai para a escola. Ela brinca no parque. Ela janta. Depois volta para a cama para dormir.";
var C2="A little bird leaves its nest. It flies over a river and a farm. It finds some food. Then it flies back to its nest.";
var C2P="Um passarinho sai do ninho. Ele voa por cima de um rio e de uma fazenda. Ele encontra comida. Depois volta voando para o ninho.";
var C3="If you give a cat a fish, she will want some water. Then she will want a nap. When she wakes up, she will be hungry. So she will ask for a fish!";
var C3P="Se você der um peixe para uma gata, ela vai querer água. Depois vai querer uma soneca. Quando acordar, vai estar com fome. Então vai pedir um peixe!";
var CQ="Is this a circle story?", CQP="Esta é uma história circular?";
Q(C,'leitura','c30',['C7'],CQ,CQP,["Yes. It begins and ends in her bed.","No. It ends in a different place."],["Sim. Começa e termina na cama dela.","Não. Termina em outro lugar."],
 "Onde começa? Onde termina?","It begins and ends in the same place: her bed. It is a circle story.","Começa e termina no mesmo lugar: a cama. É circular.",{texto:C1,texto_pt:C1P});
Q(C,'leitura','c31',['C7'],CQ,CQP,["Yes. It begins and ends at the nest.","No. It ends at the farm."],["Sim. Começa e termina no ninho.","Não. Termina na fazenda."],
 "Onde começa? Onde termina?","The bird begins and ends at its nest. It is a circle story.","O passarinho começa e termina no ninho. É circular.",{texto:C2,texto_pt:C2P});
Q(C,'leitura','c32',['C7'],CQ,CQP,["No. It does not come back to the beginning.","Yes. It begins and ends with the ball."],["Não. Não volta para o começo.","Sim. Começa e termina com a bola."],
 "A última frase volta para a primeira?","It starts with a ball and ends with lunch at home. It is not a circle story.","Começa com uma bola e termina com o almoço em casa. Não é circular.",
 {texto:"Ben finds a red ball. He kicks it in the park. A dog runs away with the ball. Ben goes home and eats his lunch.",texto_pt:"O Ben acha uma bola vermelha. Ele chuta a bola no parque. Um cachorro sai correndo com a bola. O Ben vai para casa e almoça."});
Q(C,'leitura','c33',['C7'],CQ,CQP,["Yes. It starts and ends with a fish.","No. It ends with a nap."],["Sim. Começa e termina com um peixe.","Não. Termina com uma soneca."],
 "Com o que começa? Com o que termina?","It starts with a fish and ends with a fish. It is a circle story.","Começa com peixe e termina com peixe. É circular.",{texto:C3,texto_pt:C3P});
Q(C,'leitura','c34',['C7'],CQ,CQP,["No. It starts at the beach and ends at the zoo.","Yes. It starts and ends at the beach."],["Não. Começa na praia e termina no zoológico.","Sim. Começa e termina na praia."],
 "Onde começa? Onde termina?","It starts at the beach and ends at the zoo. It is not a circle story.","Começa na praia e termina no zoológico. Não é circular.",
 {texto:"Sam goes to the beach. He swims in the sea. He builds a sand castle. Then he goes to the zoo to see the lions.",texto_pt:"O Sam vai à praia. Ele nada no mar. Ele faz um castelo de areia. Depois vai ao zoológico ver os leões."});
Q(C,'leitura','c35',['C1'],"Where does the story begin and end?","Onde a história começa e termina?",["in her bed","at school","in the park"],["na cama dela","na escola","no parque"],
 "Leia a primeira e a última frase.","It begins and ends in her bed.","Começa e termina na cama dela.",{texto:C1,texto_pt:C1P});
Q(C,'leitura','c36',['C2'],"What happens in the MIDDLE of the story?","O que acontece no MEIO da história?",["It flies over a river and a farm and finds food.","It leaves its nest.","It flies back to its nest."],["Voa por cima do rio e da fazenda e acha comida.","Sai do ninho.","Volta voando para o ninho."],
 "O meio fica entre o começo e o fim.","In the middle, it flies and finds food.","No meio, ele voa e acha comida.",{texto:C2,texto_pt:C2P});
Q(C,'leitura','c37',['C1','C5'],"The story starts with ___ and ends with ___.","A história começa com ___ e termina com ___.",["a fish … a fish","water … a nap","a nap … water"],["um peixe … um peixe","água … uma soneca","uma soneca … água"],
 "Primeira e última frase.","It starts with a fish and ends with a fish.","Começa com peixe e termina com peixe.",{texto:C3,texto_pt:C3P});
Q(C,'leitura','c40',['C7','E7'],"'If you give a cat a fish…' Then…","'Se você der um peixe para uma gata…' Então…",["she will want some water.","she will ask for a fish.","she will be hungry."],["ela vai querer água.","ela vai pedir um peixe.","ela vai ficar com fome."],
 "O que vem logo depois do peixe?","If you give a cat a fish, then she will want some water.","Se você der um peixe, então ela vai querer água.",{texto:C3,texto_pt:C3P});

/* =================== T4 · CAUSE AND EFFECT (P, S6) =================== */
var E='cause';
var DIF='Cause = If… (o que faz acontecer). Effect = Then… (o que acontece).';
Q(E,'conceito','e01',['E1'],"Cause and effect happen when…","Causa e efeito acontecem quando…",["one thing makes another thing happen","two things are the same","a story ends where it began"],["uma coisa faz outra coisa acontecer","duas coisas são iguais","uma história termina onde começou"],
 "Leia o pôster.","Cause and effect happen when one thing makes another thing happen.","Causa e efeito: uma coisa faz outra coisa acontecer.");
Q(E,'conceito','e02',['E2'],"The CAUSE starts with…","A CAUSA começa com…",["If…","Then…","The end"],["If… (Se…)","Then… (Então…)","The end (Fim)"],
 DIF,"Cause = If…","Causa = If… (Se…)");
Q(E,'conceito','e03',['E2'],"The EFFECT starts with…","O EFEITO começa com…",["Then…","If…","Once upon a time"],["Then… (Então…)","If… (Se…)","Once upon a time (Era uma vez)"],
 DIF,"Effect = Then…","Efeito = Then… (Então…)");
Q(E,'conceito','e04',['E1','E2'],"The cause is…","A causa é…",["what makes something happen","what happens because of it","the title of the book"],["o que faz algo acontecer","o que acontece por causa dela","o título do livro"],
 DIF,"The cause makes something happen.","A causa faz algo acontecer.");
Q(E,'conceito','e05',['E1','E2'],"The effect is…","O efeito é…",["what happens because of the cause","what makes something happen","the author of the book"],["o que acontece por causa da causa","o que faz algo acontecer","o autor do livro"],
 DIF,"The effect is what happens.","O efeito é o que acontece.");
Q(E,'conceito','e32',['E2'],"Which word starts the cause?","Qual palavra começa a causa?",["If","Then","And"],["If (Se)","Then (Então)","And (E)"],DIF,"The cause starts with 'If'.","A causa começa com 'If' (Se).");
Q(E,'conceito','e33',['E2'],"Which word starts the effect?","Qual palavra começa o efeito?",["Then","If","Once"],["Then (Então)","If (Se)","Once (Era uma)"],DIF,"The effect starts with 'Then'.","O efeito começa com 'Then' (Então).");
Q(E,'conceito','e14',['E2','E7'],"In the Cause and Effect Chart, 'If…' goes in the column…","No quadro de Causa e Efeito, 'If…' vai na coluna…",["Cause","Effect","Book title"],["Causa","Efeito","Título do livro"],
 DIF,"'If…' goes under Cause.","'If…' vai embaixo de Causa.");
Q(E,'conceito','e15',['E2','E7'],"In the Cause and Effect Chart, 'Then…' goes in the column…","No quadro de Causa e Efeito, 'Then…' vai na coluna…",["Effect","Cause","Book title"],["Efeito","Causa","Título do livro"],
 DIF,"'Then…' goes under Effect.","'Then…' vai embaixo de Efeito.");
Q(E,'conceito','e16',['E7','C4'],"The class used the Cause and Effect Chart with which book?","A turma usou o quadro de Causa e Efeito com qual livro?",["If You Give a Mouse a Cookie","Harry Potter","Diary of a Wimpy Kid"],["If You Give a Mouse a Cookie","Harry Potter","Diário de um Banana"],
 "O livro do ratinho e do biscoito.","The chart was used with 'If You Give a Mouse a Cookie'.","O quadro foi usado com 'If You Give a Mouse a Cookie'.");
Q(E,'conceito','e39',['E1'],"Which sentence shows cause and effect?","Qual frase mostra causa e efeito?",["If you push the swing, then it will go up.","The sky is blue.","I have a red pencil."],["Se você empurrar o balanço, então ele vai subir.","O céu é azul.","Eu tenho um lápis vermelho."],
 "Procure If… Then…","Pushing the swing makes it go up. That is cause and effect.","Empurrar o balanço faz ele subir. Isso é causa e efeito.");

Q(E,'rapida','e06',['E4','E5'],"If Ash goes on adventure… Then…","Se o Ash sair em aventura… Então…",["he will find many Pokémon to catch.","she will lose one of her slippers.","he'll want to drink some juice."],["ele vai achar muitos Pokémon para capturar.","ela vai perder um dos sapatinhos.","ele vai querer beber suco."],
 "O que o Ash procura nas aventuras?","If Ash goes on adventure, then he will find many Pokémon to catch.","Se o Ash sair em aventura, então vai achar muitos Pokémon.");
Q(E,'rapida','e07',['E4','E5'],"If Cinderella goes to the ball… Then…","Se a Cinderela for ao baile… Então…",["she will lose one of her slippers.","he will find many Pokémon to catch.","you will learn new things."],["ela vai perder um dos sapatinhos.","ele vai achar muitos Pokémon.","você vai aprender coisas novas."],
 "O que a Cinderela perde no baile?","If Cinderella goes to the ball, then she will lose one of her slippers.","Se a Cinderela for ao baile, então vai perder um dos sapatinhos.");
Q(E,'rapida','e08',['E4','E5'],"If you read books every day… Then…","Se você ler livros todo dia… Então…",["you will be more intelligent and learn new things.","she will lose one of her slippers.","he'll want to drink some juice."],["você vai ficar mais inteligente e aprender coisas novas.","ela vai perder um dos sapatinhos.","ele vai querer beber suco."],
 "O que a leitura faz com o cérebro?","If you read books every day, then you will learn new things.","Se você ler todo dia, então vai aprender coisas novas.");
Q(E,'rapida','e09',['E4','E5'],"If you give a dog a donut… Then…","Se você der uma rosquinha para um cachorro… Então…",["he'll want to drink some juice.","he will find many Pokémon to catch.","you will be more intelligent."],["ele vai querer beber suco.","ele vai achar muitos Pokémon.","você vai ficar mais inteligente."],
 "Comeu, ficou com sede…","If you give a dog a donut, then he'll want to drink some juice.","Se você der uma rosquinha para o cachorro, então ele vai querer suco.");
Q(E,'rapida','e10',['E3','E4'],"'Then she will lose one of her slippers.' What is the cause?","'Então ela vai perder um dos sapatinhos.' Qual é a causa?",["If Cinderella goes to the ball…","If Ash goes on adventure…","If you read books every day…"],["Se a Cinderela for ao baile…","Se o Ash sair em aventura…","Se você ler livros todo dia…"],
 DIF,"The cause is: If Cinderella goes to the ball.","A causa é: se a Cinderela for ao baile.");
Q(E,'rapida','e11',['E3','E4'],"'If Ash goes on adventure… Then he will find many Pokémon to catch.' Which part is the EFFECT?","'Se o Ash sair em aventura… Então vai achar muitos Pokémon.' Qual parte é o EFEITO?",["Then he will find many Pokémon to catch.","If Ash goes on adventure…"],["Então ele vai achar muitos Pokémon para capturar.","Se o Ash sair em aventura…"],
 DIF,"The effect is the 'Then' part.","O efeito é a parte do 'Then' (Então).");
Q(E,'rapida','e12',['E3','E4'],"'If you read books every day… Then you will learn new things.' Which part is the CAUSE?","'Se você ler todo dia… Então vai aprender coisas novas.' Qual parte é a CAUSA?",["If you read books every day…","Then you will learn new things."],["Se você ler livros todo dia…","Então você vai aprender coisas novas."],
 DIF,"The cause is the 'If' part.","A causa é a parte do 'If' (Se).");
Q(E,'rapida','e13',['E3','E4'],"'If you give a dog a donut… Then he'll want to drink some juice.' Wanting juice is the…","'Se você der uma rosquinha… Então ele vai querer suco.' Querer suco é o…",["effect","cause"],["efeito","causa"],
 DIF,"Wanting juice comes with 'Then'. It is the effect.","Querer suco vem com 'Then'. É o efeito.");
Q(E,'rapida','e17',['E5'],"If it rains… Then…","Se chover… Então…",["you will get wet.","the sun will be hot.","you will eat a cookie."],["você vai se molhar.","o sol vai ficar quente.","você vai comer um biscoito."],
 "O que a chuva faz com você?","If it rains, then you will get wet.","Se chover, então você vai se molhar.");
Q(E,'rapida','e18',['E5'],"If you drop a glass… Then…","Se você deixar um copo cair… Então…",["it will break.","it will fly.","it will sing."],["ele vai quebrar.","ele vai voar.","ele vai cantar."],
 "O que acontece com vidro no chão?","If you drop a glass, then it will break.","Se o copo cair, então vai quebrar.");
Q(E,'rapida','e19',['E5'],"If you don't sleep at night… Then…","Se você não dormir à noite… Então…",["you will be tired.","you will be taller.","you will be a fish."],["você vai ficar cansado.","você vai ficar mais alto.","você vai virar um peixe."],
 "Como você fica sem dormir?","If you don't sleep, then you will be tired.","Se não dormir, então vai ficar cansado.");
Q(E,'rapida','e20',['E5'],"If you water a plant… Then…","Se você regar uma planta… Então…",["it will grow.","it will talk.","it will run away."],["ela vai crescer.","ela vai falar.","ela vai fugir."],
 "Planta precisa de água para…","If you water a plant, then it will grow.","Se regar a planta, então ela vai crescer.");
Q(E,'rapida','e21',['E5'],"If you eat too much candy… Then…","Se você comer doce demais… Então…",["your tummy will hurt.","you will fly.","you will be a king."],["sua barriga vai doer.","você vai voar.","você vai virar rei."],
 "O que doce demais faz com a barriga?","If you eat too much candy, then your tummy will hurt.","Se comer doce demais, então a barriga vai doer.");
Q(E,'rapida','e22',['E5'],"If it is very cold… Then…","Se estiver muito frio… Então…",["you will put on a coat.","you will swim in the sea.","you will wear shorts."],["você vai vestir um casaco.","você vai nadar no mar.","você vai usar bermuda."],
 "O que a gente veste no frio?","If it is very cold, then you will put on a coat.","Se estiver muito frio, então você vai vestir um casaco.");
Q(E,'rapida','e40',['E5'],"If you shout in the library… Then…","Se você gritar na biblioteca… Então…",["people will ask you to be quiet.","the books will fly.","it will rain."],["as pessoas vão pedir silêncio.","os livros vão voar.","vai chover."],
 "Biblioteca é lugar de silêncio.","If you shout in the library, then people will ask you to be quiet.","Se gritar na biblioteca, então vão pedir silêncio.");
Q(E,'rapida','e23',['E6','E3'],"'…Then the ice cream will melt.' Which is the cause? If…","'…Então o sorvete vai derreter.' Qual é a causa? Se…",["the sun is very hot","it is very cold","you put it in the freezer"],["o sol estiver muito quente","estiver muito frio","você puser no congelador"],
 "O que derrete o sorvete?","If the sun is very hot, then the ice cream will melt.","Se o sol estiver muito quente, então o sorvete vai derreter.");
Q(E,'rapida','e24',['E6','E3'],"'…Then the dog will be happy and wag its tail.' Which is the cause? If…","'…Então o cachorro vai ficar feliz e balançar o rabo.' Qual é a causa? Se…",["you play with the dog","you take its bone away","you shout at the dog"],["você brincar com o cachorro","você tirar o osso dele","você gritar com o cachorro"],
 "O que deixa o cachorro feliz?","If you play with the dog, then he will be happy.","Se você brincar com o cachorro, então ele vai ficar feliz.");
Q(E,'rapida','e25',['E6','E3'],"'…Then you will win a medal.' Which is the cause? If…","'…Então você vai ganhar uma medalha.' Qual é a causa? Se…",["you win the race","you stay in bed","you lose the race"],["você vencer a corrida","você ficar na cama","você perder a corrida"],
 "Quem ganha medalha?","If you win the race, then you will win a medal.","Se vencer a corrida, então vai ganhar medalha.");
Q(E,'rapida','e26',['E6','E3'],"'…Then the plant will be dry.' Which is the cause? If…","'…Então a planta vai ficar seca.' Qual é a causa? Se…",["you don't water the plant","you water the plant every day","it rains a lot"],["você não regar a planta","você regar a planta todo dia","chover muito"],
 "Por que a planta seca?","If you don't water the plant, then it will be dry.","Se não regar a planta, então ela vai ficar seca.");
Q(E,'rapida','e31',['E2','E6'],"Complete: 'If you give a mouse a cookie, ___ he'll want a glass of milk.'","Complete: 'Se você der um biscoito a um ratinho, ___ ele vai querer um copo de leite.'",["then","once","ever after"],["then (então)","once (uma vez)","ever after (para sempre)"],
 DIF,"If… then… The effect starts with 'then'.","If… then… O efeito começa com 'then'.");
Q(E,'rapida','e34',['E7','C6'],"If you give a mouse a cookie… Then…","Se você der um biscoito a um ratinho… Então…",["he's going to ask for a glass of milk.","he will lose one of his slippers.","he will find many Pokémon."],["ele vai pedir um copo de leite.","ele vai perder um dos sapatinhos.","ele vai achar muitos Pokémon."],
 "O livro do ratinho.","If you give a mouse a cookie, then he's going to ask for a glass of milk.","Se der um biscoito ao ratinho, então ele vai pedir leite.");

Q(E,'leitura','e27',['E3'],"What is the CAUSE?","Qual é a CAUSA?",["Tom kicked the ball hard.","The window broke."],["O Tom chutou a bola com força.","A janela quebrou."],
 "O que fez a janela quebrar?","Tom kicked the ball hard. That made the window break.","O Tom chutou forte. Isso fez a janela quebrar.",{texto:"Tom kicked the ball hard. The window broke.",texto_pt:"O Tom chutou a bola com força. A janela quebrou."});
Q(E,'leitura','e28',['E3'],"What is the EFFECT?","Qual é o EFEITO?",["The window broke.","Tom kicked the ball hard."],["A janela quebrou.","O Tom chutou a bola com força."],
 "O que aconteceu por causa do chute?","The window broke. That is the effect.","A janela quebrou. Esse é o efeito.",{texto:"Tom kicked the ball hard. The window broke.",texto_pt:"O Tom chutou a bola com força. A janela quebrou."});
Q(E,'leitura','e29',['E3'],"What is the CAUSE?","Qual é a CAUSA?",["The baby was hungry.","The baby cried."],["O bebê estava com fome.","O bebê chorou."],
 "Por que o bebê chorou?","The baby was hungry. That made her cry.","O bebê estava com fome. Isso fez ele chorar.",{texto:"The baby was hungry, so she cried.",texto_pt:"O bebê estava com fome, então chorou."});
Q(E,'leitura','e30',['E3'],"What is the EFFECT?","Qual é o EFEITO?",["She got a good grade.","Mia studied a lot."],["Ela tirou uma nota boa.","A Mia estudou muito."],
 "O que aconteceu porque ela estudou?","She got a good grade. That is the effect.","Ela tirou nota boa. Esse é o efeito.",{texto:"Mia studied a lot, so she got a good grade.",texto_pt:"A Mia estudou muito, então tirou uma nota boa."});
Q(E,'leitura','e35',['E3'],"Why did Lucas get wet?","Por que o Lucas se molhou?",["It rained, and he had no umbrella.","He went to school.","He liked his umbrella."],["Choveu e ele estava sem guarda-chuva.","Ele foi para a escola.","Ele gostava do guarda-chuva."],
 "Procure o que FEZ ele se molhar.","It rained and he had no umbrella. That is the cause.","Choveu e ele estava sem guarda-chuva. Essa é a causa.",
 {texto:"Lucas forgot his umbrella. Then it started to rain. Lucas got all wet.",texto_pt:"O Lucas esqueceu o guarda-chuva. Aí começou a chover. O Lucas ficou todo molhado."});
Q(E,'leitura','e36',['E3'],"What is the EFFECT?","Qual é o EFEITO?",["The seed grew into a big flower.","Ana planted a seed.","Ana watered it every day."],["A semente virou uma flor grande.","A Ana plantou uma semente.","A Ana regou todo dia."],
 "O que aconteceu no fim?","Because Ana watered the seed, it grew. The flower is the effect.","Porque a Ana regou, a semente cresceu. A flor é o efeito.",
 {texto:"Ana planted a seed. She watered it every day. The seed grew into a big flower.",texto_pt:"A Ana plantou uma semente. Ela regou todo dia. A semente virou uma flor grande."});
Q(E,'leitura','e37',['E5'],"If the puppy eats all his food… Then…","Se o cachorrinho comer toda a comida… Então…",["he will want to drink water.","he will go to the ball.","he will lose his slipper."],["ele vai querer beber água.","ele vai ao baile.","ele vai perder o sapatinho."],
 "Leia a segunda frase.","If the puppy eats all his food, then he will want to drink water.","Se o cachorrinho comer tudo, então vai querer beber água.",
 {texto:"The puppy ate all his food. Then he wanted to drink some water.",texto_pt:"O cachorrinho comeu toda a comida. Depois quis beber água."});
Q(E,'leitura','e38',['E3'],"Which part is the CAUSE?","Qual parte é a CAUSA?",["If you are kind to your friends","then they will be kind to you"],["Se você for gentil com os amigos","então eles vão ser gentis com você"],
 DIF,"The cause is the 'If' part.","A causa é a parte do 'If' (Se).",
 {texto:"If you are kind to your friends, then they will be kind to you.",texto_pt:"Se você for gentil com os amigos, então eles vão ser gentis com você."});

/* =================== T5 · POEMS AND POETRY (S3, S5) =================== */
var P='poem';
var POEMAS={
  cat:  {titulo:"My Cat",titulo_pt:"Minha gata",autor:"Lucy Green",
         texto:"My cat is fat,\nshe sleeps on a mat.\nShe likes to play\nall through the day.",
         texto_pt:"Minha gata é gordinha,\nela dorme no tapetinho.\nEla gosta de brincar\no dia inteiro sem parar."},
  sun:  {titulo:"The Sun",titulo_pt:"O sol",autor:"Tom Brown",
         texto:"The sun is up,\nthe sky is blue.\nI wake up fast,\nand so do you.\n\nThe sun goes down,\nthe moon is bright.\nI go to bed\nand say good night.",
         texto_pt:"O sol nasceu,\no céu está azul.\nEu acordo rápido,\ne você também.\n\nO sol se põe,\na lua brilha.\nEu vou para a cama\ne digo boa noite."},
  rain: {titulo:"Rain",titulo_pt:"Chuva",autor:"Mia Rose",
         texto:"Drip, drop, rain\non my window pane.\n\nSplash, splash, play\non a rainy day.\n\nPuddles, big and round,\nI jump up off the ground!",
         texto_pt:"Pinga, pinga, chuva\nno vidro da janela.\n\nSplash, splash, brincar\nnum dia de chuva.\n\nPoças grandes e redondas,\neu pulo do chão!"},
  frog: {titulo:"The Frog",titulo_pt:"O sapo",autor:"Ana Cruz",
         texto:"A little green frog\nsat on a log.\nHe saw a fly\ngo buzzing by.\n\nHe jumped up high,\nup to the sky!\nThen down he came\nto play a game.",
         texto_pt:"Um sapinho verde\nsentou num tronco.\nEle viu uma mosca\npassar zumbindo.\n\nEle pulou bem alto,\naté o céu!\nDepois desceu\npara brincar."},
  beach:{titulo:"At the Beach",titulo_pt:"Na praia",autor:"Sara Moon",
         texto:"Blue waves, white sand,\na pink shell in my hand.\n\nA yellow sun so bright,\na red kite in flight.",
         texto_pt:"Ondas azuis, areia branca,\numa concha rosa na minha mão.\n\nUm sol amarelo tão brilhante,\numa pipa vermelha voando."},
  stars:{titulo:"Stars",titulo_pt:"Estrelas",autor:"Nina Gold",
         texto:"Little stars at night,\nshining very bright.\nOne, two, three,\nthey smile at me.\n\nI close my eyes,\nthe big moon will rise.",
         texto_pt:"Estrelinhas à noite,\nbrilhando bem forte.\nUma, duas, três,\nsorriem para mim.\n\nEu fecho os olhos,\na lua grande vai nascer."},
  ice:  {titulo:"Ice Cream",titulo_pt:"Sorvete",autor:"Leo King",
         texto:"Ice cream, ice cream,\ncold and sweet,\nmy favourite treat\nto eat, eat, eat!",
         texto_pt:"Sorvete, sorvete,\ngelado e doce,\nmeu doce favorito\npara comer, comer, comer!"},
  bike: {titulo:"My Bike",titulo_pt:"Minha bicicleta",autor:"Pedro Alves",
         texto:"I ride my bike\ndown the street.\nRing, ring, ring!\nI pedal with my feet.",
         texto_pt:"Eu ando de bicicleta\nrua abaixo.\nTrim, trim, trim!\nPedalo com os pés."}
};
function po(k){ var x=POEMAS[k]; return {titulo:x.titulo,titulo_pt:x.titulo_pt,autor:x.autor,texto:x.texto,texto_pt:x.texto_pt}; }
var DLIN='Cada linha é uma line. Não conte o título nem o autor.';
var DSTZ='Stanza é um grupo de lines. Os grupos ficam separados por um espaço.';

Q(P,'conceito','p01',['P1'],"Poetry is…","Poetry (poesia) é…",["the full art","the text on a paper","a group of lines"],["a arte inteira","o texto no papel","um grupo de linhas"],
 "No slide: a bola grande rosa.","Poetry = the full art. Poem = the text/paper.","Poetry = a arte inteira. Poem = o texto/papel.");
Q(P,'conceito','p02',['P1'],"A poem is…","Um poem (poema) é…",["the text/paper","the full art","a story with a castle"],["o texto/papel","a arte inteira","uma história com castelo"],
 "No slide: a bola de dentro, azul.","Poem = the text/paper.","Poem = o texto/papel.");
Q(P,'conceito','p03',['P1'],"Lucy wrote some lines with rhymes on a paper. She wrote a…","A Lucy escreveu umas linhas com rima num papel. Ela escreveu um…",["poem","poetry","stanza title"],["poema","poesia","título de estrofe"],
 "O texto no papel é o poem ou a poetry?","The text on the paper is a poem.","O texto no papel é um poema (poem).");
Q(P,'conceito','p04',['P1'],"Writing and reading poems is a beautiful art. The full art is called…","Escrever e ler poemas é uma arte bonita. A arte inteira se chama…",["poetry","poem","line"],["poetry (poesia)","poem (poema)","line (linha)"],
 "The full art = ?","The full art is poetry.","A arte inteira é a poetry (poesia).");
Q(P,'conceito','p05',['P5','P6'],"A stanza is…","Uma stanza (estrofe) é…",["a group of lines","one word","the name of the poem"],["um grupo de linhas","uma palavra","o nome do poema"],
 "Stanza (is a group of ___).","A stanza is a group of lines.","A estrofe é um grupo de linhas.");
Q(P,'conceito','p06',['P6'],"A line is…","Uma line (linha/verso) é…",["one row of words in a poem","a group of stanzas","the person who wrote the poem"],["uma fileira de palavras do poema","um grupo de estrofes","a pessoa que escreveu o poema"],
 "Line × stanza: uma é sozinha, a outra é um grupo.","A line is one row of words. A stanza is a group of lines.","Line é uma fileira de palavras. Stanza é um grupo de lines.");
Q(P,'conceito','p07',['P2'],"The title is…","O title (título) é…",["the name of the poem","the person who wrote it","a group of lines"],["o nome do poema","quem escreveu","um grupo de linhas"],
 "Fica lá em cima.","The title is the name of the poem.","O título é o nome do poema.");
Q(P,'conceito','p08',['P3'],"The author is…","O author (autor) é…",["the person who wrote the poem","the name of the poem","the last line"],["a pessoa que escreveu o poema","o nome do poema","a última linha"],
 "Quem escreveu?","The author is the person who wrote the poem.","O autor é a pessoa que escreveu o poema.");
Q(P,'conceito','p09',['P7','P10'],"Rhyme is when…","Rhyme (rima) é quando…",["words sound the same at the end of the lines","the poem has a beat, like a song","words make pictures in our minds"],["as palavras têm o mesmo som no fim das linhas","o poema tem uma batida, como música","as palavras fazem imagens na cabeça"],
 "Cat / hat.","Rhyme: words that sound the same at the end of the lines, like cat and hat.","Rima: palavras com o mesmo som no fim das linhas, como cat e hat.");
Q(P,'conceito','p10',['P8','P10'],"Rhythm is when…","Rhythm (ritmo) é quando…",["the poem has a beat or a pattern, like a song","words sound the same at the end of the lines","words make pictures in our minds"],["o poema tem uma batida ou um padrão, como música","as palavras têm o mesmo som no fim das linhas","as palavras fazem imagens na cabeça"],
 "Pense em bater palmas lendo.","Rhythm: a beat or a pattern. Poems often sound like a song.","Ritmo: batida ou padrão. Poemas muitas vezes soam como música.");
Q(P,'conceito','p11',['P9','P10'],"Imagery is when…","Imagery (imagens) é quando…",["words help us create pictures in our minds","words sound the same at the end of the lines","the poem has a beat, like a song"],["as palavras ajudam a criar imagens na cabeça","as palavras têm o mesmo som no fim das linhas","o poema tem uma batida, como música"],
 "Image = imagem.","Imagery: words help us create pictures in our minds.","Imagery: as palavras ajudam a criar imagens na mente.");
Q(P,'conceito','p12',['P7','P10'],"Cat and hat are an example of…","Cat e hat são um exemplo de…",["rhyme","rhythm","imagery"],["rima","ritmo","imagens"],
 "Elas terminam com o mesmo som?","Cat and hat sound the same at the end. That is rhyme.","Cat e hat têm o mesmo som no fim. Isso é rima.");
Q(P,'conceito','p13',['P8','P10'],"We read a poem and clap a beat, like a song. The poem has…","A gente lê um poema e bate palmas no ritmo, como música. O poema tem…",["rhythm","rhyme","imagery"],["ritmo","rima","imagens"],
 "Batida = beat.","A beat or a pattern is rhythm.","Batida ou padrão é ritmo.");
Q(P,'conceito','p14',['P9','P10'],"'Big green trees and a yellow sun.' You can see a picture in your mind. This is…","'Árvores verdes grandes e um sol amarelo.' Dá para ver uma imagem na cabeça. Isso é…",["imagery","rhyme","a stanza"],["imagery (imagens)","rhyme (rima)","uma estrofe"],
 "Imagem na mente.","Words that make pictures in our minds are imagery.","Palavras que criam imagens na mente são imagery.");
Q(P,'rapida','p15',['P7'],"Which words rhyme?","Quais palavras rimam?",["cat – hat","cat – dog","cat – cup"],["cat – hat (gato – chapéu)","cat – dog (gato – cachorro)","cat – cup (gato – xícara)"],
 "Fale em voz alta: o fim soa igual?","Cat and hat rhyme: -at, -at.","Cat e hat rimam: -at, -at.");
Q(P,'rapida','p16',['P7'],"Which words rhyme?","Quais palavras rimam?",["sun – fun","sun – moon","sun – sky"],["sun – fun (sol – diversão)","sun – moon (sol – lua)","sun – sky (sol – céu)"],
 "Fale em voz alta: o fim soa igual?","Sun and fun rhyme: -un, -un.","Sun e fun rimam: -un, -un.");
Q(P,'rapida','p17',['P7'],"Which words rhyme?","Quais palavras rimam?",["bed – red","bed – chair","bed – pillow"],["bed – red (cama – vermelho)","bed – chair (cama – cadeira)","bed – pillow (cama – travesseiro)"],
 "Rima é som, não significado.","Bed and red rhyme: -ed, -ed.","Bed e red rimam: -ed, -ed.");
Q(P,'rapida','p18',['P7'],"Which word rhymes with 'play'?","Qual palavra rima com 'play'?",["day","plan","toy"],["day (dia)","plan (plano)","toy (brinquedo)"],
 "Play… d___","Play and day rhyme.","Play e day rimam.");
Q(P,'rapida','p19',['P7'],"Which word rhymes with 'tree'?","Qual palavra rima com 'tree'?",["bee","leaf","train"],["bee (abelha)","leaf (folha)","train (trem)"],
 "Tree… b___","Tree and bee rhyme: -ee, -ee.","Tree e bee rimam: -ee, -ee.");
Q(P,'rapida','p20',['P11','P4'],"The poem 'animals', by Brian Bilston, has how many lines?","O poema 'animals', de Brian Bilston, tem quantas linhas?",["31","8","3"],["31","8","3"],
 "No slide: 'this poem has __ lines'.","The poem 'animals' has 31 lines.","O poema 'animals' tem 31 linhas.");
Q(P,'rapida','p21',['P11','P5'],"The poem 'animals', by Brian Bilston, has how many stanzas?","O poema 'animals', de Brian Bilston, tem quantas estrofes?",["8","31","4"],["8","31","4"],
 "No slide: 'this poem has __ stanzas'.","The poem 'animals' has 8 stanzas.","O poema 'animals' tem 8 estrofes.");
Q(P,'rapida','p22',['P11','P3'],"Who is the author of the poem 'animals'?","Quem é o autor do poema 'animals'?",["Brian Bilston","Laura Numeroff","Anne Frank"],["Brian Bilston","Laura Numeroff","Anne Frank"],
 "O nome que fica no fim do poema, com a seta 'author'.","The author of 'animals' is Brian Bilston.","O autor de 'animals' é Brian Bilston.");
Q(P,'rapida','p23',['P11','P2'],"What is the title of Brian Bilston's poem from class?","Qual é o título do poema de Brian Bilston visto na aula?",["animals","If You Give a Mouse a Cookie","Cinderella"],["animals (animais)","If You Give a Mouse a Cookie","Cinderela"],
 "O nome lá em cima, com a seta 'title'.","The title is 'animals'.","O título é 'animals'.");
Q(P,'rapida','p24',['P6','P11'],"The poem 'animals' has 31 lines and 8 stanzas. Which number tells the GROUPS of lines?","O poema 'animals' tem 31 linhas e 8 estrofes. Qual número conta os GRUPOS de linhas?",["8 stanzas","31 lines"],["8 estrofes","31 linhas"],
 "Grupo de lines = stanza.","Stanzas are groups of lines. There are 8 stanzas.","Estrofes são grupos de linhas. São 8 estrofes.");
Q(P,'rapida','p25',['P4','P6'],"A poem has 2 stanzas. Each stanza has 4 lines. How many lines are there?","Um poema tem 2 estrofes. Cada estrofe tem 4 linhas. Quantas linhas são?",["8","2","4"],["8","2","4"],
 "4 + 4 = ?","4 + 4 = 8 lines.","4 + 4 = 8 linhas.");
Q(P,'rapida','p49',['P5'],"Complete: 'A ___ is a group of lines.'","Complete: 'Um(a) ___ é um grupo de linhas.'",["stanza","title","line"],["stanza (estrofe)","title (título)","line (linha)"],
 DSTZ,"A stanza is a group of lines.","A estrofe é um grupo de linhas.");
Q(P,'rapida','p50',['P1'],"Poem or poetry? 'Lucy wrote a ___ about her cat.'","Poem ou poetry? 'A Lucy escreveu um ___ sobre a gata dela.'",["poem","poetry"],["poem (poema)","poetry (poesia)"],
 "Um texto só, no papel.","One text is a poem. Poetry is the full art.","Um texto é um poem. Poetry é a arte inteira.");

Q(P,'leitura','p26',['P4'],"How many lines does this poem have?","Quantas linhas tem este poema?",["4","1","2"],["4","1","2"],DLIN,"The poem has 4 lines.","O poema tem 4 linhas.",po('cat'));
Q(P,'leitura','p27',['P5'],"How many stanzas does this poem have?","Quantas estrofes tem este poema?",["1","4","2"],["1","4","2"],DSTZ,"All 4 lines are in one group. 1 stanza.","As 4 linhas estão num grupo só. 1 estrofe.",po('cat'));
Q(P,'leitura','p28',['P7'],"Which word rhymes with 'play' in the poem?","Qual palavra rima com 'play' no poema?",["day","cat","sleeps"],["day","cat","sleeps"],"Olhe o fim da última linha.","Play and day rhyme.","Play e day rimam.",po('cat'));
Q(P,'leitura','p29',['P4'],"How many lines does this poem have?","Quantas linhas tem este poema?",["8","2","4"],["8","2","4"],DLIN,"4 + 4 = 8 lines.","4 + 4 = 8 linhas.",po('sun'));
Q(P,'leitura','p30',['P5'],"How many stanzas does this poem have?","Quantas estrofes tem este poema?",["2","8","4"],["2","8","4"],DSTZ,"There are 2 groups of lines. 2 stanzas.","São 2 grupos de linhas. 2 estrofes.",po('sun'));
Q(P,'leitura','p31',['P2'],"What is the title of the poem?","Qual é o título do poema?",["The Sun","Tom Brown","Good Night"],["The Sun (O sol)","Tom Brown","Good Night (Boa noite)"],"O título fica em cima.","The title is 'The Sun'.","O título é 'The Sun'.",po('sun'));
Q(P,'leitura','p32',['P3'],"Who is the author of the poem?","Quem é o autor do poema?",["Tom Brown","The Sun","The Moon"],["Tom Brown","The Sun (O sol)","The Moon (A lua)"],"O autor é uma pessoa.","The author is Tom Brown.","O autor é Tom Brown.",po('sun'));
Q(P,'leitura','p33',['P7'],"Which word rhymes with 'bright'?","Qual palavra rima com 'bright'?",["night","bed","down"],["night","bed","down"],"Olhe o fim das linhas da 2ª estrofe.","Bright and night rhyme.","Bright e night rimam.",po('sun'));
Q(P,'leitura','p34',['P5'],"How many stanzas does this poem have?","Quantas estrofes tem este poema?",["3","6","2"],["3","6","2"],DSTZ,"There are 3 groups of 2 lines. 3 stanzas.","São 3 grupos de 2 linhas. 3 estrofes.",po('rain'));
Q(P,'leitura','p35',['P4'],"How many lines does this poem have?","Quantas linhas tem este poema?",["6","3","2"],["6","3","2"],DLIN,"2 + 2 + 2 = 6 lines.","2 + 2 + 2 = 6 linhas.",po('rain'));
Q(P,'leitura','p36',['P8'],"'Drip, drop… Splash, splash…' The poem has a beat when we read it, like a song. This is…","'Drip, drop… Splash, splash…' O poema tem uma batida quando a gente lê, como música. Isso é…",["rhythm","imagery","a title"],["rhythm (ritmo)","imagery (imagens)","um título"],"Batida = beat.","A beat or a pattern is rhythm.","Batida ou padrão é ritmo.",po('rain'));
Q(P,'leitura','p51',['P7'],"Which word rhymes with 'rain'?","Qual palavra rima com 'rain'?",["pane","drop","day"],["pane (vidro)","drop (gota)","day (dia)"],"Olhe o fim da 2ª linha.","Rain and pane rhyme.","Rain e pane rimam.",po('rain'));
Q(P,'leitura','p37',['P3'],"Who is the author of the poem?","Quem é o autor do poema?",["Ana Cruz","The Frog","A little green frog"],["Ana Cruz","The Frog (O sapo)","A little green frog (Um sapinho verde)"],"O autor é quem escreveu.","The author is Ana Cruz.","A autora é Ana Cruz.",po('frog'));
Q(P,'leitura','p38',['P7'],"Which word rhymes with 'frog'?","Qual palavra rima com 'frog'?",["log","fly","sky"],["log (tronco)","fly (mosca)","sky (céu)"],"Frog… l___","Frog and log rhyme.","Frog e log rimam.",po('frog'));
Q(P,'leitura','p39',['P4','P6'],"How many lines are in the FIRST stanza?","Quantas linhas tem a PRIMEIRA estrofe?",["4","8","2"],["4","8","2"],"Conte só o primeiro grupo.","The first stanza has 4 lines.","A primeira estrofe tem 4 linhas.",po('frog'));
Q(P,'leitura','p52',['P5','P6'],"This poem has 8 lines. How many stanzas does it have?","Este poema tem 8 linhas. Quantas estrofes ele tem?",["2","8","4"],["2","8","4"],DSTZ,"8 lines in 2 groups: 2 stanzas.","8 linhas em 2 grupos: 2 estrofes.",po('frog'));
Q(P,'leitura','p40',['P9'],"'Blue waves, white sand' helps you see a picture in your mind. This is…","'Ondas azuis, areia branca' ajuda a ver uma imagem na cabeça. Isso é…",["imagery","rhyme","rhythm"],["imagery (imagens)","rhyme (rima)","rhythm (ritmo)"],"Imagem na mente.","Words that make pictures in our minds are imagery.","Palavras que criam imagens na mente são imagery.",po('beach'));
Q(P,'leitura','p41',['P5'],"How many stanzas does this poem have?","Quantas estrofes tem este poema?",["2","4","1"],["2","4","1"],DSTZ,"There are 2 groups of lines. 2 stanzas.","São 2 grupos de linhas. 2 estrofes.",po('beach'));
Q(P,'leitura','p53',['P7'],"Which word rhymes with 'sand'?","Qual palavra rima com 'sand'?",["hand","shell","sun"],["hand (mão)","shell (concha)","sun (sol)"],"Olhe o fim da 2ª linha.","Sand and hand rhyme.","Sand e hand rimam.",po('beach'));
Q(P,'leitura','p42',['P2'],"What is the title of the poem?","Qual é o título do poema?",["Stars","Nina Gold","The Moon"],["Stars (Estrelas)","Nina Gold","The Moon (A lua)"],"O título é o nome do poema.","The title is 'Stars'.","O título é 'Stars'.",po('stars'));
Q(P,'leitura','p43',['P4'],"How many lines does this poem have?","Quantas linhas tem este poema?",["6","2","4"],["6","2","4"],DLIN,"4 + 2 = 6 lines.","4 + 2 = 6 linhas.",po('stars'));
Q(P,'leitura','p44',['P7'],"Which pair of words rhymes in the poem?","Qual par de palavras rima no poema?",["night – bright","stars – night","eyes – moon"],["night – bright","stars – night","eyes – moon"],"Olhe o fim das duas primeiras linhas.","Night and bright rhyme.","Night e bright rimam.",po('stars'));
Q(P,'leitura','p54',['P3'],"Who is the author of the poem?","Quem é o autor do poema?",["Nina Gold","Stars","Little stars"],["Nina Gold","Stars (Estrelas)","Little stars (Estrelinhas)"],"O autor é uma pessoa.","The author is Nina Gold.","A autora é Nina Gold.",po('stars'));
Q(P,'leitura','p45',['P1'],"This text, on a paper, is a…","Este texto, num papel, é um…",["poem","circle story","fairy tale"],["poema","história circular","conto de fadas"],"Tem lines e rimas.","It has lines and rhymes. It is a poem.","Tem linhas e rimas. É um poema.",po('ice'));
Q(P,'leitura','p46',['P7'],"Which word rhymes with 'sweet'?","Qual palavra rima com 'sweet'?",["treat","cold","cream"],["treat (gostosura)","cold (gelado)","cream (creme)"],"Sweet… tr___","Sweet and treat rhyme.","Sweet e treat rimam.",po('ice'));
Q(P,'leitura','p55',['P2','P3'],"'Ice Cream' is the ___ and 'Leo King' is the ___.","'Ice Cream' é o ___ e 'Leo King' é o ___.",["title … author","author … title","stanza … line"],["título … autor","autor … título","estrofe … linha"],"O nome do poema e quem escreveu.","'Ice Cream' is the title. Leo King is the author.","'Ice Cream' é o título. Leo King é o autor.",po('ice'));
Q(P,'leitura','p47',['P7'],"Which word rhymes with 'street'?","Qual palavra rima com 'street'?",["feet","bike","ring"],["feet (pés)","bike (bicicleta)","ring (trim)"],"Olhe o fim da última linha.","Street and feet rhyme.","Street e feet rimam.",po('bike'));
Q(P,'leitura','p48',['P8'],"'Ring, ring, ring!' gives the poem a beat. This is…","'Ring, ring, ring!' dá uma batida ao poema. Isso é…",["rhythm","a title","an author"],["rhythm (ritmo)","um título","um autor"],"Batida = beat.","A beat is rhythm.","Batida é ritmo.",po('bike'));

function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

return {TEMAS:TEMAS, ITENS:ITENS, POEMAS:POEMAS,
  doTema:function(k){ return ITENS.filter(function(i){ return i.tema===k; }); },
  /* sorteia n itens dos temas pedidos (opcional: só de um tipo) */
  sorteia:function(temas,n,tipo){
    if(typeof temas==='string') temas=[temas];
    var pool=ITENS.filter(function(i){ return temas.indexOf(i.tema)>=0 && (!tipo||i.tipo===tipo); });
    return embaralha(pool).slice(0,n);
  }};
})();
