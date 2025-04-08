export default class Enemy {
    constructor(x, y, speed = 1) {
      this.x = x;
      this.y = y;
      this.radius = 10;
      this.speed = speed;
      this.health = 100;
    }
  
    update() {
      this.x += this.speed; // Move enemy to the right
    }
  
    draw(ctx) {
      // Draw enemy body
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
  
      // Draw health bar
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, this.radius * 2 * (this.health / 100), 5);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(this.x - this.radius, this.y - this.radius - 10, this.radius * 2, 5);
    }
  }
  