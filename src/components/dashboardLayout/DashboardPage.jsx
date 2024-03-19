import React, { useState } from 'react';
import SIPCalculator from '../calculators/SIPCalculator';
import LumpSumCalculator from '../calculators/LumpSumCalculator';
import MutualFundsCalculator from '../calculators/MutualFundsCalculator';
import { Routes, Route} from "react-router-dom";



const DashboardPage = () => {
    const [selectedCalculator, setSelectedCalculator] = useState('SIP Calculator');
    const switchSelector = (value) => {
        setSelectedCalculator(value);
    }
    return(
        <>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'baseline', margin: '10px'}}>
                <div style={{border: "none", borderBottom: (selectedCalculator === 'SIP Calculator') ? "3px solid blue" : "none", margin: "10px", paddingBottom: '10px'}}>
                    <span onClick={()=>switchSelector('SIP Calculator')} style={{cursor: "pointer"}}>SIP Calculator</span>
                </div>
                <div style={{border: "none", borderBottom: (selectedCalculator === 'LumpSum Calculator') ? "3px solid blue" : "none", margin: "10px", paddingBottom: '10px'}}>
                    <span onClick={()=>switchSelector('LumpSum Calculator')} style={{cursor: "pointer"}}>LumpSum Calculator</span>
                </div>
                <div style={{border: "none", borderBottom: (selectedCalculator === 'MutualFunds Calculator') ? "3px solid blue" : "none", margin: "10px", paddingBottom: "10px"}}>
                    <span onClick={()=> switchSelector('MutualFunds Calculator')} style={{cursor: "pointer"}}>Mutual Funds Calculator</span>
                </div>
            </div>
            <div style={{width: '70%'}}>

                
                <div style={{display: (selectedCalculator === 'SIP Calculator') ? '' : 'none'}}><SIPCalculator /></div>
                <div style={{display: (selectedCalculator === 'LumpSum Calculator') ? '' : 'none'}}><LumpSumCalculator /></div>
                <div style={{display: (selectedCalculator === 'MutualFunds Calculator') ? '' : 'none'}}><MutualFundsCalculator/></div>
            </div>
        </div>
        </>
    )
}

export default DashboardPage;