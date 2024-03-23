import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';
import "./StocksPieChart.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6565', '#1E90FF', '#00CED1'];

const StocksPieChart = () => {
    const [pieData, setPieData] = useState([]);
    const [currParam, setCurrParam] = useState('Purchase Price');
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
                    tempData.push({name: data.data.data[i]['Stock Name'], price: parseFloat(data.data.data[i]['Purchase Price'].replace('$', '').replace(',', ''))});
                }
                setPieData(tempData);
                setCurrParam('purchase Price');
            }
            } catch (error) {
                console.error(error);
            }
        }
        getPortfolioData();
    },[])
  return (
    <div style={{margin: "4rem"}}>
        <div style={{textAlign: "center", fontWeight: "500", fontSize: "20px"}}>Stock analysis with {currParam}</div>
        <div style={{display: "flex", justifyContent: "center"}}>
        <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="price"
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
