import React, { useEffect, useState } from "react";
import axios from "axios";
const XLSX = require('xlsx');

const PersonalProfile = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [workBookData, setWorkBookData] = useState([]);
    const handleLogout = () => {
        console.log('workign')
        if(localStorage.getItem('email_id')){
        localStorage.removeItem('email_id');
        setLoginStatus(false);
        window.location.reload(true);
        window.location.href = window.location.origin + "/";
        }
    }
    const handleUploadXLFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = parseExcelData(data);
            console.log(workbook);
            setWorkBookData(workbook)
        };
    
        reader.onerror = (event) => {
            console.error("File could not be read! Error:", event.target.error);
        };
    
        reader.readAsArrayBuffer(file);
    };
    
    
    const parseExcelData = (data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        return jsonData;
    };
    
    const handleMoreCustomized = () => {
        console.log('working')
    }

    const savePortfolio = async () => {
        try {
            if(!localStorage.getItem('email_id')){
                alert('Please login to continue');
                return;
            }
            const res = await axios.post("http://localhost:3000/api/v1/save-portfolio", {
                email: localStorage.getItem('email_id'),
                portfolioData: workBookData
            })
            console.log(res);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(()=>{
        const handleGetPortfolioData = async ()=>{
            if(!localStorage.getItem('email_id')){
                return;
            }
            let data = await axios.post(`http://localhost:3000/api/v1/get-portfolio`, {
                email: localStorage.getItem('email_id')
            });
            console.log(data);
            if(data.status===200){
                console.log('code here---')
                setWorkBookData(data.data);
            }
        }
        handleGetPortfolioData();
    },[])
    
    return (
        <div>
            {
                !loginStatus && (
                    <>
                    <div style={{display: "flex", justifyContent: "end", margin: "10px"}}>
                        <button onClick={handleLogout} style={{cursor: "pointer", width: "100px", padding: "7px", border: "none", borderRadius: "10px", background: "#6767ff", color: "white", fontSize: "16px"}}>Logout</button>
                    </div>
                    <div>
                        <div style={{height: "50vh", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <div onClick={() => document.getElementById("fileInput").click()} style={{display: "flex",flexDirection: "column",alignItems: "center",padding: "30px",border: "1px solid grey",borderRadius: "6px",cursor: "pointer"}}>
                                <input type="file"id="fileInput"style={{ display: "none" }}accept=".xlsx, .xls" onChange={handleUploadXLFile}/>
                                <img src="/assets/excel.png" alt="" />
                                <span>Upload your stock portfolio here</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            workBookData.length>0 && (
                                <div>
                                    {workBookData.map((row, rowIndex) => (
                                        <div key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                                <span key={cellIndex}>{cell}</span>
                                            ))}
                                        </div>
                                    ))}
                                    <div>
                                        <button onClick={savePortfolio}>Save as portfolio</button>
                                        <button onClick={handleMoreCustomized}>Suggest me a better one</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    </>
                )
            }
        </div>
    );
}

export default PersonalProfile;