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
  database: 'carrierlauch'
  
})

db.connect(err => {
  if (err) throw err
  console.log('MySQL connected.')
})

//vacatures ophalen
app.get('/api/vacatures', (req, res) => {
  db.query(' SELECT  v.vacature_id, b.naam AS bedrijf, v.functie, v.contract_type, v.synopsis, v.open, b.kleur, b.logo_link FROM vacature v JOIN bedrijf b ON v.bedrijf_id = b.bedrijf_id', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

//studenten ophalen
app.get('/api/student/:id', (req, res) => {
  const studentId = req.params.id;

  const sql = `
    SELECT 
      s.student_id,
      s.voornaam,
      s.naam,
      s.email,
      s.opleiding,
      s.opleidingsjaar,
      s.bio,
      s.profiel_foto_url,
      v.id AS vaardigheid_id,
      v.naam AS vaardigheid_naam
    FROM student s
    LEFT JOIN student_vaardigheid sv ON s.student_id = sv.student_id
    LEFT JOIN vaardigheid v ON sv.vaardigheid_id = v.id
    WHERE s.student_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error('Databasefout:', err);
      return res.status(500).json({ error: 'Interne serverfout' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Student niet gevonden' });
    }

    const studentInfo = {
      id: results[0].student_id.toString(),
      name: (results[0].voornaam || '') + ' ' + (results[0].naam || ''),
      email: results[0].email,
      opleiding: results[0].opleiding,
      instelling: 'Erasmushogeschool Brussel',  // nog hardcoded
      afstudeerjaar: results[0].opleidingsjaar,
      bio: results[0].bio,
      profielFotoUrl: results[0].profiel_foto_url,
      vaardigheden: []
    };

    results.forEach(row => {
      if (row.vaardigheid_id && row.vaardigheid_naam) {
        studentInfo.vaardigheden.push({
          id: row.vaardigheid_id.toString(),
          naam: row.vaardigheid_naam
        });
      }
    });

    res.json(studentInfo);
  });
});

//bedrijven ophalen
app.get('/api/bedrijven', (req, res) => {
  const sql = `SELECT bedrijf_id AS id, naam, logo_link FROM bedrijf`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Databasefout:', err);
      return res.status(500).json({ error: 'Interne serverfout' });
    }

    res.json(results);
  });
});

app.get('/api/bedrijf/:id', (req, res) => {
  const bedrijfId = req.params.id;

  const sql = `
    SELECT 
      b.bedrijf_id AS id,
      b.naam,
      b.locatie,
      b.vertegenwoordiger,
      b.telefoon,
      b.logo_link,
      v.vacature_id,
      v.functie,
      v.contract_type,
      v.synopsis,
      v.open
    FROM bedrijf b
    LEFT JOIN vacature v ON b.bedrijf_id = v.bedrijf_id
    WHERE b.bedrijf_id = ?
  `;

  db.query(sql, [bedrijfId], (err, results) => {
    if (err) {
      console.error('Databasefout:', err);
      return res.status(500).json({ error: 'Interne serverfout' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Bedrijf niet gevonden' });
    }

    // Eerste rij bevat bedrijfsinfo
    const bedrijf = {
      id: results[0].id,
      naam: results[0].naam,
      locatie: results[0].locatie,
      vertegenwoordiger: results[0].vertegenwoordiger,
      telefoon: results[0].telefoon,
      logo_link: results[0].logo_link,
      vacatures: []
    };

    // Vacatures verzamelen (indien aanwezig)
    results.forEach(row => {
      if (row.vacature_id) {
        bedrijf.vacatures.push({
          vacature_id: row.vacature_id,
          functie: row.functie,
          contract_type: row.contract_type,
          synopsis: row.synopsis,
          open: row.open === 1 // boolean
        });
      }
    });

    res.json(bedrijf);
  });
});





app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`)
})