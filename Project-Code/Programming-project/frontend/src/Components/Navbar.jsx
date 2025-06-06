import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar(){
    const navigate = useNavigate() // ✅ moet boven return
  
    const handleLoginClick = () => {
      navigate('/login')
    }
    return(
         <div>


      <div className="nav-bar">
        <button onClick={handleLoginClick}>Login</button> {/* ✅ login-button werkt */}
        <button onClick={() => navigate(-1)}>⬅ Terug</button>
        <button onClick={() => alert('Home geklikt!')}>Home</button>
        <button onClick={() => alert('Speeddates geklikt!')}>Speeddates</button>
        <button onClick={() => alert('Bedrijven geklikt!')}>Bedrijven</button>
        <button onClick={() => alert('Vacatures geklikt!')}>Vacatures</button>
      </div>
      </div>
    );
}

export default Navbar;