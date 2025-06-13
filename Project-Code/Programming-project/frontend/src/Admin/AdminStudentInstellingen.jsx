import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

export default function AdminStudentInstellingen() {
  const { id } = useParams(); // student id uit URL
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    voornaam: '',
    naam: '',
    email: '',
    adres: '',
    specialisatie: '',
    linkedin: ''
  });

  useEffect(() => {
    // studentgegevens ophalen bij component mount of id wijziging
    axios.get(`http://localhost:5000/api/student/${id}`)
      .then((res) => {
        setStudent(res.data);
        setForm({
          voornaam: res.data.voornaam || '',
          naam: res.data.naam || '',
          email: res.data.email || '',
          adres: res.data.adres || '',
          specialisatie: res.data.specialisatie || '',
          linkedin: res.data.linkedin_url || ''  // let op: backend stuurt linkedin_url
        });
      })
      .catch((err) => {
        console.error("Fout bij ophalen studentgegevens:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/student/${id}`, form)
      .then(() => {
        alert("Gegevens succesvol bijgewerkt!");
      })
      .catch((err) => {
        console.error("Fout bij updaten student:", err);
        alert("Er is een fout opgetreden bij het bijwerken van de gegevens.");
      });
  };

  if (!student) return <p>Studentgegevens laden...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Navbar />

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Studentgegevens aanpassen</h2>
        <p>Je kan hier de gegevens van <strong>{form.voornaam} {form.naam}</strong> aanpassen.</p>
      </section>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <input
          name="voornaam"
          type="text"
          placeholder="voornaam"
          value={form.voornaam}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="naam"
          type="text"
          placeholder="naam"
          value={form.naam}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="adres"
          placeholder="Adres"
          value={form.adres}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="specialisatie"
          placeholder="Specialisatie"
          value={form.specialisatie}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="linkedin"
          placeholder="LinkedIn"
          value={form.linkedin}
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
