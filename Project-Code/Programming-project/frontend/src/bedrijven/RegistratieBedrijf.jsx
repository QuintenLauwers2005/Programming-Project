import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';

export default function RegistratieBedrijfPage() {
  const [bedrijfsnaam, setBedrijfsnaam] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [mail, setMail] = useState('');
  const [locatie, setLocatie] = useState('');
  const [vertegenwoordiger, setVertegenwoordiger] = useState('');
  const [telefoonnummer, setTelefoonnummer] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // voorkom herladen

    // Validatie
    if (!bedrijfsnaam || !locatie || !wachtwoord || !mail || !vertegenwoordiger || !telefoonnummer) {
      setError('Vul alle gegevens in');
      setSuccess(false);
      return;
    }

    if (wachtwoord.length <= 9) {
      setError('Gebruik een langere wachtwoord');
      setSuccess(false);
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/bedrijvenToevoegen', {
        naam: bedrijfsnaam,
        locatie: locatie,
        vertegenwoordiger: vertegenwoordiger,
        telefoon: telefoonnummer,
        email: mail,
        wachtwoord: wachtwoord
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        // navigate('/login'); // eventueel inschakelen
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Er is iets misgegaan bij het registreren');
      setSuccess(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer als Bedrijf</h2>
        <p>Vul onderstaande gegevens in om je te registreren.</p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Bedrijfsnaam"
            value={bedrijfsnaam}
            onChange={(e) => setBedrijfsnaam(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Telefoonnummer"
            value={telefoonnummer}
            onChange={(e) => setTelefoonnummer(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Locatie"
            value={locatie}
            onChange={(e) => setLocatie(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Vertegenwoordiger"
            value={vertegenwoordiger}
            onChange={(e) => setVertegenwoordiger(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
            style={inputStyle}
            required
          />
          <button
            type="submit"
            style={buttonStyle}
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

// 🎨 Styling hergebruiken
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4a90e2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
