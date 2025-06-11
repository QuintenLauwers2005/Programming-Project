// HomePage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/AdminNavBar';
import Footer from './Components/Footer';

function HomePageAdmin() {
    const navigate = useNavigate()
  return ( 
   <div>

    <header><Navbar/></header>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center', margin:'50px auto', maxWidth: '450px'}}>
          
        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
            onClick={() => navigate('/AdminBedrijvenLijst')}>
                Geregistreerde bedrijven
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>

        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
            onClick={() => navigate('/AdminStudentenLijst')}>
                Geregistreerde studenten
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>

        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
            onClick={() => navigate('/AdminVacatureLijst')}>
                Open Vacatures
                <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>

        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
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