//variables
var Monkey;
var jungle;
var stone;
var banana;
var score=0;

function preload(){

jungle =loadImage("jungle.png");

banana=loadImage("banana.png");
  
stone = loadImage("stone.png");
  
Monkey=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");  
}

function setup() {
createCanvas(400, 400);

Monkey = createSprite(100,340,20,50);
Monkey.addAnimation("Monkey",Monkey);
  
//scale and position the Monkey
Monkey.scale = 0.1;
Monkey.x = 50;
  
jungle = createSprite(0,0,400,400);
jungle.x = ground.width /2;
jungle.velocityX=-9;
jungle.addImage(jungle);  
  
//create stone and target Groups
StoneGroup = new Group();
targetGroup = new Group();
  
//score
var Score = 0;
}

function draw() {
background(220);

//ground velocity
ground.velocityX = -4;

//Score
textSize(20);
fill("black");
text("survialTime: "+ Score, 250, 100);

//when the ground ends then the ground should reset
if (ground.x < 0){
ground.x = ground.width/2;
 }
    
//jump when the space key is pressed
if(keyDown("space")){
Monkey.velocityY = -12 ;
  }
  
//add gravity
Monkey.velocityY=Monkey.velocityY + 0.8;

  //functions
  target();
  Obstacles();

  //End the game when Monkey is touching the Stone
  if(StoneGroup.isTouching(Monkey)){
  fill("red");
  textSize(12);
  text("GAME OVER", 200, 200);
  Monkey.velocityX=0;
  Monkey.velocityY=0;
  targetGroup.setVelocityXEach(0);
  StoneGroup.setVelocityXEach(0);
  targetGroup.setLifetimeEach(-1);
  StoneGroup.setLifetimeEach(-1);
  ground.velocityX=0;
  StoneGroup.destroyEach();
  Score=Score+2; 
  }

  //If the monkey touches the banana then the text YOU WIN comes and the game ends
  if(targetGroup.isTouching(Monkey)){
  fill("Green");
  textSize(12);
  text("YOU WIN", 200, 200);
  Monkey.velocityX=0;
  Monkey.velocityY=0;
  targetGroup.setVelocityXEach(0);
  StoneGroup.setVelocityXEach(0);
  targetGroup.setLifetimeEach(-1);
  StoneGroup.setLifetimeEach(-1);
  ground.VelocityX=0;
  targetGroup.destroyEach();
  Score=Score+2;  
  }

  //stop trex from falling down
  Monkey.collide(ground);

  drawSprites();
   }



  function Obstacles() {
  if(frameCount % 300 === 0) {
      var stone = createSprite(228,340,10,40);
      stone.velocityX = -6 ;

      stone.addImage(stone);

      //assign scale and lifetime to the obstacle           
      stone.scale = 0.15;
      stone.lifetime = 70;

      //add each obstacle to the group
      StoneGroup.add(stone);
    }
  }

  function target() {
  if (frameCount % 80 === 0) {
      var Banana = createSprite(400,370,40,10);
      Banana.y = Math.round(random(120,200));
      Banana.addImage(banana);
      Banana.scale = 0.1;
      Banana.velocityX = -3;

      //assign lifetime to the variable
      Banana.lifetime = 134;

      //add each cloud to the group
      targetGroup.add(Banana);
    }
  }