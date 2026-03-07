import { useState, useRef } from "react";
import { predictImage } from "../services/ api";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setResult(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const data = await predictImage(selectedFile);
      setResult(data);
    } catch (error) {
      alert("Prediction failed: " + error.message);
    }
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFileChange(file);
  };

  const confidence = result?.confidence ? (result.confidence * 100).toFixed(2) : null;
  const isHigh = confidence >= 80;
  const isMed  = confidence >= 50 && confidence < 80;
  const statusColor = !confidence ? "#f59e0b" : isHigh ? "#22c55e" : isMed ? "#f59e0b" : "#ef4444";
  const statusLabel = !confidence ? null : isHigh ? "HIGH CONFIDENCE" : isMed ? "MED CONFIDENCE" : "LOW CONFIDENCE";

  return (
    <div className="db-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&display=swap');

        .db-page {
          font-family: 'Share Tech Mono', monospace;
          padding: 3.5rem 2rem 5rem;
          max-width: 1100px;
          margin: 0 auto;
          color: rgba(255,255,255,0.85);
        }

        /* ── Page header ── */
        .db-sys-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 2.5rem;
          animation: db-in 0.4s ease both;
        }
        .db-sys-badge {
          font-size: 0.58rem; letter-spacing: 0.18em; color: #f59e0b;
          padding: 0.28rem 0.7rem;
          border: 1px solid rgba(245,158,11,0.28);
          background: rgba(245,158,11,0.08);
          white-space: nowrap;
        }
        .db-sys-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(245,158,11,0.18), transparent);
        }
        .db-sys-id {
          font-size: 0.56rem; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.2); white-space: nowrap;
        }

        .db-heading {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 0.93; letter-spacing: -0.03em;
          text-transform: uppercase; color: white;
          margin-bottom: 0.5rem;
          animation: db-in 0.45s 0.05s ease both;
        }
        .db-heading span { color: #f59e0b; }

        .db-subhead {
          font-size: 0.7rem; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.25);
          margin-bottom: 3rem;
          border-left: 2px solid rgba(245,158,11,0.2);
          padding-left: 0.75rem;
          animation: db-in 0.45s 0.1s ease both;
        }

        /* ── Main grid ── */
        .db-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          animation: db-in 0.5s 0.15s ease both;
        }
        @media (max-width: 700px) { .db-grid { grid-template-columns: 1fr; } }

        /* ── Panel shared ── */
        .db-panel {
          background: #0c0e12;
          position: relative;
          overflow: hidden;
        }
        .db-panel-left::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #f59e0b, transparent);
        }

        .panel-head {
          padding: 0.65rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.015);
          display: flex; align-items: center; justify-content: space-between;
        }
        .panel-head-lbl { font-size: 0.57rem; letter-spacing: 0.17em; color: #f59e0b; text-transform: uppercase; }
        .panel-head-tag { font-size: 0.52rem; letter-spacing: 0.12em; color: rgba(255,255,255,0.2); }

        .panel-body { padding: 1.5rem 1.25rem; }

        /* Corner marks */
        .db-corner { position: absolute; width: 11px; height: 11px; pointer-events: none; }
        .db-corner-tl { top: 0; left: 0; border-top: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }
        .db-corner-br { bottom: 0; right: 0; border-bottom: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); }

        /* ── Drop zone ── */
        .db-dropzone {
          border: 1px dashed rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.015);
          height: 210px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative; overflow: hidden;
          margin-bottom: 1.25rem;
        }
        .db-dropzone:hover, .db-dropzone.drag-on {
          border-color: rgba(245,158,11,0.45);
          background: rgba(245,158,11,0.04);
          box-shadow: inset 0 0 30px rgba(245,158,11,0.04);
        }
        .db-icon-ring {
          width: 52px; height: 52px;
          border: 1px solid rgba(245,158,11,0.22);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.9rem;
          transition: all 0.25s ease;
        }
        .db-dropzone:hover .db-icon-ring, .db-dropzone.drag-on .db-icon-ring {
          border-color: rgba(245,158,11,0.65);
          box-shadow: 0 0 14px rgba(245,158,11,0.15);
        }
        .db-dropzone:hover .db-icon-ring svg,
        .db-dropzone.drag-on .db-icon-ring svg { stroke: #f59e0b; }

        .db-dz-lbl { font-size: 0.6rem; letter-spacing: 0.14em; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 0.3rem; }
        .db-dz-sub { font-size: 0.52rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.15); text-transform: uppercase; }
        .db-preview-img { width: 100%; height: 100%; object-fit: cover; }

        /* File info */
        .db-file-info {
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.6rem 0.85rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          margin-bottom: 1.25rem;
          animation: db-in 0.3s ease both;
        }
        .db-fi-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 7px #22c55e; flex-shrink: 0;
          animation: db-blink 2s ease-in-out infinite;
        }
        @keyframes db-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .db-fi-name {
          flex: 1; min-width: 0;
          font-size: 0.6rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.55);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .db-fi-size { font-size: 0.52rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); white-space: nowrap; }
        .db-fi-change {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.52rem; letter-spacing: 0.12em; color: rgba(245,158,11,0.5);
          background: none; border: none; cursor: pointer;
          text-transform: uppercase; transition: color 0.2s ease; padding: 0;
        }
        .db-fi-change:hover { color: #f59e0b; }

        /* Analyze button */
        .db-btn-analyze {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.63rem; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.85rem 0; width: 100%;
          background: #f59e0b; color: #050608; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: all 0.25s ease; position: relative; overflow: hidden;
        }
        .db-btn-analyze::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.25s ease;
        }
        .db-btn-analyze:hover:not(:disabled)::after { opacity: 1; }
        .db-btn-analyze:hover:not(:disabled) { background: #fbbf24; box-shadow: 0 0 28px rgba(245,158,11,0.4); }
        .db-btn-analyze:disabled { background: rgba(245,158,11,0.18); color: rgba(5,6,8,0.4); cursor: not-allowed; }

        /* Clear button */
        .db-btn-clear {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.65rem 0; width: 100%; margin-top: 0.75rem;
          background: transparent; color: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.08); cursor: pointer;
          transition: all 0.22s ease;
        }
        .db-btn-clear:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.03); }

        /* Spinner */
        .db-spinner {
          width: 12px; height: 12px; border-radius: 50%;
          border: 1.5px solid rgba(5,6,8,0.3);
          border-top-color: #050608;
          animation: db-spin 0.8s linear infinite;
        }
        @keyframes db-spin { to { transform: rotate(360deg); } }

        /* ── Right panel states ── */
        .db-result-empty {
          min-height: 340px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.75rem;
        }
        .db-result-empty-lbl { font-size: 0.57rem; letter-spacing: 0.16em; color: rgba(255,255,255,0.2); text-transform: uppercase; }

        .db-result-loading {
          min-height: 340px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 1rem;
        }
        .db-big-spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(245,158,11,0.15);
          border-top-color: #f59e0b;
          animation: db-spin 1s linear infinite;
        }
        .db-loading-lbl { font-size: 0.57rem; letter-spacing: 0.16em; color: rgba(255,255,255,0.25); text-transform: uppercase; }

        /* Result top accent */
        .db-result-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }

        /* Result status badge */
        .db-res-badge {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.22rem 0.55rem;
          border: 1px solid; font-size: 0.52rem; letter-spacing: 0.13em;
        }
        .db-res-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: db-blink 2s ease-in-out infinite;
        }

        /* Result rows */
        .db-res-row {
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
          transition: border-color 0.2s ease;
        }
        .db-res-row:last-child { border-bottom: none; }
        .db-res-row:hover { border-color: rgba(245,158,11,0.18); }

        .db-res-key {
          font-size: 0.55rem; letter-spacing: 0.13em;
          color: rgba(255,255,255,0.25); text-transform: uppercase; padding-top: 0.25rem; white-space: nowrap;
        }
        .db-res-val {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.25rem; letter-spacing: -0.02em;
          color: white; text-align: right; line-height: 1.1; word-break: break-word;
        }

        /* Confidence */
        .db-conf-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; }
        .db-conf-num { font-family: 'Archivo Black', sans-serif; font-size: 1.8rem; letter-spacing: -0.03em; line-height: 1; }
        .db-conf-track { width: 120px; height: 3px; background: rgba(255,255,255,0.06); }
        .db-conf-fill { height: 100%; transition: width 1.2s cubic-bezier(0.22,1,0.36,1); }

        /* Panel footer */
        .panel-foot {
          padding: 0.55rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; justify-content: space-between;
          background: rgba(255,255,255,0.01);
        }
        .panel-foot-tag { font-size: 0.51rem; letter-spacing: 0.13em; color: rgba(255,255,255,0.18); }

        @keyframes db-in { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.55); }
      `}</style>

      {/* ── Page header ── */}
      <div className="db-sys-row">
        <div className="db-sys-badge">DIAGNOSTIC MODULE · ACTIVE</div>
        <div className="db-sys-line" />
        <span className="db-sys-id">ID: PLT-DX-0049</span>
      </div>

      <h1 className="db-heading">
        Disease <span>Analysis</span>
      </h1>
      <p className="db-subhead">
        Upload a poultry image · RexNet-50 inference · Grad-CAM heatmap
      </p>

      {/* ── Main grid ── */}
      <div className="db-grid">

        {/* LEFT — Upload */}
        <div className="db-panel db-panel-left">
          <div className="db-corner db-corner-tl" />
          <div className="db-corner db-corner-br" />

          <div className="panel-head">
            <span className="panel-head-lbl">UPLOAD IMAGE</span>
            <span className="panel-head-tag">JPG · PNG · WEBP</span>
          </div>

          <div className="panel-body">
            {/* Drop zone */}
            <div
              className={`db-dropzone ${dragOver ? "drag-on" : ""}`}
              onClick={() => !preview && fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="db-preview-img" />
              ) : (
                <>
                  <div className="db-icon-ring">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,0.28)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </div>
                  <p className="db-dz-lbl">Drop image or click to browse</p>
                  <p className="db-dz-sub">Max 10 MB</p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e.target.files[0])}
            />

            {/* File info */}
            {selectedFile && (
              <div className="db-file-info">
                <div className="db-fi-dot" />
                <span className="db-fi-name">{selectedFile.name}</span>
                <span className="db-fi-size">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                <button className="db-fi-change" onClick={() => fileInputRef.current.click()}>Change</button>
              </div>
            )}

            {/* Buttons */}
            <button
              className="db-btn-analyze"
              onClick={handleUpload}
              disabled={!selectedFile || loading}
            >
              {loading
                ? <><div className="db-spinner" /> ANALYZING...</>
                : <>▶ RUN ANALYSIS</>
              }
            </button>

            {selectedFile && (
              <button
                className="db-btn-clear"
                onClick={() => { setSelectedFile(null); setPreview(null); setResult(null); }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="panel-foot">
            <span className="panel-foot-tag">MODEL · REXNET-50</span>
            <span className="panel-foot-tag">GRAD-CAM READY</span>
          </div>
        </div>

        {/* RIGHT — Result */}
        <div className="db-panel" style={{ position: "relative" }}>
          <div className="db-corner db-corner-tl" />
          <div className="db-corner db-corner-br" />

          {result && (
            <div className="db-result-topline"
              style={{ background: `linear-gradient(to right, ${statusColor}, transparent)` }}
            />
          )}

          <div className="panel-head">
            <span className="panel-head-lbl">PREDICTION RESULT</span>
            {result && statusLabel && (
              <div className="db-res-badge"
                style={{ borderColor: `${statusColor}40`, background: `${statusColor}0d`, color: statusColor }}>
                <div className="db-res-badge-dot"
                  style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
                {statusLabel}
              </div>
            )}
          </div>

          {/* Empty */}
          {!result && !loading && (
            <div className="db-result-empty">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p className="db-result-empty-lbl">Results will appear here</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="db-result-loading">
              <div className="db-big-spinner" />
              <p className="db-loading-lbl">Processing image...</p>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="panel-body">
              {result.prediction && (
                <div className="db-res-row">
                  <span className="db-res-key">Disease</span>
                  <div className="db-res-val">{result.prediction}</div>
                </div>
              )}
              {result.confidence !== undefined && (
                <div className="db-res-row">
                  <span className="db-res-key">Confidence</span>
                  <div className="db-conf-wrap">
                    <div className="db-conf-num" style={{ color: statusColor }}>{confidence}%</div>
                    <div className="db-conf-track">
                      <div className="db-conf-fill"
                        style={{ width: `${confidence}%`, background: `linear-gradient(to right, ${statusColor}70, ${statusColor})` }} />
                    </div>
                  </div>
                </div>
              )}
              {Object.entries(result)
                .filter(([k]) => k !== "prediction" && k !== "confidence")
                .map(([k, v]) => (
                  <div key={k} className="db-res-row">
                    <span className="db-res-key">{k.replace(/_/g, " ")}</span>
                    <div className="db-res-val" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>{String(v)}</div>
                  </div>
                ))
              }
            </div>
          )}

          <div className="panel-foot">
            <span className="panel-foot-tag">PLT-DX-0049</span>
            <span className="panel-foot-tag">BUILD 2401</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;