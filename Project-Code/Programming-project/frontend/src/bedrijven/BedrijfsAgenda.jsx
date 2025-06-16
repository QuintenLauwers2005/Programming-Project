import React, { useState, useEffect } from 'react';
import '../Assets/Agenda.css';
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

  useEffect(() => {
    if (!gebruiker_id) return; // veiligheid

    fetch(`http://localhost:5000/api/afspraken?gebruiker_id=${gebruiker_id}`)
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
          afspraken.map(afspraak => {
            console.log('afspraak:', afspraak); // Debug: check wat er in afspraak zit
            return (
              <div key={afspraak.id} className="card">
                <div className="time">{afspraak.time}</div>
                <div className="company">
                  {afspraak.voornaam} {afspraak.naam} — {afspraak.bedrijf_naam}
                </div>
                <div className="room">{afspraak.locatie}</div>
                <div>Status: {afspraak.status}</div>

                {/* Toggle status */}
                <button
                  className="weigenKnopAdmin"
                  onClick={() => toggleStatus(afspraak.id, afspraak.status)}
                >
                  {afspraak.status === 'bevestigd' ? 'Weigeren' : 'Bevestigen'}
                </button>

                {/* Bekijk studentprofiel */}
                <button
                  className="view-button"
                  onClick={() => {
                    if (afspraak.student_id) {
                      console.log(afspraak.student_id);
                      
                      navigate(`/student-info/${afspraak.student_id}`);

                    } else {
                      alert('Geen student_id beschikbaar voor deze afspraak.');
                    }
                  }}
                >
                  Bekijk studentprofiel
                </button>

                {/* Annuleren knop */}
                <button
                  className="cancel-button"
                  onClick={() => handleCancelConfirm(afspraak.id)}
                >
                  Annuleren
                </button>
              </div>
            );
          })
        ) : (
          <div className="no-appointments">
            <p>Geen afspraken gevonden.</p>
          </div>
        )}
      </div>

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

      <Footer />
    </div>
  );
}
