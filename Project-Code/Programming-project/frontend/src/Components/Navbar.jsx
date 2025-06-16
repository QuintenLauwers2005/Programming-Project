// src/Components/Navbar.jsx
import './Navbar.css';
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import xIconPath from '../Assets/x.png';
import hMenuIconPath from '../Assets/menu.png';

const HamburgerIcon = () => (
  <img src={hMenuIconPath} alt="Menu openen" style={{ width: '24px', height: '24px' }} />
);

const CloseIcon = () => (
  <img src={xIconPath} alt="Menu sluiten" style={{ width: '24px', height: '24px' }} />
);

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const buttonRef = useRef(null);
  const popoutRef = useRef(null);

  const handleMenuLinkClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

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
        <Link to="/" className="logo-link"><Logo /></Link>
          <div className='career-launchName'>Career-launch</div>
        <div className="top-bar-right">
          <div ref={buttonRef} className="navigatie-button-popout">
            <button className="notificatie-btn" onClick={() => setShowNotifications(p => !p)}>
              🔔
            </button>
            {showNotifications && (
              <div className="notif-popout" ref={popoutRef}>
                <ul><li>U bent niet ingelogd</li></ul>
              </div>
            )}
          </div>
          
          <button className="login-btn" onClick={() => navigate('/login')}>
            👤<span className="btn-text">&nbsp;Login</span>
          </button>

          <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      <div className="nav-bar-desktop">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/Agenda')}>Speeddates</button>
        <button onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
        <button onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-menu-links">
            <button onClick={() => handleMenuLinkClick('/')}>Home</button>
            <button onClick={() => handleMenuLinkClick('/Agenda')}>Speeddates</button>
            <button onClick={() => handleMenuLinkClick('/BedrijvenLijst')}>Bedrijven</button>
            <button onClick={() => handleMenuLinkClick('/Vacaturelijst')}>Vacatures</button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;