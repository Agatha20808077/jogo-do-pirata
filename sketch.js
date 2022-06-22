//módulos da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//variáveis
var engine, world, backgroundImg;
var angle=15;
var canvas, angle, tower, ground, cannon, cannonBall;

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
  //criando a bala do canhão a partir da classe CannonBall
  cannonBall = new CannonBall(cannon.x,cannon.y);
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
  //mostrar a bala
  cannonBall.display();
  //mostrar o canhão
  cannon.display();
}
