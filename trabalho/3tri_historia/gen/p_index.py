# Troca a home do site (index.html) de Inglês para História (HIS3). Substituição de blocos.
import os, re
P = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'index.html')
s = open(P, encoding='utf-8').read()
s = s.replace('<title>English — 3rd term</title>', '<title>História — 3º trimestre</title>')
i = s.index('  <!-- Imersão em inglês'); j = s.index('<script>', i)
novo = '''  <div class="ctrls">
    <button class="cbtn" id="themeBtn" onclick="toggleTema()" aria-pressed="false" title="Claro ou escuro">
      <span class="ce" id="themeEmo">&#9728;&#65039;</span><span id="themeTxt">Modo claro</span>
    </button>
  </div>

  <div class="header">
    <div class="badge">&#x1F4DA; 3º trimestre &middot; Year 2 &middot; prova 27/10</div>
    <div class="mascot">&#x1F50E;</div>
    <div class="title">História</div>
    <div class="subtitle">Detetives do Tempo: fontes históricas &middot; a escola tem história &middot; profissões que mudaram e que continuaram</div>
  </div>

  <!-- ================= HISTÓRIA 3o TRI =================
       Insumos: trabalho/3tri_historia (U3 Fontes históricas, U4 O mundo do trabalho, U1/U2 base).
       Roteiro único: trabalho/3tri_historia/_roteiro.md. Banco único: HIS3_banco.js. -->
  <section class="geo-panel">
    <a class="hero2" href="ferramentas/HIS3_simulado.html">
      <span class="em">&#x270F;&#xFE0F;</span>
      <span>
        <span class="tt">Simulado</span>
        <span class="dd">Igual à prova de verdade.</span>
      </span>
      <span class="go">Começar</span>
    </a>
    <div style="margin-top:16px"></div>
    <a class="hero" href="ferramentas/HIS3_jogo.html" style="border-radius:22px">
      <span class="em">&#x1F50D;</span>
      <span>
        <span class="tt">Detetives do Tempo</span>
        <span class="dd">A Rainha Traça está roendo as pistas do passado. Salve o Museu da Memória!</span>
      </span>
      <span class="go">Jogar</span>
    </a>
    <div class="picks" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-top:16px">
      <a class="pick mat" href="ferramentas/HIS3_estudo.html">
        <span class="em">&#x1F4D6;</span>
        <span>
          <span class="tt">Caderno do Detetive</span>
          <span class="dd">13 lições curtas, com treino</span>
        </span>
        <span class="tag">Estudar</span>
      </a>
      <!--VIDEO_HIS3-->
      <a class="pick mat" href="ferramentas/HIS3_pocket.html">
        <span class="em">&#x1F5A8;&#xFE0F;</span>
        <span>
          <span class="tt">Pocket — uma folha</span>
          <span class="dd">Tudo da prova numa folha. Imprima colorido!</span>
        </span>
        <span class="tag">Imprimir</span>
      </a>
    </div>
  </section>

  <div class="footer">
    <div class="footer-logo">&#x1F50E; História &middot; 3º trimestre</div>
    <div class="footer-note">Do material da escola: Unidade 3 (Fontes históricas) e Unidade 4 (O mundo do trabalho), com a base das Unidades 1 e 2.</div>
    <button class="refresh-btn" onclick="hardRefresh()">&#x21BA; Atualizar o site</button>
  </div>
</div>
'''
s = s[:i] + novo + s[j:]
open(P, 'w', encoding='utf-8').write(s)
print('ok', [m for m in re.findall(r"'[A-Z][a-z]+ [a-z]+[^']*'", s)][:12])
