import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Chatbot() {
    const [messages, add_message] = useState([]);
    const [user_input, add_input] = useState('');
    
    const send_input = async () => {
        console.log('Sending input...');
        if (user_input.trim()) {
            const new_message = [...messages, {sender : 'You', text : user_input}];
            add_message(new_message)

            const response = await fetch('http://127.0.0.1:8080/api/journal-chatbot/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_input_jstr: user_input})
            });
            const response_parse = await response.json();
            add_message([...new_message, {sender : 'JotBot', text : response_parse.message}])
            add_input('');
            console.log('Input cleared');
        }
    };

    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            padding: '20px',
            fontFamily: 'Avenir',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
                height: '70vh',
                justifyContent: 'space-between',
            }}>
                <div id='chat-window' style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    height: '80%',
                    overflowY: 'scroll',
                    boxSizing: 'border-box',
                    marginBottom: '10px',
                    borderRadius: '20px',
                    backgroundColor: 'white'
                }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{ textAlign: message.sender === 'You' ? 'right' : 'left' }}>
                            <p><strong>{message.sender}:</strong> {message.text}</p>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={user_input}
                        onChange={(e) => add_input(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && user_input.trim()) {
                                send_input();
                            }
                        }}
                        placeholder='type to journal...'
                        style={{
                            flex: '1',
                            padding: '10px',
                            marginRight: '10px',
                            borderRadius: '10px',
                        }}
                    />
                    <button 
                        onClick={send_input} 
                        disabled={!user_input.trim()}
                        style={{ 
                            padding: '10px 20px', 
                            borderRadius: '10px', 
                            backgroundColor: 'white', 
                            border: '1px solid #ccc' 
                        }}>
                        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
