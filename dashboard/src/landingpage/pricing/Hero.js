import React from "react";

function Hero() {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1 className="fw-bold">Charges</h1>
        <h3 className="text-muted mt-3 fs-5 fw-normal">
          List of all charges and taxes
        </h3>
      </div>

      {/* Pricing Cards Grid */}
      <div className="row p-5 mt-5 text-center">
        {/* Card 1: Equity Delivery */}
        <div className="col-md-4 p-4">
          <img 
            src="pricingEquity (1).svg" 
            alt="Free Equity Delivery" 
            className="img-fluid mb-3"
            style={{ maxHeight: "120px" }}
          />
          <h2 className="fs-3 fw-semibold">Free equity delivery</h2>
          <p className="text-muted mt-3">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
          </p>
        </div>

        {/* Card 2: Intraday and F&O */}
        <div className="col-md-4 p-4">
          <img 
            src="intradayTrades.svg" 
            alt="Intraday and F&O Trades" 
            className="img-fluid mb-3"
            style={{ maxHeight: "120px" }}
          />
          <h2 className="fs-3 fw-semibold">Intraday and F&O trades</h2>
          <p className="text-muted mt-3">
            Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades.
          </p>
        </div>

        {/* Card 3: Direct Mutual Funds */}
        <div className="col-md-4 p-4">
          <img 
            src="pricingMF (1).svg" 
            alt="Free Direct Mutual Funds" 
            className="img-fluid mb-3"
            style={{ maxHeight: "120px" }}
          />
          <h2 className="fs-3 fw-semibold">Free direct MF</h2>
          <p className="text-muted mt-3">
            All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;