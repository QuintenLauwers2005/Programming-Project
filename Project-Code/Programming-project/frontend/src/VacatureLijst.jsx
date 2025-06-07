import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Assets/VacatureLijst.css';
import Navbar from './Components/Navbar'

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vacatures')
      .then((res) => {
        console.log("Ophaalde vacatures:", res.data);

        setVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>
          <Navbar />
      </header>


      <h2 className="title">Vacatures</h2>

      <button className="filter-btn" onClick={() => alert('Filter geklikt!')}>Filter</button>

      {vacatures.map((vacature) => (
        <div key={vacature.vacature_id} className="vacature-card">
          <div className="logo-blok"></div>
          <div className="vacature-info">
            <p className="bedrijf">{vacature.bedrijf}</p>
            <p className="beschrijving">{vacature.synopsis}</p>
            <p className="functie">
              Functie: {vacature.functie}<br />
              Contract: {vacature.contract_type}
            </p>
          </div>
        </div>
      ))}

      <button className="toonmeer-btn" onClick={() => alert('Toon meer geklikt!')}>Toon meer</button>
    </div>
  );
}
