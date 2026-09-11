import React from "react";

function RightSection({ 
  imageURL, 
  productName, 
  productDescription, 
  productDesription, // Fallback for previous typo
  learnMore 
}) {
  const description = productDescription || productDesription;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6 p-4 p-md-5">
          <h1 className="fw-bold mb-3">{productName}</h1>
          <p className="text-muted mb-4">{description}</p>
          <div>
            <a 
              href={learnMore || "/"} 
              className="text-decoration-none text-primary fw-semibold"
            >
              Learn More <i className="fa fa-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img 
            src={imageURL} 
            alt={productName || "Product representation"} 
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;