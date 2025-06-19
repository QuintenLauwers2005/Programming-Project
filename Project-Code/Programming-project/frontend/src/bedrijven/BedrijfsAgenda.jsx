import React, { useState, useEffect, useCallback } from 'react';
import '../Components/Agenda.css';
import Navbar from '../Components/BedrijfNavBar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Bedrijfsagenda() {
  const [afspraken, setAfspraken] = useState([]);
  const [cancelId, setCancelId] = useState(null);
  const [notificatie, setNotificatie] = useState(null);
  const gebruiker_id = localStorage.getItem('gebruiker_id');
  const navigate = useNavigate();

  // 🔁 Functie om afspraken opnieuw op te halen
  const fetchAfspraken = useCallback (() => {
       const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    console.log('Geen geldige sessie, graag opnieuw inloggen.');
    return;
  }
    fetch(`http://localhost:5000/api/afspraken?gebruiker_id=${gebruiker_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
      }) 
      .then(res => res.json())
      .then(data => {
        console.log('Afspraken geladen:', data);
        setAfspraken(data);
      })
      .catch(err => {
        console.error('Fout bij ophalen van afspraken:', err);
        setNotificatie('❌ Fout bij ophalen afspraken');
        setTimeout(() => setNotificatie(null), 3000);
      });
  }, [gebruiker_id]);

  // 🧠 Ophalen bij laden van component
  useEffect(() => {
    if (gebruiker_id) {
      fetchAfspraken();
    }
  }, [gebruiker_id, fetchAfspraken]);


  const confirmCancel = () => {
    fetch(`http://localhost:5000/api/speeddate/${cancelId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setAfspraken(prev => prev.filter(app => app.id !== cancelId));
        setCancelId(null);
        setNotificatie('Speeddate succesvol geannuleerd ✅');
        setTimeout(() => setNotificatie(null), 3000);
      })
      .catch(err => {
        console.error('Fout bij annuleren van afspraak:', err);
        setCancelId(null);
        setNotificatie('❌ Fout bij annuleren van speeddate');
        setTimeout(() => setNotificatie(null), 3000);
      });
  };

  const closeCancelModal = () => {
    setCancelId(null);
  };

  const toggleStatus = async (id, nieuweStatus) => {
    try {
      // Status lokaal meteen wijzigen zodat gebruiker het direct ziet
      setAfspraken(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status: nieuweStatus } : app
        )
      );

      await axios.put(`http://localhost:5000/api/speeddate/${id}/status`, { status: nieuweStatus });
      
      setNotificatie(`Status gewijzigd naar "${nieuweStatus}" ✅`);

      // Pas na 1,5 seconden opnieuw ophalen en notificatie wissen
      setTimeout(() => {
        fetchAfspraken();
        setNotificatie(null);
      }, 600);

    } catch (err) {
      console.error('Fout bij bijwerken status:', err);
      setNotificatie('❌ Fout bij wijzigen status');
      setTimeout(() => setNotificatie(null), 3000);
    }
  };

  const handleCardClick = (student_id) => {
    if (student_id) {
      navigate(`/student-info/${student_id}`);
    } else {
      alert('Geen student_id beschikbaar voor deze afspraak.');
    }
  };

  return (
    <div>
      <Navbar notificatie={notificatie} />
      <div className="page">
        {afspraken.length > 0 ? (
          afspraken.map(afspraak => (
            <div
              key={afspraak.id}
              className="card"
              onClick={() => handleCardClick(afspraak.student_id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="time">{afspraak.time}</div>
              <div className="company">
                {afspraak.voornaam} {afspraak.naam} — {afspraak.bedrijf_naam}
              </div>
              <div className="room">{afspraak.locatie}</div>
              <div>Status: {afspraak.status}</div>

              {/* Status wijzigen knoppen */}
              <div className="button-row">
                
                <button
                  className="cancel-button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await toggleStatus(afspraak.id, 'geweigerd');
                  }}
                >
                  Weigeren
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-appointments">
            <p>Geen afspraken gevonden.</p>
          </div>
        )}
      </div>

      {/* Annulatie bevestiging modal */}
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

      <Footer />
    </div>
  );
}
