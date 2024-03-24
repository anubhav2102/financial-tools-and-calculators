import React from 'react';
import Profile from '../login/Profile';
import UserPortfolio from "./dashboard/UserPortfolio.jsx";
import CustomPortfolioGraphs from "./dashboard/CustomPortfolioGraphs.jsx";

const DashboardPage = () => {
    return(
        <>
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", margin:'10px'}}>
                <div style={{marginLeft: "40%", fontSize: "40px"}}>USER DASHBOARD</div>
                <div><Profile opening={'dashboard'}/></div>
            </div>
            <div>
                <UserPortfolio/>
            </div>
            <div>
                <CustomPortfolioGraphs/>
            </div>
        </div>
        </>
    )
}

export default DashboardPage;