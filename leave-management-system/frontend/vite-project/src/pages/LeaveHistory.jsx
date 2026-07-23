import React, { useEffect, useState } from "react";
import axios from "axios";

// 1. STABLE STYLES DEFINED OUTSIDE
const STYLES = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    fontFamily: "'Inter', sans-serif",
    padding: "60px 20px",
    color: "#ffffff",
  },
  glassCard: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    animation: "fadeInUp 0.6s ease-out",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px", // Adds spacing between rows
    marginTop: "20px",
  },
  th: {
    textAlign: "left",
    padding: "15px 20px",
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  td: {
    padding: "18px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: "15px",
    color: "#e0e0e0",
  }
};

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await axios.get(`http://localhost:5000/leaves/${email}`);
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves", err);
    }
  };

  // Helper to color-code status badges
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "approved") return { color: "#00ff88", bg: "rgba(0, 255, 136, 0.1)" };
    if (s === "rejected") return { color: "#ff4d4d", bg: "rgba(255, 77, 77, 0.1)" };
    return { color: "#ffcc00", bg: "rgba(255, 204, 0, 0.1)" }; // Pending
  };

  return (
    <div style={STYLES.container}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .row-item td:first-child { border-radius: 12px 0 0 12px; }
        .row-item td:last-child { border-radius: 0 12px 12px 0; }
        .row-item:hover td {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: #ffffff;
        }
        .status-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
          display: inline-block;
        }
        .back-btn:hover { color: #4776E6 !important; }
      `}</style>

      <div style={STYLES.glassCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h2 style={{ fontSize: "28px", margin: 0 }}>Leave History</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "5px" }}>
              Track your past and upcoming time-off requests.
            </p>
          </div>
          <button 
            className="back-btn"
            onClick={() => window.location.href = "/dashboard"}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", transition: "0.3s" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={STYLES.table}>
            <thead>
              <tr>
                <th style={STYLES.th}>Reason</th>
                <th style={STYLES.th}>From Date</th>
                <th style={STYLES.th}>To Date</th>
                <th style={STYLES.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => {
                const statusTheme = getStatusStyle(leave.status);
                return (
                  <tr key={index} className="row-item" style={{ transition: "0.2s" }}>
                    <td style={{ ...STYLES.td, fontWeight: "500" }}>{leave.reason}</td>
                    <td style={STYLES.td}>{new Date(leave.fromDate).toLocaleDateString()}</td>
                    <td style={STYLES.td}>{new Date(leave.toDate).toLocaleDateString()}</td>
                    <td style={STYLES.td}>
                      <span className="status-badge" style={{ color: statusTheme.color, backgroundColor: statusTheme.bg }}>
                        {leave.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.3)" }}>
                    No leave records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveHistory;