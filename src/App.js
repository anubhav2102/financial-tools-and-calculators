import React from 'react';
import './App.css';
import LoginPage from "./components/login/LoginPage.jsx";
import SignUpPage from "./components/login/SignUpPage.jsx";
import { Routes, Route} from "react-router-dom";
import DashboardPage from './components/dashboardLayout/DashboardPage.jsx';
import Profile from './components/login/Profile.jsx';
import HomePage from "./components/dashboardLayout/HomePage.jsx";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact element={<HomePage/>} path="/" />
          <Route exact element={<LoginPage/>} path="/login"/>
          <Route exact element={<Profile/>} path="/profile" />
          <Route exact element={<SignUpPage/>} path="/register"/>
          <Route exact element={<DashboardPage/>} path="/dashboard"/>
        </Routes>
    </div>
  );
}

export default App;