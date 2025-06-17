import React from "react";
import './Footer.css';
import { HashLink } from 'react-router-hash-link';

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Contactgegevens */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>mail: info@careerlaunch.ehb.be</p>
          <p>tel: 02 523 37 37</p>
        </div>

        {/* Navigatie */}
        <div className="footer-section">
          <h4>Snel naar</h4>
          <ul>
            <li><HashLink smooth to="/#top">Home</HashLink></li>
            <li><HashLink smooth to="/#locatie">Locatie</HashLink></li>
            <li><HashLink smooth to="/#waarom">Waarom Deelnemen</HashLink></li>
            <li><HashLink smooth to="/#testimonial">Ervaringen van studenten</HashLink></li>
            <li><HashLink smooth to="/#faq">FAQ</HashLink></li>
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
        <p>&copy; {new Date().getFullYear()} Career Launch – Erasmushogeschool Brussel. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}

export default Footer;
