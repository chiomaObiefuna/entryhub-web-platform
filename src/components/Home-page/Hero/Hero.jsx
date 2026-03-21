import React from 'react'
import { useState, useEffect } from 'react'
import heroImg from '../../../assets/images/hero-img.svg';
import './Hero.css'
import { FaSearch} from 'react-icons/fa'

export const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Navigating to search results for: ${searchQuery}`);
  }
  };

  const handleGetTickets = ()=> {
    console.log("Redirecting to checkout/events...");
  };
  const handleBrowseEvents = () => {
    const eventSection = document.getElementById('events');
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section className={`hero-section ${isVisible ? 'fade-in': ''}`}>
      <div className='hero-content'>
        <div className='hero-text-container'>
          <h1>Discover <span>And</span> <br /> Book Events Seamlessly</h1>
          <p className='hero-subtitle'>Buy tickets,Manage entries and create unforgatable experience all in one piece...</p>

            <form className='hero-search-wrapper' onSubmit= {handleSearch}>
              <div className='hero-search'>
                    <span className='search-icon-container'>
                      <FaSearch className='search-icon'/>
                      <input type='text' placeholder='Search events, artist, location...' className='search-input'
                      value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                       </span>

                        </div>
                        
                      <div>
                        {/* Hidden submit button to allow "Enter key to work" */}
                      <button type='submit' style ={{ display: 'none'}}>Search</button>
                      </div>
              </form>
                <div className='hero-btn-group'>  
                   <button className='btn-filled' onClick={handleGetTickets}>Get Tickets</button>
                   <button className='btn-outline' onClick={handleBrowseEvents}>Browse Events</button>

                </div>
          </div>
        <div className='hero-image-container'>
            <div className='profile-img'>
              <img src={heroImg} alt='Hero Image' className='hero-image'/>
              
            </div>
          
         </div>
      
      </div>
      
    </section>
  )
}





export default Hero
