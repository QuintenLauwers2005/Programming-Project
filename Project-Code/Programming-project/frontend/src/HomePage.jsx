// HomePage.js
import React from 'react'
import Logo from './Components/Logo'
import Kaart from './Components/Kaart'
import Navbar from './Components/Navbar'

function HomePage({ goToLogin }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
<Navbar/>
      
      {/* Navigatie */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button onClick={goToLogin}>Login</button>
        </div>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button>Home</button>
          <button>Stages</button>
          <button>Bedrijven</button>
          <button>Studenten</button>
        </nav>
        <Logo/>
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
        <div><strong>30</strong><br />Bedrijven</div>
        <div><strong>150</strong><br />Vacatures</div>
        <div><strong>200</strong><br />Studenten</div>
      </section>

      {/* Praktisch */}
      <section style={{ marginBottom: '30px', textAlign: 'center' }}>
        <p><strong>05/06/2025</strong></p>
        <p>Quai de l’Industrie 170, 1070 Anderlecht</p>
        <Kaart/>
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
        <p><strong>Waar?</strong><br />EhB campus</p>
        <p><strong>Info?</strong><br />Stuur een e-mail of neem contact op met je studentenbegeleider.</p>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  )
}

export default HomePage
