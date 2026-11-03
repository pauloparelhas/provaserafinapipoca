# tabelas: motor, motor2, fases, perigos, marceu, aparelhos, chefinho, ambiente, arte*, html
T = {}; BLOCOS = {}
LISTA = r"""var LISTA=[
  {id:1, nome:'The Messy Room', nome_pt:'O Quarto Bagunçado', cena:'vila', tema:'position', moradores:['pin','pin','pin'],
   resumo:'Where is it? In, on, under, behind, between…', resumo_pt:'Onde está? Dentro, em cima, embaixo, atrás, entre…'},
  {id:2, nome:'The School Map', nome_pt:'O Mapa da Escola', cena:'bosque', tema:'directions', moradores:['pin','pin','pin'],
   resumo:'Read the map. Left or right?', resumo_pt:'Leia o mapa. Esquerda ou direita?'},
  {id:3, nome:'Tower View', nome_pt:'A Vista da Torre', cena:'casa', tema:'perspective', moradores:['gigi','gigi','gigi'],
   resumo:'Climb up. See it from every side.', resumo_pt:'Suba. Veja de todos os lados.'},
  {id:4, nome:'Wild River', nome_pt:'O Rio Bravo', cena:'recife', modo:'nado', tema:'forces', ids:['n05','n07','n08','n11','n12','n16','n25','n35'], moradores:['drop','drop','drop'],
   resumo:'Water: helpful or harmful?', resumo_pt:'Água: ajuda ou atrapalha?'},
  {id:5, nome:'Windy Fields', nome_pt:'Os Campos de Vento', cena:'nuvens', tema:'forces', ids:['n01','n09','n10','n13','n14','n19','n23'], moradores:['breezy','breezy','breezy'],
   resumo:'Wind: helpful or harmful?', resumo_pt:'Vento: ajuda ou atrapalha?'},
  {id:6, nome:'The Move Park', nome_pt:'O Parque do Movimento', cena:'ginasio', tema:'objects', moradores:['boing','boing','boing'],
   resumo:'Bounce, fly, roll, slide, spin, swing.', resumo_pt:'Quicar, voar, rolar, deslizar, girar, balançar.'},
  {id:7, nome:'Animal Rally', nome_pt:'O Rali dos Bichos', cena:'pista', modo:'corrida', tema:'animals', moradores:['paws','paws','paws'],
   resumo:'How do animals move?', resumo_pt:'Como os bichos se movem?'},
  {id:8, nome:'Tug-of-War Stadium', nome_pt:'O Estádio do Cabo de Guerra', cena:'estadio', tema:'pushpull', moradores:['max','max','max'],
   resumo:'Push: away from me. Pull: closer to me.', resumo_pt:'Empurrar: para longe de mim. Puxar: para perto de mim.'},
  {id:9, nome:'Twister!', nome_pt:'Twister!', cena:'tinta', tema:'todos', chefao:true, moradores:[],
   resumo:'Push and pull to stop Twister!', resumo_pt:'Empurre e puxe para parar o Twister!'}
];
"""
FINS = r"""var FINS={1:['Everything in the room is in its place!','Tudo no quarto está no lugar!'],2:['Now the class can read the map!','Agora a turma sabe ler o mapa!'],3:['People are not right or wrong. They just see differently!','As pessoas não estão certas nem erradas. Só veem diferente!'],4:['Water can help and water can harm!','A água pode ajudar e pode atrapalhar!'],5:['Wind can help and wind can harm!','O vento pode ajudar e pode atrapalhar!'],6:['Six ways to move: all back!','Seis jeitos de mover: todos de volta!'],7:['Every animal moves in its own way!','Cada bicho se move do seu jeito!'],8:['Push away, pull closer!','Empurra para longe, puxa para perto!']};
"""
BLOCOS['fases'] = [('var LISTA=[', 'LISTA.forEach(function(f){ if(FINS', LISTA + "/* a frase que cada fase devolve (aparece no fim da fase) */\n" + FINS),
                   ("  var NOMES=['cookie'", "  return L;\n}\n\n/* ---------- monta", "")]
T['fases'] = [("if(window.MARCEU&&MARCEU.parse(ch,x,y,L)) continue;", "if(window.MARCEU&&MARCEU.parse(ch,x,y,L)) continue;\n    if(window.CIE3X&&CIE3X.parse(ch,x,y,L)) continue;"),
              ("||'crier'; });", "||'pin'; });"),
              ("L.todasEntradas=todos; L.totalArenas=todos.length;", "L.todasEntradas=todos; L.totalArenas=todos.length; todos.forEach(function(m,i){ m.corda=f.cena==='estadio'&&i===1; }); /* 2ª porta do estádio: cabo de guerra */")]
BLOCOS['motor'] = [("    case 'historia': {", "    case 'estrelas':", "")]
T['motor'] = [("J.faseAtual.nome:'The Lost Endings'", "J.faseAtual.nome:'Motion Rangers'"),
  ("quem:J.prog.heroi||'lia'", "quem:J.prog.heroi||'helmet'"),
  ("toast('Get the diving suit first!',1800,'Pegue a roupa de mergulho primeiro!')", "toast('Get the swimsuit first!',1800,'Pegue a roupa de banho primeiro!')"),
  ("caiu('Ouch, thorns! Back to the checkpoint','Ai, espinhos! De volta ao checkpoint')", "caiu('Ouch, spikes! Back to the checkpoint','Ai, pontas! De volta ao checkpoint')"),
  ("toast('Magic stars! Press ★ to throw one',2800,'Estrelas mágicas! Aperte ★ para jogar uma')", "toast('Motion Stars! Press ★ to throw one',2800,'Motion Stars! Aperte ★ para jogar uma')"),
  ("toast('Magic boots! Press JUMP again in the air',2600,'Botas mágicas! Aperte PULAR de novo no ar')", "toast('Sneakers! Press JUMP again in the air',2600,'Tênis! Aperte PULAR de novo no ar')"),
  ("UI.aviso('capa','The magic cape!','A capa mágica!',", "UI.aviso('capa','The kite!','A pipa!',"),
  ("'Now you can FLY! Hold JUMP (▲) to go up. Let go to float down. The sky is full of surprises…','Agora você pode VOAR! Segure PULAR (▲) para subir. Solte para descer devagar. O céu está cheio de surpresas…',\"Let's fly! ▶\",'Vamos voar!'", "'Hold JUMP to float.','Segure PULAR para planar.',\"Let's go! ▶\",'Vamos!'"),
  ("toast('A cape! Hold JUMP in the air to float',2600,'Uma capa! Segure PULAR no ar para planar')", "toast('A kite! Hold JUMP in the air to float',2600,'Uma pipa! Segure PULAR no ar para planar')"),
  ("UI.aviso('traje','A diving suit!','Uma roupa de mergulho!',", "UI.aviso('traje','A swimsuit!','Uma roupa de banho!',"),
  ("'Now you can breathe under the sea! Jump into the water. Under the water, tap JUMP (▲) to swim up.','Agora você respira debaixo do mar! Pule na água. Lá embaixo, toque PULAR (▲) para nadar para cima.','Dive in! ▶','Mergulhar!'", "'Jump in. Tap JUMP to swim up.','Pule na água. Toque PULAR para nadar para cima.','Dive in! ▶','Mergulhar!'"),
]
BLOCOS['motor2'] = [("var CENAS_INTRO=[", "function iniciaIntro()", r"""var CENAS_INTRO=[
  {en:'Twister the tornado spun through the school. Everything flew away!', pt:'O tornado Twister passou pela escola. Tudo voou!', dur:5},
  {en:'Balls, kites, toys, books: all lost. And the class got lost too!', pt:'Bolas, pipas, brinquedos, livros: tudo perdido. E a turma também se perdeu!', dur:5},
  {en:'Pin can help! Read the map and find everything!', pt:'O Pin ajuda! Leia o mapa e ache tudo!', dur:5}
];
"""),
  ("var CENAS_FINAL=[", "function iniciaFinal()", r"""var CENAS_FINAL=[
  {en:'Twister is tired. "I only wanted to spin!"', pt:'O Twister cansou. "Eu só queria girar!"', dur:5, cena:'tinta'},
  {en:'Wind and water can help. Everything is back in its place!', pt:'O vento e a água podem ajudar. Tudo voltou para o lugar!', dur:5, cena:'bosque'},
  {en:'Thank you, Motion Rangers! You found everything!', pt:'Obrigado, Motion Rangers! Vocês acharam tudo!', dur:5, cena:'vila'}
];
""")]
T['motor2'] = [("var ay=Math.max(-120,", "var ay=Math.max(J.chefe?0:-120,"),
  ("d={x:o.x,y:o.y-80,txt:'Touch the egg!',pt:'Encoste no ovo!'}", "d={x:o.x,y:o.y-80,txt:'Touch it!',pt:'Encoste!'}"),
  ("G.toast('Coming soon! This kingdom is still being built.',2400,'Em breve! Este reino ainda está sendo construído.');", "G.toast('Coming soon!',2400,'Em breve!');"),
  ("inimigos(dt); G.perigos(dt);", "inimigos(dt); G.perigos(dt); if(window.CIE3X) CIE3X.atualiza(dt,J,G);"),
]
T['perigos'] = [("var sk=M.cena==='vila'?'barril':(M.cena==='estadio'?'futebol':null);", "var sk=M.cena==='estadio'?'futebol':'lata';"),
  ("function inimigo(c,e,t){\n  if(e.tipo==='espinho'){", "function inimigo(c,e,t){\n  if(e.tipo==='espinho'&&A.piao){ A.piao(c,e,t); return true; }\n  if(e.tipo==='corvo'&&A.gust){ A.gust(c,e,t); return true; }\n  if(e.tipo==='espinho'){"),
]
T['marceu'] = [("function inimigo(c,e,t){\n", "function inimigo(c,e,t){\n  if(A.puddle&&A.puddle(c,e,t)) return true;\n")]
T['aparelhos'] = [("function plataforma(c,p,cena,t){\n", "function plataforma(c,p,cena,t){\n  if(window.CIE3X&&CIE3X.plataforma(c,p,t)) return true;\n")]
T['chefinho'] = [("    c.fillStyle='rgba(0,0,0,.25)'; A.el(c,0,ch.y0-ch.y+3,40,8); c.fill();\n    c.scale(sx,sy);", "    c.fillStyle='rgba(0,0,0,.25)'; A.el(c,0,ch.y0-ch.y+3,40,8); c.fill();\n    c.scale(sx,sy);\n    if(A.tracona){ A.tracona(c,0,0,t,ch.hp,ch.max); c.restore(); return; }")]
T['ambiente'] = [("POR_CENA={vila:'campo',", "POR_CENA={casa:'vento', vila:'campo',")]
T['arte4'] = [("fillText('RHYTHM GYM'", "fillText('MOVE PARK'"), ("fillText('COOKIES'", "fillText('SNACKS'"),
  ("var FRASES=['GOAL!','FAIR PLAY','KICK OFF','GO TEAM!','CAUSE & EFFECT','WELL DONE!','SCORE!'];", "var FRASES=['GOAL!','FAIR PLAY','KICK OFF','GO TEAM!','PUSH OR PULL','WELL DONE!','SCORE!'];")]
T['html'] = [('<title>The Lost Endings — English</title>', '<title>Motion Rangers — Science</title>'),
  ('The Lost Endings (Inglês 3º tri)', 'Motion Rangers (Ciências 3º tri)'),
  ('<div id="hudName">The Lost Endings</div>', '<div id="hudName">Motion Rangers</div>'),
  ('title="Pages"', 'title="Motion Stars"'),
  ('<script src="ING3_jogo_arte5.js?v=20261018d"></script>', '<script src="ING3_jogo_arte5.js?v=20261018d"></script>\n<script src="CIE3_jogo_base.js"></script>\n<script src="CIE3_jogo_arteA.js"></script>\n<script src="CIE3_jogo_arteB.js"></script>\n<script src="CIE3_jogo_arteC.js"></script>\n<script src="CIE3_jogo_cie.js"></script>'),
]

# aviso pedido pelo Paulo (02/11): jogo inacabado
T['html'] = T.get('html', []) + [("</body>", """<div id="aviso-dev" style="position:fixed;left:50%;top:46px;transform:translateX(-50%);z-index:50;pointer-events:none;background:#fff3c4;color:#4a3000;border:2px solid #b45309;border-radius:12px;padding:2px 12px;font:900 13px Nunito,Arial,sans-serif;text-align:center;white-space:nowrap">In development<span class="tr" style="font-size:11px"> Em desenvolvimento</span></div></body>""")]
