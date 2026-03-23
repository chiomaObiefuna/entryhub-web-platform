import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Home-page/Navbar/Navbar'
import Hero from './components/Home-page/Hero/Hero'
import Events from './components/Home-page/Explore-Events/Events'
import EventDetails from './components/Home-page/Event-Details/EventDetails'
import Footer from './components/Home-page/Footer/Footer'
import Dashboardlayout from './components/Dashboard-Layout/DashboardLayout'
import AboutUs from './pages/AboutUs'
import Cinema from './pages/Cinema'
import SignUp from './pages/SignUp'
import TicketResales from './components/Ticket/TicketResales/'
import BookEvents from './components/Book-Event/BookEvents.JSX'
import PaymentComplete from './components/Payment-Complete/PaymentComplete'
import DetailsEvents from './components/Details-Events/DetailsEvents'


import './App.css'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <PaymentComplete /> */}
      <Events />
      <EventDetails />
      {/* <BookEvents />
     */}
       
      
    </>
  )
}

function App() {
  
  return (
    <>
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/resale" element={<TicketResales />} />
        <Route path="/eventDetails" element={<DetailsEvents />} />
        <Route path="/completePayment" element={<PaymentComplete />} />

      </Routes>
      <Footer />
      {/* <DetailsEvents /> */}
     
  
    </>
  )
}

export default App
