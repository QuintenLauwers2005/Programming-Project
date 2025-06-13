import React, { useState } from 'react';
import axios from 'axios';

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
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
}

export default UploadForm;