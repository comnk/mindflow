import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

function MindfulnessExercise() {
    const [videoLink, setVideoLink] = useState("");

    useEffect(() => {
        fetch("https://hackvortex4-project.onrender.com/api/mindfulness-video/").then(res => res.json()).then(data => {
            setVideoLink(data.video_url);
        })
    })

    return (
        <div>
            <p>Mindfulness Exercises!</p>
            <Link to="/">
              <button>Go Back</button>
            </Link>
            <div className="containers">
                <iframe width="600" height="480" src={videoLink}/>
            </div>
        </div>
    );
}

export default MindfulnessExercise;