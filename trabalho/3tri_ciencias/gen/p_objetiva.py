# Sugestao do Paulo (02/11): teoria mais objetiva. Materia do slide, exercicio, "On the test". Sem conversa de personagem.
import re
p = 'ferramentas/CIE3_estudo_licoes.js'
s = open(p, encoding='utf-8').read()

def tira(k, tit):
    global s
    ini = s.index("{k:'" + k + "',")
    m = re.compile(r"\{tipo:'\w+', tit:'" + re.escape(tit) + "',").search(s, ini)
    assert m, tit
    j = re.compile(r"\n \{tipo:|\n\]\}").search(s, m.start())
    fim = j.start() + 2 if s[j.start():j.start() + 3] == "\n {" else j.start()
    s = s[:m.start()] + s[fim:]

for k, t in [('pos1', 'Read and complete'), ('pos2', 'Look at the room'), ('dir', 'I mark a place'),
             ('forcas', 'Air and water'), ('objetos', 'Direction or speed?'), ('animais', 'Movements of the hand')]:
    tira(k, t)

# o que estava nas telas cortadas e e do slide continua
a = "We might get <b>lost</b>"
assert a in s
i = s.index(a)
ini = s.rfind("html:", 0, i)
s = s[:ini + 5] + "R('The red <b>pin</b> marks a place on the map.','O pino vermelho marca um lugar no mapa.')+" + s[ini + 5:]
a = "caixa('My body'+tr('Meu corpo'),'<p><b>swim, climb, play, walk, pick, sit</b>'+tr('nadar, subir, brincar, andar, colher, sentar')+'</p>')"
assert a in s
s = s.replace(a, a + "+esp()+caixa('My hand'+tr('Minha mão'),'<p><b>touch, lift, point, write, grab, push</b>'+tr('tocar, levantar, apontar, escrever, agarrar, empurrar')+'</p>')")
s = s.replace("tit:'Movements of the body',", "tit:'Movements of the body and the hand',")
s = s.replace("fala:'Make a list of movements you can do with your body. Swim, climb, play, walk, pick, sit.',", "fala:'Body: swim, climb, play, walk, pick, sit. Hand: touch, lift, point, write, grab, push.',")

# baloes de personagem nas telas
q = r"'(?:[^'\\]|\\.)*'"
bal = re.compile(r"fala\(" + q + r"\s*,\s*" + q + r"(?:\s*\+\s*tr\(" + q + r"\))?\s*\)\s*\+?\s*")
i = s.index('return [\n')
cab, corpo = s[:i], s[i:]
corpo, n = bal.subn('', corpo)
print('baloes', n)
corpo = re.sub(r"html:\s*(\},)", r"html:''\1", corpo)
corpo = re.sub(r"fala:'(?:Pin, the red pin of the map, |Pin |Gigi |Breezy and Drop |Boing |Paws |Max )says: ", "fala:'", corpo)
s = cab + corpo
open(p, 'w', encoding='utf-8', newline='').write(s)
