import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>

      {/* First page will be Register */}
      <Route path="/" element={<Register />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Employee Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/leave-history" element={<LeaveHistory />} />

      {/* Admin Page */}
      <Route path="/admin" element={<Admin />} />

    </Routes>
  );
}

export default App;