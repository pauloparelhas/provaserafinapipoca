# testa_corrida.py — PORTÃO DA CORRIDA (v7, 16/10): a posição tem de vir do MÉRITO.
# Crianças-robô de 3 habilidades (perfeita / boa / fraca) correm nos 3 níveis (easy / medium / hard).
# Página MUDA (REGRA ZERO). Relógio de teste acelerado.
# Uso: python testa_corrida.py [sementes=3] [rapido]   (rapido = só o necessário para o portão)
# Reprova (exit 1) se:
#  - alguma troca de posição aconteceu sem o carro passar INTEIRO e à vista (|dz| fora de 1..3 carrinhos);
#  - a habilidade não pesa: em cada nível (no easy pode empatar: todo mundo ganha), a média da criança perfeita não é melhor que a da boa, e a da boa que a da fraca;
#  - o nível não pesa: a criança boa não fica, em média, pior no hard que no easy;
#  - EASY: a criança boa não chega em 1º em pelo menos 2 de 3; HARD: a boa chega em 1º em todas (fácil demais);
#  - HARD: a perfeita não chega ao pódio; alguém não termina; erro de JavaScript.
import sys, os, json, time
from playwright.sync_api import sync_playwright
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'ferramentas', 'HIS3_jogo.html')).replace('\\', '/')
BOT = open(os.path.join(AQUI, 'crianca_bot.js'), encoding='utf-8').read()
MUDO = "try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){} window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };"
PERFIS = {
    'perfeita': {'acerto': 1.0, 'reflexo': .97, 'gas': .995, 'ruido': .08, 'turbo': .03, 'ultrapassa': 1},
    'boa':      {'acerto': .7,  'reflexo': .75, 'gas': .95,  'ruido': .3,  'turbo': .01, 'ultrapassa': .9},
    'fraca':    {'acerto': .4,  'reflexo': .35, 'gas': .8,   'ruido': .55, 'turbo': .004, 'ultrapassa': .5, 'tol': .2},
}
nsem = int(sys.argv[1]) if len(sys.argv) > 1 else 3
rapido = len(sys.argv) > 2 and sys.argv[2] == 'rapido'
plano = [(n, p) for n in ('easy', 'medium', 'hard') for p in ('perfeita', 'boa', 'fraca')]
falhas = []; res = {}; PITS_ALL = []; SOBRE = []
t0 = time.time()
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 960, 'height': 540}); pg.add_init_script(MUDO)
    erros = []; pg.on('pageerror', lambda e: erros.append(str(e)))
    pg.goto('file:///' + RAIZ); pg.evaluate("()=>{ localStorage.setItem('his3_jogo_v1', JSON.stringify({introVista:true,heroi:'lia'})); }"); pg.reload(); pg.wait_for_timeout(800)
    pg.evaluate(BOT)
    K = pg.evaluate("()=>({C:CORRIDA._K.COMPR, S:CORRIDA._K.SEG})")
    for nivel, perfil in plano:
        for sd in range(nsem):
            pg.wait_for_timeout(300)
            o = dict(PERFIS[perfil]); o.update({'seed': 11 + sd * 53 + len(perfil) * 7, 'nivel': nivel, 'limite': 420})
            pg.evaluate("(o)=>{ __his3.JOGO.relogioTeste(true); try{ UI.fechaMenu(); }catch(e){} __his3.JOGO.iniciaFase(__his3.FASES.LISTA[2]); CRIANCA.inicia(o); }", o)
            for _ in range(400):
                if pg.evaluate("()=>CRIANCA.passo(600).fim"): break
            rel = pg.evaluate("()=>CRIANCA.relatorio()")
            c = rel.get('corrida') or {}
            tro = c.get('trocas') or []
            ruins = [t for t in tro if not (K['C'] - 2 <= abs(t['dz']) <= K['C'] + 3 * K['S'])]
            if ruins: falhas.append('%s/%s: troca de posição sem ultrapassagem à vista %s' % (nivel, perfil, ruins[:3]))
            if not rel['fim'] or rel['esgotou']: falhas.append('%s/%s: não terminou' % (nivel, perfil))
            PITS_ALL.extend([pp for pp in (c.get('pitLog') or []) if pp.get('depois') is not None and pp.get('erros') is not None])
            SOBRE.append(c.get('sobrepos') or 0)
            res.setdefault((nivel, perfil), []).append({'pos': c.get('pos'), 'pag': c.get('pag'), 'trocas': len(tro), 'turbos': c.get('turbos'), 'tempo': rel['tempo']})
        r = res[(nivel, perfil)]
        print('%-6s %-8s posições %s  páginas %s  ultrapassagens %s  turbos %s  tempo %s' % (nivel, perfil, [x['pos'] for x in r], [x['pag'] for x in r], [x['trocas'] for x in r], [x['turbos'] for x in r], [x['tempo'] for x in r]), flush=True)
        pg.evaluate("()=>{ __his3.JOGO.relogioTeste(false); }")
    b.close()
def media(n, p): r = res[(n, p)]; return sum(x['pos'] or 10 for x in r) / len(r)
for n in ('easy', 'medium', 'hard'):
    mp, mb, mf = media(n, 'perfeita'), media(n, 'boa'), media(n, 'fraca')
    print('%-6s média: perfeita %.1f · boa %.1f · fraca %.1f' % (n, mp, mb, mf))
    if not (mp <= mb <= mf) or (n != 'easy' and mp == mf): falhas.append('%s: a habilidade não pesa (perfeita %.1f, boa %.1f, fraca %.1f)' % (n, mp, mb, mf))
if media('hard', 'boa') <= media('easy', 'boa'): falhas.append('o nível não pesa (boa: easy %.1f, hard %.1f)' % (media('easy', 'boa'), media('hard', 'boa')))
if sum(1 for x in res[('easy', 'boa')] if x['pos'] == 1) < (2 * nsem + 2) // 3: falhas.append('EASY difícil demais para a criança boa %s' % [x['pos'] for x in res[('easy', 'boa')]])
if all(x['pos'] == 1 for x in res[('hard', 'boa')]): falhas.append('HARD fácil demais: a criança boa ganhou todas')
if any((x['pos'] or 99) > 3 for x in res[('hard', 'perfeita')]): falhas.append('HARD: a criança perfeita ficou fora do pódio %s' % [x['pos'] for x in res[('hard', 'perfeita')]])
# o box tem de pesar: quem erra 2+ perde posição que NÃO volta logo na saída (10 s depois)
def media_perda(sel): return sum(p['depois'] - p['antes'] for p in sel) / max(1, len(sel))
p0 = [p for p in PITS_ALL if p['erros'] == 0]; p2 = [p for p in PITS_ALL if p['erros'] >= 2]
print('box: sem erro %.2f posições (%d boxes) · 2+ erros %.2f posições (%d boxes) · sobreposições %s' % (media_perda(p0), len(p0), media_perda(p2), len(p2), sum(SOBRE)))
if p2 and media_perda(p2) - media_perda(p0) < .5: falhas.append('o erro no box não custa posição de verdade (%.2f vs %.2f)' % (media_perda(p2), media_perda(p0)))
if sum(SOBRE) > 0: falhas.append('carrinhos passaram por dentro uns dos outros (%d quadros)' % sum(SOBRE))
if erros: falhas.append('erros de JavaScript: ' + '; '.join(erros[:3]))
print('tempo real do teste: %.0f s' % (time.time() - t0))
print('CORRIDA ' + ('REPROVADA:\n  ' + '\n  '.join(falhas) if falhas else 'APROVADA'))
sys.exit(1 if falhas else 0)
