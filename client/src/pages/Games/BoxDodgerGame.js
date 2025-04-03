import React, { useRef, useEffect } from 'react';

function BoxDodgerGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;

    // Player settings
    let playerX = 130;
    const playerY = canvas.height - 40;
    const playerWidth = 40;
    const playerHeight = 40;
    const playerSpeed = 4;

    // Falling box settings
    let boxX = Math.random() * (canvas.width - 40);
    let boxY = 0;
    const boxWidth = 40;
    const boxHeight = 40;
    const boxSpeed = 3;

    const keys = {
      left: false,
      right: false,
    };

    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    }

    function handleKeyUp(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move player
      if (keys.left) playerX -= playerSpeed;
      if (keys.right) playerX += playerSpeed;

      // Keep player in bounds
      if (playerX < 0) playerX = 0;
      if (playerX + playerWidth > canvas.width) playerX = canvas.width - playerWidth;

      // Draw player
      ctx.fillStyle = '#00ffcc';
      ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

      // Move and draw falling box
      ctx.fillStyle = 'red';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      boxY += boxSpeed;

      // Reset falling box when it goes off screen
      if (boxY > canvas.height) {
        boxY = -boxHeight;
        boxX = Math.random() * (canvas.width - boxWidth);
      }

      requestAnimationFrame(draw);
    }

    draw();

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <h3>🚧 Box Dodger</h3>
      <p>Move with <strong>← →</strong> or <strong>A D</strong> to dodge falling blocks!</p>
      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid red',
          backgroundColor: '#111',
          marginTop: '1rem',
        }}
      />
    </div>
  );
}

export default BoxDodgerGame;
