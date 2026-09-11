import React from 'react';
import { Link } from 'react-router-dom';

function Education() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Left Column - Image */}
        <div className="col-12 col-md-6 text-center">
          <img
            src="/index-education.svg"
            alt="Varsity Education"
            style={{ width: "80%" }}
          />
        </div>

        {/* Right Column - Content */}
        <div className="col-12 col-md-6 mt-5 mt-md-0">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          
          <p className="text-muted">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>

          <Link
            to="/varsity"
            className="d-inline-block mb-4 text-decoration-none"
            style={{ color: "#387ed1" }}
          >
            Varsity <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
          </Link>

          <p className="text-muted">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>

          <Link
            to="/trading-qna"
            className="d-inline-block text-decoration-none"
            style={{ color: "#387ed1" }}
          >
            TradingQ&A <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;