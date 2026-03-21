import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo/logo.svg'; 
import './EventPage.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://eventhub-backend-pxoz.onrender.com/api/events')
      .then(res => res.json())
      .then(data => {
        const cinemaOnly = data.filter(event => 
          event.category?.toLowerCase() === 'cinema' || 
          event.title?.toLowerCase().includes('cinema')
        );
        setEvents(cinemaOnly);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Professional SVG Icons for Sidebar
  const SidebarIcon = ({ type }) => {
    const icons = {
      dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
      home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      events: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      tickets: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><line x1="13" y1="5" x2="13" y2="7"/><line x1="13" y1="17" x2="13" y2="19"/></svg>,
      payment: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
      settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
      help: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    };
    return icons[type];
  };

  return (
    <div className="dashboard-layout">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Entry Hub" className="logo-img" />
        </div>

        <div className="menu-group">
          <p className="menu-title">MAIN MENU</p>
          <nav className="nav-list">
            <div className="nav-link"><SidebarIcon type="dashboard" /> Dashboard <span className="arrow-circle">❯</span></div>
            <div className="nav-link"><SidebarIcon type="home" /> Home <span className="arrow-circle">❯</span></div>
            <div className="nav-link active"><SidebarIcon type="events" /> Events <span className="arrow-circle">❯</span></div>
            <div className="nav-link"><SidebarIcon type="tickets" /> My Tickets <span className="arrow-circle">❯</span></div>
            <div className="nav-link"><SidebarIcon type="payment" /> Payment <span className="arrow-circle">❯</span></div>
          </nav>
        </div>

        <div className="menu-group extra-spacing">
          <p className="menu-title">OTHER</p>
          <nav className="nav-list">
            <div className="nav-link"><SidebarIcon type="settings" /> Settings <span className="arrow-circle">❯</span></div>
            <div className="nav-link"><SidebarIcon type="help" /> Help & Support <span className="arrow-circle">❯</span></div>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <div className="cinema-container">
          <header className="cinema-header">
            <button className="back-link" onClick={() => navigate(-1)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            <div className="pill-center-wrapper">
              <span className="cinema-pill">Cinema</span>
            </div>
          </header>

          <div className="event-list">
            {loading ? (
              <p className="loading-text">Loading Cinema Events...</p>
            ) : (
              events.map(event => (
                <div key={event.id} className="event-list-card">
                  <img src={event.image || 'https://via.placeholder.com/150'} alt={event.title} className="event-card-img" />
                  
                  <div className="event-card-info">
                    <h3>{event.title}</h3>
                    <p className="card-category">{event.category}</p>
                    <p className="card-meta">
                      {new Date(event.date).getDate()}{
                        [1, 21, 31].includes(new Date(event.date).getDate()) ? 'st' :
                        [2, 22].includes(new Date(event.date).getDate()) ? 'nd' :
                        [3, 23].includes(new Date(event.date).getDate()) ? 'rd' : 'th'
                      } {new Date(event.date).toLocaleString('en-GB', { month: 'long', year: 'numeric' })} / 5:30 Pm
                    </p>
                    <p className="card-meta-loc">📍 Lagos</p>
                  </div>

                  <div className="event-card-actions">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667D78" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    
                    <div className="bottom-actions-row">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667D78" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667D78" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventPage;