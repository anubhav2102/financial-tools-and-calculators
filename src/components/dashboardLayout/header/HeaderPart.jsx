import React, { useState } from "react";
import "./HeaderPart.css";

const HeaderPart = () => {
    let [mouseOnExplore, setMouseOnExplore] = useState(false);
    let [mouseOnCards, setMouseOnCards] = useState([false, false, false]);
    return (
        <>
        <div className="header_part_bg">
            <div></div>
            <div style={{
                display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "70vh"
            }}>
                <h2 style={{fontSize: "35px", fontWeight: "300", textAlign: "center"}}>
                    Explore finance and AI with our latest calculators. <br /> <br /> We have covered what all you need!
                </h2>
                <div style={{display: "flex", flexDirection: "column", height: "60vh", justifyContent: "space-evenly"}}>
                    <div style={{display: "flex", justifyContent: "space-evenly"}}>
                        <div onMouseEnter={()=>setMouseOnCards([true,false,false])} onMouseLeave={()=>setMouseOnCards([false,false,false])} 
                        style={{height: "250px", cursor: "pointer", width: "250px", background: (mouseOnCards[0]===true) ? "lightgrey" : "white", border: (mouseOnCards[0]===true) ? "none" : "1px solid grey", borderRadius: "10px", padding:"10px", margin: "10px",display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                            <div style={{fontSize:"22px", fontWeight: "700"}}>SIP Calculator</div>
                            <div>Calculate your SIP</div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <button style={{ cursor: "pointer", padding: "10px 20px", border: "none", background: "#6a6afb", color: "white", fontSize: "16px", borderRadius: "14px", width: "120px" }}>Open</button>
                            </div>
                        </div>
                        <div onMouseEnter={()=>setMouseOnCards([false,true,false])} onMouseLeave={()=>setMouseOnCards([false,false,false])} 
                        style={{height: "250px", cursor: "pointer", width: "250px",background: (mouseOnCards[1]===true) ? "lightgrey" : "white", border: (mouseOnCards[1]===true) ? "none" : "1px solid grey", borderRadius: "10px", padding:"10px", margin: "10px",display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                            <div style={{fontSize:"22px", fontWeight: "700"}}>LumpSum Calculator</div>
                            <div>Calculate your LumpSum</div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <button style={{ cursor: "pointer", padding: "10px 20px", border: "none", background: "#6a6afb", color: "white", fontSize: "16px", borderRadius: "14px", width: "120px" }}>Open</button>
                            </div>                        
                        </div>
                        <div onMouseEnter={()=>setMouseOnCards([false,false,true])} onMouseLeave={()=>setMouseOnCards([false,false,false])} 
                        style={{height: "250px", cursor: "pointer", width: "250px",background: (mouseOnCards[2]===true) ? "lightgrey" : "white", border: (mouseOnCards[2]===true) ? "none" :"1px solid grey", borderRadius: "10px", padding:"10px", margin: "10px",display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                            <div style={{fontSize:"22px", fontWeight: "700"}}>Mutual Funds Calculator</div>
                            <div>Calculate your Mutual Funds</div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <button style={{ cursor: "pointer", padding: "10px 20px", border: "none", background: "#6a6afb", color: "white", fontSize: "16px", borderRadius: "14px", width: "120px" }}>Open</button>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button onMouseEnter={()=>setMouseOnExplore(true)} onMouseLeave={()=>setMouseOnExplore(false)} style={{background: (mouseOnExplore) ? "black" : "transparent", color: (mouseOnExplore) ? "white" : "black", border: "1px solid black", padding: "10px 22px", borderRadius: "6px", cursor: "pointer", fontSize: "15px", fontWeight: "600"}}>
                            Explore More...
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HeaderPart;