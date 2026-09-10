import React from "react";

function Brokerage() {
  return (
    <div className="container mt-5 pt-4">
      {/* Top Banner */}
      <div className="text-center mb-5">
        <h1 className="fw-normal fs-2 text-dark">Pricing</h1>
        <p className="text-muted fs-5">
          Free equity investments and flat ₹20 intraday and F&O trades
        </p>
      </div>

      {/* Pricing Cards Row */}
      <div className="row text-center border-bottom pb-5 mb-5">
        <div className="col-md-4 p-3">
          <h1 className="text-warning display-4 fw-medium">₹0</h1>
          <h3 className="fs-5 mt-3">Free equity delivery</h3>
          <p className="text-muted fs-6 mt-2">
            All equity delivery investments (NSE, BSE) are 100% free — ₹0 brokerage.
          </p>
        </div>

        <div className="col-md-4 p-3">
          <h1 className="text-warning display-4 fw-medium">₹20</h1>
          <h3 className="fs-5 mt-3">Intraday and F&O trades</h3>
          <p className="text-muted fs-6 mt-2">
            Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on options.
          </p>
        </div>

        <div className="col-md-4 p-3">
          <h1 className="text-warning display-4 fw-medium">₹0</h1>
          <h3 className="fs-5 mt-3">Free direct MF</h3>
          <p className="text-muted fs-6 mt-2">
            All direct mutual fund investments are 100% free — ₹0 commissions &amp; DP charges.
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
              <th>F&amp;O - Futures</th>
              <th>F&amp;O - Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-medium text-dark">Brokerage</td>
              <td>Zero Brokerage</td>
              <td>0.03% or Rs. 20/executed <br /> order whichever is lower</td>
              <td>0.03% or Rs. 20/executed <br /> order whichever is lower</td>
              <td>Flat Rs. 20 per executed order</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">STT/CTT</td>
              <td>0.1% on buy &amp; sell</td>
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
              <td colSpan="4" className="text-center">18% on (brokerage + SEBI charges + <br />transaction charges)</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">SEBI charges</td>
              <td colSpan="4" className="text-center">₹10 / crore</td>
            </tr>
            <tr>
              <td className="fw-medium text-dark">Stamp charges</td>
              <td>0.015% or ₹1500 / crore<br /> on buy side</td>
              <td>0.003% or ₹300 / crore<br /> on buy side</td>
              <td>0.002% or ₹200 / crore<br /> on buy side</td>
              <td>0.003% or ₹300 / crore<br /> on buy side</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Calculator Link */}
      <div className="text-center my-4">
        <a href="#" className="text-decoration-none fs-5 fw-medium" style={{ color: "#387ed1" }}>
          Calculate your costs upfront using our brokerage calculator
        </a>
      </div>

      {/* Account Opening Charges */}
      <div className="mt-5 pt-3">
        <h3 className="fw-normal fs-3 text-dark mb-4">Charges for account opening</h3>
        <table className="table table-striped border align-middle text-muted">
          <thead>
            <tr className="border-bottom">
              <th className="fw-medium text-dark py-3" style={{ width: "50%" }}>Type of account</th>
              <th className="fw-medium text-dark py-3">Charges</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">Individual account</td>
              <td className="py-3">
                <span className="badge bg-success text-uppercase px-2 py-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                  FREE
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3">Minor account</td>
              <td className="py-3">
                <span className="badge bg-success text-uppercase px-2 py-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                  FREE
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3">NRI account</td>
              <td className="py-3">₹ 500</td>
            </tr>
            <tr>
              <td className="py-3">HUF account</td>
              <td className="py-3">
                <span className="badge bg-success text-uppercase px-2 py-1 me-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                  FREE
                </span>
                (online) / ₹ 500 (offline)
              </td>
            </tr>
            <tr>
              <td className="py-3">Partnership, LLP, and Corporate accounts (offline only)</td>
              <td className="py-3">₹ 500</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Demat AMC Charges */}
      <div className="mt-5 pt-3">
        <h3 className="fw-normal fs-3 text-dark mb-4">Demat AMC (Annual Maintenance Charge)</h3>
        
        <div 
          className="p-3 mb-4 rounded-1" 
          style={{ 
            backgroundColor: "#f4f8fb", 
            borderLeft: "4px solid #387ed1",
            color: "#424242",
            fontSize: "1.05rem"
          }}
        >
          Free for first year*
        </div>

        <p className="text-muted mb-3 fs-6">From second year onwards, for BSDA accounts:</p>

        <table className="table table-striped border align-middle text-muted">
          <thead>
            <tr className="border-bottom">
              <th className="fw-medium text-dark py-3" style={{ width: "50%" }}>Value of holdings</th>
              <th className="fw-medium text-dark py-3">AMC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">Up to ₹4 lakh</td>
              <td className="py-3">
                <span className="badge bg-success text-uppercase px-2 py-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                  FREE
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3">₹4 lakh – ₹10 lakh</td>
              <td className="py-3">₹100 per year + 18% GST, charged quarterly</td>
            </tr>
            <tr>
              <td className="py-3">Above ₹10 lakh</td>
              <td className="py-3">₹300 per year + 18% GST, charged quarterly</td>
            </tr>
          </tbody>
        </table>

        <p className="text-muted fs-6 mt-3 mb-2">
          For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless of holdings value, charged quarterly.
        </p>
        
        <p className="text-muted fs-6 mb-2">
          To learn more about BSDA, <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>click here</a>. To learn more about AMC, <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>click here</a>.
        </p>
        
        <p className="text-muted fs-6 mt-3">*Resident individual accounts only.</p>
      </div>

      {/* Charges Explained */}
      <div className="container my-5 text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
        <h3 className="fw-normal fs-4 text-dark mb-4">Charges explained</h3>

        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 pe-md-4">
            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Securities/Commodities transaction tax</h5>
              <p className="mb-2">
                Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&amp;O.
              </p>
              <p>
                When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Transaction/Turnover Charges</h5>
              <p className="mb-2">
                Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.
              </p>
              <ul className="ps-3 mb-0" style={{ listStyleType: "disc" }}>
                <li className="mb-2">
                  BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)
                </li>
                <li className="mb-2">
                  BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.
                </li>
                <li className="mb-2">
                  BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.
                </li>
                <li className="mb-2">
                  BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Call &amp; trade</h5>
              <p>
                Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Stamp charges</h5>
              <p>
                Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">NRI brokerage charges</h5>
              <ul className="ps-3 mb-0" style={{ listStyleType: "disc" }}>
                <li className="mb-1">
                  For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&amp;O (whichever is lower).
                </li>
                <li className="mb-1">
                  For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).
                </li>
                <li>
                  ₹500 + GST as yearly account maintenance charges (AMC) charges.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Account with debit balance</h5>
              <p>
                If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Charges for Investor's Protection Fund Trust (IPFT) by NSE</h5>
              <ul className="ps-3 mb-0" style={{ listStyleType: "disc" }}>
                <li className="mb-1">
                  Equity and Futures - ₹0.01 per crore + GST of the traded value.
                </li>
                <li className="mb-1">
                  Options - ₹0.01 per crore + GST traded value (premium value).
                </li>
                <li>
                  Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Margin Trading Facility (MTF)</h5>
              <ul className="ps-3 mb-0" style={{ listStyleType: "disc" }}>
                <li className="mb-1">
                  MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.
                </li>
                <li className="mb-1">
                  MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.
                </li>
                <li>
                  MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6 ps-md-4">
            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">GST</h5>
              <p>
                Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">SEBI Charges</h5>
              <p>
                Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">DP (Depository participant) charges</h5>
              <p className="mb-2">
                ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.
              </p>
              <p className="mb-2">
                Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.
              </p>
              <p>
                Debit transactions of mutual funds &amp; bonds get an additional discount of ₹0.25 on the CDSL fee.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Pledging charges</h5>
              <p>
                ₹30 + GST per pledge request per ISIN.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">AMC (Account maintenance charges)</h5>
              <p className="mb-2">
                Free for the first year on all new resident individual accounts.
              </p>
              <p className="mb-2">
                For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>Click here</a>
              </p>
              <p>
                For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>Click here</a>
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Corporate action order charges</h5>
              <p>
                ₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Off-market transfer charges</h5>
              <p>
                ₹25 per transaction.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Physical CMR request</h5>
              <p>
                First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Payment gateway charges</h5>
              <p>
                ₹9 + GST (Not levied on transfers done via UPI)
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Delayed Payment Charges</h5>
              <p>
                Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account. <a href="#" style={{ color: "#387ed1", textDecoration: "none" }}>Learn more.</a>
              </p>
            </div>

            <div className="mb-4">
              <h5 className="fs-6 text-dark fw-medium">Trading using 3-in-1 account with block functionality</h5>
              <ul className="ps-3 mb-0" style={{ listStyleType: "disc" }}>
                <li className="mb-1">
                  Delivery &amp; MTF Brokerage: 0.5% per executed order.
                </li>
                <li>
                  Intraday Brokerage: 0.05% per executed order.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 pt-3">
          <h5 className="fs-6 text-dark fw-medium">Disclaimer</h5>
          <p style={{ fontSize: "0.75rem" }}>
            For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;