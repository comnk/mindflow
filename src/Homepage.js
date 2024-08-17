import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Link, Router, Routes, Route } from 'react-router-dom';

function Homepage() {
    const [message, setMessage] = useState(0);

    useEffect(() => {
        fetch('/api/homepage').then(res => res.json()).then(data => {
        setMessage(data.message);
        });
    }, []);

    return (
        <div className="App-header">
          {/*<header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
          </header>*/}
          <div className='buttons'>
            <Link to="/chatbot">
                <button>Chatbot</button>
            </Link>
            <Link to="/exercise">
                <button>Exercises</button>
            </Link>
            <Link to="/game">
                <button>Games</button>
            </Link>
          </div>
          <p>{message}</p>
        </div>
      );
}

export default Homepage;