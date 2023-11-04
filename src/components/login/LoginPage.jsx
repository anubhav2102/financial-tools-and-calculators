import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const handleLoginData = async () => {
        console.log("working");
        if (!email || !password) {
            console.log('------------error')
            return;
          }
        
          const data = {
              email: email,
              password: password
            };      
          try {
            console.log(data);
            let resp = await axios.post(
              "http://localhost:3000/api/v1/login",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(resp);
            if(resp.status===200){
                localStorage.setItem("email_id", email);
                alert("Login Successful")
            }
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <>
        <div>
            <form>
                <label htmlFor="email">Email <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  /></label>
                <label htmlFor="password">Password <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  /></label>
            </form>
            <div>
            <button onClick={handleLoginData}>Login</button>
            </div>
        </div>
        </>
    )
}

export default LoginPage;