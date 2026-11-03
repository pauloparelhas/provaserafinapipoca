# Correcao do Paulo (02/11): pocket com 25% vazio. Figuras maiores e, em cada secao, "On the test": o jeito como cai.
p = 'ferramentas/CIE3_pocket.html'
s = open(p, encoding='utf-8').read()
def tr(a, b):
    global s
    assert a in s, a[:50]
    s = s.replace(a, b, 1)
tr('.mov .ex img{width:33.3%;height:15mm;', '.mov .ex img{width:33.3%;height:17mm;')
tr('.g4 img{display:block;width:100%;height:14mm;', '.g4 img{display:block;width:100%;height:13mm;')
tr('.vw img{width:100%;height:9.6mm;', '.vw img{width:100%;height:15mm;')
tr('</style>', '''.teste{background:#fff;border:.35mm dashed var(--c);border-radius:1.8mm;padding:.6mm 1.3mm;font-size:6.7pt;font-weight:700;line-height:1.16}
.teste h4{font-size:7.6pt;font-weight:900;color:var(--c);line-height:1.05;margin-bottom:.2mm}
.teste b{color:var(--c)}
.sec{justify-content:space-between}
.tresf{display:grid;grid-template-columns:1fr 24mm;gap:1.2mm;align-items:center}
.tresf img{width:100%;height:21mm;object-fit:contain;border-radius:1mm}
</style>''')
# objetos
tr('<span>slow · fast</span></div>\n    </section>', '''<span>slow · fast</span></div>
      <div class="teste"><h4>&#128221; On the test <span class="pt in">na prova</span></h4>
        To <b>___</b> means to turn around and around. <b>spin</b> · Match: wheel → <b>roll</b>, kite → <b>fly</b>, door → <b>swing</b> · Picture: how does it move?
        <span class="pt">Definição com lacuna, ligar objeto ao movimento, figura: como se move?</span></div>
    </section>''') if False else None
i = s.index('<div class="dv"><span>back and forth</span>')
j = s.index('</section>', i)
s = s[:j] + '''<div class="teste"><h4>&#128221; On the test <span class="pt in">na prova</span></h4>
        To <b>___</b> means to turn around and around. &#8594; <b>spin</b> · Match: wheel &#8594; <b>roll</b>, kite &#8594; <b>fly</b>, door &#8594; <b>swing</b> · Picture: how does it move?
        <span class="pt">Definição com lacuna, ligar objeto ao movimento, figura: como se move?</span></div>
    ''' + s[j:]
# push/pull
i = s.index('<b>opposite</b> forces.')
j = s.index('</section>', i)
s = s[:j] + '''<div class="teste"><h4>&#128221; On the test <span class="pt in">na prova</span></h4>
        A push moves something <b>away</b> ___ me. A pull moves something <b>closer</b> ___ me. · Picture: push or pull? · Write one example of each.
        <span class="pt">Complete a definição, figura: push ou pull?, escreva um exemplo de cada.</span></div>
      <div class="bx"><b>Force</b> makes things move from one place to another. The 2 forces are <b>push</b> and <b>pull</b>.<span class="pt">Força faz as coisas mudarem de lugar. As 2 forças são push e pull.</span></div>
    ''' + s[j:]
# vento e agua
i = s.index('<b>Wind</b> = air in motion')
j = s.index('</section>', i)
s = s[:j] + '''<div class="teste"><h4>&#128221; On the test <span class="pt in">na prova</span></h4>
        Helpful or harmful? · Wind or water? (tsunami = <b>water</b>, tornado = <b>wind</b>, floods = <b>water</b>) · Wind and water are two <b>natural</b> forces.
        <span class="pt">Ajuda ou prejudica? Vento ou água? Complete a frase.</span></div>
    ''' + s[j:]
# perspectiva e animais
i = s.index('“People are not right or wrong.')
j = s.index('</section>', i)
s = s[:j] + '''<div class="teste"><h4>&#128221; On the test <span class="pt in">na prova</span></h4>
        Picture: seen from the <b>top / bottom / front / side</b>? · Make a list of movements you can do with your <b>body</b> / your <b>hand</b>. · How does a fish move? <b>It swims.</b>
        <span class="pt">Figura: visto de onde? Faça a lista de movimentos do corpo e da mão. Como o bicho se move?</span></div>
    ''' + s[j:]
open(p, 'w', encoding='utf-8', newline='').write(s)
print('pocket ok')
