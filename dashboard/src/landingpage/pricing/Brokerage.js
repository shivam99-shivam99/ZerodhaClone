import React from "react";

function Brokerage() {
  return (
    <div className="container mt-5 pt-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-normal fs-2 text-dark">Pricing</h1>
        <p className="text-muted fs-5">
          Free equity investments and flat ₹20 intraday and F&O trades
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="row text-center border-bottom pb-5 mb-5">
        <div className="col-md-4 p-3">
          <h2 className="text-warning display-4 fw-medium">₹0</h2>
          <h3 className="fs-5 mt-3">Free equity delivery</h3>
          <p className="text-muted fs-6 mt-2">
            All equity delivery investments (NSE, BSE) are 100% free — ₹0 brokerage.
          </p>
        </div>

        <div className="col-md-4 p-3">
          <h2 className="text-warning display-4 fw-medium">₹20</h2>
          <h3 className="fs-5 mt-3">Intraday and F&O trades</h3>
          <p className="text-muted fs-6 mt-2">
            Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on options.
          </p>
        </div>

        <div className="col-md-4 p-3">
          <h2 className="text-warning display-4 fw-medium">₹0</h2>
          <h3 className="fs-5 mt-3">Free direct MF</h3>
          <p className="text-muted fs-6 mt-2">
            All direct mutual fund investments are 100% free — ₹0 commissions & DP charges.
          </p>
        </div>
      </div>

      {/* Charges Table */}
      <div className="table-responsive mb-5">
        <table className="table border align-middle text-muted fs-6">
          <thead className="table-light text-dark">
            <tr>
              <th>Service</th>
              <th>Equity delivery</th>
              <th>Equity intraday</th>
              <th>F&O - Futures</th>
              <th>F&O - Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-medium text-dark">Brokerage</td>
              <td>Zero Brokerage</td>
              <td>0.03% or Rs. 20/executed order whichever is lower</td>
              <td>0.03% or Rs. 20/executed order whichever is lower</td>
              <td>Flat Rs. 20 per executed order</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">STT/CTT</td>
              <td>0.1% on buy & sell</td>
              <td>0.025% on the sell side</td>
              <td>0.05% on the sell side</td>
              <td>0.15% on sell side (on premium)</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">Transaction charges</td>
              <td>NSE: 0.00307%<br />BSE: 0.00375%</td>
              <td>NSE: 0.00307%<br />BSE: 0.00375%</td>
              <td>NSE: 0.00183%<br />BSE: 0</td>
              <td>NSE: 0.03553% (on premium)<br />BSE: 0.0325% (on premium)</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">GST</td>
              <td colSpan="4" className="text-center">18% on (brokerage + SEBI charges + transaction charges)</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">SEBI charges</td>
              <td colSpan="4" className="text-center">₹10 / crore</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">Stamp charges</td>
              <td>0.015% or ₹1500 / crore on buy side</td>
              <td>0.003% or ₹300 / crore on buy side</td>
              <td>0.002% or ₹200 / crore on buy side</td>
              <td>0.003% or ₹300 / crore on buy side</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Brokerage;