import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&family=Archivo:wght@300;400&display=swap');

        :root {
          --bg: #050608;
          --surface: #0c0e12;
          --border: rgba(255,255,255,0.08);
          --amber: #f59e0b;
          --amber-dim: rgba(245,158,11,0.1);
          --green: #22c55e;
          --cyan: #22d3ee;
          --muted: rgba(255,255,255,0.28);
          --mono: 'Share Tech Mono', monospace;
          --display: 'Archivo Black', sans-serif;
          --body: 'Archivo', sans-serif;
        }

        .home-root {
          min-height: 100vh;
          background: var(--bg);
          color: rgba(255,255,255,0.85);
          font-family: var(--mono);
          overflow-x: hidden;
          position: relative;
        }

        /* Scanlines */
        .home-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none;
          z-index: 999;
        }

        /* CRT vignette */
        .home-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%);
          pointer-events: none;
          z-index: 998;
        }

        /* Corner brackets */
        .corner { position: fixed; width: 36px; height: 36px; z-index: 50; pointer-events: none; }
        .corner-tl { top: 14px; left: 14px; border-top: 1px solid var(--amber); border-left: 1px solid var(--amber); }
        .corner-tr { top: 14px; right: 14px; border-top: 1px solid var(--amber); border-right: 1px solid var(--amber); }
        .corner-bl { bottom: 14px; left: 14px; border-bottom: 1px solid var(--amber); border-left: 1px solid var(--amber); }
        .corner-br { bottom: 14px; right: 14px; border-bottom: 1px solid var(--amber); border-right: 1px solid var(--amber); }

        /* Dot grid */
        .dot-grid {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none; z-index: 0;
        }

        /* Orbs */
        .orb {
          position: fixed; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(80px);
          animation: orb-breathe 10s ease-in-out infinite;
        }
        .orb-1 { width: 650px; height: 650px; background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%); top: -280px; right: -180px; }
        .orb-2 { width: 450px; height: 450px; background: radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%); bottom: -160px; left: -100px; animation-delay: 5s; }
        @keyframes orb-breathe {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        /* ── NAV ── */
        .nav {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { display: flex; align-items: center; gap: 0.75rem; }
        .nav-logomark {
          width: 30px; height: 30px;
          border: 1px solid var(--amber);
          display: flex; align-items: center; justify-content: center;
        }
        .nav-logomark::before {
          content: '';
          width: 12px; height: 12px;
          background: var(--amber);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
        .nav-wordmark { font-size: 0.68rem; letter-spacing: 0.22em; color: var(--amber); }
        .nav-right { display: flex; align-items: center; gap: 1.75rem; }
        .nav-ver { font-size: 0.58rem; letter-spacing: 0.14em; color: var(--muted); }
        .status-pill {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0.28rem 0.7rem;
          border: 1px solid rgba(34,197,94,0.25);
          background: rgba(34,197,94,0.05);
        }
        .status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--green); box-shadow: 0 0 7px var(--green);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .status-lbl { font-size: 0.56rem; letter-spacing: 0.14em; color: var(--green); }

        /* ── HERO ── */
        .hero {
          position: relative; z-index: 5;
          padding: 4rem 2rem 5rem;
          max-width: 1280px; margin: 0 auto;
        }
        .hero-sys-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .sys-badge {
          font-size: 0.58rem; letter-spacing: 0.18em; color: var(--amber);
          padding: 0.28rem 0.7rem;
          border: 1px solid rgba(245,158,11,0.28);
          background: var(--amber-dim);
          white-space: nowrap;
        }
        .sys-line { flex: 1; height: 1px; background: linear-gradient(to right, rgba(245,158,11,0.18), transparent); }
        .sys-id { font-size: 0.56rem; letter-spacing: 0.14em; color: var(--muted); white-space: nowrap; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 3rem; align-items: start;
        }
        @media (max-width: 880px) { .hero-grid { grid-template-columns: 1fr; } }

        .hero-eyebrow { font-size: 0.6rem; letter-spacing: 0.18em; color: var(--muted); margin-bottom: 1.5rem; }
        .hero-eyebrow em { color: var(--amber); font-style: normal; }

        .hero-h1 {
          font-family: var(--display);
          font-size: clamp(3.2rem, 7.5vw, 6rem);
          line-height: 0.93; letter-spacing: -0.03em;
          text-transform: uppercase; color: white;
          margin-bottom: 2rem;
        }
        .h1-accent { color: var(--amber); display: block; }
        .h1-ghost {
          display: block; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.18);
        }

        .hero-desc {
          font-family: var(--body); font-size: 0.8rem;
          color: var(--muted); line-height: 1.8; font-weight: 300;
          max-width: 400px; margin-bottom: 2.5rem;
          border-left: 2px solid rgba(245,158,11,0.22);
          padding-left: 1rem;
        }

        .hero-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .btn-primary-new {
          font-family: var(--mono); font-size: 0.63rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.85rem 2rem; background: var(--amber);
          color: #050608; border: none; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: all 0.25s ease;
        }
        .btn-primary-new:hover { background: #fbbf24; box-shadow: 0 0 28px rgba(245,158,11,0.45); }
        .btn-ghost {
          font-family: var(--mono); font-size: 0.63rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.85rem 2rem; background: transparent;
          color: var(--muted); border: 1px solid var(--border);
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.22); color: rgba(255,255,255,0.65); background: rgba(255,255,255,0.03); }

        /* ── METRICS PANEL ── */
        .metrics-panel {
          border: 1px solid var(--border);
          background: var(--surface);
          position: relative; overflow: hidden;
        }
        .metrics-panel::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(to right, var(--amber), transparent);
        }
        .metrics-head {
          padding: 0.7rem 1.2rem;
          border-bottom: 1px solid var(--border);
          display: flex; justify-content: space-between; align-items: center;
        }
        .metrics-lbl { font-size: 0.58rem; letter-spacing: 0.18em; color: var(--amber); }
        .metrics-tag { font-size: 0.54rem; letter-spacing: 0.12em; color: var(--muted); }
        .metric-row {
          padding: 0.9rem 1.2rem;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.2s ease;
        }
        .metric-row:last-child { border-bottom: none; }
        .metric-row:hover { background: rgba(255,255,255,0.02); }
        .metric-info { flex: 1; }
        .metric-key { font-size: 0.56rem; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 0.4rem; }
        .metric-track { width: 100%; height: 2px; background: rgba(255,255,255,0.05); }
        .metric-fill { height: 100%; opacity: 0.45; transition: width 1s ease; }
        .metric-num {
          font-family: var(--display);
          font-size: 1.55rem; letter-spacing: -0.02em; line-height: 1;
          margin-left: 1.25rem;
        }

        /* ── DIVIDER ── */
        .divider { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .divider-line { height: 1px; background: linear-gradient(to right, transparent, var(--border), transparent); }

        /* ── FEATURES ── */
        .features {
          position: relative; z-index: 5;
          padding: 4rem 2rem 5rem;
          max-width: 1280px; margin: 0 auto;
        }
        .feat-section-head {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .feat-section-tag {
          font-size: 0.58rem; letter-spacing: 0.18em; color: var(--amber);
          padding: 0.25rem 0.6rem; border: 1px solid rgba(245,158,11,0.25);
        }
        .feat-section-lbl { font-size: 0.58rem; letter-spacing: 0.18em; color: var(--muted); }
        .feat-section-rule { flex: 1; height: 1px; background: var(--border); }
        .feat-section-count { font-size: 0.56rem; letter-spacing: 0.14em; color: var(--muted); }

        .feat-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border);
        }
        @media (max-width: 768px) { .feat-grid { grid-template-columns: 1fr; } }

        .feat-card {
          background: var(--surface); padding: 2rem;
          position: relative; overflow: hidden;
          transition: background 0.25s ease; cursor: default;
        }
        .feat-card:hover { background: rgba(14,16,22,1); }
        .feat-card-bottom-line {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; opacity: 0; transition: opacity 0.3s ease;
        }
        .feat-card:hover .feat-card-bottom-line { opacity: 1; }

        .feat-bg-num {
          font-family: var(--display);
          font-size: 5rem; color: rgba(255,255,255,0.035);
          line-height: 1; position: absolute;
          top: 0.25rem; right: 0.75rem;
          letter-spacing: -0.05em; user-select: none;
        }
        .feat-sub { font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 1.25rem; }
        .feat-title {
          font-family: var(--display);
          font-size: 1.5rem; letter-spacing: -0.02em;
          color: white; text-transform: uppercase;
          line-height: 1.1; margin-bottom: 1rem;
        }
        .feat-desc { font-family: var(--body); font-size: 0.73rem; color: var(--muted); line-height: 1.7; font-weight: 300; }
        .feat-corner-mark {
          position: absolute; bottom: 1rem; right: 1rem;
          width: 14px; height: 14px;
          border-bottom: 1px solid var(--border);
          border-right: 1px solid var(--border);
          transition: border-color 0.25s ease;
        }
        .feat-card:hover .feat-corner-mark { border-color: rgba(255,255,255,0.2); }

        /* ── FOOTER ── */
        .footer {
          position: relative; z-index: 5;
          padding: 1.1rem 2rem;
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-grp { display: flex; align-items: center; gap: 1.25rem; }
        .footer-lbl { font-size: 0.56rem; letter-spacing: 0.14em; color: var(--muted); }
        .footer-sep { width: 1px; height: 10px; background: var(--border); }

        /* Entrance animations */
        .fade-in { animation: fi 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.15s; }
        .d3 { animation-delay: 0.25s; }
        .d4 { animation-delay: 0.38s; }
        @keyframes fi { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.55); }
      `}</style>

      {/* Background */}
      <div className="dot-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logomark" />
          <span className="nav-wordmark">POULTRY·AI</span>
        </div>
        <div className="nav-right">
          <span className="nav-ver">SYS·VER 2.4.1</span>
          <div className="status-pill">
            <div className="status-dot" />
            <span className="status-lbl">SYSTEM ONLINE</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-sys-row fade-in d1">
          <div className="sys-badge">DIAGNOSTIC MODULE · ACTIVE</div>
          <div className="sys-line" />
          <span className="sys-id">ID: PLT-DX-0049</span>
        </div>

        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow fade-in d1"><em>■</em> REXNET-50 · GRAD-CAM · DEEP LEARNING</p>
            <h1 className="hero-h1 fade-in d2">
              Detect.
              <span className="h1-accent">Diagnose.</span>
              <span className="h1-ghost">Protect.</span>
            </h1>
            <p className="hero-desc fade-in d3">
              Advanced deep learning system using RexNet-50 architecture and Grad-CAM
              visualization to detect poultry diseases instantly — with precision that
              protects your flock and your livelihood.
            </p>
            <div className="hero-btns fade-in d4">
              <Link to="../pages/ModelInfo.jsx" className="btn-primary-new">▶ RUN ANALYSIS</Link>
              <Link to="/history" className="btn-ghost">VIEW HISTORY</Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="metrics-panel fade-in d3">
            <div className="metrics-head">
              <span className="metrics-lbl">PERFORMANCE METRICS</span>
              <span className="metrics-tag">LIVE DATA</span>
            </div>
            {[
              { key: 'MODEL ACCURACY',     val: '97.4%', color: '#f59e0b', bar: 97 },
              { key: 'AVG INFERENCE TIME', val: '1.2s',  color: '#22d3ee', bar: 40 },
              { key: 'DISEASES DETECTED',  val: '3+',   color: '#f472b6', bar: 75 },
              { key: 'IMAGES ANALYZED',    val: '50K+',  color: '#4ade80', bar: 85 },
            ].map((m, i) => (
              <div key={i} className="metric-row">
                <div className="metric-info">
                  <div className="metric-key">{m.key}</div>
                  <div className="metric-track">
                    <div className="metric-fill" style={{ width: `${m.bar}%`, background: m.color }} />
                  </div>
                </div>
                <div className="metric-num" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider"><div className="divider-line" /></div>

      {/* FEATURES */}
      <section className="features">
        <div className="feat-section-head">
          <div className="feat-section-tag">§ 01</div>
          <span className="feat-section-lbl">CORE CAPABILITIES</span>
          <div className="feat-section-rule" />
          <span className="feat-section-count">3 MODULES</span>
        </div>

        <div className="feat-grid">
          {[
            { num:'01', sub:'RexNet-50 Architecture', subColor:'#f59e0b', title:'Deep Learning',  lineColor:'#f59e0b', desc:'Trained on extensive poultry disease datasets, our model identifies subtle visual patterns invisible to the human eye.' },
            { num:'02', sub:'Visual Explainability',  subColor:'#22d3ee', title:'Grad-CAM',       lineColor:'#22d3ee', desc:'Gradient-weighted Class Activation Mapping generates precise heatmaps — pinpointing exactly where infection is detected.' },
            { num:'03', sub:'Cloud Inference',        subColor:'#f472b6', title:'Real-Time API',  lineColor:'#f472b6', desc:'Sub-second predictions powered by scalable cloud deployment. Upload an image, get results instantly.' },
          ].map((f, i) => (
            <div key={i} className="feat-card">
              <span className="feat-bg-num">{f.num}</span>
              <div className="feat-sub" style={{ color: f.subColor }}>{f.sub}</div>
              <div className="feat-title">{f.title}</div>
              <p className="feat-desc">{f.desc}</p>
              <div className="feat-card-bottom-line" style={{ background: f.lineColor }} />
              <div className="feat-corner-mark" />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grp">
          <span className="footer-lbl">© 2025 POULTRY·AI SYSTEMS</span>
          <div className="footer-sep" />
          <span className="footer-lbl">POWERED BY REXNET-50</span>
        </div>
        <span className="footer-lbl">PLT-DX · BUILD 2401</span>
      </footer>
    </div>
  );
}