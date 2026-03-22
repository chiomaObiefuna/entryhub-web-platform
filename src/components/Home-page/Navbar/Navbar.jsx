import { useState } from 'react'
import logo from '../../../assets/logo/logo.svg'
import menuIcon from '../../../assets/icons/menu_icon.svg'
import closeIcon from '../../../assets/icons/close_icon.svg';
import "./Navbar.css"

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src={logo} alt='EntryHub Logo' className='logo-icon'/>
      </div>

      {/* Hamburger button - only visible on mobile */}
      <button className='hamburger' onClick={openSidebar}>
        <img src={menuIcon} alt='open menu' className='menu-icon'/>
      </button>

      {/* Overlay — clicking outside closes the sidebar */}
      {sidebarOpen && (
        <div className='overlay' onClick={closeSidebar}></div>
      )}

      <div className={`nav-link ${!sidebarOpen ? 'sidebar-closed' : 'sidebar-open'}`}>

        {/* Close button inside sidebar */}
        <button className='close-btn' onClick={closeSidebar}>
          <img src={closeIcon} alt='close menu' className='close-icon'/>
        </button>

        <a href='#' onClick={closeSidebar}>Home</a>
        <a href='#events' onClick={closeSidebar}>Events</a>
        <a href='in-event' onClick={closeSidebar}>In-Events</a>
        <a href='my ticket' onClick={closeSidebar}>My Ticket</a>
        <a href='about us' onClick={closeSidebar}>About us</a>
        <a href='sign up'>
          <button className='btn'>Sign Up</button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar