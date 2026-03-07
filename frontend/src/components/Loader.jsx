const Loader = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        .loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: 2rem 0;
        }

        /* Outer ring */
        .loader-ring-outer {
          position: relative;
          width: 52px;
          height: 52px;
        }

        /* Spinning arc */
        .loader-spin {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(245,158,11,0.12);
          border-top-color: #f59e0b;
          animation: loader-rotate 0.9s linear infinite;
        }

        /* Counter-spin inner ring */
        .loader-spin-inner {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(245,158,11,0.07);
          border-bottom-color: rgba(245,158,11,0.4);
          animation: loader-rotate 1.4s linear infinite reverse;
        }

        /* Center dot */
        .loader-center-dot {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 10px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.3);
          animation: loader-dot-pulse 1.4s ease-in-out infinite;
        }

        /* Corner brackets around the spinner */
        .loader-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          pointer-events: none;
        }
        .loader-bracket-tl { top: -4px; left: -4px; border-top: 1px solid rgba(245,158,11,0.5); border-left: 1px solid rgba(245,158,11,0.5); }
        .loader-bracket-tr { top: -4px; right: -4px; border-top: 1px solid rgba(245,158,11,0.5); border-right: 1px solid rgba(245,158,11,0.5); }
        .loader-bracket-bl { bottom: -4px; left: -4px; border-bottom: 1px solid rgba(245,158,11,0.5); border-left: 1px solid rgba(245,158,11,0.5); }
        .loader-bracket-br { bottom: -4px; right: -4px; border-bottom: 1px solid rgba(245,158,11,0.5); border-right: 1px solid rgba(245,158,11,0.5); }

        /* Label */
        .loader-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          animation: loader-blink 1.4s ease-in-out infinite;
        }

        /* Blinking dots after label */
        .loader-dots span {
          display: inline-block;
          animation: loader-dot-bounce 1.2s ease-in-out infinite;
          color: rgba(245,158,11,0.5);
        }
        .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loader-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes loader-rotate {
          to { transform: rotate(360deg); }
        }
        @keyframes loader-dot-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(245,158,11,0.8), 0 0 20px rgba(245,158,11,0.3); }
          50%       { opacity: 0.4; box-shadow: 0 0 4px rgba(245,158,11,0.4); }
        }
        @keyframes loader-blink {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        @keyframes loader-dot-bounce {
          0%, 80%, 100% { opacity: 0.25; }
          40%           { opacity: 1; color: #f59e0b; }
        }
      `}</style>

      <div className="loader-wrap">
        <div className="loader-ring-outer">
          {/* Corner brackets */}
          <div className="loader-bracket loader-bracket-tl" />
          <div className="loader-bracket loader-bracket-tr" />
          <div className="loader-bracket loader-bracket-bl" />
          <div className="loader-bracket loader-bracket-br" />

          {/* Rings */}
          <div className="loader-spin" />
          <div className="loader-spin-inner" />

          {/* Center dot */}
          <div className="loader-center-dot" />
        </div>

        {/* Label */}
        <div className="loader-label">
          Processing
          <span className="loader-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Loader;