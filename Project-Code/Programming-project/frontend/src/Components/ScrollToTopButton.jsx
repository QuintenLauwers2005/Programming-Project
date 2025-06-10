// src/Components/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';

// Stijlen voor de knop. Je kunt dit ook in een CSS-bestand plaatsen.
const buttonStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  height: '50px',
  width: '50px',
  fontSize: '30px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  display: 'none', // Standaard onzichtbaar
  zIndex: 1000,
};

const buttonVisibleStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Functie om de zichtbaarheid van de knop te bepalen
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Toon knop na 300px scrollen
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Functie om naar boven te scrollen
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Voor een soepele scroll-animatie
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup functie: verwijder de listener als de component verdwijnt
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      style={isVisible ? { ...buttonStyles, ...buttonVisibleStyles } : buttonStyles}
    >
      &#8593; {/* Dit is de Unicode pijl omhoog */}
    </button>
  );
}

export default ScrollToTopButton;