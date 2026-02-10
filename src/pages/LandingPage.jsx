import { Link } from "react-router-dom";
import { useState } from "react";
import "./LandingPage.css";
import { FileText, LayoutDashboard, Rocket } from "lucide-react";

function LandingPage() {
  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">ProFolio</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/portfolio">Portfolio Generation</a>
          <a href="/resume">Resume Generation</a>
          <a href="/login" className="login-btn">Login / Signup</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to ProFolio</h1>
        <p>Start building your career assets today.</p>
      </section>

      {/* RESUME TEMPLATES */}
      <section className="templates-section">
        <h2>Resume Templates</h2>

        <div className="card-container">
          <TemplateCard title="Professional" desc="Clean and corporate." />
          <TemplateCard title="Creative" desc="Colorful and bold." />
          <TemplateCard title="Academic" desc="Detailed and structured." />
        </div>
      </section>

      {/* PORTFOLIO TEMPLATES */}
      <section className="templates-section">
        <h2>Portfolio Templates</h2>

        <div className="card-container">
          <TemplateCard title="Modern Portfolio" desc="Minimal design." />
          <TemplateCard title="Developer Portfolio" desc="Tech focused." />
          <TemplateCard title="Creative Portfolio" desc="Showcase style." />
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pricing-section">
        <h2>Build Your Future for the Price of a Chai ☕</h2>

        <div className="pricing-cards">

          <PricingCard
            price="₹9"
            title="Quick Start"
            features={[
              "1 Basic Resume Template",
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
              "Shareable Profile Link"
            ]}
          />

          <PricingCard
            price="₹99"
            title="Ultimate"
            features={[
              "Everything in Pro",
              "All Premium Templates",
              "Custom Domain"
            ]}
          />

        </div>
      </section>

    </div>
  );
}

export default LandingPage;


/* ---------- TEMPLATE CARD ---------- */

function TemplateCard({ title, desc }) {
  return (
    <div className="template-card">
      <div className="template-img" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>Select</button>
    </div>
  );
}

/* ---------- PRICING CARD ---------- */

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
