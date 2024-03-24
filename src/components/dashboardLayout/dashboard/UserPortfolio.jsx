import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPortfolio.css";
import DetailedAIModal from "../AI/DetailedAIModal";

const UserPortfolio = () => {
    const [columns, setColumns] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showOpenAI, setShowOpenAI] = useState(false);
    let [aiData, setAiData] = useState({});

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

    const handleReportCreate = () => {
        console.log('')
    }

    useEffect(()=>{
        const getPortfolioData = async () => {
            try {
                let data = await axios.post('http://localhost:8000/api/v1/get-portfolio',{
                email: localStorage.getItem('email_id')
            });
            console.log(data);
            if(data.data.code===200){
                console.log(data.data.data);
                setTableData(data.data.data);
                let allKeys = Object.keys(data.data.data[0]);
                console.log(allKeys);
                allKeys.push('Actions');
                setColumns(allKeys);
            }
            } catch (error) {
                console.error(error);
            }
        }
        getPortfolioData();
    }, []);
    return (
        <>
        <div className="table-container" style={{display:"flex",justifyContent:"center"}}>
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
                                            column==='Actions' ? (
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
        </div>
        <div style={{display: "flex", justifyContent: "center", margin: "20px"}}>
            <button onClick={handleReportCreate()} style={{cursor: "pointer", fontSize: "16px", padding: "13px", border: "none", borderRadius: "7px", background: "#7272ff", color: "white"}}>Generate AI based portfolio strategy report to invest better!</button>
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