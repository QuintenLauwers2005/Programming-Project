import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Vul zowel e-mailadres als wachtwoord in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      const { gebruiker_id, rol, naam,logo_link,message } = response.data;

      console.log('Login response:', response.data);

      localStorage.setItem('gebruiker_id', gebruiker_id);
      localStorage.setItem('rol', rol);

      // Naam alleen opslaan als die bestaat (dus bij studenten)
      if (naam) {
        localStorage.setItem('naam', naam);
        localStorage.removeItem('Bedrijf_Logo')
      } else if(logo_link) {
        localStorage.removeItem('naam')
        localStorage.setItem('Bedrijf_Logo',logo_link); // schoonmaken indien geen naam
      }

      alert(message || 'Succesvol ingelogd!');

      setTimeout(() => {
        if(localStorage.getItem('rol') == 'student')
        navigate('/HomePageStudent');  // ga naar home na logins
      }, 100);

    } catch (err) {
      const foutmelding = err.response?.data?.error || 'Login mislukt. Controleer je gegevens.';
      alert(foutmelding);
      console.error('Login fout:', err);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Login</h2>
        <p>Log in om toegang te krijgen tot je profiel en vacatures.</p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              placeholder="Email"
            />
          </div>

          <div>
            <label>Wachtwoord:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              placeholder="Wachtwoord"
            />
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
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Inloggen
          </button>
        </form>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Nog geen account?{' '}
          <button
            onClick={() => navigate('/registratie')}
            style={{
              color: '#4a90e2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Registreer hier
          </button>
        </p>
      </section>

      <footer
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}
