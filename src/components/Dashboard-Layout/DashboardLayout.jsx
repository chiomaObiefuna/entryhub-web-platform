import "./DashboardLayout.css"; 
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ title, children }) { 
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 const getActiveTab = () => {
    const path = location.pathname;
    
    // Exact match for Home
    if (path === "/" || path === "/home") return "home";
    
    // Match anything related to booking or cinema
    if (path.includes("/cinema") || path.includes("/book") || path.includes("/event")) return "events";
    
    // Match tickets and resales
    if (path.includes("/resale") || path.includes("/ticket")) return "my ticket";
    
    // Match both card and bank payment pages
    if (path.includes("/payment") || path.includes("/bank")) return "payment";
    
    return "dashboard";
  };

  const active = getActiveTab();

  return (
    <div className="dashboard-layout">
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      <div className={`menu-section ${menuOpen ? "open" : ""}`}>
        <div className="pp">
          <div className="logo-container" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
            {/* ✅ Using public folder path directly */}
            <img src="/entry-hub.png" alt="Entry-Hub logo" className="entryhub-logo" />
          </div>

          <div className="menubar">
            <p className="MM">Main menu</p>
            <ul className="menu-list">
              <li className={`menu-item ${active === "dashboard" ? "active" : ""}`} onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Dashboard</span></div>
              </li>

              <li className={`menu-item ${active === "home" ? "active" : ""}`} onClick={() => { navigate("/"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Home</span></div>
              </li>

              <li className={`menu-item ${active === "events" ? "active" : ""}`} onClick={() => { navigate("/cinema"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Events</span></div>
              </li>

              <li className={`menu-item ${active === "my ticket" ? "active" : ""}`} onClick={() => { navigate("/resale"); setMenuOpen(false); }}>
                <div className="left"><span className="word">My tickets</span></div>
              </li>
              
              <li className={`menu-item ${active === "payment" ? "active" : ""}`} onClick={() => { navigate("/bankdetails"); setMenuOpen(false); }}>
                <div className="left"><span className="word">Payment</span></div>
              </li>
            </ul>
          </div>

          <div className="others-section">
            <p className="others">Others</p>
            <ul className="help">
              <li className={`menu-item ${active === "settings" ? "active" : ""}`} onClick={() => navigate("/settings")}>
                <div className="left"><span className="word">Settings</span></div>
              </li>
              <li className={`menu-item ${active === "support" ? "active" : ""}`} onClick={() => navigate("/support")}>
                <div className="left"><span className="word">Help & Support</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
          
          <div className="children-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;