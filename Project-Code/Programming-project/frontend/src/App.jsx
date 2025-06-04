import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {
  const [stages, setStages] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/stages') // 👈 BELANGRIJK!
      .then(res => {
        setStages(res.data)
        console.log('Data opgehaald:', res.data)
      })
      .catch(err => {
        console.error('Fout bij ophalen stages:', err.message)
      })
  }, [])

  return (
    <div>
      <h2>Stages</h2>
      <ul>
        {stages.map(stage => (
          <li key={stage.id}>{stage.bedrijf} - {stage.functie} - {stage.locatie}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
