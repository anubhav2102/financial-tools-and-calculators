import React, { useEffect, useState } from "react";
import TimeSeriesGraph from "../graphs/TimeSeriesGraph.jsx";
import ChatGPTScreen from "./ChatGPTScreen.jsx";
import "./DetailedAIModal.css";

const DetailedAIModal = ({stockData}) => {

    let [symbol, setSymbol] = useState('');
    let [graphData, setGraphData] = useState({});
    let [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        console.log(stockData);
        if(stockData['Meta Data'] && stockData['Meta Data']['2. Symbol'] && stockData['Time Series (Daily)']){
            setSymbol(stockData['Meta Data']['2. Symbol']);
            const timeSeriesData = stockData['Time Series (Daily)'];
            const formattedData = Object.keys(timeSeriesData).map(date => ({
                date,
                close: parseFloat(timeSeriesData[date]['4. close'])
            }));
            setGraphData(formattedData);
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [stockData]);

    return (
        <>
        {
            loading ? <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <img src="/assets/loadingripple.svg" style={{height:"200px"}} alt="" />
            </div>
            </> : <>
            <div style={{textAlign: 'center', fontSize: '25px', fontWeight: "600", marginBottom: "2rem"}}>AI assist for {symbol}</div>
        <div style={{display: "flex", justifyContent: 'space-around'}}>
            <div>
                <div>
                    <TimeSeriesGraph data={graphData} />
                </div>
            </div>
            <div style={{width: "40vw", marginTop: '2rem'}}>
                <ChatGPTScreen currentItem={symbol} />
            </div>
        </div>
        </>
        }
        </>
    )
}

export default DetailedAIModal;