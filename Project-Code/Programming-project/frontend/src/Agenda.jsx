import React from "react";

import "./Assets/Agenda.css"; 
import Navbar from './Components/Navbar'

function Agenda(){
    return(
    <div>
      <Navbar />
      <div className="page">
      <button className="top-button">hoe speeddate reserveren?</button>

      <div className="card">
        <div className="time">14:45</div>
        <div className="company">Delaware</div>
        <div className="room">Aula 1</div>
        <button className="cancel-button">cancel</button>
      </div>

      <div className="card">
        <div className="time">14:45</div>
        <div className="company">Zylo</div>
        <div className="room">Aula 2</div>
        <button className="cancel-button">cancel</button>
      </div>

      <div className="card">
        <div className="time">14:45</div>
        <div className="company">Velto</div>
        <div className="room">Aula 3</div>
        <button className="cancel-button">cancel</button>
      </div>

      <div className="card">
        <div className="time">14:45</div>
        <div className="company">Klyr</div>
        <div className="room">Aula 4</div>
        <button className="cancel-button">cancel</button>
      </div>
      </div>
    </div>
    )
    
}

export default Agenda;
