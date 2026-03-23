import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/logo/logo.svg'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home',      to: '/',          type: 'navlink' },
  { label: 'Events',    to: '/#events',   type: 'anchor'  },
  { label: 'In-Events', to: '/#in-events',type: 'anchor'  },
  { label: 'My Ticket', to: '/my-ticket', type: 'navlink' },
  { label: 'About Us',  to: '/about-us',  type: 'navlink' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu  = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* ─── Top Navbar ─── */}
      <nav className='navbar'>
        <Link to='/' className='navbar__logo'>
          <img src={logo} alt='EntryHub logo' />
        </Link>

        {/* Desktop Links */}
        <ul className='navbar__desktop-links'>
          {NAV_LINKS.map(({ label, to, type }) => (
            <li key={label}>
              {type === 'navlink' ? (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              ) : (
                <a href={to} className='navbar__link'>{label}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Sign Up */}
        <Link to='/sign-up' className='navbar__signup-btn'>
          Sign Up
        </Link>

        {/* Hamburger – mobile only */}
        <button
          className={`navbar__hamburger${isOpen ? ' is-active' : ''}`}
          onClick={openMenu}
          aria-label='Open navigation menu'
          aria-expanded={isOpen}
        >
          <span className='bar' />
          <span className='bar' />
          <span className='bar' />
        </button>

        <NavLink to='/' onClick={closeSidebar} className='link-nav'>Home</NavLink>
        <a href='#events' onClick={closeSidebar} className='link-nav'>Events</a>
        <a href='in-event' onClick={closeSidebar} className='link-nav'>In-Events</a>
        <a href='my ticket' onClick={closeSidebar} className='link-nav'>My Ticket</a>
        <NavLink to='/about-us' onClick={closeSidebar}className='link-nav'>About us</NavLink>

        <div>
          <Link to='/sign-up' onClick={closeSidebar}>
            <button className='btn sign-but'>Sign Up</button>
      </Link>

      {/* ─── Backdrop ─── */}
      <div
        className={`sidebar-backdrop${isOpen ? ' is-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden='true'
      />

      {/* ─── Mobile Sidebar ─── */}
      <aside className={`sidebar${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>

        {/* Sidebar Header */}
        <div className='sidebar__header'>
          <Link to='/' className='sidebar__logo' onClick={closeMenu}>
            <img src={logo} alt='EntryHub logo' />
          </Link>

          <button
            className='sidebar__close-btn'
            onClick={closeMenu}
            aria-label='Close navigation menu'
          >
            {/* Inline SVG X – never missing, no file dependency */}
            <svg width='22' height='22' viewBox='0 0 24 24' fill='none'
              stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
              <line x1='18' y1='6'  x2='6'  y2='18' />
              <line x1='6'  y1='6'  x2='18' y2='18' />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className='sidebar__links'>
          {NAV_LINKS.map(({ label, to, type }) => (
            <li key={label}>
              {type === 'navlink' ? (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              ) : (
                <a href={to} className='sidebar__link' onClick={closeMenu}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Sidebar Sign Up */}
        <div className='sidebar__footer'>
          <Link to='/sign-up' className='sidebar__signup-btn' onClick={closeMenu}>
            Sign Up
          </Link>
        </div>
      </aside>
      </div>
      </nav>
    </>
    
  );
};


export default Navbar;