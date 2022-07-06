class Boat {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x,y, width, height);
    World.add(world, this.body);
    this.Boat_image = loadImage("assets/boat.png");
   }

   // função
  display() {

   var angle = this.body.angle;
   var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.Boat_image, 0, 0, this.width, this.height);
    pop();
    
  }
}
