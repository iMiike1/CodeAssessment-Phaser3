import Phaser from "phaser";
import grassImg from "./assets/grass.png";
import backgroundImg from "./assets/background.png"
import stoneImg  from "./assets/stone.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 760,
  height: 260,
  scene: {
    preload: preload,
    create: create
    //update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("grass", grassImg);
  this.load.image("background", backgroundImg);
  this.load.image("stone", stoneImg);
  
}

function create() {

  
  var offset = 380;

  const grass = this.add.image(760 +offset, 237, "grass");
  const grass2 = this.add.image(0  +offset, 237, "grass");

  const bg = this.add.image(760 +offset, 130, "background");
  const bg2 = this.add.image(0 +offset, 130, "background");
  
  this.stoneGroup = this.game.add.group();

  bg.depth = 0;
  bg.depth = 0;
  grass2.depth = 1;
  grass.depth =1;
  
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
      
    })

    this.tweens.add({
      targets: bg2,
    x: -380,
    duration: 32000,
    loop: -1
      
    })


}

// function update()
// {
//   var randomValue = Phaser.Math.Between(5,30);

//   var timer = scene.time.addEvent({
//   delay: randomValue,
//   });


// }
