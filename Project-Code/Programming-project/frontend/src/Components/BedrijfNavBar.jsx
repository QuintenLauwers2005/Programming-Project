import './Navbar.css'
import React, { useState, useEffect, useRef } from "react";
import Logo from './Logo'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useRequireLogin from "./Functies";

function Navbar(){

  const navigate = useNavigate();
  const homepagePath = "/BedrijfHomePage";

  const [showNotifications, setShowNotifications] = useState(false);
  const [meldingen, setMeldingen] = useState([]);
  const buttonRef = useRef(null);
  const popoutRef = useRef(null);

  // ⚠️ Pas deze aan op basis van je auth/opslagmethode
  const gebruikerId = localStorage.getItem("gebruiker_id") || 2; // test: bedrijf 2 (SAP)

const toggleNotifications = () => {
  setShowNotifications((prev) => {
    const next = !prev;

    if (next) {
      setMeldingen(prevMeldingen =>   
        prevMeldingen.map(melding => ({ ...melding, gelezen: true }))
      );
    }

    return next;
  });
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

  useEffect(() => {
  fetch(`http://localhost:5000/api/meldingen/${gebruikerId}`)
    .then(res => res.json())
    .then(data => setMeldingen(data))
    .catch(err => console.error("Meldingen ophalen mislukt:", err));
}, [gebruikerId]);

useEffect(() => {
  if (showNotifications) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showNotifications]);


  const verwijderMelding = (id) => {
  fetch(`http://localhost:5000/api/meldingen/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) throw new Error('Verwijderen mislukt');
      // melding verwijderen uit de lokale state
      setMeldingen(prev => prev.filter(m => m.melding_id !== id));
    })
    .catch(err => console.error("Fout bij verwijderen:", err));
};

useRequireLogin("bedrijf");
  return(

    
    <div>
      <div className="top-bar">
        <Link to={homepagePath}>
          <Logo className="logo" />
        </Link>
        <button className="login-btn" onClick={() => navigate('/BedrijBedrijfProfilePage')}>{localStorage.getItem('Bedrijf_Logo')}</button>
        <div className="navigatie-button-popout">
          <button className="notificatie-btn" ref={buttonRef} onClick={toggleNotifications} style={{ position: 'relative' }}>
  🔔{meldingen.some(m => !m.gelezen) && (
              <span
                style={{position: 'absolute',top: 0,right: 0,width: '10px',
                height: '10px',backgroundColor: 'red', borderRadius: '50%',border: '2px solid white',}}></span>)}</button>

          {showNotifications && (
            <div className="notif-popout" ref={popoutRef}>
              <ul>
                {meldingen.length === 0 && <li>(Geen meldingen)</li>}
                {meldingen.map(melding => (
              <li key={melding.melding_id} className="melding-item">
                <span>{melding.gelezen ? "✅" : "🔔"} {melding.boodschap}</span>
                <br />
                <small>{new Date(melding.datum).toLocaleString()}</small>
                <button className="melding-delete" onClick={() => verwijderMelding(melding.melding_id)}>❌</button>
              </li>
            ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="nav-bar">
        <button className='NavBar-kleur' onClick={() => navigate('/BedrijfHomePage')}>Home</button>
        <button className='NavBar-kleur' onClick={() => navigate('/BedrijfAgenda')}>Speeddates</button>
        <button className='NavBar-kleur' onClick={() => navigate('/StudentBedrijvenLijst')}>Bedrijven</button>
        <button className='NavBar-kleur' onClick={() => navigate('/StudentVacatureLijst')}>Vacatures</button>
      </div>
    </div>
  );
}

export default Navbar;
