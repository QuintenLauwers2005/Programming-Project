import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css'; // Reuse existing styling

function CvUpload() {
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const userId = localStorage.getItem('gebruiker_id');




  const handleCvChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf' && selected.size <= 5 * 1024 * 1024) {
      setCvFile(selected);
      setError('');
    } else {
      setError('Alleen PDF-bestanden tot 5MB zijn toegestaan.');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!cvFile) {
      setError('Selecteer een CV-bestand om te uploaden.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile);
    formData.append('userId', userId);

    try {
      await axios.post('http://localhost:5000/api/upload-cv', formData);
      setSuccessMsg('CV succesvol geüpload.');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload mislukt');
    }
  };

  return (
    <div>
    <form onSubmit={handleUpload} className="upload-container">
      <input type="file" accept="application/pdf" onChange={handleCvChange} className="upload-input" />
      <button type="submit" className="upload-button">Upload CV</button>
      {error && <p className="upload-error">{error}</p>}
      {successMsg && <p className="upload-success">{successMsg}</p>}

     
    </form>
  </div>
  );
}

export default CvUpload;
