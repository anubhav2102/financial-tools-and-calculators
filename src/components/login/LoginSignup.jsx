import React from "react";
import {Link} from "react-router-dom";

const LoginSignup = () => {
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