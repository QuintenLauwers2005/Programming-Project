import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AdminStudentInstellingen() {
  const navigate = useNavigate();
  const { id } = useParams(); // student id uit URL 
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({
    voornaam: '',
    naam: '',
    email: '',
    adres: '',
    specialisatie: '',
    linkedin: '',
    bio: '',
    opleiding: '',  // nieuw veld toegevoegd
  }); 

  useEffect(() => {
     const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    console.log('Geen geldige sessie, graag opnieuw inloggen.');
    return;
  }
    // studentgegevens ophalen bij component mount of id wijziging
   axios.get(`http://localhost:5000/api/student/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
      }).then((res) => {
        setStudent(res.data);
        const fullName = res.data.name || '';
        const [voornaam, ...rest] = fullName.trim().split(' ');
        const naam = rest.join(' '); // vang "De Smet", "van den Berg", enz.
        console.log("Studentdata binnengekomen:", res.data);

        setForm({
          voornaam: voornaam || '',
          naam: naam || '',
          email: res.data.email || '',
          adres: res.data.adres || '',
          specialisatie: res.data.specialisatie || '',
          linkedin: res.data.linkedinurl || '',
          bio: res.data.bio || '',
          opleiding: res.data.opleiding || '',  // nieuw veld meegegeven
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

    axios.put(`http://localhost:5000/api/student/${id}`, {
      ...form,
      linkedin_url: form.linkedin,  // veldnaam volgens backend
      opleiding: form.opleiding,    // nieuw veld meegestuurd
    })
      .then(() => {
        navigate(`/admin/student/${id}/profiel`);
      })
      .catch((err) => {
        console.error("Fout bij updaten student:", err);
        alert("Er is een fout opgetreden bij het bijwerken van de gegevens.");
      });
  };

  if (!student) return <p>Studentgegevens laden...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
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
          name="opleiding"
          placeholder="Opleiding"
          value={form.opleiding}
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

        <textarea
          name="bio"
          placeholder="Biografie"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <button type="submit" style={buttonStyle}>Opslaan</button>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Ben je zeker dat je deze student wil verwijderen?")) {
              axios.delete(`http://localhost:5000/api/student/${id}`)
                .then(() => {
                  navigate("/AdminStudentenLijst"); // pas aan naar juiste route
                })
                .catch(err => {
                  console.error("Fout bij verwijderen student:", err);
                });
            }
          }}
          style={{ ...buttonStyle, backgroundColor: 'red', marginTop: '10px', marginRight: '2px' }}
        >
          Verwijder Student
        </button>
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
