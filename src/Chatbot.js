import { useState, useEffect, useRef, useContext } from 'react';
import { MyContext } from './MyContext';  // Assuming you're using MyContext for auth
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/Nav/Navbar';

function Chatbot() {
    const [messages, add_message] = useState([]);
    const [user_input, add_input] = useState('');
    const chatWindowRef = useRef(null);

    // Access the authentication context to get the token
    const { token } = useContext(MyContext);

    const send_input = async () => {
        if (user_input.trim()) {
            const new_message = [...messages, { sender: 'You', text: user_input }];
            add_message(new_message);

            try {
                const response = await fetch('https://hackvortex4-project.onrender.com/api/journal-chatbot/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Add token to headers
                    },
                    body: JSON.stringify({ user_input_jstr: user_input }),
                });

                const response_parse = await response.json();
                if (response.ok) {
                    add_message([...new_message, { sender: 'JotBot', text: response_parse.message }]);
                } else {
                    add_message([...new_message, { sender: 'JotBot', text: 'Error: Could not fetch response.' }]);
                }
            } catch (error) {
                console.error('Error:', error);
                add_message([...new_message, { sender: 'JotBot', text: 'An error occurred. Please try again.' }]);
            }

            add_input('');
        }
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            <Navbar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    padding: '20px',
                    fontFamily: 'Avenir',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40%',
                        height: '70vh',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        id="chat-window"
                        ref={chatWindowRef}
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            height: '80%',
                            overflowY: 'scroll',
                            boxSizing: 'border-box',
                            marginBottom: '10px',
                            borderRadius: '20px',
                            backgroundColor: 'white',
                            color: 'black',
                        }}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: message.sender === 'You' ? 'right' : 'left',
                                    display: 'flex',
                                    justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start',
                                    marginBottom: '10px',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor:
                                            message.sender === 'You' ? 'rgba(176, 196, 222, 0.7)' : 'rgba(125, 168, 210, 0.7)',
                                        color: 'black',
                                        padding: '8px 10px',
                                        borderRadius: '15px',
                                        maxWidth: '60%',
                                        wordWrap: 'break-word',
                                        textAlign: 'left',
                                        alignSelf: message.sender === 'You' ? 'flex-start' : 'flex-end',
                                    }}
                                >
                                    <p style={{ margin: '0' }}>
                                        <strong>{message.sender}:</strong> {message.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            id="journal-entry"
                            value={user_input}
                            onChange={(e) => add_input(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && user_input.trim()) {
                                    send_input();
                                    add_input('');
                                }
                            }}
                            placeholder="type to journal..."
                            style={{
                                flex: '1',
                                padding: '10px',
                                marginRight: '10px',
                                borderRadius: '10px',
                            }}
                        />
                        <button
                            onClick={() => {
                                send_input();
                                add_input('');
                            }}
                            disabled={!user_input.trim()}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                border: '1px',
                                borderRadius: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;