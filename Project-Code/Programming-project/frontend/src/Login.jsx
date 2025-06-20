import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import axios from 'axios';
import eyeIconPath from './Assets/eye-empty.svg';
import eyeSlashIconPath from './Assets/eye-off.svg';
import Footer from './Components/Footer';
import './login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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

      // Let op: backend moet hier een token terugsturen
      const { token, gebruiker_id, rol, naam, logo_link, message } = response.data;

      // JWT-token opslaan
      localStorage.setItem('token', token);

      localStorage.setItem('gebruiker_id', gebruiker_id);
      localStorage.setItem('rol', rol); 

      if (naam) {
        localStorage.setItem('naam', naam);
        localStorage.removeItem('Bedrijf_Logo');
      } else if (logo_link) {
        localStorage.removeItem('naam');
        localStorage.setItem('Bedrijf_Logo', logo_link);
      }

      console.log(message);

      setTimeout(() => {
        if(localStorage.getItem('rol') === 'student')
          navigate('/HomePageStudent');
        else if(localStorage.getItem('rol') === 'bedrijf')
          navigate('/BedrijfHomePage');
        else if(localStorage.getItem('rol') === 'admin')
          navigate('/HomePageAdmin');
      }, 100);

    } catch (err) {
      const foutmelding = err.response?.data?.error || 'Login mislukt. Controleer je gegevens.';
      alert(foutmelding);
      console.error('Login fout:', err);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Login</h2>
        <p>Log in om toegang te krijgen tot je profiel en vacatures.</p>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              placeholder="Email"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Wachtwoord:</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
                placeholder="Wachtwoord"
              />
              <button 
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                style={{
                  position: 'absolute',
                  right: '0px',
                  top: '0px',
                  height: '100%',
                  width: '40px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Wachtwoord zichtbaarheid wisselen"
              >
                <img 
                  src={passwordVisible ? eyeSlashIconPath : eyeIconPath} 
                  alt="Wachtwoord zichtbaarheid wisselen" 
                  style={{ height: '20px', width: '20px', opacity: 0.7 }} 
                />
              </button>
            </div>
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

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
