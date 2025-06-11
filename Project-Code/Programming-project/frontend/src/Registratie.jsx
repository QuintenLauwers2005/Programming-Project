import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';

export default function RegistratiePage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Registreer</h2>
        <p>
          Kies hieronder of je je wilt registreren als student of bedrijf.
        </p>
      </section>

      {/* Knoppen voor registratie als student of bedrijf */}
      <section style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/register/student')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Registreer als Student
          </button>
          <button
  onClick={() => navigate('/register/company')}
  style={{
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Registreer als Bedrijf
</button>
        </div>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Al een account?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              color: '#4a90e2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Log hier in
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