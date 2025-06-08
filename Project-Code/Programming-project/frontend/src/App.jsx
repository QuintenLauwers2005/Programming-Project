import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './Login'
import RegistratiePage from './Registratie'
import RegistratieBedrijfPage from './RegistratieBedrijf'
import StudentProfilePage from './StudentProfilePage';
import BedrijfProfilePage from './BedrijfProfilePage';
import VacaturelijstPage from './VacatureLijst';
import Agenda from './Agenda';
import BedrijvenLijst from './bedrijfPage';
import VacaturePage from './VacatureAanmaken';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registratie" element={<RegistratiePage/>} />
        <Route path="/RegistratieBedrijf" element={<RegistratieBedrijfPage/>} />
        <Route path="/StudentProfilePage" element={<StudentProfilePage />} />
        <Route path="/BedrijfProfilePage" element={<BedrijfProfilePage />} />
        <Route path="/Vacaturelijst" element={<VacaturelijstPage />} />
        <Route path="/Agenda" element={<Agenda />} />
        <Route path="/BedrijvenLijst" element={<BedrijvenLijst />} />
        <Route path="/VacaturePage" element={<VacaturePage />} />
        <Route path="/bedrijf/:id" element={<BedrijfProfilePage />} />
      
      </Routes>
    </Router>
  )
}

export default App;