import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Home-page/Navbar/Navbar'
import Hero from './components/Home-page/Hero/Hero'
import Events from './components/Home-page/Explore-Events/Events'
import EventDetails from './components/Home-page/Event-Details/EventDetails'
import Footer from './components/Home-page/Footer/Footer'
import AboutUs from './pages/AboutUs'
// import Cinema from './pages/Cinema' // You can comment this out if you're replacing it
import SignUp from './pages/SignUp'
import EventPage from './EventPage' 

import './App.css'

function Home() {
  return (
    <>
      <Hero />
      <Events />
      <EventDetails />
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        {/* 1. PAGES WITH NAVBAR AND FOOTER */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/sign-up" element={<><Navbar /><SignUp /><Footer /></>} />

        {/* 2. DASHBOARD PAGE (Standalone layout) */}
        {/* We changed the path from /event to /cinema here */}
        <Route path="/cinema" element={<EventPage />} />

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App