// src/Admin/HomePageAdmin.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import '../Components/HomePageAdmin.css';

function HomePageAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/HomePageAantalen')
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch stats');
        setLoading(false);
      });
  }, []);

  const cards = [
    { aantal: stats?.bedrijf_aantal, label: 'Geregistreerde bedrijven', route: '/AdminBedrijvenLijst' },
    { aantal: stats?.student_aantal, label: 'Geregistreerde studenten', route: '/AdminStudentenLijst' },
    { aantal: stats?.vacature_aantal, label: 'Open Vacatures', route: '/AdminVacatureLijst' },
    { aantal: stats?.speeddate_aantal, label: 'Speeddates Agenda', route: '/AdminAgenda' }
  ];

  return ( 
    <div className="admin-page">
      <header><Navbar/></header>

      <main className="admin-content">
        <h1>Dashboard</h1>
        
        <div className='admin-dashboard-container'>
          <div className="stats-grid">
            {loading ? (
              <p>Statistieken laden...</p>
            ) : error ? (
              <p>Kon statistieken niet laden.</p>
            ) : (
              cards.map((card, index) => (
                <div 
                  key={index}
                  className="stat-card"
                  onClick={() => navigate(card.route)}
                >
                  <div className="stat-card-number">
                    {card.aantal ?? '0'} {/* Toon 0 als het aantal null of undefined is */}
                  </div>
                  <div className="stat-card-label">
                    {card.label}
                  </div>
                  <button className="stat-card-button">Bekijk</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <footer><Footer /></footer>
    </div>
  );
}

export default HomePageAdmin;