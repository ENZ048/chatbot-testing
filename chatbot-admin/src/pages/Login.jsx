import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/admin/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/clients");
    } catch (err) {
      alert("❌ Login failed. Check credentials.");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>🔐 Admin Login</h2>
        <form onSubmit={handleSubmit} style={form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={input}
          />
          <button type="submit" style={button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const container = {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #f6f9fc, #e9efff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "420px",
  textAlign: "center",
};

const title = {
  marginBottom: "24px",
  fontSize: "24px",
  fontWeight: "600",
  color: "#333",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const input = {
  padding: "12px 16px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.2s",
};

const button = {
  padding: "12px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Login;
