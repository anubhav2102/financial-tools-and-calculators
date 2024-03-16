import React, { useEffect, useState } from "react";
import StockVisual from "./StockVisual.jsx";
import "./AboutPart.css";
import axios from 'axios'

const AboutPart = () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    let [exampleStock1, setExampleStock1] = useState({});
    let [exampleStock2, setExampleStock2] = useState({});
    let [exampleStock3, setExampleStock3] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo');
                const data = response.data;
                const lines = data.split('\n');
                const headers = lines[0].split(',');

                const dataArray = [];
                const searchableNames = [];
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',');
                    const obj = {};
                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = values[j];
                    }
                    dataArray.push(obj);
                    searchableNames.push(obj);
                }
                
                setFilteredItems(searchableNames);
                setOriginalItems(searchableNames);
                localStorage.setItem('allCompanyData', JSON.stringify(searchableNames));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getExampleData = async () => {
            let [data1, data2, data3] = await Promise.all([axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=full&apikey=demo'),
            axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo'),
            axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSCO.LON&outputsize=full&apikey=demo')]);
            setExampleStock1(data1);
            setExampleStock2(data2);
            setExampleStock3(data3);
        }

        getExampleData();

        const storedData = localStorage.getItem('allCompanyData');
        if (storedData) {
            const data = JSON.parse(storedData);
            setFilteredItems(data);
            setOriginalItems(data);
        } else {
            fetchData();
        }
    }, []);

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        setSearchParam(inputValue);
        const filteredData = originalItems.filter(item => item && item.name && item.name.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredItems(filteredData);
        console.log(filteredData);
    };
    
    const handleCurrentSelectedSearchItem = (item, idx) => {
    }

    return(
        <>
        <div>
            <div>
                <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                    <input style={{width: "45%",height: "27px",border: 'none',borderRadius: "7px", outline: "none", padding: "7px"}} value={searchParam} placeholder="Search for any stock or ETF..." type="text" onChange={(e)=>handleSearch(e)} />
                </div>
                <div style={{alignItems: 'center', justifyContent: 'center', display: (searchParam==='') ? 'none':'flex'}}>
                    <div style={{background: 'white', width: '60%', textAlign: 'center', padding: '10px', borderRadius: '10px', height: '75vh', overflow: "scroll"}}>
                        {
                            searchParam!=='' && filteredItems.map((item, idx)=>{
                                return (
                                <div key={idx} style={{cursor: 'pointer'}} onClick={handleCurrentSelectedSearchItem(item, idx)}>
                                    {item.name}
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{display: (searchParam==='') ? 'flex':'none', justifyContent: 'space-between', alignItems: 'center', flexDirection: "column", height: '80vh'}}>
                    <div style={{display: 'flex'}}>
                        <StockVisual item1={exampleStock1} item2={exampleStock2} item3={exampleStock3}/>
                    </div>
                    <div style={{background: 'white', fontSize: '16px', cursor: 'pointer', padding: '10px', margin: '10px', borderRadius: '15px'}}>
                        Show More →
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AboutPart;