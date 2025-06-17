import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/VacatureLijst.css';
import Navbar from '../Components/BedrijfNavBar';
import Footer from '../Components/Footer';

export default function BedrijfVacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
    const navigate = useNavigate();
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [filters, setFilters] = useState({
    bedrijf: '',
    functie: '',
    contractType: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVacature, setEditVacature] = useState(null);
  const bedrijfId = localStorage.getItem("gebruiker_id");

  // Vacatures ophalen
  useEffect(() => {
    if (!bedrijfId) return;

    axios.get(`http://localhost:5000/api/vacatures/${bedrijfId}`)
      .then((res) => {
        setVacatures(res.data);
        setFilteredVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, [bedrijfId]);

  // Filters toepassen
  useEffect(() => {
    let filtered = vacatures;

    if (filters.bedrijf) {
      filtered = filtered.filter(v =>
        v.bedrijf.toLowerCase().includes(filters.bedrijf.toLowerCase())
      );
    }

    if (filters.functie) {
      filtered = filtered.filter(v =>
        v.functie.toLowerCase().includes(filters.functie.toLowerCase())
      );
    }

    if (filters.contractType) {
      filtered = filtered.filter(v =>
        v.contract_type.toLowerCase().includes(filters.contractType.toLowerCase())
      );
    }

    setFilteredVacatures(filtered);
  }, [filters, vacatures]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleEditClick = (vacature) => {
    setEditVacature({ ...vacature });
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (!editVacature.functie || !editVacature.contract_type) {
      alert("Gelieve functie en contracttype in te vullen.");
      return;
    }

    axios.put(`http://localhost:5000/api/vacatures/${editVacature.vacature_id}`, {
      functie: editVacature.functie,
      contract_type: editVacature.contract_type,
      synopsis: editVacature.synopsis
    })
      .then(() => {
        alert('Vacature succesvol bijgewerkt!');
        setShowEditModal(false);

        // Vacatures herladen
        return axios.get(`http://localhost:5000/api/vacatures/${bedrijfId}`);
      })
      .then((res) => {
        setVacatures(res.data);
        setFilteredVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij bijwerken:', err.message);
        alert('Fout bij het opslaan van de vacature.');
      });
  };

  const handleDelete = (vacatureId) => {
    if (!window.confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) return;

    axios.delete(`http://localhost:5000/api/vacatures/${vacatureId}`)
      .then(() => {
        setVacatures(prev => prev.filter(v => v.vacature_id !== vacatureId));
        alert('Vacature verwijderd!');
      })
      .catch(err => alert('Fout bij verwijderen:', err.message));
  };

  return (
    <div className="pagina">
      <header>
        <Navbar />
      </header>

      <main className="inhoud">
        <h2>Vacatures beheren</h2>

        {/* Filters */}

        <div className="filter-form">
          <input type="text" name="bedrijf" placeholder="Bedrijf" value={filters.bedrijf} onChange={handleFilterChange} />
          <input type="text" name="functie" placeholder="Functie" value={filters.functie} onChange={handleFilterChange} />
          <input type="text" name="contractType" placeholder="Contracttype" value={filters.contractType} onChange={handleFilterChange} />
           <button
        onClick={() => navigate('/VacaturePage')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        vacature aanmaken
      </button>
        </div>

        {/* Vacaturelijst */}
        <div className="vacature-list">
          {filteredVacatures.map((vacature) => (
            <div key={vacature.vacature_id} className="vacature-card">
              <div className="logo-blok">
                <img
                  src={`http://localhost:5000${vacature.logo_link}`}
                  style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                  alt="Logo"
                />
              </div>
              <div className="vacature-info">
                <p className="bedrijf">{vacature.bedrijf}</p>
                <p className="beschrijving">{vacature.synopsis}</p>
                <p className="functie">
                  Functie: {vacature.functie}<br />
                  Contract: {vacature.contract_type}
                </p>
                <button className="bewerken-btn" onClick={() => handleEditClick(vacature)}>Bewerk</button>
                <button className="verwijder-btn" onClick={() => handleDelete(vacature.vacature_id)}>Verwijder</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bewerken modal */}
      {showEditModal && editVacature && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Vacature bewerken</h3>

            <label>Functie:</label>
            <input
              type="text"
              value={editVacature.functie}
              onChange={(e) => setEditVacature({ ...editVacature, functie: e.target.value })}
            />

            <label>Contracttype:</label>
            <select
              value={editVacature.contract_type}
              onChange={(e) => setEditVacature({ ...editVacature, contract_type: e.target.value })}
            >
              <option value="">-- Kies type --</option>
              <option value="Stage">Stage</option>
              <option value="Voltijds">Voltijds</option>
              <option value="Deeltijds">Deeltijds</option>
            </select>

            <label>Beschrijving (synopsis):</label>
            <textarea
              value={editVacature.synopsis}
              onChange={(e) => setEditVacature({ ...editVacature, synopsis: e.target.value })}
            />

            <div className="modal-buttons">
              <button onClick={handleEditSave}>Opslaan</button>
              <button onClick={() => setShowEditModal(false)}>Annuleren</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
