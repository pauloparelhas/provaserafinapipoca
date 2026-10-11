# -*- coding: utf-8 -*-
"""Gera a narracao (Thalita, edge-tts) frase a frase, mede a duracao real e monta
a linha do tempo do video.

Saidas (em OUT, por padrao o scratch passado por argumento):
  frases/NN_MM.mp3     um audio por frase
  narracao.wav         audio inteiro, com silencios entre frases e cenas
  timeline.json        cenas, frases (inicio/fim), palavras (inicio/fim)
  timeline.js          o mesmo, como `window.TL = {...}` para a pagina de render

NAO toca nenhum audio (regra do dono).
Uso: python gerar_audio.py <pasta_saida> [pasta_antiga]
  Com pasta_antiga (scratch de uma geracao anterior), a frase cujo texto_tts nao mudou
  reaproveita o mp3 e as palavras de la; so as frases novas/alteradas vao ao edge-tts.
"""
import asyncio, json, os, subprocess, sys, wave, re, unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from roteiro_frases import CENAS, TITULO

VOZ = "pt-BR-ThalitaMultilingualNeural"
RATE = "-8%"
SR = 24000
T_TITULO = 2.8      # abertura muda
LEAD = 0.7          # silencio no comeco de cada cena
GAP = 0.45          # entre frases
TAIL = 1.0          # fim de cada cena
T_FIM = 2.0         # cauda final

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
os.makedirs(os.path.join(OUT, "frases"), exist_ok=True)
OLD = sys.argv[2] if len(sys.argv) > 2 else None
OLD_TL = {}
if OLD:
    _tl = json.load(open(os.path.join(OLD, "timeline.json"), encoding="utf-8"))
    for _ci, _c in enumerate(_tl["cenas"]):
        for _fi, _f in enumerate(_c["frases"]):
            _ws = [{"t": p["ini"] - _f["ini"], "d": p["fim"] - p["ini"], "w": p["w"]}
                   for p in _c["palavras"] if p["f"] == _fi]
            OLD_TL[(_c["id"], _f["tts"])] = (os.path.join(OLD, "frases", f"{_ci+1:02d}_{_fi+1:02d}.mp3"), _ws)

import edge_tts


def norm(w):
    w = unicodedata.normalize("NFC", w.lower())
    return re.sub(r"[^\wáàâãéêíóôõúüç-]", "", w)


async def tts(texto, mp3):
    com = edge_tts.Communicate(texto, VOZ, rate=RATE, boundary="WordBoundary")
    words = []
    with open(mp3, "wb") as f:
        async for ch in com.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7, "w": ch["text"]})
    return words


def ffprobe_dur(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=nk=1:nw=1", p], capture_output=True, text=True)
    return float(r.stdout.strip())


def to_pcm(mp3):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", mp3, "-f", "s16le", "-ac", "1",
                        "-ar", str(SR), "-"], capture_output=True)
    return r.stdout


async def main():
    pcm = bytearray()
    def silence(sec):
        pcm.extend(b"\x00\x00" * int(round(sec * SR)))
    def now():
        return len(pcm) / 2 / SR

    silence(T_TITULO)
    tl = {"titulo": TITULO, "voz": VOZ, "rate": RATE, "t_titulo": T_TITULO, "cenas": []}
    for ci, (cid, nome, frases) in enumerate(CENAS):
        cena = {"id": cid, "nome": nome, "ini": now(), "frases": [], "palavras": []}
        silence(LEAD)
        for fi, (leg, txt) in enumerate(frases):
            mp3 = os.path.join(OUT, "frases", f"{ci+1:02d}_{fi+1:02d}.mp3")
            velho = OLD_TL.get((cid, txt))
            if velho and os.path.exists(velho[0]):
                import shutil
                if os.path.abspath(velho[0]) != os.path.abspath(mp3):
                    shutil.copy(velho[0], mp3)
                words = velho[1]
                print("  reaproveitada", mp3)
            for tent in ([] if velho and os.path.exists(velho[0]) else range(4)):
                try:
                    words = await tts(txt, mp3)
                    break
                except Exception as e:
                    print("  retry", mp3, e); await asyncio.sleep(2)
            else:
                if not (velho and os.path.exists(velho[0])):
                    raise SystemExit("TTS falhou: " + mp3)
            raw = to_pcm(mp3)
            dur = len(raw) / 2 / SR
            dprobe = ffprobe_dur(mp3)
            t0 = now()
            pcm.extend(raw)
            cena["frases"].append({"leg": leg, "tts": txt, "ini": round(t0, 3),
                                   "fim": round(t0 + dur, 3), "dur_ffprobe": round(dprobe, 3)})
            for w in words:
                cena["palavras"].append({"w": norm(w["w"]), "ini": round(t0 + w["t"], 3),
                                         "fim": round(t0 + w["t"] + w["d"], 3), "f": fi})
            print(f"{ci+1:02d}.{fi+1:02d} {dur:5.2f}s (ffprobe {dprobe:5.2f}) {leg}")
            if fi < len(frases) - 1:
                silence(GAP)
        silence(TAIL)
        cena["fim"] = round(now(), 3)
        cena["ini"] = round(cena["ini"], 3)
        tl["cenas"].append(cena)
    silence(T_FIM)
    tl["total"] = round(now(), 3)

    with wave.open(os.path.join(OUT, "narracao.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(bytes(pcm))
    with open(os.path.join(OUT, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump(tl, f, ensure_ascii=False, indent=1)
    with open(os.path.join(OUT, "timeline.js"), "w", encoding="utf-8") as f:
        f.write("window.TL=" + json.dumps(tl, ensure_ascii=False) + ";\n")
    print("TOTAL", tl["total"])
    for c in tl["cenas"]:
        print(f"  {c['ini']:7.2f}-{c['fim']:7.2f}  {c['nome']}")

asyncio.run(main())
