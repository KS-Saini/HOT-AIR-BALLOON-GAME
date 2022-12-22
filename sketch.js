
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacle1,obstacle2,obstacle3Image,obstaclesGroup,obstacle;
var balloon;
var tower;
var restart;
var score;

function preload(){
  towerImage = loadImage("assets/tower.png");
  balloon_ani = loadAnimation("assets/HotAirBallon.png","assets/HotAirBallon2.png","assets/HotAirBallon3.png");
  restartImage = loadImage("assets/restart.png");
  obstacle1Image = loadImage("assets/axe.png");
  obstacle2Image = loadImage("assets/stone.png");
  obstacle3Image = loadImage("assets/wood.png");
}
function setup() {
  createCanvas(600, 600);
  //CREATING TOWER AND ADDING IMAGE
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 4;

  //NOW CREATING HTML DOM 
 katariya = createElement("h2");
 katariya.class('katariya');
  //CREATING BALLOON 
  balloon = createSprite(300,580,30,30);
  balloon.addAnimation("balloon",balloon_ani);
  balloon.scale = 0.10;

  //CREATING OBSTACLE GROUP
  obstaclesGroup = new Group();

  //THIS IS RESTART VISIBLE AND UNVISIBLE
  restart = createSprite(25,25);
  restart.addImage(restartImage);
  restart.scale = 0.10;

  score = 0;
}
function draw() {
    background("white");
    
    if(gameState === PLAY){
        
        spawnObsticle();
        tower.velocityY  = (1+1*score/100);
        
    score = score + Math.round(getFrameRate()/60);
    
    if(obstaclesGroup.isTouching(balloon)){
        tower.velocityY = 0;
        gameState = END;              
    }
}
else if (gameState === END) {
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    balloon.x = width/2;
    balloon.y = height/2+200;
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.destroyEach();
    katariya.html("GAMEOVER");
} 
//THIS IS RESTARTER
   if(mousePressedOver(restart)) {
       reset();
  }
  
  //THERE ARE FOUR PERIMETERS PASS TO MAKE BALLOON MOVEMENTABLE
  if(keyDown("left")&&balloon.x>75){
   balloon.x = balloon.x-5;
}
  if(keyDown("right")&&balloon.x<523){
   balloon.x = balloon.x+5;
}
if(keyDown("up")&&balloon.y>125){
    balloon.y = balloon.y-5;
}
  if(keyDown("down")&&balloon.y<580){
      balloon.y = balloon.y+5;
  }
  
  //THIS IS INFINETLY TOWER
  if(tower.y >= 400){
      //THIS IS METHOND TO MAKE INFINETLY
 //-- tower.y = tower.width/2;
 //THIS IS SECOND METHOND TO MAKE INFINETLY
  tower.y = 300
  } 

//HERE OBSTICLE FUNTION CALLING
spawnObsticle();

drawSprites();

//displaying score
textSize(35);
    fill("aqua");
    text("SCORE: "+ score, 60,30);
    fill("Red");
    text("Reset Game",2,80);
}

//THIS IS SPAWN OBTICLE FUNCTION
function spawnObsticle(){
    if(frameCount % 50===0){      
        var obstacle = createSprite(400,300,20,20);
        obstacle.velocityY = 6;
          //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
      case 3: obstacle.addImage(obstacle3Image);
              break;
      default: break;
    }      
      obstacle.scale = 0.10;
      obstaclesGroup.add(obstacle);
      obstacle.lifetime = 300;    
    }
}

function reset(){
gameState = PLAY
obstaclesGroup.destroyEach();
tower.velocityY = 4;
score = 0;
balloon.x = 300;
balloon.y = 525;
}