"""QA de layout dos produtos GEO2 — retrato 360x640 e paisagem 740x360.

Checa, em cada tela: erro de console, rolagem horizontal do body, alvos de
toque < 44px, sobreposicao entre elementos irmaos e texto cortado (overflow).
"""
import sys, json
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8765/ferramentas/"
OUT = sys.argv[1] if len(sys.argv) > 1 else "."

VIEWPORTS = [("retrato", 360, 640), ("paisagem", 740, 360), ("notebook", 1280, 800)]

PROBE = r"""
() => {
  const out = {hscroll: document.documentElement.scrollWidth > window.innerWidth + 1,
               scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
               small: [], clipped: [], overlap: []};
  const vis = el => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  // alvos de toque
  document.querySelectorAll('button,[onclick],a').forEach(el => {
    if (!vis(el)) return;
    const r = el.getBoundingClientRect();
    if (r.height < 44 || r.width < 30) {
      out.small.push({sel: el.className || el.tagName, t: (el.textContent||'').trim().slice(0,28),
                      w: Math.round(r.width), h: Math.round(r.height)});
    }
  });
  // texto cortado (conteudo maior que a caixa, sem rolagem propria)
  document.querySelectorAll('*').forEach(el => {
    if (!vis(el)) return;
    const s = getComputedStyle(el);
    if (s.overflow === 'auto' || s.overflow === 'scroll' || s.overflowY === 'auto' || s.overflowY === 'scroll') return;
    if (s.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 4 && el.clientHeight > 0) {
      out.clipped.push({sel: el.className || el.tagName, t: (el.textContent||'').trim().slice(0,32),
                        ch: el.clientHeight, sh: el.scrollHeight});
    }
  });
  // sobreposicao entre IRMAOS posicionados no fluxo (ignora absolute/fixed e pai/filho)
  const cands = [...document.querySelectorAll('body *')].filter(el => {
    if (!vis(el)) return false;
    const s = getComputedStyle(el);
    if (s.position === 'absolute' || s.position === 'fixed' || s.position === 'sticky') return false;
    return el.children.length === 0 || ['DIV','SECTION','BUTTON'].includes(el.tagName);
  });
  for (let i = 0; i < cands.length; i++) {
    const a = cands[i];
    for (const b of [...(a.parentElement ? a.parentElement.children : [])]) {
      if (b === a || !vis(b)) continue;
      const s = getComputedStyle(b);
      if (s.position === 'absolute' || s.position === 'fixed' || s.position === 'sticky') continue;
      // inline que quebra em varias linhas tem retangulo que cobre as linhas
      // inteiras — dois <b> em linhas vizinhas dao falso positivo
      if (s.display.startsWith('inline') || getComputedStyle(a).display.startsWith('inline')) continue;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
      const oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (ox > 6 && oy > 6) {
        const k = [a.className||a.tagName, b.className||b.tagName].sort().join(' // ');
        if (!out.overlap.some(o => o.k === k)) out.overlap.push({k, ox: Math.round(ox), oy: Math.round(oy)});
      }
    }
  }
  return out;
}
"""

# [arquivo, rotulo da tela, script de setup (async) rodado antes da medicao]
SCREENS = [
    ("GEO2_simulado.html", "intro", None),
    ("GEO2_simulado.html", "mc", "start(10); for(let i=0;i<40&&deck[cur].type!=='mc';i++){cur=(cur+1)%total;render();}"),
    ("GEO2_simulado.html", "vf", "start(50); for(let i=0;i<200&&deck[cur].type!=='vf';i++){cur=(cur+1)%total;render();}"),
    ("GEO2_simulado.html", "fill", "start(100); for(let i=0;i<300&&deck[cur].type!=='fill';i++){cur=(cur+1)%total;render();}"),
    ("GEO2_simulado.html", "match", "start(100); for(let i=0;i<300&&deck[cur].type!=='match';i++){cur=(cur+1)%total;render();}"),
    ("GEO2_simulado.html", "order", "start(100); for(let i=0;i<300&&deck[cur].type!=='order';i++){cur=(cur+1)%total;render();}"),
    ("GEO2_simulado.html", "open", "start(100); for(let i=0;i<300&&deck[cur].type!=='open';i++){cur=(cur+1)%total;render();}"),
    ("GEO2_flashcards.html", "menu", None),
    ("GEO2_flashcards.html", "carta", "abrir(0)"),
    ("GEO2_flashcards.html", "carta-virada", "abrir(0); virar()"),
    ("GEO2_dragdrop.html", "menu", None),
    ("GEO2_dragdrop.html", "jogo1", "openGame(0)"),
    ("GEO2_dragdrop.html", "jogo-regioes", "openGame(GAMES.length-1)"),
    ("GEO2_popit.html", "menu", None),
    ("GEO2_popit.html", "nivel1", "openGame(0)"),
    ("GEO2_estudo.html", "folha", None),
    ("GEO2_estudo.html", "palavras", "showTab('words')"),
    ("GEO2_estudo.html", "mapa", "showTab('map')"),
    ("GEO2_galeria.html", "grade", None),
    ("GEO2_galeria.html", "lightbox", "openLb(3)"),
    ("GEO2_nlm.html", "quiz", None),
    ("GEO2_nlm.html", "revisao", "showTab('rev')"),
    ("GEO2_video.html", "player", None),
    ("GEO2_aventura.html", "mapa", None),
]

def run():
    findings = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for vname, vw, vh in VIEWPORTS:
            ctx = browser.new_context(viewport={"width": vw, "height": vh},
                                      device_scale_factor=1,
                                      is_mobile=(vname != "notebook"),
                                      has_touch=(vname != "notebook"))
            # MUDO OBRIGATORIO: o QA nunca pode fazer o computador falar.
            # Neutraliza TTS e WebAudio ANTES de qualquer script da pagina rodar.
            ctx.add_init_script("""
              try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){};
                   speechSynthesis.getVoices=function(){return [];}; }catch(e){}
              window.SpeechSynthesisUtterance=function(){};
              window.AudioContext=window.webkitAudioContext=function(){
                throw new Error('audio desligado no QA'); };
              window.say=function(){};
            """)
            page = ctx.new_page()
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
            for f, label, setup in SCREENS:
                errors.clear()
                page.goto(BASE + f, wait_until="networkidle")
                page.wait_for_timeout(350)
                if setup:
                    try:
                        page.evaluate(setup)
                    except Exception as e:
                        findings.append({"v": vname, "f": f, "s": label, "erro_setup": str(e)[:200]})
                        continue
                    page.wait_for_timeout(250)
                try:
                    r = page.evaluate(PROBE)
                except Exception as e:
                    findings.append({"v": vname, "f": f, "s": label, "erro_probe": str(e)[:200]})
                    continue
                r.update({"v": vname, "f": f, "s": label, "js_errors": errors[:5]})
                findings.append(r)
            ctx.close()
        browser.close()
    return findings

res = run()
bad = 0
for r in res:
    tag = f"{r['v']:<9} {r['f']:<22} {r['s']:<14}"
    probs = []
    if r.get("erro_setup"): probs.append("SETUP: " + r["erro_setup"])
    if r.get("erro_probe"): probs.append("PROBE: " + r["erro_probe"])
    if r.get("js_errors"): probs.append("JS: " + " | ".join(r["js_errors"]))
    if r.get("hscroll"): probs.append(f"ROLAGEM HORIZONTAL {r['scrollW']}>{r['innerW']}")
    for s in r.get("small", []): probs.append(f"ALVO {s['w']}x{s['h']} [{s['sel']}] {s['t']}")
    for c in r.get("clipped", []): probs.append(f"CORTADO {c['ch']}<{c['sh']} [{c['sel']}] {c['t']}")
    for o in r.get("overlap", []): probs.append(f"SOBREPOE {o['ox']}x{o['oy']} {o['k']}")
    if probs:
        bad += 1
        print(tag)
        for x in probs: print("      -", x)
print(f"\n=== {len(res)} telas medidas, {bad} com achado(s) ===")
