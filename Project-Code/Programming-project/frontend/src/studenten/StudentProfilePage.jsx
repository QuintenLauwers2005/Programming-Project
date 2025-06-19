import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/StudentNavbar';
import Footer from '../Components/Footer';


function StudentProfilePage() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
   const [cvLink, setCvLink] = useState('');

  const studentId = localStorage.getItem('gebruiker_id');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Ophalen studentgegevens
  useEffect(() => {
  const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    setError('Geen geldige sessie, graag opnieuw inloggen.');
    setLoading(false);
    return;
  }

  axios.get(`http://localhost:5000/api/student/${studentId}`, {
   headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    setStudentData(res.data);
    setLoading(false);
  })
  .catch(err => {
    console.error('Fout bij ophalen student:', err.response?.data || err.message);
    setError('Kon studentgegevens niet ophalen');
    setLoading(false);
  });
}, [studentId]);

   useEffect(() => {
  const userId = localStorage.getItem('gebruiker_id');
  const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    setError('Geen geldige sessie, graag opnieuw inloggen.');
    setLoading(false);
    return;
  }

  axios.get(`http://localhost:5000/api/student/${userId}/cv`, {
   headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
      setCvLink(res.data.cv_link);
    })
    .catch((err) => {
      console.error(err);
      setCvLink(null);
    });
}, []);


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
      
{studentData.profielFotoUrl != null ? (
  <img
    src={`http://localhost:5000${studentData.profielFotoUrl}`}
    alt={`Profiel van ${studentData.profielFotoUrl}`}
    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }}
  />
) : (
  <img src="./blank-profile-picture.png" alt="geen foto beschikbaar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }}/>  // or whatever fallback you want
)}


    
      
  

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
        <p style={{ margin: '10px 0', color: '#555' }}>
  <strong>LinkedIn:</strong>{' '}
  <a href={studentData.linkedinurl} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'underline' }}>
    {studentData.linkedinurl}
  </a>
</p>
 <p style={{ margin: '10px 0', color: '#555' }}><strong>CV:</strong> <a href={`http://localhost:5000${cvLink}`} target="_blank" rel="noopener noreferrer" className="cv-download-link">Bekijk CV (PDF)</a></p>

        
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
        
      </footer>
    </div>
    <Footer />

    </div>
  );
}

export default StudentProfilePage;