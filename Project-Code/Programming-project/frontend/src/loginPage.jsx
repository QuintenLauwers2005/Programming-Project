// LoginPage.jsx
import React, { useState } from 'react';

function LoginPage({ goHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inloggen met:', { username, password });
    // hier zou je een login API-call kunnen maken
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gebruikersnaam:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Wachtwoord:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Log in</button>
      </form>
      <br />
      <button onClick={goHome}>← Terug naar Home</button>
    </div>
  );
}

export default LoginPage;
