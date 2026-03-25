import { useState } from "react";
import "./DetailsEvents.css";
import { useNavigate } from 'react-router-dom';
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout";


function ShelterPoster() {
  return (
    <div className="poster-wrap">
      <svg viewBox="0 0 90 112" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="p-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0b1824" />
            <stop offset="55%"  stopColor="#16303f" />
            <stop offset="100%" stopColor="#0d1e28" />
          </linearGradient>
          <linearGradient id="p-fl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#182830" />
            <stop offset="100%" stopColor="#0c1820" />
          </linearGradient>
          <radialGradient id="p-fog" cx="50%" cy="52%" r="55%">
            <stop offset="0%"   stopColor="#2a5568" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="90" height="112" fill="url(#p-bg)"  rx="6" />
        <rect width="90" height="112" fill="url(#p-fog)" rx="6" />
        <ellipse cx="45" cy="68" rx="52" ry="12" fill="#1d3d4e" opacity="0.7" />
        <ellipse cx="45" cy="74" rx="52" ry="9"  fill="#152e3a" opacity="0.75" />
        <rect x="0" y="78" width="90" height="34" fill="url(#p-fl)" />

        {/* Figure 1 */}
        <rect x="24" y="46" width="13" height="30" rx="5.5" fill="#192635" />
        <ellipse cx="30.5" cy="42.5" rx="7.5" ry="8.5" fill="#1b2d3a" />
        <ellipse cx="30.5" cy="41"   rx="8.5" ry="9.5" fill="none" stroke="#243848" strokeWidth="1.8" />
        <ellipse cx="30.5" cy="43.5" rx="4.2" ry="4.8" fill="#c8a07a" opacity="0.92" />
        <rect x="14"   y="49" width="12" height="5.5" rx="2.8" fill="#192635" transform="rotate(-12 14 49)" />
        <rect x="36"   y="51" width="12" height="5.5" rx="2.8" fill="#192635" transform="rotate(18 36 51)" />
        <rect x="25.5" y="73" width="5.5" height="14" rx="2.5" fill="#111d26" />
        <rect x="32"   y="73" width="5.5" height="14" rx="2.5" fill="#111d26" />

        {/* Figure 2 */}
        <rect x="49" y="54" width="11" height="23" rx="4.5" fill="#1c2d3a" />
        <ellipse cx="54.5" cy="52"   rx="6.5" ry="7"   fill="#192635" />
        <ellipse cx="54.5" cy="51"   rx="7"   ry="7.5" fill="none" stroke="#243848" strokeWidth="1.5" />
        <ellipse cx="54.5" cy="52.5" rx="3.8" ry="4.2" fill="#c09060" opacity="0.88" />
        <rect x="42"   y="57" width="9" height="4.5" rx="2.2" fill="#1c2d3a" transform="rotate(-14 42 57)" />
        <rect x="58"   y="58" width="9" height="4.5" rx="2.2" fill="#1c2d3a" transform="rotate(12 58 58)" />
        <rect x="50"   y="74" width="4.5" height="11" rx="2" fill="#111d26" />
        <rect x="55.5" y="74" width="4.5" height="11" rx="2" fill="#111d26" />

        {/* Snow */}
        {[
          [7,10],[19,5],[34,17],[54,7],[71,13],[14,29],[39,24],[67,21],
          [82,9],[24,49],[59,34],[77,39],[44,61],[29,69],[69,64],[51,14],
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y}
            r={i % 3 === 0 ? 0.9 : 0.5}
            fill="#fff"
            opacity={0.28 + (i % 5) * 0.1} />
        ))}

        {/* Top strip */}
        <rect x="0" y="0" width="90" height="11" fill="#080f18" opacity="0.85" rx="6" />
        <text x="45" y="8" textAnchor="middle" fill="#7a98aa"
          fontSize="3.8" fontFamily="Arial,sans-serif" letterSpacing="0.5">
          HER SAFETY. HIS MISSION.
        </text>

        {/* Title band */}
        <rect x="5" y="82" width="80" height="16" rx="2.5" fill="#080f18" opacity="0.78" />
        <text x="45" y="93.5" textAnchor="middle" fill="#fff"
          fontSize="10.5" fontWeight="bold"
          fontFamily="Arial Black,sans-serif" letterSpacing="3">
          SHELTER
        </text>

        {/* Subtitle */}
        <text x="45" y="105" textAnchor="middle" fill="#7a9aaa"
          fontSize="4" fontFamily="Arial,sans-serif" letterSpacing="0.8">
          ONLY IN THEATERS
        </text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAYMENT METHOD ROW
// ─────────────────────────────────────────────────────────────
function PayMethod({ icon, label, selected, onClick }) {
  return (
    <button
      className={`pay-row${selected ? " pay-selected" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className="pay-ico">{icon}</span>
      <span className="pay-lbl">{label}</span>
      <svg className="pay-chev" width="9" height="15" viewBox="0 0 9 15"
        fill="none" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 8 7.5 1 14"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT  —  BookEvents
// ─────────────────────────────────────────────────────────────
export default function DetailsEvents() {

  // ── Personal info state ──────────────────────────────────
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("Korede Bello");
  const [email,    setEmail]    = useState("koredebello4life@gmail.com");

  // ── UI interaction state ─────────────────────────────────
  const [liked,     setLiked]     = useState(true);
  const [saved,     setSaved]     = useState(true);
  const [payMethod, setPayMethod] = useState("");
  const [toast,     setToast]     = useState({ show: false, msg: "" });

  // ── Read ticket data from localStorage ──────────────────
  const stored      = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const quantity    = stored.quantity   || 1;
  const ticketPrice = stored.price      || 30000;
  const totalAmount = quantity * ticketPrice;
  const sector      = stored.sector     || "107";
  const row         = stored.row        || "4";
  const ticketType  = stored.ticketType || "cinema";
  const seat        = stored.seat       || "7";

  // ── Toast helper ─────────────────────────────────────────
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2600);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    showToast("Link copied to clipboard!");
  };

  // ── Proceed handler ──────────────────────────────────────
  const handleProceed = () => {
    if (!fullName.trim()) return showToast("Please enter your full name.");
    if (!email.trim())    return showToast("Please enter your email address.");
    if (!payMethod)       return showToast("Please choose a payment method.");

    localStorage.setItem("ticketData", JSON.stringify({
      quantity,
      price:      ticketPrice,
      total:      totalAmount,
      sector, row, seat, ticketType,
      fullName:   fullName.trim(),
      email:      email.trim(),
      payMethod,
      eventName:  "Shelter in Cinema Now",
      eventDate:  "30th March, 2026 / 5:00 Pm",
      eventVenue: "Abuja",
    }));

    showToast(`✅ Proceeding with ${payMethod}…`);
  };

  // ── SVG icons ────────────────────────────────────────────
  const BankIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="3"  y1="22" x2="21" y2="22"/>
      <line x1="6"  y1="18" x2="6"  y2="11"/>
      <line x1="10" y1="18" x2="10" y2="11"/>
      <line x1="14" y1="18" x2="14" y2="11"/>
      <line x1="18" y1="18" x2="18" y2="11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  );

  const BitcoinIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2H14a3.5 3.5 0 0 1 0 7H9.5V2z"/>
      <path d="M9.5 9H15a3.5 3.5 0 0 1 0 7H9.5V9z"/>
      <line x1="9.5" y1="2"  x2="9.5" y2="22"/>
      <line x1="7"   y1="2"  x2="12"  y2="2"/>
      <line x1="7"   y1="22" x2="12"  y2="22"/>
    </svg>
  );

  const CardIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );

  // ── Render ───────────────────────────────────────────────
  return (
    <Dashboardlayout title="DetailsEvents">

   
    <div className="ed-page">

     

      {/* ── Main card ── */}
      <div className="ed-card">

        

        {/* ── Event info row ── */}
        <div className="ed-event-row">
          <ShelterPoster />

          <div className="ed-event-info">
            <p className="ed-ev-title">Shelter in Cinema Now</p>
            <p className="ed-ev-cat">Cinema</p>
            <p className="ed-ev-date">30th March, 2026 / 5:00 Pm</p>
            <p className="ed-ev-loc">
              <svg width="11" height="14" viewBox="0 0 24 28" fill="currentColor">
                <path d="M12 0C7.58 0 4 3.58 4 8c0 6 8 16 8 16s8-10 8-16c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              Abuja
            </p>
          </div>

          {/* Heart / Share / Bookmark */}
          <div className="ed-ev-icons">
            {/* Heart — top right */}
            <button className="ed-icon-btn"
              onClick={() => setLiked(l => !l)}
              aria-label={liked ? "Unlike" : "Like"}>
              <svg width="22" height="20" viewBox="0 0 24 22"
                fill={liked ? "#f5a623" : "none"}
                stroke={liked ? "#f5a623" : "#bbb"}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            {/* Share + Bookmark — bottom right */}
            <div className="ed-icons-bottom">
              <button className="ed-icon-btn" onClick={handleShare} aria-label="Share">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5"  r="3"/>
                  <circle cx="6"  cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49"/>
                </svg>
              </button>
              <button className="ed-icon-btn"
                onClick={() => setSaved(s => !s)}
                aria-label={saved ? "Unsave" : "Save"}>
                <svg width="15" height="20" viewBox="0 0 24 28"
                  fill={saved ? "#f5a623" : "none"}
                  stroke={saved ? "#f5a623" : "#bbb"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 27l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Ticket Details ── */}
        <h2 className="ed-sec-title">Ticket Details</h2>

        <div className="ed-chips-row">
          <div className="ed-chip">
            <span className="ed-chip-lbl">Number of tickets</span>
            <span className="ed-chip-val">{quantity}</span>
          </div>
          <div className="ed-chip">
            <span className="ed-chip-lbl">Sector</span>
            <span className="ed-chip-val">{sector}</span>
          </div>
          <div className="ed-chip">
            <span className="ed-chip-lbl">Row</span>
            <span className="ed-chip-val">{row}</span>
          </div>
          <div className="ed-chip">
            <span className="ed-chip-lbl">Ticket type</span>
            <span className="ed-chip-val">{ticketType}</span>
          </div>
          <div className="ed-chip">
            <span className="ed-chip-lbl">Seat</span>
            <span className="ed-chip-val">{seat}</span>
          </div>
          <div className="ed-chip">
            <span className="ed-chip-lbl">Price</span>
            <span className="ed-chip-val">₦{ticketPrice.toLocaleString()}</span>
          </div>

          {/* × close button */}
          <button className="ed-chip-x"
            onClick={() => showToast("Edit booking on the previous page.")}
            aria-label="Edit booking">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11"/>
              <line x1="11" y1="1" x2="1" y2="11"/>
            </svg>
          </button>
        </div>

        {/* Total Amount */}
        <div className="ed-total-row">
          <span className="ed-total-lbl">Total Amount</span>
          <span className="ed-total-val">₦{totalAmount.toLocaleString()}</span>
        </div>

        {/* ── Personal Information ── */}
        <h2 className="ed-sec-title">Personal Information</h2>

        <div className="ed-fields">
          <div className="ed-field">
            <label className="ed-field-lbl">Full Name</label>
            <input
              className="ed-field-input"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="ed-field">
            <label className="ed-field-lbl">Email</label>
            <input
              className="ed-field-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* ── Choose Payment Method ── */}
        <h2 className="ed-sec-title">Choose Payment Method</h2>

        <div className="ed-methods">
          <PayMethod
            icon={BankIcon}
            label="Bank Transfer"
            selected={payMethod === "Bank Transfer"}
            onClick={() => setPayMethod("Bank Transfer")}
          />
          <PayMethod
            icon={BitcoinIcon}
            label="Bitcoin Wallet"
            selected={payMethod === "Bitcoin Wallet"}
            onClick={() => setPayMethod("Bitcoin Wallet")}
          />
          <PayMethod
            icon={CardIcon}
            label="New Card"
            selected={payMethod === "New Card"}
            onClick={() => setPayMethod("New Card")}
          />
        </div>

        {/* ── Footer buttons ── */}
        <div className="ed-footer">
          <button className="ed-btn ed-btn-home"
            onClick={() => window.scrollTo(0, 0)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.4"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>

          <button className="ed-btn ed-btn-proceed" onClick= {()=>{handleProceed ();
            navigate("/completePayment");
          }}>
            Proceed To Payment
          </button>

          

        </div>

      </div>{/* /ed-card */}

      {/* Toast */}
      <div className={`ed-toast${toast.show ? " show" : ""}`} role="status" aria-live="polite">
        {toast.msg}
      </div>

    </div>

     </Dashboardlayout>
  );
}