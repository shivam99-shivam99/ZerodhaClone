import React from 'react';

const Funds = () => {
  return (
    <>
      <div className="funds-container p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="text-muted m-0">Instant, zero-cost fund transfers with UPI</p>
          <div>
            <button className="btn btn-success me-2">Add funds</button>
            <button className="btn btn-blue text-white" style={{ backgroundColor: '#4184f3' }}>Withdraw</button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h5 className="fw-normal mb-3">Equity</h5>
            <div className="border p-3 rounded">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Available margin</span>
                <span className="fw-bold text-success">4,000.00</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Used margin</span>
                <span>0.00</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Available cash</span>
                <span>4,000.00</span>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="fw-normal mb-3">Commodity</h5>
            <div className="border p-3 rounded">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Available margin</span>
                <span className="fw-bold text-success">0.00</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Used margin</span>
                <span>0.00</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Available cash</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;