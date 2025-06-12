import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Requirement = ({ label, met }) => (
  <p style={{ margin: '2px 0', fontSize: '0.8em', color: met ? 'green' : 'red' }}>
    {met ? '✓' : '✗'} {label}
  </p>
);

export default function RegistratieBedrijfPage() {
  const [bedrijfsnaam, setBedrijfsnaam] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [mail, setMail] = useState('');
  const [locatie, setLocatie] = useState('');
  const [vertegenwoordiger, setVertegenwoordiger] = useState('');
  const [telefoonnummer, setTelefoonnummer] = useState('');

  const [error, setError] = useState('');
  const [success] = useState(false);

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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isWachtwoordGeldig = Object.values(wachtwoordValidatie).every(Boolean);

    if (!bedrijfsnaam || !locatie || !wachtwoord || !mail || !vertegenwoordiger || !telefoonnummer) {
      setError('Vul alle verplichte velden in');
      return;
    }
    if (!isWachtwoordGeldig) {
      setError("Je wachtwoord voldoet niet aan alle eisen.");
      return;
    }
    setError('');
    
    alert('Bedrijfsregistratie verzonden!');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer als Bedrijf</h2>
        <p>
          Vul onderstaande gegevens in om je te registreren.
        </p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form>
          <input
            type="text"
            placeholder="Bedrijfsnaam"
            value={bedrijfsnaam}
            onChange={(e) => setBedrijfsnaam(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
          <input
            type="number"
            placeholder="Telefoonnummer"
            value={telefoonnummer}
            onChange={(e) => setTelefoonnummer(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
          <input
            type="text"
            placeholder="Locatie"
            value={locatie}
            onChange={(e) => setLocatie(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
          <input
            type="text"
            placeholder="Vertegenwoordiger"
            value={vertegenwoordiger}
            onChange={(e) => setVertegenwoordiger(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={wachtwoord}
            onChange={handleWachtwoordChange}
            onFocus={() => setShowValidation(true)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {showValidation && (
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <Requirement label="Minstens 5 tekens" met={wachtwoordValidatie.lengte} />
              <Requirement label="Minstens één hoofdletter" met={wachtwoordValidatie.hoofdletter} />
              <Requirement label="Minstens één kleine letter" met={wachtwoordValidatie.kleineletter} />
              <Requirement label="Minstens één cijfer" met={wachtwoordValidatie.cijfer} />
              <Requirement label="Minstens één speciaal teken" met={wachtwoordValidatie.speciaalteken} />
            </div>
          )}
          <button
            type="submit"
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
        </form>
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