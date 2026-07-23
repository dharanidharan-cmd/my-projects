import React, { useState } from "react";
import axios from "axios";

// 1. STYLES DEFINED OUTSIDE TO PREVENT RE-RENDERING CURSOR ISSUES
const STYLES = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    fontFamily: "'Inter', sans-serif",
    padding: "20px",
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    animation: "fadeIn 0.6s ease-out",
  },
  label: {
    display: "block",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "13px",
    marginBottom: "8px",
    fontWeight: "500",
    paddingLeft: "4px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "20px",
    transition: "all 0.2s ease",
  },
  button: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    boxShadow: "0 10px 20px rgba(71, 118, 230, 0.3)",
    transition: "all 0.3s ease",
  }
};

function ApplyLeave() {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = async () => {
    if (!reason || !fromDate || !toDate) {
      alert("Please fill in all details");
      return;
    }

    const data = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      reason,
      fromDate,
      toDate
    };

    try {
      const res = await axios.post("http://localhost:5000/apply-leave", data);
      alert(res.data);
    } catch (err) {
      alert("Error submitting request.");
    }
  };

  return (
    <div style={STYLES.page}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-input:focus {
          border-color: #4776E6 !important;
          background: rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 0 0 4px rgba(71, 118, 230, 0.2);
        }
        /* Styling the date picker icon for Chrome/Safari */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          opacity: 0.6;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 15px 30px rgba(71, 118, 230, 0.4);
        }
        .submit-btn:active { transform: translateY(0); }
      `}</style>

      <div style={STYLES.glassCard}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#fff", fontSize: "28px", margin: "0 0 8px 0" }}>Request Leave</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Fill in the duration and reason below.</p>
        </div>

        <div>
          <label style={STYLES.label}>Reason for Leave</label>
          <input
            className="form-input"
            style={STYLES.input}
            type="text"
            placeholder="e.g. Medical emergency, Family event"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={STYLES.label}>From Date</label>
              <input
                className="form-input"
                style={STYLES.input}
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={STYLES.label}>To Date</label>
              <input
                className="form-input"
                style={STYLES.input}
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          <button className="submit-btn" style={STYLES.button} onClick={handleApply}>
            Submit Application
          </button>

          <button 
            onClick={() => window.history.back()}
            style={{
              width: "100%", background: "transparent", border: "none", color: "rgba(255,255,255,0.4)",
              marginTop: "15px", cursor: "pointer", fontSize: "14px"
            }}
          >
            Cancel and Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;