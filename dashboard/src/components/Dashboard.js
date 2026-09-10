import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

const Dashboard = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [user, setUser]               = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading user in Dashboard:", e);
    }

    axios
      .get(`${API_BASE_URL}/allHoldings`)
      .then((res) => setAllHoldings(res.data))
      .catch((err) => console.error("Dashboard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const totalInvestment   = allHoldings.reduce((acc, s) => acc + (s.avg || 0) * (s.qty || 0), 0);
  const totalCurrentValue = allHoldings.reduce((acc, s) => acc + (s.price || 0) * (s.qty || 0), 0);
  const totalPnl          = totalCurrentValue - totalInvestment;
  const pnlPercent        = totalInvestment > 0 ? ((totalPnl / totalInvestment) * 100).toFixed(2) : "0.00";

  const formatK = (val) => {
    if (val >= 100000) return `${(val / 100000).toFixed(2)}L`;
    if (val >= 1000)   return `${(val / 1000).toFixed(2)}k`;
    return val.toFixed(2);
  };

  const Skeleton = () => (
    <div
      style={{
        height: "32px",
        width: "80px",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        animation: "pulse 1.2s ease-in-out infinite",
      }}
    />
  );

  const displayName = user?.username ? user.username.split(" ")[0] : "Trader";

  return (
    <div
      style={{
        width: "70%",
        padding: "40px 60px",
        backgroundColor: "#fff",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      {/* Greeting */}
      <h2 style={{ fontSize: "24px", fontWeight: "500", color: "#444" }}>
        Hi, {displayName}! 👋
      </h2>
      <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: "40px" }} />

      {/* Equity / Margin Section */}
      <div style={{ marginBottom: "50px" }}>
        <h4 style={{ fontSize: "15px", fontWeight: "500", color: "#888", marginBottom: "16px" }}>
          Equity
        </h4>
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div style={{ minWidth: "160px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: "400", color: "#444", margin: 0 }}>3.74k</h1>
            <p style={{ fontSize: "13px", color: "#999", margin: "4px 0 0" }}>Margin available</p>
          </div>
          <div style={{ borderLeft: "1px solid #eee", height: "55px" }} />
          <div style={{ fontSize: "12px", color: "#666", lineHeight: "2" }}>
            <div>Margins used <span style={{ color: "#333", fontWeight: "500", marginLeft: "20px" }}>0</span></div>
            <div>Opening balance <span style={{ color: "#333", fontWeight: "500", marginLeft: "10px" }}>3.74k</span></div>
          </div>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: "40px" }} />

      {/* Holdings Section — Dynamic */}
      <div>
        <h4 style={{ fontWeight: "400", color: "#888", marginBottom: "20px", fontSize: "15px" }}>
          Holdings {!loading && `(${allHoldings.length})`}
        </h4>

        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div style={{ minWidth: "180px" }}>
            {loading ? (
              <Skeleton />
            ) : (
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <h1
                  style={{
                    fontSize: "2.8rem",
                    fontWeight: "300",
                    margin: 0,
                    color: totalPnl >= 0 ? "#4fa843" : "#df514c",
                  }}
                >
                  {totalPnl >= 0 ? "+" : ""}{formatK(Math.abs(totalPnl))}
                </h1>
                <span
                  style={{
                    color: totalPnl >= 0 ? "#4fa843" : "#df514c",
                    fontSize: "12px",
                  }}
                >
                  {totalPnl >= 0 ? "+" : ""}{pnlPercent}%
                </span>
              </div>
            )}
            <p style={{ fontSize: "12px", color: "#9b9b9b", marginTop: "6px" }}>P&L</p>
          </div>

          <div style={{ borderLeft: "1px solid #eee", height: "55px" }} />

          <div style={{ fontSize: "12px", color: "#666", lineHeight: "2" }}>
            <div>
              Current Value{" "}
              <span style={{ color: "#333", fontWeight: "500", marginLeft: "12px" }}>
                {loading ? "—" : `₹${formatK(totalCurrentValue)}`}
              </span>
            </div>
            <div>
              Investment{" "}
              <span style={{ color: "#333", fontWeight: "500", marginLeft: "12px" }}>
                {loading ? "—" : `₹${formatK(totalInvestment)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;