# Gera ferramentas/HIS3_jogo_mapas.js a partir dos mapas do jogo de Inglês (ferramentas/ING3_jogo_mapas.js),
# remapeando os ids para as fases de História, e acrescenta a fase 2 VERTICAL (Casa da Vovó: do porão
# ao sótão, como as fases verticais do jogo de Português).
#   ING3 1 vila    -> HIS3 1 Escola do Tempo
#   ING3 2 bosque  -> HIS3 4 Fazenda (o ovo 'P' vira o cavalo do Seu Pedro)
#   ING3 4 recife  -> HIS3 5 Rios Antigos (nado)
#   ING3 6 ginásio -> HIS3 6 Cidade em Construção (aparelhos = ganchos e vigas)
#   ING3 7/8/9     -> HIS3 7/8/9 (estádio, trilha, museu)
#   ING3 5 céu     -> fora (sem fase de voo em História)
# Física (HIS3_jogo_motor.js): pulo sobe 3,4 tiles, alcance 4,8 tiles; herói grande = 3 tiles de altura livre.
import os, re, json
F = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'ferramentas')
src = open(os.path.join(F, 'ING3_jogo_mapas.js'), encoding='utf-8').read()
g = {}
exec_js = src[src.index('window.MAPAS'):]
# transforma o objeto JS em dict python: chaves numéricas e main/sub/sup/passos
py = exec_js.replace('window.MAPAS =', 'M =').replace('window.MAPAS=', 'M=')
py = re.sub(r'(\n\s*)(\d+):\{', r'\1\2:{', py)
py = re.sub(r'([{,]\s*)(main|sub|sup|passos)\s*:', r'\1"\2":', py)
py = re.sub(r'([{,]\s*)(\d+)\s*:', r'\1\2:', py)
py = py.rstrip().rstrip(';')
exec(py, g)
M = g['M']

H, W = 34, 40
def casa():
    g = [[' '] * W for _ in range(H)]
    def p(c, r, ch): g[r][c] = ch
    def fx(c0, c1, r, ch):
        for c in range(c0, c1 + 1): g[r][c] = ch
    for r in range(H): g[r][0] = g[r][W - 1] = '#'           # paredes da casa
    fx(0, W - 1, 0, '#'); fx(0, W - 1, 1, '#')               # telhado
    fx(0, W - 1, 32, '#'); fx(0, W - 1, 33, '#')             # chão do porão
    # lajes dos andares (linha de apoio) com o buraco da "escada" alternando lados
    # buraco de 4 tiles; o degrau fica na metade ESQUERDA do buraco: o pulo sobe e cai na laje à direita
    # o buraco fica encostado na parede: só há um lado para subir (o mapa ziguezagueia)
    # escada de 2 degraus de 2 tiles (pulo confortável para 7 anos): degrau 1 ao lado, degrau 2 debaixo do buraco
    # pulo simples sobe ~2,8 tiles: cada laje tem uma escadinha de 2 degraus de 2 tiles, os dois DENTRO do buraco
    # (nada depende do poder; as pantufas só facilitam)
    for r, h0, e0, d0 in [(26, 35, 35, 37), (20, 1, 3, 1), (14, 35, 35, 37), (8, 1, 3, 1)]:
        fx(1, W - 2, r, '#'); fx(h0, h0 + 3, r, ' ')
        fx(e0, e0 + 1, r + 4, '=')                            # degrau 1
        fx(d0, d0 + 1, r + 2, '=')                            # degrau 2
    # PORÃO (r=32): começo calmo, o poder, uma poeira, baú para pular
    p(3, 31, 'U'); fx(6, 9, 30, 'o')
    p(12, 31, '*')                                            # o poder da fase (pantufas saltadoras)
    p(17, 31, 'c')
    fx(21, 22, 31, '#'); fx(21, 22, 30, 'o')                  # baú baixo
    p(27, 31, 'i')                                            # bolinha de poeira (se pisa)
    # SALA (r=26)
    p(33, 25, 'c'); fx(26, 29, 23, 'o')
    p(28, 25, 'D')                                            # 1ª porta: a Vovó conta (fonte oral)
    fx(18, 19, 25, '#'); fx(18, 19, 24, 'o')                  # mesinha baixa (sob a laje só cabe obstáculo baixo)
    p(14, 25, 'i')
    fx(9, 10, 25, '#')                                        # sofá antigo
    # QUARTO (r=20)
    p(6, 19, 'c')
    p(10, 19, 'D')                                            # 2ª porta: o baú das fontes
    fx(16, 17, 19, '#')                                       # cômoda
    fx(22, 25, 19, 'o')
    p(28, 19, 'i')
    # CORREDOR (r=14)
    p(33, 13, 'c')
    p(20, 13, 'i'); fx(15, 18, 13, 'o'); fx(25, 26, 13, '#')
    p(12, 13, 'E')                                             # Traçona (mini-chefe)
    # SÓTÃO (r=8)
    p(6, 7, 'c')
    p(14, 7, 'D')                                             # 3ª porta: o álbum de fotos
    fx(20, 22, 5, 'o')
    p(26, 7, 'i')
    p(35, 7, 'F')                                             # o fim da fase
    return [''.join(l) for l in g]

OUT = {1: M[1], 2: {'main': casa()}, 4: M[2], 5: M[4], 6: M[6], 7: M[7], 8: M[8], 9: M[9]}
OUT[4] = {k: ([s.replace('P', ' ') for s in v] if k in ('main', 'sub') else v) for k, v in OUT[4].items()}
OUT[4]['main'] = [s for s in OUT[4]['main']]
# o cavalo do Seu Pedro entra no lugar do ovo do Pip (mesma posição)
for r, s in enumerate(M[2]['main']):
    if 'P' in s: c = s.index('P'); row = list(OUT[4]['main'][r]); row[c] = 'P'; OUT[4]['main'][r] = ''.join(row)
# Trilha (fase 8): o objeto do alto (col ~107) segurava a criança ~15 s; desce para 2 tiles acima do chão
_m = [list(r) for r in OUT[8]['main']]
for c in range(100, 115):
    if _m[4][c] == '&': _m[4][c] = ' '; _m[7][c] = '&'
    if _m[5][c] == '=': _m[5][c] = ' '; _m[8][c] = '='
    if _m[7][c] == 'n': _m[7][c] = ' '
OUT[8]['main'] = [''.join(r) for r in _m]
js = ['/* HIS3_jogo_mapas.js — GERADO por trabalho/3tri_historia/gen/gen_mapas_his3.py. Não editar à mão. */', 'window.MAPAS = {']
for k in sorted(OUT):
    d = OUT[k]; parts = []
    for key in ('sup', 'main', 'sub', 'passos'):
        if key not in d: continue
        v = d[key]
        if isinstance(v, list): parts.append(key + ':[\n' + ',\n'.join('    ' + json.dumps(s) for s in v) + '\n  ]')
        else: parts.append(key + ':' + json.dumps(v))
    js.append('  %d:{%s},' % (k, ', '.join(parts)))
js.append('};')
open(os.path.join(F, 'HIS3_jogo_mapas.js'), 'w', encoding='utf-8').write('\n'.join(js) + '\n')
print('ok', {k: (len(OUT[k]['main']), len(OUT[k]['main'][0])) for k in OUT})
for s in OUT[2]['main']: print(s)
