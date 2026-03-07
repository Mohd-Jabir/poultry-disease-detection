export default function History() {
  const dummyData = [
    { id: 1, disease: "Coccidiosis",       date: "2026-03-01", confidence: 0.94, status: "high" },
    { id: 2, disease: "Newcastle Disease", date: "2026-03-02", confidence: 0.71, status: "med"  },
  ];

  const statusColor = (s) =>
    s === "high" ? "#22c55e" : s === "med" ? "#f59e0b" : "#ef4444";

  return (
    <div className="hist-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&display=swap');

        .hist-page {
          font-family: 'Share Tech Mono', monospace;
          min-height: 100vh;
          background: #050608;
          color: rgba(255,255,255,0.85);
          padding: 3.5rem 2rem 5rem;
        }

        .hist-inner { max-width: 960px; margin: 0 auto; }

        /* System row */
        .hist-sys-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 2.5rem;
          animation: hfi 0.4s ease both;
        }
        .hist-sys-badge {
          font-size: 0.58rem; letter-spacing: 0.18em; color: #f59e0b;
          padding: 0.28rem 0.7rem;
          border: 1px solid rgba(245,158,11,0.28);
          background: rgba(245,158,11,0.08);
          white-space: nowrap;
        }
        .hist-sys-line { flex: 1; height: 1px; background: linear-gradient(to right, rgba(245,158,11,0.18), transparent); }
        .hist-sys-id { font-size: 0.56rem; letter-spacing: 0.14em; color: rgba(255,255,255,0.2); }

        /* Heading */
        .hist-heading {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 0.93; letter-spacing: -0.03em;
          text-transform: uppercase; color: white;
          margin-bottom: 0.5rem;
          animation: hfi 0.45s 0.05s ease both;
        }
        .hist-heading span { color: #f59e0b; }
        .hist-subhead {
          font-size: 0.7rem; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.25);
          margin-bottom: 3rem;
          border-left: 2px solid rgba(245,158,11,0.2);
          padding-left: 0.75rem;
          animation: hfi 0.45s 0.1s ease both;
        }

        /* Table container */
        .hist-table-wrap {
          border: 1px solid rgba(255,255,255,0.08);
          background: #0c0e12;
          position: relative;
          overflow: hidden;
          animation: hfi 0.5s 0.15s ease both;
        }

        /* Amber top line */
        .hist-table-wrap::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #f59e0b, transparent);
        }

        /* Corner marks */
        .h-corner { position: absolute; width: 12px; height: 12px; pointer-events: none; }
        .h-corner-tl { top: 0; left: 0; border-top: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }
        .h-corner-br { bottom: 0; right: 0; border-bottom: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); }

        /* Table header */
        .hist-thead-row {
          display: grid;
          grid-template-columns: 80px 1fr 160px 140px 120px;
          padding: 0.65rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.015);
        }
        @media (max-width: 640px) {
          .hist-thead-row { grid-template-columns: 50px 1fr 120px; }
          .hide-sm { display: none; }
        }
        .th {
          font-size: 0.55rem; letter-spacing: 0.16em;
          color: rgba(255,255,255,0.28); text-transform: uppercase;
        }

        /* Table rows */
        .hist-row {
          display: grid;
          grid-template-columns: 80px 1fr 160px 140px 120px;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
          transition: background 0.2s ease, border-color 0.2s ease;
          animation: row-in 0.4s ease both;
        }
        @media (max-width: 640px) {
          .hist-row { grid-template-columns: 50px 1fr 120px; }
        }
        .hist-row:last-child { border-bottom: none; }
        .hist-row:hover {
          background: rgba(255,255,255,0.02);
          border-color: rgba(245,158,11,0.15);
        }

        /* ID cell */
        .cell-id {
          font-size: 0.6rem; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.22);
        }

        /* Disease cell */
        .cell-disease {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.95rem; letter-spacing: -0.01em;
          color: white; line-height: 1.1;
        }

        /* Date cell */
        .cell-date {
          font-size: 0.6rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
        }

        /* Confidence cell */
        .cell-conf-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
        .cell-conf-num {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.95rem; letter-spacing: -0.01em; line-height: 1;
        }
        .cell-conf-track { width: 80px; height: 2px; background: rgba(255,255,255,0.06); }
        .cell-conf-fill { height: 100%; transition: width 1s ease; }

        /* Status badge */
        .cell-status {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.22rem 0.55rem;
          border: 1px solid; font-size: 0.52rem; letter-spacing: 0.13em;
          width: fit-content;
        }
        .cell-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: sdot 2s ease-in-out infinite;
        }
        @keyframes sdot { 0%,100%{opacity:1} 50%{opacity:0.2} }

        /* Table footer */
        .hist-table-footer {
          padding: 0.55rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255,255,255,0.01);
        }
        .hist-table-footer-tag { font-size: 0.52rem; letter-spacing: 0.13em; color: rgba(255,255,255,0.18); }
        .hist-record-count {
          font-size: 0.52rem; letter-spacing: 0.13em;
          color: rgba(245,158,11,0.5);
        }

        /* Empty state */
        .hist-empty {
          padding: 4rem 1.25rem;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.75rem;
        }
        .hist-empty-icon { opacity: 0.1; }
        .hist-empty-lbl { font-size: 0.57rem; letter-spacing: 0.16em; color: rgba(255,255,255,0.25); text-transform: uppercase; }

        @keyframes hfi  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes row-in { from { opacity:0; } to { opacity:1; } }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.55); }
      `}</style>

      <div className="hist-inner">
        {/* System row */}
        <div className="hist-sys-row">
          <div className="hist-sys-badge">HISTORY MODULE · ACTIVE</div>
          <div className="hist-sys-line" />
          <span className="hist-sys-id">ID: PLT-HX-0049</span>
        </div>

        {/* Heading */}
        <h1 className="hist-heading">
          Prediction <span>History</span>
        </h1>
        <p className="hist-subhead">
          Past diagnoses · RexNet-50 · Sorted by date
        </p>

        {/* Table */}
        <div className="hist-table-wrap">
          <div className="h-corner h-corner-tl" />
          <div className="h-corner h-corner-br" />

          {/* Head */}
          <div className="hist-thead-row">
            <span className="th">ID</span>
            <span className="th">Disease</span>
            <span className="th hide-sm">Date</span>
            <span className="th hide-sm">Confidence</span>
            <span className="th">Status</span>
          </div>

          {/* Rows */}
          {dummyData.length === 0 ? (
            <div className="hist-empty">
              <div className="hist-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <p className="hist-empty-lbl">No predictions yet</p>
            </div>
          ) : (
            dummyData.map((item, i) => {
              const col = statusColor(item.status);
              const pct = item.confidence ? (item.confidence * 100).toFixed(1) : null;
              return (
                <div key={item.id} className="hist-row" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
                  {/* ID */}
                  <span className="cell-id">#{String(item.id).padStart(3, "0")}</span>

                  {/* Disease */}
                  <span className="cell-disease">{item.disease}</span>

                  {/* Date */}
                  <span className="cell-date hide-sm">{item.date}</span>

                  {/* Confidence */}
                  <div className="cell-conf-wrap hide-sm">
                    {pct ? (
                      <>
                        <span className="cell-conf-num" style={{ color: col }}>{pct}%</span>
                        <div className="cell-conf-track">
                          <div className="cell-conf-fill" style={{ width: `${pct}%`, background: `linear-gradient(to right, ${col}60, ${col})` }} />
                        </div>
                      </>
                    ) : (
                      <span className="cell-date">—</span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="cell-status" style={{ borderColor: `${col}40`, background: `${col}0d`, color: col }}>
                    <div className="cell-status-dot" style={{ background: col, boxShadow: `0 0 5px ${col}` }} />
                    {item.status.toUpperCase()}
                  </div>
                </div>
              );
            })
          )}

          {/* Footer */}
          <div className="hist-table-footer">
            <span className="hist-table-footer-tag">MODEL · REXNET-50</span>
            <span className="hist-record-count">{dummyData.length} RECORD{dummyData.length !== 1 ? "S" : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}