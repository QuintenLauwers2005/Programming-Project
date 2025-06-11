import React from 'react';
import '../Components/VacaturePage.css';
import Footer from './Components/Footer';

export default function VacaturePage() {
  return (
    <div className="pagina">

      {/* Bovenbalk */}
      <header className="bovenbalk">
        <img src="/delaware-logo.png" alt="Delaware logo" className="logo-delaware" />
        <button className="knop">Meldingen</button>
        <img src="/erasmus-logo.png" alt="Erasmus logo" className="logo-erasmus" />
      </header>

      {/* Navigatie */}
      <nav className="navigatie">
        <button>Speeddates</button>
        <button>Vacatures</button>
      </nav>

      {/* Titel en inhoud */}
      <main className="inhoud">
        <h1>Nieuwe vacature</h1>

        <section className="sectie">
          <h2>functie:</h2>
          <div className="functie-box">
            Data Analyst – InfoMatrix Analytics
          </div>
        </section>

        <section className="sectie">
          <h2>synopsis:</h2>
          <div className="tekst-box">
            InfoMatrix Analytics is op zoek naar een analytisch sterke Data Analyst met ervaring in Python en Power BI. Je vertaalt ruwe data naar inzichten die bedrijven helpen betere beslissingen te nemen. Je werkt in een dynamisch team met veel ruimte voor innovatie.
          </div>
        </section>

        <button className="post-knop">Post</button>
      </main>

      <footer>
        <Footer />
      </footer>

    </div>
  );
}
