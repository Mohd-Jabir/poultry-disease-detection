const Button = ({ children, onClick, variant = "primary", disabled }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        .btn-base {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.63rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.85rem 2rem;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        /* Shimmer overlay */
        .btn-base::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .btn-base:not(:disabled):hover::after { opacity: 1; }

        /* ── PRIMARY ── */
        .btn-primary {
          background: #f59e0b;
          color: #050608;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .btn-primary:not(:disabled):hover {
          background: #fbbf24;
          box-shadow: 0 0 28px rgba(245,158,11,0.45);
        }
        .btn-primary:not(:disabled):active {
          background: #d97706;
          box-shadow: 0 0 14px rgba(245,158,11,0.3);
          transform: translateY(1px);
        }

        /* ── OUTLINE ── */
        .btn-outline {
          background: transparent;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          clip-path: none;
        }
        .btn-outline:not(:disabled):hover {
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.03);
        }
        .btn-outline:not(:disabled):active {
          background: rgba(255,255,255,0.06);
          transform: translateY(1px);
        }

        /* ── DANGER ── */
        .btn-danger {
          background: transparent;
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.05);
          clip-path: none;
        }
        .btn-danger:not(:disabled):hover {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.55);
          box-shadow: 0 0 20px rgba(239,68,68,0.15);
          color: #f87171;
        }
        .btn-danger:not(:disabled):active {
          transform: translateY(1px);
        }

        /* ── GHOST ── */
        .btn-ghost {
          background: transparent;
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,0.28);
          background: rgba(245,158,11,0.05);
          clip-path: none;
        }
        .btn-ghost:not(:disabled):hover {
          background: rgba(245,158,11,0.1);
          border-color: rgba(245,158,11,0.55);
          box-shadow: 0 0 18px rgba(245,158,11,0.18);
          color: #fbbf24;
        }
        .btn-ghost:not(:disabled):active {
          transform: translateY(1px);
        }

        /* ── DISABLED ── */
        .btn-base:disabled {
          opacity: 0.32;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}</style>

      <button
        onClick={onClick}
        disabled={disabled}
        className={`btn-base btn-${variant}`}
      >
        {variant === "primary" && !disabled && <span>▶</span>}
        {children}
      </button>
    </>
  );
};

export default Button;