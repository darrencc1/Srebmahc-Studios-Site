export default class Player {
    constructor(x, y, width, height, canvasWidth) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.canvasWidth = canvasWidth;
      this.speed = 4;
      this.keys = { left: false, right: false };
    }
  
    move() {
      if (this.keys.left) this.x -= this.speed;
      if (this.keys.right) this.x += this.speed;
      this.clamp();
    }
  
    clamp() {
      if (this.x < 0) this.x = 0;
      if (this.x + this.width > this.canvasWidth) {
        this.x = this.canvasWidth - this.width;
      }
    }
  
    draw(ctx) {
      ctx.fillStyle = '#00ffcc';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }