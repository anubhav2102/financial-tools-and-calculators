import React, { useEffect, useState } from "react";
import axios from "axios";
const XLSX = require('xlsx');

const PersonalProfile = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [workBookData, setWorkBookData] = useState([]);
    const [stockData, setStockData] = useState({
        stockName: "",
        purchaseDate: "",
        quantity: 0,
        pricePerStock: 0,
        tradeFees: 0,
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStockData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        
    
        const newStockData = {
            stockName: stockData.stockName,
            purchaseDate: stockData.purchaseDate,
            quantity: stockData.quantity,
            pricePerStock: stockData.pricePerStock,
            tradeFees: stockData.tradeFees,
        };
    
        // Save to frontend storage
        const storedData = JSON.parse(localStorage.getItem('stockData')) || [];
        const updatedData = [...storedData, newStockData];
    localStorage.setItem('stockData', JSON.stringify(updatedData));
        


    
        // Save to backend
        try {
            if (!localStorage.getItem('email_id')) {
                alert('Please login to continue');
                return;
            }
    
            const res = await axios.post("http://localhost:3000/api/v1/save-portfolio", {
                email: localStorage.getItem('email_id'),
                portfolioData:  [newStockData], // Send the updatedData array to the backend
                
            });
    
            if (res.status === 200) {
                console.log("Portfolio saved successfully to the server.");
                localStorage.removeItem('stockData');

            } else {
                console.error("Error saving portfolio to the server:", res.data.message);
            }
        } catch (error) {
            console.error("Error saving portfolio to the server:", error);
            alert("Error saving portfolio to the server. Please try again.");
        }

       
    
        setStockData({
            stockName: "",
            purchaseDate: "",
            quantity: 0,
            pricePerStock: 0,
            tradeFees: 0,
        });
    };
    
      const exportToCSV = () => {
        const header = ["Stock Name", "Purchase Date", "Quantity", "Price Per Stock", "Trade Fees"];
    const csvContent = [header.join(",")];

    const stockDataFromLocalStorage = JSON.parse(localStorage.getItem('stockData')) || [];

    stockDataFromLocalStorage.forEach((stock) => {
      const row = [
        stock.stockName,
        stock.purchaseDate,
        stock.quantity,
        stock.pricePerStock,
        stock.tradeFees
      ];
      csvContent.push(row.join(","));
    });

    const csvString = csvContent.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "portfolio.csv";
    link.click();
      };

      
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
                    <div className="stock-values" style={{margin:'20px'}}>  
                    <h2>Add Stock Information</h2>
            <form onSubmit={handleSubmit} className="stock-form" style={{display:'flex',flexDirection:'column',width:'300px'}}>
              <div className="form-group" style={{marginBottom:'15px'}}>
                <label htmlFor="stockName" style={{fontWeight:'bold',marginBottom:'5px'}}>Stock Name:</label>
                <input type="text" id="stockName" name="stockName" style={{padding:'8px',fontSize:'14px'}} value={stockData.stockName} onChange={handleInputChange} required />
              </div>

              <div className="form-group"  style={{marginBottom:'15px'}}>
                <label htmlFor="purchaseDate"  style={{fontWeight:'bold',marginBottom:'5px'}}>Purchase Date:</label>
                <input type="date" id="purchaseDate" name="purchaseDate" style={{padding:'8px',fontSize:'14px'}} value={stockData.purchaseDate} onChange={handleInputChange} required />
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                <label htmlFor="quantity"  style={{fontWeight:'bold',marginBottom:'5px'}}>Quantity:</label>
                <input type="number" id="quantity" name="quantity" style={{padding:'8px',fontSize:'14px'}} value={stockData.quantity} onChange={handleInputChange} required />
              </div>

              <div className="form-group"  style={{marginBottom:'15px'}}>
                <label htmlFor="pricePerStock"  style={{fontWeight:'bold',marginBottom:'5px'}} >Price Per Stock:</label>
                <input type="number" id="pricePerStock" name="pricePerStock" style={{padding:'8px',fontSize:'14px'}} value={stockData.pricePerStock} onChange={handleInputChange} required />
              </div>

              <div className="form-group"  style={{marginBottom:'15px'}}>
                <label htmlFor="tradeFees"  style={{fontWeight:'bold',marginBottom:'5px'}}>Trade Fees:</label>
                <input type="number" id="tradeFees" name="tradeFees" style={{padding:'8px',fontSize:'14px'}} value={stockData.tradeFees} onChange={handleInputChange} required />
              </div>

              <button type="submit" className="add-stock-btn">
                Add Stock
              </button>
            </form> 

                    </div>
                    <div className="export-btn">
            <button onClick={exportToCSV}>Export to CSV</button>
          </div>
                    </>
                )
            }
        </div>
    );
}

export default PersonalProfile;