import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const vacatures = [
  {
    id: 1,
    bedrijf: "SAP",
    beschrijving:
      "SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren en te automatiseren. Het richt zich vooral op grote organisaties.",
    functie: "Business Consultant",
    contract: "Voltijds",
  },
  {
    id: 2,
    bedrijf: "SAP",
    beschrijving:
      "SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren en te automatiseren. Het richt zich vooral op grote organisaties.",
    functie: "Business Consultant",
    contract: "Voltijds",
  },
  {
    id: 3,
    bedrijf: "SAP",
    beschrijving:
      "SAP is een softwarebedrijf dat bedrijven helpt hun processen te beheren en te automatiseren. Het richt zich vooral op grote organisaties.",
    functie: "Business Consultant",
    contract: "Voltijds",
  },
];

export default function VacatureLijst() {
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

      <h2 className="text-center text-xl font-bold mt-6">Vacatures</h2>

      <Button className="w-full bg-gray-300 text-black">Filter</Button>

      {vacatures.map((vacature) => (
        <Card key={vacature.id} className="flex space-x-4 p-4 bg-gray-200">
          <div className="w-16 h-16 bg-blue-400 rounded" />
          <CardContent className="p-0 space-y-1">
            <p className="font-semibold">{vacature.bedrijf}</p>
            <p className="text-sm">{vacature.beschrijving}</p>
            <p className="text-sm font-medium">
              Functie: {vacature.functie}
              <br />contract: {vacature.contract}
            </p>
          </CardContent>
        </Card>
      ))}

      <Button className="w-full bg-gray-300 text-black mt-4">Toon meer</Button>
    </div>
  );
}
