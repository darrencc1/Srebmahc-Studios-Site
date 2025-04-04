import React, { useEffect, useRef } from 'react';
import Player from './Player';
import Obstacle from './Obstacle';
import { checkCollision } from './Utils';
import { saveScore } from './BoxDodgeFirestore';

function GameCanvas({ onGameOver }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;

    const player = new Player(130, canvas.height - 40, 40, 40, canvas.width);
    const obstacle = new Obstacle(30, 30, canvas.width);

    let score = 0;
    const startTime = Date.now();
    const scoreInterval = setInterval(() => {
      score = Math.floor((Date.now() - startTime) / 1000) * 10;
    }, 1000);

    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a') player.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') player.keys.right = true;
    }

    function handleKeyUp(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a') player.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') player.keys.right = false;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    let animationFrameId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      player.move();
      player.draw(ctx);

      obstacle.update();
      obstacle.draw(ctx);

      if (checkCollision(player, obstacle)) {
        clearInterval(scoreInterval);

        const playerName = "player1"; // Later, allow user input for name
        saveScore(playerName, score); // Save score to Firestore

        onGameOver(); // Callback
        return;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onGameOver]);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '3px solid red', backgroundColor: '#111', marginTop: '1rem' }}
    />
  );
}

export default GameCanvas;
