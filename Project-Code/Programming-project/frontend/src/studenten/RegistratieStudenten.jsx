import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/StudentNavbar';

export default function RegistratieStudentPage() {
  const [naamAchternaam, setNaamAchternaam] = useState('');
  const [mail, setMail] = useState('');
  const [opleiding, setOpleiding] = useState('');
  const [specialisatie, setSpecialisatie] = useState('');
  const [opleidingsjaar, setOpleidingsjaar] = useState('');
  const [adres, setAdres] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = () => {
    if (
      !naamAchternaam ||
      !mail ||
      !opleiding ||
      !specialisatie ||
      !opleidingsjaar ||
      !adres ||
      !wachtwoord
    ) {
      setError('Vul alle gegevens in');
      return;
    }

    if (wachtwoord.length > 9) {
      setSuccess(true);
      setError('');
    } else {
      setSuccess(false);
      setError('Gebruik een langere wachtwoord');
      return;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>
        <Navbar />
      </header>


      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer als Student</h2>
        <p>
          Vul onderstaande gegevens in om je te registreren.
        </p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form>
          <input
            type="text"
            placeholder="Naam + Achternaam"
            value={naamAchternaam}
            onChange={(e) => setNaamAchternaam(e.target.value)}
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
            placeholder="Opleiding"
            value={opleiding}
            onChange={(e) => setOpleiding(e.target.value)}
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
            placeholder="Specialisatie"
            value={specialisatie}
            onChange={(e) => setSpecialisatie(e.target.value)}
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
            placeholder="Opleidingsjaar"
            value={opleidingsjaar}
            onChange={(e) => setOpleidingsjaar(e.target.value)}
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
            placeholder="Adres"
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
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
            onChange={(e) => setWachtwoord(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
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