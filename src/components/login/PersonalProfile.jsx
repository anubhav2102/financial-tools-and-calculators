import React, { useEffect, useState } from "react";
import "./PersonalProfile.css";
import axios from "axios";
const XLSX = require('xlsx');

const PersonalProfile = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    let [workBookData, setWorkBookData] = useState([]);
    let [columns, setColumns] = useState([]);
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
        let tempData = [];
        for(let i=0;i<stockDataList.length;i++){
            let obj = {'Stock Name': stockDataList[i]['stockName'],'Trade Fees': stockDataList[i]['tradeFees'], 'Stocks Bought' : stockDataList[i]['quantity'],'Date': stockDataList[i]['purchaseDate'], 'Purchase Price': stockDataList[i]['pricePerStock']};
            tempData.push(obj);
        }

        // Save to backend
        try {
            if (!localStorage.getItem('email_id')) {
                alert('Please login to continue');
                return;
            }

            const res = await axios.post("http://localhost:8000/api/v1/save-portfolio", {
                email: localStorage.getItem('email_id'),
                portfolioData: tempData,
                mode: 'manual'
            });

            if (res.status === 200) {
                console.log("Portfolio saved successfully to the server.");
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
            let columns = workbook[0];
            setColumns(columns);
            let columnData = [];
            for(let i = 1; i < workbook.length; i++) {
                let temp = {};
                for(let j = 0; j < columns.length; j++) {
                    temp[columns[j]] = workbook[i][j];
                }
                columnData.push(temp);
            }
            console.log(columnData,"column data is this present");
            setWorkBookData(columnData)
        };
    
        reader.onerror = (event) => {
            console.error("File could not be read! Error:", event.target.error);
        };
    
        reader.readAsArrayBuffer(file);

        // here this is redering localstorage

    };
    
    
    const parseExcelData = (data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });
    
        const dateColumnIndex = jsonData[0].indexOf('Date');
        if (dateColumnIndex !== -1) { // If "Date" column is found
            for (let i = 1; i < jsonData.length; i++) {
                const dateValue = jsonData[i][dateColumnIndex];
                if (typeof dateValue === 'string') { 
                    const [day, month, year] = dateValue.split('-').map(Number); 
                    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) { 
                        jsonData[i][dateColumnIndex] = `${day}-${month}-${year}`; 
                    }
                }
            }
        }
    
        return jsonData;
    };
    

       

    const getPortfolio = async () => {
        try {
            if(!localStorage.getItem('email_id')){
                return;
            }
            const data = await axios.post("http://localhost:8000/api/v1/get-portfolio",{
                email: localStorage.getItem('email_id'),
            });
            console.log(data);
            if(data.data && data.data.code===200){
                if(data.data.data.length===0){
                    alert('No data to show');
                    return;
                }else{
                    let columns = [];
                    columns = Object.keys(data.data.data[0]);
                    setColumns(columns);
                    setWorkBookData(data.data.data);
                }
            }
        } catch (error) {
            console.error(error);
        }

    }

    const savePortfolio = async () => {
        try {
            if(!localStorage.getItem('email_id')){
                alert('Please login to continue');
                return;
            }
            console.log(workBookData);
            const res = await axios.post("http://localhost:8000/api/v1/save-portfolio", {
                email: localStorage.getItem('email_id'),
                portfolioData: workBookData,
                mode: 'csv'
            })
            console.log(res);
            if(res.data && res.data.code===200){
                alert('Portfolio saved!');
                setWorkBookData([]);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(()=>{
        console.log(workBookData);
    }, [workBookData]);
    
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
                                            {workBookData && workBookData.length > 0 ? (
                            <div>
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
                                            {workBookData.map((rowData, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {columns.map((column, colIndex) => (
                                                        <td key={colIndex}>{rowData[column]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <button className="buttons_personalProfile" onClick={() => savePortfolio('csv')}>Save as portfolio</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button className="buttons_personalProfile" onClick={getPortfolio}>Get your portfolio</button>
                            </div>
                        )}

                        
                    </div>
                    {stockDataList.map((stockData, index) => (
                        <div key={index} className="stock-values" style={{ margin: '20px' }}>
                            <h2>Add Stock Information</h2>
                            <form onSubmit={(e) => handleSubmit(e, index)} className="stock-form" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label htmlFor="stockName" style={{ fontWeight: 'bold', marginBottom: '5px', marginRight: "10px" }}>Stock Name:</label>
                                <input 
                                    type="text" 
                                    id="stockName" 
                                    name="stockName" 
                                    style={{ padding: '8px', fontSize: '14px' }} 
                                    value={stockData.stockName} 
                                    onChange={(e) => handleInputChange(e, index)} 
                                    required 
                                    list="stockNameOptions" 
                                />
                                <datalist id="stockNameOptions">
                                    {localStorage.getItem("allCompanyData") && JSON.parse(localStorage.getItem("allCompanyData")).map((company, idx) => (
                                        <option key={idx} value={company.name} />
                                    ))}
                                </datalist>
                            </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="purchaseDate" style={{ fontWeight: 'bold', marginBottom: '5px', marginRight: "10px" }}>Purchase Date:</label>
                                    <input type="date" id="purchaseDate" name="purchaseDate" style={{ padding: '8px', fontSize: '14px' }} value={stockData.purchaseDate} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="quantity" style={{ fontWeight: 'bold', marginBottom: '5px', marginRight: "10px" }}>Quantity:</label>
                                    <input type="number" id="quantity" name="quantity" style={{ padding: '8px', fontSize: '14px' }} value={stockData.quantity} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="pricePerStock" style={{ fontWeight: 'bold', marginBottom: '5px', marginRight: "10px" }}>Price Per Stock:</label>
                                    <input type="number" id="pricePerStock" name="pricePerStock" style={{ padding: '8px', fontSize: '14px' }} value={stockData.pricePerStock} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label htmlFor="tradeFees" style={{ fontWeight: 'bold', marginBottom: '5px', marginRight: "10px" }}>Trade Fees:</label>
                                    <input type="number" id="tradeFees" name="tradeFees" style={{ padding: '8px', fontSize: '14px' }} value={stockData.tradeFees} onChange={(e) =>handleInputChange(e, index)} required />
                                </div>

                                {stockDataList.length > 1 && <button className="buttons_personalProfile" style={{width: "18%"}} onClick={() => handleDeleteStock(index)}>Delete</button>}


                               
                            </form>
                           
                        </div>
                    ))}


           <div style={{display: 'flex', alignItems: 'center'}}>
           <div>
                <button className="buttons_personalProfile" onClick={handleAddMoreStock}>Add more stock</button>
            </div>

            <div>
                <button className="buttons_personalProfile" onClick={handleSubmit}>Save Stock</button>
            </div>
           </div>
                    </>
                )
            }
        </div>
    );
}

export default PersonalProfile;