// app-finale.jsx — Block 9: pantalla final motivadora con pixel art

// ────────────────────────────────────────────────────────────
// PixelArt: Manos diversas unidas en círculo + corazones
// 32×32 grid, cada celda = 8px = 256x256 total
// ────────────────────────────────────────────────────────────
function PixelArtUnity() {
  // Grid 32x32. Cada char = un color.
  // ' ' = vacío, '1'..'5' = pieles diversas, 'h' = corazón, 's' = brillo, 'o' = contorno
  const PALETTE = {
    " ": "transparent",
    "o": "#0a0118",       // contorno
    "1": "#fde0c0",       // piel clara
    "2": "#e8b88a",       // piel media-clara
    "3": "#c98a5b",       // piel media
    "4": "#8a5a3b",       // piel oscura
    "5": "#5a3a26",       // piel muy oscura
    "h": "#ec4899",       // corazón rosa
    "p": "#ff8fb8",       // corazón claro
    "y": "#ffd60a",       // amarillo neón (estrella/brillo)
    "g": "#39ff14",       // verde neón (brillo)
    "c": "#22d3ee",       // cian (brillo)
    "u": "#a855f7",       // morado (brillo)
  };

  // 32 rows x 32 cols. Diverse hands forming a circle, hearts in center, sparkles around.
  const ART = [
    "                                ",
    "      y       g       c         ",
    "       y     g       c          ",
    "         oooooooooooo           ",
    "       oo111111oo3333oo         ",
    "      o11111111oo333333o        ",
    "     o1111111111o33333333o      ",
    "    o11111111111oo33333333o     ",
    "   o111111111111oo333333333o    ",
    "  oo111111111111oo333333333oo   ",
    " oo1111111111111oo3333333333oo  ",
    "oo11111111oooooooooooo33333333oo",
    "o111111ooo            ooo333333o",
    "o11111oo    hh    hh    oo3333o ",
    "o11111o    hppph  hppph    o333o",
    "o1111o    hppppphhppppph    o33o",
    "o1111o    hpppppppppppph    o33o",
    "o1111o     hppppppppph      o33o",
    "o11111o     hppppph          o33o",
    " o1111o      hpph           o333o",
    " o2222oo      hh           o4444o",
    "  o22222oooooooooooooooooo44444o",
    "  oo222222222oo  oo44444444444o ",
    "   o222222222oo  oo444444444oo  ",
    "    oo222222oo    oo4444444oo   ",
    "     oo2222ooo    ooo44444oo    ",
    "      ooooo  u      ooooooo     ",
    "             u                  ",
    "       y                  c     ",
    "                                ",
    "         g            u         ",
    "                                ",
  ];

  // Use larger trimmed grid - 32 wide is rough. Make it 8px per cell.
  const cell = 7;
  const cols = 32;
  const rows = ART.length;
  const w = cols * cell;
  const h = rows * cell;

  const rects = [];
  for (let r = 0; r < rows; r++) {
    const row = ART[r];
    for (let c = 0; c < cols; c++) {
      const ch = row[c] || " ";
      const fill = PALETTE[ch] || "transparent";
      if (fill === "transparent") continue;
      rects.push(<rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill={fill} />);
    }
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated", display: "block" }}
    >
      {rects}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────
// Block 9 — Pantalla final
// ────────────────────────────────────────────────────────────
function Block9Finale({ go, state, setState }) {
  const messages = [
    "Donde antes había prejuicio, ahora hay observación.",
    "Cada estereotipo que rompemos abre un espacio para conocer a alguien de verdad.",
    "La diversidad no es un obstáculo: es la fuerza de nuestra convivencia.",
  ];

  return (
    <div className="screen-body" style={{
      paddingBottom: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      textAlign: "center",
      minHeight: "100%",
      paddingTop: 70,
      gap: 14,
    }}>
      <div className="pixel-grid" />

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)",
        letterSpacing: "0.2em", marginBottom: 8, position: "relative", zIndex: 2,
      }} className="glow-yellow">
        ★ ★ ★ ★ ★ ★ ★
      </div>

      <h1 className="h-arcade glow-pink" style={{
        fontSize: 19, color: "var(--neon-pink)", margin: "8px 0 4px",
        position: "relative", zIndex: 2, lineHeight: 1.5,
      }}>
        ¡AVENTURA<br/>COMPLETADA!
      </h1>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--neon-green)",
        marginBottom: 14, position: "relative", zIndex: 2, letterSpacing: "0.04em",
      }}>
        Equipo {state.groupName || "—"}
      </div>

      {/* Pixel art */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: 6,
        background: "rgba(10,1,24,0.6)",
        border: "3px solid var(--neon-purple)",
        boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 3px var(--neon-purple)",
        marginBottom: 0,
        alignSelf: "center",
      }}>
        <img
          src="assets/finale-pixel-art.png"
          alt="Equipo de aventureros diversos al atardecer, celebrando con bandera arcoíris y cadenas rotas"
          style={{
            display: "block",
            width: 300,
            maxWidth: "100%",
            height: "auto",
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* Frase motivadora */}
      <div className="px-card px-card--yellow" style={{
        position: "relative", zIndex: 2, padding: 14, marginBottom: 0,
      }}>
        <div style={{
          fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)",
          marginBottom: 8, letterSpacing: "0.08em",
        }}>
          ✦ MENSAJE FINAL ✦
        </div>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25,
          margin: 0, color: "var(--ink)", textAlign: "left",
        }}>
          {messages[0]}
        </p>
      </div>

      <div className="px-card px-card--cyan" style={{
        position: "relative", zIndex: 2, padding: 14, marginBottom: 0,
      }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.25,
          margin: 0, color: "var(--neon-cyan)", textAlign: "left",
        }}>
          {messages[1]}
        </p>
      </div>

      <div className="px-card px-card--green" style={{
        position: "relative", zIndex: 2, padding: 14, marginBottom: 0,
      }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25,
          margin: 0, color: "var(--neon-green)", fontWeight: 600, textAlign: "left",
        }}>
          {messages[2]}
        </p>
      </div>

      {/* Insignias mini */}
      <div style={{
        display: "flex", gap: 10, justifyContent: "center",
        position: "relative", zIndex: 2, marginBottom: 0,
      }}>
        {[
          { c: "cyan", l: "A" },
          { c: "orange", l: "B" },
          { c: "green", l: "C" },
        ].map((b, i) => (
          <div key={i} style={{
            width: 56, height: 56,
            background: `linear-gradient(135deg, var(--neon-${b.c}), var(--neon-orange))`,
            clipPath: "polygon(50% 0%, 90% 20%, 100% 50%, 90% 80%, 50% 100%, 10% 80%, 0% 50%, 10% 20%)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-arcade)", fontSize: 16, color: "#0a0118",
            filter: "drop-shadow(0 0 6px currentColor)",
          }}>{b.l}</div>
        ))}
      </div>

      <div style={{
        fontFamily: "var(--font-arcade)", fontSize: 10, color: "var(--ink-dim)",
        letterSpacing: "0.15em", marginBottom: 0, position: "relative", zIndex: 2,
      }}>
        — GRACIAS POR JUGAR —
      </div>

      <button
        className="px-btn px-btn--purple"
        style={{ fontSize: 12, position: "relative", zIndex: 2, alignSelf: "center" }}
        onClick={() => go(5)}
      >
        ← VOLVER AL MAPA
      </button>

      <button
        className="px-btn px-btn--ghost"
        style={{ fontSize: 11, position: "relative", zIndex: 2, alignSelf: "center" }}
        onClick={() => {
          setState({
            groupName: "",
            badges: [false, false, false],
            b6Seen: [false, false, false, false],
            b7Done: false,
            qrFound: Array(10).fill(false),
          });
          go(1);
        }}
      >
        ⟲ NUEVA AVENTURA
      </button>
    </div>
  );
}

Object.assign(window, { Block9Finale, PixelArtUnity });
