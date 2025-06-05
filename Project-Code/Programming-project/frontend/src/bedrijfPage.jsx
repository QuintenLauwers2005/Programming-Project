import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const bedrijven = [
  { id: 1, naam: "SAP", kleur: "bg-blue-400" },
  { id: 2, naam: "Deloitte", kleur: "bg-green-200" },
  { id: 3, naam: "Bedrijfsnaam", kleur: "bg-yellow-300" },
  { id: 4, naam: "Bedrijfsnaam", kleur: "bg-purple-400" },
  { id: 5, naam: "Delaware", kleur: "bg-red-400" },
];

export default function BedrijvenLijst() {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <button className="border px-4 py-1 rounded-full text-green-600 border-green-600 hover:bg-green-100">Login</button>
        <button className="bg-gray-100 px-2 py-1 rounded">Meldingen</button>
        <img src="/erasmus-logo.png" alt="Erasmus logo" className="h-8" />
      </div>

      <div className="flex justify-between text-center mt-4">
        <Button variant="ghost">Speeddates</Button>
        <Button variant="ghost">Bedrijven</Button>
        <Button variant="ghost">Vacatures</Button>
      </div>

      <h2 className="text-center text-xl font-bold mt-6">Bedrijven</h2>

      <Button className="w-full bg-gray-300 text-black">Filter</Button>

      {bedrijven.map((bedrijf) => (
        <Card key={bedrijf.id} className="flex items-center space-x-4 p-4 bg-gray-200">
          <div className={`w-16 h-16 rounded ${bedrijf.kleur}`} />
          <CardContent className="p-0">
            <p className="font-semibold">{bedrijf.naam}</p>
          </CardContent>
        </Card>
      ))}

      <Button className="w-full bg-gray-300 text-black mt-4">Toon meer</Button>
    </div>
  );
}