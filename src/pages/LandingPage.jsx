import { Link } from "react-router-dom";
import { useState } from "react";
import "./LandingPage.css";
import { FileText, LayoutDashboard, Rocket } from "lucide-react";


function LandingPage() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>

      {/* HEADER */}
      <header className="header">

        <h2 className="logo">
            <Link to="/templates"/>
         </h2>

        <div className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/resume">Resume Generation</Link>
          <Link to="/portfolio-builder">Portfolio Generation</Link>
          <Link to="/login" className="login-btn">Login / Signup</Link>
        </div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </header>


      {/* HERO */}
        <section className="hero">

  <h1>
    Build Stunning Resume & Portfolio Websites
  </h1>

  <p>
    Impress recruiters with professional career profiles.
  </p>

  <div className="hero-buttons">

    <Link to="/resume" className="primary-btn">
      Create Resume
    </Link>

    <Link to="/portfolio-builder" className="secondary-btn">
      Build Portfolio
    </Link>

  </div>

</section>


      {/* FEATURES */}
      <section className="features">

        <h2>Why Choose Profolio?</h2>

        <div className="feature-container">

          <div className="feature-card">
            <h3>Resume Builder</h3>
            <p>Create ATS friendly resumes easily.</p>
          </div>

          <div className="feature-card">
            <h3>Portfolio Builder</h3>
            <p>Showcase projects professionally.</p>
          </div>

          <div className="feature-card">
            <h3>Career Growth</h3>
            <p>Stand out to recruiters.</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Profolio</p>
      </footer>

    </div>
  );
}

export default LandingPage;

