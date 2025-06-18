import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../Components/VacatureLijst.css';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

export default function AdminVacatureLijst() {
  const [editData, setEditData] = useState({ functie: '', contract_type: '', synopsis: '' });
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ bedrijf: '', functie: '', contractType: '' });
  // Paginering en lazy loading
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 2;

  const fetchVacatures = useCallback((page) => {
    setLoadingMore(true);
    axios.get(`http://localhost:5000/api/vacatures?page=${page}&limit=${limit}`)
      .then((res) => {
        if (res.data.length < limit) setHasMore(false);
        setVacatures(prev => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, []);

  useEffect(() => {
    fetchVacatures(page);
  }, [page, fetchVacatures]);

  // Lazy loading bij scrollen
  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || !hasMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore]);

  // Filteren lokaal
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


  const handleEditVacature = (vacature) => {
    setSelectedVacature(vacature);
    setEditData({
      functie: vacature.functie,
      contract_type: vacature.contract_type,
      synopsis: vacature.synopsis
    });
    setShowModal(true);
  };

  const handleDeleteVacature = (id) => {
    if (window.confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) {
      axios.delete(`http://localhost:5000/api/vacatures/${id}`)
        .then(() => {
          const updated = vacatures.filter(v => v.vacature_id !== id);
          setVacatures(updated);
          setFilteredVacatures(updated);
          setShowModal(false);
        })
        .catch(err => {
          alert('Verwijderen mislukt');
          console.error(err);
        });
    }
  };

  const handleUpdateVacature = () => {
    axios.put(`http://localhost:5000/api/vacatures/${selectedVacature.vacature_id}`, editData)
      .then((res) => {
        const updated = vacatures.map(v => v.vacature_id === res.data.vacature_id ? res.data : v);
        setVacatures(updated);
        setFilteredVacatures(updated);
        setShowModal(false);
        window.location.reload();
      })
      .catch(err => {
        alert('Fout bij bewerken');
        console.error(err);
      });
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
                    <button className="bewerken-btn" onClick={() => handleEditVacature(vacature)}>Bewerken</button>
                    <button className="verwijder-btn" onClick={() => handleDeleteVacature(vacature.vacature_id)}>Verwijderen</button>
                  </div>
                </div>
              ))}
              {loadingMore && <p>Laden...</p>}
              {!hasMore && <p>Geen vacatures meer</p>}
            </div>
          </div>
        </section>
      </main>

      {showModal && selectedVacature && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Vacature bewerken</h3>

      <label>Functie:</label>
      <input
        type="text"
        value={editData.functie}
        onChange={(e) => setEditData({ ...editData, functie: e.target.value })}
      />

      <label>Contracttype:</label>
      <select
        value={editData.contract_type}
        onChange={(e) => setEditData({ ...editData, contract_type: e.target.value })}
      >
        <option value="">-- Kies type --</option>
        <option value="Stage">Stage</option>
        <option value="Voltijds">Voltijds</option>
        <option value="Deeltijds">Deeltijds</option>
      </select>

      <label>Beschrijving (synopsis):</label>
      <textarea
        value={editData.synopsis}
        onChange={(e) => setEditData({ ...editData, synopsis: e.target.value })}
      />

      <div className="modal-buttons">
        <button onClick={handleUpdateVacature}>Opslaan</button>
        <button onClick={() => setShowModal(false)}>Annuleren</button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
}
