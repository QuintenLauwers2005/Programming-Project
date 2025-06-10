import './Navbar.css'
import React, { useState, useRef } from "react";
import Logo from './Logo'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar(){

  const navigate = useNavigate();
  const homepagePath = "/";

    const [showNotifications, setShowNotifications] = useState(false);
    const buttonRef = useRef(null);
  const popoutRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

const handleClickOutside = (event) => {
  if (
    popoutRef.current &&
    !popoutRef.current.contains(event.target) &&
    !buttonRef.current.contains(event.target)
  ) {
    setShowNotifications(false);
  }
};


    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

   

    return(
         <div>
      <div className="top-bar">
        <Link to={homepagePath}>
          <Logo className="logo" />
        </Link>
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <div class = "navigatie-button-popout">
        <button className="notificatie-btn"  ref={buttonRef} onClick={toggleNotifications}>Meldingen</button>

          {showNotifications && (
          <div className="notif-popout" ref={popoutRef}>
          
            <ul>
              <li>New speeddate booked</li>
              <li>Reminder: Interview at 15:30</li>
              <li>Room change for Klyr</li>
            </ul>
          </div>
        )}
        </div>
        

        
      
      </div>

      <div className="nav-bar">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/Agenda')}>Speeddates</button>
        <button onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
        <button onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
      </div>
      </div>
    );
}

export default Navbar;