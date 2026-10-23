/* ============================================================
   Nuvem da família — guarda o progresso da Fábrica de Jogos
   Cloudflare Worker + D1 (leitura sempre atual, ao contrário do
   KV, que demora até 60 s). Sem conta, sem e-mail, sem nome:
   quem tem a CHAVE DA FAMÍLIA (código longo gerado no app,
   na área do papai) lê e grava. A chave nunca é guardada:
   o banco usa o SHA-256 dela. Guarda as 10 últimas versões.
   Não há listagem, chat, nem nada público.
     GET  /v1/estado            -> { salvoEm, estado }
     PUT  /v1/estado            <- { salvoEm, estado }  (até 1,9 MB)
     GET  /v1/versoes           -> [ { salvoEm, tamanho } ]
     GET  /v1/versao/<salvoEm>  -> { salvoEm, estado }
   Cabeçalho: Authorization: Bearer <chave da família>
   ============================================================ */
const ORIGENS = ['https://pauloparelhas.github.io', 'null', 'http://127.0.0.1', 'http://localhost'];
const MAX = 1900 * 1024, VERSOES = 10;

function cors(req) {
  const o = req.headers.get('Origin') || '';
  const ok = ORIGENS.some(a => o === a || (a.startsWith('http://') && o.startsWith(a + ':')));
  return {
    'Access-Control-Allow-Origin': ok ? o : ORIGENS[0],
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400', 'Vary': 'Origin',
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'
  };
}
function resp(req, corpo, st) {
  return new Response(corpo === null ? null : JSON.stringify(corpo), { status: st || 200, headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, cors(req)) });
}
async function dono(req) {
  const m = /^Bearer ([A-Za-z0-9-]{20,80})$/.exec(req.headers.get('Authorization') || '');
  if (!m) return null;
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('fabrica|' + m[1]));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
}

const J = { 'Content-Type': 'application/json; charset=utf-8' };
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    const url = new URL(req.url), d = await dono(req);
    if (!d) return resp(req, { erro: 'sem chave' }, 401);
    if (url.pathname === '/v1/estado' && req.method === 'GET') {
      const r = await env.DB.prepare('SELECT json FROM estados WHERE dono = ? ORDER BY salvoEm DESC LIMIT 1').bind(d).first();
      return r ? new Response(r.json, { headers: Object.assign({}, J, cors(req)) }) : resp(req, { vazio: true });
    }
    if (url.pathname === '/v1/estado' && req.method === 'PUT') {
      const txt = await req.text();
      if (txt.length > MAX) return resp(req, { erro: 'grande demais' }, 413);
      let o; try { o = JSON.parse(txt); } catch (e) { return resp(req, { erro: 'json' }, 400); }
      if (!o || typeof o.salvoEm !== 'number' || !o.estado || o.estado.v !== 1) return resp(req, { erro: 'formato' }, 400);
      await env.DB.batch([
        env.DB.prepare('INSERT OR REPLACE INTO estados (dono, salvoEm, tamanho, json) VALUES (?, ?, ?, ?)').bind(d, o.salvoEm, txt.length, txt),
        env.DB.prepare('DELETE FROM estados WHERE dono = ? AND salvoEm NOT IN (SELECT salvoEm FROM estados WHERE dono = ? ORDER BY salvoEm DESC LIMIT ?)').bind(d, d, VERSOES + 1)
      ]);
      return resp(req, { ok: true, salvoEm: o.salvoEm });
    }
    if (url.pathname === '/v1/versoes' && req.method === 'GET') {
      const r = await env.DB.prepare('SELECT salvoEm, tamanho FROM estados WHERE dono = ? ORDER BY salvoEm DESC LIMIT -1 OFFSET 1').bind(d).all();
      return resp(req, r.results || []);
    }
    const mv = /^\/v1\/versao\/(\d+)$/.exec(url.pathname);
    if (mv && req.method === 'GET') {
      const r = await env.DB.prepare('SELECT json FROM estados WHERE dono = ? AND salvoEm = ?').bind(d, +mv[1]).first();
      return r ? new Response(r.json, { headers: Object.assign({}, J, cors(req)) }) : resp(req, { erro: 'não achei' }, 404);
    }
    return resp(req, { erro: 'caminho' }, 404);
  }
};
