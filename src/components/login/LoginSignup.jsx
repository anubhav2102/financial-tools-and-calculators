import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const LoginSignup = () => {
    let [email, setEmail] = useState({});
    let [loginStatus, setLoginStatus] = useState(false);
    useEffect(()=>{
        const checkLogin = () => {
            if(localStorage.getItem("email_id")){
                setLoginStatus(true);
                setEmail({user: localStorage.getItem("email_id")});
            }
        }
        checkLogin();
    },[email, loginStatus])
    return (
        <>
            <div>
                <button><Link to={`/login`} style={{textDecoration: "none", color: "black"}}>Login</Link></button>
                <button><Link to={`/register`} style={{textDecoration: "none", color: "black"}}>Sign Up</Link></button>
            </div>
        
        </>
    )
}

export default LoginSignup;