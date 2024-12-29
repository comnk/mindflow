import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MyContext } from './MyContext';
import './MindfulnessExercise.css';

function MindfulnessExercise() {
    const [myVariable] = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if myVariable (i.e., authentication state) is available
        if (!myVariable) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [myVariable, navigate]);

    if (!myVariable) {
        return <p>Loading...</p>; // Wait until myVariable is available
    }

    return (
        <div className="App-header">
            <Link to="/" className="title">
                <h1 style={{ color: '#0b7077' }}>MindFlow</h1>
            </Link>
            <div className="container">
                <div className="video-container">
                    <iframe title="meditation-video" width="600" height="480" src={myVariable.video_url} />
                </div>
                <Link to="/option" className="buttons" style={{ textDecoration: "none" }}>
                    <button>Go Back</button>
                </Link>
            </div>
        </div>
    );
}

export default MindfulnessExercise;