class CannonBall {
    constructor(x,y){
        var options = {
            isStatic: true
        };
        this.r = 20;
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world,this.body);
        this.image = loadImage("assets/cannonball.png");
        this.trajetoria = []; 
    }
    //mostrar a bola
    display(){
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,this.r,this.r);
        pop();
        if (this.body.velocity.x > 0){
        var posicao = [this.body.position.x,this.body.position.y]
        this.trajetoria.push (posicao)    
        }
    for(var indice = 0; indice < this.trajetoria.length; indice++){
    image(this.image, this.trajetoria[indice][0],this.trajetoria[indice][1], 5,5);
    }
    }

    //atirar a bola
    shoot(){
        var newAngle = cannon.angle - 30;
        newAngle = newAngle*(3.14/180); //conversão de graus para radianos
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x: velocity.x * (180/3.14),
            y: velocity.y * (180/3.14),
        });
    }
}