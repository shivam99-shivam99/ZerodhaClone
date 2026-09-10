import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        {/* Smallcase */}
        <div className="col-4 p-3 mt-5">
          <img
            src="../smallcaseLogo.png"
            style={{ width: "50%" }}
            alt="Smallcase"
          />
          <p className="text-small text-muted mt-2">Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
        </div>

        {/* Streak */}
        <div className="col-4 p-3 mt-5">
          <img
            src="../streakLogo.png"
            style={{ width: "45%" }}
            alt="Streak"
          />
          <p className="text-small text-muted mt-2">Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>

        {/* Tijori */}
        <div className="col-4 p-3 mt-5">
          <img
            src="../tijori.svg"
            style={{ width: "45%" }}
            alt="Tijori"
          />
          <p className="text-small text-muted mt-2">Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.</p>
        </div>

        {/* Zerodha Fund House */}
        <div className="col-4 p-3 mt-5">
          <img
            src="../zerodhaFundhouse.png"
            style={{ width: "55%" }}
            alt="Zerodha Fundhouse"
          />
          <p className="text-small text-muted mt-2">Our asset management venture that is creating simple and transparent index funds to help you save for your goals.</p>
        </div>

        {/* Sensibull */}
        <div className="col-4 p-3 mt-5">
          <img
            src="../sensibullLogo (1).svg"
            style={{ width: "55%" }}
            alt="Sensibull"
          />
          <p className="text-small text-muted mt-2">Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.</p>
        </div>

        {/* Ditto */}
        <div className="col-4 p-3 mt-5">
          <img
            src="../dittoLogo.png"
            style={{ width: "35%" }}
            alt="Ditto"
          />
          <p className="text-small text-muted mt-2">Personalised advice on life and health insurance, with no spam and no mis-selling.</p>
        </div>

        {/* Signup Button */}
        <div className="col-12 mt-4 mb-5">
          <button
            className="p-2 btn btn-primary fs-5"
            style={{ width: "20%", minWidth: "180px", margin: "0 auto" }}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;