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
            add_input('');
    };}
}

export default Chatbot;