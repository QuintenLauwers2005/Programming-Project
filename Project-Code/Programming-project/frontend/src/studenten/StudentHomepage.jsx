import React from 'react'
import Navbar from '../Components/StudentNavbar'
import Footer from '../Components/Footer';

function HomePage() {

  

  return ( 
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Navigatie */}
      <header>

      
          <Navbar/>
        
      
      </header>

      {/* Hero / Intro */}
      <section style={{ margin: '30px 0', textAlign: 'center' }}>
        <h2>Hoe goed schat jij jouw kansen in?</h2>
        <p>
          Wil je een indrukwekkend bedrijf dat perfect bij jouw interesses past?
          Of ben je nieuwsgierig naar andere sectoren?
          De Career Launch is jouw kans om te ontdekken wat bij jou past en je netwerk uit te breiden!
        </p>
      </section>

      {/* Statistieken */}
      <section style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0' }}>
        <div style={{ backgroundColor: 'red', padding: '10px', color: 'white', width: '200px' }}>
          <strong>30</strong><br />Bedrijven
        </div>
        <div style={{ backgroundColor: 'red', padding: '10px', color: 'white', width: '200px' }}>
          <strong>150</strong><br />Vacatures
        </div>
        <div style={{ backgroundColor: 'red', padding: '10px', color: 'white', width: '200px' }}>
          <strong>200</strong><br />Studenten
        </div>
      </section>

      {/* Praktisch */}
      <section style={{ marginBottom: '30px', textAlign: 'center' }}>
        <p><strong>05/06/2025</strong></p>
        <p>Quai de l’Industrie 170, 1070 Anderlecht</p>
     
      </section>

      {/* Waarom deelnemen */}
      <section style={{ textAlign: 'center', margin: '40px 0' }}>
        <h3>Waarom je dit niet mag missen?</h3>
        <p>
          De Career Launch biedt een unieke kans om direct in contact te komen met bedrijven die bij jou passen.
        </p>
      </section>

      {/* Testimonial */}
      <section style={{ backgroundColor: '#f0f0f0', padding: '20px', margin: '20px 0' }}>
        <h4>Testimonial</h4>
        <blockquote>
          "De Career Launch was een geweldige ervaring! Ik ontmoette mijn huidige werkgever tijdens het event,
          en kreeg direct waardevolle tips."
        </blockquote>
      </section>

      {/* Veelgestelde vragen */}
      <section>
        <h4>Veelgestelde vragen</h4>
        <p><strong>Hoe meld ik me aan?</strong><br />Klik op 'Registreren' en volg de stappen.</p>
        <p><strong>Waar?</strong><br />EhB campus Nijverheidskaai 170 Anderlecht 1070</p>
        <p><strong>Info?</strong><br />Stuur een e-mail of neem contact op met je studentenbegeleider.</p>
      </section>

      <footer>
       <Footer />
      </footer>
    </div>
  );
}

export default HomePage;