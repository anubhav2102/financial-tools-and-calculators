import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatGPTScreen = ({currentItem}) => {
    let [allChats, setAllChats] = useState([]);
    const [inputValue, setInputValue] = useState('');
    let [promptAutoCount, setPromptAutoCount] = useState(-1);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = async (event) => {
        if (event.key === 'Enter') {
        console.log(inputValue);
        setInputValue('');
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
            setPromptAutoCount(-1);
            const response = await axios.post('http://localhost:8000/api/v1/generate-response', { 
                prompt: prompt, 
                email: email, 
                stockDetail: currentItem,
                autoPromptCount: promptAutoCount
             });
            console.log(response);
            setAllChats([]);
            if(response.data.code===200){
                let allChatsData = [];
                        let idx = -1;
                        for(let i=0;i<response.data.data.stockData.length;i++){
                            if(response.data.data.stockData[i].stockDetail===currentItem){
                                idx = i;
                                break;
                            }
                        }
                        if(idx!==-1){
                            for(let i=0;i<response.data.data.stockData[idx].prompt.length;i++){
                                allChatsData.push({prompt: response.data.data.stockData[idx].prompt[i], response: response.data.data.stockData[idx].response[i], timeStamp: response.data.data.stockData[idx].timestamp[i]});
                            }
                            setAllChats(allChatsData);
                        }
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
    };
    const convertToTimeFormat = (dateString) => {
        const providedDate = new Date(dateString);
        const currentDate = new Date();
        if (providedDate.toDateString() === currentDate.toDateString()) {
            const formattedTime = providedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            return formattedTime;
        }
        const yesterday = new Date();
        yesterday.setDate(currentDate.getDate() - 1);
        if (providedDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        const timeDiff = Math.abs(currentDate.getTime() - providedDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    const getAutoPrompt = async () => {
        if(localStorage.getItem('email_id') && currentItem &&
         ((JSON.parse(localStorage.getItem('gptGenerated')) && JSON.parse(localStorage.getItem('gptGenerated')).length>0 && !JSON.parse(localStorage.getItem('gptGenerated')).includes(currentItem) )
         || !JSON.parse(localStorage.getItem('gptGenerated')))){
            setPromptAutoCount(++promptAutoCount);
            let email = localStorage.getItem('email_id');
                    let prompt = `Generate insights about ${currentItem} stock performance and outlook based on recent data.`;
                    console.log(prompt)
                    try {
                        const response = await axios.post('http://localhost:8000/api/v1/generate-response', { 
                        prompt: prompt, 
                        email: email, 
                        stockDetail: currentItem,
                        autoPromptCount: promptAutoCount
                    });
                    console.log(response);
                    setAllChats([]);
        if(response.data.code===200){
            let data = [];
            if(localStorage.getItem('gptGenerated')){
                data = JSON.parse(localStorage.getItem('gptGenerated'));
            }
            if(!data.includes(currentItem)){
                data.push(currentItem);
            }
            localStorage.setItem('gptGenerated', JSON.stringify(data));
            let allChatsData = [];
            let idx = -1;
                for(let i=0;i<response.data.data.stockData.length;i++){
                    if(response.data.data.stockData[i].stockDetail===currentItem){
                        idx = i;
                        break;
                    }
                }
                if(idx!==-1){
                    for(let i=0;i<response.data.data.stockData[idx].prompt.length;i++){
                        allChatsData.push({prompt: response.data.data.stockData[idx].prompt[i], response: response.data.data.stockData[idx].response[i], timeStamp: response.data.data.stockData[idx].timestamp[i]});
                    }
                }
            setAllChats(allChatsData);
        }
                    } catch (error) {
                        console.error(error);
                    }
        }
    }
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
                    let idx = -1;
                    for(let i=0;i<data.data.data.stockData.length;i++){
                        if(data.data.data.stockData[i].stockDetail===currentItem){
                            idx = i;
                            break;
                        }
                    }
                    if(idx!==-1){
                        for(let i=0;i<data.data.data.stockData[idx].prompt.length;i++){
                            allChatsData.push({prompt: data.data.data.stockData[idx].prompt[i], response: data.data.data.stockData[idx].response[i], timeStamp: data.data.data.stockData[idx].timestamp[i]});
                        }
                        setAllChats(allChatsData);
                    }else{
                        getAutoPrompt();
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    const checkStatus = () => {
        if(JSON.parse(localStorage.getItem('gptGenerated')) && JSON.parse(localStorage.getItem('gptGenerated')).length>0 && JSON.parse(localStorage.getItem('gptGenerated')).includes(currentItem)){
            console.log('code going in get requesr')
            getChatsData();
        }else{
            console.log('code going in post requesr')
            getAutoPrompt();
        }
    }
    useEffect(()=>{
        checkStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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