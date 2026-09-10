import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard",  path: "/"          },
  { label: "Orders",     path: "/orders"    },
  { label: "Holdings",   path: "/holdings"  },
  { label: "Positions",  path: "/positions" },
  { label: "Funds",      path: "/funds"     },
  { label: "Apps",       path: "/apps"      },
];

const Menu = () => {
  const location = useLocation();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading user session:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfileMenuOpen(false);
    // Reload or redirect to login
    window.location.href = "http://localhost:3001/Login";
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

  const userName = user?.username || "Trader";
  const userEmail = user?.email || "user@kite.zerodha.com";
  const userInitials = getInitials(user?.username);

  // Active path: treat "/" as exact match, others as startsWith
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <div
      className="menu-container"
      style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}
    >
      {/* Logo */}
      <img
        src="/kite.png"
        alt="Kite logo"
        style={{ width: "30px", height: "auto" }}
        onError={(e) => { e.target.style.display = "none"; }}
      />

      {/* Nav links */}
      <ul style={{ display: "flex", listStyle: "none", gap: "4px", margin: 0, padding: 0 }}>
        {navItems.map(({ label, path }) => {
          const active = isActive(path);
          return (
            <li key={path}>
              <Link
                style={{ textDecoration: "none" }}
                to={path}
              >
                <p
                  style={{
                    margin: 0,
                    padding: "6px 12px",
                    fontSize: "13px",
                    fontWeight: active ? "600" : "400",
                    color: active ? "#444" : "#888",
                    borderBottom: active ? "2px solid #4184f3" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "color 0.15s, border-bottom-color 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { if (!active) e.target.style.color = "#444"; }}
                  onMouseLeave={(e) => { if (!active) e.target.style.color = "#888"; }}
                >
                  {label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Profile Section */}
      <div style={{ position: "relative" }}>
        <div
          className="profile"
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#fff0eb",
              color: "#ff5722",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "700",
              border: "1.5px solid #ffccbc",
            }}
          >
            {userInitials}
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: isProfileHovered ? "#ff5722" : "#666",
              transition: "color 0.2s ease",
            }}
          >
            {userName.toUpperCase().slice(0, 8)}
          </span>
        </div>

        {/* Profile Dropdown */}
        {isProfileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: 0,
              width: "200px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
              borderRadius: "6px",
              border: "1px solid #eee",
              zIndex: 1000,
              padding: "10px 0 6px 0",
              animation: "fadeInDown 0.15s ease",
            }}
          >
            {/* User Header in Dropdown */}
            <div style={{ padding: "0 16px 8px 16px", borderBottom: "1px solid #eee" }}>
              <div style={{ fontWeight: "600", fontSize: "13px", color: "#333" }}>{userName}</div>
              <div style={{ fontSize: "11px", color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {userEmail}
              </div>
            </div>

            <ul style={{ listStyle: "none", margin: "6px 0 0 0", padding: 0, fontSize: "13px", color: "#444" }}>
              {[
                { label: "My Profile", color: "#444" },
                { label: "Console",    color: "#444" },
                { label: "Coin",       color: "#444" },
              ].map(({ label, color }) => (
                <li
                  key={label}
                  style={{ padding: "8px 16px", cursor: "pointer", color, transition: "background 0.1s" }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = "#f8f9fa"; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; }}
                >
                  {label}
                </li>
              ))}
              <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "6px 0" }} />
              {user ? (
                <li
                  onClick={handleLogout}
                  style={{ padding: "8px 16px", cursor: "pointer", color: "#df514c", fontWeight: "500" }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = "#fff5f5"; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; }}
                >
                  Logout
                </li>
              ) : (
                <li
                  onClick={() => { window.location.href = "http://localhost:3001/Login"; }}
                  style={{ padding: "8px 16px", cursor: "pointer", color: "#387ed1", fontWeight: "500" }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = "#f0f7ff"; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; }}
                >
                  Sign In / Register
                </li>
              )}
            </ul>
            <style>{`
              @keyframes fadeInDown {
                from { transform: translateY(-6px); opacity: 0; }
                to   { transform: translateY(0);    opacity: 1; }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;