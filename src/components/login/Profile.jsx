import React, { useEffect, useState } from "react";

const Profile = () => {
    let [email, setEmail] = useState(localStorage.getItem('email_id'));
    let [flag, setFlag] = useState(false);
    let [loginStatus, setLoginStatus] = useState(true);
    const handleLogout = () => {
        console.log('workign')
        if(localStorage.getItem('email_id')){
        localStorage.removeItem('email_id');
        setLoginStatus(false);
        setEmail('');
        setFlag(false);
        window.location.reload(true);
        }
    }
    const handleCapitalize = (user) => {
        console.log(user);
        return user.toUpperCase();
    }
    const handleOpenMoreOptions = () => {
        if(flag === false){
            setFlag(true);
            console.log(flag);
        }else{
            setFlag(false);
        }
    }
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '120px'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px'}}>
                {
                    email && (
                        <span style={{fontSize: '20px', cursor: 'pointer', background: '#61b6d1', padding: '13px', borderRadius: '100%', marginTop: '0px', width: '30px'}} onClick={() =>handleOpenMoreOptions()}>
                            {handleCapitalize(email.split('')[0])}
                        </span>
                    )
                }
                </div>
                {
                    flag && (
                        <>
                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '8px', height: '60px'}}>
                            <span style={{fontSize: '10px', fontWeight: '500'}}>{email.split('@')[0]}</span>
                            <button style={{width: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}} onClick={handleLogout}>Logout</button>
                        </span>
                        </>
                    )
                }
            </div>
        
        </>
    )
}

export default Profile;