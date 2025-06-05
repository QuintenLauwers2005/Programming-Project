import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './Login'
import StudentProfilePage from './StudentProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/StudentProfilePage" element={<StudentProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App;