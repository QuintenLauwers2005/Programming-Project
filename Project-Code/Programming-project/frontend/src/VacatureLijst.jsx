import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Assets/VacatureLijst.css';

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vacatures')
      .then((res) => {
        setVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <button className="login-btn">Login</button>
        <button className="notificatie-btn">Meldingen</button>
        <img src="/erasmus-logo.png" alt="Erasmus logo" className="logo" />
      </div>

      <div className="nav-bar">
        <button>Speeddates</button>
        <button>Bedrijven</button>
        <button>Vacatures</button>
      </div>

      <h2 className="title">Vacatures</h2>

      <button className="filter-btn">Filter</button>

      {vacatures.map((vacature) => (
        <div key={vacature.id} className="vacature-card">
          <div className="logo-blok"></div>
          <div className="vacature-info">
            <p className="bedrijf">{vacature.bedrijf}</p>
            <p className="beschrijving">{vacature.beschrijving}</p>
            <p className="functie">
              Functie: {vacature.functie}<br />
              Contract: {vacature.contract}
            </p>
          </div>
        </div>
      ))}

      <button className="toonmeer-btn">Toon meer</button>
    </div>
  );
}
