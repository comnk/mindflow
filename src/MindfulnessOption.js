import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from './MyContext';

function MindfulnessOption() {
    const [myVariable, setMyVariable] = useContext(MyContext);

    const handleOutput = async (e) => {
        const response = await fetch('http://localhost:5000/api/mindfulness-level/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level: e.target.value }),
        });

        const response_parse = await response.json();
        setMyVariable(response_parse.url);
    };

    return (
        <div className="App-header">
            <Link to="/" className="title">
                <h1>MindFlow</h1>
            </Link>
            <div className="container">
                <p>Mindfulness Exercises!</p>
                <div className="buttons">
                    <Link to="/exercise">
                        <button value="beginner" onClick={handleOutput}>Beginner</button>
                    </Link>
                    <Link to="/exercise">
                        <button value="moderate" onClick={handleOutput}>Moderate</button>
                    </Link>
                    <Link to="/exercise">
                        <button value="advanced" onClick={handleOutput}>Advanced</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MindfulnessOption;