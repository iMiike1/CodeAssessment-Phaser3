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
  physics:{
    default: 'arcade',
    arcrade :{
      gravity :{ y: 300},
    }
  },
    
  scene: {
    preload: preload,
    create: create
    //update: update
  }
};

var stone = null;

var platform;


// eslint-disable-next-line no-unused-vars
var game = new Phaser.Game(config);

function preload() {

  this.load.image('grass', grassImg);
  this.load.image('stone', stonImg);
  this.load.image('platform', platformImg);
  this.load.image('background', backgroundImg);
  this.load.image('bush', bushImg);  
}




function create() {

var offset = 380;


   var bg = this.add.image(760 +offset, 130, "background");
   var bg2 = this.add.image(0 +offset, 130, "background");

   platform = this.physics.add.staticImage(380,260, 'platform');

   stone = this.physics.add.image(400, 215, 'stone');
   stone.setOrigin(0.5, 0);
   stone.setVelocity(-380, 0);
   stone.setBounce(1, 1);
   stone.setCollideWorldBounds(true);

   this.physics.add.collider(stone, platform);

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

    this.tweens.add({

      targets: bush1,
      x:-50,
      duration: 15000,
      loop: -1

    });

    //var bush1 = this.add.group({key: 'bush', frame:0, repeat:5, setXY:{x:32, y: 50, stepX: 150}});
    //bush1.setVelocity(-30,0);

    //Phaser.Actions.IncX(bush1.getChildren(),100);
    //Phaser.Actions.setVelocity();

    this.sys.events.on('postupdate', update, this);

}

 function update(){



 }







 
 

 


