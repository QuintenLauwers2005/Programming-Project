import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import './HomePage.css'
import axios from 'axios'
import Footer from './Components/Footer'

function HomePage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/api/HomePageAantalen')
      .then(response => {
        setStats(response.data)  // verwacht { bedrijf_aantal, vacature_aantal, student_aantal }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch stats')
        setLoading(false)
      })
  }, [])

  return (
    <div className="home-layout">
      {/* Navigatie */}
      <header>
        <Navbar />
      </header>

      <main>
        {/* Hero */}
        <section id = 'Home' className="hero">
          <h1>Hoe goed schat jij jouw kansen in?</h1>
          <p>
            Wil je een indrukwekkend bedrijf dat perfect bij jouw interesses past? Of ben je nieuwsgierig naar andere sectoren? De Career Launch is jouw kans om te ontdekken wat bij jou past en je netwerk uit te breiden!
          </p>
        </section>

        {/* Statistieken */}
        <section className="stats">
          <div className="stat">
            <strong>{loading ? '...' : error ? '✖' : stats?.bedrijf_aantal}</strong><br />
            Bedrijven
          </div>
          <div className="stat">
            <strong>{loading ? '...' : error ? '✖' : stats?.vacature_aantal}</strong><br />
            Vacatures
          </div>
          <div className="stat">
            <strong>{loading ? '...' : error ? '✖' : stats?.student_aantal}</strong><br />
            Studenten
          </div>
        </section>

        {/* Praktisch */}
        <section id="locatie" className="location enhanced-box">
          <h2>Locatie & Datum</h2>

          <div className="map-card">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.402036354639!2d4.322808000000001!3d50.842239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c40f19faf0f9%3A0x4ef5b683135ecb1e!2sErasmushogeschool%20Brussel!5e0!3m2!1snl!2sbe!4v1749561581428!5m2!1snl!2sbe"
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="map-info">
              <p>Nijverheidskaai 170, 1070 Anderlecht</p>
              <p className="date"><strong>05/06/2025</strong></p>
            </div>
          </div>
        </section>

        {/* Waarom deelnemen */}
        <section id="waarom" className="why enhanced-box">
          <h2>Waarom je dit niet mag missen</h2>
          <p>
            Tijdens de Career Launch krijg je de unieke kans om in contact te komen met topbedrijven uit jouw sector. Netwerk, ontdek en zet de eerste stap naar jouw droomjob.
          </p>

          <div className="why-circles-container">
            <div className="why-circle-block">
              <div className="whycirkel">🎯</div>
              <p>Gerichte matches</p>
            </div>

            <div className="why-circle-block">
              <div className="whycirkel">🤝</div>
              <p>Netwerken</p>
            </div>

            <div className="why-circle-block">
              <div className="whycirkel">🚀</div>
              <p>Start je carrière</p>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section id="testimonial" className="testimonial enhanced-box">
          <h2>Ervaringen van studenten</h2>

          <div className="studentenverklaring">
            <blockquote>
              <p>
                “De Career Launch was een gamechanger. Dankzij dit event vond ik niet alleen een stage, maar ontdekte ik ook wat écht bij me past.”
              </p>
              <footer>— Sarah, student Toegepaste Informatica</footer>
            </blockquote>
          </div>

          <div className="studentenverklaring">
            <blockquote>
              <p>
                “Ik vond het super waardevol om met bedrijven te praten zonder druk. Hierdoor heb ik echt mijn richting gevonden.”
              </p>
              <footer>— Yassin, student Multimedia</footer>
            </blockquote>
          </div>

          <div className="studentenverklaring">
            <blockquote>
              <p>
                “Toffe sfeer, goede voorbereiding en veel interessante connecties opgedaan.”
              </p>
              <footer>— Anke, student Marketing</footer>
            </blockquote>
          </div>
        </section>

        {/* Veelgestelde vragen */}
        <section id="faq" className="faq">
          <h2>Veelgestelde vragen</h2>
          <div className="faq-container">
            <div className="faq-blok">
              <p><strong>Hoe meld ik me aan?</strong><br />Klik op 'Registreren' en volg de stappen.</p>
            </div>
            <div className="faq-blok">
              <p><strong>Waar?</strong><br />EhB campus Nijverheidskaai 170 Anderlecht 1070</p>
            </div>
            <div className="faq-blok">
              <p><strong>Info?</strong><br />Stuur een e-mail of neem contact op met je studentenbegeleider.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default HomePage
