# -*- coding: utf-8 -*-
"""ING3: junta o video mudo (capturar.py video) com a narracao e grava o mp4 final + poster.
NAO toca nenhum audio.
Uso: python montar.py <scratch>
  -> ferramentas/media/video_ing3.mp4 (x264 crf 32 slow/animation, AAC 80k mono, faststart)
  -> ferramentas/media/video_ing3_poster.jpg (quadro da abertura)
A arte do jogo e cheia de textura e parallax: com o crf 23 do capturar.py o mudo sai ~42 MB;
o crf 32 deixa o final do tamanho do video de Portugues (~16 MB) sem borrar o texto.
"""
import os, subprocess, sys

SCR = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
MEDIA = os.path.abspath(os.path.join(AQUI, "..", "..", "..", "ferramentas", "media"))
MP4 = os.path.join(MEDIA, "video_ing3.mp4")
POSTER = os.path.join(MEDIA, "video_ing3_poster.jpg")

subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(SCR, "video_mudo.mp4"), "-i", os.path.join(SCR, "narracao.wav"),
                "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "slow", "-tune", "animation", "-crf", "32",
                "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "80k", "-ac", "1", "-movflags", "+faststart", "-shortest", MP4], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", "2.2", "-i", os.path.join(SCR, "video_mudo.mp4"), "-frames:v", "1",
                "-q:v", "4", POSTER], check=True)
for p in (MP4, POSTER):
    print(p, os.path.getsize(p))
