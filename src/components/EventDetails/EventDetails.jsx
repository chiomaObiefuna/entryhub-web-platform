import { useState } from 'react';
import './EventDetails.css';

export default function EventDetails() {
    // 1. State for the mobile sidebar toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // 2. State for the selected payment method
    const [selectedPayment, setSelectedPayment] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
    };

    return (
        < div className="event-details-layout">

        {/* --- Overlay Backdrop --- */}
        <div 
            className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
            onClick={toggleSidebar}
        ></div>

        {/* --- Sidebar --- */}
        <aside 
            className={
                `sidebar ${isSidebarOpen ? 'active' : ''}`}
        >
            {/* Visual debug indicator */}
            <div style={{fontSize: '10px', color: 'red', padding: '5px'}}>
                {/* State: {isSidebarOpen ? 'OPEN' : 'CLOSED'} */}
            </div>

            <button 
                className="mobile-toggle" 
                onClick={toggleSidebar} 
                style={{ position: 'absolute', top: '20px', right: '10px'}}
            >
                <i className="ph ph-x"></i>
            </button>

            <div className="logo" style={{marginTop: '40px'}}> <img src="/src/assets/logo/logo.png" alt="EntryHub Logo" /> </div>
            
            {/* ... nav items ... */}
            <nav className="sidebar-nav">
                <a className="nav-item"><i className="ph ph-squares-four nav-icon"></i> Dashboard</a>
                <a className="nav-item active"><i className="ph ph-house nav-icon"></i> Home</a>
                <a className="nav-item"><i className="ph ph-calendar-blank nav-icon"></i> Events</a>
                <a className="nav-item"><i className="ph ph-check-square-offset nav-icon"></i> In-Events</a>
                <a className="nav-item"><i className="ph ph-ticket nav-icon"></i> My Tickets</a>
            </nav>
        </aside>

        {/* --- Main Content --- */}
        <main className="main-content">
            {/* Mobile Hamburger Button */}
            <button className="mobile-toggle" onClick={toggleSidebar}>
                <i className="ph ph-list"></i>
            </button>

            <header className="page-header">
                <h1 className="page-title">Event Details</h1>
                <a className="back-btn"><i className="ph ph-arrow-left"></i> Back</a>
            </header>

            <section className="event-card">
                <img 
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80" 
                    alt="Shelter Movie Poster" 
                    className="event-poster" 
                />
                <div className="event-info">
                    <h3>Shelter in Cinema Now</h3>
                    <span className="category">Cinema</span>
                    <p className="event-date">30th March, 2026 / 5:00 Pm</p>
                    <p className="event-location"><i className="ph-fill ph-map-pin"></i> Abuja</p>
                </div>
                <div className="event-actions">
                    <button className="icon-btn"><i className="ph ph-share-network"></i></button>
                    <button className="icon-btn orange-icon"><i className="ph-fill ph-heart"></i></button>
                    <button className="icon-btn orange-icon"><i className="ph-fill ph-bookmark-simple"></i></button>
                </div>
            </section>

            <section className="ticket-details">
                <h3 className="section-title">Ticket Details</h3>
                <div className="ticket-scroll-container">
                    <div className="ticket-box"><span>Number of tickets</span><strong>1</strong></div>
                    <div className="ticket-box"><span>Sector</span><strong>107</strong></div>
                    <div className="ticket-box"><span>Row</span><strong>2</strong></div>
                    <div className="ticket-box"><span>Ticket type</span><strong>Cinema</strong></div>
                    <div className="ticket-box"><span>Seat</span><strong>5</strong></div>
                    <div className="ticket-box"><span>Price</span><strong>₦15,000</strong></div>
                </div>
                <div className="total-amount">
                    <span>Total Amount</span>
                    <span>₦15,000</span>
                </div>
            </section>

            <section className="personal-info">
                <h3 className="section-title">Personal Information</h3>
                <div className="input-group">
                    <label htmlFor="fullName">Full Name</label>
                    {/* Using defaultValue in React so it can be edited */}
                    <input type="text" id="fullName" defaultValue="" />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" defaultValue="" />
                </div>
            </section>

            <section className="payment-selection">
                <h3 className="section-title spacing-top">Choose Payment Method</h3>
                <div className="payment-options-container">
                    
                    {/* Payment Option 1: Bank Transfer */}
                    <button 
                        className={`payment-method ${selectedPayment === 'bank' ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelect('bank')}
                    >
                        <i className="ph ph-bank"></i>
                        <span>Bank Transfer</span>
                        <i className="ph ph-caret-right caret"></i>
                    </button>

                    {/* Payment Option 2: Bitcoin */}
                    <button 
                        className={`payment-method ${selectedPayment === 'bitcoin' ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelect('bitcoin')}
                    >
                        <i className="ph ph-currency-btc"></i>
                        <span>Bitcoin Wallet</span>
                        <i className="ph ph-caret-right caret"></i>
                    </button>

                    {/* Payment Option 3: Card */}
                    <button 
                        className={`payment-method ${selectedPayment === 'card' ? 'selected' : ''}`}
                        onClick={() => handlePaymentSelect('card')}
                    >
                        <i className="ph ph-credit-card"></i>
                        <span>New Card</span>
                        <i className="ph ph-caret-right caret"></i>
                    </button>

                </div>
            </section>

            <footer className="action-buttons">
                <button className="btn btn-home"><i className="ph ph-house"></i> Home</button>
                <button className="btn btn-proceed">Proceed To Payment</button>
            </footer>
        </main>
    </div>
    );
}