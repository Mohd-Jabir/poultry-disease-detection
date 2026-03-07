const ResultCard = ({ result }) => {
  if (!result) return null;

  const confidence = (result.confidence * 100).toFixed(2);
  const isHigh = confidence >= 80;
  const isMed  = confidence >= 50 && confidence < 80;

  const statusColor = isHigh ? "#22c55e" : isMed ? "#f59e0b" : "#ef4444";
  const statusLabel = isHigh ? "HIGH CONFIDENCE" : isMed ? "MED CONFIDENCE" : "LOW CONFIDENCE";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&display=swap');

        .result-card {
          font-family: 'Share Tech Mono', monospace;
          width: 100%;
          max-width: 480px;
          margin-top: 2rem;
          background: #0c0e12;
          border: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
          animation: rc-enter 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes rc-enter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top accent line — color reflects confidence */
        .result-card-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }

        /* Header row */
        .rc-header {
          padding: 0.7rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.015);
        }
        .rc-header-lbl {
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: #f59e0b;
          text-transform: uppercase;
        }
        .rc-status-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.2rem 0.55rem;
          border: 1px solid;
          font-size: 0.54rem;
          letter-spacing: 0.14em;
        }
        .rc-status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          animation: rc-blink 2s ease-in-out infinite;
        }
        @keyframes rc-blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.2; }
        }

        /* Body */
        .rc-body { padding: 1.5rem 1.25rem; }

        /* Each row */
        .rc-row {
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          transition: border-color 0.2s ease;
        }
        .rc-row:last-child { border-bottom: none; padding-bottom: 0; }
        .rc-row:hover { border-color: rgba(245,158,11,0.2); }

        .rc-key {
          font-size: 0.56rem;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          padding-top: 0.2rem;
          white-space: nowrap;
        }

        .rc-val {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          color: white;
          text-align: right;
          line-height: 1.1;
          word-break: break-word;
        }

        /* Confidence specific */
        .rc-conf-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; }
        .rc-conf-num {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.8rem;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .rc-conf-track {
          width: 140px; height: 3px;
          background: rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .rc-conf-fill {
          position: absolute;
          top: 0; left: 0; height: 100%;
          border-radius: 0;
          transition: width 1.2s cubic-bezier(0.22,1,0.36,1);
        }

        /* Footer row */
        .rc-footer {
          padding: 0.6rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.01);
        }
        .rc-footer-tag {
          font-size: 0.53rem;
          letter-spacing: 0.13em;
          color: rgba(255,255,255,0.2);
        }

        /* Corner marks */
        .rc-corner {
          position: absolute;
          width: 12px; height: 12px;
          pointer-events: none;
        }
        .rc-corner-br {
          bottom: 0; right: 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .rc-corner-tl {
          top: 0; left: 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-left: 1px solid rgba(255,255,255,0.12);
        }
      `}</style>

      <div className="result-card">
        {/* Top color line */}
        <div
          className="result-card-topline"
          style={{ background: `linear-gradient(to right, ${statusColor}, transparent)` }}
        />

        {/* Corner marks */}
        <div className="rc-corner rc-corner-tl" />
        <div className="rc-corner rc-corner-br" />

        {/* Header */}
        <div className="rc-header">
          <span className="rc-header-lbl">PREDICTION RESULT</span>
          <div
            className="rc-status-badge"
            style={{
              borderColor: `${statusColor}40`,
              background: `${statusColor}0d`,
              color: statusColor,
            }}
          >
            <div
              className="rc-status-dot"
              style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }}
            />
            {statusLabel}
          </div>
        </div>

        {/* Body */}
        <div className="rc-body">
          {/* Disease row */}
          <div className="rc-row">
            <span className="rc-key">Disease</span>
            <div className="rc-val">{result.prediction}</div>
          </div>

          {/* Confidence row */}
          <div className="rc-row">
            <span className="rc-key">Confidence</span>
            <div className="rc-conf-wrap">
              <div className="rc-conf-num" style={{ color: statusColor }}>
                {confidence}%
              </div>
              <div className="rc-conf-track">
                <div
                  className="rc-conf-fill"
                  style={{
                    width: `${confidence}%`,
                    background: `linear-gradient(to right, ${statusColor}80, ${statusColor})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rc-footer">
          <span className="rc-footer-tag">MODEL · REXNET-50</span>
          <span className="rc-footer-tag">PLT-DX-0049</span>
        </div>
      </div>
    </>
  );
};

export default ResultCard;