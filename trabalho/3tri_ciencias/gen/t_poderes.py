# tabela: poderes (um objeto do material por fase)
T = {}; BLOCOS = {}
TAB = r"""var TAB={
  1:{id:'raquete', tiro:'tenis', suporte:'mochila', verbo:'Take!', verboPt:'Pegue!', nome:'tennis racket', nomePt:'raquete de tênis', placa:'RACKET',
     tit:'A tennis racket!', titPt:'Uma raquete de tênis!',
     txt:'Press SPACE: hit a tennis ball. It bounces!', txtPt:'Aperte ESPAÇO: rebata uma bola de tênis. Ela quica!'},
  2:{id:'aviao', tiro:null, suporte:'carteira', verbo:'Take!', verboPt:'Pegue!', nome:'paper plane', nomePt:'avião de papel', placa:'PAPER PLANE',
     tit:'A paper plane!', titPt:'Um avião de papel!',
     txt:'It flies through the air. In the air, hold JUMP to glide.', txtPt:'Ele voa pelo ar. No ar, segure PULAR para planar.'},
  3:{id:'botas', tiro:null, suporte:'barraca', verbo:'Put on!', verboPt:'Calce!', nome:'climbing shoes', nomePt:'tênis de escalada', placa:'CLIMBING SHOES',
     tit:'Climbing shoes!', titPt:'Tênis de escalada!',
     txt:'Jump, then tap JUMP again in the air. Climb up!', txtPt:'Pule e aperte PULAR de novo no ar. Suba!'},
  4:{id:'traje', tiro:'bolha', suporte:'arara', verbo:'Put on!', verboPt:'Vista!', nome:'swimsuit', nomePt:'roupa de banho', placa:'SWIMSUIT',
     tit:'A swimsuit!', titPt:'Uma roupa de banho!',
     txt:'Tap JUMP to swim up. SPACE blows bubbles at the Puddles.', txtPt:'Toque PULAR para nadar para cima. ESPAÇO solta bolhas nas Puddles.'},
  5:{id:'capa', tiro:null, suporte:'cabide', verbo:'Take!', verboPt:'Pegue!', nome:'kite', nomePt:'pipa', placa:'KITE',
     tit:'A kite!', titPt:'Uma pipa!',
     txt:'A kite flies with the wind. Hold JUMP to go up. Let go to float down.', txtPt:'A pipa voa com o vento. Segure PULAR para subir. Solte para descer devagar.'},
  6:{id:'piao', tiro:'piao', suporte:'banco', verbo:'Take!', verboPt:'Pegue!', nome:'spinning top', nomePt:'pião', placa:'TOP',
     tit:'A spinning top!', titPt:'Um pião!',
     txt:'A top spins around and around. Press SPACE: it knocks over the rolling cans!', txtPt:'O pião gira e gira. Aperte ESPAÇO: ele derruba as latas que rolam!'},
  8:{id:'pip', tiro:null, montado:true, nome:'bike', nomePt:'bicicleta',
     tit:'A bike!', titPt:'Uma bicicleta!',
     txt:'Riding a bike is a PUSH. Hold JUMP in the air for a long jump!', txtPt:'Andar de bicicleta é EMPURRAR. No ar, segure PULAR para um salto longo!'}
};
"""
BLOCOS['poderes'] = [
  ('var TAB={', '/* a história do ratinho', TAB),
  ('var HIST={', '/* 16/10 (Paulo', "var HIST={};\n"),
  ('var QUIZ_ITEM={', 'function peloQuiz', "var QUIZ_ITEM={}, NOME_ITEM={};\n"),
  ('  setTimeout(function(){ G.toast(ajuda?', 'var CARTAO_GUARDANAPO', "}\n"),
  ('var CARTAO_GUARDANAPO=', 'function fase()', "var CARTAO_GUARDANAPO={tit:'',titPt:'',txt:'',txtPt:''};\n\n"),
  ('var PLACA_PT={', 'function placa(c,x,y,txt)', "var PLACA_PT={'RACKET':'Raquete','PAPER PLANE':'Avião de papel','CLIMBING SHOES':'Tênis de escalada','SWIMSUIT':'Roupa de banho','KITE':'Pipa','TOP':'Pião','BIKE':'Bicicleta'};\n"),
  ('var DICA_PODER={', 'function dicaPoder()', r"""var DICA_PODER={1:['Racket: press SPACE. The ball bounces!','Raquete: aperte ESPAÇO. A bola quica!'],
  2:['Paper plane: hold JUMP in the air to glide.','Avião de papel: no ar, segure PULAR para planar.'],
  3:['Climbing shoes: tap JUMP again in the air.','Tênis de escalada: aperte PULAR de novo no ar.'],
  4:['Swimsuit: tap JUMP to swim up. SPACE blows bubbles.','Roupa de banho: toque PULAR para nadar. ESPAÇO solta bolhas.'],
  5:['Kite: hold JUMP to go up.','Pipa: segure PULAR para subir.'],
  6:['Top: press SPACE. It knocks over rolling cans.','Pião: aperte ESPAÇO. Ele derruba as latas.'],
  8:['Bike: hold JUMP in the air for a long jump.','Bicicleta: no ar, segure PULAR para um salto longo.']};
"""),
]
T['poderes'] = [
  ("fase()===8", "fase()===-8"), ("fase()!==8", "fase()!==-8"),
  ("G.toast('Ride Pip first!',1400,'Monte no Pip primeiro!');", ";"),
  ("txt:'Touch the egg!',txtPt:'Toque no ovo!'", "txt:'Touch it!',txtPt:'Toque!'"),
  ("G.toast('The Ink Chef is clean now!',1600,'O Chef de Tinta ficou limpinho!');", ""),
  ("placa(c,0,-96,'BOOTS'); return; }", "placa(c,0,-96,P&&P.placa||'SNEAKERS'); return; }"),
  ("if(!it.pego){ bota(c,-12,-46,1.25); bota(c,14,-46,1.25); }", "if(!it.pego){ if(P&&P.placa==='ROPE') CIE3X.rolo(c,0,-46,1.6); else { CIE3X.tenis(c,-16,-46,1.1); CIE3X.tenis(c,18,-46,1.1); } }"),
  ("placa(c,52,-40,'DIVING SUIT');", "placa(c,52,-40,'SWIMSUIT');"),
  ("if(id==='capa'){", "if(id==='capa'){ if(!it.pego) CIE3X.pipa(c,t); placa(c,0,-146,'KITE'); return; }\n  if(id==='capa_antiga'){"),
  ("placa(c,0,-90,'BALLS');", "placa(c,0,-90,P&&P.placa||'BALLS');"),
  ("placa(c,0,-108,'CHALK');", "placa(c,0,-108,'SNEAKERS');"),
  ("placa(c,0,topo-50,'COOKIE');", "placa(c,0,topo-50,'SNACK');"),
  ("if(b.skin==='barril'){", "if(b.skin==='lata'){ CIE3X.lata(c,b); return true; }\n  if(b.skin==='barril'){"),
  ("else if(cena==='vila') portaoBarris(c,g.x,g.y,tr); else if(g.bola) maquina(c,g,t);", "else if(g.bola) maquina(c,g,t); else CIE3X.caixaLatas(c,g.x,g.y,tr);"),
  ("if(e.tipo!=='corvo'||(cena!=='bosque'&&cena!=='biscoito')) return false;", "if(true) return false;"),
  ("function antesHeroi(c,u,s,t){ if(J.poseHeroi!=='paraquedas') return;", "function antesHeroi(c,u,s,t){ if(u.poderes.capa&&fase()===5) CIE3X.pipaNoHeroi(c,u,s,t); if(J.poseHeroi!=='paraquedas') return;"),
  ("G.toast('Go back! Answer the ? first ◀',2200,'Volte! Responda o ? primeiro ◀');", "G.toast('Go back! Answer the ? first ◀',2200,'Volte! Responda o ? primeiro ◀');"),
  ("G.toast('Get the cape first!',1800,'Pegue a capa primeiro!');", "G.toast('Get the kite first!',1800,'Pegue a pipa primeiro!');"),
  ("var P=poder(), id=P?P.id:it.tipo;", "var P=poder(), id=P?P.id:it.tipo; if(window.CIE3X&&CIE3X.suporte(c,id,it,t,placa)) return;"),
  ("(P.id==='capa'?u.poderes.capa:!!u.poderes.tiro)", "(P.id==='capa'?u.poderes.capa:(P.id==='aviao'?u.poderes.guardanapo:!!u.poderes.tiro))"),
  ("    if(P.id==='capa') u.poderes.capa=true;", "    if(P.id==='capa') u.poderes.capa=true;\n    if(P.id==='aviao') u.poderes.guardanapo=true;"),
  ("var VEL={faisca:", "var VEL={tenis:{vx:430,vy:-160,g:1150,alc:620},piao:{vx:330,vy:0,g:900,alc:520},faisca:"),
  ("  if(s==='bola'){ u.chuteAte=", "  if(s==='piao'){ J.estrelas.push({x:u.x+u.dir*30*s0,y:u.y-16,vx:u.dir*v.vx,vy:0,g:v.g,alc:v.alc,dist:0,rot:0,skin:s,quiques:0}); SOM.fx('pulo'); log({ev:'tiro',skin:s}); return true; }\n  if(s==='bola'){ u.chuteAte="),
  ("    if(e.skin==='bola'&&oy<=s.y+2&&e.vy>0&&e.quiques<2){ e.y=s.y-1; e.vy=-e.vy*.6;", "    if(e.skin==='piao'&&oy<=s.y+2&&e.vy>=0){ e.y=s.y-1; e.vy=0; return; }\n    if((e.skin==='bola'||e.skin==='tenis')&&oy<=s.y+2&&e.vy>0&&e.quiques<(e.skin==='tenis'?5:2)){ e.y=s.y-1; e.vy=-e.vy*(e.skin==='tenis'?.78:.6);"),
  ("  if(e.skin==='bola'&&!fim) G.umaVia(M)", "  if((e.skin==='bola'||e.skin==='tenis')&&!fim) G.umaVia(M)"),
  ("    case 'bolha': desBolha(c,e.x,e.y,14); return true;", "    case 'tenis': case 'piao': return CIE3X.tiro(c,e,t);\n    case 'bolha': desBolha(c,e.x,e.y,14); return true;"),
  ("  switch(k){\n    case 'faisca':", "  if(window.CIE3X&&CIE3X.icone(c,k)){ ICO[k]=cv.toDataURL(); return ICO[k]; }\n  switch(k){\n    case 'faisca':"),
  ("if(J.poseHeroi!=='paraquedas') return; var hh=G.URSO_H*s;", "if(J.poseHeroi!=='paraquedas') return; if(fase()===2){ CIE3X.aviaoNoHeroi(c,u,s,t); return; } var hh=G.URSO_H*s;"),
]
# REFEITURA 03/11: o que cai (Bíblia: nada de gelo) — livro da estante no quarto, chuva da nuvem na torre/rio/estádio, bolota no parque
T['poderes'] += [("    if(cena==='vila') telhado(c,gr.x0-60,gr.x1+60,y);", "    if(cena==='vila') CIE3X.estanteQueda(c,gr.x0-60,gr.x1+60,y); else if(cena==='ginasio') galho(c,gr.x0-50,gr.x1+40,y,t); else if(cena!=='bosque'&&cena!=='biscoito') CIE3X.nuvemChuva(c,gr.x0-40,gr.x1+40,y,t);")]

T['poderes'] += [("if(cena==='bosque') pilhaToras(c,g.x,g.y,tr); else if(g.bola) maquina(c,g,t);", "if(g.bola) maquina(c,g,t);")]
