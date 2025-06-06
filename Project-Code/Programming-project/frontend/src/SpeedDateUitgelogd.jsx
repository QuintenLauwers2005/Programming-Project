import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

return (
    <div className="container">
        <header><NavBar/></header>
      
        <h2>Oeps...</h2>
        <h3>Het ziet ernaar uit dat je nog niet bent ingelogd!</h3>

        <p> Log hier in: </p>
        <div>
          <button onClick={handleLoginClick}>Login</button>
        </div>

        {/* Footer  */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '40px', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Career Launch - Erasmushogeschool Brussel</p>
      </footer>
      </div>
      );