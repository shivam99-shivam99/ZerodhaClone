import React from "react";
import { Link } from "react-router-dom";

const PRICING_HIGHLIGHTS = [
  {
    amount: "0",
    label: (
      <>
        Free account
        <br />
        opening
      </>
    ),
  },
  {
    amount: "0",
    label: (
      <>
        Free equity delivery
        <br />
        and direct mutual funds
      </>
    ),
  },
  {
    amount: "20",
    label: (
      <>
        Intraday and
        <br />
        F&O
      </>
    ),
  },
];

function Pricing() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* LEFT SIDE */}
        <div className="col-12 col-md-5">
          <h1 className="mb-4 fs-2 fw-normal">Unbeatable pricing</h1>

          <p className="fs-5 lh-lg">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <Link
            to="/pricing"
            style={{
              textDecoration: "none",
              color: "#387ed1",
              fontSize: "18px",
            }}
          >
            See pricing
            <i
              className="fa fa-long-arrow-right ms-2"
              aria-hidden="true"
            ></i>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-md-7 mt-5 mt-md-0">
          <div className="row g-3 align-items-center">
            {PRICING_HIGHLIGHTS.map((item, index) => (
              <div className="col-12 col-sm-4" key={index}>
                <div className="d-flex align-items-center justify-content-start">
                  <h1
                    className="mb-0"
                    style={{
                      fontSize: "65px",
                      fontWeight: "500",
                      color: "#f5a623",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>₹</span>
                    {item.amount}
                  </h1>

                  <p
                    className="ms-3 mb-0"
                    style={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;