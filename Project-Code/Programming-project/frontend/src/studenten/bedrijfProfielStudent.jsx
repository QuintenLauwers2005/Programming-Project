import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Components/StudentNavbar";
import Footer from '../Components/Footer';

export default function BedrijfProfileStudent() {
  const studentId = localStorage.getItem('gebruiker_id');
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeConfig, setTimeConfig] = useState({
    beginuur: '08:00:00',
    einduur: '18:00:00'
  });

  // Bedrijf ophalen
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

  // Tijdsconfiguratie ophalen
  useEffect(() => {
    axios.get('http://localhost:5000/api/speeddate-config')
      .then((res) => {
        setTimeConfig(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen tijdsconfiguratie:', err);
      });
  }, []);

  // Genereer tijdsopties o.b.v. configuratie
  const generateTimeOptions = () => {
  const options = [];

  const [startHour, startMinute] = timeConfig.beginuur.split(':').map(Number);
  const [endHour, endMinute] = timeConfig.einduur.split(':').map(Number);

  let current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  while (current <= end) {
    const hours = String(current.getHours()).padStart(2, '0');
    const minutes = String(current.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    if (!unavailableTimes.includes(time)) {
      options.push(<option key={time} value={time}>{time}</option>);
    }

    current.setMinutes(current.getMinutes() + 10);
  }

  return options;
};

  const handleOpenModal = (vacature) => {
    setSelectedVacature(vacature);
    setSelectedTime('');
    setShowModal(true);

    axios.get(`http://localhost:5000/api/speeddate/unavailable`, {
  params: { student_id: studentId, bedrijf_id: id }
})
.then((res) => {
  setUnavailableTimes(res.data);
  setSelectedVacature(vacature);
  setSelectedTime('');
  setShowModal(true);
})
.catch((err) => {
  console.error('Fout bij ophalen van bezette tijdstippen:', err);
  alert('Tijdsloten konden niet worden opgehaald');
});
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      alert('Kies een tijdstip');
      return;
    }

    axios.post('http://localhost:5000/api/speeddate', {
      student_id: studentId,
      bedrijf_id: id,
      vacature_id: selectedVacature ? selectedVacature.vacature_id : null,
      tijdstip: selectedTime + ':00',
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
    return <div style={{ textAlign: 'center', padding: '20px' }}><h2>Laden...</h2></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <h2>{error}</h2>
        <button
          onClick={() => navigate('/BedrijvenLijst')}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Terug naar bedrijvenlijst
        </button>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Geen bedrijf gevonden</h2>
        <button
          onClick={() => navigate('/BedrijvenLijst')}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Terug naar bedrijvenlijst
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Navbar />

      {/* Bedrijfsprofiel */}
      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee', marginTop: '70px' }}>
        <img
          src={`http://localhost:5000${companyData.logo_link}`}
          alt={`${companyData.naam} bedrijfslogo`}
          style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '30px' }}
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2em', color: '#007bff' }}>{companyData.naam}</h2>
          <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{companyData.vertegenwoordiger}</p>
          <p style={{ color: '#007bff', fontSize: '1em' }}>{companyData.telefoon}</p>
        </div>
      </section>

      {/* Vacatures */}
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Openstaande Vacatures & Stages</h3>
        {companyData.vacatures && companyData.vacatures.length > 0 ? (
          <div>
            {companyData.vacatures.map((vacature) => (
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
            ))}
          </div>
        ) : (
          <div>
            <p style={{ color: '#777', marginBottom: '10px' }}>Geen openstaande vacatures.</p>
            <button
              onClick={() => handleOpenModal(null)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em'
              }}
            >
              Reserveer een gesprek
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
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
            width: '320px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <h3>Kies een tijdstip</h3>
            <label style={{ display: 'block', margin: '10px 0 5px' }}>Tijdstip:</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
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

      {/* Contact */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Contact & Locatie</h3>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Adres:</strong> {companyData.locatie}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Vertegenwoordiger:</strong> {companyData.vertegenwoordiger}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Telefoon:</strong> {companyData.telefoon}</p>

        <button
          onClick={() => {
            if (companyData.email) {
              window.location.href = `mailto:${companyData.email}`;
            } else {
              alert("Er is geen contact e-mailadres beschikbaar voor dit bedrijf.");
            }
          }}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          Contacteer via E-mail
        </button>
      </section>

      <Footer />
    </div>
  );
}
