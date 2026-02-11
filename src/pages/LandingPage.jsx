import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect,useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";



function LandingPage() {

  const navigate = useNavigate();

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      navigate("/login");
    })
    .catch((err) => alert(err.message));
};

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
const [menuOpen, setMenuOpen] = useState(false);


  return (
    

   <div className={`landing-container ${darkMode ? "dark" : ""}`}>

      {/* NAVBAR */}
      <nav className="navbar" data-aos="fade-down" data-aos-delay="200">
    <div>
  <h2 className="logo">ProFolio</h2>
</div>
  <div className={`nav-links ${menuOpen ? "active" : ""}`}>
    <a href="#home">Home</a>
<a href="#resume">Resume</a>
<a href="#portfolio">Portfolio</a>
<a href="#pricing">Pricing</a>
<a href="">Login/Signup</a>
<button onClick={handleLogout} className="logout-btn">
  Logout
</button>

  </div>

  <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
    ☰
  </div>
</nav>



      {/* HERO */}
      <section className="hero" data-aos="fade-up" >
  <div className="hero-left" data-aos="fade-right" >
    <h1>Build Your Career Assets in Minutes</h1>
    <p>
      Create stunning resumes and portfolio websites that
      impress recruiters and clients.
    </p>

    <div className="hero-buttons" data-aos="fade-up" >
      <Link to="/resume" className="primary-btn">
        Create Resume
      </Link>

      <Link to="/portfolio-builder" className="secondary-btn">
        Create Portfolio
      </Link>
    </div>
  </div>

  <div className="hero-right" data-aos="fade-left">
    <div className="hero-mockup"></div>
  </div>
</section>


      {/* RESUME TEMPLATES */}
      <section className="templates-section" data-aos="fade-up">
        <h2>Resume Templates</h2>

        <div className="card-container" data-aos="fade-up">
          <TemplateCard title="Professional" desc="Clean and corporate." />
          <TemplateCard title="Creative" desc="Colorful and bold." />
          <TemplateCard title="Academic" desc="Detailed and structured." />
        </div>
      </section>

      {/* PORTFOLIO TEMPLATES */}
      <section className="templates-section" data-aos="fade-up">
        <h2>Portfolio Templates</h2>

        <div className="card-container" data-aos="fade-up">
          <TemplateCard title="Modern Portfolio" desc="Minimal design." />
          <TemplateCard title="Developer Portfolio" desc="Tech focused." />
          <TemplateCard title="Creative Portfolio" desc="Showcase style." />
        </div>
      </section>

      {/* PRICING */}
        <section className="pricing-section" data-aos="fade-up">
        <h2>Build Your Future for the Price of a Chai ☕</h2>

        <div className="pricing-cards" data-aos="fade-up">

          <PricingCard
            price="₹9"
            title="Quick Start"
            features={[
              "1 Resume Template",
              "PDF Download"
            ]}
          />

          <PricingCard
            price="₹49"
            title="Career Pro"
            highlight
            features={[
              "Unlimited Resumes",
              "3 Portfolio Templates",
              "Shareable Link"
            ]}
          />

          <PricingCard
            price="₹99"
            title="Ultimate"
            features={[
              "All Templates",
              "Custom Domain",
              "Priority Support"
            ]}
          />

        </div>
      </section>

<section className="stats-section" data-aos="fade-up">
  <div className="stats-container">

    <div className="stat-box">
      <h2>10K+</h2>
      <p>Resumes Created</p>
    </div>

    <div className="stat-box">
      <h2>5K+</h2>
      <p>Portfolios Built</p>
    </div>

    <div className="stat-box">
      <h2>95%</h2>
      <p>User Satisfaction</p>
    </div>

  </div>
</section>


      {/* TESTIMONIALS */}
            <section className="testimonial-section" data-aos="fade-up">
  <h2>What Users Say</h2>

  <div className="testimonial-container">

    <div className="testimonial-card">
      <p>
        "This platform helped me create my portfolio in minutes!"
      </p>
      <h4>- Student Developer</h4>
    </div>

    <div className="testimonial-card" data-aos="fade-up">
      <p>
        "The resume templates helped me land my first job."
      </p>
      <h4>- Job Seeker</h4>
    </div>

    <div className="testimonial-card">
      <p>
        "Simple, clean and professional designs."
      </p>
      <h4>- Freelancer</h4>
    </div>

  </div>
</section>

<footer className="footer" data-aos="fade-up">
  <div className="footer-content">

    <div>
      <h3>ProFolio</h3>
      <p>Build your career assets in minutes.</p>
    </div>

    <div>
      <h4>Quick Links</h4>
      <p>Resume Builder</p>
      <p>Portfolio Builder</p>
      <p>Pricing</p>
    </div>

    <div>
      <h4>Contact</h4>
      <p>support@profolio.com</p>
      <p>India</p>
    </div>

  </div>

  <p className="copyright">
    © 2026 ProFolio. All rights reserved.
  </p>
</footer>


    </div>
  );
}

export default LandingPage;


/* ---------------- TEMPLATE CARD ---------------- */

function TemplateCard({ title, desc }) {

  const navigate = useNavigate();

  return (
    <div className="template-card">
      <div className="template-img"></div>
      <h3>{title}</h3>
      <p>{desc}</p>

      <button
        onClick={() =>
          navigate("/portfolio-builder", {
            state: { template: title }
          })
        }
      >
        Select
      </button>
    </div>
  );
}


/* ---------------- PRICING CARD ---------------- */

function PricingCard({ price, title, features, highlight }) {
  return (
    <div className={`pricing-card ${highlight ? "highlight" : ""}`}>
      <h2>{price}</h2>
      <h3>{title}</h3>

      <ul>
        {features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>

      <button>Get Started</button>
    </div>
  );
}

