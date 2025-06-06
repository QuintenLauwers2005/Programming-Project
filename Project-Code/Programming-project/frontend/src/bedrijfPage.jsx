import React from "react";
import "./Components/BedrijvenLijst.css";
import Navbar from "./Components/Navbar";

const bedrijven = [
  { id: 1, naam: "SAP", kleur: "blauw" },
  { id: 2, naam: "Deloitte", kleur: "groen" },
  { id: 3, naam: "Bedrijfsnaam", kleur: "geel" },
  { id: 4, naam: "Bedrijfsnaam", kleur: "paars" },
  { id: 5, naam: "Delaware", kleur: "rood" },
];

export default function BedrijvenLijst() {
  return (
    <div>
    <Navbar />

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