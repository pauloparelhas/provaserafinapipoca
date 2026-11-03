# Gera ferramentas/CIE3_jogo_mapas.js: as 9 fases de Motion Rangers (BIBLIA_CIE3.md).
# Mapas NOVOS (nada recopiado do Inglês, só o chefão 9, cuja arena é o motor do chefão).
# Física: pulo sobe 3,4 tiles, alcance 4,8; herói grande = 3 tiles de altura livre.
# Símbolos novos: y = escorregador (slide), z = plataforma giratória (spin). CIE3_jogo_cie.js.
import os, re, json
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'ferramentas')

class Mapa:
    def __init__(s, w, h=12):
        s.w, s.h = w, h; s.g = [[' '] * w for _ in range(h)]
        for c in range(w): s.g[h-2][c] = s.g[h-1][c] = '#'
    def p(s, c, r, ch): s.g[r][c] = ch
    def fx(s, c0, c1, r, ch):
        for c in range(c0, c1 + 1): s.g[r][c] = ch
    def bloco(s, c0, c1, r0, r1=None):
        for r in range(r0, (s.h-3 if r1 is None else r1) + 1):
            for c in range(c0, c1 + 1): s.g[r][c] = '#'
    def buraco(s, c0, n):
        assert n <= 3
        for c in range(c0, c0 + n): s.g[s.h-2][c] = s.g[s.h-1][c] = ' '
    def rows(s): return [''.join(l) for l in s.g]

def sala():
    """1 The Messy Room: móveis gigantes viram plataformas; em cima, embaixo, atrás."""
    m = Mapa(136)
    m.p(2, 9, 'U'); m.fx(5, 8, 7, 'o'); m.p(10, 9, '*')          # a bola da sala
    m.fx(15, 21, 6, '='); m.fx(16, 20, 5, 'o'); m.p(18, 9, 'D')   # 1ª porta EMBAIXO da mesa
    m.p(25, 9, 'c')
    m.bloco(30, 33, 8); m.fx(30, 33, 7, 'o'); m.bloco(34, 41, 6); m.p(38, 5, 'D')  # sofá gigante: 2ª porta EM CIMA do encosto
    m.p(36, 5, 'o'); m.p(45, 9, 'i')
    m.buraco(51, 2); m.fx(51, 52, 7, 'o')
    m.fx(56, 60, 6, '='); m.fx(56, 60, 5, 'o')                    # prateleira baixa
    m.p(63, 9, 'c'); m.p(67, 9, 'e')
    m.p(71, 9, 'S'); m.fx(73, 79, 3, '='); m.fx(74, 78, 2, 'O')   # abajur: a mola leva à cúpula
    m.p(75, 9, 'i'); m.bloco(83, 85, 7); m.p(84, 6, 'o')           # violão deitado
    m.p(91, 9, 'K')
    m.bloco(95, 97, 8); m.p(100, 9, 'D')                          # 3ª porta ATRÁS da poltrona
    m.p(103, 9, 'c'); m.p(107, 9, 'g')
    m.buraco(112, 3); m.fx(112, 114, 7, 'o'); m.p(119, 9, 'i')
    m.p(124, 9, 'E'); m.p(132, 9, 'F')
    return {'main': m.rows()}

def escola():
    """2 The School Map: Trix, hexágonos A e B, Auditorium, Gym, Treehouse no alto; plataformas que andam (left/right)."""
    m = Mapa(140)
    m.p(2, 9, 'U'); m.fx(5, 9, 7, 'o'); m.p(11, 9, '*')          # o tênis do Gym
    m.p(17, 9, 'D'); m.p(21, 9, 'c')
    m.bloco(25, 28, 8); m.bloco(29, 32, 6); m.fx(29, 32, 5, 'o'); m.bloco(33, 36, 8)  # A section
    m.p(38, 9, 'i'); m.buraco(44, 3)
    m.p(44, 7, 'm')                                               # Drive: plataforma que anda para a direita
    m.p(52, 9, 'c'); m.p(55, 9, 'e'); m.p(59, 9, 'D')             # Auditorium
    m.p(63, 9, 'S'); m.fx(65, 71, 4, '='); m.fx(66, 70, 3, 'O')   # Treehouse
    m.p(68, 9, 'i'); m.fx(74, 76, 6, 'f'); m.fx(79, 81, 6, 'f'); m.fx(74, 81, 5, 'o')
    m.buraco(77, 2); m.p(86, 9, 'T')
    m.p(90, 9, 'c'); m.p(94, 9, 'g')
    m.bloco(97, 99, 7); m.p(98, 6, 'o'); m.p(104, 9, 'i')
    m.p(108, 9, 'D'); m.buraco(113, 3); m.p(113, 7, 'm')
    m.p(121, 9, 'e'); m.p(126, 9, 'E'); m.p(135, 9, 'F')
    return {'main': m.rows()}

def torre():
    """3 Tower View: subir a Torre, andar por andar (mesmo mecanismo da casa de História); Gigi pinta a vista."""
    H, W = 34, 40
    g = [[' '] * W for _ in range(H)]
    def p(c, r, ch): g[r][c] = ch
    def fx(c0, c1, r, ch):
        for c in range(c0, c1 + 1): g[r][c] = ch
    for r in range(H): g[r][0] = g[r][W - 1] = '#'
    fx(0, W - 1, 0, '#'); fx(0, W - 1, 1, '#'); fx(0, W - 1, 32, '#'); fx(0, W - 1, 33, '#')
    for r, h0, e0, d0 in [(26, 35, 35, 37), (20, 1, 3, 1), (14, 35, 35, 37), (8, 1, 3, 1)]:
        fx(1, W - 2, r, '#'); fx(h0, h0 + 3, r, ' ')
        fx(e0, e0 + 1, r + 4, '='); fx(d0, d0 + 1, r + 2, '=')
    # BASE (bottom view)
    p(3, 31, 'U'); fx(6, 8, 30, 'o'); p(11, 31, '*'); p(16, 31, 'c'); fx(20, 21, 31, '#'); fx(20, 21, 30, 'o'); p(26, 31, 'i')
    # 1º andar (front view)
    p(33, 25, 'c'); fx(24, 27, 23, 'o'); p(27, 25, 'D'); fx(19, 20, 25, '#'); p(13, 25, 'i'); fx(7, 8, 25, '#')
    # 2º andar (side view)
    p(6, 19, 'c'); p(12, 19, 'D'); fx(17, 18, 19, '#'); fx(23, 26, 19, 'o'); p(30, 19, 'e')
    # 3º andar
    p(33, 13, 'c'); p(24, 13, 'i'); fx(16, 19, 13, 'o'); fx(27, 28, 13, '#'); p(11, 13, 'E')
    # TOPO (top view)
    p(6, 7, 'c'); p(16, 7, 'D'); fx(21, 23, 5, 'o'); p(27, 7, 'i'); p(35, 7, 'F')
    return {'main': [''.join(l) for l in g]}

def rio():
    """4 Wild River: margem, roupa de banho, barco a vela na superfície, nado; represa, chuva, enchente."""
    H, W, sup = 16, 156, 4
    m = Mapa(W, H)
    m.bloco(0, 11, sup, H - 3)
    m.p(3, 3, 'U'); m.p(6, 3, 'o'); m.p(7, 3, 'o'); m.p(9, 3, 'd')  # a roupa de banho na margem
    m.p(14, sup, 'm'); m.p(30, sup, 'm'); m.fx(18, 26, 2, 'o')      # barcos a vela na superfície
    m.fx(16, 19, 11, 'o'); m.p(23, 13, 'c'); m.p(30, 11, 'j'); m.p(38, 11, 'j'); m.p(44, 13, 'D')
    m.fx(50, 54, 8, 'o'); m.p(48, 10, '>'); m.p(56, 12, 'p')
    m.p(60, 13, 'c'); m.bloco(66, 68, 10, 13)                        # a represa, do fundo até o meio (nada por cima)
    m.fx(66, 68, 8, 'o'); m.p(72, 13, 'i'); m.p(78, 12, 'p'); m.p(84, 13, 'D')
    m.p(90, 13, 'c'); m.p(96, 11, 'j'); m.p(102, 10, '<'); m.fx(106, 110, 9, 'o')
    m.p(112, 12, 'p'); m.p(118, 13, 'e'); m.p(122, 13, 'D'); m.p(127, 13, 'c')
    m.p(132, 11, 'j'); m.p(140, 13, 'E'); m.fx(144, 148, 10, 'o'); m.p(151, 13, 'F')
    return {'main': m.rows(), 'sup': sup}

def campo():
    """5 Windy Fields: vento que empurra (< >), pipa que plana, dunas, turbinas ao fundo."""
    m = Mapa(144)
    m.p(2, 9, 'U'); m.fx(5, 8, 7, 'o'); m.p(11, 9, '*')           # a pipa
    m.p(17, 9, 'D'); m.p(21, 9, 'c')
    m.p(26, 8, '>'); m.buraco(29, 3); m.fx(29, 31, 6, 'o')         # brisa boa: empurra por cima do buraco
    m.p(36, 9, 'i'); m.bloco(40, 42, 8); m.bloco(43, 46, 7); m.fx(43, 46, 6, 'o'); m.bloco(47, 49, 8)  # duna
    m.p(53, 9, 'c'); m.p(57, 9, 'g'); m.p(62, 8, '<')              # ventania: empurra para trás
    m.p(68, 9, 'D'); m.p(72, 9, 'S'); m.fx(75, 80, 4, '='); m.fx(76, 79, 3, 'O')
    m.buraco(83, 3); m.p(90, 9, 'c'); m.p(94, 9, 'e'); m.p(98, 8, '>'); m.buraco(101, 2); m.p(106, 9, 'g')
    m.bloco(110, 112, 7); m.p(111, 6, 'o'); m.p(117, 9, 'D'); m.p(121, 9, 'c'); m.p(125, 8, '<'); m.p(130, 9, 'i')
    m.p(135, 9, 'E'); m.p(140, 9, 'F')
    return {'main': m.rows()}

def parque():
    """6 The Move Park: mola = bounce, argola = swing, escorregador = slide, plataforma giratória = spin, latas/rodas rolando."""
    m = Mapa(144)
    m.p(2, 9, 'U'); m.fx(5, 9, 7, 'o'); m.p(12, 9, 'S'); m.fx(14, 20, 4, '='); m.fx(15, 19, 3, 'o')  # BOUNCE
    m.p(22, 9, 'D'); m.p(25, 9, 'c')
    m.fx(29, 37, 6, 'y'); m.p(28, 9, 'S'); m.fx(30, 36, 5, 'o'); m.p(41, 9, 'T')   # SLIDE, depois lata rolando
    m.p(47, 2, 'R'); m.p(52, 2, 'R'); m.p(57, 2, 'R')   # SWING
    m.p(50, 9, 'i'); m.p(61, 9, 'c'); m.p(65, 9, 'D')
    m.p(71, 6, 'z'); m.fx(69, 74, 2, 'O')                          # SPIN: giratória leva às moedas
    m.p(78, 9, 'e'); m.p(83, 9, 'K'); m.bloco(87, 89, 7); m.p(88, 6, 'o')
    m.p(93, 9, 'c'); m.p(97, 9, 'V'); m.fx(100, 104, 3, 'o'); m.p(107, 9, 'T')
    m.fx(110, 117, 5, 'y'); m.p(109, 9, 'S'); m.p(112, 9, 'i')
    m.p(120, 9, 'D'); m.p(124, 9, 'c'); m.p(128, 9, 'g'); m.p(133, 9, 'E'); m.p(140, 9, 'F')
    return {'main': m.rows()}

def estadio():
    """8 Tug-of-War Stadium: chute (push), máquina de bolas, carrinho; a 2ª porta é o cabo de guerra (pull)."""
    m = Mapa(144)
    m.p(2, 9, 'U'); m.fx(5, 8, 7, 'o'); m.p(11, 9, '*')            # as bolas
    m.p(17, 9, 'D'); m.p(21, 9, 'c'); m.p(26, 9, 'C'); m.p(31, 9, 's')
    m.fx(36, 42, 6, '='); m.fx(37, 41, 5, 'O'); m.p(34, 9, 'S'); m.p(39, 9, 's')
    m.p(47, 9, 'c'); m.bloco(51, 53, 7); m.p(52, 6, 'o'); m.p(58, 9, 'i')
    m.p(62, 9, 'D'); m.p(66, 9, 'K'); m.p(70, 9, 'c'); m.p(74, 7, 'n'); m.p(78, 5, 'n'); m.fx(80, 87, 3, '='); m.fx(81, 86, 2, 'o')
    m.p(84, 9, 's'); m.bloco(90, 92, 7); m.p(97, 9, 'e'); m.p(101, 9, 'C'); m.p(106, 9, 'c')
    m.p(111, 9, 'D'); m.p(116, 9, 's'); m.p(121, 9, 'i'); m.p(127, 9, 'c'); m.p(131, 9, 'E'); m.p(140, 9, 'F')
    return {'main': m.rows()}

import subprocess
CHEFE = {'main': json.loads(subprocess.check_output(['node', '-e', "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(window.MAPAS[9].main))", os.path.join(F, 'ING3_jogo_mapas.js')], encoding='utf-8'))}
OUT = {1: sala(), 2: escola(), 3: torre(), 4: rio(), 5: campo(), 6: parque(), 7: {'main': ['#' * 40, '#' * 40]}, 8: estadio(), 9: CHEFE}
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
