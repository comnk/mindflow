import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './App.css';

function MindfulnessOption() {
    const handleOutput = async (e) => {
        console.log(e.target.value);

        const response = await fetch ('http://localhost:8080/api/mindfulness-level/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({level: e.target.value})
        });

        const response_parse = await response.json();
        console.log(response_parse);
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
                {/*<div className="containers">
                    <iframe width="600" height="480" src={videoLink}/>
                </div>*/}
            </div>
        </div>
    );
}

export default MindfulnessOption;