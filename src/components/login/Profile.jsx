import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PersonalProfile from "./PersonalProfile.jsx";
import LoginSignup from "./LoginSignup.jsx";
import axios from "axios";
const XLSX = require('xlsx');

const Profile = () => {
    let [email, setEmail] = useState(localStorage.getItem('email_id'));
    const [checkURL, setCheckURL] = useState(true);
    const Navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setCheckURL(location.pathname === "/profile");
        setEmail(localStorage.getItem('email_id'));
    }, [location]);
    const handleCapitalize = (user) => {
        console.log(user);
        return user.toUpperCase();
    }
    const handleOpenProfile = () => {
        setCheckURL(false);
        Navigate("/profile");
    }
    const openPortfolio = async () => {
        let data = await axios.post('http://localhost:3000/api/v1/get-portfolio', {
            email: localStorage.getItem('email_id')
        });
        console.log(data);
        const ws = XLSX.utils.json_to_sheet(data.data.data);
        const csvData = XLSX.utils.sheet_to_csv(ws);
        const dataURL = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
        window.open(dataURL, '_blank');
    }
    return (
        <>
            {
                !checkURL ? (
                    <div style={{display: 'flex', justifyContent: 'end', height: '90px'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {
                    email ? (
                        <>
                        <span style={{marginRight: "1rem"}}>
                            <button onClick={openPortfolio} style={{width: "110px", padding: "8px", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", background: "#5f5fff", color: "white"}}>Portfolio</button>
                        </span>
                        <span style={{fontSize: '20px', cursor: 'pointer', background: '#61b6d1', padding: '13px', borderRadius: '100%', marginTop: '0px', width: '30px', textAlign: "center"}} onClick={() =>handleOpenProfile()}>
                            {handleCapitalize(email.split('')[0])}
                        </span>
                        </>
                    ) : (
                        <span>
                            <LoginSignup/>
                        </span>
                    )
                }
                </div>
            </div>
                ):(
                    <div>
                        <PersonalProfile/>
                    </div>
                )
            }
        
        </>
    )
}

export default Profile;