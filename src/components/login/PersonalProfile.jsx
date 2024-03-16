import React, { useEffect, useState } from "react";
import axios from "axios";
const XLSX = require('xlsx');

const PersonalProfile = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [workBookData, setWorkBookData] = useState([]);
    const [stockDataList, setStockDataList] = useState([{ // Initialize with one stock form
        stockName: "",
        purchaseDate: "",
        quantity: 0,
        pricePerStock: 0,
        tradeFees: 0,
    }]);

    const handleInputChange = (e, index) => { // Update stock data based on index
        const { name, value } = e.target;
        const updatedStockDataList = [...stockDataList];
        updatedStockDataList[index] = {
            ...updatedStockDataList[index],
            [name]: value
        };
        setStockDataList(updatedStockDataList);
    };
    const handleAddMoreStock = () => {
        setStockDataList([...stockDataList, { // Add another empty stock form
            stockName: "",
            purchaseDate: "",
            quantity: 0,
            pricePerStock: 0,
            tradeFees: 0,
        }]);
    };

    const handleDeleteStock = (index) => {
        const list = [...stockDataList];
        list.splice(index, 1);
        setStockDataList(list);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save to frontend storage
        localStorage.setItem('stockDataList', JSON.stringify(stockDataList));

        // Save to backend
        try {
            if (!localStorage.getItem('email_id')) {
                alert('Please login to continue');
                return;
            }

            const res = await axios.post("http://localhost:8000/api/v1/save-portfolio", {
                email: localStorage.getItem('email_id'),
                portfolioData: stockDataList,
            });

            if (res.status === 200) {
                console.log("Portfolio saved successfully to the server.");
                localStorage.removeItem('stockDataList');
            } else {
                console.error("Error saving portfolio to the server:", res.data.message);
            }
        } catch (error) {
            console.error("Error saving portfolio to the server:", error);
            alert("Error saving portfolio to the server. Please try again.");
        }

        // Reset stock data list
        setStockDataList([{ // Reset to one stock form
            stockName: "",
            purchaseDate: "",
            quantity: 0,
            pricePerStock: 0,
            tradeFees: 0,
        }]);
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
            const res = await axios.post("http://localhost:8000/api/v1/save-portfolio", {
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
            let data = await axios.post(`http://localhost:8000/api/v1/get-portfolio`, {
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
                    {stockDataList.map((stockData, index) => (
                        <div key={index} className="stock-values" style={{ margin: '20px' }}>
                            <h2>Add Stock Information</h2>
                            <form onSubmit={(e) => handleSubmit(e, index)} className="stock-form" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="stockName" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Stock Name:</label>
                                    <input type="text" id="stockName" name="stockName" style={{ padding: '8px', fontSize: '14px' }} value={stockData.stockName} onChange={(e) => handleInputChange(e, index)} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="purchaseDate" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Purchase Date:</label>
                                    <input type="date" id="purchaseDate" name="purchaseDate" style={{ padding: '8px', fontSize: '14px' }} value={stockData.purchaseDate} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="quantity" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quantity:</label>
                                    <input type="number" id="quantity" name="quantity" style={{ padding: '8px', fontSize: '14px' }} value={stockData.quantity} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="pricePerStock" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Price Per Stock:</label>
                                    <input type="number" id="pricePerStock" name="pricePerStock" style={{ padding: '8px', fontSize: '14px' }} value={stockData.pricePerStock} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="tradeFees" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Trade Fees:</label>
                                    <input type="number" id="tradeFees" name="tradeFees" style={{ padding: '8px', fontSize: '14px' }} value={stockData.tradeFees} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                {stockDataList.length > 1 && <button onClick={() => handleDeleteStock(index)}>Delete</button>}


                               
                            </form>
                           
                        </div>
                    ))}


           <div style={{  margin: '20px' }}>
                <button onClick={handleAddMoreStock}>Add more stock</button>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button onClick={handleSubmit}>Save these Stock</button>
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