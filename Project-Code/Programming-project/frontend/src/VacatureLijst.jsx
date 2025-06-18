import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [filters, setFilters] = useState({ bedrijf: '', functie: '', contractType: '' });
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const navigate = useNavigate();

  const fetchVacatures = (pageNum = 1) => {
    axios.get(`http://localhost:5000/api/vacatures?page=${pageNum}&limit=${limit}`)
      .then((res) => {
        if (res.data.length < limit) {
          setHasMore(false);
        }
        if (pageNum === 1) {
          setVacatures(res.data);
        } else {
          setVacatures(prev => [...prev, ...res.data]);
        }
      })
      .catch(err => console.error('Fout bij ophalen vacatures:', err.message));
  };

  useEffect(() => {
    fetchVacatures(1);
  }, []);

  useEffect(() => {
    let filtered = vacatures;
    if (filters.bedrijf) {
      filtered = filtered.filter(v => v.bedrijf.toLowerCase().includes(filters.bedrijf.toLowerCase()));
    }
    if (filters.functie) {
      filtered = filtered.filter(v => v.functie.toLowerCase().includes(filters.functie.toLowerCase()));
    }
    if (filters.contractType) {
      filtered = filtered.filter(v => v.contract_type.toLowerCase().includes(filters.contractType.toLowerCase()));
    }
    setFilteredVacatures(filtered);
  }, [filters, vacatures]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight + 100 >= fullHeight && hasMore) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchVacatures(page);
    }
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (vacature) => {
    const isLoggedIn = localStorage.getItem("gebruiker_id");
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      setSelectedVacature(vacature);
      setShowModal(true);
    }
  };

  return (
    <div className="pagina">
      <header><Navbar /></header>

      <main className="inhoud">
        <h2>Vacatures</h2>

        <div className="filter-form">
          <input type="text" name="bedrijf" placeholder="Bedrijf" value={filters.bedrijf} onChange={handleFilterChange} />
          <input type="text" name="functie" placeholder="Functie" value={filters.functie} onChange={handleFilterChange} />
          <input type="text" name="contractType" placeholder="Contracttype" value={filters.contractType} onChange={handleFilterChange} />
        </div>

        <section className="enhanced-box">
          <div className="vacature-wrapper">
            <div className="vacature-list">
              {filteredVacatures.map((vacature) => (
                <div key={vacature.vacature_id} className="vacature-card">
                  <div className="logo-blok">
                    <img
                      src={`http://localhost:5000${vacature.logo_link}`}
                      alt={`logo van ${vacature.bedrijf}`}
                      style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="vacature-info">
                    <p className="bedrijf">{vacature.bedrijf}</p>
                    <p className="beschrijving">{vacature.synopsis}</p>
                    <p className="functie">
                      Functie: {vacature.functie}<br />
                      Contract: {vacature.contract_type}
                    </p>
                    <button className="bewerken-btn" onClick={() => handleOpenModal(vacature)}>
                      Reserveer gesprek
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {!hasMore && (
          <div style={{ textAlign: 'center', margin: '1rem', color: '#777' }}>
            Geen vacatures meer om te laden
          </div>
        )}
      </main>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <h3>Kies een tijdstip</h3>
            {/* Tijdselector kan hier later */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1100,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '320px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <h3>Inloggen vereist</h3>
            <p>Je moet ingelogd zijn om een gesprek te reserveren.</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setShowLoginPopup(false)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Annuleren
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  navigate('/login');
                }}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Inloggen
              </button>
            </div>
          </div>
        </div>
      )}

      <footer><Footer /></footer>
    </div>
  );
}
