import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="page-container">
            <div className="hero-section">
                <h1>Welcome to MedCare Plus 🏥</h1>
                <p className="hero-subtitle">
                    Your trusted Hospital Appointment & Healthcare Management System
                </p>

                <div className="hero-actions">
                    <Link to="/booking" className="btn btn-primary">
                        Book Appointment
                    </Link>
                    <Link to="/doctors" className="btn btn-secondary">
                        View Doctors
                    </Link>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>👨‍⚕️ Expert Doctors</h3>
                    <p>Browse our list of top specialist doctors and check real-time availability.</p>
                </div>
                <div className="feature-card">
                    <h3>📅 Easy Booking</h3>
                    <p>Book instant appointments with your preferred doctor in a few clicks.</p>
                </div>
                <div className="feature-card">
                    <h3>⚡ Real-Time Status</h3>
                    <p>Track your appointment status: Confirmed, Pending, or Cancelled effortlessly.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
