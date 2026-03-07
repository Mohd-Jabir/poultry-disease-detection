import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "white",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

        /* Grain texture */
        .main-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* Ambient glow orbs */
        .main-orb-1 {
          position: fixed;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%);
          top: -350px;
          right: -250px;
          pointer-events: none;
          z-index: 0;
          filter: blur(80px);
          animation: main-orb-pulse 9s ease-in-out infinite;
        }

        .main-orb-2 {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%);
          bottom: -100px;
          left: -150px;
          pointer-events: none;
          z-index: 0;
          filter: blur(100px);
          animation: main-orb-pulse 12s ease-in-out infinite 4s;
        }

        @keyframes main-orb-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        /* Grid overlay */
        .main-grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
        }

        /* Left edge accent */
        .main-edge-line {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(163,230,53,0.25) 25%,
            rgba(163,230,53,0.08) 65%,
            transparent 100%
          );
          z-index: 10;
          pointer-events: none;
        }

        /* Right edge accent */
        .main-edge-line-right {
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(56,189,248,0.12) 30%,
            rgba(56,189,248,0.04) 60%,
            transparent 100%
          );
          z-index: 10;
          pointer-events: none;
        }

        /* Top navbar fade */
        .main-navbar-fade {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(to bottom, rgba(10,10,15,0.98) 0%, transparent 100%);
          z-index: 9;
          pointer-events: none;
        }

        /* Bottom vignette */
        .main-bottom-vignette {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to top, rgba(10,10,15,0.5) 0%, transparent 100%);
          z-index: 0;
          pointer-events: none;
        }

        /* Outlet wrapper */
        .main-outlet {
          position: relative;
          z-index: 5;
          animation: outlet-enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          transform: translateY(12px);
        }

        @keyframes outlet-enter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: rgba(163,230,53,0.2);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(163,230,53,0.4);
        }
      `}</style>

      {/* Background layers */}
      <div className="main-grain" />
      <div className="main-grid-bg" />
      <div className="main-orb-1" />
      <div className="main-orb-2" />
      <div className="main-edge-line" />
      <div className="main-edge-line-right" />
      <div className="main-navbar-fade" />
      <div className="main-bottom-vignette" />

      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Navbar />
      </div>

      {/* Routed page content */}
      <div className="main-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;