import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./EventPage.css";

// Standard placeholder for missing images
const CINEMA_PLACEHOLDER = "https://placehold.jp/24/667d78/ffffff/300x200.png?text=Cinema";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCinemaData = async () => {
      try {
        const response = await fetch('https://eventhub-backend-pxoz.onrender.com/api/events');
        const data = await response.json();
        
        // Filtering for Cinema category
        const filteredEvents = data.filter(item => 
          item.category?.toLowerCase() === 'cinema' || 
          item.title?.toLowerCase().includes('cinema')
        );
        
        setEvents(filteredEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error connecting to EventHub API:", error);
        setLoading(false);
      }
    };

    fetchCinemaData();
  }, []);

  // Helper to format the date suffix (1st, 2nd, 3rd...)
  const getDayWithSuffix = (date) => {
    const d = new Date(date).getDate();
    if (d > 3 && d < 21) return d + 'th';
    switch (d % 10) {
      case 1:  return d + "st";
      case 2:  return d + "nd";
      case 3:  return d + "rd";
      default: return d + "th";
    }
  };

  return (
    <div className="event-list">
      {loading ? (
        <div className="status-message">
          <p className="loading-text">Loading the latest showtimes...</p>
        </div>
      ) : events.length > 0 ? (
        <div className="event-grid-layout"> {/* ✅ Grid Wrapper */}
          {events.map((event) => (
            <div 
              key={event.id || event._id} 
              className="event-list-card" 
              onClick={() => navigate(`/event/${event.id || event._id}`, { state: { movie: event } })}
            >
              
              <img 
                /* ✅ FIXED: Logic to handle API images vs local public assets */
                src={event.image?.startsWith('http') ? event.image : (event.image ? `/assets/${event.image.split('/').pop()}` : CINEMA_PLACEHOLDER)} 
                alt={event.title} 
                className="event-card-img" 
                onError={(e) => {
                  e.target.src = CINEMA_PLACEHOLDER; 
                  e.target.onerror = null; 
                }}
              />
                            
              <div className="event-card-info">
                <h3 className="event-card-title">{event.title || "Upcoming Movie"}</h3>
                <p className="card-category">{event.category || "Cinema"}</p>
                
                <p className="card-meta">
                  {event.date ? (
                    `${getDayWithSuffix(event.date)} ${new Date(event.date).toLocaleString('en-GB', { month: 'long', year: 'numeric' })}`
                  ) : "Schedule Pending"} / 5:30 Pm
                </p>
                
                <p className="card-meta-loc">
                  📍 {event.location || "Lagos, Nigeria"}
                </p>
              </div>

              <div className="event-card-actions">
                <button className="card-icon-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <div className="bottom-actions-row">
                  <button className="card-icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                  <button className="card-icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="status-message">
          <p className="no-events">No cinema events currently available.</p>
        </div>
      )}
    </div>
  );
};

export default EventPage;