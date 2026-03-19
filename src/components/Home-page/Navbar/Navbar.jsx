import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/logo/logo.svg'
import menuIcon from '../../../assets/icons/menu_icon.svg'     // adjust filename to match yours
import closeIcon from '../../../assets/icons/close_icon.svg'   // adjust filename to match yours
import './Navbar.css'

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
        <div className='overlay' onClick={closeSidebar}>
          
        </div>
      )}

      <div className={`nav-link ${!sidebarOpen ? 'sidebar-closed' : 'sidebar-open'}`}>

        {/* Close button inside sidebar */}
        <button className='close-btn' onClick={closeSidebar}>
          <img src={closeIcon} alt='close menu' className='close-icon'/>
        </button>

        <NavLink to='/' onClick={closeSidebar}>Home</NavLink>
        <a href='#events' onClick={closeSidebar}>Events</a>
        <a href='in-event' onClick={closeSidebar}>In-Events</a>
        <a href='my ticket' onClick={closeSidebar}>My Ticket</a>
        <NavLink to='/about-us' onClick={closeSidebar}>About us</NavLink>

        <div>
          <Link to='/sign-up' onClick={closeSidebar}>
            <button className='btn'>Sign Up</button>
          </Link>
        </div>
       
      </div>
    
    </nav>
  );
};

export default Navbar




// import React, { useState } from 'react'
// import './Navbar.css'
// import logo from '../../../assets/logo/logo.svg'

// const Navbar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   return (
//     <nav className='navbar'>
//         <div className='logo'>
//             <img src={logo} alt='EntryHub Logo' className='logo-icon'/>
//         </div>

//         <button className='humburger' onClick={() => setSidebarOpen (!sidebarOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
        
//            <div className={`nav-link sidebar ${!sidebarOpen ? 'sidebar-closed' : 'sidebar-open'}`}>
//             <a href='#'>Home</a>
//             <a href='#events'>Events</a>
//             <a href='in-event'>In-Events</a>
//             <a href='my ticket'>My Ticket</a>
//             <a href='about us'>About us</a>
            
//             </div>

//             <div>
//               <a href='sign up'><button className='btn'>Sign Up</button></a>
//             </div>
        
//     </nav>
//   )
// }

// export default Navbar
