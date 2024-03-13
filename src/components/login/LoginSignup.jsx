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
    },[])
    return (
        <>
            <div style={{width: '160px', display: 'flex', justifyContent: 'space-around'}}>
                <button style={{padding: '8px 14px', border: 'none', background: '#4e4ef0', borderRadius: '10px'}}><Link to={`/login`} style={{textDecoration: "none", color: "white", fontSize: '15px'}}>Login</Link></button>
                <button style={{padding: '8px 14px', border: 'none', background: '#4e4ef0', borderRadius: '10px'}}><Link to={`/register`} style={{textDecoration: "none", color: "white", fontSize: '15px'}}>Sign Up</Link></button>
            </div>
        
        </>
    )
}

export default LoginSignup;