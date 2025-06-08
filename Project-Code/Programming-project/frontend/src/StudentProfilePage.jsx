// StudentProfilePage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar'

function StudentProfilePage() {

const [studentData, setStudentData] = useState(null);
  const studentId = "1"; // kan dynamisch uit route params komen bijvoorbeeld

  useEffect(() => {
    axios.get(`http://localhost:5000/api/student/${studentId}`)
      .then(res => { 
        setStudentData(res.data);
      })
      .catch(err => {
        console.error('Fout bij ophalen student:', err.message);
      });
  }, [studentId]);

  if (!studentData) return <p>Studentgegevens laden...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
    <header style={{marginBottom: '50px'}}>
      <Navbar/>
    </header>
      {/* Profiel Hoofding */}
      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
        <img 
          src={studentData.profielFotoUrl} 
          alt={`Profiel van ${studentData.name}`}
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }} 
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2em' }}>{studentData.name}</h2>
          <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{studentData.opleiding}</p>
          <p style={{ margin: '0', color: '#555' }}>{studentData.email}</p>
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
      </section>

      {/* Vaardigheden */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Vaardigheden</h3>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {studentData.vaardigheden.map((vaardigheid) => ( // index is niet meer nodig als vaardigheid een id heeft
            <li 
              key={vaardigheid.id || vaardigheid.naam} // Gebruik unieke ID van vaardigheid, of naam als fallback
              style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 15px', borderRadius: '20px', fontSize: '0.9em' }}
            >
              {vaardigheid.naam}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer  */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Career Launch - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}

export default StudentProfilePage;