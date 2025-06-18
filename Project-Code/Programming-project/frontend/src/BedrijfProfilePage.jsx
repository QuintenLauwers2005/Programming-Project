import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer';


export default function BedrijfProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
    const [aula, setAula] = useState(null);

  // Nieuwe state voor login-popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return options;
  };

  // Pas hier: eerst check login, dan modal openen
  const handleOpenModal = (vacature) => {
    const isLoggedIn = localStorage.getItem('gebruiker_id'); // of hoe je login status opslaat
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    setSelectedVacature(vacature);
    setSelectedTime('');
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      alert('Kies een tijdstip');
      return;
    }

    axios.post('http://localhost:5000/api/speeddate', {
      student_id: 1, // dynamisch invullen indien nodig
      bedrijf_id: id,
      tijdstip: selectedTime + ':00', // "HH:mm:ss" formaat
      locatie: 'Aula 1',
      status: 'bevestigd'
    })
    .then(() => {
      alert('Afspraak succesvol vastgelegd!');
      setShowModal(false);
    })
    .catch(err => {
      alert(err.response?.data?.error || 'Er ging iets mis bij het reserveren.');
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center' }}><h2>Laden...</h2></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <div style={{padding:'20px', maxWidth: '900px', margin:'auto'}}>
      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee', marginTop:'70px' }}>
        <img 
          src={`http://localhost:5000${companyData.logo_link}`}       
          alt={`Logo van ${companyData.naam}`}
          style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '30px' }} 
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2em', color: '#007bff' }}>{companyData.naam}</h2>
          <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{companyData.vertegenwoordiger}</p>
          <p style={{ color: '#007bff', fontSize: '1em' }}>{companyData.telefoon}</p>
          {aula? (<p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>Locatie Campus: {aula}</p>
          ) : (<p style={{ margin: '0 0 5px 0', color: '#999', fontSize: '1.1em', fontStyle: 'italic' }}>Locatie Campus: Onbekend</p>)}
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
                <button
                  onClick={() => handleOpenModal(vacature)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9em'
                  }}
                >
                  Reserveer gesprek
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#777' }}>Geen openstaande vacatures.</p>
        )}
      </section>

      {/* Modal tijdstip kiezen */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <h3>Kies een tijdstip</h3>
            <label style={{ display: 'block', margin: '10px 0 5px' }}>Tijdstip:</label>
            <select
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            >
              <option value="">Selecteer tijd</option>
              {generateTimeOptions()}
            </select>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={handleConfirm}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Bevestigen
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login popup */}
      {showLoginPopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1100,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '320px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <h3>Inloggen vereist</h3>
            <p>Je moet ingelogd zijn om een gesprek te reserveren.</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setShowLoginPopup(false)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 1,
                  marginRight: '10px'
                }}
              >
                Annuleren
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  navigate('/login');  
                }}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Inloggen
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
<Footer />
</div>
)};