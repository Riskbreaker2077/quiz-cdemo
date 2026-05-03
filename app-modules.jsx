// app-modules.jsx — Bloques 6, 7, 8 (módulos) + sistema de insignias

// ────────────────────────────────────────────────────────────
// Reusable: BadgeAward — overlay celebración al completar módulo
// ────────────────────────────────────────────────────────────
function BadgeAward({ shown, color = "yellow", letter, title, subtitle, onClose }) {
  if (!shown) return null;
  const confetti = [];
  const colors = ["#a855f7","#ff6b35","#39ff14","#ffd60a","#22d3ee","#ec4899"];
  for (let i = 0; i < 22; i++) {
    confetti.push(
      <div key={i} className="confetti" style={{
        left: `${Math.random()*100}%`,
        top: -20,
        background: colors[i % colors.length],
        animationDelay: `${Math.random()*0.6}s`,
        transform: `rotate(${Math.random()*360}deg)`,
      }} />
    );
  }
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      background: "rgba(5,0,16,0.92)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 24, textAlign: "center",
    }}>
      {confetti}
      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", letterSpacing: "0.2em", marginBottom: 12 }}>
        ▸ INSIGNIA DESBLOQUEADA
      </div>
      <div className="badge pop-in" style={{ width: 160, height: 160, marginBottom: 18 }}>
        <div className="badge-core glow-pulse" style={{
          width: 140, height: 140, fontSize: 36,
          background: `linear-gradient(135deg, var(--neon-${color}), var(--neon-orange))`,
          color: "#0a0118",
        }}>{letter}</div>
      </div>
      <div className={`h-arcade glow-${color}`} style={{ fontSize: 16, color: `var(--neon-${color})`, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)", marginBottom: 24, lineHeight: 1.2, maxWidth: 280 }}>
        {subtitle}
      </div>
      <button className={`px-btn px-btn--${color}`} onClick={onClose}>
        AL MAPA ▸
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 6 — CONTENIDO (presentación + 3 videos)
// ────────────────────────────────────────────────────────────
function Block6Content({ go, state, setState }) {
  const [tab, setTab] = React.useState(0); // 0 canva, 1-3 videos
  const [seen, setSeen] = React.useState(state.b6Seen || [false, false, false, false]);
  const allSeen = seen.every(Boolean);
  const [showBadge, setShowBadge] = React.useState(false);

  const markSeen = (idx) => {
    setSeen(prev => {
      const n = [...prev]; n[idx] = true;
      setState(s => ({ ...s, b6Seen: n }));
      return n;
    });
  };

  const tabs = [
    { label: "PRESENTACIÓN", color: "cyan" },
    { label: "VIDEO 1", color: "purple" },
    { label: "VIDEO 2", color: "orange" },
    { label: "VIDEO 3", color: "pink" },
  ];

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[0] = true;
      return { ...s, badges: b };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 130 }}>
            <h2 className="h-arcade glow-cyan" style={{ fontSize: 20, color: "var(--neon-cyan)", margin: "6px 0 10px", lineHeight: 1.5 }}>
        HERRAMIENTAS<br/>PARA OBSERVAR
      </h2>

      <div className="px-card px-card--cyan" style={{ marginBottom: 14, padding: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, lineHeight: 1.2, margin: 0 }}>
          Hoy exploraremos cómo los <span style={{ color: "var(--neon-yellow)" }}>prejuicios</span> y
          <span style={{ color: "var(--neon-orange)" }}> estereotipos</span> influyen en la vida
          cotidiana y afectan la convivencia ciudadana.
        </p>
      </div>

      {/* Instrucciones */}
      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Observa la presentación y los <strong>3 videos</strong>.</li>
        <li>Registra en tu cuaderno las <em>ideas principales</em> y ejemplos.</li>
        <li>Identifica un caso de prejuicio o estereotipo en tu entorno.</li>
      </ol>

      {/* Tab strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            flex: "0 0 auto",
            fontFamily: "var(--font-arcade)", fontSize: 11,
            padding: "8px 10px",
            background: tab === i ? `var(--neon-${t.color})` : "transparent",
            color: tab === i ? "#0a0118" : `var(--neon-${t.color})`,
            border: `2px solid var(--neon-${t.color})`,
            cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap",
            position: "relative",
          }}>
            {seen[i] && <span style={{ position: "absolute", top: -6, right: -6, background: "var(--neon-green)", color: "#0a0118", width: 14, height: 14, fontSize: 9, display: "grid", placeItems: "center", border: "1px solid #0a0118" }}>✓</span>}
            {t.label}
          </button>
        ))}
      </div>

      {/* Embed area */}
      <div style={{ marginBottom: 12 }}>
        {tab === 0 && (
          <>
            <div style={{
              position: "relative", width: "100%", height: 0,
              paddingTop: "56.25%",
              border: "2px solid var(--neon-cyan)",
              boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 2px var(--neon-cyan)",
              overflow: "hidden", background: "#000",
            }}>
              <iframe
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, padding: 0, margin: 0 }}
                src="https://www.canva.com/design/DAHIDmqyGgM/voBnHKwuGLNnJDwGkApdQA/view?embed"
                title="Recurso Digital Gamificado: Prejuicios y Estereotipos"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <a
              href="https://www.canva.com/design/DAHIDmqyGgM/voBnHKwuGLNnJDwGkApdQA/view?utm_content=DAHIDmqyGgM&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-block", marginTop: 10,
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-cyan)",
                textDecoration: "underline", lineHeight: 1.2,
              }}
            >↗ Abrir presentación en Canva — de Coromoto Velasco</a>
          </>
        )}
        {tab === 1 && (<YTEmbed id="qI21esgca00" />)}
        {tab === 2 && (<YTEmbed id="nlTtRDtD_TI" />)}
        {tab === 3 && (<YTEmbed id="nfxan9p8sDI" />)}

        {/* Mark-as-seen control */}
        <button
          className={`px-btn ${seen[tab] ? "px-btn--green" : "px-btn--cyan"}`}
          style={{ width: "100%", marginTop: 12, fontSize: 12 }}
          onClick={() => {
            if (seen[tab]) {
              // toggle off
              setSeen(prev => {
                const n = [...prev]; n[tab] = false;
                setState(s => ({ ...s, b6Seen: n }));
                return n;
              });
            } else {
              markSeen(tab);
            }
          }}
        >
          {seen[tab] ? "✓ MARCADO COMO VISTO" : "MARCAR COMO VISTO"}
        </button>
      </div>

      {/* progress within module */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <ProgressBar value={seen.filter(Boolean).length} total={4} />
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)", whiteSpace: "nowrap" }}>
          {seen.filter(Boolean).length}/4
        </div>
      </div>

      <div className="px-card px-card--yellow" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-yellow)", marginBottom: 6 }}>
          ✎ TAREA EN CUADERNO
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          Escribe un caso de prejuicio o estereotipo que hayas notado en el colegio o en tu barrio.
        </p>
      </div>

      <button
        className={"px-btn px-btn--green"}
        disabled={!allSeen}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {allSeen ? "★ RECLAMAR INSIGNIA ★" : `Mira los 4 recursos (${seen.filter(Boolean).length}/4)`}
      </button>

      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="cyan"
        letter="A"
        title="MAESTRO DEL CONTENIDO"
        subtitle="Has revisado todas las herramientas. ¡Listo para entrenar!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

function YTEmbed({ id }) {
  return (
    <div className="embed-wrap">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={`YouTube video ${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 7 — ENTRENAMIENTO (Blooket)
// ────────────────────────────────────────────────────────────
function Block7Training({ go, state, setState }) {
  const [showBadge, setShowBadge] = React.useState(false);
  const [completed, setCompleted] = React.useState(state.b7Done || false);
  const [timer, setTimer] = React.useState(7 * 60);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running || timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timer]);

  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  const award = () => {
    setCompleted(true);
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[1] = true;
      return { ...s, badges: b, b7Done: true };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 110 }}>
            <h2 className="h-arcade glow-orange" style={{ fontSize: 21, color: "var(--neon-orange)", margin: "6px 0 12px", lineHeight: 1.5 }}>
        QUIZ RELÁMPAGO
      </h2>

      <div className="px-card px-card--orange" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, margin: 0, lineHeight: 1.2 }}>
          Pon a prueba lo que aprendiste con un <span style={{ color: "var(--neon-yellow)" }}>reto rápido</span>.
        </p>
      </div>

      <button
        className="px-btn px-btn--ghost"
        style={{ width: "100%", marginBottom: 14, fontSize: 12 }}
        onClick={() => go(5)}
      >
        ← REGRESAR AL MAPA
      </button>

      {/* Timer arcade */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#0a0118", border: "2px solid var(--neon-yellow)",
        boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 2px var(--neon-yellow)",
        padding: "10px 14px", marginBottom: 14,
      }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--ink-dim)", letterSpacing: "0.08em" }}>
          ⏱ TIEMPO LÍMITE
        </div>
        <div className="h-mono glow-yellow" style={{ fontSize: 38, color: "var(--neon-yellow)", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
          {mm}:{ss}
        </div>
      </div>

      <button
        className={`px-btn ${running ? "px-btn--purple" : "px-btn--green"}`}
        style={{ width: "100%", marginBottom: 14, fontSize: 10 }}
        onClick={() => setRunning(r => !r)}
        disabled={timer === 0}
      >
        {timer === 0 ? "⏰ TIEMPO!" : running ? "⏸ PAUSAR" : "▶ INICIAR CRONÓMETRO"}
      </button>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "10px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 18 }}>
        <li>Ingresa a <span className="kbd">play.blooket.com</span></li>
        <li>Digita el <strong>ID del quizz</strong> que te dará la docente.</li>
        <li>Regístrate con el nombre de tu equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
        <li>Tiempo límite: <strong>7 minutos</strong>.</li>
      </ol>

      <a
        href="https://play.blooket.com"
        target="_blank"
        rel="noopener"
        className="px-btn px-btn--orange"
        style={{ width: "100%", marginBottom: 12, textDecoration: "none", fontSize: 10 }}
      >
        ↗ ABRIR PLAY.BLOOKET.COM
      </a>

      <div className="px-card" style={{ marginBottom: 12, padding: 12 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-purple)", marginBottom: 6, letterSpacing: "0.08em" }}>
          EQUIPO REGISTRADO
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--neon-green)", letterSpacing: "0.04em" }}>
          {state.groupName || "____"}
        </div>
      </div>

      <button
        className="px-btn px-btn--green"
        disabled={completed}
        style={{ width: "100%", fontSize: 13 }}
        onClick={award}
      >
        {completed ? "★ INSIGNIA OBTENIDA ★" : "✓ TERMINÉ EL QUIZ"}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="orange"
        letter="B"
        title="ENTRENADO EN COMBATE"
        subtitle="Completaste el quiz. ¡Listo para el viaje real!"
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 8 — VIAJE (QR hunt + Forms)
// ────────────────────────────────────────────────────────────
function Block8Journey({ go, state, setState }) {
  const [found, setFound] = React.useState(state.qrFound || Array(10).fill(false));
  const [showBadge, setShowBadge] = React.useState(false);
  const completed = found.filter(Boolean).length;

  const toggle = (i) => {
    setFound(prev => {
      const n = [...prev]; n[i] = !n[i];
      setState(s => ({ ...s, qrFound: n }));
      return n;
    });
  };

  const award = () => {
    setState(s => {
      const b = [...(s.badges || [false,false,false])]; b[2] = true;
      return { ...s, badges: b };
    });
    setShowBadge(true);
  };

  return (
    <div className="screen-body" style={{ paddingBottom: 110 }}>
            <h2 className="h-arcade glow-green" style={{ fontSize: 21, color: "var(--neon-green)", margin: "6px 0 12px", lineHeight: 1.5 }}>
        BÚSQUEDA<br/>DEL TESORO
      </h2>

      <div className="px-card px-card--green" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, margin: 0, lineHeight: 1.2 }}>
          Es el desafío central: combina <span style={{ color: "var(--neon-yellow)" }}>exploración física</span> en
          el colegio con <span style={{ color: "var(--neon-cyan)" }}>trabajo digital</span> en equipo.
        </p>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "4px 0 8px", letterSpacing: "0.08em" }}>
        ★ KIT DE VIAJE
      </div>
      <div className="px-card" style={{ marginBottom: 14, padding: 12 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 18, margin: 0, lineHeight: 1.2 }}>
          Necesitan <strong style={{ color: "var(--neon-pink)" }}>dos dispositivos</strong>:
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <div style={{ flex: 1, padding: 10, border: "2px dashed var(--neon-cyan)", textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>📷</div>
            <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-cyan)", marginTop: 6 }}>QR + VIDEO</div>
          </div>
          <div style={{ flex: 1, padding: 10, border: "2px dashed var(--neon-pink)", textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>📝</div>
            <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--neon-pink)", marginTop: 6 }}>FORMS</div>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-yellow)", margin: "4px 0 8px", letterSpacing: "0.08em" }}>
        ★ INSTRUCCIONES
      </div>
      <ol className="steps" style={{ marginBottom: 16 }}>
        <li>Recorre el colegio y busca los <strong>10 códigos QR</strong> escondidos.</li>
        <li>Cada QR te lleva a un video numerado (1–10).</li>
        <li>Cada video corresponde a una sección del cuestionario.</li>
        <li>Cada sección tiene <strong>4 preguntas</strong>.</li>
        <li>Responde con el nombre del equipo: <span style={{ color: "var(--neon-green)" }}>{state.groupName || "____"}</span></li>
      </ol>

      {/* QR tracker grid */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-cyan)", letterSpacing: "0.08em" }}>
            QRs ENCONTRADOS
          </div>
          <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-green)" }}>
            {completed}/10
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
          {found.map((f, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              aspectRatio: "1/1",
              background: f ? "var(--neon-green)" : "#0a0118",
              border: `2px solid var(--neon-${f ? "green" : "purple"})`,
              color: f ? "#0a0118" : "var(--neon-purple)",
              fontFamily: "var(--font-arcade)", fontSize: 14,
              cursor: "pointer", display: "grid", placeItems: "center",
              boxShadow: f ? `0 0 8px var(--neon-green)` : "none",
            }}>
              {f ? "✓" : i + 1}
            </button>
          ))}
        </div>
        <ProgressBar value={completed} total={10} />
      </div>

      <a
        href="https://forms.gle/fsiSEKEfxNknLv667"
        target="_blank"
        rel="noopener"
        className="px-btn px-btn--cyan"
        style={{ width: "100%", marginBottom: 12, textDecoration: "none", fontSize: 10 }}
      >
        ↗ ABRIR CUESTIONARIO
      </a>

      <button
        className="px-btn px-btn--green"
        disabled={completed < 10}
        style={{ width: "100%", fontSize: 11 }}
        onClick={award}
      >
        {completed === 10 ? "★ COMPLETAR MISIÓN ★" : `Encuentra los 10 QRs (${completed}/10)`}
      </button>

      <div style={{ marginTop: 12 }}>
        <button className="px-btn px-btn--ghost" onClick={() => go(5)}>← MAPA</button>
      </div>

      <BadgeAward
        shown={showBadge}
        color="green"
        letter="C"
        title="EXPLORADOR LEGENDARIO"
        subtitle={`¡${state.groupName || "Equipo"} completó la aventura!`}
        onClose={() => { setShowBadge(false); go(5); }}
      />
    </div>
  );
}

Object.assign(window, {
  Block6Content, Block7Training, Block8Journey, BadgeAward, YTEmbed,
});
