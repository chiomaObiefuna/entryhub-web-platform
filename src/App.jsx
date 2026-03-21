import React from "react";
import { Routes, Route } from "react-router-dom";
import BookingPage from "./components/Bookevent/BookingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookingPage />} />
    </Routes>
  );
}

export default App;

