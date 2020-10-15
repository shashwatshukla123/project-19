var monkey,monkeyimage,banana,bananaimage,obstacle,obstacleimage
var obstaclegroup,background1,score=0 ,backimage,ground,gameover,gameoverimage,foodgroup

var PLAY=1
var END=0
var gameState=1

function preload (){
  backimage=loadImage("jungle.jpg")
  monkeyimage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaimage=loadImage("banana.png")
  obstacleimage=loadImage("stone.png")
  
  gameoverimage=loadImage("gameover.jpg")
}

function setup (){
   createCanvas(500, 500);
  
  background1=createSprite(200,200);
  background1.addImage(backimage);
  
  monkey=createSprite(100,380);
  monkey.scale=0.2;
  monkey.addAnimation("monkey",monkeyimage);
  
    
  ground=createSprite(200,446,800,10);
  
  
  gameover=createSprite(250,200);
  gameover.scale=0.3;
  gameover.addImage(gameoverimage);
  
  obstaclegroup=createGroup();
  foodgroup=createGroup();
  
}


function draw (){
  
  if(gameState===PLAY){
    
   
    background1.velocityX=-5;
  if(background1.x<0){
  background1.x=background1 .width/2;
}
  
  ground.velocityX=-5;
  if(ground.x<0){
  ground.x=ground.width/2;
}
  
  if(keyDown("space")){
    monkey.velocityY=-5;
  }
    
    monkey.velocityY= monkey.velocityY+0.8;
  
 
  switch(score){
      case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      default:break;
  }
    
    gameover.visible=false;
  
  spawnbanana ();
  spawnobstacles ();
  
  if(foodgroup.isTouching(monkey)){
  score=score+2;  
    foodgroup.destroyEach();
  }
    
    if(obstaclegroup.isTouching(monkey)){
    gameState=END;
      obstaclegroup.destroyEach();
      
  }
    
  }
  
     else if (gameState===END){
     monkey.scale=0.2;
     gameover.visible=true;
           monkey.velocityY=0;   
       background1.velocityX=0; 
   }
 
  monkey.collide(ground);
    ground.visible=false;
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,380,50);
}


function spawnbanana (){
   if(World.frameCount%50===0){
  banana=createSprite(500,200);
  banana.scale=0.1;
  banana.addImage(bananaimage);
  banana.velocityX=-5;
  banana.y=(random(250,300))
  foodgroup.add(banana);
   } 
}

function spawnobstacles (){
   if(World.frameCount%150===0){
  obstacles=createSprite(500,377);
  obstacles.scale=0.1;
  obstacles.addImage(obstacleimage);
  obstacles.velocityX=-10;
  obstaclegroup.add(obstacles);
   }
}
