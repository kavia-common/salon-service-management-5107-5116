import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import ServicesList from "./components/ServicesList";
import BookingForm from "./components/BookingForm";
import ContactPage from "./components/ContactPage";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import "./App.css";

// Simple fake auth for demo/prototype admin protection
function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return {
    token,
    login: (jwt) => {
      localStorage.setItem("token", jwt);
      setToken(jwt);
    },
    logout: () => {
      localStorage.removeItem("token");
      setToken(null);
    },
  };
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  // For passing login auth to child
  const auth = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className="App">
        <header className="navbar" style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", marginBottom: 0, padding: 0 }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
            <Link to="/" className="brand" style={{ fontSize: 28, fontWeight: 700, color: "#3b82f6", letterSpacing: 1, textDecoration: "none", padding: "1rem 0" }}>Parlour</Link>
            <nav style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
              <Link to="/" className="nav-link">Services</Link>
              <Link to="/book" className="nav-link">Book Appointment</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
              <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </nav>
          </div>
        </header>
        <main style={{ background: "var(--bg-primary)", minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<ServicesList />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={
                auth.token
                ? <AdminDashboard onLogout={auth.logout} token={auth.token} />
                : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<Login onLogin={auth.login} />} />
          </Routes>
        </main>
        <footer style={{ textAlign: "center", padding: "1.1rem", background: "#f1f5f9", color: "#64748b", fontSize: 14, marginTop: "2rem" }}>
          Parlour App &copy; {new Date().getFullYear()} • Powered by KAVIA
        </footer>
      </div>
    </Router>
  );
}

export default App;
