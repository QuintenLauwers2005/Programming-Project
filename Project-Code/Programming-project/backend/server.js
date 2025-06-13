const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express()
const port = 5000
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs');

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve images

// aanpassen als de database verandert
/*const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carrierlauch'
  
})*/





const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



db.connect(err => {
  if (err) throw err
  console.log('MySQL connected.')
})


app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`)
})

// login gegevens checken
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT 
      g.gebruiker_id, 
      g.rol, 
      g.wachtwoord,
      CONCAT(s.voornaam, ' ', s.naam) AS student_naam,
      b.logo_link AS bedrijf_logo
    FROM gebruiker g
    LEFT JOIN student s ON g.gebruiker_id = s.student_id AND g.rol = 'student'
    LEFT JOIN bedrijf b ON g.gebruiker_id = b.bedrijf_id AND g.rol = 'bedrijf'
    WHERE g.email = ?
  `;

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Gebruiker niet gevonden' });
    }

    const gebruiker = results[0];

    // Hier kun je wachtwoord hashing toevoegen als je dat gebruikt
    if (gebruiker.wachtwoord !== password) {
      return res.status(401).json({ error: 'Wachtwoord is incorrect' });
    }

    res.json({
      message: 'Login succesvol',
      gebruiker_id: gebruiker.gebruiker_id,
      rol: gebruiker.rol,
      naam: gebruiker.rol === 'student' ? gebruiker.student_naam : null,
      logo_link: gebruiker.rol === 'bedrijf' ? gebruiker.bedrijf_logo : null
    });
  });
});


//vacatures ophalen
app.get('/api/vacatures', (req, res) => {
  db.query(' SELECT  v.vacature_id, b.naam AS bedrijf, v.functie, v.contract_type, v.synopsis, v.open, b.logo_link, b.bedrijf_id FROM vacature v JOIN bedrijf b ON v.bedrijf_id = b.bedrijf_id', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
});

app.put('/api/vacatures/:id', (req, res) => {
  const { id } = req.params;
  const { functie, contract_type, synopsis } = req.body;

  const sql = `
    UPDATE vacature 
    SET functie = ?, contract_type = ?, synopsis = ? 
    WHERE vacature_id = ?
  `;

  db.query(sql, [functie, contract_type, synopsis, id], (err, result) => {
    if (err) {
      console.error('Fout bij updaten vacature:', err);
      return res.status(500).json({ error: 'Vacature kon niet worden aangepast' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vacature niet gevonden' });
    }

    res.json({ message: 'Vacature succesvol bijgewerkt' });
  });
});


//vacatures verwijdfer

app.delete('/api/vacatures/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM vacature WHERE vacature_id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Fout bij verwijderen vacature:', err);
      return res.status(500).json({ error: 'Vacature kon niet worden verwijderd' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vacature niet gevonden' });
    }

    res.status(200).json({ message: 'Vacature verwijderd' });
  });
});



app.get('/api/vacatures/:id', (req, res) => {
  const BedrijfID = req.params.id;
  db.query(` SELECT 
  v.vacature_id, 
  b.naam AS bedrijf, 
  v.functie, 
  v.contract_type, 
  v.synopsis, 
  v.open, 
  b.logo_link, 
  b.bedrijf_id
FROM vacature v
JOIN bedrijf b ON v.bedrijf_id = b.bedrijf_id
WHERE b.bedrijf_id = ${BedrijfID}`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
});

// alle studenten ophalen
app.get('/api/studenten', (req, res) => {
  const sql = `
    SELECT 
      student_id,
      voornaam,
      naam,
      email,
      opleiding,
      opleidingsjaar,
      profiel_foto_url
    FROM student
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Databasefout:', err);
      return res.status(500).json({ error: 'Interne serverfout' });
    }

    const studenten = results.map(row => ({
      id: row.student_id.toString(),
      naam: `${row.voornaam} ${row.naam}`,
      email: row.email,
      opleiding: row.opleiding,
      afstudeerjaar: row.opleidingsjaar,
      profielFotoUrl: row.profiel_foto_url
    }));

    res.json(studenten);
  });
});

app.post('/api/vacatures', (req, res) => {
  const { functie, synopsis, contract_type, bedrijf_id } = req.body;

  if (!functie || !synopsis || !contract_type || !bedrijf_id) {
    return res.status(400).json({ error: 'Verplichte velden ontbreken' });
  }

  const sql = `
    INSERT INTO vacature (functie, synopsis, contract_type, bedrijf_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [functie, synopsis, contract_type, bedrijf_id], (err, result) => {
    if (err) {
      console.error('Fout bij toevoegen vacature:', err);
      return res.status(500).json({ error: 'Vacature kon niet worden aangemaakt' });
    }

    res.status(201).json({ message: 'Vacature succesvol aangemaakt', vacature_id: result.insertId });
  });
});


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
      v.open,
      b.url
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
      url:results[0].url,
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

// PUT: Bedrijf bijwerken
app.put('/api/bedrijf/:id', (req, res) => {
  const bedrijfId = req.params.id;
  const { naam, locatie, vertegenwoordiger, telefoon, url } = req.body;

  const sql = `
    UPDATE bedrijf 
    SET naam = ?, locatie = ?, vertegenwoordiger = ?, telefoon = ?, url = ?
    WHERE bedrijf_id = ?
  `;

  const values = [naam, locatie, vertegenwoordiger, telefoon, url, bedrijfId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Fout bij bijwerken bedrijf:', err);
      return res.status(500).json({ error: 'Databasefout' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bedrijf niet gevonden' });
    }

    res.json({ message: 'Bedrijf succesvol bijgewerkt' });
  });
});


app.get('/api/HomePageAantalen', (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM bedrijf) AS bedrijf_aantal,
      (SELECT COUNT(*) FROM vacature) AS vacature_aantal,
      (SELECT COUNT(*) FROM student) AS student_aantal
  `
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results[0])  // stuur het eerste (en enige) object terug
  })
})



app.post('/api/speeddate', (req, res) => {
  const { student_id, bedrijf_id, tijdstip, locatie, status } = req.body;

  const checkStudentBedrijfSql = `
    SELECT * FROM speeddate 
    WHERE student_id = ? AND bedrijf_id = ?
  `;

  db.query(checkStudentBedrijfSql, [student_id, bedrijf_id], (err, results1) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results1.length > 0) {
      return res.status(400).json({ error: 'Deze student heeft al een speeddate bij dit bedrijf.' });
    }

    const checkStudentTijdstipSql = `
      SELECT * FROM speeddate 
      WHERE student_id = ? AND tijdstip = ?
    `;

    db.query(checkStudentTijdstipSql, [student_id, tijdstip], (err, results2) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results2.length > 0) {
        return res.status(400).json({ error: 'Deze student heeft al een speeddate op dit tijdstip.' });
      }

      const checkBedrijfTijdstipSql = `
        SELECT * FROM speeddate
        WHERE bedrijf_id = ? AND tijdstip = ?
      `;

      db.query(checkBedrijfTijdstipSql, [bedrijf_id, tijdstip], (err, results3) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results3.length > 0) {
          return res.status(400).json({ error: 'Dit bedrijf is al geboekt op dit tijdstip.' });
        }

        // ✅ INSERT speeddate
        const insertSql = ` INSERT INTO speeddate (student_id, bedrijf_id, tijdstip, locatie, status) VALUES (?, ?, ?, ?, ?)`;

          db.query(insertSql, [student_id, bedrijf_id, tijdstip, locatie, status], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

        // Haal studentnaam op
          const getStudentSql = `SELECT voornaam, naam FROM student WHERE student_id = ?`;

          db.query(getStudentSql, [student_id], (err2, studentResults) => {
          if (err2) return res.status(500).json({ error: err2.message });

          const { voornaam, naam } = studentResults[0] || { voornaam: 'Student', naam: '' };
          const volledigeNaam = `${voornaam} ${naam}`.trim();

          // ✅ INSERT melding met naam
          const boodschap = `📅 ${volledigeNaam} heeft een speeddate ingepland op ${tijdstip} te ${locatie || 'onbekende locatie'}.`;
          const insertMeldingSql = `
            INSERT INTO melding (gebruiker_id, boodschap)
            VALUES (?, ?)
          `;

          db.query(insertMeldingSql, [bedrijf_id, boodschap], (err3) => {
            if (err3) return res.status(500).json({ error: err3.message });

            res.status(201).json({ message: 'Afspraak en melding succesvol opgeslagen.' });
          });
        });
      });
      });
    });
  });
});


app.delete('/api/meldingen/:meldingId', (req, res) => {
  const meldingId = req.params.meldingId;

  const sql = `DELETE FROM melding WHERE melding_id = ?`;

  db.query(sql, [meldingId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Melding verwijderd' });
  });
});



app.get('/api/afspraken/bedrijf/:bedrijfId', (req, res) => {
  const bedrijfId = req.params.bedrijfId;

  const sql = `
    SELECT s.speeddate_id AS id, s.tijdstip AS time, st.voornaam, st.naam, s.locatie
    FROM speeddate s
    JOIN student st ON s.student_id = st.student_id
    WHERE s.bedrijf_id = ?
  `;

  db.query(sql, [bedrijfId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// alle afspraken opvragen. voor admin agenda
app.get('/api/afspraken/all', (req, res) => {
  const sql = `
    SELECT 
      s.speeddate_id AS id,
      s.tijdstip AS time,
      st.voornaam,
      st.naam,
      s.locatie,
      b.naam AS bedrijf_naam,
      s.status
    FROM speeddate s
    LEFT JOIN student st ON s.student_id = st.student_id
    JOIN bedrijf b ON s.bedrijf_id = b.bedrijf_id
    ORDER BY s.tijdstip;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database fout:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


app.get('/api/afspraken', (req, res) => {
  const gebruikerId = req.query.gebruiker_id;  // gebruiker_id vanuit query

  if (!gebruikerId) {
    return res.status(400).json({ error: 'gebruiker_id is verplicht' });
  }

  const sql = `
    SELECT 
      s.speeddate_id AS id, 
      s.tijdstip AS time, 
      st.voornaam, 
      st.naam, 
      s.locatie, 
      b.naam AS bedrijf_naam,
      s.status
    FROM speeddate s
    JOIN student st ON s.student_id = st.student_id
    JOIN bedrijf b ON s.bedrijf_id = b.bedrijf_id
    WHERE s.student_id = ? OR s.bedrijf_id = ?
  `;

  db.query(sql, [gebruikerId, gebruikerId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}); 

app.delete('/api/speeddate/:id', (req, res) => {
  const speeddateId = req.params.id;

  // Eerst de student en bedrijf ophalen uit de speeddate
  const fetchSql = `
    SELECT s.student_id, s.bedrijf_id, s.tijdstip, s.locatie, st.voornaam, st.naam
    FROM speeddate s
    JOIN student st ON s.student_id = st.student_id
    WHERE s.speeddate_id = ?
  `;

  db.query(fetchSql, [speeddateId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Speeddate niet gevonden' });
    }

    const { student_id, bedrijf_id, tijdstip, locatie, voornaam, naam } = results[0];

    // Verwijder de speeddate
    const deleteSql = `DELETE FROM speeddate WHERE speeddate_id = ?`;

    db.query(deleteSql, [speeddateId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Nieuwe boodschap
      const boodschap = `❌ ${voornaam} ${naam} heeft de speeddate op ${tijdstip} te ${locatie || 'onbekende locatie'} geannuleerd.`;

      // Voeg een nieuwe melding toe (of je kan dit ook als update doen)
      const insertMeldingSql = `
        INSERT INTO melding (gebruiker_id, boodschap)
        VALUES (?, ?)
      `;

      db.query(insertMeldingSql, [bedrijf_id, boodschap], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        res.json({ message: 'Afspraak verwijderd en melding verzonden' });
      });
    });
  });
});

app.put('/api/speeddate/:id/status', (req, res) => {
  const speeddateId = req.params.id;
  const { status } = req.body;

  console.log('PUT /api/speeddate/:id/status', { speeddateId, status });

  const updateSql = `UPDATE speeddate SET status = ? WHERE speeddate_id = ?`;

  db.query(updateSql, [status, speeddateId], (err, result) => {
    if (err) {
      console.error('SQL error bij update status:', err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Speeddate niet gevonden' });
    }

    if (status === 'geweigerd') {
      // Hier voegen we de bedrijfsnaam toe in de join
      const selectSql = `
        SELECT s.student_id, g.gebruiker_id, b.naam AS bedrijfsnaam
        FROM speeddate sp
        JOIN student s ON sp.student_id = s.student_id
        JOIN gebruiker g ON s.student_id = g.gebruiker_id
        JOIN bedrijf b ON sp.bedrijf_id = b.bedrijf_id
        WHERE sp.speeddate_id = ?
      `;

      db.query(selectSql, [speeddateId], (err, rows) => {
        if (err) {
          console.error('SQL error bij ophalen gebruiker:', err);
          return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
          return res.status(404).json({ error: 'Student niet gevonden voor deze speeddate' });
        }

        const gebruiker_id = rows[0].gebruiker_id;
        const bedrijfsnaam = rows[0].bedrijfsnaam;

        const insertMelding = `
          INSERT INTO melding (gebruiker_id, boodschap, gelezen, datum)
          VALUES (?, ?, 0, NOW())
        `;

        const boodschap = `Je speeddate werd geweigerd door ${bedrijfsnaam}.`;

        db.query(insertMelding, [gebruiker_id, boodschap], (err) => {
          if (err) {
            console.error('SQL error bij toevoegen melding:', err);
            return res.status(500).json({ error: err.message });
          }

          const deleteSql = `DELETE FROM speeddate WHERE speeddate_id = ?`;
          db.query(deleteSql, [speeddateId], (err) => {
            if (err) {
              console.error('SQL error bij verwijderen speeddate:', err);
              return res.status(500).json({ error: err.message });
            }

            return res.json({ message: 'Speeddate geweigerd, student geïnformeerd, en verwijderd.' });
          });
        });
      });
    } else {
      res.json({ message: 'Status succesvol bijgewerkt' });
    }
  });
});





app.get('/api/meldingen/:gebruikerId', (req, res) => {
  const gebruikerId = req.params.gebruikerId;

  const sql = `
    SELECT melding_id, boodschap, datum, gelezen 
    FROM melding 
    WHERE gebruiker_id = ? 
    ORDER BY datum DESC
  `;

  db.query(sql, [gebruikerId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.post('/api/studentenToevoegen', (req, res) => {
  const {
    voornaam,
    naam,
    email,
    wachtwoord,
    opleiding,
    specialisatie,
    opleidingsjaar,
    adres
  } = req.body;

  // Voeg eerst toe aan gebruiker
  const insertGebruikerSql = `
    INSERT INTO gebruiker (email, wachtwoord, rol)
    VALUES (?, ?, 'student')
  `;

  db.query(insertGebruikerSql, [email, wachtwoord], (err, result) => {
    if (err) return res.status(500).json({ error: 'Fout bij toevoegen gebruiker: ' + err.message });

    const gebruikerId = result.insertId;

    // Voeg toe aan student
    const insertStudentSql = `
      INSERT INTO student (
        student_id, voornaam, naam, opleiding, specialisatie, opleidingsjaar, adres, email
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      gebruikerId,
      voornaam,
      naam,
      opleiding,
      specialisatie,
      opleidingsjaar,
      adres,
      email
    ];

    db.query(insertStudentSql, values, (err2) => {
      if (err2) return res.status(500).json({ error: 'Fout bij toevoegen student: ' + err2.message });

      res.status(201).json({ message: 'Student en gebruiker succesvol toegevoegd.', gebruiker_id: gebruikerId });
    });
  });
});

app.post('/api/bedrijvenToevoegen', (req, res) => {
  const {
    naam,
    locatie,
    vertegenwoordiger,
    telefoon,
    email,
    wachtwoord
  } = req.body;

  // 1. Voeg gebruiker toe met rol 'bedrijf'
  const insertGebruikerSql = `
    INSERT INTO gebruiker (email, wachtwoord, rol)
    VALUES (?, ?, 'bedrijf')
  `;

  db.query(insertGebruikerSql, [email, wachtwoord], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Fout bij toevoegen gebruiker: ' + err.message });
    }

    const gebruikerId = result.insertId;

    // 2. Voeg bedrijf toe
    const insertBedrijfSql = `
      INSERT INTO bedrijf (
        bedrijf_id, naam, locatie, vertegenwoordiger, telefoon, logo_link
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      gebruikerId,   // bedrijf_id = zelfde als gebruiker_id
      naam,
      locatie,
      vertegenwoordiger,
      telefoon,
      'logo_'+naam
    ];

    db.query(insertBedrijfSql, values, (err2) => {
      if (err2) {
        return res.status(500).json({ error: 'Fout bij toevoegen bedrijf: ' + err2.message });
      }

      res.status(201).json({
        message: 'Bedrijf en gebruiker succesvol toegevoegd.',
        gebruiker_id: gebruikerId
      });
    });
  });
});




// 1. Set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const isValid = allowed.test(file.mimetype);
  isValid ? cb(null, true) : cb(new Error('Only images allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// 2. Upload Route with old file cleanup
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const imagePath = `/uploads/${req.file.filename}`;
  const userId = req.body.userId;

  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  // Step 1: Get existing profiel_foto_url from student
  const selectQuery = 'SELECT profiel_foto_url FROM student WHERE student_id = ?';

  db.query(selectQuery, [userId], (selectErr, results) => {
    if (selectErr) {
      console.error('MySQL SELECT error:', selectErr);
      return res.status(500).json({ error: 'Could not fetch existing image' });
    }

    const oldImage = results[0]?.profiel_foto_url;

    // Step 2: Delete old image if it exists
    if (oldImage) {
      const oldImagePath = path.join(__dirname, oldImage);
      fs.unlink(oldImagePath, (unlinkErr) => {
        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
          console.warn('Failed to delete previous image:', unlinkErr.message);
        }
      });
    }

    // Step 3: Save new path to DB
    const updateQuery = 'UPDATE student SET profiel_foto_url = ? WHERE student_id = ?';
    db.query(updateQuery, [imagePath, userId], (updateErr) => {
      if (updateErr) {
        console.error('MySQL UPDATE error:', updateErr);
        return res.status(500).json({ error: 'Failed to update image in DB' });
      }

      res.json({ imageUrl: imagePath });
    });
  });
});


