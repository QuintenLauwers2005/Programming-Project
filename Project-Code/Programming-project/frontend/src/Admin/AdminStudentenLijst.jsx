import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import '../Components/BedrijfPage.css';
import '../App.css'; // Zorg dat dit de juiste CSS bevat of verwijs naar aparte CSS

function AdminStudentenLijst() {
  const navigate = useNavigate();
  const [studenten, setStudenten] = useState([]);
  const [filters, setFilters] = useState({ naam: '', opleiding: '' });
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/studenten')
      .then((response) => {
        setStudenten(response.data);
      })
      .catch((error) => {
        console.error('Fout bij ophalen studenten:', error);
      })
      .finally(() => {
        setLoading(false);
      });
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
    <div>
      <Navbar />

      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 id='bedrijven-titel'>Studentenlijst</h1>

        {/* 🔍 Filters */}
        <div className='filter-form'>
          <input
            type="text"
            name="naam"
            placeholder="Zoek op naam"
            value={filters.naam}
            onChange={handleFilterChange}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="opleiding"
            placeholder="Zoek op opleiding"
            value={filters.opleiding}
            onChange={handleFilterChange}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* 📃 Studentenlijst */}
        <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  }}
>
  {displayedStudenten.map((student) => (
    <div
      key={student.id}
      onClick={() => navigate(`/admin/student/${student.id}/profiel`)}
      style={{
        width: '300px',
        height: '200px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        boxSizing: 'border-box',
      }}
    >
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{student.voornaam} {student.naam}</p>
      <p>{student.email}</p>
      <p>{student.opleiding}</p>
    </div>
  ))}
</div>
        {/* 📍 Toon meer/minder knoppen */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {loading ? (
            <p>Laden...</p>
          ) : filteredStudenten.length === 0 ? (
            <p>Geen studenten gevonden</p>
          ) : (
            hasMoreResults && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="toonmeer-btn"
              >
                {showAll ? 'Toon minder' : `Toon alle ${filteredStudenten.length} studenten`}
              </button>
            )
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminStudentenLijst;


