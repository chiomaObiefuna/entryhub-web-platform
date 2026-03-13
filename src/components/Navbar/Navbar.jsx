import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo/logo.svg'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='logo'>
            <img src={logo} alt='EntryHub Logo' className='logo-icon'/>
        </div>
        <ul className='nav-links'>
            <li>Home</li>
            <li>Events</li>
            <li>In-Events</li>
            <li>My Ticket</li>
            <li>About us</li>
            <li><button className='btn'>Sign Up</button></li>
        </ul>
    </nav>
  )
}

export default Navbar