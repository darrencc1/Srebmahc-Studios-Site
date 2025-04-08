import React from 'react';
import GameCanvas from './Games/BoxDodge/BoxDodgerGame';       
import GameCanvasTower from './Games/TowerDefense/GameCanvasTower'; 

function FreeGames() {
  const handleGameOver = () => {
    console.log("Box Dodger game over!");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎮 Free Games</h1>

      <section>
        <h2>🟥 Box Dodger</h2>
        <GameCanvas onGameOver={handleGameOver} />
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>🟦 Tower Defense</h2>
        <GameCanvasTower />
      </section>
    </div>
  );
}

export default FreeGames;
