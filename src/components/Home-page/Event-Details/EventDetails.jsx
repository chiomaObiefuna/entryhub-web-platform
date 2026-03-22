import React, { useEffect, useMemo, useRef, useState } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom';
import EventImg from '../../../assets/images/event_img.svg';


 


const formatNGN = (value) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value);
const EventDetails = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const ticketEntryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const tickets = useMemo(
    () => [
      { id: 'regular', label: 'Regular', price: 10000, status: 'Available' },
      { id: 'vip', label: 'VIP', price: 35000, status: 'Available' },
      { id: 'vvip', label: 'VVIP', price: 90000, status: 'Sold out' },
    ],
    []
  );

  const [selectedTicketId, setSelectedTicketId] = useState('regular');
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) ?? tickets[0];

  const [activeTab, setActiveTab] = useState('Description');

  const handleSelectTicket = (ticket) => {
    if (ticket.status === 'Sold out') return;
    setSelectedTicketId(ticket.id);
  };

  const handleGetExactLocation = () => {
  window.open(
    "https://www.google.com/maps/search/?api=1&query=Filmhouse+Cinemas+Surulere+Lagos",
    "_blank"
  );
};

  // const handleGetExactLocation = () => {
  //   window.open('https://www.google.com/maps/search/?api=1&query=Eko+Hotel+Lagos', '_blank');
  // };

  const handleDownload = () => alert('Download started (demo).');
  const handleView = () => alert('Opening ticket (demo).');
  const handleScrollToTickets = () => {
    ticketEntryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className={`event-details ${isVisible ? 'is-visible' : 'is-hidden'}`}
    >
      {/* Featured banner (single image above the table) */}
      <div className="featured-banner" style={{ backgroundImage: `url(${EventImg})` }}>
        <div className="featured-overlay">
          <div className="featured-content">
            <h2 className="featured-title">
              Burna Boy Live <br /> ( BLIC 5 )
            </h2>
            <div className="featured-m veta">
              <div className="meta-item">
                <span className="meta-icon" aria-hidden="true">
                  📅
                </span>
                Mar 24, 2026 - 10:00 PM
              </div>
              <div className="meta-item">
                <span className="meta-icon" aria-hidden="true">
                  📍
                </span>
                Eko Hotel, Lagos
              </div>
            </div>
            <button type="button" className="featured-cta" onClick={handleScrollToTickets}>
              Get Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Ticket & Entry Information */}
      <div className="ticket-entry" ref={ticketEntryRef}>
        <h2 className="section-title">Ticket &amp; Entry Information</h2>

        <div className="ticket-entry-grid">
          <div className="ticket-table-card" role="group" aria-label="Ticket table">
            <div className="ticket-table" role="table" aria-label="Ticket options">
              <div className="ticket-table-body" role="rowgroup">
                {tickets.map((t) => {
                  const isSelected = selectedTicketId === t.id;
                  const isSoldOut = t.status === 'Sold out';

                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`ticket-row ${isSelected ? 'is-selected' : ''} ${
                        isSoldOut ? 'is-soldout' : ''
                      }`}
                      onClick={() => handleSelectTicket(t)}
                      disabled={isSoldOut}
                      role="row"
                      aria-selected={isSelected}
                    >
                      <div className="td type" role="cell">
                        {t.label}
                      </div>
                      <div className="td price" role="cell">
                        NGN {formatNGN(t.price)}
                      </div>
                      <div className="td status" role="cell">
                        <span className={`status-pill ${isSoldOut ? 'soldout' : 'available'}`}>
                          {t.status}
                        </span>
                        {!isSoldOut && <span className="chev" aria-hidden="true">›</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="map-card" role="group" aria-label="Location">
            <div className="map-surface" aria-hidden="true">
              <div className="map-pin pin-1" />
              <div className="map-pin pin-2" />
              <div className="map-pin pin-3" />
            </div>
            <div className="map-footer">
              <div className="map-location">Filmhouse Cinemas, Surulere</div>
              <button type="button" className="btn btn-outline" onClick={handleGetExactLocation}>
                Get exact location
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* My Ticket */}
      <div className="my-ticket">
        <h2 className="section-title">My Ticket</h2>
        <button type="button" className="btn btn-primary btn-resale" onClick={() => navigate("/resale")}>
                Ticket Resale
              </button>

        <div className="ticket-tabs" role="tablist" aria-label="Ticket details tabs">
          {['Description', 'Events', 'Venue'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`ticket-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab}
            </button>
          ))}
          <span
            className="ticket-tab-indicator"
            aria-hidden="true"
            style={{
              transform:
                activeTab === 'Description'
                  ? 'translateX(0%)'
                  : activeTab === 'Events'
                  ? 'translateX(100%)'
                  : 'translateX(200%)',
            }}
          />
        </div>

        <div className="ticket-card" aria-label="Ticket card">
          <div className="ticket-card-left">
            <div className="ticket-card-animate" key={activeTab}>
              {activeTab === 'Description' && (
                <>
                  <p>
                    There’s nothing quite like the collective gasp of a crowded theater or the shared laughter of a packed house. Whether it's a first date or a family tradition, cinema brings us together. Grab your tickets, find your row,  locate your seat and get ready for a awesome moment you won't forget.
                  </p>
                  <ul>
                    <li>Door opens at: 8:00 PM</li>
                    <li>Performance starts: 9:00 PM</li>
                    <li>Event ends at: 1:00 AM</li>
                  </ul>
                </>
              )}

              {activeTab === 'Events' && (
                <>
                  <p>
                    Your ticket includes access to the main show, opening acts, and curated DJ sets
                    before and after the performance.
                  </p>
                  <ul>
                    <li>Opening acts</li>
                    <li>Main performance</li>
                    <li>After-party DJ set</li>
                  </ul>
                </>
              )}

              {activeTab === 'Venue' && (
                <>
                  <p>
                    Eko Hotel, Lagos — premium seating, secure entry, and easy access to parking and
                    rides.
                  </p>
                  <ul>
                    <li>Fast check-in lanes</li>
                    <li>On-site security</li>
                    <li>Food &amp; drinks available</li>
                  </ul>
                </>
              )}
            </div>

            <div className="ticket-card-meta">
              <div className="meta-row">
                <span className="meta-label">Selected ticket</span>
                <span className="meta-value">{selectedTicket.label}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Price</span>
                <span className="meta-value">NGN {formatNGN(selectedTicket.price)}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Status</span>
                <span className="meta-value">{selectedTicket.status}</span>
              </div>
            </div>
          </div>

          <div className="ticket-card-right">
            <div className="qr-wrap" aria-label="QR code">
              <img
                className="qr-img"
                src="https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=EntryHub-Ticket-123"
                alt="Ticket QR code"
                loading="lazy"
              />
            </div>
            <p className="qr-hint">Show this QR code at entry</p>

            <div className="ticket-actions">
              <button type="button" className="btn btn-primary" onClick={handleDownload}>
                Download Ticket
              </button>
              <button type="button" className="btn btn-dark" onClick={handleView}>
                View Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;