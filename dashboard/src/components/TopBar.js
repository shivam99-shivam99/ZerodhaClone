import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "60px",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      {/* Left TopBar: NIFTY/SENSEX indices aligned above WatchList */}
      <div
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderRight: "1px solid #eee",
          height: "100%",
          fontSize: "12px",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <span style={{ color: "#666", fontWeight: "500" }}>NIFTY 50</span>
          <span style={{ color: "#df514c" }}>100.2</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <span style={{ color: "#666", fontWeight: "500" }}>SENSEX</span>
          <span style={{ color: "#df514c" }}>100.2</span>
        </div>
      </div>

      {/* Right TopBar: Navigation links */}
      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "30px",
          height: "100%",
        }}
      >
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;