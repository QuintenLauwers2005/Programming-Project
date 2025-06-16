import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/AdminNavBar'
import Footer from '../Components/Footer';

function AdminStudentProfiel() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // inplaats van 1, gebruiken we dit, anders altijd zelfde student te zien

  useEffect(() => {
    axios.get(`http://localhost:5000/api/student/${id}`)
      .then(res => { 
        setStudentData(res.data);
      })
      .catch(err => {
        console.error('Fout bij ophalen student:', err.message);
        setError('Kon student niet ophalen');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center' }}><h2>Laden...</h2></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
        <h2>{error}</h2>
        <button onClick={() => navigate('/admin/studenten')} style={{ marginTop: '10px' }}>Terug naar studentenlijst</button>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Geen student gevonden</h2>
        <button onClick={() => navigate('/admin/studenten')} style={{ marginTop: '10px' }}>Terug naar studentenlijst</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      
      <div style={{ padding: '0 70px' }}>
        {/* Profiel Hoofding */}
        <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee', marginTop:'70px' }}>
          <img 
            src={studentData.profielFotoUrl || '/default-avatar.png'} 
            alt={`Profiel van ${studentData.name || ''}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }} 
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <h2 style={{ margin: '0', fontSize: '2em', color: '#007bff' }}>{studentData.name}</h2>
              <button onClick={() => navigate(`/admin/student/${studentData.id}/instellingen`)}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.9em'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Aanpassen
              </button>
            </div>
            <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{studentData.opleiding}</p>
            <p style={{ color: '#007bff', fontSize: '1em' }}>{studentData.email}</p>
          </div>
        </section>

        {/* Over Mij */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Over Mij</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>{studentData.bio}</p>
        </section>

        {/* Vaardigheden */}
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Vaardigheden</h3>
          {studentData.vaardigheden && studentData.vaardigheden.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {studentData.vaardigheden.map((vaardigheid) => (
                <span 
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
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: '#777' }}>Geen vaardigheden opgegeven.</p>
          )}
        </section>

        {/* Opleiding & Contact */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Opleiding & Contact</h3>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Opleiding:</strong> {studentData.opleiding}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Instelling:</strong> {studentData.instelling}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Verwacht afstudeerjaar:</strong> {studentData.afstudeerjaar}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>LinkedIn:</strong> <a href={studentData.linkedinurl} target='_blank'>{studentData.linkedinurl}</a></p>
        </section>
      </div>

      <footer>
       <Footer />
      </footer>
    </div>
  );
}

export default AdminStudentProfiel;