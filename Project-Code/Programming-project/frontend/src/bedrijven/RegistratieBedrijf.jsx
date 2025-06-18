import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import eyeIcon from '../Assets/eye-empty.svg';
import eyeSlashIcon from '../Assets/eye-off.svg';
import axios from 'axios';

const Requirement = ({ label, met }) => (
  <p style={{ margin: '2px 0', fontSize: '0.8em', color: met ? 'green' : 'red' }}>
    {met ? '✓' : '✗'} {label}
  </p>
);

export default function RegistratieBedrijfPage() {
  const [naam, setNaam] = useState('');
  const [adres, setAdres] = useState('');
  const [vertegenwoordiger, setVertegenwoordiger] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [wachtwoordValidatie, setWachtwoordValidatie] = useState({
    lengte: false,
    hoofdletter: false,
    kleineletter: false,
    cijfer: false,
    speciaalteken: false,
  });
  const [showValidation, setShowValidation] = useState(false);

  const navigate = useNavigate();

  const valideerWachtwoord = (pw) => {
    setWachtwoordValidatie({
      lengte: pw.length >= 5,
      hoofdletter: /[A-Z]/.test(pw),
      kleineletter: /[a-z]/.test(pw),
      cijfer: /[0-9]/.test(pw),
      speciaalteken: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    });
  };

  const handleWachtwoordChange = (e) => {
    const nieuwWachtwoord = e.target.value;
    setWachtwoord(nieuwWachtwoord);
    valideerWachtwoord(nieuwWachtwoord);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isWachtwoordGeldig = Object.values(wachtwoordValidatie).every(Boolean);

    if (!naam || !adres || !vertegenwoordiger || !telefoon || !email || !wachtwoord || !bevestigWachtwoord) {
      setError('Vul alle velden in.');
      return;
    }

    if (!isWachtwoordGeldig) {
      setError('Je wachtwoord voldoet niet aan alle eisen.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Voer een geldig e-mailadres in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bedrijvenToevoegen', {
        naam,
        adres,
        vertegenwoordiger,
        telefoon,
        email,
        wachtwoord,
        bevestigWachtwoord,
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Er is iets misgegaan.');
      setSuccess(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Navbar />
      <section style={{ textAlign: 'center', margin: '30px 0' }}>
        <h2>Registreer als Bedrijf</h2>
        <p>Vul onderstaande gegevens in om uw bedrijf te registreren.</p>
      </section>
      <section style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input type="text" placeholder="Bedrijfsnaam *" value={naam} onChange={(e) => setNaam(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Adres *" value={adres} onChange={(e) => setAdres(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Vertegenwoordiger *" value={vertegenwoordiger} onChange={(e) => setVertegenwoordiger(e.target.value)} required style={inputStyle} />
        <input type="tel" placeholder="Telefoonnummer *" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

        <div style={{ position: 'relative', marginBottom: '15px' }}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Wachtwoord *"
            value={wachtwoord}
            onChange={handleWachtwoordChange}
            onFocus={() => setShowValidation(true)}
            required
            style={{ ...inputStyle, paddingRight: '45px' }}
          />
          <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} style={eyeButtonStyle}>
            <img src={passwordVisible ? eyeSlashIcon : eyeIcon} alt="Toggle wachtwoord" style={{ height: '20px', width: '20px', opacity: 0.7 }} />
          </button>
        </div>

        {showValidation && (
          <div style={{ marginBottom: '15px' }}>
            <Requirement label="Minstens 5 tekens" met={wachtwoordValidatie.lengte} />
            <Requirement label="Minstens één hoofdletter" met={wachtwoordValidatie.hoofdletter} />
            <Requirement label="Minstens één kleine letter" met={wachtwoordValidatie.kleineletter} />
            <Requirement label="Minstens één cijfer" met={wachtwoordValidatie.cijfer} />
            <Requirement label="Minstens één speciaal teken" met={wachtwoordValidatie.speciaalteken} />
          </div>
        )}

        <input
          type="password"
          placeholder="Bevestig Wachtwoord *"
          value={bevestigWachtwoord}
          onChange={(e) => setBevestigWachtwoord(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="button" onClick={handleSubmit} style={submitStyle}>Registreer</button>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '15px' }}>Registratie succesvol!</p>}
      </section>

      <section style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => navigate('/login')} style={loginButtonStyle}>Terug naar Login</button>
      </section>

      <Footer />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const submitStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4a90e2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '0px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '45px',
  height: '100%',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const loginButtonStyle = {
  color: '#4a90e2',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
};
