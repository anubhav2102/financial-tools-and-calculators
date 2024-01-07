import React, { useState } from 'react';
import GetAllNotes from './GetAllNotes';
import axios from 'axios';

const LumpSumCalculator = () => {
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [annualInterestRate, setAnnualInterestRate] = useState(0);
    const [investmentDuration, setInvestmentDuration] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [id, setId] = useState('');
    const [editStatus, setEditStatus] = useState(false);

    const calculateAmount = () => {
        if (investmentAmount <= 0 || annualInterestRate <= 0 || investmentDuration <= 0) {
            return;
          }
          const numberOfYears = investmentDuration;
          const futureValue = investmentAmount * Math.pow(1 + annualInterestRate / 100, numberOfYears);
          setTotalAmount(futureValue.toFixed(2));
    }
    const handleSaveNote = async () => {
        if (investmentAmount <= 0 || annualInterestRate <= 0 || investmentDuration <= 0 || totalAmount <= 0) {
          alert('Please configure to save!');
          return;
        }
        if (localStorage.getItem('email_id')) {
          let obj = {
            investment: investmentAmount,
            annualInterestRate: annualInterestRate,
            investmentDuration: investmentDuration,
            totalAmount: totalAmount,
            calculatorType: "LumpSum Calculator"
          };
          if(editStatus===true){
            try {
              let data = {email: localStorage.getItem("email_id"), note: obj, id: id};
              let response = await axios.post("http://localhost:3000/api/v1/update-note", data);
              console.log(response);
              if(response.status===200){
                setInvestmentAmount(0);
                setAnnualInterestRate(0);
                setInvestmentDuration(0);
                setTotalAmount(0);
                setId('');
                setEditStatus(false);
                return;
            }
            } catch (error) {
              console.error(error);
            }
          }
          try {
            let data = { email: localStorage.getItem('email_id'), note: obj };
            let response = await axios.post('http://localhost:3000/api/v1/save-note', data);
            if (response.status === 200) {
              setInvestmentAmount(0);
              setAnnualInterestRate(0);
              setInvestmentDuration(0);
              setTotalAmount(0);
              return;
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      function handleEditNote (data) {
        console.log(data);
        setInvestmentAmount(data.note.investment);
        setAnnualInterestRate(data.note.annualInterestRate);
        setInvestmentDuration(data.note.investmentDuration);
        setId(data.note._id);
        setEditStatus(true);
      }
    return (
        <>
        <div>
            <div style={{
                height: '30vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
            <h2>LumpSum Calculator</h2>
            <div style={{display: 'flex'}}>
            <div>
                <label style={{marginLeft: '10px', marginRight: '10px'}}>Investment Amount (₹):</label>
                <input style={{border: 'none', borderBottom: '1px solid grey'}} type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)}/>
            </div>
            <div>
                <label style={{marginLeft: '10px', marginRight: '10px'}}>Expected Return Rate (%):</label>
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
            <button style={{width: 'fit-content', height: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}} onClick={calculateAmount}>Calculate</button>
            <button style={{width: 'fit-content', height: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}}  disabled={!localStorage.getItem("email_id")} onClick={handleSaveNote}>Save to the note</button>
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
                    <GetAllNotes editToBeData={handleEditNote} calculatorType={'LumpSum Calculator'} />
                </div>
                )
                }
            </div>
        </div>
        </>
    )
}

export default LumpSumCalculator;