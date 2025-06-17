import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/VacatureLijst.css';
import Navbar from '../Components/StudentNavbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function StudentVacatureLijst() {
  const navigate = useNavigate();

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
  const [timeConfig, setTimeConfig] = useState({
    beginuur: '08:00:00',
    einduur: '18:00:00'
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 2;

  // Vacatures ophalen met paginering
  const fetchVacatures = (pageNum = 1) => {
    axios.get(`http://localhost:5000/api/vacatures?page=${pageNum}&limit=${limit}`)
      .then((res) => {
        if (res.data.length < limit) {
          setHasMore(false); // Geen volgende pagina meer
        }
        if (pageNum === 1) {
          setVacatures(res.data);
        } else {
          setVacatures(prev => [...prev, ...res.data]);
        }
      })
      .catch((err) => {
        console.error('Fout bij ophalen vacatures:', err.message);
      });
  };

  useEffect(() => {
    fetchVacatures(1);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/speeddate-config')
      .then((res) => {
        setTimeConfig(res.data);
      })
      .catch((err) => {
        console.error('Fout bij ophalen tijdsconfiguratie:', err.message);
      });
  }, []);

  // Filters toepassen op de volledige lijst
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

  // Scroll event om nieuwe pagina te laden
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight + 100 >= fullHeight && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  // Nieuwe pagina vacatures ophalen als page verandert
  useEffect(() => {
    if (page === 1) return; // Eerste pagina al geladen bij init

    fetchVacatures(page);
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      alert('Kies een tijdstip');
      return;
    }

    axios.post('http://localhost:5000/api/speeddate', {
      student_id: localStorage.getItem("gebruiker_id"),
      bedrijf_id: selectedVacature.bedrijf_id,
      tijdstip: selectedTime + ':00',
      locatie: selectedVacature.aula,
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

    const [startHour, startMinute] = timeConfig.beginuur.split(':').map(Number);
    const [endHour, endMinute] = timeConfig.einduur.split(':').map(Number);

    let current = new Date();
    current.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    while (current <= end) {
      const hours = String(current.getHours()).padStart(2, '0');
      const minutes = String(current.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes}`;
      options.push(<option key={time} value={time}>{time}</option>);
      current.setMinutes(current.getMinutes() + 10);
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
      <header>
        <Navbar />
      </header>

      <main className="inhoud">
        <h2>Vacatures</h2>

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
                      src={`http://localhost:5000${vacature.logo_link}`}
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
                    <p 
                      className="bedrijf" 
                      style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                      onClick={() => navigate(`/BedrijfProfileStudent/${vacature.bedrijf_id}`)}
                    >
                      {vacature.bedrijf}
                    </p>
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

        {!hasMore && (
          <div style={{ textAlign: 'center', marginTop: '1rem', color: '#555' }}>
            Geen vacatures meer om te laden
          </div>
        )}
      </main>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
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
