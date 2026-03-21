import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/Dashboard-Layout/DashboardLayout.css';
import './EventDetails.css';

export default function EventDetails() {
    const navigate = useNavigate();
    // 1. State for the mobile sidebar toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // 2. State for the selected payment method
    const [selectedPayment, setSelectedPayment] = useState(null);

    // State to track what they type in the inputs
    const [fullName, setFullName] = useState( );
    const [email, setEmail] = useState( );

    // ... toggle sidebar and payment select functions ...
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
    };

    // The function that runs when they click "Proceed to Payment"
    const handleCheckout = async () => {
        // 1. Check if they picked a payment method
        if (!selectedPayment) {
            alert("Please select a payment method first!");
            return;
        }

        // 2. Bundle the data into a neat package (JSON)
        const orderData = {
            eventName: "Shelter in Cinema Now",
            customerName: fullName,
            customerEmail: email,
            paymentMethod: selectedPayment,
            totalPrice: 15000
        };

        try {
            // 3. Send the data to your Back-End URL
            // (Replace this URL with your actual back-end address later)
            const response = await fetch('http://eventhub-backend-pxoz.onrender.com/api/checkout', {
                method: 'POST', // POST means we are SENDING data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData) // Turn our bundle into a text string
            });

            // 4. Wait for the kitchen (back-end) to reply
            const result = await response.json();

            if (response.ok) {
                alert("Success! Order sent to backend.");
                console.log("Backend replied:", result);
                // Here is where you might use React Router to navigate to a "Success" page!
            } else {
                alert("Something went wrong with the booking.");
            }

        } catch (error) {
            console.error("Failed to connect to backend:", error);
            alert("Could not connect to the server.");
        }
    };

    return (
        < div className="dashboard-layout">

        {/* --- Mobile Overlay --- */}
        {isSidebarOpen && (
                <div className="overlay" onClick={toggleSidebar}></div>
            )}

        {/* --- Sidebar (menu-section) --- */}
            <aside className={`menu-section ${isSidebarOpen ? 'open' : ''}`}>
                <img src="/path-to-your-logo.png" alt="EntryHub" className="entryhub-logo" />
                
                <div className="MM">MAIN MENU</div>
                <ul className="menu-list">
                    <li className="menu-item"><i className="ph ph-squares-four svg"></i> <span className="word">Dashboard</span></li>
                    <li className="menu-item active"><i className="ph ph-house svg"></i> <span className="word">Home</span></li>
                    <li className="menu-item"><i className="ph ph-calendar-blank svg"></i> <span className="word">Events</span></li>
                    <li className="menu-item"><i className="ph ph-check-square-offset svg"></i> <span className="word">In-Events</span></li>
                    <li className="menu-item"><i className="ph ph-ticket svg"></i> <span className="word">My Tickets</span></li>
                    <li className="menu-item"><i className="ph ph-hand-coins svg"></i> <span className="word">Payment</span></li>
                    <li className="menu-item"><i className="ph ph-tote svg"></i> <span className="word">Merchandise</span></li>
                </ul>
                
                <div className="others">OTHER</div>
                <ul className="help">
                    <li className="menu-item"><i className="ph ph-gear svg"></i> <span className="word">Settings</span></li>
                    <li className="menu-item"><i className="ph ph-question svg"></i> <span className="word">Help & Support</span></li>
                </ul>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="main-content">
                
                {/* Header with Hamburger & Title */}
                <div className="head-text">
                    <button className="hamburger" onClick={toggleSidebar}>
                        <i className="ph ph-list"></i>
                    </button>
                    <h1 className="page-title">Event Details</h1>
                </div>

                {/* The Inner Page Body */}
                <div className="page-body">
                    
                    {/* Official Back Button using your CSS */}
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <i className="ph ph-arrow-left back-arrows"></i>
                        <span className="back-btn-text">Back</span>
                    </button>

                    {/* --- Event Specific Content Starts Here --- */}
                    <section className="event-card">
                        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80" alt="Shelter" className="event-poster" />
                        <div className="event-info">
                            <h3>Shelter in Cinema Now</h3>
                            <span className="category">Cinema</span>
                            <p className="event-date">30th March, 2026 / 5:00 Pm</p>
                            <p className="event-location"><i className="ph-fill ph-map-pin"></i> Abuja</p>
                        </div>
                    </section>

                    <section className="ticket-details">
                        <h3 className="section-title">Ticket Details</h3>
                        <div className="ticket-scroll-container">
                            <div className="ticket-box"><span>Number of tickets</span><strong>1</strong></div>
                            <div className="ticket-box"><span>Sector</span><strong>107</strong></div>
                            <div className="ticket-box"><span>Row</span><strong>2</strong></div>
                            <div className="ticket-box"><span>Ticket type</span><strong>cinema</strong></div>
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
                    <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
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
                    <button className="btn btn-home" onClick={() => navigate('/')}><i className="ph ph-house"></i> Home</button>
                    <button 
                    className="btn btn-proceed" onClick={handleCheckout}>
                        Proceed To Payment
                    </button>
                </footer>
            </div>
        </main>
    </div>
    );
}