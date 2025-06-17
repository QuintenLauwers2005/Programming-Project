import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/StudentNavbar';
import UploadForm from '../Components/Uploadform';
import CvUpload from '../Components/CvUpload';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function RegistratiePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    voornaam: '',
    naam: '',
    email: '',
    adres: '',
    specialisatie: '',
    linkedinurl: '',
    bio: '',
    telefoon: ''
  });

  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('gebruiker_id');
    if (!id) {
      alert('Geen student-ID gevonden. Log opnieuw in.');
      return;
    }

    setStudentId(id);

    axios.get(`http://localhost:5000/api/student/${id}`)
      .then(res => {
        const student = res.data;
        const [voornaam, ...restNaam] = (student.name || '').split(' ');
        const naam = restNaam.join(' ');

        setForm({
          voornaam: voornaam || '',
          naam: naam || '',
          email: student.email || '',
          adres: student.adres || '',
          specialisatie: student.specialisatie || '',
          linkedinurl: student.linkedinurl || '',
          bio: student.bio || '',
          telefoon: student.telefoon || ''
        });
      })
      .catch(err => {
        console.error("Fout bij ophalen studentgegevens:", err);
      });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/student/${studentId}`, {
      voornaam: form.voornaam,
      naam: form.naam,
      email: form.email,
      adres: form.adres,
      specialisatie: form.specialisatie,
      linkedinurl: form.linkedinurl,
      bio: form.bio,
      telefoon: form.telefoon
    })
      .then(() => {
        alert('Gegevens succesvol opgeslagen!');
      })
      .catch((err) => {
        console.error('Fout bij opslaan student:', err);
        alert('Er ging iets mis bij het opslaan.');
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Instellingen</h2>
        <p>Je kan hier jouw gegevens aanpassen.</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UploadForm />
          <CvUpload />
        </div>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="adres"
            placeholder="Adres"
            value={form.adres}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="specialisatie"
            placeholder="Specialisatie"
            value={form.specialisatie}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="linkedinurl"
            placeholder="linkedinurl"
            value={form.linkedinurl}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="telefoon"
            placeholder="Telefoon"
            value={form.telefoon}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="bio"
            placeholder="Biografie"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Opslaan
          </button>
        </form>
      </section>

      <footer>
        <Footer />
      </footer>
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
