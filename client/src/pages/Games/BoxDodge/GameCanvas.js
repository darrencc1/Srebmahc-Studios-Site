import React, { useEffect, useRef } from 'react';
import Player from './Player';
import Obstacle from './Obstacle';
import { checkCollision } from './Utils';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function GameCanvas({ onGameOver }) {
  const canvasRef = useRef(null);
  const submitScore = async (score) => {
    try {
      await addDoc(collection(db, 'highscores_BoxDodger'), {
        name: 'Player1', // This is just to test that it works, will allow players to log in/ make a name later
        score,
        createdAt: serverTimestamp(),
      });
      console.log('✅ Score saved to Firestore:', score);
    } catch (err) {
      console.error('❌ Failed to save score:', err.message);
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;

    const player = new Player(130, canvas.height - 40, 40, 40, canvas.width);
    const obstacle = new Obstacle(30, 30, canvas.width);
    
    let score = 0;
    let scoreInterval = setInterval(() => {
    score = Math.floor((Date.now() - startTime) / 1000) * 10;
    }, 1000);

    let startTime = Date.now();

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
        submitScore(score);       // save to Firebase
        onGameOver();
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
