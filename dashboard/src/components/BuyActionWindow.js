import React, { useState } from "react";
import axios from "axios";
import "./BuyActionWindow.css";
import Toast from "./Toast";

const BuyActionWindow = ({ uid, initialPrice, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice]       = useState(initialPrice || 0.0);
  const [loading, setLoading]             = useState(false);
  const [toast, setToast]                 = useState(null);

  const showToast = (message, type) => setToast({ message, type });
  const closeToast = () => setToast(null);

  const handleBuySubmit = async () => {
    if (!stockQuantity || stockQuantity <= 0) {
      showToast("Please enter a valid quantity.", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      });
      showToast(`✓ BUY order placed for ${uid} — ${stockQuantity} qty @ ₹${Number(stockPrice).toFixed(2)}`, "success");
      setTimeout(() => { if (onClose) onClose(); }, 1800);
    } catch (error) {
      console.error("Error submitting BUY order:", error);
      showToast(`Failed to place order for ${uid}. Please try again.`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      <div className="buy-container">
        {/* Header */}
        <div style={{ fontWeight: "600", marginBottom: "14px", color: "#4184f3", fontSize: "14px" }}>
          Buy {uid}
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Qty.</label>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
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
          <span className="margin-text">
            Margin required ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
          </span>

          <div className="button-group">
            <button
              style={{
                backgroundColor: loading ? "#8ab3f8" : "#4184f3",
                color: "#fff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "2px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "12px",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
              onClick={handleBuySubmit}
              disabled={loading}
            >
              {loading ? "Placing..." : "Buy"}
            </button>
            <button className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;