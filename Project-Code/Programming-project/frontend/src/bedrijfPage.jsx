import React from "react";
import "./BedrijvenLijst.css";

const bedrijven = [
  { id: 1, naam: "SAP", kleur: "blauw" },
  { id: 2, naam: "Deloitte", kleur: "groen" },
  { id: 3, naam: "Bedrijfsnaam", kleur: "geel" },
  { id: 4, naam: "Bedrijfsnaam", kleur: "paars" },
  { id: 5, naam: "Delaware", kleur: "rood" },
];

export default function BedrijvenLijst() {
  return (
    <div className="container">
      <div className="bovenbalk">
        <button className="login-knop">Login</button>
        <button className="meldingen-knop">Meldingen</button>
        <img src="/erasmus-logo.png" alt="Erasmus logo" className="logo" />
      </div>

      <div className="navigatie">
        <button>Speeddates</button>
        <button>Bedrijven</button>
        <button>Vacatures</button>
      </div>

      <h2 className="titel">Bedrijven</h2>

      <button className="filter-knop">Filter</button>

      {bedrijven.map((bedrijf) => (
        <div key={bedrijf.id} className="bedrijf-kaart">
          <div className={`kleur-blok ${bedrijf.kleur}`}></div>
          <p className="bedrijfsnaam">{bedrijf.naam}</p>
        </div>
      ))}

      <button className="toon-meer-knop">Toon meer</button>
    </div>
  );
}