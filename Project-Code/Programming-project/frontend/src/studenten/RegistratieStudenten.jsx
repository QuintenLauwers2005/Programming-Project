import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import eyeIconPath from '../Assets/eye-empty.svg';
import eyeSlashIconPath from '../Assets/eye-off.svg';
import axios from 'axios';

const Requirement = ({ label, met }) => (
  <p style={{ margin: '2px 0', fontSize: '0.8em', color: met ? 'green' : 'red' }}>
    {met ? '✓' : '✗'} {label}
  </p>
);

export default function RegistratieStudentPage() {
  const [Voornaam, setVoornaam] = useState('');
  const [naamAchternaam, setNaamAchternaam] = useState('');
  const [mail, setMail] = useState('');
  const [opleiding, setOpleiding] = useState('');
  const [specialisatie, setSpecialisatie] = useState('');
  const [opleidingsjaar, setOpleidingsjaar] = useState('');
  const [adres, setAdres] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
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

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isWachtwoordGeldig = Object.values(wachtwoordValidatie).every(Boolean);
    if (!isWachtwoordGeldig) {
      setError("Je wachtwoord voldoet niet aan alle eisen.");
      return;
    }
    
    if (
      !Voornaam ||
      !naamAchternaam ||
      !mail ||
      !opleiding ||
      !specialisatie ||
      !opleidingsjaar ||
      !adres ||
      !wachtwoord
    ) {
      setError('Vul alle gegevens in');
      setSuccess(false);
      return;
    }

    if (!isValidEmail(mail)) {
      setError('Voer een geldig e-mailadres in.');
      setSuccess(false);
      return;
    }

    if (wachtwoord.length <= 5) {
      setError('Gebruik een langere wachtwoord');
      setSuccess(false);
      return;
    }

    setError('');

    try {
      // POST naar backend
      const response = await axios.post('http://localhost:5000/api/studentenToevoegen', {
        voornaam: Voornaam,
        naam: naamAchternaam,
        email: mail,
        wachtwoord: wachtwoord,
        opleiding: opleiding,
        specialisatie: specialisatie,
        opleidingsjaar: Number(opleidingsjaar), // Zorg dat dit een nummer is
        adres: adres
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Er is iets misgegaan');
      setSuccess(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer als Student</h2>
        <p>Vul onderstaande gegevens in om je te registreren.</p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <input
          type="text"
          placeholder="Voornaam"
          value={Voornaam}
          onChange={(e) => setVoornaam(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          required
        />

        <input
          type="text"
          placeholder="Achternaam"
          value={naamAchternaam}
          onChange={(e) => setNaamAchternaam(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />

        <input
          type="text"
          placeholder="Opleiding"
          value={opleiding}
          onChange={(e) => setOpleiding(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          required
        />
        <input
          type="text"
          placeholder="Specialisatie"
          value={specialisatie}
          onChange={(e) => setSpecialisatie(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          required
        />
        <input
          type="number"
          placeholder="Opleidingsjaar"
          value={opleidingsjaar}
          onChange={(e) => setOpleidingsjaar(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          required
        />
        <input
          type="text"
          placeholder="Adres"
          value={adres}
          onChange={(e) => setAdres(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          required
        />
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            marginBottom: '15px'
          }}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Wachtwoord"
              value={wachtwoord}
              onChange={handleWachtwoordChange}
              onFocus={() => setShowValidation(true)}
              required
              style={{
                width: '100%',
                padding: '10px 45px 10px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box' 
              }}
            /> 
            <button 
              type="button" 
              onClick={() => setPasswordVisible(!passwordVisible)} 
              style={{
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
                justifyContent: 'center'
              }}
            >
              <img 
                src={passwordVisible ? eyeSlashIconPath : eyeIconPath} 
                alt="Toggle wachtwoord" 
                style={{ height: '20px', width: '20px', opacity: 0.7 }} 
              />
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
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Registreer
        </button>
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '15px' }}>Registratie is compleet!</p>}
      </section>

      <section style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleLogin}
          style={{
            color: '#4a90e2',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Terug naar Login
        </button>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}