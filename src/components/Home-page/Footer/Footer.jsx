import React from 'react';
import './footer.css';

// Import your local icons here
// import VisaLogo from './assets/visa.png';
// import MasterCardLogo from './assets/mastercard.png';
// import FacebookIcon from './assets/facebook.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Column 1: Product */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li>Key Features</li>
            <li>Pricing</li>
            <li>Event Ticking</li>
            <li>Booking</li>
            <li>Online Promotion</li>
            <li>Developers</li>
          </ul>
        </div>

        {/* Column 2: Explore More */}
        <div className="footer-col">
          <h4>Explore more</h4>
          <ul>
            <li>How it work</li>
            <li>Download App</li>
            <li>Event Promoter</li>
            <li>Sell Tickets</li>
            <li>Event Organizer</li>
            <li>Nonprofits & Fundraisers</li>
          </ul>
        </div>

        {/* Column 3: Connect With Us */}
        <div className="footer-col">
          <h4>Connect With Us</h4>
          <ul>
            <li>Customer Supports</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li className="social-link"><span className="icon-sm">f</span> Facebook</li>
            <li className="social-link"><span className="icon-sm">𝕏</span> Twitter</li>
            <li className="social-link"><span className="icon-sm">📸</span> Instagram</li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div className="footer-col">
          <h4>Payment Method</h4>
          <div className="payment-grid">
            {/* Using placeholders for logos - replace with your local images */}
            <div className="payment-icon visa">VISA</div>
            <div className="payment-icon mastercard">
               <div className="mc-circles"></div>
               MasterCard
            </div>
            <div className="payment-icon visa-alt">VISA</div>
            <div className="payment-icon mastercard-alt">
               <div className="mc-circles"></div>
               MasterCard
            </div>
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 EntryHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;