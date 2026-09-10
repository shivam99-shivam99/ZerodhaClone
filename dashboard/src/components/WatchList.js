import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import { watchlist } from "../Data/data (1)";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import { DoughnutChart } from "./DoughnutChart"; // Import Doughnut Chart component

const WatchList = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionType, setActionType]       = useState(null); // "BUY" or "SELL"
  const [searchQuery, setSearchQuery]     = useState("");

  const handleOpenBuy  = (stock) => { setSelectedStock(stock); setActionType("BUY");  };
  const handleOpenSell = (stock) => { setSelectedStock(stock); setActionType("SELL"); };
  const handleClose    = ()      => { setSelectedStock(null);  setActionType(null);   };

  // Live filter by stock name
  const filteredList = watchlist.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic Doughnut Chart Data mapping off watchlist items
  const doughnutData = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Price (₹)",
        data: watchlist.map((stock) => stock.price || 0),
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <div
      style={{
        width: "30%",
        borderRight: "1px solid #eee",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {/* Index Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          borderBottom: "1px solid #eee",
          fontSize: "12px",
        }}
      >
        <div>
          <span style={{ color: "#666", marginRight: "8px" }}>NIFTY 50</span>
          <span style={{ color: "#df514c" }}>0.00</span>
        </div>
        <div>
          <span style={{ color: "#666", marginRight: "8px" }}>SENSEX</span>
          <span style={{ color: "#df514c" }}>0.00</span>
        </div>
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 15px",
          borderBottom: "1px solid #eee",
          gap: "8px",
        }}
      >
        <span style={{ color: "#aaa", fontSize: "13px" }}>🔍</span>
        <input
          type="text"
          placeholder="Search eg: INFY, TCS, NIFTY"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            fontSize: "12px",
            color: "#444",
            width: "100%",
            backgroundColor: "transparent",
          }}
        />
        {searchQuery ? (
          <button
            onClick={() => setSearchQuery("")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#aaa",
              fontSize: "16px",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        ) : (
          <span style={{ fontSize: "11px", color: "#aaa", whiteSpace: "nowrap" }}>
            {watchlist.length} / 50
          </span>
        )}
      </div>

      {/* Watchlist Items */}
      {filteredList.length === 0 ? (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "#aaa",
            fontSize: "13px",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔍</div>
          No results for "<strong>{searchQuery}</strong>"
        </div>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {filteredList.map((stock, index) => (
            <WatchListItem
              stock={stock}
              key={index}
              onBuyClick={() => handleOpenBuy(stock)}
              onSellClick={() => handleOpenSell(stock)}
            />
          ))}
        </ul>
      )}

      {/* Doughnut Chart rendered right below the Watchlist List */}
      <div style={{ width: "100%", height: "280px", padding: "20px 10px", boxSizing: "border-box" }}>
        <DoughnutChart data={doughnutData} />
      </div>

      {/* Overlay Modal Popups */}
      {selectedStock && actionType === "BUY" && (
        <BuyActionWindow
          uid={selectedStock.name}
          initialPrice={selectedStock.price}
          onClose={handleClose}
        />
      )}
      {selectedStock && actionType === "SELL" && (
        <SellActionWindow
          uid={selectedStock.name}
          initialPrice={selectedStock.price}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

const WatchListItem = ({ stock, onBuyClick, onSellClick }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        borderBottom: "1px solid #f4f4f4",
        fontSize: "13px",
        height: "24px",
        backgroundColor: showActions ? "#f8f9fa" : "#fff",
        transition: "background-color 0.1s",
        cursor: "default",
      }}
    >
      <span style={{ fontWeight: "500", color: "#444" }}>{stock.name}</span>

      {showActions ? (
        <WatchListActions onBuyClick={onBuyClick} onSellClick={onSellClick} />
      ) : (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: stock.isDown ? "#df514c" : "#4fa843", fontSize: "12px" }}>
            {stock.percent}
          </span>
          {stock.isDown ? (
            <span style={{ color: "#df514c", fontSize: "10px" }}>▼</span>
          ) : (
            <span style={{ color: "#4fa843", fontSize: "10px" }}>▲</span>
          )}
          <span style={{ color: "#444", fontWeight: "400" }}>
            {stock.price.toFixed(2)}
          </span>
        </div>
      )}
    </li>
  );
};

const WatchListActions = ({ onBuyClick, onSellClick }) => (
  <div style={{ display: "flex", gap: "4px" }}>
    <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
      <button
        onClick={onBuyClick}
        style={{
          backgroundColor: "#4184f3",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          borderRadius: "2px",
          fontSize: "11px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        B
      </button>
    </Tooltip>

    <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
      <button
        onClick={onSellClick}
        style={{
          backgroundColor: "#ff5722",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          borderRadius: "2px",
          fontSize: "11px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        S
      </button>
    </Tooltip>

    {[
      { title: "Market Depth (D)", icon: "📊" },
      { title: "Chart (C)",        icon: "📈" },
      { title: "Delete",           icon: "🗑" },
      { title: "More",            icon: "•••" },
    ].map(({ title, icon }) => (
      <Tooltip key={title} title={title} placement="top" arrow TransitionComponent={Grow}>
        <button
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "4px 6px",
            borderRadius: "2px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          {icon}
        </button>
      </Tooltip>
    ))}
  </div>
);

export default WatchList;