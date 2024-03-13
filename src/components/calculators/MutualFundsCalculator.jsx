import React, { useState } from 'react';
import axios from 'axios';
import GetAllNotes from './GetAllNotes';

const MutualFundsCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [id, setId] = useState('');
  const [editStatus, setEditStatus] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [investCondition, setInvestCondition] = useState('');
  const [investType, setInvestType] = useState('');

  const calculate = () => {
    if (monthlyInvestment <= 0 || annualInterestRate <= 0 || investmentDuration <= 0) {
      return;
    }
    if(investType==='monthly'){
        console.log('code in sip');
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfMonths = investmentDuration * 12;
        const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate));
        setTotalAmount(futureValue.toFixed(2));
    }else{
        console.log('code in lumpsum')
        const numberOfYears = investmentDuration;
        const futureValue = monthlyInvestment * Math.pow(1 + annualInterestRate / 100, numberOfYears);
        setTotalAmount(futureValue.toFixed(2));
    }
  };
  const handleSaveNote = async () =>{
    if(!investCondition || !investType){
        alert("Select investment options");
        return;
    }
    if (monthlyInvestment <= 0 || annualInterestRate <= 0 || investmentDuration <= 0 || totalAmount <= 0) {
      alert("Please configure to save!");
      return;
    }
    if(localStorage.getItem('email_id')){
      console.log(localStorage.getItem("email_id"));
      let obj = {};
      if(investType === 'monthly'){
        obj = {investment: monthlyInvestment, annualInterestRate: annualInterestRate, investmentDuration: investmentDuration, totalAmount: totalAmount, calculatorType: 'MutualFunds Calculator', investType: (investType==='monthly') ? "Monthly (SIP)" :"At Once (LumpSum)"};
      }else{
        obj = {investment: monthlyInvestment, annualInterestRate: annualInterestRate, investmentDuration: investmentDuration, totalAmount: totalAmount, calculatorType: 'MutualFunds Calculator', investType: (investType==='monthly') ? "Monthly (SIP)" : "At Once (LumpSum)"};
      }
      console.log(obj);
      if(editStatus===true){
        try {
          let data = {email: localStorage.getItem("email_id"), note: obj, id: id};
          let response = await axios.post("http://localhost:8000/api/v1/update-note", data);
          console.log(response);
          if(response.status===200){
            setMonthlyInvestment(0);
            setAnnualInterestRate(0);
            setInvestmentDuration(0);
            setTotalAmount(0);
            setInvestType('');
            setInvestCondition('');
            setId('');
            setEditStatus(false);
            return;
        }
        } catch (error) {
          console.error(error);
        }
      }
      try {
        let data = {email: localStorage.getItem("email_id"), note: obj};
        let response = await axios.post("http://localhost:8000/api/v1/save-note", data);
        console.log(response);
        if(response.status===200){
          setMonthlyInvestment(0);
          setAnnualInterestRate(0);
          setInvestmentDuration(0);
          setTotalAmount(0);
          setInvestType('');
          setInvestCondition('');
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  function handleEditNote (data) {
    console.log(data);
    setMonthlyInvestment(data.note.investment);
    setAnnualInterestRate(data.note.annualInterestRate);
    setInvestmentDuration(data.note.investmentDuration);
    setId(data.note._id);
    setInvestType(data.note.investType);
    setInvestCondition(data.note.setInvestCondition);
    setEditStatus(true);
  }
  return (
    <div>
      <div style={{
                height: '40vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
      <h2>Mutual Funds Calculator</h2>
      <div style={{height: '12vh'}}>
      <div style={{marginTop: "10px",display: "flex",
    justifyContent: 'space-evenly', alignItems: 'center'}}>
        <span>I know my </span>
        <span>
            <input type="radio" name="condition" value="target" onChange={(e)=>{setInvestCondition(e.target.value)}} />
            <span>Target Amount</span>
        </span>
        <span>
            <input type="radio" name="condition" value="current" onChange={(e)=>{setInvestCondition(e.target.value)}} />
            <span>Current Investment Amount</span>
        </span>
      </div>
      <div style={{marginTop: "10px", marginBottom: "10px", display: "flex",
    justifyContent: 'space-evenly', alignItems: 'center'}}>
        <span>I want to invest </span>
        <span>
            <input type="radio" name="type" value="monthly" onChange={(e)=>{setInvestType(e.target.value)}} />
            <span>Monthly (SIP)</span>
        </span>
        <span>
            <input type="radio" name="type" value="once" onChange={(e)=>{setInvestType(e.target.value)}} />
            <span>At Once (Lumpsum)</span>
        </span>
      </div>
      </div>
      <div style={{display: 'flex'}}>
      <div>
        <label style={{marginLeft: '10px', marginRight: '10px'}}>Investment Amount (₹):</label>
        <input style={{border: 'none', borderBottom: '1px solid grey'}} type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)}
        />
      </div>
      <div>
        <label style={{marginLeft: '10px', marginRight: '10px'}}>Annual Interest Rate (%):</label>
        <input style={{border: 'none', borderBottom: '1px solid grey'}} type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)}
        />
      </div>
      <div>
        <label style={{marginLeft: '10px', marginRight: '10px'}}>Investment Duration (years):</label>
        <input style={{border: 'none', borderBottom: '1px solid grey'}} type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(e.target.value)}/>
      </div>
      </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around', height: '5vh'}}>
      <button style={{width: 'fit-content', height: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}} onClick={calculate}>Calculate</button>
      <button style={{width: 'fit-content', height: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}} disabled={!localStorage.getItem("email_id")} onClick={handleSaveNote}>Save to the note</button>
      </div>
      {totalAmount > 0 && (
        <div>
          <h3>Total Amount: ₹{totalAmount}</h3>
        </div>
      )}
      <div>
        {
          localStorage.getItem("email_id") && (
          <div>
            <GetAllNotes editToBeData={handleEditNote} calculatorType={'MutualFunds Calculator'} />
          </div>
          )
        }
      </div>
    </div>
  );
};

export default MutualFundsCalculator;