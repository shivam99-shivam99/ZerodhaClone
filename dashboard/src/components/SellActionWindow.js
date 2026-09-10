import React, { useState } from "react";
import axios from "axios";
import "./BuyActionWindow.css";
import Toast from "./Toast";

const SellActionWindow = ({ uid, initialPrice, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice]       = useState(initialPrice || 0.0);
  const [loading, setLoading]             = useState(false);
  const [toast, setToast]                 = useState(null);

  const showToast = (message, type) => setToast({ message, type });
  const closeToast = () => setToast(null);

  const qtyNum   = Number(stockQuantity) || 0;
  const priceNum = Number(stockPrice) || 0;
  const marginCredit = (qtyNum * priceNum).toFixed(2);

  const handleSellSubmit = async () => {
    if (!stockQuantity || qtyNum <= 0) {
      showToast("Please enter a valid quantity.", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: qtyNum,
        price: priceNum,
        mode: "SELL",
      });
      showToast(`✓ SELL order placed for ${uid} — ${qtyNum} qty @ ₹${priceNum.toFixed(2)}`, "success");
      setTimeout(() => { if (onClose) onClose(); }, 1800);
    } catch (error) {
      console.error("Error submitting SELL order:", error);
      showToast(`Failed to place order for ${uid}. Please try again.`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div
        style={{
          position: "fixed",
          top: "25%",
          left: "35%",
          width: "320px",
          backgroundColor: "#fff",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
          borderRadius: "6px",
          padding: "20px",
          zIndex: 9999,
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Header */}
        <div style={{ fontWeight: "600", marginBottom: "14px", color: "#ff5722", fontSize: "14px" }}>
          Sell {uid}
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Qty.</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              min="1"
            />
          </div>

          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="footer-row">
          <span className="margin-text">Margin credit: ₹{marginCredit}</span>

          <div className="button-group">
            <button
              onClick={handleSellSubmit}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#ffaa8a" : "#ff5722",
                color: "#fff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "2px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "12px",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
            >
              {loading ? "Placing..." : "Sell"}
            </button>
            <button onClick={onClose} disabled={loading} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellActionWindow;