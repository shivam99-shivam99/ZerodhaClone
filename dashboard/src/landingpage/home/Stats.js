import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <div className="container py-5 my-3">
      <div className="row align-items-center g-4">
        {/* Left Column: Feature Highlights */}
        <div className="col-12 col-md-6 pe-md-4">
          <h1 className="fs-2 mb-4 text-dark fw-medium">Trust with confidence</h1>

          <div className="mb-4">
            <h2 className="fs-5 text-dark fw-medium">Customer-first always</h2>
            <p className="text-muted fs-6">
              That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments,
              making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="fs-5 text-dark fw-medium">No spam or gimmicks</h2>
            <p className="text-muted fs-6">
              No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.{" "}
              <Link to="/about" className="text-decoration-none" style={{ color: "#387ed1" }}>
                Our philosophies
              </Link>
            </p>
          </div>

          <div className="mb-4">
            <h2 className="fs-5 text-dark fw-medium">The Zerodha universe</h2>
            <p className="text-muted fs-6">
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="fs-5 text-dark fw-medium">Do better with money</h2>
            <p className="text-muted fs-6">
              With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
            </p>
          </div>
        </div>

        {/* Right Column: Image & Links */}
        <div className="col-12 col-md-6 text-center">
          <img
            src="/ecosystem.png"
            alt="Zerodha Ecosystem"
            className="img-fluid mb-4"
            style={{ maxWidth: "90%", height: "auto" }}
          />

          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <Link to="/products" className="text-decoration-none fw-medium" style={{ color: "#387ed1" }}>
              Explore our products <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </Link>

            <Link to="/signup" className="text-decoration-none fw-medium" style={{ color: "#387ed1" }}>
              Try Kite demo <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;