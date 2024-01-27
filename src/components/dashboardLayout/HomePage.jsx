import React from "react";
import FooterPart from "./footer/FooterPart";
import ContactUsPart from "./contactUs/ContactUsPart.jsx";
import HeaderPart from "./header/HeaderPart.jsx";
import AboutPart from "./aboutUs/AboutPart.jsx";
import "./HomePage.css";

const HomePage = () => {
    return (
        <>
        <div>
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