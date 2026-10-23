"""gera_audio.py - grava as frases fixas da Fabrica com as duas vozes que a Mariana escolhe.
Le _engenharia/frases.json (feito por frases.js), grava audio/thalita/<chave>.mp3 e
audio/antonio/<chave>.mp3 (so o que falta), apaga gravacao que nao e mais usada e escreve
banco/audio_indice.js com as chaves que existem nas DUAS vozes.
Uso:  node _engenharia/frases.js && python _engenharia/gera_audio.py
Nao toca nada no alto-falante: so baixa arquivos (REGRA ZERO)."""
import asyncio, json, os, sys
import edge_tts

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
VOZES = {'thalita': 'pt-BR-ThalitaMultilingualNeural', 'antonio': 'pt-BR-AntonioNeural',
         'ava': 'en-US-AvaNeural', 'brian': 'en-US-BrianNeural'}
LINGUA = {'thalita': 'pt', 'antonio': 'pt', 'ava': 'en', 'brian': 'en'}
RITMO = '-6%'

async def grava(sem, voz, texto, destino, erros):
    async with sem:
        for tentativa in range(4):
            try:
                await edge_tts.Communicate(texto, VOZES[voz], rate=RITMO).save(destino + '.tmp')
                if os.path.getsize(destino + '.tmp') < 400: raise RuntimeError('arquivo vazio')
                os.replace(destino + '.tmp', destino); return
            except Exception as e:
                ultimo = e; await asyncio.sleep(1.5 * (tentativa + 1))
        erros.append((voz, texto, str(ultimo)))

async def main():
    F = {'pt': json.load(open(os.path.join(AQUI, 'frases.json'), encoding='utf-8')),
         'en': json.load(open(os.path.join(AQUI, 'frases_en.json'), encoding='utf-8'))}
    sem, erros, tarefas = asyncio.Semaphore(8), [], []
    for voz in VOZES:
        frases = F[LINGUA[voz]]
        pasta = os.path.join(RAIZ, 'audio', voz); os.makedirs(pasta, exist_ok=True)
        for f in os.listdir(pasta):
            if f.endswith('.mp3') and f[:-4] not in frases: os.remove(os.path.join(pasta, f))
        for k, t in frases.items():
            d = os.path.join(pasta, k + '.mp3')
            if not os.path.exists(d): tarefas.append(grava(sem, voz, t, d, erros))
    print('gravando', len(tarefas), 'arquivos...'); sys.stdout.flush()
    await asyncio.gather(*tarefas)
    linhas = []
    for L in ('pt', 'en'):
        vs = [v for v in VOZES if LINGUA[v] == L]
        ok = sorted(k for k in F[L] if all(os.path.exists(os.path.join(RAIZ, 'audio', v, k + '.mp3')) for v in vs))
        linhas.append('"%s":{%s}' % (L, ','.join('"%s":1' % k for k in ok)))
        print(L, 'gravadas nas duas vozes:', len(ok), 'de', len(F[L]))
    with open(os.path.join(RAIZ, 'banco', 'audio_indice.js'), 'w', encoding='utf-8') as fh:
        fh.write('/* gerado por _engenharia/gera_audio.py: frases gravadas (pt: Thalita e Antonio; en: Ava e Brian). Nao editar a mao */\n')
        fh.write('window.FAB = window.FAB || {};\nFAB.AUDIO = {' + ','.join(linhas) + '};\n')
    print('falhas:', len(erros))
    for e in erros[:10]: print('  falhou', e)
    sys.exit(1 if erros else 0)

asyncio.run(main())
