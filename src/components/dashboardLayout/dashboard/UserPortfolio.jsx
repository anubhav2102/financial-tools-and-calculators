import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPortfolio.css";
import DetailedAIModal from "../AI/DetailedAIModal";

const UserPortfolio = () => {
    const [columns, setColumns] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showOpenAI, setShowOpenAI] = useState(false);
    let [aiData, setAiData] = useState({});
    let [loading, setLoading] = useState(false);
    let [exceldata, setexceldata] = useState('');

    const openAI = async (data) => {
        setShowOpenAI(true);
        let inputValue = data['Stock Name'];
        let respData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${inputValue}&outputsize=full&apikey=Z4PD4P1WP0CIJIEQ&interval=5min`);
        console.log(respData);
        setAiData(respData.data);
    }

    const closeAIModal = () => {
        setAiData({});
        setShowOpenAI(false);
    }

    const handleReportCreate = async () => {
        try {
            let prompt = `Please conduct a comprehensive financial analysis of the portfolio based on the given stock data. Include assessments of diversification, risk, return, and performance metrics for each stock. Additionally, calculate Compound Annual Growth Rate (CAGR), Sharpe Ratio, Treynor Ratio, and Information Ratio for the portfolio as a whole. Present the analysis in a structured format ensuring clarity and readability.`;
            prompt += exceldata;
            console.log(prompt);
            let resp = await axios.post('http://localhost:8000/api/v1/generate-gpt-report',{
                prompt: prompt
            });
            console.log(resp);
            let content = JSON.stringify(resp.data.data);
            console.log(content)
            const blob = new Blob([content], { type: 'application/pdf' });

            // Create a link element to download the PDF
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'report-portfolio.pdf';

            // Add the link to the document body and trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    }
    const getCurrentPrice = async (stockName) => {
        try {
            console.log(stockName);
        let resp = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=demo`);
        console.log(resp);
        let req = resp.data['Time Series (Daily)'];
        let allKeys = Object.keys(req);
        console.log(allKeys);
        console.log(req[allKeys[0]]);
        return req[allKeys[0]]['4. close'];
        } catch (error) {
            return 0;
        }
    }
    
    useEffect(()=>{
        const getPortfolioData = async () => {
            setLoading(true);
            try {
                let data = await axios.post('http://localhost:8000/api/v1/get-portfolio',{
                    email: localStorage.getItem('email_id')
                });
                console.log(data);
                if(data.data.code===200){
                    console.log(data.data.data);
                    let tempData = [];
                    for(let i=0;i<data.data.data.length;i++){
                        let obj = data.data.data[i];
                        let currentPrice = await getCurrentPrice(data.data.data[i]['Stock Name']);
                        obj['Current Price'] = '$'+currentPrice.toString();
                        obj['Current Value'] = '$'+currentPrice * data.data.data[i]['Stocks Bought'];
                        tempData.push(obj);
                    }
                    setTableData(tempData);
                    let excelData = "Stock Name\tStocks Bought\tPurchase Price\tTotal Purchase Price\tDate\tTrade Fees\tCAGR\tGain/Loss\t% Gain/Loss\n";
                        tempData.forEach(obj => {
                            excelData += `${obj['Stock Name']}\t${obj['Stocks Bought']}\t${obj['Purchase Price']}\t${obj['Total Purchase Price']}\t${obj['Date']}\t${obj['Trade Fees']}\t${obj['CAGR']}\t${obj['Gain/Loss']}\t${obj['% Gain/Loss']}\n`;
                        });
                    setexceldata(excelData);
                    let allKeys = Object.keys(tempData[0]);
                    console.log(allKeys);
                    allKeys.push('Ask AI?');
                    setColumns(allKeys);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getPortfolioData();
    }, []);
    
    return (
        <>
        <div className="table-container" style={{display:"flex",justifyContent:"center", height: "71vh"}}>
            {
                !loading ? (
                    <table className="table_personalProfile">
                <thead>
                    <tr>
                        {columns.map((item, idx) => (
                            <th key={idx}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    <div>
                                        {
                                            column==='Ask AI?' ? (
                                                <div style={{textAlign: "center"}}>
                                                <img src="/assets/eqai.svg" onClick={()=>openAI(rowData)} style={{height: "25px", cursor: "pointer"}} alt="" />
                                                </div>
                                            ) : (
                                                <>
                                                {rowData[column]}
                                                </>
                                            )
                                        }
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
                ) : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <img src="/assets/loadingripple.svg" style={{height: "150px"}} alt="" />
                        <span style={{textAlign: 'center', fontWeight: "600"}}>Dashboard loading...</span>
                    </div>
                )
            }
        </div>
        <div style={{display: "flex", justifyContent: "center", margin: "20px"}}>
            <button onClick={()=>handleReportCreate()} style={{cursor: "pointer", fontSize: "16px", padding: "13px", border: "none", borderRadius: "7px", background: "#7272ff", color: "white"}}>Generate AI based portfolio strategy report to invest better!</button>
        </div>
        {
            showOpenAI && (
                <>
                <div style={{position: "fixed", height: "100%", width: "100%", left: "0%", top: "0%", backgroundColor: "rgba(0, 0, 0, .7333333333333333)", zIndex: "9"}}>
                    <div style={{position: "fixed", height: "85vh", width: "90vw", left: "4rem", top: "3rem", background: "white", borderRadius: "10px"}}>
                        <div style={{textAlign: "end", margin: "10px 10px 0px 0px"}}>
                            <img onClick={closeAIModal} src="/assets/Close.svg" style={{height: "20px", cursor: "pointer"}} alt="" />
                        </div>
                        <div>
                            {
                                <>
                                <DetailedAIModal stockData={aiData} duration={'5 min'} />
                                </>
                            }
                        </div>
                    </div>
                </div>
                </>
            )
        }
        </>
    )
}

export default UserPortfolio;