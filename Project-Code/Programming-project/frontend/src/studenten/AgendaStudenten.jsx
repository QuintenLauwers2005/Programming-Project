import React, { useState, useEffect } from 'react';
import '../Components/Agenda.css';
import Navbar from '../Components/StudentNavbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AgendaStudenten() {
  const [afspraken, setAfspraken] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
       const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    console.log('Geen geldige sessie, graag opnieuw inloggen.');
    return;
  }
    const gebruiker_id = localStorage.getItem('gebruiker_id');
    if (!gebruiker_id) return;

    fetch(`http://localhost:5000/api/afspraken?gebruiker_id=${gebruiker_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
      }) 
      .then(res => res.json())
      .then(data => {
        setAfspraken(data);
      })
      .catch(err => {
        console.error('Fout bij ophalen van afspraken:', err);
      });
  }, []);

  const handleCancelConfirm = (id) => {
    setCancelId(id);
  };

  const confirmCancel = () => {
    fetch(`http://localhost:5000/api/speeddate/${cancelId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setAfspraken(prev => prev.filter(app => app.id !== cancelId));
        setCancelId(null);
      })
      .catch(err => {
        console.error('Fout bij annuleren van afspraak:', err);
        setCancelId(null);
      });
  };

  const closeCancelModal = () => {
    setCancelId(null);
  };

  const handleCardClick = (bedrijf_id) => {
    if (bedrijf_id) {
      navigate(`/BedrijfProfileStudent/${bedrijf_id}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page">
        <button className="top-button" onClick={() => setShowInfo(true)}>
          Hoe speeddate reserveren?
        </button>

        {afspraken.length > 0 ? (
          afspraken.map(afspraak => (
            <div
              key={afspraak.id}
              className="card"
              onClick={() => handleCardClick(afspraak.bedrijf_id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="time">{afspraak.time}</div>
              <div className="company">
                {afspraak.voornaam} {afspraak.naam} — {afspraak.bedrijf_naam}
              </div>
              <div className="room">{afspraak.locatie}</div>
              <button
                className="cancel-button"
                onClick={(e) => {
                  e.stopPropagation(); // voorkomt dat klik op knop ook navigatie triggert
                  handleCancelConfirm(afspraak.id);
                }}
              >
                Annuleren
              </button>
            </div>
          ))
        ) : (
          <div className="no-appointments">
            <p>Geen afspraken gevonden.</p>
          </div>
        )}
      </div>

      {/* Info modal */}
      {showInfo && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Hoe reserveer je een speeddate?</h3>
            <p>
              Ga naar de vacaturepagina en klik op "Reserveer een gesprek" bij het bedrijf dat je interessant vindt.
            </p>
            <button onClick={() => setShowInfo(false)}>Sluiten</button>
          </div>
        </div>
      )}

      {/* Annulatie bevestiging */}
      {cancelId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bevestig annulatie</h3>
            <p>Ben je zeker dat je deze speeddate wilt annuleren?</p>
            <button onClick={confirmCancel}>Ja, annuleren</button>
            <button onClick={closeCancelModal}>Nee, terug</button>
          </div>
        </div>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
