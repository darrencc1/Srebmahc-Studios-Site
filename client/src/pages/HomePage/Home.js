import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImagePrompt from './ImagePrompt';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5050/')
      .then(res => setMessage(res.data))
      .catch(() => setMessage('Error contacting backend.'));
  }, []);

  return (
    <div>
      <h2>👾 Welcome to Srebmahc Studios</h2>
      <p>Explore our worlds. Play our games. Shape the future of indie gaming.</p>
      {message && <p style={{ fontStyle: 'italic' }}>{message}</p>}
      <ImagePrompt />
    </div>
  );
}

export default Home;
