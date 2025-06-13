import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/AdminNavBar'
import Footer from '../Components/Footer';

function AdminStudentProfiel() {
const navigate = useNavigate();
const [studentData, setStudentData] = useState(null);
const { id } = useParams(); // inplaats van 1, gebruiken we dit, anders altijd zelfde student te zien


  useEffect(() => {
    axios.get(`http://localhost:5000/api/student/${id}`)
      .then(res => { 
        setStudentData(res.data);
      })
      .catch(err => {
        console.error('Fout bij ophalen student:', err.message);
      });
  }, [id]);

  if (!studentData) return <p>Studentgegevens laden...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
    <header style={{marginBottom: '50px'}}>
      <Navbar/>
    </header>
      {/* Profiel Hoofding */}
      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
        <img 
          src={studentData.profielFotoUrl || '/default-avatar.png'} 
          alt={`Profiel van ${studentData.name || ''}`}
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }} 
        />
        <div>
          <button onClick={() => navigate(`/admin/student/${studentData.id}/instellingen`)}
            style={{
              marginBottom:'10px',
              border: '2px solid black',
              padding: '7px'
            }}>aanpassen
            </button>
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
        <p style={{ margin: '10px 0', color: '#555' }}><strong>linkedIn:</strong> {studentData.linkedin}</p>
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

      <footer>
       <Footer />
      </footer>
    </div>
  );
}

export default AdminStudentProfiel;