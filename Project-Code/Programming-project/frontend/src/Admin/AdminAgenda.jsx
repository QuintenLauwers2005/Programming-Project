import React, { useState, useEffect } from 'react';
import '../Assets/Agenda.css';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

export default function AdminAgenda() {
  const [afspraken, setAfspraken] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [tijdConfig, setTijdConfig] = useState({ beginuur: '', einduur: '' });
  const [formData, setFormData] = useState({ beginuur: '', einduur: '' });

  useEffect(() => {
    // Afspraken ophalen
    fetch('http://localhost:5000/api/afspraken/all')
      .then(res => res.json())
      .then(data => setAfspraken(data))
      .catch(err => console.error('Fout bij ophalen van afspraken:', err));

    // Tijdconfiguratie ophalen
    fetch('http://localhost:5000/api/speeddate-config')
      .then(res => res.json())
      .then(data => {
        setTijdConfig(data);
        setFormData(data);
      })
      .catch(err => console.error('Fout bij ophalen tijdsconfiguratie:', err));
  }, []);

  const handleCancelConfirm = (id) => setCancelId(id);

  const confirmCancel = () => {
    fetch(`http://localhost:5000/api/speeddate/${cancelId}`, { method: 'DELETE' })
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

  const closeCancelModal = () => setCancelId(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveTijden = () => {
    if (!formData.beginuur || !formData.einduur) {
      alert('Vul beide tijden in.');
      return;
    }

    fetch('http://localhost:5000/api/speeddate-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert('Tijdschema succesvol aangepast.');
        setTijdConfig(formData);
      })
      .catch(err => {
        console.error('Fout bij opslaan tijdconfig:', err);
        alert('Opslaan mislukt.');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="page">

        <button className="top-button" onClick={() => setShowInfo(true)}>
          Hoe speeddate reserveren?
        </button>

        {/* ⏰ Tijdconfiguratie formulier */}
        <div className="time-settings">
          <h3>speeddate uren aanpassen</h3>
          <label>Beginuur:</label>
          <input
            type="time"
            name="beginuur"
            value={formData.beginuur}
            onChange={handleFormChange}
          />
          <label>Einduur:</label>
          <input
            type="time"
            name="einduur"
            value={formData.einduur}
            onChange={handleFormChange}
          />
          <button onClick={handleSaveTijden} className="save-button">Opslaan</button>
        </div>

        {/* 🗓️ Afsprakenlijst */}
        {afspraken.length > 0 ? (
          afspraken.map(afspraak => (
            <div key={afspraak.id} className="card">
              <div className="time">{afspraak.time}</div>
              <div className="company">
                {afspraak.voornaam} {afspraak.naam} — {afspraak.bedrijf_naam}
              </div>
              <div className="room">{afspraak.locatie}</div>
              <button
                className="cancel-button"
                onClick={() => handleCancelConfirm(afspraak.id)}
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

      {/* ℹ️ Info Modal */}
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

      {/* ❌ Annulatiebevestiging */}
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
