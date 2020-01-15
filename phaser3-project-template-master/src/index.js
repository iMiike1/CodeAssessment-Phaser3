
//Import all assets inside project

import Phaser from "phaser";
import grassImg from "./assets/grass.png";
import backgroundImg from "./assets/background.png";
import playerImg  from "./assets/player.png";
import platformImg  from "./assets/physicalPlatform.png";
import bushImg from "./assets/bush.png";
import bush2Img from "./assets/bush2.png";
import bush3Img from "./assets/bush3.png";
import fenceImg from "./assets/fence.png";
import beeImg from "./assets/bee.png";
import stoneImg from "./assets/stone.png";
import manabarImg from "./assets/manaBar.png";
import manaholderImg from "./assets/manaBarContour.png";
import cherryImg  from "./assets/cherry.png";
import starImg  from "./assets/star.png";
import shieldImg from "./assets/shield.png";
import dudeImg from "./assets/dude.png";


var config = {
  type: Phaser.AUTO,
    width: 760,
  height: 260,
  parent : 'phaser-example',
  audio: {
    disableWebAudio: false
},
  physics: {
    default: 'arcade',
    // locked FPS at 60 to prevent too fast update for physics
    fps: 60,
    arcade: {
        gravity: { y: 750 },
        debug: false
    }

  },
    
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


// below command removes unused variable notification from debug console
// eslint-disable-next-line no-unused-vars
var game = new Phaser.Game(config);

 // preloads everything when project is launched
 // not added to the scene, just loaded

function preload() {
  
  this.load.image('grass', grassImg);
  this.load.image('player', playerImg);
  this.load.image('platform', platformImg);
  this.load.image('background', backgroundImg);
  this.load.image('bush', bushImg); 
  this.load.image('bush2', bush2Img); 
  this.load.image('bush3', bush3Img);
  this.load.image('fence', fenceImg); 
  this.load.image('bee', beeImg);
  this.load.image('stone', stoneImg);
  this.load.image('manaBar', manabarImg);
  this.load.image('manaHolder', manaholderImg);
  this.load.image('cherry', cherryImg);
  this.load.image('stars', starImg);
  this.load.image('shield', shieldImg);
  this.load.spritesheet('run', dudeImg, {frameWidth :32, frameHeight: 48});
  this.load.audioSprite('Coin', './assets/coin.wav');

}


var player, player1, player2;
var platform = null;
var jumpButton = null;
var score = 0;
var scoreText;

//Environment Gameobjects
var Bushes,Bushes2,Bushes3;
var Bush1,Bush2,Bush3,Bush4,Bush5,Bush6,Bush7,Bush8,Bush9;
var stones;
var stone1, stone2;
var Fences;
var fence1, fence2;

//Enemy Gameobjects
var EnemyBee;
var BeecolliderActive = true;
var StonecolliderActive = true;


//Enemy related variables
var cherryColliderActive = true;
var cherry1ColliderActive = true;
var cherryCounter =0;
var cherry1Counter =0;


//determines if the shield is taken or not from the player
var isPlayerShielded = true; 
var isPlayer1Shielded = true;
var isPlayer2Shielded = true;

//determines if the player should take damage or not
var ShieldP1 = false;
var ShieldP2 = false;
var ShieldP3 = false;

//PickUP items
var star;
var shield;

var cherries;
var cherry;
var cherry1;



var mana, manaholder;

//Percentage variable used to scale Mana Bar in UI
var percentage = 1;


//Create Function
function create() {

//configuration for Player Running animation
var config = {
  key: 'running',
  frames : this.anims.generateFrameNumbers('run', {frames: [5,6,7,8]}),
  frameRate:10,
  repeat: -1
};


//offset used to place background one after the other, for a correct sidescroller
var offset = 380;

this.input.enabled = true;



   var bg = this.add.image(760 +offset, 130, "background");
   var bg2 = this.add.image(0 +offset, 130, "background");

   // Group creation for objects pool
   Bushes = this.add.group();
   Bushes2 = this.add.group();
   Bushes3 = this.add.group();
   Fences = this.add.group();
   stones = this.add.group();
   cherries = this.add.group();

  //Add images in display order: first created is gonna be the one on top.
  //USE .physics.add if velocity and gravity is used
  
   Bush9 = this.physics.add.image(800,240,'bush3');
   Bush8 = this.physics.add.image(2000,240,'bush3'); 
   Bush7 = this.physics.add.image(1020,240,'bush3');
  
   Bush4 = this.physics.add.image(1950,230,'bush2');
   Bush5 = this.physics.add.image(1230,230,'bush2');
   Bush6 = this.physics.add.image(930,230,'bush2');

   fence1 = this.physics.add.image(1000, 200,'fence');
   fence2 = this.physics.add.image(650, 200,'fence');

   Bush1 = this.physics.add.image(1200, 200,'bush'); 
   Bush2 = this.physics.add.image(500, 200,'bush');
   Bush3 = this.physics.add.image(1800, 200,'bush'); 

  stone1 = this.physics.add.image(500,230,'stone');
  stone2 = this.physics.add.image(1500,230,'stone');


  
  //Enemy Bee setup, disabling body and gravity, since only collision and velocity is used in this game
  EnemyBee = this.physics.add.image(500,130,'bee');
  EnemyBee.enableBody = false;
  EnemyBee.body.allowGravity = false;
  EnemyBee.setVelocity(-80,-10);


  //Create Player animations
  this.anims.create(config);
  

  //Adding gameObjects to object pools 
  //Use object pools instead of creating and destroying to improve performance

   Bushes.add(Bush1);
   Bushes.add(Bush2);
   Bushes.add(Bush3);

   Bushes2.add(Bush4);
   Bushes2.add(Bush5); 
   Bushes2.add(Bush6);
  
   Bushes3.add(Bush7);
   Bushes3.add(Bush8);
   Bushes3.add(Bush9);

  Fences.add(fence1);
  Fences.add(fence2);

  stones.add(stone1);
  stones.add(stone2);



  //Groups iteration for environment objects, applying physics and starting positions
  setupBushes1();
  setupBushes2();
  setupBushes3();
  setupFences();
  setupStones();
  

  //Platform is to give a platform to the player physics, but still using grass on top for graphics puroposes 
  //This is the base on where everything that falls with gravity is supposed to stop
   platform = this.physics.add.staticImage(380,260, 'platform');

  // initalising three different players
  // set them to interactive to make the mouseover jump possible

   player = this.physics.add.sprite(300,150, 'run').play('running');
   player.body.allowGravity = true;
   player.setBounce(0.2);
   player.setCollideWorldBounds(true);
   player.setInteractive();

   player1 = this.physics.add.sprite(player.x - 80, 150, 'run').play('running');
   player1.body.allowGravity = true;
   player1.setBounce(0.2);
   player1.setCollideWorldBounds(true);
   player1.setInteractive();


   player2 = this.physics.add.sprite(player.x + 80, 150, 'run').play('running');
   player2.body.allowGravity = true;
   player2.setBounce(0.2);
   player2.setCollideWorldBounds(true);
   player2.setInteractive();
 
  
   //Shield is referred to the yellow circle appearing when the player collects a green star
   //Is placed outside the screen, and teleported to the right player when needed
   //reset position of shield is optimal compared to create a new object everytime
  // object pool is not needed since there is only one shield at the time on the screen
   shield = this.physics.add.image(1000, 1000,'shield');
   shield.body.allowGravity = false;
   shield.enableBody = false;

  //grass uses the same offset variable as the background, since it needs to scroll infinitely
   var grass = this.add.image(760 +offset, 237, 'grass');
   var grass2 = this.add.image(0  +offset, 237, 'grass');
    

  
  cherry = this.physics.add.image(700,130,'cherry');
  cherry1 = this.physics.add.image(1400,130,'cherry');


  cherries.add(cherry);
  cherries.add(cherry1);

  //Cherry pool interation to set shared properties throughout the group
  setupCherries();
 

  //Energy bar on top right of the screen
  //Increases and Decreses in width using percentage variable
  mana = this.add.image(700, 25,'manaBar');
  mana.scaleX = percentage;
  mana.setOrigin(1,0);

  manaholder = this.add.image(mana.x,mana.y,'manaHolder');
  manaholder.setOrigin(1,0);

  //Star Pickupitem setup, used to give shield to the collided player
  star = this.physics.add.image(750,150,'stars');
  star.body.allowGravity = false;
  star.enableBody = false;
  star.body.setVelocity(-150,0);


  scoreText = this.add.text(25, 25, score, { fontFamily: '"Roboto Condensed"',fill: "#ff0044" });

  ////USING TWEENS TO SCROLL BACKGROUND AND GRASS SIDEWAYS
  this.tweens.add({
    targets: grass, 
     x: 380,
     duration: 5000,
     loop: -1
     
    });

  this.tweens.add({
      targets: grass2,
      x: -380,
       duration: 5000,
       loop: -1
       
      });

  this.tweens.add({
      targets: bg,
    x: 380,
    duration: 32000,
    loop: -1
      
    });

  this.tweens.add({
      targets: bg2,
    x: -380,
    duration: 32000,
    loop: -1
      
    });    


    //cursors = this.input.keyboard.createCursorKeys();
    jumpButton = this.input.keyboard.addKey('SPACE');

    //Using collider only with player and platform since is the only objects that uses gravity after jumping.
    this.physics.add.collider(player, platform);
    this.physics.add.collider(player1, platform);
    this.physics.add.collider(player2, platform);

  
    //adding overlap events, and calling designated function if the variable returns: true

    this.physics.add.overlap(EnemyBee, player, beeHIt, ()=> { return BeecolliderActive;}, this);
    this.physics.add.overlap(EnemyBee, player1, beeHIt1, ()=> { return BeecolliderActive;}, this);
    this.physics.add.overlap(EnemyBee, player2, beeHIt2, ()=> { return BeecolliderActive;}, this);

    this.physics.add.overlap(player, stone1, Stone1Hit, ()=>{return StonecolliderActive;}, this );
    this.physics.add.overlap(player1, stone1, Stone1Hit1, ()=>{return StonecolliderActive;}, this );
    this.physics.add.overlap(player2, stone1, Stone1Hit2, ()=>{return StonecolliderActive;}, this );

    this.physics.add.overlap(player, stone2, Stone2Hit, ()=>{return StonecolliderActive;}, this );
    this.physics.add.overlap(player1, stone2, Stone2Hit1, ()=>{return StonecolliderActive;}, this );
    this.physics.add.overlap(player2, stone2, Stone2Hit2, ()=>{return StonecolliderActive;}, this );

    this.physics.add.overlap(player, cherry, cherryHitMessage, ()=>{return cherryColliderActive;}, this );
    this.physics.add.overlap(player1, cherry, cherryHitMessage, ()=>{return cherryColliderActive;}, this );
    this.physics.add.overlap(player2, cherry, cherryHitMessage, ()=>{return cherryColliderActive;}, this );

    this.physics.add.overlap(player, cherry1, cherry1HitMessage, ()=>{return cherry1ColliderActive;}, this );
    this.physics.add.overlap(player1, cherry1, cherry1HitMessage, ()=>{return cherry1ColliderActive;}, this );
    this.physics.add.overlap(player2, cherry1, cherry1HitMessage, ()=>{return cherry1ColliderActive;}, this );

    this.physics.add.overlap(player, star, playerHitStar, ()=>{return isPlayerShielded;}, this );
    this.physics.add.overlap(player1, star, player1HitStar, ()=>{return isPlayer1Shielded;}, this );
    this.physics.add.overlap(player2, star, player2HitStar, ()=>{return isPlayer2Shielded;}, this );
}


////ENVIRONMENT GROUPS ITERATIONS////

function setupBushes1()
{
  
  var bushes1C = Bushes.getChildren();  
  for (var i = 0; i <bushes1C.length; i++)
  {
   bushes1C[i].body.allowGravity = false;
   bushes1C[i].enableBody = false;  
   bushes1C[i].setVelocity(-150,0);   
  } 
}

function setupBushes2()
{
  var bushes2C = Bushes2.getChildren();
  for (var i = 0; i < bushes2C.length; i++)
  {
   bushes2C[i].body.allowGravity = false;
   bushes2C[i].enableBody = false;  
   bushes2C[i].setVelocity(-130,0);   
  } 
}


function setupBushes3()
{
  var bushes3C = Bushes3.getChildren();
  for (var i = 0; i < bushes3C.length; i++)
  {
    bushes3C[i].body.allowGravity = false;
    bushes3C[i].enableBody = false;  
    bushes3C[i].setVelocity(-110,0);
  }

}


function setupFences()
{
  var FencesC = Fences.getChildren();
  for (var i = 0; i < FencesC.length; i++)
  {
    FencesC[i].body.allowGravity = false;
    FencesC[i].enableBody = false;  
    FencesC[i].setVelocity(-110,0);
  }
}


function setupStones()
{
  var stonesC = stones.getChildren();
  for (var i = 0; i< stonesC.length; i++)
  {
    stonesC[i].body.allowGravity = false;
    stonesC[i].enableBody = true;
    stonesC[i].setVelocity(-200,0);
  }
}


function setupCherries()
{
  var cherriesC = cherries.getChildren();
  for (var i = 0; i < cherriesC.length; i++)
  {
      cherriesC[i].body.allowGravity = false;
      cherriesC[i].enableBody = false;
      cherriesC[i].setVelocity(-200,0);      
  }
}






//Update Function
  function update(){  

    scoreText.setText(score);

  //if the variable is false, it will apply the shield to the designed player
  if (!isPlayerShielded)
  {
    shield.setPosition(player.x, player.y);
  }
  else if (!isPlayer1Shielded)
  {
    shield.setPosition(player1.x, player1.y);
  }
 else if (!isPlayer2Shielded)
 {
  shield.setPosition(player2.x, player2.y);
 }


 
//Updates mana bar width everyframe 
console.log(mana.scaleX);
if (mana.scaleX>0.02)
{
mana.scaleX = percentage;
}  


// Player function that calls the jump on mouse over
player.on('pointerover',function(){
    if (player.body.touching.down)
    { 
      player.body.velocity.y = -400;
    }
})

player1.on('pointerover',function(){
  if (player1.body.touching.down)
  {
    player1.body.velocity.y = -400;
  }
})

player2.on('pointerover',function(){
  if (player2.body.touching.down)
  {
    player2.body.velocity.y = -400;
  }
})

    if (jumpButton.isDown){    
      player.body.velocity.y = -400; 
    }
 



//Iterate all moving objects in the game, resetting their position to the right side of the screen, after they get off the screen on left side
iterateChildrens1();
iterateChildrens2();
iterateChildrens3();
iterateFences();
iterateBees();
iterateStones();
IterateStar();
IterateCherries();

// End of update function
}



//Math.RND is used to give randomness when objects positions are reset

function iterateChildrens1()
{
  var bushes1C = Bushes.getChildren();
  for (var i = 0; i < bushes1C.length; i++)
  {
    if (bushes1C[i].x < -300)
    {
      bushes1C[i].setPosition(Phaser.Math.RND.between(800,1200),200);
    }   
 }
}

function iterateChildrens2()
{
    var bushes2C = Bushes2.getChildren();
  for (var i = 0; i<bushes2C.length; i++)
  {
    if (bushes2C[i].x < -300)
    {
      bushes2C[i].setPosition(Phaser.Math.RND.between(750,1800),230);
    }    
  }
}

function iterateChildrens3()
{
  var bushes3C = Bushes3.getChildren();
  for (var i = 0; i<bushes3C.length; i++)
  {
    if (bushes3C[i].x < -300)
    {
      bushes3C[i].setPosition(Phaser.Math.RND.between(750,2500),240);
    }
  }
}

function iterateFences()
{
  var fencesC = Fences.getChildren();
  for (var i=0; i < fencesC.length; i++)
  { 
    if (fencesC[i].x < -300)
    {
      fencesC[i].setPosition(Phaser.Math.RND.between(1000,2000), 200);
    }
  }
}
 


function iterateStones()
{   
  var stonesC = stones.getChildren();
  for (var i = 0; i< stonesC.length; i++)
  {if (stonesC[i].x < -300)
    {
    stonesC[i].setPosition(Phaser.Math.RND.between(1000,4000), stonesC[i].y);  

    }
  }
}


//This function simulates the bee going up and down while flying
function iterateBees()
{ 
  if (EnemyBee.y < 120)
  {
    EnemyBee.setVelocityY(10);
  }
  else if (EnemyBee.y > 135)
  {
    EnemyBee.setVelocityY(-10);
  }
  else if (EnemyBee.x < -300)
  {
    EnemyBee.setPosition(Phaser.Math.RND.between(800,1300),130);

  }

}
 



//STONES LOGIC//
//when players hit stones, the collider is taken off for 100ms to prevent collision repetition
//A lillte velocity is added to the player to force it to jump the stone
// ReduceMana() function is called
function Stone1Hit()
{
if (!ShieldP1){
  ReduceMana();
  StonecolliderActive = false;  
  player.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      StonecolliderActive = true;
    },
    loop: false
});

}
}

function Stone1Hit1()
{
  if (!ShieldP2){
  ReduceMana();
  StonecolliderActive = false;  
  player1.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
    StonecolliderActive = true;
    },
    loop: false
});
  }
}
function Stone1Hit2()
{
  if (!ShieldP3){
  ReduceMana();
  StonecolliderActive = false;   
  player2.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      StonecolliderActive = true;
    },
    loop: false
});
  }
}

function Stone2Hit()
{
  if (!ShieldP1){
  ReduceMana();
  StonecolliderActive = false;  
  player.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      StonecolliderActive = true;
    },
    loop: false
});
  }
}

function Stone2Hit1()
{
  if (!ShieldP2){
  ReduceMana();
  StonecolliderActive = false;  
  player1.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      StonecolliderActive = true;
    },
    loop: false
});
  }
}
function Stone2Hit2()
{
  if (!ShieldP3){
  ReduceMana();
  StonecolliderActive = false;   
  player2.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      StonecolliderActive = true;
    },
    loop: false
});
  }
}

//Functions that increses or reduces mana
function ReduceMana()
{
  percentage -= 0.01;
}
function increaseMana()
{
  percentage += 0.05;
}



// cherry logic to increase and decrease it's size when hit using a switch to determine how many times it gets hit
// size resets when hits 3 times or goes outside the screen

function cherryHitMessage()
{
  cherryCounter++;
  cherryColliderActive = false;
       this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          cherryColliderActive = true;
        },
        loop: false
    });

    switch(cherryCounter){       
      case 1: 
      cherry.setScale(0.7);
      break;
      case 2: 
      cherry.setScale(0.5);
      break;
      case 3:
        increaseMana();
      cherryResetPositionAndScale();
      score +=1;     
      cherryCounter = 0;
      break;     
    }
}


function cherry1HitMessage()
{
  cherry1Counter++;
  cherry1ColliderActive = false;  
       this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          cherry1ColliderActive = true;
        },
        loop: false
    });

    switch(cherry1Counter){      
      case 1: 
      cherry1.setScale(0.7);
      break;
      case 2: 
      cherry1.setScale(0.5);
      break;
      case 3:
      increaseMana();
      cherry1ResetPositionAndScale();
      cherry1Counter = 0;
      score +=1;
      break;     
    }
}

// functions called when cherries are hit from players
function cherryResetPositionAndScale()
{
  cherry.setPosition(800, cherry.y);
  cherry.setScale(1);
}

function cherry1ResetPositionAndScale()
{
  cherry1.setPosition(800, cherry.y);
  cherry1.setScale(1);
}

function IterateCherries()
{
  if (cherry.x < -300)
  {
    cherry.setPosition(1000, cherry.y);
    cherry.setScale(1);
  }
  if (cherry1.x <-300)
  {
    cherry1.setPosition(1500, cherry1.y);
    cherry1.setScale(1);

  }

}




//Bees Damage mechanics
//If related player shield (SHIELDP) is turned off then reduce mana and allow bees collisions again after 500ms

 function beeHIt(){
  
   if (!ShieldP1){
  ReduceMana();
  BeecolliderActive = false;
       this.time.addEvent({
        delay: 500,
        callback: ()=>{
          BeecolliderActive = true;
        },
        loop: false
    });
  }
 }

 function beeHIt1(){
   if (!ShieldP2){
  ReduceMana();
  BeecolliderActive = false;
  console.log("beeHIt!");
       this.time.addEvent({
        delay: 500,
        callback: ()=>{
          BeecolliderActive = true;
        },
        loop: false
    });
  }
 }

 function beeHIt2(){

  if (!ShieldP3){
  ReduceMana();
  BeecolliderActive = false;
  console.log("beeHIt!");
       this.time.addEvent({
        delay: 500,
        callback: ()=>{
          BeecolliderActive = true;
        },
        loop: false
    });
  }
 }



function playerHitStar(){
  ShieldP1 = true;
console.log('starHit');
isPlayerShielded = false;
star.setPosition(3500, star.y);
this.time.addEvent({
  delay: 5000,
  callback: ()=>{
    isPlayerShielded = true;
    shield.setPosition(1000, 1000); 
    ShieldP1 = false;
  },
  loop: false
});

}


//When start are hit, they will reset their positions, and call the shield on the hit player.
//The shield will reset its position after 5seconds

 function player1HitStar(){
  console.log('star2Hit');
  ShieldP2 = true;
  isPlayer1Shielded = false;
  star.setPosition(3500, star.y);  
  this.time.addEvent({
    delay: 5000,
    callback: ()=>{
      isPlayer1Shielded = true;
      shield.setPosition(1000, 1000); 
      ShieldP2 = false;
    },
    loop: false
  });

}

function player2HitStar(){
  ShieldP3 = true;
  console.log('star2Hit');
  isPlayer2Shielded = false;
  
  star.setPosition(3500, star.y);
  this.time.addEvent({
    delay: 5000,
    callback: ()=>{
      isPlayer2Shielded = true;
      shield.setPosition(1000, 1000); 
      ShieldP3 = false;
    },
    loop: false
  });
 }

//reset start position when goes outside the screen
function IterateStar()
{

  if(star.x < -700)
  {
    star.setPosition(2000,star.y);
  }

}
 
