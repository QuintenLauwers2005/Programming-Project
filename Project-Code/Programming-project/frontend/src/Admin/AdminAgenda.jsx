import React, { useState, useEffect } from 'react';
import '../Components/Agenda.css';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

export default function AdminAgenda() {
  const [afspraken, setAfspraken] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [tijdConfig, setTijdConfig] = useState({ beginuur: '', einduur: '' });
  const [formData, setFormData] = useState({ beginuur: '', einduur: '' });
  const [aulaEdits, setAulaEdits] = useState({});
  const [filterNaam, setFilterNaam] = useState('');
  const [filterBedrijf, setFilterBedrijf] = useState('');

  useEffect(() => {
    // Haal alle afspraken op
    fetch('http://localhost:5000/api/afspraken/all')
      .then(res => res.json())
      .then(data => setAfspraken(data))
      .catch(err => console.error('Fout bij ophalen van afspraken:', err));

    // Haal huidige speeddate tijdconfig op
    fetch('http://localhost:5000/api/speeddate-config')
      .then(res => res.json())
      .then(data => {
        setTijdConfig(data);
        setFormData(data);
      })
      .catch(err => console.error('Fout bij ophalen tijdsconfiguratie:', err));
  }, []);

  // Aula per bedrijf wijzigen input handler
  const handleAulaChange = (bedrijfId, value) => {
    setAulaEdits(prev => ({ ...prev, [bedrijfId]: value }));
  };

  // Aula opslaan, update backend en refresh afsprakenlijst
  const handleAulaSave = (bedrijfId) => {
    const nieuweAula = aulaEdits[bedrijfId];
    if (!nieuweAula) {
      alert('Voer een geldige aula in.');
      return;
    }

    fetch(`http://localhost:5000/api/bedrijf/${bedrijfId}/aula`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aula: nieuweAula }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Fout bij opslaan aula');
        return res.json();
      })
      .then(() => {
        // Nieuwe data ophalen
        return fetch('http://localhost:5000/api/afspraken/all')
          .then(res => res.json())
          .then(setAfspraken);
      })
      .catch(err => {
        console.error(err);
        alert('Fout bij opslaan van aula.');
      });
  };

  // Annuleren bevestigen
  const handleCancelConfirm = (id) => setCancelId(id);

  const confirmCancel = () => {
    fetch(`http://localhost:5000/api/speeddate/${cancelId}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Fout bij annuleren');
        return res.json();
      })
      .then(() => {
        setAfspraken(prev => prev.filter(app => app.id !== cancelId));
        setCancelId(null);
      })
      .catch(err => {
        console.error(err);
        alert('Fout bij annuleren van afspraak');
        setCancelId(null);
      });
  };

  const closeCancelModal = () => setCancelId(null);

  // Tijdconfiguratie form handlers
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveTijden = () => {
    if (!formData.beginuur || !formData.einduur) {
      alert('Vul zowel begin- als einduur in.');
      return;
    }

    fetch('http://localhost:5000/api/speeddate-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Fout bij opslaan tijdconfig');
        return res.json();
      })
      .then(() => {
        setTijdConfig(formData);
      })
      .catch(err => {
        console.error(err);
        alert('Opslaan tijdschema mislukt');
      });
  };

  // Filter afspraken op naam (voornaam + naam) en bedrijf_naam
  const gefilterdeAfspraken = afspraken.filter(afspraak => {
    const zoekNaam = filterNaam.toLowerCase();
    const zoekBedrijf = filterBedrijf.toLowerCase();

    const volledigeNaam = (afspraak.voornaam + ' ' + afspraak.naam).toLowerCase();

    const naamMatch = volledigeNaam.includes(zoekNaam);
    const bedrijfMatch = afspraak.bedrijf_naam.toLowerCase().includes(zoekBedrijf);

    return naamMatch && bedrijfMatch;
  });

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-container">
        <div className="page">

          {/* Tijdconfiguratie */}
          <div className="time-settings">
            <h3>Begin- en eindtijden van de speeddates instellen</h3>
            <div className="time-settings-row">
              <div className="time-input-group">
                <label>Beginuur:</label>
                <input
                  type="time"
                  name="beginuur"
                  value={formData.beginuur}
                  onChange={handleFormChange}
                />
              </div>
              <div className="time-input-group">
                <label>Einduur:</label>
                <input
                  type="time"
                  name="einduur"
                  value={formData.einduur}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="time-settings-buttons">
              <button onClick={handleSaveTijden} className="save-button">
                Opslaan
              </button>
            </div>
          </div>

          {/* Filter inputs */}
          <div className="filter-container" style={{ margin: '1rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Zoek op naam..."
              value={filterNaam}
              onChange={(e) => setFilterNaam(e.target.value)}
              style={{ padding: '0.5rem', flex: '1 1 200px', fontSize: '1rem' }}
            />
            <input
              type="text"
              placeholder="Zoek op bedrijf..."
              value={filterBedrijf}
              onChange={(e) => setFilterBedrijf(e.target.value)}
              style={{ padding: '0.5rem', flex: '1 1 200px', fontSize: '1rem' }}
            />
          </div>

          {/* Afsprakenlijst */}
          {gefilterdeAfspraken.length > 0 ? (
            gefilterdeAfspraken.map((afspraak) => {
              const bedrijfId = afspraak.bedrijf_id;
              // Huidige aula in de input: eerst uit edits, anders locatie uit afspraak
              const huidigeAula = aulaEdits[bedrijfId] ?? afspraak.locatie;

              return (
                <div key={afspraak.id} className="card">
                  <div className="time">{afspraak.time}</div>
                  <div className="company">
                    {afspraak.voornaam} {afspraak.naam} — {afspraak.bedrijf_naam}
                  </div>

                  <div className="lokaal">
                    <input
                      type="text"
                      value={huidigeAula}
                      onChange={(e) => handleAulaChange(bedrijfId, e.target.value)}
                      placeholder="Lokaal"
                    />
                    <button
                      onClick={() => handleAulaSave(bedrijfId)}
                      className="save-button"
                    >
                      Opslaan
                    </button>
                  </div>

                  <button
                    className="cancel-button"
                    onClick={() => handleCancelConfirm(afspraak.id)}
                  >
                    Annuleren
                  </button>
                </div>
              );
            })
          ) : (
            <div className="no-appointments">
              <p>Geen afspraken gevonden.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info modal */}
      {showInfo && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Hoe reserveer je een speeddate?</h3>
            <p>
              Ga naar de vacaturepagina en klik op "Reserveer een gesprek" bij het bedrijf dat je interessant vindt.
            </p>
            <button onClick={() => setShowInfo(false)}>Sluiten</button>
          </div>
        </div>
      )}

      {/* Annuleerbevestiging */}
      {cancelId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Bevestig annulatie</h3>
            <p>Ben je zeker dat je deze speeddate wilt annuleren?</p>
            <button onClick={confirmCancel}>Ja, annuleren</button>
            <button onClick={closeCancelModal}>Nee, terug</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
