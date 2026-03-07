import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Button from "./Button";

const Navbar = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Archivo+Black&display=swap');

        /* ── Force Clerk modal/card to always render on top ── */
        .cl-rootBox,
        .cl-cardBox,
        .cl-card,
        .cl-modalBackdrop,
        .cl-modal,
        [data-clerk-modal],
        [data-clerk-component] {
          z-index: 99999 !important;
          position: relative;
        }

        /* Clerk modal backdrop covers full viewport */
        .cl-modalBackdrop {
          position: fixed !important;
          inset: 0 !important;
        }

        /* Clerk card centered in viewport */
        .cl-modal {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }

        .navbar {
          position: relative;
          /* IMPORTANT: do NOT use transform, filter, or will-change here
             as they create a new stacking context that traps Clerk modals */
          z-index: 50;
          width: 100%;
          padding: 0 2rem;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(5,6,8,0.92);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          /* backdrop-filter removed — it creates a stacking context
             that clips Clerk's portal and prevents modal from showing */
        }

        /* Amber top accent line */
        .navbar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent);
          pointer-events: none;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }
        .nav-logomark {
          width: 26px;
          height: 26px;
          border: 1px solid rgba(245,158,11,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .nav-logo:hover .nav-logomark {
          border-color: #f59e0b;
          box-shadow: 0 0 12px rgba(245,158,11,0.3);
        }
        .nav-logomark::before {
          content: '';
          width: 10px;
          height: 10px;
          background: #f59e0b;
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          transition: opacity 0.25s ease;
        }
        .nav-wordmark {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          color: #f59e0b;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }
        .nav-logo:hover .nav-wordmark {
          color: #fbbf24;
        }

        /* ── RIGHT SIDE ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Nav links */
        .nav-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          padding: 0.4rem 0.85rem;
          border: 1px solid transparent;
          transition: all 0.22s ease;
          position: relative;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
        }
        .nav-link.active-link {
          color: #f59e0b;
          border-color: rgba(245,158,11,0.25);
          background: rgba(245,158,11,0.05);
        }

        /* Divider */
        .nav-sep {
          width: 1px;
          height: 18px;
          background: rgba(255,255,255,0.08);
          margin: 0 0.5rem;
          flex-shrink: 0;
        }

        /* Sign In button */
        .nav-signin {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          background: transparent;
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,0.4);
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.22s ease;
          clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
        }
        .nav-signin:hover {
          background: rgba(245,158,11,0.1);
          border-color: rgba(245,158,11,0.7);
          box-shadow: 0 0 18px rgba(245,158,11,0.2);
          color: #fbbf24;
        }

        /* Dashboard link */
        .nav-dashboard {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          padding: 0.4rem 0.85rem;
          border: 1px solid transparent;
          transition: all 0.22s ease;
        }
        .nav-dashboard:hover {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
        }

        /* UserButton wrapper */
        .nav-user-wrap {
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          border: 1px solid rgba(255,255,255,0.08);
          height: 32px;
          transition: border-color 0.22s ease;
        }
        .nav-user-wrap:hover {
          border-color: rgba(245,158,11,0.3);
        }

        /* Status badge */
        .nav-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.28rem 0.65rem;
          border: 1px solid rgba(34,197,94,0.2);
          background: rgba(34,197,94,0.04);
          margin-left: 0.75rem;
        }
        .nav-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: nav-blink 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes nav-blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .nav-status-lbl {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.54rem;
          letter-spacing: 0.14em;
          color: #22c55e;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .nav-status { display: none; }
          .navbar { padding: 0 1.25rem; }
        }
      `}</style>

      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="nav-logomark" />
          <span className="nav-wordmark">Poultry·AI</span>
        </Link>

        {/* Right */}
        <div className="nav-right">
          <Link to="/model-info" className="nav-link">
            Model
          </Link>

          <div className="nav-sep" />

          <SignedOut>
            <Link to="/sign-in" className="nav-signin">
              ▶ Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard" className="nav-dashboard">
              Dashboard
            </Link>
            <div className="nav-sep" />
            <div className="nav-user-wrap">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <div className="nav-status">
            <div className="nav-status-dot" />
            <span className="nav-status-lbl">ONLINE</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;