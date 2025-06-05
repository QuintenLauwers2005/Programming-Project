const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// aanpassen als de database verandert
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carrierlaunch'
})

db.connect(err => {
  if (err) throw err
  console.log('MySQL connected.')
})

app.get('/api/vacatures', (req, res) => {
  db.query('SELECT * FROM vacatures', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`)
})