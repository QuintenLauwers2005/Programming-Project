import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './Login'
import RegistratiePage from './Registratie'
import RegistratieBedrijfPage from './bedrijven/RegistratieBedrijf'
import StudentProfilePage from './studenten/StudentProfilePage';
import BedrijfProfilePage from './BedrijfProfilePage';
import VacaturelijstPage from './VacatureLijst';
import Agenda from './Agenda';
import BedrijvenLijst from './bedrijfPage';
import VacaturePage from './bedrijven/VacatureAanmaken';
import HomePageAdmin from './Admin/HomepageAdmin'
import BedrijfHomePage from './bedrijven/BedrijfHomePage'
import ScrollToTopButton from './Components/ScrollToTopButton';
import AdminBedrijvenLijst from './Admin/AdminBedrijvenLijst';
import AdminStudentenLijst from './Admin/AdminStudentenLijst';
import AdminVacatureLijst from './Admin/AdminVacatureLijst';
import AdminAgenda from './Admin/AdminAgenda';
import AdminBedrijfProfiel from './Admin/AdminBedrijfProfiel';
import AdminStudentProfiel from './Admin/AdminStudentProfiel';
import AdminStudentInstellingen from './Admin/AdminStudentInstellingen'
import RegistratieStudentPage from './studenten/RegistratieStudenten';
import StudentHomepage from './studenten/StudentHomepage';
import AdminBedrijfInstellingen from './Admin/AdminBedrijfInstellingen'
import AgendaStudenten from './studenten/AgendaStudenten';
import BedrijfProfileStudent from './studenten/bedrijfProfielStudent';
import StudentBedrijvenLijst from './studenten/bedrijvenpagestudent';
import StudentVacatureLijst from './studenten/VacatureLijstStudenten';
import Bedrijfsagenda from './bedrijven/BedrijfsAgenda';
import BedrijfBedrijfProfilePage from './bedrijven/BedrijfBedrijfprofiel';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registratie" element={<RegistratiePage/>} />
        <Route path="/register/company" element={<RegistratieBedrijfPage />} />
        <Route path="/StudentProfilePage" element={<StudentProfilePage />} />
        <Route path="/BedrijfProfilePage" element={<BedrijfProfilePage />} />
        <Route path="/Vacaturelijst" element={<VacaturelijstPage />} />
        <Route path="/Agenda" element={<Agenda />} />
        <Route path="/BedrijvenLijst" element={<BedrijvenLijst />} />
        <Route path="/VacaturePage" element={<VacaturePage />} />
        <Route path="/bedrijf/:id" element={<BedrijfProfilePage />} />
        <Route path="/BedrijfHomePage" element={<BedrijfHomePage/>} />
        <Route path="/HomePageAdmin" element={<HomePageAdmin/>} />
        <Route path="/AdminBedrijvenLijst" element={<AdminBedrijvenLijst/>} />
        <Route path="/AdminStudentenLijst" element={<AdminStudentenLijst/>} />
        <Route path="/AdminVacatureLijst" element={<AdminVacatureLijst/>} />
        <Route path="/AdminAgenda" element={<AdminAgenda/>} />
        <Route path="/AdminBedrijfProfiel" element={<AdminBedrijfProfiel/>} />
        <Route path="/AdminStudentProfiel" element={<AdminStudentProfiel/>} />
        <Route path="/admin/student/:id/instellingen" element={<AdminStudentInstellingen />} />
        <Route path="/admin/student/:id/profiel" element={<AdminStudentProfiel />} />
        <Route path="/register/student" element={<RegistratieStudentPage />} />
        <Route path="/HomePageStudent" element={<StudentHomepage />} />
        <Route path="/admin/bedrijf/:id/profiel" element={<AdminBedrijfProfiel/>} />
        <Route path="/admin/bedrijf/:id/instellingen" element={<AdminBedrijfInstellingen />} />
        <Route path="/AgendaStudenten" element={<AgendaStudenten />} />
        <Route path="/BedrijfProfileStudent/:id" element={<BedrijfProfileStudent />} />
        <Route path="/StudentBedrijvenLijst" element={<StudentBedrijvenLijst />} />
        <Route path="/StudentVacatureLijst" element={<StudentVacatureLijst />} />
        <Route path="/BedrijfAgenda" element={<Bedrijfsagenda />} />
        <Route path="/BedrijfBedrijfProfilePage" element={<BedrijfBedrijfProfilePage />} />





      
      </Routes>
      <ScrollToTopButton />
    </Router>
  )
}

export default App;