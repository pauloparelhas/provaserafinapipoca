# testa_criancas.py — PORTÃO DE JOGABILIDADE (rápido): crianças-robô jogam cada reino do começo ao fim.
# Uso: python testa_criancas.py [reinos=0,1,3,4,5,6,7,8,2] [sementes=4]
# Página MUDA (REGRA ZERO). Relógio de teste: o jogo avança por JOGO.passoFixo, sem esperar tempo real.
# Reprova (exit 1) se: alguma criança não termina em 4 min de jogo; mais de 3 quedas num trecho de 8 tiles;
# mais de 8 quedas no reino; travou mais de 3 vezes. Imprime um resumo por reino e os trechos mais perigosos.
import sys, os, json, time
from playwright.sync_api import sync_playwright
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'ferramentas', 'HIS3_jogo.html')).replace('\\', '/')
BOT = open(os.path.join(AQUI, 'crianca_bot.js'), encoding='utf-8').read()
MUDO = "try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){} window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };"
NOMES = {0: 'Escola', 1: 'Casa', 2: 'Corrida', 3: 'Fazenda', 4: 'Rios', 5: 'Cidade', 6: 'Estadio', 7: 'Trilha', 8: 'Museu'}
reinos = [int(x) for x in (sys.argv[1] if len(sys.argv) > 1 else '0,1,3,4,5,6,7,8,2').split(',')]
nsem = int(sys.argv[2]) if len(sys.argv) > 2 else 4
falhas = []; resumo = {}
t0 = time.time()
with sync_playwright() as pw:
    b = pw.chromium.launch(); p = b.new_page(viewport={'width': 960, 'height': 540}); p.add_init_script(MUDO)
    erros = []; p.on('pageerror', lambda e: erros.append(str(e) + ' @ ' + ' | '.join((e.stack or '').splitlines()[1:3])))
    p.goto('file:///' + RAIZ); p.evaluate("()=>{ localStorage.setItem('his3_jogo_v1', JSON.stringify({introVista:true,heroi:'lia'})); }"); p.reload(); p.wait_for_timeout(800)
    p.evaluate(BOT)
    for r in reinos:
        corridas = []
        for sd in range(nsem):
            if sd: p.wait_for_timeout(1300)  # os setTimeout do fim da rodada anterior vencem antes da próxima
            p.evaluate("([r,sd])=>{ __his3.JOGO.relogioTeste(true); try{ UI.fechaMenu(); }catch(e){} __his3.JOGO.iniciaFase(__his3.FASES.LISTA[r]); CRIANCA.inicia({seed:101+sd*37+r, acerto:.7, limite:r===2?420:(r===8?360:240)}); }", [r, sd])
            for _ in range(400):
                st = p.evaluate("()=>{ var s=CRIANCA.passo(600); return s.fim; }")
                if st: break
            rel = p.evaluate("()=>CRIANCA.relatorio()")
            corridas.append(rel)
        p.evaluate("()=>{ __his3.JOGO.relogioTeste(false); }"); p.wait_for_timeout(3000)  # deixa vencer os setTimeout do reino anterior (o final do castelo) antes do próximo
        # medidas
        terminou = sum(1 for c in corridas if c['fim'] and not c['esgotou'])
        quedas = [q['x'] for c in corridas for q in c['quedas']]
        piores = {}
        for x in quedas: piores[x // 8 * 8] = piores.get(x // 8 * 8, 0) + 1
        trecho = sorted(piores.items(), key=lambda kv: -kv[1])[:3]
        media_q = len(quedas) / max(1, len(corridas)); media_t = sum(c['tempo'] for c in corridas) / max(1, len(corridas))
        travas = sum(len(c['travou']) for c in corridas) / max(1, len(corridas))
        resumo[NOMES[r]] = {'terminaram': '%d/%d' % (terminou, len(corridas)), 'tempo_medio_s': round(media_t), 'quedas_por_crianca': round(media_q, 1), 'danos': sum(c['danos'] for c in corridas), 'travadas': round(travas, 1), 'trechos_perigosos': trecho, 'paradas': [c['x'] for c in corridas if c['esgotou']], 'onde_travou': [t['x'] for c in corridas for t in c['travou']][:10], 'estado_final': [c['estado']+'/'+str(c['chefe']) for c in corridas if c['esgotou']]}
        from collections import Counter
        resumo[NOMES[r]]['causas'] = dict(Counter('%s@%d' % (q.get('causa'), q['x']//8*8) for c in corridas for q in c['quedas']).most_common(4))
        if NOMES[r] == 'Corrida':
            cc = [c.get('corrida') or {} for c in corridas]
            resumo['Corrida']['posicoes'] = [x.get('pos') for x in cc]; resumo['Corrida']['paginas'] = [x.get('pag') for x in cc]; resumo['Corrida']['pior_na_volta2'] = [x.get('pior') for x in cc]
            if sum(1 for x in cc if x.get('pos') == 1) < 3: falhas.append('Corrida: no nível EASY, menos de 3 de 5 chegaram em 1º %s' % resumo['Corrida']['posicoes'])
            if any((x.get('pag') or 0) < 3 for x in cc): falhas.append('Corrida: criança seguindo a placa não fez os 3 boxes %s' % resumo['Corrida']['paginas'])
            if any((x.get('pos') or 99) > 4 for x in cc): falhas.append('Corrida: criança terminou fora do pódio %s' % resumo['Corrida']['posicoes'])
        if terminou < len(corridas): falhas.append('%s: %d de %d crianças não terminaram (pararam nos tiles %s)' % (NOMES[r], len(corridas) - terminou, len(corridas), resumo[NOMES[r]]['paradas']))
        if trecho and trecho[0][1] / max(1, len(corridas)) > 3: falhas.append('%s: trecho %d-%d derruba demais (%d quedas em %d crianças)' % (NOMES[r], trecho[0][0], trecho[0][0] + 7, trecho[0][1], len(corridas)))
        if media_q > 8: falhas.append('%s: %.1f quedas por criança' % (NOMES[r], media_q))
        if travas > 3: falhas.append('%s: travou %.1f vezes por criança' % (NOMES[r], travas))
        print(NOMES[r], json.dumps(resumo[NOMES[r]], ensure_ascii=False), flush=True)
    b.close()
if erros: falhas.append('erros de JavaScript: ' + '; '.join(erros[:3]))
print('tempo real do teste: %.0f s' % (time.time() - t0))
print('JOGABILIDADE ' + ('REPROVADA:\n  ' + '\n  '.join(falhas) if falhas else 'APROVADA'))
sys.exit(1 if falhas else 0)
