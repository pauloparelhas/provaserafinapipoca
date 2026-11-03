# Ideia do Paulo aceita (02/11): oclusao. Todo <b> da teoria vira termo hachurado; toque revela. Aqui: motor + escolha dos termos.
import re
L = 'ferramentas/CIE3_estudo_licoes.js'
s = open(L, encoding='utf-8').read().replace('\r\n', '\n')
def tr(a, b, n=1):
    global s
    assert a in s, a[:70]
    s = s.replace(a, b) if n == 0 else s.replace(a, b, n)

# definicoes do slide S5: nome visivel, definicao escondida
for a, b in [('to go up and down after hitting a surface', 'to go <b>up and down</b> after hitting a <b>surface</b>'),
             ('to move through the air', 'to move through the <b>air</b>'),
             ('to move by turning over and over', 'to move by <b>turning over and over</b>'),
             ('to move smoothly along a surface', 'to move <b>smoothly</b> along a <b>surface</b>'),
             ('to turn around and around', 'to turn <b>around and around</b>'),
             ('to move back and forth like a pendulum', 'to move <b>back and forth</b> like a pendulum')]:
    tr("def:'" + a + "'", "def:'" + b + "'")
# legendas do slide S8
s, n = re.subn(r"\['(help|harm)-([a-z-]+)','([^']+)'", lambda m: "['%s-%s','<b>%s</b>'" % (m.group(1), m.group(2), m.group(3)), s)
print('legendas S8', n)
# frase da girafa
tr("They just have a different view of things.”','As pessoas", "They just have a <b>different view</b> of things.”','As pessoas")
# push/pull: a palavra fica, a definicao se esconde
tr("R('<b>push</b> · <b>pull</b>','push = empurrar · pull = puxar')", "R('push · pull','push = empurrar · pull = puxar')")
s, n = re.subn(r"A <b>(push|pull)</b> is when I use a force to move something", lambda m: "A %s is when I use a <b>force</b> to move something" % m.group(1), s)
print('defs', n)
s, n = re.subn(r"R\('<b>(Push|Pull)</b>: (away from me|closer to me)\.'", lambda m: "R('%s: <b>%s</b>.'" % (m.group(1), m.group(2)), s)
print('rodapes', n)
s = s.replace("<b>Force</b> makes", "Force makes").replace("<b>One</b> object", "One object")
# corpo e mao: palavra a palavra
for lista in ('swim, climb, play, walk, pick, sit', 'touch, lift, point, write, grab, push'):
    novo = ', '.join('<b>%s</b>' % w for w in lista.split(', '))
    s = s.replace("<p><b>%s</b>'" % lista, "<p>%s'" % novo)
# titulos nao entregam a resposta
tr("tit:'Behind, in front of, between, next to'", "tit:'Where is it?'")
tr("tit:'Near, far from, above, below, over'", "tit:'Where is it?'")
open(L, 'w', encoding='utf-8', newline='').write(s)

p = 'ferramentas/CIE3_estudo.html'
t = open(p, encoding='utf-8').read()
a = "R.texto=function(t){ return {html:t.html||''}; };"
assert a in t
t = t.replace(a, """/* oclusao: todo <b> da teoria vira termo hachurado; o toque revela (revisao ativa, ideia do Paulo 02/11) */
function ocluir(el){
  var bs=[].slice.call(el.querySelectorAll('b')).filter(function(b){ return !b.closest('.tr')&&!b.closest('h3')&&!b.closest('.tqnum'); });
  if(!bs.length) return;
  function pinta(){ var f=bs.filter(function(b){ return b.classList.contains('fechado'); }).length; if(tudo){ tudo.firstChild.nodeValue=f?'Show all':'Hide all'; } }
  bs.forEach(function(b){ b.classList.add('ocl','fechado'); b.setAttribute('role','button'); b.tabIndex=0;
    b.onclick=function(){ var abre=b.classList.toggle('fechado')===false; if(abre) fala(b.textContent); pinta(); try{ localStorage.setItem('cie3_ocl','1'); }catch(e){} var d=el.querySelector('.oclhint'); if(d) d.remove(); };
    b.onkeydown=function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); b.onclick(); } }; });
  var visto=false; try{ visto=localStorage.getItem('cie3_ocl')==='1'; }catch(e){}
  if(!visto){ var h=document.createElement('p'); h.className='oclhint'; h.innerHTML='Tap the striped words.<span class="tr">Toque nas palavras listradas.</span>'; el.insertBefore(h,el.firstChild); }
  var tudo=null;
  if(bs.length>1){ tudo=document.createElement('button'); tudo.className='btn calmo oclbtn'; tudo.innerHTML='Show all<span class="tr">Mostrar / esconder tudo</span>';
    tudo.onclick=function(){ var f=bs.some(function(b){ return b.classList.contains('fechado'); }); bs.forEach(function(b){ b.classList.toggle('fechado',f); }); pinta(); };
    el.appendChild(tudo); }
}
R.texto=function(t){ return {html:t.html||'',init:ocluir}; };""")
a = ".fescb{display:block;"
assert a in t
t = t.replace(a, """b.ocl{display:inline-block;min-width:44px;min-height:30px;padding:1px 6px;margin:1px 0;border-radius:7px;text-align:center;cursor:pointer;background:rgba(251,191,36,.18);color:inherit;box-shadow:inset 0 0 0 1.5px rgba(251,191,36,.75)}
b.ocl.fechado{color:transparent;background:repeating-linear-gradient(45deg,#f59e0b 0 6px,#92400e 6px 12px);box-shadow:none;user-select:none}
body.light b.ocl.fechado{background:repeating-linear-gradient(45deg,#fbbf24 0 6px,#b45309 6px 12px)}
.oclbtn{display:block;margin:10px auto 0;min-height:44px}.oclhint{font-weight:800;text-align:center;margin:0 0 8px}
""" + a, 1)
open(p, 'w', encoding='utf-8', newline='').write(t)
print('ok')
