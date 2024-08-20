import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from './MyContext';
import Navbar from './components/Nav/Navbar';
import './MindfulnessOption.css'

const options = {
    "beginner": "This is for users who are getting started with meditation",
    "moderate": "This is for users who did meditation before and want to take things up a new level",
    "advanced": "This is for users who meditate regularly and want longer sessions"
}

function MindfulnessOption() {
    const [myVariable, setMyVariable] = useContext(MyContext);
    const [explanation, setExplanation] = useState("Mindfulness Exercises!")

    const handleOutput = async (e) => {
        const response = await fetch('https://hackvortex4-project.onrender.com/api/mindfulness-level/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level: e.target.value }),
        });

        const response_parse = await response.json();
        setMyVariable(response_parse.url);
    };

    return (
        <div className="App-header">
            <Navbar />
            <div className="container">
                <div className='content'>
                <Link to="/" className="title">
                    <h1>MindFlow</h1>
                </Link>
                <p className='option'>{explanation}</p>
                <div className="buttons">
                    <Link to="/exercise">
                        <button value="beginner"
                        onClick={handleOutput}
                        onMouseEnter={() => setExplanation(options["beginner"])}
                        onMouseLeave={() => setExplanation("Mindfulness Exercises!")}
                        >Beginner</button>
                    </Link>
                    <Link to="/exercise">
                        <button value="moderate"
                        onClick={handleOutput}
                        onMouseEnter={() => setExplanation(options["moderate"])}
                        onMouseLeave={() => setExplanation("Mindfulness Exercises!")}
                        >Moderate</button>
                    </Link>
                    <Link to="/exercise">
                        <button value="advanced"
                        onClick={handleOutput}
                        onMouseEnter={() => setExplanation(options["advanced"])}
                        onMouseLeave={() => setExplanation("Mindfulness Exercises!")}
                        >Advanced</button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default MindfulnessOption;