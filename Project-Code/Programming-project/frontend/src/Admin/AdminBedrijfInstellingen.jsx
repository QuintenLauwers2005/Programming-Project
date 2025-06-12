import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

export default function AdminBedrijfInstellingen() {
  const { id } = useParams(); // haalt bedrijf-id uit de URL
  const [bedrijf, setBedrijf] = useState(null);
  const [form, setForm] = useState({
    naam: '',
    url: '',
    locatie: '',
    vertegenwoordiger: '',
    telefoon: ''
  });

  

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bedrijf/${id}`)
      .then((res) => {
        setBedrijf(res.data);
        setForm({
          naam: res.data.naam || '',
          url: res.data.url || '',
          locatie: res.data.locatie || '',
          vertegenwoordiger: res.data.vertegenwoordiger || '',
          telefoon: res.data.telefoon || ''
        });
      })
      .catch((err) => {
        console.error("Fout bij ophalen bedrijfgegevens:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/bedrijf/${id}`, form)
      .then(() => {
        alert("Gegevens succesvol bijgewerkt!");
      })
      .catch((err) => {
        console.error("Fout bij updaten bedrijf:", err);
      });
  };

  if (!bedrijf) return <p>Bedrijfgegevens laden...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Navbar />

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Bedrijfgegevens aanpassen</h2>
        <p>Je kan hier de gegevens van <strong>{form.naam}</strong> aanpassen.</p>
      </section>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input 
          name="naam"
          type="text"
          placeholder="naam"
          value={form.naam}
          onChange={handleChange}
          style={inputStyle}
           />
        <input
          name="url"
          type="url"
          placeholder="Url"
          value={form.url}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="locatie"
          placeholder="Locatie"
          value={form.locatie}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="vertegenwoordiger"
          placeholder="Vertegenwoordiger"
          value={form.vertegenwoordiger}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="telefoon"
          type="number"
          placeholder="Telefoon"
          value={form.telefoon}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Opslaan</button>
      </form>

      <Footer />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4a90e2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
