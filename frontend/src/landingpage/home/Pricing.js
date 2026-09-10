import React from "react";

function Pricing() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        {/* LEFT SIDE */}
        <div className="col-12 col-md-5">
          <h1 className="mb-4 fs-2 fw-normal">
            Unbeatable pricing
          </h1>

          <p className="fs-5 lh-lg">
            We pioneered the concept of discount broking and price
            transparency in India. Flat fees and no hidden charges.
          </p>

          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#387ed1",
              fontSize: "18px"
            }}
          >
            See pricing
            <i
              className="fa fa-long-arrow-right ms-2"
              aria-hidden="true"
            ></i>
          </a>
        </div>


        {/* RIGHT SIDE */}
        <div className="col-12 col-md-7 mt-5 mt-md-0">

          <div className="row align-items-center">

            {/* ₹0 */}
            <div className="col">
              <div className="d-flex align-items-center">

                <h1
                  className="mb-0"
                  style={{
                    fontSize: "65px",
                    fontWeight: "500",
                    color: "#f5a623"
                  }}
                >
                  <span style={{ fontSize: "20px" }}>₹</span>0
                </h1>

                <p
                  className="ms-3 mb-0"
                  style={{
                    fontSize: "14px",
                    color: "#555"
                  }}
                >
                  Free account
                  <br />
                  opening
                </p>

              </div>
            </div>


            {/* ₹0 */}
            <div className="col">
              <div className="d-flex align-items-center">

                <h1
                  className="mb-0"
                  style={{
                    fontSize: "65px",
                    fontWeight: "500",
                    color: "#f5a623"
                  }}
                >
                  <span style={{ fontSize: "20px" }}>₹</span>0
                </h1>

                <p
                  className="ms-3 mb-0"
                  style={{
                    fontSize: "14px",
                    color: "#555"
                  }}
                >
                  Free equity delivery
                  <br />
                  and direct mutual funds
                </p>

              </div>
            </div>


            {/* ₹20 */}
            <div className="col">
              <div className="d-flex align-items-center">

                <h1
                  className="mb-0"
                  style={{
                    fontSize: "65px",
                    fontWeight: "500",
                    color: "#f5a623"
                  }}
                >
                  <span style={{ fontSize: "20px" }}>₹</span>20
                </h1>

                <p
                  className="ms-3 mb-0"
                  style={{
                    fontSize: "14px",
                    color: "#555"
                  }}
                >
                  Intraday and
                  <br />
                  F&O
                </p>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;