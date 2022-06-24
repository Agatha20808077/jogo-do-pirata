class CannonBall {
    constructor(x,y){
        var options = {
            isStatic: true
        };
        this.r = 20;
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world,this.body);
        this.image = loadImage("assets/cannonball.png");
    }
    //mostrar a bola
    display(){
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,this.r,this.r);
        pop();
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