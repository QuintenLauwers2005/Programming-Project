import React, { useState } from 'react';
import '../Components/VacaturePage.css';
import Footer from '../Components/Footer';
import NavBar from '../Components/BedrijfNavBar';
import axios from 'axios';

export default function VacaturePage() {
  const [form, setForm] = useState({
    functie: '',
    synopsis: '',
    contract_type: ''
  });

  const gebruiker_id = localStorage.getItem('gebruiker_id'); // bedrijf_id

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gebruiker_id) {
      alert("Gebruiker niet ingelogd.");
      return;
    }

    axios.post('http://localhost:5000/api/vacatures', {
      ...form,
      bedrijf_id: gebruiker_id
    })
      .then(() => {
        alert("Vacature succesvol aangemaakt.");
        setForm({ functie: '', synopsis: '', contract_type: '' });
      })
      .catch(err => {
        console.error(err);
        alert("Fout bij het aanmaken van de vacature.");
      });
  };

  return (
    <div className="pagina">
      <NavBar />

      <main className="inhoud">
        <h1>Nieuwe vacature</h1>

<div className='nieuwevacature-container'>
<form onSubmit={handleSubmit}>
          <section className="sectie">
  <h3>Functie:</h3>
  <input
    className="functie-box"
    type="text"
    name="functie"
    value={form.functie}
    onChange={handleChange}
    required
  />
</section>

<section className="sectie">
  <h3>Contracttype:</h3>
  <select
    className="contracttype-box"
    name="contract_type"
    value={form.contract_type}
    onChange={handleChange}
    required
  >
    <option value="">-- Kies type --</option>
    <option value="Stage">Stage</option>
    <option value="Volltijds">Volltijds</option>
    <option value="Deeltijds">Deeltijds</option>
  </select>
</section>


          <section className="sectie">
            <h3>Synopsis:</h3>
            <textarea
              className="tekst-box"
              name="synopsis"
              value={form.synopsis}
              onChange={handleChange}
              required
            />
          </section>

          <button className="post-knop" type="submit">Post</button>
        </form>
</div>
        
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
