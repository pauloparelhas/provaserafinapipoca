# Gera ferramentas/CIE3_jogo_mapas.js — Motion Rangers (BIBLIA_CIE3.md), REFEITURA 03/11 (CRITICA_JOGO.md).
# Os mapas NÃO são mais novos: são as grades validadas do Inglês (ING3) e da História (HIS3), como o HIS3 fez
# (gen_mapas_his3.py), com acréscimos de perigo para cumprir as métricas v2 (GAME_DESIGN_v2.md:48):
#   sala    <- ING1 vila     (plataforma)      escola <- ING2 bosque (o ovo 'P' do Pip vira o poder '*')
#   torre   <- HIS2 casa     (vertical)        rio    <- ING4 recife (nado)
#   campo   <- ING5 céu      (voo; vento que ajuda '>' '}' e que atrapalha '<' '~' 'Z')
#   parque  <- ING6 ginásio  (aparelhos = brinquedos)   estádio <- ING7 (o '*' vira a bicicleta 'P')
#   rally = corrida herdada (grade vazia)               Twister = chefão do ING9
# Toda fase de plataforma ganha um SUBMUNDO próprio (canos 1/2) com a 3ª porta: 2 portas no mundo + 1 embaixo.
# Física (motor): pulo sobe 3,4 tiles, alcance 4,8; herói grande = 3 tiles de altura livre.
# Símbolo novo (CIE3_jogo_cie.js): '}' = corrente de ar que SOBE (vento que ajuda).
import os, json, subprocess
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'ferramentas')

def carrega(arq):
    js = "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(window.MAPAS))"
    return json.loads(subprocess.check_output(['node', '-e', js, os.path.join(F, arq)], encoding='utf-8'))
ING, HIS = carrega('ING3_jogo_mapas.js'), carrega('HIS3_jogo_mapas.js')

class G:
    """grade editável; put() só escreve em casa vazia (ou na troca declarada) para não estragar a grade validada"""
    def __init__(s, rows): s.g = [list(r) for r in rows]
    def put(s, c, r, ch, era=' '):
        assert s.g[r][c] in era, ('ocupado', c, r, s.g[r][c], ch)
        s.g[r][c] = ch
    def fx(s, c0, c1, r, ch, era=' '):
        for c in range(c0, c1 + 1): s.put(c, r, ch, era)
    def troca(s, de, para):
        for l in s.g:
            for i, ch in enumerate(l):
                if ch == de: l[i] = para
    def rows(s): return [''.join(l) for l in s.g]

def submundo(extra=None):
    """submundo de 36 colunas: entra pelo cano 1, sai pelo cano 2; 3ª porta; 6 perigos de 3 tipos (anda, espinho, cai do teto, voa)"""
    W, H = 36, 12
    g = [[' '] * W for _ in range(H)]
    for c in range(W): g[0][c] = g[1][c] = g[10][c] = g[11][c] = '#'
    for r in range(H): g[r][0] = g[r][1] = g[r][W - 2] = g[r][W - 1] = '#'
    m = G([''.join(l) for l in g])
    m.fx(3, 4, 8, '1'); m.fx(32, 33, 8, '2')
    m.fx(9, 12, 7, '='); m.fx(9, 12, 6, 'o')
    m.put(8, 9, 'i'); m.put(14, 9, 'D'); m.fx(19, 20, 9, '^')
    m.put(22, 2, 'v'); m.fx(21, 24, 6, 'o'); m.put(25, 9, 'e'); m.put(28, 5, 'g'); m.fx(27, 29, 3, 'o')
    if extra: extra(m)
    return m.rows()

def sala():
    """1 The Messy Room <- ING1 (vila). O '*' (col 12) é a raquete."""
    m = G(ING['1']['main'])
    m.fx(84, 86, 10, '#'); m.fx(84, 86, 11, '#'); m.put(80, 9, 'i'); m.put(50, 9, 'e'); m.fx(84, 86, 8, ' ', 'f')   # sem a plataforma que cai sobre o buraco (no Inglês as botas salvavam o pulo)                        # sem as botas do Inglês: o 1º buraco depois do muro fica com 2 tiles
    return {'main': m.rows(), 'sub': submundo()}

def escola():
    """2 The School Map <- ING2 (bosque): o ovo do Pip sai, entra o avião de papel '*' no mesmo lugar."""
    m = G(ING['2']['main']); m.troca('P', '*')
    return {'main': m.rows(), 'sub': submundo()}

def torre():
    """3 Tower View <- HIS2 (casa vertical, 5 andares). Acréscimos por andar; a 3ª porta vai para dentro da torre (sub)."""
    m = G(HIS['2']['main'])
    m.put(14, 7, ' ', 'D')                                        # porta do topo desce para o submundo
    # base (linha 31): depois do checkpoint 17
    m.put(24, 27, 'v')
    # 1º andar (linha 25)
    m.put(23, 21, 'v'); m.put(15, 22, 'g')
    # 2º andar (linha 19): entra pela esquerda, a lata rola para a esquerda vindo de frente
    m.put(33, 19, 'T'); m.put(20, 15, 'v'); m.put(13, 19, 'e')
    # 3º andar (linha 13): cano para o submundo ao lado do degrau 25-26
    m.fx(28, 29, 13, '1'); m.put(20, 9, 'v'); m.put(17, 10, 'g')
    # topo (linha 7): saída do cano e perigos antes da bandeira
    m.fx(30, 31, 6, '2'); m.put(16, 7, 'e'); m.put(12, 2, 'v'); m.put(24, 2, 'v')
    return {'main': m.rows(), 'sub': submundo()}

def rio():
    """4 Wild River <- ING4 (recife, nado, praia sup 4). Mais Puddles, correnteza contra e pedras pontudas no leito."""
    d = ING['4']; m = G(d['main'])
    m.put(92, 11, 'j'); m.put(100, 12, 'p'); m.put(110, 10, '<'); m.fx(121, 122, 13, '^'); m.put(126, 12, 'p'); m.put(84, 9, '<')
    return {'main': m.rows(), 'sub': submundo(), 'sup': d.get('sup', 4)}

def campo():
    """5 Windy Fields <- ING5 (céu, voo com a pipa). Vento que AJUDA ('>' empurra para a frente, '}' sobe) e que ATRAPALHA ('<', '~', 'Z')."""
    m = G(ING['5']['main'])
    m.put(37, 7, '>'); m.put(58, 6, '}'); m.put(96, 6, '<'); m.put(118, 3, '>'); m.put(124, 6, '}'); m.put(140, 5, '<'); m.put(148, 3, 'g')
    return {'main': m.rows(), 'sub': submundo()}

def parque():
    """6 The Move Park <- ING6 (ginásio): argolas = balanços, barras = gira-gira, salto = cama elástica, trave = tronco.
    Acréscimos: latas que rolam (roll), piões (spin), poças, rajadas, buracos de areia, plataforma que cai e elevador."""
    m = G(ING['6']['main'])
    m.put(31, 2, 'v'); m.put(38, 9, 'i'); m.put(44, 9, 'T'); m.fx(54, 56, 6, 'f'); m.put(70, 9, 'e')
    m.put(84, 6, 'g'); m.put(98, 4, 'g'); m.put(110, 9, 'i'); m.put(112, 3, 'g')
    for c in (119, 120): m.g[10][c] = m.g[11][c] = ' '              # caixa de areia funda (2 tiles)
    m.put(122, 9, 'T'); m.put(126, 3, 'v')
    return {'main': m.rows(), 'sub': submundo()}

def estadio():
    """8 Tug-of-War Stadium <- ING7: o '*' (bolas) vira a bicicleta 'P' (riding a bike = push)."""
    m = G(ING['7']['main']); m.troca('*', 'P')
    m.put(70, 9, 'i'); m.put(96, 3, 'v'); m.put(106, 6, 'g')
    return {'main': m.rows(), 'sub': submundo()}

OUT = {1: sala(), 2: escola(), 3: torre(), 4: rio(), 5: campo(), 6: parque(), 7: {'main': ['#' * 40, '#' * 40]}, 8: estadio(), 9: {'main': ING['9']['main']}}
js = ['/* CIE3_jogo_mapas.js — GERADO por trabalho/3tri_ciencias/gen/gen_mapas_cie3.py. Não editar à mão. */', 'window.MAPAS = {']
for k in sorted(OUT):
    d = OUT[k]; parts = []
    for key in ('sup', 'main', 'sub', 'passos'):
        if key not in d: continue
        v = d[key]
        parts.append(key + ':[\n' + ',\n'.join('    ' + json.dumps(s) for s in v) + '\n  ]' if isinstance(v, list) else key + ':' + json.dumps(v))
    js.append('  %d:{%s},' % (k, ', '.join(parts)))
js.append('};')
open(os.path.join(F, 'CIE3_jogo_mapas.js'), 'w', encoding='utf-8', newline='\n').write('\n'.join(js) + '\n')
print('mapas ok', {k: (len(OUT[k]['main']), len(OUT[k]['main'][0])) for k in OUT})
