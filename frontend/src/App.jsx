import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import BookingPage from "./pages/BookingPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Navigation Component */}
      <Navbar />

      {/* Main Content Body */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 MedCare Plus Hospital Appointment System — ITUE301 Practical Exam</p>
      </footer>
    </div>
  );
}

export default App;