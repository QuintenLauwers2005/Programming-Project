// HomePage.jsx
import React from 'react'
import Kaart from '../Components/Kaart'
import Navbar from '../Components/Navbar'

function HomePageAdmin() {
    
  return ( 
   <div>

    <header><Navbar/></header>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center', margin:'50px auto', maxWidth: '450px'}}>
          
        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            Geregistreerde bedrijven
            <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>
        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            Geregistreerde studenten
            <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>
        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            Open Vacatures
            <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>
        <div style={{ display: 'flex', width: '200px', height: '200px', backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            Gesloten vacatures 
            <button style={{ marginTop: '10%'}}>Bekijk</button>
            </div>
      </div>
   </div>
  );
}

export default HomePageAdmin;