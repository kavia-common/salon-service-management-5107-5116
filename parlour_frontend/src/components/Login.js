import React, { useState } from "react";
import axios from "axios";

/**
 * PUBLIC_INTERFACE
 * Admin Login page (protected)
 */
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/admin/login", {
        username, password
      });
      if (res.data && res.data.access_token) {
        onLogin(res.data.access_token);
      } else {
        setMsg("Login failed.");
        setPassword("");
      }
    } catch (err) {
      setMsg(err.response?.data?.detail || "Login failed.");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <section className="container" style={{ maxWidth: 400, margin: "2.8rem auto" }}>
      <h2 style={{ color: "#3b82f6", fontWeight: 700, marginBottom: 21, fontSize: "2rem" }}>Admin Login</h2>
      <form onSubmit={handleLogin}
        style={{
          background: "#fff",
          borderRadius: 11,
          boxShadow: "0 2px 9px #3b82f629",
          padding: "2.2rem"
        }}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Username</label>
          <input
            required type="text"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 9, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ color: "#111827", fontWeight: 500 }}>Password</label>
          <input
            required
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 7, padding: 9, marginTop: 4 }}
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            borderRadius: 8,
            padding: "11px 0",
            width: "100%",
            marginTop: 5
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {msg && <div style={{ color: "#EF4444", marginTop: 12 }}>{msg}</div>}
      </form>
    </section>
  );
}

export default Login;
