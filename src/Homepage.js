import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import{ FaQuoteLeft,  FaQuoteRight } from "react-icons/fa";
import logo from './components/images/logo.png'
import './Homepage.css'
function Homepage() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchQuote = async () => {
          try {
            const response = await fetch("https://hackvortex4-project.onrender.com/api/quote");
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
          <div className='content'>
          <Navbar />
          <div className='container container-box'>
              <Link to="/" className="title">
                <h1>MindFlow</h1>
              </Link>
            <div id="quote-box">
              <div className="quote-content">
                <h2 id="text">
                  <FaQuoteLeft size="30" style={{marginRight: "10px"}} />
                  {quote}
                  <FaQuoteRight size="30" style={{marginRight: "10px"}} />
                </h2>
                <h4 id="author">{author}</h4>
              </div>
            </div>
            {/* <p>
              <FaQuoteLeft size="30" style={{marginRight: "10px"}} />
              {quote} - {author}
              <FaQuoteRight size="30" style={{marginRight: "10px"}} />
            </p> */}
            <div className='buttons btn-box'>
                <Link to="/chatbot">
                    <button>Chatbot</button>
                </Link>
                <Link to="/option">
                    <button>Exercises</button>
                </Link>
            </div>
          </div>
          </div>
        </div>
      );
}

export default Homepage;