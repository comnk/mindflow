import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './Chatbot';
import Homepage from './Homepage';
import MindfulnessExercise from './MindfulnessExercise';
import './App.css';

function App() {
  const [message, setMessage] = useState(0);

  useEffect(() => {
    fetch('/api/homepage').then(res => res.json()).then(data => {
      setMessage(data.message);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/exercise" element={<MindfulnessExercise />} />
          <Route path="/game" element={<Chatbot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
