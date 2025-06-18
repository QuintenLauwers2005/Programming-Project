import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/BedrijfNavBar';
import Footer from '../Components/Footer';
import LogoUploadForm from '../Components/LogoUpload';

export default function BedrijfInstellingen() {
  const navigate = useNavigate();
  const { id } = useParams(); 
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
        navigate(`/BedrijfBedrijfProfilePage`);
      })
      .catch((err) => {
        console.error("Fout bij updaten bedrijf:", err);
      });
  };

  if (!bedrijf) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Bedrijfgegevens laden...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Navbar />

      <section style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        <h2>Bedrijfgegevens aanpassen</h2>
        <p>Je kan hier de gegevens van <strong>{form.naam}</strong> aanpassen.</p>
      </section>

      {/* Gecentreerde wrapper voor logo + form */}
      <div style={{ maxWidth: '500px', margin: '0 auto', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <LogoUploadForm />
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            name="naam"
            type="text"
            placeholder="Naam"
            value={form.naam}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="url"
            type="url"
            placeholder="URL"
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
            type="tel"
            placeholder="Telefoon"
            value={form.telefoon}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Opslaan</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '1em'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#4a90e2',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1em',
  cursor: 'pointer'
};

