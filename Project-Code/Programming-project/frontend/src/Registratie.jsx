import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegistratiePage() {

    const [naam, setNaam] = useState('')
    const [achternaam, setAchternaam] = useState('')
    const [leeftijd, setLeeftijd] = useState('')
    const [wachtwoord, setWachtwoord] = useState('')
    const [mail, setMail] = useState('')
    const [adres, setAdres] = useState('')
    const [opleiding, setOpleiding] = useState('')
    const [specialisatie, setSpecialisatie] = useState('')
    const [opleidingsjaar, setOpleidingsjaar] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();
    const handleLogin = () => {navigate('/Login');}

    const handleSubmit = () => {
        if (wachtwoord.length > 9) {
            setSuccess(true)
            setError('')
        } else {
            setSuccess(false)
            setError('Gebruik een langere wachtwoord')
            return;
         }

         if (!naam, !achternaam, !leeftijd, !wachtwoord, !mail, !adres, !opleiding, !opleidingsjaar, !specialisatie) {
        setError('vul alle gegevens in')
        return;
        } else {
        setError('')
        }
    }
    
    
    
    return (

    <body>
    
    <div style={ {
        textAlign: 'center',
        marginTop: '20px'
    }}>
    <button
    style={{
      padding: '10px 20px',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      height: '40px',
      alignSelf: 'start',
    }}
    onClick={() => handleLogin()}
    >
    Terug naar Login
    </button>
    </div>

    <div style={{
      maxWidth: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
      backgroundColor: '#ddd',
      padding: '20px',
      borderRadius: '12px',
      fontFamily: 'Arial'
    }}>
      <h3>Register Student</h3>

      <input 
      type='text'
      value={naam}
      onChange={(e) => setNaam(e.target.value)}
      placeholder='Naam'
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <input
        type='text'
        value={achternaam}
        onChange={e => setAchternaam(e.target.value)} 
        placeholder='Achternaam'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <input
      type='number'
      value={leeftijd}
      onChange={e => setLeeftijd(e.target.value)}
        placeholder='Leeftijd'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <input
      type='text'
        value={adres}
        onChange={e => setAdres(e.target.value)} 
        placeholder='Adres'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <input
      type='text'
        value={mail}
        onChange={e => setMail(e.target.value)} 
        placeholder='Mail'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <input
      type='text'
        value={opleiding}
        onChange={e => setOpleiding(e.target.value)} 
        placeholder='Opleiding'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <input
      type='text'
        value={specialisatie}
        onChange={e => setSpecialisatie(e.target.value)} 
        placeholder='Specialisatie'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      <select
      type='text'
        value={opleidingsjaar}
        onChange={e => setOpleidingsjaar(e.target.value)} 
        placeholder='Opleidingsjaar'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px'
        }}
        >
        <option value={""}>kies opleidingsjaar</option>
        <option value={"1e jaar"}>1e jaar</option>
        <option value={"2e jaar"}>2e jaar</option>
        <option value={"3e jaar"}>3e jaar</option>

      </select>

      <input
      type='password'
        value={wachtwoord}
        onChange={e => setWachtwoord(e.target.value)} 
        placeholder='Wachtwoord'
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px',
          boxSizing: "border-box"
        }}
      />

      

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '15px',
          backgroundColor: '#bbb',
          border: 'none',
          borderRadius: '6px',
          marginBottom: '15px'
          
        }}
      >
        Registreer
      </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registratie is compleet!</p>}
    </div>
    </body>
  )
}
export default RegistratiePage