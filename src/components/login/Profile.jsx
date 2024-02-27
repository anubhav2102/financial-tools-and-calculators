import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PersonalProfile from "./PersonalProfile.jsx";
import LoginSignup from "./LoginSignup.jsx";

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
    return (
        <>
            {
                !checkURL ? (
                    <div style={{display: 'flex', justifyContent: 'end', height: '90px'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {
                    email ? (
                        <span style={{fontSize: '20px', cursor: 'pointer', background: '#61b6d1', padding: '13px', borderRadius: '100%', marginTop: '0px', width: '30px', textAlign: "center"}} onClick={() =>handleOpenProfile()}>
                            {handleCapitalize(email.split('')[0])}
                        </span>
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