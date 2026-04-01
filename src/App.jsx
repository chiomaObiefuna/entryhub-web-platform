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
import ScanPage from "./components/Home-page/Payment-method/scan-page.jsx"

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

        {/* ✅ 2. ADD THE SCAN ROUTE HERE */}
        <Route path="/scan" element={<ScanPage />} />

        {/* Success Screen */}
        <Route path="/completePayment" element={
          <DashboardLayout title="Payment Successful">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
              <h2 style={{ color: '#5c7269', fontWeight: '800', fontSize: '2rem' }}>Success!</h2>
              <p style={{ color: '#a0afa8', marginBottom: '30px' }}>Your payment was processed successfully.</p>
          
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button 
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    const token = params.get("token");
                    // Using window.location.href works, but navigate is better for React Router
                    window.location.href = `/scan?token=${token}`;
                  }} 
                  className="ed-btn-proceed" 
                  style={{ padding: '12px 30px', width: 'auto' }}
                >
                  🎫 View My Ticket
                </button>

                <button 
                  onClick={() => window.location.href = '/'} 
                  className="ed-btn-home"
                  style={{ padding: '12px 30px', width: 'auto' }}
                >
                  🏠 Home
                </button>
              </div>
            </div>
          </DashboardLayout>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;