import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/VacaturePage.css';
import Footer from '../Components/Footer';

export default function AdminVacatureAanpassen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vacature, setVacature] = useState({
    functie: '',
    synopsis: '',
    contract_type: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vacature ophalen bij laden van pagina
  useEffect(() => {
    axios.get(`http://localhost:5000/api/vacature/${id}`)
      .then((res) => {
        setVacature(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Vacature kon niet worden opgehaald.');
        setLoading(false);
      });
  }, [id]);

  // Wijzigingen in formulier bijhouden
  const handleChange = (e) => {
    setVacature({ ...vacature, [e.target.name]: e.target.value });
  };

  // Vacature opslaan
  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/vacaturee/${id}`, vacature)
      .then(() => {
        navigate('/admin/vacatures');
      })
      .catch(() => {
        alert('Fout bij bijwerken van vacature.');
      });
  };

  // Vacature verwijderen
  const handleDelete = () => {
    if (window.confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) {
      axios.delete(`http://localhost:5000/api/vacature/${id}`)
        .then(() => {
          navigate('/admin/vacatures');
        })
        .catch(() => {
          alert('Fout bij verwijderen van vacature.');
        });
    }
  };

  if (loading) return <p>Bezig met laden...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pagina">
      <header className="bovenbalk">
        <img src="/delaware-logo.png" alt="Delaware logo" className="logo-delaware" />
        <img src="/erasmus-logo.png" alt="Erasmus logo" className="logo-erasmus" />
      </header>

      <main className="inhoud">
        <h1>Vacature bewerken</h1>

        <section className="sectie">
          <label>Functie:</label>
          <input
            type="text"
            name="functie"
            value={vacature.functie}
            onChange={handleChange}
            className="input"
          />
        </section>

        <section className="sectie">
          <label>Synopsis:</label>
          <textarea
            name="synopsis"
            value={vacature.synopsis}
            onChange={handleChange}
            className="textarea"
          />
        </section>

        <section className="sectie">
          <label>Contracttype:</label>
          <select
            name="contract_type"
            value={vacature.contract_type}
            onChange={handleChange}
            className="input"
          >
            <option value="Stage">Stage</option>
            <option value="Fulltime">Fulltime</option>
            <option value="Parttime">Parttime</option>
          </select>
        </section>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button className="post-knop" onClick={handleUpdate}>Opslaan</button>
          <button
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
            onClick={handleDelete}
          >
            Verwijder
          </button>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
