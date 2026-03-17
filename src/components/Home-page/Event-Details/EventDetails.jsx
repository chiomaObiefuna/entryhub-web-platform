import React, { useState, useEffect, useRef } from 'react';
import './EventDetails.css';
import eventimg from '../../../assets/images/event_img.svg';

const EventDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        } 
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);



  // State for ticket availability
  const [tickets] = useState([
    { type: 'Regular', price: '15,000', status: 'Available' },
    { type: 'VIP', price: '30,000', status: 'Available' },
    { type: 'VVIP', price: '150,000', status: 'Sold out' },
  ]);

  return (
    <section ref={sectionRef} className={`details-section ${isVisible ? 'fade-in-up' : 'hidden'}`}>
      {/* 1. Featured Wide Card */}
      <div className="featured-banner" style={{ backgroundImage: `url(${eventimg})` }}>
        <div className="banner-overlay">
          <div className="banner-content">
            <h2>Burna Boy Live <br /> ( BLIC 5 )</h2>
            <p><span>📅</span> Mar 24, 2026 - 10:00 PM</p>
            <p><span>📍</span> Eko Hotel, Lagos</p>
            <button className="btn-get-tickets-large">Get Tickets</button>
          </div>
        </div>
      </div>

      {/* 2. Ticket & Entry Info */}
      <div className="info-grid">
        <div className="ticket-info">
          <h3>Ticket & Entry Information</h3>
          <div className="ticket-table">
            {tickets.map((t, index) => (
              <div key={index} className="ticket-row">
                <span className="ticket-type">{t.type}</span>
                <span className="ticket-price">NGN.{t.price}</span>
                <button className={`status-btn ${t.status.toLowerCase().replace(' ', '-')}`}>
                  {t.status} <span className='arrow-icon'>{t.status !== 'Sold out' ? '>' : ''}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="map-container">
           <img src="https://maps.googleapis.com/maps/api/staticmap?center=Lagos&zoom=13&size=400x200&key=YOUR_KEY" alt="Location Map" />
           <div className="map-label">Eko Hotel, Lagos</div>
        </div>
      </div>

      {/* 3. My Ticket / QR Section */}
      <div className="my-ticket-container">
        <h3>My Ticket</h3>
        <div className="ticket-tabs">
          <button className="active">Description</button>
          <button>Events</button>
          <button>Venue</button>
        </div>
        
        <div className="ticket-pass-card">
          <div className="pass-text">
            <p>Get ready for an unforgettable night as Burna Boy, the Grammy-winning <br />Afrofusion superstar, takes the stage for an electrifying performance. <br />
              Knownfor global hits and high-energy shows. BurnaBoy delivers a powerful <br /> blend of Afrobeats, dancehall, reggae, and hip-hop that keeps fan on their <br /> feet all night.
            </p>
            <ul>
              <li>Door opens at: 8:00 PM</li>
              <li>Burna Boy Performs at: 9:00 PM</li>
              <li>Event ends at: 1:00 AM</li>
            </ul>
            <p className="qr-instruction">Show this QR code at entry</p>
          </div>
          <div className="pass-qr">
            <div className="qr-box">
               {/* Replace with actual QR component if needed */}
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EntryHub-Ticket-123" alt="QR Code" />
            </div>
            <div className="pass-actions">
              <button className="btn-download">Download Ticket</button>
              <button className="btn-view">View Ticket</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;