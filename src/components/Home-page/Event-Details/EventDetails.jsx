import React, { useEffect, useMemo, useRef, useState } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom';
import EventImg from '../../../assets/images/event_img.svg';

const formatNGN = (value) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value);

const BASE_URL = 'https://eventhub-backend-pxoz.onrender.com';

// ── Helper: extract a ticket object from any known response shape ────────────
const extractTicket = (data) => {
  if (Array.isArray(data.tickets) && data.tickets.length > 0) return data.tickets[0];
  if (data.ticket) return data.ticket;
  if (data.data)   return data.data;
  if (data._id)    return data;   // bare object IS the ticket
  return null;
};

// ── Helper: find the qr_image value regardless of key casing ────────────────
const findQrField = (obj) =>
  obj.qr_image  ??
  obj.qrImage   ??
  obj.qr_code   ??
  obj.qrCode    ??
  obj.qr        ??
  null;

// ── Helper: normalise raw base64 / data-URI into a usable <img> src ──────────
const toQrSrc = (raw) => {
  if (!raw || typeof raw !== 'string' || raw.trim() === '') return null;
  return raw.startsWith('data:image') ? raw : `data:image/png;base64,${raw}`;
};

// ─────────────────────────────────────────────────────────────────────────────

const EventDetails = () => {
  const navigate       = useNavigate();
  const sectionRef     = useRef(null);
  const ticketEntryRef = useRef(null);

  const [isVisible,     setIsVisible]     = useState(false);
  const [ticketFromDb,  setTicketFromDb]  = useState(null);
  const [qrSrc,         setQrSrc]         = useState(null);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [ticketError,   setTicketError]   = useState(null);

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

  // ── Two-step ticket fetch ─────────────────────────────────────────────────
  //
  //  WHY TWO STEPS?
  //  Many backends omit large blob fields (like qr_image) from list endpoints
  //  to keep responses small. The individual /:id endpoint usually returns the
  //  full document including the QR image. We:
  //    1. Fetch the list  → get the ticket id + all light metadata
  //    2. If qr_image is missing, fetch /api/tickets/:id to get the full ticket
  //
  useEffect(() => {
    setTicketLoading(true);
    setTicketError(null);

    const loadTicket = async () => {
      // ── Step 1: list endpoint ────────────────────────────────────────────
      const listRes = await fetch(`${BASE_URL}/api/tickets`);
      if (!listRes.ok) throw new Error(`List endpoint returned HTTP ${listRes.status}`);
      const listData = await listRes.json();
      console.log('[Ticket] list response:', listData);

      const firstTicket = extractTicket(listData);
      if (!firstTicket) throw new Error('No ticket found in list response');
      console.log('[Ticket] keys from list:', Object.keys(firstTicket));

      // ── Check if list already includes qr_image ──────────────────────────
      const listQrRaw = findQrField(firstTicket);
      console.log('[Ticket] qr_image in list?', listQrRaw ? 'YES ✅' : 'NO ❌');

      if (listQrRaw) {
        // List already has QR — no second request needed
        setQrSrc(toQrSrc(listQrRaw));
        const { qr_image, qrImage, qr_code, qrCode, qr, ...meta } = firstTicket;
        setTicketFromDb(meta);
        return;
      }

      // ── Step 2: list didn't include qr_image — fetch individual ticket ───
      const ticketId = firstTicket._id ?? firstTicket.id;
      console.log('[Ticket] fetching individual ticket, id:', ticketId);

      if (!ticketId) {
        console.warn('[Ticket] no id field found — cannot fetch individual ticket');
        setTicketFromDb(firstTicket);
        return;
      }

      // Try both common single-ticket URL patterns
      const endpoints = [
        `${BASE_URL}/api/tickets/${ticketId}`,
        `${BASE_URL}/api/ticket/${ticketId}`,
      ];

      let fullTicket = null;

      for (const url of endpoints) {
        try {
          console.log('[Ticket] trying:', url);
          const res = await fetch(url);
          if (!res.ok) { console.warn(`[Ticket] ${url} → HTTP ${res.status}`); continue; }

          const json = await res.json();
          console.log('[Ticket] single endpoint response:', json);

          const candidate = extractTicket(json);
          const qrRaw     = candidate ? findQrField(candidate) : null;
          console.log('[Ticket] qr_image from individual endpoint?', qrRaw ? 'YES ✅' : 'NO ❌');

          if (qrRaw) {
            fullTicket = candidate;
            setQrSrc(toQrSrc(qrRaw));
            break;
          }
        } catch (e) {
          console.warn('[Ticket] fetch error for', url, e.message);
        }
      }

      if (!fullTicket) {
        console.warn('[Ticket] qr_image not found on any endpoint — QR will not display');
      }

      // Strip the large QR blob from stored metadata regardless
      const source = fullTicket ?? firstTicket;
      const { qr_image, qrImage, qr_code, qrCode, qr, ...meta } = source;
      setTicketFromDb(meta);
    };

    loadTicket()
      .catch((err) => {
        console.error('[Ticket] fatal error:', err);
        setTicketError(err.message);
      })
      .finally(() => setTicketLoading(false));
  }, []);

  // ── Derived metadata display values ──────────────────────────────────────
  const backendMeta = useMemo(() => {
    if (!ticketFromDb) return null;
    return {
      seat:          ticketFromDb.seat
                       ? `Row ${ticketFromDb.seat.row}, Seat ${ticketFromDb.seat.number}`
                       : 'N/A',
      email:         ticketFromDb.buyer_email    ?? 'N/A',
      paymentStatus: ticketFromDb.payment_status ?? 'N/A',
      isUsed:        ticketFromDb.is_used ? 'Used' : 'Valid',
      tokenShort:    ticketFromDb.qr_token
                       ? `${ticketFromDb.qr_token.slice(0, 8)}…`
                       : 'N/A',
    };
  }, [ticketFromDb]);

  // ── Static ticket tiers ───────────────────────────────────────────────────
  const tickets = useMemo(() => [
    { id: 'regular', label: 'Regular', price: 10000, status: 'Available' },
    { id: 'vip',     label: 'VIP',     price: 35000, status: 'Available' },
    { id: 'vvip',    label: 'VVIP',    price: 90000, status: 'Sold out'  },
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
    const link     = document.createElement('a');
    link.href      = qrSrc;
    link.download  = 'EntryHub-Ticket.png';
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
                  const isSoldOut  = t.status === 'Sold out';
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
                      <div className="td type"   role="cell">{t.label}</div>
                      <div className="td price"  role="cell">NGN {formatNGN(t.price)}</div>
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

              {backendMeta && (
                <>
                  <div className="meta-row">
                    <span className="meta-label">Seat</span>
                    <span className="meta-value">{backendMeta.seat}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Buyer</span>
                    <span className="meta-value">{backendMeta.email}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Payment</span>
                    <span className="meta-value">{backendMeta.paymentStatus}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Entry</span>
                    <span className="meta-value">{backendMeta.isUsed}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Token</span>
                    <span className="meta-value">{backendMeta.tokenShort}</span>
                  </div>
                </>
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

