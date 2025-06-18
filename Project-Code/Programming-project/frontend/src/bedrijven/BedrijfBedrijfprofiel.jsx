import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Components/BedrijfNavBar";
import Footer from '../Components/Footer';

export default function BedrijfBedrijfProfilePage() {
  const id = localStorage.getItem('gebruiker_id');
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aula, setAula] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bedrijf/${id}`)
      .then((response) => {
        setCompanyData(response.data);
      })
      .catch(() => {
        setError('Kon bedrijf niet ophalen');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bedrijf/${id}/aula`)
      .then(response => {
        setAula(response.data.aula);
      })
      .catch(err => {
        console.error("Fout bij ophalen van aula:", err);
        setError("Kon aula niet ophalen.");
      });
  }, [id]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const buttonStyle = (bgColor, hoverColor) => ({
    backgroundColor: bgColor,
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  });

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}><h2>Laden...</h2></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <h2>{error}</h2>
        <button onClick={() => navigate('/BedrijvenLijst')} style={{ marginTop: '10px' }}>
          Terug naar bedrijvenlijst
        </button>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Geen bedrijf gevonden</h2>
        <button onClick={() => navigate('/BedrijvenLijst')} style={{ marginTop: '10px' }}>
          Terug naar bedrijvenlijst
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Navbar />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        {/* 👤 Bedrijf info + logo */}
        <section style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid #eee',
          marginTop: '70px',
          gap: '30px',
          textAlign: 'left'
        }}>
          <img
            src={`http://localhost:5000${companyData.logo_link}`}
            alt={`Logo van ${companyData.naam}`}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '10px', fontSize: '2em', color: '#007bff' }}>
              {companyData.naam}
            </h2>
            <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>
              {companyData.vertegenwoordiger}
            </p>
            <p style={{ color: '#007bff', fontSize: '1em', marginBottom: '10px' }}>
              {companyData.telefoon}
            </p>
            {aula ? (
              <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>
                Locatie Campus: {aula}
              </p>
            ) : (
              <p style={{
                margin: '0 0 5px 0',
                color: '#999',
                fontSize: '1.1em',
                fontStyle: 'italic'
              }}>
                Locatie Campus: Onbekend
              </p>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={() => navigate(`/BedrijfsInstellingen/${id}`)}
                style={buttonStyle('#007bff')}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Aanpassen
              </button>
              <button
                onClick={() => navigate('/VacaturePage')}
                style={buttonStyle('#007bff')}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Vacature aanmaken
              </button>
              <button
                onClick={handleLogout}
                style={buttonStyle('#dc3545')}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b02a37'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Uitloggen
              </button>
            </div>
          </div>
        </section>

        {/* 📄 Vacatures */}
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{
            borderBottom: '2px solid #ddd',
            paddingBottom: '10px',
            marginBottom: '20px',
            color: '#333'
          }}>
            Openstaande Vacatures & Stages
          </h3>

          {companyData.vacatures && companyData.vacatures.length > 0 ? (
            companyData.vacatures.map((vacature) => (
              <div key={vacature.vacature_id} style={{
                border: '1px solid #e0e0e0',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{vacature.functie}</h4>
                  <p style={{ margin: 0, color: '#666' }}>{vacature.synopsis}</p>
                </div>
                <span style={{
                  backgroundColor: vacature.contract_type === 'Stage' ? '#007bff' : '#28a745',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8em'
                }}>
                  {vacature.contract_type}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: '#777' }}>Geen openstaande vacatures.</p>
          )}
        </section>

        {/* 📍 Contactgegevens */}
        <section style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <h3 style={{
            borderBottom: '2px solid #ddd',
            paddingBottom: '10px',
            marginBottom: '20px',
            color: '#333'
          }}>
            Contact & Locatie
          </h3>
          <p style={{ margin: '10px 0', color: '#555' }}>
            <strong>Adres:</strong> {companyData.locatie}
          </p>
          <p style={{ margin: '10px 0', color: '#555' }}>
            <strong>Vertegenwoordiger:</strong> {companyData.vertegenwoordiger}
          </p>
          <p style={{ margin: '10px 0', color: '#555' }}>
            <strong>Telefoon:</strong> {companyData.telefoon}
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
