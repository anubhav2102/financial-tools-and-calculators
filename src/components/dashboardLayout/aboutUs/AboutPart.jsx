import React, { useEffect, useState } from "react";
import "./AboutPart.css";
import axios from 'axios'

const AboutPart = () => {
    let [filteredItems, setFilteredItems] = useState([]);
    let [originalItems, setOriginalItems] = useState([]);
    let [searchParam, setSearchParam] = useState('');

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        setSearchParam(inputValue);
        const filteredData = originalItems.filter(item => item.includes(inputValue));
        setFilteredItems(filteredData);
        console.log(filteredData);
    }
    
    useEffect(() => {
        const getOriginalData = async () => {
            let data = (await axios.get('https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo')).data;
            console.log(data);
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
                searchableNames.push(obj['name']);
            }
            console.log(searchableNames);
            console.log(dataArray);
            localStorage.setItem('allCompanyData',JSON.stringify(searchableNames));
        }
        if(localStorage.getItem('allCompanyData')){
            let data = JSON.parse(localStorage.getItem('allCompanyData'));
            setFilteredItems(data);
            setOriginalItems(data);
        }
        getOriginalData();
    }, []);
    return(
        <>
        <div>
            <div>
                <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                    <input style={{width: "45%",height: "27px",border: 'none',borderRadius: "7px", outline: "none", padding: "7px"}} value={searchParam} placeholder="Search for any stock or ETF..." type="text" onChange={(e)=>handleSearch(e)} />
                </div>
                <div>
                    {
                        searchParam!=='' && filteredItems.map((item, idx)=>{
                            return (
                            <div key={idx}>
                                {item}
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default AboutPart;