import React, { useState } from 'react';
import axios from 'axios';

function ImagePrompt() {
  const [prompt, setPrompt] = useState('');
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const generateImage = async () => {
    setLoading(true);
    setImageData(null);
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5050/api/image/generate', { prompt });
      const base64 = res.data.image_base64;
      setImageData(base64);
    } catch (err) {
      setErrorMsg('Image generation failed.');
    }

    setLoading(false);
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = `data:image/png;base64,${imageData}`;
    a.download = `${prompt.replace(/\s+/g, '_').slice(0, 30)}.png`;
    a.click();
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <input
        type="text"
        placeholder="Enter your AI art prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={generateImage} disabled={loading || !prompt}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      {imageData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Prompt:</h3>
          <p>{prompt}</p>
          <img
            src={`data:image/png;base64,${imageData}`}
            alt="Generated"
            style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #ccc' }}
          />
          <br />
          <button onClick={downloadImage} style={{ marginTop: '10px' }}>
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ImagePrompt;
