import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Chatbot from './Chatbot';
import Homepage from './Homepage';
import MindfulnessOption from './MindfulnessOption';
import MindfulnessExercise from './MindfulnessExercise';
import Login from './Login';
import Register from './Register';
import './App.css';
import { MyProvider, MyContext } from './MyContext';

function App() {
  const PrivateRoute = ({ element }) => {
    const [myVariable] = useContext(MyContext);
    return myVariable?.isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <MyProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
            <Route path="/chatbot" element={<PrivateRoute element={<Chatbot />} />} />
            <Route path="/option" element={<PrivateRoute element={<MindfulnessOption />} />} />
            <Route path="/exercise" element={<PrivateRoute element={<MindfulnessExercise />} />} />
          </Routes>
        </Router>
      </MyProvider>
    </div>
  );
}

export default App;
