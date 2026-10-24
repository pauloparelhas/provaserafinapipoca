"""Portão da voz (MUDO: o teste nunca fala; FAB.fala só anota o que pediu).
Passeia pelas telas nos dois idiomas, aperta todo botão de ouvir, escolhe peças, abre a medalha,
troca a voz, e confere que toda frase FIXA pedida tem gravação (Thalita/Antonio ou Ava/Brian).
Frase sem gravação = falta rodar  node _engenharia/frases.js && python _engenharia/gera_audio.py
Uso: python teste_voz.py"""
import sys, pathlib, http.server, threading, functools
from playwright.sync_api import sync_playwright
RAIZ = pathlib.Path(__file__).resolve().parents[2]
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(_H, directory=str(RAIZ.parent)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{srv.server_address[1]}/coding/index.html'
MUDO = ("try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){}"
        "window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); }; HTMLMediaElement.prototype.play=function(){ return Promise.resolve(); }; HTMLMediaElement.prototype.load=function(){};")
TELAS = ['painel', 'ideia', 'pixel', 'fases', 'regras', 'testar', 'diario', 'robo', 'missoes', 'jogar', 'jeito']
falhas = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for lingua in ('pt', 'en'):
        pg = b.new_page(viewport={'width': 1280, 'height': 800}); pg.add_init_script(MUDO)
        erros = []; pg.on('pageerror', lambda e: erros.append(str(e)))
        pg.goto(URL); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
        pg.evaluate(f"FAB.E.prefs.lingua='{lingua}'; localStorage.setItem('fab_mariana_v1', JSON.stringify(FAB.E))"); pg.reload(); pg.wait_for_timeout(400)
        for t in TELAS:
            pg.evaluate(f"FAB.ui.vai('{t}')"); pg.wait_for_timeout(250)
            pg.evaluate("document.querySelectorAll('.falar').forEach(b => b.click())")
            if t == 'fases': pg.evaluate("document.querySelectorAll('.peca').forEach(b => b.click())")
            if t == 'testar': pg.wait_for_timeout(600); pg.evaluate("FAB.motor.termina()"); pg.wait_for_timeout(300); pg.evaluate("var c=document.querySelector('.cara'); c && c.click()")
            if t == 'testar': pg.evaluate("document.querySelectorAll('#tsDesejos [data-d], .falar').forEach(b => b.click())")
            if t == 'painel': pg.evaluate("FAB.ui.toqueSelo(); FAB.estadoSalvo='erro'; FAB.ui.toqueSelo(); FAB.estadoSalvo='salvo'; FAB.abreGuardar(); document.querySelectorAll('#mbox .falar').forEach(b => b.click()); FAB.ui.fecha(); FAB.ui.vai('painel')")
            pg.evaluate("FAB.ui._preso=false; FAB.ui.fecha()")
        pg.evaluate("FAB.ui.vai('fases'); FAB.ui.vai('painel'); document.querySelectorAll('.falar').forEach(b => b.click())")   # "Você parou em…"
        pg.evaluate("FAB.E.pedidos.push({id:'pVoz',tipo:'inimigo',como:'roxo',faz:'voa',estado:'pronto'}); FAB.T.painel._robo=false; FAB.ui.vai('painel')")
        pg.evaluate("FAB.MISSOES.forEach(m => FAB.fala(m.frase)); FAB.ui.trocaVoz(); FAB.ui.trocaVoz(); FAB.ui.medalha(FAB.MISSOES[0])")
        pg.evaluate("FAB.perguntasDaProva().slice(0, 40).forEach(q => { FAB.fala([q.p].concat(q.o)); FAB.fala(['Acertou!', q.ex]); })")
        falta = pg.evaluate("FAB.semAudio")
        print(lingua, 'frases sem gravação:', len(falta), '| erros:', erros[:2])
        for f in falta[:30]: print('   ', f)
        if falta or erros: falhas.append(lingua)
        pg.close()
    b.close()
print('VOZ: ' + ('OK' if not falhas else 'REPROVADA ' + str(falhas)))
sys.exit(1 if falhas else 0)
