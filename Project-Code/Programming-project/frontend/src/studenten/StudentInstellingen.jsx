import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/StudentNavbar';
import UploadForm from '../Components/Uploadform';
import CvUpload from '../Components/CvUpload';
import axios from 'axios';

export default function RegistratiePage() {
  const navigate = useNavigate();
  const gebruikerId = localStorage.getItem('gebruiker_id');

  const [form, setForm] = useState({
    voornaam: '',
    naam: '',
    email: '',
    adres: '',
    specialisatie: '',
    opleiding: '', // ✅ toegevoegd
    linkedin: '',
    bio: '',
    skills: []
  });

  const [inputSkill, setInputSkill] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/student/${gebruikerId}`)
      .then(res => {
        const fullName = res.data.name || '';
        const [voornaam, ...rest] = fullName.trim().split(' ');
        const naam = rest.join(' ');

        const skills = res.data.vaardigheden?.map(v => v.naam) || [];

        setForm({
          voornaam: voornaam || '',
          naam: naam || '',
          email: res.data.email || '',
          adres: res.data.adres || '',
          specialisatie: res.data.specialisatie || '',
          opleiding: res.data.opleiding || '', // ✅ toegevoegd
          linkedin: res.data.linkedinurl || '',
          bio: res.data.bio || '',
          skills: skills
        });
      })
      .catch(err => console.error('Fout bij ophalen studentgegevens:', err));
  }, [gebruikerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = inputSkill.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
      setInputSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Update studentinfo (inclusief opleiding)
      await axios.put(`http://localhost:5000/api/student/${gebruikerId}`, {
        voornaam: form.voornaam,
        naam: form.naam,
        email: form.email,
        adres: form.adres,
        specialisatie: form.specialisatie,
        opleiding: form.opleiding, // ✅ toegevoegd
        linkedin: form.linkedin,
        bio: form.bio
      });

      // 2. Update skills
      await axios.put(`http://localhost:5000/api/student/${gebruikerId}/skills`, {
        skills: form.skills
      });

      navigate('/StudentProfilePage');
    } catch (err) {
      console.error('Fout bij opslaan studentgegevens of skills:', err);
      alert('Er is een fout opgetreden bij het opslaan');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
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
            type="text"
            name="voornaam"
            value={form.voornaam}
            hidden
            style={inputStyle}
            placeholder="Voornaam"
          />
          <input
            type="text"
            name="naam"
            value={form.naam}
            hidden
            style={inputStyle}
            placeholder="Achternaam"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="adres"
            placeholder="Adres"
            value={form.adres}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="specialisatie"
            placeholder="Specialisatie"
            value={form.specialisatie}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="opleiding"
            placeholder="Opleiding"
            value={form.opleiding}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            value={form.linkedin}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <textarea
            name="bio"
            placeholder="Biografie"
            value={form.bio}
            onChange={handleInputChange}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          {/* Skills */}
          <div style={{ marginBottom: '15px' }}>
            <label>Vaardigheden</label>
            <div style={{ display: 'flex', marginTop: '5px' }}>
              <input
                type="text"
                placeholder="Voeg een vaardigheid toe"
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                style={{
                  ...inputStyle,
                  marginRight: '10px',
                  flex: 1,
                  height: '40px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleAddSkill}
                style={{
                  padding: '0 16px',
                  height: '40px',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  lineHeight: '1'
                }}
              >
                +
              </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
              {form.skills.map(skill => (
                <li key={skill} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px',
                  background: '#f1f1f1',
                  padding: '5px 10px',
                  borderRadius: '4px'
                }}>
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e00',
                      cursor: 'pointer'
                    }}
                  >✕</button>
                </li>
              ))}
            </ul>
          </div>

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
            }}>
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
