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
var boat, boats = [];
//animação
var boatAnimation = [];
var boatJSON, boatPNG;
var broken = [], brokenboat, json; 
var waterSplash = [];
var waterSplashJSON, waterSplashPNG;
var somdefundo;
var explosão;
var agua;
var riso;

var isGameOver = false;
var isLaughing = false;


//variável para a pontuação do jogo
var pontos = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatJSON = loadJSON("assets/boat/boat.json");
  boatPNG = loadImage("assets/boat/boat.png");
  brokenboat = loadImage("assets/boat/broken_boat.png");
  json = loadJSON("assets/boat/broken_boat.json");
  waterSplashJSON = loadJSON("assets/water_splash/water_splash.json");
  waterSplashPNG = loadImage("assets/water_splash/water_splash.png");
  somdefundo = loadSound("assets/background_music.mp3");
  explosão = loadSound("assets/cannon_explosion.mp3");
  agua = loadSound("assets/cannon_water.mp3");
  riso  = loadSound("assets/pirate_laugh.mp3");


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
 
  //animação do barco
  var boatFrames = boatJSON.frames;
  for(var i=0; i<boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatPNG.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }

  //animação do barco quebrado
  var brokenFrames = json.frames;
  for(var i=0; i<brokenFrames.length; i++){
  var pos = brokenFrames[i].position;
  var img = brokenboat.get(pos.x,pos.y,pos.w,pos.h);
  broken.push(img);
  } 

  //animação da bola na água
  var waterSplashFrames = json.frames;
  for(var i=0; i<waterSplashFrames.length; i++){
  var pos = waterSplashFrames[i].position;
  var img = waterSplashPNG.get(pos.x,pos.y,pos.w,pos.h);
  waterSplash.push(img);
  } 

}

function draw() {

  //imagem de funda da tela
  image(backgroundImg, 0, 0, width, height);
  //som de fundo
  if (!somdefundo.isPlaying()){
    somdefundo.play()
    somdefundo.setVolume(0.2)
  }
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
    //chamada da função de colisão
    collisionWithBoats(i);

  }

  //mostrar o canhão
  cannon.display();

  //mostrar os barcos
  showBoats();

 
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
    explosão.play()
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    //criando a bala do canhão a partir da classe CannonBall
    cannonBall = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall);
  }
}

//função para mostrar as bolas
function showCannonBalls(ball,i){
  if(ball){
    //mostrar a bala
    ball.display();
    ball.animate();
    if((ball.body.position.x >= width && ball.body.position.y >= height-50) || ball.body.position.y >= height-50){
      if(!ball.isSink){
        ball.remove(i);
        agua.play
      }
    }
  }
}

//função pra mostrar os barcos
function showBoats(){
  if(boats.length > 0){
    if(boats[boats.length-1] === undefined || 
      boats[boats.length-1].body.position.x < width-400){
        var positions = [-40,-60,-70,-20];
        var position = random(positions);
        boat = new Boat(width - 80,height - 100, 160, 170,position, boatAnimation);
        boats.push(boat);
      }
      for(var i=0; i<boats.length; i++){
        if(boats[i]){
          //movimentação dos barcos
          Matter.Body.setVelocity(boats[i].body,{
            x:-1,
            y:0,
          });

          //mostrar o barco e a animação
          boats[i].display();
          boats[i].animate();

          //colisão do barco com a torre
          var collision = Matter.SAT.collides(tower,boats[i].body);
          if(collision.collided && !boats[i].isBroken){
            gameOver();
            isGameOver = true;
          }
        }
      }
  }
  else{
    boat = new Boat(width - 80, height - 100, 160, 170,-100, boatAnimation);
    boats.push(boat);
  }
}

//detectar colisão das balas com os barcos
function collisionWithBoats(index){
  for(var i=0; i< boats.length; i++){
    if(balls[index] !== undefined && boats[i] != undefined){
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if(collision.collided){
        //chamada da função de remoção dos barcos
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}

//fim de jogo com Sweet Alert
function gameOver(){
  swal({
    title: `Fim de jogo!`,
    text: "Obrigada por jogar!",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "100x100",
    confirmButtonText: "Jogar Novamente",
  }, function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  });
}
