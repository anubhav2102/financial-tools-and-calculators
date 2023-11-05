import React,{useEffect, useState} from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';
import LoginSignup from "./components/login/LoginSignup.jsx";
import LoginPage from "./components/login/LoginPage.jsx";
import SignUpPage from "./components/login/SignUpPage.jsx";
import SIPCalculator from "./components/calculators/SIPCalculator.jsx";
import axios from "axios";
import { Routes, Route} from "react-router-dom";

function App() {
  let [loginStatus, setLoginStatus] = useState(false);
  let [email, setEmail] = useState({});
  useEffect(()=>{
    const showdata = async ()=>{
      const response1 = await axios.get('http://localhost:3000/all-users');
        console.log(response1);
    }
    const handleLoginStatus = () => {
      if(localStorage.getItem('email_id')){
        setEmail({user: localStorage.getItem('email_id')});
        setLoginStatus(true);
      }
    }
    handleLoginStatus();
    showdata();
  },[]);
  const handleLogout = () => {
    console.log('workign')
    if(localStorage.getItem('email_id')){
      localStorage.removeItem('email_id');
      setLoginStatus(false);
      setEmail({});
      window.location.reload(true);
    }
  }
  return (
    <div className="App">
      <h1>Google Drive testing</h1>
      <ImageUpload />
      <ImageDisplay />
      <div style={{position: "absolute", top: "10px", right: "10px"}}>
      {loginStatus ? <div>
        <h2>Dashboard for {email.user.split('@')[0]}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div> : <LoginSignup/>}
      </div>
        <Routes>
          <Route exact element={<LoginPage/>} path="/login"/>
          <Route exact element={<SignUpPage/>} path="/register"/>
        </Routes>
        <SIPCalculator/>
    </div>
  );
}

export default App;
