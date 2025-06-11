import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Contactgegevens */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>info@careerlaunch.be</p>
          <p>EhB - Erasmushogeschool Brussel</p>
        </div>

        {/* Navigatie */}
        <div className="footer-section">
          <h4>Snel naar</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#location">Locatie</a></li>
            <li><a href="#why">Waarom Deelnemen</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h4>Volg ons</h4>
          <div className="social-icons">
            <a href="https://www.linkedin.com/school/ehb/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/ehogeschool/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Career Launch – EhB. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}

export default Footer;