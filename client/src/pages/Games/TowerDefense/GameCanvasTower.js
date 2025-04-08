import React, { useRef, useEffect } from 'react';
import Enemy from './Enemy';
import Tower from './Tower';

function GameCanvasTower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;

    const enemies = [new Enemy(0, 200, 1)];
    const towers = [new Tower(300, 200)];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw enemies
      for (let enemy of enemies) {
        enemy.update();
        enemy.draw(ctx);
      }

      // Remove dead enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].health <= 0) enemies.splice(i, 1);
      }

      // Update and draw towers
      for (let tower of towers) {
        tower.update(enemies, ctx);
        tower.draw(ctx);
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '3px solid green', backgroundColor: '#222', marginTop: '1rem' }}
    />
  );
}

export default GameCanvasTower;
