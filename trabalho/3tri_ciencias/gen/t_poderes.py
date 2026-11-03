# tabela: poderes (um objeto do material por fase)
T = {}; BLOCOS = {}
TAB = r"""var TAB={
  1:{id:'bolas', tiro:'bola', suporte:'rack', verbo:'Take!', verboPt:'Pegue!', nome:'soccer ball', nomePt:'bola de futebol', placa:'BALL',
     tit:'A soccer ball!', titPt:'Uma bola de futebol!',
     txt:'Press SPACE to kick it.', txtPt:'Aperte ESPAÇO para chutar.'},
  2:{id:'botas', tiro:null, suporte:'barraca', verbo:'Put on!', verboPt:'Calce!', nome:'sneakers', nomePt:'tênis', placa:'SNEAKERS',
     tit:'Sneakers!', titPt:'Tênis!',
     txt:'Jump, then tap JUMP again in the air.', txtPt:'Pule e aperte PULAR de novo no ar.'},
  3:{id:'botas', tiro:null, suporte:'barraca', verbo:'Take!', verboPt:'Pegue!', nome:'rope', nomePt:'corda', placa:'ROPE',
     tit:'A rope!', titPt:'Uma corda!',
     txt:'Jump, then tap JUMP again: pull yourself up!', txtPt:'Pule e aperte PULAR de novo: puxe-se para cima!'},
  4:{id:'traje', tiro:'bolha', suporte:'arara', verbo:'Put on!', verboPt:'Vista!', nome:'swimsuit', nomePt:'roupa de banho', placa:'SWIMSUIT',
     tit:'A swimsuit!', titPt:'Uma roupa de banho!',
     txt:'Tap JUMP to swim up. SPACE blows bubbles at the Puddles.', txtPt:'Toque PULAR para nadar para cima. ESPAÇO solta bolhas nas Puddles.'},
  5:{id:'capa', tiro:null, suporte:'cabide', verbo:'Take!', verboPt:'Pegue!', nome:'kite', nomePt:'pipa', placa:'KITE',
     tit:'A kite!', titPt:'Uma pipa!',
     txt:'In the air, hold JUMP: the wind holds you up.', txtPt:'No ar, segure PULAR: o vento segura você.'},
  6:{desligado:true, id:'giz', tiro:null, suporte:'pedestal', verbo:'Take!', verboPt:'Pegue!', nome:'sneakers', nomePt:'tênis', placa:'SNEAKERS',
     tit:'Sneakers!', titPt:'Tênis!', txt:'Hold on tight.', txtPt:'Segure firme.'},
  8:{id:'bolas', tiro:'bola', suporte:'rack', verbo:'Take!', verboPt:'Pegue!', nome:'soccer balls', nomePt:'bolas de futebol', placa:'BALLS',
     tit:'Soccer balls!', titPt:'Bolas de futebol!',
     txt:'Press SPACE to kick. A kick is a PUSH!', txtPt:'Aperte ESPAÇO para chutar. Chute é EMPURRAR!'}
};
"""
BLOCOS['poderes'] = [
  ('var TAB={', '/* a história do ratinho', TAB),
  ('var HIST={', '/* 16/10 (Paulo', "var HIST={};\n"),
  ('var QUIZ_ITEM={', 'function peloQuiz', "var QUIZ_ITEM={}, NOME_ITEM={};\n"),
  ('  setTimeout(function(){ G.toast(ajuda?', 'var CARTAO_GUARDANAPO', "}\n"),
  ('var CARTAO_GUARDANAPO=', 'function fase()', "var CARTAO_GUARDANAPO={tit:'',titPt:'',txt:'',txtPt:''};\n\n"),
  ('var PLACA_PT={', 'function placa(c,x,y,txt)', "var PLACA_PT={'BALL':'Bola','BALLS':'Bolas','SNEAKERS':'Tênis','ROPE':'Corda','SWIMSUIT':'Roupa de banho','KITE':'Pipa'};\n"),
  ('var DICA_PODER={', 'function dicaPoder()', r"""var DICA_PODER={1:['Soccer ball: press SPACE to kick.','Bola: aperte ESPAÇO para chutar.'],
  2:['Sneakers: tap JUMP again in the air.','Tênis: aperte PULAR de novo no ar.'],
  3:['Rope: tap JUMP again in the air to pull yourself up.','Corda: aperte PULAR de novo no ar para se puxar.'],
  4:['Swimsuit: tap JUMP to swim up. SPACE blows bubbles.','Roupa de banho: toque PULAR para nadar. ESPAÇO solta bolhas.'],
  5:['Kite: hold JUMP in the air to float.','Pipa: segure PULAR no ar para planar.'],
  8:['Soccer balls: press SPACE to kick.','Bolas: aperte ESPAÇO para chutar.']};
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
]
