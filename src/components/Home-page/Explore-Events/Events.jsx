import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Concert from '../../../../public/concert.svg'
import Football_field from '../../../../public/football_field.svg'
import Cinema from '../../../../public/cinema.svg'
import CalenderIcon from '../../../assets/icons/uil_calender.svg'
import LocationIcon from '../../../assets/icons/location.svg'
import EventImg from '../../../assets/images/event_img.svg'
import './Events.css'

import { useState, useEffect } from 'react'

const EVENTS_DATA = [
  { id: 1,
    name: 'Cinema',
    title:'Burna Boy Live (BLIC 5)',
    date: 'Mar 24',
    Location:'Eko Convention Center, Lagos',
    price: '15,000',
    image: '../../../../public/concert.svg'
  },

  {
    id: 2,
    name: 'Cinema',
    title:'Man United vs Chealsea FC',
    date: 'Mar 28',
    Location:'Old Trafford,London',
    price: '25,000',
    image: '../../../../public/football_field.svg'
  },
  {
    id: 3,
    name: 'Cinema',
    title:'The Good Guy',
    date: 'Mar 30',
    Location:'Eko Hotel, Lagos',
    price: '5,000',
    image: '../../../../public/cinema.svg'
  }, 
];
  

const Events = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisble] = useState(false);
  const sectionRef = useRef(null);

  useEffect(()=> {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting){
          setIsVisble(true);
          observer.unobserve(entry.target)
        }
      },
      {threshold: 0.1}

    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return() => observer.disconnect()
  }, []);

  const [events, setEvents] = useState(EVENTS_DATA);

  const categories = ['All', 'Concerts', 'Cinema', 'Football', 'Comedy', 'Festivals'];
  useEffect(() => {
    if (activeFilter === 'All') {
      setEvents(EVENTS_DATA);
    } else {
      const filterEvents = EVENTS_DATA.filter(event => event.category === activeFilter);
      setEvents(filterEvents);
    }
    },[activeFilter]);
  return (
    <section ref={sectionRef} className={`event-section ${isVisible ? 'fade-in-up' : 'hidden'}`}>
       <div className='event-container'>
         <div className='event-content'>
            <h2 className='event-header'>Explore Events</h2>
            <p className='event-text'>Find and book tickets for concerts, movies, football games, comedy and more</p>
          </div>
              <div className='filter-group'>{categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    if (category === 'Cinema') {
                      navigate('/cinema')
                      return
                    }
                    setActiveFilter(category)
                  }}
                  className={`filter-btn ${category === 'Cinema' ? 'cinema-cta' : ''} ${activeFilter === category ? 'active' : ''}`} 
                >
                  {category}
                </button>
              ))}</div>

              <div className='event-grid'>
                {events.length > 0 ? (events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))) : (
                  <p>No events found for the selected category.</p>
                )}
              </div>
        </div>
 </section>
   
  )
}
//Resueable component for event card
 const EventCard = ({ event }) => {
  return (
    <div className='event-card-container'>
      <div className='event-card'>
          <div className='card-image'>
            <img src={event.image} alt={event.title} />
            </div>
            <div className='card-body'>
          <h3 className='card-title'>{event.title}</h3>
          <div className='card-meta'>
            <p className='icon-text'><span className='icon-wrapper-loa'><img src={CalenderIcon} alt="Calendar" /></span>{event.date}</p>
          <p className='icon-text'><span className='icon-wrapper-loa'><img src={LocationIcon} alt="Location" /></span>{event.Location}</p>
          <p className='card-price'>From: NGN{event.price}</p>

          </div>

        
          
          <button className='btn-filled'>
            Get Tickets
          </button>
          </div> 
         </div>
    

    </div>

   
    
  );
};
export default Events
                