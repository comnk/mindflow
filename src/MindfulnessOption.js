import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext} from 'react';
import './App.css';
import { MyContext } from './MyContext';

function MindfulnessOption() {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    let [myVariable, setMyVariable] = context;
    
    const handleOutput = async (e) => {
        console.log(e.target.value);

        const response = await fetch ('http://localhost:5000/api/mindfulness-level/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({level: e.target.value})
        });

        const response_parse = await response.json();
        //variable = setVariable(response_parse["message"]);
        setMyVariable(response_parse["message"]);
        console.log(response_parse, myVariable);
        navigate('/exercise');
    }

    return (
        <div className='App-header'>
            <Link to="/" className="title">
                <h1>MindFlow</h1>
             </Link>
            <div className='container'>
                <p>Mindfulness Exercises!</p>
                
                <div className="buttons">
                    <Link to="/exercise">
                        <button value="beginner" onClick={e => handleOutput(e, "value")}>Beginner</button>
                    </Link>
                    <Link to="/exercise">
                        <button value="moderate" onClick={e => handleOutput(e, "value")}>Moderate</button>
                    </Link>
                    <Link to="/exercise">
                        <button value="advanced" onClick={e => handleOutput(e, "value")}>Advanced</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export let response_send;
export default MindfulnessOption;