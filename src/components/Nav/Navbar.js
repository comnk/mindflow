import React, { useState, useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { MyContext } from '../../MyContext';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [myVariable, , logOut] = useContext(MyContext); // Get the logOut function

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const handleSignOut = () => {
    logOut(); // Update the context to log out
    navigate('/login'); // Redirect to login page
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" onClick={closeMenu}>
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

          {myVariable.isAuthenticated && (
            <li className="nav-item dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                Profile
              </button>
              <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
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
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;