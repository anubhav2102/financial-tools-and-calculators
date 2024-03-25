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
              "http://localhost:8000/api/v1/login",
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
                window.location.href = window.location.origin + "/";
            }
          } catch (error) {
            if(error.response){
                console.error(error.response.data);
                alert(error.response.data);
            }
          }
    }
    return (
        <>
        <div style={{height: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <div style={{background: "aliceblue", padding: "40px 30px 20px", borderRadius: "15px"}}>
        <form style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="email" style={{width: "24vw", display: "flex", alignItems: "center", margin: "10px"}}>
            <span style={{flex: "0.5"}}>Email</span>{" "}
            <input style={{flex: "0.5", border: "none", borderBottom: "1px solid grey", outline: "none", background: "aliceblue"}}
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" style={{width: "24vw", display: "flex", alignItems: "center", margin: "10px"}}>
            <span style={{flex: "0.5"}}>Password</span>{" "}
            <input style={{flex: "0.5", border: "none", borderBottom: "1px solid grey", outline: "none", background: "aliceblue"}}
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </form>
        <div style={{margin: "1rem", width: "21.5rem", display: "flex", justifyContent: "end"}}>
          <button style={{padding: "10px", width: "10rem", border: "none", borderRadius: "7px", background: "#5656ff", cursor: "pointer", color: "white", fontSize: "15px"}} onClick={handleLoginData}>Login</button>
        </div>
        </div>
      </div>
        </>
    )
}

export default LoginPage;