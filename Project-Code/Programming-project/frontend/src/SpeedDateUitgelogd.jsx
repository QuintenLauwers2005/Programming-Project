import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Components/Footer';

return (
    <div className="container">
        {/*Header*/}
        <header><NavBar/></header>

        {/*Body*/}
        <body>
            <h2>Oeps...</h2>
        <h3>Het ziet ernaar uit dat je nog niet bent ingelogd!</h3>

        <p> Log hier in: </p>
        <div>
          <button onClick={handleLoginClick}>Login</button>
        </div>

        <div>
        <button onClick={() => navigate('/')}>Terugkeren</button>
        </div>

        </body>

      <footer>
       <Footer />
      </footer>
       
      </div>
      );