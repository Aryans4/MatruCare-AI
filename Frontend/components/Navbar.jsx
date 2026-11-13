import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          MatruCare AI
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <a href="/#about" onClick={closeMenu}>About</a>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          <NavLink to="/login" onClick={closeMenu}>
            Login
          </NavLink>

          <NavLink to="/signup" onClick={closeMenu}>
            Signup
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;