class CollisionBlock {
   constructor({ position }) {
      this.position = position;
      this.width = 64;
      this.height = 64;
   }

   draw() {
      ctx.fillStyle = "red"
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
   }
}