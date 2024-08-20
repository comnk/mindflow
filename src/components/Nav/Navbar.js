import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../images/logo.png'

import './Navbar.css'

const Navbar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    return (
        <div className='header'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    {/* <img src={logo} alt='logo' /> */}
                    <p><span className='m'>M</span>ind<span className='m'>F</span>low<span className='m'>.</span></p>
                </a>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <a href='/' onClick={closeMenu}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/chatbot' onClick={closeMenu}>Chatbot</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/option' onClick={closeMenu}>Exercises</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar