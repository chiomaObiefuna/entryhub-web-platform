import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./BookEvents.css";

const CINEMA_PLACEHOLDER = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500";

const BookEvents = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking States
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [sector, setSector] = useState("107");
  const [row, setRow] = useState("4");
  const [ticketType, setTicketType] = useState("Cinema");
  const [seat, setSeat] = useState("7");

  // Dynamic Price Logic
  const ticketTiers = useMemo(() => ({
    Cinema: eventData?.price || 15000,
    VIP: (eventData?.price || 15000) * 2,
  }), [eventData]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://eventhub-backend-pxoz.onrender.com/api/events/${id}`);
        const data = await res.json();
        if (data) setEventData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const currentPrice = ticketTiers[ticketType] || 15000;
  const totalAmount = ticketQuantity * currentPrice;

  // ✅ FIXED: Now leads to Step 2 (Details-Events)
  const handleBooking = () => {
    localStorage.setItem("ticketData", JSON.stringify({
      quantity: ticketQuantity,
      price: currentPrice, // Store unit price for calculations in Step 2
      ticketType,
      eventTitle: eventData?.title,
      sector, 
      row, 
      seat,
      eventId: id
    }));

    // Redirect to Checkout (Details-Events)
    navigate(`/checkout/${id}`);
  };

  if (loading) return <div className="status-message"><p>Loading showtimes...</p></div>;

  return (
    <div className="page-bg">
      <div className="page-inner">
        <div className="card">
          
          {/* --- EVENT INFO ROW --- */}
          <div className="event-row">
            <div className="poster-wrap">
              <img 
                src={eventData?.image || CINEMA_PLACEHOLDER} 
                alt="Poster" 
                className="dynamic-poster-img"
                onError={(e) => e.target.src = CINEMA_PLACEHOLDER}
              />
            </div>

            <div className="event-meta">
              <h2 className="ev-title">{eventData?.title || "Shelter in Cinema Now"}</h2>
              <p className="ev-cat">{eventData?.category || "Cinema"}</p>
              <p className="ev-date">30th March, 2026 / 5:00 Pm</p>
              <p className="ev-loc">📍 {eventData?.location || "Abuja"}</p>
            </div>

            <div className="ev-actions-side">
               <button className="icon-btn-naked heart" type="button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8a00" strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
               </button>
               <div className="bottom-icons">
                  <button className="icon-btn-naked" type="button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c7269" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                  <button className="icon-btn-naked" type="button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff8a00" stroke="#ff8a00" strokeWidth="2.5">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
               </div>
            </div>
          </div>

          {/* --- FORM SECTION --- */}
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">Number of Tickets</label>
              <select className="field-ctrl" value={ticketQuantity} onChange={(e) => setTicketQuantity(Number(e.target.value))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Sector</label>
              <select className="field-ctrl" value={sector} onChange={(e) => setSector(e.target.value)}>
                <option value="107">107</option>
                <option value="108">108</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Row</label>
              <select className="field-ctrl" value={row} onChange={(e) => setRow(e.target.value)}>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Ticket Type</label>
              <select className="field-ctrl" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                <option value="Cinema">Cinema</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Seat Selection</label>
              <select className="field-ctrl" value={seat} onChange={(e) => setSeat(e.target.value)}>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Ticket Price</label>
              <div className="field-ctrl static-price">₦{totalAmount.toLocaleString()}</div>
            </div>
          </div>

          {/* --- FOOTER BUTTONS --- */}
          <div className="footer-row">
            <button className="btn btn-pill-orange" type="button" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="btn btn-pill-orange" type="button" onClick={handleBooking}>
              Book Event
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookEvents;