import React, { useEffect, useState } from "react";
import FooterPart from "./footer/FooterPart";
import ContactUsPart from "./contactUs/ContactUsPart.jsx";
import HeaderPart from "./header/HeaderPart.jsx";
import AboutPart from "./aboutUs/AboutPart.jsx";
import "./HomePage.css";
import Profile from "../login/Profile.jsx";
import LoginSignup from "../login/LoginSignup.jsx";

const HomePage = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem('email_id')){
            setLoginStatus(true);
        }
    },[loginStatus])
    return (
        <>
        <div>
            <div style={{
                    margin: (!loginStatus) ? "20px":"", display: (!loginStatus)?"flex":"", justifyContent:(!loginStatus)? "end":""
            }}>
                {
                    loginStatus ? <Profile/> : <LoginSignup/>
                }
            </div>
            <div className="heading_page">
                <HeaderPart/>
            </div>
            <div className="about_us">
                <AboutPart/>
            </div>
            <div className="contact_us">
                <ContactUsPart/>
            </div>
            <div className="footer">
                <FooterPart/>
            </div>
        </div>
        </>
    )
}

export default HomePage;