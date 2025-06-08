import React from 'react';
import { useNavigate } from 'react-router-dom';

const bedrijven = [
  { id: 1, naam: "SAP", kleur: "blauw" },
  { id: 2, naam: "Deloitte", kleur: "groen" },
  { id: 3, naam: "TechNova", kleur: "geel" },
  { id: 4, naam: "GreenEnergy Solutions", kleur: "paars" },
  { id: 5, naam: "Delaware", kleur: "rood" },
];

export default function BedrijvenLijst() {
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

      <h2 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0 20px' }}>Bedrijven</h2>

      <button
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#ccc',
          border: 'none',
          marginBottom: '30px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Filter
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {bedrijven.map((bedrijf) => (
          <div
            key={bedrijf.id}
            onClick={() => navigate(`/bedrijf/${bedrijf.id}`)}
            style={{
              cursor: 'pointer',
              width: '200px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '6px',
                backgroundColor: bedrijf.kleur === 'blauw' ? '#4a90e2' : bedrijf.kleur === 'groen' ? '#50c878' : bedrijf.kleur === 'geel' ? '#ffcc00' : bedrijf.kleur === 'paars' ? '#800080' : '#ff0000',
                margin: '0 auto 15px',
              }}
            ></div>
            <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{bedrijf.naam}</p>
          </div>
        ))}
      </div>

      <button
        style={{
          width: '100%',
          padding: '16px',
          border: '1px solid black',
          backgroundColor: 'white',
          marginTop: '30px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        Toon meer
      </button>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}