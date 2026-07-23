import React from "react";

// 1. STYLES DEFINED OUTSIDE TO ENSURE ZERO RE-RENDERING ISSUES
const STYLES = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    fontFamily: "'Inter', sans-serif",
    color: "#ffffff",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
    animation: "fadeInDown 0.8s ease-out",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  iconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "15px",
    background: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    fontSize: "24px",
    boxShadow: "0 8px 15px rgba(71, 118, 230, 0.3)",
  }
};

function Dashboard() {
  return (
    <div style={STYLES.container}>
      {/* 2. INJECTED CSS FOR ANIMATIONS AND HOVER STATES */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .action-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(71, 118, 230, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .action-card:active {
          transform: scale(0.98);
        }
      `}</style>

      <header style={STYLES.header}>
        <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "10px" }}>
          Employee <span style={{ color: "#4776E6" }}>Portal</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
          Manage your schedule and time-off requests seamlessly.
        </p>
      </header>

      <div style={{ ...STYLES.grid, animation: "fadeInUp 0.8s ease-out" }}>
        
        {/* Action Card 1: Apply Leave */}
        <div 
          className="action-card" 
          style={STYLES.card}
          onClick={() => window.location.href = "/apply-leave"}
        >
          <div style={STYLES.iconWrapper}>📝</div>
          <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>Apply Leave</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.5" }}>
            Submit a new time-off request for approval.
          </p>
        </div>

        {/* Action Card 2: Leave History */}
        <div 
          className="action-card" 
          style={STYLES.card}
          onClick={() => window.location.href = "/leave-history"}
        >
          <div style={STYLES.iconWrapper}>⏳</div>
          <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>Leave History</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.5" }}>
            View your previous requests and their status.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;