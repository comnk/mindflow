import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './Chatbot';
import Homepage from './Homepage';
import MindfulnessOption from './MindfulnessOption';
import MindfulnessExercise from './MindfulnessExercise';
import './App.css';
import { MyProvider } from './MyContext';

function App() {
  const API_KEY = process.env.OPENAI_KEY; // not sure if this is how its saved
  return (
    <div className='App'>
      <MyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/option" element={<MindfulnessOption />} />
            <Route path="/exercise" element={<MindfulnessExercise />} />
          </Routes>
        </Router>
      </MyProvider>
    </div>
  );
}

export default App;
