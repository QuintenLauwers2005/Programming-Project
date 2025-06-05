import React from 'react'
import logoImage from '../Assets/SchoolLogo.png' 

function Logo({ width = 100, height = 'auto', alt = 'Schoollogo' }) {
  return <img src={logoImage} alt={alt} style={{ width, height }} /> 
}

export default Logo