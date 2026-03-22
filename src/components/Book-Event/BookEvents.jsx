import { useState, useRef, useEffect } from "react";
import "./BookEvents.css";
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout";

// ─────────────────────────────────────────────────────────────
// SHELTER POSTER  (SVG recreation of the real movie poster)
// ─────────────────────────────────────────────────────────────
function ShelterPoster() {
  return (
    <div className="poster-wrap">
      <svg viewBox="0 0 90 112" xmlns="http://www.w3.org/2000/svg" className="poster-svg">
        <defs>
          <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0b1824" />
            <stop offset="55%"  stopColor="#16303f" />
            <stop offset="100%" stopColor="#0d1e28" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#182830" />
            <stop offset="100%" stopColor="#0c1820" />
          </linearGradient>
          <radialGradient id="fog" cx="50%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="#2a5568" stopOpacity="0.55" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="90" height="112" fill="url(#bg-grad)" rx="7" />
        <rect width="90" height="112" fill="url(#fog)"     rx="7" />

        {/* Horizon haze */}
        <ellipse cx="45" cy="68" rx="52" ry="12" fill="#1d3d4e" opacity="0.7" />
        <ellipse cx="45" cy="74" rx="52" ry="9"  fill="#152e3a" opacity="0.75" />

        {/* Ground */}
        <rect x="0" y="78" width="90" height="34" fill="url(#floor-grad)" />
        <ellipse cx="45" cy="78" rx="52" ry="4" fill="#c8e0e8" opacity="0.08" />

        {/* Figure 1: tall adult */}
        <rect x="24" y="46" width="13" height="30" rx="5.5" fill="#192635" />
        <ellipse cx="30.5" cy="42.5" rx="7.5" ry="8.5" fill="#1b2d3a" />
        <ellipse cx="30.5" cy="41"   rx="8.5" ry="9.5" fill="none" stroke="#243848" strokeWidth="1.8" />
        <ellipse cx="30.5" cy="43.5" rx="4.2" ry="4.8" fill="#c8a07a" opacity="0.92" />
        <rect x="25.5" y="52" width="10" height="3.5" rx="1.8" fill="#21303e" />
        <rect x="14"   y="49" width="12" height="5.5" rx="2.8" fill="#192635" transform="rotate(-12 14 49)" />
        <rect x="36"   y="51" width="12" height="5.5" rx="2.8" fill="#192635" transform="rotate(18 36 51)" />
        <rect x="25.5" y="73" width="5.5" height="14" rx="2.5" fill="#111d26" />
        <rect x="32"   y="73" width="5.5" height="14" rx="2.5" fill="#111d26" />

        {/* Figure 2: shorter */}
        <rect x="49" y="54" width="11" height="23" rx="4.5" fill="#1c2d3a" />
        <ellipse cx="54.5" cy="52" rx="6.5" ry="7"   fill="#192635" />
        <ellipse cx="54.5" cy="51" rx="7"   ry="7.5" fill="none" stroke="#243848" strokeWidth="1.5" />
        <ellipse cx="54.5" cy="52.5" rx="3.8" ry="4.2" fill="#c09060" opacity="0.88" />
        <rect x="42"   y="57" width="9" height="4.5" rx="2.2" fill="#1c2d3a" transform="rotate(-14 42 57)" />
        <rect x="58"   y="58" width="9" height="4.5" rx="2.2" fill="#1c2d3a" transform="rotate(12 58 58)" />
        <rect x="50"   y="74" width="4.5" height="11" rx="2"   fill="#111d26" />
        <rect x="55.5" y="74" width="4.5" height="11" rx="2"   fill="#111d26" />

        {/* Snow particles */}
        {[
          [7,10,0.9],[19,5,0.6],[34,17,0.8],[54,7,0.5],[71,13,0.9],
          [14,29,0.5],[39,24,0.8],[67,21,0.6],[82,9,0.9],[4,44,0.5],
          [24,49,0.7],[59,34,0.6],[77,39,0.9],[11,57,0.5],[44,61,0.7],
          [83,54,0.5],[29,69,0.6],[69,64,0.8],[88,29,0.5],[51,14,0.7],
        ].map(([x,y,r],i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#ffffff"
            opacity={0.28 + (i % 5) * 0.1} />
        ))}

        {/* Top strip */}
        <rect x="0" y="0" width="90" height="11" fill="#080f18" opacity="0.85" rx="7" />
        <text x="45" y="8" textAnchor="middle" fill="#7a98aa"
          fontSize="3.9" fontFamily="Arial, sans-serif" letterSpacing="0.6">
          HER SAFETY. HIS MISSION.
        </text>

        {/* Title band */}
        <rect x="5" y="82" width="80" height="16" rx="2.5" fill="#080f18" opacity="0.78" />
        <text x="45" y="93.5" textAnchor="middle" fill="#ffffff"
          fontSize="10.5" fontWeight="bold"
          fontFamily="'Arial Black', sans-serif" letterSpacing="3">
          SHELTER
        </text>

        {/* Subtitle */}
        <text x="45" y="105" textAnchor="middle" fill="#7a9aaa"
          fontSize="4.1" fontFamily="Arial, sans-serif" letterSpacing="0.9">
          ONLY IN THEATERS
        </text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DROPDOWN  component
// ─────────────────────────────────────────────────────────────
function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="field-group" ref={ref}>
      <label className="field-label">{label}</label>

      <div
        className={`field-ctrl${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        role="combobox"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && setOpen(o => !o)}
      >
        <span className="field-val">{value}</span>

        {/* Up / Down chevron pair */}
        <span className="chev-pair" aria-hidden="true">
          <svg className="chev" viewBox="0 0 12 7" fill="none">
            <path d="M1 6L6 1L11 6" stroke="#7a8c7a" strokeWidth="1.9"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="chev" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#7a8c7a" strokeWidth="1.9"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {open && (
        <ul className="drop-list" role="listbox">
          {options.map(opt => (
            <li
              key={opt}
              className={`drop-item${String(opt) === String(value) ? " chosen" : ""}`}
              role="option"
              aria-selected={String(opt) === String(value)}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT  —  BookEvents
// ─────────────────────────────────────────────────────────────
export default function BookEvents() {
  const [liked,      setLiked]      = useState(true);
  const [saved,      setSaved]      = useState(true);
  const [toast,      setToast]      = useState(false);
  const [tickets,    setTickets]    = useState("1");
  const [sector,     setSector]     = useState("107");
  const [row,        setRow]        = useState("4");
  const [ticketType, setTicketType] = useState("Cinema");
  const [seat,       setSeat]       = useState("7");
  const [price,      setPrice]      = useState("₦30,000");

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setToast(true);
    setTimeout(() => setToast(false), 2400);
  };

  const handleBook = () => {
    alert(
      `✅ Booking Confirmed!\n\n` +
      `Event:   Shelter in Cinema Now\n` +
      `Tickets: ${tickets}\n` +
      `Sector:  ${sector}  |  Row: ${row}  |  Seat: ${seat}\n` +
     `Type:    ${ticketType}\n` +
      `Price:   ${price}`
    );
  };

  return (
    <Dashboardlayout title ="BookEvents"> 
    <div className="page-bg">
      <div className="page-inner">

        {/* Page title
        <h1 className="page-title">Book Event</h1> */}

        {/* Card */}
        <div className="card">

          {/* Back
          <button className="back-btn" onClick={() => window.history.back()} aria-label="Go back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.7"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button> */}

          {/* Event info row */}
          <div className="event-row">
            <ShelterPoster />

            <div className="event-meta">
              <p className="ev-title">Shelter in Cinema Now</p>
              <p className="ev-cat">Cinema</p>
              <p className="ev-date">30th March, 2026 / 5:00 Pm</p>
              <p className="ev-loc">
                <svg width="11" height="14" viewBox="0 0 24 28" fill="currentColor">
                  <path d="M12 0C7.58 0 4 3.58 4 8c0 6 8 16 8 16s8-10
                    8-16c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                Abuja
              </p>
            </div>

            {/* Icons */}
            <div className="ev-icons">
              <button className="icon-btn" onClick={() => setLiked(l => !l)}
                aria-label={liked ? "Unlike" : "Like"}>
                <svg width="23" height="21" viewBox="0 0 24 22"
                  fill={liked ? "#f5a623" : "none"}
                  stroke={liked ? "#f5a623" : "#bbb"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67
                    l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06
                    L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              <div className="icons-row">
                <button className="icon-btn" onClick={handleShare} aria-label="Share">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                    stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6"  cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49"/>
                  </svg>
                </button>

                <button className="icon-btn" onClick={() => setSaved(s => !s)}
                  aria-label={saved ? "Unsave" : "Save"}>
                  <svg width="16" height="21" viewBox="0 0 24 28"
                    fill={saved ? "#f5a623" : "none"}
                    stroke={saved ? "#f5a623" : "#bbb"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 27l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="form-section">
            <Dropdown label="Number of Tickets" value={tickets}
              options={["1","2","3","4","5","6","7","8"]} onChange={setTickets} />
            <Dropdown label="Sector" value={sector}
              options={["101","102","103","104","105","106","107","108"]} onChange={setSector} />
            <Dropdown label="Row" value={row}
              options={["1","2","3","4","5","6","7","8","9","10"]} onChange={setRow} />
            <Dropdown label="Ticket Type" value={ticketType}
              options={["Cinema","VIP","VVIP","Regular","Premium"]} onChange={setTicketType} />
            <Dropdown label="Seat Selection" value={seat}
              options={["1","2","3","4","5","6","7","8","9","10","11","12"]} onChange={setSeat} />
            <Dropdown label="Ticket Price" value={price}
              options={["₦10,000","₦15,000","₦20,000","₦25,000","₦30,000","₦50,000"]} onChange={setPrice} />
          </div>

          {/* Footer buttons */}
          <div className="footer-row">
            <button className="btn btn-home" onClick={() => window.scrollTo(0,0)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </button>

            <button className="btn btn-book" onClick={handleBook}>
              Book Event
            </button>
          </div>

        </div>
      </div>

      {/* Toast */}
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        Link copied to clipboard!
      </div>
    </div>
    </Dashboardlayout>
  );
}