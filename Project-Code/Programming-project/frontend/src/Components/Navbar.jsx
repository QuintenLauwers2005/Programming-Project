import './Navbar.css'
import Logo from './Logo'

function Navbar(){
    return(
         <div>
      <div className="top-bar">
        <button className="login-btn" onClick={() => alert('Login geklikt!')}>Login</button>
        <button className="notificatie-btn" onClick={() => alert('Meldingen geklikt!')}>Meldingen</button>
        <Logo className="logo"/>
      </div>

      <div className="nav-bar">
        <button onClick={() => alert('Speeddates geklikt!')}>Home</button>
        <button onClick={() => alert('Speeddates geklikt!')}>Speeddates</button>
        <button onClick={() => alert('Bedrijven geklikt!')}>Bedrijven</button>
        <button onClick={() => alert('Vacatures geklikt!')}>Vacatures</button>
      </div>
      </div>
    );
}

export default Navbar;