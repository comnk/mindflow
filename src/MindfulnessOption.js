import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from './MyContext';
import Navbar from './components/Nav/Navbar';
import './MindfulnessOption.css'

const options = {
    "beginner": "For users who are starting with meditation",
    "moderate": "For users who want to take things up a level",
    "advanced": "For users who meditate regularly and want longer sessions"
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