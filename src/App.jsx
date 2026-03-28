import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Home-page/Navbar/Navbar';
import Hero from './components/Home-page/Hero/Hero';
import Events from './components/Home-page/Explore-Events/Events';
import EventDetails from './components/Home-page/Event-Details/EventDetails';
import Footer from './components/Home-page/Footer/Footer';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';
import EventPage from './EventPage'; 
import TicketResales from './components/Ticket/TicketResales'
// Ensure this matches the exact casing of your folder/file
import DashboardLayout from './components/Dashboard-Layout/DashboardLayout';
import './App.css';
import DetailsEvents from './components/Details-Events/DetailsEvents';
import BookEvents from './components/Book-Event/BookEvents';
import PaymentComplete from './components/Payment-Complete/PaymentComplete';
import Bankdetails from './components/Home-page/Payment-method/bank-details'
import {Toaster} from 'react-hot-toast'

// Landing Page Group
function Home() {
  return (
    <>
       <Toaster 
        position="top-center" 
        reverseOrder={false} 
      />
      <Navbar />
      <Hero />
      <Events />
      <EventDetails />
      
    
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* 1. PUBLIC PAGES (With Navbar and Footer) */}
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
      <Route path="/sign-up" element={<><Navbar /><SignUp /><Footer /></>} />
      <Route path="/explore-events" element={<><Navbar /><Event /><Footer /></>} />
      <Route path="/cinema" element={<EventPage />} />
      <Route path="/event/:id" element={<>< BookEvents/><Footer /></>} />
      <Route path="/eventDetails" element={<>< DetailsEvents/><Footer /></>} />
      <Route path="/completePayment" element={<>< PaymentComplete/><Footer /></>} />
      <Route path="/resale" element={<>< TicketResales/><Footer /></>} />
      <Route path="/bankdetails" element={<>< Bankdetails /><Footer /></>} />


      
    </Routes>
    
  );
}

export default App;