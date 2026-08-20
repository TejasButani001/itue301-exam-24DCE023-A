import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>🏥 MedCare Plus</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/doctors">Doctors</Link>
        </li>
        <li>
          <Link to="/booking">Booking</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
