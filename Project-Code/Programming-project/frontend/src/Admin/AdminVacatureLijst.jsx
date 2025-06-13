import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/VacatureLijst.css';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

export default function AdminVacatureLijst() {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ functie: '', contract_type: '', synopsis: '' });
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [filters, setFilters] = useState({
    bedrijf: '',
    functie: '',
    contractType: ''
  });

  // Fetch vacatures from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/vacatures')
      .then((res) => {    
        setVacatures(res.data);
        setFilteredVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters
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

 

  // Open modal om vacature te bewerken
  const handleEditVacature = (vacature) => {
    setSelectedVacature(vacature);
    setEditData({
      functie: vacature.functie,
      contract_type: vacature.contract_type,
      synopsis: vacature.synopsis
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Verwijder vacature
  const handleDeleteVacature = (id) => {
    if (window.confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) {
      axios.delete(`http://localhost:5000/api/vacatures/${id}`)
        .then(() => {
          alert('Vacature verwijderd');
          setVacatures(prev => prev.filter(v => v.vacature_id !== id));
          setFilteredVacatures(prev => prev.filter(v => v.vacature_id !== id));
          setShowModal(false);
        })
        .catch(err => {
          alert('Verwijderen mislukt');
          console.error(err);
        });
    }
  };

  // Update vacature
  const handleUpdateVacature = () => {
    axios.put(`http://localhost:5000/api/vacatures/${selectedVacature.vacature_id}`, editData)
      .then((res) => {
        alert('Vacature aangepast');
        const updated = vacatures.map(v => v.vacature_id === res.data.vacature_id ? res.data : v);
        setVacatures(updated);
        setFilteredVacatures(updated);
        setShowModal(false);
        setEditMode(false);
      })
      .catch(err => {
        alert('Fout bij bewerken');
        console.error(err);
      });
  };

  // Bevestig tijdstip reserveren
  const handleConfirm = () => {
    if (!selectedTime) {
      alert('Kies een tijdstip');
      return;
    }

    axios.post('http://localhost:5000/api/speeddate', {
      student_id: 1,
      bedrijf_id: selectedVacature.bedrijf_id,
      tijdstip: selectedTime + ':00',
      locatie: 'Aula 1', 
      status: 'bevestigd'
    })
    .then(() => {
      alert('Afspraak succesvol vastgelegd!');
      setShowModal(false);
    })
    .catch(err => {
      alert(err.response?.data?.error || 'Er ging iets mis bij het reserveren.');
    });
  };

  // Genereer tijd opties
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return options;
  };

  return (
    <div className="pagina">
      <header>
        <Navbar />
      </header>

      <main className="inhoud">
        <h2>Vacatures</h2>

        <div className="filter-form">
          <input
            type="text"
            name="bedrijf"
            placeholder="Bedrijf"
            value={filters.bedrijf}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="functie"
            placeholder="Functie"
            value={filters.functie}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="contractType"
            placeholder="Contracttype"
            value={filters.contractType}
            onChange={handleFilterChange}
          />
        </div>

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
                      Functie: {vacature.functie}
                      <br />
                      Contract: {vacature.contract_type}
                    </p>
                    <button
                      onClick={() => handleEditVacature(vacature)}
                      style={{ 
                        marginLeft: '10px', 
                        backgroundColor: '#ffc107', 
                        color: 'white', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                      }}
                    >
                      Bewerken
                    </button>
                    <button
                      onClick={() => handleDeleteVacature(vacature.vacature_id)}
                      style={{
                        marginLeft: '10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <button className="toonmeer-btn" onClick={() => alert('Toon meer geklikt!')}>Toon meer</button>
      </main>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            {editMode ? (
              <>
                <h3>Vacature Bewerken</h3>
                <label style={{ display: 'block', margin: '10px 0 5px' }}>Functie:</label>
                <input
                  type="text"
                  value={editData.functie}
                  onChange={(e) => setEditData({ ...editData, functie: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
                <label style={{ display: 'block', margin: '10px 0 5px' }}>Contract Type:</label>
                <input
                  type="text"
                  value={editData.contract_type}
                  onChange={(e) => setEditData({ ...editData, contract_type: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
                <label style={{ display: 'block', margin: '10px 0 5px' }}>Beschrijving:</label>
                <textarea
                  value={editData.synopsis}
                  onChange={(e) => setEditData({ ...editData, synopsis: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '80px' }}
                />
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={handleUpdateVacature}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Opslaan
                  </button>
                  <button
                    onClick={() => { setShowModal(false); setEditMode(false); }}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Annuleren
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Kies een tijdstip</h3>
                <label style={{ display: 'block', margin: '10px 0 5px' }}>Tijdstip:</label>
                <select
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                  <option value="">Selecteer tijd</option>
                  {generateTimeOptions()}
                </select>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={handleConfirm}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Bevestigen
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Annuleren
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
