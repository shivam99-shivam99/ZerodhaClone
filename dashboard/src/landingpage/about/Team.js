import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-12 col-md-6 p-3 text-center">
          <img
            src="nithinKamath.jpg"
            alt="Nithin Kamath - Founder and CEO of Zerodha"
            style={{ borderRadius: "100%", width: "50%", minWidth: "150px" }}
          />
          <h4 className="mt-4">Nithin Kamath</h4>
          <h6>Founder, CEO</h6>
        </div>

        <div className="col-12 col-md-6 p-3">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on{" "}
            <Link to="/" className="text-decoration-none" style={{ color: "#387ed1" }}>
              Homepage
            </Link>{" "}
            /{" "}
            <Link to="/trading-qna" className="text-decoration-none" style={{ color: "#387ed1" }}>
              TradingQnA
            </Link>{" "}
            /{" "}
            <a
              href="https://twitter.com/nithinkamath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ color: "#387ed1" }}
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;