import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <p><strong>Backend says:</strong> {message}</p>
      <p>Explore our worlds. Play our games. Shape the future of indie gaming.</p>
      <p>Enjoy some free games that are being made RIGHT NOW</p>
    </div>
  );
}

export default Home;
