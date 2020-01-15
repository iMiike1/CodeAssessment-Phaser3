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
import playBTN from "./assets/playButton.png";
import dudeImg from "./assets/dude.png";

//import Menu from "./menu";

class Controller extends Phaser.Scene{
// eslint-disable-next-line no-unused-vars

constructor()
{
    
      super('Controller');


this.active;
this.CurrentScene;
this.pointer;

  this.Player;
  this.Player1;
  this.Player2;
  this.platform = null;
  this.jumpButton = null;
  this.cursors;
   
  this.Bushes;
  this.Bushes2;
  this.Bushes3;
 
  this.Bush1;
  this.Bush2;
  this.Bush3;
  this.Bush4;
  this.Bush5;
  this.bush6;
  this.Bush7;
  this.Bush8;
  this.Bush9;

  this.stones;
  this.stone1;
  this.stone2;

  
  this.EnemyBee;
  

  this.cherries;
  this.cherry;
  this.cherry1;

  this.cherryColliderActive = true;
  this.cherry1ColliderActive = true;
  
  this.cherryCounter = 0;
  this.cherry1Counter = 0;
 
  
  //determines if the shield is taken or not the shield to the player
  this.isPlayerShielded = true; 
  this.isPlayer1Shielded = true;
  this.isPlayer2Shielded = true;
  
  //determines if the player should take damage or not
  this.ShieldP1 = false;
  this.ShieldP2 = false;
  this.ShieldP3 = false;
  
  this.star;
  this.shield;
  this.Fences;
  this.fence1;
  this.fence2; 
  
  
  this.BeecolliderActive = true;
  this.StonecolliderActive = true;
  
  this.mana;
  this.manaholder;
  this.percentage = 1;


  this.PlayButton;

}

preload() {
    
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
  

}

//Create Function
create() {
    
  this.scene.remove('MainMenu');
  
this.offset = 380;

this.pointer = this.input.activePointer;

   this.bg = this.add.image(760 +this.offset, 130, "background");
   this.bg2 = this.add.image(0 +this.offset, 130, "background");

   this.Bushes = this.add.group();
   this.Bushes2 = this.add.group();
   this.Bushes3 = this.add.group();
   this.Fences = this.add.group();
   this.stones = this.add.group();
   this.cherries = this.add.group();



   this.Bush9 = this.physics.add.image(800,240,'bush3');
   this.Bush8 = this.physics.add.image(2000,240,'bush3'); 
   this.Bush7 = this.physics.add.image(1020,240,'bush3');
  
   this.Bush4 = this.physics.add.image(1950,230,'bush2');
   this.Bush5 = this.physics.add.image(1230,230,'bush2');
   this.Bush6 = this.physics.add.image(930,230,'bush2');

   this.fence1 = this.physics.add.image(1000, 200,'fence');
   this.fence2 = this.physics.add.image(650, 200,'fence');

   this.Bush1 = this.physics.add.image(1200, 200,'bush'); 
   this.Bush2 = this.physics.add.image(500, 200,'bush');
   this.Bush3 = this.physics.add.image(1800, 200,'bush'); 

   this.stone1 = this.physics.add.image(500,230,'stone');
   this.stone2 = this.physics.add.image(1500,230,'stone');

   this.EnemyBee = this.physics.add.image(500,130,'bee');
   this.EnemyBee.enableBody = false;
   this.EnemyBee.body.allowGravity = false;
   this.EnemyBee.setVelocity(-80,-10);


   this.Bushes.add(this.Bush1);
   this.Bushes.add(this.Bush2);
   this.Bushes.add(this.Bush3);

   this.Bushes2.add(this.Bush4);
   this.Bushes2.add(this.Bush5); 
   this.Bushes2.add(this.Bush6);
  
   this.Bushes3.add(this.Bush7);
   this.Bushes3.add(this.Bush8);
   this.Bushes3.add(this.Bush9);

   this.Fences.add(this.fence1);
  this.Fences.add(this.fence2);

  this.stones.add(this.stone1);
  this.stones.add(this.stone2);

  this.setupBushes1();
  this.setupBushes2();
  this.setupBushes3();
  this.setupFences();
  this.setupStones();
  


  this.platform = this.physics.add.staticImage(380,260, 'platform');

  this.Player = this.physics.add.image(350, 150,'player');
  this.Player.body.allowGravity = true;
  this.Player.setBounce(0.2);
  this.Player.setCollideWorldBounds(true);
  this.Player.setInteractive();

  this.Player1 = this.physics.add.image(this.Player.x - 80, 150, 'player');
  this.Player1.body.allowGravity = true;
  this.Player1.setBounce(0.2);
  this.Player1.setCollideWorldBounds(true);
  this.Player1.setInteractive();


  this.Player2 = this.physics.add.image(this.Player.x + 80, 150, 'player');
  this.Player2.body.allowGravity = true;
  this.Player2.setBounce(0.2);
  this.Player2.setCollideWorldBounds(true);
  this.Player2.setInteractive();
 
  
  this.shield = this.physics.add.image(1000, 1000,'shield');
  this.shield.body.allowGravity = false;
  this.shield.enableBody = false;


  this.grass = this.add.image(760 +this.offset, 237, 'grass');
  this.grass2 = this.add.image(0  +this.offset, 237, 'grass');
    

  
  this.cherry = this.physics.add.image(700,130,'cherry');
  this.cherry1 = this.physics.add.image(1400,130,'cherry');
  this.cherries.add(this.cherry);
  this.cherries.add(this.cherry1);

  this.setupCherries();
 
  this.mana = this.add.image(700, 25,'manaBar');
  this.mana.scaleX = this.percentage;
  this.mana.setOrigin(1,0);
  this.manaholder = this.add.image(this.mana.x,this.mana.y,'manaHolder');
  this.manaholder.setOrigin(1,0);

  this.star = this.physics.add.image(750,150,'stars');
  this.star.body.allowGravity = false;
  this.star.enableBody = false;
  this.star.body.setVelocity(-150,0);

  this.tweens.add({
    targets: this.grass, 
     x: 380,
     duration: 5000,
     loop: -1
     
    });

  this.tweens.add({
      targets: this.grass2,
      x: -380,
       duration: 5000,
       loop: -1
       
      });

  this.tweens.add({
      targets: this.bg,
    x: 380,
    duration: 32000,
    loop: -1
      
    });

  this.tweens.add({
      targets: this.bg2,
    x: -380,
    duration: 32000,
    loop: -1
      
    });    

    //this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey('SPACE');

    this.physics.add.collider(this.Player, this.platform);
    this.physics.add.collider(this.Player1, this.platform);
    this.physics.add.collider(this.Player2, this.platform);

    this.physics.add.overlap(this.EnemyBee, this.Player, this.beeHIt, ()=> { return this.BeecolliderActive;}, this);
    this.physics.add.overlap(this.EnemyBee, this.Player1, this.beeHIt1, ()=> { return this.BeecolliderActive;}, this);
    this.physics.add.overlap(this.EnemyBee, this.Player2, this.beeHIt2, ()=> { return this.BeecolliderActive;}, this);

    this.physics.add.overlap(this.Player, this.stone1, this.Stone1Hit, ()=>{return this.StonecolliderActive;}, this );
    this.physics.add.overlap(this.Player1, this.stone1, this.Stone1Hit1, ()=>{return this.StonecolliderActive;}, this );
    this.physics.add.overlap(this.Player2, this.stone1, this.Stone1Hit2, ()=>{return this.StonecolliderActive;}, this );

    this.physics.add.overlap(this.Player, this.stone2, this.Stone2Hit, ()=>{return this.StonecolliderActive;}, this );
    this.physics.add.overlap(this.Player1, this.stone2, this.Stone2Hit1, ()=>{return this.StonecolliderActive;}, this );
    this.physics.add.overlap(this.Player2, this.stone2, this.Stone2Hit2, ()=>{return this.StonecolliderActive;}, this );

    this.physics.add.overlap(this.Player, this.cherry, this.cherryHitMessage, ()=>{return this.cherryColliderActive;}, this );
    this.physics.add.overlap(this.Player1, this.cherry, this.cherryHitMessage, ()=>{return this.cherryColliderActive;}, this );
    this.physics.add.overlap(this.Player2, this.cherry, this.cherryHitMessage, ()=>{return this.cherryColliderActive;}, this );

    this.physics.add.overlap(this.Player, this.cherry1, this.cherry1HitMessage, ()=>{return this.cherry1ColliderActive;}, this );
    this.physics.add.overlap(this.Player1, this.cherry1, this.cherry1HitMessage, ()=>{return this.cherry1ColliderActive;}, this );
    this.physics.add.overlap(this.Player2, this.cherry1, this.cherry1HitMessage, ()=>{return this.cherry1ColliderActive;}, this );

    this.physics.add.overlap(this.Player, this.star, this.playerHitStar, ()=>{return this.isPlayerShielded;}, this );
    this.physics.add.overlap(this.Player1, this.star, this.player1HitStar, ()=>{return this.isPlayer1Shielded;}, this );
    this.physics.add.overlap(this.Player2, this.star, this.player2HitStar, ()=>{return this.isPlayer2Shielded;}, this );

    
  console.log('Porcoddio');
    
}


 setupBushes1()
{
  var bushes1C = this.Bushes.getChildren();  
  for (var i = 0; i <bushes1C.length; i++)
  {
   bushes1C[i].body.allowGravity = false;
   bushes1C[i].enableBody = false;  
   bushes1C[i].setVelocity(-150,0);   
  } 
}

setupBushes2()
{
  var bushes2C = this.Bushes2.getChildren();
  for (var i = 0; i < bushes2C.length; i++)
  {
   bushes2C[i].body.allowGravity = false;
   bushes2C[i].enableBody = false;  
   bushes2C[i].setVelocity(-130,0);   
  } 
}


setupBushes3()
{
  var bushes3C = this.Bushes3.getChildren();
  for (var i = 0; i < bushes3C.length; i++)
  {
    bushes3C[i].body.allowGravity = false;
    bushes3C[i].enableBody = false;  
    bushes3C[i].setVelocity(-110,0);
  }

}


setupFences()
{
  var FencesC = this.Fences.getChildren();
  for (var i = 0; i < FencesC.length; i++)
  {
    FencesC[i].body.allowGravity = false;
    FencesC[i].enableBody = false;  
    FencesC[i].setVelocity(-110,0);
  }
}


setupStones()
{
  var stonesC = this.stones.getChildren();
  for (var i = 0; i< stonesC.length; i++)
  {
    stonesC[i].body.allowGravity = false;
    stonesC[i].enableBody = true;
    stonesC[i].setVelocity(-200,0);
  }
}


setupCherries()
{
  var cherriesC = this.cherries.getChildren();
  for (var i = 0; i < cherriesC.length; i++)
  {
      cherriesC[i].body.allowGravity = false;
      cherriesC[i].enableBody = false;
      cherriesC[i].setVelocity(-200,0);      
  }
}






//Update Function
update(){  
   

  if (!this.isPlayerShielded)
  {
    this.shield.setPosition(this.Player.x, this.Player.y);
  }
  else if (!this.isPlayer1Shielded)
  {
    this.shield.setPosition(this.Player1.x, this.Player1.y);
  }
 else if (!this.isPlayer2Shielded)
 {
  this.shield.setPosition(this.Player2.x, this.Player2.y);
 }

 if (this.mana.scaleX<0.8)
 {
  this.scene.switch('GameOver');

 }

 this.mana.scaleX = this.percentage;


 
this.Player.on('pointerover',function(pointer)
{
  if (this.player.body !=='undefined')
  { 
  this.Player.body.velocity.y = -400;
  }
}); 

this.Player1.on('pointerover',function(){

if (typeof this.Player1 !== 'undefined'){
  if (this.Player1.body.touching.down)
  {
    this.Player1.body.velocity.y = -400;
  }
}
})

this.Player2.on('pointerover',function(){
  if (typeof this.Player2 !== 'undefined'){
  if (this.Player2.body.touching.down)
  {
    this.Player2.body.velocity.y = -400;
  }
}
})

    if (this.jumpButton.isDown){    
      this.Player.body.velocity.y = -400; 
    }
 
    this.iterateChildrens1();
    this.iterateChildrens2();
    this.iterateChildrens3();
    this.iterateFences();
    this.iterateBees();
    this.iterateStones();
    this.resetStar();
}


playerJump()
{

this.Player.body.setVelocity.y = 400;

}


iterateChildrens1()
{
  var bushes1C = this.Bushes.getChildren();
  for (var i = 0; i < bushes1C.length; i++)
  {
    if (bushes1C[i].x < -300)
    {
      bushes1C[i].setPosition(Phaser.Math.RND.between(800,1200),200);
    }   
 }
}

iterateChildrens2()
{
    var bushes2C = this.Bushes2.getChildren();
  for (var i = 0; i<bushes2C.length; i++)
  {
    if (bushes2C[i].x < -300)
    {
      bushes2C[i].setPosition(Phaser.Math.RND.between(750,1800),230);
    }    
  }
}

iterateChildrens3()
{
  var bushes3C = this.Bushes3.getChildren();
  for (var i = 0; i<bushes3C.length; i++)
  {
    if (bushes3C[i].x < -300)
    {
      bushes3C[i].setPosition(Phaser.Math.RND.between(750,2500),240);
    }
  }
}

iterateFences()
{
  var fencesC = this.Fences.getChildren();
  for (var i=0; i < fencesC.length; i++)
  { 
    if (fencesC[i].x < -300)
    {
      fencesC[i].setPosition(Phaser.Math.RND.between(1000,2000), 200);
    }
  }
}
 


iterateStones()
{   
  var stonesC = this.stones.getChildren();
  for (var i = 0; i< stonesC.length; i++)
  {if (stonesC[i].x < -300)
    {
    stonesC[i].setPosition(Phaser.Math.RND.between(1000,4000), stonesC[i].y);  

    }
  }
}


iterateBees()
{ 
  if (this.EnemyBee.y < 120)
  {
    this.EnemyBee.setVelocityY(10);
  }
  else if (this.EnemyBee.y > 135)
  {
    this.EnemyBee.setVelocityY(-10);
  }
  else if (this.EnemyBee.x < -300)
  {
    this.EnemyBee.setPosition(Phaser.Math.RND.between(800,1300),130);

  }

}
 

Stone1Hit()
{
if (!this.ShieldP1){
  this.ReduceMana();
  this.StonecolliderActive = false;  
  this.Player.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      this.StonecolliderActive = true;
    },
    loop: false
});

}
}

Stone1Hit1()
{
  if (!this.ShieldP2){
    this.ReduceMana();
    this.StonecolliderActive = false;  
    this.Player1.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      this.StonecolliderActive = true;
    },
    loop: false
});
  }
}

Stone1Hit2()
{
  if (!this.ShieldP3){
    this.ReduceMana();
    this.StonecolliderActive = false;   
    this.Player2.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      this.StonecolliderActive = true;
    },
    loop: false
});
  }
}

Stone2Hit()
{
  if (!this.ShieldP1){
    this.ReduceMana();
    this.StonecolliderActive = false;  
    this.Player.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      this.StonecolliderActive = true;
    },
    loop: false
});
  }
}

Stone2Hit1()
{
  if (!this.ShieldP2){
    this.ReduceMana();
    this.StonecolliderActive = false;  
    this.Player1.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      this.StonecolliderActive = true;
    },
    loop: false
});
  }
}

Stone2Hit2()
{
  if (!this.ShieldP3){
    this.ReduceMana();
    this.StonecolliderActive = false;   
    this.Player2.body.velocity.y = -250;
  this.time.addEvent({
    delay:100,
    callback: ()=>{
      this.StonecolliderActive = true;
    },
    loop: false
});
  }
}


ReduceMana()
{
  this.percentage -= 0.01;
}


cherryHitMessage()
{
  this.cherryCounter++;
  this.cherryColliderActive = false;
       this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          this.cherryColliderActive = true;
        },
        loop: false
    });

    switch(this.cherryCounter){
      
      case 1: 
      this.cherry.setScale(0.7);
      break;
      case 2: 
      this.cherry.setScale(0.5);
      break;
      case 3:
        this.increaseMana();
        this.cherryResetPositionAndScale();      
        this.cherryCounter = 0;
      break;     
    }
}


cherry1HitMessage()
{
  this.cherry1Counter++;
  this.cherry1ColliderActive = false;  
       this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          this.cherry1ColliderActive = true;
        },
        loop: false
    });

    switch(this.cherry1Counter){      
      case 1: 
      this.cherry1.setScale(0.7);
      break;
      case 2: 
      this.cherry1.setScale(0.5);
      break;
      case 3:
        this.increaseMana();
        this.cherry1ResetPositionAndScale();
        this.cherry1Counter = 0;
      break;     
    }
}

cherryResetPositionAndScale()
{
  this.cherry.setPosition(800, this.cherry.y);
  this.cherry.setScale(1);
}

cherry1ResetPositionAndScale()
{
  this.cherry1.setPosition(800, this.cherry.y);
  this.cherry1.setScale(1);
}

increaseMana()
{
  this.percentage += 0.05;
}



//Bee Damage mechanics
//If related player shield (SHIELDP) is turned off then reduce mana and allow bee collision again after 500ms


beeHIt(){
   if (!this.ShieldP1){
    this.ReduceMana();
    this.BeecolliderActive = false;
       this.time.addEvent({
        delay: 500,
        callback: ()=>{
          this.BeecolliderActive = true;
        },
        loop: false
    });
  }
 }

beeHIt1(){
   if (!this.ShieldP2){
    this.ReduceMana();
    this.BeecolliderActive = false;
  console.log("beeHIt!");
       this.time.addEvent({
        delay: 500,
        callback: ()=>{
          this.BeecolliderActive = true;
        },
        loop: false
    });
  }
 }

beeHIt2(){

  if (!this.ShieldP3){
    this.ReduceMana();
    this.BeecolliderActive = false;
  console.log("beeHIt!");
       this.time.addEvent({
        delay: 500,
        callback: ()=>{
          this.BeecolliderActive = true;
        },
        loop: false
    });
  }
 }



 playerHitStar(){
  this.ShieldP1 = true;
console.log('starHit');
this.isPlayerShielded = false;
this.star.setPosition(3500, this.star.y);
this.time.addEvent({
  delay: 5000,
  callback: ()=>{
    this.isPlayerShielded = true;
    this.shield.setPosition(1000, 1000); 
    this.ShieldP1 = false;
  },
  loop: false
});
}

player1HitStar(){


  console.log('star2Hit');
  this.ShieldP2 = true;
  this.isPlayer1Shielded = false;
  this.star.setPosition(3500, this.star.y);  
  this.time.addEvent({
    delay: 5000,
    callback: ()=>{
      this.isPlayer1Shielded = true;
      this.shield.setPosition(1000, 1000); 
      this.ShieldP2 = false;
    },
    loop: false
  });
}

player2HitStar(){

  this.ShieldP3 = true;
  console.log('star2Hit');
  this.isPlayer2Shielded = false;
  
  this.star.setPosition(3500, this.star.y);
  this.time.addEvent({
    delay: 5000,
    callback: ()=>{
      this.isPlayer2Shielded = true;
      this.shield.setPosition(1000, 1000); 
      this.ShieldP3 = false;
    },
    loop: false
  });
 }


 resetStar()
{
  if(this.star.x < -700)
  {
    this.star.setPosition(2000, this.star.y);
  }
}
}


class SceneA  extends Phaser.Scene{
  constructor() {
  
    super('MainMenu');
   
  }

  preload()
  {
     this.load.image('playButton', playBTN);

  }
  create(){
  
    this.PlayButton = this.add.image(150,150, 'playButton');

    this.input.on('pointerdown',function()
    {
      this.input.stopPropagation();
        this.scene.start('Controller');
    },this); 

  }

}

class SceneB  extends Phaser.Scene{
  constructor() {
  
    super('GameOver');
   
  }

  preload()
  {
     this.load.image('playButton', playBTN);

  }
  create(){
    this.scene.remove('Controller');
    this.add.text(150,150,'GAMEOVER');
    this.PlayButton = this.add.image(150,150, 'playButton');

    this.input.on('pointerdown',function()
    {
      this.input.stopPropagation();
        this.scene.start('Controller');
        this.scene.remove('GameOver');
    },this); 

  }

}



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
    
  scene: [SceneA, Controller, SceneB]
};

var game = new Phaser.Game(config);
