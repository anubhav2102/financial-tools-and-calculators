import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');

    const handleLoginData = () => {
        console.log(setEmail);
        console.log(setPassword);
    }
    return (
        <>
        <div>
            <form>
                <label htmlFor="email">Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  /></label>
                <label htmlFor="password">Password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  /></label>
            </form>
            <div>
            <button onClick={handleLoginData()}>Login</button>
            </div>
        </div>
        </>
    )
}

export default LoginPage;