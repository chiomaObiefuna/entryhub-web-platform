import React from 'react'
import Navbar from './components/Home-page/Navbar/Navbar'
import Hero from './components/Home-page/Hero/Hero'
import Events from './components/Home-page/Explore-Events/Events'
import EventDetails from './components/Home-page/Event-Details/EventDetails'
import Footer from './components/Home-page/Footer/Footer'

import './App.css'


function App() {
  
  return (
    <>
      <Navbar />
      <Hero />
      <Events />
      <EventDetails />
      <Footer />
 
    </>
  )
}

export default App
