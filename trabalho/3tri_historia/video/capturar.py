# -*- coding: utf-8 -*-
"""HIS3 (copia do ING3, adaptada do video LP3). Captura o video quadro a quadro (Playwright + ffmpeg). Mudo: a pagina nao tem audio.

  python capturar.py <scratch> check              -> varre a linha do tempo, lista erros e palavras nao achadas
  python capturar.py <scratch> frames t1 t2 ...   -> PNGs em <scratch>/frames/
  python capturar.py <scratch> video [workers]    -> <scratch>/video_mudo.mp4 (segmentos em paralelo)
  python capturar.py <scratch> seg i n            -> (interno) segmento i de n

A pagina de render (render.html + js) e copiada para <scratch>/web junto com timeline.js.
"""
import base64, os, shutil, subprocess, sys, json, math

AQUI = os.path.dirname(os.path.abspath(__file__))
SCR = sys.argv[1]
MODO = sys.argv[2]
WEB = os.path.join(SCR, "web")
FPS = 30


# ING3: a arte do JOGO de Ingles (ferramentas/) e os ajudantes de desenho do video LP3,
# lidos de onde estao (nada e alterado la; so copiados para a pasta de render)
RAIZ = os.path.abspath(os.path.join(AQUI, "..", "..", ".."))
FERR = os.path.join(RAIZ, "ferramentas")
LP3V = os.path.join(RAIZ, "trabalho", "3tri_portugues", "video")
EXTRA = [os.path.join(FERR, f) for f in ("LP3_jornada_arte.js", "LP3_jornada_arte2.js", "LP3_jornada_arte3.js",
         "HIS3_jogo_arte.js", "HIS3_jogo_arte2.js", "HIS3_jogo_arte3.js", "HIS3_jogo_arte4.js", "HIS3_jogo_arte5.js", "HIS3_jogo_arteA.js", "HIS3_jogo_arteA2.js", "HIS3_jogo_arteB.js", "HIS3_jogo_arteB2.js", "HIS3_jogo_arteC.js")] +         [os.path.join(LP3V, f) for f in ("chars.js", "props.js", "props2.js", "props3.js", "cenas1.js", "cenas_v2a.js")]


def preparar_web():
    os.makedirs(WEB, exist_ok=True)
    for f in EXTRA:
        if os.path.exists(f):
            shutil.copy(f, WEB)
        else:
            open(os.path.join(WEB, os.path.basename(f)), "w").write("/* ausente */")
    for f in os.listdir(AQUI):
        if f.endswith((".html", ".js")):
            shutil.copy(os.path.join(AQUI, f), WEB)
    shutil.copy(os.path.join(SCR, "timeline.js"), WEB)


def abrir(p):
    from playwright.sync_api import sync_playwright
    pw = sync_playwright().start()
    br = pw.chromium.launch(args=["--mute-audio"])
    pg = br.new_page(viewport={"width": 1280, "height": 720})
    erros = []
    pg.on("pageerror", lambda e: erros.append(str(e)))
    pg.on("console", lambda m: erros.append("console: " + m.text) if m.type == "error" else None)
    pg.goto("file:///" + os.path.join(WEB, "render.html").replace("\\", "/"))
    pg.wait_for_function("typeof window.render === 'function'")
    return pw, br, pg, erros


def total():
    tl = json.load(open(os.path.join(SCR, "timeline.json"), encoding="utf-8"))
    return tl["total"]


def jpeg(pg, t):
    d = pg.evaluate(f"frameJPEG({t:.5f}, 0.93)")
    return base64.b64decode(d.split(",", 1)[1])


if MODO == "check":
    preparar_web()
    pw, br, pg, erros = abrir(None)
    T = total(); n = int(T * 4)
    for k in range(n):
        pg.evaluate(f"render({k/4:.3f})")
    print("erros:", erros[:20])
    print("faltando:", pg.evaluate("MISSING"))
    br.close(); pw.stop()

elif MODO == "frames":
    preparar_web()
    pw, br, pg, erros = abrir(None)
    out = os.path.join(SCR, "frames"); os.makedirs(out, exist_ok=True)
    for t in sys.argv[3:]:
        pg.evaluate(f"render({float(t)})")
        pg.locator("#cv").screenshot(path=os.path.join(out, f"f_{float(t):07.2f}.png"))
    print("erros:", erros[:20]); print("faltando:", pg.evaluate("MISSING"))
    br.close(); pw.stop()

elif MODO == "seg":
    i, n = int(sys.argv[3]), int(sys.argv[4])
    NF = int(math.ceil(total() * FPS))
    a, b = NF * i // n, NF * (i + 1) // n
    pw, br, pg, erros = abrir(None)
    seg = os.path.join(SCR, f"seg_{i:02d}.mp4")
    ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg",
                           "-i", "-", "-vf", "scale=in_range=pc:out_range=tv,format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-color_range", "tv",
                           "-r", str(FPS), seg], stdin=subprocess.PIPE)
    for f in range(a, b):
        ff.stdin.write(jpeg(pg, f / FPS))
        if (f - a) % 600 == 0:
            print(f"seg {i}: {f-a}/{b-a}", flush=True)
    ff.stdin.close(); ff.wait()
    if erros: print("ERROS seg", i, erros[:10])
    br.close(); pw.stop()
    print(f"seg {i} ok ({b-a} quadros)")

elif MODO == "video":
    preparar_web()
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 4
    procs = [subprocess.Popen([sys.executable, __file__, SCR, "seg", str(i), str(n)]) for i in range(n)]
    for p in procs: p.wait()
    lst = os.path.join(SCR, "segs.txt")
    with open(lst, "w") as f:
        for i in range(n): f.write(f"file 'seg_{i:02d}.mp4'\n")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy",
                    os.path.join(SCR, "video_mudo.mp4")], check=True)
    print("video_mudo.mp4 pronto")
