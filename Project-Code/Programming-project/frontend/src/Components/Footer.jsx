import React from "react";
import './Footer.css';
import { HashLink } from 'react-router-hash-link';


function Footer() {

  const baseHomePath = localStorage.getItem('rol')
    ? localStorage.getItem('rol') === 'student' ? '/HomePageStudent'
    : localStorage.getItem('rol') === 'bedrijf' ? '/BedrijfHomePage'
    : localStorage.getItem('rol') === 'admin' ? '/HomePageAdmin'
    : '/home'  // fallback
    : '/home';   // niet ingelogd

  const testInlog = localStorage.getItem('rol')
    ? localStorage.getItem('rol') === 'student' ? '/HomePageStudent#locatie'
    : localStorage.getItem('rol') === 'bedrijf' ? '/BedrijfHomePage#locatie'
    : localStorage.getItem('rol') === 'admin' ? '/HomePageAdmin#top'
    : '/home'  // fallback
    : '/home';   // niet ingelogd

    const waarmoPath = localStorage.getItem('rol')
    ? localStorage.getItem('rol') === 'student' ? '/HomePageStudent#waarom'
    : localStorage.getItem('rol') === 'bedrijf' ? '/BedrijfHomePage#waarom'
    : localStorage.getItem('rol') === 'admin' ? '/HomePageAdmin#top'
    : '/home'  // fallback
    : '/home';   // niet ingelogd

    const testimonialPath = localStorage.getItem('rol')
    ? localStorage.getItem('rol') === 'student' ? '/HomePageStudent#testimonial'
    : localStorage.getItem('rol') === 'bedrijf' ? '/BedrijfHomePage#testimonial'
    : localStorage.getItem('rol') === 'admin' ? '/HomePageAdmin#top'
    : '/home'  // fallback
    : '/home';   // niet ingelogd

    const faqPath = localStorage.getItem('rol')
    ? localStorage.getItem('rol') === 'student' ? '/HomePageStudent#faq'
    : localStorage.getItem('rol') === 'bedrijf' ? '/BedrijfHomePage#faq'
    : localStorage.getItem('rol') === 'admin' ? '/HomePageAdmin#top'
    : '/home'  // fallback
    : '/home';   // niet ingelogd



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
            <li><HashLink smooth to={`${baseHomePath}#top`}>Home</HashLink></li>
            <li><HashLink smooth to={`${testInlog}`}>Locatie</HashLink></li>
            <li><HashLink smooth to={`${waarmoPath}`}>Waarom Deelnemen</HashLink></li>
            <li><HashLink smooth to={`${testimonialPath}`}>Ervaringen van studenten</HashLink></li>
            <li><HashLink smooth to={`${faqPath}`}>FAQ</HashLink></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h4>Volg ons</h4>
          <div className="social-icons">
  <ul>
    <li>
      <a href="https://www.linkedin.com/school/ehb/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </li>
    <li>
      <a href="https://www.instagram.com/ehogeschool/" target="_blank" rel="noopener noreferrer">Instagram</a>
    </li>
  </ul>
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
