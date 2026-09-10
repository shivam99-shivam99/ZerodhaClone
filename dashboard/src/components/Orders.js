import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3002/allOrders");
      setAllOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

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
        <span style={{ fontSize: "13px" }}>Loading orders...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: "70%", padding: "60px 40px", textAlign: "center", color: "#df514c" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
        <p style={{ fontSize: "14px" }}>{error}</p>
        <button
          onClick={fetchOrders}
          style={{
            marginTop: "12px",
            padding: "8px 20px",
            backgroundColor: "#4184f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          Retry
        </button>
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#444", margin: 0 }}>
          Orders ({allOrders.length})
        </h3>
        <button
          onClick={fetchOrders}
          style={{
            padding: "6px 14px",
            backgroundColor: "#f2f2f2",
            color: "#666",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          title="Refresh orders"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Empty State */}
      {allOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "#aaa" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
          <h4 style={{ fontWeight: "400", color: "#666", marginBottom: "8px" }}>
            No orders placed today
          </h4>
          <p style={{ fontSize: "13px", color: "#aaa" }}>
            Place a buy or sell order from the watchlist to see it here.
          </p>
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
            textAlign: "left",
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
              <th style={{ paddingLeft: "10px", fontWeight: "400" }}>Type</th>
              <th style={{ fontWeight: "400" }}>Instrument</th>
              <th style={{ fontWeight: "400", textAlign: "right" }}>Qty.</th>
              <th style={{ fontWeight: "400", textAlign: "right" }}>Price</th>
              <th style={{ fontWeight: "400", textAlign: "right", paddingRight: "10px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => {
              const isBuy  = order.mode === "BUY";
              const total  = (order.qty || 0) * (order.price || 0);

              return (
                <tr
                  key={order._id || index}
                  style={{
                    borderBottom: "1px solid #f4f4f4",
                    height: "46px",
                    color: "#444",
                    transition: "background-color 0.1s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8f9fa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <td style={{ paddingLeft: "10px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        borderRadius: "3px",
                        fontSize: "11px",
                        fontWeight: "700",
                        backgroundColor: isBuy ? "#e8f5e9" : "#ffebee",
                        color: isBuy ? "#4fa843" : "#df514c",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {order.mode}
                    </span>
                  </td>
                  <td style={{ fontWeight: "500", color: "#333" }}>{order.name}</td>
                  <td style={{ textAlign: "right" }}>{order.qty}</td>
                  <td style={{ textAlign: "right" }}>₹{order.price ? order.price.toFixed(2) : "0.00"}</td>
                  <td
                    style={{
                      textAlign: "right",
                      paddingRight: "10px",
                      fontWeight: "500",
                      color: isBuy ? "#444" : "#df514c",
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;