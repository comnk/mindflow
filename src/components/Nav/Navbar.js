import React, { useState, useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../../MyContext';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [myVariable, , logOut] = useContext(MyContext); // Get logOut function

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const handleSignOut = () => {
    logOut(); // Logout action
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="header">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <p>
            <span className="m">M</span>ind<span className="m">F</span>low<span className="m">.</span>
          </p>
        </Link>
        <div className="hamburger" onClick={handleClick}>
          {click ? <FaTimes size={30} style={{ color: '#ffffff' }} /> : <FaBars size={30} style={{ color: '#ffffff' }} />}
        </div>
        <ul className={`nav-menu ${click ? 'active' : ''} ${!myVariable.isAuthenticated ? 'unauthenticated' : ''}`}>
          {myVariable.isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/homepage" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chatbot" onClick={closeMenu}>
                  Journaling
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/option" onClick={closeMenu}>
                  Mindfulness
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button className="dropdown-btn" onClick={() => setClick(!click)}>
                  Profile
                </button>
                <ul className={`dropdown-menu ${click ? 'show' : ''}`}>
                  <li>
                    <Link to="/profile" onClick={closeMenu}>
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        closeMenu();
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="login-btn" onClick={closeMenu}>
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
