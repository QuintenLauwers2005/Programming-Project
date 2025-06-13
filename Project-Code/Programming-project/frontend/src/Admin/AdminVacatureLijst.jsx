import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/VacatureLijst.css';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AdminVacatureLijst() {
  const [vacatures, setVacatures] = useState([]);
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.clear();         // Verwijder gebruiker_id en andere data
    navigate('/login');           // Navigeer naar loginpagina
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
  const handleOpenModal = (vacature) => {
    setSelectedVacature(vacature);
    setSelectedTime('');
    setShowModal(true);
  };

  return (
    <div className="pagina">
      {/* Header with Navbar */}
      <header>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Uitloggen
          </button>
        </div>
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

        <section className="enhanced-box">
  <div className="vacature-wrapper">
    <div className="vacature-list">
      {filteredVacatures.map((vacature) => (
        <div key={vacature.vacature_id} className="vacature-card">
          <div className="logo-blok">
            <img
              src={`/${vacature.logo_link}`}
              alt={`logo van ${vacature.bedrijf}`}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          </div>
          <div className="vacature-info">
            <p className="bedrijf">{vacature.bedrijf}</p>
            <p className="beschrijving">{vacature.synopsis}</p>
            <p className="functie">
              Functie: {vacature.functie}
              <br />
              Contract: {vacature.contract_type}
            </p>
            <button
              onClick={() => handleOpenModal(vacature)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.9em'
              }}
            >
              Reserveer gesprek
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


        <button className="toonmeer-btn" onClick={() => alert('Toon meer geklikt!')}>Toon meer</button>
      </main>

      {/* Modal for selecting time */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <h3>Kies een tijdstip</h3>
            <label style={{ display: 'block', margin: '10px 0 5px' }}>Tijdstip:</label>
            <select
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            >
              <option value="">Selecteer tijd</option>
              {generateTimeOptions()}
            </select>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={handleConfirm}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Bevestigen
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Annuleren
              </button>
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