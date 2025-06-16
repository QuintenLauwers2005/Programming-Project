import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Components/Logo';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import '../Components/BedrijfPage.css';

export default function AdminBedrijvenLijst() {
  const navigate = useNavigate();
  const [bedrijven, setBedrijven] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    naam: '',
    locatie: '',
    vertegenwoordiger: ''
  });
  const [showAll, setShowAll] = useState(false);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      naam: '',
      locatie: '',
      vertegenwoordiger: ''
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

  const displayedBedrijven = showAll ? filteredBedrijven : filteredBedrijven.slice(0, 8);
  const hasMoreResults = filteredBedrijven.length > 8;

  return (
    <div className="bedrijven-container">
      <header>
        <Navbar />
      </header>

      <main>
        <h1 className="bedrijven-titel">Bedrijven Overzicht</h1>
        
        {/* Verbeterde Filter Sectie */}
        <div className="filter-section">
          <div className="filter-form">
            <input 
              type="text" 
              name="naam" 
              placeholder="🔍 Zoek op naam..." 
              value={filters.naam} 
              onChange={handleFilterChange}
              className="filter-input"
            />
            <input 
              type="text" 
              name="locatie" 
              placeholder="📍 Locatie..." 
              value={filters.locatie} 
              onChange={handleFilterChange}
              className="filter-input"
            />
            <input 
              type="text" 
              name="vertegenwoordiger" 
              placeholder="👤 Vertegenwoordiger..." 
              value={filters.vertegenwoordiger} 
              onChange={handleFilterChange}
              className="filter-input"
            />
            {(filters.naam || filters.locatie || filters.vertegenwoordiger) && (
              <button 
                onClick={clearFilters}
                className="clear-filters-btn"
                title="Filters wissen"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Resultaten teller */}
          <div className="results-info">
            {filteredBedrijven.length} bedrijf{filteredBedrijven.length !== 1 ? 'en' : ''} gevonden
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Bedrijven laden...</p>
          </div>
        ) : filteredBedrijven.length === 0 ? (
          <div className="geen-resultaten">
            <div className="no-results-icon">🏢</div>
            <h3>Geen bedrijven gevonden</h3>
            <p>Probeer je zoekfilters aan te passen</p>
          </div>
        ) : (
          <>
            <div className="bedrijven-grid">
              {displayedBedrijven.map((bedrijf) => (
                <div
                  key={bedrijf.id}
                  onClick={() => navigate(`/admin/bedrijf/${bedrijf.id}/profiel`)}
                  className="bedrijf-card"
                >
                  <div className="bedrijf-logo">
                    <img
                      src={`http://localhost:5000${bedrijf.logo_link}`}
                      alt={`${bedrijf.naam} logo`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="logo-fallback"
                      style={{ display: 'none' }}
                    >
                      🏢
                    </div>
                  </div>
                  <p className="bedrijf-naam">{bedrijf.naam}</p>
                  {bedrijf.locatie && (
                    <p className="bedrijf-locatie">📍 {bedrijf.locatie}</p>
                  )}
                  {bedrijf.vertegenwoordiger && (
                    <p className="bedrijf-vertegenwoordiger">👤 {bedrijf.vertegenwoordiger}</p>
                  )}
                </div>
              ))}
            </div>

            {hasMoreResults && !showAll && (
              <button 
                className="toonmeer-btn" 
                onClick={() => setShowAll(true)}
              >
                Toon alle {filteredBedrijven.length} bedrijven
              </button>
            )}

            {showAll && hasMoreResults && (
              <button 
                className="toonmeer-btn" 
                onClick={() => setShowAll(false)}
              >
                Toon minder
              </button>
            )}
          </>
        )}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}