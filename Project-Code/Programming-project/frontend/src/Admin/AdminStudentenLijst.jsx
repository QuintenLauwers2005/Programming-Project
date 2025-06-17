import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

function AdminStudentenLijst() {
  const navigate = useNavigate();
  const [studenten, setStudenten] = useState([]);
  const [filters, setFilters] = useState({ naam: '', opleiding: '' });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 10;

  // 📦 Ophalen studenten met paginering
  const fetchStudenten = useCallback((page) => {
    setLoadingMore(true);
    axios.get(`http://localhost:5000/api/studenten?page=${page}&limit=${limit}`)
      .then((response) => {
        if (response.data.length < limit) setHasMore(false);
        setStudenten(prev => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.error('Fout bij ophalen studenten:', error);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, []);

  useEffect(() => {
    fetchStudenten(page);
  }, [page, fetchStudenten]);

  // 🧠 Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || !hasMore) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.offsetHeight - 100;
      if (scrollPosition >= threshold) setPage(prev => prev + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore]);

  // 🔍 Filters toepassen
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header><Navbar /></header>

      <h2 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0 20px', fontWeight: 'bold' }}>Studenten</h2>

      {/* 🔍 Filter Form */}
      <div className="filter-form" style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
        <input type="text" name="naam" placeholder="Naam" value={filters.naam} onChange={handleFilterChange} />
        <input type="text" name="opleiding" placeholder="Opleiding" value={filters.opleiding} onChange={handleFilterChange} />
      </div>

      {/* 📃 Studentenlijst */}
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px', margin: '0 auto' }}>
        {filteredStudenten.map((student) => (
          <li
            key={student.id}
            onClick={() => navigate(`/admin/student/${student.id}/profiel`)}
            style={{
              cursor: 'pointer',
              padding: '15px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{student.voornaam} {student.naam}</p>
            <p style={{ color: '#555' }}>{student.email}</p>
            <p style={{ color: '#777', fontSize: '14px' }}>{student.opleiding}</p>
          </li>
        ))}
      </ul>

      {/* 🔄 Lazy loading status */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {loadingMore && <p>Laden...</p>}
        {!hasMore && <p>Alle studenten zijn geladen.</p>}
      </div>

      <footer><Footer /></footer>
    </div>
  );
}

export default AdminStudentenLijst;
