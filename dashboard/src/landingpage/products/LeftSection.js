import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  productDesription, // Fallback for previous typo
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  const description = productDescription || productDesription;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Column */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={imageURL}
            alt={productName || "Product showcase"}
            className="img-fluid"
          />
        </div>

        {/* Content Column */}
        <div className="col-md-6 p-4 p-md-5">
          <h1 className="fw-bold mb-3">{productName}</h1>
          <p className="text-muted mb-4">{description}</p>

          {/* Links / Action Buttons */}
          <div className="d-flex align-items-center gap-4 mb-4">
            {tryDemo && (
              <a
                href={tryDemo}
                className="text-decoration-none text-primary fw-semibold"
              >
                Try Demo <i className="fa fa-arrow-right ms-1" aria-hidden="true"></i>
              </a>
            )}
            {learnMore && (
              <a
                href={learnMore}
                className="text-decoration-none text-primary fw-semibold"
              >
                Learn More <i className="fa fa-arrow-right ms-1" aria-hidden="true"></i>
              </a>
            )}
          </div>

          {/* App Store Badges */}
          {(googlePlay || appStore) && (
            <div className="d-flex align-items-center gap-3">
              {googlePlay && (
                <a href={googlePlay} target="_blank" rel="noopener noreferrer">
                  <img
                    src="googlePlayBadge.svg"
                    alt="Get it on Google Play"
                    style={{ height: "40px" }}
                  />
                </a>
              )}
              {appStore && (
                <a href={appStore} target="_blank" rel="noopener noreferrer">
                  <img
                    src="appstoreBadge.svg"
                    alt="Download on the App Store"
                    style={{ height: "40px" }}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSection;