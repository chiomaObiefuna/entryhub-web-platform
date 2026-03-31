import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// --- Layouts & Navigation ---
import Navbar from "./components/Home-page/Navbar/Navbar";
import Footer from "./components/Home-page/Footer/Footer";
import DashboardLayout from "./components/Dashboard-Layout/DashboardLayout";

// --- Public Pages ---
import Hero from "./components/Home-page/Hero/Hero";
import Events from "./components/Home-page/Explore-Events/Events";
import EventDetails from "./components/Home-page/Event-Details/EventDetails"; 
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";

// --- Funnel & Dashboard Components ---
import TicketResales from "./components/Ticket/TicketResales";             
import EventPage from "./components/Event-Page/EventPage";           
import BookEvents from "./components/Book-Event/BookEvents";         
import DetailsEvents from "./components/Details-Events/DetailsEvents"; 
import PaymentComplete from "./components/Payment-Complete/PaymentComplete"; 
import Bankdetails from "./components/Home-page/Payment-method/bank-details"; 

import "./App.css";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* --- 🏠 HOMEPAGE --- */}
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Events />        
            <EventDetails />  
            <Footer />
          </>
        } />

        <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/sign-up" element={<><Navbar /><SignUp /><Footer /></>} />

        {/* --- 🎫 TICKET RESALE PAGE --- */}
        <Route path="/resale" element={
          <DashboardLayout title="Ticket Resale">
            <TicketResales />
          </DashboardLayout>
        } />

        {/* --- 🎫 BOOKING FUNNEL --- */}
        <Route path="/cinema" element={<DashboardLayout title="Cinema Events"><EventPage /></DashboardLayout>} />
        <Route path="/event/:id" element={<DashboardLayout title="Book Event"><BookEvents /></DashboardLayout>} />
        <Route path="/checkout/:id" element={<DashboardLayout title="Event Details"><DetailsEvents /></DashboardLayout>} />
        <Route path="/payment/:id" element={<DashboardLayout title="Complete your Payment"><PaymentComplete /></DashboardLayout>} />
        <Route path="/bankdetails" element={<DashboardLayout title="Bank Transfer Details"><Bankdetails /></DashboardLayout>} />

        {/* Success Screen */}
        <Route path="/completePayment" element={
          <DashboardLayout title="Payment Successful">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <div style={{ fontSize: '64px' }}>✅</div>
              <h2 style={{ color: '#5c7269', fontWeight: '800' }}>Payment Successful</h2>
              <p>Check your email for your ticket.</p>
              <button onClick={() => window.location.href = '/'} className="orange-btn-small">🏠 Home</button>
            </div>
          </DashboardLayout>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;