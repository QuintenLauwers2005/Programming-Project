import React from "react";
import './Navbar.css'

function Navbar(){
    return(
        <ul>
            <a href=""><li class ='login'>Login</li></a>
            <a href=""><li class = 'speeddates'>Speeddates</li></a>
            <a href=""><li>Bedrijven</li></a>
            <a href=""><li>Vacatures</li></a>
        </ul>
    );
}

export default Navbar;