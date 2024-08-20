import { Link } from 'react-router-dom';
import { useContext} from 'react';
import { MyContext } from './MyContext';

function MindfulnessExercise() {
    const [ myVariable ] = useContext(MyContext);

    if (!myVariable) {
        return <p>Loading...</p>; // or some other loading state
    }

    return (
        <div className="App-header">
            <Link to="/" className="title">
                <h1>MindFlow</h1>
             </Link>
            <div className="containers">
                    <iframe title="meditation-video" width="600" height="480" src={myVariable.video_url}/>
                    <Link to="/option" className='buttons'>
                        <button>Go Back</button>
                    </Link>
            </div>
        </div>
    );
}

export default MindfulnessExercise;