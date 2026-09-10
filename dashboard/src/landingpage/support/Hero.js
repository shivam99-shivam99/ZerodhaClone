import React from "react";

function Hero() {
  return (
    <div style={{ backgroundColor: "#fbfbfb" }} className="py-5 border-bottom">
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Header Row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-2 fw-medium text-dark m-0">Support Portal</h1>
          <a
            href="#"
            className="btn btn-primary px-4 py-2 text-white fw-medium text-decoration-none"
            style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
          >
            My tickets
          </a>
        </div>

        {/* Search Bar */}
        <div className="position-relative mb-2">
          <i
            className="fa fa-search position-absolute text-muted"
            style={{ left: "20px", top: "50%", transform: "translateY(-50%)" }}
          ></i>
          <input
            type="text"
            className="form-control form-control-lg bg-white border rounded shadow-sm ps-5 py-3"
            placeholder="Eg: How do I open my account, How do i activate F&O..."
            style={{ fontSize: "1rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;