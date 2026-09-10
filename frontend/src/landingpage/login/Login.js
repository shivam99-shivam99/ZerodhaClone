import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!formData.email.trim()) {
      setError("Please enter your registered email address");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3002/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccessMsg("Logged in successfully! Redirecting to Kite Dashboard...");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          // Open or redirect to dashboard (port 3000)
          window.location.href = "http://localhost:3000";
        }, 1200);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please verify and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Account Login for instant testing
  const handleDemoLogin = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // First try to login with demo credentials
      const demoEmail = "testtrader@example.com";
      const demoPass = "password123";

      let res;
      try {
        res = await axios.post("http://localhost:3002/login", {
          email: demoEmail,
          password: demoPass,
        });
      } catch (loginErr) {
        // If demo user doesn't exist, create it on the fly
        res = await axios.post("http://localhost:3002/signup", {
          username: "Demo Trader",
          email: demoEmail,
          password: demoPass,
        });
      }

      if (res.data.success) {
        setSuccessMsg("Demo user authenticated! Redirecting to Kite Dashboard...");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => {
          window.location.href = "http://localhost:3000";
        }, 1200);
      }
    } catch (err) {
      setError("Demo login failed. Please sign up a new account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fbfbfb",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 15px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          padding: "40px 32px",
          border: "1px solid #edf2f7",
        }}
      >
        {/* Kite / Zerodha Logo */}
        <div className="text-center mb-4">
          <img
            src="/kite.png"
            alt="Kite Logo"
            style={{ width: "48px", height: "auto", marginBottom: "12px" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#333", margin: "0 0 4px 0" }}>
            Login to Kite
          </h2>
          <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
            Zerodha's fast & intuitive trading terminal
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "18px",
              border: "1px solid #ffcdd2",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div
            style={{
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "18px",
              border: "1px solid #c8e6c9",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>✅</span>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          {/* Email Address */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
                outline: "none",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#387ed1")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#444" }}>
                Password
              </label>
              <span
                style={{ fontSize: "12px", color: "#387ed1", cursor: "pointer" }}
                onClick={() => alert("Please use your registered password or try the 1-Click Demo Account.")}
              >
                Forgot password?
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "11px 40px 11px 14px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#387ed1")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#90caf9" : "#387ed1",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              boxShadow: "0 2px 6px rgba(56, 126, 209, 0.3)",
              marginBottom: "12px",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = "#2b6cb0";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = "#387ed1";
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "18px 0" }}>
          <div style={{ flex: 1, borderTop: "1px solid #eee" }} />
          <span style={{ padding: "0 10px", fontSize: "12px", color: "#aaa" }}>OR</span>
          <div style={{ flex: 1, borderTop: "1px solid #eee" }} />
        </div>

        {/* 1-Click Demo Login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "11px",
            backgroundColor: "#f4f8fc",
            color: "#387ed1",
            border: "1.5px dashed #387ed1",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e8f0fe";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#f4f8fc";
          }}
        >
          <span>⚡</span>
          <span>1-Click Demo Account Login</span>
        </button>

        {/* Don't have an account? */}
        <div className="text-center mt-4" style={{ fontSize: "13px", color: "#666" }}>
          Don't have an account?{" "}
          <Link to="/Signup" style={{ color: "#387ed1", fontWeight: "600", textDecoration: "none" }}>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
