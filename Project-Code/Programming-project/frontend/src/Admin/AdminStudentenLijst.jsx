// src/Admin/AdminStudentenLijst.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import '../Components/AdminStudentenLijst.css';

function AdminStudentenLijst() {
  const navigate = useNavigate();
  const [studenten, setStudenten] = useState([]);
  const [filters, setFilters] = useState({ naam: '', opleiding: '' });
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/studenten')
      .then((response) => setStudenten(response.data))
      .catch((error) => console.error('Fout bij ophalen studenten:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredStudenten = studenten.filter((student) => {
    const naam = `${student.voornaam || ''} ${student.naam || ''}`.toLowerCase();
    const opleiding = (student.opleiding || '').toLowerCase();
    return (
      naam.includes(filters.naam.toLowerCase()) &&
      opleiding.includes(filters.opleiding.toLowerCase())
    );
  });

  const displayedStudenten = showAll ? filteredStudenten : filteredStudenten.slice(0, 9);
  const hasMoreResults = filteredStudenten.length > 9;

  return (
    <div className="admin-page-container">
      <Navbar />
      <main className="admin-page-content">
        <h1>Studentenlijst</h1>

        <div className='filter-form'>
          <input
            type="text"
            name="naam"
            placeholder="Zoek op naam"
            value={filters.naam}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="opleiding"
            placeholder="Zoek op opleiding"
            value={filters.opleiding}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        <div className="studenten-grid">
          {loading && <p>Laden...</p>}
          {!loading && filteredStudenten.length === 0 && <p>Geen studenten gevonden.</p>}
          
          {displayedStudenten.map((student) => (
            <div
              key={student.id}
              onClick={() => navigate(`/admin/student/${student.id}/profiel`)}
              className="student-card"
            >
              <p className="student-card-naam">{student.voornaam} {student.naam}</p>
              <p className="student-card-email">{student.email}</p>
              <p className="student-card-opleiding">{student.opleiding}</p>
            </div>
          ))}
        </div>

        <div className="toon-meer-container">
          {hasMoreResults && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="toonmeer-btn"
            >
              {showAll ? 'Toon minder' : `Toon alle ${filteredStudenten.length} studenten`}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminStudentenLijst;