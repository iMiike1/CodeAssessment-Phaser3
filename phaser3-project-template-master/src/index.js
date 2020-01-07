import Phaser from "phaser";
import grassImg from "./assets/grass.png";
import backgroundImg from "./assets/background.png";
import stonImg  from "./assets/stone.png";
import platformImg  from "./assets/physicalPlatform.png";
import bushImg from "./assets/bush.png";
import bush2Img from "./assets/bush2.png";
import bush3Img from "./assets/bush3.png"

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
  this.load.image('stone', stonImg);
  this.load.image('platform', platformImg);
  this.load.image('background', backgroundImg);
  this.load.image('bush', bushImg); 
  this.load.image('bush2', bush2Img);  
  this.load.image('bush3', bush3Img);  
}


var stone = null;
var platform = null;
var jumpButton = null;
//var cursors = null;

var Bushes,Bushes2,Bushes3;


var Bush1,Bush2,Bush3,Bush4,Bush5,Bush6,Bush7,Bush8,Bush9;

//var Bush2;




//Create Function
function create() {

var offset = 380;


   var bg = this.add.image(760 +offset, 130, "background");
   var bg2 = this.add.image(0 +offset, 130, "background");

   Bushes = this.add.group();
   Bushes2 = this.add.group();
   Bushes3 = this.add.group();

   Bush9 = this.physics.add.image(800,220,'bush3');
   Bush8 = this.physics.add.image(2000,220,'bush3'); 
   Bush7 = this.physics.add.image(1020,220,'bush3');
  
   Bush4 = this.physics.add.image(1950,220,'bush2');
   Bush5 = this.physics.add.image(1230,220,'bush2');
   Bush6 = this.physics.add.image(930,220,'bush2');

   Bush1 = this.physics.add.image(1200, 200,'bush'); 
   Bush2 = this.physics.add.image(500,200,'bush');
   Bush3 = this.physics.add.image(1800,200,'bush'); 


   Bushes.add(Bush1);
   Bushes.add(Bush2);
   Bushes.add(Bush3);

   Bushes2.add(Bush4);
   Bushes2.add(Bush5); 
   Bushes2.add(Bush6);
  
   Bushes3.add(Bush7);
   Bushes3.add(Bush8);
   Bushes3.add(Bush9);

  
setupBushes1();
setupBushes2();
setupBushes3();

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
    bushes3C[i].setVelocity(-130,0);
  }

}


//Update Function
  function update(){
    
    

  if (jumpButton.isDown){
    
    
  stone.body.velocity.y = -400,
  console.log( stone.y);
    
    }
 
iterateChildrens1();
iterateChildrens2();

}



function iterateChildrens1()
{
  var bushes1C = Bushes.getChildren();

  for (var i = 0; i < bushes1C.length; i++)
  {
    if (bushes1C[i].x < -300)
    {
      bushes1C[i].setPosition(Phaser.Math.RND.between(750,1200),200);
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
      bushes2C[i].setPosition(Phaser.Math.RND.between(750,1800),200);
    }
    
  }

}


 
 

 


