class Boat {
  constructor(x, y, width, height,posY,boatAnimation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.posY = posY;
    this.body = Bodies.rectangle(x,y, width, height);
    World.add(world, this.body);
    //this.Boat_image = loadImage("assets/boat.png");
    this.animation = boatAnimation;
    this.speed = 0.05;
   }

   //função que define a velocidade da animação
   animate(){
    this.speed += 0.05;
   }

   // função para mostrar os barcos na tela
  display() {

   var angle = this.body.angle;
   var pos = this.body.position;
   var index = floor(this.speed % this.animation.length);
   // % : módulo ou resto da divisão

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.posY, this.width, this.height);
    pop();
    
  }

  //função que vai remover os barcos
  remove(indice) {
    Matter.World.remove(world, boats[indice].body);
    delete boats[indice];
  }
}
