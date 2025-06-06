// StudentProfilePage.jsx
import React from 'react';

function StudentProfilePage() {

  const studentData = {
    id: "1",
    name: "Jan Voorbeeldstudent",
    email: "jan.voorbeeld@student.ehb.be",
    opleiding: "Toegepaste Informatica",
    instelling: "Erasmushogeschool Brussel",
    afstudeerjaar: 2025,
    vaardigheden: [
      { id: "skill1", naam: "React.js" },
      { id: "skill2", naam: "JavaScript" },
      { id: "skill3", naam: "Node.js" },
      { id: "skill4", naam: "Express.js" },
      { id: "skill5", naam: "HTML5" },
      { id: "skill6", naam: "CSS3" },
      { id: "skill7", naam: "Git" }
    ],
    bio: "Ik ben een enthousiaste student Toegepaste Informatica aan de Erasmushogeschool Brussel. Mijn passie ligt bij front-end ontwikkeling en het creëren van gebruiksvriendelijke webapplicaties. Ik ben leergierig, werk graag in teamverband en ben altijd op zoek naar nieuwe uitdagingen om mijn vaardigheden verder te ontwikkelen.",
    profielFotoUrl: "https://via.placeholder.com/150" 
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      
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
          {studentData.vaardigheden.map((vaardigheid) => (
            <li 
              key={vaardigheid.id || vaardigheid.naam}
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