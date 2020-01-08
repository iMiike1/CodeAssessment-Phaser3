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

var config = {
  type: Phaser.AUTO,
    width: 760,
  height: 260,
  parent : 'phaser-example',
  physics: {
    default: 'arcade',
    fps: 60,
    arcade: {
        gravity: { y: 750 },
        debug: true
    }

  },
    
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


// eslint-disable-next-line no-unused-vars
var game = new Phaser.Game(config);

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
}


var player, player1, player2;
var platform = null;
var jumpButton = null;
//var cursors = null;

var Bushes,Bushes2,Bushes3;


var Bush1,Bush2,Bush3,Bush4,Bush5,Bush6,Bush7,Bush8,Bush9;

var stones;
var stone1, stone2;

var EnemyBee;

var cherries;
var cherry;
var cherry1;
var cherryColliderActive = true;
var cherry1ColliderActive = true;
var cherryCounter =0;
var cherry1Counter =0;

var Fences;
var fence1, fence2;
 
//var Bush2;

var BeecolliderActive = true;
var StonecolliderActive = true;

var mana, manaholder;
var percentage = 1;
//Create Function
function create() {

var offset = 380;

this.input.enabled = true;

   var bg = this.add.image(760 +offset, 130, "background");
   var bg2 = this.add.image(0 +offset, 130, "background");

   Bushes = this.add.group();
   Bushes2 = this.add.group();
   Bushes3 = this.add.group();
   Fences = this.add.group();
   stones = this.add.group();
   cherries = this.add.group();



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

  EnemyBee = this.physics.add.image(500,130,'bee');
  EnemyBee.enableBody = false;
  EnemyBee.body.allowGravity = false;
  EnemyBee.setVelocity(-80,-10);


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

  setupBushes1();
  setupBushes2();
  setupBushes3();
  setupFences();
  setupStones();
  


   platform = this.physics.add.staticImage(380,260, 'platform');

   player = this.physics.add.image(350, 150, 'player');
   player.body.allowGravity = true;
   player.setBounce(0.2);
   player.setCollideWorldBounds(true);
   player.setInteractive();

   player1 = this.physics.add.image(player.x - 80, 150, 'player');
   player1.body.allowGravity = true;
   player1.setBounce(0.2);
   player1.setCollideWorldBounds(true);
   player1.setInteractive();


   player2 = this.physics.add.image(player.x + 80, 150, 'player');
   player2.body.allowGravity = true;
   player2.setBounce(0.2);
   player2.setCollideWorldBounds(true);
   player2.setInteractive();


   var grass = this.add.image(760 +offset, 237, 'grass');
   var grass2 = this.add.image(0  +offset, 237, 'grass');
    

  
  cherry = this.physics.add.image(700,130,'cherry');
  cherry1 = this.physics.add.image(1400,130,'cherry');
  cherries.add(cherry);
  cherries.add(cherry1);

  setupCherries();
 
  mana = this.add.image(700, 25,'manaBar');
  mana.scaleX = percentage;
  mana.setOrigin(1,0);
  manaholder = this.add.image(mana.x,mana.y,'manaHolder');
  manaholder.setOrigin(1,0);

 
   
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

    this.physics.add.collider(player, platform);
    this.physics.add.collider(player1, platform);
    this.physics.add.collider(player2, platform);

    this.physics.add.overlap(EnemyBee, player, beeHIt, ()=> { return BeecolliderActive;}, this);

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

   
}


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
    stonesC[i].setVelocity(-380,0);

  }


}


function setupCherries()
{
  var cherriesC = cherries.getChildren();
  for (var i = 0; i < cherriesC.length; i++)
  {
      cherriesC[i].body.allowGravity = false;
      cherriesC[i].enableBody = false;
      cherriesC[i].setVelocity(-100,0);
      
  }

}






//Update Function
  function update(){ 

    mana.scaleX = percentage;
   
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
 
iterateChildrens1();
iterateChildrens2();
iterateChildrens3();
iterateFences();
iterateBees();
iterateStones();


}



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
 

function Stone1Hit()
{
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

function Stone1Hit1()
{
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
function Stone1Hit2()
{
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

function Stone2Hit()
{
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

function Stone2Hit1()
{
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
function Stone2Hit2()
{
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


function ReduceMana()
{
  percentage -= 0.01;
  //console.log(percentage);
}


function cherryHitMessage()
{
  cherryCounter++;
  cherryColliderActive = false;
  console.log('cherryhit');

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
      
      cherryCounter = 0;
      break;     
    }
}


function cherry1HitMessage()
{
  cherry1Counter++;
  cherry1ColliderActive = false;
  console.log('cherryhit');

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
      break;     
    }
}

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

function increaseMana()
{
  percentage += 0.05; 

}



 function beeHIt()
 {
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


