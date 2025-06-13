import React, { useState, useEffect } from 'react';
import '../Assets/Agenda.css';
import Navbar from '../Components/BedrijfNavBar';
import Footer from '../Components/Footer';
import axios from 'axios';  // axios import toevoegen

export default function Bedrijfsagenda() {
  const [afspraken, setAfspraken] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [notificatie, setNotificatie] = useState(null);  // notificatie state

  const gebruiker_id = localStorage.getItem('gebruiker_id');
  useEffect(() => {
    fetch(`http://localhost:5000/api/afspraken?gebruiker_id=${gebruiker_id}`)
      .then(res => res.json())
      .then(data => setAfspraken(data))
      .catch(err => console.error('Fout bij ophalen van afspraken:', err));
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

  // Nieuwe functie om status te toggelen
  const toggleStatus = async (id, huidigeStatus) => {
    const nieuweStatus = huidigeStatus === 'bevestigd' ? 'geweigerd' : 'bevestigd';

    try {
      await axios.put(`http://localhost:5000/api/speeddate/${id}/status`, { status: nieuweStatus });
      setAfspraken(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: nieuweStatus } : app
        )
      );
      setNotificatie(`Status gewijzigd naar "${nieuweStatus}" ✅`);
      setTimeout(() => setNotificatie(null), 3000);
      window.location.reload()
    } catch (err) {
      console.error('Fout bij bijwerken status:', err);
      setNotificatie('❌ Fout bij wijzigen status');
      setTimeout(() => setNotificatie(null), 3000);
    }
  };

  return (
    <div>
      <Navbar notificatie={notificatie} />
      <div className="page">

        {afspraken.length > 0 ? (
          afspraken.map(afspraak => (
            <div key={afspraak.id} className="card">
              <div className="time">{afspraak.time}</div>
              <div className="company">
                {afspraak.voornaam} {afspraak.naam} — {afspraak.bedrijf_naam}
              </div>
              <div className="room">{afspraak.locatie}</div>

              {/* Status tonen */}
              <div>Status: {afspraak.status}</div>

              {/* Status toggle knop */}
              <button className='weigenKnopAdmin' onClick={() => toggleStatus(afspraak.id, afspraak.status)}>
                {afspraak.status === 'bevestigd' ? 'Weigeren' : 'Weigeren'}
              </button>

              {/* 
              <button
                className="cancel-button"
                onClick={() => handleCancelConfirm(afspraak.id)}
              >
                Annuleren
              </button>
              */}
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
