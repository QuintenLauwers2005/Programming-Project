import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/StudentNavbar';
import UploadForm from '../Components/Uploadform';
import CvUpload from '../Components/CvUpload';
import axios from 'axios';

export default function RegistratiePage() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");

  const gebruikerId = localStorage.getItem('gebruiker_id');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (inputSkill.trim() && !skills.includes(inputSkill.trim())) {
      const newSkills = [...skills, inputSkill.trim()];
      setSkills(newSkills);
      setInputSkill("");

      // Opslaan naar backend
      axios.post(`http://localhost:5000/api/student/${gebruikerId}/skills`, { skills: newSkills })
        .then(() => console.log('Vaardigheden opgeslagen'))
        .catch((err) => console.error('Fout bij opslaan vaardigheden:', err));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);

    // Bijwerken backend
    axios.post(`http://localhost:5000/api/student/${gebruikerId}/skills`, { skills: updatedSkills })
      .then(() => console.log('Vaardigheden bijgewerkt'))
      .catch((err) => console.error('Fout bij bijwerken vaardigheden:', err));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>instellingen</h2>
        <p>Je kan hier jouw gegevens aanpassen.</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UploadForm />
          <CvUpload />
        </div>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form>
          <input type="email" placeholder="Email" style={inputStyle} required />
          <input type="password" placeholder="Wachtwoord" style={inputStyle} required />
          <input type="text" placeholder="Adres" style={inputStyle} required />
          <input type="text" placeholder="Specialisatie" style={inputStyle} required />
          <input type="text" placeholder="LinkedIn" style={inputStyle} />

          <div style={{ marginBottom: '15px' }}>
            <label>Vaardigheden</label>
            <div style={{ display: 'flex', marginTop: '5px' }}>
              <input
                type="text"
                placeholder="Voeg een vaardigheid toe"
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                style={{ ...inputStyle, marginRight: '10px', flex: 1 }}
              />
              <button
                onClick={handleAddSkill}
                style={{ padding: '10px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px' }}>
                +
              </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
              {skills.map(skill => (
                <li key={skill} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', background: '#f1f1f1', padding: '5px 10px', borderRadius: '4px' }}>
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} style={{ background: 'none', border: 'none', color: '#e00', cursor: 'pointer' }}>✕</button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
