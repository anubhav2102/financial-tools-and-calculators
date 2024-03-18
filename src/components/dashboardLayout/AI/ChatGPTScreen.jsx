import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatGPTScreen = ({currentItem}) => {
    let [allChats, setAllChats] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = async (event) => {
        if (event.key === 'Enter') {
        console.log(inputValue);
        setInputValue('');
        // let newObj = {timeStamp: new Date(), response: '', prompt: inputValue};
        // setAllChats([newObj]);
        console.log(allChats);
        let prompt = inputValue
        try {
            let email = '';
            if(localStorage.getItem('email_id')){
                email = localStorage.getItem('email_id');
            }else{
                alert('Please login to continue');
                return;
            }
            const response = await axios.post('http://localhost:8000/api/v1/generate-response', { prompt, email });
            console.log(response);
            setAllChats([]);
            if(response.data.code===200){
                let allChatsData = [];
                for(let i=0;i<response.data.data.prompt.length;i++){
                    allChatsData.push({prompt: response.data.data.prompt[i], response: response.data.data.response[i], timeStamp: response.data.data.timestamp[i]});
                }
                setAllChats(allChatsData);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
    };
    const convertToTimeFormat = (dateString) => {
        const providedDate = new Date(dateString);
  
        // Get current date
        const currentDate = new Date();

        // Check if the provided date is today
        if (providedDate.toDateString() === currentDate.toDateString()) {
            // Format time as 12-hour AM/PM format
            const formattedTime = providedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            return formattedTime;
        }

        // Check if the provided date is yesterday
        const yesterday = new Date();
        yesterday.setDate(currentDate.getDate() - 1);
        if (providedDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }

        // Calculate the difference in days
        const timeDiff = Math.abs(currentDate.getTime() - providedDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // Format the date as days ago
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    useEffect(()=>{
        const getChatsData = async () => {
            try {
                let email = localStorage.getItem('email_id');
                if(email){
                    let data = await axios.post('http://localhost:8000/api/v1/get-previous-chats', {
                        email: email
                    });
                    console.log(data);
                    if(data.data.code===200){
                        let allChatsData = [];
                        for(let i=0;i<data.data.data.prompt.length;i++){
                            allChatsData.push({prompt: data.data.data.prompt[i], response: data.data.data.response[i], timeStamp: data.data.data.timestamp[i]});
                        }
                        setAllChats(allChatsData);
                    }
                }
            } catch (error) {
                console.error(error);
                if(localStorage.getItem('email_id')){
                    let email = localStorage.getItem('email_id');
                            let prompt = `Generate insights about ${currentItem} stock performance and outlook based on recent data.`;
                            console.log(prompt)
                            const response = await axios.post('http://localhost:8000/api/v1/generate-response', { prompt, email });
                            console.log(response);
                            setAllChats([]);
                if(response.data.code===200){
                    let allChatsData = [];
                    for(let i=0;i<response.data.data.prompt.length;i++){
                        allChatsData.push({prompt: response.data.data.prompt[i], response: response.data.data.response[i], timeStamp: response.data.data.timestamp[i]});
                    }
                    setAllChats(allChatsData);
                }
                }
            }
        }
        getChatsData();
    })

    return (
        <>
        <div>
            <div style={{height: "40vh", overflow: "hidden scroll", background: "#2fa5b1"}}>
                {
                    allChats.map((data,idx)=>{
                        return (
                            <div key={idx}>
                                <div style={{background: "white", padding: "15px", margin: "10px", width: "70%", textAlign: 'left', float: "right", borderRadius: "15px"}}>
                                    <div style={{fontSize: "13px"}}>{data.prompt}</div>
                                    <div style={{color: "grey", fontSize: "9px"}}>{convertToTimeFormat(data.timeStamp)}</div>
                                </div>
                                <div style={{background: "white", padding: "15px", margin: "10px", width: "70%", textAlign: 'left', float: "left", borderRadius: "15px"}}>
                                    <div style={{fontSize: "13px"}}>{data.response}</div>
                                    <div style={{color: "grey", fontSize: "9px"}}>{convertToTimeFormat(data.timeStamp)}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{display: 'flex' , justifyContent: "space-around", alignItems: "center"}}>
                <input type="text" placeholder="Try anything with our AI based on your interest" value={inputValue} onChange={handleInputChange} onKeyDown={handleEnterPress} style={{borderRadius: "10px", height: "30px", width: "90%", margin: "10px", padding: "6px", outline: "none", border: "1px solid grey"}} />
            </div>
        </div>
        </>
    )
}

export default ChatGPTScreen;