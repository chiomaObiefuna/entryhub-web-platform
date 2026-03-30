import React, { useEffect, useMemo, useRef, useState } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom';

import EventImg from '../../../assets/images/event_img.svg';
import MapImg from '../../../assets/images/Rectangle 17.svg'; 
import QrCodeImg from '../../../assets/images/download 1.svg';

const formatNGN = (value) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value);

const EventDetails = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const ticketEntryRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedTicketId, setSelectedTicketId] = useState('regular');

  const tickets = useMemo(() => [
    { id: 'regular', label: 'Regular', price: 15000, status: 'Available' },
    { id: 'vip', label: 'VIP', price: 30000, status: 'Available' },
    { id: 'vvip', label: 'VVIP', price: 150000, status: 'Sold out' },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="event-page-wrapper">
      <section ref={sectionRef} className={`event-details ${isVisible ? 'is-visible' : 'is-hidden'}`}>
        
        {/* Hero Banner */}
        <div className="featured-banner" style={{ backgroundImage: `url(${EventImg})` }}>
          <div className="featured-overlay">
            <div className="featured-content">
              <h1 className="featured-title">Burna Boy Live <br /> ( BLIC 5 )</h1>
              <div className="featured-meta">
                <p><span>📅</span> Mar 24, 2026 - 10:00 PM</p>
                <p><span>📍</span> Eko Hotel, Lagos</p>
              </div>
              <button className="hero-get-tickets-btn" onClick={() => ticketEntryRef.current.scrollIntoView({ behavior: 'smooth' })}>
                Get Tickets
              </button>
            </div>
          </div>
        </div>

        {/* Ticket & Map Grid */}
        <div className="ticket-entry" ref={ticketEntryRef}>
          <h2 className="section-title">Ticket & Entry Information</h2>
          <div className="ticket-entry-grid">
            
            <div className="ticket-table-card">
              {tickets.map((t) => (
                <div key={t.id} className="ticket-row">
                  <div className="td-type-col">
                    <span className="td-type">{t.label}</span>
                  </div>
                  <div className="td-price-col">
                    <span className="td-price">NGN.{formatNGN(t.price)}</span>
                  </div>
                  <div className="td-status-col">
                    <span className="status-text">{t.status}</span>
                    <span className="chev">›</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="map-card">
              <div className="map-surface">
                  <img src={MapImg} alt="Venue Map" className="map-img-fill" />
              </div>
              <div className="map-footer">
                <span className="location-name">Film House cinema, Surulere</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Ticket Section */}
        <div className="my-ticket-section">
          {/* ✅ FIXED PILL NAVIGATION */}
          <div className="tab-nav-container">
              <button className="nav-pill active">My Ticket</button>
              <div className="nav-pill-divider"></div>
              <button className="nav-pill orange" onClick={() => navigate('/resale')}>Ticket Resale</button>
          </div>

          <div className="ticket-tabs-header">
            {['Description', 'Events', 'Venue'].map((tab) => (
              <button key={tab} className={`tab-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          <div className="ticket-content-card">
            <div className="ticket-info-pane">
               <div className="tab-text-content">
                  <p>There's nothing quite like the collective gasp of a crowded theater... find your row, locate your seat and get ready for an awesome moment you won't forget.</p>
                  <ul className="details-list">
                    <li>Cinema door opens at 7:00 AM</li>
                    <li>Movies starts showing by 9:00 AM</li>
                    <li>Cinema door closes at 1:00 AM</li>
                  </ul>
               </div>
               <div className="info-footer-line">Show this QR code at entry</div>
            </div>

            <div className="ticket-qr-pane">
               <div className="qr-box">
                  <img src={QrCodeImg} alt="Ticket QR" className="qr-image" />
               </div>
               <div className="qr-actions">
                  <button className="btn-orange">Download Ticket</button>
                  <button className="btn-dark">View Ticket</button>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;