import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ Double check this path matches your folder structure exactly
import DashboardLayout from './components/Dashboard-Layout/DashboardLayout';
import './EventPage.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Adding a small check to ensure the fetch doesn't crash the app
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://eventhub-backend-pxoz.onrender.com/api/events');
        const data = await res.json();
        const cinemaOnly = data.filter(event => 
          event.category?.toLowerCase() === 'cinema' || 
          event.title?.toLowerCase().includes('cinema')
        );
        setEvents(cinemaOnly);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cinema events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <DashboardLayout title="Cinema">
      <div className="event-list">
        {loading ? (
          <p className="loading-text">Loading Cinema Events...</p>
        ) : events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="event-list-card">
              <img 
                src={event.image || 'https://via.placeholder.com/150'} 
                alt={event.title} 
                className="event-card-img" 
              />
              
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
        ) : (
          <p className="no-events">No cinema events found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventPage;