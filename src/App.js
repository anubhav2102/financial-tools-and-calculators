import React,{useEffect, useState} from 'react';
import './App.css';
// import ImageUpload from './ImageUpload';
// import ImageDisplay from './ImageDisplay';
import LoginSignup from "./components/login/LoginSignup.jsx";
import LoginPage from "./components/login/LoginPage.jsx";
import SignUpPage from "./components/login/SignUpPage.jsx";
import { Routes, Route} from "react-router-dom";
import DashboardPage from './components/dashboardLayout/DashboardPage.jsx';
import Profile from './components/login/Profile.jsx';

function App() {
  let [loginStatus, setLoginStatus] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('email_id')){
      setLoginStatus(true);
    }
  },[loginStatus])
  
  return (
    <div className="App">
      {/* <h1>Google Drive testing</h1>
      <ImageUpload />
      <ImageDisplay /> */}
      <div style={{position: "absolute", top: "0px", right: "5px", marginTop: '10px'}}>
      {loginStatus ? <Profile/> : <LoginSignup/>}
      </div>
        <Routes>
          <Route exact element={<LoginPage/>} path="/login"/>
          <Route exact element={<SignUpPage/>} path="/register"/>
          <Route exact element={<DashboardPage/>} path="/dashboard"/>
        </Routes>
    </div>
  );
}

export default App;
