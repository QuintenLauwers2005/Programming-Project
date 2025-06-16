import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [filters, setFilters] = useState({
    bedrijf: '',
    functie: '',
    contractType: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get('http://localhost:5000/api/vacatures')
      .then(res => {
        setVacatures(res.data);
        setFilteredVacatures(res.data);
      })
      .catch(err => console.error('Fout bij ophalen vacatures:', err.message));
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

        {/* Filters */}
        <div className="filter-form">
          <input type="text" name="bedrijf" placeholder="Bedrijf" value={filters.bedrijf} onChange={handleFilterChange} />
          <input type="text" name="functie" placeholder="Functie" value={filters.functie} onChange={handleFilterChange} />
          <input type="text" name="contractType" placeholder="Contracttype" value={filters.contractType} onChange={handleFilterChange} />
        </div>

        {/* Vacature Cards */}
        <section className="enhanced-box">
          <div className="vacature-wrapper">
            <div className="vacature-list">
              {filteredVacatures.map((vacature) => (
                <div key={vacature.vacature_id} className="vacature-card">
                  <div className="logo-blok">
                    <img
                      src={`/${vacature.logo_link}`}
                      alt={`logo van ${vacature.bedrijf}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
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

        <button className="toonmeer-btn" onClick={() => alert('Toon meer geklikt!')}>Toon meer</button>
      </main>

      {/* Tijdkiezer Modal */}
      {showModal && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      textAlign: 'center'
    }}>
      <h3>Kies een tijdstip</h3>
      
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        
      </div>
    </div>
  </div>
)}


      {/* Login popup */}
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
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 1,
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
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 1
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
