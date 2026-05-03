// app-screens.jsx — All block screens for CURSO APRENDIZAJE MÓVIL
// Each screen is a self-contained component that receives { state, go, setState }

const TOTAL_BLOCKS = 8;

// ────────────────────────────────────────────────────────────
// Shared chrome inside the iPhone screen
// ────────────────────────────────────────────────────────────
function AppTopbar({ state }) {
  return null;
}

function ProgressBar({ value, total = 8 }) {
  const cells = [];
  for (let i = 0; i < total; i++) cells.push(<div key={i} className={"pbar-cell" + (i < value ? " on" : "")} />);
  return <div className="pbar">{cells}</div>;
}

function FooterNav({ go, state, prev, next, nextLabel = "SIGUIENTE", nextDisabled = false, nextColor = "yellow" }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      padding: "16px 20px 38px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      gap: 10, zIndex: 10,
      background: "linear-gradient(to top, rgba(10,1,24,0.98) 0%, rgba(10,1,24,0.98) 60%, rgba(10,1,24,0) 100%)",
      backdropFilter: "blur(2px)",
    }}>
      {prev ? (
        <button className="px-btn px-btn--ghost" onClick={() => go(prev)}>← VOLVER</button>
      ) : <span />}
      {next ? (
        <button
          className={"px-btn px-btn--" + nextColor}
          disabled={nextDisabled}
          onClick={() => go(next)}
        >
          {nextLabel} ▸
        </button>
      ) : <span />}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 1 — Title screen (videogame style)
// ────────────────────────────────────────────────────────────
function Block1Title({ go, tweaks }) {
  return (
    <div className="screen-body screen-body--title" style={{ paddingTop: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", justifyContent: "center", minHeight: "100%" }}>
      <div className="pixel-grid" />

      {/* school crest placeholder */}
      <div className="float" style={{ marginBottom: 18, position: "relative", zIndex: 2 }}>
        {tweaks.schoolLogo ? (
          <img src={tweaks.schoolLogo} alt="Escudo del colegio" style={{
            width: 84, height: 84, objectFit: "contain",
            border: "3px solid var(--neon-yellow)",
            boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 3px var(--neon-yellow)",
            background: "#fff",
            imageRendering: "pixelated",
          }} />
        ) : (
          <div style={{
            width: 84, height: 84,
            border: "3px solid var(--neon-yellow)",
            boxShadow: "4px 4px 0 #0a0118, 4px 4px 0 3px var(--neon-yellow)",
            background: "#0a0118",
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-arcade)",
            fontSize: 28,
            color: "var(--neon-yellow)",
          }} className="glow-yellow">CD</div>
        )}
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--neon-cyan)", letterSpacing: "0.15em", marginBottom: 4, position: "relative", zIndex: 2 }}>
        I.E. {tweaks.schoolName}
      </div>

      <h1 className="h-arcade glow-purple" style={{ fontSize: 19, margin: "10px 0 4px", color: "var(--neon-purple)", position: "relative", zIndex: 2, lineHeight: 1.5 }}>
        CURSO
      </h1>
      <h1 className="h-arcade glow-orange" style={{ fontSize: 22, margin: "6px 0", color: "var(--neon-orange)", position: "relative", zIndex: 2, lineHeight: 1.5 }}>
        APRENDIZAJE
      </h1>
      <h1 className="h-arcade glow-green" style={{ fontSize: 24, margin: "6px 0 16px", color: "var(--neon-green)", position: "relative", zIndex: 2, lineHeight: 1.5 }}>
        MÓVIL
      </h1>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink)",
        background: "rgba(10,1,24,0.7)",
        border: "2px solid var(--neon-cyan)",
        padding: "10px 14px",
        margin: "8px 12px 22px",
        position: "relative", zIndex: 2,
        lineHeight: 1.2,
      }}>
        Competencias ciudadanas:<br />
        <span style={{ color: "var(--neon-yellow)" }}>discriminación · estereotipos · prejuicios</span>
      </div>

      <div style={{ fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--ink-dim)", marginBottom: 6, letterSpacing: "0.1em", position: "relative", zIndex: 2 }}>
        — DOCENTE —
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--neon-pink)", marginBottom: 28, position: "relative", zIndex: 2 }}>
        {tweaks.teacherName}
      </div>

      <button
        className="px-btn px-btn--green"
        style={{ fontSize: 14, padding: "18px 28px", position: "relative", zIndex: 2 }}
        onClick={() => go(2)}
      >
        ▶ INICIAR
      </button>

      <div className="title-blink" style={{
        marginTop: 18, fontFamily: "var(--font-arcade)", fontSize: 11,
        color: "var(--neon-cyan)", letterSpacing: "0.15em", position: "relative", zIndex: 2,
      }}>
        PRESS START
      </div>

      <div style={{ marginTop: "auto", paddingTop: 24, fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink-dim)", position: "relative", zIndex: 2 }}>
        v1.0 · 2026
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 2 — Intro / call to action
// ────────────────────────────────────────────────────────────
function Block2Intro({ go }) {
  return (
    <div className="screen-body">
            <h2 className="h-arcade glow-orange" style={{ fontSize: 21, color: "var(--neon-orange)", margin: "6px 0 18px", lineHeight: 1.5 }}>
        ¿DE QUÉ VA<br/>ESTA AVENTURA?
      </h2>

      <div className="px-card px-card--cyan" style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          Vivimos rodeados de <span className="glow-yellow" style={{ color: "var(--neon-yellow)" }}>etiquetas</span>:
          ideas que repetimos sin pensar y que pueden herir a otras personas.
        </p>
        <div className="divider-pixel" style={{ color: "var(--neon-cyan)" }} />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 21, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          En este curso vas a <span style={{ color: "var(--neon-green)" }}>observar</span>,
          <span style={{ color: "var(--neon-pink)" }}> reflexionar</span> y
          <span style={{ color: "var(--neon-orange)" }}> actuar</span> contra
          la discriminación, los <em>estereotipos</em> y los <em>prejuicios</em>.
        </p>
      </div>

      <div className="px-card px-card--yellow" style={{ marginBottom: 100 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 13, color: "var(--neon-yellow)", marginBottom: 8 }}>
          ★ TU MISIÓN
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25, margin: 0, color: "var(--ink)" }}>
          Equípate, entrena y sal de viaje por el colegio para descubrir cómo
          tus actitudes impactan a las personas que te rodean. ¿Aceptas el reto?
        </p>
      </div>

      <FooterNav go={go} prev={1} next={3} nextLabel="ACEPTO EL RETO" nextColor="orange" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 3 — Group name input
// ────────────────────────────────────────────────────────────
function Block3Group({ go, state, setState }) {
  const [val, setVal] = React.useState(state.groupName || "");
  const trimmed = val.trim();
  return (
    <div className="screen-body">
            <h2 className="h-arcade glow-green" style={{ fontSize: 20, color: "var(--neon-green)", margin: "6px 0 6px", lineHeight: 1.5 }}>
        ELIGE EL NOMBRE<br/>DE TU EQUIPO
      </h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.2, color: "var(--ink-dim)", margin: "0 0 22px" }}>
        Cada aventura necesita una tripulación. Pónganse un nombre original.
      </p>

      <div className="px-card" style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-purple)", marginBottom: 10 }}>
          NOMBRE DEL EQUIPO_
        </div>
        <input
          className="px-input"
          placeholder="LOS_VALIENTES"
          value={val}
          maxLength={20}
          onChange={(e) => setVal(e.target.value.toUpperCase())}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-dim)" }}>
          <span>{trimmed.length === 0 ? "min. 2 caracteres" : "✓ listo"}</span>
          <span>{val.length}/20</span>
        </div>
      </div>

      <div className="px-card px-card--orange">
        <div style={{ fontFamily: "var(--font-arcade)", fontSize: 12, color: "var(--neon-orange)", marginBottom: 8 }}>
          💡 SUGERENCIAS
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["LOS_DETECTIVES", "ANTI-PREJUICIOS", "OJOS_ABIERTOS", "EQUIPO_FÉNIX"].map(s => (
            <button key={s} onClick={() => setVal(s)} style={{
              fontFamily: "var(--font-mono)", fontSize: 18,
              background: "transparent", color: "var(--neon-orange)",
              border: "1px solid var(--neon-orange)",
              padding: "4px 8px", cursor: "pointer", letterSpacing: "0.04em",
            }}>{s}</button>
          ))}
        </div>
      </div>

      <FooterNav
        go={(n) => { setState(s => ({ ...s, groupName: trimmed })); go(n); }}
        prev={2} next={4}
        nextLabel="GUARDAR"
        nextDisabled={trimmed.length < 2}
        nextColor="green"
      />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 4 — Three paths explanation
// ────────────────────────────────────────────────────────────
function Block4Explanation({ go, state }) {
  const name = state.groupName || "____";
  return (
    <div className="screen-body">
            <h2 className="h-arcade glow-purple" style={{ fontSize: 20, color: "var(--neon-purple)", margin: "6px 0 16px", lineHeight: 1.5 }}>
        TRES CAMINOS<br/>POR DELANTE
      </h2>

      <div className="px-card" style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.25, margin: 0 }}>
          El grupo <span style={{ color: "var(--neon-green)", fontWeight: 700 }}>{name}</span> inicia
          una aventura de observación para comprender el impacto de nuestras
          actitudes sobre las otras personas y sobre la sociedad.
        </p>
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", margin: "0 0 12px" }}>
        A continuación encontrarás:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 100 }}>
        <PathPreview color="cyan" letter="A" title="CONTENIDO" desc="Las herramientas que necesitarás para comenzar." />
        <PathPreview color="orange" letter="B" title="ENTRENAMIENTO" desc="Practiquemos antes de salir a la aventura." />
        <PathPreview color="green" letter="C" title="VIAJE" desc="Iniciamos la aventura para superar prejuicios." />
      </div>

      <FooterNav go={go} prev={3} next={5} nextLabel="VER MAPA" nextColor="purple" />
    </div>
  );
}

function PathPreview({ color, letter, title, desc }) {
  return (
    <div className={"module-tile"} style={{ color: `var(--neon-${color})`, cursor: "default" }}>
      <div className="module-icon" style={{ color: `var(--neon-${color})` }}>{letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="h-arcade" style={{ fontSize: 14, color: `var(--neon-${color})`, letterSpacing: "0.05em" }}>{title}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", lineHeight: 1.15, marginTop: 4 }}>{desc}</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BLOQUE 5 — Hub / map (BRIDGE — branches to 6, 7, 8)
// ────────────────────────────────────────────────────────────
function Block5Hub({ go, state }) {
  const [b6, b7, b8] = state.badges || [false, false, false];
  const allDone = b6 && b7 && b8;
  return (
    <div className="screen-body">
            <h2 className="h-arcade glow-cyan" style={{ fontSize: 21, color: "var(--neon-cyan)", margin: "6px 0 6px", lineHeight: 1.5 }}>
        ELIGE TU<br/>CAMINO
      </h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", margin: "0 0 18px" }}>
        Equipo <span style={{ color: "var(--neon-green)" }}>{state.groupName || "—"}</span>, completa
        los 3 módulos para superar la misión.
      </p>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "var(--font-arcade)", fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em" }}>
          <span>PROGRESO</span>
          <span style={{ color: "var(--neon-green)" }}>{(b6?1:0)+(b7?1:0)+(b8?1:0)}/3 INSIGNIAS</span>
        </div>
        <ProgressBar value={(b6?1:0)+(b7?1:0)+(b8?1:0)} total={3} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 100 }}>
        <ModuleTile
          color="cyan" letter="A" badge="📚" title="CONTENIDO"
          subtitle="Mira y aprende"
          done={b6}
          onClick={() => go(6)}
        />
        <ModuleTile
          color="orange" letter="B" badge="🎮" title="ENTRENAMIENTO"
          subtitle="Quiz Blooket · 7 min"
          done={b7}
          onClick={() => go(7)}
        />
        <ModuleTile
          color="green" letter="C" badge="🗺" title="VIAJE"
          subtitle="QRs + Forms · en equipo"
          done={b8}
          onClick={() => go(8)}
        />
      </div>

      {allDone && (
        <div style={{
          position: "absolute", left: 20, right: 20, bottom: 86,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div className="px-card px-card--yellow" style={{ textAlign: "center", padding: 10 }}>
            <div className="h-arcade glow-yellow" style={{ fontSize: 13, color: "var(--neon-yellow)" }}>
              ★ MISIÓN COMPLETA ★
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink)", marginTop: 4 }}>
              ¡Felicitaciones, {state.groupName}!
            </div>
          </div>
          <button
            className="px-btn px-btn--green"
            style={{ width: "100%", fontSize: 13 }}
            onClick={() => go(9)}
          >
            ▶ FINALIZAR AVENTURA
          </button>
        </div>
      )}

      {!allDone && <FooterNav go={go} prev={4} />}
    </div>
  );
}

function ModuleTile({ color, letter, badge, title, subtitle, done, locked, onClick }) {
  return (
    <div
      className={"module-tile" + (done ? " done" : "") + (locked ? " locked" : "")}
      style={{ color: `var(--neon-${color})`, borderColor: done ? "var(--neon-green)" : `var(--neon-${color})` }}
      onClick={locked ? undefined : onClick}
    >
      <div className="module-icon" style={{ color: `var(--neon-${color})` }}>{letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="h-arcade" style={{ fontSize: 14, color: `var(--neon-${color})`, letterSpacing: "0.05em" }}>{title}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 19, color: "var(--ink-dim)", lineHeight: 1.15, marginTop: 4 }}>{subtitle}</div>
      </div>
      <div style={{ fontSize: 22 }}>
        {done ? <span style={{ color: "var(--neon-green)", fontFamily: "var(--font-arcade)", fontSize: 12 }}>✓</span> : <span>{badge}</span>}
      </div>
    </div>
  );
}

Object.assign(window, {
  Block1Title, Block2Intro, Block3Group, Block4Explanation, Block5Hub,
  AppTopbar, FooterNav, ProgressBar, ModuleTile,
});
