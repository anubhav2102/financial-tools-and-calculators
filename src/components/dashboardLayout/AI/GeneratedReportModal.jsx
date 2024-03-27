import React, { useEffect } from "react";

const GeneratedReportModal = ({reportData}) => {
    useEffect(()=>{
        console.log(reportData);
    },[reportData])
    return (
        <div>
            {
                reportData !== '' ? (
                    <div>
                        <div style={{height: "500px", overflow: 'scroll'}}>
                        <pre>{reportData}</pre>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <button style={{margin: "20px", padding: "12px", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", background: "#5f5fff", color: "white"}}>Download report ↓</button>
                        </div>
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img src="/assets/loadingripple.svg" style={{height: "200px"}} alt="" />
                        <span>Report is generating, please wait...</span>
                    </div>
                )
            }
        </div>
    )
}

export default GeneratedReportModal;