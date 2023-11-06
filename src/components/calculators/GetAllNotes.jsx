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
    return(
        <>
            <div>
            <button onClick={getAllNotes}>My Notes</button>
            {notes!=[] && (
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>Monthly Investment</th>
                            <th>Annual Interest Rate</th>
                            <th>Investment Duration</th>
                            <th>Total Amount</th>
                            <th>Time Stamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index}>
                                <td>{note.monthlyInvestment}</td>
                                <td>{note.annualInterestRate}</td>
                                <td>{note.investmentDuration}</td>
                                <td>{note.totalAmount}</td>
                                <td>{note.timeStamp}</td>
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