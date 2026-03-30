import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// --- Layout & Navigation ---
import Navbar from "./components/Home-page/Navbar/Navbar";
import Footer from "./components/Home-page/Footer/Footer";
import DashboardLayout from "./components/Dashboard-Layout/DashboardLayout";

// --- Home Page Components ---
import Hero from "./components/Home-page/Hero/Hero";
import Events from "./components/Home-page/Explore-Events/Events";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";

// --- Funnel Components ---
import EventPage from "./components/Event-Page/EventPage"; // Step 0
import BookEvents from "./components/Book-Event/BookEvents"; // Step 1
import DetailsEvents from "./components/Details-Events/DetailsEvents"; // Step 2

// ✅ FIX: Ensure Step 3 and Step 5 are imported correctly
// Based on your previous code, PaymentComplete is actually your Card Payment form (Step 3)
import PaymentComplete from "./components/Payment-Complete/PaymentComplete"; 

import Bankdetails from "./components/Home-page/Payment-method/bank-details"; // Step 3 Alt
import EventDetails from "./components/Home-page/Event-Details/EventDetails"; // Step 4
import TicketResales from "./components/Ticket/TicketResales";

import "./App.css";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* --- PUBLIC LANDING PAGES --- */}
        <Route path="/" element={<><Navbar /><Hero /><Events /><Footer /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/sign-up" element={<><Navbar /><SignUp /><Footer /></>} />

        {/* 🎬 STEP 0: BROWSE CINEMA EVENTS */}
        <Route path="/cinema" element={
          <DashboardLayout title="Cinema Events">
            <EventPage />
          </DashboardLayout>
        } />

        {/* --- THE 5-STEP BOOKING FUNNEL --- */}
        
        {/* Step 1: Select Tickets */}
        <Route path="/event/:id" element={
          <DashboardLayout title="Book Event">
            <BookEvents />
          </DashboardLayout>
        } />

        {/* Step 2: Personal Info */}
        <Route path="/checkout/:id" element={
          <DashboardLayout title="Checkout Details">
            <DetailsEvents />
          </DashboardLayout>
        } />

        {/* Step 3: Payment Selection / Card Form */}
        {/* ✅ FIX: Changed <CompletePayment /> to <PaymentComplete /> to match your import */}
        <Route path="/payment/:id" element={
          <DashboardLayout title="Complete your Payment">
            <PaymentComplete />
          </DashboardLayout>
        } />

        {/* Step 3 Alt: Bank Details */}
        <Route path="/bankdetails" element={
          <DashboardLayout title="Bank Transfer Details">
            <Bankdetails />
          </DashboardLayout>
        } />

        {/* Step 4: Final Summary & QR Preview */}
        <Route path="/eventDetails/:id" element={
          <DashboardLayout title="Event Details">
            <EventDetails />
          </DashboardLayout>
        } />

        {/* Step 5: Success Screen */}
        {/* Note: If you have a separate Success component, import it here. 
            Otherwise, this can point back to a success state. */}
        <Route path="/completePayment" element={
          <DashboardLayout title="Payment Successful">
            <div style={{textAlign: 'center', padding: '50px'}}>
              <h2>✅ Payment Confirmed!</h2>
              <p>Check your email for your ticket.</p>
            </div>
          </DashboardLayout>
        } />

        {/* --- OTHER PAGES --- */}
        <Route path="/resale" element={
          <DashboardLayout title="Ticket Resale">
            <TicketResales />
          </DashboardLayout>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;