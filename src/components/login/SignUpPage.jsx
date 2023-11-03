import React, {useState, useEffect} from "react";
import axios from "axios";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const handleSavingData = async () => {
        console.log(setEmail);
        console.log(setPassword);
        console.log(setUserName);
        console.log(setProfilePic);
        let data = {"email": setEmail, "password": setPassword, "profilePic": setProfilePic, "username": setUserName};
        let resp = await axios.post("http://localhost:3000/api/v1/register",{data});
        console.log(resp);
    }
    return (
        <>
        <div>
            <form>
                <label htmlFor="username">User Name <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /></label>
                <label htmlFor="email">Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                <label htmlFor="password">Password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                <label htmlFor="avatar">Profile Picture <input type="file" name="" id="" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} /></label>
            </form>
            <div>
                <button onClick={handleSavingData()}>Sign Up</button>
            </div>
        </div>
        </>
    )
}

export default SignUpPage;