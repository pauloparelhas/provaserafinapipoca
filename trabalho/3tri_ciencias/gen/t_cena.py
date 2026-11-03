# tabelas: cena, ui, quiz, penalti
T = {}; BLOCOS = {}
INTRO = r"""function desenhaIntro(c){
  var t=J.t, it=J.intro||{i:0,t:0}, cena='bosque';
  A.ceu(c,cena,t); A.longe(c,cena,0,t); A.perto(c,cena,0,t); A.chao(c,{x:0,y:450,w:W,h:90},cena);
  if(it.i===0&&A.conde){ A.conde(c,640+Math.sin(t)*40,450,'laugh',t); }
  if(it.i===1){ HEROIS.forEach(function(q,i){ heroi(c,250+i*150,450,'idle',t+i,i%2?-1:1,1.2,q); }); c.fillStyle='#fde68a'; c.font='900 54px "Nunito",Arial'; c.textAlign='center'; [0,1,2,3].forEach(function(i){ c.fillText('?',250+i*150,300+Math.sin(t*3+i)*8); }); }
  if(it.i>=2){ HEROIS.forEach(function(q,i){ heroi(c,200+i*140,450,'cheer',t+i,1,1.2,q); }); if(A.morador) A.morador(c,'pin',800,450,t,-1,true); }
  titulo(c,'Motion Rangers',W/2,104,46);
}
"""
FINAL = r"""function desenhaFinal(c){
  var t=J.t, it=J.final||{i:2,t:0}, sc=JOGO.CENAS_FINAL[it.i]||JOGO.CENAS_FINAL[2], cena=A.CENAS[sc.cena]?sc.cena:'floresta';
  A.ceu(c,cena,t); A.longe(c,cena,0,t); A.perto(c,cena,0,t); A.chao(c,{x:0,y:450,w:W,h:90},cena);
  if(it.i===0){ if(A.conde) A.conde(c,620,450,'sad',t); heroi(c,330,450,'idle',t,1,1.2); }
  else { HEROIS.forEach(function(q,i){ heroi(c,180+i*140,450-Math.abs(Math.sin(t*3+i))*16,'cheer',t,1,1.15,q); }); if(A.morador){ A.morador(c,it.i===1?'breezy':'pin',780,450,t,-1,true); if(it.i===1) A.morador(c,'drop',870,450,t,-1,false); } }
  titulo(c,it.i===2?'You found everything!':'Motion Rangers',W/2,58,40);
}
"""
BLOCOS['cena'] = [('function desenhaIntro(c){', '/* ---------- final ---------- */', INTRO), ('function desenhaFinal(c){', '/* ---------- capa do livro', FINAL)]
T['cena'] = [
  ("var HEROIS=['lia','theo','bia','leo'];", "var HEROIS=['helmet','pony','yellow','fisher'];"),
  ("quem||J.prog.heroi||'lia',look", "quem||J.prog.heroi||'helmet',look"),
  ("{lia:'#94a3b8',theo:'#2563eb',bia:'#db2777'}[quem||'lia']", "'#2563eb'"),
  ("(J.prog.heroi||'lia')", "(J.prog.heroi||'helmet')"),
  ("function manchaTinta(c,e,t){\n", "function manchaTinta(c,e,t){\n  if(e.doConde&&A.ganso){ A.ganso(c,e.x,e.y,t,e.dir||-1,!!e.achatado); return; } /* a rodada 2 fala em Gusts: tem de ser Gust */\n  if(A.poeira){ A.poeira(c,e.x,e.y,t,e.dir||-1,!!e.achatado); return; }\n"),
  ("M.movers.forEach(function(p){ if(vis(p)) A.platMovel(c,p,cena,t); });", "M.movers.forEach(function(p){ if(vis(p)){ if(M.cena==='recife'&&window.CIE3X) CIE3X.barco(c,p,t); else A.platMovel(c,p,cena,t); } });"),
  ("titulo(c,'Kingdom complete!',0,0,54);", "titulo(c,'Level complete!',0,0,54); if(J.tr) titulo(c,'Fase concluída!',0,46,24);"),
  ("J.tr?'O MAR ▶':'THE SEA ▶'", "J.tr?'O RIO ▶':'THE RIVER ▶'"),
  ("var NOMES_HIST=['cookie','milk','straw','napkin','mirror','scissors','broom','tape','cookie!'];", "var NOMES_HIST=[];"),
  ("rotulo(c,'diving suit',42);", "rotulo(c,'swimsuit',42);"),
  ("function desenhaMastro(c,x,y,t){", "function desenhaMastro(c,x,y,t){ /* CIE3: uma Motion Star no pedestal */ c.save(); c.translate(x,y); c.fillStyle='#78716c'; A.rr(c,-26,-60,52,60,6); c.fill(); c.fillStyle='#a8a29e'; A.rr(c,-34,-66,68,10,4); c.fill(); var bb=Math.sin(t*2)*4, gg=c.createRadialGradient(0,-104+bb,4,0,-104+bb,70); gg.addColorStop(0,'rgba(253,230,138,.7)'); gg.addColorStop(1,'rgba(253,230,138,0)'); c.fillStyle=gg; A.circ(c,0,-104+bb,70); c.fill(); A.estrela(c,0,-104+bb,32,'#fde047',Math.sin(t)*.2); c.restore(); }\nfunction mastroAntigo(c,x,y,t){"),
  ("titulo(c,'The Lost Endings',W/2,140,64);", "titulo(c,'Motion Rangers',W/2,140,64);"),
  ("titulo(c,'Choose your hero',W/2,52,40);", "titulo(c,'Choose your Ranger',W/2,52,40);"),
]
BLOCOS['ui'] = [("  pagina:'<svg", chr(10), "  pagina:'<svg viewBox=\"0 0 24 24\"><path d=\"M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z\" fill=\"#f472b6\" stroke=\"#9d174d\" stroke-width=\"1.2\"/></svg>',")]
T['cena'] += [
  ("if(M.modo==='nado'&&M.superficie>40) ceuDoMar(c,M,t);", "if(M.modo==='nado'&&M.superficie>40){ if(A.ceuDoRio) A.ceuDoRio(c,M.superficie-J.camY,J.cam,t); else ceuDoMar(c,M,t); }"),
  ("  var px=120; c.strokeStyle='#92400e'; c.lineWidth=12;", "  if(0){ var px=120; c.strokeStyle='#92400e'; c.lineWidth=12;"),
  ("  /* placa: o mar está ali */", "  }\n  /* placa: o rio esta ali */"),
]
T['cena'] += [("pts.forEach(function(p,k){ if(k/pts.length>frac) return; c.fillStyle=feito?'#b45309':'rgba(120,53,15,.35)'; A.circ(c,p[0],p[1],feito?4:3); c.fill(); });", "/* CIE3: a rota azul tracejada do GPS já é o caminho; os pontos marrons herdados saíram */")]
T['cena'] += [("A.perto(c,cena,J.cam*.45,t); c.restore(); }", "A.perto(c,cena,J.cam*.45,t); c.restore(); if(J.camY<-20&&M.modo!=='nado'&&A.CENAS[cena]){ c.fillStyle=A.CENAS[cena].chaoTop; c.fillRect(0,470,W,-J.camY); } } /* CIE3: o fundo tem 470 de altura; com a câmera acima do chão aparecia uma faixa vazia */")]
T['ui'] = [
  ("' pages</div><button class=\"mbtn pri\" id=\"mcJogar\">Play</button>'", "' stars</div><button class=\"mbtn pri\" id=\"mcJogar\">Play</button>'"),
  ("bi('Open the book ▶','Abrir o livro')", "bi('Open the map ▶','Abrir o mapa')"),
  ("var HEROIS=[{k:'lia',en:'Lia, the knight',pt:'Lia, a cavaleira'},{k:'theo',en:'Theo, the wizard',pt:'Theo, o aprendiz de mago'},{k:'bia',en:'Bia, the gymnast',pt:'Bia, a ginasta'},{k:'leo',en:'Leo, the football player',pt:'Leo, o jogador de futebol'}];",
   "var HEROIS=[{k:'helmet',en:'Blue helmet',pt:'Capacete azul'},{k:'pony',en:'Ponytail',pt:'Rabo de cavalo'},{k:'yellow',en:'Yellow shirt',pt:'Camisa amarela'},{k:'fisher',en:'Green hat',pt:'Chapéu verde'}];"),
  ("bi('The lost ending is back in the book!','O final perdido voltou para o livro!','small')", "bi('A Motion Star is back!','Uma Motion Star voltou!','small')"),
  ("bi('pages','páginas')", "bi('stars','estrelas')"),
  ("bi('Some pages are still lost here. Play again to find them!','Ainda há páginas perdidas aqui. Jogue de novo para achá-las!')", "bi('Some stars are still lost here. Play again!','Ainda há estrelas perdidas aqui. Jogue de novo!')"),
  ("bi('Play this kingdom again','Jogar este reino de novo')", "bi('Play this level again','Jogar esta fase de novo')"),
  ("['<b>Questions</b> walk to a friend with a <b>!</b> · jump and hit the right sign (or tap it, or press 1 2 3)','Perguntas: vá até o personagem com <b>!</b> · pule e bata a cabeça na placa certa (ou toque nela, ou aperte 1 2 3)'],", "['<b>Questions</b> press ▼ at a door · tap the answer (or press 1 2 3)','Perguntas: aperte ▼ na porta · toque na resposta (ou aperte 1 2 3)'],"),
  ("['<b>Pages</b> each friend asks 3 questions and gives you a lost page','Páginas: cada personagem faz 3 perguntas e dá uma página perdida'],", "['<b>Stars</b> answer at a door = 1 Motion Star','Estrelas: responda na porta = 1 Motion Star'],"),
  ("['<b>Pip</b> touch the egg to ride Pip · hold JUMP to float','Pip: encoste no ovo para montar no Pip · segure PULAR para planar'],", "['<b>Power</b> take the shining thing at the start','Poder: pegue a coisa que brilha no começo'],"),
  ("bi('You found the lost endings! Every story has its ending back.','Você achou os finais perdidos! Toda história tem o seu final de volta.')", "bi('You found everything! Wind and water can help.','Você achou tudo! O vento e a água podem ajudar.')"),
  ("bi('You can come back to this kingdom any time.','Você pode voltar a este reino quando quiser.')", "bi('You can come back any time.','Você pode voltar quando quiser.')"),
  ("bi('All pages and stars will be lost. Your hero stays.','Todas as páginas e estrelas somem. O herói continua.')", "bi('All stars will be lost. Your Ranger stays.','Todas as estrelas somem. O Ranger continua.')"),
]
T['quiz'] = [
  ("itens.forEach(function(it){ ja.push(it.id); });", "if(!replay) itens.forEach(function(it){ ja.push(it.id); });"),
  ("var itens=(op&&op.itens)||escolhe(f,N_POR_MORADOR,ja); if(!itens.length) return;", "var nPorta=N_POR_MORADOR; if(f.ids&&!op){ var rest=f.ids.filter(function(id){ return ja.indexOf(id)<0; }).length, faltam=(L.todasEntradas||L.moradores).filter(function(mm){ return !mm.feito; }).length||1; nPorta=Math.max(1,Math.min(N_POR_MORADOR,Math.ceil(rest/faltam))); } /* CIE3: as forces dividem-se entre rio e vento sem repetir: cada porta leva a sua parte */\n  var replay=!op&&m.feito; /* CIE3: jogar de novo uma porta feita não gasta as perguntas das portas que faltam (gastava: a última porta dizia All answered e a fase não fechava) */ var itens=(op&&op.itens)||(replay?escolhe(f,N_POR_MORADOR,[]):escolhe(f,nPorta,ja)); if(!itens.length&&!op){ ja.length=0; itens=escolhe(f,nPorta,ja); } if(!itens.length) return;"),
  ("embaralha(novas).forEach(function(it){ if(sel.length>=n) return;", "embaralha(novas).forEach(function(it){ if(sel.length>=n||sel.indexOf(it)>=0) return;"),
  ("if(f.tema!=='todos'&&it.tema!==f.tema) return false;", "if(f.tema!=='todos'&&it.tema!==f.tema) return false; if(f.ids&&f.ids.indexOf(it.id)<0) return false;"),
  ("G.toast('You found a lost page! ('+n+' of '+E.length+')',2600,'Você achou uma página perdida! ('+n+' de '+E.length+')');", "G.toast('You found a Motion Star! ('+n+' of '+E.length+')',2600,'Você achou uma Motion Star! ('+n+' de '+E.length+')');"),
  ("J.quiz={m:m, op:op||null, itens:itens, i:0, fase:'entra', t:0, acertos:0, cartoes:[], dica:false};", "J.quiz={m:m, op:op||null, itens:itens, i:0, fase:'entra', t:0, acertos:0, cartoes:[], dica:false, corda:!!m.corda};"),
  ("return !!(window.PENALTI&&f&&f.cena==='estadio'&&!f.chefao&&!J.chefe); }", "return !!(window.PENALTI&&f&&f.cena==='estadio'&&!f.chefao&&!J.chefe&&!(J.quiz&&J.quiz.corda)); }"),
  ("var tipo=q.m.tipo||'crier',", "var tipo=q.m.rod?q.m.rod[(q.m.i0+q.i)%q.m.rod.length]:(q.m.tipo||'pin'),"),
  ("balao(c,q,it);\n  q.cartoes.forEach", "balao(c,q,it); if(q.corda&&window.CIE3X) CIE3X.corda(c,t,q,F);\n  q.cartoes.forEach"),
  ("var temTexto=!!it.texto&&!resp, bx=200, bw=W-bx-24, by=128, fs=23;", "var temTexto=!!it.texto&&!resp, bx=200, bw=W-bx-24, by=128, fs=23;\n  if(it.img&&window.CIE3X){ var figG=/map-/.test(it.img)&&!resp; CIE3X.figura(c,it.img,figG?530:650,figG?110:114,figG?406:286,figG?252:186); bw=W-bx-24-(figG?440:300); fs=21; } /* a figura do slide no quadro; o mapa da escola precisa de leitura: maior enquanto se responde */"),
]
T['penalti'] = [
  ("var pubs=[['STORY CUP','#1d4ed8','#fde047'],['READ MORE!','#16a34a','#fff'],['IF... THEN!','#dc2626','#fff'],['LOST ENDINGS','#7c3aed','#fde68a'],['GO TEAM!','#ea580c','#fff']];", "var pubs=[['PUSH!','#1d4ed8','#fde047'],['PULL!','#16a34a','#fff'],['KICK!','#dc2626','#fff'],['MOTION RANGERS','#7c3aed','#fde68a'],['GO TEAM!','#ea580c','#fff']];"),
  ("A.morador(c,'referee',0,0,t,1,fala);", "A.morador(c,'max',0,0,t,1,fala);"),
  ("function ativo(){ var f=J.faseAtual; return !!(f&&f.cena==='estadio'&&!f.chefao&&!J.chefe); }", "function ativo(){ var f=J.faseAtual; return !!(f&&f.cena==='estadio'&&!f.chefao&&!J.chefe&&!(J.quiz&&J.quiz.corda)); }"),
  ("var bx=18, bw=590, by=60, fs=21, maxH=GOL.y0+14-by;", "var bx=18, bw=590, by=60, fs=21, maxH=GOL.y0+14-by;\n  if(it.img&&window.CIE3X){ if(!q.dica) CIE3X.figura(c,it.img,700,408,250,124); }"),
]
