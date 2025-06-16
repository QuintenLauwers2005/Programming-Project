import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

function LogoUploadForm() {
  const [file, setFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');
  const bedrijfId = localStorage.getItem('gebruiker_id'); // Or however you store it

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 2 * 1024 * 1024) {
      setFile(selected);
      setError('');
    } else {
      setError('Max file size is 2MB');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select a file.');

    const formData = new FormData();
    formData.append('logo', file);
    formData.append('bedrijfId', bedrijfId);

    try {
      const res = await axios.post('http://localhost:5000/api/upload/logo', formData);
      const newLogoUrl = `/uploads/${res.data.logoUrl.split('/uploads/')[1]}`; // normalized path
localStorage.setItem('Bedrijf_Logo', newLogoUrl); // update localStorage
      setLogoUrl(`http://localhost:5000${res.data.logoUrl}`);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form className="upload-container" onSubmit={handleUpload}>
        <input className="upload-input" type="file" accept="image/*" onChange={handleChange} />
        <button className="upload-button" type="submit">Upload Logo</button>
      </form>
      {error && <p className="upload-error">{error}</p>}
      {logoUrl && (
        <div className="upload-preview">
          <p>Uploaded Logo:</p>
          <img src={logoUrl} alt="Logo" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
}

export default LogoUploadForm;
