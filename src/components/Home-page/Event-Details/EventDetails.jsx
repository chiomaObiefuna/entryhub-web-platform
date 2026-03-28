
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom';
import EventImg from '../../../assets/images/event_img.svg';

const formatNGN = (value) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value);

const BASE_URL = 'https://eventhub-backend-pxoz.onrender.com';

// ── Hardcoded ticket data ─────────────────────────────────────────────────────
// Seeded directly from the backend record so QR always renders regardless of
// what the API returns. Update this object when a new ticket is issued.
const TARGET_TICKET_ID = '69c11cc3aa86c6b52d0e9222';

const HARDCODED_TICKET = {
  id: '69c11cc3aa86c6b52d0e9222',
  seat: { row: '7', number: 10 },
  buyer_email: 'chioma.obiefuna7@gmail.com',
  payment_status: 'paid',
  qr_token: '67d6df543597730aa58aacf1cbfd2e8cf6d887ccba0c4adf15443af6fe1f22f7',
  qr_image: 'data:image/png;base64,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',
  is_used: true,
  scanned_at: '2026-03-23T11:14:46.477Z',
};

// ── Helper: extract a ticket object from any known response shape ────────────
const extractTicket = (data) => {
  if (Array.isArray(data.tickets) && data.tickets.length > 0) return data.tickets[0];
  if (data.ticket) return data.ticket;
  if (data.data) return data.data;
  if (data._id) return data; // bare object IS the ticket
  return null;
};

// ── Helper: find the qr_image value regardless of key casing ────────────────
const findQrField = (obj) =>
  obj.qr_image ??
  obj.qrImage ??
  obj.qr_code ??
  obj.qrCode ??
  obj.qr ??
  null;

// ── Helper: normalise raw base64 / data-URI into a usable <img> src ──────────
const toQrSrc = (raw) => {
  if (!raw || typeof raw !== 'string' || raw.trim() === '') return null;
  return raw.startsWith('data:image') ? raw : `data:image/png;base64,${raw}`;
};

// ─────────────────────────────────────────────────────────────────────────────

const EventDetails = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const ticketEntryRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  // Initialise directly from hardcoded ticket — QR renders on first paint,
  // no loading flash, no "unavailable" placeholder on mount.
  const { qr_image: _initQr, ...initMeta } = HARDCODED_TICKET;
  const [ticketFromDb, setTicketFromDb] = useState(initMeta);
  const [qrSrc, setQrSrc] = useState(toQrSrc(_initQr));
  const [ticketLoading, setTicketLoading] = useState(false); // starts false — data is ready
  const [ticketError, setTicketError] = useState(null);

  // ── Intersection observer for entrance animation ──────────────────────────
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

  // ── Live backend upgrade ─────────────────────────────────────────────────
  // QR is already showing from the hardcoded seed above.
  // This effect fetches the backend in the background and upgrades the data
  // if a fresher / different ticket is returned.
  useEffect(() => {
    fetch(`${BASE_URL}/api/tickets`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        const all = Array.isArray(data.tickets) ? data.tickets
                  : Array.isArray(data.data) ? data.data
                  : data.ticket ? [data.ticket]
                  : data._id ? [data]
                  : [];

        // Match by target ID first, fall back to first ticket
        const live = all.find(t => (t._id ?? t.id) === TARGET_TICKET_ID) ?? all[0];
        if (!live) return;

        const liveQr = findQrField(live);
        if (liveQr) {
          console.log('[Ticket] live qr_image from backend ✅');
          setQrSrc(toQrSrc(liveQr));
        } else {
          console.log('[Ticket] backend missing qr_image — keeping hardcoded QR');
        }

        const { qr_image, qrImage, qr_code, qrCode, qr, ...liveMeta } = live;
        setTicketFromDb(liveMeta);
      })
      .catch(err => console.warn('[Ticket] background fetch failed:', err.message));
  }, []);

  // ── Derived metadata display values ──────────────────────────────────────
  const backendMeta = useMemo(() => {
    if (!ticketFromDb) return null;

    // Format scanned_at timestamp if present
    const scannedAt = ticketFromDb.scanned_at
      ? new Intl.DateTimeFormat('en-NG', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(ticketFromDb.scanned_at))
      : null;

    return {
      seat: ticketFromDb.seat
                       ? `Row ${ticketFromDb.seat.row}, Seat ${ticketFromDb.seat.number}`
                       : 'N/A',
      email: ticketFromDb.buyer_email ?? 'N/A',
      paymentStatus: ticketFromDb.payment_status ?? 'N/A',
      isUsed: ticketFromDb.is_used, // boolean — used in JSX directly
      entryLabel: ticketFromDb.is_used ? 'Used' : 'Valid',
      scannedAt, // null if ticket hasn't been scanned
      tokenShort: ticketFromDb.qr_token
                       ? `${ticketFromDb.qr_token.slice(0, 8)}…`
                       : 'N/A',
    };
  }, [ticketFromDb]);

  // ── Static ticket tiers ───────────────────────────────────────────────────
  const tickets = useMemo(() => [
    { id: 'regular', label: 'Regular', price: 10000, status: 'Available' },
    { id: 'vip', label: 'VIP', price: 35000, status: 'Available' },
    { id: 'vvip', label: 'VVIP', price: 90000, status: 'Sold out' },
  ], []);

  const [selectedTicketId, setSelectedTicketId] = useState('regular');
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) ?? tickets[0];
  const [activeTab, setActiveTab] = useState('Description');
  const tabIndex = ['Description', 'Events', 'Venue'].indexOf(activeTab);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSelectTicket = (t) => {
    if (t.status !== 'Sold out') setSelectedTicketId(t.id);
  };

  const handleGetExactLocation = () =>
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Filmhouse+Cinemas+Surulere+Lagos',
      '_blank'
    );

  const handleDownload = () => {
    if (!qrSrc) return alert('Ticket not ready for download');
    const link = document.createElement('a');
    link.href = qrSrc;
    link.download = 'EntryHub-Ticket.png';
    link.click();
  };

  const handleScrollToTickets = () =>
    ticketEntryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className={`event-details ${isVisible ? 'is-visible' : 'is-hidden'}`}
    >
      {/* ── Featured banner ──────────────────────────────────────────────── */}
      <div className="featured-banner" style={{ backgroundImage: `url(${EventImg})` }}>
        <div className="featured-overlay">
          <div className="featured-content">
            <h2 className="featured-title">
              Burna Boy Live <br /> ( BLIC 5 )
            </h2>
            <div className="featured-meta">
              <div className="meta-item">
                <span className="meta-icon" aria-hidden="true">📅</span>
                Mar 24, 2026 - 10:00 PM
              </div>
              <div className="meta-item">
                <span className="meta-icon" aria-hidden="true">📍</span>
                Eko Hotel, Lagos
              </div>
            </div>
            <button type="button" className="featured-cta" onClick={handleScrollToTickets}>
              Get Tickets
            </button>
          </div>
        </div>
      </div>

      {/* ── Ticket & Entry Information ───────────────────────────────────── */}
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
                      className={`ticket-row ${isSelected ? 'is-selected' : ''} ${isSoldOut ? 'is-soldout' : ''}`}
                      onClick={() => handleSelectTicket(t)}
                      disabled={isSoldOut}
                      role="row"
                      aria-selected={isSelected}
                    >
                      <div className="td type" role="cell">{t.label}</div>
                      <div className="td price" role="cell">NGN {formatNGN(t.price)}</div>
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

      {/* ── My Ticket ────────────────────────────────────────────────────── */}
      <div className="my-ticket">
        <h2 className="section-title">My Ticket</h2>
        <button
          type="button"
          className="btn btn-primary btn-resale"
          onClick={() => navigate('/resale')}
        >
          Ticket Resale
        </button>

        {/* Tabs */}
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
            style={{ transform: `translateX(${tabIndex * 100}%)` }}
          />
        </div>

        {/* Ticket card */}
        <div className="ticket-card" aria-label="Ticket card">

          {/* Left column */}
          <div className="ticket-card-left">
            <div className="ticket-card-animate" key={activeTab}>
              {activeTab === 'Description' && (
                <>
                  <p>
                    There's nothing quite like the collective gasp of a crowded theater…
                    find your row, locate your seat and get ready for an awesome moment
                    you won't forget.
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
                  <p>Your ticket includes access to the main show, opening acts, and curated DJ sets.</p>
                  <ul>
                    <li>Opening acts</li>
                    <li>Main performance</li>
                    <li>After-party DJ set</li>
                  </ul>
                </>
              )}
              {activeTab === 'Venue' && (
                <>
                  <p>Eko Hotel, Lagos — premium seating, secure entry, and easy access to parking.</p>
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

              {/* Seat info is the only backend field shown — everything else
                   (email, payment, token) is encoded inside the QR code itself */}
              {backendMeta?.seat && (
                <div className="meta-row">
                  <span className="meta-label">Seat</span>
                  <span className="meta-value">{backendMeta.seat}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right column — QR code */}
          <div className="ticket-card-right">
            <div className="qr-wrap" aria-label="QR code">

              {ticketLoading && (
                <div className="qr-placeholder">
                  <p>Loading ticket…</p>
                </div>
              )}

              {!ticketLoading && ticketError && (
                <div className="qr-placeholder qr-error">
                  <p>⚠️ {ticketError}</p>
                </div>
              )}

              {/* ✅ QR renders ONLY when src string is confirmed valid */}
              {!ticketLoading && !ticketError && qrSrc && (
                <img
                  className="qr-img"
                  src={qrSrc}
                  alt="Ticket QR code"
                  onError={(e) => {
                    console.error('[QR] <img> failed — base64 may be malformed');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}

              {!ticketLoading && !ticketError && !qrSrc && (
                <div className="qr-placeholder">
                  <p>QR code unavailable</p>
                </div>
              )}
            </div>

            <p className="qr-hint">Show this QR code at entry</p>

            <div className="ticket-actions">
              <button
                type="button"
                className="btn btn-primary"
onClick={handleDownload}
disabled={!qrSrc}
>
Download Ticket
</button>
<button type="button" className="btn btn-dark" onClick={() => alert('Opening ticket (demo).')}>
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

