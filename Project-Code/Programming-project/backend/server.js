const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express()
const port = 5000
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve images

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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Geen token meegegeven' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token ongeldig of verlopen' });
    req.user = user;
    next();
  });
}


app.get('/api/student/:id', authenticateToken, (req, res) => {
  const studentId = parseInt(req.params.id);

  // Autorisatiecheck: alleen admin, bedrijf, of de student zelf mag dit zien
  if (
    req.user.rol !== 'admin' &&
    req.user.rol !== 'bedrijf' &&
    req.user.id !== studentId
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }

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
      v.naam AS vaardigheid_naam,
      s.linkedin_url,
      s.bio,
      s.adres,
      s.specialisatie,
      s.telefoon
    FROM student s
    LEFT JOIN student_vaardigheid sv ON s.student_id = sv.student_id
    LEFT JOIN vaardigheid v ON sv.vaardigheid_id = v.id
    WHERE s.student_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Interne serverfout' });
    if (results.length === 0) return res.status(404).json({ error: 'Student niet gevonden' });

    const studentInfo = {
      id: results[0].student_id.toString(),
      name: `${results[0].voornaam || ''} ${results[0].naam || ''}`,
      email: results[0].email,
      opleiding: results[0].opleiding,
      instelling: 'Erasmushogeschool Brussel',
      afstudeerjaar: results[0].opleidingsjaar,
      adres: results[0].adres,
      profielFotoUrl: results[0].profiel_foto_url,
      linkedinurl: results[0].linkedin_url,
      bio: results[0].bio,
      specialisatie: results[0].specialisatie,
      telefoon: results[0].telefoon,
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

// Student verwijderen
app.delete('/api/student/:id', (req, res) => {
  const studentId = req.params.id;

  // Eerst de studentrecord verwijderen
  db.query('DELETE FROM student WHERE student_id = ?', [studentId], (err1) => {
    if (err1) {
      console.error('Fout bij verwijderen uit student:', err1);
      return res.status(500).json({ error: 'Fout bij verwijderen uit student' });
    }

    // Daarna de gebruikerrecord verwijderen
    db.query('DELETE FROM gebruiker WHERE gebruiker_id = ?', [studentId], (err2) => {
      if (err2) {
        console.error('Fout bij verwijderen uit gebruiker:', err2);
        return res.status(500).json({ error: 'Fout bij verwijderen uit gebruiker' });
      }

      res.json({ message: 'Student en gebruiker verwijderd' });
    });
  });
});


// Bedrijf verwijderen
app.delete('/api/bedrijf/:id', (req, res) => {
  const bedrijfId = req.params.id;

  // Eerst bedrijf-record verwijderen
  db.query('DELETE FROM bedrijf WHERE bedrijf_id = ?', [bedrijfId], (err1) => {
    if (err1) {
      console.error('Fout bij verwijderen uit bedrijf:', err1);
      return res.status(500).json({ error: 'Fout bij verwijderen uit bedrijf' });
    }

    // Daarna de gekoppelde gebruiker verwijderen
    db.query('DELETE FROM gebruiker WHERE gebruiker_id = ?', [bedrijfId], (err2) => {
      if (err2) {
        console.error('Fout bij verwijderen uit gebruiker:', err2);
        return res.status(500).json({ error: 'Fout bij verwijderen uit gebruiker' });
      }

      res.json({ message: 'Bedrijf en gebruiker verwijderd' });
    });
  });
});



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

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Gebruiker niet gevonden' });
    }

    const gebruiker = results[0];

    try {
      const isMatch = await bcrypt.compare(password, gebruiker.wachtwoord);

      if (!isMatch) {
        return res.status(401).json({ error: 'Wachtwoord is incorrect' });
      }

      // ✅ Maak de JWT-token aan
      const token = jwt.sign(
        { id: gebruiker.gebruiker_id, rol: gebruiker.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        message: 'Login succesvol',
        token, // ✅ stuur de token mee naar frontend
        gebruiker_id: gebruiker.gebruiker_id,
        rol: gebruiker.rol,
        naam: gebruiker.rol === 'student' ? gebruiker.student_naam : null,
        logo_link: gebruiker.rol === 'bedrijf' ? gebruiker.bedrijf_logo : null
      });

    } catch (compareErr) {
      return res.status(500).json({ error: 'Fout bij wachtwoordverificatie: ' + compareErr.message });
    }
  });
});




//vacatures ophalen
app.get('/api/vacatures', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT v.vacature_id, b.naam AS bedrijf, v.functie, v.contract_type, v.synopsis, v.open, b.logo_link, b.bedrijf_id,b.aula
    FROM vacature v
    JOIN bedrijf b ON v.bedrijf_id = b.bedrijf_id
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [limit, offset], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
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


//vacatures verwijderen

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
app.get('/api/studenten',authenticateToken, (req, res) => {

  if (
    req.user.rol !== 'admin'
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }

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




//bedrijven ophalen
app.get('/api/bedrijven', (req, res) => {
  const sql = `SELECT bedrijf_id AS id, naam, logo_link, locatie FROM bedrijf`;

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
      b.aula,
      b.vertegenwoordiger,
      b.telefoon,
      b.logo_link,
      v.vacature_id,
      v.functie,
      v.contract_type,
      v.synopsis,
      v.open,
      b.url,
      g.email,
      b.bio
    FROM bedrijf b
    LEFT JOIN vacature v ON b.bedrijf_id = v.bedrijf_id
    LEFT JOIN gebruiker g ON b.bedrijf_id = g.gebruiker_id
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
      aula:results[0].aula,
      email:results[0].email,
      bio:results[0].bio,
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
  const { naam, locatie, vertegenwoordiger, telefoon, url, aula,bio } = req.body;

  let sql;
  let values;

  // Bepaal welke SQL en values worden gebruikt, afhankelijk van of aula is meegegeven
  if (aula !== undefined && aula !== null) {
    sql = `
      UPDATE bedrijf 
      SET naam = ?, locatie = ?, vertegenwoordiger = ?, telefoon = ?, url = ?, aula = ?, bio = ?
      WHERE bedrijf_id = ?
    `;
    values = [naam, locatie, vertegenwoordiger, telefoon, url, aula,bio, bedrijfId];
  } else {
    sql = `
      UPDATE bedrijf 
      SET naam = ?, locatie = ?, vertegenwoordiger = ?, telefoon = ?, url = ?,bio = ?
      WHERE bedrijf_id = ?
    `;
    values = [naam, locatie, vertegenwoordiger, telefoon, url, bio, bedrijfId];
  }

  // Update bedrijf
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Fout bij bijwerken bedrijf:', err);
      return res.status(500).json({ error: 'Databasefout' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bedrijf niet gevonden' });
    }

    // Als aula is meegegeven, update dan ook de locatie in speeddate
    if (aula !== undefined && aula !== null) {
      const sqlSpeeddate = `
        UPDATE speeddate
        SET locatie = ?
        WHERE bedrijf_id = ?
      `;
      db.query(sqlSpeeddate, [aula, bedrijfId], (err2, result2) => {
        if (err2) {
          console.error('Fout bij bijwerken speeddate locatie:', err2);
          return res.status(500).json({ error: 'Databasefout bij speeddate update' });
        }
        return res.json({ message: 'Bedrijf en speeddate locatie succesvol bijgewerkt' });
      });
    } else {
      return res.json({ message: 'Bedrijf succesvol bijgewerkt' });
    }
  });
});




// PUT: student bijwerken
app.put('/api/student/:id', (req, res) => {
  const studentId = req.params.id;
  const { voornaam, naam, email, adres, specialisatie, linkedin, bio, telefoon, opleiding } = req.body;

  const updateStudentSql = `
    UPDATE student 
    SET voornaam = ?, naam = ?, email = ?, adres = ?, specialisatie = ?, linkedin_url = ?, bio = ?, telefoon = ?, opleiding = ?
    WHERE student_id = ?
  `;

  const studentValues = [voornaam, naam, email, adres, specialisatie, linkedin, bio, telefoon, opleiding, studentId];

  db.query(updateStudentSql, studentValues, (err, result) => {
    if (err) {
      console.error('Fout bij bijwerken student:', err);
      return res.status(500).json({ error: 'Databasefout bij studentupdate' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student niet gevonden' });
    }

    // ✉️ Email ook bijwerken in gebruiker-tabel (zelfde ID)
    const updateGebruikerSql = `UPDATE gebruiker SET email = ? WHERE gebruiker_id = ?`;

    db.query(updateGebruikerSql, [email, studentId], (err2) => {
      if (err2) {
        console.error('Fout bij bijwerken gebruiker-email:', err2);
        return res.status(500).json({ error: 'Databasefout bij gebruikerupdate' });
      }

      res.json({ message: 'Student en gebruiker succesvol bijgewerkt' });
    });
  });
});


app.get('/api/HomePageAantalen', (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM bedrijf) AS bedrijf_aantal,
      (SELECT COUNT(*) FROM vacature) AS vacature_aantal,
      (SELECT COUNT(*) FROM student) AS student_aantal,
      (SELECT COUNT(*) FROM speeddate) AS speeddate_aantal
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
        const insertSql = `INSERT INTO speeddate (student_id, bedrijf_id, tijdstip, locatie, status) VALUES (?, ?, ?, ?, ?)`;

        db.query(insertSql, [student_id, bedrijf_id, tijdstip, locatie, status], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          // Haal studentnaam op
          const getStudentSql = `SELECT voornaam, naam FROM student WHERE student_id = ?`;

          db.query(getStudentSql, [student_id], (err2, studentResults) => {
            if (err2) return res.status(500).json({ error: err2.message });

            const { voornaam, naam } = studentResults[0] || { voornaam: 'Student', naam: '' };
            const volledigeNaam = `${voornaam} ${naam}`.trim();

            // Haal bedrijfsnaam op
            const getBedrijfSql = `SELECT naam FROM bedrijf WHERE bedrijf_id = ?`;

            db.query(getBedrijfSql, [bedrijf_id], (err3, bedrijfResults) => {
              if (err3) return res.status(500).json({ error: err3.message });

              const bedrijfsNaam = bedrijfResults[0]?.naam || 'een bedrijf';

              // ✅ INSERT melding voor het bedrijf
              const boodschapBedrijf = `📅 ${volledigeNaam} heeft een speeddate ingepland op ${tijdstip} te ${locatie || 'onbekende locatie'}.`;

              // ✅ INSERT melding voor de student
              const boodschapStudent = `✅ Je hebt een speeddate ingepland met ${bedrijfsNaam} op ${tijdstip} te ${locatie || 'onbekende locatie'}.`;

              const insertMeldingSql = `
                INSERT INTO melding (gebruiker_id, boodschap) VALUES (?, ?)
              `;

              // Eerst melding voor bedrijf toevoegen
              db.query(insertMeldingSql, [bedrijf_id, boodschapBedrijf], (err4) => {
                if (err4) return res.status(500).json({ error: err4.message });

                // Dan melding voor student toevoegen
                db.query(insertMeldingSql, [student_id, boodschapStudent], (err5) => {
                  if (err5) return res.status(500).json({ error: err5.message });

                  // ✅ Alles gelukt
                  res.status(201).json({ message: 'Afspraak en meldingen succesvol opgeslagen.' });
                });
              });
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

// alle afspraken opvragen. voor admin agenda
app.get('/api/afspraken/all', authenticateToken,(req, res) => {

    if (
    req.user.rol !== 'admin' 
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }
  const sql = `
    SELECT 
      s.speeddate_id AS id,
      s.tijdstip AS time,
      st.voornaam,
      st.naam,
      s.locatie,
      b.naam AS bedrijf_naam,
      s.status,
      b.bedrijf_id
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

app.get('/api/afspraken', authenticateToken,(req, res) => {
  const gebruikerId = req.query.gebruiker_id;  // gebruiker_id vanuit query

   if (
    req.user.rol !== 'bedrijf' &&
    req.user.rol !== 'student'
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }

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
      s.status,
      s.student_id,
      b.bedrijf_id
    FROM speeddate s
    JOIN student st ON s.student_id = st.student_id
    JOIN bedrijf b ON s.bedrijf_id = b.bedrijf_id
    WHERE s.student_id = ? OR s.bedrijf_id = ?
    ORDER BY s.tijdstip ASC
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
  const { status, locatie } = req.body;

  console.log('PUT /api/speeddate/:id/status', { speeddateId, status });

  const updateSql = `UPDATE speeddate SET status = ?, locatie = ? WHERE speeddate_id = ?` ;

  db.query(updateSql, [status, locatie, speeddateId], (err, result) => {
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





app.get('/api/meldingen/:gebruikerId', authenticateToken,(req, res) => {
  const gebruikerId = req.params.gebruikerId;

  if (
    req.user.rol !== 'bedrijf' &&
    req.user.rol !== 'student' &&
    req.user.rol !== 'admin'
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }

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



app.post('/api/studentenToevoegen', async (req, res) => {
  const {
    voornaam,
    naam,
    email,
    wachtwoord,
    WachtwoordBevestiging,
    opleiding,
    specialisatie,
    opleidingsjaar,
    adres
  } = req.body;

  try {
    //Check of email al bestaat
    const [rows] = await db.promise().query(
      'SELECT * FROM gebruiker WHERE email = ?',
      [email]
    );
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Gebruiker met dit e-mailadres bestaat al.' });
    }

    // Wachtwoordvergelijking
    if (wachtwoord !== WachtwoordBevestiging) {
      return res.status(400).json({ error: 'Wachtwoorden komen niet overeen.' });
    }

    const hashedPassword = await bcrypt.hash(wachtwoord, 10);

    const insertGebruikerSql = `
      INSERT INTO gebruiker (email, wachtwoord, rol)
      VALUES (?, ?, 'student')
    `;

    db.query(insertGebruikerSql, [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'Fout bij toevoegen gebruiker: ' + err.message });

      const gebruikerId = result.insertId;

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

        res.status(201).json({
          message: 'Student en gebruiker succesvol toegevoegd.',
          gebruiker_id: gebruikerId
        });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Interne serverfout: ' + err.message });
  }
});



app.post('/api/bedrijvenToevoegen', async (req, res) => {
  const {
    naam,
    adres,
    vertegenwoordiger,
    telefoon,
    email,
    wachtwoord,
    bevestigWachtwoord
  } = req.body;

  try {
    // 🔎 Check of email of bedrijfsnaam al bestaat
    const [emailRows] = await db.promise().query(
      'SELECT * FROM gebruiker WHERE email = ?',
      [email]
    );
    if (emailRows.length > 0) {
      return res.status(400).json({ error: 'Gebruiker met dit e-mailadres bestaat al.' });
    }

    const [naamRows] = await db.promise().query(
      'SELECT * FROM bedrijf WHERE naam = ?',
      [naam]
    );
    if (naamRows.length > 0) {
      return res.status(400).json({ error: 'Bedrijf met deze naam bestaat al.' });
    }

    // 🔐 Wachtwoordvergelijking
    if (wachtwoord !== bevestigWachtwoord) {
      return res.status(400).json({ error: 'Wachtwoorden komen niet overeen.' });
    }

    const hashedPassword = await bcrypt.hash(wachtwoord, 10);

    const insertGebruikerSql = `
      INSERT INTO gebruiker (email, wachtwoord, rol)
      VALUES (?, ?, 'bedrijf')
    `;

    db.query(insertGebruikerSql, [email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Fout bij toevoegen gebruiker: ' + err.message });
      }

      const gebruikerId = result.insertId;

      const insertBedrijfSql = `
        INSERT INTO bedrijf (
          bedrijf_id, naam, locatie, vertegenwoordiger, telefoon, logo_link
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        gebruikerId,
        naam,
        adres,
        vertegenwoordiger,
        telefoon,
        'logo_' + naam +'.png'
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
  } catch (err) {
    res.status(500).json({ error: 'Interne serverfout: ' + err.message });
  }
});



app.get('/api/speeddate-config', (req, res) => {
  db.query('SELECT beginuur, einduur FROM speeddate_config LIMIT 1', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});


app.put('/api/speeddate-config', (req, res) => {
  const { beginuur, einduur } = req.body;

  if (!beginuur || !einduur) {
    return res.status(400).json({ error: 'Begin- en einduur zijn verplicht.' });
  }

  const sql = `UPDATE speeddate_config SET beginuur = ?, einduur = ? WHERE config_id = 1`;
  db.query(sql, [beginuur, einduur], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Speeddate-uren succesvol bijgewerkt' });
  });
});


// 1. Set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|pdf/;
  const isValid = allowed.test(file.mimetype);
  isValid ? cb(null, true) : cb(new Error('Only images allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
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



// POST route to upload CV and remove old one
app.post('/api/upload-cv', upload.single('cv'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const userId = req.body.userId;
  const newPath = `/uploads/${req.file.filename}`;

  // Step 1: Get old CV path
  const getOldQuery = 'SELECT cv_link FROM student WHERE student_id = ?';
  db.query(getOldQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching old CV:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const oldPath = results[0]?.cv_link;

    // Step 2: Delete old file if it exists
    if (oldPath) {
      const fullPath = path.join(__dirname, oldPath);
      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
          console.error('Error deleting old file:', unlinkErr);
        }
      });
    }

    // Step 3: Update DB with new path
    const updateQuery = 'UPDATE student SET cv_link = ? WHERE student_id = ?';
    db.query(updateQuery, [newPath, userId], (err) => {
      if (err) {
        console.error('Error updating DB:', err);
        return res.status(500).json({ error: 'Database update failed' });
      }

      res.json({ cv_link: newPath });
    });
  });
});

app.get('/api/student/:id/cv', authenticateToken, (req, res) => {
  const studentId = req.params.id;

   // Autorisatiecheck: alleen admin, bedrijf, of de student zelf mag dit zien
  if (
    req.user.rol !== 'admin' &&
    req.user.rol !== 'bedrijf' &&
    req.user.id !== studentId
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }

  const query = 'SELECT cv_link FROM student WHERE student_id = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching cv_link:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ cv_link: results[0].cv_link });
  });
});


app.post('/api/upload/logo', upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const logoPath = `/uploads/${req.file.filename}`;
  const bedrijfId = req.body.bedrijfId;

  // Check if bedrijf already has a logo to delete
  const getQuery = 'SELECT logo_link FROM bedrijf WHERE bedrijf_id = ?';
  db.query(getQuery, [bedrijfId], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error on select' });

    const oldPath = result[0]?.logo_link;
    if (oldPath) {
      const fullPath = path.join(__dirname, oldPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    // Update DB with new logo path
    const updateQuery = 'UPDATE bedrijf SET logo_link = ? WHERE bedrijf_id = ?';
    db.query(updateQuery, [logoPath, bedrijfId], (err, result) => {
      if (err) return res.status(500).json({ error: 'DB update failed' });
      res.json({ logoUrl: logoPath });
    });
  });
});

app.patch('/api/meldingen/lezen/:gebruikerId', (req, res) => {
  const gebruikerId = req.params.gebruikerId;

  const sql = `
    UPDATE melding 
    SET gelezen = 1 
    WHERE gebruiker_id = ? AND gelezen = 0
  `;

  db.query(sql, [gebruikerId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, updated: result.affectedRows });
  });
});

app.get('/api/bedrijf/:id/aula', (req, res) => {
  const bedrijfId = req.params.id;

  const sql = `SELECT aula FROM bedrijf WHERE bedrijf_id = ?`;

  db.query(sql, [bedrijfId], (err, results) => {
    if (err) {
      console.error('Fout bij ophalen van aula:', err);
      return res.status(500).json({ error: 'Databasefout' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Bedrijf niet gevonden' });
    }

    res.json({ aula: results[0].aula });
  });
});


app.get('/api/speeddate/unavailable',authenticateToken, (req, res) => {
  const { student_id, bedrijf_id } = req.query;

   if (
    req.user.rol !== 'student' &&
    req.user.id !== student_id
  ) {
    return res.status(403).json({ error: 'Geen toegang tot deze studentgegevens' });
  }

  const sql = `
    SELECT tijdstip FROM speeddate
    WHERE student_id = ? OR bedrijf_id = ?
  `;

  db.query(sql, [student_id, bedrijf_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const times = results.map(row => row.tijdstip.slice(0, 5)); // "HH:MM:SS" to "HH:MM"
    return res.json(times);
  });
});

app.put('/api/bedrijf/:id/aula', (req, res) => {
  const bedrijfId = req.params.id;
  const { aula } = req.body;

  if (!aula) {
    return res.status(400).json({ error: 'Aula is vereist' });
  }

  // Update de aula in de bedrijf-tabel
  const updateBedrijfQuery = `
    UPDATE bedrijf 
    SET aula = ? 
    WHERE bedrijf_id = ?
  `;

  db.query(updateBedrijfQuery, [aula, bedrijfId], (err, result) => {
    if (err) {
      console.error('Fout bij bijwerken van bedrijf.aula:', err);
      return res.status(500).json({ error: 'Databasefout bij bijwerken van bedrijf' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bedrijf niet gevonden' });
    }

    // Update ook de locatie in speeddate-tabel naar de nieuwe aula
    const updateSpeeddateQuery = `
      UPDATE speeddate 
      SET locatie = ?
      WHERE bedrijf_id = ?
    `;

    db.query(updateSpeeddateQuery, [aula, bedrijfId], (err2, result2) => {
      if (err2) {
        console.error('Fout bij bijwerken van speeddate.locatie:', err2);
        return res.status(500).json({ error: 'Databasefout bij bijwerken van speeddate' });
      }

      return res.json({
        message: 'Aula succesvol bijgewerkt in bedrijf en locatie aangepast in speeddate',
      });
    });
  });
});

app.put('/api/student/:id/skills', (req, res) => {
  const studentId = req.params.id;
  const skills = req.body.skills || [];

  // Verwijder oude vaardigheden
  const deleteSql = 'DELETE FROM student_vaardigheid WHERE student_id = ?';
  db.query(deleteSql, [studentId], (err) => {
    if (err) {
      console.error('Fout bij verwijderen vaardigheden:', err);
      return res.status(500).json({ error: 'Kon oude vaardigheden niet verwijderen' });
    }

    // Voeg nieuwe vaardigheden toe (indien nodig) en koppel ze
    const insertSkill = (skill) => {
      return new Promise((resolve, reject) => {
        const vaardigheidId = `skill_${skill.toLowerCase().replace(/\s+/g, '_')}`;

        // Voeg toe aan vaardigheid (indien niet bestaand)
        const insertVaardigheidSql = `
          INSERT IGNORE INTO vaardigheid (id, naam) VALUES (?, ?)
        `;
        db.query(insertVaardigheidSql, [vaardigheidId, skill], (err) => {
          if (err) return reject(err);

          // Voeg toe aan koppelings-tabel
          const linkSql = `
            INSERT INTO student_vaardigheid (student_id, vaardigheid_id)
            VALUES (?, ?)
          `;
          db.query(linkSql, [studentId, vaardigheidId], (err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      });
    };

    // Voeg alle nieuwe vaardigheden toe
    Promise.all(skills.map(insertSkill))
      .then(() => {
        res.json({ message: 'Vaardigheden succesvol bijgewerkt' });
      })
      .catch((err) => {
        console.error('Fout bij toevoegen vaardigheden:', err);
        res.status(500).json({ error: 'Kon vaardigheden niet opslaan' });
      });
  });
});

