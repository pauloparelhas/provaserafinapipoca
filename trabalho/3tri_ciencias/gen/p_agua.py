# Paulo (02/11): "water is always moving" nao tem suporte nos slides e e falso para gelo ou agua no copo. Sai de tudo.
import json, re
B = 'trabalho/3tri_ciencias/banco/'
lf = B + '_lente.json'
lente = json.load(open(lf, encoding='utf-8'))
itens = json.load(open(B + 'T3_T4.json', encoding='utf-8'))
usados = set(lente['forces'])
if 'n25' in usados:
    tr = [i for i in itens if i['tema'] == 'forces' and i['id'] not in usados and set(i['at']) & {'N2', 'N3'} and 'always' not in json.dumps(i)]
    novo = tr[0]['id']
    lente['forces'][lente['forces'].index('n25')] = novo
    print('n25 ->', novo, tr[0]['p'])
for i in itens:
    if 'always moving' in i.get('ex', ''):
        print('ex', i['id'], i['p'][:60])
        i['ex'] = 'Water can be helpful or harmful.'
        i['ex_pt'] = 'A água pode ajudar ou prejudicar.'
json.dump(lente, open(lf, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump([i for i in itens if i['id'] != 'n25'], open(B + 'T3_T4.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
L = 'ferramentas/CIE3_estudo_licoes.js'
s = open(L, encoding='utf-8').read()
a = "<p>Water is <b>always moving</b>. Rivers flow <b>downhill</b>.'+tr('A água está sempre em movimento. Os rios descem.')+'<br>"
assert a in s
s = s.replace(a, "<p>Rivers flow <b>downhill</b>.'+tr('Os rios descem.')+'<br>")
s = s.replace('Water is always moving. Rivers flow downhill.', 'Rivers flow downhill.')
open(L, 'w', encoding='utf-8', newline='').write(s)
p = 'trabalho/3tri_ciencias/_roteiro.md'
s = open(p, encoding='utf-8').read()
s = s.replace('Water is always moving: rivers flow downhill', 'Rivers flow downhill')
open(p, 'w', encoding='utf-8').write(s)
t = open('index.html', encoding='utf-8').read()
i = t.index('<a class="hero" href="ferramentas/CIE3_jogo.html"')
i0 = t.rfind('<div style="margin-top:16px"></div>', 0, i)
j = t.index('</a>', i) + 4
t = t[:i0] + '<!-- jogo CIE3 fora da home ate o Paulo aprovar a refeitura -->' + t[j:]
open('index.html', 'w', encoding='utf-8', newline='').write(t)
print('ok')
