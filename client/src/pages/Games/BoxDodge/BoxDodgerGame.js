import React, { useState } from 'react';
import GameCanvas from './GameCanvas';

function BoxDodgerGame() {
  const [gameState, setGameState] = useState('start'); 

  const startGame = () => setGameState('playing');
  const resetGame = () => setGameState('start');

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>🚧 Box Dodger</h3>

      {gameState === 'start' && (
        <>
          <p>Use <strong>A/D</strong> or <strong>←/→</strong> to move. Avoid the red block!</p>
          <button onClick={startGame}>▶️ Play</button>
        </>
      )}

      {gameState === 'playing' && (
        <GameCanvas onGameOver={() => setGameState('gameOver')} />
      )}

      {gameState === 'gameOver' && (
        <>
          <p style={{ color: 'red', fontWeight: 'bold' }}>💀 Game Over!</p>
          <button onClick={resetGame}>🔁 Try Again</button>
        </>
      )}
    </div>
  );
}

export default BoxDodgerGame;