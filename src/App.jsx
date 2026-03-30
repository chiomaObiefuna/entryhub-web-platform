import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout & Navigation
import Navbar from "./components/Home-page/Navbar/Navbar";
import Footer from "./components/Home-page/Footer/Footer";
import DashboardLayout from "./components/Dashboard-Layout/DashboardLayout";

// Pages & Components
import Hero from "./components/Home-page/Hero/Hero";
import Events from "./components/Home-page/Explore-Events/Events";
import EventDetails from "./components/Home-page/Event-Details/EventDetails"; // The QR/Tabs page
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import EventPage from "./components/Event-Page/EventPage";
import TicketResales from "./components/Ticket/TicketResales";
import DetailsEvents from "./components/Details-Events/DetailsEvents"; // The Checkout page
import BookEvents from "./components/Book-Event/BookEvents"; // The Selection page
import PaymentComplete from "./components/Payment-Complete/PaymentComplete";
import Bankdetails from "./components/Home-page/Payment-method/bank-details";

import "./App.css";

// ... other imports

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* --- PUBLIC LANDING PAGES --- */}
        <Route path="/" element={<><Navbar /><Hero /><Events /><Footer /></>} />

        {/* --- DASHBOARD / INTERNAL PAGES --- */}
        
        {/* Step 1: Browse */}
        <Route path="/cinema" element={
          <DashboardLayout title="Cinema Events">
            <EventPage />
          </DashboardLayout>
        } />

        {/* Step 2: Pick Tickets (Sector, Row, Seat) */}
        <Route path="/event/:id" element={
          <DashboardLayout title="Book Event">
            <BookEvents />
          </DashboardLayout>
        } />

        {/* Step 3: THE TARGET - QR Code, Description, and Tabs */}
        {/* ✅ This is where "Book Event" should lead */}
        <Route path="/eventDetails/:id" element={
          <DashboardLayout title="Event Details">
            <EventDetails />
          </DashboardLayout>
        } />

        {/* Step 4: Final Checkout / Payment Successful */}
        <Route path="/completePayment" element={
          <DashboardLayout title="Payment Successful">
            <PaymentComplete />
          </DashboardLayout>
        } />

        {/* Other Routes */}
        <Route path="/checkout/:id" element={
          <DashboardLayout title="Checkout Details">
            <DetailsEvents />
          </DashboardLayout>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;