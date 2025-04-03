export default class Obstacle {
    constructor(width, height, canvasWidth) {
      this.width = width;
      this.height = height;
      this.canvasWidth = canvasWidth;
      this.speed = 3;
      this.reset();
    }
  
    reset() {
      this.x = Math.random() * (this.canvasWidth - this.width);
      this.y = -this.height;
    }
  
    update() {
      this.y += this.speed;
      if (this.y > 200) this.reset();
    }
  
    draw(ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }