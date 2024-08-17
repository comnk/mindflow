import { Link } from 'react-router-dom';

function MindfulnessExercise() {
    return (
        <div>
            <p>Mindfulness Exercises!</p>
            <Link to="/">
              <button>Go Back</button>
            </Link>
        </div>
    );
}

export default MindfulnessExercise;