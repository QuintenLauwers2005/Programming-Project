// src/bedrijven/RegistratieBedrijf.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import eyeIconPath from '../Assets/eye-empty.svg';
import eyeSlashIconPath from '../Assets/eye-off.svg';
import axios from 'axios';

const Requirement = ({ label, met }) => (
  <p style={{ margin: '2px 0', fontSize: '0.8em', color: met ? 'green' : 'red' }}>
    {met ? '✓' : '✗'} {label}
  </p>
);

const inputStyle = {
  width: '100%', padding: '10px', marginBottom: '15px',
  border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'
};

const eyeButtonStyle = {
  position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)',
  width: '45px', height: '100%', background: 'transparent', border: 'none',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

export default function RegistratieBedrijfPage() {
  const navigate = useNavigate();

  // --- State en Functies ---
  const [bedrijfsnaam, setBedrijfsnaam] = useState('');
  const [locatie, setLocatie] = useState('');
  const [vertegenwoordiger, setVertegenwoordiger] = useState('');
  const [telefoonnummer, setTelefoonnummer] = useState('');
  const [mail, setMail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [wachtwoordValidatie, setWachtwoordValidatie] = useState({
    lengte: false, hoofdletter: false, kleineletter: false, cijfer: false, speciaalteken: false,
  });

  const valideerWachtwoord = (pw) => { /* ... je validatie logica ... */ };
  const handleWachtwoordChange = (e) => { /* ... je validatie logica ... */ };
  const handleSubmit = async (e) => { /* ... je submit logica ... */ };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header><Navbar /></header>
      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer als Bedrijf</h2>
        <p>Velden met een * zijn verplicht.</p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          {/* ... (je input velden) ... */}
          <input type="text" placeholder="Bedrijfsnaam *" value={bedrijfsnaam} onChange={(e) => setBedrijfsnaam(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Locatie *" value={locatie} onChange={(e) => setLocatie(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Vertegenwoordiger *" value={vertegenwoordiger} onChange={(e) => setVertegenwoordiger(e.target.value)} required style={inputStyle} />
          <input type="tel" placeholder="Telefoonnummer *" value={telefoonnummer} onChange={(e) => setTelefoonnummer(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="E-mailadres *" value={mail} onChange={(e) => setMail(e.target.value)} required style={inputStyle} />

          {/* Wachtwoordveld */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input type={passwordVisible ? 'text' : 'password'} placeholder="Wachtwoord *" value={wachtwoord} onChange={handleWachtwoordChange} onFocus={() => setShowValidation(true)} required style={{ ...inputStyle, paddingRight: '45px', marginBottom: '0' }} />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} style={eyeButtonStyle}>
              <img src={passwordVisible ? eyeSlashIconPath : eyeIconPath} alt="Toggle wachtwoord" style={{ height: '20px' }} />
            </button>
          </div>
          {showValidation && ( <div style={{ marginBottom: '15px', textAlign: 'left' }}> {/* ... je validatie-eisen ... */} </div> )}

          {/* Bevestig Wachtwoordveld */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Bevestig Wachtwoord *" value={bevestigWachtwoord} onChange={(e) => setBevestigWachtwoord(e.target.value)} required style={{ ...inputStyle, paddingRight: '45px', marginBottom: '0' }} />
            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={eyeButtonStyle}>
              <img src={confirmPasswordVisible ? eyeSlashIconPath : eyeIconPath} alt="Toggle wachtwoord bevestiging" style={{ height: '20px' }} />
            </button>
          </div>

          {/* 👇 KLEUR VAN DE KNOP AANGEPAST 👇 */}
          <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '1em', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Registreer
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
        
        {/* 👇 TERUG NAAR LOGIN KNOP IS HIER TERUGGEPLAATST 👇 */}
        <section style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/login')} 
            style={{ color: '#4a90e2', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Terug naar Login
          </button>
        </section>

      </section>
      
      <Footer />
    </div>
  );
}