import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard-Layout/DashboardLayout';
import './EventDetails.css';

export default function EventDetails() {
    const navigate = useNavigate();
    
    // We only need the payment state now. DashboardLayout handles the sidebar!
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentSelect = (method) => setSelectedPayment(method);

    return (
        <DashboardLayout title="Event Details">
            
            <div className="page-body">
                
                {/* Event Card */}
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
                        <label>Full Name</label>
                        <input type="text" defaultValue="" />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" defaultValue="" />
                    </div>
                </section>

                <section className="payment-selection">
                    <h3 className="section-title" style={{marginTop: '30px'}}>Choose Payment Method</h3>
                    <div className="payment-options-container">
                        <button className={`payment-method ${selectedPayment === 'bank' ? 'selected' : ''}`} onClick={() => handlePaymentSelect('bank')}>
                            <i className="ph ph-bank"></i> <span>Bank Transfer</span> <i className="ph ph-caret-right caret"></i>
                        </button>
                        <button className={`payment-method ${selectedPayment === 'bitcoin' ? 'selected' : ''}`} onClick={() => handlePaymentSelect('bitcoin')}>
                            <i className="ph ph-currency-btc"></i> <span>Bitcoin Wallet</span> <i className="ph ph-caret-right caret"></i>
                        </button>
                        <button className={`payment-method ${selectedPayment === 'card' ? 'selected' : ''}`} onClick={() => handlePaymentSelect('card')}>
                            <i className="ph ph-credit-card"></i> <span>New Card</span> <i className="ph ph-caret-right caret"></i>
                        </button>
                    </div>
                </section>

                <footer className="action-buttons">
                    <button className="btn btn-home" onClick={() => navigate('/')}><i className="ph ph-house"></i> Home</button>
                    <button className="btn btn-proceed">Proceed To Payment</button>
                </footer>
            </div>
        </DashboardLayout>
    );
}