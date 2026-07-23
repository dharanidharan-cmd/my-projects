import React, { useEffect, useState } from "react";
import axios from "axios";

const STYLES = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    fontFamily: "'Inter', sans-serif",
    padding: "40px 20px",
    color: "#ffffff",
  },
  glassCard: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    padding: "35px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    animation: "fadeIn 0.6s ease-out",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px",
    marginTop: "20px",
  },
  th: {
    textAlign: "left",
    padding: "15px 20px",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
  },
  td: {
    padding: "15px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    fontSize: "14px",
    color: "#eee",
  },
  actionBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginRight: "8px",
  }
};

function Admin() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/all-leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Failed to fetch leaves");
    }
  };

  const approveLeave = async (id) => {
    await axios.put(`http://localhost:5000/approve/${id}`);
    fetchLeaves();
  };

  const rejectLeave = async (id) => {
    await axios.put(`http://localhost:5000/reject/${id}`);
    fetchLeaves();
  };

  return (
    <div style={STYLES.container}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .row-hover:hover td { background: rgba(255, 255, 255, 0.08) !important; }
        .row-hover td:first-child { border-radius: 12px 0 0 12px; }
        .row-hover td:last-child { border-radius: 0 12px 12px 0; }
        .btn-approve { background: rgba(0, 255, 136, 0.15); color: #00ff88; border: 1px solid rgba(0, 255, 136, 0.3) !important; }
        .btn-approve:hover { background: #00ff88; color: #000; }
        .btn-reject { background: rgba(9, 7, 7, 0.15); color: #ff4d4d; border: 1px solid rgba(255, 77, 77, 0.3) !important; }
        .btn-reject:hover { background: #ff4d4d; color: #fff; }
        .status-pill { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
      `}</style>

      <div style={STYLES.glassCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "32px", margin: 0, fontWeight: "800" }}>Admin <span style={{ color: "#8E54E9" }}>Control</span></h2>
            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "5px" }}>Manage employee leave applications and system status.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <button 
                onClick={() => window.location.href = "/"} 
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "8px 15px", borderRadius: "8px", cursor: "pointer" }}
            >
                Logout
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={STYLES.table}>
            <thead>
              <tr>
                <th style={STYLES.th}>Employee</th>
                <th style={STYLES.th}>Reason</th>
                <th style={STYLES.th}>Duration</th>
                <th style={STYLES.th}>Status</th>
                <th style={STYLES.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="row-hover">
                  <td style={{ ...STYLES.td, fontWeight: "600" }}>{leave.name}</td>
                  <td style={STYLES.td}>{leave.reason}</td>
                  <td style={STYLES.td}>
                    <span style={{ fontSize: "12px", color: "#aaa" }}>{leave.fromDate}</span>
                    <br />
                    <span style={{ fontSize: "12px", color: "#aaa" }}>to {leave.toDate}</span>
                  </td>
                  <td style={STYLES.td}>
                    <span className="status-pill" style={{ 
                        background: leave.status === 'Approved' ? 'rgba(0, 255, 136, 0.1)' : leave.status === 'Rejected' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(255, 204, 0, 0.1)',
                        color: leave.status === 'Approved' ? '#00ff88' : leave.status === 'Rejected' ? '#ff4d4d' : '#ffcc00'
                    }}>
                      {leave.status || 'Pending'}
                    </span>
                  </td>
                  <td style={STYLES.td}>
                    {leave.status === "Pending" || !leave.status ? (
                      <>
                        <button className="btn-approve" style={STYLES.actionBtn} onClick={() => approveLeave(leave._id)}>Approve</button>
                        <button className="btn-reject" style={STYLES.actionBtn} onClick={() => rejectLeave(leave._id)}>Reject</button>
                      </>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontStyle: "italic" }}>Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;