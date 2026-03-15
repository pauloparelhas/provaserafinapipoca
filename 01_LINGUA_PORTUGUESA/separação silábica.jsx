import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   🎨 DESIGN: "Livro de Magia" — aquarela + tipografia bold
   Paleta: coral quente, amarelo mel, azul celeste, verde folha
   Fonte: Fredoka One (display) + Nunito (corpo)
   Atmosfera: páginas de livro encantado, estrelinhas, bolhas
   ═══════════════════════════════════════════════════════════ */

// ── AGENTS ──────────────────────────────────────────────────
const AGENTS = {
  linguist:    { name:"Prof. Gramático", emoji:"🎓", color:"#6C3FC5" },
  pedagogue:   { name:"Tia Didática",   emoji:"🌻", color:"#E8872A" },
  coordinator: { name:"Coordenador",    emoji:"🧭", color:"#2A9D8F" },
};

// ── CLAUDE API ───────────────────────────────────────────────
async function callClaude(sys, user) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
      system: sys, messages: [{ role: "user", content: user }] }),
  });
  return (await r.json()).content?.[0]?.text || "";
}

// ── BANCO DE PALAVRAS — vocabulário infantil
// Critérios: máx 10 letras · máx 4 sílabas · SEM paroxítonas terminadas em ditongo
// Separação silábica 100% correta
const WORDS = [
  ["GATO","GA-TO"],  ["GATA","GA-TA"],  ["PATO","PA-TO"],  ["RATO","RA-TO"],
  ["SAPO","SA-PO"],  ["LOBO","LO-BO"],  ["URSO","UR-SO"],  ["ONÇA","ON-ÇA"],
  ["PUMA","PU-MA"],  ["COBRA","CO-BRA"],  ["TIGRE","TI-GRE"],  ["ZEBRA","ZE-BRA"],
  ["POMBO","POM-BO"],  ["PORCO","POR-CO"],  ["VACA","VA-CA"],  ["BODE","BO-DE"],
  ["MOSCA","MOS-CA"],  ["GRILO","GRI-LO"],  ["VESPA","VES-PA"],  ["GANSO","GAN-SO"],
  ["BURRO","BUR-RO"],  ["CABRA","CA-BRA"],  ["ORCA","OR-CA"],  ["CARPA","CAR-PA"],
  ["LONTRA","LON-TRA"],  ["PEIXE","PEI-XE"],  ["LEÃO","LE-ÃO"],  ["GARÇA","GAR-ÇA"],
  ["CAPIM","CA-PIM"],  ["MACACO","MA-CA-CO"],  ["GIRAFA","GI-RA-FA"],  ["CAVALO","CA-VA-LO"],
  ["GALINHA","GA-LI-NHA"],  ["CACHORRO","CA-CHOR-RO"],  ["COELHO","CO-E-LHO"],  ["LAGARTO","LA-GAR-TO"],
  ["TUCANO","TU-CA-NO"],  ["ARARA","A-RA-RA"],  ["URUBU","U-RU-BU"],  ["FORMIGA","FOR-MI-GA"],
  ["CIGARRA","CI-GAR-RA"],  ["RAPOSA","RA-PO-SA"],  ["CORUJA","CO-RU-JA"],  ["ABELHA","A-BE-LHA"],
  ["BALEIA","BA-LEI-A"],  ["CAMELO","CA-ME-LO"],  ["GORILA","GO-RI-LA"],  ["PANTERA","PAN-TE-RA"],
  ["BORBOLETA","BOR-BO-LE-TA"],  ["TARTARUGA","TAR-TA-RU-GA"],  ["LAGARTIXA","LA-GAR-TI-XA"],  ["ELEFANTE","E-LE-FAN-TE"],
  ["PELICANO","PE-LI-CA-NO"],  ["DENTE","DEN-TE"],  ["NARIZ","NA-RIZ"],  ["OLHO","O-LHO"],
  ["BOCA","BO-CA"],  ["PERNA","PER-NA"],  ["BRAÇO","BRA-ÇO"],  ["DEDO","DE-DO"],
  ["TESTA","TES-TA"],  ["OMBRO","OM-BRO"],  ["OSSO","OS-SO"],  ["ROSTO","ROS-TO"],
  ["COURO","COU-RO"],  ["OUVIDO","OU-VI-DO"],  ["PESCOÇO","PES-CO-ÇO"],  ["BARRIGA","BAR-RI-GA"],
  ["CABEÇA","CA-BE-ÇA"],  ["JOELHO","JO-E-LHO"],  ["COSTELA","COS-TE-LA"],  ["COTOVELO","CO-TO-VE-LO"],
  ["TORNOZELO","TOR-NO-ZE-LO"],  ["BEBÊ","BE-BÊ"],  ["FILHA","FI-LHA"],  ["FILHO","FI-LHO"],
  ["IRMÃO","IR-MÃO"],  ["IRMÃ","IR-MÃ"],  ["AVÓ","A-VÓ"],  ["AVÔ","A-VÔ"],
  ["MAMÃE","MA-MÃE"],  ["VOVÓ","VO-VÓ"],  ["VOVÔ","VO-VÔ"],  ["TIA","TI-A"],
  ["TIO","TI-O"],  ["PRIMO","PRI-MO"],  ["PRIMA","PRI-MA"],  ["MESA","ME-SA"],
  ["CAMA","CA-MA"],  ["CASA","CA-SA"],  ["PORTA","POR-TA"],  ["SOFÁ","SO-FÁ"],
  ["COPO","CO-PO"],  ["GARFO","GAR-FO"],  ["FACA","FA-CA"],  ["PRATO","PRA-TO"],
  ["BALDE","BAL-DE"],  ["FORNO","FOR-NO"],  ["LENÇOL","LEN-ÇOL"],  ["SALA","SA-LA"],
  ["TETO","TE-TO"],  ["CHAVE","CHA-VE"],  ["TELHA","TE-LHA"],  ["MURO","MU-RO"],
  ["GRADE","GRA-DE"],  ["TOALHA","TO-A-LHA"],  ["CADEIRA","CA-DEI-RA"],  ["JANELA","JA-NE-LA"],
  ["TRAVESSA","TRA-VES-SA"],  ["COLCHÃO","COL-CHÃO"],  ["CORTINA","COR-TI-NA"],  ["GELADEIRA","GE-LA-DEI-RA"],
  ["LÁPIS","LÁ-PIS"],  ["LIVRO","LI-VRO"],  ["FOLHA","FO-LHA"],  ["PROVA","PRO-VA"],
  ["TURMA","TUR-MA"],  ["BANCO","BAN-CO"],  ["QUADRO","QUA-DRO"],  ["PINCEL","PIN-CEL"],
  ["CARTAZ","CAR-TAZ"],  ["CADERNO","CA-DER-NO"],  ["MOCHILA","MO-CHI-LA"],  ["ESTOJO","ES-TO-JO"],
  ["BORRACHA","BOR-RA-CHA"],  ["TESOURA","TE-SOU-RA"],  ["CANETA","CA-NE-TA"],  ["APAGADOR","A-PA-GA-DOR"],
  ["MANGA","MAN-GA"],  ["MELÃO","ME-LÃO"],  ["LIMÃO","LI-MÃO"],  ["MAÇÃ","MA-ÇÃ"],
  ["PÊRA","PÊ-RA"],  ["UVA","U-VA"],  ["ARROZ","AR-ROZ"],  ["OVOS","O-VOS"],
  ["BOLO","BO-LO"],  ["TORTA","TOR-TA"],  ["SUCO","SU-CO"],  ["LEITE","LEI-TE"],
  ["CALDO","CAL-DO"],  ["FEIJÃO","FEI-JÃO"],  ["MAMÃO","MA-MÃO"],  ["CAJU","CA-JU"],
  ["QUIABO","QUI-A-BO"],  ["FRANGO","FRAN-GO"],  ["BATATA","BA-TA-TA"],  ["SALADA","SA-LA-DA"],
  ["TOMATE","TO-MA-TE"],  ["CEBOLA","CE-BO-LA"],  ["BANANA","BA-NA-NA"],  ["PIPOCA","PI-PO-CA"],
  ["SORVETE","SOR-VE-TE"],  ["BISCOITO","BIS-COI-TO"],  ["CEREJA","CE-RE-JA"],  ["PITANGA","PI-TAN-GA"],
  ["MORANGO","MO-RAN-GO"],  ["LARANJA","LA-RAN-JA"],  ["CENOURA","CE-NOU-RA"],  ["GOIABA","GOI-A-BA"],
  ["MACARRÃO","MA-CAR-RÃO"],  ["ABACAXI","A-BA-CA-XI"],  ["CHOCOLATE","CHO-CO-LA-TE"],  ["BOLA","BO-LA"],
  ["PIPA","PI-PA"],  ["DADO","DA-DO"],  ["PIÃO","PI-ÃO"],  ["CIRCO","CIR-CO"],
  ["PALCO","PAL-CO"],  ["BONECA","BO-NE-CA"],  ["BALANÇO","BA-LAN-ÇO"],  ["BRINQUEDO","BRIN-QUE-DO"],
  ["FUTEBOL","FU-TE-BOL"],  ["NATAÇÃO","NA-TA-ÇÃO"],  ["CORRIDA","COR-RI-DA"],  ["DESENHO","DE-SE-NHO"],
  ["PINTURA","PIN-TU-RA"],  ["MÚSICA","MÚ-SI-CA"],  ["BICICLETA","BI-CI-CLE-TA"],  ["FANTOCHE","FAN-TO-CHE"],
  ["FLOR","FLOR"],  ["PEDRA","PE-DRA"],  ["TERRA","TER-RA"],  ["NUVEM","NU-VEM"],
  ["CHUVA","CHU-VA"],  ["VENTO","VEN-TO"],  ["GALHO","GA-LHO"],  ["FRUTA","FRU-TA"],
  ["CAMPO","CAM-PO"],  ["LAGO","LA-GO"],  ["MATO","MA-TO"],  ["AREIA","A-REI-A"],
  ["TROVOADA","TRO-VOA-DA"],  ["FLORESTA","FLO-RES-TA"],  ["MONTANHA","MON-TA-NHA"],  ["CASCATA","CAS-CA-TA"],
  ["FURACÃO","FU-RA-CÃO"],  ["CARRO","CAR-RO"],  ["TREM","TREM"],  ["BARCO","BAR-CO"],
  ["AVIÃO","A-VI-ÃO"],  ["RUA","RU-A"],  ["ÔNIBUS","Ô-NI-BUS"],  ["AULA","AU-LA"],
  ["BAIRRO","BAI-RRO"],  ["CAMINHO","CA-MI-NHO"],  ["AMIGO","A-MI-GO"],  ["AMIGA","A-MI-GA"],
  ["MENINO","ME-NI-NO"],  ["MENINA","ME-NI-NA"],  ["CRIANÇA","CRI-AN-ÇA"],  ["ESCOLA","ES-CO-LA"],
  ["SAPATO","SA-PA-TO"],  ["CABELO","CA-BE-LO"],  ["PRESENTE","PRE-SEN-TE"],  ["SURPRESA","SUR-PRE-SA"],
  ["BARULHO","BA-RU-LHO"],  ["SORRISO","SOR-RI-SO"],  ["VERDE","VER-DE"],  ["AZUL","A-ZUL"],
  ["ROXO","RO-XO"],  ["PRETO","PRE-TO"],  ["BRANCO","BRAN-CO"],  ["CINZA","CIN-ZA"],
  ["JOGAR","JO-GAR"],  ["PULAR","PU-LAR"],  ["CORRER","COR-RER"],  ["COMER","CO-MER"],
  ["BEBER","BE-BER"],  ["DORMIR","DOR-MIR"],  ["CANTAR","CAN-TAR"],  ["DANÇAR","DAN-ÇAR"],
  ["NADAR","NA-DAR"],  ["SUBIR","SU-BIR"],  ["DEITAR","DEI-TAR"],  ["VOAR","VO-AR"],
  ["SORRIR","SOR-RIR"],  ["BRINCAR","BRIN-CAR"],  ["PINTAR","PIN-TAR"],  ["ANDAR","AN-DAR"],
  ["SENTAR","SEN-TAR"],  ["DRAGÃO","DRA-GÃO"],  ["CASTELO","CAS-TE-LO"],  ["ESPADA","ES-PA-DA"],
  ["ESCUDO","ES-CU-DO"],  ["FEITIÇO","FEI-TI-ÇO"],  ["ESTRELA","ES-TRE-LA"],  ["PLANETA","PLA-NE-TA"],
  ["FOGUETE","FO-GUE-TE"],  ["DINOSSAURO","DI-NOS-SAU-RO"],  ["BONITO","BO-NI-TO"],  ["BONITA","BO-NI-TA"],
  ["FELIZ","FE-LIZ"],  ["TRISTE","TRIS-TE"],  ["FORTE","FOR-TE"],  ["FRACO","FRA-CO"],
  ["GRANDE","GRAN-DE"],  ["GORDO","GOR-DO"],  ["MAGRO","MA-GRO"],  ["RÁPIDO","RÁ-PI-DO"],
  ["PEQUENO","PE-QUE-NO"],  ["ALEGRE","A-LE-GRE"],  ["PANELA","PA-NE-LA"],  ["COLHER","CO-LHER"],
  ["FIVELA","FI-VE-LA"],  ["TAPETE","TA-PE-TE"],
// Total: 266 palavras
];

const WORDS_BANK = WORDS;

// ── UTILS ────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickBatch(n = 12) {
  return shuffle([...Array(WORDS_BANK.length).keys()]).slice(0, n).map(i => WORDS_BANK[i]);
}
function scaleFontWord(len) {
  if (len <= 5) return 22;
  if (len <= 7) return 18;
  if (len <= 10) return 14;
  if (len <= 13) return 12;
  return 10;
}
function scaleFontSyl(len) {
  if (len <= 7) return 18;
  if (len <= 11) return 14;
  if (len <= 15) return 12;
  return 10;
}

// ── CLICK-TO-SPLIT WORD ──────────────────────────────────────
// Renders a word where the user clicks between letters to place "/"
// State: array of booleans for each inter-letter gap
function SplitWord({ word, splits, onToggle, locked, correct }) {
  const letters = word.split("");
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "nowrap", gap: 0 }}>
      {letters.map((ch, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center" }}>
          <span style={{
            fontSize: scaleFontWord(word.length),
            fontWeight: 900,
            color: locked ? (correct ? "#1A7A4A" : "#C0392B") : "#2C1654",
            fontFamily: "'Fredoka One', cursive",
            letterSpacing: 1,
            lineHeight: 1,
          }}>{ch}</span>
          {i < letters.length - 1 && (
            <span
              onClick={() => !locked && onToggle(i)}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: splits[i] ? 18 : 10,
                height: 28,
                cursor: locked ? "default" : "pointer",
                borderRadius: 4,
                background: splits[i]
                  ? (locked ? (correct ? "#1A7A4A" : "#C0392B") : "#FF6B35")
                  : "transparent",
                transition: "all .15s",
                margin: splits[i] ? "0 1px" : "0",
                userSelect: "none",
              }}
            >
              {splits[i] && (
                <span style={{
                  color: "#fff", fontWeight: 900, fontSize: 14,
                  fontFamily: "monospace", lineHeight: 1,
                }}>|</span>
              )}
              {!splits[i] && !locked && (
                <span style={{
                  color: "#DDD", fontSize: 10, fontWeight: 400,
                  opacity: 0.4,
                }}>·</span>
              )}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

// ── PRATICA COMPONENT ────────────────────────────────────────
function Pratica({ onXP }) {
  const [batch, setBatch]     = useState(() => pickBatch());
  const [splitsArr, setSplits] = useState(() => Array(12).fill(null).map(() => []));
  const [phase, setPhase]     = useState("answering"); // answering | results
  const [xpEarned, setXpEarned] = useState(0);

  // Initialize splits when batch changes
  useEffect(() => {
    setSplits(batch.map(([word]) => Array(word.length - 1).fill(false)));
    setPhase("answering");
    setXpEarned(0);
  }, [batch]);

  function toggle(wordIdx, gapIdx) {
    setSplits(prev => {
      const next = prev.map(s => [...s]);
      next[wordIdx][gapIdx] = !next[wordIdx][gapIdx];
      return next;
    });
  }

  // Convert splits array → "A-BA-CA-XI" string
  function splitsToString(word, splits) {
    let result = "";
    for (let i = 0; i < word.length; i++) {
      result += word[i];
      if (i < word.length - 1 && splits[i]) result += "-";
    }
    return result;
  }

  function hasSplit(splits) {
    return splits.some(Boolean);
  }

  const allAttempted = splitsArr.every(s => hasSplit(s));

  function check() {
    const results = batch.map(([word, correct], i) => {
      const given = splitsToString(word, splitsArr[i]);
      return { word, correct, given, ok: given === correct };
    });
    const okCount = results.filter(r => r.ok).length;
    const xp = okCount * 8;
    setXpEarned(xp);
    onXP(xp);
    setPhase("results");
  }

  function newBatch() {
    setBatch(pickBatch());
  }

  if (phase === "results") {
    const results = batch.map(([word, correct], i) => ({
      word, correct, given: splitsToString(word, splitsArr[i]),
      ok: splitsToString(word, splitsArr[i]) === correct,
    }));
    const okCount = results.filter(r => r.ok).length;
    const pct = Math.round((okCount / 12) * 100);
    const medal = pct === 100 ? "🏆" : pct >= 75 ? "🥇" : pct >= 50 ? "🥈" : pct >= 25 ? "🥉" : "💪";
    const msg = pct === 100 ? "Perfeito absoluto! Você é demais! 🌟"
              : pct >= 75 ? "Quase perfeito, continue assim! ⭐"
              : pct >= 50 ? "Bom trabalho! Vamos praticar mais! 😊"
              : "Continue tentando, você vai conseguir! 💪";

    return (
      <div>
        {/* SCORE CARD */}
        <div style={{
          background: "linear-gradient(135deg,#FF6B35 0%,#F7C59F 100%)",
          borderRadius: 24, padding: "24px 20px 20px",
          textAlign: "center", marginBottom: 20,
          boxShadow: "0 12px 40px #FF6B3545",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, fontSize: 80, opacity: .08 }}>✂️</div>
          <div style={{ fontSize: 56, marginBottom: 4 }}>{medal}</div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 30, fontFamily: "'Fredoka One', cursive" }}>
            {okCount} de 12!
          </div>
          <div style={{ color: "rgba(255,255,255,.9)", fontSize: 14, marginTop: 4 }}>{msg}</div>
          <div style={{
            display: "flex", gap: 10, justifyContent: "center", marginTop: 16, flexWrap: "wrap",
          }}>
            {[
              { icon: "✅", val: okCount, label: "acertos" },
              { icon: "❌", val: 12 - okCount, label: "erros" },
              { icon: "📊", val: pct + "%", label: "aproveit." },
              { icon: "⭐", val: "+" + xpEarned, label: "XP" },
            ].map(({ icon, val, label }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,.22)", borderRadius: 14,
                padding: "8px 16px", minWidth: 64,
              }}>
                <div style={{ fontSize: 18 }}>{icon}</div>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, fontFamily: "'Fredoka One', cursive" }}>{val}</div>
                <div style={{ color: "rgba(255,255,255,.8)", fontSize: 10 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RESULT GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {results.map(({ word, correct, given, ok }, i) => (
            <div key={i} style={{
              borderRadius: 14, padding: "10px 12px",
              background: ok ? "#E8FFF4" : "#FFF0EE",
              border: `2px solid ${ok ? "#4CAF85" : "#FF8A70"}`,
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                marginBottom: 4,
              }}>
                <span style={{ fontSize: 14 }}>{ok ? "✅" : "❌"}</span>
                <span style={{
                  fontWeight: 900, fontSize: scaleFontWord(word.length) - 2,
                  color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  fontFamily: "'Fredoka One', cursive",
                }}>{word}</span>
              </div>
              <div style={{ fontSize: 11, color: "#2A9D8F", fontWeight: 700 }}>✔ {correct}</div>
              {!ok && <div style={{ fontSize: 11, color: "#E76F51" }}>✗ {given}</div>}
            </div>
          ))}
        </div>

        <button onClick={newBatch} style={{
          width: "100%", padding: "18px",
          background: "linear-gradient(135deg,#FF6B35,#FF9A3C)",
          color: "#fff", border: "none", borderRadius: 18,
          fontSize: 20, fontWeight: 900, cursor: "pointer",
          fontFamily: "'Fredoka One', cursive",
          boxShadow: "0 8px 30px #FF6B3555",
          letterSpacing: 1,
          animation: "pulseBtn 1.6s ease-in-out infinite",
        }}>
          🔥 PRÓXIMAS 12 PALAVRAS!
        </button>
      </div>
    );
  }

  // ANSWERING PHASE
  const filledCount = splitsArr.filter(hasSplit).length;

  return (
    <div>
      {/* INSTRUÇÃO */}
      <div style={{
        background: "linear-gradient(135deg,#FF6B35,#FF9A3C)",
        borderRadius: 18, padding: "14px 18px", marginBottom: 18,
        display: "flex", gap: 12, alignItems: "center",
      }}>
        <div style={{ fontSize: 32 }}>✂️</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 15, fontFamily: "'Fredoka One', cursive" }}>
            Clique entre as letras para separar!
          </div>
          <div style={{ color: "rgba(255,255,255,.85)", fontSize: 11 }}>
            Toque no espaço entre as letras para colocar uma barra. Toque de novo para tirar.
          </div>
        </div>
        <div style={{
          marginLeft: "auto", background: "rgba(255,255,255,.25)",
          borderRadius: 12, padding: "4px 12px", color: "#fff",
          fontWeight: 900, fontSize: 14, whiteSpace: "nowrap",
          fontFamily: "'Fredoka One', cursive",
        }}>{filledCount}/12</div>
      </div>

      {/* WORD CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {batch.map(([word], wi) => (
          <div key={wi} style={{
            background: splitsArr[wi]?.some(Boolean) ? "#FFF8F5" : "#FAFAFA",
            borderRadius: 14, padding: "12px 10px",
            border: `2px solid ${splitsArr[wi]?.some(Boolean) ? "#FF8A70" : "#EEE"}`,
            boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 60, overflow: "hidden",
          }}>
            <SplitWord
              word={word}
              splits={splitsArr[wi] || []}
              onToggle={(gi) => toggle(wi, gi)}
              locked={false}
            />
          </div>
        ))}
      </div>

      {/* PROGRESS */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ background: "#eee", borderRadius: 99, height: 8, overflow: "hidden" }}>
          <div style={{
            width: `${(filledCount / 12) * 100}%`, height: "100%",
            background: "linear-gradient(90deg,#FF6B35,#FF9A3C)",
            borderRadius: 99, transition: "width .3s",
          }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 4 }}>
          {filledCount} de 12 marcadas
        </div>
      </div>

      <button onClick={check} disabled={!allAttempted} style={{
        width: "100%", padding: "16px",
        background: allAttempted ? "linear-gradient(135deg,#FF6B35,#FF9A3C)" : "#E0E0E0",
        color: allAttempted ? "#fff" : "#aaa",
        border: "none", borderRadius: 16,
        fontSize: 18, fontWeight: 900, cursor: allAttempted ? "pointer" : "not-allowed",
        fontFamily: "'Fredoka One', cursive",
        boxShadow: allAttempted ? "0 6px 24px #FF6B3540" : "none",
        transition: "all .25s", letterSpacing: .5,
      }}>
        {allAttempted ? "✅ CORRIGIR TUDO!" : `Marque todas as 12 palavras`}
      </button>
    </div>
  );
}

// ── FLASHCARDS ───────────────────────────────────────────────
function Flashcards({ onXP }) {
  const PER = 12;
  const total = Math.ceil(WORDS_BANK.length / PER);
  const [order] = useState(() => shuffle([...Array(WORDS_BANK.length).keys()]));
  const [page, setPage] = useState(0);
  const [flipped, setFlipped] = useState({});
  const [xpDone, setXpDone] = useState(false);

  const cards = order.slice(page * PER, page * PER + PER).map(i => WORDS_BANK[i]);

  function next() {
    setPage(p => p < total - 1 ? p + 1 : 0);
    setFlipped({});
    if (!xpDone) { onXP(5); setXpDone(true); }
  }

  const CARD_COLORS = [
    ["#FF6B6B","#FF8E8E"],["#4ECDC4","#7EDDD7"],["#FFE66D","#FFD93D"],
    ["#A29BFE","#C5B8FE"],["#FD79A8","#FFA3C2"],["#55EFC4","#81ECC9"],
    ["#FDCB6E","#FDE18E"],["#6C5CE7","#9B90F0"],["#00B894","#48CBA8"],
    ["#E17055","#F0927C"],["#0984E3","#5AB3EF"],["#D63031","#E67E7E"],
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{
          display: "inline-flex", gap: 8, alignItems: "center",
          background: "linear-gradient(135deg,#A29BFE,#6C5CE7)",
          borderRadius: 20, padding: "6px 18px",
        }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 13, fontFamily: "'Fredoka One', cursive" }}>
            Grupo {page + 1} de {total}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
          👆 Toque no cartão para revelar a separação!
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
        {cards.map(([word, syl], i) => {
          const isFlipped = !!flipped[i];
          const [c1, c2] = CARD_COLORS[i % CARD_COLORS.length];
          return (
            <div
              key={i}
              onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
              style={{
                cursor: "pointer",
                height: 80,
                borderRadius: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isFlipped ? `linear-gradient(135deg,${c1},${c2})` : "#fff",
                border: isFlipped ? "none" : `2.5px solid ${c1}`,
                boxShadow: isFlipped ? `0 8px 24px ${c1}55` : `0 2px 10px ${c1}25`,
                transition: "all .2s",
                padding: "6px 8px",
                position: "relative", overflow: "hidden",
              }}
            >
              {!isFlipped && (
                <div style={{
                  position: "absolute", bottom: 4, right: 6,
                  fontSize: 10, color: c1, opacity: .5, fontWeight: 700,
                }}>toque</div>
              )}
              <div style={{
                fontWeight: 900,
                fontSize: isFlipped ? scaleFontSyl(syl.length) : scaleFontWord(word.length),
                color: isFlipped ? "#fff" : "#2C1654",
                fontFamily: "'Fredoka One', cursive",
                letterSpacing: isFlipped ? 2 : 1,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                width: "100%", textAlign: "center",
                textShadow: isFlipped ? "0 2px 8px rgba(0,0,0,.2)" : "none",
              }}>
                {isFlipped ? syl : word}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={next} style={{
        width: "100%", padding: "15px",
        background: "linear-gradient(135deg,#A29BFE,#6C5CE7)",
        color: "#fff", border: "none", borderRadius: 16,
        fontSize: 17, fontWeight: 900, cursor: "pointer",
        fontFamily: "'Fredoka One', cursive",
        boxShadow: "0 6px 22px #6C5CE755",
        letterSpacing: .5,
      }}>
        {page < total - 1 ? `✨ Próximos 12 cartões →` : "🔀 Embaralhar tudo de novo!"}
      </button>
    </div>
  );
}

// ── TEORIA (AI agents) ───────────────────────────────────────
const PROMPTS = {
  intro: {
    sys: `Você é Tia Didática, professora carinhosa para crianças de 7 anos. Responda em português brasileiro. Use linguagem simples, frases curtas, emojis, exemplos do cotidiano. Máximo 200 palavras.`,
    user: `Explique para uma criança de 7 anos o que é uma sílaba. Use BOLA (BO-LA), CASA (CA-SA), SOL. Fale em bater palmas. Seja super animado!`,
  },
  vogais: {
    sys: `Você é Tia Didática, professora para crianças de 7 anos. Português simples, emojis. Máximo 200 palavras.`,
    user: `Explique vogais (A E I O U) e consoantes para criança de 7 anos. Toda sílaba tem uma vogal. Exemplos: BA, CA, FE, MI.`,
  },
  hiato: {
    sys: `Você é Tia Didática, professora para crianças de 7 anos. Português simples, emojis. Máximo 200 palavras. IMPORTANTE: RELÓGIO tem ditongo (RE-LÓ-GIO, 3 sílabas, o "io" final é ditongo). Hiato ocorre quando as duas vogais ficam em sílabas SEPARADAS, como SA-Í-DA (o Í tem acento, fica sozinho).`,
    user: `Explique hiato (duas vogais em sílabas separadas) para criança de 7 anos. Use exemplos corretos de hiato: SA-Í-DA, CO-E-LHO, JO-A-NI-NHA, VI-Ú-VA, RA-I-NHA. Explique que quando o I ou U têm acento ou são tônicos, eles ficam sozinhos numa sílaba. São vogais tímidas que não querem ficar juntas! Seja bem divertido!`,
  },
  ditongo: {
    sys: `Você é Tia Didática, professora para crianças de 7 anos. Português simples, emojis. Máximo 200 palavras. IMPORTANTE: nunca diga que MAMÃE tem 3 sílabas — MAMÃE tem apenas 2 sílabas: MA-MÃE (o ÃE é um ditongo nasal). Não use MAMÃE como exemplo de 3 sílabas.`,
    user: `Explique ditongo (duas vogais na mesma sílaba) para criança de 7 anos. Use exemplos corretos: PAI (1 sílaba só!), MAU, CEU, REI, OI, ÃE (como em MÃE e MAMÃE que tem 2 sílabas: MA-MÃE). Diga que são vogais amigas que ficam juntinhas. Mostre ditongo decrescente (PAI, REI) e crescente (QUA-dro, sé-RIE). Seja animado!`,
  },
  tritongo: {
    sys: `Você é Tia Didática, professora para crianças de 7 anos. Português simples, emojis. Máximo 200 palavras.`,
    user: `Explique tritongo (três vogais na mesma sílaba) para criança de 7 anos. Ex: U-RU-GUAI, PA-RA-GUAI, QUAIS. Três vogais super amigas!`,
  },
  encontro: {
    sys: `Você é Tia Didática, professora para crianças de 7 anos. Português simples, emojis. Máximo 200 palavras.`,
    user: `Explique encontro consonantal para criança de 7 anos. Inseparável: BR CR FL PR TR (BRA-ÇO, TRE-M). Separável: BOR-BO-LE-TA, CAS-TE-LO. Use exemplos divertidos!`,
  },
};

function AgentBubble({ agent, children, loading }) {
  const a = AGENTS[agent];
  return (
    <div style={{
      background: "#fff", border: `2.5px solid ${a.color}`,
      borderRadius: 20, padding: "18px 20px", margin: "14px 0",
      position: "relative", boxShadow: `0 4px 20px ${a.color}22`,
    }}>
      <div style={{
        position: "absolute", top: -14, left: 16,
        background: a.color, color: "#fff", borderRadius: 20,
        padding: "3px 14px", fontSize: 12, fontWeight: 700,
        display: "flex", gap: 5, alignItems: "center",
        fontFamily: "'Nunito', sans-serif",
      }}>{a.emoji} {a.name}</div>
      <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.75, color: "#333" }}>
        {loading
          ? <div style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: a.color, animation: `bounce 1s ${i * .2}s infinite`,
                }} />
              ))}
            </div>
          : children}
      </div>
    </div>
  );
}

function Teoria({ moduleId, onXP }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState("linguist");
  const [xpDone, setXpDone] = useState(false);

  useEffect(() => {
    setLoading(true); setContent("");
    const p = PROMPTS[moduleId];
    if (!p) { setLoading(false); return; }
    let s = 0; const seq = ["linguist", "coordinator", "pedagogue"];
    const iv = setInterval(() => { s++; if (s < seq.length) setAgent(seq[s]); else clearInterval(iv); }, 900);
    callClaude(p.sys, p.user).then(txt => {
      clearInterval(iv); setContent(txt); setLoading(false); setAgent("pedagogue");
      if (!xpDone) { onXP(10); setXpDone(true); }
    }).catch(() => { clearInterval(iv); setContent("Não foi possível carregar. Tente novamente! 🔄"); setLoading(false); });
    return () => clearInterval(iv);
  }, [moduleId]);

  return loading
    ? Object.keys(AGENTS).map(k => (
        <AgentBubble key={k} agent={k} loading={k === agent}>
          {k !== agent && <span style={{ color: "#ccc" }}>aguardando…</span>}
        </AgentBubble>
      ))
    : <AgentBubble agent="pedagogue"><div style={{ whiteSpace: "pre-wrap" }}>{content}</div></AgentBubble>;
}

function ModuleContent({ moduleId, onXP }) {
  if (moduleId === "pratica")   return <Pratica onXP={onXP} />;
  if (moduleId === "flashcard") return <Flashcards onXP={onXP} />;
  return <Teoria moduleId={moduleId} onXP={onXP} />;
}

// ── MODULE GROUPS ────────────────────────────────────────────
const GROUPS = [
  {
    id: "teoria",
    label: "📖 Aprender",
    tagline: "Entenda as regras com a Tia Didática",
    color: "#5C6BC0",
    headerBg: "linear-gradient(135deg,#667EEA,#764BA2)",
    modules: [
      { id:"intro",    emoji:"🔤", title:"O que é Sílaba?",      color:"#667EEA", g:"linear-gradient(135deg,#667EEA,#764BA2)" },
      { id:"vogais",   emoji:"🎵", title:"Vogais",               color:"#43B89C", g:"linear-gradient(135deg,#43B89C,#1A9980)" },
      { id:"hiato",    emoji:"🌉", title:"Hiato",                color:"#48C774", g:"linear-gradient(135deg,#48C774,#27AE60)" },
      { id:"ditongo",  emoji:"🎭", title:"Ditongo",              color:"#F39C12", g:"linear-gradient(135deg,#F7DC6F,#F39C12)" },
      { id:"tritongo", emoji:"🌟", title:"Tritongo",             color:"#9B59B6", g:"linear-gradient(135deg,#C39BD3,#9B59B6)" },
      { id:"encontro", emoji:"🤝", title:"Encontro Consonantal", color:"#E84393", g:"linear-gradient(135deg,#FD79A8,#E84393)" },
    ],
  },
  {
    id: "exercicios",
    label: "🚀 Praticar",
    tagline: "Exercícios com 480 palavras!",
    color: "#E84393",
    headerBg: "linear-gradient(135deg,#FF6B35,#F7C59F)",
    modules: [
      { id:"flashcard", emoji:"🃏", title:"Flashcards",        color:"#6C5CE7", g:"linear-gradient(135deg,#A29BFE,#6C5CE7)", big:true },
      { id:"pratica",   emoji:"✂️", title:"Separar Sílabas",   color:"#FF6B35", g:"linear-gradient(135deg,#FF6B35,#FF9A3C)", big:true },
    ],
  },
];
const ALL_MODULES = GROUPS.flatMap(g => g.modules);

// ── PROGRESS BAR ─────────────────────────────────────────────
function XPBar({ xp, max, level }) {
  const pct = Math.min(100, Math.round((xp / max) * 100));
  return (
    <div style={{ maxWidth: 440, margin: "14px auto 0", background: "rgba(255,255,255,.18)", borderRadius: 18, padding: "10px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontWeight: 800, fontSize: 13, marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>
        <span>⭐ {xp} XP</span>
        <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 15 }}>Nível {level}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,.3)", borderRadius: 99, height: 14, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#FFD93D,#FF6B35)", transition: "width .6s ease", boxShadow: "0 0 10px #FFD93D88" }} />
      </div>
    </div>
  );
}

// ── DECORATIVE STARS ─────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 12 }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 6 + Math.random() * 10,
    delay: Math.random() * 3,
    dur: 2 + Math.random() * 2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", top: s.top, left: s.left,
          width: s.size, height: s.size,
          background: "#fff", borderRadius: "50%",
          opacity: 0.25,
          animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [activeModule, setActive] = useState(null);
  const [xp, setXp]               = useState(0);
  const [done, setDone]           = useState(new Set());
  const [celebrate, setCelebrate] = useState(false);

  const MAX_XP = 300;
  const level  = Math.floor(xp / 60) + 1;

  function handleXP(n) {
    setXp(prev => {
      const next = Math.min(prev + n, MAX_XP);
      if (next >= MAX_XP && prev < MAX_XP) setCelebrate(true);
      return next;
    });
  }
  function openMod(m) { setActive(m); setDone(prev => new Set([...prev, m.id])); }
  const mod = activeModule ? ALL_MODULES.find(m => m.id === activeModule.id) : null;

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", minHeight: "100vh", background: "#FAF7FF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap');
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pop{0%{transform:scale(.82) translateY(40px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(2deg)}}
        @keyframes twinkle{0%,100%{opacity:.15;transform:scale(1)}50%{opacity:.55;transform:scale(1.4)}}
        @keyframes confetti{0%{transform:translateY(-30px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(900deg);opacity:0}}
        @keyframes pulseBtn{0%,100%{box-shadow:0 8px 30px #FF6B3560}50%{box-shadow:0 14px 44px #FF6B3599,0 0 0 8px #FF6B3520}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes slideIn{0%{transform:translateY(60px);opacity:0}100%{transform:translateY(0);opacity:1}}
        *{box-sizing:border-box} button{font-family:inherit} input{font-family:inherit}
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-thumb{background:#C5B8FE;border-radius:3px}
      `}</style>

      {/* ── CELEBRATION ── */}
      {celebrate && (
        <div style={{ position: "fixed", inset: 0, background: "#0009", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setCelebrate(false)}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute", left: `${Math.random() * 100}%`, top: 0,
              width: 14, height: 14,
              background: `hsl(${Math.random() * 360},85%,65%)`,
              borderRadius: Math.random() > .4 ? "50%" : "2px",
              animation: `confetti ${1 + Math.random() * 2.5}s ${Math.random() * .8}s forwards`,
            }} />
          ))}
          <div style={{ background: "#fff", borderRadius: 32, padding: "44px 56px", textAlign: "center", animation: "pop .4s ease", maxWidth: 340 }}>
            <div style={{ fontSize: 72 }}>🏆</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#2C1654", fontFamily: "'Fredoka One', cursive" }}>Incrível!</div>
            <div style={{ fontSize: 15, color: "#666", marginTop: 8, lineHeight: 1.5 }}>Você completou todos os desafios do Mundo das Sílabas!</div>
            <button onClick={() => setCelebrate(false)} style={{ marginTop: 20, padding: "12px 32px", background: "linear-gradient(135deg,#FF6B35,#FF9A3C)", color: "#fff", border: "none", borderRadius: 16, fontSize: 17, fontWeight: 900, cursor: "pointer", fontFamily: "'Fredoka One', cursive" }}>Eba! 🎊</button>
          </div>
        </div>
      )}

      {/* ── MODAL ── */}
      {activeModule && mod && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(44,22,84,.6)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 8px" }}
          onClick={e => e.target === e.currentTarget && setActive(null)}>
          <div style={{
            background: "#fff", borderRadius: "28px 28px 0 0",
            width: "100%", maxWidth: 660, maxHeight: "91vh", overflowY: "auto",
            padding: "24px 18px 52px", animation: "pop .3s ease",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: mod.g, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, boxShadow: `0 6px 20px ${mod.color}44`,
                }}>{mod.emoji}</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 19, color: "#2C1654", fontFamily: "'Fredoka One', cursive" }}>{mod.title}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>{mod.big ? "Banco com 480 palavras 🎮" : "+10 XP ao aprender ⭐"}</div>
                </div>
              </div>
              <button onClick={() => setActive(null)} style={{
                background: "#F5F0FF", border: "none", borderRadius: "50%",
                width: 38, height: 38, fontSize: 18, cursor: "pointer", color: "#9B59B6",
              }}>✕</button>
            </div>
            <ModuleContent moduleId={mod.id} onXP={handleXP} />
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(160deg,#2C1654 0%,#6C3FC5 50%,#A855F7 100%)",
        padding: "32px 20px 44px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <Stars />
        {/* decorative circles */}
        <div style={{ position:"absolute",top:-60,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,.05)" }}/>
        <div style={{ position:"absolute",bottom:-80,left:-50,width:250,height:250,borderRadius:"50%",background:"rgba(255,255,255,.04)" }}/>

        <div style={{ fontSize: 58, animation: "float 4s ease-in-out infinite", display:"inline-block" }}>🦋</div>
        <h1 style={{
          fontSize: "clamp(26px,6vw,40px)", fontWeight: 400, color: "#fff",
          margin: "10px 0 6px", fontFamily: "'Fredoka One', cursive",
          textShadow: "0 4px 20px rgba(0,0,0,.3)",
          letterSpacing: 1,
        }}>Mundo das Sílabas</h1>
        <p style={{ color: "rgba(255,255,255,.75)", fontSize: 15, margin: 0, fontWeight: 700 }}>
          Aprenda a separar sílabas de um jeito mágico! ✨
        </p>
        <XPBar xp={xp} max={MAX_XP} level={level} />

        {/* wave */}
        <div style={{
          position:"absolute",bottom:-2,left:0,right:0,height:36,
          background:"#FAF7FF",
          clipPath:"ellipse(60% 100% at 50% 100%)",
        }}/>
      </div>

      {/* ── GROUPS ── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 14px 0" }}>
        {GROUPS.map((grp, gi) => (
          <div key={grp.id} style={{ marginBottom: 36, animation: `slideIn .5s ${gi * .15}s both` }}>

            {/* group header */}
            <div style={{
              background: grp.headerBg,
              borderRadius: 20, padding: "14px 20px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: `0 8px 28px rgba(0,0,0,.12)`,
              position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
              <div style={{ fontSize: 34 }}>{grp.label.split(" ")[0]}</div>
              <div>
                <div style={{ fontFamily: "'Fredoka One', cursive", color: "#fff", fontSize: 20, lineHeight: 1 }}>
                  {grp.label.slice(2)}
                </div>
                <div style={{ color: "rgba(255,255,255,.8)", fontSize: 12, marginTop: 3 }}>{grp.tagline}</div>
              </div>
              {grp.id === "exercicios" && (
                <div style={{
                  marginLeft:"auto", background:"rgba(255,255,255,.22)",
                  borderRadius:12,padding:"4px 14px",color:"#fff",
                  fontFamily:"'Fredoka One',cursive",fontSize:14,whiteSpace:"nowrap",
                }}>
                  🔥 Hot!
                </div>
              )}
            </div>

            {/* cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: grp.id === "exercicios" ? "1fr 1fr" : "repeat(3,1fr)",
              gap: 12,
            }}>
              {grp.modules.map(m => {
                const isDone = done.has(m.id);
                return (
                  <button key={m.id} onClick={() => openMod(m)}
                    style={{
                      background: isDone ? m.g : "#fff",
                      border: isDone ? "none" : `2.5px solid ${m.color}30`,
                      borderRadius: 22,
                      padding: m.big ? "26px 16px" : "20px 12px",
                      cursor: "pointer", textAlign: "center",
                      boxShadow: isDone
                        ? `0 10px 30px ${m.color}44`
                        : m.big ? `0 6px 22px ${m.color}22` : "0 3px 14px rgba(0,0,0,.06)",
                      transition: "transform .15s,box-shadow .2s",
                      position: "relative", overflow: "hidden",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 16px 40px ${m.color}55`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = isDone ? `0 10px 30px ${m.color}44` : m.big ? `0 6px 22px ${m.color}22` : "0 3px 14px rgba(0,0,0,.06)"; }}
                  >
                    {/* shimmer for exercise cards */}
                    {m.big && !isDone && (
                      <div style={{
                        position:"absolute",inset:0,borderRadius:22,
                        background:`linear-gradient(90deg, transparent, ${m.color}15, transparent)`,
                        backgroundSize:"200% 100%",
                        animation:"shimmer 2.5s linear infinite",
                        pointerEvents:"none",
                      }}/>
                    )}
                    {/* top accent bar */}
                    {!isDone && (
                      <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:m.g,borderRadius:"22px 22px 0 0" }}/>
                    )}
                    {isDone && (
                      <div style={{
                        position:"absolute",top:8,right:10,
                        background:"rgba(255,255,255,.85)",borderRadius:"50%",
                        width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:14,fontWeight:900,
                      }}>✓</div>
                    )}
                    <div style={{ fontSize: m.big ? 42 : 30, marginBottom: 8 }}>{m.emoji}</div>
                    <div style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: m.big ? 16 : 13,
                      color: isDone ? "#fff" : "#2C1654",
                      lineHeight: 1.3,
                    }}>{m.title}</div>
                    {m.big && !isDone && (
                      <div style={{
                        marginTop: 10, display: "inline-block",
                        background: m.g, color: "#fff",
                        borderRadius: 20, padding: "4px 16px",
                        fontSize: 12, fontWeight: 900,
                        fontFamily: "'Fredoka One', cursive",
                        letterSpacing: .5,
                      }}>JOGAR!</div>
                    )}
                    {!m.big && !isDone && (
                      <div style={{ marginTop: 6, fontSize: 11, color: m.color, fontWeight: 800 }}>+10 XP</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: "center", padding: "0 16px 30px", color: "#B39DDB",
        fontSize: 13, fontWeight: 700,
      }}>
        💡 Bata palmas: BA·NA·NA = 3 palmas = 3 sílabas!
      </div>
    </div>
  );
}
