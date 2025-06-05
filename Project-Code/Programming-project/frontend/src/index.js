import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './HomePage';
import LoginPage from './loginPage';
import reportWebVitals from './reportWebVitals';

function Root() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage goHome={() => setCurrentPage('home')} />;
      case 'home':
      default:
        return <HomePage goToLogin={() => setCurrentPage('login')} />;
    }
  };

  return <>{renderPage()}</>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// Optional: performance tracking
reportWebVitals();

