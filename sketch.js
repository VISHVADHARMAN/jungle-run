//Global Variables
var backImage,backgr;
var player, player_running;
var ground, ground_img;

var bananaGroup, bananaImage;
var obstacleGroup, obstacle_img;

var gameOver;
var score = 0;

function preload()
{
 //showing the images
 backImage = loadAnimation("jungle.jpg");
 player_running =                loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",    "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",  "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
 
 //loading images
 bananaImage = loadImage("Banana.png");
 obstacle_img = loadImage("stone.png");
}

function setup()
{
  createCanvas(600,300);
  //creating backgr
  backgr = createSprite(100,100,600,300);
  backgr.addAnimation("jungle",backImage);
  backgr.scale= 1;
  backgr.velocityX = -3;
  backgr.x = backgr.width/2;
  
  //creating invisible ground
  invisibleGround = createSprite(300,290,800,10);
  invisibleGround.visible = false;
  
  //creating players
  player = createSprite(100,250,10,10);
  player.addAnimation("monkey",player_running);
  player.scale = 0.1;
  
  //creating groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw()
{
 background(255);

 //player collides the ground
 player.collide(invisibleGround);
 
  if (backgr.x < 200)
  {
   backgr.x = backgr.width/2;
  }
  
  //monkey jumps
  if(keyDown("space") && player.y >= 159) 
  {
    player.velocityY = -12;
  }
  
  //add gravity
  player.velocityY = player.velocityY + 0.8
  
  //for each 10 points monkey increases
  switch(score)
  {
    case 10 : player.scale = 0.12;
    break;
    case 20 : player.scale = 0.14;
    break;
    case 30 : player.scale = 0.16;
    break;
    case 40 : player.scale = 0.18;
    break;
    default : break;
  }
  
  //score increases when the banana is touched
  if(bananaGroup.isTouching(player))
  {
    bananaGroup.destroyEach();
    score = score+2;
  }
  
  //player reset to it same size once he touches the stone
  if(obstacleGroup.isTouching(player)){
    player.scale = 0.1;
    
  }
  
  //displaying bananas
  spawnBananas ();
  
  //displaying obstacles
  spawnObstacles();
  
  drawSprites();
  
  //showing the score
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE: " + score,450,50);
}

//creating bananas
function spawnBananas () 
{ 
  //creating banana and its properties
  if (World.frameCount % 120 === 0) 
   {
     var banana = createSprite(600,250,40,100);
     banana.addAnimation("fruit",bananaImage);
     banana.scale = 0.05;
     banana.velocityX = -5;
     banana.lifetime = 120;
     var rand = Math.round(random(120,200));
     banana.y = rand;
     bananaGroup.add(banana);
     banana.depth = player.depth;
     player.depth = player.depth +1;
   }
}

//creating obstacles
function spawnObstacles() 
{
  //creating obstacles and its properties
  if (World.frameCount % 200 === 0) 
  {
    var obstacle = createSprite(600,260,20,20);
    obstacle.addAnimation("Stone",obstacle_img);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}