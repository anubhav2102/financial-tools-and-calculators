import React, { useState } from 'react';
import axios from 'axios';

const GetAllNotes = () =>{
    let [notes, setNotes] = useState([]);
    const getAllNotes = async () => {
        if(localStorage.getItem('email_id')){
            console.log("working")
            let email = localStorage.getItem("email_id");
            console.log(email);
            let obj = {email: email};
            let data = await axios.post("http://localhost:3000/api/v1/get-notes", obj);
            console.log(data);
            data = data.data;
            setNotes(data);
        }
    }
    const hideAllNotes = () => {
        if(localStorage.getItem('email_id')){
            setNotes([]);
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
    return(
        <>
            <div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                <button onClick={getAllNotes}>Show My Notes</button>
                <button onClick={hideAllNotes}>Hide My Notes</button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index}>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.monthlyInvestment}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.annualInterestRate}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.investmentDuration}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{note.totalAmount}</td>
                                <td style={{padding: "10px", margin: "10px", border: "1px solid #a39e9e"}}>{convertToNormalDate(note.timeStamp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
        </>
    )
}

export default GetAllNotes;