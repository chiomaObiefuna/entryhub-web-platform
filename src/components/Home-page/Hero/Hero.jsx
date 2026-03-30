import { useEffect, useState } from "react";
import './Hero.css';
import { FaSearch } from 'react-icons/fa';

// Ensure this path matches your src/assets/images folder
import heroImg from '../../../assets/images/hero-img.svg'; 

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
      // Add your navigation or API call here
    }
  };

  const handleBrowseEvents = () => {
    const eventSection = document.getElementById('events');
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`hero-section ${isVisible ? 'fade-in' : 'hidden-hero'}`}>
      {/* CRITICAL: This 'hero-content' div must wrap both the text 
          and the image container for flexbox side-by-side to work. 
      */}
      <div className='hero-content'> 
        
        <div className='hero-text-container'>
          <h1 className='hero-header'>
            Discover <span className='and-span'>And</span> <br /> 
            Book Events Seamlessly
          </h1>
          <p className='hero-subtitle'>
            Buy tickets, manage entries and create unforgettable experiences all in one place.
          </p>

          <form className='hero-search-wrapper' onSubmit={handleSearch}>
            <div className='search-icon-container'>
              <FaSearch 
                className='search-icon' 
                onClick={handleSearch} 
                style={{ cursor: 'pointer' }}
              />
              <input
                type='text'
                placeholder='Search events, artists, locations...'
                className='search-input'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Hidden button allows the 'Enter' key to submit the form */}
            <button type='submit' style={{ display: 'none' }} aria-label="Search" />
          </form>

          <div className='hero-btn-group'>
            <button className='btn-filled' onClick={() => console.log("Get Tickets")}>
              Get Tickets
            </button>
            <button className='btn-outline' onClick={handleBrowseEvents}>
              Browse Events
            </button>
          </div>
        </div>

        <div className='hero-image-container'>
          {/* Changed class to profile-img to match your circular CSS */}
          <div className='profile-img'>
            <img 
              src={heroImg} 
              alt='Hero Illustration' 
              className='hero-image' 
              loading="eager" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;