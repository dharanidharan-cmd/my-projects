import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const data = { name, email, password, role };
      const res = await axios.post("http://localhost:5000/register", data);
      alert(res.data);
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      // Gradient: Dark Navy to Deep Purple to Black
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
      padding: "20px",
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      textAlign: "center",
      animation: "fadeIn 0.8s ease-out",
    },
    title: {
      color: "#ffffff",
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "10px",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      color: "#b0b0b0",
      fontSize: "14px",
      marginBottom: "30px",
    },
    input: {
      width: "100%",
      padding: "14px",
      margin: "12px 0",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.07)",
      color: "#fff",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    select: {
      appearance: "none",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      marginTop: "20px",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 4px 15px rgba(71, 118, 230, 0.4)",
    },
    footerText: {
      marginTop: "25px",
      color: "#aaa",
      fontSize: "14px",
    },
    link: {
      color: "#4776E6",
      cursor: "pointer",
      textDecoration: "none",
      fontWeight: "600",
      marginLeft: "5px",
      transition: "color 0.3s",
    }
  };

  return (
    <div style={styles.container}>
      {/* Dynamic Keyframes injected via style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.4); }
        input:focus { 
          border-color: #4776E6 !important; 
          background: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 0 8px rgba(71, 118, 230, 0.3);
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(71, 118, 230, 0.6);
        }
        button:active { transform: translateY(0); }
      `}</style>

      <div style={styles.glassCard}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join our premium dashboard today.</p>
        
        <input
          style={styles.input}
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select 
          style={{...styles.input, ...styles.select}} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" style={{background: "#24243e"}}>Select Role</option>
          <option value="employee" style={{background: "#24243e"}}>Employee</option>
          <option value="admin" style={{background: "#24243e"}}>Admin</option>
        </select>

        <button 
          style={styles.button} 
          onClick={handleRegister}
        >
          Register Now
        </button>

        <p style={styles.footerText}>
          Already have an account?
          <span 
            style={styles.link} 
            onClick={() => (window.location.href = "/login")}
            onMouseOver={(e) => e.target.style.color = "#8E54E9"}
            onMouseOut={(e) => e.target.style.color = "#4776E6"}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;