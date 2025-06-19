import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BedrijfNavbar from '../Components/BedrijfNavBar';
import Footer from '../Components/Footer';

function StudentPublicProfile() {
  const { student_id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cvLink, setCvLink] = useState(null);

  useEffect(() => {
    if (!student_id) {
      setError('Geen student ID opgegeven');
      setLoading(false);
      return;
    }
   const token = localStorage.getItem('token');  // zorg dat je token zo heet in localStorage
  if (!token) {
    console.log('Geen geldige sessie, graag opnieuw inloggen.');
    return;
  }
    // studentgegevens ophalen bij component mount of id wijziging
   axios.get(`http://localhost:5000/api/student/${student_id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
      }).then(res => {
        setStudentData(res.data); 
        setLoading(false);
      })
      .catch(() => {
        setError('Kon studentgegevens niet ophalen');
        setLoading(false);
      });

    axios.get(`http://localhost:5000/api/student/${student_id}/cv`)
      .then(res => setCvLink(res.data.cv_link))
      .catch(() => setCvLink(null));
  }, [student_id]);

  if (loading) return <p>Studentgegevens laden...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!studentData) return null;

  return (
    <div>
      <header style={{ marginBottom: '50px' }}>
        <BedrijfNavbar />
      </header>

      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Profiel Hoofding */}
        <section style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
          {studentData.profielFotoUrl ? (
            <img
              src={`http://localhost:5000${studentData.profielFotoUrl}`}
              alt={`Profiel van ${studentData.name}`}
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }}
            />
          ) : (
            <img
              src="./blank-profile-picture.png"
              alt="No profile picture found"
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '30px' }}
            />
          )}

          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2em' }}>{studentData.name}</h2>
            <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{studentData.opleiding}</p>
            <p style={{ margin: '0 20px 15px 0', color: '#555' }}>{studentData.email}</p>
          </div>
        </section>

        {/* Over Mij */}
        {studentData.bio && (
          <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Over Mij</h3>
            <p style={{ lineHeight: '1.6', color: '#555' }}>{studentData.bio}</p>
          </section>
        )}

        {/* Opleiding */}
        <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Opleiding</h3>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Opleiding:</strong> {studentData.opleiding || '—'}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Instelling:</strong> {studentData.instelling || '—'}</p>
          <p style={{ margin: '10px 0', color: '#555' }}><strong>Verwacht afstudeerjaar:</strong> {studentData.afstudeerjaar || '—'}</p>
          {studentData.linkedinurl && (
            <p style={{ margin: '10px 0', color: '#555' }}>
              <strong>LinkedIn:</strong>{' '}
              <a href={studentData.linkedinurl} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'underline' }}>
                {studentData.linkedinurl}
              </a>
            </p>
          )}

          <p style={{ margin: '10px 0', color: '#555' }}><strong>CV:</strong>  {cvLink && (
          <a
            href={`http://localhost:5000${cvLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-download-link"
            style={{ display: 'inline-block', marginBottom: '20px', color: '#007bff', textDecoration: 'underline', fontWeight: 'bold' }}
          >
            Bekijk CV (PDF)
          </a>
        )}</p>
         
        </section>

        {/* Vaardigheden */}
        {studentData.vaardigheden && studentData.vaardigheden.length > 0 && (
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
        )}

      </div>

      <Footer />
    </div>
  );
}

export default StudentPublicProfile;
