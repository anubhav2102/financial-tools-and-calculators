import React, { useState } from 'react';
import axios from 'axios';

const GetAllNotes = (calculatorType) =>{
    let [notes, setNotes] = useState([]);
    let [showNote, setShowNote] = useState(false);
    const getAllNotes = async () => {
        if(localStorage.getItem('email_id')){
            console.log("working")
            let email = localStorage.getItem("email_id");
            console.log(email);
            let obj = {email: email};
            let data = await axios.post("http://localhost:3000/api/v1/get-notes", obj);
            console.log(data);
            data = data.data;
            let tempStore = [];
            for(let i=0;i<data.length;i++){
                if(data[i].calculatorType){
                    if(data[i].calculatorType === calculatorType.calculatorType){
                        tempStore.push(data[i]);
                    }
                }
            }
            setNotes(tempStore);
            setShowNote(true);
        }
    }
    const hideAllNotes = () => {
        if(localStorage.getItem('email_id')){
            setNotes([]);
            setShowNote(false);
        }
    }
    const convertToNormalDate = (value) => {
        const date = new Date(value);
        const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);
        console.log(formattedDate);
        return formattedDate
    }
    const deleteNote = async (note, email) => {
        let response = await axios.post("http://localhost:3000/api/v1/delete-note", {email, note});
        console.log(response);
        if(response.status == 200){
            alert('Note successfully removed!');
        }
    }
    return(
        <>
            <div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly", height: '12vh'}}>
                <button style={{width: 'fit-content', height: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}} onClick={getAllNotes}>Show My Notes</button>
                <button style={{width: 'fit-content', height: 'fit-content', border: 'none', background: '#4e4ef0', color: 'white', borderRadius: '10px', padding: '7px 17px', fontSize: '14px', cursor: 'pointer'}} onClick={hideAllNotes}>Hide My Notes</button>
            </div>
            {notes.length>0 && (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", margin: "20px"}}>
                <table>
                    <thead>
                        <tr>
                            <th style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>Monthly Investment</th>
                            <th style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>Annual Interest Rate</th>
                            <th style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>Investment Duration</th>
                            <th style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>Total Amount</th>
                            <th style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>Time Stamp</th>
                            <th style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index}>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.investment}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.annualInterestRate}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.investmentDuration}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.totalAmount}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{convertToNormalDate(note.timeStamp)}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfCYJZooXUxEEzGXtHy8WxSHw6jhvjv5o3A&usqp=CAU" style={{height: '16px', cursor: 'pointer'}} alt="Edit Icon" /></span>
                                    <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUvEMwJZK4_nLY9z93Cskb-mLJYZDGrHNpg&usqp=CAU" onClick={()=>deleteNote(note, localStorage.getItem('email_id'))} style={{height: '20px', cursor: 'pointer'}} alt="Delete Icon" /></span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
            {
                notes.length==0 && showNote && (
                    <>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIoYUMn3jtIgPEKkNHU7Folx5MS3CNiZlFjw&usqp=CAU" style={{height: "200px"}} alt="" />
                    </div>
                    </>
                )
            }
        </div>
        </>
    )
}

export default GetAllNotes;