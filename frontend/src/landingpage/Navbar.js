import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/Login");
  };

  const getInitials = (name) => {
    if (!name) return "ZU";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#FFF", zIndex: 100 }}
    >
      <div className="container p-2">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.svg"
            style={{ width: "25%", minWidth: "120px" }}
            alt="Zerodha Logo"
          />
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {currentUser ? (
              <>
                <li className="nav-item me-3">
                  <a
                    href="http://localhost:3000"
                    className="btn btn-sm btn-primary"
                    style={{
                      backgroundColor: "#387ed1",
                      borderColor: "#387ed1",
                      padding: "6px 14px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    🚀 Open Kite Dashboard
                  </a>
                </li>
                <li className="nav-item me-3 d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#fff0eb",
                      color: "#ff5722",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      border: "1px solid #ffccbc",
                    }}
                  >
                    {getInitials(currentUser.username)}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>
                    {currentUser.username}
                  </span>
                </li>
                <li className="nav-item me-3">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-secondary"
                    style={{ fontSize: "12px", padding: "4px 10px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-4">
                  <Link className="nav-link text-muted" to="/Signup" style={{ fontWeight: "500" }}>
                    Signup
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link className="nav-link text-muted" to="/Login" style={{ fontWeight: "500" }}>
                    Login
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item me-4">
              <Link className="nav-link text-muted" to="/About">
                About
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link text-muted" to="/Products">
                Products
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link text-muted" to="/Pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link text-muted" to="/Support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;