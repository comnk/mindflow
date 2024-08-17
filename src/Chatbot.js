import { Link, Router, Routes, Route } from 'react-router-dom';

function Chatbot() {
    return (
        <div>
            <p>Hello World!</p>
            <Link to="/">
              <button>Go Back</button>
            </Link>
        </div>
    );
}

export default Chatbot;