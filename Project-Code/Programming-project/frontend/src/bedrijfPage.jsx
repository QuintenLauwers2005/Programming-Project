import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Components/Logo';

export default function BedrijvenLijst() {
  const navigate = useNavigate();
  const [bedrijven, setBedrijven] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    naam: '',
    locatie: '',
    vertegenwoordiger: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/bedrijven')
      .then((response) => {
        console.log("Ophaalde bedrijven:", response.data);
        setBedrijven(response.data);
      })
      .catch((error) => {
        console.error('Fout bij ophalen bedrijven:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getColorCode = (kleur) => {
    if (!kleur || typeof kleur !== 'string') return '#ccc';
    switch (kleur.toLowerCase()) {
      case 'blauw': return '#4a90e2';
      case 'groen': return '#50c878';
      case 'geel': return '#ffcc00';
      case 'paars': return '#800080';
      case 'rood': return '#ff0000';
      default: return '#ccc';
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredBedrijven = bedrijven.filter(bedrijf => {
    const naam = bedrijf.naam || '';
    const locatie = bedrijf.locatie || '';
    const vertegenwoordiger = bedrijf.vertegenwoordiger || '';
  
    return (
      naam.toLowerCase().includes(filters.naam.toLowerCase()) &&
      locatie.toLowerCase().includes(filters.locatie.toLowerCase()) &&
      vertegenwoordiger.toLowerCase().includes(filters.vertegenwoordiger.toLowerCase())
    );
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <div className="top-bar">
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="notificatie-btn" onClick={() => alert('Meldingen geklikt!')}>Meldingen</button>
          <Logo />
        </div>
        <div className="nav-bar">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/Agenda')}>Speeddates</button>
          <button onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
          <button onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
        </div>
      </header>

      <h2 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0 20px', fontWeight: 'bold' }}>Bedrijven</h2>

      {/* Filter Form */}
      <div className="filter-form" style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
        <input type="text" name="naam" placeholder="Naam" value={filters.naam} onChange={handleFilterChange} />
        <input type="text" name="locatie" placeholder="Locatie" value={filters.locatie} onChange={handleFilterChange} />
        <input type="text" name="vertegenwoordiger" placeholder="Vertegenwoordiger" value={filters.vertegenwoordiger} onChange={handleFilterChange} />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Laden...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {filteredBedrijven.map((bedrijf) => (
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
              <div style={{
                width: '100%',
                height: '75px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px',
                borderRadius: '6px'
              }}>
                <img
                  src={`/${bedrijf.logo_link}`}
                  alt={`${bedrijf.naam} logo`}
                  style={{
                    maxWidth: '75px',
                    maxHeight: '60px',
                    objectFit: 'contain'
                  }}
                />
              </div>
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
