import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="/homeHero.png"
          alt="Zerodha trading dashboard"
          data-testid="hero-image"
          className="mb-5"
          style={{ width: "100%", maxWidth: "1500px", display: "block", margin: "0 auto" }}
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p className="text-muted fs-5">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <Link
          to="/Signup"
          className="btn btn-primary fs-5 mb-5 mt-3"
          style={{ width: "20%", minWidth: "180px", margin: "0 auto", backgroundColor: "#387ed1", borderColor: "#387ed1" }}
        >
          Sign up now
        </Link>
      </div>
    </div>
  );
}

export default Hero;