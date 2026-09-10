import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { API_BASE_URL } from "../apiConfig";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoldingsData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/allHoldings`);
        setAllHoldings(response.data);
      } catch (err) {
        console.error("Error fetching holdings data:", err);
        setError("Failed to load holdings.");
      } finally {
        setLoading(false);
      }
    };
    fetchHoldingsData();
  }, []);

  // Compute metrics
  const totalInvestment = allHoldings.reduce((acc, s) => acc + (s.avg || 0) * (s.qty || 0), 0);
  const totalCurrentValue = allHoldings.reduce((acc, s) => acc + (s.price || 0) * (s.qty || 0), 0);
  const totalPnl = totalCurrentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnl / totalInvestment) * 100).toFixed(2) : "0.00";

  // Single dataset for stock prices to match vertical height scaling
  const labels = allHoldings.map((stock) => stock.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (loading) return <div>Loading holdings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ width: "70%", padding: "30px 40px", backgroundColor: "#fff" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#444", marginBottom: "25px" }}>
        Holdings ({allHoldings.length})
      </h3>

      <div style={{ display: "flex", gap: "40px", marginBottom: "30px", borderBottom: "1px solid #eee" }}>
        <SummaryCard label="Investment" value={`₹${totalInvestment.toFixed(2)}`} />
        <SummaryCard label="Current value" value={`₹${totalCurrentValue.toFixed(2)}`} />
        <SummaryCard
          label="P&L"
          value={`${totalPnl >= 0 ? "+" : ""}₹${totalPnl.toFixed(2)} (${totalPnl >= 0 ? "+" : ""}${pnlPercent}%)`}
          valueColor={totalPnl >= 0 ? "#4fa843" : "#df514c"}
        />
      </div>

      {allHoldings.length > 0 && (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "right" }}>
            <thead>
              <tr style={{ color: "#9b9b9b", borderBottom: "1px solid #eee", height: "35px" }}>
                <th style={{ textAlign: "left", paddingLeft: "10px" }}>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th style={{ paddingRight: "10px" }}>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, index) => {
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const pnl = curValue - (stock.avg || 0) * (stock.qty || 0);
                const isProfit = pnl >= 0;

                return (
                  <tr key={stock._id || index} style={{ borderBottom: "1px solid #f4f4f4", height: "42px" }}>
                    <td style={{ textAlign: "left", paddingLeft: "10px", fontWeight: "500" }}>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg ? stock.avg.toFixed(2) : "0.00"}</td>
                    <td>{stock.price ? stock.price.toFixed(2) : "0.00"}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td style={{ color: isProfit ? "#4fa843" : "#df514c" }}>
                      {isProfit ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
                    </td>
                    <td style={{ color: isProfit ? "#4fa843" : "#df514c" }}>{stock.net}</td>
                    <td style={{ paddingRight: "10px" }}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Chart Wrapper Container */}
          <div style={{ width: "100%", height: "400px", marginTop: "40px" }}>
            <VerticalGraph data={chartData} />
          </div>
        </>
      )}
    </div>
  );
};

const SummaryCard = ({ label, value, valueColor = "#444" }) => (
  <div>
    <p style={{ fontSize: "12px", color: "#9b9b9b", margin: 0 }}>{label}</p>
    <h2 style={{ fontSize: "20px", fontWeight: "400", color: valueColor, margin: "5px 0 0" }}>{value}</h2>
  </div>
);

export default Holdings;