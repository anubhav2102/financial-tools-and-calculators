import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PersonalProfile from "./PersonalProfile.jsx";
import LoginSignup from "./LoginSignup.jsx";
import axios from "axios";
const XLSX = require('xlsx');

const Profile = () => {
    let [email, setEmail] = useState(localStorage.getItem('email_id'));
    let [accessToken, setAccessToken] = useState('');
    const [checkURL, setCheckURL] = useState(true);
    const Navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setCheckURL(location.pathname === "/profile");
        setEmail(localStorage.getItem('email_id'));
        console.log(window.location.href, '----adjdvnald lcoations')
        let currUrl = window.location.href;
        if(currUrl.includes('?code=') && !localStorage.getItem('upstoxCreds')){
            let tempArr = currUrl.split('?code=');
            localStorage.setItem('AuthCodeUpstox', tempArr[1]);
            exchangeCodeForToken(tempArr[1]);
        }
        if(localStorage.getItem('upstoxCreds')){
            let data = localStorage.getItem('upstoxCreds');
            data = JSON.parse(data);
            setAccessToken(data.accessToken);
        }
    }, [location]);
    const handleCapitalize = (user) => {
        console.log(user);
        return user.toUpperCase();
    }
    const handleOpenProfile = () => {
        setCheckURL(false);
        Navigate("/profile");
    }
    const exchangeCodeForToken = async (code) => {
        const tokenUrl = 'https://api.upstox.com/v2/login/authorization/token';
        const data = {
            'code': code,
            'client_id': 'd1c4eed6-064d-464a-b3d7-d448ad30d036',
            'client_secret': '15tud2rgx8',
            'redirect_uri': 'http://localhost:3000',
            'grant_type': 'authorization_code',
        };

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        try {
            const response = await axios.post(tokenUrl, new URLSearchParams(data), { headers });
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                localStorage.setItem('upstoxCreds', JSON.stringify(response.data));
                window.location.href = 'http://localhost:3000/';
            }
        } catch (error) {
            console.error(error.response.status);
            console.error(error.response.data);
        }
    };
    const handleGetAuthCode = async () => {
        const authUrl = 'https://api.upstox.com/v2/login/authorization/dialog';
        const redirectUri = 'http://localhost:3000';
        const clientId = 'd1c4eed6-064d-464a-b3d7-d448ad30d036';
        const responseType = 'code';
        const scope = 'read,write';
        const authorizationUrl = `${authUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = authorizationUrl;
        const handleAuthorizationCode = (event) => {
            const url = new URL(event.newURL);
            const code = url.searchParams.get('code');
            localStorage.setItem('AuthCodeUpstox', code);
    
            if (code) {
                window.removeEventListener('hashchange', handleAuthorizationCode);
            }
        };
        window.addEventListener('hashchange', handleAuthorizationCode);
    };
    const openPortfolio = async () => {
        let data = await axios.post('http://localhost:8000/api/v1/get-portfolio', {
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
                        {
                            accessToken==="" ? (
                                <>
                                <span onClick={handleGetAuthCode} style={{color: "blue", cursor: "pointer", marginRight: "1rem"}}>
                                    Connect UpStox
                                </span>
                                </>
                            ) : (
                                <>
                                <span style={{color: "grey", marginRight: "1rem"}}>
                                    Connected to UpStox
                                </span>
                                </>
                            )
                        }
                        <span style={{marginRight: "1rem"}}>
                            <button onClick={openPortfolio} style={{width: "110px", padding: "8px", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", background: "#5f5fff", color: "white"}}>Portfolio ↓</button>
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