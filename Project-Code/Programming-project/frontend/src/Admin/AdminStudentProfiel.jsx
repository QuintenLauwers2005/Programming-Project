// src/Admin/AdminStudentProfiel.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';
import '../Components/AdminStudentProfiel.css';

function AdminStudentProfiel() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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

  if (loading) return <div className="loading-message"><h2>Laden...</h2></div>;
  if (error) return (
    <div className="error-message">
      <h2>{error}</h2>
      <button onClick={() => navigate('/admin/studenten')}>Terug naar studentenlijst</button>
    </div>
  );
  if (!studentData) return <div className="loading-message"><h2>Geen student gevonden</h2></div>;

  return (
    <div className="profile-page">
      <Navbar />
      
      <main className="profile-content">
        {/* Profiel Hoofding */}
        <section className="profile-header">
          <img 
            src={`http://localhost:5000${studentData.profielFotoUrl}` || "./blank-profile-picture.png"} 
            alt={`Profiel van ${studentData.name || ''}`}
            className="profile-picture"
          />
          <div className="profile-details">
            <div className="profile-title">
              <h2>{studentData.name}</h2>
              <button onClick={() => navigate(`/admin/student/${studentData.id}/instellingen`)}>
                Aanpassen
              </button>
            </div>
            <p className="profile-opleiding">{studentData.opleiding}</p>
            <p className="profile-email">{studentData.email}</p>
          </div>
        </section>

        {/* Over Mij */}
        <section className="profile-section">
          <h3>Over Mij</h3>
          <p>{studentData.bio}</p>
        </section>

        {/* Vaardigheden */}
        <section className="profile-section-skills">
          <h3>Vaardigheden</h3>
          {studentData.vaardigheden && studentData.vaardigheden.length > 0 ? (
            <div className="skills-container">
              {studentData.vaardigheden.map((vaardigheid) => (
                <span key={vaardigheid.id || vaardigheid.naam} className="skill-tag">
                  {vaardigheid.naam}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-data-text">Geen vaardigheden opgegeven.</p>
          )}
        </section>

        {/* Opleiding & Contact */}
        <section className="profile-section">
          <h3>Opleiding & Contact</h3>
          <p><strong>Opleiding:</strong> {studentData.opleiding}</p>
          <p><strong>Instelling:</strong> {studentData.instelling}</p>
          <p><strong>Verwacht afstudeerjaar:</strong> {studentData.afstudeerjaar}</p>
          <p><strong>LinkedIn:</strong> <a href={studentData.linkedinurl} target='_blank' rel="noreferrer">{studentData.linkedinurl}</a></p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminStudentProfiel;