import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Assets/VacatureLijst.css';
import Navbar from '../Components/BedrijfNavBar';
import Footer from '../Components/Footer';

export default function BedrijfVacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [filters, setFilters] = useState({
    bedrijf: '',
    functie: '',
    contractType: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVacature, setEditVacature] = useState(null);
  const bedrijfId = localStorage.getItem("gebruiker_id");

  // Fetch vacatures
 useEffect(() => {
  if (!bedrijfId) return;

  axios.get(`http://localhost:5000/api/vacatures/bedrijf/${bedrijfId}`)
    .then((res) => {
      setVacatures(res.data);
      setFilteredVacatures(res.data);
    })
    .catch((err) => {
      console.error('Fout bij ophalen vacatures:', err.message);
    });
}, [bedrijfId]);

  // Filter logic
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
    setFilters({ ...filters, [name]: value });
  };

  const handleEditClick = (vacature) => {
    setEditVacature(vacature);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:5000/api/vacatures/${editVacature.vacature_id}`, editVacature)
      .then(() => {
        alert('Vacature bijgewerkt!');
        setShowEditModal(false);
      })
      .catch((err) => {
        alert('Fout bij bijwerken:', err.message);
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
        </div>

        <div className="vacature-list">
          {filteredVacatures.map((vacature) => (
            <div key={vacature.vacature_id} className="vacature-card">
              <div className="logo-blok">
                <img 
                  src={`/${vacature.logo_link}`} 
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

      {showEditModal && editVacature && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Vacature bewerken</h3>
            <label>Functie:</label>
            <input
              value={editVacature.functie}
              onChange={(e) => setEditVacature({ ...editVacature, functie: e.target.value })}
            />
            <label>Contracttype:</label>
            <input
              value={editVacature.contract_type}
              onChange={(e) => setEditVacature({ ...editVacature, contract_type: e.target.value })}
            />
            <label>Beschrijving:</label>
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