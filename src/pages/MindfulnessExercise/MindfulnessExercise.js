import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MyContext } from '../../MyContext';
import './MindfulnessExercise.css';

function MindfulnessExercise() {
    const [myVariable] = useContext(MyContext);
    const navigate = useNavigate(); // Hook to handle redirection

    // Check if the user is authenticated
    useEffect(() => {
        if (!myVariable.isAuthenticated) {
            // Redirect to the login page if not authenticated
            navigate("/login");
        }
    }, [myVariable.isAuthenticated, navigate]);

    if (!myVariable) {
        return <p>Loading...</p>; // or some other loading state
    }

    return (
        <div className="App-header">
            <Link to="/homepage" className="title">
                <h1 style={{ color: '#0b7077' }}>MindFlow</h1>
            </Link>
            <div className="container">
                <div className="video-container">
                    <iframe
                        title="meditation-video"
                        width="600"
                        height="480"
                        src={myVariable.video_url}
                    />
                </div>
                <Link to="/option" className="buttons" style={{ textDecoration: "none" }}>
                    <button>Go Back</button>
                </Link>
            </div>
        </div>
    );
}

export default MindfulnessExercise;
