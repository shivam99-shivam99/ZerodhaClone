import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (!formData.agreeTerms) {
      setError("Please accept the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.data.success) {
        setSuccessMsg("Account created successfully! Redirecting to dashboard...");

        // Store authentication token and user payload
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fbfbfb", minHeight: "85vh", padding: "40px 15px" }}>
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header Title */}
        <div className="text-center mb-5">
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", color: "#424242", letterSpacing: "-0.5px" }}>
            Open a free Demat and Trading account
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#666", marginTop: "10px" }}>
            Start investing brokerage-free and join a community of 1.6+ crore investors
          </p>
        </div>

        <div
          className="row align-items-center justify-content-between"
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            padding: "40px 30px",
            border: "1px solid #edf2f7",
          }}
        >
          {/* Left Column: Benefits & Trust Highlights */}
          <div className="col-lg-5 mb-4 mb-lg-0 pe-lg-4 border-end-lg">
            {!imgError && (
              <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <img
                  src="/largestBroker.svg"
                  alt="Zerodha Ecosystem"
                  style={{ width: "80%", maxWidth: "260px", margin: "0 auto" }}
                  onError={() => setImgError(true)}
                />
              </div>
            )}

            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#333", marginBottom: "16px" }}>
              Why trade with Zerodha?
            </h2>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { title: "₹0 Brokerage", desc: "Free equity delivery and direct mutual funds" },
                { title: "₹20 Max Intraday", desc: "Flat ₹20 per executed order for F&O and intraday" },
                { title: "Superfast Kite Terminal", desc: "Lightning fast charts, sleek order book & analytics" },
                { title: "Trusted by 1.6+ Cr Users", desc: "India's largest and most reliable stock broker" },
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#e8f5e9",
                      color: "#2e7d32",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <strong style={{ fontSize: "14px", color: "#333" }}>{item.title}</strong>
                    <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Signup Form */}
          <div className="col-lg-6 ps-lg-4">
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#333", marginBottom: "6px" }}>
                Create your account
              </h2>
              <p style={{ fontSize: "13px", color: "#888" }}>
                Enter your details below to get started in 2 minutes
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
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
                <span role="img" aria-label="warning">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div
                role="status"
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
                <span role="img" aria-label="success">✅</span>
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="username" style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
                  Full Name / Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="email" style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="password" style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 40px 10px 14px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                      fontWeight: "500",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "18px" }}>
                <label htmlFor="confirmPassword" style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#444", marginBottom: "6px" }}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Terms Checkbox */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "22px" }}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  style={{ marginTop: "3px", cursor: "pointer" }}
                />
                <label htmlFor="agreeTerms" style={{ fontSize: "12px", color: "#666", cursor: "pointer", lineHeight: "1.4" }}>
                  I agree to the Zerodha Terms of Service, Privacy Policy, and declare that I am an Indian resident.
                </label>
              </div>

              {/* Submit Button */}
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
                }}
              >
                {loading ? "Creating Account..." : "Continue to Kite"}
              </button>

              {/* Login Navigation Link */}
              <div className="text-center mt-3" style={{ fontSize: "13px", color: "#666" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#387ed1", fontWeight: "600", textDecoration: "none" }}>
                  Log in here
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-4">
          <p style={{ fontSize: "12px", color: "#999", maxWidth: "600px", margin: "0 auto" }}>
            I authorise Zerodha to contact me via email, phone, or SMS. This will override my NDNC registration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;