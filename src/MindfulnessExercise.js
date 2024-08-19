import { Link } from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import { MyContext } from './MyContext';

function MindfulnessExercise() {
   {/*} const [videoLink, setVideoLink] = useState("");

    useEffect(() => {
        fetch("https://hackvortex4-project.onrender.com/api/mindfulness-video/").then(res => res.json()).then(data => {
            setVideoLink(data.video_url);
        })
    })*/}

    const { myVariable } = useContext(MyContext);
    
    console.log(myVariable);

    return (
        <div className="App-header">
            <Link to="/" className="title">
                <h1>MindFlow</h1>
             </Link>
            <p>Hello World!</p>
            {/*<div className="containers">
                    <iframe width="600" height="480" src={videoLink}/>
            </div>*/}
        </div>
    );
}

export default MindfulnessExercise;