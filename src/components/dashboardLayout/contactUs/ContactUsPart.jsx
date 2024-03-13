import React, { useState } from "react";
import "./ContactUsPart.css";
import axios from "axios";

const ContactUsPart = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [message, setMessage] = useState('');
    const handleSendMessage = async () => {
        if(!name || !email || !message){
            alert('Fill all the fields for sending your query!');
            return;
        }
        try {
            let data = {
                "name": name,
                "email": email,
                "message": message
            };
            let response = await axios.post("http://localhost:8000/api/v1/send-query", data);
            console.log(response);
            if(response.data && response.data.code && response.data.code===200){
                setEmail('');
                setName('');
                setMessage('');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
        <div className="contact_us_main_div">
            <div className="contact_div_left_part">
                <div>
                    <h3 style={{fontSize: "18px", color: "#FFF"}}>Feel free to connect with us!</h3>
                </div>
                <div>
                <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.9424466424589!2d77.613156037078!3d12.934376271070862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1561cb8d63d3%3A0x1596256ce925f630!2sBob&#39;s%20Bar!5e0!3m2!1sen!2sin!4v1705078305846!5m2!1sen!2sin" width="600" height="450" style={{border:0, height: "50vh"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="contact_div_right_part">
                <div>
                    <h3 style={{fontSize: "18px", color: "#FFF", marginTop: "6rem"}}>Drop your query here!</h3>
                </div>
                <div style={{height: "57px"}}>
                    <div className="input_fields_for_query">
                        <span style={{margin: "20px"}}><input type="text" onChange={(e)=>setName(e.target.value)} className="input_field_contact" placeholder="Enter your Name" /></span>
                        <span style={{margin: "20px"}}><input type="email" onChange={(e)=>setEmail(e.target.value)} className="input_field_contact" placeholder="Enter your Email" /></span>
                        <span style={{margin: "20px"}}><input type="text" onChange={(e)=>setMessage(e.target.value)} className="input_field_contact" placeholder="Enter your Message" /></span>
                    </div>
                    <div style={{margin: "20px", textAlign: "center"}}>
                        <button className="send_button_contact_us" onClick={()=>handleSendMessage()}>
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ContactUsPart;