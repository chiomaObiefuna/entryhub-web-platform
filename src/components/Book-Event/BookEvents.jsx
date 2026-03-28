import { useState, useRef, useEffect } from "react";
import "./BookEvents.css";
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from "../Dashboard-Layout/DashboardLayout";

// Helper to parse price if needed
function parsePrice(priceStr) {
  return Number(priceStr.replace(/[₦,]/g, "")) || 0;
}

// ─────────────────────────────────────────────────────────────
// DROPDOWN component
// ─────────────────────────────────────────────────────────────
function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);


 

  return (
    <div className="field-group" ref={ref}>
      <label className="field-label">{label}</label>
      <div
        className={`field-ctrl${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        role="combobox"
        tabIndex={0}
      >
        <span className="field-val">{value}</span>
        <span className="chev-pair">
          <svg className="chev" viewBox="0 0 12 7" fill="none"><path d="M1 6L6 1L11 6" stroke="#7a8c7a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <svg className="chev" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="#7a8c7a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      {open && (
        <ul className="drop-list">
          {options.map(opt => (
            <li key={opt} className="drop-item" onClick={() => { onChange(opt); setOpen(false); }}>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function BookEvents() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Catch dynamic movie data
  const movie = location.state?.movie;

  // 2. State hooks
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [sector, setSector] = useState("107");
  const [row, setRow] = useState("4");
  const [ticketType, setTicketType] = useState("Cinema");
  const [seat, setSeat] = useState("7");

  // 3. Derived Data
  const ticketPrice = movie?.price || 15000; 
  const totalAmount = ticketQuantity * ticketPrice;

  // 4. Guards
  if (!movie) {
    return (
      <DashboardLayout title="Loading...">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>No movie selected. Redirecting to events...</p>
          <button onClick={() => navigate("/events")}>Go to Events</button>
        </div>
      </DashboardLayout>
    );
  }

  // 5. Handlers
  const handleProceedToPayment = () => {
    localStorage.setItem("ticketData", JSON.stringify({
      quantity: ticketQuantity,
      price: ticketPrice,
      total: totalAmount,
      sector, row, seat, ticketType,
      movieTitle: movie.title
    }));

    navigate("/eventDetails", { state: { movie } });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToast(true);
    setTimeout(() => setToast(false), 2400);
  };

  // 6. Final Return (The UI)
  return (
    <DashboardLayout title="BookEvents">
      <div className="event-row">
        {/* Dynamic Image Container */}
        <div className="poster-wrap">
          <img 
            src={movie.image} 
            alt={movie.title} 
            style={{ width: '90px', height: '112px', borderRadius: '7px', objectFit: 'cover' }}
          />
        </div>

        <div className="event-meta">
          <p className="ev-title">{movie.title}</p>
          <p className="ev-cat">{movie.category || "Cinema"}</p>
          <p className="ev-date">{movie.date || "30th March, 2026"} / 5:00 Pm</p>
          <p className="ev-loc">📍 {movie.location || "Abuja"}</p>
        </div>

        <div className="ev-icons">
          <button className="icon-btn" onClick={() => setLiked(!liked)}>
            <svg width="23" height="21" viewBox="0 0 24 22" fill={liked ? "#f5a623" : "none"} stroke={liked ? "#f5a623" : "#bbb"} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <div className="icons-row">
            <button className="icon-btn" onClick={handleShare}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>
            <button className="icon-btn" onClick={() => setSaved(!saved)}><svg width="16" height="21" viewBox="0 0 24 28" fill={saved ? "#f5a623" : "none"} stroke={saved ? "#f5a623" : "#bbb"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></button>
          </div>
        </div>
      </div>

      <div className="form-section">
        <Dropdown label="Number of Tickets" value={String(ticketQuantity)} options={["1","2","3","4","5"]} onChange={(val) => setTicketQuantity(Number(val))} />
        <Dropdown label="Sector" value={sector} options={["101","107","108"]} onChange={setSector} />
        <Dropdown label="Row" value={row} options={["1","2","3","4"]} onChange={setRow} />
        <Dropdown label="Ticket Type" value={ticketType} options={["Cinema","VIP"]} onChange={setTicketType} />
        <Dropdown label="Seat Selection" value={seat} options={["1","7","12"]} onChange={setSeat} />
      </div>

      <div className="total-preview">
        <span className="total-label">Total</span>
        <span className="total-value">₦{totalAmount.toLocaleString()}</span>
      </div>

      <div className="footer-row">
        <button className="btn btn-home" onClick={() => navigate("/")}>Home</button>
        <button className="btn btn-book" onClick={handleProceedToPayment}>Book Event</button>
      </div>

      <div className={`toast${toast ? " show" : ""}`}>Link copied to clipboard!</div>
    </DashboardLayout>
  );
}
