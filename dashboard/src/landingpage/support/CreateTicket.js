import React, { useState } from "react";

function CreateTicket() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const topics = [
    {
      title: "Account Opening",
      icon: "fa-plus-circle",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF",
        "NRI Account Opening",
        "Charges at Zerodha",
        "Zerodha IDFC FIRST Bank 3-in-1",
        "Getting Started",
      ],
    },
    {
      title: "Your Zerodha Account",
      icon: "fa-regular fa-circle-user",
      links: [
        "Login Credentials",
        "Your Profile",
        "Account Modification",
        "CMR & DP ID",
        "Nomination",
        "Transfer and Conversion",
      ],
    },
    {
      title: "Kite",
      icon: "fa fa-compass",
      links: [
        "Trading FAQs",
        "Kite App & Web",
        "Margins & Orders",
        "Corporate Actions",
        "Sentinel",
        "Kite API",
      ],
    },
    {
      title: "Funds",
      icon: "fa-inr",
      links: [
        "Fund Withdrawal",
        "Adding Funds",
        "eMandate",
        "Adding Bank Accounts",
      ],
    },
    {
      title: "Console",
      icon: "fa fa-copyright",
      links: [
        "IPO & Portfolio",
        "Ledger & Reports",
        "Tax P&L",
        "Downloads",
      ],
    },
    {
      title: "Coin",
      icon: "fa-pie-chart",
      links: [
        "Understanding Mutual Funds",
        "Coin Web & App",
        "National Pension Scheme (NPS)",
      ],
    },
  ];

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left Side: Accordions */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {topics.map((topic, index) => (
              <div key={index} className="border rounded bg-white shadow-sm">
                <div
                  className="d-flex align-items-center justify-content-between p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSection(index)}
                >
                  <div className="d-flex align-items-center gap-3">
                    <i className={`fa ${topic.icon} fs-5 text-primary`}></i>
                    <span className="fs-6 text-dark fw-normal">{topic.title}</span>
                  </div>
                  <i 
                    className={`fa fa-chevron-${openSection === index ? "up" : "down"} text-primary`}
                    style={{ transition: "transform 0.2s" }}
                  ></i>
                </div>
                
                {/* Expandable Links Section */}
                {openSection === index && (
                  <div className="p-3 border-top bg-light">
                    <ul 
                      className="mb-0 d-flex flex-column gap-2 ms-4" 
                      style={{ listStyleType: "disc" }}
                    >
                      {topic.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a href="/" className="text-decoration-none text-primary" style={{ fontSize: "0.9rem" }}>
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div className="col-lg-4">
          {/* Top Notice Box */}
          <div
            className="p-3 mb-4 rounded shadow-sm"
            style={{ 
              backgroundColor: "#FFF5E7", 
              borderLeft: "5px solid #FF8C00" 
            }}
          >
            <ul className="ps-3 mb-0 d-flex flex-column gap-2" style={{ fontSize: "0.9rem" }}>
              <li>
                <a href="/" className="text-decoration-underline text-primary">
                  <h6 className="mb-0">Surveillance measure on scrips - August 2026</h6>
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-underline text-primary">
                  <h6 className="mb-0">Latest Intraday leverages and Square-off timings</h6>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Card */}
          <div className="border rounded bg-white shadow-sm">
            <div className="p-3 border-bottom text-dark fw-medium" style={{ backgroundColor: "#f8f9fa", fontSize: "0.95rem" }}>
              Quick links
            </div>
            <div className="list-group list-group-flush" style={{ fontSize: "0.9rem" }}>
              <a href="/" className="list-group-item list-group-item-action py-3 text-primary border-0 border-bottom">
                1. Track account opening
              </a>
              <a href="/" className="list-group-item list-group-item-action py-3 text-primary border-0 border-bottom">
                2. Track segment activation
              </a>
              <a href="/" className="list-group-item list-group-item-action py-3 text-primary border-0 border-bottom">
                3. Intraday margins
              </a>
              <a href="/" className="list-group-item list-group-item-action py-3 text-primary border-0 border-bottom">
                4. Kite user manual
              </a>
              <a href="/" className="list-group-item list-group-item-action py-3 text-primary border-0">
                5. Learn how to create a ticket
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;