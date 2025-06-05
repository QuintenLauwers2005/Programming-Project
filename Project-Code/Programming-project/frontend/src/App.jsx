// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import HomePage from './HomePage';
import StudentProfilePage from './StudentProfilePage';


function App() {

  const studentProfielPad = "/StudentProfilePage";

  return (
    <Router>
      <div>
        <nav style={{ 
          padding: '10px 20px', 
          backgroundColor: '#f0f0f0', 
          marginBottom: '20px',
          borderBottom: '1px solid #ccc'
        }}>
          <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'blue' }}>
            Home
          </Link>
          <Link to={studentProfielPad} style={{ marginRight: '20px', textDecoration: 'none', color: 'blue' }}>
            Studentprofiel
          </Link>
        </nav>

        <div style={{ padding: '20px' }}>
          <Routes> 
            <Route path="/" element={<HomePage />} />
            <Route path={studentProfielPad} element={<StudentProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;