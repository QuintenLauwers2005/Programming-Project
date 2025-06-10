import React from 'react';
import Navbar from './Components/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      {/* Navigatie */}
      <header>
        <Navbar />
      </header>

      {/* Hero / Intro */}
      <section className="hero-section">
        <h1>Hoe goed schat jij jouw kansen in?</h1>
        <p>
          Wil je een indrukwekkend bedrijf dat perfect bij jouw interesses past?
          Of ben je nieuwsgierig naar andere sectoren?
          De Career Launch is jouw kans om te ontdekken wat bij jou past en je netwerk uit te breiden!
        </p>
      </section>

      {/* Statistieken */}
      <section className="stats-section">
        <div className="stat-box">
          <strong>30</strong><br />Bedrijven
        </div>
        <div className="stat-box">
          <strong>150</strong><br />Vacatures
        </div>
        <div className="stat-box">
          <strong>200</strong><br />Studenten
        </div>
      </section>

      {/* Praktisch */}
      <section className="practical-section">
        <h1>Onze Locatie</h1>
        <div className="map">
          <p><strong>05/06/2025</strong></p>
          <p>Quai de l’Industrie 170, 1070 Anderlecht</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.402036354639!2d4.322808000000001!3d50.842239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c40f19faf0f9%3A0x4ef5b683135ecb1e!2sErasmushogeschool%20Brussel!5e0!3m2!1snl!2sbe!4v1749561581428!5m2!1snl!2sbe"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Waarom deelnemen */}
      <section className="reason-section">
        <h3>Waarom je dit niet mag missen?</h3>
        <p>
          De Career Launch biedt een unieke kans om direct in contact te komen met bedrijven die bij jou passen.
        </p>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section">
        <h4>Testimonial</h4>
        <blockquote>
          "De Career Launch was een geweldige ervaring! Ik ontmoette mijn huidige werkgever tijdens het event,
          en kreeg direct waardevolle tips."
        </blockquote>
      </section>

      {/* Veelgestelde vragen */}
      <section className="faq-section">
        <h4>Veelgestelde vragen</h4>
        <p><strong>Hoe meld ik me aan?</strong><br />Klik op 'Registreren' en volg de stappen.</p>
        <p><strong>Waar?</strong><br />EhB campus Nijverheidskaai 170 Anderlecht 1070</p>
        <p><strong>Info?</strong><br />Stuur een e-mail of neem contact op met je studentenbegeleider.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}

export default HomePage;