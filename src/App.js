import React,{useEffect} from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';
import LoginSignup from "./components/login/LoginSignup.jsx";
import LoginPage from "./components/login/LoginPage.jsx";
import SignUpPage from "./components/login/SignUpPage.jsx";
import axios from "axios";
import { Routes, Route} from "react-router-dom";

function App() {
  useEffect(()=>{
    const showdata = async ()=>{
      const response1 = await axios.get('http://localhost:3000/all-users');
        console.log(response1);
    }
    showdata();
  },[]);
  return (
    <div className="App">
      <h1>Google Drive testing</h1>
      <ImageUpload />
      <ImageDisplay />
      <div style={{position: "absolute", top: "10px", right: "10px"}}>
      <LoginSignup/>
      </div>
      {/* <Router> */}
        <Routes>
          <Route exact element={<LoginPage/>} path="/login"/>
          <Route exact element={<SignUpPage/>} path="/register"/>
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
