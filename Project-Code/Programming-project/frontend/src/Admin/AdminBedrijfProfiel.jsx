import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Components/AdminNavBar";
import Footer from '../Components/Footer';
const backendUrl = 'http://localhost:5000';

export default function AdminBedrijfProfiel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bedrijf/${id}`)
      .then((response) => {
        console.log('Logo link van backend:', response.data.logo_link);
        setCompanyData(response.data);
        
      })
      .catch(() => {
        setError('Kon bedrijf niet ophalen');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center' }}><h2>Laden...</h2></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red',  }}>
        <h2>{error}</h2>
        <button onClick={() => navigate('/BedrijvenLijst')} style={{ marginTop: '10px' }}>Terug naar bedrijvenlijst</button>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Geen bedrijf gevonden</h2>
        <button onClick={() => navigate('/BedrijvenLijst')} style={{ marginTop: '10px' }}>Terug naar bedrijvenlijst</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif'}}>
      <Navbar />
      
      <div style={{ padding: '0 70px' }}>
        <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee', marginTop:'70px' }}>
        <img 
          src={`${backendUrl}${companyData.logo_link}`}       
          alt={`Logo van ${companyData.naam}`}
          style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '30px' }} 
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <h2 style={{ margin: '0', fontSize: '2em', color: '#007bff' }}>{companyData.naam}</h2>
            <button onClick={() => navigate(`/admin/bedrijf/${companyData.id}/instellingen`)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
             Aanpassen
            </button>
          </div>
          <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{companyData.vertegenwoordiger}</p>
          <p style={{ color: '#007bff', fontSize: '1em' }}>{companyData.telefoon}</p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Openstaande Vacatures & Stages</h3>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            </div>
          ))
        ) : (
          <p style={{ color: '#777' }}>Geen openstaande vacatures.</p>
        )}
      </section>

      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Contact & Locatie</h3>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Adres:</strong> {companyData.locatie}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Vertegenwoordiger:</strong> {companyData.vertegenwoordiger}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Telefoon:</strong> {companyData.telefoon}</p>
      </section>
      </div>

      <footer>
       <Footer />
      </footer>
    </div>
  );
}
