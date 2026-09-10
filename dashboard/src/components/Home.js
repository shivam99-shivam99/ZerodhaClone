import React from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./TopBar";
import WatchList from "./WatchList";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";
import AICopilot from "./AICopilot";

function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <TopBar />
      <div style={{ display: "flex", width: "100%" }}>
        {/* Watchlist remains permanently on the left */}
        <WatchList />

        {/* Dynamic area that swaps content based on the URL */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Apps />} />
          </Routes>
        </div>
      </div>

      {/* Floating Kite AI Copilot Assistant */}
      <AICopilot />
    </div>
  );
}

export default Home;