import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSavingData = async () => {
    if (!email || !password) {
        alert("Both email and password are required")
      return;
    }
  
    const data = {
        email: email,
        password: password,
        username: userName,
      };      
    try {
      console.log(data);
      let resp = await axios.post(
        "http://localhost:8000/api/v1/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp);
      if(resp.status===200){
        alert("Registration completed!")
      }
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data);
    }
  };
  return (
    <>
      <div>
        <form>
          <label htmlFor="username">
            User Name{" "}
            <input
              type="text"
              value={userName}
              name="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email{" "}
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password{" "}
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </form>
        <div>
          <button onClick={handleSavingData}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
