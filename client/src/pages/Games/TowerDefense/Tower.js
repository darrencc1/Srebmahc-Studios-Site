

export default class Tower {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.range = 100;
      this.fireRate = 60; // frames between shots
      this.fireCooldown = 0;
    }
  
    update(enemies, ctx) {
      if (this.fireCooldown > 0) {
        this.fireCooldown--;
        return;
      }
  
      for (let enemy of enemies) {
        const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
        if (dist <= this.range) {
          this.fire(enemy, ctx);
          this.fireCooldown = this.fireRate;
          break;
        }
      }
    }
  
    fire(enemy, ctx) {
      //***draws shot Will change in future***
      ctx.strokeStyle = 'yellow';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(enemy.x, enemy.y);
      ctx.stroke();
  
      enemy.health -= 2; // damage
    }
  
    draw(ctx) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
      ctx.fill();
  
      ctx.strokeStyle = 'rgba(0,0,255,0.2)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  