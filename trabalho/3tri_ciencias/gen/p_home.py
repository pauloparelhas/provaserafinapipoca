# Home: Ciencias como principal; Historia atras do botao. Rodar uma vez, da raiz do repo.
s = open('index.html', encoding='utf-8').read()
assert 'viewCie' not in s
a = s.index('<div class="header">')
b = s.index('<!-- FÁBRICA DE JOGOS')
hist = s[a:b]
flag = '<svg viewBox="0 0 28 20" width="26" height="19" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#16a34a"/><path d="M14 3 25 10 14 17 3 10z" fill="#facc15"/><circle cx="14" cy="10" r="4" fill="#1d4ed8"/></svg>'
cie = '''<div id="viewCie">
  <div class="header">
    <div class="badge">&#x1F4DA; 3rd term &middot; Year 2 &middot; test on 11/04<span class="tr">3º trimestre · prova em 04/11</span></div>
    <div class="mascot">&#x1F4CD;</div>
    <div class="title">Science<span class="tr">Ciências</span></div>
    <div class="subtitle">Motion Rangers: find everything!<span class="tr">Motion Rangers: encontre tudo!</span></div>
  </div>
  <section class="geo-panel">
    <a class="hero2" href="ferramentas/CIE3_simulado.html">
      <span class="em">&#x270F;&#xFE0F;</span>
      <span><span class="tt">Practice Test<span class="tr">Simulado</span></span><span class="dd">Just like the real test.<span class="tr">Igual à prova de verdade.</span></span></span>
      <span class="go">Start<span class="tr">Começar</span></span>
    </a>
    <div class="picks" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-top:16px">
      <a class="pick mat" href="ferramentas/CIE3_estudo.html">
        <span class="em">&#x1F4D6;</span>
        <span><span class="tt">Study<span class="tr">Teoria</span></span><span class="dd">8 short lessons with practice<span class="tr">8 lições curtas, com treino</span></span></span>
        <span class="tag">Study<span class="tr">Estudar</span></span>
      </a>
      <a class="pick mat" href="ferramentas/CIE3_pocket.html">
        <span class="em">&#x1F5A8;&#xFE0F;</span>
        <span><span class="tt">Pocket: one page<span class="tr">Pocket: uma folha</span></span><span class="dd">The whole test on one page<span class="tr">A prova inteira numa folha</span></span></span>
        <span class="tag">Print<span class="tr">Imprimir</span></span>
      </a>
      <a class="pick mat" href="ferramentas/CIE3_material.html">
        <span class="em">&#x1F3EB;</span>
        <span><span class="tt">School material<span class="tr">Material da escola</span></span><span class="dd">The slides and the 3 videos<span class="tr">Os slides e os 3 vídeos</span></span></span>
        <span class="tag">Open<span class="tr">Abrir</span></span>
      </a>
    </div>
  </section>
</div>
<div id="viewHis" hidden>
  ''' + hist.rstrip() + '''
</div>

  '''
s = s[:a] + cie + s[b:]
old = '<div class="ctrls">'
assert old in s
s = s.replace(old, '<div class="ctrls">\n    <button class="cbtn" id="trBtn" onclick="alternaTr()" aria-pressed="false" title="Portuguese" aria-label="Portuguese">' + flag + '</button>\n    <button class="cbtn" id="matBtn" onclick="alternaMat()" aria-pressed="false"><span id="matTxt">History</span></button>', 1)
s = s.replace('<title>História — 3º trimestre</title>', '<title>Science — 3rd term</title>')
s = s.replace('&#x1F50E; História &middot; 3º trimestre', 'Year 2 &middot; 3rd term<span class="tr">3º trimestre</span>')
i = s.index('<div class="footer-note">')
j = s.index('</div>', i)
s = s[:i] + s[j + 6:]
s = s.replace('&#x21BA; Atualizar o site', '&#x21BA; Refresh<span class="tr">Atualizar o site</span>')
i = s.index('function pintaTr(){')
j = s.index('function hardRefresh')
s = s[:i] + '''function pintaTr(){ var on=false; try{ on=localStorage.getItem('cie3_tr')==='1'; }catch(e){} document.body.classList.toggle('show-tr',on); var b=document.getElementById('trBtn'); if(b) b.setAttribute('aria-pressed',String(on)); }
function alternaTr(){ var on=!document.body.classList.contains('show-tr'); try{ localStorage.setItem('cie3_tr',on?'1':'0'); }catch(e){} pintaTr(); }
pintaTr();
/* Ciencias e a principal: abre sempre nela; o botao so alterna para Historia nesta visita */
function alternaMat(){ var h=document.getElementById('viewHis'), c=document.getElementById('viewCie'), ver=h.hidden; h.hidden=!ver; c.hidden=ver;
  document.getElementById('matTxt').textContent=ver?'Science':'History'; document.getElementById('matBtn').setAttribute('aria-pressed',String(ver));
  document.title=ver?'História — 3º trimestre':'Science — 3rd term'; }
''' + s[j:]
open('index.html', 'w', encoding='utf-8', newline='').write(s)
print('home ok')
