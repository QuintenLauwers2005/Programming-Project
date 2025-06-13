// HomePage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

function HomePageAdmin() {
    const navigate = useNavigate()
  return ( 
   <div>

    <header><Navbar/></header>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center', margin:'50px auto', maxWidth: '450px'}}>
          
        <div style={{ 
                display: 'flex', 
                 width: '200px', 
                 height: '200px', 
                 backgroundColor: '#f9f9f9', 
                 justifyContent: 'center', 
                 alignItems: 'center', 
                 flexDirection: 'column',
                 boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                 cursor: 'pointer',
                 transition: 'transform 0.2s, box-shadow 0.2s'
                }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }}
            onClick={() => navigate('/AdminBedrijvenLijst')}>
                Geregistreerde bedrijven
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>

        <div style={{ 
                display: 'flex', 
                width: '200px', 
                height: '200px', 
                backgroundColor: '#f9f9f9', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }}
            onClick={() => navigate('/AdminStudentenLijst')}>
                Geregistreerde studenten
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>

        <div style={{ 
                display: 'flex', 
                width: '200px', 
                height: '200px', 
                backgroundColor: '#f9f9f9', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }}
            onClick={() => navigate('/AdminVacatureLijst')}>
                Open Vacatures
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>

        <div style={{ 
                display: 'flex', 
                width: '200px', 
                height: '200px', 
                backgroundColor: '#f9f9f9', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                }}
            onClick={() => navigate('/AdminAgenda')}>
                Speeddates Agenda 
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>
      </div>

      <footer>
       <Footer />
      </footer>
   </div>
  );
}

export default HomePageAdmin;