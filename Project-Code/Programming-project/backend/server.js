import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/vacatures')
      .then((res) => {
        setVacatures(res.data);
        console.log('Data opgehaald:', res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button>Login</button>
        <button>Meldingen</button>
        <img src="/erasmus-logo.png" alt="Erasmus logo" style={{ height: '32px' }} />
      </div>

      {/* Navigatie */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button>Speeddates</button>
        <button>Bedrijven</button>
        <button>Vacatures</button>
      </div>

      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Vacatures</h2>

      <button style={{ width: '100%', marginTop: '10px' }}>Filter</button>

      {/* Vacatureblokken */}
      {vacatures.map((vacature) => (
        <div
          key={vacature.id}
          style={{
            display: 'flex',
            gap: '15px',
            padding: '15px',
            backgroundColor: '#eee',
            marginTop: '20px',
            borderRadius: '6px',
          }}
        >
          <div style={{ width: '64px', height: '64px', backgroundColor: '#4a90e2', borderRadius: '6px' }}></div>
          <div>
            <p style={{ fontWeight: 'bold' }}>{vacature.bedrijf}</p>
            <p style={{ fontSize: '14px' }}>{vacature.beschrijving}</p>
            <p style={{ fontSize: '14px', fontWeight: '500' }}>
              Functie: {vacature.functie}
              <br />
              Contract: {vacature.contract}
            </p>
          </div>
        </div>
      ))}

      <button style={{ width: '100%', marginTop: '20px' }}>Toon meer</button>
    </div>
  );
}
