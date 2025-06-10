import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistratiePage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>
        <div className="top-bar">
          <button
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="notificatie-btn"
            onClick={() => alert('Meldingen geklikt!')}
          >
            Meldingen
          </button>
          <img src="https://via.placeholder.com/40"  alt="Logo" className="logo" />
        </div>

        <div className="nav-bar">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/Agenda')}>Speeddates</button>
          <button onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
          <button onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
        </div>
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer</h2>
        <p>
          Vul onderstaande gegevens in om je te registreren.
        </p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form>
          <input
            type="email"
            placeholder="Email"
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
       
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}