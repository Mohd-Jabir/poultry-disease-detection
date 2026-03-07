import { useState, useRef } from "react";
import Button from "./Button";

const UploadCard = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = () => {
    if (!file) return;
    onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&display=swap');

        .uc-root {
          font-family: 'Share Tech Mono', monospace;
          width: 100%;
          max-width: 440px;
          background: #0c0e12;
          border: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }

        /* Amber top line */
        .uc-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, #f59e0b, transparent);
          pointer-events: none;
        }

        /* Corner marks */
        .uc-corner {
          position: absolute;
          width: 12px; height: 12px;
          pointer-events: none;
        }
        .uc-corner-br { bottom: 0; right: 0; border-bottom: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); }
        .uc-corner-tl { top: 0; left: 0; border-top: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }

        /* Header */
        .uc-header {
          padding: 0.7rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.015);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .uc-header-lbl {
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: #f59e0b;
          text-transform: uppercase;
        }
        .uc-header-tag {
          font-size: 0.53rem;
          letter-spacing: 0.13em;
          color: rgba(255,255,255,0.2);
        }

        /* Body */
        .uc-body { padding: 1.5rem 1.25rem; }

        /* Drop zone */
        .uc-dropzone {
          border: 1px dashed rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.015);
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          margin-bottom: 1.25rem;
        }
        .uc-dropzone:hover, .uc-dropzone.drag-on {
          border-color: rgba(245,158,11,0.4);
          background: rgba(245,158,11,0.04);
          box-shadow: inset 0 0 30px rgba(245,158,11,0.04);
        }

        /* Upload icon ring */
        .uc-icon-ring {
          width: 56px; height: 56px;
          border: 1px solid rgba(245,158,11,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: all 0.25s ease;
        }
        .uc-dropzone:hover .uc-icon-ring,
        .uc-dropzone.drag-on .uc-icon-ring {
          border-color: rgba(245,158,11,0.6);
          box-shadow: 0 0 16px rgba(245,158,11,0.15);
        }
        .uc-icon-ring svg { transition: stroke 0.25s ease; }
        .uc-dropzone:hover .uc-icon-ring svg,
        .uc-dropzone.drag-on .uc-icon-ring svg {
          stroke: #f59e0b;
        }

        .uc-drop-label {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }
        .uc-drop-sub {
          font-size: 0.54rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
        }

        /* Preview */
        .uc-preview-img {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        /* File info row */
        .uc-file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.9rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          margin-bottom: 1.25rem;
          animation: uc-fi-in 0.3s ease both;
        }
        @keyframes uc-fi-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .uc-file-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 7px #22c55e;
          flex-shrink: 0;
          animation: uc-blink 2s ease-in-out infinite;
        }
        @keyframes uc-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .uc-file-name {
          flex: 1; min-width: 0;
          font-size: 0.62rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .uc-file-size {
          font-size: 0.54rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.22);
          white-space: nowrap;
        }
        .uc-file-clear {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.54rem; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.25);
          background: none; border: none; cursor: pointer;
          text-transform: uppercase;
          transition: color 0.2s ease;
          padding: 0;
        }
        .uc-file-clear:hover { color: rgba(245,158,11,0.7); }

        /* Analyze button */
        .uc-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.63rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.85rem 0;
          width: 100%;
          background: #f59e0b;
          color: #050608;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .uc-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .uc-btn:hover:not(:disabled)::after { opacity: 1; }
        .uc-btn:hover:not(:disabled) {
          background: #fbbf24;
          box-shadow: 0 0 28px rgba(245,158,11,0.4);
        }
        .uc-btn:disabled {
          background: rgba(245,158,11,0.2);
          color: rgba(5,6,8,0.45);
          cursor: not-allowed;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }

        /* Footer */
        .uc-footer {
          padding: 0.55rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          background: rgba(255,255,255,0.01);
        }
        .uc-footer-tag {
          font-size: 0.52rem;
          letter-spacing: 0.13em;
          color: rgba(255,255,255,0.18);
        }
      `}</style>

      <div className="uc-root">
        <div className="uc-corner uc-corner-tl" />
        <div className="uc-corner uc-corner-br" />

        {/* Header */}
        <div className="uc-header">
          <span className="uc-header-lbl">UPLOAD IMAGE</span>
          <span className="uc-header-tag">JPG · PNG · WEBP</span>
        </div>

        {/* Body */}
        <div className="uc-body">
          {/* Drop zone */}
          <div
            className={`uc-dropzone ${dragOver ? "drag-on" : ""}`}
            onClick={() => !file && inputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="uc-preview-img" />
            ) : (
              <>
                <div className="uc-icon-ring">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
                <p className="uc-drop-label">Drop image or click to browse</p>
                <p className="uc-drop-sub">Max 10MB</p>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {/* File info */}
          {file && (
            <div className="uc-file-info">
              <div className="uc-file-dot" />
              <span className="uc-file-name">{file.name}</span>
              <span className="uc-file-size">{(file.size / 1024).toFixed(1)} KB</span>
              <button className="uc-file-clear" onClick={handleClear}>✕</button>
            </div>
          )}

          {/* Analyze button */}
          <button className="uc-btn" onClick={handleSubmit} disabled={!file}>
            ▶ ANALYZE IMAGE
          </button>
        </div>

        {/* Footer */}
        <div className="uc-footer">
          <span className="uc-footer-tag">MODEL · REXNET-50</span>
          <span className="uc-footer-tag">GRAD-CAM READY</span>
        </div>
      </div>
    </>
  );
};

export default UploadCard;