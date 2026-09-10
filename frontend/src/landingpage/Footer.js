import React from "react";

function Footer() {
  return (
    <footer className="border-top bg-light pt-5 pb-4 mt-5">
      <div className="container">
        {/* Upper Footer - Grid Columns */}
        <div className="row mb-4">
          {/* Column 1: Logo, Social Icons, App Store Badges */}
          <div className="col-lg-3 col-md-6 mb-4">
            <img
               src="/logo.svg"
              style={{ width: "50%", minWidth: "120px" }}
              alt="Zerodha Logo"
              className="mb-3"
            />
            <p className="text-muted small mb-3">
              © 2010 - 2026, Zerodha Broking Ltd.
              <br />
              All rights reserved.
            </p>

            {/* First Row of Social Icons */}
            <div className="text-muted fs-5 d-flex gap-3 mb-3">
              <a href="#" className="text-muted"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-square-facebook"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>

            {/* Second Row of Social Icons */}
            <div className="text-muted fs-5 d-flex gap-3 mb-4">
              <a href="#" className="text-muted"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-telegram"></i></a>
            </div>

            {/* App Store / Google Play Store Badges */}
            <div className="d-flex gap-2 align-items-center">
              <a href="#">
                <img
                  src="/googlePlayBadge.svg"
                  alt="Get it on Google Play"
                  style={{ width: "115px" }}
                />
              </a>
              <a href="#">
                <img
                  src="/appstoreBadge.svg"
                  alt="Download on the App Store"
                  style={{ width: "115px" }}
                />
              </a>
            </div>
          </div>

          {/* Column 2: Account */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Account</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              <li><a href="#" className="text-decoration-none text-muted">Open demat account</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Minor demat account</a></li>
              <li><a href="#" className="text-decoration-none text-muted">NRI demat account</a></li>
              <li><a href="#" className="text-decoration-none text-muted">HUF demat account</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Commodity</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Dematerialisation</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Fund transfer</a></li>
              <li><a href="#" className="text-decoration-none text-muted">MTF</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Support</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              <li><a href="#" className="text-decoration-none text-muted">Contact us</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Support portal</a></li>
              <li><a href="#" className="text-decoration-none text-muted">How to file a complaint?</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Status of your complaints</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Bulletin</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Circular</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Z-Connect blog</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Downloads</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Company</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              <li><a href="#" className="text-decoration-none text-muted">About</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Philosophy</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Press & media</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Careers</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Zerodha Cares (CSR)</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Zerodha.tech</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Open source</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Referral program</a></li>
            </ul>
          </div>

          {/* Column 5: Quick links & Markets */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Quick links</h6>
            <ul className="list-unstyled small text-muted lh-lg mb-3">
              <li><a href="#" className="text-decoration-none text-muted">Upcoming IPOs</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Brokerage charges</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Market holidays</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Economic calendar</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Calculators</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Markets</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Sectors</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Gift Nifty</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Text / Fine Print */}
        <div className="mt-4 pt-3 text-muted" style={{ fontSize: "11px", lineHeight: "1.7" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a href="mailto:complaints@zerodha.com" className="text-primary text-decoration-none">complaints@zerodha.com</a>, for DP related to <a href="mailto:dp@zerodha.com" className="text-primary text-decoration-none">dp@zerodha.com</a>. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
          </p>
          <p>
            <a href="#" className="text-primary text-decoration-none fw-bold me-2">Smart Online Dispute Resolution</a> | <a href="#" className="text-primary text-decoration-none fw-bold">Grievances Redressal Mechanism</a>
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>
          <p>
            Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
          </p>
          <p>
            India's largest broker based on networth as per NSE. <a href="#" className="text-primary text-decoration-none">NSE broker factsheet</a>
          </p>
          <p>
            "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers/depository participants. Receive information of your transactions directly from Exchange/Depositories on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.
          </p>
          <p>
            *Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.
          </p>
          <p>
            Fixed deposit products offered on this platform are third-party products (TPP) and are not Exchange traded products. These are offered through Blostem Fintech Private Limited. Zerodha Broking Limited (SEBI Registration No.: INZ000031633) is acting solely as a distributor for these products. Any disputes arising with respect to such distribution activity will not have access to SEBI SCORES/ODR, Exchange Investor Grievance Redressal Forum, or Arbitration mechanism. Fixed deposits are regulated by the Reserve Bank of India (RBI).
          </p>
        </div>

        {/* Bottom Policy Links Bar */}
        <div className="d-flex flex-wrap justify-content-center gap-3 pt-3 border-top mt-4" style={{ fontSize: "12px" }}>
          <a href="#" className="text-muted text-decoration-none">NSE</a>
          <a href="#" className="text-muted text-decoration-none">BSE</a>
          <a href="#" className="text-muted text-decoration-none">MCX</a>
          <a href="#" className="text-muted text-decoration-none">MSEI</a>
          <a href="#" className="text-muted text-decoration-none">Terms & conditions</a>
          <a href="#" className="text-muted text-decoration-none">Policies & procedures</a>
          <a href="#" className="text-muted text-decoration-none">Privacy policy</a>
          <a href="#" className="text-muted text-decoration-none">Disclosure</a>
          <a href="#" className="text-muted text-decoration-none">For investor's attention</a>
          <a href="#" className="text-muted text-decoration-none">Investor charter</a>
          <a href="#" className="text-muted text-decoration-none">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;