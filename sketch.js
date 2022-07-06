//módulos da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//variáveis
var engine, world, backgroundImg;
var angle;
var canvas, angle, tower, ground, cannon, cannonBall;
var balls = [];
var boat;

//variável para a pontuação do jogo
var pontos = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  //criar a tela
  canvas = createCanvas(1200, 600);
  //criar o nosso mundo e o nosso mecanismo de física
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  //opções para os corpos estáticos (parados)
  var options = {
    isStatic: true
  }
  //criar o corpo do solo e adicionar ao nosso mundo
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
   //criar o corpo da torre e adicionar ao nosso mundo
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  //criando o canhão a partir da classe Cannon
  cannon = new Cannon(180, 110, 130, 100, angle);

  //matriz de matrizes
  var m = [1,2,3,4,5];
  var m2 = [[5,6],['Agatha',"Tatiane"],[9,10]];
  //         0 1       0        1       0  1
  //i         0            1              2
  //console.log(m2[2][1]);
  //trajetoria = [[x1,y1],[x2,y2],[x3,y3]];
 //criar o corpo do barco a partir da classe Boat
 boat = new Boat(width - 80,- 100, 160, 170);
}

function draw() {

  //imagem de funda da tela
  image(backgroundImg, 0, 0, width, height);
  //atualização do mecanismo de física
  Engine.update(engine);
  //mostrar o solo
  rect(ground.position.x, ground.position.y, width * 2, 1);
  //mostrar a torre
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  //chamada da função para mostrar as balas
  for(var i=0; i<balls.length; i++){
    showCannonBalls(balls[i],i);
  }

  //mostrar o canhão
  cannon.display();

  //mostrar o barco
  boat.display();
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    //criando a bala do canhão a partir da classe CannonBall
    cannonBall = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball,i){
  if(ball){
    //mostrar a bala
    ball.display();
  }
}
