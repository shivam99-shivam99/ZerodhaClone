import React from "react";
import { Link } from "react-router-dom";

const ACCOUNT_LINKS = [
  { name: "Open demat account", path: "/signup" },
  { name: "Minor demat account", path: "/signup" },
  { name: "NRI demat account", path: "/signup" },
  { name: "HUF demat account", path: "/signup" },
  { name: "Commodity", path: "/products" },
  { name: "Dematerialisation", path: "/support" },
  { name: "Fund transfer", path: "/support" },
  { name: "MTF", path: "/products" },
];

const SUPPORT_LINKS = [
  { name: "Contact us", path: "/about" },
  { name: "Support portal", path: "/support" },
  { name: "How to file a complaint?", path: "/support" },
  { name: "Status of your complaints", path: "/support" },
  { name: "Bulletin", path: "/support" },
  { name: "Circular", path: "/support" },
  { name: "Z-Connect blog", path: "/about" },
  { name: "Downloads", path: "/support" },
];

const COMPANY_LINKS = [
  { name: "About", path: "/about" },
  { name: "Philosophy", path: "/about" },
  { name: "Press & media", path: "/about" },
  { name: "Careers", path: "/about" },
  { name: "Zerodha Cares (CSR)", path: "/about" },
  { name: "Zerodha.tech", path: "/about" },
  { name: "Open source", path: "/about" },
  { name: "Referral program", path: "/pricing" },
];

const QUICK_LINKS = [
  { name: "Upcoming IPOs", path: "/products" },
  { name: "Brokerage charges", path: "/pricing" },
  { name: "Market holidays", path: "/support" },
  { name: "Economic calendar", path: "/products" },
  { name: "Calculators", path: "/pricing" },
  { name: "Markets", path: "/products" },
  { name: "Sectors", path: "/products" },
  { name: "Gift Nifty", path: "/products" },
];

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
              <Link to="/about" className="text-muted"><i className="fa-brands fa-x-twitter"></i></Link>
              <Link to="/about" className="text-muted"><i className="fa-brands fa-square-facebook"></i></Link>
              <Link to="/about" className="text-muted"><i className="fa-brands fa-instagram"></i></Link>
              <Link to="/about" className="text-muted"><i className="fa-brands fa-linkedin-in"></i></Link>
            </div>

            {/* Second Row of Social Icons */}
            <div className="text-muted fs-5 d-flex gap-3 mb-4">
              <Link to="/about" className="text-muted"><i className="fa-brands fa-youtube"></i></Link>
              <Link to="/about" className="text-muted"><i className="fa-brands fa-whatsapp"></i></Link>
              <Link to="/about" className="text-muted"><i className="fa-brands fa-telegram"></i></Link>
            </div>

            {/* App Store / Google Play Store Badges */}
            <div className="d-flex gap-2 align-items-center">
              <Link to="/products">
                <img
                  src="/googlePlayBadge.svg"
                  alt="Get it on Google Play"
                  style={{ width: "115px" }}
                />
              </Link>
              <Link to="/products">
                <img
                  src="/appstoreBadge.svg"
                  alt="Download on the App Store"
                  style={{ width: "115px" }}
                />
              </Link>
            </div>
          </div>

          {/* Column 2: Account */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Account</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              {ACCOUNT_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-decoration-none text-muted">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Support</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              {SUPPORT_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-decoration-none text-muted">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Company</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              {COMPANY_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-decoration-none text-muted">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Quick links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Quick links</h6>
            <ul className="list-unstyled small text-muted lh-lg mb-3">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-decoration-none text-muted">
                    {link.name}
                  </Link>
                </li>
              ))}
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
            <Link to="/support" className="text-primary text-decoration-none fw-bold me-2">Smart Online Dispute Resolution</Link> | <Link to="/support" className="text-primary text-decoration-none fw-bold ms-2">Grievances Redressal Mechanism</Link>
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>
          <p>
            Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
          </p>
          <p>
            India's largest broker based on networth as per NSE. <Link to="/about" className="text-primary text-decoration-none">NSE broker factsheet</Link>
          </p>
          <p>
            "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers/depository participants. Receive information of your transactions directly from Exchange/Depositories on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.
          </p>
          <p>
            *Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;