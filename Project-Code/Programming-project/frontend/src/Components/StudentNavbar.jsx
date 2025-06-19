// src/Components/StudentNavbar.jsx
import './Navbar.css'; // We hergebruiken dezelfde CSS!
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import useRequireLogin from "./Functies";
import xIconPath from '../Assets/x.png';
import hMenuIconPath from '../Assets/menu.png';

// De icoon-componenten
const HamburgerIcon = () => (
  <img src={hMenuIconPath} alt="Menu openen" style={{ width: '24px', height: '24px' }} />
);
const CloseIcon = () => (
  <img src={xIconPath} alt="Menu sluiten" style={{ width: '24px', height: '24px' }} />
);

function Navbar() {
  useRequireLogin("student"); // Beveilig de component voor studenten
  const navigate = useNavigate();
  
  // State voor UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // State voor data
  const [meldingen, setMeldingen] = useState([]);
  const studentNaam = localStorage.getItem('naam') || 'Mijn Profiel';

  const buttonRef = useRef(null);
  const popoutRef = useRef(null);

  const handleMenuLinkClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleDeleteMelding = async (meldingId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/meldingen/${meldingId}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error('Verwijderen mislukt');
    }

    setMeldingen(prev => prev.filter(m => m.melding_id !== meldingId));
  } catch (err) {
    console.error('Fout bij verwijderen melding:', err);
  }
};

  // Effect voor het ophalen van meldingen
  useEffect(() => {
     const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    console.log('Geen geldige sessie, graag opnieuw inloggen.');
    return;
  }
    const gebruikerId = localStorage.getItem("gebruiker_id");
    if (!gebruikerId) return;

    fetch(`http://localhost:5000/api/meldingen/${gebruikerId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
      })
      .then(res => res.json())
      .then(data => setMeldingen(data))
      .catch(err => console.error("Meldingen ophalen mislukt:", err));
  }, []);

  // Effect voor het sluiten van de pop-up
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);


  return (
    <div className='navbar-container'>
      <div className="top-bar">
        <Link to="/HomePageStudent" className="logo-link"><Logo /></Link>
        <div className='career-launchName'>Career launch</div>
        <div className="top-bar-right">
          <div className="desktop-only">
            <div ref={buttonRef} className="navigatie-button-popout">
              <button
  className="notificatie-btn"
  onClick={async () => {
    const gebruikerId = localStorage.getItem("gebruiker_id");
    const willOpen = !showNotifications;

    setShowNotifications(willOpen);

    if (willOpen && meldingen.some(m => m.gelezen === 0)) {
      try {
        await fetch(`http://localhost:5000/api/meldingen/lezen/${gebruikerId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        });

        // Re-fetch meldingen to update state and remove red dot
        const res = await fetch(`http://localhost:5000/api/meldingen/${gebruikerId}`);
        const updated = await res.json();
        setMeldingen(updated);
      } catch (err) {
        console.error("Fout bij bijwerken meldingen:", err);
      }
    }
  }}
>
  🔔
  {meldingen.some(m => m.gelezen === 0) && (
    <span className="notif-indicator"></span>
  )}
</button>
              {showNotifications && (
                <div className="notif-popout" ref={popoutRef}>
                  <ul>
{meldingen.length > 0 ? (
  meldingen.map((m) => (
    <li key={m.melding_id} className="notif-item">
      <span className="notif-message">{m.boodschap}</span>
      <button
  className="remove-btn"
  onClick={() => handleDeleteMelding(m.melding_id)}
>
  ❌
</button>
    </li>
  ))
) : (
  <li>Geen meldingen</li>
)}                  </ul>
                </div>
              )}
            </div>
            {/* Knop naar profiel met naam van de student */}
            <button className="login-btn" onClick={() => navigate('/StudentProfilePage')}>
              👤<span className="btn-text">&nbsp;{studentNaam}</span>
            </button>
            {/* Logout knop toegevoegd */}
          </div>
          
          <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      <div className="nav-bar-desktop">
        <button onClick={() => navigate('/HomePageStudent')}>Home</button>
        <button onClick={() => navigate('/AgendaStudenten')}>Speeddates</button>
        <button onClick={() => navigate('/StudentBedrijvenLijst')}>Bedrijven</button>
        <button onClick={() => navigate('/StudentVacatureLijst')}>Vacatures</button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-menu-links">
            <button onClick={() => handleMenuLinkClick('/HomePageStudent')}>Home</button>
            <button onClick={() => handleMenuLinkClick('/AgendaStudenten')}>Speeddates</button>
            <button onClick={() => handleMenuLinkClick('/StudentBedrijvenLijst')}>Bedrijven</button>
            <button onClick={() => handleMenuLinkClick('/StudentVacatureLijst')}>Vacatures</button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;