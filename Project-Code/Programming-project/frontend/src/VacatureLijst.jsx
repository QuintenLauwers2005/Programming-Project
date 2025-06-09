import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assets/VacatureLijst.css';
import Navbar from './Components/Navbar';

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Fetch vacatures from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/vacatures')
      .then((res) => {
        console.log("Ophaalde vacatures:", res.data);
        setVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, []);

  // Function to get color code based on the company's color
  const getColorCode = (kleur) => {
    switch (kleur) {
      case 'blauw': return '#4a90e2';
      case 'groen': return '#50c878';
      case 'geel': return '#ffcc00';
      case 'paars': return '#800080';
      case 'rood': return '#ff0000';
      default: return '#ccc';
    }
  };

  // Handle selecting a vacature and showing the modal
  const handleSelectVacature = (vacature) => {
    setSelectedVacature(vacature);
    setShowModal(true);
  };

  // Handle form submission
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Kies een datum en tijdstip');
      return;
    }

    // Store the selected date and time
    const selectedData = {
      vacatureId: selectedVacature.vacature_id,
      date: selectedDate,
      time: selectedTime
    };

    // Save to localStorage or send to backend
    // For now, just redirect to Agenda with query params
    window.location.href = `/Agenda?vacatureId=${selectedVacature.vacature_id}&date=${selectedDate}&time=${selectedTime}`;
    setShowModal(false);
  };

  return (
    <div className="pagina">
      {/* Header with Navbar */}
      <header>
        <Navbar />
      </header>

      <main className="inhoud">
        <h2>Vacatures</h2>
        <button className="filter-btn" onClick={() => alert('Filter geklikt!')}>Filter</button>

        <div className="vacature-list">
          {vacatures.map((vacature) => (
            <div key={vacature.vacature_id} className="vacature-card">
              <div 
                className="logo-blok" 
                style={{ backgroundColor: getColorCode(vacature.kleur) }}
              ></div>
              <div className="vacature-info">
                <p className="bedrijf">{vacature.bedrijf}</p>
                <p className="beschrijving">{vacature.synopsis}</p>
                <p className="functie">
                  Functie: {vacature.functie}<br />
                  Contract: {vacature.contract_type}
                </p>
                <button 
                  className="reserveer-btn" 
                  onClick={() => handleSelectVacature(vacature)}
                >
                  Reserveer gesprek
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="toonmeer-btn" onClick={() => alert('Toon meer geklikt!')}>Toon meer</button>
      </main>

      {/* Modal for selecting date and time */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Kies datum en tijdstip</h3>
            <label>Datum:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <label>Tijdstip:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleConfirm}>Bevestigen</button>
              <button onClick={() => setShowModal(false)}>Annuleren</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}