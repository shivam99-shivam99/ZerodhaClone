import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";

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

  // Handle automatic client-side navigation with timer cleanup
  useEffect(() => {
    let timer;
    if (successMsg) {
      timer = setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const processAuthSuccess = (data, message) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setSuccessMsg(message);
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
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.success) {
        processAuthSuccess(response.data, "Logged in successfully! Redirecting to Kite Dashboard...");
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

  const handleDemoLogin = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const demoEmail = "testtrader@example.com";
    const demoPass = "password123";

    try {
      let res;
      try {
        res = await axios.post(`${API_BASE_URL}/login`, {
          email: demoEmail,
          password: demoPass,
        });
      } catch (loginErr) {
        res = await axios.post(`${API_BASE_URL}/signup`, {
          username: "Demo Trader",
          email: demoEmail,
          password: demoPass,
        });
      }

      if (res.data?.success) {
        processAuthSuccess(res.data, "Demo user authenticated! Redirecting to Kite Dashboard...");
      }
    } catch (err) {
      setError("Demo login failed. Please sign up for a new account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo and Header */}
        <div style={styles.header}>
          <img
            src="/kite.png"
            alt="Kite Logo"
            style={styles.logo}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h1 style={styles.title}>Login to Kite</h1>
          <p style={styles.subtitle}>Zerodha's fast & intuitive trading terminal</p>
        </div>

        {/* Alerts */}
        {error && (
          <div role="alert" style={{ ...styles.alert, ...styles.alertError }}>
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div role="status" style={{ ...styles.alert, ...styles.alertSuccess }}>
            <span aria-hidden="true">✅</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} noValidate>
          <div style={styles.inputGroup}>
            <label htmlFor="login-email" style={styles.label}>
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              aria-required="true"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#387ed1")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.passwordHeader}>
              <label htmlFor="login-password" style={styles.label}>
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Please use your registered password or try the 1-Click Demo Account.")}
                style={styles.forgotBtn}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                aria-required="true"
                style={{ ...styles.input, paddingRight: "48px" }}
                onFocus={(e) => (e.target.style.borderColor = "#387ed1")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={styles.togglePasswordBtn}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.primaryBtn,
              backgroundColor: loading ? "#90caf9" : "#387ed1",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.dividerContainer}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          style={{
            ...styles.demoBtn,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <span aria-hidden="true">⚡</span>
          <span>1-Click Demo Account Login</span>
        </button>

        <div style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/Signup" style={styles.signupLink}>
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fbfbfb",
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 15px",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    padding: "40px 32px",
    border: "1px solid #edf2f7",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    width: "48px",
    height: "auto",
    marginBottom: "12px",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#333",
    margin: "0 0 4px 0",
  },
  subtitle: {
    fontSize: "13px",
    color: "#777",
    margin: 0,
  },
  alert: {
    padding: "10px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  alertError: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    border: "1px solid #ffcdd2",
  },
  alertSuccess: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    border: "1px solid #c8e6c9",
  },
  inputGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#444",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
  },
  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  forgotBtn: {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "12px",
    color: "#387ed1",
    cursor: "pointer",
  },
  togglePasswordBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#888",
    cursor: "pointer",
    fontSize: "12px",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    transition: "background 0.2s",
    boxShadow: "0 2px 6px rgba(56, 126, 209, 0.3)",
    marginBottom: "12px",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    margin: "18px 0",
  },
  dividerLine: {
    flex: 1,
    borderTop: "1px solid #eee",
  },
  dividerText: {
    padding: "0 10px",
    fontSize: "12px",
    color: "#aaa",
  },
  demoBtn: {
    width: "100%",
    padding: "11px",
    backgroundColor: "#f4f8fc",
    color: "#387ed1",
    border: "1.5px dashed #387ed1",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  footerText: {
    textAlign: "center",
    marginTop: "16px",
    fontSize: "13px",
    color: "#666",
  },
  signupLink: {
    color: "#387ed1",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Login;