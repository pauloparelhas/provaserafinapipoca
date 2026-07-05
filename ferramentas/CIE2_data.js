/* ============================================================
   CIE2_data.js — banco UNICO de classificacao (Ciencias 2tri)
   Compartilhado por CIE2_dragdrop.html (Sort it!) e CIE2_popit.html
   (Pop it!). Antes era copy-paste nos dois arquivos; agora 1 fonte.
   Estrutura: GAMES[] = jogos; cada jogo = cols (categorias) +
   cards ({en,pt,col}) + info/tip bilíngues.
   Conteudo 100%% derivado de trabalho/2tri_ciencias/_roteiro.md.
   ============================================================ */
const GAMES = [
 { key:'props', emo:"\u{1F9CA}",
   en:"States — Properties", pt:"Estados — Propriedades",
   info:"Drag each clue to the right state.", infopt:"Arraste cada pista para o estado certo.",
   tip:"Solid keeps its shape · Liquid takes the shape of its cup · Gas spreads out everywhere.",
   tippt:"Sólido mantém a forma · Líquido toma a forma do copo · Gás se espalha por tudo.",
   cols:[{id:'solid',en:'Solid',pt:'Sólido',emo:"\u{1F9CA}",co:'#38bdf8'},{id:'liquid',en:'Liquid',pt:'Líquido',emo:"\u{1F4A7}",co:'#34d399'},{id:'gas',en:'Gas',pt:'Gás',emo:"\u{1F4A8}",co:'#c084fc'}],
   cards:[
     {en:"Keeps its shape",pt:"Mantém a forma",col:'solid'},
     {en:"Particles packed tightly together",pt:"Partículas bem juntinhas",col:'solid'},
     {en:"Particles only vibrate in place",pt:"Partículas só vibram no lugar",col:'solid'},
     {en:"Takes the shape of its container",pt:"Toma a forma do recipiente",col:'liquid'},
     {en:"Can flow and be poured",pt:"Flui e pode ser derramado",col:'liquid'},
     {en:"Particles slide around each other",pt:"Partículas escorregam umas nas outras",col:'liquid'},
     {en:"Spreads out to fill the space",pt:"Espalha-se para encher o espaço",col:'gas'},
     {en:"Can be squeezed (compressed)",pt:"Pode ser comprimido (apertado)",col:'gas'},
     {en:"Particles are far apart and move freely",pt:"Partículas afastadas e livres",col:'gas'}
   ] },
 { key:'particles', emo:"\u{1F7E6}",
   en:"Particles — Arrangement", pt:"Partículas — Arranjo",
   info:"How do the tiny particles sit and move?", infopt:"Como as partículas ficam e se movem?",
   tip:"The more 'stuck' the particles, the firmer the matter. Solid = packed & still · Liquid = together but sliding · Gas = far apart & flying.",
   tippt:"Quanto mais 'presas' as partículas, mais firme a matéria. Sólido = juntas e paradas · Líquido = juntas escorregando · Gás = soltas e voando.",
   cols:[{id:'solid',en:'Solid',pt:'Sólido',emo:"\u{1F9CA}",co:'#38bdf8'},{id:'liquid',en:'Liquid',pt:'Líquido',emo:"\u{1F4A7}",co:'#34d399'},{id:'gas',en:'Gas',pt:'Gás',emo:"\u{1F4A8}",co:'#c084fc'}],
   cards:[
     {en:"Packed tightly in a fixed arrangement",pt:"Bem juntas e fixas no lugar",col:'solid'},
     {en:"Vibrate but cannot leave their place",pt:"Vibram mas não saem do lugar",col:'solid'},
     {en:"Slide past each other freely",pt:"Escorregam livremente umas pelas outras",col:'liquid'},
     {en:"Move and slide, with no fixed arrangement",pt:"Movem e deslizam, sem arranjo fixo",col:'liquid'},
     {en:"Far apart and free-floating",pt:"Afastadas e flutuando soltas",col:'gas'},
     {en:"Move fast and collide",pt:"Movem rápido e colidem",col:'gas'}
   ] },
 { key:'light', emo:"\u{1F4A1}",
   en:"Light — See-through?", pt:"Luz — Dá para ver?",
   info:"How much light passes through?", infopt:"Quanta luz passa através?",
   tip:"Transparent = you see ALL · Translucent = you see a LITTLE · Opaque = you see NOTHING.",
   tippt:"Transparente = vejo TUDO · Translúcido = vejo um POUCO · Opaco = vejo NADA.",
   cols:[{id:'transparent',en:'Transparent',pt:'Transparente',emo:"\u{1F50D}",co:'#22d3ee'},{id:'translucent',en:'Translucent',pt:'Translúcido',emo:"\u{1F327}️",co:'#fbbf24'},{id:'opaque',en:'Opaque',pt:'Opaco',emo:"\u{1F9F1}",co:'#94a3b8'}],
   cards:[
     {en:"Lets all light pass through",pt:"Deixa passar toda a luz",col:'transparent'},
     {en:"Water",pt:"Água",col:'transparent'},
     {en:"Window glass",pt:"Vidro da janela",col:'transparent'},
     {en:"Lets some light pass through",pt:"Deixa passar um pouco de luz",col:'translucent'},
     {en:"Apple juice",pt:"Suco de maçã",col:'translucent'},
     {en:"Lets no light pass through",pt:"Não deixa passar luz",col:'opaque'},
     {en:"Milk",pt:"Leite",col:'opaque'},
     {en:"A wooden door",pt:"Uma porta de madeira",col:'opaque'}
   ] },
 { key:'absorb', emo:"\u{1F9FD}",
   en:"Absorb or Repel?", pt:"Absorve ou Repele?",
   info:"Does it drink the water in, or does water roll off?", infopt:"Puxa a água para dentro, ou a água escorre?",
   tip:"Absorbs = drinks the water in (gets wet) · Repels = water rolls off (stays dry).",
   tippt:"Absorve = puxa a água para dentro (fica molhado) · Repele = a água escorre (fica seco).",
   cols:[{id:'absorbs',en:'Absorbs',pt:'Absorve',emo:"\u{1F4A6}",co:'#38bdf8'},{id:'repels',en:'Repels',pt:'Repele',emo:"\u{1F6E1}️",co:'#fb923c'}],
   cards:[
     {en:"Paper",pt:"Papel",col:'absorbs'},
     {en:"Blanket",pt:"Cobertor",col:'absorbs'},
     {en:"Sponge",pt:"Esponja",col:'absorbs'},
     {en:"Soil",pt:"Terra",col:'absorbs'},
     {en:"Rain jacket",pt:"Capa de chuva",col:'repels'},
     {en:"Glass window",pt:"Vidro da janela",col:'repels'},
     {en:"Marble",pt:"Bolinha de gude",col:'repels'},
     {en:"Duck feather",pt:"Pena de pato",col:'repels'}
   ] },
 { key:'examples', emo:"\u{1F3AF}",
   en:"Examples — Which state?", pt:"Exemplos — Qual estado?",
   info:"Sort each real thing into solid, liquid or gas.", infopt:"Classifique cada coisa real em sólido, líquido ou gás.",
   tip:"The same water can be ice (solid), water (liquid) or steam (gas)!",
   tippt:"A mesma água pode ser gelo (sólido), água (líquido) ou vapor (gás)!",
   cols:[{id:'solid',en:'Solid',pt:'Sólido',emo:"\u{1F9CA}",co:'#38bdf8'},{id:'liquid',en:'Liquid',pt:'Líquido',emo:"\u{1F4A7}",co:'#34d399'},{id:'gas',en:'Gas',pt:'Gás',emo:"\u{1F4A8}",co:'#c084fc'}],
   cards:[
     {en:"Ice cube",pt:"Cubo de gelo",col:'solid'},
     {en:"Pencil",pt:"Lápis",col:'solid'},
     {en:"Rock",pt:"Pedra",col:'solid'},
     {en:"Rain",pt:"Chuva",col:'liquid'},
     {en:"Tea",pt:"Chá",col:'liquid'},
     {en:"Milk",pt:"Leite",col:'liquid'},
     {en:"Steam",pt:"Vapor",col:'gas'},
     {en:"Water vapour",pt:"Vapor d'água",col:'gas'},
     {en:"The air around us",pt:"O ar à nossa volta",col:'gas'}
   ] },
 { key:'change', emo:"\u{1F321}️",
   en:"Heating or Cooling?", pt:"Aquecer ou Esfriar?",
   info:"Does it need heat (warmer) or cold (cooler)?", infopt:"Precisa de calor (mais quente) ou frio (mais frio)?",
   tip:"Heat melts and boils · Cold freezes. Ice → water → steam when heated; back to ice when cooled.",
   tippt:"O calor derrete e ferve · O frio congela. Gelo → água → vapor com calor; volta a gelo com frio.",
   cols:[{id:'heat',en:'When you HEAT it',pt:'Quando AQUECE',emo:"\u{1F525}",co:'#fb7185'},{id:'cool',en:'When you COOL it',pt:'Quando ESFRIA',emo:"❄️",co:'#60a5fa'}],
   cards:[
     {en:"Ice melts into water",pt:"O gelo derrete e vira água",col:'heat'},
     {en:"Water boils into steam",pt:"A água ferve e vira vapor",col:'heat'},
     {en:"Steam cools back into water",pt:"O vapor esfria e vira água",col:'cool'},
     {en:"Water freezes into ice",pt:"A água congela e vira gelo",col:'cool'}
   ] }
];
