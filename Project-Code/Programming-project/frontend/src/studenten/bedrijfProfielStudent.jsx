import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Components/StudentNavbar";
import Footer from '../Components/Footer';
import '../Components/BedrijfProfileStudent.css';

export default function BedrijfProfileStudent() {
  const studentId = localStorage.getItem('gebruiker_id');
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [aula, setAula] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeConfig, setTimeConfig] = useState({
    beginuur: '08:00:00',
    einduur: '18:00:00'
  });

  useEffect(() => {
    setLoading(true);
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
      });
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/speeddate-config')
      .then((res) => {
        setTimeConfig(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen tijdsconfiguratie:', err);
      });
  }, []);

  const generateTimeOptions = () => {
    const options = [];
    if (!timeConfig.beginuur || !timeConfig.einduur) return options;

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
    const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    console.log('Geen geldige sessie, graag opnieuw inloggen.');
    return;
  }
    axios.get(`http://localhost:5000/api/speeddate/unavailable`, { 
      params: { student_id: studentId, bedrijf_id: id },
      headers: {
      Authorization: `Bearer ${token}`}
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
      locatie: aula || 'Nog te bepalen',
      status: 'bevestigd'
    })
      .then(() => {
        setShowModal(false);
        navigate('/AgendaStudenten')
      })
      .catch(err => {
        alert(err.response?.data?.error || 'Er ging iets mis bij het reserveren.');
      });
  };

  if (loading) return <div className="page-message"><h2>Laden...</h2></div>;
  if (error) return (
    <div className="page-message error">
      <h2>{error}</h2>
      <button onClick={() => navigate('/StudentBedrijvenLijst')}>Terug naar bedrijvenlijst</button>
    </div>
  );
  if (!companyData) return <div className="page-message"><h2>Geen bedrijf gevonden</h2></div>;

  return (
    <div className="profile-page-container">
      <Navbar />
      <main className="profile-content">
        
        <section className="profile-header">
          <img
            src={`http://localhost:5000${companyData.logo_link}`}
            alt={`${companyData.naam} bedrijfslogo`}
            className="profile-logo"
          />
          <div className="profile-details">
            <h2 className="profile-name">{companyData.naam}</h2>
            <p className="profile-subtext">{companyData.vertegenwoordiger}</p>
            <p className="profile-contact">{companyData.telefoon}</p>
            {aula ? (
              <p className="profile-subtext">Locatie Campus: {aula}</p>
            ) : (
              <p className="profile-subtext-light">Locatie Campus: Onbekend</p>
            )}
          </div>
        </section>

                 {/* Over ons / Bio */}
        {companyData.bio && (
          <section style={{
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: '#f1f1f1',
            borderRadius: '8px'
          }}>
            <h3 style={{
              borderBottom: '2px solid #ccc',
              paddingBottom: '10px',
              marginBottom: '15px',
              color: '#333'
            }}>
              Over ons
            </h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              {companyData.bio}
            </p>
          </section>
        )}

        <section className="profile-vacatures">
          <h3>Openstaande Vacatures & Stages</h3>
          {companyData.vacatures && companyData.vacatures.length > 0 ? (
            <div className="vacature-list">
              {companyData.vacatures.map((vacature) => (
                <div key={vacature.vacature_id} className="vacature-item">
                  <div className="vacature-item-info">
                    <h4>{vacature.functie}</h4>
                    <p>{vacature.synopsis}</p>
                  </div>
                  <div className="vacature-item-actions">
                    <span className={`contract-type ${vacature.contract_type?.toLowerCase()}`}>
                      {vacature.contract_type}
                    </span>
                    <button className="reserveer-btn" onClick={() => handleOpenModal(vacature)}>
                      Reserveer gesprek
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="geen-vacatures">
              <p>Geen openstaande vacatures.</p>
              <button className="reserveer-btn" onClick={() => handleOpenModal(null)}>
                Reserveer een algemeen gesprek
              </button>
            </div>
          )}
        </section>
        
        <section className="profile-section">
          <h3>Contact & Locatie</h3>
          <p><strong>Adres:</strong> {companyData.locatie}</p>
          <p><strong>Vertegenwoordiger:</strong> {companyData.vertegenwoordiger}</p>
          <p><strong>Telefoon:</strong> {companyData.telefoon}</p>
          <button className="contact-btn" onClick={() => window.location.href = `mailto:${companyData.email}`}>
            Contacteer via E-mail
          </button>
        </section>

      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Kies een tijdstip</h3>
            <label>Tijdstip:</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Selecteer tijd</option>
              {generateTimeOptions()}
            </select>
            <div className="modal-buttons">
              <button onClick={handleConfirm}>Bevestigen</button>
              <button onClick={() => setShowModal(false)}>Annuleren</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}