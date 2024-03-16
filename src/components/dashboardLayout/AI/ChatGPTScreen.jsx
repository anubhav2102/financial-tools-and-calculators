import React, { useEffect, useState } from "react";

const ChatGPTScreen = ({currentItem}) => {
    let [allChats, setAllChats] = useState([]);
    let [originalChats, setOriginalChats] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
        console.log(inputValue);
        setInputValue('');
        let newObj = {timeStamp: new Date(), response: '', prompt: inputValue};
        setAllChats([...originalChats, newObj]);
        console.log(allChats);
        }
    };
    useEffect(()=>{
        console.log(currentItem);
        let data = [
            {'timeStamp': '12/02/2023', prompt: 'how is this stock in 2023', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quaerat eveniet iusto, voluptatem et autem harum possimus nam unde placeat maxime fugiat consectetur aperiam sequi voluptate, optio laudantium. Laudantium suscipit excepturi doloremque, odio aliquam ullam ducimus hic porro quasi aspernatur in, natus laboriosam molestias fuga tenetur rem! Non, dolores explicabo?'},
            {'timeStamp': '15/08/2023', prompt: 'how is this stock in 2023', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quaerat eveniet iusto, voluptatem et autem harum possimus nam unde placeat maxime fugiat consectetur aperiam sequi voluptate, optio laudantium. Laudantium suscipit excepturi doloremque, odio aliquam ullam ducimus hic porro quasi aspernatur in, natus laboriosam molestias fuga tenetur rem! Non, dolores explicabo?'},
            {'timeStamp': '04/01/2024', prompt: 'how is this stock in 2024', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quaerat eveniet iusto, voluptatem et autem harum possimus nam unde placeat maxime fugiat consectetur aperiam sequi voluptate, optio laudantium. Laudantium suscipit excepturi doloremque, odio aliquam ullam ducimus hic porro quasi aspernatur in, natus laboriosam molestias fuga tenetur rem! Non, dolores explicabo?'},
            {'timeStamp': '21/02/2024', prompt: 'how is this stock in 2024', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quaerat eveniet iusto, voluptatem et autem harum possimus nam unde placeat maxime fugiat consectetur aperiam sequi voluptate, optio laudantium. Laudantium suscipit excepturi doloremque, odio aliquam ullam ducimus hic porro quasi aspernatur in, natus laboriosam molestias fuga tenetur rem! Non, dolores explicabo?'},
            {'timeStamp': '31/03/2024', prompt: 'how is this stock in 2024', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quaerat eveniet iusto, voluptatem et autem harum possimus nam unde placeat maxime fugiat consectetur aperiam sequi voluptate, optio laudantium. Laudantium suscipit excepturi doloremque, odio aliquam ullam ducimus hic porro quasi aspernatur in, natus laboriosam molestias fuga tenetur rem! Non, dolores explicabo?'}
        ];
        setAllChats(data);
        setOriginalChats(data);
    }, [currentItem])

    return (
        <>
        <div>
            <div style={{height: "50vh", overflow: "hidden scroll", background: "green"}}>
                {
                    allChats.map((data,idx)=>{
                        return (
                            <div key={idx}>
                                <div style={{background: "white", padding: "15px", margin: "10px", width: "70%", textAlign: 'left', float: "right"}}>
                                    <div style={{fontSize: "13px"}}>{data.prompt}</div>
                                    <div style={{color: "grey", fontSize: "12px"}}>{data.timeStamp.toString()}</div>
                                </div>
                                <div style={{background: "white", padding: "15px", margin: "10px", width: "70%", textAlign: 'left', float: "left"}}>
                                    <div style={{fontSize: "13px"}}>{data.response}</div>
                                    <div style={{color: "grey", fontSize: "12px"}}>{data.timeStamp.toString()}</div>
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