var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

  doorsGroup = new Group();

  climbersGroup = new Group();

  invisibleBlockGroup = new Group();

  
}

function draw() {
  background(200);
  
 if(gameState==="play"){


  if(tower.y > 400){
      tower.y = 300
    }

   if(keyDown("right_arrow")){
     ghost.x = ghost.x+2;
   }

   if(keyDown("left_arrow")){
    ghost.x = ghost.x-2;
  }
  
  spookySound.loop();

  if(keyDown("space")){
    ghost.velocityY = -5;

  }


  ghost.velocityY = ghost.velocityY+0.5;

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

   
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";

    



  }
    spawnDoors();

    drawSprites();

 }

   if(gameState==="end"){
   fill("yellow");
   textSize(20);
   text("Game Over",300,300);
   


   }



}



function spawnDoors(){
  if(frameCount%260 === 0){
    var door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x=Math.round(random(100,500));
    door.velocityY=1;
    door.lifetime = 700;
    doorsGroup.add(door);

    var climber=createSprite(200,0);
    climber.addImage("climber",climberImg);
    climber.x= door.x
    climber.velocityY=1;
    climber.lifetime = 700;
    climbersGroup.add(climber);
    
   ghost.depth=door.depth+1;
   
   var invisibleBlock = createSprite(200,5,5,8);
   invisibleBlock.width=climber.width;
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=1;
   invisibleBlock.visible=false;
   invisibleBlockGroup.add(invisibleBlock);



  }

 


}
