// import React, { useState, useEffect } from 'react';
// import './Navbar.css';
// // Importing the logo from your assets folder
// import logo from '../../../assets/logo/logo.svg';

// const Navbar = ({ onNavigate, currentPage }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [eventsDropdown, setEventsDropdown] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { label: 'Home', page: 'home' },
//     { label: 'Events', page: 'events', hasDropdown: true },
//     { label: 'In-Event', page: 'in-event' },
//     { label: 'My Tickets', page: 'tickets' },
//     { label: 'About us', page: 'about' },
//   ];

//   return (
//     <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
//       <div className="navbar__container container">
//         <div className="navbar__logo" onClick={() => onNavigate('home')}>
//           {/* Replaced manual text logo with your SVG asset */}
//           <img src={logo} alt="EntryHub Logo" className="navbar__logo-img" />
//         </div>

//         <ul className="navbar__links">
//           {navLinks.map((link) => (
//             <li key={link.page} className="navbar__link-item">
//               <button
//                 className={`navbar__link ${currentPage === link.page ? 'active' : ''}`}
//                 onClick={() => { onNavigate(link.page); setEventsDropdown(false); }}
//                 onMouseEnter={() => link.hasDropdown && setEventsDropdown(true)}
//                 onMouseLeave={() => link.hasDropdown && setEventsDropdown(false)}
//               >
//                 {link.label}
//                 {/* Removed ChevronDown icon */}
//               </button>
//               {link.hasDropdown && eventsDropdown && (
//                 <div
//                   className={`dropdown ${eventsDropdown ? 'open' : ''}`}
//                   onMouseEnter={() => setEventsDropdown(true)}
//                   onMouseLeave={() => setEventsDropdown(false)}
//                 >
//                   {['Concerts', 'Cinema', 'Football', 'Comedy', 'Festivals'].map(cat => (
//                     <button key={cat} className="dropdown__item" onClick={() => onNavigate('events', cat)}>
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>

//         <div className="navbar__actions">
//           <button className="btn btn--outline" onClick={() => onNavigate('login')}>Login</button>
//           <button className="btn btn--orange" onClick={() => onNavigate('signup')}>Sign Up</button>
//         </div>

//         {/* Replaced Lucide Menu/X icons with standard text or custom spans */}
//         <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//           <span className="hamburger-text">{menuOpen ? 'Close' : 'Menu'}</span>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
//         {navLinks.map((link) => (
//           <button
//             key={link.page}
//             className="mobile-menu__link"
//             onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
//           >
//             {link.label}
//           </button>
//         ))}
//         <div className="mobile-menu__actions">
//           <button className="btn btn--outline" onClick={() => { onNavigate('login'); setMenuOpen(false); }}>Login</button>
//           <button className="btn btn--orange" onClick={() => { onNavigate('signup'); setMenuOpen(false); }}>Sign Up</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






















import React from 'react'
import './Navbar.css'
import logo from '../../../assets/logo/logo.svg'

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