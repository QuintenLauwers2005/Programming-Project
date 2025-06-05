// src/pages/LoginPage.jsx
import React, { useState } from 'react'
console.log("✅ LoginPage geladen")

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = () => {
    // Fictieve inloggegevens
    const fakeEmail = 'voorbeeld@outlook.com'
    const fakePassword = 'test1234'

    if (email === fakeEmail && password === fakePassword) {
      setSuccess(true)
      setError('')
    } else {
      setSuccess(false)
      setError('Foutieve login. Probeer opnieuw.')
    }
  }

  return (
    <div style={{
      maxWidth: '300px',
      margin: '50px auto',
      backgroundColor: '#ddd',
      padding: '20px',
      borderRadius: '12px',
      fontFamily: 'Arial'
    }}>
      <h3>LOG IN</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px'
        }}
      />

      <input
        type="password"
        placeholder="Wachtwoord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#c9baba',
          border: 'none',
          borderRadius: '6px'
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#bbb',
          border: 'none',
          borderRadius: '6px',
          marginBottom: '15px'
        }}
      >
        Log in
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Je bent succesvol ingelogd!</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{
          padding: '8px 12px',
          backgroundColor: '#ccc',
          border: 'none',
          borderRadius: '8px'
        }}>
          Register student
        </button>

        <button style={{
          padding: '8px 12px',
          backgroundColor: '#ccc',
          border: 'none',
          borderRadius: '8px'
        }}>
          Register bedrijf
        </button>
      </div>
    </div>
  )
}

export default LoginPage
