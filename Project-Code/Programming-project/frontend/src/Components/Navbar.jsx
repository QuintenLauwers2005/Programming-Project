import './Navbar.css'

import Logo from './Logo'
import { useNavigate } from 'react-router-dom';

function Navbar(){

  const navigate = useNavigate();
    return(
         <div>
      <div className="top-bar">
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <button className="notificatie-btn" onClick={() => alert('Meldingen geklikt!')}>Meldingen</button>
        <Logo className="logo"/>
      </div>

      <div className="nav-bar">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/Agenda')}>Speeddates</button>
        <button onClick={() => navigate('/BedrijvenLijst')}>Bedrijven</button>
        <button onClick={() => navigate('/Vacaturelijst')}>Vacatures</button>
      </div>
      </div>
    );
}

export default Navbar;