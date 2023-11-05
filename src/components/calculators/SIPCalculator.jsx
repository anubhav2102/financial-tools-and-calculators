import React, { useState } from 'react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateSIP = () => {
    if (monthlyInvestment <= 0 || annualInterestRate <= 0 || investmentDuration <= 0) {
      return;
    }
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfMonths = investmentDuration * 12;
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate));
    setTotalAmount(futureValue.toFixed(2));
  };
  return (
    <div>
      <h2>SIP Calculator</h2>
      <div>
        <label>Monthly Investment (₹):</label>
        <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)}
        />
      </div>
      <div>
        <label>Expected Return Rate (%):</label>
        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)}
        />
      </div>
      <div>
        <label>Investment Duration (years):</label>
        <input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(e.target.value)}/>
      </div>
      <button onClick={calculateSIP}>Calculate</button>
      {totalAmount > 0 && (
        <div>
          <h3>Total Amount: ₹{totalAmount}</h3>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;