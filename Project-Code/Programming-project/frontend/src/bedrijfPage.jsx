import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BedrijvenLijst() {
  const navigate = useNavigate();
  const [bedrijven, setBedrijven] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bedrijven')
      .then((response) => {
        console.log(response.data);
        
        setBedrijven(response.data);
      })
      .catch((error) => {
        console.error('Fout bij ophalen bedrijven:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>
        <div className="top-bar">
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="notificatie-btn" onClick={() => alert('Meldingen geklikt!')}>Meldingen</button>
          <img src="https://via.placeholder.com/40" alt="Logo" className="logo" />
        </div>
        <div className="nav-bar">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/Agenda')}>Speeddates</button>
          <button onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
          <button onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
        </div>
      </header>

      <h2 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0 20px', fontWeight: 'bold' }}>Bedrijven</h2>

      <button style={{
        width: '100%',
        padding: '14px',
        backgroundColor: '#ccc',
        border: 'none',
        marginBottom: '30px',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        Filter
      </button>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Laden...</p>
      ) : (
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
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '6px',
                  backgroundColor: getColorCode(bedrijf.kleur),
                  margin: '0 auto 15px',
                }}
              ></div>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{bedrijf.naam}</p>
            </div>
          ))}
        </div>
      )}

      <button style={{
        width: '100%',
        padding: '16px',
        border: '1px solid black',
        backgroundColor: 'white',
        marginTop: '30px',
        fontWeight: 'bold',
        fontSize: '16px'
      }}>
        Toon meer
      </button>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5 style={{ marginBottom: '10px' }}>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}

// 👇 Kleurfunctie
function getColorCode(kleur) {
  switch (kleur.toLowerCase()) {
    case 'blauw': return '#4a90e2';
    case 'groen': return '#50c878';
    case 'geel': return '#ffcc00';
    case 'paars': return '#800080';
    case 'rood': return '#ff0000';
    default: return '#ccc';
  }
}
