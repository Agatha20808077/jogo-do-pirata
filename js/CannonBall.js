class CannonBall {
    constructor(x,y){
        var options = {
            isStatic: true
        };
        this.r = 20;
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world,this.body);
        this.image = loadImage("assets/cannonball.png");
        this.animation = [this.image];
        this.speed = 0.05;
        this.trajetoria = []; 
        this.isSink = false;
    }

    //animação da bola
    animate(){
        this.speed += 0.05;
    }

    //remover a bola
    remove(index){
        this.isSink = true;
        Matter.Body.setVelocity(this.body, {x:0,y:0});
        this.animation = waterSplash;
        this.speed = 0.05;
        this.r = 100;
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete balls[index];
        },1000);
    }

    //mostrar a bola
    display(){

        var index = floor(this.speed % this.animation.length);
        push();
        imageMode(CENTER);
        image(this.animation[index],this.body.position.x,this.body.position.y,this.r,this.r);
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