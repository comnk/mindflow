import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Chatbot from './pages/Chatbot/Chatbot';
import Homepage from './pages/Homepage/Homepage';
import MindfulnessOption from './pages/MindfulnessOption/MindfulnessOption';
import MindfulnessExercise from './pages/MindfulnessExercise/MindfulnessExercise';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from "./pages/Profile/Profile";
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
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />;
          </Routes>
        </Router>
      </MyProvider>
    </div>
  );
}

export default App;
