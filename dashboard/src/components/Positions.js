import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    const fetchPositionsData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allPositions"); // ✅ Fixed case
        setAllPositions(response.data);
      } catch (err) {
        console.error("Error fetching positions data:", err);
        setError("Failed to load positions. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchPositionsData();
  }, []);

  const totalPnl = allPositions.reduce((acc, stock) => {
    const curValue = (stock.price || 0) * (stock.qty || 0);
    return acc + (curValue - (stock.avg || 0) * (stock.qty || 0));
  }, 0);

  if (loading) {
    return (
      <div
        style={{
          width: "70%",
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid #eee",
            borderTop: "3px solid #4184f3",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span style={{ fontSize: "13px" }}>Loading positions...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: "70%", padding: "60px 40px", textAlign: "center", color: "#df514c" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
        <p style={{ fontSize: "14px" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "70%",
        padding: "30px 40px",
        backgroundColor: "#fff",
        minHeight: "calc(100vh - 60px)",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#444", marginBottom: "25px" }}>
        Positions ({allPositions.length})
      </h3>

      {/* Empty State */}
      {allPositions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📊</div>
          <p style={{ fontSize: "14px" }}>No open positions today.</p>
        </div>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#9b9b9b",
                  borderBottom: "1px solid #eee",
                  height: "35px",
                  fontWeight: "400",
                }}
              >
                <th style={{ textAlign: "left", paddingLeft: "10px", fontWeight: "400" }}>Product</th>
                <th style={{ textAlign: "left", fontWeight: "400" }}>Instrument</th>
                <th style={{ fontWeight: "400" }}>Qty.</th>
                <th style={{ fontWeight: "400" }}>Avg.</th>
                <th style={{ fontWeight: "400" }}>LTP</th>
                <th style={{ fontWeight: "400" }}>P&L</th>
                <th style={{ fontWeight: "400", paddingRight: "10px" }}>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const pnl      = curValue - (stock.avg || 0) * (stock.qty || 0);
                const isProfit = pnl >= 0;

                return (
                  <tr
                    key={stock._id || index}
                    style={{
                      borderBottom: "1px solid #f4f4f4",
                      height: "42px",
                      color: "#444",
                      transition: "background-color 0.1s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8f9fa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <td style={{ textAlign: "left", paddingLeft: "10px" }}>
                      <span
                        style={{
                          backgroundColor: "#f2f2f2",
                          color: "#666",
                          padding: "2px 6px",
                          borderRadius: "2px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {stock.product}
                      </span>
                    </td>
                    <td style={{ textAlign: "left", fontWeight: "500", color: "#444" }}>{stock.name}</td>
                    <td style={{ color: stock.qty < 0 ? "#df514c" : "#444" }}>{stock.qty}</td>
                    <td>{stock.avg ? stock.avg.toFixed(2) : "0.00"}</td>
                    <td>{stock.price ? stock.price.toFixed(2) : "0.00"}</td>
                    <td style={{ color: isProfit ? "#4fa843" : "#df514c" }}>
                      {isProfit ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                    </td>
                    <td
                      style={{
                        paddingRight: "10px",
                        color: stock.isLoss ? "#df514c" : "#4fa843",
                      }}
                    >
                      {stock.day || stock.net || "0.00%"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Total P&L Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "15px",
              marginTop: "20px",
              paddingTop: "15px",
              borderTop: "1px solid #eee",
            }}
          >
            <span style={{ fontSize: "13px", color: "#666" }}>Total P&L</span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: totalPnl >= 0 ? "#4fa843" : "#df514c",
              }}
            >
              {totalPnl >= 0 ? `+${totalPnl.toFixed(2)}` : totalPnl.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Positions;