import { Link } from 'react-router-dom';

function Game() {
    return (
        <div>
            <p>Game!</p>
            <Link to="/">
              <button>Go Back</button>
            </Link>
        </div>
    );
}

export default Game;