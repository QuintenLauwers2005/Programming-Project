// HomePage.jsx
import Kaart from './Components/Kaart'
import Navbar from './Components/Navbar'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function HomePage() {

   const [stats, setStats] = useState(null)  // for your numbers from SQL
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Replace this URL with your actual backend API endpoint that returns your stats
    axios.get('http://localhost:5000/api/HomePageAantalen') 
      .then(response => {
        setStats(response.data)  // assume response.data is { bedrijven: 30, vacatures: 150, studenten: 200 }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch stats')
        setLoading(false)
      })
  }, [])

    if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>


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
          <strong>{stats[0].bedrijf_aantal}</strong><br />Bedrijven
        </div>
        <div style={{ backgroundColor: 'red', padding: '10px', color: 'white', width: '200px' }}>
          <strong>{stats[1].bedrijf_aantal}</strong><br />Vacatures
        </div>
        <div style={{ backgroundColor: 'red', padding: '10px', color: 'white', width: '200px' }}>
          <strong>{stats[2].bedrijf_aantal}</strong><br />Studenten
        </div>
      </section>

      {/* Praktisch */}
      <section style={{textAlign: 'center'}}>
        <h1>Onze Locatie</h1>
        <div className='map'>
        <p><strong>05/06/2025</strong></p>
        <p>Quai de l’Industrie 170, 1070 Anderlecht</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.402036354639!2d4.322808000000001!3d50.842239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c40f19faf0f9%3A0x4ef5b683135ecb1e!2sErasmushogeschool%20Brussel!5e0!3m2!1snl!2sbe!4v1749561581428!5m2!1snl!2sbe" width="600" height="450" style={{border: "0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
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

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px' }}>
        <h5>Contact</h5>
        <p>info@careerlaunch.be</p>
        <p>EhB - Erasmushogeschool Brussel</p>
      </footer>
    </div>
  );
}

export default HomePage;