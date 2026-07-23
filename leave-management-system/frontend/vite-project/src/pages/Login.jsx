import React, { useState } from "react";
import axios from "axios";

// 1. STYLES DEFINED OUTSIDE TO PREVENT RE-CALCULATION
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  fontFamily: "'Inter', sans-serif",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "40px",
  width: "380px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      if (res.data.message === "Login Successful") {
        localStorage.setItem("name", res.data.name);
        window.location.href = res.data.role === "admin" ? "/admin" : "/dashboard";
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={pageStyle}>
      {/* 2. USE CSS FOR INTERACTION - DO NOT USE JS ONFOCUS/ONBLUR */}
      <style>{`
        .glass-input:focus {
          border-color: #4776E6 !important;
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .btn-grad:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      `}</style>

      <div style={cardStyle}>
        <h2 style={{ color: "#fff", marginBottom: "30px" }}>Welcome Back</h2>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "8px" }}>
            Email Address
          </label>
          <input
            key="email-input"
            className="glass-input"
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "8px" }}>
            Password
          </label>
          <input
            key="password-input"
            className="glass-input"
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          className="btn-grad"
          onClick={handleLogin}
          style={{
            width: "100%", padding: "14px", borderRadius: "12px", border: "none",
            background: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
            color: "white", fontWeight: "600", cursor: "pointer", transition: "0.2s"
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;