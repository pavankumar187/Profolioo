import { useState } from "react";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">Profolio</h2>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#portfolio" onClick={closeMenu}>
            Portfolio
          </a>
          <a href="#resume" onClick={closeMenu}>
            Resume Generator
          </a>
          <a href="#tools" onClick={closeMenu}>
            Tools
          </a>
          <button className="login-btn">Login / Signup</button>
        </div>

        <div 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
