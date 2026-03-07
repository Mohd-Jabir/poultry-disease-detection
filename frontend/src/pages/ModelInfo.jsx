import { useState, useRef } from "react";
import axios from "axios";

export default function Model() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const API_URL = "https://mohdshahnawazalam-poultrydiseasedetection2.hf.space/predict";

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleUpload = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    try {
      setLoading(true);
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const confidence = result?.confidence ? (result.confidence * 100).toFixed(2) : null;
  const isHigh = confidence >= 80;
  const isMed  = confidence >= 50 && confidence < 80;
  const statusColor = !confidence ? "#f59e0b" : isHigh ? "#22c55e" : isMed ? "#f59e0b" : "#ef4444";
  const statusLabel = !confidence ? null : isHigh ? "HIGH CONFIDENCE" : isMed ? "MED CONFIDENCE" : "LOW CONFIDENCE";

  return (
    <div className="model-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&display=swap');

        .model-page {
          font-family: 'Share Tech Mono', monospace;
          min-height: 100vh;
          background: #050608;
          color: rgba(255,255,255,0.85);
          padding: 3.5rem 2rem 5rem;
        }

        .model-inner {
          max-width: 960px;
          margin: 0 auto;
        }

        /* ── Page header ── */
        .model-sys-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 2.5rem;
          animation: m-fadein 0.4s ease both;
        }
        .model-sys-badge {
          font-size: 0.58rem; letter-spacing: 0.18em; color: #f59e0b;
          padding: 0.28rem 0.7rem;
          border: 1px solid rgba(245,158,11,0.28);
          background: rgba(245,158,11,0.08);
          white-space: nowrap;
        }
        .model-sys-line { flex: 1; height: 1px; background: linear-gradient(to right, rgba(245,158,11,0.18), transparent); }
        .model-sys-id { font-size: 0.56rem; letter-spacing: 0.14em; color: rgba(255,255,255,0.2); white-space: nowrap; }

        .model-heading {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 0.93; letter-spacing: -0.03em;
          text-transform: uppercase; color: white;
          margin-bottom: 0.5rem;
          animation: m-fadein 0.5s 0.05s ease both;
        }
        .model-heading span { color: #f59e0b; }
        .model-subhead {
          font-size: 0.7rem; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.25);
          margin-bottom: 3rem;
          border-left: 2px solid rgba(245,158,11,0.2);
          padding-left: 0.75rem;
          animation: m-fadein 0.5s 0.1s ease both;
        }

        /* ── Two-col grid ── */
        .model-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          animation: m-fadein 0.5s 0.15s ease both;
        }
        @media (max-width: 700px) { .model-grid { grid-template-columns: 1fr; } }

        /* ── Panel shared ── */
        .model-panel {
          background: #0c0e12;
          position: relative;
          overflow: hidden;
        }
        .panel-header {
          padding: 0.65rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.015);
          display: flex; align-items: center; justify-content: space-between;
        }
        .panel-lbl { font-size: 0.57rem; letter-spacing: 0.17em; color: #f59e0b; text-transform: uppercase; }
        .panel-tag { font-size: 0.52rem; letter-spacing: 0.12em; color: rgba(255,255,255,0.2); }
        .panel-body { padding: 1.5rem 1.25rem; }

        /* Amber top line on left panel */
        .model-panel-left::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #f59e0b, transparent);
        }

        /* ── Drop zone ── */
        .drop-zone {
          border: 1px dashed rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.015);
          height: 220px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative; overflow: hidden;
          margin-bottom: 1.25rem;
        }
        .drop-zone:hover, .drop-zone.drag-on {
          border-color: rgba(245,158,11,0.45);
          background: rgba(245,158,11,0.04);
          box-shadow: inset 0 0 30px rgba(245,158,11,0.04);
        }
        .dz-icon-ring {
          width: 52px; height: 52px;
          border: 1px solid rgba(245,158,11,0.22);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.9rem;
          transition: all 0.25s ease;
        }
        .drop-zone:hover .dz-icon-ring, .drop-zone.drag-on .dz-icon-ring {
          border-color: rgba(245,158,11,0.65);
          box-shadow: 0 0 14px rgba(245,158,11,0.15);
        }
        .drop-zone:hover .dz-icon-ring svg, .drop-zone.drag-on .dz-icon-ring svg { stroke: #f59e0b; }
        .dz-lbl { font-size: 0.6rem; letter-spacing: 0.14em; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 0.3rem; }
        .dz-sub  { font-size: 0.52rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.15); text-transform: uppercase; }
        .dz-preview { width: 100%; height: 100%; object-fit: cover; }

        /* File info */
        .file-info {
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.6rem 0.85rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          margin-bottom: 1.25rem;
          animation: m-fadein 0.3s ease both;
        }
        .fi-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 7px #22c55e; flex-shrink: 0;
          animation: fi-blink 2s ease-in-out infinite;
        }
        @keyframes fi-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .fi-name { flex: 1; min-width: 0; font-size: 0.6rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fi-size { font-size: 0.52rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); white-space: nowrap; }
        .fi-clear { font-family: 'Share Tech Mono', monospace; font-size: 0.52rem; letter-spacing: 0.12em; color: rgba(255,255,255,0.22); background: none; border: none; cursor: pointer; text-transform: uppercase; transition: color 0.2s ease; padding: 0; }
        .fi-clear:hover { color: rgba(245,158,11,0.7); }

        /* Analyze button */
        .btn-analyze {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.63rem; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.85rem 0; width: 100%;
          background: #f59e0b; color: #050608; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: all 0.25s ease; position: relative; overflow: hidden;
        }
        .btn-analyze::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.25s ease;
        }
        .btn-analyze:hover:not(:disabled)::after { opacity: 1; }
        .btn-analyze:hover:not(:disabled) { background: #fbbf24; box-shadow: 0 0 28px rgba(245,158,11,0.4); }
        .btn-analyze:disabled { background: rgba(245,158,11,0.18); color: rgba(5,6,8,0.4); cursor: not-allowed; }

        /* Loading spinner */
        .btn-spinner {
          width: 12px; height: 12px; border-radius: 50%;
          border: 1.5px solid rgba(5,6,8,0.3);
          border-top-color: #050608;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Right panel: result ── */
        .result-empty {
          height: 100%;
          min-height: 340px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.75rem;
        }
        .result-empty-icon { opacity: 0.12; }
        .result-empty-lbl { font-size: 0.57rem; letter-spacing: 0.16em; color: rgba(255,255,255,0.25); text-transform: uppercase; }

        /* Result top line */
        .result-panel-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }

        /* Result rows */
        .res-row {
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
          transition: border-color 0.2s ease;
        }
        .res-row:last-child { border-bottom: none; }
        .res-row:hover { border-color: rgba(245,158,11,0.18); }
        .res-key { font-size: 0.55rem; letter-spacing: 0.13em; color: rgba(255,255,255,0.25); text-transform: uppercase; padding-top: 0.3rem; white-space: nowrap; }
        .res-val { font-family: 'Archivo Black', sans-serif; font-size: 1.4rem; letter-spacing: -0.02em; color: white; text-align: right; line-height: 1.1; word-break: break-word; }

        /* Confidence block */
        .res-conf-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 0.45rem; }
        .res-conf-num { font-family: 'Archivo Black', sans-serif; font-size: 2rem; letter-spacing: -0.03em; line-height: 1; }
        .res-conf-track { width: 130px; height: 3px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .res-conf-fill { height: 100%; transition: width 1.2s cubic-bezier(0.22,1,0.36,1); }

        /* Status badge in result header */
        .res-status {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.22rem 0.55rem;
          border: 1px solid; font-size: 0.52rem; letter-spacing: 0.13em;
        }
        .res-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: fi-blink 2s ease-in-out infinite;
        }

        /* Raw JSON fallback */
        .res-raw {
          font-size: 0.65rem; color: rgba(255,255,255,0.45);
          line-height: 1.8; font-weight: 300;
          white-space: pre-wrap; word-break: break-all;
        }

        /* Panel footer */
        .panel-footer {
          padding: 0.55rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; justify-content: space-between;
          background: rgba(255,255,255,0.01);
        }
        .panel-footer-tag { font-size: 0.51rem; letter-spacing: 0.13em; color: rgba(255,255,255,0.18); }

        /* Corner marks */
        .p-corner { position: absolute; width: 11px; height: 11px; pointer-events: none; }
        .p-corner-tl { top: 0; left: 0; border-top: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }
        .p-corner-br { bottom: 0; right: 0; border-bottom: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); }

        @keyframes m-fadein { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.55); }
      `}</style>

      <div className="model-inner">
        {/* Page header */}
        <div className="model-sys-row">
          <div className="model-sys-badge">DIAGNOSTIC MODULE · ACTIVE</div>
          <div className="model-sys-line" />
          <span className="model-sys-id">ID: PLT-DX-0049</span>
        </div>

        <h1 className="model-heading">
          Run <span>Analysis</span>
        </h1>
        <p className="model-subhead">
          Upload a poultry image · RexNet-50 inference · Grad-CAM heatmap
        </p>

        {/* Main grid */}
        <div className="model-grid">

          {/* LEFT — Upload */}
          <div className="model-panel model-panel-left">
            <div className="p-corner p-corner-tl" />
            <div className="p-corner p-corner-br" />

            <div className="panel-header">
              <span className="panel-lbl">UPLOAD IMAGE</span>
              <span className="panel-tag">JPG · PNG · WEBP</span>
            </div>

            <div className="panel-body">
              {/* Drop zone */}
              <div
                className={`drop-zone ${dragOver ? "drag-on" : ""}`}
                onClick={() => !image && inputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                {preview ? (
                  <img src={preview} alt="preview" className="dz-preview" />
                ) : (
                  <>
                    <div className="dz-icon-ring">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(255,255,255,0.28)" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      </svg>
                    </div>
                    <p className="dz-lbl">Drop image or click to browse</p>
                    <p className="dz-sub">Max 10 MB</p>
                  </>
                )}
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleUpload}
              />

              {/* File info */}
              {image && (
                <div className="file-info">
                  <div className="fi-dot" />
                  <span className="fi-name">{image.name}</span>
                  <span className="fi-size">{(image.size / 1024).toFixed(1)} KB</span>
                  <button className="fi-clear" onClick={handleClear}>✕</button>
                </div>
              )}

              {/* Analyze button */}
              <button className="btn-analyze" onClick={handleSubmit} disabled={!image || loading}>
                {loading ? (
                  <><div className="btn-spinner" /> ANALYZING...</>
                ) : (
                  <>▶ ANALYZE IMAGE</>
                )}
              </button>
            </div>

            <div className="panel-footer">
              <span className="panel-footer-tag">MODEL · REXNET-50</span>
              <span className="panel-footer-tag">GRAD-CAM READY</span>
            </div>
          </div>

          {/* RIGHT — Result */}
          <div className="model-panel" style={{ position: "relative" }}>
            <div className="p-corner p-corner-tl" />
            <div className="p-corner p-corner-br" />

            {result && (
              <div
                className="result-panel-topline"
                style={{ background: `linear-gradient(to right, ${statusColor}, transparent)` }}
              />
            )}

            <div className="panel-header">
              <span className="panel-lbl">PREDICTION RESULT</span>
              {result && statusLabel && (
                <div className="res-status" style={{ borderColor: `${statusColor}40`, background: `${statusColor}0d`, color: statusColor }}>
                  <div className="res-status-dot" style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
                  {statusLabel}
                </div>
              )}
            </div>

            {!result && !loading && (
              <div className="result-empty">
                <div className="result-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="result-empty-lbl">Results will appear here</p>
              </div>
            )}

            {loading && (
              <div className="result-empty">
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(245,158,11,0.2)", borderTop: "1px solid #f59e0b", animation: "spin 1s linear infinite" }} />
                <p className="result-empty-lbl">Processing image...</p>
              </div>
            )}

            {result && !loading && (
              <div className="panel-body">
                {result.prediction && (
                  <div className="res-row">
                    <span className="res-key">Disease</span>
                    <div className="res-val">{result.prediction}</div>
                  </div>
                )}
                {result.confidence !== undefined && (
                  <div className="res-row">
                    <span className="res-key">Confidence</span>
                    <div className="res-conf-wrap">
                      <div className="res-conf-num" style={{ color: statusColor }}>{confidence}%</div>
                      <div className="res-conf-track">
                        <div className="res-conf-fill" style={{ width: `${confidence}%`, background: `linear-gradient(to right, ${statusColor}70, ${statusColor})` }} />
                      </div>
                    </div>
                  </div>
                )}
                {/* Any extra fields */}
                {Object.entries(result)
                  .filter(([k]) => k !== "prediction" && k !== "confidence")
                  .map(([k, v]) => (
                    <div key={k} className="res-row">
                      <span className="res-key">{k.replace(/_/g, " ")}</span>
                      <div className="res-val" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)" }}>{String(v)}</div>
                    </div>
                  ))
                }
              </div>
            )}

            <div className="panel-footer">
              <span className="panel-footer-tag">PLT-DX-0049</span>
              <span className="panel-footer-tag">BUILD 2401</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}