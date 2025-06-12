import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './Components/BedrijfPage.css'; // 👈 CSS import

export default function BedrijvenLijst() {
  const navigate = useNavigate();
  const [bedrijven, setBedrijven] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ naam: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/bedrijven')
      .then((res) => {
        console.log("Ophaalde bedrijven:", res.data);
        setBedrijven(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen bedrijven:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredBedrijven = bedrijven.filter(bedrijf =>
    (bedrijf.naam || '').toLowerCase().includes(filters.naam.toLowerCase())
  );

  return (
    <div className="bedrijven-container">
      <header>
        <Navbar />
      </header>

      <h2 className="bedrijven-titel">Bedrijven</h2>

      <div className="filter-form">
        <input 
          type="text" 
          name="naam" 
          placeholder="Naam bedrijf" 
          value={filters.naam} 
          onChange={handleFilterChange} 
        />
      </div>

      {loading ? (
        <p className="loading-text">Laden...</p>
      ) : (
        <div className="bedrijven-grid">
          {filteredBedrijven.length > 0 ? (
            filteredBedrijven.map(bedrijf => (
              <div
                key={bedrijf.id}
                className="bedrijf-card"
                onClick={() => navigate(`/bedrijf/${bedrijf.id}`)}
              >
                <div className="bedrijf-logo">
                  <img
                    src={`/${bedrijf.logo_link}`}
                    alt={`${bedrijf.naam} logo`}
                  />
                </div>
                <p className="bedrijf-naam">{bedrijf.naam}</p>
              </div>
            ))
          ) : (
            <p className="geen-resultaten">Geen bedrijven gevonden.</p>
          )}
        </div>
      )}

      <button className="toonmeer-btn" onClick={() => alert('Toon meer geklikt!')}>
        Toon meer
      </button>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
