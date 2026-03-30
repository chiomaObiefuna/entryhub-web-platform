import "./DashboardLayout.css"; // ✅ Ensure filename is exactly DashboardLayout.css
import { useState, useEffect } from "react";
import logo from "./entry-hub.png"; // ✅ Ensure image is in this same folder
import { useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ title, children }) { // ✅ Standardized to Capital L
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mapping paths to active menu states
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.includes("/event")) return "events";
    if (path.includes("/ticket")) return "my ticket";
    if (path.includes("/payment")) return "payment";
    return "dashboard";
  };

  const active = getActiveTab();

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Sidebar Section */}
      <div className={`menu-section ${menuOpen ? "open" : ""}`}>
        <div className="pp">
          <div className="logo-container" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
            <img src={logo} alt="Entry-Hub logo" className="entryhub-logo" />
          </div>

          <div className="menubar">
            <p className="MM">Main menu</p>
            <ul className="menu-list">
              {/* Dashboard */}
              <li className={`menu-item ${active === "dashboard" && "active"}`} onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Dashboard</span></div>
              </li>

              {/* Home */}
              <li className={`menu-item ${active === "home" && "active"}`} onClick={() => { navigate("/"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Home</span></div>
              </li>

              {/* Events */}
              <li className={`menu-item ${active === "events" && "active"}`} onClick={() => { navigate("/events"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Events</span></div>
              </li>

              {/* In Events */}
              <li className={`menu-item ${active === "in-events" && "active"}`} onClick={() => { navigate("/in-events"); setMenuOpen(false); }}>
                <div className="left"><span className="word">In events</span></div>
              </li>

              {/* My Tickets */}
              <li className={`menu-item ${active === "my ticket" && "active"}`} onClick={() => { navigate("/my-tickets"); setMenuOpen(false); }}>
                <div className="left"><span className="word">My tickets</span></div>
              </li>
              
              {/* Payment */}
              <li className={`menu-item ${active === "payment" && "active"}`} onClick={() => { navigate("/payment"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Payment</span></div>
              </li>
            </ul>
          </div>

          <div className="others-section">
            <p className="others">Others</p>
            <ul className="help">
              <li className={`menu-item ${active === "settings" && "active"}`} onClick={() => navigate("/settings")}>
                <div className="left"><span className="word">Settings</span></div>
              </li>
              <li className={`menu-item ${active === "help&support" && "active"}`} onClick={() => navigate("/support")}>
                <div className="left"><span className="word">Help & Support</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="head-text">
          <button className="hamburger-btn" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
          <h1 className="page-title">{title}</h1>
        </div>

        <div className="page-body">
          <div className="back-btn-con">
            <button className="back-button" onClick={() => navigate(-1)}>
              <span className="back-btn-text">← Back</span>
            </button>
          </div>
          
          {/* This is where your page content (TicketResales, BookEvents, etc.) renders */}
          <div className="children-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout; 