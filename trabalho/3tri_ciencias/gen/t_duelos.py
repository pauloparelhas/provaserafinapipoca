# tabelas: chefao, corrida, carrinhos, estadio
T = {}; BLOCOS = {}
BLOCOS['chefao'] = [
  ("  /* janelas do castelo com relâmpago */", "  /* a poça que borbulha na sacada", ""),  # tochas e janelas de castelo: fora da BIBLIA
  ("    c.fillStyle=aceso?A.lin(c,-16,-40,16,0", "    c.restore();\n    if(aceso){ var b=Math.abs", "    if(A.INIMIGOS_CIE&&A.INIMIGOS_CIE.top){ c.scale(1.35,1.35); A.INIMIGOS_CIE.top(c,0,0,tq.caido?0:t,1,false); }\n"),  # pião de verdade, não tinteiro com pena
]
T['chefao'] = [
  ("'INKBLOT'", "'TWISTER'"),
  ("var RODADAS=[['fairy','realmb'],['poem'],['cause','circle']];", "var RODADAS=[['position','directions'],['perspective','forces'],['objects','animals','pushpull']];"),
  ("{en:'Inkwell Castle. Count Scribble lives here!', pt:'Castelo do Tinteiro. Aqui mora o Conde Rabisco!', fx:'trovao'}", "{en:'Here comes Twister!', pt:'Lá vem o Twister!', fx:'trovao'}"),
  ("{en:'\"HA HA! The lost endings are MINE!\"', pt:'\"RÁ RÁ! Os finais perdidos são MEUS!\"', fx:'conde'}", "{en:'\"WHOOSH! I spin it ALL away!\"', pt:'\"UUUUH! Eu giro e levo TUDO!\"', fx:'conde'}"),
  ("{en:'Answer to win stars. Hit the Count to take his letters!', pt:'Responda para ganhar estrelas. Acerte o Conde para tirar as letras dele!', fx:'tinteiros', botao:\"Let's go! ▶\"}", "{en:'Answer to win stars. Hit Twister to get the letters!', pt:'Responda para ganhar estrelas. Acerte o Twister para pegar as letras!', fx:'tinteiros', botao:\"Let's go! ▶\"}"),
  ("m:{x:19*T, y:SACADA_Y, tipo:'godmother', falando:0, i:0}};", "m:{x:19*T, y:SACADA_Y, tipo:'pin', rod:['pin','gigi','drop','breezy','boing','paws','max'], i0:0, falando:0, i:0}};"),
  ("var FRASE='YOU ARE A SUPER PLAYER', NLET=FRASE.replace(/ /g,'').length, METAS=[7,12,18]; /* YOU ARE A | SUPER | PLAYER */", "var FRASE='WIND AND WATER CAN HELP', NLET=FRASE.replace(/ /g,'').length, METAS=[7,12,19]; /* WIND AND | WATER | CAN HELP */"),
  ("primeira?'I am the Fairy Godmother! Answer and win STARS!':'Need stars? Answer my questions!',primeira?'Sou a Fada Madrinha! Responda e ganhe ESTRELAS!':'Precisa de estrelas? Responda às minhas perguntas!'", "primeira?'We are here! Answer and win STARS!':'Need stars? Answer us!',primeira?'Estamos aqui! Responda e ganhe ESTRELAS!':'Precisa de estrelas? Responda!'"),
  ("var m=C.fase==='p1'?['HA! My shield! Knock over my inkwells first!','RÁ! Meu escudo! Derrube meus tinteiros primeiro!']:(C.fase==='p2'?['HA! My shield! Jump on my ink blots first!','RÁ! Meu escudo! Pule nas minhas manchas primeiro!']", "var m=C.fase==='p1'?['HA! My shield! Knock over my tops first!','RÁ! Meu escudo! Derrube meus piões primeiro!']:(C.fase==='p2'?['HA! My shield! Jump on my Gusts first!','RÁ! Meu escudo! Pule nas minhas rajadas primeiro!']"),
  ("[['OUCH! My hat!','AI! Meu chapéu!'],['Stop that, little hero!','Pare com isso, heroizinho!'],['Grr! My letters!','Grr! Minhas letras!']]", "[['OUCH! I am dizzy!','AI! Estou tonto!'],['Stop that, little Ranger!','Pare com isso, Ranger!'],['Whoosh! My letters!','Uuuh! Minhas letras!']]"),
  ("C.alvo===1?'NO! My inkwell!':'Not another one!',C.alvo===1?'NÃO! Meu tinteiro!':'Outro não!'", "C.alvo===1?'NO! My top!':'Not another one!',C.alvo===1?'NÃO! Meu pião!':'Outro não!'"),
  ("'HA HA! Is that all, little hero?','RÁ RÁ! Só isso, heroizinho?'", "'HA HA! Is that all, little Ranger?','RÁ RÁ! Só isso, Ranger?'"),
  ("falaC('My magic inkwells make my SHIELD!','Meus tinteiros mágicos fazem o meu ESCUDO!');", "falaC('My spinning tops make my SHIELD!','Meus piões fazem o meu ESCUDO!');"),
  ("falaC('New shield! Ink blots, GO!','Escudo novo! Manchas, VÃO!');", "falaC('New shield! Gusts, GO!','Escudo novo! Rajadas, VÃO!');"),
  ("'Huff… puff… I am TIRED… but I am still SCARY! GRRR!','Arf… arf… estou CANSADO… mas ainda sou ASSUSTADOR! GRRR!'", "'Huff… puff… I am TIRED… but I still spin!','Arf… arf… estou CANSADO… mas ainda giro!'"),
  ("falaC('Grrr! You took my letters! Now my blots!','Grrr! Você pegou minhas letras! Agora, as manchas!');", "falaC('You took my letters! Now my Gusts!','Você pegou minhas letras! Agora, as rajadas!');"),
  ("falaC('ENOUGH! My GIANT letters!','CHEGA! Minhas letras GIGANTES!');", "falaC('ENOUGH! My GIANT letters!','CHEGA! Minhas letras GIGANTES!');"),
  ("falaC('Oh no… you won! The lost endings are free!','Ah, não… você venceu! Os finais perdidos estão livres!',4);", "falaC('Oh no… you won! Everything is back!','Ah, não… você venceu! Tudo voltou!',4);"),
  ("falaF('Jump ON the blots, from above!','Pule EM CIMA das manchas!',3.2);", "falaF('Jump ON the Gusts, from above!','Pule EM CIMA das rajadas!',3.2);"),
  ("A.morador(c,'godmother',f.x,fy,t,1,", "A.morador(c,C.m.rod[C.m.i0%C.m.rod.length],f.x,fy,t,1,"),
  ("['★ the Count! Take his letters!','Jogue ★ no Conde! Tire as letras dele!']", "['★ on Twister! Get the letters!','Jogue ★ no Twister! Pegue as letras!']"),
  ("['Break his shield: knock over the inkwells!  '+C.alvo+' / 3','Quebre o escudo: derrube os tinteiros!']", "['Break his shield: knock over the tops!  '+C.alvo+' / 3','Quebre o escudo: derrube os piões!']"),
  ("['Break his shield: jump on the blots!  '+Math.min(3,vencidas)+' / 3','Quebre o escudo: pule nas manchas!']", "['Break his shield: jump on the Gusts!  '+Math.min(3,vencidas)+' / 3','Quebre o escudo: pule nas rajadas!']"),
  ("['Climb the letters to the Count!','Suba nas letras até o Conde!']", "['Climb the letters to Twister!','Suba nas letras até o Twister!']"),
  ("var L1=['YOU','ARE','A'], L2=['SUPER','PLAYER!'], ix=0;", "var L1=['WIND','AND','WATER'], L2=['CAN','HELP!'], ix=0;"),
  ("c.fillText('VOCÊ É UM SUPER JOGADOR!',W/2,H/2+100);", "c.fillText('O VENTO E A ÁGUA PODEM AJUDAR!',W/2,H/2+100);"),
  ("  QUIZ.inicia(C.m,{itens:itens,", "  C.m.i0=(C.m.i0||0)+3; QUIZ.inicia(C.m,{itens:itens,"),
]
BLOCOS['corrida'] = [("  ponte:['The troll bridge!'", "  fim:['The finish line!", "  ponte:['A bridge!','Uma ponte!'],\n  lama:['A flood! Watch the Puddles!','Uma enchente! Cuidado com as Puddles!'],\n  conde:['Twister! Pass him!','O Twister! Passe por ele!'],\n")]
T['corrida'] = [
  ("fala('Ready… set…','Preparar… apontar…'); return true;", "return true;"),  # ficava escondido atrás do semáforo
  ("fala('The Soapbox Rally! Meet the racers!','O Rali dos Carrinhos! Conheça os pilotos!');", "fala('The Animal Rally! Meet the racers!','O Rali dos Bichos! Conheça os pilotos!');"),
  ("var COR_HEROI={lia:'#e11d48',theo:'#2563eb',bia:'#9333ea',leo:'#facc15'};", "var COR_HEROI={helmet:'#2563eb',pony:'#c026d3',yellow:'#eab308',fisher:'#16a34a'};"),
  ("COR_HEROI[J.prog.heroi||'lia']", "COR_HEROI[J.prog.heroi||'helmet']"),
  ("novoCarro(J.prog.heroi||'lia',", "novoCarro(J.prog.heroi||'helmet',"),
  ("fala('You passed Count Scribble!','Você passou o Conde Rabisco!');", "fala('You passed Twister!','Você passou o Twister!');"),
  ("QUIZ.escolhe({tema:'realmb',mix:['conceito','rapida','rapida']},3,J.nivel.quizIds||[]);", "QUIZ.escolhe({tema:(J.faseAtual&&J.faseAtual.tema)||'animals'},porPit(),J.nivel.quizIds||[]);"),
  ("function abrePit(){", "/* CIE3: o banco tem poucas perguntas de bichos; divide igual pelos 3 boxes, sem repetir */ function porPit(){ var n=CIE3.ITENS.filter(function(x){ return x.tema==='animals'; }).length; return Math.max(1,Math.min(3,Math.floor(n/3))); } function abrePit(){"),
  ("R.acertos+' / 9'", "R.acertos+' / '+(3*porPit())"),
  ("G.toast('You found a lost page! ('+R.paginas+' of 3)',2600,'Você achou uma página perdida! ('+R.paginas+' de 3)');", "G.toast('You found a Motion Star! ('+R.paginas+' of 3)',2600,'Você achou uma Motion Star! ('+R.paginas+' de 3)');"),
  ("(J.tr?'Páginas: ':'Pages: ')", "(J.tr?'Estrelas: ':'Stars: ')"),
  ("[['godmother','mouse','owl','bard'],['crier','godmother','octopus','mouse'],['owl','bard','mouse','coach'],['mouse','godmother','crier','owl'],['bard','octopus','godmother','mouse']]", "[['pin','paws','gigi','breezy'],['pin','drop','boing','paws'],['gigi','breezy','paws','boing'],['paws','pin','max','gigi'],['breezy','drop','pin','paws']]"),
  ("J.tr?'VAI, HERÓI!':'GO, HERO!'", "J.tr?'VAI, RANGER!':'GO, RANGER!'"),
  ("spr(FIM_SEG-40,-1.7,'castelo'); ", ""),
  ("tipo:'announcer'", "tipo:'paws'"),
  ("var nm=r.nome||'Count Scribble';", "var nm=r.nome||'Twister';"),
  ("h<.5?'tocha':'bandeira'", "h<.5?'arvore':'flores'"),
]
T['carrinhos'] = [
  ("dragon:{nome:'Dragon',cor:'#ea580c'}, princess:{nome:'Princess',cor:'#f97316'}, knight:{nome:'Knight',cor:'#94a3b8'},", "dragon:{nome:'Fish',cor:'#38bdf8'}, princess:{nome:'Rabbit',cor:'#f9a8d4'}, knight:{nome:'Bird',cor:'#fbbf24'},"),
  ("witch:{nome:'Witch',cor:'#7c3aed'}, wolf:{nome:'Big Bad Wolf',cor:'#78716c'}, fairy:{nome:'Fairy',cor:'#f0abfc'},", "witch:{nome:'Dog',cor:'#d97706'}, wolf:{nome:'Frog',cor:'#22c55e'}, fairy:{nome:'Monkey',cor:'#92400e'},"),
  ("frog:{nome:'Frog Prince',cor:'#16a34a'}, red:{nome:'Red Riding Hood',cor:'#dc2626'}, pig:{nome:'Little Pig',cor:'#f9a8d4'},", "frog:{nome:'Kangaroo',cor:'#a16207'}, red:{nome:'Snake',cor:'#65a30d'}, pig:{nome:'Cat',cor:'#a8a29e'},"),
  ("lia:{nome:'Lia',cor:'#e11d48'}, theo:{nome:'Theo',cor:'#2563eb'}, bia:{nome:'Bia',cor:'#9333ea'}, leo:{nome:'Leo',cor:'#facc15'},", "helmet:{nome:'You',cor:'#2563eb'}, pony:{nome:'You',cor:'#c026d3'}, yellow:{nome:'You',cor:'#eab308'}, fisher:{nome:'You',cor:'#16a34a'},"),
  ("count:{nome:'Count Scribble',cor:'#1e1b4b'}", "count:{nome:'Twister',cor:'#94a3b8'}"),
  ("function cabeca(c,id,o,t){\n", "function cabeca(c,id,o,t){\n  if(window.CIE3X&&CIE3X.cabeca(c,id,o,t)) return;\n"),
  ("function corpoTras(c,id,o,t){\n", "function corpoTras(c,id,o,t){\n  if(window.CIE3X){ var tp0=CIE3X.corpoTras(c,id,o,t); if(tp0!==undefined) return tp0; }\n"),
  ("o=o||{}; var t=o.t||0, f=DES[id]||DES.lia,", "o=o||{}; var t=o.t||0, f=DES[id]||DES.lia,"),
]
T['estadio'] = [
  ("QUIZ.escolhe({tema:'cause'},N,[])", "QUIZ.escolhe({tema:f.tema},N,[])"),
  ("G.toast('You found a lost page! ('+S.paginas+' of 3)',2400,'Você achou uma página perdida! ('+S.paginas+' de 3)');", "G.toast('You found a Motion Star! ('+S.paginas+' of 3)',2400,'Você achou uma Motion Star! ('+S.paginas+' de 3)');"),
  ("A.morador(c,'referee',62,150,t,1,f&&f.t<2);", "A.morador(c,'max',62,150,t,1,f&&f.t<2);"),
]
