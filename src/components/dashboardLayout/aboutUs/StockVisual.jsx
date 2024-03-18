import React, { useEffect, useState } from "react";
import "./StockVisual.css";
import TimeSeriesGraph from "../graphs/TimeSeriesGraph";
import DetailedAIModal from "../AI/DetailedAIModal.jsx";

const StockVisual = ({item1, item2, item3,searchedCompanyData}) => {
    let [lastUpdatedAt, setLastUpdatedAt] = useState('');
    let [itemName, setItemName] = useState('');
    let [graphData, setGraphData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [showAIModal, setShowAIModal] = useState(false);
    let [currentStockData, setCurrentStockData] = useState(item1.data);

    const handleStockChange = (e, item) => {
        setLoading(true);
    console.log(e);
    if (item && Object.keys(item).length !== 0) {
        const timeSeriesData = item.data['Time Series (Daily)'];
        const formattedData = Object.keys(timeSeriesData).map(date => ({
            date,
            close: parseFloat(timeSeriesData[date]['4. close'])
        }));
        setGraphData(formattedData);
        setItemName(item.data['Meta Data']['2. Symbol']);
        setLastUpdatedAt(item.data['Meta Data']['3. Last Refreshed']);
        setCurrentStockData(item.data);
    }
    setLoading(false);
    }
    const openAskAIModal = () => {
        setShowAIModal(true);
    }
    const closeAIModal = () => {
        setShowAIModal(false);
    }
    useEffect(() => {
        setLoading(true);
        console.log("Searched company data in stockvisual jsx:", searchedCompanyData); // Log searched company data


        console.log(item1,item2,item3, "this is example ");
        if (searchedCompanyData && Object.keys(searchedCompanyData).length !== 0) {

            
            const timeSeriesData = searchedCompanyData['Time Series (5min)'];
            const formattedData = Object.keys(timeSeriesData).map(date => ({
                date,
                close: parseFloat(timeSeriesData[date]['4. close'])
            }));
            setGraphData(formattedData);
            setItemName(searchedCompanyData['Meta Data']['2. Symbol']);
            setCurrentStockData(searchedCompanyData);
            setLastUpdatedAt(searchedCompanyData['Meta Data']['3. Last Refreshed']);
        } else if (item1.data && item1.data['Meta Data'] && item1.data['Time Series (Daily)']) {
            const timeSeriesData = item1.data['Time Series (Daily)'];
            const formattedData = Object.keys(timeSeriesData).map(date => ({
                date,
                close: parseFloat(timeSeriesData[date]['4. close'])
            }));
            setGraphData(formattedData);
            setItemName(item1.data['Meta Data']['2. Symbol']);
            setCurrentStockData(item1.data);
            setLastUpdatedAt(item1.data['Meta Data']['3. Last Refreshed']);
        }
        setLoading(false);
    }, [item1, item2, item3, searchedCompanyData]);
    return (
        <>
        <div className="box-card">
            {
                (itemName==='' || loading) ? (
                    <>
                    <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <img src="/assets/loadingripple.svg" style={{height:"100px"}} alt="" />
                    </div>
                    </>
                ) : (
                    <>
                    <h4 style={{textAlign:"center"}}>{itemName}</h4>
                    <div>
                        <TimeSeriesGraph data={graphData} />

                        {(!searchedCompanyData) && (
                        <div style={{display: 'flex', justifyContent: "center"}}>
                            <div style={{marginRight: "20px"}}><input type="radio" name="stockName" value={item1.data['Meta Data']['2. Symbol']} defaultChecked onClick={(e)=>handleStockChange(e, item1)} id="" style={{outline: "none"}} /></div>
                            <div style={{marginRight: "20px"}}><input type="radio" name="stockName" value={item2.data['Meta Data']['2. Symbol']} onClick={(e)=>handleStockChange(e, item2)} id="" style={{outline: "none"}}  /></div>
                            <div><input type="radio" name="stockName" value={item3.data['Meta Data']['2. Symbol']} onClick={(e)=>handleStockChange(e, item3)} id="" style={{outline: "none"}}  /></div>
                        </div>
                        )}
                    </div>
                    <div style={{color: "blue", display: 'flex', alignItems: 'center', justifyContent: "end"}}><span onClick={openAskAIModal} style={{cursor: "pointer"}}>Ask AI ? </span> <img onClick={openAskAIModal} src="/assets/eqai.svg" style={{height: '25px', cursor: "pointer"}} alt="" /></div>
                    <span style={{color: 'grey', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: "end"}}>( Last updated on : {lastUpdatedAt} )</span>
                    </>
                )
            }
        </div>
        {
            showAIModal && (
                <>
                <div style={{position: "fixed", height: "100%", width: "100%", left: "0%", top: "0%", backgroundColor: "rgba(0, 0, 0, .7333333333333333)", zIndex: "9"}}>
                    <div style={{position: "fixed", height: "85vh", width: "90vw", left: "4rem", top: "3rem", background: "white", borderRadius: "10px"}}>
                        <div style={{textAlign: "end", margin: "10px 10px 0px 0px"}}>
                            <img onClick={closeAIModal} src="/assets/Close.svg" style={{height: "20px", cursor: "pointer"}} alt="" />
                        </div>
                        <div>
                            <DetailedAIModal stockData={currentStockData} />
                        </div>
                    </div>
                </div>
                </>
            )
        }
        </>
    )
}

export default StockVisual;