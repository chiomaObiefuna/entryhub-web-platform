import React, { useEffect, useState, useRef } from 'react';
import facebook from '../../../assets/icons/facebook.svg'
import twitter from '../../../assets/icons/twitter.svg'
import instagram from '../../../assets/icons/instagram.svg'
import visa from '../../../assets/icons/visa.svg'
import './footer.css';



const Footer = () => {

  const [isVisible, setIsVisible] = useState (false);
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
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current)
        observer.disconnect();
    }
  }, [])
  return (
    <footer ref={footerRef} className={`footer-section ${isVisible ? 'fade-in-up' : 'hidden-state'}`}>
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
            <li className="social-link"><span className="icon-sm"><img src={facebook} alt='facebook-icon' className='footer-icon'/></span> Facebook</li>
            <li className="social-link"><span className="icon-sm"><img src={twitter} alt='Hero Image' className='footer-icon'/></span> Twitter</li>
            <li className="social-link"><span className="icon-sm"><img src={instagram} alt='Hero Image' className='footer-icon'/></span> Instagram</li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div className="footer-col">
          <h4>Payment Method</h4>
          <div className="payment-grid">
            {/* Using placeholders for logos - replace with your local images */}
            <div>
              <img src= {visa} alt='visa Img' className='visa-img' />
            </div>
            <div className="payment-icon mastercard">
               <div className="mc-circles"></div>
               MasterCard
            </div>
            <div>
            <img src= {visa} alt='visa Img' className='visa-img' />
            </div>
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