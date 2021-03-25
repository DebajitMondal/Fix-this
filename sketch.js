const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;



var form,player,Ground,nonplayer,Ground2,Ground3;
var GameState = 1;
var Button1Img,Button2Img;
var Sate = 1;
var Enemy,Enemy2
var EnemyGroup;
var speedState = 1;
var jumpState = 1;
function preload() {
  Button1Img = loadImage("Untitled12.png")
  Button2Img = loadImage("Untitled34.png")

}



function setup() {
  createCanvas(1200,400);
  engine = Engine.create();
  world = engine.world;
  form = new Form()
 player = createSprite(-50,105,30,30)
 player.visible = false;
 player.debug = true
 player.setCollider("rectangle",0,0,120,20)
 nonplayer = createSprite(-200,105,30,30)
 nonplayer.debug = true
 nonplayer.setCollider("rectangle",0,0,120,20)
 nonplayer.visible = false;
 Ground = createSprite(9000,380,20000,20)
 Ground.visible = false;

 Ground2 = createSprite(-50,130,500,10);
 Ground2.visible = false;
 Ground3 = createSprite(200,110,10,50)
 Ground3.visible = false;
 EnemyGroup = new Group();
 speedGroup = new Group();
 jumpGroup = new Group();
 fullGroup = new Group();
}

function draw() {
  background("white");
  Engine.update(engine);

  
  if(GameState === 1){
    form.display()
  }
  if(GameState === 2 ){
    player.visible = true;
    player.velocityX = 6;
    Ground.visible = true;
    Ground2.visible = true;
    Ground3.visible = true;
    nonplayer.visible = true;
    nonplayer.velocityX = 5;
    
    spwanObstacle();
    speedPower()
    jumpPower()
    fullChance()
 
    if(nonplayer.isTouching(Ground3)){
      nonplayer.velocityY = -10;
      
    }
    nonplayer.velocityY = nonplayer.velocityY + 0.9

    if(player.isTouching(Ground3)){
      player.velocityY = -10;
    }
     player.velocityY = player.velocityY + 0.9


     if(player.isTouching(Ground)){
      Sate = 2
   }
   if(Sate === 2){
     camera.position.x = player.x+220;
     player.setCollider("rectangle",0,0,25,25)
     
     if( touches.length>0 || keyDown("space")  && player.y >= 357){
      player.velocityY = -13;
      player.velocityY = player.velocityY + 0.9
      touches = []
     }
     




   }

    
   
  
    if(EnemyGroup.isTouching(player)){
     
     player.velocityX = 0;
     
    }

    if(nonplayer.isTouching(EnemyGroup)){
      nonplayer.velocityY = -12;
      
    }

    if(nonplayer.isTouching(player)){
     GameState = 3;
    }

  // if(Power1Group.isTouching(player)){
   // speedState = 2;
   //}
  // if(speedState === 2){
   //  player.velocityX = 10;
   //  if(EnemyGroup.isTouching(player)){
    //   speedState = 1
    // }

  // }

   if(speedGroup.isTouching(player)){
     jumpState = 2;
   }
   if(jumpState === 2){
    if( touches.length>0 || keyDown("space") && player.y >= 357){
      player.velocityY = -16;
      player.velocityY = player.velocityY + 0.9
      touches = []
     }

     if(EnemyGroup.isTouching(player)){
       jumpState = 1
     }

     
   }
 

  
  }

  if(GameState === 3){
    console.log("you lose")
    EnemyGroup.setVelocityXEach(0);
    player.velocityX = 0
    

  }


  player.collide(Ground);
  nonplayer.collide(Ground);
  player.collide(Ground2);
  nonplayer.collide(Ground2);

  drawSprites();
}

function spwanObstacle(){
  if(frameCount % 200 === 0){
    Enemy = createSprite(camera.x+800,360,20,20)
   // Enemy.velocityX = -1
    var rand = Math.round(random(1,2))
    switch(rand){
     case 1: Enemy.shapeColor = "red"
             break;
     case 2: Enemy.shapeColor = "blue" 
     default: break;   

  }

  EnemyGroup.add(Enemy)
  


  }





}




function speedPower(){
  if(frameCount % 500 === 0){
    Speed = createSprite(camera.x+800,360,20,20);
    Speed.shapeColor = "green";
    speedGroup.add(Speed);
  }
  

}




function jumpPower(){
  if(frameCount % 800 === 0){
    Jump = createSprite(camera.x+800,360,20,20)
    Jump.shapeColor = "black";
    jumpGroup.add(Jump);
  }
  


}


function fullChance(){
  if(frameCount % 1000 === 0){
    Chance = createSprite(camera.x+800,360,20,20);
    Chance.shapeColor = "aqua";
    fullGroup.add(Chance);
  }
  


}

