// src/BedrijfProfilePage.jsx
import React from 'react';

function BedrijfProfilePage() {
  // Placeholder-data voor een bedrijf.
  const companyData = {
    id: "comp1",
    naam: "Innovatech Solutions",
    logoUrl: "https://via.placeholder.com/150/007bff/ffffff?text=Innovatech",
    sector: "Technologie & Softwareontwikkeling",
    locatie: "Innovatielaan 1, 1000 Brussel, België",
    website: "www.innovatech-solutions.be",
    email: "contact@innovatech-solutions.be",
    overOns: "Innovatech Solutions is een toonaangevend technologiebedrijf gespecialiseerd in het bouwen van op maat gemaakte softwareoplossingen voor de financiële sector. We zijn een jong, dynamisch team dat gelooft in innovatie, samenwerking en persoonlijke groei. We zijn altijd op zoek naar getalenteerde studenten die een impact willen maken.",
    vacatures: [
      { id: "vac1", titel: "Frontend Developer Stage (React)", type: "Stage", locatie: "Brussel / Remote" },
      { id: "vac2", titel: "Backend Developer Stage (Node.js)", type: "Stage", locatie: "Brussel" },
      { id: "vac3", titel: "UX/UI Design Stage", type: "Stage", locatie: "Remote" },
      { id: "vac4", titel: "Junior Full-Stack Developer", type: "Job", locatie: "Brussel" }
    ]
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Bedrijf Hoofding */}
      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
        <img 
          src={companyData.logoUrl} 
          alt={`Logo van ${companyData.naam}`}
          style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '30px' }} 
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2em', color: '#007bff' }}>{companyData.naam}</h2>
          <p style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.1em' }}>{companyData.sector}</p>
          <a href={`http://${companyData.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
            {companyData.website}
          </a>
        </div>
      </section>

      {/* Over Ons */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Over Ons</h3>
        <p style={{ lineHeight: '1.6', color: '#555' }}>{companyData.overOns}</p>
      </section>

      {/* Openstaande Vacatures */}
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Openstaande Vacatures & Stages</h3>
        <div>
          {companyData.vacatures.map((vacature) => (
            <div key={vacature.id} style={{ 
              border: '1px solid #e0e0e0', 
              padding: '15px', 
              marginBottom: '15px', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{vacature.titel}</h4>
                <p style={{ margin: 0, color: '#666' }}>{vacature.locatie}</p>
              </div>
              <span style={{ 
                backgroundColor: vacature.type === 'Stage' ? '#007bff' : '#28a745', 
                color: 'white', 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '0.8em' 
              }}>
                {vacature.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Locatie */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#333' }}>Contact & Locatie</h3>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Adres:</strong> {companyData.locatie}</p>
        <p style={{ margin: '10px 0', color: '#555' }}><strong>Email:</strong> <a href={`mailto:${companyData.email}`} style={{ color: '#007bff' }}>{companyData.email}</a></p>
      </section>

    </div>
  );
}

export default BedrijfProfilePage;