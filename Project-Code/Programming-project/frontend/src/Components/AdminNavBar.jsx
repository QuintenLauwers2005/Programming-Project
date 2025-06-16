import './Navbar.css'
import React, { useState, useEffect, useRef } from "react";
import Logo from './Logo'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useRequireLogin from "./Functies";

function Navbar(){

  const navigate = useNavigate();
  const homepagePath = "/HomePageAdmin";

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

const handleLogout = () => {
    localStorage.clear();         // Verwijder gebruiker_id en andere data
    navigate('/login');           // Navigeer naar loginpagina
  };

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

useRequireLogin("admin");
  return(

    
    <div>
      <div className="top-bar">
        <Link to={homepagePath}>
          <Logo className="logo" />
        </Link>

        {/* Rechter sectie met beide buttons */}
        <div className="right-section" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginRight: '30px' }}>
          <div className="navigatie-button-popout" style={{ position: 'relative' }}>
            <button className="notificatie-btn" ref={buttonRef} onClick={toggleNotifications} style={{ position: 'relative' }}>
    🔔{meldingen.some(m => !m.gelezen) && (
                <span
                  style={{position: 'relative',top: 0,right: 0,width: '10px',
                  height: '10px',backgroundColor: 'red', borderRadius: '50%',border: '2px solid white',}}></span>)}
            </button>

                
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

          <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b02a37'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Uitloggen
            </button>
        </div>
      </div>

      <div className="nav-bar">
        <button className='NavBar-kleur' onClick={() => navigate('/HomePageAdmin')}>Home</button>
        <button className='NavBar-kleur' onClick={() => navigate('/AdminAgenda')}>Speeddates</button>
        <button className='NavBar-kleur' onClick={() => navigate('/AdminBedrijvenLijst')}>Bedrijven</button>
        <button className='NavBar-kleur' onClick={() => navigate('/AdminStudentenLijst')}>Studenten</button>
        <button className='NavBar-kleur' onClick={() => navigate('/AdminVacatureLijst')}>Vacatures</button>
      </div>
    </div>
  );
}

export default Navbar;