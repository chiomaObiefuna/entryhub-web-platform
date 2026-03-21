import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Home-page/Navbar/Navbar'
import Hero from './components/Home-page/Hero/Hero'
import Events from './components/Home-page/Explore-Events/Events'
import Footer from './components/Home-page/Footer/Footer'
import AboutUs from './pages/AboutUs'
import Cinema from './pages/Cinema'
import EventDetails from './pages/EventDetails/EventDetails'
import SignUp from './pages/SignUp'
import DashboardLayout from './components/Dashboard-Layout/DashboardLayout'
import './App.css'

function Home() {
  return (
    <>
      <Hero />
      <Events />
    </>
  )
}

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
