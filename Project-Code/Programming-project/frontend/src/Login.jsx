import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>

      
          <Navbar/>
        
      
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Login</h2>
        <p>
          Log in om toegang te krijgen tot je profiel en vacatures.
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
            Inloggen
          </button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Nog geen account?{' '}
          <button
            onClick={() => navigate('/registratie')}
            style={{
              color: '#4a90e2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Registreer hier
          </button>
        </p>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}