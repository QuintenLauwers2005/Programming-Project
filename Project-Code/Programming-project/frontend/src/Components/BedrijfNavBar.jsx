// src/Components/BedrijfNavbar.jsx
import './Navbar.css';
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import useRequireLogin from "./Functies";
import xIconPath from '../Assets/x.png';
import hMenuIconPath from '../Assets/menu.png';

const HamburgerIcon = () => (
  <img src={hMenuIconPath} alt="Menu openen" style={{ width: '24px', height: '24px' }} />
);
const CloseIcon = () => (
  <img src={xIconPath} alt="Menu sluiten" style={{ width: '24px', height: '24px' }} />
);

function Navbar() {
  useRequireLogin("bedrijf");
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [meldingen, setMeldingen] = useState([]);
  const logo_link = localStorage.getItem('Bedrijf_Logo');

  const buttonRef = useRef(null);
  const popoutRef = useRef(null);

  const handleMenuLinkClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const gebruikerId = localStorage.getItem("gebruiker_id");
    if (!gebruikerId) return;

    fetch(`http://localhost:5000/api/meldingen/${gebruikerId}`)
      .then(res => res.json())
      .then(data => setMeldingen(data))
      .catch(err => console.error("Meldingen ophalen mislukt:", err));
  }, []);

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
        <Link to="/BedrijfHomePage" className="logo-link"><Logo /></Link>
        <div className='career-launchName'>Career-launch</div>
        <div className="top-bar-right">
          <div className="desktop-only">
            <div ref={buttonRef} className="navigatie-button-popout">
              <button className="notificatie-btn" onClick={() => setShowNotifications(p => !p)}>
                🔔
                {meldingen.some(m => !m.gelezen) && <span className="notif-indicator"></span>}
              </button>
              {showNotifications && (
                <div className="notif-popout" ref={popoutRef}>
                  <ul>
                    {meldingen.length > 0 ? meldingen.map(m => <li key={m.melding_id}>{m.boodschap}</li>) : <li>Geen meldingen</li>}
                  </ul>
                </div>
              )}
            </div>
            <button className="profile-btn" onClick={() => navigate('/BedrijfBedrijfProfilePage')}>
              {logo_link ? (
                <img src={`http://localhost:5000${logo_link}`} alt="Bedrijfslogo" className="profile-btn-logo" />
              ) : (
                '👤'
              )}
            </button>
          </div>
          
          <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      <div className="nav-bar-desktop">
        <button onClick={() => navigate('/BedrijfHomePage')}>Home</button>
        <button onClick={() => navigate('/BedrijfAgenda')}>Speeddates</button>
        <button onClick={() => navigate('/BedrijfVacaturelijst')}>Vacatures</button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-menu-links">
            <button onClick={() => handleMenuLinkClick('/BedrijfHomePage')}>Home</button>
            <button onClick={() => handleMenuLinkClick('/BedrijfAgenda')}>Speeddates</button>
            <button onClick={() => handleMenuLinkClick('/BedrijfVacaturelijst')}>Vacatures</button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;