/* ============================================================
   MAT3_jogo_octavio.js — OCTÁVIO, THE BROKEN-PENCIL OCTOPUS ("Octavio"), o vilão de "Math Stars" (escrito à mão; o fork não toca).
   Personagem do Paulo (14/11): polvo roxo, fofo e travesso; 8 tentáculos terminando em lápis amarelos de ponta QUEBRADA
   (madeira lascada + grafite partido, sem borracha). Ele quebra a ponta dos lápis da escola; Mike e Laura o vencem com
   MAKE EQUAL GROUPS (8 lápis = 2 grupos de 4).
   · 3D procedural em three.js r160 (MIT, © 2010-2023 Three.js Authors; licença no cabeçalho de assets/three.module.js),
     LOCAL (assets/three.module.js), nada de PNG nem CDN.
   · O jogo é canvas 2D: UM WebGLRenderer fora da tela (fundo transparente, 320 px), reaproveitado; cada pedido
     PRÉ-RENDERIZA no carregamento uma folha de quadros por estado (canvas 2D); window.OCTAVIO.desenha(c,estado,t,...)
     recorta o quadro do momento com drawImage onde ia a vilã (capa, chefinho, chefão, fim). Depois libera o WebGL.
   · Sem WebGL (ou se o módulo não carregar, ex.: file://), window.OCTAVIO fica sem .pronto e o arteM desenha o polvo 2D.
   · Estados do motor: idle | laugh (inclina a cabeça: desafio) | write (lança as letras) | hit (treme) | sad (frustrado).
   · Nada pisca rápido: ondular <= 1,1 Hz, piscada de 0,15 s a cada ~3,4 s; tremor só no 'hit'.
   ============================================================ */
import * as THREE from './assets/three.module.js';

const COR = { roxo: 0x873fe0, mancha: 0x6325ac, brilho: 0xb77aff, pupila: 0x282039, lapis: 0xffc928, madeira: 0xd9a16a,
  grafite: 0x353535, ventosa: 0xc9a5f5, sobrancelha: 0x3b1470, boca: 0x4a1030, lingua: 0xf472b6, bochecha: 0xf0abfc };

/* aleatório determinístico (a mesma lasca em todo quadro) */
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

/* cilindro com o topo QUEBRADO: os vértices do topo sobem e descem em zigue-zague (lascas) e o centro afunda */
function quebrado(rTopo, rBase, h, n, semente, amp) {
  const g = new THREE.CylinderGeometry(rTopo, rBase, h, n, 1, false);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    if (v.y > h / 2 - 1e-6) {
      const r = Math.hypot(v.x, v.z);
      if (r < 1e-4) { v.y -= amp * 0.35; }
      else {
        const k = Math.round(((Math.atan2(v.z, v.x) + Math.PI) / (2 * Math.PI)) * n) % n;
        const d = (k % 2 ? 1 : -0.45) * amp * (0.55 + 0.9 * hash(semente * 13 + k));
        v.y += d;
        if (k % 2) { v.x *= 0.82; v.z *= 0.82; }          /* a lasca que sobe afina: parece farpa */
      }
      p.setXYZ(i, v.x, v.y, v.z);
    }
  }
  g.computeVertexNormals();
  return g;
}

function mat(cor, o = {}) { return new THREE.MeshStandardMaterial(Object.assign({ color: cor, roughness: 0.42, metalness: 0 }, o)); }

/* o lápis de ponta quebrada, ao longo de +Y a partir da origem (a origem fica dentro da ponta do tentáculo) */
function lapis(semente, M) {
  const g = new THREE.Group(); g.name = 'pencil';
  const corpo = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.56, 6), M.lapis); corpo.position.y = 0.28; g.add(corpo);
  const faixa = new THREE.Mesh(new THREE.CylinderGeometry(0.153, 0.153, 0.05, 6), M.faixa); faixa.position.y = 0.44; g.add(faixa);
  const mad = new THREE.Mesh(quebrado(0.138, 0.15, 0.18, 12, semente, 0.13), M.madeira); mad.position.y = 0.56 + 0.1; g.add(mad);
  const graf = new THREE.Mesh(quebrado(0.07, 0.072, 0.16, 7, semente + 5, 0.06), M.grafite); graf.position.y = 0.56 + 0.2; g.add(graf);
  return g;
}

/* createOctavio(scene, options={}) -> THREE.Group 'octavioCharacter' (userData: head, eyes, brows, mouth, tentacles[8]) */
export function createOctavio(scene, options = {}) {
  const M = {
    pele: new THREE.MeshPhysicalMaterial({ color: COR.roxo, roughness: 0.32, metalness: 0, clearcoat: 0.55, clearcoatRoughness: 0.35 }),
    mancha: mat(COR.mancha, { roughness: 0.4 }), brilho: mat(COR.brilho, { roughness: 0.3 }),
    branco: mat(0xffffff, { roughness: 0.2 }), pupila: mat(COR.pupila, { roughness: 0.25 }),
    lapis: mat(COR.lapis, { roughness: 0.45, flatShading: true }), faixa: mat(0xe0a800, { flatShading: true }),
    madeira: mat(COR.madeira, { roughness: 0.8, flatShading: true }), grafite: mat(COR.grafite, { roughness: 0.6, flatShading: true }),
    ventosa: mat(COR.ventosa, { roughness: 0.5 }), sobr: mat(COR.sobrancelha), boca: mat(COR.boca, { side: THREE.DoubleSide }),
    lingua: mat(COR.lingua, { side: THREE.DoubleSide }), bochecha: mat(COR.bochecha, { transparent: true, opacity: 0.7 }),
  };
  const raiz = new THREE.Group(); raiz.name = 'octavioCharacter';
  const corpo = new THREE.Group(); corpo.name = 'body'; raiz.add(corpo);
  const HC = new THREE.Vector3(0, 1.6, 0), HR = 1.15;

  /* cabeça: quase esfera, um pouco mais larga embaixo */
  const cab = new THREE.Group(); cab.name = 'head'; cab.position.copy(HC); corpo.add(cab);
  const gH = new THREE.SphereGeometry(HR, 40, 30), pH = gH.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pH.count; i++) { v.fromBufferAttribute(pH, i); const k = v.y < 0 ? 1 + 0.13 * (-v.y / HR) : 1 - 0.04 * (v.y / HR); v.x *= k; v.z *= k; v.y *= 0.96; pH.setXYZ(i, v.x, v.y, v.z); }
  gH.computeVertexNormals();
  cab.add(new THREE.Mesh(gH, M.pele));
  /* manchas e brilhos (esferas achatadas coladas na superfície) */
  const naPele = (lat, lon, r, m) => { const s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), m); const n = new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)); s.position.copy(n.clone().multiplyScalar(HR * 0.985)); s.scale.set(1, 1, 0.22); s.lookAt(n.clone().multiplyScalar(5)); cab.add(s); };
  naPele(0.95, -0.7, 0.2, M.mancha); naPele(0.7, 0.95, 0.15, M.mancha); naPele(1.15, 0.35, 0.12, M.mancha); naPele(0.35, 1.45, 0.17, M.mancha); naPele(0.2, -1.5, 0.14, M.mancha);
  naPele(0.85, -0.25, 0.1, M.brilho); naPele(1.05, -0.95, 0.07, M.brilho);

  /* rosto (num grupo na escala da cabeça) */
  const rosto = new THREE.Group(); rosto.scale.setScalar(HR); cab.add(rosto);
  const olhos = [];
  [-1, 1].forEach((l) => {
    const o = new THREE.Group(); o.position.set(l * 0.36, 0.12, 0.83); rosto.add(o);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.29, 24, 18), M.branco); b.scale.set(1, 1.12, 0.62); o.add(b);
    const pu = new THREE.Mesh(new THREE.SphereGeometry(0.145, 18, 14), M.pupila); pu.position.set(0.05 + l * 0.01, -0.02, 0.15); pu.scale.set(1, 1.1, 0.5); o.add(pu);
    const br = new THREE.Mesh(new THREE.SphereGeometry(0.048, 10, 8), M.branco); br.position.set(0.1, 0.06, 0.22); o.add(br);
    olhos.push(o);
  });
  const sobr = [-1, 1].map((l) => { const s = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.22, 4, 8), M.sobr); s.rotation.z = Math.PI / 2; const p = new THREE.Group(); p.position.set(l * 0.37, l < 0 ? 0.5 : 0.44, 0.84); p.add(s); rosto.add(p); p.userData.l = l; return p; });
  /* sorriso largo (meia-lua escura) com a linguinha */
  const boca = new THREE.Group(); boca.position.set(0.02, -0.33, 0.93); boca.rotation.x = -0.35; rosto.add(boca);
  const sh = new THREE.Shape(); sh.moveTo(-0.36, 0.04); sh.quadraticCurveTo(0, -0.04, 0.36, 0.04); sh.quadraticCurveTo(0.3, -0.3, 0, -0.32); sh.quadraticCurveTo(-0.3, -0.3, -0.36, 0.04);
  boca.add(new THREE.Mesh(new THREE.ShapeGeometry(sh, 16), M.boca));
  const lg = new THREE.Shape(); lg.absellipse(0, -0.22, 0.13, 0.08, 0, Math.PI * 2); const lM = new THREE.Mesh(new THREE.ShapeGeometry(lg, 16), M.lingua); lM.position.z = 0.004; boca.add(lM);
  [-1, 1].forEach((l) => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), M.bochecha); b.position.set(l * 0.62, -0.22, 0.74); b.scale.set(1, 0.7, 0.3); b.lookAt(b.position.clone().multiplyScalar(4)); rosto.add(b); });

  /* 8 tentáculos em leque (4 de cada lado), cada um num grupo próprio com pivô na base: anima em separado */
  const O = new THREE.Vector3(0, 0.7, 0);
  const BASE = [212, 232, 250, 264, 276, 290, 308, 328];        /* onde nasce, em volta da base da cabeça (graus) */
  const PONTA = [152, 182, 210, 238, 302, 330, 358, 28];        /* para onde vai a ponta: leque largo, pontas separadas */
  const COMP = [2.15, 2.2, 2.05, 1.85, 1.85, 2.05, 2.2, 2.1];
  const tent = [];
  for (let i = 0; i < 8; i++) {
    const a = THREE.MathUtils.degToRad(BASE[i]), b = THREE.MathUtils.degToRad(PONTA[i]);
    const B = new THREE.Vector3(Math.cos(a) * 0.8, HC.y + Math.sin(a) * 0.95, 0.15 + (i % 2 ? -0.12 : 0.12));
    const T = new THREE.Vector3(O.x + Math.cos(b) * COMP[i], O.y + Math.sin(b) * COMP[i], (i % 2 ? -0.28 : 0.26));
    const dir = new THREE.Vector3().subVectors(T, O).setZ(0).normalize();
    const g = new THREE.Group(); g.name = 'tentacle' + (i + 1); g.position.copy(B); corpo.add(g);
    const lado = i < 4 ? -1 : 1, per = new THREE.Vector3(-dir.y, dir.x, 0).multiplyScalar(0.32 * lado);
    const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -0.35, 0.05),
      new THREE.Vector3().lerpVectors(B, T, 0.45).add(per).sub(B), new THREE.Vector3().lerpVectors(B, T, 0.78).sub(per.clone().multiplyScalar(0.5)).sub(B),
      new THREE.Vector3().subVectors(T, B).sub(dir.clone().multiplyScalar(0.18)), new THREE.Vector3().subVectors(T, B)];
    const cur = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const TS = 40, RS = 10, gT = new THREE.TubeGeometry(cur, TS, 1, RS, false), pT = gT.attributes.position, P = new THREE.Vector3();
    for (let s = 0; s <= TS; s++) { const u = s / TS; cur.getPointAt(u, P); const r = 0.31 * (1 - u) + 0.15 * u; for (let j = 0; j <= RS; j++) { const k = s * (RS + 1) + j; v.fromBufferAttribute(pT, k).sub(P).multiplyScalar(r).add(P); pT.setXYZ(k, v.x, v.y, v.z); } }
    gT.computeVertexNormals();
    g.add(new THREE.Mesh(gT, M.pele));
    /* ventosas: esferas achatadas do lado de baixo/da frente */
    [0.4, 0.58, 0.76].forEach((u) => { cur.getPointAt(u, P); const tg = cur.getTangentAt(u); const r = 0.31 * (1 - u) + 0.15 * u;
      let lat = new THREE.Vector3(-tg.y, tg.x, 0).normalize(); if (lat.y > 0) lat.negate(); const n = new THREE.Vector3(0, 0, 0.55).add(lat).normalize(); /* do lado de BAIXO do tentáculo */
      const s = new THREE.Mesh(new THREE.SphereGeometry(r * 0.36, 10, 8), M.ventosa); s.position.copy(P).add(n.clone().multiplyScalar(r * 0.9)); s.scale.set(1, 1, 0.35); s.lookAt(s.position.clone().add(n)); g.add(s); });
    /* o lápis na ponta, apontando para fora (radial), ponta QUEBRADA */
    const lp = lapis(i + 1, M); const fim = cur.getPointAt(1), tF = cur.getTangentAt(1);
    lp.position.copy(fim).sub(tF.clone().multiplyScalar(0.06)); lp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tF.clone().normalize()); g.add(lp);
    g.userData = { i, lado, base: 0 }; tent.push(g);
  }
  raiz.userData = { head: cab, eyes: olhos, brows: sobr, mouth: boca, tentacles: tent, body: corpo };
  if (options.rotY != null) raiz.rotation.y = options.rotY;
  if (scene) scene.add(raiz);
  return raiz;
}

/* animações leves: ondular, quicar, piscar, inclinar a cabeça (desafio), tremer (atingido/frustrado).
   f = fase do ciclo do estado, em [0,1): tudo é periódico, então os quadros pré-renderizados emendam sem salto. */
export function animaFase(g, estado, f) {
  const u = g.userData, ri = estado === 'laugh', hit = estado === 'hit', sad = estado === 'sad', wr = estado === 'write', W = 2 * Math.PI * f;
  u.body.position.y = ri ? Math.abs(Math.sin(W)) * 0.14 : Math.sin(W) * 0.07;
  u.head.rotation.z = (ri || wr) ? 0.16 + Math.sin(W) * 0.04 : (sad ? -0.08 : Math.sin(W) * 0.035);
  u.head.rotation.x = sad ? 0.12 : 0;
  u.tentacles.forEach((tg, i) => {
    let r = Math.sin(W + i * 0.8) * 0.07;
    if (hit) r += Math.sin(2 * W) * (i % 2 ? 1 : -1) * 0.04;           /* treme a 2,5 Hz (guardião: régua de 3/s) */
    if (sad) r += Math.cos(5 * W) * (i % 2 ? 1 : -1) * 0.018 + tg.userData.lado * -0.1;
    if (wr && (i === 0 || i === 7)) r += tg.userData.lado * -0.22 * (0.6 + 0.4 * Math.sin(W));
    tg.rotation.z = r;
  });
  const pisca = (estado === 'idle' && f < 0.05) ? Math.max(0.12, Math.abs(f - 0.025) / 0.025) : 1;
  const sq = hit ? 0.45 : (sad ? 0.8 : 1);
  u.eyes.forEach((o) => { o.scale.y = Math.min(pisca, sq); });
  u.brows.forEach((b) => { const l = b.userData.l; b.rotation.z = hit ? l * -0.35 : (sad ? l * 0.3 : (l < 0 ? 0.18 : -0.08)); b.position.y = (l < 0 ? 0.5 : 0.44) + (ri ? 0.04 : 0); });
  u.mouth.rotation.z = sad ? Math.PI : 0;
  u.mouth.position.y = sad ? -0.42 : -0.33;
  u.mouth.position.z = sad ? 1.0 : 0.93;
  u.mouth.scale.set(sad ? 0.6 : 1, ri ? 1.35 : (sad ? 0.5 : 1), 1);
}
/* ciclos por estado: período (s) e quadros */
const CICLO = { idle: [3.0, 30], laugh: [0.9, 10], write: [1.2, 10], hit: [0.8, 8], sad: [2.0, 10] };
export function animaOctavio(g, estado, t) { const c = CICLO[estado] || CICLO.idle; animaFase(g, estado, ((t / c[0]) % 1 + 1) % 1); }

/* ---------- o renderizador único, fora da tela, que PRÉ-RENDERIZA uma folha de quadros por estado ----------
   Renderizar o WebGL a cada quadro do jogo obriga a copiar a GPU para o canvas 2D a cada quadro (no celular e no
   headless isso pesa: ~300 ms/quadro medido no SwiftShader). Então: no carregamento, um quadro por vez (sem travar a
   página), cada estado vira uma faixa de quadros num canvas 2D; o jogo só faz drawImage de um recorte. Pronto o
   idle, o Octávio já aparece; os outros estados usam o idle até a faixa deles ficar pronta. No fim o contexto WebGL
   é liberado (um só contexto, usado só no carregamento). ~66 quadros de 240 px. */
const TAM = 240, ORDEM = ['idle', 'laugh', 'hit', 'sad', 'write'];
const FAIXA = {};
let R = null, cena = null, cam = null, oct = null;
function monta() {
  const cv = document.createElement('canvas'); cv.width = TAM; cv.height = TAM;
  R = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'low-power' });
  R.setPixelRatio(1); R.setSize(TAM, TAM, false); R.setClearColor(0x000000, 0);
  R.outputColorSpace = THREE.SRGBColorSpace;
  cena = new THREE.Scene();
  cena.add(new THREE.HemisphereLight(0xffffff, 0x8a7aa8, 1.25));
  const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(-3, 6, 7); cena.add(key);
  const fill = new THREE.DirectionalLight(0xe9e2ff, 0.7); fill.position.set(5, 2, 4); cena.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8); rim.position.set(0, 4, -6); cena.add(rim);
  cam = new THREE.PerspectiveCamera(30, 1, 0.1, 60); cam.position.set(0.9, 3.0, 12.4); cam.lookAt(0.15, 0.85, 0);
  oct = createOctavio(cena, { rotY: 0.38 });
}
function quadroNaFaixa(est, k) {
  const fx = FAIXA[est], n = CICLO[est][1];
  animaFase(oct, est, k / n); R.render(cena, cam); fx.ctx.drawImage(R.domElement, k * TAM, 0);
}
function constroi() {
  let ei = 0, k = 0;
  const passo = () => {
    try {
      for (let q = 0; q < 3 && ei < ORDEM.length; q++) {
        const est = ORDEM[ei];
        if (!FAIXA[est]) { const cv = document.createElement('canvas'); cv.width = TAM * CICLO[est][1]; cv.height = TAM; FAIXA[est] = { cv, ctx: cv.getContext('2d'), pronta: false }; }
        quadroNaFaixa(est, k); k++;
        if (k >= CICLO[est][1]) { FAIXA[est].pronta = true; if (est === 'idle') API.pronto = true; ei++; k = 0; }
      }
      if (ei < ORDEM.length) setTimeout(passo, 0);
      else { API.completo = true; try { R.dispose(); R.forceContextLoss(); } catch (e) {} R = null; }
    } catch (e) { API.erro = String(e && e.message || e); if (!API.pronto) API.falhou = true; }
  };
  passo();
}
/* desenha o Octávio (estado, tempo do jogo) no retângulo dado; false = ainda não há quadro (o arteM usa o 2D) */
function desenha(c, estado, t, dx, dy, dw, dh) {
  let fx = FAIXA[estado], est = estado;
  if (!fx || !fx.pronta) { fx = FAIXA.idle; est = 'idle'; }
  if (!fx || !fx.pronta) return false;
  const cic = CICLO[est], k = Math.floor((((t || 0) / cic[0]) % 1 + 1) % 1 * cic[1]) % cic[1];
  c.drawImage(fx.cv, k * TAM, 0, TAM, TAM, dx, dy, dw, dh);
  return true;
}
const API = { pronto: false, completo: false, falhou: false, desenha, createOctavio, animaOctavio, animaFase, CICLO, TAM };
try { monta(); constroi(); }
catch (e) { API.falhou = true; API.erro = String(e && e.message || e); R = null; }
window.OCTAVIO = API;
export default API;
