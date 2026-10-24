"""Jogador-robô (MUDO): joga TODOS os jogos-modelo SÓ com teclas reais (setas, pulo, ▼), como a criança.
Reprova se não chegar na bandeira. Uso: python jogador_robo.py [modelo ...]

Cada modelo tem um ROTEIRO: o preparo (JS opcional, ex.: consertar o jogo quebrado) e a ROTA, uma lista
de passos que o robô cumpre olhando o jogo (FAB.motor.olha()) e apertando teclas (FAB.motor.tecla()):
  ['fim']         segue para a direita até a bandeira, pulando buraco, parede e inimigo (o robô de sempre)
  ['ir', x]       anda até a coluna x (para a esquerda ou a direita), com o mesmo reflexo de pular
  ['sobe']        segura ▲ no cipó/escada até sair lá em cima
  ['desce']       segura ▼ no cipó/escada até pisar no chão
  ['duplo']       pula e, lá no alto, pula de novo (pena do pulo duplo)
  ['cano']        aperta ▼ em cima do cano e espera chegar no outro
  ['nada', x, y]  nada até a casinha (x, y): ▲ segurado sobe, setas para o lado
Modelo novo sem roteiro aqui usa ['fim']. Modelo que o robô não vence não entra no jogo."""
import sys, pathlib, json, http.server, threading, functools
from playwright.sync_api import sync_playwright
RAIZ = pathlib.Path(__file__).resolve().parents[2]
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(_H, directory=str(RAIZ.parent)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{srv.server_address[1]}/coding/index.html'
MUDO = ("try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){}"
        "window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); }; HTMLMediaElement.prototype.play=function(){ return Promise.resolve(); }; HTMLMediaElement.prototype.load=function(){};")
FIM = [['fim']]
ROTEIROS = {
  'primeiro': ("", FIM),
  'vazio': ("", FIM),
  'castelo': ("", FIM),
  # o quebrado consertado (moeda vale 1, bandeira ligada, buraco com chão): tem de dar para ganhar
  'quebrado': ("var J=FAB.jogo();J.regras.forEach(function(r){if(r.quando.obj==='moeda')r.faca[0].n=1;if(r.quando.obj==='bandeira')r.liga=true;});"
               "J.fases[0].mapa=J.fases[0].mapa.map(function(l,j){return j>=10?l.replace(/\\.\\.\\.\\.\\.\\./,'######'):l;});", FIM),
  # modelos de 23/10: neve (ponto de volta, cristais, morcego) e corrida COM o relógio ligado (45 s)
  'neve': ("", FIM),
  'corrida': ("var J=FAB.jogo();J.ajustes.tempo=(FAB.MODELOS.corrida.ajustes||{}).tempo||45;", FIM),
  # mundo (v3): sobe pelo cipó, pega a pena e usa o pulo duplo; desce e entra no cano; nada pelas bolhas; monta no cavalo
  'torre': ("", [['ir', 10], ['sobe'], ['ir', 22], ['sobe'], ['ir', 9], ['duplo'], ['ir', 7], ['sobe'], ['fim']]),
  'poco': ("", [['ir', 9], ['desce'], ['ir', 16], ['cano'], ['fim']]),
  'lago': ("", [['nada', 14, 10], ['nada', 24, 10], ['nada', 33, 10], ['nada', 40, 4], ['fim']]),
  'cavalo': ("", FIM),
}
ROBO_JS = """(rota) => { const M = FAB.motor, T = 16; let i = 0, st = {}, pulando = false, ymin = 1e9, quadros = 0;
  window.__robo = { passo: 0, fim: false };
  const larga = (k) => M.tecla(k, false);
  function reflexo(o, s, semBuraco) {   /* segura a seta e pula na frente de buraco, parede ou perigo (o robô de sempre) */
    M.tecla(s > 0 ? 'dir' : 'esq', true); larga(s > 0 ? 'esq' : 'dir');
    if (!pulando && o.noChao && ((o.buraco && !semBuraco) || o.parede || o.perigo)) { pulando = true; ymin = o.y; M.tecla('pulo', true); }
    else if (pulando) { if (o.y < ymin) ymin = o.y; else if (!o.noChao && o.y > ymin + 1 || o.noChao && o.y >= ymin) { pulando = false; larga('pulo'); } }
  }
  function proximo() { ['dir', 'esq', 'pulo', 'baixo'].forEach(larga); pulando = false; i++; st = {}; quadros = 0; window.__robo.passo = i; }
  (function passo() {
    if (!M.rodando()) { window.__robo.fim = true; return; }
    const o = M.olha();
    if (o && !document.getElementById('modal').classList.contains('on') && i < rota.length) {
      const p = rota[i], cx = o.x + o.w / 2, cy = o.y + o.h / 2; quadros++;
      if (p[0] === 'fim') reflexo(o, 1);
      else if (p[0] === 'ir') {
        const dx = p[1] * T + 8 - cx;
        if (Math.abs(dx) < 4 && o.noChao && !pulando) { larga('dir'); larga('esq'); if (Math.abs(o.vx) < 12) proximo(); }
        else reflexo(o, dx > 0 ? 1 : -1, Math.abs(dx) <= 28);   /* chegando: não pula o buraco do lado do alvo */
      } else if (p[0] === 'sobe' || p[0] === 'desce') {
        larga('dir'); larga('esq'); M.tecla(p[0] === 'sobe' ? 'pulo' : 'baixo', true);
        if (o.escada) st.viu = true;
        if (st.viu && !o.escada && o.noChao) proximo();
      } else if (p[0] === 'duplo') {
        larga('dir'); larga('esq');
        if (!st.f) { M.tecla('pulo', true); if (!o.noChao) st.f = 1; }
        else if (st.f === 1) { if (o.vy > -40) { larga('pulo'); st.f = 2; } }
        else if (st.f === 2) { M.tecla('pulo', true); st.f = 3; }
        else if (st.f === 3) { if (o.vy >= 0) { larga('pulo'); st.f = 4; } }
        else if (st.f === 4 && o.noChao) proximo();
      } else if (p[0] === 'cano') {
        larga('dir'); larga('esq');
        if (!st.x0) { st.x0 = o.x; st.y0 = o.y; }
        M.tecla('baixo', quadros % 20 < 3);
        if (Math.abs(o.x - st.x0) + Math.abs(o.y - st.y0) > 40) proximo();
      } else if (p[0] === 'nada') {
        const dx = p[1] * T + 8 - cx, dy = p[2] * T + 8 - cy;
        if (dx > 6) { M.tecla('dir', true); larga('esq'); } else if (dx < -6) { M.tecla('esq', true); larga('dir'); } else { larga('dir'); larga('esq'); }
        M.tecla('pulo', dy < -4);
        if (Math.abs(dx) < 10 && Math.abs(dy) < 12) proximo();
      }
    }
    requestAnimationFrame(passo); })(); }"""
falhas = []
quais = sys.argv[1:]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg0 = b.new_page(); pg0.add_init_script(MUDO); pg0.goto(URL); pg0.wait_for_timeout(300)
    modelos = pg0.evaluate("Object.keys(FAB.MODELOS)"); pg0.close()
    for mod in modelos:
        if quais and mod not in quais: continue
        prep, rota = ROTEIROS.get(mod, ("", FIM))
        pg = b.new_page(viewport={'width': 1280, 'height': 800}); pg.add_init_script(MUDO)
        erros = []; pg.on('pageerror', lambda e: erros.append(str(e)))
        pg.goto(URL); pg.wait_for_timeout(300)
        pg.evaluate(f"localStorage.clear(); FAB.novoJogo('{mod}'); {prep} FAB.salva();")
        pg.evaluate("FAB.ui.vai('testar')"); pg.wait_for_timeout(400)
        # o robô mora DENTRO da página e olha o jogo a cada quadro (a máquina de teste é lenta para ir e
        # voltar pelo Playwright). Usa só FAB.motor.olha() e FAB.motor.tecla().
        pg.evaluate(ROBO_JS, rota)
        for _ in range(1200):                      # até ~60 s
            if pg.evaluate("!FAB.motor.rodando()"): break
            if pg.evaluate("document.getElementById('modal').classList.contains('on')"):
                pg.keyboard.press('1'); pg.wait_for_timeout(250); pg.keyboard.press('Enter'); pg.wait_for_timeout(250); continue
            pg.wait_for_timeout(50)
        passo = pg.evaluate("(window.__robo||{}).passo")
        pg.evaluate("FAB.motor.rodando() && ['dir','esq','pulo','baixo'].forEach(function(k){FAB.motor.tecla(k,false)})"); pg.wait_for_timeout(1500)
        R = pg.evaluate("FAB.jogo().ultimoTeste")
        pg.screenshot(path=str(RAIZ / '_engenharia' / 'gate' / 'capturas' / f'robo_{mod}.png'))
        ok = bool(R and R.get('venceu'))
        print(mod, "GANHOU" if ok else f"NAO GANHOU (parou no passo {passo} de {len(rota)})", json.dumps({k: R.get(k) for k in ("pontos","segundos","vidasPerdidas","moedas","mortes")} if R else None))
        if not ok: falhas.append(mod)
        if erros: falhas.append(f'{mod}: ' + '; '.join(erros))
        pg.close()
    b.close()
print('JOGADOR-ROBÔ: ' + ('LIBERA' if not falhas else 'NÃO LIBERA ' + str(falhas)))
sys.exit(1 if falhas else 0)
