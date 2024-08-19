import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchQuote = async () => {
          try {
            const response = await fetch("https://zenquotes.io/api/today");
            const data = await response.json();

            if (data && data.length > 0) {
              setQuote(data[0].q);
              setAuthor(data[0].a);
            }
          } catch (error) {
            console.log("Error fetching quote");
          }
        };

        fetchQuote();
        
    }, []);

    return (
        <div className="App-header">
          <Link to="/" className="title">
                <h1>MindFlow</h1>
          </Link>
          <div className='container'>
            <p>"{quote}" - {author}</p>
            <div className='buttons'>
                <Link to="/chatbot">
                    <button>Chatbot</button>
                </Link>
                <Link to="/option">
                    <button>Exercises</button>
                </Link>
            </div>
          </div>
        </div>
      );
}

export default Homepage;