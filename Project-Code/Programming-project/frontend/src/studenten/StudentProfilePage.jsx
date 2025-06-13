import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/StudentNavbar';
import Footer from '../Components/Footer';

function StudentProfilePage() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const studentId = localStorage.getItem('gebruiker_id');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Profielfoto upload
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState('');

  // Custom Toast Component
  const Toast = ({ message, type = 'success', onClose }) => {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 1001,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>{message}</span>
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '16px', 
            cursor: 'pointer' 
          }}
        >
          &times;
        </button>
      </div>
    );
  };

  // Ophalen studentgegevens
  useEffect(() => {
    axios.get(`http://localhost:5000/api/student/${studentId}`)
      .then(res => {
        setStudentData(res.data);
        setCurrentProfilePhoto(res.data.profielFotoUrl || '');
        setLoading(false);
      })
      .catch(err => {
        console.error('Fout bij ophalen student:', err.message);
        setError('Kon studentgegevens niet ophalen');
        setLoading(false);
      });
  }, [studentId]);

  // Upload profielfoto
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePhoto(file);
      // Toon preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setToastMessage('Selecteer een geldig afbeeldingsbestand.');
      setToastType('error');
      setShowToast(true);
    }
  };

  // Verstuur profielfoto naar backend
  const handleUpload = async () => {
    const formData = new FormData();
    if (profilePhoto) formData.append('profielFoto', profilePhoto);
    //if (cvFile) formData.append('cv', cvFile);
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/student/upload/profielFoto/${studentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      // ...
    } catch (err) {
      // ...
    }
  };
  // Sluit toast automatisch na 3 seconden
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (loading) return <p>Studentgegevens laden...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <header style={{ marginBottom: '50px' }}>
        <Navbar />
      </header>

      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Profiel Hoofding */}
        <section style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
          <img
            src={currentProfilePhoto || '/default-profile.jpg'}
            alt={`Profiel van ${studentData.name}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }}
          />

          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2em' }}>{studentData.name}</h2>
            <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{studentData.opleiding}</p>
            <p style={{ margin: '0 20px 15px 0', color: '#555' }}>{studentData.email}</p>

            {/* Knoppen */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => navigate('/StudentInstellingen')}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Aanpassen
              </button>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b02a37'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Uitloggen
              </button>
            </div>
          </div>
        </section>

        {/* Upload Formulier voor profielfoto */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Upload Profielfoto</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Kies een profielfoto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
            />
          </div>

          <button
            onClick={handleUpload}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Upload Foto
          </button>
        </section>

        {/* Over Mij */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Over Mij</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>{studentData.bio}</p>
        </section>

        {/* Opleiding */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Opleiding</h3>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Opleiding:</strong> {studentData.opleiding}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Instelling:</strong> {studentData.instelling}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Verwacht afstudeerjaar:</strong> {studentData.afstudeerjaar}</p>
        </section>

        {/* Vaardigheden */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Vaardigheden</h3>
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {studentData.vaardigheden.map((vaardigheid) => (
              <li
                key={vaardigheid.id || vaardigheid.naam}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9em'
                }}
              >
                {vaardigheid.naam}
              </li>
            ))}
          </ul>
        </section>

        <footer>
          {/* Footer hier */}
        </footer>
      </div>

      <Footer />

      {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
    </div>
  );
}

export default StudentProfilePage;