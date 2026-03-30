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
import EventDetails from "./components/Home-page/Event-Details/EventDetails";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import EventPage from "./components/Event-Page/EventPage";
import TicketResales from "./components/Ticket/TicketResales";
import DetailsEvents from "./components/Details-Events/DetailsEvents";
import BookEvents from "./components/Book-Event/BookEvents";
import PaymentComplete from "./components/Payment-Complete/PaymentComplete";
import Bankdetails from "./components/Home-page/Payment-method/bank-details";

import "./App.css";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* --- PUBLIC LANDING PAGES --- */}
        <Route path="/" element={<><Navbar /><Hero /><Events /><EventDetails /><Footer /></>} />
        <Route path="/about-us" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/sign-up" element={<><Navbar /><SignUp /><Footer /></>} />

        {/* --- DASHBOARD / INTERNAL PAGES --- */}
        {/* We wrap these in the DashboardLayout so the sidebar stays visible */}
        
        <Route path="/cinema" element={
          <DashboardLayout title="Cinema Events">
            <EventPage />
          </DashboardLayout>
        } />

        <Route path="/event/:id" element={
          <DashboardLayout title="Book Ticket">
            <BookEvents />
          </DashboardLayout>
        } />

        <Route path="/eventDetails/:id" element={
          <DashboardLayout title="Checkout">
            <DetailsEvents />
          </DashboardLayout>
        } />

        <Route path="/resale" element={
          <DashboardLayout title="Ticket Resale">
            <TicketResales />
          </DashboardLayout>
        } />

        <Route path="/completePayment" element={
          <DashboardLayout title="Payment Success">
            <PaymentComplete />
          </DashboardLayout>
        } />

        <Route path="/bankdetails" element={
          <DashboardLayout title="Bank Details">
            <Bankdetails />
          </DashboardLayout>
        } />

        {/* Catch-all: Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;