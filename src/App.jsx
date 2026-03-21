import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
  const location = useLocation();
  
  const isDashboardPage = location.pathname === '/EventDetails';
  return (
    <>
      {/* ONLY render the Navbar if we are NOT on the dashboard */}
      {!isDashboardPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/EventDetails" element={<EventDetails />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ONLY render the Footer if we are NOT on the dashboard */}
      {!isDashboardPage && <Footer />}
    </>
  )
}

export default App
