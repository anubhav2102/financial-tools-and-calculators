import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';
import "./StocksPieChart.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6565', '#1E90FF', '#00CED1'];

const StocksPieChart = () => {
    const [pieData, setPieData] = useState([]);
    const [currParam, setCurrParam] = useState('Purchase Price');
    const [editClicked, setEditClicked] = useState(false);
    const openEdit = () => {
      setEditClicked(true);
    }
    const setEditParam = async (val) => {
      console.log(val);
      try {
        let data = await axios.post('http://localhost:8000/api/v1/get-portfolio',{
        email: localStorage.getItem('email_id')
      });
      console.log(data);
      if(data.data.code===200){
          let tempData = [];
          for(let i=0;i<data.data.data.length;i++){
            let obj = {};
            obj['name'] = data.data.data[i]['Stock Name'];
            if(val === 'Stocks Bought'){
              obj[val] = data.data.data[i][val];
            }else if(val === 'Purchase Date'){
              obj[val] = data.data.data[i]['Date'];
            }else{
              obj[val] = parseFloat(data.data.data[i][val].replace('$', '').replace(',', ''));
            }
            tempData.push(obj);
          }
          setPieData(tempData);
          console.log(tempData)
      }
      } catch (error) {
          console.error(error);
      }
      setCurrParam(val);
      setEditClicked(false);
    }
    useEffect(()=>{
        const getPortfolioData = async () => {
            try {
                let data = await axios.post('http://localhost:8000/api/v1/get-portfolio',{
                email: localStorage.getItem('email_id')
            });
            console.log(data);
            if(data.data.code===200){
                let tempData = [];
                for(let i=0;i<data.data.data.length;i++){
                    tempData.push({name: data.data.data[i]['Stock Name'], 'Purchase Price': parseFloat(data.data.data[i]['Purchase Price'].replace('$', '').replace(',', ''))});
                }
                setPieData(tempData);
                setCurrParam('Purchase Price');
            }
            } catch (error) {
                console.error(error);
            }
        }
        getPortfolioData();
    },[])
  return (
    <div style={{margin: "4rem"}}>
        <div style={{textAlign: "center", fontWeight: "500", fontSize: "20px"}}>Stock analysis with {
          editClicked ? (<span style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <span style={{cursor: "pointer", fontSize: "14px", fontWeight: "500", border:"1px solid grey", padding: "5px", margin:"5px", width: "20%", borderRadius: "10px"}} onClick={()=>setEditParam('Purchase Date')}> Purchase Date</span>
            <span style={{cursor: "pointer", fontSize: "14px", fontWeight: "500", border:"1px solid grey", padding: "5px", margin:"5px", width: "20%", borderRadius: "10px"}} onClick={()=>setEditParam('Stocks Bought')}> Stocks Bought </span>
            <span style={{cursor: "pointer", fontSize: "14px", fontWeight: "500", border:"1px solid grey", padding: "5px", margin:"5px", width: "20%", borderRadius: "10px"}} onClick={()=>setEditParam('Total Purchase Price')}> Total Purchase Price </span>
            <span style={{cursor: "pointer", fontSize: "14px", fontWeight: "500", border:"1px solid grey", padding: "5px", margin:"5px", width: "20%", borderRadius: "10px"}} onClick={()=>setEditParam('Purchase Price')}> Purchase Price </span>
          </span>) : (<span>
            {currParam} <img onClick={openEdit} src="/assets/editPencil.png" style={{height: "15px", cursor: "pointer"}} alt="" />
          </span>)
        }</div>
        <div style={{display: "flex", justifyContent: "center"}}>
        <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey={currParam}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
        </div>
    </div>
  );
};

export default StocksPieChart;
