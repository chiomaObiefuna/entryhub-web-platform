import "./DashboardLayout.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/" || path === "/home") return "home";
    if (path.includes("/cinema") || path.includes("/book") || path.includes("/event")) return "events";
    if (path.includes("/resale") || path.includes("/ticket")) return "my ticket";
    if (path.includes("/payment") || path.includes("/bank")) return "payment";
    if (path.includes("/settings")) return "settings";
    if (path.includes("/support")) return "help&support";
    return "dashboard";
  };

  const active = getActiveTab();

  // Logic to identify the DetailsEvent page
  const isDetailsPage = location.pathname.includes("/event/");
  const showBackBtn = location.pathname.includes("/book") || isDetailsPage;

  return (
    <div className="dashboard-layout">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      {/* --- SIDEBAR SECTION --- */}
      <div className={`menu-section ${menuOpen ? "open" : ""}`}>
        <div className="pp">
          <div className="logo-container" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            <img src="/entry-hub.png" alt="Entry-Hub logo" className="entryhub-logo" />
          </div>

          <div className="menubar">
            <p className="MM">Main menu</p>
            <ul className="menu-list">
              <li className={`menu-item ${active === "dashboard" ? "active" : ""}`} onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>
                <span className="word">Dashboard</span>
              </li>
              <li className={`menu-item ${active === "home" ? "active" : ""}`} onClick={() => { navigate("/"); setMenuOpen(false); }}>
                <span className="word">Home</span>
              </li>
              <li className={`menu-item ${active === "events" ? "active" : ""}`} onClick={() => { navigate("/cinema"); setMenuOpen(false); }}>
                <span className="word">Events</span>
              </li>
              <li className={`menu-item ${active === "my ticket" ? "active" : ""}`} onClick={() => { navigate("/resale"); setMenuOpen(false); }}>
                <span className="word">My tickets</span>
              </li>
              <li className={`menu-item ${active === "payment" ? "active" : ""}`} onClick={() => { navigate("/bankdetails"); setMenuOpen(false); }}>
                <span className="word">Payment</span>
              </li>
            </ul>
          </div>

          <div className="others-section">
            <p className="others">Others</p>
            <ul className="help">
              <li className={`menu-item ${active === "settings" ? "active" : ""}`} onClick={() => { navigate("/settings"); setMenuOpen(false); }}>
                <span className="word">Settings</span>
              </li>
              <li className={`menu-item ${active === "help&support" ? "active" : ""}`} onClick={() => { navigate("/support"); setMenuOpen(false); }}>
                <span className="word">Help & Support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="main-content">
        <div className="head-text">
          <button className="hamburger-btn" onClick={() => setMenuOpen(true)}>☰</button>
          <h1 className="page-title">{title}</h1>
        </div>

        {/* ✅ ADDED CONDITIONAL CLASS HERE */}
        <div className={`page-body ${isDetailsPage ? "transparent-body" : ""}`}>
          {showBackBtn && (
            <div className="back-btn-con">
              <button className="back-button" onClick={() => navigate(-1)}>
                <span className="back-btn-text">← Back</span>
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;