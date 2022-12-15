var PLAY = 1
var END = 0
var gameState = PLAY

var gameOverImg, restartImg

var jumpSound, checkPointSound, dieSound

var cloud, cloudsGroup, cloudImage;
var trex ,trex_running;
var ground, groundImage, invisibleGround;
var obstacle1,obstaclesGroup, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png","trex4.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trex_collided = loadImage("trex_collided.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  //crie um sprite de trex
 trex = createSprite (50,height-50,20,50)
 trex.addAnimation("running", trex_running) ;
 trex.addAnimation("collided",trex_collided);
 trex.scale = 0.5
 
 //criando o chão
 ground = createSprite (width/2,height-20,width,125)
 ground.addImage("ground", groundImage)
 ground.velocityX = -4
 
 //criando o chão invisivel
 invisibleGround = createSprite(width/2,height-10,width,125)
 invisibleGround.visible = false

obstaclesGroup = createGroup ()
cloudsGroup = createGroup ()

restart = createSprite (width/2,height/2)
restart.addImage(restartImg)

gameOver = createSprite (width/2,height/2- 50)
gameOver.addImage(gameOverImg)

gameOver.scale = 0.5
restart.scale = 0.5


  
 score = 0;
}

function draw(){
  background(180)
  fill("Midnightblue")
  textSize(20)
  text("Pontuação: " + score,450,50)
  
  //fazendo trex encostar no chao invisel
  trex.collide(ground)
  

  if(gameState===PLAY){
   gameOver.visible = false
   restart.visible = false
   ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60) 
    if(ground.x < 0){
   
      ground.x = ground.width/2
    
    if ( score > 0 && score% 100 ===0){
      checkPointSound.play()
    }
  }
  trex.velocityY = trex.velocityY + 0.8
  spawnObstacles();
  spawnClouds()
  if (touches.length > 0 || keyDown('SPACE') && trex.y >= height - 60){ 
    jumpSound.play()  
    trex.velocityY = -10
    touches = []
}
  if (obstaclesGroup.isTouching(trex)){
    gameState = END
    dieSound.play()
  }
}
  else if (gameState === END){
   gameOver.visible = true
   restart.visible = true
   
    ground.velocityX = 0
    trex.velocityY = 0

    trex.changeAnimation("collided", trex_collided)

    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

     if(touches.length > 0 || keyDown("SPACE")){
      reset()
      touches = []
     }

  }
drawSprites();
}
function reset(){
  gameState = PLAY
  trex.changeAnimation("running", trex_running) ;
  gameOver.visible = false
  restart.visible = false
  ground.velocityX = -(4 + 3* score/100)
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  score = 0

 
 
  

}






function spawnClouds(){
if(frameCount % 60 === 0){
  var cloud = createSprite(width+20,height-300,40,10)
  cloud.addImage(cloudImage)
  cloud.y = Math.round(random(20,200))
  cloud.scale = 0.9
  cloud.velocityX = -3
  cloud.depth = trex.depth
  trex.depth = trex.depth + 1
  cloud.lifetime = 1000
  cloudsGroup.add(cloud)

  
}


}
function spawnObstacles(){
  if(frameCount % 60 === 0){
   var obstacle = createSprite(width-10,height-30,20,300) 
    obstacle.velocityX = -(6 + score/100)
    obstacle.scale = 0.6
    obstacle.lifetime = 300
    obstaclesGroup.add(obstacle)

    var rand = Math.round(random(1,6))
     switch (rand){
      case 1: obstacle.addImage(obstacle1)
        break;
      case 2: obstacle.addImage(obstacle2)
        break;
      case 3: obstacle.addImage(obstacle3)
        break;
      case 4: obstacle.addImage(obstacle4)
        break;
      case 5: obstacle.addImage(obstacle5)
        break;
      case 6: obstacle.addImage(obstacle6)
        break;
      default: break;
     }
  } 
  
}

 