import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const userId = localStorage.getItem('gebruiker_id');


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
    formData.append('image', file);
    formData.append('userId', userId);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setImageUrl(`http://localhost:5000${res.data.imageUrl}`);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    }
  };


    return (
    <div>
      <form onSubmit={handleUpload} className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="upload-input"
        />
        <button type="submit" className="upload-button">Upload Profielfoto</button>
      </form>

      {error && <p className="upload-error">{error}</p>}

      {imageUrl && (
        <div className="upload-preview">
          <p>Geüploade foto:</p>
          <img src={imageUrl} alt="Upload preview" />
        </div>
      )}
    </div>
  );
}

export default UploadForm;