import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assets/VacatureLijst.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function VacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [filters, setFilters] = useState({
    bedrijf: '',
    functie: '',
    contractType: ''
  });

  // Fetch vacatures from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/vacatures')
      .then((res) => {    
        setVacatures(res.data);
        setFilteredVacatures(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters
  useEffect(() => {
    let filtered = vacatures;

    if (filters.bedrijf) {
      filtered = filtered.filter(v => v.bedrijf.toLowerCase().includes(filters.bedrijf.toLowerCase()));
    }

    if (filters.functie) {
      filtered = filtered.filter(v => v.functie.toLowerCase().includes(filters.functie.toLowerCase()));
    }

    if (filters.contractType) {
      filtered = filtered.filter(v => v.contract_type.toLowerCase().includes(filters.contractType.toLowerCase()));
    }

    setFilteredVacatures(filtered);
  }, [filters, vacatures]);

  // Handle selecting a vacature and showing the modal
  const handleSelectVacature = (vacature) => {
    setSelectedVacature(vacature);
    setShowModal(true);
  };

  // Handle form submission
  const handleConfirm = () => {
    if (!selectedTime) {
      alert('Kies een tijdstip');
      return;
    }

    // Store the selected date and time
    const selectedData = {
      vacatureId: selectedVacature.vacature_id,
      time: selectedTime
    };

    // Save to localStorage or send to backend
    // For now, just redirect to Agenda with query params
    axios.post('http://localhost:5000/api/speeddate', {
    student_id: 1,
    bedrijf_id: selectedVacature.bedrijf_id,
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
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return options;
  };

  return (
    <div className="pagina">
      {/* Header with Navbar */}
      <header>
        <Navbar />
      </header>

      <main className="inhoud">
        <h2>Vacatures</h2>

        {/* Filter Form */}
        <div className="filter-form">
          <input
            type="text"
            name="bedrijf"
            placeholder="Bedrijf"
            value={filters.bedrijf}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="functie"
            placeholder="Functie"
            value={filters.functie}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="contractType"
            placeholder="Contracttype"
            value={filters.contractType}
            onChange={handleFilterChange}
          />
        </div>

        <div className="vacature-list">
          {filteredVacatures.map((vacature) => (
            <div key={vacature.vacature_id} className="vacature-card">
              <div className="logo-blok" >
                <img 
          src={`/${vacature.logo_link}`} 
          style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} 
        /></div>
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

      {/* Modal for selecting time */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Kies een tijdstip</h3>
            <label>Tijdstip:</label>
<select
  value={selectedTime}
  onChange={(e) => setSelectedTime(e.target.value)}
>
  {generateTimeOptions()}
</select>
            <div className="modal-buttons">
              <button onClick={handleConfirm}>Bevestigen</button>
              <button onClick={() => setShowModal(false)}>Annuleren</button>
            </div>
          </div>
        </div>
      )}
      <footer>
       <Footer />
      </footer>
    </div>
  );
}