import React from "react";
import WatchList from "./components/WatchList"; // Adjust path if WatchList is inside components folder
import Holdings from "./components/Holdings";   // Adjust path if Holdings is inside components folder


function App() {
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Left Sidebar (30% width) */}
      <WatchList />

      {/* Main Content Area (70% width) */}
      <Holdings />

      
    </div>
  );
}

export default App;