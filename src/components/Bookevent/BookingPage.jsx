import React, { useState } from "react";
import styles from "./BookingPage.module.css";
import logo from "../../assets/logo/logo.svg";

import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiCreditCard,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

function BookingPage() {
  const [tickets, setTickets] = useState(1);
  const [seat, setSeat] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booked ${tickets} ticket(s), Seat ${seat}`);
  };

  return (
    <div className={styles.container}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <img src={logo} alt="logo" className={styles.logo} />

        <p className={styles.menuTitle}>MAIN MENU</p>

        <div className={styles.menuItem}>
          <FiGrid />
          <span>Dashboard</span>
          <div className={styles.badge}>›</div>
        </div>

        <div className={styles.menuItem}>
          <FiHome />
          <span>Home</span>
          <div className={styles.badge}>›</div>
        </div>

        <div className={styles.menuItem}>
          <FiCalendar />
          <span>Events</span>
          <div className={styles.badge}>›</div>
        </div>

        <div className={styles.menuItem}>
          <FiCalendar />
          <span>In-Events</span>
          <div className={styles.badge}>›</div>
        </div>

        <div className={styles.menuItem}>
          <FiCalendar />
          <span>My Tickets</span>
          <div className={styles.badge}>›</div>
        </div>

        <div className={styles.menuItem}>
          <FiCreditCard />
          <span>Payment</span>
          <div className={styles.badge}>›</div>
        </div>

        <div className={styles.menuItem}>
          <FiGrid />
          <span>Merchandise</span>
          <div className={styles.badge}>›</div>
        </div>

        <p className={styles.menuTitle}>OTHER</p>

        <div className={styles.menuItem}>
          <FiSettings />
          <span>Settings</span>
        </div>

        <div className={styles.menuItem}>
          <FiHelpCircle />
          <span>Help & Support</span>
        </div>

        <div className={styles.logout}>
          <FiLogOut />
          <span>Logout</span>
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Book Event</h2>

          <div className={styles.user}>
            <img src="https://via.placeholder.com/40" alt="user" />
            <div>
              <p>Korede Bello</p>
              <span>User</span>
            </div>
          </div>
        </div>

        <p className={styles.back}>← Back</p>

        {/* EVENT CARD */}
        <div className={styles.eventCard}>
          <img src="https://via.placeholder.com/80" alt="event" />

          <div>
            <h3>Shelter in Cinema Now</h3>
            <p>Cinema</p>
            <p>30th March, 2025 | 6:00 PM</p>
            <p>📍 Abuja</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Number of Tickets</label>
          <input
            type="number"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
          />

          <label>Personal Information</label>

          <input type="text" defaultValue="Korede Bello" />
          <input type="email" defaultValue="koredebello4life@gmail.com" />

          <label>Ticket Type</label>
          <select>
            <option>Cinema</option>
          </select>

          <label>Seat Selection</label>
          <input
            type="number"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
          />

          <div className={styles.buttons}>
            <button type="button" className={styles.homeBtn}>
              Home
            </button>

            <button type="submit" className={styles.bookBtn}>
              Book Event
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default BookingPage;