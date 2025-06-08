import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BedrijfProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bedrijf/${id}`)
      .then((response) => {
        console.log(response.data);
        
        setCompanyData(response.data);
      })
      .catch((error) => {
        console.error('Fout bij ophalen bedrijven:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Bezig met laden...</div>;
  }

  if (!companyData) {
    return <div>Bedrijf niet gevonden</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <button
        onClick={() => navigate('/BedrijvenLijst')}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}
      >
        ← Terug
      </button>

      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>   
        <img 
          src={companyData.logo_link} 
          alt={`Logo van ${companyData.naam}`}
          style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '30px' }} 
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2em', color: '#007bff' }}>{companyData.naam}</h2>
          <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{companyData.vertegenwoordiger}</p>
          <p style={{ color: '#007bff', fontSize: '1em' }}>{companyData.telefoon}</p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Openstaande Vacatures & Stages</h3>
        <div>
          {companyData.vacatures.length === 0 ? (
            <p style={{ color: '#777' }}>Geen openstaande vacatures.</p>
          ) : (
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
          )}
        </div>
      </section>

      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Contact & Locatie</h3>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Adres:</strong> {companyData.locatie}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Vertegenwoordiger:</strong> {companyData.vertegenwoordiger}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Telefoon:</strong> {companyData.telefoon}</p>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}

export default BedrijfProfilePage;
