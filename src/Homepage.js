import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
    const [message, setMessage] = useState(0);

    useEffect(() => {
        fetch('https://hackvortex4-project.onrender.com/api/homepage').then(res => res.json()).then(data => {
        setMessage(data.message);
        });
    }, []);

    return (
        <div className="App-header">
          <h1>MindFlow</h1>
          <div className='container'>
            <div className='buttons'>
                <Link to="/chatbot">
                    <button>Chatbot</button>
                </Link>
                <Link to="/exercise">
                    <button>Exercises</button>
                </Link>
          </div>
          
            <p>{message}</p>
          </div>
        </div>
      );
}

export default Homepage;