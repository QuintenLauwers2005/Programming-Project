import React, { useState, useEffect } from 'react';
import './Assets/Agenda.css';
import Navbar from './Components/Navbar';
import { useLocation } from 'react-router-dom';

export default function Agenda() {
  const location = useLocation();
  const [afspraken, setAfspraken] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  // Get selected vacature ID from URL
  const searchParams = new URLSearchParams(location.search);
  const selectedVacatureId = searchParams.get('vacatureId');
  const selectedTime = searchParams.get('time');

  // Simulate adding a new appointment based on selected vacature
  useEffect(() => {
    if (selectedVacatureId  && selectedTime) {
      // In real app, fetch the actual vacature by ID from your backend
      const selectedVacature = {
        bedrijf: "SAP",
        functie: "Business Consultant"
      };
      const newAfspraak = {
        id: afspraken.length + 1,
        time: selectedTime,
        company: selectedVacature.bedrijf,
        room: "Aula 1"
      };
      setAfspraken([newAfspraak]);
    }
  }, [selectedVacatureId, selectedTime]);

  const handleCancelConfirm = (id) => {
    setCancelId(id);
  };

  const confirmCancel = () => {
    setAfspraken(afspraken.filter(app => app.id !== cancelId));
    setCancelId(null);
  };

  const closeCancelModal = () => {
    setCancelId(null);
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
            <div key={afspraak.id} className="card">
              <div className="time">{afspraak.time}</div>
              <div className="company">{afspraak.company}</div>
              <div className="room">Aula 1</div>
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
            <p>Geen afspraken gereserveerd.</p>
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

      {/* Cancel bevestiging modal */}
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
    </div>
  );
}