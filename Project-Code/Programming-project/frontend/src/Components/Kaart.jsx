import React from 'react'
import kaartImage from '../Assets/SchoolKaart.png' 

function Kaart({ width = 500, height = 'auto', alt = 'Kaart' }) {
  return <img src={kaartImage} alt={alt} style={{ width, height }} /> 
}

export default Kaart