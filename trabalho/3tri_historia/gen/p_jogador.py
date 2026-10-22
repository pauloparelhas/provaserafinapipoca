# Correções do agente jogador (22/10): o jogo inteiro em português, sem sobras do jogo de Inglês.
import os, re
F = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'ferramentas')
def sub(nome, R):
    p = os.path.join(F, nome); s = open(p, encoding='utf-8').read(); falta = []
    for a, b in R:
        if a not in s: falta.append(a[:80]); continue
        s = s.replace(a, b)
    open(p, 'w', encoding='utf-8').write(s); print(nome, 'NAO ACHEI:', falta or 'nada')

PTFN = r"""/* HIS3: as falas são desenhadas e lidas em PORTUGUÊS; o português herdado do Inglês falava do Conde e da tinta */
function PT(s){ return String(s||'')
  .replace('RÁ RÁ! Só isso, heroizinho?','Ops! Tente de novo, detetive!')
  .replace(/estou CANSADO… mas ainda sou ASSUSTADOR! GRRR!/g,'estou CANSADA… mas ainda sou a RAINHA! Hmpf!')
  .replace(/Os finais perdidos estão livres!/g,'As pistas do passado estão salvas!')
  .replace(/Meus tinteiros mágicos fazem/g,'Minhas caixas de papel roído fazem').replace(/NÃO! Meu tinteiro!/g,'NÃO! Minha caixa de papel!')
  .replace(/os tinteiros/g,'as caixas de papel roído').replace(/Manchas, VÃO!/g,'Poeira, VAI!').replace(/as manchas/g,'as bolinhas de poeira').replace(/das manchas/g,'das bolinhas de poeira').replace(/nas manchas/g,'nas bolinhas de poeira')
  .replace(/heroizinho/g,'detetivezinho').replace(/Fada Madrinha/g,'Dra. Clio, do museu')
  .replace(/no Conde/g,'na Rainha').replace(/até o Conde/g,'até a Rainha').replace(/as letras dele/g,'as letras dela').replace(/o Conde/g,'a Rainha').replace(/Conde Rabisco/g,'Rainha Traça').replace(/Conde/g,'Rainha'); }
"""
sub('HIS3_jogo_chefao.js', [
 ("var C=null;\n", "var C=null;\n" + PTFN),
 ("  {en:'Inkwell Castle. Count Scribble lives here!', pt:'Castelo do Tinteiro. Aqui mora o Conde Rabisco!', fx:'trovao'},\n  {en:'\"HA HA! The lost endings are MINE!\"', pt:'\"RÁ RÁ! Os finais perdidos são MEUS!\"', fx:'conde'},\n  {en:'Answer to win stars. Hit the Count to take his letters!', pt:'Responda para ganhar estrelas. Acerte o Conde para tirar as letras dele!', fx:'tinteiros', botao:\"Let's go! ▶\"}",
  "  {en:'O Museu da Memória. A Rainha Traça está aqui!', pt:'O Museu da Memória. A Rainha Traça está aqui!', fx:'trovao'},\n  {en:'\"RÁ RÁ! As pistas do passado são MINHAS!\"', pt:'\"RÁ RÁ! As pistas do passado são MINHAS!\"', fx:'conde'},\n  {en:'Responda para ganhar estrelas. Acerte a Rainha para tirar as letras dela!', pt:'Responda para ganhar estrelas. Acerte a Rainha para tirar as letras dela!', fx:'tinteiros', botao:'Vamos! ▶'}"),
 ("function falaC(en,pt,dur){ if(!C) return; C.fala={en:en,pt:pt,t:0,dur:dur||3.2}; try{ say(en); }catch(e){} }",
  "function falaC(en,pt,dur){ if(!C) return; en=PT(pt||en); C.fala={en:en,pt:'',t:0,dur:dur||3.2}; try{ say(en); }catch(e){} }"),
 ("function falaF(en,pt,dur){ if(!C) return; C.fada.fala={en:en,pt:pt,t:0,dur:dur||3.4}; try{ say(en); }catch(e){} }",
  "function falaF(en,pt,dur){ if(!C) return; en=PT(pt||en); C.fada.fala={en:en,pt:'',t:0,dur:dur||3.4}; try{ say(en); }catch(e){} }"),
 ("function banner(en,pt){ C.banner={en:en,pt:pt,t:0};", "function banner(en,pt){ C.banner={en:PT(pt||en),pt:'',t:0};"),
 ("var obj=!/^p/.test(C.fase)?null:(!C.escudo?['★ the Count! Take his letters!','Jogue ★ no Conde! Tire as letras dele!']:(C.fase==='p1'?['Break his shield: knock over the inkwells!  '+C.alvo+' / 3','Quebre o escudo: derrube os tinteiros!']:(C.fase==='p2'?['Break his shield: jump on the blots!  '+Math.min(3,vencidas)+' / 3','Quebre o escudo: pule nas manchas!']:['Climb the letters to the Count!','Suba nas letras até o Conde!'])));",
  "var obj=!/^p/.test(C.fase)?null:(!C.escudo?['Jogue ★ na Rainha! Tire as letras dela!','']:(C.fase==='p1'?['Quebre o escudo: derrube as caixas de papel roído!  '+C.alvo+' / 3','']:(C.fase==='p2'?['Quebre o escudo: pule nas bolinhas de poeira!  '+Math.min(3,vencidas)+' / 3','']:['Suba nas letras até a Rainha!',''])));"),
])
# a fala do chefão desenhada: o campo .pt agora vem vazio (sem segunda linha)
sub('HIS3_jogo_corrida.js', [
 ("Você achou uma página perdida! (", "Você recuperou uma carta de fonte! ("),
])
sub('HIS3_jogo_estadio.js', [("Você achou uma página perdida! (", "Você recuperou uma carta de fonte! (")])
sub('HIS3_jogo_poderes.js', [
 ("Vira paraquedas! Pule e SEGURE PULAR para flutuar por cima da pia.", "Vira paraquedas! Pule e SEGURE PULAR para flutuar por cima do buraco."),
 ("G.toast('Ride Pip first!',1400,'Monte no Pip primeiro!');", "G.toast('Monte no Pangaré primeiro!',1400);"),
 ("txt:'Touch the egg!',txtPt:'Toque no ovo!'", "txt:'Monte no Pangaré!',txtPt:'Monte no Pangaré!'"),
])
sub('HIS3_jogo_motor2.js', [("traçinhas", "tracinhas"), ("{t:'Touch the egg!'", "{t:'Monte no Pangaré!'")])
sub('HIS3_jogo_ui.js', [("traçinhas", "tracinhas")])
