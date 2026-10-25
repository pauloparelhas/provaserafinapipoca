"""Servidor local da Fábrica (só este computador, sem internet).

Serve a pasta `provas/` em http://127.0.0.1:8765 e guarda cópias do trabalho da criança
em `coding/guardados/` (fora do git). Usado pelo atalho "Abrir a Fabrica.bat".

Endereços além dos arquivos:
  GET  /fabrica-salvos/lista              -> [{arquivo, nome, quando, tamanho}]
  POST /fabrica-salvos/guarda?nome=...    corpo = o estado (JSON da Fábrica) -> {arquivo}
  GET  /fabrica-salvos/abre?arquivo=...   -> o JSON guardado

Trava: escuta só 127.0.0.1, aceita pedido só da própria origem, nome de arquivo sem pasta,
até 8 MB, e só grava JSON que tenha a cara da Fábrica (lista "jogos").
Uso: python servidor_local.py [--porta 8765] [--pasta caminho/dos/guardados]
"""
import argparse, datetime, http.server, json, os, re, socketserver, urllib.parse

AQUI = os.path.dirname(os.path.abspath(__file__))
PROVAS = os.path.abspath(os.path.join(AQUI, '..', '..'))
LIMITE = 8 * 1024 * 1024

ap = argparse.ArgumentParser()
ap.add_argument('--porta', type=int, default=8765)
ap.add_argument('--pasta', default=os.path.join(PROVAS, 'coding', 'guardados'))
ARGS = ap.parse_args()
PASTA = os.path.abspath(ARGS.pasta)


def limpo(nome):
    nome = re.sub(r'[^\w\- ]+', '', nome or '', flags=re.UNICODE).strip()[:40]
    return re.sub(r'\s+', '_', nome) or 'sem_nome'


class Fabrica(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=PROVAS, **k)

    def log_message(self, *a):
        pass

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def _origem_ok(self):
        o = self.headers.get('Origin')
        return o is None or o == 'http://127.0.0.1:%d' % ARGS.porta

    def _json(self, cod, obj):
        b = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(cod)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if not u.path.startswith('/fabrica-salvos/'):
            return super().do_GET()
        if not self._origem_ok():
            return self._json(403, {'erro': 'origem'})
        if u.path == '/fabrica-salvos/lista':
            L = []
            if os.path.isdir(PASTA):
                for f in sorted(os.listdir(PASTA), reverse=True):
                    if not f.endswith('.json'):
                        continue
                    p = os.path.join(PASTA, f)
                    m = re.match(r'(\d{8}-\d{4})_(.*)\.json$', f)
                    L.append({'arquivo': f, 'nome': (m.group(2) if m else f[:-5]).replace('_', ' '),
                              'quando': int(os.path.getmtime(p) * 1000), 'tamanho': os.path.getsize(p)})
            return self._json(200, L)
        if u.path == '/fabrica-salvos/abre':
            f = os.path.basename(urllib.parse.parse_qs(u.query).get('arquivo', [''])[0])
            p = os.path.join(PASTA, f)
            if not f.endswith('.json') or not os.path.isfile(p):
                return self._json(404, {'erro': 'nao achei'})
            with open(p, encoding='utf-8') as h:
                return self._json(200, json.load(h))
        return self._json(404, {'erro': 'endereco'})

    def do_POST(self):
        u = urllib.parse.urlparse(self.path)
        if u.path != '/fabrica-salvos/guarda' or not self._origem_ok():
            return self._json(403, {'erro': 'nao'})
        n = int(self.headers.get('Content-Length') or 0)
        if n <= 0 or n > LIMITE:
            return self._json(413, {'erro': 'tamanho'})
        try:
            estado = json.loads(self.rfile.read(n).decode('utf-8'))
            assert isinstance(estado, dict) and isinstance(estado.get('jogos'), list)
        except Exception:
            return self._json(400, {'erro': 'nao e da Fabrica'})
        os.makedirs(PASTA, exist_ok=True)
        nome = limpo(urllib.parse.parse_qs(u.query).get('nome', [''])[0])
        f = datetime.datetime.now().strftime('%Y%m%d-%H%M') + '_' + nome + '.json'
        with open(os.path.join(PASTA, f), 'w', encoding='utf-8') as h:
            json.dump(estado, h, ensure_ascii=False, indent=1)
        return self._json(200, {'arquivo': f})


class Servidor(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


if __name__ == '__main__':
    with Servidor(('127.0.0.1', ARGS.porta), Fabrica) as s:
        print('Fábrica em http://127.0.0.1:%d/coding/index.html  (guardados em %s)' % (ARGS.porta, PASTA))
        s.serve_forever()
