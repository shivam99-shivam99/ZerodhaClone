import React, { useState, useEffect } from "react";

function Summary() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading user session in Summary:", e);
    }
  }, []);

  const displayName = user?.username ? user.username.split(" ")[0] : "Trader";

  return (
    <div className="p-4 w-100" style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Greeting Header */}
      <h2 className="fs-3 fw-normal mb-4 text-dark">Hi, {displayName}</h2>
      <hr className="text-muted opacity-25 mb-4" />

      {/* Equity & Commodity Section */}
      <div className="row mb-5">
        {/* Equity Card */}
        <div className="col-md-6 border-end pe-4">
          <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
            <span className="fs-5">🕒</span>
            <span className="fw-medium">Equity</span>
          </div>
          <div className="row align-items-center">
            <div className="col-6">
              <h1 className="display-5 fw-normal mb-0">50k</h1>
              <span className="text-muted small">Available balance</span>
            </div>
            <div className="col-6 border-start ps-4 text-secondary small">
              <div className="mb-2">
                Margins used <span className="fw-semibold text-dark ms-2">5k</span>
              </div>
              <div>
                Account value <span className="fw-semibold text-dark ms-2">55k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commodity Card */}
        <div className="col-md-6 ps-4">
          <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
            <span className="fs-5">💧</span>
            <span className="fw-medium">Commodity</span>
          </div>
          <div className="row align-items-center">
            <div className="col-6">
              <h1 className="display-5 fw-normal mb-0">28k</h1>
              <span className="text-muted small">Available balance</span>
            </div>
            <div className="col-6 border-start ps-4 text-secondary small">
              <div className="mb-2">
                Margins used <span className="fw-semibold text-dark ms-2">0</span>
              </div>
              <div>
                Account value <span className="fw-semibold text-dark ms-2">28k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-muted opacity-25 mb-5" />

      {/* Holdings Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
          <span className="fs-5">💼</span>
          <span className="fw-medium">Holdings (58)</span>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-baseline gap-2">
              <h1 className="display-4 text-success fw-normal mb-0">1.76L</h1>
              <span className="text-success small fw-medium">+52.10%</span>
            </div>
            <span className="text-muted small">P&L</span>
          </div>
          <div className="col-md-6 border-start ps-4 text-secondary small">
            <div className="mb-2">
              Current value <span className="fw-semibold text-dark ms-3">3.01L</span>
            </div>
            <div>
              Investment <span className="fw-semibold text-dark ms-3">1.25L</span>
            </div>
          </div>
        </div>

        {/* Color Distribution Bar */}
        <div
          className="mt-4 rounded d-flex"
          style={{ height: "16px", overflow: "hidden" }}
        >
          <div style={{ width: "70%", backgroundColor: "#df514c" }}></div>
          <div style={{ width: "15%", backgroundColor: "#ff9800" }}></div>
          <div style={{ width: "15%", backgroundColor: "#4caf50" }}></div>
        </div>
      </div>

      <hr className="text-muted opacity-25 mb-5" />

      {/* Market Overview & Positions Section */}
      <div className="row">
        <div className="col-md-6 border-end pe-4">
          <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
            <span className="fs-5">📈</span>
            <span className="fw-medium">Market overview</span>
          </div>
          <div className="p-3 bg-light rounded text-center text-muted small">
            NIFTY 50 Performance Chart
          </div>
        </div>

        <div className="col-md-6 ps-4">
          <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
            <span className="fs-5">📄</span>
            <span className="fw-medium">Positions (3)</span>
          </div>
          <div className="p-3 bg-light rounded text-center text-muted small">
            Active Trades & Intraday P&L
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;