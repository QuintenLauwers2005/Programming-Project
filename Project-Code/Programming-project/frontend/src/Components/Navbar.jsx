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
        <div className = "navigatie-button-popout">
        <button className="notificatie-btn" ref={buttonRef} onClick={toggleNotifications} style={{ position: 'relative' }}>
  🔔</button>

          {showNotifications && (
          <div className="notif-popout" ref={popoutRef}>
          
            <ul>
              <li>U bent niet ingelogd</li>
              
            </ul>
          </div>
        )}
        </div>
        

        
      
      </div>

      <div className="nav-bar">
        <button className='NavBar-kleur' onClick={() => navigate('/')}>Home</button>
        <button className='NavBar-kleur' onClick={() => navigate('/Agenda')}>Speeddates</button>
        <button className='NavBar-kleur' onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
        <button className='NavBar-kleur' onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
      </div>
      </div>
    );
}

export default Navbar;