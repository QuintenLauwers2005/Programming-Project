import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/StudentNavbar';
import UploadForm from '../Components/Uploadform';
import CvUpload from '../Components/CvUpload';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function RegistratiePage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header>
        <Navbar />
      </header>

      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>instellingen</h2>
        <p>
           Je kan hier jouw gegevens aanpassen.
        </p>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <UploadForm />
         <CvUpload />
        </div>
      </section>

      <section style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>


        <form>

          <input
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />

           <input
            type="Adres"
            placeholder="Adres"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />

          <input
            type="Specialisatie"
            placeholder="Specialisatie"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />

          <input
            type="LinkedIn"
            placeholder="LinkedIn"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          /> 

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
