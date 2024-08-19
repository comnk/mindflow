import { json, Link } from 'react-router-dom';
import React, { useState } from 'react';

function Chatbot() {
    const [messages, add_message] = useState([]);
    const [user_input, add_input] = useState('');
    
    const send_input = async () => {
        if (user_input.trim()) {
            const new_message = [... messages, {sender : 'You', text : user_input}];
            add_message(new_message)

            const response = await fetch ('http://localhost:5000/api/journal-chatbot/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_input_jstr: user_input})
            });
            const response_parse = await response.json();
            add_message([...new_message, {sender : 'JotBot', text : response_parse.message}])
            add_input('')
    };}

    return (
        <div style={{padding:'20px', fontFamily:'Quesha, Avenir'}}>
            <div id='chat-window' style={{border:'1px solid #ccc', padding:'10px', height:'300px', overflowY:'scroll', marginBottom:'10px'}}>
                {messages.map((message, index) => (
                    <div key={index} style={{textAlign: message.sender === 'You' ? 'right' : 'left'}}>
                        <p><strong>{message.sender}:</strong> {message.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={user_input}
                onChange={(e) => add_input(e.target.value)}
                placeholder='type to journal...'
                style={{ width: '80%', padding: '10px', marginRight: '10px' }}
            />
            <button onClick={send_input} style={{ padding: '10px 20px' }}>Send</button>
        </div>
    );
}

export default Chatbot;