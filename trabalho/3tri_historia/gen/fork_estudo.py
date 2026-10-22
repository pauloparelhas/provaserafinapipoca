# Fork da teoria de Inglês (ING3_estudo.html) para o Caderno do Detetive de História (PT puro).
import os
F = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'ferramentas')
s = open(os.path.join(F, 'ING3_estudo.html'), encoding='utf-8').read()
CSS = r'''/* ---- HIS3: Caderno do Detetive ---- */
.falaper{display:flex;flex-direction:column;gap:2px;background:color-mix(in srgb,var(--lc) 16%,var(--card));border:2px solid var(--lc);border-radius:16px 16px 16px 4px;padding:9px 12px;margin:0 0 12px;font-weight:800;line-height:1.4}
.falaper b{font-size:calc(.78rem*var(--fs));text-transform:uppercase;letter-spacing:.6px;color:var(--lc)}
.cartas4{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:4px 0 8px}
.cartaf{position:relative;border-radius:14px;padding:10px 10px 10px 12px;background:linear-gradient(160deg,color-mix(in srgb,var(--cf) 26%,var(--card)),var(--card));border:2.5px solid var(--cf);display:flex;flex-direction:column;gap:3px;min-height:110px}
.cartaf b{font-size:calc(1rem*var(--fs));font-weight:900;color:var(--cf);letter-spacing:.5px}
.cartaf i{font-style:normal;font-weight:900;font-size:calc(.86rem*var(--fs))}
.cartaf span{font-size:calc(.82rem*var(--fs));font-weight:700;line-height:1.35;color:var(--soft)}
.cfic{position:absolute;right:8px;top:8px;width:22px;height:22px;border-radius:6px;background:var(--cf);opacity:.85}
.cf-oral{border-radius:50% 50% 50% 8px}.cf-escrita{border-radius:3px 10px 3px 10px}.cf-visual{border-radius:4px;box-shadow:inset 0 0 0 4px rgba(255,255,255,.55)}.cf-material{border-radius:6px}
.ah{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:4px 0 9px}
.ahc{border-radius:14px;padding:9px 11px;border:2px solid var(--line);background:var(--surf,var(--card));font-weight:800;line-height:1.4}
.ahc b{display:block;font-size:calc(.8rem*var(--fs));letter-spacing:1px;margin-bottom:4px}
.ahc ul{margin:0;padding-left:18px}.ahc li{margin:2px 0}.ahc p{margin:0}
.ahc.antes{border-color:#b45309;background:linear-gradient(160deg,rgba(180,83,9,.16),transparent)} .ahc.antes b{color:#d97706}
.ahc.hoje{border-color:#0284c7;background:linear-gradient(160deg,rgba(2,132,199,.16),transparent)} .ahc.hoje b{color:#0ea5e9}
.ahc.cont{border-color:#16a34a;background:linear-gradient(160deg,rgba(22,163,74,.16),transparent);margin-bottom:9px} .ahc.cont b{color:#22c55e}
.rios{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:4px 0 10px}
.rios div{border-radius:14px;padding:10px 8px;text-align:center;background:linear-gradient(170deg,rgba(14,165,233,.25),rgba(234,179,8,.18));border:2px solid #0ea5e9;font-weight:900;line-height:1.25}
.rios span{display:block;font-size:calc(.8rem*var(--fs));color:var(--soft);margin-top:4px}
.alvo .fesc{display:block;width:100%;max-width:300px;margin:0 auto 6px;border-radius:10px}
.tqimg{display:block;width:100%;max-width:320px;margin:4px auto 10px;border-radius:10px}
@media (max-width:380px){.cartas4,.ah{grid-template-columns:1fr}.rios{grid-template-columns:1fr}}
'''
R = [
('<html lang="en">', '<html lang="pt-BR">'),
('<title>English · Study</title>', '<title>História · Caderno do Detetive</title>'),
('/* ---- ING3: tradução atrás da bandeira, aviso, texto de leitura ---- */', CSS + '/* ---- herdado do ING3 ---- */'),
('<span class="title" id="titulo">English · Study</span>', '<span class="title" id="titulo">Caderno do Detetive</span>'),
('    <button class="iconbtn" id="trbtn" title="Portuguese" aria-label="Portuguese" onclick="toggleTr()"><svg viewBox="0 0 28 20" width="26" height="19" aria-hidden="true"><rect width="28" height="20" rx="3" fill="#009c3b"/><path d="M14 3 25 10 14 17 3 10z" fill="#ffdf00"/><circle cx="14" cy="10" r="4.2" fill="#002776"/></svg></button>\n', ''),
('title="Smaller text" aria-label="Smaller text"', 'title="Letra menor" aria-label="Letra menor"'),
('title="Bigger text" aria-label="Bigger text"', 'title="Letra maior" aria-label="Letra maior"'),
('title="Sound"', 'title="Som"'), ('title="Theme" aria-label="Theme"', 'title="Tema" aria-label="Tema"'),
('title="Full screen" aria-label="Full screen"', 'title="Tela cheia" aria-label="Tela cheia"'),
('id="navPrev">&#8249; Back</button>', 'id="navPrev">&#8249; Voltar</button>'),
('id="navNext">Next &#8250;</button>', 'id="navNext">Avançar &#8250;</button>'),
('<h2 id="sairtit">Leave?</h2>', '<h2 id="sairtit">Sair?</h2>'),
('<p>You will go back to the home page.</p>', '<p>Você vai voltar para a página inicial.</p>'),
('id="sairSim">Yes, leave</button>', 'id="sairSim">Sim, sair</button>'),
('id="sairNao">No, keep studying</button>', 'id="sairNao">Não, continuar estudando</button>'),
("window.SERA_CFG={trKey:'ing3_tr',lang:'en-US',voz:'thalitamultilingual',rate:.8,home:'../index.html',somKey:'ing3_som',stars:80};",
 "window.SERA_CFG={trKey:null,lang:'pt-BR',rate:.86,home:'../index.html',somKey:'his3_som',stars:80};"),
('<script src="ING3_banco.js"></script>', '<script src="HIS3_banco.js"></script>'),
("window.ING3ARTE={icone:function(k){ var c={fairy:'#f472b6',realmb:'#38bdf8',circle:'#fbbf24',cause:'#34d399',poem:'#a78bfa'}[k]||'#f472b6';",
 "window.ING3ARTE={icone:function(k){ var c={fontes:'#a855f7',escola:'#0ea5e9',olhar:'#f97316',mundo:'#eab308',profissoes:'#22c55e',tempo:'#ec4899'}[k]||'#a855f7';"),
("  var d={fairy:'<path d=\"M6 30V14l5 4 7-9 7 9 5-4v16z\" fill=\"'+c+'\"/><rect x=\"15\" y=\"22\" width=\"6\" height=\"8\" rx=\"3\" fill=\"#1e1b3a\"/>',",
 "  var d={fontes:'<circle cx=\"15\" cy=\"15\" r=\"9\" fill=\"none\" stroke=\"'+c+'\" stroke-width=\"4\"/><path d=\"M22 22l9 9\" stroke=\"'+c+'\" stroke-width=\"5\" stroke-linecap=\"round\"/>',\n"
 "         escola:'<path d=\"M18 5 4 13h28z\" fill=\"'+c+'\"/><rect x=\"7\" y=\"14\" width=\"22\" height=\"16\" fill=\"'+c+'\"/><rect x=\"15\" y=\"21\" width=\"6\" height=\"9\" fill=\"#1e1b3a\"/>',\n"
 "         olhar:'<ellipse cx=\"18\" cy=\"18\" rx=\"14\" ry=\"9\" fill=\"'+c+'\"/><circle cx=\"18\" cy=\"18\" r=\"5\" fill=\"#1e1b3a\"/>',\n"
 "         mundo:'<circle cx=\"18\" cy=\"18\" r=\"13\" fill=\"'+c+'\"/><path d=\"M8 14c5 1 6 5 10 4s4-6 10-5M10 25c4-2 8 1 12-1\" stroke=\"#1e1b3a\" stroke-width=\"2.2\" fill=\"none\"/>',\n"
 "         profissoes:'<rect x=\"5\" y=\"13\" width=\"26\" height=\"17\" rx=\"3\" fill=\"'+c+'\"/><path d=\"M13 13V9h10v4\" stroke=\"'+c+'\" stroke-width=\"3\" fill=\"none\"/>',\n"
 "         tempo:'<circle cx=\"18\" cy=\"19\" r=\"12\" fill=\"'+c+'\"/><path d=\"M18 12v7l5 3\" stroke=\"#1e1b3a\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\"/>',\n"
 "         fairy:'<path d=\"M6 30V14l5 4 7-9 7 9 5-4v16z\" fill=\"'+c+'\"/><rect x=\"15\" y=\"22\" width=\"6\" height=\"8\" rx=\"3\" fill=\"#1e1b3a\"/>',"),
('<script src="ING3_estudo_licoes.js"></script>', '<script src="HIS3_estudo_licoes.js"></script>'),
("var L=window.ING3, ARTE=window.ING3ARTE, LICOES=window.ING3_LICOES||[];", "var L=window.HIS3, ARTE=window.ING3ARTE, LICOES=window.HIS3_LICOES||[];"),
("var KEY='ing3_estudo_v1';", "var KEY='his3_estudo_v1';"),
("t.push({tipo:'treino', tit:'Practice',", "t.push({tipo:'treino', tit:'Treininho',"),
("t.push({tipo:'fim', tit:'Lesson done!'});", "t.push({tipo:'fim', tit:'Lição concluída!'});"),
("<span class=\"toque\">tap to see</span>", "<span class=\"toque\">toque para ver</span>"),
("box.innerHTML='<p class=\"fimesc\">'+acertos+' of '+itens.length+' correct.</p>'+\n            '<button class=\"btn calmo\" data-a=\"denovo\">Try again</button>';",
 "box.innerHTML='<p class=\"fimesc\">'+acertos+' de '+itens.length+' certas.</p>'+\n            '<button class=\"btn calmo\" data-a=\"denovo\">Tentar de novo</button>';"),
("(certo?'Yes!':'Not quite!')+'</b> '+(it.d||'')+'</div>'+\n            '<button class=\"btn\" data-a=\"prox\">'+(k<itens.length-1?'Next &#8250;':'Done')+'</button>';",
 "(certo?'Isso!':'Quase!')+'</b> '+(it.d||'')+'</div>'+\n            '<button class=\"btn\" data-a=\"prox\">'+(k<itens.length-1?'Próxima &#8250;':'Pronto')+'</button>';"),
("fala((certo?'Yes! ':'Not quite! ')+puro(it.d||''));", "fala((certo?'Isso! ':'Quase! ')+puro(it.d||''));"),
("<div class=\"ordmsg\">Tap what happens first.</div><button class=\"btn calmo\" data-a=\"re\">Start again</button>", "<div class=\"ordmsg\">Toque no que vem primeiro.</div><button class=\"btn calmo\" data-a=\"re\">Recomeçar</button>"),
("msg.textContent=t.fimMsg||'Well done! That is the order of the story.';", "msg.textContent=t.fimMsg||'Muito bem! Essa é a ordem.';"),
("else msg.textContent='Yes! What comes next?';", "else msg.textContent='Isso! E depois?';"),
("msg.textContent='Not yet. What happens before that?';", "msg.textContent='Ainda não. O que vem antes?';"),
("plac.innerHTML=ac+' of '+itens.length+' correct. '+\n            '<button class=\"btn calmo\" data-a=\"denovo\">Try again</button>';", "plac.innerHTML=ac+' de '+itens.length+' certas. '+\n            '<button class=\"btn calmo\" data-a=\"denovo\">Tentar de novo</button>';"),
("'<div class=\"ordmsg\">Tap a word.</div><button class=\"btn calmo\" data-a=\"re\">Start again</button>',", "'<div class=\"ordmsg\">Toque numa ferramenta.</div><button class=\"btn calmo\" data-a=\"re\">Recomeçar</button>',"),
("msg.textContent='Now tap its pair.';", "msg.textContent='Agora toque no par dela.';"),
("msg.textContent=feitos===t.pares.length?'Well done!':'Yes!';", "msg.textContent=feitos===t.pares.length?'Muito bem!':'Isso!';"),
("msg.textContent='Not a pair. Try again.';", "msg.textContent='Não é o par. Tente de novo.';"),
("'<div class=\"tq\"><div class=\"tqnum\">Practice · '+t.n+' / '+t.tot+'</div>'+", "'<div class=\"tq\"><div class=\"tqnum\">Treininho · '+t.n+' / '+t.tot+'</div>'+(it.img?'<img class=\"tqimg\" src=\"'+it.img+'\" alt=\"foto da aula\">':'')+"),
("'<button class=\"dicabtn\" data-a=\"dica\">Hint</button>", "'<button class=\"dicabtn\" data-a=\"dica\">Dica</button>"),
("'<div class=\"fbkslot\"></div><button class=\"btn\" data-a=\"prox\">Next &#8250;</button></div>',", "'<div class=\"fbkslot\"></div><button class=\"btn\" data-a=\"prox\">Avançar &#8250;</button></div>',"),
("(ok?'Correct!':'Not quite!')+'</b> '+esc(it.ex)+TR(it.ex_pt)+'</div>';", "(ok?'Isso mesmo!':'Quase!')+'</b> '+esc(it.ex)+'</div>';"),
("fala((ok?'Correct! ':'Not quite! ')+it.ex);", "fala((ok?'Isso mesmo! ':'Quase! ')+it.ex);"),
("if(!d.hidden) fala(it.dica_en||''); };", "if(!d.hidden) fala(it.dica||''); };"),
("'<h2>Lesson done!</h2><p>'+lic.nome+'</p>'+", "'<h2>Lição concluída!</h2><p>'+lic.nome+'</p>'+"),
("(tot?'<p>Practice: <b>'+ac+' of '+tot+'</b> correct.</p>':'')+", "(tot?'<p>Treininho: <b>'+ac+' de '+tot+'</b> certas.</p>':'')+"),
("'<div class=\"btnrow\">'+(prox?'<button class=\"btn\" data-a=\"prox\">Next lesson: '+prox.nome+'</button>':'')+", "'<div class=\"btnrow\">'+(prox?'<button class=\"btn\" data-a=\"prox\">Próxima lição: '+prox.nome+'</button>':'')+"),
("'<button class=\"btn calmo\" data-a=\"capa\">All lessons</button></div></div>',", "'<button class=\"btn calmo\" data-a=\"capa\">Todas as lições</button></div></div>',"),
("fala:'Lesson done! '+puro(lic.nome),", "fala:'Lição concluída! '+puro(lic.nome),"),
("document.body.style.setProperty('--lc','#f472b6');\n  titulo.textContent='English · Study';", "document.body.style.setProperty('--lc','#a855f7');\n  titulo.textContent='Caderno do Detetive';"),
("tela.innerHTML='<div class=\"capa\"><h1>English · 3rd term'+TRc('Inglês · 3º trimestre')+'</h1>'+",
 "tela.innerHTML='<div class=\"capa\"><h1>Caderno do Detetive</h1><div class=\"falaper\" style=\"--lc:#a855f7\"><b>Tic, o despertador</b><span>A Rainha Traça está roendo as pistas do passado! Estude as 13 lições para salvar o Museu da Memória.</span></div>'+"),
("'<div class=\"placarcapa\"><span>'+n+' / '+LICOES.length+' done'+TRc(n+' de '+LICOES.length+' feitas')+'</span>", "'<div class=\"placarcapa\"><span>'+n+' de '+LICOES.length+' feitas</span>"),
("'<a class=\"linkbtn\" href=\"ING3_simulado.html\">Practice Test &#8250;'+TRc('Simulado')+'</a></div>';", "'<a class=\"linkbtn\" href=\"HIS3_simulado.html\">Simulado &#8250;</a></div>';"),
("navNext.innerHTML=(n?'Continue':'Start')+' &#8250;';", "navNext.innerHTML=(n?'Continuar':'Começar')+' &#8250;';"),
("tela.innerHTML='<div class=\"lh\">'+icDe(lic)+'<div class=\"lhtx\"><small>Lesson '+(est.lic+1)+' · '+lic.nome+'</small>'+", "tela.innerHTML='<div class=\"lh\">'+icDe(lic)+'<div class=\"lhtx\"><small>Lição '+(est.lic+1)+' · '+lic.nome+'</small>'+"),
("navPrev.innerHTML='&#8249; Back';", "navPrev.innerHTML='&#8249; Voltar';"),
("navNext.innerHTML = est.i<n-1 ? 'Next &#8250;' : (est.lic<LICOES.length-1 ? 'Next lesson &#8250;' : 'All lessons &#8250;');", "navNext.innerHTML = est.i<n-1 ? 'Avançar &#8250;' : (est.lic<LICOES.length-1 ? 'Próxima lição &#8250;' : 'Todas as lições &#8250;');"),
("window.ING3_ESTUDO={abre:abre,", "window.HIS3_ESTUDO={abre:abre,"),
("<script>window.SERA_EN=true; window.SERA_ACCENT={accent:'#f472b6'};</script>", "<script>window.SERA_ACCENT={accent:'#a855f7'};</script>"),
]
falta = [a[:80] for a, b in R if a not in s]
for a, b in R: s = s.replace(a, b)
open(os.path.join(F, 'HIS3_estudo.html'), 'w', encoding='utf-8').write(s)
print('NAO ACHEI:', falta if falta else 'nada')
