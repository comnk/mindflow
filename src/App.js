import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './Chatbot';
import Homepage from './Homepage';
import MindfulnessOption from './MindfulnessOption';
import MindfulnessExercise from './MindfulnessExercise';
import './App.css';

function App() {
  const API_KEY = process.env.OPENAI_KEY; // not sure if this is how its saved
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/option" element={<MindfulnessOption />} />
          <Route path="/exercise" element={<MindfulnessExercise />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
