import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function RegistratieBedrijfPage() {
    

        const [bedrijfsnaam, setBedrijfsnaam] = useState('')
        const [wachtwoord, setWachtwoord] = useState('')
        const [mail, setMail] = useState('')
        const [Locatie, setLocatie] = useState('')
        const [vertegenwoordiger, setVertegenwoordiger] = useState('')
        const [telefoonnummer, setTelefoonnummer] = useState('')
    
        const [error, setError] = useState('')
        const [success, setSuccess] = useState(false)
    
        const navigate = useNavigate();
        const handleLogin = () => {navigate('/Login');}
    
        const handleSubmit = () => {
            
            if (!bedrijfsnaam, !Locatie, !wachtwoord, !mail, !vertegenwoordiger, !telefoonnummer) {
            setError('vul alle gegevens in')
            return;
            } else {
            setError('')
            }

            if (wachtwoord.length > 9) {
                setSuccess(true)
                setError('')
            } else {
                setSuccess(false)
                setError('Gebruik een langere wachtwoord')
                return;
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
          <h3>Register Bedrijf</h3>
    
          <input 
          type='text'
          value={bedrijfsnaam}
          onChange={(e) => setBedrijfsnaam(e.target.value)}
          placeholder='Bedrijfsnaam'
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
          type='number'
          value={telefoonnummer}
          onChange={e => setTelefoonnummer(e.target.value)}
            placeholder='Telefoonnummer'
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
            value={Locatie}
            onChange={e => setLocatie(e.target.value)} 
            placeholder='Locatie'
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
            value={vertegenwoordiger}
            onChange={e => setVertegenwoordiger(e.target.value)} 
            placeholder='vertegenwoordiger'
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
export default RegistratieBedrijfPage