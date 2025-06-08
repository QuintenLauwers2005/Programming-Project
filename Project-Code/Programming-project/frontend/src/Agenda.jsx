// src/Agenda.jsx
import React, { useState } from "react";
import "./Assets/Agenda.css";
import Navbar from './Components/Navbar';

function Agenda() {
  const [afspraken, setAfspraken] = useState([
    { id: 1, time: "14:45", company: "Delaware", room: "Aula 1" },
    { id: 2, time: "14:45", company: "Zylo", room: "Aula 2" },
    { id: 3, time: "14:45", company: "Velto", room: "Aula 3" },
    { id: 4, time: "14:45", company: "Klyr", room: "Aula 4" }
  ]);

  const [showInfo, setShowInfo] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  const handleCancelConfirm = (id) => {
    setCancelId(id);
  };

  const confirmCancel = () => {
    setAfspraken(prev => prev.filter(afspraak => afspraak.id !== cancelId));
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

        {afspraken.map(afspraak => (
          <div className="card" key={afspraak.id}>
            <div className="time">{afspraak.time}</div>
            <div className="company">{afspraak.company}</div>
            <div className="room">{afspraak.room}</div>
            <button
              className="cancel-button"
              onClick={() => handleCancelConfirm(afspraak.id)}
            >
              Annuleren
            </button>
          </div>
        ))}
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

export default Agenda;
