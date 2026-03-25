import { useState } from "react";
import "./TicketResales.css";
import { useNavigate } from 'react-router-dom';

const POSTER_URL =
  "https://image.tmdb.org/t/p/w780/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg";

// ─── Movie Poster ─────────────────────────────────────────────────────────────
function MoviePoster() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="movie-poster">
      {!imgError ? (
        <img src={POSTER_URL} alt="Shelter" onError={() => setImgError(true)} />
      ) : (
        <div className="poster-fallback">
          <p className="poster-tagline">HER SAFETY.<br />HIS MISSION.</p>
          <p className="poster-studio">STATHAM</p>
          <p className="poster-title">SHELTER</p>
          <p className="poster-release">ONLY IN THEATERS JANUARY 30</p>
          <p className="poster-prod">3LACK BEAR</p>
        </div>
      )}
    </div>
  );
}

// ─── Ticket Card ──────────────────────────────────────────────────────────────
function TicketCard({ ticket, onBuyClick, onResellClick }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-title-row">
          <span className="ticket-type">{ticket.ticketType}</span>
          <span className="resale-badge">{ticket.badge}</span>
        </div>
        <span className="ticket-price">{ticket.price}</span>
      </div>
      <div className="ticket-original">
        Original : <span>{ticket.originalPrice}</span>
      </div>
      <div className="ticket-footer">
        <div className="verified-row">
          <div className="verified-icon">✓</div>
          <span>Verified by <strong>{ticket.verifiedBy}</strong></span>
        </div>
        <div className="ticket-actions">
          <button className="resell-btn" onClick={onResellClick}>Resell</button>
          <button className="buy-btn" onClick={onBuyClick}>Buy Ticket</button>
        </div>
      </div>
    </div>
  );
}

// ─── Purchase Modal ───────────────────────────────────────────────────────────
function PurchaseModal({ ticket, onConfirm, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const isValid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.phone.trim().length >= 7;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Complete Purchase</h2>
        <p>Enter your details to buy the {ticket.ticketType} for {ticket.price}</p>
        <input type="text" placeholder="Full Name" value={form.name} onChange={handleChange("name")} />
        <input type="email" placeholder="Email Address" value={form.email} onChange={handleChange("email")} />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange("phone")} />
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm" onClick={() => onConfirm(form)} disabled={!isValid}>
            Confirm {ticket.price}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Resell Modal ─────────────────────────────────────────────────────────────
function ResellModal({ ticket, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resalePrice: "",
  });

  const isValid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.phone.trim().length >= 7 &&
    Number(form.resalePrice) > 0;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>List Ticket for Resale</h2>
        <p>Set your price and details to resell your {ticket.ticketType}</p>

        <label className="input-label">Your Name</label>
        <input type="text" placeholder="Full Name" value={form.name} onChange={handleChange("name")} />

        <label className="input-label">Email Address</label>
        <input type="email" placeholder="Email Address" value={form.email} onChange={handleChange("email")} />

        <label className="input-label">Phone Number</label>
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange("phone")} />

        <label className="input-label">Your Resale Price (₦)</label>
        <input
          type="number"
          placeholder={`Original: ${ticket.originalPrice}`}
          value={form.resalePrice}
          onChange={handleChange("resalePrice")}
          min="0"
        />

        <div className="resale-note">
          <span>⚠️</span> Your ticket will be verified by EntryHUB before listing.
        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm" onClick={() => onSubmit(form)} disabled={!isValid}>
            List for ₦{Number(form.resalePrice).toLocaleString() || "0"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────
function SuccessModal({ type, ticket, resalePrice, onDone }) {
  const isPurchase = type === "purchase";
  return (
    <div className="modal-overlay" onClick={onDone}>
      <div className="modal success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">{isPurchase ? "✓" : "🎟️"}</div>
        <h2>{isPurchase ? "Ticket Purchased!" : "Ticket Listed!"}</h2>
        <p>
          {isPurchase
            ? <>Your {ticket.ticketType} for <strong>Shelter</strong> has been booked. Check your email for details.</>
            : <>Your {ticket.ticketType} has been listed for resale at <strong>₦{Number(resalePrice).toLocaleString()}</strong>. EntryHUB will verify and publish it shortly.</>
          }
        </p>
        <button className="done-btn" onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

// ─── Resale Listings ──────────────────────────────────────────────────────────
function ResaleListings({ listings }) {
  if (listings.length === 0) return null;
  return (
    <div className="listings-section">
      <h3 className="listings-title">🎟️ Available Resale Tickets</h3>
      {listings.map((l, i) => (
        <div className="listing-item" key={i}>
          <div className="listing-info">
            <span className="listing-seller">{l.name}</span>
            <span className="listing-type">{l.ticketType} · Resale</span>
          </div>
          <span className="listing-price">₦{Number(l.resalePrice).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const DEFAULT_TICKET = {
  ticketType: "VIP Ticket",
  badge: "Resale",
  price: "₦30,700",
  originalPrice: "₦30,000",
  verifiedBy: "EntryHUB",
};

export default function TicketResales() {
  const [modal, setModal] = useState(null); // null | "buy" | "resell" | "success-buy" | "success-resell"
  const [resalePrice, setResalePrice] = useState("");
  const [listings, setListings] = useState([]);
  const navigate = useNavigate()

  const handleBuyConfirm = (form) => {
    setModal("success-buy");
  };

  const handleResellSubmit = (form) => {
     
    setListings((prev) => [
      ...prev,
      { ...form, ticketType: DEFAULT_TICKET.ticketType },
    ]);
    setResalePrice(form.resalePrice);
    setModal("success-resell");
  };

  return (
    <div className="wrapper">
      <div className="top-bar" />

      <header className="page-header">
        <h1>Ticket Resales</h1>
        <p>Verified tickets from other users</p>
      </header>

      <main className="card-container">

        <button className="back-btn"onClick={() => navigate("/")}>
                <span>←</span> Back
              </button>


        <MoviePoster />

        <TicketCard
          ticket={DEFAULT_TICKET}
          onBuyClick={() => setModal("buy")}
          onResellClick={() => setModal("resell")}
        />

        <ResaleListings listings={listings} />
      </main>

      <div className="bottom-bar" />

      {modal === "buy" && (
        <PurchaseModal
          ticket={DEFAULT_TICKET}
          onConfirm={handleBuyConfirm}
          onCancel={() => setModal(null)}
        />
      )}

      {modal === "resell" && (
        <ResellModal
          ticket={DEFAULT_TICKET}
          onSubmit={handleResellSubmit}
          onCancel={() => setModal(null)}
        />
      )}

      {(modal === "success-buy" || modal === "success-resell") && (
        <SuccessModal
          type={modal === "success-buy" ? "purchase" : "resell"}
          ticket={DEFAULT_TICKET}
          resalePrice={resalePrice}
          onDone={() => setModal(null)}
        />
      )}
    </div>
  );
}