import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
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

        /* Grain overlay */
        .dashboard-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* Ambient glow orbs */
        .dashboard-orb-1 {
          position: fixed;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%);
          top: -300px;
          right: -200px;
          pointer-events: none;
          z-index: 0;
          animation: orb-pulse 8s ease-in-out infinite;
          filter: blur(60px);
        }

        .dashboard-orb-2 {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%);
          bottom: 0px;
          left: -150px;
          pointer-events: none;
          z-index: 0;
          animation: orb-pulse 10s ease-in-out infinite 3s;
          filter: blur(80px);
        }

        @keyframes orb-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Subtle grid pattern on background */
        .dashboard-grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%);
        }

        /* Left sidebar accent line */
        .sidebar-accent {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(163, 230, 53, 0.3) 20%,
            rgba(163, 230, 53, 0.1) 60%,
            transparent 100%
          );
          z-index: 10;
        }

        /* Content area */
        .dashboard-content {
          position: relative;
          z-index: 5;
          padding: 2rem 2.5rem;
          max-width: 1400px;
          margin: 0 auto;
          animation: content-fadein 0.5s ease forwards;
          opacity: 0;
          transform: translateY(10px);
        }

        @keyframes content-fadein {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Subtle top fade beneath navbar */
        .navbar-shadow {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to bottom, rgba(10,10,15,0.95) 0%, transparent 100%);
          z-index: 9;
          pointer-events: none;
        }

        /* Bottom vignette */
        .bottom-vignette {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 100%);
          z-index: 0;
          pointer-events: none;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(163, 230, 53, 0.2);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(163, 230, 53, 0.4);
        }
      `}</style>

      {/* Background layers */}
      <div className="dashboard-grain" />
      <div className="dashboard-grid-bg" />
      <div className="dashboard-orb-1" />
      <div className="dashboard-orb-2" />
      <div className="sidebar-accent" />
      <div className="navbar-shadow" />
      <div className="bottom-vignette" />

      {/* Navbar — rendered above everything */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Navbar />
      </div>

      {/* Page content */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;