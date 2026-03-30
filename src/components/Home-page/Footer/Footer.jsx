import React, { useEffect, useState, useRef } from 'react';
/* Note: Ensure these paths are correct relative to this file's location in /src */
import facebook from '../../../assets/icons/facebook.svg'
import twitter from '../../../assets/icons/twitter.svg'
import instagram from '../../../assets/icons/instagram.svg'
import visa from '../../../assets/icons/visa.svg'
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = footerRef.current; // Store ref in a variable for cleanup
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  return (
    <footer ref={footerRef} className={`footer-section ${isVisible ? 'fade-in-up' : 'hidden-state'}`}>
      <div className="footer-container">
        
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li>Key Features</li>
            <li>Pricing</li>
            <li>Event Ticketing</li> {/* Fixed typo: Ticking -> Ticketing */}
            <li>Booking</li>
            <li>Online Promotion</li>
            <li>Developers</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore more</h4>
          <ul>
            <li>How it works</li>
            <li>Download App</li>
            <li>Event Promoter</li>
            <li>Sell Tickets</li>
            <li>Event Organizer</li>
            <li>Nonprofits & Fundraisers</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect With Us</h4>
          <ul>
            <li>Customer Support</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li className="social-link">
              <span className="icon-sm"><img src={facebook} alt='Facebook' className='footer-icon'/></span> 
              Facebook
            </li>
            <li className="social-link">
              <span className="icon-sm"><img src={twitter} alt='Twitter' className='footer-icon'/></span> 
              Twitter
            </li>
            <li className="social-link">
              <span className="icon-sm"><img src={instagram} alt='Instagram' className='footer-icon'/></span> 
              Instagram
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Payment Method</h4>
          <div className="payment-grid">
            <div className="payment-card-box">
              <img src={visa} alt='Visa' className='visa-img' />
            </div>
            <div className="payment-icon mastercard">
               <div className="mc-circles"></div>
               MasterCard
            </div>
            {/* Added more descriptive classes for easier styling */}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EntryHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;