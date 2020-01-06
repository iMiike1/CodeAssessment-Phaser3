import Phaser from "phaser";
import grassImg from "./assets/grass.png";
import backgroundImg from "./assets/background.png";
import stonImg  from "./assets/stone.png";
import platformImg  from "./assets/physicalPlatform.png";
import bushImg from "./assets/bush.png"

var config = {
  type: Phaser.AUTO,
    width: 760,
  height: 260,
  parent : 'phaser-example',
  physics: {
    default: 'arcade',
    fps: 60,
    arcade: {
        gravity: { y: 300 },
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
  this.load.image('stone', stonImg);
  this.load.image('platform', platformImg);
  this.load.image('background', backgroundImg);
  this.load.image('bush', bushImg);  
}


var stone = null;
var platform = null;
var jumpButton = null;
var cursors = null;

var BushA;


function create() {

var offset = 380;


   var bg = this.add.image(760 +offset, 130, "background");
   var bg2 = this.add.image(0 +offset, 130, "background");



   BushA = this.physics.add.image(500,200,'bush');
   BushA.enableBody = false;
   //BushA.setCollideWorldBounds(true);
   BushA.body.allowGravity = false;
   BushA.setVelocity(-150,0);
  
  


   platform = this.physics.add.staticImage(380,260, 'platform');
   stone = this.physics.add.image(400, 150, 'stone');
   stone.body.allowGravity = true;
   stone.setBounce(0.2);
   stone.setCollideWorldBounds(true);

   var grass = this.add.image(760 +offset, 237, 'grass');
   var grass2 = this.add.image(0  +offset, 237, 'grass');
    



   
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

    this.physics.add.collider(stone, platform);

}

 function update(){

  if (BushA.x < -300)
  {
    
    BushA.setPosition(Phaser.Math.RND.between(850,1200),200);
    console.log(BushA.x);
  }



  //console.log(BushA.x);
  if (jumpButton.isDown){
    
    
  stone.body.velocity.y = -150,
  console.log( stone.y);
    
  }
 

 }







 
 

 


