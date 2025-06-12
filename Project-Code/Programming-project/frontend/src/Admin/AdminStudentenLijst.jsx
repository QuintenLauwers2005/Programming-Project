// HomePage.jsx
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/AdminNavBar'

function AdminStudentenLijst() {
    const navigate = useNavigate();
  const [studenten, setStudenten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    naam: '',
    opleiding: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/studenten')
      .then((response) => {
        console.log("Ophaalde studenten:", response.data);
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
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredStudenten = studenten.filter(student => {
    const naam = `${student.voornaam || ''} ${student.naam || ''}`;
    const opleiding = student.opleiding || '';
    
  
    return (
      naam.toLowerCase().includes(filters.naam.toLowerCase()) &&
      opleiding.toLowerCase().includes(filters.opleiding.toLowerCase()) 
      
    );
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
       <Navbar />
      </header>

      <h2 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0 20px', fontWeight: 'bold' }}>Studenten</h2>

      {/* Filter Form */}
      <div className="filter-form" style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
        <input type="text" name="naam" placeholder="Naam" value={filters.naam} onChange={handleFilterChange} />
        <input type="text" name="opleiding" placeholder="opleiding" value={filters.opleiding} onChange={handleFilterChange} />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Laden...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {filteredStudenten.map((student) => (
            <div
              key={student.id}
                onClick={() => navigate(`/admin/student/${student.id}/profiel`)}
              style={{
                cursor: 'pointer',
                width: '200px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '100%',
                height: '75px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px',
                borderRadius: '6px'
              }}>
                
              </div>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                 {student.voornaam} {student.naam}</p>
            
              <p style={{ fontSize: '14px', color: '#555' }}>{student.email}</p>
            </div>
          ))}
        </div>
      )}

      <button style={{
        width: '100%',
        padding: '16px',
        border: '1px solid black',
        backgroundColor: 'white',
        marginTop: '30px',
        fontWeight: 'bold',
        fontSize: '16px'
      }}>
        Toon meer
      </button>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5 style={{ marginBottom: '10px' }}>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}

export default AdminStudentenLijst