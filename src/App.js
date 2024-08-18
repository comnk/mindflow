import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './Chatbot';
import Homepage from './Homepage';
import MindfulnessExercise from './MindfulnessExercise';
import './App.css';

function App() {
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
